// Milgram ভিডিওর চরিত্র, ল্যাব আর শক মেশিন
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {PersonProps} from '../art';

export const BG = '#0a0d0c';
export const FG = '#f2efe9';
export const RED = '#e0243c';
export const GOLD = '#e3bf7a';
export const STEEL = '#8e9aa3';

type Look = Omit<PersonProps, 'height'>;

// গবেষক: ধূসর ল্যাব কোট, চশমা
export const EXPERIMENTER: Look = {hairStyle: 'short', hair: '#17110d', skin: '#e2b391', top: '#c9ced3', bottom: '#2a2c30', labCoat: true, glasses: true};
// শিক্ষক (আসল অংশগ্রহণকারী): স্যুট-টাই
export const TEACHER: Look = {hairStyle: 'short', hair: '#5a4636', skin: '#dcaa88', top: '#4a4f5a', bottom: '#2b2e35', tie: '#7a2a2a'};
// ছাত্র (অভিনেতা)
export const LEARNER: Look = {hairStyle: 'bald', hair: '#6a5a4a', skin: '#e6b896', top: '#6a6f5a', bottom: '#33352e', tie: '#3a4a6a'};
export const MILGRAM: Look = {hairStyle: 'short', hair: '#1a120e', skin: '#e0b090', top: '#2f3440', bottom: '#22252c', tie: '#1b1d22'};

export const PARTICIPANTS: Look[] = [
  {hairStyle: 'short', hair: '#2a1d17', skin: '#d9a785', top: '#3d4a5c', bottom: '#23252c', tie: '#2a2a40'}, // কেরানি
  {hairStyle: 'bald', hair: '#7a6a5a', skin: '#e0b090', top: '#6a5440', bottom: '#2b2620', glasses: true}, // শিক্ষক
  {hairStyle: 'short', hair: '#3a2a1e', skin: '#c99271', top: '#2f3138', bottom: '#1c1d22', tie: '#8a2a2a'}, // সেলসম্যান
];

// ---------- ল্যাবের ঘর ----------

export const LabRoom: React.FC<{red?: number; light?: number}> = ({red = 0, light = 1}) => {
  const f = useCurrentFrame();
  const hum = 0.96 + 0.04 * Math.sin(f * 1.7);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2b3936 0%, #1c2624 62%, #121816 100%)'}} />
      {/* দেয়ালের প্যানেল */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{position: 'absolute', left: 30 + i * 214, top: 330, width: 190, height: 860, border: '3px solid rgba(255,255,255,0.04)', borderRadius: 6}} />
      ))}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1240, height: 14, background: '#141b19'}} />
      {/* মেঝের টাইল */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1254,
          bottom: 0,
          background: 'repeating-linear-gradient(90deg, #262a26 0 118px, #1f231f 118px 120px), linear-gradient(180deg, #2a2e2a, #121412)',
          backgroundBlendMode: 'multiply',
        }}
      />
      {/* ফ্লুরোসেন্ট বাতি */}
      <div style={{position: 'absolute', left: 290, width: 500, top: 70, height: 26, borderRadius: 8, background: `rgba(235,250,245,${0.9 * light * hum})`, boxShadow: `0 0 80px rgba(200,255,240,${0.6 * light})`}} />
      <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 1100px at 50% 8%, rgba(210,255,240,${0.16 * light}), rgba(0,0,0,0) 70%)`}} />
      <AbsoluteFill style={{background: `rgba(160,0,20,${0.35 * red})`, mixBlendMode: 'multiply'}} />
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 50%, rgba(224,36,60,0) 40%, rgba(224,36,60,${0.4 * red}) 100%)`}} />
    </AbsoluteFill>
  );
};

// ---------- শক মেশিন ----------

export const GROUPS = ['SLIGHT SHOCK', 'MODERATE SHOCK', 'STRONG SHOCK', 'VERY STRONG SHOCK', 'INTENSE SHOCK', 'EXTREME INTENSITY SHOCK', 'DANGER: SEVERE SHOCK', 'XXX'];
export const VOLTS = Array.from({length: 30}, (_, i) => (i + 1) * 15);

