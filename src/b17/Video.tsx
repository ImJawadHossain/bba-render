import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {MIDDLE, Pair, R, SIR, Two, story} from '../common/reel';
import {HandPaper} from '../common/laws48';
import {Glass, popIn, soft, sticker} from '../common/elegant';
import {Room} from '../common/elegant2';
import {outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const OFFICER: ToonLook = {...SIR, tie: '#14305f'};
const RAHIM: ToonLook = {...MIDDLE, top: '#f2efe6'};
const KARIM: ToonLook = {...MIDDLE, kurta: false, top: '#8a6a4a', bottom: '#2a2c30'};
const Office = <Room paint="linear-gradient(180deg, #c8d6e2, #9fb2c2)" />;
const clock = (t: string, bg: string) => sticker(t, {x: 290, y: 420, w: 500, bg, size: 96});

const SCENES: Record<string, React.FC<SP>> = {
  h1: Two(R({place: soft(Office, 4), over: clock('সকাল ১০টা: পাস', '#14532d')}), R({place: soft(Office, 4, 'dusk'), over: clock('দুপুর ১টা: বাতিল', '#7a1f3a')}), 0.5),
  s01: Pair(soft(Office, 3), {look: RAHIM, e: 'neutral', g: 'hold', hold: HandPaper}, {look: KARIM, e: 'neutral', g: 'hold', hold: HandPaper}, {title: 'দুজনেই চায় দুই লাখ', color: GOLD}),
  s02: R({place: soft(Office, 8), over: () => (
    <>
      {popIn(<Paper title="রহিম স্টোর" lines={['ব্যবসা: ৫ বছর', 'আয়: একই রকম']} size={44} w={460} rot={-4} />, 60, 520)()}
      {popIn(<Paper title="করিম স্টোর" lines={['ব্যবসা: ৫ বছর', 'আয়: একই রকম']} size={44} w={460} rot={4} />, 560, 560, 8)()}
    </>
  )}),
  s03: Pair(soft(Office, 3, 'gold'), {look: RAHIM, e: 'smile'}, {look: OFFICER, e: 'smile'}, {over: clock('সকাল ১০টা', '#14305f')}),
  s04: Pair(soft(Office, 3, 'gold'), {look: RAHIM, e: 'laugh'}, {look: OFFICER, e: 'smile', g: 'thumbsUp', talk: true}),
  s05: Pair(soft(Office, 4, 'dusk'), {look: KARIM, e: 'neutral'}, {look: OFFICER, e: 'worried'}, {over: clock('দুপুর ১টা', '#7a1f3a')}),
  s06: Pair(soft(Office, 4, 'dusk'), {look: KARIM, e: 'worried'}, {look: OFFICER, e: 'serious', g: 'shrug', talk: true}),
  s07: Glass('ভুল ছিল কাগজে না', {place: Office, tone: 'dusk', sub: 'ভুল ছিল ঘড়িতে', color: RED}),
  s08: Glass('ক্লান্ত মাথার সহজ উত্তর', {place: Office, tone: 'cool', sub: 'না', color: GREEN}),
  act: Glass('বড় কিছু চাইলে সকালে যাও', {place: Office, color: '#bff2c8', sub: 'বা খাওয়ার পরে'}),
  ...outro('Shai Danziger', 'Ben-Gurion University', '২০১১'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="সকালে লোন পাস" l2="দুপুরে একই কাগজ বাতিল!" bottom="ভুল ছিল ঘড়িতে" term="ক্লান্ত সিদ্ধান্তের গবেষণা" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('দুপুর ১টা', {x: 0, y: 0, w: 480, bg: '#7a1f3a', size: 96})()}</div>} size={84} />
);
export const b17 = story('b17/', raw, SCENES, Thumb, {logo: 'bba2'});
