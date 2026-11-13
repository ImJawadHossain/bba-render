import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Cam, LOOKS, Person, PersonProps, Place, Vignette} from '../art';
import {Bubble, PersonIcon} from '../milgram/art';
import {BG, FG, FollowButton, GOLD, GREEN, Office, Plain, PriceTag, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {Bill} from '../mcdonalds/art';

export {BG, FG};
export type KSegment = {id: string; text: string; visual: string};
type SP = {dur: number; id: string};
type Look = Omit<PersonProps, 'height'>;

export const KYEL = '#f7b500';
export const KRED = '#d71920';
export const IG = '#c13584';

// চরিত্র (নিজস্ব নকশা)
export const SASSON: Look = {hairStyle: 'curly', hair: '#3a2a1e', skin: '#ecc19e', top: '#c9ced3', bottom: '#2a2c30', glasses: true, labCoat: true};
const BOSS: Look = {hairStyle: 'short', hair: '#9a9590', skin: '#e2b391', top: '#22262e', bottom: '#1a1c22', tie: KRED};
const BOSS2: Look = {hairStyle: 'bald', hair: '#7a7068', skin: '#dcaa88', top: '#2f3440', bottom: '#22252c', tie: '#1b1d22', glasses: true};

// ---------- উপাদান ----------

// হলুদ ফিল্মের বাক্স (নিজস্ব নকশা)
export const FilmBox: React.FC<{size?: number}> = ({size = 300}) => (
  <svg viewBox="0 0 200 260" width={size} height={size * 1.3}>
    <path d="M20 40 L150 20 L190 50 L60 70Z" fill="#ffd23a" />
    <path d="M20 40 L60 70 L60 250 L20 220Z" fill="#d99a00" />
    <path d="M60 70 L190 50 L190 230 L60 250Z" fill={KYEL} />
    <path d="M60 140 L190 120 L190 170 L60 190Z" fill={KRED} />
    <text x={125} y={170} textAnchor="middle" fontSize={34} fontWeight={900} fontFamily="Arial Black, Arial" fill="#fff" transform="skewY(-8) translate(0 18)">KODAK</text>
    <text x={125} y={110} textAnchor="middle" fontSize={20} fontWeight={800} fontFamily="Arial" fill="#3a2a00" transform="skewY(-8) translate(0 18)">FILM · 24</text>
  </svg>
);

export const FilmStrip: React.FC<{width?: number; offset?: number; color?: string}> = ({width = 1200, offset = 0, color = '#2a1c10'}) => (
  <svg viewBox={`0 0 ${width} 180`} width={width} height={180}>
    <rect width={width} height={180} fill={color} />
    {Array.from({length: Math.ceil(width / 40) + 2}, (_, i) => (
      <g key={i}>
        <rect x={((i * 40 + offset) % (width + 40)) - 40} y={10} width={22} height={18} rx={3} fill="#0b0d12" />
        <rect x={((i * 40 + offset) % (width + 40)) - 40} y={152} width={22} height={18} rx={3} fill="#0b0d12" />
      </g>
    ))}
    {Array.from({length: Math.ceil(width / 200) + 2}, (_, i) => (
      <rect key={i} x={((i * 200 + offset) % (width + 200)) - 200 + 14} y={40} width={172} height={100} fill="#c98a4a" opacity={0.6} />
    ))}
  </svg>
);

// টোস্টারের মতো প্রথম ডিজিটাল ক্যামেরা
export const ToasterCam: React.FC<{size?: number; flash?: number}> = ({size = 500, flash = 0}) => (
  <svg viewBox="0 0 300 220" width={size} height={(size * 220) / 300} style={{overflow: 'visible'}}>
    <rect x={20} y={40} width={260} height={160} rx={10} fill="#8e979e" />
    <rect x={20} y={40} width={260} height={30} rx={8} fill="#b8c0c6" />
    <rect x={40} y={90} width={120} height={80} rx={4} fill="#2a2f36" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={50} y={100 + i * 16} width={100} height={8} fill="#4a7a4a" opacity={0.8} />
    ))}
    <circle cx={225} cy={130} r={44} fill="#1a1d22" />
    <circle cx={225} cy={130} r={30} fill="#3a4a5a" />
    <circle cx={214} cy={120} r={8} fill="#9ab" />
    <rect x={190} y={10} width={70} height={30} rx={4} fill="#555" />
    <rect x={30} y={196} width={240} height={14} fill="#5a6066" />
    {flash > 0 ? <circle cx={225} cy={25} r={60 * flash} fill="#fff" opacity={1 - flash} /> : null}
  </svg>
);

