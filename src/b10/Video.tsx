import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Taka} from '../common/places';
import {MessRoom} from '../common/places2';
import {Pair, R, Solo, Y1, Y3, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, popIn, soft} from '../common/elegant';
import {Fridge, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const SAJIB: ToonLook = {...Y1, top: '#3a5aa0'};
const HASAN: ToonLook = {...Y3, top: '#c07a1a'};
const Mess = <MessRoom />;
const cash = popIn(<Taka w={440} amount="১০০০" />, 320, 560);
const fridge = popIn(<Fridge size={420} empty />, 330, 440);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Mess, 5), over: cash, title: 'তিন দিন, কেউ ছোঁয় না', color: GREEN}),
  h2: R({place: soft(Mess, 6, 'night'), over: fridge, title: 'ডিম এক রাতও না', color: RED}),
  s01: R({place: soft(Mess, 2), actors: crowd([200, 540, 880], {h: 960, y: 1890, from: 1}), title: 'ছয়জনের মেস', color: GOLD}),
  s02: Solo(soft(Mess, 3), {look: SAJIB, e: 'neutral', g: 'open'}, {title: 'টেবিলে হাজার টাকা', color: GOLD}),
  s03: R({place: soft(Mess, 6, 'gold'), over: cash, title: 'একটা নোটও কম না', color: GREEN}),
  s04: Solo(soft(Mess, 3, 'gold'), {look: SAJIB, e: 'laugh', g: 'thumbsUp'}, {title: 'সবাই সৎ!', color: GREEN}),
  s05: R({place: soft(Mess, 6, 'night'), over: fridge, title: 'বারোটা ডিম নেই', color: RED}),
  s06: Pair(soft(Mess, 4), {look: SAJIB, e: 'shocked', g: 'open', talk: true}, {look: HASAN, e: 'skeptical'}),
  s07: Pair(soft(Mess, 4), {look: SAJIB, e: 'surprised'}, {look: HASAN, e: 'laugh', g: 'shrug', talk: true}),
  s08: Glass('হাজার টাকা নিলে চুরি', {place: Mess, tone: 'night', sub: 'ডিম খেলে শুধু খাওয়া'}),
  act: Glass('জিনিসের হিসাবও টাকার মতো', {place: Mess, color: '#bff2c8', sub: 'নেওয়ার আগে দামটা মনে মনে বলো'}),
  ...outro('Dan Ariely', 'MIT, ছাত্রাবাসের ফ্রিজ', '২০০৮'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="হাজার টাকা তিন দিন পড়ে থাকে" l2="ডিম এক রাতও টেকে না!" bottom="সৎ মানুষের অদ্ভুত হিসাব" term="সততার পরীক্ষা" art={<div style={{position: 'absolute', left: 120, top: 1080}}><Fridge size={360} empty /></div>} size={78} />
);
export const b10 = story('b10/', raw, SCENES, Thumb, {logo: 'bba2'});
