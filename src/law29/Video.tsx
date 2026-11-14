import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Avenue} from '../common/places';
import {Aisle} from '../common/places2';
import {MIDDLE, Pair, R, Solo, Two, Y2, Y3, story} from '../common/reel';
import {HandBox, HandPaper, crowd} from '../common/laws48';
import {Glass, popIn, soft, tag} from '../common/elegant';
import {Melon, MelonField, Parlour, Truck, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const KASHEM: ToonLook = {...MIDDLE, kurta: false, top: '#2a5a3a', bottom: '#d9d4c6'};
const POLASH: ToonLook = {...Y3, top: '#d9a21b'};
const Field = <MelonField />;
const one = (look: ToonLook, expression: 'laugh' | 'sad' | 'worried' | 'neutral', gesture: 'thumbsUp' | 'idle' | 'shrug' | 'hold' = 'idle', holding?: React.ReactNode) => [{look, x: 540, h: 1100, y: 1880, expression, gesture, holding}];

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Field, 3), over: () => (
    <>
      {popIn(<Melon size={300} small />, 110, 600)()}
      {popIn(<Melon size={460} />, 500, 560, 8)()}
    </>
  ), title: 'পলাশের তরমুজ ছোট', color: GOLD}),
  h2: Two(R({place: soft(Field, 3, 'gold'), actors: one(POLASH, 'laugh', 'thumbsUp'), title: 'তবু দাম তিনগুণ', color: GREEN}), R({place: soft(<MelonField rot />, 3, 'dusk'), actors: one(KASHEM, 'sad'), title: 'বড়গুলো মাঠেই পচে', color: RED}), 0.5),
  s01: Pair(soft(Field, 2), {look: KASHEM, e: 'smile'}, {look: POLASH, e: 'smile'}, {title: 'পাশাপাশি জমি', color: GOLD}),
  s02: Solo(soft(Field, 3), {look: KASHEM, e: 'serious', g: 'hold', hold: HandBox}, {title: 'সবার সাথে, একই সপ্তাহে', color: GOLD}),
  s03: R({place: soft(Field, 4, 'gold'), actors: [...crowd([140, 940], {h: 860, y: 1900, e: 'surprised'}), ...one(KASHEM, 'laugh')], over: popIn(<Melon size={400} />, 340, 450), title: 'বড়, চকচকে', color: GOLD}),
  s04: R({place: soft(<Avenue />, 3), actors: one(POLASH, 'neutral', 'hold', HandPaper), title: 'পলাশ ঢাকায়', color: GOLD}),
  s05: Pair(soft(Field, 4), {look: KASHEM, e: 'laugh', g: 'shrug', talk: true}, {look: Y2, e: 'laugh'}),
  s06: R({place: soft(Field, 3, 'gold'), title: 'চৈত্র: সব একসাথে পাকে', color: GOLD}),
  s07: R({place: soft(Field, 6, 'dusk'), actors: one(KASHEM, 'worried', 'shrug'), over: popIn(<Truck size={420} />, 330, 470), title: 'ট্রাক নেই, দাম নেই', color: RED}),
  s08: R({place: soft(<MelonField rot />, 2, 'dusk'), actors: one(KASHEM, 'sad'), title: 'অর্ধেক মাঠেই পচে', color: RED}),
  s09: R({place: soft(<Aisle />, 3, 'gold'), over: popIn(<Melon size={420} small />, 330, 760), title: 'রোজার প্রথম দিন', color: GREEN}),
  s10: R({place: soft(<Avenue />, 8, 'gold'), over: popIn(<Paper title="পলাশের খাতা" lines={['ক্রেতা: ঢাকার সুপারশপ', 'তারিখ: রোজার প্রথম দিন', 'ট্রাক: আগেই ঠিক']} size={46} w={740} />, 170, 460)}),
  s11: Glass('একজন ভেবেছে কীভাবে ফলাবে', {place: Field, tone: 'gold', sub: 'আরেকজন ভেবেছে কে কিনবে, কবে'}),
  act: Glass('শেষ দিনটা আগে লেখো', {place: Field, color: '#bff2c8', sub: 'তারপর পেছনে হাঁটো'}),
  ...ending(29, soft(<Parlour salon />, 14), [tag('চল্লিশ মিনিট, ঘাম', {bg: '#7a4a14'}), 'সেলিম বোঝায় কত কঠিন'], [tag('হেসে হেসে, দাম দ্বিগুণ', {bg: '#14532d'}), 'লাইন রনির দোকানে'], 'সহজ দেখানোর কৌশল'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ছোট তরমুজ, তিনগুণ দাম" l2="বড় তরমুজ মাঠেই পচল!" bottom="পার্থক্য শুধু পরিকল্পনায়" term="48 Laws · Law 29" art={<div style={{position: 'absolute', left: 60, top: 1180}}><Melon size={480} small /></div>} size={84} />
);
export const law29 = story('law29/', raw, SCENES, Thumb, {logo: 'bba2'});
