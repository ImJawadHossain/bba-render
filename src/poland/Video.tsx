// পোল্যান্ডে সরাসরি চাকরির ৫টি সেরা ওয়েবসাইট — PolandJobs
// High-retention, authoritative BBA reel video design
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, RED, clampOpts} from '../biz/art';
import {Soft} from '../common/elegant';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {R, story} from '../common/reel';
import raw from './segments.json';

const LINE = '#1b1b1f';

// -------------------------------------------------------------
// ১. মনোরম ডেপথ-অফ-ফিল্ড ব্যাকগ্রাউন্ড (Soft Bokeh Base)
// -------------------------------------------------------------
const ScenicAtmosphereBase: React.FC<{
  photo?: 'agency' | 'apply' | 'warehouse' | 'construction' | 'tech' | 'skyline';
}> = ({photo = 'apply'}) => {
  const file =
    photo === 'agency'
      ? 'poland/agency-trap.jpg'
      : photo === 'warehouse'
      ? 'poland/warehouse-work.jpg'
      : photo === 'construction'
      ? 'poland/construction-poland.jpg'
      : photo === 'tech'
      ? 'poland/tech-developer.jpg'
      : photo === 'skyline'
      ? 'poland/warsaw-skyline.jpg'
      : 'poland/direct-apply.jpg';

  return (
    <Soft blur={10} tone="warm" bokeh={true}>
      <Img
        src={staticFile(file)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 40%',
        }}
      />
    </Soft>
  );
};

// -------------------------------------------------------------
// ২. ফুল স্ক্রিন সিনেমাটিক ফটো (Ken-Burns + সফট ভিনিয়েট)
// -------------------------------------------------------------
const FullScenicPhoto: React.FC<{
  src: string;
  dur: number;
  zoom?: [number, number];
  pos?: string;
  darken?: number;
}> = ({src, dur, zoom = [1, 1.08], pos = '50% 50%', darken = 0.55}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, clampOpts);

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#0b0d12'}}>
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
          background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.1) 40%, rgba(10,12,18,${darken}) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------
