import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb, a} from '../common/psy';
import {BoardSign, Gym} from '../common/places2';
import {Bounce, Card, Count, Cta, Hit, Pair, R, Solo, Y1, Y2, Y3, lawBook, story} from '../common/reel';
import raw from './segments.json';

const JEWEL: ToonLook = {skin: '#b87a52', hair: '#1a1410', hairStyle: 'short', top: '#2a2c34', bottom: '#14161c', beard: true, shoes: '#e8e4dc'};
const BOY: ToonLook = {...Y1, top: '#c0504a', bottom: '#2a2c30'};
const OLDS = 'সুস্থ থাকুন, নিয়মিত ব্যায়াম করুন';
const NEWS = 'বিয়ের ছবিতে নিজেকে চিনতে পারবেন না';
const Old = <Gym sign={OLDS} />;
const New = <Gym sign={NEWS} />;
const Photo: React.FC = () => (
  <div style={{width: 460, height: 560, background: '#f4efe2', border: '14px solid #7a5a2e', boxShadow: '0 24px 60px rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-3deg)'}}>
    <svg viewBox="0 0 120 150" width={340} height={420}>
      <circle cx={60} cy={44} r={26} fill="#c98d62" />
      <path d="M36 34 L60 8 L84 34Z" fill="#c0304a" />
      <path d="M22 150 C22 90 38 76 60 76 C82 76 98 90 98 150Z" fill="#e8c14a" />
    </svg>
  </div>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: Hit('একই জিম, একই ফি', {size: 136, top: 620, color: GOLD, place: Old}),
  h2: Count(3, {post: ' গুণ ভর্তি', size: 190, label: 'একটা লাইন বদলে', color: GREEN, place: <Gym />}),
  coach: Solo(<Gym />, {look: JEWEL, e: 'smile', g: 'explain'}),
  sign: R({place: <Gym />, over: () => <Bounce x={130} y={680} at={2}><BoardSign text={OLDS} w={820} size={78} bg="#14305f" /></Bounce>}),
  true: Solo(Old, {look: JEWEL, e: 'smile', g: 'thumbsUp'}),
  five: Count(5, {post: ' জন', size: 240, label: 'মাসে ভর্তি', color: RED, place: <Gym />}),
  came: Pair(Old, {look: BOY, e: 'worried'}, {look: JEWEL, e: 'neutral'}),
  ask: Pair(Old, {look: BOY, e: 'worried', g: 'open', talk: true}, {look: JEWEL, e: 'surprised'}),
  stop: Solo(Old, {look: JEWEL, e: 'thinking', g: 'think'}, {near: true}),
  health: Card('স্বাস্থ্য কিনতে আসেনি', {size: 110, color: RED, place: <Gym />}),
  photo: R({place: <Gym />, over: () => <Bounce x={310} y={520} at={1}><Photo /></Bounce>, title: 'সে কিনতে এসেছে বিয়ের ছবি', size: 72, color: GOLD}),
  next: Solo(<Gym />, {look: JEWEL, e: 'wink', g: 'pointUp'}),
  newsign: R({place: <Gym />, over: () => <Bounce x={130} y={660} at={1}><BoardSign text={NEWS} w={820} size={84} /></Bounce>}),
  same: R({place: New, title: 'একই পুরোনো মেশিন', color: GOLD}),
  calls: Solo(New, {look: JEWEL, e: 'laugh', hold: HandPhone, talk: true}),
  fifteen: Count(15, {post: ' জন', size: 260, label: 'এক মাসে ভর্তি', color: GREEN, place: <Gym />}),
  heart: R({place: New, actors: [a(Y2, 200, 'smile', 'open', {h: 960, y: 1790}), a(Y3, 500, 'smile', 'idle', {h: 960, y: 1790}), a(BOY, 820, 'smile', 'idle', {h: 960, y: 1790})]}),
  look: R({place: New, over: () => <Bounce x={310} y={640} at={2}><Photo /></Bounce>}),
  book: lawBook(32),
  t1: Card('গুণের তালিকা বাদ দাও', {size: 104, color: RED, place: <Gym />}),
  t2: Card('কাস্টমার গোপনে কী হতে চায়?', {size: 94, color: GREEN, place: <Gym />}),
  t3: Card('জিনিসটা কিনছি, না স্বপ্নটা?', {size: 96, color: GOLD, place: <Gym />}),
  cta: () => (
    <Cta>
      <Photo />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই জিম, একই ফি" l2="এক লাইনে তিনগুণ ভর্তি!" bottom="লাইনটা কী ছিল?" term="48 Laws · Law 32" art={<div style={{position: 'absolute', left: 30, top: 960, transform: 'scale(0.85)'}}><Photo /></div>} size={84} />
);
export const gym = story('gym/', raw, SCENES, Thumb);
