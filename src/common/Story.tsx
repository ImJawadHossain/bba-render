// সব ভিডিওর সাধারণ কাঠামো: ভয়েস, দৃশ্যের ক্রম, ক্যাপশন, শুরুতে থাম্বনেইল
import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansBengali';
import {Grain} from '../art';
import {BaseSegment, Timing, stripTags} from './meta';
import {NarratorHost, NarratorPop, NarratorScene} from './Narrator';
import {VoiceOffset, VoiceProvider} from './voice';
import {Camera, Dust, Impact, KineticCaption, LightSweep, SceneIn, SpeechCaption} from './fx';

export const {fontFamily} = loadFont('normal', {weights: ['500', '700', '800'], subsets: ['bengali', 'latin']});

const FG = '#f2efe9';
const GOLD = '#e3bf7a';

export type StoryProps = {timing: Timing; hasAudio: boolean};

// ভিডিওর প্রথম কয়েক ফ্রেমে থাম্বনেইল থাকে, যাতে কভার হিসেবে বাছা যায়
const THUMB_FRAMES = 12;

// পেজের লোগো। পুরোনো পেজ: BBA - Become Beyond Average (public/bba-logo.png, ১০০০×৫২২)।
// নতুন পেজ: Be Beyond Average (public/bba2-logo.png, ২১৭২×৭২৪)। ভিডিও না বললে পুরোনোটাই।
export type LogoKind = 'bba' | 'bba2';
const LOGOS: Record<LogoKind, {src: string; ratio: number; mark: number; cta: number; thumb: number}> = {
  bba: {src: 'bba-logo.png', ratio: 522 / 1000, mark: 210, cta: 470, thumb: 300},
  bba2: {src: 'bba2-logo.png', ratio: 724 / 2172, mark: 270, cta: 600, thumb: 390},
};
const LogoCtx = React.createContext<LogoKind>('bba');
export const LogoProvider: React.FC<{logo?: LogoKind; children: React.ReactNode}> = ({logo = 'bba', children}) => <LogoCtx.Provider value={logo}>{children}</LogoCtx.Provider>;
const useLogo = () => LOGOS[React.useContext(LogoCtx)];

export const BrandLogo: React.FC<{width: number; style?: React.CSSProperties}> = ({width, style}) => {
  const l = useLogo();
  return <Img src={staticFile(l.src)} style={{width, height: width * l.ratio, filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.8))', ...style}} />;
};

// সব দৃশ্যে কোণে ছোট লোগো
const Watermark: React.FC = () => <BrandLogo width={useLogo().mark} style={{position: 'absolute', left: 36, top: 36, opacity: 0.9}} />;

