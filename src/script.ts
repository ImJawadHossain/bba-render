import raw from './segments.json';
import {makeFallback} from './common/meta';

export {FPS, HEIGHT, WIDTH, stripTags} from './common/meta';
export type {Timing} from './common/meta';

export type Visual =
  | 'objects'
  | 'figure'
  | 'place'
  | 'sign'
  | 'clock'
  | 'gentle'
  | 'shift'
  | 'dark'
  | 'gun'
  | 'split'
  | 'walk'
  | 'flee'
  | 'text'
  | 'lesson'
  | 'takeaway'
  | 'cta';

export type Segment = {id: string; text: string; visual: Visual};

export const segments = raw as Segment[];

// ভিডিওর শেষ দৃশ্যে যে নাম দেখাবে (ফাঁকা রাখলে শুধু "ফলো করো")
export const CHANNEL_NAME = '';

export const fallbackTiming = makeFallback(segments);
