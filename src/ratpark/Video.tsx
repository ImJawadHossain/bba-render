import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, SP, pick} from '../common/kit';
import {Bars, Chip, HandPhone, Mobile, Num, PROF, Paper, Pop, PsyThumb, S, Stack, Word, YOU, a} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const ratparkFallback = makeFallback(segs);

const BRUCE: ToonLook = {...PROF, hair: '#6a5a4a', hairStyle: 'side', beard: true, age: 0.3};
const SOLDIER: ToonLook = {skin: '#d9a07a', hair: '#1c1410', hairStyle: 'short', top: '#4a5a34', bottom: '#3a4a2a', shoes: '#1a1410'};
const SOLDIER2: ToonLook = {...SOLDIER, skin: '#8a5a3c'};
const DOCTOR: ToonLook = {...CAST.engineer, labCoat: true};

const Rat: React.FC<{size?: number; color?: string; sad?: boolean; flip?: boolean; lying?: boolean; bob?: number}> = ({size = 420, color = '#b8b0a8', sad, flip, lying, bob = 0}) => {
  const f = useCurrentFrame();
  const y = lying ? 0 : Math.sin((f + bob * 13) / 6) * 4;
  return (
    <svg viewBox="0 0 240 150" width={size} height={size * 0.625} style={{overflow: 'visible', transform: `${flip ? 'scaleX(-1) ' : ''}${lying ? 'rotate(8deg)' : ''}`}}>
      <path d={`M200 100 C232 ${96 + y} 240 ${70 + y} 232 ${52 + y}`} fill="none" stroke="#d99a9a" strokeWidth={8} strokeLinecap="round" />
      <ellipse cx={132} cy={92 + y} rx={78} ry={lying ? 40 : 48} fill={color} stroke="#1b1b1f" strokeWidth={5} />
      <circle cx={60} cy={82 + y} r={38} fill={color} stroke="#1b1b1f" strokeWidth={5} />
      <circle cx={72} cy={44 + y} r={22} fill="#d99a9a" stroke="#1b1b1f" strokeWidth={5} />
      {sad ? <path d={`M38 ${74 + y} L54 ${78 + y}`} stroke="#1b1b1f" strokeWidth={5} strokeLinecap="round" /> : <circle cx={46} cy={74 + y} r={6.5} fill="#1b1b1f" />}
      <circle cx={24} cy={90 + y} r={7} fill="#d97a8a" stroke="#1b1b1f" strokeWidth={3} />
      <path d={sad ? `M34 ${104 + y} Q42 ${98 + y} 50 ${104 + y}` : `M32 ${100 + y} Q42 ${110 + y} 52 ${100 + y}`} fill="none" stroke="#1b1b1f" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
};

const Bottle: React.FC<{size?: number; drug?: boolean; label?: string}> = ({size = 240, drug, label}) => (
  <div style={{position: 'relative', width: size * 0.55, textAlign: 'center'}}>
    <svg viewBox="0 0 80 190" width={size * 0.55} height={size * 1.3} style={{overflow: 'visible', filter: drug ? 'drop-shadow(0 0 24px #b05ad9)' : undefined}}>
      <path d="M28 4 L52 4 L52 40 L72 66 L72 180 L8 180 L8 66 L28 40Z" fill="rgba(240,245,250,0.3)" stroke="#1b1b1f" strokeWidth={5} />
      <path d="M11 92 L69 92 L69 177 L11 177Z" fill={drug ? '#a050d0' : '#6ab0e0'} />
      {drug ? <path d="M40 112 L58 150 L22 150Z" fill="none" stroke="#fff" strokeWidth={5} /> : null}
    </svg>
    {label ? <div style={{position: 'absolute', left: -60, right: -60, top: '102%', fontSize: size * 0.16, fontWeight: 900, color: drug ? '#d9a0f0' : '#a0d4f0'}}>{label}</div> : null}
  </div>
);

// ছোট অন্ধকার খাঁচা
const Cage: React.FC<{rat?: boolean; bottles?: boolean; lying?: boolean; h?: number; top?: number}> = ({rat = true, bottles = true, lying, top = 500}) => (
  <div style={{position: 'absolute', left: 90, right: 90, top, height: 860, background: '#12141a', overflow: 'hidden', border: '14px solid #8e9aa3', boxSizing: 'border-box'}}>
    {bottles ? (
      <>
        <div style={{position: 'absolute', left: 80, top: 130}}>
          <Bottle size={230} />
        </div>
        <div style={{position: 'absolute', left: 660, top: 130}}>
          <Bottle size={230} drug />
        </div>
      </>
    ) : null}
    {rat ? (
      <div style={{position: 'absolute', left: 280, top: 490}}>
        <Rat size={400} sad lying={lying} color="#8e8880" />
      </div>
    ) : null}
    {Array.from({length: 13}, (_, i) => (
      <div key={i} style={{position: 'absolute', left: 30 + i * 70, top: 0, bottom: 0, width: 6, background: '#5a6068'}} />
    ))}
  </div>
);

// Rat Park: রঙিন, অনেক ইঁদুর
const Park: React.FC<{bottles?: boolean; top?: number; h?: number; rats?: number}> = ({bottles, top = 400, h = 1020, rats = 9}) => {
  const POS: [number, number, number, string][] = [
    [50, 620, 260, '#d9c8a8'],
    [330, 700, 300, '#b8b0a8'],
    [640, 640, 270, '#c8a888'],
    [120, 420, 200, '#a8a098'],
    [420, 450, 180, '#d0c0b0'],
    [690, 400, 210, '#b0a090'],
    [240, 300, 140, '#c8b8a8'],
    [550, 280, 140, '#b8a898'],
    [760, 240, 120, '#c0b0a0'],
  ];
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top, height: h, overflow: 'hidden', border: '14px solid #e3bf7a', boxSizing: 'border-box', borderRadius: 26, background: 'linear-gradient(180deg, #8ad0e8 0%, #c8e8d0 42%, #7ac07a 43%, #4a9a5a 100%)'}}>
      <div style={{position: 'absolute', left: 60, top: 70, width: 130, height: 130, borderRadius: '50%', background: '#ffd84a'}} />
      <div style={{position: 'absolute', left: 380, top: 120, width: 160, height: 240, background: '#e0604a', borderRadius: '50% 50% 0 0', border: '6px solid #1b1b1f'}} />
      <div style={{position: 'absolute', left: 700, top: 90, width: 180, height: 180, border: '18px solid #5a7ad9', borderRadius: '50%'}} />
      {POS.slice(0, rats).map(([x, y, s, c], i) => (
        <div key={i} style={{position: 'absolute', left: x, top: y}}>
          <Rat size={s} color={c} flip={i % 2 === 0} bob={i} />
        </div>
      ))}
      {bottles ? (
        <>
          <div style={{position: 'absolute', left: 30, top: 130}}>
            <Bottle size={170} />
          </div>
          <div style={{position: 'absolute', left: 850, top: 130}}>
            <Bottle size={170} drug />
          </div>
        </>
      ) : null}
    </div>
  );
};

