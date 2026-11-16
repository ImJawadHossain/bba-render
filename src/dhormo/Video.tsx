// ধর্মব্যবসায়ী আসলে কে? আসাদ নূর ও ধর্মব্যবসার দ্বিমুখী সত্য — DhormoByabsayi
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
const ScenicAtmosphereBase: React.FC<{photo?: 'studio' | 'skyline' | 'waz' | 'bazaar'}> = ({photo = 'studio'}) => {
  const file =
    photo === 'skyline'
      ? 'dhormo/dhaka-dusk-skyline.jpg'
      : photo === 'waz'
      ? 'dhormo/waz-mahfil.jpg'
      : photo === 'bazaar'
      ? 'dhormo/traditional-bazaar.jpg'
      : 'dhormo/creator-studio.jpg';

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
}> = ({src, dur, zoom = [1, 1.08], pos = '50% 50%'}) => {
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
          background:
            'radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 45%, rgba(10,12,18,0.72) 100%)',
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
  children: React.ReactNode;
}> = ({w = 710, rot = -2.5, children}) => {
  return (
    <div
      style={{
        width: w,
        padding: '42px 36px',
        background: '#f6f2e8', // ক্লাসিক ওয়ার্ম আইভরি পেপার
        border: `8px solid ${LINE}`, // সলিড ডার্ক বর্ডার
        borderRadius: 16,
        boxShadow: '0 26px 60px rgba(0,0,0,0.55)', // ডিপ ফিজিক্যাল শ্যাডো
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

const DocumentLines: React.FC<{lines?: number[]}> = ({lines = [0.85, 0.7, 0.8]}) => (
  <div style={{margin: '16px 0'}}>
    {lines.map((k, i) => (
      <div
        key={i}
        style={{
          height: 10,
          width: `${k * 100}%`,
          background: '#c9c4b8',
          borderRadius: 5,
          margin: '12px auto',
        }}
      />
    ))}
  </div>
);

// কার্ড সেন্টারিং হেল্পার
const CenterCard: React.FC<{children: React.ReactNode; top?: number}> = ({
  children,
  top = 410,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <Bounce x={0} y={0} at={1} seed="dhormo-card">
        {children}
      </Bounce>
    </div>
  );
};

// -------------------------------------------------------------
// কাস্টম সিন কার্ডসমূহ
// -------------------------------------------------------------

// কার্ড ১: শব্দ ও সংজ্ঞা
const WordDefinitionCard: React.FC = () => (
  <PhysicalPaperCard w={710} rot={-2}>
    <div style={{fontSize: 22, color: '#854d0e', letterSpacing: 1.5, marginBottom: 8}}>
      শব্দকোষ ও বিতর্ক
    </div>
    <div
      style={{
        fontSize: 54,
        fontWeight: 900,
        color: '#991b1b',
        borderTop: `4px solid ${LINE}`,
        borderBottom: `4px solid ${LINE}`,
        padding: '16px 0',
        margin: '12px 0',
      }}
    >
      ধর্মব্যবসায়ী
    </div>
    <div style={{fontSize: 26, color: '#15151b', marginTop: 10}}>
      শব্দটি আমরা প্রত্যেকেই বারবার শুনেছি...
    </div>
  </PhysicalPaperCard>
);

// কার্ড ২: আসাদ নূরের নিয়মিত বক্তব্য
const AsadClaimCard: React.FC = () => (
  <PhysicalPaperCard w={720} rot={2.5}>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginBottom: 14}}>
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `5px solid ${LINE}`,
          boxShadow: '0 10px 24px rgba(0,0,0,0.3)',
        }}
      >
        <Img
          src={staticFile('dhormo/asad-noor.jpg')}
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%'}}
        />
      </div>
      <div style={{textAlign: 'left'}}>
        <div style={{fontSize: 22, color: '#b45309', letterSpacing: 1}}>অনলাইন স্পিকার</div>
        <div style={{fontSize: 36, color: '#15151b'}}>আসাদ নূর</div>
        <div style={{fontSize: 20, color: '#5a5f6e'}}>প্রতিটি ভিডিওর মূল বক্তব্য</div>
      </div>
    </div>
    <div
      style={{
        fontSize: 34,
        lineHeight: 1.35,
        color: '#991b1b',
        background: 'rgba(254, 226, 226, 0.6)',
        border: '3px solid #be123c',
        borderRadius: 12,
        padding: '16px 14px',
        margin: '10px 0',
      }}
    >
      “সবাই ধর্মব্যবসায়ী!”
    </div>
  </PhysicalPaperCard>
);

