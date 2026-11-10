// ন্যারেটর: segments.json থেকেই তিনভাবে আনা যায়, আলাদা দৃশ্যের কোড ছাড়া
//  full = পুরো পর্দায় ন্যারেটর (চাইলে পাশে বোর্ডে বড় লেখা বা পয়েন্ট)
//  host = দৃশ্যটা একটা পর্দায়, পাশে দাঁড়িয়ে ন্যারেটর দেখাচ্ছে
//  pop  = দৃশ্যের কোণে গোল ফ্রেমে
// ঠোঁট ভয়েসের জোরের সঙ্গে মেলে (voice.tsx), চুপ থাকলে মুখ বন্ধ
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Expression} from './Toon';
import {BBA_GOLD, BBA_NAVY} from './cast';
import {NARRATOR_BG, NPose, NarratorArt} from './NarratorArt';
import {useVoiceLevel} from './voice';

export type NarratorCue = {
  mode?: 'full' | 'pop' | 'host';
  expression?: Expression;
  pose?: NPose;
  side?: 'left' | 'right'; // pop/host-এ ন্যারেটর কোন দিকে
  text?: string; // ওপরে সোনালি লেবেল
  big?: string; // full: বোর্ডে বিশাল লেখা/সংখ্যা ("৩০ লাখ")
  sub?: string; // big-এর নিচে ছোট লেখা
  lines?: string[]; // full: বোর্ডে একটা একটা করে আসা পয়েন্ট
  accent?: string; // big/lines-এর রং
  top?: number; // pop: গোল ফ্রেমের ওপরের কিনারা (ডিফল্ট 960)
  size?: number; // pop: গোল ফ্রেমের মাপ (ডিফল্ট 420)
};

// ন্যারেটরের নিজস্ব স্টুডিও: গাঢ় নীল, পেছনে হালকা নীল বৃত্ত (ন্যারেটরের পরিচয়)
export const NarratorStudio: React.FC<{circle?: boolean; circleX?: number; circleY?: number; circleD?: number}> = ({circle = true, circleX = 540, circleY = 1030, circleD = 940}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 1100px at 50% 40%, #1d2f55 0%, ${BBA_NAVY} 55%, #070b14 100%)`}} />
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, opacity: 0.12}}>
        <path d={`M-100 1500 L${520 + Math.sin(f / 40) * 10} 700 L460 650 L760 560 L700 860 L640 800 L40 1640Z`} fill={BBA_GOLD} />
      </svg>
      {circle ? <div style={{position: 'absolute', left: circleX - circleD / 2, top: circleY - circleD / 2, width: circleD, height: circleD, borderRadius: '50%', background: NARRATOR_BG, boxShadow: `0 0 0 14px ${BBA_GOLD}`}} /> : null}
    </AbsoluteFill>
  );
};

// ভয়েসের সঙ্গে ঠোঁট মেলানো ন্যারেটর
export const Narrator: React.FC<{height?: number; expression?: Expression; pose?: NPose; talking?: boolean; lookX?: number}> = ({height = 1300, expression = 'smile', pose = 'explain', talking = true, lookX = 0}) => {
  const level = useVoiceLevel();
  return <NarratorArt height={height} expression={expression} pose={pose} talking={talking} lookX={lookX} level={level} />;
};

const Label: React.FC<{text: string; top: number; s: number}> = ({text, top, s}) => (
  <div style={{position: 'absolute', left: 60, right: 60, top, textAlign: 'center', transform: `scale(${s})`}}>
    <span style={{display: 'inline-block', padding: '16px 40px', background: BBA_GOLD, color: BBA_NAVY, fontSize: 76, fontWeight: 800, borderRadius: 18, boxShadow: '0 20px 60px rgba(0,0,0,0.5)'}}>{text}</span>
  </div>
);

