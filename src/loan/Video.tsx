import React from 'react';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP, pick} from '../common/kit';
import {PsyThumb, a} from '../common/psy';
import {ChaiStall, Counter, HandCup, Home, Taka, Wallet} from '../common/places';
import {BookScene, Bounce, Card, Count, Cta, R, Slam} from '../common/reel';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const loanFallback = makeFallback(segs);

const TUHIN: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'quiff', top: '#7a3a4a', bottom: '#2a2c30', shoes: '#e8e4dc'};
const IMRAN: ToonLook = {skin: '#d9a07a', hair: '#26180f', hairStyle: 'short', top: '#3a6ea5', bottom: '#2a2c30', glasses: true};

const House = <Home />;
const Duo = (t: 'worried' | 'sad' | 'smile' | 'neutral', i: 'neutral' | 'shocked' | 'worried' | 'sad' | 'smile', o: {tt?: boolean; it?: boolean; tg?: 'open' | 'idle'; ig?: 'open' | 'idle'} = {}) =>
  R({place: House, actors: [a(TUHIN, 280, t, o.tg ?? 'idle', {h: 1080, y: 1830, lookX: 1, talking: o.tt}), a(IMRAN, 790, i, o.ig ?? 'idle', {h: 1080, y: 1830, lookX: -1, talking: o.it})]});

const SCENES: Record<string, React.FC<SP>> = {
  need: Count(5000, {pre: '৳ ', size: 180, label: 'তুহিনের দরকার', color: GREEN, place: House}),
  asked: Slam('চাইল ৳ ৫০,০০০!', {size: 136, top: 600, color: RED, place: House}),
  got: R({place: House, actors: [a(TUHIN, 540, 'smile', 'idle', {h: 1240, y: 1870})], over: () => <><Bounce x={70} y={1120} at={5}><Taka w={280} rot={-10} /></Bounce><Bounce x={730} y={1180} at={9} seed="t2"><Taka w={280} rot={10} /></Bounce></>, title: 'টাকাটা পেয়ে গেল', color: GREEN}),
  never: R({place: House, actors: [a(IMRAN, 540, 'serious', 'idle', {h: 1240, y: 1870})], title: 'ধার দেয় না', color: RED}),
  before: Duo('sad', 'neutral'),
  evening: Duo('neutral', 'neutral'),
  ask50: Duo('worried', 'neutral', {tt: true, tg: 'open'}),
  no: Duo('worried', 'shocked', {it: true, ig: 'open'}),
  quiet: R({place: <Home dim />, actors: [a(TUHIN, 540, 'sad', 'idle', {h: 1140})], front: () => <Counter top={1500} color="#4a3220" />}),
  guilt: R({place: <Home dim />, actors: [a(IMRAN, 540, 'worried', 'think', {h: 1320, y: 1920})], title: 'খারাপ লাগতে শুরু করল', size: 78, color: GOLD}),
  door: R({place: <Home dim />, actors: [a(TUHIN, 790, 'sad', 'idle', {h: 1120, y: 1820, lookX: -1}), a(IMRAN, 280, 'worried', 'idle', {h: 1000, y: 1780, lookX: 1})]}),
  ask5: R({place: <Home dim />, actors: [a(TUHIN, 300, 'worried', 'open', {h: 1160, y: 1840, lookX: 1, talking: true}), a(IMRAN, 790, 'surprised', 'idle', {h: 1060, y: 1820, lookX: -1})]}),
  wallet: R({place: House, actors: [a(IMRAN, 540, 'smile', 'idle', {h: 1160, y: 1830})], over: () => <><Bounce x={120} y={1060} at={3}><Wallet size={340} /></Bounce><Bounce x={520} y={1160} at={12} seed="t3"><Taka w={320} amount="৫০০০" rot={6} /></Bounce></>}),
  sorry: Duo('smile', 'worried', {it: true, ig: 'open'}),
  tea: R({place: <ChaiStall />, actors: [a(TUHIN, 300, 'laugh', 'hold', {h: 1040, y: 1740, holding: HandCup, lookX: 1}), a(CAST.customer, 790, 'smile', 'hold', {h: 1040, y: 1740, holding: HandCup, lookX: -1})], front: () => <Counter top={1500} color="#3a2a1a" />}),
  reveal: R({place: <ChaiStall />, actors: [a(TUHIN, 300, 'wink', 'hold', {h: 1040, y: 1740, holding: HandCup, lookX: 1, talking: true}), a(CAST.customer, 790, 'surprised', 'hold', {h: 1040, y: 1740, holding: HandCup, lookX: -1})], front: () => <Counter top={1500} color="#3a2a1a" />}),
  book: BookScene('Influence', 'Robert Cialdini'),
  blank: R({bg: 'plain'}),
  pause: Card('বড় থেকে হঠাৎ ছোট? থামো।', {color: RED, place: House}),
  self: Card('শুরুতেই শুধু ছোটটা চাইলে আমি কি দিতাম?', {color: GOLD, size: 82, place: House}),
  use: Card('যা চাও, তার চেয়ে বড়টা আগে চাও', {color: GREEN, place: House}),
  cta: () => (
    <Cta>
      <Wallet size={460} />
    </Cta>
  ),
};
const Scene = pick(SCENES);

export const LoanThumbnail: React.FC = () => (
  <PsyThumb l1="দরকার ৫ হাজার" l2="চাইল ৫০ হাজার!" bottom="আর ঠিক এই কারণেই পেল" term="Door in the Face" glow="rgba(95,208,138,0.3)" art={<div style={{position: 'absolute', left: 40, top: 1060}}><Wallet size={480} /></div>} />
);
export const LoanVideo: React.FC<StoryProps> = (p) => <Story {...p} fx segments={segs} folder="loan/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<LoanThumbnail />} />;