// কার্ড ৩: একটি প্রশ্ন
const QuestionDecisionCard: React.FC = () => (
  <PhysicalPaperCard w={710} rot={-2.5}>
    <div style={{fontSize: 24, color: '#854d0e', marginBottom: 10}}>একটি নিরপেক্ষ প্রশ্ন</div>
    <div style={{fontSize: 44, lineHeight: 1.35, color: '#15151b'}}>
      আজ আমি একটা প্রশ্ন করতে চাই...
    </div>
    <DocumentLines lines={[0.85, 0.65]} />
    <div style={{fontSize: 26, color: '#15151b', marginTop: 12}}>
      আর উত্তরটা আপনারা নিজেরাই ঠিক করবেন।
    </div>
  </PhysicalPaperCard>
);

// কার্ড ৪: ব্যবসায়ীর সংজ্ঞা ও লাভ
const BusinessDefinitionCard: React.FC = () => (
  <PhysicalPaperCard w={710} rot={2}>
    <div style={{fontSize: 24, color: '#854d0e', marginBottom: 10}}>ব্যবসায়ের সহজ হিসাব</div>
    <div style={{fontSize: 44, color: '#15151b', marginBottom: 14}}>ব্যবসায়ী কাকে বলে?</div>
    <div
      style={{
        fontSize: 32,
        lineHeight: 1.4,
        color: '#15151b',
        borderTop: `4px solid ${LINE}`,
        borderBottom: `4px solid ${LINE}`,
        padding: '16px 10px',
        background: '#fffdf8',
      }}
    >
      যে একটা জিনিসকে <span style={{color: '#b45309'}}>পুঁজি</span> করে <span style={{color: '#991b1b'}}>লাভ</span> তোলে!
    </div>
  </PhysicalPaperCard>
);

// কার্ড ৫: মাছ ও কাপড়ের উদাহরণ
const MarketComparisonCard: React.FC = () => (
  <PhysicalPaperCard w={720} rot={-2}>
    <div style={{fontSize: 24, color: '#5a5f6e', marginBottom: 14}}>বাজারের বাস্তবতা</div>
    <div style={{display: 'flex', justifyContent: 'space-between', gap: 16}}>
      <div
        style={{
          flex: 1,
          padding: '18px 12px',
          background: '#e0f2fe',
          border: `3px solid ${LINE}`,
          borderRadius: 12,
        }}
      >
        <div style={{fontSize: 36}}>🐟</div>
        <div style={{fontSize: 28, color: '#0369a1', marginTop: 6}}>মাছ বেচলে</div>
        <div style={{fontSize: 24, fontWeight: 900, color: '#15151b'}}>মাছের ব্যবসায়ী</div>
      </div>
      <div
        style={{
          flex: 1,
          padding: '18px 12px',
          background: '#fef3c7',
          border: `3px solid ${LINE}`,
          borderRadius: 12,
        }}
      >
        <div style={{fontSize: 36}}>🧵</div>
        <div style={{fontSize: 28, color: '#b45309', marginTop: 6}}>কাপড় বেচলে</div>
        <div style={{fontSize: 24, fontWeight: 900, color: '#15151b'}}>কাপড়ের ব্যবসায়ী</div>
      </div>
    </div>
  </PhysicalPaperCard>
);

// কার্ড ৬: ধর্মব্যবসায়ীর আসল সূত্র
const ReligiousBusinessFormulaCard: React.FC = () => {
  const f = useCurrentFrame();
  const stamp = spring({frame: f - 3, fps: 30, config: {damping: 10, mass: 0.85}});

  return (
    <PhysicalPaperCard w={720} rot={2}>
      <div style={{fontSize: 24, color: '#854d0e', marginBottom: 10}}>তাহলে হিসাব কী?</div>
      <div style={{fontSize: 42, color: '#15151b', marginBottom: 12}}>
        ধর্মব্যবসায়ী কে?
      </div>

      <div
        style={{
          display: 'inline-block',
          fontSize: 36,
          fontWeight: 900,
          color: '#991b1b',
          border: '5px solid #991b1b',
          padding: '14px 26px',
          borderRadius: 14,
          background: 'rgba(254, 226, 226, 0.95)',
          transform: `scale(${stamp}) rotate(-4deg)`,
          boxShadow: '0 10px 25px rgba(153, 27, 27, 0.2)',
          margin: '10px 0',
        }}
      >
        ধর্মকে পুঁজি ➔ নিজের লাভ
      </div>

      <div style={{fontSize: 26, color: '#15151b', marginTop: 12}}>
        এটাই তো সবচেয়ে সোজা হিসাব, তাই না?
      </div>
    </PhysicalPaperCard>
  );
};

