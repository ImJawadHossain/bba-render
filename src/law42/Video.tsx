import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall, HandCup, Home} from '../common/places';
import {ShopFront} from '../common/places2';
import {MIDDLE, Pair, R, Solo, Two, Y2, Y3, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, soft, sticker, tag} from '../common/elegant';
import {Footpath, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const RAFIQ: ToonLook = {...MIDDLE, kurta: false, top: '#14305f', bottom: '#2a2c30'};
const KASHEM: ToonLook = {...Y3, top: '#8a3a2a', mustache: true};
const walk = (n: number) => <Footpath n={n} />;
const Full = walk(8);
const mid = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle') => ({look, x: 540, h: 1100, y: 1880, expression, gesture, talking: gesture === 'explain'});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Full, 2), title: 'বিশজন হকার', color: GOLD}),
  h2: R({place: soft(walk(0), 2, 'gold'), actors: [mid(RAFIQ, 'smile', 'thumbsUp')], title: 'দুই সপ্তাহে খালি', color: GREEN}),
  s01: R({place: soft(Full, 0), title: 'দোকানের সামনে চৌকি', color: GOLD}),
  s02: R({place: soft(Full, 3), actors: [mid(RAFIQ, 'worried', 'shrug')], title: 'বিক্রি অর্ধেক', color: RED}),
  s03: R({place: soft(Full, 4, 'cool'), over: sticker('পুলিশ তুলেছে তিনবার', {x: 150, y: 520, w: 780, bg: '#14305f', size: 70}), title: 'পরদিন আবার আগের মতো', color: RED}),
  s04: Pair(soft(Full, 4), {look: RAFIQ, e: 'serious', g: 'explain'}, {look: Y2, e: 'skeptical'}, {title: 'কেউ শোনে না', color: RED}),
  s05: R({place: soft(walk(1), 3, 'dusk'), actors: [mid(KASHEM, 'serious', 'pointR')], title: 'প্রথম চৌকি: কাশেম', color: GOLD}),
  s06: R({place: soft(Full, 4), actors: [...crowd([140, 940], {h: 860, y: 1900}), mid(KASHEM, 'serious', 'explain')], title: 'সব বলে দেয় কাশেম', color: GOLD}),
  s07: Pair(soft(<ChaiStall />, 3), {look: RAFIQ, e: 'smile', g: 'hold', hold: HandCup}, {look: KASHEM, e: 'skeptical'}, {title: 'এক কাপ চা', color: GOLD}),
  s08: Pair(soft(<ChaiStall />, 4), {look: RAFIQ, e: 'smile', g: 'open', talk: true}, {look: KASHEM, e: 'surprised'}),
  s09: Solo(soft(<ShopFront name="কাশেম স্টোর" signBg="#14532d" />, 2), {look: KASHEM, e: 'laugh', g: 'thumbsUp'}),
  s10: R({place: soft(walk(6), 4, 'cool'), actors: crowd([200, 880], {h: 960, y: 1890, e: 'serious'}).map((a, i) => ({...a, gesture: i ? ('pointL' as const) : ('pointR' as const), lookX: i ? -1 : 1})), title: 'কে কোথায় বসবে?', color: RED}),
  s11: Two(R({place: soft(walk(4), 2), title: 'এক সপ্তাহে অর্ধেক', color: GOLD}), R({place: soft(walk(0), 2, 'gold'), title: 'দুই সপ্তাহে খালি', color: GREEN}), 0.5),
  s12: Glass('বিশজনের সাথে তিন মাস লড়াই', {place: walk(0), tone: 'gold', sub: 'একজনকে সরাতে এক কাপ চা'}),
  act: Glass('সবাই কার দিকে তাকায়?', {place: Full, color: '#bff2c8', sub: 'আগে ওই একজনকে খোঁজো'}),
  ...ending(42, soft(<Home />, 14), [tag('পাঁচ হাজার বেশি বেতন', {bg: '#14305f'}), 'রাশেদা খালা ফিরিয়ে দেন'], [tag('কম বেতনে পনেরো বছর', {bg: '#14532d'}), 'কেন থাকেন?'], 'টাকা ছাড়া মানুষ ধরে রাখা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="পুলিশও পারেনি" l2="এক কাপ চায়ে ফুটপাত খালি!" bottom="কাউকে না তাড়িয়ে" term="48 Laws · Law 42" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('এক কাপ চা', {x: 0, y: 0, w: 500, bg: '#7a4a14', size: 88})()}</div>} size={84} />
);
export const law42 = story('law42/', raw, SCENES, Thumb, {logo: 'bba2'});
