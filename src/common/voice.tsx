// ভয়েসের জোর (amplitude) থেকে ন্যারেটরের ঠোঁট নাড়া: চুপ থাকলে মুখ বন্ধ
import React, {createContext, useContext} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {AudioData, useAudioData, visualizeAudio} from '@remotion/media-utils';

type Ctx = {audio: AudioData | null; offset: number};
const VoiceCtx = createContext<Ctx>({audio: null, offset: 0});

const WithAudio: React.FC<{src: string; children: React.ReactNode}> = ({src, children}) => {
  const audio = useAudioData(src);
  return <VoiceCtx.Provider value={{audio, offset: 0}}>{children}</VoiceCtx.Provider>;
};

// পুরো ভিডিওর ওপরে একবার
export const VoiceProvider: React.FC<{src: string; enabled: boolean; children: React.ReactNode}> = ({src, enabled, children}) =>
  enabled ? <WithAudio src={src}>{children}</WithAudio> : <>{children}</>;

// প্রতিটা Sequence-এর ভেতরে: দৃশ্য কোন ফ্রেম থেকে শুরু
export const VoiceOffset: React.FC<{offset: number; children: React.ReactNode}> = ({offset, children}) => {
  const c = useContext(VoiceCtx);
  return <VoiceCtx.Provider value={{audio: c.audio, offset: c.offset + offset}}>{children}</VoiceCtx.Provider>;
};

const levelAt = (audio: AudioData, fps: number, frame: number) => {
  if (frame < 0) return 0;
  const v = visualizeAudio({fps, frame, audioData: audio, numberOfSamples: 32, optimizeFor: 'speed'});
  let s = 0;
  for (let i = 0; i < 12; i++) s += v[i];
  return s / 12;
};

// ০..১; ভয়েস না থাকলে null (তখন ন্যারেটর নিজের মতো মুখ নাড়ে)
export const useVoiceLevel = (): number | null => {
  const {audio, offset} = useContext(VoiceCtx);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (!audio) return null;
  const g = f + offset;
  const raw = (levelAt(audio, fps, g) * 0.6 + levelAt(audio, fps, g - 1) * 0.4) * 7;
  return Math.max(0, Math.min(1, raw));
};
