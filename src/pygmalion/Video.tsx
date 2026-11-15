import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, out} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, SP, pick} from '../common/kit';
import {Bars, Beam, Board, Book, CLASS_BG, Chip, PROF, Paper, Pop, PsyThumb, S, Stack, Stamp, Word, YOU, Yr, a} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const pygmalionFallback = makeFallback(segs);

const ROSEN: ToonLook = {...PROF, hair: '#2a1a12', hairStyle: 'short', age: 0.2};
const TEACHER: ToonLook = {skin: '#e8b994', hair: '#3a2418', hairStyle: 'bun', top: '#6a8ab0', bottom: '#2a2c30', skirt: '#2a2c30', glasses: true};
const SIR: ToonLook = {skin: '#c98d62', hair: '#2a2a2a', hairStyle: 'balding', top: '#f4f2ec', bottom: '#2a2c30', mustache: true, glasses: true, age: 0.7};
const KID_A: ToonLook = {skin: '#e0ac86', hair: '#2a1a12', hairStyle: 'bob', top: '#d9822b', bottom: '#3a4a6a', skirt: '#3a4a6a', headScale: 1.25};
const KID_B: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#5a8a5a', bottom: '#3a4a6a', headScale: 1.25};
const KID_C: ToonLook = {skin: '#efc6a6', hair: '#6a4a2a', hairStyle: 'curly', top: '#8a5a9a', bottom: '#3a4a6a', headScale: 1.25};
const SMALL_YOU: ToonLook = {...YOU, headScale: 1.25};

const Kids = (e1: 'smile' | 'neutral' | 'laugh' | 'sad' = 'neutral', h = 700, y = 1620) => [a(KID_A, 210, e1, 'idle', {h, y}), a(KID_B, 540, e1, 'idle', {h, y}), a(KID_C, 870, e1, 'idle', {h, y})];

// লটারির ড্রাম, ভেতরে নাম লেখা বল
const Drum: React.FC<{size?: number}> = ({size = 560}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(191,224,238,0.15)', border: '14px solid #bfe0ee', boxSizing: 'border-box'}} />
      {Array.from({length: 11}, (_, i) => {
        const r = size * (0.14 + ((i * 37) % 22) / 100);
        const t = f / 7 + i * 1.3;
        return <div key={i} style={{position: 'absolute', left: size / 2 + Math.cos(t) * r - 40, top: size / 2 + Math.sin(t) * r - 40, width: 80, height: 80, borderRadius: '50%', background: ['#e0243c', '#e3bf7a', '#5fd08a', '#6a9aff'][i % 4], border: '5px solid #1b1b1f'}} />;
      })}
    </div>
  );
};
const Ball: React.FC<{t: string; size?: number; color?: string}> = ({t, size = 260, color = GOLD}) => (
  <div style={{width: size, height: size, borderRadius: '50%', background: color, border: '10px solid #1b1b1f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.2, fontWeight: 900, color: '#15151b', boxShadow: `0 0 50px ${color}`}}>{t}</div>
);

const Sparks: React.FC<{x: number; y: number}> = ({x, y}) => {
  const f = useCurrentFrame();
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const t = (f + i * 12) % 36;
        return <div key={i} style={{position: 'absolute', left: x + Math.cos(i) * (40 + t * 3), top: y + Math.sin(i * 1.7) * (40 + t * 2) - t, fontSize: 70, color: '#ffe680', opacity: 1 - t / 36}}>★</div>;
      })}
    </>
  );
};

const NameList: React.FC<{w?: number}> = ({w = 620}) => <Paper w={w} title="তালিকা" lines={['১. Maria', '২. Tom', '৩. Anna', '৪. Pedro']} size={58} />;

