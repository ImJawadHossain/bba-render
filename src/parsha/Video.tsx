// পারশার "পর্দা ফর স্বামী" (Law 38)। স্ক্রিপ্ট: scripts/Trending/04-parsha-hidden-groom.md
// আসল ছবি নয়, আঁকা কনে (সানগ্লাস) আর ফুলের পর্দায় ঢাকা বর
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Bounce, Card, Cta, Hit, R, Solo, Two, WOMAN, lawBook, story} from '../common/reel';
import {Notice} from '../common/laws48';
import {Toon, ToonLook} from '../common/Toon';
import {Haha} from '../porivax/Video';
import raw from './segments.json';

const LINE = '#1b1b1f';
const BRIDE: ToonLook = {...WOMAN, skin: '#e8b896', top: '#c0303a', skirt: '#c0303a', bottom: '#c0303a', glasses: true, sunglasses: true};
const GROOM: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#6a2a3a', kurta: true, bottom: '#f2efe6', shoes: '#3a2618', veil: true};

// বিয়ের মঞ্চ: গোলাপি পেছন, ওপরে ফুলের মালা
const Stage: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #f3d6dc, #e6b3bf 60%, #b8707e)'}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          {Array.from({length: 13}, (_, i) => {
            const x = k * 270 + i * 22.5;
            const y = 120 + Math.sin((i / 12) * Math.PI) * 110;
            return <circle key={i} cx={x} cy={y} r={14} fill={i % 3 === 0 ? '#e05a7a' : '#fff6ee'} stroke="#c8a0a8" strokeWidth={2} />;
          })}
        </g>
      ))}
      {[90, 990].map((x) => (
        <g key={x}>
          {Array.from({length: 26}, (_, j) => (
            <circle key={j} cx={x} cy={160 + j * 46} r={16} fill={j % 4 === 0 ? '#e05a7a' : '#fff6ee'} stroke="#c8a0a8" strokeWidth={2} />
          ))}
        </g>
      ))}
      <rect x={0} y={1480} width={1080} height={440} fill="#7a3a46" />
      <rect x={0} y={1480} width={1080} height={18} fill="#e8b830" />
    </svg>
  </AbsoluteFill>
);

// ললিপপ আর তার দিকে পিঁপড়ার সারি
const Lolly: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width={900} height={520} viewBox="0 0 900 520">
      <rect x={430} y={250} width={22} height={250} fill="#f6f2e8" stroke={LINE} strokeWidth={5} />
      <circle cx={441} cy={170} r={120} fill="#e05a7a" stroke={LINE} strokeWidth={7} />
      <path d="M441 170 m-80 0 a80 80 0 1 0 160 0 a60 60 0 1 0 -120 0 a40 40 0 1 0 80 0" stroke="#fff6ee" strokeWidth={14} fill="none" />
      {Array.from({length: 9}, (_, i) => {
        const x = ((i * 70 + f * 3) % 420) + 10;
        return (
          <g key={i} transform={`translate(${x} 480)`}>
            <ellipse cx={0} cy={0} rx={12} ry={8} fill="#1b1b1f" />
            <circle cx={14} cy={-2} r={7} fill="#1b1b1f" />
            <path d="M-6 6 L-12 16 M2 7 L2 18 M8 6 L14 16" stroke="#1b1b1f" strokeWidth={3} />
          </g>
        );
      })}
    </svg>
  );
};

// কালো চিপ; strike দিলে লাল দাগে কেটে যায়
const Word: React.FC<{text: string; color?: string; strikeAt?: number}> = ({text, color = '#f6f2e8', strikeAt}) => {
  const f = useCurrentFrame();
  const k = strikeAt == null ? 0 : interpolate(f, [strikeAt, strikeAt + 10], [0, 1], clampOpts);
  return (
    <div style={{position: 'relative', display: 'inline-block', padding: '24px 60px', background: 'rgba(8,10,16,0.85)', border: `6px solid ${color}`, borderRadius: 26, fontSize: 110, fontWeight: 900, color}}>
      {text}
      <div style={{position: 'absolute', left: 20, top: '52%', height: 16, width: `calc(${k * 100}% - 40px)`, background: RED, borderRadius: 8, transform: 'rotate(-6deg)'}} />
    </div>
  );
};

// তিনটা খালি ঘর: নাম, মুখ, পরিচয়
const Blanks: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', gap: 36}}>
      {['নাম', 'মুখ', 'পরিচয়'].map((t, i) => {
        const s = spring({frame: f - 4 - (i * dur) / 4, fps: 30, config: {damping: 10}});
        return (
          <div key={t} style={{transform: `scale(${s})`, textAlign: 'center'}}>
            <div style={{width: 260, height: 300, borderRadius: 26, border: `8px dashed ${GOLD}`, background: 'rgba(8,10,16,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 200, fontWeight: 900, color: GOLD}}>?</div>
            <div style={{marginTop: 18, fontSize: 70, fontWeight: 900, color: '#f6f2e8'}}>{t}</div>
          </div>
        );
      })}
    </div>
  );
};

