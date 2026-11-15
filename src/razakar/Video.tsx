// একটা শব্দ: ১৪ জুলাই ২০২৪-এর "রাজাকার" মন্তব্য থেকে ৫ আগস্ট। Jawad-এর স্ক্রিপ্ট, Law 4।
// বাস্তব মানুষের মুখ আঁকা হয়নি: বক্তা শুধু ছায়ামূর্তি, সহিংসতা শুধু প্রতীকে (মোমবাতি)।
import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {PhoneProp, Sign} from '../common/places';
import {BoardSign} from '../common/places2';
import {Bounce, Card, Count, Cta, Hit, R, Slam, Two, Y1, lawBook, story} from '../common/reel';
import {Lock, Notice, crowd} from '../common/laws48';
import {Expression, Gesture} from '../common/Toon';
import raw from './segments.json';

const LINE = '#1b1b1f';
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
    {children}
  </svg>
);

// সংবাদ সম্মেলন: পর্দা, মঞ্চ, মাইক; বক্তা ছায়ামূর্তি
const Presser: React.FC<{speaker?: boolean}> = ({speaker = true}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1c2a4a, #0e1424)'}}>
      <Svg>
        {Array.from({length: 9}, (_, i) => (
          <rect key={i} x={i * 120} y={0} width={60} height={1920} fill="#22325a" opacity={0.5} />
        ))}
        {speaker ? (
          <g>
            <circle cx={540} cy={760} r={110} fill="#0a0c12" />
            <path d="M330 1180 C330 960 420 890 540 890 C660 890 750 960 750 1180Z" fill="#0a0c12" />
          </g>
        ) : null}
        <path d="M300 1060 L780 1060 L740 1500 L340 1500Z" fill="#6a4a2e" stroke={LINE} strokeWidth={8} />
        <rect x={280} y={1040} width={520} height={40} rx={8} fill="#8a6440" stroke={LINE} strokeWidth={6} />
        {[400, 470, 540, 610, 680].map((x, i) => (
          <g key={x}>
            <line x1={x} y1={1040} x2={x + (i - 2) * 6} y2={930} stroke="#2a2c34" strokeWidth={8} />
            <rect x={x - 22 + (i - 2) * 6} y={890} width={44} height={56} rx={14} fill="#2a2c34" stroke={LINE} strokeWidth={4} />
            <rect x={x - 26 + (i - 2) * 6} y={950} width={52} height={30} fill={['#c0304a', '#2b5fd9', '#d9a21b', '#2a7a6a', '#7a1f3a'][i]} stroke={LINE} strokeWidth={3} />
          </g>
        ))}
        {[160, 920].map((x, i) => (
          <circle key={x} cx={x} cy={420} r={26 + Math.abs(Math.sin(f / 4 + i)) * 10} fill="#fff8d0" opacity={0.25 + Math.abs(Math.sin(f / 3 + i * 2)) * 0.5} />
        ))}
        <rect x={0} y={1500} width={1080} height={420} fill="#141824" />
      </Svg>
    </AbsoluteFill>
  );
};

// হলের ভবন, রাতে জানালায় আলো
const Hall: React.FC<{night?: boolean}> = ({night = true}) => (
  <AbsoluteFill style={{background: night ? 'linear-gradient(180deg, #0a1020, #1a2440 70%)' : 'linear-gradient(180deg, #8ec2e4, #d8e8ee 70%)'}}>
    <Svg>
      <rect x={80} y={520} width={920} height={760} fill={night ? '#3a2e28' : '#b8724a'} stroke={LINE} strokeWidth={8} />
      {Array.from({length: 4}, (_, r) =>
        Array.from({length: 7}, (_, c) => <rect key={`${r}${c}`} x={130 + c * 124} y={580 + r * 160} width={70} height={100} fill={night ? (random(`w${r}${c}`) > 0.35 ? '#ffd98a' : '#141c32') : '#9ec4dc'} stroke={LINE} strokeWidth={4} />),
      )}
      <rect x={0} y={1280} width={1080} height={640} fill={night ? '#20232e' : '#8a8a82'} />
    </Svg>
    <Sign text="ঢাকা বিশ্ববিদ্যালয়" bg="#14305f" color="#ffe9a8" y={330} />
  </AbsoluteFill>
);

// লোহার গেট, মাঝে খোলা তালা
const Gate: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a1020, #1a2440 70%)'}}>
    <Svg>
      <rect x={0} y={1300} width={1080} height={620} fill="#20232e" />
      <rect x={100} y={500} width={880} height={22} fill="#4a4e58" stroke={LINE} strokeWidth={4} />
      {Array.from({length: 13}, (_, i) => (
        <rect key={i} x={120 + i * 66} y={500} width={16} height={800} fill="#4a4e58" stroke={LINE} strokeWidth={3} />
      ))}
      <rect x={100} y={900} width={880} height={18} fill="#4a4e58" stroke={LINE} strokeWidth={4} />
    </Svg>
  </AbsoluteFill>
);

