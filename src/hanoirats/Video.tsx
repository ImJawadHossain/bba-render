import React from 'react';
import {useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Coin, PsyThumb} from '../common/psy';
import {Bounce, Card, Count, Cta, Hit, Pair, R, Solo, story} from '../common/reel';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

// ইঁদুর; tail={false} দিলে লেজ নেই, walk দিলে হেঁটে যায়
const Rat: React.FC<{size?: number; tail?: boolean; flip?: boolean; walk?: boolean; seed?: number}> = ({size = 360, tail = true, flip, walk, seed = 0}) => {
  const f = useCurrentFrame();
  const y = Math.sin((f + seed * 13) / 4) * (walk ? 5 : 3);
  const dx = walk ? ((f * 9 + seed * 200) % 1500) - 300 : 0;
  return (
    <svg viewBox="0 0 240 150" width={size} height={size * 0.625} style={{overflow: 'visible', transform: `translateX(${flip ? -dx : dx}px) ${flip ? 'scaleX(-1)' : ''}`}}>
      {tail ? <path d={`M200 100 C232 ${96 + y} 240 ${70 + y} 232 ${52 + y}`} fill="none" stroke="#d99a9a" strokeWidth={8} strokeLinecap="round" /> : <circle cx={206} cy={100} r={7} fill="#d97a8a" stroke="#1b1b1f" strokeWidth={4} />}
      <ellipse cx={132} cy={92 + y} rx={78} ry={48} fill="#8a8078" stroke="#1b1b1f" strokeWidth={5} />
      <circle cx={60} cy={82 + y} r={38} fill="#8a8078" stroke="#1b1b1f" strokeWidth={5} />
      <circle cx={72} cy={44 + y} r={22} fill="#d99a9a" stroke="#1b1b1f" strokeWidth={5} />
      <circle cx={46} cy={74 + y} r={6.5} fill="#1b1b1f" />
      <circle cx={24} cy={90 + y} r={7} fill="#d97a8a" stroke="#1b1b1f" strokeWidth={3} />
      <path d={`M32 ${100 + y} Q42 ${110 + y} 52 ${100 + y}`} fill="none" stroke="#1b1b1f" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
};

// লেজের ঝুড়ি
const TailBasket: React.FC<{n?: number; size?: number}> = ({n = 24, size = 560}) => (
  <svg viewBox="0 0 200 150" width={size} height={size * 0.75} style={{overflow: 'visible'}}>
    {Array.from({length: n}, (_, i) => {
      const x = 30 + ((i * 37) % 140);
      const h = 30 + ((i * 17) % 40);
      return <path key={i} d={`M${x} 70 C${x - 12} ${70 - h * 0.6} ${x + 14} ${70 - h} ${x + 4} ${70 - h - 14}`} fill="none" stroke="#d99a9a" strokeWidth={5} strokeLinecap="round" />;
    })}
    <path d="M14 66 L186 66 L168 146 L32 146 Z" fill="#a07a44" stroke="#1b1b1f" strokeWidth={5} />
    {[84, 104, 124].map((y) => <line key={y} x1={22} y1={y} x2={178} y2={y} stroke="#6a4a24" strokeWidth={4} />)}
  </svg>
);

// ফরাসি আমলের রাস্তা
const Street: React.FC<{dim?: boolean}> = ({dim}) => (
  <div style={{position: 'absolute', inset: 0, background: dim ? 'linear-gradient(180deg, #2a2a1e, #0e0e0a)' : 'linear-gradient(180deg, #9ec4d8, #e8dcb8 60%)'}}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{position: 'absolute', left: i * 380 - 40, top: 380 - (i % 2) * 60, width: 360, height: 900, background: dim ? '#5a5230' : '#e8c460', border: '8px solid #1b1b1f'}}>
        {[0, 1, 2].map((r) => [0, 1].map((c) => <div key={`${r}${c}`} style={{position: 'absolute', left: 50 + c * 150, top: 70 + r * 220, width: 100, height: 150, background: dim ? '#2a3020' : '#3a6a4a', border: '6px solid #1b1b1f', borderRadius: '50px 50px 0 0'}} />))}
      </div>
    ))}
    <div style={{position: 'absolute', left: 0, right: 0, top: 1240, height: 700, background: dim ? '#2a2620' : '#8a8070', borderTop: '10px solid #1b1b1f'}} />
    <div style={{position: 'absolute', left: 380, top: 1300, width: 320, height: 60, borderRadius: '50%', background: '#1b1b1f'}} />
  </div>
);

