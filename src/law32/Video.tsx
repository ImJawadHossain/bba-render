import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, Paper, PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {Count, ELDER, MIDDLE, MOM, Pair, R, Solo, story} from '../common/reel';
import {HandPaper} from '../common/laws48';
import {Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {SchoolGate, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const MOTALEB: ToonLook = {...ELDER, top: '#e8e2d2'};
const JABBAR: ToonLook = {...MIDDLE, top: '#c8a050', bottom: '#e6e2d6'};
const GIRL_DAD: ToonLook = {...MIDDLE, top: '#d6e2ea'};
const GIRL_MOM: ToonLook = {...MOM, top: '#2a6a5a', skirt: '#2a4a3a'};
const House = <Home />;
const Photo = <Home photo />;
const one = (look: ToonLook, expression: 'sad' | 'laugh' | 'smile', gesture: 'shrug' | 'thumbsUp' | 'pointR', x = 540) => [{look, x, h: 1100, y: 1880, expression, gesture, lookX: x < 540 ? 1 : 0}];

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(House, 4, 'cool'), actors: one(MOTALEB, 'sad', 'shrug'), over: sticker('বিশ বাড়িতে না', {x: 190, y: 420, w: 700, bg: '#7a1f3a', size: 76})}),
  h2: R({place: soft(House, 3, 'gold'), actors: one(JABBAR, 'laugh', 'thumbsUp'), over: sticker('প্রথম বাড়িতেই পাকা', {x: 150, y: 420, w: 780, bg: '#14532d', size: 72})}),
  s01: R({place: soft(Photo, 8), over: popIn(<Paper title="পাত্র: ফয়সাল" lines={['ব্যাংকে ছোট চাকরি', 'বেতন: পঁচিশ হাজার', 'বাসা: ভাড়ার']} size={48} w={680} />, 200, 480)}),
  s02: Solo(soft(House, 3), {look: MOTALEB, e: 'smile', g: 'hold', hold: HandPaper}, {title: 'সৎ ঘটক মোতালেব', color: GOLD}),
  s03: Pair(soft(House, 3), {look: MOTALEB, e: 'neutral', g: 'explain', talk: true}, {look: GIRL_DAD, e: 'skeptical'}),
  s04: Count(20, {post: ' বাড়ি', label: 'পরে জানাব', sub: 'বিশবার একই উত্তর', size: 220, color: RED, place: soft(House, 10, 'cool')}),
  s05: Pair(soft(House, 3), {look: MOM, e: 'worried', g: 'hold', hold: HandPhone}, {look: JABBAR, e: 'smile'}, {title: 'ডাক পড়ে জব্বার ঘটকের', color: GOLD}),
  s06: R({place: soft(Photo, 2, 'gold'), actors: one(JABBAR, 'laugh', 'pointR', 290), title: 'কাগজ না, ছবি', color: GOLD}),
  s07: Pair(soft(Photo, 4, 'gold'), {look: GIRL_MOM, e: 'surprised'}, {look: JABBAR, e: 'laugh', g: 'open', talk: true}),
  s08: Pair(soft(House, 3, 'gold'), {look: GIRL_MOM, e: 'smile'}, {look: JABBAR, e: 'laugh', g: 'thumbsUp'}, {title: 'পাকা, ঘটকালি তিনগুণ', color: GREEN}),
  s09: R({place: soft(Photo, 8, 'gold'), over: popIn(<Paper title="পাত্র: ফয়সাল" lines={['বেতন: একই', 'বাসা: একই ভাড়ার', 'বদলেছে: গল্পটা']} size={50} w={680} />, 200, 480)}),
  s10: Glass('আজকের সত্যি কেউ কেনে না', {place: House, tone: 'gold', sub: 'কালকের স্বপ্ন সবাই কেনে'}),
  act: Glass('ক্রেতা মনে মনে কী হতে চায়?', {place: House, color: '#bff2c8', sub: 'সেটাই দেখাও'}),
  ...ending(32, soft(<SchoolGate />, 14), [tag('তিনগুণ দামেও না', {bg: '#7a1f3a'}), 'মোশাররফ চাচার জমি'], [tag('বিনা পয়সায় পাওয়া', {bg: '#14532d'}), 'এক বিকেলে, রুমানা আপা'], 'দুর্বল জায়গা খোঁজা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই ছেলে, একই বেতন" l2="এক ঘটকে না, আরেক ঘটকে হ্যাঁ!" bottom="বদলেছে শুধু গল্পটা" term="48 Laws · Law 32" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('ঘটকালি তিনগুণ', {x: 0, y: 0, w: 580, bg: '#14532d', size: 80})()}</div>} size={80} />
);
export const law32 = story('law32/', raw, SCENES, Thumb, {logo: 'bba2'});
