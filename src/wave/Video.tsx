import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, out} from '../biz/art';
import {CAST} from '../common/cast';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import {CtaScene, SP, pick} from '../common/kit';
import {Board, CLASS_BG, Chip, ClassRoom, Icons, Paper, Pop, PsyThumb, S, SOpts, Stamp, Word, YOU, Yr, a, bn} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const waveFallback = makeFallback(segs);

const JONES: ToonLook = {skin: '#efc6a6', hair: '#5a3a22', hairStyle: 'side', top: '#f4f2ec', jacket: '#5a4a3a', tie: '#3a4a2a', bottom: '#2a2620', shoes: '#1a1410'};
const TEEN: ToonLook = {skin: '#e8b994', hair: '#6a4a2a', hairStyle: 'curly', top: '#3f6a8a', bottom: '#2a2c30', shoes: '#e8e4dc'};
const TEEN2: ToonLook = {skin: '#d9a07a', hair: '#2a1a12', hairStyle: 'bob', top: '#c0504a', bottom: '#2a2c30', skirt: '#2a2c30'};
const GUARD: ToonLook = {skin: '#d9a07a', hair: '#1c1410', hairStyle: 'short', top: '#2a2c30', bottom: '#1a1c22', shoes: '#e8e4dc'};

const Day: React.FC<{t: string}> = ({t}) => (
  <Pop x={70} y={170} at={0} rot={-3}>
    <Chip size={72} bg={GOLD}>
      {t}
    </Chip>
  </Pop>
);

// ক্লাসঘর + বোর্ড + ছাত্ররা
const Room = (o: SOpts & {board?: string; day?: string; expr?: Expression; gesture?: Gesture; up?: number[]; lookX?: number}) =>
  S({
    bg: CLASS_BG,
    ...o,
    back: (f, d) => (
      <>
        {o.board ? <Board text={o.board} top={250} h={380} size={84} /> : null}
        <ClassRoom expr={o.expr} gesture={o.gesture} up={o.up} lookX={o.lookX} />
      </>
    ),
    front: (f, d) => (
      <>
        {o.day ? <Day t={o.day} /> : null}
        {o.front?.(f, d)}
      </>
    ),
  });

const WaveMark: React.FC<{size?: number}> = ({size = 240}) => (
  <svg viewBox="0 0 120 80" width={size} height={size * 0.67} style={{overflow: 'visible'}}>
    <path d="M4 60 C24 10 44 10 58 44 C52 26 76 14 92 34 C84 28 72 38 78 60Z" fill="#2b5fd9" stroke="#1b1b1f" strokeWidth={4} />
    <path d="M4 60 L116 60" stroke="#1b1b1f" strokeWidth={5} strokeLinecap="round" />
  </svg>
);
const MemberCard: React.FC<{mark?: boolean; rot?: number; w?: number}> = ({mark, rot = -4, w = 560}) => (
  <div style={{width: w, padding: w * 0.06, background: '#f6f2e8', border: '10px solid #1b1b1f', borderRadius: 24, transform: `rotate(${rot}deg)`, color: '#15151b', boxSizing: 'border-box', boxShadow: '0 24px 50px rgba(0,0,0,0.5)'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
      <WaveMark size={w * 0.26} />
      <div style={{fontSize: w * 0.095, fontWeight: 900, lineHeight: 1.1}}>The Third Wave</div>
    </div>
    <div style={{height: w * 0.03, background: '#c9c1ae', marginTop: w * 0.05}} />
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: w * 0.04, fontSize: w * 0.08, fontWeight: 800}}>
      <span>সদস্য</span>
      {mark ? <span style={{color: RED, fontSize: w * 0.17}}>★</span> : null}
    </div>
  </div>
);

