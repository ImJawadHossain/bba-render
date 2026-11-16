// পোল্যান্ডে সরাসরি চাকরির ৫টি সেরা ওয়েবসাইট — PolandJobs (Client: Nazim Hossain)
// Sleek, high-end, professional corporate/tech agency style
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
import {BaseSegment, FPS, Timing, stripTags} from '../common/meta';
import raw from './segments.json';

export const {fontFamily} = loadFont('normal', {
  weights: ['500', '700', '800'],
  subsets: ['bengali', 'latin'],
});

const segments = raw as BaseSegment[];

// Client Brand Colors (Nazim Hossain)
const BRAND_LIME = '#a3e635'; // Vibrant Lime Green (matches logo)
const BRAND_LIME_GLOW = 'rgba(163, 230, 53, 0.55)';
const BG_DARK = '#070b13';
const TEXT_WHITE = '#ffffff';
const TEXT_MUTED = '#94a3b8';

// -------------------------------------------------------------
// ১. ক্লায়েন্ট অফিশিয়াল ওয়াটারমার্ক (Nazim Hossain)
// -------------------------------------------------------------
const ClientWatermark: React.FC<{opacity?: number}> = ({opacity = 1}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        left: 60,
        zIndex: 90,
        opacity,
      }}
    >
      <Img
        src={staticFile('poland/nazim-watermark.png')}
        style={{
          width: 290,
          height: 'auto',
          filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.85))',
        }}
      />
    </div>
  );
};

