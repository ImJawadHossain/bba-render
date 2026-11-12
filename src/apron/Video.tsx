import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {PsyThumb, a} from '../common/psy';
import {Counter} from '../common/places';
import {Fair, HoneyBottle} from '../common/places2';
import {BookScene, Bounce, Card, Count, Cta, ELDER, Hit, Pair, R, SIR, Solo, Y1, Y2, Y3, story} from '../common/reel';
import raw from './segments.json';

const LUNGI: ToonLook = {...Y1, top: '#3f6a4a', bottom: '#7a6a3a'};
const COAT: ToonLook = {...LUNGI, labCoat: true, glasses: true, top: '#f4f2ec', bottom: '#2a2c30'};
const RIVAL: ToonLook = {...SIR, labCoat: true, jacket: undefined, tie: undefined};
const M = <Fair name="হালিমের খাঁটি মধু" />;
const stall = () => <Counter top={1440} color="#6a4a34" />;
const bottles = (n: number) => () => (
  <>
    {Array.from({length: n}, (_, i) => (
      <Bounce key={i} x={90 + i * 190} y={1190} at={i * 2} seed={`hb${i}`}>
        <HoneyBottle size={260} />
      </Bounce>
    ))}
  </>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: Hit('একই মধু, একই বোতল', {size: 124, top: 300, color: GOLD, place: M, back: () => <div style={{position: 'absolute', left: 430, top: 790}}><HoneyBottle size={480} /></div>}),
  h2: Solo(M, {look: LUNGI, e: 'neutral'}, {title: 'লুঙ্গি পরে: ৫ বোতল', color: RED}),
  h3: Solo(M, {look: COAT, e: 'serious'}, {title: 'অ্যাপ্রন পরে: ৫০ বোতল', size: 80, color: GREEN}),
  sells: R({place: M, actors: [a(LUNGI, 540, 'smile', 'open', {h: 1040})], front: stall, over: bottles(3)}),
  doubt: R({place: M, actors: [a(LUNGI, 790, 'worried', 'idle', {h: 1040, lookX: -1}), a(Y2, 280, 'skeptical', 'think', {h: 1040, lookX: 1})], front: stall}),
  ask: R({place: M, actors: [a(Y2, 280, 'skeptical', 'open', {h: 1040, lookX: 1, talking: true}), a(LUNGI, 790, 'worried', 'idle', {h: 1040, lookX: -1})], front: stall}),
  next: Solo(<Fair name="পাশের স্টল" />, {look: RIVAL, e: 'serious', g: 'explain'}, {over: () => <Bounce x={760} y={1090} at={4}><HoneyBottle size={300} /></Bounce>}),
  line: R({place: <Fair name="পাশের স্টল" />, actors: [a(Y1, 150, 'smile', 'idle', {h: 880, y: 1780}), a(Y2, 370, 'smile', 'idle', {h: 880, y: 1780}), a(Y3, 590, 'smile', 'idle', {h: 880, y: 1780}), a(RIVAL, 860, 'serious', 'explain', {h: 1040, y: 1780, lookX: -1})], title: 'প্রশ্ন নেই, লাইন আছে', size: 78, color: GOLD}),
  buy: Solo(M, {look: LUNGI, e: 'thinking', g: 'pointUp'}, {title: '৩০০ টাকার অ্যাপ্রন', color: GOLD}),
  wear: Solo(M, {look: COAT, e: 'neutral'}, {near: true}),
  stand: Solo(M, {look: COAT, e: 'serious'}, {title: 'শুধু দাঁড়িয়ে রইল', color: GOLD}),
  sir: Pair(M, {look: Y2, e: 'smile', g: 'open', talk: true}, {look: COAT, e: 'surprised'}, {title: '"স্যার"!', size: 130, color: GOLD}),
  noask: R({place: M, actors: [a(Y3, 280, 'smile', 'idle', {h: 1040, lookX: 1}), a(COAT, 790, 'serious', 'idle', {h: 1040, lookX: -1})], front: stall, over: bottles(3)}),
  fifty: Count(50, {post: ' বোতল শেষ', size: 170, label: 'সন্ধ্যার আগেই', color: GREEN, place: M}),
  old: Pair(M, {look: ELDER, e: 'worried'}, {look: COAT, e: 'neutral'}),
  dia: Pair(M, {look: ELDER, e: 'worried', g: 'open', talk: true}, {look: COAT, e: 'neutral'}),
  heart: Solo(M, {look: COAT, e: 'shocked'}, {near: true}),
  notdoc: Pair(M, {look: ELDER, e: 'neutral'}, {look: COAT, e: 'worried', g: 'open', talk: true}),
  laugh: Solo(M, {look: ELDER, e: 'laugh'}, {near: true}),
  two: Pair(M, {look: ELDER, e: 'laugh', g: 'thumbsUp', talk: true}, {look: COAT, e: 'blank'}),
  book: BookScene('Influence', 'Robert Cialdini', 'Authority'),
  t1: Card('এই মানুষটা আসলে কে?', {size: 108, color: RED, place: M}),
  t2: Card('স্বাস্থ্যের প্রশ্নে আসল ডাক্তার', {size: 92, color: GREEN, place: M}),
  t3: Card('জ্ঞান থাকলে সেটা দেখাও', {size: 100, color: GOLD, place: M}),
  cta: () => (
    <Cta>
      <HoneyBottle size={420} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই মধু, একই বোতল" l2="অ্যাপ্রন পরতেই ১০ গুণ বিক্রি!" bottom={'"চাচা, আমি ডাক্তার না"'} term="Authority" glow="rgba(217,138,20,0.4)" art={<div style={{position: 'absolute', left: 130, top: 900}}><HoneyBottle size={520} /></div>} size={76} />
);
export const apron = story('apron/', raw, SCENES, Thumb);
