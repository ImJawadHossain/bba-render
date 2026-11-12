import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, GOLD, GREEN, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {Bill} from '../mcdonalds/art';
import {NarratorArt} from '../common/NarratorArt';
import {ToonLook} from '../common/Toon';
import {CAST} from '../common/cast';
import {CtaScene, NameCard, People, QuoteScene, SP, YearScene, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const nikeSegments = raw as Seg[];
export const nikeFallback = makeFallback(nikeSegments);

const KNIGHT: ToonLook = {skin: '#efc6a6', hair: '#c98a4a', hairStyle: 'side', top: '#f4f2ec', jacket: '#3a4a5a', bottom: '#2a2c30'};
const KNIGHT_OLD: ToonLook = {...KNIGHT, hair: '#c9c2b4', glasses: true};
const CAROLYN: ToonLook = {skin: '#f2cfb2', hair: '#6b4a2a', hairStyle: 'long', top: '#d9822b', bottom: '#2a3a5a'};
const CAROLYN_OLD: ToonLook = {...CAROLYN, hair: '#9a8a7a', hairStyle: 'bob', top: '#7a1f3a'};

// বাঁকা দাগ (swoosh-এর মতো সরল রূপ)
const Swoosh: React.FC<{size?: number; color?: string; draw?: number}> = ({size = 500, color = '#f2efe9', draw = 1}) => (
  <svg viewBox="0 0 300 120" width={size} height={size * 0.4} style={{overflow: 'visible'}}>
    <path d="M10 70 C30 120 90 110 290 20 C120 80 60 96 40 76 C30 66 26 56 30 44 C14 52 6 60 10 70Z" fill={color} stroke="#1b1b1f" strokeWidth={4} strokeDasharray={900} strokeDashoffset={900 * (1 - draw)} fillOpacity={draw} />
  </svg>
);

const Shoe: React.FC<{size?: number; mark?: boolean}> = ({size = 360, mark = true}) => (
  <div style={{position: 'relative', width: size, height: size * 0.5}}>
    <svg viewBox="0 0 220 110" width={size} height={size * 0.5}>
      <path d="M10 70 C10 40 40 30 70 30 L110 30 C130 50 160 56 200 62 C214 64 216 80 210 90 L10 90Z" fill="#f2efe9" stroke="#1b1b1f" strokeWidth={5} />
      <rect x={6} y={88} width={208} height={16} rx={6} fill="#e0502a" stroke="#1b1b1f" strokeWidth={4} />
    </svg>
    {mark ? (
      <div style={{position: 'absolute', left: size * 0.28, top: size * 0.17}}>
        <Swoosh size={size * 0.5} color="#1b1b1f" />
      </div>
    ) : null}
  </div>
);

const Trunk: React.FC = () => (
  <svg width={760} height={380} viewBox="0 0 400 200">
    <path d="M20 140 C30 100 90 90 130 86 C160 56 250 56 280 86 C340 90 382 100 388 140 L388 160 L20 160Z" fill="#2b5fa0" stroke="#1b1b1f" strokeWidth={5} />
    <path d="M300 86 L388 120 L360 40Z" fill="#2b5fa0" stroke="#1b1b1f" strokeWidth={4} />
    {[95, 320].map((x) => <circle key={x} cx={x} cy={160} r={28} fill="#1a1a1e" stroke="#1b1b1f" strokeWidth={4} />)}
    {[0, 1, 2].map((i) => <rect key={i} x={300 + i * 26} y={92 - i * 6} width={24} height={30} fill="#d9822b" stroke="#1b1b1f" strokeWidth={3} />)}
  </svg>
);

const SCENES: Record<string, React.FC<SP>> = {
  logo: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[]} title="$35" titleColor={GREEN} titleAt={0.45}>
        <div style={{position: 'absolute', left: 240, top: 620}}>
          <Swoosh size={600} draw={inOut(f, 0, dur * 0.45)} />
        </div>
      </People>
    );
  },
  portland: ({dur}) => <YearScene year="1971" sub="Portland, USA" dur={dur} bg="night" />,
  trunk: ({dur}) => (
    <People dur={dur} bg="sky" actors={[{look: KNIGHT, x: 830, h: 820, expression: 'smile', gesture: 'pointL'}]}>
      <div style={{position: 'absolute', left: 20, top: 1080}}>
        <Trunk />
      </div>
      <NameCard name="Phil Knight" sub="জুতা বিক্রেতা" />
    </People>
  ),
  need: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: KNIGHT, x: 300, expression: 'thinking', gesture: 'think'}]}>
        <div style={{position: 'absolute', left: 540, top: 600, width: 420, height: 300, border: '8px dashed #f2efe9', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 160, fontWeight: 900, color: '#f2efe9', opacity: out(f, dur * 0.2, dur * 0.4)}}>?</div>
      </People>
    );
  },
  nomoney: ({dur}) => <People dur={dur} bg="office" actors={[{look: KNIGHT, x: 400, h: 920, expression: 'worried', gesture: 'shrug'}]} title="$0" titleColor={RED} titleAt={0.2} />,
  teach: ({dur}) => (
    <People dur={dur} bg="#2a3a2a" actors={[{look: KNIGHT, x: 260, h: 820, expression: 'smile', gesture: 'pointR', talking: true}, {look: CAST.customer, x: 640, h: 520, expression: 'neutral'}, {look: CAROLYN, x: 860, h: 520, expression: 'smile'}]}>
      <div style={{position: 'absolute', left: 120, top: 300, width: 840, height: 420, background: '#1f3a2a', border: '18px solid #6a4a2a'}} />
      <NameCard name="Portland State University" sub="পার্ট-টাইম শিক্ষক" top={420} />
    </People>
  ),
  carolyn: ({dur}) => (
    <People dur={dur} bg="#2a3a2a" actors={[{look: CAROLYN, x: 540, h: 980, expression: 'smile', gesture: 'wave'}]}>
      <NameCard name="Carolyn Davidson" sub="গ্রাফিক ডিজাইনের ছাত্রী" />
    </People>
  ),
  sketch: ({dur}) => {
    const f = useCurrentFrame();
    const n = Math.floor(interpolate(f, [0, dur * 0.9], [1, 9], clampOpts));
    return (
      <People dur={dur} bg="sepia" actors={[{look: CAROLYN, x: 820, h: 760, expression: 'thinking', gesture: 'think'}]}>
        {Array.from({length: 9}, (_, i) => (
          <div key={i} style={{position: 'absolute', left: 70 + (i % 3) * 210, top: 300 + Math.floor(i / 3) * 230, width: 190, height: 200, background: '#f6efe0', transform: `rotate(${(i % 3) * 5 - 5}deg)`, opacity: i < n ? 1 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.4)'}}>
            <svg width={150} height={100} viewBox="0 0 150 100">
              <path d={['M10 50 L140 50', 'M20 80 L75 20 L130 80', 'M75 50 m-35 0 a35 35 0 1 0 70 0 a35 35 0 1 0 -70 0', 'M10 70 C50 20 100 20 140 70', 'M20 20 L130 80 M20 80 L130 20', 'M10 60 Q75 0 140 60', 'M30 80 L75 20 L120 80Z', 'M10 50 C40 90 110 90 140 20', 'M20 30 L130 30 L75 90Z'][i]} stroke="#3a3a40" strokeWidth={6} fill="none" />
            </svg>
          </div>
        ))}
      </People>
    );
  },
  swoosh: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[{look: CAROLYN, x: 260, h: 760, expression: 'smile', gesture: 'pointR'}]} title="swoosh" titleAt={0.5}>
        <div style={{position: 'absolute', left: 430, top: 640, width: 560, height: 360, background: '#f6efe0', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Swoosh size={440} color="#1b1b1f" draw={inOut(f, 0, dur * 0.6)} />
        </div>
      </People>
    );
  },
  stare: ({dur}) => <People dur={dur} bg="office" actors={[{look: KNIGHT, x: 330, h: 900, expression: 'skeptical'}, {look: CAROLYN, x: 790, h: 820, expression: 'worried'}]} title="…" titleAt={0.2} />,
  quote: ({dur}) => <QuoteScene dur={dur} quote='"খুব একটা পছন্দ হয়নি। তবে হয়তো ধীরে ধীরে ভালো লাগবে।"' who="Phil Knight" look={KNIGHT} expression="skeptical" gesture="shrug" />,
  final: ({dur}) => {
    const f = useCurrentFrame();
    const st = out(f, dur * 0.4, dur * 0.55);
    return (
      <People dur={dur} bg="office" actors={[{look: KNIGHT, x: 300, h: 820, expression: 'serious', gesture: 'thumbsUp'}]}>
        <div style={{position: 'absolute', left: 560, top: 640}}>
          <Shoe size={420} />
        </div>
        <div style={{position: 'absolute', left: 520, top: 520, padding: '10px 30px', border: `10px solid ${GREEN}`, color: GREEN, fontSize: 80, fontWeight: 900, fontFamily: 'Arial Black, Arial', transform: `rotate(-10deg) scale(${2 - st})`, opacity: st}}>FINAL</div>
      </People>
    );
  },
  rise: ({dur}) => {
    const f = useCurrentFrame();
    const g = inOut(f, 0, dur);
    return (
      <AbsoluteFill>
        <People dur={dur} bg="sky" actors={[]} />
        <div style={{position: 'absolute', left: 340, top: interpolate(g, [0, 1], [1300, 300]), transform: 'rotate(-20deg)'}}>
          <Shoe size={420} />
        </div>
        <Title top={1400} size={90} color={GOLD} opacity={out(f, dur * 0.3, dur * 0.5)}>
          আকাশে!
        </Title>
      </AbsoluteFill>
    );
  },
  known: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[0, 1, 2, 3].map((i) => ({look: [CAST.customer, CAST.customer2, CAST.pro, CAST.founder][i], x: 160 + i * 250, h: 560, expression: 'smile' as const, lookX: 0}))}>
        <div style={{position: 'absolute', left: 290, top: 420, transform: `scale(${spring({frame: f, fps: 30, config: {damping: 12}})})`}}>
          <Swoosh size={500} />
        </div>
      </People>
    );
  },
  later: ({dur}) => <People dur={dur} bg="office" actors={[{look: KNIGHT_OLD, x: 330, expression: 'smile', gesture: 'wave'}, {look: CAROLYN_OLD, x: 780, expression: 'surprised'}]} title="১২ বছর পর" titleAt={0.1} />,
  ring: ({dur}) => {
    const f = useCurrentFrame();
    const p = spring({frame: f - dur * 0.2, fps: 30, config: {damping: 12}});
    return (
      <People dur={dur} bg="dark" actors={[{look: CAROLYN_OLD, x: 540, h: 700, expression: 'laugh'}]}>
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 30%, rgba(227,191,122,0.25), rgba(0,0,0,0) 50%)'}} />
        <svg width={360} height={360} viewBox="-90 -90 180 180" style={{position: 'absolute', left: 360, top: 260, transform: `scale(${p})`}}>
          <circle r={70} fill="none" stroke={GOLD} strokeWidth={18} />
          <g transform="translate(-40 -80) scale(0.28)">
            <path d="M10 70 C30 120 90 110 290 20 C120 80 60 96 40 76 C30 66 26 56 30 44 C14 52 6 60 10 70Z" fill={GOLD} stroke="#1b1b1f" strokeWidth={8} />
          </g>
          <path d="M0 -96 L10 -82 L0 -70 L-10 -82Z" fill="#d8f1ff" stroke="#6aa8d0" strokeWidth={3} />
        </svg>
      </People>
    );
  },
  shares: ({dur}) => {
    const f = useCurrentFrame();
    const g = inOut(f, dur * 0.2, dur);
    return (
      <People dur={dur} bg="plain" actors={[]} title="৫০০ শেয়ার" titleColor={GREEN} titleAt={0}>
        <svg width={880} height={600} viewBox="0 0 880 600" style={{position: 'absolute', left: 100, top: 500}}>
          <path d="M20 580 L860 580 M20 580 L20 20" stroke="#555" strokeWidth={5} />
          <polyline points={`20,560 ${20 + 200 * g},${540 - 60 * g} ${20 + 420 * g},${500 - 180 * g} ${20 + 640 * g},${460 - 300 * g} ${20 + 840 * g},${420 - 380 * g}`} stroke={GREEN} strokeWidth={14} fill="none" strokeLinejoin="round" />
        </svg>
        {[0, 1, 2].map((i) => (
          <Bill key={i} size={160} style={{position: 'absolute', left: 140 + i * 280, top: 1200, opacity: out(f, dur * (0.4 + i * 0.1), dur * (0.5 + i * 0.1))}} />
        ))}
      </People>
    );
  },
  cta: () => (
    <CtaScene>
      <Shoe size={500} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const NikeThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 40% 50%, rgba(95,208,138,0.25), #0b0d12 70%)'}} />
    <div style={{position: 'absolute', left: 40, top: 700, transform: 'rotate(-10deg)'}}>
      <Swoosh size={760} />
    </div>
    <div style={{position: 'absolute', left: 120, top: 1040}}>
      <Bill size={260} />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={960} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={96}>দুনিয়ার দামি লোগো</ThumbText>
      <div>
        <ThumbText size={110} bg={RED}>
          মাত্র $35!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>মালিক পছন্দই করেননি</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1971
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const NikeVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={nikeSegments} folder="nike/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<NikeThumbnail />} />
);
