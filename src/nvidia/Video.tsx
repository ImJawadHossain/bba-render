// সিলিকন ভ্যালির হানি ট্র্যাপ ও NVIDIA-র গোপন ফর্মুলা — Jensen Huang। স্ক্রিপ্ট: D:\ClaudeVideo\scripts\Trending\10-nvidia-honey-trap.md
// নোট: ৩৫টি দ্রুত দৃশ্য (২.০৩–৬.৫১ সে/দৃশ্য; ৫+ সেকেন্ডের দৃশ্যে Two() দিয়ে অভ্যন্তরীণ বদল), Cartesia sonic-3.6 (Professor bn) + Scribe word-level timing.json
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {Backdrop, SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Bounce, Cta, R, Two, WOMAN, story} from '../common/reel';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const NV_GREEN = '#76b900';
const EMERALD = '#10b981';
const LINE = '#1b1b1f';
const DarkBase = <AbsoluteFill style={{background: '#080b10'}} />;
const BN = '০১২৩৪৫৬৭৮৯';
const bn = (n: number) => n.toLocaleString('en-IN').replace(/\d/g, (d) => BN[Number(d)]);

// চরিত্রের চেহারা (Jensen Huang ধাঁচের কালো লেদার জ্যাকেট ও রূপালি চুল; গুপ্তচর এজেন্ট ও চিপ ইঞ্জিনিয়ার)
const JENSEN: ToonLook = {
  skin: '#e0b28e',
  hair: '#cbd5e1',
  hairStyle: 'short',
  top: '#18181b',
  jacket: '#111114',
  bottom: '#18181b',
  shoes: '#111114',
  glasses: true,
  glassesShape: 'rect',
  age: 0.45,
};

const FAN_WOMAN: ToonLook = {
  skin: '#e4b795',
  hair: '#1e1612',
  hairStyle: 'long',
  top: '#cbd5e1',
  bottom: '#1e293b',
  shoes: '#111827',
};

const SPY_WOMAN: ToonLook = {
  skin: '#e2b28e',
  hair: '#1a1210',
  hairStyle: 'bob',
  top: '#7f1d1d',
  jacket: '#1c1917',
  bottom: '#18181b',
  shoes: '#18181b',
};

const SPY_BRIDE: ToonLook = {
  skin: '#e2b28e',
  hair: '#1a1210',
  hairStyle: 'bun',
  top: '#f8fafc',
  skirt: '#f1f5f9',
  bottom: '#f1f5f9',
  shoes: '#f8fafc',
};

const ENGINEER: ToonLook = {
  skin: '#d9a47e',
  hair: '#291c14',
  hairStyle: 'short',
  top: '#2563eb',
  bottom: '#1e293b',
  shoes: '#0f172a',
  glasses: true,
  glassesShape: 'round',
};

// টেক কনফারেন্সের মঞ্চ (Taipei Computex স্টাইল)
const StageBg = (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #07120c 0%, #0d2115 48%, #07090e 100%)'}}>
    <div style={{position: 'absolute', left: 160, top: -40, width: 760, height: 1100, background: 'radial-gradient(ellipse at 50% 0%, rgba(118,185,0,0.22), transparent 72%)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 320, height: 26, background: '#16241a', borderTop: `4px solid ${NV_GREEN}`}} />
  </AbsoluteFill>
);

// সিলিকন ভ্যালির রাতের অফিস/ক্যাফে পটভূমি
const ValleyBg = (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #0b101d 0%, #162238 58%, #080b12 100%)'}}>
    <div style={{position: 'absolute', left: 70, top: 240, width: 280, height: 740, background: 'rgba(16,185,129,0.06)', border: '3px solid rgba(118,185,0,0.18)', borderRadius: 16}} />
    <div style={{position: 'absolute', right: 70, top: 280, width: 320, height: 700, background: 'rgba(225,29,72,0.06)', border: '3px solid rgba(227,191,122,0.16)', borderRadius: 16}} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 310, height: 22, background: '#111827', borderTop: `4px solid ${GOLD}`}} />
  </AbsoluteFill>
);

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
    <AbsoluteFill style={{background: '#080b10', overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{
          position: 'absolute',
          inset: 0,
          width: 1080,
          height: 1920,
          objectFit: 'cover',
          objectPosition: pos,
          transform: `scale(${z})`,
          transformOrigin: origin,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(8,11,16,0.58) 0%, rgba(8,11,16,0.06) 24%, rgba(8,11,16,0.06) 58%, rgba(8,11,16,0.94) 100%)',
        }}
      />
      {dim ? <AbsoluteFill style={{background: `rgba(5,8,12,${dim})`}} /> : null}
    </AbsoluteFill>
  );
};

// ওপরের ডান কোণে নিরাপদ ট্যাগ ব্যাজ (Camera জুম থেকে নিরাপদ top: 132)
const TopTag: React.FC<{label: string; color?: string}> = ({label, color = NV_GREEN}) => (
  <div
    style={{
      position: 'absolute',
      right: 48,
      top: 132,
      padding: '10px 26px',
      borderRadius: 99,
      background: 'rgba(8,12,18,0.88)',
      border: `3px solid ${color}`,
      fontSize: 32,
      fontWeight: 900,
      color: '#fff',
      boxShadow: '0 10px 30px rgba(0,0,0,0.75)',
    }}
  >
    ● {label}
  </div>
);

// উপরের ব্যানার কার্ড (৩–৬ শব্দের শিরোনাম, কোনো অংশে ক্লিপ না হয়)
const TopBanner: React.FC<{title: string; sub?: string; color?: string; top?: number}> = ({title, sub, color = GOLD, top = 215}) => (
  <Bounce x={90} y={top} at={2} seed={title}>
    <div
      style={{
        width: 900,
        padding: '22px 30px',
        borderRadius: 24,
        background: 'rgba(8,12,18,0.90)',
        border: `4px solid ${color}`,
        textAlign: 'center',
        boxShadow: '0 22px 64px rgba(0,0,0,0.85)',
      }}
    >
      <div style={{fontSize: 48, fontWeight: 900, color}}>{title}</div>
      {sub ? <div style={{fontSize: 34, fontWeight: 800, color: '#e2e8f0', marginTop: 8}}>{sub}</div> : null}
    </div>
  </Bounce>
);

