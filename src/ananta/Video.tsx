// অনন্ত জলিল ও ২২৬ কোটির বাস্তবতা — AnantaHero
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
            'linear-gradient(180deg, rgba(5,8,16,0.76) 0%, rgba(5,8,16,0.08) 24%, rgba(5,8,16,0.12) 66%, rgba(5,8,16,0.92) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// নিরাপদ টপ ট্যাগ
const TopTag: React.FC<{label: string; color?: string}> = ({label, color = GOLD}) => (
  <div
    style={{
      position: 'absolute',
      top: 132,
      right: 48,
      padding: '10px 26px',
      borderRadius: 99,
      background: 'rgba(6,10,20,0.92)',
      border: `3px solid ${color}`,
      fontSize: 30,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: 0.4,
      boxShadow: '0 10px 30px rgba(0,0,0,0.72)',
    }}
  >
    ● {label}
  </div>
);

const TopBanner: React.FC<{text: string; sub?: string; color?: string; top?: number}> = ({
  text,
  sub,
  color = GOLD,
  top = 215,
}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 15, mass: 0.8}});
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 48,
        right: 48,
        padding: '24px 32px',
        borderRadius: 24,
        background: 'rgba(7,11,20,0.92)',
        border: `3px solid ${color}`,
        boxShadow: '0 20px 50px rgba(0,0,0,0.85)',
        transform: `scale(${s})`,
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1.25}}>
        {text}
      </div>
      {sub ? (
        <div style={{fontSize: 28, fontWeight: 700, color, marginTop: 10, letterSpacing: 0.5}}>
          {sub}
        </div>
      ) : null}
    </div>
  );
};

// কার্ড কম্পোনেন্ট
const StatCard: React.FC<{
  eyebrow: string;
  main: string;
  badge?: string;
  color?: string;
  top?: number;
}> = ({eyebrow, main, badge, color = GOLD, top = 480}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 4, fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 56,
        right: 56,
        padding: '36px 32px',
        borderRadius: 30,
        background: 'rgba(6,10,22,0.95)',
        border: `3px solid ${color}`,
        boxShadow: '0 25px 60px rgba(0,0,0,0.88)',
        textAlign: 'center',
        transform: `scale(${Math.max(0, s)})`,
      }}
    >
      <div style={{fontSize: 26, fontWeight: 800, color, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12}}>
        {eyebrow}
      </div>
      <div style={{fontSize: 54, fontWeight: 900, color: '#fff', lineHeight: 1.2}}>
        {main}
      </div>
      {badge ? (
        <div
          style={{
            display: 'inline-block',
            marginTop: 18,
            padding: '10px 24px',
            borderRadius: 99,
            background: color,
            color: '#070b14',
            fontSize: 28,
            fontWeight: 900,
          }}
        >
          {badge}
        </div>
      ) : null}
    </div>
  );
};

// চেক কার্ড
const CheckCard: React.FC<{top?: number}> = ({top = 460}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 48,
        right: 48,
        padding: '32px 30px',
        borderRadius: 24,
        background: '#f8fafc',
        border: '4px solid #cbd5e1',
        boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
        transform: `scale(${Math.max(0, s)})`,
        color: '#0f172a',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed #94a3b8', paddingBottom: 16, marginBottom: 20}}>
        <div style={{fontSize: 28, fontWeight: 900, color: '#1e293b'}}>MUTUAL TRUST BANK PLC</div>
        <div style={{fontSize: 22, fontWeight: 700, color: '#64748b'}}>DATE: 18/10/2026</div>
      </div>
      <div style={{fontSize: 24, fontWeight: 700, color: '#475569', marginBottom: 8}}>PAY AGAINST THIS CHEQUE:</div>
      <div style={{fontSize: 52, fontWeight: 900, color: '#dc2626', background: '#fee2e2', padding: '12px 18px', borderRadius: 12, textAlign: 'center', border: '2px solid #ef4444'}}>
        ৳ ২২৬,৭৫,১০,০০০ /-
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingTop: 14, borderTop: '2px dashed #94a3b8'}}>
        <div style={{fontSize: 22, fontWeight: 800, color: '#dc2626'}}>● DISHONOURED / INSUFFICIENT FUNDS</div>
        <div style={{fontSize: 26, fontWeight: 900, fontFamily: 'serif', fontStyle: 'italic'}}>Ananta Jalil</div>
      </div>
    </div>
  );
};

