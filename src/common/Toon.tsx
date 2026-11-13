// নতুন চরিত্রের রিগ: বড় মুখ, চোখের পাতা পড়া, ভাব (expression), হাতের ভঙ্গি (gesture), কথা বলার মুখ
// সব ভিডিওতে একই চরিত্র বারবার ব্যবহারের জন্য (cast.ts দেখো)
import React from 'react';
import {random, useCurrentFrame} from 'remotion';

export type Expression = 'neutral' | 'smile' | 'laugh' | 'surprised' | 'shocked' | 'serious' | 'worried' | 'thinking' | 'skeptical' | 'wink' | 'sad' | 'blank';
export type Gesture = 'idle' | 'explain' | 'pointL' | 'pointR' | 'pointUp' | 'shrug' | 'thumbsUp' | 'wave' | 'think' | 'open' | 'hold';
export type ToonHair = 'quiff' | 'short' | 'side' | 'bun' | 'long' | 'bob' | 'curly' | 'bald' | 'balding' | 'receding' | 'hijab';

export type ToonLook = {
  skin?: string;
  hair?: string;
  hairStyle?: ToonHair;
  top?: string; // শার্ট / টি-শার্ট
  jacket?: string; // খোলা জ্যাকেট বা ব্লেজার
  tie?: string;
  bottom?: string;
  skirt?: string;
  shoes?: string;
  glasses?: boolean;
  glassesShape?: 'round' | 'rect';
  sunglasses?: boolean; // glasses-এর কাচ কালো
  veil?: boolean; // বরের পাগড়ি আর মুখের সামনে ফুলের মালার পর্দা
  beard?: boolean;
  beardColor?: string;
  age?: number; // ০..১, মুখে বয়সের ভাঁজ
  kurta?: boolean; // পাঞ্জাবি: লম্বা জামা, গলায় বন্ধ কলার
  vest?: boolean; // jacket হাতা ছাড়া (কোটি)
  mustache?: boolean;
  chest?: React.ReactNode; // বুকে লোগো/ব্যাজ (৪০০×১১২০ ভিউবক্সে)
  labCoat?: boolean;
  headScale?: number; // ১ = স্বাভাবিক; বড় হলে কার্টুন-ধাঁচ
};

export type ToonProps = ToonLook & {
  height?: number;
  expression?: Expression;
  gesture?: Gesture;
  talking?: boolean;
  lookX?: number; // -1..1
  stride?: number;
  seed?: string;
  holding?: React.ReactNode; // gesture="hold" হলে দর্শকের বাম দিকের হাতে
  silhouette?: string;
  style?: React.CSSProperties;
};

const darken = (hex: string, k = 0.78) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.round(((n >> 16) & 255) * k);
  const g = Math.round(((n >> 8) & 255) * k);
  const b = Math.round((n & 255) * k);
  return `rgb(${r},${g},${b})`;
};

type Arm = {u: number; e: number; hand: 'fist' | 'open' | 'point' | 'thumb'};
// u = কাঁধে কোণ (০ নিচে, ৯০ পাশে, ১৮০ ওপরে); e = কনুই (ঋণাত্মক = শরীরের সামনের দিকে ভাঁজ)
const POSES: Record<Gesture, (t: number) => {L: Arm; R: Arm; lift?: number}> = {
  idle: () => ({L: {u: 7, e: -6, hand: 'fist'}, R: {u: 7, e: -6, hand: 'fist'}}),
  explain: (t) => ({L: {u: 30 + 6 * Math.sin(t / 5), e: -150 + 14 * Math.sin(t / 4), hand: 'open'}, R: {u: 8, e: -8, hand: 'fist'}}),
  open: (t) => ({L: {u: 40 + 5 * Math.sin(t / 6), e: -100, hand: 'open'}, R: {u: 40 + 5 * Math.sin(t / 6 + 1), e: -100, hand: 'open'}}),
  pointL: (t) => ({L: {u: 92 + 3 * Math.sin(t / 6), e: -4, hand: 'point'}, R: {u: 8, e: -8, hand: 'fist'}}),
  pointR: (t) => ({L: {u: 8, e: -8, hand: 'fist'}, R: {u: 92 + 3 * Math.sin(t / 6), e: -4, hand: 'point'}}),
  pointUp: (t) => ({L: {u: 22, e: -165 + 4 * Math.sin(t / 5), hand: 'point'}, R: {u: 8, e: -8, hand: 'fist'}}),
  shrug: () => ({L: {u: 48, e: 92, hand: 'open'}, R: {u: 48, e: 92, hand: 'open'}, lift: 14}),
  thumbsUp: (t) => ({L: {u: 16, e: -150 + 3 * Math.sin(t / 4), hand: 'thumb'}, R: {u: 8, e: -8, hand: 'fist'}}),
  wave: (t) => ({L: {u: 8, e: -8, hand: 'fist'}, R: {u: 150, e: 18 * Math.sin(t / 3), hand: 'open'}}),
  think: () => ({L: {u: -8, e: -162, hand: 'fist'}, R: {u: 12, e: -95, hand: 'fist'}}),
  hold: () => ({L: {u: 18, e: -70, hand: 'fist'}, R: {u: 8, e: -8, hand: 'fist'}}),
};

