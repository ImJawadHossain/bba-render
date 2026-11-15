// ব্যবসার গল্পের সাধারণ উপাদান: অফিস, দোকান, ক্যান, চার্ট, টাকা
import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame} from 'remotion';
import {PersonProps} from '../art';

export const BG = '#0b0d12';
export const FG = '#f2efe9';
export const RED = '#e0243c';
export const GOLD = '#e3bf7a';
export const GREEN = '#5fd08a';
export const BLUE = '#2b5fd9';
export const NFX = '#e50914'; // Netflix-এর লাল

type Look = Omit<PersonProps, 'height'>;
export const HASTINGS: Look = {hairStyle: 'short', hair: '#6b4a2a', skin: '#efc6a6', top: '#3a4a5a', bottom: '#2a2c30'};
export const RANDOLPH: Look = {hairStyle: 'short', hair: '#4a3a2a', skin: '#e0b090', top: '#5a5040', bottom: '#2a2620', glasses: true};
export const ANTIOCO: Look = {hairStyle: 'short', hair: '#9a9590', skin: '#d9a785', top: '#22262e', bottom: '#1a1c22', tie: '#2b4fa0'};
export const GOIZUETA: Look = {hairStyle: 'short', hair: '#1a1410', skin: '#dcaa88', top: '#262a32', bottom: '#1c1e24', tie: '#a01a2a', glasses: true};
export const KEOUGH: Look = {hairStyle: 'short', hair: '#e8e4dc', skin: '#efc6a6', top: '#2f3440', bottom: '#22252c', tie: '#5a2a2a'};

export const clampOpts = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const out = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clampOpts, easing: Easing.out(Easing.cubic)});
export const inOut = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clampOpts, easing: Easing.inOut(Easing.cubic)});

export const Title: React.FC<{children: React.ReactNode; top?: number; size?: number; color?: string; opacity?: number}> = ({children, top = 180, size = 96, color = FG, opacity = 1}) => (
  <div style={{position: 'absolute', top, left: 40, right: 40, textAlign: 'center', fontSize: size, fontWeight: 800, color, opacity, lineHeight: 1.2, textShadow: '0 6px 30px rgba(0,0,0,0.85)'}}>{children}</div>
);

// ---------- পটভূমি ----------

// কর্পোরেট অফিস: জানালায় রাতের শহর
export const Office: React.FC<{tint?: string; light?: number}> = ({tint, light = 1}) => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1c2230 0%, #141924 65%, #0c0f15 100%)'}} />
    <div style={{position: 'absolute', left: 80, right: 80, top: 160, height: 900, background: 'linear-gradient(180deg, #0d1626, #1a2a44)', border: '14px solid #2a3140', overflow: 'hidden'}}>
      {Array.from({length: 18}, (_, i) => {
        const h = 200 + random(`b${i}`) * 420;
        const w = 50 + random(`w${i}`) * 50;
        return (
          <div key={i} style={{position: 'absolute', bottom: 0, left: i * 52 - 20, width: w, height: h, background: '#0a101c'}}>
            {Array.from({length: Math.floor(h / 40)}, (_, j) => (
              <div key={j} style={{position: 'absolute', left: 10, top: 14 + j * 40, width: w - 20, height: 10, background: random(`l${i}-${j}`) > 0.55 ? 'rgba(255,220,140,0.55)' : 'transparent'}} />
            ))}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: '50%', top: 0, bottom: 0, width: 14, background: '#2a3140'}} />
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1250, bottom: 0, background: 'linear-gradient(180deg, #2a2420, #120f0d)'}} />
    <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 1100px at 50% 30%, rgba(255,240,210,${0.1 * light}), rgba(0,0,0,0) 70%)`}} />
    {tint ? <AbsoluteFill style={{background: tint, mixBlendMode: 'multiply'}} /> : null}
  </AbsoluteFill>
);

// সাধারণ গাঢ় পটভূমি (চার্ট ও লেখার দৃশ্যে)
export const Plain: React.FC<{glow?: string}> = ({glow = 'rgba(255,240,210,0.08)'}) => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 35%, ${glow}, rgba(0,0,0,0) 65%), linear-gradient(180deg, #151923, #0b0d12)`}} />
);

