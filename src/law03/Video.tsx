import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {PriceTag} from '../common/places';
import {Village} from '../common/places2';
import {Bounce, Card, Count, Cta, ELDER, Hit, MIDDLE, Pair, R, Solo, Y1, lawBook, story} from '../common/reel';
import {Camera, Cow, Haat, Next, NextBadge, PriceSheet} from '../common/laws48';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const BABUL: ToonLook = {...ELDER, top: '#e8e2cc'};
const BEPARI: ToonLook = {...MIDDLE, kurta: false, top: '#3f7a5a', bottom: '#4a3a2a'};
const RONY: ToonLook = Y1;

const H = <Haat />;
const Yard = <Village evening />;
// গরু পেছনে: x, y, মাপ
const cow = (color: 'white' | 'black', x: number, y = 960, size = 640, flip = false) => () => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <Cow color={color} size={size} flip={flip} garland={color === 'black'} />
  </div>
);
const both = (a: () => React.ReactNode, b: () => React.ReactNode) => () => (
  <>
    {a()}
    {b()}
  </>
);
const tag = (text: string, color: string, x = 300) => () => (
  <Bounce x={x} y={620} at={3} seed={text}>
    <PriceTag text={text} color={color} size={96} />
  </Bounce>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: H, back: cow('black', 190, 900, 700), title: '৬০ হাজার কম!', color: GREEN}),
  h2: R({place: H, back: cow('black', -40, 960, 620), actors: [{look: BABUL, x: 790, h: 1080, y: 1800, expression: 'neutral', gesture: 'idle', lookX: 1}], title: 'ওটার দিকে তাকানই না', color: GOLD}),
  white: R({place: H, back: cow('white', 380, 960, 640), actors: [{look: BABUL, x: 260, h: 1080, y: 1800, expression: 'smile', gesture: 'idle', lookX: 1}]}),
  touch: R({place: H, back: cow('white', 380, 960, 640), actors: [{look: BABUL, x: 260, h: 1080, y: 1800, expression: 'smile', gesture: 'pointR', lookX: 1}], title: 'গায়ে হাত, দাঁত দেখা', color: GOLD}),
  price: Pair(H, {look: BABUL, e: 'neutral'}, {look: BEPARI, e: 'serious', g: 'explain', talk: true}, {back: cow('white', 230, 960, 600), over: tag('৳২,০০,০০০', '#ffd84a')}),
  haggle: Count(40, {post: ' মিনিট', label: 'সাদাটা নিয়ে দরদাম', size: 220, color: GOLD, place: H}),
  glance: R({place: H, back: cow('black', -40, 960, 640), actors: [{look: BABUL, x: 790, h: 1080, y: 1800, expression: 'skeptical', gesture: 'pointL', lookX: -1}]}),
  thin: R({place: H, back: cow('black', -40, 960, 640), actors: [{look: BABUL, x: 790, h: 1080, y: 1800, expression: 'skeptical', gesture: 'pointL', talking: true, lookX: -1}]}),
  leave: R({place: H, actors: [{look: BABUL, x: 820, h: 1080, y: 1800, expression: 'neutral', gesture: 'idle', lookX: 1}], title: 'চলে যাচ্ছেন...', color: GOLD}),
  remember: R({place: H, actors: [{look: BABUL, x: 700, h: 1080, y: 1800, expression: 'surprised', gesture: 'pointUp', lookX: -1}], title: 'যেন হঠাৎ মনে পড়ল', color: GOLD}),
  ask: Pair(H, {look: BABUL, e: 'neutral', g: 'pointR', talk: true}, {look: BEPARI, e: 'surprised'}, {back: cow('black', 230, 960, 600)}),
  tired: Solo(H, {look: BEPARI, e: 'worried', g: 'shrug'}, {title: 'ওটা তো কেউ চায় না...', color: GOLD}),
  deal: Pair(H, {look: BABUL, e: 'smile'}, {look: BEPARI, e: 'neutral', g: 'open', talk: true}, {back: cow('black', 230, 960, 600), over: tag('৳১,৬০,০০০', '#7fd98a')}),
  yard: R({place: Yard, back: both(cow('black', -40, 1000, 560), cow('black', 520, 1000, 560, true))}),
  rony: R({place: Yard, back: both(cow('black', -40, 1000, 560), cow('black', 520, 1000, 560, true)), actors: [{look: RONY, x: 820, h: 1000, y: 1860, expression: 'smile', gesture: 'thumbsUp', lookX: -1}], title: 'রনির গরু: সকালে কেনা', color: GOLD}),
  ronyline: Pair(Yard, {look: BABUL, e: 'neutral'}, {look: RONY, e: 'smile', g: 'open', talk: true}, {over: tag('৳২,২০,০০০', '#ff8a8a', 290)}),
  babulq: Pair(Yard, {look: BABUL, e: 'skeptical', g: 'explain', talk: true}, {look: RONY, e: 'neutral'}),
  ronyans: Pair(Yard, {look: BABUL, e: 'serious'}, {look: RONY, e: 'worried', talk: true}),
  punch: Hit('৬০ হাজার টাকার বাক্য: "এটাই নেব"', {size: 108, color: RED, place: Yard}),
  book: lawBook(3),
  lesson: R({bg: 'plain'}),
  act: Card('যেটা চাও, তার কথা তোলো সবার শেষে', {size: 90, color: GREEN, place: H}),
  next: Next(4, <PriceSheet amount="৩০,০০০" old="৫০,০০০" w={560} />, {title: 'নিজের মুখেই দাম কমায়'}),
  next2: Next(4, <Camera size={460} />, {title: 'ক্লায়েন্ট একটা শব্দও বলে না', color: RED}),
  next3: Next(4, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'তুমিও কি এই ভুলটা করো?'}),
  cta: () => (
    <Cta>
      <NextBadge law={4} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই গরু, একই বেপারী" l2="বাবা দেয় ৬০ হাজার কম!" bottom="ছেলের ভুল একটা বাক্য" term="48 Laws · Law 3" art={<div style={{position: 'absolute', left: 20, top: 1150}}><Cow color="black" size={600} garland /></div>} size={84} />
);
export const law03 = story('law03/', raw, SCENES, Thumb, {logo: 'bba2'});
