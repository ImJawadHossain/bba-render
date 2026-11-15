import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {GOLD, Plain, RED} from '../biz/art';
import {BG, KSegment, KYEL, KodakScene, ToasterCam, Tower} from './Scenes';
import raw from './segments.json';

export const kodakSegments = raw as KSegment[];
export const kodakFallback = makeFallback(kodakSegments);

// থাম্বনেইল: ফাটল ধরা Kodak টাওয়ার, সামনে লুকানো ক্যামেরা
export const KodakThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <Plain glow="rgba(224,36,60,0.2)" />
    <div style={{position: 'absolute', left: 300, top: 420, opacity: 0.85}}>
      <Tower width={480} crack={1} gray={0.4} />
    </div>
    <div style={{position: 'absolute', left: 200, top: 930, transform: 'rotate(-6deg)', filter: 'drop-shadow(0 0 50px rgba(140,200,255,0.7))'}}>
      <ToasterCam size={680} />
    </div>
    <Vignette strength={0.7} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.88) 86%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={100}>
        <span style={{color: KYEL, fontFamily: 'Arial Black, Arial'}}>KODAK</span> নিজেই বানাল
      </ThumbText>
      <div>
        <ThumbText size={100} bg={RED}>
          নিজের মৃত্যু
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1470, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={84}>আবিষ্কার করে লুকিয়ে রাখল</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1975
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const KodakVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={kodakSegments}
    folder="kodak/"
    bg={BG}
    render={(seg, dur) => <KodakScene seg={seg} dur={dur} />}
    thumbnail={<KodakThumbnail />}
  />
);
