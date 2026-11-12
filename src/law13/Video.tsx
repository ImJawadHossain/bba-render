import React from 'react';
import {AbsoluteFill} from 'remotion';
import {GOLD, GREEN, RED} from '../biz/art';
import {Backdrop, SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {ChaiStall, TeaCup, Taka} from '../common/places';
import {Village} from '../common/places2';
import {CAST} from '../common/cast';
import {Count, Cta, Pair, R, Solo, Two, WOMAN, Y1, lawBook, story} from '../common/reel';
import {Next, NextBadge} from '../common/laws48';
import {Banner, Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MITU: ToonLook = {...WOMAN, top: '#7a3a6a', skirt: '#4a2a4a', bottom: '#4a2a4a'};
const ARAFAT: ToonLook = {...Y1, top: '#2b5fd9'};
const OWNER: ToonLook = CAST.boss;
const Office = <Backdrop bg="office" />;
const Flood: React.FC = () => (
  <AbsoluteFill>
    <Village />
    <div style={{position: 'absolute', left: 0, right: 0, top: 1080, bottom: 0, background: 'linear-gradient(180deg, rgba(90,140,190,0.92), rgba(40,80,130,0.95))'}} />
  </AbsoluteFill>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: Solo(soft(Office), {look: OWNER, e: 'serious', g: 'hold', hold: HandPhone}, {title: 'একই মালিক, দুই ছাত্র', color: GOLD}),
  h2: Two(Glass('৳৫০০', {place: Office, color: '#ff9a9a', size: 160}), Glass('৳৫,০০,০০০', {place: Office, color: '#9ff2b0', size: 140}), 0.45),
  s01: R({place: soft(<Flood />, 0, 'cool'), title: 'সুনামগঞ্জে বন্যা', color: GOLD}),
  s02: Solo(soft(Office, 4), {look: MITU, e: 'worried'}, {title: 'আধা ঘণ্টা অপেক্ষা', color: GOLD}),
  s03: Pair(soft(Office, 4), {look: MITU, e: 'sad', g: 'open', talk: true}, {look: OWNER, e: 'blank', g: 'hold', hold: HandPhone}),
  s04: Pair(soft(Office, 4), {look: MITU, e: 'neutral'}, {look: OWNER, e: 'blank', g: 'hold', hold: HandPhone}, {over: popIn(<Taka w={340} amount="৫০০" rot={-6} />, 370, 900)}),
  s05: Solo(soft(Office, 3), {look: ARAFAT, e: 'smile'}, {title: 'পরদিন: আরাফাত', color: GOLD}),
  s06: Pair(soft(Office, 4), {look: ARAFAT, e: 'smile', g: 'explain', talk: true}, {look: OWNER, e: 'neutral', g: 'hold', hold: HandPhone}),
  s07: Pair(soft(Office, 4), {look: ARAFAT, e: 'smile'}, {look: OWNER, e: 'surprised'}, {title: 'ফোনটা নামিয়ে রাখেন', color: GOLD}),
  s08: Pair(soft(Office, 4), {look: ARAFAT, e: 'smile'}, {look: OWNER, e: 'serious', g: 'open', talk: true}),
  s09: Count(500000, {pre: '৳', size: 190, color: GREEN, place: soft(Office, 10)}),
  s10: R({place: soft(<Flood />, 2, 'cool'), over: popIn(<Banner text="সৌজন্যে: রহমান গার্মেন্টস" sub="ত্রাণ বিতরণ" w={880} />, 100, 560)}),
  s11: Pair(soft(<Flood />, 4, 'cool'), {look: MITU, e: 'skeptical', g: 'pointR'}, {look: ARAFAT, e: 'serious', g: 'shrug'}),
  s12: Two(Glass('দয়ার কাছে চাইলে ৳৫০০', {place: Office, color: '#ff9a9a'}), Glass('স্বার্থের কাছে চাইলে ৳৫ লাখ', {place: Office, color: '#9ff2b0'}), 0.5),
  book: lawBook(13),
  lesson: R({bg: 'plain'}),
  act: Glass('চাওয়ার আগে খোঁজো, এতে তার কী লাভ', {place: Office, color: '#bff2c8'}),
  next: Next(14, <TeaCup size={340} />, {title: 'তিন মাস সবার চায়ের বিল', place: soft(<ChaiStall />, 14, 'night')}),
  next2: Next(14, tag('৩টা বাড়ি · অর্ধেক দামে', {w: 700, bg: '#7a1f3a', size: 72}), {title: 'চতুর্থ মাসে', place: soft(<ChaiStall />, 14, 'night')}),
  next3: Next(14, <TeaCup size={340} />, {title: 'চায়ের কাপে কে কী শুনছে?', place: soft(<ChaiStall />, 14, 'night')}),
  cta: () => (
    <Cta>
      <NextBadge law={14} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই মালিক, একই ত্রাণ" l2="৫০০ টাকা বনাম ৫ লাখ!" bottom="পার্থক্য একটা বাক্যে" term="48 Laws · Law 13" art={<div style={{position: 'absolute', left: 40, top: 1180}}><Taka w={480} amount="৫ লাখ" rot={-5} /></div>} size={84} />
);
export const law13 = story('law13/', raw, SCENES, Thumb, {logo: 'bba2'});
