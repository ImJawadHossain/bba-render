import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Home, PhoneProp} from '../common/places';
import {CommentCard, TeaAlley} from '../common/places2';
import {CAST} from '../common/cast';
import {Bounce, Count, Cta, Pair, R, Solo, Y2, lawBook, story} from '../common/reel';
import {Next, NextBadge, PageCard} from '../common/laws48';
import {Fuchka, Glass, Library, popIn, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const FAHIM: ToonLook = {...Y2, hairStyle: 'side', top: '#2b5fd9'};
const VENDOR: ToonLook = CAST.worker;
const Room = <Home dim />;
const Lane = <TeaAlley night={false} />;
const group = () => (
  <Bounce x={330} y={430} at={2}>
    <PhoneProp w={420} screen="#f6f7f9">
      <div style={{padding: 26, color: '#15151b', fontWeight: 800}}>
        <div style={{fontSize: 30, color: '#2b5fd9'}}>ঢাকার খাবার</div>
        <div style={{fontSize: 22, color: '#5a5f6e'}}>৫ লাখ সদস্য</div>
        <div style={{marginTop: 30, fontSize: 30, lineHeight: 1.3}}>ঢাকার সেরা ফুচকা কোথায়? এক জায়গার নাম বলেন।</div>
      </div>
    </PhoneProp>
  </Bounce>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Room, 4, 'night'), actors: [{look: FAHIM, x: 540, h: 1100, y: 1880, expression: 'laugh', gesture: 'hold', holding: HandPhone}], title: 'একটা দোকানও চেনে না', color: GOLD}),
  h2: R({place: soft(Lane, 3), over: () => <><Bounce x={160} y={560} at={2}><Fuchka size={420} /></Bounce><Bounce x={600} y={620} at={10}><div style={{padding: '10px 30px', background: '#7fb98a', border: '6px solid #173b25', borderRadius: 14, fontSize: 70, fontWeight: 900, color: '#10301d'}}>৳ ৳ ৳</div></Bounce></>, title: 'ফুচকাওয়ালারা টাকা দেয়', color: RED}),
  s01: R({place: soft(Room, 8, 'night'), over: group}),
  s02: Solo(soft(Room, 5, 'night'), {look: FAHIM, e: 'smile', g: 'hold', hold: HandPhone, talk: true}),
  s03: Count(3000, {post: ' কমেন্ট', label: 'এক রাতে', size: 200, color: GOLD, place: soft(Room, 10, 'night')}),
  s04: R({place: soft(Room, 8, 'night'), over: () => <Bounce x={110} y={560} at={2}><CommentCard name="নাসরিন" text="১. মামার ফুচকা, ধানমন্ডি — টক সেরা। ২. … ১২. লালবাগ — দাম কম।" w={860} size={50} /></Bounce>, title: 'নাসরিন লেখে ১২টা নাম', color: GOLD}),
  s05: R({place: soft(Room, 6, 'night'), actors: [{look: FAHIM, x: 540, h: 1000, y: 1900, expression: 'thinking', gesture: 'hold', holding: HandPhone}], over: sticker('ঢাকার সেরা ৫০ ফুচকা · ফাহিমের লিস্ট', {y: 520, bg: '#7a1f3a', size: 62})}),
  s06: Count(10000, {post: ' শেয়ার', size: 200, color: GREEN, place: soft(Room, 10, 'night')}),
  s07: R({place: soft(Room, 8, 'night'), over: () => <Bounce x={200} y={480} at={2}><PageCard name="ফাহিমের লিস্ট" followers="২,০০,০০০" w={680} /></Bounce>}),
  s08: Pair(soft(Lane, 5), {look: FAHIM, e: 'smile', g: 'hold', hold: HandPhone}, {look: VENDOR, e: 'smile', g: 'open', talk: true}),
  s09: R({place: soft(Room, 8, 'night'), over: () => <>{['সেরা ৫০ বিরিয়ানি', 'সেরা ৫০ জিম', 'সেরা ৫০ দর্জি'].map((t, i) => sticker(t, {y: 460 + i * 250, at: 2 + i * 8, bg: ['#7a1f3a', '#14305f', '#14532d'][i]})())}</>, title: 'সব কিছুর লিস্ট', color: GOLD}),
  s10: R({place: soft(Room, 8, 'night'), over: () => <Bounce x={110} y={600} at={2}><CommentCard name="নাসরিন" text="১২টা দোকানের নাম · লাইক: ৪" w={860} size={54} bad /></Bounce>, title: 'আর নাসরিন?', color: RED}),
  s11: Glass('কাজ করে তিন হাজার জন, নাম হয় একজনের', {place: Room, tone: 'night'}),
  book: lawBook(7),
  lesson: R({bg: 'plain'}),
  act: Glass('মানুষের জানা জিনিস এক জায়গায় আনো, পরিচয় রাখো নিজের', {place: Room, tone: 'night', size: 76, color: '#bff2c8'}),
  next: Next(8, <div style={{transform: 'scale(1)'}}>{tag('শুক্রবার ফ্রি ক্লাস', {bg: '#14532d', size: 80})}</div>, {title: 'ছাত্র খোঁজা বন্ধ', place: soft(<Library />, 14)}),
  next2: Next(8, <div style={{fontSize: 150, fontWeight: 900, color: '#7fd98a'}}>৳ ৫,০০০</div>, {title: 'অভিভাবকদের লাইন, ফি পাঁচগুণ', place: soft(<Library />, 14)}),
  next3: Next(8, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'কাজ খুঁজে ক্লান্ত?', place: soft(<Library />, 14)}),
  cta: () => (
    <Cta>
      <NextBadge law={8} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একটা দোকানও চেনে না" l2="তবু ফুচকাওয়ালারা টাকা দেয়!" bottom="অন্যের কাজে নিজের নাম" term="48 Laws · Law 7" art={<div style={{position: 'absolute', left: 40, top: 1150}}><Fuchka size={480} /></div>} size={80} />
);
export const law07 = story('law07/', raw, SCENES, Thumb, {logo: 'bba2'});
