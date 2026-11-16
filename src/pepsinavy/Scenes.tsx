import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Cam, LOOKS, Person, PersonProps, Place, Vignette} from '../art';
import {Bubble} from '../milgram/art';
import {BG, BLUE, Can, FG, FollowButton, GOLD, GREEN, Office, PEPSI, Plain, PriceTag, RED, Title, clampOpts, inOut, out} from '../biz/art';

export {BG, FG};
export type PNSegment = {id: string; text: string; visual: string};
type SP = {dur: number; id: string};
type Look = Omit<PersonProps, 'height'>;

export const PBLUE = '#1f4fb5';
const SOV = '#c8102e';
const SEA = '#0d2a44';

export const KENDALL: Look = {hairStyle: 'short', hair: '#6a5a4a', skin: '#efc6a6', top: '#2a2f3a', bottom: '#1c1e24', tie: PBLUE};
export const KHRUSHCHEV: Look = {hairStyle: 'bald', hair: '#c9c2b4', skin: '#e6b896', top: '#4a4a40', bottom: '#33352e', tie: '#3a3a30'};
const ADVISER: Look = {hairStyle: 'short', hair: '#e8e4dc', skin: '#efc6a6', top: '#22262e', bottom: '#1a1c22', tie: '#a01a2a', glasses: true};

// ---------- উপাদান ----------

export const Sub: React.FC<{width?: number; color?: string; rust?: number}> = ({width = 600, color = '#3a4450', rust = 0}) => (
  <svg viewBox="0 0 600 160" width={width} height={(width * 160) / 600} style={{overflow: 'visible'}}>
    <path d="M30 100 C30 60 80 50 140 50 L480 50 C560 50 590 80 590 100 C590 120 560 140 480 140 L140 140 C80 140 30 130 30 100Z" fill={color} />
    <path d="M250 50 L270 0 L360 0 L370 50Z" fill={color} />
    <rect x={300} y={-30} width={8} height={34} fill={color} />
    <path d="M10 100 L-20 70 L-20 130Z" fill={color} />
    {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={170 + i * 70} cy={95} r={8} fill="#1a2028" />)}
    <path d="M200 70 L230 70 L235 82 L195 82Z" fill={SOV} />
    {rust > 0 ? <rect x={30} y={50} width={560} height={90} rx={45} fill="#8a4a20" opacity={rust * 0.6} /> : null}
  </svg>
);

export const Warship: React.FC<{width?: number; kind?: string; color?: string}> = ({width = 600, kind = 'CRUISER', color = '#4a5460'}) => (
  <svg viewBox="0 0 600 260" width={width} height={(width * 260) / 600} style={{overflow: 'visible'}}>
    <path d="M0 170 L600 170 L560 240 L50 240Z" fill={color} />
    <rect x={160} y={110} width={260} height={60} fill={color} />
    <rect x={240} y={50} width={110} height={60} fill={color} />
    <rect x={290} y={0} width={10} height={50} fill={color} />
    <rect x={80} y={140} width={60} height={30} fill={color} />
    <rect x={60} y={150} width={70} height={8} fill={color} />
    <rect x={450} y={140} width={60} height={30} fill={color} />
    <rect x={500} y={150} width={70} height={8} fill={color} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={190 + i * 60} y={125} width={30} height={14} fill="#1a2028" />)}
    <text x={300} y={225} textAnchor="middle" fontSize={34} fontWeight={900} fontFamily="Arial Black, Arial" fill="#c9ced3" letterSpacing={6}>{kind}</text>
  </svg>
);

export const Vodka: React.FC<{size?: number}> = ({size = 260}) => (
  <svg viewBox="0 0 100 260" width={size * 0.38} height={size}>
    <rect x={38} y={0} width={24} height={20} rx={3} fill={SOV} />
    <path d="M40 20 L60 20 L60 60 C80 70 84 90 84 110 L84 250 C84 256 80 260 74 260 L26 260 C20 260 16 256 16 250 L16 110 C16 90 20 70 40 60Z" fill="rgba(220,235,245,0.85)" />
    <rect x={18} y={130} width={64} height={70} fill="#f2efe9" />
    <text x={50} y={160} textAnchor="middle" fontSize={14} fontWeight={900} fontFamily="Arial" fill={SOV}>VODKA</text>
    <rect x={30} y={172} width={40} height={4} fill={SOV} />
  </svg>
);

