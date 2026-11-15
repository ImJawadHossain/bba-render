// ভোর ৫টার মনস্তাত্ত্বিক পরীক্ষা ও মস্তিষ্কের ইচ্ছাশক্তির পেশি (aMCC) — DawnWillpower
// স্ক্রিপ্ট: D:\ClaudeVideo\scripts\84-dawn-willpower.md | ভয়েস: Cartesia sonic-3.6 (Professor bn)
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {R, Two, story} from '../common/reel';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const DAWN_GOLD = '#f59e0b';
const DAWN_BLUE = '#38bdf8';
const EMERALD = '#10b981';
const LINE = '#1b1b1f';
const DarkBase = <AbsoluteFill style={{background: '#070b14'}} />;

const BN = '০১২৩৪৫৬৭৮৯';
const bn = (n: number) => n.toLocaleString('en-IN').replace(/\d/g, (d) => BN[Number(d)]);

const MORNING_HERO: ToonLook = {
  skin: '#d9a47e',
  hair: '#1e1612',
  hairStyle: 'short',
  top: '#0f766e',
  jacket: '#111827',
  bottom: '#1e293b',
  shoes: '#0f172a',
};

const FajrSkyBg = (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #060d1f 0%, #102142 52%, #1d2538 82%, #070a12 100%)'}}>
    <div style={{position: 'absolute', left: 140, top: 240, width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.16), transparent 68%)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 320, height: 18, background: '#0f172a', borderTop: `3px solid ${DAWN_GOLD}`}} />
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
            'linear-gradient(180deg, rgba(5,8,16,0.72) 0%, rgba(5,8,16,0.06) 24%, rgba(5,8,16,0.1) 66%, rgba(5,8,16,0.88) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// নিরাপদ টপ ট্যাগ (top: 132 যাতে ক্যামেরা জুমে না কাটে)
