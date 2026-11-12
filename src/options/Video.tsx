import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {Book, HandPhone, PsyThumb} from '../common/psy';
import {Home, PriceTag} from '../common/places';
import {ShopFront} from '../common/places2';
import {Bounce, Card, Cta, Hit, MIDDLE, Pair, R, SIR, Solo, Y3, lawBook, story} from '../common/reel';
import raw from './segments.json';

const FATHER: ToonLook = {...SIR, jacket: undefined, tie: undefined, top: '#5a7a9a'};
const RIFAT: ToonLook = {...Y3, top: '#d9822b', headScale: 1.15};
const SELLER: ToonLook = MIDDLE;
const Night = <Home dim />;
const Bazar = <ShopFront name="মাছের বাজার" signBg="#14305f" signColor="#ffe9a8" />;
const Fish: React.FC<{size?: number; color?: string}> = ({size = 360, color = '#b9c4cc'}) => (
  <svg viewBox="0 0 200 90" width={size} height={size * 0.45} style={{overflow: 'visible'}}>
    <path d="M10 45 C50 -5 130 -5 165 45 C130 95 50 95 10 45Z" fill={color} stroke="#1b1b1f" strokeWidth={6} />
    <path d="M160 45 L198 12 L198 78Z" fill={color} stroke="#1b1b1f" strokeWidth={6} />
    <circle cx={46} cy={36} r={8} fill="#1b1b1f" />
  </svg>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(Night, {look: RIFAT, e: 'skeptical'}, {look: FATHER, e: 'shocked', g: 'pointL', talk: true}, {title: 'তিন বছর ধরে বকা', color: RED}),
  h2: R({place: Night, over: () => <Bounce x={340} y={620} at={2}><Book size={380} label="অঙ্ক" /></Bounce>, title: 'একটা প্রশ্ন বদলাতেই', color: GREEN}),
  war: Hit('প্রতি সন্ধ্যায় যুদ্ধ', {size: 130, top: 620, color: RED, place: Night}),
  sit: Pair(Night, {look: RIFAT, e: 'neutral', hold: HandPhone}, {look: FATHER, e: 'serious', g: 'pointL', talk: true}),
  later: Solo(Night, {look: RIFAT, e: 'skeptical', hold: HandPhone, talk: true}, {near: true}),
  shout: R({place: Night, over: () => <><Bounce x={90} y={700} at={2}><PriceTag text="বকা" size={110} color={RED} /></Bounce><Bounce x={560} y={900} at={8} seed="c"><PriceTag text="চিৎকার" size={110} color={RED} rot={5} /></Bounce><Bounce x={160} y={1100} at={14} seed="m"><PriceTag text="মোবাইল কেড়ে নেওয়া" size={84} color={GOLD} rot={-3} /></Bounce></>}),
  stub: Solo(Night, {look: RIFAT, e: 'serious'}, {title: 'যত জোর, তত জেদ', color: RED}),
  bazar: Solo(Bazar, {look: FATHER, e: 'neutral'}, {title: 'শুধু সবজি কিনতে', color: GOLD}),
  fishman: Solo(Bazar, {look: SELLER, e: 'smile', g: 'open'}, {over: () => <Bounce x={90} y={1170} at={3}><Fish /></Bounce>}),
  which: Pair(Bazar, {look: FATHER, e: 'neutral'}, {look: SELLER, e: 'laugh', g: 'open', talk: true}, {over: () => <><Bounce x={120} y={1620} at={3}><Fish size={320} /></Bounce><Bounce x={620} y={1620} at={7} seed="r"><Fish size={320} color="#c9a07a" /></Bounce></>}),
  rui: R({place: Bazar, actors: [{look: FATHER, x: 620, h: 1120, y: 1830, expression: 'thinking', gesture: 'think'}], over: () => <Bounce x={60} y={1160} at={3}><Fish size={380} color="#c9a07a" /></Bounce>}),
  nofish: Hit('মাছ কিনতেই আসেননি!', {size: 122, top: 620, color: GOLD, place: Bazar}),
  soft: Solo(Night, {look: FATHER, e: 'smile'}, {near: true}),
  ask: Pair(Night, {look: RIFAT, e: 'surprised', hold: HandPhone}, {look: FATHER, e: 'smile', g: 'open', talk: true}),
  moment: Solo(Night, {look: RIFAT, e: 'thinking', g: 'think'}, {near: true}),
  math: Solo(Night, {look: RIFAT, e: 'neutral', g: 'open', talk: true}),
  book1: R({place: Night, over: () => <Bounce x={340} y={620} at={1}><Book size={380} label="অঙ্ক" /></Bounce>}),
  gone: Card('"পড়বি কি না" প্রশ্নটাই নেই', {size: 94, color: GOLD, place: Night}),
  book: lawBook(31),
  t1: Card('দুটো পথ দাও, দুটোই তোমার পছন্দের', {size: 88, color: GREEN, place: Night}),
  t2: Card('তৃতীয়টা কোথায়?', {size: 120, color: RED, place: Night}),
  cta: () => (
    <Cta>
      <Book size={320} label="অঙ্ক" />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="তিন বছর বকে হয়নি" l2="এক প্রশ্নে ছেলে পড়তে বসল!" bottom="প্রশ্নটা কী ছিল?" term="48 Laws · Law 31" glow="rgba(95,208,138,0.3)" art={<div style={{position: 'absolute', left: 90, top: 980}}><Book size={380} label="অঙ্ক" /></div>} size={78} />
);
export const options = story('options/', raw, SCENES, Thumb);