// ৩. ফিজিক্যাল এলিগেন্ট পেপার কার্ড
// -------------------------------------------------------------
const PhysicalPaperCard: React.FC<{
  w?: number;
  rot?: number;
  bg?: string;
  children: React.ReactNode;
}> = ({w = 760, rot = -1.2, bg = '#faf7f0', children}) => {
  return (
    <div
      style={{
        width: w,
        padding: '38px 36px',
        background: bg,
        border: `7px solid ${LINE}`,
        borderRadius: 20,
        boxShadow: '0 28px 65px rgba(0,0,0,0.56)',
        color: '#15151b',
        fontWeight: 800,
        transform: `rotate(${rot}deg)`,
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
};

// কার্ড সেন্টার কন্টেইনার (সাবটাইটেল জোনের উপরে সুরক্ষিত)
const CenterCard: React.FC<{
  top?: number;
  children: React.ReactNode;
}> = ({top = 410, children}) => {
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

// টপ পিল ব্যাজ
const TitlePill: React.FC<{
  text: string;
  bg?: string;
  color?: string;
}> = ({text, bg = '#dc2626', color = '#ffffff'}) => (
  <div
    style={{
      display: 'inline-block',
      padding: '8px 24px',
      borderRadius: 999,
      background: bg,
      color,
      fontSize: 27,
      fontWeight: 900,
      letterSpacing: 1,
      marginBottom: 16,
      border: `2px solid ${LINE}`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    }}
  >
    {text}
  </div>
);

// -------------------------------------------------------------
// ৪. ব্রাউজার উইন্ডো ওয়েবসাইট শোকেস কার্ড
// -------------------------------------------------------------
const BrowserPortalCard: React.FC<{
  siteNumber: number;
  siteName: string;
  url: string;
  badgeText: string;
  badgeBg?: string;
  highlightText: string;
  subText: string;
  tagList?: string[];
  rot?: number;
}> = ({
  siteNumber,
  siteName,
  url,
  badgeText,
  badgeBg = '#0284c7',
  highlightText,
  subText,
  tagList = [],
  rot = 1,
}) => {
  return (
    <div
      style={{
        width: 790,
        background: '#ffffff',
        border: `7px solid ${LINE}`,
        borderRadius: 22,
        boxShadow: '0 32px 75px rgba(0,0,0,0.65)',
        transform: `rotate(${rot}deg)`,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* ব্রাউজার হেডার বার */}
      <div
        style={{
          background: '#f1f5f9',
          padding: '14px 20px',
          borderBottom: `4px solid ${LINE}`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        {/* ৩টি সার্কুলার উইন্ডো বাটন */}
        <div style={{display: 'flex', gap: 8}}>
          <div style={{width: 16, height: 16, borderRadius: '50%', background: '#ef4444', border: '1px solid #dc2626'}} />
          <div style={{width: 16, height: 16, borderRadius: '50%', background: '#eab308', border: '1px solid #ca8a04'}} />
          <div style={{width: 16, height: 16, borderRadius: '50%', background: '#22c55e', border: '1px solid #16a34a'}} />
        </div>

        {/* অ্যাড্রেস বার */}
        <div
          style={{
            flex: 1,
            background: '#ffffff',
            border: '2px solid #cbd5e1',
            borderRadius: 10,
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 22,
            fontFamily: 'monospace',
            color: '#1e293b',
            fontWeight: 800,
          }}
        >
          <span style={{color: '#16a34a', fontSize: 18}}>🔒</span>
          <span>{url}</span>
        </div>
      </div>

      {/* পোর্টাল বডি */}
      <div style={{padding: '34px 32px', textAlign: 'center'}}>
        {/* টপ ব্যাজ */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
          <span
            style={{
              background: '#0f172a',
              color: '#ffffff',
              fontSize: 26,
              fontWeight: 900,
              padding: '6px 18px',
              borderRadius: 8,
              letterSpacing: 0.5,
            }}
          >
            #{siteNumber}
          </span>
          <span
            style={{
              background: badgeBg,
              color: '#ffffff',
              fontSize: 24,
              fontWeight: 900,
              padding: '6px 20px',
              borderRadius: 999,
              border: `2px solid ${LINE}`,
            }}
          >
            {badgeText}
          </span>
        </div>

        {/* পোর্টালের বড় নাম */}
        <div style={{fontSize: 54, fontWeight: 900, color: '#0f172a', letterSpacing: -0.5, lineHeight: 1.15}}>
          {siteName}
        </div>

        {/* হাইলাইট টেক্সট */}
        <div style={{fontSize: 34, fontWeight: 900, color: '#dc2626', marginTop: 14, lineHeight: 1.3}}>
          {highlightText}
        </div>

        {/* সাবটেক্সট */}
        <div style={{fontSize: 28, fontWeight: 800, color: '#475569', marginTop: 10, lineHeight: 1.35}}>
          {subText}
        </div>

        {/* ক্যাটাগরি ট্যাগ */}
        {tagList.length > 0 && (
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            {tagList.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  background: '#f8fafc',
                  border: '2px solid #e2e8f0',
                  padding: '6px 16px',
                  borderRadius: 8,
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#334155',
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

// -------------------------------------------------------------
// ৫. দৃশ্যভিত্তিক বিশেষায়িত কার্ডসমূহ
// -------------------------------------------------------------

// হুক ১: দালাল বা এজেন্সির লাখ লাখ টাকা নষ্ট নয়
const HookAgencyScamCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={760} rot={-1.8} bg="#fffdf7">
      <TitlePill text="ভিসা প্রতারণা ও দালালের ফাঁদ" bg="#dc2626" />
      <div style={{fontSize: 52, fontWeight: 900, color: '#991b1b', lineHeight: 1.2}}>
        লাখ লাখ টাকা নষ্ট আর নয়!
      </div>
      <div
        style={{
          height: 4,
          background: '#dc2626',
          borderRadius: 2,
          margin: '18px auto 16px',
          width: '60%',
        }}
      />
      <div style={{fontSize: 34, fontWeight: 800, color: '#1e293b', lineHeight: 1.4}}>
        দালাল বা এজেন্সির পেছনে ঘুরে<br />
        <span style={{color: '#b91c1c', fontWeight: 900}}>নিজের উপার্জিত টাকা হারাবেন না</span>
      </div>
    </PhysicalPaperCard>
  );
};

// হুক ২: নিজেই সরাসরি চাকরির আবেদন
const DirectApplyHookCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={760} rot={1.5} bg="#f8fafc">
      <TitlePill text="ইউরোপের বৈধ ক্যারিয়ার" bg="#0284c7" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#0f172a', lineHeight: 1.25}}>
        পোল্যান্ডে সরাসরি চাকরির আবেদন!
      </div>
      <div style={{fontSize: 34, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.4}}>
        কোম্পানিতে নিজের সিভি পাঠিয়ে<br />
        <span style={{color: '#15803d', fontWeight: 900}}>জিরো দালাল খরচে বৈধ সুযোগ নিন</span>
      </div>
    </PhysicalPaperCard>
  );
};

// পোল্যান্ডে বৈধ কাজের সুযোগ
const OpportunityCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={750} rot={-1.5} bg="#f0fdf4">
      <TitlePill text="পোল্যান্ড ওয়ার্ক ভিসা" bg="#15803d" />
      <div style={{fontSize: 50, fontWeight: 900, color: '#166534', lineHeight: 1.22}}>
        বৈধভাবে কাজের সুযোগ
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.4}}>
        ইউরোপীয় ইউনিয়নের অনুমোদিত কোম্পানি<br />
        <span style={{color: '#b45309', fontWeight: 900}}>সরকারিভাবে যাচাইকৃত নিয়োগ বিজ্ঞপ্তি</span>
      </div>
    </PhysicalPaperCard>
  );
};

// ৫টি ওয়েবসাইট আজই সেভ রাখুন
const SavePromptCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={760} rot={1.8} bg="#fffbeb">
      <TitlePill text="টপ ৫টি জব প্ল্যাটফর্ম" bg="#d97706" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#92400e', lineHeight: 1.25}}>
        এই ৫টি সাইট আজই সেভ রাখুন!
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#1f2937', marginTop: 14, lineHeight: 1.4}}>
        ভবিষ্যতে যাতে হারিয়ে না যায়<br />
        <span style={{color: '#dc2626', fontWeight: 900}}>বুকমার্ক ও সেভ করে রাখুন এখনই</span>
      </div>
    </PhysicalPaperCard>
  );
};

// সাইট ১ বিস্তারিত: সব ধরনের কাজের অফার
const Site1DetailCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={760} rot={-1.5} bg="#eff6ff">
      <TitlePill text="Pracuj.pl · পোল্যান্ডের শীর্ষ সাইট" bg="#1d4ed8" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#1e3a8a', lineHeight: 1.25}}>
        পোল্যান্ডের সবচেয়ে বড় জব পোর্টাল
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.4}}>
        হসপিটালিটি · সেলস · অফিস · লজিস্টিকস<br />
        <span style={{color: '#059669', fontWeight: 900}}>সব সেক্টরের লাখ লাখ নিয়মিত অফার</span>
      </div>
    </PhysicalPaperCard>
  );
};

