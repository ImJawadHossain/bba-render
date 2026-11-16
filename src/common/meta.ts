import {CalculateMetadataFunction, staticFile} from 'remotion';

// narrator থাকলে ওই দৃশ্যে ন্যারেটর আসে (common/Narrator.tsx)
// voice = src/common/voices.json-এর চরিত্র; speaker = বুদবুদে দেখানো নাম; side = বুদবুদের লেজ; hit = আঘাতের ঝাঁকি (১ বা ২)
export type BaseSegment = {id: string; text: string; narrator?: import('./Narrator').NarratorCue; voice?: string; speaker?: string; side?: 'left' | 'right' | 'center'; hit?: number};
// voiceStart = দৃশ্যের মধ্যে কথা কখন শুরু (আগে চুপ থাকলে)
export type Timing = {total: number; segments: {id: string; start: number; end: number; voiceStart?: number}[]};

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// ElevenLabs অডিও ট্যাগ ([serious] ইত্যাদি) ক্যাপশনে দেখাবে না
export const stripTags = (t: string) => t.replace(/\[[^\]]*\]\s*/g, '').trim();

// অডিও বানানোর আগে ভিডিও খোলার জন্য আন্দাজি সময়
export const makeFallback = (segments: BaseSegment[]): Timing => {
  let t = 0;
  const segs = segments.map((s) => {
    const dur = Math.max(1.8, stripTags(s.text).length * 0.085);
    const o = {id: s.id, start: t, end: t + dur};
    t += dur;
    return o;
  });
  return {total: t + 1.4, segments: segs};
};

// public/<folder>timing.json আর voice.mp3 থেকে দৈর্ঘ্য ও সময় নেয়
export const makeCalculateMetadata =
  (folder: string, fallback: Timing): CalculateMetadataFunction<{timing: Timing; hasAudio: boolean}> =>
  async () => {
    let timing = fallback;
    let hasAudio = false;
    try {
      const r = await fetch(staticFile(`${folder}timing.json`));
      if (r.ok) {
        const j = (await r.json()) as Timing;
        if (j && Array.isArray(j.segments) && j.segments.length === fallback.segments.length) timing = j;
      }
    } catch {
      // timing.json এখনো নেই: আন্দাজি সময়ে খুলবে
    }
    try {
      const r = await fetch(staticFile(`${folder}voice.mp3`), {method: 'HEAD'});
      hasAudio = r.ok && (r.headers.get('content-type') || '').includes('audio');
    } catch {
      hasAudio = false;
    }
    return {durationInFrames: Math.max(1, Math.ceil(timing.total * FPS)), props: {timing, hasAudio}};
  };
