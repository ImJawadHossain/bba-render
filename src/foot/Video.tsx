import React from 'react';
import {interpolate} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, clampOpts, out} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, SP, pick} from '../common/kit';
import {Chip, Mobile, Num, PROF, Pop, PsyThumb, S, Stamp, Word, YOU, Yr, a} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const footFallback = makeFallback(segs);

const GUARD: ToonLook = {skin: '#d9a07a', hair: '#1c1410', hairStyle: 'short', top: '#1f3a5a', bottom: '#16283f', tie: '#0f1730'};
const OWNER: ToonLook = CAST.customer;
const OWNER2: ToonLook = CAST.customer2;

const Sticker: React.FC<{size?: number; rot?: number}> = ({size = 460, rot = -5}) => (
  <div style={{width: size, height: size * 0.55, background: '#fff6c8', border: `${size * 0.016}px dashed #1b1b1f`, borderRadius: size * 0.07, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${rot}deg)`, fontSize: size * 0.135, fontWeight: 900, color: '#15151b', boxShadow: '0 16px 34px rgba(0,0,0,0.45)', textAlign: 'center', lineHeight: 1.2}}>
    ভালো চালক হোন
  </div>
);

const Billboard: React.FC<{w?: number; rot?: number}> = ({w = 760, rot = 3}) => (
  <div style={{position: 'relative', width: w, transform: `rotate(${rot}deg)`}}>
    <div style={{background: '#f2d23c', border: '14px solid #1b1b1f', padding: `${w * 0.05}px ${w * 0.03}px`, textAlign: 'center', fontSize: w * 0.13, fontWeight: 900, lineHeight: 1.15, color: '#15151b', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'}}>সাবধানে গাড়ি চালান</div>
    <div style={{position: 'absolute', left: w * 0.14, top: '100%', width: w * 0.04, height: w * 0.32, background: '#6a4a34', border: '6px solid #1b1b1f'}} />
    <div style={{position: 'absolute', right: w * 0.14, top: '100%', width: w * 0.04, height: w * 0.32, background: '#6a4a34', border: '6px solid #1b1b1f'}} />
  </div>
);

const House: React.FC<{x?: number; y?: number; w?: number; sticker?: boolean; color?: string}> = ({x = 150, y = 620, w = 780, sticker, color = '#e0d0b0'}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w}}>
    <svg viewBox="0 0 400 180" width={w} height={w * 0.45} style={{display: 'block', overflow: 'visible', marginBottom: -4}}>
      <path d="M0 180 L200 8 L400 180Z" fill="#9a3a2a" stroke="#1b1b1f" strokeWidth={6} />
    </svg>
    <div style={{position: 'relative', height: w * 0.62, background: color, border: '8px solid #1b1b1f', boxSizing: 'border-box', marginLeft: w * 0.05, marginRight: w * 0.05}}>
      <div style={{position: 'absolute', left: '40%', width: '20%', bottom: 0, height: '70%', background: '#6a4a34', border: '6px solid #1b1b1f'}} />
      <div style={{position: 'absolute', left: '8%', top: '18%', width: '24%', height: '40%', background: '#bfe0ee', border: '6px solid #1b1b1f'}}>{sticker ? <div style={{position: 'absolute', left: '15%', top: '60%', width: '70%', height: '24%', background: '#fff6c8', border: '3px solid #1b1b1f'}} /> : null}</div>
      <div style={{position: 'absolute', right: '8%', top: '18%', width: '24%', height: '40%', background: '#bfe0ee', border: '6px solid #1b1b1f'}} />
    </div>
  </div>
);
const SKY = 'linear-gradient(180deg, #4a7ab0 0%, #a8cce8 58%, #5a8a4a 59%, #3a6030 100%)';
const LeftHouse = (o: {sticker?: boolean} = {}) => <House x={120} y={420} w={840} sticker={o.sticker} />;

const Shoe: React.FC<{size?: number}> = ({size = 460}) => (
  <svg viewBox="0 0 200 110" width={size} height={size * 0.55} style={{overflow: 'visible', filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.5))'}}>
    <path d="M14 18 L70 12 L84 44 C110 60 160 62 186 74 C196 80 194 96 186 96 L18 96 C8 96 6 40 14 18Z" fill={RED} stroke="#1b1b1f" strokeWidth={5} />
    <rect x={8} y={90} width={186} height={14} rx={6} fill="#f2efe9" stroke="#1b1b1f" strokeWidth={4} />
    <path d="M84 44 L70 62 M100 52 L86 70 M116 56 L102 74" stroke="#f2efe9" strokeWidth={6} strokeLinecap="round" />
  </svg>
);

const SCENES: Record<string, React.FC<SP>> = {
  big: S({bg: 'dark', title: 'বড় কিছু চাইবে না', color: RED, at: 0.3, actors: [a(CAST.boss, 540, 'wink', 'idle', {h: 1100, y: 1720})]}),
  sticker: S({bg: 'plain', title: 'একটা ছোট্ট স্টিকার', front: () => <Pop x={150} y={700} at={2}><Sticker size={780} /></Pop>}),
  small: S({bg: 'office', actors: [a(CAST.worker, 280, 'smile', 'open', {h: 1000, talking: true, lookX: 1}), a(YOU, 800, 'neutral', 'idle', {h: 1000, lookX: -1})], bubble: '"ভাই, একটা ছোট কাজ, দুই মিনিট!"', by: 300, bsize: 60, front: (f, d) => <Stamp text="এখন রোজের দায়িত্ব" o={out(f, d * 0.6, d * 0.72)} size={72} top={520} />}),
  loan: S({bg: 'office', actors: [a(CAST.founder, 280, 'smile', 'open', {h: 1000, talking: true, lookX: 1}), a(YOU, 800, 'neutral', 'idle', {h: 1000, lookX: -1})], bubble: '"একশো টাকা ধার দিবি?"', by: 300, front: (f, d) => <Pop x={240} y={520} at={d * 0.55} rot={-4}><Chip size={70} bg={RED} color="#fff">"পাঁচ হাজার লাগত।"</Chip></Pop>}),
  trial: S({bg: 'plain', actors: [a(YOU, 800, 'worried', 'idle', {h: 960, y: 1660, lookX: -1})], front: (f, d) => <div style={{position: 'absolute', left: 90, top: 420}}><Mobile w={460} screen="#f2efe9"><div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, color: f > d * 0.5 ? RED : GREEN, fontWeight: 900, fontSize: 64, textAlign: 'center'}}>{f > d * 0.5 ? <><div>প্রতি মাসে</div><div style={{fontSize: 90}}>টাকা কাটা</div></> : <><div style={{fontSize: 110}}>FREE</div><div>ট্রায়াল</div></>}</div></Mobile></div>}),
  whyno: S({bg: 'plain', title: 'না বলতে পারো না কেন?', color: RED, actors: [a(YOU, 540, 'worried', 'shrug', {h: 1060, y: 1710})]}),
  yr: Yr('১৯৬৬', 'Palo Alto, California'),
  two: S({bg: 'office', actors: [a(PROF, 280, 'smile', 'explain', {h: 1000, talking: true}), a({...PROF, hair: '#2a1a12', hairStyle: 'side', jacket: '#2f4a6a'}, 800, 'thinking', 'idle', {h: 1000, lookX: -1})], name: ['Freedman আর Fraser', 'Stanford · দুই গবেষক']}),
  guards: S({bg: SKY, back: () => LeftHouse(), title: '"আমরা নিরাপত্তা কর্মী"', actors: [a(GUARD, 780, 'smile', 'explain', {h: 900, y: 1650, talking: true})]}),
  odd: S({bg: SKY, back: () => LeftHouse(), actors: [a(GUARD, 780, 'smile', 'open', {h: 900, y: 1650, lookX: -1}), a(OWNER, 300, 'surprised', 'idle', {h: 860, y: 1650, lookX: 1})], bubble: '"একটা অদ্ভুত অনুরোধ ছিল..."', by: 240, bsize: 62}),
  lawn: S({bg: SKY, back: () => LeftHouse(), title: 'সুন্দর লনে বিশাল সাইনবোর্ড!', size: 74, front: () => <Pop x={170} y={960} at={6}><Billboard w={740} /></Pop>}),
  ugly: S({bg: SKY, front: (f, d) => <><Pop x={60} y={500} at={2} damping={9}><Billboard w={960} rot={-3} /></Pop><Stamp text="কুৎসিত!" o={out(f, d * 0.45, d * 0.58)} size={110} top={1120} /></>}),
  cover: ({dur}) => S({bg: SKY, back: () => LeftHouse(), title: 'পুরো বাড়িটাই ঢেকে যাবে', front: (f) => { const k = interpolate(f, [0, dur * 0.7], [0.55, 1.22], clampOpts); return <div style={{position: 'absolute', left: 540, top: 1100, transform: `translate(-50%, -50%) scale(${k})`}}><Billboard w={800} rot={0} /></div>; }})({dur, id: 'cover'}),
  who: S({bg: SKY, back: () => LeftHouse(), title: 'কে রাজি হবে?', color: '#ffe680', actors: [a(OWNER, 540, 'shocked', 'shrug', {h: 1040, y: 1710})]}),
  r17: Num(17, {suffix: '%', label: 'রাজি হলো মাত্র', color: GOLD, sub: 'ঠিকই তো।'}),
  other: S({bg: SKY, title: 'আরেক দল বাড়িতে অন্য খেলা', size: 76, back: () => <><House x={10} y={640} w={520} color="#d8e0c4" /><House x={550} y={640} w={520} color="#e0c8c4" /></>}),
  twow: S({bg: SKY, back: () => LeftHouse(), title: 'দুই সপ্তাহ আগে', actors: [a(CAST.founder, 780, 'smile', 'open', {h: 900, y: 1650, talking: true}), a(OWNER, 300, 'neutral', 'idle', {h: 860, y: 1650, lookX: 1})]}),
  three: S({bg: 'plain', title: 'তিন ইঞ্চির স্টিকার', front: () => <Pop x={190} y={680} at={2}><Sticker size={700} /></Pop>}),
  sure: S({bg: SKY, back: () => LeftHouse({sticker: true}), title: 'সবাই রাজি', color: GREEN, actors: [a(OWNER, 760, 'smile', 'thumbsUp', {h: 900, y: 1650})]}),
  after: S({bg: SKY, back: () => LeftHouse({sticker: true}), title: 'দুই সপ্তাহ পর, সেই সাইনবোর্ড', size: 76, actors: [a(GUARD, 780, 'smile', 'explain', {h: 900, y: 1650, talking: true})], front: () => <Pop x={40} y={1000} at={6}><Billboard w={520} /></Pop>}),
  r76: Num(76, {suffix: '%', label: 'এবার রাজি হলো', color: GREEN}),
  arrow: S({bg: 'plain', front: (f) => { const g = interpolate(f, [0, 25], [17, 76], clampOpts); return <><div style={{position: 'absolute', left: 90, right: 90, top: 1160, height: 110, background: '#2a2d36', borderRadius: 18}}><div style={{width: `${g}%`, height: '100%', background: GREEN, borderRadius: 18, boxShadow: `0 0 40px ${GREEN}`}} /></div><div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', fontSize: 210, fontWeight: 900}}><span style={{color: GOLD}}>১৭</span><span style={{color: '#f2efe9'}}> → </span><span style={{color: GREEN}}>৭৬</span></div></>; }}),
  only: S({bg: 'plain', title: 'শুধু একটা স্টিকারের জন্য', front: () => <Pop x={340} y={760} at={2}><Sticker size={400} /></Pop>}),
  head: S({bg: 'plain', title: 'লেগেছে মানুষটার মাথায়', color: RED, actors: [a(OWNER, 540, 'surprised', 'idle', {h: 1300, y: 1860})], front: () => <Pop x={380} y={650} at={6} rot={-5}><Sticker size={320} rot={0} /></Pop>}),
  image: S({bg: SKY, back: () => LeftHouse({sticker: true}), actors: [a(OWNER, 540, 'smile', 'thumbsUp', {h: 1040, y: 1710})], bubble: '"আমি তো এমন মানুষ, যে নিরাপত্তা নিয়ে ভাবে।"', by: 240, bsize: 56}),
  against: Word('নিজের ছবির বিরুদ্ধে মানুষ যেতে পারে না', {size: 104, color: GOLD, top: 620}),
  ask: S({bg: 'office', actors: [a(YOU, 540, 'thinking', 'think', {h: 1060, y: 1710})], bubble: '"পরেরটা বড় হলে আমি কি রাজি হব?"', by: 300, bsize: 62}),
  goal: S({bg: 'plain', title: 'বড় লক্ষ্যেও এই কৌশল', color: GREEN, at: 0.1, actors: [a(YOU, 540, 'smile', 'pointUp', {h: 1060, y: 1710, talking: true})]}),
  shoes: S({bg: 'plain', title: 'আজ শুধু জুতাটা পরো', color: GREEN, front: (f, d) => <><Pop x={70} y={520} at={2} rot={-3}><Chip size={70} bg="#3a3e48" color="#9aa0aa" style={{textDecoration: `line-through ${RED} 8px`}}>প্রতিদিন এক ঘণ্টা ব্যায়াম</Chip></Pop><Pop x={300} y={900} at={d * 0.4}><Shoe size={520} /></Pop></>}),
  be: S({bg: 'plain', title: 'আগে "এমন মানুষ" হও', color: GREEN, actors: [a(YOU, 540, 'laugh', 'thumbsUp', {h: 1060, y: 1710})]}),
  cta: () => (
    <CtaScene>
      <Sticker size={560} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const FootThumbnail: React.FC = () => (
  <PsyThumb
    l1="বড় কিছু চাইবে না"
    l2="চাইবে একটা স্টিকার!"
    bottom="১৭% থেকে ৭৬% রাজি"
    term="Foot-in-the-Door"
    glow="rgba(242,210,60,0.3)"
    art={<div style={{position: 'absolute', left: 20, top: 900}}><Sticker size={560} /></div>}
    size={92}
  />
);
export const FootVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="foot/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<FootThumbnail />} />;
