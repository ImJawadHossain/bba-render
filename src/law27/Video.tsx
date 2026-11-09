import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {PhoneShop, Rooftop} from '../common/places';
import {CommentCard, LiveBadge} from '../common/places2';
import {Count, R, Solo, WOMAN, story} from '../common/reel';
import {PageCard} from '../common/laws48';
import {Glass, popIn, soft, sticker, tag} from '../common/elegant';
import {Plants, ending} from '../common/elegant2';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const TULI: ToonLook = {...WOMAN, hairStyle: 'long', top: '#2a7a4a', skirt: '#2a7a4a', bottom: '#2a7a4a'};
const Roof = <Rooftop />;
const Night = <Rooftop night />;
const attack = (texts: string[], y0 = 470) => () => (
  <>
    {texts.map((t, i) => (
      <React.Fragment key={t}>{popIn(<CommentCard name={`যোদ্ধা #${['৪১২', '৯৭', '২,০৪১'][i % 3]}`} text={t} bad w={820} />, 130, y0 + i * 250, 4 + i * 12)()}</React.Fragment>
    ))}
  </>
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Roof, 3), over: popIn(<Plants size={700} />, 190, 640), title: 'চারার দাম দেড়গুণ', color: GOLD}),
  h2: R({place: soft(Night, 8, 'night'), over: () => (
    <>
      {popIn(<CommentCard name="নতুন সদস্য" text="নার্সারিতে অর্ধেক দাম!" w={820} />, 130, 470, 2)()}
      {popIn(<CommentCard name="যোদ্ধা #৪১২" text="তুমি আমাদের কেউ না!" bad w={820} />, 130, 760, 16)()}
    </>
  ), title: 'ক্রেতারাই আক্রমণ করে', color: RED}),
  s01: Solo(soft(Roof, 2), {look: TULI, e: 'smile', g: 'hold', hold: HandPhone}, {title: 'ছাদের চারা', color: GOLD}),
  s02: R({place: soft(Roof, 8, 'gold'), over: popIn(<PageCard name="সবুজ পরিবার" followers="১২০" w={680} />, 200, 460)}),
  s03: R({place: soft(Roof, 6), over: sticker('সবুজ যোদ্ধা', {x: 160, y: 560, w: 760, bg: '#14532d', size: 96}), title: 'প্রত্যেকের একটা নম্বর', color: GOLD}),
  s04: R({place: soft(Night, 4, 'night'), actors: [{look: TULI, x: 540, h: 1180, y: 1870, expression: 'laugh', gesture: 'wave', talking: true}], over: () => <LiveBadge viewers="৩,২০০" />,title: 'শুক্রবার রাত দশটা', color: GOLD}),
  s05: Solo(soft(Night, 4, 'night'), {look: TULI, e: 'serious', g: 'explain', talk: true}),
  s06: Count(40000, {label: 'সবুজ যোদ্ধা', size: 200, color: GREEN, place: soft(Roof, 10, 'gold')}),
  s07: R({place: soft(Night, 8, 'night'), over: popIn(<CommentCard name="নতুন সদস্য" text="নার্সারিতে একই চারা অর্ধেক দামে!" w={820} />, 130, 560)}),
  s08: Solo(soft(Night, 5, 'night'), {look: TULI, e: 'blank'}, {title: 'তুলি চুপ', color: GOLD}),
  s09: R({place: soft(Night, 10, 'night'), over: attack(['তুমি আমাদের পরিবারের কেউ না', 'বের হয়ে যাও!', 'দাম না, ভালোবাসা দেখো']), title: 'এক ঘণ্টায় তিনশো কমেন্ট', color: RED}),
  s10: Solo(soft(Roof, 4, 'gold'), {look: TULI, e: 'laugh', g: 'thumbsUp'}, {title: 'বিক্রি আরও বেশি', color: GREEN}),
  s11: Glass('তুলি চারা বেচেনি, বেচেছে একটা পরিবার', {place: Roof, tone: 'gold', sub: 'পরিবারকে কেউ দামের প্রশ্ন করে না', size: 78}),
  act: Glass('শুধু জিনিস বেচো না', {place: Roof, color: '#bff2c8', sub: 'একটা নাম, একটা নিয়ম, একটা দিন দাও'}),
  ...ending(27, soft(<PhoneShop sign={false} />, 14), [tag('ছয় মাসের মেসেজ', {bg: '#7a4a14'}), 'একটা ছোট তাকের জন্য'], [tag('দশটা শাখা', {bg: '#14532d'}), 'রাজু চায়, আর পায়'], 'সাহস নিয়ে চাওয়া'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="চারার দাম বাজারের দেড়গুণ" l2="তবু ক্রেতারাই রক্ষা করে!" bottom="সবুজ পরিবারের রহস্য" term="48 Laws · Law 27" art={<div style={{position: 'absolute', left: 60, top: 1160}}><Plants size={620} /></div>} size={80} />
);
export const law27 = story('law27/', raw, SCENES, Thumb, {logo: 'bba2'});
