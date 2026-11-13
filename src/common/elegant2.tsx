// 48 Laws সিরিজ, Law 21-48: নতুন জায়গা আর জিনিস (elegant.tsx-এর সাথে মিলিয়ে)
import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {GOLD, RED, clampOpts} from '../biz/art';
import {Sign} from './places';
import {Next, NextBadge} from './laws48';
import {Cta, R, lawBook} from './reel';

const LINE = '#1b1b1f';
const Fill: React.FC<{bg: string; children?: React.ReactNode}> = ({bg, children}) => <AbsoluteFill style={{background: bg}}>{children}</AbsoluteFill>;
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
    {children}
  </svg>
);
const Vb: React.FC<{w: number; h: number; size: number; children: React.ReactNode}> = ({w, h, size, children}) => (
  <svg viewBox={`0 0 ${w} ${h}`} width={size} height={(size * h) / w} style={{overflow: 'visible'}}>
    {children}
  </svg>
);

// ---------- জায়গা ----------

// পার্লার (salon দিলে ছেলেদের সেলুন): বাতির সারি দেওয়া আয়না, তাক
export const Parlour: React.FC<{salon?: boolean; name?: string; signBg?: string}> = ({salon, name, signBg}) => {
  const f = useCurrentFrame();
  return (
    <Fill bg={salon ? 'linear-gradient(180deg, #3e5a62, #22343a)' : 'linear-gradient(180deg, #e8b8c4, #a86a7e)'}>
      <Svg>
        {[150, 590].map((x) => (
          <g key={x}>
            <rect x={x - 30} y={470} width={400} height={500} rx={24} fill={salon ? '#2a3a40' : '#f6e6d8'} stroke={LINE} strokeWidth={8} />
            <rect x={x} y={500} width={340} height={440} rx={14} fill="#bcd6e2" opacity={0.85} />
            <path d={`M${x + 40} 560 L${x + 140} 520 M${x + 60} 640 L${x + 220} 560`} stroke="#fff" strokeWidth={8} opacity={0.5} />
            {Array.from({length: 6}, (_, i) => (
              <circle key={i} cx={x - 6 + i * 70} cy={490} r={14} fill="#fff4c8" opacity={0.75 + 0.25 * Math.sin(f / 6 + i)} />
            ))}
          </g>
        ))}
        <rect x={60} y={990} width={960} height={50} fill={salon ? '#5a4a3a' : '#b07a5a'} stroke={LINE} strokeWidth={6} />
        {[110, 230, 640, 760, 880].map((x, i) => (
          <rect key={x} x={x} y={930} width={44} height={60} rx={8} fill={['#d94a6a', '#4a8ad9', '#e8c04a', '#6ac08a', '#a06ad9'][i]} stroke={LINE} strokeWidth={4} />
        ))}
        <rect x={0} y={1300} width={1080} height={620} fill={salon ? '#1c262a' : '#7a4a5a'} />
        {Array.from({length: 9}, (_, i) => (
          <rect key={i} x={i * 120} y={1300} width={60} height={620} fill="#fff" opacity={0.04} />
        ))}
      </Svg>
      {name ? <Sign text={name} bg={signBg ?? (salon ? '#14305f' : '#7a1f3a')} /> : null}
    </Fill>
  );
};

// মেরামতের দোকান: তাকে টিভি, ফ্যান, ফোন
export const RepairShop: React.FC<{name?: string; only?: boolean}> = ({name, only}) => (
  <Fill bg="linear-gradient(180deg, #4a4e58, #262a32)">
    <Svg>
      {[560, 860].map((y, r) => (
        <g key={y}>
          {Array.from({length: 5}, (_, i) => {
            const x = 80 + i * 190;
            const kind = only ? 2 : (i + r) % 3;
            return (
              <g key={i}>
                {kind === 0 ? <rect x={x} y={y - 150} width={160} height={120} rx={10} fill="#1a1c22" stroke="#8a8e96" strokeWidth={5} /> : null}
                {kind === 1 ? (
                  <g>
                    <circle cx={x + 80} cy={y - 90} r={58} fill="none" stroke="#c8ccd4" strokeWidth={6} />
                    <path d={`M${x + 80} ${y - 90} l40 -30 M${x + 80} ${y - 90} l-46 -20 M${x + 80} ${y - 90} l6 50`} stroke="#c8ccd4" strokeWidth={10} strokeLinecap="round" />
                  </g>
                ) : null}
                {kind === 2 ? <rect x={x + 44} y={y - 170} width={72} height={140} rx={12} fill="#15171d" stroke="#6ab0ff" strokeWidth={5} /> : null}
              </g>
            );
          })}
          <rect x={40} y={y} width={1000} height={18} fill="#8a7050" stroke={LINE} strokeWidth={4} />
        </g>
      ))}
      <rect x={0} y={1280} width={1080} height={640} fill="#1c1e24" />
    </Svg>
    {name ? <Sign text={name} bg={only ? '#14532d' : '#7a4a14'} /> : null}
  </Fill>
);

