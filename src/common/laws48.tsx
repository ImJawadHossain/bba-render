// 48 Laws সিরিজ: রান্নাঘর, হাট, গরু, ফটো স্টুডিও, ফেসবুক পেজ, মিষ্টি, আর "পরের পর্বে" কার্ড
import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {CAST} from './cast';
import {Actor, Backdrop, SP} from './kit';
import {Sign} from './places';
import {TShirt} from './places2';
import {Label, MIDDLE, WOMAN} from './reel';
import {Expression, ToonLook} from './Toon';

const LINE = '#1b1b1f';
const Fill: React.FC<{bg: string; children?: React.ReactNode}> = ({bg, children}) => <AbsoluteFill style={{background: bg}}>{children}</AbsoluteFill>;
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
    {children}
  </svg>
);

// ---------- জায়গা ----------

// রান্নাঘর: জানালা, তাকে বয়াম, টাইলস
export const Kitchen: React.FC<{dim?: boolean}> = ({dim}) => (
  <Fill bg={dim ? 'linear-gradient(180deg, #4a3e30, #241c14)' : 'linear-gradient(180deg, #e3cf9e, #b89a64)'}>
    <Svg>
      <rect x={90} y={300} width={300} height={300} fill={dim ? '#141c32' : '#bfe0f0'} stroke="#5a3a1a" strokeWidth={14} />
      <path d="M240 300 L240 600 M90 450 L390 450" stroke="#5a3a1a" strokeWidth={8} />
      <rect x={560} y={470} width={440} height={18} fill="#7a4e2a" stroke={LINE} strokeWidth={4} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${590 + i * 100} 380)`}>
          <rect width={70} height={90} rx={10} fill={['#c0304a', '#d9a21b', '#3f8a4a', '#d9652b'][i]} stroke={LINE} strokeWidth={4} />
          <rect x={-4} y={-10} width={78} height={18} rx={4} fill="#5a3a22" stroke={LINE} strokeWidth={3} />
        </g>
      ))}
      {Array.from({length: 7}, (_, r) =>
        Array.from({length: 9}, (_, c) => <rect key={`${r}-${c}`} x={c * 120} y={720 + r * 90} width={120} height={90} fill={(r + c) % 2 ? '#e8e2d2' : '#d6ceba'} stroke="#b0a68e" strokeWidth={3} opacity={dim ? 0.45 : 1} />),
      )}
    </Svg>
  </Fill>
);

// কোরবানির হাট: ত্রিপলের ছাউনি, দূরে গরু, খড় ছড়ানো মাটি
export const Haat: React.FC<{sign?: boolean}> = ({sign = true}) => (
  <Fill bg="linear-gradient(180deg, #8ec2e4, #e8dcc0 52%)">
    <Svg>
      {[-40, 300, 640].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 760 L${x + 200} 640 L${x + 400} 760Z`} fill={['#2b6fd9', '#d9652b', '#2a7a6a'][i]} stroke={LINE} strokeWidth={5} />
          <rect x={x + 20} y={760} width={12} height={300} fill="#8a6a3a" />
          <rect x={x + 368} y={760} width={12} height={300} fill="#8a6a3a" />
        </g>
      ))}
      {Array.from({length: 8}, (_, i) => (
        <ellipse key={i} cx={60 + i * 135} cy={1020 + (i % 2) * 20} rx={56} ry={30} fill="#5a4a3a" opacity={0.4} />
      ))}
      <rect x={0} y={1060} width={1080} height={860} fill="#b89a6a" />
      {Array.from({length: 46}, (_, i) => {
        const x = random(`hx${i}`) * 1080;
        const y = 1100 + random(`hy${i}`) * 800;
        return <line key={i} x1={x} y1={y} x2={x + 26} y2={y - 8} stroke="#dcc48e" strokeWidth={5} strokeLinecap="round" />;
      })}
    </Svg>
    {sign ? <Sign text="কোরবানির হাট" bg="#7a4a14" color="#ffe9a8" /> : null}
  </Fill>
);

