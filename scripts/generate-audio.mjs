// ElevenLabs থেকে ভয়েস বানায় এবং প্রতিটা দৃশ্যের সময় (timing.json) বের করে।
// চালাতে: npm run audio
import {execSync} from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---- .env পড়া (আলাদা প্যাকেজ লাগে না) ----
function loadEnv() {
  const p = path.join(root, '.env');
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith('#') && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}
loadEnv();

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY || KEY.includes('এখানে')) {
  console.error('ELEVENLABS_API_KEY পাওয়া যায়নি। .env.example কপি করে .env বানিয়ে key বসান।');
  process.exit(1);
}
const API = 'https://api.elevenlabs.io';
const headers = {'xi-api-key': KEY, 'Content-Type': 'application/json'};
const NAME = (process.env.ELEVENLABS_VOICE_NAME || 'obocheton').toLowerCase();

// Jawad সাম্প্রতিক কাজ eleven_v4-এ করে (stability 0.55–0.6)।
// multilingual_v2 বাংলা সাপোর্ট করে না, বাংলা লেখা হিন্দি টানে পড়ে; ওটা ব্যবহার করবে না।
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_v4';
const VOICE_SETTINGS =
  MODEL === 'eleven_multilingual_v2'
    ? {stability: 0.45, similarity_boost: 0.85, style: 0.15, use_speaker_boost: true, speed: 1}
    : {stability: MODEL === 'eleven_v3' ? 0.5 : 0.55};
const prepText = (t) =>
  MODEL !== 'eleven_multilingual_v2' ? t : t.replace(/\[(short |long )?pause\]\s*/g, '… ').replace(/\[[^\]]*\]\s*/g, '').trim();

// ভিডিও বাছাই: `npm run audio` = Rhythm 0; `node scripts/generate-audio.mjs milgram` = src/milgram → public/milgram
const VIDEO = process.argv[2] || '';
const SRC = VIDEO ? `src/${VIDEO}/segments.json` : 'src/segments.json';
const OUT = path.join(root, 'public', VIDEO);

const segments = JSON.parse(fs.readFileSync(path.join(root, SRC), 'utf8')).map((s) => ({
  ...s,
  text: prepText(s.text),
}));
const FULL = segments.map((s) => s.text).join('\n');

