import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Counter, Home} from '../common/places';
import {Count, Cta, ELDER, Pair, R, Solo, Two, Y1, lawBook, story} from '../common/reel';
import {Next, NextBadge, Plate} from '../common/laws48';
import {Campus, Envelope, Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const TANVIR: ToonLook = {...Y1, top: '#3f7a5a'};
const BABA: ToonLook = {...ELDER, glasses: true};
const Day = <Home />;
const Night = <Home dim />;
const table = (env?: 'shut' | 'open') => () => (
  <>
    <Counter top={1420} color="#6a3a2a" />
    <div style={{position: 'absolute', left: 140, top: 1390}}>
      <Plate size={220} />
    </div>
    <div style={{position: 'absolute', left: 720, top: 1390}}>
      <Plate size={220} />
    </div>
    {env ? (
      <div style={{position: 'absolute', left: 410, top: 1300}}>
        <Envelope size={260} open={env === 'open'} />
      </div>
    ) : null}
  </>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: Pair(soft(Day), {look: TANVIR, e: 'sad'}, {look: BABA, e: 'serious', g: 'pointL', talk: true}, {bar: true, front: table(), title: 'ছয় মাসের তর্ক', color: RED}),
  h2: R({place: soft(Night, 6, 'gold'), over: popIn(<Envelope size={600} open />, 240, 560), title: 'একটা খাম', color: GOLD}),
  s01: Pair(soft(Day, 3), {look: TANVIR, e: 'smile', g: 'hold', hold: HandPhone}, {look: BABA, e: 'skeptical'}, {title: 'ফ্রিল্যান্সিং বনাম সরকারি চাকরি', color: GOLD, size: 70}),
  s02: Pair(soft(Day, 4), {look: TANVIR, e: 'worried'}, {look: BABA, e: 'serious', g: 'pointL', talk: true}, {bar: true, front: table()}),
  s03: Pair(soft(Day, 4), {look: TANVIR, e: 'serious', g: 'explain', talk: true}, {look: BABA, e: 'skeptical'}, {bar: true, front: table(), title: 'রোজ রাতে একই তর্ক', color: GOLD}),
  s04: Solo(soft(Night, 4, 'night'), {look: BABA, e: 'serious', g: 'shrug'}, {title: 'প্লেট ঠেলে উঠে যান', color: RED}),
  s05: Solo(soft(Night, 5, 'night'), {look: TANVIR, e: 'serious'}, {near: true, title: 'আর একটা কথাও না', color: GOLD}),
  s06: Two(Solo(soft(Day, 3), {look: TANVIR, e: 'neutral', g: 'hold', hold: HandPhone}, {title: 'দিনে: বিসিএসের বই', color: GOLD}), R({place: soft(Night, 0, 'night'), actors: [{look: TANVIR, x: 540, h: 1100, y: 1880, expression: 'serious', gesture: 'hold', holding: HandPhone}], title: 'রাতে: ল্যাপটপের আলো', color: '#9fd3ff'}), 0.5),
  s07: R({place: soft(Day, 3, 'gold'), front: table('shut'), title: 'বাবার প্লেটের পাশে খাম', color: GOLD}),
  s08: Count(62000, {pre: '৳', label: 'প্রথম মাসের আয়', size: 200, color: GREEN, place: soft(Day, 10, 'gold')}),
  s09: Pair(soft(Day, 3), {look: TANVIR, e: 'neutral'}, {look: BABA, e: 'blank'}, {bar: true, front: table('open'), title: 'কিছু না বলে খেয়ে উঠে যান', color: GOLD, size: 70}),
  s10: Solo(soft(Day, 3), {look: BABA, e: 'smile', g: 'hold', hold: HandPhone}, {title: 'পরদিন সকালে', color: GOLD}),
  s11: Solo(soft(Day, 4), {look: BABA, e: 'laugh', g: 'hold', hold: HandPhone, talk: true}),
  s12: Glass('ছয় মাসের তর্কে যা হয়নি, একটা খামে তা হলো', {place: Day, tone: 'gold'}),
  book: lawBook(9),
  lesson: R({bg: 'plain'}),
  act: Glass('কথা থামাও, ফলটা সামনে রাখো', {place: Day, color: '#bff2c8'}),
  next: Next(10, tag('জিপিএ ৫ + জিপিএ ৫', {w: 640, size: 74, bg: '#14305f'}), {title: 'একই রেজাল্ট, দুই ভাই', place: soft(<Campus />, 14, 'cool')}),
  next2: Next(10, <div style={{display: 'flex', gap: 30}}>{tag('ঢাবি', {w: 300, bg: '#14532d', size: 90})}{tag('বাড়ি', {w: 300, bg: '#7a1f3a', size: 90})}</div>, {title: 'একজন চান্স, একজন বাড়ি', place: soft(<Campus />, 14, 'cool')}),
  next3: Next(10, <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>, {title: 'পার্থক্যটা পড়ায় না', place: soft(<Campus />, 14, 'cool')}),
  cta: () => (
    <Cta>
      <NextBadge law={10} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ছয় মাস তর্কে হার" l2="একটা খামে জিত!" bottom="বাবা চুপ, তারপর গর্ব" term="48 Laws · Law 9" art={<div style={{position: 'absolute', left: 40, top: 1150}}><Envelope size={520} open /></div>} size={86} />
);
export const law09 = story('law09/', raw, SCENES, Thumb, {logo: 'bba2'});
