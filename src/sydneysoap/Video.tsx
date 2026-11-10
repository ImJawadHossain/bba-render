// নায়িকার গোসলের পানি ও ২ লাখ টাকার সাবান (Law 32)। স্ক্রিপ্ট: D:\ClaudeVideo\scripts\Trending\07-sydney-sweeney-soap.md
import React from 'react';
import {AbsoluteFill, Img, Loop, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {CommentCard} from '../common/places2';
import {Bounce, Cta, R, Two, lawBook, story} from '../common/reel';
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
}> = ({src, dur, zoom = [1, 1.08], origin = '50% 40%', fit = 'cover', dim = 0, pos = '50% 50%'}) => {
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
            filter: 'blur(40px) brightness(0.45)',
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
          background: 'linear-gradient(180deg, rgba(11,13,18,0.55) 0%, rgba(11,13,18,0.06) 24%, rgba(11,13,18,0.06) 60%, rgba(11,13,18,0.9) 100%)',
        }}
      />
      {dim ? <AbsoluteFill style={{background: `rgba(5,6,10,${dim})`}} /> : null}
    </AbsoluteFill>
  );
};

// পরীমনির দেওয়া ক্লিপ (৭২০×১২৮০ ভার্টিকাল, ~৬.০২ সেকেন্ড; মিউট + লুপ)
const PoriClip: React.FC = () => (
  <AbsoluteFill style={{background: '#0b0d12', overflow: 'hidden'}}>
    <Loop durationInFrames={175}>
      <OffthreadVideo src={staticFile('sydneysoap/porimoni.mp4')} muted style={{position: 'absolute', inset: 0, width: 1080, height: 1920, objectFit: 'cover'}} />
    </Loop>
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, rgba(11,13,18,0.48) 0%, rgba(11,13,18,0.04) 22%, rgba(11,13,18,0.04) 62%, rgba(11,13,18,0.88) 100%)',
      }}
    />
    <div style={{position: 'absolute', right: 36, top: 48, display: 'flex', gap: 12, fontSize: 36, fontWeight: 800, color: '#fff'}}>
      <span style={{padding: '8px 22px', borderRadius: 14, background: '#e0243c', boxShadow: '0 4px 20px rgba(224,36,60,0.55)'}}>● পরীমনি</span>
    </div>
  </AbsoluteFill>
);

// সুন্দর গ্লাস কার্ড
const GlassBox: React.FC<{
  title: string;
  sub?: string;
  color?: string;
  borderColor?: string;
  bg?: string;
  top?: number;
  icon?: React.ReactNode;
}> = ({title, sub, color = '#fff', borderColor = 'rgba(255,255,255,0.28)', bg = 'rgba(15,20,30,0.86)', top = 410, icon}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 12}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top,
        padding: '46px 42px',
        background: bg,
        backdropFilter: 'blur(24px)',
        borderRadius: 34,
        border: `4px solid ${borderColor}`,
        boxShadow: '0 30px 90px rgba(0,0,0,0.85)',
        textAlign: 'center',
        transform: `scale(${0.86 + 0.14 * pop})`,
        opacity: pop,
      }}
    >
      {icon ? <div style={{marginBottom: 22, display: 'flex', justifyContent: 'center'}}>{icon}</div> : null}
      <div style={{fontSize: 72, fontWeight: 900, color, lineHeight: 1.28}}>{title}</div>
      {sub ? <div style={{fontSize: 44, fontWeight: 700, color: '#cbd5e1', marginTop: 18}}>{sub}</div> : null}
    </div>
  );
};

