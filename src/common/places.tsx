// রোজকার জায়গা আর জিনিস: দোকান, বাসা, ছাদ, চায়ের দোকান, টাকা। সব ১০৮০×১৯২০ পর্দার মাপে আঁকা।
import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';

const LINE = '#1b1b1f';
const Fill: React.FC<{bg: string; children?: React.ReactNode}> = ({bg, children}) => <AbsoluteFill style={{background: bg}}>{children}</AbsoluteFill>;
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
    {children}
  </svg>
);

// সাইনবোর্ড ওপরের লেখার (top 210) নিচে থাকে
// দৃশ্যে টাইটেল থাকলে R/Count এটা false করে, যাতে সাইনবোর্ড টাইটেলের নিচে চাপা না পড়ে
export const SignCtx = React.createContext(true);
export const Sign: React.FC<{text: string; bg?: string; color?: string; y?: number; size?: number}> =({text, bg = '#b3201f', color = '#fff4d8', y = 345, size = 66}) => !React.useContext(SignCtx) ? null : (
  <div style={{position: 'absolute', left: 90, right: 90, top: y, padding: '18px 0', textAlign: 'center', background: bg, color, fontSize: size, fontWeight: 800, border: `8px solid ${LINE}`, borderRadius: 16, boxShadow: '0 16px 40px rgba(0,0,0,0.5)'}}>{text}</div>
);

// ---------- জিনিস ----------