const Night2: React.FC = () => (
  <div style={{position: 'absolute', left: 300, top: 320, padding: '16px 40px', background: '#0c0e14', border: '8px solid #3a3e48', borderRadius: 20, fontSize: 130, fontWeight: 900, color: RED, fontVariantNumeric: 'tabular-nums'}}>২:০০</div>
);
const Tv: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', left: 110, top: 480, width: 860, height: 640, background: '#2a2c32', border: '16px solid #15171d', borderRadius: 34, padding: 34, boxSizing: 'border-box'}}>
    <div style={{width: '100%', height: '100%', background: '#3a1420', borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, color: '#fff', fontSize: 74, fontWeight: 900, textAlign: 'center'}}>{children}</div>
  </div>
);
const Move: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const g = interpolate(f, [dur * 0.1, dur * 0.8], [0, 1], clampOpts);
  return (
    <>
      <div style={{position: 'absolute', left: 30, top: 700, width: 330, height: 560, background: '#12141a', border: '12px solid #8e9aa3'}} />
      <div style={{position: 'absolute', left: 530, top: 480, width: 520, height: 900, border: '12px solid #e3bf7a', borderRadius: 24, background: 'linear-gradient(180deg, #8ad0e8 0%, #c8e8d0 42%, #7ac07a 43%, #4a9a5a 100%)'}} />
      <div style={{position: 'absolute', left: 80 + g * 580, top: 1000 - Math.sin(g * Math.PI) * 180}}>
        <Rat size={300} flip color="#a8a098" sad={g < 0.7} />
      </div>
    </>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  lone: S({bg: 'dark', title: 'একা: খেতে খেতে মরে গেল', color: RED, size: 78, back: () => <Cage lying />}),
  park: S({bg: 'plain', title: 'বন্ধুসহ: ছুঁয়েও দেখল না', color: GREEN, size: 78, back: () => <Park bottles />}),
  two: S({bg: 'night', actors: [a(YOU, 540, 'neutral', 'hold', {h: 960, y: 1700, holding: HandPhone})], front: () => <Night2 />}),
  nothing: S({bg: 'night', title: 'কিছু দেখার নেই, তবু', color: '#cfd6e0', front: () => <div style={{position: 'absolute', left: 310, top: 420}}><Mobile w={460}><div style={{position: 'absolute', inset: 0, display: 'grid', gap: 14, padding: 16}}>{[0, 1, 2].map((i) => <div key={i} style={{borderRadius: 12, background: '#2a2d36'}} />)}</div></Mobile></div>}),
  empty: S({bg: 'night', title: 'একটা ফাঁকা অনুভূতি', color: '#cfd6e0', actors: [a(YOU, 540, 'sad', 'idle', {h: 1060, y: 1710})], back: (f) => <div style={{position: 'absolute', left: 540 - 300, top: 700 - 300, width: 600, height: 600, borderRadius: '50%', background: `rgba(10,10,14,${0.5 + Math.sin(f / 10) * 0.1})`}} />}),
  weak: S({bg: 'night', actors: [a(YOU, 540, 'worried', 'think', {h: 1060, y: 1710})], bubble: '"আমি এত দুর্বল কেন?"', by: 330, bsize: 74}),
  sci: S({bg: 'office', title: 'নেশাটা জিনিসটার মধ্যে?', actors: [a(CAST.engineer, 720, 'serious', 'pointL', {h: 1040, talking: true})], front: () => <Pop x={110} y={720} at={2}><Bottle size={420} drug /></Pop>}),
  cage: S({bg: 'dark', title: 'দুই বোতল পানি', back: () => <Cage />}),
  drink: S({bg: 'dark', title: 'বারবার মাদকের পানি', color: '#d9a0f0', back: () => <Cage lying />}),
  tv: S({bg: 'dark', front: () => <Tv><div style={{fontSize: 130}}>সাবধান!</div><div>এই মাদক এত ভয়ংকর</div></Tv>}),
  bruce: S({bg: 'office', actors: [a(BRUCE, 540, 'thinking', 'think', {h: 1080, y: 1710})], name: ['Bruce Alexander', 'Canada · সাইকোলজিস্ট']}),
  alone: S({bg: 'dark', title: 'খাঁচায় ইঁদুরটা একা', color: RED, back: () => <Cage bottles={false} />}),
  dark: ({dur}) => S({bg: 'dark', back: () => <Cage bottles={false} />, front: () => <Stack dur={dur} items={['ছোট অন্ধকার বাক্স', 'কোনো সঙ্গী নেই', 'করার কিছু নেই']} top={340} size={62} />})({dur, id: 'dark'}),
  what: S({bg: 'dark', back: () => <Pop x={280} y={840} at={2}><Rat size={540} sad /></Pop>, bubble: '"মাদক না খেলে আর কী করব?"', by: 460, bsize: 66}),
  build: S({bg: 'plain', title: 'Rat Park', size: 130, color: GREEN, back: () => <Park rats={5} />}),
  big: S({bg: 'plain', title: 'দুইশো গুণ বড়!', color: GREEN, back: () => <Park rats={0} />, front: () => <Pop x={110} y={1000} at={2}><div style={{width: 130, height: 110, background: '#12141a', border: '8px solid #8e9aa3'}} /></Pop>}),
  color: S({bg: 'plain', title: 'রঙিন, খেলার জিনিসে ভরা', size: 80, color: GOLD, back: () => <Park rats={3} />}),
  friends: S({bg: 'plain', title: 'বন্ধু, সঙ্গী, বাচ্চা', color: GREEN, back: () => <Park />}),
  bottles: S({bg: 'plain', title: 'সেই একই দুই বোতল', back: () => <Park bottles />}),
  nearly: Bars([{label: 'একা খাঁচায়', value: 'বারবার খায়', pct: 88, color: RED}, {label: 'Rat Park', value: 'প্রায় ছুঁলই না', pct: 8, color: GREEN}], {title: 'মাদকের পানি', color: '#d9a0f0'}),
  less: S({bg: 'plain', title: 'অনেক অনেক কম', color: GREEN, back: () => <Park bottles rats={7} />}),
  same: Word('একই মাদক, শুধু জীবনটা আলাদা', {size: 124, color: GOLD}),
  addict: ({dur}) => S({bg: 'dark', title: 'আসক্ত ইঁদুরও কমিয়ে দিল', size: 78, color: GREEN, front: () => <Move dur={dur} />})({dur, id: 'addict'}),
  world: Word('বাস্তব দুনিয়ার প্রমাণ', {size: 140, color: RED}),
  viet: S({bg: 'war', title: 'Vietnam যুদ্ধ', color: GOLD, actors: [a(SOLDIER, 220, 'worried', 'idle', {h: 920, y: 1650}), a(SOLDIER2, 540, 'sad', 'idle', {h: 980, y: 1670}), a(SOLDIER, 860, 'worried', 'idle', {h: 920, y: 1650})]}),
  fear: S({bg: 'office', actors: [a(CAST.boss, 540, 'worried', 'open', {h: 1060, y: 1710, talking: true})], bubble: '"এরা দেশে ফিরলে সব শেষ!"', by: 300, bsize: 70}),
  study: S({bg: 'office', title: 'গবেষণা হলো', actors: [a(CAST.engineer, 720, 'thinking', 'idle', {h: 1040})], front: () => <Pop x={70} y={720} at={2}><Paper w={450} title="সৈন্যদের রিপোর্ট" dots={4} size={40} /></Pop>}),
  r95: Num(95, {suffix: '%', label: 'আর আসক্ত হয়নি', color: GREEN}),
  life: S({bg: 'sky', title: 'বদলেছে চারপাশের জীবন', color: GREEN, size: 78, actors: [a(SOLDIER, 400, 'laugh', 'wave', {h: 1020, y: 1680}), a(CAST.customer2, 690, 'laugh', 'open', {h: 960, y: 1660, lookX: -1}), a({...CAST.founder, headScale: 1.25}, 900, 'laugh', 'wave', {h: 640, y: 1650, lookX: -1})]}),
  opp: Word('নেশার উল্টো শুধু সংযম না', {size: 130, color: '#cfd6e0'}),
  conn: Word('সংযোগ', {size: 280, color: GREEN, top: 600, bg: 'radial-gradient(ellipse at 50% 50%, #2a5a3a, #07100a 72%)'}),
  call: S({bg: 'night', title: 'মেসেজ না, ফোন', color: GREEN, actors: [a(YOU, 540, 'smile', 'hold', {h: 1060, y: 1710, talking: true, holding: HandPhone})]}),
  someone: S({bg: 'night', title: 'অনেকদিন কথা হয়নি', front: () => <div style={{position: 'absolute', left: 310, top: 420}}><Mobile w={460}><div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 34, color: '#fff', fontSize: 56, fontWeight: 800}}><div style={{width: 200, height: 200, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110, color: '#15151b'}}>?</div>পুরোনো বন্ধু<Chip bg={GREEN} size={46}>কল করো</Chip></div></Mobile></div>}),
  help: S({bg: 'office', title: 'একা লড়ো না', color: GREEN, actors: [a(YOU, 280, 'worried', 'open', {h: 1020, talking: true, lookX: 1}), a(DOCTOR, 800, 'smile', 'idle', {h: 1020, lookX: -1})]}),
  cta: () => (
    <CtaScene>
      <Rat size={420} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const RatparkThumbnail: React.FC = () => (
  <PsyThumb
    l1="একই মাদক"
    l2="একা ইঁদুরটা মরে গেল!"
    bottom="তোমার নেশার দোষ কি নেশার?"
    term="Rat Park"
    glow="rgba(176,90,217,0.32)"
    art={<div style={{position: 'absolute', left: 40, top: 900}}><Rat size={480} sad /><div style={{position: 'absolute', left: 300, top: -340}}><Bottle size={250} drug /></div></div>}
    size={92}
  />
);
export const RatparkVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="ratpark/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<RatparkThumbnail />} />;
