import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, GOLD, RED, Title, inOut, out} from '../biz/art';
import {NarratorArt} from '../common/NarratorArt';
import {Toon, ToonLook} from '../common/Toon';
import {CAST} from '../common/cast';
import {At, CtaScene, NameCard, People, SP, YearScene, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const adidasSegments = raw as Seg[];
export const adidasFallback = makeFallback(adidasSegments);

const ADI: ToonLook = {skin: '#efc6a6', hair: '#3a2a1e', hairStyle: 'side', top: '#f4f2ec', jacket: '#1f3a6a', bottom: '#22252c'};
const RUDI: ToonLook = {skin: '#e8b994', hair: '#1a1410', hairStyle: 'short', top: '#f4f2ec', jacket: '#7a1f2a', bottom: '#22252c', mustache: true};
const A_BLUE = '#2b4fa0';
const P_RED = '#c0303a';

// জুতা (নিজস্ব নকশা)
const Shoe: React.FC<{size?: number; color?: string; stripe?: string}> = ({size = 300, color = '#f2efe9', stripe = A_BLUE}) => (
  <svg viewBox="0 0 220 110" width={size} height={size * 0.5}>
    <path d="M10 70 C10 40 40 30 70 30 L110 30 C130 50 160 56 200 62 C214 64 216 80 210 90 L10 90Z" fill={color} stroke="#1b1b1f" strokeWidth={5} />
    <rect x={6} y={88} width={208} height={16} rx={6} fill="#3a3a40" stroke="#1b1b1f" strokeWidth={4} />
    {[0, 1, 2].map((i) => <path key={i} d={`M${80 + i * 22} 40 L${100 + i * 22} 86`} stroke={stripe} strokeWidth={8} strokeLinecap="round" />)}
  </svg>
);

// নদী দিয়ে ভাগ করা শহর
const Town: React.FC<{split?: number}> = ({split = 0}) => (
  <svg width={1080} height={900} viewBox="0 0 1080 900">
    <rect width={1080} height={900} fill="#4a6a3a" />
    <path d={`M${540 - 70 * split} 0 C${500 - 70 * split} 300 ${600 + 70 * split} 600 ${540 + 70 * split} 900 L${560 + 120 * split} 900 C${620 + 120 * split} 600 ${520 - 20 * split} 300 ${560 - 20 * split} 0Z`} fill="#3a6a9a" />
    {Array.from({length: 10}, (_, i) => {
      const left = i < 5;
      const x = left ? 80 + (i % 5) * 80 : 640 + (i % 5) * 80;
      const y = 200 + (i % 3) * 200;
      return (
        <g key={i} transform={`translate(${x + (left ? -40 : 40) * split} ${y})`}>
          <rect x={0} y={30} width={60} height={50} fill="#e8e0cc" stroke="#1b1b1f" strokeWidth={3} />
          <path d="M-6 32 L30 0 L66 32Z" fill={split > 0.5 ? (left ? A_BLUE : P_RED) : '#9a4a2a'} stroke="#1b1b1f" strokeWidth={3} />
        </g>
      );
    })}
  </svg>
);

const Brothers: React.FC<{apart?: number; ex1?: 'smile' | 'serious' | 'worried' | 'sad'; ex2?: 'smile' | 'serious' | 'worried' | 'sad'; g?: boolean}> = ({apart = 0, ex1 = 'smile', ex2 = 'smile', g}) => (
  <>
    <At x={380 - apart * 180} y={1590}>
      <Toon height={860} {...ADI} expression={ex1} gesture={g ? 'thumbsUp' : 'idle'} seed="adi" lookX={apart ? -0.6 : 0.6} />
    </At>
    <At x={700 + apart * 180} y={1590}>
      <Toon height={860} {...RUDI} expression={ex2} gesture={g ? 'thumbsUp' : 'idle'} seed="rudi" lookX={apart ? 0.6 : -0.6} />
    </At>
  </>
);

const SCENES: Record<string, React.FC<SP>> = {
  brothers: ({dur}) => (
    <People dur={dur} actors={[]} bg="sepia">
      <div style={{position: 'absolute', left: 120, top: 330}}>
        <Shoe size={360} stripe={A_BLUE} />
      </div>
      <div style={{position: 'absolute', right: 120, top: 330}}>
        <Shoe size={360} stripe={P_RED} />
      </div>
      <Brothers />
      <NameCard name="Adi" sub="Adidas" color={A_BLUE} top={600} />
      <NameCard name="Rudi" sub="Puma" color={P_RED} top={600} right />
    </People>
  ),
  split: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <div style={{position: 'absolute', left: 0, top: 300}}>
          <Town split={inOut(f, dur * 0.2, dur * 0.7)} />
        </div>
        <Title top={150} size={84} color={RED} opacity={out(f, dur * 0.4, dur * 0.6)}>
          শহর দুই ভাগ
        </Title>
      </AbsoluteFill>
    );
  },
  town: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <div style={{position: 'absolute', left: 0, top: 300}}>
          <Town />
        </div>
        <Title top={150} size={84} opacity={out(f, 4, 14)}>
          Herzogenaurach
        </Title>
      </AbsoluteFill>
    );
  },
  start: ({dur}) => (
    <People dur={dur} bg="sepia" actors={[]} title="1924" titleAt={0}>
      <div style={{position: 'absolute', left: 120, top: 520, width: 840, height: 520, background: '#5a4030', border: '10px solid #2a1a10', borderRadius: 12}} />
      <div style={{position: 'absolute', left: 400, top: 860}}>
        <Shoe size={300} stripe="#8a6a4a" />
      </div>
      <Brothers />
    </People>
  ),
  team: ({dur}) => (
    <People dur={dur} bg="office" actors={[]} title="অপ্রতিরোধ্য" titleAt={0.3}>
      <Brothers g />
    </People>
  ),
  olympic: ({dur}) => {
    const f = useCurrentFrame();
    const run = (f * 14) % 1400;
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #4a6a9a 0%, #9ab8d8 45%, #b8504a 46%, #8a3a34 100%)'}} />
        {[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: 0, right: 0, top: 1000 + i * 120, height: 6, background: 'rgba(255,255,255,0.7)'}} />)}
        <At x={run - 200} y={1300}>
          <Toon height={700} {...CAST.founder} top="#f4f2ec" bottom="#f4f2ec" gesture="wave" expression="laugh" stride={Math.sin(f * 0.8) * 22} seed="owens" />
        </At>
        <Title top={240} size={110} color={GOLD} opacity={out(f, 0, 10)}>
          Berlin · 1936
        </Title>
      </AbsoluteFill>
    );
  },
  fame: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[]} title="দুনিয়াজোড়া নাম" titleAt={0.2}>
        {Array.from({length: 9}, (_, i) => (
          <div key={i} style={{position: 'absolute', left: 80 + (i % 3) * 320, top: 360 + Math.floor(i / 3) * 170, transform: `scale(${spring({frame: f - i * 3, fps: 30, config: {damping: 12}})})`}}>
            <Shoe size={260} />
          </div>
        ))}
      </People>
    );
  },
  tension: ({dur}) => (
    <People dur={dur} bg="dark" actors={[]} title="হিংসা আর সন্দেহ" titleColor={RED} titleAt={0.5}>
      <Brothers ex1="serious" ex2="serious" apart={0.3} />
    </People>
  ),
  war: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a1414 0%, #6a2a1a 55%, #120808 100%)'}} />
        {[0, 1, 2, 3].map((i) => (
          <svg key={i} width={260} height={100} viewBox="0 0 260 100" style={{position: 'absolute', left: interpolate(f, [0, dur], [-300 + i * 160, 300 + i * 260]), top: 300 + i * 110}}>
            <path d="M10 50 L200 44 C230 44 250 48 256 52 C250 56 230 60 200 60 L10 56Z M90 50 L150 50 L110 4 L90 4Z M90 54 L150 54 L110 96 L90 96Z" fill="#14080a" />
          </svg>
        ))}
        <Title top={1000} size={90} color="#f2c0a0" opacity={out(f, dur * 0.3, dur * 0.5)}>
          দ্বিতীয় বিশ্বযুদ্ধ
        </Title>
      </AbsoluteFill>
    );
  },
  bunker: ({dur}) => {
    const f = useCurrentFrame();
    const shake = Math.sin(f * 2) * (f % 30 < 6 ? 8 : 0);
    return (
      <AbsoluteFill style={{transform: `translateX(${shake}px)`}}>
        <People dur={dur} bg="#1a1612" actors={[{look: RUDI, x: 330, expression: 'worried'}, {look: CAST.customer2, x: 560, h: 740, expression: 'worried'}, {look: CAST.worker, x: 800, h: 680, expression: 'shocked'}]} title="বাংকার" titleColor="#c9bfa8" titleAt={0.1}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 300, background: '#0e0c0a'}} />
        </People>
      </AbsoluteFill>
    );
  },
  line: ({dur}) => (
    <People dur={dur} bg="#1a1612" actors={[{look: ADI, x: 300, expression: 'serious', gesture: 'pointUp', talking: true}, {look: RUDI, x: 790, expression: 'neutral'}]} bubble='"নোংরা বদমাশগুলো আবার এসেছে!"' bubbleY={300} />
  ),
  meant: ({dur}) => (
    <People dur={dur} bg="war" actors={[{look: ADI, x: 280, h: 760, expression: 'worried', gesture: 'pointUp'}]} title="বোমারু বিমান" titleAt={0.3}>
      {[0, 1, 2].map((i) => (
        <svg key={i} width={260} height={100} viewBox="0 0 260 100" style={{position: 'absolute', left: 420 + i * 120, top: 380 + i * 120}}>
          <path d="M10 50 L200 44 C230 44 250 48 256 52 C250 56 230 60 200 60 L10 56Z M90 50 L150 50 L110 4 L90 4Z M90 54 L150 54 L110 96 L90 96Z" fill="#14080a" />
        </svg>
      ))}
    </People>
  ),
  took: ({dur}) => <People dur={dur} bg="#1a1612" actors={[{look: RUDI, x: 420, h: 960, expression: 'shocked'}]} title="গালিটা আমাকে?" titleColor={RED} titleAt={0.3} />,
  y1948: ({dur}) => {
    const f = useCurrentFrame();
    const a = inOut(f, dur * 0.2, dur * 0.8);
    return (
      <YearScene year="1948" dur={dur} color={RED}>
        <Brothers ex1="serious" ex2="serious" apart={a} />
      </YearScene>
    );
  },
  river: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <div style={{position: 'absolute', left: 0, top: 300}}>
          <Town split={1} />
        </div>
        <NameCard name="Adidas" sub="Adi" color={A_BLUE} top={180} />
        <NameCard name="Puma" sub="Rudi" color={P_RED} top={180} right />
        <Title top={1240} size={70} opacity={out(f, dur * 0.4, dur * 0.6)}>
          নদীর দুই পাড়ে
        </Title>
      </AbsoluteFill>
    );
  },
  marry: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[{look: {...CAST.customer, jacket: A_BLUE}, x: 300, expression: 'sad'}, {look: {...CAST.customer2, top: P_RED}, x: 780, expression: 'sad'}]}>
        <svg width={260} height={200} viewBox="-70 -50 140 100" style={{position: 'absolute', left: 410, top: 420}}>
          <circle cx={-24} r={30} fill="none" stroke={GOLD} strokeWidth={9} />
          <circle cx={24} r={30} fill="none" stroke={GOLD} strokeWidth={9} />
        </svg>
        <Title top={380} size={240} color={RED} opacity={out(f, dur * 0.3, dur * 0.45)}>
          ✕
        </Title>
      </People>
    );
  },
  shoes: ({dur}) => (
    <People dur={dur} bg="sky" actors={[{look: {...CAST.customer, jacket: A_BLUE}, x: 320, expression: 'skeptical', lookX: 0.4}, {look: {...CAST.worker, top: P_RED}, x: 760, expression: 'skeptical', lookX: -0.4}]} title="আগে জুতা দেখো 👀" titleAt={0.2}>
      <div style={{position: 'absolute', left: 180, top: 1440}}>
        <Shoe size={200} stripe={A_BLUE} />
      </div>
      <div style={{position: 'absolute', left: 660, top: 1440}}>
        <Shoe size={200} stripe={P_RED} />
      </div>
    </People>
  ),
  never: ({dur}) => (
    <People dur={dur} bg="dark" actors={[]} title="আর কোনোদিন কথা হয়নি" titleColor="#bbb" titleAt={0.3}>
      <At x={200} y={1590}>
        <Toon height={800} {...ADI} hair="#c9c2b4" expression="sad" seed="adi2" lookX={-0.8} />
      </At>
      <At x={880} y={1590}>
        <Toon height={800} {...RUDI} hair="#c9c2b4" expression="sad" seed="rudi2" lookX={0.8} />
      </At>
    </People>
  ),
  graves: ({dur}) => {
    const f = useCurrentFrame();
    const stone = (x: number, label: string, c: string) => (
      <div style={{position: 'absolute', left: x, top: 900, width: 220, height: 300, background: '#8a8a90', border: '8px solid #1b1b1f', borderRadius: '110px 110px 10px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, fontWeight: 800, color: c}}>{label}</div>
    );
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a3040 0%, #4a5060 55%, #2a3a24 56%, #142010 100%)'}} />
        {stone(60, 'Adi', A_BLUE)}
        {stone(800, 'Rudi', P_RED)}
        <div style={{position: 'absolute', left: 300, right: 300, top: 1040, height: 8, background: GOLD, opacity: out(f, dur * 0.3, dur * 0.5)}} />
        <Title top={1000} size={56} color={GOLD} opacity={out(f, dur * 0.3, dur * 0.5)}>
          যতটা দূরে সম্ভব
        </Title>
        <Vignette strength={0.6} />
      </AbsoluteFill>
    );
  },
  cta: () => (
    <CtaScene>
      <Shoe size={500} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const AdidasThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: `linear-gradient(90deg, ${A_BLUE}55 0%, #0b0d12 50%, ${P_RED}55 100%)`}} />
    <At x={260} y={1500}>
      <Toon height={880} {...ADI} expression="serious" seed="tadi" lookX={0.8} />
    </At>
    <At x={820} y={1500}>
      <Toon height={880} {...RUDI} expression="serious" seed="trudi" lookX={-0.8} />
    </At>
    <div style={{position: 'absolute', left: 480, top: 640, width: 120, height: 900, background: '#3a6a9a', opacity: 0.6}} />
    <div style={{position: 'absolute', left: 400, top: 1100, transform: 'scale(0.9)'}}>
      <NarratorArt height={520} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={100}>Adidas vs Puma</ThumbText>
      <div>
        <ThumbText size={96} bg={RED}>
          আপন দুই ভাইয়ের যুদ্ধ
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>একটা বাক্যে ভাগ হলো শহর</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1948
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const AdidasVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={adidasSegments} folder="adidas/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<AdidasThumbnail />} />
);
