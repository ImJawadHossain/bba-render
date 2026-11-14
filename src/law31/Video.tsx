import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {Count, MIDDLE, Pair, R, Solo, Y3, story} from '../common/reel';
import {Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {Roller, Room, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const HASAN: ToonLook = {...MIDDLE, kurta: false, top: '#f2efe6', bottom: '#2a2c30', glasses: true};
const BABUL: ToonLook = {...Y3, top: '#e8e2d2', bottom: '#5a5f6e'};
const CREAM = 'linear-gradient(180deg, #f2e6c0, #e0cfa0)';
const Stain = <Room stain />;
const Fresh = <Room paint={CREAM} />;

// রঙের নমুনা; pick দিলে বাছাই করা
const Swatch: React.FC<{color: string; label: string; pick?: boolean}> = ({color, label, pick}) => (
  <div style={{width: 380, textAlign: 'center', fontWeight: 800}}>
    <div style={{height: 300, borderRadius: 26, background: color, border: `10px solid ${pick ? GOLD : '#1b1b1f'}`, boxShadow: pick ? `0 0 60px ${GOLD}` : '0 20px 50px rgba(0,0,0,0.5)'}} />
    <div style={{marginTop: 16, fontSize: 56, color: pick ? GOLD : '#f2efe9', textShadow: '0 4px 20px rgba(0,0,0,0.8)'}}>{pick ? `✓ ${label}` : label}</div>
  </div>
);
const choose = (a: [string, string], b: [string, string]) => () => (
  <>
    {popIn(<Swatch color={a[0]} label={a[1]} />, 110, 520)()}
    {popIn(<Swatch color={b[0]} label={b[1]} pick />, 590, 520, 8)()}
  </>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Stain, 2), actors: [{look: HASAN, x: 770, h: 1120, y: 1870, expression: 'worried', gesture: 'pointL', lookX: -1}], title: 'শুধু একটা দাগ', color: GOLD}),
  h2: R({place: soft(Fresh, 3, 'gold'), actors: [{look: BABUL, x: 290, h: 1060, y: 1860, expression: 'smile', gesture: 'idle', lookX: 1}, {look: HASAN, x: 790, h: 1080, y: 1860, expression: 'laugh', gesture: 'thumbsUp', lookX: -1}], over: sticker('বিল: আশি হাজার', {x: 190, y: 420, w: 700, bg: '#14532d', size: 76})}),
  s01: Pair(soft(Stain, 2), {look: HASAN, e: 'worried'}, {look: BABUL, e: 'neutral'}, {title: 'পানির দাগ', color: GOLD}),
  s02: Pair(soft(Stain, 3), {look: HASAN, e: 'serious', g: 'explain', talk: true}, {look: BABUL, e: 'neutral'}),
  s03: Solo(soft(Stain, 3), {look: BABUL, e: 'smile'}, {title: 'তর্ক নেই', color: GOLD}),
  s04: Pair(soft(Stain, 3), {look: HASAN, e: 'thinking'}, {look: BABUL, e: 'smile', g: 'open', talk: true}),
  s05: R({place: soft(Stain, 8), over: choose(['#bfe0b0', 'হালকা সবুজ'], ['#f2e6c0', 'ক্রিম'])}),
  s06: Pair(soft(Fresh, 3), {look: HASAN, e: 'neutral'}, {look: BABUL, e: 'smile', g: 'explain', talk: true}),
  s07: R({place: soft(Fresh, 8), over: choose(['#d8c088', 'গাঢ় ক্রিম'], ['#f2e6c0', 'একই ক্রিম'])}),
  s08: R({place: soft(Fresh, 8, 'gold'), over: () => (
    <>
      {sticker('বারান্দা: এই সপ্তাহে, না পরের?', {x: 70, y: 480, w: 940, bg: '#14305f', size: 62})()}
      {sticker('শোবার ঘর আগে, না রান্নাঘর?', {x: 70, y: 760, w: 940, bg: '#14305f', size: 62, at: 14})()}
    </>
  )}),
  s09: Glass('পুরো বাসা রং করবেন কি না?', {place: Fresh, tone: 'night', sub: 'এই প্রশ্নটা একবারও আসে না', color: RED}),
  s10: Count(80000, {pre: '৳', label: 'তিন সপ্তাহে পুরো বাসা', size: 200, color: RED, place: soft(Fresh, 10, 'gold')}),
  s11: Pair(soft(Fresh, 3, 'gold'), {look: HASAN, e: 'laugh', g: 'thumbsUp'}, {look: BABUL, e: 'smile'}, {title: 'সব আমার পছন্দমতো!', color: GREEN}),
  s12: Glass('সিদ্ধান্ত নিয়েছেন মালিক', {place: Fresh, tone: 'gold', sub: 'প্রশ্ন ঠিক করেছে মিস্ত্রি'}),
  act: Glass('"কি না" নয়, "কোনটা"', {place: Fresh, color: '#bff2c8', sub: 'দুই পথ দাও, দুটোতেই তোমার লাভ'}),
  ...ending(31, soft(<Home />, 14), [tag('একই ছেলে, একই বেতন', {bg: '#14305f'}), 'বিশ বাড়িতে না'], [tag('প্রথম বাড়িতেই পাকা', {bg: '#14532d'}), 'ঘটকালি তিনগুণ'], 'স্বপ্ন বেচার কৌশল'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দাগ সারাতে ডাকা মিস্ত্রি" l2="নিয়ে গেল আশি হাজারের কাজ!" bottom="মালিক তবু খুশি" term="48 Laws · Law 31" art={<div style={{position: 'absolute', left: 120, top: 1140}}><Roller size={360} /></div>} size={80} />
);
export const law31 = story('law31/', raw, SCENES, Thumb, {logo: 'bba2'});