// বাসের কাউন্টার: রাস্তা, পেছনে বাস
export const BusStand: React.FC<{night?: boolean}> = ({night}) => (
  <Fill bg={night ? 'linear-gradient(180deg, #0d1426, #1a2240)' : 'linear-gradient(180deg, #9ac8e6, #e6eef0 62%)'}>
    <Svg>
      <g transform="translate(40 640)">
        <rect x={0} y={0} width={1000} height={520} rx={40} fill="#c0304a" stroke={LINE} strokeWidth={8} />
        <rect x={0} y={330} width={1000} height={46} fill="#f2e6c8" />
        {Array.from({length: 6}, (_, i) => (
          <rect key={i} x={40 + i * 160} y={60} width={130} height={200} rx={12} fill={night ? '#ffd98a' : '#bcd6e2'} stroke={LINE} strokeWidth={5} />
        ))}
        {[180, 800].map((x) => (
          <g key={x}>
            <circle cx={x} cy={520} r={74} fill="#1a1c22" stroke={LINE} strokeWidth={6} />
            <circle cx={x} cy={520} r={30} fill="#8a8e96" />
          </g>
        ))}
      </g>
      <rect x={0} y={1230} width={1080} height={690} fill={night ? '#20232e' : '#6e7068'} />
      <path d="M0 1500 L1080 1500" stroke="#f2e6c8" strokeWidth={10} strokeDasharray="60 50" />
    </Svg>
  </Fill>
);

// চরের তরমুজ খেত; rot দিলে ফাটা তরমুজ
export const MelonField: React.FC<{rot?: boolean; empty?: boolean}> = ({rot, empty}) => (
  <Fill bg="linear-gradient(180deg, #8ec2e4, #e8eef0 46%)">
    <Svg>
      <rect x={0} y={760} width={1080} height={90} fill="#6ab0d8" />
      <rect x={0} y={840} width={1080} height={1080} fill="#e2cfa0" />
      {Array.from({length: 5}, (_, r) => (
        <path key={r} d={`M0 ${930 + r * 110} Q270 ${900 + r * 110} 540 ${930 + r * 110} T1080 ${930 + r * 110}`} fill="none" stroke="#4a8a3a" strokeWidth={10} />
      ))}
      {empty
        ? null
        : Array.from({length: 14}, (_, i) => {
            const x = 60 + ((i * 157) % 980);
            const y = 940 + Math.floor(i / 3) * 105;
            return (
              <g key={i}>
                <ellipse cx={x} cy={y} rx={56} ry={40} fill={rot ? '#6a7a3a' : '#2f7a3a'} stroke={LINE} strokeWidth={4} />
                <path d={`M${x - 40} ${y - 10} Q${x} ${y - 30} ${x + 40} ${y - 10}`} fill="none" stroke={rot ? '#8a6a3a' : '#9ad08a'} strokeWidth={5} />
                {rot && i % 2 ? <path d={`M${x - 20} ${y - 30} l10 20 l-14 12 l12 16`} stroke="#c0304a" strokeWidth={6} fill="none" /> : null}
              </g>
            );
          })}
    </Svg>
  </Fill>
);

// রেলস্টেশনের প্ল্যাটফর্ম, পেছনে ট্রেন
export const Station: React.FC = () => (
  <Fill bg="linear-gradient(180deg, #5a6a7a, #c8ccd0 60%)">
    <Svg>
      <rect x={0} y={260} width={1080} height={60} fill="#3a3e48" />
      {[120, 540, 960].map((x) => (
        <rect key={x} x={x - 18} y={320} width={36} height={900} fill="#4a4e58" stroke={LINE} strokeWidth={4} />
      ))}
      <rect x={-20} y={620} width={1120} height={420} rx={30} fill="#2a5a8a" stroke={LINE} strokeWidth={8} />
      {Array.from({length: 7}, (_, i) => (
        <rect key={i} x={20 + i * 155} y={680} width={110} height={130} rx={10} fill="#bcd6e2" stroke={LINE} strokeWidth={5} />
      ))}
      <rect x={-20} y={870} width={1120} height={30} fill="#f2c84a" />
      <rect x={0} y={1040} width={1080} height={50} fill="#2a2c30" />
      <rect x={0} y={1090} width={1080} height={830} fill="#a8a49a" />
      <rect x={0} y={1090} width={1080} height={22} fill="#f2c84a" />
    </Svg>
  </Fill>
);

// গ্রামের মুরগির খামার: তারের খাঁচা; open দিলে খাঁচার দরজা খোলা
export const Farm: React.FC<{open?: boolean; night?: boolean}> = ({open, night}) => (
  <Fill bg={night ? 'linear-gradient(180deg, #070b18, #142040 70%)' : 'linear-gradient(180deg, #7ab8e6, #cfe8f2 60%)'}>
    <Svg>
      <path d="M0 900 Q270 840 540 890 T1080 870 L1080 1000 L0 1000Z" fill={night ? '#1a2a1e' : '#3f8a4a'} />
      <path d="M120 760 L540 560 L960 760Z" fill={night ? '#3a2a2a' : '#9a3a2a'} stroke={LINE} strokeWidth={8} />
      <rect x={160} y={760} width={760} height={460} fill={night ? '#2a2e3a' : '#e8e2d2'} stroke={LINE} strokeWidth={8} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <g key={`${r}${c}`}>
            <rect x={190 + c * 180} y={790 + r * 140} width={160} height={120} fill="none" stroke="#6e7680" strokeWidth={4} />
            {Array.from({length: 5}, (_, k) => (
              <line key={k} x1={190 + c * 180 + k * 32} x2={190 + c * 180 + k * 32} y1={790 + r * 140} y2={910 + r * 140} stroke="#6e7680" strokeWidth={3} />
            ))}
            {open && (r + c) % 2 === 0 ? <rect x={190 + c * 180} y={790 + r * 140} width={70} height={120} fill={night ? '#0a0c14' : '#3a3028'} opacity={0.75} /> : null}
          </g>
        )),
      )}
      <rect x={0} y={1220} width={1080} height={700} fill={night ? '#1a2a1e' : '#5a9a4a'} />
    </Svg>
  </Fill>
);

