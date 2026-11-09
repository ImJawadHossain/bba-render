import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, out} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {Actor, CtaScene, SP, pick} from '../common/kit';
import {Bars, Brain, Chip, Num, Pop, PsyThumb, S, SOpts, Stack, Stamp, Word, YOU, Yr, a} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const becauseFallback = makeFallback(segs);

const LANGER: ToonLook = {skin: '#efc6a6', hair: '#2a1a12', hairStyle: 'bob', top: '#f4f2ec', jacket: '#3a5a6a', bottom: '#22252c', skirt: '#22252c', glasses: true};
const HELPER: ToonLook = {skin: '#d9a07a', hair: '#3a2418', hairStyle: 'curly', top: '#d9822b', bottom: '#2a2c30', shoes: '#e8e4dc'};

const LIB = 'linear-gradient(180deg, #4a3a2c 0%, #33261c 64%, #18110c 100%)';

const Copier: React.FC<{w?: number}> = ({w = 420}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 200 180" width={w} height={w * 0.9} style={{overflow: 'visible', filter: 'drop-shadow(0 16px 30px rgba(0,0,0,0.5))'}}>
      <rect x={10} y={46} width={180} height={128} rx={8} fill="#c9ced3" stroke="#1b1b1f" strokeWidth={5} />
      <rect x={4} y={26} width={192} height={26} rx={6} fill="#8e9aa3" stroke="#1b1b1f" strokeWidth={5} />
      <rect x={24} y={66} width={70} height={30} fill="#22252c" />
      <rect x={120} y={64} width={50} height={14} fill={GREEN} />
      <rect x={120} y={84} width={50} height={8} fill="#6a7078" />
      <rect x={24} y={112} width={152} height={50} rx={4} fill="#a8aeb4" stroke="#1b1b1f" strokeWidth={4} />
      <rect x={20 + (f * 5) % 150} y={38} width={8} height={10} fill="#bff0ff" />
    </svg>
  );
};

const Shelves: React.FC = () => (
  <div style={{position: 'absolute', left: 30, right: 30, top: 300, height: 700, opacity: 0.35}}>
    {[0, 1, 2].map((r) => (
      <div key={r} style={{position: 'absolute', left: 0, right: 0, top: r * 230, height: 220, borderBottom: '14px solid #6a4a34', display: 'flex', alignItems: 'flex-end', gap: 8}}>
        {Array.from({length: 22}, (_, i) => <div key={i} style={{width: 34, height: 130 + ((i * 37 + r * 11) % 70), background: ['#7a1f2a', '#2f4a6a', '#5a6a3a', '#8a6a2a'][(i + r) % 4]}} />)}
      </div>
    ))}
  </div>
);

// ফটোকপির লাইন: বামে মেশিন, পেছনে লোক, সামনে যে আগে যেতে চায়
const LINE: Actor[] = [a(CAST.customer2, 640, 'neutral', 'idle', {h: 760, y: 1540, lookX: -1}), a(CAST.worker, 800, 'neutral', 'idle', {h: 780, y: 1560, lookX: -1}), a(CAST.founder, 960, 'neutral', 'idle', {h: 800, y: 1580, lookX: -1})];
const Queue = (o: SOpts & {face?: Actor['expression']; ans?: Actor['expression']}) =>
  S({
    bg: LIB,
    back: (f, d) => (
      <>
        <Shelves />
        <div style={{position: 'absolute', left: 30, top: 1090}}>
          <Copier w={340} />
        </div>
        {o.back?.(f, d)}
      </>
    ),
    actors: [...LINE.map((x) => ({...x, expression: o.ans ?? x.expression})), a(HELPER, 470, o.face ?? 'smile', 'open', {h: 960, y: 1640, talking: true, lookX: 1})],
    by: 300,
    bsize: 58,
    ...o,
  } as SOpts);