export const Cassette: React.FC<{size?: number; spin?: number}> = ({size = 260, spin = 0}) => (
  <svg viewBox="0 0 200 130" width={size} height={size * 0.65}>
    <rect width={200} height={130} rx={10} fill="#2a2a30" />
    <rect x={20} y={20} width={160} height={50} rx={6} fill="#e8e4dc" />
    {[60, 140].map((x) => (
      <g key={x} transform={`rotate(${spin} ${x} 45)`}>
        <circle cx={x} cy={45} r={18} fill="#3a3a40" />
        <rect x={x - 3} y={29} width={6} height={32} fill="#e8e4dc" />
      </g>
    ))}
    <path d="M50 130 L65 95 L135 95 L150 130Z" fill="#1a1a1e" />
  </svg>
);

export const Smartphone: React.FC<{size?: number; screen?: React.ReactNode}> = ({size = 300, screen}) => (
  <div style={{width: size, height: size * 2, borderRadius: size * 0.14, background: '#111', border: `${size * 0.04}px solid #333`, position: 'relative', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}}>
    <div style={{position: 'absolute', inset: size * 0.04, borderRadius: size * 0.1, background: 'linear-gradient(160deg, #2a3a5a, #1a1d24)', overflow: 'hidden'}}>{screen}</div>
  </div>
);

// নিজস্ব ক্যামেরা-আইকন অ্যাপ (আসল লোগো নয়)
export const PhotoApp: React.FC<{size?: number}> = ({size = 260}) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <defs>
      <linearGradient id="igg" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#f9a03f" />
        <stop offset="0.5" stopColor={IG} />
        <stop offset="1" stopColor="#5b51d8" />
      </linearGradient>
    </defs>
    <circle cx={50} cy={50} r={48} fill="url(#igg)" />
    <path d="M22 38 L38 38 L44 28 L56 28 L62 38 L78 38 L78 72 L22 72Z" fill="#fff" />
    <circle cx={50} cy={54} r={12} fill={IG} />
  </svg>
);

// কোম্পানির টাওয়ার (নিজস্ব নকশা)
const Tower: React.FC<{width?: number; crack?: number; gray?: number}> = ({width = 600, crack = 0, gray = 0}) => (
  <svg viewBox="0 0 400 700" width={width} height={width * 1.75} style={{filter: `grayscale(${gray})`}}>
    <rect x={60} y={120} width={280} height={580} fill="#2a2e38" />
    <rect x={120} y={40} width={160} height={90} fill="#30343e" />
    <rect x={90} y={150} width={220} height={70} fill={KYEL} />
    <text x={200} y={200} textAnchor="middle" fontSize={50} fontWeight={900} fontFamily="Arial Black, Arial" fill={KRED}>KODAK</text>
    {Array.from({length: 9}, (_, r) =>
      Array.from({length: 4}, (_, c) => <rect key={`${r}${c}`} x={90 + c * 58} y={250 + r * 48} width={36} height={26} fill="rgba(255,220,140,0.5)" />),
    )}
    {crack > 0 ? <path d={`M200 120 L180 ${120 + 200 * crack} L220 ${120 + 380 * crack} L190 ${120 + 580 * crack}`} stroke="#0b0d12" strokeWidth={10} fill="none" /> : null}
  </svg>
);

