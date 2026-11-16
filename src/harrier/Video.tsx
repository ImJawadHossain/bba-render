import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Person, Place, Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {Can, GOLD, PEPSI, RED} from '../biz/art';
import {Bill} from '../mcdonalds/art';
import {BG, HSegment, HarrierScene, Jet, LEONARD} from './Scenes';
import raw from './segments.json';

export const harrierSegments = raw as HSegment[];
export const harrierFallback = makeFallback(harrierSegments);

// থাম্বনেইল: যুদ্ধবিমান, Pepsi ক্যান, হাতে টাকা নিয়ে ছাত্র
export const HarrierThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a3a6a 0%, #5a8ac0 60%, #0b0d12 100%)'}} />
    <div style={{position: 'absolute', left: 60, top: 640, transform: 'rotate(-8deg)'}}>
      <Jet width={960} />
    </div>
    <div style={{position: 'absolute', left: 70, top: 1000, transform: 'rotate(-10deg)'}}>
      <Can {...PEPSI} size={380} />
    </div>
    <Place x={700} y={1640}>
      <Person height={780} {...LEONARD} mouth="smile" armR={45} holding={<Bill size={180} />} />
    </Place>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.88) 86%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={100}>Pepsi-র কাছে</ThumbText>
      <div>
        <ThumbText size={100} bg={RED}>
          যুদ্ধবিমান চাইল ছাত্র!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1480, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={84}>৩ কোটির জেট, ৭ লাখে</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1996
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const HarrierVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={harrierSegments}
    folder="harrier/"
    bg={BG}
    render={(seg, dur) => <HarrierScene seg={seg} dur={dur} />}
    thumbnail={<HarrierThumbnail />}
  />
);
