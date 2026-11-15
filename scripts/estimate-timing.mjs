// ভয়েস ছাড়াই ভিডিও ডিজাইনের জন্য আনুমানিক timing.json বানায় (ElevenLabs খরচ নেই)।
// চালাতে: node scripts/estimate-timing.mjs law21 [law22 ...]
// হিসাবটা Law 6–20-এর আসল ভয়েস থেকে মাপা: দৃশ্যের সময় ≈ 0.069 × অক্ষর + 0.515 সেকেন্ড
// (গড়ে ±0.4 সেকেন্ড)। [long pause]-এ +0.95, চরিত্রের ভয়েস বদলালে +0.18, শেষে +1.4।
// পরে আসল ভয়েস বানাতে: node scripts/generate-audio.mjs lawNN — সেটা voice.mp3 আর আসল timing.json
// লিখে এই আনুমানিক ফাইলটা বদলে দেয়; ভিডিওর দৃশ্য নিজে থেকেই নতুন সময়ে বসে যায়।
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const strip = (t) => t.replace(/\[[^\]]*\]\s*/g, '').trim();

for (const v of process.argv.slice(2)) {
  const segs = JSON.parse(fs.readFileSync(path.join(root, 'src', v, 'segments.json'), 'utf8'));
  const out = path.join(root, 'public', v);
  if (fs.existsSync(path.join(out, 'voice.mp3'))) {
    console.log(`${v}: আসল voice.mp3 আছে, বাদ`);
    continue;
  }
  let t = 0;
  let prevVoice = 'narrator';
  const segments = segs.map((s, i) => {
    const voice = s.voice || 'narrator';
    const pause = /^\[long pause\]/.test(s.text) ? 0.95 : /^\[short pause\]/.test(s.text) ? 0.45 : voice !== prevVoice ? 0.18 : 0;
    prevVoice = voice;
    const start = t;
    const voiceStart = t + pause;
    t = voiceStart + 0.069 * strip(s.text).length + 0.515;
    if (i === segs.length - 1) t += 1.4;
    return {id: s.id, start: +start.toFixed(2), end: +t.toFixed(2), voiceStart: +voiceStart.toFixed(2)};
  });
  fs.mkdirSync(out, {recursive: true});
  fs.writeFileSync(path.join(out, 'timing.json'), JSON.stringify({total: +t.toFixed(2), estimated: true, segments}, null, 2));
  console.log(`${v}: আনুমানিক ${t.toFixed(1)}s, ${segments.length} দৃশ্য`);
}
