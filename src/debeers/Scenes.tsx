import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Bubble, PersonIcon} from '../milgram/art';
import {BG, FG, FollowButton, GOLD, GREEN, Office, Plain, PriceTag, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {Bill} from '../mcdonalds/art';
import {Toon, ToonLook} from '../common/Toon';
import {CAST} from '../common/cast';

export {BG, FG};
export type DBSegment = {id: string; text: string; visual: string};
type SP = {dur: number; id: string};

const ICE = '#bfe6ff';

// চরিত্র (Toon রিগ)
export const GROOM: ToonLook = {skin: '#d9a07a', hair: '#1c1410', hairStyle: 'short', top: '#f4f2ec', jacket: '#1f2633', tie: '#1a1a1a', bottom: '#1a1c22'};
export const BRIDE: ToonLook = {skin: '#efc6a6', hair: '#3a2418', hairStyle: 'bun', top: '#f6f2ea', skirt: '#f6f2ea', bottom: '#efe9de', shoes: '#e8e4dc'};
const EXEC: ToonLook = {...CAST.boss};
const ADMAN: ToonLook = {...CAST.ceo, glasses: true, tie: '#e3bf7a'};
const ACTRESS: ToonLook = {skin: '#f2cfb2', hair: '#e8c46a', hairStyle: 'long', top: '#a01a2a', skirt: '#a01a2a', bottom: '#a01a2a', shoes: '#a01a2a'};
const TEACHER: ToonLook = {...CAST.exec, jacket: '#3a5a4a'};
const JEWELER: ToonLook = {skin: '#e2b391', hair: '#4a3a2a', hairStyle: 'balding', top: '#f4f2ec', jacket: '#2a2a30', bottom: '#1c1e24', glasses: true, mustache: true};
const JP_M: ToonLook = {skin: '#f0d0b0', hair: '#111', hairStyle: 'side', top: '#f4f2ec', jacket: '#262a33', tie: '#2b4fa0', bottom: '#1c1e24'};
const JP_F: ToonLook = {skin: '#f4d6ba', hair: '#111', hairStyle: 'bob', top: '#e8a0b4', skirt: '#e8a0b4', bottom: '#f2efe9'};

// দৃশ্যে চরিত্র বসাতে (নিচের মাঝখান ধরে)
const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -100%)', ...style}}>{children}</div>
);

// ---------- উপাদান ----------

export const Diamond: React.FC<{size?: number; glow?: number}> = ({size = 300, glow = 1}) => {
  const f = useCurrentFrame();
  const tw = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <svg viewBox="-110 -110 220 220" width={size} height={size} style={{overflow: 'visible'}}>
      {glow > 0 ? <circle r={100} fill={ICE} opacity={0.18 * glow} /> : null}
      <path d="M-80 -30 L-50 -70 L50 -70 L80 -30 L0 80Z" fill="#d8f1ff" stroke="#6aa8d0" strokeWidth={4} strokeLinejoin="round" />
      <path d="M-80 -30 L80 -30" stroke="#6aa8d0" strokeWidth={4} />
      <path d="M-50 -70 L-25 -30 L0 -70 L25 -30 L50 -70" fill="none" stroke="#6aa8d0" strokeWidth={4} strokeLinejoin="round" />
      <path d="M-80 -30 L0 80 L-25 -30 M80 -30 L0 80 L25 -30" fill="none" stroke="#6aa8d0" strokeWidth={4} strokeLinejoin="round" />
      <path d="M-25 -30 L0 80 L25 -30Z" fill="#ffffff" opacity={0.6} />
      <path d="M-50 -70 L-25 -30 L-80 -30Z" fill="#a8dcf8" />
      <g opacity={glow * tw} fill="#fff">
        <path d="M60 -90 L66 -76 L80 -70 L66 -64 L60 -50 L54 -64 L40 -70 L54 -76Z" />
        <path d="M-70 40 L-66 50 L-56 54 L-66 58 L-70 68 L-74 58 L-84 54 L-74 50Z" />
      </g>
    </svg>
  );
};