const Coin: React.FC<{size?: number; label?: string; color?: string}> = ({size = 220, label = '₽', color = '#b8a070'}) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx={50} cy={50} r={48} fill={color} />
    <circle cx={50} cy={50} r={40} fill="none" stroke="#7a6a40" strokeWidth={3} />
    <text x={50} y={66} textAnchor="middle" fontSize={46} fontWeight={900} fill="#5a4a20">{label}</text>
  </svg>
);

// পতাকা (সরল রূপ)
const UsFlag: React.FC<{w?: number}> = ({w = 300}) => (
  <svg viewBox="0 0 190 100" width={w} height={(w * 100) / 190}>
    {Array.from({length: 13}, (_, i) => <rect key={i} y={(i * 100) / 13} width={190} height={100 / 13} fill={i % 2 ? '#fff' : '#b22234'} />)}
    <rect width={76} height={54} fill="#3c3b6e" />
  </svg>
);
const SovFlag: React.FC<{w?: number}> = ({w = 300}) => (
  <svg viewBox="0 0 190 100" width={w} height={(w * 100) / 190}>
    <rect width={190} height={100} fill={SOV} />
    <path d="M24 6 L26 11 L31 11 L27 14 L28.5 19 L24 16 L19.5 19 L21 14 L17 11 L22 11Z" fill="none" stroke="#f6c026" strokeWidth={1.6} />
    <path d="M14 40 A12 12 0 1 0 32 26 A9 9 0 1 1 18 38Z" fill="#f6c026" />
    <rect x={17} y={24} width={4} height={20} fill="#f6c026" transform="rotate(-45 19 34)" />
    <rect x={14} y={22} width={12} height={5} fill="#f6c026" transform="rotate(-45 19 34)" />
  </svg>
);

const Glass: React.FC<{size?: number}> = ({size = 120}) => (
  <svg viewBox="0 0 60 90" width={size * 0.67} height={size}>
    <path d="M6 4 L54 4 L48 86 L12 86Z" fill="rgba(220,235,245,0.4)" stroke="#d8e2ea" strokeWidth={3} />
    <path d="M9 24 L51 24 L47 84 L13 84Z" fill="#3a1a0e" />
    {[0, 1, 2].map((i) => <circle key={i} cx={20 + i * 10} cy={50 + i * 10} r={2} fill="#a06a3a" />)}
  </svg>
);

const Sea: React.FC<{dark?: number}> = ({dark = 0}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${dark ? '#0a0e18' : '#1a2a44'} 0%, ${dark ? '#1a1424' : '#4a6a8a'} 50%, ${SEA} 51%, #061420 100%)`}} />
      {Array.from({length: 7}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: ((i * 170 + f * 2) % 1240) - 160, top: 1000 + i * 70, width: 160, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.12)'}} />
      ))}
    </AbsoluteFill>
  );
};

