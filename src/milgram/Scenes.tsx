import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame} from 'remotion';
import {Cam, LOOKS, Person, Place, Vignette} from '../art';
import {
  BG,
  Bubble,
  EXPERIMENTER,
  FG,
  GOLD,
  LabRoom,
  MILGRAM,
  PARTICIPANTS,
  PersonIcon,
  RED,
  SeatedLearner,
  Switchboard,
  TEACHER,
  TapeRecorder,
  YaleBuilding,
} from './art';

export {BG};

export type MilgramSegment = {id: string; text: string; visual: string};

const clampOpts = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const out = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clampOpts, easing: Easing.out(Easing.cubic)});
const inOut = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clampOpts, easing: Easing.inOut(Easing.cubic)});

const Title: React.FC<{children: React.ReactNode; top?: number; size?: number; color?: string; opacity?: number}> = ({children, top = 180, size = 96, color = FG, opacity = 1}) => (
  <div style={{position: 'absolute', top, left: 40, right: 40, textAlign: 'center', fontSize: size, fontWeight: 800, color, opacity, lineHeight: 1.2, textShadow: '0 6px 30px rgba(0,0,0,0.85)'}}>{children}</div>
);

// বোর্ডের অবস্থান: বাঁ 40, ওপর 700, চওড়া 1000
const BOARD_L = 40;
const BOARD_T = 700;
const Board: React.FC<{lit?: number; xxxGlow?: number}> = ({lit, xxxGlow}) => (
  <div style={{position: 'absolute', left: BOARD_L, top: BOARD_T}}>
    <Switchboard lit={lit} xxxGlow={xxxGlow} />
  </div>
);
// i নম্বর সুইচের পর্দার x
const switchX = (i: number) => BOARD_L + 48 + i * 30.6 + 11.3;
const SWITCH_Y = BOARD_T + 190;

type SP = {dur: number; id: string};

// ---------- দৃশ্য ----------

const Stat: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const t = f / dur;
  return (
    <AbsoluteFill>
      <LabRoom light={0.5} red={out(f, dur * 0.5, dur * 0.9) * 0.6} />
      <Title top={150} size={200} color={RED} opacity={out(f, 0, 10)}>
        450 V
      </Title>
      <div style={{position: 'absolute', top: 470, left: 90, width: 900, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center'}}>
        {Array.from({length: 40}, (_, i) => {
          const red = i < 26 && t > 0.35 + i * 0.016;
          return (
            <div key={i} style={{opacity: out(f, i * 0.4, i * 0.4 + 6), transform: `scale(${red ? 1.08 : 1})`}}>
              <PersonIcon color={red ? RED : '#c9ced3'} size={110} />
            </div>
          );
        })}
      </div>
      <Title top={1060} size={90} opacity={out(f, dur * 0.55, dur * 0.68)}>
        <span style={{color: RED}}>২৬</span> / ৪০
      </Title>
    </AbsoluteFill>
  );
};

const OneLine: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const dots = '…'.repeat(1 + (Math.floor(f / 8) % 3));
  return (
    <AbsoluteFill>
      <LabRoom light={0.6} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 600px 900px at 50% 45%, rgba(220,255,245,0.35), rgba(0,0,0,0) 70%)'}} />
      <Cam zoom={interpolate(f, [0, dur], [1, 1.1])} y={900}>
        <Place x={540} y={1560}>
          <Person height={1250} {...EXPERIMENTER} silhouette="#070a09" />
        </Place>
      </Cam>
      <div style={{position: 'absolute', top: 230, left: 0, right: 0, textAlign: 'center', opacity: out(f, dur * 0.4, dur * 0.55)}}>
        <Bubble size={110}>
          <span style={{display: 'inline-block', minWidth: 160}}>{dots}</span>
        </Bubble>
      </div>
      <Vignette />
    </AbsoluteFill>
  );
};

