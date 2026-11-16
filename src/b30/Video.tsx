import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {HoneyBottle} from '../common/places2';
import {Aisle} from '../common/places2';
import {MIDDLE, MOM, Pair, R, Solo, Two, Y3, story} from '../common/reel';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {Candy, Notes, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const NADIM: ToonLook = {...MIDDLE, kurta: false, top: '#14532d', bottom: '#2a2c30'};
const Shop = <Aisle />;
const goods = () => (
  <>
    {popIn(<HoneyBottle size={300} />, 200, 560)()}
    {popIn(<Candy size={300} />, 560, 620, 8)()}
  </>
);
const music = (label: string, color: string, bg: string) => () => (
  <>
    <Notes color={color} />
    {sticker(label, {x: 240, y: 420, w: 600, bg, size: 76})()}
  </>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: Two(R({place: soft(Shop, 6, 'gold'), over: music('বাউল গান: মধু', '#ffd98a', '#7a4a14')}), R({place: soft(Shop, 6, 'cool'), over: music('ইংরেজি গান: চকলেট', '#9fd3ff', '#14305f')}), 0.5),
  h2: Pair(soft(Shop, 4), {look: Y3, e: 'skeptical', g: 'shrug'}, {look: MOM, e: 'skeptical'}, {title: 'গান? শুনিইনি!', color: RED}),
  s01: R({place: soft(Shop, 6), over: goods, title: 'পাশাপাশি মধু আর চকলেট', color: GOLD}),
  s02: Solo(soft(Shop, 3), {look: NADIM, e: 'thinking', g: 'pointUp'}, {title: 'বাউল বনাম পপ', color: GOLD}),
  s03: Two(R({place: soft(Shop, 8, 'gold'), over: music('মধু: প্রায় তিনগুণ', '#ffd98a', '#14532d')}), R({place: soft(Shop, 8, 'cool'), over: music('চকলেট এগিয়ে', '#9fd3ff', '#14305f')}), 0.5),
  s04: Solo(soft(Shop, 3), {look: NADIM, e: 'neutral', g: 'explain', talk: true}, {title: 'কেন কিনলেন?', color: GOLD}),
  s05: Solo(soft(Shop, 4, 'gold'), {look: Y3, e: 'smile', g: 'shrug', talk: true}),
  s06: Solo(soft(Shop, 4, 'cool'), {look: MOM, e: 'smile', g: 'open', talk: true}),
  s07: R({place: soft(Shop, 8), over: () => <Notes />, title: 'গান বদলালে বিক্রি বদলায়', color: GREEN}),
  s08: Glass('মানুষ ভাবে, সে নিজে বাছছে', {place: Shop, tone: 'gold', sub: 'আসলে কানের পেছনের গান হাত টানছে'}),
  act: Glass('গান, আলো, গন্ধ ভেবে বাছো', {place: Shop, color: '#bff2c8', sub: 'কেনার আগে ভাবো, কী টানছে'}),
  ...outro('Adrian North', 'University of Leicester', '১৯৯৭'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="বাউল বাজলে মধু, পপ বাজলে চকলেট" l2="ক্রেতারা বলে, গান শুনিইনি!" bottom="কানের পেছনের বিক্রয়কর্মী" term="দোকানের গানের পরীক্ষা" art={<div style={{position: 'absolute', left: 100, top: 1100}}><HoneyBottle size={360} /></div>} size={76} />
);
export const b30 = story('b30/', raw, SCENES, Thumb, {logo: 'bba2'});
