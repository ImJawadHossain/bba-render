import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {Backdrop, SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall, Counter, Desk, HandCup} from '../common/places';
import {ShopFront} from '../common/places2';
import {CAST} from '../common/cast';
import {Bounce, Card, Count, Cta, Hit, MIDDLE, Pair, R, SIR, Slam, Solo, Two, Y2, Y3, lawBook, story} from '../common/reel';
import {Next, NextBadge, QToFact, Rasgolla, Roach, Shutter, Talk, crowd} from '../common/laws48';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MONU: ToonLook = {...MIDDLE, hair: '#d9d4ca', age: 0.85};
const TUTUL: ToonLook = {...Y2, hairStyle: 'side'};
const SON: ToonLook = Y3;
const LAWYER: ToonLook = {...SIR, jacket: '#14161c', tie: '#f4f2ec'};

const Monu = <ShopFront name="মনু মিষ্টান্ন ভাণ্ডার" signBg="#7a1f3a" signColor="#ffe9a8" />;
const Tutul = <ShopFront name="টুটুল সুইটস" signBg="#14305f" signColor="#9fd3ff" wall="#b8a888" />;
const Tea = <ChaiStall />;
const Office = <Backdrop bg="office" />;
// কাউন্টারে রসগোল্লার গামলা
const sweets = (n = 3) => () => (
  <>
    <Counter top={1400} color="#6a4a34" glass />
    {[110, 420, 730].slice(0, n).map((x) => (
      <div key={x} style={{position: 'absolute', left: x, top: 1270}}>
        <Rasgolla size={260} />
      </div>
    ))}
  </>
);
const bench = () => <Counter top={1520} color="#3a2a1a" />;
const behind = (look: ToonLook, e: 'smile' | 'sad' | 'surprised' | 'laugh', g: 'idle' | 'shrug' | 'open' = 'idle', talk = false) => ({look, x: 540, h: 1000, y: 1700, expression: e, gesture: g, talking: talk});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: Monu, actors: [behind(MONU, 'sad')], front: sweets(1), title: '৪০ বছরের দোকান খালি', color: RED}),
  h2: Slam('?', {size: 520, top: 520, color: RED, place: Tea, sub: 'শুধু একটা প্রশ্ন', subColor: GOLD}),
  famous: R({place: Monu, actors: [behind(MONU, 'laugh', 'open')], front: sweets(3), title: 'পাশের জেলা থেকে আসে', color: GOLD}),
  rival: R({place: Tutul, actors: [behind(TUTUL, 'smile', 'open')], front: sweets(2), title: 'ওপারে নতুন দোকান', color: GOLD}),
  empty: R({place: Tutul, actors: [behind(TUTUL, 'sad', 'shrug')], front: sweets(2), title: 'খদ্দের নেই', color: RED}),
  tea: Pair(Tea, {look: TUTUL, e: 'laugh', hold: HandCup}, {look: CAST.customer, e: 'neutral', hold: HandCup}, {front: bench}),
  q: Pair(Tea, {look: TUTUL, e: 'wink', g: 'explain', talk: true}, {look: CAST.customer, e: 'surprised', hold: HandCup}, {front: bench}),
  stays: R({place: Tea, over: () => <><Bounce x={180} y={520} at={2}><div style={{fontSize: 460, fontWeight: 900, color: RED, lineHeight: 1}}>?</div></Bounce><Bounce x={600} y={700} at={8}><Roach size={240} /></Bounce></>, title: 'প্রশ্নটা থেকে যায়', color: GOLD}),
  spread: R({place: Tea, actors: crowd([170, 540, 910], {h: 900, y: 1860, e: 'surprised'}), over: () => <><Bounce x={40} y={420} at={2} seed="s1"><Talk text="শুনলাম...?" size={56} /></Bounce><Bounce x={500} y={600} at={8} seed="s2"><Talk text="তেলাপোকা নাকি?" size={56} tail="right" /></Bounce><Bounce x={120} y={800} at={14} seed="s3"><Talk text="সত্যি নাকি?" size={56} /></Bounce></>}),
  hears: R({place: Monu, actors: [behind(MONU, 'surprised')], front: sweets(3)}),
  monu: R({place: Monu, actors: [behind(MONU, 'smile', 'shrug', true)], front: sweets(3)}),
  statement: R({bg: 'dark', over: () => <div style={{position: 'absolute', left: 60, right: 60, top: 640}}><QToFact text="ওদের রসে তেলাপোকা" size={80} /></div>, title: 'প্রশ্ন থেকে খবর', color: GOLD}),
  half: Count(50, {from: 100, post: '%', label: 'তিন মাসে বিক্রি', size: 240, color: RED, place: Monu}),
  line: R({place: Tutul, actors: [behind(TUTUL, 'laugh', 'open'), ...crowd([120, 330, 750, 960], {h: 720, y: 1900, e: 'smile', from: 2})], front: () => null, title: 'টুটুলের দোকানে লাইন', color: GREEN}),
  lawyer: Pair(Office, {look: SON, e: 'worried'}, {look: LAWYER, e: 'neutral'}, {bar: true, front: () => <Desk top={1420} />, title: 'উকিলের কাছে', color: GOLD}),
  lawyerline: Pair(Office,{look: SON, e: 'shocked'}, {look: LAWYER, e: 'serious', g: 'shrug', talk: true}, {bar: true, front: () => <Desk top={1420} />}),
  punch: Two(Card('অভিযোগ করলে: প্রমাণ লাগে', {size: 92, color: GOLD, bg: 'dark'}), Hit('প্রশ্ন করলে: কিছুই লাগে না', {size: 110, color: RED, bg: 'dark'}), 0.5),
  book: lawBook(5),
  lesson: R({bg: 'plain'}),
  act: Card('প্রশ্ন উঠলে সেদিনই প্রমাণসহ উত্তর', {size: 90, color: GREEN, place: Monu}),
  next: Next(6, <Shutter w={700} />, {title: '৩ সপ্তাহ বন্ধ শাটার'}),
  next2: Next(6, <Shutter w={560} text="উদ্বোধন!" />, {title: 'লাইন রাস্তার মোড় পর্যন্ত', color: GREEN}),
  next3: Next(6, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'ব্যবসা করলে জানা উচিত'}),
  cta: () => (
    <Cta>
      <NextBadge law={6} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="৪০ বছরের মিষ্টির দোকান" l2="৩ মাসে অর্ধেক খালি!" bottom="কেউ অভিযোগও করেনি" term="48 Laws · Law 5" art={<div style={{position: 'absolute', left: 40, top: 1150}}><Rasgolla size={460} /></div>} size={82} />
);
export const law05 = story('law05/', raw, SCENES, Thumb, {logo: 'bba2'});