export const Ring: React.FC<{size?: number}> = ({size = 200}) => (
  <svg viewBox="-60 -90 120 160" width={size * 0.75} height={size} style={{overflow: 'visible'}}>
    <circle cx={0} cy={20} r={42} fill="none" stroke={GOLD} strokeWidth={12} />
    <path d="M-14 -24 L14 -24 L6 -14 L-6 -14Z" fill={GOLD} />
    <g transform="translate(0 -50) scale(0.38)">
      <Diamond size={220} glow={0.6} />
    </g>
  </svg>
);

const Mines: React.FC = () => (
  <svg width={1080} height={900} viewBox="0 0 1080 900">
    <path d="M0 300 L220 180 L420 260 L620 140 L860 240 L1080 170 L1080 900 L0 900Z" fill="#8a5a34" />
    <path d="M0 420 L260 360 L520 430 L780 350 L1080 420 L1080 900 L0 900Z" fill="#6a4226" />
    <ellipse cx={540} cy={640} rx={420} ry={170} fill="#3a2414" />
    <ellipse cx={540} cy={660} rx={330} ry={120} fill="#24160c" />
  </svg>
);

const VaultDoor: React.FC<{open?: number; size?: number}> = ({open = 1, size = 700}) => (
  <svg viewBox="0 0 700 700" width={size} height={size} style={{overflow: 'visible'}}>
    <rect x={30} y={30} width={640} height={640} rx={30} fill="#3a4048" stroke="#1b1b1f" strokeWidth={8} />
    <rect x={80} y={80} width={540} height={540} rx={20} fill="#0e1218" />
    <g transform={`translate(80 80) scale(${1 - open * 0.85} 1)`}>
      <rect x={0} y={0} width={540} height={540} rx={20} fill="#6a727c" stroke="#1b1b1f" strokeWidth={8} />
      <circle cx={270} cy={270} r={120} fill="#8a929c" stroke="#1b1b1f" strokeWidth={8} />
      {[0, 60, 120].map((a) => (
        <rect key={a} x={260} y={160} width={20} height={220} rx={8} fill="#c9ced3" transform={`rotate(${a} 270 270)`} />
      ))}
    </g>
  </svg>
);

const Poster: React.FC<{width?: number; children: React.ReactNode; color?: string}> = ({width = 700, children, color = '#1a1d24'}) => (
  <div style={{width, padding: 40, background: color, border: `14px solid ${GOLD}`, boxShadow: '0 40px 90px rgba(0,0,0,0.6)', textAlign: 'center'}}>{children}</div>
);

const Sparkles: React.FC<{n?: number; seed?: string; area?: [number, number, number, number]}> = ({n = 18, seed = 's', area = [80, 300, 920, 1200]}) => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({length: n}, (_, i) => {
        const x = area[0] + random(`${seed}x${i}`) * (area[2] - area[0]);
        const y = area[1] + random(`${seed}y${i}`) * (area[3] - area[1]);
        const t = 0.5 + 0.5 * Math.sin(f / 4 + i);
        return (
          <svg key={i} width={40} height={40} viewBox="-20 -20 40 40" style={{position: 'absolute', left: x, top: y, opacity: t}}>
            <path d="M0 -18 L4 -4 L18 0 L4 4 L0 18 L-4 4 L-18 0 L-4 -4Z" fill="#fff" />
          </svg>
        );
      })}
    </>
  );
};

// ---------- দৃশ্য ----------

const Rare: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const cross = out(f, dur * 0.4, dur * 0.6);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(191,230,255,0.2)" />
      <div style={{position: 'absolute', left: 290, top: 380, transform: `scale(${spring({frame: f, fps: 30, config: {damping: 12}})})`}}>
        <Diamond size={500} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1000, textAlign: 'center', fontSize: 110, fontWeight: 900, color: '#ddd'}}>
        <span style={{position: 'relative'}}>
          দুর্লভ
          <span style={{position: 'absolute', left: -20, right: -20, top: '52%', height: 16, background: RED, transform: `scaleX(${cross}) rotate(-6deg)`, transformOrigin: 'left'}} />
        </span>
      </div>
    </AbsoluteFill>
  );
};

