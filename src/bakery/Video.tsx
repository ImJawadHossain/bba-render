import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {PsyThumb, a} from '../common/psy';
import {Cake, Counter} from '../common/places';
import {Bakery, Oven, SmellWaves} from '../common/places2';
import {BookScene, Bounce, Card, Count, Cta, Hit, MIDDLE, Pair, R, SIR, Solo, Y1, Y2, story} from '../common/reel';
import raw from './segments.json';

const MOSLEM: ToonLook = {...MIDDLE, hair: '#e6e2da', hairStyle: 'balding', age: 0.85};
const OLD = <Bakery />;
const NEW = <Bakery oven />;
const smell = () => <SmellWaves x={420} y={420} w={620} />;
const walkers = (e: 'neutral' | 'surprised') => [a(Y1, 220, e, 'idle', {h: 960, y: 1770, lookX: 1}), a(Y2, 500, e, 'idle', {h: 900, y: 1720, lookX: 1}), a(CAST.customer2, 760, e, 'idle', {h: 880, y: 1720, lookX: -1})];

const SCENES: Record<string, React.FC<SP>> = {
  h1: Hit('একই কেক, একই দাম', {size: 130, top: 560, color: GOLD, place: OLD, back: () => <div style={{position: 'absolute', left: 340, top: 1010}}><Cake size={400} /></div>}),
  h2: R({place: OLD, over: () => <Bounce x={330} y={980} at={2}><Oven size={420} /></Bounce>, title: 'চুলা দরজার পাশে', color: GOLD}),
  h3: Count(2, {post: ' গুণ বিক্রি', size: 170, label: 'এক মাসে', color: GREEN, place: NEW}),
  old: Solo(OLD, {look: MOSLEM, e: 'smile'}, {title: 'পঁচিশ বছরের বেকারি', color: GOLD}),
  back: R({place: OLD, over: () => <Bounce x={340} y={1040} at={2}><Cake size={400} /></Bounce>, title: 'চুলা পেছনের ঘরে', color: GOLD}),
  pass: R({place: OLD, actors: walkers('neutral'), title: 'কেউ তাকায় না', color: RED}),
  leak: R({place: OLD, back: (f) => <>{Array.from({length: 14}, (_, i) => <div key={i} style={{position: 'absolute', left: 90 + i * 66, top: 560 + ((f * 14 + i * 137) % 800), width: 10, height: 60, borderRadius: 6, background: '#8ac4e8'}} />)}</>, actors: [a(MOSLEM, 540, 'shocked', 'open', {h: 1100, y: 1800})]}),
  moved: R({place: NEW, actors: [a(CAST.worker, 330, 'neutral', 'pointR', {h: 1040, y: 1790, lookX: 1})]}),
  odd: R({place: NEW, back: smell, title: 'অদ্ভুত ব্যাপার', color: GOLD}),
  stop: R({place: NEW, back: smell, actors: walkers('surprised'), title: 'মানুষ থেমে যাচ্ছে', color: GREEN}),
  nose: Solo(NEW, {look: Y2, e: 'surprised'}, {near: true, back: smell}),
  man: Solo(OLD, {look: SIR, e: 'neutral'}, {title: 'পাঁচ বছর খেয়ালই করেননি', size: 76, color: GOLD}),
  ask: Pair(NEW, {look: SIR, e: 'surprised', g: 'open', talk: true}, {look: MOSLEM, e: 'smile'}, {back: smell}),
  ans: Pair(NEW, {look: SIR, e: 'smile'}, {look: MOSLEM, e: 'laugh', g: 'open', talk: true}, {back: smell}),
  buy: Pair(NEW, {look: SIR, e: 'smile', g: 'pointR', talk: true}, {look: MOSLEM, e: 'smile'}, {over: () => <Bounce x={400} y={1090} at={4}><Cake size={280} /></Bounce>}),
  full: Solo(OLD, {look: SIR, e: 'thinking', g: 'think'}, {title: 'অথচ পেট ভরা!', color: RED}),
  fixed: Count(2, {post: ' গুণ', size: 240, label: 'এক মাস পর বিক্রি', color: GREEN, place: NEW}),
  mistri: Pair(NEW, {look: CAST.worker, e: 'neutral', g: 'pointL', talk: true}, {look: MOSLEM, e: 'thinking'}),
  stay: Pair(NEW, {look: CAST.worker, e: 'surprised'}, {look: MOSLEM, e: 'wink', g: 'thumbsUp', talk: true}),
  book: BookScene('Buyology', 'Martin Lindstrom'),
  t1: Card('খালি পেটে বাজারে যেও না', {size: 100, color: RED, place: OLD}),
  t2: Card('আমার কি সত্যিই খিদে পেয়েছে?', {size: 92, color: GOLD, place: NEW}),
  t3: R({place: NEW, front: () => <Counter top={1500} />, back: smell, title: 'গন্ধটাও ভাবো', color: GREEN}),
  cta: () => (
    <Cta>
      <Cake size={420} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই কেক, একই দাম" l2="চুলা সরাতেই বিক্রি দ্বিগুণ!" bottom="কারণটা লুকানো বাতাসে" term="Buyology" glow="rgba(227,191,122,0.32)" art={<div style={{position: 'absolute', left: 40, top: 1020}}><Cake size={480} /></div>} size={82} />
);
export const bakery = story('bakery/', raw, SCENES, Thumb);
