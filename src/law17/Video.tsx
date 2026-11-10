import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {ClassRoom, PsyThumb} from '../common/psy';
import {Cta, ELDER, R, SIR, Solo, Two, Y1, lawBook, story} from '../common/reel';
import {HandPaper, Next, NextBadge, crowd} from '../common/laws48';
import {Campus, Fortress, Glass, SchoolRoom, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const ALAM: ToonLook = SIR;
const MOSTAFA: ToonLook = {...ELDER, kurta: false, top: '#f4f2ec', jacket: '#3a3230'};
const Room = (board?: string) => <SchoolRoom board={board} />;
const kids = (expr: 'neutral' | 'serious' | 'worried' | 'surprised' = 'neutral') => () => <ClassRoom lookX={0} expr={expr} />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Room('হোমওয়ার্ক: রোজ'), 2, 'cool'), over: kids('neutral'), title: 'রোজ দেখা: অর্ধেক কপি', color: RED}),
  h2: R({place: soft(Room('হোমওয়ার্ক: ?'), 2, 'cool'), over: kids('serious'), title: 'অনিয়মিত দেখা: সবাই করে', color: GREEN, size: 70}),
  s01: R({place: soft(Room('নবম শ্রেণি · ক ও খ'), 0, 'cool'), over: kids('neutral')}),
  s02: Solo(soft(Room('রোজ ১০টা, খাতা চেক'), 3, 'cool'), {look: ALAM, e: 'serious', g: 'pointUp'}, {title: 'আলম স্যার: একই নিয়মে', color: GOLD}),
  s03: R({place: soft(<Campus />, 4), actors: crowd([150, 400, 680, 930], {h: 860, y: 1900, e: 'laugh'}).map((a) => ({...a, gesture: 'hold' as const, holding: HandPaper})), title: 'একজন লেখে, দশজন কপি', color: RED}),
  s04: Solo(soft(Room(''), 3, 'cool'), {look: MOSTAFA, e: 'thinking', g: 'think'}, {title: 'মোস্তফা স্যার: নিয়ম নেই', color: GOLD}),
  s05: Glass('টানা ৩ দিন খাতা দেখা, তারপর ২ সপ্তাহ কিছুই না', {place: Room(''), tone: 'cool', size: 78}),
  s06: R({place: soft(Room(''), 2, 'cool'), over: kids('worried'), actors: [{look: MOSTAFA, x: 880, h: 900, y: 1700, expression: 'serious', gesture: 'pointL', lookX: -1}], title: 'কখনো শুধু একজন', color: GOLD}),
  s07: Solo(soft(Room('শেষ বেঞ্চ, বোর্ডে এসো'), 3, 'cool'), {look: MOSTAFA, e: 'serious', g: 'pointUp', talk: true}),
  s08: Solo(soft(Room('x² + 5x + 6 = 0'), 2, 'cool'), {look: Y1, e: 'worried', g: 'think'}, {title: 'বোর্ডে এসে আটকে যায়', color: RED}),
  s09: R({place: soft(Room(''), 2, 'cool'), over: kids('serious'), title: 'তাই সবাই রোজ নিজে করে', color: GREEN}),
  s10: Two(R({place: soft(Room('বোর্ড পরীক্ষা'), 6, 'cool'), title: 'বছর শেষে', color: GOLD}), Glass('অংকে এ প্লাস: দ্বিগুণ', {place: Room(''), tone: 'gold', color: '#9ff2b0', size: 110}), 0.35),
  s11: Glass('নিয়ম জানলে ফাঁকি, না জানলে ভয়টাই নিয়ম', {place: Room(''), tone: 'cool', size: 84}),
  book: lawBook(17),
  lesson: R({bg: 'plain'}),
  act: Glass('যাচাইটা রাখো অনিয়মিত', {place: Room(''), tone: 'cool', color: '#bff2c8', size: 100}),
  next: Next(18, tag('১০ ফুট দেয়াল', {w: 680, bg: '#3a3c46', size: 86}), {title: 'গ্রামের সবচেয়ে ধনী মানুষ', place: soft(<Fortress night />, 14, 'night')}),
  next2: Next(18, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>!</div>, {title: 'চিৎকার শুনেও কেউ আসে না', place: soft(<Fortress night />, 14, 'night')}),
  next3: Next(18, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'দেয়াল কখন বিপদ?', place: soft(<Fortress night />, 14, 'night')}),
  cta: () => (
    <Cta>
      <NextBadge law={18} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="রোজ খাতা দেখলে কপি" l2="অনিয়মিত দেখলে সবাই করে!" bottom="এ প্লাস দ্বিগুণ" term="48 Laws · Law 17" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('হোমওয়ার্ক?', {x: 0, y: 0, w: 560, bg: '#23402f', size: 86})()}</div>} size={82} />
);
export const law17 = story('law17/', raw, SCENES, Thumb, {logo: 'bba2'});
