// VocabBangla প্রোমো ২: "অ্যাপ জানে তুমি কী ভুলবে" (৫ স্ক্রিপ্টের ১ নম্বর)
// স্ক্রিপ্ট: D:\ClaudeVideo\Promotional Video\VocabBangla\VocabBangla Promo - 5 Scripts.md
// স্ক্রিনশট প্রথম প্রোমোর public/vocab/sNN.jpg; ভয়েস public/vocab2/
import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {fontFamily} from '../common/Story';
import {AppIcon, BLUE, Badge, Fade, Headline, NAVY, RED, Shot, Subtitle, WHITE, clamp} from '../vocab/Video';
import raw from './segments.json';
import timing from '../../public/vocab2/timing.json';

const FPS = 30;
const TAIL = 1.6; // Play Store স্ক্রিনশট ভয়েসের পরে একটু থাকে
export const VOCAB2_TIMING = timing;
export const VOCAB2_DURATION = Math.ceil((timing.total + TAIL) * FPS);

type Sc = React.FC<{dur: number}>;
const shot = (n: number, title: string, o: {zoom?: [number, number]; origin?: string; color?: string; dark?: number} = {}): Sc => ({dur}) => (
  <>
    <Shot n={n} dur={dur} zoom={o.zoom} origin={o.origin} />
    {o.dark ? <AbsoluteFill style={{background: `rgba(8,14,32,${o.dark})`}} /> : null}
    <Headline text={title} color={o.color} />
  </>
);

// ৯৩% থেকে ৭৮%-এ নামা মিটার
const Meter: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 20, fps: FPS, config: {damping: 12}});
  const v = interpolate(f, [dur * 0.62, dur * 0.88], [93, 78], clamp);
  const bn = (n: number) => String(Math.round(n)).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
  const low = v < 90;
  return (
    <div style={{position: 'absolute', left: 90, right: 90, top: 1000, transform: `scale(${s})`, opacity: s}}>
      <div style={{background: 'rgba(255,255,255,0.97)', borderRadius: 34, padding: '30px 40px', boxShadow: '0 24px 60px rgba(0,0,0,0.45)'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: NAVY, fontWeight: 800}}>
          <span style={{fontSize: 50}}>{low ? 'এক সপ্তাহ পর' : 'আজ মনে আছে'}</span>
          <span style={{fontSize: 110, color: low ? RED : '#e08a1e'}}>{bn(v)}%</span>
        </div>
        <div style={{marginTop: 16, height: 34, borderRadius: 17, background: '#e6e9f2', overflow: 'hidden'}}>
          <div style={{width: `${v}%`, height: '100%', borderRadius: 17, background: low ? RED : '#f0a030'}} />
        </div>
      </div>
    </div>
  );
};

// ১৫০০ শব্দ = দরকারি ইংরেজির ৮০%: রিং ভরে ওঠে
const Eighty: Sc = ({dur}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [8, dur * 0.55], [0, 0.8], clamp);
  const pct = String(Math.round(p * 100)).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
  const R = 300;
  const C = 2 * Math.PI * R;
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 1200px at 50% 42%, #1d3a8a, ${NAVY} 72%)`}}>
      <Headline text="লক্ষ্য যা-ই হোক, এগিয়ে থাকবে" />
      <div style={{position: 'absolute', left: 0, right: 0, top: 420, display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'relative', width: 2 * R + 80, height: 2 * R + 80}}>
          <svg width={2 * R + 80} height={2 * R + 80} style={{transform: 'rotate(-90deg)'}}>
            <circle cx={R + 40} cy={R + 40} r={R} stroke="rgba(255,255,255,0.15)" strokeWidth={56} fill="none" />
            <circle cx={R + 40} cy={R + 40} r={R} stroke="#3ddc84" strokeWidth={56} fill="none" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
          </svg>
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{fontSize: 190, fontWeight: 900, color: WHITE, lineHeight: 1}}>{pct}%</div>
            <div style={{marginTop: 14, fontSize: 56, fontWeight: 800, color: '#c9d6ff'}}>দরকারি ইংরেজি</div>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1150, textAlign: 'center', fontSize: 84, fontWeight: 900, color: '#ffd84a'}}>মাত্র ১৫০০ শব্দে</div>
    </AbsoluteFill>
  );
};

