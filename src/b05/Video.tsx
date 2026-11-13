import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {PriceTag} from '../common/places';
import {HoneyBottle} from '../common/places2';
import {MIDDLE, Pair, R, Solo, Y2, Y3, story} from '../common/reel';
import {HandBox, HandPaper} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {Grocery} from '../common/elegant2';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const ALAMGIR: ToonLook = {...MIDDLE, kurta: false, top: '#5a7a3a', bottom: '#2a2c30'};
const MILON: ToonLook = {...Y2, top: '#d9a21b'};
const Shop = <Grocery />;
const Honey: React.FC = () => (
  <div style={{display: 'flex', gap: 20}}>
    {[0, 1, 2, 3].map((i) => (
      <HoneyBottle key={i} size={240} />
    ))}
  </div>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Shop, 6), over: () => (
    <>
      {popIn(<Honey />, 230, 640)()}
      {popIn(<PriceTag text="৳৮০০ → ৳১৬০০" color="#ff8a8a" size={80} />, 190, 440, 10)()}
    </>
  )}),
  h2: R({place: soft(Shop, 6, 'gold'), over: sticker('এক দিনে সব শেষ', {x: 190, y: 560, w: 700, bg: '#14532d', size: 80}), title: 'তিন মাস পড়ে ছিল', color: GOLD}),
  s01: R({place: soft(Shop, 2), actors: [at(ALAMGIR, 'smile')], over: popIn(<PriceTag text="কেজি ৮০০ টাকা" />, 300, 420)}),
  s02: Pair(soft(Shop, 3), {look: Y3, e: 'skeptical', g: 'hold', hold: HandBox}, {look: ALAMGIR, e: 'worried'}, {title: 'তুলে দেখে, রেখে দেয়', color: GOLD}),
  s03: R({place: soft(Shop, 8), over: popIn(<Paper title="চিরকুট" lines={['মধুর দাম', 'অর্ধেক করে দিও']} size={60} w={600} />, 240, 480)}),
  s04: Solo(soft(Shop, 3), {look: MILON, e: 'neutral', g: 'hold', hold: HandPaper}, {over: popIn(<PriceTag text="৳১৬০০" color="#ff8a8a" size={96} />, 330, 400), title: 'অর্ধেক না, দ্বিগুণ', color: RED}),
  s05: R({place: soft(Shop, 3, 'dusk'), actors: [at(ALAMGIR, 'shocked')], title: 'তাক খালি!', color: GREEN}),
  s06: Pair(soft(Shop, 4), {look: ALAMGIR, e: 'shocked', g: 'open', talk: true}, {look: MILON, e: 'neutral'}),
  s07: Pair(soft(Shop, 4, 'gold'), {look: ALAMGIR, e: 'surprised'}, {look: MILON, e: 'laugh', g: 'explain', talk: true}),
  s08: Glass('একই মধু, একই বোতল', {place: Shop, tone: 'gold', sub: 'বদলেছে শুধু দামের লেখা'}),
  act: Glass('মানের সাথে মানানসই দাম', {place: Shop, color: '#bff2c8', sub: 'খুব সস্তা মানে সন্দেহ'}),
  ...outro('Robert Cialdini', 'বই: Influence', '১৯৮৪', 'আসল ঘটনা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ভুল করে দাম দ্বিগুণ" l2="এক দিনে সব মধু শেষ!" bottom="দাম দেখেই মান বিচার" term="দামের মনস্তত্ত্ব" art={<div style={{position: 'absolute', left: 60, top: 1100}}><Honey /></div>} size={84} />
);
export const b05 = story('b05/', raw, SCENES, Thumb, {logo: 'bba2'});