const SCENES: Record<string, React.FC<SP>> = {
  lotto: S({bg: 'plain', title: 'লটারিতে নাম উঠল', actors: Kids('smile', 560, 1650), front: () => <Pop x={260} y={360} at={2}><Drum size={560} /></Pop>}),
  lie: S({bg: CLASS_BG, actors: Kids('smile'), title: 'নতুন বই না, বাড়তি ক্লাস না', size: 74, front: (f, d) => <Stamp text="শুধু একটা মিথ্যা" o={out(f, d * 0.5, d * 0.62)} size={92} top={420} />}),
  opp: S({bg: 'dark', actors: [a(SMALL_YOU, 540, 'sad', 'idle', {h: 860, y: 1660})], bubble: '"তোকে দিয়ে হবে না।"', by: 420, bsize: 80}),
  sir: S({bg: CLASS_BG, back: () => <Board lines={['২ + ২ × ৩ = ?']} top={250} h={280} size={80} />, actors: [a(SIR, 290, 'serious', 'pointR', {h: 1060, talking: true}), a(SMALL_YOU, 830, 'sad', 'idle', {h: 760, y: 1650, lookX: -1})], bubble: '"তোর মাথায় এসব ঢুকবে না।"', by: 560, bsize: 54}),
  now: S({bg: 'office', actors: [a(YOU, 540, 'laugh', 'shrug', {h: 1060, y: 1710, talking: true})], bubble: '"আমি অঙ্কে একদম কাঁচা।"', by: 300, bsize: 68}),
  who: Word('কে ঠিক করে দিল এটা?', {size: 130, color: RED}),
  test: S({bg: 'plain', title: 'একটা পরীক্ষা', front: () => <Pop x={230} y={520} at={2}><Paper w={620} title="পরীক্ষা" dots={6} /></Pop>}),
  yr: Yr('১৯৬৪', 'San Francisco · সরকারি প্রাইমারি স্কুল'),
  rosen: S({bg: CLASS_BG, actors: [a(ROSEN, 300, 'smile', 'explain', {h: 1040, talking: true}), a(KID_B, 820, 'neutral', 'idle', {h: 700, y: 1650, lookX: -1})], name: ['Robert Rosenthal', 'Harvard · সাইকোলজিস্ট']}),
  told: S({bg: 'office', actors: [a(ROSEN, 280, 'wink', 'explain', {h: 1020, talking: true, lookX: 1}), a(TEACHER, 800, 'surprised', 'idle', {h: 1000, lookX: -1})], bubble: '"এটা একটা বিশেষ টেস্ট।"', by: 320, bsize: 66}),
  special: S({bg: 'plain', title: 'কার মেধা হঠাৎ ফুটে উঠবে', size: 76, front: () => <><Pop x={230} y={480} at={2}><Paper w={620} title="Harvard-এর টেস্ট" dots={3} /></Pop><Sparks x={540} y={1000} /></>}),
  list: S({bg: 'office', actors: [a(ROSEN, 800, 'smile', 'pointL', {h: 1020, lookX: -1})], front: () => <Pop x={60} y={500} at={2}><NameList w={560} /></Pop>}),
  watch: S({bg: 'office', actors: [a(TEACHER, 800, 'surprised', 'idle', {h: 1000, lookX: -1}), a(ROSEN, 280, 'smile', 'open', {h: 1020, talking: true})], bubble: '"এরা চমকে দেবে।"', by: 320, bsize: 76}),
  plain: S({bg: 'plain', front: (f) => <><Pop x={230} y={520} at={2}><Paper w={620} title="সাধারণ আইকিউ টেস্ট" dots={4} /></Pop><Stamp text="বিশেষ কিছু না" o={out(f, 8, 18)} size={92} top={1080} /></>}),
  names: S({bg: 'plain', title: 'লটারি করে বাছা!', color: RED, front: () => <><Pop x={260} y={420} at={2}><Drum size={560} /></Pop><Pop x={410} y={1020} at={14}><Ball t="Maria" /></Pop></>}),
  same: S({bg: CLASS_BG, title: 'একটুও আলাদা না', actors: Kids('neutral', 820, 1640), front: () => <><div style={{position: 'absolute', left: 340, top: 1150, fontSize: 130, fontWeight: 900, color: GOLD}}>=</div><div style={{position: 'absolute', left: 670, top: 1150, fontSize: 130, fontWeight: 900, color: GOLD}}>=</div></>}),
  belief: Word('শিক্ষকের বিশ্বাস', {size: 170, color: GOLD, sub: 'আলাদা ছিল শুধু এটা', top: 600}),
  back: S({bg: CLASS_BG, actors: [a(ROSEN, 540, 'smile', 'open', {h: 1060, y: 1710})], title: 'এক বছর পর', front: () => <Pop x={60} y={980} at={6} rot={-6}><Paper w={330} title="আবার পরীক্ষা" dots={2} size={36} /></Pop>}),
  all: Bars([{label: 'সব বাচ্চা', value: 'নম্বর বেড়েছে', pct: 55, color: '#8e9aa3'}], {title: 'সবার বেড়েছে', top: 620}),
  more: Bars([{label: 'সব বাচ্চা', value: 'বেড়েছে', pct: 50, color: '#8e9aa3'}, {label: 'তালিকার বাচ্চারা', value: 'অনেক বেশি!', pct: 90, color: GREEN}], {title: 'তালিকার বাচ্চা', color: GREEN}),
  small: S({bg: CLASS_BG, title: 'ছোট ক্লাসে পার্থক্য সবচেয়ে বড়', size: 72, color: GOLD, actors: [a({...KID_B, headScale: 1.35}, 330, 'laugh', 'thumbsUp', {h: 620, y: 1640}), a({...KID_A, headScale: 1.35}, 750, 'laugh', 'wave', {h: 620, y: 1640})]}),
  ahead: S({bg: 'plain', title: 'সত্যিই এগিয়ে গেছে!', color: GREEN, actors: [a(KID_A, 210, 'laugh', 'thumbsUp', {h: 760, y: 1640}), a(KID_B, 540, 'laugh', 'thumbsUp', {h: 860, y: 1660}), a(KID_C, 870, 'laugh', 'thumbsUp', {h: 760, y: 1640})], front: () => <Sparks x={540} y={700} />}),
  nobook: S({bg: 'plain', title: 'আলাদা বই দেয়নি', color: RED, front: (f, d) => <><Pop x={350} y={520} at={2}><Book size={380} /></Pop><svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: out(f, d * 0.25, d * 0.4)}}><path d="M280 500 L800 1060 M800 500 L280 1060" stroke={RED} strokeWidth={28} strokeLinecap="round" /></svg></>}),
  look: S({bg: CLASS_BG, back: () => <Beam x={800} w={190} bottom={1640} />, title: 'একটু বেশি তাকিয়েছেন', actors: [a(TEACHER, 280, 'smile', 'idle', {h: 1060, lookX: 1}), a(KID_B, 800, 'smile', 'idle', {h: 720, y: 1650, lookX: -1})]}),
  smile: S({bg: CLASS_BG, title: 'একটু বেশি হেসেছেন, সময় দিয়েছেন', size: 70, actors: [a(TEACHER, 280, 'laugh', 'open', {h: 1060, lookX: 1, talking: true}), a(KID_B, 800, 'smile', 'pointUp', {h: 720, y: 1650, lookX: -1})]}),
  again: S({bg: CLASS_BG, actors: [a(TEACHER, 280, 'smile', 'thumbsUp', {h: 1060, lookX: 1, talking: true}), a(KID_A, 800, 'worried', 'idle', {h: 720, y: 1650, lookX: -1})], bubble: '"আবার চেষ্টা করো, তুমি পারবে।"', by: 320, bsize: 62}),
  eyes: S({bg: 'plain', title: 'সেই চোখে নিজেকে দেখতে শুরু', size: 76, color: GREEN, back: () => <div style={{position: 'absolute', left: 390, top: 470, width: 620, height: 1140, borderRadius: 310, background: 'linear-gradient(135deg, #bfe0ee, #5a7a8a)', border: '18px solid #6a4a34'}} />, actors: [a({...YOU, headScale: 1}, 700, 'smile', 'thumbsUp', {h: 900, y: 1570, lookX: -1}), a(KID_B, 210, 'smile', 'idle', {h: 720, y: 1690, lookX: 1})]}),
  opp2: S({bg: 'dark', title: 'এবার উল্টোটা ভাবো', color: RED, actors: [a(KID_C, 540, 'sad', 'idle', {h: 820, y: 1650})]}),
  that: S({bg: 'dark', back: () => <Beam x={540} w={200} bottom={1640} color="#9ab0d0" />, actors: [a(KID_C, 540, 'sad', 'idle', {h: 820, y: 1650})], bubble: '"ও পারবে না।"', by: 400, bx: 300, bsize: 70}),
  two: Word('দুটো কাজ', {size: 180, color: GOLD}),
  one: S({bg: 'plain', actors: [a(YOU, 540, 'smile', 'open', {h: 960, y: 1700, talking: true})], front: (f, d) => <><Pop x={100} y={330} at={2} rot={-2}><Chip size={72} bg="#3a3e48" color="#9aa0aa" style={{textDecoration: `line-through ${RED} 8px`}}>"আমি এটায় কাঁচা"</Chip></Pop><Pop x={90} y={520} at={d * 0.45} rot={2}><Chip size={72} bg={GREEN}>"এটা আমি এখনো শিখিনি"</Chip></Pop></>}),
  dos: S({bg: 'office', actors: [a(YOU, 280, 'smile', 'open', {h: 1020, talking: true, lookX: 1}), a(CAST.founder, 800, 'surprised', 'idle', {h: 980, lookX: -1})], bubble: '"তোমার মধ্যে আমি অনেক সম্ভাবনা দেখি।"', by: 320, bsize: 58}),
  who2: ({dur}) => S({bg: 'plain', title: 'কাকে বলবে?', front: () => <Stack dur={dur} items={['তোমার সন্তান', 'ছোট ভাই', 'জুনিয়র কলিগ']} top={520} size={84} />})({dur, id: 'who2'}),
  line: S({bg: 'plain', title: 'তোমার একটা বাক্য', color: GREEN, front: (f, d) => <><Pop x={210} y={480} at={2}><NameList w={660} /></Pop><div style={{position: 'absolute', left: 300, top: 1160, fontSize: 90, fontWeight: 900, color: RED, opacity: out(f, d * 0.4, d * 0.55)}}>৫. তার নাম ✓</div></>}),
  cta: () => (
    <CtaScene>
      <NameList w={400} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const PygmalionThumbnail: React.FC = () => (
  <PsyThumb
    l1="লটারিতে নাম উঠল"
    l2="বাচ্চারা মেধাবী হয়ে গেল!"
    bottom="শুধু একটা মিথ্যায়"
    term="Pygmalion Effect"
    glow="rgba(95,208,138,0.28)"
    art={<div style={{position: 'absolute', left: 30, top: 840}}><Drum size={540} /></div>}
    size={86}
  />
);
export const PygmalionVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="pygmalion/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<PygmalionThumbnail />} />;
