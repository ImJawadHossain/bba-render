import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Avenue} from '../common/places';
import {Village} from '../common/places2';
import {ELDER, MIDDLE, MOM, Pair, R, SIR, Solo, story} from '../common/reel';
import {HandPaper} from '../common/laws48';
import {Glass, Library, popIn, soft, sticker} from '../common/elegant';
import {MangoBox, SchoolGate, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MOSH: ToonLook = {...ELDER, top: '#f2efe6'};
const RUMANA: ToonLook = {...MOM, top: '#2a5a8a', skirt: '#1f3a5a', glasses: true, age: 0.45};
const Gate = <SchoolGate />;
const Named = <SchoolGate gate="আরিফ তোরণ" mud={false} />;
const Vil = <Village />;
const Eve = <Village evening />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Gate, 2), actors: [{look: MOSH, x: 540, h: 1100, y: 1880, expression: 'serious', gesture: 'idle'}], over: sticker('তিনগুণ দামেও না', {x: 190, y: 420, w: 700, bg: '#7a1f3a', size: 76})}),
  h2: R({place: soft(Named, 0, 'gold'), title: 'বিনা পয়সায়', color: GREEN}),
  s01: R({place: soft(Gate, 0), title: 'দরকার দুই শতক জমি', color: GOLD}),
  s02: Pair(soft(Vil, 3), {look: SIR, e: 'smile', g: 'hold', hold: HandPaper}, {look: MOSH, e: 'serious'}, {title: 'কমিটির প্রস্তাব', color: GOLD}),
  s03: R({place: soft(Vil, 6), over: () => (
    <>
      {sticker('দ্বিগুণ দাম', {x: 190, y: 470, w: 700, bg: '#14305f', size: 72})()}
      {sticker('তিনগুণ দাম', {x: 190, y: 720, w: 700, bg: '#7a1f3a', size: 72, at: 12})()}
    </>
  ), title: 'দরজা বন্ধ', color: RED}),
  s04: Solo(soft(Vil, 4), {look: MOSH, e: 'serious', g: 'explain', talk: true}),
  s05: Pair(soft(Gate, 4, 'cool'), {look: SIR, e: 'skeptical', g: 'shrug'}, {look: MIDDLE, e: 'skeptical'}, {title: 'বুড়ো লোভী?', color: RED}),
  s06: Solo(soft(Gate, 3), {look: RUMANA, e: 'thinking', g: 'think'}, {title: 'চাচা আসলে কী চান?', color: GOLD}),
  s07: R({place: soft(<Library />, 8, 'night'), over: popIn(<Paper title="ভর্তির খাতা" lines={['নাম: আরিফ', 'বাবা: মোশাররফ', 'ক্লাস: নবম']} size={50} w={640} />, 220, 480), title: 'বাইশ বছর আগে', color: GOLD}),
  s08: R({place: soft(Eve, 3, 'dusk'), actors: [{look: RUMANA, x: 540, h: 1120, y: 1880, expression: 'serious', gesture: 'hold', holding: HandPaper}], title: 'হাতে শুধু একটা কাগজ', color: GOLD}),
  s09: Pair(soft(Eve, 4, 'dusk'), {look: MOSH, e: 'sad'}, {look: RUMANA, e: 'serious', g: 'open', talk: true}),
  s10: Solo(soft(Eve, 4, 'dusk'), {look: MOSH, e: 'sad', g: 'hold', hold: HandPaper}, {title: 'সই, এক টাকাও না', color: GREEN}),
  s11: Glass('কমিটি বাড়িয়েছে দাম', {place: Named, tone: 'gold', sub: 'রুমানা আপা খুঁজেছেন ব্যথাটা'}),
  act: Glass('সে কী চায়, কী হারিয়েছে?', {place: Vil, color: '#bff2c8', sub: 'চাওয়ার আগে খোঁজ নাও'}),
  ...ending(33, soft(<Avenue />, 14), [<MangoBox size={600} />, 'জসিম ডেকে ডেকে বেচে'], [<MangoBox neat size={600} />, 'কাদের ডাকেন না, দাম দ্বিগুণ'], 'নিজের দাম নিজে ঠিক করা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="তিনগুণ দামেও জমি দিলেন না" l2="বিনা পয়সায় দিলেন এক বিকেলে!" bottom="হাতে ছিল শুধু একটা কাগজ" term="48 Laws · Law 33" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('আরিফ তোরণ', {x: 0, y: 0, w: 520, bg: '#14305f', size: 84})()}</div>} size={78} />
);
export const law33 = story('law33/', raw, SCENES, Thumb, {logo: 'bba2'});
