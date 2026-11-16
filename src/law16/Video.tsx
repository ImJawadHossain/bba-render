import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Fair, Village} from '../common/places2';
import {CAST} from '../common/cast';
import {Cta, ELDER, MIDDLE, Pair, R, Solo, Y3, lawBook, story} from '../common/reel';
import {Next, NextBadge, crowd} from '../common/laws48';
import {Glass, Mic, SchoolRoom, popIn, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const BABLU: ToonLook = {...Y3, kurta: true, top: '#f2efe6', bottom: '#e6e2d6'};
const Wed = <Fair />;
const Vil = <Village />;
const mic = popIn(<Mic size={300} />, 470, 860);
const chatting = (e: 'laugh' | 'sad' | 'smile' = 'laugh', talk = true) => crowd([110, 280, 800, 970], {h: 780, y: 1900, e}).map((a) => ({...a, talking: talk}));

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Wed, 2, 'dusk'), actors: [{look: BABLU, x: 540, h: 960, y: 1760, expression: 'smile', gesture: 'open', talking: true}, ...chatting()], title: 'বিনা পয়সার গান, কেউ শোনে না', color: RED, size: 74}),
  h2: R({place: soft(Wed, 2, 'gold'), actors: [{look: BABLU, x: 540, h: 1040, y: 1860, expression: 'laugh', gesture: 'wave'}], over: sticker('৳২০,০০০ + সামনের চেয়ার', {y: 520, bg: '#14532d', size: 68}), color: GREEN}),
  s01: Solo(soft(Wed, 3, 'dusk'), {look: BABLU, e: 'smile', g: 'open', talk: true}, {over: mic, title: 'বাবলুর গলা মিষ্টি', color: GOLD}),
  s02: Solo(soft(Wed, 4, 'dusk'), {look: BABLU, e: 'smile', g: 'thumbsUp'}, {title: 'ডাকলেই আসে, টাকা নেয় না', color: GOLD}),
  s03: R({place: soft(Wed, 2, 'dusk'), actors: [{look: BABLU, x: 540, h: 960, y: 1760, expression: 'smile', gesture: 'open', talking: true}, ...chatting()], title: 'মানুষ গল্প করে, ভাত খায়', color: GOLD}),
  s04: Pair(soft(Wed, 4, 'dusk'), {look: MIDDLE, e: 'laugh', g: 'open', talk: true}, {look: CAST.customer, e: 'laugh'}),
  s05: R({place: soft(Vil, 3, 'cool'), actors: [{look: BABLU, x: 540, h: 1000, y: 1880, expression: 'neutral', gesture: 'wave'}], title: 'ঢাকায় চলে যায়, এক বছর', color: GOLD}),
  s06: R({place: soft(Wed, 3, 'night'), actors: chatting('sad', false), title: 'বিয়ে জমে না', color: RED}),
  s07: Pair(soft(Wed, 4, 'night'), {look: ELDER, e: 'sad', g: 'open', talk: true}, {look: CAST.customer2, e: 'sad'}),
  s08: Solo(soft(Vil, 2, 'gold'), {look: BABLU, e: 'smile', g: 'wave'}, {title: 'এক বছর পর', color: GOLD}),
  s09: Pair(soft(Vil, 3, 'gold'), {look: BABLU, e: 'surprised'}, {look: MIDDLE, e: 'smile', g: 'open'}, {title: 'চেয়ারম্যানের মেয়ের বিয়ে', color: GOLD}),
  s10: Pair(soft(Vil, 4, 'gold'), {look: BABLU, e: 'surprised'}, {look: MIDDLE, e: 'smile', g: 'open', talk: true}),
  s11: R({place: soft(Wed, 2, 'gold'), actors: [{look: BABLU, x: 540, h: 960, y: 1760, expression: 'smile', gesture: 'open', talking: true}, ...crowd([110, 280, 800, 970], {h: 780, y: 1900, e: 'smile'})], over: mic, title: 'সবাই চুপ করে শোনে', color: GREEN}),
  s12: Glass('একই গলা। একই গান।', {place: Wed, tone: 'gold', size: 110}),
  s13: Glass('সবসময় থাকলে পেছনের শব্দ, না থাকলে অনুষ্ঠানের নায়ক', {place: Wed, tone: 'dusk', size: 80}),
  book: lawBook(16),
  lesson: R({bg: 'plain'}),
  act: Glass('সবসময়, বিনা পয়সায় হাজির থেকো না', {place: Wed, tone: 'dusk', color: '#bff2c8'}),
  next: Next(17, tag('হোমওয়ার্ক', {w: 520, bg: '#23402f', size: 90}), {title: 'রোজ দেখা: অর্ধেক কপি', place: soft(<SchoolRoom board="হোমওয়ার্ক" />, 14, 'cool')}),
  next2: Next(17, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'কবে দেখবেন কেউ জানে না', place: soft(<SchoolRoom board="?" />, 14, 'cool')}),
  next3: Next(17, tag('সবাই রোজ করে', {w: 560, bg: '#14532d', size: 80}), {title: 'কাজ করাতে চাইলে জানো', place: soft(<SchoolRoom />, 14, 'cool')}),
  cta: () => (
    <Cta>
      <NextBadge law={17} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="বিনা পয়সায় গাইত, কেউ শুনত না" l2="এক বছর পর ২০ হাজার!" bottom="একই গলা, একই গান" term="48 Laws · Law 16" art={<div style={{position: 'absolute', left: 120, top: 1100}}><Mic size={460} /></div>} size={80} />
);
export const law16 = story('law16/', raw, SCENES, Thumb, {logo: 'bba2'});
