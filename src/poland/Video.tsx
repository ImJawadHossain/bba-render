// পোল্যান্ডে সরাসরি চাকরির ৫টি সেরা ওয়েবসাইট — PolandJobs (Client: Nazim Hossain)
// High-end, professional corporate/tech agency style with real brand logos & synced sound effects
import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  Video,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansBengali';
import {BaseSegment, Timing, stripTags} from '../common/meta';
import raw from './segments.json';

export const {fontFamily} = loadFont('normal', {
  weights: ['500', '700', '800'],
  subsets: ['bengali', 'latin'],
});

const segments = raw as BaseSegment[];

// Client Brand Colors (Nazim Hossain)
const BRAND_LIME = '#a3e635'; // Vibrant Lime Green
const BRAND_LIME_GLOW = 'rgba(163, 230, 53, 0.45)';
const TEXT_WHITE = '#ffffff';

// -------------------------------------------------------------
// ১. ক্লায়েন্ট অফিশিয়াল ওয়াটারমার্ক (Nazim Hossain)
// -------------------------------------------------------------
const ClientWatermark: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 64,
        left: 60,
        zIndex: 90,
      }}
    >
      <Img
        src={staticFile('poland/nazim-watermark.png')}
        style={{
          width: 280,
          height: 'auto',
          filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.85))',
        }}
      />
    </div>
  );
};

