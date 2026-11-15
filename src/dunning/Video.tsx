import React from 'react';
import {interpolate} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, clampOpts, out} from '../biz/art';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, SP, pick} from '../common/kit';
import {Bars, PROF, Paper, Pop, PsyThumb, S, Stack, Stamp, Word, YOU, Yr, a, Brain, Chip} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const dunningFallback = makeFallback(segs);

const WHEELER: ToonLook = {skin: '#8a5a3c', hair: '#141010', hairStyle: 'short', top: '#b5362e', bottom: '#2a2c30', shoes: '#e8e4dc'};
const COP: ToonLook = {skin: '#d9a07a', hair: '#1c1410', hairStyle: 'short', top: '#1f2f4f', bottom: '#16203a', tie: '#0f1730', mustache: true};
const KRUGER: ToonLook = {skin: '#efc6a6', hair: '#3a2a1e', hairStyle: 'side', top: '#4a6a8a', bottom: '#2a2c30', glasses: true};

const Lemon: React.FC<{size?: number}> = ({size = 240}) => (
  <svg viewBox="0 0 120 90" width={size} height={size * 0.75} style={{overflow: 'visible', filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.5))'}}>
    <path d="M6 45 C14 42 18 12 60 8 C102 12 106 42 114 45 C106 48 102 78 60 82 C18 78 14 48 6 45Z" fill="#f6d832" stroke="#1b1b1f" strokeWidth={4} />
    <path d="M36 28 C46 20 62 18 72 22" fill="none" stroke="#fff6a8" strokeWidth={6} strokeLinecap="round" />
    <circle cx={70} cy={52} r={2.5} fill="#c9a81e" />
    <circle cx={50} cy={60} r={2.5} fill="#c9a81e" />
  </svg>
);

const Cctv: React.FC<{size?: number}> = ({size = 300}) => (
  <svg viewBox="0 0 200 130" width={size} height={size * 0.65} style={{overflow: 'visible'}}>
    <rect x={150} y={0} width={18} height={60} fill="#555a64" stroke="#1b1b1f" strokeWidth={4} />
    <g transform="rotate(14 100 60)">
      <rect x={30} y={36} width={136} height={58} rx={8} fill="#e8e4dc" stroke="#1b1b1f" strokeWidth={5} />
      <rect x={4} y={44} width={30} height={42} rx={6} fill="#22252c" stroke="#1b1b1f" strokeWidth={4} />
      <circle cx={19} cy={65} r={11} fill="#6ab0e0" />
      <circle cx={140} cy={52} r={7} fill={RED} />
    </g>
  </svg>
);

const Bank: React.FC = () => (
  <div style={{position: 'absolute', left: 80, right: 80, top: 480, height: 1000, background: '#c9c1ae', border: '8px solid #1b1b1f'}}>
    <div style={{position: 'absolute', left: -40, right: -40, top: -8, height: 130, background: '#8a8272', border: '8px solid #1b1b1f', textAlign: 'center', fontSize: 86, fontWeight: 900, lineHeight: '120px', color: '#15151b'}}>BANK</div>
    {[60, 300, 540, 780].map((x) => (
      <div key={x} style={{position: 'absolute', left: x, top: 122, width: 56, bottom: 0, background: '#e0d8c4', border: '6px solid #1b1b1f'}} />
    ))}
  </div>
);
const Bag: React.ReactNode = (
  <g transform="translate(-20 -60) scale(1.3)">
    <path d="M-30 40 C-50 0 -20 -24 0 -24 C20 -24 50 0 30 40Z" fill="#a8905a" stroke="#1b1b1f" strokeWidth={4} />
    <text x={0} y={22} textAnchor="middle" fontSize={40} fontWeight={900} fill="#1b1b1f">
      $
    </text>
  </g>
);
const HandLemon: React.ReactNode = (
  <g transform="translate(-40 -60) scale(0.65)">
    <path d="M6 45 C14 42 18 12 60 8 C102 12 106 42 114 45 C106 48 102 78 60 82 C18 78 14 48 6 45Z" fill="#f6d832" stroke="#1b1b1f" strokeWidth={5} />
  </g>
);
const News: React.ReactNode = (
  <g transform="translate(-80 -120)">
    <rect width={160} height={200} fill="#f2efe9" stroke="#1b1b1f" strokeWidth={5} />
    <rect x={16} y={18} width={128} height={30} fill="#1b1b1f" />
    <rect x={16} y={62} width={128} height={12} fill="#9a9a9a" />
    <rect x={16} y={86} width={128} height={12} fill="#9a9a9a" />
    <rect x={16} y={110} width={90} height={12} fill="#9a9a9a" />
  </g>
);

