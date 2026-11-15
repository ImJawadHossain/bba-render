import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Avenue} from '../common/places';
import {ELDER, Pair, R, SIR, Solo, Y1, story} from '../common/reel';
import {Glass, soft, sticker} from '../common/elegant';
import {BusStand, Room} from '../common/elegant2';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const ZUBAIR: ToonLook = {...Y1, top: '#f2efe6', jacket: '#2a3a5a'};
const OLDMAN: ToonLook = {...ELDER, top: '#8a8a7a', glasses: false};
const Street = <Avenue />;
const Office = <Room paint="linear-gradient(180deg, #d6dce2, #aab4be)" />;
const fallen = at(OLDMAN, 'sad', 'idle', 760, 760, {lookX: -1});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Street, 4, 'dusk'), actors: [at(ZUBAIR, 'worried', 'idle', 300, 1080, {lookX: 1}), fallen], title: 'দেখেও থামে না', color: RED}),
  s01: Solo(soft(Street, 3, 'gold'), {look: ZUBAIR, e: 'smile', g: 'thumbsUp'}, {title: 'রক্ত দেয়, ত্রাণ নেয়', color: GREEN}),
  s02: R({place: soft(Office, 4), actors: [at(ZUBAIR, 'smile')], over: sticker('বিষয়: অসহায়ের পাশে', {x: 150, y: 420, w: 780, bg: '#14305f', size: 66})}),
  s03: R({place: soft(<BusStand />, 4), actors: [at(ZUBAIR, 'worried', 'idle')], over: sticker('হাতে দশ মিনিট', {x: 240, y: 420, w: 600, bg: '#7a1f3a', size: 76})}),
  s04: R({place: soft(Street, 4, 'dusk'), actors: [at(OLDMAN, 'sad', 'idle', 540, 820)], title: 'গলির মুখে পড়ে আছেন', color: RED}),
  s05: R({place: soft(Street, 5, 'dusk'), actors: [at(ZUBAIR, 'worried', 'idle', 300, 1080, {lookX: 1}), fallen], title: 'এক মুহূর্ত, তারপর দৌড়', color: RED}),
  s06: R({place: soft(Office, 3), actors: [at(SIR, 'serious', 'explain', 540, 1080)], title: 'বিপদে দেখলে কী করবেন?', color: GOLD}),
  s07: Pair(soft(Office, 4), {look: ZUBAIR, e: 'smile', g: 'open', talk: true}, {look: SIR, e: 'smile'}),
  s08: Solo(soft(Office, 4, 'cool'), {look: ZUBAIR, e: 'neutral'}, {title: 'সে মিথ্যা বলছে না', color: GOLD}),
  s09: Glass('জুবায়ের খারাপ মানুষ না', {place: Street, tone: 'dusk', sub: 'তাড়া তাকে অন্ধ করেছিল'}),
  act: Glass('দিনটা এত ঠাসা কোরো না', {place: Street, color: '#bff2c8', sub: 'পাশের মানুষের জন্য এক মিনিট রাখো'}),
  ...outro('John Darley ও Daniel Batson', 'Princeton University', '১৯৭৩'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="মানবসেবার ইন্টারভিউতে যাচ্ছিল" l2="পথে পড়ে থাকা মানুষকে পেরিয়ে গেল!" bottom="তাড়ায় দয়া মরে" term="সময়ের পরীক্ষা" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('হাতে দশ মিনিট', {x: 0, y: 0, w: 540, bg: '#7a1f3a', size: 80})()}</div>} size={76} />
);
export const b18 = story('b18/', raw, SCENES, Thumb, {logo: 'bba2'});
