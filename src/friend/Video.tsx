import React from 'react';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP, pick} from '../common/kit';
import {HandPhone, PsyThumb, a} from '../common/psy';
import {Cake, ChaiStall, Counter, HandCup, Home, PhoneProp, Taka} from '../common/places';
import {BookScene, Bounce, Card, Cta, R, Slam} from '../common/reel';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const friendFallback = makeFallback(segs);

const RIYAD: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#4a7a5a', bottom: '#2a2c30', shoes: '#e8e4dc'};
const FRIENDS = [CAST.founder, CAST.customer, CAST.worker];
const BUDDY = CAST.founder;
const Dim = <Home dim />;
const Chat = <ChaiStall />;

// ফোনের পর্দায় বার্তা
const Screen: React.FC<{lines?: string[]; empty?: string; calls?: string}> = ({lines, empty, calls}) => (
  <PhoneProp w={480} screen="#101420">
    <div style={{position: 'absolute', inset: 0, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: empty || calls ? 'center' : 'flex-start', gap: 22, color: '#f2efe9', fontWeight: 800, fontSize: 48, textAlign: empty || calls ? 'center' : 'left'}}>
      {empty ? <div style={{color: '#9aa0ae'}}>{empty}</div> : null}
      {calls ? <div style={{color: '#e0606a', fontSize: 78}}>{calls}</div> : null}
      {(lines ?? []).map((l) => (
        <div key={l} style={{padding: '18px 22px', background: '#23314c', borderRadius: 22}}>{l}</div>
      ))}
    </div>
  </PhoneProp>
);

const atDoor = R({place: <Home />, actors: [a(FRIENDS[1], 180, 'worried', 'idle', {h: 880, y: 1640, lookX: 1}), a(FRIENDS[2], 860, 'worried', 'idle', {h: 880, y: 1640, lookX: -1}), a(BUDDY, 540, 'smile', 'idle', {h: 1000, y: 1740})], over: () => <Bounce x={345} y={1020} at={4}><Cake size={390} /></Bounce>});

