// আন্ডার দ্য সেম স্কাই: আড়াই কোটির ছবি ও নিখোঁজ ৫ জন মানুষ — PinuRahman
// High-retention, scenic BBA reel video design
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, RED, clampOpts} from '../biz/art';
import {Bokeh, Soft} from '../common/elegant';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Bounce, Label, R, story} from '../common/reel';
import raw from './segments.json';

const LINE = '#1b1b1f';

// -------------------------------------------------------------
// ১. মনোরম ডেপথ-অফ-ফিল্ড ব্যাকগ্রাউন্ড (Soft Bokeh Base)
// -------------------------------------------------------------
const ScenicAtmosphereBase: React.FC<{
  photo?: 'slum' | 'drone' | 'bank' | 'agency' | 'stage' | 'trophy';
}> = ({photo = 'slum'}) => {
  const file =
    photo === 'drone'
      ? 'pinu/drone-rooftop.jpg'
      : photo === 'bank'
      ? 'pinu/banker-desk.jpg'
      : photo === 'agency'
      ? 'pinu/agency-review.jpg'
      : photo === 'stage'
      ? 'pinu/award-stage.jpg'
      : photo === 'trophy'
      ? 'pinu/pinu-trophy.jpg'
      : 'pinu/korail-fire.jpg';

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
// ২. ফুল স্ক্রিন সিনেম্যাটিক ফটো (Ken-Burns + সফট ভিনিয়েট)
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
// ৩. ফিজিক্যাল টিল্টেড পেপার কার্ড (রিয়েল পেপার আর্কিটেকচার)
// -------------------------------------------------------------
const PhysicalPaperCard: React.FC<{
  w?: number;
  rot?: number;
  bg?: string;
  children: React.ReactNode;
}> = ({w = 710, rot = -2, bg = '#faf7f0', children}) => {
  return (
    <div
      style={{
        width: w,
        padding: '38px 34px',
        background: bg,
        border: `7px solid ${LINE}`,
        borderRadius: 18,
        boxShadow: '0 24px 60px rgba(0,0,0,0.52)',
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

// কার্ড সেন্টার কন্টেইনার
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

// টপ পিল ব্যাজ
const TitlePill: React.FC<{
  text: string;
  bg?: string;
  color?: string;
}> = ({text, bg = '#dc2626', color = '#ffffff'}) => (
  <div
    style={{
      display: 'inline-block',
      padding: '8px 22px',
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
// ৪. দৃশ্যভিত্তিক বিশেষায়িত কার্ডসমূহ
// -------------------------------------------------------------

// হুক ১: আড়াই কোটি টাকার ছবি
const HookPriceCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={740} rot={-1.5}>
      <TitlePill text="বিশ্বের সর্বোচ্চ পুরস্কারপ্রাপ্ত ছবি" bg="#d97706" />
      <div style={{fontSize: 54, fontWeight: 900, color: '#dc2626', lineHeight: 1.18, marginTop: 4}}>
        ছবির দাম আড়াই কোটি টাকা!
      </div>
      <div
        style={{
          height: 4,
          background: '#d97706',
          borderRadius: 2,
          margin: '20px auto 16px',
          width: '60%',
        }}
      />
      <div style={{fontSize: 35, fontWeight: 800, color: '#1e293b', lineHeight: 1.35}}>
        কিন্তু এই ছবির মানুষগুলোকে<br />
        <span style={{color: '#b91c1c', fontWeight: 900}}>এখনো কেউ খুঁজে পায়নি!</span>
      </div>
    </PhysicalPaperCard>
  );
};

// হুক ২: খোলা আকাশ ও পোড়া ঘর
const SleepingFamilyCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={720} rot={1.8}>
      <TitlePill text="কড়াইল বস্তির সেই ফ্রেম" bg="#2563eb" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#0f172a', lineHeight: 1.25}}>
        পোড়া ঘর · খোলা আকাশ
      </div>
      <div style={{fontSize: 34, fontWeight: 800, color: '#475569', marginTop: 14, lineHeight: 1.4}}>
        নিচে জীর্ণ কাঁথায় এক বিছানায়<br />
        <span style={{color: '#b91c1c', fontWeight: 900}}>নিশ্চিন্তে ঘুমাচ্ছে ৫ জন মানুষ</span>
      </div>
    </PhysicalPaperCard>
  );
};

// হুক ৩: বাংলাদেশি পেলেন গ্র্যান্ড প্রাইজ
const GrandPrizePinuCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={730} rot={-2}>
      <TitlePill text="ইতিহাস সৃষ্টি" bg="#d97706" />
      <div style={{fontSize: 50, fontWeight: 900, color: '#15803d', lineHeight: 1.2}}>
        গ্র্যান্ড প্রাইজ জিতলেন বাংলাদেশি!
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#334155', marginTop: 14}}>
        দুবাইয়ের বিখ্যাত HIPA অ্যাওয়ার্ডে শীর্ষ সম্মান
      </div>
    </PhysicalPaperCard>
  );
};

// কড়াইল বস্তিতে অগ্নিকাণ্ড
const KorailFireCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={720} rot={-1.8}>
      <TitlePill text="এক বছর আগের ঘটনা" bg="#dc2626" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#991b1b', lineHeight: 1.22}}>
        ঢাকার কড়াইল বস্তিতে আগুন!
      </div>
      <div style={{fontSize: 34, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.38}}>
        ঘর, টিনের চাল, সহায়-সম্বল—<br />
        মুহূর্তেই সব পুড়ে ছাই হয়ে গেল
      </div>
    </PhysicalPaperCard>
  );
};

