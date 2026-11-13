// চার অক্ষরের ডোমেইন shop.com কিনে Amazon-কে টক্কর — Shopify-এর বিজনেস গেম। স্ক্রিপ্ট: D:\ClaudeVideo\scripts\Trending\09-shopify-shop-com.md
// নোট: ৪১টি দ্রুত দৃশ্য (২.০৮–৫.০০ সে/দৃশ্য) ও ১–২ লাইন ক্যাপশন; Cartesia sonic-3.6 (Professor bn) + Scribe word-level timing.json
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {Backdrop, SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Bounce, Cta, R, Two, WOMAN, Y1, Y2, story} from '../common/reel';
import raw from './segments.json';

const EMERALD = '#10b981';
const AMBER = '#f59e0b';
const LINE = '#1b1b1f';
const DarkBase = <AbsoluteFill style={{background: '#080c12'}} />;
const BN = '০১২৩৪৫৬৭৮৯';
const bn = (n: number) => n.toLocaleString('en-IN').replace(/\d/g, (d) => BN[Number(d)]);

// ছবি পুরো পর্দায় + Ken Burns জুম ও অন্ধকার ভিনিয়েট (লোগো ও ক্যাপশনের জায়গা পরিষ্কার রেখে)
const Photo: React.FC<{
  src: string;
  dur: number;
  zoom?: [number, number];
  origin?: string;
  dim?: number;
  pos?: string;
}> = ({src, dur, zoom = [1, 1.09], origin = '50% 48%', dim = 0, pos = '50% 50%'}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, clampOpts);
  return (
    <AbsoluteFill style={{background: '#080c12', overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{
          position: 'absolute',
          inset: 0,
          width: 1080,
          height: 1920,
          objectFit: 'cover',
          objectPosition: pos,
          transform: `scale(${z})`,
          transformOrigin: origin,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(8,12,18,0.55) 0%, rgba(8,12,18,0.05) 24%, rgba(8,12,18,0.05) 58%, rgba(8,12,18,0.93) 100%)',
        }}
      />
      {dim ? <AbsoluteFill style={{background: `rgba(5,8,14,${dim})`}} /> : null}
    </AbsoluteFill>
  );
};

