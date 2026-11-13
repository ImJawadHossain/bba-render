import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, Paper, PsyThumb} from '../common/psy';
import {Home, PhoneProp, PriceTag} from '../common/places';
import {BoardSign, CommentCard, TShirt} from '../common/places2';
import {BookScene, Bounce, Card, Count, Cta, Hit, R, Solo, Y1, story} from '../common/reel';
import raw from './segments.json';

const ARIF = Y1;
const Room = <Home />;
const Night = <Home dim />;
const bill = (lines: string[], title = 'হিসাব') => () => <Bounce x={230} y={560} at={2}><Paper w={620} title={title} lines={lines} size={72} rot={-2} /></Bounce>;
const msgCard = (t: string, bad = false) => () => <Bounce x={150} y={760} at={2}><CommentCard name="কাস্টমার" text={t} size={58} bad={bad} /></Bounce>;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: Room, over: () => <><Bounce x={140} y={560} at={2}><TShirt size={420} /></Bounce><Bounce x={540} y={950} at={8} seed="p"><PriceTag text="+৮০ টাকা" size={96} color={RED} /></Bounce></>, title: 'দাম বাড়াল!', color: RED}),
  h2: Count(2, {post: ' গুণ অর্ডার', size: 180, color: GREEN, place: Night}),
  sells: Solo(Room, {look: ARIF, e: 'smile', hold: HandPhone}, {over: () => <Bounce x={660} y={1060} at={3}><TShirt size={300} /></Bounce>}),
  cost: R({place: Room, over: bill(['টি-শার্ট ৪০০', 'ডেলিভারি ৮০', 'মোট ৪৮০'])}),
  daily: R({place: Night, over: () => <Bounce x={300} y={460} at={2}><PhoneProp w={480} screen="#101420" /></Bounce>}),
  msg: R({place: Night, over: msgCard('ডেলিভারি চার্জটা মাফ করা যায় না?')}),
  fifty: R({place: Room, over: bill(['টি-শার্ট ৪০০', 'ডেলিভারি ৫০', 'মোট ৪৫০'])}),
  nouse: Solo(Night, {look: ARIF, e: 'sad'}, {title: 'কোনো লাভ হলো না', color: RED}),
  angry: Solo(Night, {look: ARIF, e: 'serious', g: 'open'}, {near: true}),
  newp: R({place: Room, over: () => <><Bounce x={140} y={560} at={2}><TShirt size={420} /></Bounce><Bounce x={560} y={950} at={6} seed="q"><PriceTag text="৪৮০" size={130} color={GOLD} /></Bounce></>}),
  free: R({place: Room, over: () => <Bounce x={160} y={640} at={1}><BoardSign text="সারা দেশে ডেলিভারি ফ্রি!" size={92} /></Bounce>}),
  same: R({place: Room, over: bill(['টি-শার্ট ৪৮০', 'ডেলিভারি ফ্রি', 'মোট ৪৮০'], 'নতুন হিসাব')}),
  still: Hit('আগেও ৪৮০, এখনো ৪৮০', {size: 118, top: 600, color: GOLD, place: Room}),
  double: Count(2, {post: ' গুণ', size: 280, label: 'পরের মাসে অর্ডার', color: GREEN, place: Night}),
  two: R({place: Night, over: () => <><Bounce x={120} y={620} at={2}><TShirt size={360} color="#c0304a" /></Bounce><Bounce x={560} y={760} at={8} seed="t2"><TShirt size={360} /></Bounce></>}),
  good: R({place: Night, over: msgCard('ভাই, আপনারা অনেক ভালো। অন্যদের মতো চার্জ নেন না।')}),
  book: BookScene('Predictably Irrational', 'Dan Ariely', 'Free!', '#14305f'),
  t1: Card('"ফ্রি" দেখলে আগে মোট দাম দেখো', {size: 90, color: RED, place: Night}),
  t2: Card('ছোট চার্জ আলাদা না, এক জায়গায়', {size: 86, color: GREEN, place: Room}),
  cta: () => (
    <Cta>
      <TShirt size={380} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দাম বাড়াল ৮০ টাকা" l2="অর্ডার হলো দ্বিগুণ!" bottom="একটা শব্দের জাদু" term="Power of Free" glow="rgba(95,208,138,0.3)" art={<div style={{position: 'absolute', left: 40, top: 1010}}><TShirt size={460} /></div>} size={88} />
);
export const delivery = story('delivery/', raw, SCENES, Thumb);
