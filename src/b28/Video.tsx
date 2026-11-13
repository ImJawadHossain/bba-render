import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {MOM, Pair, R, SIR, Solo, Two, Y1, story} from '../common/reel';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {Ward, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RASHED: ToonLook = {...SIR, top: '#f6f7f9', jacket: '#f6f7f9', tie: '#14305f'};
const KARIM: ToonLook = {...SIR, top: '#f6f7f9', jacket: '#f6f7f9', tie: '#2a7a4a', hairStyle: 'short', glasses: false};
const SON: ToonLook = {...Y1, top: '#5a5f6e'};
const W = <Ward />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Solo(soft(W, 3, 'gold'), {look: KARIM, e: 'smile', g: 'open'}, {title: 'ভুল করেও অভিযোগ নেই', color: GREEN}),
  h2: R({place: soft(W, 5, 'cool'), actors: [{look: RASHED, x: 540, h: 1100, y: 1880, expression: 'serious' as const, gesture: 'idle' as const}], over: popIn(<Paper title="মামলা" lines={['বাদী: রোগীর পরিবার']} size={50} w={520} />, 280, 420)}),
  s01: Two(Solo(soft(W, 2), {look: RASHED, e: 'serious'}, {title: 'শহরের সেরা হাত', color: GOLD}), Solo(soft(W, 2, 'gold'), {look: KARIM, e: 'smile'}, {title: 'সাধারণ সার্জন', color: GOLD}), 0.5),
  s02: Pair(soft(W, 3, 'cool'), {look: MOM, e: 'worried'}, {look: RASHED, e: 'neutral', g: 'hold'}, {title: 'চোখ কাগজে', color: RED}),
  s03: Pair(soft(W, 4, 'cool'), {look: MOM, e: 'worried'}, {look: RASHED, e: 'skeptical', g: 'shrug', talk: true}),
  s04: Pair(soft(W, 3, 'gold'), {look: MOM, e: 'smile'}, {look: KARIM, e: 'smile', g: 'explain'}, {over: sticker('তিন মিনিট বেশি', {x: 240, y: 420, w: 600, bg: '#14532d', size: 80})}),
  s05: Solo(soft(W, 4, 'cool'), {look: KARIM, e: 'worried'}, {title: 'ছোট ভুল, আবার সেলাই', color: RED}),
  s06: Pair(soft(W, 4, 'gold'), {look: MOM, e: 'sad', g: 'open', talk: true}, {look: KARIM, e: 'sad'}),
  s07: Solo(soft(W, 3), {look: RASHED, e: 'neutral'}, {title: 'অপারেশন নিখুঁত', color: GREEN}),
  s08: Pair(soft(W, 4, 'night'), {look: SON, e: 'serious', g: 'pointR', talk: true}, {look: RASHED, e: 'surprised'}),
  s09: Glass('মানুষ ভুলের জন্য মামলা করে না', {place: W, tone: 'cool', sub: 'করে অবহেলার জন্য'}),
  act: Glass('তিনটা মিনিট বেশি দাও', {place: W, color: '#bff2c8', sub: 'নাম ধরে ডাকো, প্রশ্নের উত্তর দাও'}),
  ...outro('Nalini Ambady', 'Harvard, সার্জনদের গলার সুর', '২০০২'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ভুল করেও অভিযোগ নেই" l2="ভুল না করেও মামলা!" bottom="দক্ষতার চেয়ে বড় একটা জিনিস" term="তিন মিনিটের গবেষণা" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('তিন মিনিট বেশি', {x: 0, y: 0, w: 540, bg: '#14532d', size: 80})()}</div>} size={84} />
);
export const b28 = story('b28/', raw, SCENES, Thumb, {logo: 'bba2'});