// ড্রয়ার
const Drawer: React.FC<{open?: number; children?: React.ReactNode}> = ({open = 1, children}) => (
  <div style={{position: 'relative', width: 760, height: 520}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 520, background: '#4a3426', borderRadius: 12, boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6)'}} />
    <div style={{position: 'absolute', left: 40, right: 40, top: 40 + 200 * open, height: 260, background: '#2a1c14', borderRadius: 8, overflow: 'visible'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, background: '#6a4a34', borderRadius: 8}}>
        <div style={{position: 'absolute', left: '50%', top: 40, width: 120, height: 24, marginLeft: -60, borderRadius: 12, background: '#c9a46a'}} />
      </div>
      <div style={{position: 'absolute', left: 140, top: -60 * open}}>{children}</div>
    </div>
  </div>
);

const NameCard: React.FC<{name: string; sub: string; o: number; top?: number}> = ({name, sub, o, top = 1180}) => (
  <div style={{position: 'absolute', left: 90, top, padding: '16px 30px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${KYEL}`, opacity: o}}>
    <div style={{fontSize: 56, fontWeight: 800}}>{name}</div>
    <div style={{fontSize: 34, color: KYEL}}>{sub}</div>
  </div>
);

// ---------- দৃশ্য ----------

const Hide: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const close = inOut(f, dur * 0.45, dur * 0.85);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(247,181,0,0.14)" />
      <div style={{position: 'absolute', left: 160, top: 520}}>
        <Drawer open={1 - close}>
          <ToasterCam size={440} />
        </Drawer>
      </div>
      <Title top={220} size={84} color={KYEL} opacity={out(f, 2, 12)}>
        প্রথম ডিজিটাল ক্যামেরা
      </Title>
      <Title top={1180} size={90} color={RED} opacity={close}>
        লুকানো!
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Crumble: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const c = out(f, dur * 0.2, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.12)" />
      <div style={{position: 'absolute', left: 240, top: 220, transform: `rotate(${c * 6}deg) translateY(${c * 80}px)`, transformOrigin: '50% 100%'}}>
        <Tower width={600} crack={c} gray={c} />
      </div>
      <Vignette strength={0.7} color="30,0,4" />
    </AbsoluteFill>
  );
};

const King: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const flash = (f % 24) / 24;
  return (
    <AbsoluteFill>
      <Plain glow="rgba(247,181,0,0.16)" />
      {[0, 1, 2].map((i) => (
        <Place key={i} x={230 + i * 310} y={1560}>
          <Person height={640} {...LOOKS[i + 2]} armR={35} holding={<div style={{width: 110, height: 70, background: '#222', borderRadius: 10, border: '6px solid #555'}} />} />
        </Place>
      ))}
      <AbsoluteFill style={{background: '#fff', opacity: flash < 0.15 ? 0.25 * (1 - flash / 0.15) : 0}} />
      <div style={{position: 'absolute', left: 380, top: 280, transform: `scale(${spring({frame: f, fps: 30, config: {damping: 12}})})`}}>
        <FilmBox size={320} />
      </div>
      <Title top={180} size={70} color={KYEL} opacity={out(f, dur * 0.3, dur * 0.5)}>
        ছবি = Kodak
      </Title>
    </AbsoluteFill>
  );
};

const Film: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [dur * 0.45, dur * 0.95], [0, 60], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(247,181,0,0.12)" />
      <div style={{position: 'absolute', left: -60, top: 250, transform: 'rotate(-6deg)'}}>
        <FilmStrip width={1300} offset={f * 8} />
      </div>
      <Title top={500} size={110} color={KYEL} opacity={out(f, 4, 14)}>
        প্রায় সব ফিল্ম
      </Title>
      <div style={{position: 'absolute', top: 780, left: 60, right: 60, display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center'}}>
        {Array.from({length: 60}, (_, i) => (
          <div key={i} style={{opacity: i < n ? 1 : 0.06}}>
            <PersonIcon color={i % 4 ? '#c9c2b4' : KYEL} size={66} />
          </div>
        ))}
      </div>
      <Title top={1250} size={70} opacity={out(f, dur * 0.6, dur * 0.8)}>
        ১,৫০,০০০ কর্মী
      </Title>
    </AbsoluteFill>
  );
};

