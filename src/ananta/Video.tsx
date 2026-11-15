// অনন্ত জলিল ও ২২৬ কোটির বাস্তবতা — AnantaHero (Motion Graphics & Real Photos)
// স্ক্রিপ্ট: D:\ClaudeVideo\scripts\85-ananta-hero.md | ভয়েস: Cartesia sonic-3.6 (Professor bn)
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {R, Two, story} from '../common/reel';
import raw from './segments.json';

const ACCENT_GOLD = '#f59e0b';
const ACCENT_RED = '#ef4444';
const ACCENT_EMERALD = '#10b981';
const ACCENT_BLUE = '#38bdf8';
const DarkBase = <AbsoluteFill style={{background: '#070b14'}} />;

// পূর্ণ-পর্দা ছবি + Ken Burns + নিরাপদ অন্ধকার ভিনিয়েট
const Photo: React.FC<{
  src: string;
  dur: number;
  zoom?: [number, number];
  origin?: string;
  dim?: number;
  pos?: string;
}> = ({src, dur, zoom = [1, 1.09], origin = '50% 45%', dim = 0, pos = '50% 50%'}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, clampOpts);
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#070b14'}}>
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: pos,
          transform: `scale(${z})`,
          transformOrigin: origin,
        }}
      />
      {dim > 0 ? <AbsoluteFill style={{background: `rgba(5,9,18,${dim})`}} /> : null}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(5,8,16,0.82) 0%, rgba(5,8,16,0.12) 24%, rgba(5,8,16,0.15) 62%, rgba(5,8,16,0.95) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// ওপরের ডান কোণে নিরাপদ টপ ট্যাগ (top: 132)
const TopTag: React.FC<{label: string; color?: string}> = ({label, color = GOLD}) => (
  <div
    style={{
      position: 'absolute',
      top: 132,
      right: 48,
      padding: '10px 26px',
      borderRadius: 99,
      background: 'rgba(6,10,20,0.94)',
      border: `3px solid ${color}`,
      fontSize: 28,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: 0.4,
      boxShadow: '0 10px 30px rgba(0,0,0,0.75)',
      zIndex: 10,
    }}
  >
    ● {label}
  </div>
);

// ওপরের ব্যানার কার্ড
const TopBanner: React.FC<{text: string; sub?: string; color?: string; top?: number}> = ({
  text,
  sub,
  color = GOLD,
  top = 215,
}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 14, mass: 0.8}});
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 48,
        right: 48,
        padding: '22px 30px',
        borderRadius: 24,
        background: 'rgba(7,11,22,0.94)',
        border: `3px solid ${color}`,
        boxShadow: '0 20px 50px rgba(0,0,0,0.85)',
        transform: `scale(${s})`,
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      <div style={{fontSize: 46, fontWeight: 900, color: '#fff', lineHeight: 1.25}}>
        {text}
      </div>
      {sub ? (
        <div style={{fontSize: 28, fontWeight: 700, color, marginTop: 8, letterSpacing: 0.5}}>
          {sub}
        </div>
      ) : null}
    </div>
  );
};

