import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Cam, Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {Bubble} from '../milgram/art';
import {ClassRoom, GOLD, LineCard, ME, RED, Row, headY, seatX} from './art';
import {AschSceneView, AschSegment, BG} from './Scenes';
import raw from './segments.json';

export const aschSegments = raw as AschSegment[];
export const aschFallback = makeFallback(aschSegments);

// থাম্বনেইল: কার্ডে উত্তর C, কিন্তু সবার বেলুনে A, মাঝখানে ঘামতে থাকা ছেলেটা
export const AschThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <ClassRoom dim={0.2} />
    <Cam zoom={1.6} x={seatX(ME) - 250} y={headY - 150}>
      <Row spot={ME} looks={(i) => (i === ME ? {brow: 'worried', mouth: 'tense', sweat: 1} : {})} />
      {[3, 4, 5, 6].map((i) => (
        <div key={i} style={{position: 'absolute', left: seatX(i), top: headY - 150, transform: 'translateX(-50%)'}}>
          <Bubble size={58} text={RED}>
            A
          </Bubble>
        </div>
      ))}
    </Cam>
    <div style={{position: 'absolute', left: 280, top: 545, transform: 'rotate(-2deg)', boxShadow: '0 30px 80px rgba(0,0,0,0.7)'}}>
      <LineCard width={520} mark="C" />
    </div>
    <Vignette strength={0.75} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.85) 88%)'}} />
    <div style={{position: 'absolute', top: 260, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={120}>
        উত্তর <span style={{color: GOLD}}>C</span>
      </ThumbText>
      <div>
        <ThumbText size={120} bg={RED}>
          সবাই বলল A
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1450, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={100}>তুমি কী বলতে?</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য এক্সপেরিমেন্ট · 1951
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const AschVideo: React.FC<StoryProps> = (props) => (
  <Story
    {...props}
    segments={aschSegments}
    folder="asch/"
    bg={BG}
    render={(seg, dur) => <AschSceneView seg={seg} dur={dur} />}
    thumbnail={<AschThumbnail />}
  />
);