const Yale: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0c1424 0%, #1a2436 60%, #0a0d0c 100%)'}}>
      {Array.from({length: 40}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: (i * 137) % 1080, top: (i * 89) % 700, width: 3, height: 3, borderRadius: 2, background: '#fff', opacity: 0.25 + ((i * 7) % 5) * 0.1}} />
      ))}
      <Title top={200} size={230} color={GOLD} opacity={out(f, 0, 12)}>
        1961
      </Title>
      <div style={{position: 'absolute', left: 40, top: 760, transform: `scale(${interpolate(f, [0, dur], [1, 1.06])})`, transformOrigin: '50% 100%'}}>
        <YaleBuilding width={1000} />
      </div>
      <Title top={1440} size={70} opacity={out(f, 10, 24)}>
        Yale University
      </Title>
    </AbsoluteFill>
  );
};

const Ad: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const stamp = spring({frame: f - dur * 0.55, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 40%, #2a2620, #0a0d0c 80%)'}}>
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 260,
          width: 860,
          padding: '50px 54px',
          background: '#ece4cf',
          color: '#1a1814',
          fontFamily: 'Georgia, serif',
          transform: `rotate(-2deg) scale(${interpolate(f, [0, dur], [1, 1.05])})`,
          boxShadow: '0 40px 90px rgba(0,0,0,0.7)',
          opacity: out(f, 0, 10),
        }}
      >
        <div style={{fontSize: 34, letterSpacing: 6, textAlign: 'center', borderBottom: '3px solid #1a1814', paddingBottom: 14}}>PUBLIC ANNOUNCEMENT</div>
        <div style={{fontSize: 76, fontWeight: 900, lineHeight: 1.05, textAlign: 'center', margin: '26px 0'}}>
          WE WILL PAY YOU $4.00 FOR ONE HOUR OF YOUR TIME
        </div>
        <div style={{fontSize: 44, fontStyle: 'italic', textAlign: 'center', marginBottom: 24}}>Persons Needed for a Study of Memory</div>
        <div style={{fontSize: 30, lineHeight: 1.45}}>
          The study is being done at Yale University. Each person who participates will be paid $4.00 (plus 50c carfare) for approximately 1 hour's time.
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 640,
          top: 1050,
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: `10px solid ${RED}`,
          color: RED,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 96,
          fontWeight: 900,
          transform: `rotate(-14deg) scale(${2 - stamp})`,
          opacity: stamp,
        }}
      >
        $4.50
      </div>
    </AbsoluteFill>
  );
};