// মাঝখানে বড় সংখ্যা কার্ড (ভয়েসের গতির সাথে তাল মিলিয়ে কাউন্ট + ব্যাজ)
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
}> = ({dur, to, from = 0, pre = '', post = '', label, sub, color = GOLD, borderColor = GOLD, size = 155, countUntil = 0.62, subAt = 0.58}) => {
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
        top: 400,
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
      <div style={{fontSize: 46, fontWeight: 800, color: '#e2e8f0'}}>{label}</div>
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

// নীল পানির ফোঁটা আইকন (SVG)
const WaterDropSvg: React.FC<{size?: number}> = ({size = 170}) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 120 144" style={{filter: 'drop-shadow(0 12px 28px rgba(56,189,248,0.45))'}}>
    <path d="M60 8 C60 8 14 66 14 96 C14 122 35 140 60 140 C85 140 106 122 106 96 C106 66 60 8 60 8Z" fill="#0ea5e9" stroke={LINE} strokeWidth={5} />
    <path d="M40 86 C36 98 42 114 54 118" fill="none" stroke="#bae6fd" strokeWidth={7} strokeLinecap="round" />
  </svg>
);

// বাথওয়াটার গ্লোয়িং কার্ড (cmt2)
const BathwaterVisual: React.FC = () => (
  <div
    style={{
      width: 720,
      boxSizing: 'border-box',
      padding: '30px 36px',
      borderRadius: 34,
      background: 'rgba(12,24,42,0.9)',
      border: '4px solid #38bdf8',
      boxShadow: '0 26px 70px rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 30,
    }}
  >
    <WaterDropSvg size={120} />
    <div style={{textAlign: 'left'}}>
      <div style={{fontSize: 30, fontWeight: 800, color: '#7dd3fc', letterSpacing: 2}}>DEMAND IN COMMENTS</div>
      <div style={{fontSize: 56, fontWeight: 900, color: '#fff', lineHeight: 1.15, marginTop: 8}}>বাথটাবের পানি!</div>
    </div>
  </div>
);

// ছোট সাবানের বার (SVG)
const SoapBarSvg: React.FC<{size?: number}> = ({size = 150}) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 160 116" style={{filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.5))'}}>
    <rect x={8} y={24} width={144} height={78} rx={24} fill="#3f6e74" stroke={LINE} strokeWidth={5} />
    <rect x={22} y={36} width={116} height={54} rx={16} fill="none" stroke="#99cbd0" strokeWidth={3} />
    <circle cx={44} cy={22} r={10} fill="#e0f2fe" stroke={LINE} strokeWidth={3} />
    <circle cx={120} cy={18} r={14} fill="#e0f2fe" stroke={LINE} strokeWidth={3} />
    <circle cx={136} cy={42} r={8} fill="#e0f2fe" stroke={LINE} strokeWidth={3} />
  </svg>
);

// সোনার মুদ্রা (SVG)
const MoneyBadgeSvg: React.FC<{size?: number}> = ({size = 140}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{filter: 'drop-shadow(0 10px 28px rgba(227,191,122,0.5))'}}>
    <circle cx={60} cy={60} r={52} fill={GOLD} stroke={LINE} strokeWidth={5} />
    <circle cx={60} cy={60} r={40} fill="none" stroke="#a67c2e" strokeWidth={4} />
    <text x={60} y={78} textAnchor="middle" fontSize={56} fontWeight={900} fill="#3b2504">
      ৳
    </text>
  </svg>
);