// পিনু রহমান: পেশায় ব্যাংকার
const BankerIdentityCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={710} rot={2}>
      <TitlePill text="ফটোগ্রাফার পরিচিতি" bg="#0284c7" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#0f172a', lineHeight: 1.25}}>
        পিনু রহমান · পেশায় ব্যাংকার
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#475569', marginTop: 14, lineHeight: 1.38}}>
        সেদিন ব্যাংকে অফিস থাকায়<br />
        তাৎক্ষণিকভাবে যেতে পারেননি
      </div>
    </PhysicalPaperCard>
  );
};

// ভোরে ড্রোন ওড়ানো
const DroneFlightCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={720} rot={-1.5}>
      <TitlePill text="৩ দিন পর ভোরের দৃশ্য" bg="#059669" />
      <div style={{fontSize: 46, fontWeight: 900, color: '#0f172a', lineHeight: 1.24}}>
        ছাদে উঠে ওড়ালেন ড্রোন
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.4}}>
        বিশাল এলাকা হেঁটে দেখা অসম্ভব<br />
        আধা ঘণ্টা ধরে চলল আকাশ থেকে নজরদারি
      </div>
    </PhysicalPaperCard>
  );
};

// বস্তির সকালের জীবন
const SlumLifeObservationsCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={730} rot={1.5}>
      <TitlePill text="ড্রোনের ক্যামেরায় ধরা পড়া জীবন" bg="#6366f1" />
      <div style={{fontSize: 42, fontWeight: 900, color: '#0f172a', lineHeight: 1.3}}>
        কোনো ঘরের ছাদ নেই!
      </div>
      <div style={{fontSize: 32, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.45}}>
        কেউ নাশতা করছে · কেউ ফোনে কথা বলছে<br />
        <span style={{color: '#b91c1c', fontWeight: 900}}>আর এক কোণে তখনো কেউ ঘুমিয়ে...</span>
      </div>
    </PhysicalPaperCard>
  );
};

