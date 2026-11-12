import {execSync} from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---- .env পড়া ----
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

const CARTESIA_KEY = process.env.CARTESIA_API_KEY || 'sk_car_gr4JhvWSkyqyczpZNTKR3Y';
if (!CARTESIA_KEY) {
  console.error('CARTESIA_API_KEY পাওয়া যায়নি।');
  process.exit(1);
}

const FFMPEG = path.join(root, 'node_modules', '@remotion', 'compositor-win32-x64-msvc', 'ffmpeg.exe');
const ffmpeg = (args) => execSync(`"${FFMPEG}" ${args}`, {cwd: root, stdio: 'pipe'});

const VIDEO = process.argv[2] || 'law22';
const SRC = path.join(root, `src/${VIDEO}/segments.json`);
const OUT = path.join(root, `public/${VIDEO}`);

const CARTESIA_VOICES = {
  narrator: 'af040981-32d3-468c-a099-65da1ec2675c', // Professor (bn)
  woman: 'a621aa61-0c8a-4f08-a075-d4a6288891a5',    // Nusrat (bn)
  mother: '48b9e1de-e2fa-4914-8b32-31c437813548',   // Ananya (bn)
  man: '2ba861ea-7cdc-43d1-8608-4045b5a41de5',      // Rubel (bn)
  shopkeeper: 'cd983593-81f5-4b9d-abad-21791ee86363'// Arindam (bn)
};

const CACHE = path.join(root, '.audio-cache', 'cartesia');
fs.mkdirSync(CACHE, {recursive: true});

