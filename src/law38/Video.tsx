import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall} from '../common/places';
import {Fair, Village} from '../common/places2';
import {Pair, R, Solo, Two, Y2, Y3, story} from '../common/reel';
import {HandPaper, crowd} from '../common/laws48';
import {Glass, popIn, soft, tag} from '../common/elegant';
import {Bid, Chicken, Farm, Ghat, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const SABBIR: ToonLook = {...Y2, top: '#1a1c22', jacket: '#3a3e48'};
const TUHIN: ToonLook = {...Y3, top: '#e8e2d2', bottom: '#2a5a3a'};
const mid = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle') => ({look, x: 540, h: 1100, y: 1880, expression, gesture});

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(soft(<Farm />, 3), {look: SABBIR, e: 'smile'}, {look: TUHIN, e: 'smile'}, {title: 'একই খামার, দুজন', color: GOLD}),
  h2: Two(R({place: soft(<Farm open night />, 3, 'night'), title: 'খাঁচা খোলা', color: RED}), R({place: soft(<Farm night />, 3, 'night'), actors: crowd([200, 880], {h: 960, y: 1890, e: 'serious'}), title: 'গ্রামই পাহারা দেয়', color: GREEN}), 0.5),
  s01: R({place: soft(<Farm />, 2), actors: [mid(SABBIR, 'smile', 'thumbsUp')], title: 'সব চলে যন্ত্রে', color: GOLD}),
  s02: Solo(soft(<ChaiStall />, 4), {look: SABBIR, e: 'skeptical', g: 'pointUp', talk: true}),
  s03: R({place: soft(<Fair />, 4), actors: [...crowd([150, 930], {h: 880, y: 1900, e: 'skeptical'}), mid(SABBIR, 'skeptical', 'shrug')], title: 'গ্রাম চুপ', color: RED}),
  s04: R({place: soft(<Farm open night />, 2, 'night'), over: popIn(<Chicken size={240} />, 740, 1480), title: 'সকালে অর্ধেক মুরগি নেই', color: RED}),
  s05: Solo(soft(<Village />, 2), {look: TUHIN, e: 'smile', g: 'hold', hold: HandPaper}, {title: 'একই প্ল্যান', color: GOLD}),
  s06: R({place: soft(<ChaiStall />, 3), actors: [...crowd([170, 910], {h: 940, y: 1890, e: 'laugh'}), mid(TUHIN, 'laugh')], title: 'ছয় মাস: শুধু মেশা', color: GOLD}),
  s07: R({place: soft(<Farm />, 2, 'gold'), actors: [mid(TUHIN, 'smile', 'thumbsUp')], title: 'তারপর ঠিক একই খামার', color: GOLD}),
  s08: R({place: soft(<Farm night />, 3, 'night'), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900, e: 'serious'}), title: 'রাতে পালা করে পাহারা', color: GREEN}),
  s09: Glass('আলাদা চললে পর', {place: <Village />, tone: 'gold', sub: 'সবার মতো চললে আপন'}),
  act: Glass('আগে মেশো', {place: <Village />, color: '#bff2c8', sub: 'তারপর চুপচাপ নিজের কাজ'}),
  ...ending(38, soft(<Ghat />, 14), [<Bid amount="৳৩০ লাখ" label="তিনগুণ দামে জয়" />, 'মান্নান জেতে ঘাট'], [tag('এক বছর পর, আট লাখে', {bg: '#14532d'}), 'ঘাট যায় হাশেমের হাতে'], 'রাগিয়ে জেতার কৌশল'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই খামার, দুই বিদেশফেরত" l2="একজনের খাঁচা খুলে দিল কেউ!" bottom="আরেকজনকে পাহারা দিল গ্রাম" term="48 Laws · Law 38" art={<div style={{position: 'absolute', left: 100, top: 1160}}><Chicken size={360} /></div>} size={78} />
);
export const law38 = story('law38/', raw, SCENES, Thumb, {logo: 'bba2'});