// ফ্রেমে চোখ আটকে গেল
const EyeCaughtCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={700} rot={-2.2}>
      <TitlePill text="বাসায় ফিরে ছবি বাছাই" bg="#d97706" />
      <div style={{fontSize: 50, fontWeight: 900, color: '#dc2626', lineHeight: 1.2}}>
        একটা ফ্রেমে চোখ আটকে গেল!
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#475569', marginTop: 14}}>
        শত ছবির মাঝে আলাদা এক গল্প
      </div>
    </PhysicalPaperCard>
  );
};

// পূর্ণাঙ্গ ফ্রেমড মাস্টারপিস ফটোগ্রাফ (স্ক্রিনে অন্য কোনো অবজেক্ট থাকবে না, সম্পূর্ণ স্থির প্রামাণ্য ছবি)
const FramedMasterpiecePhoto: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #181b22 0%, #08090c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* গ্যালারি স্পটলাইটের মৃদু আভা */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '5%',
          width: '90%',
          height: '65%',
          background: 'radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ক্লাসিক্যাল ফটোগ্রাফ ফ্রেম (White Museum Mat Border + Real Physical Shadow) */}
      <div
        style={{
          position: 'relative',
          width: 980,
          background: '#ffffff', // খাঁটি আর্ট পেপার সাদা বর্ডার
          padding: '24px 24px 34px 24px',
          borderRadius: 8,
          boxShadow:
            '0 35px 80px rgba(0,0,0,0.88), 0 12px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)',
          transform: 'translateY(-40px)', // সাবটাইটেল জোন থেকে নিরাপদে উপরে
          boxSizing: 'border-box',
        }}
      >
        {/* ইনার ফটো ফ্রেম */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '640 / 451',
            background: '#050608',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.25)',
          }}
        >
          <Img
            src={staticFile('pinu/under-the-same-sky.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* এক্সিবিশন প্রেস ফটোগ্রাফ ক্যাপশন ও ফটোগ্রাফার নাম */}
        <div
          style={{
            marginTop: 14,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 6px',
            color: '#475569',
            fontFamily: 'sans-serif',
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          <span>“Under The Same Sky”</span>
          <span>Pinu Rahman · HIPA Grand Prize</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ঘুম ভাঙবে, তবু একসাথে
const TogetherCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={720} rot={1.8}>
      <TitlePill text="ছবির ভেতরের দর্শন" bg="#0284c7" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#0f172a', lineHeight: 1.25}}>
        ঘর নেই, কিছু নেই...
      </div>
      <div style={{fontSize: 44, fontWeight: 900, color: '#15803d', marginTop: 12}}>
        তবু সবাই একসাথে!
      </div>
      <div style={{fontSize: 31, fontWeight: 800, color: '#475569', marginTop: 12}}>
        ক্লান্ত ৫টি মুখ, কিন্তু বন্ধন ছিন্ন হয়নি
      </div>
    </PhysicalPaperCard>
  );
};

// বিদেশি সংবাদ সংস্থার সিইও-র মন্তব্য
const CeoQuoteCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={730} rot={-1.8}>
      <TitlePill text="আন্তর্জাতিক বার্তা সংস্থা" bg="#475569" />
      <div style={{fontSize: 40, fontWeight: 900, color: '#0f172a', lineHeight: 1.35, fontStyle: 'italic'}}>
        “এর ভেতরে অনেক গল্প আছে,<br />খুব যত্ন করে রাখুন!”
      </div>
      <div style={{fontSize: 29, fontWeight: 800, color: '#b91c1c', marginTop: 16}}>
        — বিদেশি প্রতিষ্ঠানের সিইও
      </div>
    </PhysicalPaperCard>
  );
};

