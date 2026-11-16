// চরিত্র, জিনিসপত্র আর গ্যালারির পটভূমি (সব SVG, আলাদা ছবি লাগে না)
import React, {useId} from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';

export const BG = '#0b0908';
export const FG = '#f2efe9';
export const RED = '#e0243c';
export const GOLD = '#e3bf7a';
export const DIM = '#2a2a35';
export const PINK = '#e8a0b4';

const useSvgId = () => useId().replace(/:/g, '');

// ---------- Marina ----------

export type MarinaProps = {
  height?: number;
  blink?: number; // 0 খোলা, 1 বন্ধ
  tear?: number; // 0..1 চোখের জল গড়িয়ে নামা
  torn?: number; // 0..1 ছেঁড়া হাতা
  marks?: number; // 0..1 কাটা দাগ
  lookX?: number; // -1..1 চোখের মণি
  style?: React.CSSProperties;
};

export const Marina: React.FC<MarinaProps> = ({height = 1000, blink = 0, tear = 0, torn = 0, marks = 0, lookX = 0, style}) => {
  const id = useSvgId();
  const open = Math.max(0.06, 1 - blink);
  const skin = `url(#${id}skin)`;
  const dress = `url(#${id}dress)`;
  const hair = `url(#${id}hair)`;
  const eye = (cx: number) => (
    <g transform={`translate(${cx} 170)`}>
      <g transform={`scale(1 ${open})`}>
        <path d="M-17 0 Q0 -11 17 0 Q0 10 -17 0Z" fill="#f4ece4" />
        <circle cx={lookX * 5} cy={0.5} r={7} fill="#4a3426" />
        <circle cx={lookX * 5} cy={0.5} r={3.4} fill="#0d0907" />
        <circle cx={lookX * 5 + 2.5} cy={-2} r={1.6} fill="#fff" />
        <path d="M-18 1 Q0 -12.5 18 1" stroke="#1e120c" strokeWidth={3.6} fill="none" strokeLinecap="round" />
      </g>
      <path d={cx < 200 ? 'M-18 1 L-23 -3' : 'M18 1 L23 -3'} stroke="#1e120c" strokeWidth={2.6} strokeLinecap="round" />
      <path d="M-13 8 Q0 12 13 8" stroke="rgba(120,70,50,0.3)" strokeWidth={2} fill="none" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 1000" width={height * 0.4} height={height} style={{overflow: 'visible', ...style}}>
      <defs>
        <linearGradient id={`${id}skin`} x1="0" x2="1">
          <stop offset="0" stopColor="#b98266" />
          <stop offset="0.45" stopColor="#ecc4a5" />
          <stop offset="0.6" stopColor="#f0cdb1" />
          <stop offset="1" stopColor="#b98266" />
        </linearGradient>
        <radialGradient id={`${id}face`} cx="0.5" cy="0.42" r="0.62">
          <stop offset="0" stopColor="#f6d6bc" />
          <stop offset="0.75" stopColor="#e0ae8e" />
          <stop offset="1" stopColor="#b77e60" />
        </radialGradient>
        <linearGradient id={`${id}dress`} x1="0" x2="1">
          <stop offset="0" stopColor="#08080b" />
          <stop offset="0.5" stopColor="#25242c" />
          <stop offset="1" stopColor="#08080b" />
        </linearGradient>
        <linearGradient id={`${id}hair`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e1f19" />
          <stop offset="1" stopColor="#0f0a08" />
        </linearGradient>
      </defs>

      {/* পেছনের চুল */}
      <path d="M200 78 C118 78 104 170 110 262 C114 330 100 385 86 432 C130 448 270 448 314 432 C300 385 286 330 290 262 C296 170 282 78 200 78Z" fill={hair} />

      {/* হাত (শরীরের পেছনে) */}
      <path d="M128 312 C104 340 96 420 98 520 C99 575 102 610 108 640" stroke={dress} strokeWidth={46} strokeLinecap="round" fill="none" />
      <path d="M272 312 C296 340 304 420 302 520 C301 575 298 610 292 640" stroke={dress} strokeWidth={46} strokeLinecap="round" fill="none" />
      {torn > 0 ? (
        <g opacity={torn}>
          <path d="M286 352 C300 390 304 440 302 520 C301 575 298 610 292 640" stroke={skin} strokeWidth={34} strokeLinecap="round" fill="none" />
          <path d="M268 330 L284 352 L296 344 L304 362 L318 356" stroke="#0b0b0e" strokeWidth={10} strokeLinejoin="bevel" fill="none" />
        </g>
      ) : null}
      <ellipse cx={108} cy={662} rx={21} ry={32} fill="#e2b090" />
      <ellipse cx={292} cy={662} rx={21} ry={32} fill="#e2b090" />

      {/* গলা */}
      <path d="M176 222 L176 294 C186 302 214 302 224 294 L224 222Z" fill={skin} />
      <path d="M176 236 C188 262 212 262 224 236 L224 226 L176 226Z" fill="rgba(110,60,40,0.35)" />

      {/* জামা */}
      <path d="M124 300 C150 284 176 280 200 280 C224 280 250 284 276 300 C292 350 290 420 280 480 C300 640 312 820 320 978 L80 978 C88 820 100 640 120 480 C110 420 108 350 124 300Z" fill={dress} />
      <path d="M168 284 C182 322 218 322 232 284 C222 280 178 280 168 284Z" fill={skin} />
      <path d="M200 330 L200 960" stroke="rgba(255,255,255,0.04)" strokeWidth={30} />
      <path d="M150 520 C160 700 150 860 140 975 M252 520 C246 700 256 860 262 975" stroke="rgba(0,0,0,0.45)" strokeWidth={6} fill="none" />
      {torn > 0 ? (
        <path d="M232 296 L246 316 L238 330 L258 344 L250 360 L274 372" stroke="#4a4955" strokeWidth={4} fill="none" opacity={torn} />
      ) : null}

      {/* কাটা দাগ (প্রতীকী) */}
      {marks > 0 ? (
        <g stroke="#b3202f" strokeWidth={3.5} strokeLinecap="round" opacity={marks}>
          <path d="M184 270 L204 262" />
          <path d="M210 304 L230 298" />
          <path d="M296 430 L310 452" opacity={torn} />
          <path d="M290 480 L304 496" opacity={torn} />
        </g>
      ) : null}

      {/* মুখ */}
      <ellipse cx={142} cy={176} rx={9} ry={16} fill="#d29c7c" />
      <ellipse cx={258} cy={176} rx={9} ry={16} fill="#d29c7c" />
      <path d="M200 90 C244 90 260 126 259 168 C258 210 236 240 200 246 C164 240 142 210 141 168 C140 126 156 90 200 90Z" fill={`url(#${id}face)`} />
      <path d="M160 222 C172 238 186 244 200 246 C214 244 228 238 240 222" stroke="rgba(120,64,44,0.25)" strokeWidth={4} fill="none" />
      <ellipse cx={164} cy={202} rx={15} ry={8} fill="rgba(215,110,100,0.22)" />
      <ellipse cx={236} cy={202} rx={15} ry={8} fill="rgba(215,110,100,0.22)" />
      <path d="M158 149 Q175 140 191 147" stroke="#24160f" strokeWidth={5} strokeLinecap="round" fill="none" />
      <path d="M209 147 Q225 140 242 149" stroke="#24160f" strokeWidth={5} strokeLinecap="round" fill="none" />
      {eye(176)}
      {eye(224)}
      <path d="M200 174 C198 190 193 198 195 202 C199 206 206 205 209 200" stroke="rgba(140,80,58,0.65)" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M183 222 Q192 215 200 219 Q208 215 217 222 Q200 226 183 222Z" fill="#9c4a47" />
      <path d="M185 223 Q200 237 215 223 Q200 228 185 223Z" fill="#b65e59" />
      {tear > 0 ? (
        <g transform={`translate(230 ${182 + tear * 46})`} opacity={Math.min(1, tear * 4)}>
          <path d="M0 -8 C-6 2 -6 9 0 10 C6 9 6 2 0 -8Z" fill="rgba(210,235,255,0.92)" />
          <path d="M0 -40 L0 -10" stroke="rgba(210,235,255,0.35)" strokeWidth={3} opacity={Math.min(1, tear * 2)} />
        </g>
      ) : null}

      {/* সামনের চুল */}
      <path d="M134 182 C126 108 160 82 200 82 C240 82 274 108 266 182 C258 130 232 102 200 100 C168 102 142 130 134 182Z" fill={hair} />
      <path d="M140 146 C126 210 132 272 120 334 C118 354 128 364 140 354 C148 300 146 228 152 168Z" fill={hair} />
      <path d="M260 146 C274 210 268 272 280 334 C282 354 272 364 260 354 C252 300 254 228 248 168Z" fill={hair} />
      <path d="M200 84 L200 104" stroke="#4a362d" strokeWidth={2} />
      <path d="M166 96 C180 89 192 88 198 90" stroke="rgba(255,255,255,0.14)" strokeWidth={4} fill="none" strokeLinecap="round" />
    </svg>
  );
};

// ---------- দর্শক ----------

export type HairStyle = 'short' | 'bob' | 'long' | 'curly' | 'bald';
export type PersonProps = {
  height?: number;
  facing?: 'front' | 'back';
  skin?: string;
  hair?: string;
  hairStyle?: HairStyle;
  top?: string;
  bottom?: string;
  armL?: number; // ডিগ্রি; ০ = নিচে ঝোলানো, বাড়লে বাইরে/ওপরে
  armR?: number;
  stride?: number; // পায়ের কোণ
  silhouette?: string; // সব এক রঙ
  holding?: React.ReactNode; // ডান হাতে
  glasses?: boolean;
  tie?: string; // টাইয়ের রং (সাদা শার্টসহ)
  labCoat?: boolean; // লম্বা কোট (top রং দিয়ে)
  brow?: 'neutral' | 'worried';
  mouth?: 'neutral' | 'tense' | 'smile' | 'open';
  sweat?: number; // 0..1
  style?: React.CSSProperties;
};

export const Person: React.FC<PersonProps> = ({
  height = 520,
  facing = 'front',
  skin = '#d9a785',
  hair = '#2a1d17',
  hairStyle = 'short',
  top = '#4b5568',
  bottom = '#23252c',
  armL = 6,
  armR = 6,
  stride = 0,
  silhouette,
  holding,
  glasses,
  tie,
  labCoat,
  brow = 'neutral',
  mouth = 'neutral',
  sweat = 0,
  style,
}) => {
  const S = silhouette;
  const sk = S ?? skin;
  const hr = S ?? hair;
  const tp = S ?? top;
  const bt = S ?? bottom;
  const shoe = S ?? '#121214';
  const back = facing === 'back';

  const arm = (x: number, angle: number, extra?: React.ReactNode) => (
    <g transform={`translate(${x} 128) rotate(${angle})`}>
      <path d="M-13 -4 L13 -4 L10 148 L-10 148Z" fill={tp} />
      <circle cx={0} cy={158} r={12} fill={sk} />
      {/* হাতে ধরা জিনিস সোজা থাকে */}
      {extra ? <g transform={`translate(0 160) rotate(${-angle})`}>{extra}</g> : null}
    </g>
  );
  const leg = (x: number, angle: number) => (
    <g transform={`translate(${x} 296) rotate(${angle})`}>
      <path d="M-16 0 L16 0 L12 214 L-12 214Z" fill={bt} />
      <ellipse cx={facing === 'back' ? 0 : 4} cy={220} rx={18} ry={9} fill={shoe} />
    </g>
  );

  let hairBack: React.ReactNode = null;
  let hairFront: React.ReactNode = null;
  switch (hairStyle) {
    case 'short':
      hairFront = <path d="M69 60 C66 22 134 22 131 60 C122 40 80 40 69 60Z" fill={hr} />;
      hairBack = <path d="M69 62 C64 20 136 20 131 62 L131 84 C118 96 82 96 69 84Z" fill={hr} />;
      break;
    case 'bob':
      hairFront = <path d="M64 74 C58 18 142 18 136 74 L138 100 L124 100 C126 70 118 44 100 42 C82 44 74 70 76 100 L62 100Z" fill={hr} />;
      hairBack = <path d="M64 74 C58 18 142 18 136 74 L138 102 L62 102Z" fill={hr} />;
      break;
    case 'long':
      hairFront = <path d="M64 74 C58 18 142 18 136 74 L142 168 L124 168 C126 70 118 44 100 42 C82 44 74 70 76 168 L58 168Z" fill={hr} />;
      hairBack = <path d="M64 74 C58 18 142 18 136 74 L144 172 L56 172Z" fill={hr} />;
      break;
    case 'curly': {
      const c = [
        [74, 44], [92, 30], [110, 30], [127, 44], [68, 62], [132, 62],
      ];
      hairFront = <g fill={hr}>{c.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={17} />)}</g>;
      hairBack = (
        <g fill={hr}>
          {[...c, [80, 82], [100, 86], [120, 82], [100, 56]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={19} />)}
        </g>
      );
      break;
    }
    default:
      hairFront = <path d="M72 46 C80 30 120 30 128 46" stroke={hr} strokeWidth={6} fill="none" />;
      hairBack = <path d="M70 70 C70 86 130 86 130 70" stroke={hr} strokeWidth={10} fill="none" />;
  }

  return (
    <svg viewBox="0 0 200 540" width={(height * 200) / 540} height={height} style={{overflow: 'visible', ...style}}>
      {leg(84, stride)}
      {leg(116, -stride)}
      {!back && (hairStyle === 'long' || hairStyle === 'bob') ? hairBack : null}
      {arm(60, armL)}
      {arm(140, -armR, holding)}
      <path d="M90 86 L110 86 L110 122 L90 122Z" fill={sk} />
      <path d="M54 124 C68 110 132 110 146 124 C152 184 148 244 142 306 L58 306 C52 244 48 184 54 124Z" fill={tp} />
      {labCoat ? <path d="M58 296 L142 296 L150 410 L50 410Z" fill={tp} /> : null}
      {S || !labCoat ? null : <path d="M100 116 L100 408" stroke="rgba(0,0,0,0.15)" strokeWidth={back ? 0 : 3} />}
      {S || labCoat ? null : <path d="M100 116 L100 300" stroke="rgba(0,0,0,0.18)" strokeWidth={back ? 0 : 3} />}
      {S || labCoat ? null : <path d="M58 300 L142 300" stroke="rgba(0,0,0,0.3)" strokeWidth={8} />}
      {!S && !back && (tie || labCoat) ? (
        <g>
          <path d="M84 116 L100 150 L116 116Z" fill="#f2f2ee" />
          {tie ? <path d="M96 122 L104 122 L108 190 L100 202 L92 190Z" fill={tie} /> : null}
          <path d="M78 118 L100 160 L92 210 M122 118 L100 160 L108 210" stroke="rgba(0,0,0,0.2)" strokeWidth={3} fill="none" />
        </g>
      ) : null}
      {back ? (
        <>
          <ellipse cx={100} cy={60} rx={31} ry={37} fill={sk} />
          {hairBack}
        </>
      ) : (
        <>
          <ellipse cx={100} cy={60} rx={30} ry={36} fill={sk} />
          {S ? null : (
            <g>
              <circle cx={89} cy={62} r={3.2} fill="#1a1210" />
              <circle cx={111} cy={62} r={3.2} fill="#1a1210" />
              <path
                d={brow === 'worried' ? 'M82 53 L95 47 M105 47 L118 53' : 'M82 52 L95 50 M105 50 L118 52'}
                stroke="#1a1210"
                strokeWidth={3}
                strokeLinecap="round"
              />
              {mouth === 'smile' ? (
                <path d="M90 79 Q100 89 110 79" stroke="#7a3d33" strokeWidth={3} fill="none" strokeLinecap="round" />
              ) : mouth === 'open' ? (
                <ellipse cx={100} cy={83} rx={6} ry={5} fill="#5a2620" />
              ) : mouth === 'tense' ? (
                <path d="M90 84 L94 81 L98 84 L102 81 L106 84 L110 81" stroke="#7a3d33" strokeWidth={2.5} fill="none" strokeLinecap="round" />
              ) : (
                <path d="M93 82 Q100 85 107 82" stroke="#7a3d33" strokeWidth={3} fill="none" strokeLinecap="round" />
              )}
              {glasses ? (
                <g stroke="#1a1a1e" strokeWidth={2.5} fill="rgba(200,220,255,0.12)">
                  <circle cx={89} cy={62} r={9} />
                  <circle cx={111} cy={62} r={9} />
                  <path d="M98 62 L102 62 M80 61 L71 58 M120 61 L129 58" fill="none" />
                </g>
              ) : null}
              {sweat > 0 ? (
                <g fill="rgba(190,225,255,0.9)" opacity={sweat}>
                  <path d="M76 40 C73 46 73 50 76 51 C79 50 79 46 76 40Z" />
                  <path d="M126 50 C123 56 123 60 126 61 C129 60 129 56 126 50Z" />
                  <path d="M120 30 C118 34 118 37 120 38 C122 37 122 34 120 30Z" />
                </g>
              ) : null}
            </g>
          )}
          {hairFront}
        </>
      )}
    </svg>
  );
};

