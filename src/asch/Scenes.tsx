import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame} from 'remotion';
import {Cam, LOOKS, Person, Place, Vignette} from '../art';
import {Bubble, PersonIcon} from '../milgram/art';
import {ASCH, BG, ClassRoom, CollegeBuilding, FG, GOLD, GREEN, LineCard, ME, PERSON_H, RED, ROW_Y, Row, STUDENTS, headY, seatX} from './art';

export {BG};

export type AschSegment = {id: string; text: string; visual: string};

const clampOpts = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const out = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clampOpts, easing: Easing.out(Easing.cubic)});
const inOut = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clampOpts, easing: Easing.inOut(Easing.cubic)});

const Title: React.FC<{children: React.ReactNode; top?: number; size?: number; color?: string; opacity?: number}> = ({children, top = 180, size = 96, color = FG, opacity = 1}) => (
  <div style={{position: 'absolute', top, left: 40, right: 40, textAlign: 'center', fontSize: size, fontWeight: 800, color, opacity, lineHeight: 1.2, textShadow: '0 6px 30px rgba(0,0,0,0.85)'}}>{children}</div>
);

type SP = {dur: number; id: string};

// ছাত্রের মাথার ওপর ছোট উত্তরের বেলুন
const Answer: React.FC<{i: number; letter: string; o: number; color?: string}> = ({i, letter, o, color}) => (
  <div style={{position: 'absolute', left: seatX(i), top: headY - 150, transform: `translateX(-50%) scale(${0.6 + 0.4 * o})`, opacity: o}}>
    <Bubble size={58} text={color ?? '#15151b'}>
      {letter}
    </Bubble>
  </div>
);

// বোর্ডে ছোট কার্ড (সারির দৃশ্যে)
const SmallCard: React.FC<{mark?: 'A' | 'C'; color?: string}> = ({mark, color}) => (
  <div style={{position: 'absolute', left: 240, top: 230, boxShadow: '0 20px 50px rgba(0,0,0,0.5)'}}>
    <LineCard width={600} mark={mark} markColor={color} />
  </div>
);

// ---------- দৃশ্য ----------

const Lines: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const show = id === 'task' ? out(f, 4, dur * 0.85) : 1;
  const mark = id === 'hook1' ? (f > dur * 0.45 ? 'C' : undefined) : id === 'obvious' ? 'C' : undefined;
  const ghost = id === 'ask' ? inOut(f, dur * 0.2, dur * 0.8) : 0;
  return (
    <AbsoluteFill>
      <ClassRoom />
      <div style={{position: 'absolute', left: 70, top: 420, transform: `scale(${interpolate(f, [0, dur], [1, 1.05])})`, boxShadow: '0 40px 90px rgba(0,0,0,0.6)'}}>
        <LineCard width={940} show={show} mark={mark} ghost={ghost} />
      </div>
      {id === 'ask' ? (
        <Title top={1060} size={110} color={GOLD} opacity={out(f, 4, 14)}>
          = ?
        </Title>
      ) : null}
      {id === 'obvious' || (id === 'hook1' && mark) ? (
        <Title top={1060} size={130} color={GOLD} opacity={out(f, id === 'hook1' ? dur * 0.45 : 0, (id === 'hook1' ? dur * 0.45 : 0) + 8)}>
          ✓ C
        </Title>
      ) : null}
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Stat: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ClassRoom dim={0.3} />
      <div style={{position: 'absolute', top: 520, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 40}}>
        {[0, 1, 2, 3].map((i) => {
          const red = i < 3 && f > dur * 0.3 + i * 5;
          return (
            <div key={i} style={{opacity: out(f, i * 3, i * 3 + 8), transform: `scale(${red ? 1.08 : 1})`}}>
              <PersonIcon color={red ? RED : '#c9c2b4'} size={300} />
            </div>
          );
        })}
      </div>
      <Title top={250} size={160} color={RED} opacity={out(f, dur * 0.4, dur * 0.55)}>
        ৩ / ৪
      </Title>
      <Title top={920} size={70} opacity={out(f, dur * 0.5, dur * 0.65)}>
        ভুল উত্তর দিল
      </Title>
    </AbsoluteFill>
  );
};

