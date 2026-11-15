import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {BG, FG, FollowButton, GOLD, GREEN, Plain, PriceTag, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {Contract} from '../mcdonalds/art';
import {Toon, ToonLook} from '../common/Toon';
import {CAST} from '../common/cast';

export {BG, FG};
export type CSegment = {id: string; text: string; visual: string};
type SP = {dur: number; id: string};

const CRED = '#c8102e';
const LEAF = '#4a8a3a';

// জন পেমবার্টন: ১৮৮০-এর দশকের ফার্মাসিস্ট
export const PEMBERTON: ToonLook = {skin: '#efc6a6', hair: '#6a5a4a', hairStyle: 'side', top: '#f4f2ec', jacket: '#3a2a22', tie: '#1a1a1a', bottom: '#2a2220', beard: true, beardColor: '#7a6a5a'};
const SOLDIER: ToonLook = {skin: '#efc6a6', hair: '#6a5a4a', hairStyle: 'short', top: '#6a7088', jacket: '#4a5068', bottom: '#3a3e50', beard: true, beardColor: '#7a6a5a'};
const BUYER: ToonLook = {...CAST.boss, hair: '#c9c2b4', glasses: false};

const At: React.FC<{x: number; y: number; children: React.ReactNode}> = ({x, y, children}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -100%)'}}>{children}</div>
);

// ---------- উপাদান ----------

// পুরোনো ফোয়ারা-গ্লাস, ভেতরে কোলা
export const ColaGlass: React.FC<{size?: number; leaf?: boolean}> = ({size = 300, leaf}) => (
  <svg viewBox="0 0 120 200" width={size * 0.6} height={size} style={{overflow: 'visible'}}>
    <path d="M14 10 L106 10 L84 150 L36 150Z" fill="rgba(220,235,245,0.35)" stroke="#1b1b1f" strokeWidth={4} strokeLinejoin="round" />
    <path d="M20 34 L100 34 L82 146 L38 146Z" fill="#3a140c" />
    {[0, 1, 2, 3].map((i) => <circle key={i} cx={46 + i * 9} cy={60 + i * 18} r={3} fill="#a0603a" />)}
    <path d="M54 150 L66 150 L66 180 L54 180Z" fill="rgba(220,235,245,0.5)" stroke="#1b1b1f" strokeWidth={4} />
    <ellipse cx={60} cy={186} rx={34} ry={8} fill="rgba(220,235,245,0.5)" stroke="#1b1b1f" strokeWidth={4} />
    {leaf ? <path d="M96 0 C120 -18 140 0 128 22 C116 34 100 26 96 0Z" fill={LEAF} stroke="#1b1b1f" strokeWidth={3} /> : null}
  </svg>
);

export const Leaf: React.FC<{size?: number; rot?: number}> = ({size = 120, rot = 0}) => (
  <svg viewBox="-30 -50 60 100" width={size * 0.6} height={size} style={{transform: `rotate(${rot}deg)`}}>
    <path d="M0 -46 C30 -20 30 26 0 46 C-30 26 -30 -20 0 -46Z" fill={LEAF} stroke="#1b1b1f" strokeWidth={3} />
    <path d="M0 -40 L0 42" stroke="#2a5a24" strokeWidth={3} />
  </svg>
);

const MedBottle: React.FC<{size?: number; label?: string; color?: string}> = ({size = 300, label = 'TONIC', color = '#6a3a1e'}) => (
  <svg viewBox="0 0 120 220" width={size * 0.55} height={size}>
    <rect x={42} y={0} width={36} height={24} rx={4} fill="#3a2a1a" stroke="#1b1b1f" strokeWidth={3} />
    <path d="M44 24 L76 24 L76 50 C100 60 104 80 104 100 L104 208 C104 214 98 218 92 218 L28 218 C22 218 16 214 16 208 L16 100 C16 80 20 60 44 50Z" fill={color} stroke="#1b1b1f" strokeWidth={4} />
    <rect x={22} y={110} width={76} height={60} fill="#f2e8d0" stroke="#1b1b1f" strokeWidth={3} />
    <text x={60} y={146} textAnchor="middle" fontSize={label.length > 6 ? 13 : 17} fontWeight={900} fontFamily="Georgia, serif" fill="#3a2010">{label}</text>
  </svg>
);

