import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb, a} from '../common/psy';
import {Home} from '../common/places';
import {ShopFront, TvSet} from '../common/places2';
import {BookScene, Bounce, Card, Count, Cta, Hit, MIDDLE, Pair, R, SIR, Solo, WOMAN, Y2, Y3, story} from '../common/reel';
import raw from './segments.json';

const BELAL: ToonLook = {...SIR, jacket: undefined, tie: undefined, top: '#5a7a9a'};
const MANIK: ToonLook = {...MIDDLE, hairStyle: 'side', kurta: false, top: '#2a2c34', bottom: '#1c1e24'};
const SON: ToonLook = {...Y3, headScale: 1.2, top: '#d9822b'};
const Shop = <ShopFront name="মানিক ইলেকট্রনিক্স" signBg="#14305f" signColor="#9fd3ff" />;
const Room = <Home />;
const Night = <Home dim />;
const wallTv = (at = 2) => () => <Bounce x={130} y={330} at={at}><TvSet w={820} /></Bounce>;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Hit('টাকাই নিল না!', {size: 140, top: 600, color: GOLD, place: Shop}),
  h2: R({place: Shop, over: wallTv(2), actors: [a(MANIK, 540, 'smile', 'open', {h: 1000, y: 1780, talking: false})]}),
  h3: Count(3, {post: ' টা ফেরত আসে', size: 130, label: 'একশোটার মধ্যে', color: RED, place: Night}),
  has: R({place: Room, over: () => <Bounce x={380} y={480} at={2}><TvSet w={340} on={false} /></Bounce>, actors: [a(BELAL, 540, 'neutral', 'idle', {h: 1000, y: 1790})]}),
  price: Count(50000, {pre: '৳ ', size: 190, label: 'নতুন টিভি', color: RED, place: Shop}),
  smile: Solo(Shop, {look: MANIK, e: 'smile'}, {near: true}),
  offer: Pair(Shop, {look: BELAL, e: 'skeptical'}, {look: MANIK, e: 'smile', g: 'open', talk: true}),
  harm: Solo(Shop, {look: BELAL, e: 'thinking', g: 'think'}, {title: 'এতে ক্ষতি কী?', color: GOLD}),
  wife: R({place: Room, over: wallTv(), actors: [a(WOMAN, 540, 'laugh', 'open', {h: 960, y: 1800})]}),
  son: R({place: Room, over: wallTv(), actors: [a(SON, 540, 'laugh', 'idle', {h: 800, y: 1700})]}),
  under: Solo(Room, {look: BELAL, e: 'neutral'}, {x: 300, over: () => <Bounce x={590} y={1170} at={2}><TvSet w={400} on={false} /></Bounce>, title: 'পুরোনোটা খাটের নিচে', color: GOLD}),
  nb: R({place: Room, over: wallTv(), actors: [a(Y2, 280, 'surprised', 'idle', {h: 980, y: 1810, lookX: 1}), a(BELAL, 790, 'smile', 'idle', {h: 980, y: 1810, lookX: -1})]}),
  nbsay: R({place: Room, actors: [a(BELAL, 280, 'smile', 'idle', {h: 1080, y: 1830, lookX: 1}), a(Y2, 790, 'laugh', 'pointL', {h: 1080, y: 1830, lookX: -1, talking: true})]}),
  only: Solo(Room, {look: BELAL, e: 'laugh'}, {near: true}),
  seven: Hit('সপ্তম দিন', {size: 150, top: 640, color: RED, bg: 'dark'}),
  call: Solo(Shop, {look: MANIK, e: 'smile', hold: HandPhone, talk: true}),
  wall: R({place: Room, over: wallTv(), actors: [a(BELAL, 540, 'worried', 'hold', {h: 960, y: 1800, holding: HandPhone})]}),
  beside: Pair(Room, {look: BELAL, e: 'worried', hold: HandPhone}, {look: SON, e: 'neutral'}),
  ours: Pair(Room, {look: BELAL, e: 'worried', hold: HandPhone}, {look: SON, e: 'sad', g: 'open', talk: true}),
  ourswd: Hit('"আমাদের টিভি"', {size: 136, top: 620, color: GOLD, place: Room}),
  pay: Solo(Room, {look: BELAL, e: 'smile', hold: HandPhone, talk: true}),
  book: BookScene('Thinking, Fast and Slow', 'Daniel Kahneman', 'Endowment', '#14305f'),
  t1: Card('এটা কি আমার দরকার?', {size: 104, color: GOLD, place: Night}),
  t2: Card('ফেরতের তারিখ লিখে রাখো', {size: 96, color: RED, place: Night}),
  t3: Card('আগে ব্যবহার করতে দাও', {size: 100, color: GREEN, place: Shop}),
  cta: () => (
    <Cta>
      <TvSet w={520} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="টাকা না নিয়ে টিভি দিল" l2="১০০-তে ফেরত মাত্র ৩টা!" bottom="কারণটা একটা শব্দে" term="Endowment Effect" art={<div style={{position: 'absolute', left: 20, top: 1000}}><TvSet w={560} /></div>} size={82} />
);
export const trialtv = story('trialtv/', raw, SCENES, Thumb);
