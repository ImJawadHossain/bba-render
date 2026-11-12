import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {HandPhone, PsyThumb} from '../common/psy';
import {Sign} from '../common/places';
import {Bounce, Card, Cta, Hit, R, Solo, Two, Y1, lawBook, story} from '../common/reel';
import {CAST} from '../common/cast';
import {Notice, crowd} from '../common/laws48';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const LINE = '#1b1b1f';
const ROBIUL: ToonLook = {...Y1, top: '#b8cfe6', bottom: '#2a2c34'};
const GUARD: ToonLook = {...CAST.worker, skin: '#c98d62', top: '#1b1b1f', bottom: '#1b1b1f', hairStyle: 'short'};

// পরীমনির কার্টুন ছবি (Jawad-এর দেওয়া), ধীরে কাছে আসে
export const Pori: React.FC<{dur: number; zoom?: [number, number]; top?: number; dim?: number; tint?: string}> = ({dur, zoom = [1, 1.08], top = 300, dim = 0, tint}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, clampOpts);
  return (
    <AbsoluteFill style={{background: '#14161c', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top, width: 1080, height: 1920 - top, overflow: 'hidden'}}>
        <Img src={staticFile('pori/pori.webp')} style={{width: 1080, height: 1920 - top, objectFit: 'cover', objectPosition: '50% 12%', transform: `scale(${z})`, transformOrigin: '50% 30%'}} />
      </div>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #14161c 0%, rgba(20,22,28,0) 22%, rgba(20,22,28,0) 70%, #0b0d12 100%)'}} />
      {tint ? <AbsoluteFill style={{background: tint}} /> : null}
      {dim ? <AbsoluteFill style={{background: `rgba(5,6,10,${dim})`}} /> : null}
    </AbsoluteFill>
  );
};

// "আসল অডিও" চিহ্ন, সাথে বিপের তারা
export const RealAudio: React.FC<{beeps?: boolean}> = ({beeps = true}) => {
  const f = useCurrentFrame();
  return (
    <>
      <div style={{position: 'absolute', right: 40, top: 150, display: 'flex', gap: 12, fontSize: 40, fontWeight: 800, color: '#fff'}}>
        <span style={{padding: '6px 20px', borderRadius: 12, background: '#e0243c', opacity: 0.75 + Math.sin(f / 5) * 0.25}}>● আসল অডিও</span>
        <span style={{padding: '6px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.65)'}}>সময় টিভি</span>
      </div>
      {beeps ? (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1180, textAlign: 'center', fontSize: 150, fontWeight: 900, color: RED, letterSpacing: 18, textShadow: '0 10px 40px rgba(0,0,0,0.9)', opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 4))}}>✱✱✱</div>
      ) : null}
    </>
  );
};

export const clip = (o: {zoom?: [number, number]; beeps?: boolean; tint?: string} = {}): React.FC<SP> => ({dur}) => (
  <AbsoluteFill>
    <Pori dur={dur} zoom={o.zoom ?? [1.02, 1.16]} top={420} tint={o.tint} />
    <RealAudio beeps={o.beeps} />
  </AbsoluteFill>
);

const poriScene = (title?: string, color = GOLD, o: {zoom?: [number, number]; dim?: number} = {}): React.FC<SP> => ({dur}) => {
  const P = R({place: <Pori dur={dur} zoom={o.zoom} dim={o.dim} />, title, color, vig: 0.3});
  return <P dur={dur} id="p" />;
};

// আদালত ভবন
export const Court: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #8ec2e4, #d8e8ee 60%)'}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
      <path d="M90 560 L540 400 L990 560Z" fill="#e8e2d2" stroke={LINE} strokeWidth={8} />
      <rect x={110} y={560} width={860} height={60} fill="#d8d0bc" stroke={LINE} strokeWidth={6} />
      {[150, 290, 430, 570, 710, 850].map((x) => (
        <rect key={x} x={x} y={620} width={80} height={560} fill="#f2ede0" stroke={LINE} strokeWidth={6} />
      ))}
      <rect x={90} y={1180} width={900} height={50} fill="#d8d0bc" stroke={LINE} strokeWidth={6} />
      <rect x={50} y={1230} width={980} height={50} fill="#cfc7b2" stroke={LINE} strokeWidth={6} />
      <rect x={0} y={1280} width={1080} height={640} fill="#8a8a82" />
    </svg>
    <Sign text="ঢাকার আদালত" bg="#14305f" color="#ffe9a8" y={300} />
  </AbsoluteFill>
);

