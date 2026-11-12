import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame} from 'remotion';
import {LOOKS, Person, PersonProps, Place, Vignette} from '../art';
import {Bubble} from '../milgram/art';
import {BG, FG, FollowButton, GOLD, GREEN, Office, Plain, PriceTag, RED, Title, clampOpts, inOut, out} from '../biz/art';

export {BG, FG};
export type BSegment = {id: string; text: string; visual: string};
type SP = {dur: number; id: string};
type Look = Omit<PersonProps, 'height'>;

export const AMBER = '#ffc861';

const EXECS: Look[] = [
  {hairStyle: 'short', hair: '#2a1e14', skin: '#e2b391', top: '#22262e', bottom: '#1a1c22', tie: '#7a2a2a'},
  {hairStyle: 'bald', hair: '#7a7068', skin: '#dcaa88', top: '#2f3440', bottom: '#22252c', tie: '#1b1d22', glasses: true},
  {hairStyle: 'short', hair: '#9a9590', skin: '#efc6a6', top: '#3a3028', bottom: '#22201c', tie: '#2b4fa0'},
  {hairStyle: 'short', hair: '#4a3a2a', skin: '#e0b090', top: '#262a32', bottom: '#1c1e24', tie: '#5a4a2a', glasses: true},
];
const ENGINEER: Look = {hairStyle: 'short', hair: '#3a2a1e', skin: '#ecc19e', top: '#c9ced3', bottom: '#2a2c30', labCoat: true, glasses: true};

// ---------- উপাদান ----------

// পুরোনো ফিলামেন্ট বাল্ব
export const Bulb: React.FC<{size?: number; on?: number; broken?: boolean}> = ({size = 300, on = 1, broken}) => (
  <svg viewBox="0 0 100 160" width={size * 0.625} height={size} style={{overflow: 'visible'}}>
    {on > 0 && !broken ? <circle cx={50} cy={50} r={70} fill={AMBER} opacity={0.25 * on} /> : null}
    <path d="M50 4 C20 4 6 28 6 50 C6 72 26 84 32 100 L68 100 C74 84 94 72 94 50 C94 28 80 4 50 4Z" fill={broken ? 'rgba(120,120,130,0.35)' : `rgba(255,${200 + 40 * on},${120 + 80 * on},${0.25 + 0.6 * on})`} stroke="#d8d0c0" strokeWidth={2} />
    {broken ? (
      <path d="M30 40 L44 56 L36 66 L54 80" stroke="#555" strokeWidth={3} fill="none" />
    ) : (
      <path d="M38 100 L40 60 L44 46 L48 60 L52 46 L56 60 L60 100" stroke={on > 0.3 ? '#fff6d0' : '#6a5a40'} strokeWidth={3} fill="none" />
    )}
    <rect x={32} y={100} width={36} height={30} fill="#b8a070" />
    {[0, 1, 2].map((i) => <rect key={i} x={30} y={104 + i * 9} width={40} height={4} fill="#8a7a50" />)}
    <path d="M38 130 L62 130 L56 148 L44 148Z" fill="#5a4a30" />
  </svg>
);

const HourCounter: React.FC<{value: number; color?: string; size?: number}> = ({value, color = AMBER, size = 140}) => (
  <div style={{fontFamily: '"Courier New", monospace', fontSize: size, fontWeight: 900, color, textShadow: `0 0 40px ${color}`, textAlign: 'center'}}>
    {Math.round(value).toLocaleString('en-US')}
    <span style={{fontSize: size * 0.35}}> ঘণ্টা</span>
  </div>
);

const Stamp: React.FC<{text: string; o: number; color?: string; size?: number; style?: React.CSSProperties}> = ({text, o, color = RED, size = 110, style}) => (
  <div style={{display: 'inline-block', padding: '14px 40px', border: `10px solid ${color}`, color, fontSize: size, fontWeight: 900, fontFamily: 'Arial Black, Arial', transform: `rotate(-12deg) scale(${2 - o})`, opacity: o, background: 'rgba(0,0,0,0.4)', ...style}}>{text}</div>
);

