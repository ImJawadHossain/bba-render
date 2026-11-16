import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame} from 'remotion';
import {Cam, LOOKS, Person, Place, Vignette} from '../art';
import {Bubble, PersonIcon} from '../milgram/art';
import {
  BG,
  Bar,
  CLASSIC,
  Can,
  FG,
  FollowButton,
  GOIZUETA,
  GOLD,
  GREEN,
  KEOUGH,
  Letter,
  NEW_COKE,
  OLD_COKE,
  Office,
  PEPSI,
  Phone,
  Plain,
  RED,
  Title,
  clampOpts,
  inOut,
  out,
} from '../biz/art';

export {BG, FG};
export type CokeSegment = {id: string; text: string; visual: string};
type SP = {dur: number; id: string};

const Label: React.FC<{name: string; role: string; color?: string; o: number}> = ({name, role, color = RED, o}) => (
  <div style={{position: 'absolute', left: 90, top: 1180, padding: '18px 34px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${color}`, opacity: o}}>
    <div style={{fontSize: 58, fontWeight: 800}}>{name}</div>
    <div style={{fontSize: 36, color: GOLD}}>{role}</div>
  </div>
);

const Shelf: React.FC<{top: number}> = ({top}) => <div style={{position: 'absolute', left: 60, right: 60, top, height: 26, background: '#6b4a2c', boxShadow: '0 12px 20px rgba(0,0,0,0.5)'}} />;

// ---------- দৃশ্য ----------

const Taste: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [0, dur * 0.5], [0, 200000], clampOpts));
  const vote = out(f, dur * 0.5, dur * 0.7);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,16,46,0.14)" />
      <Title top={180} size={150} color={GOLD}>
        {n.toLocaleString('en-IN')}
      </Title>
      <Title top={360} size={54} opacity={out(f, 4, 14)}>
        জন চেখে দেখল
      </Title>
      <div style={{position: 'absolute', top: 520, left: 70, right: 70, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center'}}>
        {Array.from({length: 40}, (_, i) => (
          <div key={i} style={{opacity: out(f, i * 0.4, i * 0.4 + 6)}}>
            <PersonIcon color={vote > 0 && random(`v${i}`) < 0.6 * vote ? GREEN : '#c9c2b4'} size={110} />
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', top: 1110, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: vote}}>
        <Bubble size={64} text="#1f8a4a">
          "নতুনটাই ভালো!"
        </Bubble>
      </div>
    </AbsoluteFill>
  );
};

const Days: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const d = Math.round(interpolate(f, [0, dur * 0.75], [1, 79], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.15)" />
      <div style={{position: 'absolute', left: 290, top: 380, width: 500, height: 560, background: '#f2ecdc', borderRadius: 20, overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,0.6)'}}>
        <div style={{height: 130, background: RED, color: '#fff', fontSize: 64, fontWeight: 800, textAlign: 'center', lineHeight: '130px'}}>দিন</div>
        <div style={{fontSize: 300, fontWeight: 900, color: '#1a1814', textAlign: 'center', lineHeight: '420px'}}>{d}</div>
      </div>
      <Title top={1050} size={90} color={RED} opacity={out(f, dur * 0.7, dur * 0.85)}>
        হার মানল
      </Title>
    </AbsoluteFill>
  );
};

const Scared: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const shake = Math.sin(f * 1.8) * 6;
  return (
    <AbsoluteFill>
      <Office tint="rgba(200,80,80,0.5)" />
      <Title top={180} size={160} color={GOLD} opacity={out(f, 0, 10)}>
        1985
      </Title>
      <div style={{position: 'absolute', left: 400, top: 560, transform: `translateX(${shake}px)`}}>
        <Can {...OLD_COKE} size={520} />
      </div>
      <div style={{position: 'absolute', left: 700, top: 560, fontSize: 90, opacity: out(f, dur * 0.4, dur * 0.55)}}>💧</div>
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const Share: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const v = id === 'share' ? out(f, 0, dur * 0.6, 0, 60) : interpolate(out(f, 0, dur * 0.7), [0, 1], [60, 24]);
  return (
    <AbsoluteFill>
      <Plain />
      <Title top={200} size={60} opacity={out(f, 0, 10)}>
        আমেরিকার কোলা বাজারে Coke
      </Title>
      <svg width={700} height={700} viewBox="-350 -350 700 700" style={{position: 'absolute', left: 190, top: 380}}>
        <circle r={300} fill="#2a2e38" />
        <circle r={150} fill="none" stroke="#c8102e" strokeWidth={300} strokeDasharray={`${(v / 100) * 2 * Math.PI * 150} ${2 * Math.PI * 150}`} transform="rotate(-90)" />
        <circle r={150} fill="#0b0d12" />
        <text y={30} textAnchor="middle" fontSize={110} fontWeight={900} fill="#fff">
          {Math.round(v)}%
        </text>
      </svg>
      <Title top={1130} size={80} color={id === 'drop' ? RED : GOLD} opacity={out(f, dur * 0.3, dur * 0.5)}>
        {id === 'drop' ? '১৯৮৩ ↓' : 'একসময়'}
      </Title>
    </AbsoluteFill>
  );
};

const Blind: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pick = out(f, dur * 0.45, dur * 0.6);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(31,79,181,0.15)" />
      <Cam zoom={1.4} x={540} y={900}>
        <Place x={540} y={1560}>
          <Person height={1000} {...LOOKS[4]} armL={40} armR={40} />
        </Place>
        <div style={{position: 'absolute', left: 465, top: 670, width: 150, height: 28, background: '#111', borderRadius: 8}} />
      </Cam>
      <div style={{position: 'absolute', left: 100, top: 1000, opacity: 1 - pick * 0.5}}>
        <Can {...OLD_COKE} size={300} />
      </div>
      <div style={{position: 'absolute', left: 800, top: 1000, transform: `scale(${1 + pick * 0.2})`, filter: pick > 0.5 ? 'drop-shadow(0 0 30px #4a7cff)' : undefined}}>
        <Can {...PEPSI} size={300} />
      </div>
      <Title top={220} size={80} color="#4a7cff" opacity={pick}>
        মিষ্টিটাই জিতল
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Ceo: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      <Cam zoom={interpolate(f, [0, dur], [1.25, 1.35])} x={540} y={820}>
        <Place x={540} y={1480}>
          <Person height={1150} {...GOIZUETA} />
        </Place>
      </Cam>
      <Label name="Roberto Goizueta" role="CEO, Coca-Cola" o={out(f, 4, 14)} />
      <Title top={200} size={80} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.55)}>
        "পবিত্র বলে কিছু নেই"
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Formula: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const x = out(f, dur * 0.45, dur * 0.65);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 190, top: 380, width: 700, padding: '50px', background: '#e8dcbc', color: '#3a2a1a', fontFamily: 'Georgia, serif', transform: 'rotate(-3deg)', boxShadow: '0 40px 90px rgba(0,0,0,0.6)'}}>
        <div style={{fontSize: 52, fontWeight: 900, textAlign: 'center', letterSpacing: 4}}>SECRET FORMULA</div>
        <div style={{fontSize: 40, textAlign: 'center', marginBottom: 20}}>1886</div>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{height: 14, background: '#3a2a1a', opacity: 0.25, margin: '18px 0', width: `${70 + ((i * 13) % 30)}%`}} />
        ))}
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={220} y1={420} x2={220 + 640 * x} y2={420 + 560 * x} stroke={RED} strokeWidth={24} strokeLinecap="round" />
        <line x1={860} y1={420} x2={860 - 640 * x} y2={420 + 560 * x} stroke={RED} strokeWidth={24} strokeLinecap="round" />
      </svg>
      <Title top={1100} size={90} color={GOLD} opacity={out(f, 4, 14)}>
        ৯৯ বছর
      </Title>
    </AbsoluteFill>
  );
};

