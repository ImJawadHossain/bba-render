import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {Icons, Mobile, PROF, PsyThumb, a} from '../common/psy';
import {Bounce, Card, Cta, Hit, Pair, R, Solo, Y1, Y2, story} from '../common/reel';
import {CAST} from '../common/cast';
import {clampOpts} from '../biz/art';
import raw from './segments.json';

// ইমেইলের লাইন: [লেখা, ভুল কি না]
const LINES: [string, boolean][] = [
  ['Dear Freind,', true],
  ['I am Prinse of Nigeria.', true],
  ['$10,000,000 USD is stuk', true],
  ['in bank. Send small fee', false],
  ['for releese and get 30%.', true],
  ['God Blesss you!!!', true],
];

const Email: React.FC<{mark?: boolean; w?: number}> = ({mark, w = 620}) => {
  const f = useCurrentFrame();
  return (
    <Mobile w={w} screen="#f4f6fa">
      <div style={{padding: '36px 30px', color: '#1b1e26'}}>
        <div style={{fontSize: 28, color: '#6a7080', fontFamily: 'Arial'}}>From: Prince Abubakar</div>
        <div style={{fontSize: 36, fontWeight: 800, margin: '8px 0 26px', fontFamily: 'Arial', color: '#b3201f'}}>URGENT BUSSINESS!!!</div>
        {LINES.map(([t, bad], i) => (
          <div key={t} style={{fontSize: 36, fontFamily: 'Georgia, serif', lineHeight: 1.7, color: '#1b1e26'}}>
            <span style={{borderBottom: mark && bad ? `6px solid rgba(214,40,40,${interpolate(f, [6 + i * 4, 12 + i * 4], [0, 1], clampOpts)})` : 'none'}}>{t}</span>
          </div>
        ))}
      </div>
    </Mobile>
  );
};

// মুছে ফেলার বাক্স
const Trash: React.FC<{size?: number}> = ({size = 260}) => (
  <svg viewBox="0 0 100 120" width={size} height={size * 1.2}>
    <rect x={14} y={30} width={72} height={84} rx={8} fill="#d23b3b" stroke="#1b1b1f" strokeWidth={5} />
    <rect x={6} y={18} width={88} height={14} rx={6} fill="#e8e4dc" stroke="#1b1b1f" strokeWidth={5} />
    <rect x={38} y={6} width={24} height={14} rx={4} fill="#e8e4dc" stroke="#1b1b1f" strokeWidth={5} />
    {[34, 50, 66].map((x) => <line key={x} x1={x} y1={46} x2={x} y2={100} stroke="#1b1b1f" strokeWidth={5} strokeLinecap="round" />)}
  </svg>
);

const ME: typeof PROF = {...PROF, top: '#f4f2ec', jacket: '#2a3a5a'};
const office = 'office';

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({bg: 'dark', over: () => <Bounce x={230} y={430} at={1}><Email mark /></Bounce>, title: 'বানান ভুল, ইচ্ছা করে', color: RED, size: 96, titleTop: 230}),
  mail: R({bg: 'night', over: () => <Bounce x={230} y={330} at={1}><Email /></Bounce>}),
  laugh: R({bg: office, actors: [a(CAST.customer, 230, 'laugh', 'pointR', {h: 980}), a(CAST.pro, 540, 'laugh', 'idle', {h: 1020}), a(CAST.customer2, 850, 'laugh', 'pointL', {h: 980, lookX: -1})], title: 'এতে কে ঠকে?', color: GOLD}),
  cormac: Solo(<R2 />, {look: ME, e: 'thinking', g: 'think'}, {title: 'Cormac Herley', color: GOLD}),
  q: Card('তাহলে বিশ্বাসযোগ্য ইমেইল লেখে না কেন?', {size: 92, color: GOLD, bg: 'dark'}),
  c1: Pair(<R2 />, {look: ME, e: 'serious', g: 'explain', talk: true}, {look: Y2, e: 'neutral'}),
  c2: Pair(<R2 />, {look: ME, e: 'neutral'}, {look: Y2, e: 'smile', g: 'open', talk: true}),
  c3: Pair(<R2 />, {look: ME, e: 'serious', g: 'pointUp', talk: true}, {look: Y2, e: 'thinking'}),
  waste: Hit('সময় নষ্ট, টাকা শূন্য', {size: 120, color: RED, bg: 'dark'}),
  reveal: Solo(<R2 />, {look: ME, e: 'wink', g: 'pointUp', talk: true}, {near: true}),
  filter: R({bg: 'dark', over: () => <Icons total={20} n={1} color={GOLD} top={430} cols={5} w={120} />, title: 'একটা ছাঁকনি', color: GOLD}),
  delete: R({bg: 'night', over: () => <><Bounce x={120} y={420} at={1}><Email w={480} /></Bounce><Bounce x={640} y={900} at={12} seed="t"><Trash /></Bounce></>, title: 'মুছে ফেলো', color: GREEN}),
  reply: Solo(<R2 dim />, {look: Y1, e: 'smile', g: 'hold', hold: <rect x={-26} y={-60} width={52} height={96} rx={8} fill="#15171d" stroke="#4a4a50" strokeWidth={5} />}, {title: 'ঠিক যাকে খুঁজছে', color: RED}),
  punch: Hit('বোকা খুঁজতে লেখা', {size: 130, color: GOLD, bg: 'dark'}),
  book: R({bg: 'plain', over: () => <Bounce x={90} y={360} at={2}><div style={{width: 640, padding: '46px 34px', background: '#14305f', border: `10px solid ${GOLD}`, borderRadius: 18, textAlign: 'center', fontWeight: 800}}><div style={{fontSize: 50, lineHeight: 1.25, color: GOLD}}>Why Do Nigerian Scammers Say They are From Nigeria?</div><div style={{marginTop: 22, fontSize: 42, color: '#f2efe9'}}>Cormac Herley, 2012</div><div style={{marginTop: 22, display: 'inline-block', padding: '8px 26px', background: RED, borderRadius: 14, fontSize: 44, color: '#fff'}}>Microsoft Research</div></div></Bounce>}),
  lesson: R({bg: 'plain'}),
  act: Card('অফার যত বড়, সন্দেহ তত বড়', {size: 100, color: GOLD, bg: 'dark'}),
  cta: () => (
    <Cta>
      <Email w={360} />
    </Cta>
  ),
};

// অফিস, দরকারে অন্ধকার
function R2({dim}: {dim?: boolean}) {
  return <div style={{position: 'absolute', inset: 0, background: dim ? 'linear-gradient(180deg, #141824, #06070b)' : 'linear-gradient(180deg, #2a3446, #121722)'}}>
    <div style={{position: 'absolute', left: 90, top: 330, width: 900, height: 420, background: '#0e1a2c', border: '14px solid #3a4456', borderRadius: 16, opacity: dim ? 0.4 : 1}}>
      {[0, 1, 2, 3].map((i) => <div key={i} style={{margin: '40px 50px 0', height: 22, width: `${80 - i * 15}%`, background: '#2b5fd9', opacity: 0.5, borderRadius: 8}} />)}
    </div>
  </div>;
}

const Thumb: React.FC = () => (
  <PsyThumb l1="রাজপুত্রের ইমেইলে" l2="বানান ভুল ইচ্ছা করে!" bottom="কেন? উত্তর শুনে চমকাবে" term="Microsoft Research" art={<div style={{position: 'absolute', left: 40, top: 860, transform: 'rotate(-6deg)'}}><Email mark w={480} /></div>} size={88} />
);
export const scam = story('scam/', raw, SCENES, Thumb, {logo: 'bba2'});