// সাইট ২ বিস্তারিত: প্রতিদিন হাজারো বিজ্ঞাপন
const Site2DetailCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={760} rot={1.5} bg="#f0fdf4">
      <TitlePill text="Praca.pl · দৈনিক আপডেট" bg="#059669" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#065f46', lineHeight: 1.25}}>
        প্রতিদিন হাজারো নতুন বিজ্ঞাপন
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.4}}>
        সরাসরি নিয়োগদাতা কোম্পানির এইচআর<br />
        <span style={{color: '#b91c1c', fontWeight: 900}}>কোনো তৃতীয় পক্ষ ছাড়াই সরাসরি আবেদন</span>
      </div>
    </PhysicalPaperCard>
  );
};

// সাইট ৩ বিস্তারিত: কনস্ট্রাকশন ও ওয়্যারহাউস
const Site3DetailCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={770} rot={-1.8} bg="#fff7ed">
      <TitlePill text="praca.olx.pl · দ্রুত কাজের সেরা সাইট" bg="#ea580c" />
      <div style={{fontSize: 46, fontWeight: 900, color: '#9a3412', lineHeight: 1.25}}>
        কনস্ট্রাকশন · প্রোডাকশন · ওয়্যারহাউস
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.4}}>
        ফ্যাক্টরি ও গুদামজাতকরণে জরুরি নিয়োগ<br />
        <span style={{color: '#0284c7', fontWeight: 900}}>কম অভিজ্ঞতাতেও দ্রুত কাজ পাওয়ার প্ল্যাটফর্ম</span>
      </div>
    </PhysicalPaperCard>
  );
};

