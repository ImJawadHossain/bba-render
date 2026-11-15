import React from 'react';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {SP, pick} from '../common/kit';
import {HandPhone, PsyThumb, a} from '../common/psy';
import {Chair, Home, PhoneProp, Rooftop, Taka} from '../common/places';
import {BookScene, Bounce, Card, Count, Cta, R, Slam} from '../common/reel';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const landlordFallback = makeFallback(segs);

const RAHMAN: ToonLook = {skin: '#d9a784', hair: '#e6e2da', hairStyle: 'balding', top: '#f2efe6', kurta: true, bottom: '#e6e2d6', glasses: true, mustache: true, age: 0.9, shoes: '#3a2618'};
const MAHIN: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#3a7a6a', bottom: '#2a2c30', shoes: '#e8e4dc'};

const Dusk = <Rooftop />;
const SCENES: Record<string, React.FC<SP>> = {
  never: Slam('এক টাকাও কমাননি!', {size: 126, top: 240, color: RED, place: <Home />, back: () => <div style={{position: 'absolute', left: 240, top: 840}}><Taka w={600} amount="ভাড়া" /></div>}),
  mahin: Count(2000, {post: ' টাকা কম', size: 124, label: 'একটা অনুরোধও না করে', color: GREEN, place: <Home />}),
  rahman: R({place: <Home />, actors: [a(RAHMAN, 540, 'serious', 'idle', {h: 1240, y: 1860})], title: 'রহমান সাহেব', color: GOLD}),
  answer: R({place: <Home />, actors: [a(MAHIN, 280, 'worried', 'open', {h: 1160, y: 1860, lookX: 1}), a(RAHMAN, 780, 'serious', 'idle', {h: 1200, y: 1860, lookX: -1})]}),
  leave: R({place: <Home />, actors: [a(RAHMAN, 560, 'serious', 'pointL', {h: 1300, y: 1900, talking: true})]}),
  tried: R({place: <Home />, actors: [a(CAST.customer, 200, 'worried', 'open', {h: 1000, y: 1800, lookX: 1}), a(CAST.customer2, 470, 'shocked', 'explain', {h: 960, y: 1800, lookX: 1}), a(RAHMAN, 830, 'blank', 'idle', {h: 1160, y: 1830, lookX: -1})], title: 'কিছুই হয়নি', color: RED}),
  watch: R({place: <Home />, actors: [a(MAHIN, 540, 'thinking', 'think', {h: 1260, y: 1880})], title: 'সে শুধু খেয়াল করল', color: GOLD}),
  photo: R({place: <Home photo />, actors: [a(MAHIN, 280, 'thinking', 'pointR', {h: 1120, y: 1840, lookX: 1})], title: 'ছেলের ছবি', color: GOLD}),
  roof: R({place: Dusk, actors: [a(RAHMAN, 420, 'sad', 'hold', {h: 1120, y: 1800, holding: HandPhone})], title: 'রোজ সন্ধ্যায় একা', color: GOLD, over: () => <Bounce x={680} y={1140} at={4}><PhoneProp w={200} screen="#23456f" /></Bounce>}),
  goes: R({place: Dusk, actors: [a(RAHMAN, 760, 'sad', 'hold', {h: 1120, y: 1820, holding: HandPhone, lookX: -0.4}), a(MAHIN, 260, 'neutral', 'idle', {h: 1100, y: 1820, lookX: 1})]}),
  asks: R({place: Dusk, actors: [a(MAHIN, 280, 'smile', 'open', {h: 1100, y: 1830, lookX: 1, talking: true}), a(RAHMAN, 780, 'neutral', 'hold', {h: 1120, y: 1830, holding: HandPhone, lookX: -1})]}),
  face: R({place: Dusk, actors: [a(RAHMAN, 540, 'surprised', 'hold', {h: 1500, y: 2060, holding: HandPhone})], title: 'মুখটা বদলে গেল', color: GOLD}),
  son: R({place: Dusk, over: () => <Bounce x={330} y={500} at={2}><PhoneProp w={420} screen="#3a3a44"><div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#f2efe9', fontSize: 58, fontWeight: 800, textAlign: 'center', gap: 20}}><div style={{width: 170, height: 170, borderRadius: '50%', background: '#9ec4dc'}} />ছেলে<div style={{fontSize: 40, color: '#e0606a'}}>মিসড কল</div></div></PhoneProp></Bounce>, title: 'পাঁচ বছর', color: RED}),
  first: R({place: Dusk, actors: [a(RAHMAN, 700, 'smile', 'explain', {h: 1140, y: 1830, talking: true, lookX: -1}), a(MAHIN, 270, 'smile', 'idle', {h: 1100, y: 1830, lookX: 1})], title: 'এই প্রথম কেউ জিজ্ঞেস করল', size: 74, color: GOLD}),
  daily: R({place: <Rooftop night />, actors: [a(RAHMAN, 710, 'laugh', 'open', {h: 1140, y: 1830, lookX: -1, talking: true}), a(MAHIN, 290, 'smile', 'hold', {h: 1100, y: 1830, holding: HandPhone, lookX: 1})], title: 'রোজ সন্ধ্যায়', color: GOLD}),
  six: R({place: Dusk, actors: [a(MAHIN, 540, 'worried', 'idle', {h: 1280, y: 1890})], title: 'ছয় মাস পর', color: GOLD}),
  hard: R({place: Dusk, actors: [a(MAHIN, 280, 'sad', 'open', {h: 1100, y: 1830, lookX: 1, talking: true}), a(RAHMAN, 780, 'worried', 'idle', {h: 1120, y: 1830, lookX: -1})]}),
  silent: R({place: Dusk, actors: [a(RAHMAN, 540, 'sad', 'idle', {h: 1460, y: 2010})]}),
  less: R({place: Dusk, actors: [a(MAHIN, 270, 'surprised', 'idle', {h: 1100, y: 1830, lookX: 1}), a(RAHMAN, 780, 'smile', 'open', {h: 1120, y: 1830, lookX: -1, talking: true})]}),
  stopped: R({place: <Rooftop night />, actors: [a(RAHMAN, 700, 'sad', 'hold', {h: 1120, y: 1820, holding: HandPhone, lookX: -0.6})], over: () => <div style={{position: 'absolute', left: 80, top: 1060, opacity: 0.85}}><Chair size={380} /></div>, title: 'মাহিনের চেয়ার খালি', color: RED}),
  book: BookScene('The 48 Laws of Power', 'Robert Greene', 'Law 33', '#3a1420'),
  blank: R({bg: 'plain'}),
  notice: R({place: <Home />, actors: [a(CAST.customer, 300, 'thinking', 'think', {h: 1100, y: 1830, lookX: 1}), a(CAST.exec, 780, 'smile', 'explain', {h: 1060, y: 1830, lookX: -1, talking: true})], title: 'মুখ কোথায় বদলে যায়?', color: GOLD}),
  find: Card('আগে দুর্বল জায়গাটা খুঁজে বের করো', {color: GOLD, place: Dusk}),
  guard: Card('নিজের দুর্বল জায়গা সবার সামনে খুলো না', {color: RED, place: <Rooftop night />}),
  cta: () => (
    <Cta>
      <Chair size={380} />
    </Cta>
  ),
};
const Scene = pick(SCENES);

export const LandlordThumbnail: React.FC = () => (
  <PsyThumb l1="কেউ ভাড়া কমাতে পারেনি" l2="মাহিন কমিয়ে নিল!" bottom="একটা অনুরোধও না করে" term="48 Laws · Law 33" glow="rgba(200,96,63,0.4)" art={<div style={{position: 'absolute', left: 60, top: 980}}><Chair size={420} /></div>} size={84} />
);
export const LandlordVideo: React.FC<StoryProps> = (p) => <Story {...p} fx segments={segs} folder="landlord/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<LandlordThumbnail />} />;
