import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {ClassRoom, PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {TeaAlley} from '../common/places2';
import {Count, Cta, MIDDLE, MOM, Pair, R, Solo, Y3, lawBook, story} from '../common/reel';
import {HandPaper, Next, NextBadge, crowd} from '../common/laws48';
import {Envelope, Glass, Library, SchoolRoom, soft, sticker} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RAYHAN: ToonLook = {...Y3, top: '#3a5aa0'};
const Lib = <Library />;
const House = <Home />;
const Street = <TeaAlley night={false} />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Solo(soft(Lib, 3), {look: RAYHAN, e: 'serious', g: 'idle'}, {title: 'ছাত্র খোঁজা বন্ধ', color: GOLD}),
  h2: R({place: soft(House, 2), actors: crowd([110, 300, 490, 680, 870, 1020], {h: 780, y: 1900, e: 'worried', from: 4}), title: 'দরজায় লাইন, ফি পাঁচগুণ', color: GREEN}),
  s01: Solo(soft(Lib, 4), {look: RAYHAN, e: 'smile', g: 'thumbsUp'}, {title: 'অংকে ভালো, টিউশন নেই', color: GOLD}),
  s02: R({place: soft(Street, 2), actors: [{look: RAYHAN, x: 300, h: 1040, y: 1860, expression: 'worried', gesture: 'hold', holding: HandPaper, lookX: 1}], over: sticker('অংকের টিউটর · যোগাযোগ করুন', {x: 520, y: 640, w: 480, size: 48, bg: '#f2ede0', color: '#15151b'})}),
  s03: Pair(soft(House, 4), {look: MOM, e: 'skeptical', g: 'pointR', talk: true}, {look: RAYHAN, e: 'worried'}),
  s04: R({place: soft(Lib, 4), actors: [{look: RAYHAN, x: 820, h: 960, y: 1880, expression: 'smile', gesture: 'pointL', lookX: -1}], over: sticker('নোটিশ', {x: 120, y: 620, w: 520, bg: '#7a1f3a', size: 80})}),
  s05: R({place: <SchoolRoom lines={['শুক্রবার সকালে ফ্রি ক্লাস', 'এসএসসির কঠিন ২০টা অংক', 'আসন মাত্র ৪০টা']} />}),
  s06: Count(200, {post: ' জন', label: 'আসে', size: 230, color: GREEN, place: soft(Lib, 10)}),
  s07: R({place: <SchoolRoom board="অংক ১০/২০ ✓" />, over: () => <ClassRoom lookX={0} expr="surprised" />}),
  s08: R({place: <SchoolRoom board="" />, over: () => <ClassRoom lookX={0} expr="worried" />, title: 'বোর্ড মুছে ফেলে', color: RED}),
  s09: Solo(soft(<SchoolRoom board="বাকি ১০টা: ব্যাচে" />, 3), {look: RAYHAN, e: 'smile', g: 'pointUp', talk: true}),
  s10: R({place: soft(House, 3), actors: crowd([150, 400, 680, 930], {h: 860, y: 1900, e: 'worried', from: 4}), title: 'সন্ধ্যায় দরজায় লাইন', color: GREEN}),
  s11: Pair(soft(House, 4), {look: MIDDLE, e: 'worried', g: 'open', talk: true}, {look: RAYHAN, e: 'smile'}),
  s12: Count(5000, {pre: '৳', label: 'ফি এখন', size: 230, color: GREEN, place: soft(House, 10)}),
  s13: Glass('যে খোঁজে, তার সাথে দরদাম। যাকে খোঁজে, তাকে অনুরোধ।', {place: House, size: 80}),
  book: lawBook(8),
  lesson: R({bg: 'plain'}),
  act: Glass('কাজ চাওয়ার আগে একটা টোপ বানাও', {place: Lib, color: '#bff2c8'}),
  next: Next(9, <Envelope size={480} />, {title: 'ছয় মাস তর্কে হার', place: soft(House, 14)}),
  next2: Next(9, <Envelope size={480} open />, {title: 'একটা খামে জয়', place: soft(House, 14)}),
  next3: Next(9, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'খামে কী ছিল?', place: soft(House, 14)}),
  cta: () => (
    <Cta>
      <NextBadge law={9} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="যাকে কেউ টিউশন দিত না" l2="তার দরজায় লাইন!" bottom="ফি পাঁচগুণ" term="48 Laws · Law 8" art={<div style={{position: 'absolute', left: 40, top: 1160}}>{sticker('ফ্রি ক্লাস', {x: 0, y: 0, w: 540, bg: '#14532d', size: 90})()}</div>} size={84} />
);
export const law08 = story('law08/', raw, SCENES, Thumb, {logo: 'bba2'});
