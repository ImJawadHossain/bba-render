// Rhythm 0 থাম্বনেইল (১০৮০×১৯২০; মূল অংশ মাঝের ৩:৪ জায়গায়, প্রোফাইল গ্রিডে কাটা পড়বে না)
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Cam, GOLD, Gallery, Marina, PistolShape, Place, RED, Vignette} from './art';
import {fontFamily} from './common/Story';

export const ThumbText: React.FC<{children: React.ReactNode; size?: number; color?: string; bg?: string; style?: React.CSSProperties}> = ({
  children,
  size = 110,
  color = '#fff',
  bg,
  style,
}) => (
  <div
    style={{
      display: 'inline-block',
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1.15,
      color,
      background: bg,
      padding: bg ? '6px 30px 14px' : undefined,
      borderRadius: bg ? 14 : undefined,
      textShadow: bg ? 'none' : '0 6px 0 rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.9)',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Rhythm0Thumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: '#0b0908'}}>
    <Gallery tint="red" spot={0.9} />
    <Cam zoom={2.3} x={540} y={520}>
      <Place x={540} y={1390}>
        <Marina height={1100} tear={0.55} marks={1} torn={1} lookX={-0.15} />
      </Place>
    </Cam>
    {/* মাথার দিকে তাক করা পিস্তল */}
    <div style={{position: 'absolute', left: 700, top: 760, filter: `drop-shadow(0 0 40px ${RED})`}}>
      <svg viewBox="-50 -50 100 100" width={420} height={420} style={{overflow: 'visible'}}>
        <g transform="scale(-1 1)">
          <PistolShape />
        </g>
      </svg>
    </div>
    {/* পিস্তল ধরা হাত */}
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <line x1={1000} y1={975} x2={1240} y2={1400} stroke="#2a2f3a" strokeWidth={110} strokeLinecap="round" />
      <circle cx={990} cy={965} r={50} fill="#d9a785" />
    </svg>
    <Vignette color="40,0,6" strength={0.85} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.75) 10%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 66%, rgba(0,0,0,0.85) 88%)'}} />
    <div style={{position: 'absolute', top: 270, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={58} color={GOLD} style={{letterSpacing: 6}}>
        ৬ ঘণ্টা · ৭২টা জিনিস · ১টা পিস্তল
      </ThumbText>
      <div style={{marginTop: 26}}>
        <ThumbText size={118}>"আমাকে নিয়ে</ThumbText>
      </div>
      <div>
        <ThumbText size={118} bg={RED}>
          যা খুশি করো"
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1440, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={100}>তারপর মানুষ যা করল…</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1974
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);