// টুইস্ট: [long pause] পরে "টুইস্ট → পাগলামি → প্রোডাক্ট → ব্যবসা!" ভয়েসের তালে
const TwistFlow: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const s0 = spring({frame: f - Math.round(dur * 0.14), fps: 30, config: {damping: 11}});
  const s1 = spring({frame: f - Math.round(dur * 0.18), fps: 30, config: {damping: 11}});
  const s2 = spring({frame: f - Math.round(dur * 0.42), fps: 30, config: {damping: 11}});
  const s3 = spring({frame: f - Math.round(dur * 0.66), fps: 30, config: {damping: 11}});
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 110,
          right: 110,
          top: 330,
          padding: '28px 36px',
          background: 'rgba(15,20,30,0.88)',
          border: `4px solid ${GOLD}`,
          borderRadius: 28,
          textAlign: 'center',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
          transform: `scale(${0.9 + 0.1 * s0})`,
          opacity: 0.35 + 0.65 * s0,
        }}
      >
        <div style={{fontSize: 56, fontWeight: 900, color: GOLD}}>Dr. Squatch × Sydney</div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 70,
          right: 70,
          top: 565,
          padding: '48px 30px',
          background: 'rgba(12,16,24,0.88)',
          border: '3px solid rgba(255,255,255,0.2)',
          borderRadius: 34,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          boxShadow: '0 28px 80px rgba(0,0,0,0.85)',
        }}
      >
        <div style={{textAlign: 'center', transform: `scale(${0.85 + 0.15 * s1})`, opacity: 0.25 + 0.75 * s1}}>
          <WaterDropSvg size={110} />
          <div style={{fontSize: 38, fontWeight: 800, color: '#bae6fd', marginTop: 14}}>পাগলামি</div>
        </div>
        <div style={{fontSize: 64, fontWeight: 900, color: GOLD, opacity: 0.25 + 0.75 * s2}}>→</div>
        <div style={{textAlign: 'center', transform: `scale(${0.85 + 0.15 * s2})`, opacity: 0.25 + 0.75 * s2}}>
          <SoapBarSvg size={150} />
          <div style={{fontSize: 38, fontWeight: 800, color: '#f2efe9', marginTop: 14}}>প্রোডাক্ট</div>
        </div>
        <div style={{fontSize: 64, fontWeight: 900, color: GOLD, opacity: 0.25 + 0.75 * s3}}>→</div>
        <div style={{textAlign: 'center', transform: `scale(${0.85 + 0.15 * s3})`, opacity: 0.25 + 0.75 * s3}}>
          <MoneyBadgeSvg size={120} />
          <div style={{fontSize: 38, fontWeight: 800, color: GOLD, marginTop: 14}}>ব্যবসা!</div>
        </div>
      </div>
    </>
  );
};

// সাবানের আসল ছবি শোকেস (soap)
const SoapShowcase: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, dur], [1.0, 1.09], clampOpts);
  const pop = spring({frame: f - 2, fps: 30, config: {damping: 12}});
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 265, textAlign: 'center', transform: `scale(${pop})`}}>
        <span
          style={{
            display: 'inline-block',
            padding: '10px 36px',
            background: '#78350f',
            border: `4px solid ${GOLD}`,
            borderRadius: 99,
            fontSize: 38,
            fontWeight: 900,
            color: GOLD,
            letterSpacing: 3,
          }}
        >
          LIMITED EDITION SOAP
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 165,
          top: 365,
          width: 750,
          height: 750,
          borderRadius: 36,
          overflow: 'hidden',
          border: `6px solid ${GOLD}`,
          boxShadow: '0 34px 96px rgba(0,0,0,0.9)',
          transform: `scale(${0.9 + 0.1 * pop})`,
        }}
      >
        <Img src={staticFile('sydneysoap/soap.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${z})`}} />
      </div>
    </>
  );
};

