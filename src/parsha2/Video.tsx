// পারশার ঢাকা মুখের বর: আসাদ নূর (Law 38)। স্ক্রিপ্ট: scripts/Trending/05-parsha-asad-noor.md
// উপকরণ Jawad-এর দেওয়া (D:\ClaudeVideo\parsha\) → public/parsha2/: asad.mp4 (আসাদ নূরের ভিডিও, ১৬০০×৭২০),
// wed.jpg, romantic.jpg, veil.jpg (পদ্মফুলে ঢাকা মুখ), insta.jpg; ললিপপ পোস্ট public/parsha/lolly-post.jpg
import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Card, Cta, Hit, R, Two, lawBook, story} from '../common/reel';
import {Notice} from '../common/laws48';
import {Bounce} from '../common/reel';
import raw from './segments.json';

const LINE = '#1b1b1f';

// ছবি পুরো পর্দায়, ধীরে কাছে আসে
const Photo: React.FC<{src: string; dur: number; zoom?: [number, number]; origin?: string; fit?: 'cover' | 'contain'; dim?: number; pos?: string}> = ({src, dur, zoom = [1, 1.08], origin = '50% 40%', fit = 'cover', dim = 0, pos = '50% 50%'}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, clampOpts);
  return (
    <AbsoluteFill style={{background: '#0b0d12', overflow: 'hidden'}}>
      {fit === 'contain' ? <Img src={staticFile(src)} style={{position: 'absolute', inset: 0, width: 1080, height: 1920, objectFit: 'cover', filter: 'blur(40px) brightness(0.45)', transform: 'scale(1.2)'}} /> : null}
      <Img src={staticFile(src)} style={{position: 'absolute', inset: 0, width: 1080, height: 1920, objectFit: fit, objectPosition: pos, transform: `scale(${z})`, transformOrigin: origin}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(11,13,18,0.55) 0%, rgba(11,13,18,0) 22%, rgba(11,13,18,0) 62%, rgba(11,13,18,0.85) 100%)'}} />
      {dim ? <AbsoluteFill style={{background: `rgba(5,6,10,${dim})`}} /> : null}
    </AbsoluteFill>
  );
};

// আসাদ নূরের আসল ভিডিও (শব্দ voice.mp3-এ, তাই এখানে muted)। blur দিলে মুখ ঝাপসা
// মুখের জায়গা (ভিডিওর % হিসেবে): বসা অবস্থায় ~৪৮%/১৯%, বিয়ের ছবিতে ~৬৩%/১৯%
const Clip: React.FC<{from: number; blur?: boolean}> = ({from, blur}) => {
  const f = useCurrentFrame();
  const t = from + f / 30; // ভিডিওর নিজের সময়; ~২.৩–২.৯ সেকেন্ডে বসা দৃশ্য থেকে বিয়ের ছবিতে বদলায়
  const W = 1500;
  const H = (W * 720) / 1600;
  const video = (style: React.CSSProperties) => <OffthreadVideo src={staticFile('parsha2/asad.mp4')} trimBefore={Math.round(from * 30)} muted style={{position: 'absolute', inset: 0, width: '100%', height: '100%', ...style}} />;
  return (
    <AbsoluteFill style={{background: '#0b0d12', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: (1080 - W) / 2, top: 1080 - H / 2, width: W, height: H}}>
        {video({})}
        {blur ? (
          <>
            {t < 2.95 ? video({filter: 'blur(30px)', clipPath: 'ellipse(9% 24% at 48% 21%)'}) : null}
            {t > 2.2 ? video({filter: 'blur(30px)', clipPath: 'ellipse(8% 22% at 63% 20%)'}) : null}
          </>
        ) : null}
      </div>
      <div style={{position: 'absolute', right: 40, top: 170, display: 'flex', gap: 12, fontSize: 40, fontWeight: 800, color: '#fff'}}>
        <span style={{padding: '6px 20px', borderRadius: 12, background: '#e0243c'}}>● আসল ভিডিও</span>
      </div>
    </AbsoluteFill>
  );
};

const photo = (src: string, title?: string, color = GOLD, o: {zoom?: [number, number]; origin?: string; fit?: 'cover' | 'contain'; dim?: number; pos?: string} = {}): React.FC<SP> => ({dur, id}) => {
  const P = R({place: <Photo src={src} dur={dur} {...o} />, title, color, vig: 0.25});
  return <P dur={dur} id={id} />;
};

// ললিপপ পোস্টের স্ক্রিনশট (706×999)
const LollyShot: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, dur], [1, 1.22], clampOpts);
  const W = 900;
  return (
    <div style={{position: 'absolute', left: 90, top: 160, width: W, height: (W * 999) / 706, overflow: 'hidden', borderRadius: 28, border: `6px solid ${LINE}`, boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}}>
      <Img src={staticFile('parsha/lolly-post.jpg')} style={{width: W, transform: `scale(${z})`, transformOrigin: '50% 0%'}} />
    </div>
  );
};

// ইনস্টাগ্রাম পোস্ট (৯৮৪×১০৮০)
const InstaShot: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 10, fps: 30, config: {damping: 12}});
  const W = 860;
  return (
    <div style={{position: 'absolute', left: 110, top: 560, width: W, height: (W * 1080) / 984, transform: `scale(${0.8 + 0.2 * s})`, opacity: s, borderRadius: 28, overflow: 'hidden', border: `6px solid ${LINE}`, boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}}>
      <Img src={staticFile('parsha2/insta.jpg')} style={{width: W}} />
    </div>
  );
};

