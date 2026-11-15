import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, GOLD, GREEN, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {NarratorArt} from '../common/NarratorArt';
import {CAST} from '../common/cast';
import {Toon, ToonLook} from '../common/Toon';
import {At, CtaScene, NameCard, People, QuoteScene, SP, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const appleMsSegments = raw as Seg[];
export const appleMsFallback = makeFallback(appleMsSegments);

const JOBS: ToonLook = {skin: '#e8b994', hair: '#3a2a1e', hairStyle: 'side', top: '#141418', bottom: '#3a4a6a', shoes: '#e8e4dc', glasses: true};
const JOBS_YOUNG: ToonLook = {skin: '#e8b994', hair: '#2a1e14', hairStyle: 'side', top: '#f4f2ec', jacket: '#2a2a30', tie: '#7a2a2a', bottom: '#2a2c30', beard: true};
const GATES: ToonLook = {skin: '#efc6a6', hair: '#8a6a3a', hairStyle: 'side', top: '#f4f2ec', jacket: '#3a4a5a', tie: '#7a2a2a', bottom: '#2a2c30', glasses: true};
const DELL: ToonLook = {skin: '#efc6a6', hair: '#3a2a1e', hairStyle: 'curly', top: '#f4f2ec', jacket: '#1f2a44', tie: '#2b5fa0', bottom: '#1c1e24'};
const MS_BLUE = '#2b6fc0';

// সরল আপেল ফল (আসল লোগো নয়)
const AppleFruit: React.FC<{size?: number; color?: string}> = ({size = 300, color = '#c8324a'}) => (
  <svg viewBox="-60 -70 120 130" width={size} height={(size * 130) / 120}>
    <path d="M0 -30 C-20 -48 -54 -36 -52 2 C-50 34 -24 58 -10 54 C-4 52 4 52 10 54 C24 58 50 34 52 2 C54 -36 20 -48 0 -30Z" fill={color} stroke="#1b1b1f" strokeWidth={4} />
    <path d="M0 -30 C0 -44 4 -54 12 -62" stroke="#4a2a14" strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M6 -44 C20 -60 38 -54 38 -44 C26 -36 14 -36 6 -44Z" fill="#5fae3a" stroke="#1b1b1f" strokeWidth={3} />
    <ellipse cx={-24} cy={-6} rx={7} ry={14} fill="#fff" opacity={0.35} />
  </svg>
);

const Brand: React.FC<{name: string; color: string; size?: number}> = ({name, color, size = 1}) => (
  <div style={{display: 'inline-block', padding: `${20 * size}px ${44 * size}px`, background: color, borderRadius: 18 * size, border: '6px solid #1b1b1f', color: '#fff', fontFamily: 'Arial Black, Arial', fontSize: 76 * size}}>{name}</div>
);

// মঞ্চ: অন্ধকার হল, পেছনে বড় পর্দা, সামনে দর্শকের মাথা
const Hall: React.FC<{screen?: React.ReactNode; shake?: number}> = ({screen, shake = 0}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: `translateX(${Math.sin(f * 2.4) * shake}px)`}}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #0e1018, #05060a)'}} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 200, height: 760, background: '#16202e', border: '12px solid #2a3140', overflow: 'hidden'}}>{screen}</div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1000, height: 60, background: '#2a2622'}} />
      {Array.from({length: 18}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: -30 + (i % 9) * 130 + (i > 8 ? 60 : 0), top: i > 8 ? 1370 : 1270, width: 110, height: 300, borderRadius: '55px 55px 0 0', background: i > 8 ? '#05060a' : '#0c0e14'}} />
      ))}
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  dying: ({dur}) => {
    const f = useCurrentFrame();
    const days = Math.round(interpolate(f, [0, dur * 0.8], [365, 90], clampOpts));
    return (
      <People dur={dur} bg="dark" actors={[]}>
        <div style={{position: 'absolute', left: 390, top: 320, filter: `grayscale(${out(f, 0, dur * 0.8)})`}}>
          <AppleFruit size={300} />
        </div>
        <Title top={720} size={230} color={RED}>
          {days}
        </Title>
        <Title top={1010} size={70} color="#ccc">
          দিন বাকি
        </Title>
      </People>
    );
  },
  fired: ({dur}) => {
    const f = useCurrentFrame();
    const w = inOut(f, dur * 0.3, dur * 0.95);
    return (
      <People dur={dur} bg="office" actors={[{look: JOBS_YOUNG, x: interpolate(w, [0, 1], [540, 1350]), h: 900, expression: 'sad'}]} title="1985" titleAt={0}>
        <div style={{position: 'absolute', left: 140, top: 480}}>
          <AppleFruit size={220} />
        </div>
      </People>
    );
  },
  sink: ({dur}) => {
    const f = useCurrentFrame();
    const y = interpolate(f, [0, dur], [420, 760]);
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a2a44 0%, #3a5a7a 45%, #0d2a44 46%, #061420 100%)'}} />
        <div style={{position: 'absolute', left: 390, top: y, transform: `rotate(${Math.sin(f / 8) * 8}deg)`}}>
          <AppleFruit size={300} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 880, bottom: 0, background: 'rgba(13,42,68,0.72)'}} />
        <Title top={200} size={90} color="#cfe0f0" opacity={out(f, dur * 0.2, dur * 0.4)}>
          ১২ বছর
        </Title>
      </AbsoluteFill>
    );
  },
  flops: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[]} title="ফ্লপ! ফ্লপ! ফ্লপ!" titleColor={RED} titleAt={0.2}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const o = out(f, i * dur * 0.13, i * dur * 0.13 + 6);
          return (
            <div key={i} style={{position: 'absolute', left: 70 + (i % 3) * 320, top: 420 + Math.floor(i / 3) * 370, width: 280, height: 300, background: '#3a3e48', border: '6px solid #1b1b1f', borderRadius: 18, opacity: o, transform: `rotate(${(i % 2 ? 6 : -6) * o}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 180, color: RED, fontWeight: 900}}>✕</div>
          );
        })}
      </People>
    );
  },
  windows: ({dur}) => {
    const f = useCurrentFrame();
    const n = Math.floor(interpolate(f, [0, dur * 0.85], [1, 24], clampOpts));
    return (
      <People dur={dur} bg="plain" actors={[]} title="Windows সবখানে" titleColor={MS_BLUE} titleAt={0}>
        <div style={{position: 'absolute', left: 60, right: 60, top: 360, display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center'}}>
          {Array.from({length: 24}, (_, i) => (
            <div key={i} style={{width: 150, height: 120, background: i < n ? MS_BLUE : '#1a1d24', border: '6px solid #2a2f3a', borderRadius: 10}} />
          ))}
        </div>
      </People>
    );
  },
  back: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: JOBS, x: 300, h: 900, expression: 'serious'}]}>
        <div style={{position: 'absolute', left: 540, top: 620, width: 440, height: 420, background: '#5a6066', border: '10px solid #1b1b1f', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <div style={{fontFamily: 'Arial Black, Arial', fontSize: 66, color: '#fff'}}>BANK</div>
          <div style={{fontFamily: 'Arial Black, Arial', fontSize: 120, color: RED, opacity: out(f, dur * 0.4, dur * 0.6)}}>$…</div>
        </div>
      </People>
    );
  },
  dell: ({dur}) => (
    <People dur={dur} bg="office" actors={[{look: CAST.pro, x: 280, h: 800, expression: 'smile', gesture: 'explain', talking: true}, {look: DELL, x: 780, h: 880, expression: 'skeptical'}]} bubble='"Apple নিয়ে কী করতেন?"' bubbleY={290}>
      <NameCard name="Michael Dell" sub="Dell-এর মালিক" top={480} right color={MS_BLUE} />
    </People>
  ),
  dellq: ({dur}) => <QuoteScene dur={dur} quote='"বন্ধ করে দিতাম। টাকাটা শেয়ারহোল্ডারদের ফিরিয়ে দিতাম।"' who="Michael Dell" look={DELL} expression="skeptical" gesture="shrug" color={RED} />,
  hall: () => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <Hall screen={<div style={{position: 'absolute', left: 280, top: 180}}><AppleFruit size={320} /></div>} />
        <Title top={1060} size={84} opacity={out(f, 4, 14)}>
          আগস্ট 1997
        </Title>
      </AbsoluteFill>
    );
  },
  stage: () => (
    <AbsoluteFill>
      <Hall screen={<div style={{position: 'absolute', left: 280, top: 180}}><AppleFruit size={320} /></div>} />
      <At x={540} y={1240}>
        <Toon height={760} {...JOBS} expression="smile" gesture="explain" talking seed="j1" />
      </At>
    </AbsoluteFill>
  ),
  screen: ({dur}) => {
    const f = useCurrentFrame();
    const o = inOut(f, dur * 0.2, dur * 0.8);
    return (
      <Hall
        screen={
          <div style={{position: 'absolute', left: 0, right: 0, top: 60, display: 'flex', justifyContent: 'center', opacity: o}}>
            <Toon height={1300} {...GATES} silhouette="#3a4a60" seed="g0" />
          </div>
        }
      />
    );
  },
  gates: () => (
    <Hall
      screen={
        <>
          <div style={{position: 'absolute', left: 0, right: 0, top: 60, display: 'flex', justifyContent: 'center'}}>
            <Toon height={1300} {...GATES} expression="smile" seed="g1" />
          </div>
          <div style={{position: 'absolute', left: 30, bottom: 30, padding: '10px 26px', background: 'rgba(0,0,0,0.7)', fontSize: 60, fontWeight: 800}}>Bill Gates</div>
        </>
      }
    />
  ),
  boo: () => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <Hall
          shake={5}
          screen={
            <div style={{position: 'absolute', left: 0, right: 0, top: 60, display: 'flex', justifyContent: 'center'}}>
              <Toon height={1300} {...GATES} expression="smile" seed="g2" />
            </div>
          }
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{position: 'absolute', left: 60 + i * 200, top: 1040 + (i % 2) * 90, fontSize: 70, fontWeight: 900, color: RED, transform: `rotate(${(i % 2 ? 8 : -8) + Math.sin(f / 3 + i) * 4}deg)`, opacity: out(f, i * 3, i * 3 + 6)}}>
            BOO!
          </div>
        ))}
      </AbsoluteFill>
    );
  },
  fight: ({dur}) => {
    const f = useCurrentFrame();
    const p = inOut(f, dur * 0.2, dur * 0.7);
    return (
      <People dur={dur} bg="office" actors={[{look: JOBS, x: interpolate(p, [0, 1], [120, 330]), h: 860, expression: p > 0.7 ? 'smile' : 'serious'}, {look: GATES, x: interpolate(p, [0, 1], [960, 750]), h: 860, expression: p > 0.7 ? 'smile' : 'serious'}]} title="ঝগড়া শেষ" titleColor={GREEN} titleAt={0.6}>
        <div style={{position: 'absolute', left: 300, top: 430, width: 480, padding: 24, background: '#f6f2e8', color: '#1a1814', fontFamily: 'Georgia, serif', fontSize: 50, fontWeight: 900, textAlign: 'center', transform: `rotate(-3deg) scale(${1 - p})`}}>LAWSUIT</div>
      </People>
    );
  },
  quote: ({dur}) => <QuoteScene dur={dur} quote='"Apple জিততে হলে Microsoft-কে হারতে হবে, এই ধারণা আমাদের ছাড়তে হবে।"' who="Steve Jobs" look={JOBS} expression="serious" color={GREEN} />,
  next: ({dur}) => {
    const f = useCurrentFrame();
    const items = ['iMac', 'iPod', 'iPhone'];
    return (
      <People dur={dur} bg="plain" actors={[]}>
        <div style={{position: 'absolute', left: 430, top: 240}}>
          <AppleFruit size={220} color={GREEN} />
        </div>
        {items.map((t, i) => (
          <div key={t} style={{position: 'absolute', left: 0, right: 0, top: 560 + i * 200, textAlign: 'center', transform: `scale(${spring({frame: f - (i * dur) / 3.3, fps: 30, config: {damping: 11}})})`}}>
            <Brand name={t} color={['#2b8fa0', '#6a6e78', '#1a1c22'][i]} />
          </div>
        ))}
      </People>
    );
  },
  cta: () => (
    <CtaScene>
      <AppleFruit size={300} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const AppleMsThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 30% 55%, rgba(200,50,74,0.28), #0b0d12 70%)'}} />
    <div style={{position: 'absolute', left: 70, top: 660}}>
      <AppleFruit size={380} />
    </div>
    <div style={{position: 'absolute', left: 60, top: 1130, transform: 'rotate(-5deg)'}}>
      <Brand name="$150M" color={GREEN} size={1} />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={960} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={96}>Apple-কে বাঁচাল</ThumbText>
      <div>
        <ThumbText size={104} bg={RED}>
          শত্রু Microsoft!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>দেউলিয়া থেকে ৯০ দিন দূরে</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1997
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const AppleMsVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={appleMsSegments} folder="applems/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<AppleMsThumbnail />} />
);