const SCENES: Record<string, React.FC<SP>> = {
  hook1: Queue({bubble: '"আমি আগে কপি করি? কারণ আমাকে কপি করতে হবে।"'}),
  hook2: Num(93, {suffix: '%', label: 'লাইন ছেড়ে দিল', color: RED}),
  word: Word('"কারণ"', {size: 260, sub: 'একটা মাত্র শব্দ', top: 540}),
  queue: S({bg: 'office', actors: [a(YOU, 720, 'neutral', 'idle', {h: 1000, lookX: -1}), a(CAST.worker, 280, 'worried', 'open', {h: 1000, talking: true, lookX: 1})], bubble: '"ভাই, একটু আগে যেতে দেবেন? খুব তাড়া আছে।"', by: 300, bsize: 56}),
  gave: S({bg: 'office', title: 'জায়গা ছেড়ে দিলে', actors: [a(YOU, 800, 'smile', 'shrug', {h: 1000, lookX: -1}), a(CAST.worker, 280, 'laugh', 'thumbsUp', {h: 1000})]}),
  whyq: Word('তাড়া কিসের?', {size: 170, sub: 'সবারই তো তাড়া', subColor: GOLD, color: RED, top: 600, subAt: 0.4}),
  yr: Yr('১৯৭৮', 'Harvard University-র লাইব্রেরি', {back: () => <div style={{position: 'absolute', left: 370, top: 1130}}><Copier w={340} /></div>}),
  langer: S({bg: LIB, back: () => <Shelves />, actors: [a(LANGER, 280, 'smile', 'explain', {h: 1020, talking: true}), a(HELPER, 800, 'wink', 'idle', {h: 980, lookX: -1})], name: ['Ellen Langer', 'সাইকোলজিস্ট']}),
  three: S({bg: LIB, title: 'তিনবার, তিনভাবে', front: () => <>{['১', '২', '৩'].map((t, i) => <Pop key={t} x={100 + i * 320} y={720} at={2 + i * 9}><Chip size={200} bg={i === 2 ? RED : '#f6f2e8'} color={i === 2 ? '#fff' : '#15151b'}>{t}</Chip></Pop>)}</>}),
  first: Queue({bubble: '"এক্সকিউজ মি, আমার পাঁচ পাতা। আমি কি আগে করতে পারি?"'}),
  noreason: Word('কোনো কারণ নেই', {color: '#cfd6e0', size: 150}),
  r60: Num(60, {suffix: '%', label: 'রাজি হলো', color: GOLD}),
  second: Queue({bubble: '"আমি কি আগে করতে পারি, কারণ আমার খুব তাড়া?"'}),
  real: Word('একটা আসল কারণ', {color: GREEN, size: 150}),
  r94: Num(94, {suffix: '%', label: 'রাজি হলো', color: GREEN}),
  ok: Queue({title: 'এতটুকু ঠিকই আছে', color: GREEN, ans: 'smile', at: 0.1}),
  third: Word('তৃতীয়বার', {color: RED, size: 190, sub: 'সেই অর্থহীন বাক্যটা', top: 600}),
  q3: Queue({bubble: '"আমি কি আগে করতে পারি, কারণ আমাকে কপি করতে হবে?"', face: 'wink'}),
  think: Queue({title: 'সবাই তো কপি করতেই দাঁড়িয়েছে!', size: 74, ans: 'skeptical', at: 0.25}),
  nonsense: Queue({front: (f, d) => <Stamp text="এটা কোনো কারণই না" o={out(f, 2, 10)} size={84} top={460} />}),
  r93: Num(93, {suffix: '%', label: 'তবু রাজি হলো', color: RED}),
  same: Bars([{label: 'আসল কারণ', value: '৯৪%', pct: 94, color: GREEN}, {label: 'অর্থহীন কারণ', value: '৯৩%', pct: 93, color: RED}, {label: 'কোনো কারণ নেই', value: '৬০%', pct: 60, color: GOLD}], {title: 'প্রায় সমান!', color: RED, top: 400, gap: 320}),
  auto: S({bg: 'plain', title: 'মাথা চলে অটোপাইলটে', front: () => <><Pop x={250} y={540} at={2}><Brain size={580} /></Pop><Pop x={380} y={1090} at={10}><Chip size={84} bg={GOLD}>AUTO</Chip></Pop></>}),
  switch: S({bg: 'plain', title: '"কারণ" শুনলেই সুইচ পড়ে', front: (f, d) => { const on = f > d * 0.35; return <div style={{position: 'absolute', left: 300, top: 620, width: 480, height: 230, borderRadius: 120, background: on ? GREEN : '#3a3e48', border: '12px solid #1b1b1f', boxShadow: on ? `0 0 70px ${GREEN}` : undefined}}><div style={{position: 'absolute', left: on ? 260 : 10, top: 10, width: 186, height: 186, borderRadius: '50%', background: '#f2efe9', border: '8px solid #1b1b1f', boxSizing: 'border-box'}} /><div style={{position: 'absolute', left: -90, right: -90, top: 300, textAlign: 'center', fontSize: 80, fontWeight: 800, color: GREEN, opacity: on ? 1 : 0}}>ওহ, কারণ আছে। ঠিক আছে।</div></div>; }}),
  nocheck: S({bg: 'plain', title: 'যাচাই করার ঝামেলা নেয় না', size: 76, front: (f) => <><Pop x={250} y={560} at={2}><Brain size={580} color="#b98a9a" /></Pop>{[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 720 + i * 60, top: 560 - i * 70 + Math.sin((f + i * 10) / 10) * 10, fontSize: 80 + i * 26, fontWeight: 900, color: '#cfd6e0'}}>z</div>)}</>}),
  big: S({bg: LIB, back: () => <Shelves />, title: 'বিশ পাতা হলে?', color: RED, actors: [a(HELPER, 300, 'worried', 'open', {h: 1000, talking: true})], front: (f, d) => <>{Array.from({length: 20}, (_, i) => <div key={i} style={{position: 'absolute', left: 620, top: 1400 - i * 30, width: 330, height: 40, background: '#f6f2e8', border: '4px solid #1b1b1f', opacity: out(f, i, i + 2)}} />)}<Stamp text="জাদু শেষ" o={out(f, d * 0.6, d * 0.72)} size={100} top={420} /></>}),
  wake: S({bg: 'radial-gradient(ellipse at 50% 45%, #5a5020, #0a0a08 70%)', title: 'মাথা জেগে ওঠে', color: '#ffe680', front: (f) => <div style={{position: 'absolute', left: 250, top: 560, filter: `drop-shadow(0 0 ${50 + Math.sin(f / 4) * 20}px #ffe680)`}}><Brain size={580} /></div>}),
  use: ({dur}) => S({bg: 'plain', title: '"কারণ" শব্দটা ব্যবহার করো', size: 76, front: () => <Stack dur={dur} items={['ছুটি চাইলে', 'ছাড় চাইলে', 'অফারে লিখলে']} top={520} size={84} />})({dur, id: 'use'}),
  pause: S({bg: 'office', actors: [a(YOU, 540, 'thinking', 'think', {h: 1060, y: 1710})], bubble: '"কারণটা আসলে কী বলল?"', by: 300, bsize: 70}),
  cta: () => (
    <CtaScene>
      <Copier w={460} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const BecauseThumbnail: React.FC = () => (
  <PsyThumb
    l1="অর্থহীন একটা বাক্য"
    l2="৯৩% রাজি হয়ে গেল!"
    bottom="রহস্যটা একটা মাত্র শব্দে"
    term={'"কারণ" · Ellen Langer'}
    art={<div style={{position: 'absolute', left: 30, top: 860}}><Copier w={540} /></div>}
    size={92}
  />
);
export const BecauseVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="because/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<BecauseThumbnail />} />;
