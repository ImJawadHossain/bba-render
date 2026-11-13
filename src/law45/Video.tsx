import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ELDER, Pair, R, Solo, Two, Y1, Y3, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, SchoolRoom, popIn, soft, sticker, tag} from '../common/elegant';
import {Ballot, Grocery, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const RATUL: ToonLook = {...Y1, top: '#1f4a8a'};
const SHIMUL: ToonLook = {...Y3, top: '#2a7a4a'};
const RAHIM: ToonLook = {...ELDER, top: '#e8e2d2'};
const Old = <Grocery />;
const New = <Grocery modern />;
const mid = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle') => ({look, x: 540, h: 1100, y: 1880, expression, gesture});

// দোকানের সামনের লম্বা কাঠের বেঞ্চ
const Bench: React.FC = () => (
  <svg viewBox="0 0 700 160" width={700} height={160} style={{overflow: 'visible'}}>
    <rect x={0} y={20} width={700} height={36} rx={8} fill="#9a7048" stroke="#1b1b1f" strokeWidth={6} />
    {[40, 620].map((x) => (
      <rect key={x} x={x} y={56} width={40} height={100} fill="#7a5638" stroke="#1b1b1f" strokeWidth={5} />
    ))}
  </svg>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(<Grocery modern name="রাতুল সুপার শপ" />, 2), actors: [mid(RATUL, 'smile', 'thumbsUp')]}),
  h2: R({place: soft(New, 4, 'cool'), actors: [mid(RATUL, 'worried')], over: sticker('খদ্দের অর্ধেক', {x: 240, y: 420, w: 600, bg: '#7a1f3a', size: 80})}),
  s01: Solo(soft(Old, 2), {look: RATUL, e: 'neutral'}, {title: 'বাবার মুদি দোকান', color: GOLD}),
  s02: R({place: soft(Old, 2), over: popIn(<Bench />, 190, 1380), title: 'সব পুরোনো', color: GOLD}),
  s03: Two(R({place: soft(Old, 2), title: 'আগে', color: GOLD}), R({place: soft(New, 2, 'cool'), over: sticker('বাকি বন্ধ', {x: 290, y: 560, w: 500, bg: '#7a1f3a', size: 80}), title: 'এক সপ্তাহ পর', color: RED}), 0.35),
  s04: Solo(soft(New, 3), {look: RAHIM, e: 'surprised'}, {title: 'রহিম চাচা থমকে যান', color: GOLD}),
  s05: Pair(soft(New, 4), {look: RATUL, e: 'neutral'}, {look: RAHIM, e: 'sad', g: 'open', talk: true}),
  s06: R({place: soft(New, 5, 'cool'), actors: [mid(RATUL, 'sad')], title: 'তিন মাসে খদ্দের অর্ধেক', color: RED}),
  s07: Solo(soft(<Grocery name="শিমুল স্টোর" />, 2), {look: SHIMUL, e: 'smile'}),
  s08: Solo(soft(Old, 3), {look: SHIMUL, e: 'thinking', g: 'pointUp'}, {title: 'একটা একটা করে', color: GREEN}),
  s09: R({place: soft(Old, 6, 'gold'), over: () => (
    <>
      {sticker('প্রথম মাস: কম্পিউটারে বিল', {x: 90, y: 440, w: 900, bg: '#14305f', size: 60})()}
      {sticker('তিন মাস পর: নতুন তাক', {x: 90, y: 650, w: 900, bg: '#14305f', size: 60, at: 10})()}
      {sticker('বেঞ্চটা আজও আছে', {x: 90, y: 860, w: 900, bg: '#14532d', size: 60, at: 20})()}
    </>
  )}),
  s10: R({place: soft(<Grocery modern name="শিমুল স্টোর" />, 3, 'gold'), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900, e: 'smile'}), over: sticker('খদ্দের দ্বিগুণ', {x: 240, y: 560, w: 600, bg: '#14532d', size: 80})}),
  s11: Glass('একই বদল', {place: New, tone: 'gold', sub: 'এক সপ্তাহে লোকসান, এক বছরে দ্বিগুণ'}),
  act: Glass('একবারে একটা বদলাও', {place: Old, color: '#bff2c8', sub: 'প্রিয় পুরোনো জিনিসটা রেখে দাও'}),
  ...ending(45, soft(<SchoolRoom />, 14), [tag('প্রথম, প্রথম, প্রথম', {bg: '#14305f'}), 'পরীক্ষা, খেলা, গান'], [<Ballot size={380} />, 'ক্যাপ্টেন ভোটে মাত্র দুই'], 'নিখুঁত হওয়ার বিপদ'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="বাবার দোকান আধুনিক করল ছেলে" l2="তিন মাসে খদ্দের অর্ধেক!" bottom="বদলটা ঠিক, গতিটা ভুল" term="48 Laws · Law 45" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('বেঞ্চটা কই?', {x: 0, y: 0, w: 520, bg: '#7a4a14', size: 88})()}</div>} size={78} />
);
export const law45 = story('law45/', raw, SCENES, Thumb, {logo: 'bba2'});
