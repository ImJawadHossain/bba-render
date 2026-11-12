// খালিদ ফারহানের স্বাক্ষরিত ইট ও Supreme-এর ৩,৫০০ টাকার ইট (Law 27)। স্ক্রিপ্ট: D:\ClaudeVideo\scripts\Trending\08-khalid-supreme-brick.md
// নোট: ৩২টি দ্রুত দৃশ্য (২.১–৪.৪ সে/দৃশ্য) ও ১–২ লাইন ক্যাপশন; timing.json word-level Scribe-সিঙ্কড voice.mp3-এর সাথে
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {Backdrop, SP} from '../common/kit';
import {crowd} from '../common/laws48';
import {PsyThumb} from '../common/psy';
import {Bounce, Cta, R, Two, WOMAN, Y1, Y2, lawBook, story} from '../common/reel';
import raw from './segments.json';

const LINE = '#1b1b1f';
const DarkBase = <AbsoluteFill style={{background: '#0b0d12'}} />;
const BN = '০১২৩৪৫৬৭৮৯';
const bn = (n: number) => n.toLocaleString('en-IN').replace(/\d/g, (d) => BN[Number(d)]);

// ছবি পুরো পর্দায়, ধীরে কাছে আসে (Ken Burns)
const Photo: React.FC<{
  src: string;
  dur: number;
  zoom?: [number, number];
  origin?: string;
  fit?: 'cover' | 'contain';
  dim?: number;
  pos?: string;
}> = ({src, dur, zoom = [1, 1.08], origin = '50% 45%', fit = 'cover', dim = 0, pos = '50% 50%'}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, clampOpts);
  return (
    <AbsoluteFill style={{background: '#0b0d12', overflow: 'hidden'}}>
      {fit === 'contain' ? (
        <Img
          src={staticFile(src)}
          style={{
            position: 'absolute',
            inset: 0,
            width: 1080,
            height: 1920,
            objectFit: 'cover',
            filter: 'blur(40px) brightness(0.42)',
            transform: 'scale(1.2)',
          }}
        />
      ) : null}
      <Img
        src={staticFile(src)}
        style={{
          position: 'absolute',
          inset: 0,
          width: 1080,
          height: 1920,
          objectFit: fit,
          objectPosition: pos,
          transform: `scale(${z})`,
          transformOrigin: origin,
        }}
      />
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(11,13,18,0.52) 0%, rgba(11,13,18,0.04) 24%, rgba(11,13,18,0.04) 58%, rgba(11,13,18,0.92) 100%)',
        }}
      />
      {dim ? <AbsoluteFill style={{background: `rgba(5,6,10,${dim})`}} /> : null}
    </AbsoluteFill>
  );
};

// সংখ্যা কাউন্টার কার্ড
const StatCard: React.FC<{
  dur: number;
  to: number;
  from?: number;
  pre?: string;
  post?: string;
  label: string;
  sub: string;
  color?: string;
  borderColor?: string;
  size?: number;
  countUntil?: number;
  subAt?: number;
}> = ({dur, to, from = 0, pre = '', post = '', label, sub, color = GOLD, borderColor = GOLD, size = 148, countUntil = 0.62, subAt = 0.55}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
  const subPop = spring({frame: f - Math.round(dur * subAt), fps: 30, config: {damping: 10}});
  const v = Math.round(
    interpolate(f, [2, Math.max(4, dur * countUntil)], [from, to], {
      ...clampOpts,
      easing: (t) => 1 - (1 - t) * (1 - t),
    }),
  );
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top: 390,
        padding: '48px 36px',
        background: 'rgba(12,16,24,0.88)',
        backdropFilter: 'blur(24px)',
        borderRadius: 36,
        border: `4px solid ${borderColor}`,
        boxShadow: '0 30px 90px rgba(0,0,0,0.88)',
        textAlign: 'center',
        transform: `scale(${0.88 + 0.12 * pop})`,
        opacity: pop,
      }}
    >
      <div style={{fontSize: 44, fontWeight: 800, color: '#e2e8f0'}}>{label}</div>
      <div style={{fontSize: size, fontWeight: 900, color, marginTop: 14, lineHeight: 1.15, textShadow: '0 10px 40px rgba(0,0,0,0.75)'}}>
        {pre}
        {bn(v)}
        {post}
      </div>
      <div
        style={{
          marginTop: 26,
          display: 'inline-block',
          padding: '10px 34px',
          borderRadius: 99,
          background: 'rgba(255,255,255,0.08)',
          border: `3px solid ${color}`,
          fontSize: 42,
          fontWeight: 900,
          color: '#fff',
          transform: `scale(${subPop})`,
          opacity: subPop,
        }}
      >
        {sub}
      </div>
    </div>
  );
};

// h1b: রাস্তার লাল ইটের ওপর সোনালি অটোগ্রাফ আঁকার দৃশ্য
const AutographOnBrick: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const cardIn = spring({frame: f - 2, fps: 30, config: {damping: 11}});
  const signDraw = interpolate(f, [Math.round(dur * 0.22), Math.round(dur * 0.74)], [0, 1], clampOpts);
  return (
    <div
      style={{
        position: 'absolute',
        left: 85,
        right: 85,
        top: 340,
        padding: '34px 36px',
        background: 'rgba(11,13,18,0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: 32,
        border: `4px solid ${GOLD}`,
        boxShadow: '0 28px 86px rgba(0,0,0,0.9)',
        textAlign: 'center',
        transform: `scale(${0.88 + 0.12 * cardIn})`,
        opacity: cardIn,
      }}
    >
      <div style={{fontSize: 38, fontWeight: 800, color: GOLD}}>সাধারণ লাল ইট + নিজের সই</div>
      <div style={{marginTop: 22, display: 'flex', justifyContent: 'center'}}>
        <svg width={440} height={240} viewBox="0 0 360 190" style={{filter: 'drop-shadow(0 14px 30px rgba(0,0,0,0.8))'}}>
          <polygon points="36,68 272,28 338,76 102,116" fill="#c94a36" stroke={LINE} strokeWidth={5} strokeLinejoin="round" />
          <polygon points="36,68 102,116 102,178 36,130" fill="#8f2d1e" stroke={LINE} strokeWidth={5} strokeLinejoin="round" />
          <polygon points="102,116 338,76 338,138 102,178" fill="#b13928" stroke={LINE} strokeWidth={5} strokeLinejoin="round" />
          <path
            d="M128 148 C144 114, 158 158, 174 126 C192 98, 202 154, 224 124 C242 104, 260 136, 314 108"
            fill="none"
            stroke="#fef08a"
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={320}
            strokeDashoffset={320 * (1 - signDraw)}
          />
        </svg>
      </div>
      <div style={{marginTop: 8, fontSize: 34, fontWeight: 800, color: '#cbd5e1'}}>স্বাক্ষর: খালিদ ফারহান</div>
    </div>
  );
};