// নদীর খেয়াঘাট: বাঁশের ঘাট, নৌকা
export const Ghat: React.FC<{dusk?: boolean}> = ({dusk}) => (
  <Fill bg={dusk ? 'linear-gradient(180deg, #4a3a78, #c8603f 48%, #f0a860 60%)' : 'linear-gradient(180deg, #8ec2e4, #e6eef0 55%)'}>
    <Svg>
      <path d="M0 860 Q300 820 600 850 T1080 840 L1080 900 L0 900Z" fill={dusk ? '#2a3a2e' : '#4a8a4a'} />
      <rect x={0} y={890} width={1080} height={480} fill={dusk ? '#5a5a8a' : '#5a9ac8'} />
      {Array.from({length: 8}, (_, i) => (
        <path key={i} d={`M${i * 140} ${960 + (i % 3) * 110} q35 -14 70 0`} stroke="#fff" strokeWidth={5} fill="none" opacity={0.4} />
      ))}
      <g transform="translate(560 1060)">
        <path d="M0 40 Q200 120 400 40 L360 0 L40 0Z" fill="#6a4a2a" stroke={LINE} strokeWidth={6} />
        <path d="M120 0 Q200 -90 280 0" fill="#3a3a44" stroke={LINE} strokeWidth={5} />
      </g>
      <rect x={60} y={1080} width={440} height={36} fill="#b89a6a" stroke={LINE} strokeWidth={5} />
      {[90, 230, 370, 480].map((x) => (
        <rect key={x} x={x} y={1110} width={16} height={260} fill="#7a5a3a" />
      ))}
      <rect x={0} y={1360} width={1080} height={560} fill={dusk ? '#3a3028' : '#8a7a5a'} />
    </Svg>
  </Fill>
);

// মুদি দোকানের ভেতর: modern দিলে কাচের সাদা তাক
export const Grocery: React.FC<{modern?: boolean; name?: string}> = ({modern, name}) => (
  <Fill bg={modern ? 'linear-gradient(180deg, #e8ecf0, #b8c0c8)' : 'linear-gradient(180deg, #8a6a48, #4c3b2c)'}>
    <Svg>
      {[560, 790, 1020].map((y, r) => (
        <g key={y}>
          {Array.from({length: 9}, (_, i) => {
            const x = 60 + i * 108;
            return modern ? (
              <rect key={i} x={x} y={y - 140} width={92} height={130} rx={10} fill={['#d94a6a', '#4a8ad9', '#e8c04a', '#6ac08a', '#f2efe6'][(i + r) % 5]} stroke={LINE} strokeWidth={3} />
            ) : (
              <g key={i}>
                <rect x={x + 10} y={y - 130} width={74} height={120} rx={14} fill="#e8dcc0" opacity={0.7} stroke={LINE} strokeWidth={4} />
                <rect x={x + 16} y={y - 70} width={62} height={56} rx={8} fill={['#c87a2a', '#e8c04a', '#8a3a2a', '#f2efe6'][(i + r) % 4]} />
              </g>
            );
          })}
          <rect x={40} y={y} width={1000} height={18} fill={modern ? '#c8ccd4' : '#9a7048'} stroke={LINE} strokeWidth={4} />
        </g>
      ))}
      <rect x={0} y={1280} width={1080} height={640} fill={modern ? '#d8dce0' : '#3a2a1e'} />
      {modern ? null : [140, 300, 460].map((x) => <ellipse key={x} cx={x} cy={1250} rx={70} ry={40} fill="#d8c8a0" stroke={LINE} strokeWidth={5} />)}
    </Svg>
    {name ? <Sign text={name} bg={modern ? '#14305f' : '#7a4a14'} /> : null}
  </Fill>
);