// মাটির নিচের নালা
const Sewer: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, #3a3a2a, #0a0a08 70%)'}}>
    <div style={{position: 'absolute', left: 90, top: 300, width: 900, height: 900, borderRadius: '50%', border: '40px solid #4a4436', boxShadow: 'inset 0 0 120px #000'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 1150, height: 120, background: 'linear-gradient(180deg, #3a4a2a, #1a2010)'}} />
  </div>
);

const OFFICER: ToonLook = {skin: '#efc6a6', hair: '#6a4a2a', hairStyle: 'side', top: '#f4f2ec', jacket: '#e8e4d6', bottom: '#e8e4d6', mustache: true, age: 0.4, shoes: '#3a2618'};
const HUNTER: ToonLook = {skin: '#c99a6a', hair: '#1a1410', hairStyle: 'short', top: '#6a6a52', bottom: '#3a3a2e', shoes: '#16161a', age: 0.3};

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: <Street />, over: () => <div style={{position: 'absolute', left: 0, top: 1060}}><Rat walk tail={false} size={380} /></div>, title: 'লেজ নেই!', color: RED, size: 110, titleTop: 220}),
  city: R({place: <Sewer />, over: () => <>{[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: 120 + (i % 2) * 460, top: 640 + Math.floor(i / 2) * 240}}><Rat size={300} flip={i % 2 === 1} seed={i} /></div>)}</>, title: 'Hanoi, ১৯০২', color: GOLD}),
  offer: R({bg: 'sepia', over: () => <Bounce x={330} y={560} at={1}><Coin size={420} /></Bounce>, title: 'একটা ইঁদুর = এক পয়সা', color: GOLD}),
  proof: R({bg: 'sepia', over: () => <Bounce x={260} y={620} at={1}><TailBasket n={6} /></Bounce>, title: 'প্রমাণ: শুধু লেজ', color: GOLD}),
  tails: Count(20000, {post: ' লেজ', size: 180, label: 'এক দিনে', color: GOLD, bg: 'sepia'}),
  happy: Solo(<Street />, {look: OFFICER, e: 'laugh', g: 'thumbsUp', talk: true}, {near: true}),
  street: R({place: <Street />, actors: [{look: OFFICER, x: 760, h: 1080, y: 1830, expression: 'shocked', gesture: 'pointL', lookX: -1}], over: () => <div style={{position: 'absolute', left: -200, top: 1300}}><Rat walk tail={false} size={300} seed={3} /></div>, title: 'লেজ ছাড়া ইঁদুর', color: RED}),
  caught: Pair(<Street />, {look: HUNTER, e: 'worried'}, {look: OFFICER, e: 'serious'}, {title: 'ধরা পড়ে', color: RED}),
  why: Pair(<Street />, {look: HUNTER, e: 'worried'}, {look: OFFICER, e: 'skeptical', g: 'pointL', talk: true}),
  answer: Pair(<Street />, {look: HUNTER, e: 'smile', g: 'open', talk: true}, {look: OFFICER, e: 'shocked'}),
  farm: R({place: <Street dim />, over: () => <>{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{position: 'absolute', left: 60 + (i % 3) * 330, top: 700 + Math.floor(i / 3) * 260}}><Rat size={260} seed={i} flip={i % 2 === 0} /></div>)}</>, title: 'গোপন খামার', color: RED}),
  punch: Hit('মারছে না, চাষ করাচ্ছে', {size: 116, color: GOLD, bg: 'dark'}),
  stop: Hit('পরের বছর প্লেগ', {size: 140, color: RED, bg: 'war'}),
  book: R({bg: 'plain', over: () => <Bounce x={90} y={360} at={2}><div style={{width: 640, padding: '50px 36px', background: '#2a3a1e', border: `10px solid ${GOLD}`, borderRadius: 18, textAlign: 'center', fontWeight: 800}}><div style={{fontSize: 70, lineHeight: 1.2, color: GOLD}}>The Great Hanoi Rat Hunt</div><div style={{marginTop: 22, fontSize: 44, color: '#f2efe9'}}>Michael G. Vann</div></div></Bounce>}),
  lesson: R({bg: 'plain'}),
  act: Card('মাপো আসল ফল, কাগজের সংখ্যা না', {size: 92, color: GREEN, bg: 'dark'}),
  cta: () => (
    <Cta>
      <Rat tail={false} size={420} />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="সরকার লেজ কিনল" l2="ইঁদুর বেড়ে গেল!" bottom="লেজ ছাড়া ইঁদুর কেন?" term="Cobra Effect" art={<div style={{position: 'absolute', left: 60, top: 1080}}><Rat tail={false} size={460} /></div>} size={92} />
);
export const hanoirats = story('hanoirats/', raw, SCENES, Thumb, {logo: 'bba2'});
