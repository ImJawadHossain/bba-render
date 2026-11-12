import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb, a} from '../common/psy';
import {HandCup, TeaCup} from '../common/places';
import {BoardSign, CommentCard, TeaAlley} from '../common/places2';
import {Bounce, Card, Count, Cta, Hit, MIDDLE, Pair, R, Solo, WOMAN, Y1, Y2, Y3, lawBook, story} from '../common/reel';
import raw from './segments.json';

const JAMAL: ToonLook = MIDDLE;
const EMON: ToonLook = {...Y1, top: '#c0504a'};
const Old = <TeaAlley />;
const New = <TeaAlley worst />;
const queue = (e: 'smile' | 'laugh' = 'smile') => [a(Y2, 170, e, 'hold', {h: 880, y: 1760, holding: HandCup}), a(WOMAN, 390, e, 'idle', {h: 880, y: 1760}), a(Y3, 610, e, 'hold', {h: 880, y: 1760, holding: HandCup}), a(EMON, 850, e, 'hold', {h: 880, y: 1760, holding: HandPhone})];

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: Old, over: () => <Bounce x={130} y={660} at={1}><BoardSign text="ঢাকার সবচেয়ে খারাপ চা" w={820} size={100} /></Bounce>}),
  h2: R({place: New, actors: queue(), title: 'দোকানের সামনে লাইন', size: 78, color: GREEN}),
  alley: Solo(Old, {look: JAMAL, e: 'neutral'}),
  seven: R({place: Old, title: 'পাশাপাশি সাতটা', color: GOLD}),
  same: R({place: Old, over: () => <><Bounce x={100} y={880} at={2}><BoardSign text="স্পেশাল চা" w={420} size={66} bg="#6a4a34" /></Bounce><Bounce x={560} y={1050} at={8} seed="g"><BoardSign text="গরম চা" w={420} size={66} bg="#6a4a34" /></Bounce></>}),
  forty: Count(40, {post: ' কাপ', size: 240, label: 'দিনে', color: RED, place: Old}),
  nephew: Pair(Old, {look: EMON, e: 'smile'}, {look: JAMAL, e: 'neutral'}),
  idea: Pair(Old, {look: EMON, e: 'laugh', g: 'explain', talk: true}, {look: JAMAL, e: 'surprised'}),
  mad: Pair(Old, {look: EMON, e: 'smile'}, {look: JAMAL, e: 'shocked', g: 'open', talk: true}),
  next: Solo(New, {look: EMON, e: 'laugh', g: 'pointUp'}),
  day1: R({place: New, actors: [a(Y2, 280, 'laugh', 'pointUp', {h: 1000, y: 1800}), a(Y3, 780, 'laugh', 'hold', {h: 1000, y: 1800, holding: HandPhone})]}),
  post: R({place: New, over: () => <Bounce x={160} y={940} at={2}><CommentCard name="এক ছেলে" text="ভাই, চা-টা কতটা খারাপ দেখে আসি!" size={52} /></Bounce>}),
  day2: R({place: New, actors: queue('smile')}),
  cust: Pair(New, {look: Y2, e: 'laugh', hold: HandCup, talk: true}, {look: JAMAL, e: 'laugh'}),
  month: Count(300, {post: ' কাপ', size: 240, label: 'দিনে', color: GREEN, place: New}),
  sameall: R({place: New, over: () => <Bounce x={340} y={640} at={2}><TeaCup size={400} /></Bounce>, title: 'একই চা, একই জামাল', size: 80, color: GOLD}),
  book: lawBook(6),
  t1: Card('সবাই যা বলে, সেটা বলা বন্ধ করো', {size: 90, color: RED, place: Old}),
  t2: Card('এমন কিছু করো, যা দেখে মানুষ থামে', {size: 88, color: GOLD, place: Old}),
  t3: Hit('হাসি মানেই দেখছে', {size: 130, top: 620, color: GREEN, place: New}),
  cta: () => (
    <Cta>
      <TeaCup size={380} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="নিজের চা-কে বলল খারাপ" l2="৪০ কাপ থেকে ৩০০ কাপ!" bottom="ঢাকার সবচেয়ে খারাপ চা" term="48 Laws · Law 6" glow="rgba(179,32,31,0.4)" art={<div style={{position: 'absolute', left: 60, top: 980}}><TeaCup size={420} /></div>} size={84} />
);
export const worsttea = story('worsttea/', raw, SCENES, Thumb);
