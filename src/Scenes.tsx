import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CHANNEL_NAME, Visual} from './script';
import {
  BG,
  BladeShape,
  BulletShape,
  Cam,
  DIM,
  FG,
  GOLD,
  Gallery,
  LOOKS,
  Marina,
  Obj,
  ObjectName,
  PINK,
  PistolShape,
  Person,
  Place,
  RED,
  Table,
  Vignette,
} from './art';

export {BG, FG, GOLD};

const clampOpts = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const out = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], {...clampOpts, easing: Easing.out(Easing.cubic)});
const inOut = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], {...clampOpts, easing: Easing.inOut(Easing.cubic)});

// প্রতি ~৩.৫ সেকেন্ডে একবার পলক
const blinkAt = (f: number, offset = 0) => {
  const t = (f + offset) % 104;
  return t < 5 ? 1 - Math.abs(t - 2.5) / 2.5 : 0;
};

type SP = {dur: number};

const Title: React.FC<{children: React.ReactNode; top?: number; size?: number; color?: string; opacity?: number}> = ({
  children,
  top = 190,
  size = 96,
  color = FG,
  opacity = 1,
}) => (
  <div
    style={{
      position: 'absolute',
      top,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: size,
      fontWeight: 700,
      color,
      opacity,
      textShadow: '0 6px 30px rgba(0,0,0,0.85)',
    }}
  >
    {children}
  </div>
);

// Marina-র মাপ: height H, নিচ-মাঝখান (x,y)
const M_H = 1100;
const M_X = 540;
const M_Y = 1390;
const mTop = M_Y - M_H; // মাথার ওপরের y
const mPt = (vx: number, vy: number, h = M_H, x = M_X, y = M_Y) => [x - h * 0.2 + vx * (h / 1000), y - h + vy * (h / 1000)] as const;

// ---------- ১. টেবিলের জিনিস ----------

const FRONT: ObjectName[] = ['hammer', 'rose', 'feather', 'honey', 'scissors', 'blade', 'pistol', 'bullet'];
const BACK: ObjectName[] = ['candle', 'wine', 'bread', 'chain', 'perfume', 'apple', 'lipstick'];
const FOCUS: {name: ObjectName[]; at: number}[] = [
  {name: ['rose'], at: 0.3},
  {name: ['feather'], at: 0.42},
  {name: ['honey'], at: 0.54},
  {name: ['pistol', 'bullet'], at: 0.68},
];

const Objects: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const t = f / dur;
  const focus = [...FOCUS].reverse().find((x) => t >= x.at);
  const danger = focus?.name.includes('pistol') ?? false;
  const zoom = interpolate(f, [0, dur], [1.32, 1.08]);
  const renderRow = (row: ObjectName[], y: number, size: number, x0: number, x1: number, delay: number) =>
    row.map((name, i) => {
      const x = x0 + ((x1 - x0) * i) / (row.length - 1);
      const show = out(f, delay + i * 3, delay + i * 3 + 12);
      const focused = focus?.name.includes(name) ?? false;
      const lift = focused ? out(f, (focus!.at * dur), focus!.at * dur + 8) : 0;
      const dimmed = focus && !focused ? (danger ? 0.3 : 0.65) : 1;
      return (
        <Place key={name} x={x} y={y - lift * 30}>
          <div
            style={{
              opacity: show * dimmed,
              transform: `scale(${show * (1 + lift * 0.45)})`,
              transformOrigin: '50% 100%',
              filter: focused ? `drop-shadow(0 0 ${danger ? 26 : 16}px ${danger ? RED : 'rgba(255,230,180,0.8)'})` : 'drop-shadow(0 8px 6px rgba(0,0,0,0.45))',
            }}
          >
            <Obj name={name} size={size} />
          </div>
        </Place>
      );
    });
  return (
    <AbsoluteFill>
      <Gallery tint={danger ? 'red' : 'warm'} spot={danger ? 0.7 : 1} />
      <Cam zoom={zoom} y={1100}>
        <Place x={540} y={1420}>
          <Table width={1080} />
        </Place>
        {renderRow(BACK, 1112, 92, 150, 930, 0)}
        {renderRow(FRONT, 1190, 118, 90, 990, 6)}
      </Cam>
      <Vignette strength={0.7} />
      <Title top={170} size={210} color={GOLD} opacity={out(f, 0, 12)}>
        {Math.min(72, Math.round(out(f, 0, 34, 0, 72)))}
      </Title>
      <Title top={420} size={44} opacity={out(f, 10, 24) * 0.8}>
        <span style={{letterSpacing: 12}}>OBJECTS · 6 HOURS · 1974</span>
      </Title>
    </AbsoluteFill>
  );
};

