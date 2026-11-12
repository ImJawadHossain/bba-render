import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {GOLD, RED} from '../biz/art';
import {NarratorArt} from '../common/NarratorArt';
import {BG, Bottle, FSegment, FantaStoryScene} from './Scenes';
import raw from './segments.json';

export const fantaSegments = raw as FSegment[];
export const fantaFallback = makeFallback(fantaSegments);

// থাম্বনেইল: ধূসর যুদ্ধের পটভূমিতে উজ্জ্বল Fanta, পাশে অবাক ন্যারেটর
export const FantaThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a3a40, #121216)'}} />
    <AbsoluteFill style={{background: 'radial-gradient(ellipse 500px 700px at 30% 55%, rgba(242,138,26,0.4), rgba(0,0,0,0) 70%)'}} />
    <div style={{position: 'absolute', left: 120, top: 560, transform: 'rotate(-10deg)'}}>
      <Bottle size={820} />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={980} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={104}>Fanta-র জন্ম</ThumbText>
      <div>
        <ThumbText size={96} bg={RED}>
          হিটলারের জার্মানিতে!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={80}>রেসিপি: পনিরের ঘোল</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1940
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const FantaVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={fantaSegments}
    folder="fanta/"
    bg={BG}
    render={(seg, dur) => <FantaStoryScene seg={seg} dur={dur} />}
    thumbnail={<FantaThumbnail />}
  />
);
