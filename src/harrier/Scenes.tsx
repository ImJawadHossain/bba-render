import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Cam, LOOKS, Person, PersonProps, Place, Vignette} from '../art';
import {Bubble} from '../milgram/art';
import {Bill} from '../mcdonalds/art';
import {BG, Can, FG, FollowButton, GOLD, GREEN, Office, PEPSI, Plain, PriceTag, RED, Title, clampOpts, inOut, out} from '../biz/art';

export {BG, FG};
export type HSegment = {id: string; text: string; visual: string};
type SP = {dur: number; id: string};
type Look = Omit<PersonProps, 'height'>;

export const PBLUE = '#1f4fb5';

export const LEONARD: Look = {hairStyle: 'curly', hair: '#3a2a1e', skin: '#efc6a6', top: '#2b5fd9', bottom: '#2a2c30'};
const TEEN: Look = {hairStyle: 'short', hair: '#6b4a2a', skin: '#efc6a6', top: '#e0243c', bottom: '#2a2c30'};
const JUDGE: Look = {hairStyle: 'bob', hair: '#3a2a1e', skin: '#ecc19e', top: '#15151b', bottom: '#15151b', labCoat: true, glasses: true};
const EXEC: Look = {hairStyle: 'short', hair: '#9a9590', skin: '#e2b391', top: '#22262e', bottom: '#1a1c22', tie: PBLUE};

// ---------- উপাদান ----------

export const Jet: React.FC<{width?: number; color?: string}> = ({width = 700, color = '#5a6470'}) => (
  <svg viewBox="0 0 700 300" width={width} height={(width * 300) / 700} style={{overflow: 'visible'}}>
    <path d="M40 150 L520 130 C600 128 660 140 690 152 C660 164 600 172 520 170 L40 160Z" fill={color} />
    <path d="M520 132 C560 120 600 125 620 140 L560 146Z" fill="#9ec4e0" />
    <path d="M260 150 L420 150 L300 40 L240 40Z" fill={color} />
    <path d="M260 152 L420 152 L300 262 L240 262Z" fill="#4a525c" />
    <path d="M60 150 L130 150 L80 80 L50 80Z" fill={color} />
    <path d="M40 150 L10 140 L10 168 L40 160Z" fill="#3a4048" />
    <rect x={330} y={160} width={70} height={30} rx={8} fill="#3a4048" />
    <rect x={460} y={160} width={50} height={26} rx={8} fill="#3a4048" />
  </svg>
);

const TV: React.FC<{width?: number; children?: React.ReactNode}> = ({width = 860, children}) => (
  <div style={{position: 'relative', width, height: width * 0.72, background: '#2a2622', borderRadius: 40, padding: width * 0.05, boxShadow: '0 40px 90px rgba(0,0,0,0.6)'}}>
    <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden', background: '#5a9ad8'}}>{children}</div>
  </div>
);

const Shirt: React.FC<{size?: number}> = ({size = 220}) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <path d="M30 10 L42 6 Q50 14 58 6 L70 10 L94 28 L82 44 L72 36 L72 94 L28 94 L28 36 L18 44 L6 28Z" fill="#f2efe9" />
    <circle cx={50} cy={50} r={14} fill={PBLUE} />
    <path d="M36 50 A14 14 0 0 1 64 50" fill={RED} />
  </svg>
);

const Jacket: React.FC<{size?: number}> = ({size = 220}) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <path d="M30 10 L42 6 L50 30 L58 6 L70 10 L94 28 L88 94 L56 94 L50 34 L44 94 L12 94 L6 28Z" fill="#3a2618" />
    <path d="M42 6 L50 30 L58 6" fill="none" stroke="#1a1008" strokeWidth={4} />
  </svg>
);

