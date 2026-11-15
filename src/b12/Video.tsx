import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home, TeaCup} from '../common/places';
import {MIDDLE, Pair, R, Solo, WOMAN, Y2, story} from '../common/reel';
import {HandBox} from '../common/laws48';
import {Apartment, Glass, popIn, soft, sticker} from '../common/elegant';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MITU: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#c0602a', skirt: '#c0602a', bottom: '#c0602a'};
const SHAFIQ: ToonLook = {...MIDDLE, kurta: false, top: '#2a5a8a', bottom: '#2a2c30'};
const LIPI: ToonLook = {...WOMAN, hairStyle: 'long', top: '#6a2a5a', skirt: '#6a2a5a', bottom: '#6a2a5a'};
const JAHID: ToonLook = {...Y2, top: '#5a6a5a'};
const House = <Home />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(soft(House, 3), {look: MITU, e: 'serious', g: 'pointR', talk: true}, {look: SHAFIQ, e: 'serious', g: 'pointL', talk: true}, {title: 'রোজ জোরে ঝগড়া', color: GOLD}),
  h2: Pair(soft(House, 4, 'cool'), {look: LIPI, e: 'neutral'}, {look: JAHID, e: 'neutral'}, {title: 'শান্ত জুটি ভাঙে', color: RED}),
  s01: Pair(soft(House, 4), {look: MITU, e: 'serious', g: 'explain', talk: true}, {look: SHAFIQ, e: 'skeptical', g: 'shrug'}, {title: 'বাজার, আত্মীয়, রিমোট', color: GOLD}),
  s02: Pair(soft(House, 3, 'gold'), {look: MITU, e: 'laugh'}, {look: SHAFIQ, e: 'smile', g: 'open'}, {over: popIn(<TeaCup size={240} />, 420, 420), title: 'রাগ পড়লে এক কাপ চা', color: GREEN}),
  s03: Pair(soft(<Apartment />, 3), {look: LIPI, e: 'smile'}, {look: JAHID, e: 'smile'}, {title: 'আদর্শ জুটি', color: GOLD}),
  s04: R({place: soft(House, 4, 'cool'), actors: [at(LIPI, 'skeptical', 'idle', 540, 1300)], title: 'চোখ ঘোরানো', color: RED}),
  s05: Pair(soft(House, 4, 'cool'), {look: LIPI, e: 'skeptical', g: 'shrug', talk: true}, {look: JAHID, e: 'sad'}),
  s06: Solo(soft(House, 4, 'night'), {look: JAHID, e: 'sad'}, {title: 'প্রতিবার একটু বেশি চুপ', color: RED}),
  s07: R({place: soft(<Home dim />, 4, 'night'), actors: [at(JAHID, 'sad', 'hold', 540, 1100, {holding: HandBox})], title: 'পাঁচ বছর পর', color: RED}),
  s08: Pair(soft(House, 3, 'gold'), {look: MITU, e: 'laugh', g: 'pointR'}, {look: SHAFIQ, e: 'laugh'}, {title: 'ঝগড়া আছে, সংসারও', color: GREEN}),
  s09: Glass('ঝগড়া সংসার ভাঙে না', {place: House, tone: 'night', sub: 'ভাঙে চোখ ঘোরানো তাচ্ছিল্য'}),
  act: Glass('রাগ করো, ঝগড়াও করো', {place: House, color: '#bff2c8', sub: 'কিন্তু ছোট করো না কখনো'}),
  ...outro('John Gottman', 'University of Washington', 'কয়েক দশক'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="রোজ ঝগড়া করা জুটি টিকে গেল" l2="শান্ত জুটির সংসার ভাঙল!" bottom="একটা চোখ ঘোরানোয় সব শেষ" term="সম্পর্কের গবেষণা" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('তুমি আর কী বুঝবে', {x: 0, y: 0, w: 580, bg: '#7a1f3a', size: 72})()}</div>} size={78} />
);
export const b12 = story('b12/', raw, SCENES, Thumb, {logo: 'bba2'});
