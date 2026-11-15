// আরও জায়গা আর জিনিস: দোকানের সামনে, চায়ের গলি, জিম, সুপারশপ, বেকারি, গ্রাম, মেলা, শোরুম, মেস
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Sign} from './places';

const LINE = '#1b1b1f';
const Fill: React.FC<{bg: string; children?: React.ReactNode}> = ({bg, children}) => <AbsoluteFill style={{background: bg}}>{children}</AbsoluteFill>;
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
    {children}
  </svg>
);

// যেকোনো দোকানের সামনেটা
export const ShopFront: React.FC<{name?: string; signBg?: string; signColor?: string; night?: boolean; wall?: string; open?: boolean}> = ({name, signBg = '#14532d', signColor = '#ffe9a8', night, wall, open = true}) => (
  <Fill bg={night ? 'linear-gradient(180deg, #0d1426, #1a2240)' : 'linear-gradient(180deg, #8ec2e4, #d8e8ee)'}>
    <Svg>
      <rect x={0} y={1420} width={1080} height={500} fill={night ? '#22242c' : '#8a8a82'} />
      <rect x={60} y={420} width={960} height={1000} fill={wall ?? (night ? '#3a2a1e' : '#c7a678')} stroke={LINE} strokeWidth={8} />
      <rect x={160} y={700} width={760} height={720} fill={open ? (night ? '#6a4a24' : '#5a4230') : '#6e7680'} stroke={LINE} strokeWidth={6} />
      {!open ? Array.from({length: 12}, (_, i) => <line key={i} x1={160} x2={920} y1={740 + i * 56} y2={740 + i * 56} stroke="#4a4e58" strokeWidth={5} />) : null}
    </Svg>
    {name ? <Sign text={name} bg={signBg} color={signColor} /> : null}
  </Fill>
);

// পাশাপাশি সাতটা চায়ের দোকান; worst থাকলে মাঝেরটার সাইনবোর্ড বদলে যায়
export const TeaAlley: React.FC<{worst?: boolean; night?: boolean}> = ({worst, night = true}) => (
  <Fill bg={night ? 'linear-gradient(180deg, #0a1124, #1a2038 62%, #12141c)' : 'linear-gradient(180deg, #8ec2e4, #d8e8ee 62%, #8a8a82)'}>
    <Svg>
      {Array.from({length: 7}, (_, i) => {
        const x = i * 160 - 20;
        return (
          <g key={i}>
            <rect x={x} y={720} width={150} height={620} fill="#3a2a1e" stroke={LINE} strokeWidth={5} />
            <rect x={x} y={640} width={150} height={92} fill={i === 3 && worst ? '#b3201f' : '#6a4a34'} stroke={LINE} strokeWidth={5} />
            <text x={x + 75} y={698} textAnchor="middle" fontSize={32} fontWeight={800} fill="#fff4d8">
              {i % 2 ? 'গরম চা' : 'স্পেশাল'}
            </text>
          </g>
        );
      })}
      <rect x={0} y={1340} width={1080} height={580} fill="#2a2c34" />
    </Svg>
    {worst ? <Sign text="ঢাকার সবচেয়ে খারাপ চা" bg="#b3201f" size={70} /> : null}
  </Fill>
);

export const Gym: React.FC<{sign?: string}> = ({sign}) => (
  <Fill bg="linear-gradient(180deg, #2c313c, #15171d)">
    <Svg>
      <rect x={60} y={560} width={960} height={760} fill="#20242e" stroke={LINE} strokeWidth={8} />
      {[700, 880, 1060].map((y) => (
        <g key={y}>
          <rect x={120} y={y} width={840} height={16} fill="#6e7680" />
          {[160, 340, 520, 700, 860].map((x) => (
            <g key={x}>
              <rect x={x} y={y - 46} width={22} height={46} fill="#14161c" />
              <rect x={x + 22} y={y - 34} width={50} height={14} fill="#a0a4ac" />
              <rect x={x + 72} y={y - 46} width={22} height={46} fill="#14161c" />
            </g>
          ))}
        </g>
      ))}
      <rect x={0} y={1320} width={1080} height={600} fill="#30343e" />
    </Svg>
    {sign ? <Sign text={sign} bg="#14305f" color="#ffe9a8" size={sign.length > 24 ? 52 : 62} /> : null}
  </Fill>
);

