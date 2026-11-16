// বাকের ভাইয়ের ফাঁসি ও মনস্তাত্ত্বিক সত্য — BakerBhai
// Matches the exact high-retention aesthetic of BBA reels:
// Warm depth-of-field interior backgrounds, physical tilted paper cards, realistic drop shadows, and floating subtitles.
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, RED, clampOpts} from '../biz/art';
import {Bokeh, Soft} from '../common/elegant';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Bounce, R, story} from '../common/reel';
import raw from './segments.json';

const LINE = '#1b1b1f';

// -------------------------------------------------------------
// ১. উষ্ণ ও সিনেম্যাটিক ডেপথ-অফ-ফিল্ড ব্যাকগ্রাউন্ড (Soft Bokeh Base)
// -------------------------------------------------------------
const WarmInteriorBase: React.FC<{photo?: 'desk' | 'room' | 'tea'}> = ({photo = 'desk'}) => {
  const file =
    photo === 'room'
      ? 'baker/tv-living-room.jpg'
      : photo === 'tea'
      ? 'baker/tea-stall.jpg'
      : 'baker/writer-desk.jpg';

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
// ২. ফুল স্ক্রিন সিনেম্যাটিক ফটো (নো ডার্ক বার! একদম ন্যাচারাল ভাসমান সাবটাইটেল)
// -------------------------------------------------------------
const FullPhotoScene: React.FC<{
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
      {/* সফট ফিল্ম ভিনিয়েট — ছবির সৌন্দর্য বজায় রেখে সাবটাইটেল পরিষ্কার দেখায় */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 45%, rgba(10,12,18,0.7) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// -------------------------------------------------------------
// ৩. ফিজিক্যাল টিল্টেড পেপার কার্ড (কার্ড স্টাইলিং একদম রেফারেন্স ভিডিওর মতো)
// -------------------------------------------------------------
const PhysicalPaperCard: React.FC<{
  w?: number;
  rot?: number;
  children: React.ReactNode;
}> = ({w = 700, rot = -2.5, children}) => {
  return (
    <div
      style={{
        width: w,
        padding: '42px 38px',
        background: '#f6f2e8', // ওয়্যার্ম আইভরি পেপার
        border: `8px solid ${LINE}`, // মোটা সলিড রিয়েল বর্ডার
        borderRadius: 16,
        boxShadow: '0 26px 60px rgba(0,0,0,0.55)', // গভীর বাস্তব ড্রপ শ্যাডো
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

// পেপারের ভেতরের ডেকোরেটিভ টেক্সট লাইন (দলিলের মতো)
const DocumentLines: React.FC<{lines?: number[]}> = ({lines = [0.85, 0.7, 0.8, 0.55]}) => (
  <div style={{margin: '18px 0'}}>
    {lines.map((k, i) => (
      <div
        key={i}
        style={{
          height: 10,
          width: `${k * 100}%`,
          background: '#c9c4b8',
          borderRadius: 5,
          margin: '14px auto',
        }}
      />
    ))}
  </div>
);

// -------------------------------------------------------------
// কার্ড ১: প্রধানমন্ত্রীর জরুরি ফোনকল ডিসপ্যাচ (Scenes 1 & 16)
// -------------------------------------------------------------
const PmPhoneCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={710} rot={-2.5}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginBottom: 16}}>
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `5px solid ${LINE}`,
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          }}
        >
          <Img
            src={staticFile('baker/khaleda-zia.jpg')}
            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%'}}
          />
        </div>
        <div style={{textAlign: 'left'}}>
          <div style={{fontSize: 24, color: '#7a2222', letterSpacing: 1}}>জরুরি বার্তা · ১৯৯৩</div>
          <div style={{fontSize: 34, color: '#15151b'}}>বেগম খালেদা জিয়া</div>
          <div style={{fontSize: 22, color: '#5a5f6e'}}>তৎকালীন প্রধানমন্ত্রী</div>
        </div>
      </div>

      <div
        style={{
          fontSize: 40,
          lineHeight: 1.35,
          color: '#991b1b',
          borderTop: `4px solid ${LINE}`,
          borderBottom: `4px solid ${LINE}`,
          padding: '18px 12px',
          margin: '14px 0',
          background: 'rgba(254, 226, 226, 0.5)',
          borderRadius: 8,
        }}
      >
        “ফাঁ*সিটা কি কোনোভাবে আটকে দেওয়া যায় না?”
      </div>

      <DocumentLines lines={[0.85, 0.65]} />
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// কার্ড ২: অনুরোধ প্রত্যাখ্যান রবার স্ট্যাম্প (Scene 2)
// -------------------------------------------------------------
const RejectionCard: React.FC = () => {
  const f = useCurrentFrame();
  const stamp = spring({frame: f - 4, fps: 30, config: {damping: 10, mass: 0.85}});

  return (
    <PhysicalPaperCard w={710} rot={2}>
      <div style={{fontSize: 32, color: '#15151b', marginBottom: 8}}>হুমায়ূন আহমেদ ও বিটিভি</div>
      <div style={{fontSize: 22, color: '#5a5f6e', marginBottom: 14}}>সরকারি বাসভবনে চূড়ান্ত সিদ্ধান্ত</div>

      <DocumentLines lines={[0.9, 0.75, 0.85]} />

      <div
        style={{
          display: 'inline-block',
          fontSize: 48,
          fontWeight: 900,
          color: '#be123c',
          border: '6px solid #be123c',
          padding: '14px 38px',
          borderRadius: 14,
          letterSpacing: 2,
          transform: `scale(${stamp}) rotate(-7deg)`,
          background: 'rgba(255, 241, 242, 0.95)',
          boxShadow: '0 12px 30px rgba(190, 18, 60, 0.25)',
          margin: '14px 0',
        }}
      >
        অনুরোধ নাকচ!
      </div>

      <div style={{fontSize: 26, color: '#15151b', marginTop: 12}}>
        প্রধানমন্ত্রীর ব্যক্তিগত অনুরোধও ফিরিয়ে দেওয়া হয়েছিল
      </div>
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// কার্ড ৩: ঐতিহাসিক বিস্ময় (Scene 3)
// -------------------------------------------------------------
const MysteryCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={700} rot={-2}>
      <div style={{fontSize: 26, color: '#854d0e', letterSpacing: 1.5, marginBottom: 12}}>
        ঐতিহাসিক বিস্ময়
      </div>
      <div style={{fontSize: 46, lineHeight: 1.35, color: '#15151b'}}>
        সবচেয়ে অবিশ্বাস্য ব্যাপার কী জানেন?
      </div>

      <DocumentLines lines={[0.85, 0.65, 0.75]} />

      <div style={{fontSize: 28, color: '#7a2222', lineHeight: 1.4}}>
        লাখো মানুষ রাস্তায় নেমেছিল এমন একজনের জন্য—বাস্তবে যার কোনো অস্তিত্বই ছিল না!
      </div>
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// কার্ড ৪: বাকের ভাই পরিচয় দলিল (Scene 5)
// -------------------------------------------------------------
const BakerProfileCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={710} rot={2.5}>
      <div
        style={{
          width: 170,
          height: 170,
          borderRadius: 14,
          overflow: 'hidden',
          border: `5px solid ${LINE}`,
          margin: '0 auto 16px auto',
          boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
        }}
      >
        <Img
          src={staticFile('baker/baker-portrait.png')}
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%'}}
        />
      </div>

      <div style={{fontSize: 52, color: '#15151b', lineHeight: 1.2}}>বাকের ভাই</div>
      <div style={{fontSize: 28, color: '#b45309', marginTop: 6}}>হুমায়ূন আহমেদের অমর সৃষ্টি</div>

      <div
        style={{
          borderTop: `4px solid ${LINE}`,
          marginTop: 18,
          paddingTop: 14,
          fontSize: 24,
          color: '#5a5f6e',
        }}
      >
        নাটক: কোথাও কেউ নেই · অভিনয়ে: আসাদুজ্জামান নূর
      </div>
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// কার্ড ৫: সংবাদপত্রের ক্লিপিং: আলী বক্স হত্যা মামলা (Scene 12)
// -------------------------------------------------------------
const NewspaperCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={720} rot={-2}>
      <div
        style={{
          borderBottom: '3px solid #15151b',
          paddingBottom: 10,
          marginBottom: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{fontSize: 20, color: '#5a5f6e', letterSpacing: 1}}>
          দৈনিক সংবাদ · বিশেষ প্রতিবেদন (১৯৯৩)
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#be123c',
            border: '2px solid #be123c',
            padding: '2px 8px',
            borderRadius: 4,
          }}
        >
          সাজানো বিচার
        </div>
      </div>

      <div style={{fontSize: 44, lineHeight: 1.3, color: '#15151b'}}>
        আলী বক্স হ*ত্যা মামলা: বাকের ভাইয়ের ফাঁ*সির আদেশ!
      </div>

      <DocumentLines lines={[0.95, 0.8, 0.9, 0.7]} />

      <div style={{fontSize: 24, color: '#7a2222', marginTop: 8}}>
        মিথ্যা সাক্ষ্য ও রাজনৈতিক ষড়যন্ত্রের বলি পাড়ার প্রিয় বাকের ভাই
      </div>
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// কার্ড ৬: ঐতিহাসিক দেওয়াল স্লোগান (Scene 14)
// -------------------------------------------------------------
const WallSloganCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={710} rot={3}>
      <div style={{fontSize: 24, color: '#be123c', letterSpacing: 1.5, marginBottom: 10}}>
        ঐতিহাসিক দেওয়াল লিখন · ১৯৯৩
      </div>

      <div
        style={{
          fontSize: 44,
          lineHeight: 1.35,
          color: '#991b1b',
          background: 'rgba(254, 226, 226, 0.6)',
          border: '4px dashed #be123c',
          borderRadius: 12,
          padding: '20px 14px',
          margin: '12px 0',
        }}
      >
        “বাকের ভাইয়ের ফাঁ*সি হলে, জ্বলবে আগুন ঘরে ঘরে!”
      </div>

      <div style={{fontSize: 24, color: '#15151b', marginTop: 10}}>
        ঢাকা বিশ্ববিদ্যালয়ের দেওয়াল থেকে পাড়া-মহল্লায় গণআন্দোলন
      </div>
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// কার্ড ৭: হুমায়ূন আহমেদের হস্তলিখিত বিবৃতি (Scene 18)
// -------------------------------------------------------------
const AuthorParchmentCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={710} rot={-2.5}>
      <div style={{fontSize: 24, color: '#854d0e', marginBottom: 12}}>লেখকের অনড় অবস্থান</div>

      <div
        style={{
          fontSize: 38,
          lineHeight: 1.45,
          color: '#15151b',
          fontStyle: 'italic',
          padding: '16px 10px',
        }}
      >
        “গল্পের সত্যের সাথে আপস করা একজন লেখকের পক্ষে সম্ভব নয়।”
      </div>

      <DocumentLines lines={[0.8, 0.6]} />

      <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 14, paddingRight: 20}}>
        <div style={{textAlign: 'center', width: '50%'}}>
          <div style={{fontSize: 34, color: '#1e3a8a', fontStyle: 'italic'}}>হুমায়ূন আহমেদ</div>
          <div style={{borderTop: `4px solid ${LINE}`, paddingTop: 6, fontSize: 20, color: '#5a5f6e'}}>
            লেখক ও নাট্যকার
          </div>
        </div>
      </div>
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// কার্ড ৮: ফাঁসির মঞ্চে শেষ সংলাপ (Scene 21)
// -------------------------------------------------------------
const GallowsDialogueCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={690} rot={2}>
      <div style={{fontSize: 24, color: '#5a5f6e', marginBottom: 10}}>ফাঁ*সির মঞ্চে শেষ সংলাপ</div>

      <div
        style={{
          fontSize: 50,
          lineHeight: 1.3,
          color: '#15151b',
          padding: '16px 0',
          borderTop: `3px solid ${LINE}`,
          borderBottom: `3px solid ${LINE}`,
        }}
      >
        “হাওয়া বুঝি খুব ঠান্ডা?”
      </div>

      <div style={{fontSize: 24, color: '#7a2222', marginTop: 14}}>— বাকের ভাই · কোথাও কেউ নেই</div>
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// কার্ড ৯: মনস্তাত্ত্বিক সত্য সূচক কার্ড (Scenes 24, 25, 26 — Scene 26 Fixed!)
// -------------------------------------------------------------
const PsychologyIndexCard: React.FC<{
  badge: string;
  title: string;
  desc: string;
  rot?: number;
}> = ({badge, title, desc, rot = -2.5}) => {
  return (
    <PhysicalPaperCard w={720} rot={rot}>
      <div
        style={{
          display: 'inline-block',
          fontSize: 22,
          color: '#b45309',
          border: '2px solid #b45309',
          padding: '4px 18px',
          borderRadius: 20,
          background: 'rgba(254, 243, 199, 0.7)',
          marginBottom: 14,
        }}
      >
        {badge}
      </div>

      <div style={{fontSize: 44, lineHeight: 1.3, color: '#15151b', marginBottom: 12}}>
        {title}
      </div>

      <DocumentLines lines={[0.85, 0.7, 0.8]} />

      <div
        style={{
          fontSize: 28,
          lineHeight: 1.45,
          color: '#15151b',
          borderTop: `3px solid ${LINE}`,
          paddingTop: 16,
          marginTop: 10,
        }}
      >
        {desc}
      </div>
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// কার্ড ১০: জীবনের শিক্ষা (Scene 27)
// -------------------------------------------------------------
const CoreLessonCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={710} rot={2}>
      <div style={{fontSize: 24, color: '#854d0e', marginBottom: 10}}>জীবনের শিক্ষা</div>

      <div style={{fontSize: 38, lineHeight: 1.4, color: '#15151b'}}>
        মানুষের মনে জায়গা পেতে কোনো মুখোশ লাগে না; বিপদের দিনে পাশে দাঁড়ানোর সাহসই মানুষকে অমর করে রাখে।
      </div>

      <DocumentLines lines={[0.85, 0.65]} />
    </PhysicalPaperCard>
  );
};

// -------------------------------------------------------------
// কার্ড ১১: BBA ফলো কার্ড (Scene 31)
// -------------------------------------------------------------
const FollowBbaCard: React.FC = () => {
  return (
    <PhysicalPaperCard w={710} rot={-2}>
      <div style={{fontSize: 26, color: '#854d0e', marginBottom: 10}}>Be Beyond Average</div>
      <div style={{fontSize: 44, lineHeight: 1.3, color: '#15151b', marginBottom: 18}}>
        বাস্তব ইতিহাস ও আসল সত্য জানুন
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
          boxShadow: '0 10px 24px rgba(0,0,0,0.3)',
          letterSpacing: 1,
        }}
      >
        Follow BBA
      </div>
    </PhysicalPaperCard>
  );
};