const BROWS: Record<Expression, [string, string]> = {
  neutral: ['M146 150 Q164 143 182 149', 'M218 149 Q236 143 254 150'],
  blank: ['M146 150 L182 150', 'M218 150 L254 150'],
  smile: ['M146 146 Q164 136 182 144', 'M218 144 Q236 136 254 146'],
  laugh: ['M146 142 Q164 132 182 140', 'M218 140 Q236 132 254 142'],
  surprised: ['M146 134 Q164 120 182 130', 'M218 130 Q236 120 254 134'],
  shocked: ['M146 128 Q164 112 182 124', 'M218 124 Q236 112 254 128'],
  serious: ['M146 144 L182 156', 'M218 156 L254 144'],
  worried: ['M146 156 L182 142', 'M218 142 L254 156'],
  sad: ['M146 158 L182 144', 'M218 144 L254 158'],
  thinking: ['M146 140 Q164 130 182 138', 'M218 152 L254 150'],
  skeptical: ['M146 152 L182 152', 'M218 140 Q236 126 254 138'],
  wink: ['M146 146 Q164 136 182 144', 'M218 152 Q236 148 254 152'],
};

export const Toon: React.FC<ToonProps> = ({
  height = 800,
  skin = '#d9a07a',
  hair = '#1c1410',
  hairStyle = 'short',
  top = '#3a4a5a',
  jacket,
  tie,
  bottom = '#23252c',
  skirt,
  shoes = '#16161a',
  glasses,
  glassesShape = 'round',
  sunglasses,
  veil,
  beard,
  beardColor,
  age = 0,
  kurta,
  vest,
  mustache,
  chest,
  labCoat,
  headScale = 1,
  expression = 'neutral',
  gesture = 'idle',
  talking = false,
  lookX = 0,
  stride = 0,
  seed = 'toon',
  holding,
  silhouette,
  style,
}) => {
  const f = useCurrentFrame();
  const S = silhouette;
  const sk = S ?? skin;
  const skD = S ?? darken(skin, 0.82);
  const hr = S ?? hair;
  const tp = S ?? top;
  const jk = jacket ? (S ?? jacket) : undefined;
  const sleeve = labCoat ? (S ?? '#e9ecef') : vest ? tp : jk ?? tp;
  const bd = S ?? beardColor ?? hair;
  const tBot = kurta ? 800 : 650;
  const jBot = vest ? (kurta ? 690 : 650) : 650;
  const bt = S ?? bottom;
  const ink = S ?? '#1d1512';

  // চোখের পাতা: প্রতি ~৩ সেকেন্ডে একবার
  const off = Math.floor(random(seed) * 90);
  const bt0 = (f + off) % 96;
  const blink = bt0 < 3 ? 1 - Math.abs(bt0 - 1.5) / 1.5 : 0;
  // কথা বলার মুখ
  const talk = talking ? Math.max(0, 0.55 + 0.45 * Math.sin(f * 1.05) * Math.sin(f * 0.37 + random(seed + 'm') * 6)) : 0;
  const nod = talking ? Math.sin(f / 7) * 2.2 : Math.sin(f / 30) * 0.8;

  const pose = POSES[gesture](f);
  const lift = pose.lift ?? 0;

  const hand = (h: Arm['hand']) => {
    if (h === 'open')
      return (
        <g>
          <ellipse cx={0} cy={6} rx={24} ry={28} fill={sk} />
          {[-14, -5, 4, 13].map((x, i) => (
            <rect key={i} x={x - 4} y={18} width={8} height={22 - Math.abs(i - 1.5) * 3} rx={4} fill={sk} />
          ))}
        </g>
      );
    if (h === 'point')
      return (
        <g>
          <circle cx={0} cy={0} r={22} fill={sk} />
          <rect x={-6} y={8} width={12} height={46} rx={6} fill={sk} />
        </g>
      );
    if (h === 'thumb')
      return (
        <g>
          <rect x={-22} y={-18} width={44} height={40} rx={14} fill={sk} />
          <rect x={-8} y={14} width={14} height={36} rx={7} fill={sk} />
        </g>
      );
    return <circle cx={0} cy={0} r={22} fill={sk} />;
  };

  const arm = (a: Arm, side: 'L' | 'R') => {
    const U = 150;
    const F = 132;
    return (
      <g transform={`translate(${side === 'L' ? 120 : 280} ${348 - lift}) ${side === 'R' ? 'scale(-1 1)' : ''}`}>
        <g transform={`rotate(${a.u})`}>
          <rect x={-23} y={-14} width={46} height={U + 20} rx={23} fill={sleeve} />
          <g transform={`translate(0 ${U}) rotate(${a.e})`}>
            <rect x={-20} y={-8} width={40} height={F + 4} rx={20} fill={sleeve} />
            <rect x={-17} y={F - 22} width={34} height={20} rx={8} fill={S ?? (labCoat ? '#d4d8dc' : darken(sleeve, 0.9))} />
            <g transform={`translate(0 ${F + 8})`}>{hand(a.hand)}</g>
            {side === 'L' && gesture === 'hold' && holding ? <g transform={`translate(0 ${F + 8}) rotate(${-a.u - a.e})`}>{holding}</g> : null}
          </g>
        </g>
      </g>
    );
  };

  const leg = (x: number, ang: number) => (
    <g transform={`translate(${x} 640) rotate(${ang})`}>
      <rect x={-30} y={-10} width={60} height={330} rx={22} fill={bt} />
      <path d={`M-34 312 C-34 296 34 296 40 314 L44 336 L-36 336Z`} fill={S ?? shoes} />
      <rect x={-36} y={330} width={80} height={10} rx={4} fill={S ?? '#e8e4dc'} opacity={S ? 1 : 0.9} />
    </g>
  );

  // ---------- মাথা ----------
  const eyes = () => {
    const ex = lookX * 6;
    const shocked = expression === 'shocked' || expression === 'surprised';
    const ry = (shocked ? 22 : 18) * (1 - blink);
    const pr = shocked ? 7 : 9.5;
    const closedArc = (cx: number) => <path d={`M${cx - 16} 186 Q${cx} 172 ${cx + 16} 186`} stroke={ink} strokeWidth={6} fill="none" strokeLinecap="round" />;
    const eye = (cx: number, right: boolean) => {
      if (expression === 'laugh') return closedArc(cx);
      if (expression === 'wink' && right) return closedArc(cx);
      if (blink > 0.85) return <path d={`M${cx - 16} 186 L${cx + 16} 186`} stroke={ink} strokeWidth={5} strokeLinecap="round" />;
      return (
        <g>
          <ellipse cx={cx} cy={186} rx={16} ry={ry} fill="#fffdf8" />
          <circle cx={cx + ex} cy={188} r={pr} fill={ink} />
          <circle cx={cx + ex + 3} cy={184} r={3} fill="#fff" />
          {expression === 'smile' || expression === 'wink' ? <path d={`M${cx - 18} 200 Q${cx} 206 ${cx + 18} 200`} stroke={skD} strokeWidth={4} fill="none" /> : null}
        </g>
      );
    };
    return (
      <>
        {eye(164, false)}
        {eye(236, true)}
      </>
    );
  };

  const mouth = () => {
    const m = '#5a1e1c';
    if (talking) {
      const big = expression === 'laugh' || expression === 'smile' || expression === 'surprised' || expression === 'shocked';
      const o = 4 + talk * (big ? 18 : 13);
      return (
        <g>
          <ellipse cx={200} cy={254} rx={big ? 22 : 17} ry={o} fill={m} />
          {o > 8 ? <rect x={186} y={254 - o + 1} width={28} height={6} rx={3} fill="#fff" /> : null}
          {o > 10 ? <ellipse cx={200} cy={254 + o - 5} rx={10} ry={4} fill="#c0504a" /> : null}
        </g>
      );
    }
    switch (expression) {
      case 'smile':
      case 'wink':
        return <path d="M176 246 Q200 272 224 246" stroke={m} strokeWidth={6} fill="none" strokeLinecap="round" />;
      case 'laugh':
        return (
          <g>
            <path d="M170 242 Q200 296 230 242Z" fill={m} />
            <path d="M174 244 L226 244 L222 254 L178 254Z" fill="#fff" />
            <ellipse cx={200} cy={272} rx={12} ry={6} fill="#c0504a" />
          </g>
        );
      case 'surprised':
        return <ellipse cx={200} cy={258} rx={13} ry={17} fill={m} />;
      case 'shocked':
        return (
          <g>
            <ellipse cx={200} cy={262} rx={20} ry={26} fill={m} />
            <rect x={188} y={238} width={24} height={6} rx={3} fill="#fff" />
          </g>
        );
      case 'blank':
      case 'serious':
        return <path d="M180 256 L220 256" stroke={m} strokeWidth={6} strokeLinecap="round" />;
      case 'worried':
      case 'sad':
        return <path d="M178 264 Q200 244 222 264" stroke={m} strokeWidth={6} fill="none" strokeLinecap="round" />;
      case 'thinking':
        return <path d="M184 258 Q200 252 216 254" stroke={m} strokeWidth={6} fill="none" strokeLinecap="round" />;
      case 'skeptical':
        return <path d="M180 258 Q204 264 222 248" stroke={m} strokeWidth={6} fill="none" strokeLinecap="round" />;
      default:
        return <path d="M182 252 Q200 262 218 252" stroke={m} strokeWidth={6} fill="none" strokeLinecap="round" />;
    }
  };

  const hairBack = () => {
    if (hairStyle === 'long') return <path d="M104 190 C92 92 150 52 200 52 C250 52 308 92 296 190 L306 430 C270 450 130 450 94 430Z" fill={hr} />;
    if (hairStyle === 'bob') return <path d="M104 190 C94 92 150 54 200 54 C250 54 306 92 296 190 L300 300 C270 316 130 316 100 300Z" fill={hr} />;
    if (hairStyle === 'bun')
      return (
        <g fill={hr}>
          <circle cx={200} cy={52} r={40} />
          <path d="M108 196 C100 100 150 66 200 66 C250 66 300 100 292 196 L280 240 L120 240Z" />
        </g>
      );
    if (hairStyle === 'hijab') return <path d="M92 210 C86 92 148 46 200 46 C252 46 314 92 308 210 C306 300 282 350 240 372 L160 372 C118 350 94 300 92 210Z" fill={hr} />;
    if (hairStyle === 'curly')
      return (
        <g fill={hr}>
          {[
            [130, 120], [160, 92], [200, 82], [240, 92], [270, 120], [118, 160], [282, 160], [112, 200], [288, 200],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={36} />
          ))}
        </g>
      );
    return null;
  };

  const hairFront = () => {
    switch (hairStyle) {
      case 'quiff':
        return (
          <g fill={hr}>
            <path d="M112 192 C104 118 144 76 202 74 C258 72 298 110 290 192 C282 150 262 128 232 124 C196 120 156 126 132 150 C120 164 116 178 112 192Z" />
            <path d="M136 112 C150 44 236 30 276 76 C292 96 290 118 284 130 C268 100 236 92 200 98 C172 102 150 110 136 112Z" />
            <path d="M226 46 C250 30 284 42 288 70 C272 58 250 54 230 60Z" />
          </g>
        );
      case 'short':
        return <path d="M112 190 C104 112 148 74 200 74 C252 74 296 112 288 190 C280 146 256 118 200 116 C144 118 120 146 112 190Z" fill={hr} />;
      case 'side':
        return <path d="M112 196 C102 110 150 70 206 72 C258 74 298 112 288 190 C276 150 250 124 196 122 C176 138 150 150 120 150 C116 166 114 180 112 196Z" fill={hr} />;
      case 'bun':
      case 'long':
      case 'bob':
        return <path d="M112 196 C104 104 150 70 200 70 C250 70 296 104 288 196 C276 140 250 120 214 116 C190 130 150 140 116 150Z" fill={hr} />;
      case 'curly':
        return (
          <g fill={hr}>
            {[[140, 112], [176, 98], [214, 96], [250, 108], [128, 146], [272, 142]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={30} />
            ))}
          </g>
        );
      case 'receding':
        return (
          <g fill={hr}>
            <path d="M110 206 C104 160 112 126 136 106 C128 136 126 168 130 210Z" />
            <path d="M290 206 C296 160 288 126 264 106 C272 136 274 168 270 210Z" />
            <path d="M136 108 C164 86 236 86 264 108 C238 100 162 100 136 108Z" />
          </g>
        );
      case 'balding':
        return (
          <g fill={hr}>
            <path d="M110 200 C108 164 116 140 130 128 C126 156 126 180 128 206Z" />
            <path d="M290 200 C292 164 284 140 270 128 C274 156 274 180 272 206Z" />
          </g>
        );
      case 'hijab':
        return <path d="M116 168 C126 92 274 92 284 168 C262 120 138 120 116 168Z" fill={S ?? darken(hair, 0.85)} />;
      default:
        return null;
    }
  };

  const head = (
    <g transform={`translate(200 300) rotate(${nod}) scale(${headScale}) translate(-200 -300)`}>
      {hairBack()}
      <rect x={176} y={270} width={48} height={60} fill={skD} />
      {hairStyle === 'hijab' ? null : (
        <>
          <ellipse cx={114} cy={196} rx={15} ry={22} fill={sk} />
          <ellipse cx={286} cy={196} rx={15} ry={22} fill={sk} />
        </>
      )}
      <path d="M200 84 C258 84 288 128 288 190 C288 250 252 296 200 296 C148 296 112 250 112 190 C112 128 142 84 200 84Z" fill={sk} />
      {S ? null : (
        <g>
          <ellipse cx={146} cy={228} rx={18} ry={11} fill="#e86a6a" opacity={0.18} />
          <ellipse cx={254} cy={228} rx={18} ry={11} fill="#e86a6a" opacity={0.18} />
          {beard ? <path d="M114 206 C118 280 158 310 200 310 C242 310 282 280 286 206 C280 250 262 286 236 294 C226 280 174 280 164 294 C138 286 120 250 114 206Z" fill={bd} opacity={0.92} /> : null}
          {beard ? <path d="M170 238 C184 228 216 228 230 238 C214 236 186 236 170 238Z" fill={bd} stroke={bd} strokeWidth={6} strokeLinejoin="round" /> : null}
          {mustache && !beard ? <path d="M164 242 C176 222 194 226 200 232 C206 226 224 222 236 242 C222 238 212 240 200 240 C188 240 178 238 164 242Z" fill={bd} stroke={bd} strokeWidth={4} strokeLinejoin="round" /> : null}
          {age > 0 ? (
            <g stroke={skD} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.55 * age + 0.25}>
              <path d="M160 118 Q200 108 240 118" />
              <path d="M152 132 Q200 122 248 132" />
              <path d="M126 180 L116 174 M126 192 L114 192 M274 180 L284 174 M274 192 L286 192" />
              <path d="M150 210 Q164 218 178 210 M222 210 Q236 218 250 210" />
              <path d="M176 222 Q164 244 170 262 M224 222 Q236 244 230 262" />
            </g>
          ) : null}
          {eyes()}
          <path d={BROWS[expression][0]} stroke={hr} strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d={BROWS[expression][1]} stroke={hr} strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M200 196 Q190 222 198 228 Q206 230 212 224" stroke={skD} strokeWidth={5} fill="none" strokeLinecap="round" />
          {mouth()}
          {glasses && glassesShape === 'rect' ? (
            <g stroke="#3a2a1a" strokeWidth={6} fill="rgba(200,225,255,0.12)">
              <rect x={132} y={168} width={62} height={44} rx={10} />
              <rect x={206} y={168} width={62} height={44} rx={10} />
              <path d="M194 184 Q200 178 206 184 M132 182 L114 176 M268 182 L286 176" fill="none" />
            </g>
          ) : glasses ? (
            <g stroke="#15151a" strokeWidth={6} fill={sunglasses ? 'rgba(20,20,26,0.92)' : 'rgba(200,225,255,0.12)'}>
              <circle cx={164} cy={188} r={30} />
              <circle cx={236} cy={188} r={30} />
              <path d="M194 186 Q200 180 206 186 M134 184 L114 178 M266 184 L286 178" fill="none" />
            </g>
          ) : null}
        </g>
      )}
      {hairFront()}
      {veil ? (
        <g>
          <path d="M104 150 C100 70 150 40 200 40 C250 40 300 70 296 150 Z" fill="#8a1f2a" stroke="#1b1b1f" strokeWidth={6} />
          <path d="M120 120 Q200 90 280 120" stroke="#e8b830" strokeWidth={8} fill="none" />
          <circle cx={200} cy={92} r={14} fill="#e8b830" stroke="#1b1b1f" strokeWidth={4} />
          {Array.from({length: 11}, (_, i) => 116 + i * 17).map((x, i) => (
            <g key={x}>
              <line x1={x} y1={146} x2={x} y2={322 + (i % 3) * 8} stroke="#7a9a6a" strokeWidth={3} />
              {Array.from({length: 9}, (_, j) => (
                <circle key={j} cx={x} cy={156 + j * 19 + (i % 2) * 8} r={8} fill={j % 4 === 3 ? '#e05a7a' : '#f6f2e8'} stroke="#c8c0b0" strokeWidth={1.5} />
              ))}
            </g>
          ))}
        </g>
      ) : null}
    </g>
  );

  const shirtTop = labCoat ? (S ?? '#e9ecef') : tp;

  return (
    <svg viewBox="0 -140 400 1140" width={(height * 400) / 1140} height={height} style={{overflow: 'visible', ...style}}>
      {leg(166, stride)}
      {leg(234, -stride)}
      {skirt ? <path d="M128 600 L272 600 L300 800 L100 800Z" fill={S ?? skirt} /> : null}
      {/* ধড় */}
      <path d={`M120 ${352 - lift} C120 ${326 - lift} 152 ${316 - lift} 200 ${316 - lift} C248 ${316 - lift} 280 ${326 - lift} 280 ${352 - lift} L${kurta ? 284 : 274} ${tBot} L${kurta ? 116 : 126} ${tBot}Z`} fill={tp} />
      {kurta && !S ? (
        <g>
          <rect x={184} y={306 - lift} width={32} height={22} rx={6} fill={darken(top, 0.9)} />
          <path d={`M200 ${328 - lift} L200 470`} stroke={darken(top, 0.85)} strokeWidth={4} />
          {[360, 400, 440].map((y) => <circle key={y} cx={200} cy={y - lift} r={5} fill={darken(top, 0.7)} />)}
        </g>
      ) : null}
      {labCoat ? <path d={`M120 ${352 - lift} C120 ${326 - lift} 152 ${316 - lift} 186 ${316 - lift} L200 470 L196 760 L112 760Z M280 ${352 - lift} C280 ${326 - lift} 248 ${316 - lift} 214 ${316 - lift} L200 470 L204 760 L288 760Z`} fill={shirtTop} /> : null}
      {S || !tie ? null : (
        <g>
          <path d={`M176 ${318 - lift} L200 ${360 - lift} L224 ${318 - lift}Z`} fill="#f4f2ec" />
          <path d={`M193 ${330 - lift} L207 ${330 - lift} L214 470 L200 488 L186 470Z`} fill={tie} />
        </g>
      )}
      {jk ? (
        <g>
          <path d={`M120 ${352 - lift} C120 ${326 - lift} 150 ${316 - lift} 182 ${316 - lift} L196 470 L190 ${jBot} L${vest && kurta ? 122 : 126} ${jBot}Z`} fill={jk} />
          <path d={`M280 ${352 - lift} C280 ${326 - lift} 250 ${316 - lift} 218 ${316 - lift} L204 470 L210 ${jBot} L${vest && kurta ? 278 : 274} ${jBot}Z`} fill={jk} />
          {S ? null : (
            <g fill={darken(jacket!, 0.82)}>
              <path d={`M182 ${316 - lift} L196 470 L168 400 L160 ${334 - lift}Z`} />
              <path d={`M218 ${316 - lift} L204 470 L232 400 L240 ${334 - lift}Z`} />
            </g>
          )}
        </g>
      ) : null}
      {chest && !S ? chest : null}
      {S || kurta ? null : <path d={`M126 640 L274 640`} stroke="rgba(0,0,0,0.25)" strokeWidth={14} />}
      {arm(pose.L, 'L')}
      {arm(pose.R, 'R')}
      {head}
    </svg>
  );
};
