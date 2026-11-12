import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {Aisle, Village} from '../common/places2';
import {Cta, ELDER, MIDDLE, Pair, R, Solo, Two, Y1, Y2, lawBook, story} from '../common/reel';
import {Next, NextBadge, crowd} from '../common/laws48';
import {Glass, Plots, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const KAMAL: ToonLook = {...MIDDLE, top: '#f2efe6'};
const JAMAL: ToonLook = {...Y2, hairStyle: 'side', top: '#7a3a4a', mustache: true};
const BABU: ToonLook = {...Y1, top: '#2a7a6a'};
const Vil = <Village />;
const House = <Home />;
const three = (e: 'serious' | 'neutral' = 'serious') => [
  {look: KAMAL, x: 200, h: 1000, y: 1880, expression: e, gesture: 'idle' as const, lookX: 1},
  {look: BABU, x: 540, h: 960, y: 1880, expression: 'neutral' as const, gesture: 'idle' as const},
  {look: JAMAL, x: 880, h: 1000, y: 1880, expression: e, gesture: 'idle' as const, lookX: -1},
];

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(<Plots />, 0), title: 'বাবার জমি, দুই ভাইয়ের লড়াই', color: GOLD}),
  h2: R({place: soft(<Plots mark />, 0, 'gold'), title: 'দামি জমি ছোট ভাইয়ের', color: GREEN}),
  s01: R({place: soft(Vil, 2), actors: three('neutral'), title: 'তিন ভাই', color: GOLD}),
  s02: Pair(soft(Vil, 3), {look: KAMAL, e: 'serious', g: 'pointR'}, {look: JAMAL, e: 'skeptical', g: 'pointL'}, {title: 'মুখ দেখাদেখি বন্ধ', color: RED}),
  s03: R({place: soft(Vil, 3), actors: three(), title: 'দুজনেই বাবুকে চায়', color: GOLD}),
  s04: Pair(soft(House, 4), {look: KAMAL, e: 'serious', g: 'explain', talk: true}, {look: BABU, e: 'neutral'}),
  s05: Solo(soft(House, 3), {look: BABU, e: 'surprised'}, {over: sticker('ঈদের উপহার: নতুন ফ্রিজ', {x: 90, y: 560, w: 900, bg: '#14305f', size: 68}), x: 540}),
  s06: Solo(soft(House, 4), {look: BABU, e: 'neutral', g: 'shrug'}, {title: 'শোনে, মাথা নাড়ে', color: GOLD}),
  s07: R({place: soft(Vil, 5, 'dusk'), actors: crowd([150, 400, 680, 930], {h: 860, y: 1900, e: 'serious', from: 4}).map((a, i) => (i === 1 ? {...a, look: ELDER} : a)), title: 'সালিশে শেষ কথা বাবুর', color: GOLD}),
  s08: Two(Pair(soft(House, 5, 'night'), {look: KAMAL, e: 'smile', g: 'open', talk: true}, {look: BABU, e: 'neutral'}, {title: 'রাতে: কামাল', color: GOLD}), Pair(soft(House, 5, 'night'), {look: JAMAL, e: 'smile', g: 'open', talk: true}, {look: BABU, e: 'neutral'}, {title: 'তারপর: জামাল', color: GOLD}), 0.5),
  s09: R({place: soft(<Plots mark />, 0, 'gold'), title: 'দুজনের প্রস্তাব এক', color: GOLD}),
  s10: R({place: soft(Vil, 4, 'dusk'), actors: [{look: BABU, x: 540, h: 1040, y: 1880, expression: 'serious', gesture: 'explain', talking: true}], title: 'রাস্তার পাশেরটা আমার', color: GREEN}),
  s11: Pair(soft(Vil, 4, 'dusk'), {look: KAMAL, e: 'shocked'}, {look: JAMAL, e: 'shocked'}, {title: 'নিজের মুখেই দিয়েছিল', color: RED}),
  s12: Glass('লড়ে দুই ভাই, জমি পায় যে লড়েনি', {place: <Plots />, tone: 'gold', size: 92}),
  book: lawBook(20),
  lesson: R({bg: 'plain'}),
  act: Glass('দুজনের লড়াইয়ে তাড়াহুড়ো করে পক্ষ নিও না', {place: Vil, color: '#bff2c8', size: 80}),
  next: Next(21, tag('পাইকারি বাজার', {w: 560, bg: '#14532d', size: 84}), {title: 'কিছুই বোঝেন না, এমন ভান', place: soft(<Aisle />, 14)}),
  next2: Next(21, tag('কে কত লাভ রাখে?', {w: 620, bg: '#7a1f3a', size: 80}), {title: 'দোকানদাররাই বলে দেয়', place: soft(<Aisle />, 14)}),
  next3: Next(21, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'বোকা সাজার ক্ষমতা', place: soft(<Aisle />, 14)}),
  cta: () => (
    <Cta>
      <NextBadge law={21} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="বাবার জমি নিয়ে দুই ভাইয়ের লড়াই" l2="দামি জমিটা পেল ছোট ভাই!" bottom="যে কোনো পক্ষ নেয়নি" term="48 Laws · Law 20" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('রাস্তার পাশের ৫ কাঠা', {x: 0, y: 0, w: 560, bg: '#14305f', size: 70})()}</div>} size={78} />
);
export const law20 = story('law20/', raw, SCENES, Thumb, {logo: 'bba2'});
