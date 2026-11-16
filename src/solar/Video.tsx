import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Home, TakaRain} from '../common/places';
import {SolarPanel, Village} from '../common/places2';
import {BookScene, Bounce, Card, Count, Cta, ELDER, Hit, MIDDLE, Pair, R, Solo, Y1, story} from '../common/reel';
import raw from './segments.json';

const AKASH: ToonLook = {...Y1, top: '#2a7a6a'};
const KARIM: ToonLook = {...MIDDLE, hair: '#8a8580'};
const V = <Village />;
const Yard = <Home />;
const bill = () => <Bounce x={350} y={1530} at={3}><Paper w={380} title="বিদ্যুৎ বিল" dots={2} size={40} rot={-4} /></Bounce>;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Hit('একই সোলার, একই দাম', {size: 124, top: 300, color: GOLD, place: V, back: () => <div style={{position: 'absolute', left: 280, top: 780}}><SolarPanel size={520} /></div>}),
  h2: Count(0, {post: ' টা বিক্রি', size: 170, label: '"টাকা বাঁচবে" বলে এক মাসে', color: RED, place: V}),
  h3: Count(7, {post: ' টা!', size: 240, label: 'একটা বাক্য বদলে, এক সপ্তাহে', color: GREEN, place: V}),
  sells: Solo(V, {look: AKASH, e: 'smile'}, {over: () => <Bounce x={620} y={1100} at={3}><SolarPanel size={380} /></Bounce>}),
  same: Solo(V, {look: AKASH, e: 'smile', g: 'explain'}, {title: 'প্রতিটা বাড়িতে একই কথা', size: 76, color: GOLD}),
  save: Pair(V, {look: AKASH, e: 'smile', g: 'open', talk: true}, {look: ELDER, e: 'neutral'}),
  later: Pair(V, {look: AKASH, e: 'worried'}, {look: ELDER, e: 'smile', talk: true}),
  month: Hit('এক মাস: একটাও না', {size: 124, top: 620, color: RED, place: V}),
  nod: Pair(V, {look: AKASH, e: 'sad'}, {look: KARIM, e: 'neutral'}, {title: 'কেউ টাকা বের করে না', size: 76, color: RED}),
  last: Pair(Yard, {look: AKASH, e: 'thinking', g: 'pointR'}, {look: KARIM, e: 'neutral'}, {over: bill}),
  lose: Pair(Yard, {look: AKASH, e: 'serious', g: 'explain', talk: true}, {look: KARIM, e: 'surprised'}, {over: bill}),
  silent: Solo(Yard, {look: KARIM, e: 'worried'}, {near: true, over: () => <Bounce x={110} y={1120} at={3}><Paper w={380} title="বিদ্যুৎ বিল" dots={2} size={40} rot={-4} /></Bounce>}),
  when: Pair(Yard, {look: AKASH, e: 'surprised'}, {look: KARIM, e: 'serious', g: 'open', talk: true}),
  sameall: R({place: V, back: () => <div style={{position: 'absolute', left: 280, top: 760}}><SolarPanel size={520} /></div>, title: 'একই সোলার, একই টাকা', size: 78, color: GOLD}),
  word: Hit('"বাঁচবে" → "হারাচ্ছেন"', {size: 112, top: 620, color: RED, place: V}),
  seven: Count(7, {post: ' টা সোলার', size: 180, color: GREEN, place: V, back: () => <TakaRain n={8} speed={7} />}),
  book: BookScene('Thinking, Fast and Slow', 'Daniel Kahneman', 'Loss Aversion', '#14305f'),
  t1: Card('বলো, না করলে কী হারাচ্ছে', {size: 96, color: GREEN, place: Yard}),
  t2: Card('"হারাচ্ছেন" শুনলে হিসাব মেলাও', {size: 88, color: RED, place: Yard}),
  cta: () => (
    <Cta>
      <SolarPanel size={460} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="এক মাসে একটাও না" l2="এক সপ্তাহে সাতটা!" bottom="শুধু একটা বাক্য বদলে" term="Loss Aversion" glow="rgba(95,208,138,0.3)" art={<div style={{position: 'absolute', left: 10, top: 1050}}><SolarPanel size={540} /></div>} />
);
export const solar = story('solar/', raw, SCENES, Thumb);