const Lab: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.35, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,16,46,0.15)" />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 120 + i * 300, top: 1000, fontSize: 150, opacity: 1 - pop * 0.6}}>
          🧪
        </div>
      ))}
      <div style={{position: 'absolute', left: 360, top: 360, transform: `scale(${pop})`, filter: 'drop-shadow(0 0 40px rgba(255,200,200,0.5))'}}>
        <Can {...NEW_COKE} size={560} />
      </div>
      <Title top={180} size={70} color={GOLD} opacity={pop}>
        আরও মিষ্টি
      </Title>
    </AbsoluteFill>
  );
};

const Wins: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const p = out(f, 4, dur * 0.6);
  const pod = (x: number, h: number, rank: string, can: React.ReactNode, o: number) => (
    <div style={{position: 'absolute', left: x, bottom: 560, width: 300, textAlign: 'center', opacity: o}}>
      {can}
      <div style={{height: h * p, background: rank === '১' ? GOLD : '#555', borderRadius: '12px 12px 0 0', fontSize: 80, fontWeight: 900, color: '#111', paddingTop: 10}}>{rank}</div>
    </div>
  );
  return (
    <AbsoluteFill>
      <Plain />
      {pod(70, 260, '২', <Can {...OLD_COKE} size={280} />, out(f, 4, 12))}
      {pod(390, 420, '১', <Can {...NEW_COKE} size={320} />, out(f, 0, 10))}
      {pod(710, 160, '৩', <Can {...PEPSI} size={280} />, out(f, 8, 16))}
      <Title top={200} size={80} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.55)}>
        টেস্টে জয়!
      </Title>
    </AbsoluteFill>
  );
};