// ---------- ২. মেয়েটা ----------

const FigureScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const spot = out(f, 0, 16);
  return (
    <AbsoluteFill>
      <Gallery spot={spot} spotX={460} />
      <Cam zoom={interpolate(f, [0, dur], [1, 1.12])} x={500} y={900}>
        <Place x={900} y={1440}>
          <Table width={760} />
        </Place>
        <Place x={760} y={1222}>
          <Obj name="rose" size={90} />
        </Place>
        <Place x={880} y={1222}>
          <Obj name="pistol" size={96} />
        </Place>
        <Place x={990} y={1222}>
          <Obj name="honey" size={84} />
        </Place>
        <Place x={460} y={M_Y}>
          <div style={{opacity: out(f, 3, 18)}}>
            <Marina height={M_H} blink={blinkAt(f, 60)} />
          </div>
        </Place>
      </Cam>
      <Vignette />
    </AbsoluteFill>
  );
};

// ---------- ৩. ১৯৭৪, Naples ----------

const PlaceScene: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const drop = spring({frame: f - 4, fps: 30, config: {damping: 15}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 40%, #2a221c, #0b0908 75%)'}}>
      <Title top={170} size={250} color={GOLD} opacity={out(f, 0, 12)}>
        1974
      </Title>
      <div
        style={{
          position: 'absolute',
          left: 160,
          top: 520,
          width: 760,
          padding: '28px 28px 110px',
          background: '#efe6d2',
          boxShadow: '0 40px 90px rgba(0,0,0,0.7)',
          transform: `translateY(${(1 - drop) * 160}px) rotate(${-3 + (1 - drop) * 6}deg)`,
          opacity: drop,
        }}
      >
        <div style={{position: 'relative', height: 620, overflow: 'hidden', filter: 'sepia(0.85) contrast(1.05) brightness(0.9)'}}>
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #3a3029, #1c1612 70%, #2c241e)'}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 470, bottom: 0, background: '#4a3c30'}} />
          <Place x={250} y={560}>
            <Marina height={470} />
          </Place>
          <Place x={500} y={600}>
            <Table width={420} />
          </Place>
          {[60, 650].map((x, i) => (
            <Place key={x} x={x} y={640}>
              <Person height={300} facing="back" {...LOOKS[i + 2]} />
            </Place>
          ))}
        </div>
        <div style={{position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', color: '#3a2e24', fontSize: 40, fontStyle: 'italic'}}>
          Studio Morra
        </div>
      </div>
      <Title top={1300} size={92} opacity={out(f, 16, 30)}>
        Naples
      </Title>
      <Title top={1410} size={46} opacity={out(f, 24, 38) * 0.7}>
        <span style={{letterSpacing: 10}}>ITALY</span>
      </Title>
    </AbsoluteFill>
  );
};

// ---------- ৪. "I am the object." ----------

const Sign: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const text = 'I am the object.';
  const typed = Math.floor(out(f, 16, Math.min(dur * 0.65, 75), 0, text.length));
  const pop = spring({frame: f - 8, fps: 30, config: {damping: 14}});
  return (
    <AbsoluteFill>
      <Gallery />
      <Cam zoom={interpolate(f, [0, dur], [1.05, 1.15])} y={900}>
        <Place x={M_X} y={M_Y}>
          <Marina height={M_H} blink={blinkAt(f, 30)} />
        </Place>
      </Cam>
      <div
        style={{
          position: 'absolute',
          left: 170,
          width: 740,
          top: 1040,
          padding: '60px 30px',
          background: '#efe6d2',
          color: '#15151b',
          borderRadius: 8,
          textAlign: 'center',
          transform: `rotate(-2deg) scale(${0.8 + 0.2 * pop})`,
          opacity: pop,
          boxShadow: '0 40px 90px rgba(0,0,0,0.75)',
          fontSize: 84,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
        }}
      >
        {text.slice(0, typed)}
        <span style={{opacity: Math.floor(f / 8) % 2 ? 0 : 1}}>|</span>
      </div>
      <Vignette />
      <Title top={150} size={70} color={GOLD} opacity={out(f, 4, 20)}>
        Marina Abramović
      </Title>
    </AbsoluteFill>
  );
};

// ---------- ৫. ছয় ঘণ্টার নিয়ম ----------

const RULES = [
  'Instructions.',
  'There are 72 objects on the table that one can use on me as desired.',
  'I am the object.',
  'During this period I take full responsibility.',
  'Duration: 6 hours (8 pm – 2 am)',
];

const Clock: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [6, dur * 0.95], [0, 1], clampOpts);
  const R = 170;
  const circ = 2 * Math.PI * R;
  const hour = Math.min(6, Math.floor(p * 6.999));
  return (
    <AbsoluteFill>
      <Gallery spot={0.6} />
      <div style={{position: 'absolute', top: 140, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40}}>
        <svg width={420} height={420} viewBox="-210 -210 420 420">
          <circle r={R} fill="rgba(0,0,0,0.35)" stroke={DIM} strokeWidth={18} />
          <circle r={R} fill="none" stroke={RED} strokeWidth={18} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - p)} transform="rotate(-90)" />
          {Array.from({length: 12}, (_, i) => (
            <line key={i} x1={0} y1={-R + 30} x2={0} y2={-R + 46} stroke={FG} strokeWidth={5} opacity={0.6} transform={`rotate(${i * 30})`} />
          ))}
          <line x1={0} y1={0} x2={0} y2={-R + 60} stroke={FG} strokeWidth={8} strokeLinecap="round" transform={`rotate(${p * 180})`} />
          <circle r={11} fill={FG} />
        </svg>
        <div style={{fontSize: 130, fontWeight: 700, color: FG}}>
          {['০', '১', '২', '৩', '৪', '৫', '৬'][hour]}
          <div style={{fontSize: 60, opacity: 0.8}}>ঘণ্টা</div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 110,
          right: 110,
          top: 650,
          padding: '54px 56px',
          background: '#efe6d2',
          color: '#1a1a20',
          borderRadius: 6,
          transform: `rotate(1.5deg) translateY(${out(f, 0, 14, 80, 0)}px)`,
          opacity: out(f, 0, 12),
          boxShadow: '0 40px 90px rgba(0,0,0,0.7)',
          fontFamily: '"Courier New", monospace',
          fontSize: 40,
          lineHeight: 1.45,
        }}
      >
        {RULES.map((line, i) => (
          <div key={i} style={{opacity: out(f, 8 + i * (dur * 0.13), 18 + i * (dur * 0.13)), marginBottom: 16, fontWeight: i === 2 ? 700 : 400, fontSize: i === 2 ? 52 : 40}}>
            {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ---------- ৬. প্রথমে সবাই ভদ্র ----------

const Gentle: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const inL = inOut(f, 0, dur * 0.35);
  const inR = inOut(f, dur * 0.4, dur * 0.7);
  const [cx, cy] = mPt(240, 205);
  return (
    <AbsoluteFill>
      <Gallery />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 35%, rgba(232,160,180,0.16), rgba(0,0,0,0) 60%)'}} />
      <Place x={M_X} y={M_Y}>
        <Marina height={M_H} blink={blinkAt(f, 12)} lookX={interpolate(f, [0, dur], [-0.5, 0.5])} />
      </Place>
      <div style={{position: 'absolute', left: cx - 22, top: cy - 16, opacity: out(f, dur * 0.68, dur * 0.78), fontSize: 40, color: '#d4405e', transform: 'rotate(-12deg)'}}>
        ❤
      </div>
      <Place x={interpolate(inL, [0, 1], [-260, 250])} y={2060}>
        <Person height={1050} facing="back" {...LOOKS[1]} armR={interpolate(inL, [0, 1], [10, 128])} holding={<Obj name="rose" size={80} />} />
      </Place>
      <Place x={interpolate(inR, [0, 1], [1360, 850])} y={2080}>
        <Person height={1100} facing="back" {...LOOKS[0]} armL={interpolate(inR, [0, 1], [8, 70])} />
      </Place>
      {Array.from({length: 16}, (_, i) => {
        const x = random(`px${i}`) * 1000 + 40;
        const y = ((f * (2 + random(`ps${i}`) * 3) + random(`py${i}`) * 1900) % 2000) - 80;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x + Math.sin(f / 14 + i) * 30,
              top: y,
              width: 22,
              height: 30,
              borderRadius: '60% 40% 60% 40%',
              background: i % 3 ? PINK : '#d11f3d',
              opacity: 0.6,
              transform: `rotate(${f * 2 + i * 40}deg)`,
            }}
          />
        );
      })}
      <Vignette />
    </AbsoluteFill>
  );
};