// ভিডিও ভাড়ার দোকান (নিজস্ব নকশা, আসল লোগো নয়)
export const Storefront: React.FC<{width?: number; closed?: number; name?: string}> = ({width = 1000, closed = 0, name = 'BLOCKBUSTER'}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 1000 700" width={width} height={width * 0.7} style={{overflow: 'visible'}}>
      <rect x={0} y={120} width={1000} height={580} fill="#1d3f8f" />
      <rect x={0} y={60} width={1000} height={130} fill="#f2c218" />
      <text x={500} y={152} textAnchor="middle" fontSize={84} fontWeight={900} fontFamily="Arial Black, Arial" fill="#12245a" letterSpacing={4}>
        {name}
      </text>
      <text x={500} y={230} textAnchor="middle" fontSize={30} fontWeight={700} fontFamily="Arial" fill="#f2c218" letterSpacing={10}>
        VIDEO · DVD · GAMES
      </text>
      {[40, 380, 720].map((x, i) => (
        <g key={x}>
          <rect x={x} y={270} width={240} height={330} fill={closed > 0.5 ? '#0a0f1c' : '#bcd6ff'} opacity={0.95} />
          {closed > 0.5
            ? null
            : [0, 1, 2].map((k) => (
                <rect key={k} x={x + 18 + k * 74} y={300} width={60} height={90} fill={['#e0243c', '#2b5fd9', '#e3bf7a'][(i + k) % 3]} />
              ))}
          {closed > 0.5 ? null : <rect x={x + 20} y={420} width={200} height={150} fill="rgba(255,255,255,0.25)" />}
        </g>
      ))}
      <rect x={300} y={300} width={60} height={400} fill="#12245a" />
      <rect x={640} y={300} width={60} height={400} fill="#12245a" />
      {closed > 0 ? (
        <g opacity={closed}>
          <rect x={100} y={300} width={800} height={130} fill="#fff" transform="rotate(-6 500 365)" />
          <text x={500} y={395} textAnchor="middle" fontSize={92} fontWeight={900} fontFamily="Arial Black, Arial" fill={RED} transform="rotate(-6 500 365)">
            CLOSED
          </text>
        </g>
      ) : (
        <circle cx={500} cy={640} r={8} fill="#fff" opacity={0.5 + 0.5 * Math.sin(f / 5)} />
      )}
    </svg>
  );
};

// লাল খামে DVD
export const DvdMailer: React.FC<{size?: number; label?: string}> = ({size = 300, label = 'NETFLIX'}) => (
  <svg viewBox="0 0 300 200" width={size} height={(size * 200) / 300}>
    <circle cx={210} cy={60} r={56} fill="#d8dde4" />
    <circle cx={210} cy={60} r={14} fill="#9aa3aa" />
    <rect x={0} y={50} width={300} height={150} rx={8} fill={NFX} />
    <text x={150} y={150} textAnchor="middle" fontSize={44} fontWeight={900} fontFamily="Arial Black, Arial" fill="#fff" letterSpacing={3}>
      {label}
    </text>
  </svg>
);

