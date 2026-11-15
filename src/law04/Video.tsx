import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {PriceTag} from '../common/places';
import {Fair} from '../common/places2';
import {Bounce, Card, Count, Cta, ELDER, Pair, R, Solo, Two, Y3, lawBook, story} from '../common/reel';
import {HandCamera, HandPaper, Next, NextBadge, PhotoStudio, PriceSheet, Rasgolla, Talk, crowd} from '../common/laws48';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MITHU: ToonLook = {...Y3, top: '#2a2c34'};
const JABBAR: ToonLook = {...ELDER, glasses: false};
const JABBAR_G: ToonLook = ELDER;

const S = <PhotoStudio />;
const sheet = (amount: string, old?: string, x = 300, y = 380) => () => (
  <Bounce x={x} y={y} at={2} seed={amount}>
    <PriceSheet amount={amount} old={old} w={480} />
  </Bounce>
);
const jab = (e: 'blank' | 'skeptical' | 'neutral', look = JABBAR) => ({look, e, g: 'hold' as const, hold: HandPaper});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: S, actors: [{look: MITHU, x: 540, h: 1000, y: 1880, expression: 'worried', gesture: 'open'}], over: sheet('৩০,০০০', '৫০,০০০', 300, 360)}),
  h2: Solo(S, {look: JABBAR, e: 'blank'}, {title: 'একটা শব্দও না', color: RED}),
  come: Pair(<PhotoStudio sign />, {look: MITHU, e: 'smile', g: 'hold', hold: HandCamera}, {look: JABBAR, e: 'neutral'}, {}),
  paper: Pair(S, {look: MITHU, e: 'smile', g: 'open'}, jab('neutral'), {over: sheet('৫০,০০০')}),
  stare: Solo(S, jab('blank'), {near: true, title: 'চুপ', color: RED}),
  five: Two(Count(5, {post: ' সেকেন্ড', label: 'কেউ কিছু বলে না', size: 220, color: RED, place: S}), Solo(S, {look: MITHU, e: 'worried'}, {near: true}), 0.5),
  drone: Pair(S, {look: MITHU, e: 'worried', g: 'open', talk: true}, jab('blank'), {over: () => <Bounce x={560} y={470} at={6}><PriceTag text="ড্রোন ফ্রি!" color="#9fd3ff" size={80} /></Bounce>}),
  quiet: Solo(S, jab('blank'), {near: true, title: 'চুপ', color: RED}),
  nowork: Pair(S, {look: MITHU, e: 'worried', g: 'open', talk: true}, jab('blank'), {over: sheet('৪৫,০০০', '৫০,০০০', 300, 640)}),
  brow: Solo(S, jab('skeptical'), {near: true}),
  thirty: Pair(S, {look: MITHU, e: 'shocked', g: 'open', talk: true}, jab('skeptical'), {over: sheet('৩০,০০০', '৪৫,০০০', 300, 640)}),
  glasses: Solo(S, {look: JABBAR_G, e: 'surprised', g: 'hold', hold: HandPaper}, {near: true, title: 'চশমা!', color: GOLD}),
  jabbar: Pair(S, {look: MITHU, e: 'shocked'}, {look: JABBAR_G, e: 'smile', g: 'open', talk: true}),
  lost: Count(20000, {pre: '−৳', label: 'এক নীরবতার দাম', size: 200, color: RED, place: S}),
  worth: Solo(S, {look: MITHU, e: 'sad'}, {title: 'আর হারায় নিজের দাম', color: RED}),
  wedding: R({
    place: <Fair name="বিয়ে বাড়ি" />,
    actors: [{look: JABBAR_G, x: 300, h: 1040, y: 1840, expression: 'laugh', gesture: 'explain', talking: true, lookX: 1}, ...crowd([700, 920], {h: 900, y: 1840, e: 'surprised'})],
    over: () => <Bounce x={90} y={470} at={6}><Talk text="ছেলেটার কাজ নেই, সস্তায় পাওয়া যায়!" size={58} w={760} /></Bounce>,
  }),
  clients: R({place: S, actors: crowd([140, 400, 680, 940], {h: 820, y: 1880, e: 'smile'}), over: () => <>{[30, 280, 560, 800].map((x, i) => <Bounce key={x} x={x} y={760 + (i % 2) * 70} at={2 + i * 4} seed={`c${x}`}><PriceTag text="৩০,০০০" color="#ff8a8a" size={54} /></Bounce>)}</>, title: 'সবাই আসে ৩০ নিয়ে', color: RED}),
  book: lawBook(4),
  lesson: R({bg: 'plain'}),
  act: Card('দাম বলে চুপ থাকো, পরের কথা অন্যজনের', {size: 88, color: GREEN, place: S}),
  next: Next(5, <Rasgolla size={520} />, {title: '৪০ বছরের দোকান, ৩ মাসে খালি'}),
  next2: Next(5, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'শুধু একটা প্রশ্নে', color: RED}),
  next3: Next(5, <Talk text="শুনলাম... সত্যি নাকি?" size={70} />, {title: 'তোমার নামেও উঠতে পারে'}),
  cta: () => (
    <Cta>
      <NextBadge law={5} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ক্লায়েন্ট চুপ" l2="নিজেই দাম কমায় ২০ হাজার!" bottom="নীরবতার আসল কারণ শুনলে চমকাবে" term="48 Laws · Law 4" art={<div style={{position: 'absolute', left: 40, top: 1060}}><PriceSheet amount="৩০,০০০" old="৫০,০০০" w={480} /></div>} size={80} />
);
export const law04 = story('law04/', raw, SCENES, Thumb, {logo: 'bba2'});