// সরু গলিতে পাশাপাশি দুই বাড়ির গেট; car = কোন গেটের সামনে গাড়ি ('left' | 'right')
export const Lane: React.FC<{car?: 'left' | 'right' | 'both'; morning?: boolean; colors?: [string, string]}> = ({car, morning, colors = ['#e8e2d2', '#2a4a8a']}) => (
  <Fill bg={morning ? 'linear-gradient(180deg, #f0c890, #e8eef0 55%)' : 'linear-gradient(180deg, #0d1426, #1a2240 70%)'}>
    <Svg>
      {[30, 560].map((x, i) => (
        <g key={x}>
          <rect x={x} y={420} width={490} height={860} fill={morning ? (i ? '#d8cfc0' : '#e2d6c4') : i ? '#3a3a44' : '#34343e'} stroke={LINE} strokeWidth={8} />
          <rect x={x + 60} y={520} width={150} height={160} fill={morning ? '#9ec4dc' : '#ffd98a'} stroke={LINE} strokeWidth={5} />
          <rect x={x + 280} y={520} width={150} height={160} fill={morning ? '#9ec4dc' : '#141c32'} stroke={LINE} strokeWidth={5} />
          <rect x={x + 90} y={880} width={310} height={400} fill="#4a4e58" stroke={LINE} strokeWidth={6} />
          {Array.from({length: 8}, (_, k) => (
            <line key={k} x1={x + 110 + k * 38} x2={x + 110 + k * 38} y1={900} y2={1270} stroke="#2a2c34" strokeWidth={6} />
          ))}
        </g>
      ))}
      <rect x={0} y={1280} width={1080} height={640} fill={morning ? '#8a8a82' : '#20232e'} />
    </Svg>
    {car ? (
      <div style={{position: 'absolute', left: 0, right: 0, top: 1090}}>
        {car !== 'right' ? <div style={{position: 'absolute', left: 40}}><Car color={colors[0]} /></div> : null}
        {car !== 'left' ? <div style={{position: 'absolute', left: 570}}><Car color={colors[1]} /></div> : null}
      </div>
    ) : null}
  </Fill>
);

// রাস্তার মোড়ে দোকানঘর, পাশে বড় বিল্ডিং (done দিলে হাসপাতাল তৈরি)
export const CornerShop: React.FC<{done?: boolean; open?: boolean; name?: string}> = ({done, open = true, name}) => (
  <Fill bg="linear-gradient(180deg, #9ac8e6, #e6eef0 62%)">
    <Svg>
      <rect x={430} y={180} width={620} height={1060} fill={done ? '#e8eef2' : '#b8b2a4'} stroke={LINE} strokeWidth={8} />
      {Array.from({length: 7}, (_, r) =>
        [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={470 + c * 145} y={220 + r * 140} width={110} height={90} fill={done ? '#9ec4dc' : '#6e6a62'} stroke={LINE} strokeWidth={4} />),
      )}
      {done ? (
        <g>
          <rect x={700} y={140} width={100} height={100} fill="#fff" stroke={LINE} strokeWidth={5} />
          <path d="M750 158 L750 222 M718 190 L782 190" stroke={RED} strokeWidth={20} />
        </g>
      ) : (
        Array.from({length: 8}, (_, i) => <line key={i} x1={420 + i * 90} x2={420 + i * 90} y1={170} y2={1240} stroke="#c87a2a" strokeWidth={6} opacity={0.8} />)
      )}
      <rect x={40} y={760} width={420} height={480} fill="#c7a678" stroke={LINE} strokeWidth={8} />
      <rect x={90} y={900} width={320} height={340} fill={open ? '#5a4230' : '#6e7680'} stroke={LINE} strokeWidth={6} />
      {!open ? Array.from({length: 6}, (_, i) => <line key={i} x1={90} x2={410} y1={940 + i * 50} y2={940 + i * 50} stroke="#4a4e58" strokeWidth={5} />) : null}
      <rect x={0} y={1240} width={1080} height={680} fill="#8a8a82" />
      <path d="M0 1520 L1080 1520" stroke="#f2e6c8" strokeWidth={8} strokeDasharray="50 40" />
    </Svg>
    {name ? <div style={{position: 'absolute', left: 60, top: 790, width: 380, padding: '10px 0', textAlign: 'center', background: '#14532d', color: '#ffe9a8', fontSize: 46, fontWeight: 800, border: `6px solid ${LINE}`, borderRadius: 10}}>{name}</div> : null}
  </Fill>
);

// ক্রিকেট মাঠ
export const Cricket: React.FC<{dusk?: boolean}> = ({dusk}) => (
  <Fill bg={dusk ? 'linear-gradient(180deg, #4a3a78, #c8603f 48%, #f0a860 62%)' : 'linear-gradient(180deg, #7ab8e6, #cfe8f2 50%)'}>
    <Svg>
      {Array.from({length: 18}, (_, i) => (
        <rect key={i} x={i * 62} y={760 + (i % 2) * 14} width={50} height={90} fill={['#c0304a', '#2a5a8a', '#e8c04a', '#2a7a6a'][i % 4]} opacity={0.75} />
      ))}
      <rect x={0} y={850} width={1080} height={1070} fill={dusk ? '#3a6a2e' : '#4a9a3a'} />
      {Array.from({length: 6}, (_, i) => (
        <rect key={i} x={0} y={850 + i * 180} width={1080} height={90} fill="#fff" opacity={0.05} />
      ))}
      <path d="M430 1000 L650 1000 L720 1500 L360 1500Z" fill="#d8c08a" />
      {[500, 540, 580].map((x) => (
        <rect key={x} x={x - 6} y={940} width={12} height={90} fill="#f2efe6" stroke={LINE} strokeWidth={3} />
      ))}
    </Svg>
  </Fill>
);