// শেষ (ফলো) দৃশ্যে বড় লোগো
const CtaLogo: React.FC = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 12}});
  const w = useLogo().cta;
  return (
    <div style={{position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${0.7 + 0.3 * pop})`, opacity: pop}}>
      <BrandLogo width={w} />
    </div>
  );
};

// থাম্বনেইলের ওপরে লোগো (ভিডিওর শুরুতে আর আলাদা PNG দুটোতেই)
export const WithThumbLogo: React.FC<{children: React.ReactNode}> = ({children}) => {
  const w = useLogo().thumb;
  return (
    <AbsoluteFill>
      {children}
      <div style={{position: 'absolute', top: 66, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <BrandLogo width={w} />
      </div>
    </AbsoluteFill>
  );
};
export const branded = (C: React.FC, logo?: LogoKind) => {
  const B: React.FC = () => (
    <LogoProvider logo={logo}>
      <WithThumbLogo>
        <C />
      </WithThumbLogo>
    </LogoProvider>
  );
  return B;
};

const Caption: React.FC<{text: string; dur: number}> = ({text, dur}) => {
  const frame = useCurrentFrame();
  const words = stripTags(text).split(/\s+/).filter(Boolean);
  const n = words.length;
  const progress = frame / Math.max(1, dur * 0.92);
  const current = Math.min(n - 1, Math.floor(progress * n));
  const plain = stripTags(text);
  const size = plain.length > 90 ? 50 : plain.length > 55 ? 56 : 64;
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        bottom: 150,
        textAlign: 'center',
        fontSize: size,
        lineHeight: 1.45,
        fontWeight: 700,
        textShadow: '0 4px 24px rgba(0,0,0,0.9)',
      }}
    >
      {words.map((w, i) => (
        <span key={i} style={{color: i === current ? GOLD : FG, opacity: i <= current ? 1 : 0.4, marginRight: 14, display: 'inline-block'}}>
          {w}
        </span>
      ))}
    </div>
  );
};

function SceneFrame<S extends BaseSegment>({seg, dur, render}: {seg: S; dur: number; render: (seg: S, dur: number) => React.ReactNode}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 6, Math.max(7, dur - 6), dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity}}>
      {seg.narrator?.mode === 'full' ? (
        <NarratorScene cue={seg.narrator} dur={dur} />
      ) : seg.narrator?.mode === 'host' ? (
        <NarratorHost cue={seg.narrator} dur={dur}>
          {render(seg, dur)}
        </NarratorHost>
      ) : (
        render(seg, dur)
      )}
      {seg.narrator && (seg.narrator.mode ?? 'pop') === 'pop' ? <NarratorPop cue={seg.narrator} dur={dur} /> : null}
      <Grain />
      {/* ক্যাপশনের পেছনে অন্ধকার, যাতে লেখা পড়া যায় */}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0) 68%, rgba(0,0,0,0.75) 88%)'}} />
      {seg.id === 'cta' ? <CtaLogo /> : <Watermark />}
      <Caption text={seg.text} dur={dur} />
    </AbsoluteFill>
  );
}

// নতুন ভিডিওর দৃশ্য: ক্যামেরা, আঘাত, ধুলো, আলো, শব্দে শব্দে ক্যাপশন, সংলাপে বুদবুদ
function FxFrame<S extends BaseSegment>({seg, dur, index, lead, render}: {seg: S; dur: number; index: number; lead: number; render: (seg: S, dur: number) => React.ReactNode}) {
  const frame = useCurrentFrame();
  const hit = seg.hit ?? 0;
  const opacity = interpolate(frame, [Math.max(1, dur - 3), dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <SceneIn index={index} hit={hit}>
        <Camera dur={dur} hit={hit}>
          {seg.narrator?.mode === 'full' ? (
            <NarratorScene cue={seg.narrator} dur={dur} />
          ) : seg.narrator?.mode === 'host' ? (
            <NarratorHost cue={seg.narrator} dur={dur}>
              {render(seg, dur)}
            </NarratorHost>
          ) : (
            render(seg, dur)
          )}
          {seg.narrator && (seg.narrator.mode ?? 'pop') === 'pop' ? <NarratorPop cue={seg.narrator} dur={dur} /> : null}
        </Camera>
      </SceneIn>
      <LightSweep dur={dur} />
      <Dust />
      <Grain />
      <Impact hit={hit} />
      {seg.speaker ? null : <AbsoluteFill
        style={{background: 'linear-gradient(180deg, rgba(0,0,0,0) 66%, rgba(0,0,0,0.78) 88%)'}}
      />}
      {seg.id === 'cta' ? <CtaLogo /> : <Watermark />}
      {seg.speaker ? <SpeechCaption text={seg.text} dur={dur} lead={lead} speaker={seg.speaker} side={seg.side} /> : <KineticCaption text={seg.text} dur={dur} lead={lead} />}
    </AbsoluteFill>
  );
}

const ThumbIntro: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{opacity: interpolate(f, [THUMB_FRAMES - 5, THUMB_FRAMES], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{children}</AbsoluteFill>;
};

export function Story<S extends BaseSegment>({
  timing,
  hasAudio,
  segments,
  folder,
  bg,
  render,
  thumbnail,
  fx,
  logo,
}: StoryProps & {segments: S[]; folder: string; bg: string; render: (seg: S, dur: number) => React.ReactNode; thumbnail?: React.ReactNode; fx?: boolean; logo?: LogoKind}) {
  const {fps} = useVideoConfig();
  return (
    <LogoProvider logo={logo}>
    <VoiceProvider src={staticFile(`${folder}voice.mp3`)} enabled={hasAudio}>
    <AbsoluteFill style={{backgroundColor: bg, fontFamily, color: FG}}>
      {hasAudio ? <Audio src={staticFile(`${folder}voice.mp3`)} /> : null}
      {segments.map((seg, i) => {
        const t = timing.segments[i];
        const from = Math.round(t.start * fps);
        const dur = Math.max(2, Math.round(t.end * fps) - from);
        return (
          <Sequence key={seg.id} from={from} durationInFrames={dur}>
            <VoiceOffset offset={from}>
              {fx ? <FxFrame seg={seg} dur={dur} index={i} lead={Math.round(((t.voiceStart ?? t.start) - t.start) * fps)} render={render} /> : <SceneFrame seg={seg} dur={dur} render={render} />}
            </VoiceOffset>
          </Sequence>
        );
      })}
      {thumbnail ? (
        <Sequence durationInFrames={THUMB_FRAMES}>
          <ThumbIntro>
            <WithThumbLogo>{thumbnail}</WithThumbLogo>
          </ThumbIntro>
        </Sequence>
      ) : null}
    </AbsoluteFill>
    </VoiceProvider>
    </LogoProvider>
  );
}
