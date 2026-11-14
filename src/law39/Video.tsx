import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Fair} from '../common/places2';
import {Count, ELDER, MIDDLE, Pair, R, Solo, Two, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, popIn, soft, tag} from '../common/elegant';
import {Bid, Ghat, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const MANNAN: ToonLook = {...MIDDLE, top: '#7a1f3a'};
const HASHEM: ToonLook = {...ELDER, top: '#e8e2d2'};
const River = <Ghat />;
const man = (expression: Expression, gesture: Gesture = 'idle', x = 290) => ({look: MANNAN, x, h: 1080, y: 1880, expression, gesture, lookX: x < 540 ? 1 : 0});
const bid = (amount: string, color: string = GOLD, label?: string) => R({place: soft(River, 5), actors: [man('serious', 'pointUp')], over: popIn(<Bid amount={amount} color={color} label={label} />, 230, 400)});
const hashem = (e: Expression, g: Gesture) => Pair(soft(River, 4), {look: MANNAN, e: 'serious'}, {look: HASHEM, e, g, talk: true});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(River, 3), actors: [man('laugh', 'thumbsUp', 540)], over: popIn(<Bid amount="৳৩০ লাখ" label="তিনগুণ দামে জয়" />, 230, 400)}),
  h2: R({place: soft(<Ghat dusk />, 3, 'dusk'), actors: [{look: HASHEM, x: 540, h: 1080, y: 1880, expression: 'smile', gesture: 'idle'}], over: popIn(<Bid amount="৳৮ লাখ" label="এক বছর পর" color={GREEN} />, 270, 400)}),
  s01: R({place: soft(River, 0), title: 'খেয়াঘাটের নিলাম', color: GOLD}),
  s02: Pair(soft(River, 3), {look: MANNAN, e: 'serious'}, {look: HASHEM, e: 'smile'}, {title: 'রাগী বনাম ঠান্ডা', color: GOLD}),
  s03: bid('৳১০ লাখ'),
  s04: hashem('smile', 'pointL'),
  s05: bid('৳১৫ লাখ'),
  s06: hashem('skeptical', 'shrug'),
  s07: bid('৳২০ লাখ', RED),
  s08: hashem('laugh', 'open'),
  s09: R({place: soft(River, 4, 'gold'), actors: [...crowd([140, 940], {h: 860, y: 1900, e: 'laugh'}), man('laugh', 'thumbsUp', 540)], over: popIn(<Bid amount="৳৩০ লাখ" color={RED} />, 230, 400)}),
  s10: Count(15, {post: ' লাখ', label: 'ঘাটের বছরের আয়', sub: 'হাশেম জানতেন', size: 220, color: RED, place: soft(River, 10, 'night')}),
  s11: Two(Solo(soft(River, 4, 'night'), {look: MANNAN, e: 'sad'}, {title: 'ধারে ডুবে', color: RED}), R({place: soft(<Ghat dusk />, 3, 'dusk'), actors: [{look: HASHEM, x: 540, h: 1080, y: 1880, expression: 'smile', gesture: 'idle'}], over: popIn(<Bid amount="৳৮ লাখ" color={GREEN} />, 270, 400)}), 0.5),
  s12: Glass('একজন লড়েছে মানুষের সাথে', {place: River, tone: 'gold', sub: 'আরেকজন লড়েছে তার রাগের সাথে'}),
  act: Glass('প্রতিপক্ষ রাগলে খুশি হও', {place: River, color: '#bff2c8', sub: 'নিজে কখনো রাগে দাম বলো না'}),
  ...ending(39, soft(<Fair />, 14), [tag('বিয়ের খরচ তিন লাখ', {bg: '#7a4a14'}), 'দেন চাচাতো ভাই'], [tag('দাম বিশ লাখ', {bg: '#7a1f3a'}), 'এক বছর পর'], 'বিনা পয়সার আসল দাম'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="তিনগুণ দামে ঘাট জিতল" l2="এক বছরে সব শেষ!" bottom="প্রতিপক্ষ বলেছিল তিনটা কথা" term="48 Laws · Law 39" art={<div style={{position: 'absolute', left: 60, top: 1160}}><Bid amount="৳৩০ লাখ" /></div>} size={84} />
);
export const law39 = story('law39/', raw, SCENES, Thumb, {logo: 'bba2'});