const Tradition: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const give = inOut(f, dur * 0.2, dur * 0.7);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(232,160,180,0.16)" />
      <At x={340} y={1560}>
        <Toon height={900} {...GROOM} gesture="hold" holding={<Ring size={150} />} expression="smile" seed="groom" />
      </At>
      <At x={770} y={1560}>
        <Toon height={860} {...BRIDE} expression={give > 0.6 ? 'laugh' : 'surprised'} gesture={give > 0.6 ? 'open' : 'idle'} seed="bride" />
      </At>
      <Title top={240} size={90} color={GOLD} opacity={out(f, dur * 0.4, dur * 0.6)}>
        ঐতিহ্য? ❌
      </Title>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Made: React.FC<SP> = () => (
  <AbsoluteFill>
    <Plain />
  </AbsoluteFill>
);

const MinesScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #e8a05a 0%, #f2c88a 40%, #8a5a34 41%)'}} />
      <div style={{position: 'absolute', left: 0, top: 640}}>
        <Mines />
      </div>
      <Sparkles n={30} seed="mine" area={[160, 1150, 900, 1420]} />
      <At x={240} y={1500}>
        <Toon height={520} {...CAST.worker} gesture="open" expression="shocked" seed="m1" />
      </At>
      <Title top={180} size={110} color="#2a1608" opacity={out(f, 0, 10)}>
        1870s
      </Title>
      <Title top={330} size={64} color="#3a2010" opacity={out(f, dur * 0.3, dur * 0.5)}>
        South Africa
      </Title>
    </AbsoluteFill>
  );
};

const DeBeersScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, dur * 0.1, dur * 0.7);
  return (
    <AbsoluteFill>
      <Office />
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{position: 'absolute', left: interpolate(m, [0, 1], [80 + i * 200, 440]), top: interpolate(m, [0, 1], [300 + (i % 2) * 120, 380])}}>
          <Diamond size={180} glow={0.4} />
        </div>
      ))}
      <At x={540} y={1580}>
        <Toon height={900} {...EXEC} gesture="open" expression="smile" seed="ex" />
      </At>
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', opacity: out(f, dur * 0.6, dur * 0.8)}}>
        <span style={{fontFamily: 'Georgia, serif', fontSize: 96, fontWeight: 900, color: GOLD, background: 'rgba(0,0,0,0.6)', padding: '10px 36px'}}>De Beers</span>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Rule: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const drop = Math.floor(interpolate(f, [0, dur], [0, 4], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(191,230,255,0.14)" />
      <svg width={460} height={360} viewBox="0 0 460 360" style={{position: 'absolute', left: 310, top: 280}}>
        <path d="M40 0 L420 0 L260 220 L260 340 L200 340 L200 220Z" fill="#c9ced3" stroke="#1b1b1f" strokeWidth={8} strokeLinejoin="round" />
      </svg>
      {Array.from({length: drop}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 500, top: 700 + i * 130}}>
          <Diamond size={90} glow={0} />
        </div>
      ))}
      <At x={240} y={1580}>
        <Toon height={760} {...EXEC} gesture="pointUp" expression="serious" seed="ex2" />
      </At>
      <Title top={1120} size={74} color={ICE} opacity={out(f, dur * 0.4, dur * 0.6)}>
        অল্প অল্প করে
      </Title>
    </AbsoluteFill>
  );
};

const Vault: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const open = inOut(f, dur * 0.1, dur * 0.6);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2e36, #0e1014)'}} />
      <div style={{position: 'absolute', left: 190, top: 340}}>
        <div style={{position: 'absolute', left: 110, top: 200, width: 480, height: 400, display: 'flex', flexWrap: 'wrap', gap: 6, opacity: open}}>
          {Array.from({length: 24}, (_, i) => (
            <Diamond key={i} size={74} glow={0} />
          ))}
        </div>
        <VaultDoor open={open} />
      </div>
      <Sparkles n={14} seed="v" area={[300, 560, 780, 920]} />
      <Title top={1150} size={80} color={GOLD} opacity={out(f, dur * 0.5, dur * 0.7)}>
        গুদামে লুকানো
      </Title>
    </AbsoluteFill>
  );
};

