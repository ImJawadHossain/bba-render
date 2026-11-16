import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb, a} from '../common/psy';
import {Bounce, Card, Cta, Hit, Pair, R, SIR, Solo, ELDER, story} from '../common/reel';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

// দুর্গন্ধ: ছোট ছোট সবুজ ঢেউ ধীরে ওপরে ওঠে
const Stench: React.FC<{top?: number}> = ({top = 700}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 1080 700" width={1080} height={700} style={{position: 'absolute', left: 0, top}}>
      {Array.from({length: 9}, (_, i) => {
        const x = 80 + ((i * 113) % 920);
        const y = 600 - ((f * 2.2 + i * 70) % 600);
        return <path key={i} d={`M${x} ${y} q 22 -26 0 -52 q -22 -26 0 -52`} fill="none" stroke="rgba(160,200,70,0.75)" strokeWidth={12} strokeLinecap="round" opacity={Math.min(1, y / 200)} />;
      })}
      <rect x={0} y={0} width={1080} height={700} fill="rgba(140,170,60,0.12)" />
    </svg>
  );
};

// নদীর পাড়ে সংসদ ভবন
const Thames: React.FC<{stink?: boolean}> = ({stink}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, background: stink ? 'linear-gradient(180deg, #8a8a4a, #c8b870 55%)' : 'linear-gradient(180deg, #7a9ab8, #c8d4d8 55%)'}}>
      <svg viewBox="0 0 1080 700" width={1080} height={700} style={{position: 'absolute', left: 0, top: 360}}>
        <rect x={60} y={300} width={760} height={260} fill="#c9a86a" stroke="#1b1b1f" strokeWidth={6} />
        {Array.from({length: 12}, (_, i) => <rect key={i} x={80 + i * 62} y={340} width={30} height={90} fill="#5a4a32" />)}
        {Array.from({length: 13}, (_, i) => <path key={i} d={`M${60 + i * 62} 300 L${76 + i * 62} 262 L${92 + i * 62} 300 Z`} fill="#c9a86a" stroke="#1b1b1f" strokeWidth={4} />)}
        <rect x={860} y={60} width={120} height={500} fill="#c9a86a" stroke="#1b1b1f" strokeWidth={6} />
        <circle cx={920} cy={170} r={40} fill="#f4efe2" stroke="#1b1b1f" strokeWidth={6} />
        <line x1={920} y1={170} x2={920} y2={142} stroke="#1b1b1f" strokeWidth={5} />
        <line x1={920} y1={170} x2={940} y2={180} stroke="#1b1b1f" strokeWidth={5} />
        <path d="M850 60 L920 0 L990 60 Z" fill="#3a4a3a" stroke="#1b1b1f" strokeWidth={6} />
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 920, height: 1000, background: stink ? 'linear-gradient(180deg, #5a4a1e, #2a2210)' : 'linear-gradient(180deg, #4a5a5e, #1e2a2e)'}}>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: ((f * 2 + i * 300) % 1300) - 200, top: 60 + i * 90, width: 220, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.18)'}} />)}
      </div>
      {stink ? <Stench top={560} /> : null}
    </div>
  );
};

// সংসদের কক্ষ
const Chamber: React.FC<{stink?: boolean}> = ({stink}) => (
  <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #4a3a2a, #1e160e)'}}>
    {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 80 + i * 330, top: 300, width: 250, height: 620, borderRadius: '125px 125px 0 0', background: stink ? '#d8d0a0' : '#9ab0c0', border: '12px solid #2a1e12', opacity: 0.85}} />)}
    {stink ? [0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 92 + i * 330, top: 312, width: 226, height: 600, borderRadius: '113px 113px 0 0', background: 'repeating-linear-gradient(90deg, #f2efe0 0 30px, #e0dcc8 30px 60px)'}} />) : null}
    <div style={{position: 'absolute', left: 0, right: 0, top: 1300, height: 700, background: '#2f5a3a', borderTop: '14px solid #1b1b1f'}} />
    {stink ? <Stench top={300} /> : null}
  </div>
);

// ইটের পাইপ
const Pipe: React.FC<{big?: boolean}> = ({big}) => {
  const f = useCurrentFrame();
  const s = big ? interpolate(f, [4, 22], [1, 1.9], clampOpts) : 1;
  return (
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, #4a3a2e, #0e0a08 70%)'}}>
      <div style={{position: 'absolute', left: 540 - 220 * s, top: 760 - 220 * s, width: 440 * s, height: 440 * s, borderRadius: '50%', border: `${34 * s}px solid #a0522d`, boxSizing: 'border-box', background: '#120c08', boxShadow: 'inset 0 0 80px #000'}} />
    </div>
  );
};

// রুমাল হাতে
const Hanky: React.ReactNode = <rect x={-38} y={-40} width={76} height={70} rx={6} fill="#f4f2ec" stroke="#1b1b1f" strokeWidth={5} />;

