import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP, pick} from '../common/kit';
import {PsyThumb, a} from '../common/psy';
import {Counter, HandCup, Home, PriceTag, SareePile, SareeShop, Taka, TeaCup} from '../common/places';
import {BookScene, Bounce, Card, Count, Cta, R, Slam} from '../common/reel';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const sareeFallback = makeFallback(segs);

const RUMANA: ToonLook = {skin: '#e0ac86', hair: '#2a1a12', hairStyle: 'long', top: '#3a6aa8', skirt: '#2a3a5a', bottom: '#2a3a5a'};
const SELLER: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'receding', top: '#f2efe6', kurta: true, bottom: '#e6e2d6', mustache: true, age: 0.35};
const MOM: ToonLook = {skin: '#d6a07c', hair: '#6a5a4a', hairStyle: 'hijab', top: '#7a4a6a', skirt: '#5a3a4a', age: 0.6};
const BOY: ToonLook = {skin: '#b87a52', hair: '#1a1410', hairStyle: 'short', top: '#d9822b', bottom: '#2f3440'};

const Shop = <SareeShop />;

// শাড়ির স্তূপ সময়ের সাথে উঁচু হয়
const Growing: React.FC<{from: number; to: number; dur: number}> = ({from, to, dur}) => {
  const f = useCurrentFrame();
  return <SareePile n={interpolate(f, [2, dur * 0.85], [from, to], clampOpts)} />;
};