export const PriceTag: React.FC<{text: string; size?: number; color?: string}> = ({text, size = 1, color = GOLD}) => (
  <div style={{position: 'relative', display: 'inline-block', transform: `scale(${size})`}}>
    <div style={{background: color, color: '#1a1408', fontSize: 120, fontWeight: 900, padding: '30px 60px 30px 110px', clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 14% 100%, 0 50%)', fontFamily: 'Arial Black, Arial'}}>{text}</div>
    <div style={{position: 'absolute', left: 42, top: '50%', width: 30, height: 30, borderRadius: '50%', background: '#0b0d12', transform: 'translateY(-50%)'}} />
  </div>
);

// সোডা ক্যান (নিজস্ব নকশা)
export const Can: React.FC<{color?: string; label?: string; sub?: string; size?: number; band?: string; style?: React.CSSProperties}> = ({color = '#c8102e', label = 'Coke', sub, size = 300, band = '#fff', style}) => (
  <svg viewBox="0 0 160 280" width={(size * 160) / 280} height={size} style={{overflow: 'visible', ...style}}>
    <defs>
      <linearGradient id={`can${color.replace('#', '')}`} x1="0" x2="1">
        <stop offset="0" stopColor="rgba(0,0,0,0.35)" />
        <stop offset="0.35" stopColor="rgba(255,255,255,0.25)" />
        <stop offset="0.6" stopColor="rgba(0,0,0,0)" />
        <stop offset="1" stopColor="rgba(0,0,0,0.4)" />
      </linearGradient>
    </defs>
    <rect x={10} y={8} width={140} height={22} rx={8} fill="#c9ced3" />
    <rect x={4} y={24} width={152} height={236} rx={18} fill={color} />
    <path d="M4 150 C50 120 110 190 156 150 L156 176 C110 214 50 146 4 176Z" fill={band} />
    <text x={80} y={120} textAnchor="middle" fontSize={label.length > 6 ? 30 : 40} fontWeight={800} fontStyle="italic" fontFamily="Georgia, serif" fill="#fff">
      {label}
    </text>
    {sub ? (
      <text x={80} y={220} textAnchor="middle" fontSize={22} fontWeight={700} fontFamily="Arial" fill="#fff">
        {sub}
      </text>
    ) : null}
    <rect x={4} y={24} width={152} height={236} rx={18} fill={`url(#can${color.replace('#', '')})`} />
    <rect x={10} y={254} width={140} height={18} rx={8} fill="#aab1b8" />
  </svg>
);
export const OLD_COKE = {color: '#c8102e', label: 'Coke'};
export const NEW_COKE = {color: '#c8102e', label: 'NEW Coke', band: '#c9ced3'};
export const CLASSIC = {color: '#a8001c', label: 'Classic', sub: 'COCA-COLA'};
export const PEPSI = {color: '#1f4fb5', label: 'Pepsi', band: '#e0243c'};

export const Phone: React.FC<{size?: number; ring?: number}> = ({size = 200, ring = 0}) => (
  <svg viewBox="0 0 200 160" width={size} height={size * 0.8} style={{overflow: 'visible', transform: `rotate(${Math.sin(ring) * 8}deg)`}}>
    <path d="M30 70 C30 20 170 20 170 70 L150 80 L130 60 L70 60 L50 80Z" fill="#1a1a1e" />
    <path d="M40 90 L160 90 L180 150 L20 150Z" fill="#2a2a30" />
    <circle cx={100} cy={118} r={24} fill="#d8dde4" />
    <circle cx={100} cy={118} r={8} fill="#2a2a30" />
  </svg>
);

export const Letter: React.FC<{size?: number; angry?: boolean}> = ({size = 160, angry}) => (
  <svg viewBox="0 0 160 110" width={size} height={size * 0.69}>
    <rect x={0} y={0} width={160} height={110} rx={6} fill="#f2ecdc" />
    <path d="M0 0 L80 60 L160 0" stroke="#c9bfa8" strokeWidth={5} fill="none" />
    {angry ? <text x={120} y={95} fontSize={34} fontWeight={900} fill={RED}>!</text> : null}
  </svg>
);

// আনুভূমিক বার
export const Bar: React.FC<{label: string; value: string; pct: number; color: string; top: number; o?: number}> = ({label, value, pct, color, top, o = 1}) => (
  <div style={{position: 'absolute', left: 90, right: 90, top, opacity: o}}>
    <div style={{fontSize: 54, fontWeight: 700}}>{label}</div>
    <div style={{marginTop: 16, height: 90, background: 'rgba(255,255,255,0.08)', borderRadius: 14}}>
      <div style={{height: '100%', width: `${Math.max(0.8, Math.min(100, pct))}%`, background: color, borderRadius: 14, boxShadow: `0 0 40px ${color}`}} />
    </div>
    <div style={{marginTop: 12, fontSize: 52, fontWeight: 800, color}}>{value}</div>
  </div>
);

export const FollowButton: React.FC<{scale: number}> = ({scale}) => (
  <div style={{padding: '40px 100px', borderRadius: 999, background: RED, fontSize: 104, fontWeight: 800, transform: `scale(${scale})`, boxShadow: '0 0 80px rgba(224,36,60,0.55)'}}>+ ফলো করো</div>
);