const Name: React.FC<{name: string; sub: string; o: number; top?: number}> = ({name, sub, o, top = 260}) => (
  <div style={{position: 'absolute', left: 90, top, padding: '16px 30px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${CRED}`, opacity: o}}>
    <div style={{fontSize: 56, fontWeight: 800}}>{name}</div>
    <div style={{fontSize: 34, color: GOLD}}>{sub}</div>
  </div>
);

// পুরোনো দিনের সেপিয়া পটভূমি
const Old: React.FC<{dark?: boolean}> = ({dark}) => <AbsoluteFill style={{background: dark ? 'linear-gradient(180deg, #2a2018, #0e0a08)' : 'radial-gradient(ellipse at 50% 40%, #6a4a2e, #2a1a10 70%)'}} />;

const Shelf: React.FC = () => (
  <div style={{position: 'absolute', left: 60, right: 60, top: 260, height: 520, background: '#4a2e1a', border: '10px solid #2a1a0e', borderRadius: 10}}>
    {[0, 1].map((r) => (
      <div key={r} style={{position: 'absolute', left: 30, right: 30, top: 40 + r * 240, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: 200, borderBottom: '14px solid #2a1a0e'}}>
        {[0, 1, 2, 3, 4].map((i) => (
          <MedBottle key={i} size={150 + ((i + r) % 3) * 20} label={['TONIC', 'SYRUP', 'ELIXIR', 'BITTERS', 'TONIC'][i]} color={['#6a3a1e', '#2a4a6a', '#5a2a4a', '#3a5a2a', '#7a4a1e'][(i + r) % 5]} />
        ))}
      </div>
    ))}
  </div>
);

// ---------- দৃশ্য ----------

const Glass: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,16,46,0.22)" />
      <div style={{position: 'absolute', left: 390, top: 330, transform: `scale(${pop})`}}>
        <ColaGlass size={520} leaf />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 940, textAlign: 'center', opacity: out(f, dur * 0.45, dur * 0.6)}}>
        <span style={{fontSize: 90, fontWeight: 900, color: '#fff', background: CRED, padding: '10px 40px', borderRadius: 14}}>+ কোকেন</span>
      </div>
    </AbsoluteFill>
  );
};

const Pemb: React.FC<SP> = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Old />
      <At x={540} y={1600}>
        <Toon height={1000} {...SOLDIER} expression="serious" seed="pemb1" />
      </At>
      <Name name="John Pemberton" sub="গৃহযুদ্ধের সৈনিক" o={out(f, 4, 14)} />
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Wound: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const flash = f > dur * 0.35 && f < dur * 0.45 ? 0.35 : 0;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #4a2a1a 0%, #8a4a2a 55%, #1a0e08 100%)'}} />
      <svg width={1080} height={500} viewBox="0 0 1080 500" style={{position: 'absolute', top: 1080}}>
        <path d="M0 500 L0 260 C200 200 400 280 600 230 C800 180 950 260 1080 230 L1080 500Z" fill="#140a06" />
      </svg>
      <At x={540} y={1500}>
        <Toon height={900} {...SOLDIER} expression="shocked" gesture="shrug" silhouette="#1a0c08" seed="pemb2" />
      </At>
      <AbsoluteFill style={{background: '#fff', opacity: flash}} />
      <Title top={280} size={110} color="#f2c0a0" opacity={out(f, 4, 14)}>
        1865
      </Title>
    </AbsoluteFill>
  );
};

const Morphine: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Old dark />
      <div style={{position: 'absolute', left: 620, top: 360}}>
        <MedBottle size={360} label="MORPHINE" color="#3a3a4a" />
      </div>
      <At x={330} y={1580}>
        <Toon height={900} {...PEMBERTON} expression="sad" seed="pemb3" />
      </At>
      <Title top={240} size={76} color="#c9bfa8" opacity={out(f, dur * 0.4, dur * 0.6)}>
        ব্যথা থেকে আসক্তি
      </Title>
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const Pharm: React.FC<SP> = () => (
  <AbsoluteFill>
    <Old />
    <Shelf />
    <At x={540} y={1620}>
      <Toon height={860} {...PEMBERTON} expression="thinking" gesture="hold" holding={<MedBottle size={150} />} seed="pemb4" />
    </At>
    <Vignette strength={0.55} />
  </AbsoluteFill>
);