// NVIDIA চিপ ও ৪-টুকরো নকশা গ্রাফিক (একেবারে আলাদা ও পরিষ্কার SVG ব্লক)
const ChipSplitDiagram: React.FC<{split: boolean; highlightPiece?: number; dur: number}> = ({split, highlightPiece, dur}) => {
  const f = useCurrentFrame();
  const s = split ? interpolate(f, [4, Math.max(10, dur * 0.65)], [0, 1], {...clampOpts, easing: (t) => 1 - (1 - t) * (1 - t)}) : 0;
  const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
  const gap = 8 + 72 * s;
  const pieces = [
    {lbl: 'টিম ১', sub: 'মেমরি', dx: -1, dy: -1},
    {lbl: 'টিম ২', sub: 'কোর', dx: 1, dy: -1},
    {lbl: 'টিম ৩', sub: 'ক্যাশ', dx: -1, dy: 1},
    {lbl: 'টিম ৪', sub: 'ইন্টারকানেক্ট', dx: 1, dy: 1},
  ];
  return (
    <div style={{position: 'absolute', left: 100, right: 100, top: 300, textAlign: 'center', transform: `scale(${pop})`}}>
      <div style={{display: 'inline-block', padding: '12px 34px', borderRadius: 18, background: '#0c1610', border: `4px solid ${NV_GREEN}`, fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 42}}>
        {split ? 'টুকরো টুকরো চিপ ডিজাইন' : 'NVIDIA AI CHIP নকশা'}
      </div>
      <div style={{position: 'relative', width: 580, height: 580, margin: '0 auto'}}>
        {pieces.map((p, i) => {
          const isHl = highlightPiece === i;
          const locked = highlightPiece !== undefined && !isHl;
          return (
            <div
              key={p.lbl}
              style={{
                position: 'absolute',
                left: 145 + (p.dx > 0 ? 145 : -145) + p.dx * (gap / 2),
                top: 145 + (p.dy > 0 ? 145 : -145) + p.dy * (gap / 2),
                width: 260,
                height: 260,
                borderRadius: 24,
                background: locked ? 'rgba(15,23,42,0.75)' : 'linear-gradient(145deg, #102a14, #071309)',
                border: `5px solid ${isHl ? GOLD : locked ? '#475569' : NV_GREEN}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isHl ? '0 0 50px rgba(227,191,122,0.5)' : '0 16px 40px rgba(0,0,0,0.8)',
                opacity: locked ? 0.45 : 1,
              }}
            >
              <div style={{fontSize: 40, fontWeight: 900, color: isHl ? GOLD : '#fff'}}>{split ? p.lbl : `ব্লক ${bn(i + 1)}`}</div>
              <div style={{fontSize: 30, fontWeight: 800, color: locked ? '#94a3b8' : '#bef264', marginTop: 8}}>{locked ? 'অজানা (?)' : p.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// অটোগ্রাফ আবদারের দ্বিতীয় ধাপ (তুলনামূলক/টোকেন-মুক্ত গ্রাফিক)
const AutographPad = R({
  place: DarkBase,
  back: (_f, d) => <Photo src="nvidia/taiwan-stage.jpg" dur={d} dim={0.62} zoom={[1.05, 1.14]} />,
  over: (f, dur) => {
    const s = spring({frame: f - 1, fps: 30, config: {damping: 10}});
    const line = interpolate(f, [Math.round(dur * 0.25), Math.round(dur * 0.75)], [0, 1], clampOpts);
    return (
      <div
        style={{
          position: 'absolute',
          left: 110,
          right: 110,
          top: 360,
          padding: '44px 36px',
          borderRadius: 34,
          background: 'rgba(10,14,20,0.93)',
          border: `5px solid ${RED}`,
          textAlign: 'center',
          boxShadow: '0 28px 90px rgba(0,0,0,0.9)',
          transform: `scale(${s})`,
        }}
      >
        <div style={{fontSize: 38, fontWeight: 800, color: '#fca5a5'}}>অদ্ভুত মুহূর্ত!</div>
        <svg width={440} height={150} viewBox="0 0 440 150" style={{margin: '18px auto'}}>
          <rect x={20} y={14} width={400} height={122} rx={18} fill="#f8fafc" stroke={LINE} strokeWidth={5} />
          <path
            d="M65 92 Q125 32 165 88 T265 78 T365 68"
            fill="none"
            stroke={NV_GREEN}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={420}
            strokeDashoffset={420 * (1 - line)}
          />
        </svg>
        <div style={{fontSize: 48, fontWeight: 900, color: '#fff'}}>অটোগ্রাফ নিয়ে শোরগোল!</div>
      </div>
    );
  },
});

// ১৫ জন সিলিকন ভ্যালির দৃশ্যের সব উপাদান (৩৫টি segment id-র প্রতিটি)
const SCENES: Record<string, React.FC<SP>> = {
  // ১. হুক: $৩ ট্রিলিয়ন + গোপন ফর্মুলা + হানি ট্র্যাপ
  h1a: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/silicon-vault.jpg" dur={dur} zoom={[1.0, 1.12]} origin="50% 45%" dim={0.22} />,
    over: (f, dur) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 10}});
      const v = Math.round(interpolate(f, [2, Math.max(6, dur * 0.65)], [0, 3], clampOpts));
      return (
        <>
          <TopTag label="NVIDIA · AI GIANT" color={NV_GREEN} />
          <div
            style={{
              position: 'absolute',
              left: 85,
              right: 85,
              top: 320,
              padding: '44px 36px',
              borderRadius: 34,
              background: 'rgba(8,14,12,0.9)',
              border: `5px solid ${NV_GREEN}`,
              textAlign: 'center',
              boxShadow: '0 28px 90px rgba(0,0,0,0.88)',
              transform: `scale(${pop})`,
            }}
          >
            <div style={{fontSize: 40, fontWeight: 800, color: '#d9f99d'}}>বাজারমূল্য</div>
            <div style={{fontSize: 136, fontWeight: 900, color: GOLD, lineHeight: 1.08, marginTop: 6}}>${bn(v)} ট্রিলিয়ন</div>
            <div style={{marginTop: 18, display: 'inline-block', padding: '10px 30px', borderRadius: 99, background: '#111827', border: `3px solid ${NV_GREEN}`, fontSize: 38, fontWeight: 900, color: '#fff'}}>
              NVIDIA-র গোপন সাম্রাজ্য
            </div>
          </div>
        </>
      );
    },
  }),

  h1b: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/engineer-desk.jpg" dur={dur} zoom={[1.0, 1.1]} origin="50% 48%" dim={0.38} />,
    over: (f, dur) => {
      const scan = interpolate(f, [0, dur], [0, 1], clampOpts);
      const pop = spring({frame: f - 2, fps: 30, config: {damping: 11}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 95,
            right: 95,
            top: 330,
            padding: '42px 34px',
            borderRadius: 32,
            background: 'rgba(8,13,20,0.9)',
            border: `5px solid ${GOLD}`,
            textAlign: 'center',
            boxShadow: '0 28px 80px rgba(0,0,0,0.88)',
            transform: `scale(${pop})`,
          }}
        >
          <div style={{fontSize: 34, fontWeight: 900, color: NV_GREEN, letterSpacing: 2}}>TARGET: SILICON VALLEY</div>
          <svg width={210} height={210} viewBox="0 0 210 210" style={{margin: '22px auto'}}>
            <rect x={45} y={45} width={120} height={120} rx={16} fill="#14532d" stroke={NV_GREEN} strokeWidth={6} />
            <rect x={75} y={75} width={60} height={60} rx={8} fill={GOLD} />
            <circle cx={105} cy={105} r={82 + 8 * Math.sin(scan * 6)} fill="none" stroke={RED} strokeWidth={5} strokeDasharray="16 10" />
          </svg>
          <div style={{fontSize: 48, fontWeight: 900, color: '#fff'}}>লক্ষ্য: গোপন AI ফর্মুলা চুরি!</div>
        </div>
      );
    },
  }),

  h1c: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/spy-silhouette.jpg" dur={dur} zoom={[1.02, 1.14]} origin="50% 42%" dim={0.18} />,
    over: () => <TopBanner title="ভয়ংকর হানি ট্র্যাপ!" sub="সিলিকন ভ্যালিতে সুন্দরী গুপ্তচর" color={RED} top={225} />,
  }),

  // ২. প্রকাশ্যে তরুণীর কাণ্ড & Jensen Huang অস্বস্তিতে
  uncomf1: R({
    bg: 'dark',
    actors: [{x: 540, y: 1580, h: 980, look: FAN_WOMAN, expression: 'smile', gesture: 'pointUp'}],
    front: (f) => {
      const flash = Math.abs(Math.sin(f * 0.45));
      return (
        <>
          <TopBanner title="প্রকাশ্যে অদ্ভুত কাণ্ড!" color={GOLD} top={210} />
          {[
            {x: 170, y: 520},
            {x: 860, y: 570},
            {x: 190, y: 920},
          ].map((pt, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: pt.x,
                top: pt.y,
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#fff',
                opacity: 0.25 + 0.65 * (i % 2 === 0 ? flash : 1 - flash),
                boxShadow: '0 0 40px 18px rgba(255,255,255,0.65)',
              }}
            />
          ))}
        </>
      );
    },
  }),

  uncomf2: R({
    place: StageBg,
    actors: [{x: 540, y: 1580, h: 980, look: JENSEN, expression: 'worried', gesture: 'shrug', talking: true}],
    front: () => <TopBanner title="চরম অস্বস্তিতে Jensen Huang!" sub="NVIDIA CEO" color={RED} top={210} />,
  }),

  // ৩. তাইওয়ানের টেক ইভেন্ট
  taiwan: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/taiwan-stage.jpg" dur={dur} zoom={[1.0, 1.09]} origin="50% 42%" dim={0.14} />,
    over: () => (
      <>
        <TopTag label="তাইওয়ান টেক ইভেন্ট" color={GOLD} />
        <TopBanner title="COMPUTEX · তাইপে, তাইওয়ান" color={GOLD} top={235} />
      </>
    ),
  }),

  // ৪. ভরা মজলিসে অটোগ্রাফ (৫.৯০স -> Two দিয়ে মাঝে বদল)
  auto: Two(
    R({
      place: StageBg,
      actors: [
        {x: 340, y: 1590, h: 950, look: FAN_WOMAN, expression: 'smile', gesture: 'open', lookX: 1},
        {x: 740, y: 1590, h: 980, look: JENSEN, expression: 'surprised', gesture: 'idle', lookX: -1},
      ],
      front: () => <TopBanner title="ভরা মজলিসে হঠাৎ আবদার!" color={GOLD} top={215} />,
    }),
    AutographPad,
    0.48,
  ),

  // ৫. ভিডিও ভাইরাল -> হানি ট্র্যাপ প্রশ্ন
  viral: R({
    bg: 'dark',
    over: (f, dur) => {
      const views = Math.round(interpolate(f, [2, Math.max(8, dur * 0.8)], [10, 95], clampOpts));
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 110,
            right: 110,
            top: 290,
            padding: '32px',
            borderRadius: 34,
            background: '#0f172a',
            border: `5px solid ${RED}`,
            boxShadow: '0 28px 90px rgba(0,0,0,0.88)',
            transform: `scale(${pop})`,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
            <span style={{padding: '8px 20px', borderRadius: 12, background: RED, fontSize: 30, fontWeight: 900, color: '#fff'}}>● VIRAL REEL</span>
            <span style={{fontSize: 34, fontWeight: 900, color: GOLD}}>{bn(views)} লাখ+ ভিউ</span>
          </div>
          <div style={{position: 'relative', height: 470, borderRadius: 22, overflow: 'hidden', border: `3px solid ${LINE}`}}>
            <Img src={staticFile('nvidia/taiwan-stage.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)'}} />
            <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 116, height: 116, borderRadius: '50%', background: 'rgba(220,38,38,0.9)', border: '5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{width: 0, height: 0, marginLeft: 10, borderTop: '24px solid transparent', borderBottom: '24px solid transparent', borderLeft: '40px solid #fff'}} />
            </div>
          </div>
          <div style={{marginTop: 20, textAlign: 'center', fontSize: 40, fontWeight: 900, color: '#e2e8f0'}}>ইন্টারনেটে তুমুল শোরগোল!</div>
        </div>
      );
    },
  }),

  trapq: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/spy-silhouette.jpg" dur={dur} zoom={[1.02, 1.12]} origin="50% 35%" dim={0.44} />,
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 9, stiffness: 170}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 100,
            right: 100,
            top: 320,
            padding: '44px 34px',
            borderRadius: 34,
            background: 'rgba(10,12,18,0.92)',
            border: `5px solid ${RED}`,
            textAlign: 'center',
            transform: `scale(${pop})`,
          }}
        >
          <div style={{fontSize: 170, fontWeight: 900, color: RED, lineHeight: 0.9}}>?</div>
          <div style={{fontSize: 48, fontWeight: 900, color: GOLD, marginTop: 18}}>চীনা হানি ট্র্যাপ!</div>
          <div style={{fontSize: 38, fontWeight: 800, color: '#fff', marginTop: 10}}>সিইও নিজেই কি টার্গেট?</div>
        </div>
      );
    },
  }),

  // ৬. Jensen Huang হাসিমুখে বলেন + সরে যান
  jensen1: R({
    place: StageBg,
    actors: [{x: 540, y: 1620, h: 980, look: JENSEN, expression: 'smile', gesture: 'explain', talking: true}],
    front: (f) => {
      const pop = spring({frame: f - 2, fps: 30, config: {damping: 11}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 85,
            right: 85,
            top: 230,
            padding: '28px 34px',
            borderRadius: 28,
            background: '#fbf7ee',
            border: `6px solid ${LINE}`,
            textAlign: 'center',
            boxShadow: '0 24px 60px rgba(0,0,0,0.75)',
            transform: `scale(${pop})`,
          }}
        >
          <div style={{display: 'inline-block', padding: '6px 22px', borderRadius: 12, background: NV_GREEN, fontSize: 28, fontWeight: 900, color: '#05080a', marginBottom: 12}}>
            Jensen Huang
          </div>
          <div style={{fontSize: 46, fontWeight: 900, color: '#15151b'}}>"এটা বোধহয় ভালো আইডিয়া নয়"</div>
        </div>
      );
    },
  }),

  jensen2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/taiwan-stage.jpg" dur={dur} zoom={[1.05, 1.15]} origin="60% 38%" dim={0.34} />,
    over: (f, dur) => {
      const slide = interpolate(f, [2, Math.max(8, dur * 0.65)], [-120, 0], clampOpts);
      const op = interpolate(f, [0, 6], [0, 1], clampOpts);
      return (
        <div
          style={{
            position: 'absolute',
            left: 95,
            right: 95,
            top: 410,
            padding: '44px 34px',
            borderRadius: 32,
            background: 'rgba(8,14,12,0.92)',
            border: `5px solid ${EMERALD}`,
            textAlign: 'center',
            transform: `translateX(${slide}px)`,
            opacity: op,
            boxShadow: '0 28px 80px rgba(0,0,0,0.88)',
          }}
        >
          <div style={{fontSize: 40, fontWeight: 800, color: '#a7f3d0'}}>বুদ্ধিমত্তার সাথে</div>
          <div style={{fontSize: 58, fontWeight: 900, color: '#fff', marginTop: 10}}>সাবধানে পরিস্থিতি সামাল ✓</div>
        </div>
      );
    },
  }),

  // ৭. আসল হানি ট্র্যাপ পর্দার আড়ালে!
  behind1: R({
    bg: 'dark',
    over: (f, dur) => {
      const xDraw = interpolate(f, [2, Math.max(8, dur * 0.48)], [0, 1], clampOpts);
      const pop = spring({frame: f - 2, fps: 30, config: {damping: 10}});
      return (
        <div style={{position: 'absolute', left: 95, right: 95, top: 340, padding: '44px 34px', borderRadius: 34, background: 'rgba(15,20,30,0.95)', border: `5px solid ${RED}`, textAlign: 'center', transform: `scale(${pop})`}}>
          <div style={{fontSize: 38, fontWeight: 800, color: '#94a3b8'}}>ক্যামেরার সামনে নয়!</div>
          <svg width={200} height={160} viewBox="0 0 200 160" style={{margin: '20px auto'}}>
            <rect x={28} y={40} width={110} height={80} rx={14} fill="#334155" stroke={LINE} strokeWidth={5} />
            <polygon points="138,56 178,36 178,124 138,104" fill="#475569" stroke={LINE} strokeWidth={5} />
            <line x1={25} y1={22} x2={175} y2={138} stroke={RED} strokeWidth={18} strokeLinecap="round" strokeDasharray={220} strokeDashoffset={220 * (1 - xDraw)} />
          </svg>
          <div style={{fontSize: 54, fontWeight: 900, color: RED}}>আসল ফাঁদ অন্য জায়গায়!</div>
        </div>
      );
    },
  }),

  behind2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/spy-silhouette.jpg" dur={dur} zoom={[1.05, 1.16]} origin="46% 42%" dim={0.18} />,
    over: () => <TopBanner title="সিলিকন ভ্যালির পর্দার আড়ালে!" color={GOLD} top={225} />,
  }),

  // ৮. The Times + মার্কিন গোয়েন্দা তদন্ত (times2-তে ডানে ন্যারেটর pop)
  times1: R({
    bg: 'plain',
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 85,
            right: 85,
            top: 290,
            padding: '38px 34px',
            borderRadius: 24,
            background: '#f5f0e1',
            border: `6px solid ${LINE}`,
            color: '#111827',
            boxShadow: '0 30px 90px rgba(0,0,0,0.85)',
            transform: `scale(${pop})`,
          }}
        >
          <div style={{borderBottom: `4px solid ${LINE}`, paddingBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontSize: 56, fontWeight: 900, fontFamily: 'Georgia, serif'}}>THE TIMES</div>
            <span style={{padding: '6px 16px', borderRadius: 8, background: RED, color: '#fff', fontSize: 26, fontWeight: 900}}>EXCLUSIVE</span>
          </div>
          <div style={{marginTop: 22, fontSize: 44, fontWeight: 900, lineHeight: 1.3}}>
            সিলিকন ভ্যালিতে গুপ্তচরদের হানি ট্র্যাপ তদন্ত
          </div>
          <div style={{marginTop: 22, padding: '14px 20px', borderRadius: 14, background: '#1e293b', color: GOLD, fontSize: 32, fontWeight: 800, textAlign: 'center'}}>
            + মার্কিন গোয়েন্দাদের যৌথ প্রতিবেদন
          </div>
        </div>
      );
    },
  }),

  times2: R({
    bg: 'plain',
    over: (f, dur) => {
      const p = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const stamp = spring({frame: f - Math.round(dur * 0.35), fps: 30, config: {damping: 9}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 75,
            top: 245,
            width: 650,
            padding: '36px 32px',
            borderRadius: 28,
            background: 'rgba(15,23,42,0.94)',
            border: `5px solid ${GOLD}`,
            boxShadow: '0 26px 80px rgba(0,0,0,0.85)',
            transform: `scale(${p})`,
          }}
        >
          <div style={{fontSize: 28, fontWeight: 900, color: '#94a3b8', letterSpacing: 2}}>INTELLIGENCE DOSSIER</div>
          <div style={{fontSize: 52, fontWeight: 900, color: '#fff', marginTop: 12, lineHeight: 1.25}}>শিউরে ওঠা গোপন সত্য প্রকাশ্যে!</div>
          <div
            style={{
              marginTop: 26,
              display: 'inline-block',
              padding: '10px 26px',
              borderRadius: 12,
              border: `5px solid ${RED}`,
              color: RED,
              fontSize: 38,
              fontWeight: 900,
              transform: `rotate(-4deg) scale(${stamp})`,
            }}
          >
            CONFIDENTIAL
          </div>
        </div>
      );
    },
  }),

  // ৯. আমেরিকার AI চিপ নিষেধাজ্ঞা + হ্যাকার ব্যর্থ
  ban1: R({
    bg: 'dark',
    over: (f, dur) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 10}});
      const xBar = interpolate(f, [2, Math.max(8, dur * 0.6)], [0, 1], clampOpts);
      return (
        <div style={{position: 'absolute', left: 85, right: 85, top: 340, padding: '44px 32px', borderRadius: 32, background: '#0f172a', border: `5px solid ${RED}`, textAlign: 'center', transform: `scale(${pop})`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28}}>
            <div style={{padding: '18px 34px', borderRadius: 20, background: '#1e3a8a', border: '3px solid #60a5fa', fontSize: 48, fontWeight: 900, color: '#fff'}}>USA</div>
            <div style={{fontSize: 44, fontWeight: 900, color: RED, transform: `scale(${0.8 + 0.35 * xBar})`}}>✕ নিষেধাজ্ঞা ✕</div>
            <div style={{padding: '18px 34px', borderRadius: 20, background: '#7f1d1d', border: `3px solid ${RED}`, fontSize: 48, fontWeight: 900, color: '#fff'}}>CHINA</div>
          </div>
          <div style={{marginTop: 30, fontSize: 40, fontWeight: 900, color: GOLD}}>NVIDIA-র উন্নত চিপ রপ্তানি বন্ধ</div>
        </div>
      );
    },
  }),

  ban2: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/silicon-vault.jpg" dur={dur} zoom={[1.08, 1.18]} origin="50% 45%" dim={0.32} />,
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 10}});
      return (
        <div style={{position: 'absolute', left: 110, right: 110, top: 350, padding: '40px 32px', borderRadius: 32, background: 'rgba(12,16,22,0.92)', border: `5px solid ${RED}`, textAlign: 'center', transform: `scale(${pop})`}}>
          <div style={{fontSize: 34, fontWeight: 900, color: '#fca5a5'}}>EXPORT BAN</div>
          <div style={{fontSize: 58, fontWeight: 900, color: '#fff', marginTop: 10}}>শক্তিশালী AI চিপ বন্ধ!</div>
          <div style={{marginTop: 18, display: 'inline-block', padding: '8px 26px', borderRadius: 99, background: RED, fontSize: 34, fontWeight: 900, color: '#fff'}}>BLOCKED</div>
        </div>
      );
    },
  }),

  hackfail: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/engineer-desk.jpg" dur={dur} zoom={[1.02, 1.1]} origin="50% 48%" dim={0.36} />,
    over: (f, dur) => {
      const hits = Math.round(interpolate(f, [2, Math.max(8, dur * 0.65)], [12, 999], clampOpts));
      return (
        <div style={{position: 'absolute', left: 95, right: 95, top: 320, padding: '40px 32px', borderRadius: 32, background: 'rgba(6,16,12,0.92)', border: `5px solid ${NV_GREEN}`, textAlign: 'center', boxShadow: '0 26px 80px rgba(0,0,0,0.9)'}}>
          <div style={{fontSize: 34, fontWeight: 900, color: '#94a3b8'}}>CYBER ATTACK LOG</div>
          <div style={{fontSize: 48, fontWeight: 900, color: GOLD, marginTop: 10}}>হ্যাক চেষ্টা: {bn(hits)}+</div>
          <div style={{marginTop: 22, padding: '18px 26px', borderRadius: 20, background: 'rgba(220,38,38,0.18)', border: `4px solid ${RED}`, fontSize: 48, fontWeight: 900, color: '#fecaca'}}>
            সার্ভার ভাঙতে ব্যর্থ! ✕
          </div>
          <div style={{marginTop: 16, fontSize: 34, fontWeight: 800, color: NV_GREEN}}>সার্ভার লকড · ১০০% সুরক্ষিত</div>
        </div>
      );
    },
  }),

  // ১০. রক্ত-মাংসের হানি ট্র্যাপ (৫.৩৬স -> Two)
  deploy: Two(
    R({
      bg: 'dark',
      over: (f) => {
        const p = spring({frame: f - 1, fps: 30, config: {damping: 10}});
        return (
          <div style={{position: 'absolute', left: 95, right: 95, top: 370, padding: '44px 34px', borderRadius: 34, background: '#140c12', border: `5px solid ${RED}`, textAlign: 'center', transform: `scale(${p})`}}>
            <div style={{fontSize: 36, fontWeight: 900, color: '#fca5a5'}}>CYBER HACK FAILED</div>
            <div style={{fontSize: 64, fontWeight: 900, color: GOLD, marginTop: 14}}>প্ল্যান বি চালু!</div>
          </div>
        );
      },
    }),
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="nvidia/spy-silhouette.jpg" dur={dur} zoom={[1.02, 1.14]} origin="50% 40%" dim={0.22} />,
      over: () => <TopBanner title="রক্ত-মাংসের হানি ট্র্যাপ!" color={RED} top={225} />,
    }),
    0.45,
  ),

  // ১১. গবেষক / স্টার্টআপ কর্মী সেজে প্রেমের সম্পর্ক
  disguise1: R({
    bg: 'plain',
    actors: [{x: 540, y: 1580, h: 980, look: SPY_WOMAN, expression: 'smile', gesture: 'idle'}],
    front: () => <TopBanner title="প্রশিক্ষিত সুন্দরী গুপ্তচর!" color={RED} top={215} />,
  }),

  disguise2: R({
    bg: 'dark',
    over: (f, dur) => {
      const p1 = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const p2 = spring({frame: f - Math.round(dur * 0.35), fps: 30, config: {damping: 11}});
      return (
        <div style={{position: 'absolute', left: 95, right: 95, top: 280, display: 'flex', flexDirection: 'column', gap: 28}}>
          <div style={{padding: '32px 30px', borderRadius: 26, background: '#0f172a', border: `4px solid ${GOLD}`, transform: `scale(${p1})`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontSize: 28, fontWeight: 800, color: '#94a3b8'}}>ছদ্মবেশ #১</div>
              <div style={{fontSize: 48, fontWeight: 900, color: '#fff'}}>সাধারণ গবেষক</div>
            </div>
            <span style={{padding: '8px 18px', borderRadius: 10, border: `3px solid ${RED}`, color: RED, fontSize: 30, fontWeight: 900}}>FAKE ID</span>
          </div>
          <div style={{padding: '32px 30px', borderRadius: 26, background: '#0f172a', border: `4px solid ${EMERALD}`, transform: `scale(${p2})`, opacity: p2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontSize: 28, fontWeight: 800, color: '#94a3b8'}}>ছদ্মবেশ #২</div>
              <div style={{fontSize: 48, fontWeight: 900, color: '#fff'}}>স্টার্টআপ কর্মী</div>
            </div>
            <span style={{padding: '8px 18px', borderRadius: 10, border: `3px solid ${RED}`, color: RED, fontSize: 30, fontWeight: 900}}>FAKE ID</span>
          </div>
        </div>
      );
    },
  }),

  romance: R({
    place: ValleyBg,
    actors: [
      {x: 340, y: 1580, h: 960, look: SPY_WOMAN, expression: 'smile', gesture: 'explain', talking: true, lookX: 1},
      {x: 750, y: 1580, h: 980, look: ENGINEER, expression: 'smile', gesture: 'open', lookX: -1},
    ],
    front: (f) => {
      const beat = 1 + 0.08 * Math.sin(f * 0.25);
      return (
        <>
          <TopBanner title="টপ ইঞ্জিনিয়ারদের সাথে প্রেম!" color={GOLD} top={210} />
          <svg width={130} height={130} viewBox="0 0 120 120" style={{position: 'absolute', left: 475, top: 470, transform: `scale(${beat})`}}>
            <path d="M60 100 C20 72 10 42 28 24 C42 10 60 24 60 36 C60 24 78 10 92 24 C110 42 100 72 60 100 Z" fill={RED} stroke={LINE} strokeWidth={5} />
            <circle cx={60} cy={52} r={24} fill="none" stroke={GOLD} strokeWidth={3} strokeDasharray="6 6" />
          </svg>
        </>
      );
    },
  }),

  // ১২. ১ রাতের ব্ল্যাকমেইল নয় -> বিয়ে করে সংসার!
  worst: R({
    bg: 'dark',
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 9, stiffness: 180}});
      return (
        <div style={{position: 'absolute', left: 100, right: 100, top: 370, padding: '48px 34px', borderRadius: 34, background: 'rgba(127,29,29,0.25)', border: `6px solid ${RED}`, textAlign: 'center', transform: `scale(${pop})`}}>
          <svg width={130} height={120} viewBox="0 0 130 120" style={{margin: '0 auto 14px'}}>
            <polygon points="65,10 120,108 10,108" fill={RED} stroke={GOLD} strokeWidth={5} strokeLinejoin="round" />
            <text x={65} y={92} textAnchor="middle" fontSize={64} fontWeight={900} fill="#fff">!</text>
          </svg>
          <div style={{fontSize: 58, fontWeight: 900, color: '#fff'}}>সবচেয়ে ভয়ংকর সত্য!</div>
        </div>
      );
    },
  }),

  notone: R({
    bg: 'dark',
    over: (f, dur) => {
      const draw = interpolate(f, [2, Math.max(8, dur * 0.55)], [0, 1], clampOpts);
      return (
        <div style={{position: 'absolute', left: 110, right: 110, top: 370, padding: '46px 34px', borderRadius: 34, background: '#0f172a', border: `5px solid ${RED}`, textAlign: 'center'}}>
          <div style={{position: 'relative', display: 'inline-block', padding: '16px 32px'}}>
            <div style={{fontSize: 54, fontWeight: 900, color: '#94a3b8'}}>১ রাতের ব্ল্যাকমেইল</div>
            <svg width={520} height={110} viewBox="0 0 520 110" style={{position: 'absolute', inset: 0}}>
              <line x1={18} y1={90} x2={502} y2={20} stroke={RED} strokeWidth={14} strokeLinecap="round" strokeDasharray={540} strokeDashoffset={540 * (1 - draw)} />
            </svg>
          </div>
          <div style={{fontSize: 42, fontWeight: 900, color: GOLD, marginTop: 14}}>তার চেয়েও অনেক বড় ফাঁদ!</div>
        </div>
      );
    },
  }),

  marry1: Two(
    R({
      place: DarkBase,
      back: (_f, dur) => <Photo src="nvidia/wedding-wafer.jpg" dur={dur} zoom={[1.0, 1.09]} origin="50% 50%" dim={0.22} />,
      over: () => <TopBanner title="লক্ষ্য: গোপন ফর্মুলা চুরি!" color={GOLD} top={225} />,
    }),
    R({
      bg: 'plain',
      actors: [
        {x: 360, y: 1590, h: 960, look: SPY_BRIDE, expression: 'smile', gesture: 'idle', lookX: 1},
        {x: 720, y: 1590, h: 980, look: ENGINEER, expression: 'smile', gesture: 'idle', lookX: -1},
      ],
      front: () => <TopBanner title="রীতিমতো বিয়ে করে সংসার!" sub="দীর্ঘমেয়াদি গুপ্তচর অপারেশন" color={RED} top={210} />,
    }),
    0.46,
  ),

  // ১৩. বছরের পর বছর অভিনয় -> বেডরুম থেকে শত কোটি চুরি
  act: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/wedding-wafer.jpg" dur={dur} zoom={[1.08, 1.18]} origin="50% 50%" dim={0.34} />,
    over: (f, dur) => {
      const yr = Math.round(interpolate(f, [2, Math.max(8, dur * 0.72)], [1, 5], clampOpts));
      return (
        <div style={{position: 'absolute', left: 110, right: 110, top: 340, padding: '44px 34px', borderRadius: 34, background: 'rgba(10,12,18,0.92)', border: `5px solid ${GOLD}`, textAlign: 'center'}}>
          <div style={{fontSize: 38, fontWeight: 800, color: '#cbd5e1'}}>নিখুঁত ভালোবাসার অভিনয়</div>
          <div style={{fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 8}}>{bn(yr)} বছর+</div>
          <div style={{marginTop: 14, fontSize: 38, fontWeight: 800, color: '#fca5a5'}}>দিনের পর দিন বিশ্বাস অর্জন</div>
        </div>
      );
    },
  }),

  bedroom: R({
    bg: 'dark',
    over: (f, dur) => {
      const pct = Math.round(interpolate(f, [3, Math.max(10, dur * 0.75)], [14, 100], clampOpts));
      return (
        <div style={{position: 'absolute', left: 95, right: 95, top: 320, padding: '44px 34px', borderRadius: 34, background: '#0c121e', border: `5px solid ${RED}`, textAlign: 'center', boxShadow: '0 28px 90px rgba(0,0,0,0.9)'}}>
          <div style={{fontSize: 34, fontWeight: 900, color: '#fca5a5', letterSpacing: 1.5}}>EXFILTRATION IN PROGRESS</div>
          <div style={{fontSize: 56, fontWeight: 900, color: '#fff', marginTop: 12}}>বেডরুম থেকেই প্রযুক্তি পাচার!</div>
          <div style={{marginTop: 28, height: 34, borderRadius: 99, background: '#1e293b', border: '3px solid #334155', overflow: 'hidden'}}>
            <div style={{width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${GOLD}, ${RED})`}} />
          </div>
          <div style={{marginTop: 18, fontSize: 42, fontWeight: 900, color: GOLD}}>শত শত কোটি টাকার AI টেক · {bn(pct)}%</div>
        </div>
      );
    },
  }),

  // ১৪. NVIDIA-র সমাধান: চিপের নকশা টুকরো টুকরো করা
  def1: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/silicon-vault.jpg" dur={dur} zoom={[1.04, 1.12]} origin="50% 50%" dim={0.34} />,
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 10}});
      return (
        <div style={{position: 'absolute', left: 105, right: 105, top: 360, padding: '44px 34px', borderRadius: 34, background: 'rgba(8,16,12,0.92)', border: `5px solid ${NV_GREEN}`, textAlign: 'center', transform: `scale(${pop})`}}>
          <div style={{fontSize: 40, fontWeight: 800, color: '#bef264'}}>সুরক্ষার নতুন কৌশল</div>
          <div style={{fontSize: 58, fontWeight: 900, color: '#fff', marginTop: 10}}>নীরব ফাঁদ থেকে বাঁচার উপায়</div>
        </div>
      );
    },
  }),

  def2: R({
    bg: 'plain',
    over: (_f, dur) => <ChipSplitDiagram split={false} dur={dur} />,
  }),

  def3: R({
    bg: 'plain',
    over: (_f, dur) => <ChipSplitDiagram split={true} dur={dur} />,
  }),

  def4: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="nvidia/engineer-desk.jpg" dur={dur} zoom={[1.06, 1.14]} origin="50% 50%" dim={0.44} />,
    over: (_f, dur) => <ChipSplitDiagram split={true} highlightPiece={0} dur={dur} />,
  }),

  // ১৫. ফায়ারওয়াল বনাম মানুষের আবেগ + CTA
  firewall: R({
    bg: 'dark',
    over: (f) => {
      const pop = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <div style={{position: 'absolute', left: 95, right: 95, top: 330, padding: '44px 34px', borderRadius: 34, background: 'rgba(6,22,14,0.94)', border: `5px solid ${EMERALD}`, textAlign: 'center', transform: `scale(${pop})`}}>
          <svg width={150} height={170} viewBox="0 0 150 170" style={{margin: '0 auto 14px'}}>
            <path d="M75 12 L134 38 V86 C134 124 108 150 75 162 C42 150 16 124 16 86 V38 Z" fill="#064e3b" stroke={EMERALD} strokeWidth={7} />
            <polyline points="48,86 68,106 106,66" fill="none" stroke={GOLD} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{fontSize: 54, fontWeight: 900, color: '#fff'}}>হ্যাকার আটকানো যায়!</div>
          <div style={{fontSize: 38, fontWeight: 800, color: EMERALD, marginTop: 10}}>FIREWALL ACTIVE ✓</div>
        </div>
      );
    },
  }),

  emotion: R({
    bg: 'dark',
    over: (f, dur) => {
      const p1 = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const p2 = spring({frame: f - Math.round(dur * 0.25), fps: 30, config: {damping: 10}});
      return (
        <div style={{position: 'absolute', left: 85, right: 85, top: 280, display: 'flex', flexDirection: 'column', gap: 24}}>
          <div style={{padding: '28px 30px', borderRadius: 26, background: 'rgba(16,185,129,0.14)', border: `4px solid ${EMERALD}`, transform: `scale(${p1})`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontSize: 42, fontWeight: 900, color: '#a7f3d0'}}>হ্যাকার</div>
            <div style={{fontSize: 38, fontWeight: 900, color: EMERALD}}>ফায়ারওয়াল আছে ✓</div>
          </div>
          <div style={{padding: '44px 30px', borderRadius: 28, background: 'rgba(220,38,38,0.18)', border: `5px solid ${RED}`, transform: `scale(${p2})`, opacity: p2, textAlign: 'center'}}>
            <div style={{fontSize: 48, fontWeight: 900, color: '#fff'}}>মানুষের আবেগ</div>
            <div style={{fontSize: 44, fontWeight: 900, color: '#fca5a5', marginTop: 12}}>আটকানোর কোনো সফটওয়্যার নেই! ✕</div>
          </div>
        </div>
      );
    },
  }),

  outro: R({
    bg: 'plain',
    over: (f, dur) => {
      const p1 = spring({frame: f - 2, fps: 30, config: {damping: 11}});
      const p2 = spring({frame: f - Math.round(dur * 0.25), fps: 30, config: {damping: 11}});
      const p3 = spring({frame: f - Math.round(dur * 0.5), fps: 30, config: {damping: 11}});
      return (
        <div style={{position: 'absolute', left: 75, top: 245, width: 650, padding: '36px 32px', background: 'rgba(8,14,22,0.92)', border: `5px solid ${GOLD}`, borderRadius: 30, boxShadow: '0 26px 80px rgba(0,0,0,0.85)', transform: `scale(${p1})`}}>
          <div style={{fontSize: 50, fontWeight: 900, color: GOLD}}>প্রযুক্তি ও ক্ষমতার খেলা</div>
          <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 16}}>
            <div style={{padding: '16px 22px', borderRadius: 18, background: 'rgba(118,185,0,0.16)', border: `3px solid ${NV_GREEN}`, fontSize: 35, fontWeight: 800, color: '#fff', transform: `scale(${p2})`, opacity: p2}}>
              ✓ চিপ নয়, টার্গেট প্রকৌশলী
            </div>
            <div style={{padding: '16px 22px', borderRadius: 18, background: 'rgba(220,38,38,0.16)', border: `3px solid ${RED}`, fontSize: 35, fontWeight: 800, color: '#fecaca', transform: `scale(${p3})`, opacity: p3}}>
              ✓ মানুষের আবেগই সবচেয়ে বড় ঝুঁকি
            </div>
          </div>
        </div>
      );
    },
  }),

  cta: () => <Cta />,
};

