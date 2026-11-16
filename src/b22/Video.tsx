import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {BiryaniShop} from '../common/places';
import {Count, MIDDLE, Pair, R, Solo, Two, Y2, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {Candy, at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RAJU: ToonLook = {...Y2, top: '#f2efe6', jacket: '#7a1f3a'};
const GUEST: ToonLook = {...MIDDLE, kurta: false, top: '#2a5a8a', bottom: '#2a2c30'};
const Rest = <BiryaniShop />;
const one = popIn(<Candy size={220} />, 430, 460);
const two = () => (
  <>
    {popIn(<Candy size={220} />, 300, 460)()}
    {popIn(<Candy size={220} />, 560, 460, 12)()}
  </>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Rest, 3), actors: [at(RAJU, 'smile', 'thumbsUp')], title: 'সবচেয়ে বেশি বখশিশ', color: GREEN}),
  h2: R({place: soft(Rest, 5, 'gold'), over: sticker('পাঁচ সেকেন্ডের ফিরে আসা', {x: 150, y: 600, w: 780, bg: '#14305f', size: 70})}),
  s01: R({place: soft(Rest, 3), actors: crowd([200, 540, 880], {h: 960, y: 1890, e: 'smile', from: 2}), over: one, title: 'বিলের সাথে একটা লজেন্স', color: GOLD}),
  s02: Count(20, {pre: '৳', label: 'গড় বখশিশ', size: 240, color: GOLD, place: soft(Rest, 10)}),
  s03: Pair(soft(Rest, 3), {look: GUEST, e: 'neutral'}, {look: RAJU, e: 'smile', g: 'open'}, {over: one}),
  s04: Two(Solo(soft(Rest, 4), {look: RAJU, e: 'neutral'}, {title: 'তিন পা গিয়ে থামে', color: GOLD}), Pair(soft(Rest, 4, 'gold'), {look: GUEST, e: 'surprised'}, {look: RAJU, e: 'smile', g: 'open'}, {over: two, title: 'ফিরে এসে আরেকটা', color: GREEN}), 0.45),
  s05: Pair(soft(Rest, 4, 'gold'), {look: GUEST, e: 'smile'}, {look: RAJU, e: 'laugh', g: 'open', talk: true}),
  s06: Glass('খরচ পঞ্চাশ পয়সা', {place: Rest, tone: 'gold', sub: 'মনে হয়, শুধু আমার জন্য ফিরে এসেছে'}),
  s07: Two(Count(20, {pre: '৳', label: 'অন্যদের বখশিশ', size: 220, color: GOLD, place: soft(Rest, 10)}), Count(25, {pre: '৳', label: 'রাজুর বখশিশ', size: 220, color: GREEN, place: soft(Rest, 10, 'gold')}), 0.5),
  s08: Glass('লজেন্স না, অনুভূতি', {place: Rest, tone: 'gold', sub: 'তোমাকে আলাদা করে মনে রেখেছি'}),
  act: Glass('শেষে ছোট একটা বাড়তি কিছু', {place: Rest, color: '#bff2c8', sub: 'যা শুধু তার জন্য মনে হয়'}),
  ...outro('David Strohmetz', 'Monmouth University', '২০০২'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই রেস্টুরেন্ট, একই খাবার" l2="এক ওয়েটারের বখশিশ সবার চেয়ে বেশি!" bottom="পাঁচ সেকেন্ডের কৌশল" term="লজেন্সের পরীক্ষা" art={<div style={{position: 'absolute', left: 140, top: 1160}}><Candy size={320} /></div>} size={76} />
);
export const b22 = story('b22/', raw, SCENES, Thumb, {logo: 'bba2'});
