import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GREEN, RED, clampOpts, out} from '../biz/art';
import {CAST} from '../common/cast';
import {CtaScene, SP, pick} from '../common/kit';
import {Bolt, Brain, Chip, PROF, Paper, Pop, PsyThumb, S, Stack, Stamp, Word, YOU, Yr, a} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const helplessFallback = makeFallback(segs);

const OLD_SELIG = {...PROF, hair: '#d8d4cc'};

// কার্টুন কুকুর: দাঁড়ানো / শোয়া
const Dog: React.FC<{size?: number; lying?: boolean; flip?: boolean; happy?: boolean; color?: string}> = ({size = 420, lying, flip, happy, color = '#c98a4a'}) => {
  const f = useCurrentFrame();
  const tail = happy ? Math.sin(f / 2) * 18 : 0;
  const breath = lying ? Math.sin(f / 14) * 2 : 0;
  return (
    <svg viewBox="0 0 240 200" width={size} height={(size * 200) / 240} style={{overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined}}>
      {lying ? (
        <g>
          <ellipse cx={120} cy={158 - breath} rx={92} ry={34 + breath} fill={color} stroke="#1b1b1f" strokeWidth={5} />
          <path d="M210 156 C232 160 236 172 226 178" fill="none" stroke={color} strokeWidth={13} strokeLinecap="round" />
          <circle cx={50} cy={150} r={34} fill={color} stroke="#1b1b1f" strokeWidth={5} />
          <path d="M58 120 C80 122 88 160 72 172 C62 164 58 142 52 126Z" fill="#8a5a2a" stroke="#1b1b1f" strokeWidth={4} />
          <path d="M28 146 L44 149" stroke="#1b1b1f" strokeWidth={5} strokeLinecap="round" />
          <ellipse cx={19} cy={160} rx={8} ry={6} fill="#1b1b1f" />
        </g>
      ) : (
        <g>
          <path d={`M196 86 C222 ${70 + tail} 226 ${50 + tail} 222 ${38 + tail}`} fill="none" stroke={color} strokeWidth={13} strokeLinecap="round" />
          <rect x={70} y={120} width={22} height={66} rx={8} fill={color} stroke="#1b1b1f" strokeWidth={5} />
          <rect x={170} y={120} width={22} height={66} rx={8} fill={color} stroke="#1b1b1f" strokeWidth={5} />
          <ellipse cx={130} cy={102} rx={78} ry={42} fill={color} stroke="#1b1b1f" strokeWidth={5} />
          <circle cx={62} cy={72} r={42} fill={color} stroke="#1b1b1f" strokeWidth={5} />
          <path d="M74 32 C100 36 108 84 92 94 C82 86 76 58 68 38Z" fill="#8a5a2a" stroke="#1b1b1f" strokeWidth={4} />
          <circle cx={46} cy={62} r={6} fill="#1b1b1f" />
          <ellipse cx={26} cy={80} rx={10} ry={8} fill="#1b1b1f" />
          <path d={happy ? 'M26 92 C34 106 48 104 54 92' : 'M28 98 C36 92 44 92 52 98'} fill={happy ? '#e0546a' : 'none'} stroke="#1b1b1f" strokeWidth={4} />
        </g>
      )}
    </svg>
  );
};

// দুই ভাগের বাক্স, মাঝে নিচু দেয়াল
const ShuttleBox: React.FC<{left?: React.ReactNode; zap?: boolean; freeGlow?: number; wallH?: number}> = ({left, zap, freeGlow = 0.6, wallH = 170}) => {
  const f = useCurrentFrame();
  return (
    <>
      <div style={{position: 'absolute', left: 540, right: 40, top: 620, height: 800, background: `rgba(95,208,138,${0.18 * freeGlow})`, boxShadow: `inset 0 0 120px rgba(95,208,138,${0.5 * freeGlow})`}} />
      <div style={{position: 'absolute', left: 40, width: 500, top: 620, height: 800, background: zap && Math.floor(f / 5) % 2 ? 'rgba(255,216,74,0.2)' : 'rgba(255,255,255,0.03)'}} />
      <div style={{position: 'absolute', left: 40, right: 40, top: 620, height: 800, border: '12px solid #8e9aa3', boxSizing: 'border-box'}} />
      <div style={{position: 'absolute', left: 40, right: 40, top: 1400, height: 40, background: '#5a6068', border: '6px solid #1b1b1f'}} />
      <div style={{position: 'absolute', left: 515, width: 50, top: 1400 - wallH, height: wallH, background: '#c9c1ae', border: '6px solid #1b1b1f'}} />
      {zap
        ? [90, 280, 440].map((x, i) => (
            <div key={x} style={{position: 'absolute', left: x, top: 880 + (i % 2) * 60, opacity: (f + i * 3) % 9 < 5 ? 1 : 0.15}}>
              <Bolt size={70} />
            </div>
          ))
        : null}
      {left ? <div style={{position: 'absolute', left: 90, top: 1090}}>{left}</div> : null}
    </>
  );
};

