import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {GOLD, Plain, RED} from '../biz/art';
import {NarratorArt} from '../common/NarratorArt';
import {BG, DBSegment, DeBeersScene_, Diamond} from './Scenes';
import raw from './segments.json';

export const deBeersSegments = raw as DBSegment[];
export const deBeersFallback = makeFallback(deBeersSegments);

// থাম্বনেইল: বিশাল হীরা, পাশে অবাক ন্যারেটর
export const DeBeersThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <Plain glow="rgba(191,230,255,0.25)" />
    <div style={{position: 'absolute', left: 40, top: 560, transform: 'rotate(-10deg)'}}>
      <Diamond size={620} />
    </div>
    <div style={{position: 'absolute', right: -120, bottom: 220}}>
      <NarratorArt height={1000} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={110}>হীরা দুর্লভ না!</ThumbText>
      <div>
        <ThumbText size={92} bg={RED}>
          সব একটা বিজ্ঞাপনের খেলা
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={80}>বিয়ের আংটির আসল সত্য</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1938
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const DeBeersVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={deBeersSegments}
    folder="debeers/"
    bg={BG}
    render={(seg, dur) => <DeBeersScene_ seg={seg} dur={dur} />}
    thumbnail={<DeBeersThumbnail />}
  />
);