const College: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a2234 0%, #2a2a30 60%, #0d0b09 100%)'}}>
      <Title top={200} size={230} color={GOLD} opacity={out(f, 0, 12)}>
        1951
      </Title>
      <div style={{position: 'absolute', left: 40, top: 760, transform: `scale(${interpolate(f, [0, dur], [1, 1.05])})`, transformOrigin: '50% 100%'}}>
        <CollegeBuilding width={1000} />
      </div>
      <Title top={1300} size={66} opacity={out(f, 10, 24)}>
        Swarthmore College
      </Title>
      <Title top={1390} size={40} color={GOLD} opacity={out(f, 16, 30) * 0.8}>
        <span style={{letterSpacing: 8}}>USA</span>
      </Title>
    </AbsoluteFill>
  );
};

const Room: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ClassRoom />
      <SmallCard />
      {STUDENTS.map((s, i) => (
        <div key={i} style={{position: 'absolute', left: seatX(i), top: ROW_Y + out(f, i * 2, i * 2 + 10, 80, 0), transform: 'translate(-50%, -100%)', opacity: out(f, i * 2, i * 2 + 8)}}>
          <Person height={PERSON_H} {...s} />
        </div>
      ))}
      <div style={{position: 'absolute', left: -20, right: -20, top: 1150, height: 260, background: 'linear-gradient(180deg, #6b4a2c 0 22px, #4a3220 22px)'}} />
      <Title top={1440} size={60} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.55)}>
        ৮ জন
      </Title>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Actors: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const reveal = id === 'actors' ? out(f, 4, 16) : 0;
  const arrow = id === 'actors' ? out(f, dur * 0.5, dur * 0.65) : 0;
  return (
    <AbsoluteFill>
      <ClassRoom dim={0.2} />
      <Row spot={ME} dimOthers={id === 'secret' ? 0.5 : 0} tint={(i) => (i !== ME && reveal > 0.5 ? '#3a1018' : undefined)} />
      {id === 'secret' ? (
        <div style={{position: 'absolute', left: seatX(ME), top: headY - 210, transform: 'translateX(-50%)', fontSize: 130, fontWeight: 800, color: GOLD, opacity: out(f, 4, 14)}}>?</div>
      ) : null}
      {STUDENTS.map((_, i) =>
        i === ME ? null : (
          <div key={i} style={{position: 'absolute', left: seatX(i), top: headY - 110, transform: 'translateX(-50%) rotate(-8deg)', fontSize: 30, fontWeight: 800, color: RED, opacity: reveal, border: `3px solid ${RED}`, padding: '2px 8px'}}>
            অভিনেতা
          </div>
        ),
      )}
      <Title top={300} size={84} color={RED} opacity={reveal}>
        ৭ জন অভিনেতা
      </Title>
      <div style={{position: 'absolute', right: 30, top: 540, textAlign: 'right', opacity: arrow}}>
        <div style={{fontSize: 56, fontWeight: 800, color: GOLD}}>সবার শেষে</div>
        <div style={{fontSize: 120, color: GOLD, lineHeight: 1, marginRight: 40}}>↓</div>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Rounds: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const twelve = id === 'twelve';
  const n = twelve ? Math.max(1, Math.round(interpolate(f, [0, dur * 0.8], [1, 12], clampOpts))) : f < dur / 2 ? 1 : 2;
  return (
    <AbsoluteFill>
      <ClassRoom />
      <SmallCard mark={twelve ? undefined : 'C'} color={GREEN} />
      <Row />
      {STUDENTS.map((_, i) => (
        <Answer key={i} i={i} letter={twelve ? 'A' : 'C'} o={twelve ? (i === ME ? 0 : out(f, 0, 6)) : out(f, (f < dur / 2 ? 0 : dur / 2) + i * 1.5, (f < dur / 2 ? 0 : dur / 2) + i * 1.5 + 6)} color={twelve ? RED : '#1f8a4a'} />
      ))}
      <Title top={110} size={72} color={twelve ? RED : GREEN}>
        {twelve ? `${n} / 12 বার` : `রাউন্ড ${n}`}
      </Title>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const AnswerScene: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const count = id === 'first' ? 1 : id === 'more' ? 3 : 7;
  const prev = id === 'first' ? 0 : id === 'more' ? 1 : 3;
  const step = (dur * 0.7) / Math.max(1, count - prev);
  return (
    <AbsoluteFill>
      <ClassRoom />
      <SmallCard mark="C" color={GOLD} />
      <Row spot={ME} />
      {Array.from({length: count}, (_, i) => {
        const at = i < prev ? -10 : (i - prev) * step;
        return <Answer key={i} i={i} letter="A" o={out(f, at, at + 6)} color={RED} />;
      })}
      {id === 'all' ? (
        <Title top={1440} size={70} color={RED} opacity={out(f, dur * 0.5, dur * 0.7)}>
          ৭ / ৭ → A
        </Title>
      ) : null}
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Turn: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const beat = 1 + 0.03 * Math.max(0, Math.sin(f / 3));
  return (
    <AbsoluteFill>
      <ClassRoom dim={0.25} />
      <Cam zoom={interpolate(f, [0, dur], [1.9, 2.2]) * beat} x={seatX(ME) - 110} y={headY - 20}>
        <Row spot={ME} looks={(i) => (i === ME ? {brow: 'worried', mouth: 'tense', sweat: 1} : {})} />
        {Array.from({length: 7}, (_, i) => (
          <Answer key={i} i={i} letter="A" o={1} color={RED} />
        ))}
      </Cam>
      <Vignette strength={0.85} />
    </AbsoluteFill>
  );
};

const Split: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const r = out(f, dur * 0.45, dur * 0.6);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, top: 0, width: 536, height: 1920, background: 'linear-gradient(180deg, #2a2418, #0d0b09)'}} />
      <div style={{position: 'absolute', left: 544, top: 0, width: 536, height: 1920, background: `linear-gradient(180deg, rgba(90,10,20,${0.5 + 0.3 * r}), #0d0b09)`}} />
      <div style={{position: 'absolute', left: 528, top: 0, width: 24, height: 1920, background: '#000'}} />
      <div style={{position: 'absolute', left: 0, width: 536, top: 420, textAlign: 'center', opacity: out(f, 0, 10)}}>
        <div style={{fontSize: 200}}>👁</div>
        <div style={{fontSize: 70, fontWeight: 800, color: GOLD}}>চোখ</div>
        <div style={{fontSize: 260, fontWeight: 900, color: GOLD, lineHeight: 1}}>C</div>
      </div>
      <div style={{position: 'absolute', left: 544, width: 536, top: 420, textAlign: 'center', opacity: r}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: 6, height: 200, alignItems: 'flex-end'}}>
          {[0, 1, 2, 3, 4].map((i) => (
            <PersonIcon key={i} color={RED} size={120} />
          ))}
        </div>
        <div style={{fontSize: 70, fontWeight: 800, color: RED}}>ঘর</div>
        <div style={{fontSize: 260, fontWeight: 900, color: RED, lineHeight: 1}}>A</div>
      </div>
    </AbsoluteFill>
  );
};

