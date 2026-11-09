import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, out} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, SP, pick} from '../common/kit';
import {Bars, Chip, Cup, Icons, Mobile, Num, PROF, Pop, PsyThumb, S, Stack, Stamp, Word, YOU, Yr, a} from '../common/psy';
import {TapeRecorder} from '../milgram/art';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const pratfallFallback = makeFallback(segs);

const JFK: ToonLook = {skin: '#efc6a6', hair: '#8a5a2e', hairStyle: 'quiff', top: '#f4f2ec', jacket: '#20283a', tie: '#23395a', bottom: '#1a1f2c', shoes: '#0e0e12'};
const SMART: ToonLook = {skin: '#d9a07a', hair: '#1c1410', hairStyle: 'side', top: '#f4f2ec', jacket: '#2b4f7a', tie: '#9a1c2a', bottom: '#1c2230', glasses: true};
const AVG: ToonLook = CAST.worker;
const ARON: ToonLook = {...PROF, hair: '#2a1a12', hairStyle: 'short', age: 0.1};

const Podium: React.FC<{label?: string}> = ({label}) => (
  <div style={{position: 'absolute', left: 300, top: 1240, width: 480, height: 460, background: '#3a2a20', border: '10px solid #1b1b1f', borderRadius: 10, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 60, boxSizing: 'border-box', fontSize: 60, fontWeight: 900, color: GOLD}}>{label}</div>
);
const Flag: React.FC = () => (
  <div style={{position: 'absolute', left: 80, top: 320, width: 230, height: 950}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 16, height: 950, background: '#8e9aa3'}} />
    <div style={{position: 'absolute', left: 16, top: 16, width: 230, height: 150, background: 'repeating-linear-gradient(180deg, #b5363e 0 22px, #f2efe9 22px 44px)', border: '4px solid #1b1b1f'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 96, height: 88, background: '#2b3f7a'}} />
    </div>
  </div>
);

// Cuba দ্বীপের মানচিত্র + তীর
const CubaMap: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 400 300" width={1000} height={750} style={{position: 'absolute', left: 40, top: 460}}>
      <rect width={400} height={300} rx={14} fill="#16385a" stroke="#1b1b1f" strokeWidth={4} />
      <path d="M30 120 C80 90 130 96 180 118 C230 136 290 150 370 196 C330 206 290 196 240 186 C180 170 130 160 90 150 C60 146 40 138 30 120Z" fill="#5a8a4a" stroke="#1b1b1f" strokeWidth={3} />
      <text x={205} y={118} fontSize={30} fontWeight={900} fill="#f2efe9" textAnchor="middle">Cuba</text>
      <path d={`M170 280 L170 ${280 - 110 * Math.min(1, f / (dur * 0.5))}`} stroke={RED} strokeWidth={9} strokeLinecap="round" />
      <path d={`M150 ${196 + 74 * (1 - Math.min(1, f / (dur * 0.5)))} L170 ${170 + 110 * (1 - Math.min(1, f / (dur * 0.5)))} L190 ${196 + 74 * (1 - Math.min(1, f / (dur * 0.5)))}`} fill="none" stroke={RED} strokeWidth={9} strokeLinecap="round" />
      <text x={205} y={268} fontSize={22} fontWeight={800} fill="#f2efe9">Bay of Pigs</text>
    </svg>
  );
};

const Spill: React.FC<{x: number; y: number}> = ({x, y}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `rotate(${Math.min(130, f * 7)}deg)`}}>
      <Cup size={190} />
    </div>
  );
};
const SpillLook = (l: ToonLook): ToonLook => ({...l, chest: <path d="M186 396 C222 386 256 410 248 444 C266 480 232 510 208 492 C184 510 150 490 164 452 C148 424 160 400 186 396Z" fill="#6a3a1e" />});