// বড় প্রশ্নবোধক চিহ্ন
const BigQ: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 30, fps: 30, config: {damping: 9}});
  return <div style={{position: 'absolute', left: 0, right: 0, top: 600, textAlign: 'center', fontSize: 520, fontWeight: 900, color: RED, transform: `scale(${s})`, textShadow: '0 20px 60px rgba(0,0,0,0.7)'}}>?</div>;
};

const SCENES: Record<string, React.FC<SP>> = {
  h1: photo('parsha2/veil.jpg', 'বরের মুখ ঢাকা', RED, {zoom: [1.0, 1.12], origin: '60% 35%', pos: '72% 50%'}),
  h2: photo('parsha2/veil.jpg', 'মুখটা কেন ঢাকা ছিল?', GOLD, {zoom: [1.12, 1.3], origin: '68% 30%', pos: '72% 50%', dim: 0.25}),
  tease: () => <Clip from={0.3} blur />,
  who: photo('parsha2/wed.jpg', 'পারশা', GOLD, {zoom: [1.1, 1.25], origin: '40% 45%'}),
  wed: photo('parsha2/romantic.jpg', 'দেশের বাইরে বিয়ে', GOLD, {zoom: [1, 1.08], origin: '50% 30%'}),
  photo: photo('parsha2/veil.jpg', 'বরের মুখের সামনে পদ্মফুল', RED, {zoom: [1.0, 1.15], origin: '68% 35%', pos: '72% 50%'}),
  caption: R({bg: 'dark', over: (f, dur) => <LollyShot dur={dur} />}),
  flip: Two(Card('মেয়েদের পর্দার কথা', {size: 104, color: GREEN, bg: 'dark'}), Hit('উল্টে দিলেন ছেলেদের দিকে', {size: 104, color: RED, bg: 'dark'}), 0.45),
  joke: Hit('৯০% মুসলমানের দেশে পর্দা নিয়ে ঠাট্টা', {size: 100, color: RED, bg: 'dark'}),
  storm: photo('parsha2/veil.jpg', 'বরটা কে?', RED, {zoom: [1.15, 1.35], origin: '70% 28%', pos: '72% 50%', dim: 0.45}),
  clue: R({bg: 'dark', title: 'চোখের আঁকা ছবি', color: GOLD, over: () => <InstaShot />}),
  silent: photo('parsha2/veil.jpg', 'পারশা চুপ', GOLD, {zoom: [1.0, 1.05], origin: '40% 40%', dim: 0.35}),
  video: R({
    bg: 'dark',
    over: (f, dur) => (
      <>
        <Bounce x={110} y={560} at={2} seed="v1">
          <Notice text="একটা ভিডিও আসে" w={860} />
        </Bounce>
        <Bounce x={110} y={820} at={Math.round(dur * 0.35)} seed="v2">
          <Notice text="বিয়ের সেই পাঞ্জাবি" w={860} />
        </Bounce>
        <Bounce x={110} y={1080} at={Math.round(dur * 0.7)} seed="v3">
          <Notice text="হাতে লাল পাড়ের শাড়ি" w={860} />
        </Bounce>
      </>
    ),
  }),
  reveal: () => <Clip from={0.3} />,
  name: photo('parsha2/wed.jpg', 'বর: আসাদ নূর', RED, {zoom: [1.05, 1.2], origin: '70% 25%', pos: '72% 50%'}),
  change: photo('parsha2/veil.jpg', 'ঠাট্টা না, পরিকল্পিত খোঁচা', RED, {zoom: [1.0, 1.1], origin: '60% 40%', pos: '65% 50%', dim: 0.2}),
  fool: Card('বিশ্বাস নিয়ে ঠাট্টা সাহস না, বোকামি', {size: 96, color: RED, bg: 'dark'}),
  face: Two(Card('মুখ ঢাকা যায়', {size: 120, color: GOLD, bg: 'dark'}), Hit('ঔদ্ধত্য ঢাকা যায় না', {size: 120, color: RED, bg: 'dark'}), 0.45),
  ask: Card('পোস্টের আগে প্রশ্ন: কিছু বলছে, নাকি আঘাত করছে?', {size: 86, color: GOLD, bg: 'dark'}),
  respect: Two(Card('ভিউ থাকে একদিন', {size: 110, color: GOLD, bg: 'dark'}), Hit('সম্মান থাকে সারাজীবন', {size: 110, color: GREEN, bg: 'dark'}), 0.35),
  book: lawBook(38),
  cta: () => <Cta />,
};

const Thumb: React.FC = () => (
  <PsyThumb
    l1="পারশার ঢাকা মুখের বর"
    l2="শেষমেশ প্রকাশ্যে!"
    bottom="বরটা কে?"
    term="48 Laws · Law 38"
    art={
      <div style={{position: 'absolute', left: 0, top: 820, width: 640, height: 820, overflow: 'hidden', borderRadius: 30}}>
        <Img src={staticFile('parsha2/veil.jpg')} style={{width: 640, height: 820, objectFit: 'cover', objectPosition: '62% 30%'}} />
        <BigQ />
      </div>
    }
    size={80}
  />
);

export const parsha2 = story('parsha2/', raw, SCENES, Thumb, {logo: 'bba2'});
