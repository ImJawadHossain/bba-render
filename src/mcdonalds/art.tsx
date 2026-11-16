// McDonald's গল্পের উপাদান: বার্গারের দোকান, বার্গার, মিল্কশেক মেশিন, জমি, চুক্তিপত্র
// (দোকানের নকশা নিজস্ব; আসল লোগো নয়)
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {PersonProps} from '../art';

export const MRED = '#d62828';
export const MYEL = '#f6c026';
export const CREAM = '#f6efe0';
export const LAND = '#6a8f3a';

type Look = Omit<PersonProps, 'height'>;
// দুই ভাই: সাদা শার্ট, একজন মোটা গড়নের টাক-ঘেঁষা, অন্যজন চশমা
export const DICK: Look = {hairStyle: 'short', hair: '#3a2a1e', skin: '#eec4a2', top: '#f2efe9', bottom: '#2a2c30', tie: '#22262e'};
export const MAC: Look = {hairStyle: 'bald', hair: '#4a3a2a', skin: '#e6b896', top: '#f2efe9', bottom: '#33352e', glasses: true};
// Ray Kroc: পেছনে আঁচড়ানো ধূসর চুল, স্যুট
export const KROC: Look = {hairStyle: 'short', hair: '#8a8580', skin: '#e8b998', top: '#2a2f3a', bottom: '#1c1e24', tie: '#a01a2a'};
export const SONNEBORN: Look = {hairStyle: 'short', hair: '#1a1410', skin: '#e0b090', top: '#3a3f4a', bottom: '#22252c', tie: '#2b4fa0', glasses: true};

// রাস্তার পাশের বার্গারের দোকান
export const BurgerStand: React.FC<{width?: number; sign?: string; closed?: number; bright?: number}> = ({width = 900, sign = "McDONALD'S", closed = 0, bright = 1}) => {
  const f = useCurrentFrame();
  const glow = bright * (0.85 + 0.15 * Math.sin(f / 6));
  return (
    <svg viewBox="0 0 900 760" width={width} height={(width * 760) / 900} style={{overflow: 'visible'}}>
      {/* উঁচু সাইনবোর্ড */}
      <rect x={720} y={0} width={24} height={620} fill="#5a5a60" />
      <rect x={600} y={20} width={270} height={130} rx={14} fill={closed > 0.5 ? '#3a3a40' : MYEL} opacity={closed > 0.5 ? 1 : glow} />
      <text x={735} y={80} textAnchor="middle" fontSize={sign.length > 9 ? 30 : 40} fontWeight={900} fontFamily="Arial Black, Arial" fill={closed > 0.5 ? '#777' : MRED}>
        {sign}
      </text>
      <text x={735} y={124} textAnchor="middle" fontSize={26} fontWeight={800} fontFamily="Arial" fill={closed > 0.5 ? '#666' : '#3a2a10'}>
        HAMBURGERS 15¢
      </text>
      {/* দোকান */}
      <path d="M40 330 L620 330 L660 400 L0 400Z" fill={closed > 0.5 ? '#4a4a50' : MRED} />
      {Array.from({length: 11}, (_, i) => (
        <path key={i} d={`M${i * 60} 400 L${i * 60 + 30} 400 L${i * 60 + 30} 440 L${i * 60} 440Z`} fill={i % 2 ? CREAM : closed > 0.5 ? '#4a4a50' : MRED} />
      ))}
      <rect x={30} y={440} width={600} height={300} fill={CREAM} />
      <rect x={60} y={470} width={540} height={170} fill={closed > 0.5 ? '#141418' : '#ffe9a8'} opacity={closed > 0.5 ? 1 : 0.85 * bright} />
      {closed > 0.5
        ? null
        : [0, 1, 2].map((k) => <rect key={k} x={90 + k * 175} y={500} width={140} height={110} fill="rgba(255,255,255,0.35)" />)}
      <rect x={30} y={640} width={600} height={20} fill="#c9bfa8" />
      <rect x={0} y={740} width={900} height={20} fill="#2a2a2e" />
      <text x={330} y={385} textAnchor="middle" fontSize={44} fontWeight={900} fontFamily="Arial Black, Arial" fill={closed > 0.5 ? '#888' : MYEL} letterSpacing={3}>
        {sign}
      </text>
      {closed > 0 ? (
        <g opacity={closed}>
          <rect x={90} y={500} width={480} height={110} fill="#fff" transform="rotate(-6 330 555)" />
          <text x={330} y={580} textAnchor="middle" fontSize={78} fontWeight={900} fontFamily="Arial Black, Arial" fill={MRED} transform="rotate(-6 330 555)">
            CLOSED
          </text>
        </g>
      ) : null}
    </svg>
  );
};

export const Burger: React.FC<{size?: number}> = ({size = 300}) => (
  <svg viewBox="0 0 200 160" width={size} height={size * 0.8}>
    <path d="M14 70 C14 10 186 10 186 70Z" fill="#d9962f" />
    {[50, 80, 110, 140, 70, 125].map((x, i) => (
      <ellipse key={i} cx={x} cy={i < 4 ? 40 : 28} rx={5} ry={3} fill="#f6e6c0" />
    ))}
    <path d="M10 76 Q30 92 50 78 Q70 94 90 78 Q110 94 130 78 Q150 94 170 78 Q186 90 192 76 L192 84 L10 84Z" fill="#5fae3a" />
    <rect x={12} y={84} width={176} height={26} rx={12} fill="#6a3a1e" />
    <path d="M18 110 L182 110 L170 124 L30 124Z" fill={MYEL} />
    <path d="M14 124 L186 124 C186 150 14 150 14 124Z" fill="#c98a2a" />
  </svg>
);

