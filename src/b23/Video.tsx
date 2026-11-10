import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Bike} from '../common/places2';
import {MIDDLE, Pair, R, Solo, Two, Y1, Y3, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {RepairShop} from '../common/elegant2';
import {at, outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const TALEB: ToonLook = {...MIDDLE, kurta: false, top: '#3a3a44', bottom: '#2a2c30'};
const MECH: ToonLook = {...Y3, top: '#2a3a5a', bottom: '#2a3a5a'};
const CUSTOMER: ToonLook = {...Y1, top: '#c0602a'};
const Garage = <RepairShop name="তালেব মোটরস" />;
const bike = popIn(<Bike size={520} />, 280, 1230);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Garage, 4), actors: [at(TALEB, 'smile', 'explain')], over: sticker('পার্টস বদলালেই কমিশন', {x: 150, y: 560, w: 780, bg: '#7a4a14', size: 66})}),
  h2: Two(R({place: soft(Garage, 6, 'gold'), over: sticker('ছয় মাসে আয় দ্বিগুণ', {x: 150, y: 600, w: 780, bg: '#14532d', size: 70})}), R({place: soft(Garage, 6, 'night'), over: sticker('এক বছরে প্রায় খালি', {x: 150, y: 600, w: 780, bg: '#7a1f3a', size: 70})}), 0.5),
  s01: R({place: soft(Garage, 2), actors: [at(TALEB, 'smile', 'idle', 760, 1080)], over: bike}),
  s02: Solo(soft(Garage, 3), {look: TALEB, e: 'laugh', g: 'pointUp'}, {title: 'যত পার্টস, তত কমিশন', color: GOLD}),
  s03: Pair(soft(Garage, 3), {look: CUSTOMER, e: 'neutral'}, {look: MECH, e: 'neutral'}, {title: 'শুধু চেইনের শব্দ', color: GOLD}),
  s04: Pair(soft(Garage, 4), {look: CUSTOMER, e: 'worried'}, {look: MECH, e: 'serious', g: 'explain', talk: true}),
  s05: R({place: soft(Garage, 8, 'cool'), over: () => (
    <>
      {popIn(<Paper title="বিল" lines={['চেইন, স্প্রোকেট, ক্লাচ', '৳ ৪,৫০০']} size={50} w={560} rot={-3} />, 60, 480)()}
      {popIn(<Paper title="দরকার ছিল" lines={['তেল', '৳ ২০০']} size={50} w={420} rot={4} />, 600, 620, 12)()}
    </>
  )}),
  s06: Solo(soft(Garage, 3, 'gold'), {look: TALEB, e: 'laugh', g: 'thumbsUp'}, {title: 'আয় দ্বিগুণ', color: GREEN}),
  s07: R({place: soft(Garage, 4, 'cool'), actors: crowd([200, 540, 880], {h: 900, y: 1900, e: 'skeptical'}), title: 'এক কান থেকে দশ কান', color: RED}),
  s08: R({place: soft(Garage, 4, 'night'), actors: [at(TALEB, 'sad')], title: 'খদ্দের অর্ধেক নেই', color: RED}),
  act: Glass('খদ্দের খুশি হলে তবেই পুরস্কার', {place: Garage, color: '#bff2c8', sub: 'কমিশন বাঁধো ঠিক জিনিসে', size: 80}),
  ...outro('Sears Auto Centers', 'California, আমেরিকা', '১৯৯২', 'আসল ঘটনা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="মিস্ত্রিদের দেওয়া হলো কমিশন" l2="আয় দ্বিগুণ, তারপর গ্যারেজ খালি!" bottom="ভুল পুরস্কারের ফাঁদ" term="কমিশনের শিক্ষা" art={<div style={{position: 'absolute', left: 60, top: 1180}}><Bike size={520} /></div>} size={78} />
);
export const b23 = story('b23/', raw, SCENES, Thumb, {logo: 'bba2'});