// -------------------------------------------------------------
// ১. জে পল গেটি কোট কার্ড (Motion Graphics)
// -------------------------------------------------------------
const GettyQuoteCard: React.FC<{top?: number}> = ({top = 400}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 13}});
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 50,
        right: 50,
        padding: '36px 32px',
        borderRadius: 30,
        background: 'rgba(8,12,24,0.96)',
        border: `3px solid ${GOLD}`,
        boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
        textAlign: 'center',
        transform: `scale(${s})`,
      }}
    >
      <div style={{fontSize: 72, color: GOLD, lineHeight: 0.6, marginBottom: 12, fontFamily: 'Georgia, serif'}}>
        “
      </div>
      <div style={{fontSize: 26, fontWeight: 800, color: ACCENT_BLUE, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10}}>
        জে পল গেটি (J. Paul Getty)
      </div>
      <div style={{fontSize: 22, fontWeight: 700, color: '#94a3b8', marginBottom: 18}}>
        আমেরিকান শিল্পপতি ও শীর্ষ ধনকুবের
      </div>
      <div style={{fontSize: 44, fontWeight: 900, color: '#fff', lineHeight: 1.3}}>
        ব্যাংকিং দুনিয়ার অন্যতম বিখ্যাত নীতি
      </div>
      <div style={{marginTop: 18, display: 'inline-block', padding: '8px 24px', borderRadius: 99, background: 'rgba(245,158,11,0.15)', border: `2px solid ${GOLD}`, color: GOLD, fontSize: 24, fontWeight: 800}}>
        GETTY PARADOX
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ২. ঋণ তুলনা ইনফোগ্রাফিক বার চার্ট (Data Visualization)
// -------------------------------------------------------------
const DebtCompareInfographic: React.FC<{focus: 'small' | 'huge'; dur: number}> = ({focus, dur}) => {
  const f = useCurrentFrame();
  const grow1 = interpolate(f, [2, Math.max(8, dur * 0.4)], [0, 1], clampOpts);
  const grow2 = interpolate(f, [4, Math.max(10, dur * 0.55)], [0, 1], clampOpts);
  return (
    <div
      style={{
        position: 'absolute',
        top: 360,
        left: 48,
        right: 48,
        padding: '36px 30px',
        borderRadius: 30,
        background: 'rgba(8,12,22,0.96)',
        border: `3px solid ${focus === 'huge' ? ACCENT_RED : ACCENT_BLUE}`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 26, fontWeight: 800, color: '#94a3b8', letterSpacing: 1.5, marginBottom: 14}}>
        ঋণের পরিমাণ বনাম মানসিক চাপ
      </div>
      <div style={{fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 28}}>
        {focus === 'huge' ? '৩০০ কোটি টাকার মানসিক সমীকরণ' : '১০ লাখ টাকার ব্যাংকিং বাস্তবতা'}
      </div>

      {/* Bar 1: ১০ লাখ টাকা */}
      <div style={{textAlign: 'left', marginBottom: 26}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 26, fontWeight: 800, marginBottom: 8}}>
          <span style={{color: '#cbd5e1'}}>১০ লাখ টাকা ঋণ (ব্যক্তি)</span>
          <span style={{color: ACCENT_BLUE, fontWeight: 900}}>ঘুম হারাম আপনার!</span>
        </div>
        <div style={{width: '100%', height: 38, background: '#1e293b', borderRadius: 99, overflow: 'hidden', padding: 4}}>
          <div
            style={{
              width: `${24 * grow1}%`,
              height: '100%',
              background: `linear-gradient(90deg, #3b82f6, ${ACCENT_BLUE})`,
              borderRadius: 99,
              boxShadow: '0 0 15px rgba(56,189,248,0.5)',
            }}
          />
        </div>
      </div>

      {/* Bar 2: ৩০০ কোটি টাকা */}
      <div style={{textAlign: 'left'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 26, fontWeight: 800, marginBottom: 8}}>
          <span style={{color: '#cbd5e1'}}>৩০০ কোটি টাকা ঋণ (কর্পোরেট)</span>
          <span style={{color: ACCENT_RED, fontWeight: 900}}>ঘুম হারাম ব্যাংক ম্যানেজারের!</span>
        </div>
        <div style={{width: '100%', height: 44, background: '#1e293b', borderRadius: 99, overflow: 'hidden', padding: 4}}>
          <div
            style={{
              width: `${96 * grow2}%`,
              height: '100%',
              background: `linear-gradient(90deg, #f59e0b, ${ACCENT_RED})`,
              borderRadius: 99,
              boxShadow: '0 0 25px rgba(239,68,68,0.7)',
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 26,
          padding: '12px 20px',
          borderRadius: 16,
          background: focus === 'huge' ? 'rgba(239,68,68,0.18)' : 'rgba(56,189,248,0.15)',
          border: `2px dashed ${focus === 'huge' ? ACCENT_RED : ACCENT_BLUE}`,
          fontSize: 26,
          fontWeight: 800,
          color: '#fff',
        }}
      >
        {focus === 'huge' ? '⚠️ ঝুঁকি তখন ব্যাংকের অস্তিত্বের ওপর চেপে বসে!' : '⚠️ স্বল্প ঋণে সম্পূর্ণ মানসিক বোঝা সাধারণ ব্যক্তির ওপর।'}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ৩. ব্যাংক চেক ও হাসাহাসির ট্রল গ্রাফিক (Motion Graphic)
// -------------------------------------------------------------
const CheckBounceGraphic: React.FC<{laughReaction?: boolean}> = ({laughReaction}) => {
  const f = useCurrentFrame();
  const stampSpring = spring({frame: f - 6, fps: 30, config: {damping: 10, mass: 0.9}});
  const emojiPop = spring({frame: f - 12, fps: 30, config: {damping: 12}});
  return (
    <div style={{position: 'absolute', top: 380, left: 44, right: 44}}>
      {/* চেক */}
      <div
        style={{
          position: 'relative',
          padding: '32px 30px',
          borderRadius: 24,
          background: '#f8fafc',
          border: '4px solid #cbd5e1',
          boxShadow: '0 25px 65px rgba(0,0,0,0.92)',
          color: '#0f172a',
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed #94a3b8', paddingBottom: 14, marginBottom: 18}}>
          <div style={{fontSize: 28, fontWeight: 900, color: '#1e293b'}}>MUTUAL TRUST BANK PLC</div>
          <div style={{fontSize: 22, fontWeight: 700, color: '#64748b'}}>DATE: 18/10/2026</div>
        </div>
        <div style={{fontSize: 22, fontWeight: 700, color: '#475569', marginBottom: 6}}>PAY AGAINST THIS CHEQUE:</div>
        <div style={{fontSize: 50, fontWeight: 900, color: '#dc2626', background: '#fee2e2', padding: '12px 18px', borderRadius: 12, textAlign: 'center', border: '2px solid #ef4444'}}>
          ৳ ২২৬,৭৫,১০,০০০ /-
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, paddingTop: 12, borderTop: '2px dashed #94a3b8'}}>
          <div style={{fontSize: 22, fontWeight: 800, color: '#dc2626'}}>● INSUFFICIENT FUNDS</div>
          <div style={{fontSize: 26, fontWeight: 900, fontFamily: 'serif', fontStyle: 'italic'}}>Ananta Jalil</div>
        </div>

        {/* স্ট্যাম্প */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '25%',
            transform: `translate(-50%, -50%) rotate(-14deg) scale(${Math.max(0, stampSpring)})`,
            padding: '10px 28px',
            border: '5px solid #dc2626',
            borderRadius: 14,
            color: '#dc2626',
            fontSize: 40,
            fontWeight: 900,
            background: 'rgba(254,226,226,0.92)',
            letterSpacing: 2,
            boxShadow: '0 10px 30px rgba(220,38,38,0.4)',
          }}
        >
          DISHONOURED
        </div>
      </div>

      {/* হাসাহাসির সামাজিক প্রতিক্রিয়া ইমোজি */}
      {laughReaction ? (
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            transform: `scale(${Math.max(0, emojiPop)})`,
          }}
        >
          <div style={{padding: '10px 22px', borderRadius: 99, background: 'rgba(239,68,68,0.9)', color: '#fff', fontSize: 24, fontWeight: 900, boxShadow: '0 8px 24px rgba(0,0,0,0.6)'}}>
            😂 হাসাহাসি ও ট্রল
          </div>
          <div style={{padding: '10px 22px', borderRadius: 99, background: 'rgba(245,158,11,0.9)', color: '#070b14', fontSize: 24, fontWeight: 900, boxShadow: '0 8px 24px rgba(0,0,0,0.6)'}}>
             ভাইরাল হেডলাইন
          </div>
          <div style={{padding: '10px 22px', borderRadius: 99, background: 'rgba(15,23,42,0.95)', color: '#fff', fontSize: 24, fontWeight: 900, border: '2px solid #64748b'}}>
            সোশ্যাল মিডিয়া মিম
          </div>
        </div>
      ) : null}
    </div>
  );
};

