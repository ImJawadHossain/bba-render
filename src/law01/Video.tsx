import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Counter, Handi, Home, Taka} from '../common/places';
import {Bounce, Card, Count, Cta, Hit, MIDDLE, MOM, Pair, R, Solo, Two, WOMAN, lawBook, story} from '../common/reel';
import {CAST} from '../common/cast';
import {HandSpoon, Kitchen, Lock, Next, NextBadge, PageCard, Plate} from '../common/laws48';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MOYNA: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#2a7a6a', skirt: '#2a7a6a', bottom: '#2a7a6a'};
const RINA: ToonLook = {...MOM, top: '#8a2a3a', skirt: '#6a1f2a'};
const SHIRIN: ToonLook = {...MOM, hairStyle: 'bob', hair: '#9a948c', glasses: true, top: '#3a5aa0', skirt: '#2a3a6a', age: 0.6};
const GUEST: ToonLook = MIDDLE;

const K = <Kitchen />;
const Room = <Home />;
const Dim = <Home dim />;

// রান্নাঘরের কাউন্টার, ডান দিকে হাঁড়ি
const stove = () => (
  <>
    <Counter top={1380} color="#7a5a3a" />
    <div style={{position: 'absolute', left: 600, top: 1110}}>
      <Handi size={380} />
    </div>
  </>
);
// খাবার টেবিল: হাঁড়ি আর প্লেট
const table = () => (
  <>
    <Counter top={1400} color="#8a3a3a" />
    <div style={{position: 'absolute', left: 390, top: 1180}}>
      <Handi size={300} />
    </div>
    <div style={{position: 'absolute', left: 90, top: 1380}}>
      <Plate size={230} />
    </div>
    <div style={{position: 'absolute', left: 760, top: 1380}}>
      <Plate size={230} />
    </div>
  </>
);
const cook = (who: ToonLook, e: 'smile' | 'serious' | 'laugh' = 'smile') => R({place: K, actors: [{look: who, x: 330, h: 1080, y: 1760, expression: e, gesture: 'hold', holding: HandSpoon, lookX: 1}], front: stove});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: Room, actors: [{look: GUEST, x: 260, h: 1000, y: 1700, expression: 'laugh', gesture: 'thumbsUp'}, {look: CAST.customer, x: 820, h: 1000, y: 1700, expression: 'laugh', gesture: 'open', lookX: -1}], front: table, title: 'আঙুল চাটে মেহমানরা', color: GOLD}),
  h2: Solo(Dim, {look: MOYNA, e: 'sad'}, {title: 'পরদিনই চাকরি শেষ!', color: RED}),
  famous: R({place: K, actors: [{look: RINA, x: 330, h: 1080, y: 1760, expression: 'smile', gesture: 'thumbsUp', lookX: 1}], front: stove, title: 'বংশের সেরা বিরিয়ানি', color: GOLD}),
  back: R({place: K, actors: [{look: RINA, x: 540, h: 1080, y: 1760, expression: 'worried', gesture: 'shrug'}], title: 'কোমরে ব্যথা', color: RED}),
  cook: cook(MOYNA),
  guest: Pair(Room, {look: RINA, e: 'smile'}, {look: GUEST, e: 'laugh', g: 'open', talk: true}, {bar: true, front: table}),
  smile: Solo(Room, {look: RINA, e: 'smile'}, {near: true}),
  smile2: Solo(Room, {look: RINA, e: 'skeptical'}, {near: true, title: 'হাসিটা থামে না...', color: GOLD}),
  salary: Pair(Room, {look: RINA, e: 'serious', g: 'pointR'}, {look: MOYNA, e: 'smile'}, {over: () => <Bounce x={380} y={980} at={3}><Taka w={320} rot={-6} amount="বেতন" /></Bounce>}),
  fire: Pair(Room, {look: RINA, e: 'serious', g: 'pointR', talk: true}, {look: MOYNA, e: 'shocked'}),
  salt: Card('রান্নায় লবণ বেশি না', {size: 100, color: GOLD, place: K}),
  praise: Hit('বেশি হয়ে যায় প্রশংসা', {size: 120, color: RED, place: Dim}),
  shirin: R({place: K, actors: [{look: SHIRIN, x: 330, h: 1080, y: 1760, expression: 'smile', gesture: 'thumbsUp', lookX: 1}], front: stove, title: 'শিরিন খালার গর্ব: মাছের ঝোল', color: GOLD, size: 74}),
  before: Pair(K, {look: MOYNA, e: 'smile'}, {look: SHIRIN, e: 'neutral'}, {title: 'নতুন বাসা', color: GOLD}),
  ask: Pair(K, {look: MOYNA, e: 'smile', g: 'open', talk: true}, {look: SHIRIN, e: 'laugh'}),
  better: R({place: K, actors: [{look: MOYNA, x: 330, h: 1080, y: 1760, expression: 'smile', gesture: 'hold', holding: HandSpoon, lookX: 1}], front: stove, title: 'আগের চেয়েও ভালো', color: GREEN}),
  taste: Pair(K, {look: MOYNA, e: 'smile'}, {look: SHIRIN, e: 'laugh', g: 'hold', hold: HandSpoon}, {title: 'লবণটা খালা চাখেন', color: GOLD}),
  credit: Pair(Room, {look: MOYNA, e: 'smile', g: 'pointR', talk: true}, {look: SHIRIN, e: 'laugh'}, {bar: true, front: table, title: 'সব খালার রেসিপি', color: GOLD}),
  years: Count(20, {post: ' বছর', label: 'একই বাসায়', size: 220, color: GREEN, place: K}),
  diff: Two(Card('দুই বাসাতেই রান্না সেরা', {size: 96, color: GOLD, place: Dim}), Hit('পার্থক্য শুধু: নামটা কার', {size: 112, color: RED, place: Dim}), 0.5),
  book: lawBook(1),
  lesson: R({bg: 'plain'}),
  act: Card('কাজ করো সেরা, নামটা দাও ওপরের মানুষকে', {size: 86, color: GREEN, place: K}),
  next: Next(2, <PageCard name="শুভ শার্টস" followers="৫০,০০০" w={640} />, {title: 'এক রাতে পেজটা অন্য কারো'}),

  next2: Next(2, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'হ্যাকার না!', color: RED}),
  next3: Next(2, <Lock size={300} />, {title: 'তোমার পাসওয়ার্ড কার হাতে?'}),
  cta: () => (
    <Cta>
      <NextBadge law={2} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="বিরিয়ানি খেয়ে আঙুল চাটে" l2="রাঁধুনির চাকরি শেষ!" bottom="দোষটা রান্নার না" term="48 Laws · Law 1" art={<div style={{position: 'absolute', left: 40, top: 1120}}><Handi size={460} /></div>} size={84} />
);
export const law01 = story('law01/', raw, SCENES, Thumb, {logo: 'bba2'});
