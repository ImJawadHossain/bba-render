import React from 'react';
import {interpolate} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, clampOpts, out} from '../biz/art';
import {CtaScene, SP, pick} from '../common/kit';
import {Bars, Chip, Icons, PROF, Pop, PsyThumb, S, Stamp, Word, YOU, a} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const decoyFallback = makeFallback(segs);

const Popcorn: React.FC<{size?: number; label?: string; color?: string}> = ({size = 300, label, color = RED}) => (
  <div style={{position: 'relative', width: size, height: size * 1.35, textAlign: 'center'}}>
    <svg viewBox="0 0 100 135" width={size} height={size * 1.35} style={{overflow: 'visible', filter: 'drop-shadow(0 14px 26px rgba(0,0,0,0.5))'}}>
      {[[20, 26], [38, 18], [58, 20], [78, 28], [30, 36], [50, 32], [70, 38], [12, 40], [88, 42]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={12} fill="#fff3c4" stroke="#c9a84a" strokeWidth={2} />
      ))}
      <path d="M8 42 L92 42 L80 132 L20 132Z" fill="#f2efe9" stroke="#1b1b1f" strokeWidth={4} />
      {[20, 42, 64].map((x) => (
        <path key={x} d={`M${x} 42 L${x + 14} 42 L${x + 11} 132 L${x + 3} 132Z`} fill={color} />
      ))}
    </svg>
    {label ? <div style={{position: 'absolute', left: -40, right: -40, top: '104%', fontSize: size * 0.2, fontWeight: 900, color: GOLD}}>{label}</div> : null}
  </div>
);

const SIZES = [
  {x: 40, y: 960, s: 170, p: '২০০'},
  {x: 300, y: 790, s: 300, p: '৪৫০'},
  {x: 680, y: 720, s: 350, p: '৫০০'},
];
const Three: React.FC<{hi?: number; dim?: number}> = ({hi, dim}) => (
  <>
    {SIZES.map((v, i) => (
      <Pop key={v.p} x={v.x} y={v.y} at={2 + i * 7}>
        <div style={{opacity: dim === i ? 0.35 : 1, filter: hi === i ? 'drop-shadow(0 0 40px #ffe680)' : undefined}}>
          <Popcorn size={v.s} label={`${v.p} টাকা`} />
        </div>
      </Pop>
    ))}
  </>
);

