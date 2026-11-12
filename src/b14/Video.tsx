import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {Count, MOM, Pair, R, Solo, WOMAN, story} from '../common/reel';
import {Kitchen} from '../common/laws48';
import {Apartment, Glass, soft, sticker} from '../common/elegant';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const HASINA: ToonLook = {...MOM, top: '#8a5a3a', skirt: '#6a4a2a', age: 0.5};
const DOCTOR: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#f6f7f9', skirt: '#2a5a8a', bottom: '#2a5a8a', glasses: true, age: 0.35};
const House = <Home />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(<Kitchen />, 3), actors: [at(HASINA, 'worried', 'explain')], title: 'দিনে আট ঘণ্টা কাজ', color: GOLD}),
  h2: R({place: soft(House, 4, 'gold'), actors: [at(HASINA, 'laugh', 'thumbsUp')], over: sticker('কাজ একই, ওজন কম', {x: 190, y: 420, w: 700, bg: '#14532d', size: 74})}),
  s01: R({place: soft(<Apartment />, 3), actors: [at(HASINA, 'neutral', 'idle', 540, 1100)], title: 'তিন বাসায় কাজ', color: GOLD}),
  s02: Pair(soft(House, 3), {look: HASINA, e: 'worried'}, {look: DOCTOR, e: 'serious', g: 'explain'}, {title: 'ব্যায়াম করতে হবে', color: RED}),
  s03: Solo(soft(<Kitchen />, 4), {look: HASINA, e: 'skeptical', g: 'shrug', talk: true}),
  s04: Solo(soft(<Kitchen dim />, 4, 'night'), {look: HASINA, e: 'sad'}, {title: 'নিজেকে ভাবেন অলস', color: RED}),
  s05: Pair(soft(House, 3, 'gold'), {look: HASINA, e: 'neutral'}, {look: DOCTOR, e: 'smile', g: 'open'}, {title: 'একটা হিসাব', color: GOLD}),
  s06: Pair(soft(House, 4, 'gold'), {look: HASINA, e: 'surprised'}, {look: DOCTOR, e: 'smile', g: 'explain', talk: true}),
  s07: Solo(soft(<Kitchen />, 3, 'gold'), {look: HASINA, e: 'smile', g: 'thumbsUp'}, {title: 'এটা আমার ব্যায়াম', color: GREEN}),
  s08: R({place: soft(House, 4, 'gold'), actors: [at(HASINA, 'laugh', 'thumbsUp')], over: () => (
    <>
      {sticker('ওজন কম', {x: 240, y: 420, w: 600, bg: '#14532d', size: 80})()}
      {sticker('রক্তচাপ কম', {x: 240, y: 620, w: 600, bg: '#14532d', size: 80, at: 10})()}
    </>
  ), title: 'এক মাস পর', color: GREEN}),
  s09: Glass('বদলেছে শুধু', {place: House, tone: 'gold', sub: 'কাজটাকে দেখার চোখ'}),
  act: Glass('কঠিন কাজ শুধু বোঝা না', {place: <Kitchen />, color: '#bff2c8', sub: 'খোঁজো, এটা তোমার কী লাভ করছে'}),
  ...outro('Alia Crum ও Ellen Langer', 'Harvard, ৮৪ জন কর্মী', '২০০৭'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="সারাদিন খেটেও ওজন কমে না" l2="একটা কথায় এক মাসে কমল!" bottom="কাজ একই, বদলেছে চোখ" term="মনের শক্তির পরীক্ষা" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('কাজটাই ব্যায়াম', {x: 0, y: 0, w: 560, bg: '#14532d', size: 80})()}</div>} size={80} />
);
export const b14 = story('b14/', raw, SCENES, Thumb, {logo: 'bba2'});
