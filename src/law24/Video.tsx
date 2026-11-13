import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {MOM, Pair, R, Solo, WOMAN, story} from '../common/reel';
import {HandPaper, crowd} from '../common/laws48';
import {Apartment, Glass, popIn, soft, tag} from '../common/elegant';
import {Key, VisitingCard, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const AMMA: ToonLook = {...MOM, top: '#5a3a5a', skirt: '#4a2a4a', glasses: true, age: 0.85};
const RUPA: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#2a5a8a', skirt: '#2a5a8a', bottom: '#2a5a8a', age: 0.35};
const LIMA: ToonLook = {...WOMAN, hairStyle: 'long', top: '#d9a21b', skirt: '#d9a21b', bottom: '#d9a21b'};
const House = <Home />;
const guests = (e: 'neutral' | 'surprised' = 'neutral') => crowd([130, 950], {h: 860, y: 1900, e, from: 2});
const amma = (e: 'laugh' | 'worried' | 'serious', g: 'explain' | 'pointUp' | 'idle' = 'idle') => ({look: AMMA, x: 540, h: 1060, y: 1880, expression: e, gesture: g, talking: g !== 'idle'});

const SCENES: Record<string, React.FC<SP>> = {
  h1: Solo(soft(House, 3), {look: RUPA, e: 'serious', g: 'hold', hold: HandPaper}, {title: 'হিসাবে পাকা বড় বউ', color: GOLD}),
  h2: R({place: soft(House, 6, 'gold'), actors: [{look: LIMA, x: 540, h: 1150, y: 1880, expression: 'smile', gesture: 'open'}], over: popIn(<Key size={440} />, 320, 440), title: 'চাবি ছোট বউয়ের হাতে', color: GREEN}),
  s01: R({place: soft(House, 3), actors: [{look: RUPA, x: 200, h: 960, y: 1880, expression: 'neutral', gesture: 'idle', lookX: 1}, amma('serious'), {look: LIMA, x: 880, h: 960, y: 1880, expression: 'smile', gesture: 'idle', lookX: -1}], title: 'যৌথ পরিবার', color: GOLD}),
  s02: Pair(soft(House, 3), {look: RUPA, e: 'serious'}, {look: LIMA, e: 'smile'}, {title: 'দশ বছরের বউ, নতুন বউ', color: GOLD}),
  s03: R({place: soft(<Home photo />, 4, 'gold'), actors: [...guests(), amma('laugh', 'explain')], title: 'মাংস পঁচিশ কেজি!', color: GOLD}),
  s04: Pair(soft(House, 4), {look: RUPA, e: 'serious', g: 'pointR', talk: true}, {look: AMMA, e: 'shocked'}),
  s05: R({place: soft(House, 5, 'cool'), actors: [...guests('surprised'), amma('worried')], title: 'ঘর চুপ', color: RED}),
  s06: R({place: soft(House, 7, 'night'), over: popIn(<Paper title="বিদ্যুৎ বিল" lines={['জমা: ৳১২,০০০', 'আসল: ৳৭,০০০']} />, 230, 520), title: 'এক মাস আগে', color: GOLD}),
  s07: Solo(soft(<Home dim />, 4, 'night'), {look: LIMA, e: 'thinking', g: 'hold', hold: HandPaper}, {title: 'কাউকে বলেনি', color: GOLD}),
  s08: Pair(soft(<Home dim />, 4, 'night'), {look: LIMA, e: 'smile', g: 'open', talk: true}, {look: AMMA, e: 'surprised'}),
  s09: R({place: soft(House, 4, 'gold'), actors: [...guests(), amma('laugh', 'pointUp')], title: 'ভুলটা তিনিই ধরেছেন', color: GOLD}),
  s10: Pair(soft(House, 4, 'gold'), {look: AMMA, e: 'smile', g: 'open'}, {look: LIMA, e: 'surprised'}, {over: popIn(<Key size={420} />, 330, 430), title: 'হজের আগে', color: GREEN}),
  s11: Glass('সবার সামনে ভুল ধরে পেয়েছে শত্রু', {place: House, tone: 'gold', sub: 'আড়ালে ধরে পেয়েছে চাবি', size: 80}),
  act: Glass('বড়দের ভুল ধরো আড়ালে', {place: House, color: '#bff2c8', sub: 'কৃতিত্বটা তাঁকেই দাও'}),
  ...ending(24, soft(<Apartment />, 14), [<VisitingCard name="সোহেল ইলেকট্রিক" sub="ফ্যান · লাইট · সুইচবোর্ড" />, 'যাকে সবাই ডাকত ওই সোহেল'], [tag('একই কাজ, তিনগুণ দাম', {bg: '#14532d'}), 'ডাকে পুরোনো পাড়াই'], 'নিজেকে নতুন করে বানানো'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="হিসাবে পাকা বড় বউ" l2="চাবি পেল নতুন ছোট বউ!" bottom="একই ভুল, ধরার জায়গা আলাদা" term="48 Laws · Law 24" art={<div style={{position: 'absolute', left: 60, top: 1180}}><Key size={480} /></div>} size={84} />
);
export const law24 = story('law24/', raw, SCENES, Thumb, {logo: 'bba2'});