const MP1: ToonLook = {...SIR, top: '#f4f2ec', jacket: '#1c1c22', tie: '#1c1c22', mustache: true, age: 0.6};
const MP2: ToonLook = {...SIR, hair: '#8a8580', jacket: '#2a2620', tie: '#5a1a1a', age: 0.8, glasses: false};
const MP3: ToonLook = {...SIR, hair: '#3a2a1a', jacket: '#1e2430', tie: '#1c1c22', mustache: true, age: 0.5};
const BAZ: ToonLook = {...ELDER, kurta: false, top: '#f4f2ec', jacket: '#262a33', bottom: '#1c1e24', hair: '#3a2a1a', hairStyle: 'receding', mustache: true, glasses: false, age: 0.5};

const SCENES: Record<string, React.FC<SP>> = {
  h1: Hit('সংসদ নড়ে না', {size: 140, color: RED, bg: 'dark', sub: 'কলেরায় হাজার হাজার মৃত্যু'}),
  h2: Hit('১৮ দিনে আইন', {size: 160, color: GOLD, place: <Thames stink />}),
  city: R({place: <Thames stink />, title: 'London, ১৮৫৮', color: GOLD}),
  years: R({place: <Chamber />, actors: [a(MP1, 230, 'neutral', 'idle', {h: 1000}), a(MP2, 540, 'neutral', 'idle', {h: 1040}), a(MP3, 850, 'neutral', 'idle', {h: 1000})], title: 'বছরের পর বছর', color: GOLD}),
  later: Solo(<Chamber />, {look: MP2, e: 'skeptical', g: 'shrug', talk: true}, {near: true}),
  house: R({place: <Thames />, title: 'নদীর ঠিক ধারে', color: GOLD}),
  smell: R({place: <Chamber stink />, actors: [a(MP1, 300, 'worried', 'idle', {h: 1040}), a(MP3, 780, 'worried', 'idle', {h: 1040, lookX: -1})], title: 'চুন ভেজানো পর্দা', color: GREEN}),
  run: R({place: <Chamber stink />, actors: [a(MP1, 230, 'shocked', 'hold', {h: 1040, holding: Hanky}), a(MP2, 540, 'shocked', 'hold', {h: 1080, holding: Hanky}), a(MP3, 850, 'shocked', 'hold', {h: 1040, holding: Hanky})], title: 'নাকে রুমাল!', color: RED}),
  now: Solo(<Chamber stink />, {look: MP2, e: 'shocked', g: 'open', talk: true, hold: Hanky}, {near: true}),
  punch: Hit('নিজের নাকে এলে ১৮ দিন', {size: 110, color: GOLD, bg: 'dark'}),
  engineer: Solo(<Pipe />, {look: BAZ, e: 'serious', g: 'explain'}, {title: 'Joseph Bazalgette', color: GOLD}),
  calc: R({place: <Pipe />, title: 'পাইপের মাপ', color: GOLD}),
  double: R({place: <Pipe big />, actors: [{look: BAZ, x: 820, h: 1180, y: 1880, expression: 'serious', gesture: 'pointUp', talking: true, lookX: -1}]}),
  mock: Pair(<Chamber />, {look: MP1, e: 'laugh', g: 'pointR'}, {look: BAZ, e: 'neutral'}, {title: 'বাড়াবাড়ি!', color: RED}),
  today: R({place: <Thames />, title: 'দেড়শো বছর পরও চলে', color: GREEN}),
  book: R({bg: 'plain', over: () => <Bounce x={90} y={360} at={2}><div style={{width: 640, padding: '50px 36px', background: '#2a2010', border: `10px solid ${GOLD}`, borderRadius: 18, textAlign: 'center', fontWeight: 800}}><div style={{fontSize: 70, lineHeight: 1.2, color: GOLD}}>The Great Stink of London</div><div style={{marginTop: 22, fontSize: 44, color: '#f2efe9'}}>Stephen Halliday</div></div></Bounce>}),
  lesson: R({bg: 'plain'}),
  act: Card('দেখাও, এতে বসের নিজের ক্ষতি কোথায়', {size: 88, color: GOLD, bg: 'dark'}),
  cta: () => (
    <Cta>
      <svg viewBox="0 0 120 260" width={180} height={390}>
        <rect x={30} y={60} width={60} height={196} fill="#c9a86a" stroke="#1b1b1f" strokeWidth={5} />
        <circle cx={60} cy={110} r={22} fill="#f4efe2" stroke="#1b1b1f" strokeWidth={5} />
        <line x1={60} y1={110} x2={60} y2={94} stroke="#1b1b1f" strokeWidth={4} />
        <line x1={60} y1={110} x2={72} y2={116} stroke="#1b1b1f" strokeWidth={4} />
        <path d="M22 60 L60 8 L98 60 Z" fill="#3a4a3a" stroke="#1b1b1f" strokeWidth={5} />
      </svg>
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="মৃত্যুতে সংসদ চুপ" l2="গন্ধে ১৮ দিনে আইন!" bottom="নাকে রুমাল, তারপর?" term="The Great Stink" glow="rgba(150,190,60,0.32)" size={90} />
);
export const stink = story('stink/', raw, SCENES, Thumb, {logo: 'bba2'});
