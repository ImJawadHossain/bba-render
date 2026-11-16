import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall} from '../common/places';
import {Count, ELDER, R, Solo, Two, Y1, Y3, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, soft, sticker} from '../common/elegant';
import {Ghat} from '../common/elegant2';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MUROBBI: ToonLook = {...ELDER, top: '#f2efe6'};
const TUHIN: ToonLook = {...Y1, top: '#2a7a4a'};
const RAJU: ToonLook = {...Y3, top: '#c0602a'};
const Pond = <Ghat />;
const ten = (e: 'neutral' | 'laugh' | 'skeptical' = 'neutral') => crowd([100, 280, 460, 640, 820, 990], {h: 760, y: 1900, e});
const pair = (e: 'serious' | 'laugh') => [at(TUHIN, e, 'explain', 300, 1060), at(RAJU, e, 'explain', 780, 1060)];

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Pond, 3, 'dusk'), actors: ten('skeptical'), title: 'দশজন, এক দিনেও না', color: RED}),
  h2: R({place: soft(Pond, 2, 'gold'), actors: pair('laugh'), title: 'দুইজন, তিন ঘণ্টায়', color: GREEN}),
  s01: Solo(soft(Pond, 3), {look: MUROBBI, e: 'serious', g: 'pointR'}, {title: 'শ্যাওলায় পিচ্ছিল ঘাট', color: GOLD}),
  s02: R({place: soft(Pond, 3), actors: ten(), title: 'শুক্রবার, দশজন', color: GOLD}),
  s03: Two(R({place: soft(Pond, 4), actors: ten('laugh'), title: 'একজন খাটে, তিনজন দেখে', color: RED}), R({place: soft(<ChaiStall />, 4), actors: crowd([300, 780], {h: 960, y: 1890, e: 'laugh'}), title: 'চা আনতে গিয়ে উধাও', color: RED}), 0.55),
  s04: Glass('এতজন আছে', {place: Pond, tone: 'cool', sub: 'আমি একটু কম করলে কী হয়?'}),
  s05: R({place: soft(Pond, 4, 'dusk'), title: 'সন্ধ্যায় অর্ধেক পরিষ্কার', color: RED}),
  s06: Count(2, {post: ' জন', label: 'নাম ধরে ডাকা', size: 240, color: GREEN, place: soft(Pond, 10)}),
  s07: Solo(soft(Pond, 3), {look: MUROBBI, e: 'serious', g: 'explain', talk: true}),
  s08: R({place: soft(Pond, 2, 'gold'), actors: pair('laugh'), title: 'তিন ঘণ্টায় ঝকঝকে', color: GREEN}),
  s09: Glass('দশজনের ভিড়ে', {place: Pond, tone: 'gold', sub: 'প্রত্যেকে লুকাতে পারে'}),
  act: Glass('নাম ধরে, নির্দিষ্ট কাজ', {place: Pond, color: '#bff2c8', sub: 'আর বলে দাও কখন দেখবে'}),
  ...outro('Max Ringelmann', 'দড়ি টানার পরীক্ষা, ফ্রান্স', '১৯১৩'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দশজনে যা পারেনি" l2="দুইজনে করল তিন ঘণ্টায়!" bottom="দল বড় হলে কাজ কম" term="Ringelmann effect" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('১০ < ২', {x: 0, y: 0, w: 440, bg: '#7a1f3a', size: 110})()}</div>} size={84} />
);
export const b16 = story('b16/', raw, SCENES, Thumb, {logo: 'bba2'});