const Launch: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const fall = inOut(f, dur * 0.55, dur * 0.85);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,16,46,0.15)" />
      <Title top={180} size={84} color={GOLD} opacity={out(f, 0, 10)}>
        ২৩ এপ্রিল, ১৯৮৫
      </Title>
      <Shelf top={1000} />
      <div style={{position: 'absolute', left: 220, top: 600, transform: `scale(${out(f, 4, 14)})`, transformOrigin: '50% 100%'}}>
        <Can {...NEW_COKE} size={400} />
      </div>
      <div style={{position: 'absolute', left: 640, top: 600 + fall * 900, transform: `rotate(${fall * 120}deg)`, opacity: 1 - fall * 0.7}}>
        <Can {...OLD_COKE} size={400} />
      </div>
      <div style={{position: 'absolute', left: 600, top: 760, padding: '6px 24px', border: `8px solid ${RED}`, color: RED, fontSize: 80, fontWeight: 900, transform: 'rotate(-12deg)', opacity: out(f, dur * 0.45, dur * 0.55)}}>বন্ধ</div>
    </AbsoluteFill>
  );
};

const Then: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const shake = Math.sin(f * 2.5) * out(f, 0, dur) * 10;
  return (
    <AbsoluteFill style={{transform: `translateX(${shake}px)`}}>
      <Plain glow="rgba(224,36,60,0.2)" />
      <div style={{position: 'absolute', left: 400, top: 560, filter: 'grayscale(0.4)'}}>
        <Can {...NEW_COKE} size={480} />
      </div>
      <Title top={220} size={140} color={RED} opacity={out(f, dur * 0.3, dur * 0.5)}>
        …
      </Title>
      <Vignette color="60,0,8" strength={0.8} />
    </AbsoluteFill>
  );
};

const Letters: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [0, dur * 0.7], [0, 40000], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.15)" />
      {Array.from({length: 26}, (_, i) => {
        const t = Math.max(0, f - i * 1.5);
        const y = Math.min(1250 - (i % 5) * 40, -200 + t * 40);
        return (
          <div key={i} style={{position: 'absolute', left: 60 + ((i * 131) % 860), top: y, transform: `rotate(${(random(`r${i}`) - 0.5) * 60}deg)`}}>
            <Letter size={170} angry />
          </div>
        );
      })}
      {[0, 1].map((i) => (
        <div key={i} style={{position: 'absolute', left: 120 + i * 640, top: 520}}>
          <Phone size={200} ring={f * 2 + i} />
        </div>
      ))}
      <Title top={180} size={130} color={RED}>
        {n.toLocaleString('en-IN')}+
      </Title>
    </AbsoluteFill>
  );
};

const Protest: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(227,191,122,0.12)" />
      {[0, 1, 2, 3, 4].map((i) => {
        const bob = Math.sin(f / 5 + i) * 10;
        return (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left: 30 + i * 205, top: 760 + bob, width: 190, padding: '14px 8px', background: '#f2ecdc', color: RED, fontSize: 30, fontWeight: 900, textAlign: 'center', fontFamily: 'Arial Black, Arial', transform: `rotate(${(i % 2 ? 4 : -4)}deg)`}}>
              {['OLD COKE!', 'BRING IT BACK', 'OLD COKE!', 'NO NEW COKE', 'BRING IT BACK'][i]}
            </div>
            <Place x={125 + i * 205} y={1560}>
              <Person height={640} {...LOOKS[i]} armR={150} mouth="open" />
            </Place>
          </React.Fragment>
        );
      })}
      <div style={{position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center', opacity: out(f, dur * 0.3, dur * 0.45)}}>
        <div style={{fontSize: 58, fontWeight: 800, fontFamily: 'Georgia, serif', fontStyle: 'italic'}}>Old Cola Drinkers of America</div>
        <div style={{fontSize: 90, fontWeight: 900, color: GOLD, marginTop: 10}}>$120,000</div>
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Hoard: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [0, dur * 0.8], [0, 10], clampOpts));
  return (
    <AbsoluteFill>
      <Plain />
      <Shelf top={760} />
      {Array.from({length: 10}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 80 + i * 92, top: 560, opacity: i < n ? 0 : 1}}>
          <Can {...OLD_COKE} size={200} />
        </div>
      ))}
      <Place x={540} y={1560}>
        <Person height={760} {...LOOKS[2]} armL={30} armR={30} />
      </Place>
      <div style={{position: 'absolute', left: 380, top: 1000, display: 'flex', flexWrap: 'wrap', width: 340, gap: 0}}>
        {Array.from({length: n}, (_, i) => (
          <Can key={i} {...OLD_COKE} size={110} />
        ))}
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Calendar: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(227,191,122,0.15)" />
      <div style={{position: 'absolute', left: 290, top: 380, width: 500, height: 560, background: '#f2ecdc', borderRadius: 20, overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', transform: `scale(${out(f, 0, 10, 0.8, 1)})`}}>
        <div style={{height: 130, background: '#1a1a1e', color: '#fff', fontSize: 64, fontWeight: 800, textAlign: 'center', lineHeight: '130px'}}>JULY 1985</div>
        <div style={{fontSize: 300, fontWeight: 900, color: '#1a1814', textAlign: 'center', lineHeight: '420px'}}>11</div>
      </div>
      <Title top={1050} size={100} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.6)}>
        মাত্র ৭৯ দিন
      </Title>
    </AbsoluteFill>
  );
};

