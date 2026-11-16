import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, GOLD, RED, Title, inOut, out} from '../biz/art';
import {Bill} from '../mcdonalds/art';
import {NarratorArt} from '../common/NarratorArt';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, NameCard, People, SP, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const theranosSegments = raw as Seg[];
export const theranosFallback = makeFallback(theranosSegments);

const HOLMES: ToonLook = {skin: '#f2cfb2', hair: '#d8b35a', hairStyle: 'bun', top: '#141418', bottom: '#141418', shoes: '#141418'};
const WORKER: ToonLook = {...CAST.engineer};
const WORKER2: ToonLook = {...CAST.pro, jacket: '#e9ecef'};
const OLD1: ToonLook = {...CAST.boss, hair: '#d8d4cc', mustache: false};
const GENERAL: ToonLook = {skin: '#e2b391', hair: '#c9c2b4', hairStyle: 'short', top: '#f4f2ec', jacket: '#3a4a3a', tie: '#1a1a1a', bottom: '#2a3028'};
const REPORTER: ToonLook = {...CAST.ceo, jacket: undefined, top: '#6a7a8a', glasses: true};
const TEAL = '#3ac2b8';

const Drop: React.FC<{size?: number}> = ({size = 120}) => (
  <svg viewBox="-30 -40 60 80" width={size * 0.75} height={size}>
    <path d="M0 -36 C14 -12 24 2 24 14 C24 28 13 36 0 36 C-13 36 -24 28 -24 14 C-24 2 -14 -12 0 -36Z" fill="#c8243a" stroke="#1b1b1f" strokeWidth={3} />
    <ellipse cx={-8} cy={10} rx={5} ry={9} fill="#fff" opacity={0.5} />
  </svg>
);

