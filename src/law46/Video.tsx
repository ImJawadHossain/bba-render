import React from 'react';
import {GOLD, GREEN} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {SareeShop} from '../common/places';
import {Pair, R, Solo, Y1, Y2, Y3, story} from '../common/reel';
import {HandPaper, crowd} from '../common/laws48';
import {Glass, SchoolRoom, popIn, soft, sticker, tag} from '../common/elegant';
import {Ballot, Panjabi, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const SHAON: ToonLook = {...Y1, top: '#f2efe6', jacket: '#14305f'};
const MAMUN: ToonLook = {...Y3, top: '#f2efe6', jacket: '#14305f'};
const Class = <SchoolRoom />;
const Wins = <SchoolRoom lines={['অংক: ১০০', 'দৌড়: প্রথম', 'গান: প্রথম']} />;
const mid = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle', h = 1100) => ({look, x: 540, h, y: 1880, expression, gesture});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Wins, 0), actors: [mid(SHAON, 'smile', 'thumbsUp')]}),
  h2: R({place: soft(<SchoolRoom board="শাওন: ২ ভোট" />, 0, 'cool'), actors: [mid(SHAON, 'shocked')]}),
  s01: R({place: soft(Class, 2), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900}), title: 'চল্লিশজনের ক্লাস', color: GOLD}),
  s02: R({place: soft(Wins, 0, 'gold'), actors: [mid(SHAON, 'smile', 'thumbsUp')]}),
  s03: Solo(soft(Class, 3), {look: SHAON, e: 'skeptical'}, {title: 'কেউ ভুল করলে', color: GOLD}),
  s04: Pair(soft(Class, 4), {look: SHAON, e: 'skeptical', g: 'shrug', talk: true}, {look: Y2, e: 'sad'}),
  s05: R({place: soft(<SchoolRoom board="ক্যাপ্টেন নির্বাচন" />, 0), actors: [mid(SHAON, 'smile')]}),
  s06: Solo(soft(Class, 3), {look: MAMUN, e: 'laugh', g: 'hold', hold: HandPaper}, {title: 'মামুন: লেখা খারাপ', color: GOLD}),
  s07: Pair(soft(Class, 4), {look: Y2, e: 'laugh'}, {look: MAMUN, e: 'laugh', g: 'shrug', talk: true}),
  s08: R({place: soft(Class, 3, 'gold'), actors: [...crowd([140, 940], {h: 860, y: 1900, e: 'laugh'}), mid(MAMUN, 'laugh')], title: 'সবাই হাসে, মামুনের সাথে', color: GREEN}),
  s09: R({place: soft(<SchoolRoom lines={['মামুন: ৩৮', 'শাওন: ২']} />, 0, 'cool'), over: popIn(<Ballot size={320} />, 380, 1080)}),
  s10: R({place: soft(<SchoolRoom board="শাওন: ২" />, 0, 'cool'), actors: [mid(SHAON, 'shocked', 'idle', 960)], over: sticker('একটা তার নিজের', {x: 190, y: 750, w: 700, bg: '#7a1f3a', size: 72})}),
  s11: Solo(soft(Class, 4, 'cool'), {look: SHAON, e: 'neutral'}, {title: 'পাশে দাঁড়ালে সবাই ছোট', color: GOLD}),
  s12: Glass('নিখুঁত হলে হিংসা', {place: Class, tone: 'gold', sub: 'দোষ দেখালে আপন'}),
  act: Glass('নিজের একটা দোষে নিজেই হাসো', {place: Class, color: '#bff2c8', sub: 'অন্যকে তাদের ভুলে ছোট কোরো না', size: 80}),
  ...ending(46, soft(<SareeShop />, 14), [<Panjabi size={360} />, 'প্রথম ঈদে দশ লাখ'], [tag('ঘরে তিন হাজার পাঞ্জাবি', {bg: '#7a1f3a'}), 'দ্বিতীয় ঈদে সব শেষ'], 'জিতে থামার কৌশল'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="পরীক্ষা, খেলা, গান: সবেই প্রথম" l2="ভোট পেল মাত্র দুটো!" bottom="একটা তার নিজের" term="48 Laws · Law 46" art={<div style={{position: 'absolute', left: 120, top: 1140}}><Ballot size={380} /></div>} size={78} />
);
export const law46 = story('law46/', raw, SCENES, Thumb, {logo: 'bba2'});
