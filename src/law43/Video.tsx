import React from 'react';
import {GOLD, GREEN} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Home, SareeShop} from '../common/places';
import {TShirt} from '../common/places2';
import {Count, MIDDLE, MOM, Pair, R, WOMAN, story} from '../common/reel';
import {HandPaper, Kitchen} from '../common/laws48';
import {Apartment, Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {Car, Lane, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const RASHEDA: ToonLook = {...MOM, top: '#8a5a3a', skirt: '#6a4a2a', age: 0.55};
const SHIRIN: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#2a6a8a', skirt: '#2a6a8a', bottom: '#2a6a8a', age: 0.35};
const CHOWDHURY: ToonLook = {...WOMAN, hairStyle: 'bob', top: '#7a1f3a', skirt: '#7a1f3a', bottom: '#7a1f3a', glasses: true, age: 0.5};
const GUARD: ToonLook = {...MIDDLE, kurta: false, top: '#3a5a3a', bottom: '#2a2c30'};
const HELPER: ToonLook = {...MOM, top: '#5a5f6e', skirt: '#3a3e48'};
const House = <Home />;
const mid = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle', holding?: React.ReactNode) => ({look, x: 540, h: 1100, y: 1880, expression, gesture, holding});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(<Kitchen />, 3), actors: [mid(RASHEDA, 'serious')], over: sticker('পাঁচ হাজার বেশি? না।', {x: 150, y: 420, w: 780, bg: '#7a1f3a', size: 70})}),
  h2: R({place: soft(House, 3, 'gold'), actors: [mid(RASHEDA, 'smile')], over: sticker('পনেরো বছর', {x: 240, y: 420, w: 600, bg: '#14532d', size: 84})}),
  s01: Pair(soft(House, 3), {look: SHIRIN, e: 'smile'}, {look: RASHEDA, e: 'smile'}, {title: 'বেতন আট হাজার', color: GOLD}),
  s02: R({place: soft(<Apartment />, 3), actors: [mid(GUARD, 'neutral', 'hold', HandPaper)], title: 'পাশের ফ্ল্যাটের খবর', color: GOLD}),
  s03: Pair(soft(<Apartment />, 4), {look: GUARD, e: 'neutral'}, {look: CHOWDHURY, e: 'serious', g: 'pointL', talk: true}),
  s04: Count(13000, {pre: '৳', label: 'পাঁচ হাজার বেশি', sub: 'তবু খালা যান না', size: 200, color: GOLD, place: soft(<Apartment />, 10)}),
  s05: R({place: soft(House, 8, 'gold'), over: popIn(<Paper title="খালার ছেলের পরীক্ষা" lines={['বারো তারিখ: অংক', 'পনেরো তারিখ: ইংরেজি']} size={50} w={700} />, 190, 480), title: 'তারিখ মনে রাখেন', color: GOLD}),
  s06: Pair(soft(<Kitchen />, 3, 'gold'), {look: SHIRIN, e: 'laugh'}, {look: RASHEDA, e: 'laugh'}, {title: 'একই টেবিল, একই তরকারি', color: GREEN}),
  s07: R({place: soft(<SareeShop />, 4, 'gold'), over: () => (
    <>
      {popIn(<TShirt size={340} color="#d94a6a" />, 140, 640)()}
      {popIn(<TShirt size={340} color="#d94a6a" />, 600, 640, 8)()}
    </>
  ), title: 'ঈদে একই জামা', color: GREEN}),
  s08: R({place: soft(<Kitchen dim />, 4, 'cool'), actors: [mid(HELPER, 'sad')], over: sticker('পাঁচ বছরে সাতজন', {x: 190, y: 420, w: 700, bg: '#7a1f3a', size: 76})}),
  s09: R({place: soft(House, 3, 'gold'), actors: [mid(RASHEDA, 'smile', 'thumbsUp')], title: 'একদিনও কামাই নেই', color: GREEN}),
  s10: Glass('একজন কিনতে চেয়েছেন সময়', {place: House, tone: 'gold', sub: 'আরেকজন জিতেছেন মন'}),
  act: Glass('একটা ছোট জিনিস মনে রাখো', {place: House, color: '#bff2c8', sub: 'ঠিক সময়ে সেটা দেখাও'}),
  ...ending(43, soft(<Lane car="left" />, 14), [<Car size={500} />, 'গেটের সামনে গাড়ি'], [tag('একটাও কথা না বলে', {bg: '#14532d'}), 'এক সকালে সমাধান'], 'আয়নার কৌশল'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="বেশি বেতন ফিরিয়ে দিলেন খালা" l2="কম বেতনে থাকলেন পনেরো বছর!" bottom="টাকার চেয়ে বড় একটা জিনিস" term="48 Laws · Law 43" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('+৫,০০০? না।', {x: 0, y: 0, w: 520, bg: '#7a1f3a', size: 84})()}</div>} size={78} />
);
export const law43 = story('law43/', raw, SCENES, Thumb, {logo: 'bba2'});
