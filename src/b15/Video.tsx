import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {MIDDLE, R, Solo, Y1, story} from '../common/reel';
import {HandPaper, crowd} from '../common/laws48';
import {Glass, SchoolRoom, soft, sticker} from '../common/elegant';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RIAZ: ToonLook = {...MIDDLE, kurta: false, top: '#e8e2d2', bottom: '#2a2c30', glasses: true};
const STUDENT: ToonLook = {...Y1, top: '#f2efe6', jacket: '#14305f', age: 0};
const Half = <SchoolRoom lines={['২x + ৫ = ১৭', '২x = ১২', 'x = ?']} />;
const Done = <SchoolRoom lines={['২x + ৫ = ১৭', 'x = ৬', 'উত্তর: ৬']} />;
const kids = (e: 'neutral' | 'skeptical' | 'smile' = 'neutral') => crowd([140, 400, 680, 940], {h: 760, y: 1900, e});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Half, 0), actors: [at(RIAZ, 'smile', 'pointUp', 540, 1000)]}),
  h2: R({place: soft(Half, 2, 'gold'), actors: kids('smile'), over: sticker('সবচেয়ে বেশি মনে রাখে', {x: 150, y: 760, w: 780, bg: '#14532d', size: 66})}),
  s01: R({place: soft(Done, 0), actors: kids()}),
  s02: R({place: soft(Half, 0), actors: [at(RIAZ, 'neutral', 'explain', 540, 1000)]}),
  s03: Solo(soft(Half, 3), {look: RIAZ, e: 'smile', g: 'open', talk: true}),
  s04: R({place: soft(Half, 2), actors: kids('skeptical')}),
  s05: R({place: soft(<Home dim />, 4, 'night'), actors: [at(STUDENT, 'thinking', 'hold', 540, 1000, {holding: HandPaper})], title: 'রাতে নিজেই চেষ্টা', color: GOLD}),
  s06: R({place: soft(Half, 2), actors: kids('smile'), title: 'কাউকে মনে করাতে হয় না', color: GREEN}),
  s07: R({place: soft(<SchoolRoom board="বছর শেষের পরীক্ষা" />, 0, 'gold'), actors: kids('smile'), title: 'পুরোনো অংকও মনে আছে', color: GREEN}),
  s08: Glass('শেষ হওয়া অংক মাথা ছাড়ে', {place: Half, tone: 'gold', sub: 'অর্ধেক অংক মাথায় আটকে থাকে'}),
  act: Glass('পরের ধাপ একটু শুরু করে থামো', {place: Half, color: '#bff2c8', sub: 'কাল মন নিজেই টেনে নেবে'}),
  ...outro('Bluma Zeigarnik', 'Berlin', '১৯২৭'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="প্রতিটা ক্লাস অর্ধেক অংকে শেষ" l2="তাঁর ছাত্ররাই সবচেয়ে বেশি মনে রাখে!" bottom="অর্ধেক রাখার জাদু" term="Zeigarnik effect" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('x = ?', {x: 0, y: 0, w: 420, bg: '#14305f', size: 110})()}</div>} size={76} />
);
export const b15 = story('b15/', raw, SCENES, Thumb, {logo: 'bba2'});
