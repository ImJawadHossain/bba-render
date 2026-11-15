import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Story, StoryProps} from '../common/Story';
import {makeFallback} from '../common/meta';
import {BG, GOLD, GREEN, RED, out} from '../biz/art';
import {CAST} from '../common/cast';
import {Expression, ToonLook} from '../common/Toon';
import {CtaScene, SP, pick} from '../common/kit';
import {Chip, HandPhone, PROF, Pop, PsyThumb, S, SOpts, Stamp, Word, YOU, Yr, a} from '../common/psy';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
const segs = raw as Seg[];
export const stillfaceFallback = makeFallback(segs);

const MOM: ToonLook = {skin: '#e8b994', hair: '#3a2418', hairStyle: 'long', top: '#6a8ab0', bottom: '#2a2c30'};
const TRONICK: ToonLook = {...PROF, hair: '#6a5a4a', labCoat: true, top: '#4a6a8a'};
const WIFE: ToonLook = CAST.customer2;
const KID: ToonLook = {skin: '#d9a07a', hair: '#1c1410', hairStyle: 'short', top: '#d9822b', bottom: '#3a4a6a', headScale: 1.25};

type Mood = 'happy' | 'neutral' | 'point' | 'reach' | 'scream' | 'away' | 'slump' | 'cry';

// বেবি চেয়ারে বসা বাচ্চা
const Baby: React.FC<{size?: number; mood?: Mood}> = ({size = 560, mood = 'happy'}) => {
  const f = useCurrentFrame();
  const bob = mood === 'happy' ? Math.sin(f / 4) * 6 : mood === 'scream' ? Math.sin(f * 1.6) * 3 : 0;
  const tilt = mood === 'slump' ? 16 : mood === 'away' ? -8 : mood === 'cry' ? 8 : 0;
  const armL = mood === 'reach' || mood === 'scream' ? 'M104 214 C70 190 56 150 60 118' : mood === 'happy' ? `M104 214 C74 200 62 ${172 + bob} 66 ${150 + bob}` : mood === 'point' ? 'M104 214 C76 200 50 178 18 172' : 'M104 214 C86 240 86 262 96 280';
  const armR = mood === 'reach' || mood === 'scream' ? 'M216 214 C250 190 264 150 260 118' : mood === 'happy' ? `M216 214 C246 200 258 ${172 + bob} 254 ${150 + bob}` : 'M216 214 C234 240 234 262 224 280';
  const away = mood === 'away' || mood === 'slump';
  return (
    <svg viewBox="0 0 320 400" width={size} height={size * 1.25} style={{overflow: 'visible', filter: 'drop-shadow(0 18px 34px rgba(0,0,0,0.45))'}}>
      <rect x={60} y={210} width={200} height={150} rx={30} fill="#c9963a" stroke="#1b1b1f" strokeWidth={6} />
      <rect x={40} y={282} width={240} height={26} rx={12} fill="#e3bf7a" stroke="#1b1b1f" strokeWidth={5} />
      <g transform={`translate(0 ${bob}) rotate(${tilt} 160 280)`}>
        <path d="M104 290 C96 230 112 196 160 196 C208 196 224 230 216 290Z" fill="#f2d23c" stroke="#1b1b1f" strokeWidth={6} />
        <path d={armL} fill="none" stroke="#1b1b1f" strokeWidth={30} strokeLinecap="round" />
        <path d={armL} fill="none" stroke="#f0c4a0" strokeWidth={21} strokeLinecap="round" />
        <path d={armR} fill="none" stroke="#1b1b1f" strokeWidth={30} strokeLinecap="round" />
        <path d={armR} fill="none" stroke="#f0c4a0" strokeWidth={21} strokeLinecap="round" />
        <g transform={away ? 'translate(16 4)' : undefined}>
          <circle cx={160} cy={118} r={84} fill="#f0c4a0" stroke="#1b1b1f" strokeWidth={6} />
          <path d="M150 36 C146 22 164 16 172 26" fill="none" stroke="#3a2418" strokeWidth={8} strokeLinecap="round" />
          {away ? (
            <>
              <circle cx={198} cy={112} r={7} fill="#1b1b1f" />
              <path d="M176 92 Q196 84 216 92" fill="none" stroke="#1b1b1f" strokeWidth={5} />
              <path d="M186 152 Q202 144 218 150" fill="none" stroke="#1b1b1f" strokeWidth={5} strokeLinecap="round" />
            </>
          ) : (
            <>
              {mood === 'cry' || mood === 'scream' ? (
                <>
                  <path d="M112 112 Q128 96 144 112" fill="none" stroke="#1b1b1f" strokeWidth={6} strokeLinecap="round" />
                  <path d="M176 112 Q192 96 208 112" fill="none" stroke="#1b1b1f" strokeWidth={6} strokeLinecap="round" />
                </>
              ) : (
                <>
                  <circle cx={128} cy={112} r={11} fill="#1b1b1f" />
                  <circle cx={192} cy={112} r={11} fill="#1b1b1f" />
                  <circle cx={132} cy={108} r={3.5} fill="#fff" />
                  <circle cx={196} cy={108} r={3.5} fill="#fff" />
                </>
              )}
              {mood === 'happy' || mood === 'point' ? <path d="M124 146 Q160 192 196 146Z" fill="#c0405a" stroke="#1b1b1f" strokeWidth={5} /> : mood === 'neutral' ? <path d="M138 158 Q160 150 182 158" fill="none" stroke="#1b1b1f" strokeWidth={6} strokeLinecap="round" /> : mood === 'reach' ? <ellipse cx={160} cy={158} rx={14} ry={12} fill="#7a2a3a" stroke="#1b1b1f" strokeWidth={5} /> : <ellipse cx={160} cy={162} rx={40} ry={32} fill="#7a2a3a" stroke="#1b1b1f" strokeWidth={5} />}
              {mood === 'cry' ? (
                <>
                  <path d={`M118 126 L118 ${156 + (f % 20)}`} stroke="#6ab0e0" strokeWidth={10} strokeLinecap="round" />
                  <path d={`M202 126 L202 ${156 + ((f + 8) % 20)}`} stroke="#6ab0e0" strokeWidth={10} strokeLinecap="round" />
                </>
              ) : null}
            </>
          )}
        </g>
      </g>
    </svg>
  );
};