// পাঁচ মুখওয়ালা মিল্কশেক মেশিন
export const Mixer: React.FC<{size?: number; spin?: number}> = ({size = 360, spin = 0}) => (
  <svg viewBox="0 0 300 360" width={size} height={size * 1.2}>
    <rect x={30} y={20} width={240} height={90} rx={20} fill="#c9ced3" />
    <rect x={30} y={20} width={240} height={30} rx={14} fill="#e8ecef" />
    <rect x={130} y={110} width={40} height={180} fill="#9aa3aa" />
    {[0, 1, 2, 3, 4].map((i) => {
      const x = 50 + i * 50;
      return (
        <g key={i}>
          <line x1={x} y1={110} x2={x + Math.sin(spin + i) * 3} y2={200} stroke="#777" strokeWidth={6} />
          <path d={`M${x - 22} 180 L${x + 22} 180 L${x + 16} 260 L${x - 16} 260Z`} fill="#dfe4e8" stroke="#aab1b8" strokeWidth={3} />
          <path d={`M${x - 18} 196 L${x + 18} 196 L${x + 15} 255 L${x - 15} 255Z`} fill={['#f6efe0', '#e8a0b4', '#7a4a2a'][i % 3]} />
        </g>
      );
    })}
    <rect x={20} y={290} width={260} height={40} rx={12} fill="#7f878e" />
  </svg>
);

// জমির টুকরো (ওপর থেকে আধা-কোণে)
export const LandPlot: React.FC<{size?: number; owner?: string; sold?: number}> = ({size = 300, owner, sold = 0}) => (
  <svg viewBox="0 0 300 200" width={size} height={(size * 200) / 300} style={{overflow: 'visible'}}>
    <path d="M40 40 L260 40 L300 180 L0 180Z" fill={LAND} />
    <path d="M40 40 L260 40 L300 180 L0 180Z" fill="none" stroke="#e8f0d0" strokeWidth={5} strokeDasharray="14 10" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={70 + i * 80} cy={110 + (i % 2) * 20} r={14} fill="#4a6a28" />
    ))}
    {sold > 0 ? (
      <g opacity={sold} transform={`translate(150 20) scale(${0.6 + 0.4 * sold})`}>
        <rect x={-6} y={0} width={12} height={110} fill="#7a5a3a" />
        <rect x={-90} y={-60} width={180} height={70} rx={8} fill={CREAM} stroke={MRED} strokeWidth={5} />
        <text x={0} y={-14} textAnchor="middle" fontSize={owner && owner.length > 5 ? 30 : 40} fontWeight={900} fontFamily="Arial Black, Arial" fill={MRED}>
          {owner ?? 'SOLD'}
        </text>
      </g>
    ) : null}
  </svg>
);

// চুক্তিপত্র
export const Contract: React.FC<{size?: number; lines?: number; sign?: number; title?: string; stamp?: string; stampO?: number}> = ({size = 520, lines = 8, sign = 0, title = 'AGREEMENT', stamp, stampO = 0}) => (
  <div style={{position: 'relative', width: size, padding: size * 0.08, background: CREAM, color: '#1a1814', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', fontFamily: 'Georgia, serif'}}>
    <div style={{fontSize: size * 0.08, fontWeight: 900, textAlign: 'center', letterSpacing: 4}}>{title}</div>
    <div style={{borderTop: '3px solid #999', margin: `${size * 0.03}px 0`}} />
    {Array.from({length: lines}, (_, i) => (
      <div key={i} style={{height: size * 0.018, background: '#bdb4a0', margin: `${size * 0.028}px 0`, width: `${70 + ((i * 37) % 30)}%`}} />
    ))}
    <svg width={size * 0.5} height={size * 0.14} viewBox="0 0 200 60" style={{marginTop: size * 0.03}}>
      <path d="M5 40 C30 5 40 55 65 30 S100 10 120 40 S170 20 195 30" stroke="#1d3f8f" strokeWidth={4} fill="none" strokeDasharray={300} strokeDashoffset={300 * (1 - sign)} />
    </svg>
    {stamp && stampO > 0 ? (
      <div style={{position: 'absolute', left: size * 0.12, top: size * 0.35, padding: '10px 28px', border: `8px solid ${MRED}`, color: MRED, fontSize: size * 0.12, fontWeight: 900, transform: `rotate(-14deg) scale(${2 - stampO})`, opacity: stampO, fontFamily: 'Arial Black, Arial', whiteSpace: 'nowrap'}}>{stamp}</div>
    ) : null}
  </div>
);

// টাকার নোট
export const Bill: React.FC<{size?: number; style?: React.CSSProperties}> = ({size = 160, style}) => (
  <svg viewBox="0 0 160 76" width={size} height={size * 0.475} style={style}>
    <rect x={0} y={0} width={160} height={76} rx={6} fill="#5f9e5a" />
    <rect x={8} y={8} width={144} height={60} rx={4} fill="none" stroke="#cfe8c8" strokeWidth={3} />
    <circle cx={80} cy={38} r={20} fill="#cfe8c8" />
    <text x={80} y={48} textAnchor="middle" fontSize={28} fontWeight={900} fill="#3a6a36">$</text>
  </svg>
);

// গিয়ার (টাকার ইঞ্জিন)
export const Gear: React.FC<{size?: number; rot?: number; color?: string}> = ({size = 300, rot = 0, color = MYEL}) => (
  <svg viewBox="-110 -110 220 220" width={size} height={size} style={{transform: `rotate(${rot}deg)`}}>
    {Array.from({length: 10}, (_, i) => (
      <rect key={i} x={-16} y={-104} width={32} height={40} rx={6} fill={color} transform={`rotate(${i * 36})`} />
    ))}
    <circle r={74} fill={color} />
    <circle r={28} fill="#0b0d12" />
  </svg>
);