// গ্রামের স্কুল: কাদার রাস্তা; gate দিলে পাকা গেট, ওপরে নাম
export const SchoolGate: React.FC<{gate?: string; mud?: boolean}> = ({gate, mud = true}) => (
  <Fill bg="linear-gradient(180deg, #7ab8e6, #cfe8f2 60%)">
    <Svg>
      <rect x={120} y={560} width={840} height={520} fill="#e8d6b0" stroke={LINE} strokeWidth={8} />
      <path d="M90 570 L540 430 L990 570Z" fill="#9a3a2a" stroke={LINE} strokeWidth={8} />
      {Array.from({length: 5}, (_, i) => (
        <rect key={i} x={170 + i * 160} y={680} width={100} height={130} fill="#2a5a7a" stroke={LINE} strokeWidth={5} />
      ))}
      <rect x={0} y={1080} width={1080} height={840} fill="#5a9a4a" />
      <path d="M420 1080 L660 1080 L820 1920 L260 1920Z" fill={mud ? '#7a5a3a' : '#a8a49a'} />
      {mud ? [1200, 1400, 1650].map((y, i) => <ellipse key={y} cx={500 + i * 40} cy={y} rx={70 + i * 20} ry={18} fill="#5a3e24" opacity={0.7} />) : null}
      {gate ? (
        <g>
          <rect x={300} y={900} width={60} height={420} fill="#c8ccd4" stroke={LINE} strokeWidth={6} />
          <rect x={720} y={900} width={60} height={420} fill="#c8ccd4" stroke={LINE} strokeWidth={6} />
          <path d="M280 940 Q540 800 800 940 L800 990 Q540 860 280 990Z" fill="#c8ccd4" stroke={LINE} strokeWidth={6} />
        </g>
      ) : null}
    </Svg>
    {gate ? <div style={{position: 'absolute', left: 300, top: 975, width: 480, textAlign: 'center', fontSize: 56, fontWeight: 900, color: '#14305f'}}>{gate}</div> : null}
  </Fill>
);

// ফুটপাত: সামনে মার্কেট, ফুটপাতে হকারের চৌকি (n টা)
export const Footpath: React.FC<{n?: number}> = ({n = 6}) => (
  <Fill bg="linear-gradient(180deg, #caa878, #8a6a44 62%)">
    <Svg>
      <rect x={0} y={260} width={1080} height={1000} fill="#d8cfc0" stroke={LINE} strokeWidth={8} />
      {[0, 1, 2].map((c) => (
        <rect key={c} x={70 + c * 330} y={760} width={280} height={500} fill="#5a4230" stroke={LINE} strokeWidth={6} />
      ))}
      <rect x={0} y={1260} width={1080} height={660} fill="#9a958a" />
      {Array.from({length: n}, (_, i) => {
        const x = 30 + (i % 4) * 265;
        const y = 1300 + Math.floor(i / 4) * 150;
        return (
          <g key={i}>
            <rect x={x} y={y} width={220} height={90} fill="#8a6a44" stroke={LINE} strokeWidth={5} />
            {[0, 1, 2, 3].map((k) => (
              <rect key={k} x={x + 14 + k * 50} y={y - 30} width={40} height={36} rx={6} fill={['#d94a6a', '#4a8ad9', '#e8c04a', '#6ac08a'][(k + i) % 4]} stroke={LINE} strokeWidth={3} />
            ))}
          </g>
        );
      })}
    </Svg>
  </Fill>
);

// বসার ঘরের দেয়াল: stain = পানির দাগ, paint = নতুন রং
export const Room: React.FC<{stain?: boolean; paint?: string}> = ({stain, paint}) => (
  <Fill bg={paint ?? 'linear-gradient(180deg, #d8d0bc, #b8ae98)'}>
    <Svg>
      <rect x={0} y={1300} width={1080} height={620} fill="#6a4a34" />
      <rect x={640} y={420} width={300} height={380} fill="#9ec4dc" stroke="#5a4230" strokeWidth={14} />
      <path d="M790 420 L790 800 M640 610 L940 610" stroke="#5a4230" strokeWidth={8} />
      {stain ? <path d="M140 260 C220 300 180 420 260 480 C320 540 230 640 300 720 C220 760 120 700 110 600 C90 480 60 360 140 260Z" fill="#8a7a5a" opacity={0.55} /> : null}
      <rect x={60} y={1040} width={480} height={260} rx={30} fill="#7a3a3a" stroke={LINE} strokeWidth={6} />
    </Svg>
  </Fill>
);

// ---------- জিনিস ----------

export const Melon: React.FC<{size?: number; small?: boolean}> = ({size = 360, small}) => (
  <Vb w={240} h={170} size={size}>
    <ellipse cx={120} cy={90} rx={small ? 84 : 110} ry={small ? 60 : 76} fill="#2f7a3a" stroke={LINE} strokeWidth={6} />
    {[-50, -16, 18, 52].map((d) => (
      <path key={d} d={`M${120 + d} ${small ? 34 : 18} Q${120 + d * 1.3} 90 ${120 + d} ${small ? 146 : 162}`} fill="none" stroke="#9ad08a" strokeWidth={7} opacity={0.8} />
    ))}
  </Vb>
);

export const Truck: React.FC<{size?: number}> = ({size = 520}) => (
  <Vb w={300} h={170} size={size}>
    <rect x={10} y={20} width={190} height={110} rx={6} fill="#2a7a6a" stroke={LINE} strokeWidth={6} />
    <path d="M200 60 L260 60 L290 100 L290 130 L200 130Z" fill="#e8c04a" stroke={LINE} strokeWidth={6} />
    <rect x={218} y={70} width={40} height={30} fill="#bcd6e2" stroke={LINE} strokeWidth={4} />
    {[60, 240].map((x) => (
      <circle key={x} cx={x} cy={138} r={24} fill="#1a1c22" stroke={LINE} strokeWidth={5} />
    ))}
  </Vb>
);

