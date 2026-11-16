import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {MIDDLE, Pair, R, story} from '../common/reel';
import {Glass, soft, sticker, tag} from '../common/elegant';
import {Car, Grocery, Lane, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const ZAMAN: ToonLook = {...MIDDLE, kurta: false, top: '#2a5a8a', bottom: '#2a2c30'};
const AZAD: ToonLook = {...MIDDLE, kurta: false, top: '#e8e2d2', bottom: '#3a3a44', jacket: '#262a33', glasses: true};
// বাঁ দিকে জামানের বাড়ি, ডান দিকে আজাদের। সাদা গাড়ি আজাদের, নীল জামানের।
const W = '#e8e2d2';
const B = '#2a4a8a';
const Wrong = (morning = false) => <Lane car="left" morning={morning} colors={[W, B]} />;
const Mirror = (morning = false) => <Lane car="both" morning={morning} colors={[W, B]} />;
const Day = <Lane morning />;
const at = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle', x = 800) => ({look, x, h: 1040, y: 1880, expression, gesture, lookX: -1});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Wrong(), 2, 'night'), over: sticker('ছয়বার অনুরোধ, দুইবার সালিশ', {x: 70, y: 420, w: 940, bg: '#7a1f3a', size: 64})}),
  h2: R({place: soft(Day, 2, 'gold'), actors: [at(ZAMAN, 'smile', 'idle', 540)], title: 'একটাও কথা না বলে', color: GREEN}),
  s01: R({place: soft(Day, 0), title: 'সরু গলি, দুই বাড়ি', color: GOLD}),
  s02: R({place: soft(Wrong(), 2, 'night'), title: 'প্রতি রাতে অন্যের গেটে', color: RED}),
  s03: R({place: soft(Wrong(true), 3), actors: [at(ZAMAN, 'worried', 'shrug')], title: 'সকালে পথ বন্ধ', color: RED}),
  s04: Pair(soft(Day, 4), {look: ZAMAN, e: 'smile', g: 'open', talk: true}, {look: AZAD, e: 'neutral'}),
  s05: Pair(soft(Day, 4), {look: ZAMAN, e: 'worried'}, {look: AZAD, e: 'laugh', g: 'shrug', talk: true}),
  s06: R({place: soft(Wrong(), 6, 'night'), over: () => (
    <>
      {sticker('ছয়বার অনুরোধ', {x: 190, y: 480, w: 700, bg: '#14305f', size: 72})()}
      {sticker('দুইবার সালিশ', {x: 190, y: 720, w: 700, bg: '#14305f', size: 72, at: 12})()}
    </>
  ), title: 'কিছুই বদলায় না', color: RED}),
  s07: R({place: soft(Mirror(), 2, 'night'), title: 'এবার আজাদের গেটে', color: GOLD}),
  s08: R({place: soft(Mirror(true), 3), actors: [at(AZAD, 'shocked')], title: 'সকাল আটটা: পরীক্ষা', color: RED}),
  s09: Pair(soft(Mirror(true), 4), {look: ZAMAN, e: 'smile'}, {look: AZAD, e: 'shocked', g: 'pointL'}, {title: 'বিশ মিনিট পর', color: GOLD}),
  s10: Pair(soft(Day, 4), {look: ZAMAN, e: 'wink', g: 'shrug', talk: true}, {look: AZAD, e: 'shocked'}),
  s11: R({place: soft(<Lane car="right" colors={[W, W]} />, 2, 'night'), title: 'এখন নিজের গেটে', color: GREEN}),
  s12: Glass('ছয়বারের অনুরোধে যা হয়নি', {place: Day, tone: 'gold', sub: 'একবার নিজের গেটে দেখেই হয়েছে'}),
  act: Glass('বক্তৃতা নয়, একই স্বাদ', {place: Day, color: '#bff2c8', sub: 'তার কাজটা তাকেই ফিরিয়ে দাও'}),
  ...ending(44, soft(<Grocery />, 14), [tag('এক সপ্তাহে সব আধুনিক', {bg: '#14305f'}), 'বাবার মুদি দোকান'], [tag('খদ্দের অর্ধেক নেই', {bg: '#7a1f3a'}), 'তিন মাসে'], 'বদল আনার ঠিক কৌশল'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ছয়বার অনুরোধেও শোনেননি" l2="এক সকালে নিজেই বুঝে গেলেন!" bottom="একটাও কথা না বলে" term="48 Laws · Law 44" art={<div style={{position: 'absolute', left: 60, top: 1220}}><Car size={520} color={W} /></div>} size={80} />
);
export const law44 = story('law44/', raw, SCENES, Thumb, {logo: 'bba2'});