const Calculator: React.FC<{size?: number; text?: string}> = ({size = 360, text = '0'}) => (
  <div style={{width: size, height: size * 1.4, background: '#2a2d33', borderRadius: 30, padding: size * 0.08, boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}}>
    <div style={{height: size * 0.3, background: '#bfd8b0', borderRadius: 12, fontFamily: '"Courier New", monospace', fontSize: size * 0.13, fontWeight: 900, color: '#1a2a14', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 16px'}}>{text}</div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 18}}>
      {Array.from({length: 16}, (_, i) => (
        <div key={i} style={{height: size * 0.17, borderRadius: 10, background: i % 4 === 3 ? '#e3bf7a' : '#4a4e56'}} />
      ))}
    </div>
  </div>
);

const Check: React.FC<{width?: number; sign?: number}> = ({width = 860, sign = 1}) => (
  <div style={{width, padding: '36px 44px', background: '#e8f0e4', color: '#1a2a14', fontFamily: 'Georgia, serif', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', borderLeft: '16px solid #8ab07a'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 34}}>
      <span>PAY TO: PEPSICO</span>
      <span>1996</span>
    </div>
    <div style={{marginTop: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <span style={{fontSize: 34}}>Seven hundred thousand…</span>
      <span style={{fontFamily: 'Arial Black, Arial', fontSize: 64, padding: '6px 20px', border: '4px solid #1a2a14'}}>$700,008</span>
    </div>
    <svg width={300} height={70} viewBox="0 0 200 60" style={{marginTop: 20, marginLeft: 'auto', display: 'block'}}>
      <path d="M5 40 C30 5 40 55 65 30 S100 10 120 40 S170 20 195 30" stroke="#1d3f8f" strokeWidth={4} fill="none" strokeDasharray={300} strokeDashoffset={300 * (1 - sign)} />
    </svg>
  </div>
);

const Gavel: React.FC<{size?: number; hit?: number}> = ({size = 300, hit = 0}) => (
  <svg viewBox="0 0 200 200" width={size} height={size} style={{overflow: 'visible'}}>
    <g transform={`rotate(${-40 + 40 * hit} 160 160)`}>
      <rect x={30} y={60} width={110} height={50} rx={10} fill="#6a4026" />
      <rect x={80} y={100} width={14} height={90} fill="#8a5a36" />
    </g>
    <rect x={20} y={180} width={160} height={20} rx={6} fill="#4a2e1c" />
  </svg>
);

const Courthouse: React.FC<{width?: number}> = ({width = 860}) => (
  <svg viewBox="0 0 860 560" width={width} height={(width * 560) / 860}>
    <path d="M430 0 L860 150 L0 150Z" fill="#c9c2b4" />
    <rect x={40} y={150} width={780} height={40} fill="#b8b0a0" />
    {Array.from({length: 8}, (_, i) => <rect key={i} x={80 + i * 96} y={200} width={50} height={300} fill="#d8d0c0" />)}
    <rect x={0} y={500} width={860} height={60} fill="#a8a090" />
  </svg>
);

const NameCard: React.FC<{name: string; sub: string; o: number; top?: number}> = ({name, sub, o, top = 1180}) => (
  <div style={{position: 'absolute', left: 90, top, padding: '16px 30px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${PBLUE}`, opacity: o}}>
    <div style={{fontSize: 56, fontWeight: 800}}>{name}</div>
    <div style={{fontSize: 34, color: GOLD}}>{sub}</div>
  </div>
);

const Sky: React.FC = () => <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a6aa8 0%, #8ab8e0 60%, #5a8a4a 61%, #3a6030 100%)'}} />;

// ---------- দৃশ্য ----------

const Ad: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const fly = inOut(f, 0, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(31,79,181,0.18)" />
      <div style={{position: 'absolute', left: 110, top: 380}}>
        <TV>
          <Sky />
          <div style={{position: 'absolute', left: interpolate(fly, [0, 1], [-500, 120]), top: 120 + Math.sin(f / 8) * 10}}>
            <Jet width={520} />
          </div>
          <div style={{position: 'absolute', right: 30, top: 30}}>
            <Can {...PEPSI} size={150} />
          </div>
        </TV>
      </div>
      <Title top={1100} size={90} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.6)}>
        যুদ্ধবিমান অফার!
      </Title>
    </AbsoluteFill>
  );
};

const Claim: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(95,208,138,0.14)" />
      <Place x={420} y={1580}>
        <Person height={940} {...LEONARD} mouth="smile" armR={70} holding={<Bill size={150} />} />
      </Place>
      <div style={{position: 'absolute', left: 620, top: 600, opacity: out(f, dur * 0.3, dur * 0.45)}}>
        <Jet width={420} />
      </div>
      <NameCard name="২১ বছরের ছাত্র" sub="John Leonard" o={out(f, 4, 14)} top={260} />
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Points: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [dur * 0.3, dur * 0.9], [0, 9999], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(31,79,181,0.18)" />
      <Title top={140} size={130} color={GOLD} opacity={out(f, 0, 10)}>
        1996
      </Title>
      <div style={{position: 'absolute', left: 380, top: 380}}>
        <Can {...PEPSI} size={460} />
      </div>
      <Title top={920} size={70} color="#9ec4ff" opacity={out(f, dur * 0.25, dur * 0.4)}>
        PEPSI STUFF
      </Title>
      <Title top={1040} size={120} opacity={out(f, dur * 0.3, dur * 0.45)}>
        +{n.toLocaleString('en-US')} pts
      </Title>
    </AbsoluteFill>
  );
};

const Catalog: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const items = [
    {el: <Shirt size={260} />, pts: '75 pts'},
    {el: <Jacket size={260} />, pts: '1,450 pts'},
  ];
  return (
    <AbsoluteFill>
      <Plain />
      {items.map((it, i) => {
        const p = spring({frame: f - i * dur * 0.45, fps: 30, config: {damping: 12}});
        return (
          <div key={i} style={{position: 'absolute', left: 120 + i * 440, top: 420, width: 400, textAlign: 'center', transform: `scale(${p})`}}>
            {it.el}
            <div style={{marginTop: 20, fontSize: 64, fontWeight: 900, color: GOLD, fontFamily: 'Arial Black, Arial'}}>{it.pts}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const JetScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const land = inOut(f, 0, dur * 0.7);
  return (
    <AbsoluteFill>
      <Sky />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1150, height: 770, background: '#4a7a3a'}} />
      <svg width={1080} height={400} viewBox="0 0 1080 400" style={{position: 'absolute', top: 800}}>
        <rect x={60} y={120} width={360} height={230} fill="#b8705a" />
        <path d="M40 120 L240 30 L440 120Z" fill="#7a3a2a" />
        {[0, 1, 2].map((i) => <rect key={i} x={100 + i * 110} y={170} width={70} height={60} fill="#e8f0f8" />)}
        <text x={240} y={320} textAnchor="middle" fontSize={34} fontWeight={900} fill="#fff" fontFamily="Arial">SCHOOL</text>
      </svg>
      <div style={{position: 'absolute', left: interpolate(land, [0, 1], [500, 360]), top: interpolate(land, [0, 1], [150, 820])}}>
        <Jet width={640} />
        <Place x={540} y={170}>
          <Person height={120} {...TEEN} />
        </Place>
      </div>
      {land > 0.9 ? <AbsoluteFill style={{background: 'radial-gradient(ellipse 500px 120px at 680px 1150px, rgba(255,255,255,0.4), rgba(0,0,0,0) 70%)'}} /> : null}
      <Vignette strength={0.4} />
    </AbsoluteFill>
  );
};

const Seven: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 3, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(31,79,181,0.18)" />
      <div style={{position: 'absolute', left: 110, top: 380}}>
        <TV>
          <Sky />
          <div style={{position: 'absolute', left: 140, top: 60}}>
            <Jet width={480} />
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', transform: `scale(${pop})`}}>
            <span style={{fontFamily: 'Arial Black, Arial', fontSize: 64, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '10px 26px'}}>HARRIER FIGHTER · 7,000,000 PTS</span>
          </div>
        </TV>
      </div>
      <Title top={1100} size={100} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.6)}>
        সত্তর লাখ পয়েন্ট
      </Title>
    </AbsoluteFill>
  );
};

const Calc: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const laughers = out(f, 0, dur * 0.3);
  return (
    <AbsoluteFill>
      <Plain />
      {[0, 1, 2].map((i) => (
        <Place key={i} x={140 + i * 140} y={1560}>
          <div style={{opacity: laughers}}>
            <Person height={520} {...LOOKS[i + 3]} mouth="open" />
          </div>
        </Place>
      ))}
      <Title top={360} size={100} opacity={laughers * (1 - out(f, dur * 0.4, dur * 0.5))}>
        😂😂😂
      </Title>
      <Place x={760} y={1580}>
        <Person height={860} {...LEONARD} brow="worried" armR={60} />
      </Place>
      <div style={{position: 'absolute', left: 560, top: 300, opacity: out(f, dur * 0.4, dur * 0.55), transform: 'rotate(6deg)'}}>
        <Calculator size={300} text="7000000" />
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Bottles: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [0, dur * 0.85], [4, 120], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(31,79,181,0.14)" />
      <div style={{position: 'absolute', top: 240, left: 40, right: 40, display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center'}}>
        {Array.from({length: 120}, (_, i) => (
          <div key={i} style={{opacity: i < n ? 1 : 0}}>
            <Can {...PEPSI} size={90} />
          </div>
        ))}
      </div>
      <Title top={1240} size={90} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.6)}>
        ≈ ১ কোটি বোতল
      </Title>
    </AbsoluteFill>
  );
};

