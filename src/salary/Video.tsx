import React from 'react';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP, pick} from '../common/kit';
import {Paper, PsyThumb, a} from '../common/psy';
import {Desk, Home, TakaRain} from '../common/places';
import {BookScene, Bounce, Card, Count, Cta, R, Slam, Two} from '../common/reel';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const salaryFallback = makeFallback(segs);

const FARHAN: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'side', top: '#e8e4dc', tie: '#2b4fa0', bottom: '#2a2c30', beard: true};
const BOSS: ToonLook = {skin: '#e2b391', hair: '#6a5a4a', hairStyle: 'receding', top: '#f4f2ec', jacket: '#262a33', tie: '#9a1c2a', bottom: '#1c1e24', glasses: true, age: 0.5};
const FATHER: ToonLook = {skin: '#c98d62', hair: '#e6e2da', hairStyle: 'balding', top: '#d6d2c6', kurta: true, bottom: '#c6c2b6', age: 1};

const Two2 = (bg: 'office' | 'night', them: {f: 'worried' | 'serious' | 'smile'; b: 'sad' | 'serious' | 'surprised' | 'smile'; ftalk?: boolean; btalk?: boolean; fg?: 'open' | 'hold' | 'idle' | 'explain'; bg2?: 'idle' | 'open' | 'think'}) =>
  R({
    bg,
    actors: [a(FARHAN, 280, them.f, them.fg ?? 'idle', {h: 1040, lookX: 1, talking: them.ftalk}), a(BOSS, 790, them.b, them.bg2 ?? 'idle', {h: 1060, lookX: -1, talking: them.btalk})],
    front: () => <Desk top={1440} />,
  });

const Report = (
  <Paper w={520} title="আমার হাত দিয়ে" lines={['৳ ১০,০০,০০০', 'ক্লায়েন্ট: ৩', 'আগামী বছর: +২']} size={50} />
);

const SCENES: Record<string, React.FC<SP>> = {
  three: Slam('তিন বছর: বেতন বাড়েনি', {size: 118, top: 250, color: RED, bg: 'office'}),
  stopTalk: R({bg: 'office', actors: [a(FARHAN, 540, 'serious', 'idle', {h: 1260, y: 1880})], title: 'বাবার কথা বলাই বন্ধ', color: GOLD}),
  seven: Count(7, {post: ' দিনে বেতন বাড়ল', size: 104, color: GREEN, bg: 'office', back: () => <TakaRain n={10} speed={9} />}),
  scene: Two2('office', {f: 'worried', b: 'serious'}),
  plea: Two2('office', {f: 'worried', b: 'sad', ftalk: true, fg: 'open'}),
  pity: R({bg: 'office', actors: [a(BOSS, 540, 'sad', 'idle', {h: 1320, y: 1900})], front: () => <Desk top={1500} />, title: 'চোখে মায়া', color: GOLD}),
  see: Two2('office', {f: 'worried', b: 'sad', btalk: true, bg2: 'open'}),
  nothing: Two(
    Count(1, {post: ' বছর', size: 220, color: RED, bg: 'office', from: 1}),
    Two(Count(2, {post: ' বছর', size: 220, color: RED, bg: 'office', from: 2}), Count(3, {post: ' বছর', size: 220, color: RED, bg: 'office', from: 3}), 0.5),
    0.45,
  ),
  calc: R({place: <Home dim />, actors: [a(FARHAN, 540, 'thinking', 'think', {h: 1120, y: 1800})], front: () => <Desk top={1460} />, title: 'এক রাতে একটা হিসাব', color: GOLD}),
  how: R({place: <Home dim />, over: () => <Bounce x={280} y={600} at={3}><Paper w={520} title="গত এক বছর" dots={4} size={52} /></Bounce>, title: 'কত টাকা এসেছে?', color: GOLD}),
  ten: Count(1000000, {pre: '৳ ', size: 158, color: GREEN, place: <Home dim />, back: () => <TakaRain n={16} />}),
  paper: R({bg: 'office', actors: [a(FARHAN, 540, 'serious', 'idle', {h: 1260, y: 1880})], over: () => <Bounce x={560} y={1020} at={6}>{Report}</Bounce>}),
  offer: Two2('office', {f: 'serious', b: 'serious', ftalk: true, fg: 'explain'}),
  noPity: R({bg: 'office', actors: [a(BOSS, 540, 'serious', 'idle', {h: 1320, y: 1900})], front: () => <Desk top={1500} />, over: () => <Bounce x={250} y={1020} at={3}>{Report}</Bounce>, title: 'মায়া নেই', color: RED}),
  howMuch: R({bg: 'office', actors: [a(BOSS, 540, 'smile', 'open', {h: 1320, y: 1900, talking: true})], front: () => <Desk top={1500} />}),
  letter: R({bg: 'office', actors: [a(FARHAN, 540, 'smile', 'idle', {h: 1260, y: 1880})], over: () => <Bounce x={270} y={940} at={3}><Paper w={540} title="নতুন বেতন" dots={3} size={60} rot={3} /></Bounce>, title: 'সাত দিন পর', color: GREEN}),
  still: R({place: <Home dim />, actors: [a(FATHER, 540, 'sad', 'idle', {h: 1320, y: 1900})]}),
  never: Slam('একবারও জিজ্ঞেস করেননি', {size: 120, top: 560, color: RED, place: <Home dim />}),
  book: BookScene('The 48 Laws of Power', 'Robert Greene', 'Law 13', '#3a1420'),
  blank: R({bg: 'plain'}),
  drop: Card('নিজের কষ্টের কথা বাদ দাও', {color: RED, size: 96, place: <Home dim />}),
  profit: Card('এতে তার কী লাভ?', {color: GOLD, size: 110, place: <Home dim />}),
  first: Card('লাভের কথাটাই আগে বলো', {color: GREEN, size: 100, place: <Home dim />}),
  cta: () => (
    <Cta>
      <Paper w={420} title="নতুন বেতন" dots={3} size={46} />
    </Cta>
  ),
};
const Scene = pick(SCENES);

export const SalaryThumbnail: React.FC = () => (
  <PsyThumb l1="বাবার অসুখের কথা বলা বন্ধ" l2="৭ দিনে বেতন বাড়ল!" bottom="বস একবারও জিজ্ঞেস করেননি" term="48 Laws · Law 13" glow="rgba(95,208,138,0.3)" art={<div style={{position: 'absolute', left: 50, top: 980}}>{Report}</div>} size={78} />
);
export const SalaryVideo: React.FC<StoryProps> = (p) => <Story {...p} fx segments={segs} folder="salary/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<SalaryThumbnail />} />;