// আসল সার্টিফিকেট কার্ড (cert) — "সার্টিফিকেটও!" কথায় সিল পড়ে
const CertCard: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const cardPop = spring({frame: f - 2, fps: 30, config: {damping: 12}});
  const sealPop = spring({frame: f - Math.round(dur * 0.76), fps: 30, config: {damping: 9, stiffness: 180}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 95,
        top: 340,
        width: 890,
        height: 690,
        background: '#fbf7ee',
        border: `8px solid ${GOLD}`,
        borderRadius: 28,
        padding: 36,
        boxSizing: 'border-box',
        boxShadow: '0 32px 90px rgba(0,0,0,0.85)',
        transform: `scale(${0.86 + 0.14 * cardPop})`,
        opacity: cardPop,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '4px solid #b88a30',
          borderRadius: 18,
          padding: '38px 42px',
          boxSizing: 'border-box',
          textAlign: 'center',
          position: 'relative',
          color: '#1b1b1f',
        }}
      >
        <div style={{fontSize: 32, fontWeight: 900, color: '#9a6d18', letterSpacing: 4}}>CERTIFICATE OF AUTHENTICITY</div>
        <div style={{height: 4, width: 280, background: '#d4af37', margin: '22px auto'}} />
        <div style={{fontSize: 66, fontWeight: 900, color: '#14305f', lineHeight: 1.25, marginTop: 18}}>আসল গোসলের পানি মিশ্রিত</div>
        <div style={{fontSize: 40, fontWeight: 800, color: '#3a3e48', marginTop: 22}}>Dr. Squatch × Sydney Sweeney</div>
        <div style={{fontSize: 32, fontWeight: 700, color: '#6a6e78', marginTop: 12}}>Limited Edition Bathwater Bliss</div>

        <div style={{position: 'absolute', left: 48, bottom: 44, textAlign: 'left'}}>
          <div style={{width: 240, height: 3, background: '#14305f', marginBottom: 10}} />
          <div style={{fontSize: 26, fontWeight: 800, color: '#475569'}}>OFFICIAL AUTHENTIC BATCH</div>
        </div>

        {/* ভেরিফায়েড সিল স্ট্যাম্প */}
        <div
          style={{
            position: 'absolute',
            right: 44,
            bottom: 32,
            transform: `scale(${sealPop}) rotate(-10deg)`,
            opacity: sealPop,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '14px 26px',
            borderRadius: 22,
            background: '#14532d',
            border: `5px solid ${GOLD}`,
            color: '#fff',
            boxShadow: '0 14px 34px rgba(0,0,0,0.35)',
          }}
        >
          <svg width={56} height={56} viewBox="0 0 60 60">
            <circle cx={30} cy={30} r={27} fill={GOLD} stroke="#fff" strokeWidth={3} />
            <path d="M17 31 L26 40 L44 21" fill="none" stroke="#14532d" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{fontSize: 40, fontWeight: 900}}>VERIFIED</span>
        </div>
      </div>
    </div>
  );
};

// সোল্ড আউট + স্টক শেষ বার (crash Part A: [short pause] শেষে দ্রুত শেষ হয় "সব শেষ!" কথায়)
const StockDeplete: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const start = Math.max(4, Math.round(dur * 0.1));
  const limit = Math.max(start + 8, Math.round(dur * 0.4));
  const pct = interpolate(f, [start, limit], [100, 0], clampOpts);
  const count = Math.round((pct / 100) * 5000);
  const stamp = spring({frame: f - Math.round(dur * 0.36), fps: 30, config: {damping: 9}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 90,
        right: 90,
        top: 380,
        padding: '44px 44px',
        background: 'rgba(15,20,30,0.9)',
        border: `4px solid ${RED}`,
        borderRadius: 34,
        boxShadow: '0 30px 90px rgba(0,0,0,0.85)',
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 42, fontWeight: 800, color: '#cbd5e1'}}>অনলাইন স্টক</div>
      <div style={{fontSize: 112, fontWeight: 900, color: count === 0 ? RED : GOLD, marginTop: 10}}>
        {count.toLocaleString('en-US')} পিস
      </div>
      <div style={{height: 34, background: '#1e293b', borderRadius: 18, overflow: 'hidden', border: '3px solid #334155', marginTop: 22}}>
        <div style={{width: `${pct}%`, height: '100%', background: pct > 35 ? GOLD : RED, borderRadius: 14}} />
      </div>
      <div
        style={{
          marginTop: 34,
          display: 'inline-block',
          padding: '12px 46px',
          background: '#7f1d1d',
          border: `6px solid ${RED}`,
          borderRadius: 18,
          fontSize: 66,
          fontWeight: 900,
          color: '#fff',
          transform: `scale(${stamp}) rotate(-4deg)`,
          opacity: stamp,
        }}
      >
        SOLD OUT!
      </div>
    </div>
  );
};