// ---------- ৭. তারপর বদলাতে শুরু ----------

const Shift: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const p = out(f, 0, dur * 0.75);
  const flicker = random(`fl${Math.floor(f / 3)}`) > 0.75 ? 0.35 : 1;
  const shake = Math.sin(f * 2.3) * 8 * p;
  return (
    <AbsoluteFill>
      <Gallery spot={flicker} />
      <AbsoluteFill style={{opacity: p}}>
        <Gallery tint="red" spot={flicker} />
      </AbsoluteFill>
      <Cam zoom={1 + 0.08 * p} x={540 + shake} y={940}>
        <Place x={M_X} y={M_Y}>
          <Marina height={M_H} blink={blinkAt(f)} />
        </Place>
        {[60, 280, 520, 780, 1020].map((x, i) => (
          <Place key={x} x={x} y={interpolate(p, [0, 1], [2700, 2080 + (i % 2) * 60])}>
            <Person height={1050 + (i % 2) * 80} facing="back" {...LOOKS[i]} silhouette="#060304" />
          </Place>
        ))}
      </Cam>
      <Vignette color="60,0,8" strength={0.85} />
      <Title top={180} size={150} color={p > 0.5 ? RED : FG} opacity={out(f, 0, 10)}>
        <span style={{display: 'inline-block', transform: `translateX(${shake}px)`}}>তারপর…</span>
      </Title>
    </AbsoluteFill>
  );
};

