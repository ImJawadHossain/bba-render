import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Rooftop} from '../common/places';
import {ShopFront} from '../common/places2';
import {Count, ELDER, MIDDLE, Pair, R, Solo, Y2, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {BusStand, Plants, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const SATTAR: ToonLook = {...ELDER, top: '#f2efe6'};
const JALAL: ToonLook = {...MIDDLE, kurta: false, top: '#3a5a8a', bottom: '#2a2c30'};
const Stand = <BusStand />;
const mob = (e: 'serious' | 'laugh' = 'serious') => crowd([140, 400, 680, 940], {h: 860, y: 1900, e});
const sattar = (e: 'laugh' | 'smile' | 'serious', g: 'pointUp' | 'idle' | 'explain' = 'idle') => ({look: SATTAR, x: 540, h: 1100, y: 1880, expression: e, gesture: g, talking: g !== 'idle'});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Stand, 3), actors: mob(), over: sticker('ভাড়া বিশ টাকা বেশি', {x: 110, y: 420, w: 860, bg: '#7a1f3a', size: 72}), title: 'রাস্তা অবরোধ', color: RED}),
  h2: R({place: soft(Stand, 4, 'gold'), actors: [...crowd([140, 940], {h: 860, y: 1900, e: 'laugh'}), sattar('laugh', 'pointUp')], title: 'মালিকের নামে স্লোগান', color: GOLD}),
  s01: R({place: soft(Stand, 2), actors: [sattar('smile')], title: 'একটাই বাস কোম্পানি', color: GOLD}),
  s02: R({place: soft(Stand, 8), over: popIn(<Paper title="নোটিশ" lines={['ভাড়া: ৪০ → ৬০ টাকা', 'ম্যানেজার: জালাল']} />, 230, 500)}),
  s03: R({place: soft(Stand, 4, 'cool'), actors: [...crowd([140, 940], {h: 860, y: 1900, e: 'serious'}), {look: JALAL, x: 540, h: 1060, y: 1880, expression: 'worried', gesture: 'idle'}], title: 'জালালকে ঘেরাও', color: RED}),
  s04: Pair(soft(Stand, 4, 'cool'), {look: JALAL, e: 'worried', g: 'shrug', talk: true}, {look: Y2, e: 'serious'}),
  s05: R({place: soft(<BusStand night />, 5, 'night'), actors: mob(), title: 'তিন দিন সব বন্ধ', color: RED}),
  s06: R({place: soft(Stand, 5, 'gold'), actors: [sattar('serious', 'explain')], title: 'চতুর্থ দিন', color: GOLD}),
  s07: Pair(soft(Stand, 4, 'gold'), {look: JALAL, e: 'sad'}, {look: SATTAR, e: 'serious', g: 'pointL', talk: true}),
  s08: R({place: soft(Stand, 4, 'gold'), actors: mob('laugh'), over: sticker('সাত্তার সাহেব জিন্দাবাদ', {x: 110, y: 420, w: 860, bg: '#14532d', size: 70})}),
  s09: Count(50, {pre: '৳', label: 'ভাড়া এখন', sub: 'আগে ছিল ৪০ টাকা', size: 230, color: RED, place: soft(Stand, 10)}),
  s10: R({place: soft(Stand, 10, 'night'), over: popIn(<Paper title="ভাড়া বাড়ানোর চিঠি" lines={['৪০ → ৬০ টাকা', 'সই: হাজী সাত্তার']} />, 230, 500), title: 'মূল চিঠির সই', color: RED}),
  s11: Solo(soft(<ShopFront name="সাত্তার ব্রিকস" signBg="#7a4a14" />, 3), {look: JALAL, e: 'laugh', g: 'thumbsUp'}),
  s12: Glass('গালি খেল ম্যানেজার, টাকা পেলেন মালিক', {place: Stand, tone: 'gold', sub: 'স্লোগানও মালিকের নামে', size: 78}),
  act: Glass('অপ্রিয় খবর নিজের মুখে দিও না', {place: Stand, color: '#bff2c8', size: 80, sub: 'ভালো খবরটা নিজে দাও'}),
  ...ending(26, soft(<Rooftop />, 14), [<Plants size={640} />, 'চারার দাম দেড়গুণ'], [tag('ক্রেতারাই ক্রেতাকে তাড়ায়', {bg: '#7a1f3a'}), 'তুলির সবুজ পরিবার'], 'ভক্ত বানানোর কৌশল'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ভাড়া বেশি, তবু মালিকের জয়ধ্বনি" l2="বলি হলো ম্যানেজার!" bottom="সই ছিল মালিকেরই" term="48 Laws · Law 26" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('৪০ → ৬০ টাকা', {x: 0, y: 0, w: 560, bg: '#7a1f3a', size: 84})()}</div>} size={78} />
);
export const law26 = story('law26/', raw, SCENES, Thumb, {logo: 'bba2'});