// lit = কয়টা সুইচ চাপা হয়েছে (০..৩০); glowFrom = যেখান থেকে লাল আভা
export const Switchboard: React.FC<{lit?: number; width?: number; xxxGlow?: number; style?: React.CSSProperties}> = ({lit = 0, width = 1000, xxxGlow = 0, style}) => {
  const f = useCurrentFrame();
  const x0 = 48;
  const step = 30.6;
  const needle = -60 + (Math.min(lit, 30) / 30) * 120;
  return (
    <svg viewBox="0 0 1000 400" width={width} height={width * 0.4} style={{overflow: 'visible', ...style}}>
      <defs>
        <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d666d" />
          <stop offset="1" stopColor="#3b4248" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1000} height={400} rx={18} fill="#22272b" />
      <rect x={12} y={12} width={976} height={376} rx={12} fill="url(#panel)" />
      <text x={40} y={58} fill="#e8e4d8" fontSize={22} fontFamily="Arial" fontWeight={700} letterSpacing={2}>
        SHOCK GENERATOR, TYPE ZLB
      </text>
      <text x={40} y={84} fill="#c8c4b8" fontSize={13} fontFamily="Arial" letterSpacing={1}>
        OUTPUT 15 VOLTS – 450 VOLTS
      </text>
      {/* ভোল্টমিটার */}
      <g transform="translate(880 92)">
        <path d="M-70 0 A70 70 0 0 1 70 0" fill="#efe9d8" stroke="#22272b" strokeWidth={4} />
        <path d="M-50 -10 A55 55 0 0 1 50 -10" stroke={RED} strokeWidth={6} fill="none" strokeDasharray="0 70 200" />
        <line x1={0} y1={0} x2={0} y2={-58} stroke="#1a1a1a" strokeWidth={3} transform={`rotate(${needle})`} />
        <circle r={6} fill="#1a1a1a" />
      </g>
      {VOLTS.map((v, i) => {
        const x = x0 + i * step + step / 2 - 4;
        const on = i < lit;
        const xxx = i >= 28;
        const pulse = xxx && xxxGlow > 0 ? 0.6 + 0.4 * Math.sin(f / 3) : 0;
        return (
          <g key={v} transform={`translate(${x} 0)`}>
            <circle cy={150} r={9} fill={on ? '#ff3b4a' : '#2a1014'} style={{filter: on ? 'drop-shadow(0 0 8px #ff3b4a)' : undefined}} />
            <rect x={-10} y={176} width={20} height={44} rx={4} fill="#1d2125" />
            <rect x={-6} y={on ? 200 : 180} width={12} height={16} rx={3} fill={on ? '#c9ced3' : '#9aa3aa'} />
            <text y={244} textAnchor="middle" fill="#efe9d8" fontSize={10.5} fontFamily="Arial">
              {v}
            </text>
            {xxx ? <rect x={-14} y={130} width={28} height={124} rx={6} fill="none" stroke={RED} strokeWidth={3} opacity={xxxGlow * pulse} /> : null}
          </g>
        );
      })}
      {GROUPS.map((g, i) => {
        const span = i < 7 ? 4 : 2;
        const x = x0 + i * 4 * step;
        const w = span * step;
        return (
          <g key={g}>
            <line x1={x + 4} x2={x + w - 4} y1={262} y2={262} stroke="#efe9d8" strokeWidth={2} />
            <text x={x + w / 2} y={286} textAnchor="middle" fill={i >= 6 ? '#ff6a76' : '#efe9d8'} fontSize={i === 7 ? 22 : 9.5} fontWeight={700} fontFamily="Arial">
              {g}
            </text>
          </g>
        );
      })}
      <text x={500} y={360} textAnchor="middle" fill="#9aa3aa" fontSize={12} fontFamily="Arial" letterSpacing={3}>
        DYSON INSTRUMENT COMPANY · WALTHAM, MASS.
      </text>
    </svg>
  );
};

