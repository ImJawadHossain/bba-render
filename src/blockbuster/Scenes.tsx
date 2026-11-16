import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Cam, LOOKS, Person, Place, Vignette} from '../art';
import {Bubble, PersonIcon} from '../milgram/art';
import {
  ANTIOCO,
  BG,
  BLUE,
  Bar,
  DvdMailer,
  FG,
  FollowButton,
  GOLD,
  GREEN,
  HASTINGS,
  NFX,
  Office,
  Plain,
  PriceTag,
  RANDOLPH,
  RED,
  Storefront,
  Title,
  clampOpts,
  inOut,
  out,
} from '../biz/art';

export {BG};
export type BizSegment = {id: string; text: string; visual: string};
type SP = {dur: number; id: string};

const Founders: React.FC<{y?: number; h?: number; x1?: number; x2?: number; stride?: number; silhouette?: string}> = ({y = 1500, h = 820, x1 = 320, x2 = 760, stride = 0, silhouette}) => (
  <>
    <Place x={x1} y={y}>
      <Person height={h} {...HASTINGS} stride={stride} armL={8 + stride} armR={8 - stride} silhouette={silhouette} />
    </Place>
    <Place x={x2} y={y}>
      <Person height={h * 0.98} {...RANDOLPH} stride={-stride} armL={8 - stride} armR={8 + stride} silhouette={silhouette} />
    </Place>
  </>
);

// ---------- দৃশ্য ----------