// ফটো স্টুডিও: সাদা ব্যাকড্রপ, দুই পাশে সফটবক্স
export const PhotoStudio: React.FC<{sign?: boolean}> = ({sign}) => (
  <Fill bg="linear-gradient(180deg, #2e3138, #1a1c22)">
    <Svg>
      <rect x={250} y={260} width={580} height={40} rx={18} fill="#4a4e58" stroke={LINE} strokeWidth={5} />
      <path d="M270 300 L810 300 L810 1150 Q810 1300 960 1320 L120 1320 Q270 1300 270 1150Z" fill="#e8e4da" opacity={0.9} />
      {[60, 880].map((x) => (
        <g key={x}>
          <rect x={x + 62} y={640} width={14} height={720} fill="#14161c" />
          <path d={`M${x} 420 L${x + 140} 420 L${x + 120} 640 L${x + 20} 640Z`} fill="#f6f2e4" stroke={LINE} strokeWidth={6} />
          <path d={`M${x + 30} 1370 L${x + 69} 1300 L${x + 108} 1370`} stroke="#14161c" strokeWidth={8} fill="none" />
        </g>
      ))}
      <rect x={0} y={1320} width={1080} height={600} fill="#3a3c44" />
    </Svg>
    {sign ? <Sign text="মিঠু ফটোগ্রাফি" bg="#14305f" color="#9fd3ff" /> : null}
  </Fill>
);

// ---------- জিনিস ----------

// গরু: মুখ বাম দিকে (flip দিলে ডানে), কুঁজ আছে
export const Cow: React.FC<{color?: 'white' | 'black'; size?: number; flip?: boolean; garland?: boolean}> = ({color = 'white', size = 600, flip, garland}) => {
  const f = useCurrentFrame();
  const body = color === 'black' ? '#2c2c33' : '#f2eee6';
  const shade = color === 'black' ? '#1c1c22' : '#d8d2c4';
  const t = Math.sin(f / 8) * 8;
  return (
    <svg viewBox="0 0 420 300" width={size} height={(size * 300) / 420} style={{overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined}}>
      <path d={`M352 118 C392 ${150 + t} 384 ${206 + t} 372 ${232 + t}`} fill="none" stroke={LINE} strokeWidth={8} />
      <path d={`M368 ${224 + t} q14 18 2 34 q-14 -14 -2 -34z`} fill={shade} stroke={LINE} strokeWidth={4} />
      <rect x={292} y={176} width={30} height={110} rx={10} fill={shade} stroke={LINE} strokeWidth={6} />
      <rect x={116} y={176} width={30} height={110} rx={10} fill={shade} stroke={LINE} strokeWidth={6} />
      <path d="M92 112 C96 72 160 62 230 66 C300 60 362 78 360 140 C358 196 320 214 240 214 C160 214 104 206 92 170Z" fill={body} stroke={LINE} strokeWidth={7} />
      <path d="M104 96 C106 52 150 44 164 82" fill={body} stroke={LINE} strokeWidth={7} />
      <rect x={146} y={190} width={30} height={100} rx={10} fill={body} stroke={LINE} strokeWidth={6} />
      <rect x={322} y={190} width={30} height={100} rx={10} fill={body} stroke={LINE} strokeWidth={6} />
      {[116, 146, 292, 322].map((x) => (
        <rect key={x} x={x} y={276} width={30} height={16} rx={4} fill="#2a2018" />
      ))}
      <path d="M112 104 C84 112 66 128 56 146 L92 176 C104 156 112 138 120 124Z" fill={body} stroke={LINE} strokeWidth={6} />
      <path d="M38 112 C18 96 16 76 26 62 M72 108 C88 90 96 72 90 58" fill="none" stroke="#d9c9a0" strokeWidth={10} strokeLinecap="round" />
      <ellipse cx={86} cy={128} rx={22} ry={11} transform="rotate(-20 86 128)" fill={shade} stroke={LINE} strokeWidth={5} />
      <ellipse cx={54} cy={150} rx={40} ry={46} fill={body} stroke={LINE} strokeWidth={7} />
      <ellipse cx={46} cy={184} rx={30} ry={20} fill={color === 'black' ? '#4a4048' : '#d9b4a4'} stroke={LINE} strokeWidth={5} />
      <circle cx={36} cy={184} r={4} fill={LINE} />
      <circle cx={56} cy={184} r={4} fill={LINE} />
      <circle cx={62} cy={140} r={7} fill={color === 'black' ? '#f2eee6' : LINE} />
      <circle cx={62} cy={140} r={3.5} fill={LINE} />
      {garland
        ? Array.from({length: 7}, (_, i) => <circle key={i} cx={78 + i * 6} cy={176 + Math.sin(i / 1.2) * 14 - i * 6} r={9} fill={i % 2 ? '#ff9a1a' : '#ffd21a'} stroke={LINE} strokeWidth={3} />)
        : null}
    </svg>
  );
};

