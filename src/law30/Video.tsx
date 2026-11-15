import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ShopFront} from '../common/places2';
import {Count, MIDDLE, Pair, R, Solo, Two, Y1, Y2, Y3, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {Dummy, Parlour, Room, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const SELIM: ToonLook = {...MIDDLE, kurta: false, top: '#e8e2d2', bottom: '#3a3a44'};
const RONY: ToonLook = {...Y2, top: '#1a1c22'};
const Salon = <Parlour salon />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(soft(Salon, 3), {look: SELIM, e: 'worried', g: 'explain', talk: true}, {look: Y1, e: 'neutral'}, {title: 'চল্লিশ মিনিট, ঘাম', color: GOLD}),
  h2: R({place: soft(Salon, 3, 'gold'), actors: [{look: RONY, x: 540, h: 1180, y: 1870, expression: 'smile', gesture: 'thumbsUp'}], over: sticker('দাম দ্বিগুণ, লাইন বাইরে', {x: 110, y: 420, w: 860, bg: '#14532d', size: 68})}),
  s01: Two(Solo(soft(<Parlour salon name="সেলিম সেলুন" signBg="#7a4a14" />, 2), {look: SELIM, e: 'smile'}), Solo(soft(<Parlour salon name="রনি হেয়ার কাট" />, 2), {look: RONY, e: 'smile'}), 0.5),
  s02: Pair(soft(Salon, 4), {look: SELIM, e: 'worried', g: 'explain', talk: true}, {look: Y1, e: 'neutral'}),
  s03: Count(40, {post: ' মিনিট', label: 'সেলিম: দাম দেড়শো', size: 220, color: RED, place: soft(Salon, 10)}),
  s04: Pair(soft(Salon, 3, 'gold'), {look: Y3, e: 'smile'}, {look: RONY, e: 'smile', g: 'explain'}, {title: 'রনি: পনেরো মিনিট', color: GREEN}),
  s05: R({place: soft(<ShopFront name="রনি হেয়ার কাট" signBg="#14305f" />, 2, 'gold'), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900}), over: sticker('দাম তিনশো', {x: 290, y: 560, w: 500, bg: '#14532d', size: 76})}),
  s06: R({place: soft(Salon, 6, 'gold'), actors: crowd([200, 880], {h: 960, y: 1890, e: 'surprised', from: 2}), title: 'রনির হাতে জাদু?', color: GOLD}),
  s07: R({place: soft(<ShopFront name="রনি হেয়ার কাট" signBg="#14305f" night open={false} />, 2, 'night'), over: sticker('শাটারের ভেতরে আলো', {x: 110, y: 560, w: 860, bg: '#7a4a14', size: 68})}),
  s08: R({place: soft(Salon, 5, 'night'), actors: [{look: RONY, x: 770, h: 1120, y: 1870, expression: 'serious', gesture: 'explain', lookX: -1}], over: popIn(<Dummy size={360} />, 120, 860), title: 'পাঁচ বছর, প্রতি রাতে', color: RED}),
  s09: Solo(soft(Salon, 4), {look: RONY, e: 'smile', g: 'shrug'}, {title: 'কাউকে বলে না', color: GOLD}),
  s10: Pair(soft(Salon, 4), {look: Y3, e: 'surprised'}, {look: RONY, e: 'wink', g: 'shrug', talk: true}),
  s11: Glass('কষ্ট দেখালে সাধারণ', {place: Salon, tone: 'gold', sub: 'কষ্ট লুকালে জাদুকর'}),
  act: Glass('খাটো আড়ালে', {place: Salon, color: '#bff2c8', sub: 'সামনে দেখাও যেন কিছুই না'}),
  ...ending(30, soft(<Room stain />, 14), [tag('দেয়ালের একটা দাগ', {bg: '#7a4a14'}), 'বাজেট পাঁচ হাজার'], [tag('কাজ আশি হাজারের', {bg: '#14532d'}), 'তবু মালিক ধন্যবাদ দেন'], 'প্রশ্ন দিয়ে মানুষ চালানো'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই কাট, দাম দ্বিগুণ" l2="রাত একটার গোপন অনুশীলন!" bottom="কষ্ট লুকালে জাদুকর" term="48 Laws · Law 30" art={<div style={{position: 'absolute', left: 80, top: 1140}}><Dummy size={380} /></div>} size={84} />
);
export const law30 = story('law30/', raw, SCENES, Thumb, {logo: 'bba2'});