const Offer: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.35, fps: 30, config: {damping: 11}});
  return (
    <AbsoluteFill>
      <Plain />
      <Title top={150} size={130} color={GOLD} opacity={out(f, 0, 10)}>
        2000
      </Title>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: pop}}>
        <PriceTag text="$50M" size={0.6 + 0.4 * pop} />
      </div>
      <Founders />
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Laugh: React.FC<SP> = ({dur, id}) => {
  const f = useCurrentFrame();
  const smirk = Math.floor(f / 7) % 3 === 0 ? 'tense' : 'smile';
  return (
    <AbsoluteFill>
      <Office />
      <Cam zoom={interpolate(f, [0, dur], [2.6, 2.9])} x={540} y={600}>
        <Place x={540} y={1500}>
          <Person height={1100} {...ANTIOCO} mouth={smirk} />
        </Place>
      </Cam>
      {id === 'laugh2' ? (
        <div style={{position: 'absolute', left: 90, top: 1180, padding: '18px 34px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${BLUE}`, opacity: out(f, 4, 14)}}>
          <div style={{fontSize: 58, fontWeight: 800}}>John Antioco</div>
          <div style={{fontSize: 36, color: GOLD}}>CEO, Blockbuster</div>
        </div>
      ) : (
        <Title top={200} size={150} opacity={out(f, 4, 12)}>
          😏
        </Title>
      )}
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const Name: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 4, fps: 30, config: {damping: 14}});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, rgba(229,9,20,${0.25 * pop}), rgba(0,0,0,0) 60%)`}} />
      <div style={{position: 'absolute', top: 720, left: 0, right: 0, textAlign: 'center', fontFamily: 'Arial Black, Arial', fontSize: 190, fontWeight: 900, color: NFX, letterSpacing: 6, transform: `scale(${0.6 + 0.4 * pop}) scaleY(1.1)`, opacity: pop, textShadow: '0 0 60px rgba(229,9,20,0.6)'}}>
        NETFLIX
      </div>
      <Title top={1000} size={56} color="#bbb" opacity={out(f, dur * 0.4, dur * 0.6)}>
        $50M
      </Title>
    </AbsoluteFill>
  );
};

const StoreScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(242,194,24,0.12)" />
      <div style={{position: 'absolute', left: 40, top: 420, transform: `scale(${interpolate(f, [0, dur], [1, 1.05])})`, transformOrigin: '50% 100%'}}>
        <Storefront width={1000} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1110, height: 300, background: 'linear-gradient(180deg, #2a2a2e, #121214)'}} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Place key={i} x={150 + i * 190} y={1520 + (i % 2) * 40}>
          <Person height={520} facing="back" {...LOOKS[i]} />
        </Place>
      ))}
      <Title top={180} size={70} color={GOLD} opacity={out(f, 6, 18)}>
        আমেরিকার সবচেয়ে বড়
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Stores: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [0, dur * 0.8], [1, 36], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(242,194,24,0.1)" />
      <div style={{position: 'absolute', top: 260, left: 60, right: 60, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center'}}>
        {Array.from({length: 36}, (_, i) => (
          <div key={i} style={{opacity: i < n ? 1 : 0, transform: `scale(${i < n ? 1 : 0.5})`}}>
            <Storefront width={150} />
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', top: 1140, left: 60, right: 60, display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', opacity: out(f, dur * 0.45, dur * 0.6)}}>
        {Array.from({length: 30}, (_, i) => (
          <PersonIcon key={i} color={i % 3 ? '#c9c2b4' : GOLD} size={60} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Mail: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const fly = inOut(f, 0, dur * 0.35);
  const loss = out(f, dur * 0.5, dur * 0.85);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(229,9,20,0.1)" />
      <div style={{position: 'absolute', left: interpolate(fly, [0, 1], [-500, 290]), top: 360, transform: `rotate(${(1 - fly) * -20}deg)`}}>
        <DvdMailer size={500} />
      </div>
      <Title top={760} size={64} opacity={out(f, dur * 0.25, dur * 0.4)}>
        ডাকে DVD
      </Title>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: loss > 0 ? 1 : 0}}>
        <line x1={160} y1={900} x2={160} y2={1300} stroke="#555" strokeWidth={4} />
        <line x1={160} y1={1300} x2={920} y2={1300} stroke="#555" strokeWidth={4} />
        <polyline points={`200,960 ${200 + 240 * loss},${960 + 120 * loss} ${200 + 480 * loss},${960 + 200 * loss} ${200 + 700 * loss},${960 + 300 * loss}`} stroke={RED} strokeWidth={10} fill="none" />
      </svg>
      <Title top={1330} size={70} color={RED} opacity={loss}>
        লোকসান ↓
      </Title>
    </AbsoluteFill>
  );
};

const Arrive: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const walk = inOut(f, 0, dur * 0.8);
  const step = Math.sin(f * 0.5) * 20 * (walk < 1 ? 1 : 0);
  return (
    <AbsoluteFill>
      <Office />
      <div style={{position: 'absolute', left: interpolate(walk, [0, 1], [-500, 0]), top: 0, width: 1080, height: 1920}}>
        <Founders stride={step} y={1520} />
      </div>
      <div style={{position: 'absolute', left: 90, top: 1180, padding: '16px 30px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${GOLD}`, opacity: out(f, 6, 16)}}>
        <div style={{fontSize: 54, fontWeight: 800}}>Dallas, Texas</div>
        <div style={{fontSize: 34, color: GOLD}}>Blockbuster HQ</div>
      </div>
      <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center', opacity: out(f, dur * 0.3, dur * 0.5)}}>
        <span style={{fontSize: 52, fontWeight: 800, color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '10px 26px', borderRadius: 12}}>Reed Hastings · Marc Randolph</span>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Pitch: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      <Place x={220} y={1520}>
        <Person height={760} {...HASTINGS} armR={50} />
      </Place>
      <Place x={440} y={1540}>
        <Person height={740} {...RANDOLPH} />
      </Place>
      <Place x={850} y={1540}>
        <Person height={820} {...ANTIOCO} />
      </Place>
      <div style={{position: 'absolute', left: 60, top: 260, opacity: out(f, 2, 10)}}>
        <Bubble size={64} tail="left">
          "Netflix কিনে নাও।"
        </Bubble>
      </div>
      <div style={{position: 'absolute', left: 60, top: 520, opacity: out(f, dur * 0.45, dur * 0.55)}}>
        <Bubble size={56} tail="left">
          "অনলাইন ব্যবসা আমরা চালাব।"
        </Bubble>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const No: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 3, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Office />
      <Place x={540} y={1560}>
        <Person height={1000} {...ANTIOCO} mouth="smile" />
      </Place>
      <div style={{position: 'absolute', top: 230, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${pop})`}}>
        <Bubble size={170} text={RED}>
          "না।"
        </Bubble>
      </div>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Twist: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(227,191,122,0.15)" />
      <Title top={620} size={190} color={GOLD} opacity={out(f, dur * 0.45, dur * 0.6)}>
        কিন্তু…
      </Title>
      <div style={{position: 'absolute', top: 360, left: 0, right: 0, textAlign: 'center', fontSize: 200, color: '#777', transform: `rotate(${f * 4}deg)`, opacity: 1 - out(f, dur * 0.4, dur * 0.55)}}>⟳</div>
    </AbsoluteFill>
  );
};

const Receipt: React.FC<{rows: number; title?: string; stamp?: number; stampText?: string}> = ({rows, title = 'BLOCKBUSTER', stamp = 0, stampText = 'LATE FEE'}) => (
  <div style={{position: 'relative', width: 560, padding: '40px 46px', background: '#f6f2e8', color: '#1a1814', fontFamily: '"Courier New", monospace', boxShadow: '0 40px 90px rgba(0,0,0,0.6)'}}>
    <div style={{fontSize: 44, fontWeight: 900, textAlign: 'center', letterSpacing: 4}}>{title}</div>
    <div style={{borderTop: '3px dashed #999', margin: '20px 0'}} />
    {Array.from({length: rows}, (_, i) => (
      <div key={i} style={{display: 'flex', justifyContent: 'space-between', fontSize: 38, margin: '8px 0', color: i % 2 ? '#1a1814' : '#a01a2a'}}>
        <span>{i % 2 ? 'RENTAL' : 'LATE FEE'}</span>
        <span>{i % 2 ? '$3.99' : '$4.99'}</span>
      </div>
    ))}
    {stamp > 0 ? (
      <div style={{position: 'absolute', left: 80, top: 160, padding: '10px 30px', border: `8px solid ${RED}`, color: RED, fontSize: 70, fontWeight: 900, transform: `rotate(-14deg) scale(${2 - stamp})`, opacity: stamp, fontFamily: 'Arial Black, Arial'}}>{stampText}</div>
    ) : null}
  </div>
);

const LateFee: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const rows = Math.floor(interpolate(f, [0, dur * 0.7], [1, 8], clampOpts));
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 260, top: 300}}>
        <Receipt rows={rows} stamp={out(f, dur * 0.6, dur * 0.75)} />
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Hate: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const nfx = out(f, dur * 0.5, dur * 0.65);
  return (
    <AbsoluteFill>
      <Plain />
      <Place x={300} y={1500}>
        <Person height={900} {...LOOKS[1]} brow="worried" mouth="tense" />
      </Place>
      <Title top={240} size={150} color={RED} opacity={out(f, 2, 10)}>
        😠
      </Title>
      <div style={{position: 'absolute', left: 560, top: 620, opacity: nfx, transform: `translateY(${(1 - nfx) * 60}px)`}}>
        <DvdMailer size={440} />
        <div style={{marginTop: 30, textAlign: 'center', fontSize: 60, fontWeight: 900, color: GREEN, border: `6px solid ${GREEN}`, padding: '8px 10px', transform: 'rotate(-5deg)'}}>NO LATE FEES</div>
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Online: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const cross = out(f, dur * 0.6, dur * 0.75);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(43,95,217,0.18)" />
      <Title top={150} size={120} color={GOLD} opacity={out(f, 0, 10)}>
        2004
      </Title>
      <div style={{position: 'absolute', left: 140, top: 420, width: 800, height: 500, background: '#1a1d24', borderRadius: 24, border: '16px solid #2a2f3a', opacity: out(f, dur * 0.2, dur * 0.35)}}>
        <div style={{height: 70, background: '#1d3f8f', display: 'flex', alignItems: 'center', paddingLeft: 30, fontSize: 38, fontWeight: 900, color: '#f2c218', fontFamily: 'Arial Black, Arial'}}>BLOCKBUSTER ONLINE</div>
        <div style={{display: 'flex', gap: 20, padding: 30}}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{width: 160, height: 230, background: ['#e0243c', '#2b5fd9', '#e3bf7a', '#5fd08a'][i], borderRadius: 8}} />
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', top: 1050, left: 0, right: 0, textAlign: 'center', fontSize: 90, fontWeight: 900, color: '#ddd', fontFamily: 'Arial Black, Arial'}}>
        <span style={{position: 'relative'}}>
          LATE FEES
          <span style={{position: 'absolute', left: -20, right: -20, top: '50%', height: 14, background: RED, transform: `scaleX(${cross}) rotate(-6deg)`, transformOrigin: 'left'}} />
        </span>
      </div>
    </AbsoluteFill>
  );
};

const Race: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const p = inOut(f, 0, dur * 0.9);
  return (
    <AbsoluteFill>
      <Plain />
      <Bar label="Netflix" value="" pct={60 + 25 * p} color={NFX} top={480} />
      <Bar label="Blockbuster Online" value="" pct={10 + 68 * p} color={BLUE} top={800} />
      <Title top={1180} size={80} color={GOLD} opacity={out(f, dur * 0.5, dur * 0.7)}>
        প্রায় ধরে ফেলছিল!
      </Title>
    </AbsoluteFill>
  );
};

const Cost: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.12)" />
      {Array.from({length: 18}, (_, i) => {
        const t = Math.max(0, f - i * 2);
        return (
          <div key={i} style={{position: 'absolute', left: 140 + ((i * 97) % 800), top: 900 - t * (6 + (i % 4)), fontSize: 90, opacity: Math.max(0, 1 - t / 50), transform: `rotate(${t * 3}deg)`}}>
            💵
          </div>
        );
      })}
      <Title top={1140} size={84} color={RED} opacity={out(f, dur * 0.3, dur * 0.45)}>
        − কয়েকশো মিলিয়ন ডলার
      </Title>
    </AbsoluteFill>
  );
};

const Board: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const leave = inOut(f, dur * 0.5, dur * 0.95);
  return (
    <AbsoluteFill>
      <Office tint="rgba(180,60,60,0.6)" />
      {[0, 1, 2, 3].map((i) => (
        <Place key={i} x={150 + i * 140} y={1450}>
          <Person height={640} {...LOOKS[i + 4]} silhouette="#14080a" armR={i % 2 ? 120 : 8} />
        </Place>
      ))}
      <div style={{position: 'absolute', left: -20, right: -20, top: 1180, height: 300, background: 'linear-gradient(180deg, #3a2a20 0 22px, #241a14 22px)'}} />
      <Place x={interpolate(leave, [0, 1], [820, 1300])} y={1520}>
        <Person height={820} {...ANTIOCO} brow="worried" />
      </Place>
      <Title top={200} size={110} color={RED} opacity={out(f, dur * 0.45, dur * 0.6)}>
        2007
      </Title>
      <Vignette color="40,0,6" strength={0.7} />
    </AbsoluteFill>
  );
};

const Back: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, dur * 0.3, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 60, top: 380, transform: 'scale(0.9)', transformOrigin: '0 0', opacity: 1 - m * 0.6}}>
        <div style={{width: 400, height: 260, background: '#1a1d24', borderRadius: 16, border: '12px solid #2a2f3a'}}>
          <div style={{height: 50, background: '#1d3f8f', fontSize: 26, color: '#f2c218', fontWeight: 900, padding: '8px 16px'}}>ONLINE</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 560, top: 360}}>
        <Storefront width={460} />
      </div>
      <div style={{position: 'absolute', left: interpolate(m, [0, 1], [260, 760]), top: interpolate(m, [0, 1], [520, 520]) - Math.sin(m * Math.PI) * 160, fontSize: 110}}>💰</div>
      <Place x={540} y={1520}>
        <Person height={760} {...LOOKS[5]} top="#22262e" tie="#1a1a1a" armR={60} />
      </Place>
      <Title top={1180} size={60} color={GOLD} opacity={out(f, 6, 16)}>
        নতুন CEO
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Bankrupt: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.12)" />
      <div style={{position: 'absolute', left: 40, top: 520, filter: `grayscale(${out(f, 0, dur * 0.5)})`}}>
        <Storefront width={1000} closed={out(f, dur * 0.3, dur * 0.5)} />
      </div>
      <Title top={200} size={150} color={RED} opacity={out(f, 0, 10)}>
        2010
      </Title>
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const Now: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const g = out(f, dur * 0.3, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(229,9,20,0.15)" />
      <Title top={300} size={64} opacity={out(f, 0, 10)}>
        ২০০০ সালের দাম
      </Title>
      <div style={{position: 'absolute', left: 140, top: 420, width: 40, height: 40, background: GOLD, borderRadius: 6}} />
      <div style={{position: 'absolute', left: 210, top: 410, fontSize: 56, fontWeight: 800, color: GOLD}}>$50M</div>
      <div style={{position: 'absolute', left: 140, bottom: 560, width: 800, height: 760 * g, background: NFX, borderRadius: 16, boxShadow: '0 0 80px rgba(229,9,20,0.5)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center', fontFamily: 'Arial Black, Arial', fontSize: 120, color: '#fff', opacity: out(f, dur * 0.6, dur * 0.75)}}>NETFLIX</div>
      <Title top={1380} size={56} opacity={g}>
        বিশ্বের সবচেয়ে বড় স্ট্রিমিং
      </Title>
    </AbsoluteFill>
  );
};

const Saw: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office light={1.4} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 500px 500px at 540px 600px, rgba(229,9,20,0.25), rgba(0,0,0,0) 70%)'}} />
      <Place x={540} y={1700}>
        <Person height={1100} facing="back" {...ANTIOCO} />
      </Place>
      <Title top={420} size={90} color={NFX} opacity={out(f, dur * 0.3, dur * 0.5)}>
        ভবিষ্যৎ
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Profit: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const tilt = inOut(f, dur * 0.2, dur * 0.7) * 16;
  return (
    <AbsoluteFill>
      <Plain />
      <svg width={1080} height={1200} viewBox="0 0 1080 1200" style={{position: 'absolute', top: 260}}>
        <rect x={530} y={300} width={20} height={600} fill="#888" />
        <path d="M440 900 L640 900 L590 860 L490 860Z" fill="#666" />
        <g transform={`rotate(${-tilt} 540 300)`}>
          <rect x={140} y={290} width={800} height={20} rx={8} fill="#aaa" />
          <line x1={200} y1={300} x2={200} y2={460} stroke="#aaa" strokeWidth={4} />
          <line x1={880} y1={300} x2={880} y2={460} stroke="#aaa" strokeWidth={4} />
          <g transform={`translate(200 470) rotate(${tilt})`}>
            <path d="M-130 0 L130 0 L100 50 L-100 50Z" fill={GOLD} />
            <text y={-30} textAnchor="middle" fontSize={80}>💰💰</text>
            <text y={120} textAnchor="middle" fontSize={50} fontWeight={800} fill={GOLD}>
              আজকের লাভ
            </text>
          </g>
          <g transform={`translate(880 470) rotate(${tilt})`}>
            <path d="M-130 0 L130 0 L100 50 L-100 50Z" fill={NFX} />
            <text y={-30} textAnchor="middle" fontSize={80}>🚀</text>
            <text y={120} textAnchor="middle" fontSize={50} fontWeight={800} fill={NFX}>
              ভবিষ্যৎ
            </text>
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

const Ask: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(227,191,122,0.12)" />
      <Place x={300} y={1520}>
        <Person height={900} {...LOOKS[4]} />
      </Place>
      <Place x={790} y={1520}>
        <Person height={860} {...LOOKS[1]} brow="worried" mouth="tense" />
      </Place>
      <Title top={240} size={200} color={GOLD} opacity={out(f, 2, 12)}>
        ?
      </Title>
      <div style={{position: 'absolute', left: 620, top: 520, fontSize: 110, opacity: out(f, dur * 0.4, dur * 0.55)}}>😤</div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const YourFee: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 260, top: 360}}>
        <Receipt rows={4} title="তোমার ব্যবসা" stamp={out(f, dur * 0.2, dur * 0.4)} stampText="LATE FEE" />
      </div>
    </AbsoluteFill>
  );
};

const Steal: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, dur * 0.2, dur * 0.85);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 40, top: 420, textAlign: 'center', width: 420}}>
        <div style={{fontSize: 140}}>🏪</div>
        <div style={{fontSize: 52, fontWeight: 800, color: GOLD}}>তুমি</div>
      </div>
      <div style={{position: 'absolute', right: 40, top: 420, textAlign: 'center', width: 420}}>
        <div style={{fontSize: 140}}>🏬</div>
        <div style={{fontSize: 52, fontWeight: 800, color: NFX}}>অন্য কেউ</div>
      </div>
      {Array.from({length: 8}, (_, i) => {
        const d = Math.max(0, Math.min(1, m * 1.4 - i * 0.05));
        return (
          <div key={i} style={{position: 'absolute', left: interpolate(d, [0, 1], [150 + (i % 4) * 60, 680 + (i % 4) * 60]), top: 860 + Math.floor(i / 4) * 130}}>
            <PersonIcon color={d > 0.5 ? NFX : '#c9c2b4'} size={110} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(227,191,122,0.12)" />
      <div style={{position: 'absolute', left: 290, top: 760, opacity: 0.5}}>
        <Storefront width={500} closed={1} />
      </div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  offer: Offer,
  laugh: Laugh,
  name: Name,
  store: StoreScene,
  stores: Stores,
  mail: Mail,
  arrive: Arrive,
  pitch: Pitch,
  no: No,
  twist: Twist,
  latefee: LateFee,
  hate: Hate,
  online: Online,
  race: Race,
  cost: Cost,
  board: Board,
  back: Back,
  bankrupt: Bankrupt,
  now: Now,
  saw: Saw,
  profit: Profit,
  ask: Ask,
  yourfee: YourFee,
  steal: Steal,
  cta: Cta,
};

export const BlockbusterScene: React.FC<{seg: BizSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};

export {FG};