// ব্রাউজার ক্র্যাশ উইন্ডো (crash Part B)
const BrowserCrash: React.FC = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 95,
        right: 95,
        top: 360,
        background: '#111827',
        border: `5px solid ${RED}`,
        borderRadius: 30,
        overflow: 'hidden',
        boxShadow: '0 32px 90px rgba(0,0,0,0.88)',
        transform: `scale(${0.88 + 0.12 * pop})`,
      }}
    >
      <div style={{padding: '18px 26px', background: '#1f2937', display: 'flex', alignItems: 'center', gap: 14, borderBottom: '3px solid #374151'}}>
        <span style={{width: 20, height: 20, borderRadius: '50%', background: '#ef4444'}} />
        <span style={{width: 20, height: 20, borderRadius: '50%', background: '#f59e0b'}} />
        <span style={{width: 20, height: 20, borderRadius: '50%', background: '#22c55e'}} />
        <div style={{marginLeft: 18, flex: 1, padding: '8px 22px', borderRadius: 12, background: '#0f172a', color: '#94a3b8', fontSize: 30, fontWeight: 700}}>
          drsquatch.com/bathwater-bliss
        </div>
      </div>
      <div style={{padding: '50px 36px', textAlign: 'center'}}>
        <svg width={150} height={135} viewBox="0 0 120 108" style={{marginBottom: 16}}>
          <path d="M60 8 L114 100 L6 100 Z" fill="#dc2626" stroke="#fff" strokeWidth={5} strokeLinejoin="round" />
          <rect x={55} y={36} width={10} height={34} rx={4} fill="#fff" />
          <circle cx={60} cy={84} r={6} fill="#fff" />
        </svg>
        <div style={{fontSize: 84, fontWeight: 900, color: '#f87171'}}>502 ERROR</div>
        <div style={{fontSize: 48, fontWeight: 800, color: '#f2efe9', marginTop: 12}}>মানুষের চাপে ওয়েবসাইট ক্র্যাশ!</div>
      </div>
    </div>
  );
};

// রিসেল মার্কেট গ্রাফ কার্ড (resale)
const ResaleChartCard: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [2, Math.max(10, dur * 0.68)], [0, 1], clampOpts);
  const pop = spring({frame: f - 1, fps: 30, config: {damping: 12}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 95,
        right: 95,
        top: 345,
        padding: '42px 36px',
        background: 'rgba(15,20,30,0.9)',
        border: `4px solid ${GOLD}`,
        borderRadius: 34,
        boxShadow: '0 30px 90px rgba(0,0,0,0.85)',
        textAlign: 'center',
        transform: `scale(${0.88 + 0.12 * pop})`,
      }}
    >
      <div style={{fontSize: 48, fontWeight: 900, color: GOLD}}>রিসেল মার্কেটে দামের উল্লম্ফন</div>
      <svg width={760} height={340} viewBox="0 0 760 340" style={{marginTop: 18}}>
        <line x1={60} y1={290} x2={720} y2={290} stroke="#475569" strokeWidth={5} />
        <line x1={60} y1={30} x2={60} y2={290} stroke="#475569" strokeWidth={5} />
        <path
          d="M 80 265 Q 280 250 420 185 T 690 48"
          fill="none"
          stroke={RED}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={760}
          strokeDashoffset={760 * (1 - draw)}
        />
        <circle cx={690} cy={48} r={18} fill={GOLD} stroke="#fff" strokeWidth={4} opacity={draw > 0.9 ? 1 : 0} />
      </svg>
      <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 36px', fontSize: 44, fontWeight: 900}}>
        <span style={{color: '#cbd5e1'}}>৳১,০০০</span>
        <span style={{color: RED}}>৳ ???</span>
      </div>
    </div>
  );
};

// অ্যাক্টের প্রোডাক্ট + ভালোবাসার হৃদয় (SVG)
const BrandHeartSvg: React.FC = () => (
  <svg width={170} height={150} viewBox="0 0 180 160" style={{filter: 'drop-shadow(0 12px 30px rgba(34,197,94,0.4))'}}>
    <rect x={28} y={64} width={124} height={86} rx={14} fill="#14532d" stroke={GOLD} strokeWidth={5} />
    <line x1={90} y1={64} x2={90} y2={150} stroke={GOLD} strokeWidth={5} />
    <path
      d="M90 60 C90 60 52 34 52 16 C52 5 64 -2 76 6 C82 10 87 17 90 22 C93 17 98 10 104 6 C116 -2 128 5 128 16 C128 34 90 60 90 60 Z"
      fill={RED}
      stroke="#fff"
      strokeWidth={4}
    />
  </svg>
);

