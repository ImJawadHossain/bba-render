import React from 'react';
import {GOLD, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {Fair} from '../common/places2';
import {MIDDLE, Pair, R, Solo, story} from '../common/reel';
import {crowd} from '../common/laws48';
import {Glass, Library, Plots, soft, sticker, tag} from '../common/elegant';
import {ending} from '../common/elegant2';
import {Expression, Gesture, ToonLook} from '../common/Toon';
import raw from './segments.json';

const NASIR: ToonLook = {...MIDDLE, kurta: false, top: '#d6e2ea', bottom: '#2a2c30', glasses: true};
const ALAMGIR: ToonLook = {...MIDDLE, top: '#f2efe6', jacket: '#3a2a1a'};
const House = <Home />;
const Hall = <Fair />;
const Land = <Plots mark />;
const mid = (look: ToonLook, expression: Expression, gesture: Gesture = 'idle') => ({look, x: 540, h: 1100, y: 1880, expression, gesture, talking: gesture === 'open' || gesture === 'pointUp'});

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Hall, 3, 'gold'), actors: [mid(ALAMGIR, 'laugh', 'open')], over: sticker('বিয়ের খরচ: তিন লাখ', {x: 150, y: 420, w: 780, bg: '#14532d', size: 72})}),
  h2: R({place: soft(Land, 0, 'night'), over: sticker('দাম: বিশ লাখ', {x: 240, y: 640, w: 600, bg: '#7a1f3a', size: 84}), title: 'এক বছর পর', color: RED}),
  s01: Solo(soft(House, 3), {look: NASIR, e: 'worried', g: 'shrug'}, {title: 'মেয়ের বিয়ে, টাকা নেই', color: GOLD}),
  s02: Solo(soft(House, 3, 'gold'), {look: ALAMGIR, e: 'smile'}, {title: 'গ্রামের সবচেয়ে ধনী', color: GOLD}),
  s03: Pair(soft(House, 4, 'gold'), {look: NASIR, e: 'surprised'}, {look: ALAMGIR, e: 'laugh', g: 'open', talk: true}),
  s04: R({place: soft(Hall, 3, 'gold'), actors: [...crowd([140, 940], {h: 860, y: 1900, e: 'smile'}), mid(ALAMGIR, 'laugh', 'pointUp')], title: 'ভাইয়ের মেয়ে আমার মেয়ে', color: GOLD}),
  s05: Solo(soft(Hall, 4, 'gold'), {look: NASIR, e: 'sad'}, {title: 'চোখে পানি', color: GOLD}),
  s06: R({place: soft(House, 4), actors: crowd([140, 400, 680, 940], {h: 860, y: 1900}), title: 'এক বছর পর', color: GOLD}),
  s07: Pair(soft(House, 4), {look: NASIR, e: 'worried'}, {look: ALAMGIR, e: 'smile', g: 'pointL', talk: true}),
  s08: R({place: soft(House, 5, 'cool'), actors: [...crowd([140, 940], {h: 860, y: 1900, e: 'surprised'}), mid(NASIR, 'worried')], title: 'সবাই তাকিয়ে', color: RED}),
  s09: R({place: soft(Land, 0, 'night'), over: () => (
    <>
      {sticker('বাজারদর: ৪০ লাখ', {x: 150, y: 520, w: 780, bg: '#14305f', size: 70})()}
      {sticker('পেলেন: ২০ লাখ', {x: 150, y: 780, w: 780, bg: '#7a1f3a', size: 70, at: 12})()}
    </>
  )}),
  s10: Glass('তিন লাখের উপহার, বিশ লাখের দাম', {place: Hall, tone: 'gold', sub: 'না বলার অধিকার গেছে বিয়ের দিনেই', size: 78}),
  act: Glass('এর দাম কে ঠিক করবে?', {place: House, color: '#bff2c8', sub: 'পারলে নিজের দাম নিজে দাও'}),
  ...ending(40, soft(<Library />, 14), [tag('পঞ্চাশ বছরের দোকান', {bg: '#7a4a14'}), 'বড় ছেলে লোকসানে'], [tag('নতুন নামে, আরও বড়', {bg: '#14532d'}), 'ছোট ছেলে কিছুই পায়নি'], 'ছায়া থেকে বের হওয়া'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="মেয়ের বিয়ের খরচ দিলেন ভাই" l2="দাম দিতে হলো বিশ লাখ!" bottom="বিনা পয়সার জিনিসের আসল দাম" term="48 Laws · Law 40" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{sticker('৩ লাখ → ২০ লাখ', {x: 0, y: 0, w: 580, bg: '#7a1f3a', size: 80})()}</div>} size={78} />
);
export const law40 = story('law40/', raw, SCENES, Thumb, {logo: 'bba2'});