export const Taka: React.FC<{w?: number; amount?: string; rot?: number; style?: React.CSSProperties}> = ({w = 300, amount = '১০০০', rot = 0, style}) => (
  <div style={{width: w, height: w * 0.48, background: 'linear-gradient(135deg, #7fb98a, #4f9163)', border: `${w * 0.018}px solid #173b25`, borderRadius: w * 0.03, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${w * 0.06}px`, boxSizing: 'border-box', color: '#10301d', fontWeight: 800, fontSize: w * 0.15, transform: `rotate(${rot}deg)`, boxShadow: '0 10px 24px rgba(0,0,0,0.4)', ...style}}>
    <span style={{fontSize: w * 0.22}}>৳</span>
    <span style={{width: w * 0.2, height: w * 0.2, borderRadius: '50%', border: `${w * 0.012}px solid #173b25`, background: 'rgba(255,255,255,0.22)'}} />
    <span>{amount}</span>
  </div>
);

// টাকার নোট ঝরে পড়ে
export const TakaRain: React.FC<{n?: number; speed?: number}> = ({n = 14, speed = 15}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      {Array.from({length: n}, (_, i) => {
        const x = random(`trx${i}`) * 1000 - 40;
        const y = -240 + ((f * speed * (0.7 + random(`trs${i}`) * 0.6) + random(`try${i}`) * 2100) % 2200);
        return (
          <div key={i} style={{position: 'absolute', left: x + Math.sin(f / 9 + i) * 34, top: y}}>
            <Taka w={190 + random(`trw${i}`) * 90} rot={Math.sin(f / 11 + i * 2) * 34} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const PhoneProp: React.FC<{w?: number; screen?: string; rot?: number; cracked?: boolean; children?: React.ReactNode}> = ({w = 300, screen = '#23456f', rot = 0, children}) => (
  <div style={{position: 'relative', width: w, height: w * 1.95, borderRadius: w * 0.12, background: '#15171d', border: `${w * 0.03}px solid #3a3e48`, padding: w * 0.05, boxSizing: 'border-box', boxShadow: '0 26px 60px rgba(0,0,0,0.55)', transform: `rotate(${rot}deg)`}}>
    <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: w * 0.07, background: `linear-gradient(160deg, ${screen}, #0b0d12)`, overflow: 'hidden'}}>{children}</div>
  </div>
);
export const PriceTag: React.FC<{text: string; color?: string; size?: number; rot?: number}> = ({text, color = '#ffd84a', size = 74, rot = -5}) => (
  <div style={{display: 'inline-block', padding: '12px 30px', background: color, color: '#15151b', fontSize: size, fontWeight: 800, borderRadius: 16, border: `6px solid ${LINE}`, transform: `rotate(${rot}deg)`, boxShadow: '0 14px 30px rgba(0,0,0,0.45)'}}>{text}</div>
);

export const TeaCup: React.FC<{size?: number; steam?: boolean}> = ({size = 220, steam = true}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 120 150" width={size} height={size * 1.25} style={{overflow: 'visible'}}>
      {steam
        ? [24, 48, 72].map((x, i) => <path key={x} d={`M${x} 56 C${x - 12} ${40 + Math.sin(f / 9 + i) * 5} ${x + 12} ${26} ${x} ${6 + Math.sin(f / 7 + i) * 5}`} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={5} strokeLinecap="round" />)
        : null}
      <path d="M8 64 L88 64 L78 136 L18 136Z" fill="#f4efe2" stroke={LINE} strokeWidth={5} />
      <ellipse cx={48} cy={64} rx={40} ry={8} fill="#a0622d" stroke={LINE} strokeWidth={4} />
      <path d="M86 78 C112 76 110 114 80 112" fill="none" stroke={LINE} strokeWidth={7} />
    </svg>
  );
};

const SAREE_COLORS = ['#c0304a', '#2a7a6a', '#d9a21b', '#6a3a9a', '#d9652b', '#2b5fd9', '#b0307a', '#3f8a4a'];
// কাউন্টারে শাড়ির স্তূপ: n বাড়লে উঁচু হয়
export const SareePile: React.FC<{n: number; x?: number; y?: number; w?: number}> = ({n, x = 180, y = 1330, w = 720}) => (
  <>
    {Array.from({length: Math.max(0, Math.floor(n))}, (_, i) => (
      <div key={i} style={{position: 'absolute', left: x + (random(`spx${i}`) - 0.5) * 70, top: y - i * 17, width: w, height: 24, background: SAREE_COLORS[i % SAREE_COLORS.length], border: `4px solid ${LINE}`, borderRadius: 8, transform: `rotate(${(random(`spr${i}`) - 0.5) * 2.2}deg)`}} />
    ))}
  </>
);

export const Cake: React.FC<{size?: number}> = ({size = 360}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 220 210" width={size} height={size * 0.955} style={{overflow: 'visible'}}>
      <path d={`M110 ${26 + Math.sin(f / 3) * 3} C100 42 102 54 110 56 C118 54 120 42 110 ${26 + Math.sin(f / 3) * 3}Z`} fill="#ffb12a" />
      <rect x={103} y={56} width={14} height={46} fill="#f4efe2" stroke={LINE} strokeWidth={4} />
      <rect x={26} y={100} width={168} height={92} rx={12} fill="#8a4a2e" stroke={LINE} strokeWidth={5} />
      <path d="M26 118 C42 146 58 118 74 138 C90 158 106 118 122 138 C138 158 154 118 170 138 C180 148 188 132 194 118 L194 110 Q194 100 184 100 L36 100 Q26 100 26 110Z" fill="#fbf0dc" stroke={LINE} strokeWidth={4} />
      <rect x={10} y={190} width={200} height={14} rx={7} fill="#e6e2da" stroke={LINE} strokeWidth={4} />
    </svg>
  );
};

export const Wallet: React.FC<{size?: number}> = ({size = 320}) => (
  <svg viewBox="0 0 200 140" width={size} height={size * 0.7} style={{overflow: 'visible'}}>
    <rect x={40} y={12} width={110} height={60} rx={4} fill="#7fb98a" stroke={LINE} strokeWidth={5} />
    <rect x={10} y={40} width={180} height={92} rx={14} fill="#5a3a22" stroke={LINE} strokeWidth={6} />
    <rect x={136} y={70} width={54} height={34} rx={10} fill="#3a2414" stroke={LINE} strokeWidth={5} />
    <circle cx={156} cy={87} r={6} fill="#e3bf7a" />
  </svg>
);

export const Handi: React.FC<{size?: number; steam?: boolean}> = ({size = 300, steam = true}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 240 220" width={size} height={size * 0.917} style={{overflow: 'visible'}}>
      {steam
        ? [70, 120, 170].map((x, i) => <path key={x} d={`M${x} 66 C${x - 20} ${46 + Math.sin(f / 10 + i) * 8} ${x + 20} 30 ${x} ${6 + Math.sin(f / 8 + i) * 8}`} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={7} strokeLinecap="round" />)
        : null}
      <ellipse cx={120} cy={82} rx={100} ry={20} fill="#c9a24a" stroke={LINE} strokeWidth={5} />
      <path d="M26 88 C14 176 58 208 120 208 C182 208 226 176 214 88 C190 106 50 106 26 88Z" fill="#b9b4a8" stroke={LINE} strokeWidth={6} />
      <path d="M20 112 C2 112 2 136 22 138 M220 112 C238 112 238 136 218 138" fill="none" stroke={LINE} strokeWidth={8} />
    </svg>
  );
};

// সিগারেট, আগা থেকে ধোঁয়া
export const Cigarette: React.FC<{w?: number; rot?: number; glow?: boolean}> = ({w = 420, rot = -18, glow = true}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 300 150" width={w} height={w * 0.5} style={{overflow: 'visible', transform: `rotate(${rot}deg)`}}>
      <path d={`M272 92 C250 ${64 + Math.sin(f / 9) * 8} 300 40 276 ${6 + Math.sin(f / 7) * 8}`} fill="none" stroke="rgba(230,230,230,0.55)" strokeWidth={8} strokeLinecap="round" />
      <rect x={10} y={94} width={70} height={30} fill="#d9a05a" stroke={LINE} strokeWidth={4} />
      <rect x={80} y={94} width={186} height={30} fill="#f4efe2" stroke={LINE} strokeWidth={4} />
      <rect x={266} y={94} width={18} height={30} fill={glow ? '#ff6a2a' : '#555'} stroke={LINE} strokeWidth={4} />
    </svg>
  );
};

// চরিত্রের হাতে কাপ (Toon-এর holding)
export const HandCup: React.ReactNode = (
  <g>
    <path d="M-28 -44 L28 -44 L20 16 L-20 16Z" fill="#f4efe2" stroke={LINE} strokeWidth={6} />
    <path d="M26 -30 C52 -30 50 2 22 0" fill="none" stroke={LINE} strokeWidth={6} />
  </g>
);

export const Chair: React.FC<{size?: number; color?: string}> = ({size = 420, color = '#d9d4c6'}) => (
  <svg viewBox="0 0 200 280" width={size} height={size * 1.4} style={{overflow: 'visible'}}>
    <path d="M34 10 L166 10 L156 130 L44 130Z" fill={color} stroke={LINE} strokeWidth={7} />
    <rect x={24} y={130} width={152} height={26} rx={8} fill={color} stroke={LINE} strokeWidth={7} />
    <path d="M40 156 L24 276 M160 156 L176 276" stroke={LINE} strokeWidth={12} strokeLinecap="round" />
  </svg>
);

// ---------- জায়গা ----------

export const PhoneShop: React.FC<{sign?: boolean}> = ({sign = true}) => (
  <Fill bg="linear-gradient(180deg, #232a38, #12151c)">
    <Svg>
      {[470, 720, 970].map((y, r) => (
        <g key={y}>
          {Array.from({length: 6}, (_, i) => (
            <g key={i} transform={`translate(${86 + i * 158} ${y - 170})`}>
              <rect width={104} height={176} rx={14} fill="#15171d" stroke="#4a4e58" strokeWidth={5} />
              <rect x={9} y={10} width={86} height={156} rx={7} fill={['#2b5fd9', '#b0307a', '#2a7a6a', '#d9652b', '#6a3a9a', '#c0304a'][(i + r * 2) % 6]} opacity={0.82} />
            </g>
          ))}
          <rect x={50} y={y + 8} width={980} height={18} fill="#6a4a34" stroke={LINE} strokeWidth={4} />
        </g>
      ))}
    </Svg>
    {sign ? <Sign text="মোবাইল গ্যালারি" bg="#14305f" color="#9fd3ff" /> : null}
  </Fill>
);

export const SareeShop: React.FC = () => (
  <Fill bg="linear-gradient(180deg, #5a3320, #2a180f)">
    <Svg>
      {[480, 720, 960].map((y, r) => (
        <g key={y}>
          {Array.from({length: 7}, (_, i) => (
            <g key={i} transform={`translate(${70 + i * 136} ${y - 150})`}>
              {[0, 1, 2, 3, 4].map((k) => (
                <rect key={k} y={k * 30} width={118} height={28} rx={5} fill={SAREE_COLORS[(i * 3 + k + r) % SAREE_COLORS.length]} stroke={LINE} strokeWidth={3} />
              ))}
            </g>
          ))}
          <rect x={40} y={y + 4} width={1000} height={18} fill="#7a4e2a" stroke={LINE} strokeWidth={4} />
        </g>
      ))}
    </Svg>
    <Sign text="শাড়ি ঘর" bg="#7a1f3a" />
  </Fill>
);

// সামনের কাউন্টার (চরিত্রের কোমরের নিচ ঢেকে রাখে)
export const Counter: React.FC<{top?: number; color?: string; glass?: boolean}> = ({top = 1340, color = '#6a4a34', glass}) => (
  <div style={{position: 'absolute', left: -80, right: -80, top, height: 800, background: glass ? 'linear-gradient(180deg, #33404f, #171c24)' : `linear-gradient(180deg, ${color}, #24170e)`, borderTop: `16px solid ${glass ? '#8ea4b8' : '#9a7048'}`, boxShadow: '0 -14px 40px rgba(0,0,0,0.45)'}} />
);

export const Desk: React.FC<{top?: number}> = ({top = 1320}) => (
  <div style={{position: 'absolute', left: -80, right: -80, top, height: 800, background: 'linear-gradient(180deg, #4a3220, #1e130b)', borderTop: `20px solid #6e4a2e`, boxShadow: '0 -14px 40px rgba(0,0,0,0.5)'}} />
);

export const ChaiStall: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fill bg="linear-gradient(180deg, #0a1124, #1a2038 60%, #0c0e16)">
      <Svg>
        {Array.from({length: 22}, (_, i) => (
          <circle key={i} cx={random(`cbx${i}`) * 1080} cy={150 + random(`cby${i}`) * 620} r={14 + random(`cbr${i}`) * 34} fill={['#ffb84a', '#ff7a5a', '#6ab0ff'][i % 3]} opacity={0.08 + random(`cbo${i}`) * 0.12} />
        ))}
        <path d="M0 530 L1080 450 L1080 520 L0 610Z" fill="#6e7680" stroke={LINE} strokeWidth={6} />
        <path d="M40 590 Q300 660 540 570 T1040 500" fill="none" stroke="#333" strokeWidth={4} />
        {[140, 340, 540, 740, 940].map((x, i) => (
          <circle key={x} cx={x} cy={i % 2 ? 610 : 628} r={15} fill="#ffe08a" opacity={0.8 + Math.sin(f / 8 + i) * 0.2} />
        ))}
        <rect x={60} y={640} width={960} height={720} fill="#2c2018" stroke={LINE} strokeWidth={6} />
        <rect x={110} y={730} width={230} height={170} fill="#402c1c" stroke={LINE} strokeWidth={5} />
        <rect x={740} y={730} width={230} height={170} fill="#402c1c" stroke={LINE} strokeWidth={5} />
      </Svg>
      <Sign text="চা ঘর" bg="#3a2a1a" color="#ffd98a" />
    </Fill>
  );
};

