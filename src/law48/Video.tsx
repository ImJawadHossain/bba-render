import React from 'react';
import {GOLD} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Avenue} from '../common/places';
import {ShopFront} from '../common/places2';
import {Cta, MIDDLE, Pair, R, Solo, Two, Y3, lawBook, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, Library, popIn, soft, sticker} from '../common/elegant';
import {Cassette, Copier} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const BABUL: ToonLook = {...MIDDLE, kurta: false, top: '#8a3a5a', bottom: '#2a2c30'};
const SHAFIQ: ToonLook = {...Y3, top: '#2a6a8a', age: 0.4};
const Tape = (open = true) => <ShopFront name="বাবুল ক্যাসেট হাউস" signBg="#7a1f3a" open={open} />;
const Copy = <ShopFront name="শফিক ফটোকপি" signBg="#14305f" />;
const line = (e: 'neutral' | 'laugh' | 'smile' = 'neutral', from = 0) => crowd([140, 400, 680, 940], {h: 860, y: 1900, e, from});

const SCENES: Record<string, React.FC<SP>> = {
  h1: Two(R({place: soft(Tape(), 2), over: popIn(<Cassette size={420} />, 330, 760)}), R({place: soft(Copy, 2), over: popIn(<Copier size={440} />, 320, 740)}), 0.5),
  h2: Two(R({place: soft(Tape(false), 2, 'night')}), R({place: soft(Copy, 2, 'gold'), actors: line()}), 0.4),
  s01: Pair(soft(<Avenue />, 2), {look: BABUL, e: 'smile'}, {look: SHAFIQ, e: 'smile'}, {title: 'বিশ বছর আগে', color: GOLD}),
  s02: R({place: soft(Tape(), 2, 'gold'), actors: line('laugh')}),
  s03: R({place: soft(<Avenue />, 8), over: () => (
    <>
      {popIn(<Cassette size={300} />, 80, 620)()}
      {sticker('→ সিডি → মোবাইল', {x: 420, y: 650, w: 600, bg: '#14305f', size: 60, at: 10})()}
    </>
  ), title: 'সময় বদলায়', color: GOLD}),
  s04: Solo(soft(Tape(), 4), {look: BABUL, e: 'skeptical', g: 'explain', talk: true}),
  s05: R({place: soft(Tape(), 3, 'dusk'), actors: [{look: BABUL, x: 540, h: 1100, y: 1880, expression: 'sad', gesture: 'idle'}]}),
  s06: R({place: soft(Copy, 6, 'gold'), over: () => (
    <>
      {sticker('কম্পিউটারে টাইপ', {x: 110, y: 490, w: 860, bg: '#14305f', size: 62})()}
      {sticker('মোবাইলে টাকা পাঠানো', {x: 110, y: 690, w: 860, bg: '#14305f', size: 62, at: 8})()}
      {sticker('অনলাইন ফর্ম, পাসপোর্ট', {x: 110, y: 890, w: 860, bg: '#14532d', size: 62, at: 16})()}
    </>
  )}),
  s07: R({place: soft(Copy, 4, 'cool'), over: popIn(<Copier size={460} dead />, 310, 700)}),
  s08: R({place: soft(Copy, 2, 'gold'), actors: line('smile', 2), over: sticker('প্রতিদিন দুইশো মানুষ', {x: 110, y: 560, w: 860, bg: '#14532d', size: 68})}),
  s09: R({place: soft(Tape(), 2, 'gold'), actors: [{look: SHAFIQ, x: 540, h: 1100, y: 1880, expression: 'laugh', gesture: 'thumbsUp'}], over: sticker('ভাড়াটে: শফিক', {x: 240, y: 500, w: 600, bg: '#14532d', size: 76})}),
  s10: Glass('এক রূপে আটকালে সময় ভাঙে', {place: <Avenue />, tone: 'gold', sub: 'পানির মতো রূপ বদলালে কেউ ছুঁতে পারে না'}),
  book: lawBook(48),
  lesson: R({bg: 'plain'}),
  act: Glass('কাজকে এক নামে বেঁধো না', {place: <Avenue />, color: '#bff2c8', sub: 'মানুষের দরকার বদলালে তুমিও বদলাও'}),
  fin: Glass('আটচল্লিশটা নিয়ম শেষ', {place: <Library />, tone: 'gold', sub: 'The 48 Laws of Power', color: GOLD}),
  cta: () => <Cta />,
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ফটোকপির দোকানে ফটোকপি হয় না" l2="তবু বিশ বছর ধরে চলছে!" bottom="শেষ নিয়ম: রূপ বদলাও" term="48 Laws · Law 48" art={<div style={{position: 'absolute', left: 80, top: 1120}}><Copier size={440} dead /></div>} size={78} />
);
export const law48 = story('law48/', raw, SCENES, Thumb, {logo: 'bba2'});