const People: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const labels = ['পোস্ট অফিসের কেরানি', 'স্কুলশিক্ষক', 'সেলসম্যান'];
  return (
    <AbsoluteFill>
      <LabRoom />
      {PARTICIPANTS.map((p, i) => {
        const a = dur * 0.18 * i;
        return (
          <React.Fragment key={i}>
            <Place x={200 + i * 340} y={1400 + out(f, a, a + 12, 60, 0)}>
              <div style={{opacity: out(f, a, a + 10)}}>
                <Person height={900} {...p} />
              </div>
            </Place>
            <div style={{position: 'absolute', left: 30 + i * 340, width: 340, top: 360, textAlign: 'center', fontSize: 44, fontWeight: 700, color: GOLD, opacity: out(f, a + 6, a + 16)}}>{labels[i]}</div>
          </React.Fragment>
        );
      })}
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Teacher: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const flip = inOut(f, dur * 0.15, dur * 0.4);
  return (
    <AbsoluteFill>
      <LabRoom />
      <Place x={300} y={1420}>
        <Person height={1000} {...TEACHER} armR={40} />
      </Place>
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 640,
          width: 470,
          padding: '60px 0',
          background: '#f2ecdc',
          color: '#1a1814',
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          fontSize: 86,
          fontWeight: 900,
          letterSpacing: 4,
          boxShadow: '0 30px 70px rgba(0,0,0,0.6)',
          transform: `perspective(900px) rotateY(${(1 - flip) * 90}deg) rotate(4deg)`,
        }}
      >
        TEACHER
      </div>
      <Title top={1180} size={100} color={GOLD} opacity={out(f, dur * 0.45, dur * 0.6)}>
        শিক্ষক
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Learner: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <LabRoom />
      <Cam zoom={interpolate(f, [0, dur], [1, 1.12])} x={480} y={980}>
        <Place x={450} y={1420}>
          <SeatedLearner height={900} strapped={out(f, 6, 22)} />
        </Place>
        <Place x={870} y={1440}>
          <Person height={1050} {...EXPERIMENTER} armL={50} />
        </Place>
      </Cam>
      <Title top={200} size={64} color={GOLD} opacity={out(f, dur * 0.45, dur * 0.6)}>
        ⚡ ইলেকট্রোড
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Rule: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const t = f / dur;
  const lit = t > 0.75 ? 3 : t > 0.5 ? 2 : t > 0.25 ? 1 : 0;
  const local = (t * 4) % 1;
  return (
    <AbsoluteFill>
      <LabRoom />
      <Cam zoom={2.5} x={switchX(1)} y={SWITCH_Y - 30}>
        <Board lit={lit} />
      </Cam>
      <Title top={220} size={110} color={RED} opacity={lit ? 1 - out(local, 0.6, 1) * 0.3 : 0}>
        ✗ ভুল
      </Title>
      <Title top={1220} size={130} color={GOLD} opacity={lit ? 1 : 0}>
        {lit * 15} V
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const BoardScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const p = inOut(f, 4, dur * 0.9);
  const idx = Math.round(p * 29);
  return (
    <AbsoluteFill>
      <LabRoom />
      <Cam zoom={2.2} x={interpolate(p, [0, 1], [switchX(2), switchX(27)])} y={SWITCH_Y - 40}>
        <Board />
      </Cam>
      <Title top={220} size={170} color={idx > 24 ? RED : GOLD}>
        {(idx + 1) * 15} V
      </Title>
      <Vignette strength={0.65} />
    </AbsoluteFill>
  );
};

const Xxx: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <LabRoom red={0.5} />
      <Cam zoom={interpolate(f, [0, dur], [2.6, 3.4])} x={switchX(28.5)} y={SWITCH_Y}>
        <Board xxxGlow={1} />
      </Cam>
      <Title top={240} size={200} color={RED} opacity={out(f, 6, 18)}>
        XXX
      </Title>
      <Vignette color="60,0,8" strength={0.8} />
    </AbsoluteFill>
  );
};