// বাসার বসার ঘর
export const Home: React.FC<{photo?: boolean; dim?: boolean}> = ({photo, dim}) => (
  <Fill bg={dim ? 'linear-gradient(180deg, #2c2a30, #15141a)' : 'linear-gradient(180deg, #7a6248, #4c3b2c)'}>
    <Svg>
      <rect x={70} y={300} width={300} height={430} fill={dim ? '#141c32' : '#b9d4e8'} stroke="#3a2a1a" strokeWidth={16} />
      <path d="M220 300 L220 730 M70 515 L370 515" stroke="#3a2a1a" strokeWidth={10} />
      <rect x={0} y={1270} width={1080} height={650} fill={dim ? '#1c1a20' : '#5a4230'} />
      <rect x={560} y={980} width={520} height={330} rx={34} fill={dim ? '#3a2a3a' : '#8a3a3a'} stroke={LINE} strokeWidth={6} />
      {photo ? (
        <g transform="translate(590 310)">
          <rect width={360} height={440} fill="#e8dcc0" stroke="#5a3a1a" strokeWidth={18} />
          <rect x={30} y={30} width={300} height={380} fill="#9ec4dc" />
          <circle cx={180} cy={160} r={58} fill="#c98d62" />
          <path d="M122 96 L238 96 L180 62Z" fill="#14141a" />
          <path d="M92 410 C92 280 130 232 180 232 C230 232 268 280 268 410Z" fill="#14141a" />
        </g>
      ) : null}
    </Svg>
  </Fill>
);

