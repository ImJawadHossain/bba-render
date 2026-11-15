import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Person, Place, Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {EXPERIMENTER, GOLD, LabRoom, RED, Switchboard} from './art';
import {BG, MilgramScene, MilgramSegment} from './Scenes';
import raw from './segments.json';

export const milgramSegments = raw as MilgramSegment[];
export const milgramFallback = makeFallback(milgramSegments);

// থাম্বনেইল: XXX সুইচের দিকে এগোনো আঙুল, পেছনে গবেষক
export const MilgramThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <LabRoom red={0.55} light={0.8} />
    <Place x={860} y={1250}>
      <Person height={1000} {...EXPERIMENTER} silhouette="#070a09" />
    </Place>
    <div style={{position: 'absolute', left: -1680, top: 520, transform: 'scale(2.6)', transformOrigin: '0 0'}}>
      <Switchboard lit={29} xxxGlow={1} />
    </div>
    {/* আঙুল */}
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <line x1={1060} y1={1560} x2={800} y2={1130} stroke="#4a4f5a" strokeWidth={90} strokeLinecap="round" />
      <circle cx={792} cy={1112} r={44} fill="#dcaa88" />
    </svg>
    <Vignette color="40,0,6" strength={0.8} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0) 32%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.85) 88%)'}} />
    <div style={{position: 'absolute', top: 270, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={60} color={GOLD} style={{letterSpacing: 4}}>
        ৪০ জন সাধারণ মানুষ
      </ThumbText>
      <div style={{marginTop: 20}}>
        <ThumbText size={124}>২৬ জন চাপল</ThumbText>
      </div>
      <div>
        <ThumbText size={124} bg={RED}>
          ৪৫০ ভোল্ট
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1450, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={96}>শুধু একটা বাক্যে…</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য এক্সপেরিমেন্ট · 1961
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const MilgramVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={milgramSegments}
    folder="milgram/"
    bg={BG}
    render={(seg, dur) => <MilgramScene seg={seg} dur={dur} />}
    thumbnail={<MilgramThumbnail />}
  />
);