const Easy: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const lit = Math.floor(interpolate(f, [4, dur * 0.95], [1, 19], clampOpts));
  return (
    <AbsoluteFill>
      <LabRoom />
      <Board lit={lit} />
      <Place x={540} y={2200}>
        <Person height={1350} facing="back" {...TEACHER} armR={25} armL={25} />
      </Place>
      <Title top={240} size={160} color={GOLD}>
        {lit * 15} V
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Wall: React.FC<{shake: number; dark?: number}> = ({shake, dark = 0}) => (
  <AbsoluteFill style={{transform: `translate(${shake * 14}px, ${shake * -6}px)`}}>
    <div style={{position: 'absolute', left: 330, top: 520, width: 420, height: 740, background: '#4a3624', border: '18px solid #2e2218', borderBottom: 'none'}}>
      <div style={{position: 'absolute', left: 40, top: 50, width: 300, height: 260, border: '6px solid #3a2a1c'}} />
      <div style={{position: 'absolute', left: 40, top: 360, width: 300, height: 300, border: '6px solid #3a2a1c'}} />
      <div style={{position: 'absolute', right: 30, top: 380, width: 30, height: 30, borderRadius: '50%', background: '#c9a24a'}} />
    </div>
    <AbsoluteFill style={{background: `rgba(0,0,0,${dark})`}} />
  </AbsoluteFill>
);

const Bang: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const second = id === 'bang2';
  const hits = second ? [0.12, 0.3] : [0.35, 0.5, 0.65];
  const shakeAmt = Math.max(...hits.map((h) => Math.max(0, 1 - Math.abs(f - h * dur) / 5))) * Math.sin(f * 3);
  const lastHit = [...hits].reverse().find((h) => f >= h * dur);
  const local = lastHit !== undefined ? f - lastHit * dur : -1;
  const fade = second ? out(f, dur * 0.55, dur) : 0;
  return (
    <AbsoluteFill>
      <LabRoom red={second ? 0.3 : 0.15} light={1 - fade * 0.8} />
      <Wall shake={shakeAmt} dark={fade * 0.6} />
      <Place x={170} y={2050}>
        <Person height={1100} facing="back" {...TEACHER} />
      </Place>
      <Title top={180} size={150} color={RED}>
        {second ? 315 : 300} V
      </Title>
      {local >= 0 && local < 12 && fade < 0.5 ? (
        <Title top={760} size={180} color="#fff" opacity={1 - local / 12}>
          <span style={{display: 'inline-block', transform: `scale(${1.4 - local / 30}) rotate(-8deg)`}}>দুম!</span>
        </Title>
      ) : null}
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const Hesitate: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <LabRoom />
      <Cam zoom={interpolate(f, [0, dur], [1.4, 1.6])} x={520} y={700}>
        <Place x={520} y={1500}>
          <Person height={1100} {...TEACHER} brow="worried" mouth="tense" armR={interpolate(f, [0, dur], [10, 55], clampOpts)} />
        </Place>
      </Cam>
      <Title top={200} size={150} color={FG} opacity={out(f, 2, 10)}>
        ✋
      </Title>
      <Vignette />
    </AbsoluteFill>
  );
};

const PROD_TEXT: Record<string, string> = {
  prod1: 'প্লিজ, চালিয়ে যান।',
  prod2: 'এক্সপেরিমেন্টের জন্য চালিয়ে যাওয়া জরুরি।',
  prod3: 'আপনার আর কোনো উপায় নেই।',
};

const Prod: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const level = id === 'prod3' ? 3 : id === 'prod2' ? 2 : 1;
  const start = level === 1 ? dur * 0.45 : 0;
  return (
    <AbsoluteFill>
      <LabRoom red={level === 3 ? 0.25 : 0} />
      {/* জুম বাড়লেও মুখ বেলুনের নিচে থাকে */}
      <Cam zoom={1 + level * 0.25 + interpolate(f, [0, dur], [0, 0.08])} x={620} y={498 + 280 / (1 + level * 0.25)}>
        <Place x={640} y={1520}>
          <Person height={1150} {...EXPERIMENTER} />
        </Place>
      </Cam>
      <Place x={150} y={2150}>
        <Person height={1150} facing="back" {...TEACHER} silhouette="#0d1110" />
      </Place>
      <div style={{position: 'absolute', top: 220, left: 60, right: 60, textAlign: 'center', opacity: out(f, start, start + 8), transform: `scale(${out(f, start, start + 10, 0.85, 1)})`}}>
        <Bubble size={level === 3 ? 84 : 70} text={level === 3 ? RED : '#15151b'}>
          "{PROD_TEXT[id]}"
        </Bubble>
      </div>
      <Vignette strength={0.6 + level * 0.08} />
    </AbsoluteFill>
  );
};

const Silence: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <LabRoom light={0.15} />
      <Cam zoom={interpolate(f, [0, dur], [1, 1.15])} y={900}>
        <Wall shake={0} dark={0.55} />
      </Cam>
      <Title top={240} size={90} color="#9aa3aa" opacity={out(f, 6, 20) * 0.8}>
        . . .
      </Title>
      <Vignette strength={0.9} />
    </AbsoluteFill>
  );
};

