import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP, pick} from '../common/kit';
import {Paper, PsyThumb, a} from '../common/psy';
import {Avenue, Cigarette, Home} from '../common/places';
import {BookScene, Bounce, Card, Count, Cta, R, Slam} from '../common/reel';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const torchesFallback = makeFallback(segs);

const BERNAYS: ToonLook = {skin: '#efc6a6', hair: '#2a1a12', hairStyle: 'side', top: '#f4f2ec', jacket: '#2a2620', tie: '#7a1f2a', bottom: '#1c1a16', mustache: true};
const HILL: ToonLook = {skin: '#e2b391', hair: '#c9c5bb', hairStyle: 'balding', top: '#f4f2ec', jacket: '#3a2e22', tie: '#2b4fa0', bottom: '#1c1a16', glasses: true, age: 0.7};
const DOC: ToonLook = {skin: '#e2b391', hair: '#6a5a4a', hairStyle: 'receding', top: '#f4f2ec', jacket: '#4a4a42', bottom: '#2a2a24', beard: true, glasses: true, age: 0.6};
const WOMAN: ToonLook = {skin: '#e8c2a0', hair: '#3a2418', hairStyle: 'bob', top: '#7a2a3a', skirt: '#4a1a2a', bottom: '#4a1a2a'};
const WOMAN2: ToonLook = {skin: '#efc6a6', hair: '#6a4a2a', hairStyle: 'bun', top: '#2a4a6a', skirt: '#1a2a4a', bottom: '#1a2a4a'};
const WOMAN3: ToonLook = {skin: '#d9a784', hair: '#1a1410', hairStyle: 'long', top: '#3f6a4a', skirt: '#2a4a32', bottom: '#2a4a32'};
const Ave = <Avenue />;
const SEP = 'radial-gradient(ellipse at 50% 40%, #6a4a2e, #1e120a 72%)';
const Girls = [a(WOMAN2, 200, 'serious', 'idle', {h: 1020, y: 1800}), a(WOMAN, 540, 'serious', 'idle', {h: 1120, y: 1860}), a(WOMAN3, 880, 'serious', 'idle', {h: 1020, y: 1800})];

// ক্যামেরার ঝলক: মাঝে মাঝে সাদা
const Flashes: React.FC = () => {
  const f = useCurrentFrame();
  const on = f % 17 < 2 || (f + 6) % 29 < 2;
  return <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: on ? 0.4 : 0}} />;
};

// মশালের মতো সিগারেট
const Torch: React.FC<{size?: number}> = ({size = 620}) => <Cigarette w={size} rot={-58} />;

