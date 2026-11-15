import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Count, Pair, R, Solo, Two, WOMAN, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, soft, sticker} from '../common/elegant';
import {Factory, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const SADIA: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#14305f', skirt: '#14305f', bottom: '#14305f', glasses: true, age: 0.35};
const RUMA: ToonLook = {...WOMAN, hairStyle: 'long', top: '#d94a6a', skirt: '#d94a6a', bottom: '#d94a6a'};
const Bright = <Factory light={1} />;
const Mid = <Factory light={0.55} />;
const Dark = <Factory light={0.15} />;
const workers = (e: 'neutral' | 'smile' = 'neutral') => crowd([140, 400, 680, 940], {h: 820, y: 1900, e, from: 5});

const SCENES: Record<string, React.FC<SP>> = {
  h1: Two(R({place: soft(Bright, 2), actors: workers('smile'), title: 'আলো বাড়ে, উৎপাদন বাড়ে', color: GREEN}), R({place: soft(Dark, 2), actors: workers('smile'), title: 'আলো কমে, তবু বাড়ে', color: GOLD}), 0.5),
  s01: R({place: soft(Mid, 2), actors: workers(), over: sticker('দিনে আটশো পিস', {x: 240, y: 560, w: 600, bg: '#14305f', size: 76})}),
  s02: Solo(soft(Mid, 3), {look: SADIA, e: 'thinking', g: 'think'}, {title: 'নতুন ম্যানেজার', color: GOLD}),
  s03: Count(900, {from: 800, label: 'নতুন টিউবলাইটে', post: ' পিস', size: 200, color: GREEN, place: soft(Bright, 8)}),
  s04: R({place: soft(Dark, 2), actors: [...workers(), {look: SADIA, x: 540, h: 1060, y: 1880, expression: 'serious' as const, gesture: 'pointUp' as const}], title: 'এবার আলো কমানো', color: GOLD}),
  s05: Count(950, {from: 800, label: 'কম আলোতেও', post: ' পিস', size: 200, color: GREEN, place: soft(Dark, 8)}),
  s06: Pair(soft(Dark, 3), {look: SADIA, e: 'surprised'}, {look: RUMA, e: 'laugh'}, {title: 'রুমা কারণটা বলে', color: GOLD}),
  s07: Pair(soft(Mid, 4), {look: SADIA, e: 'surprised'}, {look: RUMA, e: 'smile', g: 'explain', talk: true}),
  s08: Glass('আলোতে না', {place: Mid, tone: 'gold', sub: 'কেউ খেয়াল করছে, এই অনুভূতিতে', color: RED}),
  act: Glass('রোজ একবার গিয়ে জিজ্ঞেস করো', {place: Mid, color: '#bff2c8', sub: 'কেমন চলছে?'}),
  ...outro('Western Electric, Hawthorne কারখানা', 'Chicago, আমেরিকা', '১৯২৪–৩২', 'আসল পরীক্ষা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="আলো বাড়ালে কাজ বাড়ে" l2="আলো কমালেও বাড়ে!" bottom="আসল কারণটা আলো না" term="Hawthorne effect" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('কেউ খেয়াল করছে', {x: 0, y: 0, w: 560, bg: '#14532d', size: 78})()}</div>} size={84} />
);
export const b26 = story('b26/', raw, SCENES, Thumb, {logo: 'bba2'});
