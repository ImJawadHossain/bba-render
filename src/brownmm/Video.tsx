import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {Paper, PsyThumb} from '../common/psy';
import {Bounce, Card, Count, Cta, Hit, R, Solo, story} from '../common/reel';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const COLORS = ['#e02424', '#2b5fd9', '#f0c419', '#2a9a4a', '#f07a19'];
const BROWN = '#6a3a1e';

// এক বাটি চকলেট; brown দিলে মাঝে একটা বাদামি
const Bowl: React.FC<{size?: number; brown?: boolean; glow?: boolean}> = ({size = 560, brown, glow}) => {
  const f = useCurrentFrame();
  const pulse = 1 + 0.08 * Math.sin(f / 4);
  const dots: [number, number, string][] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7 - r; c++) dots.push([22 + c * 13 + r * 6.5, 50 - r * 9, COLORS[(r * 3 + c) % COLORS.length]]);
  return (
    <svg viewBox="0 0 140 110" width={size} height={size * 0.79} style={{overflow: 'visible'}}>
      {dots.map(([x, y, col], i) => <ellipse key={i} cx={x} cy={y} rx={6.4} ry={5} fill={col} stroke="#1b1b1f" strokeWidth={1.4} />)}
      {brown ? (
        <g transform={`translate(70 18) scale(${glow ? pulse : 1})`}>
          {glow ? <circle r={22} fill="none" stroke="#ff3b3b" strokeWidth={3} /> : null}
          <ellipse rx={13} ry={10} fill={BROWN} stroke="#1b1b1f" strokeWidth={2} />
          <text y={3.5} textAnchor="middle" fontSize={9} fontWeight={900} fill="#f4efe2">m</text>
        </g>
      ) : null}
      <path d="M8 56 Q70 120 132 56 Z" fill="#e8e4dc" stroke="#1b1b1f" strokeWidth={4} />
      <ellipse cx={70} cy={56} rx={62} ry={8} fill="none" stroke="#1b1b1f" strokeWidth={4} />
    </svg>
  );
};

// কনসার্টের মঞ্চ; sink দিলে মেঝে ডেবে যায়
const Stage: React.FC<{sink?: boolean}> = ({sink}) => {
  const f = useCurrentFrame();
  const d = sink ? interpolate(f, [4, 30], [0, 70], clampOpts) : 0;
  return (
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #120a1e, #2a1438 60%, #0a0610)'}}>
      {[160, 420, 680, 940].map((x, i) => (
        <div key={x} style={{position: 'absolute', left: x - 120, top: 0, width: 240, height: 1300, background: `linear-gradient(180deg, ${['rgba(255,80,160,0.35)', 'rgba(80,160,255,0.35)', 'rgba(255,210,80,0.35)', 'rgba(160,80,255,0.35)'][i]}, transparent)`, clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)'}} />
      ))}
      <div style={{position: 'absolute', left: 60, right: 60, top: 1000 + d, height: 180, background: '#1b1b22', border: '8px solid #3a3a46', transform: `rotate(${sink ? interpolate(f, [4, 30], [0, 2.2], clampOpts) : 0}deg)`}}>
        {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{position: 'absolute', left: 60 + i * 190, top: -170, width: 110, height: 170, background: '#2a2a34', border: '6px solid #4a4a56'}} />)}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1180, height: 760, background: 'linear-gradient(180deg, #3a2a20, #120c08)'}} />
      {sink ? <svg viewBox="0 0 1080 200" width={1080} height={200} style={{position: 'absolute', left: 0, top: 1150, opacity: interpolate(f, [6, 16], [0, 1], clampOpts)}}><path d="M80 40 L200 90 L260 30 L380 120 L470 50 L600 140 L700 60 L820 130 L920 40 L1010 100" fill="none" stroke="#e0606a" strokeWidth={10} /></svg> : null}
    </div>
  );
};

const Backstage: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #3a2e2a, #1a1412)'}}>
    <div style={{position: 'absolute', left: 120, top: 300, width: 360, height: 520, border: '14px solid #e0c88a', borderRadius: 12, background: '#2a2422'}}>
      {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{position: 'absolute', top: -8, left: -10 + i * 85, width: 26, height: 26, borderRadius: '50%', background: '#fff6c8', boxShadow: '0 0 22px #fff6c8'}} />)}
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1330, height: 700, background: '#5a3e2a', borderTop: '12px solid #7a5a3a'}} />
  </div>
);

const Truck: React.FC = () => (
  <svg viewBox="0 0 120 70" width={300} height={175}>
    <rect x={4} y={8} width={76} height={44} rx={4} fill="#e8e4dc" stroke="#1b1b1f" strokeWidth={4} />
    <path d="M80 22 L102 22 L116 38 L116 52 L80 52 Z" fill="#d23b3b" stroke="#1b1b1f" strokeWidth={4} />
    <rect x={88} y={27} width={14} height={10} fill="#9ec8f0" stroke="#1b1b1f" strokeWidth={2} />
    {[22, 62, 100].map((x) => <circle key={x} cx={x} cy={56} r={9} fill="#2a2a30" stroke="#1b1b1f" strokeWidth={4} />)}
  </svg>
);

