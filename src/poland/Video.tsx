// পোল্যান্ডে সরাসরি চাকরির ৫টি সেরা ওয়েবসাইট — PolandJobs (Client: Nazim Hossain)
// Ultra-minimal, elegant, modern, high-retention reel design
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
const BRAND_LIME_GLOW = 'rgba(163, 230, 53, 0.4)';
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
          width: 270,
          height: 'auto',
          filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.85))',
        }}
      />
    </div>
  );
};

// -------------------------------------------------------------
// ২. প্রিমিয়াম সিনেম্যাটিক ব্যাকগ্রাউন্ড (Subtle Motion + Cinematic Lighting)
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
      {/* সিনেমাটিক ব্ল্যাক গ্রেডিয়েন্ট ও লাইটিং — ছবি দৃশ্যমান থাকবে, লেখা স্পষ্ট হবে */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(8,12,20,0.65) 0%, rgba(8,12,20,0.15) 25%, rgba(8,12,20,0.2) 65%, rgba(8,12,20,0.92) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 40%, rgba(5,8,14,0.65) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------
// ৩. মিনিমাল গ্লাস ক্যাপসুল পিল (Minimal Floating Capsule)
// -------------------------------------------------------------
const FloatingCapsule: React.FC<{
  tag?: string;
  title: string;
  sub?: string;
  accent?: string;
}> = ({tag, title, sub, accent = BRAND_LIME}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 15, stiffness: 120}});
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
          padding: '24px 44px',
          background: 'rgba(10, 16, 30, 0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 26,
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.65), 0 0 35px rgba(0,0,0,0.3)',
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
            fontSize: 50,
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
// ৪. এলিগেন্ট মিনিমাল ওয়েবসাইট শোকেস কার্ড (Sleek Floating Web Card)
// -------------------------------------------------------------
const MinimalWebsiteCard: React.FC<{
  number: string;
  name: string;
  domain: string;
  category: string;
  highlight: string;
}> = ({number, name, domain, category, highlight}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 14, stiffness: 110}});
  const floatY = Math.sin(f * 0.05) * 6;

  return (
    <div
      style={{
        position: 'absolute',
        top: 440,
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
          background: 'rgba(9, 14, 26, 0.65)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: 30,
          border: '1.2px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(163, 230, 53, 0.15)',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* মিনিমাল হেডার স্ট্রিপ */}
        <div
          style={{
            padding: '16px 28px',
            background: 'rgba(255, 255, 255, 0.04)',
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

          {/* মিনিমাল URL পিল */}
          <div
            style={{
              padding: '5px 16px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: 20,
              fontFamily: 'monospace',
              color: '#e2e8f0',
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

        {/* কার্ডের মূল অংশ — ক্লিন, ফোকাসড ও পরিপাটি */}
        <div style={{padding: '36px 36px 40px', textAlign: 'center'}}>
          {/* ক্যাটাগরি */}
          <div
            style={{
              display: 'inline-block',
              fontSize: 22,
              fontWeight: 800,
              color: '#38bdf8',
              letterSpacing: 0.8,
              marginBottom: 12,
              textTransform: 'uppercase',
            }}
          >
            {category}
          </div>

          {/* সাইটের নাম */}
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: TEXT_WHITE,
              letterSpacing: 0.5,
              lineHeight: 1.15,
              marginBottom: 14,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            {name}
          </div>

          {/* এক লাইনের প্রিমিয়াম হাইলাইট */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: BRAND_LIME,
              lineHeight: 1.35,
              textShadow: `0 0 20px ${BRAND_LIME_GLOW}`,
            }}
          >
            {highlight}
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// ৫. আধুনিক এলিগেন্ট সাবটাইটেল (Minimal Frosted Glass Pill)
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
          background: 'rgba(8, 12, 22, 0.72)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 999,
          padding: '14px 34px',
          boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
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
// ৬. প্রতিটি দৃশ্যের ভিজ্যুয়াল ম্যাপিং (Clean, Minimal, High-Impact)
// -------------------------------------------------------------
const SceneRenderer: React.FC<{id: string; dur: number}> = ({id, dur}) => {
  switch (id) {
    // ১. হুক: দালালের ফাঁদ নয়
    case 'h1':
      return (
        <AbsoluteFill>
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
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <FloatingCapsule
            tag="সরাসরি ক্যারিয়ার"
            title="পোল্যান্ডে চাকরির আবেদন"
            sub="নিজেই সরাসরি কোম্পানিতে সিভি পাঠান"
          />
        </AbsoluteFill>
      );

    // ৩. ওয়ারশ স্কাইলাইন
    case 'opportunity':
      return (
        <AbsoluteFill>
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
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <FloatingCapsule
            tag="জরুরি টিপস"
            title="এই ৫টি ওয়েবসাইট সেভ রাখুন"
            sub="ভবিষ্যতে যাতে সহজে খুঁজে পান"
          />
        </AbsoluteFill>
      );

    // ৫. সাইট ১: Pracuj.pl
    case 'site1_intro':
      return (
        <AbsoluteFill>
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <MinimalWebsiteCard
            number="01 / 05"
            name="Pracuj.pl"
            domain="pracuj.pl"
            category="পোল্যান্ডের #১ পোর্টাল"
            highlight="সবচেয়ে বড় ও নির্ভরযোগ্য জব সাইট"
          />
        </AbsoluteFill>
      );

    // ৬. সাইট ১ বিস্তারিত
    case 'site1_detail':
      return (
        <AbsoluteFill>
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <FloatingCapsule
            tag="Pracuj.pl"
            title="সব ধরনের কাজের অফার"
            sub="হসপিটালিটি • লজিস্টিকস • টেক • অফিস"
          />
        </AbsoluteFill>
      );

    // ৭. সাইট ২: Praca.pl
    case 'site2_intro':
      return (
        <AbsoluteFill>
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <MinimalWebsiteCard
            number="02 / 05"
            name="Praca.pl"
            domain="praca.pl"
            category="দৈনিক আপডেট"
            highlight="হাজারো নতুন সার্কুলার প্রতিদিন"
          />
        </AbsoluteFill>
      );

    // ৮. সাইট ২ বিস্তারিত
    case 'site2_detail':
      return (
        <AbsoluteFill>
          <CinematicBackdrop src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" />
          <FloatingCapsule
            tag="Praca.pl"
            title="প্রতিদিন ফ্রেশ নিয়োগ বিজ্ঞপ্তি"
            sub="সরাসরি নিয়োগদাতা প্রতিষ্ঠানের এইচআর-এ আবেদন"
          />
        </AbsoluteFill>
      );

    // ৯. সাইট ৩: praca.olx.pl
    case 'site3_intro':
      return (
        <AbsoluteFill>
          <CinematicBackdrop src="poland/warehouse-work.jpg" dur={dur} pos="50% 45%" />
          <MinimalWebsiteCard
            number="03 / 05"
            name="praca.olx.pl"
            domain="praca.olx.pl"
            category="দ্রুত নিয়োগের মার্কেট"
            highlight="ব্লু-কলার ও ওয়্যারহাউস কাজ"
          />
        </AbsoluteFill>
      );

    // ১০. সাইট ৩ বিস্তারিত: ওয়্যারহাউস ও কনস্ট্রাকশন
    case 'site3_detail':
      return (
        <AbsoluteFill>
          <CinematicBackdrop src="poland/construction-poland.jpg" dur={dur} pos="50% 45%" />
          <FloatingCapsule
            tag="জেনারেল জবস"
            title="ওয়্যারহাউস ও কনস্ট্রাকশন"
            sub="কম অভিজ্ঞতায় দ্রুত কাজ পাওয়ার সেরা সাইট"
          />
        </AbsoluteFill>
      );

    // ১১. আইটি ও টেক সেক্টর
    case 'tech_intro':
      return (
        <AbsoluteFill>
          <CinematicBackdrop src="poland/tech-developer.jpg" dur={dur} pos="50% 40%" />
          <FloatingCapsule
            tag="হাই-স্যালারি"
            title="আইটি ও টেক সেক্টর ক্যারিয়ার"
            sub="ইউরোপের দ্রুত বর্ধনশীল টেক হাব"
          />
        </AbsoluteFill>
      );

    // ১২. সাইট ৪: NoFluffJobs
    case 'site4':
      return (
        <AbsoluteFill>
          <CinematicBackdrop src="poland/tech-developer.jpg" dur={dur} pos="50% 40%" />
          <MinimalWebsiteCard
            number="04 / 05"
            name="NoFluffJobs"
            domain="nofluffjobs.com"
            category="স্যালারি প্রকাশ্য"
            highlight="ইউরোপীয় আইটি ও টেক জবস"
          />
        </AbsoluteFill>
      );

    // ১৩. সাইট ৫: JustJoin.it
    case 'site5':
      return (
        <AbsoluteFill>
          <CinematicBackdrop src="poland/tech-developer.jpg" dur={dur} pos="50% 40%" />
          <MinimalWebsiteCard
            number="05 / 05"
            name="JustJoin.it"
            domain="justjoin.it"
            category="ইউরোপের শীর্ষ প্ল্যাটফর্ম"
            highlight="ডেভেলপার ও টেক প্রফেশনালস"
          />
        </AbsoluteFill>
      );

    // ১৪. সেভ রিমাইন্ডার
    case 'cta_save':
      return (
        <AbsoluteFill>
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
// ৮. এলিগেন্ট মিনিমাল থাম্বনেইল
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
            background: 'rgba(9, 14, 26, 0.7)',
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