const Jumper: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const g = interpolate(f, [dur * 0.2, dur * 0.65], [0, 1], clampOpts);
  return (
    <div style={{position: 'absolute', left: 90 + g * 520, top: 1090 - Math.sin(g * Math.PI) * 340}}>
      <Dog size={380} happy={g >= 1} flip />
    </div>
  );
};

const Zaps: React.FC<{xs: number[]; top: number; step?: number; size?: number}> = ({xs, top, step = 0, size = 110}) => {
  const f = useCurrentFrame();
  return (
    <>
      {xs.map((x, i) => (
        <div key={i} style={{position: 'absolute', left: x, top: top + i * step, opacity: (f + i * 4) % 10 < 5 ? 1 : 0.1}}>
          <Bolt size={size} />
        </div>
      ))}
    </>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  wall: S({
    bg: 'dark',
    title: 'এক লাফেই মুক্তি',
    color: GREEN,
    back: () => <ShuttleBox zap left={<Dog size={380} flip />} />,
    front: () => <div style={{position: 'absolute', left: 660, top: 760, fontSize: 90, fontWeight: 900, color: GREEN}}>মুক্তি</div>,
  }),
  lie: S({bg: 'dark', title: 'একবারও লাফ দিল না', color: RED, at: 0.3, back: () => <ShuttleBox zap left={<Dog size={380} lying flip />} />}),
  job: S({
    bg: 'office',
    actors: [a(YOU, 730, 'sad', 'idle', {h: 1000})],
    front: (f, d) => (
      <>
        <Pop x={60} y={640} at={2} rot={-6}>
          <Paper w={430} title="ইন্টারভিউ" dots={3} size={46} />
        </Pop>
        <Pop x={90} y={980} at={8} rot={5}>
          <Paper w={430} title="ইন্টারভিউ" dots={3} size={46} />
        </Pop>
        <Stamp text="আর আবেদন না" o={out(f, d * 0.55, d * 0.65)} size={78} top={280} />
      </>
    ),
  }),
  biz: S({bg: 'office', actors: [a(YOU, 540, 'sad', 'shrug', {h: 1080, y: 1710})], bubble: '"আমাকে দিয়ে হবে না।"', by: 300, bx: 180, bsize: 70}),
  nobody: S({bg: 'plain', title: 'কেউ বলেনি', color: RED, at: 0.4, actors: [a(CAST.customer2, 170, 'neutral', 'idle', {h: 760, y: 1560}), a(CAST.worker, 910, 'neutral', 'idle', {h: 760, y: 1560}), a(YOU, 540, 'thinking', 'shrug', {h: 1000, y: 1640})]}),
  dogs: S({
    bg: 'plain',
    title: 'কয়েকটা কুকুর',
    back: () => (
      <>
        <Pop x={40} y={640} at={2}>
          <Dog size={480} flip />
        </Pop>
        <Pop x={560} y={640} at={8}>
          <Dog size={480} color="#8a6a4a" flip />
        </Pop>
        <Pop x={300} y={1020} at={14}>
          <Dog size={480} color="#d9b078" flip happy />
        </Pop>
      </>
    ),
  }),
  yr: Yr('১৯৬৭', 'Martin Seligman · University of Pennsylvania'),
  shock: S({
    bg: 'dark',
    title: 'হালকা বৈদ্যুতিক শক',
    color: '#ffd84a',
    back: () => (
      <>
        <Pop x={280} y={800} at={2}>
          <Dog size={520} flip />
        </Pop>
        <Zaps xs={[120, 840, 170, 820]} top={520} step={230} />
      </>
    ),
  }),
  btn: S({
    bg: 'plain',
    title: 'দল ১: বোতাম চাপলেই শক বন্ধ',
    color: GREEN,
    size: 74,
    back: (f) => (
      <>
        <Pop x={70} y={880} at={2}>
          <Dog size={520} flip happy />
        </Pop>
        <div style={{position: 'absolute', left: 690, top: 900, width: 300, height: 300, borderRadius: '50%', background: GREEN, border: '14px solid #1b1b1f', transform: `scale(${f % 30 < 8 ? 0.9 : 1})`, boxShadow: `0 0 60px ${GREEN}`}} />
      </>
    ),
  }),
  nobtn: S({
    bg: 'dark',
    title: 'দল ২: যা-ই করুক, শক থামে না',
    color: RED,
    size: 74,
    back: (f) => (
      <>
        <Pop x={70} y={880} at={2}>
          <Dog size={520} flip />
        </Pop>
        <div style={{position: 'absolute', left: 690, top: 900, width: 300, height: 300, borderRadius: '50%', background: '#5a2a2a', border: '14px solid #1b1b1f', transform: `scale(${f % 20 < 6 ? 0.9 : 1})`}} />
        <Zaps xs={[120, 480, 840]} top={560} />
      </>
    ),
  }),
  box: S({bg: 'dark', title: 'পরদিন: নতুন বাক্স', back: () => <ShuttleBox freeGlow={0} />}),
  wall2: S({
    bg: 'dark',
    title: 'ওপারে কোনো শক নেই',
    color: GREEN,
    back: () => <ShuttleBox zap />,
    front: (f) => (
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <path d="M260 1180 Q540 700 820 1180" fill="none" stroke={GREEN} strokeWidth={14} strokeDasharray="30 20" strokeDashoffset={-f * 3} />
        <path d="M820 1180 L770 1130 M820 1180 L840 1110" stroke={GREEN} strokeWidth={14} strokeLinecap="round" />
      </svg>
    ),
  }),
  jump: ({dur}) => S({bg: 'dark', title: 'দল ১: লাফ দিল, পালিয়ে গেল', color: GREEN, size: 76, back: () => <ShuttleBox />, front: () => <Jumper dur={dur} />})({dur, id: 'jump'}),
  second: Word('দ্বিতীয় দল?', {color: RED, size: 170}),
  lay: S({bg: 'dark', title: 'শুয়ে পড়ল', color: RED, at: 0.2, back: () => <ShuttleBox zap left={<Dog size={380} lying flip />} />}),
  whine: S({
    bg: 'dark',
    back: (f) => (
      <>
        <Pop x={110} y={720} at={2}>
          <Dog size={860} lying flip />
        </Pop>
        <div style={{position: 'absolute', left: 150, top: 620 + Math.sin(f / 8) * 10, fontSize: 96, fontWeight: 800, color: '#cfd6e0', transform: 'rotate(-6deg)'}}>কুঁই... কুঁই...</div>
      </>
    ),
  }),
  free: S({bg: 'dark', title: 'ওপারে মুক্তি', color: GREEN, back: () => <ShuttleBox zap freeGlow={1.4} left={<Dog size={380} lying flip />} />}),
  notry: S({bg: 'dark', back: () => <ShuttleBox zap left={<Dog size={380} lying flip />} />, front: (f) => <Stamp text="চেষ্টাই করল না" o={out(f, 2, 10)} size={104} top={340} />}),
  learned: S({
    bg: 'dark',
    back: () => (
      <Pop x={130} y={800} at={2}>
        <Dog size={800} lying flip />
      </Pop>
    ),
    bubble: '"আমি যা-ই করি, কিছু বদলায় না।"',
    by: 400,
    bsize: 74,
  }),
  humans: S({
    bg: 'office',
    title: 'মানুষেরও প্রায় একই ফল',
    actors: [a(CAST.customer, 660, 'worried', 'idle', {h: 1040})],
    front: (f) => (
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {[0, 1, 2].map((i) => {
          const r = 60 + ((f * 3 + i * 50) % 150);
          return <circle key={i} cx={210} cy={940} r={r} fill="none" stroke={RED} strokeWidth={10} opacity={1 - (r - 60) / 150} />;
        })}
        <rect x={160} y={890} width={100} height={100} rx={14} fill="#22252c" stroke="#1b1b1f" strokeWidth={6} />
      </svg>
    ),
  }),
  brain: S({
    bg: 'office',
    actors: [a(OLD_SELIG, 730, 'surprised', 'explain', {h: 1040, talking: true})],
    front: () => (
      <Pop x={40} y={880} at={4}>
        <Brain size={420} />
      </Pop>
    ),
    bubble: '"আমরা উল্টো বুঝেছিলাম।"',
    by: 300,
    bsize: 70,
  }),
  default: S({
    bg: 'plain',
    title: 'হাল ছাড়া শিখতে হয় না',
    color: RED,
    at: 0.05,
    front: (f, d) => (
      <>
        <Pop x={260} y={480} at={2}>
          <Brain size={560} color="#b98a9a" />
        </Pop>
        <div style={{position: 'absolute', left: 0, right: 0, top: 1060, textAlign: 'center', opacity: out(f, d * 0.45, d * 0.55)}}>
          <Chip size={66}>এটাই শরীরের স্বাভাবিক অবস্থা</Chip>
        </div>
      </>
    ),
  }),
  hope: Word('আশা', {color: GREEN, size: 280, sub: 'এটাই শিখতে হয়', top: 560, bg: 'radial-gradient(ellipse at 50% 55%, #3a5a3a, #07100a 70%)'}),
  change: S({
    bg: 'office',
    title: 'চেষ্টা করলে বদলায়',
    color: GREEN,
    at: 0.3,
    actors: [a(YOU, 300, 'smile', 'pointR', {h: 1000})],
    front: (f, d) => {
      const on = f > d * 0.4;
      return (
        <svg viewBox="0 0 120 160" width={360} height={480} style={{position: 'absolute', left: 620, top: 640, overflow: 'visible', filter: on ? 'drop-shadow(0 0 60px #ffe680)' : undefined}}>
          <path d="M60 6 C24 6 8 36 8 58 C8 84 30 92 34 118 L86 118 C90 92 112 84 112 58 C112 36 96 6 60 6Z" fill={on ? '#ffe680' : '#4a4e58'} stroke="#1b1b1f" strokeWidth={5} />
          <rect x={36} y={118} width={48} height={32} fill="#8e9aa3" stroke="#1b1b1f" strokeWidth={5} />
        </svg>
      );
    },
  }),
  tasks: ({dur}) => S({bg: 'plain', title: 'না পারা অসম্ভব', front: () => <Stack dur={dur} items={['একটা ফোন করা', 'এক পাতা পড়া', 'বিছানা গোছানো']} top={520} size={80} />})({dur, id: 'tasks'}),
  tomorrow: S({
    bg: 'plain',
    title: 'তারপর কাল আরেকটা',
    front: (f, d) => (
      <div style={{position: 'absolute', left: 110, right: 110, top: 480, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26}}>
        {Array.from({length: 12}, (_, i) => {
          const on = f > 4 + (i * d * 0.8) / 12;
          return (
            <div key={i} style={{aspectRatio: '1', background: on ? GREEN : '#2a2d36', border: '6px solid #1b1b1f', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 90, fontWeight: 900, color: '#10301c'}}>
              {on ? '✓' : ''}
            </div>
          );
        })}
      </div>
    ),
  }),
  win: S({bg: 'office', actors: [a(YOU, 540, 'smile', 'thumbsUp', {h: 1060, y: 1710})], bubble: '"আমি কিছু করলে কিছু বদলায়।"', by: 300, bsize: 64}),
  talk: S({bg: 'office', title: 'সেটাও একটা লাফ', color: GREEN, at: 0.45, actors: [a(YOU, 290, 'worried', 'open', {h: 1000, talking: true}), a(CAST.exec, 790, 'smile', 'idle', {h: 980, lookX: -1})]}),
  end: S({
    bg: 'plain',
    title: 'ততটা উঁচু না',
    color: GREEN,
    at: 0.5,
    actors: [a(YOU, 260, 'thinking', 'idle', {h: 1000, lookX: 1})],
    back: (f, d) => {
      const h = interpolate(f, [d * 0.2, d * 0.8], [1200, 220], clampOpts);
      return <div style={{position: 'absolute', left: 560, width: 300, top: 1690 - h, height: h, background: 'repeating-linear-gradient(0deg, #8a5a3c 0 60px, #6a4430 60px 66px)', border: '8px solid #1b1b1f'}} />;
    },
  }),
  cta: () => (
    <CtaScene>
      <Dog size={520} happy flip />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const HelplessThumbnail: React.FC = () => (
  <PsyThumb
    l1="এক লাফেই মুক্তি"
    l2="তবু লাফ দিল না!"
    bottom="তুমিও ঠিক এটাই করছ"
    term="Learned Helplessness"
    glow="rgba(255,216,74,0.25)"
    art={
      <div style={{position: 'absolute', left: -20, top: 900}}>
        <Dog size={640} lying flip />
      </div>
    }
  />
);
export const HelplessVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="helpless/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<HelplessThumbnail />} />;
