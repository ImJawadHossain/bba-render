import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Cam, Person, Place, Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {GOLD, RED} from '../biz/art';
import {BurgerStand, KROC, MYEL} from './art';
import {BG, McDonaldsScene, McSegment} from './Scenes';
import raw from './segments.json';

export const mcdonaldsSegments = raw as McSegment[];
export const mcdonaldsFallback = makeFallback(mcdonaldsSegments);

// থাম্বনেইল: হাসিমুখ Kroc, পেছনে বন্ধ হয়ে যাওয়া ভাইদের দোকান
export const McDonaldsThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a1424 0%, #3a2030 55%, #0e0b09 100%)'}} />
    <div style={{position: 'absolute', left: 60, top: 640, opacity: 0.85}}>
      <BurgerStand width={560} sign="THE BIG M" closed={1} />
    </div>
    <Cam zoom={1.9} x={720} y={600}>
      <Place x={720} y={1600}>
        <Person height={1100} {...KROC} mouth="smile" />
      </Place>
    </Cam>
    <Vignette strength={0.7} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 66%, rgba(0,0,0,0.88) 86%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={104}>
        <span style={{color: MYEL, fontFamily: 'Arial Black, Arial'}}>McDONALD'S</span>
      </ThumbText>
      <div>
        <ThumbText size={104} bg={RED}>
          কেড়ে নিল এক সেলসম্যান
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1450, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={86}>নিজের নামটাও হারাল দুই ভাই</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1961
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const McDonaldsVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={mcdonaldsSegments}
    folder="mcdonalds/"
    bg={BG}
    render={(seg, dur) => <McDonaldsScene seg={seg} dur={dur} />}
    thumbnail={<McDonaldsThumbnail />}
  />
);