const SCENES: Record<string, React.FC<SP>> = {
  cake: R({place: <Home />, actors: [a(FRIENDS[1], 180, 'worried', 'idle', {h: 880, y: 1640, lookX: 1}), a(FRIENDS[2], 860, 'worried', 'idle', {h: 880, y: 1640, lookX: -1}), a(BUDDY, 540, 'smile', 'idle', {h: 1000, y: 1740})], over: () => <Bounce x={345} y={1020} at={4}><Cake size={390} /></Bounce>, title: 'তিন সপ্তাহ পর, কেক হাতে!', size: 76, color: GOLD}),
  one: Slam('শুধু একটা জিনিস', {size: 150, top: 620, color: RED, place: Dim}),
  twoAm: R({place: Dim, actors: [a(RIYAD, 540, 'neutral', 'hold', {h: 1240, y: 1880, holding: HandPhone, talking: true})], title: 'রাত ২:০০', size: 110, color: RED}),
  money: R({place: <Home />, actors: [a(RIYAD, 540, 'smile', 'idle', {h: 1180, y: 1850})], over: () => <><Bounce x={70} y={1110} at={3}><Taka w={280} rot={-8} /></Bounce><Bounce x={730} y={1170} at={8} seed="t2"><Taka w={280} rot={8} /></Bounce></>, title: 'টাকা লাগলে: রিয়াদ', color: GOLD}),
  hospital: R({bg: 'linear-gradient(180deg, #b8d4d8, #7a9aa0)', actors: [a(RIYAD, 300, 'worried', 'open', {h: 1100, y: 1830, lookX: 1}), a(CAST.engineer, 790, 'serious', 'idle', {h: 1100, y: 1830, lookX: -1})], title: 'হাসপাতাল: রিয়াদ', color: GOLD}),
  always: R({place: <Home />, actors: [a(RIYAD, 540, 'smile', 'thumbsUp', {h: 1240, y: 1880})], title: 'কখনো "না" বলে না', color: GOLD}),
  bday: R({place: Chat, actors: [a(RIYAD, 540, 'sad', 'hold', {h: 1040, y: 1700, holding: HandCup})], front: () => <Counter top={1480} color="#3a2a1a" />, title: 'জন্মদিনের রাত', color: GOLD}),
  noMsg: R({place: Chat, over: () => <Bounce x={300} y={460} at={2}><Screen empty="কোনো মেসেজ নেই" /></Bounce>}),
  ring: R({place: Chat, actors: [a(RIYAD, 540, 'laugh', 'hold', {h: 1200, y: 1860, holding: HandPhone, talking: true})]}),
  move: R({place: Chat, actors: [a(RIYAD, 540, 'blank', 'hold', {h: 1240, y: 1880, holding: HandPhone})]}),
  silent: R({place: Dim, over: () => <Bounce x={300} y={460} at={2}><Screen calls="সাইলেন্ট" /></Bounce>}),
  noGo: R({place: Dim, actors: [a(RIYAD, 540, 'serious', 'idle', {h: 1240, y: 1870})], title: 'গেল না', color: RED}),
  away: R({place: Dim, actors: [a(RIYAD, 760, 'neutral', 'idle', {h: 860, y: 1640, lookX: 1})], title: 'শুধু সরে গেল', color: GOLD}),
  w1: R({place: Dim, over: () => <Bounce x={300} y={460} at={2}><Screen empty="কোনো খোঁজ নেই" /></Bounce>, title: 'প্রথম সপ্তাহ', color: GOLD}),
  w2: R({place: Dim, over: () => <Bounce x={300} y={460} at={2}><Screen lines={['কোথায় তুই?']} /></Bounce>, title: 'দ্বিতীয় সপ্তাহ', color: GOLD}),
  w3: R({place: Dim, over: () => <Bounce x={300} y={460} at={2}><Screen calls="১২টা মিসড কল" /></Bounce>, title: 'তৃতীয় সপ্তাহ', color: RED}),
  miss: R({place: <Home />, actors: [a(BUDDY, 540, 'worried', 'hold', {h: 1240, y: 1880, holding: HandPhone, talking: true})]}),
  door: atDoor,
  same: R({place: <Home />, actors: [a(BUDDY, 280, 'smile', 'idle', {h: 1060, y: 1820, lookX: 1}), a(RIYAD, 790, 'neutral', 'idle', {h: 1100, y: 1820, lookX: -1})]}),
  change: Slam('সবসময় পাওয়া যায় না', {size: 128, top: 620, color: '#5fd08a', place: <Home />}),
  book: BookScene('The 48 Laws of Power', 'Robert Greene', 'Law 16', '#3a1420'),
  blank: R({bg: 'plain'}),
  call: Card('সব ডাকে সাড়া দিও না', {color: RED, size: 104, place: Dim}),
  phone: Card('ফোন সাথে সাথে ধরার দরকার নেই', {color: GOLD, place: Dim}),
  move2: Card('সরে যাও। টের পেতে দাও।', {color: '#5fd08a', size: 100, place: Dim}),
  cta: () => (
    <Cta>
      <Cake size={420} />
    </Cta>
  ),
};
const Scene = pick(SCENES);

export const FriendThumbnail: React.FC = () => (
  <PsyThumb l1="জন্মদিন ভুলে গিয়েছিল" l2="এখন কেক নিয়ে দরজায়!" bottom="রিয়াদ শুধু একটা জিনিস বদলেছিল" term="48 Laws · Law 16" glow="rgba(227,191,122,0.32)" art={<div style={{position: 'absolute', left: 40, top: 1000}}><Cake size={500} /></div>} size={82} />
);
export const FriendVideo: React.FC<StoryProps> = (p) => <Story {...p} fx segments={segs} folder="friend/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<FriendThumbnail />} />;
