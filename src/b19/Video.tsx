import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home, Taka} from '../common/places';
import {ShopFront} from '../common/places2';
import {Pair, R, Solo, Two, Y1, Y2, story} from '../common/reel';
import {HandPaper, crowd} from '../common/laws48';
import {Apartment, Glass, popIn, soft, sticker} from '../common/elegant';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const ASIF: ToonLook = {...Y2, top: '#c0602a'};
const NAYON: ToonLook = {...Y1, top: '#2a6a8a'};
const BROTHER: ToonLook = {...Y1, top: '#f2efe6', jacket: '#14305f', age: 0};
const Coaching = <ShopFront name="স্টার কোচিং" signBg="#7a1f3a" />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Two(Solo(soft(Coaching, 3), {look: ASIF, e: 'laugh', g: 'hold', hold: HandPaper}, {over: popIn(<Taka w={360} amount="২০০০" />, 360, 520)}), Solo(soft(Coaching, 3, 'cool'), {look: NAYON, e: 'neutral', g: 'hold', hold: HandPaper}, {over: popIn(<Taka w={300} amount="২০০" />, 390, 520)}), 0.5),
  h2: R({place: soft(Coaching, 3, 'gold'), actors: [at(NAYON, 'smile', 'pointR', 340, 1080, {lookX: 1}), at(BROTHER, 'smile', 'idle', 780, 760)], over: sticker('ছোট ভাইকেও ভর্তি', {x: 150, y: 520, w: 780, bg: '#14532d', size: 70})}),
  s01: R({place: soft(Coaching, 4, 'cool'), actors: crowd([200, 880], {h: 860, y: 1900, e: 'skeptical'}), title: 'ক্লাস এলোমেলো', color: RED}),
  s02: Pair(soft(<Apartment />, 3), {look: ASIF, e: 'smile', g: 'hold', hold: HandPaper}, {look: NAYON, e: 'smile', g: 'hold', hold: HandPaper}, {title: 'দুই হাজার বনাম দুইশো', color: GOLD}),
  s03: Solo(soft(<Apartment />, 4), {look: NAYON, e: 'smile', g: 'explain', talk: true}),
  s04: Solo(soft(<Home />, 4), {look: ASIF, e: 'laugh', g: 'shrug', talk: true}),
  s05: Solo(soft(<Home dim />, 4, 'night'), {look: NAYON, e: 'thinking', g: 'think'}, {title: 'দুইশো টাকার মিথ্যা?', color: RED}),
  s06: Glass('কোচিংটা আসলে খারাপ না', {place: <Home dim />, tone: 'night', sub: 'নিজেকে বোঝানো শুরু'}),
  s07: R({place: soft(Coaching, 2, 'gold'), actors: [at(NAYON, 'smile', 'pointR', 340, 1080, {lookX: 1}), at(BROTHER, 'smile', 'idle', 780, 760)], title: 'নিজেই নিয়ে যায়', color: GOLD}),
  s08: Glass('কারণ না থাকলে', {place: Coaching, tone: 'gold', sub: 'মিথ্যাটাকেই সত্যি বানাতে হয়'}),
  act: Glass('মত হঠাৎ বদলালে প্রশ্ন করো', {place: <Home />, color: '#bff2c8', sub: 'সত্যি, নাকি নিজেকে বোঝানো?'}),
  ...outro('Leon Festinger ও James Carlsmith', 'Stanford University', '১৯৫৯'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দুইশো টাকায় বাজে কোচিংয়ের প্রচার" l2="নিজের ভাইকেই ভর্তি করাল!" bottom="নিজের মিথ্যা বিশ্বাস করার ফাঁদ" term="এক ডলারের পরীক্ষা" art={<div style={{position: 'absolute', left: 80, top: 1160}}><Taka w={380} amount="২০০" /></div>} size={76} />
);
export const b19 = story('b19/', raw, SCENES, Thumb, {logo: 'bba2'});