// লিফট: স্টিলের দরজা, পাশে বোতাম
export const Lift: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #4a4e58, #22252c)'}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
      <rect x={140} y={360} width={800} height={1100} fill="#9aa0aa" stroke={LINE} strokeWidth={10} />
      <rect x={160} y={380} width={370} height={1060} fill="#b8bec8" stroke="#6e7680" strokeWidth={5} />
      <rect x={550} y={380} width={370} height={1060} fill="#b8bec8" stroke="#6e7680" strokeWidth={5} />
      <rect x={960} y={760} width={70} height={180} rx={12} fill="#2a2c34" stroke={LINE} strokeWidth={5} />
      <circle cx={995} cy={810} r={18} fill="#ffd84a" />
      <circle cx={995} cy={880} r={18} fill="#6e7680" />
      <rect x={0} y={1460} width={1080} height={460} fill="#3a3c44" />
    </svg>
  </AbsoluteFill>
);

export const cams = (xs: number[]) => crowd(xs, {h: 860, y: 1900, e: 'surprised'}).map((a) => ({...a, gesture: 'hold' as const, holding: HandPhone}));

const SCENES: Record<string, React.FC<SP>> = {
  clipA: clip({zoom: [1.0, 1.12], tint: 'rgba(160,20,30,0.12)'}),
  h1: poriScene('লিফটে হাত ধরার অভিযোগ', RED, {zoom: [1.12, 1.2], dim: 0.15}),
  h2: Hit('সেই সাংবাদিকের ডান হাতে তিনটা আঙুলই নেই', {size: 104, color: GOLD, bg: 'dark'}),
  court: R({place: <Court />, title: '৫ নভেম্বর', color: GOLD, titleTop: 180}),
  lift: R({place: <Lift />, actors: [{look: ROBIUL, x: 300, h: 1240, y: 1820, expression: 'neutral', gesture: 'hold', holding: HandPhone, lookX: 1}], title: 'লিফটে, এক কোণে রবিউল', color: GOLD}),
  claim: poriScene('"কেউ হাত ধরে, ব্যথা লাগে"', GOLD, {zoom: [1.0, 1.06]}),
  then: R({place: <Court />, actors: cams([120, 330, 540, 750, 960]), title: 'ক্যামেরার সামনেই', color: RED, titleTop: 180}),
  clipB: clip({zoom: [1.1, 1.0]}),
  robiul: Solo(<Lift />, {look: ROBIUL, e: 'serious', g: 'open', talk: true}),
  guards: R({
    place: <Lift />,
    actors: [{look: GUARD, x: 230, h: 1080, y: 1800, expression: 'serious', gesture: 'idle', lookX: 1}, {look: ROBIUL, x: 540, h: 1000, y: 1800, expression: 'shocked', gesture: 'open'}, {look: GUARD, x: 850, h: 1080, y: 1800, expression: 'serious', gesture: 'idle', lookX: -1}],
    title: 'লিফটে ছিলেন তাঁর রক্ষীরা',
    color: GOLD,
  }),
  noinq: Card('কে হাত ধরেছিল? তদন্ত এখনো বলেনি', {size: 92, color: GOLD, bg: 'dark'}),
  after: R({
    bg: 'dark',
    over: () => (
      <>
        <Bounce x={140} y={520} at={2} seed="n1">
          <Notice text="সাংবাদিক সংগঠনের নিন্দা, তদন্তের দাবি" />
        </Bounce>
        <Bounce x={140} y={820} at={40} seed="n2">
          <Notice text="চট্টগ্রামের অনুষ্ঠান থেকে বাদ পরীমনি" />
        </Bounce>
      </>
    ),
  }),
  punch1: R({place: <Court />, actors: crowd([110, 300, 490, 680, 870, 1010], {h: 820, y: 1900, e: 'serious'}), title: 'জবাব দেয় সাংবাদিক সমাজ', color: RED, titleTop: 180}),
  punch2: Two(Card('তারকা হতে লাগে হাজারটা ক্যামেরা', {size: 92, color: GOLD, bg: 'dark'}), Hit('শত্রু বানাতে লাগে একটা গালি', {size: 112, color: RED, bg: 'dark'}), 0.5),
  clipC: clip({zoom: [1.25, 1.35], tint: 'rgba(160,20,30,0.18)'}),
  book: lawBook(19),
  lesson: R({bg: 'plain'}),
  act: Card('আক্রমণের আগে দেখো, পেছনে কারা আছে', {size: 92, color: GREEN, bg: 'dark'}),
  cta: () => <Cta />,
};

const Thumb: React.FC = () => (
  <PsyThumb
    l1="পরীমনির অভিযোগ: হাত ধরেছে"
    l2="সাংবাদিকের হাতে আঙুলই নেই!"
    bottom="শেষে জিতল কে?"
    term="48 Laws · Law 19"
    art={
      <div style={{position: 'absolute', left: 0, top: 820, width: 640, height: 820, overflow: 'hidden', borderRadius: 30}}>
        <Img src={staticFile('pori/pori.webp')} style={{width: 640, height: 820, objectFit: 'cover', objectPosition: '50% 10%'}} />
      </div>
    }
    size={80}
  />
);
export const pori = story('pori/', raw, SCENES, Thumb, {logo: 'bba2'});
