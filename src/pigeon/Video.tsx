import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, out} from '../biz/art';
import {CAST} from '../common/cast';
import {CtaScene, SP, pick} from '../common/kit';
import {Chip, HandPhone, Mobile, bn, PROF, Pop, PsyThumb, S, Stamp, Word, YOU, Yr, a} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const pigeonFallback = makeFallback(segs);

const SKINNER = {...PROF, hair: '#8a8580', hairStyle: 'receding' as const, labCoat: true, top: '#4a6a8a', age: 0.5};

// কবুতর: peck = ঠোকর দিচ্ছে কি না
const Pigeon: React.FC<{size?: number; peck?: boolean; flip?: boolean; fast?: boolean; calm?: boolean}> = ({size = 420, peck, flip, fast, calm}) => {
  const f = useCurrentFrame();
  const beat = peck ? Math.max(0, Math.sin(f / (fast ? 1.6 : 3))) : 0;
  return (
    <svg viewBox="0 0 240 240" width={size} height={size} style={{overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined}}>
      <path d="M210 150 L240 190 L196 180Z" fill="#6a7482" stroke="#1b1b1f" strokeWidth={5} />
      <path d="M92 214 L92 236 M124 214 L124 236" stroke="#d9605a" strokeWidth={9} strokeLinecap="round" />
      <ellipse cx={126} cy={158} rx={84} ry={62} fill="#9aa4b2" stroke="#1b1b1f" strokeWidth={5} />
      <path d="M120 130 C160 120 200 136 206 166 C176 186 136 180 120 130Z" fill="#7a8492" stroke="#1b1b1f" strokeWidth={5} />
      <g transform={`rotate(${beat * -46} 80 130)`}>
        <path d="M58 142 C50 120 54 94 70 80 L104 92 C108 110 110 128 104 146Z" fill="#6a8a8a" stroke="#1b1b1f" strokeWidth={5} />
        <circle cx={68} cy={68} r={32} fill="#7a8a9a" stroke="#1b1b1f" strokeWidth={5} />
        <path d="M38 64 L12 72 L38 80Z" fill="#e0a13a" stroke="#1b1b1f" strokeWidth={4} />
        <circle cx={58} cy={60} r={9} fill="#fff" stroke="#1b1b1f" strokeWidth={3} />
        <circle cx={55} cy={60} r={calm ? 3 : 5} fill={fast ? RED : '#1b1b1f'} />
      </g>
    </svg>
  );
};

// স্কিনার বাক্স: বোতাম, খাবারের খোপ
const SkinnerBox: React.FC<{peck?: boolean; fast?: boolean; food?: boolean; noBird?: boolean; dark?: boolean}> = ({peck, fast, food, noBird, dark}) => {
  const f = useCurrentFrame();
  const press = peck && Math.sin(f / (fast ? 1.6 : 3)) > 0.5;
  return (
    <>
      <div style={{position: 'absolute', left: 50, right: 50, top: 460, height: 1020, background: dark ? '#1a1c22' : '#3a3e48', border: '14px solid #8e9aa3', boxSizing: 'border-box', boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
        <div style={{position: 'absolute', left: 0, top: 120, width: 190, height: 640, background: '#5a6068', borderRight: '8px solid #1b1b1f'}}>
          <div style={{position: 'absolute', left: 40, top: 60, width: 110, height: 110, borderRadius: '50%', background: press ? '#ffd84a' : RED, border: '8px solid #1b1b1f', boxShadow: press ? '0 0 40px #ffd84a' : undefined}} />
          <div style={{position: 'absolute', left: 30, top: 320, width: 130, height: 150, background: '#15171d', border: '8px solid #1b1b1f'}}>
            {food ? [0, 1, 2, 3, 4].map((i) => <div key={i} style={{position: 'absolute', left: 20 + (i * 28) % 90, bottom: 8 + (i % 2) * 20, width: 24, height: 24, borderRadius: '50%', background: '#e3bf7a'}} />) : null}
          </div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, background: '#5a6068'}} />
      </div>
      {noBird ? null : (
        <div style={{position: 'absolute', left: 300, top: 780}}>
          <Pigeon size={640} peck={peck} fast={fast} />
        </div>
      )}
    </>
  );
};