// ---------- ৮. ব্লেড, কাটা দাগ, রক্ত ----------

const Dark: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const words = ['ব্লেড', 'কাটা দাগ', 'রক্ত'];
  const idx = Math.min(2, Math.floor((f / dur) * 3));
  const local = f - (idx * dur) / 3;
  const slash = inOut(f, 2, 14);
  const torn = out(f, 10, 20);
  const marks = out(f, dur * 0.36, dur * 0.5);
  const pulse = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <AbsoluteFill>
      <Gallery tint="red" spot={0.8} />
      <Cam zoom={interpolate(f, [0, dur], [1.9, 2.15])} x={600} y={620}>
        <Place x={M_X} y={M_Y}>
          <Marina height={M_H} torn={torn} marks={marks} blink={blinkAt(f, 50)} tear={out(f, dur * 0.6, dur)} />
        </Place>
      </Cam>
      {/* ব্লেডের টান */}
      <div
        style={{
          position: 'absolute',
          left: interpolate(slash, [0, 1], [1100, -200]),
          top: interpolate(slash, [0, 1], [380, 1200]),
          transform: 'rotate(-35deg)',
          opacity: f < 18 ? 1 : 0,
        }}
      >
        <svg viewBox="-50 -50 100 100" width={240} height={240} style={{filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.7))'}}>
          <BladeShape />
        </svg>
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: f < 26 ? 1 - out(f, 14, 26) : 0}}>
        <line x1={1100} y1={420} x2={interpolate(slash, [0, 1], [1100, -100])} y2={interpolate(slash, [0, 1], [420, 1280])} stroke="#fff" strokeWidth={6} opacity={0.85} />
      </svg>
      <Vignette color="140,0,20" strength={0.55 + 0.25 * pulse} />
      <Title top={170} size={170} color={idx === 2 ? RED : FG} opacity={out(local, 0, 8)}>
        <span key={idx} style={{display: 'inline-block', transform: `scale(${out(local, 0, 10, 1.25, 1)})`, filter: `blur(${out(local, 0, 8, 12, 0)}px)`}}>
          {words[idx]}
        </span>
      </Title>
    </AbsoluteFill>
  );
};

