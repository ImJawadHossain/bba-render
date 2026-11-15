import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, clampOpts, out} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {At, CtaScene, SP, pick} from '../common/kit';
import {Beam, Brain, Chip, HandPhone, Num, PROF, Paper, Pop, PsyThumb, S, SOpts, Stamp, Word, YOU, Yr, a} from '../common/psy';
import {Toon} from '../common/Toon';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const bystanderFallback = makeFallback(segs);

const KITTY: ToonLook = {skin: '#efc6a6', hair: '#2a1a12', hairStyle: 'bob', top: '#7a2a3a', jacket: '#3a3a44', bottom: '#22252c', skirt: '#22252c'};
const LAT: ToonLook = {...PROF, hair: '#2a1a12', hairStyle: 'side', age: 0.1};
const DAR: ToonLook = {...PROF, hair: '#6a4a2a', hairStyle: 'short', age: 0.1, glasses: false};
const STUDENT: ToonLook = {skin: '#e0ac86', hair: '#3a2418', hairStyle: 'curly', top: '#5a8a5a', bottom: '#2a2c30', shoes: '#e8e4dc'};
const SHILL: ToonLook = {skin: '#d9a07a', hair: '#1c1410', hairStyle: 'short', top: '#8a8e96', bottom: '#2a2c30'};
const SHILL2: ToonLook = {...SHILL, skin: '#efc6a6', hair: '#5a3a22', top: '#7a7e86'};
const BLUE: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#2b5fd9', bottom: '#2a2c30'};

const STREET = 'linear-gradient(180deg, #6a7a88 0%, #8a96a0 52%, #4a4e54 53%, #2a2c30 100%)';

const Road: React.FC = () => (
  <>
    {[60, 340, 700].map((x, i) => (
      <div key={x} style={{position: 'absolute', left: x, top: 380 + (i % 2) * 80, width: 250, height: 640 - (i % 2) * 80, background: '#4a5462', border: '6px solid #2a2c32', backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 60px, rgba(255,230,160,0.35) 60px 90px, transparent 90px 130px)'}} />
    ))}
  </>
);

// রাস্তায় পড়ে থাকা মানুষ
const Fallen: React.FC<{x?: number; y?: number; h?: number}> = ({x = 540, y = 1360, h = 700}) => (
  <div style={{position: 'absolute', left: x - h * 0.17, top: y - h * 0.5, transform: 'rotate(-88deg)'}}>
    <Toon height={h} {...CAST.worker} expression="sad" seed="fallen" />
  </div>
);
const RING: [number, number, ToonLook][] = [
  [120, 1180, CAST.customer],
  [300, 1140, CAST.customer2],
  [480, 1120, CAST.founder],
  [660, 1120, CAST.exec],
  [840, 1140, CAST.pro],
  [980, 1180, CAST.ceo],
];
const Ring: React.FC<{phones?: boolean; h?: number; me?: boolean}> = ({phones, h = 640, me}) => (
  <>
    {RING.map(([x, y, l], i) => (
      <At key={x} x={x} y={y}>
        <Toon height={h} {...(me && i === 2 ? YOU : l)} expression={i % 2 ? 'worried' : 'neutral'} gesture={phones && i % 2 ? 'hold' : 'idle'} holding={phones && i % 2 ? HandPhone : undefined} lookX={x < 540 ? 0.6 : -0.6} seed={`r${i}`} />
      </At>
    ))}
  </>
);

// রাতের অ্যাপার্টমেন্ট
const Building: React.FC<{lit?: number[]; scream?: boolean}> = ({lit = [], scream}) => {
  const f = useCurrentFrame();
  let n = -1;
  return (
    <div style={{position: 'absolute', left: 90, right: 90, top: 300, height: 1290, background: '#262a36', border: '10px solid #15171d'}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 34, padding: 40}}>
        {Array.from({length: 20}, () => {
          n += 1;
          const on = lit.includes(n);
          return <div key={n} style={{height: 150, background: on ? '#f2d68a' : '#12141a', border: '6px solid #15171d', boxShadow: on ? '0 0 30px rgba(242,214,138,0.6)' : undefined}} />;
        })}
      </div>
      {scream ? <div style={{position: 'absolute', left: 30, top: 880, fontSize: 90, fontWeight: 900, color: RED, transform: `rotate(-6deg) scale(${1 + Math.sin(f / 3) * 0.05})`}}>"বাঁচান!"</div> : null}
    </div>
  );
};

