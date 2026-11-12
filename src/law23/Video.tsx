import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {MIDDLE, Pair, R, Solo, Y1, story} from '../common/reel';
import {Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {Key, RepairShop, Screen, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RAFIQ: ToonLook = {...MIDDLE, kurta: false, top: '#5a5f6e', bottom: '#2a2c30'};
const SUMON: ToonLook = {...Y1, top: '#2a7a6a'};
const All = <RepairShop />;
const One = <RepairShop only />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Solo(soft(All, 3), {look: RAFIQ, e: 'worried', g: 'shrug'}, {title: 'সব পারে: মাসে বিশ হাজার', color: GOLD}),
  h2: Solo(soft(One, 3, 'gold'), {look: SUMON, e: 'smile', g: 'thumbsUp'}, {title: 'এক কাজ: মাসে দুই লাখ', color: GREEN}),
  s01: R({place: soft(<RepairShop name="এখানে সব কিছু মেরামত হয়" />, 2), actors: [{look: RAFIQ, x: 540, h: 1200, y: 1870, expression: 'smile', gesture: 'open'}]}),
  s02: Solo(soft(All, 4), {look: RAFIQ, e: 'worried', g: 'explain'}, {title: 'সারাদিন খাটুনি', color: GOLD}),
  s03: Pair(soft(All, 4, 'cool'), {look: RAFIQ, e: 'smile', g: 'explain', talk: true}, {look: SUMON, e: 'neutral'}, {title: 'পাঁচ বছর আগে: সাগরেদ', color: GOLD}),
  s04: Solo(soft(One, 2), {look: SUMON, e: 'smile', g: 'open'}, {title: 'পাশে নিজের দোকান', color: GOLD}),
  s05: R({place: soft(One, 8, 'gold'), over: () => (
    <>
      {sticker('শুধু মোবাইলের ডিসপ্লে', {x: 90, y: 420, w: 900, bg: '#14532d', size: 76})()}
      {popIn(<Screen size={320} />, 380, 760, 8)()}
    </>
  )}),
  s06: Pair(soft(All, 4), {look: RAFIQ, e: 'laugh', g: 'pointR', talk: true}, {look: SUMON, e: 'neutral'}),
  s07: R({place: soft(One, 6), over: () => (
    <>
      {popIn(<Screen broken size={260} />, 110, 700, 2)()}
      {popIn(<Screen size={260} />, 410, 700, 10)()}
      {popIn(<Screen size={260} />, 710, 700, 18)()}
    </>
  ), title: 'ডিসপ্লে, ডিসপ্লে, ডিসপ্লে', color: GOLD}),
  s08: Solo(soft(One, 3), {look: SUMON, e: 'serious', g: 'hold', hold: HandPhone}, {title: 'দশ মিনিটে নতুন', color: GREEN}),
  s09: R({place: soft(One, 4, 'gold'), actors: [{look: RAFIQ, x: 290, h: 1060, y: 1850, expression: 'worried', gesture: 'hold', holding: HandPhone, lookX: 1}, {look: SUMON, x: 790, h: 1080, y: 1850, expression: 'smile', gesture: 'idle', lookX: -1}], title: 'রফিকও ফোন পাঠায়', color: RED}),
  s10: Glass('সব পারে, তাই কেউ মনে রাখে না', {place: All, tone: 'cool', sub: 'একটা পারে, তাই সবাই মনে রাখে', size: 80}),
  act: Glass('একটা কাজে সবার আগে নাম', {place: One, color: '#bff2c8', sub: 'বাকিগুলো ছাড়ো'}),
  ...ending(23, soft(<Home />, 14), [<Key size={480} />, 'শাশুড়ির সিন্দুকের চাবি'], [tag('বিয়ের মাত্র এক বছর', {bg: '#7a1f3a'}), 'চাবি যায় ছোট বউয়ের হাতে'], 'ক্ষমতার মানুষের মন'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="সব পারে, আয় বিশ হাজার" l2="এক কাজে দুই লাখ!" bottom="গুরুর চেয়ে বড় সাগরেদ" term="48 Laws · Law 23" art={<div style={{position: 'absolute', left: 120, top: 1120}}><Screen broken size={300} /></div>} size={84} />
);
export const law23 = story('law23/', raw, SCENES, Thumb, {logo: 'bba2'});