// কার্ড ৭: ওয়াজ থেকে ধর্ম বাদ দিলে
const AlemTestCard: React.FC = () => (
  <PhysicalPaperCard w={710} rot={-2.5}>
    <div style={{fontSize: 22, color: '#854d0e', marginBottom: 10}}>ছোট পরীক্ষা · পর্ব ১</div>
    <div style={{fontSize: 36, color: '#15151b', lineHeight: 1.35}}>
      কোনো আলেমের ওয়াজ থেকে <br />
      <span style={{color: '#991b1b', textDecoration: 'line-through'}}>ধর্ম বাদ</span> দিয়ে দিলাম!
    </div>
    <div
      style={{
        marginTop: 16,
        padding: '14px 20px',
        background: '#fee2e2',
        border: `3px dashed ${LINE}`,
        borderRadius: 12,
        fontSize: 28,
        color: '#7f1d1d',
      }}
    >
      তখন আর কিছু থাকে? কিছু না!
    </div>
    <div style={{fontSize: 22, color: '#5a5f6e', marginTop: 12}}>
      কিন্তু তিনি তো এটাই করেন—এটাই তাঁর পেশা।
    </div>
  </PhysicalPaperCard>
);

// কার্ড ৮: আসাদ নূরের চ্যানেল থেকে ইসলাম বাদ দিলে
const AsadTestCard: React.FC = () => (
  <PhysicalPaperCard w={720} rot={2}>
    <div style={{fontSize: 22, color: '#854d0e', marginBottom: 10}}>ছোট পরীক্ষা · পর্ব ২</div>
    <div style={{fontSize: 34, color: '#15151b', lineHeight: 1.35}}>
      আসাদ নূরের চ্যানেল থেকে <br />
      <span style={{color: '#991b1b', textDecoration: 'line-through'}}>ইসলাম নিয়ে সব ভিডিও</span> সরিয়ে দিন!
    </div>
    <div
      style={{
        marginTop: 16,
        padding: '14px 20px',
        background: '#fee2e2',
        border: `3px dashed #be123c`,
        borderRadius: 12,
        fontSize: 30,
        fontWeight: 900,
        color: '#9f1239',
      }}
    >
      কী থাকে? প্রায় কিছুই না!
    </div>
  </PhysicalPaperCard>
);

// কার্ড ৯: আসাদ নূরের জনপ্রিয়তার মূল ভিত্তি
const AsadFoundationCard: React.FC = () => (
  <PhysicalPaperCard w={720} rot={-2}>
    <div style={{fontSize: 24, color: '#b45309', marginBottom: 12}}>বিশ্লেষণ</div>
    <div style={{fontSize: 32, lineHeight: 1.4, color: '#15151b'}}>
      তাঁর পরিচয়, ফলোয়ার, ভিউ আর আলোচনা—
    </div>
    <div
      style={{
        fontSize: 44,
        fontWeight: 900,
        color: '#991b1b',
        borderTop: `4px solid ${LINE}`,
        borderBottom: `4px solid ${LINE}`,
        padding: '14px 0',
        margin: '14px 0',
        background: 'rgba(254, 243, 199, 0.7)',
      }}
    >
      সবকিছুর পেছনে একটাই জিনিস: ইসলাম!
    </div>
    <div style={{fontSize: 24, color: '#5a5f6e'}}>
      অথচ এই ইসলামকে বিরোধিতা করেই তিনি পরিচিত!
    </div>
  </PhysicalPaperCard>
);

