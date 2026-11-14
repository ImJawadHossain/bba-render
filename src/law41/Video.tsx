import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Avenue, Home} from '../common/places';
import {Bike, ShopFront} from '../common/places2';
import {ELDER, MIDDLE, Pair, R, Solo, Y1, story} from '../common/reel';
import {HandBox, PageCard} from '../common/laws48';
import {Glass, Library, popIn, soft, sticker, tag} from '../common/elegant';
import {Footpath, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const MAJID: ToonLook = {...ELDER, top: '#f2efe6'};
const SHAMIM: ToonLook = {...MIDDLE, kurta: false, top: '#5a4a3a', bottom: '#2a2c30', age: 0.3};
const NAHID: ToonLook = {...Y1, top: '#d9652b'};
const OLDIE: ToonLook = {...ELDER, top: '#c8d6e2'};
const Books = <Library />;
const Depot = <ShopFront name="নাহার বুক ডিপো" signBg="#7a4a14" />;
const mid = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle', x = 540) => ({look, x, h: 1100, y: 1880, expression, gesture});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Depot, 2, 'cool'), actors: [mid(SHAMIM, 'sad')]}),
  h2: R({place: soft(Books, 3, 'gold'), actors: [mid(NAHID, 'laugh', 'thumbsUp')], over: popIn(<PageCard name="বইপোকা" followers="২,০০,০০০" w={600} />, 240, 340)}),
  s01: R({place: soft(Depot, 2), actors: [mid(MAJID, 'smile')]}),
  s02: R({place: soft(Books, 3), actors: [mid(SHAMIM, 'neutral')], title: 'একই তাক, একই নাম', color: GOLD}),
  s03: Pair(soft(Books, 4), {look: SHAMIM, e: 'worried'}, {look: OLDIE, e: 'skeptical', g: 'pointL', talk: true}),
  s04: R({place: soft(Books, 5, 'cool'), actors: [mid(SHAMIM, 'sad')], over: sticker('বাবা এটা করতেন না', {x: 150, y: 420, w: 780, bg: '#7a1f3a', size: 70})}),
  s05: R({place: soft(<Home photo dim />, 3, 'night'), actors: [mid(SHAMIM, 'sad', 'idle', 300)], title: 'বিক্রি অর্ধেক', color: RED}),
  s06: Solo(soft(<Avenue />, 3), {look: NAHID, e: 'smile', g: 'shrug'}, {title: 'নাহিদ কিছুই চায়নি', color: GOLD}),
  s07: R({place: soft(<Avenue />, 3, 'gold'), actors: [mid(NAHID, 'laugh', 'hold', 300)].map((a) => ({...a, holding: HandBox})), over: popIn(<Bike size={460} />, 560, 1250), title: 'বইপোকা: বাড়ি বাড়ি বই', color: GREEN}),
  s08: R({place: soft(<Avenue />, 8, 'gold'), over: popIn(<PageCard name="বইপোকা" followers="৫০,০০০" w={640} />, 220, 460), title: 'তুলনা করার কেউ নেই', color: GOLD}),
  s09: R({place: soft(Books, 8, 'gold'), over: () => (
    <>
      {sticker('বাবার সেরা বছর', {x: 150, y: 480, w: 780, bg: '#7a4a14', size: 66})()}
      {sticker('বইপোকা: তার চেয়েও বেশি', {x: 110, y: 740, w: 860, bg: '#14532d', size: 66, at: 12})()}
    </>
  ), title: 'তিন বছরে', color: GREEN}),
  s10: Glass('বাবার চেয়ারে বসলে বাবার ছায়া', {place: Books, tone: 'gold', sub: 'চেয়ার না নিলে নিজের নাম'}),
  act: Glass('অন্তত একটা জিনিস নিজের বানাও', {place: Books, color: '#bff2c8', sub: 'নাম, ঢং বা পথ', size: 80}),
  ...ending(41, soft(<Footpath n={8} />, 14), [tag('বিশজন হকার', {bg: '#7a4a14'}), 'পুলিশও পারে না'], [tag('দুই সপ্তাহে খালি', {bg: '#14532d'}), 'কাউকে না তাড়িয়ে'], 'একজনকে সরিয়ে দল সরানো'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="বাবার দোকান পেয়ে লোকসান" l2="কিছু না পেয়ে বাবার চেয়েও বড়!" bottom="দুই ছেলের দুই পথ" term="48 Laws · Law 41" art={<div style={{position: 'absolute', left: 40, top: 1120}}><PageCard name="বইপোকা" followers="২,০০,০০০" w={520} /></div>} size={80} />
);
export const law41 = story('law41/', raw, SCENES, Thumb, {logo: 'bba2'});
