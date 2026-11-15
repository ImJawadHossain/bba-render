import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {HandPhone, Paper, PsyThumb} from '../common/psy';
import {Home, PhoneProp, PriceTag} from '../common/places';
import {Bike, CommentCard, Showroom} from '../common/places2';
import {BookScene, Bounce, Card, Count, Cta, Hit, MIDDLE, Pair, R, Solo, Y1, story} from '../common/reel';
import raw from './segments.json';

const EMON: ToonLook = Y1;
const SALES: ToonLook = {...MIDDLE, hairStyle: 'side', kurta: false, top: '#f4f2ec', tie: '#b3201f', bottom: '#1c1e24'};
const S = <Showroom />;
const Dim = <Home dim />;
const redBike = (x = 240, y = 1000, size = 620) => () => <Bounce x={x} y={y} at={2}><Bike size={size} /></Bounce>;
const fees = ['বাইক ১,৮০,০০০', 'রেজিস্ট্রেশন ১৮,০০০', 'ফিটিং ১২,০০০', 'মোট ২,১০,০০০'];

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: S, over: () => <><Bounce x={240} y={880} at={2}><Bike size={620} /></Bounce><Bounce x={260} y={620} at={8} seed="p"><PriceTag text="৳ ১,৮০,০০০" size={104} color={GREEN} /></Bounce></>}),
  h2: R({place: S, over: () => <><Bounce x={240} y={880} at={2}><Bike size={620} /></Bounce><Bounce x={260} y={620} at={3} seed="p2"><PriceTag text="৳ ২,১০,০০০" size={104} color={RED} /></Bounce></>}),
  h3: Hit('তবু কিনে ফেলল!', {size: 136, top: 620, color: RED, place: S}),
  three: Count(3, {post: ' টা শোরুম', size: 180, label: 'ইমন ঘুরেছে', color: GOLD, place: S}),
  low: Solo(S, {look: EMON, e: 'smile', g: 'thumbsUp'}, {title: 'এটাই সবচেয়ে কম', color: GREEN}),
  offer: Pair(S, {look: EMON, e: 'smile'}, {look: SALES, e: 'laugh', g: 'open', talk: true}),
  photo: R({place: S, over: redBike(240, 1020), actors: [{look: EMON, x: 540, h: 980, y: 1500, expression: 'laugh', gesture: 'thumbsUp'}]}),
  post: R({place: Dim, over: () => <Bounce x={160} y={620} at={2}><CommentCard name="ইমন" text="নতুন বাইক আসছে!" size={70} /></Bounce>}),
  told: Solo(Dim, {look: EMON, e: 'laugh', hold: HandPhone, talk: true}, {title: 'সবাইকে বলে দিল', color: GOLD}),
  next: Solo(S, {look: EMON, e: 'smile'}, {title: 'সই করার দিন', color: GOLD}),
  pale: Solo(S, {look: SALES, e: 'worried'}, {near: true}),
  mistake: Pair(S, {look: EMON, e: 'surprised'}, {look: SALES, e: 'worried', g: 'explain', talk: true}, {over: () => <Bounce x={330} y={1130} at={3}><Paper w={420} lines={['মোট ২,১০,০০০']} size={54} /></Bounce>}),
  paper: R({place: S, over: () => <Bounce x={210} y={560} at={2}><Paper w={660} title="আসল দাম" lines={fees} size={58} rot={-1} /></Bounce>}),
  second: Count(195000, {pre: '৳ ', size: 150, label: 'দ্বিতীয় শোরুম, সব মিলিয়ে', color: GREEN, place: Dim}),
  cheaper: Count(15000, {pre: '৳ ', post: ' সস্তা', size: 140, color: GREEN, place: Dim}),
  done: R({place: Dim, over: () => <Bounce x={300} y={460} at={2}><PhoneProp w={480} screen="#101420"><div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22, padding: 22, color: '#f2efe9', fontSize: 44, fontWeight: 800}}><div style={{padding: 18, background: '#23314c', borderRadius: 20}}>নতুন বাইক আসছে!</div><div style={{padding: 18, background: '#2a4a32', borderRadius: 20}}>অভিনন্দন দোস্ত!</div></div></PhoneProp></Bounce>}),
  say: Solo(S, {look: EMON, e: 'worried', g: 'think'}, {near: true}),
  sign: R({place: S, over: () => <Bounce x={280} y={620} at={2}><Paper w={540} title="সই" lines={['ইমন ✓']} size={92} rot={-3} /></Bounce>}),
  smile: Solo(S, {look: SALES, e: 'wink', g: 'wave'}),
  book: BookScene('Influence', 'Robert Cialdini', 'Low-ball'),
  t1: Card('"হ্যাঁ"-র আগে সব খরচ লিখিত', {size: 94, color: GREEN, place: Dim}),
  t2: Card('কাগজের আগে পোস্ট না', {size: 104, color: RED, place: Dim}),
  t3: Card('দাম বদলালে "হ্যাঁ"-ও বাতিল', {size: 96, color: GOLD, place: Dim}),
  cta: () => (
    <Cta>
      <Bike size={520} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="সস্তা ভেবে হ্যাঁ বলল" l2="সই করার দিন ৩০ হাজার বেশি!" bottom="তবু কেন কিনে ফেলল?" term="Low-ball" art={<div style={{position: 'absolute', left: 0, top: 1090}}><Bike size={560} /></div>} size={78} />
);
export const bike = story('bike/', raw, SCENES, Thumb);
