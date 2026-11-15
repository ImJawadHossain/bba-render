import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {PsyThumb, a} from '../common/psy';
import {Home, PhoneProp, Taka} from '../common/places';
import {CommentCard, LogoPair} from '../common/places2';
import {Bounce, Card, Count, Cta, Hit, R, Solo, Y1, lawBook, story} from '../common/reel';
import raw from './segments.json';

const NABIL: ToonLook = {...Y1, top: '#7a4a9a', glasses: true};
const Dim = <Home dim />;
const Day = <Home />;
const Msg: React.FC<{text: string; size?: number}> = ({text, size = 54}) => (
  <PhoneProp w={500} screen="#101420">
    <div style={{position: 'absolute', inset: 0, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{padding: '22px 24px', background: '#23314c', borderRadius: 24, color: '#f2efe9', fontSize: size, fontWeight: 800, lineHeight: 1.3}}>{text}</div>
    </div>
  </PhoneProp>
);
const phone = (text: string, size?: number) => () => <Bounce x={290} y={420} at={2}><Msg text={text} size={size} /></Bounce>;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Count(100, {post: ' জন: উত্তর নেই', size: 124, label: 'রোজ কাজ চাইত', color: RED, place: Dim}),
  h2: Hit('তিন মাস পর ক্লায়েন্টরা খুঁজছে', {size: 112, top: 600, color: GREEN, place: Day}),
  des: Solo(Dim, {look: NABIL, e: 'neutral'}, {title: 'গ্রাফিক ডিজাইনার', color: GOLD}),
  same: R({place: Dim, over: phone('স্যার, একটা কাজ দিন...')}),
  msg: R({place: Dim, over: phone('স্যার, একটা কাজ দিন। খুব কম টাকায় করে দেব।', 46)}),
  three: R({place: Dim, over: () => <Bounce x={280} y={640} at={2}><Taka w={520} amount="৫০০" rot={-4} /></Bounce>, title: 'ছয় মাসে তিনটা কাজ', color: RED}),
  oneday: Solo(Dim, {look: NABIL, e: 'neutral'}),
  sting: R({place: Dim, over: () => <Bounce x={150} y={700} at={1}><CommentCard name="ক্লায়েন্ট" text="ভালো ডিজাইনার হলে তো এভাবে কাজ চাইতেন না।" size={60} bad /></Bounce>}),
  stare: Solo(Dim, {look: NABIL, e: 'sad'}, {near: true}),
  stop: Hit('মেসেজ পাঠানো বন্ধ', {size: 130, top: 620, color: RED, place: Dim}),
  instead: Solo(Day, {look: NABIL, e: 'serious', g: 'explain'}),
  logos: R({place: Day, over: () => <Bounce x={60} y={640} at={2}><LogoPair /></Bounce>}),
  free: R({place: Day, over: () => <Bounce x={60} y={640} at={0}><LogoPair seed={2} /></Bounce>, title: 'কেউ টাকা দেয়নি', color: GOLD}),
  first: R({place: Day, over: phone('নতুন মেসেজ!', 70)}),
  ask: R({place: Day, over: phone('আমাদের লোগোটাও করে দেবেন?')}),
  wait: Solo(Day, {look: NABIL, e: 'wink'}, {title: 'দুই দিন পর উত্তর', color: GOLD}),
  price: R({place: Day, actors: [a(NABIL, 540, 'serious', 'open', {h: 1240, y: 1870, talking: true})]}),
  ok: R({place: Day, over: phone('ঠিক আছে ভাই। অপেক্ষা করব।')}),
  book: lawBook(8),
  t1: Card('কাজ চেয়ে মেসেজ কমাও', {size: 104, color: RED, place: Dim}),
  t2: R({place: Day, over: () => <Bounce x={60} y={640} at={2}><LogoPair seed={3} /></Bounce>, title: 'সবার সামনে কাজ দেখাও', size: 76, color: GREEN}),
  t3: Card('সাথে সাথে রাজি হয়ো না', {size: 100, color: GOLD, place: Dim}),
  cta: () => <Cta />,
};

const Thumb: React.FC = () => (
  <PsyThumb l1="রোজ ১০০ জনকে মেসেজ: শূন্য" l2="চাওয়া বন্ধ করতেই কাজের লাইন!" bottom="৫০০ থেকে ১৫ হাজার টাকা" term="48 Laws · Law 8" glow="rgba(95,208,138,0.3)" art={<div style={{position: 'absolute', left: 30, top: 1060}}><Taka w={480} amount="১৫,০০০" rot={-6} /></div>} size={74} />
);
export const begging = story('begging/', raw, SCENES, Thumb);