const Classic: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const rise = spring({frame: f - 6, fps: 30, config: {damping: 14}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(255,220,160,0.25)" />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(255,240,200,0.18), rgba(0,0,0,0) 60%)', clipPath: 'polygon(40% 0, 60% 0, 80% 70%, 20% 70%)'}} />
      <div style={{position: 'absolute', left: 360, top: 360 + (1 - rise) * 500}}>
        <Can {...CLASSIC} size={600} />
      </div>
      <Title top={1100} size={76} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.6)}>
        Coca-Cola Classic
      </Title>
    </AbsoluteFill>
  );
};

const Calls: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [0, dur * 0.7], [0, 31600], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(95,208,138,0.15)" />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 90 + i * 320, top: 620}}>
          <Phone size={240} ring={f * 2 + i} />
        </div>
      ))}
      {Array.from({length: 12}, (_, i) => {
        const t = (f * 4 + i * 37) % 300;
        return (
          <div key={i} style={{position: 'absolute', left: 100 + ((i * 89) % 880), top: 900 - t, fontSize: 70, opacity: 1 - t / 300}}>
            ❤️
          </div>
        );
      })}
      <Title top={200} size={130} color={GREEN}>
        {n.toLocaleString('en-IN')}
      </Title>
      <Title top={1000} size={70} color={GREEN} opacity={out(f, dur * 0.5, dur * 0.65)}>
        খুশির ফোন
      </Title>
    </AbsoluteFill>
  );
};

const Sales: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const p = out(f, 4, dur * 0.7);
  return (
    <AbsoluteFill>
      <Plain />
      <Title top={180} size={70} opacity={out(f, 0, 10)}>
        ১৯৮৫-এর শেষে বিক্রি
      </Title>
      <Bar label="Coca-Cola Classic" value="১ম" pct={85 * p} color={GOLD} top={380} />
      <Bar label="Pepsi" value="" pct={60 * p} color="#4a7cff" top={720} />
      <Bar label="New Coke" value="" pct={20 * p} color="#888" top={1000} />
    </AbsoluteFill>
  );
};