// ঢাল, মাঝে "পর্দা"
const Shield: React.FC = () => (
  <svg width={520} height={600} viewBox="0 0 260 300" style={{filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.6))'}}>
    <path d="M130 10 L245 50 C245 170 200 250 130 290 C60 250 15 170 15 50Z" fill="#2b4fa0" stroke={LINE} strokeWidth={8} />
    <path d="M130 34 L222 66 C222 166 186 232 130 264 C74 232 38 166 38 66Z" fill="none" stroke={GOLD} strokeWidth={6} />
    <text x={130} y={170} textAnchor="middle" fontSize={62} fontWeight={900} fill="#fff6ee">পর্দা</text>
  </svg>
);

// বড় প্রশ্নবোধক চিহ্ন, ধীরে দোলে
const BigQ: React.FC<{x?: number; y?: number; size?: number}> = ({x = 640, y = 380, size = 420}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 6, fps: 30, config: {damping: 9}});
  return <div style={{position: 'absolute', left: x, top: y, fontSize: size, fontWeight: 900, color: RED, transform: `scale(${s}) rotate(${Math.sin(f / 10) * 6}deg)`, textShadow: '0 20px 50px rgba(0,0,0,0.6)'}}>?</div>;
};

// Jawad-এর দেওয়া স্ক্রিনশট: পারশার ললিপপ পোস্ট (706×999)। zoom দিলে ওপরের ক্যাপশনে কাছে যায়
const LollyShot: React.FC<{dur: number; zoom?: [number, number]; top?: number}> = ({dur, zoom = [1, 1.05], top = 170}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, clampOpts);
  const W = 900;
  return (
    <div style={{position: 'absolute', left: 90, top, width: W, height: (W * 999) / 706, overflow: 'hidden', borderRadius: 28, border: `6px solid ${LINE}`, boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}}>
      <Img src={staticFile('parsha/lolly-post.jpg')} style={{width: W, transform: `scale(${z})`, transformOrigin: '50% 0%'}} />
    </div>
  );
};

// জুমার পোস্টের স্ক্রিনশট (752×720); "আপনার শামি বাই কিনা" অংশ ঢাকা
const ZumaShot: React.FC<{sticker?: boolean}> = ({sticker}) => {
  const W = 900;
  const k = W / 752;
  const box = (x: number, y: number, w: number, h: number) => ({position: 'absolute' as const, left: x * k, top: y * k, width: w * k, height: h * k, background: '#fdf6ec', borderRadius: 10});
  return (
    <div style={{position: 'relative', width: W, height: 720 * k, borderRadius: 28, overflow: 'hidden', border: `6px solid ${LINE}`, boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}}>
      <Img
        src={staticFile('parsha/zuma-post.png')}
        style={{width: W}}
        durationInFrames={178}
      />
      <div style={box(196, 376, 460, 70)} />
      <div style={box(300, 446, 180, 76)} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 392 * k, textAlign: 'center', fontSize: 90, fontWeight: 900, color: '#5a5f6e', letterSpacing: 12}}>…</div>
      {sticker ? (
        <div style={{position: 'absolute', left: 0, right: 0, top: 440 * k, display: 'flex', justifyContent: 'center'}}>
          <div style={{padding: '16px 34px', background: GOLD, color: '#15151b', borderRadius: 20, border: `6px solid ${LINE}`, fontSize: 56, fontWeight: 900, transform: 'rotate(-4deg)'}}>বাকিটা জুমার পোস্টেই থাক</div>
        </div>
      ) : null}
    </div>
  );
};

const couple = (o: {e?: 'smile' | 'laugh' | 'shocked' | 'neutral' | 'worried'; title?: string; color?: string; over?: (f: number, dur: number) => React.ReactNode} = {}) =>
  R({
    place: <Stage />,
    actors: [
      {look: BRIDE, x: 340, h: 1200, y: 1860, expression: o.e ?? 'smile', gesture: 'idle', lookX: 0},
      {look: GROOM, x: 760, h: 1260, y: 1860, expression: 'neutral', gesture: 'idle'},
    ],
    title: o.title,
    color: o.color ?? GOLD,
    over: o.over,
  });

