import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {PsyThumb, a} from '../common/psy';
import {ChaiStall, Counter, HandCup, Home, Taka} from '../common/places';
import {BoardSign, ShopFront} from '../common/places2';
import {Bounce, Card, Count, Cta, ELDER, Hit, Pair, R, Solo, Y1, Y2, lawBook, story} from '../common/reel';
import raw from './segments.json';

const RASEL: ToonLook = Y1;
const SOHEL: ToonLook = Y2;
const Tea = <ChaiStall />;
const Room = <Home />;
const Closed = <ShopFront wall="#b8a888" open={false} />;
const Shop = <ShopFront name="সোহেল স্টেশনারি" signBg="#7a1f3a" signColor="#ffe9a8" wall="#b8a888" />;
const bench = () => <Counter top={1520} color="#3a2a1a" />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(Tea, {look: RASEL, e: 'laugh', g: 'open', hold: HandCup, talk: false}, {look: SOHEL, e: 'smile', hold: HandCup}, {front: bench, title: 'শুধু প্রিয় বন্ধুকে', color: GOLD}),
  h2: Hit('ওই ঘরটাই নিয়ে ফেলল বন্ধু!', {size: 118, top: 300, color: RED, place: Shop}),
  save: Count(2, {post: ' বছর', size: 220, label: 'টাকা জমানো', color: GREEN, place: Room, back: () => <div style={{position: 'absolute', left: 290, top: 1040}}><Taka w={500} rot={-4} /></div>}),
  dream: R({place: Closed, over: () => <Bounce x={150} y={640} at={2}><BoardSign text="স্কুলের পাশের মোড়" w={780} size={82} bg="#14305f" /></Bounce>, title: 'একটাই স্বপ্ন', color: GOLD}),
  none: Solo(Closed, {look: RASEL, e: 'smile', g: 'thumbsUp'}, {title: 'আর কোনো দোকান নেই', color: GREEN}),
  told: Pair(Tea, {look: RASEL, e: 'laugh', hold: HandCup}, {look: SOHEL, e: 'neutral', hold: HandCup}, {front: bench}),
  plan: Pair(Tea, {look: RASEL, e: 'laugh', g: 'explain', talk: true}, {look: SOHEL, e: 'surprised', hold: HandCup}, {front: bench}),
  when: Pair(Tea, {look: RASEL, e: 'smile', hold: HandCup}, {look: SOHEL, e: 'smile', g: 'open', talk: true}, {front: bench}),
  next: Pair(Tea, {look: RASEL, e: 'smile', g: 'open', talk: true}, {look: SOHEL, e: 'thinking', hold: HandCup}, {front: bench}),
  month: Pair(Room, {look: RASEL, e: 'smile'}, {look: ELDER, e: 'neutral'}, {over: () => <Bounce x={360} y={1120} at={3}><Taka w={360} rot={-6} /></Bounce>, title: 'এক মাস পর', color: GOLD}),
  rented: Pair(Room, {look: RASEL, e: 'shocked'}, {look: ELDER, e: 'neutral', g: 'open', talk: true}),
  ran: Solo(Closed, {look: RASEL, e: 'shocked'}, {x: 240}),
  mistri: R({place: Shop, actors: [a(CAST.worker, 540, 'neutral', 'pointUp', {h: 1080, y: 1800})]}),
  sohel: R({place: Shop, actors: [a(CAST.worker, 230, 'neutral', 'idle', {h: 960, y: 1760, lookX: 1}), a(SOHEL, 640, 'laugh', 'pointUp', {h: 1160, y: 1850, lookX: -0.5})]}),
  book: lawBook(3),
  t1: Card('কাজের আগে প্ল্যান কাউকে না', {size: 94, color: RED, place: Room}),
  t2: Card('জিজ্ঞেস করলে অন্য কিছু বলো', {size: 94, color: GOLD, place: Room}),
  t3: Card('খুঁটিয়ে জানতে চায়? সাবধান।', {size: 94, color: GREEN, place: Tea}),
  cta: () => (
    <Cta>
      <Taka w={520} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="শুধু প্রিয় বন্ধুকে বলেছিল" l2="দোকানটা হলো বন্ধুর!" bottom="দুই বছরের স্বপ্ন শেষ" term="48 Laws · Law 3" art={<div style={{position: 'absolute', left: 30, top: 1080}}><Taka w={480} rot={-5} /></div>} size={82} />
);
export const told = story('told/', raw, SCENES, Thumb);
