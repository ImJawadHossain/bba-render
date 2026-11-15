import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {Can, GOLD, NEW_COKE, OLD_COKE, Plain, RED} from '../biz/art';
import {BG, CokeScene, CokeSegment} from './Scenes';
import raw from './segments.json';

export const newCokeSegments = raw as CokeSegment[];
export const newCokeFallback = makeFallback(newCokeSegments);

// থাম্বনেইল: জয়ের মুকুট পরা New Coke, কিন্তু লাল দাগে কাটা
export const NewCokeThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <Plain glow="rgba(200,16,46,0.3)" />
    <div style={{position: 'absolute', left: 120, top: 640, transform: 'rotate(-8deg)'}}>
      <Can {...OLD_COKE} size={560} />
    </div>
    <div style={{position: 'absolute', left: 560, top: 600, transform: 'rotate(6deg)'}}>
      <Can {...NEW_COKE} size={600} />
      <div style={{position: 'absolute', left: -40, right: -40, top: '45%', height: 34, background: RED, transform: 'rotate(-30deg)', boxShadow: '0 0 30px rgba(224,36,60,0.8)'}} />
    </div>
    <div style={{position: 'absolute', left: 620, top: 520, fontSize: 120}}>👑</div>
    <Vignette strength={0.7} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.85) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={104}>টেস্টে জিতেও</ThumbText>
      <div>
        <ThumbText size={104} bg={RED}>
          ৭৯ দিনে শেষ!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1440, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={88}>Coke-এর সবচেয়ে বড় ভুল</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1985
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const NewCokeVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={newCokeSegments}
    folder="newcoke/"
    bg={BG}
    render={(seg, dur) => <CokeScene seg={seg} dur={dur} />}
    thumbnail={<NewCokeThumbnail />}
  />
);
