import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Avenue, Home, Rooftop} from '../common/places';
import {Count, Pair, R, Solo, Y2, Y3, story} from '../common/reel';
import {PageCard, Parcels} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {Cassette, Copier, Panjabi, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const RIPON: ToonLook = {...Y2, top: '#f2efe6'};
const FARUK: ToonLook = {...Y3, top: '#2a5a8a'};
const House = <Home />;
const Dark = <Home dim />;
const mid = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle') => ({look, x: 540, h: 1100, y: 1880, expression, gesture});
const pile = popIn(<Parcels size={560} />, 260, 1260);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(House, 6, 'gold'), over: () => (
    <>
      {popIn(<Panjabi size={300} />, 150, 560)()}
      {popIn(<Panjabi size={300} color="#c8a050" />, 630, 560, 8)()}
    </>
  ), title: 'প্রথম ঈদে দশ লাখ', color: GREEN}),
  h2: R({place: soft(Dark, 3, 'night'), actors: [mid(RIPON, 'sad')], over: () => (
    <>
      {pile()}
      {sticker('ঘরে তিন হাজার পাঞ্জাবি', {x: 110, y: 420, w: 860, bg: '#7a1f3a', size: 68})()}
    </>
  )}),
  s01: Pair(soft(House, 3), {look: RIPON, e: 'smile', g: 'hold', hold: HandPhone}, {look: FARUK, e: 'smile'}, {title: 'দুই বন্ধুর পেজ', color: GOLD}),
  s02: Count(1000000, {pre: '৳', label: 'প্রথম ঈদের বিক্রি', sub: 'লাভ তিন লাখ', size: 170, color: GREEN, place: soft(House, 10, 'gold')}),
  s03: Pair(soft(House, 4), {look: RIPON, e: 'neutral'}, {look: FARUK, e: 'smile', g: 'open', talk: true}),
  s04: Pair(soft(House, 4), {look: RIPON, e: 'laugh', g: 'pointR', talk: true}, {look: FARUK, e: 'worried'}),
  s05: Solo(soft(House, 4, 'dusk'), {look: RIPON, e: 'serious'}, {title: 'ফারুক সরে যায়', color: GOLD}),
  s06: R({place: soft(House, 4, 'gold'), actors: [mid(RIPON, 'laugh', 'thumbsUp')], over: sticker('ধার করে তিনগুণ মাল', {x: 150, y: 420, w: 780, bg: '#7a1f3a', size: 70})}),
  s07: R({place: soft(Dark, 8, 'night'), over: () => (
    <>
      {popIn(<PageCard name="পাঞ্জাবি হাট" followers="৮০,০০০" w={440} />, 60, 440, 2)()}
      {popIn(<PageCard name="ঈদ কালেকশন" followers="১,২০,০০০" w={440} />, 580, 620, 10)()}
      {popIn(<PageCard name="সস্তা পাঞ্জাবি" followers="৫০,০০০" w={440} />, 200, 940, 18)()}
    </>
  ), title: 'অর্ধেক দামে, দশ পেজে', color: RED}),
  s08: R({place: soft(Dark, 3, 'night'), actors: [mid(RIPON, 'sad')], over: pile, title: 'সাথে ব্যাংকের কিস্তি', color: RED}),
  s09: R({place: soft(<Rooftop />, 2, 'gold'), actors: [mid(FARUK, 'laugh', 'thumbsUp')], title: 'ফারুকের ছাদ ঢালাই শেষ', color: GREEN}),
  s10: Glass('একজন জয়টা ঘরে তুলেছে', {place: House, tone: 'gold', sub: 'আরেকজন জয়ের নেশায় জয়টাই হারিয়েছে', size: 80}),
  act: Glass('আগে লাভটা ঘরে তোলো', {place: House, color: '#bff2c8', sub: 'তারপর ঠান্ডা মাথায় পরের ধাপ'}),
  ...ending(47, soft(<Avenue />, 14), [<Cassette size={440} />, 'ক্যাসেটের দোকান বন্ধ'], [<Copier size={440} dead />, 'ফটোকপি ছাড়াই চলে'], 'শেষ নিয়মটা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="প্রথম ঈদে দশ লাখের বিক্রি" l2="দ্বিতীয় ঈদে সব শেষ!" bottom="থামতে না জানার দাম" term="48 Laws · Law 47" art={<div style={{position: 'absolute', left: 120, top: 1120}}><Panjabi size={360} /></div>} size={80} />
);
export const law47 = story('law47/', raw, SCENES, Thumb, {logo: 'bba2'});
