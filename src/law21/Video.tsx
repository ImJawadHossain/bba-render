import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {SareeShop} from '../common/places';
import {Aisle, ShopFront} from '../common/places2';
import {MIDDLE, Pair, R, Solo, WOMAN, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, TailorShop, soft, sticker, tag} from '../common/elegant';
import {Parlour, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const REHANA: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#2a6a8a', skirt: '#2a6a8a', bottom: '#2a6a8a', age: 0.3};
const SHIMU: ToonLook = {...WOMAN, hairStyle: 'bob', top: '#a0305a', skirt: '#a0305a', bottom: '#a0305a'};
const SELLER: ToonLook = {...MIDDLE, kurta: false, top: '#e8e2d2', bottom: '#3a3a44'};
const Cloth = <TailorShop />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Solo(soft(Cloth, 3), {look: REHANA, e: 'smile', g: 'shrug'}, {title: 'কিছুই বুঝি না', color: GOLD}),
  h2: Pair(soft(Cloth, 3), {look: SELLER, e: 'laugh', g: 'explain', talk: true}, {look: REHANA, e: 'neutral'}, {title: 'বলে দেয় দোকানদাররাই', color: RED}),
  s01: Solo(soft(<SareeShop />, 2), {look: REHANA, e: 'smile', g: 'open'}, {title: 'মফস্বলের কাপড়ের দোকান', color: GOLD}),
  s02: Pair(soft(<Aisle label="পাইকারি বাজার" />, 2), {look: REHANA, e: 'neutral'}, {look: SHIMU, e: 'skeptical', g: 'pointL'}, {title: 'বান্ধবী শিমু', color: GOLD}),
  s03: Pair(soft(Cloth, 4), {look: SHIMU, e: 'serious', g: 'pointR', talk: true}, {look: SELLER, e: 'skeptical'}),
  s04: Pair(soft(Cloth, 4, 'cool'), {look: SHIMU, e: 'sad'}, {look: SELLER, e: 'serious', g: 'shrug'}, {title: 'মুখ বন্ধ, হাত খালি', color: RED}),
  s05: Solo(soft(<Aisle />, 6, 'cool'), {look: REHANA, e: 'smile'}, {title: 'রেহানা উল্টো', color: GREEN}),
  s06: Pair(soft(Cloth, 4), {look: REHANA, e: 'smile', g: 'open', talk: true}, {look: SELLER, e: 'smile'}),
  s07: Pair(soft(Cloth, 4, 'gold'), {look: REHANA, e: 'surprised'}, {look: SELLER, e: 'laugh', g: 'explain', talk: true}, {title: 'বোঝায়, আর বড়াই করে', color: GOLD}),
  s08: Pair(soft(Cloth, 4, 'gold'), {look: REHANA, e: 'neutral'}, {look: SELLER, e: 'laugh', g: 'pointL', talk: true}),
  s09: R({place: soft(Cloth, 10, 'gold'), over: sticker('নরসিংদীর তাঁতের কারখানা', {x: 90, y: 640, w: 900, bg: '#14532d', size: 68}), title: 'তৃতীয় দিন', color: RED}),
  s10: R({place: soft(<ShopFront name="তাঁতের কারখানা" signBg="#14532d" />, 2), actors: [{look: REHANA, x: 540, h: 1180, y: 1870, expression: 'laugh', gesture: 'thumbsUp'}], over: sticker('একই থান, অর্ধেক দামে', {x: 110, y: 490, w: 860, bg: '#14532d', size: 68})}),
  s11: R({place: soft(<SareeShop />, 3, 'gold'), actors: crowd([150, 400, 680, 930], {h: 860, y: 1900, e: 'smile'}), title: 'শহরে সবচেয়ে কম দাম', color: GREEN}),
  s12: Glass('যে সব জানে, তাকে কেউ কিছু বলে না', {place: Cloth, tone: 'gold', sub: 'যে কিছুই জানে না, তাকে সবাই সব বলে', size: 80}),
  act: Glass('জানো কম, শোনো বেশি', {place: <Aisle />, color: '#bff2c8', sub: 'অন্যকে বড়াই করতে দাও'}),
  ...ending(21, soft(<Parlour />, 14), [tag('হাতজোড় করে হার মানে', {bg: '#7a1f3a'}), 'নতুন পার্লারের মিতু'], [tag('বিয়ের সাজের অর্ধেক কাজ', {bg: '#14532d'}), 'পাঠায় প্রতিদ্বন্দ্বীই'], 'হার মেনে জেতা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="পাইকারি বাজারে বোকা সাজা" l2="তিন দিনে সব গোপন কথা ফাঁস!" bottom="কিছুই বুঝি না, এই এক কথায়" term="48 Laws · Law 21" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('আসল দাম কত?', {x: 0, y: 0, w: 560, bg: '#14532d', size: 80})()}</div>} size={80} />
);
export const law21 = story('law21/', raw, SCENES, Thumb, {logo: 'bba2'});
