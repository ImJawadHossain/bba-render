import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {HandPhone, Paper, PsyThumb, a} from '../common/psy';
import {HandCup, Home, PhoneProp} from '../common/places';
import {BoardSign, ShopFront, Village} from '../common/places2';
import {BookScene, Bounce, Card, Count, Cta, ELDER, Pair, R, SIR, Solo, Y1, Y2, story} from '../common/reel';
import raw from './segments.json';

const RASHID: ToonLook = ELDER;
const SOBUJ: ToonLook = {...Y1, top: '#f2efe6', tie: '#2b4fa0'};
const Room = <Home />;
const Calendar = (x = 620, y = 380, at = 2) => () => <Bounce x={x} y={y} at={at}><BoardSign text="বরিশাল সমিতি" w={380} size={50} bg="#f4efe2" color="#7a1f2a" /></Bounce>;
const agents = [a(SIR, 200, 'serious', 'explain', {h: 940, y: 1760}), a(Y2, 480, 'smile', 'open', {h: 900, y: 1720}), a(CAST.ceo, 760, 'worried', 'pointR', {h: 940, y: 1760})];

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: <ShopFront wall="#b8a888" />, actors: agents, title: 'তিনজনই খালি হাতে', color: RED}),
  h2: Solo(Room, {look: SOBUJ, e: 'smile', g: 'open', talk: false}, {over: Calendar(600, 380, 3)}),
  h3: Pair(Room, {look: SOBUJ, e: 'smile'}, {look: RASHID, e: 'laugh'}, {over: () => <Bounce x={330} y={1120} at={3}><Paper w={420} title="পলিসি" dots={2} size={48} /></Bounce>, title: 'কাগজ না পড়েই সই!', color: RED}),
  never: Solo(Room, {look: RASHID, e: 'skeptical'}, {title: 'পলিসি কিনবেন না', color: RED}),
  three: R({place: Room, actors: agents, over: () => <Bounce x={330} y={460} at={2}><Paper w={420} title="চার্ট, সুদ, ভয়" dots={2} size={52} /></Bounce>}),
  no: Pair(Room, {look: Y2, e: 'worried'}, {look: RASHID, e: 'serious', g: 'pointL', talk: true}),
  fourth: Solo(Room, {look: SOBUJ, e: 'smile'}, {title: 'চতুর্থজন: সবুজ', color: GOLD}),
  quiet: Pair(Room, {look: SOBUJ, e: 'neutral'}, {look: RASHID, e: 'skeptical'}),
  cal: R({place: Room, over: Calendar(310, 620), actors: [a(SOBUJ, 540, 'thinking', 'pointUp', {h: 900, y: 1820})]}),
  same: Pair(Room, {look: SOBUJ, e: 'surprised', g: 'pointR', talk: true}, {look: RASHID, e: 'surprised'}),
  lit: Solo(Room, {look: RASHID, e: 'laugh'}, {near: true}),
  sit: Pair(Room, {look: SOBUJ, e: 'smile'}, {look: RASHID, e: 'laugh', g: 'open', talk: true}),
  forty: Pair(<Village />, {look: SOBUJ, e: 'laugh', hold: HandCup}, {look: RASHID, e: 'laugh', g: 'explain', talk: true}, {title: 'ইলিশ, নদী, স্কুল', color: GOLD}),
  five: Count(5, {post: ' মিনিট পলিসি', size: 130, label: 'চল্লিশ মিনিট গল্প, শেষে', color: GOLD, place: Room}),
  sign: Pair(Room, {look: SOBUJ, e: 'smile'}, {look: RASHID, e: 'laugh', g: 'open', talk: true}, {over: () => <Bounce x={330} y={1120} at={3}><Paper w={420} title="পলিসি" dots={2} size={48} /></Bounce>}),
  out: Solo(<ShopFront wall="#b8a888" />, {look: SOBUJ, e: 'smile'}, {over: () => <Bounce x={660} y={1090} at={3}><Paper w={340} title="সই হলো" dots={2} size={44} rot={3} /></Bounce>}),
  next: Solo(<ShopFront wall="#b8a888" />, {look: SOBUJ, e: 'neutral'}, {over: () => <Bounce x={130} y={1000} at={3}><BoardSign text="পরের ঠিকানা: খুলনা" w={820} size={70} bg="#14305f" /></Bounce>}),
  search: R({place: <ShopFront wall="#b8a888" />, actors: [a(SOBUJ, 800, 'wink', 'hold', {h: 900, y: 1800, holding: HandPhone})], over: () => <Bounce x={100} y={520} at={2}><PhoneProp w={480} screen="#f4f6fa"><div style={{position: 'absolute', left: 16, right: 16, top: 60, padding: 18, background: '#fff', border: '4px solid #2b6fd9', borderRadius: 26, color: '#15151b', fontSize: 40, fontWeight: 800, lineHeight: 1.3}}>খুলনার বিখ্যাত খাবার কী?</div></PhoneProp></Bounce>}),
  book: BookScene('Influence', 'Robert Cialdini', 'Liking'),
  t1: Card('"আমিও আপনার মতো"? কাগজটা আরও মন দিয়ে পড়ো', {size: 80, color: RED, place: Room}),
  t2: Card('আগে সত্যিকারের একটা মিল খোঁজো', {size: 90, color: GREEN, place: Room}),
  cta: () => (
    <Cta>
      <Paper w={420} title="পলিসি" dots={3} size={48} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="তিন এজেন্ট ব্যর্থ" l2="চতুর্থজনের এক কথায় সই!" bottom={'"আমার বাড়িও বরিশাল"'} term="Liking" glow="rgba(227,191,122,0.3)" art={<div style={{position: 'absolute', left: 50, top: 1000}}><Paper w={440} title="পলিসি" dots={3} size={50} /></div>} size={82} />
);
export const village = story('village/', raw, SCENES, Thumb);