// আলপস পাহাড় আর লেক (Geneva)
const Geneva: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a2440 0%, #4a5a80 45%, #2a3a5a 60%, #12182a 100%)'}} />
    <svg width={1080} height={700} viewBox="0 0 1080 700" style={{position: 'absolute', top: 500}}>
      <path d="M0 500 L180 200 L300 330 L480 80 L640 300 L800 160 L1080 460 L1080 700 L0 700Z" fill="#3a4a6a" />
      <path d="M480 80 L430 160 L470 150 L500 170 L530 140Z M800 160 L760 220 L800 210 L830 230Z M180 200 L150 250 L190 240Z" fill="#e8ecf2" />
      <rect x={0} y={520} width={1080} height={180} fill="#1a2a44" />
    </svg>
  </AbsoluteFill>
);

const Sign: React.FC<{text: string; color: string}> = ({text, color}) => (
  <div style={{padding: '14px 28px', background: '#f2efe9', color, fontFamily: 'Arial Black, Arial', fontSize: 50, borderRadius: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.5)', whiteSpace: 'nowrap'}}>{text}</div>
);

const MeetingTable: React.FC = () => (
  <div style={{position: 'absolute', left: -20, right: -20, top: 1180, height: 300, background: 'linear-gradient(180deg, #4a3020 0 26px, #2a1a10 26px)'}} />
);

// ---------- দৃশ্য ----------

const Fine: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(255,200,97,0.18)" />
      <div style={{position: 'absolute', left: 390, top: 330}}>
        <Bulb size={480} on={0.9 + 0.1 * Math.sin(f / 4)} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 920, textAlign: 'center'}}>
        <Stamp text="FINE" o={out(f, dur * 0.4, dur * 0.55)} size={150} />
      </div>
      <Title top={200} size={70} color={AMBER} opacity={out(f, 4, 14)}>
        বেশি দিন টিকেছে?
      </Title>
    </AbsoluteFill>
  );
};

const Written: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 240, top: 280, width: 600, padding: 46, background: '#f2e8d0', color: '#1a1814', fontFamily: 'Georgia, serif', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', transform: 'rotate(-3deg)'}}>
        <div style={{fontSize: 46, fontWeight: 900, textAlign: 'center', letterSpacing: 3}}>PHOEBUS S.A.</div>
        <div style={{fontSize: 30, textAlign: 'center', marginTop: 6}}>Geneva · 1924</div>
        <div style={{borderTop: '3px solid #999', margin: '24px 0'}} />
        {Array.from({length: 7}, (_, i) => (
          <div key={i} style={{height: 12, background: '#bdb4a0', margin: '20px 0', width: `${60 + ((i * 37) % 40)}%`}} />
        ))}
        <div style={{fontSize: 40, fontWeight: 900, color: RED, marginTop: 20}}>MAX LIFE: 1000 HOURS</div>
      </div>
      <Title top={1130} size={84} color={GOLD} opacity={out(f, dur * 0.45, dur * 0.6)}>
        লিখিত চুক্তি
      </Title>
    </AbsoluteFill>
  );
};

const GenevaScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Geneva />
      <Title top={200} size={150} color={GOLD} opacity={out(f, 0, 10)}>
        1924
      </Title>
      <Title top={420} size={80} opacity={out(f, dur * 0.3, dur * 0.5)}>
        Geneva, Switzerland
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Meeting: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office tint="rgba(120,90,60,0.6)" light={0.7} />
      {EXECS.map((l, i) => (
        <Place key={i} x={170 + i * 250} y={1420}>
          <Person height={660} {...l} />
        </Place>
      ))}
      <MeetingTable />
      <div style={{position: 'absolute', left: 500, top: 1080}}>
        <Bulb size={160} on={0.6} />
      </div>
      <Title top={200} size={80} color={AMBER} opacity={out(f, dur * 0.3, dur * 0.5)}>
        গোপন বৈঠক 🤫
      </Title>
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const Names: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const names = [
    {t: 'OSRAM', c: '#e06a10'},
    {t: 'PHILIPS', c: '#1a5ab0'},
    {t: 'GENERAL ELECTRIC', c: '#1a4a8a'},
    {t: '+ আরও', c: '#555'},
  ];
  return (
    <AbsoluteFill>
      <Office tint="rgba(120,90,60,0.6)" light={0.7} />
      {EXECS.map((l, i) => (
        <Place key={i} x={170 + i * 250} y={1420}>
          <Person height={660} {...l} />
        </Place>
      ))}
      <MeetingTable />
      {names.map((n, i) => {
        const p = spring({frame: f - (i * dur) / 5, fps: 30, config: {damping: 12}});
        return (
          <div key={i} style={{position: 'absolute', left: 0, right: 0, top: 240 + i * 120, display: 'flex', justifyContent: 'center', transform: `scale(${p})`}}>
            <Sign text={n.t} color={n.c} />
          </div>
        );
      })}
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Phoebus: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 3, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, rgba(255,200,97,${0.3 * pop}), rgba(0,0,0,0) 60%)`}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: 150, fontWeight: 900, color: AMBER, letterSpacing: 8, transform: `scale(${0.6 + 0.4 * pop})`, opacity: pop, textShadow: `0 0 60px ${AMBER}`}}>
        PHOEBUS
      </div>
    </AbsoluteFill>
  );
};

const Problem: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(255,200,97,0.2)" />
      <div style={{position: 'absolute', left: 390, top: 360}}>
        <Bulb size={480} on={1} />
      </div>
      <Title top={1000} size={130} opacity={out(f, dur * 0.4, dur * 0.55)}>
        👍
      </Title>
      <Title top={200} size={80} color={AMBER} opacity={out(f, 4, 14)}>
        খুব ভালো বাল্ব
      </Title>
    </AbsoluteFill>
  );
};

const Hours: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [0, dur * 0.85], [0, 2500], clampOpts);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(255,200,97,0.18)" />
      <div style={{position: 'absolute', left: 430, top: 300}}>
        <Bulb size={360} on={1} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 800}}>
        <HourCounter value={v} />
      </div>
    </AbsoluteFill>
  );
};

const NoBuy: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 120, top: 360, width: 840, height: 520, background: '#2a2622', borderRadius: 16, border: '10px solid #4a3a2a'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 20, textAlign: 'center', fontSize: 56, fontWeight: 800, color: AMBER}}>LAMP SHOP</div>
        <div style={{position: 'absolute', left: 60, right: 60, top: 140, display: 'flex', justifyContent: 'space-around'}}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Bulb key={i} size={200} on={0.2} />
          ))}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 380, height: 20, background: '#4a3a2a'}} />
      </div>
      <Place x={540} y={1560}>
        <Person height={720} {...LOOKS[1]} armL={20} armR={20} />
      </Place>
      <Title top={180} size={84} color={RED} opacity={out(f, dur * 0.3, dur * 0.5)}>
        বিক্রি কম 📉
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Rule: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [dur * 0.25, dur * 0.85], [0, 1000], clampOpts);
  const dead = v >= 1000;
  return (
    <AbsoluteFill>
      <Plain glow={dead ? 'rgba(224,36,60,0.16)' : 'rgba(255,200,97,0.16)'} />
      <div style={{position: 'absolute', left: 430, top: 300}}>
        <Bulb size={360} on={dead ? 0 : 1} broken={dead} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 800}}>
        <HourCounter value={v} color={dead ? RED : AMBER} />
      </div>
      <Title top={1080} size={70} color={RED} opacity={dead ? 1 : 0}>
        সর্বোচ্চ ১০০০ ঘণ্টা
      </Title>
    </AbsoluteFill>
  );
};

const LabRows: React.FC<{onFn: (i: number) => number}> = ({onFn}) => (
  <div style={{position: 'absolute', left: 60, right: 60, top: 300, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20}}>
    {Array.from({length: 24}, (_, i) => {
      const on = onFn(i);
      return (
        <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
          <Bulb size={150} on={Math.max(0, on)} broken={on < 0} />
        </div>
      );
    })}
  </div>
);

const Lab: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #1c2026, #0e1014)'}} />
      <LabRows onFn={(i) => out(f, i * 2, i * 2 + 8)} />
      <Place x={540} y={1560}>
        <Person height={560} {...ENGINEER} armR={50} holding={<div style={{width: 80, height: 110, background: '#f2efe9', borderRadius: 6}} />} />
      </Place>
      <div style={{position: 'absolute', left: 90, top: 1150, padding: '14px 28px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${AMBER}`, opacity: out(f, dur * 0.4, dur * 0.6)}}>
        <div style={{fontSize: 50, fontWeight: 800}}>TEST LAB</div>
        <div style={{fontSize: 32, color: AMBER}}>Switzerland</div>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Burn: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const hours = interpolate(f, [0, dur], [0, 1200]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #1c2026, #0e1014)'}} />
      <LabRows onFn={(i) => (f > dur * (0.3 + random(`b${i}`) * 0.6) ? -1 : 1)} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1200}}>
        <HourCounter value={hours} size={110} />
      </div>
    </AbsoluteFill>
  );
};