// পুরো পর্দায় ন্যারেটর (চাইলে বোর্ডসহ)
export const NarratorScene: React.FC<{cue: NarratorCue; dur: number}> = ({cue, dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 14}});
  const txt = spring({frame: f - 8, fps: 30, config: {damping: 12}});
  const zoom = interpolate(f, [0, dur], [1, 1.04]);
  const board = cue.big || (cue.lines && cue.lines.length);
  const acc = cue.accent ?? BBA_GOLD;
  if (!board) {
    return (
      <AbsoluteFill>
        <NarratorStudio />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: -40, display: 'flex', justifyContent: 'center', transform: `translateY(${(1 - pop) * 300}px) scale(${zoom})`, transformOrigin: '50% 100%'}}>
          <Narrator height={1500} expression={cue.expression} pose={cue.pose} />
        </div>
        {cue.text ? <Label text={cue.text} top={230} s={txt} /> : null}
      </AbsoluteFill>
    );
  }
  // বোর্ড: ওপরে কার্ড, নিচে ডান দিকে ন্যারেটর দেখাচ্ছে
  const lines = cue.lines ?? [];
  return (
    <AbsoluteFill>
      <NarratorStudio circleX={760} circleY={1330} circleD={760} />
      {cue.text ? <Label text={cue.text} top={170} s={txt} /> : null}
      <div style={{position: 'absolute', left: 60, right: 60, top: cue.text ? 320 : 220, padding: '50px 50px', background: 'rgba(8,14,28,0.82)', border: `6px solid ${acc}`, borderRadius: 34, boxShadow: '0 30px 80px rgba(0,0,0,0.5)', transform: `scale(${txt})`, transformOrigin: '50% 0'}}>
        {cue.big ? (
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: cue.big.length > 8 ? 130 : 180, fontWeight: 900, color: acc, lineHeight: 1.1, textShadow: `0 0 40px ${acc}55`}}>{cue.big}</div>
            {cue.sub ? <div style={{marginTop: 14, fontSize: 56, fontWeight: 700, color: '#f2efe9'}}>{cue.sub}</div> : null}
          </div>
        ) : null}
        {lines.map((l, i) => {
          const o = interpolate(f, [8 + (i * dur * 0.7) / Math.max(1, lines.length), 16 + (i * dur * 0.7) / Math.max(1, lines.length)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: i || cue.big ? 26 : 0, opacity: o, transform: `translateX(${(1 - o) * -40}px)`}}>
              <div style={{width: 26, height: 26, borderRadius: '50%', background: acc, flexShrink: 0}} />
              <div style={{fontSize: 60, fontWeight: 700, color: '#f2efe9', lineHeight: 1.3}}>{l}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', right: -170, bottom: -40, transform: `translateY(${(1 - pop) * 300}px)`}}>
        <Narrator height={1150} expression={cue.expression} pose={cue.pose ?? 'pointUp'} lookX={-0.6} />
      </div>
    </AbsoluteFill>
  );
};

// দৃশ্যটা একটা পর্দায়, পাশে ন্যারেটর দাঁড়িয়ে দেখাচ্ছে
export const NarratorHost: React.FC<{cue: NarratorCue; dur: number; children: React.ReactNode}> = ({cue, children}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 14}});
  const left = cue.side === 'left';
  const W = 700;
  const H = (W * 1920) / 1080;
  return (
    <AbsoluteFill>
      <NarratorStudio circle={false} />
      <div style={{position: 'absolute', top: 150, [left ? 'right' : 'left']: 50, width: W, height: H * 0.78, borderRadius: 40, overflow: 'hidden', border: `10px solid ${BBA_GOLD}`, boxShadow: '0 30px 90px rgba(0,0,0,0.6)', transform: `scale(${0.9 + 0.1 * pop})`}}>
        <div style={{width: 1080, height: 1920, transform: `scale(${W / 1080}) translateY(-120px)`, transformOrigin: '0 0'}}>{children}</div>
      </div>
      {cue.text ? <Label text={cue.text} top={70} s={pop} /> : null}
      <div style={{position: 'absolute', bottom: -40, [left ? 'left' : 'right']: -200, transform: `translateY(${(1 - pop) * 300}px) ${left ? 'scaleX(-1)' : ''}`}}>
        <Narrator height={1150} expression={cue.expression} pose={cue.pose ?? 'pointL'} />
      </div>
    </AbsoluteFill>
  );
};

// দৃশ্যের ওপর কোণে গোল ফ্রেমে ন্যারেটর (picture-in-picture)
export const NarratorPop: React.FC<{cue: NarratorCue; dur: number}> = ({cue, dur}) => {
  const f = useCurrentFrame();
  const inn = spring({frame: f - 2, fps: 30, config: {damping: 12}});
  const outT = interpolate(f, [dur - 8, dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = inn * outT;
  const D = cue.size ?? 420;
  const right = cue.side !== 'left';
  return (
    <div style={{position: 'absolute', top: cue.top ?? 960, [right ? 'right' : 'left']: 36, width: D, height: D, transform: `scale(${s})`, transformOrigin: right ? '100% 100%' : '0% 100%'}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: NARRATOR_BG, border: `10px solid ${BBA_GOLD}`, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)'}}>
        <div style={{position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)'}}>
          <Narrator height={720} expression={cue.expression} pose={cue.pose ?? 'explain'} />
        </div>
      </div>
    </div>
  );
};