const TvSet: React.FC<{on?: boolean; x?: number; y?: number; w?: number; text?: string}> = ({on, x = 190, y = 280, w = 700, text}) => {
  const f = useCurrentFrame();
  const H = w * 0.72;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: H, background: '#2a2c32', border: '14px solid #15171d', borderRadius: 34, padding: w * 0.04, boxSizing: 'border-box', boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
      <div style={{position: 'relative', width: '100%', height: '100%', background: '#0c0e12', borderRadius: 22, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f2efe9', fontSize: w * 0.09, fontWeight: 900, textAlign: 'center'}}>
        {on
          ? Array.from({length: 200}, (_, i) => {
              const v = random(`s${i}-${Math.floor(f / 2)}`);
              return <div key={i} style={{position: 'absolute', left: `${(i % 20) * 5}%`, top: `${Math.floor(i / 20) * 10}%`, width: '5%', height: '10%', background: `rgb(${v * 255},${v * 255},${v * 255})`}} />;
            })
          : text}
      </div>
    </div>
  );
};

// হল ভর্তি ভিড়
const RoomCrowd: React.FC<{sal?: boolean}> = ({sal}) => <ClassRoom expr="serious" gesture={sal ? 'thumbsUp' : 'idle'} />;

const Rally: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: 280, height: 700, background: '#b8b8b0', overflow: 'hidden', border: '12px solid #2a2c32', filter: 'grayscale(1) contrast(1.1)'}}>
      {Array.from({length: 7}, (_, r) => (
        <div key={r} style={{position: 'absolute', left: 0, right: 0, top: 240 + r * 66, display: 'flex', justifyContent: 'center', gap: 8 + r * 2}}>
          {Array.from({length: 20 - r}, (_, i) => <div key={i} style={{width: 18 + r * 7, height: 34 + r * 14, background: '#2a2a2a', borderRadius: '50% 50% 0 0', transform: `translateY(${Math.sin((f + i * 5) / 9) * 2}px)`}} />)}
        </div>
      ))}
      <div style={{position: 'absolute', inset: 0, opacity: 0.18, background: `repeating-linear-gradient(0deg, #000 0 2px, transparent 2px ${6 + (f % 3)}px)`}} />
    </div>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  salute: Room({expr: 'serious', gesture: 'thumbsUp', title: 'অস্তিত্বহীন নেতাকে স্যালুট', color: RED, size: 76, front: () => <Pop x={410} y={340} at={2}><div style={{width: 260, height: 300, background: '#15171d', border: '10px solid #f2efe9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 200, fontWeight: 900, color: RED}}>?</div></Pop>}),
  five: Room({expr: 'smile', title: 'পাঁচ দিন আগে: সাধারণ ছাত্র', size: 76}),
  yr: Yr('১৯৬৭', 'California · ইতিহাসের শিক্ষক Ron Jones'),
  nazi: Room({board: 'নাৎসি জার্মানি', lookX: 0}),
  q: Room({up: [1], board: 'নাৎসি জার্মানি', bubble: '"সাধারণ জার্মানরা বলল না কেন?"', by: 690, bsize: 54, bat: 0.05}),
  noans: S({bg: CLASS_BG, back: () => <Board text="?" top={250} h={380} size={200} />, actors: [a(JONES, 540, 'worried', 'shrug', {h: 1060, y: 1710})]}),
  show: S({bg: CLASS_BG, actors: [a(JONES, 540, 'serious', 'pointUp', {h: 1060, y: 1710, talking: true})], bubble: '"উত্তরটা আমি দেখাব।"', by: 300, bsize: 72}),
  mon: Room({day: 'সোমবার', board: 'শৃঙ্খলার মধ্যেই শক্তি', expr: 'neutral'}),
  sit: Room({expr: 'serious', title: 'দাঁড়িয়ে, তিন শব্দে উত্তর', size: 78}),
  fun: Room({expr: 'laugh', title: 'ছাত্রদের মজা লাগল!', color: GREEN}),
  tue: Room({day: 'মঙ্গলবার', board: 'একতার মধ্যেই শক্তি', expr: 'smile'}),
  name: S({bg: 'plain', title: 'The Third Wave', size: 110, color: '#6a9aff', actors: [a(JONES, 540, 'smile', 'thumbsUp', {h: 1000, y: 1710})], front: () => <Pop x={380} y={380} at={2}><WaveMark size={340} /></Pop>}),
  hall: S({bg: 'linear-gradient(180deg, #5a6a72, #2a3238)', title: 'করিডোরে স্যালুট', actors: [a(TEEN, 280, 'smile', 'thumbsUp', {h: 1000, lookX: 1}), a(TEEN2, 800, 'smile', 'thumbsUp', {h: 980, lookX: -1})]}),
  table: S({bg: 'linear-gradient(180deg, #6a5a4a, #2a241e)', title: 'নিজেদের আলাদা টেবিল', actors: [a(TEEN, 200, 'serious', 'thumbsUp', {h: 800, y: 1520}), a(GUARD, 440, 'serious', 'thumbsUp', {h: 800, y: 1520}), a(TEEN2, 680, 'serious', 'thumbsUp', {h: 800, y: 1520}), a(CAST.customer, 930, 'sad', 'idle', {h: 640, y: 1500, lookX: -1})], front: () => <div style={{position: 'absolute', left: 40, width: 760, top: 1270, height: 60, background: '#c9c1ae', border: '8px solid #1b1b1f', borderRadius: 12}} />}),
  wed: S({bg: 'plain', front: () => <><Day t="বুধবার" /><Pop x={260} y={500} at={2}><MemberCard rot={-6} /></Pop><Pop x={300} y={840} at={10}><MemberCard rot={3} /></Pop></>}),
  mark: S({bg: 'dark', title: 'গোপন চিহ্ন: নিয়ম ভাঙলে জানাও', size: 70, color: RED, front: () => <Pop x={150} y={640} at={2}><MemberCard mark w={780} rot={-3} /></Pop>}),
  three: S({bg: 'plain', title: 'ভেবেছিলেন: তিনজন', front: () => <Icons total={30} n={3} color={GOLD} cols={6} w={100} top={440} />}),
  half: S({bg: 'plain', title: 'রিপোর্ট করল: প্রায় অর্ধেক!', color: RED, size: 78, front: () => <Icons total={30} n={15} color={RED} cols={6} w={100} top={440} />}),
  friend: S({bg: 'linear-gradient(180deg, #5a6a72, #2a3238)', actors: [a(TEEN, 270, 'serious', 'hold', {h: 1000, lookX: 1, holding: <g transform="translate(-34 -60)"><rect width={70} height={96} fill="#f6f2e8" stroke="#1b1b1f" strokeWidth={5} /></g>}), a(TEEN2, 800, 'worried', 'idle', {h: 980, lookX: -1})], title: 'বন্ধুর নামে বন্ধু', color: RED}),
  grow: S({bg: 'plain', title: 'ক্লাস বেড়েই চলল', color: RED, front: (f, d) => { const n = Math.min(60, 20 + Math.floor((f / Math.max(1, d)) * 40)); return <><Icons total={n} n={n} color="#cfd6e0" cols={10} w={60} top={420} /><div style={{position: 'absolute', left: 0, right: 0, top: 1160, textAlign: 'center', fontSize: 150, fontWeight: 900, color: RED}}>{bn(n)}+</div></>; }}),
  out: S({bg: 'linear-gradient(180deg, #5a6a72, #2a3238)', back: () => <div style={{position: 'absolute', left: 80, top: 560, width: 420, height: 1080, background: '#6a4a34', border: '12px solid #1b1b1f'}}><div style={{position: 'absolute', left: 90, right: 90, top: 80, height: 220, background: '#bfd6e2', border: '6px solid #1b1b1f'}} /></div>, actors: [a(TEEN2, 760, 'sad', 'shrug', {h: 1000, lookX: -1})], title: 'প্রশ্ন করলে, বাইরে', color: RED, front: () => <div style={{position: 'absolute', left: 860, top: 450, fontSize: 170, fontWeight: 900, color: GOLD}}>?</div>}),
  thu: S({bg: CLASS_BG, actors: [a(JONES, 540, 'shocked', 'shrug', {h: 1060, y: 1710})], title: 'Jones নিজেই ভয় পেলেন', color: RED, size: 80, front: () => <Day t="বৃহস্পতিবার" />, titleTop: 330}),
  guard: S({bg: 'linear-gradient(180deg, #5a6a72, #2a3238)', title: 'ছাত্রটা এখন দেহরক্ষী!', color: RED, actors: [a(GUARD, 800, 'serious', 'idle', {h: 1100, y: 1730}), a(JONES, 310, 'worried', 'idle', {h: 980, lookX: 1})]}),
  nation: S({bg: CLASS_BG, actors: [a(JONES, 540, 'serious', 'explain', {h: 1060, y: 1710, talking: true})], bubble: '"এটা সারা দেশের একটা আন্দোলন।"', by: 300, bsize: 64}),
  tv: S({bg: 'dark', title: 'কাল দুপুরে, নেতার নাম', front: () => <TvSet text="নেতা = ?" y={420} />}),
  fri: S({bg: CLASS_BG, back: () => <RoomCrowd sal />, title: 'শুক্রবার: প্রায় ২০০ ছাত্র', color: RED, size: 80}),
  on: S({bg: 'dark', back: () => <RoomCrowd />, front: () => <TvSet text="চালু হচ্ছে..." y={160} w={560} x={260} />}),
  static: S({bg: 'dark', front: () => <TvSet on y={420} />, title: 'শুধু ঝিরঝির', color: '#cfd6e0'}),
  silent: S({bg: 'linear-gradient(180deg, #2a332c, #10140f)', back: () => <ClassRoom expr="surprised" />, title: 'একদম নীরবতা', color: '#cfd6e0'}),
  noleader: S({bg: CLASS_BG, actors: [a(TEEN, 540, 'shocked', 'shrug', {h: 1080, y: 1720})], bubble: '"কোনো নেতা নেই?"', by: 300, bsize: 84}),
  jones: S({bg: CLASS_BG, actors: [a(JONES, 540, 'serious', 'open', {h: 1060, y: 1710, talking: true})], bubble: '"না। কোনো নেতা নেই। কোনো আন্দোলন নেই।"', by: 300, bsize: 60}),
  answer: S({bg: CLASS_BG, actors: [a(JONES, 540, 'serious', 'pointUp', {h: 1060, y: 1710, talking: true})], title: 'এটাই সেই প্রশ্নের উত্তর', color: RED, size: 80}),
  film: S({bg: 'dark', back: () => <Rally />, title: 'পুরোনো সমাবেশের ফুটেজ', color: '#cfd6e0', titleTop: 1040, size: 74}),
  bow: S({bg: 'linear-gradient(180deg, #2a332c, #10140f)', back: () => <ClassRoom expr="sad" />, title: 'মাথা নিচু। কেউ কেউ কাঁদছিল।', color: '#cfd6e0', size: 72}),
  nobad: Word('ওরা খারাপ ছিল না', {size: 140, color: GOLD, sub: 'শুধু একটা দলের অংশ হতে চেয়েছিল', top: 600}),
  qout: S({bg: 'office', actors: [a(CAST.exec, 170, 'skeptical', 'idle', {h: 840, y: 1620, lookX: 1}), a(CAST.ceo, 400, 'skeptical', 'idle', {h: 840, y: 1620, lookX: 1}), a(YOU, 780, 'worried', 'pointUp', {h: 1040, talking: true, lookX: -1})], bubble: '"একটা প্রশ্ন ছিল..."', bx: 400, by: 320, bsize: 62}),
  step: S({bg: 'office', title: 'এক পা পেছাও, প্রশ্নটা করো', color: GREEN, size: 78, actors: [a(CAST.exec, 150, 'skeptical', 'idle', {h: 760, y: 1600, lookX: 1}), a(CAST.ceo, 350, 'skeptical', 'idle', {h: 760, y: 1600, lookX: 1}), a(YOU, 840, 'serious', 'pointUp', {h: 1040, lookX: -1})]}),
  cta: () => (
    <CtaScene>
      <MemberCard w={520} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const WaveThumbnail: React.FC = () => (
  <PsyThumb
    l1="২০০ ছাত্রের স্যালুট"
    l2="নেতার অস্তিত্বই নেই!"
    bottom="মাত্র পাঁচ দিনে"
    term="The Third Wave"
    glow="rgba(43,95,217,0.35)"
    art={<div style={{position: 'absolute', left: 20, top: 860}}><MemberCard w={560} /></div>}
    size={92}
  />
);
export const WaveVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="wave/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<WaveThumbnail />} />;
