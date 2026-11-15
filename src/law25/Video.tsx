import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Avenue, Home, Taka} from '../common/places';
import {Count, MOM, Pair, R, SIR, Solo, Two, Y3, story} from '../common/reel';
import {HandBox, HandPaper, crowd} from '../common/laws48';
import {Apartment, Glass, popIn, soft, tag} from '../common/elegant';
import {BusStand, VisitingCard, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const OLD: ToonLook = {...Y3, top: '#8a7a5a', bottom: '#3a3a3a'};
const NEW: ToonLook = {...Y3, top: '#1f4a8a', bottom: '#1f4a8a', shoes: '#16161a'};
const LADY: ToonLook = {...MOM, top: '#7a4a2a', skirt: '#5a3a2a', age: 0.6};
const Flats = <Apartment />;
const card = (w = 560) => <VisitingCard name="সোহেল ইলেকট্রিক" sub="ফ্যান · লাইট · সুইচবোর্ড" w={w} />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: Two(Solo(soft(<Home dim />, 3, 'night'), {look: OLD, e: 'sad'}, {title: 'ওই সোহেল', color: RED}), Solo(soft(Flats, 3, 'gold'), {look: NEW, e: 'smile', g: 'thumbsUp'}, {title: 'একই কাজে তিনগুণ', color: GREEN}), 0.4),
  h2: Solo(soft(<Home />, 4), {look: LADY, e: 'smile', g: 'hold', hold: HandPhone}, {title: 'ডাকে পুরোনো পাড়াই', color: GOLD}),
  s01: Solo(soft(<Home />, 2), {look: OLD, e: 'neutral', g: 'pointUp'}, {title: 'ফ্যান, লাইট, সুইচ', color: GOLD}),
  s02: R({place: soft(<Avenue />, 3), actors: [...crowd([150, 930], {h: 860, y: 1900, from: 1}), {look: OLD, x: 540, h: 1000, y: 1880, expression: 'neutral', gesture: 'idle'}], title: 'ওই সোহেলকে খবর দাও', color: GOLD}),
  s03: Solo(soft(<Home />, 3), {look: OLD, e: 'sad', g: 'open'}, {over: popIn(<Taka w={340} amount="২০০" />, 370, 420), title: 'দুইশো টাকা', color: RED}),
  s04: Pair(soft(<Home />, 4), {look: OLD, e: 'worried'}, {look: LADY, e: 'skeptical', g: 'pointL', talk: true}),
  s05: R({place: soft(Flats, 6, 'dusk'), actors: [{look: NEW, x: 540, h: 1180, y: 1870, expression: 'serious', gesture: 'idle'}], title: 'এক বছর পর', color: GOLD}),
  s06: Solo(soft(Flats, 2), {look: NEW, e: 'smile', g: 'hold', hold: HandBox}, {over: popIn(card(), 260, 400)}),
  s07: Pair(soft(<Home />, 3), {look: NEW, e: 'serious', g: 'hold', hold: HandPaper}, {look: SIR, e: 'smile'}, {title: 'কাজের আগে লিখিত দাম', color: GOLD}),
  s08: Count(600, {pre: '৳', label: 'একই ফ্যান, একই সুইচ', size: 230, color: GREEN, place: soft(Flats, 10, 'gold')}),
  s09: R({place: soft(Flats, 8, 'gold'), over: () => (
    <>
      {popIn(card(460), 70, 520, 2)()}
      {popIn(card(460), 550, 740, 10)()}
      {popIn(card(460), 190, 960, 18)()}
    </>
  ), title: 'কার্ড ঘোরে হাতে হাতে', color: GOLD}),
  s10: Solo(soft(<Home />, 4), {look: LADY, e: 'smile', g: 'hold', hold: HandPhone, talk: true}, {title: 'চিনতেই পারেন না', color: RED}),
  s11: Glass('হাত একই, কাজ একই', {place: Flats, tone: 'gold', sub: 'বদলেছে শুধু নিজেকে দেখানো'}),
  act: Glass('নাম, চেহারা, কাজের ঢং', {place: Flats, color: '#bff2c8', sub: 'নিজে ঠিক করো'}),
  ...ending(25, soft(<BusStand />, 14), [tag('ভাড়া বিশ টাকা বেশি', {bg: '#7a1f3a'}), 'যাত্রীরা রাস্তা আটকায়'], [tag('মালিকের নামে স্লোগান', {bg: '#14532d'}), 'ভাড়া তবু বেশি'], 'হাত পরিষ্কার রাখা'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ওই সোহেল থেকে সোহেল ইলেকট্রিক" l2="একই কাজে তিনগুণ টাকা!" bottom="বদলেছে শুধু পরিচয়" term="48 Laws · Law 25" art={<div style={{position: 'absolute', left: 40, top: 1180}}>{card(560)}</div>} size={78} />
);
export const law25 = story('law25/', raw, SCENES, Thumb, {logo: 'bba2'});
