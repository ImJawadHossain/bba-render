import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Cam, Person, Place, Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {ANTIOCO, GOLD, NFX, Office, PriceTag, RED} from '../biz/art';
import {BG, BizSegment, BlockbusterScene} from './Scenes';
import raw from './segments.json';

export const blockbusterSegments = raw as BizSegment[];
export const blockbusterFallback = makeFallback(blockbusterSegments);

// থাম্বনেইল: হাসি চাপা CEO, পাশে $50M ট্যাগ
export const BlockbusterThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <Office />
    <Cam zoom={2.2} x={540} y={560}>
      <Place x={540} y={1500}>
        <Person height={1100} {...ANTIOCO} mouth="smile" />
      </Place>
    </Cam>
    <div style={{position: 'absolute', left: 560, top: 1120, transform: 'rotate(-10deg)'}}>
      <PriceTag text="$50M" size={0.75} />
    </div>
    <Vignette strength={0.7} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.85) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={110}>
        <span style={{color: NFX, fontFamily: 'Arial Black, Arial'}}>NETFLIX</span> বিক্রি
      </ThumbText>
      <div>
        <ThumbText size={110} bg={RED}>
          মাত্র ৫০ মিলিয়নে!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1440, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={92}>ক্রেতা হেসে বলল "না"</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 2000
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const BlockbusterVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={blockbusterSegments}
    folder="blockbuster/"
    bg={BG}
    render={(seg, dur) => <BlockbusterScene seg={seg} dur={dur} />}
    thumbnail={<BlockbusterThumbnail />}
  />
);
