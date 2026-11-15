import React from 'react';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP, pick} from '../common/kit';
import {HandPhone, PsyThumb, a} from '../common/psy';
import {BiryaniShop, Handi, Taka} from '../common/places';
import {BookScene, Bounce, Card, Count, Cta, R, Slam, Two} from '../common/reel';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const biryaniFallback = makeFallback(segs);

const RONY: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#f2efe9', bottom: '#2a2c30', mustache: true};
const MAN: ToonLook = {skin: '#d9a07a', hair: '#26180f', hairStyle: 'receding', top: '#3a5a8a', bottom: '#2a2c30', glasses: true, age: 0.3};
const WIFE: ToonLook = {...CAST.customer2, top: '#a0305a', skirt: '#a0305a'};
const CROWD = [CAST.customer, CAST.founder, CAST.pro, CAST.worker, CAST.customer2, CAST.exec, CAST.ceo];

const Table: React.FC<{top?: number; plates?: number}> = ({top = 1400, plates = 0}) => (
  <>
    <div style={{position: 'absolute', left: -80, right: -80, top, height: 700, background: 'linear-gradient(180deg, #7a5a3c, #2a1c10)', borderTop: '16px solid #a07a50'}} />
    {Array.from({length: plates}, (_, i) => (
      <div key={i} style={{position: 'absolute', left: 80 + (i * 930) / Math.max(1, plates), top: top - 26, width: 150, height: 44, borderRadius: '50%', background: '#f4efe2', border: '5px solid #1b1b1f'}}>
        <div style={{margin: '5px auto', width: 90, height: 24, borderRadius: '50%', background: '#d9a02b'}} />
      </div>
    ))}
  </>
);

const line =(n: number, y: number, h: number, from: number, gap: number) => Array.from({length: n}, (_, i) => a(CROWD[i % CROWD.length], from + i * gap, 'neutral', 'idle', {h, y, lookX: -0.4}));

const Day = <BiryaniShop />;
const Night = <BiryaniShop night />;

