import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {Backdrop, SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {Fair} from '../common/places2';
import {CAST} from '../common/cast';
import {Count, Cta, Pair, R, Solo, Y1, Y3, lawBook, story} from '../common/reel';
import {HandPaper, Next, NextBadge} from '../common/laws48';
import {Apartment, Glass, Mic, Router, popIn, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const ALI: ToonLook = {...Y1, top: '#2b5fd9'};
const BADAL: ToonLook = {...Y3, top: '#3a3230'};
const MANAGER: ToonLook = {...Y1, hairStyle: 'side', top: '#5a5f6e'};
const Para = <Apartment />;
const Night = <Apartment night />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Para), actors: [{look: ALI, x: 300, h: 1040, y: 1880, expression: 'laugh', gesture: 'thumbsUp', lookX: 1}], over: popIn(<Router size={380} />, 560, 900), title: 'এক মাসেই শেষ করা যেত', color: GOLD}),
  h2: R({place: soft(Night, 0, 'night'), actors: [{look: ALI, x: 540, h: 1040, y: 1880, expression: 'sad'}], over: popIn(<Router size={360} dead />, 360, 640), title: 'বন্ধ আলীর ব্যবসা', color: RED}),
  s01: R({place: soft(Para, 4), over: () => <>{sticker('আলী নেট', {x: 100, y: 560, w: 420, bg: '#14305f', size: 70})()}{sticker('ফাস্ট নেট', {x: 560, y: 760, w: 420, bg: '#7a1f3a', size: 70, at: 10})()}</>, title: 'এক পাড়া, দুই লাইন', color: GOLD}),
  s02: Solo(soft(Para, 3), {look: ALI, e: 'laugh', g: 'thumbsUp'}, {over: sticker('দাম কম · স্পিড বেশি', {y: 540, bg: '#14532d', size: 66}), title: 'আলী দাম কমায়', color: GREEN}),
  s03: Count(40, {post: ' জন', label: 'বাদলের বাকি গ্রাহক', size: 220, color: RED, place: soft(Para, 10)}),
  s04: Pair(soft(<Backdrop bg="office" />, 4), {look: MANAGER, e: 'serious', g: 'explain', talk: true}, {look: ALI, e: 'neutral'}),
  s05: Pair(soft(<Backdrop bg="office" />, 4), {look: MANAGER, e: 'worried'}, {look: ALI, e: 'smile', g: 'shrug', talk: true}),
  s06: Solo(soft(<Home dim />, 5, 'night'), {look: BADAL, e: 'serious', g: 'hold', hold: HandPaper}, {title: 'এক বছর ধরে লিখে রাখে', color: GOLD}),
  s07: Pair(soft(<Backdrop bg="office" />, 4, 'cool'), {look: BADAL, e: 'smile', g: 'open'}, {look: CAST.ceo, e: 'smile', g: 'thumbsUp'}, {title: 'বড় কোম্পানির সাথে', color: GOLD}),
  s08: Count(500, {post: ' গ্রাহক', label: 'এক মাসে চলে যায়', size: 200, color: RED, place: soft(Para, 10)}),
  s09: Pair(soft(Para, 4), {look: ALI, e: 'worried', g: 'open'}, {look: BADAL, e: 'neutral'}, {title: 'একটু জায়গা দাও', color: GOLD}),
  s10: Pair(soft(Para, 4, 'night'), {look: ALI, e: 'shocked'}, {look: BADAL, e: 'serious', g: 'pointL', talk: true}),
  s11: R({place: soft(Night, 2, 'night'), over: popIn(<Router size={420} dead />, 330, 700), title: 'আলী নেট বন্ধ', color: RED}),
  s12: Glass('আলীর দয়া শত্রুকে সময় দেয়', {place: Night, tone: 'night', sub: 'সেই সময়েই শত্রু তাকে শেষ করে'}),
  book: lawBook(15),
  lesson: R({bg: 'plain'}),
  act: Glass('ব্যবসার লড়াইয়ে জিতলে মাঝপথে থেমো না', {place: Para, color: '#bff2c8'}),
  next: Next(16, <Mic size={360} />, {title: 'ফ্রিতে গাইত, কেউ শুনত না', place: soft(<Fair name="বিয়ে বাড়ি" />, 14, 'dusk')}),
  next2: Next(16, tag('৳২০,০০০ + সামনের চেয়ার', {w: 720, bg: '#14532d', size: 70}), {title: 'এক বছর পর', place: soft(<Fair />, 14, 'dusk')}),
  next3: Next(16, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'তোমাকে কি সবাই বেশি পায়?', place: soft(<Fair />, 14, 'dusk')}),
  cta: () => (
    <Cta>
      <NextBadge law={16} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দয়া করে থেমে যায়" l2="এক বছর পর নিজেই শেষ!" bottom="'তুমি দয়া করেছিলে, আমি করব না'" term="48 Laws · Law 15" art={<div style={{position: 'absolute', left: 60, top: 1180}}><Router size={460} dead /></div>} size={84} />
);
export const law15 = story('law15/', raw, SCENES, Thumb, {logo: 'bba2'});