// The Economist-এর তিন অপশন
const OPTS = [
  {t: 'শুধু অনলাইন', p: '$৫৯'},
  {t: 'শুধু ছাপা', p: '$১২৫'},
  {t: 'অনলাইন + ছাপা', p: '$১২৫'},
];
const OptCard: React.FC<{i: number; top: number; at?: number; gone?: number; hi?: boolean}> = ({i, top, at = 2, gone = 0, hi}) => (
  <Pop x={90} y={top} at={at}>
    <div style={{width: 900, padding: '26px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: hi ? '#f2e2a8' : '#f6f2e8', border: `10px solid ${hi ? GOLD : '#1b1b1f'}`, borderRadius: 22, color: '#15151b', fontWeight: 900, fontSize: 64, opacity: 1 - gone, boxSizing: 'border-box'}}>
      <span>{OPTS[i].t}</span>
      <span style={{fontSize: 80, color: RED}}>{OPTS[i].p}</span>
    </div>
  </Pop>
);
const Magazine: React.FC<{w?: number}> = ({w = 280}) => (
  <div style={{width: w, height: w * 1.3, background: '#c8202c', border: '8px solid #1b1b1f', color: '#fff', fontWeight: 900, fontSize: w * 0.15, padding: w * 0.07, boxSizing: 'border-box', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', lineHeight: 1.1}}>
    The Economist
    <div style={{marginTop: w * 0.1, height: w * 0.08, background: '#fff'}} />
    <div style={{marginTop: w * 0.06, height: w * 0.08, background: '#fff', width: '70%'}} />
  </div>
);

const Tag: React.FC<{cut?: number}> = ({cut = 0}) => (
  <div style={{position: 'relative', width: 760, padding: '36px 40px', background: '#f6f2e8', border: '12px solid #1b1b1f', borderRadius: 26, textAlign: 'center', color: '#15151b', fontWeight: 900, boxSizing: 'border-box', boxShadow: '0 24px 50px rgba(0,0,0,0.5)'}}>
    <div style={{position: 'relative', display: 'inline-block', fontSize: 110, color: '#6a6a6a'}}>
      ৫,০০০ টাকা
      <div style={{position: 'absolute', left: -10, top: '52%', height: 16, width: `${cut * 104}%`, background: RED, transform: 'rotate(-5deg)'}} />
    </div>
    <div style={{fontSize: 130, color: RED, opacity: cut, whiteSpace: 'nowrap'}}>২,০০০ টাকা</div>
  </div>
);

const Stake: React.FC<{h?: number}> = ({h = 460}) => (
  <svg viewBox="0 0 100 300" width={h / 3} height={h} style={{overflow: 'visible'}}>
    <path d="M30 10 L70 10 L70 240 L50 296 L30 240Z" fill="#8a5a3c" stroke="#1b1b1f" strokeWidth={6} />
  </svg>
);

const SCENES: Record<string, React.FC<SP>> = {
  hook1: S({bg: 'plain', title: 'কেউ কেনে না, তবু সবচেয়ে বড় বিক্রেতা', size: 70, front: (f, d) => <><Three /><Stamp text="কেউ কেনে না" o={out(f, d * 0.4, d * 0.52)} size={68} top={560} /></>}),
  hook2: S({bg: 'plain', title: 'গত সপ্তাহে তোমাকেও', color: RED, actors: [a(YOU, 540, 'shocked', 'hold', {h: 1060, y: 1710, holding: <g transform="translate(-55 -80) scale(0.9)"><rect width={120} height={70} rx={6} fill="#6ab07a" stroke="#1b1b1f" strokeWidth={5} /></g>})]}),
  cine: S({bg: 'linear-gradient(180deg, #3a1420, #16080c)', title: 'সিনেমা হলে পপকর্ন', front: () => <Pop x={340} y={640} at={2}><Popcorn size={400} /></Pop>}),
  sizes: S({bg: 'plain', title: 'তিনটা সাইজ', front: () => <Three />}),
  calc: S({bg: 'plain', front: (f, d) => <><Three hi={2} /><Pop x={300} y={280} at={d * 0.3}><Chip size={72} bg={GREEN}>মাত্র ৫০ টাকা বেশি!</Chip></Pop></>}),
  took: S({bg: 'plain', actors: [a(YOU, 300, 'laugh', 'thumbsUp', {h: 1040})], title: 'বড়টা নিলে', front: () => <Pop x={600} y={700} at={4}><Popcorn size={380} /></Pop>}),
  think: S({bg: 'plain', title: 'মাঝারিটা কেনার জন্য না!', color: RED, front: () => <Three dim={1} hi={2} />}),
  push: S({bg: 'plain', title: 'শুধু বড়টার দিকে ঠেলতে', color: RED, front: (f) => <><Three hi={2} /><svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}><path d={`M${460 + Math.sin(f / 5) * 16} 700 L${660 + Math.sin(f / 5) * 16} 620`} stroke={RED} strokeWidth={22} strokeLinecap="round" /><path d={`M${660 + Math.sin(f / 5) * 16} 620 L${590 + Math.sin(f / 5) * 16} 600 M${660 + Math.sin(f / 5) * 16} 620 L${620 + Math.sin(f / 5) * 16} 680`} stroke={RED} strokeWidth={22} strokeLinecap="round" /></svg></>}),
  ariely: S({bg: 'office', actors: [a({...PROF, hair: '#2a1a12', hairStyle: 'curly', beard: true}, 740, 'surprised', 'pointL', {h: 1040, talking: true})], name: ['Dan Ariely', 'MIT · প্রফেসর'], front: () => <Pop x={70} y={720} at={4} rot={-5}><Magazine w={360} /></Pop>}),
  o1: S({bg: 'plain', title: 'তিনটা অপশন', front: () => <OptCard i={0} top={500} />}),
  o2: S({bg: 'plain', title: 'তিনটা অপশন', front: () => <><OptCard i={0} top={500} at={-20} /><OptCard i={1} top={740} /></>}),
  o3: S({bg: 'plain', title: 'তিনটা অপশন', front: () => <><OptCard i={0} top={500} at={-20} /><OptCard i={1} top={740} at={-20} /><OptCard i={2} top={980} hi /></>}),
  mid: S({bg: 'plain', title: 'মাঝেরটা কে নেবে?', color: RED, front: (f) => <><OptCard i={0} top={500} at={-20} /><OptCard i={1} top={740} at={-20} /><OptCard i={2} top={980} at={-20} /><div style={{position: 'absolute', left: 490, top: 1200, fontSize: 200, fontWeight: 900, color: RED, transform: `rotate(${Math.sin(f / 6) * 12}deg)`}}>?</div></>}),
  shown: S({bg: 'plain', title: '১০০ জন ছাত্র', front: () => <Icons total={100} n={100} color="#cfd6e0" cols={10} w={50} top={440} />}),
  res: Bars([{label: 'শুধু অনলাইন', value: '১৬ জন', pct: 16, color: '#8e9aa3'}, {label: 'শুধু ছাপা', value: '০ জন', pct: 0, color: RED}, {label: 'দুটোই', value: '৮৪ জন', pct: 84, color: GREEN}], {title: 'ফল', top: 380, gap: 320}),
  remove: S({bg: 'plain', title: 'মাঝেরটা সরিয়ে দিলেন', color: RED, front: (f, d) => <><OptCard i={0} top={500} at={-20} /><OptCard i={1} top={740} at={-20} gone={out(f, d * 0.2, d * 0.6)} /><OptCard i={2} top={980} at={-20} /></>}),
  same: Word('কিছু বদলানোর কথা না', {size: 130, color: '#cfd6e0'}),
  flip: Word('ফল উল্টে গেল!', {size: 160, color: RED}),
  res2: Bars([{label: 'সস্তাটা', value: '৬৮ জন', pct: 68, color: GOLD}, {label: 'দামিটা', value: 'মাত্র ৩২ জন', pct: 32, color: RED}], {title: 'মাঝেরটা ছাড়া'}),
  triple: S({bg: 'plain', title: 'প্রায় তিনগুণ বিক্রি!', color: GREEN, front: (f, d) => { const g = interpolate(f, [0, d * 0.7], [0, 1], clampOpts); return <><div style={{position: 'absolute', left: 170, bottom: 480, width: 300, height: 300, background: '#8e9aa3', border: '8px solid #1b1b1f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110, fontWeight: 900, color: '#15151b'}}>৩২</div><div style={{position: 'absolute', left: 610, bottom: 480, width: 300, height: 300 + 560 * g, background: GREEN, border: '8px solid #1b1b1f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110, fontWeight: 900, color: '#10301c'}}>৮৪</div></>; }}),
  cut: S({bg: 'plain', front: (f, d) => <div style={{position: 'absolute', left: 160, top: 560}}><Tag cut={out(f, d * 0.15, d * 0.45)} /></div>, actors: [], title: '৩,০০০ টাকা বাঁচল!', color: GREEN, at: 0.6}),
  never: S({bg: 'plain', front: (f, d) => <><div style={{position: 'absolute', left: 160, top: 560}}><Tag cut={1} /></div><Stamp text="কখনো দামই ছিল না" o={out(f, d * 0.2, d * 0.32)} size={72} top={1120} /></>}),
  anchor: S({bg: 'plain', title: 'Anchoring', color: GOLD, size: 120, actors: [a(YOU, 300, 'thinking', 'idle', {h: 1100, y: 1760})], front: (f, d) => <><div style={{position: 'absolute', left: 620, top: 500 + out(f, 2, d * 0.4) * 180}}><Stake h={520} /></div><Pop x={570} y={1230} at={d * 0.4}><Chip size={70}>৫,০০০ টাকা</Chip></Pop></>}),
  compare: S({bg: 'plain', title: 'আসল দাম জানি না, শুধু তুলনা', size: 70, front: () => <><Pop x={150} y={700} at={2}><Popcorn size={270} /></Pop><div style={{position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center', fontSize: 170, fontWeight: 900, color: GOLD}}>VS</div><Pop x={660} y={700} at={8}><Popcorn size={270} color="#2f5a9a" /></Pop></>}),
  arrange: Word('যে তুলনা সাজায়, সিদ্ধান্ত তারই', {size: 124, color: GOLD}),
  cover: S({bg: 'plain', title: 'পাশের দাম ঢেকে ফেলো', color: GREEN, front: (f, d) => { const g = out(f, d * 0.1, d * 0.5); return <><Three /><div style={{position: 'absolute', left: 20, top: 700, width: 620 * g, height: 760, background: '#23262e', border: g > 0.02 ? '8px solid #3a3e48' : undefined, borderRadius: 24}} /></>; }}),
  ask: S({bg: 'office', actors: [a(YOU, 540, 'thinking', 'think', {h: 1060, y: 1710})], bubble: '"এই একটাই থাকলে, এই দামে নিতাম?"', by: 300, bsize: 60}),
  biz: S({bg: 'plain', title: 'ব্যবসায়: তিনটা প্যাকেজ', color: GREEN, front: () => <>{[['সাধারণ', 170, '#8e9aa3'], ['মাঝের', 170, '#5a6068'], ['সেরা', 240, GREEN]].map(([t, h, c], i) => <Pop key={String(t)} x={60 + i * 330} y={i === 2 ? 620 : 700} at={2 + i * 8}><div style={{width: 300, height: Number(h) * 3, background: String(c), border: '8px solid #1b1b1f', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 70, fontWeight: 900, color: '#15151b', boxShadow: i === 2 ? `0 0 60px ${GREEN}` : undefined}}>{t}</div></Pop>)}</>}),
  cta: () => (
    <CtaScene>
      <Popcorn size={320} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const DecoyThumbnail: React.FC = () => (
  <PsyThumb
    l1="যে জিনিসটা কেউ কেনে না"
    l2="সেটাই বড় বিক্রেতা!"
    bottom="তোমার পকেট কাটছে এভাবে"
    term="Decoy Effect · Anchoring"
    glow="rgba(224,36,60,0.3)"
    art={<div style={{position: 'absolute', left: 50, top: 780}}><Popcorn size={470} /></div>}
    size={88}
  />
);
export const DecoyVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="decoy/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<DecoyThumbnail />} />;
