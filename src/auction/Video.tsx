import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Board, CLASS_BG, ClassRoom, PROF, PsyThumb} from '../common/psy';
import {Bill} from '../mcdonalds/art';
import {Bounce, Card, Count, Cta, Hit, Pair, R, Solo, WOMAN, Y2, story} from '../common/reel';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const Room: React.FC<{board?: string; lines?: string[]}> = ({board, lines}) => (
  <div style={{position: 'absolute', inset: 0, background: CLASS_BG}}>
    {board || lines ? <Board text={board} lines={lines} top={300} size={66} h={420} /> : null}
  </div>
);

// দামের প্ল্যাকার্ড, বক্তার মাথার পাশে
const Bid: React.FC<{text: string; x: number}> = ({text, x}) => (
  <Bounce x={x} y={600} at={3} seed={text}>
    <div style={{width: 380, padding: '18px 0', textAlign: 'center', background: '#f6f2e8', border: '10px solid #1b1b1f', borderRadius: 22, fontSize: 130, fontWeight: 900, color: RED, boxShadow: '0 20px 50px rgba(0,0,0,0.5)'}}>{text}</div>
  </Bounce>
);

// বড় করে ২০ ডলারের নোট
const Note: React.FC<{size?: number}> = ({size = 760}) => (
  <div style={{position: 'relative', display: 'inline-block'}}>
    <Bill size={size} />
    <div style={{position: 'absolute', left: -size * 0.06, top: -size * 0.1, padding: `${size * 0.01}px ${size * 0.04}px`, background: GOLD, border: `${Math.max(4, size * 0.012)}px solid #1b1b1f`, borderRadius: size * 0.03, fontSize: size * 0.13, fontWeight: 900, color: '#1b1b1f', transform: 'rotate(-8deg)'}}>$20</div>
  </div>
);

const SARAH: ToonLook = {...WOMAN, top: '#2b5fd9', skirt: '#1c2a4a', bottom: '#1c2a4a'};
const MIKE: ToonLook = Y2;
const MAX: ToonLook = PROF;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({bg: 'dark', over: () => <Bounce x={160} y={560} at={1}><Note /></Bounce>, title: '$20 নোট = $204', color: RED, size: 110, titleTop: 250}),
  h2: R({place: <Room />, over: () => <ClassRoom lookX={0} />, title: 'সবাই MBA-র ছাত্র', color: GOLD}),
  max: R({place: <Room />, actors: [{look: MAX, x: 540, h: 1240, y: 1870, expression: 'smile', gesture: 'pointUp'}], over: () => <Bounce x={300} y={460} at={4}><Note size={480} /></Bounce>, title: 'Max Bazerman', color: GOLD, titleTop: 220}),
  rule: Solo(<Room />, {look: MAX, e: 'serious', g: 'explain', talk: true}),
  bids: R({place: <Room />, over: () => <ClassRoom lookX={0} up={[0, 2, 3, 5, 6, 8]} />, title: '১... ২... ৫... ১০', color: GREEN}),
  two: Pair(<Room />, {look: SARAH, e: 'serious'}, {look: MIKE, e: 'serious'}, {title: 'বাকি শুধু দুজন', color: GOLD}),
  s18: Pair(<Room />, {look: SARAH, e: 'serious', g: 'pointUp', talk: true}, {look: MIKE, e: 'neutral'}, {over: () => <Bid text="$18" x={70} />}),
  m19: Pair(<Room />, {look: SARAH, e: 'worried'}, {look: MIKE, e: 'smile', g: 'pointUp', talk: true}, {over: () => <Bid text="$19" x={600} />}),
  sThink: Card('থামলে $১৮ শেষ। $২০ বললে নোটটা অন্তত পাব।', {size: 80, color: GOLD, bg: 'dark'}),
  s20: Pair(<Room />, {look: SARAH, e: 'serious', g: 'pointUp', talk: true}, {look: MIKE, e: 'shocked'}, {over: () => <Bid text="$20" x={70} />}),
  mThink: Card('একুশ বললে ক্ষতি মাত্র $১', {size: 92, color: GOLD, bg: 'dark'}),
  m21: Pair(<Room />, {look: SARAH, e: 'shocked'}, {look: MIKE, e: 'serious', g: 'pointUp', talk: true}, {over: () => <Bid text="$21" x={600} />}),
  quiet: R({place: <Room />, over: () => <ClassRoom lookX={0} expr="shocked" />, title: 'ঘর চুপ', color: RED}),
  why: Hit('জেতা না, হার ঠেকানো', {size: 120, color: GOLD, bg: 'dark'}),
  climb: Count(150, {from: 21, pre: '$', size: 230, label: 'দুজনের লড়াই', color: RED, bg: 'dark'}),
  record: R({bg: 'dark', over: () => <Bounce x={160} y={620} at={1}><Note /></Bounce>, title: 'বিক্রি: $২০৪', color: RED, size: 120, titleTop: 300}),
  always: Solo(<Room board="প্রায় কখনো $20-এ থামে না" />, {look: MAX, e: 'smile', g: 'shrug'}),
  book: R({bg: 'plain', over: () => <Bounce x={90} y={340} at={2}><div style={{width: 640, padding: '46px 34px', background: '#14305f', border: `10px solid ${GOLD}`, borderRadius: 18, textAlign: 'center', fontWeight: 800}}><div style={{fontSize: 58, lineHeight: 1.22, color: GOLD}}>Judgment in Managerial Decision Making</div><div style={{marginTop: 22, fontSize: 42, color: '#f2efe9'}}>Max Bazerman</div><div style={{marginTop: 22, display: 'inline-block', padding: '8px 26px', background: RED, borderRadius: 14, fontSize: 44, color: '#fff'}}>Martin Shubik, 1971</div></div></Bounce>}),
  lesson: R({bg: 'plain'}),
  act: Card('নামার আগেই ঠিক করো, কোথায় থামবে', {size: 92, color: GREEN, bg: 'dark'}),
  cta: () => (
    <Cta>
      <Note size={520} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="২০ ডলারের নোট" l2="বিক্রি ২০৪ ডলারে!" bottom="ক্রেতারা সবাই MBA-র ছাত্র" term="Dollar Auction" art={<div style={{position: 'absolute', left: 60, top: 1100}}><Note size={560} /></div>} size={92} />
);
export const auction = story('auction/', raw, SCENES, Thumb, {logo: 'bba2'});