// কার্ড সেন্টারিং হেল্পার
const CenterCard: React.FC<{children: React.ReactNode; top?: number}> = ({
  children,
  top = 420,
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
      <Bounce x={0} y={0} at={1} seed="baker-card">
        {children}
      </Bounce>
    </div>
  );
};

// =============================================================
// দৃশ্যসমূহ (SCENES: All 31 Segments)
// =============================================================
export const SCENES: Record<string, React.FC<SP>> = {
  // ১. প্রধানমন্ত্রীর ফোনকল
  pm_phone_call: R({
    place: <WarmInteriorBase photo="desk" />,
    over: () => (
      <CenterCard top={380}>
        <PmPhoneCard />
      </CenterCard>
    ),
  }),

  // ২. অনুরোধ প্রত্যাখ্যান
  request_rejected: R({
    place: <WarmInteriorBase photo="desk" />,
    over: () => (
      <CenterCard top={380}>
        <RejectionCard />
      </CenterCard>
    ),
  }),

  // ৩. সবচেয়ে অবিশ্বাস্য সত্য
  unbelievable_fact: R({
    place: <WarmInteriorBase photo="room" />,
    over: () => (
      <CenterCard top={440}>
        <MysteryCard />
      </CenterCard>
    ),
  }),

  // ৪. লাখ লাখ মানুষ রাজপথে
  millions_on_street: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/street-protest.jpg" dur={dur} zoom={[1, 1.08]} />
    ),
  }),

  // ৫. বাকের ভাই রিভিল
  baker_reveal: R({
    place: <WarmInteriorBase photo="room" />,
    over: () => (
      <CenterCard top={380}>
        <BakerProfileCard />
      </CenterCard>
    ),
  }),

  // ৬. বিটিভির ধারাবাহিক নাটক
  btv_serial_intro: R({
    place: <WarmInteriorBase photo="tea" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/tea-stall.jpg" dur={dur} zoom={[1, 1.07]} />
    ),
  }),

  // ৭. চায়ের দোকানের মাস্তান
  tea_stall_mastaan: R({
    place: <WarmInteriorBase photo="tea" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/tea-stall.jpg" dur={dur} zoom={[1.07, 1.14]} />
    ),
  }),

  // ৮. প্রধানমন্ত্রী থেকে রিকশাচালক
  why_pm_to_rickshaw: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/street-protest.jpg" dur={dur} zoom={[1, 1.06]} />
    ),
  }),

  // ৯. কেন আস্ত দেশ পাগল হয়েছিল
  why_all_united: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/street-protest.jpg" dur={dur} zoom={[1.06, 1.13]} />
    ),
  }),

  // ১০. চারপাশের স্বার্থপর ভদ্রলোকের ভিড়ে
  rare_character: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/baker-art.jpg" dur={dur} zoom={[1, 1.07]} pos="50% 25%" />
    ),
  }),

  // ১১. ভরসার প্রতীক
  symbol_of_trust: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/baker-art.jpg" dur={dur} zoom={[1.07, 1.14]} pos="50% 25%" />
    ),
  }),

  // ১২. মিথ্যা খুনের মামলায় ফাঁসির আদেশ
  framed_for_murder: R({
    place: <WarmInteriorBase photo="desk" />,
    over: () => (
      <CenterCard top={400}>
        <NewspaperCard />
      </CenterCard>
    ),
  }),

  // ১৩. তীব্র ক্ষোভ ও আন্দোলন
  national_rage: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/street-protest.jpg" dur={dur} zoom={[1.05, 1.12]} />
    ),
  }),

  // ১৪. দেওয়ালে দেওয়ালে স্লোগান
  wall_posters_slogan: R({
    place: <WarmInteriorBase photo="room" />,
    over: () => (
      <CenterCard top={420}>
        <WallSloganCard />
      </CenterCard>
    ),
  }),

  // ১৫. বিটিভি ও হুমায়ূন আহমেদের বাড়িতে পাহারা
  btv_humayun_threats: R({
    place: <WarmInteriorBase photo="desk" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/writer-desk.jpg" dur={dur} zoom={[1, 1.07]} />
    ),
  }),

  // ১৬. খোদ প্রধানমন্ত্রী খালেদা জিয়ার ফোন
  pm_urgent_call: R({
    place: <WarmInteriorBase photo="desk" />,
    over: () => (
      <CenterCard top={380}>
        <PmPhoneCard />
      </CenterCard>
    ),
  }),

  // ১৭. ফাঁসিটা আটকে দেওয়া যায় কি না
  save_baker_request: R({
    place: <WarmInteriorBase photo="desk" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/khaleda-zia.jpg" dur={dur} zoom={[1, 1.06]} pos="50% 20%" />
    ),
  }),

  // ১৮. হুমায়ূন আহমেদ ফিরিয়ে দিলেন
  refusal_spine: R({
    place: <WarmInteriorBase photo="desk" />,
    over: () => (
      <CenterCard top={400}>
        <AuthorParchmentCard />
      </CenterCard>
    ),
  }),

  // ১৯. গল্পের সত্যের সাথে আপস নয়
  author_words_truth: R({
    place: <WarmInteriorBase photo="desk" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/writer-desk.jpg" dur={dur} zoom={[1.04, 1.1]} />
    ),
  }),

  // ২০ বাস্তবেও নিরীহ মানুষ ক্ষমতার খেলায় বলি হয়
  author_words_society: R({
    place: <WarmInteriorBase photo="desk" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/writer-desk.jpg" dur={dur} zoom={[1.1, 1.16]} />
    ),
  }),

  // ২১. হাওয়া বুঝি খুব ঠান্ডা? (ফাঁসির মঞ্চ)
  gallows_last_dialogue: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/baker-jail-muna.jpg" dur={dur} zoom={[1, 1.07]} pos="50% 30%" />
    ),
    over: () => (
      <CenterCard top={440}>
        <GallowsDialogueCard />
      </CenterCard>
    ),
  }),

  // ২২. টিভির সামনে বসে কান্নায় ভেঙে পড়লো
  nation_wept: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/tv-living-room.jpg" dur={dur} zoom={[1, 1.07]} />
    ),
  }),

  // ২৩. গভীর শোকের ছায়া
  deep_national_grief: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/tv-living-room.jpg" dur={dur} zoom={[1.07, 1.14]} />
    ),
  }),

  // ২৪. প্যারাসোশ্যাল রিলেশনশিপ
  parasocial_concept: R({
    place: <WarmInteriorBase photo="desk" />,
    over: () => (
      <CenterCard top={420}>
        <PsychologyIndexCard
          badge="মনস্তাত্ত্বিক ব্যাখ্যা"
          title="প্যারাসোশ্যাল রিলেশনশিপ"
          desc="একটি কাল্পনিক চরিত্রের সাথে আস্ত জাতির গভীর আত্মিক ও মানবিক টান!"
          rot={-2.5}
        />
      </CenterCard>
    ),
  }),

  // ২৫. কেন আউটল চরিত্রকে মানুষ ভালোবাসে
  why_love_outlaw: R({
    place: <WarmInteriorBase photo="desk" />,
    over: () => (
      <CenterCard top={420}>
        <PsychologyIndexCard
          badge="মনস্তাত্ত্বিক ব্যাখ্যা"
          title="দ্য মোরাল আউটল ইফেক্ট"
          desc="মানুষ সুবিধাবাদী নিখুঁত ভদ্রলোক নয়; বিপদের দিনে পাশে দাঁড়ানো সাহসী মানুষকে ভালোবাসে!"
          rot={2.5}
        />
      </CenterCard>
    ),
  }),

  // ২৬. আদালত ব্যর্থ হলে মানুষ কল্পনায় নায়ক খোঁজে (FIXED!)
  searching_for_hero: R({
    place: <WarmInteriorBase photo="desk" />,
    over: () => (
      <CenterCard top={420}>
        <PsychologyIndexCard
          badge="সামাজিক বাস্তবতা"
          title="কল্পনার রক্ষাকর্তা"
          desc="আদালত যখন ব্যর্থ হয়, সাধারণ মানুষ কল্পনার চরিত্রের ভেতরেই নিজের আসল নায়ককে খুঁজে নেয়!"
          rot={-2}
        />
      </CenterCard>
    ),
  }),

  // ২৭. অমর সাহসের শিক্ষা
  core_lesson_courage: R({
    place: <WarmInteriorBase photo="desk" />,
    over: () => (
      <CenterCard top={440}>
        <CoreLessonCard />
      </CenterCard>
    ),
  }),

  // ২৮. বিপদের দিনে পাশে দাঁড়ানোর খাঁটি সাহস
  immortal_courage: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/baker-portrait.png" dur={dur} zoom={[1.05, 1.12]} pos="50% 25%" />
    ),
  }),

  // ২৯. ইন্টারনেটের মনগড়া গল্প এড়িয়ে চলুন
  cta_intro: R({
    place: <WarmInteriorBase photo="desk" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/writer-desk.jpg" dur={dur} zoom={[1, 1.07]} />
    ),
  }),

  // ৩০. বাস্তব দুনিয়ার সত্য জানুন
  enrich_knowledge: R({
    place: <WarmInteriorBase photo="desk" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/writer-desk.jpg" dur={dur} zoom={[1.07, 1.14]} />
    ),
  }),

  // ৩১. ফলো করুন BBA
  cta_follow: R({
    place: <WarmInteriorBase photo="room" />,
    back: (_f, dur) => (
      <FullPhotoScene src="baker/baker-art.jpg" dur={dur} zoom={[1.05, 1.12]} pos="50% 25%" />
    ),
    over: () => (
      <CenterCard top={420}>
        <FollowBbaCard />
      </CenterCard>
    ),
  }),
};

// থাম্বনেইল
export const BakerThumbnail: React.FC = () => {
  return (
    <PsyThumb
      l1="প্রধানমন্ত্রীর অনুরোধ প্রত্যাখ্যান!"
      l2="বাকের ভাইয়ের ফাঁ*সির সত্য"
      bottom="কাল্পনিক চরিত্রের জন্য আস্ত রাষ্ট্র কাঁপলো!"
      term="The Baker Paradox · Cultural History"
      art={
        <div style={{width: '100%', height: '100%', background: '#1e293b', position: 'relative'}}>
          <Img
            src={staticFile('baker/baker-portrait.png')}
            style={{
              position: 'absolute',
              top: '5%',
              left: '10%',
              width: '80%',
              height: '80%',
              objectFit: 'contain',
            }}
          />
        </div>
      }
      size={82}
    />
  );
};

export const baker = story('baker/', raw, SCENES, BakerThumbnail, {logo: 'bba2'});
export const BakerBhai = baker;
