import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, clampOpts, out} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, SP, pick} from '../common/kit';
import {Bars, Book, Brain, Chip, Coin, PROF, Paper, Pop, PsyThumb, S, Stack, Stamp, YOU, Yr, a} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const franklinFallback = makeFallback(segs);

const FRANK: ToonLook = {skin: '#efc6a6', hair: '#7a5a3a', hairStyle: 'curly', top: '#f4f2ec', jacket: '#6a4a2a', bottom: '#4a3420', shoes: '#1a1410', glasses: true};
const FRANK_OLD: ToonLook = {...FRANK, hair: '#d8d4cc', hairStyle: 'balding', age: 0.8};
const FOE: ToonLook = {skin: '#e2b391', hair: '#e6e2da', hairStyle: 'side', top: '#f4f2ec', jacket: '#3a1f4a', bottom: '#2a1f30', shoes: '#1a1410', age: 0.5};
const FOE_OLD: ToonLook = {...FOE, age: 1};

const HALL = 'linear-gradient(180deg, #5a3a22 0%, #3a2414 60%, #1a100a 100%)';
const Columns: React.FC = () => (
  <>
    {[60, 400, 740].map((x) => (
      <div key={x} style={{position: 'absolute', left: x, top: 260, width: 280, height: 1200, background: 'linear-gradient(90deg, #8a6a4a, #c9a97a 50%, #6a4a2a)', opacity: 0.35}} />
    ))}
    <div style={{position: 'absolute', left: 0, right: 0, top: 1460, bottom: 0, background: '#2a1a10'}} />
  </>
);

const Gift: React.FC<{size?: number}> = ({size = 320}) => (
  <svg viewBox="0 0 120 120" width={size} height={size} style={{overflow: 'visible', filter: 'drop-shadow(0 16px 30px rgba(0,0,0,0.5))'}}>
    <rect x={14} y={44} width={92} height={70} rx={6} fill="#c0404a" stroke="#1b1b1f" strokeWidth={5} />
    <rect x={6} y={28} width={108} height={22} rx={5} fill="#d9545e" stroke="#1b1b1f" strokeWidth={5} />
    <rect x={52} y={28} width={16} height={86} fill={GOLD} stroke="#1b1b1f" strokeWidth={3} />
    <path d="M60 28 C40 -2 18 14 42 28 M60 28 C80 -2 102 14 78 28" fill="none" stroke={GOLD} strokeWidth={8} />
  </svg>
);
const Cross: React.FC<{size: number; x: number; y: number; o: number}> = ({size, x, y, o}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: x, top: y, opacity: o}}>
    <path d="M8 8 L92 92 M92 8 L8 92" stroke={RED} strokeWidth={14} strokeLinecap="round" />
  </svg>
);
const Podium: React.FC = () => <div style={{position: 'absolute', left: 620, top: 1300, width: 380, height: 420, background: '#6a4a2a', border: '10px solid #1b1b1f', borderRadius: 10}} />;

