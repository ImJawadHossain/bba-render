import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, out} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, NameCard, SP, pick} from '../common/kit';
import {Bars, Chip, Coin, Cup, Icons, Num, PROF, Paper, Pop, PsyThumb, S, SOpts, Stamp, Word, YOU, Yr, a} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const mirroringFallback = makeFallback(segs);

const WAITRESS: ToonLook = {skin: '#e8b994', hair: '#6a3a1e', hairStyle: 'bun', top: '#f4f2ec', vest: true, jacket: '#1f2a3a', bottom: '#1c1e24', skirt: '#1c1e24', tie: '#b5362e'};
const DINER: ToonLook = CAST.customer;
const STUDENT: ToonLook = {skin: '#e0ac86', hair: '#3a2418', hairStyle: 'curly', top: '#5a8a5a', bottom: '#2a2c30', shoes: '#e8e4dc'};
const STRANGER: ToonLook = {skin: '#d9a07a', hair: '#1c1410', hairStyle: 'side', top: '#6a5a8a', bottom: '#22252c', glasses: true};
const VOSS: ToonLook = {skin: '#efc6a6', hair: '#7a7268', hairStyle: 'short', top: '#f4f2ec', jacket: '#1f2633', tie: '#14304f', bottom: '#1a1c22'};
const FRIEND: ToonLook = CAST.founder;
const HOSTILE: ToonLook = {skin: '#a87a5a', hair: '#141010', hairStyle: 'short', top: '#2a2c30', bottom: '#1a1c22', beard: true};

const REST = 'linear-gradient(180deg, #5a3a28 0%, #3a241a 62%, #1c120c 100%)';

// টেবিল: সামনে থাকে, চরিত্রের কোমর ঢেকে দেয়
const TableTop: React.FC<{x?: number; w?: number; y?: number}> = ({x = 40, w = 1000, y = 1320}) => (
  <div style={{position: 'absolute', left: x, width: w, top: y, height: 60, background: '#f2efe9', border: '8px solid #1b1b1f', borderRadius: 14, boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}}>
    <div style={{position: 'absolute', left: 90, top: 52, width: w - 200, height: 340, background: 'linear-gradient(180deg, #6a5a48, #1c120c)'}} />
  </div>
);
const Pad: React.ReactNode = (
  <g transform="translate(-44 -70)">
    <rect width={88} height={120} rx={6} fill="#f6f2e8" stroke="#1b1b1f" strokeWidth={5} />
    <rect x={12} y={22} width={64} height={8} fill="#9a9a9a" />
    <rect x={12} y={44} width={64} height={8} fill="#9a9a9a" />
    <rect x={12} y={66} width={44} height={8} fill="#9a9a9a" />
  </g>
);
const CupHand: React.ReactNode = (
  <g transform="translate(-40 -70)">
    <path d="M6 10 L70 10 L62 70 L14 70Z" fill="#f2efe9" stroke="#1b1b1f" strokeWidth={5} />
    <ellipse cx={38} cy={10} rx={32} ry={7} fill="#6a3a1e" stroke="#1b1b1f" strokeWidth={4} />
  </g>
);
const PistolHand: React.ReactNode = (
  <g transform="translate(-60 -20)">
    <rect x={0} y={0} width={110} height={30} rx={6} fill="#22252c" stroke="#000" strokeWidth={3} />
    <rect x={62} y={24} width={32} height={56} rx={6} fill="#22252c" stroke="#000" strokeWidth={3} />
  </g>
);

const Rest = (o: SOpts) => S({bg: REST, ...o, back: (f, d) => o.back?.(f, d), front: (f, d) => (<><TableTop />{o.front?.(f, d)}</>)});

const CoinRain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({length: 14}, (_, i) => (
        <Coin key={i} size={84} style={{position: 'absolute', left: 40 + (i * 73) % 980, top: -100 + ((f * (7 + (i % 4)) + i * 150) % 1900)}} />
      ))}
    </>
  );
};