// -------------------------------------------------------------
// ৪. আসল অনন্ত জলিল ফটো ফ্রেম (Cinematic Framed Visual)
// -------------------------------------------------------------
const RealAnantaFrame: React.FC<{
  src: string;
  dur: number;
  badge?: string;
  sub?: string;
  zoom?: [number, number];
  pos?: string;
}> = ({src, dur, badge, sub, zoom = [1, 1.08], pos = '50% 30%'}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, clampOpts);
  return (
    <AbsoluteFill style={{background: '#070b14', overflow: 'hidden'}}>
      {/* মূল ছবি */}
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: pos,
          transform: `scale(${z})`,
          filter: 'contrast(1.05) brightness(0.95)',
        }}
      />
      {/* সিনেমাটিক ব্লেন্ডিং */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(6,10,20,0.85) 0%, rgba(6,10,20,0.05) 26%, rgba(6,10,20,0.18) 60%, rgba(6,10,20,0.96) 100%)',
        }}
      />
      {badge ? (
        <div
          style={{
            position: 'absolute',
            bottom: 320,
            left: 50,
            right: 50,
            padding: '18px 26px',
            borderRadius: 20,
            background: 'rgba(7,11,22,0.92)',
            border: `3px solid ${GOLD}`,
            textAlign: 'center',
            boxShadow: '0 16px 45px rgba(0,0,0,0.85)',
          }}
        >
          <div style={{fontSize: 38, fontWeight: 900, color: '#fff'}}>{badge}</div>
          {sub ? <div style={{fontSize: 24, fontWeight: 700, color: GOLD, marginTop: 6}}>{sub}</div> : null}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------
// ৫. সোশ্যাল মিডিয়া ট্রল দেয়াল (Social Feed Animation)
// -------------------------------------------------------------
const SocialTrollFeed: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const b1 = spring({frame: f - 2, fps: 30, config: {damping: 12}});
  const b2 = spring({frame: f - 8, fps: 30, config: {damping: 12}});
  const b3 = spring({frame: f - 14, fps: 30, config: {damping: 12}});
  return (
    <div style={{position: 'absolute', top: 380, left: 48, right: 48}}>
      <div
        style={{
          padding: '24px 28px',
          borderRadius: 22,
          background: 'rgba(15,23,42,0.96)',
          border: '3px solid #38bdf8',
          marginBottom: 18,
          boxShadow: '0 15px 40px rgba(0,0,0,0.8)',
          transform: `translateX(${(1 - Math.max(0, b1)) * 60}px) scale(${Math.max(0, b1)})`,
        }}
      >
        <div style={{fontSize: 22, fontWeight: 800, color: '#38bdf8'}}>💬 @MovieFanBD</div>
        <div style={{fontSize: 34, fontWeight: 900, color: '#fff', marginTop: 4}}>
          “ভাই কি এবার ধরা খেলেন? ২২৬ কোটির চেক বাউন্স!” 😂
        </div>
      </div>

      <div
        style={{
          padding: '24px 28px',
          borderRadius: 22,
          background: 'rgba(15,23,42,0.96)',
          border: '3px solid #f59e0b',
          marginBottom: 18,
          boxShadow: '0 15px 40px rgba(0,0,0,0.8)',
          transform: `translateX(${(1 - Math.max(0, b2)) * -60}px) scale(${Math.max(0, b2)})`,
        }}
      >
        <div style={{fontSize: 22, fontWeight: 800, color: '#f59e0b'}}>🎬 @MemeHub_Dhaka</div>
        <div style={{fontSize: 34, fontWeight: 900, color: '#fff', marginTop: 4}}>
          “অসম্ভবকে সম্ভব করাই অনন্তের কাজ — এখন মিম বানাও!” 🤣
        </div>
      </div>

      <div
        style={{
          padding: '24px 28px',
          borderRadius: 22,
          background: 'rgba(15,23,42,0.96)',
          border: '3px solid #ef4444',
          boxShadow: '0 15px 40px rgba(0,0,0,0.8)',
          transform: `translateY(${(1 - Math.max(0, b3)) * 40}px) scale(${Math.max(0, b3)})`,
        }}
      >
        <div style={{fontSize: 22, fontWeight: 800, color: '#ef4444'}}>📰 @BreakingTimeline</div>
        <div style={{fontSize: 34, fontWeight: 900, color: '#fff', marginTop: 4}}>
          “সামাজিক মাধ্যমে তোলপাড়: এবার আর রক্ষা নেই!” 📉
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ৬. করোনা রফতানি ধস লাইন চার্ট (Export Crash Line Chart)
// -------------------------------------------------------------
const ExportCrashChart: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const lineDraw = interpolate(f, [4, Math.max(12, dur * 0.7)], [0, 1], clampOpts);
  return (
    <div
      style={{
        position: 'absolute',
        top: 360,
        left: 48,
        right: 48,
        padding: '36px 30px',
        borderRadius: 30,
        background: 'rgba(8,12,22,0.96)',
        border: `3px solid ${ACCENT_RED}`,
        boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 24, fontWeight: 800, color: '#94a3b8', letterSpacing: 1.5, marginBottom: 8}}>
        মার্চ ২০২০: বিশ্ব বাণিজ্য বিপর্যয়
      </div>
      <div style={{fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 16}}>
        তৈরি পোশাক রফতানি খাতের মহাধস
      </div>

      {/* SVG Line Chart */}
      <svg width={720} height={260} viewBox="0 0 720 260" style={{marginTop: 10}}>
        {/* অক্ষ */}
        <line x1={60} y1={220} x2={680} y2={220} stroke="#334155" strokeWidth={4} />
        <line x1={60} y1={30} x2={60} y2={220} stroke="#334155" strokeWidth={4} />
        {/* গ্রিড */}
        <line x1={60} y1={120} x2={680} y2={120} stroke="#1e293b" strokeWidth={2} strokeDasharray="6 6" />
        {/* পতন বক্ররেখা */}
        <path
          d="M 70 50 Q 240 60 400 150 T 670 210"
          fill="none"
          stroke={ACCENT_RED}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={700}
          strokeDashoffset={700 * (1 - lineDraw)}
        />
        <circle cx={70} cy={50} r={12} fill="#38bdf8" />
        <circle cx={670} cy={210} r={16} fill={ACCENT_RED} stroke="#fff" strokeWidth={4} opacity={lineDraw > 0.85 ? 1 : 0} />
      </svg>

      <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 20px', fontSize: 26, fontWeight: 800}}>
        <span style={{color: '#38bdf8'}}>স্বাভাবিক রফতানি (১০০%)</span>
        <span style={{color: ACCENT_RED, fontWeight: 900}}>শত কোটি টাকার অর্ডার বাতিল (-৮৫%)</span>
      </div>

      <div style={{marginTop: 20, padding: '10px 20px', borderRadius: 14, background: 'rgba(239,68,68,0.2)', border: '2px solid #ef4444', fontSize: 24, fontWeight: 900, color: '#fca5a5'}}>
        ⚠️ আন্তর্জাতিক বায়ারদের একতরফা অর্ডার বাতিলের ঝড়
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ৭. ১০,০০০ শ্রমিক ও পরিবারের চুলা ইনফোগ্রাফিক (Worker Infographic)
// -------------------------------------------------------------
const WorkerLivelihoodCard: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const count = Math.min(10000, Math.round(interpolate(f, [2, Math.max(10, dur * 0.6)], [0, 10000], clampOpts)));
  const s = spring({frame: f, fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        position: 'absolute',
        top: 370,
        left: 48,
        right: 48,
        padding: '36px 30px',
        borderRadius: 30,
        background: 'rgba(8,14,24,0.96)',
        border: `3px solid ${ACCENT_EMERALD}`,
        boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
        textAlign: 'center',
        transform: `scale(${s})`,
      }}
    >
      <div style={{fontSize: 26, fontWeight: 800, color: '#94a3b8', letterSpacing: 1.5, marginBottom: 12}}>
        এজেআই গ্রুপ কারখানা পরিবার
      </div>
      <div style={{fontSize: 68, fontWeight: 900, color: ACCENT_EMERALD, lineHeight: 1.1}}>
        {count.toLocaleString()}+
      </div>
      <div style={{fontSize: 38, fontWeight: 900, color: '#fff', marginTop: 10}}>
        মেহনতি পোশাক শ্রমিকের জীবিকা
      </div>
      <div
        style={{
          marginTop: 22,
          padding: '16px 20px',
          borderRadius: 18,
          background: 'rgba(245,158,11,0.15)',
          border: `2px solid ${GOLD}`,
          fontSize: 28,
          fontWeight: 900,
          color: GOLD,
        }}
      >
        “১০ হাজার পরিবারের চুলা যেন বন্ধ না হয়!”
      </div>
      <div style={{fontSize: 22, fontWeight: 700, color: '#cbd5e1', marginTop: 14}}>
        শ্রমিক ছাঁটাই না করে পাশে থাকার ঐতিহাসিক সিদ্ধান্ত
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ৮. ২০০ কোটি টাকার বিশেষ ঋণ ফ্লো ডায়াগ্রাম (Loan Flow Infographic)
// -------------------------------------------------------------
const LoanFlowDiagram: React.FC = () => {
  const f = useCurrentFrame();
  const s1 = spring({frame: f - 2, fps: 30, config: {damping: 13}});
  const s2 = spring({frame: f - 10, fps: 30, config: {damping: 13}});
  return (
    <div style={{position: 'absolute', top: 350, left: 48, right: 48, textAlign: 'center'}}>
      {/* বক্স ১: ব্যাংক লোন */}
      <div
        style={{
          padding: '24px 28px',
          borderRadius: 24,
          background: 'rgba(15,23,42,0.96)',
          border: `3px solid ${ACCENT_BLUE}`,
          transform: `scale(${Math.max(0, s1)})`,
          boxShadow: '0 16px 40px rgba(0,0,0,0.85)',
        }}
      >
        <div style={{fontSize: 22, fontWeight: 800, color: ACCENT_BLUE}}>করোনাকালীন বিশেষ সহায়তা</div>
        <div style={{fontSize: 44, fontWeight: 900, color: '#fff', marginTop: 4}}>
          ব্যাংক থেকে বিশেষ ঋণ: ৳ ২০০ কোটি
        </div>
      </div>

      {/* নির্দেশক তীর */}
      <div style={{fontSize: 42, color: ACCENT_EMERALD, margin: '10px 0'}}>
        ⬇️ ⬇️ ⬇️
      </div>

      {/* বক্স ২: শ্রমিকদের বেতন */}
      <div
        style={{
          padding: '24px 28px',
          borderRadius: 24,
          background: 'rgba(6,28,18,0.96)',
          border: `3px solid ${ACCENT_EMERALD}`,
          transform: `scale(${Math.max(0, s2)})`,
          boxShadow: '0 16px 40px rgba(0,0,0,0.85)',
        }}
      >
        <div style={{fontSize: 22, fontWeight: 800, color: ACCENT_EMERALD}}>সরাসরি মানবিক প্রয়োগ</div>
        <div style={{fontSize: 42, fontWeight: 900, color: '#fff', marginTop: 4}}>
          ১০,০০০ শ্রমিকের মাসিক বেতন-ভাতা নিয়মিত পরিশোধ
        </div>
        <div style={{fontSize: 24, fontWeight: 800, color: '#bef264', marginTop: 8}}>
          ✓ কোনো টাকা আত্মসাৎ বা বিদেশে পাচার নয়
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ৯. বেগম পাড়া বনাম অনন্ত জলিল (VS Infographic)
// -------------------------------------------------------------
const BegumParaVsAnantaCard: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        position: 'absolute',
        top: 350,
        left: 44,
        right: 44,
        padding: '30px 24px',
        borderRadius: 28,
        background: 'rgba(8,12,22,0.96)',
        border: `3px solid ${GOLD}`,
        boxShadow: '0 25px 70px rgba(0,0,0,0.92)',
        textAlign: 'center',
        transform: `scale(${s})`,
      }}
    >
      <div style={{fontSize: 24, fontWeight: 800, color: '#94a3b8', letterSpacing: 1.5, marginBottom: 16}}>
        বাস্তব দুনিয়ার বৈপরীত্য
      </div>
      <div style={{display: 'flex', gap: 16}}>
        {/* বাম পাশ: অর্থ পাচারকারী */}
        <div
          style={{
            flex: 1,
            padding: '20px 16px',
            borderRadius: 20,
            background: 'rgba(239,68,68,0.15)',
            border: '2px solid #ef4444',
          }}
        >
          <div style={{fontSize: 22, fontWeight: 900, color: ACCENT_RED}}>অর্থ পাচারকারী চক্র</div>
          <div style={{fontSize: 32, fontWeight: 900, color: '#fff', margin: '10px 0'}}>
            বেগম পাড়া
          </div>
          <div style={{fontSize: 20, fontWeight: 700, color: '#fca5a5', lineHeight: 1.4}}>
            • হাজার কোটি লুট<br />
            • বিদেশে আয়েশি জীবন<br />
            • দেশ ছেড়ে পলায়ন
          </div>
        </div>

        {/* ডান পাশ: অনন্ত জলিল */}
        <div
          style={{
            flex: 1,
            padding: '20px 16px',
            borderRadius: 20,
            background: 'rgba(16,185,129,0.15)',
            border: '2px solid #10b981',
          }}
        >
          <div style={{fontSize: 22, fontWeight: 900, color: ACCENT_EMERALD}}>এম এ জলিল অনন্ত</div>
          <div style={{fontSize: 32, fontWeight: 900, color: '#fff', margin: '10px 0'}}>
            দেশেই অবস্থান
          </div>
          <div style={{fontSize: 20, fontWeight: 700, color: '#bef264', lineHeight: 1.4}}>
            • দেশ ছেড়ে পালাননি<br />
            • সম্পদ বিক্রির ঘোষণা<br />
            • প্রতিটি পয়সা শোধের পণ
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ১০. সম্পদ বিক্রির প্রকাশ্য অঙ্গীকার নোটিশ (Pledge Document)
// -------------------------------------------------------------
const PledgeDocumentCard: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 13}});
  return (
    <div
      style={{
        position: 'absolute',
        top: 360,
        left: 48,
        right: 48,
        padding: '36px 30px',
        borderRadius: 26,
        background: '#fffbeb',
        border: `4px solid ${GOLD}`,
        boxShadow: '0 25px 70px rgba(0,0,0,0.92)',
        color: '#1e293b',
        textAlign: 'center',
        transform: `scale(${s})`,
      }}
    >
      <div style={{fontSize: 22, fontWeight: 800, color: '#b45309', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8}}>
        বাংলাদেশ ব্যাংক এক্সিট পলিসি আবেদন
      </div>
      <div style={{fontSize: 38, fontWeight: 900, color: '#78350f', marginBottom: 14, borderBottom: '2px dashed #d97706', paddingBottom: 10}}>
        প্রকাশ্য দায়বদ্ধতা ও অঙ্গীকার
      </div>
      <div style={{fontSize: 34, fontWeight: 900, color: '#0f172a', lineHeight: 1.35}}>
        “দরকারে আমার সমস্ত জমি আর ফ্যাক্টরি বিক্রি করে ব্যাংকের ঋণের প্রতিটি পয়সা শোধ করবো, তবুও শ্রমিকদের অনিশ্চয়তায় ফেলবো না!”
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 14, borderTop: '2px dashed #d97706'}}>
        <div style={{fontSize: 22, fontWeight: 800, color: '#059669'}}>● ঋণ সমন্বয়ের সর্বোচ্চ সদিচ্ছা</div>
        <div style={{fontSize: 26, fontWeight: 900, fontFamily: 'serif', fontStyle: 'italic', color: '#1e293b'}}>M. A. Jalil Ananta</div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ১১. কাস্টম ফলো কল-টু-অ্যাকশন (Modern Follow CTA)