const Next: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const push = inOut(f, dur * 0.35, dur * 0.6);
  const lit = push > 0.95 ? 22 : 21;
  const hx = switchX(21);
  return (
    <AbsoluteFill>
      <LabRoom red={0.2} />
      <Cam zoom={2.4} x={hx} y={SWITCH_Y}>
        <Board lit={lit} />
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          <line x1={hx + 30} y1={SWITCH_Y + 400} x2={hx} y2={SWITCH_Y + interpolate(push, [0, 1], [140, 22])} stroke={TEACHER.top} strokeWidth={34} strokeLinecap="round" />
          <circle cx={hx} cy={SWITCH_Y + interpolate(push, [0, 1], [140, 22])} r={18} fill={TEACHER.skin} />
        </svg>
      </Cam>
      <Title top={220} size={84} opacity={out(f, 2, 12)}>
        উত্তর নেই = <span style={{color: RED}}>ভুল</span>
      </Title>
      <Title top={1220} size={130} color={RED}>
        {lit * 15} V
      </Title>
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const Stress: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const t = f / dur;
  const jx = Math.sin(f * 2.1) * 6;
  const words = ['ঘাম', 'কাঁপা হাত', 'অস্থির হাসি', 'খিঁচুনি'];
  const idx = Math.min(3, Math.floor(t * 4));
  return (
    <AbsoluteFill>
      <LabRoom red={0.25} />
      <Cam zoom={3} x={540 + jx} y={600}>
        <Place x={540} y={1500}>
          <Person height={1100} {...TEACHER} brow="worried" mouth={idx === 2 ? 'smile' : 'tense'} sweat={out(f, 0, 12)} />
        </Place>
      </Cam>
      <Title top={200} size={130} color={idx === 3 ? RED : FG}>
        <span key={idx} style={{display: 'inline-block', transform: `translateX(${jx}px)`}}>
          {words[idx]}
        </span>
      </Title>
      <Vignette color="60,0,8" strength={0.75} />
    </AbsoluteFill>
  );
};

const Result: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const lit = Math.floor(interpolate(f, [0, dur * 0.6], [22, 30], clampOpts));
  return (
    <AbsoluteFill>
      <LabRoom red={0.45} />
      <Board lit={lit} xxxGlow={lit >= 30 ? 1 : 0} />
      <Title top={230} size={200} color={RED} opacity={out(f, dur * 0.4, dur * 0.55)}>
        ২৬ / ৪০
      </Title>
      <Title top={1180} size={90} color={GOLD} opacity={out(f, dur * 0.55, dur * 0.7)}>
        ৬৫% · 450 V
      </Title>
      <Vignette color="60,0,8" strength={0.75} />
    </AbsoluteFill>
  );
};

const Predict: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const a = out(f, 6, 20);
  const b = out(f, dur * 0.45, dur * 0.75);
  const bar = (label: string, sub: string, w: number, color: string, top: number, o: number) => (
    <div style={{position: 'absolute', left: 90, right: 90, top, opacity: o}}>
      <div style={{fontSize: 56, fontWeight: 700, color: FG}}>{label}</div>
      <div style={{marginTop: 18, height: 90, background: 'rgba(255,255,255,0.08)', borderRadius: 14}}>
        <div style={{height: '100%', width: `${Math.max(1.2, w)}%`, background: color, borderRadius: 14, boxShadow: `0 0 40px ${color}`}} />
      </div>
      <div style={{marginTop: 14, fontSize: 46, color}}>{sub}</div>
    </div>
  );
  return (
    <AbsoluteFill>
      <LabRoom light={0.6} />
      <AbsoluteFill style={{background: 'rgba(0,0,0,0.35)'}} />
      {bar('মনোরোগ বিশেষজ্ঞদের অনুমান', 'হাজারে ১ জন', 0.1 * a, GOLD, 360, a)}
      {bar('বাস্তবে', '৪০ জনে ২৬ জন (৬৫%)', 65 * b, RED, 800, out(f, dur * 0.4, dur * 0.5))}
    </AbsoluteFill>
  );
};

