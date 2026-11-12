import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, GOLD, GREEN, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {NarratorArt} from '../common/NarratorArt';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, People, SP, YearScene, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const vwSegments = raw as Seg[];
export const vwFallback = makeFallback(vwSegments);

const VW_BLUE = '#2b5fa0';
const SCIENTIST: ToonLook = {...CAST.engineer};
const CEO: ToonLook = {...CAST.boss, jacket: '#1f2a44', tie: VW_BLUE};

// নিজস্ব নকশার ছোট গাড়ি (আসল লোগো নয়)
const Car: React.FC<{size?: number; color?: string; smoke?: number; label?: string}> = ({size = 640, color = VW_BLUE, smoke = 0, label}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="-160 0 560 180" width={size} height={(size * 180) / 560} style={{overflow: 'visible'}}>
      {Array.from({length: 7}, (_, i) => {
        const t = ((f / 18 + i / 7) % 1);
        return <circle key={i} cx={10 - t * 150} cy={125 - t * 50} r={10 + t * 34} fill="#3a3a30" opacity={smoke * (1 - t) * 0.8} />;
      })}
      <path d="M20 110 C30 86 70 78 100 74 C125 40 240 40 268 74 C330 78 375 90 385 110 L385 135 L20 135Z" fill={color} stroke="#1b1b1f" strokeWidth={5} />
      <path d="M116 74 C136 52 230 52 250 74Z" fill="#9ec4e0" stroke="#1b1b1f" strokeWidth={4} />
      {label ? <text x={200} y={118} textAnchor="middle" fontSize={19} fontWeight={900} fontFamily="Arial" fill="#fff">{label}</text> : null}
      {[90, 315].map((x) => (
        <g key={x}>
          <circle cx={x} cy={135} r={28} fill="#1a1a1e" stroke="#1b1b1f" strokeWidth={4} />
          <circle cx={x} cy={135} r={12} fill="#b8bcc2" />
        </g>
      ))}
    </svg>
  );
};

const Stamp: React.FC<{text: string; color: string; o: number; size?: number}> = ({text, color, o, size = 130}) => (
  <span style={{display: 'inline-block', padding: '14px 44px', border: `12px solid ${color}`, color, fontSize: size, fontWeight: 900, fontFamily: 'Arial Black, Arial', transform: `rotate(-8deg) scale(${2 - o})`, opacity: o, background: 'rgba(0,0,0,0.45)'}}>{text}</span>
);

