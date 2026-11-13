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

// দৃশ্যসমূহ (৩৭টি দৃশ্য)
const SCENES: Record<string, React.FC<SP>> = {
  quote_intro: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.06]} />,
    over: () => (
      <>
        <TopTag label="করপোরেট অর্থনীতির সূত্র" color={GOLD} />
        <TopBanner text="ব্যাংকিং দুনিয়ার নির্মম সত্য" sub="J. Paul Getty Paradox" color={GOLD} top={210} />
      </>
    ),
  }),

  quote_ten_lakh: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.06, 1.12]} />,
    over: () => (
      <>
        <TopTag label="স্বল্প ঋণ" color={ACCENT_BLUE} />
        <StatCard eyebrow="১০ লাখ টাকা ঋণ" main="রাতের ঘুম হারাম আপনার!" badge="চাপ সম্পূর্ণ আপনার ওপর" color={ACCENT_BLUE} top={440} />
      </>
    ),
  }),

  quote_three_hundred: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.12, 1.18]} origin="50% 30%" />,
    over: () => (
      <>
        <TopTag label="৩০০ কোটি টাকার ঋণ" color={ACCENT_RED} />
        <StatCard eyebrow="বিশাল অঙ্কের ঋণ" main="ঘুম হারাম ব্যাংকের ম্যানেজারের!" badge="খেলার মোড় পুরোপুরি ঘুরে যায়" color={ACCENT_RED} top={440} />
      </>
    ),
  }),

  check_bounce_laugh: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.07]} origin="50% 40%" />,
    over: () => (
      <>
        <TopTag label="২২৬ কোটি টাকার চেক বাউন্স" color={ACCENT_RED} />
        <CheckCard top={450} />
      </>
    ),
  }),

  truth_emerged: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.07]} />,
    over: () => (
      <>
        <TopTag label="আড়ালের সত্য" color={ACCENT_GOLD} />
        <TopBanner text="সামনে এলো অবিশ্বাস্য এক সত্য!" sub="যা সাধারণ মানুষের সম্পূর্ণ অজানা ছিল" color={ACCENT_GOLD} top={210} />
      </>
    ),
  }),

  critics_salute: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.07, 1.14]} />,
    over: () => (
      <>
        <TopTag label="সমালোচকদের সম্মান" color={ACCENT_EMERALD} />
        <StatCard eyebrow="জনমতের পরিবর্তন" main="সমালোচকেরাও আজ স্যালুট জানাচ্ছে!" badge="বাস্তব মানবিক সত্যের জয়" color={ACCENT_EMERALD} top={440} />
      </>
    ),
  }),

  what_is_truth: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.06]} />,
    over: () => (
      <>
        <TopTag label="আসল প্রেক্ষাপট" color={ACCENT_BLUE} />
        <TopBanner text="কী সেই গোপন সত্যি?" sub="এই ঋণের পেছনে আসলে কী ঘটেছিল?" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  decade_image: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="চিত্রনায়ক ও শিল্পপতি" color={GOLD} />
        <TopBanner text="দামি গাড়ি আর সিনেমার হিরো" sub="এক দশক ধরে যেভাবে দেখেছে পুরো দেশ" color={GOLD} top={210} />
      </>
    ),
  }),

  dialogue_troll: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.11]} />,
    over: () => (
      <>
        <TopTag label="সোশ্যাল মিডিয়া ট্রল" color={ACCENT_GOLD} />
        <StatCard eyebrow="সোশ্যাল মিডিয়া" main="ডায়ালগ নিয়ে ট্রল আর মিম!" badge="সবার মুখে হাসির খোরাক" color={ACCENT_GOLD} top={440} />
      </>
    ),
  }),

  top_bank_bounce: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.11, 1.17]} />,
    over: () => (
      <>
        <TopTag label="আইনি নোটিশ" color={ACCENT_RED} />
        <CheckCard top={450} />
      </>
    ),
  }),

  social_ridicule: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.12]} />,
    over: () => (
      <>
        <TopTag label="ভাইরাল হেডলাইন" color={ACCENT_RED} />
        <StatCard eyebrow="সোশ্যাল মিডিয়ায় আলোচনা" main="“এবার ধরা পড়েছেন এই ব্যবসায়ী!”" badge="চারদিকে হাসাহাসি আর জল্পনা" color={ACCENT_RED} top={440} />
      </>
    ),
  }),

  hidden_pain: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="অজানা বাস্তবতা" color={GOLD} />
        <TopBanner text="এই ঋণের আসল ইতিহাস কতটা বেদনার!" sub="যা অধিকাংশ মানুষেরই অজানা ছিল" color={GOLD} top={210} />
      </>
    ),
  }),

  remember_covid: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1, 1.07]} />,
    over: () => (
      <>
        <TopTag label="২০২০ মহামারি" color={ACCENT_RED} />
        <TopBanner text="করোনার সেই ভয়াল দিনগুলো" sub="সারা পৃথিবী যখন নিস্তব্ধ হয়ে গেল" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  world_stopped: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1.07, 1.13]} />,
    over: () => (
      <>
        <TopTag label="বিশ্ব বাণিজ্য স্থবির" color={ACCENT_RED} />
        <StatCard eyebrow="বৈশ্বিক সংকট" main="বিশ্বজুড়ে বাণিজ্য তখন পুরোপুরি স্থবির!" badge="আন্তর্জাতিক লকডাউন" color={ACCENT_RED} top={440} />
      </>
    ),
  }),

  orders_cancelled: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1.13, 1.19]} />,
    over: () => (
      <>
        <TopTag label="শত শত কোটি টাকার ক্ষতি" color={ACCENT_RED} />
        <StatCard eyebrow="আন্তর্জাতিক বায়ার" main="পোশাকের শত কোটি টাকার অর্ডার বাতিল!" badge="রফতানি খাতে চরম বিপর্যয়" color={ACCENT_RED} top={440} />
      </>
    ),
  }),

  factories_locked: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.07]} />,
    over: () => (
      <>
        <TopTag label="কারখানায় তালা" color={ACCENT_GOLD} />
        <TopBanner text="মালিকেরা গেটে তালা ঝুলিয়ে দিলো" sub="নিজেদের আর্থিক ঝুঁকি এড়াতে" color={ACCENT_GOLD} top={210} />
      </>
    ),
  }),

  workers_starving: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.07, 1.14]} />,
    over: () => (
      <>
        <TopTag label="শ্রমিকদের অনিশ্চয়তা" color={ACCENT_RED} />
        <StatCard eyebrow="শ্রমিক ছাঁটাই" main="হাজার হাজার শ্রমিককে অনাহারে রাস্তায় নিক্ষেপ!" badge="অসহায় পরিবারের হাহাকার" color={ACCENT_RED} top={440} />
      </>
    ),
  }),

  ten_thousand_workers: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.14, 1.2]} origin="50% 60%" />,
    over: () => (
      <>
        <TopTag label="১০,০০০+ মেহনতি শ্রমিক" color={ACCENT_EMERALD} />
        <StatCard eyebrow="এজেআই গ্রুপ কারখানা" main="১০,০০০ মেহনতি শ্রমিকের কর্মসংস্থান!" badge="১০ হাজার পরিবারের স্বপ্ন" color={ACCENT_EMERALD} top={440} />
      </>
    ),
  }),

  refused_to_quit: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="দায় এড়াননি তিনি" color={ACCENT_BLUE} />
        <TopBanner text="হাত গুটিয়ে পালিয়ে যাননি অনন্ত জলিল" sub="শ্রমিকদের পাশে থাকার অটল সিদ্ধান্ত" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  chula_off: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.05, 1.12]} />,
    over: () => (
      <>
        <TopTag label="১০ হাজার পরিবার" color={GOLD} />
        <StatCard eyebrow="মানবিক দায়বদ্ধতা" main="“১০ হাজার পরিবারের চুলা যেন বন্ধ না হয়!”" badge="প্রতিটি পরিবারের মুখে খাবার নিশ্চিত" color={GOLD} top={440} />
      </>
    ),
  }),

  took_huge_risk: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.05, 1.12]} />,
    over: () => (
      <>
        <TopTag label="জীবনের সবচেয়ে বড় ঝুঁকি" color={ACCENT_RED} />
        <TopBanner text="নিজের ভবিষ্যৎ বাজি রাখলেন" sub="শ্রমিকদের বাঁচাতে জীবনের সর্বোচ্চ ঝুঁকি" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  loan_for_workers: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.12]} />,
      over: () => (
        <>
          <TopTag label="২০০ কোটি টাকার ঋণ" color={GOLD} />
          <StatCard eyebrow="বিশেষ সহায়তা" main="ব্যাংক থেকে ২০০ কোটি টাকার বিশেষ ঋণ!" badge="শ্রমিকদের জীবিকা রক্ষার উদ্যোগ" color={GOLD} top={440} />
        </>
      ),
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="বেতন সচল রাখা" color={ACCENT_EMERALD} />
          <TopBanner text="মাসের পর মাস বেতন সচল রাখা হলো" sub="১০ হাজার পরিবারের মুখে খাবার" color={ACCENT_EMERALD} top={210} />
        </>
      ),
    }),
    0.5,
  ),

  covid_passed: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1, 1.05]} />,
    over: () => (
      <>
        <TopTag label="মহামারি পরবর্তী সংকট" color={ACCENT_GOLD} />
        <TopBanner text="করোনা মহামারি কেটে গেল..." sub="কিন্তু শুরু হলো আরেক কঠিন লড়াই" color={ACCENT_GOLD} top={210} />
      </>
    ),
  }),

  interest_crisis: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.1, 1.17]} />,
    over: () => (
      <>
        <TopTag label="চড়া সুদ ও গ্যাস সংকট" color={ACCENT_RED} />
        <StatCard eyebrow="অর্থনৈতিক চাপ" main="চড়া সুদ আর গ্যাস সংকটে কারখানা বিপন্ন!" badge="সুদে-আসলে দেনার বোঝা বৃদ্ধি" color={ACCENT_RED} top={440} />
      </>
    ),
  }),

  looted_billions: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.05, 1.11]} />,
    over: () => (
      <>
        <TopTag label="হাজার হাজার কোটি টাকা লোপাট" color={ACCENT_RED} />
        <TopBanner text="ব্যাংক লুট করে হাজার কোটি লোপাট" sub="দেশের অর্থনীতি ধ্বংসকারী চক্র" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  begum_para: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/lockdown.jpg" dur={dur} zoom={[1.05, 1.12]} />,
    over: () => (
      <>
        <TopTag label="বিদেশে বেগম পাড়া" color={ACCENT_RED} />
        <StatCard eyebrow="দেশের অর্থ পাচার" main="বিদেশে বেগম পাড়া বানিয়ে আয়েশি জীবন!" badge="লুটপাট করে পালিয়ে যাওয়ার সংস্কৃতি" color={ACCENT_RED} top={440} />
      </>
    ),
  }),

  stayed_in_country: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="দেশ ছেড়ে পালাননি" color={ACCENT_EMERALD} />
        <TopBanner text="সেখানে অনন্ত জলিল দেশ ছেড়ে পালাননি!" sub="মাটি কামড়ে দেশেই অবস্থান করছেন" color={ACCENT_EMERALD} top={210} />
      </>
    ),
  }),

  brave_public_words: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.08, 1.14]} origin="50% 35%" />,
    over: () => (
      <>
        <TopTag label="প্রকাশ্য দায়বদ্ধতা" color={GOLD} />
        <TopBanner text="বুক চিতিয়ে প্রকাশ্যে ঘোষণা দিলেন" sub="দায় এড়িয়ে পালিয়ে যাওয়ার মানুষ নন" color={GOLD} top={210} />
      </>
    ),
  }),

  sell_factory_promise: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="সম্পদ বিক্রি করে ঋণ শোধ" color={ACCENT_BLUE} />
        <StatCard eyebrow="দৃঢ় অঙ্গীকার" main="“সব জমি আর ফ্যাক্টরি বিক্রি করে প্রতিটি পয়সা শোধ দেবো!”" badge="ব্যাংকের পাওনা মেটানোর সংকল্প" color={ACCENT_BLUE} top={440} />
      </>
    ),
  }),

  save_workers_dignity: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/factory.jpg" dur={dur} zoom={[1.08, 1.15]} />,
    over: () => (
      <>
        <TopTag label="শ্রমিকের অধিকার" color={GOLD} />
        <TopBanner text="“তবুও শ্রমিকদের রাস্তায় বসতে দেবো না!”" sub="১০ হাজার মানুষের শেষ ভরসা" color={GOLD} top={210} />
      </>
    ),
  }),

  screen_dialogue: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.08]} />,
    over: () => (
      <>
        <TopTag label="সিনেমার জনপ্রিয় ডায়ালগ" color={ACCENT_BLUE} />
        <StatCard eyebrow="পর্দার হিরো" main="“অসম্ভবকে সম্ভব করাই অনন্তের কাজ!”" badge="যে সংলাপ একসময় মুখে মুখে ফিরত" color={ACCENT_BLUE} top={440} />
      </>
    ),
  }),

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
      back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1, 1.08]} />,
      over: () => (
        <>
          <TopTag label="নিঃস্বার্থ দায়বদ্ধতা" color={GOLD} />
          <StatCard eyebrow="বাস্তব জীবন" main="১০ হাজার পরিবারের রুটিরুজির দায়িত্ব!" badge="পর্দার চেয়ে বাস্তব অনেক বড়" color={GOLD} top={440} />
        </>
      ),
    }),
    0.5,
  ),

  not_cheap_hero: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.08, 1.15]} />,
    over: () => (
      <>
        <TopTag label="কেবল সিনেমার তারকা নন" color={GOLD} />
        <StatCard eyebrow="আসল ব্যক্তিত্ব" main="তিনি কেবল সিনেমার সস্তা হিরো নন!" badge="পর্দার চেয়ে বাস্তব অনেক বড়" color={GOLD} top={440} />
      </>
    ),
  }),

  real_patriot: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.15, 1.22]} origin="50% 30%" />,
    over: () => (
      <>
        <TopTag label="বাস্তবের বিরল বীর" color={ACCENT_EMERALD} />
        <StatCard eyebrow="সত্যিকারের নায়ক" main="স্বার্থপর সমাজে বাস্তবের বিরল দেশপ্রেমিক বীর!" badge="ইতিহাস এই ত্যাগ মনে রাখবে" color={ACCENT_EMERALD} top={440} />
      </>
    ),
  }),

  rumor_warning: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1, 1.07]} />,
    over: () => (
      <>
        <TopTag label="গুজবে বিভ্রান্ত হবেন না" color={ACCENT_RED} />
        <TopBanner text="মনগড়া গল্পে বিভ্রান্ত হবেন না" sub="সোশ্যাল মিডিয়ার ভিত্তিহীন ট্রল এড়িয়ে চলুন" color={ACCENT_RED} top={210} />
      </>
    ),
  }),

  enrich_knowledge: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/boardroom.jpg" dur={dur} zoom={[1.07, 1.14]} />,
    over: () => (
      <>
        <TopTag label="বাস্তব সত্য ও জ্ঞান" color={ACCENT_BLUE} />
        <TopBanner text="বাস্তব দুনিয়ার সত্য ঘটনা জানুন" sub="নিজের জ্ঞান ও চিন্তাকে সমৃদ্ধ করুন" color={ACCENT_BLUE} top={210} />
      </>
    ),
  }),

  follow_cta: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="ananta/industrialist.jpg" dur={dur} zoom={[1.05, 1.12]} />,
    over: () => <FollowCtaCard top={450} />,
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
      art={<Img src={staticFile('ananta/boardroom.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
    />
  );
};

export const ananta = story('ananta/', raw, SCENES, AnantaThumbnail, {logo: 'bba2'});