export const Rooftop: React.FC<{night?: boolean}> = ({night}) => (
  <Fill bg={night ? 'linear-gradient(180deg, #0a1020, #1a2440 70%, #2a2f48)' : 'linear-gradient(180deg, #4a3a78 0%, #c8603f 48%, #f0a860 72%)'}>
    <Svg>
      {Array.from({length: 13}, (_, i) => {
        const w = 70 + random(`rfw${i}`) * 80;
        const h = 240 + random(`rfh${i}`) * 420;
        const x = i * 88 - 20;
        return (
          <g key={i}>
            <rect x={x} y={1240 - h} width={w} height={h} fill={night ? '#10162a' : '#3a2a44'} />
            {Array.from({length: 7}, (_, k) => (
              <rect key={k} x={x + 12 + (k % 2) * 28} y={1260 - h + k * 56} width={16} height={22} fill="#ffd98a" opacity={random(`rfl${i}${k}`) > 0.45 ? 0.75 : 0.08} />
            ))}
          </g>
        );
      })}
      <rect x={760} y={760} width={210} height={290} rx={20} fill="#5a5f6e" stroke={LINE} strokeWidth={6} />
      <rect x={740} y={1040} width={250} height={210} fill="#4a4e5a" stroke={LINE} strokeWidth={6} />
      <rect x={0} y={1240} width={1080} height={680} fill={night ? '#20232e' : '#6a5c58'} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={i * 154} y={1120} width={16} height={130} fill="#2a2a30" />
      ))}
      <rect x={0} y={1110} width={1080} height={16} fill="#2a2a30" />
    </Svg>
  </Fill>
);

