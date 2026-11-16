import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Avenue} from '../common/places';
import {Bike, Village} from '../common/places2';
import {ELDER, MIDDLE, Pair, R, Two, Y1, Y3, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MONIR: ToonLook = {...Y1, top: '#2a6a8a'};
const BABLU: ToonLook = {...Y3, top: '#8a6a2a'};
const CHACHA1: ToonLook = {...ELDER, top: '#e8e2d2'};
const CHACHA2: ToonLook = {...MIDDLE, top: '#d6e2c8'};
const Street = <Avenue />;
const Salish = <Village evening />;
const bike = popIn(<Bike size={560} />, 260, 1230);
const word = (t: string, bg: string) => sticker(t, {x: 240, y: 440, w: 600, bg, size: 90});

const SCENES: Record<string, React.FC<SP>> = {
  h1: Two(R({place: soft(Salish, 6, 'dusk'), over: word('ধাক্কা মারে', '#7a1f3a')}), R({place: soft(Salish, 6, 'dusk'), over: word('ছুঁয়ে যায়', '#14305f')}), 0.5),
  h2: R({place: soft(Street, 6, 'night'), over: sticker('কাচ ভাঙেইনি', {x: 190, y: 600, w: 700, bg: '#7a1f3a', size: 84})}),
  s01: R({place: soft(Street, 3), over: bike, title: 'কেউ আহত না', color: GOLD}),
  s02: R({place: soft(Salish, 3, 'dusk'), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900, e: 'serious'}), title: 'সন্ধ্যায় সালিশ', color: GOLD}),
  s03: Pair(soft(Salish, 4, 'dusk'), {look: MONIR, e: 'neutral'}, {look: CHACHA1, e: 'serious', g: 'pointL', talk: true}),
  s04: Pair(soft(Salish, 4, 'dusk'), {look: MONIR, e: 'shocked', g: 'open', talk: true}, {look: CHACHA1, e: 'serious'}),
  s05: Pair(soft(Salish, 4, 'dusk'), {look: BABLU, e: 'neutral'}, {look: CHACHA2, e: 'smile', g: 'pointL'}, {over: word('ছুঁয়ে যায়', '#14305f')}),
  s06: Pair(soft(Salish, 4, 'dusk'), {look: BABLU, e: 'neutral', g: 'shrug', talk: true}, {look: CHACHA2, e: 'smile'}),
  s07: R({place: soft(Salish, 8, 'dusk'), over: sticker('লাইটের কাচ কি ভেঙেছিল?', {x: 110, y: 560, w: 860, bg: '#14305f', size: 70})}),
  s08: Two(R({place: soft(Salish, 4, 'dusk'), actors: [{look: MONIR, x: 540, h: 1100, y: 1880, expression: 'serious' as const, gesture: 'explain' as const}], title: 'মনির: হ্যাঁ, ভেঙেছিল', color: RED}), R({place: soft(Salish, 4, 'dusk'), actors: [{look: BABLU, x: 540, h: 1100, y: 1880, expression: 'neutral' as const, gesture: 'shrug' as const}], title: 'বাবলু: না', color: GREEN}), 0.5),
  s09: Glass('লাইট আস্ত আছে', {place: Street, tone: 'night', sub: 'একটা শব্দ স্মৃতিতে কাচ ভেঙেছে'}),
  act: Glass('শব্দ বেছে প্রশ্ন কোরো না', {place: Salish, color: '#bff2c8', sub: 'বলো, কী দেখেছিলেন, নিজের মতো বলেন'}),
  ...outro('Elizabeth Loftus ও John Palmer', 'University of Washington', '১৯৭৪'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই দুর্ঘটনা, দুই সাক্ষী" l2="একজন দেখল ভাঙা কাচ, যা ভাঙেইনি!" bottom="একটা শব্দে বদলানো স্মৃতি" term="স্মৃতির পরীক্ষা" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('ধাক্কা না ছোঁয়া?', {x: 0, y: 0, w: 560, bg: '#7a1f3a', size: 78})()}</div>} size={76} />
);
export const b27 = story('b27/', raw, SCENES, Thumb, {logo: 'bba2'});
