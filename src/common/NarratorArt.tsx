// ন্যারেটরের নিজস্ব আঁকা (Jawad-এর রেফারেন্স শিট অনুযায়ী): কোমর থেকে ওপরে, কালো আউটলাইন,
// ঢেউ খেলানো পাকা চুল, সাদা ছাঁটা দাড়ি, কালো চৌকো চশমা, ঘিয়ে শার্ট (হাতা গোটানো), নেভি কোটি, বুকে মাইক।
// হাতের ভঙ্গি "লক্ষ্য বিন্দু" দিয়ে (দুই হাড়ের IK), তাই যেকোনো নতুন ভঙ্গি সহজে যোগ করা যায়।
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Expression} from './Toon';

export type NPose =
  | 'idle'
  | 'explain'
  | 'pointUp'
  | 'palms'
  | 'think'
  | 'crossArms'
  | 'book'
  | 'laptop'
  | 'mug'
  | 'present'
  | 'idea'
  | 'pointL'
  | 'pointR'
  | 'thumbsUp'
  | 'wave';

const INK = '#1b1b1f';
const SKIN = '#f3b98c';
const SKIN_D = '#de9c70';
const HAIR = '#a9a9ab';
const HAIR_L = '#d8d8da';
const HAIR_D = '#7f7f84';
const BEARD = '#f6f4f0';
const BROW = '#77716b';
const SHIRT = '#f7e7c6';
const SHIRT_D = '#e6d1a8';
const VEST = '#1f2944';
const VEST_D = '#151d33';
export const NARRATOR_BG = '#cfdcec';