// ছোট সাদা মেশিন (নিজস্ব নকশা)
const Box: React.FC<{size?: number; status?: 'ok' | 'err' | 'idle'}> = ({size = 460, status = 'idle'}) => {
  const c = status === 'ok' ? '#5fd08a' : status === 'err' ? RED : TEAL;
  return (
    <svg viewBox="0 0 300 320" width={size} height={(size * 320) / 300}>
      <rect x={30} y={10} width={240} height={300} rx={22} fill="#eef1f4" stroke="#1b1b1f" strokeWidth={6} />
      <rect x={60} y={40} width={180} height={110} rx={10} fill="#141820" stroke="#1b1b1f" strokeWidth={4} />
      <text x={150} y={108} textAnchor="middle" fontSize={status === 'err' ? 38 : 34} fontWeight={900} fontFamily="Arial Black, Arial" fill={c}>{status === 'err' ? 'ERROR' : status === 'ok' ? 'OK' : '...'}</text>
      <rect x={100} y={190} width={100} height={70} rx={8} fill="#c9ced3" stroke="#1b1b1f" strokeWidth={4} />
      <circle cx={150} cy={225} r={14} fill={c} />
    </svg>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  machine: ({dur}) => {
    const f = useCurrentFrame();
    const bad = f > dur * 0.4;
    return (
      <People dur={dur} bg="dark" actors={[]}>
        <AbsoluteFill style={{background: bad ? 'radial-gradient(ellipse at 50% 45%, rgba(224,36,60,0.25), rgba(0,0,0,0) 60%)' : undefined}} />
        <div style={{position: 'absolute', left: 310, top: 460, transform: bad ? `translateX(${Math.sin(f * 2) * 5}px)` : undefined}}>
          <Box status={bad ? 'err' : 'idle'} />
        </div>
      </People>
    );
  },
  holmes: ({dur}) => (
    <People dur={dur} bg="#2a2a34" actors={[{look: HOLMES, x: 540, h: 980, expression: 'serious'}]}>
      <NameCard name="Elizabeth Holmes" sub="Stanford ছেড়ে দিলেন" color={TEAL} />
    </People>
  ),
  change: ({dur}) => <People dur={dur} bg="office" actors={[{look: HOLMES, x: 540, h: 980, expression: 'smile', gesture: 'explain', talking: true}]} title="চিকিৎসা বদলে দেব" titleColor={TEAL} titleAt={0.2} />,
  prick: ({dur}) => {
    const f = useCurrentFrame();
    const d = spring({frame: f - dur * 0.4, fps: 30, config: {damping: 12}});
    return (
      <People dur={dur} bg="plain" actors={[]}>
        <svg width={760} height={420} viewBox="0 0 380 210" style={{position: 'absolute', left: 150, top: 520}}>
          <path d="M0 150 L150 150 C170 150 175 120 200 118 L320 118 C350 118 350 150 322 150 L250 150 L200 200 L0 210Z" fill="#e8b994" stroke="#1b1b1f" strokeWidth={4} />
        </svg>
        <div style={{position: 'absolute', left: 750, top: 780, transform: `scale(${d})`, transformOrigin: '50% 0'}}>
          <Drop size={150} />
        </div>
        <Title top={280} size={90} opacity={out(f, 4, 14)}>
          শুধু এক ফোঁটা
        </Title>
      </People>
    );
  },
  crazy: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#1a1a26" actors={[0, 1, 2, 3].map((i) => ({look: [CAST.customer, CAST.customer2, CAST.founder, CAST.pro][i], x: 170 + i * 245, h: 620, expression: 'laugh' as const, gesture: (i % 2 ? 'wave' : 'thumbsUp') as 'wave' | 'thumbsUp'}))}>
        <div style={{position: 'absolute', left: 360, top: 300, transform: `scale(${spring({frame: f, fps: 30, config: {damping: 12}})})`}}>
          <Box size={340} status="ok" />
        </div>
      </People>
    );
  },
  look: ({dur}) => (
    <People dur={dur} bg="#2a2a34" actors={[{look: HOLMES, x: 540, y: 2000, h: 1500, expression: 'serious', talking: true}]} title="কালো টার্টলনেক, ভারী কণ্ঠ" titleColor={TEAL} titleAt={0.2} />
  ),
  board: ({dur}) => (
    <People dur={dur} bg="office" actors={[{look: OLD1, x: 300, h: 880, expression: 'smile'}, {look: GENERAL, x: 790, h: 900, expression: 'serious'}]}>
      <NameCard name="Henry Kissinger" sub="সাবেক মন্ত্রী" top={300} />
      <NameCard name="James Mattis" sub="জেনারেল" top={480} right color={TEAL} />
    </People>
  ),
  money: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#14202a" actors={[{look: CAST.boss, x: 540, h: 880, expression: 'laugh', gesture: 'open'}]}>
        {Array.from({length: 22}, (_, i) => {
          const t = Math.max(0, f - i * 2);
          return <Bill key={i} size={150} style={{position: 'absolute', left: 40 + ((i * 131) % 900), top: -120 + t * (8 + (i % 4)), transform: `rotate(${t * (i % 2 ? 4 : -4)}deg)`}} />;
        })}
      </People>
    );
  },
  youngest: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#2a1e0e" actors={[{look: HOLMES, x: 540, h: 960, expression: 'smile', gesture: 'wave'}]} title="সবচেয়ে কম বয়সী বিলিয়নিয়ার" titleAt={0.2}>
        {[120, 930].map((x, i) => <div key={i} style={{position: 'absolute', left: x - 170, top: -100, width: 340, height: 1600, background: 'linear-gradient(180deg, rgba(255,235,180,0.3), rgba(255,235,180,0))', transform: `rotate(${(i ? -14 : 14) + Math.sin(f / 15) * 3}deg)`, transformOrigin: '50% 0'}} />)}
      </People>
    );
  },
  lab: ({dur}) => (
    <People dur={dur} bg="#14181e" actors={[{look: WORKER, x: 790, h: 840, expression: 'worried'}]} title="ল্যাবের ভেতরে" titleColor="#c9ced3" titleAt={0.1}>
      <div style={{position: 'absolute', left: 90, top: 600}}>
        <Box size={460} />
      </div>
    </People>
  ),
  fail: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#14181e" actors={[{look: WORKER, x: 810, h: 760, expression: 'shocked', gesture: 'shrug'}]}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{position: 'absolute', left: 50 + (i % 2) * 300, top: 320 + Math.floor(i / 2) * 400, opacity: out(f, i * 6, i * 6 + 8)}}>
            <Box size={290} status={i === 3 ? 'ok' : 'err'} />
          </div>
        ))}
      </People>
    );
  },
  secret: ({dur}) => {
    const f = useCurrentFrame();
    const open = inOut(f, dur * 0.2, dur * 0.7);
    return (
      <People dur={dur} bg="#14181e" actors={[]} title="গোপনে অন্য মেশিনে" titleColor={RED} titleAt={0.4}>
        <div style={{position: 'absolute', left: 170, top: 620, width: 740, height: 500, background: '#6a727c', border: '10px solid #1b1b1f', borderRadius: 16}}>
          {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 40, right: 40, top: 60 + i * 140, height: 100, background: '#3a4048', border: '5px solid #1b1b1f'}} />)}
        </div>
        <div style={{position: 'absolute', left: 120, top: 520, transform: `translateX(${-open * 600}px)`}}>
          <div style={{width: 840, height: 700, background: '#eef1f4', border: '10px solid #1b1b1f', borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial Black, Arial', fontSize: 80, color: '#3a4048'}}>EDISON</div>
        </div>
      </People>
    );
  },
  wrong: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#20242c" actors={[{look: CAST.customer2, x: 280, h: 800, expression: 'worried', gesture: 'hold', holding: <div style={{width: 110, height: 150, background: '#f6f2e8', border: '4px solid #1b1b1f'}} />}]}>
        <div style={{position: 'absolute', left: 150, top: 320, width: 520, padding: 34, background: '#f6f2e8', color: '#1a1814', fontFamily: 'Georgia, serif', transform: 'rotate(-3deg)'}}>
          <div style={{fontSize: 46, fontWeight: 900, textAlign: 'center'}}>TEST REPORT</div>
          {[0, 1, 2].map((i) => <div key={i} style={{height: 12, background: '#bdb4a0', margin: '18px 0', width: `${70 + i * 10}%`}} />)}
          <div style={{fontSize: 60, fontWeight: 900, color: RED, textAlign: 'center', opacity: out(f, dur * 0.3, dur * 0.45)}}>WRONG</div>
        </div>
      </People>
    );
  },
  silenced: ({dur}) => <People dur={dur} bg="office" actors={[{look: WORKER2, x: 280, h: 800, expression: 'worried', talking: true}, {look: CAST.ceo, x: 780, h: 880, expression: 'serious', gesture: 'pointUp'}]} bubble='"চুপ!"' bubbleX={620} bubbleY={380} bubbleTail="down" />,
  whistle: ({dur}) => (
    <People dur={dur} bg="#1a2a2a" actors={[{look: {...CAST.founder, top: '#e9ecef'}, x: 320, h: 880, expression: 'serious', gesture: 'explain', talking: true}, {look: WORKER2, x: 760, h: 840, expression: 'serious', gesture: 'pointUp'}]} title="মুখ খুললেন" titleColor={TEAL} titleAt={0.3} />
  ),
  news: ({dur}) => {
    const f = useCurrentFrame();
    const p = spring({frame: f - 3, fps: 30, config: {damping: 11}});
    return (
      <People dur={dur} bg="#20242c" actors={[{look: REPORTER, x: 830, h: 720, expression: 'serious', gesture: 'pointL'}]}>
        <div style={{position: 'absolute', left: 60, top: 340, width: 680, padding: 34, background: '#efe6d0', color: '#1a1410', fontFamily: 'Georgia, serif', transform: `rotate(${(1 - p) * 40 - 3}deg) scale(${p})`}}>
          <div style={{fontSize: 34, textAlign: 'center', borderBottom: '4px solid #1a1410', paddingBottom: 8}}>THE NEWS · 2015</div>
          <div style={{fontSize: 64, fontWeight: 900, textAlign: 'center', marginTop: 16}}>THE MACHINE DOESN'T WORK</div>
          {[0, 1, 2].map((i) => <div key={i} style={{height: 11, background: '#bdb4a0', margin: '16px 0', width: `${70 + i * 10}%`}} />)}
        </div>
      </People>
    );
  },
  guilty: ({dur}) => {
    const f = useCurrentFrame();
    const o = out(f, dur * 0.35, dur * 0.5);
    return (
      <People dur={dur} bg="#2a1e14" actors={[{look: HOLMES, x: 540, h: 880, expression: 'sad'}]}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center'}}>
          <span style={{display: 'inline-block', padding: '14px 40px', border: `12px solid ${RED}`, color: RED, fontSize: 120, fontWeight: 900, fontFamily: 'Arial Black, Arial', transform: `rotate(-8deg) scale(${2 - o})`, opacity: o, background: 'rgba(0,0,0,0.45)'}}>GUILTY</span>
        </div>
      </People>
    );
  },
  jail: ({dur}) => (
    <People dur={dur} bg="dark" actors={[{look: HOLMES, x: 540, h: 880, expression: 'sad'}]} title="১১ বছরের বেশি" titleColor={RED} titleAt={0.2}>
      <AbsoluteFill style={{zIndex: 2}}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <div key={i} style={{position: 'absolute', left: 90 + i * 150, top: 500, width: 22, height: 1100, background: '#5a6066', border: '3px solid #1b1b1f'}} />)}
      </AbsoluteFill>
    </People>
  ),
  cta: () => (
    <CtaScene glow="rgba(58,194,184,0.16)">
      <Box size={360} status="err" />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const TheranosThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 35% 55%, rgba(224,36,60,0.25), #0b0d12 70%)'}} />
    <div style={{position: 'absolute', left: 60, top: 660}}>
      <Box size={540} status="err" />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={960} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={96}>যে মেশিন কাজই করত না</ThumbText>
      <div>
        <ThumbText size={110} bg={RED}>
          তার দাম $9B!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>বিলিয়নিয়ার থেকে জেলে</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 2015
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const TheranosVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={theranosSegments} folder="theranos/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<TheranosThumbnail />} />
);