// -------------------------------------------------------------
// ২. প্রিমিয়াম সিনেম্যাটিক ব্যাকগ্রাউন্ড (Slow Zoom + Vignette)
// -------------------------------------------------------------
const CinematicBackdrop: React.FC<{
  src: string;
  dur: number;
  zoom?: [number, number];
  pos?: string;
}> = ({src, dur, zoom = [1.0, 1.05], pos = '50% 45%'}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#080c14'}}>
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: pos,
          transform: `scale(${z})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(8,12,20,0.65) 0%, rgba(8,12,20,0.18) 25%, rgba(8,12,20,0.25) 65%, rgba(8,12,20,0.92) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 40%, rgba(5,8,14,0.6) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------
// ৩. মিনিমাল ইনফো ক্যাপসুল (Floating Info Pill)
// -------------------------------------------------------------
const FloatingCapsule: React.FC<{
  tag?: string;
  title: string;
  sub?: string;
  accent?: string;
}> = ({tag, title, sub, accent = BRAND_LIME}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 14, stiffness: 120}});
  const floatY = Math.sin(f * 0.06) * 5;

  return (
    <div
      style={{
        position: 'absolute',
        top: 480,
        left: 50,
        right: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translateY(${floatY}px) scale(${0.92 + 0.08 * pop})`,
        opacity: pop,
        zIndex: 30,
      }}
    >
      <div
        style={{
          padding: '28px 44px',
          background: 'rgba(10, 16, 30, 0.65)',
          backdropFilter: 'blur(26px)',
          WebkitBackdropFilter: 'blur(26px)',
          borderRadius: 26,
          border: '1.2px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 25px 65px rgba(0,0,0,0.7), 0 0 35px rgba(0,0,0,0.3)',
          textAlign: 'center',
          maxWidth: 820,
        }}
      >
        {tag && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 20px',
              borderRadius: 999,
              background: 'rgba(163, 230, 53, 0.15)',
              border: `1px solid ${accent}`,
              color: accent,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 0.8,
              marginBottom: 14,
            }}
          >
            <span>●</span>
            <span>{tag}</span>
          </div>
        )}

        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: TEXT_WHITE,
            lineHeight: 1.25,
            letterSpacing: 0.4,
            textShadow: '0 4px 18px rgba(0,0,0,0.8)',
          }}
        >
          {title}
        </div>

        {sub && (
          <div
            style={{
              marginTop: 10,
              fontSize: 26,
              fontWeight: 600,
              color: '#cbd5e1',
              letterSpacing: 0.2,
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ৪. অফিশিয়াল ব্র্যান্ড লোগো শোকেস কার্ড (Official Brand Showcase Card)
// -------------------------------------------------------------
const OfficialBrandCard: React.FC<{
  number: string;
  logoSrc: string;
  logoType?: 'img' | 'svg';
  logoBg?: string;
  domain: string;
  badge: string;
  highlight: string;
  tags?: string[];
}> = ({
  number,
  logoSrc,
  logoBg = '#ffffff',
  domain,
  badge,
  highlight,
  tags = [],
}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 14, stiffness: 110}});
  const floatY = Math.sin(f * 0.05) * 6;

  return (
    <div
      style={{
        position: 'absolute',
        top: 400,
        left: 55,
        right: 55,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translateY(${floatY}px) scale(${0.92 + 0.08 * pop})`,
        opacity: pop,
        zIndex: 30,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 780,
          background: 'rgba(9, 14, 26, 0.72)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: 30,
          border: '1.2px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 30px 85px rgba(0,0,0,0.75), 0 0 45px rgba(163, 230, 53, 0.18)',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* টপ হেডার বার: ম্যাক ট্রাফিক ডটস + URL বার + নম্বর */}
        <div
          style={{
            padding: '16px 26px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* ট্রাফিক লাইটস */}
          <div style={{display: 'flex', gap: 8}}>
            <div style={{width: 13, height: 13, borderRadius: '50%', background: '#ff5f56'}} />
            <div style={{width: 13, height: 13, borderRadius: '50%', background: '#ffbd2e'}} />
            <div style={{width: 13, height: 13, borderRadius: '50%', background: '#27c93f'}} />
          </div>

          {/* ডোমেইন পিল */}
          <div
            style={{
              padding: '6px 18px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: 21,
              fontFamily: 'monospace',
              color: '#f8fafc',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{color: BRAND_LIME}}>🔒</span>
            <span>{domain}</span>
          </div>

          {/* নাম্বার ব্যাজ */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: BRAND_LIME,
              letterSpacing: 1,
            }}
          >
            {number}
          </div>
        </div>

        {/* কার্ডের সেন্ট্রাল লোগো স্টেজ */}
        <div style={{padding: '34px 34px 38px', textAlign: 'center'}}>
          {/* আসল কোম্পানির অফিশিয়াল লোগো কন্টেইনার */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: logoBg,
              borderRadius: 22,
              padding: '16px 36px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              marginBottom: 20,
              minWidth: 260,
              height: 80,
              boxSizing: 'border-box',
            }}
          >
            <Img
              src={staticFile(logoSrc)}
              style={{
                maxHeight: 58,
                maxWidth: 280,
                objectFit: 'contain',
              }}
            />
          </div>

          {/* ভেরিফায়েড টপিক ব্যাজ */}
          <div style={{marginBottom: 10}}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(56, 189, 248, 0.16)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                color: '#38bdf8',
                fontSize: 22,
                fontWeight: 800,
                padding: '6px 18px',
                borderRadius: 999,
                letterSpacing: 0.5,
              }}
            >
              <span>✓</span>
              <span>{badge}</span>
            </span>
          </div>

          {/* হাইলাইট টেক্সট */}
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: TEXT_WHITE,
              lineHeight: 1.35,
              marginTop: 6,
              marginBottom: 12,
              textShadow: '0 2px 14px rgba(0,0,0,0.8)',
            }}
          >
            {highlight}
          </div>

          {/* ছোট ফিচার পিলস */}
          {tags.length > 0 && (
            <div style={{display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap'}}>
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '5px 14px',
                    borderRadius: 8,
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#cbd5e1',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ৫. আধুনিক এলিগেন্ট সাবটাইটেল (Minimal Frosted Glass Capsule)
// -------------------------------------------------------------
const ModernSubtitle: React.FC<{
  text: string;
  dur: number;
}> = ({text, dur}) => {
  const frame = useCurrentFrame();
  const words = stripTags(text).split(/\s+/).filter(Boolean);
  const n = words.length;
  const progress = frame / Math.max(1, dur * 0.93);
  const current = Math.min(n - 1, Math.floor(progress * n));

  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        right: 40,
        bottom: 140,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: 'rgba(8, 12, 22, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: 999,
          padding: '14px 34px',
          boxShadow: '0 12px 35px rgba(0,0,0,0.65)',
          textAlign: 'center',
          maxWidth: 960,
        }}
      >
        <div
          style={{
            fontSize: 46,
            lineHeight: 1.38,
            fontWeight: 700,
          }}
        >
          {words.map((w, i) => {
            const isActive = i === current;
            const isPast = i < current;
            return (
              <span
                key={i}
                style={{
                  color: isActive ? BRAND_LIME : isPast ? TEXT_WHITE : 'rgba(255,255,255,0.4)',
                  fontWeight: isActive ? 900 : 700,
                  textShadow: isActive
                    ? `0 0 20px ${BRAND_LIME_GLOW}, 0 2px 8px rgba(0,0,0,0.9)`
                    : 'none',
                  marginRight: 13,
                  display: 'inline-block',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.1s ease',
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ৬. প্রতিটি দৃশ্যের ভিজ্যুয়াল ও সাউন্ড ইফেক্ট রেন্ডারার
// -------------------------------------------------------------
const SceneRenderer: React.FC<{id: string; dur: number}> = ({id, dur}) => {
  switch (id) {
    // ১. হুক: দালালের ফাঁদ এড়িয়ে চলুন
    case 'h1':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/whoosh.mp3')} volume={0.35} />
          <CinematicBackdrop src="poland/agency-trap.jpg" dur={dur} pos="50% 40%" />
          <FloatingCapsule
            tag="সচেতনতা"
            title="লাখ লাখ টাকা নষ্ট আর নয়"
            sub="দালাল বা এজেন্সির ফাঁদ এড়িয়ে চলুন"
            accent="#f87171"
          />
        </AbsoluteFill>
      );

    // ২. সমাধান: সরাসরি আবেদন
    case 'h2':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/pop.mp3')} volume={0.4} />
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <FloatingCapsule
            tag="সরাসরি ক্যারিয়ার"
            title="পোল্যান্ডে চাকরির আবেদন"
            sub="নিজেই সরাসরি কোম্পানিতে সিভি পাঠান"
          />
        </AbsoluteFill>
      );

    // ৩. ওয়ারশ স্কাইলাইন ও কাজের সুযোগ
    case 'opportunity':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/whoosh.mp3')} volume={0.35} />
          <CinematicBackdrop src="poland/warsaw-skyline.jpg" dur={dur} pos="50% 45%" />
          <FloatingCapsule
            tag="ইউরোপীয় ইউনিয়ন"
            title="বৈধ কাজের সুযোগ"
            sub="অনুমোদিত ইউরোপিয়ান কোম্পানি"
          />
        </AbsoluteFill>
      );

    // ৪. সেভ প্রম্পট
    case 'save_prompt':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/chime.mp3')} volume={0.4} />
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <FloatingCapsule
            tag="জরুরি টিপস"
            title="এই ৫টি ওয়েবসাইট সেভ রাখুন"
            sub="ভবিষ্যতে যাতে সহজে খুঁজে পান"
          />
        </AbsoluteFill>
      );

    // ৫. সাইট ১: Pracuj.pl (আসল অফিশিয়াল লোগো সহ)
    case 'site1_intro':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/whoosh.mp3')} volume={0.35} />
          <Audio src={staticFile('poland/sfx/pop.mp3')} volume={0.45} startFrom={5} />
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <OfficialBrandCard
            number="01 / 05"
            logoSrc="poland/logos/pracuj.png"
            logoBg="#ffffff"
            domain="pracuj.pl"
            badge="পোল্যান্ডের #১ পোর্টাল"
            highlight="সবচেয়ে বড় ও নির্ভরযোগ্য জব সাইট"
            tags={['সব সেক্টর', 'ইংরেজি সাপোর্ট', 'ভেরিফাইড কোম্পানি']}
          />
        </AbsoluteFill>
      );

    // ৬. সাইট ১ বিস্তারিত
    case 'site1_detail':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/ding.mp3')} volume={0.35} />
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <FloatingCapsule
            tag="Pracuj.pl"
            title="সব ধরনের কাজের অফার"
            sub="হসপিটালিটি • লজিস্টিকস • টেক • অফিস"
          />
        </AbsoluteFill>
      );

    // ৭. সাইট ২: Praca.pl (আসল অফিশিয়াল ভেক্টর লোগো সহ)
    case 'site2_intro':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/whoosh.mp3')} volume={0.35} />
          <Audio src={staticFile('poland/sfx/pop.mp3')} volume={0.45} startFrom={5} />
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <OfficialBrandCard
            number="02 / 05"
            logoSrc="poland/logos/praca.svg"
            logoBg="#ffffff"
            domain="praca.pl"
            badge="দৈনিক ফ্রেশ জবস"
            highlight="হাজারো নতুন সার্কুলার প্রতিদিন"
            tags={['ডেইলি আপডেট', 'সরাসরি সিভি সেন্ড', 'ফ্রি রেজিস্ট্রেশন']}
          />
        </AbsoluteFill>
      );

    // ৮. সাইট ২ বিস্তারিত
    case 'site2_detail':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/ding.mp3')} volume={0.35} />
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <FloatingCapsule
            tag="Praca.pl"
            title="প্রতিদিন ফ্রেশ নিয়োগ বিজ্ঞপ্তি"
            sub="সরাসরি নিয়োগদাতা প্রতিষ্ঠানের এইচআর-এ আবেদন"
          />
        </AbsoluteFill>
      );

    // ৯. সাইট ৩: praca.olx.pl (আসল অফিশিয়াল OLX ভেক্টর লোগো সহ)
    case 'site3_intro':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/whoosh.mp3')} volume={0.35} />
          <Audio src={staticFile('poland/sfx/pop.mp3')} volume={0.45} startFrom={5} />
          <CinematicBackdrop src="poland/warehouse-work.jpg" dur={dur} pos="50% 45%" />
          <OfficialBrandCard
            number="03 / 05"
            logoSrc="poland/logos/olx.svg"
            logoBg="#002f34"
            domain="praca.olx.pl"
            badge="দ্রুত নিয়োগের মার্কেট"
            highlight="ব্লু-কলার ও ওয়্যারহাউস কাজ"
            tags={['ওয়্যারহাউস', 'ড্রাইভিং', 'কনস্ট্রাকশন', 'ক্লিনার']}
          />
        </AbsoluteFill>
      );

    // ১০. সাইট ৩ বিস্তারিত: ওয়্যারহাউস ও কনস্ট্রাকশন
    case 'site3_detail':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/ding.mp3')} volume={0.35} />
          <CinematicBackdrop src="poland/construction-poland.jpg" dur={dur} pos="50% 45%" />
          <FloatingCapsule
            tag="জেনারেল জবস"
            title="ওয়্যারহাউস ও কনস্ট্রাকশন"
            sub="কম অভিজ্ঞতায় দ্রুত কাজ পাওয়ার সেরা সাইট"
          />
        </AbsoluteFill>
      );

    // ১১. আইটি ও টেক ভূমিকা
    case 'tech_intro':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/whoosh.mp3')} volume={0.35} />
          <CinematicBackdrop src="poland/tech-developer.jpg" dur={dur} pos="50% 40%" />
          <FloatingCapsule
            tag="হাই-স্যালারি"
            title="আইটি ও টেক সেক্টর ক্যারিয়ার"
            sub="ইউরোপের দ্রুত বর্ধনশীল টেক হাব"
          />
        </AbsoluteFill>
      );

    // ১২. সাইট ৪: NoFluffJobs (আসল অফিশিয়াল ভেক্টর লোগো সহ)
    case 'site4':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/whoosh.mp3')} volume={0.35} />
          <Audio src={staticFile('poland/sfx/pop.mp3')} volume={0.45} startFrom={5} />
          <CinematicBackdrop src="poland/tech-developer.jpg" dur={dur} pos="50% 40%" />
          <OfficialBrandCard
            number="04 / 05"
            logoSrc="poland/logos/nofluff.svg"
            logoBg="#1b2533"
            domain="nofluffjobs.com"
            badge="১০০% স্যালারি প্রকাশ্য"
            highlight="ইউরোপীয় আইটি ও টেক জবস"
            tags={['সফটওয়্যার', 'রিমোট / অনসাইট', 'বেতন উন্মুক্ত']}
          />
        </AbsoluteFill>
      );

    // ১৩. সাইট ৫: JustJoin.it (আসল অফিশিয়াল ভেক্টর লোগো সহ)
    case 'site5':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/whoosh.mp3')} volume={0.35} />
          <Audio src={staticFile('poland/sfx/pop.mp3')} volume={0.45} startFrom={5} />
          <CinematicBackdrop src="poland/tech-developer.jpg" dur={dur} pos="50% 40%" />
          <OfficialBrandCard
            number="05 / 05"
            logoSrc="poland/logos/justjoin.svg"
            logoBg="#ffffff"
            domain="justjoin.it"
            badge="ইউরোপের শীর্ষ প্ল্যাটফর্ম"
            highlight="ডেভেলপার ও টেক প্রফেশনালস"
            tags={['প্রোডাক্ট', 'আইটি সাপোর্ট', 'হাই স্যালারি']}
          />
        </AbsoluteFill>
      );

    // ১৪. সেভ রিমাইন্ডার
    case 'cta_save':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/chime.mp3')} volume={0.4} />
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <FloatingCapsule
            tag="রিমাইন্ডার"
            title="ভিডিওটি এখনই সেভ করে রাখুন"
            sub="আবেদনের সময় যাতে সাইটগুলো খুঁজে পান"
          />
        </AbsoluteFill>
      );

    // ১৫. শেয়ার কল
    case 'cta_share':
      return (
        <AbsoluteFill>
          <Audio src={staticFile('poland/sfx/chime.mp3')} volume={0.4} />
          <CinematicBackdrop src="poland/warsaw-skyline.jpg" dur={dur} pos="50% 45%" />
          <FloatingCapsule
            tag="শেয়ার করুন"
            title="পরিচিত বন্ধুদের জানিয়ে দিন"
            sub="সঠিক তথ্য পৌঁছে দিন সবার কাছে"
          />
        </AbsoluteFill>
      );

    // ১৬. ক্লায়েন্ট আউটরো ভিডিও
    case 'outro':
      return (
        <AbsoluteFill style={{background: '#ffffff'}}>
          <Video
            src={staticFile('poland/outro.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </AbsoluteFill>
      );

    default:
      return null;
  }
};

// -------------------------------------------------------------
// ৭. মূল PolandVideo কম্পোজিশন
// -------------------------------------------------------------
export const PolandVideo: React.FC<{
  timing: Timing;
  hasAudio: boolean;
}> = ({timing, hasAudio}) => {
  const {fps} = useVideoConfig();

  // ভয়েস শেষ হওয়ার সময় (আউটরো শুরু)
  const voiceEndSec = 51.78;
  const voiceEndFrame = Math.round(voiceEndSec * fps); // ফ্রেম 1553

  return (
    <AbsoluteFill style={{backgroundColor: '#080c14', fontFamily, color: TEXT_WHITE}}>
      {/* ১. ভয়েস অডিও ট্র্যাক */}
      {hasAudio && (
        <Sequence durationInFrames={voiceEndFrame}>
          <Audio src={staticFile('poland/voice.mp3')} />
        </Sequence>
      )}

      {/* ২. প্রতিটি সিন সিকোয়েন্স */}
      {segments.map((seg, i) => {
        const t = timing.segments[i];
        if (!t) return null;
        const from = Math.round(t.start * fps);
        const dur = Math.max(2, Math.round(t.end * fps) - from);

        return (
          <Sequence key={seg.id} from={from} durationInFrames={dur}>
            <AbsoluteFill style={{overflow: 'hidden'}}>
              <SceneRenderer id={seg.id} dur={dur} />
              {/* সাবটাইটেল শুধু কথা বলার অংশে দেখাবে */}
              {seg.text ? <ModernSubtitle text={seg.text} dur={dur} /> : null}
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* ৩. ক্লায়েন্ট অফিশিয়াল ওয়াটারমার্ক (আউটরোর আগ পর্যন্ত) */}
      <Sequence durationInFrames={voiceEndFrame}>
        <ClientWatermark />
      </Sequence>
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------
// ৮. এলিগেন্ট থাম্বনেইল
// -------------------------------------------------------------
export const PolandThumbnail: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#080c14', fontFamily, overflow: 'hidden'}}>
      <Img
        src={staticFile('poland/direct-apply.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 45%',
          transform: 'scale(1.04)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(8,12,20,0.7) 0%, rgba(8,12,20,0.2) 25%, rgba(8,12,20,0.4) 60%, rgba(8,12,20,0.96) 100%)',
        }}
      />

      {/* ক্লায়েন্ট ওয়াটারমার্ক */}
      <div style={{position: 'absolute', top: 70, left: 65, zIndex: 100}}>
        <Img
          src={staticFile('poland/nazim-watermark.png')}
          style={{
            width: 310,
            height: 'auto',
            filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.9))',
          }}
        />
      </div>

      {/* সেন্টার মিনিমাল কার্ড */}
      <div
        style={{
          position: 'absolute',
          top: 500,
          left: 55,
          right: 55,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 50,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 820,
            padding: '40px 40px',
            background: 'rgba(9, 14, 26, 0.72)',
            backdropFilter: 'blur(30px)',
            borderRadius: 32,
            border: `1.5px solid ${BRAND_LIME}`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.85), 0 0 45px ${BRAND_LIME_GLOW}`,
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 22px',
              borderRadius: 999,
              background: 'rgba(163, 230, 53, 0.16)',
              border: '1px solid rgba(163, 230, 53, 0.45)',
              color: BRAND_LIME,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 0.8,
              marginBottom: 16,
            }}
          >
            <span>●</span>
            <span>পোল্যান্ড ক্যারিয়ার গাইড</span>
          </div>

          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: TEXT_WHITE,
              lineHeight: 1.25,
              marginBottom: 16,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            দালাল ছাড়া চাকরির <br />
            <span style={{color: BRAND_LIME}}>৫টি সেরা ওয়েবসাইট</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              marginTop: 18,
            }}
          >
            <span
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '7px 20px',
                borderRadius: 10,
                fontSize: 22,
                fontWeight: 700,
                color: '#f8fafc',
              }}
            >
              ১০০% ফ্রি
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '7px 20px',
                borderRadius: 10,
                fontSize: 22,
                fontWeight: 700,
                color: '#f8fafc',
              }}
            >
              সরাসরি আবেদন
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '7px 20px',
                borderRadius: 10,
                fontSize: 22,
                fontWeight: 700,
                color: '#f8fafc',
              }}
            >
              অফিশিয়াল পোর্টাল
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const polandFallback: Timing = {
  total: 61.81,
  segments: (raw as BaseSegment[]).map((s, idx) => ({
    id: s.id,
    start: idx === 15 ? 51.78 : idx * 3.45,
    end: idx === 15 ? 61.81 : (idx + 1) * 3.45,
  })),
};

export const poland = {
  folder: 'poland/',
  Video: PolandVideo,
  Thumb: PolandThumbnail,
  fb: polandFallback,
};