const Penalty: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.14)" />
      <div style={{position: 'absolute', left: 430, top: 280}}>
        <Bulb size={360} on={1} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center', opacity: out(f, 2, 12)}}>
        <HourCounter value={1800} size={100} />
      </div>
      <div style={{position: 'absolute', top: 960, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: out(f, dur * 0.35, dur * 0.5)}}>
        <PriceTag text="FINE!" color={RED} size={0.9} />
      </div>
    </AbsoluteFill>
  );
};

const Think: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Title top={760} size={150} color={AMBER} opacity={out(f, 0, dur * 0.5)}>
        ভাবো…
      </Title>
    </AbsoluteFill>
  );
};

const Engineers: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office light={0.8} />
      {[0, 1, 2].map((i) => (
        <Place key={i} x={220 + i * 320} y={1560}>
          <Person height={760} {...ENGINEER} hair={['#3a2a1e', '#9a9590', '#6b4a2a'][i]} armR={50} holding={<Bulb size={130} on={0.8} />} />
        </Place>
      ))}
      <Title top={260} size={80} color={AMBER} opacity={out(f, dur * 0.3, dur * 0.5)}>
        ভালো করতে না…
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Break: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const crack = f > dur * 0.4;
  return (
    <AbsoluteFill>
      <Plain glow={crack ? 'rgba(224,36,60,0.16)' : 'rgba(255,200,97,0.16)'} />
      <div style={{position: 'absolute', left: 390, top: 300, transform: crack ? `translateX(${Math.sin(f * 3) * 6}px)` : undefined}}>
        <Bulb size={480} on={crack ? 0 : 1} broken={crack} />
      </div>
      <Title top={1000} size={110} color={RED} opacity={crack ? 1 : 0}>
        ঠিক সময়ে নষ্ট
      </Title>
    </AbsoluteFill>
  );
};

const BuyAgain: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const cycle = Math.floor((f / dur) * 4);
  return (
    <AbsoluteFill>
      <Plain />
      <Place x={300} y={1560}>
        <Person height={820} {...LOOKS[3]} armR={60} holding={<Bulb size={120} on={0.8} />} />
      </Place>
      <div style={{position: 'absolute', left: 560, top: 360, display: 'flex', flexWrap: 'wrap', width: 420, gap: 16}}>
        {Array.from({length: 8}, (_, i) => (
          <div key={i} style={{opacity: i < cycle * 2 + 1 ? 1 : 0.08}}>
            <Bulb size={160} on={0} broken />
          </div>
        ))}
      </div>
      <Title top={200} size={66} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.6)}>
        বারবার কেনা 🔁
      </Title>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const FireStation: React.FC<{glow?: number}> = ({glow = 1}) => (
  <svg viewBox="0 0 900 700" width={900} height={700}>
    <rect x={80} y={160} width={740} height={540} fill="#9a3a2a" />
    <path d="M60 170 L450 40 L840 170Z" fill="#6a2418" />
    <rect x={160} y={360} width={260} height={340} fill="#2a2a30" />
    <rect x={480} y={360} width={260} height={340} fill="#2a2a30" />
    <rect x={220} y={210} width={460} height={80} fill="#f2efe9" />
    <text x={450} y={266} textAnchor="middle" fontSize={44} fontWeight={900} fontFamily="Arial Black, Arial" fill="#9a3a2a">FIRE STATION</text>
    <circle cx={450} cy={120} r={60 * glow} fill={AMBER} opacity={0.35} />
  </svg>
);

const Centennial: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a2440, #3a4a6a 60%, #1a1a20 100%)'}} />
      <div style={{position: 'absolute', left: 90, top: 520}}>
        <FireStation glow={0.9 + 0.1 * Math.sin(f / 5)} />
      </div>
      <Title top={200} size={80} color={AMBER} opacity={out(f, 4, 14)}>
        Livermore, California
      </Title>
      <Title top={330} size={130} color={GOLD} opacity={out(f, dur * 0.5, dur * 0.65)}>
        1901 থেকে
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Still: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const years = Math.round(interpolate(f, [0, dur * 0.8], [1901, 2025], clampOpts));
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 35%, rgba(255,200,97,0.25), rgba(0,0,0,0) 55%)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 300, display: 'flex', justifyContent: 'center'}}>
        <div style={{width: 6, height: 300, background: '#555'}} />
      </div>
      <div style={{position: 'absolute', left: 420, top: 290}}>
        <Bulb size={380} on={0.55 + 0.05 * Math.sin(f / 6)} />
      </div>
      <Title top={980} size={170} color={AMBER}>
        {years}
      </Title>
      <Title top={1210} size={70} opacity={out(f, dur * 0.6, dur * 0.8)}>
        আজও জ্বলছে
      </Title>
    </AbsoluteFill>
  );
};

