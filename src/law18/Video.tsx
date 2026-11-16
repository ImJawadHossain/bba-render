import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall, HandCup} from '../common/places';
import {Village} from '../common/places2';
import {CAST} from '../common/cast';
import {Cta, MIDDLE, Pair, R, Solo, Y3, lawBook, story} from '../common/reel';
import {Next, NextBadge, crowd} from '../common/laws48';
import {Fortress, Glass, Goat, HouseWall, popIn, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MANNAN: ToonLook = {...MIDDLE, top: '#f2efe6', glasses: true};
const RAHIM: ToonLook = {...Y3, top: '#7a6a4a'};
const GUARD: ToonLook = {...CAST.worker, skin: '#c98d62', top: '#2a3a5a', bottom: '#2a3a5a'};
const Day = <Fortress />;
const Night = <Fortress night />;
const Vil = <Village />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Day), title: 'দশ ফুট উঁচু দেয়াল', color: GOLD}),
  h2: R({place: soft(Night, 0, 'night'), title: 'চিৎকার শুনেও কেউ আসে না', color: RED}),
  s01: Solo(soft(Day, 2), {look: MANNAN, e: 'smile', g: 'open'}, {title: 'মান্নান সাহেবের বিশাল বাড়ি', color: GOLD}),
  s02: R({place: soft(Day, 1), actors: [{look: GUARD, x: 300, h: 900, y: 1880, expression: 'serious', gesture: 'idle', lookX: 1}, {look: GUARD, x: 780, h: 900, y: 1880, expression: 'serious', gesture: 'idle', lookX: -1}], title: 'কাঁটাতার, দুজন দারোয়ান', color: GOLD}),
  s03: R({place: soft(<ChaiStall />, 4, 'dusk'), actors: crowd([200, 540, 880], {h: 900, y: 1900, e: 'laugh'}).map((a) => ({...a, gesture: 'hold' as const, holding: HandCup})), title: 'আড্ডায় নেই, বিয়েতে নেই', color: GOLD}),
  s04: Pair(soft(<ChaiStall />, 4, 'dusk'), {look: CAST.customer, e: 'skeptical', g: 'shrug', talk: true}, {look: CAST.customer2, e: 'neutral', hold: HandCup}),
  s05: R({place: soft(Night, 2, 'night'), title: 'এক বর্ষার রাত', color: GOLD}),
  s06: Solo(soft(Night, 5, 'night'), {look: MANNAN, e: 'shocked', g: 'open'}, {near: true, title: 'চিৎকার', color: RED}),
  s07: Pair(soft(Vil, 5, 'night'), {look: CAST.customer, e: 'worried', g: 'shrug', talk: true}, {look: CAST.worker, e: 'worried', g: 'open', talk: true}),
  s08: R({place: soft(Vil, 6, 'night'), title: 'কেউ বের হয় না', color: RED}),
  s09: Solo(soft(Day, 3, 'cool'), {look: MANNAN, e: 'sad'}, {title: 'সকালে বাড়ি ফাঁকা', color: RED}),
  s10: R({place: soft(Vil, 2), actors: [{look: RAHIM, x: 300, h: 1000, y: 1880, expression: 'worried', gesture: 'open', lookX: 1}], over: popIn(<Goat size={380} />, 560, 1100), title: 'গরিব রহিমের ছাগল', color: GOLD}),
  s11: R({place: soft(Vil, 1), actors: [{look: RAHIM, x: 540, h: 960, y: 1800, expression: 'laugh', gesture: 'thumbsUp'}, ...crowd([110, 300, 780, 970], {h: 820, y: 1900, e: 'laugh'}).map((a) => ({...a, gesture: 'pointUp' as const}))], over: popIn(<Goat size={300} />, 380, 1230), title: 'আধা ঘণ্টায় ফেরত', color: GREEN}),
  s12: Glass('দেয়াল চোর আটকায় না, মানুষ আটকায়', {place: Night, tone: 'night', size: 92}),
  book: lawBook(18),
  lesson: R({bg: 'plain'}),
  act: Glass('যত বড়ই হও, মানুষের মাঝে থাকো', {place: Vil, color: '#bff2c8'}),
  next: Next(19, tag('অবসরের টাকায় দোতলা', {w: 800, bg: '#14305f', size: 66}), {title: 'বুড়ো শিক্ষককে ঠকানো', place: soft(<HouseWall crack />, 14)}),
  next2: Next(19, tag('জেলায় কাজ বন্ধ', {w: 600, bg: '#7a1f3a', size: 80}), {title: 'এক মাস পর', place: soft(<HouseWall crack />, 14)}),
  next3: Next(19, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'কাকে ছোট ভাবছ?', place: soft(<HouseWall crack />, 14)}),
  cta: () => (
    <Cta>
      <NextBadge law={19} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দশ ফুট দেয়াল, দুই দারোয়ান" l2="চিৎকারে কেউ আসে না!" bottom="ছাগলের জন্য পুরো গ্রাম" term="48 Laws · Law 18" art={<div style={{position: 'absolute', left: 60, top: 1200}}><Goat size={460} /></div>} size={80} />
);
export const law18 = story('law18/', raw, SCENES, Thumb, {logo: 'bba2'});
