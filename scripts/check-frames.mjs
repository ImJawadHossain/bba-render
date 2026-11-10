// প্রতিটা দৃশ্যের মাঝখান থেকে একটা ছোট ফ্রেম তুলে এক পাতায় সাজায় (পুরো ভিডিও রেন্ডার না করে যাচাই)।
// শুধু GitHub Actions-এ চলে (.github/workflows/check.yml); ল্যাপটপে চালাবে না।
// node scripts/check-frames.mjs Law21Wholesale Law22Parlour ...
import {execSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderStill, selectComposition} from '@remotion/renderer';

const ids = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browser = await openBrowser('chrome');
fs.mkdirSync('out/check', {recursive: true});
for (const id of ids) {
  const comp = await selectComposition({serveUrl, id, puppeteerInstance: browser});
  const segs = comp.props.timing.segments;
  const dir = `out/check/${id}`;
  fs.mkdirSync(dir, {recursive: true});
  for (const [i, s] of segs.entries()) {
    const frame = Math.min(comp.durationInFrames - 1, Math.round((s.start + (s.end - s.start) * 0.65) * 30));
    await renderStill({composition: comp, serveUrl, frame, output: `${dir}/${String(i + 1).padStart(2, '0')}.jpeg`, imageFormat: 'jpeg', scale: 0.25, puppeteerInstance: browser});
  }
  const rows = Math.ceil(segs.length / 7);
  execSync(`ffmpeg -y -v error -framerate 1 -i "${dir}/%02d.jpeg" -vf "tile=7x${rows}:padding=4:color=black" -frames:v 1 -q:v 4 "out/${id}-check.jpg"`);
  console.log(`${id}: ${segs.length} দৃশ্য`);
}
await browser.close({silent: true});
