import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Village} from '../common/places2';
import {Bounce, Card, Count, Cta, ELDER, Hit, Pair, R, SIR, Solo, lawBook, story} from '../common/reel';
import raw from './segments.json';

const KASEM: ToonLook = {...ELDER, glasses: false, top: '#d9cfb8', kurta: false, bottom: '#6a5a3a'};
const KASEM_G: ToonLook = {...KASEM, glasses: true};
const SHARIF: ToonLook = {...SIR, jacket: '#2a3a5a', tie: '#b3201f', glasses: false, mustache: true};
const V = <Village />;
const deed = (x = 330, y = 1090, at = 3) => () => <Bounce x={x} y={y} at={at}><Paper w={420} title="দলিল" dots={3} size={52} rot={-3} /></Bounce>;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Solo(V, {look: KASEM, e: 'neutral', talk: true}, {near: true}),
  h2: Count(2000000, {from: 1000000, pre: '৳ ', size: 150, label: 'জমির দাম হলো দ্বিগুণ', color: GREEN, place: V}),
  land: R({place: V, title: 'নদীর ধারে দুই বিঘা', color: GOLD}),
  car: Solo(V, {look: SHARIF, e: 'smile'}, {title: 'ঢাকার দালাল শরিফ', color: RED}),
  ten: Pair(V, {look: SHARIF, e: 'smile', g: 'open', talk: true}, {look: KASEM, e: 'neutral'}),
  scratch: Solo(V, {look: KASEM, e: 'thinking', g: 'think'}, {near: true}),
  fool: Pair(V, {look: SHARIF, e: 'smile'}, {look: KASEM, e: 'neutral', g: 'open', talk: true}),
  laugh: Solo(V, {look: SHARIF, e: 'laugh'}, {near: true, title: 'ভয়ের কিছু নেই', color: GOLD}),
  factory: Pair(V, {look: SHARIF, e: 'laugh', g: 'explain', talk: true}, {look: KASEM, e: 'blank'}),
  blank: Solo(V, {look: KASEM, e: 'blank'}, {near: true}),
  week: Pair(<Village evening />, {look: SHARIF, e: 'smile'}, {look: KASEM, e: 'neutral'}, {title: 'পরের সপ্তাহে', color: GOLD}),
  other: Pair(<Village evening />, {look: SHARIF, e: 'surprised'}, {look: KASEM, e: 'worried', g: 'open', talk: true}),
  fear: Solo(<Village evening />, {look: SHARIF, e: 'shocked'}, {near: true}),
  twenty: Pair(<Village evening />, {look: SHARIF, e: 'worried', g: 'open', talk: true}, {look: KASEM, e: 'blank'}, {over: () => <Bounce x={320} y={1620} at={8}><div style={{padding: '12px 36px', background: GREEN, color: '#10301d', fontSize: 92, fontWeight: 800, borderRadius: 18, border: '6px solid #1b1b1f'}}>২০ লাখ!</div></Bounce>}),
  glasses: Solo(V, {look: KASEM_G, e: 'serious'}, {near: true}),
  read: Solo(V, {look: KASEM_G, e: 'serious'}, {over: deed(80, 1050), title: 'দুইটা ভুল ধরলেন', color: RED}),
  gape: Solo(V, {look: SHARIF, e: 'shocked'}, {near: true}),
  math: Pair(V, {look: SHARIF, e: 'shocked'}, {look: KASEM_G, e: 'wink', g: 'pointUp', talk: true}),
  book: lawBook(21),
  t1: Card('নিজের সব জ্ঞান দেখিও না', {size: 100, color: RED, place: V}),
  t2: Card('প্রশ্ন করো, অন্যজনকে বলতে দাও', {size: 90, color: GOLD, place: V}),
  t3: Hit('অতি সরল? সাবধান!', {size: 124, top: 620, color: RED, place: V}),
  cta: () => (
    <Cta>
      <Paper w={420} title="দলিল" dots={3} size={52} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1={'"আমি তো মূর্খ মানুষ"'} l2="দালালের কাছে দ্বিগুণ দাম!" bottom="সইয়ের দিন চশমা বের করলেন" term="48 Laws · Law 21" glow="rgba(95,208,138,0.3)" art={<div style={{position: 'absolute', left: 40, top: 1020}}><Paper w={460} title="দলিল" dots={3} size={56} /></div>} size={82} />
);
export const dumb = story('dumb/', raw, SCENES, Thumb);