const Reveal: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const free = out(f, dur * 0.15, dur * 0.35);
  const stand = inOut(f, dur * 0.35, dur * 0.6);
  return (
    <AbsoluteFill>
      <LabRoom light={1.2} />
      <Place x={420} y={1420}>
        <SeatedLearner height={900} strapped={1 - free} smile={free > 0.5} standing={stand} />
      </Place>
      <div style={{position: 'absolute', left: 700, top: 1080, opacity: out(f, dur * 0.5, dur * 0.65)}}>
        <TapeRecorder size={300} />
      </div>
      <Title top={200} size={150} color={GOLD} opacity={out(f, 0, 10)}>
        ০ ভোল্ট
      </Title>
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 520,
          padding: '14px 40px',
          border: `8px solid ${RED}`,
          color: RED,
          fontSize: 84,
          fontWeight: 900,
          transform: `rotate(-10deg) scale(${2 - out(f, dur * 0.6, dur * 0.72)})`,
          opacity: out(f, dur * 0.6, dur * 0.72),
        }}
      >
        অভিনেতা
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Unaware: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, top: 0, width: 536, height: 1920, overflow: 'hidden'}}>
        <LabRoom light={1.1} />
        <Place x={270} y={1300}>
          <SeatedLearner height={620} strapped={0} smile />
        </Place>
        <div style={{position: 'absolute', left: 120, top: 1330}}>
          <TapeRecorder size={280} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 544, top: 0, width: 536, height: 1920, overflow: 'hidden'}}>
        <LabRoom red={0.4} />
        <div style={{position: 'absolute', left: -280, top: 0, width: 1080, height: 1920}}>
          <Place x={540} y={1500}>
            <Person height={1050} {...TEACHER} brow="worried" mouth="tense" sweat={1} style={{transform: `translateX(${Math.sin(f * 2) * 4}px)`}} />
          </Place>
        </div>
      </div>
      <div style={{position: 'absolute', left: 528, top: 0, width: 24, height: 1920, background: '#0a0d0c'}} />
      <Title top={200} size={66} opacity={out(f, 0, 10)}>
        <span style={{color: GOLD}}>জানত</span> &nbsp;&nbsp;|&nbsp;&nbsp; <span style={{color: RED}}>জানত না</span>
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Milgram: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <LabRoom light={0.8} />
      <Cam zoom={interpolate(f, [0, dur], [1.25, 1.35])} x={540} y={820}>
        <Place x={540} y={1480}>
          <Person height={1150} {...MILGRAM} />
        </Place>
      </Cam>
      <div style={{position: 'absolute', left: 90, top: 1160, padding: '18px 34px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${GOLD}`, opacity: out(f, 4, 14)}}>
        <div style={{fontSize: 60, fontWeight: 800}}>Stanley Milgram</div>
        <div style={{fontSize: 36, color: GOLD}}>Yale · 1961</div>
      </div>
      <Title top={200} size={110} color={FG} opacity={out(f, dur * 0.5, dur * 0.65)}>
        দানব <span style={{color: RED}}>লাগে না</span>
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Ordinary: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const grow = out(f, 0, dur * 0.8);
  return (
    <AbsoluteFill>
      <LabRoom light={0.7} />
      {/* দেয়ালে বড় ছায়া */}
      <Place x={640} y={1300}>
        <Person height={1100 + grow * 400} {...TEACHER} silhouette="rgba(0,0,0,0.55)" style={{filter: 'blur(4px)'}} />
      </Place>
      <Place x={420} y={1480}>
        <Person height={1000} {...TEACHER} />
      </Place>
      <div style={{position: 'absolute', top: 230, left: 0, right: 0, textAlign: 'center', opacity: out(f, dur * 0.2, dur * 0.35)}}>
        <Bubble size={68}>"নিজের কাজ করছি"</Bubble>
      </div>
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const Token: React.FC<{x: number; y: number; color?: string; label?: string}> = ({x, y, color = RED, label = 'দায়'}) => (
  <div
    style={{
      position: 'absolute',
      left: x - 110,
      top: y - 110,
      width: 220,
      height: 220,
      borderRadius: '50%',
      border: `10px solid ${color}`,
      background: 'rgba(0,0,0,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 72,
      fontWeight: 800,
      color,
      boxShadow: `0 0 60px ${color}`,
    }}
  >
    {label}
  </div>
);

const Blame: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, dur * 0.25, dur * 0.7);
  return (
    <AbsoluteFill>
      <LabRoom />
      <Place x={280} y={1440}>
        <Person height={950} {...TEACHER} brow={m > 0.5 ? 'neutral' : 'worried'} />
      </Place>
      <Place x={800} y={1440}>
        <Person height={1000} {...EXPERIMENTER} />
      </Place>
      <Token x={interpolate(m, [0, 1], [280, 800])} y={interpolate(m, [0, 1], [380, 380]) - Math.sin(m * Math.PI) * 120} />
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Orders: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <LabRoom light={0.7} />
      <Place x={300} y={1480}>
        <Person height={1000} {...LOOKS[4]} brow="worried" />
      </Place>
      <div style={{position: 'absolute', right: 50, top: 300, opacity: out(f, 2, 12), transform: 'rotate(-4deg)'}}>
        <Bubble size={64} tail="left">
          "উপরের অর্ডার"
        </Bubble>
      </div>
      <div style={{position: 'absolute', right: 70, top: 640, opacity: out(f, dur * 0.45, dur * 0.55), transform: 'rotate(4deg)'}}>
        <Bubble size={64} tail="left">
          "সবাই তো করে"
        </Bubble>
      </div>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Ask: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 14}});
  return (
    <AbsoluteFill>
      <LabRoom light={0.5} />
      <AbsoluteFill style={{background: 'rgba(0,0,0,0.4)'}} />
      <div style={{position: 'absolute', top: 260, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 50, transform: `scale(${pop})`}}>
        <div style={{width: 80, height: 300, background: GOLD, borderRadius: 16}} />
        <div style={{width: 80, height: 300, background: GOLD, borderRadius: 16}} />
      </div>
      <Title top={700} size={84} opacity={out(f, dur * 0.3, dur * 0.45)}>
        অর্ডারটা না থাকলে
        <br />
        কি আমি <span style={{color: GOLD}}>এটা করতাম?</span>
      </Title>
    </AbsoluteFill>
  );
};

