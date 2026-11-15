import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {Paper, PsyThumb, a} from '../common/psy';
import {Desk} from '../common/places';
import {Bounce, Card, Count, Cta, Hit, R, SIR, Solo, Y1, Y2, Y3, lawBook, story} from '../common/reel';
import raw from './segments.json';

const MAMUN: ToonLook = {...Y1, top: '#f4f2ec', tie: '#2b4fa0'};
const O = 'office';
const place = <div style={{position: 'absolute', inset: 0}}><div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #1c2230, #0c0f15)'}} /></div>;
const desk = () => <Desk top={1440} />;
const room = (m: 'smile' | 'surprised' | 'serious' | 'neutral' | 'laugh', b: 'smile' | 'serious' | 'blank' | 'laugh' | 'skeptical', o: {mt?: boolean; bt?: boolean} = {}) =>
  R({bg: O, actors: [a(MAMUN, 280, m, o.mt ? 'explain' : 'idle', {h: 1040, lookX: 1, talking: o.mt}), a(SIR, 790, b, o.bt ? 'open' : 'idle', {h: 1060, lookX: -1, talking: o.bt})], front: desk});
const Envelope: React.FC = () => <div style={{width: 560, height: 360, background: '#e8dcc0', border: '8px solid #1b1b1f', borderRadius: 10, position: 'relative', boxShadow: '0 24px 60px rgba(0,0,0,0.5)'}}><svg width="100%" height="100%" viewBox="0 0 560 360" style={{position: 'absolute', inset: 0}}><path d="M0 0 L280 200 L560 0" fill="none" stroke="#1b1b1f" strokeWidth={7} /></svg></div>;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Count(5000, {pre: '+ ', post: ' টাকা', size: 170, label: 'বস বললেন', color: GREEN, bg: O}),
  h2: Count(8000, {from: 5000, pre: '+ ', post: ' টাকা', size: 170, label: 'মামুন বলল', color: GOLD, bg: O}),
  h3: Hit('তিন মাস পর চাকরিই নেই', {size: 122, top: 600, color: RED, bg: O}),
  client: Solo(place, {look: MAMUN, e: 'laugh', g: 'thumbsUp'}, {title: 'সবচেয়ে বড় ক্লায়েন্ট', color: GREEN}),
  room: room('smile', 'smile'),
  five: room('smile', 'laugh', {bt: true}),
  think: R({bg: O, actors: [a(MAMUN, 540, 'thinking', 'think', {h: 1260, y: 1880})], title: 'আরেকটু চাপ দিই', color: GOLD}),
  eight: room('serious', 'smile', {mt: true}),
  stop: R({bg: O, actors: [a(SIR, 540, 'blank', 'idle', {h: 1320, y: 1900})], front: () => <Desk top={1540} />}),
  ok: room('smile', 'blank', {bt: true}),
  won: Hit('মামুন জিতে গেছে!', {size: 130, top: 620, color: GREEN, bg: O}),
  sweet: R({bg: O, actors: [a(MAMUN, 540, 'laugh', 'open', {h: 1160, y: 1830, talking: true}), a(Y2, 200, 'laugh', 'idle', {h: 960, y: 1790, lookX: 1}), a(Y3, 880, 'laugh', 'idle', {h: 960, y: 1790, lookX: -1})], title: 'পুরো অফিসে মিষ্টি', color: GOLD}),
  heard: R({bg: O, actors: [a(SIR, 540, 'serious', 'idle', {h: 1440, y: 2000})], title: 'কথাটা বসের কানে', color: RED}),
  quiet: Solo(place, {look: SIR, e: 'blank'}, {near: true}),
  newman: R({bg: O, actors: [a(CAST.ceo, 700, 'smile', 'idle', {h: 1160, y: 1830, lookX: -1}), a(MAMUN, 260, 'surprised', 'idle', {h: 1000, y: 1810, lookX: 1})], title: 'নতুন লোক', color: RED}),
  meeting: R({bg: O, actors: [a(CAST.ceo, 300, 'smile', 'explain', {h: 1000, lookX: 1, talking: true}), a(SIR, 790, 'smile', 'idle', {h: 1040, lookX: -1})], front: desk, title: 'মিটিংয়ে আর ডাকে না', color: RED}),
  files: R({bg: O, actors: [a(MAMUN, 280, 'worried', 'idle', {h: 1040, lookX: 1})], front: desk, over: () => <><Bounce x={380} y={1100} at={2}><Paper w={300} title="ফাইল" dots={1} size={44} rot={-6} /></Bounce><Bounce x={640} y={1180} at={10} seed="f2"><Paper w={300} title="ফাইল" dots={1} size={44} rot={5} /></Bounce></>}),
  letter: R({bg: 'dark', over: () => <Bounce x={260} y={680} at={1}><Envelope /></Bounce>}),
  lost: Hit('৩ হাজারের জন্য পুরো চাকরি', {size: 114, top: 620, color: RED, bg: 'dark'}),
  book: lawBook(47),
  t1: Card('চাওয়ার আগেই ঠিক করো, কত পেলে থামবে', {size: 84, color: GOLD, bg: O}),
  t2: Card('পেলে ধন্যবাদ বলে উঠে পড়ো', {size: 96, color: GREEN, bg: O}),
  t3: Card('জিতে গল্প করে বেড়াবে না', {size: 96, color: RED, bg: O}),
  cta: () => (
    <Cta>
      <Envelope />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="৩ হাজার টাকা বেশি জিতল" l2="পুরো চাকরিটাই গেল!" bottom="বেশি চাইলে কী হয়" term="48 Laws · Law 47" art={<div style={{position: 'absolute', left: 0, top: 1100, transform: 'scale(0.8)'}}><Envelope /></div>} size={82} />
);
export const onestep = story('onestep/', raw, SCENES, Thumb);
