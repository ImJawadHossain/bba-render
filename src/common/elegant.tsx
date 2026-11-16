// 48 Laws সিরিজ (Law 6 থেকে): আরও সুন্দর চেহারা। নরম রঙের আভা, ভাসমান আলোর বৃত্ত (bokeh),
// দরকারে পেছনের দৃশ্য ঝাপসা (depth of field), কাচের মতো লেখার প্যানেল, আর নতুন জায়গা ও জিনিস।
import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame} from 'remotion';
import {GOLD, RED, clampOpts} from '../biz/art';
import {SP} from './kit';
import {Sign} from './places';
import {BoardSign} from './places2';
import {Board} from './psy';
import {Bounce} from './reel';

const LINE = '#1b1b1f';
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
    {children}
  </svg>
);

export type Tone = 'warm' | 'cool' | 'dusk' | 'night' | 'gold';
const TONES: Record<Tone, {wash: string; dots: string[]}> = {
  warm: {wash: 'linear-gradient(180deg, rgba(255,196,130,0.38), rgba(140,70,30,0.28))', dots: ['#ffd9a0', '#ffb070', '#fff0c8']},
  cool: {wash: 'linear-gradient(180deg, rgba(140,190,255,0.32), rgba(20,40,90,0.34))', dots: ['#bfe0ff', '#8ac0ff', '#e6f2ff']},
  dusk: {wash: 'linear-gradient(180deg, rgba(150,110,220,0.32), rgba(255,150,100,0.3))', dots: ['#ffc6a0', '#d9b0ff', '#fff0d8']},
  night: {wash: 'linear-gradient(180deg, rgba(40,60,140,0.4), rgba(10,12,30,0.45))', dots: ['#9fb8ff', '#ffd98a', '#c8d6ff']},
  gold: {wash: 'linear-gradient(180deg, rgba(255,215,140,0.34), rgba(60,40,10,0.32))', dots: ['#ffe2a0', '#ffd070', '#fff4d8']},
};

// ভাসমান নরম আলোর বৃত্ত
export const Bokeh: React.FC<{tone?: Tone; n?: number}> = ({tone = 'warm', n = 9}) => {
  const f = useCurrentFrame();
  const c = TONES[tone].dots;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}, (_, i) => {
        const r = 40 + random(`bk${i}`) * 90;
        const x = random(`bx${i}`) * 1080;
        const y = ((random(`by${i}`) * 1920 - f * (0.25 + random(`bs${i}`) * 0.5)) % 1920 + 1920) % 1920;
        return <div key={i} style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: c[i % c.length], opacity: 0.1 + random(`bo${i}`) * 0.12, filter: 'blur(14px)'}} />;
      })}
    </AbsoluteFill>
  );
};

// জায়গাকে নরম করে: blur দিলে পেছনটা ঝাপসা (চরিত্র পরিষ্কার থাকে), সাথে রঙের আভা, ধীরে কাছে আসা আর bokeh
export const Soft: React.FC<{children: React.ReactNode; blur?: number; tone?: Tone; bokeh?: boolean}> = ({children, blur = 0, tone = 'warm', bokeh = true}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#0b0d12'}}>
      <AbsoluteFill style={{filter: blur ? `blur(${blur}px) saturate(0.85) brightness(0.8)` : 'saturate(0.95)', transform: `scale(${1 + blur * 0.008 + Math.min(f, 400) * 0.0001})`}}>{children}</AbsoluteFill>
      <AbsoluteFill style={{background: TONES[tone].wash, mixBlendMode: 'soft-light'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 48%, rgba(5,6,10,0.5) 100%)'}} />
      {bokeh ? <Bokeh tone={tone} /> : null}
    </AbsoluteFill>
  );
};
export const soft = (place: React.ReactNode, blur = 0, tone: Tone = 'warm') => (
  <Soft blur={blur} tone={tone}>
    {place}
  </Soft>
);