// থাম্বনেইল (ফ্রেম ০ থেকেই ১০০% দৃশ্যমান)
const Thumb: React.FC = () => (
  <PsyThumb
    l1="সিলিকন ভ্যালির হানি ট্র্যাপ"
    l2="টার্গেট NVIDIA-র ফর্মুলা!"
    bottom="বিয়ে করেই প্রযুক্তি চুরি?"
    term="Silicon Valley · NVIDIA"
    glow="rgba(118,185,0,0.34)"
    size={74}
    art={
      <div
        style={{
          position: 'absolute',
          left: 34,
          top: 655,
          width: 590,
          height: 620,
          overflow: 'hidden',
          borderRadius: 34,
          border: `6px solid ${GOLD}`,
          boxShadow: '0 26px 80px rgba(0,0,0,0.9)',
        }}
      >
        <Img src={staticFile('nvidia/silicon-vault.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 45%'}} />
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            padding: '12px 24px',
            borderRadius: 18,
            background: '#14532d',
            border: `4px solid ${NV_GREEN}`,
            fontSize: 40,
            fontWeight: 900,
            color: '#fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.85)',
          }}
        >
          NVIDIA · $3T
        </div>
        <div
          style={{
            position: 'absolute',
            left: 20,
            bottom: 20,
            padding: '10px 24px',
            borderRadius: 16,
            background: RED,
            border: `4px solid ${GOLD}`,
            fontSize: 40,
            fontWeight: 900,
            color: '#fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.85)',
          }}
        >
          HONEY TRAP!
        </div>
      </div>
    }
  />
);

export const nvidia = story('nvidia/', raw, SCENES, Thumb, {logo: 'bba2'});