// মোমবাতির সারি
const Candles: React.FC<{n?: number; y?: number}> = ({n = 7, y = 1180}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 70%, #3a2414, #07080c 70%)'}}>
      {Array.from({length: n}, (_, i) => {
        const spread = n <= 3 ? 420 : 900;
        const x = (1080 - spread) / 2 + (i * spread) / Math.max(1, n - 1) - 30;
        const h = 150 + random(`ch${i}`) * 120;
        const fl = 1 + Math.sin(f / 3 + i) * 0.12;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y - h}}>
            <div style={{width: 34, height: 54, margin: '0 auto', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: 'radial-gradient(circle at 50% 70%, #fff6c0, #ffb12a 60%, rgba(255,120,20,0))', transform: `scaleY(${fl})`, transformOrigin: 'bottom'}} />
            <div style={{width: 60, height: h, background: '#f2eee0', border: `4px solid ${LINE}`, borderRadius: 8}} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// হেলিকপ্টার, ডানে উড়ে যায়
const Heli: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 120], [260, 520], clampOpts);
  const y = interpolate(f, [0, 120], [700, 560], clampOpts);
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
      <g transform={`translate(${x} ${y})`}>
        <rect x={-180} y={-60} width={360} height={14} rx={7} fill="#1b1b1f" transform={`scale(${Math.cos(f / 1.5)} 1)`} />
        <rect x={-6} y={-50} width={12} height={40} fill="#1b1b1f" />
        <ellipse cx={0} cy={20} rx={110} ry={60} fill="#2a2c34" stroke={LINE} strokeWidth={5} />
        <path d="M90 10 L250 0 L250 24 L90 40Z" fill="#2a2c34" stroke={LINE} strokeWidth={5} />
        <ellipse cx={-50} cy={10} rx={40} ry={30} fill="#6a8ac4" />
        <path d="M-80 80 L80 80 M-60 80 L-50 70 M60 80 L50 70" stroke="#1b1b1f" strokeWidth={8} fill="none" />
      </g>
    </svg>
  );
};

// দেশলাইয়ের কাঠি, গায়ে লেখা
const Match: React.FC<{text?: string}> = ({text}) => {
  const f = useCurrentFrame();
  const fl = 1 + Math.sin(f / 2.5) * 0.1;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 35%, #5a2a10, #07080c 70%)'}}>
      <div style={{position: 'absolute', left: 470, top: 320, width: 140, height: 220, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: 'radial-gradient(circle at 50% 70%, #fff6c0, #ffb12a 55%, rgba(255,90,20,0))', transform: `scaleY(${fl})`, transformOrigin: 'bottom'}} />
      <div style={{position: 'absolute', left: 495, top: 500, width: 90, height: 90, borderRadius: '50%', background: '#b3201f', border: `6px solid ${LINE}`}} />
      <div style={{position: 'absolute', left: 510, top: 570, width: 60, height: 720, background: '#e8c88a', border: `6px solid ${LINE}`, borderRadius: 8}} />
      {text ? (
        <div style={{position: 'absolute', left: 540, top: 930, transform: 'translate(-50%, -50%) rotate(-90deg)', fontSize: 64, fontWeight: 900, color: RED, whiteSpace: 'nowrap', letterSpacing: 4}}>{text}</div>
      ) : null}
    </AbsoluteFill>
  );
};