// দায়িত্ব অ্যাপের: বড় আইকন
const Duty: Sc = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 2, fps: FPS, config: {damping: 11}});
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 1200px at 50% 40%, #1d3a8a, ${NAVY} 72%)`}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${0.8 + 0.2 * s})`, opacity: s}}>
        <AppIcon size={280} />
        <div style={{marginTop: 60, fontSize: 84, fontWeight: 900, color: WHITE, textAlign: 'center', lineHeight: 1.3}}>
          মাথায় গেঁথে দেওয়ার
          <br />
          দায়িত্ব <span style={{color: '#ffd84a'}}>অ্যাপের</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// শেষ: Play Store-এর আসল স্ক্রিনশট পুরো পর্দায়, ওপরে সার্চ বারে "VocabBangla" লেখা হয়
const Store: Sc = ({dur}) => {
  const f = useCurrentFrame();
  const name = 'VocabBangla';
  const typed = Math.round(interpolate(f, [6, 26], [0, name.length], clamp));
  const bar = spring({frame: f, fps: FPS, config: {damping: 13}});
  const ring = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <>
      <Shot n={24} dur={dur} zoom={[1.0, 1.1]} origin="55% 45%" />
      <div style={{position: 'absolute', left: 70, right: 70, top: 150, transform: `scale(${0.85 + 0.15 * bar})`, opacity: bar}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, background: WHITE, borderRadius: 999, padding: '24px 40px', boxShadow: '0 20px 60px rgba(0,0,0,0.45)', border: `6px solid ${BLUE}`}}>
          <svg width={58} height={64} viewBox="0 0 32 35">
            <path d="M2 2 L18 17.5 L2 33Z" fill="#00c3ff" />
            <path d="M2 2 L23 13.5 L18 17.5Z" fill="#00e676" />
            <path d="M2 33 L23 21.5 L18 17.5Z" fill="#ff3d57" />
            <path d="M23 13.5 L30 17.5 L23 21.5 L18 17.5Z" fill="#ffc400" />
          </svg>
          <span style={{fontSize: 64, fontWeight: 800, color: NAVY, fontFamily: 'sans-serif'}}>
            {name.slice(0, typed)}
            <span style={{opacity: f % 20 < 10 ? 1 : 0, color: BLUE}}>|</span>
          </span>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center'}}>
        <div style={{padding: '16px 36px', background: BLUE, color: WHITE, borderRadius: 22, fontSize: 56, fontWeight: 800, boxShadow: `0 0 0 ${8 + ring * 10}px rgba(31,79,216,${0.35 - ring * 0.2})`}}>এই অ্যাপটাই নামাও</div>
      </div>
    </>
  );
};

