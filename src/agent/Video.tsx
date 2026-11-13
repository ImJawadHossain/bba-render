import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Desk, Home, PhoneProp, Taka, TakaRain} from '../common/places';
import {BookScene, Bounce, Card, Count, Cta, Hit, Pair, R, Solo, Y1, Y2, Y3, story} from '../common/reel';
import raw from './segments.json';

const SUMON: ToonLook = Y1;
const SELIM: ToonLook = {skin: '#e2b391', hair: '#1a1410', hairStyle: 'side', top: '#f4f2ec', jacket: '#3a2e22', tie: '#7a1f2a', bottom: '#1c1a16', mustache: true};
const Dim = <Home dim />;
const Day = <Home />;
const desk = () => <Desk top={1460} />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Hit('একবারে ৫ লাখ? দিত না', {size: 122, top: 560, color: RED, place: Dim}),
  h2: Count(10000, {pre: '৳ ', size: 180, label: 'তাই চাইল', color: GREEN, place: Dim}),
  h3: Solo(Dim, {look: SUMON, e: 'sad'}, {near: true, title: 'পাঁচ লাখ শেষ', color: RED}),
  want: Pair(Day, {look: SUMON, e: 'smile'}, {look: SELIM, e: 'laugh'}, {front: desk, title: 'দালাল সেলিম', color: GOLD}),
  ten: Pair(Day, {look: SUMON, e: 'neutral'}, {look: SELIM, e: 'smile', g: 'open', talk: true}, {front: desk}),
  gave: R({place: Day, over: () => <Bounce x={280} y={820} at={2}><Taka w={520} amount="১০,০০০" rot={-4} /></Bounce>, title: 'বেশি তো না', color: GREEN}),
  month: Hit('এক মাস পর', {size: 150, top: 640, color: GOLD, bg: 'dark'}),
  twenty: Pair(Day, {look: SUMON, e: 'worried'}, {look: SELIM, e: 'smile', g: 'explain', talk: true}, {front: desk}),
  more: R({place: Day, over: () => <><Bounce x={100} y={500} at={2}><Paper w={500} title="মেডিকেল" dots={2} size={52} rot={-4} /></Bounce><Bounce x={460} y={880} at={Math.round(10)} seed="p2"><Paper w={520} title="টিকিটের জমা" dots={2} size={52} rot={3} /></Bounce></>, title: 'প্রতিবার অল্প অল্প', color: GOLD}),
  gold: Solo(Dim, {look: SUMON, e: 'sad'}, {title: 'মায়ের গয়না, বাবার জমি', size: 78, color: RED}),
  total: Count(500000, {pre: '৳ ', size: 170, label: 'দুই বছরে', color: RED, bg: 'dark', back: () => <TakaRain n={12} speed={10} />}),
  pal: Pair(Dim, {look: SUMON, e: 'sad'}, {look: Y2, e: 'serious'}),
  trap: Pair(Dim, {look: SUMON, e: 'worried'}, {look: Y2, e: 'serious', g: 'open', talk: true}),
  sunk: Pair(Dim, {look: SUMON, e: 'sad', g: 'open', talk: true}, {look: Y2, e: 'worried'}),
  knew: Solo(Day, {look: SELIM, e: 'wink'}, {near: true, title: 'সেলিম এটাই জানত', color: RED}),
  harder: Card('যত ঢালে, থামা তত কঠিন', {size: 100, color: GOLD, place: Dim}),
  off: R({place: Dim, over: () => <Bounce x={300} y={460} at={2}><PhoneProp w={480} screen="#101420"><div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e0606a', fontSize: 70, fontWeight: 800, textAlign: 'center', lineHeight: 1.3}}>নম্বরটি বন্ধ আছে</div></PhoneProp></Bounce>}),
  newboy: Pair(Day, {look: Y3, e: 'smile'}, {look: SELIM, e: 'smile'}, {front: desk}),
  again: Pair(Day, {look: Y3, e: 'smile'}, {look: SELIM, e: 'laugh', g: 'open', talk: true}, {front: desk}),
  book: BookScene('Thinking, Fast and Slow', 'Daniel Kahneman', 'Sunk Cost', '#14305f'),
  t1: Card('আজ প্রথম থেকে শুরু করলে কি টাকা দিতাম?', {size: 84, color: GOLD, place: Dim}),
  t2: Card('যা গেছে, তা গেছে', {size: 110, color: RED, place: Dim}),
  t3: Card('আগে যাচাই: সরকারের অনুমোদিত এজেন্সি?', {size: 84, color: GREEN, place: Dim}),
  cta: () => (
    <Cta>
      <Taka w={520} amount="১০,০০০" />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="শুরুটা মাত্র ১০ হাজার" l2="শেষটা ৫ লাখ!" bottom="বিদেশ যাওয়া হলো না" term="Sunk Cost" art={<div style={{position: 'absolute', left: 30, top: 1060}}><Taka w={520} amount="১০,০০০" rot={-6} /></div>} />
);
export const agent = story('agent/', raw, SCENES, Thumb);