// ---------- চেয়ারে বাঁধা ছাত্র ----------

export const SeatedLearner: React.FC<{height?: number; strapped?: number; smile?: boolean; standing?: number; style?: React.CSSProperties}> = ({
  height = 700,
  strapped = 1,
  smile = false,
  standing = 0,
  style,
}) => {
  const L = LEARNER;
  const up = standing * 90;
  return (
    <svg viewBox="0 0 400 560" width={(height * 400) / 560} height={height} style={{overflow: 'visible', ...style}}>
      {/* চেয়ার */}
      <rect x={90} y={120} width={220} height={260} rx={14} fill="#5a3b22" />
      <rect x={70} y={330} width={260} height={40} rx={8} fill="#6b4628" />
      <rect x={80} y={370} width={22} height={180} fill="#4a301b" />
      <rect x={298} y={370} width={22} height={180} fill="#4a301b" />
      <rect x={40} y={300} width={70} height={22} rx={6} fill="#6b4628" />
      <rect x={290} y={300} width={70} height={22} rx={6} fill="#6b4628" />
      <g transform={`translate(0 ${-up})`}>
        {/* পা */}
        <path d="M150 360 L190 360 L186 540 L148 540Z" fill={L.bottom} />
        <path d="M210 360 L250 360 L252 540 L214 540Z" fill={L.bottom} />
        {/* শরীর */}
        <path d="M128 200 C150 182 250 182 272 200 C282 260 280 320 270 372 L130 372 C120 320 118 260 128 200Z" fill={L.top} />
        <path d="M184 190 L200 222 L216 190Z" fill="#f2f2ee" />
        <path d="M196 196 L204 196 L208 260 L200 272 L192 260Z" fill={L.tie} />
        {/* হাত হাতলের ওপর */}
        <path d="M134 210 C110 240 92 280 82 304" stroke={L.top} strokeWidth={30} strokeLinecap="round" fill="none" />
        <path d="M266 210 C290 240 308 280 318 304" stroke={L.top} strokeWidth={30} strokeLinecap="round" fill="none" />
        <circle cx={76} cy={308} r={16} fill={L.skin} />
        <circle cx={324} cy={308} r={16} fill={L.skin} />
        {/* গলা ও মাথা */}
        <rect x={188} y={150} width={24} height={40} fill={L.skin} />
        <ellipse cx={200} cy={118} rx={44} ry={52} fill={L.skin} />
        <path d="M158 104 C160 78 240 78 242 104" stroke={L.hair} strokeWidth={10} fill="none" />
        <circle cx={184} cy={120} r={4} fill="#1a1210" />
        <circle cx={216} cy={120} r={4} fill="#1a1210" />
        <path d="M174 104 L192 102 M208 102 L226 104" stroke="#3a2a20" strokeWidth={3.5} strokeLinecap="round" />
        {smile ? (
          <path d="M184 142 Q200 158 216 142" stroke="#7a3d33" strokeWidth={4} fill="none" strokeLinecap="round" />
        ) : (
          <path d="M188 146 Q200 150 212 146" stroke="#7a3d33" strokeWidth={4} fill="none" strokeLinecap="round" />
        )}
      </g>
      {/* বেল্ট ও ইলেকট্রোড */}
      <g opacity={strapped}>
        <rect x={52} y={296} width={52} height={14} rx={3} fill="#2a1e14" />
        <rect x={296} y={296} width={52} height={14} rx={3} fill="#2a1e14" />
        <rect x={68} y={292} width={18} height={22} rx={3} fill="#b8bfc6" />
        <path d="M77 292 C60 240 30 200 -40 190" stroke="#c0392b" strokeWidth={5} fill="none" />
      </g>
    </svg>
  );
};

// ---------- টেপ রেকর্ডার ----------