// কাচের প্যানেলে বড় লেখা, পেছনে ঝাপসা দৃশ্য
export const Glass =
  (text: string, o: {place?: React.ReactNode; color?: string; size?: number; sub?: string; tone?: Tone; top?: number} = {}): React.FC<SP> =>
  ({dur}) => {
    const f = useCurrentFrame();
    const pop = spring({frame: f - 1, fps: 30, config: {damping: 14, stiffness: 120}});
    const line = interpolate(f, [6, 22], [0, 1], clampOpts);
    const subIn = interpolate(f, [Math.round(dur * 0.3), Math.round(dur * 0.3) + 10], [0, 1], clampOpts);
    return (
      <AbsoluteFill>
        <Soft blur={14} tone={o.tone ?? 'warm'}>
          {o.place ?? <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a1d26, #0b0d12)'}} />}
        </Soft>
        <div style={{position: 'absolute', left: 70, right: 70, top: o.top ?? 560, padding: '60px 50px', textAlign: 'center', background: 'rgba(14,16,24,0.5)', border: '2px solid rgba(255,255,255,0.22)', borderRadius: 44, boxShadow: '0 40px 100px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2)', transform: `scale(${0.92 + 0.08 * pop})`, opacity: pop}}>
          <div style={{fontSize: o.size ?? 90, fontWeight: 800, lineHeight: 1.3, color: o.color ?? '#f6efe2', textShadow: '0 6px 30px rgba(0,0,0,0.5)'}}>{text}</div>
          <div style={{margin: '30px auto 0', width: `${line * 46}%`, height: 6, borderRadius: 3, background: GOLD}} />
          {o.sub ? <div style={{marginTop: 26, fontSize: 56, fontWeight: 700, color: GOLD, opacity: subIn}}>{o.sub}</div> : null}
        </div>
      </AbsoluteFill>
    );
  };

// ---------- জায়গা ----------

// দর্জির দোকান: কাপড়ের থান, ঝোলানো পাঞ্জাবি, আয়না
export const TailorShop: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #6a4a32, #3a2618)'}}>
    <Svg>
      {[420, 640, 860].map((y, r) => (
        <g key={y}>
          {Array.from({length: 8}, (_, i) => (
            <rect key={i} x={60 + i * 122} y={y - 150} width={104} height={150} rx={10} fill={['#7a1f3a', '#1f4a7a', '#d9a21b', '#2a6a4a', '#e8e2d2', '#5a2a6a', '#b0582a', '#14305f'][(i + r * 3) % 8]} stroke={LINE} strokeWidth={4} />
          ))}
          <rect x={40} y={y} width={1000} height={18} fill="#9a7048" stroke={LINE} strokeWidth={4} />
        </g>
      ))}
      {[180, 420, 660, 900].map((x, i) => (
        <g key={x}>
          <line x1={x} x2={x} y1={940} y2={980} stroke="#2a2018" strokeWidth={5} />
          <path d={`M${x - 70} 1000 L${x - 40} 980 L${x + 40} 980 L${x + 70} 1000 L${x + 60} 1240 L${x - 60} 1240Z`} fill={['#f2ede0', '#c9d6e8', '#e8d6b8', '#d6e8d0'][i]} stroke={LINE} strokeWidth={5} />
        </g>
      ))}
      <rect x={0} y={1300} width={1080} height={620} fill="#2a1c12" />
    </Svg>
  </AbsoluteFill>
);

// ফ্ল্যাট বিল্ডিংয়ের সামনে
export const Apartment: React.FC<{night?: boolean}> = ({night}) => (
  <AbsoluteFill style={{background: night ? 'linear-gradient(180deg, #0d1426, #1a2240)' : 'linear-gradient(180deg, #a8cfe8, #e6eef2 70%)'}}>
    <Svg>
      <rect x={160} y={260} width={760} height={1160} fill={night ? '#3a3a44' : '#d8d2c4'} stroke={LINE} strokeWidth={8} />
      {Array.from({length: 6}, (_, r) =>
        [0, 1, 2].map((c) => (
          <g key={`${r}${c}`}>
            <rect x={210 + c * 240} y={300 + r * 180} width={180} height={110} fill={night ? (random(`ap${r}${c}`) > 0.4 ? '#ffd98a' : '#141c32') : '#9ec4dc'} stroke={LINE} strokeWidth={5} />
            <rect x={200 + c * 240} y={410 + r * 180} width={200} height={16} fill="#8a8e96" />
          </g>
        )),
      )}
      <rect x={430} y={1260} width={220} height={160} fill="#4a4e58" stroke={LINE} strokeWidth={6} />
      <rect x={0} y={1420} width={1080} height={500} fill={night ? '#20232e' : '#8a8a82'} />
    </Svg>
  </AbsoluteFill>
);