const Sasson: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      <Place x={540} y={1580}>
        <Person height={940} {...SASSON} mouth="smile" />
      </Place>
      <Title top={140} size={130} color={GOLD} opacity={out(f, 0, 10)}>
        1975
      </Title>
      <NameCard name="Steve Sasson" sub="ইঞ্জিনিয়ার, বয়স ২৪" o={out(f, dur * 0.35, dur * 0.5)} />
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Invent: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const show = spring({frame: f - dur * 0.25, fps: 30, config: {damping: 12}});
  const cross = out(f, dur * 0.55, dur * 0.75);
  return (
    <AbsoluteFill>
      <Office light={1.2} />
      <Place x={260} y={1580}>
        <Person height={820} {...SASSON} armR={40} />
      </Place>
      <div style={{position: 'absolute', left: 430, top: 640, transform: `scale(${show})`}}>
        <ToasterCam size={560} flash={(f % 30) / 30} />
      </div>
      <div style={{position: 'absolute', left: 700, top: 300, opacity: cross}}>
        <FilmBox size={200} />
        <div style={{position: 'absolute', left: -20, top: 100, fontSize: 220, color: RED, fontWeight: 900, lineHeight: 1}}>✕</div>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Toaster: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [dur * 0.4, dur * 0.95], [0, 23], clampOpts);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 240, top: 300}}>
        <ToasterCam size={600} />
      </div>
      <div style={{position: 'absolute', left: 400, top: 790}}>
        <Cassette size={280} spin={f * 12} />
      </div>
      <Title top={1080} size={150} color={KYEL} opacity={out(f, dur * 0.35, dur * 0.45)}>
        {Math.round(t)} সেকেন্ড
      </Title>
    </AbsoluteFill>
  );
};