const SCENES: Record<string, React.FC<SP>> = {
  same: Slam('একই বিরিয়ানি, একই দাম', {size: 136, top: 300, color: GOLD, bg: 'dark', back: () => <div style={{position: 'absolute', left: 300, top: 1000}}><Handi size={480} /></div>}),
  dayNight: Two(
    R({place: Day, title: 'দুপুরে: খালি', color: RED, size: 100, titleTop: 900}),
    R({place: Night, actors: [...line(4, 1500, 660, 150, 260), ...line(3, 1760, 860, 270, 270)], title: 'রাতে: লাইন!', color: GREEN, size: 100, titleTop: 240}),
  ),
  five: R({place: Night, actors: [...line(3, 1500, 760, 200, 340), ...line(2, 1760, 960, 330, 420)], title: 'শুধু পাঁচজন বন্ধু', color: GOLD}),
  saved: R({place: Day, actors: [a(RONY, 540, 'smile', 'open', {h: 1100, y: 1760, talking: false})], title: 'সব জমানো টাকা', over: () => <><Bounce x={70} y={1240} at={6}><Taka w={300} rot={-10} /></Bounce><Bounce x={720} y={1300} at={10} seed="t2"><Taka w={300} rot={12} /></Bounce></>}),
  tasty: Two(
    R({place: Day, actors: [a(RONY, 300, 'smile', 'thumbsUp', {h: 1100, y: 1760})], over: () => <Bounce x={560} y={1120} at={2}><Handi size={460} /></Bounce>, title: 'রান্না দারুণ', color: GREEN}),
    Count(10, {pre: 'দিনে ', post: ' প্যাকেটও না', size: 100, label: 'তিন মাস ধরে', color: RED, bg: 'dark'}),
    0.35,
  ),
  next: R({place: Night, actors: [...line(4, 1500, 660, 150, 260), a(CROWD[1], 300, 'laugh', 'wave', {h: 860, y: 1760}), a(CROWD[4], 760, 'smile', 'open', {h: 860, y: 1760, lookX: -1})], title: 'পাশের দোকানে ভিড়', color: GOLD}),
  alone: R({place: Day, actors: [a(RONY, 540, 'sad', 'idle', {h: 920})], front: () => <Table />, title: 'খালি দোকান', color: RED}),
  couple: R({place: Day, actors: [a(MAN, 720, 'neutral', 'idle', {h: 1120, y: 1800, lookX: -1}), a(WIFE, 370, 'neutral', 'idle', {h: 1040, y: 1800, lookX: 0.5})]}),
  manSays: R({place: Day, actors: [a(MAN, 720, 'skeptical', 'pointL', {h: 1120, y: 1800, lookX: -1, talking: true}), a(WIFE, 330, 'neutral', 'idle', {h: 1040, y: 1800, lookX: 1})]}),
  heard: R({place: Day, actors: [a(RONY, 540, 'shocked', 'hold', {h: 1240, y: 1860, holding: HandPhone})], title: 'রনি শুনে ফেলল', color: RED}),
  calls: R({place: Day, actors: [a(RONY, 540, 'serious', 'hold', {h: 1240, y: 1880, holding: HandPhone, talking: true})]}),
  eat: R({place: Night, actors: line(5, 1600, 800, 110, 210), front: () => <Table plates={5} />, title: 'পাঁচ বন্ধু, সামনের টেবিল', color: GOLD}),
  stops: R({place: Night, actors: [...line(3, 1600, 800, 110, 210), a(CAST.ceo, 800, 'surprised', 'idle', {h: 1100, y: 1820, lookX: -1})], front: () => <Table top={1560} plates={3} />, title: 'একজন থামল', color: GOLD}),
  fills: R({place: Night, actors: [...line(5, 1500, 620, 110, 210), ...line(5, 1720, 800, 150, 200)], front: () => <Table top={1600} plates={5} />, title: 'সব টেবিল ভর্তি', color: GREEN}),
  queue: Two(
    R({place: Night, actors: [...line(5, 1500, 560, 90, 225), ...line(4, 1660, 700, 160, 260), ...line(3, 1860, 900, 240, 310)], title: 'রাত নয়টা: লাইন', color: GREEN}),
    R({place: Night, over: () => <Bounce x={230} y={900} at={2}><Handi size={620} steam={false} /></Bounce>, title: 'হাঁড়ি প্রায় শেষ', color: RED}),
    0.55,
  ),
  sameMan: R({place: Night, actors: [...line(2, 1560, 700, 120, 860), a(MAN, 560, 'neutral', 'idle', {h: 1180, y: 1840}), a(WIFE, 260, 'neutral', 'idle', {h: 1060, y: 1840, lookX: 1}), a(CROWD[0], 900, 'neutral', 'idle', {h: 1060, y: 1840, lookX: -1})], title: 'দুপুরের সেই লোকটা!', color: RED}),
  manAgain: R({place: Night, actors: [a(MAN, 640, 'laugh', 'open', {h: 1240, y: 1860, talking: true, lookX: -0.6}), a(WIFE, 230, 'smile', 'idle', {h: 1060, y: 1860, lookX: 1})]}),
  book: BookScene('Influence', 'Robert Cialdini'),
  lesson: R({bg: 'plain'}),
  check: Card('ভিড় দেখেই ভালো ধরে নিও না। নিজে যাচাই করো।', {color: GOLD, place: Night}),
  business: R({place: Night, actors: line(3, 1600, 860, 180, 360), front: () => <Table plates={3} />, title: 'প্রথম কাস্টমার সবার চোখে', size: 72, color: GREEN}),
  cta: () => (
    <Cta>
      <Handi size={420} />
    </Cta>
  ),
};
const Scene = pick(SCENES);

export const BiryaniThumbnail: React.FC = () => (
  <PsyThumb
    l1="একই বিরিয়ানি"
    l2="দুপুরে খালি, রাতে লাইন!"
    bottom="মাঝখানে রনি কী করল?"
    term="Social Proof"
    glow="rgba(227,191,122,0.32)"
    art={<div style={{position: 'absolute', left: 40, top: 900}}><Handi size={520} /></div>}
    size={88}
  />
);
export const BiryaniVideo: React.FC<StoryProps> = (p) => <Story {...p} fx segments={segs} folder="biryani/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<BiryaniThumbnail />} />;