const Illusion: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(191,230,255,0.18)" />
      <div style={{position: 'absolute', left: 390, top: 300}}>
        <Diamond size={300} />
      </div>
      {[0, 1, 2].map((i) => (
        <At key={i} x={220 + i * 320} y={1580}>
          <Toon height={700} {...[CAST.customer, CAST.customer2, CAST.pro][i]} expression="surprised" lookX={i === 0 ? 0.6 : i === 2 ? -0.6 : 0} seed={`il${i}`} />
        </At>
      ))}
      <Title top={720} size={90} color={ICE} opacity={out(f, dur * 0.3, dur * 0.5)}>
        "কত দুর্লভ!"
      </Title>
    </AbsoluteFill>
  );
};

const Depression: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{filter: 'grayscale(0.8)'}}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a3a40, #121216)'}} />
      <div style={{position: 'absolute', left: 140, top: 300, width: 800, height: 420, background: '#2a2622', border: '12px solid #4a3a2a'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: 60, color: '#c9bfa8'}}>JEWELRY</div>
        <div style={{position: 'absolute', left: 300, top: 150}}>
          <Diamond size={160} glow={0} />
        </div>
        <div style={{position: 'absolute', right: 30, top: 140, padding: '10px 24px', background: '#f2efe9', color: RED, fontWeight: 900, fontSize: 44, transform: 'rotate(8deg)'}}>SALE</div>
      </div>
      <At x={540} y={1580}>
        <Toon height={760} {...JEWELER} expression="sad" gesture="shrug" seed="jw" />
      </At>
      <Title top={180} size={110} color="#ddd" opacity={out(f, 0, 10)}>
        1930s
      </Title>
      <Title top={780} size={66} color="#bbb" opacity={out(f, dur * 0.4, dur * 0.6)}>
        কেউ কেনে না
      </Title>
    </AbsoluteFill>
  );
};

const Ten: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [dur * 0.2, dur * 0.7], [0, 10], clampOpts));
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', top: 340, left: 140, right: 140, display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center'}}>
        {Array.from({length: 10}, (_, i) => (
          <div key={i} style={{opacity: i < n ? 1 : 0.1}}>
            {i === 0 ? <Ring size={150} /> : <svg width={112} height={150} viewBox="-60 -90 120 160"><circle cy={20} r={42} fill="none" stroke="#9a8a6a" strokeWidth={12} /></svg>}
          </div>
        ))}
      </div>
      <Title top={760} size={150} color={GOLD} opacity={out(f, dur * 0.6, dur * 0.8)}>
        মাত্র ১০%
      </Title>
    </AbsoluteFill>
  );
};

const Agency: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      <At x={300} y={1580}>
        <Toon height={860} {...EXEC} gesture="explain" expression="worried" talking seed="ag1" />
      </At>
      <At x={790} y={1580}>
        <Toon height={860} {...ADMAN} gesture="thumbsUp" expression="smile" seed="ag2" />
      </At>
      <div style={{position: 'absolute', right: 70, top: 300, padding: '14px 28px', background: 'rgba(0,0,0,0.65)', borderRight: `8px solid ${GOLD}`, textAlign: 'right', opacity: out(f, 4, 14)}}>
        <div style={{fontSize: 52, fontWeight: 800}}>N.W. Ayer</div>
        <div style={{fontSize: 32, color: GOLD}}>বিজ্ঞাপন সংস্থা</div>
      </div>
      <Title top={180} size={110} color={GOLD} opacity={out(f, dur * 0.5, dur * 0.7)}>
        1938
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Campaign: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [0, dur * 0.8], [1, 6], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(227,191,122,0.16)" />
      {Array.from({length: 6}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 80 + (i % 2) * 480, top: 260 + Math.floor(i / 2) * 400, transform: `rotate(${(i % 2 ? 4 : -4)}deg) scale(${i < n ? 1 : 0})`}}>
          <Poster width={420}>
            <Diamond size={180} glow={0.5} />
            <div style={{fontSize: 34, color: GOLD, fontWeight: 800, marginTop: 6}}>💍 ভালোবাসা</div>
          </Poster>
        </div>
      ))}
    </AbsoluteFill>
  );
};