// কাস্টম ফলো কল-টু-অ্যাকশন
const FollowCtaCard: React.FC<{top?: number}> = ({top = 440}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 48,
        right: 48,
        padding: '36px 30px',
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
      <div style={{fontSize: 50, fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 20}}>
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

// দৃশ্যসমূহ
const SCENES: Record<string, React.FC<SP>> = {
  quote_law: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.07]} />,
    over: () => (
      <>
        <TopTag label="করপোরেট অর্থনীতির সূত্র" color={GOLD} />
        <TopBanner text="ব্যাংকিং দুনিয়ার নির্মম সত্য" sub="J. Paul Getty Paradox" color={GOLD} top={210} />
      </>
    ),
  }),

  small_debt: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.07, 1.13]} />,
    over: () => (
      <>
        <TopTag label="ঋণ ও মানসিক চাপ" color={ACCENT_BLUE} />
        <StatCard eyebrow="স্বল্প ঋণ" main="ব্যক্তির ওপর মানসিক চাপ" badge="দায় ব্যক্তির নিজের" color={ACCENT_BLUE} top={450} />
      </>
    ),
  }),

  huge_debt: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.13, 1.18]} origin="50% 30%" />,
    over: () => (
      <>
        <TopTag label="শত কোটি টাকার ঋণ" color={ACCENT_RED} />
        <StatCard eyebrow="বিশাল ঋণ" main="শত কোটি টাকার অংক!" badge="খেলার মোড় ঘুরে যায়" color={ACCENT_RED} top={450} />
      </>
    ),
  }),

  bank_stress: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.18, 1.24]} origin="50% 60%" />,
    over: () => (
      <>
        <TopTag label="দায়িত্বের উল্টো মোড়" color={GOLD} />
        <StatCard eyebrow="কর্পোরেট প্যারাডক্স" main="ব্যাংকের অস্তিত্বই চাপে পড়ে!" badge="দায়ভার ব্যাংকের ওপর" color={GOLD} top={450} />
      </>
    ),
  }),

  notice_broke: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="এম এ জলিল অনন্ত" color={ACCENT_BLUE} />
        <TopBanner text="চিত্রনায়ক ও শিল্পপতি" sub="আলোচিত ব্যবসায়ী এম এ জলিল অনন্ত" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  huge_amount: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.12]} />,
    over: () => (
      <>
        <TopTag label="আইনি নোটিশ" color={ACCENT_RED} />
        <CheckCard top={450} />
      </>
    ),
  }),

  hidden_truth: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.08, 1.15]} origin="50% 25%" />,
    over: () => (
      <>
        <TopTag label="অজানা বাস্তবতা" color={GOLD} />
        <StatCard eyebrow="খবরের আড়ালের সত্যি" main="যা জানলে সবাই শ্রদ্ধা করবে!" badge="মানবিক দায়বদ্ধতা" color={GOLD} top={450} />
      </>
    ),
  }),

  ask_context: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.1]} />,
    over: () => (
      <>
        <TopTag label="মূল প্রশ্ন" color={ACCENT_BLUE} />
        <TopBanner text="এই ঋণের আসল ইতিহাস কী?" sub="পেছনের সত্যটা কতজন জানে?" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  ananta_profile: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="এক দশকের পথচলা" color={GOLD} />
          <TopBanner text="সফল পোশাকশিল্প উদ্যোক্তা" sub="দেশের অন্যতম শীর্ষ রফতানিকারক" color={GOLD} top={210} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="এজেআই গ্রুপ" color={ACCENT_EMERALD} />
          <StatCard eyebrow="শিল্প সাম্রাজ্য" main="হাজার হাজার কর্মসংস্থান" badge="গ্লোবাল অ্যাপারেল এক্সপোর্টার" color={ACCENT_EMERALD} top={450} />
        </>
      ),
    }),
    0.5,
  ),

  check_bounce: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.1, 1.17]} />,
    over: () => (
      <>
        <TopTag label="মিউচুয়াল ট্রাস্ট ব্যাংক" color={ACCENT_RED} />
        <CheckCard top={450} />
      </>
    ),
  }),

  troll_noise: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="সোশ্যাল মিডিয়া ট্রল" color={ACCENT_GOLD} />
        <TopBanner text="চারদিকে নানা আলোচনা-সমালোচনা" sub="সোশ্যাল মিডিয়ায় ভাইরাল হেডলাইন" color={ACCENT_GOLD} top={210} />
      </>
    ),
  }),

  untold_history: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.05, 1.12]} />,
    over: () => (
      <>
        <TopTag label="লুকিয়ে থাকা সত্যি" color={ACCENT_EMERALD} />
        <StatCard eyebrow="বেদনাদায়ক প্রেক্ষাপট" main="কত বড় মানবিক দায়বদ্ধতা?" badge="শ্রমিকদের রুটিরুজি" color={ACCENT_EMERALD} top={450} />
      </>
    ),
  }),

  covid_2020: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="২০২০ মহামারি" color={ACCENT_RED} />
        <TopBanner text="করোনার সেই ভয়াল দিনগুলো" sub="সারা পৃথিবী যখন লকডাউনে স্তব্ধ" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  world_stopped: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1.08, 1.15]} />,
    over: () => (
      <>
        <TopTag label="স্থবির বিশ্ববাণিজ্য" color={ACCENT_BLUE} />
        <StatCard eyebrow="গ্লোবাল লকডাউন" main="বিশ্বজুড়ে পণ্য রফতানি বন্ধ!" badge="সব বন্দর নিস্তব্ধ" color={ACCENT_BLUE} top={450} />
      </>
    ),
  }),

  orders_cancelled: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1.12, 1.18]} origin="50% 60%" />,
      over: () => (
        <>
          <TopTag label="অর্ডার বাতিল" color={ACCENT_RED} />
          <StatCard eyebrow="আন্তর্জাতিক সংকট" main="শত শত কোটি টাকার অর্ডার বাতিল!" badge="বায়ারদের হাত গুটিয়ে নেওয়া" color={ACCENT_RED} top={450} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.1, 1.17]} />,
      over: () => (
        <>
          <TopTag label="পোশাক শিল্পের ধাক্কা" color={ACCENT_RED} />
          <TopBanner text="তৈরি পোশাকের কনটেইনার আটকে গেলো" sub="রফতানি খাতে চরম ধস" color={ACCENT_RED} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  factories_closed: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.05, 1.12]} origin="50% 40%" />,
      over: () => (
        <>
          <TopTag label="কারখানায় তালা" color={ACCENT_RED} />
          <StatCard eyebrow="অন্যদের সিদ্ধান্ত" main="শ্রমিক ছাঁটাই ও কারখানা বন্ধ" badge="পথে বসল লাখো পরিবার" color={ACCENT_RED} top={450} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1, 1.07]} />,
      over: () => (
        <>
          <TopTag label="অনিশ্চয়তায় মেহনতি মানুষ" color={ACCENT_GOLD} />
          <TopBanner text="মালিকেরা নিজেদের পিঠ বাঁচালো" sub="শ্রমিকদের ফেলে দেওয়া হলো অনিশ্চয়তায়" color={ACCENT_GOLD} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  ten_thousand_workers: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.09]} />,
    over: () => (
      <>
        <TopTag label="১০,০০০+ শ্রমিক" color={ACCENT_EMERALD} />
        <StatCard eyebrow="অনন্ত জলিলের কারখানা" main="১০,০০০ মেহনতি শ্রমিক!" badge="১০ হাজার পরিবারের স্বপ্ন" color={ACCENT_EMERALD} top={450} />
      </>
    ),
  }),

  no_give_up: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="অন্যদের মতো পালাননি" color={ACCENT_BLUE} />
        <TopBanner text="দায় এড়িয়ে কারখানা বন্ধ করেননি" sub="শ্রমিকদের পাশে থাকার দৃঢ় প্রত্যয়" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  workers_family: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.07, 1.14]} />,
    over: () => (
      <>
        <TopTag label="১০ হাজার পরিবার" color={ACCENT_EMERALD} />
        <StatCard eyebrow="একমাত্র লক্ষ্য" main="চুলা যেন হঠাৎ বন্ধ না হয়!" badge="মেহনতি মানুষের অন্ন" color={ACCENT_EMERALD} top={450} />
      </>
    ),
  }),

  took_loan: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="জীবনের সবচেয়ে বড় ঝুঁকি" color={ACCENT_RED} />
          <TopBanner text="নিজের ভবিষ্যৎ বাজি রাখলেন" sub="শ্রমিকদের বাঁচাতে ব্যাংকে গেলেন" color={ACCENT_RED} top={210} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.08, 1.15]} />,
      over: () => (
        <>
          <TopTag label="২০০ কোটি টাকার বিশেষ ঋণ" color={GOLD} />
          <StatCard eyebrow="শ্রমিকদের জন্য নেওয়া ঋণ" main="প্রায় ২০০ কোটি টাকার লোন!" badge="প্রতিটি পয়সা বেতনের জন্য" color={GOLD} top={450} />
        </>
      ),
    }),
    0.5,
  ),

  paid_salaries: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="বেতন-ভাতা পরিশোধ" color={ACCENT_EMERALD} />
        <StatCard eyebrow="নিয়মিত বেতন" main="মাসের পর মাস বেতন সচল রাখা" badge="একদিনের জন্যও থামেনি" color={ACCENT_EMERALD} top={450} />
      </>
    ),
  }),

  crisis_after_covid: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.08, 1.15]} origin="50% 60%" />,
      over: () => (
        <>
          <TopTag label="করোনা পরবর্তী মন্দা" color={ACCENT_RED} />
          <StatCard eyebrow="আর্থিক চাপ" main="চড়া ব্যাংক সুদ ও গ্যাস সংকট!" badge="উৎপাদনে স্থবিরতা" color={ACCENT_RED} top={450} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.07]} />,
      over: () => (
        <>
          <TopTag label="ঋণের জটিল হিসাব" color={ACCENT_GOLD} />
          <TopBanner text="কারখানা টিকিয়ে রাখা অসম্ভব হলো" sub="সুদে-আসলে দেনার পরিমাণ বাড়ল" color={ACCENT_GOLD} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  fugitive_tycoons: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.12]} />,
      over: () => (
        <>
          <TopTag label="হাজার কোটি টাকা আত্মসাৎ" color={ACCENT_RED} />
          <StatCard eyebrow="দেশের অর্থ পাচার" main="বিদেশে কোটি টাকার পাচার" badge="দেশ ছেড়ে পালিয়ে যাওয়ার প্রবণতা" color={ACCENT_RED} top={450} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="বিলাসবহুল জীবনের মোহ" color={ACCENT_RED} />
          <TopBanner text="বিদেশে অর্থ পাচারের সংস্কৃতি" sub="সাধারণ মানুষের আমানত আত্মসাৎ" color={ACCENT_RED} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  ananta_stayed: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="দেশ ছাড়েননি অনন্ত জলিল" color={ACCENT_EMERALD} />
          <StatCard eyebrow="সততা ও সাহস" main="দেশ ছেড়ে কোথাও পালাননি!" badge="বুক চিতিয়ে দাঁড়ানো উদ্যোক্তা" color={ACCENT_EMERALD} top={450} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.08, 1.15]} origin="50% 30%" />,
      over: () => (
        <>
          <TopTag label="দেশের মাটিতেই আছেন" color={GOLD} />
          <TopBanner text="আইনের মুখোমুখি দাঁড়িয়েছেন" sub="দায় স্বীকার করে সমাধানের চেষ্টা" color={GOLD} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  ready_to_sell: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.05, 1.12]} />,
      over: () => (
        <>
          <TopTag label="সম্পদ বিক্রির অঙ্গীকার" color={GOLD} />
          <StatCard eyebrow="দায়বদ্ধতা" main="ব্যক্তিগত সম্পদ বিক্রি করে শোধ!" badge="বাংলাদেশ ব্যাংকে আবেদন" color={GOLD} top={450} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="প্রতিটি পয়সা পরিশোধের প্রতিশ্রুতি" color={ACCENT_BLUE} />
          <TopBanner text="দরকারে কারখানা বিক্রি করে দেবো" sub="ব্যাংকের পাওনা মেটানোর দৃঢ় সংকল্প" color={ACCENT_BLUE} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  workers_rights: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="শ্রমিকদের অধিকার" color={ACCENT_EMERALD} />
          <StatCard eyebrow="শেষ কথা" main="শ্রমিকদের অধিকার ক্ষুণ্ণ হতে দেবো না!" badge="মেহনতি মানুষের প্রতি সম্মান" color={ACCENT_EMERALD} top={450} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.08, 1.15]} origin="50% 30%" />,
      over: () => (
        <>
          <TopTag label="মানুষের পাশে দাঁড়ানো" color={GOLD} />
          <TopBanner text="১০,০০০ পরিবারের চোখের জল" sub="যাদের তিনি বিপদে ফেলে যাননি" color={GOLD} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  screen_actor: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="পর্দার চরিত্র" color={ACCENT_BLUE} />
        <TopBanner text="পর্দায় হয়তো রঙিন অভিনেতা" sub="মানুষ তাঁকে কেবল তারকা ভেবেছে" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  real_hero: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="বাস্তবের হিরো" color={ACCENT_EMERALD} />
          <StatCard eyebrow="নিঃস্বার্থ মানসিকতা" main="দশ হাজার শ্রমিকের পাশে দাঁড়ানো!" badge="বাস্তব জীবনের আসল যোদ্ধা" color={ACCENT_EMERALD} top={450} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.08, 1.15]} />,
      over: () => (
        <>
          <TopTag label="বাস্তব জীবনের বীরত্ব" color={GOLD} />
          <TopBanner text="সিনেমা নয়, জীবনে প্রমাণ করেছেন" sub="মানুষের পেটের ভাত জুগিয়েছেন" color={GOLD} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  true_entrepreneur: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.12, 1.18]} origin="50% 20%" />,
    over: () => (
      <>
        <TopTag label="প্রকৃত উদ্যোক্তার পরিচয়" color={GOLD} />
        <StatCard eyebrow="চূড়ান্ত শিক্ষা" main="মানুষের পাশে দাঁড়ানোই আসল বড়ত্ব!" badge="Be Beyond Average" color={GOLD} top={450} />
      </>
    ),
  }),

  cta_lesson: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.07]} />,
    over: () => (
      <>
        <TopTag label="জ্ঞান ও দৃষ্টিভঙ্গি" color={ACCENT_BLUE} />
        <TopBanner text="গুজব নয়, সত্য জানুন" sub="বাস্তব দুনিয়ার সত্য ঘটনা" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  cta_follow: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.05, 1.12]} />,
    over: () => (
      <>
        <TopTag label="BBA" color={ACCENT_GOLD} />
        <FollowCtaCard top={430} />
      </>
    ),
  }),
};

// ফ্রেম ০ স্ট্যাটিক থাম্বনেইল
export const AnantaThumbnail: React.FC = () => (
  <PsyThumb
    l1="২২৬ কোটির ব্যাংক নোটিশ"
    l2="অনন্ত জলিলের আড়ালের মানবিক সত্য!"
    bottom="পর্দার হিরো বনাম ১০ হাজার শ্রমিক"
    term="Corporate Reality · Human Ethics"
    glow="rgba(245,158,11,0.34)"
    size={70}
    art={<Img src={staticFile('ananta/boardroom.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
  />
);

export const ananta = story('ananta/', raw, SCENES, AnantaThumbnail, {logo: 'bba2'});
