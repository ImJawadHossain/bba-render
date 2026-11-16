import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, GOLD, GREEN, PriceTag, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {NarratorArt} from '../common/NarratorArt';
import {ToonLook} from '../common/Toon';
import {CAST} from '../common/cast';
import {CtaScene, NameCard, People, SP, YearScene, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const yahooSegments = raw as Seg[];
export const yahooFallback = makeFallback(yahooSegments);

const Y_PURPLE = '#6b2fbf';
const YEXEC: ToonLook = {...CAST.ceo, jacket: '#3a2a5a', tie: Y_PURPLE};
const PAGE: ToonLook = {skin: '#efc6a6', hair: '#3a2a1e', hairStyle: 'short', top: '#4a6a8a', bottom: '#2a2c30'};
const BRIN: ToonLook = {skin: '#efc6a6', hair: '#2a1e14', hairStyle: 'curly', top: '#3a7a5a', bottom: '#2a2c30'};
const ZUCK: ToonLook = {skin: '#f2cfb2', hair: '#6b4a2a', hairStyle: 'curly', top: '#7a7f88', bottom: '#2a3a5a', shoes: '#e8e4dc'};
const MSEXEC: ToonLook = {...CAST.boss, jacket: '#1a3a6a'};

// নিজস্ব নকশার "লোগো-বাক্স" (আসল লোগো নয়)
const Brand: React.FC<{name: string; color: string; size?: number; dim?: number}> = ({name, color, size = 1, dim = 0}) => (
  <div style={{display: 'inline-block', padding: `${24 * size}px ${48 * size}px`, background: color, borderRadius: 20 * size, border: '6px solid #1b1b1f', color: '#fff', fontFamily: 'Arial Black, Arial', fontSize: 90 * size, filter: `grayscale(${dim})`, boxShadow: '0 20px 60px rgba(0,0,0,0.5)'}}>{name}</div>
);

const SCENES: Record<string, React.FC<SP>> = {
  four: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[]}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center'}}>
          <Brand name="Yahoo!" color={Y_PURPLE} size={1.2} />
        </div>
        <div style={{position: 'absolute', left: 120, right: 120, top: 760, display: 'flex', justifyContent: 'space-between'}}>
          {['Google', 'Google', 'Facebook', 'Microsoft'].map((n, i) => (
            <div key={i} style={{opacity: out(f, i * dur * 0.18, i * dur * 0.18 + 8), fontSize: 120, color: RED, fontWeight: 900}}>✕</div>
          ))}
        </div>
      </People>
    );
  },
  y1998: ({dur}) => (
    <YearScene year="1998" sub="ইন্টারনেট = Yahoo" dur={dur} color={Y_PURPLE}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1100, textAlign: 'center'}}>
        <Brand name="Yahoo!" color={Y_PURPLE} size={0.8} />
      </div>
    </YearScene>
  ),
  students: ({dur}) => (
    <People dur={dur} bg="office" actors={[{look: PAGE, x: 330, expression: 'smile', gesture: 'explain', talking: true}, {look: BRIN, x: 750, expression: 'smile', gesture: 'thumbsUp'}]}>
      <NameCard name="Larry Page" sub="ছাত্র" top={260} />
      <NameCard name="Sergey Brin" sub="ছাত্র" top={260} right />
    </People>
  ),
  no1: ({dur}) => <People dur={dur} bg="office" actors={[{look: YEXEC, x: 540, h: 980, expression: 'laugh', gesture: 'shrug'}]} title='"না!" 😂' titleColor={RED} titleAt={0.2} />,
  google: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill style={{background: '#000'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', transform: `scale(${spring({frame: f, fps: 30, config: {damping: 11}})})`}}>
          <span style={{fontFamily: 'Arial', fontSize: 200, fontWeight: 700}}>
            {['G', 'o', 'o', 'g', 'l', 'e'].map((c, i) => (
              <span key={i} style={{color: ['#4285f4', '#ea4335', '#fbbc05', '#4285f4', '#34a853', '#ea4335'][i]}}>{c}</span>
            ))}
          </span>
        </div>
      </AbsoluteFill>
    );
  },
  y2002: ({dur}) => {
    const f = useCurrentFrame();
    const g = inOut(f, 0, dur * 0.8);
    return (
      <YearScene year="2002" sub="Google বড় হচ্ছে" dur={dur} color={GREEN}>
        <div style={{position: 'absolute', left: 140, right: 140, bottom: 500, height: 40, background: 'rgba(255,255,255,0.08)', borderRadius: 20}}>
          <div style={{height: '100%', width: `${20 + 70 * g}%`, background: GREEN, borderRadius: 20}} />
        </div>
      </YearScene>
    );
  },
  offer2: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: YEXEC, x: 300, expression: 'smile', gesture: 'explain'}, {look: PAGE, x: 790, expression: 'thinking'}]}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center', opacity: out(f, dur * 0.2, dur * 0.35)}}>
          <PriceTag text="$3B" size={0.8} color={Y_PURPLE} />
        </div>
      </People>
    );
  },
  counter: ({dur}) => {
    const f = useCurrentFrame();
    const back = inOut(f, dur * 0.5, dur * 0.95);
    return (
      <People dur={dur} bg="office" actors={[{look: YEXEC, x: interpolate(back, [0, 1], [300, -200]), expression: 'skeptical'}, {look: PAGE, x: 790, expression: 'serious', gesture: 'pointUp'}]}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center'}}>
          <PriceTag text="$5B" size={0.8} color={GREEN} />
        </div>
      </People>
    );
  },
  y2006: ({dur}) => (
    <People dur={dur} bg="office" actors={[{look: ZUCK, x: 540, h: 960, expression: 'neutral'}]}>
      <NameCard name="Mark Zuckerberg" sub="2006 · Facebook" color="#3b5bdb" />
    </People>
  ),
  fb: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: YEXEC, x: 300, expression: 'smile', gesture: 'explain'}, {look: ZUCK, x: 790, expression: 'thinking'}]}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center', opacity: out(f, dur * 0.2, dur * 0.35)}}>
          <PriceTag text="$1B" size={0.8} color="#3b5bdb" />
        </div>
      </People>
    );
  },
  cut: ({dur}) => {
    const f = useCurrentFrame();
    const c = out(f, dur * 0.3, dur * 0.5);
    return (
      <People dur={dur} bg="office" actors={[{look: YEXEC, x: 300, expression: 'skeptical', gesture: 'shrug'}, {look: ZUCK, x: 790, expression: 'serious'}]}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center'}}>
          <PriceTag text={c > 0.5 ? '$850M' : '$1B'} size={0.8} color={c > 0.5 ? RED : '#3b5bdb'} />
        </div>
      </People>
    );
  },
  left: ({dur}) => {
    const f = useCurrentFrame();
    const w = inOut(f, dur * 0.1, dur * 0.9);
    return <People dur={dur} bg="office" actors={[{look: YEXEC, x: 300, expression: 'shocked'}, {look: ZUCK, x: interpolate(w, [0, 1], [790, 1350]), expression: 'serious'}]} title="চলে গেলেন" titleAt={0.4} />;
  },
  y2008: ({dur}) => <YearScene year="2008" sub="এবার উল্টো খেলা" dur={dur} color={RED} />,
  ms: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: MSEXEC, x: 300, expression: 'smile', gesture: 'explain'}, {look: YEXEC, x: 790, expression: 'skeptical'}]}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center', opacity: out(f, dur * 0.2, dur * 0.35)}}>
          <PriceTag text="$44.6B" size={0.8} color={GREEN} />
        </div>
      </People>
    );
  },
  y2017: ({dur}) => (
    <YearScene year="2017" sub="Yahoo বিক্রি" dur={dur} color={Y_PURPLE}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1100, textAlign: 'center'}}>
        <Brand name="Yahoo!" color={Y_PURPLE} size={0.8} dim={0.7} />
      </div>
    </YearScene>
  ),
  cheap: ({dur}) => {
    const f = useCurrentFrame();
    const v = interpolate(f, [0, dur * 0.8], [44.6, 4.48], clampOpts);
    return (
      <AbsoluteFill>
        <People dur={dur} bg="plain" actors={[]} />
        <Title top={600} size={230} color={v < 10 ? RED : GREEN}>
          ${v.toFixed(1)}B
        </Title>
        <Title top={950} size={70} opacity={out(f, dur * 0.6, dur * 0.8)}>
          মাত্র সাড়ে চারশো কোটি ডলার
        </Title>
      </AbsoluteFill>
    );
  },
  water: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[]} title="পানির দামে" titleColor={RED} titleAt={0.5}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', transform: `rotate(${-4 * out(f, 0, dur)}deg)`}}>
          <Brand name="Yahoo!" color={Y_PURPLE} size={1.1} dim={out(f, 0, dur * 0.7)} />
        </div>
        <svg width={300} height={420} viewBox="0 0 100 140" style={{position: 'absolute', left: 390, top: 780}}>
          <path d="M20 10 L80 10 L74 130 L26 130Z" fill="rgba(180,220,255,0.3)" stroke="#1b1b1f" strokeWidth={3} />
          <path d="M23 50 L77 50 L74 128 L26 128Z" fill="#4a9ad8" opacity={0.7} />
        </svg>
      </People>
    );
  },
  cta: () => (
    <CtaScene glow="rgba(107,47,191,0.18)">
      <Brand name="Yahoo!" color={Y_PURPLE} size={0.8} dim={0.6} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const YahooThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 40% 50%, rgba(107,47,191,0.35), #0b0d12 70%)'}} />
    <div style={{position: 'absolute', left: 60, top: 680, transform: 'rotate(-8deg)'}}>
      <Brand name="Yahoo!" color={Y_PURPLE} size={1.1} />
    </div>
    <div style={{position: 'absolute', left: 80, top: 940}}>
      <PriceTag text="$1M" size={0.7} color={GREEN} />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={960} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={96}>Google কেনা যেত</ThumbText>
      <div>
        <ThumbText size={100} bg={RED}>
          মাত্র ১০ লাখে!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>Yahoo ৪ বার "না" বলেছিল</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1998
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const YahooVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={yahooSegments} folder="yahoo/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<YahooThumbnail />} />
);

