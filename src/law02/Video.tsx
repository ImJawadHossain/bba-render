import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {BoardSign, MessRoom} from '../common/places2';
import {Bounce, Card, Cta, Hit, Pair, R, Solo, Y1, Y2, Y3, lawBook, story} from '../common/reel';
import {Contract, Cow, GrowBars, HandBox, Next, NextBadge, Notice, PageCard, Parcels} from '../common/laws48';
import {PriceTag} from '../common/places';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const SHUVO: ToonLook = Y1;
const RUMI: ToonLook = {...Y2, hairStyle: 'side'};
const JONY: ToonLook = {...Y3, top: '#c07a1a'};

const Mess = <MessRoom />;
const Night = <Home dim />;
const page = (name: string, followers: string, oldName?: string) => () => (
  <Bounce x={200} y={470} at={2} seed={name}>
    <PageCard name={name} followers={followers} oldName={oldName} />
  </Bounce>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: Night, over: page('?????', '৫০,০০০', 'শুভ শার্টস'), title: 'পেজটা অন্য কারো!', color: RED}),
  h2: Hit('হ্যাকার না!', {size: 150, color: RED, place: Night}),
  h3: Solo(Night, {look: SHUVO, e: 'shocked'}, {title: 'যাকে নিজের চেয়েও বেশি বিশ্বাস', color: GOLD, size: 74}),
  friends: Pair(Mess, {look: SHUVO, e: 'laugh'}, {look: RUMI, e: 'laugh', g: 'thumbsUp'}, {title: 'স্কুলের বন্ধু', color: GOLD}),
  open: R({place: Mess, over: page('শুভ শার্টস', '১২০'), title: 'শার্টের অনলাইন পেজ', color: GOLD}),
  work: R({place: Mess, actors: [{look: SHUVO, x: 330, h: 1080, y: 1800, expression: 'smile', gesture: 'hold', holding: HandBox, lookX: 1}], over: () => <div style={{position: 'absolute', left: 560, top: 1220}}><Parcels size={460} /></div>, title: 'মাল, প্যাকেট, ডেলিভারি: শুভ', color: GOLD, size: 74}),
  pass: Solo(Mess, {look: RUMI, e: 'smile', g: 'hold', hold: HandPhone}, {over: () => <Bounce x={160} y={420} at={3}><BoardSign text="Admin: শুধু রুমি" bg="#14305f" color="#9fd3ff" size={70} /></Bounce>}),
  trust: Pair(Mess, {look: SHUVO, e: 'smile', g: 'thumbsUp'}, {look: RUMI, e: 'smile'}, {title: 'বন্ধু তো!', color: GREEN}),
  fight: Pair(Mess, {look: SHUVO, e: 'serious', g: 'explain'}, {look: RUMI, e: 'skeptical'}, {title: 'লাভের ভাগ নিয়ে তর্ক', color: RED}),
  rumi: Pair(Mess, {look: SHUVO, e: 'shocked'}, {look: RUMI, e: 'skeptical', g: 'pointL', talk: true}),
  renamed: R({place: Night, over: page('রুমি ফ্যাশন', '৫০,০০০', 'শুভ শার্টস')}),
  removed: R({place: Night, actors: [{look: SHUVO, x: 540, h: 1100, y: 1880, expression: 'shocked', gesture: 'hold', holding: HandPhone}], over: () => <Bounce x={140} y={430} at={2}><Notice text="আপনাকে পেজের অ্যাডমিন থেকে সরানো হয়েছে" /></Bounce>}),
  restart: R({place: Mess, over: page('শুভ ক্লোদিং', '০'), title: 'আবার শূন্য থেকে', color: GOLD}),
  jony: Pair(Mess, {look: SHUVO, e: 'serious'}, {look: JONY, e: 'neutral'}, {title: 'পুরোনো প্রতিদ্বন্দ্বী', color: RED}),
  paper: R({place: Mess, over: () => <Bounce x={220} y={480} at={2}><Contract /></Bounce>, title: 'পাসওয়ার্ড দুজনের হাতে', color: GREEN}),
  jonyline: Pair(Mess, {look: SHUVO, e: 'smile'}, {look: JONY, e: 'serious', g: 'pointUp', talk: true}),
  grow: R({bg: 'dark', over: () => <div style={{position: 'absolute', left: 0, right: 0, top: 420, display: 'flex', justifyContent: 'center'}}><GrowBars a="পুরোনো পেজ" b="নতুন পেজ" /></div>, title: 'দুই বছরে ছাড়িয়ে যায়', color: GREEN}),
  punch1: Card('বন্ধুকে সব দেয়, বন্ধু সব নিয়ে যায়', {size: 90, color: RED, bg: 'dark'}),
  punch2: Card('শত্রুকে একটা সুযোগ, শত্রু সব গড়ে দেয়', {size: 90, color: GREEN, bg: 'dark'}),
  book: lawBook(2),
  lesson: R({bg: 'plain'}),
  act: Card('তোমার পাসওয়ার্ড কার কার হাতে?', {size: 94, color: GOLD, bg: 'dark'}),
  next: Next(3, <Cow color="black" size={620} garland />, {title: 'সবচেয়ে বড় গরু, ৬০ হাজার কম'}),
  next2: Next(3, <Cow color="black" size={620} flip garland />, {title: 'অথচ তাকানই না!', color: RED}),
  next3: Next(3, <PriceTag text="৳ -৬০,০০০" size={110} />, {title: 'কৌশলটা জেনে নিও'}),
  cta: () => (
    <Cta>
      <NextBadge law={3} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="৫০ হাজার ফলোয়ারের পেজ" l2="এক রাতে অন্য কারো!" bottom="হ্যাকার না, প্রাণের বন্ধু" term="48 Laws · Law 2" art={<div style={{position: 'absolute', left: 40, top: 1080}}><PageCard name="?????" followers="৫০,০০০" w={520} /></div>} size={84} />
);
export const law02 = story('law02/', raw, SCENES, Thumb, {logo: 'bba2'});