// অ্যানিমেটেড সংখ্যা কাউন্টার কার্ড
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
  badge?: React.ReactNode;
}> = ({dur, to, from = 0, pre = '', post = '', label, sub, color = GOLD, borderColor = EMERALD, size = 148, badge}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
  const subPop = spring({frame: f - Math.round(dur * 0.48), fps: 30, config: {damping: 10}});
  const v = Math.round(
    interpolate(f, [2, Math.max(5, dur * 0.58)], [from, to], {
      ...clampOpts,
      easing: (t) => 1 - (1 - t) * (1 - t),
    }),
  );
  return (
    <div
      style={{
        position: 'absolute',
        left: 72,
        right: 72,
        top: 340,
        padding: '44px 36px',
        background: 'rgba(10,16,24,0.9)',
        backdropFilter: 'blur(22px)',
        borderRadius: 36,
        border: `4px solid ${borderColor}`,
        boxShadow: '0 30px 90px rgba(0,0,0,0.88)',
        textAlign: 'center',
        transform: `scale(${0.88 + 0.12 * pop})`,
        opacity: pop,
      }}
    >
      {badge ? <div style={{marginBottom: 14, display: 'flex', justifyContent: 'center'}}>{badge}</div> : null}
      <div style={{fontSize: 42, fontWeight: 800, color: '#cbd5e1'}}>{label}</div>
      <div style={{fontSize: size, fontWeight: 900, color, marginTop: 8, lineHeight: 1.12, textShadow: '0 10px 36px rgba(0,0,0,0.75)'}}>
        {pre}
        {bn(v)}
        {post}
      </div>
      <div
        style={{
          marginTop: 24,
          display: 'inline-block',
          padding: '12px 34px',
          borderRadius: 99,
          background: 'rgba(255,255,255,0.08)',
          border: `3px solid ${color}`,
          fontSize: 40,
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

// Shopify শপিং ব্যাগ আইকন (SVG)
const ShopifyBag: React.FC<{size?: number}> = ({size = 96}) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 100 110" style={{filter: 'drop-shadow(0 8px 20px rgba(16,185,129,0.4))'}}>
    <path d="M35 28 C35 12, 65 12, 65 28" fill="none" stroke="#95bf47" strokeWidth={8} strokeLinecap="round" />
    <polygon points="18,28 82,28 90,102 10,102" fill="#5e8e3e" stroke={LINE} strokeWidth={4} strokeLinejoin="round" />
    <polygon points="18,28 72,28 65,102 10,102" fill="#95bf47" stroke={LINE} strokeWidth={4} strokeLinejoin="round" />
    <text x={42} y={78} textAnchor="middle" fontSize={44} fontWeight={900} fill="#ffffff">
      S
    </text>
  </svg>
);

// পথ নম্বর ব্যাজ পিল (#১, #২, #৩)
const PillarTag: React.FC<{num: string; label: string; color?: string}> = ({num, label, color = EMERALD}) => (
  <div
    style={{
      position: 'absolute',
      right: 54,
      top: 132,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '10px 26px',
      borderRadius: 99,
      background: 'rgba(10,16,24,0.92)',
      border: `4px solid ${color}`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
    }}
  >
    <span style={{padding: '4px 14px', borderRadius: 99, background: color, color: '#081018', fontSize: 32, fontWeight: 900}}>{num}</span>
    <span style={{fontSize: 34, fontWeight: 800, color: '#fff'}}>{label}</span>
  </div>
);

// prob3 দুই ধাপ: বিচ্ছিন্ন দোকান এড়িয়ে যায় -> সোজা Amazon-এ
const ProbScatteredPart = R({
  bg: 'dark',
  over: (f) => {
    const sites = ['shoebox.net', 'watchhub.co', 'wearmart.org', 'stylebd.shop'];
    return (
      <div style={{position: 'absolute', left: 85, right: 85, top: 310}}>
        <div style={{textAlign: 'center', fontSize: 44, fontWeight: 900, color: '#cbd5e1', marginBottom: 30}}>আলাদা শপ খুঁজে বেড়ায় না!</div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
          {sites.map((s, idx) => {
            const p = spring({frame: f - idx * 4, fps: 30, config: {damping: 12}});
            const xOp = interpolate(f, [18 + idx * 3, 28 + idx * 3], [0, 1], clampOpts);
            return (
              <div
                key={s}
                style={{
                  position: 'relative',
                  padding: '38px 20px',
                  background: '#131b26',
                  border: '3px solid #334155',
                  borderRadius: 24,
                  textAlign: 'center',
                  transform: `scale(${0.86 + 0.14 * p})`,
                  opacity: p,
                }}
              >
                <div style={{fontSize: 30, fontWeight: 800, color: '#94a3b8'}}>{s}</div>
                <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: xOp, fontSize: 74, fontWeight: 900, color: RED}}>
                  ✗
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});

const ProbAmazonPart = R({
  place: DarkBase,
  back: (_f, dur) => <Photo src="shopify/rivalry.jpg" dur={dur} dim={0.62} zoom={[1.04, 1.14]} origin="50% 35%" />,
  over: (f) => {
    const pop = spring({frame: f - 1, fps: 30, config: {damping: 10, stiffness: 170}});
    return (
      <div
        style={{
          position: 'absolute',
          left: 110,
          right: 110,
          top: 380,
          padding: '44px 36px',
          background: 'rgba(24,16,8,0.94)',
          border: `6px solid ${AMBER}`,
          borderRadius: 34,
          textAlign: 'center',
          boxShadow: '0 30px 90px rgba(245,158,11,0.35)',
          transform: `scale(${pop})`,
        }}
      >
        <div style={{fontSize: 36, fontWeight: 800, color: '#fde68a'}}>ক্রেতাদের সোজা গন্তব্য</div>
        <div style={{fontSize: 104, fontWeight: 900, color: '#fff', letterSpacing: -1, marginTop: 8}}>amazon</div>
        <svg width={320} height={46} viewBox="0 0 320 46">
          <path d="M24 10 Q160 44 290 12" fill="none" stroke={AMBER} strokeWidth={11} strokeLinecap="round" />
          <polygon points="274,2 308,12 284,30" fill={AMBER} />
        </svg>
      </div>
    );
  },
});

// দ্বীপ থেকে এক সুতোয় (thread1 ও thread2)
const IslandThreads: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [2, Math.max(8, dur * 0.72)], [0, 1], clampOpts);
  const nodes = [
    [180, 340],
    [880, 360],
    [150, 690],
    [920, 680],
    [220, 1020],
    [850, 1000],
  ];
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {nodes.map(([nx, ny], i) => (
          <line
            key={i}
            x1={nx}
            y1={ny}
            x2={540}
            y2={680}
            stroke={EMERALD}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={650}
            strokeDashoffset={650 * (1 - draw)}
            opacity={0.9}
          />
        ))}
        {nodes.map(([nx, ny], i) => (
          <g key={`n${i}`} transform={`translate(${nx} ${ny})`}>
            <circle r={42} fill="#0f172a" stroke={GOLD} strokeWidth={5} />
            <rect x={-18} y={-14} width={36} height={28} rx={4} fill={GOLD} />
          </g>
        ))}
        <circle cx={540} cy={680} r={88 + 20 * draw} fill="rgba(16,185,129,0.22)" stroke={EMERALD} strokeWidth={6} />
        <circle cx={540} cy={680} r={54} fill="#065f46" stroke={GOLD} strokeWidth={5} />
      </svg>
      <div style={{position: 'absolute', left: 160, right: 160, top: 205, padding: '16px 24px', borderRadius: 20, background: 'rgba(8,14,22,0.9)', border: `3px solid ${GOLD}`, textAlign: 'center'}}>
        <div style={{fontSize: 40, fontWeight: 900, color: GOLD}}>সব শপ এক সুতোয় বাঁধা!</div>
      </div>
    </AbsoluteFill>
  );
};

// ৪০০ কোটি vs হাজার কোটি দাঁড়িপাল্লা (outro1)
const EmpireScale: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const tilt = interpolate(f, [4, Math.max(12, dur * 0.62)], [-8, 16], {
    ...clampOpts,
    easing: (t) => 1 - (1 - t) * (1 - t),
  });
  return (
    <>
      <div style={{position: 'absolute', left: 70, right: 70, top: 220, textAlign: 'center'}}>
        <div style={{fontSize: 60, fontWeight: 900, color: GOLD}}>৪০০ কোটি → হাজার কোটি!</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center'}}>
        <svg width={780} height={560} viewBox="0 0 780 560" style={{overflow: 'visible'}}>
          <rect x={374} y={130} width={32} height={360} rx={10} fill="#475569" stroke={LINE} strokeWidth={5} />
          <rect x={245} y={480} width={290} height={38} rx={14} fill="#334155" stroke={LINE} strokeWidth={5} />
          <circle cx={390} cy={130} r={24} fill={GOLD} stroke={LINE} strokeWidth={5} />
          <g transform={`translate(390 130) rotate(${tilt})`}>
            <rect x={-265} y={-10} width={530} height={20} rx={10} fill={GOLD} stroke={LINE} strokeWidth={5} />
            {/* বাঁ পাল্লা: ৪০০ কোটির নাম */}
            <g transform={`translate(-240 10) rotate(${-tilt})`}>
              <line x1={0} y1={0} x2={-48} y2={135} stroke="#94a3b8" strokeWidth={5} />
              <line x1={0} y1={0} x2={48} y2={135} stroke="#94a3b8" strokeWidth={5} />
              <rect x={-105} y={135} width={210} height={96} rx={20} fill="#1e293b" stroke="#64748b" strokeWidth={4} />
              <text x={0} y={180} textAnchor="middle" fontSize={32} fontWeight={900} fill="#cbd5e1">
                ১টি নাম
              </text>
              <text x={0} y={216} textAnchor="middle" fontSize={28} fontWeight={800} fill={GOLD}>
                ৳৪০০ কোটি
              </text>
            </g>
            {/* ডান পাল্লা: হাজার কোটির সাম্রাজ্য */}
            <g transform={`translate(240 10) rotate(${-tilt})`}>
              <line x1={0} y1={0} x2={-58} y2={150} stroke={EMERALD} strokeWidth={5} />
              <line x1={0} y1={0} x2={58} y2={150} stroke={EMERALD} strokeWidth={5} />
              <rect x={-130} y={150} width={260} height={134} rx={24} fill="#064e3b" stroke={GOLD} strokeWidth={6} />
              <path d="M-36 196 L-24 166 L-8 182 L0 160 L8 182 L24 166 L36 196 Z" fill={GOLD} stroke={LINE} strokeWidth={3} />
              <text x={0} y={236} textAnchor="middle" fontSize={34} fontWeight={900} fill="#fff">
                হাজার কোটির
              </text>
              <text x={0} y={270} textAnchor="middle" fontSize={32} fontWeight={900} fill="#a7f3d0">
                সাম্রাজ্য!
              </text>
            </g>
          </g>
        </svg>
      </div>
    </>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  // ১. হুক (৪ অক্ষরের ডোমেইন + ৪০০ কোটি টাকা)
  h1a: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/globe.jpg" dur={dur} zoom={[1.0, 1.09]} origin="50% 48%" dim={0.14} />,
    over: (f) => {
      const letters = ['s', 'h', 'o', 'p'];
      const dot = spring({frame: f - 18, fps: 30, config: {damping: 10}});
      return (
        <>
          <div style={{position: 'absolute', right: 54, top: 132, fontSize: 32, fontWeight: 900, color: '#fff'}}>
            <span style={{padding: '10px 24px', borderRadius: 14, background: '#047857', border: `3px solid ${GOLD}`, boxShadow: '0 8px 26px rgba(16,185,129,0.4)'}}>
              ● TECH GIANT · SHOPIFY
            </span>
          </div>
          <div style={{position: 'absolute', left: 65, right: 65, top: 245, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16}}>
            {letters.map((ch, i) => {
              const s = spring({frame: f - i * 4, fps: 30, config: {damping: 10, stiffness: 180}});
              return (
                <div
                  key={ch}
                  style={{
                    width: 148,
                    height: 164,
                    borderRadius: 28,
                    background: 'rgba(6,28,22,0.92)',
                    border: `5px solid ${EMERALD}`,
                    boxShadow: '0 22px 60px rgba(16,185,129,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 96,
                    fontWeight: 900,
                    color: '#fff',
                    transform: `scale(${s}) translateY(${(1 - s) * 30}px)`,
                  }}
                >
                  {ch}
                </div>
              );
            })}
            <div style={{padding: '16px 24px', borderRadius: 22, background: RED, border: `4px solid ${GOLD}`, fontSize: 56, fontWeight: 900, color: '#fff', transform: `scale(${dot})`, opacity: dot}}>
              .com
            </div>
          </div>
        </>
      );
    },
  }),

  h1b: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/megamall.jpg" dur={dur} dim={0.72} zoom={[1.04, 1.12]} />,
    over: (_f, dur) => (
      <StatCard
        dur={dur}
        to={400}
        pre="৳"
        post=" কোটি"
        label="ডোমেইন কিনতে খরচ"
        sub="একটি নামের দাম!"
        color={GOLD}
        borderColor={EMERALD}
        size={136}
        badge={<ShopifyBag size={92} />}
      />
    ),
  }),

  // ২. কোনো পণ্য বিক্রি করে না -> এত টাকা কেন?
  q1a: R({
    bg: 'dark',
    actors: [{look: Y1, x: 785, y: 1700, h: 1060, expression: 'thinking', gesture: 'shrug', lookX: -0.6}],
    over: (f, dur) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 12}});
      const xDraw = interpolate(f, [Math.round(dur * 0.22), Math.round(dur * 0.6)], [0, 1], clampOpts);
      return (
        <div
          style={{
            position: 'absolute',
            left: 65,
            top: 320,
            width: 530,
            padding: '38px 28px',
            background: 'rgba(12,18,28,0.94)',
            border: `4px solid ${RED}`,
            borderRadius: 30,
            textAlign: 'center',
            boxShadow: '0 24px 70px rgba(0,0,0,0.85)',
            transform: `scale(${0.88 + 0.12 * pop})`,
          }}
        >
          <svg width={260} height={220} viewBox="0 0 260 220" style={{margin: '0 auto'}}>
            {/* সুতার রিল */}
            <rect x={44} y={32} width={172} height={24} rx={8} fill="#cbd5e1" stroke={LINE} strokeWidth={5} />
            <rect x={64} y={56} width={132} height={106} fill="#e2e8f0" stroke={LINE} strokeWidth={5} />
            <line x1={68} y1={82} x2={192} y2={82} stroke="#94a3b8" strokeWidth={5} />
            <line x1={68} y1={108} x2={192} y2={108} stroke="#94a3b8" strokeWidth={5} />
            <line x1={68} y1={134} x2={192} y2={134} stroke="#94a3b8" strokeWidth={5} />
            <rect x={44} y={162} width={172} height={24} rx={8} fill="#cbd5e1" stroke={LINE} strokeWidth={5} />
            {/* লাল ক্রস */}
            <line x1={38} y1={24} x2={222} y2={194} stroke={RED} strokeWidth={22} strokeLinecap="round" strokeDasharray={260} strokeDashoffset={260 * (1 - xDraw)} />
            <line x1={222} y1={24} x2={38} y2={194} stroke={RED} strokeWidth={22} strokeLinecap="round" strokeDasharray={260} strokeDashoffset={260 * (1 - xDraw)} />
          </svg>
          <div style={{fontSize: 44, fontWeight: 900, color: '#fecaca', marginTop: 14}}>নিজস্ব বিক্রি: ০%</div>
          <div style={{fontSize: 32, fontWeight: 700, color: '#94a3b8', marginTop: 6}}>একটা সুতাও বেচে না!</div>
        </div>
      );
    },
  }),

  q1b: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/globe.jpg" dur={dur} dim={0.78} zoom={[1.05, 1.14]} />,
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 9, stiffness: 170}});
      const pulse = 1 + 0.04 * Math.sin(f * 0.2);
      return (
        <div style={{position: 'absolute', left: 95, right: 95, top: 270, textAlign: 'center', transform: `scale(${pop})`}}>
          <div style={{display: 'inline-block', padding: '14px 40px', borderRadius: 22, background: 'rgba(15,24,36,0.92)', border: `4px solid ${GOLD}`, fontSize: 52, fontWeight: 900, color: GOLD}}>
            ৳৪০০ কোটি → shop.com
          </div>
          <div style={{fontSize: 320, fontWeight: 900, color: RED, lineHeight: 0.95, marginTop: 28, textShadow: '0 24px 80px rgba(224,36,60,0.5)', transform: `scale(${pulse})`}}>
            ?
          </div>
          <div style={{marginTop: 10, display: 'inline-block', padding: '16px 42px', borderRadius: 22, background: '#7f1d1d', border: `4px solid ${GOLD}`, fontSize: 48, fontWeight: 900, color: '#fff'}}>
            হঠাৎ এত টাকা কেন?
          </div>
        </div>
      );
    },
  }),

  // ৩. গোপন মিশন বনাম শত্রু Amazon
  enemy1: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/rivalry.jpg" dur={dur} zoom={[1.02, 1.12]} origin="50% 34%" dim={0.14} />,
    over: () => (
      <>
        <div style={{position: 'absolute', right: 54, top: 132, fontSize: 32, fontWeight: 900, color: '#fff'}}>
          <span style={{padding: '10px 24px', borderRadius: 14, background: RED, border: `3px solid ${GOLD}`}}>● গোপন মিশন</span>
        </div>
        <Bounce x={135} y={230} at={2} seed="enemybanner">
          <div style={{width: 810, padding: '22px 28px', background: 'rgba(15,18,26,0.9)', border: `4px solid ${AMBER}`, borderRadius: 24, textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.9)'}}>
            <div style={{fontSize: 48, fontWeight: 900, color: AMBER}}>তাদের সবচেয়ে বড় শত্রু...</div>
          </div>
        </Bounce>
      </>
    ),
  }),

  enemy2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/rivalry.jpg" dur={dur} dim={0.76} zoom={[1.08, 1.16]} origin="50% 62%" />,
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 10}});
      const ring = 1 + 0.06 * Math.sin(f * 0.25);
      return (
        <div style={{position: 'absolute', left: 85, right: 85, top: 340, transform: `scale(${pop})`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20}}>
            <div style={{flex: 1, padding: '42px 18px', borderRadius: 28, background: 'rgba(6,78,59,0.92)', border: `5px solid ${EMERALD}`, textAlign: 'center'}}>
              <div style={{fontSize: 48, fontWeight: 900, color: '#fff'}}>Shopify</div>
              <div style={{fontSize: 30, fontWeight: 800, color: '#a7f3d0', marginTop: 6}}>চ্যালেঞ্জার</div>
            </div>
            <div style={{width: 110, height: 110, borderRadius: '50%', background: RED, border: `5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 900, color: '#fff', flexShrink: 0, transform: `scale(${ring})`}}>
              VS
            </div>
            <div style={{flex: 1, padding: '42px 18px', borderRadius: 28, background: 'rgba(69,26,3,0.94)', border: `5px solid ${AMBER}`, textAlign: 'center'}}>
              <div style={{fontSize: 48, fontWeight: 900, color: AMBER}}>Amazon</div>
              <div style={{fontSize: 30, fontWeight: 800, color: '#fde68a', marginTop: 6}}>লক্ষ্যবস্তু</div>
            </div>
          </div>
          <div style={{marginTop: 42, padding: '20px 30px', borderRadius: 22, background: 'rgba(127,29,29,0.92)', border: `4px solid ${GOLD}`, textAlign: 'center', fontSize: 46, fontWeight: 900, color: '#fff'}}>
            শত্রুকে হারানোর মিশন!
          </div>
        </div>
      );
    },
  }),

  // ৪. পর্দার আড়ালে ৫০ লাখ+ শপ
  shops1: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/globe.jpg" dur={dur} dim={0.62} zoom={[1.08, 1.18]} origin="50% 50%" />,
    over: (_f, dur) => (
      <StatCard
        dur={dur}
        to={50}
        post=" লাখ+"
        label="সারা বিশ্বে অনলাইন শপ"
        sub="পর্দার আড়ালে চলে"
        color={EMERALD}
        borderColor={GOLD}
        size={146}
      />
    ),
  }),

  shops2: R({
    bg: 'dark',
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 12}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 85,
            right: 85,
            top: 320,
            background: '#0d1420',
            border: `5px solid ${EMERALD}`,
            borderRadius: 32,
            overflow: 'hidden',
            boxShadow: '0 30px 90px rgba(16,185,129,0.28)',
            transform: `scale(${0.88 + 0.12 * pop})`,
          }}
        >
          <div style={{padding: '18px 26px', background: '#162235', display: 'flex', alignItems: 'center', gap: 14, borderBottom: '3px solid #263854'}}>
            <span style={{width: 18, height: 18, borderRadius: '50%', background: '#ef4444'}} />
            <span style={{width: 18, height: 18, borderRadius: '50%', background: AMBER}} />
            <span style={{width: 18, height: 18, borderRadius: '50%', background: EMERALD}} />
            <div style={{marginLeft: 12, fontSize: 30, fontWeight: 800, color: '#94a3b8'}}>SHOPIFY ENGINE OS</div>
          </div>
          <div style={{padding: '44px 34px', textAlign: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
              <ShopifyBag size={110} />
            </div>
            <div style={{fontSize: 56, fontWeight: 900, color: '#fff'}}>সফটওয়্যার পাওয়ারহাউস</div>
            <div style={{display: 'flex', justifyContent: 'center', gap: 16, marginTop: 26}}>
              {['Checkout', 'Hosting', 'Inventory'].map((t, i) => (
                <div key={t} style={{padding: '10px 22px', borderRadius: 14, background: 'rgba(16,185,129,0.16)', border: `2px solid ${i === 1 ? GOLD : EMERALD}`, fontSize: 30, fontWeight: 800, color: '#d1fae5'}}>
                  ✓ {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    },
  }),

  // ৫. সাধারণ ক্রেতাদের সমস্যা (জুতো / ঘড়ি -> খুঁজতে চায় না -> Amazon)
  prob1: R({
    bg: 'night',
    actors: [
      {look: Y2, x: 300, y: 1700, h: 1050, expression: 'worried', gesture: 'think', lookX: 0.4},
      {look: WOMAN, x: 780, y: 1700, h: 1050, expression: 'skeptical', gesture: 'shrug', lookX: -0.4},
    ],
    over: () => (
      <Bounce x={170} y={230} at={2} seed="probwarn">
        <div style={{width: 740, padding: '22px 28px', background: 'rgba(127,29,29,0.92)', border: `4px solid ${GOLD}`, borderRadius: 24, textAlign: 'center', boxShadow: '0 22px 60px rgba(0,0,0,0.85)'}}>
          <div style={{fontSize: 48, fontWeight: 900, color: '#fff'}}>কিন্তু আসল সমস্যাটা কোথায়?</div>
        </div>
      </Bounce>
    ),
  }),

  prob2: R({
    bg: 'dark',
    over: (f) => {
      const c1 = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const c2 = spring({frame: f - 14, fps: 30, config: {damping: 11}});
      return (
        <div style={{position: 'absolute', left: 75, right: 75, top: 370, display: 'flex', gap: 28}}>
          {/* জুতো কার্ড */}
          <div style={{flex: 1, padding: '42px 20px', background: 'rgba(15,25,38,0.94)', border: `5px solid ${EMERALD}`, borderRadius: 32, textAlign: 'center', transform: `scale(${c1})`, boxShadow: '0 24px 70px rgba(0,0,0,0.8)'}}>
            <svg width={180} height={135} viewBox="0 0 180 135" style={{margin: '0 auto'}}>
              <path d="M22 92 L28 50 L62 42 L94 74 L148 80 Q162 84 162 98 L162 110 L20 110 Z" fill="#10b981" stroke={LINE} strokeWidth={5} strokeLinejoin="round" />
              <rect x={18} y={106} width={146} height={14} rx={6} fill="#ffffff" stroke={LINE} strokeWidth={4} />
              <line x1={68} y1={56} x2={82} y2={68} stroke="#fff" strokeWidth={5} strokeLinecap="round" />
              <line x1={82} y1={66} x2={96} y2={76} stroke="#fff" strokeWidth={5} strokeLinecap="round" />
            </svg>
            <div style={{fontSize: 52, fontWeight: 900, color: '#fff', marginTop: 18}}>জুতো</div>
          </div>
          {/* ঘড়ি কার্ড */}
          <div style={{flex: 1, padding: '42px 20px', background: 'rgba(15,25,38,0.94)', border: `5px solid ${GOLD}`, borderRadius: 32, textAlign: 'center', transform: `scale(${c2})`, opacity: c2, boxShadow: '0 24px 70px rgba(0,0,0,0.8)'}}>
            <svg width={150} height={135} viewBox="0 0 150 135" style={{margin: '0 auto'}}>
              <rect x={54} y={6} width={42} height={26} rx={6} fill="#64748b" stroke={LINE} strokeWidth={4} />
              <rect x={54} y={102} width={42} height={26} rx={6} fill="#64748b" stroke={LINE} strokeWidth={4} />
              <circle cx={75} cy={68} r={42} fill="#1e293b" stroke={GOLD} strokeWidth={6} />
              <line x1={75} y1={68} x2={75} y2={42} stroke="#fff" strokeWidth={5} strokeLinecap="round" />
              <line x1={75} y1={68} x2={96} y2={76} stroke={GOLD} strokeWidth={5} strokeLinecap="round" />
              <circle cx={75} cy={68} r={5} fill="#fff" />
            </svg>
            <div style={{fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 18}}>ঘড়ি</div>
          </div>
        </div>
      );
    },
  }),

  prob3: Two(ProbScatteredPart, ProbAmazonPart, 0.56),

  // ৬. দশ জায়গা বনাম ১ জায়গা -> একচেটিয়া বাজার
  habit: R({
    bg: 'plain',
    over: (f, dur) => {
      const p1 = spring({frame: f - 1, fps: 30, config: {damping: 12}});
      const p2 = spring({frame: f - Math.round(dur * 0.34), fps: 30, config: {damping: 10}});
      return (
        <div style={{position: 'absolute', left: 85, right: 85, top: 290, display: 'flex', flexDirection: 'column', gap: 30}}>
          <div style={{padding: '32px 28px', borderRadius: 28, background: 'rgba(30,41,59,0.75)', border: '3px solid #64748b', textAlign: 'center', transform: `scale(${0.92 + 0.08 * p1})`}}>
            <div style={{fontSize: 40, fontWeight: 900, color: '#94a3b8'}}>✗ ১০টি আলাদা জায়গায় খোঁজা</div>
            <div style={{display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16}}>
              {Array.from({length: 5}, (_, i) => (
                <div key={i} style={{width: 72, height: 52, borderRadius: 10, background: '#334155', border: '2px solid #475569'}} />
              ))}
            </div>
          </div>
          <div style={{textAlign: 'center', fontSize: 64, fontWeight: 900, color: GOLD}}>↓</div>
          <div style={{padding: '44px 32px', borderRadius: 32, background: 'rgba(6,78,59,0.92)', border: `6px solid ${EMERALD}`, textAlign: 'center', boxShadow: '0 26px 80px rgba(16,185,129,0.35)', transform: `scale(${p2})`, opacity: p2}}>
            <div style={{fontSize: 62, fontWeight: 900, color: '#fff'}}>✓ এক জায়গায় সব!</div>
            <div style={{fontSize: 36, fontWeight: 800, color: '#a7f3d0', marginTop: 10}}>মানুষ এটাই চায়</div>
          </div>
        </div>
      );
    },
  }),

  monopoly: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/rivalry.jpg" dur={dur} dim={0.72} zoom={[1.05, 1.13]} origin="50% 30%" />,
    over: (f, dur) => {
      const pct = interpolate(f, [2, Math.max(8, dur * 0.65)], [28, 92], clampOpts);
      return (
        <div style={{position: 'absolute', left: 85, right: 85, top: 360, padding: '44px 36px', background: 'rgba(20,16,12,0.93)', border: `5px solid ${AMBER}`, borderRadius: 34, boxShadow: '0 30px 90px rgba(0,0,0,0.9)', textAlign: 'center'}}>
          <svg width={100} height={86} viewBox="0 0 120 100" style={{margin: '0 auto 10px'}}>
            <path d="M16 82 L24 28 L48 52 L60 18 L72 52 L96 28 L104 82 Z" fill={AMBER} stroke={LINE} strokeWidth={5} strokeLinejoin="round" />
          </svg>
          <div style={{fontSize: 44, fontWeight: 900, color: AMBER}}>একচেটিয়া বাজার নিয়ন্ত্রণ</div>
          <div style={{fontSize: 104, fontWeight: 900, color: '#fff', marginTop: 8}}>AMAZON</div>
          <div style={{height: 34, background: '#1e293b', borderRadius: 17, overflow: 'hidden', border: '3px solid #475569', marginTop: 24}}>
            <div style={{width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${AMBER}, ${RED})`, borderRadius: 14}} />
          </div>
        </div>
      );
    },
  }),

  // ৭. খেলার টেবিল উল্টে আসরে Shopify -> shop.com কেনা
  flip: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/rivalry.jpg" dur={dur} zoom={[1.12, 1.24]} origin="66% 72%" dim={0.14} />,
    over: () => (
      <Bounce x={100} y={230} at={1} seed="flipmove">
        <div style={{width: 880, padding: '26px 32px', background: 'rgba(6,58,44,0.92)', border: `5px solid ${GOLD}`, borderRadius: 28, textAlign: 'center', boxShadow: '0 24px 70px rgba(16,185,129,0.35)'}}>
          <div style={{fontSize: 54, fontWeight: 900, color: '#fff'}}>খেলার টেবিল উল্টে দিল Shopify!</div>
        </div>
      </Bounce>
    ),
  }),

  buydomain: R({
    bg: 'dark',
    over: (f, dur) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const badge = spring({frame: f - Math.round(dur * 0.42), fps: 30, config: {damping: 9, stiffness: 180}});
      return (
        <div style={{position: 'absolute', left: 75, right: 75, top: 360, textAlign: 'center'}}>
          <div style={{padding: '44px 30px', background: '#0f172a', border: `6px solid ${EMERALD}`, borderRadius: 34, boxShadow: '0 30px 90px rgba(16,185,129,0.35)', transform: `scale(${pop})`}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '24px 28px', borderRadius: 22, background: '#020617', border: '3px solid #334155'}}>
              <svg width={44} height={50} viewBox="0 0 44 50">
                <path d="M12 22 V14 C12 7 32 7 32 14 V22" fill="none" stroke={EMERALD} strokeWidth={5} />
                <rect x={6} y={20} width={32} height={24} rx={6} fill={EMERALD} />
              </svg>
              <span style={{fontSize: 78, fontWeight: 900, color: '#fff', letterSpacing: -1}}>shop.com</span>
            </div>
            <div style={{fontSize: 38, fontWeight: 800, color: GOLD, marginTop: 26}}>৪ অক্ষরের প্রিমিয়াম ডোমেইন</div>
          </div>
          <div style={{marginTop: 34, display: 'inline-block', padding: '18px 46px', borderRadius: 22, background: '#047857', border: `5px solid ${GOLD}`, fontSize: 52, fontWeight: 900, color: '#fff', transform: `scale(${badge})`, opacity: badge}}>
            চুপিসারে ডিল ডান ✓
          </div>
        </div>
      );
    },
  }),

  // ৮. শুধু একটা নাম দিয়ে দানবকে কীভাবে আটকাবে?
  giant1: R({
    bg: 'dark',
    over: (f) => {
      const s = spring({frame: f - 1, fps: 30, config: {damping: 12}});
      return (
        <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${s})`}}>
          <div style={{padding: '28px 54px', borderRadius: 24, background: 'rgba(16,185,129,0.14)', border: `4px solid ${EMERALD}`, fontSize: 64, fontWeight: 900, color: '#fff', boxShadow: '0 20px 60px rgba(16,185,129,0.22)'}}>
            shop.com
          </div>
          <div style={{fontSize: 40, fontWeight: 800, color: '#94a3b8', marginTop: 26}}>শুধু একটা ওয়েবসাইটের নাম?</div>
        </div>
      );
    },
  }),

  giant2: R({
    bg: 'dark',
    over: (f) => {
      const monster = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <div style={{position: 'absolute', left: 95, right: 95, top: 270, textAlign: 'center'}}>
          <div style={{padding: '54px 32px', borderRadius: 34, background: 'linear-gradient(180deg, #451a03, #1c0d02)', border: `6px solid ${AMBER}`, boxShadow: '0 30px 90px rgba(245,158,11,0.35)', transform: `scale(${0.86 + 0.14 * monster})`}}>
            <div style={{fontSize: 36, fontWeight: 800, color: '#fde68a'}}>বিশাল দানব</div>
            <div style={{fontSize: 102, fontWeight: 900, color: '#fff', lineHeight: 1.05, marginTop: 6}}>AMAZON</div>
          </div>
          <div style={{fontSize: 78, fontWeight: 900, color: RED, margin: '14px 0'}}>?</div>
          <div style={{display: 'inline-block', padding: '18px 42px', borderRadius: 20, background: '#064e3b', border: `4px solid ${EMERALD}`, fontSize: 44, fontWeight: 900, color: '#fff'}}>
            shop.com কীভাবে আটকাবে?
          </div>
        </div>
      );
    },
  }),

  // ৯. মাস্টারপ্ল্যান (ন্যারেটর pop ডানে y=790-এ থাকে, তাই মূল কার্ড ওপরে-বাঁয়ে)
  plan: R({
    bg: 'night',
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <div style={{position: 'absolute', left: 75, top: 260, width: 650, padding: '40px 36px', background: 'rgba(6,28,34,0.94)', border: `5px solid ${EMERALD}`, borderRadius: 32, boxShadow: '0 28px 80px rgba(16,185,129,0.28)', transform: `scale(${pop})`}}>
          <div style={{fontSize: 32, fontWeight: 800, color: EMERALD, letterSpacing: 3}}>BLUEPRINT · PHASE 01</div>
          <div style={{fontSize: 64, fontWeight: 900, color: '#fff', marginTop: 10, lineHeight: 1.15}}>আসল মাস্টারপ্ল্যান</div>
          <div style={{marginTop: 24, display: 'flex', gap: 14}}>
            {['১. সংযোগ', '২. সার্চ', '৩. আয়'].map((step) => (
              <div key={step} style={{padding: '10px 18px', borderRadius: 14, background: 'rgba(227,191,122,0.14)', border: `2px solid ${GOLD}`, fontSize: 30, fontWeight: 800, color: GOLD}}>
                {step}
              </div>
            ))}
          </div>
        </div>
      );
    },
  }),

  // ১০. ৫০ লাখ বিচ্ছিন্ন দ্বীপ -> এক সুতোয় বাঁধা -> একটিমাত্র ওয়েবসাইট
  islands1: R({
    bg: 'dark',
    over: (f) => {
      const spots = [
        [180, 360],
        [680, 310],
        [340, 560],
        [790, 570],
        [190, 810],
        [660, 830],
      ];
      return (
        <>
          <div style={{position: 'absolute', left: 120, right: 120, top: 210, textAlign: 'center', fontSize: 48, fontWeight: 900, color: GOLD}}>
            ৫০ লাখ+ আলাদা শপ
          </div>
          {spots.map(([sx, sy], i) => {
            const p = spring({frame: f - i * 3, fps: 30, config: {damping: 12}});
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: sx - 55,
                  top: sy,
                  width: 150,
                  padding: '18px 10px',
                  borderRadius: 20,
                  background: '#131d2c',
                  border: `3px dashed ${AMBER}`,
                  textAlign: 'center',
                  transform: `scale(${p})`,
                  opacity: p,
                }}
              >
                <div style={{fontSize: 28, fontWeight: 900, color: '#fde68a'}}>শপ #{bn(i + 1)}</div>
              </div>
            );
          })}
        </>
      );
    },
  }),

  islands2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/islands.jpg" dur={dur} zoom={[1.0, 1.1]} origin="50% 54%" dim={0.1} />,
    over: () => (
      <Bounce x={165} y={220} at={2} seed="islandschip">
        <div style={{width: 750, padding: '20px 30px', background: 'rgba(8,14,26,0.88)', border: `4px solid ${GOLD}`, borderRadius: 24, textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.9)'}}>
          <div style={{fontSize: 48, fontWeight: 900, color: GOLD}}>বিচ্ছিন্ন দ্বীপের মতো ছড়ানো</div>
        </div>
      </Bounce>
    ),
  }),

  thread1: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/islands.jpg" dur={dur} zoom={[1.05, 1.13]} origin="50% 50%" dim={0.54} />,
    over: (_f, dur) => <IslandThreads dur={dur} />,
  }),

  thread2: R({
    bg: 'dark',
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 9, stiffness: 170}});
      const ring = interpolate(f % 24, [0, 24], [0.9, 1.38], clampOpts);
      const op = interpolate(f % 24, [0, 24], [0.7, 0], clampOpts);
      return (
        <div style={{position: 'absolute', left: 0, right: 0, top: 340, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{position: 'relative', width: 320, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `6px solid ${EMERALD}`, transform: `scale(${ring})`, opacity: op}} />
            <div style={{width: 280, height: 280, borderRadius: '50%', background: 'linear-gradient(145deg, #065f46, #022c22)', border: `7px solid ${GOLD}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop})`, boxShadow: '0 24px 80px rgba(16,185,129,0.45)'}}>
              <div style={{fontSize: 54, fontWeight: 900, color: '#fff'}}>shop.com</div>
              <div style={{fontSize: 28, fontWeight: 800, color: GOLD, marginTop: 6}}>১টি কেন্দ্রীয় হাব</div>
            </div>
          </div>
          <div style={{marginTop: 40, padding: '20px 44px', borderRadius: 24, background: 'rgba(15,24,36,0.92)', border: `4px solid ${EMERALD}`, fontSize: 48, fontWeight: 900, color: '#fff'}}>
            ৫০ লাখ শপ → ১ ঠিকানা!
          </div>
        </div>
      );
    },
  }),

  // ১১. shop.com-এ সার্চ দিলেই এক ছাদের নিচে সব পণ্য
  search: R({
    bg: 'dark',
    over: (f, dur) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const slide = interpolate(f, [4, Math.max(10, dur * 0.68)], [0, 1], clampOpts);
      return (
        <div style={{position: 'absolute', left: 85, right: 85, top: 330, padding: '44px 36px', background: '#0f172a', border: `5px solid ${EMERALD}`, borderRadius: 34, boxShadow: '0 30px 90px rgba(0,0,0,0.88)', transform: `scale(${pop})`}}>
          <div style={{fontSize: 52, fontWeight: 900, color: EMERALD, textAlign: 'center', marginBottom: 24}}>shop.com</div>
          <div style={{padding: '22px 28px', borderRadius: 99, background: '#020617', border: `4px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontSize: 40, fontWeight: 800, color: '#e2e8f0'}}>জুতো, ঘড়ি, পোশাক...</div>
            <svg width={52} height={52} viewBox="0 0 60 60" style={{transform: `scale(${0.92 + 0.16 * slide})`}}>
              <circle cx={26} cy={26} r={16} fill="none" stroke={EMERALD} strokeWidth={6} />
              <line x1={38} y1={38} x2={54} y2={54} stroke={EMERALD} strokeWidth={7} strokeLinecap="round" />
            </svg>
          </div>
          <div style={{marginTop: 28, textAlign: 'center', fontSize: 38, fontWeight: 800, color: '#cbd5e1'}}>এক সার্চেই সব দোকানের পণ্য!</div>
        </div>
      );
    },
  }),

  oneroof: R({
    bg: 'plain',
    over: (f) => {
      const items = [
        {name: 'জুতো', col: EMERALD},
        {name: 'ঘড়ি', col: GOLD},
        {name: 'হুডি', col: '#60a5fa'},
        {name: 'ব্যাগ', col: AMBER},
        {name: 'হেডফোন', col: '#a78bfa'},
        {name: 'চশমা', col: '#34d399'},
      ];
      return (
        <div style={{position: 'absolute', left: 75, right: 75, top: 210}}>
          <svg width={930} height={150} viewBox="0 0 930 150">
            <polygon points="120,14 810,14 915,126 15,126" fill="#064e3b" stroke={GOLD} strokeWidth={7} strokeLinejoin="round" />
            <text x={465} y={88} textAnchor="middle" fontSize={44} fontWeight={900} fill={GOLD}>
              এক ছাদের নিচে ৫০ লাখ শপ
            </text>
          </svg>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 24}}>
            {items.map((it, i) => {
              const p = spring({frame: f - i * 4, fps: 30, config: {damping: 11}});
              return (
                <div
                  key={it.name}
                  style={{
                    padding: '44px 14px',
                    borderRadius: 24,
                    background: 'rgba(12,18,28,0.92)',
                    border: `4px solid ${it.col}`,
                    textAlign: 'center',
                    transform: `scale(${p})`,
                    boxShadow: '0 18px 46px rgba(0,0,0,0.7)',
                  }}
                >
                  <div style={{width: 34, height: 34, borderRadius: '50%', background: it.col, margin: '0 auto 14px'}} />
                  <div style={{fontSize: 42, fontWeight: 900, color: '#fff'}}>{it.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    },
  }),

  // ১২. গুদাম নেই, ডেলিভারি ভ্যান নেই -> সবচেয়ে বড় শপিং মল!
  noassets: R({
    bg: 'dark',
    over: (f, dur) => {
      const x1 = interpolate(f, [Math.round(dur * 0.2), Math.round(dur * 0.56)], [0, 1], clampOpts);
      return (
        <div style={{position: 'absolute', left: 75, right: 75, top: 340, display: 'flex', gap: 26}}>
          {/* গুদাম */}
          <div style={{flex: 1, padding: '42px 20px', background: 'rgba(15,20,30,0.94)', border: `4px solid ${RED}`, borderRadius: 30, textAlign: 'center', boxShadow: '0 24px 70px rgba(0,0,0,0.85)'}}>
            <svg width={210} height={180} viewBox="0 0 210 180" style={{margin: '0 auto'}}>
              <polygon points="105,18 18,70 192,70" fill="#475569" stroke={LINE} strokeWidth={5} />
              <rect x={28} y={70} width={154} height={94} fill="#334155" stroke={LINE} strokeWidth={5} />
              <rect x={76} y={96} width={58} height={68} fill="#1e293b" stroke="#64748b" strokeWidth={4} />
              <line x1={32} y1={24} x2={178} y2={158} stroke={RED} strokeWidth={20} strokeLinecap="round" strokeDasharray={220} strokeDashoffset={220 * (1 - x1)} />
              <line x1={178} y1={24} x2={32} y2={158} stroke={RED} strokeWidth={20} strokeLinecap="round" strokeDasharray={220} strokeDashoffset={220 * (1 - x1)} />
            </svg>
            <div style={{fontSize: 42, fontWeight: 900, color: '#fecaca', marginTop: 14}}>গুদাম: ০</div>
          </div>
          {/* ডেলিভারি ভ্যান */}
          <div style={{flex: 1, padding: '42px 20px', background: 'rgba(15,20,30,0.94)', border: `4px solid ${RED}`, borderRadius: 30, textAlign: 'center', boxShadow: '0 24px 70px rgba(0,0,0,0.85)'}}>
            <svg width={220} height={180} viewBox="0 0 220 180" style={{margin: '0 auto'}}>
              <rect x={20} y={54} width={118} height={74} rx={8} fill="#475569" stroke={LINE} strokeWidth={5} />
              <polygon points="138,74 176,74 198,100 198,128 138,128" fill="#64748b" stroke={LINE} strokeWidth={5} strokeLinejoin="round" />
              <circle cx={60} cy={134} r={18} fill="#1e293b" stroke="#cbd5e1" strokeWidth={5} />
              <circle cx={166} cy={134} r={18} fill="#1e293b" stroke="#cbd5e1" strokeWidth={5} />
              <line x1={34} y1={28} x2={186} y2={156} stroke={RED} strokeWidth={20} strokeLinecap="round" strokeDasharray={220} strokeDashoffset={220 * (1 - x1)} />
              <line x1={186} y1={28} x2={34} y2={156} stroke={RED} strokeWidth={20} strokeLinecap="round" strokeDasharray={220} strokeDashoffset={220 * (1 - x1)} />
            </svg>
            <div style={{fontSize: 42, fontWeight: 900, color: '#fecaca', marginTop: 14}}>ভ্যান: ০</div>
          </div>
        </div>
      );
    },
  }),

  mall1: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/megamall.jpg" dur={dur} zoom={[1.0, 1.09]} origin="50% 62%" dim={0.14} />,
    over: () => (
      <Bounce x={150} y={220} at={2} seed="malltop">
        <div style={{width: 780, padding: '20px 30px', background: 'rgba(8,14,24,0.88)', border: `4px solid ${EMERALD}`, borderRadius: 24, textAlign: 'center'}}>
          <div style={{fontSize: 46, fontWeight: 900, color: '#fff'}}>নিজস্ব কোনো গুদাম ছাড়াই...</div>
        </div>
      </Bounce>
    ),
  }),

  mall2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/megamall.jpg" dur={dur} zoom={[1.1, 1.2]} origin="50% 34%" dim={0.4} />,
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 9, stiffness: 170}});
      return (
        <div style={{position: 'absolute', left: 90, right: 90, top: 370, padding: '44px 36px', background: 'rgba(6,48,36,0.92)', border: `6px solid ${GOLD}`, borderRadius: 34, textAlign: 'center', boxShadow: '0 30px 90px rgba(16,185,129,0.38)', transform: `scale(${pop})`}}>
          <div style={{fontSize: 42, fontWeight: 800, color: GOLD}}>রাতারাতি জনগণের সামনে</div>
          <div style={{fontSize: 78, fontWeight: 900, color: '#fff', marginTop: 10, lineHeight: 1.15}}>পৃথিবীর সবচেয়ে বড় শপিং মল!</div>
        </div>
      );
    },
  }),

  // ১৩. হাজার কোটি আয়ের তিনটি রাস্তা (revintro1 ও revintro2)
  revintro1: R({
    bg: 'dark',
    over: (f) => {
      const s = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <div style={{position: 'absolute', left: 95, right: 95, top: 350, textAlign: 'center', transform: `scale(${s})`}}>
          <svg width={200} height={200} viewBox="0 0 180 180" style={{margin: '0 auto'}}>
            <circle cx={90} cy={90} r={78} fill="#0f172a" stroke={GOLD} strokeWidth={7} />
            <circle cx={90} cy={78} r={22} fill={GOLD} />
            <polygon points="78,94 102,94 110,136 70,136" fill={GOLD} />
          </svg>
          <div style={{marginTop: 26, display: 'inline-block', padding: '18px 42px', borderRadius: 24, background: 'rgba(6,78,59,0.9)', border: `4px solid ${EMERALD}`, fontSize: 54, fontWeight: 900, color: '#fff'}}>
            এই এক চালেই খুলে যায়...
          </div>
        </div>
      );
    },
  }),

  revintro2: R({
    bg: 'plain',
    over: (f) => {
      const gates = ['রাস্তা ১', 'রাস্তা ২', 'রাস্তা ৩'];
      return (
        <div style={{position: 'absolute', left: 75, right: 75, top: 270, textAlign: 'center'}}>
          <div style={{fontSize: 58, fontWeight: 900, color: GOLD, marginBottom: 34}}>আয়ের ৩টি নতুন রাস্তা</div>
          <div style={{display: 'flex', gap: 22}}>
            {gates.map((g, i) => {
              const p = spring({frame: f - i * 6, fps: 30, config: {damping: 10}});
              return (
                <div
                  key={g}
                  style={{
                    flex: 1,
                    padding: '64px 14px',
                    borderRadius: '140px 140px 24px 24px',
                    background: 'linear-gradient(180deg, #065f46, #022c22)',
                    border: `5px solid ${GOLD}`,
                    boxShadow: '0 24px 70px rgba(16,185,129,0.3)',
                    transform: `scale(${p})`,
                  }}
                >
                  <div style={{fontSize: 74, fontWeight: 900, color: GOLD}}>{bn(i + 1)}</div>
                  <div style={{fontSize: 38, fontWeight: 900, color: '#fff', marginTop: 10}}>{g}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    },
  }),

  // ১৪. রাস্তা ১: Amazon-এ যেতে হয় না, এক সার্চে সব হাতের মুঠোয়
  rev1a: R({
    bg: 'dark',
    over: (f, dur) => {
      const x = interpolate(f, [Math.round(dur * 0.25), Math.round(dur * 0.6)], [0, 1], clampOpts);
      return (
        <>
          <PillarTag num="#১" label="কাস্টমার ধরে রাখা" />
          <div style={{position: 'absolute', left: 90, right: 90, top: 370, padding: '44px 36px', background: '#111827', border: `5px solid ${RED}`, borderRadius: 34, textAlign: 'center', boxShadow: '0 30px 90px rgba(0,0,0,0.88)'}}>
            <div style={{fontSize: 40, fontWeight: 800, color: '#cbd5e1'}}>আগের ঠিকানা</div>
            <div style={{position: 'relative', display: 'inline-block', marginTop: 18}}>
              <div style={{fontSize: 82, fontWeight: 900, color: AMBER}}>amazon.com</div>
              <svg width={520} height={110} viewBox="0 0 520 110" style={{position: 'absolute', left: -20, top: -5}}>
                <line x1={18} y1={56} x2={502} y2={56} stroke={RED} strokeWidth={18} strokeLinecap="round" strokeDasharray={500} strokeDashoffset={500 * (1 - x)} />
              </svg>
            </div>
            <div style={{fontSize: 44, fontWeight: 900, color: '#fecaca', marginTop: 22}}>আর যাওয়ার দরকার নেই!</div>
          </div>
        </>
      );
    },
  }),

  rev1b: R({
    bg: 'dark',
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <>
          <PillarTag num="#১" label="হাতের মুঠোয় সব শপ" />
          <div style={{position: 'absolute', left: 260, right: 260, top: 280, padding: '26px', background: '#0f172a', border: `8px solid ${GOLD}`, borderRadius: 48, boxShadow: '0 30px 90px rgba(16,185,129,0.32)', transform: `scale(${pop})`}}>
            <div style={{width: 120, height: 14, borderRadius: 7, background: '#334155', margin: '0 auto 22px'}} />
            <div style={{padding: '16px 22px', borderRadius: 18, background: '#064e3b', border: `3px solid ${EMERALD}`, textAlign: 'center', fontSize: 42, fontWeight: 900, color: '#fff'}}>
              shop.com
            </div>
            <div style={{marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14}}>
              {['সব ফ্যাশন শপ', 'সব গ্যাজেট শপ', 'সব জুতো-ঘড়ি'].map((t) => (
                <div key={t} style={{padding: '18px 20px', borderRadius: 16, background: '#1e293b', fontSize: 34, fontWeight: 800, color: '#d1fae5', display: 'flex', justifyContent: 'space-between'}}>
                  <span>{t}</span>
                  <span style={{color: EMERALD}}>✓</span>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    },
  }),

  // ১৫. রাস্তা ২: অপরিচিত নতুন শপ -> সাব-ডোমেইন -> মুহূর্তেই বিশ্বস্ত
  rev2a: R({
    bg: 'dark',
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <>
          <PillarTag num="#২" label="নতুন ব্র্যান্ডের ভরসা" color={GOLD} />
          <div style={{position: 'absolute', left: 85, right: 85, top: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, transform: `scale(${pop})`}}>
            <div style={{width: '100%', padding: '32px', borderRadius: 28, background: '#131b26', border: '4px solid #64748b', textAlign: 'center'}}>
              <div style={{fontSize: 32, fontWeight: 800, color: '#94a3b8'}}>অপরিচিত নতুন অনলাইন শপ</div>
              <div style={{fontSize: 48, fontWeight: 900, color: '#e2e8f0', marginTop: 6}}>newbrand.store</div>
            </div>
            <div style={{fontSize: 56, fontWeight: 900, color: GOLD}}>▼ যুক্ত হয়</div>
            <div style={{width: '100%', padding: '34px', borderRadius: 28, background: '#064e3b', border: `5px solid ${GOLD}`, textAlign: 'center'}}>
              <div style={{fontSize: 60, fontWeight: 900, color: '#fff'}}>shop.com</div>
            </div>
          </div>
        </>
      );
    },
  }),

  rev2b: R({
    bg: 'dark',
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <>
          <PillarTag num="#২" label="অফিসিয়াল ঠিকানা" color={GOLD} />
          <div style={{position: 'absolute', left: 85, right: 85, top: 360, padding: '44px 36px', borderRadius: 34, background: '#0f172a', border: `5px solid ${EMERALD}`, textAlign: 'center', boxShadow: '0 28px 80px rgba(16,185,129,0.28)', transform: `scale(${pop})`}}>
            <div style={{fontSize: 36, fontWeight: 800, color: GOLD}}>প্রোফাইল ও সাব-ডোমেইন</div>
            <div style={{marginTop: 22, padding: '24px 28px', borderRadius: 22, background: '#020617', border: `3px solid ${EMERALD}`, fontSize: 52, fontWeight: 900, color: '#fff'}}>
              brand.<span style={{color: EMERALD}}>shop.com</span>
            </div>
          </div>
        </>
      );
    },
  }),

  rev2c: R({
    bg: 'office',
    actors: [{look: WOMAN, x: 760, y: 1700, h: 1080, expression: 'smile', gesture: 'thumbsUp', lookX: -0.5}],
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 9, stiffness: 170}});
      return (
        <div style={{position: 'absolute', left: 65, top: 320, width: 540, padding: '38px 28px', background: 'rgba(6,48,36,0.95)', border: `5px solid ${EMERALD}`, borderRadius: 32, textAlign: 'center', boxShadow: '0 26px 80px rgba(0,0,0,0.88)', transform: `scale(${pop})`}}>
          <svg width={130} height={140} viewBox="0 0 120 130" style={{margin: '0 auto'}}>
            <path d="M60 8 L110 28 V66 C110 98 84 118 60 124 C36 118 10 98 10 66 V28 Z" fill={EMERALD} stroke={GOLD} strokeWidth={6} />
            <path d="M36 66 L54 84 L86 48" fill="none" stroke="#fff" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{fontSize: 48, fontWeight: 900, color: '#fff', marginTop: 14}}>মুহূর্তেই বিশ্বস্ত!</div>
          <div style={{fontSize: 32, fontWeight: 800, color: GOLD, marginTop: 6}}>১০০% ভেরিফায়েড</div>
        </div>
      );
    },
  }),

  // ১৬. রাস্তা ৩: পেমেন্ট কমিশন + বিজ্ঞাপনে টপ র‍্যাংক -> সরাসরি Shopify-এর পকেটে!
  rev3a: R({
    bg: 'dark',
    over: (f, dur) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const fill = interpolate(f, [4, Math.max(10, dur * 0.65)], [0, 1], clampOpts);
      return (
        <>
          <PillarTag num="#৩" label="পেমেন্ট কমিশন" />
          <div style={{position: 'absolute', left: 85, right: 85, top: 350, padding: '44px 36px', background: '#0f172a', border: `5px solid ${EMERALD}`, borderRadius: 34, boxShadow: '0 30px 90px rgba(0,0,0,0.88)', textAlign: 'center', transform: `scale(${pop})`}}>
            <div style={{fontSize: 42, fontWeight: 800, color: '#cbd5e1'}}>প্রতিটি কেনাকাটায়</div>
            <div style={{fontSize: 92, fontWeight: 900, color: EMERALD, marginTop: 10}}>+ % কমিশন</div>
            <div style={{height: 30, background: '#1e293b', borderRadius: 15, overflow: 'hidden', border: `3px solid ${GOLD}`, marginTop: 26}}>
              <div style={{width: `${20 + 80 * fill}%`, height: '100%', background: EMERALD}} />
            </div>
            <div style={{fontSize: 34, fontWeight: 800, color: GOLD, marginTop: 18}}>সব ট্রানজেকশন Shopify দিয়ে</div>
          </div>
        </>
      );
    },
  }),

  rev3b: R({
    bg: 'dark',
    over: (f, dur) => {
      const rise = interpolate(f, [4, Math.max(12, dur * 0.58)], [0, 1], {...clampOpts, easing: (t) => 1 - (1 - t) * (1 - t)});
      const ySponsored = interpolate(rise, [0, 1], [690, 340]);
      return (
        <>
          <PillarTag num="#৩" label="টপ সার্চ বিজ্ঞাপন" color={GOLD} />
          <div style={{position: 'absolute', left: 85, right: 85, top: 245, textAlign: 'center', fontSize: 40, fontWeight: 900, color: '#cbd5e1'}}>
            সার্চের সবার উপরে উঠতে বিজ্ঞাপন
          </div>
          {[505, 670].map((top, i) => (
            <div key={top} style={{position: 'absolute', left: 100, right: 100, top, height: 120, borderRadius: 24, background: '#131d2c', border: '3px solid #334155', display: 'flex', alignItems: 'center', padding: '0 34px', fontSize: 38, fontWeight: 800, color: '#64748b'}}>
              #{bn(i + 2)} সাধারণ শপ রেজাল্ট
            </div>
          ))}
          <div
            style={{
              position: 'absolute',
              left: 85,
              right: 85,
              top: ySponsored,
              padding: '32px 34px',
              borderRadius: 28,
              background: 'linear-gradient(135deg, #065f46, #022c22)',
              border: `6px solid ${GOLD}`,
              boxShadow: '0 26px 80px rgba(227,191,122,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{fontSize: 28, fontWeight: 900, color: GOLD}}>#১ · SPONSORED AD</div>
              <div style={{fontSize: 48, fontWeight: 900, color: '#fff'}}>আপনার শপ সবার উপরে!</div>
            </div>
            <div style={{padding: '10px 22px', borderRadius: 16, background: GOLD, color: '#081018', fontSize: 36, fontWeight: 900}}>৳৳৳</div>
          </div>
        </>
      );
    },
  }),

  rev3c: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/globe.jpg" dur={dur} dim={0.68} zoom={[1.05, 1.15]} />,
    over: (f, dur) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 9, stiffness: 170}});
      const rise = interpolate(f, [2, Math.max(8, dur * 0.65)], [0, 1], clampOpts);
      return (
        <div style={{position: 'absolute', left: 95, right: 95, top: 340, padding: '48px 36px', background: 'rgba(6,44,32,0.94)', border: `6px solid ${GOLD}`, borderRadius: 36, textAlign: 'center', boxShadow: '0 30px 90px rgba(16,185,129,0.4)', transform: `scale(${pop})`}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 18, height: 150, marginBottom: 24}}>
            {[0.38, 0.56, 0.78, 1.0].map((h, i) => (
              <div key={i} style={{width: 58, height: 145 * h * rise, borderRadius: 12, background: i === 3 ? GOLD : EMERALD, border: `3px solid ${LINE}`}} />
            ))}
          </div>
          <div style={{fontSize: 40, fontWeight: 800, color: '#a7f3d0'}}>হাজার কোটি টাকা আয়ের প্রবাহ</div>
          <div style={{fontSize: 64, fontWeight: 900, color: '#fff', marginTop: 8}}>সরাসরি Shopify-এর পকেটে!</div>
        </div>
      );
    },
  }),

  // ১৭. শেষ শিক্ষা: ৪০০ কোটি -> হাজার কোটির সাম্রাজ্য -> বিজনেস গেম -> CTA
  outro1: R({
    bg: 'plain',
    over: (_f, dur) => <EmpireScale dur={dur} />,
  }),

  outro2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="shopify/rivalry.jpg" dur={dur} zoom={[1.08, 1.16]} origin="66% 70%" dim={0.62} />,
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 9, stiffness: 180}});
      return (
        <div style={{position: 'absolute', left: 95, right: 95, top: 410, padding: '52px 36px', background: 'rgba(10,16,24,0.92)', border: `6px solid ${GOLD}`, borderRadius: 36, textAlign: 'center', boxShadow: '0 30px 90px rgba(0,0,0,0.9)', transform: `scale(${pop})`}}>
          <div style={{fontSize: 44, fontWeight: 800, color: '#e2e8f0'}}>এটাই আসল</div>
          <div style={{fontSize: 102, fontWeight: 900, color: EMERALD, marginTop: 8, textShadow: '0 10px 34px rgba(16,185,129,0.4)'}}>বিজনেস গেম!</div>
        </div>
      );
    },
  }),

  outro3: R({
    bg: 'plain',
    over: (f, dur) => {
      const p1 = spring({frame: f - 2, fps: 30, config: {damping: 11}});
      const p2 = spring({frame: f - Math.round(dur * 0.25), fps: 30, config: {damping: 11}});
      const p3 = spring({frame: f - Math.round(dur * 0.5), fps: 30, config: {damping: 11}});
      return (
        <div style={{position: 'absolute', left: 75, top: 245, width: 660, padding: '36px 32px', background: 'rgba(8,14,22,0.92)', border: `5px solid ${GOLD}`, borderRadius: 30, boxShadow: '0 26px 80px rgba(0,0,0,0.85)', transform: `scale(${p1})`}}>
          <div style={{fontSize: 52, fontWeight: 900, color: GOLD}}>ব্যবসার গোপন চাল</div>
          <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 16}}>
            <div style={{padding: '16px 22px', borderRadius: 18, background: 'rgba(16,185,129,0.16)', border: `3px solid ${EMERALD}`, fontSize: 36, fontWeight: 800, color: '#fff', transform: `scale(${p2})`, opacity: p2}}>
              ✓ ডোমেইন দিয়ে বাজার দখল
            </div>
            <div style={{padding: '16px 22px', borderRadius: 18, background: 'rgba(227,191,122,0.14)', border: `3px solid ${GOLD}`, fontSize: 36, fontWeight: 800, color: '#fef3c7', transform: `scale(${p3})`, opacity: p3}}>
              ✓ গুদাম ছাড়াই মেগা মার্কেট
            </div>
          </div>
        </div>
      );
    },
  }),

  cta: () => <Cta />,
};