// -------------------------------------------------------------
// ২. প্রফেশনাল সিনেমাটিক ব্যাকগ্রাউন্ড (Smooth Ken Burns + Rich Dark Vignette)
// -------------------------------------------------------------
const ScenicBackground: React.FC<{
  src: string;
  dur: number;
  zoom?: [number, number];
  pos?: string;
  darken?: number;
}> = ({src, dur, zoom = [1.0, 1.07], pos = '50% 45%', darken = 0.65}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: BG_DARK}}>
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
      {/* সিনেমাটিক ব্লেন্ড ও আধুনিক কর্পোরেট গ্রেডিয়েন্ট */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 35%, rgba(10,16,28,0.2) 20%, rgba(7,11,19,${darken}) 90%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(7,11,19,0.7) 0%, rgba(7,11,19,0.15) 25%, rgba(7,11,19,0.3) 65%, rgba(7,11,19,0.96) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------
// ৩. ফ্রস্টেড গ্লাস কার্ড (Executive Tech Glassmorphism)
// -------------------------------------------------------------
const GlassCard: React.FC<{
  w?: number;
  borderGlow?: boolean;
  children: React.ReactNode;
}> = ({w = 820, borderGlow = false, children}) => {
  return (
    <div
      style={{
        width: w,
        padding: '42px 40px',
        background: 'rgba(12, 19, 34, 0.88)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        borderRadius: 28,
        border: borderGlow
          ? `1.5px solid ${BRAND_LIME}`
          : '1.5px solid rgba(255, 255, 255, 0.16)',
        boxShadow: borderGlow
          ? `0 30px 80px rgba(0,0,0,0.8), 0 0 45px ${BRAND_LIME_GLOW}`
          : '0 30px 80px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.05)',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
};

// টপ প্রিমিয়াম ব্যাজ পিল
const BadgePill: React.FC<{
  text: string;
  bg?: string;
  color?: string;
  border?: string;
}> = ({
  text,
  bg = 'rgba(163, 230, 53, 0.16)',
  color = BRAND_LIME,
  border = '1px solid rgba(163, 230, 53, 0.45)',
}) => (
  <div
    style={{
      display: 'inline-block',
      padding: '8px 26px',
      borderRadius: 999,
      background: bg,
      color,
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: 0.8,
      marginBottom: 16,
      border,
      boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
    }}
  >
    {text}
  </div>
);

// -------------------------------------------------------------
// ৪. আধুনিক ম্যাক ও ব্রাউজার ওয়েবসাইট শোকেস কার্ড (Ultra-Modern Browser Window)
// -------------------------------------------------------------
const ModernBrowserCard: React.FC<{
  siteNumber: number;
  siteName: string;
  url: string;
  categoryTag: string;
  highlightText: string;
  subText: string;
  tags?: string[];
}> = ({siteNumber, siteName, url, categoryTag, highlightText, subText, tags = []}) => {
  return (
    <div
      style={{
        width: 820,
        background: 'rgba(13, 20, 36, 0.92)',
        backdropFilter: 'blur(36px)',
        WebkitBackdropFilter: 'blur(36px)',
        border: '1.5px solid rgba(255, 255, 255, 0.18)',
        borderRadius: 28,
        boxShadow: '0 35px 85px rgba(0,0,0,0.85), 0 0 40px rgba(163, 230, 53, 0.12)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* উইন্ডো হেডার বার */}
      <div
        style={{
          background: 'rgba(19, 29, 49, 0.95)',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* উইন্ডো কন্ট্রোল বাটন */}
        <div style={{display: 'flex', gap: 9}}>
          <div style={{width: 15, height: 15, borderRadius: '50%', background: '#ff5f56'}} />
          <div style={{width: 15, height: 15, borderRadius: '50%', background: '#ffbd2e'}} />
          <div style={{width: 15, height: 15, borderRadius: '50%', background: '#27c93f'}} />
        </div>

        {/* অ্যাড্রেস বার */}
        <div
          style={{
            flex: 1,
            background: 'rgba(10, 15, 28, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 12,
            padding: '7px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 22,
            fontFamily: 'monospace',
            color: '#e2e8f0',
            fontWeight: 700,
          }}
        >
          <span style={{color: BRAND_LIME, fontSize: 17}}>🔒</span>
          <span style={{color: '#f8fafc'}}>{url}</span>
        </div>
      </div>

      {/* পোর্টাল উইন্ডো বডি */}
      <div style={{padding: '36px 36px', textAlign: 'center'}}>
        {/* র্যাঙ্ক ও ক্যাটাগরি */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18,
          }}
        >
          <span
            style={{
              background: BRAND_LIME,
              color: '#070b13',
              fontSize: 24,
              fontWeight: 900,
              padding: '6px 20px',
              borderRadius: 10,
              letterSpacing: 0.5,
            }}
          >
            #{siteNumber}
          </span>
          <span
            style={{
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              fontSize: 24,
              fontWeight: 800,
              padding: '6px 20px',
              borderRadius: 10,
            }}
          >
            {categoryTag}
          </span>
        </div>

        {/* পোর্টালের বড় অফিশিয়াল নাম */}
        <div
          style={{
            fontSize: 66,
            fontWeight: 900,
            color: TEXT_WHITE,
            letterSpacing: 0.5,
            marginBottom: 12,
            lineHeight: 1.15,
            textShadow: '0 4px 18px rgba(0,0,0,0.6)',
          }}
        >
          {siteName}
        </div>

        {/* কী হাইলাইট */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: BRAND_LIME,
            marginBottom: 10,
            lineHeight: 1.35,
          }}
        >
          {highlightText}
        </div>

        {/* সাব হেডিং */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: TEXT_MUTED,
            lineHeight: 1.4,
            marginBottom: 20,
          }}
        >
          {subText}
        </div>

        {/* ফিচার ট্যাগগুলো */}
        {tags.length > 0 && (
          <div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '6px 16px',
                  borderRadius: 8,
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#e2e8f0',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// কার্ড সেন্টার কন্টেইনার (উপরে সুরক্ষিত)
const CenterCard: React.FC<{
  top?: number;
  children: React.ReactNode;
}> = ({top = 400, children}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
      }}
    >
      {children}
    </div>
  );
};

// -------------------------------------------------------------
// ৫. আধুনিক প্রফেশনাল সাবটাইটেল (Frosted Glass Pill with Brand Glow)
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
        left: 50,
        right: 50,
        bottom: 160,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: 'rgba(8, 14, 26, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1.2px solid rgba(255, 255, 255, 0.14)',
          borderRadius: 24,
          padding: '16px 36px',
          boxShadow: '0 16px 45px rgba(0,0,0,0.7)',
          textAlign: 'center',
          maxWidth: 960,
        }}
      >
        <div
          style={{
            fontSize: 50,
            lineHeight: 1.42,
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
                  color: isActive ? BRAND_LIME : isPast ? TEXT_WHITE : 'rgba(255,255,255,0.38)',
                  fontWeight: isActive ? 900 : 700,
                  textShadow: isActive
                    ? `0 0 22px ${BRAND_LIME_GLOW}, 0 2px 8px rgba(0,0,0,0.8)`
                    : 'none',
                  marginRight: 14,
                  display: 'inline-block',
                  transform: isActive ? 'scale(1.06)' : 'scale(1)',
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
// ৬. প্রতি দৃশ্যের ভিজ্যুয়াল কম্পোনেন্ট ম্যাপিং
// -------------------------------------------------------------
const SceneRenderer: React.FC<{id: string; dur: number}> = ({id, dur}) => {
  switch (id) {
    // ১. হুক: এজেন্সি প্রতারণা ও দালালের ফাঁদ
    case 'h1':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/agency-trap.jpg" dur={dur} pos="50% 40%" darken={0.7} />
          <CenterCard top={400}>
            <GlassCard w={820} borderGlow={true}>
              <BadgePill
                text="ভিসা প্রতারণা ও এজেন্সির ফাঁদ"
                bg="rgba(239, 68, 68, 0.2)"
                color="#f87171"
                border="1px solid rgba(239, 68, 68, 0.4)"
              />
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: TEXT_WHITE,
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                লাখ লাখ টাকা নষ্ট আর নয়!
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: TEXT_MUTED,
                  lineHeight: 1.45,
                }}
              >
                দালাল বা এজেন্সির পেছনে না ঘুরে নিজের যোগ্যতায় কাজের সুযোগ নিন
              </div>
            </GlassCard>
          </CenterCard>
        </AbsoluteFill>
      );

    // ২. সমাধান: ইউরোপের বৈধ ক্যারিয়ার ও সরাসরি আবেদন
    case 'h2':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" darken={0.65} />
          <CenterCard top={400}>
            <GlassCard w={820}>
              <BadgePill text="ইউরোপের অফিসিয়াল ক্যারিয়ার" />
              <div
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: TEXT_WHITE,
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                পোল্যান্ডে সরাসরি চাকরির আবেদন!
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#cbd5e1',
                  lineHeight: 1.45,
                }}
              >
                কোম্পানিতে নিজের সিভি পাঠিয়ে কোনো দালাল ছাড়া চাকরির সুযোগ
              </div>
            </GlassCard>
          </CenterCard>
        </AbsoluteFill>
      );

    // ৩. ওয়ারশ স্কাইলাইন ও কাজের সুযোগ
    case 'opportunity':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/warsaw-skyline.jpg" dur={dur} pos="50% 45%" darken={0.65} />
          <CenterCard top={400}>
            <GlassCard w={820}>
              <BadgePill text="পোল্যান্ড ওয়ার্ক ভিসা গাইড" />
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: BRAND_LIME,
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                বৈধভাবে কাজের সুযোগ
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#e2e8f0',
                  lineHeight: 1.45,
                }}
              >
                ইউরোপীয় ইউনিয়নের অনুমোদিত কোম্পানি ও সরকারিভাবে যাচাইকৃত চাকরির বিজ্ঞপ্তি
              </div>
            </GlassCard>
          </CenterCard>
        </AbsoluteFill>
      );

    // ৪. সেভ প্রম্পট
    case 'save_prompt':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" darken={0.65} />
          <CenterCard top={400}>
            <GlassCard w={820} borderGlow={true}>
              <BadgePill text="টপ ৫টি অথেনটিক পোর্টাল" />
              <div
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: TEXT_WHITE,
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                এই ৫টি ওয়েবসাইট আজই সেভ রাখুন!
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#cbd5e1',
                  lineHeight: 1.45,
                }}
              >
                ভবিষ্যতে যাতে হারিয়ে না যায় — বুকমার্ক ও সেভ করে রাখুন এখনই
              </div>
            </GlassCard>
          </CenterCard>
        </AbsoluteFill>
      );

    // ৫. সাইট ১ পরিচিতি: Pracuj.pl
    case 'site1_intro':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" darken={0.7} />
          <CenterCard top={360}>
            <ModernBrowserCard
              siteNumber={1}
              siteName="Pracuj.pl"
              url="https://www.pracuj.pl"
              categoryTag="পোল্যান্ডের #১ পোর্টাল"
              highlightText="সবচেয়ে বড় ও নির্ভরযোগ্য জব সাইট"
              subText="সরকারি ও পোলিশ কোম্পানির ভেরিফাইড অফার"
              tags={['সব সেক্টর', 'ইংরেজি সাপোর্ট', 'ভেরিফাইড কোম্পানি']}
            />
          </CenterCard>
        </AbsoluteFill>
      );

    // ৬. সাইট ১ বিস্তারিত
    case 'site1_detail':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" darken={0.65} />
          <CenterCard top={400}>
            <GlassCard w={820}>
              <BadgePill text="Pracuj.pl • অফিশিয়াল জব মার্কেট" />
              <div
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: BRAND_LIME,
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                সব ধরনের কাজের সেরা অফার
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#cbd5e1',
                  lineHeight: 1.45,
                }}
              >
                হসপিটালিটি • সেলস • অফিস • লজিস্টিকস — সব সেক্টরের জব প্রতিনিয়ত আপডেট
              </div>
            </GlassCard>
          </CenterCard>
        </AbsoluteFill>
      );

    // ৭. সাইট ২ পরিচিতি: Praca.pl
    case 'site2_intro':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" darken={0.7} />
          <CenterCard top={360}>
            <ModernBrowserCard
              siteNumber={2}
              siteName="Praca.pl"
              url="https://www.praca.pl"
              categoryTag="দৈনিক ফ্রেশ জবস"
              highlightText="হাজারো নতুন সার্কুলার"
              subText="পোল্যান্ডের জনপ্রিয় ক্যারিয়ার প্ল্যাটফর্ম"
              tags={['ডেইলি আপডেট', 'সরাসরি সিভি সেন্ড', 'ফ্রি রেজিস্ট্রেশন']}
            />
          </CenterCard>
        </AbsoluteFill>
      );

    // ৮. সাইট ২ বিস্তারিত
    case 'site2_detail':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" darken={0.65} />
          <CenterCard top={400}>
            <GlassCard w={820}>
              <BadgePill text="Praca.pl • প্রতিদিনের আপডেট" />
              <div
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: TEXT_WHITE,
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                প্রতিদিন হাজারো নতুন বিজ্ঞাপন
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#cbd5e1',
                  lineHeight: 1.45,
                }}
              >
                সরাসরি নিয়োগদাতা কোম্পানির এইচআর-এ কোনো থার্ড পার্টি ছাড়াই আবেদন
              </div>
            </GlassCard>
          </CenterCard>
        </AbsoluteFill>
      );

    // ৯. সাইট ৩ পরিচিতি: praca.olx.pl
    case 'site3_intro':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/warehouse-work.jpg" dur={dur} pos="50% 45%" darken={0.7} />
          <CenterCard top={360}>
            <ModernBrowserCard
              siteNumber={3}
              siteName="praca.olx.pl"
              url="https://praca.olx.pl"
              categoryTag="দ্রুত নিয়োগ"
              highlightText="ব্লু-কলার কাজের সেরা মার্কেট"
              subText="সরাসরি সুপারভাইজার ও কোম্পানির সাথে যোগাযোগ"
              tags={['ওয়্যারহাউস', 'ড্রাইভিং', 'কনস্ট্রাকশন', 'ক্লিনার']}
            />
          </CenterCard>
        </AbsoluteFill>
      );

    // ১০. সাইট ৩ বিস্তারিত: কনস্ট্রাকশন ও ওয়্যারহাউস
    case 'site3_detail':
      return (
        <AbsoluteFill>
          <ScenicBackground
            src="poland/construction-poland.jpg"
            dur={dur}
            pos="50% 45%"
            darken={0.65}
          />
          <CenterCard top={400}>
            <GlassCard w={820}>
              <BadgePill text="praca.olx.pl • জেনারেল ওয়ার্ক" />
              <div
                style={{
                  fontSize: 50,
                  fontWeight: 900,
                  color: BRAND_LIME,
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                কনস্ট্রাকশন • প্রোডাকশন • ওয়্যারহাউস
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#cbd5e1',
                  lineHeight: 1.45,
                }}
              >
                ফ্যাক্টরি ও গুদামজাতকরণে জরুরি নিয়োগ — কম অভিজ্ঞতায় দ্রুত কাজ পাওয়ার প্ল্যাটফর্ম
              </div>
            </GlassCard>
          </CenterCard>
        </AbsoluteFill>
      );

    // ১১. আইটি ও টেক ভূমিকা
    case 'tech_intro':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/tech-developer.jpg" dur={dur} pos="50% 40%" darken={0.65} />
          <CenterCard top={400}>
            <GlassCard w={820} borderGlow={true}>
              <BadgePill text="হাই-স্যালারি ইউরোপ ক্যারিয়ার" />
              <div
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: TEXT_WHITE,
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                আইটি বা টেক সেক্টরে চাকরি
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#cbd5e1',
                  lineHeight: 1.45,
                }}
              >
                সফটওয়্যার • ডেটা • ক্লাউড • সাপোর্ট — ইউরোপের শীর্ষ টেক হাব পোল্যান্ড
              </div>
            </GlassCard>
          </CenterCard>
        </AbsoluteFill>
      );

    // ১২. সাইট ৪: nofluffjobs.com
    case 'site4':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/tech-developer.jpg" dur={dur} pos="50% 40%" darken={0.7} />
          <CenterCard top={360}>
            <ModernBrowserCard
              siteNumber={4}
              siteName="NoFluffJobs"
              url="https://nofluffjobs.com"
              categoryTag="১০০% স্যালারি উল্লেখ"
              highlightText="ইউরোপীয় আইটি ও টেক জবস"
              subText="বেতন ও সুযোগ-সুবিধা সম্পূর্ণ উন্মুক্ত"
              tags={['সফটওয়্যার', 'ক্লিনিক', 'রিমোট / অনসাইট']}
            />
          </CenterCard>
        </AbsoluteFill>
      );

    // ১৩. সাইট ৫: justjoin.it
    case 'site5':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/tech-developer.jpg" dur={dur} pos="50% 40%" darken={0.7} />
          <CenterCard top={360}>
            <ModernBrowserCard
              siteNumber={5}
              siteName="JustJoin.it"
              url="https://justjoin.it"
              categoryTag="ইউরোপের #১ টেক সাইট"
              highlightText="ডেভেলপার ও টেক প্রফেশনালস"
              subText="পোল্যান্ড ও ইউরোপের শীর্ষ স্টার্টআপ"
              tags={['প্রোডাক্ট', 'আইটি সাপোর্ট', 'হাই স্যালারি']}
            />
          </CenterCard>
        </AbsoluteFill>
      );

    // ১৪. রিটেনশন ও সেভ রিমাইন্ডার
    case 'cta_save':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/direct-apply.jpg" dur={dur} pos="50% 50%" darken={0.65} />
          <CenterCard top={400}>
            <GlassCard w={820} borderGlow={true}>
              <BadgePill text="জরুরি রিমাইন্ডার" />
              <div
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: BRAND_LIME,
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                ভিডিওটি এখনই সেভ করে রাখুন!
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#cbd5e1',
                  lineHeight: 1.45,
                }}
              >
                যাতে এই ৫টি ওয়েবসাইটের নাম হারিয়ে না যায় — আবেদনের সময় যাতে দ্রুত খুঁজে পান
              </div>
            </GlassCard>
          </CenterCard>
        </AbsoluteFill>
      );

    // ১৫. শেয়ার CTA
    case 'cta_share':
      return (
        <AbsoluteFill>
          <ScenicBackground src="poland/warsaw-skyline.jpg" dur={dur} pos="50% 45%" darken={0.65} />
          <CenterCard top={400}>
            <GlassCard w={820}>
              <BadgePill text="শেয়ার করে পাশে থাকুন" />
              <div
                style={{
                  fontSize: 50,
                  fontWeight: 900,
                  color: TEXT_WHITE,
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                পোল্যান্ড যেতে ইচ্ছুক বন্ধুদের শেয়ার করুন
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#cbd5e1',
                  lineHeight: 1.45,
                }}
              >
                দালালের প্রতারণা থেকে নিজের পরিচিতদের বাঁচান এবং সঠিক তথ্য ছড়িয়ে দিন
              </div>
            </GlassCard>
          </CenterCard>
        </AbsoluteFill>
      );

    // ১৬. ক্লায়েন্ট আউটরো ভিডিও সেগমেন্ট
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
// ৭. মূল PolandVideo কম্পোজিশন (Full Professional Client Reel)
// -------------------------------------------------------------
export const PolandVideo: React.FC<{
  timing: Timing;
  hasAudio: boolean;
}> = ({timing, hasAudio}) => {
  const {fps} = useVideoConfig();

  // ভয়েস শেষ হওয়ার ফ্রেম (আউটরো শুরু)
  const voiceEndSec = 51.78;
  const voiceEndFrame = Math.round(voiceEndSec * fps); // ফ্রেম 1553

  return (
    <AbsoluteFill style={{backgroundColor: BG_DARK, fontFamily, color: TEXT_WHITE}}>
      {/* ১. ভয়েস অডিও ট্র্যাক (০ থেকে ৫১.৭৮ সেকেন্ড পর্যন্ত) */}
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
              {/* সাবটাইটেল শুধু কথা বলার অংশে দেখাবে (আউটরোতে নয়) */}
              {seg.text ? <ModernSubtitle text={seg.text} dur={dur} /> : null}
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* ৩. ক্লায়েন্ট অফিশিয়াল ওয়াটারমার্ক (আউটরোর আগ পর্যন্ত পুরো ভিডিও জুড়ে) */}
      <Sequence durationInFrames={voiceEndFrame}>
        <ClientWatermark />
      </Sequence>
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------
// ৮. থাম্বনেইল কম্পোনেন্ট (Client Nazim Hossain)
// -------------------------------------------------------------
export const PolandThumbnail: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: BG_DARK, fontFamily, overflow: 'hidden'}}>
      {/* ব্যাকগ্রাউন্ড */}
      <Img
        src={staticFile('poland/direct-apply.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 45%',
          transform: 'scale(1.05)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(7,11,19,0.75) 0%, rgba(7,11,19,0.25) 25%, rgba(7,11,19,0.5) 60%, rgba(7,11,19,0.98) 100%)',
        }}
      />

      {/* ক্লায়েন্ট ওয়াটারমার্ক */}
      <div style={{position: 'absolute', top: 70, left: 70, zIndex: 100}}>
        <Img
          src={staticFile('poland/nazim-watermark.png')}
          style={{
            width: 340,
            height: 'auto',
            filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.9))',
          }}
        />
      </div>

      {/* থাম্বনেইল সেন্টার কার্ড */}
      <div
        style={{
          position: 'absolute',
          top: 480,
          left: 60,
          right: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 50,
        }}
      >
        <div
          style={{
            width: '100%',
            padding: '48px 44px',
            background: 'rgba(12, 19, 34, 0.92)',
            backdropFilter: 'blur(36px)',
            borderRadius: 32,
            border: `2px solid ${BRAND_LIME}`,
            boxShadow: `0 35px 90px rgba(0,0,0,0.85), 0 0 50px ${BRAND_LIME_GLOW}`,
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <BadgePill
            text="পোল্যান্ড ক্যারিয়ার গাইড"
            bg="rgba(163, 230, 53, 0.2)"
            color={BRAND_LIME}
            border="1px solid rgba(163, 230, 53, 0.5)"
          />

          <div
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: TEXT_WHITE,
              lineHeight: 1.25,
              marginTop: 10,
              marginBottom: 16,
              textShadow: '0 4px 20px rgba(0,0,0,0.7)',
            }}
          >
            দালাল ছাড়া চাকরির <br />
            <span style={{color: BRAND_LIME}}>৫টি সেরা ওয়েবসাইট</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              marginTop: 20,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 22px',
                borderRadius: 12,
                fontSize: 24,
                fontWeight: 800,
                color: '#f8fafc',
              }}
            >
              ১০০% ফ্রি
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 22px',
                borderRadius: 12,
                fontSize: 24,
                fontWeight: 800,
                color: '#f8fafc',
              }}
            >
              সরাসরি আবেদন
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 22px',
                borderRadius: 12,
                fontSize: 24,
                fontWeight: 800,
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

// ফোলব্যাক টাইমিং
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