// h1c দুই ধাপ: ৳৩,৫০০ লাল ঝোলানো ট্যাগ -> মানুষ লাইনে দাঁড়িয়ে যাবে!
const H1cPricePart = R({
  place: DarkBase,
  back: (_f, dur) => <Photo src="supremebrick/brick-plain.jpg" dur={dur} dim={0.62} zoom={[1.04, 1.12]} />,
  over: (f) => {
    const swing = spring({frame: f, fps: 30, config: {damping: 10, stiffness: 150}});
    return (
      <div
        style={{
          position: 'absolute',
          left: 170,
          right: 170,
          top: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${0.84 + 0.16 * swing}) rotate(-4deg)`,
          opacity: swing,
        }}
      >
        <div style={{width: 10, height: 70, background: GOLD, borderRadius: 5}} />
        <div
          style={{
            width: '100%',
            padding: '44px 36px 50px',
            background: 'linear-gradient(155deg, #991b1b, #450a0a)',
            border: `6px solid ${GOLD}`,
            borderRadius: 34,
            boxShadow: '0 32px 90px rgba(0,0,0,0.92)',
            textAlign: 'center',
          }}
        >
          <div style={{width: 28, height: 28, borderRadius: '50%', background: '#0b0d12', border: `4px solid ${GOLD}`, margin: '0 auto 22px'}} />
          <div style={{fontSize: 38, fontWeight: 800, color: '#fecaca'}}>নিজের সই করা ইট</div>
          <div style={{fontSize: 106, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginTop: 10}}>৳৩,৫০০!</div>
        </div>
      </div>
    );
  },
});

const H1cCrowdPart = R({
  place: DarkBase,
  back: (_f, dur) => <Photo src="supremebrick/streetwear-queue.jpg" dur={dur} dim={0.22} zoom={[1.0, 1.1]} pos="50% 42%" />,
  vig: 0.24,
  over: () => (
    <Bounce x={140} y={1040} at={2} seed="h1crowd">
      <div
        style={{
          width: 800,
          boxSizing: 'border-box',
          padding: '20px 28px',
          background: 'rgba(127,29,29,0.92)',
          border: `4px solid ${GOLD}`,
          borderRadius: 24,
          textAlign: 'center',
          boxShadow: '0 22px 60px rgba(0,0,0,0.9)',
        }}
      >
        <div style={{fontSize: 48, fontWeight: 900, color: '#fff'}}>কেনার জন্য মানুষের দীর্ঘ লাইন!</div>
      </div>
    </Bounce>
  ),
});

// সোল্ড আউট ও স্টক ০% (sold2)
const DropSelloutCard: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const pct = interpolate(f, [2, Math.round(dur * 0.54)], [100, 0], clampOpts);
  const stamp = spring({frame: f - Math.round(dur * 0.56), fps: 30, config: {damping: 8, stiffness: 180}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 90,
        right: 90,
        top: 380,
        padding: '44px 40px',
        background: 'rgba(15,20,30,0.92)',
        border: `4px solid ${pct < 5 ? RED : GOLD}`,
        borderRadius: 34,
        boxShadow: '0 32px 96px rgba(0,0,0,0.9)',
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 32, fontWeight: 800, color: '#94a3b8', letterSpacing: 2}}>ONLINE DROP STOCK</div>
      <div style={{fontSize: 108, fontWeight: 900, color: pct < 5 ? RED : GOLD, marginTop: 8}}>
        {pct < 1 ? '০%' : `${bn(Math.round(pct))}%`}
      </div>
      <div style={{height: 32, background: '#1e293b', borderRadius: 16, overflow: 'hidden', border: '3px solid #334155', marginTop: 22}}>
        <div style={{width: `${pct}%`, height: '100%', background: pct > 35 ? GOLD : RED, borderRadius: 12}} />
      </div>
      <div
        style={{
          marginTop: 34,
          display: 'inline-block',
          padding: '14px 48px',
          background: '#7f1d1d',
          border: `6px solid ${RED}`,
          borderRadius: 20,
          fontSize: 68,
          fontWeight: 900,
          color: '#fff',
          transform: `scale(${stamp}) rotate(-5deg)`,
          opacity: stamp,
        }}
      >
        SOLD OUT!
      </div>
    </div>
  );
};

// দুনিয়ায় দুই রকম মানুষ (duality2: দাবার ঘুঁটি বনাম মুকুট)
const DualityVisual: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const s1 = spring({frame: f - 2, fps: 30, config: {damping: 12}});
  const s2 = spring({frame: f - Math.round(dur * 0.45), fps: 30, config: {damping: 10, stiffness: 170}});
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 85,
          right: 85,
          top: 390,
          padding: '38px 36px',
          background: 'rgba(18,22,30,0.9)',
          border: '4px solid #64748b',
          borderRadius: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 30,
          boxShadow: '0 24px 70px rgba(0,0,0,0.8)',
          transform: `scale(${0.86 + 0.14 * s1})`,
          opacity: s1,
        }}
      >
        <svg width={100} height={120} viewBox="0 0 100 120" style={{flexShrink: 0}}>
          <circle cx={50} cy={28} r={18} fill="#94a3b8" stroke={LINE} strokeWidth={4} />
          <path d="M32 52 Q50 44 68 52 L78 104 L22 104 Z" fill="#64748b" stroke={LINE} strokeWidth={4} />
          <rect x={16} y={102} width={68} height={14} rx={5} fill="#475569" stroke={LINE} strokeWidth={4} />
        </svg>
        <div style={{fontSize: 56, fontWeight: 900, color: '#cbd5e1', lineHeight: 1.2}}>যাদের নিয়ে খেলা হয়</div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 85,
          right: 85,
          top: 720,
          padding: '44px 36px',
          background: 'rgba(42,14,18,0.94)',
          border: `5px solid ${GOLD}`,
          borderRadius: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 30,
          boxShadow: '0 30px 90px rgba(227,191,122,0.3)',
          transform: `scale(${0.82 + 0.18 * s2})`,
          opacity: s2,
        }}
      >
        <svg width={110} height={110} viewBox="0 0 120 120" style={{flexShrink: 0, filter: 'drop-shadow(0 8px 20px rgba(227,191,122,0.5))'}}>
          <path d="M16 90 L24 34 L48 58 L60 22 L72 58 L96 34 L104 90 Z" fill={GOLD} stroke={LINE} strokeWidth={5} strokeLinejoin="round" />
          <rect x={18} y={92} width={84} height={16} rx={6} fill={GOLD} stroke={LINE} strokeWidth={4} />
        </svg>
        <div style={{fontSize: 58, fontWeight: 900, color: GOLD, lineHeight: 1.2}}>যারা খেলাটা বোঝে</div>
      </div>
    </>
  );
};

// book2-এর জন্য Law 27 কার্ড + ন্যারেটর পপ
const Law27Book = lawBook(27);
const Book2Scene: React.FC<SP> = (p) => {
  const f = useCurrentFrame();
  const badgeIn = spring({frame: f - Math.round(p.dur * 0.45), fps: 30, config: {damping: 11}});
  return (
    <AbsoluteFill>
      <Law27Book {...p} />
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 930,
          width: 550,
          padding: '22px 24px',
          background: 'rgba(127,29,29,0.92)',
          border: `4px solid ${GOLD}`,
          borderRadius: 24,
          boxShadow: '0 22px 60px rgba(0,0,0,0.8)',
          transform: `scale(${0.86 + 0.14 * badgeIn})`,
          opacity: badgeIn,
        }}
      >
        <div style={{fontSize: 40, fontWeight: 900, color: '#fff', lineHeight: 1.25}}>কেন মানুষ ব্র্যান্ডের পেছনে ছোটে?</div>
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  // ১. হুক (প্রতি ২–৪ সেকেন্ডে আলাদা পর্দা, সর্বোচ্চ ২ লাইন ক্যাপশন)
  h1a: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/khalid.jpg" dur={dur} fit="contain" zoom={[1.0, 1.05]} pos="50% 42%" origin="50% 34%" dim={0.05} />,
    vig: 0.2,
    over: () => (
      <div style={{position: 'absolute', right: 56, top: 100, fontSize: 36, fontWeight: 800, color: '#fff'}}>
        <span style={{padding: '8px 22px', borderRadius: 14, background: RED, boxShadow: '0 4px 20px rgba(224,36,60,0.55)'}}>● খালিদ ফারহান</span>
      </div>
    ),
  }),

  h1b: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/brick-roadside.jpg" dur={dur} zoom={[1.02, 1.14]} origin="48% 58%" dim={0.48} />,
    over: (_f, dur) => <AutographOnBrick dur={dur} />,
  }),

  h1c: Two(H1cPricePart, H1cCrowdPart, 0.56),

  h2a: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/brick-roadside.jpg" dur={dur} dim={0.68} pos="50% 60%" />,
    actors: [{look: Y1, x: 540, y: 1700, h: 1120, expression: 'shocked', gesture: 'shrug'}],
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 10, stiffness: 170}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 110,
            right: 110,
            top: 230,
            padding: '22px 28px',
            background: 'rgba(127,29,29,0.92)',
            border: `5px solid ${GOLD}`,
            borderRadius: 30,
            textAlign: 'center',
            boxShadow: '0 22px 60px rgba(0,0,0,0.85)',
            transform: `scale(${pop})`,
          }}
        >
          <div style={{fontSize: 54, fontWeight: 900, color: GOLD}}>কী?! পাগলামি মনে হচ্ছে?</div>
        </div>
      );
    },
  }),

  h2b: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/supreme-brick.jpg" dur={dur} dim={0.42} zoom={[1.06, 1.15]} />,
    over: (f) => {
      const pop = spring({frame: f - 2, fps: 30, config: {damping: 10, stiffness: 160}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 95,
            right: 95,
            top: 320,
            padding: '24px 30px',
            background: 'rgba(11,13,18,0.9)',
            border: `4px solid ${RED}`,
            borderRadius: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            boxShadow: '0 26px 80px rgba(0,0,0,0.9)',
            transform: `scale(${0.86 + 0.14 * pop})`,
            opacity: pop,
          }}
        >
          <div
            style={{
              width: 82,
              height: 82,
              borderRadius: '50%',
              background: RED,
              border: '4px solid #fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 54,
              fontWeight: 900,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            !
          </div>
          <div>
            <div style={{fontSize: 54, fontWeight: 900, color: '#fff', lineHeight: 1.15}}>ঠিক এমনটাই ঘটেছে!</div>
            <div style={{fontSize: 32, fontWeight: 700, color: GOLD, marginTop: 6}}>অবিশ্বাস্য হলেও এটাই সত্যি</div>
          </div>
        </div>
      );
    },
  }),

  h2c: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/streetwear-queue.jpg" dur={dur} dim={0.14} zoom={[1.0, 1.09]} pos="50% 44%" />,
    vig: 0.24,
    over: () => (
      <Bounce x={110} y={1040} at={2} seed="usastreet">
        <div
          style={{
            width: 860,
            boxSizing: 'border-box',
            padding: '20px 24px',
            background: 'rgba(11,13,18,0.9)',
            border: `4px solid ${RED}`,
            borderRadius: 24,
            textAlign: 'center',
            boxShadow: '0 22px 60px rgba(0,0,0,0.9)',
          }}
        >
          <div style={{fontSize: 38, fontWeight: 900, color: '#fff'}}>আমেরিকার সবচেয়ে বড় স্ট্রিটওয়্যার ব্র্যান্ড</div>
        </div>
      </Bounce>
    ),
  }),

  // ২. Supreme ও রাতের লাইন
  brand1: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/supreme-brick.jpg" dur={dur} dim={0.78} zoom={[1.05, 1.12]} />,
    over: (_f, dur) => (
      <>
        <Bounce x={190} y={370} at={1} seed="supbox2">
          <div
            style={{
              width: 700,
              padding: '38px 32px',
              background: '#dc2626',
              border: '8px solid #fff',
              boxShadow: '0 32px 90px rgba(220,38,38,0.5)',
              textAlign: 'center',
            }}
          >
            <div style={{fontSize: 112, fontWeight: 900, fontStyle: 'italic', color: '#fff', letterSpacing: -2, lineHeight: 1}}>
              Supreme
            </div>
          </div>
        </Bounce>
        <Bounce x={190} y={710} at={Math.round(dur * 0.36)} seed="hoodies">
          <div
            style={{
              width: 700,
              boxSizing: 'border-box',
              padding: '26px 32px',
              background: 'rgba(15,20,30,0.9)',
              border: `4px solid ${GOLD}`,
              borderRadius: 26,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 38,
              boxShadow: '0 22px 60px rgba(0,0,0,0.88)',
            }}
          >
            {/* টি-শার্ট SVG */}
            <svg width={88} height={82} viewBox="0 0 100 92">
              <path d="M22 10 L36 10 Q50 24 64 10 L78 10 L96 32 L80 46 L72 38 L72 86 L28 86 L28 38 L20 46 L4 32 Z" fill="#f8fafc" stroke={LINE} strokeWidth={4} strokeLinejoin="round" />
            </svg>
            {/* হুডি SVG */}
            <svg width={88} height={82} viewBox="0 0 100 92">
              <path d="M28 12 Q50 0 72 12 L94 34 L82 50 L72 40 L72 86 L28 86 L28 40 L18 50 L6 34 Z" fill={RED} stroke={LINE} strokeWidth={4} strokeLinejoin="round" />
              <rect x={38} y={44} width={24} height={14} rx={4} fill="#fff" />
            </svg>
            <div style={{fontSize: 40, fontWeight: 900, color: GOLD}}>টি-শার্ট ও হুডি</div>
          </div>
        </Bounce>
      </>
    ),
  }),

  brand2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/streetwear-queue.jpg" dur={dur} dim={0.14} zoom={[1.02, 1.12]} pos="38% 42%" origin="62% 50%" />,
    vig: 0.24,
    over: () => (
      <Bounce x={180} y={1040} at={2} seed="queuechip2">
        <div
          style={{
            width: 720,
            boxSizing: 'border-box',
            padding: '18px 28px',
            background: 'rgba(11,13,18,0.9)',
            border: `4px solid ${GOLD}`,
            borderRadius: 22,
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.88)',
          }}
        >
          <div style={{fontSize: 44, fontWeight: 900, color: '#fff'}}>রাত থেকেই দোকানের বাইরে লাইন</div>
        </div>
      </Bounce>
    ),
  }),

  // ৩. ২০১৬-র কাণ্ড -> পুরো দুনিয়া চমকে যায়
  yr2016a: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/brick-plain.jpg" dur={dur} dim={0.78} zoom={[1.02, 1.1]} />,
    over: (f) => {
      const pop = spring({frame: f - 2, fps: 30, config: {damping: 10}});
      return (
        <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center'}}>
          <div style={{fontSize: 40, fontWeight: 800, color: GOLD, letterSpacing: 6, opacity: pop}}>YEAR · 2016</div>
          <div style={{fontSize: 220, fontWeight: 900, color: '#fff', lineHeight: 1.05, transform: `scale(${pop})`, textShadow: '0 20px 70px rgba(0,0,0,0.9)'}}>
            ২০১৬
          </div>
        </div>
      );
    },
  }),

  yr2016b: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/supreme-brick.jpg" dur={dur} dim={0.72} zoom={[1.05, 1.12]} />,
    over: (f) => {
      const ring = spring({frame: f - 2, fps: 30, config: {damping: 10}});
      const wave = interpolate(f % 24, [0, 24], [0.85, 1.35], clampOpts);
      const waveOp = interpolate(f % 24, [0, 24], [0.65, 0], clampOpts);
      return (
        <div style={{position: 'absolute', left: 0, right: 0, top: 310, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `6px solid ${RED}`, transform: `scale(${wave})`, opacity: waveOp}} />
            <svg width={240} height={240} viewBox="0 0 120 120" style={{transform: `scale(${ring})`, filter: 'drop-shadow(0 18px 46px rgba(0,0,0,0.9))'}}>
              <circle cx={60} cy={60} r={52} fill="#1e3a8a" stroke={GOLD} strokeWidth={5} />
              <ellipse cx={60} cy={60} rx={26} ry={52} fill="none" stroke="#93c5fd" strokeWidth={4} />
              <line x1={10} y1={60} x2={110} y2={60} stroke="#93c5fd" strokeWidth={4} />
              <path d="M20 35 Q60 44 100 35 M20 85 Q60 76 100 85" fill="none" stroke="#93c5fd" strokeWidth={3.5} />
            </svg>
          </div>
          <div
            style={{
              marginTop: 34,
              padding: '18px 46px',
              background: '#7f1d1d',
              border: `5px solid ${GOLD}`,
              borderRadius: 24,
              fontSize: 64,
              fontWeight: 900,
              color: '#fff',
              boxShadow: '0 22px 60px rgba(0,0,0,0.9)',
              transform: `scale(${ring})`,
            }}
          >
            পুরো দুনিয়া চমকে যায়!
          </div>
        </div>
      );
    },
  }),

  // ৪. সাধারণ ইট -> ১০-১২ টাকা
  rawbrick1: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/brick-plain.jpg" dur={dur} zoom={[1.0, 1.07]} origin="50% 52%" dim={0.05} />,
    vig: 0.24,
    over: () => (
      <div style={{position: 'absolute', right: 56, top: 200, fontSize: 38, fontWeight: 900, color: GOLD}}>
        <span style={{padding: '10px 26px', borderRadius: 16, background: 'rgba(11,13,18,0.88)', border: `3px solid ${GOLD}`}}>সাধারণ রাজমিস্ত্রির ইট</span>
      </div>
    ),
  }),

  rawbrick2: R({
    place: <Backdrop bg="dark" />,
    over: (f, dur) => {
      const pop = spring({frame: f - 2, fps: 30, config: {damping: 11}});
      const coinIn = spring({frame: f - Math.round(dur * 0.22), fps: 30, config: {damping: 9, stiffness: 160}});
      return (
        <div style={{position: 'absolute', left: 0, right: 0, top: 340, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 36, transform: `scale(${pop})`}}>
            <svg width={320} height={210} viewBox="0 0 360 220" style={{filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.85))'}}>
              <polygon points="36,78 272,38 338,86 102,126" fill="#c94a36" stroke={LINE} strokeWidth={5} strokeLinejoin="round" />
              <polygon points="36,78 102,126 102,188 36,140" fill="#8f2d1e" stroke={LINE} strokeWidth={5} strokeLinejoin="round" />
              <polygon points="102,126 338,86 338,148 102,188" fill="#b13928" stroke={LINE} strokeWidth={5} strokeLinejoin="round" />
            </svg>
            <div style={{transform: `scale(${coinIn})`, display: 'flex', flexDirection: 'column', gap: 14}}>
              <div style={{width: 150, height: 150, borderRadius: '50%', background: 'linear-gradient(145deg, #facc15, #b45309)', border: `6px solid #fef08a`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, fontWeight: 900, color: '#1b1b1f', boxShadow: '0 16px 40px rgba(250,204,21,0.35)'}}>
                ৳১০
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 52,
              padding: '22px 46px',
              background: 'rgba(15,28,22,0.94)',
              border: `5px solid ${GREEN}`,
              borderRadius: 26,
              textAlign: 'center',
              boxShadow: '0 24px 60px rgba(0,0,0,0.88)',
              transform: `scale(${coinIn})`,
            }}
          >
            <div style={{fontSize: 34, fontWeight: 800, color: '#cbd5e1'}}>তৈরির খরচ মাত্র</div>
            <div style={{fontSize: 78, fontWeight: 900, color: GREEN, marginTop: 4}}>৳১০–১২ টাকা!</div>
          </div>
        </div>
      );
    },
  }),

  // ৫. ডিজাইন নেই, কাজ নেই -> Supreme লোগো
  logo1: R({
    bg: 'dark',
    over: () => (
      <div style={{position: 'absolute', left: 85, right: 85, top: 430, display: 'flex', gap: 28, justifyContent: 'center'}}>
        {['ডিজাইন নেই', 'কোনো কাজ নেই'].map((lbl) => (
          <div
            key={lbl}
            style={{
              flex: 1,
              padding: '44px 20px',
              background: 'rgba(20,24,34,0.92)',
              border: `4px solid ${RED}`,
              borderRadius: 30,
              textAlign: 'center',
              boxShadow: '0 24px 70px rgba(0,0,0,0.85)',
            }}
          >
            <svg width={96} height={96} viewBox="0 0 120 120" style={{marginBottom: 16}}>
              <circle cx={60} cy={60} r={52} fill="#7f1d1d" stroke={RED} strokeWidth={6} />
              <path d="M38 38 L82 82 M82 38 L38 82" stroke="#fff" strokeWidth={12} strokeLinecap="round" />
            </svg>
            <div style={{fontSize: 44, fontWeight: 900, color: '#fecaca'}}>{lbl}</div>
          </div>
        ))}
      </div>
    ),
  }),

  logo2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/supreme-brick.jpg" dur={dur} zoom={[1.0, 1.14]} origin="50% 54%" dim={0.06} />,
    vig: 0.24,
    over: () => (
      <Bounce x={130} y={1040} at={2} seed="logotag2">
        <div
          style={{
            width: 820,
            boxSizing: 'border-box',
            padding: '20px 28px',
            background: 'rgba(127,29,29,0.92)',
            border: `4px solid ${GOLD}`,
            borderRadius: 24,
            textAlign: 'center',
            boxShadow: '0 22px 60px rgba(0,0,0,0.88)',
          }}
        >
          <div style={{fontSize: 42, fontWeight: 900, color: '#fff'}}>খোদাই করা “Supreme” লোগো</div>
        </div>
      </Bounce>
    ),
  }),

  // ৬. রিটেইল দাম: $30 → ৳৩,৫০০
  price: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/supreme-brick.jpg" dur={dur} dim={0.74} zoom={[1.08, 1.16]} origin="50% 54%" />,
    over: (_f, dur) => (
      <>
        <Bounce x={190} y={350} at={3} seed="usd30">
          <div
            style={{
              width: 700,
              padding: '28px 36px',
              background: '#fbf7ee',
              border: `7px solid ${GOLD}`,
              borderRadius: 30,
              textAlign: 'center',
              boxShadow: '0 26px 70px rgba(0,0,0,0.85)',
            }}
          >
            <div style={{fontSize: 38, fontWeight: 800, color: '#6a6e78'}}>রিটেইল দাম</div>
            <div style={{fontSize: 96, fontWeight: 900, color: '#14305f', marginTop: 4}}>$30 USD</div>
          </div>
        </Bounce>
        <div style={{position: 'absolute', left: 0, right: 0, top: 615, textAlign: 'center', fontSize: 64, fontWeight: 900, color: GOLD}}>↓</div>
        <Bounce x={190} y={715} at={Math.round(dur * 0.36)} seed="bdt3500">
          <div
            style={{
              width: 700,
              padding: '30px 36px',
              background: 'rgba(15,28,22,0.92)',
              border: `7px solid ${GREEN}`,
              borderRadius: 30,
              textAlign: 'center',
              boxShadow: '0 26px 70px rgba(0,0,0,0.85)',
            }}
          >
            <div style={{fontSize: 38, fontWeight: 800, color: '#cbd5e1'}}>বাংলাদেশি টাকায়</div>
            <div style={{fontSize: 88, fontWeight: 900, color: GREEN, marginTop: 4}}>≈ ৳৩,৫০০ টাকা</div>
          </div>
        </Bounce>
      </>
    ),
  }),

  // ৭. সাধারণত এড়িয়ে যায় -> উল্টোটা -> Sold Out!
  normal: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/brick-roadside.jpg" dur={dur} dim={0.6} pos="38% 60%" />,
    actors: [{look: Y2, x: 750, y: 1700, h: 1120, expression: 'skeptical', gesture: 'shrug', lookX: -0.8}],
    over: (f) => {
      const pop = spring({frame: f - 2, fps: 30, config: {damping: 12}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 70,
            top: 390,
            width: 540,
            padding: '28px 26px',
            background: 'rgba(15,20,30,0.92)',
            border: `4px solid ${RED}`,
            borderRadius: 26,
            boxShadow: '0 24px 70px rgba(0,0,0,0.88)',
            transform: `scale(${0.86 + 0.14 * pop})`,
            opacity: pop,
          }}
        >
          <div style={{fontSize: 46, fontWeight: 900, color: '#fecaca', lineHeight: 1.25}}>✗ অকেজো জিনিস</div>
          <div style={{fontSize: 34, fontWeight: 700, color: '#cbd5e1', marginTop: 10}}>মানুষ এড়িয়েই যায়</div>
        </div>
      );
    },
  }),

  sold1: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/streetwear-queue.jpg" dur={dur} dim={0.78} />,
    over: () => (
      <div
        style={{
          position: 'absolute',
          left: 95,
          right: 95,
          top: 390,
          background: '#111827',
          border: `5px solid ${GOLD}`,
          borderRadius: 30,
          overflow: 'hidden',
          boxShadow: '0 32px 90px rgba(0,0,0,0.9)',
        }}
      >
        <div style={{padding: '18px 26px', background: '#1f2937', display: 'flex', alignItems: 'center', gap: 14, borderBottom: '3px solid #374151'}}>
          <span style={{width: 18, height: 18, borderRadius: '50%', background: '#ef4444'}} />
          <span style={{width: 18, height: 18, borderRadius: '50%', background: '#f59e0b'}} />
          <span style={{width: 18, height: 18, borderRadius: '50%', background: '#22c55e'}} />
          <div style={{marginLeft: 14, flex: 1, padding: '8px 20px', borderRadius: 12, background: '#0f172a', color: '#94a3b8', fontSize: 28, fontWeight: 700}}>
            supremenewyork.com/drop
          </div>
        </div>
        <div style={{padding: '48px 32px', textAlign: 'center'}}>
          <div style={{fontSize: 78, fontWeight: 900, color: GOLD}}>কিন্তু ঘটল উল্টোটা!</div>
          <div style={{fontSize: 42, fontWeight: 800, color: '#cbd5e1', marginTop: 14}}>অনলাইনে ড্রপ লাইভ হতেই...</div>
        </div>
      </div>
    ),
  }),

  sold2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/supreme-brick.jpg" dur={dur} dim={0.76} />,
    over: (_f, dur) => <DropSelloutCard dur={dur} />,
  }),

  // ৮. রিসেল মার্কেট ও দামের উল্লম্ফন
  resale: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/resale-trophy.jpg" dur={dur} zoom={[1.0, 1.09]} origin="50% 52%" dim={0.1} />,
    vig: 0.24,
    over: (f, dur) => {
      const draw = interpolate(f, [4, Math.max(10, dur * 0.72)], [0, 1], clampOpts);
      return (
        <div
          style={{
            position: 'absolute',
            left: 95,
            right: 95,
            top: 290,
            padding: '22px 30px',
            background: 'rgba(11,13,18,0.9)',
            border: `4px solid ${GOLD}`,
            borderRadius: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 24px 70px rgba(0,0,0,0.9)',
          }}
        >
          <div>
            <div style={{fontSize: 30, fontWeight: 800, color: '#cbd5e1'}}>রিসেল মার্কেট</div>
            <div style={{fontSize: 48, fontWeight: 900, color: RED}}>আসল পাগলামি শুরু!</div>
          </div>
          <svg width={170} height={95} viewBox="0 0 170 95">
            <path
              d="M 10 82 Q 70 76 105 46 T 156 12"
              fill="none"
              stroke={RED}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={220}
              strokeDashoffset={220 * (1 - draw)}
            />
            <circle cx={156} cy={12} r={9} fill={GOLD} stroke="#fff" strokeWidth={3} opacity={draw > 0.85 ? 1 : 0} />
          </svg>
        </div>
      );
    },
  }),

  surge1: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/supreme-brick.jpg" dur={dur} dim={0.72} zoom={[1.06, 1.15]} origin="50% 50%" />,
    over: (_f, dur) => (
      <>
        <Bounce x={210} y={320} at={2} seed="surgefrom">
          <div
            style={{
              width: 660,
              padding: '24px 32px',
              background: 'rgba(15,20,30,0.92)',
              border: `4px solid ${GOLD}`,
              borderRadius: 26,
              textAlign: 'center',
              boxShadow: '0 22px 60px rgba(0,0,0,0.88)',
            }}
          >
            <div style={{fontSize: 34, fontWeight: 800, color: '#cbd5e1'}}>৩,৫০০ টাকার সেই একটা ইট</div>
            <div style={{fontSize: 76, fontWeight: 900, color: GOLD, marginTop: 4}}>৳৩,৫০০</div>
          </div>
        </Bounce>
        <div style={{position: 'absolute', left: 0, right: 0, top: 575, textAlign: 'center', fontSize: 66, fontWeight: 900, color: RED}}>▲</div>
        <Bounce x={210} y={670} at={Math.round(dur * 0.34)} seed="surgeto">
          <div
            style={{
              width: 660,
              padding: '26px 32px',
              background: 'rgba(69,10,10,0.94)',
              border: `5px solid ${RED}`,
              borderRadius: 28,
              textAlign: 'center',
              boxShadow: '0 26px 80px rgba(224,36,60,0.35)',
            }}
          >
            <div style={{fontSize: 34, fontWeight: 800, color: '#fecaca'}}>রিসেল দাম উঠে যাচ্ছে</div>
            <div style={{fontSize: 82, fontWeight: 900, color: '#fff', marginTop: 4}}>?? × ৩০</div>
          </div>
        </Bounce>
      </>
    ),
  }),

  surge2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="supremebrick/resale-trophy.jpg" dur={dur} dim={0.74} zoom={[1.1, 1.18]} />,
    over: (_f, dur) => (
      <StatCard
        dur={dur}
        to={100000}
        from={3500}
        pre="৳"
        post="+"
        label="রিসেল মার্কেটে দাম পৌঁছাল"
        sub="প্রায় ১ লাখ টাকারও বেশি!"
        color={RED}
        borderColor={RED}
        size={142}
        countUntil={0.62}
        subAt={0.55}
      />
    ),
  }),

  // ৯. বই, শিক্ষা, কাজ, দুই রকম মানুষ, CTA
  book1: R({
    bg: 'plain',
    over: () => (
      <Bounce x={165} y={370} at={2}>
        <div style={{width: 750, padding: '60px 44px', background: '#3a1420', border: `10px solid ${GOLD}`, borderRadius: 24, textAlign: 'center', fontWeight: 800, boxShadow: '0 32px 80px rgba(0,0,0,0.7)'}}>
          <div style={{fontSize: 74, lineHeight: 1.2, color: GOLD}}>The 48 Laws of Power</div>
          <div style={{marginTop: 26, fontSize: 48, color: '#f2efe9'}}>Robert Greene</div>
        </div>
      </Bounce>
    ),
  }),

  book2: Book2Scene,

  book3: R({
    bg: 'night',
    actors: [
      ...crowd([150, 355, 725, 930], {y: 1620, h: 880, e: 'smile'}),
      {
        look: {
          ...Y1,
          chest: (
            <g>
              <rect x={145} y={420} width={110} height={38} rx={4} fill="#dc2626" stroke="#fff" strokeWidth={4} />
            </g>
          ),
        },
        x: 540,
        y: 1660,
        h: 960,
        expression: 'smile',
        gesture: 'open',
      },
    ],
    over: (f) => {
      const pop = spring({frame: f - 2, fps: 30, config: {damping: 12}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 90,
            right: 90,
            top: 230,
            padding: '24px 28px',
            background: 'rgba(16,28,50,0.92)',
            border: `4px solid ${GOLD}`,
            borderRadius: 26,
            textAlign: 'center',
            boxShadow: '0 24px 70px rgba(0,0,0,0.8)',
            transform: `scale(${pop})`,
          }}
        >
          <div style={{fontSize: 32, fontWeight: 800, color: GOLD}}>LAW 27 · দলগত পরিচয়</div>
          <div style={{fontSize: 50, fontWeight: 900, color: '#fff', marginTop: 6}}>একটা দলের অংশ হওয়ার নেশা</div>
        </div>
      );
    },
  }),

  lesson1: R({bg: 'plain'}),

  lesson2: R({
    bg: 'plain',
    over: (f, dur) => {
      const tilt = interpolate(f, [4, Math.max(12, dur * 0.6)], [-6, 15], {
        ...clampOpts,
        easing: (t) => 1 - (1 - t) * (1 - t),
      });
      return (
        <>
          <div style={{position: 'absolute', left: 70, right: 70, top: 230, textAlign: 'center'}}>
            <div style={{fontSize: 64, fontWeight: 900, color: GOLD}}>দাম গৌণ — ব্র্যান্ডই সব</div>
            <div style={{fontSize: 38, fontWeight: 700, color: '#cbd5e1', marginTop: 10}}>পরিচয় তৈরি হলে দাম গুরুত্ব হারায়</div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 500, display: 'flex', justifyContent: 'center'}}>
            <svg width={760} height={540} viewBox="0 0 760 540" style={{overflow: 'visible'}}>
              {/* দাঁড়িপাল্লার স্তম্ভ */}
              <rect x={364} y={130} width={32} height={350} rx={10} fill="#475569" stroke={LINE} strokeWidth={5} />
              <rect x={240} y={470} width={280} height={36} rx={14} fill="#334155" stroke={LINE} strokeWidth={5} />
              <circle cx={380} cy={130} r={24} fill={GOLD} stroke={LINE} strokeWidth={5} />
              <g transform={`translate(380 130) rotate(${tilt})`}>
                <rect x={-260} y={-10} width={520} height={20} rx={10} fill={GOLD} stroke={LINE} strokeWidth={5} />
                {/* বাঁ পাল্লা: দাম (হালকা, ওপরে) */}
                <g transform={`translate(-235 10) rotate(${-tilt})`}>
                  <line x1={0} y1={0} x2={-45} y2={135} stroke="#94a3b8" strokeWidth={5} />
                  <line x1={0} y1={0} x2={45} y2={135} stroke="#94a3b8" strokeWidth={5} />
                  <rect x={-85} y={135} width={170} height={80} rx={18} fill="#1e293b" stroke="#64748b" strokeWidth={4} />
                  <text x={0} y={187} textAnchor="middle" fontSize={40} fontWeight={900} fill="#94a3b8">
                    দাম ৳
                  </text>
                </g>
                {/* ডান পাল্লা: ব্র্যান্ড নাম (ভারী, নিচে, সোনালি মুকুট) */}
                <g transform={`translate(235 10) rotate(${-tilt})`}>
                  <line x1={0} y1={0} x2={-55} y2={145} stroke={GOLD} strokeWidth={5} />
                  <line x1={0} y1={0} x2={55} y2={145} stroke={GOLD} strokeWidth={5} />
                  <rect x={-110} y={145} width={220} height={116} rx={22} fill="#7f1d1d" stroke={GOLD} strokeWidth={6} />
                  <path d="M-34 196 L-24 162 L-8 180 L0 156 L8 180 L24 162 L34 196 Z" fill={GOLD} stroke={LINE} strokeWidth={3} />
                  <text x={0} y={240} textAnchor="middle" fontSize={36} fontWeight={900} fill="#fff">
                    ব্র্যান্ড
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </>
      );
    },
  }),

  act1: R({
    bg: 'dark',
    over: (f, dur) => {
      const boxIn = spring({frame: f - 1, fps: 30, config: {damping: 12}});
      const xDraw = interpolate(f, [Math.round(dur * 0.2), Math.round(dur * 0.56)], [0, 1], clampOpts);
      return (
        <div style={{position: 'absolute', left: 0, right: 0, top: 360, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{position: 'relative', width: 380, height: 340, transform: `scale(${boxIn})`}}>
            <svg width={380} height={340} viewBox="0 0 380 340">
              <rect x={45} y={70} width={290} height={220} rx={20} fill="#c89a5a" stroke={LINE} strokeWidth={7} />
              <rect x={165} y={70} width={50} height={220} fill="#e8d6a8" stroke={LINE} strokeWidth={4} />
              <text x={190} y={205} textAnchor="middle" fontSize={52} fontWeight={900} fill="#1b1b1f">
                পণ্য
              </text>
              <line x1={55} y1={55} x2={325} y2={295} stroke={RED} strokeWidth={26} strokeLinecap="round" strokeDasharray={400} strokeDashoffset={400 * (1 - xDraw)} />
              <line x1={325} y1={55} x2={55} y2={295} stroke={RED} strokeWidth={26} strokeLinecap="round" strokeDasharray={400} strokeDashoffset={400 * (1 - xDraw)} />
            </svg>
          </div>
          <div style={{marginTop: 34, padding: '18px 44px', background: '#7f1d1d', border: `5px solid ${RED}`, borderRadius: 24, fontSize: 60, fontWeight: 900, color: '#fff', boxShadow: '0 22px 60px rgba(0,0,0,0.88)'}}>
            শুধু পণ্য বিক্রি নয়!
          </div>
        </div>
      );
    },
  }),

  act2: R({
    bg: 'plain',
    over: (f, dur) => {
      const p1 = spring({frame: f - 2, fps: 30, config: {damping: 11}});
      const p2 = spring({frame: f - Math.round(dur * 0.25), fps: 30, config: {damping: 11}});
      const cap = spring({frame: f - Math.round(dur * 0.45), fps: 30, config: {damping: 11}});
      return (
        <>
          <div style={{position: 'absolute', left: 75, right: 75, top: 370, display: 'flex', alignItems: 'center', gap: 22}}>
            <div style={{flex: 1, padding: '40px 20px', background: 'rgba(127,29,29,0.9)', border: `5px solid ${GOLD}`, borderRadius: 30, textAlign: 'center', transform: `scale(${p1})`, boxShadow: '0 24px 70px rgba(0,0,0,0.7)'}}>
              <svg width={108} height={96} viewBox="0 0 120 100" style={{marginBottom: 14}}>
                <path d="M12 20 Q60 32 60 22 Q60 32 108 20 V82 Q60 92 60 82 Q60 92 12 82 Z" fill="#fef3c7" stroke={LINE} strokeWidth={5} />
                <line x1={60} y1={22} x2={60} y2={84} stroke={LINE} strokeWidth={5} />
              </svg>
              <div style={{fontSize: 56, fontWeight: 900, color: GOLD}}>গল্প</div>
            </div>
            <div style={{fontSize: 72, fontWeight: 900, color: '#fff'}}>+</div>
            <div style={{flex: 1, padding: '40px 20px', background: 'rgba(20,83,45,0.9)', border: `5px solid ${GREEN}`, borderRadius: 30, textAlign: 'center', transform: `scale(${p2})`, boxShadow: '0 24px 70px rgba(0,0,0,0.7)'}}>
              <svg width={108} height={96} viewBox="0 0 120 120" style={{marginBottom: 14}}>
                <path d="M60 12 L106 32 V64 C106 94 84 110 60 116 C36 110 14 94 14 64 V32 Z" fill="#15803d" stroke={GOLD} strokeWidth={5} />
                <path d="M38 64 L54 80 L84 48" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{fontSize: 56, fontWeight: 900, color: '#bbf7d0'}}>বিশ্বাস</div>
            </div>
          </div>
          <div style={{position: 'absolute', left: 130, right: 130, top: 790, padding: '22px 30px', background: 'rgba(11,13,18,0.9)', border: `4px solid ${GOLD}`, borderRadius: 24, textAlign: 'center', transform: `scale(${cap})`, opacity: cap}}>
            <div style={{fontSize: 48, fontWeight: 900, color: '#fff'}}>ব্র্যান্ডের পেছনের শক্তি</div>
          </div>
        </>
      );
    },
  }),

  act3: R({
    bg: 'office',
    actors: [
      {look: Y1, x: 310, y: 1710, h: 1060, expression: 'smile', gesture: 'thumbsUp', lookX: 0.3},
      {look: WOMAN, x: 770, y: 1710, h: 1060, expression: 'smile', gesture: 'thumbsUp', lookX: -0.3},
    ],
    over: (f) => {
      const pop = spring({frame: f - 2, fps: 30, config: {damping: 11}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 100,
            right: 100,
            top: 230,
            padding: '26px 32px',
            background: 'rgba(10,36,24,0.94)',
            border: `5px solid ${GREEN}`,
            borderRadius: 28,
            textAlign: 'center',
            boxShadow: '0 24px 70px rgba(0,0,0,0.85)',
            transform: `scale(${pop})`,
          }}
        >
          <div style={{fontSize: 56, fontWeight: 900, color: '#bbf7d0'}}>আমিও এই ব্র্যান্ডের অংশ!</div>
          <div style={{fontSize: 34, fontWeight: 800, color: GOLD, marginTop: 6}}>গর্বের পরিচয়</div>
        </div>
      );
    },
  }),

  duality1: R({
    place: (
      <AbsoluteFill>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', background: 'linear-gradient(180deg, #0f172a, #020617)'}} />
        <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', background: 'linear-gradient(180deg, #450a0a, #170404)'}} />
        <div style={{position: 'absolute', left: 537, top: 0, bottom: 0, width: 6, background: GOLD, boxShadow: `0 0 24px ${GOLD}`}} />
      </AbsoluteFill>
    ),
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 10, stiffness: 160}});
      return (
        <>
          <div style={{position: 'absolute', left: 90, right: 90, top: 270, textAlign: 'center', transform: `scale(${pop})`}}>
            <span style={{display: 'inline-block', padding: '18px 42px', background: 'rgba(11,13,18,0.92)', border: `5px solid ${GOLD}`, borderRadius: 24, fontSize: 64, fontWeight: 900, color: GOLD, boxShadow: '0 22px 60px rgba(0,0,0,0.85)'}}>
              দুনিয়ায় দুই রকম মানুষ
            </span>
          </div>
          <div style={{position: 'absolute', left: 455, top: 590, width: 170, height: 170, borderRadius: '50%', background: RED, border: `7px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, fontWeight: 900, color: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.9)', transform: `scale(${pop})`}}>
            VS
          </div>
        </>
      );
    },
  }),

  duality2: R({
    bg: 'dark',
    over: (_f, dur) => <DualityVisual dur={dur} />,
  }),

  cta: () => <Cta />,
};

const Thumb: React.FC = () => (
  <PsyThumb
    l1="১০ টাকার লাল ইট"
    l2="বিক্রি হলো ১ লাখে!"
    bottom="রহস্যটা কী?"
    term="48 Laws · Law 27"
    glow="rgba(224,36,60,0.36)"
    size={80}
    art={
      <div
        style={{
          position: 'absolute',
          left: 34,
          top: 660,
          width: 590,
          height: 610,
          overflow: 'hidden',
          borderRadius: 34,
          border: `6px solid ${GOLD}`,
          boxShadow: '0 26px 80px rgba(0,0,0,0.9)',
        }}
      >
        <Img src={staticFile('supremebrick/supreme-brick.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 52%'}} />
        {/* কোণে খালিদ ফারহানের ছোট গোল ফ্রেম */}
        <div
          style={{
            position: 'absolute',
            left: 18,
            top: 18,
            width: 158,
            height: 158,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `5px solid ${GOLD}`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.85)',
          }}
        >
          <Img src={staticFile('supremebrick/khalid.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%'}} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 20,
            bottom: 20,
            padding: '10px 24px',
            borderRadius: 16,
            background: RED,
            border: `4px solid ${GOLD}`,
            fontSize: 40,
            fontWeight: 900,
            color: '#fff',
          }}
        >
          ৳১০ → ৳১,০০,০০০+
        </div>
      </div>
    }
  />
);

export const supremebrick = story('supremebrick/', raw, SCENES, Thumb, {logo: 'bba2'});