// কার্ড ১০: দুই পক্ষের তুলনা (আলেম বনাম আসাদ নূর)
const TwoSidesComparisonCard: React.FC = () => (
  <PhysicalPaperCard w={730} rot={2}>
    <div style={{fontSize: 22, color: '#854d0e', marginBottom: 12}}>মুদ্রার এপিঠ-ওপিঠ</div>
    <div style={{display: 'flex', justifyContent: 'space-between', gap: 14, textAlign: 'left'}}>
      <div
        style={{
          flex: 1,
          padding: '16px 12px',
          background: '#ecfdf5',
          border: `3px solid ${LINE}`,
          borderRadius: 12,
        }}
      >
        <div style={{fontSize: 20, color: '#047857', fontWeight: 800}}>একজন: আলেম</div>
        <div style={{fontSize: 24, color: '#15151b', marginTop: 4}}>ধর্ম বলে সম্মান কুড়ান</div>
      </div>
      <div
        style={{
          flex: 1,
          padding: '16px 12px',
          background: '#fff1f2',
          border: `3px solid ${LINE}`,
          borderRadius: 12,
        }}
      >
        <div style={{fontSize: 20, color: '#be123c', fontWeight: 800}}>অন্যজন: আসাদ নূর</div>
        <div style={{fontSize: 24, color: '#15151b', marginTop: 4}}>ধর্ম আক্রমণ করে মনোযোগ কুড়ান</div>
      </div>
    </div>
    <div
      style={{
        marginTop: 16,
        padding: '12px 0',
        borderTop: `3px solid ${LINE}`,
        fontSize: 30,
        fontWeight: 900,
        color: '#991b1b',
      }}
    >
      কিন্তু দুজনের পুঁজি একই—ধর্ম!
    </div>
  </PhysicalPaperCard>
);

// কার্ড ১১: আসল প্রশ্ন
const TheHardQuestionCard: React.FC = () => (
  <PhysicalPaperCard w={720} rot={-2.5}>
    <div style={{fontSize: 22, color: '#854d0e', letterSpacing: 1.5, marginBottom: 10}}>
      একটি কঠিন সত্য প্রশ্ন
    </div>
    <div
      style={{
        fontSize: 38,
        lineHeight: 1.4,
        color: '#15151b',
        borderTop: `4px solid ${LINE}`,
        borderBottom: `4px solid ${LINE}`,
        padding: '18px 12px',
        margin: '12px 0',
        background: 'rgba(254, 226, 226, 0.6)',
      }}
    >
      “আপনার নিজের জনপ্রিয়তা কি ধর্ম ছাড়া দাঁড়ায়?”
    </div>
    <div style={{fontSize: 24, color: '#5a5f6e'}}>
      আপনি যদি সত্যিই ধর্মব্যবসার বিরুদ্ধে হন...
    </div>
  </PhysicalPaperCard>
);

// কার্ড ১২: চূড়ান্ত সত্য (The Master Truth)
const MasterTruthCard: React.FC = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 2, fps: 30, config: {damping: 11, stiffness: 140}});

  return (
    <PhysicalPaperCard w={730} rot={2}>
      <div style={{fontSize: 22, color: '#854d0e', marginBottom: 10}}>
        অ্যাটেনশন ইকোনমির নির্মম বাস্তবতা
      </div>

      <div
        style={{
          fontSize: 42,
          lineHeight: 1.35,
          color: '#15151b',
          transform: `scale(${pop})`,
          padding: '14px 10px',
        }}
      >
        যে ধর্মকে পুঁজি করে— <br />
        <span style={{color: '#991b1b', fontWeight: 900, fontSize: 50}}>সে-ই ধর্মব্যবসায়ী!</span>
      </div>

      <div
        style={{
          borderTop: `4px solid ${LINE}`,
          marginTop: 14,
          paddingTop: 12,
          fontSize: 30,
          fontWeight: 900,
          color: '#b45309',
        }}
      >
        সে মাথায় টুপি পরুক, আর না-ই পরুক!
      </div>
    </PhysicalPaperCard>
  );
};