const Feed: React.FC<{items: string[]; speed?: number}> = ({items, speed = 7}) => {
  const f = useCurrentFrame();
  const cols = ['#c0504a', '#2f5a9a', '#5a8a4a', '#8a5a9a', '#c9963a'];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: -((f * speed) % 360), display: 'grid', gap: 14, padding: 14}}>
      {[...items, ...items, ...items].map((t, i) => (
        <div key={i} style={{height: 340, borderRadius: 14, background: cols[i % cols.length], color: '#fff', fontWeight: 800, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 10}}>{t}</div>
      ))}
    </div>
  );
};
const PhoneAt: React.FC<{x?: number; y?: number; w?: number; items: string[]; speed?: number}> = ({x = 300, y = 410, w = 480, items, speed}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <Mobile w={w}>
      <Feed items={items} speed={speed} />
    </Mobile>
  </div>
);

const Finger: React.FC<{x: number; y: number; size?: number}> = ({x, y, size = 300}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 100 200" width={size} height={size * 2} style={{position: 'absolute', left: x, top: y + Math.sin(f / 4) * 60, overflow: 'visible'}}>
      <path d="M32 200 L32 34 C32 4 68 4 68 34 L68 200Z" fill="#c98d62" stroke="#1b1b1f" strokeWidth={5} />
      <path d="M42 14 C50 8 58 10 62 18 L60 42 L40 42Z" fill="#efd0b8" stroke="#1b1b1f" strokeWidth={3} />
    </svg>
  );
};

const Slot: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const sym = ['৭', '★', '♥', '$', '?'];
  return (
    <div style={{position: 'absolute', left: 120, top: 500, width: 840, height: 820, background: 'linear-gradient(180deg, #a01a2a, #5a0e18)', border: '16px solid #e3bf7a', borderRadius: 40, boxSizing: 'border-box', boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 40, textAlign: 'center', fontSize: 96, fontWeight: 900, color: GOLD}}>JACKPOT?</div>
      <div style={{position: 'absolute', left: 50, right: 50, top: 210, height: 340, display: 'flex', gap: 20}}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{flex: 1, background: '#f6f2e8', border: '8px solid #1b1b1f', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 190, fontWeight: 900, color: RED}}>
            {f < dur * 0.8 ? sym[Math.floor(f / 2 + i * 2) % 5] : sym[i]}
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 240, right: 240, top: 620, height: 80, background: '#15171d', borderRadius: 40}} />
    </div>
  );
};

const FEED = ['হয়তো দারুণ', 'ফালতু', 'হয়তো সেরা', 'আরেকটা!', 'পরেরটা?'];
const Foods: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', left: 90, top: 1330, fontSize: 90, fontWeight: 900, color: GOLD}}>×{bn(Math.floor(f * 11))}</div>;
};