const SCENES: Record<string, React.FC<SP>> = {
  fail: S({bg: 'war', title: 'সবচেয়ে লজ্জার ব্যর্থতা', color: RED, back: () => <Flag />, actors: [a(JFK, 560, 'sad', 'idle', {h: 1100, y: 1720})]}),
  up: S({bg: 'plain', title: 'জনপ্রিয়তা বেড়ে গেল!', color: GREEN, actors: [a(JFK, 760, 'surprised', 'idle', {h: 960, lookX: -1})], front: (f, d) => <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}><path d={`M100 1320 L240 1180 L340 1240 L500 ${1240 - 620 * out(f, 2, d * 0.7)}`} fill="none" stroke={GREEN} strokeWidth={22} strokeLinejoin="round" strokeLinecap="round" /></svg>}),
  practice: S({bg: 'office', title: 'একশোবার প্র্যাকটিস', actors: [a(YOU, 540, 'worried', 'explain', {h: 1060, y: 1710, talking: true})], front: (f) => <div style={{position: 'absolute', left: 60, top: 1020, fontSize: 130, fontWeight: 900, color: RED}}>×{Math.min(100, 1 + Math.floor(f * 2))}</div>}),
  photos: S({bg: 'plain', title: 'শুধু সেরা ছবি', actors: [a(YOU, 820, 'smile', 'idle', {h: 860, y: 1640})], front: () => <div style={{position: 'absolute', left: 80, top: 400}}><Mobile w={500} screen="#f2efe9"><div style={{padding: 26, display: 'grid', gap: 22}}>{[0, 1].map((i) => <div key={i} style={{height: 330, borderRadius: 14, background: 'linear-gradient(135deg, #e8a0b4, #e3bf7a)', display: 'flex', alignItems: 'flex-end', padding: 14, fontSize: 60}}>❤</div>)}</div></Mobile></div>}),
  oneerr: S({bg: 'office', actors: [a(YOU, 540, 'shocked', 'shrug', {h: 1060, y: 1710})], bubble: '"সবাই নিশ্চয়ই এখন আমাকে কম ভাবছে।"', by: 300, bsize: 60, front: (f, d) => <Stamp text="সব শেষ!" o={out(f, 2, 10)} size={90} top={560} />}),
  yr: Yr('১৯৬১', 'John F. Kennedy · আমেরিকার প্রেসিডেন্ট'),
  bay: ({dur}) => S({bg: 'dark', title: 'Bay of Pigs: পুরোপুরি ব্যর্থ', color: RED, size: 78, front: () => <CubaMap dur={dur} />})({dur, id: 'bay'}),
  caught: S({bg: 'war', title: 'এক হাজারের বেশি যোদ্ধা ধরা', color: RED, size: 74, front: () => <Icons total={40} n={40} color="#cfa58a" cols={8} w={84} top={440} />}),
  blame: S({bg: 'night', back: () => <Flag />, actors: [a(JFK, 540, 'serious', 'open', {h: 1000, y: 1500, talking: true})], front: () => <Podium label="দায়টা আমার" />}),
  poll: S({bg: 'plain', title: 'জনমত জরিপ এল', actors: [a(CAST.exec, 800, 'surprised', 'idle', {h: 960, lookX: -1})], front: () => <Pop x={60} y={640} at={2} rot={-3}><div style={{width: 500, background: '#f6f2e8', border: '8px solid #1b1b1f', borderRadius: 14, padding: 34, color: '#15151b', fontWeight: 900, fontSize: 58, boxSizing: 'border-box'}}>জরিপ<div style={{height: 22, background: '#c9c1ae', marginTop: 24}} /><div style={{height: 22, background: '#c9c1ae', marginTop: 20, width: '70%'}} /><div style={{height: 22, background: GREEN, marginTop: 20, width: '90%'}} /></div></Pop>}),
  pop80: Num(80, {suffix: '%+', label: 'জনপ্রিয়তা', color: GREEN, sub: 'পুরো মেয়াদের সর্বোচ্চ', size: 300}),
  aronson: S({bg: 'office', actors: [a(ARON, 540, 'thinking', 'think', {h: 1080, y: 1710})], name: ['Elliot Aronson', 'তরুণ সাইকোলজিস্ট']}),
  scratch: S({bg: 'office', actors: [a(ARON, 540, 'skeptical', 'shrug', {h: 1080, y: 1710})], bubble: '"এত বড় ভুল, আর মানুষ বেশি পছন্দ করছে?"', by: 300, bsize: 58}),
  lab: Yr('১৯৬৬', 'ল্যাবে পরীক্ষা'),
  tape: S({bg: 'office', title: 'একটা কুইজের রেকর্ড', actors: [a(CAST.customer2, 170, 'thinking', 'idle', {h: 760, y: 1620}), a(CAST.founder, 910, 'thinking', 'idle', {h: 760, y: 1620, lookX: -1})], front: () => <Pop x={320} y={700} at={2}><TapeRecorder size={440} /></Pop>}),
  smart: S({bg: 'plain', title: 'দারুণ বুদ্ধিমান', color: GREEN, actors: [a(SMART, 540, 'smile', 'pointUp', {h: 1060, y: 1710, talking: true})], front: () => <Pop x={760} y={700} at={2} rot={8}><Chip size={110} bg={GREEN}>✓✓✓</Chip></Pop>}),
  avg: S({bg: 'plain', title: 'একদম সাধারণ', color: '#cfd6e0', actors: [a(AVG, 540, 'neutral', 'shrug', {h: 1060, y: 1710})]}),
  crash: S({bg: 'dark', title: 'হঠাৎ একটা শব্দ!', color: RED, front: (f) => <><div style={{position: 'absolute', left: 340, top: 620, transform: `rotate(${Math.sin(f * 1.5) * 6}deg)`}}><TapeRecorder size={400} /></div><div style={{position: 'absolute', left: 90, top: 960, fontSize: 130, fontWeight: 900, color: GOLD, transform: 'rotate(-8deg)'}}>ঝনঝন!</div><div style={{position: 'absolute', left: 560, top: 1130, fontSize: 110, fontWeight: 900, color: '#f2efe9', transform: 'rotate(6deg)'}}>ক্র্যাশ!</div></>}),
  coffee: S({bg: 'office', actors: [a(SpillLook(SMART), 540, 'shocked', 'shrug', {h: 1100, y: 1720})], bubble: '"ওহ না, নতুন স্যুটে পুরো কফি পড়ে গেল!"', by: 280, bsize: 58, front: () => <Spill x={820} y={880} />}),
  who: Word('কাকে সবচেয়ে ভালো লাগল?', {size: 124, color: GOLD}),
  top: Bars([{label: 'বুদ্ধিমান + কফি ফেলেছে', value: '১ নম্বর', pct: 92, color: GREEN}, {label: 'নিখুঁত বুদ্ধিমান', value: '২ নম্বর', pct: 72, color: GOLD}], {title: 'সবার ওপরে', color: GREEN}),
  far: S({bg: 'plain', title: 'নিখুঁত মানুষ দূরের জিনিস', actors: [a(SMART, 760, 'smile', 'idle', {h: 1300, y: 1560, lookX: -1}), a(YOU, 220, 'sad', 'idle', {h: 640, y: 1640, lookX: 1})]}),
  human: S({bg: 'plain', actors: [a(SpillLook(SMART), 300, 'laugh', 'shrug', {h: 1000}), a(YOU, 800, 'laugh', 'idle', {h: 1000, lookX: -1})], bubble: '"আমিও তোমার মতোই মানুষ।"', by: 320, bsize: 66}),
  bottom: Bars([{label: 'সাধারণ + কফি ফেলেছে', value: 'সবার নিচে', pct: 12, color: RED}, {label: 'বুদ্ধিমান + কফি ফেলেছে', value: 'সবার ওপরে', pct: 92, color: GREEN}], {title: 'সবার নিচে কে?', color: RED}),
  same: S({bg: 'plain', title: 'একই ভুল, উল্টো ফল', color: RED, actors: [a(SpillLook(SMART), 280, 'laugh', 'thumbsUp', {h: 1000}), a(SpillLook(AVG), 800, 'sad', 'idle', {h: 1000, lookX: -1})]}),
  rule: Word('আগে যোগ্যতা, তারপর ভুল', {size: 130, color: GREEN, sub: 'তখনই ভুল তোমাকে মানুষ বানায়', top: 560}),
  smile: S({bg: 'office', actors: [a(YOU, 540, 'laugh', 'shrug', {h: 1060, y: 1710, talking: true})], bubble: '"এটা আমি গুলিয়ে ফেলেছি।"', by: 300, bsize: 70}),
  tryit: ({dur}) => S({bg: 'plain', title: 'একবার করে দেখো', front: () => <Stack dur={dur} items={['টিমের সামনে', 'ক্লাসে', 'ভিডিওতে']} top={520} size={84} />})({dur, id: 'tryit'}),
  trust: S({bg: 'office', title: 'কম না, বেশি বিশ্বাস', color: GREEN, actors: [a(CAST.customer2, 170, 'smile', 'thumbsUp', {h: 800, y: 1620}), a(YOU, 540, 'smile', 'open', {h: 1040, y: 1710}), a(CAST.founder, 910, 'smile', 'thumbsUp', {h: 800, y: 1620})]}),
  cta: () => (
    <CtaScene>
      <Cup size={320} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const PratfallThumbnail: React.FC = () => (
  <PsyThumb
    l1="সবচেয়ে লজ্জার ব্যর্থতা"
    l2="জনপ্রিয়তা বেড়ে গেল!"
    bottom="নিখুঁত হওয়াই তোমার ভুল"
    term="Pratfall Effect"
    glow="rgba(95,208,138,0.25)"
    art={<div style={{position: 'absolute', left: 40, top: 800, transform: 'rotate(-14deg)'}}><Cup size={500} /></div>}
    size={90}
  />
);
export const PratfallVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="pratfall/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<PratfallThumbnail />} />;
