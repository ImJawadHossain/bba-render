// নড়াচড়ার ইফেক্ট: জুম, ঝলক, দৃশ্য বদল, ধুলো, আলো, শব্দে শব্দে ক্যাপশন
// Story-তে fx দিলে সব দৃশ্যে নিজে থেকে বসে; পুরোনো ভিডিও এতে বদলায় না
import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {stripTags} from './meta';

const FG = '#f2efe9';
const GOLD = '#e3bf7a';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// কাঁপুনি বন্ধ (Jawad চায় না, ২০২৬-১১-০৫): পটভূমি, চরিত্র, লেখা আর ক্যামেরা কিছুই কাঁপে না
export const useTremble = (_seed: string, _amp: number, _rot = 0, _speed = 0.17) => 'none';

export const Tremble: React.FC<{amp?: number; rot?: number; seed?: string; over?: number; children: React.ReactNode}> = ({over = 1, children}) => <AbsoluteFill style={{transform: `scale(${over})`}}>{children}</AbsoluteFill>;

export const useJitter = (_seed: string, _amp = 2.4, _rot = 0.45, _every = 3) => 'none';

export const Jitter: React.FC<{seed?: string; amp?: number; rot?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({style, children}) => <div style={style}>{children}</div>;

// ক্যামেরা: ধীরে কাছে আসে; hit থাকলে শুরুতে জুমের ধাক্কা
export const Camera: React.FC<{dur: number; hit?: number; children: React.ReactNode}> = ({dur, hit = 0, children}) => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, dur], [1.01, 1.05], clamp) + hit * 0.05 * Math.exp(-f / 8);
  return <AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: '50% 55%'}}>{children}</AbsoluteFill>;
};

// দৃশ্য বদল: এক দিক থেকে দ্রুত সরে আসে
export const SceneIn: React.FC<{index: number; hit?: number; children: React.ReactNode}> = ({index, hit = 0, children}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, 6], [0, 1], {...clamp, easing: (k) => 1 - (1 - k) * (1 - k) * (1 - k)});
  if (hit) return <AbsoluteFill>{children}</AbsoluteFill>;
  const dir = index % 2 === 0 ? 1 : -1;
  return <AbsoluteFill style={{transform: `translateX(${dir * (1 - t) * 150}px) scale(${1.06 - 0.06 * t})`}}>{children}</AbsoluteFill>;
};

// আঘাতের মুহূর্ত: সাদা ঝলক + চারদিকে কমিকের রেখা
export const Impact: React.FC<{hit: number; color?: string}> = ({hit, color = '#ffffff'}) => {
  const f = useCurrentFrame();
  if (!hit) return null;
  const flash = interpolate(f, [0, 5], [0.55 * Math.min(1, hit), 0], clamp);
  const lines = interpolate(f, [0, 2, 12], [0, 0.7, 0], clamp) * (hit > 1 ? 1 : 0.55);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: lines}}>
        {Array.from({length: 34}, (_, i) => {
          const a = (i / 34) * Math.PI * 2 + random(`il${i}`) * 0.1;
          const inner = 480 + random(`ir${i}`) * 260;
          const spread = 0.012 + random(`iw${i}`) * 0.018;
          const pt = (r: number, d: number) => `${540 + Math.cos(a + d) * r},${900 + Math.sin(a + d) * r}`;
          return <polygon key={i} points={`${pt(inner, 0)} ${pt(1500, spread)} ${pt(1500, -spread)}`} fill={color} />;
        })}
      </svg>
      <AbsoluteFill style={{background: color, opacity: flash}} />
    </AbsoluteFill>
  );
};

// বাতাসে ভাসা ধুলো
export const Dust: React.FC<{n?: number}> = ({n = 16}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}, (_, i) => {
        const sp = 0.35 + random(`ds${i}`) * 0.9;
        const y = (random(`dy${i}`) * 2100 - f * sp) % 2100;
        const yy = y < 0 ? y + 2100 : y;
        const x = random(`dx${i}`) * 1080 + Math.sin(f / 40 + i) * 26;
        const r = 2.5 + random(`dr${i}`) * 5;
        return <div key={i} style={{position: 'absolute', left: x, top: yy - 90, width: r * 2, height: r * 2, borderRadius: '50%', background: '#fff5dc', opacity: 0.12 + random(`do${i}`) * 0.22, boxShadow: `0 0 ${r * 3}px #fff5dc`}} />;
      })}
    </AbsoluteFill>
  );
};

