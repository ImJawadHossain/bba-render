import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Cake, Home} from '../common/places';
import {CommentCard} from '../common/places2';
import {Bounce, Card, Count, Cta, Hit, MOM, Pair, R, Solo, WOMAN, lawBook, story} from '../common/reel';
import raw from './segments.json';

const LIMA = WOMAN;
const Room = <Home />;
const Night = <Home dim />;
const card = (x: number, y: number, name: string, text: string, at: number, bad = true, rot = 0) => <Bounce x={x} y={y} at={at} seed={name + y}><CommentCard name={name} text={text} size={50} w={740} bad={bad} rot={rot} /></Bounce>;
const badOne = 'এই কেক খেয়ে আমার পেট খারাপ হয়েছে।';

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: Night, over: () => card(170, 720, 'অচেনা লোক', badOne, 2), title: 'দেখেছে মাত্র একজন', color: GOLD}),
  h2: Count(3000, {size: 240, label: 'লিমা জবাব দিতেই দেখল', post: ' জন', color: RED, place: Night}),
  sells: R({place: Room, over: () => <Bounce x={330} y={640} at={2}><Cake size={420} /></Bounce>, title: 'মাসে ৪০টা অর্ডার', color: GREEN}),
  one: Solo(Room, {look: LIMA, e: 'smile', hold: HandPhone}),
  bad: R({place: Room, over: () => card(170, 720, 'অচেনা লোক', badOne, 2)}),
  proof: R({place: Room, over: () => card(170, 720, 'অচেনা লোক', badOne, 0), title: 'প্রমাণ নেই, লাইকও নেই', size: 78, color: GOLD}),
  hot: Solo(Night, {look: LIMA, e: 'shocked', hold: HandPhone, talk: true}, {near: true}),
  reply: R({place: Night, over: () => <>{card(90, 500, 'লিমা', 'মিথ্যা কথা! প্রমাণ দেখান!', 1, false, -1)}{card(260, 790, 'অচেনা লোক', 'আমার পেটই প্রমাণ!', 8, true, 1)}{card(90, 1070, 'লিমার বন্ধু', 'আপনি মিথ্যাবাদী!', 14, false, -1)}</>}),
  days: Hit('তিন দিন ধরে ঝগড়া', {size: 130, top: 620, color: RED, place: Night}),
  heard: R({place: Night, over: () => <>{card(170, 620, 'অচেনা আপু', 'ওই কেকে নাকি পেট খারাপ হয়?', 2)}{card(170, 910, 'আরেকজন', 'তাই নাকি? কিনব না তাহলে।', 9)}</>}),
  five: Count(5, {post: ' টা অর্ডার', from: 40, size: 180, label: 'পরের মাসে', color: RED, place: Night}),
  sis: Pair(Night, {look: LIMA, e: 'sad', hold: HandPhone}, {look: MOM, e: 'serious', hold: HandPhone}),
  sisay: Pair(Night, {look: LIMA, e: 'sad'}, {look: MOM, e: 'serious', g: 'open', talk: true}),
  again: R({place: Room, over: () => card(170, 720, 'অচেনা লোক', 'এই পেজের কেক ভালো না।', 2)}),
  shake: Solo(Room, {look: LIMA, e: 'worried', hold: HandPhone}, {near: true}),
  newc: R({place: Room, over: () => <Bounce x={330} y={640} at={2}><Cake size={420} /></Bounce>, title: 'জবাব নয়, নতুন কেক', color: GREEN}),
  more: R({place: Room, over: () => <>{card(170, 560, 'অচেনা লোক', 'কেউ শুনছেন?', 1)}{card(170, 820, 'অচেনা লোক', 'উত্তর দিন!', 8)}{card(170, 1080, 'অচেনা লোক', 'হ্যালো?', 15)}</>}),
  gone: Solo(Room, {look: LIMA, e: 'laugh'}, {title: 'সে নিজেই হারিয়ে গেল', color: GREEN}),
  book: lawBook(36),
  t1: Card('রাগের মাথায় জবাব না', {size: 104, color: RED, place: Night}),
  t2: Card('উত্তরে নতুন কাজ দেখাও', {size: 100, color: GREEN, place: Room}),
  cta: () => (
    <Cta>
      <Cake size={420} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একটা কমেন্ট দেখেছিল একজন" l2="জবাব দিতেই দেখল ৩ হাজার!" bottom="ব্যবসা প্রায় শেষ" term="48 Laws · Law 36" art={<div style={{position: 'absolute', left: 40, top: 1040}}><Cake size={470} /></div>} size={76} />
);
export const comment = story('comment/', raw, SCENES, Thumb);