// হুক ২-এর দুই অংশ (উপরের আলাদা টাইটেল টেক্সট বাদ)
const H2PartA = R({
  place: DarkBase,
  back: (_f, dur) => <Photo src="sydneysoap/bathtub.webp" dur={dur} dim={0.72} pos="65% 35%" />,
  over: () => (
    <GlassBox
      title="গোসলের পানি কে কিনবে?!"
      sub="শুনতে অবাস্তব লাগলেও..."
      color={GOLD}
      borderColor={GOLD}
      top={410}
      icon={
        <svg width={120} height={120} viewBox="0 0 120 120">
          <circle cx={60} cy={60} r={54} fill="#7f1d1d" stroke={GOLD} strokeWidth={5} />
          <text x={60} y={85} textAnchor="middle" fontSize={76} fontWeight={900} fill="#fff">
            ?
          </text>
        </svg>
      }
    />
  ),
});

const H2PartB = R({
  place: DarkBase,
  back: (_f, dur) => <Photo src="sydneysoap/bathtub.webp" dur={dur} dim={0.72} pos="65% 35%" />,
  over: () => (
    <GlassBox
      title="আমেরিকায় ঠিক এমনটাই ঘটে!"
      sub="একজন জনপ্রিয় অভিনেত্রীর সাথে"
      color="#fee2e2"
      borderColor={RED}
      bg="rgba(45,10,16,0.9)"
      top={410}
      icon={
        <svg width={120} height={120} viewBox="0 0 120 120">
          <circle cx={60} cy={60} r={54} fill={RED} stroke="#fff" strokeWidth={5} />
          <text x={60} y={84} textAnchor="middle" fontSize={76} fontWeight={900} fill="#fff">
            !
          </text>
        </svg>
      }
    />
  ),
});

// ক্র্যাশের দুই অংশ
const CrashPartA = R({
  place: DarkBase,
  back: (_f, dur) => <Photo src="sydneysoap/soap.jpg" dur={dur} dim={0.75} />,
  over: (_f, dur) => <StockDeplete dur={dur} />,
});

const CrashPartB = R({
  place: DarkBase,
  back: (_f, dur) => <Photo src="sydneysoap/soap.jpg" dur={dur} dim={0.78} />,
  over: () => <BrowserCrash />,
});

