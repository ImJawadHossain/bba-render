import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP, pick} from '../common/kit';
import {Bars, Paper, PsyThumb, a} from '../common/psy';
import {Desk, TakaRain} from '../common/places';
import {BookScene, Bounce, Card, Count, Cta, R} from '../common/reel';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const silenceFallback = makeFallback(segs);

const SIR: ToonLook = {skin: '#e2b391', hair: '#4a3a2a', hairStyle: 'receding', top: '#f4f2ec', jacket: '#262a33', tie: '#2b4fa0', bottom: '#1c1e24', glasses: true, age: 0.4};
const RAKIB: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#3a6ea5', tie: '#222', bottom: '#2a2c30'};
const TANIA: ToonLook = {skin: '#e0ac86', hair: '#2a1a12', hairStyle: 'long', top: '#f4f2ec', jacket: '#2a3a4a', skirt: '#2a3a4a', bottom: '#2a3a4a'};

// টেবিলের দুই পাশে প্রার্থী আর স্যার
const Room = (who: ToonLook, wx: 'worried' | 'blank' | 'neutral' | 'smile' | 'shocked', sx: 'serious' | 'smile' | 'worried' | 'thinking', o: {wt?: boolean; st?: boolean; wg?: 'open' | 'idle' | 'explain'; sg?: 'open' | 'idle' | 'explain'} = {}) =>
  R({
    bg: 'office',
    actors: [a(who, 280, wx, o.wg ?? 'idle', {h: 1040, lookX: 1, talking: o.wt}), a(SIR, 790, sx, o.sg ?? 'idle', {h: 1060, lookX: -1, talking: o.st})],
    front: () => <Desk top={1440} />,
  });

// সেকেন্ড গোনা: ঘড়ির কাঁটা ঘোরে, লেখা ক্রমে লাল হয়
const Clock: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const sec = Math.min(10, Math.floor(interpolate(f, [0, dur * 0.9], [0, 10.99], clampOpts)));
  const BN = '০১২৩৪৫৬৭৮৯';
  const show = String(sec).replace(/\d/g, (d) => BN[Number(d)]);
  return (
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 42%, #2a1518, #07070a 72%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30, paddingBottom: 300}}>
      <svg width={620} height={620} viewBox="0 0 200 200">
        <circle cx={100} cy={100} r={92} fill="#14151b" stroke={GOLD} strokeWidth={6} />
        <line x1={100} y1={100} x2={100 + 76 * Math.sin((f / dur) * 3.6 * Math.PI)} y2={100 - 76 * Math.cos((f / dur) * 3.6 * Math.PI)} stroke={RED} strokeWidth={5} strokeLinecap="round" />
        <circle cx={100} cy={100} r={7} fill={RED} />
      </svg>
      <div style={{fontSize: 170, fontWeight: 800, color: sec >= 10 ? RED : GOLD, fontVariantNumeric: 'tabular-nums'}}>{show} সেকেন্ড</div>
    </div>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  same: R({bg: 'office', actors: [a(SIR, 540, 'serious', 'idle', {h: 1240, y: 1800})], front: () => <Desk top={1500} />, title: 'একই চাকরি, একই স্যার', color: GOLD}),
  rakib25: R({bg: 'office', actors: [a(RAKIB, 540, 'worried', 'open', {h: 1240, y: 1860, talking: true})], title: 'অনেক কথা = ২৫,০০০', color: RED}),
  tania30: R({bg: 'office', actors: [a(TANIA, 540, 'neutral', 'idle', {h: 1240, y: 1860})], title: 'একটা কথাও না = ৩০,০০০', size: 78, color: GREEN}),
  two: R({bg: 'office', actors: [a(RAKIB, 280, 'neutral', 'idle', {h: 1100, y: 1830}), a(TANIA, 790, 'neutral', 'idle', {h: 1060, y: 1830})], title: 'একই পদ, দুইজন লোক', color: GOLD}),
  rakibIn: Room(RAKIB, 'worried', 'serious'),
  offer1: Room(RAKIB, 'neutral', 'serious', {st: true, sg: 'open'}),
  scared: Room(RAKIB, 'shocked', 'serious'),
  rakibTalk: Room(RAKIB, 'worried', 'smile', {wt: true, wg: 'explain'}),
  done: Room(RAKIB, 'smile', 'smile'),
  taniaIn: Room(TANIA, 'neutral', 'serious'),
  offer2: Room(TANIA, 'neutral', 'serious', {st: true, sg: 'open'}),
  silent: R({bg: 'office', actors: [a(TANIA, 540, 'blank', 'idle', {h: 1200, y: 1800})], front: () => <Desk top={1460} />, over: () => <Bounce x={330} y={1250} at={3}><Paper w={420} dots={3} rot={2} /></Bounce>}),
  ten: Clock,
  pen: R({bg: 'office', actors: [a(SIR, 540, 'worried', 'think', {h: 1320, y: 1900})], front: () => <Desk top={1540} />, title: 'স্যার অস্বস্তিতে', color: GOLD}),
  offer3: Room(TANIA, 'blank', 'worried', {st: true, sg: 'open'}),
  nod: R({bg: 'office', actors: [a(TANIA, 540, 'smile', 'idle', {h: 1380, y: 1950})]}),
  yearly: Count(60000, {pre: '৳ ', size: 180, label: 'বছরে', color: GREEN, bg: 'office', back: () => <TakaRain n={14} />}),
  only: Bars([{label: 'রাকিব', value: '২৫,০০০', pct: 62, color: RED}, {label: 'তানিয়া', value: '৩০,০০০', pct: 88, color: GREEN}], {title: 'দশ সেকেন্ড চুপ', color: GOLD}),
  book: BookScene('The 48 Laws of Power', 'Robert Greene', 'Law 4', '#3a1420'),
  blank: R({bg: 'plain'}),
  count: Card('প্রস্তাব শুনে মনে মনে দশ গোনো', {color: GOLD, bg: 'office'}),
  needy: Card('"আমার খুব দরকার" বলবে না', {color: RED, bg: 'office'}),
  less: Card('কম বলো। অন্যজনকে বলতে দাও।', {color: GREEN, bg: 'office'}),
  cta: () => <Cta />,
};
const Scene = pick(SCENES);

export const SilenceThumbnail: React.FC = () => (
  <PsyThumb l1="একই চাকরি, একই স্যার" l2="চুপ থেকে ৫ হাজার বেশি!" bottom="মাত্র দশ সেকেন্ড" term="48 Laws · Law 4" art={<div style={{position: 'absolute', left: 30, top: 1050, width: 500, textAlign: 'center', fontSize: 170, fontWeight: 800, color: GOLD}}>১০ সে.</div>} size={80} />
);
export const SilenceVideo: React.FC<StoryProps> = (p) => <Story {...p} fx segments={segs} folder="silence/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<SilenceThumbnail />} />;