// থাম্বনেইল (ফ্রেম ০ থেকেই ১০০% দৃশ্যমান — Bounce নেই)
const Thumb: React.FC = () => (
  <PsyThumb
    l1="৪ অক্ষরের ওয়েবসাইট"
    l2="দাম ৪০০ কোটি টাকা!"
    bottom="কেন কিনল Shopify?"
    term="Business Game · Shopify"
    glow="rgba(16,185,129,0.34)"
    size={78}
    art={
      <div
        style={{
          position: 'absolute',
          left: 34,
          top: 660,
          width: 590,
          height: 615,
          overflow: 'hidden',
          borderRadius: 34,
          border: `6px solid ${GOLD}`,
          boxShadow: '0 26px 80px rgba(0,0,0,0.9)',
        }}
      >
        <Img src={staticFile('shopify/globe.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 48%'}} />
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            padding: '12px 26px',
            borderRadius: 18,
            background: '#065f46',
            border: `4px solid ${EMERALD}`,
            fontSize: 44,
            fontWeight: 900,
            color: '#fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.85)',
          }}
        >
          shop.com
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
            boxShadow: '0 10px 30px rgba(0,0,0,0.85)',
          }}
        >
          ৳৪০০ কোটি!
        </div>
      </div>
    }
  />
);

export const shopify = story('shopify/', raw, SCENES, Thumb, {logo: 'bba2'});