export const Plate: React.FC<{size?: number}> = ({size = 200}) => (
  <svg viewBox="0 0 200 90" width={size} height={size * 0.45} style={{overflow: 'visible'}}>
    <ellipse cx={100} cy={50} rx={96} ry={36} fill="#f4f6fa" stroke={LINE} strokeWidth={5} />
    <ellipse cx={100} cy={44} rx={60} ry={20} fill="#f1d98a" stroke="#c9a24a" strokeWidth={3} />
    <circle cx={80} cy={40} r={9} fill="#a0622d" />
    <circle cx={118} cy={46} r={8} fill="#a0622d" />
  </svg>
);

// চরিত্রের হাতে (Toon-এর holding)
export const HandSpoon: React.ReactNode = (
  <g>
    <rect x={-5} y={-92} width={10} height={92} rx={4} fill="#c9c4b8" stroke={LINE} strokeWidth={3} />
    <ellipse cx={0} cy={-100} rx={18} ry={12} fill="#c9c4b8" stroke={LINE} strokeWidth={4} />
  </g>
);
export const HandPaper: React.ReactNode = (
  <g>
    <rect x={-42} y={-84} width={84} height={108} rx={4} fill="#f6f2e8" stroke={LINE} strokeWidth={5} />
    <line x1={-28} x2={28} y1={-60} y2={-60} stroke="#8a8a92" strokeWidth={5} />
    <line x1={-28} x2={20} y1={-42} y2={-42} stroke="#8a8a92" strokeWidth={5} />
    <line x1={-28} x2={28} y1={-20} y2={-20} stroke="#b3201f" strokeWidth={8} />
  </g>
);
export const HandCamera: React.ReactNode = (
  <g>
    <rect x={-50} y={-44} width={100} height={64} rx={10} fill="#1b1b1f" stroke="#5a5e68" strokeWidth={5} />
    <circle cx={6} cy={-12} r={24} fill="#2a2e38" stroke="#8a8e96" strokeWidth={5} />
    <rect x={-38} y={-56} width={28} height={14} rx={4} fill="#1b1b1f" />
  </g>
);
export const HandBox: React.ReactNode = (
  <g>
    <rect x={-56} y={-96} width={112} height={100} rx={6} fill="#c89a5a" stroke={LINE} strokeWidth={5} />
    <rect x={-8} y={-96} width={16} height={100} fill="#e8d6a8" />
  </g>
);

