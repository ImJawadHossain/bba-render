import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {ELDER, Pair, R, WOMAN, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Apartment, Glass, popIn, soft} from '../common/elegant';
import {Generator, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const BHABI: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#7a1f3a', skirt: '#7a1f3a', bottom: '#7a1f3a', age: 0.4};
const CHACHA: ToonLook = {...ELDER, top: '#e8e2d2'};
const Hall = <Home />;
const Flats = <Apartment />;
const Swatches: React.FC = () => (
  <div style={{display: 'flex', gap: 30}}>
    {[['#7a1f3a', 'মেরুন'], ['#1a1c22', 'কালো'], ['#2a6a4a', 'সবুজ']].map(([c, t]) => (
      <div key={t} style={{textAlign: 'center', fontSize: 50, fontWeight: 800, color: '#f2efe9'}}>
        <div style={{width: 240, height: 240, background: c, border: '8px solid #f2efe9', borderRadius: 20, boxShadow: '0 20px 50px rgba(0,0,0,0.5)'}} />
        <div style={{marginTop: 10, textShadow: '0 4px 16px rgba(0,0,0,0.8)'}}>{t}</div>
      </div>
    ))}
  </div>
);
const swatch = popIn(<Swatches />, 115, 520);
const meeting = (e: 'neutral' | 'serious' = 'neutral', hands = false) => crowd([140, 400, 680, 940], {h: 860, y: 1900, e}).map((a) => (hands ? {...a, gesture: 'pointUp' as const} : a));

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Flats, 5), over: popIn(<Generator size={520} />, 280, 640), title: 'আট লাখ: দুই মিনিটে', color: GREEN}),
  h2: R({place: soft(Flats, 6), over: swatch, title: 'গেটের রং: তিন ঘণ্টা', color: RED}),
  s01: R({place: soft(Hall, 3), actors: meeting(), title: 'মাসিক সভা', color: GOLD}),
  s02: R({place: soft(Hall, 8), over: popIn(<Paper title="Generator Quotation" lines={['50 kVA', 'Fuel: 12 L/hour', '৳ ৮,০০,০০০']} size={50} w={660} />, 210, 480)}),
  s03: R({place: soft(Hall, 3), actors: meeting('neutral', true), title: 'পাস। দুই মিনিট।', color: GREEN}),
  s04: R({place: soft(Flats, 6), over: swatch, title: 'গেটের রং', color: GOLD}),
  s05: Pair(soft(Hall, 4), {look: BHABI, e: 'serious', g: 'pointR', talk: true}, {look: CHACHA, e: 'skeptical'}),
  s06: Pair(soft(Hall, 4), {look: BHABI, e: 'skeptical'}, {look: CHACHA, e: 'serious', g: 'pointL', talk: true}),
  s07: R({place: soft(Hall, 4, 'dusk'), actors: meeting('serious'), title: 'তিন ঘণ্টা, সিদ্ধান্ত নেই', color: RED}),
  s08: R({place: soft(<Apartment night />, 4, 'night'), over: popIn(<Generator size={520} dead />, 280, 640), title: 'প্রথম লোডশেডিংয়েই শেষ', color: RED}),
  s09: Glass('রং বোঝে সবাই, তাই তর্ক', {place: Hall, tone: 'cool', sub: 'জেনারেটর বোঝে না কেউ, তাই চুপ'}),
  act: Glass('সবাই চুপ? সাবধান', {place: Hall, color: '#bff2c8', sub: 'যে বোঝে, তাকে দিয়ে প্রশ্ন করাও'}),
  ...outro('C. Northcote Parkinson', "বই: Parkinson's Law", '১৯৫৭', 'আসল নিয়ম'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="আট লাখের জেনারেটর: দুই মিনিট" l2="গেটের রং নিয়ে তিন ঘণ্টা ঝগড়া!" bottom="মিটিংয়ের সবচেয়ে বড় ফাঁদ" term="সাইকেল শেডের নিয়ম" art={<div style={{position: 'absolute', left: 60, top: 1160}}><Generator size={460} /></div>} size={76} />
);
export const b08 = story('b08/', raw, SCENES, Thumb, {logo: 'bba2'});
