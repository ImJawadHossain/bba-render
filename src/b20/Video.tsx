import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Handi, Home} from '../common/places';
import {Count, MOM, Pair, R, Solo, WOMAN, story} from '../common/reel';
import {HandBox, Kitchen} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {Grocery} from '../common/elegant2';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const SALMA: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#c87a2a', skirt: '#c87a2a', bottom: '#c87a2a', age: 0.4};
const BUYER: ToonLook = {...MOM, top: '#2a6a5a', skirt: '#2a4a3a'};
const Cook = <Kitchen />;
const Shop = <Grocery />;
const pack = (t: string, bg: string) => sticker(t, {x: 150, y: 520, w: 780, bg, size: 70});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Shop, 5), over: pack('রেডি হালিম মিক্স: শুধু পানি দিন', '#7a4a14'), title: 'তবু পড়ে থাকে', color: RED}),
  h2: R({place: soft(Shop, 5, 'gold'), over: pack('নিজের মাংস দিন', '#14532d'), title: 'বিক্রি তিনগুণ', color: GREEN}),
  s01: R({place: soft(Cook, 3), actors: [at(SALMA, 'smile', 'hold', 540, 1100, {holding: HandBox})], title: 'সব এক প্যাকেটে', color: GOLD}),
  s02: R({place: soft(Shop, 4, 'cool'), actors: [at(BUYER, 'neutral', 'hold', 540, 1100, {holding: HandBox})], title: 'একবার কেনে, আর না', color: RED}),
  s03: Pair(soft(<Home />, 4), {look: SALMA, e: 'worried'}, {look: BUYER, e: 'skeptical', g: 'shrug', talk: true}),
  s04: Solo(soft(Cook, 4), {look: SALMA, e: 'thinking', g: 'think'}, {title: 'প্যাকেট থেকে মাংস বাদ', color: GOLD}),
  s05: R({place: soft(Shop, 5), over: pack('নিজের মাংস দিন, হালিম হবে আপনার হাতের', '#14532d')}),
  s06: R({place: soft(Cook, 4), actors: [at(BUYER, 'smile', 'explain', 380, 1080)], over: popIn(<Handi size={320} />, 620, 1180), title: 'কাজ বেড়েছে', color: GOLD}),
  s07: Count(3, {post: 'গুণ বিক্রি', label: 'তিন মাসে', size: 220, color: GREEN, place: soft(Shop, 10, 'gold')}),
  s08: Glass('মানুষ সবসময় সহজ চায় না', {place: Cook, tone: 'gold', sub: 'চায় একটু কাজ, যাতে নিজের মনে হয়'}),
  act: Glass('শেষ কাজটা ক্রেতার হাতে রাখো', {place: Shop, color: '#bff2c8', sub: 'সব রেডি করে দিও না'}),
  ...outro('Ernest Dichter', 'কেকের মিক্স, আমেরিকা', '১৯৫০-এর দশক', 'আসল ঘটনা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="রেডি হালিম মিক্স বিকোয় না" l2="কাজ বাড়াতেই বিক্রি তিনগুণ!" bottom="মানুষ সব সহজ চায় না" term="IKEA effect" art={<div style={{position: 'absolute', left: 120, top: 1100}}><Handi size={380} /></div>} size={80} />
);
export const b20 = story('b20/', raw, SCENES, Thumb, {logo: 'bba2'});
