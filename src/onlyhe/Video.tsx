import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {HandPhone, Paper, PsyThumb, a} from '../common/psy';
import {Desk, HandCup, Home, PhoneProp, TeaCup} from '../common/places';
import {Bounce, Card, Count, Cta, ELDER, Pair, R, SIR, Solo, Y2, lawBook, story} from '../common/reel';
import raw from './segments.json';

const MATIN: ToonLook = {...ELDER, kurta: false, top: '#6a7a8a', bottom: '#3a3e46', hair: '#8a8580', hairStyle: 'receding'};
const MGR: ToonLook = {...SIR, hair: '#1a1410', hairStyle: 'side', glasses: false, age: 0};
const O = 'office';
const desk = () => <Desk top={1460} />;
const Monitor: React.FC<{text: string; error?: boolean}> = ({text, error}) => (
  <div style={{width: 760, height: 480, background: '#14161c', border: '14px solid #2a2c34', borderRadius: 20, padding: 24, boxSizing: 'border-box', boxShadow: '0 24px 60px rgba(0,0,0,0.5)'}}>
    <div style={{width: '100%', height: '100%', background: error ? '#2a0f14' : '#101a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: error ? '#ff7a7a' : '#7ad0ff', fontSize: 62, fontWeight: 800, textAlign: 'center', lineHeight: 1.3, fontFamily: 'inherit'}}>{text}</div>
  </div>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(<div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #1c2230, #0c0f15)'}} />, {look: MGR, e: 'serious', g: 'pointR'}, {look: MATIN, e: 'smile', hold: HandCup}, {title: 'সবচেয়ে অলস লোকটা: বিদায়', size: 76, color: RED}),
  h2: Count(2, {post: ' গুণ বেতনে ফেরত', size: 130, label: 'এক মাস পর', color: GREEN, bg: O}),
  fifteen: R({bg: O, actors: [a(MATIN, 540, 'smile', 'idle', {h: 1140})], front: desk, title: 'পনেরো বছর', color: GOLD}),
  lazy: R({bg: O, actors: [a(MATIN, 540, 'smile', 'hold', {h: 1140, holding: HandCup})], front: desk, over: () => <Bounce x={90} y={1200} at={3}><Paper w={360} title="খবর" dots={2} size={44} rot={-5} /></Bounce>}),
  soft: R({bg: O, over: () => <Bounce x={160} y={640} at={2}><Monitor text="বেতনের হিসাব ১৯৯৮" /></Bounce>, title: 'পুরোনো সফটওয়্যার', color: GOLD}),
  only: R({bg: O, actors: [a(MATIN, 540, 'wink', 'pointUp', {h: 1240, y: 1800})], front: () => <Desk top={1500} />, title: 'চালাতে পারেন শুধু তিনি', size: 76, color: RED}),
  smile: Pair(<Home dim />, {look: Y2, e: 'worried'}, {look: MATIN, e: 'laugh'}),
  hard: R({bg: O, actors: [a(Y2, 280, 'worried', 'idle', {h: 1040, lookX: 1}), a(MATIN, 790, 'laugh', 'open', {h: 1060, lookX: -1, talking: true})], front: desk}),
  mgr: R({bg: O, actors: [a(MGR, 540, 'skeptical', 'idle', {h: 1260, y: 1880})], title: 'নতুন ম্যানেজার', color: GOLD}),
  fire: R({bg: O, actors: [a(MGR, 280, 'serious', 'pointR', {h: 1060, lookX: 1, talking: true}), a(MATIN, 790, 'smile', 'hold', {h: 1040, lookX: -1, holding: HandCup})], front: desk}),
  env: Solo(<Home />, {look: MATIN, e: 'wink'}, {over: () => <Bounce x={90} y={1140} at={3}><Paper w={380} title="বিদায়" dots={2} size={48} rot={-4} /></Bounce>}),
  last: R({bg: O, over: () => <Bounce x={160} y={640} at={1}><Monitor text="ফাইল খুলছে না" error /></Bounce>}),
  stuck: Count(120, {post: ' জনের বেতন আটকে', size: 104, color: RED, bg: O, back: () => null}),
  closed: R({bg: O, over: () => <Bounce x={160} y={640} at={2}><Monitor text="কোম্পানি বন্ধ: দশ বছর আগে" error /></Bounce>}),
  call: R({place: <Home dim />, actors: [a(MGR, 540, 'worried', 'hold', {h: 1240, y: 1880, holding: HandPhone})], title: 'রাত ১১:০০', size: 110, color: RED}),
  come: Solo(<Home dim />, {look: MGR, e: 'worried', hold: HandPhone, talk: true}),
  double: Solo(<Home />, {look: MATIN, e: 'wink', hold: HandPhone, talk: true}),
  book: lawBook(11),
  t1: Card('এমন কাজ শেখো, যা আর কেউ পারে না', {size: 88, color: GREEN, bg: O}),
  t2: Card('সব কৌশল শিখিয়ে দিও না', {size: 96, color: GOLD, bg: O}),
  t3: Card('মালিক হলে: একজনের ওপর সব রেখো না', {size: 82, color: RED, bg: O}),
  cta: () => (
    <Cta>
      <TeaCup size={380} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="অলস লোকটাকে বের করে দিল" l2="এক মাসে দ্বিগুণ বেতনে ফেরত!" bottom="কেন?" term="48 Laws · Law 11" art={<div style={{position: 'absolute', left: 60, top: 1000}}><PhoneProp w={260} screen="#23456f" /></div>} size={76} />
);
export const onlyhe = story('onlyhe/', raw, SCENES, Thumb);
