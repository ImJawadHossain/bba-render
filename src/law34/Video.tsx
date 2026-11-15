import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Avenue} from '../common/places';
import {MIDDLE, Pair, R, Two, WOMAN, Y1, Y3, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {CornerShop, MangoBox, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const JASIM: ToonLook = {...Y1, top: '#d9a21b'};
const KADER: ToonLook = {...MIDDLE, top: '#f2efe6'};
const Road = <Avenue />;
const at = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle', talking = false) => [{look, x: 540, h: 1100, y: 1880, expression, gesture, talking}];
const heap = popIn(<MangoBox size={580} />, 250, 1250);
const neat = popIn(<MangoBox neat size={620} />, 230, 1270);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Road, 3), actors: at(JASIM, 'worried', 'wave', true), over: heap, title: 'দিনে বিশ কেজিও না', color: RED}),
  h2: R({place: soft(Road, 3, 'gold'), actors: at(KADER, 'smile'), over: neat, title: 'দ্বিগুণ দাম, আগেই শেষ', color: GREEN}),
  s01: Pair(soft(Road, 2), {look: JASIM, e: 'smile'}, {look: KADER, e: 'smile'}, {title: 'একই বাগান, দুই ভাই', color: GOLD}),
  s02: R({place: soft(Road, 3), actors: at(JASIM, 'smile', 'open'), over: heap, title: 'ঝুড়িতে আমের স্তূপ', color: GOLD}),
  s03: R({place: soft(Road, 4), actors: at(JASIM, 'laugh', 'wave', true), over: heap}),
  s04: Pair(soft(Road, 4, 'cool'), {look: WOMAN, e: 'skeptical', g: 'shrug'}, {look: JASIM, e: 'worried', g: 'open'}, {over: sticker('৳১০০ → ৳৬০', {x: 240, y: 420, w: 600, bg: '#7a1f3a', size: 84})}),
  s05: R({place: soft(Road, 2, 'gold'), actors: at(KADER, 'neutral'), over: neat, title: 'সাদা কাপড়ে সাজানো', color: GOLD}),
  s06: R({place: soft(Road, 8, 'gold'), over: sticker('দাম একটাই: কেজি ২০০', {x: 110, y: 640, w: 860, bg: '#14305f', size: 76})}),
  s07: R({place: soft(Road, 3, 'gold'), actors: at(KADER, 'smile', 'think'), over: neat, title: 'কাদের ডাকেন না', color: GOLD}),
  s08: Pair(soft(Road, 4, 'gold'), {look: Y3, e: 'skeptical'}, {look: KADER, e: 'smile', g: 'open', talk: true}),
  s09: R({place: soft(Road, 3, 'gold'), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900, e: 'smile'}), title: 'পেছনে আরও তিনজন', color: GREEN}),
  s10: Two(R({place: soft(Road, 3, 'dusk'), actors: at(KADER, 'laugh', 'wave'), title: 'বিকেল চারটায় বাড়ি', color: GREEN}), R({place: soft(Road, 3, 'dusk'), actors: at(JASIM, 'sad'), over: heap, title: 'অর্ধেক আম, রোদে নরম', color: RED}), 0.45),
  s11: Glass('সস্তা দেখালে সবাই দাম কমায়', {place: Road, tone: 'gold', sub: 'দামি দেখালে কেউ সাহসও পায় না'}),
  act: Glass('দাম বলে পিছিয়ো না', {place: Road, color: '#bff2c8', sub: 'ডেকে ডেকে নিজেকে সস্তা কোরো না'}),
  ...ending(34, soft(<CornerShop />, 14), [tag('তিনবার হাতবদল', {bg: '#7a1f3a'}), 'তিনজনই লোকসানে'], [tag('প্রথম মাসেই লাভ', {bg: '#14532d'}), 'চতুর্থজন রাশেদ'], 'সময় চেনার কৌশল'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই বাগানের একই আম" l2="দ্বিগুণ দামে আগে শেষ!" bottom="ডাকেনই না, তবু লাইন" term="48 Laws · Law 34" art={<div style={{position: 'absolute', left: 40, top: 1200}}><MangoBox neat size={560} /></div>} size={84} />
);
export const law34 = story('law34/', raw, SCENES, Thumb, {logo: 'bba2'});
