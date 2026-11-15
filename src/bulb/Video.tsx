import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {GOLD, Plain, RED} from '../biz/art';
import {AMBER, BG, BSegment, Bulb, BulbScene, Stamp} from './Scenes';
import raw from './segments.json';

export const bulbSegments = raw as BSegment[];
export const bulbFallback = makeFallback(bulbSegments);

// থাম্বনেইল: জ্বলন্ত বাল্বের গায়ে FINE সিল
export const BulbThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <Plain glow="rgba(255,200,97,0.3)" />
    <div style={{position: 'absolute', left: 290, top: 520}}>
      <Bulb size={800} on={1} />
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1060, textAlign: 'center'}}>
      <Stamp text="FINE" o={1} size={160} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.88) 86%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={96}>বাল্ব বেশি দিন টিকলে</ThumbText>
      <div>
        <ThumbText size={96} bg={RED}>
          জরিমানা!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1480, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={84} color={AMBER}>
        ইচ্ছা করে নষ্ট করা হতো
      </ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1924
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const BulbVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={bulbSegments}
    folder="bulb/"
    bg={BG}
    render={(seg, dur) => <BulbScene seg={seg} dur={dur} />}
    thumbnail={<BulbThumbnail />}
  />
);
