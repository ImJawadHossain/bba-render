import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {GOLD, Plain, RED} from '../biz/art';
import {NarratorArt} from '../common/NarratorArt';
import {BG, CSegment, CocaScene, ColaGlass} from './Scenes';
import raw from './segments.json';

export const cocaSegments = raw as CSegment[];
export const cocaFallback = makeFallback(cocaSegments);

// থাম্বনেইল: কোকা পাতাসহ কোলার গ্লাস, পাশে চমকে যাওয়া ন্যারেটর
export const CocaThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <Plain glow="rgba(200,16,46,0.3)" />
    <div style={{position: 'absolute', left: 90, top: 620, transform: 'rotate(-8deg)'}}>
      <ColaGlass size={700} leaf />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={980} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={100}>Coca-Cola-তে ছিল</ThumbText>
      <div>
        <ThumbText size={110} bg={RED}>
          কোকেন!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={80}>বিক্রি হতো ওষুধ হিসেবে</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1886
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const CocaVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={cocaSegments}
    folder="cocacola/"
    bg={BG}
    render={(seg, dur) => <CocaScene seg={seg} dur={dur} />}
    thumbnail={<CocaThumbnail />}
  />
);
