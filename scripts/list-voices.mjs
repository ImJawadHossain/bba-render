// ElevenLabs-এর বাকি ক্রেডিট আর ভয়েসের তালিকা দেখায়। শুধু পড়ে, ক্রেডিট খরচ হয় না।
// চালাতে: node scripts/list-voices.mjs
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const line of fs.readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !line.trim().startsWith('#') && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const headers = {'xi-api-key': process.env.ELEVENLABS_API_KEY};
const get = async (p) => {
  const r = await fetch('https://api.elevenlabs.io' + p, {headers});
  if (!r.ok) throw new Error(`${p.split('?')[0]} -> ${r.status}`);
  return r.json();
};
const show = (v) =>
  [v.name, v.voice_id, v.category, v.labels?.gender ?? v.gender, v.labels?.age ?? v.age, v.labels?.accent ?? v.accent, v.labels?.language ?? v.language].join(' | ');

try {
  const s = await get('/v1/user/subscription');
  console.log(`ক্রেডিট: ${s.character_count} / ${s.character_limit} ব্যবহার হয়েছে; বাকি ${s.character_limit - s.character_count}`);
  console.log(`নিজের ভয়েসের জায়গা: ${s.voice_slots_used ?? '?'} / ${s.voice_limit ?? '?'}`);
} catch (e) {
  console.log('ক্রেডিট দেখা যায়নি:', e.message);
}

console.log('\n--- নিজের লাইব্রেরি ---');
const mine = await get('/v2/voices?page_size=100');
for (const v of mine.voices ?? []) {
  const bn = (v.verified_languages ?? []).some((l) => l.language === 'bn');
  console.log(`${bn ? '[bn] ' : ''}${show(v)}`);
}

console.log('\n--- Voice Library: বাংলা (শুধু তালিকা, কিছু যোগ হয় না) ---');
for (const gender of ['male', 'female']) {
  try {
    const r = await get(`/v1/shared-voices?language=bn&gender=${gender}&page_size=15&sort=usage_character_count_1y`);
    for (const v of r.voices ?? []) console.log(`${gender}: ${show(v)} | ${(v.description ?? '').slice(0, 70).replace(/\s+/g, ' ')}`);
  } catch (e) {
    console.log(`${gender}: খোঁজা যায়নি (${e.message})`);
  }
}
