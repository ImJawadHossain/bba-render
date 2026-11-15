import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {ToonLook} from '../common/Toon';
import {SP} from '../common/kit';
import {HandPhone, Paper, PsyThumb, a} from '../common/psy';
import {Counter, Home, PriceTag} from '../common/places';
import {Aisle, Basket, MilkCarton, ShopFront} from '../common/places2';
import {BookScene, Bounce, Card, Count, Cta, Hit, Pair, R, Solo, WOMAN, Y1, story} from '../common/reel';
import raw from './segments.json';

const RAFIQ: ToonLook = {...Y1, top: '#3f7a5a', mustache: true};
const WIFE: ToonLook = WOMAN;
const Shop = <ShopFront name="সুপারশপ" signBg="#14305f" signColor="#ffe9a8" night />;
const Chips = <Aisle label="চিপস" seed={1} />;
const Noodle = <Aisle label="নুডলস" seed={3} />;
const Soap = <Aisle label="ঘরের জিনিস" seed={5} />;
const Night = <Home dim />;
const bag = (x: number) => <div style={{position: 'absolute', left: x, top: 1240, width: 200, height: 240, background: '#e8e2d4', border: '6px solid #1b1b1f', borderRadius: '10px 10px 24px 24px'}} />;

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: Shop, actors: [a(RAFIQ, 540, 'smile', 'idle', {h: 1160, y: 1830})], over: () => <Bounce x={720} y={1060} at={3}><MilkCarton size={300} /></Bounce>, title: 'শুধু এক লিটার দুধ', color: GOLD}),
  h2: Count(1800, {pre: '৳ ', size: 210, label: 'বের হলো', color: RED, place: Night}),
  h3: Hit('দুধটাই কিনল না!', {size: 136, top: 600, color: RED, place: Night}),
  night: Solo(Shop, {look: RAFIQ, e: 'neutral', hold: HandPhone, talk: false}),
  wife: Solo(Night, {look: WIFE, e: 'serious', hold: HandPhone, talk: true}),
  nobasket: Solo(Shop, {look: RAFIQ, e: 'smile', g: 'open'}, {over: () => <Bounce x={110} y={1100} at={3}><Basket size={320} /></Bounce>, title: 'ঝুড়ি লাগে নাকি?', color: GOLD}),
  corner: R({place: <Aisle />, over: () => <Bounce x={400} y={850} at={2}><MilkCarton size={440} /></Bounce>, title: 'দুধ একদম শেষ কোণে', color: RED}),
  walk: Solo(Soap, {look: RAFIQ, e: 'neutral'}, {x: 300, title: 'পুরো দোকান হাঁটা', color: GOLD}),
  chips: Solo(Chips, {look: RAFIQ, e: 'smile', g: 'open'}, {x: 300, over: () => <Bounce x={520} y={1130} at={3}><PriceTag text="১টায় ১টা ফ্রি" size={76} color={GOLD} /></Bounce>}),
  noodles: Solo(Noodle, {look: RAFIQ, e: 'worried', g: 'open'}, {title: 'হাতে আর জায়গা নেই', color: RED}),
  basket: R({place: Noodle, over: () => <Bounce x={300} y={880} at={2}><Basket n={2} size={520} /></Bounce>}),
  buys: Solo(Soap, {look: RAFIQ, e: 'smile'}, {over: () => <Bounce x={640} y={1090} at={2}><Basket n={4} size={380} /></Bounce>}),
  items: R({place: Soap, over: () => <><Bounce x={80} y={700} at={2}><PriceTag text="বিস্কুট" size={92} /></Bounce><Bounce x={490} y={860} at={8} seed="m"><PriceTag text="মোমবাতি" size={92} rot={4} /></Bounce><Bounce x={120} y={1060} at={14} seed="s"><PriceTag text="শ্যাম্পু" size={92} rot={-3} /></Bounce></>}),
  heavy: Solo(Soap, {look: RAFIQ, e: 'worried'}, {x: 340, over: () => <Bounce x={560} y={930} at={2}><Basket n={9} size={460} /></Bounce>, title: 'হাত ব্যথা করছে', color: RED}),
  line: R({place: <Aisle label="কাউন্টার" seed={2} />, actors: [a(RAFIQ, 540, 'neutral', 'idle', {h: 1040})], front: () => <Counter top={1480} glass />}),
  choco: R({place: <Aisle label="কাউন্টার" seed={2} />, over: () => <><Bounce x={100} y={820} at={2}><PriceTag text="চকলেট" size={100} color="#8a4a2e" /></Bounce><Bounce x={540} y={1000} at={10} seed="b"><PriceTag text="ব্যাটারি" size={100} /></Bounce></>, title: 'ওগুলোও উঠল', color: GOLD}),
  bill: R({place: <Aisle label="কাউন্টার" seed={2} />, over: () => <Bounce x={280} y={680} at={2}><Paper w={520} title="বিল" lines={['৳ ১,৮০০']} size={92} /></Bounce>}),
  home: Solo(Night, {look: RAFIQ, e: 'smile'}, {over: () => <>{bag(120)}{bag(760)}</>}),
  open: Pair(Night, {look: RAFIQ, e: 'smile'}, {look: WIFE, e: 'neutral'}, {over: () => <Bounce x={400} y={1190} at={3}><Basket n={9} size={320} /></Bounce>}),
  look: Solo(Night, {look: WIFE, e: 'skeptical'}, {near: true}),
  where: Pair(Night, {look: RAFIQ, e: 'shocked'}, {look: WIFE, e: 'serious', g: 'open', talk: true}),
  book: BookScene('Why We Buy', 'Paco Underhill'),
  t1: R({place: Shop, over: () => <Bounce x={280} y={640} at={2}><Paper w={540} title="লিস্ট" lines={['১. দুধ']} size={70} /></Bounce>, title: 'আগে লিস্ট', color: GREEN}),
  t2: Card('অল্প কিনতে গেলে ঝুড়ি নিও না', {size: 90, color: RED, place: Soap}),
  t3: Card('যা রোজ কেনে, সেটা একদম ভেতরে', {size: 88, color: GREEN, place: Soap}),
  cta: () => (
    <Cta>
      <MilkCarton size={380} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="দুধ কিনতে ঢুকল" l2="১,৮০০ টাকা শেষ!" bottom="আর দুধটাই কিনল না" term="Why We Buy" art={<div style={{position: 'absolute', left: 80, top: 950}}><MilkCarton size={480} /></div>} />
);
export const milk = story('milk/', raw, SCENES, Thumb);