// আইটি ও টেক সেক্টর ইন্ট্রো
const TechIntroCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={760} rot={1.5} bg="#f5f3ff">
      <TitlePill text="হাই-স্যালারি ইউরোপ ক্যারিয়ার" bg="#7c3aed" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#5b21b6', lineHeight: 1.25}}>
        আইটি বা টেক সেক্টরে চাকরি
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.4}}>
        সফটওয়্যার · ডেটা · ক্লাউড · সাপোর্ট<br />
        <span style={{color: '#059669', fontWeight: 900}}>ইউরোপের শীর্ষ টেক হাব পোল্যান্ড</span>
      </div>
    </PhysicalPaperCard>
  );
};

// সিটিএ ১: ভিডিওটি সেভ রাখুন
const CtaSaveCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={760} rot={-1.5} bg="#fffbeb">
      <TitlePill text="জরুরি রিমাইন্ডার" bg="#d97706" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#92400e', lineHeight: 1.25}}>
        ভিডিওটি এখনই সেভ করে রাখুন!
      </div>
      <div style={{fontSize: 34, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.4}}>
        যাতে ৫টি ওয়েবসাইটের নাম হারিয়ে না যায়<br />
        <span style={{color: '#dc2626', fontWeight: 900}}>আবেদনের সময় যাতে দ্রুত খুঁজে পান</span>
      </div>
    </PhysicalPaperCard>
  );
};

