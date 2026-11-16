import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Count, MIDDLE, MOM, Pair, R, Solo, story} from '../common/reel';
import {HandPaper, crowd} from '../common/laws48';
import {Glass, SchoolRoom, popIn, soft, sticker} from '../common/elegant';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const NASRIN: ToonLook = {...MOM, top: '#2a6a8a', skirt: '#1f4a6a', age: 0.4};
const FATHER: ToonLook = {...MIDDLE, kurta: false, top: '#c8d6e2', bottom: '#2a2c30'};
const Room = <SchoolRoom board="ছুটি: দুপুর একটা" />;
const kids = (e: 'sad' | 'neutral' = 'neutral') => crowd([180, 420, 660, 900], {h: 700, y: 1900, e});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Room, 2), actors: [at(NASRIN, 'serious', 'pointUp', 540, 1000)], over: sticker('দেরি হলে পঞ্চাশ টাকা', {x: 150, y: 760, w: 780, bg: '#7a1f3a', size: 66})}),
  h2: Count(2, {post: 'গুণ', label: 'জরিমানার পর দেরি', size: 240, color: RED, place: soft(Room, 10)}),
  s01: R({place: soft(Room, 2), actors: kids()}),
  s02: R({place: soft(Room, 4, 'dusk'), actors: [...kids('sad'), at(NASRIN, 'worried', 'idle', 540, 1000)], title: 'বাচ্চারা অপেক্ষায়', color: GOLD}),
  s03: Pair(soft(Room, 4), {look: FATHER, e: 'sad', g: 'open'}, {look: NASRIN, e: 'neutral'}, {title: 'বারবার মাফ চাওয়া', color: GOLD}),
  s04: R({place: soft(Room, 8), over: popIn(<Paper title="নোটিশ" lines={['দশ মিনিটের বেশি দেরি', 'জরিমানা: পঞ্চাশ টাকা']} size={52} w={700} />, 190, 520)}),
  s05: R({place: soft(Room, 4, 'dusk'), actors: kids('sad'), title: 'এক মাসে দেরি দ্বিগুণ', color: RED}),
  s06: Pair(soft(Room, 4), {look: NASRIN, e: 'surprised'}, {look: FATHER, e: 'laugh', g: 'hold', hold: HandPaper, talk: true}),
  s07: Glass('আগে দেরি মানে লজ্জা', {place: Room, tone: 'cool', sub: 'এখন পঞ্চাশ টাকার সেবা'}),
  s08: Solo(soft(Room, 3), {look: NASRIN, e: 'thinking', g: 'think'}, {title: 'জরিমানা তুলে দেন', color: GOLD}),
  s09: R({place: soft(Room, 6, 'night'), actors: kids('sad'), title: 'দেরি আর কমে না', color: RED}),
  act: Glass('ছোট জরিমানা কি অনুমতি?', {place: Room, color: '#bff2c8', sub: 'থামানোর আগে ভেবে দেখো'}),
  ...outro('Uri Gneezy ও Aldo Rustichini', 'Israel, দশটা ডে-কেয়ার', '২০০০'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দেরি থামাতে জরিমানা" l2="দেরি হয়ে গেল দ্বিগুণ!" bottom="লজ্জা একবার বিক্রি হলে ফেরে না" term="জরিমানার পরীক্ষা" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('৫০ টাকা জরিমানা', {x: 0, y: 0, w: 560, bg: '#7a1f3a', size: 76})()}</div>} size={84} />
);
export const b01 = story('b01/', raw, SCENES, Thumb, {logo: 'bba2'});
