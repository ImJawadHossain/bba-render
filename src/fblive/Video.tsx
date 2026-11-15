import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Counter, Home, SareePile} from '../common/places';
import {CommentCard, LiveBadge} from '../common/places2';
import {BookScene, Bounce, Card, Count, Cta, Hit, R, Solo, WOMAN, story} from '../common/reel';
import raw from './segments.json';

const TANZILA: ToonLook = {...WOMAN, top: '#2a7a6a', skirt: '#2a7a6a', bottom: '#2a7a6a'};
const Room = <Home />;
const Night = <Home dim />;
const table = (n: number) => () => <><Counter top={1440} /><SareePile n={n} y={1385} x={200} w={680} /></>;
const live = (viewers?: string) => () => <LiveBadge viewers={viewers} />;
const card = (x: number, y: number, name: string, text: string, at: number, rot = 0, bad = false) => <Bounce x={x} y={y} at={at} seed={name + y}><CommentCard name={name} text={text} rot={rot} size={50} w={720} bad={bad} /></Bounce>;
const Wardrobe = (shut: boolean) => () => (
  <div style={{position: 'absolute', left: 170, top: 480, width: 740, height: 880, background: '#6a4a2e', border: '12px solid #1b1b1f', borderRadius: 14, display: 'flex', gap: 10, padding: 12, boxSizing: 'border-box'}}>
    {shut ? (
      <>
        <div style={{flex: 1, background: '#7a5636', borderRadius: 8, border: '5px solid #1b1b1f'}} />
        <div style={{flex: 1, background: '#7a5636', borderRadius: 8, border: '5px solid #1b1b1f'}} />
      </>
    ) : (
      <div style={{position: 'relative', flex: 1, background: '#2a1c12', overflow: 'hidden'}}>
        <SareePile n={46} x={30} y={810} w={640} />
      </div>
    )}
  </div>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: Room, actors: [{look: TANZILA, x: 540, h: 1040, expression: 'sad', gesture: 'open'}], front: table(16), over: live('৪০'), title: 'একটাও বিক্রি নেই', color: RED}),
  h2: R({place: Room, over: () => <>{card(90, 480, 'রিমা', 'আমারটা রাখেন আপু!', 1, -1)}{card(270, 760, 'সুমি', 'আমি আগে বলেছি!', 7, 1, true)}{card(90, 1040, 'রিমা', 'না, আমি আগে!', 13, -1, true)}</>}),
  has: R({place: Night, back: Wardrobe(false), title: 'দুইশো শাড়ি', color: GOLD}),
  many: R({place: Room, actors: [{look: TANZILA, x: 540, h: 1040, expression: 'smile', gesture: 'open', talking: true}], front: table(16), over: live('৪০')}),
  later: R({place: Room, over: () => <>{card(170, 620, 'রিমা', 'দারুণ, পরে নেব', 2)}{card(190, 920, 'সুমি', 'পরে নেব আপু', 10)}</>}),
  never: Hit('পরে আর কেউ আসে না', {size: 120, top: 620, color: RED, place: Night}),
  count: Solo(Night, {look: TANZILA, e: 'thinking', g: 'think'}, {title: 'শাড়িগুলো গুনে দেখল', color: GOLD}),
  why: Card('সবগুলো একসাথে দেখাই কেন?', {size: 100, color: GOLD, place: Night}),
  shut: R({place: Room, back: Wardrobe(true), title: 'আলমারি বন্ধ', color: GOLD}),
  five: R({place: Room, actors: [{look: TANZILA, x: 540, h: 1040, expression: 'smile', gesture: 'idle'}], front: table(5), title: 'মাত্র পাঁচটা', color: GOLD}),
  say5: R({place: Room, actors: [{look: TANZILA, x: 540, h: 1040, expression: 'serious', gesture: 'explain', talking: true}], front: table(5), over: live('৪০')}),
  run: R({place: Room, over: () => <>{card(170, 620, 'রিমা', 'কত দাম আপু?', 2)}{card(190, 920, 'সুমি', 'আমাকে একটা!', 8)}</>}),
  fight: R({place: Room, over: () => <>{card(90, 480, 'রিমা', 'আমারটা রাখেন আপু!', 1, -1)}{card(270, 760, 'সুমি', 'আমি আগে বলেছি!', 7, 1, true)}{card(90, 1040, 'রিমা', 'না, আমি আগে!', 13, -1, true)}</>}),
  three: Count(3, {post: ' মিনিটে শেষ', size: 170, label: 'পাঁচটা শাড়ি', color: RED, place: Room}),
  again: R({place: Room, actors: [{look: TANZILA, x: 540, h: 1040, expression: 'laugh', gesture: 'open', talking: true}], front: table(5), over: live('৯০০')}),
  half: Count(50, {post: ' টা শাড়ি', size: 180, label: 'আধা ঘণ্টায়', color: GREEN, place: Room}),
  after: Solo(Night, {look: TANZILA, e: 'laugh'}, {near: true}),
  cust: R({place: Night, over: () => card(180, 720, 'কাস্টমার', 'আমি তো শাড়ি কিনতে আসিনি!', 2)}),
  book: BookScene('Influence', 'Robert Cialdini', 'Scarcity'),
  t1: Card('এত কম না থাকলেও কি কিনতাম?', {size: 92, color: RED, place: Night}),
  t2: Card('ভাগ করে দেখাও, মিথ্যা বলো না', {size: 92, color: GREEN, place: Room}),
  cta: () => <Cta />,
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দুইশো শাড়ি: কেউ নেয় না" l2="মাত্র ৫টা: কমেন্টে ঝগড়া!" bottom="একই শাড়ি, একই দাম" term="Scarcity" art={<div style={{position: 'absolute', left: 0, top: 1320, width: 620, height: 200}}><SareePile n={16} x={30} y={150} w={520} /></div>} size={80} />
);
export const fblive = story('fblive/', raw, SCENES, Thumb);