const Yours: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, 4, dur * 0.55);
  return (
    <AbsoluteFill>
      <LabRoom light={0.9} />
      <Place x={540} y={1480}>
        <Person height={1000} {...LOOKS[4]} />
      </Place>
      <Token x={interpolate(m, [0, 1], [1250, 540])} y={interpolate(m, [0, 1], [200, 420])} color={GOLD} />
      <Title top={1150} size={110} color={GOLD} opacity={out(f, dur * 0.55, dur * 0.7)}>
        তোমার
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  const pulse = 1 + 0.04 * Math.sin(f / 6);
  return (
    <AbsoluteFill>
      <LabRoom light={0.5} />
      <div style={{opacity: 0.45}}>
        <Board lit={0} />
      </div>
      <div style={{position: 'absolute', top: 360, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <div style={{padding: '40px 100px', borderRadius: 999, background: RED, fontSize: 104, fontWeight: 800, transform: `scale(${pop * pulse})`, boxShadow: '0 0 80px rgba(224,36,60,0.55)'}}>+ ফলো করো</div>
      </div>
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  stat: Stat,
  oneLine: OneLine,
  yale: Yale,
  ad: Ad,
  people: People,
  teacher: Teacher,
  learner: Learner,
  rule: Rule,
  board: BoardScene,
  xxx: Xxx,
  easy: Easy,
  bang: Bang,
  hesitate: Hesitate,
  prod: Prod,
  silence: Silence,
  next: Next,
  stress: Stress,
  result: Result,
  predict: Predict,
  reveal: Reveal,
  unaware: Unaware,
  milgram: Milgram,
  ordinary: Ordinary,
  blame: Blame,
  orders: Orders,
  ask: Ask,
  yours: Yours,
  cta: Cta,
};

export const MilgramScene: React.FC<{seg: MilgramSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};