const SHELF = ['#d9652b', '#2b5fd9', '#c0304a', '#2a7a6a', '#d9a21b', '#6a3a9a', '#b0307a', '#3f8a4a'];
// সুপারশপের তাক; label = ওপরের লেখা
export const Aisle: React.FC<{label?: string; seed?: number}> = ({label, seed = 0}) => (
  <Fill bg="linear-gradient(180deg, #e8e6e0, #b8b6ae)">
    <Svg>
      {[560, 790, 1020, 1250].map((y, r) => (
        <g key={y}>
          {Array.from({length: 8}, (_, i) => {
            const h = 130 + (((i + r + seed) * 37) % 60);
            return <rect key={i} x={46 + i * 124} y={y - h} width={110} height={h} rx={8} fill={SHELF[(i * 3 + r + seed) % SHELF.length]} stroke={LINE} strokeWidth={4} />;
          })}
          <rect x={24} y={y} width={1032} height={20} fill="#6e7680" stroke={LINE} strokeWidth={4} />
        </g>
      ))}
      <rect x={0} y={1290} width={1080} height={630} fill="#cfcdc6" />
    </Svg>
    {label ? <Sign text={label} bg="#14532d" /> : null}
  </Fill>
);

export const Oven: React.FC<{size?: number}> = ({size = 460}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 240 240" width={size} height={size} style={{overflow: 'visible'}}>
      <rect x={10} y={20} width={220} height={210} rx={16} fill="#5a5f6e" stroke={LINE} strokeWidth={6} />
      <rect x={40} y={70} width={160} height={110} rx={10} fill={`rgb(255,${120 + Math.sin(f / 3) * 30},40)`} stroke={LINE} strokeWidth={6} />
      <rect x={60} y={40} width={120} height={14} rx={7} fill="#2a2c34" />
    </svg>
  );
};

// গন্ধের ঢেউ: বাঁকা রেখা ওপরে ভেসে যায়
export const SmellWaves: React.FC<{x?: number; y?: number; w?: number; color?: string}> = ({x = 300, y = 500, w = 500, color = 'rgba(255,214,140,0.55)'}) => {
  const f = useCurrentFrame();
  return (
    <svg width={w} height={700} style={{position: 'absolute', left: x, top: y, overflow: 'visible'}}>
      {[0, 1, 2, 3, 4].map((i) => {
        const px = 40 + i * (w / 5);
        const sway = Math.sin(f / 12 + i) * 28;
        return <path key={i} d={`M${px} 680 C${px + sway} 480 ${px - sway} 300 ${px + sway} 40`} fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" />;
      })}
    </svg>
  );
};

// বেকারি; oven থাকলে চুলা দরজার পাশে
export const Bakery: React.FC<{oven?: boolean}> = ({oven}) => (
  <Fill bg="linear-gradient(180deg, #7a5a3c, #3a281a)">
    <Svg>
      <rect x={70} y={560} width={940} height={520} fill="#4a3220" stroke={LINE} strokeWidth={8} />
      {[720, 900].map((y) => (
        <rect key={y} x={100} y={y} width={880} height={14} fill="#a07a50" />
      ))}
      {[150, 330, 510, 690, 860].map((x) => (
        <g key={x}>
          <rect x={x} y={660} width={120} height={60} rx={8} fill="#8a4a2e" stroke={LINE} strokeWidth={4} />
          <rect x={x} y={660} width={120} height={18} rx={8} fill="#fbf0dc" stroke={LINE} strokeWidth={3} />
          <rect x={x} y={840} width={120} height={60} rx={8} fill="#c98a5a" stroke={LINE} strokeWidth={4} />
        </g>
      ))}
      <rect x={0} y={1320} width={1080} height={600} fill="#2a1c12" />
    </Svg>
    <Sign text="মোসলেম বেকারি" bg="#7a1f3a" />
    {oven ? <div style={{position: 'absolute', left: 620, top: 990}}><Oven size={380} /></div> : null}
  </Fill>
);