const Could: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 120, top: 380, width: 380, textAlign: 'center'}}>
        <Bulb size={360} on={1} />
        <div style={{fontSize: 56, fontWeight: 800, color: GREEN}}>বানানো যেত</div>
      </div>
      <div style={{position: 'absolute', right: 120, top: 380, width: 380, textAlign: 'center', opacity: out(f, dur * 0.4, dur * 0.55)}}>
        <Bulb size={360} on={0} broken />
        <div style={{fontSize: 56, fontWeight: 800, color: RED}}>বানানো হলো</div>
      </div>
    </AbsoluteFill>
  );
};

const Obsolete: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.12)" />
      <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: 100, fontWeight: 900, color: '#fff', opacity: out(f, 4, 14)}}>
        PLANNED
        <br />
        OBSOLESCENCE
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', gap: 60, opacity: out(f, dur * 0.4, dur * 0.55)}}>
        {['💡', '📱', '🖨️'].map((e, i) => (
          <div key={i} style={{fontSize: 150, position: 'relative'}}>
            {e}
            <div style={{position: 'absolute', right: -20, bottom: -10, fontSize: 70}}>⏳</div>
          </div>
        ))}
      </div>
      <Title top={1100} size={60} color={RED} opacity={out(f, dur * 0.6, dur * 0.8)}>
        ইচ্ছা করে তাড়াতাড়ি নষ্ট
      </Title>
    </AbsoluteFill>
  );
};

const Buy: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const rows = [
    {k: 'দাম', a: '৳১০০', b: '৳১৮০'},
    {k: 'চলবে', a: '৬ মাস', b: '৩ বছর'},
    {k: 'মাসে খরচ', a: '৳১৭', b: '৳৫'},
  ];
  return (
    <AbsoluteFill>
      <Plain glow="rgba(95,208,138,0.12)" />
      <div style={{position: 'absolute', left: 80, right: 80, top: 300, display: 'flex', justifyContent: 'space-around'}}>
        <Bulb size={240} on={0.5} />
        <Bulb size={240} on={1} />
      </div>
      {rows.map((r, i) => {
        const o = out(f, dur * (0.15 + i * 0.22), dur * (0.25 + i * 0.22));
        return (
          <div key={i} style={{position: 'absolute', left: 80, right: 80, top: 640 + i * 140, display: 'flex', alignItems: 'center', fontSize: 60, fontWeight: 800, opacity: o}}>
            <div style={{width: 300, color: '#bbb'}}>{r.k}</div>
            <div style={{flex: 1, textAlign: 'center', color: i === 2 ? RED : FG}}>{r.a}</div>
            <div style={{flex: 1, textAlign: 'center', color: i === 2 ? GREEN : FG}}>{r.b}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Sell: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const back = spring({frame: f - dur * 0.4, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(255,200,97,0.14)" />
      <Place x={300} y={1560}>
        <Person height={800} {...LOOKS[0]} mouth="smile" />
      </Place>
      <Place x={interpolate(back, [0, 1], [1200, 780])} y={1560}>
        <Person height={780} {...LOOKS[2]} mouth="smile" />
      </Place>
      <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', opacity: back}}>
        <Bubble size={64} color={GOLD}>
          "আবার এলাম, মানের জন্য!"
        </Bubble>
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(255,200,97,0.14)" />
      <div style={{position: 'absolute', left: 430, top: 820, opacity: 0.6}}>
        <Bulb size={360} on={0.7} />
      </div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  fine: Fine,
  written: Written,
  geneva: GenevaScene,
  meeting: Meeting,
  names: Names,
  phoebus: Phoebus,
  problem: Problem,
  hours: Hours,
  nobuy: NoBuy,
  rule: Rule,
  lab: Lab,
  burn: Burn,
  penalty: Penalty,
  think: Think,
  engineers: Engineers,
  break: Break,
  buyagain: BuyAgain,
  centennial: Centennial,
  still: Still,
  could: Could,
  obsolete: Obsolete,
  buy: Buy,
  sell: Sell,
  cta: Cta,
};

export const BulbScene: React.FC<{seg: BSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};

export {inOut, Stamp};