// দর্শকদের বিভিন্ন চেহারা (১৯৭০-এর পোশাক)
export const LOOKS: Omit<PersonProps, 'height'>[] = [
  {hairStyle: 'short', hair: '#1f1612', skin: '#e0b090', top: '#5a4632', bottom: '#2a241e'},
  {hairStyle: 'bob', hair: '#5a3a22', skin: '#efc6a6', top: '#7a2f2f', bottom: '#2a2226'},
  {hairStyle: 'curly', hair: '#2a1a12', skin: '#c99271', top: '#3f5a4a', bottom: '#1f2622'},
  {hairStyle: 'long', hair: '#c79a5a', skin: '#f0cdb0', top: '#d8cdb6', bottom: '#3b3530'},
  {hairStyle: 'short', hair: '#6b5a4a', skin: '#d8a888', top: '#2f3a52', bottom: '#1c2030'},
  {hairStyle: 'bald', hair: '#3a2c24', skin: '#c48f6c', top: '#6a5a3a', bottom: '#2b2620'},
  {hairStyle: 'long', hair: '#1a110d', skin: '#dcae8c', top: '#8a5a2a', bottom: '#262022'},
  {hairStyle: 'bob', hair: '#241812', skin: '#e6bb98', top: '#4a4a52', bottom: '#202024'},
];

