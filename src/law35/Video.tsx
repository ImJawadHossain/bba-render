import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall, HandCup} from '../common/places';
import {Count, MIDDLE, Pair, R, Y1, Y2, Y3, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, soft, sticker, tag} from '../common/elegant';
import {Bat, CornerShop, Cricket, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const RASHED: ToonLook = {...Y3, top: '#2a4a6a'};
const MAMUN: ToonLook = {...Y1, top: '#c0304a'};
const BADAL: ToonLook = {...Y2, top: '#5a7a3a'};
const SAJIB: ToonLook = {...MIDDLE, kurta: false, top: '#8a6a4a', bottom: '#2a2c30'};
const FRIEND: ToonLook = {...Y1, top: '#d9a21b'};
const front = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle') => [{look, x: 250, h: 1000, y: 1880, expression, gesture, lookX: 1}];
const tenant = (name: string, look: ToonLook, title: string) => R({place: soft(<CornerShop name={name} />, 2), actors: front(look, 'sad', 'shrug'), title, color: RED});
const Mine = <CornerShop done name="রাশেদ ফার্মেসি" />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(<CornerShop open={false} />, 2), title: 'তিনজনই লোকসানে', color: RED}),
  h2: R({place: soft(Mine, 2, 'gold'), actors: crowd([140, 400, 680, 940], {h: 820, y: 1900}), title: 'প্রথম মাসেই লাভ', color: GREEN}),
  s01: R({place: soft(<CornerShop open={false} />, 0), title: 'মোড়ের দোকানঘর', color: GOLD}),
  s02: tenant('মামুন ফার্মেসি', MAMUN, 'মামুন: ছয় মাসে বন্ধ'),
  s03: tenant('বাদল ড্রাগ হাউস', BADAL, 'বাদল: আট মাসে বন্ধ'),
  s04: tenant('সজীব মেডিসিন', SAJIB, 'সজীব: ধারে ডুবে'),
  s05: R({place: soft(<ChaiStall />, 3), actors: [{look: RASHED, x: 540, h: 1120, y: 1880, expression: 'thinking', gesture: 'hold', holding: HandCup}], title: 'রাশেদ শুধু দেখে', color: GOLD}),
  s06: Pair(soft(<ChaiStall />, 4), {look: RASHED, e: 'smile'}, {look: FRIEND, e: 'laugh', g: 'pointL', talk: true}),
  s07: R({place: soft(<CornerShop />, 4, 'cool'), over: sticker('পাশের বিল্ডিং: হাসপাতাল', {x: 70, y: 420, w: 940, bg: '#14305f', size: 66})}),
  s08: Count(20000, {pre: '৳', label: 'ভাড়া অর্ধেক', sub: 'আগে ছিল চল্লিশ হাজার', size: 200, color: GREEN, place: soft(<CornerShop open={false} />, 10)}),
  s09: R({place: soft(Mine, 2), actors: front(RASHED, 'smile', 'thumbsUp'), title: 'খোলার দুই মাস আগে', color: GREEN}),
  s10: R({place: soft(Mine, 3, 'gold'), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900, from: 2}), title: 'দোকানের সামনে লাইন', color: GREEN}),
  s11: Glass('ঠিক দোকান, ভুল সময়: লোকসান', {place: <CornerShop done />, tone: 'gold', sub: 'একই দোকান, ঠিক সময়: লাভ'}),
  act: Glass('কাজটা ঠিক, সময়টা কি ঠিক?', {place: <CornerShop />, color: '#bff2c8', sub: 'বড় সিদ্ধান্তের আগে জিজ্ঞেস করো'}),
  ...ending(35, soft(<Cricket />, 14), [<Bat size={150} />, 'একই দিনে বাদ দুজন'], [tag('নিষিদ্ধ বনাম অধিনায়ক', {bg: '#14532d'}), 'জেলা দলের দুই ওপেনার'], 'পাত্তা না দেওয়ার শক্তি'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="তিনজন লোকসানে ছাড়ল" l2="চতুর্থজন প্রথম মাসেই লাভে!" bottom="পার্থক্য শুধু সময়ে" term="48 Laws · Law 35" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('একই দোকান', {x: 0, y: 0, w: 520, bg: '#14305f', size: 84})()}</div>} size={84} />
);
export const law35 = story('law35/', raw, SCENES, Thumb, {logo: 'bba2'});