const SCENES: Record<string, React.FC<SP>> = {
  peck: S({bg: 'dark', title: 'খাবার বন্ধ, তবু ঠোকরাচ্ছে', color: RED, size: 74, back: () => <SkinnerBox peck fast />, front: () => <Foods />}),
  finger: S({bg: 'dark', title: 'নিজের আঙুলের দিকে তাকাও', color: GOLD, size: 74, front: () => <><PhoneAt items={FEED} speed={14} /><Finger x={600} y={760} /></>}),
  sleep: S({bg: 'night', actors: [a(YOU, 540, 'neutral', 'hold', {h: 1060, y: 1710, holding: HandPhone})], title: 'ঘুমাতে যাবে বলে...', color: '#cfd6e0'}),
  five: S({bg: 'night', front: (f, d) => <><Word5 f={f} d={d} /></>}),
  junk: S({bg: 'dark', front: (f, d) => <><PhoneAt items={['ফালতু', 'ফালতু', 'ফালতু']} speed={8} /><Stamp text="ফালতু" o={out(f, 2, 10)} size={120} top={260} /></>}),
  nostop: S({bg: 'dark', title: 'তবু আঙুল থামছে না', color: RED, front: () => <><PhoneAt items={FEED} speed={18} /><Finger x={620} y={760} /></>}),
  cage: S({bg: 'dark', title: 'কারণটা ওই খাঁচায়', back: () => <SkinnerBox peck />}),
  yr: Yr('১৯৫০', 'এর দশক · Harvard University'),
  box: S({bg: 'plain', actors: [a(SKINNER, 780, 'smile', 'pointL', {h: 1000, talking: true})], name: ['B.F. Skinner', 'সাইকোলজিস্ট'], front: () => <Pop x={40} y={880} at={4}><MiniBox /></Pop>}),
  btn: S({bg: 'dark', title: 'ঠোকর দিলেই খাবার', color: GREEN, back: () => <SkinnerBox peck food />}),
  rule1: S({bg: 'dark', title: 'প্রতিবার ঠোকরালে, একবার খাবার', color: GREEN, size: 70, back: () => <SkinnerBox peck food />}),
  full: S({bg: 'plain', title: 'পেট ভরল, চলে গেল', color: GREEN, front: () => <><Pop x={210} y={600} at={2}><Pigeon size={660} calm /></Pop><Pop x={380} y={1270} at={16}><Chip size={70} bg={GREEN}>একদম সুস্থ</Chip></Pop></>}),
  change: S({bg: 'office', actors: [a(SKINNER, 540, 'wink', 'explain', {h: 1060, y: 1710, talking: true})], title: 'নিয়মটা একটু বদলালেন', color: RED}),
  maybe: Word('আসতেও পারে, না-ও পারে', {size: 130, color: GOLD, top: 600}),
  random: S({bg: 'dark', title: 'এলোমেলো', color: RED, front: (f) => <div style={{position: 'absolute', left: 60, right: 60, top: 500, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14}}>{Array.from({length: 24}, (_, i) => { const hit = [0, 1, 19].includes(i); const on = f > i * 2; return <div key={i} style={{aspectRatio: '1', borderRadius: 14, background: !on ? '#22252c' : hit ? GREEN : '#4a2028', border: '5px solid #1b1b1f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, fontWeight: 900, color: '#fff'}}>{on ? (hit ? '✓' : '×') : ''}</div>; })}</div>}),
  noway: Word('?', {size: 520, color: RED, top: 460, sub: '', back: () => null}),
  crazy: S({bg: 'dark', title: 'পাগল হয়ে গেল!', color: RED, back: () => <SkinnerBox peck fast />}),
  fullstill: S({bg: 'dark', title: 'পেট ভরা, তবু ঠোকরাচ্ছে', color: RED, size: 76, back: () => <SkinnerBox peck fast food />}),
  hours: S({bg: 'dark', back: () => <SkinnerBox peck fast />, front: () => <Foods />, title: 'ঘণ্টার পর ঘণ্টা', color: GOLD}),
  off: S({bg: 'dark', back: () => <SkinnerBox peck fast dark />, front: (f) => <Stamp text="খাবার বন্ধ" o={out(f, 2, 10)} size={110} top={260} />}),
  notfood: S({bg: 'plain', front: (f, d) => <><Pop x={380} y={600} at={2}><div style={{width: 320, height: 320, borderRadius: '50%', background: '#e3bf7a', border: '10px solid #1b1b1f'}} /></Pop><svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: out(f, d * 0.2, d * 0.4)}}><path d="M340 560 L740 960 M740 560 L340 960" stroke={RED} strokeWidth={28} strokeLinecap="round" /></svg></>, title: 'নেশাটা খাবারের না', color: RED}),
  next: Word('"পরেরবার হয়তো আসবে"', {size: 124, color: GOLD}),
  pull: S({bg: 'dark', title: 'নিচে টানলে নতুন কিছু', front: () => <><PhoneAt items={['হয়তো দারুণ', 'হয়তো ফালতু']} speed={10} /><Finger x={620} y={760} /></>}),
  nextv: S({bg: 'dark', title: 'পরেরটা হয়তো সেরা', color: GREEN, front: () => <PhoneAt items={['সেরা?', 'আরেকটা', 'এটাই?']} speed={16} />}),
  notif: S({bg: 'dark', front: (f) => <><div style={{position: 'absolute', left: 300, top: 410}}><Mobile w={480}><div style={{position: 'absolute', left: 26, right: 26, top: 150, display: 'grid', gap: 20}}><Chip size={36}>কেউ প্রশংসা করেছে?</Chip><Chip size={36}>অ্যাপের বিজ্ঞাপন?</Chip></div></Mobile></div><div style={{position: 'absolute', left: 700, top: 370, width: 150, height: 150, borderRadius: '50%', background: RED, border: '8px solid #1b1b1f', transform: `scale(${1 + Math.sin(f / 4) * 0.12})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 90, fontWeight: 900, color: '#fff'}}>১</div></>}),
  slot: ({dur}) => S({bg: 'dark', title: 'ঠিক স্লট মেশিন', color: GOLD, front: () => <Slot dur={dur} />})({dur, id: 'slot'}),
  regret: S({bg: 'office', actors: [a(CAST.engineer, 540, 'sad', 'shrug', {h: 1060, y: 1710, talking: true})], bubble: '"এর জন্য আমার আফসোস হয়।"', by: 300, bsize: 68, name: undefined, title: undefined}),
  notweak: Word('তুমি দুর্বল না', {size: 170, color: GREEN}),
  design: S({bg: 'plain', title: 'তোমাকে হারানোর ডিজাইন', color: RED, actors: [a(CAST.engineer, 180, 'serious', 'idle', {h: 800, y: 1640, lookX: 1}), a(CAST.exec, 400, 'serious', 'idle', {h: 800, y: 1640, lookX: 1}), a(CAST.ceo, 620, 'serious', 'idle', {h: 800, y: 1640, lookX: 1}), a(YOU, 890, 'worried', 'hold', {h: 720, y: 1640, lookX: -1, holding: HandPhone})]}),
  notifoff: S({bg: 'dark', title: 'নোটিফিকেশন বন্ধ', color: GREEN, front: (f, d) => { const on = f < d * 0.3; return <><div style={{position: 'absolute', left: 300, top: 620, width: 480, height: 230, borderRadius: 120, background: on ? RED : '#3a3e48', border: '12px solid #1b1b1f'}}><div style={{position: 'absolute', left: on ? 260 : 10, top: 10, width: 186, height: 186, borderRadius: '50%', background: '#f2efe9', border: '8px solid #1b1b1f', boxSizing: 'border-box'}} /></div><div style={{position: 'absolute', left: 0, right: 0, top: 960, textAlign: 'center', opacity: out(f, d * 0.5, d * 0.6)}}><Chip size={62} bg={GREEN}>শুধু মানুষের মেসেজ ছাড়া</Chip></div></>; }}),
  bed: S({bg: 'night', title: 'ফোন বিছানা থেকে দূরে', back: () => <><div style={{position: 'absolute', left: 40, top: 1180, width: 620, height: 240, background: '#3a5a8a', border: '8px solid #1b1b1f', borderRadius: 30}} /><div style={{position: 'absolute', left: 60, top: 1110, width: 230, height: 110, background: '#d8dce4', border: '6px solid #1b1b1f', borderRadius: 30}} /><div style={{position: 'absolute', left: 780, top: 1220, width: 240, height: 200, background: '#6a4a34', border: '8px solid #1b1b1f'}} /></>, front: () => <Pop x={850} y={1060} at={4}><div style={{width: 90, height: 160, background: '#15171d', border: '8px solid #4a4a50', borderRadius: 14}} /></Pop>}),
  less: Word('এলোমেলো পুরস্কার নেই, ইচ্ছাও কম', {size: 106, color: GREEN}),
  end: S({bg: 'night', title: 'ফোনটা এবার রাখো', color: GREEN, actors: [a(YOU, 540, 'smile', 'open', {h: 1060, y: 1710})]}),
  cta: () => (
    <CtaScene>
      <Pigeon size={440} calm />
    </CtaScene>
  ),
};

function Word5({f, d}: {f: number; d: number}) {
  const n = Math.min(60, Math.floor((f / Math.max(1, d * 0.8)) * 60) + 5);
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontSize: 250, fontWeight: 900, color: n >= 60 ? RED : GOLD}}>{String(n).replace(/\d/g, (x) => '০১২৩৪৫৬৭৮৯'[Number(x)])}</div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 880, textAlign: 'center', fontSize: 90, fontWeight: 800}}>মিনিট</div>
    </>
  );
}
function MiniBox() {
  return (
    <div style={{position: 'relative', width: 440, height: 440, background: '#3a3e48', border: '12px solid #8e9aa3', boxSizing: 'border-box'}}>
      <div style={{position: 'absolute', left: 20, top: 40, width: 70, height: 70, borderRadius: '50%', background: RED, border: '6px solid #1b1b1f'}} />
      <div style={{position: 'absolute', left: 16, top: 170, width: 80, height: 90, background: '#15171d', border: '6px solid #1b1b1f'}} />
      <div style={{position: 'absolute', left: 130, top: 130}}>
        <Pigeon size={280} calm />
      </div>
    </div>
  );
}

const Scene = pick(SCENES);

export const PigeonThumbnail: React.FC = () => (
  <PsyThumb
    l1="খাবার বন্ধ, পেট ভরা"
    l2="তবু ঠোকরাচ্ছে!"
    bottom="এবার নিজের আঙুল দেখো"
    term="Variable Reward · Skinner"
    glow="rgba(224,36,60,0.28)"
    art={<div style={{position: 'absolute', left: -20, top: 780}}><Pigeon size={620} peck /></div>}
  />
);
export const PigeonVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="pigeon/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<PigeonThumbnail />} />;