// গ্রামের উঁচু দেয়ালের বাড়ি
export const Fortress: React.FC<{night?: boolean}> = ({night}) => (
  <AbsoluteFill style={{background: night ? 'linear-gradient(180deg, #070b18, #142040 70%)' : 'linear-gradient(180deg, #8ec2e4, #d8e8ee 60%)'}}>
    <Svg>
      <rect x={300} y={380} width={480} height={420} fill={night ? '#2a2e3a' : '#e8e2d2'} stroke={LINE} strokeWidth={8} />
      <path d="M270 400 L540 250 L810 400Z" fill={night ? '#3a1e1e' : '#9a3a2a'} stroke={LINE} strokeWidth={8} />
      <rect x={0} y={700} width={1080} height={520} fill={night ? '#3a3c46' : '#b8b2a4'} stroke={LINE} strokeWidth={8} />
      {Array.from({length: 30}, (_, i) => (
        <path key={i} d={`M${i * 38} 700 l14 -26 l14 26`} fill="none" stroke="#6e7680" strokeWidth={4} />
      ))}
      <rect x={420} y={880} width={240} height={340} fill="#4a4e58" stroke={LINE} strokeWidth={6} />
      <rect x={0} y={1220} width={1080} height={700} fill={night ? '#1a2a1e' : '#5a9a4a'} />
    </Svg>
  </AbsoluteFill>
);

// বাড়ির দেয়াল, দরকারে ফাটল
export const HouseWall: React.FC<{crack?: boolean; fixed?: boolean}> = ({crack, fixed}) => {
  const f = useCurrentFrame();
  const c = interpolate(f, [4, 30], [0, 1], clampOpts);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #a8cfe8, #e6eef2 60%)'}}>
      <Svg>
        <rect x={140} y={300} width={800} height={1100} fill={fixed ? '#f2ede0' : '#e0d8c6'} stroke={LINE} strokeWidth={8} />
        <rect x={140} y={820} width={800} height={20} fill="#b8b2a4" />
        {[240, 640].map((x) => (
          <g key={x}>
            <rect x={x} y={420} width={200} height={240} fill="#9ec4dc" stroke={LINE} strokeWidth={6} />
            <rect x={x} y={960} width={200} height={240} fill="#9ec4dc" stroke={LINE} strokeWidth={6} />
          </g>
        ))}
        {crack ? <path d="M560 300 L520 420 L580 520 L500 650 L560 760 L470 900" fill="none" stroke="#2a2018" strokeWidth={9} strokeLinecap="round" strokeDasharray={1000} strokeDashoffset={1000 * (1 - c)} /> : null}
        <rect x={0} y={1400} width={1080} height={520} fill="#8a8a82" />
      </Svg>
    </AbsoluteFill>
  );
};

// পাঠাগার: বইয়ের তাক
export const Library: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #5a4030, #2a1c12)'}}>
    <Svg>
      {[460, 700, 940, 1180].map((y, r) => (
        <g key={y}>
          {Array.from({length: 16}, (_, i) => {
            const h = 120 + ((i * 37 + r * 13) % 70);
            return <rect key={i} x={60 + i * 60} y={y - h} width={52} height={h} fill={['#7a1f3a', '#1f4a7a', '#d9a21b', '#2a6a4a', '#5a2a6a', '#b0582a'][(i + r) % 6]} stroke={LINE} strokeWidth={3} />;
          })}
          <rect x={40} y={y} width={1000} height={18} fill="#9a7048" stroke={LINE} strokeWidth={4} />
        </g>
      ))}
      <rect x={0} y={1300} width={1080} height={620} fill="#2a1c12" />
    </Svg>
  </AbsoluteFill>
);

// বিশ্ববিদ্যালয়ের ক্যাম্পাস
export const Campus: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #8ec2e4, #e8eef0 60%)'}}>
    <Svg>
      <rect x={100} y={560} width={880} height={620} fill="#c87a4a" stroke={LINE} strokeWidth={8} />
      {Array.from({length: 3}, (_, r) =>
        Array.from({length: 6}, (_, c) => <rect key={`${r}${c}`} x={150 + c * 140} y={620 + r * 180} width={80} height={110} fill="#9ec4dc" stroke={LINE} strokeWidth={4} />),
      )}
      <path d="M100 560 L540 430 L980 560Z" fill="#a85a3a" stroke={LINE} strokeWidth={8} />
      <rect x={0} y={1180} width={1080} height={740} fill="#5a9a4a" />
    </Svg>
    <Sign text="ঢাকা বিশ্ববিদ্যালয়" bg="#14305f" color="#ffe9a8" y={300} />
  </AbsoluteFill>
);