// কার্ড ১৩: কমেন্ট কল
const CommentDebateCard: React.FC = () => (
  <PhysicalPaperCard w={710} rot={-2}>
    <div style={{fontSize: 24, color: '#854d0e', marginBottom: 10}}>আপনার মতামত কী?</div>
    <div style={{fontSize: 42, lineHeight: 1.35, color: '#15151b', marginBottom: 16}}>
      আপনি কি এই সংজ্ঞার সাথে একমত?
    </div>
    <div
      style={{
        display: 'inline-block',
        padding: '14px 38px',
        background: '#15151b',
        color: '#f6f2e8',
        borderRadius: 12,
        fontSize: 28,
        fontWeight: 900,
        border: '3px solid #b45309',
      }}
    >
      কমেন্টে যুক্তি দিয়ে জানান ✍️
    </div>
  </PhysicalPaperCard>
);

// কার্ড ১৪: BBA ফলো
const FollowBbaCard: React.FC = () => (
  <PhysicalPaperCard w={710} rot={2}>
    <div style={{fontSize: 24, color: '#854d0e', marginBottom: 8}}>Be Beyond Average</div>
    <div style={{fontSize: 42, color: '#15151b', marginBottom: 18}}>
      চিন্তার গভীরতা ও বাস্তব সত্য
    </div>
    <div
      style={{
        display: 'inline-block',
        padding: '16px 48px',
        borderRadius: 14,
        background: '#15151b',
        color: '#f6f2e8',
        fontSize: 32,
        fontWeight: 900,
        border: '4px solid #b45309',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      }}
    >
      Follow BBA
    </div>
  </PhysicalPaperCard>
);