// বিরিয়ানির দোকান: সামনে টেবিল
export const BiryaniShop: React.FC<{night?: boolean}> = ({night}) => (
  <Fill bg={night ? 'linear-gradient(180deg, #0d1426, #1a2240)' : 'linear-gradient(180deg, #8ec2e4, #d8e8ee)'}>
    <Svg>
      <rect x={0} y={1420} width={1080} height={500} fill={night ? '#22242c' : '#8a8a82'} />
      <rect x={60} y={420} width={960} height={1000} fill={night ? '#3a2a1e' : '#c7a678'} stroke={LINE} strokeWidth={8} />
      <rect x={160} y={700} width={760} height={720} fill={night ? '#6a4a24' : '#5a4230'} stroke={LINE} strokeWidth={6} />
      {night ? <rect x={160} y={700} width={760} height={720} fill="#ffcc6a" opacity={0.34} /> : null}
      {Array.from({length: 9}, (_, i) => (
        <path key={i} d={`M${60 + i * 107} 560 L${167 + i * 107} 560 L${167 + i * 107} 660 Q${113 + i * 107} 700 ${60 + i * 107} 660Z`} fill={i % 2 ? '#c0304a' : '#f4efe2'} stroke={LINE} strokeWidth={5} />
      ))}
    </Svg>
    <Sign text="রনির বিরিয়ানি" bg="#14532d" color="#ffe9a8" />
  </Fill>
);

// New York-এর রাস্তা, ১৯২৯: সেপিয়া
export const Avenue: React.FC = () => (
  <Fill bg="linear-gradient(180deg, #caa878, #8a6a44 62%, #4a3722)">
    <Svg>
      {Array.from({length: 9}, (_, i) => {
        const h = 620 + random(`avh${i}`) * 560;
        const x = i * 128 - 30;
        return (
          <g key={i}>
            <rect x={x} y={1320 - h} width={124} height={h} fill={i % 2 ? '#6a5236' : '#7a5f40'} stroke="#2a1d10" strokeWidth={4} />
            {Array.from({length: 11}, (_, k) => (
              <rect key={k} x={x + 18 + (k % 3) * 32} y={1350 - h + k * 66} width={20} height={38} fill="#3a2a18" opacity={0.7} />
            ))}
          </g>
        );
      })}
      <rect x={0} y={1320} width={1080} height={600} fill="#4a3a28" />
    </Svg>
  </Fill>
);
