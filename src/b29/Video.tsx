import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Village} from '../common/places2';
import {Pair, R, Two, Y1, Y3, story} from '../common/reel';
import {HandPaper, crowd} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {Cricket} from '../common/elegant2';
import {Transformer, at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RASEL: ToonLook = {...Y1, top: '#c0304a'};
const SOHEL: ToonLook = {...Y3, top: '#2a5a8a'};
const Day = <Village />;
const Night = <Village evening />;
const north = (e: 'serious' | 'laugh' = 'serious') => crowd([110, 300], {h: 860, y: 1900, e});
const south = (e: 'serious' | 'laugh' = 'serious') => crowd([780, 970], {h: 860, y: 1900, e, from: 3});
const pole = (burnt = false) => popIn(<Transformer size={300} burnt={burnt} />, 390, 420);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Day, 4, 'cool'), actors: [...north(), ...south()], title: 'তিন বছরের মারামারি', color: RED}),
  h2: R({place: soft(Night, 4, 'night'), over: pole(true), title: 'থামাল একটা ট্রান্সফরমার', color: GOLD}),
  s01: R({place: soft(<Cricket />, 3), actors: [...north(), ...south()], title: 'এক মাঠ, দুই পাড়া', color: GOLD}),
  s02: R({place: soft(<Cricket />, 5, 'dusk'), actors: [...north(), ...south()].map((a, i) => ({...a, gesture: (i < 2 ? 'pointR' : 'pointL') as 'pointR' | 'pointL'})), title: 'ম্যাচ থেকে মারামারি', color: RED}),
  s03: R({place: soft(Day, 5), actors: [...north(), ...south()], title: 'বৈঠকেও ঝগড়া', color: RED}),
  s04: R({place: soft(Night, 4, 'night'), over: pole(true), title: 'ঝড়ে পুড়ে গেল', color: RED}),
  s05: R({place: soft(Night, 8, 'night'), over: sticker('একসাথে আবেদন লাগবে', {x: 150, y: 600, w: 780, bg: '#14305f', size: 70}), title: 'তিন সপ্তাহ অন্ধকার?', color: GOLD}),
  s06: Pair(soft(Night, 3, 'night'), {look: RASEL, e: 'neutral'}, {look: SOHEL, e: 'skeptical'}, {title: 'তিন বছর পর প্রথম কথা', color: GOLD}),
  s07: Pair(soft(Night, 4, 'night'), {look: RASEL, e: 'serious', g: 'open', talk: true}, {look: SOHEL, e: 'thinking'}),
  s08: Two(R({place: soft(Day, 3), actors: [at(RASEL, 'smile', 'hold', 300, 1060, {holding: HandPaper}), at(SOHEL, 'smile', 'hold', 780, 1060, {holding: HandPaper})], title: 'একসাথে সই, চাঁদা', color: GOLD}), R({place: soft(Night, 3, 'gold'), over: pole(false), title: 'চতুর্থ দিন আলো', color: GREEN}), 0.55),
  s09: R({place: soft(<Cricket />, 2, 'gold'), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900, e: 'laugh'}), title: 'দুই পাড়া মিশিয়ে দুই দল', color: GREEN}),
  act: Glass('এক টেবিলে না, এক কাজে', {place: Day, color: '#bff2c8', sub: 'যা একসাথে ছাড়া হয় না'}),
  ...outro('Muzafer Sherif', 'Robbers Cave, আমেরিকা', '১৯৫৪'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দুই পাড়ার মারামারি থামাতে পারেনি পুলিশ" l2="থামাল একটা নষ্ট ট্রান্সফরমার!" bottom="শত্রুকে বন্ধু বানানোর কৌশল" term="Robbers Cave পরীক্ষা" art={<div style={{position: 'absolute', left: 120, top: 1080}}><Transformer size={300} burnt /></div>} size={74} />
);
export const b29 = story('b29/', raw, SCENES, Thumb, {logo: 'bba2'});