// =============================================================
// দৃশ্যসমূহ (SCENES: All 32 Segments)
// =============================================================
export const SCENES: Record<string, React.FC<SP>> = {
  // ১. ধর্মব্যবসায়ী আসলে কে? (হুক ধাক্কা)
  h1: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    over: () => (
      <CenterCard top={430}>
        <div style={{textAlign: 'center'}}>
          <Label text="ধর্মব্যবসায়ী আসলে কে?" color={GOLD} size={84} top={430} at={1} />
        </div>
      </CenterCard>
    ),
  }),

  // ২. যে ধর্ম বলে? (ওয়াজ মাহফিল)
  h2: R({
    place: <ScenicAtmosphereBase photo="waz" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/waz-mahfil.jpg" dur={dur} zoom={[1, 1.07]} pos="50% 35%" />
    ),
    title: 'যে ধর্ম বলে? (বক্তা)',
    color: GOLD,
    size: 70,
  }),

  // ৩. নাকি যে ধর্ম ছাড়া কিছুই বলতে পারে না? (আসাদ নূর)
  h3: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/asad-noor.jpg" dur={dur} zoom={[1, 1.08]} pos="50% 25%" />
    ),
    title: 'নাকি যে ধর্ম ছাড়া পারে না?',
    color: RED,
    size: 68,
  }),

  // ৪. ধর্মব্যবসায়ী—শব্দটা আমরা সবাই শুনেছি
  intro_word: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    over: () => (
      <CenterCard top={420}>
        <WordDefinitionCard />
      </CenterCard>
    ),
  }),

  // ৫. আসাদ নূর প্রায় প্রতিটা ভিডিওতেই এই কথাটা বলেন
  asad_claim: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    over: () => (
      <CenterCard top={400}>
        <AsadClaimCard />
      </CenterCard>
    ),
  }),

  // ৬. আজ আমি একটা প্রশ্ন করতে চাই
  question_you: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    over: () => (
      <CenterCard top={420}>
        <QuestionDecisionCard />
      </CenterCard>
    ),
  }),

  // ৭. আগে একটা সহজ হিসাব করি
  simple_calc: R({
    place: <ScenicAtmosphereBase photo="bazaar" />,
    over: () => (
      <CenterCard top={420}>
        <BusinessDefinitionCard />
      </CenterCard>
    ),
  }),

  // ৮. ব্যবসায়ী কাকে বলে?
  what_is_business: R({
    place: <ScenicAtmosphereBase photo="bazaar" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/traditional-bazaar.jpg" dur={dur} zoom={[1, 1.06]} />
    ),
    title: 'ব্যবসায়ী কাকে বলে?',
    color: GOLD,
    size: 76,
  }),

  // ৯. যে একটা জিনিসকে পুঁজি করে লাভ তোলে
  capital_profit: R({
    place: <ScenicAtmosphereBase photo="bazaar" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/traditional-bazaar.jpg" dur={dur} zoom={[1.06, 1.12]} />
    ),
    over: () => (
      <CenterCard top={420}>
        <BusinessDefinitionCard />
      </CenterCard>
    ),
  }),

  // ১০. মাছ বেচলে মাছের ব্যবসায়ী, কাপড় বেচলে কাপড়ের ব্যবসায়ী
  fish_cloth: R({
    place: <ScenicAtmosphereBase photo="bazaar" />,
    over: () => (
      <CenterCard top={410}>
        <MarketComparisonCard />
      </CenterCard>
    ),
  }),

  // ১১. তাহলে ধর্মব্যবসায়ী কে?
  then_who: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    over: () => (
      <CenterCard top={430}>
        <Label text="তাহলে ধর্মব্যবসায়ী কে?" color={RED} size={80} top={430} at={1} />
      </CenterCard>
    ),
  }),

  // ১২. যে ধর্মকে পুঁজি করে নিজের লাভ তোলে
  religious_capital: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    over: () => (
      <CenterCard top={410}>
        <ReligiousBusinessFormulaCard />
      </CenterCard>
    ),
  }),

  // ১৩. এটাই তো সোজা হিসাব, তাই না?
  straight_math: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/creator-studio.jpg" dur={dur} zoom={[1, 1.06]} />
    ),
    title: 'এটাই তো সোজা হিসাব!',
    color: GOLD,
    size: 76,
  }),

  // ১৪. এবার একটা ছোট পরীক্ষা করি
  test_intro: R({
    place: <ScenicAtmosphereBase photo="waz" />,
    over: () => (
      <CenterCard top={430}>
        <Label text="এবার একটা ছোট পরীক্ষা করি" color={GOLD} size={74} top={430} at={1} />
      </CenterCard>
    ),
  }),

  // ১৫. ধরুন কোনো আলেমের ওয়াজ থেকে ধর্ম বাদ দিয়ে দিলাম
  alem_test: R({
    place: <ScenicAtmosphereBase photo="waz" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/waz-mahfil.jpg" dur={dur} zoom={[1.05, 1.12]} pos="50% 30%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <AlemTestCard />
      </CenterCard>
    ),
  }),

  // ১৬. তখন আর কিছু থাকে? কিছু না
  alem_empty: R({
    place: <ScenicAtmosphereBase photo="waz" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/waz-mahfil.jpg" dur={dur} zoom={[1.12, 1.17]} pos="50% 30%" />
    ),
    title: 'বাকি থাকে: শূন্য!',
    color: RED,
    size: 80,
  }),

  // ১৭. কিন্তু তিনি তো এটাই করেন, এটাই তার পেশা
  alem_profession: R({
    place: <ScenicAtmosphereBase photo="waz" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/waz-mahfil.jpg" dur={dur} zoom={[1, 1.06]} pos="50% 40%" />
    ),
    title: 'কারণ এটাই তাঁর পেশা',
    color: GOLD,
    size: 72,
  }),

  // ১৮. এখন আসাদ নূরের চ্যানেল থেকে ইসলাম নিয়ে সব ভিডিও সরিয়ে দিন
  asad_test: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/asad-noor.jpg" dur={dur} zoom={[1, 1.06]} pos="50% 25%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <AsadTestCard />
      </CenterCard>
    ),
  }),

  // ১৯. কী থাকে? প্রায় কিছুই না
  asad_empty: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/asad-noor.jpg" dur={dur} zoom={[1.06, 1.12]} pos="50% 25%" />
    ),
    title: 'থাকে: প্রায় কিছুই না!',
    color: RED,
    size: 80,
  }),

  // ২০. তার পরিচয়, তার ফলোয়ার, তার ভিউ, তার আলোচনা—সবকিছুর পেছনে ইসলাম
  behind_popularity: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    over: () => (
      <CenterCard top={400}>
        <AsadFoundationCard />
      </CenterCard>
    ),
  }),

  // ২১. অথচ এই ইসলামকে বিরোধিতা করেই তিনি পরিচিত
  irony_oppose: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/asad-noor.jpg" dur={dur} zoom={[1.05, 1.11]} pos="50% 25%" />
    ),
    title: 'বিরোধিতাই আসল মূলধন!',
    color: RED,
    size: 72,
  }),

  // ২২. একজন বলছেন ভালো কথা, আরেকজন বলছেন মন্দ কথা
  two_sides: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    over: () => (
      <CenterCard top={400}>
        <TwoSidesComparisonCard />
      </CenterCard>
    ),
  }),

  // ২৩. কিন্তু দুজনের পুঁজি একই—ধর্ম
  same_capital: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    over: () => (
      <CenterCard top={430}>
        <Label text="দুজনের পুঁজি একই: ধর্ম!" color={RED} size={78} top={430} at={1} />
      </CenterCard>
    ),
  }),

  // ২৪. একজন সম্মান কুড়ান, আরেকজন আক্রমণ করে মনোযোগ কুড়ান
  respect_vs_attention: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    over: () => (
      <CenterCard top={400}>
        <TwoSidesComparisonCard />
      </CenterCard>
    ),
  }),

  // ২৫. দুটোই তো ধর্মকে ঘিরেই চলছে
  both_around_religion: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/dhaka-dusk-skyline.jpg" dur={dur} zoom={[1, 1.07]} />
    ),
    title: 'দুটোই ধর্মকে ঘিরে!',
    color: GOLD,
    size: 78,
  }),

  // ২৬. আপনি যদি সত্যিই ধর্মব্যবসার বিরুদ্ধে হন
  real_question: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/creator-studio.jpg" dur={dur} zoom={[1, 1.06]} />
    ),
    title: 'সত্যিকারের প্রশ্ন একটাই...',
    color: GOLD,
    size: 72,
  }),

  // ২৭. আপনার নিজের জনপ্রিয়তা কি ধর্ম ছাড়া দাঁড়ায়?
  fame_without_religion: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/asad-noor.jpg" dur={dur} zoom={[1.05, 1.12]} pos="50% 25%" />
    ),
    over: () => (
      <CenterCard top={410}>
        <TheHardQuestionCard />
      </CenterCard>
    ),
  }),

  // ২৮. আমি কারো নিয়ত জানি না, জানার দাবিও করি না
  niyat_disclaimer: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/dhaka-dusk-skyline.jpg" dur={dur} zoom={[1.05, 1.1]} />
    ),
    title: 'কারো অন্তরের নিয়ত অজ্ঞাত',
    color: GOLD,
    size: 68,
  }),

  // ২৯. কিন্তু অ্যাটেনশনের এই যুগে একটা কথা পরিষ্কার
  attention_era: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    back: (_f, dur) => (
      <FullScenicPhoto src="dhormo/creator-studio.jpg" dur={dur} zoom={[1.06, 1.12]} />
    ),
    title: 'অ্যাটেনশনের যুগে সত্য...',
    color: GOLD,
    size: 72,
  }),

  // ৩০. যে ধর্মকে পুঁজি করে, সে-ই ধর্মব্যবসায়ী
  core_truth: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    over: () => (
      <CenterCard top={400}>
        <MasterTruthCard />
      </CenterCard>
    ),
  }),

  // ৩১. আপনার কি মনে হয়? কমেন্টে জানান
  comment_cta: R({
    place: <ScenicAtmosphereBase photo="studio" />,
    over: () => (
      <CenterCard top={420}>
        <CommentDebateCard />
      </CenterCard>
    ),
  }),

  // ৩২. ফলো করুন BBA
  cta: R({
    place: <ScenicAtmosphereBase photo="skyline" />,
    over: () => (
      <CenterCard top={420}>
        <FollowBbaCard />
      </CenterCard>
    ),
  }),
};

// থাম্বনেইল
export const DhormoThumbnail: React.FC = () => {
  return (
    <PsyThumb
      l1="ধর্মব্যবসায়ী আসলে কে?"
      l2="আসাদ নূর ও ধর্মব্যবসা!"
      bottom="দুজনের পুঁজিই কি ধর্ম?"
      term="Philosophy & Reality · BBA"
      art={
        <div style={{width: '100%', height: '100%', background: '#1e293b', position: 'relative', overflow: 'hidden'}}>
          <Img
            src={staticFile('dhormo/asad-noor.jpg')}
            style={{
              position: 'absolute',
              top: '5%',
              left: '5%',
              width: '90%',
              height: '90%',
              objectFit: 'cover',
              objectPosition: '50% 20%',
              borderRadius: 24,
            }}
          />
        </div>
      }
      size={80}
    />
  );
};

export const dhormo = story('dhormo/', raw, SCENES, DhormoThumbnail, {logo: 'bba2'});
export const DhormoByabsayi = dhormo;