// ভিড়: হাত মুঠো করে ওপরে
const fists = (xs: number[], e: Expression = 'shocked', g: Gesture = 'pointUp', talk = true) => crowd(xs, {h: 860, y: 1880, e}).map((a) => ({...a, gesture: g, talking: talk}));

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: <Presser />, title: 'এক প্রশ্ন, এক লাইনের উত্তর', color: GOLD, size: 76}),
  h2: Count(22, {post: ' দিন', label: 'মাত্র', sub: 'সাড়ে ১৫ বছরের ক্ষমতা শেষ', size: 230, color: RED, bg: 'dark'}),
  y2024: R({place: <Hall night={false} />, actors: fists([140, 400, 680, 940], 'serious', 'pointUp', false), over: () => <Bounce x={170} y={640} at={4}><BoardSign text="কোটা না, মেধা" bg="#b3201f" size={76} /></Bounce>, title: '২০২৪', color: GOLD}),
  fading: R({place: <Hall night={false} />, actors: crowd([300, 780], {h: 860, y: 1880, e: 'sad'}), title: 'আন্দোলন ঝিমিয়ে আসছে', color: GOLD, vig: 0.65}),
  presser: R({place: <Presser />, actors: [{look: {...Y1, top: '#f2efe6', jacket: '#2a2c34'}, x: 860, h: 1000, y: 1760, expression: 'serious', gesture: 'pointUp', lookX: -1}], title: '১৪ জুলাই · গণভবন', color: GOLD}),
  answer: R({place: <Presser />, title: 'উত্তর', color: GOLD}),
  quote: Card('“মুক্তিযোদ্ধাদের নাতি-পুতিরাও পাবে না? তাহলে কি রাজাকারের নাতি-পুতিরা পাবে?”', {size: 74, color: '#f2efe9', place: <Presser />}),
  word: Slam('রাজাকার', {size: 220, color: RED, bg: 'dark'}),
  insult: Hit('এর চেয়ে বড় গালি হয় না', {size: 120, color: GOLD, bg: 'dark'}),
  night: R({place: <Hall />, actors: fists([110, 330, 540, 750, 970], 'serious', 'idle', false), title: 'সেই রাতেই', color: GOLD}),
  girls: R({place: <Gate />, over: () => <Bounce x={400} y={760} at={3}><Lock size={280} open /></Bounce>, title: 'তালা ভেঙে রাস্তায়', color: RED}),
  chant: R({place: <Hall />, actors: fists([110, 330, 540, 750, 970]), title: 'তুমি কে? আমি কে?', color: RED, size: 100}),
  joined: R({place: <Hall night={false} />, actors: fists([90, 260, 430, 600, 770, 940, 1060], 'serious', 'pointUp', false), title: 'যারা ছিল না, তারাও নামল', color: GOLD}),
  honor: Two(Card('চাকরি', {size: 130, color: '#8a8e96', bg: 'dark'}), Hit('সম্মান', {size: 200, color: GOLD, bg: 'dark'}), 0.45),
  distorted: R({bg: 'dark', over: () => <Bounce x={140} y={640} at={3}><Notice text="প্রধানমন্ত্রী: ‘আমার কথা বিকৃত করা হয়েছে’" /></Bounce>}),
  late: Hit('ততক্ষণে দেরি হয়ে গেছে', {size: 120, color: RED, bg: 'dark'}),
  shots: R({place: <Candles n={3} />, title: 'রংপুর · আবু সাঈদ', color: GOLD}),
  lives: Two(
    R({bg: 'dark', over: () => <Bounce x={370} y={520} at={2}><PhoneProp w={340}><div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 46, fontWeight: 800, color: '#ff8a8a', padding: 20}}>ইন্টারনেট নেই</div></PhoneProp></Bounce>, title: 'ইন্টারনেট বন্ধ', color: RED}),
    R({place: <Candles n={11} />, title: 'শত শত প্রাণ', color: GOLD}),
    0.45,
  ),
  aug5: R({place: <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a4a6a, #c8603f 70%, #f0a860)'}} />, over: () => <Heli />, title: '৫ আগস্ট ২০২৪', color: GOLD}),
  fire: R({place: <Match />, title: 'আগুন ছড়ায় গুলিতে', color: GOLD}),
  match: R({place: <Match text="রাজাকার" />, title: 'কাঠিটা ছিল একটা শব্দ', color: RED}),
  book: lawBook(4),
  lesson: R({bg: 'plain'}),
  coriolanus: R({
    bg: 'sepia',
    over: () => (
      <Bounce x={140} y={520} at={2}>
        <div style={{width: 800, padding: '50px 40px', background: '#3a1420', border: `10px solid ${GOLD}`, borderRadius: 18, textAlign: 'center', fontWeight: 800, boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
          <div style={{fontSize: 100, color: GOLD}}>Coriolanus</div>
          <div style={{marginTop: 18, fontSize: 56, color: '#f2efe9'}}>যুদ্ধে জয়ী</div>
          <div style={{marginTop: 18, display: 'inline-block', padding: '8px 30px', background: RED, borderRadius: 14, fontSize: 56, color: '#fff'}}>কথায় নির্বাসিত</div>
        </div>
      </Bounce>
    ),
  }),
  you: Count(3, {post: ' সেকেন্ড', label: 'লেবেল দেওয়ার আগে থামো', size: 220, color: GREEN, bg: 'dark'}),
  screenshot: R({bg: 'dark', over: () => <Bounce x={370} y={460} at={2}><PhoneProp w={340}><div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 20}}><div style={{padding: '14px 22px', borderRadius: 18, background: '#f6f2e8', fontSize: 40, fontWeight: 800, color: '#15151b'}}>তুমি একটা ***</div><div style={{fontSize: 30, fontWeight: 800, color: '#9fd3ff'}}>স্ক্রিনশট সেভ হয়েছে</div></div></PhoneProp></Bounce>, title: 'সারাজীবনের স্ক্রিনশট', color: GOLD}),
  history: Hit('একটা শব্দ, বদলে যায় ইতিহাস', {size: 112, color: GOLD, bg: 'dark'}),
  cta: () => <Cta />,
};

const Thumb: React.FC = () => (
  <PsyThumb l1="একটা শব্দ" l2="২২ দিনে ক্ষমতা শেষ!" bottom="রাজাকার" term="48 Laws · Law 4" art={<div style={{position: 'absolute', left: 60, top: 1080}}><BoardSign text="রাজাকার" bg="#b3201f" size={110} w={560} /></div>} size={96} />
);
export const razakar = story('razakar/', raw, SCENES, Thumb, {logo: 'bba2'});