const SCENES: Record<string, React.FC<SP>> = {
  h1: couple({title: 'নিজে খোলা, স্বামী ঢাকা', color: RED}),
  h2: Two(Card('সত্যিই পর্দা?', {size: 120, color: GOLD, bg: 'dark'}), Hit('নাকি কিছু লুকানো?', {size: 120, color: RED, bg: 'dark'}), 0.4),
  photo: Solo(<Stage />, {look: BRIDE, e: 'smile'}, {near: true, title: 'কনের মুখ খোলা, চোখে সানগ্লাস', color: GOLD}),
  veil: Solo(<Stage />, {look: GROOM, e: 'neutral'}, {near: true, title: 'বরের মুখে ফুলের পর্দা', color: RED}),
  caption: R({bg: 'dark', over: (f, dur) => <LollyShot dur={dur} top={150} zoom={[1, 1.04]} />}),
  lolly: R({
    bg: 'dark',
    over: (f, dur) => <LollyShot dur={dur} top={150} zoom={[1.04, 1.3]} />,
  }),
  flip: Two(Card('ইসলাম: পর্দা মেয়েদের', {size: 104, color: GREEN, bg: 'dark'}), Hit('পারশা: পর্দা স্বামীর', {size: 110, color: RED, bg: 'dark'}), 0.45),
  joke: Hit('৯০% মুসলমানের দেশে পর্দা নিয়ে ঠাট্টা', {size: 100, color: RED, bg: 'dark'}),
  math: couple({e: 'smile', title: 'হিসাব মেলে না', color: RED, over: () => <BigQ x={430} y={260} size={300} />}),
  two: R({
    bg: 'dark',
    title: 'মানুষ মুখ ঢাকে দুই কারণে',
    color: GOLD,
    over: (f, dur) => (
      <>
        <Bounce x={250} y={600} at={Math.round(dur * 0.35)} seed="t1">
          <Word text="পর্দায়" color={GREEN} />
        </Bounce>
        <Bounce x={210} y={980} at={Math.round(dur * 0.62)} seed="t2">
          <Word text="নয়তো লজ্জায়" color={RED} />
        </Bounce>
      </>
    ),
  }),
  nopurdah: R({
    bg: 'dark',
    title: 'পর্দা তো পারশা মানেন না',
    color: RED,
    over: () => (
      <>
        <Bounce x={250} y={600} at={0} seed="np1">
          <Word text="পর্দায়" color={GREEN} strikeAt={10} />
        </Bounce>
        <Bounce x={210} y={980} at={0} seed="np2">
          <Word text="নয়তো লজ্জায়" color={RED} />
        </Bounce>
      </>
    ),
  }),
  abroad: R({
    bg: 'dark',
    over: (f, dur) => (
      <>
        <Bounce x={110} y={520} at={2} seed="a1">
          <Notice text="বিয়ে দেশের বাইরে" w={860} />
        </Bounce>
        <Bounce x={110} y={820} at={Math.round(dur * 0.45)} seed="a2">
          <Notice text="পারশার নিজের পরিবারও যেতে পারেনি" w={860} />
        </Bounce>
      </>
    ),
  }),
  none: R({bg: 'dark', title: 'স্বামীর…', color: GOLD, over: (f, dur) => <Blanks dur={dur} />}),
  shield: R({
    place: <Stage />,
    actors: [{look: GROOM, x: 540, h: 1440, y: 2010, expression: 'neutral', gesture: 'idle'}],
    title: 'পর্দার কথাটা আসলে ঢাল',
    color: RED,
    over: () => (
      <Bounce x={280} y={640} at={6} seed="sh">
        <Shield />
      </Bounce>
    ),
  }),
  zuma: R({
    bg: 'dark',
    title: 'এক লাইনের খোঁচা',
    color: GOLD,
    over: () => (
      <Bounce x={90} y={520} at={2} seed="z1">
        <ZumaShot />
      </Bounce>
    ),
  }),
  zline: R({
    bg: 'dark',
    over: (f, dur) => (
      <div style={{position: 'absolute', left: 90, top: 420}}>
        <ZumaShot sticker={f > dur * 0.55} />
      </div>
    ),
  }),
  laugh: couple({e: 'laugh', title: 'ভেবেছিলেন মানুষ হাসবে', color: GOLD}),
  laugh2: couple({e: 'shocked', title: 'হাসল, তবে পারশাকে নিয়ে', color: RED, over: () => <Haha />}),
  who: R({
    place: <Stage />,
    actors: [{look: GROOM, x: 540, h: 1440, y: 2010, expression: 'neutral', gesture: 'idle'}],
    title: 'ফুলের পর্দার পেছনে কে?',
    color: RED,
    over: () => <BigQ x={660} y={420} size={360} />,
  }),
  book: lawBook(38),
  punish: Card('বিশ্বাস নিয়ে ঠাট্টা করলে মানুষ শাস্তি দেয়', {size: 96, color: RED, bg: 'dark'}),
  lesson: R({bg: 'plain'}),
  act: Card('মত রাখো, বিশ্বাস নিয়ে ঠাট্টা না', {size: 96, color: GREEN, bg: 'dark'}),
  cta: () => <Cta />,
};

const Thumb: React.FC = () => (
  <PsyThumb
    l1="নিজে পর্দা করেন না"
    l2="স্বামীকে ঢাকলেন পর্দায়!"
    bottom="পর্দার পেছনে কে?"
    term="48 Laws · Law 38"
    art={
      <div style={{position: 'absolute', left: 60, top: 760}}>
        <Toon height={1000} {...GROOM} />
      </div>
    }
    size={80}
  />
);

export const parsha = story('parsha/', raw, SCENES, Thumb, {logo: 'bba2'});