const SCENES: Record<string, React.FC<SP>> = {
  // ১. হুক (শুধু ক্লিপ + নিচের সাবটাইটেল, ওপরে বাড়তি টেক্সট নেই)
  h1: R({
    place: <PoriClip />,
    vig: 0.2,
  }),

  h2: Two(H2PartA, H2PartB, 0.39),

  // ২. পরিচিতি ও বাথটাবের অ্যাড
  syd: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/sydney.jpg" dur={dur} zoom={[1.0, 1.12]} pos="50% 25%" origin="50% 35%" dim={0.08} />,
    vig: 0.22,
    over: (_f, dur) => (
      <Bounce x={170} y={1045} at={Math.round(dur * 0.16)} seed="sydtag">
        <div
          style={{
            width: 740,
            boxSizing: 'border-box',
            padding: '22px 30px',
            background: 'rgba(12,16,24,0.88)',
            border: `4px solid ${GOLD}`,
            borderRadius: 26,
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.82)',
          }}
        >
          <div style={{fontSize: 58, fontWeight: 900, color: '#fff', lineHeight: 1.1}}>Sydney Sweeney</div>
          <div style={{fontSize: 38, fontWeight: 800, color: GOLD, marginTop: 8}}>আমেরিকার জনপ্রিয় অভিনেত্রী</div>
        </div>
      </Bounce>
    ),
  }),

  ad: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/bathtub.webp" dur={dur} dim={0.7} pos="65% 35%" />,
    over: (f, dur) => {
      const z = interpolate(f, [0, dur], [1.0, 1.07], clampOpts);
      return (
        <>
          <div
            style={{
              position: 'absolute',
              left: 60,
              top: 260,
              width: 960,
              height: 540,
              borderRadius: 28,
              overflow: 'hidden',
              border: `5px solid ${GOLD}`,
              boxShadow: '0 28px 80px rgba(0,0,0,0.85)',
            }}
          >
            <Img src={staticFile('sydneysoap/bathtub.webp')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${z})`}} />
          </div>
          <Bounce x={220} y={840} at={Math.round(dur * 0.32)} seed="adthumb">
            <div
              style={{
                width: 640,
                height: 360,
                borderRadius: 24,
                overflow: 'hidden',
                border: '4px solid #fff',
                boxShadow: '0 24px 70px rgba(0,0,0,0.88)',
              }}
            >
              <Img src={staticFile('sydneysoap/ad-thumb.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
          </Bounce>
        </>
      );
    },
  }),

  // ৩. কমেন্ট বক্সে পাগলামি
  cmt1: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/bathtub.webp" dur={dur} dim={0.74} pos="65% 35%" />,
    over: (_f, dur) => (
      <>
        <Bounce x={90} y={320} at={Math.round(dur * 0.14)} seed="c1">
          <CommentCard name="Rakibul Islam" text="ভাই এই সাবানটার দাম কত?!" w={820} size={42} rot={-1.5} />
        </Bounce>
        <Bounce x={165} y={565} at={Math.round(dur * 0.43)} seed="c2">
          <CommentCard name="Nafis Ahmed" text="পুরা কমেন্টে দেখি পাগলামি!" w={820} size={42} rot={1.2} />
        </Bounce>
        <Bounce x={90} y={810} at={Math.round(dur * 0.72)} seed="c3">
          <CommentCard name="Sabbir Hossain" text="সাবান না, ওই পানিটাই চাই!" w={860} size={42} rot={-1} bad />
        </Bounce>
      </>
    ),
  }),

  cmt2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/ad-thumb.jpg" dur={dur} dim={0.75} pos="50% 50%" />,
    over: (_f, dur) => (
      <>
        <Bounce x={100} y={315} at={4} seed="cmbig">
          <CommentCard name="হাজার হাজার কমেন্ট" text="“সাবান নয়, আমাদের চাই ওই বাথটাবের পানি!”" w={880} size={50} bad />
        </Bounce>
        <Bounce x={180} y={710} at={Math.round(dur * 0.56)} seed="water">
          <BathwaterVisual />
        </Bounce>
      </>
    ),
  }),

  norm: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/sydney.jpg" dur={dur} dim={0.72} pos="50% 25%" />,
    over: () => (
      <GlassBox
        title="সাধারণ তারকারা পাত্তা দেন না"
        sub="এমন অদ্ভুত আবদার এড়িয়েই যান"
        color="#f2efe9"
        borderColor={RED}
        top={410}
        icon={
          <svg width={130} height={130} viewBox="0 0 120 120">
            <circle cx={60} cy={60} r={54} fill="#7f1d1d" stroke={RED} strokeWidth={6} />
            <path d="M38 38 L82 82 M82 38 L38 82" stroke="#fff" strokeWidth={12} strokeLinecap="round" />
          </svg>
        }
      />
    ),
  }),

  // ৪. আসল টুইস্ট ও লিমিটেড সাবান
  twist: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/bathtub.webp" dur={dur} dim={0.74} pos="65% 35%" />,
    over: (_f, dur) => <TwistFlow dur={dur} />,
  }),

  soap: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/soap.jpg" dur={dur} dim={0.72} zoom={[1.04, 1.12]} />,
    over: (_f, dur) => <SoapShowcase dur={dur} />,
  }),

  cert: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/soap.jpg" dur={dur} dim={0.76} />,
    over: (_f, dur) => <CertCard dur={dur} />,
  }),

  // ৫. সংখ্যা, দাম, ক্র্যাশ ও রিসেল মার্কেট
  qty: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/soap.jpg" dur={dur} dim={0.74} />,
    over: (_f, dur) => <StatCard dur={dur} to={5000} post=" পিস" label="তৈরি হলো মাত্র" sub="লিমিটেড স্টক!" color={GOLD} borderColor={GOLD} size={155} countUntil={0.62} subAt={0.5} />,
  }),

  price: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/ad-thumb.jpg" dur={dur} dim={0.74} pos="50% 50%" />,
    over: (_f, dur) => (
      <>
        <Bounce x={190} y={350} at={4} seed="usd">
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
            <div style={{fontSize: 38, fontWeight: 800, color: '#6a6e78'}}>অফিশিয়াল রিটেইল দাম</div>
            <div style={{fontSize: 96, fontWeight: 900, color: '#14305f', marginTop: 4}}>$8 USD</div>
          </div>
        </Bounce>
        <div style={{position: 'absolute', left: 0, right: 0, top: 615, textAlign: 'center', fontSize: 64, fontWeight: 900, color: GOLD}}>↓</div>
        <Bounce x={190} y={715} at={Math.round(dur * 0.56)} seed="bdt">
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
            <div style={{fontSize: 88, fontWeight: 900, color: GREEN, marginTop: 4}}>≈ ১,০০০ টাকা</div>
          </div>
        </Bounce>
      </>
    ),
  }),

  crash: Two(CrashPartA, CrashPartB, 0.55),

  resale: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/sydney.jpg" dur={dur} dim={0.74} pos="50% 25%" />,
    over: (_f, dur) => <ResaleChartCard dur={dur} />,
  }),

  surge: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/soap.jpg" dur={dur} dim={0.74} />,
    over: (_f, dur) => (
      <StatCard dur={dur} to={200000} from={1000} pre="৳" label="১,০০০ টাকার সাবান পৌঁছাল" sub="প্রায় ২ লাখ টাকা!" color={RED} borderColor={RED} size={145} countUntil={0.68} subAt={0.62} />
    ),
  }),

  // ৬. বই, শিক্ষা, কাজ ও CTA
  book: lawBook(32),
  lesson: R({bg: 'plain'}),

  act: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="sydneysoap/bathtub.webp" dur={dur} dim={0.74} pos="65% 35%" />,
    over: () => (
      <GlassBox
        title="তোমার পণ্যে অনুভূতি যোগ হচ্ছে তো?"
        sub="শুধু প্রোডাক্ট নয়—মানুষের আবেগ জুড়লেই দাম বাড়ে"
        color="#bbf7d0"
        borderColor="#22c55e"
        bg="rgba(10,25,18,0.92)"
        top={380}
        icon={<BrandHeartSvg />}
      />
    ),
  }),

  cta: () => <Cta />,
};

const Thumb: React.FC = () => (
  <PsyThumb
    l1="গোসলের পানিতে"
    l2="২ লাখ টাকার সাবান!"
    bottom="কীভাবে হলো?"
    term="48 Laws · Law 32"
    glow="rgba(224,36,60,0.34)"
    art={
      <div
        style={{
          position: 'absolute',
          left: 34,
          top: 680,
          width: 590,
          height: 590,
          overflow: 'hidden',
          borderRadius: 34,
          border: `6px solid ${GOLD}`,
          boxShadow: '0 26px 80px rgba(0,0,0,0.88)',
        }}
      >
        <Img src={staticFile('sydneysoap/soap.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            padding: '10px 24px',
            borderRadius: 16,
            background: RED,
            border: `4px solid ${GOLD}`,
            fontSize: 40,
            fontWeight: 900,
            color: '#fff',
          }}
        >
          $8 → ৳২ লাখ
        </div>
      </div>
    }
    size={80}
  />
);

export const sydneysoap = story('sydneysoap/', raw, SCENES, Thumb, {logo: 'bba2'});