export const Village: React.FC<{evening?: boolean}> = ({evening}) => (
  <Fill bg={evening ? 'linear-gradient(180deg, #4a3a78, #c8603f 48%, #f0a860 60%)' : 'linear-gradient(180deg, #7ab8e6, #cfe8f2 60%)'}>
    <Svg>
      <path d="M0 1040 Q270 960 540 1030 T1080 1010 L1080 1150 L0 1150Z" fill={evening ? '#2a4a3a' : '#3f8a4a'} />
      <rect x={0} y={1120} width={1080} height={110} fill={evening ? '#3a4a6a' : '#6ab0d8'} />
      <path d="M180 1180 q50 34 100 0 z" fill="#3a2a1e" />
      <rect x={0} y={1220} width={1080} height={700} fill={evening ? '#3a5a2e' : '#5a9a4a'} />
      <path d="M880 1040 L880 780 M880 780 Q830 760 790 800 M880 780 Q930 760 970 800 M880 780 Q840 730 800 730 M880 780 Q920 730 960 730" stroke="#3a2a1e" strokeWidth={14} fill="none" />
    </Svg>
  </Fill>
);

// মেলা: তাঁবু আর মরিচবাতি
export const Fair: React.FC<{name?: string}> = ({name}) => {
  const f = useCurrentFrame();
  return (
    <Fill bg="linear-gradient(180deg, #1a1f3a, #3a2a4a 62%, #1a1420)">
      <Svg>
        {[60, 320, 580, 840].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 880 L${x + 110} 680 L${x + 220} 880Z`} fill={['#c0304a', '#2a7a6a', '#d9a21b', '#6a3a9a'][i]} stroke={LINE} strokeWidth={5} />
            <rect x={x + 10} y={880} width={200} height={300} fill="#2a1c12" stroke={LINE} strokeWidth={4} />
          </g>
        ))}
        {Array.from({length: 13}, (_, i) => (
          <circle key={i} cx={i * 90} cy={600 + Math.sin(i) * 26} r={13} fill={['#ffe08a', '#ff9a7a', '#8ad0ff'][i % 3]} opacity={0.7 + Math.sin(f / 7 + i) * 0.3} />
        ))}
        <rect x={0} y={1180} width={1080} height={740} fill="#3a3028" />
      </Svg>
      {name ? <Sign text={name} bg="#7a4a14" /> : null}
    </Fill>
  );
};

export const Bike: React.FC<{size?: number; color?: string}> = ({size = 560, color = '#b3201f'}) => (
  <svg viewBox="0 0 320 190" width={size} height={size * 0.594} style={{overflow: 'visible'}}>
    <circle cx={64} cy={140} r={44} fill="#16161a" stroke="#6e7680" strokeWidth={8} />
    <circle cx={256} cy={140} r={44} fill="#16161a" stroke="#6e7680" strokeWidth={8} />
    <path d="M64 140 L140 86 L214 86 L256 140 M140 86 L168 136 L214 86" fill="none" stroke="#3a3e48" strokeWidth={10} />
    <path d="M110 76 C130 56 190 54 216 76 L206 100 L128 100Z" fill={color} stroke={LINE} strokeWidth={5} />
    <path d="M70 84 L132 84" stroke="#14161c" strokeWidth={16} strokeLinecap="round" />
    <path d="M214 76 L244 42 L276 42" fill="none" stroke="#3a3e48" strokeWidth={8} strokeLinecap="round" />
    <circle cx={250} cy={62} r={13} fill="#ffe08a" stroke={LINE} strokeWidth={4} />
  </svg>
);

export const Showroom: React.FC = () => (
  <Fill bg="linear-gradient(180deg, #d8dce2, #a8acb4)">
    <Svg>
      <rect x={0} y={1180} width={1080} height={740} fill="#e6e8ec" />
      <rect x={0} y={1180} width={1080} height={10} fill="#8a8e96" />
    </Svg>
    <div style={{position: 'absolute', left: 20, top: 900}}><Bike size={380} color="#2b5fd9" /></div>
    <div style={{position: 'absolute', left: 660, top: 900}}><Bike size={380} color="#14161c" /></div>
    <Sign text="বাইক শোরুম" bg="#b3201f" />
  </Fill>
);

export const MessRoom: React.FC = () => (
  <Fill bg="linear-gradient(180deg, #5a6068, #3a3e46)">
    <Svg>
      <rect x={70} y={330} width={260} height={320} fill="#20283a" stroke="#2a2a30" strokeWidth={14} />
      <path d="M380 460 L1020 420" stroke="#2a2a30" strokeWidth={5} />
      {[480, 640, 800].map((x, i) => (
        <rect key={x} x={x} y={445 - i * 10} width={110} height={190} fill={['#7a3a4a', '#3a6ea5', '#d9d4c6'][i]} stroke={LINE} strokeWidth={4} />
      ))}
      {[60, 620].map((x) => (
        <g key={x}>
          <rect x={x} y={960} width={400} height={38} fill="#7a4e2a" stroke={LINE} strokeWidth={5} />
          <rect x={x} y={920} width={400} height={44} rx={10} fill="#c9c1ae" stroke={LINE} strokeWidth={5} />
          <rect x={x + 12} y={998} width={18} height={280} fill="#5a3a22" />
          <rect x={x + 370} y={998} width={18} height={280} fill="#5a3a22" />
        </g>
      ))}
      <rect x={0} y={1280} width={1080} height={640} fill="#30343c" />
    </Svg>
  </Fill>
);

// ---------- জিনিস ----------

export const HoneyBottle: React.FC<{size?: number}> = ({size = 260}) => (
  <svg viewBox="0 0 120 200" width={size * 0.6} height={size} style={{overflow: 'visible'}}>
    <rect x={38} y={6} width={44} height={26} rx={5} fill="#d9a21b" stroke={LINE} strokeWidth={5} />
    <path d="M36 32 L84 32 L108 70 L108 186 Q108 196 98 196 L22 196 Q12 196 12 186 L12 70Z" fill="#d98a14" stroke={LINE} strokeWidth={6} />
    <rect x={22} y={92} width={76} height={62} rx={6} fill="#f4efe2" stroke={LINE} strokeWidth={4} />
    <text x={60} y={134} textAnchor="middle" fontSize={32} fontWeight={800} fill="#7a4a14">মধু</text>
  </svg>
);

export const SolarPanel: React.FC<{size?: number}> = ({size = 520}) => (
  <svg viewBox="0 0 260 170" width={size} height={size * 0.654} style={{overflow: 'visible'}}>
    <path d="M30 150 L120 110 M230 150 L140 110" stroke="#5a5f6e" strokeWidth={10} />
    <rect x={10} y={10} width={240} height={110} rx={6} fill="#14305f" stroke="#a0a4ac" strokeWidth={7} />
    {[70, 130, 190].map((x) => <line key={x} x1={x} x2={x} y1={10} y2={120} stroke="#6a8ac4" strokeWidth={3} />)}
    {[47, 84].map((y) => <line key={y} x1={10} x2={250} y1={y} y2={y} stroke="#6a8ac4" strokeWidth={3} />)}
  </svg>
);

export const TShirt: React.FC<{size?: number; color?: string}> = ({size = 420, color = '#2b5fd9'}) => (
  <svg viewBox="0 0 220 210" width={size} height={size * 0.955} style={{overflow: 'visible'}}>
    <path d="M70 12 Q110 42 150 12 L210 50 L184 96 L160 82 L160 198 L60 198 L60 82 L36 96 L10 50Z" fill={color} stroke={LINE} strokeWidth={7} strokeLinejoin="round" />
  </svg>
);

export const TvSet: React.FC<{w?: number; on?: boolean; small?: boolean; children?: React.ReactNode}> = ({w = 820, on = true, children}) => (
  <div style={{width: w}}>
    <div style={{position: 'relative', height: w * 0.58, background: on ? 'linear-gradient(140deg, #2b6fd9, #7a2fa0 70%, #d9652b)' : '#101218', border: `${Math.max(10, w * 0.022)}px solid #14161c`, borderRadius: w * 0.02, overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,0.55)'}}>{children}</div>
    <div style={{margin: '0 auto', width: w * 0.34, height: w * 0.05, background: '#14161c', borderRadius: '0 0 12px 12px'}} />
  </div>
);

export const MilkCarton: React.FC<{size?: number}> = ({size = 300}) => (
  <svg viewBox="0 0 120 200" width={size * 0.6} height={size} style={{overflow: 'visible'}}>
    <path d="M18 56 L60 16 L102 56 L102 192 L18 192Z" fill="#f4f6fa" stroke={LINE} strokeWidth={6} />
    <path d="M18 56 L102 56" stroke={LINE} strokeWidth={5} />
    <rect x={18} y={104} width={84} height={50} fill="#2b6fd9" />
    <text x={60} y={140} textAnchor="middle" fontSize={32} fontWeight={800} fill="#fff">দুধ</text>
  </svg>
);

// ঝুড়ি: n বাড়লে জিনিস বাড়ে
export const Basket: React.FC<{n?: number; size?: number}> = ({n = 0, size = 480}) => (
  <svg viewBox="0 0 240 180" width={size} height={size * 0.75} style={{overflow: 'visible'}}>
    {Array.from({length: n}, (_, i) => {
      const w = 34 + ((i * 13) % 20);
      return <rect key={i} x={36 + (i * 37) % 150} y={40 - ((i * 23) % 60) + ((i % 3) * 12)} width={w} height={62} rx={6} fill={SHELF[i % SHELF.length]} stroke={LINE} strokeWidth={4} />;
    })}
    <path d="M60 60 Q120 -40 180 60" fill="none" stroke="#3a3e48" strokeWidth={9} />
    <path d="M22 76 L218 76 L194 172 L46 172Z" fill="#c0304a" stroke={LINE} strokeWidth={6} />
    {[70, 120, 170].map((x) => <line key={x} x1={x} x2={x - (x - 120) * 0.15} y1={84} y2={164} stroke="#7a1f2a" strokeWidth={5} />)}
  </svg>
);

// ফেসবুকের কমেন্ট কার্ড
export const CommentCard: React.FC<{name: string; text: string; w?: number; size?: number; rot?: number; bad?: boolean}> = ({name, text, w = 760, size = 46, rot = 0, bad}) => (
  <div style={{width: w, padding: '22px 28px', background: '#f6f7f9', borderRadius: 26, border: `5px solid ${bad ? '#c0304a' : LINE}`, boxShadow: '0 20px 50px rgba(0,0,0,0.45)', transform: `rotate(${rot}deg)`, color: '#15151b', fontWeight: 800}}>
    <div style={{fontSize: size * 0.72, color: '#2b5fd9'}}>{name}</div>
    <div style={{fontSize: size, lineHeight: 1.3, marginTop: 6}}>{text}</div>
  </div>
);

// লাইভের চিহ্ন আর দর্শক
export const LiveBadge: React.FC<{viewers?: string}> = ({viewers = '৪০'}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', right: 40, top: 620, display: 'flex', gap: 14, fontSize: 44, fontWeight: 800, color: '#fff'}}>
      <span style={{padding: '6px 22px', borderRadius: 12, background: '#e0243c', opacity: 0.75 + Math.sin(f / 5) * 0.25}}>LIVE</span>
      <span style={{padding: '6px 22px', borderRadius: 12, background: 'rgba(0,0,0,0.6)'}}>{viewers} জন</span>
    </div>
  );
};

// আগের আর নতুন লোগো পাশাপাশি
export const LogoPair: React.FC<{seed?: number}> = ({seed = 0}) => {
  const c = ['#d9652b', '#2b5fd9', '#2a7a6a', '#b0307a'][seed % 4];
  return (
    <div style={{display: 'flex', gap: 30, alignItems: 'center'}}>
      <div style={{width: 340, height: 340, background: '#b9b4a8', border: `6px solid ${LINE}`, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 54, fontWeight: 800, color: '#5a5650', textAlign: 'center'}}>পুরোনো</div>
      <div style={{fontSize: 90, fontWeight: 800, color: '#e3bf7a'}}>→</div>
      <div style={{width: 340, height: 340, background: c, border: `6px solid ${LINE}`, borderRadius: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, fontWeight: 800, color: '#fff', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'}}>নতুন</div>
    </div>
  );
};

// কাগজে কারও নাম/লেখা (সাইনবোর্ড, চিহ্ন)
export const BoardSign: React.FC<{text: string; bg?: string; color?: string; size?: number; w?: number}> = ({text, bg = '#b3201f', color = '#fff4d8', size = 70, w = 760}) => (
  <div style={{width: w, padding: '26px 30px', textAlign: 'center', background: bg, color, fontSize: size, fontWeight: 800, lineHeight: 1.25, border: `8px solid ${LINE}`, borderRadius: 14, boxShadow: '0 20px 50px rgba(0,0,0,0.5)'}}>{text}</div>
);