const Future: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const g = out(f, 0, dur * 0.7);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, rgba(120,180,255,${0.35 * g}), rgba(0,0,0,0) 60%)`}} />
      <div style={{position: 'absolute', left: 290, top: 520, transform: `scale(${0.8 + 0.2 * g})`, filter: `drop-shadow(0 0 ${60 * g}px rgba(140,200,255,0.8))`}}>
        <ToasterCam size={500} />
      </div>
      <Title top={1050} size={120} color="#bfe0ff" opacity={out(f, dur * 0.3, dur * 0.6)}>
        ভবিষ্যৎ
      </Title>
    </AbsoluteFill>
  );
};

const Show: React.FC<SP> = () => (
  <AbsoluteFill>
    <Office />
    <Place x={220} y={1560}>
      <Person height={720} {...SASSON} armR={60} holding={<ToasterCam size={170} />} />
    </Place>
    <Place x={640} y={1560}>
      <Person height={800} {...BOSS} />
    </Place>
    <Place x={900} y={1560}>
      <Person height={780} {...BOSS2} />
    </Place>
    <Vignette strength={0.55} />
  </AbsoluteFill>
);

const Reply: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      <Cam zoom={1.6} x={640} y={1000}>
        <Place x={640} y={1560}>
          <Person height={900} {...BOSS} mouth="smile" />
        </Place>
      </Cam>
      <div style={{position: 'absolute', left: 60, top: 240, opacity: out(f, 2, 10)}}>
        <Bubble size={64} tail="right">
          "সুন্দর জিনিস।"
        </Bubble>
      </div>
      <div style={{position: 'absolute', left: 60, top: 470, opacity: out(f, dur * 0.45, dur * 0.55)}}>
        <Bubble size={70} tail="right" color={KYEL}>
          "কিন্তু কাউকে বোলো না।"
        </Bubble>
      </div>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Why: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(247,181,0,0.14)" />
      <div style={{position: 'absolute', left: 380, top: 280}}>
        <FilmBox size={320} />
      </div>
      {Array.from({length: 10}, (_, i) => {
        const t = ((f + i * 9) % 60) / 60;
        return <Bill key={i} size={130} style={{position: 'absolute', left: 300 + ((i * 53) % 480), top: 760 + t * 300, opacity: 1 - t}} />;
      })}
      <Title top={1150} size={110} color={KYEL} opacity={out(f, dur * 0.3, dur * 0.5)}>
        টাকা = ফিল্ম
      </Title>
    </AbsoluteFill>
  );
};

const DrawerScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const close = inOut(f, dur * 0.15, dur * 0.75);
  return (
    <AbsoluteFill>
      <Office light={0.6} />
      <div style={{position: 'absolute', left: 160, top: 560}}>
        <Drawer open={1 - close}>
          <ToasterCam size={440} />
        </Drawer>
      </div>
      <Vignette strength={0.75} />
    </AbsoluteFill>
  );
};

const Warn: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [dur * 0.2, dur * 0.9], [0, 10], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.14)" />
      <div style={{position: 'absolute', left: 260, top: 240, width: 560, padding: 40, background: '#f6f2e8', color: '#1a1814', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', fontFamily: 'Georgia, serif', transform: 'rotate(-3deg)'}}>
        <div style={{fontSize: 40, fontWeight: 900, textAlign: 'center'}}>REPORT · 1981</div>
        <div style={{marginTop: 20, padding: '12px 20px', border: `6px solid ${RED}`, color: RED, fontSize: 54, fontWeight: 900, textAlign: 'center', fontFamily: 'Arial Black, Arial'}}>DIGITAL IS COMING</div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{height: 12, background: '#bdb4a0', margin: '18px 0', width: `${70 + i * 7}%`}} />
        ))}
      </div>
      <div style={{position: 'absolute', top: 900, left: 90, right: 90, display: 'flex', gap: 10}}>
        {Array.from({length: 10}, (_, i) => (
          <div key={i} style={{flex: 1, height: 80, borderRadius: 8, background: i < n ? RED : 'rgba(255,255,255,0.1)'}} />
        ))}
      </div>
      <Title top={1020} size={80} color={RED} opacity={out(f, dur * 0.3, dur * 0.5)}>
        ১০ বছর
      </Title>
    </AbsoluteFill>
  );
};

const Nothing: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      {[0, 1, 2].map((i) => (
        <Place key={i} x={220 + i * 320} y={1560}>
          <Person height={760} {...[BOSS, BOSS2, LOOKS[5]][i]} mouth="smile" />
        </Place>
      ))}
      <div style={{position: 'absolute', left: 420, top: 360, opacity: out(f, 2, 12)}}>
        <FilmBox size={240} />
      </div>
      <Title top={190} size={86} color={KYEL} opacity={out(f, dur * 0.4, dur * 0.6)}>
        কিছুই বদলাল না
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Digital: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const p = out(f, dur * 0.4, dur * 0.7);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(100,160,255,0.16)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Place key={i} x={140 + i * 200} y={1540 + (i % 2) * 30}>
          <Person height={560} {...LOOKS[i]} armR={70 * p} holding={p > 0.5 ? <div style={{width: 60, height: 110, background: '#111', borderRadius: 12, border: '5px solid #444'}} /> : undefined} />
        </Place>
      ))}
      <div style={{position: 'absolute', left: 380, top: 280, transform: `scale(${0.8 + 0.2 * p})`}}>
        <Smartphone size={320} screen={<div style={{position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #f9a03f, #c13584 50%, #5b51d8)', opacity: p}} />} />
      </div>
    </AbsoluteFill>
  );
};

const Bankrupt: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.14)" />
      <div style={{position: 'absolute', left: 240, top: 360}}>
        <Tower width={600} crack={1} gray={out(f, 0, dur * 0.5)} />
      </div>
      <Title top={180} size={130} color={RED} opacity={out(f, 0, 10)}>
        2012
      </Title>
      <div style={{position: 'absolute', left: 140, top: 800, padding: '14px 40px', border: `10px solid ${RED}`, color: RED, fontSize: 110, fontWeight: 900, fontFamily: 'Arial Black, Arial', transform: `rotate(-12deg) scale(${2 - out(f, dur * 0.3, dur * 0.45)})`, opacity: out(f, dur * 0.3, dur * 0.45), background: 'rgba(0,0,0,0.5)'}}>BANKRUPT</div>
      <Vignette strength={0.7} color="30,0,4" />
    </AbsoluteFill>
  );
};

const Three: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const days = Math.round(interpolate(f, [0, dur * 0.9], [0, 90], clampOpts));
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Title top={560} size={240} color={GOLD}>
        +{days}
      </Title>
      <Title top={880} size={80} color="#bbb">
        দিন
      </Title>
    </AbsoluteFill>
  );
};

const Insta: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 3, fps: 30, config: {damping: 11}});
  const n = Math.floor(interpolate(f, [dur * 0.2, dur * 0.45], [0, 13], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(193,53,132,0.2)" />
      <div style={{position: 'absolute', left: 410, top: 230, transform: `scale(${pop})`}}>
        <PhotoApp size={260} />
      </div>
      <div style={{position: 'absolute', top: 580, left: 140, right: 140, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center'}}>
        {Array.from({length: 13}, (_, i) => (
          <div key={i} style={{opacity: i < n ? 1 : 0.06}}>
            <PersonIcon color={IG} size={90} />
          </div>
        ))}
      </div>
      <Title top={830} size={60} opacity={out(f, dur * 0.3, dur * 0.45)}>
        মাত্র ১৩ জন
      </Title>
      <div style={{position: 'absolute', top: 960, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: out(f, dur * 0.6, dur * 0.75)}}>
        <PriceTag text="$1B" size={0.85} color={GREEN} />
      </div>
    </AbsoluteFill>
  );
};

const Moral: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, dur * 0.2, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 60, top: 400, textAlign: 'center', width: 440, opacity: 1 - 0.6 * m}}>
        <FilmBox size={240} />
        <div style={{fontSize: 52, fontWeight: 800, color: KYEL, marginTop: 20}}>Kodak</div>
      </div>
      <div style={{position: 'absolute', right: 80, top: 440, textAlign: 'center', width: 400}}>
        <PhotoApp size={220} />
        <div style={{fontSize: 52, fontWeight: 800, color: IG, marginTop: 20}}>অন্যরা</div>
      </div>
      <div style={{position: 'absolute', left: interpolate(m, [0, 1], [200, 640]), top: 980 - Math.sin(m * Math.PI) * 220}}>
        <ToasterCam size={240} />
      </div>
    </AbsoluteFill>
  );
};

const Ask: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(247,181,0,0.12)" />
      <Place x={540} y={1580}>
        <Person height={860} {...LOOKS[0]} brow="worried" />
      </Place>
      <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', opacity: out(f, dur * 0.3, dur * 0.45)}}>
        <Bubble size={72} color={KYEL}>
          "আমি না করলে, কে করবে?"
        </Bubble>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Start: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const g = out(f, dur * 0.4, dur * 0.8);
  return (
    <AbsoluteFill>
      <Plain glow={`rgba(95,208,138,${0.1 + 0.15 * g})`} />
      <div style={{position: 'absolute', left: 140, right: 140, top: 520, height: 70, background: 'rgba(255,255,255,0.08)', borderRadius: 35}}>
        <div style={{height: '100%', width: `${10 + 30 * g}%`, background: GREEN, borderRadius: 35, boxShadow: `0 0 40px ${GREEN}`}} />
      </div>
      <Title top={300} size={110} color={GREEN} opacity={out(f, dur * 0.3, dur * 0.5)}>
        আজই শুরু
      </Title>
      <Place x={540} y={1560}>
        <Person height={760} {...LOOKS[0]} mouth="smile" stride={Math.sin(f * 0.5) * 14} />
      </Place>
    </AbsoluteFill>
  );
};

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(247,181,0,0.12)" />
      <div style={{position: 'absolute', left: 400, top: 760, opacity: 0.4}}>
        <FilmBox size={260} />
      </div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  hide: Hide,
  crumble: Crumble,
  king: King,
  film: Film,
  sasson: Sasson,
  invent: Invent,
  toaster: Toaster,
  future: Future,
  show: Show,
  reply: Reply,
  why: Why,
  drawer: DrawerScene,
  warn: Warn,
  nothing: Nothing,
  digital: Digital,
  bankrupt: Bankrupt,
  three: Three,
  insta: Insta,
  moral: Moral,
  ask: Ask,
  start: Start,
  cta: Cta,
};

export const KodakScene: React.FC<{seg: KSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};

export {Tower};
