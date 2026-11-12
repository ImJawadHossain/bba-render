import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Avenue, Home, Rooftop, TeaCup} from '../common/places';
import {ELDER, Pair, R, Solo, Two, Y1, story} from '../common/reel';
import {HandBox} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {Plants} from '../common/elegant2';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MAJID: ToonLook = {...ELDER, top: '#e8e2d2'};
const HAMID: ToonLook = {...ELDER, top: '#c8d6a0', glasses: false};
const SON: ToonLook = {...Y1, top: '#2a5a8a'};
const GRANDSON: ToonLook = {...Y1, top: '#d94a6a', age: 0};
const House = <Home />;
const Dim = <Home dim />;
const Market = <Avenue />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Two(R({place: soft(Dim, 4, 'night'), actors: [at(MAJID, 'sad')], title: 'একজন বিছানায়', color: RED}), R({place: soft(Market, 3, 'gold'), actors: [at(HAMID, 'laugh', 'hold', 540, 1100, {holding: HandBox})], title: 'আরেকজন রোজ বাজারে', color: GREEN}), 0.5),
  s01: Pair(soft(House, 3), {look: SON, e: 'smile', g: 'open'}, {look: MAJID, e: 'smile'}, {title: 'এখন শুধু বিশ্রাম', color: GOLD}),
  s02: R({place: soft(House, 3), actors: [at(MAJID, 'neutral')], over: popIn(<TeaCup size={240} />, 420, 420), title: 'সব হাতের কাছে', color: GOLD}),
  s03: Solo(soft(Dim, 3, 'night'), {look: MAJID, e: 'blank'}, {title: 'কোনো কাজ নেই', color: RED}),
  s04: Solo(soft(House, 3, 'gold'), {look: HAMID, e: 'neutral'}, {title: 'ছোট ভাই হামিদ', color: GOLD}),
  s05: Pair(soft(House, 4), {look: HAMID, e: 'surprised'}, {look: SON, e: 'smile', g: 'explain', talk: true}),
  s06: R({place: soft(Market, 3, 'gold'), actors: [at(HAMID, 'laugh', 'explain', 380, 1080), at(GRANDSON, 'smile', 'idle', 800, 720)], title: 'বাজার, নাতি, দরদাম', color: GREEN}),
  s07: Solo(soft(Dim, 4, 'night'), {look: MAJID, e: 'sad'}, {title: 'মনটা ভেঙে গেছে', color: RED}),
  s08: R({place: soft(<Rooftop />, 3, 'gold'), actors: [at(HAMID, 'laugh', 'pointR', 380, 1080)], over: popIn(<Plants size={420} n={3} />, 600, 1300), title: 'ছাদের লাউ গোনেন', color: GREEN}),
  s09: Glass('একজন পেয়েছিলেন আরাম', {place: House, tone: 'gold', sub: 'আরেকজন, কারো দরকারে লাগার অনুভূতি'}),
  act: Glass('এমন একটা কাজ দাও', {place: House, color: '#bff2c8', sub: 'যা তাঁকে ছাড়া চলে না'}),
  ...outro('Ellen Langer ও Judith Rodin', 'বৃদ্ধনিবাসের গাছ', '১৯৭৬'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই মাসে অবসরে দুই ভাই" l2="দেড় বছরে একজন বিছানায়!" bottom="আরাম না, দরকার হওয়ার অনুভূতি" term="দায়িত্বের পরীক্ষা" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('শুধু বিশ্রাম?', {x: 0, y: 0, w: 520, bg: '#7a1f3a', size: 84})()}</div>} size={80} />
);
export const b13 = story('b13/', raw, SCENES, Thumb, {logo: 'bba2'});
