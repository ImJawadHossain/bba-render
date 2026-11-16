import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {PsyThumb, a} from '../common/psy';
import {HandCup, Home, Rooftop, Taka, TeaCup} from '../common/places';
import {MessRoom} from '../common/places2';
import {Bounce, Card, Count, Cta, ELDER, Hit, Pair, R, Solo, Y1, Y2, Y3, lawBook, story} from '../common/reel';
import raw from './segments.json';

const BABU: ToonLook = {...Y2, top: '#b3201f', beard: true};
const LANDLORD: ToonLook = ELDER;
const BOYS: ToonLook[] = [Y1, Y3, CAST.customer, CAST.founder, CAST.worker];
const M = <MessRoom />;
const crowd = (n: number, e: 'neutral' | 'worried' | 'smile' | 'sad' | 'surprised' = 'neutral', lookX = 0) => Array.from({length: n}, (_, i) => a(BOYS[i % BOYS.length], 140 + (i * 800) / Math.max(1, n - 1), e, 'idle', {h: 780, y: 1620, lookX}));

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: M, actors: crowd(5, 'serious' as 'neutral'), title: '১২ জন: ভাড়া বন্ধ', color: RED}),
  h2: Pair(<Home />, {look: BABU, e: 'neutral', hold: HandCup}, {look: LANDLORD, e: 'smile', hold: HandCup}, {title: 'চা শুধু একজনকে', color: GOLD}),
  h3: Hit('পরের দিন আন্দোলন শেষ', {size: 124, top: 620, color: RED, place: M}),
  raise: Count(500, {pre: '+ ', post: ' টাকা', size: 190, label: 'ভাড়া বাড়ল', color: RED, place: M}),
  table: Solo(M, {look: BABU, e: 'serious', g: 'pointUp'}, {title: 'মেসের বড় ভাই বাবু', color: GOLD}),
  babu: Solo(M, {look: BABU, e: 'shocked', g: 'open', talk: true}, {near: true}),
  all: R({place: M, actors: crowd(5, 'smile'), title: 'সবাই রাজি', color: GREEN}),
  shout: Pair(M, {look: LANDLORD, e: 'shocked', g: 'open', talk: true}, {look: BABU, e: 'skeptical'}, {title: 'লাভ হলো না', color: RED}),
  saw: Solo(M, {look: LANDLORD, e: 'thinking', g: 'think'}),
  look: R({place: M, actors: [a(BABU, 540, 'serious', 'idle', {h: 1120, y: 1860}), ...crowd(4, 'neutral', 0)], title: 'সবাই তাকায় বাবুর দিকে', size: 76, color: GOLD}),
  tea: Pair(<Home />, {look: BABU, e: 'surprised'}, {look: LANDLORD, e: 'smile', g: 'open'}, {over: () => <Bounce x={420} y={1100} at={3}><TeaCup size={240} /></Bounce>}),
  deal: Pair(<Home />, {look: BABU, e: 'surprised', hold: HandCup}, {look: LANDLORD, e: 'smile', g: 'explain', talk: true}),
  nod: Solo(<Home />, {look: BABU, e: 'thinking', hold: HandCup}, {near: true}),
  circle: R({place: M, actors: [a(BABU, 540, 'blank', 'idle', {h: 1120, y: 1860}), ...crowd(4, 'worried', 0)]}),
  what: Pair(M, {look: Y1, e: 'worried', g: 'open', talk: true}, {look: BABU, e: 'blank'}),
  out: Pair(M, {look: Y1, e: 'shocked'}, {look: BABU, e: 'serious', g: 'open', talk: true}),
  eleven: R({place: M, actors: crowd(5, 'sad')}),
  none: Solo(M, {look: Y3, e: 'blank'}, {near: true}),
  paid: R({place: M, over: () => <><Bounce x={100} y={700} at={2}><Taka w={380} amount="+৫০০" rot={-8} /></Bounce><Bounce x={560} y={820} at={7} seed="t2"><Taka w={380} amount="+৫০০" rot={6} /></Bounce><Bounce x={230} y={1040} at={12} seed="t3"><Taka w={380} amount="+৫০০" rot={-3} /></Bounce></>, title: 'সবাই বেশি দিল', color: RED}),
  roof: Solo(<Rooftop />, {look: BABU, e: 'smile'}, {title: 'বাবু ছাদের ঘরে', color: GOLD}),
  book: lawBook(42),
  t1: Card('আসল মানুষটা কে?', {size: 112, color: GOLD, place: M}),
  t2: Card('তার সাথে আলাদা কথা বলো', {size: 96, color: GREEN, place: M}),
  t3: Card('নেতা সরলে তুমি কোথায়?', {size: 100, color: RED, place: M}),
  cta: () => (
    <Cta>
      <TeaCup size={380} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="১২ জনের আন্দোলন" l2="এক কাপ চায়ে শেষ!" bottom="বাড়িওয়ালার চাল" term="48 Laws · Law 42" art={<div style={{position: 'absolute', left: 70, top: 980}}><TeaCup size={430} /></div>} />
);
export const mess = story('mess/', raw, SCENES, Thumb);