export const TapeRecorder: React.FC<{size?: number}> = ({size = 300}) => {
  const f = useCurrentFrame();
  const reel = (cx: number) => (
    <g transform={`translate(${cx} 70) rotate(${f * 6})`}>
      <circle r={38} fill="#2a2a2e" />
      <circle r={30} fill="#5a4636" />
      {[0, 120, 240].map((a) => (
        <circle key={a} r={6} cy={-16} fill="#1a1a1a" transform={`rotate(${a})`} />
      ))}
      <circle r={7} fill="#c9ced3" />
    </g>
  );
  return (
    <svg viewBox="0 0 260 180" width={size} height={(size * 180) / 260}>
      <rect x={0} y={10} width={260} height={160} rx={14} fill="#3b4248" />
      <rect x={14} y={24} width={232} height={92} rx={8} fill="#1d2125" />
      {reel(70)}
      {reel(190)}
      <path d="M70 108 L190 108" stroke="#5a4636" strokeWidth={4} />
      {[40, 90, 140, 190].map((x) => (
        <rect key={x} x={x} y={132} width={30} height={22} rx={4} fill="#9aa3aa" />
      ))}
    </svg>
  );
};

// ---------- কথার বেলুন ----------

export const Bubble: React.FC<{children: React.ReactNode; color?: string; text?: string; size?: number; tail?: 'left' | 'right' | 'down'; style?: React.CSSProperties}> = ({
  children,
  color = '#f2efe9',
  text = '#15151b',
  size = 64,
  tail = 'down',
  style,
}) => (
  <div style={{position: 'relative', display: 'inline-block', ...style}}>
    <div style={{background: color, color: text, fontSize: size, fontWeight: 700, padding: '28px 44px', borderRadius: 40, lineHeight: 1.3, boxShadow: '0 20px 60px rgba(0,0,0,0.5)'}}>{children}</div>
    <div
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        borderLeft: '26px solid transparent',
        borderRight: '26px solid transparent',
        borderTop: `40px solid ${color}`,
        bottom: -36,
        left: tail === 'left' ? 60 : tail === 'right' ? undefined : '50%',
        right: tail === 'right' ? 60 : undefined,
        transform: tail === 'down' ? 'translateX(-50%)' : undefined,
      }}
    />
  </div>
);

// ছোট মানুষের আইকন (পরিসংখ্যানের জন্য)
export const PersonIcon: React.FC<{color: string; size?: number}> = ({color, size = 80}) => (
  <svg viewBox="0 0 40 60" width={size * 0.67} height={size}>
    <circle cx={20} cy={12} r={10} fill={color} />
    <path d="M4 58 C4 34 8 26 20 26 C32 26 36 34 36 58Z" fill={color} />
  </svg>
);

export const YaleBuilding: React.FC<{width?: number}> = ({width = 900}) => (
  <svg viewBox="0 0 900 600" width={width} height={(width * 600) / 900}>
    <g fill="#141a22">
      <rect x={60} y={300} width={780} height={300} />
      <path d="M380 300 L380 120 L420 70 L450 0 L480 70 L520 120 L520 300Z" />
      {[60, 170, 730, 820].map((x) => (
        <path key={x} d={`M${x} 300 L${x} 220 L${x + 10} 200 L${x + 20} 220 L${x + 20} 300Z`} />
      ))}
      {[120, 200, 280, 600, 680, 760].map((x) => (
        <path key={x} d={`M${x - 30} 300 L${x - 30} 260 L${x} 230 L${x + 30} 260 L${x + 30} 300Z`} />
      ))}
    </g>
    {[110, 190, 270, 600, 680, 760].map((x) =>
      [360, 460].map((y) => <path key={`${x}${y}`} d={`M${x - 14} ${y + 50} L${x - 14} ${y + 12} Q${x} ${y - 6} ${x + 14} ${y + 12} L${x + 14} ${y + 50}Z`} fill="#e3bf7a" opacity={0.75} />),
    )}
    <path d="M430 260 L430 200 Q450 176 470 200 L470 260Z" fill="#e3bf7a" opacity={0.85} />
    <path d="M410 600 L410 470 Q450 420 490 470 L490 600Z" fill="#e3bf7a" opacity={0.5} />
  </svg>
);