// জমির নকশা: নিচে রাস্তা, ওপরে প্লট
export const Plots: React.FC<{mark?: boolean}> = ({mark}) => {
  const f = useCurrentFrame();
  const g = 0.5 + 0.5 * Math.abs(Math.sin(f / 8));
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #e8dcc0, #d6c8a4)'}}>
      <Svg>
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => {
            const road = r === 2 && c === 0;
            return <rect key={`${r}${c}`} x={140 + c * 400} y={420 + r * 300} width={380} height={280} fill={road && mark ? `rgba(80,190,110,${0.5 + g * 0.4})` : '#a8c88a'} stroke={LINE} strokeWidth={6} />;
          }),
        )}
        <rect x={0} y={1340} width={1080} height={160} fill="#5a5f6e" />
        <path d="M0 1420 L1080 1420" stroke="#ffd84a" strokeWidth={8} strokeDasharray="50 40" />
      </Svg>
      <div style={{position: 'absolute', left: 140, top: 1530, width: 800, textAlign: 'center', fontSize: 52, fontWeight: 800, color: '#3a2a1a'}}>পাকা রাস্তা</div>
    </AbsoluteFill>
  );
};

// ---------- জিনিস ----------

export const Router: React.FC<{size?: number; dead?: boolean}> = ({size = 420, dead}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 240 160" width={size} height={(size * 160) / 240} style={{overflow: 'visible'}}>
      <path d="M50 70 L30 6 M190 70 L210 6" stroke="#2a2c34" strokeWidth={10} strokeLinecap="round" />
      <rect x={10} y={66} width={220} height={80} rx={18} fill="#e8eaee" stroke={LINE} strokeWidth={6} />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={60 + i * 40} cy={106} r={9} fill={dead ? '#c0304a' : `rgba(60,210,110,${0.4 + 0.6 * Math.abs(Math.sin(f / 4 + i))})`} />
      ))}
    </svg>
  );
};

export const Envelope: React.FC<{size?: number; open?: boolean}> = ({size = 460, open}) => {
  const f = useCurrentFrame();
  const up = open ? interpolate(f, [6, 26], [0, 1], clampOpts) : 0;
  return (
    <svg viewBox="0 0 240 180" width={size} height={size * 0.75} style={{overflow: 'visible'}}>
      <g transform={`translate(0 ${-70 * up})`} opacity={open ? 1 : 0}>
        <rect x={40} y={30} width={160} height={78} rx={4} fill="#7fb98a" stroke="#173b25" strokeWidth={4} />
        <text x={120} y={80} textAnchor="middle" fontSize={34} fontWeight={800} fill="#10301d">৳</text>
      </g>
      <rect x={10} y={60} width={220} height={110} rx={10} fill="#f2e6c8" stroke={LINE} strokeWidth={6} />
      <path d="M10 64 L120 128 L230 64" fill="none" stroke={LINE} strokeWidth={5} />
    </svg>
  );
};

export const Fuchka: React.FC<{size?: number}> = ({size = 360}) => (
  <svg viewBox="0 0 240 150" width={size} height={size * 0.625} style={{overflow: 'visible'}}>
    {[[60, 60], [120, 50], [180, 60], [90, 82], [150, 82]].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={28} fill="#e8b85a" stroke={LINE} strokeWidth={4} />
        <circle cx={x} cy={y - 6} r={9} fill="#8a5a2a" />
      </g>
    ))}
    <ellipse cx={120} cy={110} rx={116} ry={30} fill="#f4f6fa" stroke={LINE} strokeWidth={5} />
  </svg>
);