// -------------------------------------------------------------
const FollowCtaCard: React.FC<{top?: number}> = ({top = 400}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 48,
        right: 48,
        padding: '38px 30px',
        borderRadius: 28,
        background: 'rgba(6,10,24,0.96)',
        border: `3px solid ${ACCENT_GOLD}`,
        boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
        textAlign: 'center',
        transform: `scale(${Math.max(0, s)})`,
      }}
    >
      <div style={{fontSize: 26, fontWeight: 800, color: '#94a3b8', letterSpacing: 1.5, marginBottom: 12}}>
        বাস্তব দুনিয়ার সত্য জানতে
      </div>
      <div style={{fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 20}}>
        আজই যুক্ত থাকুন আমাদের সাথে
      </div>
      <div
        style={{
          display: 'inline-block',
          padding: '16px 42px',
          borderRadius: 99,
          background: `linear-gradient(90deg, ${ACCENT_GOLD}, #fbbf24)`,
          color: '#070b14',
          fontSize: 36,
          fontWeight: 900,
          boxShadow: '0 10px 30px rgba(245,158,11,0.5)',
          letterSpacing: 0.5,
        }}
      >
        ফলো করুন BBA
      </div>
      <div style={{fontSize: 22, fontWeight: 700, color: '#64748b', marginTop: 18}}>
        BE BEYOND AVERAGE
      </div>
    </div>
  );
};