// হিপা থিম: ফ্যামিলি
const HipaThemeCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={730} rot={2}>
      <TitlePill text="দুবাইয়ের ঐতিহ্যবাহী প্রতিযোগিতা" bg="#d97706" />
      <div style={{fontSize: 50, fontWeight: 900, color: '#d97706', lineHeight: 1.2}}>
        আমিরাতের HIPA পুরস্কার
      </div>
      <div style={{fontSize: 38, fontWeight: 900, color: '#0f172a', marginTop: 12}}>
        এবারের থিম: <span style={{color: '#dc2626'}}>Family (পরিবার)</span>
      </div>
      <div style={{fontSize: 30, fontWeight: 800, color: '#475569', marginTop: 12}}>
        বিশ্বের সবচেয়ে বড় পুরস্কারের আসর
      </div>
    </PhysicalPaperCard>
  );
};

// দর্শন: মানুষ আবার উঠে দাঁড়ায়
const ResilienceCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={740} rot={-1.5}>
      <TitlePill text="বাস্তবতার সত্য" bg="#059669" />
      <div style={{fontSize: 44, fontWeight: 900, color: '#0f172a', lineHeight: 1.28}}>
        বস্তিতে আগুন নতুন কিছু না...
      </div>
      <div style={{fontSize: 42, fontWeight: 900, color: '#15803d', marginTop: 14}}>
        তবু মানুষ আবার উঠে দাঁড়ায়!
      </div>
      <div style={{fontSize: 31, fontWeight: 800, color: '#475569', marginTop: 12}}>
        ধ্বংসের ছাইয়ের মধ্যেও জীবনের অবিচল লড়াই
      </div>
    </PhysicalPaperCard>
  );
};

// ছবির শিরোনাম: Under The Same Sky
const TitleSameSkyCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={730} rot={1.8}>
      <TitlePill text="ছবির নামকরণ" bg="#2563eb" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#1d4ed8', lineHeight: 1.2}}>
        “Under The Same Sky”
      </div>
      <div style={{fontSize: 38, fontWeight: 900, color: '#0f172a', marginTop: 12}}>
        একই আকাশের নিচে
      </div>
      <div style={{fontSize: 30, fontWeight: 800, color: '#64748b', marginTop: 10}}>
        খোলা আকাশের নিচে আশ্রয়হীন পরিবার
      </div>
    </PhysicalPaperCard>
  );
};

// প্রথম আলোর প্রধান ফটোগ্রাফারের কথা
const ProthomAloQuoteCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={720} rot={-1.8}>
      <TitlePill text="অনুষ্ঠানের ঠিক আগে" bg="#dc2626" />
      <div style={{fontSize: 42, fontWeight: 900, color: '#0f172a', lineHeight: 1.34}}>
        “পিনু, মনে হচ্ছে তোমার জন্য<br />
        <span style={{color: '#d97706'}}>বড় কিছু অপেক্ষা করছে!”</span>
      </div>
      <div style={{fontSize: 29, fontWeight: 800, color: '#475569', marginTop: 16}}>
        — প্রথম আলোর প্রধান আলোকচিত্রী
      </div>
    </PhysicalPaperCard>
  );
};

// পিনুর বিনম্র প্রত্যাশা
const PinuHumbleCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={700} rot={1.5}>
      <TitlePill text="ফটোগ্রাফারের প্রত্যাশা" bg="#475569" />
      <div style={{fontSize: 44, fontWeight: 900, color: '#0f172a', lineHeight: 1.3}}>
        “আশা করছি অন্তত<br />
        <span style={{color: '#2563eb'}}>তৃতীয় পুরস্কারটা পাবো...”</span>
      </div>
      <div style={{fontSize: 30, fontWeight: 800, color: '#64748b', marginTop: 14}}>
        বিশ্বমানের হাজারো ছবির সাথে লড়াই
      </div>
    </PhysicalPaperCard>
  );
};