export const Cards: React.FC<{size?: number}> = ({size = 360}) => (
  <svg viewBox="0 0 240 180" width={size} height={size * 0.75} style={{overflow: 'visible'}}>
    {[-24, -8, 8, 24].map((r, i) => (
      <g key={r} transform={`rotate(${r} 120 170)`}>
        <rect x={80} y={20} width={80} height={120} rx={8} fill="#f6f7f9" stroke={LINE} strokeWidth={4} />
        <text x={96} y={50} fontSize={26} fontWeight={800} fill={i % 2 ? RED : LINE}>{['A', 'K', 'Q', 'J'][i]}</text>
      </g>
    ))}
  </svg>
);

export const Mic: React.FC<{size?: number}> = ({size = 260}) => (
  <svg viewBox="0 0 100 220" width={size * 0.45} height={size} style={{overflow: 'visible'}}>
    <rect x={30} y={10} width={40} height={70} rx={20} fill="#2a2c34" stroke="#8a8e96" strokeWidth={4} />
    <path d="M18 60 Q18 100 50 100 Q82 100 82 60" fill="none" stroke="#6e7680" strokeWidth={6} />
    <line x1={50} y1={100} x2={50} y2={200} stroke="#3a3e48" strokeWidth={8} />
    <rect x={20} y={200} width={60} height={14} rx={7} fill="#3a3e48" />
  </svg>
);

export const Goat: React.FC<{size?: number}> = ({size = 360}) => (
  <svg viewBox="0 0 240 180" width={size} height={size * 0.75} style={{overflow: 'visible'}}>
    {[70, 100, 160, 190].map((x) => (
      <rect key={x} x={x} y={110} width={14} height={60} rx={5} fill="#3a2a1a" />
    ))}
    <ellipse cx={130} cy={100} rx={80} ry={40} fill="#f2ede0" stroke={LINE} strokeWidth={5} />
    <ellipse cx={46} cy={70} rx={30} ry={24} fill="#f2ede0" stroke={LINE} strokeWidth={5} />
    <path d="M40 48 L30 20 M54 48 L60 22" stroke="#8a7a5a" strokeWidth={6} strokeLinecap="round" />
    <circle cx={40} cy={66} r={4} fill={LINE} />
  </svg>
);

// দৃশ্যের ওপর লাফিয়ে আসা একটা লেখার বোর্ড (R-এর over-এ দেওয়ার জন্য)
export const sticker =
  (text: string, o: {x?: number; y?: number; bg?: string; color?: string; size?: number; w?: number; at?: number} = {}) =>
  () => (
    <Bounce x={o.x ?? 160} y={o.y ?? 560} at={o.at ?? 3} seed={text}>
      <BoardSign text={text} bg={o.bg ?? '#14305f'} color={o.color ?? '#ffe9a8'} size={o.size ?? 68} w={o.w ?? 760} />
    </Bounce>
  );
// মাঝখানে বসানো বোর্ড (পরের পর্ব কার্ডের ভেতরে)
export const tag = (text: string, o: {bg?: string; color?: string; size?: number; w?: number} = {}) => (
  <BoardSign text={text} bg={o.bg ?? '#14305f'} color={o.color ?? '#ffe9a8'} size={Math.min(o.size ?? 68, 80)} w={Math.max(o.w ?? 0, 820)} />
);
// যেকোনো জিনিস লাফিয়ে আসে
export const popIn =
  (node: React.ReactNode, x: number, y: number, at = 3) =>
  () => (
    <Bounce x={x} y={y} at={at} seed={`${x}-${y}`}>
      {node}
    </Bounce>
  );
// ক্লাসরুম, বোর্ডে লেখা
export const SchoolRoom: React.FC<{board?: string; lines?: string[]}> = ({board, lines}) => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #4a5a4e, #2a332c)'}}>
    {board || lines ? <Board text={board} lines={lines} top={300} size={64} h={420} /> : null}
  </AbsoluteFill>
);

export const Banner: React.FC<{text: string; sub?: string; w?: number}> = ({text, sub, w = 860}) => (
  <div style={{width: w, padding: '22px 30px', textAlign: 'center', background: 'linear-gradient(180deg, #d42a3a, #9a1624)', border: `6px solid ${GOLD}`, borderRadius: 10, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', color: '#fff', fontWeight: 900}}>
    <div style={{fontSize: 74, lineHeight: 1.1}}>{text}</div>
    {sub ? <div style={{fontSize: 52, color: '#ffe9a8', marginTop: 8}}>{sub}</div> : null}
  </div>
);