const SCENES: Record<string, React.FC<SP>> = {
  hand: Slam('১৯২৯: লাখ লাখ নারীর হাতে', {size: 118, top: 240, color: GOLD, place: Ave, back: () => <div style={{position: 'absolute', left: 270, top: 900}}><Cigarette w={560} /></div>}),
  wife: R({place: <Home dim />, actors: [a(BERNAYS, 540, 'serious', 'idle', {h: 1260, y: 1880})], over: () => <Bounce x={110} y={1050} at={4}><Cigarette w={300} rot={40} glow={false} /></Bounce>, title: 'নিজের বাড়িতে উল্টো', color: RED}),
  shame: R({place: Ave, actors: [a(WOMAN, 300, 'worried', 'idle', {h: 1060, y: 1830, lookX: 1}), a(CAST.boss, 790, 'serious', 'pointL', {h: 1100, y: 1830, lookX: -1})], title: 'লজ্জা!', size: 130, color: RED}),
  hill: R({place: Ave, actors: [a(HILL, 540, 'shocked', 'open', {h: 1280, y: 1900, talking: true})], title: 'George Washington Hill', size: 66, color: GOLD}),
  half: Count(50, {post: '% মানুষ ছোঁয় না', size: 110, label: 'দেশের অর্ধেক', color: GOLD, place: Ave}),
  call: R({place: Ave, actors: [a(BERNAYS, 540, 'neutral', 'idle', {h: 1260, y: 1880})], title: 'Edward Bernays', size: 90, color: GOLD}),
  freud: Slam('Freud-এর ভাগনে!', {size: 136, top: 620, color: RED, bg: SEP}),
  noAd: R({bg: SEP, actors: [a(BERNAYS, 280, 'thinking', 'idle', {h: 1100, y: 1830, lookX: 1}), a(DOC, 790, 'thinking', 'think', {h: 1100, y: 1830, lookX: -1})], title: 'বিজ্ঞাপন নয়, মনোবিদ', size: 76, color: GOLD}),
  question: R({bg: SEP, over: () => <Bounce x={270} y={820} at={2}><Cigarette w={540} /></Bounce>, title: 'মেয়েদের চোখে সিগারেট কী?', size: 76, color: GOLD}),
  power: R({bg: SEP, actors: [a(DOC, 540, 'serious', 'explain', {h: 1240, y: 1870, talking: true})], title: 'পুরুষের ক্ষমতা', size: 110, color: RED}),
  rename: R({bg: SEP, actors: [a(BERNAYS, 540, 'wink', 'pointUp', {h: 1240, y: 1870})]}),
  torch: Slam('Torches of Freedom', {size: 116, top: 240, color: GOLD, bg: SEP, sub: 'স্বাধীনতার মশাল', subColor: '#f2efe9', back: () => <div style={{position: 'absolute', left: 250, top: 840}}><Torch /></div>}),
  easter: R({place: Ave, actors: [a(CAST.ceo, 180, 'neutral', 'idle', {h: 760, y: 1640}), a(WOMAN2, 400, 'neutral', 'idle', {h: 720, y: 1640}), a(CAST.boss, 620, 'neutral', 'idle', {h: 760, y: 1640}), a(WOMAN3, 860, 'neutral', 'idle', {h: 720, y: 1640}), a(CAST.exec, 300, 'smile', 'idle', {h: 900, y: 1800}), a(CAST.customer, 760, 'smile', 'idle', {h: 960, y: 1800})], title: 'Fifth Avenue', size: 100, color: GOLD}),
  hired: R({place: Ave, actors: Girls, title: 'গোপনে ভাড়া করা', color: RED}),
  press: R({place: Ave, actors: [a(CAST.customer, 540, 'serious', 'explain', {h: 1200, y: 1860, talking: true})], over: () => <Bounce x={90} y={1040} at={3}><Paper w={360} title="খবর!" dots={2} size={44} /></Bounce>, title: 'সাংবাদিকদের আগেই খবর', size: 76, color: GOLD}),
  light: R({place: Ave, actors: Girls, over: () => <><Bounce x={60} y={880} at={2}><Cigarette w={300} /></Bounce><Bounce x={390} y={790} at={4} seed="c2"><Cigarette w={300} /></Bounce><Bounce x={720} y={880} at={6} seed="c3"><Cigarette w={300} /></Bounce></>}),
  flash: R({place: Ave, actors: Girls, over: () => <><Flashes /><Bounce x={250} y={420} at={10}><Paper w={580} title="স্বাধীনতার মশাল!" dots={3} size={56} /></Bounce></>}),
  noBrand: Card('বিজ্ঞাপন নেই। ব্র্যান্ড নেই।', {color: GOLD, size: 100, bg: SEP}),
  money: Slam('টাকা দিয়েছে তামাক কোম্পানি', {size: 112, top: 560, color: RED, bg: SEP}),
  triple: Count(3, {post: ' গুণ', size: 280, label: 'নারী ধূমপায়ীর হার', color: RED, bg: SEP}),
  free: R({place: Ave, actors: [a(WOMAN, 540, 'smile', 'idle', {h: 1280, y: 1890})], title: 'ভাবল: আমি স্বাধীন', color: GREEN}),
  market: Slam('আসলে: কোম্পানির বাজার', {size: 122, top: 600, color: RED, place: Ave}),
  book: BookScene('Propaganda', 'Edward Bernays', undefined, '#3a2e22'),
  blank: R({bg: 'plain'}),
  ask: Card('কেনার আগে একটা প্রশ্ন', {color: GOLD, size: 100}),
  need: Card('দরকার? নাকি কিছু একটা হতে চাই?', {color: GOLD, size: 92}),
  ident: Card('জিনিস না, পরিচয় বিক্রি হচ্ছে', {color: RED, size: 92}),
  sell: Card('কাস্টমার এটা দিয়ে কী হতে চায়?', {color: GREEN, size: 92}),
  biggest: Slam('নিজের সিদ্ধান্ত?', {size: 160, top: 620, color: RED, bg: SEP}),
  cta: () => (
    <Cta>
      <Cigarette w={480} glow={false} />
    </Cta>
  ),
};
const Scene = pick(SCENES);

export const TorchesThumbnail: React.FC = () => (
  <PsyThumb l1="একটা নামের চাল" l2="লাখো নারীর হাতে সিগারেট!" bottom="Freud-এর ভাগনের কৌশল" term="Torches of Freedom" glow="rgba(227,191,122,0.32)" art={<div style={{position: 'absolute', left: 60, top: 1000}}><Cigarette w={500} /></div>} size={80} />
);
export const TorchesVideo: React.FC<StoryProps> = (p) => <Story {...p} fx segments={segs} folder="torches/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<TorchesThumbnail />} />;
