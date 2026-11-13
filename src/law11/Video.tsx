import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {ShopFront} from '../common/places2';
import {CAST} from '../common/cast';
import {Cta, ELDER, Pair, R, Solo, Y1, Y3, lawBook, story} from '../common/reel';
import {Next, NextBadge, Rasgolla, crowd} from '../common/laws48';
import {Apartment, Glass, TailorShop, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const KADER: ToonLook = {...ELDER, top: '#f2efe6'};
const SON: ToonLook = {...Y1, top: '#2a7a6a'};
const SON2: ToonLook = {...Y3, top: '#7a3a4a'};
const Shop = <TailorShop />;
const Smart = <ShopFront name="স্মার্ট টেইলার্স" signBg="#14305f" signColor="#9fd3ff" wall="#d8dce2" />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Solo(soft(Shop), {look: KADER, e: 'smile', g: 'explain'}, {title: '৩০ বছর, মাপ শুধু মাথায়', color: GOLD, size: 74}),
  h2: R({place: soft(Shop, 3), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900, e: 'smile'}), title: 'কেউ দোকান ছাড়তে পারে না', color: RED, size: 74}),
  s01: Pair(soft(Shop, 3), {look: KADER, e: 'thinking', g: 'explain'}, {look: CAST.customer, e: 'neutral'}, {title: 'কাগজে একটা দাগও না', color: GOLD}),
  s02: Pair(soft(Shop, 4), {look: SON, e: 'worried', g: 'open', talk: true}, {look: KADER, e: 'neutral'}),
  s03: Pair(soft(Shop, 4), {look: SON, e: 'worried'}, {look: KADER, e: 'smile', g: 'shrug', talk: true}),
  s04: R({place: soft(Smart, 0, 'cool'), over: sticker('কম্পিউটারে মাপ · দাম অর্ধেক', {y: 700, bg: '#14305f', size: 62}), title: 'মোড়ে নতুন দোকান', color: GOLD}),
  s05: Solo(soft(Smart, 4, 'cool'), {look: CAST.customer, e: 'worried', g: 'shrug'}, {title: 'কাঁধ টানে, হাতা লম্বা', color: RED}),
  s06: Glass('কার বাম কাঁধ নিচু, কে ঢিলা পছন্দ করে', {place: Shop, sub: 'কোনো কম্পিউটারে নেই', size: 80}),
  s07: R({place: soft(Shop, 2), actors: [{look: KADER, x: 540, h: 1000, y: 1800, expression: 'laugh', gesture: 'open'}, ...crowd([140, 940], {h: 860, y: 1900, e: 'smile'})], title: 'সবাই ফিরে আসে', color: GREEN}),
  s08: Solo(soft(<Home dim />, 4, 'night'), {look: KADER, e: 'sad'}, {title: 'ঈদের ১০ দিন আগে: জ্বর', color: RED}),
  s09: Pair(soft(Shop, 4), {look: SON, e: 'smile', g: 'open'}, {look: CAST.customer2, e: 'skeptical'}, {title: 'মাপ তো আব্বার মাথায়', color: GOLD}),
  s10: R({place: soft(Shop, 2, 'gold'), actors: [{look: KADER, x: 540, h: 1000, y: 1800, expression: 'smile', gesture: 'explain'}, ...crowd([130, 330, 750, 950], {h: 800, y: 1900, e: 'smile'})], title: 'চাঁদরাত পর্যন্ত লাইন', color: GREEN}),
  s11: Pair(soft(Shop, 4), {look: SON, e: 'thinking'}, {look: SON2, e: 'thinking'}, {title: 'দোকানটা আসলে কার', color: GOLD}),
  s12: Glass('খাতার জ্ঞান যে কেউ নেয়, মাথার জ্ঞানের জন্য ফিরতে হয়', {place: Shop, size: 80}),
  book: lawBook(11),
  lesson: R({bg: 'plain'}),
  act: Glass('এমন কাজ শেখো, যা শুধু তুমি পারো', {place: Shop, color: '#bff2c8'}),
  next: Next(12, <Rasgolla size={480} />, {title: 'প্রথম দিনেই মিষ্টি', place: soft(<Apartment />, 14)}),
  next2: Next(12, tag('সার্ভিস চার্জ +৳১,৫০০', {w: 700, bg: '#7a1f3a', size: 70}), {title: 'কেউ একটা কথাও বলে না', place: soft(<Apartment />, 14)}),
  next3: Next(12, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'উপকারের আসল দাম', place: soft(<Apartment />, 14)}),
  cta: () => (
    <Cta>
      <NextBadge law={12} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="৩০ বছর মাপ লেখেন না" l2="কেউ দোকান ছাড়ে না!" bottom="ছেলেরাও পারে না" term="48 Laws · Law 11" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('মাপের খাতা নেই', {x: 0, y: 0, w: 560, bg: '#7a1f3a', size: 76})()}</div>} size={86} />
);
export const law11 = story('law11/', raw, SCENES, Thumb, {logo: 'bba2'});
