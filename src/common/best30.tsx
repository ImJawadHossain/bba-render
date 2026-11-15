// ৫০০ থেকে সেরা ৩০ সিরিজ: নতুন জায়গা, জিনিস আর শেষের অংশ (elegant/elegant2-এর সাথে মিলিয়ে)
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {Bounce, Cta, R} from './reel';

const LINE = '#1b1b1f';
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

// ---------- শেষের অংশ ----------

// আসল গবেষণার কার্ড: কে, কোথায়, কবে
export const SourceCard: React.FC<{who: string; where: string; year: string; tag?: string}> = ({who, where, year, tag}) => (
  <div style={{width: 680, padding: '44px 36px', background: '#14305f', border: `10px solid ${GOLD}`, borderRadius: 22, textAlign: 'center', fontWeight: 800, boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
    {tag ? <div style={{display: 'inline-block', padding: '6px 24px', background: RED, borderRadius: 12, fontSize: 40, color: '#fff', marginBottom: 22}}>{tag}</div> : null}
    <div style={{fontSize: who.length > 22 ? 52 : 64, lineHeight: 1.2, color: GOLD}}>{who}</div>
    <div style={{marginTop: 18, fontSize: 44, color: '#f2efe9'}}>{where}</div>
    <div style={{marginTop: 18, fontSize: 76, color: '#fff'}}>{year}</div>
  </div>
);
export const srcScene = (who: string, where: string, year: string, tag = 'আসল গবেষণা') =>
  R({
    bg: 'plain',
    over: () => (
      <Bounce x={90} y={250} at={2}>
        <SourceCard who={who} where={where} year={year} tag={tag} />
      </Bounce>
    ),
  });
export const outro = (who: string, where: string, year: string, tag?: string) => ({
  src: srcScene(who, where, year, tag),
  lesson: R({bg: 'plain'}),
  cta: () => <Cta />,
});

// ---------- জায়গা ----------

// গার্মেন্টস ফ্লোর: সেলাই মেশিনের সারি, ওপরে টিউবলাইট (light 0..1)
export const Factory: React.FC<{light?: number}> = ({light = 0.6}) => (
  <AbsoluteFill style={{background: `linear-gradient(180deg, rgb(${60 + light * 120},${66 + light * 120},${74 + light * 110}), #2a2e36)`}}>
    <Svg>
      {[200, 540, 880].map((x) => (
        <rect key={x} x={x - 140} y={180} width={280} height={24} rx={10} fill="#fffbe8" opacity={0.3 + light * 0.7} />
      ))}
      {[760, 1000, 1240].map((y, r) => (
        <g key={y}>
          {Array.from({length: 4}, (_, i) => (
            <g key={i} transform={`translate(${70 + i * 250 + (r % 2) * 40} ${y})`}>
              <rect x={0} y={60} width={200} height={26} fill="#8a7050" stroke={LINE} strokeWidth={4} />
              <path d="M30 60 L30 10 L150 10 L150 30 L60 30 L60 60Z" fill="#e8eaee" stroke={LINE} strokeWidth={4} />
              <rect x={150} y={26} width={10} height={34} fill="#5a5f6e" />
            </g>
          ))}
        </g>
      ))}
      <rect x={0} y={1400} width={1080} height={520} fill="#3a3e48" />
    </Svg>
  </AbsoluteFill>
);

// হাসপাতালের ওয়ার্ড
export const Ward: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #dfe8ea, #b8c8cc)'}}>
    <Svg>
      <rect x={640} y={320} width={300} height={360} fill="#9ec4dc" stroke="#5a6a70" strokeWidth={12} />
      <path d="M790 320 L790 680 M640 500 L940 500" stroke="#5a6a70" strokeWidth={8} />
      <rect x={120} y={360} width={90} height={90} fill="#fff" stroke={LINE} strokeWidth={5} />
      <path d="M165 375 L165 435 M135 405 L195 405" stroke={RED} strokeWidth={16} />
      <rect x={0} y={1300} width={1080} height={620} fill="#c8d4d6" />
      <rect x={560} y={1060} width={460} height={60} rx={14} fill="#f6f7f9" stroke={LINE} strokeWidth={5} />
      <rect x={560} y={1120} width={460} height={40} fill="#5a8ab0" />
      <rect x={580} y={1160} width={16} height={140} fill="#8a8e96" />
      <rect x={984} y={1160} width={16} height={140} fill="#8a8e96" />
    </Svg>
  </AbsoluteFill>
);

// ---------- জিনিস ----------

export const Fridge: React.FC<{size?: number; empty?: boolean}> = ({size = 420, empty}) => {
  const f = useCurrentFrame();
  const open = interpolate(f, [4, 18], [0, 1], clampOpts);
  return (
    <Vb w={240} h={420} size={size}>
      <rect x={20} y={10} width={200} height={400} rx={18} fill="#e8eef2" stroke={LINE} strokeWidth={6} />
      <rect x={34} y={30} width={172} height={360} rx={8} fill="#f6fbff" />
      {[120, 220, 320].map((y) => (
        <rect key={y} x={34} y={y} width={172} height={6} fill="#b8c8d0" />
      ))}
      {empty ? null : (
        <g>
          {Array.from({length: 6}, (_, i) => (
            <ellipse key={i} cx={60 + i * 25} cy={105} rx={11} ry={14} fill="#f2e6c8" stroke={LINE} strokeWidth={2} />
          ))}
          <rect x={60} y={150} width={50} height={66} rx={6} fill="#f2f2f2" stroke={LINE} strokeWidth={3} />
        </g>
      )}
      <rect x={20} y={10} width={200 * (1 - open * 0.85)} height={400} rx={18} fill="#d8e2e8" stroke={LINE} strokeWidth={6} opacity={0.95} />
    </Vb>
  );
};

export const Generator: React.FC<{size?: number; dead?: boolean}> = ({size = 520, dead}) => (
  <Vb w={320} h={220} size={size}>
    <rect x={20} y={40} width={280} height={160} rx={16} fill={dead ? '#6a6e78' : '#2a7a4a'} stroke={LINE} strokeWidth={6} />
    {Array.from({length: 6}, (_, i) => (
      <rect key={i} x={50 + i * 34} y={70} width={18} height={80} rx={4} fill="#1a1c22" opacity={0.6} />
    ))}
    <rect x={240} y={70} width={40} height={30} rx={4} fill="#1a1c22" />
    <circle cx={260} cy={130} r={10} fill={dead ? RED : '#3ad26e'} />
    {dead ? <path d="M150 0 Q170 -30 150 -60 Q130 -90 150 -120" stroke="#8a8e96" strokeWidth={10} fill="none" opacity={0.7} /> : null}
  </Vb>
);

export const Transformer: React.FC<{size?: number; burnt?: boolean}> = ({size = 380, burnt}) => {
  const f = useCurrentFrame();
  return (
    <Vb w={200} h={360} size={size}>
      <rect x={90} y={0} width={20} height={360} fill="#6a5a4a" />
      <rect x={40} y={100} width={120} height={140} rx={12} fill={burnt ? '#2a2c30' : '#8a96a0'} stroke={LINE} strokeWidth={6} />
      {[60, 100, 140].map((x) => (
        <rect key={x} x={x - 6} y={70} width={12} height={34} fill="#c8ccd4" stroke={LINE} strokeWidth={3} />
      ))}
      {burnt ? <path d={`M70 100 Q${60 + Math.sin(f / 4) * 8} 60 80 30 Q100 0 90 -30`} stroke="#5a5f6e" strokeWidth={14} fill="none" opacity={0.7} /> : <path d="M100 150 l-14 30 h20 l-14 30" stroke="#ffd84a" strokeWidth={8} fill="none" />}
    </Vb>
  );
};

// চায়ের দোকানের সিল কার্ড: total ঘর, filled টা সিল
export const StampCard: React.FC<{total: number; filled: number; name: string; w?: number}> = ({total, filled, name, w = 760}) => {
  const f = useCurrentFrame();
  return (
    <div style={{width: w, padding: '28px 30px', background: '#f6f2e8', border: `8px solid ${LINE}`, borderRadius: 24, boxShadow: '0 26px 60px rgba(0,0,0,0.5)', fontWeight: 800, color: '#15151b'}}>
      <div style={{fontSize: 50, textAlign: 'center'}}>{name}</div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 20}}>
        {Array.from({length: total}, (_, i) => {
          const on = i < filled && f > 6 + i * 4;
          return (
            <div key={i} style={{width: 104, height: 104, borderRadius: '50%', border: `6px dashed ${on ? RED : '#8a8e96'}`, background: on ? 'rgba(192,48,74,0.18)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 58, color: RED}}>
              {on ? '✓' : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// দানের ফর্ম: yes = "দিতে চাইলে টিক", no = "না চাইলে টিক"
export const TickForm: React.FC<{mode: 'yes' | 'no'; w?: number}> = ({mode, w = 780}) => (
  <div style={{width: w, padding: '36px 40px', background: '#f6f2e8', border: `8px solid ${LINE}`, borderRadius: 18, transform: 'rotate(-2deg)', boxShadow: '0 26px 60px rgba(0,0,0,0.5)', fontWeight: 800, color: '#15151b'}}>
    <div style={{fontSize: 56}}>লাইব্রেরির জন্য দান</div>
    <div style={{fontSize: 42, color: '#5a5f6e', marginTop: 10}}>মাসে পঞ্চাশ টাকা</div>
    <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 30}}>
      <div style={{width: 70, height: 70, border: `6px solid ${LINE}`, borderRadius: 10}} />
      <div style={{fontSize: 46, color: mode === 'yes' ? GREEN : RED}}>{mode === 'yes' ? 'দান করতে চাইলে টিক দিন' : 'দান করতে না চাইলে টিক দিন'}</div>
    </div>
  </div>
);

// ভাসমান গানের চিহ্ন
export const Notes: React.FC<{color?: string}> = ({color = GOLD}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {[160, 420, 700, 930].map((x, i) => {
        const y = 900 - ((f * 2 + i * 120) % 600);
        return (
          <div key={x} style={{position: 'absolute', left: x, top: y, fontSize: 110, color, opacity: 0.85, textShadow: '0 6px 20px rgba(0,0,0,0.6)'}}>
            {i % 2 ? '♪' : '♫'}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// লজেন্স
export const Candy: React.FC<{size?: number}> = ({size = 200}) => (
  <Vb w={200} h={100} size={size}>
    <path d="M20 20 L60 50 L20 80Z M180 20 L140 50 L180 80Z" fill="#e8c04a" stroke={LINE} strokeWidth={4} />
    <ellipse cx={100} cy={50} rx={44} ry={32} fill="#d94a6a" stroke={LINE} strokeWidth={5} />
    <path d="M80 36 Q100 26 118 38" stroke="#fff" strokeWidth={6} fill="none" opacity={0.6} />
  </Vb>
);

// এক জায়গায় দাঁড়ানো একজন (R-এর actors-এ)
export const at = (look: import('./Toon').ToonLook, expression: import('./Toon').Expression = 'neutral', gesture: import('./Toon').Gesture = 'idle', x = 540, h = 1100, more: {talking?: boolean; holding?: React.ReactNode; lookX?: number} = {}) => ({look, x, h, y: 1880, expression, gesture, ...more});