const DAVID: ToonLook = {skin: '#efc6a6', hair: '#d8b050', hairStyle: 'curly', top: '#1c1c22', jacket: '#d23b3b', bottom: '#1c1c22', shoes: '#16161a'};

// চুক্তির পাতা: মাঝে লুকানো লাইন
const Rider: React.FC<{show?: boolean}> = ({show}) => (
  <Paper w={760} rot={-2} size={40} title="RIDER: Article 126" lines={['Stage: 9 trucks of equipment', 'Floor load: see details', 'Power and safety rules', ...(show ? ['M&Ms (WARNING:', 'ABSOLUTELY NO BROWN ONES)'] : ['Security: 12 guards', 'Catering: page 40'])]} />
);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({bg: 'dark', over: () => <Bounce x={260} y={620} at={1}><Bowl brown glow /></Bounce>, title: 'একটা বাদামি = শো বাতিল', color: RED, size: 92, titleTop: 300}),
  h2: R({place: <Stage />, title: 'Van Halen-এর চুক্তি', color: GOLD}),
  rider: R({bg: 'plain', over: () => <Bounce x={160} y={380} at={1}><Rider show /></Bounce>}),
  press: Hit('তারকাদের পাগলামি!', {size: 120, color: GOLD, bg: 'sepia', sub: 'পত্রিকার শিরোনাম'}),
  pueblo: Solo(<Backstage />, {look: DAVID, e: 'smile', g: 'wave'}, {title: 'Pueblo, ১৯৮০', color: GOLD}),
  bowl: R({place: <Backstage />, over: () => <Bounce x={260} y={760} at={1}><Bowl brown glow /></Bounce>, title: 'একটা বাদামি', color: RED}),
  says: Solo(<Backstage />, {look: DAVID, e: 'serious', g: 'pointL', talk: true}, {near: true}),
  trash: Solo(<Backstage />, {look: DAVID, e: 'shocked', g: 'open'}, {title: 'সাজঘর তছনছ', color: RED}),
  but: Card('কিন্তু খবরে একটা কথা আসে না', {size: 92, color: GOLD, bg: 'dark'}),
  floor: R({place: <Stage sink />, title: 'মেঝে ডেবে যায়', color: RED, titleTop: 300}),
  cost: Count(80000, {pre: '$', size: 200, label: 'ক্ষতি', color: RED, bg: 'dark'}),
  weight: R({bg: 'plain', over: () => <Bounce x={160} y={380} at={1}><Paper w={760} rot={2} size={44} title="Floor load" lines={['Stage is very heavy', 'Check floor strength', 'BEFORE setup']} /></Bounce>, title: 'কেউ পড়েনি', color: RED, titleTop: 1180}),
  trucks: R({place: <Stage />, over: () => <>{[0, 1, 2].map((i) => <Bounce key={i} x={70 + i * 320} y={560 + (i % 2) * 120} at={2 + i * 5} seed={`tr${i}`}><Truck /></Bounce>)}</>, title: 'নয় ট্রাক যন্ত্র', color: GOLD}),
  hidden: R({bg: 'plain', over: () => <Bounce x={160} y={380} at={1}><Rider show /></Bounce>, title: 'মাঝখানে লুকানো', color: GOLD, titleTop: 1220}),
  test: R({place: <Backstage />, over: () => <><Bounce x={60} y={560} at={1}><Bowl size={440} brown /></Bounce><Bounce x={560} y={460} at={8} seed="p"><Paper w={440} rot={4} title="চুক্তি" dots={4} size={46} /></Bounce></>, title: 'আবার মিলিয়ে দেখো', color: GREEN}),
  punch: Hit('পাগলামি না, পরীক্ষা', {size: 130, color: GOLD, bg: 'dark'}),
  book: R({bg: 'plain', over: () => <Bounce x={90} y={360} at={2}><div style={{width: 640, padding: '50px 36px', background: '#3a1420', border: `10px solid ${GOLD}`, borderRadius: 18, textAlign: 'center', fontWeight: 800}}><div style={{fontSize: 76, lineHeight: 1.18, color: GOLD}}>Crazy from the Heat</div><div style={{marginTop: 22, fontSize: 44, color: '#f2efe9'}}>David Lee Roth, 1997</div></div></Bounce>}),
  lesson: R({bg: 'plain'}),
  act: Card('একটা ছোট নির্দেশ লুকিয়ে রাখো', {size: 96, color: GOLD, bg: 'dark'}),
  cta: () => (
    <Cta>
      <Bowl size={460} brown />
    </Cta>
  ),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একটা বাদামি চকলেট" l2="পুরো কনসার্ট বাতিল!" bottom="পাগলামি, না অন্য কিছু?" term="Van Halen" art={<div style={{position: 'absolute', left: 60, top: 1000}}><Bowl size={500} brown glow /></div>} size={90} />
);
export const brownmm = story('brownmm/', raw, SCENES, Thumb, {logo: 'bba2'});
