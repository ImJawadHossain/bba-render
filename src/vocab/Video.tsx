// VocabBangla অ্যাপের প্রোমো (ক্লায়েন্ট ধাঁচ: BBA লোগো বা ফলো-CTA নেই)
// স্ক্রিনশট: public/vocab/s01..s24.jpg (Jawad-এর দেওয়া, ৭৬৮×১৩৭৬)। স্ক্রিপ্ট: D:\ClaudeVideo\Promotional Video\VocabBangla\
import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {fontFamily} from '../common/Story';
import raw from './segments.json';
import timing from '../../public/vocab/timing.json';

export const BLUE = '#1f4fd8';
export const NAVY = '#0d1b3e';
export const RED = '#e5484d';
export const WHITE = '#ffffff';
const FPS = 30;
const TAIL = 1.2; // শেষ কার্ড ভয়েসের পরে একটু থাকে

export const VOCAB_TIMING = timing; // check-frames.mjs props.timing পড়ে
export const VOCAB_DURATION = Math.ceil((timing.total + TAIL) * FPS);

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const clean = (t: string) => t.replace(/\[[^\]]*\]\s*/g, '').trim();

// ---------- সব দৃশ্যে ----------

export const Badge: React.FC = () => (
  <div style={{position: 'absolute', left: 40, top: 44, display: 'flex', alignItems: 'center', gap: 16, padding: '12px 26px 12px 14px', background: 'rgba(255,255,255,0.94)', borderRadius: 999, boxShadow: '0 10px 30px rgba(0,0,0,0.25)'}}>
    <AppIcon size={58} />
    <span style={{fontSize: 40, fontWeight: 800, color: NAVY, fontFamily: 'sans-serif'}}>VocabBangla</span>
  </div>
);

export const AppIcon: React.FC<{size: number}> = ({size}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.24, background: `linear-gradient(145deg, #2d63f0, ${BLUE} 55%, #163aa8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(31,79,216,0.45)'}}>
    <span style={{color: WHITE, fontSize: size * 0.62, fontWeight: 900, fontFamily: 'sans-serif', lineHeight: 1}}>V</span>
  </div>
);

// ওপরের বড় লেখা
export const Headline: React.FC<{text: string; color?: string; top?: number}> = ({text, color = BLUE, top = 170}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 3, fps: FPS, config: {damping: 13}});
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top, display: 'flex', justifyContent: 'center', transform: `scale(${0.85 + 0.15 * s})`, opacity: s}}>
      <div style={{padding: '22px 44px', background: color, color: WHITE, borderRadius: 28, fontSize: 76, fontWeight: 800, textAlign: 'center', lineHeight: 1.25, boxShadow: '0 18px 50px rgba(0,0,0,0.35)'}}>{text}</div>
    </div>
  );
};

// নিচের সাবটাইটেল: শব্দগুলো ভয়েসের সাথে একটু একটু করে উজ্জ্বল হয়
export const Subtitle: React.FC<{text: string; dur: number}> = ({text, dur}) => {
  const f = useCurrentFrame();
  const words = clean(text).split(/\s+/);
  const inn = interpolate(f, [0, 6], [0, 1], clamp);
  const lit = interpolate(f, [4, dur * 0.92], [0, words.length], clamp);
  return (
    <div style={{position: 'absolute', left: 54, right: 54, bottom: 150, display: 'flex', justifyContent: 'center', opacity: inn}}>
      <div style={{background: 'rgba(10,16,36,0.82)', borderRadius: 30, padding: '22px 34px 26px', fontSize: 52, fontWeight: 700, lineHeight: 1.35, textAlign: 'center', maxWidth: 960}}>
        {words.map((w, i) => (
          <span key={i} style={{color: i < lit ? WHITE : 'rgba(255,255,255,0.45)'}}>
            {w}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};

// ---------- দৃশ্যের ছাঁচ ----------

// পুরো পর্দায় স্ক্রিনশট, ধীরে ফোনের দিকে কাছে যায়
export const Shot: React.FC<{n: number; dur: number; zoom?: [number, number]; origin?: string}> = ({n, dur, zoom = [1.02, 1.12], origin = '50% 45%'}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, dur], zoom, clamp);
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: NAVY}}>
      <Img src={staticFile(`vocab/s${String(n).padStart(2, '0')}.jpg`)} style={{width: 1080, height: 1920, objectFit: 'cover', transform: `scale(${z})`, transformOrigin: origin}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,14,32,0.55) 0%, rgba(8,14,32,0) 26%, rgba(8,14,32,0) 64%, rgba(8,14,32,0.7) 100%)'}} />
    </AbsoluteFill>
  );
};

type Sc = React.FC<{dur: number; text: string}>;
const shotScene = (n: number, title: string, o: {zoom?: [number, number]; origin?: string; color?: string} = {}): Sc => ({dur}) => (
  <>
    <Shot n={n} dur={dur} zoom={o.zoom} origin={o.origin} />
    <Headline text={title} color={o.color} />
  </>
);

// হুক: ইংরেজি শব্দ ভেসে ওঠে, তারপর ঝাপসা হয়ে মিলিয়ে যায়
const Hook: Sc = ({dur}) => {
  const f = useCurrentFrame();
  const words: [string, number, number][] = [
    ['nostalgic', 120, 560],
    ['picturesque', 520, 700],
    ['grateful', 160, 860],
    ['frugal', 640, 980],
    ['tranquil', 110, 1120],
    ['burnout', 560, 1250],
  ];
  const fade = interpolate(f, [dur * 0.5, dur * 0.8], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 1200px at 50% 40%, #1d3a8a, ${NAVY} 70%)`}}>
      {words.map(([w, x, y], i) => {
        const s = spring({frame: f - i * 4, fps: FPS, config: {damping: 12}});
        const gone = i % 2 === 0 ? fade : fade * 0.85;
        return (
          <div key={w} style={{position: 'absolute', left: x, top: y, fontSize: 82, fontWeight: 800, color: WHITE, fontFamily: 'Georgia, serif', opacity: s * (1 - gone), filter: `blur(${gone * 14}px)`, transform: `translateY(${-gone * 60}px)`}}>
            {w}
          </div>
        );
      })}
      <Headline text="এক সপ্তাহ পর? অর্ধেকই উধাও" color={RED} top={300} />
    </AbsoluteFill>
  );
};