// ---------- জিনিসপত্র (প্রতিটা -50..50 বাক্সে) ----------

const Rose = () => (
  <g>
    <path d="M0 46 C-4 22 4 2 0 -14" stroke="#2f6b3a" strokeWidth={4} fill="none" />
    <path d="M0 22 C-18 14 -22 4 -20 -1 C-8 3 -2 11 0 22Z" fill="#3d8a4b" />
    <path d="M1 10 C16 4 20 -4 18 -8 C8 -4 3 2 1 10Z" fill="#3d8a4b" />
    <ellipse cx={0} cy={-24} rx={16} ry={14} fill="#a3112b" />
    <path d="M-15 -22 C-17 -40 0 -44 0 -31 C0 -44 17 -40 15 -22 C8 -12 -8 -12 -15 -22Z" fill="#d11f3d" />
    <path d="M-4 -29 C0 -35 7 -31 3 -25" stroke="#6e0b1c" strokeWidth={2} fill="none" />
  </g>
);
const Feather = () => (
  <g transform="rotate(-30)">
    <path d="M0 46 C-2 10 -1 -20 0 -46" stroke="#cfc8bb" strokeWidth={2.5} fill="none" />
    <path d="M0 30 C-16 10 -16 -24 0 -46 C16 -24 16 10 0 30Z" fill="#f4f0e8" />
    {[-30, -18, -6, 6, 18].map((y) => (
      <path key={y} d={`M0 ${y} L-11 ${y - 8} M0 ${y} L11 ${y - 8}`} stroke="#d6cfc2" strokeWidth={1.2} />
    ))}
  </g>
);
const Honey = () => (
  <g>
    <rect x={-22} y={-14} width={44} height={52} rx={11} fill="#d8901c" />
    <rect x={-16} y={-8} width={7} height={38} rx={3} fill="rgba(255,240,200,0.35)" />
    <rect x={-25} y={-26} width={50} height={14} rx={4} fill="#6e4218" />
    <rect x={-15} y={4} width={30} height={18} rx={2} fill="#f3e3c0" />
    <path d="M-6 13 L6 13" stroke="#8a5a20" strokeWidth={2} />
  </g>
);
export const PistolShape: React.FC<{glow?: boolean}> = ({glow}) => (
  <g style={{filter: glow ? `drop-shadow(0 0 10px ${RED})` : undefined}}>
    <rect x={-6} y={-20} width={50} height={11} rx={2} fill="#4a4e57" />
    <rect x={-32} y={-25} width={44} height={22} rx={4} fill="#2b2e34" />
    <rect x={-16} y={-23} width={22} height={19} rx={6} fill="#5a5f6a" />
    <path d="M-12 -18 L2 -18 M-12 -10 L2 -10" stroke="#3a3d44" strokeWidth={2} />
    <path d="M-30 -5 L-8 -5 L-13 34 L-35 30Z" fill="#6b4226" />
    <path d="M-27 2 L-15 2 M-28 10 L-16 10 M-29 18 L-17 18" stroke="#4e2f1a" strokeWidth={1.5} />
    <path d="M-7 -3 C-5 12 9 12 9 -3" stroke="#2b2e34" strokeWidth={3} fill="none" />
    <rect x={-34} y={-31} width={8} height={8} rx={2} fill="#2b2e34" />
  </g>
);
export const BulletShape = () => (
  <g>
    <rect x={-6} y={-4} width={12} height={28} rx={1.5} fill="#c9a24a" />
    <rect x={-7} y={20} width={14} height={4} fill="#a8842f" />
    <path d="M-6 -4 C-6 -20 6 -20 6 -4Z" fill="#b8733a" />
    <rect x={-4} y={0} width={3} height={18} fill="rgba(255,255,255,0.3)" />
  </g>
);
export const BladeShape = () => (
  <g>
    <rect x={-30} y={-14} width={60} height={28} rx={3} fill="#c8ccd4" />
    <rect x={-30} y={10} width={60} height={4} fill="#eef0f4" />
    <rect x={-16} y={-4} width={32} height={8} rx={4} fill="#2b2e34" />
    <circle cx={-20} cy={0} r={4} fill="#2b2e34" />
    <circle cx={20} cy={0} r={4} fill="#2b2e34" />
  </g>
);
const Scissors = () => (
  <g>
    <path d="M-4 -4 L30 -34" stroke="#c8ccd4" strokeWidth={6} strokeLinecap="round" />
    <path d="M4 -4 L-30 -34" stroke="#aeb3bd" strokeWidth={6} strokeLinecap="round" />
    <circle cx={-12} cy={18} r={12} stroke="#c0392b" strokeWidth={6} fill="none" />
    <circle cx={12} cy={18} r={12} stroke="#c0392b" strokeWidth={6} fill="none" />
  </g>
);
const Wine = () => (
  <g>
    <path d="M-18 -40 L18 -40 C18 -10 10 0 0 0 C-10 0 -18 -10 -18 -40Z" fill="rgba(230,240,250,0.25)" stroke="#e8eef4" strokeWidth={2} />
    <path d="M-16 -24 L16 -24 C14 -6 8 -1 0 -1 C-8 -1 -14 -6 -16 -24Z" fill="#7a0f22" />
    <path d="M0 0 L0 30" stroke="#e8eef4" strokeWidth={3} />
    <ellipse cx={0} cy={32} rx={16} ry={4} fill="#e8eef4" />
  </g>
);
const Bread = () => (
  <g>
    <ellipse cx={0} cy={10} rx={38} ry={20} fill="#c98a4b" />
    <ellipse cx={0} cy={4} rx={34} ry={14} fill="#dba066" />
    {[-18, -4, 10].map((x) => <path key={x} d={`M${x} -2 l10 10`} stroke="#a46a32" strokeWidth={3} strokeLinecap="round" />)}
  </g>
);
const Apple = () => (
  <g>
    <path d="M0 -14 C-30 -30 -34 10 -18 26 C-10 34 -4 30 0 28 C4 30 10 34 18 26 C34 10 30 -30 0 -14Z" fill="#b8192f" />
    <path d="M0 -14 C0 -24 4 -30 8 -32" stroke="#4e2f1a" strokeWidth={3} fill="none" />
    <path d="M6 -24 C14 -34 24 -28 22 -24 C14 -20 10 -22 6 -24Z" fill="#3d8a4b" />
    <ellipse cx={-12} cy={-2} rx={4} ry={8} fill="rgba(255,255,255,0.25)" />
  </g>
);
const Candle: React.FC = () => {
  const f = useCurrentFrame();
  const flick = 1 + 0.12 * Math.sin(f * 0.9);
  return (
    <g>
      <rect x={-8} y={-16} width={16} height={56} rx={2} fill="#f3ead8" />
      <path d="M0 -16 L0 -22" stroke="#222" strokeWidth={2} />
      <ellipse cx={0} cy={-30} rx={6 * flick} ry={11 * flick} fill="#ffcf5a" style={{filter: 'drop-shadow(0 0 8px #ffb030)'}} />
      <ellipse cx={0} cy={-27} rx={2.5} ry={5} fill="#fff6d0" />
    </g>
  );
};
const Chain = () => (
  <g fill="none" stroke="#9aa0aa" strokeWidth={5}>
    {[-30, -10, 10, 30].map((x, i) => (
      <ellipse key={x} cx={x} cy={i % 2 ? 4 : -4} rx={13} ry={8} transform={`rotate(${i % 2 ? 20 : -20} ${x} ${i % 2 ? 4 : -4})`} />
    ))}
  </g>
);
const Perfume = () => (
  <g>
    <rect x={-18} y={-10} width={36} height={44} rx={8} fill="rgba(232,160,180,0.75)" stroke="#f3d6df" strokeWidth={2} />
    <rect x={-6} y={-22} width={12} height={12} fill="#c9a24a" />
    <circle cx={0} cy={-28} r={7} fill="#e3bf7a" />
  </g>
);
const Lipstick = () => (
  <g transform="rotate(12)">
    <rect x={-9} y={0} width={18} height={36} rx={2} fill="#c9a24a" />
    <rect x={-7} y={-14} width={14} height={14} fill="#e3bf7a" />
    <path d="M-6 -14 L-6 -30 L6 -22 L6 -14Z" fill="#b8192f" />
  </g>
);
const Hammer = () => (
  <g transform="rotate(-20)">
    <rect x={-4} y={-10} width={8} height={56} rx={3} fill="#8a5a2a" />
    <rect x={-22} y={-24} width={44} height={16} rx={3} fill="#5a5f6a" />
  </g>
);