const Tv: React.FC<{top?: number}> = ({top = 330}) => (
  <div style={{position: 'absolute', left: 90, right: 90, top, height: 720, background: '#0e2016', border: '18px solid #2a2c32', borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.6)'}}>
    <div style={{position: 'absolute', right: 30, top: 18, color: RED, fontSize: 52, fontWeight: 900}}>● REC</div>
  </div>
);

const InstantCam: React.FC<{size?: number; rot?: number}> = ({size = 300, rot = 0}) => (
  <svg viewBox="0 0 160 130" width={size} height={size * 0.81} style={{overflow: 'visible', transform: `rotate(${rot}deg)`}}>
    <rect x={8} y={20} width={144} height={100} rx={12} fill="#e8e4dc" stroke="#1b1b1f" strokeWidth={5} />
    <rect x={8} y={20} width={144} height={22} fill="#b5362e" stroke="#1b1b1f" strokeWidth={4} />
    <circle cx={80} cy={80} r={30} fill="#22252c" stroke="#1b1b1f" strokeWidth={5} />
    <circle cx={80} cy={80} r={15} fill="#6ab0e0" />
  </svg>
);
const Photo: React.FC<{size?: number; rot?: number}> = ({size = 340, rot = -6}) => (
  <div style={{width: size, height: size * 1.15, padding: 24, paddingBottom: 80, background: '#f6f2e8', border: '6px solid #1b1b1f', transform: `rotate(${rot}deg)`, boxSizing: 'border-box', boxShadow: '0 24px 50px rgba(0,0,0,0.5)'}}>
    <div style={{width: '100%', height: '100%', background: 'linear-gradient(180deg, #5a6a7a, #c9d6e2)'}} />
  </div>
);

const Yellow = (x: number, y: number, r = 190) => <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: 'radial-gradient(circle, rgba(246,216,50,0.5), rgba(246,216,50,0) 70%)'}} />;