// ধীরে সরে যাওয়া আলোর ফালি
export const LightSweep: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, Math.max(dur, 60)], [-700, 500]);
  return (
    <AbsoluteFill
      style={{pointerEvents: 'none', mixBlendMode: 'screen', overflow: 'hidden'}}
    >
      <div style={{position: 'absolute', top: -300, bottom: -300, left: x, width: 620, transform: 'rotate(14deg)', background: 'linear-gradient(90deg, rgba(255,226,170,0), rgba(255,226,170,0.1), rgba(255,226,170,0))'}} />
    </AbsoluteFill>
  );
};

const wordsOf = (text: string) => stripTags(text).split(/\s+/).filter(Boolean);

// বর্তমান শব্দ কোনটা: lead ফ্রেম চুপ থেকে তারপর কথা শুরু
const useWord = (n: number, dur: number, lead: number) => {
  const f = useCurrentFrame();
  const span = Math.max(1, (dur - lead) * 0.94);
  const p = (f - lead) / span;
  const cur = Math.min(n - 1, Math.floor(p * n));
  // ০..১: শব্দটা কতক্ষণ আগে এসেছে
  const fresh = Math.max(0, 1 - (p * n - cur));
  return {cur, fresh, started: f >= lead - 2};
};

// ন্যারেটরের ক্যাপশন: বর্তমান শব্দ সোনালি হয়ে ফুলে ওঠে, পুরো লেখা হালকা কাঁপে
export const KineticCaption: React.FC<{text: string; dur: number; lead?: number}> = ({text, dur, lead = 0}) => {
  const words = wordsOf(text);
  const {cur, fresh, started} = useWord(words.length, dur, lead);
  const t = useJitter(`cap${text.slice(0, 12)}`, 1.5, 0.22);
  if (!started) return null;
  const len = stripTags(text).length;
  const size = len > 90 ? 52 : len > 55 ? 60 : 70;
  return (
    <div style={{position: 'absolute', left: 60, right: 60, bottom: 150, textAlign: 'center', fontSize: size, lineHeight: 1.42, fontWeight: 800, transform: t, textShadow: '0 4px 22px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.8)'}}>
      {words.map((w, i) => (
        <span key={i} style={{display: 'inline-block', margin: '0 11px', color: i === cur ? GOLD : FG, opacity: i <= cur ? 1 : 0.32, transform: i === cur ? `scale(${1 + 0.07 * fresh}) translateY(${-5 * fresh}px)` : undefined}}>
          {w}
        </span>
      ))}
    </div>
  );
};

// চরিত্রের সংলাপ: কমিকের বুদবুদ, ওপরে নাম, লেজ বক্তার দিকে
export const SpeechCaption: React.FC<{text: string; dur: number; lead?: number; speaker: string; side?: 'left' | 'right' | 'center'; top?: number}> = ({text, dur, lead = 0, speaker, side = 'center', top = 215}) => {
  const f = useCurrentFrame();
  const words = wordsOf(text);
  const {cur, fresh, started} = useWord(words.length, dur, lead);
  const t = useJitter(`sp${text.slice(0, 12)}`, 1.8, 0.3);
  const s = interpolate(f, [lead - 2, lead + 5], [0.6, 1], {...clamp, easing: (k) => 1 - Math.pow(1 - k, 3)});
  if (!started) return null;
  const len = stripTags(text).length;
  const size = len > 80 ? 52 : len > 45 ? 60 : 72;
  const tailX = side === 'left' ? '25%' : side === 'right' ? '75%' : '50%';
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top, transform: `${t} scale(${s})`, transformOrigin: `${tailX} 100%`}}>
      <div style={{display: 'inline-block', marginLeft: 22, padding: '8px 28px', background: GOLD, color: '#15151b', fontSize: 40, fontWeight: 800, borderRadius: '18px 18px 0 0', border: '6px solid #1b1b1f', borderBottom: 'none'}}>{speaker}</div>
      <div style={{position: 'relative', background: '#fbf7ee', color: '#15151b', padding: '30px 38px', borderRadius: 38, border: '6px solid #1b1b1f', boxShadow: '0 22px 60px rgba(0,0,0,0.55)', fontSize: size, fontWeight: 800, lineHeight: 1.36}}>
        {words.map((w, i) => (
          <span key={i} style={{display: 'inline-block', marginRight: 19, color: i === cur ? '#b3201f' : '#15151b', opacity: i <= cur ? 1 : 0.36, transform: i === cur ? `scale(${1 + 0.05 * fresh})` : undefined}}>
            {w}
          </span>
        ))}
        <div style={{position: 'absolute', left: tailX, bottom: -40, marginLeft: -26, width: 0, height: 0, borderLeft: '26px solid transparent', borderRight: '26px solid transparent', borderTop: '42px solid #1b1b1f'}} />
        <div style={{position: 'absolute', left: tailX, bottom: -30, marginLeft: -18, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: '32px solid #fbf7ee'}} />
      </div>
    </div>
  );
};