const Fine: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const z = inOut(f, dur * 0.15, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 140, top: 260, width: 800, padding: 40, background: '#f6f2e8', color: '#1a1814', fontFamily: 'Georgia, serif', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', transform: `scale(${1 + z * 0.15})`, transformOrigin: '50% 90%'}}>
        <div style={{fontSize: 54, fontWeight: 900, textAlign: 'center', color: PBLUE}}>PEPSI STUFF · RULES</div>
        {Array.from({length: 9}, (_, i) => (
          <div key={i} style={{height: 12, background: '#bdb4a0', margin: '20px 0', width: `${60 + ((i * 37) % 40)}%`}} />
        ))}
        <div style={{fontSize: 22 + z * 18, background: `rgba(246,192,38,${z * 0.7})`, padding: '6px 10px', fontWeight: 700}}>* Points may be purchased for 10¢ each.</div>
      </div>
      <div style={{position: 'absolute', left: 620, top: 1060 + 0, fontSize: 200, opacity: out(f, dur * 0.2, dur * 0.4), transform: 'rotate(-20deg)'}}>🔍</div>
    </AbsoluteFill>
  );
};

const Cents: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.35, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(246,192,38,0.14)" />
      <Title top={300} size={90} opacity={out(f, 2, 12)}>
        ১ পয়েন্ট =
      </Title>
      <div style={{position: 'absolute', top: 480, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${pop})`}}>
        <PriceTag text="10¢" color={GOLD} />
      </div>
    </AbsoluteFill>
  );
};

const Price: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.3, fps: 30, config: {damping: 11}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(95,208,138,0.16)" />
      <div style={{position: 'absolute', left: 200, top: 300}}>
        <Jet width={700} />
      </div>
      <div style={{position: 'absolute', top: 760, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: pop}}>
        <PriceTag text="$700K" size={0.6 + 0.4 * pop} color={GREEN} />
      </div>
    </AbsoluteFill>
  );
};

const Real: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const show = out(f, dur * 0.45, dur * 0.65);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.14)" />
      <div style={{position: 'absolute', left: 200, top: 300}}>
        <Jet width={700} color="#4a5460" />
      </div>
      <div style={{position: 'absolute', left: 120, top: 760, fontFamily: 'Arial Black, Arial', fontSize: 90, color: '#888', textDecoration: show > 0.5 ? 'line-through' : 'none'}}>$700K</div>
      <div style={{position: 'absolute', top: 900, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: show, transform: `scale(${0.7 + 0.3 * show})`}}>
        <PriceTag text="$33M" color={RED} />
      </div>
    </AbsoluteFill>
  );
};

const Investors: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      <Place x={220} y={1580}>
        <Person height={780} {...LEONARD} armR={50} mouth="open" />
      </Place>
      {[0, 1, 2].map((i) => (
        <Place key={i} x={520 + i * 190} y={1580}>
          <Person height={720} {...LOOKS[i + 5]} tie="#22262e" mouth="smile" />
        </Place>
      ))}
      {Array.from({length: 8}, (_, i) => {
        const t = ((f + i * 7) % 50) / 50;
        return <Bill key={i} size={120} style={{position: 'absolute', left: interpolate(t, [0, 1], [700, 280]) + (i % 3) * 20, top: 760 - Math.sin(t * Math.PI) * 150, opacity: f > dur * 0.2 ? Math.sin(t * Math.PI) : 0}} />;
      })}
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const CheckScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(95,208,138,0.14)" />
      <div style={{position: 'absolute', left: 110, top: 380, transform: 'rotate(-3deg)'}}>
        <Check sign={inOut(f, dur * 0.2, dur * 0.7)} />
      </div>
      <div style={{position: 'absolute', left: 140, top: 900, display: 'flex', gap: 10, opacity: out(f, dur * 0.5, dur * 0.65)}}>
        {Array.from({length: 15}, (_, i) => (
          <div key={i} style={{width: 44, height: 60, background: PBLUE, borderRadius: 6, border: '3px solid #fff', transform: `rotate(${(i % 3) * 6 - 6}deg)`}} />
        ))}
      </div>
      <Title top={1010} size={56} color="#9ec4ff" opacity={out(f, dur * 0.5, dur * 0.65)}>
        + ১৫টা আসল পয়েন্ট
      </Title>
    </AbsoluteFill>
  );
};

const Send: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const fly = inOut(f, dur * 0.4, dur * 0.95);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: interpolate(fly, [0, 1], [240, 1200]), top: 420 - fly * 200, transform: `rotate(${fly * 20}deg)`}}>
        <div style={{width: 600, padding: 40, background: '#f2ecdc', color: '#1a1814', fontFamily: 'Georgia, serif', fontSize: 52, boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}}>
          Dear Pepsi,
          <div style={{marginTop: 20, fontWeight: 900}}>Please send my Harrier jet.</div>
          <div style={{marginTop: 20, textAlign: 'right'}}>— John</div>
        </div>
      </div>
      <Title top={1100} size={80} color={GOLD} opacity={out(f, 2, 12) * (1 - fly)}>
        "আমার জেটটা পাঠিয়ে দিন"
      </Title>
    </AbsoluteFill>
  );
};

const Returned: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const back = inOut(f, 0, dur * 0.4);
  return (
    <AbsoluteFill>
      <Office />
      <Place x={780} y={1580}>
        <Person height={860} {...EXEC} mouth="smile" />
      </Place>
      <div style={{position: 'absolute', left: interpolate(back, [0, 1], [500, 40]), top: 320, transform: 'scale(0.6) rotate(-8deg)', transformOrigin: '0 0'}}>
        <Check />
      </div>
      <div style={{position: 'absolute', left: 380, top: 640, opacity: out(f, dur * 0.4, dur * 0.55)}}>
        <Bubble size={68} tail="right">
          "ওটা তো মজা ছিল!"
        </Bubble>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Court: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a3a5a 0%, #8a9ab0 70%, #4a4a50 100%)'}} />
      <div style={{position: 'absolute', left: 110, top: 360}}>
        <Courthouse />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{position: 'absolute', left: 80 + i * 240, top: 1000, width: 200, padding: 14, background: '#f2efe9', color: '#111', fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 900, transform: `rotate(${(i % 2 ? 4 : -4)}deg) translateY(${(1 - out(f, dur * (0.2 + i * 0.1), dur * (0.3 + i * 0.1))) * 300}px)`, opacity: out(f, dur * (0.2 + i * 0.1), dur * (0.3 + i * 0.1))}}>
          PEPSI JET CASE
          <div style={{height: 8, background: '#bbb', marginTop: 10}} />
          <div style={{height: 8, background: '#bbb', marginTop: 8, width: '70%'}} />
        </div>
      ))}
      <Title top={180} size={90} opacity={out(f, 2, 12)}>
        ৩ বছর মামলা
      </Title>
    </AbsoluteFill>
  );
};

const Judge: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a2618, #1a1008)'}} />
      <Place x={540} y={1300}>
        <Person height={760} {...JUDGE} />
      </Place>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1040, height: 400, background: 'linear-gradient(180deg, #6a4026, #3a2414)'}} />
      <div style={{position: 'absolute', left: 60, right: 60, top: 220, opacity: out(f, dur * 0.15, dur * 0.3)}}>
        <Bubble size={52} tail="down">
          "কোনো সুস্থ মানুষ ভাববে না যে সত্যিই যুদ্ধবিমান দেওয়া হচ্ছে।"
        </Bubble>
      </div>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Lost: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const hit = f < dur * 0.3 ? f / (dur * 0.3) : 1;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a2618, #1a1008)'}} />
      <div style={{position: 'absolute', left: 390, top: 360}}>
        <Gavel size={320} hit={hit} />
      </div>
      <Place x={540} y={1600}>
        <Person height={720} {...LEONARD} brow="worried" mouth="tense" />
      </Place>
      <Title top={180} size={110} color={RED} opacity={out(f, dur * 0.3, dur * 0.45)}>
        হেরে গেলেন
      </Title>
      <Vignette strength={0.65} />
    </AbsoluteFill>
  );
};

const Changed: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const swap = out(f, dur * 0.3, dur * 0.45);
  const kid = out(f, dur * 0.65, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(31,79,181,0.18)" />
      <div style={{position: 'absolute', left: 110, top: 380}}>
        <TV>
          <Sky />
          <div style={{position: 'absolute', left: 140, top: 50}}>
            <Jet width={480} />
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 80, textAlign: 'center'}}>
            <span style={{fontFamily: 'Arial Black, Arial', fontSize: 64, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '10px 26px'}}>{swap > 0.5 ? '700,000,000 PTS' : '7,000,000 PTS'}</span>
          </div>
          <div style={{position: 'absolute', right: 40, bottom: 20, fontSize: 40, color: '#fff', fontStyle: 'italic', opacity: kid}}>just kidding</div>
        </TV>
      </div>
      <Title top={1100} size={80} color={GOLD} opacity={swap}>
        ৭০ কোটি পয়েন্ট
      </Title>
    </AbsoluteFill>
  );
};

const Moral: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.12)" />
      <Title top={340} size={120} opacity={out(f, 2, 12)}>
        😂
      </Title>
      <Title top={520} size={70} opacity={out(f, 2, 12)}>
        একটা মজার লাইন
      </Title>
      <div style={{position: 'absolute', left: 380, top: 720, opacity: out(f, dur * 0.4, dur * 0.55)}}>
        <Gavel size={300} hit={1} />
      </div>
      <Title top={1080} size={70} color={RED} opacity={out(f, dur * 0.5, dur * 0.65)}>
        = বছরের পর বছর আদালত
      </Title>
    </AbsoluteFill>
  );
};

const OfferYou: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(246,192,38,0.12)" />
      <Place x={540} y={1580}>
        <Person height={860} {...LOOKS[0]} brow="worried" />
      </Place>
      <div style={{position: 'absolute', left: 60, right: 60, top: 260, opacity: out(f, dur * 0.2, dur * 0.35)}}>
        <Bubble size={58} color={GOLD}>
          "কেউ অক্ষরে অক্ষরে ধরলে আমি কি দিতে পারব?"
        </Bubble>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Read: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const z = inOut(f, dur * 0.2, dur * 0.7);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 140, top: 300, width: 800, padding: 40, background: '#f6f2e8', color: '#1a1814', fontFamily: 'Georgia, serif'}}>
        {Array.from({length: 6}, (_, i) => (
          <div key={i} style={{height: 12, background: '#bdb4a0', margin: '20px 0', width: `${60 + ((i * 37) % 40)}%`}} />
        ))}
        <div style={{fontSize: 24 + z * 30, fontWeight: 800, color: z > 0.5 ? '#a01a2a' : '#555'}}>* terms & conditions</div>
      </div>
      <div style={{position: 'absolute', left: 560 - z * 200, top: 640, fontSize: 220, transform: 'rotate(-20deg)'}}>🔍</div>
      <Title top={1150} size={70} color={GOLD} opacity={out(f, dur * 0.5, dur * 0.7)}>
        সুযোগ আর ফাঁদ এখানেই
      </Title>
    </AbsoluteFill>
  );
};

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(31,79,181,0.14)" />
      <div style={{position: 'absolute', left: 240, top: 820, opacity: 0.4}}>
        <Jet width={600} />
      </div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  ad: Ad,
  claim: Claim,
  points: Points,
  catalog: Catalog,
  jet: JetScene,
  seven: Seven,
  calc: Calc,
  bottles: Bottles,
  fine: Fine,
  cents: Cents,
  price: Price,
  real: Real,
  investors: Investors,
  check: CheckScene,
  send: Send,
  returned: Returned,
  court: Court,
  judge: Judge,
  lost: Lost,
  changed: Changed,
  moral: Moral,
  offeryou: OfferYou,
  read: Read,
  cta: Cta,
};

export const HarrierScene: React.FC<{seg: HSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};

export {Cam, Calculator};