// বাতাসে উড়ছে মুড়ি, নিচে টিনের বাটি
export const MuriBowl: React.FC<{size?: number; fly?: boolean}> = ({size = 420, fly = true}) => {
  const f = useCurrentFrame();
  return (
    <Vb w={240} h={300} size={size}>
      {fly
        ? Array.from({length: 26}, (_, i) => {
            const t = ((f * 0.05 + random(`mt${i}`)) % 1 + 1) % 1;
            const x = 120 + (random(`mx${i}`) - 0.5) * 150;
            const y = 200 - Math.sin(t * Math.PI) * (140 + random(`mh${i}`) * 60);
            return <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 7 : 5} fill={i % 7 === 0 ? '#c0304a' : i % 5 === 0 ? '#6ac08a' : '#f2e2b0'} />;
          })
        : null}
      <path d="M30 210 L210 210 L180 290 L60 290Z" fill="#b8bcc4" stroke={LINE} strokeWidth={6} />
      <ellipse cx={120} cy={210} rx={90} ry={18} fill="#e8dcb0" stroke={LINE} strokeWidth={5} />
    </Vb>
  );
};

export const Chicken: React.FC<{size?: number}> = ({size = 220}) => (
  <Vb w={200} h={180} size={size}>
    <ellipse cx={100} cy={110} rx={70} ry={52} fill="#f2ede0" stroke={LINE} strokeWidth={5} />
    <circle cx={150} cy={64} r={30} fill="#f2ede0" stroke={LINE} strokeWidth={5} />
    <path d="M140 36 q10 -20 20 0 q10 -16 16 4" fill="#c0304a" />
    <path d="M178 66 l18 6 l-18 6Z" fill="#e8a02a" />
    <circle cx={156} cy={60} r={4} fill={LINE} />
    <path d="M86 160 l0 18 M116 160 l0 18" stroke="#e8a02a" strokeWidth={6} />
  </Vb>
);

export const Mango: React.FC<{size?: number}> = ({size = 200}) => (
  <Vb w={160} h={130} size={size}>
    <path d="M30 70 C20 20 120 10 140 60 C150 100 90 125 60 115 C40 108 34 90 30 70Z" fill="#e8b830" stroke={LINE} strokeWidth={5} />
    <path d="M60 30 C70 50 110 50 120 40" fill="none" stroke="#7ab040" strokeWidth={6} opacity={0.7} />
    <path d="M128 40 q16 -20 30 -14" stroke="#4a8a3a" strokeWidth={6} fill="none" />
  </Vb>
);

// আমের ঝুড়ি (স্তূপ) বা সাজানো কাঠের বাক্স
export const MangoBox: React.FC<{neat?: boolean; size?: number}> = ({neat, size = 620}) => (
  <Vb w={300} h={170} size={size}>
    {neat ? (
      <g>
        <rect x={10} y={40} width={280} height={120} fill="#8a5a2a" stroke={LINE} strokeWidth={6} />
        <rect x={20} y={36} width={260} height={30} fill="#f6f2e8" />
        {Array.from({length: 5}, (_, i) => (
          <ellipse key={i} cx={46 + i * 52} cy={44} rx={22} ry={18} fill="#e8b830" stroke={LINE} strokeWidth={3} />
        ))}
      </g>
    ) : (
      <g>
        {Array.from({length: 14}, (_, i) => (
          <ellipse key={i} cx={50 + ((i * 41) % 200)} cy={60 + Math.floor(i / 5) * 20 - (i % 3) * 8} rx={22} ry={17} fill={i % 4 ? '#e8b830' : '#c8a020'} stroke={LINE} strokeWidth={3} />
        ))}
        <path d="M20 90 L280 90 L250 165 L50 165Z" fill="#a87a3a" stroke={LINE} strokeWidth={6} />
      </g>
    )}
  </Vb>
);

export const Car: React.FC<{size?: number; color?: string}> = ({size = 470, color = '#e8e2d2'}) => (
  <Vb w={300} h={140} size={size}>
    <path d="M20 90 L50 50 Q70 30 110 30 L200 30 Q230 30 250 55 L285 90 L285 115 L15 115Z" fill={color} stroke={LINE} strokeWidth={6} />
    <path d="M70 52 L110 38 L150 38 L150 70 L60 70Z M160 38 L200 38 L230 70 L160 70Z" fill="#9ec4dc" stroke={LINE} strokeWidth={4} />
    {[75, 225].map((x) => (
      <g key={x}>
        <circle cx={x} cy={115} r={24} fill="#1a1c22" stroke={LINE} strokeWidth={5} />
        <circle cx={x} cy={115} r={9} fill="#8a8e96" />
      </g>
    ))}
  </Vb>
);

export const Cassette: React.FC<{size?: number}> = ({size = 380}) => (
  <Vb w={240} h={150} size={size}>
    <rect x={8} y={8} width={224} height={134} rx={12} fill="#2a2c34" stroke={LINE} strokeWidth={6} />
    <rect x={30} y={24} width={180} height={50} rx={6} fill="#f2c84a" />
    <rect x={60} y={86} width={120} height={40} rx={18} fill="#15171d" stroke="#8a8e96" strokeWidth={4} />
    {[86, 154].map((x) => (
      <circle key={x} cx={x} cy={106} r={12} fill="#f6f2e8" />
    ))}
  </Vb>
);

