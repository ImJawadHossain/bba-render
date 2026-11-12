import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {MessRoom} from '../common/places2';
import {Cta, MOM, Pair, R, Solo, Two, Y1, Y3, lawBook, story} from '../common/reel';
import {HandPaper, Next, NextBadge, crowd} from '../common/laws48';
import {Campus, Cards, Glass, TailorShop, popIn, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RIFAT: ToonLook = {...Y1, top: '#c07a1a'};
const SAJIB: ToonLook = {...Y3, top: '#3a5aa0'};
const SENIOR: ToonLook = {...Y1, hairStyle: 'side', top: '#5a5f6e', mustache: true};
const Mess = <MessRoom />;
const SENIORS: ToonLook[] = [SENIOR, {...Y3, top: '#6a3a3a', mustache: true}, {...Y1, hairStyle: 'side', top: '#2f5a4a', glasses: true}];
const seniors = (e: 'laugh' | 'neutral' = 'laugh') => crowd([200, 540, 880], {h: 940, y: 1880, e, from: 1}).map((a, i) => ({...a, look: SENIORS[i]}));

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(soft(Mess), {look: RIFAT, e: 'smile'}, {look: SAJIB, e: 'smile'}, {title: 'একই রেজাল্ট, দুই ভাই', color: GOLD}),
  h2: Solo(soft(<Campus />), {look: SAJIB, e: 'laugh', g: 'thumbsUp'}, {title: 'পার্থক্যটা পড়ায় না', color: RED}),
  s01: Pair(soft(Mess, 3), {look: RIFAT, e: 'smile', g: 'thumbsUp'}, {look: SAJIB, e: 'smile', g: 'thumbsUp'}, {title: 'জিপিএ ৫ · একই কোচিং', color: GOLD}),
  s02: Two(Solo(soft(Mess, 3), {look: RIFAT, e: 'neutral'}, {title: 'রুম ১: রিফাত', color: GOLD}), Solo(soft(Mess, 3, 'cool'), {look: SAJIB, e: 'neutral'}, {title: 'রুম ২: সজীব', color: GOLD}), 0.5),
  s03: R({place: soft(Mess, 3, 'night'), actors: seniors('neutral'), title: 'তিনজন সেকেন্ড টাইমার', color: RED}),
  s04: R({place: soft(Mess, 2, 'night'), actors: seniors(), over: popIn(<Cards size={400} />, 340, 560), title: 'রাত ১২টা: তাস', color: GOLD}),
  s05: Pair(soft(Mess, 4, 'night'), {look: SENIOR, e: 'laugh', g: 'shrug', talk: true}, {look: RIFAT, e: 'neutral'}),
  s06: Solo(soft(Mess, 3, 'night'), {look: RIFAT, e: 'serious', g: 'hold', hold: HandPaper}, {title: 'প্রথম সপ্তাহ: পড়া', color: GREEN}),
  s07: R({place: soft(Mess, 2, 'night'), actors: [...seniors(), {look: RIFAT, x: 540, h: 1000, y: 1900, expression: 'laugh' as const, gesture: 'idle' as const}].filter((a, i) => i !== 1), over: popIn(<Cards size={380} />, 350, 600), title: 'তৃতীয় মাস: চতুর্থ জন', color: RED}),
  s08: R({place: soft(Mess, 0, 'cool'), actors: [{look: SAJIB, x: 300, h: 1000, y: 1880, expression: 'serious', gesture: 'hold', holding: HandPaper}, {look: Y1, x: 780, h: 1000, y: 1880, expression: 'serious', gesture: 'hold', holding: HandPaper}], title: 'রাত ২টায়ও আলো জ্বলে', color: GREEN}),
  s09: R({place: soft(<Campus />, 6, 'cool'), title: 'রেজাল্টের দিন', color: GOLD}),
  s10: Two(Solo(soft(<Campus />, 2), {look: SAJIB, e: 'laugh', g: 'thumbsUp'}, {title: 'সজীব: ঢাবি', color: GREEN}), Solo(soft(<Home dim />, 4, 'night'), {look: RIFAT, e: 'sad'}, {title: 'রিফাত: কোথাও না', color: RED}), 0.5),
  s11: Pair(soft(<Home />, 4), {look: MOM, e: 'worried', g: 'open'}, {look: RIFAT, e: 'sad'}),
  s12: Pair(soft(<Home />, 4), {look: MOM, e: 'worried'}, {look: RIFAT, e: 'neutral', g: 'shrug', talk: true}),
  s13: Glass('তিন মাস আগে লাইনটা ছিল রুমমেটের', {place: Mess, tone: 'night', sub: 'এখন তার নিজের'}),
  s14: Glass('একজন নিয়ে যায় চান্স, আরেকজন রুমমেটের অজুহাত', {place: <Campus />, tone: 'cool', size: 80}),
  book: lawBook(10),
  lesson: R({bg: 'plain'}),
  act: Glass('দেখো, কাদের কথা তোমার কথা হয়ে যাচ্ছে', {place: Mess, color: '#bff2c8'}),
  next: Next(11, tag('মাপের খাতা নেই', {w: 640, bg: '#7a1f3a', size: 80}), {title: 'তিরিশ বছর, সব মাথায়', place: soft(<TailorShop />, 14)}),
  next3: Next(11, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'কেউ দোকান ছাড়তে পারে না', place: soft(<TailorShop />, 14)}),
  cta: () => (
    <Cta>
      <NextBadge law={11} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই রেজাল্ট, দুই ভাই" l2="একজন ঢাবি, একজন বাড়ি!" bottom="পার্থক্যটা পড়ায় না" term="48 Laws · Law 10" art={<div style={{position: 'absolute', left: 60, top: 1150}}><Cards size={460} /></div>} size={84} />
);
export const law10 = story('law10/', raw, SCENES, Thumb, {logo: 'bba2'});
