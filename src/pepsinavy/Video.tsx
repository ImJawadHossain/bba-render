import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {Can, GOLD, PEPSI, RED} from '../biz/art';
import {BG, PBLUE, PNSegment, PepsiNavyScene, Sub, Warship} from './Scenes';
import raw from './segments.json';

export const pepsiNavySegments = raw as PNSegment[];
export const pepsiNavyFallback = makeFallback(pepsiNavySegments);

// থাম্বনেইল: সমুদ্রে যুদ্ধজাহাজ, সামনে বিশাল Pepsi ক্যান
export const PepsiNavyThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a0e18 0%, #1a2a44 50%, #0d2a44 51%, #061420 100%)'}} />
    <div style={{position: 'absolute', left: 40, top: 800}}>
      <Warship width={700} color="#3a4a6a" kind="PEPSI NAVY" />
    </div>
    <div style={{position: 'absolute', left: 520, top: 1100}}>
      <Sub width={500} />
    </div>
    <div style={{position: 'absolute', left: 620, top: 560, transform: 'rotate(12deg)', filter: `drop-shadow(0 0 50px ${PBLUE})`}}>
      <Can {...PEPSI} size={560} />
    </div>
    <Vignette strength={0.7} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.88) 86%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={104}>Pepsi-র ছিল</ThumbText>
      <div>
        <ThumbText size={104} bg={RED}>
          ১৭টা সাবমেরিন!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1470, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={84}>কোলার দাম যুদ্ধজাহাজে</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1989
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const PepsiNavyVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={pepsiNavySegments}
    folder="pepsinavy/"
    bg={BG}
    render={(seg, dur) => <PepsiNavyScene seg={seg} dur={dur} />}
    thumbnail={<PepsiNavyThumbnail />}
  />
);