const Hollywood: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const flash = (f % 20) < 3 ? 0.3 : 0;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 40%, #5a1a2a, #12060a 70%)'}} />
      {[160, 920].map((x, i) => (
        <div key={i} style={{position: 'absolute', left: x - 200, top: -100, width: 400, height: 1500, background: 'linear-gradient(180deg, rgba(255,240,200,0.25), rgba(255,240,200,0))', transform: `rotate(${i ? -18 : 18}deg)`, transformOrigin: '50% 0'}} />
      ))}
      <At x={540} y={1580}>
        <Toon height={1000} {...ACTRESS} gesture="wave" expression="laugh" seed="act" />
      </At>
      <div style={{position: 'absolute', left: 640, top: 520}}>
        <Ring size={170} />
      </div>
      <Sparkles n={20} seed="h" />
      <AbsoluteFill style={{background: '#fff', opacity: flash}} />
      <Title top={200} size={90} color={GOLD} opacity={out(f, dur * 0.3, dur * 0.5)}>
        প্রেম = হীরা
      </Title>
    </AbsoluteFill>
  );
};

const Schools: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a4a3a, #1a2018)'}} />
      <div style={{position: 'absolute', left: 120, top: 260, width: 840, height: 480, background: '#1f3a2a', border: '18px solid #6a4a2a', borderRadius: 8}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontSize: 72, color: '#f2efe9', fontWeight: 700, opacity: out(f, dur * 0.2, dur * 0.4)}}>ভালোবাসার প্রমাণ</div>
        <div style={{position: 'absolute', left: 340, top: 230}}>
          <Diamond size={160} glow={0} />
        </div>
      </div>
      <At x={250} y={1500}>
        <Toon height={760} {...TEACHER} gesture="pointR" expression="smile" talking seed="t" />
      </At>
      {[0, 1, 2].map((i) => (
        <At key={i} x={560 + i * 170} y={1600}>
          <Toon height={440} {...[CAST.founder, CAST.customer2, CAST.customer][i]} expression="surprised" seed={`st${i}`} />
        </At>
      ))}
    </AbsoluteFill>
  );
};

const Forever: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const words = ['A', 'Diamond', 'Is', 'Forever'];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 40%, rgba(191,230,255,0.25), rgba(0,0,0,0) 60%)'}} />
      <div style={{position: 'absolute', left: 340, top: 260}}>
        <Diamond size={400} />
      </div>
      <div style={{position: 'absolute', left: 40, right: 40, top: 760, textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: 104, fontWeight: 900, color: '#fff', lineHeight: 1.2}}>
        {words.map((w, i) => (
          <span key={w} style={{opacity: out(f, i * dur * 0.12, i * dur * 0.12 + 8), marginRight: 26, display: 'inline-block'}}>
            {w}
          </span>
        ))}
      </div>
      <Title top={1080} size={70} color={GOLD} opacity={out(f, dur * 0.6, dur * 0.8)}>
        হীরা চিরকালের
      </Title>
    </AbsoluteFill>
  );
};

const Trick: React.FC<SP> = () => (
  <AbsoluteFill>
    <Plain />
  </AbsoluteFill>
);

const NoSell: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(232,160,180,0.14)" />
      <At x={540} y={1580}>
        <Toon height={900} {...BRIDE} gesture="hold" holding={<Ring size={140} />} expression="smile" seed="ns" />
      </At>
      <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', opacity: out(f, dur * 0.2, dur * 0.35)}}>
        <Bubble size={64}>"এটা কখনো বেচব না!"</Bubble>
      </div>
      <Title top={560} size={70} color={GOLD} opacity={out(f, dur * 0.55, dur * 0.7)}>
        পুরোনো হীরা বাজারে আসে না
      </Title>
    </AbsoluteFill>
  );
};

