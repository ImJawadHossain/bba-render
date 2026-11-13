import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {CAST} from '../common/cast';
import {Cta, Pair, R, SIR, Solo, WOMAN, Y2, lawBook, story} from '../common/reel';
import {HandBox, Next, NextBadge, Rasgolla, crowd} from '../common/laws48';
import {Apartment, Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const HABIB: ToonLook = {...SIR, jacket: '#3a3230', tie: '#7a1f3a', glasses: false};
const NEIGHBOR: ToonLook = {...WOMAN, top: '#2a7a6a', skirt: '#2a7a6a', bottom: '#2a7a6a'};
const RUBEL: ToonLook = {...Y2, hairStyle: 'side', top: '#5a5f6e'};
const Out = <Apartment />;
const In = <Home />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Out), actors: [{look: HABIB, x: 540, h: 1040, y: 1880, expression: 'laugh', gesture: 'hold', holding: HandBox}], title: 'প্রথম দিনেই মিষ্টি', color: GOLD}),
  h2: R({place: soft(Out, 8), over: sticker('সার্ভিস চার্জ +৳১,৫০০', {y: 640, bg: '#7a1f3a', size: 74}), title: 'কেউ একটা কথাও বলে না', color: RED}),
  s01: R({place: soft(Out), title: 'মোহাম্মদপুর · বারো ফ্ল্যাট', color: GOLD}),
  s02: Pair(soft(In, 3), {look: HABIB, e: 'smile', g: 'hold', hold: HandBox}, {look: NEIGHBOR, e: 'laugh'}, {over: popIn(<Rasgolla size={300} />, 390, 640)}),
  s03: Pair(soft(Out, 3), {look: HABIB, e: 'smile', g: 'open'}, {look: CAST.worker, e: 'laugh', g: 'thumbsUp'}, {title: 'বকেয়া বেতন, ভাঙা গেট', color: GREEN}),
  s04: Pair(soft(In, 4), {look: NEIGHBOR, e: 'laugh', g: 'open', talk: true}, {look: CAST.customer, e: 'smile'}),
  s05: R({place: soft(In, 3), actors: [{look: HABIB, x: 540, h: 1020, y: 1820, expression: 'smile', gesture: 'wave'}, ...crowd([140, 940], {h: 860, y: 1900, e: 'smile'})], title: 'সেক্রেটারি: হাবিব সাহেব', color: GOLD}),
  s06: R({place: soft(In, 8), over: sticker('৳২,০০০ → ৳৩,৫০০', {y: 640, bg: '#7a1f3a', size: 96}), title: 'প্রথম মিটিং', color: RED}),
  s07: R({place: soft(Out, 4), over: sticker('ছাদের পার্কিং: শুধু হাবিব সাহেব', {y: 700, bg: '#14305f', size: 60})}),
  s08: Pair(soft(In, 4), {look: RUBEL, e: 'serious', g: 'pointUp'}, {look: CAST.customer2, e: 'worried', g: 'open'}, {title: 'হাতটা নামিয়ে দেন', color: RED}),
  s09: Pair(soft(In, 4), {look: NEIGHBOR, e: 'serious', g: 'open', talk: true}, {look: RUBEL, e: 'sad'}),
  s10: Glass('২০ হাজারের উপকারে ২ লাখের নীরবতা', {place: Out, color: '#ffd9a0'}),
  book: lawBook(12),
  lesson: R({bg: 'plain'}),
  act: Glass('হঠাৎ বড় উপকারের পরের দাবিটা হিসাব করো', {place: Out, color: '#bff2c8', size: 80}),
  next: Next(13, tag('বন্যার ত্রাণ', {w: 560, bg: '#14305f', size: 84}), {title: 'একই মালিক, দুই ছাত্র', place: soft(<Home />, 14, 'cool')}),
  next2: Next(13, <div style={{display: 'flex', gap: 30}}>{tag('৳৫০০', {w: 300, bg: '#7a1f3a', size: 90})}{tag('৳৫ লাখ', {w: 340, bg: '#14532d', size: 90})}</div>, {title: 'পার্থক্য একটা বাক্যে', place: soft(<Home />, 14, 'cool')}),
  next3: Next(13, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'চাওয়ার আগে জেনে নাও', place: soft(<Home />, 14, 'cool')}),
  cta: () => (
    <Cta>
      <NextBadge law={13} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="প্রথম দিনেই মিষ্টি" l2="ছয় মাসে চার্জ দেড় হাজার বেশি!" bottom="কেউ কিছু বলে না" term="48 Laws · Law 12" art={<div style={{position: 'absolute', left: 40, top: 1180}}><Rasgolla size={460} /></div>} size={80} />
);
export const law12 = story('law12/', raw, SCENES, Thumb, {logo: 'bba2'});