export const Copier: React.FC<{size?: number; dead?: boolean}> = ({size = 440, dead}) => (
  <Vb w={260} h={220} size={size}>
    <rect x={20} y={40} width={220} height={150} rx={10} fill={dead ? '#8a8e96' : '#e8eaee'} stroke={LINE} strokeWidth={6} />
    <rect x={10} y={20} width={240} height={30} rx={6} fill="#5a5f6e" stroke={LINE} strokeWidth={5} />
    <rect x={60} y={150} width={140} height={20} fill="#f6f2e8" stroke={LINE} strokeWidth={4} />
    <circle cx={210} cy={80} r={9} fill={dead ? '#c0304a' : '#3ad26e'} />
    {dead ? <path d="M60 80 L120 120 M120 80 L60 120" stroke="#c0304a" strokeWidth={10} strokeLinecap="round" /> : null}
  </Vb>
);

// পুরোনো আমলের বড় চাবি
export const Key: React.FC<{size?: number}> = ({size = 420}) => (
  <Vb w={260} h={110} size={size}>
    <circle cx={50} cy={55} r={40} fill="none" stroke={GOLD} strokeWidth={16} />
    <rect x={88} y={47} width={160} height={16} fill={GOLD} />
    <rect x={200} y={60} width={14} height={32} fill={GOLD} />
    <rect x={226} y={60} width={14} height={24} fill={GOLD} />
  </Vb>
);

export const Roller: React.FC<{size?: number; color?: string}> = ({size = 300, color = '#f2e6c0'}) => (
  <Vb w={160} h={240} size={size}>
    <rect x={10} y={10} width={140} height={56} rx={22} fill={color} stroke={LINE} strokeWidth={6} />
    <path d="M150 38 L150 90 L80 90 L80 130" fill="none" stroke="#5a5f6e" strokeWidth={8} />
    <rect x={66} y={128} width={28} height={100} rx={10} fill="#c0304a" stroke={LINE} strokeWidth={5} />
  </Vb>
);

export const Panjabi: React.FC<{size?: number; color?: string}> = ({size = 380, color = '#f2efe6'}) => (
  <Vb w={200} h={260} size={size}>
    <path d="M70 10 L100 30 L130 10 L190 50 L170 100 L150 90 L150 250 L50 250 L50 90 L30 100 L10 50Z" fill={color} stroke={LINE} strokeWidth={6} />
    <path d="M100 30 L100 110" stroke={LINE} strokeWidth={4} />
    {[54, 74, 94].map((y) => (
      <circle key={y} cx={106} cy={y} r={4} fill={GOLD} />
    ))}
  </Vb>
);

// ভোটের বাক্স
export const Ballot: React.FC<{size?: number}> = ({size = 360}) => (
  <Vb w={200} h={200} size={size}>
    <rect x={20} y={60} width={160} height={130} rx={8} fill="#e8eef2" stroke={LINE} strokeWidth={6} />
    <rect x={60} y={56} width={80} height={10} fill={LINE} />
    <rect x={74} y={10} width={52} height={64} fill="#f6f2e8" stroke={LINE} strokeWidth={4} transform="rotate(-8 100 40)" />
  </Vb>
);

// প্লাস্টিকের মাথা (চুল কাটার অনুশীলন)
export const Dummy: React.FC<{size?: number}> = ({size = 360}) => (
  <Vb w={200} h={240} size={size}>
    <path d="M40 120 C40 40 160 40 160 120 C160 180 130 200 100 200 C70 200 40 180 40 120Z" fill="#e8c8a8" stroke={LINE} strokeWidth={6} />
    <path d="M40 110 C40 30 160 30 160 110 C140 80 60 80 40 110Z" fill="#2a1c12" />
    <rect x={80} y={200} width={40} height={30} fill="#8a8e96" stroke={LINE} strokeWidth={5} />
    <path d="M150 150 L196 120 M150 150 L196 170" stroke="#b8bcc4" strokeWidth={8} strokeLinecap="round" />
    <circle cx={150} cy={150} r={8} fill="#5a5f6e" />
  </Vb>
);

// ভাঙা ডিসপ্লের ফোন / নতুন ডিসপ্লে
export const Screen: React.FC<{size?: number; broken?: boolean}> = ({size = 260, broken}) => (
  <Vb w={120} h={220} size={size}>
    <rect x={6} y={6} width={108} height={208} rx={18} fill="#15171d" stroke="#8a8e96" strokeWidth={5} />
    <rect x={16} y={24} width={88} height={170} rx={8} fill={broken ? '#2a3040' : 'url(#scrg)'} />
    <defs>
      <linearGradient id="scrg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4a8ad9" />
        <stop offset="1" stopColor="#a06ad9" />
      </linearGradient>
    </defs>
    {broken ? <path d="M60 60 L30 90 M60 60 L96 40 M60 60 L80 120 L50 170 M60 60 L20 140" stroke="#e8eaee" strokeWidth={3} /> : null}
  </Vb>
);