async function callCartesia(voiceId, text) {
  const hash = crypto.createHash('sha1').update(JSON.stringify([voiceId, text])).digest('hex');
  const cacheFile = path.join(CACHE, `${hash}.wav`);
  if (fs.existsSync(cacheFile)) {
    const buf = fs.readFileSync(cacheFile);
    const secs = (buf.length - 44) / (44100 * 2);
    return {file: cacheFile, secs, cached: true};
  }

  const res = await fetch('https://api.cartesia.ai/tts/bytes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': CARTESIA_KEY,
      'Cartesia-Version': '2026-08-14'
    },
    body: JSON.stringify({
      model_id: 'sonic-3.6',
      transcript: text,
      voice: { mode: 'id', id: voiceId },
      output_format: {
        container: 'wav',
        encoding: 'pcm_s16le',
        sample_rate: 44100
      },
      language: 'bn',
      generation_config: { speed: 1, volume: 1 }
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Cartesia error ${res.status}: ${errText}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(cacheFile, buf);
  const secs = (buf.length - 44) / (44100 * 2);
  return {file: cacheFile, secs, cached: false};
}

function makeSilence(durSec, outPath) {
  const sampleRate = 44100;
  const numSamples = Math.round(durSec * sampleRate);
  const pcm = Buffer.alloc(numSamples * 2);
  const h = Buffer.alloc(44);
  h.write('RIFF', 0);
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write('WAVEfmt ', 8);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); // PCM
  h.writeUInt16LE(1, 22); // Mono
  h.writeUInt32LE(sampleRate, 24);
  h.writeUInt32LE(sampleRate * 2, 28);
  h.writeUInt16LE(2, 32); // Block align
  h.writeUInt16LE(16, 34); // Bits per sample
  h.write('data', 36);
  h.writeUInt32LE(pcm.length, 40);
  fs.writeFileSync(outPath, Buffer.concat([h, pcm]));
}

async function main() {
  console.log(`Cartesia ভয়েস জেনারেশন শুরু (${VIDEO})…`);
  const segments = JSON.parse(fs.readFileSync(SRC, 'utf8'));

  const tmp = path.join(CACHE, 'tmp');
  fs.mkdirSync(tmp, {recursive: true});

  let clock = 0;
  const list = [];
  const out = [];
  let prevEnd = 0;
  let newChars = 0;

  for (let idx = 0; idx < segments.length; idx++) {
    const s = segments[idx];
    const role = s.voice || 'narrator';
    const voiceId = CARTESIA_VOICES[role] || CARTESIA_VOICES.narrator;

    // পজ এবং ট্যাগ পার্সিং
    let pauseBefore = 0;
    let spokenText = s.voiceText || s.text;
    const m = spokenText.match(/^\[(long|short) pause\]\s*/);
    if (m) {
      pauseBefore = m[1] === 'long' ? 0.75 : 0.35;
      spokenText = spokenText.slice(m[0].length);
    }
    // Cartesia <break time="Xs"/> (যদি শুরুতে থাকে, আসল নীরবতা বসাই যেন সাবটাইটেল voiceStart-এর সাথে মেলে)
    let emotionPrefix = '';
    const em = spokenText.match(/^(<emotion\b[^>]*\/>\s*)/i);
    if (em) {
      emotionPrefix = em[1];
      spokenText = spokenText.slice(em[0].length);
    }
    const br = spokenText.match(/^<break\s+time=["']([\d.]+)s["']\s*\/?>\s*/i);
    if (br) {
      pauseBefore += parseFloat(br[1]);
      spokenText = spokenText.slice(br[0].length);
    }
    // ElevenLabs-এর বাকি [tag] রিমুভ, Cartesia XML ট্যাগ (<emotion>, মধ্যবর্তী <break>) অক্ষত রাখা
    spokenText = (emotionPrefix + spokenText.replace(/\[[^\]]*\]\s*/g, '')).trim();

    // যদি পজ থাকে
    if (pauseBefore > 0) {
      const silFile = path.join(tmp, `sil_${idx}_${Math.round(pauseBefore * 100)}.wav`);
      makeSilence(pauseBefore, silFile);
      list.push(silFile);
      clock += pauseBefore;
    }

    const voiceStart = clock;
    const {file, secs, cached} = await callCartesia(voiceId, spokenText);
    if (!cached) newChars += spokenText.length;
    console.log(`[${idx + 1}/${segments.length}] (${role}) ${s.id}: ${secs.toFixed(2)}s${cached ? ' [Cached]' : ''}`);

    list.push(file);
    clock += secs;

    // ট্রানজিশনের জন্য ছোট নরম গ্যাপ (০.১২ সে.)
    const GAP = idx === segments.length - 1 ? 0 : 0.12;
    if (GAP > 0) {
      const gapFile = path.join(tmp, `gap_${idx}.wav`);
      makeSilence(GAP, gapFile);
      list.push(gapFile);
      clock += GAP;
    }

    const segEnd = clock;
    out.push({
      id: s.id,
      start: Number(prevEnd.toFixed(3)),
      end: Number(segEnd.toFixed(3)),
      voiceStart: Number(voiceStart.toFixed(3))
    });
    prevEnd = segEnd;
  }

  // শেষ দৃশ্যে ১.২ সেকেন্ড বাড়তি দৃশ্য
  const total = Number((clock + 1.2).toFixed(3));
  out[out.length - 1].end = total;

  fs.mkdirSync(OUT, {recursive: true});

  // কনক্যাট ফাইল তালিকা
  const listFile = path.join(tmp, 'concat_list.txt');
  fs.writeFileSync(listFile, list.map((p) => `file '${p.replace(/\\/g, '/')}'`).join('\n'));

  const finalMp3 = path.join(OUT, 'voice.mp3');
  ffmpeg(`-y -f concat -safe 0 -i "${listFile}" -c:a libmp3lame -b:a 128k "${finalMp3}"`);

  const timingFile = path.join(OUT, 'timing.json');
  fs.writeFileSync(timingFile, JSON.stringify({total, segments: out}, null, 2));

  console.log(`\n🎉 সম্পন্ন!`);
  console.log(`মোট দৈর্ঘ্য: ${total.toFixed(2)}s`);
  console.log(`voice.mp3: ${finalMp3}`);
  console.log(`timing.json: ${timingFile}`);
  console.log(`নতুন ক্যারেক্টার খরচ: ${newChars}`);
}

main().catch((err) => {
  console.error('ব্যর্থ:', err);
  process.exit(1);
});