// ---------- ৯. পিস্তল ----------

const Arm: React.FC<{from: [number, number]; to: [number, number]; sleeve: string; skin?: string; width?: number}> = ({from, to, sleeve, skin = '#d9a785', width = 120}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={sleeve} strokeWidth={width} strokeLinecap="round" />
    <circle cx={to[0]} cy={to[1]} r={width * 0.55} fill={skin} />
  </svg>
);

const Gun: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const t = (a: number) => a * dur;
  const S = 3.6; // পিস্তলের মাপ
  // পিস্তলের অবস্থান: লোড → মাথার পাশে → কেড়ে নেওয়া
  const gx = interpolate(f, [0, t(0.3), t(0.5), t(0.7), t(0.92)], [560, 560, 890, 890, 1500], {...clampOpts, easing: Easing.inOut(Easing.cubic)});
  const gy = interpolate(f, [0, t(0.3), t(0.5), t(0.7), t(0.92)], [330, 330, 950, 950, -300], {...clampOpts, easing: Easing.inOut(Easing.cubic)});
  const bullet = inOut(f, t(0.06), t(0.24));
  const grip: [number, number] = [gx + 22 * S, gy + 14 * S];
  const grab = inOut(f, t(0.56), t(0.7));
  const aim = out(f, t(0.45), t(0.55)) * (1 - out(f, t(0.66), t(0.72)));
  const holderAway = out(f, t(0.72), t(0.9));
  return (
    <AbsoluteFill>
      <Gallery tint="red" spot={0.6} />
      <Cam zoom={interpolate(f, [0, dur], [2.5, 2.7])} x={540} y={470}>
        <Place x={M_X} y={M_Y}>
          <Marina height={M_H} blink={f > t(0.5) ? 0 : blinkAt(f, 20)} tear={out(f, t(0.2), dur)} lookX={-0.2} />
        </Place>
      </Cam>
      <AbsoluteFill style={{background: `rgba(0,0,0,${0.45 * (1 - out(f, t(0.28), t(0.4)))})`}} />
      {/* ধরা হাত */}
      <div style={{position: 'absolute', inset: 0, transform: `translate(${holderAway * 700}px, ${holderAway * 500}px)`}}>
        <Arm from={[grip[0] + 600, grip[1] + 900]} to={grip} sleeve="#2a2f3a" />
      </div>
      {/* কেড়ে নেওয়া হাত */}
      {grab > 0 ? (
        <Arm
          from={[-200, -260]}
          to={[interpolate(grab, [0, 1], [-120, gx - 40]), interpolate(grab, [0, 1], [-140, gy - 20])]}
          sleeve="#4a3a2a"
          skin="#c99271"
          width={110}
        />
      ) : null}
      <div style={{position: 'absolute', left: gx - 50 * S, top: gy - 50 * S}}>
        <svg viewBox="-50 -50 100 100" width={100 * S} height={100 * S} style={{overflow: 'visible'}}>
          <g transform="scale(-1 1)">
            <PistolShape glow={aim > 0.5} />
          </g>
        </svg>
      </div>
      {bullet < 1 ? (
        <div style={{position: 'absolute', left: gx + 5 * S - 60, top: interpolate(bullet, [0, 1], [-60, gy - 13 * S - 60]), opacity: 1 - out(bullet, 0.8, 1)}}>
          <svg viewBox="-50 -50 100 100" width={120} height={120} style={{filter: 'drop-shadow(0 0 14px rgba(255,200,90,0.8))'}}>
            <BulletShape />
          </svg>
        </div>
      ) : null}
      {aim > 0 ? (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: aim}}>
          <circle cx={705} cy={900} r={70 + 10 * Math.sin(f / 3)} stroke={RED} strokeWidth={4} fill="none" />
          <line x1={705} y1={810} x2={705} y2={990} stroke={RED} strokeWidth={3} />
          <line x1={615} y1={900} x2={795} y2={900} stroke={RED} strokeWidth={3} />
        </svg>
      ) : null}
      <Vignette color="80,0,10" strength={0.8} />
    </AbsoluteFill>
  );
};