// গাছের চারার টব
export const Plants: React.FC<{size?: number; n?: number}> = ({size = 640, n = 5}) => (
  <Vb w={400} h={200} size={size}>
    {Array.from({length: n}, (_, i) => {
      const x = 40 + i * (320 / Math.max(1, n - 1));
      return (
        <g key={i}>
          <path d={`M${x} 120 Q${x - 30} 60 ${x - 10} 30 M${x} 120 Q${x + 30} 50 ${x + 14} 20 M${x} 120 Q${x} 70 ${x} 40`} stroke="#3f8a4a" strokeWidth={8} fill="none" />
          {[-20, 18, 0].map((d, k) => (
            <ellipse key={k} cx={x + d} cy={40 + k * 14} rx={16} ry={9} fill="#5ab04a" transform={`rotate(${d} ${x + d} ${40 + k * 14})`} />
          ))}
          <path d={`M${x - 30} 120 L${x + 30} 120 L${x + 22} 180 L${x - 22} 180Z`} fill="#c0602a" stroke={LINE} strokeWidth={5} />
        </g>
      );
    })}
  </Vb>
);

export const Boat: React.FC<{size?: number}> = ({size = 520}) => (
  <Vb w={300} h={140} size={size}>
    <path d="M10 60 Q150 150 290 60 L260 40 L40 40Z" fill="#6a4a2a" stroke={LINE} strokeWidth={6} />
    <path d="M100 40 Q150 -30 200 40" fill="#3a3a44" stroke={LINE} strokeWidth={5} />
  </Vb>
);

export const Bat: React.FC<{size?: number}> = ({size = 360}) => (
  <Vb w={100} h={300} size={size}>
    <rect x={38} y={6} width={24} height={90} rx={8} fill="#2a2c34" />
    <path d="M24 96 L76 96 L80 280 Q50 296 20 280Z" fill="#e8c890" stroke={LINE} strokeWidth={5} />
  </Vb>
);

// দলিলে সই / ভিজিটিং কার্ড
export const VisitingCard: React.FC<{name: string; sub?: string; w?: number}> = ({name, sub, w = 620}) => (
  <div style={{width: w, padding: '34px 40px', background: '#f6f7f9', borderRadius: 18, border: `6px solid ${LINE}`, borderLeft: `26px solid #14305f`, boxShadow: '0 26px 60px rgba(0,0,0,0.5)', fontWeight: 800, color: '#14305f'}}>
    <div style={{fontSize: w * 0.1}}>{name}</div>
    {sub ? <div style={{fontSize: w * 0.06, color: '#5a5f6e', marginTop: 10}}>{sub}</div> : null}
  </div>
);

// নিলামের দাম: বড় অঙ্ক, ওপরে ছোট লেখা
export const Bid: React.FC<{amount: string; label?: string; color?: string}> = ({amount, label = 'নিলামের ডাক', color = GOLD}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 6], [1.6, 1], clampOpts);
  return (
    <div style={{padding: '30px 60px', background: 'rgba(14,16,24,0.82)', border: `6px solid ${color}`, borderRadius: 30, textAlign: 'center', fontWeight: 900, transform: `scale(${s})`, boxShadow: '0 30px 70px rgba(0,0,0,0.5)'}}>
      <div style={{fontSize: 46, color: '#f2efe9'}}>{label}</div>
      <div style={{fontSize: 150, color, lineHeight: 1.1, whiteSpace: 'nowrap'}}>{amount}</div>
    </div>
  );
};

// ---------- পর্বের শেষ অংশ ----------

export const QMark: React.FC = () => <div style={{fontSize: 420, fontWeight: 900, color: RED, lineHeight: 1}}>?</div>;

// বই, শিক্ষা আর "পরের পর্বে" তিনটা কার্ড + CTA একসাথে
export const ending = (law: number, place: React.ReactNode, a: [React.ReactNode, string], b: [React.ReactNode, string], c: string) => ({
  book: lawBook(law),
  lesson: R({bg: 'plain'}),
  next: Next(law + 1, a[0], {title: a[1], place}),
  next2: Next(law + 1, b[0], {title: b[1], place}),
  next3: Next(law + 1, <QMark />, {title: c, place}),
  cta: () => (
    <Cta>
      <NextBadge law={law + 1} />
    </Cta>
  ),
});

// ফোনের পর্দায় পাঠানো মেসেজের সারি
export const MsgPhone: React.FC<{lines: string[]; w?: number; seen?: boolean}> = ({lines, w = 460, seen = true}) => (
  <div style={{width: w, height: w * 1.7, borderRadius: w * 0.11, background: '#15171d', border: '10px solid #3a3e48', padding: w * 0.04, boxSizing: 'border-box', boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
    <div style={{width: '100%', height: '100%', borderRadius: w * 0.07, background: '#10131a', padding: 22, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 16}}>
      {lines.map((t) => (
        <div key={t} style={{alignSelf: 'flex-end', maxWidth: '86%', background: '#2b5fd9', color: '#fff', borderRadius: 22, padding: '12px 20px', fontSize: w * 0.072, fontWeight: 700, lineHeight: 1.3}}>{t}</div>
      ))}
      {seen ? <div style={{alignSelf: 'flex-end', color: '#8a8e96', fontSize: w * 0.06, fontWeight: 700}}>Seen</div> : null}
    </div>
  </div>
);
