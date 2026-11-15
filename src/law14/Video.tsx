import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall, HandCup, Home, PhoneProp, TeaCup, Taka} from '../common/places';
import {CAST} from '../common/cast';
import {Cta, ELDER, MIDDLE, MOM, Pair, R, Solo, Y2, lawBook, story} from '../common/reel';
import {Contract, Next, NextBadge, crowd} from '../common/laws48';
import {Apartment, Glass, Router, popIn, soft, sticker} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const SELIM: ToonLook = {...Y2, hairStyle: 'side', top: '#f2efe6', jacket: '#2a2c34'};
const Tea = <ChaiStall />;
const Old = <Apartment />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(soft(Tea, 3, 'night'), {look: SELIM, e: 'laugh', g: 'open'}, {look: CAST.customer, e: 'laugh', hold: HandCup}, {over: popIn(<Taka w={300} amount="বিল" rot={-8} />, 390, 980), title: 'সবার বিল সেলিমের', color: GOLD}),
  h2: R({place: soft(Old, 6), over: sticker('বিক্রি: অর্ধেক দামে', {y: 640, bg: '#7a1f3a', size: 80}), title: 'চতুর্থ মাসে ৩টা বাড়ি', color: RED}),
  s01: R({place: soft(Tea, 0, 'night'), actors: crowd([170, 420, 670, 920], {h: 860, y: 1900, e: 'smile'}).map((a) => ({...a, gesture: 'hold' as const, holding: HandCup})), title: 'পুরান ঢাকার এক গলি', color: GOLD}),
  s02: Pair(soft(Tea, 4, 'night'), {look: SELIM, e: 'smile', g: 'wave'}, {look: CAST.customer, e: 'laugh', hold: HandCup}, {title: 'হাসিখুশি, ভদ্র', color: GOLD}),
  s03: Solo(soft(Tea, 5, 'night'), {look: SELIM, e: 'thinking', hold: HandCup}, {title: 'কথা কম, শোনেন বেশি', color: GOLD}),
  s04: Pair(soft(Tea, 4, 'night'), {look: ELDER, e: 'worried', g: 'explain', talk: true}, {look: SELIM, e: 'thinking', hold: HandCup}, {title: 'ছেলের ভিসার টাকা', color: GOLD}),
  s05: Pair(soft(Tea, 4, 'night'), {look: MIDDLE, e: 'sad', g: 'open', talk: true}, {look: SELIM, e: 'thinking', hold: HandCup}, {title: 'স্ত্রীর অপারেশন', color: GOLD}),
  s06: Pair(soft(Tea, 4, 'night'), {look: MOM, e: 'worried', g: 'open', talk: true}, {look: SELIM, e: 'thinking', hold: HandCup}, {title: 'মেয়ের বিয়ে', color: GOLD}),
  s07: Solo(soft(Tea, 5, 'night'), {look: SELIM, e: 'smile', hold: HandCup}, {near: true}),
  s08: R({place: soft(Old, 2), actors: [{look: CAST.ceo, x: 540, h: 1040, y: 1880, expression: 'smile', gesture: 'idle'}], title: 'চতুর্থ মাস · ঠিক ওই তিন বাড়ি', color: RED, size: 70}),
  s09: Pair(soft(<Home />, 4), {look: CAST.ceo, e: 'smile', g: 'explain', talk: true}, {look: ELDER, e: 'worried'}),
  s10: R({place: soft(<Home />, 8), over: popIn(<Contract a="বাড়ির মালিক" b="ডেভেলপার" w={640} />, 220, 480), title: 'অর্ধেক দাম, তবু সই', color: RED}),
  s11: R({place: soft(<Home dim />, 8, 'night'), over: () => <><PhoneCard /></>, title: 'এক বছর পর, ওয়েবসাইটে', color: GOLD}),
  s12: Glass('চায়ের কাপে বন্ধু, খাতায় দালাল', {place: Tea, tone: 'night', size: 96}),
  book: lawBook(14),
  lesson: R({bg: 'plain'}),
  act: Glass('কেউ খুব আপন হয়ে টাকার কষ্ট জানতে চাইলে, আগে জানো সে কে', {place: Tea, tone: 'night', color: '#bff2c8', size: 74}),
  next: Next(15, <Router size={460} />, {title: 'চাইলে শেষ করতে পারত', place: soft(Old, 14, 'night')}),
  next2: Next(15, <Router size={460} dead />, {title: 'এক বছর পর নিজেরটাই বন্ধ', place: soft(Old, 14, 'night')}),
  next3: Next(15, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'দয়া কখন বিপদ?', place: soft(Old, 14, 'night')}),
  cta: () => (
    <Cta>
      <NextBadge law={15} />
    </Cta>
  ),
};

function PhoneCard() {
  return (
    <div style={{position: 'absolute', left: 330, top: 440}}>
      <PhoneProp w={420} screen="#f6f7f9">
        <div style={{padding: 26, color: '#15151b', fontWeight: 800, textAlign: 'center'}}>
          <div style={{fontSize: 26, color: '#5a5f6e'}}>আমাদের টিম</div>
          <div style={{margin: '30px auto 14px', width: 150, height: 150, borderRadius: '50%', background: '#c98d62', border: '6px solid #2a2c34'}} />
          <div style={{fontSize: 40}}>সেলিম</div>
          <div style={{fontSize: 28, color: '#b3201f', marginTop: 10}}>জমি সংগ্রহ কর্মকর্তা</div>
        </div>
      </PhoneProp>
    </div>
  );
}

const Thumb: React.FC = () => (
  <PsyThumb l1="তিন মাস চায়ের বিল দেন" l2="তিনটা বাড়ি অর্ধেক দামে!" bottom="চায়ের কাপে বন্ধু" term="48 Laws · Law 14" art={<div style={{position: 'absolute', left: 80, top: 1150}}><TeaCup size={420} /></div>} size={82} />
);
export const law14 = story('law14/', raw, SCENES, Thumb, {logo: 'bba2'});