async function api(pathname, opts = {}) {
  const res = await fetch(API + pathname, {headers, ...opts});
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${pathname} -> ${res.status}: ${body.slice(0, 400)}`);
  }
  return res;
}

const matches = (v) => {
  const n = (v.name || '').toLowerCase();
  return n.includes(NAME) || n.includes('অবচেতন') || n.includes('obocheton') || n.includes('abocheton');
};

async function findVoiceId() {
  if (process.env.ELEVENLABS_VOICE_ID) return process.env.ELEVENLABS_VOICE_ID;

  // ১) নিজের লাইব্রেরির ভয়েস
  try {
    const r = await (await api(`/v2/voices?search=${encodeURIComponent('obocheton')}&page_size=100`)).json();
    const found = (r.voices || []).find(matches);
    if (found) {
      console.log(`ভয়েস পাওয়া গেছে: ${found.name} (${found.voice_id})`);
      return found.voice_id;
    }
  } catch (e) {
    console.warn('নিজের ভয়েস খুঁজতে সমস্যা:', e.message);
  }
  try {
    const r = await (await api('/v2/voices?page_size=100')).json();
    const found = (r.voices || []).find(matches);
    if (found) {
      console.log(`ভয়েস পাওয়া গেছে: ${found.name} (${found.voice_id})`);
      return found.voice_id;
    }
  } catch {}

  // ২) পাবলিক Voice Library থেকে খোঁজা, পেলে নিজের লাইব্রেরিতে যোগ করা
  try {
    const r = await (await api(`/v1/shared-voices?search=${encodeURIComponent('obocheton')}&page_size=30`)).json();
    const found = (r.voices || []).find(matches) || (r.voices || [])[0];
    if (found) {
      console.log(`Voice Library-তে পাওয়া গেছে: ${found.name}। আপনার লাইব্রেরিতে যোগ করা হচ্ছে…`);
      await api(`/v1/voices/add/${found.public_owner_id}/${found.voice_id}`, {
        method: 'POST',
        body: JSON.stringify({new_name: found.name}),
      });
      return found.voice_id;
    }
  } catch (e) {
    console.warn('Voice Library খুঁজতে সমস্যা:', e.message);
  }

  console.error(
    'ভয়েস পাওয়া যায়নি। ElevenLabs-এ ভয়েসটা My Voices-এ যোগ করুন, অথবা .env-এ ELEVENLABS_VOICE_ID বসান।'
  );
  process.exit(1);
}

// ---- সময় হিসাব ----
function segmentEnds(alignment, audioSeconds, segs = segments) {
  const chars = alignment.characters;
  const ends = alignment.character_end_times_seconds;
  const whole = segs.map((s) => s.text).join('\n');
  const stripped = whole.replace(/\[[^\]]*\]/g, '');
  // প্রতিটা সেগমেন্টের শেষ অক্ষরের সূচক (পূর্ণ টেক্সটে)
  const idxFull = [];
  let acc = 0;
  segs.forEach((s, i) => {
    acc += s.text.length + (i < segs.length - 1 ? 1 : 0);
    idxFull.push(acc - 1 - (i < segs.length - 1 ? 1 : 0));
  });
  // ট্যাগ বাদ দেওয়া টেক্সটে সূচক
  const idxStripped = [];
  acc = 0;
  segs.forEach((s, i) => {
    const st = s.text.replace(/\[[^\]]*\]/g, '');
    acc += st.length + (i < segs.length - 1 ? 1 : 0);
    idxStripped.push(acc - 1 - (i < segs.length - 1 ? 1 : 0));
  });

  let idx;
  if (chars.length === whole.length) idx = idxFull;
  else if (chars.length === stripped.length) idx = idxStripped;
  else idx = idxFull.map((i) => Math.min(chars.length - 1, Math.round((i / whole.length) * chars.length)));

  return idx.map((i) => Math.min(ends[Math.min(i, ends.length - 1)], audioSeconds));
}

// ---- চরিত্রের আলাদা ভয়েস: segments.json-এ কারও voice থাকলে এই পথ ----
// পরপর একই ভয়েসের লাইন এক টুকরো; সামনে [long pause]/[short pause] থাকলে আসল নীরবতা দিয়ে নতুন টুকরো।
// প্রতি টুকরো .audio-cache-এ জমে, তাই এক লাইন বদলালে শুধু সেটুকুর ক্রেডিট খরচ হয়।
const PAUSES = {long: 0.95, short: 0.45};
const VOICE_GAP = 0.18; // ভিন্ন ভয়েসের মাঝে স্বাভাবিক ফাঁক
const CACHE = path.join(root, '.audio-cache');

async function speak(voiceId, text) {
  const key = crypto.createHash('sha1').update(JSON.stringify([voiceId, MODEL, VOICE_SETTINGS, text])).digest('hex');
  const mp3 = path.join(CACHE, `${key}.mp3`);
  const json = path.join(CACHE, `${key}.json`);
  if (fs.existsSync(mp3) && fs.existsSync(json)) return {file: mp3, alignment: JSON.parse(fs.readFileSync(json, 'utf8')), cached: true};
  let res;
  for (let tries = 1; ; tries++) {
    try {
      res = await api(`/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`, {
        method: 'POST',
        body: JSON.stringify({text, model_id: MODEL, voice_settings: VOICE_SETTINGS}),
      });
      break;
    } catch (e) {
      // নেটওয়ার্কের সাময়িক সমস্যায় আবার চেষ্টা; ক্রেডিট বা key-এর সমস্যায় সাথে সাথে থামে
      if (tries >= 4 || !/fetch failed|-> (429|5\d\d)/.test(e.message)) throw e;
      console.warn(`আবার চেষ্টা (${tries}): ${e.message.slice(0, 80)}`);
      await new Promise((r) => setTimeout(r, tries * 4000));
    }
  }
  const j = await res.json();
  fs.mkdirSync(CACHE, {recursive: true});
  fs.writeFileSync(mp3, Buffer.from(j.audio_base64, 'base64'));
  const alignment = j.alignment || j.normalized_alignment;
  fs.writeFileSync(json, JSON.stringify(alignment));
  return {file: mp3, alignment, cached: false};
}

const ffmpeg = (args) => execSync(`npx remotion ffmpeg ${args}`, {cwd: root, stdio: 'pipe'});
// mp3-র আসল দৈর্ঘ্য (ফাইলের আকার থেকে আন্দাজ করলে লম্বা ভিডিওতে সময় সরে যায়)
const seconds = (file) => Number(execSync(`npx remotion ffprobe -v error -show_entries format=duration -of csv=p=0 "${file}"`, {cwd: root, stdio: 'pipe'}).toString().trim());

// আসল ভিডিওর অডিওর টুকরো: segments.json-এ clip = {file: 'pori/clip.wav', from, to}
// (public/-এর ভেতরের ১৬-বিট মোনো WAV)। দুই মাথায় ৬০ মিলিসেকেন্ড fade, যাতে কাটার জায়গায় খট না লাগে।
function cutClip(clip, out) {
  const b = fs.readFileSync(path.join(root, 'public', clip.file));
  let off = 12;
  let fmt = null;
  let data = null;
  while (off < b.length) {
    const id = b.toString('ascii', off, off + 4);
    const len = b.readUInt32LE(off + 4);
    if (id === 'fmt ') fmt = {ch: b.readUInt16LE(off + 10), sr: b.readUInt32LE(off + 12), bits: b.readUInt16LE(off + 22)};
    if (id === 'data') data = b.subarray(off + 8, off + 8 + len);
    off += 8 + len + (len % 2);
  }
  if (!fmt || !data || fmt.ch !== 1 || fmt.bits !== 16) throw new Error(`${clip.file}: ১৬-বিট মোনো WAV লাগবে`);
  const a = Math.round(clip.from * fmt.sr);
  const z = Math.min(data.length / 2, Math.round(clip.to * fmt.sr));
  const n = z - a;
  const fade = Math.round(0.06 * fmt.sr);
  const gain = clip.gain ?? 1;
  const pcm = Buffer.alloc(n * 2);
  for (let i = 0; i < n; i++) {
    const k = Math.min(1, i / fade, (n - 1 - i) / fade);
    pcm.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(data.readInt16LE((a + i) * 2) * k * gain))), i * 2);
  }
  const h = Buffer.alloc(44);
  h.write('RIFF', 0);
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write('WAVEfmt ', 8);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(1, 22);
  h.writeUInt32LE(fmt.sr, 24);
  h.writeUInt32LE(fmt.sr * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write('data', 36);
  h.writeUInt32LE(pcm.length, 40);
  fs.writeFileSync(out, Buffer.concat([h, pcm]));
}

async function multiVoice() {
  const roles = JSON.parse(fs.readFileSync(path.join(root, 'src/common/voices.json'), 'utf8'));
  const chunks = [];
  for (const s of segments) {
    if (s.clip) {
      const m = s.text.match(/^\[(long|short) pause\]\s*/);
      chunks.push({role: 'clip', clip: s.clip, pause: m ? PAUSES[m[1]] : chunks.length ? VOICE_GAP : 0, segs: [{...s, text: m ? s.text.slice(m[0].length) : s.text}]});
      continue;
    }
    const role = s.voice || 'narrator';
    if (!roles[role]) throw new Error(`voices.json-এ '${role}' নেই (${s.id})`);
    const m = s.text.match(/^\[(long|short) pause\]\s*/);
    const text = m ? s.text.slice(m[0].length) : s.text;
    const last = chunks.at(-1);
    if (last && last.role === role && !m) last.segs.push({...s, text});
    else chunks.push({role, pause: m ? PAUSES[m[1]] : last ? VOICE_GAP : 0, segs: [{...s, text}]});
  }

  const tmp = path.join(CACHE, 'tmp');
  fs.mkdirSync(tmp, {recursive: true});
  let spent = 0;
  let clock = 0;
  const list = [];
  const out = [];
  let prev = 0;
  for (const [n, c] of chunks.entries()) {
    if (c.role === 'clip') {
      if (c.pause) {
        const sil = path.join(tmp, `sil${Math.round(c.pause * 100)}.wav`);
        if (!fs.existsSync(sil)) ffmpeg(`-y -v error -f lavfi -i anullsrc=r=44100:cl=mono -t ${c.pause} "${sil}"`);
        list.push(sil);
        clock += seconds(sil);
      }
      const wav = path.join(tmp, `${n}.wav`);
      cutClip(c.clip, wav);
      const secs = seconds(wav);
      const s = c.segs[0];
      out.push({id: s.id, start: Number(prev.toFixed(3)), end: Number((clock + secs).toFixed(3)), voiceStart: Number(clock.toFixed(3))});
      prev = clock + secs;
      console.log(`${String(n + 1).padStart(2)}/${chunks.length} আসল অডিও ${c.clip.from}-${c.clip.to}s`);
      list.push(wav);
      clock += secs;
      continue;
    }
    const text = c.segs.map((s) => s.text).join('\n');
    const {file, alignment, cached} = await speak(roles[c.role], text);
    if (!cached) spent += text.length;
    console.log(`${String(n + 1).padStart(2)}/${chunks.length} ${c.role}${cached ? ' (আগে বানানো)' : ''}`);
    if (c.pause) {
      const sil = path.join(tmp, `sil${Math.round(c.pause * 100)}.wav`);
      if (!fs.existsSync(sil)) ffmpeg(`-y -v error -f lavfi -i anullsrc=r=44100:cl=mono -t ${c.pause} "${sil}"`);
      list.push(sil);
      clock += seconds(sil);
    }
    const voiceStart = clock;
    // mp3 জুড়লে প্রতি জোড়ায় সময় হারায়, তাই WAV করে জোড়া
    const wav = path.join(tmp, `${n}.wav`);
    ffmpeg(`-y -v error -i "${file}" -ar 44100 -ac 1 "${wav}"`);
    const secs = seconds(wav);
    const ends = alignment?.character_end_times_seconds?.length ? segmentEnds(alignment, secs, c.segs) : c.segs.map((_, i) => (secs * (i + 1)) / c.segs.length);
    c.segs.forEach((s, i) => {
      const end = voiceStart + (i === c.segs.length - 1 ? secs : ends[i] + 0.08);
      out.push({id: s.id, start: Number(prev.toFixed(3)), end: Number(end.toFixed(3)), voiceStart: Number((i === 0 ? voiceStart : prev).toFixed(3))});
      prev = end;
    });
    list.push(wav);
    clock += secs;
  }

  fs.mkdirSync(OUT, {recursive: true});
  const listFile = path.join(tmp, 'list.txt');
  fs.writeFileSync(listFile, list.map((p) => `file '${p.replace(/\\/g, '/')}'`).join('\n'));
  ffmpeg(`-y -v error -f concat -safe 0 -i "${listFile}" -c:a libmp3lame -b:a 128k "${path.join(OUT, 'voice.mp3')}"`);

  out.at(-1).end = Number((clock + 1.4).toFixed(3));
  fs.writeFileSync(path.join(OUT, 'timing.json'), JSON.stringify({total: out.at(-1).end, segments: out}, null, 2));
  console.log(`শেষ। হিসাবে ${clock.toFixed(2)}s, voice.mp3 ${seconds(path.join(OUT, 'voice.mp3')).toFixed(2)}s, ${chunks.length} টুকরো, নতুন খরচ ${spent} অক্ষর।`);
}

async function main() {
  if (segments.some((s) => s.voice || s.clip)) return multiVoice();
  const voiceId = await findVoiceId();
  console.log(`ভয়েস তৈরি হচ্ছে (${MODEL})…`);

  const body = {
    text: FULL,
    model_id: MODEL,
    voice_settings: VOICE_SETTINGS,
  };

  let audioBuf;
  let alignment = null;
  try {
    const res = await api(`/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const j = await res.json();
    audioBuf = Buffer.from(j.audio_base64, 'base64');
    alignment = j.alignment || j.normalized_alignment || null;
  } catch (e) {
    console.warn('with-timestamps কাজ করেনি, সাধারণ মোডে চেষ্টা:', e.message);
    const res = await api(`/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    audioBuf = Buffer.from(await res.arrayBuffer());
  }

  fs.mkdirSync(OUT, {recursive: true});
  fs.writeFileSync(path.join(OUT, 'voice.mp3'), audioBuf);

  // mp3 128kbps থেকে মোটামুটি দৈর্ঘ্য
  const approxSeconds = (audioBuf.length * 8) / 128000;
  let audioSeconds = approxSeconds;
  let ends;
  if (alignment && alignment.character_end_times_seconds?.length) {
    const lastEnd = alignment.character_end_times_seconds.at(-1);
    audioSeconds = Math.max(lastEnd, approxSeconds - 0.3);
    ends = segmentEnds(alignment, lastEnd);
  } else {
    // সময় না পেলে অক্ষরের অনুপাতে ভাগ
    const total = FULL.length;
    let acc = 0;
    ends = segments.map((s, i) => {
      acc += s.text.length + (i < segments.length - 1 ? 1 : 0);
      return (acc / total) * approxSeconds;
    });
  }

  const TAIL = 1.4; // শেষে একটু বিরতি
  let prev = 0;
  const out = segments.map((s, i) => {
    const end = i === segments.length - 1 ? audioSeconds + TAIL : Math.max(prev + 0.5, ends[i] + 0.15);
    const seg = {id: s.id, start: Number(prev.toFixed(3)), end: Number(end.toFixed(3))};
    prev = end;
    return seg;
  });

  const timing = {total: Number(out.at(-1).end.toFixed(3)), segments: out};
  fs.writeFileSync(path.join(OUT, 'timing.json'), JSON.stringify(timing, null, 2));
  console.log(`শেষ। অডিও ≈ ${audioSeconds.toFixed(1)} সেকেন্ড, মোট ভিডিও ≈ ${timing.total.toFixed(1)} সেকেন্ড।`);
  console.log('এখন: npm run dev');
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
