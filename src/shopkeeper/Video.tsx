import React from 'react';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP, pick} from '../common/kit';
import {HandPhone, PsyThumb, a} from '../common/psy';
import {Counter, Home, PhoneProp, PhoneShop, PriceTag, Taka} from '../common/places';
import {BookScene, Bounce, Card, Cta, R, Slam} from '../common/reel';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const shopkeeperFallback = makeFallback(segs);

const SAJIB: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#3a6ea5', bottom: '#2a2c30', shoes: '#e8e4dc'};
const SELLER: ToonLook = {skin: '#d9a07a', hair: '#26180f', hairStyle: 'side', top: '#2a2c34', bottom: '#1c1e24', mustache: true, age: 0.3};
const PAL: ToonLook = {...CAST.founder, top: '#c0504a'};
const Shop = <PhoneShop />;

type E = 'neutral' | 'smile' | 'serious' | 'worried' | 'laugh' | 'surprised' | 'skeptical' | 'wink';
const Talk = (se: E, ke: E, kt = true) =>
  R({place: Shop, actors: [a(SAJIB, 280, se, 'idle', {h: 1040, lookX: 1}), a(SELLER, 790, ke, kt ? 'open' : 'idle', {h: 1060, lookX: -1, talking: kt})], front: () => <Counter top={1430} glass />});

const Took = (items: string[]) =>
  R({place: Shop, over: () => <>{items.map((t, i) => <Bounce key={t} x={150 + i * 40} y={790 + i * 170} at={i * 2} seed={t}><PriceTag text={t} size={92} color={i === items.length - 1 ? GOLD : '#f4efe2'} rot={i % 2 ? 4 : -4} /></Bounce>)}</>, title: 'নিল!', size: 140, color: RED, titleTop: 510});

const SCENES: Record<string, React.FC<SP>> = {
  hook: Talk('surprised', 'smile'),
  cheated: Slam('এই কথা দিয়েই ঠকাল!', {size: 130, top: 510, color: RED, place: Shop, back: () => <div style={{position: 'absolute', left: 280, top: 1040}}><Taka w={520} amount="১০,০০০" rot={-6} /></div>}),
  market: R({place: Shop, actors: [a(SAJIB, 540, 'smile', 'idle', {h: 1160, y: 1840})], title: 'বাজেট: ১৫,০০০', color: GREEN}),
  best: Talk('skeptical', 'laugh'),
  trust: R({place: Shop, actors: [a(SAJIB, 540, 'skeptical', 'idle', {h: 1320, y: 1920})], title: 'কাউকে বিশ্বাস করল না', size: 78, color: RED}),
  last: R({place: Shop, actors: [a(SAJIB, 280, 'neutral', 'pointR', {h: 1040, lookX: 1}), a(SELLER, 790, 'neutral', 'idle', {h: 1060, lookX: -1})], front: () => <Counter top={1430} glass />, over: () => <Bounce x={410} y={1110} at={4}><PriceTag text="১৫,০০০" size={70} /></Bounce>}),
  low: R({place: Shop, actors: [a(SELLER, 540, 'serious', 'idle', {h: 1460, y: 2020})]}),
  truth: Talk('surprised', 'serious'),
  honest: R({place: Shop, actors: [a(SAJIB, 540, 'smile', 'idle', {h: 1320, y: 1920})], title: 'একজন সৎ মানুষ!', color: GREEN}),
  accept: Talk('smile', 'smile', false),
  p25: R({place: Shop, actors: [a(SELLER, 640, 'smile', 'open', {h: 1200, y: 1820, talking: true, lookX: -0.4})], front: () => <Counter top={1540} glass />, over: () => <Bounce x={90} y={880} at={3}><PhoneProp w={240} screen="#7a2fa0" /></Bounce>}),
  took1: Took(['ফোন ২৫,০০০']),
  cover: Talk('smile', 'laugh'),
  took2: Took(['ফোন ২৫,০০০', 'কভার']),
  glass: Talk('smile', 'laugh'),
  took3: Took(['ফোন ২৫,০০০', 'কভার', 'গ্লাস']),
  homeF: R({place: <Home />, actors: [a(SAJIB, 280, 'smile', 'hold', {h: 1100, y: 1830, holding: HandPhone, lookX: 1}), a(PAL, 790, 'laugh', 'idle', {h: 1080, y: 1830, lookX: -1})]}),
  p22: R({place: <Home />, actors: [a(SAJIB, 280, 'surprised', 'hold', {h: 1100, y: 1830, holding: HandPhone, lookX: 1}), a(PAL, 790, 'laugh', 'open', {h: 1080, y: 1830, lookX: -1, talking: true})]}),
  shows: R({place: <Home />, over: () => <Bounce x={300} y={480} at={2}><PhoneProp w={480} screen="#23456f"><div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, fontSize: 86, fontWeight: 800, textAlign: 'center', lineHeight: 1.3}}>১৫,০০০<br />টাকার ফোন</div></PhoneProp></Bounce>}),
  two: R({place: <Home />, actors: [a(SAJIB, 280, 'shocked', 'idle', {h: 1100, y: 1830, lookX: 1}), a(PAL, 790, 'smile', 'hold', {h: 1080, y: 1830, lookX: -1, talking: true, holding: HandPhone})]}),
  trap: Slam('সৎ সাজাটাই ফাঁদ', {size: 122, top: 620, color: RED, place: Shop}),
  book: BookScene('The 48 Laws of Power', 'Robert Greene', 'Law 12', '#3a1420'),
  blank: R({bg: 'plain'}),
  careful: Card('নিজের ক্ষতি করে পরামর্শ? ঠিক তখনই সাবধান।', {color: RED, size: 84, place: Shop}),
  compare: Card('আরেক জায়গায় দাম মিলিয়ে নাও', {color: GOLD, size: 92, place: Shop}),
  use: Card('আগে নিজের ক্ষতি করে একটা সত্যি কথা বলো', {color: GREEN, size: 84, place: Shop}),
  cta: () => (
    <Cta>
      <PhoneProp w={280} />
    </Cta>
  ),
};
const Scene = pick(SCENES);

export const ShopkeeperThumbnail: React.FC = () => (
  <PsyThumb l1="নিয়েন না, ঠকাতে পারব না" l2="১০ হাজার টাকা ঠকাল!" bottom="সৎ সাজাটাই ফাঁদ" term="48 Laws · Law 12" art={<div style={{position: 'absolute', left: 80, top: 880}}><PhoneProp w={340} /></div>} size={82} />
);
export const ShopkeeperVideo: React.FC<StoryProps> = (p) => <Story {...p} fx segments={segs} folder="shopkeeper/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<ShopkeeperThumbnail />} />;
