import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Count, MIDDLE, Pair, R, SIR, Solo, Two, Y1, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Banner, Campus, Glass, SchoolRoom, popIn, soft, sticker} from '../common/elegant';
import {SchoolGate} from '../common/elegant2';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const HEAD: ToonLook = {...SIR, tie: '#7a1f3a'};
const TEACHER: ToonLook = {...MIDDLE, kurta: false, top: '#d6e2ea', bottom: '#2a2c30', glasses: true};
const STUDENT: ToonLook = {...Y1, top: '#f2efe6', jacket: '#14305f', age: 0};
const Class = <SchoolRoom />;
const kids = (e: 'neutral' | 'sad' = 'neutral') => crowd([140, 400, 680, 940], {h: 760, y: 1900, e});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(<SchoolRoom board="প্রতি জিপিএ ফাইভে ৫,০০০ টাকা" />, 0), actors: [at(HEAD, 'smile', 'pointUp', 540, 1000)]}),
  h2: Two(Count(36, {from: 12, label: 'জিপিএ ফাইভ', size: 240, color: GREEN, place: soft(Class, 10, 'gold')}), R({place: soft(<Campus />, 6, 'cool'), actors: kids('sad'), title: 'কলেজে অর্ধেক ফেল', color: RED}), 0.5),
  s01: Count(12, {post: 'টা', label: 'গত বছর জিপিএ ফাইভ', size: 240, color: GOLD, place: soft(Class, 10)}),
  s02: Solo(soft(Class, 3), {look: HEAD, e: 'smile', g: 'explain'}, {title: 'স্কুলের নাম চাই', color: GOLD}),
  s03: R({place: soft(<SchoolRoom lines={['সম্ভাব্য প্রশ্ন', 'এবার আসবেই']} />, 0), actors: [at(TEACHER, 'serious', 'explain', 540, 1000)]}),
  s04: R({place: soft(<SchoolRoom board="মুখস্থ, মুখস্থ, মুখস্থ" />, 0), actors: kids()}),
  s05: Pair(soft(Class, 4), {look: STUDENT, e: 'thinking'}, {look: TEACHER, e: 'skeptical', g: 'shrug', talk: true}),
  s06: R({place: soft(<SchoolGate mud={false} />, 3, 'gold'), over: popIn(<Banner text="জিপিএ ফাইভ: ৩৬" sub="অভিনন্দন" />, 110, 460)}),
  s07: R({place: soft(<Campus />, 4, 'cool'), actors: kids('sad'), title: 'এবার প্রশ্ন জানা নেই', color: RED}),
  s08: Glass('স্কুল বানিয়েছিল জিপিএ', {place: Class, tone: 'cool', sub: 'ছাত্র বানায়নি'}),
  act: Glass('সংখ্যার শর্টকাট আটকাও', {place: Class, color: '#bff2c8', sub: 'টার্গেট দেওয়ার আগে ভাবো'}),
  ...outro('Charles Goodhart', 'ব্রিটিশ অর্থনীতিবিদ', '১৯৭৫', 'আসল নিয়ম'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="জিপিএ ফাইভে শিক্ষকের বোনাস" l2="জিপিএ তিনগুণ, কলেজে ফেল!" bottom="সংখ্যাকে লক্ষ্য বানানোর বিপদ" term="Goodhart-এর নিয়ম" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('জিপিএ ফাইভ = ৫,০০০', {x: 0, y: 0, w: 600, bg: '#14532d', size: 70})()}</div>} size={78} />
);
export const b09 = story('b09/', raw, SCENES, Thumb, {logo: 'bba2'});