const Resale: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const drop = out(f, dur * 0.35, dur * 0.7);
  return (
    <AbsoluteFill>
      <Office light={0.8} />
      <At x={300} y={1580}>
        <Toon height={820} {...GROOM} gesture="hold" holding={<Ring size={130} />} expression={drop > 0.5 ? 'shocked' : 'neutral'} seed="rs" />
      </At>
      <At x={800} y={1580}>
        <Toon height={800} {...JEWELER} gesture="shrug" expression="skeptical" seed="rs2" />
      </At>
      <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center'}}>
        <PriceTag text={drop > 0.5 ? '$500' : '$1000'} color={drop > 0.5 ? RED : GREEN} size={0.8} />
      </div>
      <Title top={560} size={110} color={RED} opacity={drop}>
        −৫০%
      </Title>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Salary: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, dur * 0.3, dur * 0.85);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(95,158,90,0.14)" />
      {['জানুয়ারি', 'ফেব্রুয়ারি'].map((mo, i) => (
        <div key={mo} style={{position: 'absolute', left: 140 + i * 420, top: 300, width: 380, height: 300, background: '#f2efe9', borderRadius: 16, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.5)'}}>
          <div style={{height: 80, background: RED, color: '#fff', fontSize: 48, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{mo}</div>
          <div style={{textAlign: 'center', fontSize: 56, fontWeight: 800, color: '#222', marginTop: 50}}>বেতন</div>
        </div>
      ))}
      {Array.from({length: 10}, (_, i) => (
        <Bill key={i} size={140} style={{position: 'absolute', left: interpolate(m, [0, 1], [200 + (i % 5) * 140, 470]), top: interpolate(m, [0, 1], [680 + Math.floor(i / 5) * 90, 980]), opacity: 1 - m * 0.6}} />
      ))}
      <div style={{position: 'absolute', left: 420, top: 960, transform: `scale(${0.6 + 0.6 * m})`}}>
        <Ring size={200} />
      </div>
      <Title top={1250} size={76} color={GOLD} opacity={out(f, dur * 0.2, dur * 0.4)}>
        = ২ মাসের বেতন
      </Title>
    </AbsoluteFill>
  );
};

const LovePrice: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(232,160,180,0.16)" />
      <svg width={420} height={380} viewBox="-110 -100 220 200" style={{position: 'absolute', left: 120, top: 360}}>
        <path d="M0 80 C-120 0 -100 -90 -40 -90 C-10 -90 0 -60 0 -50 C0 -60 10 -90 40 -90 C100 -90 120 0 0 80Z" fill="#e0405a" stroke="#1b1b1f" strokeWidth={6} />
      </svg>
      <div style={{position: 'absolute', left: 260, top: 700, transform: 'rotate(-12deg)', opacity: out(f, dur * 0.25, dur * 0.4)}}>
        <PriceTag text="$$$" size={0.7} />
      </div>
      <At x={330} y={1580}>
        <Toon height={640} {...GROOM} expression="worried" seed="lp1" />
      </At>
    </AbsoluteFill>
  );
};

const Result: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [0, dur * 0.8], [1, 10], clampOpts));
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', top: 340, left: 140, right: 140, display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center'}}>
        {Array.from({length: 10}, (_, i) => (
          <div key={i} style={{opacity: 1}}>
            {i < n ? <Ring size={150} /> : <svg width={112} height={150} viewBox="-60 -90 120 160"><circle cy={20} r={42} fill="none" stroke="#9a8a6a" strokeWidth={12} /></svg>}
          </div>
        ))}
      </div>
      <Title top={760} size={130} color={GREEN} opacity={out(f, dur * 0.6, dur * 0.8)}>
        প্রায় সবগুলোতে
      </Title>
    </AbsoluteFill>
  );
};

const Japan: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [dur * 0.4, dur * 0.9], [5, 60], clampOpts);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.12)" />
      <svg width={300} height={200} viewBox="0 0 300 200" style={{position: 'absolute', left: 390, top: 220}}>
        <rect width={300} height={200} fill="#fff" stroke="#1b1b1f" strokeWidth={4} />
        <circle cx={150} cy={100} r={60} fill="#bc002d" />
      </svg>
      <At x={330} y={1300}>
        <Toon height={640} {...JP_M} expression="smile" gesture="hold" holding={<Ring size={110} />} seed="jp1" />
      </At>
      <At x={720} y={1300}>
        <Toon height={600} {...JP_F} expression="laugh" seed="jp2" />
      </At>
      <div style={{position: 'absolute', left: 90, right: 90, top: 1340, height: 60, background: 'rgba(255,255,255,0.1)', borderRadius: 30}}>
        <div style={{height: '100%', width: `${p}%`, background: GOLD, borderRadius: 30, boxShadow: `0 0 30px ${GOLD}`}} />
      </div>
      <Title top={460} size={110} color={GOLD}>
        {f < dur * 0.4 ? '1967 · ৫%' : `1981 · ${Math.round(p)}%`}
      </Title>
    </AbsoluteFill>
  );
};