export const OBJECTS = {
  rose: Rose,
  feather: Feather,
  honey: Honey,
  pistol: () => <PistolShape />,
  bullet: BulletShape,
  blade: BladeShape,
  scissors: Scissors,
  wine: Wine,
  bread: Bread,
  apple: Apple,
  candle: Candle,
  chain: Chain,
  perfume: Perfume,
  lipstick: Lipstick,
  hammer: Hammer,
};
export type ObjectName = keyof typeof OBJECTS;

export const Obj: React.FC<{name: ObjectName; size?: number; style?: React.CSSProperties}> = ({name, size = 100, style}) => {
  const C = OBJECTS[name];
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} x={-size / 2} y={-size / 2} style={{overflow: 'visible', ...style}}>
      <C />
    </svg>
  );
};

// ---------- পটভূমি ----------

export const Gallery: React.FC<{tint?: 'warm' | 'red'; spot?: number; spotX?: number}> = ({tint = 'warm', spot = 1, spotX = 540}) => {
  const red = tint === 'red';
  const light = red ? '255,70,80' : '255,236,200';
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: red
            ? 'linear-gradient(180deg, #1c0a0c 0%, #12070a 60%, #0a0405 100%)'
            : 'linear-gradient(180deg, #221c18 0%, #17120f 60%, #0e0b09 100%)',
        }}
      />
      {/* দেয়ালের নিচের পাড় */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1240, height: 10, background: red ? '#2a0e12' : '#2c241e'}} />
      {/* মেঝে */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1250,
          bottom: 0,
          background: red ? 'linear-gradient(180deg, #240c10, #0c0405)' : 'linear-gradient(180deg, #3a2e24, #120d0a)',
        }}
      />
      {/* স্পটলাইটের আলো */}
      <div
        style={{
          position: 'absolute',
          left: spotX - 520,
          width: 1040,
          top: -100,
          height: 1500,
          opacity: 0.55 * spot,
          background: `linear-gradient(180deg, rgba(${light},0.5), rgba(${light},0.08))`,
          clipPath: 'polygon(40% 0, 60% 0, 92% 100%, 8% 100%)',
          filter: 'blur(30px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: spotX - 420,
          width: 840,
          top: 1260,
          height: 220,
          borderRadius: '50%',
          opacity: spot,
          background: `radial-gradient(ellipse, rgba(${light},0.32), rgba(${light},0) 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};

export const Table: React.FC<{width?: number; style?: React.CSSProperties}> = ({width = 1000, style}) => (
  <svg viewBox="0 0 1000 360" width={width} height={(width * 360) / 1000} style={style}>
    <defs>
      <linearGradient id="tabletop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d9d2c4" />
        <stop offset="1" stopColor="#f2ece0" />
      </linearGradient>
    </defs>
    <path d="M70 40 L930 40 L1000 160 L0 160Z" fill="url(#tabletop)" />
    <path d="M0 160 L1000 160 L1000 340 C900 352 800 336 700 348 C600 338 500 352 400 342 C300 352 200 338 100 350 L0 340Z" fill="#cfc7b8" />
    {[120, 260, 400, 540, 680, 820, 940].map((x) => (
      <path key={x} d={`M${x} 166 C${x - 8} 230 ${x + 8} 290 ${x} 344`} stroke="rgba(0,0,0,0.08)" strokeWidth={6} fill="none" />
    ))}
    <path d="M0 160 L1000 160" stroke="rgba(0,0,0,0.12)" strokeWidth={3} />
  </svg>
);

export const Dust: React.FC<{count?: number; color?: string}> = ({count = 26, color = '255,240,210'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: count}, (_, i) => {
        const x = random(`dx${i}`) * 1080 + Math.sin(f / 40 + i) * 30;
        const y = (random(`dy${i}`) * 1500 - f * (0.3 + random(`ds${i}`) * 0.5) + 1500) % 1500;
        const s = 2 + random(`dz${i}`) * 4;
        return (
          <div
            key={i}
            style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: `rgba(${color},${0.25 + random(`do${i}`) * 0.35})`}}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Grain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{pointerEvents: 'none', opacity: 0.08, mixBlendMode: 'overlay'}}
    >
      <svg width="1080" height="1920">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={f % 12} />
        </filter>
        <rect width="1080" height="1920" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{color?: string; strength?: number}> = ({color = '0,0,0', strength = 0.75}) => (
  <AbsoluteFill
    style={{pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 38%, rgba(${color},${strength}) 100%)`}}
  />
);

// ক্যামেরা: (x,y) বিন্দুকে কেন্দ্রে রেখে জুম
export const Cam: React.FC<{zoom?: number; x?: number; y?: number; rotate?: number; children: React.ReactNode}> = ({
  zoom = 1,
  x = 540,
  y = 960,
  rotate = 0,
  children,
}) => (
  <AbsoluteFill style={{transformOrigin: `${x}px ${y}px`, transform: `translate(${540 - x}px, ${960 - y}px) scale(${zoom}) rotate(${rotate}deg)`}}>
    {children}
  </AbsoluteFill>
);

// কোনো উপাদানকে নির্দিষ্ট জায়গায় বসানো (নিচ-মাঝখান = x,y)
export const Place: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -100%)', ...style}}>{children}</div>
);