// শেষ কার্ড: আইকন, নাম, Play Store বোতাম
const End: Sc = ({dur}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 4, fps: FPS, config: {damping: 12}});
  const b = spring({frame: f - 18, fps: FPS, config: {damping: 10}});
  const pulse = 1 + Math.max(0, Math.sin((f - 30) / 6)) * 0.04;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <Img src={staticFile('vocab/s24.jpg')} style={{width: 1080, height: 1920, objectFit: 'cover', filter: 'blur(18px) brightness(0.55)', transform: 'scale(1.1)'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(13,27,62,0.55), rgba(13,27,62,0.85))'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${0.8 + 0.2 * s})`, opacity: s}}>
        <AppIcon size={260} />
        <div style={{marginTop: 46, fontSize: 120, fontWeight: 900, color: WHITE, fontFamily: 'sans-serif'}}>VocabBangla</div>
        <div style={{marginTop: 6, fontSize: 52, fontWeight: 700, color: '#c9d6ff', fontFamily: 'sans-serif'}}>Learn Vocabulary</div>
        <div style={{marginTop: 34, fontSize: 60, fontWeight: 800, color: WHITE}}>মুখস্থ নয়, মনে রাখো</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1130, display: 'flex', justifyContent: 'center', transform: `scale(${b * pulse})`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, padding: '26px 54px', background: WHITE, borderRadius: 999, boxShadow: '0 20px 60px rgba(0,0,0,0.45)'}}>
          <svg width={64} height={70} viewBox="0 0 32 35">
            <path d="M2 2 L18 17.5 L2 33Z" fill="#00c3ff" />
            <path d="M2 2 L23 13.5 L18 17.5Z" fill="#00e676" />
            <path d="M2 33 L23 21.5 L18 17.5Z" fill="#ff3d57" />
            <path d="M23 13.5 L30 17.5 L23 21.5 L18 17.5Z" fill="#ffc400" />
          </svg>
          <span style={{fontSize: 58, fontWeight: 800, color: NAVY}}>Play Store থেকে নামাও</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, Sc> = {
  hook: Hook,
  curve: shotScene(1, 'দোষ তোমার না', {zoom: [1.0, 1.3], origin: '40% 55%'}),
  intro: shotScene(19, 'এসে গেছে VocabBangla', {zoom: [1.0, 1.1], origin: '45% 40%'}),
  goal: shotScene(23, 'তোমার লক্ষ্য, তোমার পথ', {zoom: [1.0, 1.2], origin: '55% 65%'}),
  road: shotScene(22, '১৫০০ দরকারি শব্দ, ধাপে ধাপে', {zoom: [1.0, 1.15], origin: '50% 50%'}),
  word: shotScene(6, 'অর্থ, উচ্চারণ, উদাহরণ', {zoom: [1.0, 1.18], origin: '60% 40%'}),
  quiz: shotScene(4, 'শিখেই পরীক্ষা', {zoom: [1.05, 1.18], origin: '50% 45%'}),
  wrong: shotScene(16, 'ভুলগুলো যায় রিভিউতে', {zoom: [1.0, 1.15], origin: '50% 45%'}),
  remind: shotScene(20, 'ভুলে যাওয়ার আগেই মনে করায়', {zoom: [1.0, 1.3], origin: '50% 35%', color: RED}),
  spaced: shotScene(21, 'Spaced Repetition', {zoom: [1.0, 1.2], origin: '50% 40%'}),
  progress: shotScene(13, 'প্রতিদিনের অগ্রগতি', {zoom: [1.0, 1.18], origin: '45% 50%'}),
  end: End,
};

const segs = raw as {id: string; text: string}[];

export const VocabPromo: React.FC<{timing?: typeof timing}> = () => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: NAVY, fontFamily, color: WHITE}}>
      <Audio src={staticFile('vocab/voice.mp3')} />
      {segs.map((seg, i) => {
        const t = timing.segments[i];
        const from = Math.round(t.start * fps);
        const last = i === segs.length - 1;
        const dur = Math.round((last ? t.end + TAIL : t.end) * fps) - from;
        const C = SCENES[seg.id];
        return (
          <Sequence key={seg.id} from={from} durationInFrames={dur}>
            <Fade>
              <C dur={dur} text={seg.text} />
              {seg.id !== 'end' ? <Badge /> : null}
              <Subtitle text={seg.text} dur={Math.round((t.end - t.start) * fps)} />
            </Fade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

// দৃশ্য বদলের সময় হালকা ফেড
export const Fade: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{opacity: interpolate(f, [0, 6], [0, 1], clamp)}}>{children}</AbsoluteFill>;
};