const Tonic: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const drop = inOut(f, 0, dur * 0.6);
  return (
    <AbsoluteFill>
      <Old />
      <div style={{position: 'absolute', left: 400, top: 560}}>
        <MedBottle size={480} label="WINE·COCA" color="#7a1a2a" />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{position: 'absolute', left: 300 + i * 140, top: interpolate(drop, [0, 1], [180, 560]), opacity: 1 - drop * 0.8}}>
          <Leaf size={120} rot={i * 30 - 40} />
        </div>
      ))}
      <Title top={1150} size={70} color="#f2e0c0" opacity={out(f, dur * 0.4, dur * 0.6)}>
        মদ + কোকা পাতা
      </Title>
    </AbsoluteFill>
  );
};

const Ban: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const st = out(f, dur * 0.35, dur * 0.5);
  return (
    <AbsoluteFill>
      <Old />
      <div style={{position: 'absolute', left: 160, top: 300, width: 760, padding: 40, background: '#f2e8d0', border: '10px solid #3a2010', textAlign: 'center', fontFamily: 'Georgia, serif', color: '#3a2010'}}>
        <div style={{fontSize: 70, fontWeight: 900}}>ATLANTA</div>
        <div style={{fontSize: 40, marginTop: 10}}>CITY NOTICE · 1886</div>
        <div style={{fontSize: 52, marginTop: 30, fontWeight: 700}}>NO ALCOHOL</div>
      </div>
      <div style={{position: 'absolute', left: 280, top: 430, padding: '10px 40px', border: `10px solid ${RED}`, color: RED, fontSize: 110, fontWeight: 900, fontFamily: 'Arial Black, Arial', transform: `rotate(-12deg) scale(${2 - st})`, opacity: st}}>BANNED</div>
      <At x={540} y={1600}>
        <Toon height={760} {...PEMBERTON} expression="worried" gesture="shrug" seed="pemb5" />
      </At>
    </AbsoluteFill>
  );
};

