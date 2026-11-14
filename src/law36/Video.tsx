import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, Paper, PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {CommentCard} from '../common/places2';
import {Count, MIDDLE, Pair, R, Solo, Two, Y1, Y2, Y3, story} from '../common/reel';
import {Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {Bat, Cricket, MuriBowl, Station, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const NAEEM: ToonLook = {...Y2, top: '#2a5a8a', bottom: '#f2efe6'};
const RIPON: ToonLook = {...Y1, top: '#2a7a4a', bottom: '#f2efe6'};
const COACH: ToonLook = {...MIDDLE, kurta: false, top: '#1a1c22', bottom: '#2a2c30', glasses: true};
const Field = <Cricket />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(soft(Field, 3), {look: NAEEM, e: 'sad'}, {look: RIPON, e: 'neutral'}, {title: 'একই দিনে বাদ দুজন', color: RED}),
  h2: Two(Solo(soft(Field, 3, 'cool'), {look: NAEEM, e: 'shocked'}, {title: 'প্রতিবাদী: নিষিদ্ধ', color: RED}), Solo(soft(Field, 3, 'gold'), {look: RIPON, e: 'laugh', g: 'thumbsUp'}, {title: 'চুপ যে: অধিনায়ক', color: GREEN}), 0.5),
  s01: Pair(soft(Field, 2), {look: NAEEM, e: 'smile', g: 'thumbsUp'}, {look: RIPON, e: 'smile', g: 'thumbsUp'}, {title: 'দুই ওপেনার, তিন বছর', color: GOLD}),
  s02: R({place: soft(Field, 7), over: popIn(<Paper title="নতুন তালিকা" lines={['১. রাকিব', '২. শুভ', '৩. জয়', '…']} size={52} w={600} />, 240, 460), title: 'দুজনের নাম নেই', color: RED}),
  s03: R({place: soft(<Home dim />, 8, 'night'), over: popIn(<CommentCard name="নাঈম" text="কোচ নিজের লোক ঢোকাচ্ছে!" w={820} />, 130, 560), title: 'সেই রাতেই', color: RED}),
  s04: Pair(soft(Field, 4), {look: NAEEM, e: 'serious', g: 'pointR', talk: true}, {look: COACH, e: 'skeptical'}),
  s05: Pair(soft(Field, 5, 'cool'), {look: NAEEM, e: 'serious', g: 'pointR'}, {look: COACH, e: 'serious'}, {title: 'প্রতিদিন তর্ক', color: RED}),
  s06: Solo(soft(Field, 3, 'gold'), {look: RIPON, e: 'smile', g: 'shrug'}, {title: 'রিপন হাসে', color: GOLD}),
  s07: Pair(soft(Field, 4, 'gold'), {look: Y3, e: 'neutral'}, {look: RIPON, e: 'laugh', g: 'shrug', talk: true}),
  s08: Count(3, {post: 'টা সেঞ্চুরি', label: 'পাড়ার টুর্নামেন্টে রিপন', size: 200, color: GREEN, place: soft(Field, 10, 'gold')}),
  s09: R({place: soft(Field, 8, 'night'), actors: [{look: NAEEM, x: 540, h: 1100, y: 1880, expression: 'shocked', gesture: 'idle'}], over: sticker('এক বছরের নিষেধাজ্ঞা', {x: 110, y: 420, w: 860, bg: '#7a1f3a', size: 70})}),
  s10: Pair(soft(Field, 3, 'gold'), {look: COACH, e: 'smile', g: 'hold', hold: HandPhone}, {look: RIPON, e: 'laugh', g: 'thumbsUp'}, {title: 'রিপন অধিনায়ক', color: GREEN}),
  s11: Glass('চিৎকার হারটা মনে করায়', {place: Field, tone: 'gold', sub: 'পাত্তা না দেওয়া হারটা ভুলিয়ে দেয়'}),
  act: Glass('কাঁধ ঝাঁকাও', {place: Field, color: '#bff2c8', sub: 'অন্য মাঠে নিজেকে প্রমাণ করো'}),
  ...ending(36, soft(<Station />, 14), [<MuriBowl size={420} />, 'দশজন ঝালমুড়িওয়ালা'], [tag('পাঁচশো বনাম পাঁচ হাজার', {bg: '#14532d'}), 'স্বাদ কিন্তু একই'], 'চোখ আটকানোর শক্তি'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই দিনে বাদ দুই ক্রিকেটার" l2="যে চুপ ছিল, সে অধিনায়ক!" bottom="প্রতিবাদী হলো নিষিদ্ধ" term="48 Laws · Law 36" art={<div style={{position: 'absolute', left: 120, top: 1100}}><Bat size={170} /></div>} size={78} />
);
export const law36 = story('law36/', raw, SCENES, Thumb, {logo: 'bba2'});