const SCENES: Record<string, React.FC<SP>> = {
  lemonface: S({bg: 'sky', back: () => <Bank />, actors: [a(WHEELER, 540, 'smile', 'hold', {holding: HandLemon})], front: () => Yellow(540, 915), title: 'মুখে লেবুর রস!', at: 0.2, color: '#f6d832'}),
  nocam: S({
    bg: 'sky',
    back: () => <Bank />,
    actors: [a(WHEELER, 380, 'laugh', 'pointUp', {h: 980})],
    front: (f, d) => (
      <>
        <Pop x={620} y={560} at={2}>
          <Cctv size={380} />
        </Pop>
        <Stamp text="আমাকে দেখবে না!" o={out(f, d * 0.5, d * 0.62)} size={84} top={300} />
      </>
    ),
  }),
  yr: Yr('১৯৯৫', 'Pittsburgh, আমেরিকা'),
  rob: S({
    bg: 'sky',
    back: () => <Bank />,
    actors: [a(WHEELER, 540, 'laugh', 'hold', {holding: Bag})],
    title: 'একদিনে দুটো ব্যাংক',
    color: GOLD,
    front: () => (
      <>
        <Pop x={70} y={1040} at={6} rot={-8}>
          <Chip bg={RED} color="#fff" size={84}>
            ১
          </Chip>
        </Pop>
        <Pop x={900} y={1040} at={30} rot={8}>
          <Chip bg={RED} color="#fff" size={84}>
            ২
          </Chip>
        </Pop>
      </>
    ),
  }),
  cctv: S({
    bg: 'dark',
    title: 'মুখ পুরো খোলা!',
    at: 0.3,
    color: RED,
    titleTop: 1110,
    back: () => <Tv />,
    actors: [a(WHEELER, 540, 'laugh', 'wave', {h: 680, y: 1040})],
    front: () => (
      <Pop x={700} y={150} at={2}>
        <Cctv size={280} />
      </Pop>
    ),
  }),
  police: S({
    bg: 'night',
    title: 'সেই রাতেই',
    at: 0.05,
    back: (f) => (
      <>
        <div style={{position: 'absolute', left: 620, top: 620, width: 380, height: 880, background: '#6a4a34', border: '10px solid #1b1b1f'}} />
        <div style={{position: 'absolute', inset: 0, background: Math.floor(f / 8) % 2 ? 'rgba(224,36,60,0.2)' : 'rgba(43,95,217,0.22)'}} />
      </>
    ),
    actors: [a(COP, 260, 'serious', 'pointR', {h: 1000}), a(WHEELER, 800, 'surprised', 'idle', {h: 980, lookX: -1})],
  }),
  footage: S({bg: 'office', title: 'এই যে তুমি!', at: 0.3, back: () => <Tv top={340} />, actors: [a(WHEELER, 520, 'laugh', 'wave', {h: 520, y: 990}), a(WHEELER, 800, 'shocked', 'idle', {h: 800, y: 1660, lookX: -1}), a(COP, 240, 'serious', 'pointUp', {h: 840, y: 1660})]}),
  quote: S({bg: 'office', actors: [a(WHEELER, 540, 'shocked', 'open', {talking: true, h: 1100, y: 1720})], bubble: '"কিন্তু আমি তো রস মেখেছিলাম!"', by: 280, bsize: 66}),
  wheeler: S({bg: 'dark', actors: [a(WHEELER, 540, 'skeptical', 'shrug', {h: 1100, y: 1720})], name: ['McArthur Wheeler', 'ব্যাংক ডাকাত']}),
  ink: S({
    bg: 'plain',
    title: 'লেবুর রস = অদৃশ্য কালি',
    front: (f) => (
      <>
        <Pop x={210} y={480} at={2}>
          <Paper w={660} lines={['গোপন চিঠি...']} rot={-3} size={70} />
        </Pop>
        <div style={{position: 'absolute', left: 300, top: 640, fontSize: 110, fontWeight: 900, color: '#c9a81e', opacity: 0.35 + 0.3 * Math.sin(f / 6)}}>?????</div>
        <Pop x={380} y={1000} at={10}>
          <Lemon size={320} />
        </Pop>
      </>
    ),
  }),
  think: S({
    bg: 'office',
    actors: [a(WHEELER, 720, 'thinking', 'think', {h: 1000})],
    front: () => (
      <Pop x={110} y={880} at={8}>
        <Lemon size={300} />
      </Pop>
    ),
    bubble: '"মুখে মাখলে ক্যামেরায় আসব না!"',
    by: 300,
    bsize: 60,
  }),
  photo: S({
    bg: 'office',
    actors: [a(WHEELER, 280, 'smile', 'idle', {h: 1000})],
    front: (f, d) => (
      <>
        <Pop x={560} y={380} at={2}>
          <InstantCam size={380} rot={-8} />
        </Pop>
        <Pop x={600} y={740} at={d * 0.45}>
          <Photo size={380} />
        </Pop>
        <Stamp text="মুখ নেই!" o={out(f, d * 0.65, d * 0.75)} size={84} top={1240} />
      </>
    ),
  }),
  wrongway: S({
    bg: 'plain',
    title: 'ক্যামেরাই ভুল দিকে!',
    color: RED,
    actors: [a(WHEELER, 300, 'smile', 'idle', {h: 1000})],
    front: (f) => (
      <>
        <div style={{position: 'absolute', left: 660, top: 860, transform: `rotate(${interpolate(f, [0, 30], [0, 62], clampOpts)}deg)`}}>
          <InstantCam size={340} />
        </div>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          <path d="M840 800 L900 460 M900 460 L850 520 M900 460 L950 530" stroke={RED} strokeWidth={18} fill="none" strokeLinecap="round" />
        </svg>
      </>
    ),
  }),
  dunning: S({bg: 'office', actors: [a(PROF, 540, 'surprised', 'hold', {h: 1120, y: 1730, holding: News})], name: ['David Dunning', 'Cornell University · প্রফেসর']}),
  question: S({bg: 'office', actors: [a(PROF, 620, 'thinking', 'think', {h: 1040})], bubble: '"এত কম জেনে এত নিশ্চিত কীভাবে?"', by: 290, bsize: 60}),
  kruger: S({bg: 'office', actors: [a(PROF, 280, 'smile', 'explain', {h: 1000, talking: true}), a(KRUGER, 790, 'smile', 'idle', {h: 960, lookX: -1})], name: ['Justin Kruger', 'তাঁর ছাত্র']}),
  tests: ({dur}) => S({bg: 'plain', title: 'সবকিছুর টেস্ট', front: () => <Stack dur={dur} items={['যুক্তি', 'ব্যাকরণ', 'রসিকতা বোঝা']} top={520} size={90} />})({dur, id: 'tests'}),
  selfscore: S({
    bg: 'office',
    actors: [a(YOU, 730, 'thinking', 'think', {h: 1000})],
    front: () => (
      <Pop x={70} y={760} at={4}>
        <Paper w={430} title="নিজেকে নম্বর" lines={['____ / ১০০']} rot={-5} size={46} />
      </Pop>
    ),
    bubble: '"নিজেকে কত নম্বর দেবে?"',
    by: 290,
  }),
  worst: Bars(
    [
      {label: 'আসল নম্বর', value: 'সবার নিচে', pct: 12, color: RED},
      {label: 'নিজের ধারণা', value: 'গড়ের অনেক ওপরে', pct: 62, color: GOLD},
    ],
    {title: 'সবচেয়ে খারাপ যারা', color: RED},
  ),
  best: Bars(
    [
      {label: 'আসল নম্বর', value: 'সবার ওপরে', pct: 88, color: GREEN},
      {label: 'নিজের ধারণা', value: 'আরও কম', pct: 68, color: GOLD},
    ],
    {title: 'সবচেয়ে ভালো যারা', color: GREEN},
  ),
  know: S({
    bg: 'plain',
    title: 'একই জ্ঞান লাগে',
    front: () => (
      <>
        <Pop x={300} y={560} at={2}>
          <Brain size={480} />
        </Pop>
        <Pop x={70} y={1110} at={10} rot={-4}>
          <Chip size={70}>ভুল ধরতে</Chip>
        </Pop>
        <Pop x={600} y={1110} at={20} rot={4}>
          <Chip size={70}>ঠিক করতে</Chip>
        </Pop>
      </>
    ),
  }),
  dontknow: Word('সে জানে না, যে সে জানে না', {size: 130, color: RED, top: 600}),
  officeguy: S({bg: 'office', actors: [a(YOU, 280, 'laugh', 'pointR', {h: 1000}), a(CAST.worker, 800, 'smile', 'open', {h: 960, talking: true, lookX: -1})], bubble: '"ওই লোকটা!"', bx: 80, by: 320}),
  mirror: S({
    bg: 'dark',
    title: 'শেষ কবে নিজের ভুল ধরেছ?',
    size: 76,
    back: () => <div style={{position: 'absolute', left: 380, top: 480, width: 620, height: 1130, borderRadius: 310, background: 'linear-gradient(135deg, #bfe0ee, #5a7a8a)', border: '18px solid #6a4a34'}} />,
    actors: [a(YOU, 690, 'thinking', 'idle', {h: 900, y: 1560, lookX: -1}), a(YOU, 230, 'worried', 'think', {h: 1080, y: 1720, lookX: 1})],
  }),
  disagree: S({bg: 'office', actors: [a(YOU, 280, 'thinking', 'open', {h: 1000}), a(CAST.exec, 790, 'skeptical', 'explain', {h: 1000, talking: true, lookX: -1})], bubble: '"আমি একমত না, কারণ..."', bx: 240, by: 320}),
  cta: () => (
    <CtaScene>
      <Lemon size={420} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const DunningThumbnail: React.FC = () => (
  <PsyThumb
    l1="মুখে লেবুর রস মেখে"
    l2="ব্যাংক ডাকাতি!"
    bottom="এই লোকটা তুমিও হতে পারো"
    term="Dunning-Kruger Effect"
    glow="rgba(246,216,50,0.3)"
    art={
      <div style={{position: 'absolute', left: 30, top: 760, transform: 'rotate(-10deg)'}}>
        <Lemon size={560} />
      </div>
    }
  />
);
export const DunningVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="dunning/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<DunningThumbnail />} />;
