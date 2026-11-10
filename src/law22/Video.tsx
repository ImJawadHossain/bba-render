import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Count, MIDDLE, Pair, R, Solo, WOMAN, story} from '../common/reel';
import {HandBox} from '../common/laws48';
import {Glass, soft, sticker, tag} from '../common/elegant';
import {Parlour, RepairShop, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MITU: ToonLook = {...WOMAN, hairStyle: 'long', top: '#d94a6a', skirt: '#d94a6a', bottom: '#d94a6a'};
const SHIRIN: ToonLook = {...WOMAN, hairStyle: 'bun', hair: '#3a2a20', top: '#6a2a5a', skirt: '#6a2a5a', bottom: '#6a2a5a', glasses: true, age: 0.5};
const BRIDE: ToonLook = {...WOMAN, top: '#c0202a', skirt: '#c0202a', bottom: '#c0202a'};
const BRIDE2: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#d9a21b', skirt: '#d9a21b', bottom: '#d9a21b'};
const COMMITTEE: ToonLook = {...MIDDLE, top: '#e8e2d2'};
const Room = <Parlour />;
const Hers = <Parlour name="শিরিন বিউটি পার্লার" />;
const Mine = <Parlour name="মিতু পার্লার" signBg="#d94a6a" />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(soft(Room, 3), {look: MITU, e: 'sad', g: 'open'}, {look: SHIRIN, e: 'skeptical'}, {title: 'প্রতিদ্বন্দ্বীর কাছে হার', color: RED}),
  h2: R({place: soft(Room, 4, 'gold'), actors: [{look: BRIDE, x: 540, h: 1150, y: 1880, expression: 'smile', gesture: 'idle'}], over: sticker('বিয়ের সাজের অর্ধেক কাজ', {x: 90, y: 420, w: 900, bg: '#14532d', size: 68}), title: 'দুই বছর পর', color: GREEN}),
  s01: Solo(soft(Mine, 2), {look: MITU, e: 'smile', g: 'open'}),
  s02: Solo(soft(Room, 4), {look: MITU, e: 'laugh', g: 'pointUp'}, {over: sticker('বিয়ের সাজ অর্ধেক দামে', {x: 110, y: 400, w: 860, bg: '#c0304a', size: 68})}),
  s03: Pair(soft(Mine, 4, 'cool'), {look: COMMITTEE, e: 'serious', g: 'pointR'}, {look: MITU, e: 'worried'}),
  s04: R({place: soft(Hers, 3), actors: [{look: SHIRIN, x: 540, h: 1200, y: 1870, expression: 'skeptical', gesture: 'idle'}]}),
  s05: R({place: soft(Hers, 2, 'gold'), actors: [{look: MITU, x: 540, h: 1180, y: 1870, expression: 'smile', gesture: 'hold', holding: HandBox}]}),
  s06: Pair(soft(Room, 4), {look: MITU, e: 'sad', g: 'open', talk: true}, {look: SHIRIN, e: 'surprised'}),
  s07: Pair(soft(Room, 4, 'gold'), {look: MITU, e: 'smile'}, {look: SHIRIN, e: 'laugh', g: 'thumbsUp'}, {title: 'কমিটি আর আসে না', color: GREEN}),
  s08: Pair(soft(Room, 3, 'gold'), {look: BRIDE, e: 'smile'}, {look: BRIDE2, e: 'laugh'}, {title: 'বাড়তি কনে মিতুর কাছে', color: GOLD}),
  s09: Pair(soft(Room, 3), {look: SHIRIN, e: 'smile', g: 'explain', talk: true}, {look: MITU, e: 'thinking'}, {title: 'দুই বছর ধরে শেখা', color: GOLD}),
  s10: Count(50, {post: '%', label: 'এলাকার বিয়ের সাজ', size: 220, color: GREEN, place: soft(Room, 10, 'gold')}),
  s11: Glass('লড়লে টিকত না এক মাসও', {place: Room, tone: 'gold', sub: 'হার মেনে এখন সমানে সমান'}),
  act: Glass('এখন জিততে না পারলে লড়াই থামাও', {place: Room, color: '#bff2c8', size: 80, sub: 'শক্তিমানের পাশে থেকে বড় হও'}),
  ...ending(22, soft(<RepairShop />, 14), [tag('সব কিছু মেরামত', {bg: '#7a4a14'}), 'রফিক: মাসে বিশ হাজার'], [tag('শুধু একটা কাজ', {bg: '#14532d'}), 'সুমন: মাসে দুই লাখ'], 'একটা কাজের শক্তি'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="প্রতিদ্বন্দ্বীর কাছে হাতজোড়" l2="দুই বছরে অর্ধেক কাজ তার!" bottom="পাঠায় সেই প্রতিদ্বন্দ্বীই" term="48 Laws · Law 22" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('হার মানলাম, আপা', {x: 0, y: 0, w: 600, bg: '#7a1f3a', size: 76})()}</div>} size={80} />
);
export const law22 = story('law22/', raw, SCENES, Thumb, {logo: 'bba2'});