const TopTag: React.FC<{label: string; color?: string}> = ({label, color = GOLD}) => (
  <div
    style={{
      position: 'absolute',
      top: 132,
      right: 48,
      padding: '10px 26px',
      borderRadius: 99,
      background: 'rgba(6,10,20,0.9)',
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
  const s = spring({frame: f - 1, fps: 30, config: {damping: 12, stiffness: 180}});
  return (
    <div style={{position: 'absolute', left: 56, right: 56, top, textAlign: 'center', transform: `scale(${s})`}}>
      <div
        style={{
          display: 'inline-block',
          padding: '18px 34px',
          borderRadius: 24,
          background: 'rgba(7,12,24,0.9)',
          border: `4px solid ${color}`,
          boxShadow: '0 18px 50px rgba(0,0,0,0.82)',
        }}
      >
        <div style={{fontSize: 48, fontWeight: 900, color, lineHeight: 1.24}}>{text}</div>
        {sub ? <div style={{fontSize: 32, fontWeight: 700, color: '#e2e8f0', marginTop: 6}}>{sub}</div> : null}
      </div>
    </div>
  );
};

// `win` দৃশ্যের দ্বিতীয় অংশ: রহস্য প্রশ্ন "কীভাবে জানেন?"
const WinQuestion = R({
  place: DarkBase,
  back: (_f, d) => <Photo src="dawn/dawn-horizon.jpg" dur={d} dim={0.62} zoom={[1.06, 1.13]} />,
  over: (f) => {
    const s = spring({frame: f, fps: 30, config: {damping: 9, stiffness: 180}});
    return (
      <div
        style={{
          position: 'absolute',
          left: 110,
          right: 110,
          top: 410,
          padding: '48px 36px',
          borderRadius: 36,
          background: 'rgba(8,13,26,0.94)',
          border: `5px solid ${DAWN_GOLD}`,
          textAlign: 'center',
          boxShadow: '0 28px 90px rgba(0,0,0,0.9)',
          transform: `scale(${s})`,
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            margin: '0 auto 20px',
            borderRadius: '50%',
            background: '#1e293b',
            border: `6px solid ${DAWN_GOLD}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 88,
            fontWeight: 900,
            color: DAWN_GOLD,
          }}
        >
          ?
        </div>
        <div style={{fontSize: 64, fontWeight: 900, color: '#fff', lineHeight: 1.2}}>কীভাবে জানেন?</div>
      </div>
    );
  },
});

const WinFirst = R({
  place: DarkBase,
  back: (_f, d) => <Photo src="dawn/dawn-horizon.jpg" dur={d} dim={0.35} zoom={[1.0, 1.09]} />,
  over: (f) => {
    const s = spring({frame: f - 2, fps: 30, config: {damping: 11}});
    return (
      <>
        <TopTag label="সকালের প্রথম বিজয়" color={EMERALD} />
        <div
          style={{
            position: 'absolute',
            left: 85,
            right: 85,
            top: 350,
            padding: '44px 34px',
            borderRadius: 34,
            background: 'rgba(7,15,24,0.9)',
            border: `5px solid ${EMERALD}`,
            textAlign: 'center',
            boxShadow: '0 28px 80px rgba(0,0,0,0.88)',
            transform: `scale(${s})`,
          }}
        >
          <div style={{fontSize: 38, fontWeight: 800, color: '#6ee7b7'}}>মনস্তাত্ত্বিক পরীক্ষা</div>
          <div style={{fontSize: 64, fontWeight: 900, color: '#fff', lineHeight: 1.24, marginTop: 12}}>
            আপনি জিতে গেছেন ✓
          </div>
        </div>
      </>
    );
  },
});

const FeetPart1 = R({
  place: DarkBase,
  back: (_f, d) => <Photo src="dawn/feet-floor.jpg" dur={d} zoom={[1.0, 1.08]} origin="50% 25%" dim={0.18} />,
  over: () => <TopBanner text="মিষ্টি ঘুমের লোভ ছাড়া" sub="কম্বলের আরাম পেছনে ফেলে..." color={DAWN_GOLD} />,
});

const FeetPart2 = R({
  place: DarkBase,
  back: (_f, d) => <Photo src="dawn/feet-floor.jpg" dur={d} zoom={[1.08, 1.18]} origin="55% 60%" dim={0.12} />,
  over: () => <TopBanner text="বিছানা থেকে পা মাটিতে! ✓" sub="সিদ্ধান্ত বদলের আসল মুহূর্ত" color={EMERALD} />,
});

// ১৭টি দ্রুত ও প্রাণবন্ত দৃশ্য (`src/dawn/segments.json`-এর প্রতিটি ID)
const SCENES: Record<string, React.FC<SP>> = {
  // ১. অ্যালার্ম বা ফজরের আজান (হুক)
  alarm: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="dawn/fajr-alarm.jpg" dur={dur} zoom={[1.0, 1.12]} origin="55% 65%" dim={0.2} />,
    over: (f) => {
      const s = spring({frame: f - 1, fps: 30, config: {damping: 10}});
      return (
        <>
          <TopTag label="ভোর ৫:০০ AM" color={DAWN_GOLD} />
          <div
            style={{
              position: 'absolute',
              left: 95,
              right: 95,
              top: 310,
              padding: '38px 32px',
              borderRadius: 34,
              background: 'rgba(8,12,24,0.88)',
              border: `5px solid ${DAWN_GOLD}`,
              textAlign: 'center',
              boxShadow: '0 26px 85px rgba(0,0,0,0.88)',
              transform: `scale(${s})`,
            }}
          >
            <div style={{fontSize: 40, fontWeight: 800, color: '#fde68a'}}>আজ ভোরবেলা</div>
            <div style={{fontSize: 72, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginTop: 8}}>
              অ্যালার্ম বেজেছে!
            </div>
          </div>
        </>
      );
    },
  }),

  // ২. ফজরের আজান ও ভোরের নীরব আহ্বান
  fajr: R({
    place: FajrSkyBg,
    over: (f, dur) => {
      const s = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const wave = interpolate(f, [0, dur], [0.5, 1], clampOpts);
      return (
        <>
          <TopTag label="ফজরের সময়" color={EMERALD} />
          <div
            style={{
              position: 'absolute',
              left: 90,
              right: 90,
              top: 315,
              padding: '44px 34px',
              borderRadius: 34,
              background: 'rgba(7,15,28,0.9)',
              border: `5px solid ${EMERALD}`,
              textAlign: 'center',
              boxShadow: '0 26px 85px rgba(0,0,0,0.88)',
              transform: `scale(${s})`,
            }}
          >
            <svg width={320} height={190} viewBox="0 0 320 190" style={{margin: '0 auto 14px'}}>
              <path d="M160 22 C135 52 132 76 132 104 L188 104 C188 76 185 52 160 22 Z" fill={DAWN_GOLD} stroke={LINE} strokeWidth={5} />
              <rect x={122} y={104} width={76} height={66} rx={8} fill="#0f766e" stroke={LINE} strokeWidth={5} />
              <circle cx={238} cy={52} r={22} fill="none" stroke={DAWN_GOLD} strokeWidth={5} opacity={wave} />
              <circle cx={238} cy={52} r={40} fill="none" stroke={EMERALD} strokeWidth={4} opacity={wave * 0.6} />
            </svg>
            <div style={{fontSize: 60, fontWeight: 900, color: '#fff'}}>ফজরের আজান</div>
            <div style={{fontSize: 34, fontWeight: 700, color: '#a7f3d0', marginTop: 8}}>দিনের সবচেয়ে বড় পরীক্ষা শুরু</div>
          </div>
        </>
      );
    },
  }),

  // ৩. মনস্তাত্ত্বিক পরীক্ষায় জয় -> "কীভাবে জানেন?"
  win: Two(WinFirst, WinQuestion, 0.8),

  // ৪. Behavioral Psychology (বাম পাশে কার্ড + নিচে ডানে Dr. Obocheton ন্যারেটর পপ!)
  psych: R({
    place: FajrSkyBg,
    over: (f) => {
      const p1 = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const p2 = spring({frame: f - 10, fps: 30, config: {damping: 11}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 75,
            top: 245,
            width: 650,
            padding: '42px 34px',
            borderRadius: 32,
            background: 'rgba(8,14,28,0.92)',
            border: `5px solid ${DAWN_BLUE}`,
            boxShadow: '0 26px 80px rgba(0,0,0,0.88)',
            transform: `scale(${p1})`,
          }}
        >
          <div style={{fontSize: 30, fontWeight: 800, color: '#7dd3fc', letterSpacing: 1.5}}>SCIENTIFIC INSIGHT</div>
          <div style={{fontSize: 56, fontWeight: 900, color: '#fff', lineHeight: 1.24, marginTop: 10}}>
            আচরণগত মনোবিজ্ঞান
          </div>
          <div
            style={{
              marginTop: 18,
              display: 'inline-block',
              padding: '12px 26px',
              borderRadius: 16,
              background: '#0c4a6e',
              border: `3px solid ${DAWN_BLUE}`,
              fontSize: 34,
              fontWeight: 900,
              color: '#e0f2fe',
              transform: `scale(${p2})`,
              opacity: p2,
            }}
          >
            Behavioral Psychology
          </div>
        </div>
      );
    },
  }),

  // ৫. সারাদিন নিজের লক্ষ্যে কতটা অটল থাকবে
  target: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="dawn/dawn-horizon.jpg" dur={dur} dim={0.5} zoom={[1.0, 1.1]} />,
    over: (f, dur) => {
      const pct = Math.round(interpolate(f, [2, Math.max(8, dur * 0.72)], [18, 100], clampOpts));
      const s = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 85,
            right: 85,
            top: 310,
            padding: '42px 34px',
            borderRadius: 34,
            background: 'rgba(7,12,24,0.92)',
            border: `5px solid ${EMERALD}`,
            textAlign: 'center',
            boxShadow: '0 28px 85px rgba(0,0,0,0.9)',
            transform: `scale(${s})`,
          }}
        >
          <div style={{fontSize: 38, fontWeight: 800, color: '#a7f3d0'}}>সারাদিনের ফোকাস ও দৃঢ়তা</div>
          <div style={{fontSize: 108, fontWeight: 900, color: DAWN_GOLD, lineHeight: 1.1, marginTop: 10}}>{bn(pct)}%</div>
          <div style={{marginTop: 18, height: 24, borderRadius: 99, background: '#1e293b', overflow: 'hidden', border: `3px solid ${LINE}`}}>
            <div style={{width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${EMERALD}, ${DAWN_GOLD})`}} />
          </div>
          <div style={{fontSize: 34, fontWeight: 800, color: '#fff', marginTop: 16}}>নিজের লক্ষ্যে অটল থাকার ক্ষমতা</div>
        </div>
      );
    },
  }),

  // ৬. ঘুম ভাঙার প্রথম ৫ সেকেন্ড!
  sec5: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="dawn/fajr-alarm.jpg" dur={dur} dim={0.55} zoom={[1.05, 1.15]} />,
    over: (f, dur) => {
      const s = spring({frame: f - 1, fps: 30, config: {damping: 10}});
      const sec = Math.max(1, 5 - Math.floor(interpolate(f, [0, dur * 0.78], [0, 4.99], clampOpts)));
      return (
        <div
          style={{
            position: 'absolute',
            left: 95,
            right: 95,
            top: 295,
            padding: '44px 34px',
            borderRadius: 36,
            background: 'rgba(10,12,24,0.93)',
            border: `6px solid ${DAWN_GOLD}`,
            textAlign: 'center',
            boxShadow: '0 28px 90px rgba(0,0,0,0.9)',
            transform: `scale(${s})`,
          }}
        >
          <div style={{fontSize: 38, fontWeight: 800, color: '#fde68a'}}>নির্ধারক মুহূর্ত</div>
          <div style={{fontSize: 146, fontWeight: 900, color: RED, lineHeight: 1.04, marginTop: 8}}>{bn(sec)}</div>
          <div style={{fontSize: 48, fontWeight: 900, color: '#fff', marginTop: 6}}>ঘুম ভাঙার প্রথম {bn(5)} সেকেন্ড!</div>
        </div>
      );
    },
  }),

  // ৭. অ্যালার্ম বাজার পর "আর ৫ মিনিট" বলে ঘুমিয়ে পড়া (ফোন UI)
  snooze: R({
    place: FajrSkyBg,
    over: (f, dur) => {
      const s = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const pulse = interpolate(f % 18, [0, 9, 18], [1, 0.94, 1], clampOpts);
      const press = interpolate(f, [Math.round(dur * 0.4), Math.round(dur * 0.65)], [0, 1], clampOpts);
      return (
        <div
          style={{
            position: 'absolute',
            left: 140,
            right: 140,
            top: 255,
            padding: '44px 34px',
            borderRadius: 44,
            background: '#0b0f19',
            border: `7px solid #334155`,
            textAlign: 'center',
            boxShadow: '0 32px 95px rgba(0,0,0,0.92)',
            transform: `scale(${s})`,
          }}
        >
          <div style={{fontSize: 32, fontWeight: 800, color: '#94a3b8'}}>ফোন অ্যালার্ম</div>
          <div style={{fontSize: 108, fontWeight: 900, color: '#fff', lineHeight: 1.08, marginTop: 8}}>০৫:০৫</div>
          <div style={{fontSize: 30, fontWeight: 700, color: '#cbd5e1', marginBottom: 28}}>AM · ফজরের সময়</div>
          <div
            style={{
              padding: '22px 28px',
              borderRadius: 24,
              background: press > 0.5 ? '#b91c1c' : DAWN_GOLD,
              color: press > 0.5 ? '#fff' : '#0f172a',
              fontSize: 46,
              fontWeight: 900,
              transform: `scale(${pulse})`,
              boxShadow: '0 14px 36px rgba(0,0,0,0.55)',
            }}
          >
            আর {bn(5)} মিনিট (Snooze)
          </div>
          <div style={{marginTop: 22, fontSize: 32, fontWeight: 800, color: press > 0.5 ? '#fca5a5' : '#64748b'}}>
            {press > 0.5 ? 'আবার ঘুমিয়ে পড়ল ×' : 'প্রথম পরাজয়ের ফাঁদ...'}
          </div>
        </div>
      );
    },
  }),

  // ৮. মস্তিষ্ককে সিগন্যাল দেওয়া
  signal: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="dawn/brain-amcc.jpg" dur={dur} dim={0.48} zoom={[1.0, 1.1]} />,
    over: (f, dur) => {
      const s = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const dash = interpolate(f, [0, dur], [260, 0], clampOpts);
      return (
        <div
          style={{
            position: 'absolute',
            left: 85,
            right: 85,
            top: 295,
            padding: '40px 32px',
            borderRadius: 34,
            background: 'rgba(18,10,16,0.9)',
            border: `5px solid ${RED}`,
            textAlign: 'center',
            boxShadow: '0 26px 85px rgba(0,0,0,0.9)',
            transform: `scale(${s})`,
          }}
        >
          <div style={{fontSize: 34, fontWeight: 800, color: '#fca5a5'}}>BRAIN SIGNAL ALERT</div>
          <svg width={440} height={110} viewBox="0 0 440 110" style={{margin: '16px auto'}}>
            <polyline
              points="10,55 95,55 130,22 170,92 215,18 255,86 290,55 430,55"
              fill="none"
              stroke={RED}
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={520}
              strokeDashoffset={dash}
            />
          </svg>
          <div style={{fontSize: 52, fontWeight: 900, color: '#fff'}}>মস্তিষ্কে নেতিবাচক সিগন্যাল!</div>
        </div>
      );
    },
  }),

  // ৯. "আমার লক্ষ্যের চেয়ে আমার আরাম বড়"
  comfort: R({
    place: FajrSkyBg,
    over: (f) => {
      const p1 = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      const p2 = spring({frame: f - 9, fps: 30, config: {damping: 10}});
      return (
        <div style={{position: 'absolute', left: 75, right: 75, top: 270, display: 'flex', flexDirection: 'column', gap: 24}}>
          <div
            style={{
              padding: '32px 30px',
              borderRadius: 28,
              background: 'rgba(15,23,42,0.92)',
              border: '4px solid #475569',
              textAlign: 'center',
              transform: `scale(${p1})`,
            }}
          >
            <div style={{fontSize: 34, fontWeight: 800, color: '#94a3b8'}}>আমার লক্ষ্য</div>
            <div style={{fontSize: 48, fontWeight: 900, color: '#64748b', marginTop: 6}}>পিছনে পড়ে যায় ↓</div>
          </div>
          <div
            style={{
              padding: '38px 30px',
              borderRadius: 28,
              background: 'rgba(69,10,10,0.94)',
              border: `6px solid ${RED}`,
              textAlign: 'center',
              boxShadow: '0 26px 80px rgba(0,0,0,0.9)',
              transform: `scale(${p2})`,
              opacity: p2,
            }}
          >
            <div style={{fontSize: 34, fontWeight: 800, color: '#fca5a5'}}>আরাম জিতে যায়!</div>
            <div style={{fontSize: 52, fontWeight: 900, color: '#fff', marginTop: 8}}>লক্ষ্যের চেয়ে আরাম বড় ❌</div>
          </div>
        </div>
      );
    },
  }),

  // ১০. শীতের/ভোরের ঘুম ছেড়ে বিছানা থেকে পা মাটিতে (Two split)
  feet: Two(FeetPart1, FeetPart2, 0.48),

  // ১১. মস্তিষ্কের Anterior Midcingulate Cortex (aMCC)
  amcc: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="dawn/brain-amcc.jpg" dur={dur} zoom={[1.0, 1.15]} origin="50% 48%" dim={0.12} />,
    over: (f) => {
      const s = spring({frame: f - 2, fps: 30, config: {damping: 11}});
      return (
        <>
          <TopTag label="NEUROSCIENCE · aMCC" color={DAWN_GOLD} />
          <div
            style={{
              position: 'absolute',
              left: 75,
              right: 75,
              top: 235,
              padding: '30px 28px',
              borderRadius: 28,
              background: 'rgba(6,11,22,0.9)',
              border: `5px solid ${DAWN_GOLD}`,
              textAlign: 'center',
              boxShadow: '0 24px 70px rgba(0,0,0,0.9)',
              transform: `scale(${s})`,
            }}
          >
            <div style={{fontSize: 32, fontWeight: 800, color: '#6ee7b7'}}>মস্তিষ্কের বিশেষ অংশ</div>
            <div style={{fontSize: 44, fontWeight: 900, color: '#fff', lineHeight: 1.24, marginTop: 6}}>
              Anterior Midcingulate Cortex
            </div>
          </div>
        </>
      );
    },
  }),

  // ১২. ইচ্ছাশক্তির পেশি আরও শক্তিশালী হয়ে ওঠে!
  willpower: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="dawn/brain-amcc.jpg" dur={dur} zoom={[1.1, 1.2]} origin="50% 48%" dim={0.38} />,
    over: (f, dur) => {
      const power = Math.round(interpolate(f, [2, Math.round(dur * 0.78)], [42, 100], clampOpts));
      const boost = spring({frame: f - Math.round(dur * 0.45), fps: 30, config: {damping: 10}});
      const s = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 85,
            right: 85,
            top: 285,
            padding: '42px 34px',
            borderRadius: 34,
            background: 'rgba(6,12,24,0.92)',
            border: `5px solid ${EMERALD}`,
            textAlign: 'center',
            boxShadow: '0 28px 90px rgba(0,0,0,0.92)',
            transform: `scale(${s})`,
          }}
        >
          <div style={{fontSize: 42, fontWeight: 900, color: DAWN_GOLD}}>ইচ্ছাশক্তির পেশি</div>
          <div style={{fontSize: 106, fontWeight: 900, color: '#fff', lineHeight: 1.08, marginTop: 8}}>{bn(power)}%</div>
          <div style={{marginTop: 18, height: 26, borderRadius: 99, background: '#1e293b', overflow: 'hidden', border: `3px solid ${LINE}`}}>
            <div style={{width: `${power}%`, height: '100%', background: `linear-gradient(90deg, ${DAWN_GOLD}, ${EMERALD})`}} />
          </div>
          <div
            style={{
              marginTop: 22,
              display: 'inline-block',
              padding: '12px 26px',
              borderRadius: 16,
              background: '#064e3b',
              border: `3px solid ${EMERALD}`,
              fontSize: 38,
              fontWeight: 900,
              color: '#a7f3d0',
              transform: `scale(${boost})`,
              opacity: boost,
            }}
          >
            আরও শক্তিশালী হচ্ছে ↑
          </div>
        </div>
      );
    },
  }),

  // ১৩. সফল হওয়ার জন্য বিশাল কিছুর দরকার হয় না
  simple: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="dawn/dawn-horizon.jpg" dur={dur} dim={0.44} zoom={[1.0, 1.09]} />,
    over: (f) => {
      const s = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 85,
            right: 85,
            top: 340,
            padding: '44px 34px',
            borderRadius: 34,
            background: 'rgba(8,14,26,0.9)',
            border: `5px solid ${DAWN_GOLD}`,
            textAlign: 'center',
            boxShadow: '0 26px 85px rgba(0,0,0,0.9)',
            transform: `scale(${s})`,
          }}
        >
          <div style={{fontSize: 38, fontWeight: 800, color: '#fde68a'}}>সহজ সত্য</div>
          <div style={{fontSize: 56, fontWeight: 900, color: '#fff', lineHeight: 1.28, marginTop: 10}}>
            বিশাল কিছুর দরকার নেই!
          </div>
        </div>
      );
    },
  }),

  // ১৪. ভোর ৫টায় নিজের কম্বল আর আলস্যকে হারানো (Toon চরিত্র)
  beat5am: R({
    place: FajrSkyBg,
    actors: [{look: MORNING_HERO, x: 540, y: 1590, h: 980, expression: 'smile', gesture: 'thumbsUp'}],
    over: () => <TopBanner text="ভোর ৫টায় প্রথম জয় ✓" sub="কম্বল আর আলস্য পরাজিত!" color={EMERALD} top={210} />,
  }),

  // ১৫. দুনিয়ার কোনো বাধাই আটকাতে পারে না!
  unstop: R({
    place: DarkBase,
    back: (_f, dur) => <Photo src="dawn/dawn-horizon.jpg" dur={dur} zoom={[1.04, 1.15]} origin="50% 42%" dim={0.18} />,
    over: (f) => {
      const s = spring({frame: f - 1, fps: 30, config: {damping: 10}});
      return (
        <>
          <TopTag label="অপ্রতিরোধ্য মানসিকতা" color={DAWN_GOLD} />
          <div
            style={{
              position: 'absolute',
              left: 85,
              right: 85,
              top: 265,
              padding: '38px 32px',
              borderRadius: 32,
              background: 'rgba(8,13,24,0.88)',
              border: `5px solid ${DAWN_GOLD}`,
              textAlign: 'center',
              boxShadow: '0 26px 85px rgba(0,0,0,0.88)',
              transform: `scale(${s})`,
            }}
          >
            <div style={{fontSize: 54, fontWeight: 900, color: '#fff', lineHeight: 1.25}}>
              কোনো বাধাই আটকাতে পারে না!
            </div>
          </div>
        </>
      );
    },
  }),

  // ১৬. আপনি যদি ভোরবেলা উঠে থাকেন...
  community: R({
    place: FajrSkyBg,
    over: (f) => {
      const s = spring({frame: f - 1, fps: 30, config: {damping: 11}});
      return (
        <div
          style={{
            position: 'absolute',
            left: 100,
            right: 100,
            top: 410,
            padding: '44px 36px',
            borderRadius: 36,
            background: 'rgba(8,14,26,0.92)',
            border: `5px solid ${DAWN_GOLD}`,
            textAlign: 'center',
            boxShadow: '0 28px 90px rgba(0,0,0,0.9)',
            transform: `scale(${s})`,
          }}
        >
          <div style={{fontSize: 54, fontWeight: 900, color: DAWN_GOLD, lineHeight: 1.3}}>সকালের নীরব বিজয়ীদের কাতারে?</div>
        </div>
      );
    },
  }),

  // ১৭. Jawad-এর কাস্টম কমেন্ট CTA: "কমেন্টে লিখুন — Alhamdulillah"
  cta: ({dur}) => {
    const f = useCurrentFrame();
    const s = spring({frame: f - 1, fps: 30, config: {damping: 10}});
    const pulse = interpolate(f, [0, Math.max(1, dur)], [1, 1.06], clampOpts);
    return (
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #050a14 0%, #0b1628 50%, #050912 100%)'}}>
        <div
          style={{
            position: 'absolute',
            left: 90,
            right: 90,
            top: 310,
            padding: '48px 36px',
            borderRadius: 38,
            background: 'rgba(9,16,30,0.95)',
            border: `6px solid ${EMERALD}`,
            textAlign: 'center',
            boxShadow: '0 32px 100px rgba(0,0,0,0.92)',
            transform: `scale(${s})`,
          }}
        >
          <div style={{fontSize: 42, fontWeight: 900, color: '#cbd5e1'}}>এখনই কমেন্টে লিখুন</div>
          <div
            style={{
              marginTop: 26,
              padding: '26px 32px',
              borderRadius: 28,
              background: '#064e3b',
              border: `5px solid ${DAWN_GOLD}`,
              fontSize: 68,
              fontWeight: 900,
              color: '#fff',
              transform: `scale(${pulse})`,
              boxShadow: '0 18px 46px rgba(0,0,0,0.65)',
            }}
          >
            Alhamdulillah
          </div>
          <div style={{marginTop: 26, fontSize: 34, fontWeight: 800, color: DAWN_GOLD}}>BBA · Be Beyond Average</div>
        </div>
      </AbsoluteFill>
    );
  },
};