// দামের কাগজ: old দিলে আগের দাম কেটে নতুন দাম
export const PriceSheet: React.FC<{amount: string; old?: string; w?: number; label?: string}> = ({amount, old, w = 560, label = 'বিয়ের প্যাকেজ'}) => {
  const f = useCurrentFrame();
  const strike = interpolate(f, [4, 14], [0, 1], clampOpts);
  const pop = spring({frame: f - (old ? 12 : 2), fps: 30, config: {damping: 10}});
  return (
    <div style={{width: w, padding: '36px 30px', background: '#f6f2e8', border: `8px solid ${LINE}`, borderRadius: 16, boxShadow: '0 26px 60px rgba(0,0,0,0.55)', textAlign: 'center', color: '#15151b', fontWeight: 800, transform: 'rotate(-3deg)'}}>
      <div style={{fontSize: w * 0.075, color: '#5a5f6e'}}>{label}</div>
      {old ? (
        <div style={{position: 'relative', display: 'inline-block', fontSize: w * 0.12, color: '#8a8e96', marginTop: 10}}>
          ৳{old}
          <div style={{position: 'absolute', left: -10, top: '52%', height: 12, width: `${strike * 110}%`, background: RED, borderRadius: 6}} />
        </div>
      ) : null}
      <div style={{fontSize: w * 0.2, color: old ? RED : '#15151b', marginTop: 4, transform: `scale(${pop})`}}>৳{amount}</div>
    </div>
  );
};

