import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Cake} from '../common/places';
import {Bakery} from '../common/places2';
import {Count, Pair, R, Solo, Two, WOMAN, story} from '../common/reel';
import {Kitchen} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MIMI: ToonLook = {...WOMAN, hairStyle: 'long', top: '#d94a6a', skirt: '#d94a6a', bottom: '#d94a6a'};
const TANIA: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#2a7a6a', skirt: '#2a7a6a', bottom: '#2a7a6a'};
const BUYER: ToonLook = {...WOMAN, hairStyle: 'bob', top: '#6a4a9a', skirt: '#6a4a9a', bottom: '#6a4a9a'};
const Shop = <Bakery />;

// কেকের গ্রিড: অনেকগুলো ছোট, বা অল্প কয়েকটা বড়
const CakeGrid: React.FC<{n: number; size: number}> = ({n, size}) => (
  <div style={{position: 'absolute', left: 60, right: 60, top: 420, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center'}}>
    {Array.from({length: n}, (_, i) => (
      <div key={i} style={{filter: `hue-rotate(${(i * 47) % 360}deg)`}}>
        <Cake size={size} />
      </div>
    ))}
  </div>
);
const grid = (n: number, size: number) => () => <CakeGrid n={n} size={size} />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Two(R({place: soft(Shop, 8), over: grid(24, 130), title: 'মিমি: চল্লিশটা ডিজাইন', color: GOLD}), R({place: soft(Shop, 8, 'gold'), over: grid(6, 240), title: 'তানিয়া: মাত্র ছয়টা', color: GREEN}), 0.5),
  h2: R({place: soft(Shop, 3, 'gold'), actors: [at(TANIA, 'laugh', 'thumbsUp')], over: sticker('অর্ডার দশগুণ', {x: 240, y: 420, w: 600, bg: '#14532d', size: 84})}),
  s01: Solo(soft(<Kitchen />, 3), {look: MIMI, e: 'smile', g: 'hold', hold: HandPhone}, {title: 'যত ডিজাইন, তত ভালো?', color: GOLD}),
  s02: R({place: soft(Shop, 9), over: grid(24, 130)}),
  s03: Pair(soft(<Kitchen />, 4), {look: MIMI, e: 'smile', g: 'hold', hold: HandPhone}, {look: BUYER, e: 'thinking', g: 'think', talk: true}),
  s04: Solo(soft(<Kitchen dim />, 4, 'night'), {look: MIMI, e: 'sad', g: 'hold', hold: HandPhone}, {title: 'আর জানায় না', color: RED}),
  s05: R({place: soft(Shop, 8, 'gold'), over: grid(6, 240), title: 'মাত্র ছয়টা', color: GREEN}),
  s06: R({place: soft(Shop, 8, 'gold'), over: () => (
    <>
      {sticker('জন্মদিনের জন্য এটা', {x: 150, y: 470, w: 780, bg: '#14305f', size: 64})()}
      {sticker('বিয়ের জন্য এটা', {x: 150, y: 680, w: 780, bg: '#7a1f3a', size: 64, at: 10})()}
      {sticker('বাচ্চার জন্য এটা', {x: 150, y: 890, w: 780, bg: '#14532d', size: 64, at: 20})()}
    </>
  )}),
  s07: Two(Count(9, {post: 'টা অর্ডার', label: 'মিমি: তিনশো মেসেজে', size: 200, color: RED, place: soft(Shop, 10)}), Count(90, {post: 'টা অর্ডার', label: 'তানিয়া: একশো মেসেজে', size: 200, color: GREEN, place: soft(Shop, 10, 'gold')}), 0.45),
  s08: Glass('ক্লান্ত মানুষ সিদ্ধান্ত নেয় না', {place: Shop, tone: 'cool', sub: 'পিছিয়ে দেয়'}),
  act: Glass('সেরা কয়েকটা বেছে দাও', {place: Shop, color: '#bff2c8', sub: 'বলে দাও কোনটা কার জন্য'}),
  ...outro('Sheena Iyengar ও Mark Lepper', 'সুপারমার্কেটের জ্যাম', '২০০০'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="চল্লিশটা কেক বনাম ছয়টা" l2="কম ডিজাইনে দশগুণ অর্ডার!" bottom="বেশি পছন্দের ফাঁদ" term="পছন্দের পরীক্ষা" art={<div style={{position: 'absolute', left: 120, top: 1140}}><Cake size={380} /></div>} size={84} />
);
export const b04 = story('b04/', raw, SCENES, Thumb, {logo: 'bba2'});
