import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {PriceTag} from '../common/places';
import {ShopFront} from '../common/places2';
import {Count, MIDDLE, Pair, R, Y1, Y3, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Banner, Glass, popIn, soft, sticker} from '../common/elegant';
import {outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const SHAMIM: ToonLook = {...MIDDLE, kurta: false, top: '#8a3a3a', bottom: '#2a2c30'};
const RATUL: ToonLook = {...Y1, top: '#2a5a8a'};
const Shop = <ShopFront name="শামীম সুজ" signBg="#7a4a14" />;
const sale = popIn(<Banner text="পঞ্চাশ ভাগ ছাড়" sub="সারা বছর" />, 110, 520);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Shop, 3), over: sticker('ছাড় নেই, শুধু আসল দাম', {x: 110, y: 560, w: 860, bg: '#14532d', size: 66})}),
  h2: Count(50, {post: '%', label: 'তিন মাসে বিক্রি কমে', size: 240, color: RED, place: soft(Shop, 10)}),
  s01: R({place: soft(Shop, 2), over: sale}),
  s02: R({place: soft(Shop, 6), over: popIn(<PriceTag text="৳২০০০ → ৳১০০০" size={86} />, 170, 600), title: 'আগে দ্বিগুণ, তারপর অর্ধেক', color: GOLD}),
  s03: Pair(soft(Shop, 4), {look: RATUL, e: 'serious', g: 'explain', talk: true}, {look: SHAMIM, e: 'skeptical'}),
  s04: R({place: soft(Shop, 4, 'gold'), over: popIn(<PriceTag text="আসল দাম ৳৯০০" color="#bff2c8" size={86} rot={0} />, 190, 600), title: 'কোনো ছাড় নেই', color: GREEN}),
  s05: R({place: soft(Shop, 4, 'cool'), actors: crowd([200, 880], {h: 960, y: 1890, e: 'skeptical'}), title: 'দাম দেখে, চলে যায়', color: RED}),
  s06: Pair(soft(Shop, 4), {look: SHAMIM, e: 'worried'}, {look: Y3, e: 'skeptical', g: 'shrug', talk: true}),
  s07: R({place: soft(Shop, 3), over: sale, title: 'আবার ফিরে আসে', color: GOLD}),
  s08: Glass('মানুষ জুতা কেনে না', {place: Shop, tone: 'gold', sub: 'কেনে জেতার অনুভূতি'}),
  act: Glass('দেখাও, সে কোথায় জিতছে', {place: Shop, color: '#bff2c8', sub: 'শুধু সংখ্যা যথেষ্ট না'}),
  ...outro('JCPenney', 'আমেরিকার দোকান', '২০১২', 'আসল ঘটনা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ভুয়া ছাড় তুলে সৎ দাম" l2="তিন মাসে বিক্রি অর্ধেক!" bottom="মানুষ আসলে কী কেনে" term="দামের মনস্তত্ত্ব" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('পঞ্চাশ ভাগ ছাড়', {x: 0, y: 0, w: 580, bg: '#c0304a', size: 76})()}</div>} size={84} />
);
export const b06 = story('b06/', raw, SCENES, Thumb, {logo: 'bba2'});