const SW = 6; // আউটলাইনের পুরুত্ব
const line = {stroke: INK, strokeWidth: SW, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

type Hand = 'open' | 'point' | 'fist' | 'thumb' | 'hold';
type ArmT = {x: number; y: number; hand: Hand; turn?: number; down?: boolean; elbow?: {x: number; y: number}}; // down = কনুই নিচের দিকে; elbow = কনুই কোন দিকে

const SL = {x: 214, y: 592};
const SR = {x: 586, y: 592};
const UA = 196;
const FA = 190;

// প্রতিটা ভঙ্গিতে দুই হাতের লক্ষ্য বিন্দু (৮০০×১০০০ ভিউবক্স), t = ফ্রেম
const POSES: Record<NPose, (t: number) => {L: ArmT; R: ArmT; front?: 'L' | 'R'}> = {
  idle: () => ({L: {x: 205, y: 1010, hand: 'fist'}, R: {x: 595, y: 1010, hand: 'fist'}}),
  explain: (t) => ({L: {x: 290 + 6 * Math.sin(t / 6), y: 600 + 10 * Math.sin(t / 5), hand: 'open', turn: -14, elbow: {x: 170, y: 800}}, R: {x: 560, y: 980, hand: 'fist'}}),
  pointUp: (t) => ({L: {x: 200, y: 380 + 6 * Math.sin(t / 5), hand: 'point', elbow: {x: 150, y: 780}}, R: {x: 595, y: 1010, hand: 'fist'}}),
  palms: (t) => ({L: {x: 95, y: 720 + 6 * Math.sin(t / 6), hand: 'open', turn: 30}, R: {x: 705, y: 720 + 6 * Math.sin(t / 6 + 1), hand: 'open', turn: -30}}),
  think: () => ({L: {x: 380, y: 520, hand: 'fist', turn: 170, elbow: {x: 300, y: 800}}, R: {x: 300, y: 860, hand: 'fist', turn: 70}, front: 'L'}),
  crossArms: () => ({L: {x: 540, y: 790, hand: 'fist', turn: 60}, R: {x: 262, y: 812, hand: 'fist', turn: -60}, front: 'R'}),
  book: () => ({L: {x: 300, y: 820, hand: 'hold'}, R: {x: 500, y: 820, hand: 'hold'}}),
  laptop: (t) => ({L: {x: 330, y: 930 + 4 * Math.sin(t / 2), hand: 'fist'}, R: {x: 470, y: 930 + 4 * Math.sin(t / 2 + 2), hand: 'fist'}}),
  mug: () => ({L: {x: 330, y: 760, hand: 'hold'}, R: {x: 595, y: 1010, hand: 'fist'}}),
  present: (t) => ({L: {x: 205, y: 1010, hand: 'fist'}, R: {x: 700, y: 700 + 6 * Math.sin(t / 6), hand: 'open', turn: -40}}),
  idea: (t) => ({L: {x: 205, y: 1010, hand: 'fist'}, R: {x: 600, y: 380 + 5 * Math.sin(t / 5), hand: 'point', elbow: {x: 650, y: 780}}}),
  pointL: (t) => ({L: {x: -20, y: 640 + 4 * Math.sin(t / 6), hand: 'point'}, R: {x: 595, y: 1010, hand: 'fist'}}),
  pointR: (t) => ({L: {x: 205, y: 1010, hand: 'fist'}, R: {x: 820, y: 640 + 4 * Math.sin(t / 6), hand: 'point'}}),
  thumbsUp: (t) => ({L: {x: 300, y: 600 + 4 * Math.sin(t / 4), hand: 'thumb', elbow: {x: 190, y: 800}}, R: {x: 595, y: 1010, hand: 'fist'}}),
  wave: (t) => ({L: {x: 205, y: 1010, hand: 'fist'}, R: {x: 690 + 30 * Math.sin(t / 3), y: 370, hand: 'open'}}),
};

// দুই হাড়ের IK: কাঁধ থেকে লক্ষ্যে, কনুই বাইরের দিকে
const ik = (S: {x: number; y: number}, T: {x: number; y: number}, out: 1 | -1, down?: boolean) => {
  const dx = T.x - S.x;
  const dy = T.y - S.y;
  const d = Math.max(Math.abs(UA - FA) + 1, Math.min(UA + FA - 1, Math.hypot(dx, dy)));
  const th = Math.atan2(dy, dx);
  const al = Math.acos((UA * UA + d * d - FA * FA) / (2 * UA * d));
  const c1 = th + al;
  const c2 = th - al;
  const e1 = {x: S.x + UA * Math.cos(c1), y: S.y + UA * Math.sin(c1)};
  const e2 = {x: S.x + UA * Math.cos(c2), y: S.y + UA * Math.sin(c2)};
  const E = down ? (e1.y > e2.y ? e1 : e2) : (out < 0 ? e1.x < e2.x : e1.x > e2.x) ? e1 : e2;
  const H = {x: E.x + FA * Math.cos(Math.atan2(T.y - E.y, T.x - E.x)), y: E.y + FA * Math.sin(Math.atan2(T.y - E.y, T.x - E.x))};
  return {E, H};
};
const deg = (a: {x: number; y: number}, b: {x: number; y: number}) => (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI - 90;

const HandShape: React.FC<{type: Hand; mirror: boolean}> = ({type, mirror}) => {
  const m = mirror ? -1 : 1;
  if (type === 'open')
    return (
      <g transform={`scale(${m} 1)`}>
        <path d="M-30 -6 C-34 20 -30 44 -24 62 L-22 92 C-21 100 -11 100 -10 92 L-9 66 L-6 104 C-5 112 6 112 7 104 L8 66 L12 98 C13 106 24 105 24 97 L22 62 L30 84 C33 91 43 88 41 80 L33 40 C32 14 28 -2 24 -8Z" fill={SKIN} {...line} />
        <path d="M-30 6 C-48 14 -58 28 -54 36 C-50 42 -40 36 -28 28" fill={SKIN} {...line} />
      </g>
    );
  if (type === 'point')
    return (
      <g transform={`scale(${m} 1)`}>
        {/* মুঠি: হাতের তালু দর্শকের দিকে */}
        <path d="M-30 -8 L30 -8 C38 12 38 40 30 52 L-30 52 C-38 40 -38 12 -30 -8Z" fill={SKIN} {...line} />
        {/* তর্জনী: একদম কিনারা থেকে সোজা */}
        <path d="M-30 44 L-30 108 C-30 120 -12 120 -12 108 L-12 46" fill={SKIN} {...line} />
        {/* বাকি তিন আঙুল ভাঁজ করা: গাঁটগুলো দেখা যায় */}
        <path d="M-12 50 C-12 70 6 70 6 50 C6 66 22 66 22 50 C22 62 34 62 34 46" fill={SKIN} {...line} strokeWidth={5} />
        {/* বুড়ো আঙুল ভাঁজ করা আঙুল চেপে ধরে আছে */}
        <path d="M32 6 C50 14 48 34 30 38 L-6 44 C-12 44 -12 36 -6 34 L22 28" fill={SKIN} {...line} strokeWidth={5} />
      </g>
    );
  if (type === 'thumb')
    return (
      <g transform={`scale(${m} 1)`}>
        <path d="M-30 -6 L30 -6 C36 14 36 40 26 52 L-26 52 C-36 40 -36 14 -30 -6Z" fill={SKIN} {...line} />
        <path d="M-6 48 L-8 96 C-8 108 10 108 10 96 L10 48" fill={SKIN} {...line} />
        {[8, 22, 36].map((y) => (
          <path key={y} d={`M26 ${y} L34 ${y + 4}`} {...line} />
        ))}
      </g>
    );
  // fist / hold
  return (
    <g transform={`scale(${m} 1)`}>
      <path d="M-30 -6 L30 -6 C38 14 38 42 26 56 L-26 56 C-38 42 -38 14 -30 -6Z" fill={SKIN} {...line} />
      {type === 'hold' ? null : [12, 28, 44].map((y) => <path key={y} d={`M-26 ${y} L-10 ${y}`} stroke={SKIN_D} strokeWidth={4} strokeLinecap="round" />)}
    </g>
  );
};

const ArmDraw: React.FC<{S: {x: number; y: number}; T: ArmT; side: 'L' | 'R'}> = ({S, T, side}) => {
  const unit = (a: {x: number; y: number}, b: {x: number; y: number}) => {
    const l = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    return {x: (b.x - a.x) / l, y: (b.y - a.y) / l};
  };
  let E: {x: number; y: number};
  let H: {x: number; y: number};
  if (T.elbow) {
    const u = unit(S, T.elbow);
    E = {x: S.x + UA * u.x, y: S.y + UA * u.y};
    const v = unit(E, T);
    H = {x: E.x + FA * v.x, y: E.y + FA * v.y};
  } else {
    ({E, H} = ik(S, T, side === 'L' ? -1 : 1, T.down));
  }
  const aU = deg(S, E);
  const aF = deg(E, H);
  return (
    <g>
      {/* ওপরের হাত: ঘিয়ে হাতা */}
      <g transform={`translate(${S.x} ${S.y}) rotate(${aU})`}>
        <rect x={-50} y={-34} width={100} height={UA + 44} rx={50} fill={SHIRT} {...line} />
        <path d={`M-30 ${UA * 0.5} C-10 ${UA * 0.56} 10 ${UA * 0.56} 30 ${UA * 0.5}`} stroke={SHIRT_D} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
      {/* কনুই থেকে কব্জি: খালি হাত, গোটানো হাতা */}
      <g transform={`translate(${E.x} ${E.y}) rotate(${aF})`}>
        <rect x={-38} y={-6} width={76} height={FA + 4} rx={36} fill={SKIN} {...line} />
        <rect x={-52} y={-26} width={104} height={50} rx={24} fill={SHIRT} {...line} />
        <path d="M-46 0 L46 0" stroke={SHIRT_D} strokeWidth={5} />
        <g transform={`translate(0 ${FA - 6}) rotate(${T.turn ?? 0})`}>
          <g transform="scale(1.25)">
            <HandShape type={T.hand} mirror={side === 'R'} />
          </g>
          {/* কব্জির জোড় ঢাকতে */}
          <rect x={-30} y={-22} width={60} height={24} fill={SKIN} />
        </g>
      </g>
    </g>
  );
};

// ---------- মুখ ----------

const BROWS: Record<Expression, [string, string]> = {
  neutral: ['M320 222 Q352 208 384 218', 'M416 218 Q448 208 480 222'],
  blank: ['M320 222 Q352 208 384 218', 'M416 218 Q448 208 480 222'],
  smile: ['M320 216 Q352 198 384 210', 'M416 210 Q448 198 480 216'],
  laugh: ['M320 210 Q352 192 384 204', 'M416 204 Q448 192 480 210'],
  surprised: ['M320 198 Q352 176 384 192', 'M416 192 Q448 176 480 198'],
  shocked: ['M320 190 Q352 166 384 184', 'M416 184 Q448 166 480 190'],
  serious: ['M320 212 L384 228', 'M416 228 L480 212'],
  worried: ['M320 228 L384 208', 'M416 208 L480 228'],
  sad: ['M320 232 L384 212', 'M416 212 L480 232'],
  thinking: ['M320 206 Q352 190 384 202', 'M416 224 L480 220'],
  skeptical: ['M320 224 L384 224', 'M416 204 Q448 184 480 204'],
  wink: ['M320 214 Q352 198 384 210', 'M416 226 Q448 220 480 226'],
};

const Face: React.FC<{expression: Expression; talk: number; blink: number; lookX: number; lookY: number}> = ({expression, talk, blink, lookX, lookY}) => {
  const shocked = expression === 'shocked' || expression === 'surprised';
  const eye = (cx: number, right: boolean) => {
    const closed = expression === 'laugh' || (expression === 'wink' && right) || blink > 0.8;
    if (closed) return <path d={`M${cx - 20} 268 Q${cx} ${expression === 'laugh' || expression === 'wink' ? 252 : 268} ${cx + 20} 268`} {...line} fill="none" />;
    const r = shocked ? 15 : 15;
    return (
      <g>
        <ellipse cx={cx} cy={266} rx={shocked ? 21 : 19} ry={(shocked ? 23 : 19) * (1 - blink * 0.8)} fill="#fff" stroke={INK} strokeWidth={4} />
        <circle cx={cx + lookX * 5} cy={268 + lookY * 4} r={r * (shocked ? 0.6 : 0.78)} fill="#3a2416" />
        <circle cx={cx + lookX * 5 + 4} cy={262 + lookY * 4} r={3.5} fill="#fff" />
      </g>
    );
  };
  const mouth = () => {
    const D = '#6a1f22';
    if (talk > 0) {
      const o = 6 + talk * 20;
      return (
        <g>
          <path d={`M368 360 Q400 ${360 + o * 2} 432 360 Q400 ${362 + o * 0.3} 368 360Z`} fill={D} {...line} strokeWidth={5} />
          {o > 12 ? <path d="M374 362 Q400 368 426 362 L424 370 Q400 374 376 370Z" fill="#fff" /> : null}
          {o > 16 ? <ellipse cx={400} cy={360 + o * 1.2} rx={14} ry={5} fill="#d0605a" /> : null}
        </g>
      );
    }
    switch (expression) {
      case 'laugh':
        return (
          <g>
            <path d="M360 356 Q400 420 440 356Z" fill={D} {...line} strokeWidth={5} />
            <path d="M366 358 L434 358 L430 370 L370 370Z" fill="#fff" />
            <ellipse cx={400} cy={392} rx={16} ry={7} fill="#d0605a" />
          </g>
        );
      case 'smile':
      case 'wink':
        return (
          <g>
            <path d="M366 356 Q400 398 434 356 Q400 364 366 356Z" fill={D} {...line} strokeWidth={5} />
            <path d="M372 358 Q400 364 428 358 L426 366 Q400 370 374 366Z" fill="#fff" />
          </g>
        );
      case 'surprised':
        return <ellipse cx={400} cy={372} rx={16} ry={20} fill={D} {...line} strokeWidth={5} />;
      case 'shocked':
        return <ellipse cx={400} cy={378} rx={22} ry={30} fill={D} {...line} strokeWidth={5} />;
      case 'serious':
        return <path d="M372 366 L428 366" {...line} strokeWidth={6} />;
      case 'worried':
      case 'sad':
        return <path d="M372 374 Q400 354 428 374" {...line} fill="none" />;
      case 'thinking':
        return <path d="M378 368 Q400 362 424 360" {...line} fill="none" />;
      case 'skeptical':
        return <path d="M372 370 Q404 374 428 356" {...line} fill="none" />;
      default:
        return <path d="M372 362 Q400 378 428 362" {...line} fill="none" />;
    }
  };
  return (
    <g transform="translate(400 0) scale(1.1 1) translate(-400 0)">
      {/* কান */}
      <path d="M292 258 C268 246 264 300 294 314" fill={SKIN} {...line} />
      <path d="M508 258 C532 246 536 300 506 314" fill={SKIN} {...line} />
      {/* মুখ */}
      <path d="M290 236 C290 160 336 126 400 126 C464 126 510 160 510 236 C510 300 488 350 454 382 C434 400 418 406 400 406 C382 406 366 400 346 382 C312 350 290 300 290 236Z" fill={SKIN} {...line} />
      <ellipse cx={326} cy={312} rx={24} ry={13} fill="#ea7d6e" opacity={0.3} />
      <ellipse cx={474} cy={312} rx={24} ry={13} fill="#ea7d6e" opacity={0.3} />
      {/* বয়সের ভাঁজ */}
      <g stroke={SKIN_D} strokeWidth={4} fill="none" strokeLinecap="round">
        <path d="M352 172 Q400 162 448 172" />
        <path d="M362 186 Q400 178 438 186" />
      </g>
      {/* দাড়ি (মুখের জায়গা ফাঁকা) */}
      <path d="M294 284 C298 362 342 428 400 432 C458 428 502 362 506 284 C498 320 478 342 458 348 C450 382 426 394 400 394 C374 394 350 382 342 348 C322 342 302 320 294 284Z" fill={BEARD} {...line} />
      <path d="M328 374 Q338 390 354 398 M472 374 Q462 390 446 398 M382 414 Q400 420 418 414" stroke="#cfcac2" strokeWidth={4} fill="none" strokeLinecap="round" />
      {mouth()}
      {/* গোঁফ */}
      <path d="M352 346 C368 326 392 330 400 340 C408 330 432 326 448 346 C430 354 414 352 400 348 C386 352 370 354 352 346Z" fill={BEARD} {...line} strokeWidth={5} />
      {/* নাক */}
      <path d="M402 270 Q392 304 384 318 Q398 330 416 318" fill="none" {...line} strokeWidth={5} />
      {eye(352, false)}
      {eye(448, true)}
      <g transform="translate(0 -8)">
        <path d={BROWS[expression][0]} stroke={BROW} strokeWidth={11} fill="none" strokeLinecap="round" />
        <path d={BROWS[expression][1]} stroke={BROW} strokeWidth={11} fill="none" strokeLinecap="round" />
      </g>
      {/* কালো চৌকো চশমা */}
      <g fill="rgba(200,225,255,0.10)" stroke={INK} strokeWidth={9} strokeLinejoin="round">
        <rect x={308} y={236} width={86} height={62} rx={14} />
        <rect x={406} y={236} width={86} height={62} rx={14} />
        <path d="M394 258 Q400 252 406 258" fill="none" />
        <path d="M308 254 L298 250 M492 254 L502 250" fill="none" />
      </g>
      {/* ঢেউ খেলানো পাকা চুল: ওপরে ফোলা, পেছনে আঁচড়ানো, কানের ওপর ঢেউ */}
      <path d="M292 276 C262 246 262 200 284 174 C276 132 300 100 340 94 C360 66 400 56 432 66 C470 58 506 80 512 112 C540 124 552 160 540 186 C552 218 540 250 514 270 C516 236 510 212 498 198 C484 214 460 216 444 206 C432 222 408 226 390 214 C374 228 350 226 338 212 C324 226 310 236 304 248 C298 258 294 266 292 276Z" fill={HAIR} {...line} />
      <path d="M262 214 C250 236 258 262 278 276 C276 256 282 238 292 226Z" fill={HAIR} {...line} strokeWidth={5} />
      <path d="M538 210 C552 232 546 260 526 274 C526 254 520 236 510 226Z" fill={HAIR} {...line} strokeWidth={5} />
      <g stroke={HAIR_L} strokeWidth={9} fill="none" strokeLinecap="round">
        <path d="M306 176 C322 136 362 116 404 116" />
        <path d="M372 152 C404 124 448 118 488 136" />
        <path d="M424 92 C454 84 486 94 500 116" />
        <path d="M330 106 C346 92 366 86 386 88" />
      </g>
      <g stroke={HAIR_D} strokeWidth={6} fill="none" strokeLinecap="round">
        <path d="M296 206 C288 222 290 244 298 258" />
        <path d="M504 202 C512 218 512 240 504 254" />
        <path d="M352 82 C346 96 348 110 356 118" />
        <path d="M450 66 C462 76 468 90 466 102" />
      </g>
    </g>
  );
};

export const NarratorArt: React.FC<{
  height?: number;
  expression?: Expression;
  pose?: NPose;
  talking?: boolean;
  lookX?: number;
  lookY?: number;
  level?: number | null; // ভয়েসের জোর ০..১ (দিলে ঠোঁট ভয়েসের সঙ্গে মেলে)
  style?: React.CSSProperties;
}> = ({height = 1000, expression = 'smile', pose = 'explain', talking = true, lookX = 0, lookY = 0, level, style}) => {
  const f = useCurrentFrame();
  const bt = (f + 17) % 100;
  const blink = bt < 3 ? 1 - Math.abs(bt - 1.5) / 1.5 : 0;
  const synced = level !== undefined && level !== null;
  const talk = !talking ? 0 : synced ? (level! > 0.08 ? 0.15 + 0.85 * level! : 0) : Math.max(0, 0.5 + 0.5 * Math.sin(f * 1.05) * Math.sin(f * 0.37 + 2));
  const nod = talk > 0 ? Math.sin(f / 7) * 1.8 : Math.sin(f / 30) * 0.6;
  const breathe = Math.sin(f / 22) * 3;
  const P = POSES[pose](f);
  const look = pose === 'think' || pose === 'idea' ? -0.6 : lookY;

  const armL = <ArmDraw S={SL} T={P.L} side="L" />;
  const armR = <ArmDraw S={SR} T={P.R} side="R" />;
  const front = P.front;

  return (
    <svg viewBox="0 0 800 1000" width={height * 0.8} height={height} style={{overflow: 'visible', ...style}}>
      {/* প্রপ: চার্ট (পেছনে) */}
      {pose === 'present' ? (
        <g transform="translate(560 380)">
          <rect x={0} y={0} width={300} height={230} rx={14} fill="#6a8cb8" {...line} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={40 + i * 60} y={170 - i * 34} width={36} height={34 + i * 34} fill="#dfe8f4" />
          ))}
          <path d="M40 150 L110 110 L170 120 L260 40" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d="M236 36 L264 36 L264 64" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      ) : null}
      <g transform={`translate(0 ${breathe})`}>
        {/* ধড়: ঘিয়ে শার্ট */}
        <path d="M150 1010 L168 680 C176 600 230 552 320 532 L480 532 C570 552 624 600 632 680 L650 1010Z" fill={SHIRT} {...line} />
        {/* নেভি কোটি */}
        <path d="M176 1010 L188 690 C196 612 240 568 330 548 L356 560 L384 1010Z" fill={VEST} {...line} />
        <path d="M624 1010 L612 690 C604 612 560 568 470 548 L444 560 L416 1010Z" fill={VEST} {...line} />
        <path d="M384 1010 L384 640" stroke={VEST_D} strokeWidth={4} />
        {[700, 780, 860, 940].map((y) => (
          <circle key={y} cx={404} cy={y} r={6} fill={VEST_D} />
        ))}
        {/* বন্ধ গলা (মান্দারিন কলার) */}
        <path d="M330 540 C350 516 450 516 470 540 L462 566 C440 548 360 548 338 566Z" fill={VEST} {...line} />
        <path d="M352 534 L400 586 L448 534" fill={SHIRT} {...line} strokeWidth={5} />
        {/* বুকপকেটের রুমাল আর মাইক */}
        <rect x={470} y={690} width={80} height={10} rx={4} fill="#efe6d2" stroke={INK} strokeWidth={3} />
        <g transform="translate(330 660)">
          <rect x={-8} y={-16} width={16} height={30} rx={8} fill="#222" />
          <rect x={-14} y={8} width={28} height={8} rx={3} fill="#444" />
        </g>
        {front === 'L' ? armR : armL}
        {front === 'L' ? armL : armR}
        {/* প্রপ: বই, কাপ, ল্যাপটপ (হাতের সামনে) */}
        {pose === 'book' ? (
          <g transform="translate(400 800)">
            <path d="M-150 -90 L0 -70 L150 -90 L150 80 L0 100 L-150 80Z" fill="#7a3e22" {...line} />
            <path d="M-136 -78 L-4 -60 L-4 86 L-136 68Z" fill="#f6efe0" {...line} strokeWidth={4} />
            <path d="M136 -78 L4 -60 L4 86 L136 68Z" fill="#f6efe0" {...line} strokeWidth={4} />
            {[-40, -10, 20, 50].map((y) => (
              <g key={y} stroke="#b9ae98" strokeWidth={4}>
                <path d={`M-120 ${y - 8} L-24 ${y + 4}`} />
                <path d={`M24 ${y + 4} L120 ${y - 8}`} />
              </g>
            ))}
          </g>
        ) : null}
        {pose === 'mug' ? (
          <g transform="translate(330 720)">
            <path d="M-40 -10 L40 -10 L34 80 L-34 80Z" fill="#f7f7f5" {...line} />
            <path d="M40 10 C70 10 70 56 36 56" fill="none" {...line} />
            <path d="M-14 -30 C-24 -50 0 -60 -10 -80 M10 -30 C0 -50 24 -60 14 -80" stroke="#c9c9cc" strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
        ) : null}
        {pose === 'laptop' ? (
          <g transform="translate(400 900)">
            <path d="M-210 -150 L190 -150 L210 70 L-230 70Z" fill="#8e9096" {...line} />
            <circle cx={-10} cy={-40} r={18} fill="#c9cbd0" />
            <path d="M-250 70 L250 70 L230 100 L-230 100Z" fill="#6e7076" {...line} />
          </g>
        ) : null}
        {/* মাথা */}
        <g transform={`translate(400 536) rotate(${nod}) scale(1.16) translate(-400 -470)`}>
          <path d="M340 392 L460 392 L466 470 C440 486 360 486 334 470Z" fill={SKIN_D} {...line} />
          <Face expression={pose === 'idea' && expression === 'neutral' ? 'laugh' : expression} talk={talk} blink={blink} lookX={pose === 'present' || pose === 'pointR' ? 0.8 : pose === 'pointL' ? -0.8 : lookX} lookY={look} />
        </g>
      </g>
      {/* প্রপ: আইডিয়ার বাল্ব */}
      {pose === 'idea' ? (
        <g transform="translate(560 250)">
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (-150 + i * 30) * (Math.PI / 180);
            return <path key={i} d={`M${Math.cos(a) * 80} ${Math.sin(a) * 80} L${Math.cos(a) * 110} ${Math.sin(a) * 110}`} stroke="#f2b705" strokeWidth={9} strokeLinecap="round" />;
          })}
          <circle r={56} fill="#ffd54a" {...line} />
          <rect x={-24} y={50} width={48} height={34} rx={6} fill="#9a9a9e" {...line} />
        </g>
      ) : null}
    </svg>
  );
};