const Echo: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 60 + i * 50, top: 380 + i * 130, opacity: out(f, dur * 0.1 + i * 8, dur * 0.1 + i * 8 + 8) * (1 - i * 0.22)}}>
          <Chip size={66}>"একটা বার্গার, একটা কফি।"</Chip>
        </div>
      ))}
    </>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  order: Rest({actors: [a(DINER, 780, 'neutral', 'idle', {h: 900, y: 1660, lookX: -1}), a(WAITRESS, 290, 'smile', 'hold', {h: 1080, y: 1720, talking: true, holding: Pad})], bubble: '"একটা বার্গার, একটা কফি।"', by: 300, bsize: 70}),
  tip: Num(70, {prefix: '+', suffix: '%', label: 'টিপ বাড়ল প্রায়', color: GREEN, back: () => <CoinRain />}),
  wrong: S({bg: 'office', actors: [a(YOU, 540, 'smile', 'open', {h: 1080, y: 1710, talking: true})], bubble: '"আপনার শার্টটা দারুণ! আপনি অসাধারণ!"', by: 450, bsize: 56, front: (f, d) => <Stamp text="ভুল শেখানো" o={out(f, d * 0.5, d * 0.62)} size={90} top={230} />}),
  yawn: S({bg: 'plain', title: 'সে হাই তুললে, তোমারও', actors: [a(FRIEND, 280, 'surprised', 'idle', {h: 1000}), a(YOU, 800, 'surprised', 'idle', {h: 1000, lookX: -1})]}),
  tea: S({bg: 'office', title: 'সে কাপ তুললে, তুমিও', actors: [a(FRIEND, 280, 'smile', 'hold', {h: 1000, holding: CupHand}), a(YOU, 800, 'smile', 'hold', {h: 1000, holding: CupHand, lookX: -1})]}),
  talk: S({bg: 'office', title: 'কথার ধরনও এক', at: 0.5, actors: [a(FRIEND, 280, 'laugh', 'open', {h: 960, talking: true}), a(YOU, 800, 'laugh', 'open', {h: 960, talking: true, lookX: -1})], front: () => <><Pop x={60} y={500} at={2}><Chip size={62}>"আরে ভাই!"</Chip></Pop><Pop x={660} y={500} at={14}><Chip size={62}>"আরে ভাই!"</Chip></Pop></>}),
  yr: Yr('১৯৯৯', 'New York University · Chartrand আর Bargh'),
  stranger: S({bg: 'office', title: 'এক অচেনা লোক', actors: [a(STUDENT, 280, 'smile', 'open', {h: 1000, talking: true}), a(STRANGER, 800, 'neutral', 'idle', {h: 1000, lookX: -1})]}),
  secret: S({bg: 'office', title: 'গোপনে নকল করছে!', color: RED, at: 0.3, actors: [a(STUDENT, 280, 'smile', 'open', {h: 1000, talking: true}), a(STRANGER, 800, 'wink', 'open', {h: 1000, lookX: -1})]}),
  copy: S({bg: 'office', title: 'ছাত্র যা করে, সে-ও তাই', actors: [a(STUDENT, 280, 'thinking', 'think', {h: 1000, lookX: 1}), a(STRANGER, 800, 'thinking', 'think', {h: 1000, lookX: -1})], front: () => <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}><path d="M540 640 L540 1640" stroke={GOLD} strokeWidth={8} strokeDasharray="30 24" /></svg>}),
  ask: S({bg: 'office', actors: [a(PROF, 540, 'smile', 'explain', {h: 1060, y: 1710, talking: true})], bubble: '"লোকটাকে কেমন লাগল?"', by: 300, bsize: 70}),
  noone: S({bg: 'office', actors: [a(STUDENT, 540, 'thinking', 'shrug', {h: 1060, y: 1710})], front: (f) => <Stamp text="কেউ ধরতে পারেনি" o={out(f, 3, 12)} size={92} top={320} />}),
  liked: Bars([{label: 'নকল করা হয়েছিল', value: 'বেশি পছন্দ, কথাও জমেছে', pct: 86, color: GREEN}, {label: 'নকল করা হয়নি', value: 'কম পছন্দ', pct: 50, color: '#8e9aa3'}], {title: 'ফলাফল', color: GOLD}),
  nl: Rest({actors: [a(WAITRESS, 540, 'smile', 'hold', {h: 1080, y: 1720, holding: Pad})], title: 'একটাই নির্দেশ', front: () => <NameCard name="Netherlands" sub="একটা রেস্টুরেন্ট" top={330} />}),
  half: Rest({title: 'অর্ধেক টেবিলে', actors: [a(DINER, 780, 'neutral', 'idle', {h: 900, y: 1660, lookX: -1}), a(WAITRESS, 290, 'neutral', 'hold', {h: 1080, y: 1720, talking: true, holding: Pad})], bubble: '"ঠিক আছে।"', bx: 180, by: 420, bsize: 84}),
  half2: Rest({title: 'বাকি অর্ধেকে', color: GREEN, actors: [a(CAST.customer2, 780, 'smile', 'idle', {h: 900, y: 1660, lookX: -1}), a(WAITRESS, 290, 'smile', 'hold', {h: 1080, y: 1720, talking: true, holding: Pad})], bubble: '"একটা বার্গার, একটা কফি।"', by: 420, bsize: 66}),
  result: Bars([{label: 'শুধু "ঠিক আছে"', value: 'সাধারণ টিপ', pct: 40, color: '#8e9aa3'}, {label: 'অর্ডার আবার বলা', value: 'প্রায় ৭০% বেশি', pct: 68, color: GREEN}], {title: 'টিপ', color: GREEN}),
  noword: ({dur}) => S({bg: REST, title: 'নিজের কথাই ফিরে শোনা', actors: [a(DINER, 620, 'smile', 'idle', {h: 900, y: 1720, lookX: -1})], front: () => <Echo dur={dur} />})({dur, id: 'noword'}),
  tribe: S({bg: 'plain', title: 'আমার মতো = আমার দল', color: GREEN, front: () => <><Icons total={15} n={15} color={GREEN} top={440} /><div style={{position: 'absolute', left: 0, right: 0, top: 1240, textAlign: 'center'}}><Chip size={72} bg={GREEN}>সে নিরাপদ</Chip></div></>}),
  voss: S({bg: 'night', actors: [a(VOSS, 540, 'serious', 'idle', {h: 1100, y: 1720})], name: ['Chris Voss', 'FBI · জিম্মি উদ্ধারকারী']}),
  gun: S({bg: 'night', actors: [a(VOSS, 250, 'serious', 'open', {h: 980, talking: true}), a(HOSTILE, 800, 'worried', 'hold', {h: 980, lookX: -1, holding: PistolHand})], front: (f, d) => <><Pop x={520} y={350} at={2}><Chip size={56}>"আর সহ্য হচ্ছে না!"</Chip></Pop><Pop x={70} y={540} at={d * 0.5}><Chip size={56} bg="#dff3e4">"সহ্য হচ্ছে না?"</Chip></Pop></>}),
  talks: S({bg: 'night', title: 'লোকটা কথা বলেই যায়', color: GREEN, at: 0.05, actors: [a(VOSS, 250, 'neutral', 'idle', {h: 980, lookX: 1}), a(HOSTILE, 800, 'sad', 'open', {h: 980, talking: true, lookX: -1})], front: (f) => <>{[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: 500 + (i % 2) * 150, top: 370 + i * 90, opacity: out(f, i * 10, i * 10 + 6)}}><Chip size={40}>...বলছি...</Chip></div>)}</>}),
  ex: S({bg: 'office', actors: [a(CAST.worker, 720, 'worried', 'open', {h: 1040, talking: true, lookX: -1}), a(YOU, 230, 'neutral', 'idle', {h: 980, lookX: 1})], bubble: '"অফিসে খুব ঝামেলা যাচ্ছে।"', by: 320, bsize: 62}),
  ex2: S({bg: 'office', actors: [a(CAST.worker, 800, 'surprised', 'idle', {h: 980, lookX: -1}), a(YOU, 300, 'smile', 'open', {h: 1040, talking: true, lookX: 1})], bubble: '"খুব ঝামেলা যাচ্ছে?"', by: 320, bsize: 76}),
  quiet: S({bg: 'office', title: 'চুপ করে দেখো', at: 0.1, actors: [a(CAST.worker, 800, 'smile', 'explain', {h: 980, talking: true, lookX: -1}), a(YOU, 270, 'smile', 'idle', {h: 980, lookX: 1})], front: (f) => <svg viewBox="-60 -60 120 120" width={230} height={230} style={{position: 'absolute', left: 425, top: 400}}><circle r={54} fill="#f6f2e8" stroke="#1b1b1f" strokeWidth={6} /><line x2={0} y2={-38} stroke="#1b1b1f" strokeWidth={6} strokeLinecap="round" transform={`rotate(${f * 6})`} /><line x2={0} y2={-24} stroke="#1b1b1f" strokeWidth={7} strokeLinecap="round" transform={`rotate(${f * 0.5})`} /></svg>}),
  cond: Word('নকল না, সত্যি শোনো', {color: GREEN, size: 130, sub: 'মানুষ অভিনয় ধরে ফেলে', subColor: RED, top: 560}),
  cta: () => (
    <CtaScene>
      <Cup size={300} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const MirroringThumbnail: React.FC = () => (
  <PsyThumb
    l1="একটা কথাও বাড়াল না"
    l2="টিপ বাড়ল ৭০%!"
    bottom="শুধু অর্ডারটা আবার বলল"
    term="Mirroring"
    glow="rgba(95,208,138,0.28)"
    art={<div style={{position: 'absolute', left: 60, top: 860}}><Paper w={500} title="অর্ডার" lines={['বার্গার', 'কফি']} size={60} /></div>}
  />
);
export const MirroringVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="mirroring/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<MirroringThumbnail />} />;
