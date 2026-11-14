import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Book, PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {Count, MIDDLE, Pair, R, Solo, Y1, story} from '../common/reel';
import {HandPaper} from '../common/laws48';
import {Glass, Library, popIn, soft, sticker} from '../common/elegant';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RAFI: ToonLook = {...Y1, top: '#d9a21b', age: 0};
const FATHER: ToonLook = {...MIDDLE, kurta: false, top: '#6a8aa0', bottom: '#2a2c30'};
const Night = <Home dim />;
const House = <Home />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Night, 3, 'night'), actors: [at(RAFI, 'smile', 'hold', 540, 960, {holding: HandPaper})], title: 'দিনে দুইটা বই', color: GOLD}),
  h2: R({place: soft(Night, 5, 'night'), actors: [at(RAFI, 'blank', 'idle', 540, 960)], over: popIn(<Book size={260} color="#14305f" />, 400, 380), title: 'তিন মাস পর: একটাও না', color: RED}),
  s01: Solo(soft(Night, 2, 'night'), {look: RAFI, e: 'smile', g: 'hold', hold: HandPaper}, {title: 'টর্চ জ্বেলে বই', color: GOLD}),
  s02: Pair(soft(House, 3), {look: FATHER, e: 'laugh', g: 'explain', talk: true}, {look: RAFI, e: 'surprised'}, {over: sticker('প্রতি বই: বিশ টাকা', {x: 190, y: 420, w: 700, bg: '#14532d', size: 72})}),
  s03: Count(28, {post: 'টা বই', label: 'প্রথম মাসে', sub: 'পাঁচশো ষাট টাকা', size: 220, color: GREEN, place: soft(<Library />, 10)}),
  s04: Solo(soft(<Library />, 4), {look: RAFI, e: 'neutral', g: 'hold', hold: HandPaper}, {title: 'পাতলা বই, তাড়াহুড়ো', color: GOLD}),
  s05: Pair(soft(House, 4), {look: RAFI, e: 'laugh', g: 'open', talk: true}, {look: FATHER, e: 'neutral'}),
  s06: Solo(soft(House, 3, 'dusk'), {look: FATHER, e: 'worried', g: 'shrug'}, {title: 'অফার বন্ধ', color: RED}),
  s07: R({place: soft(Night, 4, 'night'), actors: [at(RAFI, 'blank', 'idle', 540, 960)], title: 'টর্চ আর জ্বলে না', color: RED}),
  s08: Pair(soft(House, 4), {look: RAFI, e: 'skeptical', g: 'shrug', talk: true}, {look: FATHER, e: 'shocked'}),
  s09: Glass('বিশ টাকা আনন্দকে চাকরি বানিয়েছে', {place: Night, tone: 'night', sub: 'বেতন বন্ধ, কাজও বন্ধ', size: 80}),
  act: Glass('টাকা না, পাশে বসো', {place: House, color: '#bff2c8', sub: 'গল্পটা নিয়ে কথা বলো'}),
  ...outro('Lepper, Greene ও Nisbett', 'Stanford University', '১৯৭৩'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="বই পড়লে বিশ টাকা" l2="তিন মাসে বই পড়াই বন্ধ!" bottom="পুরস্কার যেভাবে আগ্রহ মারে" term="পুরস্কারের পরীক্ষা" art={<div style={{position: 'absolute', left: 120, top: 1100}}><Book size={320} color="#14305f" /></div>} size={84} />
);
export const b02 = story('b02/', raw, SCENES, Thumb, {logo: 'bba2'});