const SCENES: Record<string, Sc> = {
  hook: shot(20, 'এই অ্যাপ জানে, কাল তুমি কী ভুলবে', {zoom: [1.25, 1.45], origin: '50% 30%', color: RED, dark: 0.15}),
  proof: ({dur}) => (
    <>
      <Shot n={20} dur={dur} zoom={[1.0, 1.15]} origin="50% 30%" />
      <Headline text="৭টা শব্দ ভুলে যাওয়ার পথে" color={RED} />
      <Meter dur={dur} />
    </>
  ),
  how: shot(1, 'ফরগেটিং কার্ভ', {zoom: [1.0, 1.25], origin: '40% 55%'}),
  lose: shot(1, 'রিভিউ না করলে শব্দ হারায়', {zoom: [1.3, 1.5], origin: '40% 58%', color: RED}),
  measure: shot(21, 'ভুলে যাওয়ার ঠিক আগে রিভিউ', {zoom: [1.0, 1.2], origin: '50% 40%'}),
  wrong: shot(16, 'ভুল শব্দ নিজেই রিভিউতে', {zoom: [1.0, 1.15], origin: '50% 45%'}),
  goal: shot(23, 'তোমার লক্ষ্য বেছে নাও', {zoom: [1.0, 1.2], origin: '55% 65%'}),
  words: shot(22, 'বাছাই করা ১৫০০ জরুরি শব্দ', {zoom: [1.0, 1.15], origin: '50% 45%'}),
  eighty: Eighty,
  example: shot(6, 'বাংলা অর্থ + উদাহরণ', {zoom: [1.0, 1.18], origin: '60% 40%'}),
  learn: shot(18, 'তুমি শুধু শেখো', {zoom: [1.05, 1.15], origin: '50% 40%'}),
  duty: Duty,
  store: Store,
};


// থাম্বনেইল: ভিডিওর প্রথম ১২ ফ্রেম (ফেসবুক প্রথম ফ্রেম থেকে কভার নেয়)
const THUMB_FRAMES = 12;
export const Promo2Thumb: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse 1000px 1300px at 60% 45%, #24469e, ${NAVY} 70%)`, fontFamily}}>
    <div style={{position: 'absolute', right: -60, top: 640, width: 760, height: 1360, transform: 'rotate(8deg)', borderRadius: 50, overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,0.6)'}}>
      <Img src={staticFile('vocab/s20.jpg')} style={{width: 760, height: 1360, objectFit: 'cover', transform: 'scale(1.35)', transformOrigin: '50% 32%'}} />
    </div>
    <div style={{position: 'absolute', left: 60, right: 60, top: 140, color: WHITE, fontWeight: 900, lineHeight: 1.18}}>
      <div style={{fontSize: 118}}>এই অ্যাপ জানে</div>
      <div style={{display: 'inline-block', marginTop: 18, padding: '10px 30px', background: RED, borderRadius: 24, fontSize: 104}}>কাল তুমি কী ভুলবে!</div>
    </div>
    <div style={{position: 'absolute', left: 60, top: 560, display: 'flex', alignItems: 'center', gap: 24}}>
      <AppIcon size={130} />
      <div>
        <div style={{fontSize: 76, fontWeight: 900, color: WHITE, fontFamily: 'sans-serif'}}>VocabBangla</div>
        <div style={{fontSize: 50, fontWeight: 800, color: '#ffd84a'}}>১৫০০ জরুরি শব্দ</div>
      </div>
    </div>
  </AbsoluteFill>
);

const ThumbIntro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: interpolate(f, [THUMB_FRAMES - 5, THUMB_FRAMES], [1, 0], clamp)}}>
      <Promo2Thumb />
    </AbsoluteFill>
  );
};

const segs = raw as {id: string; text: string}[];

export const VocabPromo2: React.FC<{timing?: typeof timing}> = () => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: NAVY, fontFamily, color: WHITE}}>
      <Audio src={staticFile('vocab2/voice.mp3')} />
      {segs.map((seg, i) => {
        const t = timing.segments[i];
        const from = Math.round(t.start * fps);
        const last = i === segs.length - 1;
        const dur = Math.round((last ? t.end + TAIL : t.end) * fps) - from;
        const C = SCENES[seg.id];
        const showBadge = !['duty', 'store', 'eighty'].includes(seg.id);
        return (
          <Sequence key={seg.id} from={from} durationInFrames={dur}>
            <Fade>
              <C dur={dur} />
              {showBadge ? <Badge /> : null}
              <Subtitle text={seg.text} dur={Math.round((t.end - t.start) * fps)} />
            </Fade>
          </Sequence>
        );
      })}
      <Sequence durationInFrames={THUMB_FRAMES}>
        <ThumbIntro />
      </Sequence>
    </AbsoluteFill>
  );
};