const Newspaper: React.FC = () => (
  <div style={{width: 900, background: '#ece6d6', border: '10px solid #1b1b1f', padding: 36, boxSizing: 'border-box', color: '#15151b', transform: 'rotate(-2deg)', boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
    <div style={{fontSize: 74, fontWeight: 900, borderBottom: '8px double #1b1b1f', paddingBottom: 12, textAlign: 'center'}}>New York Times</div>
    <div style={{fontSize: 108, fontWeight: 900, lineHeight: 1.2, marginTop: 26}}>৩৮ জন শুনেছিল</div>
    <div style={{fontSize: 76, fontWeight: 800, color: RED, marginTop: 8}}>কেউ পুলিশ ডাকেনি</div>
    {[0, 1, 2].map((i) => <div key={i} style={{height: 16, background: '#b8b09c', marginTop: 22, width: `${94 - i * 12}%`}} />)}
  </div>
);

// ধোঁয়া ভরা ঘর
const Smoke: React.FC<{k?: number; dur?: number; grow?: boolean}> = ({k = 0.5, dur = 90, grow}) => {
  const f = useCurrentFrame();
  const amount = grow ? interpolate(f, [0, dur], [k * 0.3, k], clampOpts) : k;
  return (
    <>
      <div style={{position: 'absolute', left: 840, top: 330, width: 170, height: 110, background: '#2a2c32', border: '8px solid #1b1b1f', backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 18px, #6a6e76 18px 24px)'}} />
      {Array.from({length: 22}, (_, i) => {
        const p = ((f * 1.6 + i * 60) % 1100) / 1100;
        return <div key={i} style={{position: 'absolute', left: 920 - p * 900 + Math.sin((f + i * 9) / 22) * 50 - 170, top: 380 + p * 900 + ((i * 53) % 240) - 120, width: 340 + p * 120, height: 340 + p * 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(205,210,218,0.55), rgba(205,210,218,0) 68%)', opacity: amount}} />;
      })}
      <div style={{position: 'absolute', inset: 0, background: `rgba(190,195,204,${amount * 0.4})`}} />
    </>
  );
};
const Desk: React.FC<{x: number; y?: number; w?: number}> = ({x, y = 1400, w = 400}) => (
  <div style={{position: 'absolute', left: x - w / 2, top: y, width: w, height: 40, background: '#6a4a34', border: '6px solid #1b1b1f'}}>
    <div style={{position: 'absolute', left: w * 0.25, top: -26, width: w * 0.5, height: 26, background: '#f6f2e8', border: '4px solid #1b1b1f'}} />
    <div style={{position: 'absolute', left: 20, right: 20, top: 34, height: 220, background: '#3a2a20'}} />
  </div>
);
const ROOM = 'linear-gradient(180deg, #5a5e66, #2a2c32)';
const One = (o: SOpts & {k?: number; expr?: 'worried' | 'neutral' | 'surprised'; g?: 'idle' | 'pointUp'} = {}) =>
  S({
    bg: ROOM,
    ...o,
    actors: [a(STUDENT, 540, o.expr ?? 'neutral', o.g ?? 'idle', {h: 960, y: 1660})],
    front: () => (
      <>
        <Desk x={540} />
        {o.k ? <Smoke k={o.k} /> : null}
      </>
    ),
  });
const Three = (o: SOpts & {k?: number} = {}) =>
  S({
    bg: ROOM,
    ...o,
    actors: [a(SHILL, 180, 'neutral', 'idle', {h: 840, y: 1620, lookX: 0.2}), a(STUDENT, 540, 'worried', 'idle', {h: 900, y: 1640, lookX: 0.7}), a(SHILL2, 900, 'neutral', 'idle', {h: 840, y: 1620, lookX: -0.2})],
    front: () => (
      <>
        <Desk x={180} w={300} />
        <Desk x={540} w={320} />
        <Desk x={900} w={300} />
        {o.k ? <Smoke k={o.k} /> : null}
      </>
    ),
  });

const Candle: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 100 220" width={230} height={506} style={{position: 'absolute', left: 425, top: 520, overflow: 'visible'}}>
      <circle cx={50} cy={46} r={70} fill="rgba(255,200,110,0.16)" />
      <path d={`M50 ${10 + Math.sin(f / 4) * 3} C70 40 62 66 50 70 C38 66 30 40 50 ${10 + Math.sin(f / 4) * 3}Z`} fill="#ffc86a" />
      <rect x={30} y={76} width={40} height={140} rx={6} fill="#ece6d6" />
    </svg>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  hook: S({bg: STREET, back: () => <Road />, title: 'একশো জন থাকলে, সুযোগ কম!', color: RED, size: 64, front: () => <><Ring /><Fallen /></>}),
  you: S({bg: STREET, back: () => <Road />, front: () => <><Ring me /><Beam x={480} w={150} bottom={1150} /><Fallen /></>, title: 'ওই একজন তুমি নিজেও', color: GOLD}),
  fallen: S({bg: STREET, back: () => <Road />, front: () => <><Ring /><Fallen /></>, title: 'চারপাশে লোক জমে গেছে'}),
  stop: S({bg: STREET, back: () => <Road />, actors: [a(YOU, 540, 'thinking', 'think', {h: 1060, y: 1700})], bubble: '"কেউ না কেউ তো ডাক্তার ডেকেছে।"', by: 300, bsize: 60}),
  film: S({bg: STREET, back: () => <Road />, actors: [a(CAST.founder, 540, 'neutral', 'hold', {h: 1060, y: 1700, holding: HandPhone})], title: 'ভিডিও করছে', color: RED, front: (f) => <div style={{position: 'absolute', left: 660, top: 1040, width: 40, height: 40, borderRadius: '50%', background: RED, opacity: f % 20 < 10 ? 1 : 0.2}} />}),
  walk: S({bg: STREET, back: () => <Road />, title: 'আবার হাঁটা দিলে', actors: [a(YOU, 800, 'neutral', 'idle', {h: 1000, lookX: 1})], front: () => <Fallen x={320} y={1420} h={620} />}),
  night: S({bg: 'night', title: 'কেমন একটা অস্বস্তি', color: '#cfd6e0', actors: [a(YOU, 540, 'worried', 'think', {h: 1060, y: 1700})]}),
  yr: Yr('১৯৬৪', 'New York · ভোররাত', {bg: 'night'}),
  kitty: S({bg: 'night', actors: [a(KITTY, 540, 'neutral', 'idle', {h: 1060, y: 1710})], name: ['Kitty Genovese', 'কাজ থেকে বাসায় ফিরছিলেন'], back: () => <Building />}),
  hit: S({bg: 'night', back: () => <Building lit={[]} scream />}),
  died: S({bg: '#040405', back: () => <Candle />, vig: 0.7}),
  times: S({bg: 'dark', front: () => <Pop x={90} y={520} at={2}><Newspaper /></Pop>}),
  shock: S({bg: 'dark', title: 'মানুষ কত নিষ্ঠুর!', color: RED, actors: [a(CAST.customer2, 180, 'shocked', 'idle', {h: 880, y: 1640}), a(CAST.ceo, 540, 'shocked', 'shrug', {h: 980, y: 1680}), a(CAST.worker, 900, 'shocked', 'idle', {h: 880, y: 1640})]}),
  darley: S({bg: 'office', actors: [a(DAR, 280, 'thinking', 'explain', {h: 1000, talking: true}), a(LAT, 800, 'thinking', 'think', {h: 1000, lookX: -1})], name: ['Darley আর Latané', 'তরুণ সাইকোলজিস্ট']}),
  q: Word('৩৮', {size: 420, color: RED, sub: 'সমস্যাটা কি এই সংখ্যাটাই?', subColor: GOLD, top: 480}),
  form: One({title: 'ফর্ম পূরণ করো', expr: 'neutral'}),
  smoke: One({k: 0.45, title: 'দেয়ালের ফুটো দিয়ে ধোঁয়া!', color: RED, size: 78}),
  more: One({k: 0.85, expr: 'surprised', title: 'ঘর ঝাপসা', color: RED}),
  alone: One({k: 0.6, expr: 'worried', title: 'একা থাকলে কী হলো?'}),
  r75: Num(75, {suffix: '%', label: 'উঠে গিয়ে জানাল', color: GREEN}),
  two: Three({title: 'আরও দুজন: গবেষকের লোক', size: 78, color: RED}),
  calm: Three({k: 0.45, title: 'তারা চুপচাপ ফর্ম পূরণ করছে', size: 72}),
  same: Word('একই ধোঁয়া, একই ঘর', {size: 130, color: '#cfd6e0'}),
  r10: Num(10, {suffix: '%', label: 'জানাল মাত্র', color: RED}),
  kept: Three({k: 1, title: 'ধোঁয়ায় ঢেকে যেতে যেতেও!', color: RED, size: 76}),
  errs: S({bg: 'plain', title: 'মাথার দুটো ভুল', color: RED, front: () => <><Pop x={250} y={520} at={2}><Brain size={580} /></Pop><Pop x={150} y={1080} at={10} rot={-5}><Chip size={110}>১</Chip></Pop><Pop x={800} y={1080} at={18} rot={5}><Chip size={110}>২</Chip></Pop></>}),
  e1: S({bg: STREET, back: () => <Road />, actors: [a(YOU, 540, 'thinking', 'shrug', {h: 1060, y: 1700})], bubble: '"কেউ তো কিছু করছে না, হয়তো বড় কিছু না।"', by: 300, bsize: 58}),
  e2: S({bg: STREET, back: () => <Road />, actors: [a(YOU, 540, 'smile', 'open', {h: 1060, y: 1700})], bubble: '"এত লোক আছে, নিশ্চয়ই কেউ করবে।"', by: 300, bsize: 60}),
  share: S({bg: 'plain', title: 'দায় ভাগ হয়ে শূন্য', color: RED, front: (f, d) => { const k = interpolate(f, [0, d * 0.8], [1, 0.06], clampOpts); return <><div style={{position: 'absolute', left: 540 - 300 * k, top: 860 - 300 * k, width: 600 * k, height: 600 * k, borderRadius: '50%', background: RED, boxShadow: `0 0 60px ${RED}`}} /><div style={{position: 'absolute', left: 0, right: 0, top: 1240, textAlign: 'center', fontSize: 130, fontWeight: 900, color: GOLD}}>{Math.round(k * 100).toString().replace(/\d/g, (x) => '০১২৩৪৫৬৭৮৯'[Number(x)])}% দায়</div></>; }}),
  nohelp: S({bg: STREET, back: () => <Road />, front: (f, d) => <><Ring /><Fallen /><Stamp text="এভাবে না" o={out(f, d * 0.5, d * 0.62)} size={90} top={170} /></>, bubble: '"কেউ সাহায্য করুন!"', by: 370, bx: 240, bsize: 58, bat: 0.05}),
  blue: S({bg: STREET, back: () => <Road />, actors: [a(BLUE, 800, 'surprised', 'hold', {h: 1040, lookX: -1, holding: HandPhone})], bubble: '"নীল শার্টের ভাই, আপনি অ্যাম্বুলেন্স ডাকুন!"', by: 300, bsize: 58, front: () => <><Fallen x={320} y={1460} h={620} /><Beam x={800} w={190} bottom={1660} /></>}),
  first: S({bg: STREET, back: () => <Road />, actors: [a(YOU, 540, 'serious', 'hold', {h: 1080, y: 1710, holding: HandPhone})], title: 'প্রথম মানুষটা তুমি হও', color: GREEN}),
  moves: S({bg: STREET, back: () => <Road />, title: 'একজন নড়লে, বাকিরাও নড়ে', color: GREEN, size: 76, actors: [a(CAST.customer2, 160, 'worried', 'open', {h: 860, y: 1620}), a(YOU, 400, 'serious', 'hold', {h: 960, y: 1660, holding: HandPhone}), a(CAST.founder, 660, 'serious', 'hold', {h: 900, y: 1640, holding: HandPhone}), a(CAST.exec, 910, 'worried', 'open', {h: 860, y: 1620})]}),
  cta: () => (
    <CtaScene>
      <Paper w={420} lines={['প্রথম মানুষটা', 'তুমি হও']} size={52} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const BystanderThumbnail: React.FC = () => (
  <PsyThumb
    l1="পাশে একশো জন থাকলে"
    l2="বাঁচার সুযোগ কম!"
    bottom="ওই ভিড়ে তুমি নিজেও"
    term="Bystander Effect"
    art={<Icon />}
    size={90}
  />
);
function Icon() {
  return (
    <div style={{position: 'absolute', left: 30, top: 850, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12}}>
      {Array.from({length: 25}, (_, i) => (
        <svg key={i} viewBox="0 0 40 60" width={84} height={126}>
          <circle cx={20} cy={12} r={10} fill={i === 12 ? RED : '#8e9aa3'} />
          <path d="M4 58 C4 34 8 26 20 26 C32 26 36 34 36 58Z" fill={i === 12 ? RED : '#8e9aa3'} />
        </svg>
      ))}
    </div>
  );
}
export const BystanderVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="bystander/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<BystanderThumbnail />} />;
