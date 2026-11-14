import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Count, MIDDLE, MOM, Pair, R, Two, story} from '../common/reel';
import {Glass, SchoolRoom, popIn, soft, sticker} from '../common/elegant';
import {SchoolGate} from '../common/elegant2';
import {TickForm, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const TEACHER: ToonLook = {...MIDDLE, kurta: false, top: '#e8e2d2', bottom: '#2a2c30'};
const HEAD: ToonLook = {...MOM, top: '#14305f', skirt: '#1f3a5a', glasses: true, age: 0.5};
const Gate = <SchoolGate mud={false} />;
const Office = <SchoolRoom />;
const yes = popIn(<TickForm mode="yes" />, 150, 520);
const no = popIn(<TickForm mode="no" />, 150, 520);

const SCENES: Record<string, React.FC<SP>> = {
  h1: Two(R({place: soft(Gate, 8), over: yes}), R({place: soft(Gate, 8, 'gold'), over: no}), 0.5),
  h2: Two(Count(1, {post: ' জন', label: 'দশজনে দান করে', size: 240, color: RED, place: soft(Gate, 10)}), Count(9, {post: ' জন', label: 'দশজনে দান করে', size: 240, color: GREEN, place: soft(Gate, 10, 'gold')}), 0.5),
  s01: R({place: soft(Gate, 3), over: sticker('লাইব্রেরির জন্য মাসে পঞ্চাশ টাকা', {x: 70, y: 560, w: 940, bg: '#14305f', size: 60}), title: 'দুই স্কুল', color: GOLD}),
  s02: R({place: soft(Gate, 8), over: yes, title: 'প্রথম স্কুল', color: GOLD}),
  s03: R({place: soft(Gate, 8, 'gold'), over: no, title: 'দ্বিতীয় স্কুল', color: GOLD}),
  s04: Pair(soft(Office, 4), {look: TEACHER, e: 'skeptical', g: 'pointR', talk: true}, {look: HEAD, e: 'smile'}),
  s05: Pair(soft(Office, 4), {look: TEACHER, e: 'thinking'}, {look: HEAD, e: 'smile', g: 'open', talk: true}),
  s06: Two(Count(1, {post: ' জন', label: 'প্রথম স্কুলে দান', size: 240, color: RED, place: soft(Gate, 10)}), Count(9, {post: ' জন', label: 'দ্বিতীয় স্কুলে দান', size: 240, color: GREEN, place: soft(Gate, 10, 'gold')}), 0.5),
  s07: Glass('একই অভিভাবক, একই সামর্থ্য', {place: Gate, tone: 'cool', sub: 'পার্থক্য: কোনটা আগে থেকে বাছা'}),
  s08: Glass('মানুষ সিদ্ধান্ত নেয় না', {place: Gate, tone: 'gold', sub: 'আগে থেকে বাছাটাই রেখে দেয়'}),
  act: Glass('ভালোটাকে আগে থেকে বাছা রাখো', {place: Gate, color: '#bff2c8', sub: 'না বলার পথও খোলা রাখো'}),
  ...outro('Eric Johnson ও Daniel Goldstein', 'Columbia University', '২০০৩'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই ফর্ম, টিকের জায়গা আলাদা" l2="দান একজন থেকে নয়জন!" bottom="ডিফল্টের শক্তি" term="টিক চিহ্নের পরীক্ষা" art={<div style={{position: 'absolute', left: 30, top: 1160, transform: 'scale(0.78)', transformOrigin: 'left top'}}><TickForm mode="no" /></div>} size={80} />
);
export const b25 = story('b25/', raw, SCENES, Thumb, {logo: 'bba2'});
