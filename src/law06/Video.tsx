import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {ChaiStall, Counter, HandCup, Home} from '../common/places';
import {CommentCard, ShopFront, TeaAlley} from '../common/places2';
import {CAST} from '../common/cast';
import {Bounce, Cta, Pair, R, Solo, Y1, Y2, lawBook, story} from '../common/reel';
import {Next, NextBadge, PageCard, Shutter, crowd} from '../common/laws48';
import {Banner, Fuchka, Glass, popIn, soft} from '../common/elegant';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const SABBIR: ToonLook = {...Y1, top: '#2a7a6a'};
const KAMRUL: ToonLook = {...Y2, hairStyle: 'side', top: '#c07a1a'};
const Lane = <TeaAlley night={false} />;
const Closed = <ShopFront wall="#b8a888" open={false} />;
const Open = <ShopFront name="সাব্বির বার্গার" signBg="#14532d" wall="#b8a888" />;
const Kamrul = <ShopFront name="কামরুল ফুডস" signBg="#7a1f3a" wall="#c7a678" />;
const shutter = (w = 760, y = 560) => popIn(<Shutter w={w} />, (1080 - w) / 2, y);

// শাটার উঠে যায়, পেছনে দোকান
const Rising: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const up = interpolate(f, [Math.round(dur * 0.35), Math.round(dur * 0.8)], [0, 760], clampOpts);
  const P = R({place: soft(Open), title: '২১ তারিখ, সকাল ১০টা', color: GOLD});
  return (
    <AbsoluteFill>
      <P dur={dur} id="rise" />
      <div style={{position: 'absolute', left: 160, top: 700 - up, width: 760, height: 720, background: 'repeating-linear-gradient(180deg, #7a828c 0 46px, #4a4e58 46px 52px)', border: '6px solid #1b1b1f'}} />
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Lane, 4), over: shutter(), title: '৩ সপ্তাহ বন্ধ শাটার', color: GOLD}),
  h2: R({place: soft(Open), actors: crowd([110, 300, 490, 680, 870, 1020], {h: 760, y: 1900, e: 'smile'}), title: 'লাইন মোড় পর্যন্ত', color: GREEN}),
  s01: R({place: soft(Lane), title: 'মিরপুরের এক গলি', color: GOLD}),
  s02: R({place: soft(Kamrul), actors: [{look: KAMRUL, x: 540, h: 1000, y: 1880, expression: 'laugh', gesture: 'open'}], over: popIn(<Banner text="গ্র্যান্ড ওপেনিং" sub="৩০% ছাড়" w={820} />, 130, 460)}),
  s03: R({place: soft(Lane, 3), actors: crowd([200, 540, 880], {h: 900, y: 1880, e: 'neutral'}), title: 'কেউ ফিরেও তাকায় না', color: RED}),
  s04: R({place: soft(Lane, 4), over: shutter(), actors: [{look: SABBIR, x: 860, h: 900, y: 1900, expression: 'smile', gesture: 'idle', lookX: -1}]}),
  s05: Pair(soft(Closed, 5), {look: CAST.customer, e: 'thinking', g: 'pointR', talk: true}, {look: CAST.customer2, e: 'surprised'}),
  s06: R({place: soft(<Home dim />, 6, 'night'), over: () => <>{[['রিনা', 'ব্যাংক নাকি?', 420], ['তুহিন', 'সিনেমা হল!', 690], ['জনি', 'কেউ জানো?', 960]].map(([n, t, y], i) => <Bounce key={i} x={i % 2 ? 260 : 120} y={y as number} at={2 + i * 6} seed={String(n)}><CommentCard name={String(n)} text={String(t)} w={700} size={52} /></Bounce>)}</>, title: '৩০০ কমেন্ট', color: GOLD}),
  s07: Pair(soft(<ChaiStall />, 4), {look: CAST.customer, e: 'laugh', g: 'pointUp', hold: undefined}, {look: CAST.worker, e: 'laugh', hold: HandCup}, {title: 'বাজি ধরা হয়', color: GOLD}),
  s08: Rising,
  s09: R({place: soft(Open), actors: [{look: SABBIR, x: 540, h: 1000, y: 1720, expression: 'smile', gesture: 'open'}], front: () => <Counter top={1420} />, title: 'একদম সাধারণ বার্গার', color: GOLD}),
  s10: R({place: soft(Open, 2), actors: crowd([90, 250, 410, 570, 730, 890, 1040], {h: 720, y: 1900, e: 'laugh'}), title: 'দুপুরের আগেই শেষ', color: GREEN}),
  s11: Glass('"কাউকে বোলো না" লেখাটাই সবাইকে বলিয়ে দেয়', {place: Lane, size: 84}),
  book: lawBook(6),
  lesson: R({bg: 'plain'}),
  act: Glass('নতুন কিছু শুরু করলে একটা প্রশ্ন ঝুলিয়ে রাখো', {place: Lane, color: '#bff2c8', size: 80}),
  next: Next(7, <Fuchka size={480} />, {title: 'ফুচকা না চিনেও এক্সপার্ট', place: soft(Lane, 14, 'night')}),
  next2: Next(7, <PageCard name="ফাহিমের লিস্ট" followers="২,০০,০০০" w={600} />, {title: 'ফুচকাওয়ালারা টাকা দেয়', place: soft(Lane, 14, 'night')}),
  next3: Next(7, <Fuchka size={480} />, {title: 'অন্যের কাজে নিজের নাম', place: soft(Lane, 14, 'night')}),
  cta: () => (
    <Cta>
      <NextBadge law={7} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="ব্যানারে কেউ আসে না" l2="শুধু একটা কাগজে লাইন!" bottom="'কাউকে বোলো না'" term="48 Laws · Law 6" art={<div style={{position: 'absolute', left: 30, top: 1120}}><Shutter w={560} /></div>} size={84} />
);
export const law06 = story('law06/', raw, SCENES, Thumb, {logo: 'bba2'});
