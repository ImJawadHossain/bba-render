import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall, Rooftop, Taka} from '../common/places';
import {Village} from '../common/places2';
import {Count, MIDDLE, Pair, R, Solo, Two, Y3, story} from '../common/reel';
import {HandPaper, crowd} from '../common/laws48';
import {Glass, HouseWall, popIn, soft, sticker} from '../common/elegant';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RONY: ToonLook = {...Y3, top: '#2a6a8a'};
const SELIM: ToonLook = {...MIDDLE, kurta: false, top: '#5a5f6e', bottom: '#2a2c30'};
const DALAL: ToonLook = {...MIDDLE, top: '#c8a050'};
const Vil = <Village />;
const Away = <Rooftop night />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(<HouseWall fixed />, 2), actors: [at(RONY, 'smile', 'pointUp')], title: 'বিদেশের টাকায় দালান', color: GOLD}),
  h2: R({place: soft(<Village evening />, 6, 'dusk'), over: sticker('যারা ফেরেনি', {x: 240, y: 620, w: 600, bg: '#7a1f3a', size: 84})}),
  s01: Count(11, {post: 'টা দালান', label: 'রনির গ্রামে', size: 220, color: GOLD, place: soft(Vil, 8)}),
  s02: R({place: soft(<ChaiStall />, 3), actors: crowd([170, 540, 910], {h: 900, y: 1900, e: 'laugh'}), title: 'পাঁচ বছরে বাড়ি!', color: GOLD}),
  s03: Pair(soft(Vil, 3), {look: RONY, e: 'thinking'}, {look: DALAL, e: 'laugh', g: 'pointL', talk: true}),
  s04: Solo(soft(Vil, 3), {look: RONY, e: 'serious', g: 'hold', hold: HandPaper}, {over: popIn(<Taka w={360} amount="৪ লাখ" />, 360, 420), title: 'জমি বেচে চার লাখ', color: RED}),
  s05: Pair(soft(Away, 4, 'night'), {look: RONY, e: 'surprised'}, {look: SELIM, e: 'sad'}, {title: 'বিদেশে দেখা: সেলিম', color: GOLD}),
  s06: Solo(soft(Away, 4, 'night'), {look: SELIM, e: 'sad'}, {title: 'কাজ নেই, কাগজ নেই, ধার', color: RED}),
  s07: Pair(soft(Away, 4, 'night'), {look: RONY, e: 'sad'}, {look: SELIM, e: 'sad', g: 'open', talk: true}),
  s08: Two(Count(50, {post: ' জন', label: 'দুই গ্রাম থেকে গেছে', size: 220, color: GOLD, place: soft(Vil, 10, 'dusk')}), Count(11, {post: ' জন', label: 'ফিরে দালান তুলেছে', size: 220, color: GREEN, place: soft(Vil, 10, 'dusk')}), 0.5),
  s09: Glass('গ্রাম দেখেছে এগারোটা দালান', {place: <Village evening />, tone: 'dusk', sub: 'কেউ দেখেনি উনচল্লিশটা খালি ভিটা'}),
  act: Glass('যারা পারেনি, তারা কোথায়?', {place: Vil, color: '#bff2c8', sub: 'পথে নামার আগে খোঁজো'}),
  ...outro('Abraham Wald', 'Columbia University', '১৯৪৩', 'আসল ঘটনা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="গ্রামের সব দালান বিদেশফেরতদের" l2="যারা ফেরেনি, তাদের দেখা যায় না!" bottom="সফলদের দেখে সিদ্ধান্তের ফাঁদ" term="টিকে থাকার ভুল" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('১১ জন বনাম ৩৯ জন', {x: 0, y: 0, w: 600, bg: '#7a1f3a', size: 72})()}</div>} size={76} />
);
export const b07 = story('b07/', raw, SCENES, Thumb, {logo: 'bba2'});
