import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, GOLD, GREEN, RED, Title, inOut, out} from '../biz/art';
import {Bill} from '../mcdonalds/art';
import {NarratorArt} from '../common/NarratorArt';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, NameCard, People, QuoteScene, SP, YearScene, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const xeroxSegments = raw as Seg[];
export const xeroxFallback = makeFallback(xeroxSegments);

const JOBS: ToonLook = {skin: '#e8b994', hair: '#2a1e14', hairStyle: 'side', top: '#f4f2ec', jacket: '#2a2a30', bottom: '#3a4a6a', beard: true};
const GATES: ToonLook = {skin: '#efc6a6', hair: '#8a6a3a', hairStyle: 'side', top: '#f4f2ec', jacket: '#3a4a5a', tie: '#7a2a2a', bottom: '#2a2c30', glasses: true};
const XBOSS: ToonLook = {...CAST.boss, jacket: '#2a2a30'};
const SCI: ToonLook = {...CAST.engineer};
const X_RED = '#d8352a';

// পুরোনো কম্পিউটার: পর্দায় জানালা আর আইকন, পাশে মাউস
const Alto: React.FC<{size?: number; on?: number}> = ({size = 720, on = 1}) => {
  const f = useCurrentFrame();
  const mx = 70 + Math.sin(f / 12) * 40;
  const my = 90 + Math.cos(f / 15) * 30;
  return (
    <svg viewBox="0 0 400 400" width={size} height={size} style={{overflow: 'visible'}}>
      <rect x={70} y={10} width={260} height={290} rx={12} fill="#d8d0bc" stroke="#1b1b1f" strokeWidth={5} />
      <rect x={90} y={30} width={220} height={240} fill="#f4f2e8" stroke="#1b1b1f" strokeWidth={4} />
      <g opacity={on}>
        <rect x={102} y={44} width={120} height={84} fill="#fff" stroke="#1b1b1f" strokeWidth={3} />
        <rect x={102} y={44} width={120} height={14} fill="#3a3a40" />
        <rect x={170} y={110} width={126} height={92} fill="#fff" stroke="#1b1b1f" strokeWidth={3} />
        <rect x={170} y={110} width={126} height={14} fill="#3a3a40" />
        {[0, 1, 2].map((i) => <rect key={i} x={108 + i * 48} y={220} width={30} height={34} fill="#c9c2a8" stroke="#1b1b1f" strokeWidth={2} />)}
        <path d={`M${90 + mx} ${30 + my} l0 22 l6 -6 l6 12 l5 -2 l-6 -12 l9 0Z`} fill="#1b1b1f" stroke="#fff" strokeWidth={1.5} />
      </g>
      <rect x={70} y={310} width={210} height={50} rx={6} fill="#c9c2a8" stroke="#1b1b1f" strokeWidth={4} />
      <rect x={300} y={318} width={50} height={64} rx={20} fill="#e8e2cc" stroke="#1b1b1f" strokeWidth={4} />
      <path d="M325 318 C325 300 340 300 345 290" stroke="#1b1b1f" strokeWidth={3} fill="none" />
    </svg>
  );
};

