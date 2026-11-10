import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Home, PhoneShop} from '../common/places';
import {ShopFront} from '../common/places2';
import {Count, Pair, R, SIR, Solo, Y1, Y2, Y3, story} from '../common/reel';
import {HandBox} from '../common/laws48';
import {Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {Melon, MelonField, MsgPhone, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const SOHAG: ToonLook = {...Y2, top: '#8a6a9a'};
const RAJU: ToonLook = {...Y1, top: '#c0304a'};
const NASIR: ToonLook = {...SIR, tie: '#7a1f3a'};
const Shop = <PhoneShop sign={false} />;
const msgs = <MsgPhone lines={['স্যার, যদি সম্ভব হয়…', 'আপত্তি না থাকলে…', 'স্যার?']} />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(<Home dim />, 8, 'night'), over: popIn(msgs, 310, 440), title: 'ছয় মাসের মেসেজ', color: GOLD}),
  h2: R({place: soft(Shop, 3, 'gold'), actors: [{look: RAJU, x: 290, h: 1080, y: 1850, expression: 'laugh', gesture: 'pointR', lookX: 1}, {look: NASIR, x: 790, h: 1080, y: 1850, expression: 'smile', gesture: 'thumbsUp', lookX: -1}], over: sticker('দশটা শাখা', {x: 240, y: 420, w: 600, bg: '#14532d', size: 88})}),
  s01: Pair(soft(Shop, 3), {look: SOHAG, e: 'smile', g: 'hold', hold: HandBox}, {look: RAJU, e: 'smile', g: 'hold', hold: HandBox}, {title: 'একই কারখানার কাভার', color: GOLD}),
  s02: R({place: soft(<ShopFront name="নাসির মোবাইল · দশ শাখা" signBg="#14305f" />, 2), actors: [{look: NASIR, x: 540, h: 1200, y: 1870, expression: 'serious', gesture: 'idle'}]}),
  s03: Solo(soft(<Home dim />, 4, 'night'), {look: SOHAG, e: 'worried', g: 'hold', hold: HandPhone, talk: true}),
  s04: R({place: soft(<Home dim />, 8, 'night'), over: popIn(msgs, 310, 440), title: 'উত্তর নেই, ছয় মাস', color: RED}),
  s05: Solo(soft(Shop, 3), {look: RAJU, e: 'serious', g: 'hold', hold: HandBox}, {title: 'সোজা মালিকের সামনে', color: GREEN}),
  s06: Pair(soft(Shop, 4), {look: RAJU, e: 'serious', g: 'explain', talk: true}, {look: NASIR, e: 'surprised'}),
  s07: Pair(soft(Shop, 4, 'gold'), {look: RAJU, e: 'neutral'}, {look: NASIR, e: 'thinking', g: 'think'}, {title: 'এক মিনিট চুপ', color: GOLD}),
  s08: Count(10, {post: ' শাখা', label: 'পরের সপ্তাহে', sub: 'মাসে লাখ টাকার অর্ডার', size: 220, color: GREEN, place: soft(Shop, 10, 'gold')}),
  s09: Solo(soft(Shop, 4), {look: NASIR, e: 'neutral'}, {title: 'সোহাগেরটা কেন নয়?', color: GOLD}),
  s10: Pair(soft(Shop, 4), {look: Y3, e: 'neutral'}, {look: NASIR, e: 'serious', g: 'pointL', talk: true}),
  s11: Glass('ভয়ে চেয়ে পেল নীরবতা', {place: Shop, tone: 'gold', sub: 'সাহস নিয়ে চেয়ে পেল দশ শাখা'}),
  act: Glass('"যদি সম্ভব হয়" বাদ দাও', {place: Shop, color: '#bff2c8', sub: 'পরিষ্কার বলো, কী চাও'}),
  ...ending(28, soft(<MelonField />, 14), [<Melon size={460} small />, 'পলাশের তরমুজ ছোট'], [tag('তবু দাম তিনগুণ', {bg: '#14532d'}), 'কাশেমের অর্ধেক পচে'], 'শেষ থেকে পরিকল্পনা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ছয় মাস মেসেজ, উত্তর নেই" l2="একদিনে দশ শাখা!" bottom="একই মাল, আলাদা সাহস" term="48 Laws · Law 28" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('দশটা শাখা', {x: 0, y: 0, w: 520, bg: '#14532d', size: 90})()}</div>} size={84} />
);
export const law28 = story('law28/', raw, SCENES, Thumb, {logo: 'bba2'});