// মা বামে, বাচ্চা ডানে: মুখোমুখি
const Pair = (expr: Expression, mood: Mood, o: SOpts = {}, gesture: 'idle' | 'open' | 'wave' = 'idle') =>
  S({
    bg: 'plain',
    ...o,
    actors: [a(MOM, 260, expr, gesture, {h: 1100, y: 1760, lookX: 1, talking: gesture !== 'idle'})],
    front: (f, d) => (
      <>
        <div style={{position: 'absolute', left: 500, top: 760}}>
          <Baby size={540} mood={mood} />
        </div>
        {o.front?.(f, d)}
      </>
    ),
  });

const Hearts: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{position: 'absolute', left: 300 + i * 110, top: 900 - ((f * 3 + i * 90) % 480), fontSize: 80, color: RED, opacity: 0.9}}>♥</div>
      ))}
    </>
  );
};

const Timer: React.FC<{d: number}> = ({d}) => {
  const f = useCurrentFrame();
  const a0 = (f / Math.max(1, d)) * 360;
  return (
    <svg viewBox="-60 -60 120 120" width={460} height={460} style={{position: 'absolute', left: 310, top: 560}}>
      <circle r={54} fill="#f6f2e8" stroke="#1b1b1f" strokeWidth={6} />
      <line x2={0} y2={-42} stroke={RED} strokeWidth={6} strokeLinecap="round" transform={`rotate(${a0})`} />
      <circle r={5} fill="#1b1b1f" />
    </svg>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  calm: Pair('blank', 'neutral', {title: 'ধমক না, মার না', color: GOLD}),
  blank: Pair('blank', 'cry', {title: 'শুধু দুই মিনিট ফাঁকা মুখ', color: RED, size: 76}),
  kid: S({bg: 'office', actors: [a(YOU, 300, 'neutral', 'hold', {h: 1060, y: 1730, holding: HandPhone}), a(KID, 800, 'smile', 'open', {h: 720, y: 1660, lookX: -1, talking: true})], bubble: '"হুম।"', bx: 80, by: 420, bsize: 90}),
  wife: S({bg: 'office', actors: [a(YOU, 300, 'neutral', 'hold', {h: 1060, y: 1730, holding: HandPhone}), a(WIFE, 800, 'smile', 'explain', {h: 980, lookX: -1, talking: true})], bubble: '"হুম।"', bx: 80, by: 420, bsize: 90}),
  mom: S({bg: 'night', actors: [a(YOU, 540, 'neutral', 'hold', {h: 1060, y: 1730, holding: HandPhone})], front: () => <><Pop x={150} y={350} at={2}><Chip size={70}>"খেয়েছিস?"</Chip></Pop><Pop x={560} y={530} at={18}><Chip size={84} bg="#d8dce4">"হুম।"</Chip></Pop></>}),
  near: S({bg: 'office', title: 'তুমি তো পাশেই আছ', actors: [a(YOU, 300, 'neutral', 'hold', {h: 1060, y: 1730, holding: HandPhone}), a(KID, 800, 'sad', 'idle', {h: 720, y: 1660, lookX: -1})]}),
  yr: Yr('১৯৭০', 'এর দশক · Boston · Edward Tronick'),
  sit: Pair('smile', 'happy', {title: 'মা আর বাচ্চা, মুখোমুখি', size: 76}),
  play: Pair('laugh', 'happy', {}, 'open'),
  dance: Pair('laugh', 'happy', {title: 'যেন একটা নাচ', front: () => <Hearts />}, 'wave'),
  order: S({bg: 'office', actors: [a(TRONICK, 540, 'serious', 'pointUp', {h: 1060, y: 1710, talking: true})], title: 'তারপর নির্দেশ এল', color: RED}),
  turn: S({bg: 'plain', title: 'মুখ ঘুরিয়ে নিলেন...', color: '#cfd6e0', actors: [a(MOM, 260, 'blank', 'idle', {h: 1100, y: 1760, lookX: -1})], front: () => <div style={{position: 'absolute', left: 500, top: 760}}><Baby size={540} mood="neutral" /></div>}),
  empty: S({bg: 'plain', actors: [a(MOM, 540, 'blank', 'idle', {h: 1500, y: 2120})], title: 'ফাঁকা মুখ', color: RED, front: (f, d) => <><Pop x={100} y={1180} at={4}><Chip size={56} bg="#3a3e48" color="#cfd6e0">হাসি নেই</Chip></Pop><Pop x={720} y={1180} at={14}><Chip size={56} bg="#3a3e48" color="#cfd6e0">রাগ নেই</Chip></Pop></>}),
  there: Pair('blank', 'neutral', {title: 'আছেন, কিন্তু সাড়া নেই', color: RED}),
  two: ({dur}) => S({bg: 'plain', title: 'মাত্র দুই মিনিট', color: RED, front: () => <Timer d={dur} />})({dur, id: 'two'}),
  caught: Pair('blank', 'neutral', {title: 'বাচ্চা ধরে ফেলল', color: GOLD}),
  smile: Pair('blank', 'happy', {title: 'হাসল। সাড়া নেই।', color: '#cfd6e0'}),
  point: Pair('blank', 'point', {title: 'দেখাল। সাড়া নেই।', color: '#cfd6e0'}),
  arms: Pair('blank', 'reach', {title: 'দুই হাত বাড়িয়ে দিল', color: GOLD}),
  scream: Pair('blank', 'scream', {title: 'চিৎকার!', color: RED, size: 110}),
  away: Pair('blank', 'away', {title: 'মুখ ঘুরিয়ে নিল', color: '#cfd6e0'}),
  slump: Pair('blank', 'slump', {title: 'শরীর এলিয়ে পড়ল', color: '#cfd6e0', bg: 'dark'}),
  cry: Pair('blank', 'cry', {title: 'কেঁদে ফেলল', color: RED, bg: 'dark'}),
  scary: S({bg: 'dark', title: 'ফাঁকা মুখটা ভয়ংকর', color: RED, actors: [a(MOM, 540, 'blank', 'idle', {h: 1700, y: 2300})]}),
  back: Pair('laugh', 'neutral', {title: 'মা আবার হাসলেন', color: GREEN, bg: 'radial-gradient(ellipse at 50% 50%, #4a4a2a, #0a0b08 75%)'}, 'open'),
  hold: Pair('smile', 'reach', {title: 'হাত ধরলেন', color: GREEN, bg: 'radial-gradient(ellipse at 50% 50%, #4a4a2a, #0a0b08 75%)'}, 'open'),
  ret: Pair('laugh', 'happy', {title: 'বাচ্চা ফিরে এল!', color: GREEN, bg: 'radial-gradient(ellipse at 50% 50%, #5a5a2a, #0a0b08 75%)', front: () => <Hearts />}, 'wave'),
  tronick: S({bg: 'office', actors: [a(TRONICK, 540, 'smile', 'explain', {h: 1060, y: 1710, talking: true})], name: ['Edward Tronick', 'সাইকোলজিস্ট'], bubble: '"সারাক্ষণ ঠিক সাড়া কেউ দিতে পারে না।"', by: 460, bsize: 54}),
  notfail: Word('ভুল না হওয়ায় টেকে না', {size: 136, color: RED}),
  repair: Word('টেকে, ভুলের পর ফিরে আসায়', {size: 136, color: GREEN}),
  noblame: S({bg: 'plain', title: 'নিজেকে দোষ দিও না', color: GREEN, actors: [a(YOU, 540, 'smile', 'open', {h: 1060, y: 1710})]}),
  phonedown: S({bg: 'office', title: 'ফোন নামাও, চোখে তাকাও', color: GREEN, size: 76, actors: [a(YOU, 300, 'smile', 'open', {h: 1060, y: 1730, lookX: 1}), a(KID, 800, 'laugh', 'open', {h: 720, y: 1660, lookX: -1, talking: true})], front: (f, d) => <div style={{position: 'absolute', left: 500, top: 1400, opacity: out(f, d * 0.1, d * 0.3)}}><div style={{width: 130, height: 60, background: '#15171d', border: '6px solid #4a4a50', borderRadius: 10}} /></div>}),
  asked: S({bg: 'office', actors: [a(YOU, 280, 'smile', 'open', {h: 1020, talking: true, lookX: 1}), a(WIFE, 800, 'surprised', 'idle', {h: 980, lookX: -1})], bubble: '"তখন কী যেন বলছিলে?"', by: 320, bsize: 66}),
  cta: () => (
    <CtaScene>
      <Baby size={360} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const StillfaceThumbnail: React.FC = () => (
  <PsyThumb
    l1="ধমকও দেননি, মারেনওনি"
    l2="বাচ্চাটা ভেঙে পড়ল!"
    bottom="তুমিও রোজ এটাই করছ"
    term="Still Face Experiment"
    glow="rgba(106,176,224,0.3)"
    art={<div style={{position: 'absolute', left: 0, top: 740}}><Baby size={560} mood="cry" /></div>}
    size={90}
    expr="serious"
  />
);
export const StillfaceVideo: React.FC<StoryProps> = (p) => <Story {...p} segments={segs} folder="stillface/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<StillfaceThumbnail />} />;