const NameCard: React.FC<{name: string; sub: string; o: number; top?: number; color?: string}> = ({name, sub, o, top = 1180, color = PBLUE}) => (
  <div style={{position: 'absolute', left: 90, top, padding: '16px 30px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${color}`, opacity: o}}>
    <div style={{fontSize: 56, fontWeight: 800}}>{name}</div>
    <div style={{fontSize: 34, color: GOLD}}>{sub}</div>
  </div>
);

// ---------- দৃশ্য ----------

const Navy: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Sea dark={1} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{position: 'absolute', left: interpolate(f, [0, dur], [-200 + i * 260, -60 + i * 260]), top: 760 + (i % 2) * 120}}>
          <Sub width={360} />
        </div>
      ))}
      <div style={{position: 'absolute', left: interpolate(f, [0, dur], [200, 300]), top: 620}}>
        <Warship width={620} />
      </div>
      <Title top={240} size={250} color={GOLD} opacity={out(f, 4, 14)}>
        #6
      </Title>
      <Title top={500} size={60} opacity={out(f, dur * 0.4, dur * 0.6)}>
        দুনিয়ার ষষ্ঠ বৃহত্তম নৌবাহিনী
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const NameScene: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 2, fps: 30, config: {damping: 11}});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, rgba(31,79,181,${0.4 * pop}), rgba(0,0,0,0) 60%)`}} />
      <div style={{position: 'absolute', left: 390, top: 420, transform: `scale(${pop}) rotate(${(1 - pop) * -20}deg)`}}>
        <Can {...PEPSI} size={600} />
      </div>
    </AbsoluteFill>
  );
};

const ColdWar: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const clash = inOut(f, dur * 0.3, dur * 0.7);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.12)" />
      <Title top={140} size={130} color={GOLD} opacity={out(f, 0, 10)}>
        1959
      </Title>
      <div style={{position: 'absolute', left: interpolate(clash, [0, 1], [-200, 100]), top: 520}}>
        <UsFlag w={380} />
      </div>
      <div style={{position: 'absolute', right: interpolate(clash, [0, 1], [-200, 100]), top: 520}}>
        <SovFlag w={380} />
      </div>
      <Title top={800} size={130} color={RED} opacity={clash}>
        ⚡
      </Title>
      <Title top={1040} size={84} opacity={out(f, dur * 0.4, dur * 0.6)}>
        ঠান্ডা যুদ্ধ
      </Title>
    </AbsoluteFill>
  );
};

const GlassScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const give = inOut(f, dur * 0.4, dur * 0.8);
  return (
    <AbsoluteFill>
      <Office />
      <Place x={280} y={1580}>
        <Person height={820} {...KENDALL} armR={20 + 60 * give} />
      </Place>
      <Place x={800} y={1580}>
        <Person height={780} {...KHRUSHCHEV} />
      </Place>
      <div style={{position: 'absolute', left: interpolate(give, [0, 1], [360, 560]), top: 900 - give * 40}}>
        <Glass size={150} />
      </div>
      <NameCard name="Donald Kendall" sub="Pepsi" o={out(f, 4, 14)} top={300} />
      <div style={{position: 'absolute', right: 90, top: 520, padding: '16px 30px', background: 'rgba(0,0,0,0.65)', borderRight: `8px solid ${SOV}`, textAlign: 'right', opacity: out(f, dur * 0.25, dur * 0.4)}}>
        <div style={{fontSize: 56, fontWeight: 800}}>Khrushchev</div>
        <div style={{fontSize: 34, color: GOLD}}>সোভিয়েত নেতা</div>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Photo: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const flash = f < 8 ? 1 - f / 8 : 0;
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 140, top: 300, width: 800, height: 900, background: '#f2efe9', padding: 30, boxShadow: '0 40px 90px rgba(0,0,0,0.6)', transform: `rotate(-4deg) scale(${interpolate(f, [0, dur], [1, 1.05])})`}}>
        <div style={{position: 'relative', width: '100%', height: 740, background: '#3a3a3a', overflow: 'hidden', filter: 'grayscale(1) contrast(1.1)'}}>
          <Place x={250} y={980}>
            <Person height={760} {...KENDALL} />
          </Place>
          <Place x={560} y={980}>
            <Person height={720} {...KHRUSHCHEV} armR={90} holding={<Glass size={90} />} />
          </Place>
        </div>
        <div style={{marginTop: 20, fontFamily: 'Georgia, serif', fontSize: 46, color: '#222', textAlign: 'center'}}>Moscow, 1959</div>
      </div>
      <AbsoluteFill style={{background: '#fff', opacity: flash}} />
    </AbsoluteFill>
  );
};

const First: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.3, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,16,46,0.14)" />
      <div style={{position: 'absolute', left: 370, top: 300}}>
        <SovFlag w={340} />
      </div>
      <div style={{position: 'absolute', left: 430, top: 560, transform: `scale(${pop})`}}>
        <Can {...PEPSI} size={420} />
      </div>
      <Title top={1080} size={90} color={GOLD} opacity={pop}>
        প্রথম আমেরিকান পণ্য
      </Title>
    </AbsoluteFill>
  );
};

const Ruble: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const x = out(f, dur * 0.35, dur * 0.55);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 430, top: 420, transform: `rotateY(${f * 8}deg)`}}>
        <Coin size={240} />
      </div>
      <Title top={420} size={260} color={RED} opacity={x}>
        ✕
      </Title>
      <Title top={800} size={84} color={RED} opacity={x}>
        বাইরে অচল
      </Title>
    </AbsoluteFill>
  );
};

const VodkaScene: React.FC<SP> = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,220,240,0.14)" />
      {[0, 1, 2, 3, 4].map((i) => {
        const p = spring({frame: f - i * 4, fps: 30, config: {damping: 12}});
        return (
          <div key={i} style={{position: 'absolute', left: 170 + i * 150, top: 520 - (i % 2) * 40, transform: `translateY(${(1 - p) * 400}px)`, opacity: p}}>
            <Vodka size={420} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Swap: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, dur * 0.15, dur * 0.7);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 60, top: 280}}>
        <UsFlag w={300} />
      </div>
      <div style={{position: 'absolute', right: 60, top: 280}}>
        <SovFlag w={300} />
      </div>
      <div style={{position: 'absolute', left: interpolate(m, [0, 1], [180, 760]), top: 600 - Math.sin(m * Math.PI) * 120}}>
        <Can {...PEPSI} size={260} />
      </div>
      <div style={{position: 'absolute', left: interpolate(m, [0, 1], [820, 220]), top: 880 + Math.sin(m * Math.PI) * 80}}>
        <Vodka size={300} />
      </div>
      <Title top={1260} size={66} opacity={out(f, dur * 0.6, dur * 0.8)}>
        কোলা ⇄ ভদকা
      </Title>
    </AbsoluteFill>
  );
};

const Afghan: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a2a1a 0%, #8a6a40 55%, #4a3420 56%, #2a1c10 100%)'}} />
      <svg width={1080} height={600} viewBox="0 0 1080 600" style={{position: 'absolute', top: 500}}>
        <path d="M0 520 L200 260 L320 380 L520 140 L700 360 L860 220 L1080 480 L1080 600 L0 600Z" fill="#5a4028" />
      </svg>
      {[0, 1, 2, 3].map((i) => (
        <svg key={i} width={300} height={140} viewBox="0 0 300 140" style={{position: 'absolute', left: interpolate(f, [0, dur], [-300 + i * 220, 100 + i * 220]), top: 1040 + (i % 2) * 40}}>
          <rect x={20} y={50} width={240} height={60} rx={10} fill="#4a5030" />
          <rect x={80} y={20} width={110} height={40} rx={8} fill="#4a5030" />
          <rect x={170} y={34} width={120} height={10} fill="#4a5030" />
          {[0, 1, 2, 3].map((k) => <circle key={k} cx={50 + k * 60} cy={115} r={20} fill="#2a2a20" />)}
          <path d="M100 30 L106 40 L114 30Z" fill={SOV} />
        </svg>
      ))}
      <Title top={240} size={100} color="#f2e0c0" opacity={out(f, 4, 14)}>
        Afghanistan · 1979
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Boycott: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pour = out(f, dur * 0.25, dur * 0.7);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.12)" />
      <Place x={300} y={1560}>
        <Person height={820} {...LOOKS[4]} brow="worried" mouth="tense" armR={60 + 50 * pour} holding={<div style={{transform: `rotate(${pour * 120}deg)`}}><Vodka size={160} /></div>} />
      </Place>
      <div style={{position: 'absolute', left: 470, top: 360, padding: '16px 30px', border: `10px solid ${RED}`, color: RED, fontSize: 90, fontWeight: 900, fontFamily: 'Arial Black, Arial', transform: 'rotate(-10deg)', opacity: out(f, dur * 0.3, dur * 0.45)}}>BOYCOTT</div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Blocked: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const shut = inOut(f, dur * 0.2, dur * 0.6);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 120, top: 640, fontSize: 130}}>💰</div>
      <div style={{position: 'absolute', left: 300, right: 120, top: 700, height: 30, background: GOLD, borderRadius: 15}} />
      <div style={{position: 'absolute', left: 520, top: 520 - (1 - shut) * 600, width: 60, height: 400, background: RED, borderRadius: 10}} />
      <div style={{position: 'absolute', right: 80, top: 600}}>
        <Can {...PEPSI} size={260} />
      </div>
      <Title top={1100} size={90} color={RED} opacity={shut}>
        রাস্তা বন্ধ
      </Title>
    </AbsoluteFill>
  );
};

const Offer: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office tint="rgba(200,60,60,0.5)" />
      <Place x={300} y={1580}>
        <Person height={820} {...KENDALL} brow="worried" />
      </Place>
      <Place x={790} y={1580}>
        <Person height={800} {...KHRUSHCHEV} hair="#5a4a3a" hairStyle="short" tie={SOV} armR={60} />
      </Place>
      <Title top={150} size={130} color={GOLD} opacity={out(f, 0, 10)}>
        1989
      </Title>
      <Title top={400} size={180} opacity={out(f, dur * 0.4, dur * 0.6)}>
        ?
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Subs: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [0, dur * 0.85], [1, 17], clampOpts));
  return (
    <AbsoluteFill>
      <Sea />
      <div style={{position: 'absolute', top: 330, left: 40, right: 40, display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center'}}>
        {Array.from({length: 17}, (_, i) => (
          <div key={i} style={{opacity: i < n ? 1 : 0, transform: `translateY(${i < n ? 0 : 40}px)`}}>
            <Sub width={290} />
          </div>
        ))}
      </div>
      <Title top={140} size={130} color={GOLD}>
        {n}
      </Title>
    </AbsoluteFill>
  );
};

const Ships: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const kinds = ['CRUISER', 'FRIGATE', 'DESTROYER'];
  return (
    <AbsoluteFill>
      <Sea />
      {kinds.map((k, i) => {
        const p = spring({frame: f - (dur * i) / 3, fps: 30, config: {damping: 14}});
        return (
          <div key={k} style={{position: 'absolute', left: interpolate(p, [0, 1], [1100, 140 + (i % 2) * 80]), top: 300 + i * 300}}>
            <Warship width={760 - i * 60} kind={k} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Owner: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.3, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Sea dark={1} />
      <div style={{position: 'absolute', left: 200, top: 640}}>
        <Warship width={700} kind="PEPSI NAVY" color="#3a4a6a" />
      </div>
      <div style={{position: 'absolute', left: 470, top: 260, transform: `scale(${pop})`}}>
        <Can {...PEPSI} size={320} />
      </div>
      <Title top={1130} size={84} color={GOLD} opacity={out(f, dur * 0.5, dur * 0.7)}>
        রাতারাতি যুদ্ধজাহাজের মালিক
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Joke: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      <Place x={300} y={1580}>
        <Person height={860} {...KENDALL} mouth="smile" armR={40} />
      </Place>
      <Place x={800} y={1580}>
        <Person height={840} {...ADVISER} />
      </Place>
      <div style={{position: 'absolute', left: 60, right: 60, top: 260, opacity: out(f, dur * 0.25, dur * 0.35)}}>
        <Bubble size={58} tail="left" color={GOLD}>
          "সোভিয়েত ইউনিয়নকে তোমাদের চেয়ে দ্রুত আমরাই নিরস্ত্র করছি।"
        </Bubble>
      </div>
      <Title top={720} size={130} opacity={out(f, dur * 0.7, dur * 0.8)}>
        😄
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Scrap: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const r = out(f, 0, dur * 0.7);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2420 0%, #4a3a30 60%, #1a1410 100%)'}} />
      <div style={{position: 'absolute', left: 120, top: 560, transform: `rotate(${r * 8}deg)`}}>
        <Sub width={800} color="#5a5048" rust={r} />
      </div>
      {Array.from({length: 12}, (_, i) => {
        const t = Math.max(0, f - dur * 0.3 - i * 3);
        return <div key={i} style={{position: 'absolute', left: 300 + ((i * 61) % 500), top: 700 + t * (3 + (i % 3)), width: 30 + (i % 3) * 14, height: 16, background: '#7a5a3a', transform: `rotate(${t * 9}deg)`, opacity: Math.max(0, 1 - t / 60)}} />;
      })}
      <Title top={1100} size={110} color="#d9a060" opacity={out(f, dur * 0.3, dur * 0.5)}>
        ভাঙারি!
      </Title>
    </AbsoluteFill>
  );
};

const Bigger: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.2, fps: 30, config: {damping: 11}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(95,208,138,0.15)" />
      <div style={{position: 'absolute', top: 460, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: pop}}>
        <PriceTag text="$3B" size={0.6 + 0.5 * pop} color={GREEN} />
      </div>
      <div style={{position: 'absolute', left: 150, top: 900}}>
        <Can {...PEPSI} size={300} />
      </div>
      <div style={{position: 'absolute', right: 180, top: 900}}>
        <SovFlag w={300} />
      </div>
    </AbsoluteFill>
  );
};

const Collapse: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const c = inOut(f, dur * 0.2, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.15)" />
      <Title top={150} size={130} color={RED} opacity={out(f, 0, 10)}>
        1991
      </Title>
      <div style={{position: 'absolute', left: 260, top: 520, width: 560, height: 300, overflow: 'visible'}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 280, height: 300, overflow: 'hidden', transform: `translate(${-c * 120}px, ${c * 300}px) rotate(${-c * 25}deg)`, opacity: 1 - c * 0.6}}>
          <SovFlag w={560} />
        </div>
        <div style={{position: 'absolute', left: 280, top: 0, width: 280, height: 300, overflow: 'hidden', transform: `translate(${c * 120}px, ${c * 340}px) rotate(${c * 25}deg)`, opacity: 1 - c * 0.6}}>
          <div style={{marginLeft: -280}}>
            <SovFlag w={560} />
          </div>
        </div>
      </div>
      <Title top={1160} size={84} color={RED} opacity={out(f, dur * 0.6, dur * 0.8)}>
        চুক্তিও শেষ
      </Title>
    </AbsoluteFill>
  );
};

const Moral: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, dur * 0.2, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(227,191,122,0.12)" />
      <div style={{position: 'absolute', left: interpolate(m, [0, 1], [160, 680]), top: 460 - Math.sin(m * Math.PI) * 120}}>
        <Can {...PEPSI} size={260} />
      </div>
      <div style={{position: 'absolute', left: interpolate(m, [0, 1], [700, 180]), top: 520 + Math.sin(m * Math.PI) * 80}}>
        <Sub width={300} />
      </div>
      <Title top={1000} size={80} color={GOLD} opacity={out(f, dur * 0.5, dur * 0.7)}>
        টাকা নেই? বিনিময় আছে।
      </Title>
    </AbsoluteFill>
  );
};

const Barter: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, dur * 0.4, dur * 0.9);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(95,208,138,0.12)" />
      <Place x={280} y={1580}>
        <Person height={820} {...LOOKS[0]} armR={40} />
      </Place>
      <Place x={800} y={1580}>
        <Person height={800} {...LOOKS[3]} brow="worried" />
      </Place>
      <div style={{position: 'absolute', left: 620, top: 420, fontSize: 130, opacity: 1 - m}}>💸✕</div>
      <div style={{position: 'absolute', left: interpolate(m, [0, 1], [700, 380]), top: 520, fontSize: 140, opacity: m}}>📦</div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Risk: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const c = inOut(f, dur * 0.35, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.12)" />
      <div style={{position: 'absolute', left: 140, top: 600, width: 800, height: 40, background: '#6a4a34', borderRadius: 8, transform: `rotate(${c * 18}deg)`, transformOrigin: '20% 50%'}} />
      <div style={{position: 'absolute', left: 260, top: 640, width: 60, height: 400, background: '#4a3426', transform: `rotate(${c * 40}deg)`, transformOrigin: '50% 0'}} />
      <div style={{position: 'absolute', left: 620, top: 460 + c * 300, transform: `rotate(${c * 40}deg)`}}>
        <Can {...PEPSI} size={200} />
      </div>
      <Title top={1180} size={74} color={RED} opacity={out(f, dur * 0.5, dur * 0.7)}>
        ভরসা ভাঙলে চুক্তিও ভাঙে
      </Title>
    </AbsoluteFill>
  );
};

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Sea dark={1} />
      <div style={{position: 'absolute', left: 240, top: 900, opacity: 0.5}}>
        <Sub width={600} />
      </div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  navy: Navy,
  name: NameScene,
  coldwar: ColdWar,
  glass: GlassScene,
  photo: Photo,
  first: First,
  ruble: Ruble,
  vodka: VodkaScene,
  swap: Swap,
  afghan: Afghan,
  boycott: Boycott,
  blocked: Blocked,
  offer: Offer,
  subs: Subs,
  ships: Ships,
  owner: Owner,
  joke: Joke,
  scrap: Scrap,
  bigger: Bigger,
  collapse: Collapse,
  moral: Moral,
  barter: Barter,
  risk: Risk,
  cta: Cta,
};

export const PepsiNavyScene: React.FC<{seg: PNSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};

export {Cam, BLUE, SovFlag};
