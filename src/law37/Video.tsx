import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {CommentCard} from '../common/places2';
import {MIDDLE, R, Solo, Y3, story} from '../common/reel';
import {HandBox, crowd} from '../common/laws48';
import {Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {Chicken, Farm, MuriBowl, Station, ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const SATTAR: ToonLook = {...MIDDLE, kurta: false, top: '#d94a2a', bottom: '#3a3a3a'};
const Stn = <Station />;
const me = (expression: Expression, gesture: Gesture = 'idle', holding?: React.ReactNode) => ({look: SATTAR, x: 540, h: 1100, y: 1880, expression, gesture, holding, talking: gesture === 'open'});
const bowl = popIn(<MuriBowl size={560} />, 260, 500);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Stn, 3), actors: crowd([140, 400, 680, 940], {h: 880, y: 1900}), title: 'দশজন, একই মুড়ি', color: GOLD}),
  h2: R({place: soft(Stn, 4, 'gold'), actors: [me('laugh', 'thumbsUp')], over: sticker('৫০০ বনাম ৫,০০০', {x: 190, y: 420, w: 700, bg: '#14532d', size: 80})}),
  s01: R({place: soft(Stn, 3), actors: crowd([140, 400, 680, 940], {h: 880, y: 1900, from: 1}), title: 'ঝালমুড়ি, ঝালমুড়ি', color: GOLD}),
  s02: R({place: soft(Stn, 3, 'gold'), actors: [me('smile', 'hold', HandBox)], title: 'সাত্তার বাজায় তাল', color: GOLD}),
  s03: R({place: soft(Stn, 6, 'gold'), over: bowl, title: 'দুই হাত উঁচুতে', color: GOLD}),
  s04: R({place: soft(Stn, 8, 'gold'), over: bowl, title: 'একটা দানাও পড়ে না', color: GREEN}),
  s05: R({place: soft(Stn, 3, 'gold'), actors: [...crowd([150, 930], {h: 900, y: 1900, e: 'surprised'}).map((a) => ({...a, gesture: 'hold' as const, holding: HandPhone})), me('laugh')], title: 'সবাই ভিডিও করে', color: GOLD}),
  s06: Solo(soft(Stn, 4, 'gold'), {look: SATTAR, e: 'wink', g: 'open', talk: true}),
  s07: R({place: soft(Stn, 8), over: popIn(<CommentCard name="স্টেশনের ভিডিও" text="সাত্তারের মুড়ি না দেখে ফিরো না!" w={820} />, 130, 560)}),
  s08: R({place: soft(Stn, 3, 'gold'), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900, e: 'smile', from: 3}), title: 'সাত্তারের সামনে লাইন', color: GREEN}),
  s09: Solo(soft(Stn, 4, 'cool'), {look: Y3, e: 'thinking', g: 'think'}, {title: 'চোখ বন্ধ: পার্থক্য নেই', color: RED}),
  s10: Glass('মানুষ স্বাদ কেনে না', {place: Stn, tone: 'gold', sub: 'কেনে মুড়ি উড়তে দেখার পাঁচ সেকেন্ড'}),
  act: Glass('এমন একটা মুহূর্ত বানাও', {place: Stn, color: '#bff2c8', sub: 'যা দেখে মানুষ ফোন বের করে'}),
  ...ending(37, soft(<Farm />, 14), [<Chicken size={320} />, 'একই আধুনিক খামার'], [tag('খাঁচা খোলা বনাম পাহারা', {bg: '#14532d'}), 'দুই বিদেশফেরত'], 'আলাদা ভেবে সবার মতো চলা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একই মুড়ি, একই দাম" l2="একজনের আয় দশগুণ!" bottom="স্বাদ কিন্তু আলাদা না" term="48 Laws · Law 37" art={<div style={{position: 'absolute', left: 80, top: 1060}}><MuriBowl size={460} /></div>} size={84} />
);
export const law37 = story('law37/', raw, SCENES, Thumb, {logo: 'bba2'});