const SCENES: Record<string, React.FC<SP>> = {
  gas: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="dark" actors={[]} title="পরীক্ষা চলছে…" titleAt={0.1}>
        <div style={{position: 'absolute', left: 170, top: 680}}>
          <Car size={760} />
        </div>
        <svg width={260} height={260} viewBox="-60 -60 120 120" style={{position: 'absolute', left: 410, top: 340, opacity: out(f, dur * 0.3, dur * 0.5)}}>
          <circle r={50} fill="#101014" stroke={GREEN} strokeWidth={6} />
          <circle cx={interpolate(Math.sin(f / 5), [-1, 1], [-22, 22])} r={15} fill={GREEN} />
        </svg>
      </People>
    );
  },
  clean: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="sky" actors={[]}>
        <div style={{position: 'absolute', left: 170, top: 960}}>
          <Car size={760} label="CLEAN DIESEL" />
        </div>
        <Title top={330} size={110} color="#fff" opacity={out(f, 4, 14)}>
          "Clean Diesel"
        </Title>
        <Title top={500} size={120} opacity={out(f, dur * 0.4, dur * 0.6)}>
          🌿
        </Title>
      </People>
    );
  },
  pass: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#1c2026" actors={[{look: SCIENTIST, x: 800, h: 760, expression: 'smile', gesture: 'thumbsUp'}]}>
        <div style={{position: 'absolute', left: 30, top: 960}}>
          <Car size={620} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center'}}>
          <Stamp text="PASS" color={GREEN} o={out(f, dur * 0.3, dur * 0.45)} />
        </div>
      </People>
    );
  },
  bought: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="sky" actors={[{look: CAST.customer, x: 300, expression: 'laugh', gesture: 'thumbsUp'}, {look: CAST.customer2, x: 780, expression: 'smile', gesture: 'wave'}]} title="পৃথিবীর উপকার!" titleAt={0.3}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{position: 'absolute', left: 60 + i * 330, top: 400, opacity: out(f, i * 7, i * 7 + 10)}}>
            <Car size={300} color={['#2b5fa0', '#c9ced3', '#c0303a'][i]} />
          </div>
        ))}
      </People>
    );
  },
  researchers: ({dur}) => (
    <People dur={dur} bg="#1c2026" actors={[{look: SCIENTIST, x: 270, expression: 'thinking', gesture: 'think'}, {look: {...CAST.pro, jacket: '#e9ecef'}, x: 560, h: 780, expression: 'smile'}, {look: {...CAST.founder, top: '#4a6a8a'}, x: 830, h: 760, expression: 'neutral'}]} title="2014" titleAt={0} />
  ),
  road: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #5a8ac0 0%, #b8d0e4 55%, #3a3a40 56%, #2a2a30 100%)'}} />
        {Array.from({length: 7}, (_, i) => <div key={i} style={{position: 'absolute', left: ((i * 240 - f * 16) % 1400 + 1400) % 1400 - 200, top: 1250, width: 130, height: 16, background: '#f2efe9'}} />)}
        <div style={{position: 'absolute', left: 170, top: 950}}>
          <Car size={760} />
        </div>
        <div style={{position: 'absolute', left: 620, top: 930, width: 100, height: 60, background: '#22262e', border: '4px solid #1b1b1f', borderRadius: 8}} />
        <Title top={280} size={90} color="#14202e" opacity={out(f, dur * 0.3, dur * 0.5)}>
          ল্যাবে না, রাস্তায়
        </Title>
      </AbsoluteFill>
    );
  },
  meter: ({dur, id}) => {
    const f = useCurrentFrame();
    const v = interpolate(f, [0, dur * 0.7], [0, 40], clampOpts);
    const a = interpolate(v, [0, 40], [-110, 110]);
    return (
      <People dur={dur} bg="#1c2026" actors={[{look: SCIENTIST, x: 540, y: 1620, h: 680, expression: id === 'again' ? 'shocked' : 'worried', gesture: 'shrug'}]}>
        <svg width={640} height={420} viewBox="-160 -150 320 210" style={{position: 'absolute', left: 220, top: 340}}>
          <path d="M-130 30 A130 130 0 1 1 130 30" fill="#101014" stroke="#c9ced3" strokeWidth={8} />
          <path d="M60 -115 A130 130 0 0 1 130 30" fill="none" stroke={RED} strokeWidth={16} />
          <line x1={0} y1={0} x2={0} y2={-112} stroke={RED} strokeWidth={7} transform={`rotate(${a})`} strokeLinecap="round" />
          <circle r={11} fill="#c9ced3" />
          <text y={50} textAnchor="middle" fontSize={40} fontWeight={900} fontFamily="Arial Black, Arial" fill="#fff">{Math.round(v)}×</text>
        </svg>
      </People>
    );
  },
  computer: ({dur, id}) => {
    const f = useCurrentFrame();
    const code = ['if (test) {', '  gas = LOW;', '} else {', '  gas = HIGH;', '}'];
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: '#06110a'}} />
        <div style={{position: 'absolute', left: 90, right: 90, top: 400, padding: 50, background: '#0b1a10', border: `8px solid ${GREEN}`, borderRadius: 20, fontFamily: '"Courier New", monospace', fontSize: 70, fontWeight: 700, color: GREEN, lineHeight: 1.4}}>
          {code.map((l, i) => (
            <div key={i} style={{opacity: out(f, i * dur * 0.12, i * dur * 0.12 + 5), whiteSpace: 'pre'}}>{l}</div>
          ))}
        </div>
        <Title top={1060} size={90} color={id === 'secret' ? RED : GREEN} opacity={out(f, dur * 0.4, dur * 0.6)}>
          {id === 'secret' ? 'গোপন সফটওয়্যার' : 'গাড়ির কম্পিউটারে'}
        </Title>
      </AbsoluteFill>
    );
  },
  test: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#1c2026" actors={[{look: SCIENTIST, x: 830, h: 720, expression: 'smile', gesture: 'thumbsUp'}]} title="পরীক্ষা: ভালো ছেলে 😇" titleColor={GREEN} titleAt={0.2}>
        <div style={{position: 'absolute', left: 20, top: 950}}>
          <Car size={660} smoke={0.05} />
        </div>
        <div style={{position: 'absolute', left: 60, top: 1180, width: 640, height: 40, background: '#5a6066', opacity: out(f, 2, 10)}} />
      </People>
    );
  },
  street: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #4a4a40 0%, #8a8a70 55%, #2a2a2c 56%, #18181a 100%)'}} />
        <div style={{position: 'absolute', left: 300, top: 930}}>
          <Car size={760} smoke={1} />
        </div>
        <Title top={280} size={100} color={RED} opacity={out(f, dur * 0.15, dur * 0.35)}>
          রাস্তায়: বিষ!
        </Title>
        <Vignette strength={0.6} />
      </AbsoluteFill>
    );
  },
  y2015: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <YearScene year="2015" sub="সব ফাঁস" dur={dur} color={RED}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 1050, textAlign: 'center'}}>
          <Stamp text="EXPOSED" color={RED} o={out(f, dur * 0.4, dur * 0.55)} size={100} />
        </div>
      </YearScene>
    );
  },
  ceo: ({dur}) => {
    const f = useCurrentFrame();
    const w = inOut(f, dur * 0.1, dur * 0.5);
    const g = inOut(f, dur * 0.2, dur * 0.75);
    return (
      <People dur={dur} bg="office" actors={[{look: CEO, x: interpolate(w, [0, 1], [270, -220]), h: 840, expression: 'sad'}]}>
        <svg width={620} height={420} viewBox="0 0 620 420" style={{position: 'absolute', left: 400, top: 480}}>
          <rect width={620} height={420} rx={14} fill="rgba(0,0,0,0.65)" />
          <polyline points={`20,80 ${20 + 280 * g},${80 + 60 * g} ${20 + 580 * g},${80 + 280 * g}`} stroke={RED} strokeWidth={12} fill="none" />
        </svg>
        <Title top={930} size={84} color={RED} opacity={g > 0.3 ? 1 : 0}>
          শেয়ার −⅓
        </Title>
      </People>
    );
  },
  jail: ({dur}) => (
    <People dur={dur} bg="dark" actors={[{look: {...CEO, tie: undefined, jacket: '#7a4a1e', top: '#7a4a1e', bottom: '#7a4a1e'}, x: 540, h: 900, expression: 'sad'}]}>
      <AbsoluteFill style={{zIndex: 2, pointerEvents: 'none'}}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <div key={i} style={{position: 'absolute', left: 90 + i * 150, top: 500, width: 22, height: 1100, background: '#5a6066', border: '3px solid #1b1b1f'}} />)}
      </AbsoluteFill>
    </People>
  ),
  cta: () => (
    <CtaScene glow="rgba(43,95,160,0.2)">
      <Car size={600} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const VwThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 35% 55%, rgba(224,36,60,0.22), #0b0d12 70%)'}} />
    <div style={{position: 'absolute', left: 30, top: 960}}>
      <Car size={700} smoke={1} />
    </div>
    <div style={{position: 'absolute', left: 60, top: 660}}>
      <Stamp text="×40" color={RED} o={1} size={120} />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={960} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={96}>এই গাড়ি জানত</ThumbText>
      <div>
        <ThumbText size={96} bg={RED}>
          কখন পরীক্ষা চলছে!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>১ কোটি গাড়ির ধোঁকা</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 2015
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const VwVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={vwSegments} folder="vw/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<VwThumbnail />} />
);

