import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {Count, Cta, ELDER, MIDDLE, Pair, R, Solo, Y1, lawBook, story} from '../common/reel';
import {Next, NextBadge, PageCard, crowd} from '../common/laws48';
import {Campus, Glass, HouseWall, Plots, popIn, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const LATIF: ToonLook = {...ELDER, top: '#f2efe6'};
const JALIL: ToonLook = {...MIDDLE, kurta: false, top: '#c07a1a', bottom: '#3a2a1a'};
const STUDENT: ToonLook = {...Y1, top: '#f2efe6', jacket: '#2a3a5a'};
const New = <HouseWall />;
const Crack = <HouseWall crack />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(soft(Crack, 3), {look: LATIF, e: 'sad'}, {look: JALIL, e: 'laugh', g: 'shrug'}, {title: 'বুড়ো শিক্ষককে ঠকানো সহজ?', color: GOLD}),
  h2: R({place: soft(Crack, 8), over: sticker('জেলায় জলিলের কাজ বন্ধ', {x: 90, y: 640, w: 900, bg: '#7a1f3a', size: 72}), title: 'এক মাস পর', color: RED}),
  s01: Solo(soft(New, 2), {look: LATIF, e: 'smile', g: 'open'}, {title: 'অবসরের টাকায় দোতলা', color: GOLD}),
  s02: Solo(soft(New, 3), {look: JALIL, e: 'laugh', g: 'thumbsUp'}, {over: sticker('সিমেন্ট কম, বালি বেশি', {y: 560, bg: '#7a1f3a', size: 64}), title: 'পুরো টাকা নেয়', color: RED}),
  s03: Solo(soft(Crack, 2, 'cool'), {look: LATIF, e: 'worried', g: 'hold', hold: HandPhone}, {title: 'ছয় মাসে ফাটল', color: RED}),
  s04: Solo(soft(Crack, 5, 'cool'), {look: JALIL, e: 'skeptical', g: 'hold', hold: HandPhone, talk: true}),
  s05: Solo(soft(Crack, 3, 'cool'), {look: LATIF, e: 'sad'}, {near: true, title: 'কিছু বলেন না', color: GOLD}),
  s06: Pair(soft(Crack, 3), {look: STUDENT, e: 'shocked', g: 'hold', hold: HandPhone}, {look: LATIF, e: 'smile'}, {title: 'এক পুরোনো ছাত্র', color: GOLD}),
  s07: R({place: soft(<Home dim />, 8, 'night'), over: popIn(<PageCard name="প্রাক্তন ছাত্র পরিষদ" followers="৪০,০০০" w={680} />, 200, 460)}),
  s08: R({place: soft(<Campus />, 3, 'gold'), actors: crowd([90, 260, 430, 600, 770, 940], {h: 760, y: 1900, e: 'smile'}), title: 'তিরিশ বছরে হাজারো ছাত্র', color: GOLD}),
  s09: Count(6, {post: 'টা কাজ বাতিল', label: 'এক মাসে', size: 140, color: RED, place: soft(Crack, 10)}),
  s10: Solo(soft(<Home />, 4), {look: STUDENT, e: 'serious', g: 'explain', talk: true}),
  s11: Solo(soft(New, 2, 'gold'), {look: JALIL, e: 'worried', g: 'open'}, {title: 'বিনা পয়সায় নতুন দেয়াল', color: GREEN}),
  s12: Glass('দেখেছিল বুড়ো মানুষ, দেখেনি তিরিশ বছরের ছাত্র', {place: New, tone: 'gold', size: 82}),
  book: lawBook(19),
  lesson: R({bg: 'plain'}),
  act: Glass('ছোট ভেবে অবহেলার আগে খোঁজ নাও, সে কাদের মানুষ', {place: New, color: '#bff2c8', size: 78}),
  next: Next(20, tag('বাবার জমি', {w: 480, bg: '#14532d', size: 90}), {title: 'দুই ভাইয়ের লড়াই', place: soft(<Plots />, 14)}),
  next2: Next(20, tag('রাস্তার পাশের ৫ কাঠা', {w: 640, bg: '#14305f', size: 74}), {title: 'পায় পক্ষ না নেওয়া ছোট ভাই', place: soft(<Plots mark />, 14)}),
  next3: Next(20, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'পরিবারে ঝগড়া থাকলে দেখো', place: soft(<Plots />, 14)}),
  cta: () => (
    <Cta>
      <NextBadge law={20} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="বুড়ো শিক্ষককে ঠকাল ঠিকাদার" l2="এক মাসে জেলায় কাজ বন্ধ!" bottom="পেছনে তিরিশ বছরের ছাত্র" term="48 Laws · Law 19" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('দেয়ালে ফাটল', {x: 0, y: 0, w: 560, bg: '#7a1f3a', size: 84})()}</div>} size={80} />
);
export const law19 = story('law19/', raw, SCENES, Thumb, {logo: 'bba2'});