// ---------- ১০. দুই দল ----------

const Split: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const p = inOut(f, 6, dur * 0.7);
  const H = 900;
  // [শুরু x, শুরু y, শেষ x, শেষ y]
  const guards = [
    [200, 1400, 300, 1440],
    [880, 1400, 780, 1440],
    [420, 1520, 400, 1600],
    [660, 1520, 680, 1600],
  ];
  const others = [
    [330, 1380, 70, 1330],
    [760, 1380, 1010, 1330],
    [540, 1560, 150, 1380],
    [100, 1500, 930, 1380],
  ];
  return (
    <AbsoluteFill>
      <Gallery />
      <Place x={540} y={1300}>
        <Marina height={H} blink={blinkAt(f, 40)} />
      </Place>
      {others.map(([sx, sy, ex, ey], i) => (
        <Place key={`o${i}`} x={interpolate(p, [0, 1], [sx, ex])} y={interpolate(p, [0, 1], [sy, ey])}>
          <Person height={560} facing="back" {...LOOKS[i + 4]} silhouette={p > 0.4 ? '#3a0a12' : undefined} />
        </Place>
      ))}
      {guards.map(([sx, sy, ex, ey], i) => (
        <Place key={`g${i}`} x={interpolate(p, [0, 1], [sx, ex])} y={interpolate(p, [0, 1], [sy, ey])}>
          <Person height={620} facing="front" {...LOOKS[i]} armL={6 + 55 * p} armR={6 + 55 * p} />
        </Place>
      ))}
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 60%, rgba(255,220,160,${0.12 * p}), rgba(0,0,0,0) 45%)`}} />
      <Vignette />
    </AbsoluteFill>
  );
};

// ---------- ১১. ছয় ঘণ্টা পর হেঁটে আসা ----------

const Walk: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, dur], [0, 1], clampOpts);
  const H = interpolate(p, [0, 1], [700, 1500]);
  const bob = Math.abs(Math.sin(f / 7)) * 12;
  return (
    <AbsoluteFill>
      <Gallery spot={0.9} />
      <Place x={540} y={interpolate(p, [0, 1], [1260, 1780]) - bob}>
        <Marina height={H} torn={1} marks={1} tear={0.3 + 0.7 * p} blink={blinkAt(f, 70)} />
      </Place>
      {[[40, 1250], [1040, 1300], [-40, 1450], [1120, 1500]].map(([x, h], i) => (
        <Place key={i} x={x} y={1990}>
          <Person height={h} facing="back" {...LOOKS[i + 2]} silhouette="#070504" />
        </Place>
      ))}
      <Vignette />
      <Title top={150} size={110} color={GOLD} opacity={out(f, 0, 10)}>
        ০৬:০০:০০
      </Title>
    </AbsoluteFill>
  );
};

// ---------- ১২. সবাই পালাল ----------

const Flee: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const people = Array.from({length: 8}, (_, i) => i);
  return (
    <AbsoluteFill>
      <Gallery spot={1} />
      <Place x={M_X} y={M_Y}>
        <Marina height={M_H} torn={1} marks={1} tear={1} blink={blinkAt(f, 10)} />
      </Place>
      {people.map((i) => {
        const dir = i % 2 ? 1 : -1;
        const start = 200 + (i % 4) * 90;
        const speed = 0.6 + random(`fs${i}`) * 0.5;
        const d = Math.pow(Math.max(0, f - i * 2), 1.45) * speed;
        const x = 540 + dir * (start + d);
        const y = 1420 + (i % 3) * 110;
        const run = Math.sin(f * 0.7 + i) * 28;
        return (
          <Place key={i} x={x} y={y}>
            <Person
              height={560 + (i % 3) * 80}
              facing="front"
              {...LOOKS[i % LOOKS.length]}
              stride={run}
              armL={20 + run}
              armR={20 - run}
              style={{opacity: Math.max(0, 1 - f / (dur * 0.85))}}
            />
          </Place>
        );
      })}
      <Vignette />
    </AbsoluteFill>
  );
};

// ---------- ১৩. মরতেও প্রস্তুত ----------

const TextScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const words = ['মরতেও', 'প্রস্তুত'];
  return (
    <AbsoluteFill>
      <Gallery tint="red" spot={0.5} />
      <Cam zoom={interpolate(f, [0, dur], [3.6, 4.1])} x={540} y={475}>
        <Place x={M_X} y={M_Y}>
          <Marina height={M_H} tear={1} blink={blinkAt(f, 80)} />
        </Place>
      </Cam>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0) 45%)'}} />
      <Vignette color="60,0,8" strength={0.7} />
      {words.map((w, i) => (
        <Title key={w} top={150 + i * 230} size={200} color={i === 1 ? RED : FG} opacity={out(f, 6 + i * 16, 22 + i * 16)}>
          <span style={{filter: `blur(${out(f, 6 + i * 16, 22 + i * 16, 14, 0)}px)`, display: 'inline-block'}}>{w}</span>
        </Title>
      ))}
    </AbsoluteFill>
  );
};

// ---------- ১৪. শিক্ষা ----------

const Lesson: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const move = inOut(f, 14, dur * 0.55);
  const warn = out(f, dur * 0.6, dur * 0.8);
  const H = 800;
  const [hx, hy] = mPt(292, 662, H, 300, 1360);
  const ox = interpolate(move, [0, 1], [hx + 40, 760]);
  const oy = interpolate(move, [0, 1], [hy - 120, 820]) - Math.sin(move * Math.PI) * 160;
  return (
    <AbsoluteFill>
      <Gallery spotX={300} spot={0.8} />
      <Place x={300} y={1360}>
        <Marina height={H} blink={blinkAt(f)} lookX={0.8} />
      </Place>
      {[[700, 1380], [860, 1420], [1000, 1370], [780, 1560]].map(([x, y], i) => (
        <Place key={i} x={x} y={y}>
          <Person height={600} facing="front" {...LOOKS[i + 3]} silhouette={warn > 0.5 ? '#4a0c16' : undefined} armL={8 + warn * 50} armR={8 + warn * 50} />
        </Place>
      ))}
      <div
        style={{
          position: 'absolute',
          left: ox - 130,
          top: oy - 130,
          width: 260,
          height: 260,
          borderRadius: '50%',
          border: `10px solid ${warn > 0.3 ? RED : GOLD}`,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56,
          fontWeight: 700,
          color: warn > 0.3 ? RED : GOLD,
          boxShadow: `0 0 70px ${warn > 0.3 ? RED : 'rgba(227,191,122,0.6)'}`,
        }}
      >
        সিদ্ধান্ত
      </div>
      <Vignette />
    </AbsoluteFill>
  );
};

// ---------- ১৫. টেকওয়ে ----------

const Takeaway: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const items = ['সময়', 'টাকা', 'সিদ্ধান্ত'];
  const bigNo = out(f, dur * 0.7, dur * 0.86);
  return (
    <AbsoluteFill>
      <Gallery spot={0.5} />
      <AbsoluteFill style={{background: 'rgba(0,0,0,0.35)'}} />
      <div style={{position: 'absolute', top: 260, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {items.map((t, i) => (
          <div
            key={t}
            style={{
              width: 700,
              margin: '14px 0',
              padding: '26px 0',
              textAlign: 'center',
              fontSize: 78,
              fontWeight: 700,
              border: `4px solid ${GOLD}`,
              borderRadius: 24,
              color: GOLD,
              background: 'rgba(0,0,0,0.35)',
              opacity: out(f, 8 + i * 14, 22 + i * 14) * (1 - bigNo * 0.75),
              transform: `translateX(${out(f, 8 + i * 14, 22 + i * 14, -80, 0)}px)`,
            }}
          >
            {t}
          </div>
        ))}
        <div style={{marginTop: 30, fontSize: 64, opacity: out(f, dur * 0.4, dur * 0.55)}}>
          আগে ঠিক করো: <span style={{color: RED, fontWeight: 700}}>সীমা</span>
        </div>
      </div>
      <div style={{position: 'absolute', top: 980, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <div
          style={{
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: RED,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 190,
            fontWeight: 700,
            transform: `scale(${bigNo})`,
            opacity: bigNo,
            boxShadow: `0 0 90px rgba(224,36,60,0.6)`,
          }}
        >
          না
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- ১৬. ফলো ----------

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: f - 6, fps, config: {damping: 10}});
  const pulse = 1 + 0.04 * Math.sin(f / 6);
  return (
    <AbsoluteFill>
      <Gallery spot={0.8} />
      <Place x={540} y={1000}>
        <Marina height={640} blink={blinkAt(f)} style={{opacity: 0.9}} />
      </Place>
      <div style={{position: 'absolute', top: 1060, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {CHANNEL_NAME ? <div style={{fontSize: 84, fontWeight: 700, marginBottom: 40, color: GOLD}}>{CHANNEL_NAME}</div> : null}
        <div
          style={{
            padding: '40px 100px',
            borderRadius: 999,
            background: RED,
            fontSize: 104,
            fontWeight: 700,
            transform: `scale(${pop * pulse})`,
            boxShadow: `0 0 80px rgba(224,36,60,0.55)`,
          }}
        >
          + ফলো করো
        </div>
      </div>
      <Vignette />
    </AbsoluteFill>
  );
};

export const SceneVisual: React.FC<{visual: Visual; dur: number}> = ({visual, dur}) => {
  switch (visual) {
    case 'objects':
      return <Objects dur={dur} />;
    case 'figure':
      return <FigureScene dur={dur} />;
    case 'place':
      return <PlaceScene dur={dur} />;
    case 'sign':
      return <Sign dur={dur} />;
    case 'clock':
      return <Clock dur={dur} />;
    case 'gentle':
      return <Gentle dur={dur} />;
    case 'shift':
      return <Shift dur={dur} />;
    case 'dark':
      return <Dark dur={dur} />;
    case 'gun':
      return <Gun dur={dur} />;
    case 'split':
      return <Split dur={dur} />;
    case 'walk':
      return <Walk dur={dur} />;
    case 'flee':
      return <Flee dur={dur} />;
    case 'text':
      return <TextScene dur={dur} />;
    case 'lesson':
      return <Lesson dur={dur} />;
    case 'takeaway':
      return <Takeaway dur={dur} />;
    case 'cta':
      return <Cta dur={dur} />;
    default:
      return null;
  }
};
