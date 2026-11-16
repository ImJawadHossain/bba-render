import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, GOLD, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {NarratorArt} from '../common/NarratorArt';
import {CAST} from '../common/cast';
import {Toon, ToonLook} from '../common/Toon';
import {At, CtaScene, NameCard, People, QuoteScene, SP, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const nokiaSegments = raw as Seg[];
export const nokiaFallback = makeFallback(nokiaSegments);

const ELOP: ToonLook = {skin: '#efc6a6', hair: '#6a5a4a', hairStyle: 'balding', top: '#f4f2ec', jacket: '#1f2a44', tie: '#2b5fa0', bottom: '#1c1e24', glasses: true};
const JOBS: ToonLook = {skin: '#e8b994', hair: '#6a6058', hairStyle: 'balding', top: '#141418', bottom: '#3a4a6a', shoes: '#e8e4dc', glasses: true};
const NBLUE = '#1a56b0';

// পুরোনো বোতামওয়ালা ফোন (নিজস্ব নকশা)
const BrickPhone: React.FC<{size?: number; snake?: boolean}> = ({size = 300, snake}) => {
  const f = useCurrentFrame();
  const n = Math.floor(f / 4) % 8;
  return (
    <svg viewBox="0 0 120 260" width={size * 0.46} height={size}>
      <rect x={6} y={4} width={108} height={252} rx={24} fill="#22324a" stroke="#1b1b1f" strokeWidth={4} />
      <rect x={20} y={28} width={80} height={80} rx={4} fill="#a8c490" stroke="#1b1b1f" strokeWidth={3} />
      {snake ? (
        <g fill="#1f2e14">
          {[0, 1, 2, 3].map((i) => <rect key={i} x={28 + ((n + i) % 8) * 8} y={64} width={7} height={7} />)}
          <rect x={80} y={44} width={7} height={7} />
        </g>
      ) : (
        <text x={60} y={74} textAnchor="middle" fontSize={15} fontWeight={900} fontFamily="Arial" fill="#1f2e14">NOKIA</text>
      )}
      {Array.from({length: 12}, (_, i) => <rect key={i} x={24 + (i % 3) * 26} y={130 + Math.floor(i / 3) * 28} width={20} height={18} rx={5} fill="#c9ced3" stroke="#1b1b1f" strokeWidth={2} />)}
    </svg>
  );
};

// কাচের টাচস্ক্রিন ফোন
const GlassPhone: React.FC<{size?: number; dim?: number}> = ({size = 420, dim = 0}) => (
  <div style={{width: size * 0.5, height: size, borderRadius: size * 0.07, background: '#111', border: `${size * 0.015}px solid #4a4a50`, padding: size * 0.02, filter: `grayscale(${dim}) brightness(${1 - dim * 0.4})`, boxShadow: '0 30px 80px rgba(0,0,0,0.55)'}}>
    <div style={{width: '100%', height: '100%', borderRadius: size * 0.05, background: 'linear-gradient(160deg, #3a7ad8, #5b51d8 60%, #c13584)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: size * 0.018, padding: size * 0.03, alignContent: 'start'}}>
      {Array.from({length: 12}, (_, i) => <div key={i} style={{aspectRatio: '1', borderRadius: size * 0.015, background: ['#f2c84a', '#5fd08a', '#e0405a', '#f2efe9'][i % 4]}} />)}
    </div>
  </div>
);

const SCENES: Record<string, React.FC<SP>> = {
  elopq: ({dur, id}) => <QuoteScene dur={dur} quote={id === 'line' ? '"আমরা কিছু ভুল করিনি। তবু হেরে গেছি।"' : '"আমরা কিছু ভুল করিনি। তবু কীভাবে যেন হেরে গেছি।"'} who="Stephen Elop, Nokia CEO" look={ELOP} expression="sad" gesture="shrug" color={NBLUE} />,
  cry: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: ELOP, x: 540, y: 2050, h: 1650, expression: 'sad'}]}>
        {[448, 600].map((x, i) => {
          const t = ((f + i * 12) % 36) / 36;
          return (
            <svg key={x} width={44} height={64} viewBox="-15 -20 30 40" style={{position: 'absolute', left: x, top: 910 + t * 130, opacity: 1 - t, zIndex: 2}}>
              <path d="M0 -18 C8 -6 12 2 12 8 C12 15 6 18 0 18 C-6 18 -12 15 -12 8 C-12 2 -8 -6 0 -18Z" fill="#8ac8f0" />
            </svg>
          );
        })}
      </People>
    );
  },
  half: ({dur}) => {
    const f = useCurrentFrame();
    const n = Math.floor(interpolate(f, [0, dur * 0.8], [0, 18], clampOpts));
    return (
      <People dur={dur} bg="plain" actors={[]} title="প্রায় অর্ধেক দুনিয়া" titleColor="#7ab0e8" titleAt={0.4}>
        <div style={{position: 'absolute', left: 90, right: 90, top: 380, display: 'flex', flexWrap: 'wrap', gap: 34, justifyContent: 'center'}}>
          {Array.from({length: 36}, (_, i) => (
            <svg key={i} viewBox="0 0 40 60" width={84} height={120}>
              <circle cx={20} cy={12} r={10} fill={i < n ? '#7ab0e8' : '#3a3e48'} />
              <path d="M4 58 C4 34 8 26 20 26 C32 26 36 34 36 58Z" fill={i < n ? '#7ab0e8' : '#3a3e48'} />
            </svg>
          ))}
        </div>
      </People>
    );
  },
  tough: ({dur}) => {
    const f = useCurrentFrame();
    const drop = inOut(f, 0, dur * 0.25);
    const bounce = spring({frame: f - dur * 0.25, fps: 30, config: {damping: 7}});
    return (
      <People dur={dur} bg="plain" actors={[]}>
        <div style={{position: 'absolute', left: 400, top: interpolate(drop, [0, 1], [-500, 460]) - (f > dur * 0.25 ? (1 - bounce) * 120 : 0)}}>
          <BrickPhone size={520} snake />
        </div>
        <div style={{position: 'absolute', left: 120, right: 120, top: 1010, height: 20, background: '#5a6066', borderRadius: 10}} />
        <Title top={1060} size={70} color="#a8c490" opacity={out(f, dur * 0.5, dur * 0.7)}>
          ভাঙে না · ১ সপ্তাহ চার্জ · Snake
        </Title>
      </People>
    );
  },
  phoneword: () => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill style={{background: '#000'}}>
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(26,86,176,0.5), rgba(0,0,0,0) 60%)'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 660, textAlign: 'center', fontFamily: 'Arial Black, Arial', fontSize: 220, color: '#fff', letterSpacing: 8, transform: `scale(${spring({frame: f, fps: 30, config: {damping: 12}})})`}}>NOKIA</div>
      </AbsoluteFill>
    );
  },
  proto: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#1c2026" actors={[{look: CAST.engineer, x: 260, h: 820, expression: 'laugh', gesture: 'pointR'}]} title="iPhone-এর আগেই!" titleColor={GOLD} titleAt={0.4}>
        <div style={{position: 'absolute', left: 540, top: 500, transform: `scale(${spring({frame: f - 4, fps: 30, config: {damping: 12}})})`}}>
          <GlassPhone size={720} />
        </div>
      </People>
    );
  },
  risky: ({dur}) => (
    <People dur={dur} bg="office" actors={[{look: CAST.boss, x: 240, h: 860, expression: 'skeptical', gesture: 'shrug', talking: true}, {look: CAST.ceo, x: 800, h: 860, expression: 'serious'}]} bubble='"খুব দামি, খুব ঝুঁকি।"' bubbleY={290}>
      <div style={{position: 'absolute', left: 440, top: 620}}>
        <GlassPhone size={400} />
      </div>
    </People>
  ),
  drawer: ({dur}) => {
    const f = useCurrentFrame();
    const c = inOut(f, dur * 0.2, dur * 0.8);
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #1c2230, #0c0f15)'}} />
        <div style={{position: 'absolute', left: 150, top: 600, width: 780, height: 440, background: '#4a3426', borderRadius: 12}} />
        <div style={{position: 'absolute', left: 400, top: 200 + c * 480, transform: 'rotate(85deg)', opacity: 1 - c * 0.2}}>
          <GlassPhone size={520} dim={c} />
        </div>
        <div style={{position: 'absolute', left: 190, top: interpolate(c, [0, 1], [920, 660]), width: 700, height: 340, background: '#6a4a34', borderRadius: 10, border: '6px solid #1b1b1f', zIndex: 2}}>
          <div style={{position: 'absolute', left: '50%', top: 150, width: 150, height: 30, marginLeft: -75, borderRadius: 15, background: '#c9a46a'}} />
        </div>
      </AbsoluteFill>
    );
  },
  iphone: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#05060a" actors={[{look: JOBS, x: 300, h: 900, expression: 'smile', gesture: 'pointR', talking: true}]} title="2007" titleAt={0}>
        <div style={{position: 'absolute', left: 560, top: 480, transform: `scale(${spring({frame: f - dur * 0.25, fps: 30, config: {damping: 12}})})`, filter: 'drop-shadow(0 0 50px rgba(140,180,255,0.6))'}}>
          <GlassPhone size={760} />
        </div>
        <NameCard name="Steve Jobs" sub="iPhone" top={380} color={GOLD} />
      </People>
    );
  },
  glass: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[]} title="বোতাম নেই!" titleColor={GOLD} titleAt={0.1}>
        <div style={{position: 'absolute', left: 340, top: 340}}>
          <GlassPhone size={800} />
        </div>
        <div style={{position: 'absolute', left: 520 + Math.sin(f / 8) * 100, top: 640 + Math.cos(f / 10) * 100, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.55)', border: '6px solid #fff'}} />
      </People>
    );
  },
  laugh: ({dur}) => (
    <People dur={dur} bg="office" actors={[{look: CAST.boss, x: 240, h: 840, expression: 'laugh', gesture: 'shrug'}, {look: CAST.ceo, x: 800, h: 840, expression: 'laugh', gesture: 'thumbsUp'}]} title="শৌখিন খেলনা! 😂" titleColor={GOLD} titleAt={0.2}>
      <div style={{position: 'absolute', left: 410, top: 680}}>
        <BrickPhone size={460} />
      </div>
    </People>
  ),
  android: ({dur}) => {
    const f = useCurrentFrame();
    const n = Math.floor(interpolate(f, [0, dur * 0.8], [1, 12], clampOpts));
    return (
      <People dur={dur} bg="plain" actors={[]} title="Android" titleColor="#5fd08a" titleAt={0}>
        <div style={{position: 'absolute', left: 70, right: 70, top: 380, display: 'flex', flexWrap: 'wrap', gap: 26, justifyContent: 'center'}}>
          {Array.from({length: 12}, (_, i) => (
            <div key={i} style={{opacity: i < n ? 1 : 0.06}}>
              <GlassPhone size={340} />
            </div>
          ))}
        </div>
      </People>
    );
  },
  old: ({dur}) => (
    <People dur={dur} bg="dark" actors={[{look: CAST.ceo, x: 760, h: 860, expression: 'worried', gesture: 'hold', holding: <BrickPhone size={220} />}]} title="পুরোনো সফটওয়্যার" titleColor="#a8c490" titleAt={0.2}>
      <div style={{position: 'absolute', left: 90, top: 560}}>
        <BrickPhone size={680} />
      </div>
    </People>
  ),
  market: ({dur}) => {
    const f = useCurrentFrame();
    const g = inOut(f, 0, dur * 0.9);
    return (
      <People dur={dur} bg="plain" actors={[]} title="বাজার হারাচ্ছে" titleColor={RED} titleAt={0.2}>
        <svg width={900} height={720} viewBox="0 0 900 720" style={{position: 'absolute', left: 90, top: 400}}>
          <path d="M20 700 L880 700 M20 700 L20 20" stroke="#555" strokeWidth={5} />
          <polyline points={`20,70 ${20 + 280 * g},${70 + 130 * g} ${20 + 560 * g},${70 + 370 * g} ${20 + 840 * g},${70 + 590 * g}`} stroke={RED} strokeWidth={16} fill="none" strokeLinejoin="round" />
        </svg>
      </People>
    );
  },
  memo: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: ELOP, x: 790, h: 880, expression: 'serious'}]}>
        <NameCard name="Stephen Elop" sub="নতুন CEO · 2011" color={NBLUE} right top={280} />
        <div style={{position: 'absolute', left: 70, top: 620, width: 480, padding: 34, background: '#f6f2e8', transform: 'rotate(-3deg)', opacity: out(f, dur * 0.2, dur * 0.4)}}>
          {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{height: 13, background: '#bdb4a0', margin: '18px 0', width: `${65 + (i * 37) % 35}%`}} />)}
        </div>
      </People>
    );
  },
  burning: () => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #120808, #3a120a)'}} />
        <svg width={1080} height={700} viewBox="0 0 1080 700" style={{position: 'absolute', top: 780}}>
          {Array.from({length: 13}, (_, i) => {
            const x = i * 90;
            const h = 160 + ((i * 53) % 130) + Math.sin(f / 3 + i) * 24;
            return <path key={i} d={`M${x - 60} 520 C${x - 50} ${520 - h * 0.5} ${x + 20} ${520 - h * 0.6} ${x + 10} ${520 - h} C${x + 60} ${520 - h * 0.5} ${x + 70} ${520 - h * 0.3} ${x + 70} 520Z`} fill={i % 2 ? '#ffb32a' : '#ff7a1a'} />;
          })}
          <rect x={120} y={510} width={840} height={60} fill="#3a3e48" stroke="#1b1b1f" strokeWidth={6} />
        </svg>
        <At x={540} y={1300}>
          <Toon height={760} {...ELOP} expression="worried" gesture="open" seed="e2" />
        </At>
        <div style={{position: 'absolute', left: 70, right: 70, top: 220, padding: '30px 36px', background: 'rgba(0,0,0,0.75)', borderLeft: '10px solid #ff7a1a', fontSize: 60, fontWeight: 800, lineHeight: 1.35, opacity: out(f, 2, 12)}}>"আমরা দাঁড়িয়ে আছি একটা জ্বলন্ত প্ল্যাটফর্মে।"</div>
      </AbsoluteFill>
    );
  },
  sold: ({dur}) => {
    const f = useCurrentFrame();
    const o = out(f, dur * 0.4, dur * 0.55);
    return (
      <People dur={dur} bg="office" actors={[]} title="2013" titleColor={RED} titleAt={0}>
        <div style={{position: 'absolute', left: 390, top: 440}}>
          <BrickPhone size={620} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center'}}>
          <span style={{display: 'inline-block', padding: '14px 44px', border: `12px solid ${RED}`, color: RED, fontSize: 140, fontWeight: 900, fontFamily: 'Arial Black, Arial', transform: `rotate(-10deg) scale(${2 - o})`, opacity: o, background: 'rgba(0,0,0,0.5)'}}>SOLD</span>
        </div>
      </People>
    );
  },
  say: ({dur}) => <People dur={dur} bg="#14181e" actors={[{look: ELOP, x: 540, h: 980, expression: 'sad'}]} title="ঘোষণার দিন" titleColor="#c9ced3" titleAt={0.1} />,
  cta: () => (
    <CtaScene>
      <BrickPhone size={420} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const NokiaThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 30% 55%, rgba(26,86,176,0.4), #0b0d12 70%)'}} />
    <div style={{position: 'absolute', left: 110, top: 620, transform: 'rotate(-10deg)'}}>
      <BrickPhone size={780} snake />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={960} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={92}>iPhone-এর আগেই টাচফোন</ThumbText>
      <div>
        <ThumbText size={100} bg={RED}>
          বানিয়েছিল Nokia!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>তবু ৬ বছরে সব শেষ</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 2013
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const NokiaVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={nokiaSegments} folder="nokia/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<NokiaThumbnail />} />
);