// =============================================================
// দৃশ্যসমূহ (৩৭টি দৃশ্য — সম্পূর্ণ মোশন গ্রাফিক্স ও আসল ছবি সমন্বিত)
// =============================================================
const SCENES: Record<string, React.FC<SP>> = {
  // ১. জে পল গেটি উক্তি সূচনা
  quote_intro: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.06]} />,
    over: () => (
      <>
        <TopTag label="করপোরেট অর্থনীতির সূত্র" color={GOLD} />
        <TopBanner text="ব্যাংকিং দুনিয়ার নির্মম সত্য" sub="J. Paul Getty Paradox" color={GOLD} top={210} />
        <GettyQuoteCard top={400} />
      </>
    ),
  }),

  // ২. ১০ লাখ টাকা ঋণ
  quote_ten_lakh: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.06, 1.12]} />,
    over: (_f, dur) => (
      <>
        <TopTag label="স্বল্প ঋণ" color={ACCENT_BLUE} />
        <DebtCompareInfographic focus="small" dur={dur} />
      </>
    ),
  }),

  // ৩. ৩০০ কোটি টাকা ঋণ
  quote_three_hundred: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.12, 1.18]} origin="50% 30%" />,
    over: (_f, dur) => (
      <>
        <TopTag label="৩০০ কোটি টাকার ঋণ" color={ACCENT_RED} />
        <DebtCompareInfographic focus="huge" dur={dur} />
      </>
    ),
  }),

  // ৪. ২২৬ কোটির চেক বাউন্স ও হাসাহাসি
  check_bounce_laugh: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.07]} origin="50% 40%" />,
    over: () => (
      <>
        <TopTag label="২২৬ কোটি টাকার চেক বাউন্স" color={ACCENT_RED} />
        <TopBanner text="অনন্ত জলিলের চেক বাউন্স নিয়ে হাসাহাসি" sub="সোশ্যাল মিডিয়ায় ভাইরাল হেডলাইন" color={ACCENT_RED} top={210} />
        <CheckBounceGraphic laughReaction />
      </>
    ),
  }),

  // ৫. বেরিয়ে এলো অবিশ্বাস্য সত্য (আসল অনন্ত জলিলের ছবি)
  truth_emerged: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-portrait.jpg" dur={dur} badge="এম এ জলিল অনন্ত" sub="চিত্রনায়ক ও পোশাকশিল্প উদ্যোক্তা" zoom={[1, 1.07]} pos="50% 25%" />,
    over: () => (
      <>
        <TopTag label="আড়ালের সত্য" color={ACCENT_GOLD} />
        <TopBanner text="সামনে এলো অবিশ্বাস্য এক সত্য!" sub="যা সাধারণ মানুষের সম্পূর্ণ অজানা ছিল" color={ACCENT_GOLD} top={210} />
      </>
    ),
  }),

  // ৬. সমালোচকদের স্যালুট (আসল অনন্ত জলিল)
  critics_salute: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-portrait.jpg" dur={dur} badge="সমালোচকেরাও আজ স্যালুট জানাতে বাধ্য" sub="বাস্তব মানবিক সত্যের জয়" zoom={[1.07, 1.14]} pos="50% 25%" />,
    over: () => (
      <>
        <TopTag label="সমালোচকদের সম্মান" color={ACCENT_EMERALD} />
        <TopBanner text="ঘোর সমালোচকেরাও আজ স্যালুট জানাচ্ছে!" sub="সত্য জানার পর জনমতের সম্পূর্ণ পরিবর্তন" color={ACCENT_EMERALD} top={210} />
      </>
    ),
  }),

  // ৭. কী সেই গোপন সত্য?
  what_is_truth: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.06]} />,
    over: () => (
      <>
        <TopTag label="আসল প্রেক্ষাপট" color={ACCENT_BLUE} />
        <TopBanner text="কী সেই গোপন সত্য?" sub="এই ঋণের পেছনে আসলে কী ঘটেছিল?" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  // ৮. দামি গাড়ি আর অ্যাকশন হিরো (আসল অনন্ত জলিল স্যুট পরা)
  decade_image: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-tycoon.jpg" dur={dur} badge="দামি গাড়ি আর অ্যাকশন হিরো" sub="এক দশক ধরে মানুষ যেভাবে চিনেছে" zoom={[1, 1.08]} pos="50% 20%" />,
    over: () => (
      <>
        <TopTag label="চলচ্চিত্র তারকা" color={GOLD} />
        <TopBanner text="দামি গাড়ি আর অ্যাকশন সিনেমার হিরো" sub="এক দশক ধরে যেভাবে দেখেছে পুরো দেশ" color={GOLD} top={210} />
      </>
    ),
  }),

  // ৯. ডায়ালগ নিয়ে ট্রল ও মিম (Social Feed)
  dialogue_troll: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.11]} />,
    over: (_f, dur) => (
      <>
        <TopTag label="সোশ্যাল মিডিয়া ট্রল" color={ACCENT_GOLD} />
        <TopBanner text="ডায়ালগ নিয়ে ট্রল আর মিম!" sub="সোশ্যাল মিডিয়ায় ভাইরাল হাসির খোরাক" color={ACCENT_GOLD} top={210} />
        <SocialTrollFeed dur={dur} />
      </>
    ),
  }),

  // ১০. শীর্ষ ব্যাংকে চেক বাউন্স
  top_bank_bounce: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.11, 1.17]} />,
    over: () => (
      <>
        <TopTag label="আইনি নোটিশ" color={ACCENT_RED} />
        <TopBanner text="শীর্ষ ব্যাংকে ২২৬ কোটি টাকার চেক বাউন্স" sub="আইনি নোটিশ জারির পর আলোচনা শুরু" color={ACCENT_RED} top={210} />
        <CheckBounceGraphic />
      </>
    ),
  }),

  // ১১. ধরা পড়েছেন এই ব্যবসায়ী
  social_ridicule: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.12]} />,
    over: (_f, dur) => (
      <>
        <TopTag label="ভাইরাল হেডলাইন" color={ACCENT_RED} />
        <TopBanner text="“এবার ধরা পড়েছেন এই ব্যবসায়ী!”" sub="চারদিকে নানা জল্পনা আর ট্রল" color={ACCENT_RED} top={210} />
        <SocialTrollFeed dur={dur} />
      </>
    ),
  }),

  // ১২. ঋণের ইতিহাস কতটা বেদনার
  hidden_pain: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="অজানা বাস্তবতা" color={GOLD} />
        <TopBanner text="এই ঋণের আসল ইতিহাস কতটা বেদনার!" sub="যা অধিকাংশ মানুষেরই সম্পূর্ণ অজানা ছিল" color={GOLD} top={210} />
      </>
    ),
  }),

  // ১৩. ২০২০ করোনা মহামারি
  remember_covid: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1, 1.07]} />,
    over: () => (
      <>
        <TopTag label="২০২০ মহামারি" color={ACCENT_RED} />
        <TopBanner text="করোনার সেই ভয়াল দিনগুলোর কথা মনে আছে?" sub="সারা পৃথিবী যখন নিস্তব্ধ হয়ে গেল" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  // ১৪. পুরো দুনিয়া থমকে গেলো (Export Crash)
  world_stopped: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1.07, 1.13]} />,
    over: (_f, dur) => (
      <>
        <TopTag label="বিশ্ব বাণিজ্য স্থবির" color={ACCENT_RED} />
        <ExportCrashChart dur={dur} />
      </>
    ),
  }),

  // ১৫. অর্ডার বাতিল (Export Crash Chart)
  orders_cancelled: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1.13, 1.19]} />,
    over: (_f, dur) => (
      <>
        <TopTag label="শত শত কোটি টাকার ক্ষতি" color={ACCENT_RED} />
        <TopBanner text="বিদেশি বায়াররা শত কোটি টাকার অর্ডার বাতিল করলো!" sub="রফতানি খাতে আকস্মিক বিপর্যয়" color={ACCENT_RED} top={210} />
        <ExportCrashChart dur={dur} />
      </>
    ),
  }),

  // ১৬. কারখানার গেটে তালা
  factories_locked: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.07]} />,
    over: () => (
      <>
        <TopTag label="কারখানায় তালা" color={ACCENT_GOLD} />
        <TopBanner text="মালিকেরা কারখানার গেটে তালা ঝুলিয়ে দিলো" sub="নিজেদের আর্থিক দায় এড়াতে হাত গুটিয়ে নিল" color={ACCENT_GOLD} top={210} />
      </>
    ),
  }),

  // ১৭. শ্রমিকদের রাস্তায় নামিয়ে দিলো
  workers_starving: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.07, 1.14]} />,
    over: () => (
      <>
        <TopTag label="শ্রমিকদের অনিশ্চয়তা" color={ACCENT_RED} />
        <TopBanner text="হাজার হাজার শ্রমিককে অনাহারে রাস্তায় নামালো!" sub="অসহায় পরিবারগুলোর মুখে চরম অনিশ্চয়তা" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  // ১৮. অনন্ত জলিলের ফ্যাক্টরিতে ১০,০০০ শ্রমিক (Infographic)
  ten_thousand_workers: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.14, 1.2]} origin="50% 60%" />,
    over: (_f, dur) => (
      <>
        <TopTag label="১০,০০০+ মেহনতি শ্রমিক" color={ACCENT_EMERALD} />
        <WorkerLivelihoodCard dur={dur} />
      </>
    ),
  }),

  // ১৯. তিনি হাত গুটিয়ে সরে যাননি (আসল অনন্ত জলিল)
  refused_to_quit: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-portrait.jpg" dur={dur} badge="তিনি হাত গুটিয়ে সরে যাননি!" sub="শ্রমিকদের অনিশ্চয়তায় ফেলে পালাননি" zoom={[1, 1.08]} pos="50% 25%" />,
    over: () => (
      <>
        <TopTag label="দায় এড়াননি তিনি" color={ACCENT_BLUE} />
        <TopBanner text="অন্যদের মতো হাত গুটিয়ে পালিয়ে যাননি!" sub="শ্রমিকদের পাশে থাকার অটল সংকল্প" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  // ২০. পরিবারের চুলা যেন বন্ধ না হয় (আসল অনন্ত ও সন্তান পরিবার ছবি)
  chula_off: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-family.jpg" dur={dur} badge="১০ হাজার পরিবারের মুখের অন্ন" sub="শ্রমিকদের পরিবারের রুটিরুজি বন্ধ হতে দেননি" zoom={[1, 1.08]} pos="50% 40%" />,
    over: () => (
      <>
        <TopTag label="১০ হাজার পরিবার" color={GOLD} />
        <TopBanner text="“১০ হাজার পরিবারের চুলা যেন বন্ধ না হয়!”" sub="সেই এক জেদ থেকে ঝুঁকি নিলেন" color={GOLD} top={210} />
      </>
    ),
  }),

  // ২১. জীবনের সবচেয়ে বড় ঝুঁকি (আসল অনন্ত জলিল)
  took_huge_risk: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-portrait.jpg" dur={dur} badge="জীবনের সবচেয়ে বড় আর্থিক ঝুঁকি" sub="নিজের ব্যবসার ভবিষ্যৎ বাজি রাখলেন" zoom={[1.05, 1.12]} pos="50% 25%" />,
    over: () => (
      <>
        <TopTag label="জীবনের সবচেয়ে বড় ঝুঁকি" color={ACCENT_RED} />
        <TopBanner text="অনন্ত জলিল জীবনের সবচেয়ে বড় ঝুঁকি নিলেন" sub="শ্রমিকদের বাঁচাতে নিজের ভবিষ্যৎ বাজি" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  // ২২. ২০০ কোটি টাকার ঋণ ফ্লো ডায়াগ্রাম
  loan_for_workers: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.12]} />,
      over: () => (
        <>
          <TopTag label="২০০ কোটি টাকার ঋণ" color={GOLD} />
          <LoanFlowDiagram />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="বেতন সচল রাখা" color={ACCENT_EMERALD} />
          <TopBanner text="মাসের পর মাস নিয়মিত বেতন পরিশোধ করলেন" sub="১০ হাজার শ্রমিকের মুখে অন্ন নিশ্চিত" color={ACCENT_EMERALD} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  // ২৩. করোনা কেটে গেলো
  covid_passed: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1, 1.05]} />,
    over: () => (
      <>
        <TopTag label="মহামারি পরবর্তী সংকট" color={ACCENT_GOLD} />
        <TopBanner text="করোনা কেটে গেল..." sub="কিন্তু শুরু হলো আরেক কঠিন অর্থনৈতিক লড়াই" color={ACCENT_GOLD} top={210} />
      </>
    ),
  }),

  // ২৪. চড়া সুদ আর গ্যাস সংকট
  interest_crisis: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.1, 1.17]} />,
    over: () => (
      <>
        <TopTag label="চড়া সুদ ও গ্যাস সংকট" color={ACCENT_RED} />
        <TopBanner text="চড়া সুদ আর গ্যাস সংকটে কারখানা বিপন্ন!" sub="সুদে-আসলে দেনার পরিমাণ বাড়তে থাকল" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  // ২৫. হাজার হাজার কোটি লুট
  looted_billions: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.11]} />,
    over: () => (
      <>
        <TopTag label="হাজার হাজার কোটি টাকা লোপাট" color={ACCENT_RED} />
        <TopBanner text="ব্যাংক লুট করে হাজার কোটি লোপাট!" sub="দেশের অর্থনীতি ধ্বংসকারী রাঘববোয়াল" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  // ২৬. বিদেশে বেগম পাড়া (VS Infographic)
  begum_para: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1.05, 1.12]} />,
    over: () => (
      <>
        <TopTag label="বিদেশে বেগম পাড়া" color={ACCENT_RED} />
        <BegumParaVsAnantaCard />
      </>
    ),
  }),

  // ২৭. অনন্ত জলিল দেশ ছেড়ে পালাননি (আসল অনন্ত জলিল)
  stayed_in_country: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-portrait.jpg" dur={dur} badge="অনন্ত জলিল দেশ ছেড়ে পালাননি!" sub="মাটি কামড়ে দেশেই অবস্থান করছেন" zoom={[1, 1.08]} pos="50% 25%" />,
    over: () => (
      <>
        <TopTag label="দেশ ছেড়ে পালাননি" color={ACCENT_EMERALD} />
        <TopBanner text="সেখানে অনন্ত জলিল দেশ ছেড়ে পালাননি!" sub="দায় এড়িয়ে পালিয়ে যাওয়ার মানুষ তিনি নন" color={ACCENT_EMERALD} top={210} />
      </>
    ),
  }),

  // ২৮. বুক চিতিয়ে দাঁড়িয়ে প্রকাশ্য ঘোষণা (আসল অনন্ত জলিল)
  brave_public_words: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-portrait.jpg" dur={dur} badge="বুক চিতিয়ে দাঁড়িয়ে প্রকাশ্যে বললেন" sub="অঙ্গীকার ও সত্যের দৃঢ়তা" zoom={[1.08, 1.14]} pos="50% 25%" />,
    over: () => (
      <>
        <TopTag label="প্রকাশ্য দায়বদ্ধতা" color={GOLD} />
        <TopBanner text="বুক চিতিয়ে প্রকাশ্যে ঘোষণা দিলেন" sub="আইন ও ব্যাংকের মুখোমুখি দাঁড়িয়েছেন" color={GOLD} top={210} />
      </>
    ),
  }),

  // ২৯. সব জমি ও ফ্যাক্টরি বিক্রির অঙ্গীকার (Pledge Document)
  sell_factory_promise: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="সম্পদ বিক্রি করে ঋণ শোধ" color={ACCENT_BLUE} />
        <PledgeDocumentCard />
      </>
    ),
  }),

  // ৩০. তবুও শ্রমিকদের রাস্তায় বসতে দেবো না
  save_workers_dignity: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.08, 1.15]} />,
    over: () => (
      <>
        <TopTag label="শ্রমিকের অধিকার" color={GOLD} />
        <TopBanner text="“তবুও শ্রমিকদের রাস্তায় বসতে দেবো না!”" sub="১০ হাজার মেহনতি মানুষের শেষ আশ্রয়" color={GOLD} top={210} />
      </>
    ),
  }),

  // ৩১. অসম্ভবকে সম্ভব করাই অনন্তের কাজ (আসল অনন্ত সাদা স্যুট)
  screen_dialogue: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-tycoon.jpg" dur={dur} badge="“অসম্ভবকে সম্ভব করাই অনন্তের কাজ!”" sub="পর্দার সেই জনপ্রিয় কালজয়ী সংলাপ" zoom={[1, 1.08]} pos="50% 20%" />,
    over: () => (
      <>
        <TopTag label="পর্দার হিরো" color={ACCENT_BLUE} />
        <TopBanner text="পর্দায় বলতেন: অসম্ভবকে সম্ভব করাই কাজ!" sub="সিনেমার হিরোর কালজয়ী সংলাপ" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  // ৩২. বাস্তবের মাটিতে ১০ হাজার শ্রমিকের দায়িত্ব
  real_ground_burden: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.07]} />,
      over: () => (
        <>
          <TopTag label="বাস্তবের মাটিতে" color={GOLD} />
          <TopBanner text="বাস্তবের মাটিতে ১০ হাজার শ্রমিকের দায়িত্ব" sub="নিজের কাঁধে তুলে নিয়েছেন নিঃস্বার্থভাবে" color={GOLD} top={210} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-portrait.jpg" dur={dur} badge="বাস্তব জীবনের কঠিন পরীক্ষা" sub="১০ হাজার পরিবারের রুটিরুজি" zoom={[1, 1.08]} pos="50% 25%" />,
      over: () => (
        <>
          <TopTag label="নিঃস্বার্থ দায়বদ্ধতা" color={GOLD} />
          <TopBanner text="পর্দার চেয়ে বাস্তব অনেক বড়" sub="মানুষের পেটের ভাত জুগিয়েছেন" color={GOLD} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  // ৩৩. কেবল সিনেমার সস্তা হিরো নন (আসল অনন্ত জলিল)
  not_cheap_hero: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-tycoon.jpg" dur={dur} badge="তিনি কেবল সিনেমার সস্তা হিরো নন!" sub="বাস্তবে মানুষের পাশে দাঁড়ানো এক বিরল চরিত্র" zoom={[1.08, 1.15]} pos="50% 20%" />,
    over: () => (
      <>
        <TopTag label="আসল নায়ক" color={GOLD} />
        <TopBanner text="তিনি কেবল সিনেমার সস্তা হিরো নন!" sub="বাস্তব জীবনের পরীক্ষায় উত্তীর্ণ বীর" color={GOLD} top={210} />
      </>
    ),
  }),

  // ৩৪. বাস্তবের এক বিরল দেশপ্রেমিক বীর (আসল অনন্ত জলিল)
  real_patriot: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-portrait.jpg" dur={dur} badge="বাস্তবের এক বিরল দেশপ্রেমিক বীর!" sub="এই স্বার্থপর সমাজে যার তুলনা নেই" zoom={[1.15, 1.22]} pos="50% 25%" />,
    over: () => (
      <>
        <TopTag label="বাস্তবের বীর" color={ACCENT_EMERALD} />
        <TopBanner text="স্বার্থপর সমাজে বাস্তবের বিরল দেশপ্রেমিক বীর!" sub="ইতিহাস তাঁর এই আত্মত্যাগ মনে রাখবে" color={ACCENT_EMERALD} top={210} />
      </>
    ),
  }),

  // ৩৫. ইন্টারনেটের মনগড়া গল্পে বিভ্রান্ত হবেন না
  rumor_warning: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.07]} />,
    over: () => (
      <>
        <TopTag label="গুজবে বিভ্রান্ত হবেন না" color={ACCENT_RED} />
        <TopBanner text="ইন্টারনেটের মনগড়া গল্পে বিভ্রান্ত না হয়ে—" sub="সোশ্যাল মিডিয়ার চটকদার ট্রল এড়িয়ে চলুন" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  // ৩৬. বাস্তব দুনিয়ার সত্য জানুন
  enrich_knowledge: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.07, 1.14]} />,
    over: () => (
      <>
        <TopTag label="বাস্তব জ্ঞান ও সত্য" color={ACCENT_BLUE} />
        <TopBanner text="বাস্তব দুনিয়ার সত্য জেনে জ্ঞান সমৃদ্ধ করতে—" sub="নিজের দৃষ্টিভঙ্গিকে গড়ে তুলুন তথ্যের ভিত্তিতে" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  // ৩৭. ফলো করুন BBA
  follow_cta: R({
    place: DarkBase,
    back: (_f, dur) => <RealAnantaFrame src="ananta/ananta-portrait.jpg" dur={dur} zoom={[1.05, 1.12]} pos="50% 25%" />,
    over: () => <FollowCtaCard top={400} />,
  }),
};

// থাম্বনেইল
export const AnantaThumbnail: React.FC = () => {
  return (
    <PsyThumb
      l1="২২৬ কোটির ব্যাংক নোটিশ"
      l2="অনন্ত জলিলের আড়ালের সত্য!"
      bottom="পর্দার হিরো বনাম ১০ হাজার শ্রমিক"
      term="Corporate Reality · Human Ethics"
      art={<Img src={staticFile('ananta/ananta-tycoon.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%'}} />}
    />
  );
};

export const ananta = story('ananta/', raw, SCENES, AnantaThumbnail, {logo: 'bba2'});