// ঘোষণা শুরু: ৩য় নেই, ২য় নেই, ১ম-ও নেই!
const AwardSuspenseSequenceCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={730} rot={-2}>
      <TitlePill text="পুরস্কারের মঞ্চে ঘোষণা" bg="#dc2626" />
      <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10}}>
        <div style={{fontSize: 38, fontWeight: 900, color: '#64748b'}}>
          ৩য় পুরস্কার ➔ <span style={{color: '#dc2626'}}>নাম নেই</span>
        </div>
        <div style={{fontSize: 38, fontWeight: 900, color: '#64748b'}}>
          ২য় পুরস্কার ➔ <span style={{color: '#dc2626'}}>নেই</span>
        </div>
        <div style={{fontSize: 42, fontWeight: 900, color: '#991b1b'}}>
          ১ম পুরস্কার ➔ <span style={{color: '#dc2626'}}>তাও নেই!</span>
        </div>
      </div>
    </PhysicalPaperCard>
  );
};

// পিনু অবাক: কোনো পুরস্কারই কি পাচ্ছি না?
const PinuSurpriseCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={710} rot={1.8}>
      <TitlePill text="চরম উৎকণ্ঠা" bg="#475569" />
      <div style={{fontSize: 46, fontWeight: 900, color: '#dc2626', lineHeight: 1.25}}>
        পিনু অবাক...
      </div>
      <div style={{fontSize: 38, fontWeight: 900, color: '#0f172a', marginTop: 12}}>
        তাহলে কি কোনো পুরস্কারই পাচ্ছি না?!
      </div>
    </PhysicalPaperCard>
  );
};

// গ্র্যান্ড প্রাইজ জয়ী
const GrandPrizeRevealCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={740} rot={-1.5} bg="#fffbeb">
      <TitlePill text="HIPA GRAND PRIZE WINNER" bg="#d97706" />
      <div style={{fontSize: 48, fontWeight: 900, color: '#15803d', lineHeight: 1.2}}>
        বাংলাদেশের একটি ছবি!
      </div>
      <div style={{fontSize: 42, fontWeight: 900, color: '#0f172a', marginTop: 12}}>
        ফটোগ্রাফার: <span style={{color: '#b45309'}}>পিনু রহমান</span>
      </div>
    </PhysicalPaperCard>
  );
};

// দুই লাখ মার্কিন ডলার · আড়াই কোটি টাকা
const PrizeAmountCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={740} rot={2} bg="#f0fdf4">
      <TitlePill text="সর্বোচ্চ আন্তর্জাতিক পুরস্কার" bg="#15803d" />
      <div style={{fontSize: 64, fontWeight: 900, color: '#166534', lineHeight: 1.15}}>
        $200,000 USD
      </div>
      <div style={{fontSize: 44, fontWeight: 900, color: '#dc2626', marginTop: 12}}>
        প্রায় আড়াই কোটি টাকা!
      </div>
    </PhysicalPaperCard>
  );
};

// আসল মানুষগুলো নিখোঁজ
const MissingFamilyCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={730} rot={-2} bg="#fef2f2">
      <TitlePill text="অজানা অন্ধকার" bg="#dc2626" />
      <div style={{fontSize: 46, fontWeight: 900, color: '#991b1b', lineHeight: 1.25}}>
        আসল ৫ জন মানুষ এখনো আড়ালে!
      </div>
      <div style={{fontSize: 33, fontWeight: 800, color: '#334155', marginTop: 14, lineHeight: 1.4}}>
        কাজটা ভীষণ কঠিন...<br />
        <span style={{color: '#b91c1c', fontWeight: 900}}>এখনো তাঁদের কোনো খোঁজ মেলেনি!</span>
      </div>
    </PhysicalPaperCard>
  );
};

// ছবি দুনিয়া জিতল, মানুষগুলো কোথায়?
const WorldWonCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={740} rot={1.8}>
      <TitlePill text="হৃদয়বিদারক প্যারাডক্স" bg="#475569" />
      <div style={{fontSize: 44, fontWeight: 900, color: '#0f172a', lineHeight: 1.3}}>
        একটা ছবি পুরো দুনিয়া জিতে নিল...
      </div>
      <div style={{fontSize: 38, fontWeight: 900, color: '#dc2626', marginTop: 14}}>
        আর যাঁদের ছবি, তাঁরা কোথায়?<br />কেউ জানে না!
      </div>
    </PhysicalPaperCard>
  );
};