const FlyBook: React.FC<{from: number; to: number; dur: number; y?: number}> = ({from, to, dur, y = 1060}) => {
  const f = useCurrentFrame();
  const g = interpolate(f, [dur * 0.1, dur * 0.7], [0, 1], clampOpts);
  return (
    <div style={{position: 'absolute', left: from + (to - from) * g, top: y - Math.sin(g * Math.PI) * 100, transform: `rotate(${g * 20 - 10}deg)`}}>
      <Book size={210} />
    </div>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  hate: S({bg: 'plain', title: 'উপহার দিও না', color: RED, at: 0.3, actors: [a(CAST.boss, 760, 'serious', 'idle', {h: 1040, lookX: -1})], front: (f, d) => <><Pop x={70} y={800} at={2}><Gift size={380} /></Pop><Cross size={420} x={50} y={780} o={out(f, d * 0.35, d * 0.45)} /></>}),
  borrow: S({bg: 'plain', title: 'কিছু ধার করো!', color: GREEN, at: 0.05, actors: [a(YOU, 760, 'wink', 'open', {h: 1040, talking: true})], front: () => <Pop x={110} y={720} at={2} rot={-8}><Book size={360} /></Pop>}),
  frank: S({bg: HALL, back: () => <Columns />, actors: [a(FRANK, 280, 'wink', 'explain', {h: 1040, talking: true}), a(FOE, 800, 'smile', 'idle', {h: 1000, lookX: -1})], name: ['Benjamin Franklin', 'শত্রু থেকে আজীবনের বন্ধু']}),
  think: S({bg: 'office', actors: [a(YOU, 540, 'thinking', 'think', {h: 1060, y: 1710})], bubble: '"ওর জন্য কিছু করতে হবে..."', by: 300, bsize: 64}),
  gifts: ({dur}) => S({bg: 'office', front: () => <Stack dur={dur} items={['চা খাওয়াও', 'প্রশংসা করো', 'বসের সামনে নাম নাও']} top={360} size={76} />})({dur, id: 'gifts'}),
  turn: S({bg: 'office', title: 'তবু মুখ ঘুরিয়ে রাখে', color: RED, actors: [a(YOU, 270, 'worried', 'hold', {h: 960, lookX: 1, holding: <g transform="translate(-30 -60)"><path d="M6 10 L56 10 L50 60 L12 60Z" fill="#f2efe9" stroke="#1b1b1f" strokeWidth={5} /></g>}), a(CAST.exec, 790, 'skeptical', 'idle', {h: 1000, lookX: 1})]}),
  yr: Yr('১৭৩০', 'এর দশক · Pennsylvania, আমেরিকা'),
  speech: S({bg: HALL, back: () => <Columns />, actors: [a(FRANK, 240, 'worried', 'idle', {h: 860, y: 1660, lookX: 1}), a(FOE, 800, 'serious', 'pointL', {h: 1100, y: 1560, talking: true})], front: () => <Podium />, bubble: '"এই লোকটা অযোগ্য!"', by: 300, bx: 220, bsize: 68}),
  rich: S({bg: HALL, back: () => <Columns />, actors: [a(FOE, 540, 'serious', 'idle', {h: 1060, y: 1710})], front: (f, d) => <><Pop x={70} y={760} at={2} rot={-6}><Chip size={66}>ধনী</Chip></Pop><Pop x={740} y={760} at={8} rot={6}><Chip size={66}>ক্ষমতাবান</Chip></Pop><Coin size={110} style={{position: 'absolute', left: 120, top: 1000}} /><Coin size={90} style={{position: 'absolute', left: 860, top: 1040}} /><Stamp text="ক্যারিয়ার শেষ?" o={out(f, d * 0.6, d * 0.72)} size={84} top={330} /></>}),
  nogift: S({bg: HALL, back: () => <Columns />, title: 'তোষামোদ না, উপহার না', actors: [a(FRANK, 740, 'smile', 'shrug', {h: 1040})], front: (f, d) => <><Pop x={70} y={860} at={2}><Gift size={300} /></Pop><Cross size={330} x={55} y={850} o={out(f, d * 0.3, d * 0.4)} /></>}),
  rare: S({bg: 'radial-gradient(ellipse at 50% 50%, #5a4020, #0a0806 70%)', title: 'একটা দুর্লভ বই', front: () => <Pop x={330} y={520} at={2} rot={-4}><Book size={420} color="#7a1f2a" /></Pop>}),
  letter: S({bg: HALL, back: () => <Columns />, actors: [a(FRANK, 800, 'wink', 'hold', {h: 980, lookX: -1})], front: () => <Pop x={50} y={480} at={2}><Paper w={620} lines={['"আপনার ওই বইটা', 'কয়েকদিনের জন্য', 'ধার দেবেন?"']} rot={-3} size={58} /></Pop>}),
  sent: ({dur}) => S({bg: HALL, back: () => <Columns />, actors: [a(FOE, 210, 'smile', 'open', {h: 960, lookX: 1}), a(FRANK, 860, 'surprised', 'idle', {h: 960, lookX: -1})], title: 'সাথে সাথে পাঠিয়ে দিলেন', front: () => <FlyBook from={230} to={640} dur={dur} />})({dur, id: 'sent'}),
  back: ({dur}) => S({bg: HALL, back: () => <Columns />, actors: [a(FOE, 210, 'smile', 'idle', {h: 960, lookX: 1}), a(FRANK, 860, 'smile', 'open', {h: 960, lookX: -1})], title: 'এক সপ্তাহ পর: বই ফেরত', front: (f, d) => <><FlyBook from={640} to={230} dur={dur} /><Pop x={350} y={480} at={d * 0.4}><Chip size={70}>"ধন্যবাদ!"</Chip></Pop></>})({dur, id: 'back'}),
  next: S({bg: HALL, back: () => <Columns />, title: 'পরের অধিবেশন', actors: [a(CAST.ceo, 150, 'neutral', 'idle', {h: 760, y: 1600}), a(FOE, 540, 'smile', 'wave', {h: 1040}), a(CAST.boss, 930, 'surprised', 'idle', {h: 760, y: 1600, lookX: -1})]}),
  came: S({bg: HALL, back: () => <Columns />, actors: [a(FRANK, 800, 'surprised', 'idle', {h: 980, lookX: -1}), a(FOE, 280, 'smile', 'open', {h: 1020, talking: true, lookX: 1})], bubble: '"কেমন আছেন, Franklin সাহেব?"', by: 320, bsize: 58}),
  side: S({bg: HALL, back: () => <Columns />, title: 'যেকোনো দরকারে পাশে', color: GREEN, actors: [a(FRANK, 370, 'smile', 'thumbsUp', {h: 1040}), a(FOE, 700, 'smile', 'thumbsUp', {h: 1040})]}),
  friends: S({bg: 'sepia', title: 'মৃত্যু পর্যন্ত বন্ধু', actors: [a(FRANK_OLD, 370, 'laugh', 'open', {h: 1020, talking: true}), a(FOE_OLD, 700, 'laugh', 'open', {h: 1020, lookX: -1})]}),
  wrote: S({bg: 'sepia', actors: [a(FRANK_OLD, 790, 'smile', 'explain', {h: 960, talking: true})], front: () => <Pop x={40} y={440} at={2}><Paper w={640} lines={['যে একবার তোমার', 'উপকার করেছে,', 'সে আবার করতে', 'বেশি রাজি থাকে।']} rot={-2} size={56} /></Pop>}),
  lab: S({bg: 'office', title: '২০০ বছর পর, ল্যাবে', actors: [a(PROF, 280, 'thinking', 'explain', {h: 1000, talking: true}), a(CAST.engineer, 800, 'smile', 'idle', {h: 1000, lookX: -1})]}),
  same: Bars([{label: 'ব্যক্তিগত সাহায্য চাওয়া হয়েছিল', value: 'বেশি পছন্দ', pct: 84, color: GREEN}, {label: 'সাহায্য চাওয়া হয়নি', value: 'কম পছন্দ', pct: 46, color: '#8e9aa3'}], {title: 'একই ফল!', color: GREEN}),
  mind: S({bg: 'plain', title: 'মাথা ব্যাখ্যা খোঁজে', front: (f) => <><Pop x={250} y={520} at={2}><Brain size={580} /></Pop><div style={{position: 'absolute', left: 470, top: 1040, fontSize: 200, fontWeight: 900, color: GOLD, transform: `rotate(${Math.sin(f / 7) * 10}deg)`}}>?</div></>}),
  self: S({bg: HALL, back: () => <Columns />, actors: [a(FOE, 540, 'thinking', 'think', {h: 1040})], bubble: '"উপকার করলাম কেন? নিশ্চয়ই লোকটা খারাপ না।"', by: 300, bsize: 56}),
  convince: S({bg: 'plain', title: 'নিজেই নিজেকে বোঝায়', color: GREEN, front: (f) => <><div style={{position: 'absolute', left: 250, top: 560}}><Brain size={580} /></div><svg viewBox="-100 -100 200 200" width={860} height={860} style={{position: 'absolute', left: 110, top: 420, transform: `rotate(${f * 3}deg)`}}><path d="M0 -90 A90 90 0 1 1 -64 -64" fill="none" stroke={GREEN} strokeWidth={5} strokeDasharray="14 10" /><path d="M-64 -64 L-76 -44 M-64 -64 L-42 -68" stroke={GREEN} strokeWidth={5} strokeLinecap="round" /></svg></>}),
  ask: S({bg: 'office', actors: [a(YOU, 280, 'smile', 'open', {h: 1020, talking: true, lookX: 1}), a(CAST.exec, 800, 'surprised', 'idle', {h: 1000, lookX: -1})], bubble: '"একটা পরামর্শ দেবেন?"', by: 320, bsize: 66}),
  list: ({dur}) => S({bg: 'plain', title: 'ছোট কিছু চাও', front: () => <Stack dur={dur} items={['একটা পরামর্শ', 'একটা বই', 'একটা রেসিপি']} top={520} size={84} />})({dur, id: 'list'}),
  thanks: S({bg: 'office', actors: [a(YOU, 280, 'smile', 'hold', {h: 1020, lookX: 1, holding: <g transform="translate(-40 -70) scale(0.7)"><rect width={110} height={150} rx={6} fill="#7a1f2a" stroke="#1b1b1f" strokeWidth={6} /></g>}), a(CAST.exec, 800, 'laugh', 'idle', {h: 1000, lookX: -1})], bubble: '"অনেক ধন্যবাদ, সত্যিই কাজে লেগেছে।"', by: 320, bsize: 58}),
  cta: () => (
    <CtaScene>
      <Book size={300} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const FranklinThumbnail: React.FC = () => (
  <PsyThumb
    l1="যে তোমাকে ঘৃণা করে"
    l2="তার কাছে ধার চাও!"
    bottom="শত্রু হবে আজীবনের বন্ধু"
    term="Ben Franklin Effect"
    glow="rgba(227,191,122,0.3)"
    art={<div style={{position: 'absolute', left: 40, top: 760, transform: 'rotate(-10deg)'}}><Book size={460} /></div>}
    size={92}
  />
);
export const FranklinVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="franklin/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<FranklinThumbnail />} />;