const Bar: React.FC<{label: string; value: string; pct: number; color: string; top: number; o: number}> = ({label, value, pct, color, top, o}) => (
  <div style={{position: 'absolute', left: 90, right: 90, top, opacity: o}}>
    <div style={{fontSize: 56, fontWeight: 700}}>{label}</div>
    <div style={{marginTop: 18, height: 90, background: 'rgba(255,255,255,0.08)', borderRadius: 14}}>
      <div style={{height: '100%', width: `${Math.max(1, pct)}%`, background: color, borderRadius: 14, boxShadow: `0 0 40px ${color}`}} />
    </div>
    <div style={{marginTop: 12, fontSize: 52, fontWeight: 800, color}}>{value}</div>
  </div>
);

const Bars: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const a = out(f, 4, 18);
  const b = id === 'alone' ? 0 : out(f, id === 'group' ? dur * 0.3 : 0, id === 'group' ? dur * 0.7 : 8);
  const c = id === 'drop' ? out(f, dur * 0.25, dur * 0.7) : 0;
  return (
    <AbsoluteFill>
      <ClassRoom dim={0.45} />
      <Bar label="একা থাকলে" value="১%-এরও কম ভুল" pct={0.7 * a} color={GOLD} top={300} o={a} />
      {id !== 'alone' ? <Bar label="৭ জন ভুল বললে" value="প্রায় ৩৭% ভুল" pct={36.8 * b} color={RED} top={660} o={b > 0 ? 1 : 0} /> : null}
      {id === 'drop' ? <Bar label="একজন সঙ্গী সঠিক বললে" value="মাত্র ৫%" pct={5.5 * c} color={GREEN} top={1020} o={c > 0 ? 1 : 0} /> : null}
      {id === 'alone' ? (
        <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', opacity: out(f, dur * 0.4, dur * 0.55)}}>
          <LineCard width={640} mark="C" />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const WHY: Record<string, string> = {why: 'কেন?', why1: '"আমারই চোখের ভুল?"', why2: '"একা আলাদা হতে চাইনি"'};

const Why: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ClassRoom />
      <Cam zoom={interpolate(f, [0, dur], [2.2, 2.35])} x={seatX(ME) - 80} y={headY + 220}>
        <Row spot={ME} looks={(i) => (i === ME ? {brow: 'worried', mouth: id === 'why2' ? 'tense' : 'neutral'} : {})} />
      </Cam>
      <div style={{position: 'absolute', top: 240, left: 40, right: 40, textAlign: 'center', opacity: out(f, 2, 12), transform: `scale(${out(f, 2, 12, 0.85, 1)})`}}>
        <Bubble size={id === 'why' ? 130 : 76} tail="right">
          {WHY[id]}
        </Bubble>
      </div>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Ally: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const ALLY = 3;
  const on = id === 'ally' ? out(f, 4, 14) : 0;
  return (
    <AbsoluteFill>
      <ClassRoom />
      <SmallCard mark="C" color={GOLD} />
      <Row spot={id === 'ally' ? ALLY : undefined} />
      {id === 'change' ? (
        <div style={{position: 'absolute', left: seatX(ALLY), top: headY - 220, transform: 'translateX(-50%)', fontSize: 140, color: GOLD, fontWeight: 800, opacity: out(f, dur * 0.3, dur * 0.5)}}>?</div>
      ) : (
        Array.from({length: 7}, (_, i) =>
          i === ALLY ? <Answer key={i} i={i} letter="C" o={on} color="#1f8a4a" /> : <Answer key={i} i={i} letter="A" o={out(f, 0, 6) * 0.85} color={RED} />,
        )
      )}
      {id === 'ally' ? (
        <Title top={1440} size={66} color={GREEN} opacity={out(f, dur * 0.4, dur * 0.55)}>
          মাত্র একজন সঙ্গী
        </Title>
      ) : null}
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const AschScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const sw = out(f, dur * 0.55, dur * 0.7);
  return (
    <AbsoluteFill>
      <ClassRoom />
      <Cam zoom={interpolate(f, [0, dur], [1.25, 1.35])} x={540} y={820}>
        <Place x={540} y={1480}>
          <Person height={1150} {...ASCH} />
        </Place>
      </Cam>
      <div style={{position: 'absolute', left: 90, top: 1160, padding: '18px 34px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${GOLD}`, opacity: out(f, 4, 14)}}>
        <div style={{fontSize: 60, fontWeight: 800}}>Solomon Asch</div>
        <div style={{fontSize: 36, color: GOLD}}>Swarthmore · 1951</div>
      </div>
      <div style={{position: 'absolute', top: 200, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30, opacity: sw}}>
        <div style={{width: 170, height: 170, background: '#fff', borderRadius: 20}} />
        <div style={{fontSize: 130, fontWeight: 800, color: RED}}>=</div>
        <div style={{width: 170, height: 170, background: '#000', border: '6px solid #555', borderRadius: 20}} />
      </div>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Most: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const a = out(f, 4, dur * 0.4);
  const voice = spring({frame: f - dur * 0.5, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <ClassRoom dim={0.4} />
      <Bar label="সব উত্তরের মধ্যে" value="প্রায় ৬৪% সঠিক" pct={64.3 * a} color={GOLD} top={300} o={a > 0 ? 1 : 0} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', transform: `scale(${voice})`, opacity: voice}}>
        <Bubble size={120} text="#1f8a4a">
          C ✓
        </Bubble>
      </div>
      <Title top={1100} size={70} color={GREEN} opacity={voice}>
        একটা সৎ কণ্ঠ
      </Title>
    </AbsoluteFill>
  );
};

const MEET = [LOOKS[0], LOOKS[1], LOOKS[2], LOOKS[3], LOOKS[5], LOOKS[6]];
const MeetingRow: React.FC<{speaker?: number; second?: number; nod?: boolean}> = ({speaker = -1, second = 0, nod}) => {
  const f = useCurrentFrame();
  return (
    <>
      {MEET.map((l, i) => {
        const x = 110 + i * 172;
        const stand = Math.max(0, i === 3 ? speaker : i === 4 ? second : 0);
        const bob = nod && i !== 3 ? Math.max(0, Math.sin(f / 5 + i)) * 10 : 0;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: ROW_Y - stand * 140 + bob, transform: 'translate(-50%, -100%)'}}>
            <Person height={PERSON_H + 40} {...l} armR={stand > 0.5 ? 150 : 6} mouth={nod && i !== 3 ? 'smile' : 'neutral'} brow={i === 3 && nod ? 'worried' : 'neutral'} />
          </div>
        );
      })}
      <div style={{position: 'absolute', left: -20, right: -20, top: 1150, height: 260, background: 'linear-gradient(180deg, #3a3a42 0 22px, #26262c 22px)'}} />
    </>
  );
};

const Meeting: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ClassRoom warm={0.6} />
      <MeetingRow nod />
      <div style={{position: 'absolute', top: 320, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30}}>
        {['মিটিং', 'ক্লাস', 'গ্রুপ চ্যাট'].map((t, i) => (
          <div key={t} style={{fontSize: 56, fontWeight: 800, padding: '14px 30px', borderRadius: 18, background: 'rgba(0,0,0,0.5)', border: `3px solid ${GOLD}`, color: GOLD, opacity: out(f, i * dur * 0.2, i * dur * 0.2 + 8)}}>
            {t}
          </div>
        ))}
      </div>
      <Title top={560} size={120} opacity={out(f, dur * 0.55, dur * 0.7)}>
        👍👍👍
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Speak: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const courage = id === 'courage';
  const up = courage ? 1 : inOut(f, 4, 18);
  const second = courage ? inOut(f, dur * 0.35, dur * 0.6) : 0;
  return (
    <AbsoluteFill>
      <ClassRoom warm={1.2} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 500px 900px at 620px 50%, rgba(255,230,160,0.2), rgba(0,0,0,0) 70%)'}} />
      <MeetingRow speaker={up} second={second} />
      <div style={{position: 'absolute', top: 260, left: 40, right: 40, textAlign: 'center', opacity: out(f, courage ? 0 : 10, courage ? 6 : 22)}}>
        <Bubble size={68} tail="right">
          "আমার তো অন্যরকম লাগছে।"
        </Bubble>
      </div>
      {courage ? (
        <Title top={560} size={90} color={GREEN} opacity={second}>
          + ১ জন
        </Title>
      ) : null}
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  const pulse = 1 + 0.04 * Math.sin(f / 6);
  return (
    <AbsoluteFill>
      <ClassRoom dim={0.3} />
      <div style={{position: 'absolute', left: 240, top: 820, opacity: 0.5}}>
        <LineCard width={600} mark="C" />
      </div>
      <div style={{position: 'absolute', top: 360, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <div style={{padding: '40px 100px', borderRadius: 999, background: RED, fontSize: 104, fontWeight: 800, transform: `scale(${pop * pulse})`, boxShadow: '0 0 80px rgba(224,36,60,0.55)'}}>+ ফলো করো</div>
      </div>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  lines: Lines,
  stat: Stat,
  college: College,
  room: Room,
  actors: Actors,
  rounds: Rounds,
  answer: AnswerScene,
  turn: Turn,
  split: Split,
  bars: Bars,
  why: Why,
  ally: Ally,
  asch: AschScene,
  most: Most,
  meeting: Meeting,
  speak: Speak,
  cta: Cta,
};

export const AschSceneView: React.FC<{seg: AschSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};