const Copier: React.FC<{size?: number}> = ({size = 460}) => {
  const f = useCurrentFrame();
  const t = (f % 24) / 24;
  return (
    <svg viewBox="0 0 300 260" width={size} height={(size * 260) / 300} style={{overflow: 'visible'}}>
      <rect x={20} y={80} width={240} height={160} rx={10} fill="#d8d8d0" stroke="#1b1b1f" strokeWidth={5} />
      <rect x={30} y={50} width={220} height={36} rx={6} fill="#5a6066" stroke="#1b1b1f" strokeWidth={4} />
      <rect x={30} y={100} width={80} height={30} fill="#1a1d22" />
      <rect x={70} y={150} width={140} height={10} fill="#3a3a40" />
      <rect x={250 + t * 50} y={170} width={50} height={8} fill="#f4f2e8" stroke="#1b1b1f" strokeWidth={2} />
    </svg>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  pc: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[]}>
        <div style={{position: 'absolute', left: 170, top: 330}}>
          <Alto size={740} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 1110, textAlign: 'center', opacity: out(f, dur * 0.55, dur * 0.7)}}>
          <span style={{fontSize: 80, fontWeight: 900, color: '#fff', background: X_RED, padding: '10px 36px', borderRadius: 14}}>ফটোকপি কোম্পানি!</span>
        </div>
      </People>
    );
  },
  copier: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <YearScene year="1970" dur={dur} color={X_RED}>
        <div style={{position: 'absolute', left: 280, top: 960}}>
          <Copier size={500} />
        </div>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Bill key={i} size={130} style={{position: 'absolute', left: 80 + (i % 3) * 370, top: 1300 + Math.floor(i / 3) * 80, opacity: out(f, i * 5, i * 5 + 8)}} />
        ))}
      </YearScene>
    );
  },
  parc: ({dur}) => (
    <People dur={dur} bg="sky" actors={[]}>
      <svg width={900} height={480} viewBox="0 0 900 480" style={{position: 'absolute', left: 90, top: 640}}>
        <rect x={20} y={110} width={860} height={350} fill="#d8d0bc" stroke="#1b1b1f" strokeWidth={6} />
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={70 + i * 130} y={170} width={90} height={120} fill="#7ab0d8" stroke="#1b1b1f" strokeWidth={5} />)}
        <rect x={380} y={330} width={140} height={130} fill="#5a4030" stroke="#1b1b1f" strokeWidth={5} />
      </svg>
      <NameCard name="Xerox PARC" sub="Palo Alto, California" color={X_RED} />
    </People>
  ),
  minds: ({dur}) => <People dur={dur} bg="office" actors={[{look: SCI, x: 250, h: 780, expression: 'thinking', gesture: 'think'}, {look: {...CAST.pro, jacket: '#e9ecef'}, x: 540, h: 760, expression: 'smile', gesture: 'explain'}, {look: {...CAST.founder, top: '#c9ced3'}, x: 820, h: 760, expression: 'laugh', gesture: 'pointUp'}]} title="ভবিষ্যৎ বানাও" titleAt={0.2} />,
  alto: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="dark" actors={[]} title="1973 · Alto" titleAt={0}>
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(140,200,255,0.2), rgba(0,0,0,0) 55%)'}} />
        <div style={{position: 'absolute', left: 170, top: 420, transform: `scale(${spring({frame: f, fps: 30, config: {damping: 13}})})`}}>
          <Alto size={740} />
        </div>
      </People>
    );
  },
  screen: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[]}>
        <div style={{position: 'absolute', left: 40, top: 240, transform: 'scale(1.35)', transformOrigin: '50% 0'}}>
          <Alto size={720} />
        </div>
        <Title top={1240} size={70} color={GOLD} opacity={out(f, dur * 0.3, dur * 0.5)}>
          জানালা · আইকন · মাউস
        </Title>
      </People>
    );
  },
  bosses: ({dur}) => (
    <People dur={dur} bg="office" actors={[{look: XBOSS, x: 280, h: 860, expression: 'neutral'}, {look: CAST.ceo, x: 820, h: 840, expression: 'neutral'}]} title="ব্যবসা = কপি মেশিন" titleColor={X_RED} titleAt={0.2}>
      <div style={{position: 'absolute', left: 360, top: 620}}>
        <Copier size={380} />
      </div>
    </People>
  ),
  toy: ({dur}) => (
    <People dur={dur} bg="office" actors={[{look: XBOSS, x: 300, h: 900, expression: 'skeptical', gesture: 'shrug'}]} bubble='"এই খেলনা দিয়ে কী হবে?"' bubbleY={280}>
      <div style={{position: 'absolute', left: 560, top: 720}}>
        <Alto size={460} />
      </div>
    </People>
  ),
  left: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #14161a, #050506)'}} />
        <div style={{position: 'absolute', left: 170, top: 480, filter: `brightness(${interpolate(f, [0, dur], [1, 0.35])})`}}>
          <Alto size={740} on={interpolate(f, [0, dur * 0.8], [1, 0.1], {extrapolateRight: 'clamp'})} />
        </div>
        <Title top={260} size={80} color="#999" opacity={out(f, dur * 0.3, dur * 0.5)}>
          পড়ে রইল
        </Title>
      </AbsoluteFill>
    );
  },
  jobs: ({dur}) => {
    const f = useCurrentFrame();
    const w = inOut(f, 0, dur * 0.6);
    return (
      <People dur={dur} bg="office" actors={[{look: JOBS, x: interpolate(w, [0, 1], [-200, 540]), h: 960, expression: 'smile'}]} title="1979" titleAt={0}>
        <NameCard name="Steve Jobs" sub="বয়স ২৪" top={380} color={GREEN} />
      </People>
    );
  },
  showed: ({dur}) => (
    <People dur={dur} bg="#1c2026" actors={[{look: SCI, x: 180, h: 720, expression: 'smile', gesture: 'pointR'}, {look: JOBS, x: 880, h: 760, expression: 'surprised', gesture: 'think'}]}>
      <div style={{position: 'absolute', left: 300, top: 420}}>
        <Alto size={480} />
      </div>
    </People>
  ),
  shout: ({dur}) => <People dur={dur} bg="#1c2026" actors={[{look: JOBS, x: 540, h: 960, expression: 'shocked', gesture: 'open', talking: true}]} bubble='"তোমরা কীসের ওপর বসে আছ, জানো?"' bubbleY={280} bubbleTail="down" />,
  team: ({dur}) => <People dur={dur} bg="office" actors={[{look: JOBS, x: 240, h: 840, expression: 'serious', gesture: 'pointR', talking: true}, {look: CAST.engineer, x: 640, h: 740, expression: 'surprised'}, {look: CAST.founder, x: 880, h: 720, expression: 'smile', gesture: 'thumbsUp'}]} title="Apple-এর দল" titleColor={GREEN} titleAt={0.2} />,
  mac: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[{look: CAST.customer, x: 200, h: 680, expression: 'laugh', gesture: 'thumbsUp'}, {look: CAST.customer2, x: 880, h: 660, expression: 'smile', gesture: 'wave'}]} title="1984 · Macintosh" titleColor={GREEN} titleAt={0}>
        <div style={{position: 'absolute', left: 300, top: 400, transform: `scale(${spring({frame: f - 4, fps: 30, config: {damping: 13}})})`}}>
          <Alto size={480} />
        </div>
      </People>
    );
  },
  gates: ({dur}) => (
    <People dur={dur} bg="office" actors={[{look: GATES, x: 540, h: 960, expression: 'smile'}]} title="Windows" titleColor="#7ab0d8" titleAt={0.2}>
      <NameCard name="Bill Gates" sub="Microsoft" top={380} color="#7ab0d8" />
    </People>
  ),
  stole: ({dur}) => <People dur={dur} bg="office" actors={[{look: JOBS, x: 300, expression: 'serious', gesture: 'pointR', talking: true}, {look: GATES, x: 790, expression: 'skeptical'}]} bubble='"তুমি আমাদের জিনিস চুরি করেছ!"' bubbleY={290} />,
  reply: ({dur}) => <QuoteScene dur={dur} quote='"আমাদের দুজনেরই একজন বড়লোক প্রতিবেশী ছিল, Xerox। আমি তার বাড়িতে টিভি চুরি করতে ঢুকে দেখি, তুমি আগেই নিয়ে গেছ।"' who="Bill Gates" look={GATES} expression="smile" gesture="shrug" color="#7ab0d8" />,
  cta: () => (
    <CtaScene>
      <Alto size={420} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const XeroxThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 35% 55%, rgba(216,53,42,0.25), #0b0d12 70%)'}} />
    <div style={{position: 'absolute', left: 20, top: 680}}>
      <Alto size={680} />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={960} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={92}>কম্পিউটার বানাল</ThumbText>
      <div>
        <ThumbText size={100} bg={RED}>
          ফটোকপি কোম্পানি!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>তারপর Jobs-কে দেখিয়ে দিল</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1979
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const XeroxVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={xeroxSegments} folder="xerox/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<XeroxThumbnail />} />
);
