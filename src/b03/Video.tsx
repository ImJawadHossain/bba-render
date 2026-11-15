import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {Count, MOM, Pair, R, Solo, WOMAN, Y1, Y3, story} from '../common/reel';
import {Glass, SchoolRoom, popIn, soft, sticker} from '../common/elegant';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const TANIM: ToonLook = {...Y1, top: '#2a5a8a', age: 0};
const SAKIB: ToonLook = {...Y3, top: '#2a7a4a', age: 0};
const MOM2: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#8a5a2a', skirt: '#8a5a2a', bottom: '#8a5a2a', age: 0.4};
const House = <Home />;
const Class = <SchoolRoom />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(House, 3), actors: [at(MOM, 'laugh', 'pointR', 290, 1060, {lookX: 1}), at(TANIM, 'smile', 'idle', 790, 960, {lookX: -1})], over: sticker('তুই জিনিয়াস!', {x: 240, y: 420, w: 600, bg: '#14532d', size: 84})}),
  s01: Pair(soft(Class, 2), {look: TANIM, e: 'smile'}, {look: SAKIB, e: 'smile'}, {title: 'দুই ভালো ছাত্র', color: GOLD}),
  s02: Pair(soft(House, 3), {look: MOM, e: 'laugh', g: 'explain', talk: true}, {look: TANIM, e: 'smile'}),
  s03: Pair(soft(House, 3, 'gold'), {look: SAKIB, e: 'smile'}, {look: MOM2, e: 'smile', g: 'open', talk: true}),
  s04: R({place: soft(<SchoolRoom board="ক্লাস এইট: নতুন অংক" />, 0, 'cool')}),
  s05: Solo(soft(Class, 3), {look: SAKIB, e: 'thinking', g: 'think'}, {title: 'ভুল, আবার চেষ্টা', color: GREEN}),
  s06: Solo(soft(Class, 3, 'cool'), {look: TANIM, e: 'worried'}, {title: 'কঠিন অংক এড়ায়', color: RED}),
  s07: R({place: soft(<Home dim />, 8, 'night'), over: popIn(<Paper title="রিপোর্ট কার্ড" lines={['অংক: ৪২', 'কলমে বদলে: ৭২']} size={56} w={640} />, 220, 480), title: 'চারকে বানায় সাত', color: RED}),
  s08: Glass('জিনিয়াস তকমা হারানোর ভয়', {place: <Home dim />, tone: 'night', sub: 'ফেল করার চেয়েও বড়'}),
  s09: Count(78, {from: 51, label: 'সাকিব: একান্ন থেকে', size: 240, color: GREEN, place: soft(Class, 10, 'gold')}),
  s10: Glass('একজনকে বলা হয়েছিল সে কী', {place: Class, tone: 'gold', sub: 'আরেকজনকে, সে কী করেছে'}),
  act: Glass('"তুই জিনিয়াস" নয়', {place: House, color: '#bff2c8', sub: 'বলো, "তুই লেগে ছিলি"'}),
  ...outro('Claudia Mueller ও Carol Dweck', 'Columbia University', '১৯৯৮'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="মা বলতেন 'তুই জিনিয়াস'" l2="ছেলে রিপোর্ট কার্ড বদলে ফেলল!" bottom="ভুল প্রশংসার দাম" term="প্রশংসার পরীক্ষা" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('৪২ → ৭২', {x: 0, y: 0, w: 480, bg: '#7a1f3a', size: 96})()}</div>} size={80} />
);
export const b03 = story('b03/', raw, SCENES, Thumb, {logo: 'bba2'});