// ফেসবুক পেজের ওপরের অংশ: oldName দিলে পুরোনো নাম কেটে নতুন নাম
export const PageCard: React.FC<{name: string; followers: string; w?: number; oldName?: string; avatar?: string}> = ({name, followers, w = 680, oldName, avatar = '#2b5fd9'}) => {
  const f = useCurrentFrame();
  const strike = interpolate(f, [4, 14], [0, 1], clampOpts);
  const pop = spring({frame: f - 14, fps: 30, config: {damping: 11}});
  return (
    <div style={{width: w, background: '#f6f7f9', borderRadius: 30, overflow: 'hidden', border: `6px solid ${LINE}`, boxShadow: '0 26px 60px rgba(0,0,0,0.55)', color: '#15151b', fontWeight: 800}}>
      <div style={{position: 'relative', height: w * 0.32, background: 'linear-gradient(120deg, #2b5fd9, #6a3a9a)'}}>
        <div style={{position: 'absolute', left: w * 0.06, bottom: -w * 0.1, width: w * 0.24, height: w * 0.24, borderRadius: '50%', background: avatar, border: '8px solid #f6f7f9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <TShirt size={w * 0.14} color="#f6f7f9" />
        </div>
      </div>
      <div style={{padding: `${w * 0.13}px ${w * 0.06}px ${w * 0.06}px`}}>
        {oldName ? (
          <div style={{position: 'relative', display: 'inline-block', fontSize: w * 0.075, color: '#8a8e96'}}>
            {oldName}
            <div style={{position: 'absolute', left: -6, top: '52%', height: 9, width: `${strike * 106}%`, background: RED, borderRadius: 4}} />
          </div>
        ) : null}
        <div style={{fontSize: w * 0.095, color: oldName ? RED : '#15151b', transform: oldName ? `scale(${pop})` : undefined, transformOrigin: 'left center'}}>{name}</div>
        <div style={{fontSize: w * 0.058, color: '#5a5f6e', marginTop: 8}}>{followers} ফলোয়ার</div>
        <div style={{marginTop: 18, display: 'inline-block', padding: '8px 28px', borderRadius: 12, background: '#2b5fd9', color: '#fff', fontSize: w * 0.05}}>Follow</div>
      </div>
    </div>
  );
};

// ফোনের নোটিফিকেশন
export const Notice: React.FC<{text: string; w?: number}> = ({text, w = 800}) => (
  <div style={{width: w, padding: '26px 30px', background: '#15171d', border: '6px solid #e0243c', borderRadius: 26, color: '#f2efe9', fontWeight: 800, fontSize: 48, lineHeight: 1.3, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', display: 'flex', gap: 24, alignItems: 'center', boxSizing: 'border-box'}}>
    <div style={{flex: '0 0 auto', width: 76, height: 76, borderRadius: '50%', background: '#e0243c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56}}>!</div>
    <div>{text}</div>
  </div>
);

export const Parcels: React.FC<{size?: number}> = ({size = 520}) => (
  <svg viewBox="0 0 280 200" width={size} height={(size * 200) / 280} style={{overflow: 'visible'}}>
    {[[10, 110], [100, 110], [190, 110], [55, 30], [145, 30]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y})`}>
        <rect width={80} height={80} rx={6} fill="#c89a5a" stroke={LINE} strokeWidth={5} />
        <rect x={34} width={12} height={80} fill="#e8d6a8" />
        <rect x={8} y={46} width={30} height={20} fill="#f6f2e8" stroke={LINE} strokeWidth={2} />
      </g>
    ))}
  </svg>
);

// চুক্তির কাগজ: দুজনের সই ফুটে ওঠে
export const Contract: React.FC<{w?: number; a?: string; b?: string}> = ({w = 640, a = 'শুভ', b = 'জনি'}) => {
  const f = useCurrentFrame();
  const sign = (at: number) => interpolate(f, [at, at + 10], [0, 1], clampOpts);
  return (
    <div style={{width: w, padding: '44px 40px', background: '#f6f2e8', border: `8px solid ${LINE}`, borderRadius: 14, boxShadow: '0 26px 60px rgba(0,0,0,0.55)', color: '#15151b', fontWeight: 800, transform: 'rotate(2deg)', boxSizing: 'border-box'}}>
      <div style={{fontSize: w * 0.085, textAlign: 'center'}}>পার্টনারশিপ চুক্তি</div>
      {[0.9, 0.75, 0.85, 0.6].map((k, i) => (
        <div key={i} style={{height: 12, width: `${k * 100}%`, background: '#c9c4b8', borderRadius: 6, margin: '22px 0'}} />
      ))}
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 30}}>
        {[a, b].map((n, i) => (
          <div key={n} style={{textAlign: 'center', width: '44%'}}>
            <div style={{fontSize: w * 0.085, color: '#2b4fa0', fontStyle: 'italic', opacity: sign(4 + i * 10), height: w * 0.12}}>{n}</div>
            <div style={{borderTop: `5px solid ${LINE}`, paddingTop: 8, fontSize: w * 0.045, color: '#5a5f6e'}}>সই</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Lock: React.FC<{size?: number; open?: boolean}> = ({size = 300, open}) => (
  <svg viewBox="0 0 160 200" width={size} height={size * 1.25} style={{overflow: 'visible'}}>
    <path d={open ? 'M40 92 L40 50 C40 10 100 0 112 36' : 'M40 92 L40 54 C40 6 120 6 120 54 L120 92'} fill="none" stroke="#a0a4ac" strokeWidth={20} strokeLinecap="round" />
    <rect x={14} y={86} width={132} height={104} rx={18} fill={GOLD} stroke={LINE} strokeWidth={7} />
    <circle cx={80} cy={128} r={14} fill={LINE} />
    <rect x={74} y={132} width={12} height={34} rx={4} fill={LINE} />
  </svg>
);

export const Camera: React.FC<{size?: number}> = ({size = 420}) => (
  <svg viewBox="0 0 220 160" width={size} height={(size * 160) / 220} style={{overflow: 'visible'}}>
    <rect x={14} y={40} width={192} height={112} rx={16} fill="#1b1b1f" stroke="#5a5e68" strokeWidth={6} />
    <rect x={60} y={20} width={70} height={30} rx={6} fill="#1b1b1f" stroke="#5a5e68" strokeWidth={5} />
    <circle cx={110} cy={96} r={40} fill="#2a2e38" stroke="#8a8e96" strokeWidth={8} />
    <circle cx={110} cy={96} r={18} fill="#4a6a9a" />
    <circle cx={180} cy={62} r={8} fill={RED} />
  </svg>
);

export const Rasgolla: React.FC<{size?: number}> = ({size = 360}) => (
  <svg viewBox="0 0 240 170" width={size} height={(size * 170) / 240} style={{overflow: 'visible'}}>
    <ellipse cx={120} cy={60} rx={110} ry={26} fill="#e8c26a" stroke={LINE} strokeWidth={5} />
    {[[70, 52], [118, 46], [166, 52], [94, 64], [146, 64]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={24} fill="#fbf6ea" stroke={LINE} strokeWidth={4} />
    ))}
    <path d="M10 62 C20 150 70 166 120 166 C170 166 220 150 230 62 C200 84 40 84 10 62Z" fill="#a0522d" stroke={LINE} strokeWidth={6} />
  </svg>
);

export const Roach: React.FC<{size?: number}> = ({size = 220}) => (
  <svg viewBox="0 0 120 160" width={size} height={(size * 160) / 120} style={{overflow: 'visible'}}>
    {[[-1, 50], [-1, 80], [-1, 110], [1, 50], [1, 80], [1, 110]].map(([s, y], i) => (
      <path key={i} d={`M60 ${y} L${60 + s * 44} ${y - 14} L${60 + s * 56} ${y + 10}`} fill="none" stroke="#3a1e0e" strokeWidth={6} strokeLinecap="round" />
    ))}
    <path d="M52 24 C40 4 22 0 8 6 M68 24 C80 4 98 0 112 6" fill="none" stroke="#3a1e0e" strokeWidth={5} />
    <ellipse cx={60} cy={34} rx={20} ry={16} fill="#5a2e14" stroke={LINE} strokeWidth={4} />
    <ellipse cx={60} cy={92} rx={32} ry={58} fill="#7a3e1a" stroke={LINE} strokeWidth={5} />
    <line x1={60} x2={60} y1={42} y2={148} stroke="#3a1e0e" strokeWidth={4} />
  </svg>
);

// কথার বুদবুদ (ছোট, ভিড়ের মুখে)
export const Talk: React.FC<{text: string; size?: number; tail?: 'left' | 'right'; w?: number}> = ({text, size = 56, tail = 'left', w = 620}) => (
  <div style={{position: 'relative', display: 'inline-block', maxWidth: w, padding: '20px 32px', background: '#f6f2e8', border: `6px solid ${LINE}`, borderRadius: 30, color: '#15151b', fontSize: size, fontWeight: 800, lineHeight: 1.25, boxShadow: '0 16px 40px rgba(0,0,0,0.45)'}}>
    {text}
    <div style={{position: 'absolute', bottom: -32, ...(tail === 'left' ? {left: 60} : {right: 60}), width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `32px solid ${LINE}`}} />
  </div>
);

// প্রশ্ন থেকে খবর: প্রশ্নবোধক চিহ্ন মুছে দাঁড়ি বসে
export const QToFact: React.FC<{text: string; size?: number}> = ({text, size = 96}) => {
  const f = useCurrentFrame();
  const q = interpolate(f, [22, 34], [1, 0], clampOpts);
  const dot = interpolate(f, [32, 40], [0, 1], clampOpts);
  return (
    <div style={{fontSize: size, fontWeight: 800, color: '#f2efe9', textAlign: 'center', lineHeight: 1.3, background: 'rgba(5,6,10,0.78)', padding: '24px 34px', borderRadius: 24, whiteSpace: 'nowrap'}}>
      {text}
      <span style={{position: 'relative', display: 'inline-block', width: size * 0.55}}>
        <span style={{color: RED, opacity: q}}>?</span>
        <span style={{position: 'absolute', left: 0, color: GOLD, opacity: dot}}>।</span>
      </span>
    </div>
  );
};

// বন্ধ শাটার, গায়ে কাগজ
export const Shutter: React.FC<{w?: number; text?: string}> = ({w = 720, text = '২১ তারিখ। কাউকে বোলো না।'}) => (
  <div style={{position: 'relative', width: w, height: w * 0.72, background: '#6e7680', border: `10px solid ${LINE}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 26px 60px rgba(0,0,0,0.55)'}}>
    {Array.from({length: 14}, (_, i) => (
      <div key={i} style={{position: 'absolute', left: 0, right: 0, top: i * ((w * 0.72) / 14), height: 6, background: '#4a4e58'}} />
    ))}
    <div style={{position: 'absolute', left: w * 0.08, right: w * 0.08, top: w * 0.2, padding: '22px 18px', background: '#f6f2e8', border: `6px solid ${LINE}`, borderRadius: 10, textAlign: 'center', fontSize: w * 0.075, fontWeight: 900, lineHeight: 1.3, color: RED, transform: 'rotate(-3deg)'}}>{text}</div>
  </div>
);

// দুই কলাম: পুরোনো বনাম নতুন
export const GrowBars: React.FC<{a: string; b: string}> = ({a, b}) => {
  const f = useCurrentFrame();
  const ha = interpolate(f, [2, 18], [0, 360], clampOpts);
  const hb = interpolate(f, [10, 40], [0, 640], clampOpts);
  const col = (label: string, h: number, c: string) => (
    <div style={{textAlign: 'center', width: 300}}>
      <div style={{height: h, background: c, border: `8px solid ${LINE}`, borderRadius: 16}} />
      <div style={{marginTop: 18, fontSize: 54, fontWeight: 800, color: '#f2efe9'}}>{label}</div>
    </div>
  );
  return (
    <div style={{display: 'flex', gap: 90, alignItems: 'flex-end', height: 760}}>
      {col(a, ha, '#6e7680')}
      {col(b, hb, GREEN)}
    </div>
  );
};

// ভিড়: ছোট ছোট মানুষ
const CROWD: ToonLook[] = [CAST.customer, CAST.customer2, CAST.worker, CAST.founder, MIDDLE, {...WOMAN, top: '#2a7a6a', skirt: '#2a7a6a', bottom: '#2a7a6a'}];
export const crowd = (xs: number[], o: {h?: number; y?: number; e?: Expression; from?: number} = {}): Actor[] =>
  xs.map((x, i) => ({look: CROWD[(i + (o.from ?? 0)) % CROWD.length], x, h: o.h ?? 760, y: o.y ?? 1880, expression: o.e ?? 'neutral', gesture: 'idle', lookX: 0}));

// ---------- দৃশ্য ----------

// "পরের পর্বে Law N": মাঝখানে ছবি, নিচে এক লাইন
export const Next =
  (law: number, art: React.ReactNode, o: {title?: string; color?: string; place?: React.ReactNode} = {}): React.FC<SP> =>
  ({dur}) => {
    const f = useCurrentFrame();
    const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
    const artPop = spring({frame: f - 5, fps: 30, config: {damping: 10, stiffness: 140}});
    return (
      <AbsoluteFill>
        {o.place ?? <Backdrop bg="dark" />}
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(224,36,60,0.24), rgba(5,6,10,0.78) 72%)'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 190, textAlign: 'center', transform: `scale(${pop})`}}>
          <div style={{fontSize: 72, fontWeight: 800, color: '#f2efe9', textShadow: '0 6px 26px rgba(0,0,0,0.85)'}}>পরের পর্বে</div>
          <div style={{display: 'inline-block', marginTop: 14, padding: '6px 48px', background: RED, borderRadius: 24, fontSize: 124, fontWeight: 900, color: '#fff', border: `8px solid ${GOLD}`, boxShadow: '0 20px 50px rgba(0,0,0,0.55)'}}>Law {law}</div>
        </div>
        <div style={{position: 'absolute', left: 140, top: 560, width: 800, height: 680, borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 50%, rgba(255,236,200,0.34), rgba(255,236,200,0.08) 55%, rgba(255,236,200,0) 70%)'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 640, height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${artPop})`}}>{art}</div>
        <Vignette strength={0.45} />
        {o.title ? <Label text={o.title} color={o.color ?? GOLD} size={72} top={1210} at={Math.round(dur * 0.2)} /> : null}
      </AbsoluteFill>
    );
  };

// শেষ দৃশ্যের নিচে: পরের পর্বের ছোট চিহ্ন
export const NextBadge: React.FC<{law: number}> = ({law}) => (
  <div style={{padding: '14px 44px', background: RED, borderRadius: 22, border: `6px solid ${GOLD}`, fontSize: 76, fontWeight: 900, color: '#fff'}}>পরের পর্ব: Law {law}</div>
);