const Keough: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      <Cam zoom={interpolate(f, [0, dur], [1.25, 1.35])} x={540} y={820}>
        <Place x={540} y={1480}>
          <Person height={1150} {...KEOUGH} mouth={id === 'plot' ? 'smile' : 'neutral'} />
        </Place>
      </Cam>
      <Label name="Donald Keough" role="President, Coca-Cola" o={out(f, 4, 14)} />
      {id === 'plot' ? (
        <div style={{position: 'absolute', top: 220, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: out(f, 2, 12)}}>
          <Bubble size={64} text={RED}>
            "সব সাজানো নাটক?"
          </Bubble>
        </div>
      ) : null}
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Measure: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const beat = 1 + 0.08 * Math.max(0, Math.sin(f / 4));
  const heart = out(f, dur * 0.45, dur * 0.6);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,16,46,0.18)" />
      <div style={{position: 'absolute', left: 100, top: 360, width: 880, height: 420, background: '#1a1d24', borderRadius: 20, padding: 30, opacity: 1 - heart * 0.5}}>
        {[0.6, 0.8, 0.4, 0.9, 0.7].map((v, i) => (
          <div key={i} style={{display: 'inline-block', width: 120, marginRight: 40, height: 340 * v * out(f, i * 3, i * 3 + 14), background: '#4a7cff', verticalAlign: 'bottom'}} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center', fontSize: 300, transform: `scale(${heart * beat})`, opacity: heart}}>❤️</div>
      <Title top={1180} size={70} color={GOLD} opacity={heart}>
        মাপা যায় না
      </Title>
    </AbsoluteFill>
  );
};

const Quote: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 2, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <Office light={0.6} />
      <Place x={540} y={1560}>
        <Person height={900} {...KEOUGH} mouth="smile" />
      </Place>
      <div style={{position: 'absolute', top: 240, left: 50, right: 50, textAlign: 'center', transform: `scale(${pop})`}}>
        <Bubble size={70}>"আমরা অত বোকাও না,<br />অত চালাকও না।"</Bubble>
      </div>
      <Title top={540} size={40} color={GOLD} opacity={out(f, 10, 20)}>
        "We're not that dumb, and we're not that smart."
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Buy: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const items = [
    ['🔁', 'অভ্যাস'],
    ['📷', 'স্মৃতি'],
    ['🙋', 'নিজের অংশ'],
  ];
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,16,46,0.15)" />
      <div style={{position: 'absolute', left: 410, top: 300}}>
        <Can {...CLASSIC} size={460} />
      </div>
      <Title top={210} size={64} opacity={out(f, 0, 10)}>
        <s style={{opacity: 0.6}}>শুধু স্বাদ</s>
      </Title>
      {items.map(([e, t], i) => (
        <div key={t} style={{position: 'absolute', top: 880, left: 60 + i * 330, width: 300, textAlign: 'center', opacity: out(f, dur * 0.3 + i * 8, dur * 0.3 + i * 8 + 8)}}>
          <div style={{fontSize: 120}}>{e}</div>
          <div style={{fontSize: 52, fontWeight: 800, color: GOLD}}>{t}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

const Ask: React.FC<SP> = ({id}) => {
  const f = useCurrentFrame();
  const second = id === 'ask2';
  const card = (text: string, top: number, good: boolean, o: number) => (
    <div style={{position: 'absolute', left: 90, right: 90, top, padding: '40px 30px', background: good ? 'rgba(95,208,138,0.15)' : 'rgba(255,255,255,0.06)', border: `5px solid ${good ? GREEN : '#555'}`, borderRadius: 28, fontSize: 64, fontWeight: 800, textAlign: 'center', opacity: o}}>
      {text}
    </div>
  );
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'relative'}}>
        {card('"কোনটা ভালো লাগে?"', 380, false, out(f, 0, 10) * (second ? 0.45 : 1))}
        {!second ? null : (
          <div style={{position: 'absolute', left: 90, right: 90, top: 470, height: 10, background: RED, transform: 'rotate(-4deg)'}} />
        )}
        {second ? card('"পুরোনোটা উঠিয়ে দিলে কেমন লাগবে?"', 720, true, out(f, 2, 12)) : null}
      </div>
    </AbsoluteFill>
  );
};

const Side: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(227,191,122,0.12)" />
      <Shelf top={900} />
      <div style={{position: 'absolute', left: 170, top: 480, opacity: out(f, 0, 10)}}>
        <Can {...CLASSIC} size={420} />
      </div>
      <div style={{position: 'absolute', left: 620, top: 480, opacity: out(f, 6, 16)}}>
        <Can {...NEW_COKE} size={420} />
      </div>
      <Place x={540} y={1600}>
        <Person height={620} facing="back" {...LOOKS[3]} armR={interpolate(f, [dur * 0.4, dur * 0.7], [8, 150], clampOpts)} />
      </Place>
      <Title top={200} size={80} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.55)}>
        বেছে নিতে দাও
      </Title>
    </AbsoluteFill>
  );
};

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,16,46,0.15)" />
      <div style={{position: 'absolute', left: 300, top: 760, display: 'flex', gap: 40, opacity: 0.6}}>
        <Can {...CLASSIC} size={300} />
        <Can {...NEW_COKE} size={300} />
      </div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  taste: Taste,
  days: Days,
  scared: Scared,
  share: Share,
  blind: Blind,
  ceo: Ceo,
  formula: Formula,
  lab: Lab,
  wins: Wins,
  launch: Launch,
  then: Then,
  letters: Letters,
  protest: Protest,
  hoard: Hoard,
  calendar: Calendar,
  classic: Classic,
  calls: Calls,
  sales: Sales,
  keough: Keough,
  measure: Measure,
  quote: Quote,
  buy: Buy,
  ask: Ask,
  side: Side,
  cta: Cta,
};

export const CokeScene: React.FC<{seg: CokeSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};