// মানবিক আবেদন: শেয়ার করে সাহায্য করুন
const FinalSearchAppealCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={740} rot={-1.5} bg="#fffdf7">
      <TitlePill text="মানবিক সন্ধান আবেদন" bg="#dc2626" />
      <div style={{fontSize: 42, fontWeight: 900, color: '#0f172a', lineHeight: 1.3}}>
        তুমি কি চেনো এই পরিবারটাকে?
      </div>
      <div style={{fontSize: 32, fontWeight: 800, color: '#334155', marginTop: 12, lineHeight: 1.4}}>
        কড়াইলের কেউ, কোনো প্রতিবেশী বা আত্মীয়?
      </div>
      <div
        style={{
          marginTop: 18,
          padding: '12px 24px',
          background: '#d97706',
          borderRadius: 12,
          color: '#fff',
          fontSize: 33,
          fontWeight: 900,
        }}
      >
        ভিডিওটা শেয়ার করো—<br />
        যত দূর যাবে, তত কাছে পৌঁছাবে এই পরিবার!
      </div>
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// ৫. দৃশ্যের দৃশ্যবিন্যাস (SCENES ম্যাপিং)
// -------------------------------------------------------------
const SCENES: Record<string, React.FC<SP>> = {
  // ১. এই ছবির দাম আড়াই কোটি টাকা
  h1: R({
    place: <ScenicAtmosphereBase photo="slum" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/under-the-same-sky.jpg" dur={dur} zoom={[1.08, 1.2]} pos="50% 45%" />
    ),
    over: () => (
      <CenterCard top={400}>
        <HookPriceCard />
      </CenterCard>
    ),
  }),

  // ২. পোড়া ঘর, খোলা আকাশ
  h2: R({
    place: <ScenicAtmosphereBase photo="slum" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/under-the-same-sky.jpg" dur={dur} zoom={[1.2, 1.35]} pos="65% 38%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <SleepingFamilyCard />
      </CenterCard>
    ),
  }),

  // ৩. গত মঙ্গলবার একজন বাংলাদেশি পেলেন গ্র্যান্ড পুরোস্কার
  h3: R({
    place: <ScenicAtmosphereBase photo="stage" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/pinu-trophy.jpg" dur={dur} zoom={[1, 1.07]} pos="50% 25%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <GrandPrizePinuCard />
      </CenterCard>
    ),
  }),

  // ৪. কড়াইল বস্তিতে আগুন লাগল
  fire: R({
    place: <ScenicAtmosphereBase photo="slum" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/korail-fire.jpg" dur={dur} zoom={[1, 1.08]} pos="50% 50%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <KorailFireCard />
      </CenterCard>
    ),
  }),

  // ৫. পিনু রহমান, পেশায় একজন ব্যাংকার
  banker: R({
    place: <ScenicAtmosphereBase photo="bank" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/banker-desk.jpg" dur={dur} zoom={[1, 1.07]} pos="50% 40%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <BankerIdentityCard />
      </CenterCard>
    ),
  }),

  // ৬. তিন দিন পর এক ভোরে গেলেন
  drone_go: R({
    place: <ScenicAtmosphereBase photo="drone" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/drone-rooftop.jpg" dur={dur} zoom={[1, 1.08]} pos="50% 45%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <DroneFlightCard />
      </CenterCard>
    ),
  }),

  // ৭. এক বাড়ির ছাদে উঠে ড্রোন ওড়ালেন
  drone_fly: R({
    place: <ScenicAtmosphereBase photo="drone" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/drone-rooftop.jpg" dur={dur} zoom={[1.08, 1.16]} pos="50% 30%" />
    ),
    title: 'আধা ঘণ্টা ধরে ড্রোন ওড়ালেন',
    color: GOLD,
    size: 68,
  }),

  // ৮. নিচে কোনো ঘরের ছাদে টিন নেই
  slum_life: R({
    place: <ScenicAtmosphereBase photo="slum" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/under-the-same-sky.jpg" dur={dur} zoom={[1.1, 1.25]} pos="45% 55%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <SlumLifeObservationsCard />
      </CenterCard>
    ),
  }),

  // ৯. বাসায় ফিরে ছবি দেখতে বসলেন
  desk_edit: R({
    place: <ScenicAtmosphereBase photo="agency" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/agency-review.jpg" dur={dur} zoom={[1, 1.07]} pos="50% 35%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <EyeCaughtCard />
      </CenterCard>
    ),
  }),

  // ১০. ঠিক এই ছবিটা (সম্পূর্ণ স্থির, সুন্দর আর্ট বর্ডার, স্ক্রিনে অন্য কোনো অবজেক্ট নেই)
  this_photo: R({
    place: <FramedMasterpiecePhoto />,
  }),

  // ১১. দেখে মনে হচ্ছিল ভীষণ ক্লান্ত (স্থিরভাবে দর্শককে বিস্তারিত দেখতে দেওয়া)
  photo_feel: R({
    place: <FramedMasterpiecePhoto />,
  }),

  // ১২. ঘর নেই, কিছু নেই, তবু একসাথে (স্ক্রিনে কোনো অবজেক্ট ছাড়া নীরব দর্শন)
  photo_together: R({
    place: <FramedMasterpiecePhoto />,
  }),

  // ১৩. বিদেশি সংবাদ প্রতিষ্ঠান বাছল বিশটা
  agency_select: R({
    place: <ScenicAtmosphereBase photo="agency" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/agency-review.jpg" dur={dur} zoom={[1, 1.08]} pos="50% 40%" />
    ),
    title: 'আন্তর্জাতিক বাছাই: ২০টি ছবি',
    color: GOLD,
    size: 68,
  }),

  // ১৪. সিইও বললেন যত্ন করে রাখুন
  ceo_quote: R({
    place: <ScenicAtmosphereBase photo="agency" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/agency-review.jpg" dur={dur} zoom={[1.05, 1.12]} pos="50% 45%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <CeoQuoteCard />
      </CenterCard>
    ),
  }),

  // ১৫. আমিরাতের হিপা পুরস্কার, থিম ফ্যামিলি
  hipa_theme: R({
    place: <ScenicAtmosphereBase photo="stage" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/award-stage.jpg" dur={dur} zoom={[1, 1.07]} pos="50% 45%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <HipaThemeCard />
      </CenterCard>
    ),
  }),

  // ১৬. মানুষ আবার উঠে দাঁড়ায়
  philosophy: R({
    place: <ScenicAtmosphereBase photo="slum" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/korail-fire.jpg" dur={dur} zoom={[1.05, 1.14]} pos="50% 40%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <ResilienceCard />
      </CenterCard>
    ),
  }),

  // ১৭. ছবির নাম দিলেন আন্ডার দ্য সেম স্কাই
  title_sky: R({
    place: <FramedMasterpiecePhoto />,
  }),

  // ১৮. গত মঙ্গলবার পুরস্কারের স্টেজ
  dubai_stage: R({
    place: <ScenicAtmosphereBase photo="stage" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/award-stage.jpg" dur={dur} zoom={[1, 1.08]} pos="50% 45%" />
    ),
    title: 'পুরস্কারের জাঁকজমক মঞ্চ',
    color: GOLD,
    size: 72,
  }),

  // ১৯. প্রথম আলোর প্রধান ফটোগ্রাফারের কথা
  pa_editor: R({
    place: <ScenicAtmosphereBase photo="stage" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/award-stage.jpg" dur={dur} zoom={[1.05, 1.12]} pos="50% 50%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <ProthomAloQuoteCard />
      </CenterCard>
    ),
  }),

  // ২০. পিনুর বিনম্র প্রত্যাশা
  pinu_modest: R({
    place: <ScenicAtmosphereBase photo="stage" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/award-stage.jpg" dur={dur} zoom={[1.08, 1.15]} pos="50% 45%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <PinuHumbleCard />
      </CenterCard>
    ),
  }),

  // ২১. ঘোষণা শুরু হলো: ৩য় নেই, ২য় নেই, ১ম নেই
  announcing: R({
    place: <ScenicAtmosphereBase photo="stage" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/award-stage.jpg" dur={dur} zoom={[1, 1.08]} pos="50% 40%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <AwardSuspenseSequenceCard />
      </CenterCard>
    ),
  }),

  // ২২. পিনু অবাক: কোনো পুরস্কারই কি পাচ্ছি না?
  pinu_suspense: R({
    place: <ScenicAtmosphereBase photo="stage" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/award-stage.jpg" dur={dur} zoom={[1.05, 1.12]} pos="50% 50%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <PinuSurpriseCard />
      </CenterCard>
    ),
  }),

  // ২৩. সবশেষে গ্র্যান্ড পুরোস্কার
  grand_reveal: R({
    place: <ScenicAtmosphereBase photo="trophy" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/pinu-trophy.jpg" dur={dur} zoom={[1, 1.09]} pos="50% 20%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <GrandPrizeRevealCard />
      </CenterCard>
    ),
  }),

  // ২৪. দুই লাখ মার্কিন ডলার · আড়াই কোটি টাকা
  prize_money: R({
    place: <ScenicAtmosphereBase photo="trophy" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/pinu-trophy.jpg" dur={dur} zoom={[1.06, 1.14]} pos="50% 25%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <PrizeAmountCard />
      </CenterCard>
    ),
  }),

  // ২৫. কিন্তু এই ছবির আসল মানুষগুলো এখনো আড়ালে
  search_begins: R({
    place: <ScenicAtmosphereBase photo="slum" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/under-the-same-sky.jpg" dur={dur} zoom={[1.1, 1.25]} pos="65% 38%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <MissingFamilyCard />
      </CenterCard>
    ),
  }),

  // ২৬. একটা ছবি দুনিয়া জিতে নিল, আর মানুষগুলো কোথায়?
  world_won: R({
    place: <ScenicAtmosphereBase photo="slum" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/under-the-same-sky.jpg" dur={dur} zoom={[1.05, 1.18]} pos="50% 45%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <WorldWonCard />
      </CenterCard>
    ),
  }),

  // ২৭. তুমি কি চেনো এই পরিবারটাকে? ভিডিওটা শেয়ার করো
  cta: R({
    place: <ScenicAtmosphereBase photo="slum" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="pinu/under-the-same-sky.jpg" dur={dur} zoom={[1.15, 1.25]} pos="55% 42%" />
    ),
    over: () => (
      <CenterCard top={400}>
        <FinalSearchAppealCard />
      </CenterCard>
    ),
  }),
};

// -------------------------------------------------------------
// ৬. থাম্বনেইল
// -------------------------------------------------------------
export const PinuThumbnail: React.FC = () => {
  return (
    <PsyThumb
      l1="আড়াই কোটি টাকার ছবি!"
      l2="কিন্তু মানুষগুলো নিখোঁজ"
      bottom="দুনিয়া কাঁপানো ছবির ভেতরের অশ্রুত সত্য"
      term="Under The Same Sky · HIPA Grand Prize"
      art={
        <div style={{width: '100%', height: '100%', background: '#0e1117', position: 'relative', overflow: 'hidden'}}>
          <Img
            src={staticFile('pinu/under-the-same-sky.jpg')}
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

export const pinu = story('pinu/', raw, SCENES, PinuThumbnail, {logo: 'bba2'});
export const PinuRahman = pinu;