const Moral: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(191,230,255,0.14)" />
      <div style={{position: 'absolute', left: 120, top: 380, textAlign: 'center', width: 360, opacity: 1 - out(f, dur * 0.35, dur * 0.5) * 0.6}}>
        <svg width={260} height={220} viewBox="-60 -50 120 100">
          <path d="M-50 20 L-20 -40 L30 -36 L52 14 L10 40Z" fill="#7a7a80" stroke="#1b1b1f" strokeWidth={3} />
        </svg>
        <div style={{fontSize: 52, color: '#aaa', fontWeight: 800}}>পাথর</div>
      </div>
      <div style={{position: 'absolute', right: 120, top: 330, textAlign: 'center', width: 380, opacity: out(f, dur * 0.4, dur * 0.55)}}>
        <Diamond size={280} />
        <div style={{fontSize: 52, color: GOLD, fontWeight: 800}}>গল্প</div>
      </div>
      <Title top={880} size={80} color={GOLD} opacity={out(f, dur * 0.6, dur * 0.8)}>
        দাম থাকে মনে বসানো গল্পে
      </Title>
    </AbsoluteFill>
  );
};

const Pause: React.FC<SP> = () => (
  <AbsoluteFill>
    <Plain />
  </AbsoluteFill>
);

const Ask: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(227,191,122,0.12)" />
      <At x={540} y={1580}>
        <Toon height={900} {...CAST.customer} expression="thinking" gesture="think" seed="ask" />
      </At>
      <div style={{position: 'absolute', left: 60, right: 60, top: 260, opacity: out(f, dur * 0.2, dur * 0.35)}}>
        <Bubble size={60} color={GOLD}>
          "এটা আমি চাই, না আমাকে চাওয়ানো হয়েছে?"
        </Bubble>
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Story: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(95,208,138,0.12)" />
      <div style={{position: 'absolute', left: 120, top: 340, width: 360, height: 320, background: '#c98a4a', borderRadius: 18, border: '8px solid #1b1b1f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, fontWeight: 800, color: '#2a1608'}}>প্রোডাক্ট</div>
      <div style={{position: 'absolute', left: 520, top: 470, fontSize: 100, color: GOLD, fontWeight: 900, opacity: out(f, dur * 0.25, dur * 0.4)}}>+</div>
      <div style={{position: 'absolute', left: 620, top: 340, width: 340, height: 320, background: '#f2efe9', borderRadius: 18, border: '8px solid #1b1b1f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, fontWeight: 800, color: '#7a1f3a', opacity: out(f, dur * 0.3, dur * 0.45)}}>গল্প 📖</div>
      <At x={540} y={1580}>
        <Toon height={760} {...CAST.founder} gesture="thumbsUp" expression="laugh" seed="sty" />
      </At>
      {Array.from({length: 6}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 120 + i * 150, top: 760, opacity: out(f, dur * (0.5 + i * 0.05), dur * (0.6 + i * 0.05))}}>
          <PersonIcon color={GREEN} size={90} />
        </div>
      ))}
    </AbsoluteFill>
  );
};

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(191,230,255,0.14)" />
      <div style={{position: 'absolute', left: 390, top: 800, opacity: 0.6}}>
        <Diamond size={300} />
      </div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  rare: Rare,
  tradition: Tradition,
  made: Made,
  mines: MinesScene,
  debeers: DeBeersScene,
  rule: Rule,
  vault: Vault,
  illusion: Illusion,
  depression: Depression,
  ten: Ten,
  agency: Agency,
  campaign: Campaign,
  hollywood: Hollywood,
  schools: Schools,
  forever: Forever,
  trick: Trick,
  nosell: NoSell,
  resale: Resale,
  salary: Salary,
  lovepr: LovePrice,
  result: Result,
  japan: Japan,
  moral: Moral,
  pause: Pause,
  ask: Ask,
  story: Story,
  cta: Cta,
};

export const DeBeersScene_: React.FC<{seg: DBSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};

export {At, Office};