const SCENES: Record<string, React.FC<SP>> = {
  tea: Slam('১০ টাকার চা = ১২,০০০ টাকা!', {size: 112, top: 500, color: RED, place: Shop, back: () => <div style={{position: 'absolute', left: 330, top: 870}}><TeaCup size={420} /></div>}),
  dislike: R({place: Shop, actors: [a(RUMANA, 540, 'sad', 'idle', {h: 1260, y: 1880})], title: 'পছন্দই হয়নি', color: RED}),
  just: R({place: Shop, actors: [a(RUMANA, 540, 'smile', 'idle', {h: 1200, y: 1860})], title: 'শুধু দেখতে এসেছিল', color: GOLD}),
  stop: R({place: Shop, actors: [a(RUMANA, 280, 'neutral', 'idle', {h: 1100, y: 1840, lookX: 1}), a(SELLER, 790, 'smile', 'idle', {h: 1120, y: 1840, lookX: -1})]}),
  sit: R({place: Shop, actors: [a(RUMANA, 280, 'surprised', 'idle', {h: 1100, y: 1840, lookX: 1}), a(SELLER, 790, 'laugh', 'open', {h: 1120, y: 1840, lookX: -1, talking: true})]}),
  came: R({place: Shop, actors: [a(RUMANA, 300, 'smile', 'hold', {h: 1040, holding: HandCup, lookX: 1}), a(SELLER, 780, 'smile', 'idle', {h: 1020, lookX: -1})], front: () => <Counter top={1400} />, over: () => <Bounce x={420} y={1180} at={6}><TeaCup size={220} /></Bounce>}),
  open: ({dur, id}) => R({place: Shop, actors: [a(SELLER, 540, 'smile', 'open', {h: 1020, talking: true})], front: (_, d) => <><Counter top={1400} /><Growing from={1} to={22} dur={d} /></>})({dur, id}),
  covered: ({dur, id}) => R({place: Shop, actors: [a(SELLER, 540, 'worried', 'open', {h: 1020, talking: true})], front: () => <><Counter top={1400} /><SareePile n={28} /></>, title: 'পুরো কাউন্টার শাড়িতে', color: GOLD})({dur, id}),
  up: R({place: Shop, actors: [a(RUMANA, 540, 'neutral', 'hold', {h: 1180, y: 1860, holding: HandCup})], title: 'চা শেষ', color: GOLD}),
  uneasy: R({place: Shop, actors: [a(RUMANA, 540, 'worried', 'idle', {h: 1440, y: 2000})], title: 'অদ্ভুত অস্বস্তি', color: RED}),
  guilt: R({place: Shop, actors: [a(RUMANA, 280, 'worried', 'think', {h: 1040, y: 1800}), a(SELLER, 780, 'smile', 'open', {h: 1040, y: 1800, lookX: -1})], front: () => <><Counter top={1560} /><SareePile n={14} y={1500} /></>, title: 'কিছু না কিনে চলে যাব?', size: 78, color: GOLD}),
  points: R({place: Shop, actors: [a(RUMANA, 300, 'sad', 'pointR', {h: 1060, lookX: 1}), a(SELLER, 790, 'laugh', 'idle', {h: 1040, lookX: -1})], front: () => <Counter top={1400} />}),
  price: R({place: Shop, actors: [a(SELLER, 560, 'smile', 'open', {h: 1280, y: 1890, talking: true})], over: () => <Bounce x={300} y={1000} at={4}><PriceTag text="৳ ১২,০০০" size={110} color={GOLD} /></Bounce>}),
  pay: R({place: Shop, actors: [a(RUMANA, 300, 'sad', 'idle', {h: 1060, lookX: 1}), a(SELLER, 790, 'laugh', 'thumbsUp', {h: 1040, lookX: -1})], front: () => <Counter top={1400} />, over: () => <><Bounce x={360} y={1240} at={4}><Taka w={280} rot={-8} /></Bounce><Bounce x={470} y={1320} at={9} seed="t2"><Taka w={280} rot={6} /></Bounce></>}),
  home: R({place: <Home />, actors: [a(RUMANA, 280, 'neutral', 'idle', {h: 1100, y: 1840, lookX: 1}), a(MOM, 790, 'neutral', 'idle', {h: 1080, y: 1840, lookX: -1})]}),
  mom: R({place: <Home />, actors: [a(RUMANA, 280, 'worried', 'idle', {h: 1100, y: 1840, lookX: 1}), a(MOM, 790, 'skeptical', 'open', {h: 1080, y: 1840, lookX: -1, talking: true})]}),
  noAns: R({place: <Home dim />, actors: [a(RUMANA, 540, 'blank', 'idle', {h: 1380, y: 1960})]}),
  shopBack: R({place: Shop, actors: [a(SELLER, 690, 'laugh', 'idle', {h: 1120, y: 1840, lookX: -1}), a(BOY, 280, 'neutral', 'idle', {h: 960, y: 1840, lookX: 1})]}),
  again: R({place: Shop, actors: [a(SELLER, 560, 'wink', 'pointL', {h: 1280, y: 1890, talking: true, lookX: -0.4})], over: () => <Bounce x={90} y={1000} at={8}><TeaCup size={300} /></Bounce>}),
  book: BookScene('Influence', 'Robert Cialdini'),
  blank: R({bg: 'plain'}),
  free: R({place: Shop, over: () => <><Bounce x={360} y={760} at={2}><TeaCup size={360} /></Bounce><Bounce x={310} y={1150} at={10} seed="q"><PriceTag text="দাম কত?" size={96} color={RED} /></Bounce></>, title: '"ফ্রি" জিনিসের দাম', color: GOLD}),
  walk: Count(12000, {pre: '৳ ', size: 170, label: 'এক কাপ চায়ের ঋণ এত না', color: RED, bg: 'dark'}),
  sell: Card('চাওয়ার আগে কিছু দাও', {size: 106, color: GREEN, place: Shop}),
  cta: () => (
    <Cta>
      <TeaCup size={380} />
    </Cta>
  ),
};
const Scene = pick(SCENES);

export const SareeThumbnail: React.FC = () => (
  <PsyThumb l1="১০ টাকার এক কাপ চা" l2="১২ হাজার টাকার ফাঁদ!" bottom="দোকানদারের চাল" term="Reciprocity" glow="rgba(192,48,74,0.4)" art={<div style={{position: 'absolute', left: 70, top: 930}}><TeaCup size={440} /></div>} size={86} />
);
export const SareeVideo: React.FC<StoryProps> = (p) => <Story {...p} fx segments={segs} folder="saree/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<SareeThumbnail />} />;
