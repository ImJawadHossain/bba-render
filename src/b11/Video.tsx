import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall} from '../common/places';
import {Fair} from '../common/places2';
import {ELDER, MIDDLE, R, Solo, story} from '../common/reel';
import {HandBox, Rasgolla, crowd} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RUBEL_DAD: ToonLook = {...ELDER, top: '#f2efe6'};
const SUMON_DAD: ToonLook = {...MIDDLE, top: '#e8d6b0'};
const Hall = <Fair />;
const guests = (e: 'laugh' | 'serious' | 'smile' = 'laugh', from = 0) => crowd([140, 400, 680, 940], {h: 860, y: 1900, e, from});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Hall, 3, 'gold'), actors: guests('laugh'), over: sticker('কাচ্চি, রোস্ট, রেজালা', {x: 150, y: 420, w: 780, bg: '#14532d', size: 70})}),
  h2: R({place: soft(Hall, 6, 'night'), over: sticker('শেষের পাঁচ মিনিট', {x: 190, y: 600, w: 700, bg: '#7a1f3a', size: 80}), title: 'তবু বদনাম', color: RED}),
  s01: R({place: soft(Hall, 3, 'gold'), actors: guests('laugh', 2), title: 'খাবার অসাধারণ', color: GREEN}),
  s02: R({place: soft(Hall, 5, 'cool'), actors: guests('serious', 1), title: 'দই শেষ, মিষ্টি কম', color: RED}),
  s03: R({place: soft(Hall, 5, 'night'), actors: guests('serious', 3), title: 'গেটে আধা ঘণ্টা আটকে', color: RED}),
  s04: Solo(soft(<ChaiStall />, 4), {look: RUBEL_DAD, e: 'skeptical', g: 'explain', talk: true}),
  s05: R({place: soft(Hall, 3), actors: guests('smile', 4), title: 'সুমনের সাধারণ বিয়ে', color: GOLD}),
  s06: R({place: soft(Hall, 3, 'gold'), actors: [at(SUMON_DAD, 'smile', 'hold', 540, 1100, {holding: HandBox})], over: popIn(<Rasgolla size={300} />, 380, 440), title: 'বিদায়ে মিষ্টির প্যাকেট', color: GREEN}),
  s07: Solo(soft(Hall, 3, 'gold'), {look: SUMON_DAD, e: 'laugh', g: 'open', talk: true}),
  s08: R({place: soft(<ChaiStall />, 3, 'gold'), actors: crowd([170, 540, 910], {h: 900, y: 1900, e: 'laugh'}), title: 'মাসজুড়ে প্রশংসা', color: GREEN}),
  s09: Glass('সাতশো প্লেট কাচ্চি হেরেছে', {place: Hall, tone: 'gold', sub: 'একটা মিষ্টির প্যাকেটের কাছে'}),
  act: Glass('বিদায়ের মুহূর্তে সবচেয়ে বেশি যত্ন', {place: Hall, color: '#bff2c8', sub: 'মানুষ মনে রাখে শেষটা', size: 80}),
  ...outro('Daniel Kahneman', 'বরফ-পানির পরীক্ষা', '১৯৯৩'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="সাতশো মেহমানকে কাচ্চি" l2="তবু বিয়ের পর বদনাম!" bottom="কারণ শেষের পাঁচ মিনিট" term="শেষটাই মনে থাকে" art={<div style={{position: 'absolute', left: 120, top: 1120}}><Rasgolla size={360} /></div>} size={84} />
);
export const b11 = story('b11/', raw, SCENES, Thumb, {logo: 'bba2'});