// থাম্বনেইল (ফ্রেম ০ থেকেই ১০০% দৃশ্যমান)
const Thumb: React.FC = () => (
  <PsyThumb
    l1="ভোর ৫টার মানসিক পরীক্ষা"
    l2="প্রথম ৫ সেকেন্ডেই দিন জয়!"
    bottom="সকালের নীরব বিজয়ী আপনি?"
    term="Behavioral Psychology · aMCC"
    glow="rgba(245,158,11,0.34)"
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
          border: `6px solid ${DAWN_GOLD}`,
          boxShadow: '0 26px 80px rgba(0,0,0,0.9)',
        }}
      >
        <Img src={staticFile('dawn/brain-amcc.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 48%'}} />
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            padding: '12px 24px',
            borderRadius: 18,
            background: '#064e3b',
            border: `4px solid ${EMERALD}`,
            fontSize: 40,
            fontWeight: 900,
            color: '#fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.85)',
          }}
        >
          5:00 AM ✓
        </div>
        <div
          style={{
            position: 'absolute',
            left: 20,
            bottom: 20,
            padding: '10px 24px',
            borderRadius: 16,
            background: '#0f172a',
            border: `4px solid ${DAWN_GOLD}`,
            fontSize: 38,
            fontWeight: 900,
            color: DAWN_GOLD,
            boxShadow: '0 10px 30px rgba(0,0,0,0.85)',
          }}
        >
          ইচ্ছাশক্তির পেশি!
        </div>
      </div>
    }
  />
);

export const dawn = story('dawn/', raw, SCENES, Thumb, {logo: 'bba2'});