const Born: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.3, fps: 30, config: {damping: 11}});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, rgba(200,16,46,${0.4 * pop}), rgba(0,0,0,0) 60%)`}} />
      <Title top={240} size={140} color={GOLD} opacity={out(f, 0, 10)}>
        1886
      </Title>
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', transform: `scale(${pop})`}}>
        <span style={{fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 170, fontWeight: 900, color: '#fff', textShadow: `0 0 50px ${CRED}`}}>Coca-Cola</span>
      </div>
      <div style={{position: 'absolute', left: 440, top: 900, opacity: pop}}>
        <ColaGlass size={330} />
      </div>
    </AbsoluteFill>
  );
};

const Shop: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Old />
      <Shelf />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1150, height: 300, background: 'linear-gradient(180deg, #6a4026, #3a2414)', borderTop: '12px solid #2a1a0e'}} />
      <div style={{position: 'absolute', left: 230, top: 880}}>
        <ColaGlass size={270} />
      </div>
      <At x={760} y={1160}>
        <Toon height={620} {...PEMBERTON} expression="smile" gesture="open" seed="pemb6" />
      </At>
      <div style={{position: 'absolute', left: 120, top: 830, transform: 'rotate(-8deg)', opacity: out(f, dur * 0.4, dur * 0.55)}}>
        <PriceTag text="5¢" size={0.6} />
      </div>
    </AbsoluteFill>
  );
};

const Every: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(74,138,58,0.18)" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const p = spring({frame: f - i * 4, fps: 30, config: {damping: 12}});
        return (
          <div key={i} style={{position: 'absolute', left: 110 + (i % 3) * 300, top: 300 + Math.floor(i / 3) * 420, transform: `scale(${p})`}}>
            <ColaGlass size={330} leaf />
          </div>
        );
      })}
      <Title top={1180} size={80} color={GREEN} opacity={out(f, dur * 0.4, dur * 0.6)}>
        প্রতিটা গ্লাসে
      </Title>
    </AbsoluteFill>
  );
};

const Legal: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Old />
      <div style={{position: 'absolute', left: 140, top: 340, width: 620, padding: 40, background: '#f2e8d0', border: '10px solid #3a2010', fontFamily: 'Georgia, serif', color: '#3a2010', transform: 'rotate(-3deg)'}}>
        <div style={{fontSize: 56, fontWeight: 900, textAlign: 'center'}}>LAW · 1886</div>
        {[0, 1, 2].map((i) => <div key={i} style={{height: 12, background: '#bdb4a0', margin: '20px 0', width: `${70 + i * 10}%`}} />)}
        <div style={{fontSize: 50, fontWeight: 900, color: GREEN, textAlign: 'center', marginTop: 20, opacity: out(f, dur * 0.3, dur * 0.5)}}>COCAINE: LEGAL</div>
      </div>
    </AbsoluteFill>
  );
};

const Nothing: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Old dark />
      <At x={360} y={1600}>
        <Toon height={900} {...PEMBERTON} expression="sad" gesture="shrug" seed="pemb7" />
      </At>
      <div style={{position: 'absolute', left: 640, top: 520, opacity: 0.85}}>
        <ColaGlass size={360} />
      </div>
      <Title top={240} size={120} color={RED} opacity={out(f, dur * 0.5, dur * 0.65)}>
        $0
      </Title>
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const Sold: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Old dark />
      <div style={{position: 'absolute', left: 300, top: 260, transform: 'rotate(-3deg)'}}>
        <Contract size={480} lines={6} sign={inOut(f, dur * 0.2, dur * 0.6)} title="SALE" stamp="SOLD" stampO={out(f, dur * 0.65, dur * 0.8)} />
      </div>
      <At x={260} y={1600}>
        <Toon height={760} {...PEMBERTON} expression="sad" seed="pemb8" />
      </At>
      <At x={820} y={1600}>
        <Toon height={780} {...BUYER} expression="smile" gesture="thumbsUp" seed="buyer" />
      </At>
    </AbsoluteFill>
  );
};

const Died: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a1612, #050404)'}} />
      <svg width={500} height={600} viewBox="0 0 500 600" style={{position: 'absolute', left: 290, top: 620}}>
        <rect x={100} y={40} width={300} height={260} rx={20} fill="#3a2a1e" stroke="#1b1b1f" strokeWidth={8} />
        <rect x={80} y={300} width={340} height={60} rx={10} fill="#4a3426" stroke="#1b1b1f" strokeWidth={8} />
        <rect x={100} y={360} width={30} height={220} fill="#3a2a1e" />
        <rect x={370} y={360} width={30} height={220} fill="#3a2a1e" />
      </svg>
      <svg width={120} height={260} viewBox="0 0 120 260" style={{position: 'absolute', left: 140, top: 900}}>
        <ellipse cx={60} cy={40 + Math.sin(f / 4) * 3} rx={16} ry={30} fill="#ffc861" opacity={0.9} />
        <rect x={40} y={80} width={40} height={170} rx={6} fill="#f2efe9" />
      </svg>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 300px 400px at 200px 950px, rgba(255,200,97,0.18), rgba(0,0,0,0) 70%)'}} />
      <Title top={300} size={110} color="#bbb" opacity={out(f, 4, 14)}>
        1888
      </Title>
      <Title top={440} size={64} color="#999" opacity={out(f, dur * 0.4, dur * 0.6)}>
        গরিব অবস্থায়
      </Title>
    </AbsoluteFill>
  );
};

const Fear: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const cross = out(f, dur * 0.55, dur * 0.7);
  return (
    <AbsoluteFill>
      <Old />
      <div style={{position: 'absolute', left: 120, top: 260, width: 840, padding: 34, background: '#efe6d0', color: '#1a1410', fontFamily: 'Georgia, serif', boxShadow: '0 30px 80px rgba(0,0,0,0.6)', transform: 'rotate(-2deg)'}}>
        <div style={{fontSize: 40, textAlign: 'center', borderBottom: '4px solid #1a1410', paddingBottom: 10}}>THE DAILY NEWS · 1903</div>
        <div style={{fontSize: 80, fontWeight: 900, textAlign: 'center', marginTop: 20}}>COCAINE FEAR!</div>
        {[0, 1, 2].map((i) => <div key={i} style={{height: 12, background: '#bdb4a0', margin: '18px 0', width: `${70 + i * 10}%`}} />)}
      </div>
      <div style={{position: 'absolute', left: 380, top: 860}}>
        <Leaf size={260} />
        <div style={{position: 'absolute', left: -60, top: 30, fontSize: 260, color: RED, fontWeight: 900, lineHeight: 1, opacity: cross}}>✕</div>
      </div>
    </AbsoluteFill>
  );
};

const Today: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const ship = inOut(f, 0, dur * 0.8);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a4a6a 0%, #8ab8e0 50%, #1a3a5a 51%, #0a1a2a 100%)'}} />
      <div style={{position: 'absolute', left: interpolate(ship, [0, 1], [-560, 280]), top: 760}}>
        <svg width={560} height={300} viewBox="0 0 560 300">
          <path d="M0 200 L560 200 L500 290 L60 290Z" fill="#5a5048" stroke="#1b1b1f" strokeWidth={8} />
          <rect x={80} y={110} width={180} height={90} fill="#8a6a3a" stroke="#1b1b1f" strokeWidth={6} />
          <rect x={300} y={110} width={180} height={90} fill="#8a6a3a" stroke="#1b1b1f" strokeWidth={6} />
        </svg>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{position: 'absolute', left: 100 + i * 100, top: 40}}>
            <Leaf size={90} rot={i * 20 - 30} />
          </div>
        ))}
      </div>
      <Title top={240} size={100} color="#fff" opacity={out(f, 4, 14)}>
        আজও · USA
      </Title>
    </AbsoluteFill>
  );
};

const Extract: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const t = (f % 40) / 40;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2e36, #0e1014)'}} />
      <svg width={600} height={560} viewBox="0 0 600 560" style={{position: 'absolute', left: 240, top: 640}}>
        <rect x={100} y={80} width={400} height={360} rx={30} fill="#8e979e" stroke="#1b1b1f" strokeWidth={8} />
        <rect x={160} y={140} width={280} height={140} rx={14} fill="#1a1d22" />
        <circle cx={240} cy={360} r={30} fill="#5fd08a" />
        <circle cx={360} cy={360} r={30} fill={RED} />
        <rect x={0} y={200} width={100} height={40} fill="#5a6066" />
        <rect x={500} y={160} width={100} height={40} fill="#5a6066" />
        <rect x={500} y={300} width={100} height={40} fill="#5a6066" />
      </svg>
      <div style={{position: 'absolute', left: interpolate(t, [0, 1], [40, 340]), top: 820}}>
        <Leaf size={110} />
      </div>
      <div style={{position: 'absolute', left: 860, top: 740, fontSize: 52, fontWeight: 900, color: GREEN}}>স্বাদ ✓</div>
      <div style={{position: 'absolute', left: 860, top: 880, fontSize: 52, fontWeight: 900, color: RED}}>কোকেন ✕</div>
      <Title top={320} size={84} color={GREEN} opacity={out(f, dur * 0.2, dur * 0.4)}>
        শুধু স্বাদটা থাকে
      </Title>
    </AbsoluteFill>
  );
};

const None: React.FC<SP> = () => (
  <AbsoluteFill>
    <Plain />
  </AbsoluteFill>
);

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,16,46,0.18)" />
      <div style={{position: 'absolute', left: 450, top: 800, opacity: 0.6}}>
        <ColaGlass size={320} />
      </div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  glass: Glass,
  pemb: Pemb,
  wound: Wound,
  morphine: Morphine,
  pharm: Pharm,
  tonic: Tonic,
  ban: Ban,
  born: Born,
  shop: Shop,
  every: Every,
  legal: Legal,
  nothing: Nothing,
  sold: Sold,
  died: Died,
  fear: Fear,
  today: Today,
  extract: Extract,
  none: None,
  cta: Cta,
};

export const CocaScene: React.FC<{seg: CSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};

export {clampOpts};