// সিটিএ ২: বন্ধুদের সাথে শেয়ার করুন
const CtaShareCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={760} rot={1.5} bg="#f0fdf4">
      <TitlePill text="শেয়ার করে পাশে থাকুন" bg="#15803d" />
      <div style={{fontSize: 46, fontWeight: 900, color: '#14532d', lineHeight: 1.25}}>
        পোল্যান্ড যেতে ইচ্ছুক বন্ধুদের শেয়ার করুন
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.4}}>
        দালালের প্রতারণা থেকে নিজের পরিচিতদের বাঁচান<br />
        <span style={{color: '#b45309', fontWeight: 900}}>সঠিক তথ্য ছড়িয়ে দিয়ে সহযোগিতা করুন ↗</span>
      </div>
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// ৬. দৃশ্যের দৃশ্যবিন্যাস (SCENES ম্যাপিং)
// -------------------------------------------------------------
const SCENES: Record<string, React.FC<SP>> = {
  // ১. দালাল বা এজেন্সির পেছনে লাখ লাখ টাকা নষ্ট না করে
  h1: R({
    place: <ScenicAtmosphereBase photo="agency" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/agency-trap.jpg" dur={dur} zoom={[1.08, 1.2]} pos="50% 45%" />
    ),
    over: () => (
      <CenterCard top={400}>
        <HookAgencyScamCard />
      </CenterCard>
    ),
  }),

  // ২. নিজেই পোল্যান্ডের কোম্পানিগুলোতে সরাসরি চাকরির আবেদন করতে চান?
  h2: R({
    place: <ScenicAtmosphereBase photo="apply" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/direct-apply.jpg" dur={dur} zoom={[1.05, 1.15]} pos="50% 35%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <DirectApplyHookCard />
      </CenterCard>
    ),
  }),

  // ৩. পোল্যান্ডে বৈধভাবে কাজের সুযোগ পেতে
  opportunity: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/warsaw-skyline.jpg" dur={dur} zoom={[1.04, 1.12]} pos="50% 40%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <OpportunityCard />
      </CenterCard>
    ),
  }),

  // ৪. এই পাঁচটি নির্ভরযোগ্য ওয়েবসাইট আজই সেভ করে রাখুন।
  save_prompt: R({
    place: <ScenicAtmosphereBase photo="apply" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/direct-apply.jpg" dur={dur} zoom={[1.06, 1.14]} pos="50% 50%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <SavePromptCard />
      </CenterCard>
    ),
  }),

  // ৫. প্রথমটি হলো Pracuj.pl।
  site1_intro: R({
    place: <ScenicAtmosphereBase photo="apply" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/direct-apply.jpg" dur={dur} zoom={[1, 1.08]} pos="50% 35%" darken={0.65} />
    ),
    over: () => (
      <CenterCard top={380}>
        <BrowserPortalCard
          siteNumber={1}
          siteName="Pracuj.pl"
          url="https://www.pracuj.pl"
          badgeText="পোল্যান্ডের #১ পোর্টাল"
          badgeBg="#0057b8"
          highlightText="সবচেয়ে বড় ও নির্ভরযোগ্য জব সাইট"
          subText="সরাসরি পোলিশ কোম্পানির ভেরিফাইড অফার"
          tagList={['সব সেক্টর', 'ইংরেজি সাপোর্ট', 'ভেরিফাইড কোম্পানি']}
          rot={-1}
        />
      </CenterCard>
    ),
  }),

  // ৬. এটি পোল্যান্ডের সবচেয়ে বড় জব পোর্টাল, যেখানে সব ধরনের কাজের অফার পাবেন।
  site1_detail: R({
    place: <ScenicAtmosphereBase photo="apply" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/direct-apply.jpg" dur={dur} zoom={[1.08, 1.16]} pos="50% 45%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <Site1DetailCard />
      </CenterCard>
    ),
  }),

  // ৭. দ্বিতীয়টি হলো Praca.pl।
  site2_intro: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/warsaw-skyline.jpg" dur={dur} zoom={[1, 1.08]} pos="50% 50%" darken={0.65} />
    ),
    over: () => (
      <CenterCard top={380}>
        <BrowserPortalCard
          siteNumber={2}
          siteName="Praca.pl"
          url="https://www.praca.pl"
          badgeText="প্রতিদিনের অফার"
          badgeBg="#059669"
          highlightText="হাজারো নতুন সার্কুলার"
          subText="পোল্যান্ডের জনপ্রিয় ক্যারিয়ার পোর্টাল"
          tagList={['ডেইলি আপডেট', 'সরাসরি সিভি সেন্ড', 'ফ্রি রেজিস্ট্রেশন']}
          rot={1.2}
        />
      </CenterCard>
    ),
  }),

  // ৮. এখানে প্রতিদিন হাজারো নতুন চাকরির বিজ্ঞাপন আসে।
  site2_detail: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/warsaw-skyline.jpg" dur={dur} zoom={[1.08, 1.16]} pos="50% 30%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <Site2DetailCard />
      </CenterCard>
    ),
  }),

  // ৯. তিন নম্বরে আছে praca.olx.pl।
  site3_intro: R({
    place: <ScenicAtmosphereBase photo="warehouse" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/warehouse-work.jpg" dur={dur} zoom={[1, 1.08]} pos="50% 45%" darken={0.65} />
    ),
    over: () => (
      <CenterCard top={380}>
        <BrowserPortalCard
          siteNumber={3}
          siteName="praca.olx.pl"
          url="https://praca.olx.pl"
          badgeText="দ্রুত নিয়োগ"
          badgeBg="#0d9488"
          highlightText="ব্লু-কলার কাজের সেরা মার্কেট"
          subText="সরাসরি সুপারভাইজার ও কোম্পানির সাথে যোগাযোগ"
          tagList={['ওয়্যারহাউস', 'ফ্যাক্টরি', 'কনস্ট্রাকশন', 'ড্রাইভার']}
          rot={-1.2}
        />
      </CenterCard>
    ),
  }),

  // ১০. কনস্ট্রাকশন, প্রোডাকশন বা ওয়্যারহাউসে দ্রুত কাজ খোঁজার জন্য এটি সেরা।
  site3_detail: R({
    place: <ScenicAtmosphereBase photo="construction" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/construction-poland.jpg" dur={dur} zoom={[1.05, 1.15]} pos="50% 40%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <Site3DetailCard />
      </CenterCard>
    ),
  }),

  // ১১. আর আপনি যদি আইটি বা টেক সেক্টরে কাজ খুঁজছেন,
  tech_intro: R({
    place: <ScenicAtmosphereBase photo="tech" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/tech-developer.jpg" dur={dur} zoom={[1.05, 1.15]} pos="50% 35%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <TechIntroCard />
      </CenterCard>
    ),
  }),

  // ১২. তাহলে ভিজিট করুন nofluffjobs.com
  site4: R({
    place: <ScenicAtmosphereBase photo="tech" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/tech-developer.jpg" dur={dur} zoom={[1.08, 1.16]} pos="50% 45%" darken={0.65} />
    ),
    over: () => (
      <CenterCard top={380}>
        <BrowserPortalCard
          siteNumber={4}
          siteName="NoFluffJobs"
          url="https://nofluffjobs.com"
          badgeText="১০০% স্যালারি উল্লেখ"
          badgeBg="#0284c7"
          highlightText="ইউরোপীয় আইটি ও টেক জবস"
          subText="বেতন ও সুযোগ-সুবিধা সম্পূর্ণ উন্মুক্ত"
          tagList={['সফটওয়্যার', 'ক্লাউড', 'রিমোট / অনসাইট']}
          rot={1}
        />
      </CenterCard>
    ),
  }),

  // ১৩. এবং justjoin.it।
  site5: R({
    place: <ScenicAtmosphereBase photo="tech" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/tech-developer.jpg" dur={dur} zoom={[1.14, 1.22]} pos="50% 25%" darken={0.65} />
    ),
    over: () => (
      <CenterCard top={380}>
        <BrowserPortalCard
          siteNumber={5}
          siteName="JustJoin.it"
          url="https://justjoin.it"
          badgeText="ইউরোপের #১ টেক সাইট"
          badgeBg="#7c3aed"
          highlightText="ডেভেলপার ও টেক প্রফেশনালস"
          subText="পোল্যান্ড ও ইউরোপের শীর্ষ স্টার্টআপ"
          tagList={['প্রোগ্রামিং', 'আইটি সাপোর্ট', 'হাই স্যালারি']}
          rot={-1}
        />
      </CenterCard>
    ),
  }),

  // ১৪. ভিডিওটি এখনই সেভ করে রাখুন যাতে সাইটগুলোর নাম হারিয়ে না যায়,
  cta_save: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/warsaw-skyline.jpg" dur={dur} zoom={[1.05, 1.14]} pos="50% 45%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <CtaSaveCard />
      </CenterCard>
    ),
  }),

  // ১৫. আর পোল্যান্ডে যেতে ইচ্ছুক বন্ধুদের সাথে শেয়ার করুন।
  cta_share: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="poland/warsaw-skyline.jpg" dur={dur} zoom={[1.12, 1.22]} pos="50% 35%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <CtaShareCard />
      </CenterCard>
    ),
  }),
};

// -------------------------------------------------------------
// ৭. থাম্বনেইল
// -------------------------------------------------------------
export const PolandJobsThumbnail: React.FC = () => {
  return (
    <PsyThumb
      l1="পোল্যান্ডে সরাসরি চাকরি!"
      l2="দালাল ছাড়াই ৫টি সাইট"
      bottom="বৈধ উপায়ে ইউরোপে কাজের নির্ভরযোগ্য জব পোর্টাল"
      term="Poland Work Visa · Direct Apply Websites"
      art={
        <div style={{width: '100%', height: '100%', background: '#0e1117', position: 'relative', overflow: 'hidden'}}>
          <Img
            src={staticFile('poland/warsaw-skyline.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '50% 40%',
              transform: 'scale(1.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.15) 30%, rgba(10,12,18,0.85) 100%)',
            }}
          />
        </div>
      }
      size={80}
    />
  );
};

export const poland = story('poland/', raw, SCENES, PolandJobsThumbnail, {logo: 'bba2'});
export const PolandJobs = poland;
