import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall} from '../common/places';
import {MIDDLE, R, Solo, Two, story} from '../common/reel';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {StampCard, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const BABUL: ToonLook = {...MIDDLE, top: '#e8e2d2'};
const JASIM: ToonLook = {...MIDDLE, kurta: false, top: '#2a7a4a', bottom: '#2a2c30'};
const Stall = <ChaiStall />;
const blank = popIn(<StampCard total={8} filled={0} name="বাবুল টি স্টল" />, 160, 520);
const given = popIn(<StampCard total={10} filled={2} name="জসিম চা ঘর" />, 160, 480);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Stall, 6), over: sticker('আট কাপে এক কাপ ফ্রি', {x: 150, y: 600, w: 780, bg: '#14305f', size: 72})}),
  h2: Two(R({place: soft(Stall, 8), over: blank}), R({place: soft(Stall, 8, 'gold'), over: given}), 0.5),
  s01: Two(Solo(soft(Stall, 2), {look: BABUL, e: 'smile'}), Solo(soft(Stall, 2, 'gold'), {look: JASIM, e: 'smile'}), 0.5),
  s02: R({place: soft(Stall, 8), over: blank, title: 'আট ঘর, সব খালি', color: GOLD}),
  s03: R({place: soft(Stall, 8, 'gold'), over: given, title: 'দশ ঘর, দুইটা আগেই', color: GREEN}),
  s04: Solo(soft(Stall, 3, 'gold'), {look: JASIM, e: 'laugh', g: 'open', talk: true}),
  s05: Glass('হিসাবে একই', {place: Stall, tone: 'cool', sub: 'দুই দোকানেই আট কাপ কিনতে হবে'}),
  s06: Two(R({place: soft(Stall, 6), over: sticker('পাঁচজনে একজন', {x: 190, y: 600, w: 700, bg: '#7a1f3a', size: 80}), title: 'বাবুলের কার্ড', color: RED}), R({place: soft(Stall, 6, 'gold'), over: sticker('তিনজনে একজন', {x: 190, y: 600, w: 700, bg: '#14532d', size: 80}), title: 'জসিমের কার্ড', color: GREEN}), 0.5),
  s07: Glass('শুরু হয়ে গেছে মনে হলে', {place: Stall, tone: 'gold', sub: 'মানুষ শেষ করতে ছোটে'}),
  act: Glass('প্রথম ধাপটা নিজে করে দাও', {place: Stall, color: '#bff2c8', sub: 'তারপর দেখাও সে কতটা এগিয়ে'}),
  ...outro('Joseph Nunes ও Xavier Drèze', 'গাড়ি ধোয়ার দোকানের কার্ড', '২০০৬'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দুই চায়ের দোকানে একই অফার" l2="একটায় শেষ করে দ্বিগুণ মানুষ!" bottom="পার্থক্য দুইটা ফ্রি সিল" term="এগিয়ে থাকার কৌশল" art={<div style={{position: 'absolute', left: 30, top: 1120}}><StampCard total={10} filled={2} name="জসিম চা ঘর" w={620} /></div>} size={80} />
);
export const b21 = story('b21/', raw, SCENES, Thumb, {logo: 'bba2'});
