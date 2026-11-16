import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Bubble} from '../milgram/art';
import {BG, FG, FollowButton, GOLD, Office, Plain, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {Bill} from '../mcdonalds/art';
import {Toon, ToonLook} from '../common/Toon';
import {CAST} from '../common/cast';

export {BG, FG};
export type FSegment = {id: string; text: string; visual: string};
type SP = {dur: number; id: string};

const ORANGE = '#f28a1a';

export const KEITH: ToonLook = {skin: '#efc6a6', hair: '#5a4434', hairStyle: 'side', top: '#f4f2ec', jacket: '#3a3a40', tie: '#a01a2a', bottom: '#22252c', mustache: true};
const US_EXEC: ToonLook = {...CAST.ceo, jacket: '#1f2a44'};
const SALESMAN: ToonLook = {skin: '#e2b391', hair: '#c98a4a', hairStyle: 'short', top: '#f4f2ec', jacket: '#6a4a2a', tie: '#2b4fa0', bottom: '#3a2a1e'};
const HOUSEWIFE: ToonLook = {skin: '#efc6a6', hair: '#7a4a2a', hairStyle: 'bun', top: '#5a7a9a', skirt: '#3a4a6a', bottom: '#3a4a6a'};

const At: React.FC<{x: number; y: number; children: React.ReactNode}> = ({x, y, children}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -100%)'}}>{children}</div>
);

// ---------- উপাদান ----------

export const Bottle: React.FC<{size?: number; color?: string; label?: string}> = ({size = 400, color = ORANGE, label = 'FANTA'}) => (
  <svg viewBox="0 0 120 300" width={size * 0.4} height={size} style={{overflow: 'visible'}}>
    <rect x={44} y={0} width={32} height={16} rx={3} fill="#c9ced3" stroke="#1b1b1f" strokeWidth={3} />
    <path d="M46 16 L74 16 L74 60 C100 80 106 110 106 140 L106 286 C106 294 100 300 92 300 L28 300 C20 300 14 294 14 286 L14 140 C14 110 20 80 46 60Z" fill="rgba(230,240,245,0.35)" stroke="#1b1b1f" strokeWidth={4} />
    <path d="M18 120 L102 120 L102 286 C102 292 98 296 92 296 L28 296 C22 296 18 292 18 286Z" fill={color} />
    <rect x={14} y={170} width={92} height={70} fill="#1f4fb5" stroke="#1b1b1f" strokeWidth={3} />
    <text x={60} y={214} textAnchor="middle" fontSize={label.length > 5 ? 20 : 24} fontWeight={900} fontFamily="Arial Black, Arial" fill="#fff">{label}</text>
    <rect x={26} y={130} width={8} height={150} rx={4} fill="#fff" opacity={0.35} />
  </svg>
);

const Barrel: React.FC<{size?: number; label?: string; empty?: boolean}> = ({size = 300, label = 'SYRUP', empty}) => (
  <svg viewBox="0 0 200 240" width={size} height={size * 1.2}>
    <path d="M30 20 C20 80 20 160 30 220 L170 220 C180 160 180 80 170 20Z" fill={empty ? '#5a4a3a' : '#7a3a1e'} stroke="#1b1b1f" strokeWidth={6} />
    <ellipse cx={100} cy={20} rx={70} ry={14} fill={empty ? '#2a2018' : '#3a1a0e'} stroke="#1b1b1f" strokeWidth={6} />
    {[70, 150].map((y) => <path key={y} d={`M24 ${y} L176 ${y}`} stroke="#3a3a40" strokeWidth={10} />)}
    <text x={100} y={125} textAnchor="middle" fontSize={30} fontWeight={900} fontFamily="Arial Black, Arial" fill="#f2efe9">{label}</text>
  </svg>
);

const Factory: React.FC<{dim?: number}> = ({dim = 0}) => (
  <svg viewBox="0 0 900 520" width={900} height={520}>
    <rect x={40} y={200} width={820} height={320} fill="#5a4a40" stroke="#1b1b1f" strokeWidth={8} />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M${40 + i * 205} 200 L${140 + i * 205} 120 L${245 + i * 205} 200Z`} fill="#4a3a32" stroke="#1b1b1f" strokeWidth={8} />
    ))}
    <rect x={700} y={20} width={60} height={180} fill="#3a2a22" stroke="#1b1b1f" strokeWidth={8} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x={90 + i * 130} y={280} width={80} height={90} fill={dim ? '#1a1a20' : '#ffd88a'} stroke="#1b1b1f" strokeWidth={5} />
    ))}
    <rect x={380} y={400} width={140} height={120} fill="#2a2018" stroke="#1b1b1f" strokeWidth={6} />
  </svg>
);

const Crate: React.FC<{label: string; color: string; size?: number}> = ({label, color, size = 260}) => (
  <div style={{width: size, height: size * 0.8, background: '#a87a4a', border: '8px solid #1b1b1f', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.17, fontWeight: 800, color, textAlign: 'center', boxShadow: 'inset 0 -20px 0 rgba(0,0,0,0.2)'}}>{label}</div>
);

const Name: React.FC<{name: string; sub: string; o: number; top?: number}> = ({name, sub, o, top = 1180}) => (
  <div style={{position: 'absolute', left: 90, top, padding: '16px 30px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${ORANGE}`, opacity: o}}>
    <div style={{fontSize: 56, fontWeight: 800}}>{name}</div>
    <div style={{fontSize: 34, color: ORANGE}}>{sub}</div>
  </div>
);

// ---------- দৃশ্য ----------

const FantaScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a3a40, #121216)', filter: 'grayscale(1)'}} />
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, rgba(242,138,26,${0.35 * pop}), rgba(0,0,0,0) 55%)`}} />
      <div style={{position: 'absolute', left: 420, top: 330, transform: `scale(${pop}) rotate(${(1 - pop) * -15}deg)`}}>
        <Bottle size={620} />
      </div>
      <Title top={1050} size={90} color="#ddd" opacity={out(f, dur * 0.4, dur * 0.6)}>
        জার্মানি · 1940
      </Title>
    </AbsoluteFill>
  );
};

const Germany: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [0, dur * 0.8], [1, 12], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(200,16,46,0.14)" />
      <Title top={150} size={110} color={GOLD} opacity={out(f, 0, 10)}>
        1930s
      </Title>
      <div style={{position: 'absolute', top: 330, left: 120, right: 120, display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center'}}>
        {Array.from({length: 12}, (_, i) => (
          <div key={i} style={{opacity: i < n ? 1 : 0.08}}>
            <Bottle size={220} color="#3a1a0e" label="COLA" />
          </div>
        ))}
      </div>
      <Title top={1150} size={80} opacity={out(f, dur * 0.4, dur * 0.6)}>
        বড় বাজার: জার্মানি
      </Title>
    </AbsoluteFill>
  );
};

const KeithScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      <At x={540} y={1580}>
        <Toon height={980} {...KEITH} expression="smile" gesture="explain" seed="keith" />
      </At>
      <Name name="Max Keith" sub="Coca-Cola জার্মানির প্রধান" o={out(f, 4, 14)} top={260} />
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const War: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a1414 0%, #6a2a1a 55%, #120808 100%)'}} />
      {[0, 1, 2, 3].map((i) => (
        <svg key={i} width={260} height={100} viewBox="0 0 260 100" style={{position: 'absolute', left: interpolate(f, [0, dur], [-300 + i * 160, 300 + i * 260]), top: 260 + i * 110}}>
          <path d="M10 50 L200 44 C230 44 250 48 256 52 C250 56 230 60 200 60 L10 56Z" fill="#14080a" />
          <path d="M90 50 L150 50 L110 4 L90 4Z M90 54 L150 54 L110 96 L90 96Z M10 50 L30 50 L20 24 L10 24Z" fill="#14080a" />
        </svg>
      ))}
      <svg width={1080} height={500} viewBox="0 0 1080 500" style={{position: 'absolute', top: 1050}}>
        <path d="M0 500 L0 300 L80 300 L80 220 L160 220 L160 340 L260 340 L260 180 L340 180 L340 320 L460 320 L460 240 L560 240 L560 360 L700 360 L700 200 L780 200 L780 300 L900 300 L900 260 L1080 260 L1080 500Z" fill="#0a0404" />
      </svg>
      <Title top={1000} size={90} color="#f2c0a0" opacity={out(f, dur * 0.3, dur * 0.5)}>
        দ্বিতীয় বিশ্বযুদ্ধ
      </Title>
    </AbsoluteFill>
  );
};

const Enemies: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const c = inOut(f, dur * 0.2, dur * 0.6);
  const box = (t: string, col: string) => (
    <div style={{width: 380, height: 240, background: col, border: '8px solid #1b1b1f', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial Black, Arial', fontSize: 60, color: '#fff'}}>{t}</div>
  );
  return (
    <AbsoluteFill>
      <Plain glow="rgba(224,36,60,0.14)" />
      <div style={{position: 'absolute', left: interpolate(c, [0, 1], [-200, 70]), top: 500}}>{box('USA', '#2b4fa0')}</div>
      <div style={{position: 'absolute', right: interpolate(c, [0, 1], [-200, 70]), top: 500}}>{box('GERMANY', '#4a4a50')}</div>
      <Title top={820} size={160} color={RED} opacity={c}>
        ⚡
      </Title>
      <Title top={1060} size={90} color={RED} opacity={out(f, dur * 0.5, dur * 0.7)}>
        শত্রু
      </Title>
    </AbsoluteFill>
  );
};

const Syrup: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const ship = inOut(f, 0, dur * 0.6);
  const x = out(f, dur * 0.55, dur * 0.7);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a2a44 0%, #4a6a8a 52%, #0d2a44 53%, #061420 100%)'}} />
      <div style={{position: 'absolute', left: interpolate(ship, [0, 1], [-500, 260]), top: 680}}>
        <svg width={560} height={300} viewBox="0 0 560 300">
          <path d="M0 200 L560 200 L500 290 L60 290Z" fill="#5a5048" stroke="#1b1b1f" strokeWidth={8} />
          <rect x={200} y={120} width={160} height={80} fill="#6a6058" stroke="#1b1b1f" strokeWidth={6} />
        </svg>
        <div style={{position: 'absolute', left: 60, top: 40}}>
          <Barrel size={140} />
        </div>
      </div>
      <Title top={560} size={300} color={RED} opacity={x}>
        ✕
      </Title>
      <Title top={280} size={76} opacity={out(f, 4, 14)}>
        গোপন সিরাপ
      </Title>
    </AbsoluteFill>
  );
};

const Missing: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office light={0.6} />
      <div style={{position: 'absolute', left: 380, top: 480}}>
        <Barrel size={320} label="EMPTY" empty />
      </div>
      <At x={250} y={1580}>
        <Toon height={760} {...KEITH} expression="worried" gesture="shrug" seed="k2" />
      </At>
      <Title top={240} size={100} color={RED} opacity={out(f, dur * 0.3, dur * 0.5)}>
        সিরাপ নেই!
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Danger: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const leave = inOut(f, dur * 0.4, dur * 0.95);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2a30, #0e0e12)'}} />
      <div style={{position: 'absolute', left: 90, top: 300}}>
        <Factory dim={1} />
      </div>
      {[0, 1, 2].map((i) => (
        <At key={i} x={interpolate(leave, [0, 1], [300 + i * 220, 1300 + i * 220])} y={1560}>
          <Toon height={560} {...CAST.worker} top={['#4a5a3a', '#5a5a40', '#4a4a3a'][i]} expression="worried" stride={Math.sin(f * 0.5 + i) * 12 * leave} seed={`w${i}`} />
        </At>
      ))}
      <Title top={180} size={80} color={RED} opacity={out(f, 4, 14)}>
        কারখানা বন্ধের ভয়
      </Title>
    </AbsoluteFill>
  );
};

const Decide: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office light={1.2} />
      <At x={540} y={1600}>
        <Toon height={1000} {...KEITH} expression="serious" gesture="pointUp" seed="k3" />
      </At>
      <Title top={240} size={90} color={ORANGE} opacity={out(f, dur * 0.3, dur * 0.5)}>
        "কিছু একটা বানাতেই হবে!"
      </Title>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Leftovers: React.FC<SP> = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a3028, #1a1410)'}} />
      {[
        ['ঘোল', '#f2efe9', 120, 500],
        ['আপেলের ছোবড়া', '#e8c46a', 560, 520],
        ['চিনি', '#f2efe9', 300, 900],
        ['বাকি সব', '#e3bf7a', 680, 920],
      ].map(([l, c, x, y], i) => (
        <div key={i} style={{position: 'absolute', left: x as number, top: y as number, transform: `scale(${spring({frame: f - i * 5, fps: 30, config: {damping: 12}})})`}}>
          <Crate label={l as string} color={c as string} size={320} />
        </div>
      ))}
    </AbsoluteFill>
  );
};

const Whey: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(242,239,233,0.12)" />
      <svg width={500} height={300} viewBox="0 0 500 300" style={{position: 'absolute', left: 90, top: 380}}>
        <path d="M40 260 L460 260 L380 60 Z" fill="#f2c84a" stroke="#1b1b1f" strokeWidth={8} strokeLinejoin="round" />
        {[[200, 200], [300, 170], [360, 220], [260, 230]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14} fill="#d9a830" />)}
      </svg>
      <svg width={360} height={380} viewBox="0 0 360 380" style={{position: 'absolute', left: 600, top: 600}}>
        <path d="M40 60 L320 60 L290 360 L70 360Z" fill="#9a9aa0" stroke="#1b1b1f" strokeWidth={8} />
        <ellipse cx={180} cy={70} rx={130} ry={20} fill="#e8eadc" stroke="#1b1b1f" strokeWidth={6} />
      </svg>
      <Title top={1120} size={80} color="#f2efe9" opacity={out(f, dur * 0.3, dur * 0.5)}>
        পনিরের ঘোল
      </Title>
      <Title top={1240} size={56} color="#aaa" opacity={out(f, dur * 0.5, dur * 0.7)}>
        (ফেলে দেওয়ার জিনিস)
      </Title>
    </AbsoluteFill>
  );
};

const Apple: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const sq = inOut(f, 0, dur * 0.5);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(232,196,106,0.14)" />
      {[0, 1, 2].map((i) => (
        <svg key={i} width={200} height={200} viewBox="-50 -50 100 100" style={{position: 'absolute', left: 160 + i * 260, top: 360, transform: `scaleY(${1 - sq * 0.6})`, transformOrigin: '50% 100%'}}>
          <circle r={40} fill="#c83a2a" stroke="#1b1b1f" strokeWidth={4} />
          <path d="M0 -40 L4 -54" stroke="#4a2a14" strokeWidth={5} />
          <path d="M4 -48 C16 -58 26 -52 24 -44 C14 -42 8 -44 4 -48Z" fill="#5fae3a" />
        </svg>
      ))}
      <svg width={700} height={260} viewBox="0 0 700 260" style={{position: 'absolute', left: 190, top: 720, opacity: sq}}>
        <ellipse cx={350} cy={180} rx={320} ry={70} fill="#b88a3a" stroke="#1b1b1f" strokeWidth={6} />
        {Array.from({length: 20}, (_, i) => <circle key={i} cx={80 + ((i * 97) % 540)} cy={150 + ((i * 31) % 50)} r={12} fill="#8a5a24" />)}
      </svg>
      <Title top={1120} size={80} color="#e8c46a" opacity={out(f, dur * 0.4, dur * 0.6)}>
        আপেলের ছোবড়া
      </Title>
    </AbsoluteFill>
  );
};

const Mix: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const done = spring({frame: f - dur * 0.55, fps: 30, config: {damping: 11}});
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2e36, #0e1014)'}} />
      <svg width={560} height={520} viewBox="0 0 560 520" style={{position: 'absolute', left: 260, top: 320, opacity: 1 - done * 0.7}}>
        <path d="M60 60 L500 60 L460 480 L100 480Z" fill="#8e979e" stroke="#1b1b1f" strokeWidth={8} />
        <ellipse cx={280} cy={70} rx={220} ry={30} fill="#e8b43a" stroke="#1b1b1f" strokeWidth={6} />
        <g transform={`rotate(${f * 10} 280 70)`}>
          <rect x={270} y={-60} width={20} height={200} fill="#5a6066" />
        </g>
      </svg>
      <div style={{position: 'absolute', left: 430, top: 380, transform: `scale(${done})`}}>
        <Bottle size={560} color="#e8b43a" />
      </div>
      <Title top={1150} size={80} color={ORANGE} opacity={done}>
        নতুন পানীয়!
      </Title>
    </AbsoluteFill>
  );
};

const NameScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Office />
      <At x={260} y={1580}>
        <Toon height={860} {...KEITH} expression="smile" gesture="explain" talking seed="k4" />
      </At>
      {[0, 1].map((i) => (
        <At key={i} x={640 + i * 240} y={1580}>
          <Toon height={760} {...[SALESMAN, CAST.exec][i]} expression="thinking" gesture="think" seed={`team${i}`} />
        </At>
      ))}
      <div style={{position: 'absolute', left: 60, top: 300, opacity: out(f, dur * 0.2, dur * 0.35)}}>
        <Bubble size={64} tail="left">
          "কল্পনা খাটাও!"
        </Bubble>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Shout: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.45, fps: 30, config: {damping: 9}});
  return (
    <AbsoluteFill>
      <Office light={1.2} />
      <At x={540} y={1600}>
        <Toon height={980} {...SALESMAN} expression="laugh" gesture={f > dur * 0.45 ? 'wave' : 'think'} seed="sm" />
      </At>
      <div style={{position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center', transform: `scale(${pop}) rotate(-6deg)`}}>
        <span style={{fontFamily: 'Arial Black, Arial', fontSize: 200, color: ORANGE, textShadow: '0 10px 0 #1f4fb5, 0 0 60px rgba(242,138,26,0.6)'}}>FANTA!</span>
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Cook: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pour = inOut(f, dur * 0.2, dur * 0.6);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #4a3a2a, #1a120c)'}} />
      <svg width={460} height={300} viewBox="0 0 460 300" style={{position: 'absolute', left: 500, top: 1080}}>
        <path d="M30 60 L430 60 L400 280 L60 280Z" fill="#5a5a60" stroke="#1b1b1f" strokeWidth={8} />
        <ellipse cx={230} cy={64} rx={200} ry={26} fill="#c98a4a" stroke="#1b1b1f" strokeWidth={6} />
        {[0, 1, 2].map((i) => <path key={i} d={`M${150 + i * 80} 30 C${140 + i * 80} 0 ${170 + i * 80} -10 ${160 + i * 80} -40`} stroke="#ccc" strokeWidth={6} fill="none" opacity={0.6} />)}
      </svg>
      <div style={{position: 'absolute', left: 560, top: 640, transform: `rotate(${pour * 110}deg)`, transformOrigin: '50% 80%'}}>
        <Bottle size={300} color="#e8b43a" />
      </div>
      <At x={300} y={1580}>
        <Toon height={900} {...HOUSEWIFE} expression="smile" gesture="explain" seed="hw" />
      </At>
      <Title top={240} size={76} color={ORANGE} opacity={out(f, dur * 0.4, dur * 0.6)}>
        চিনির বদলে Fanta
      </Title>
    </AbsoluteFill>
  );
};

const End: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a3a40, #121216)'}} />
      <div style={{position: 'absolute', left: 90, top: 380, opacity: 0.5}}>
        <Factory dim={1} />
      </div>
      <At x={540} y={1600}>
        <Toon height={900} {...US_EXEC} expression="sad" gesture="shrug" seed="us" />
      </At>
      <Title top={200} size={110} color={GOLD} opacity={out(f, 0, 10)}>
        1945
      </Title>
      <Title top={340} size={70} color="#ddd" opacity={out(f, dur * 0.4, dur * 0.6)}>
        "জার্মান শাখা শেষ…"
      </Title>
    </AbsoluteFill>
  );
};

const Return: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const m = inOut(f, dur * 0.25, dur * 0.8);
  return (
    <AbsoluteFill>
      <Office />
      <At x={260} y={1580}>
        <Toon height={860} {...KEITH} expression="smile" gesture="open" seed="k5" />
      </At>
      <At x={760} y={1580}>
        <Toon height={860} {...US_EXEC} expression={m > 0.7 ? 'shocked' : 'neutral'} seed="us2" />
      </At>
      {Array.from({length: 8}, (_, i) => (
        <Bill key={i} size={130} style={{position: 'absolute', left: interpolate(m, [0, 1], [300 + (i % 4) * 30, 620 + (i % 4) * 30]), top: 820 + Math.floor(i / 4) * 70 - Math.sin(m * Math.PI) * 120}} />
      ))}
      <div style={{position: 'absolute', left: interpolate(m, [0, 1], [320, 640]), top: 640, fontSize: 130, opacity: 1}}>🔑</div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Orange: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(242,138,26,0.25)" />
      {Array.from({length: 8}, (_, i) => {
        const p = spring({frame: f - i * 3, fps: 30, config: {damping: 12}});
        return (
          <svg key={i} width={150} height={150} viewBox="-50 -50 100 100" style={{position: 'absolute', left: 80 + (i % 4) * 240, top: 260 + Math.floor(i / 4) * 160, transform: `scale(${p})`}}>
            <circle r={42} fill={ORANGE} stroke="#1b1b1f" strokeWidth={4} />
            <path d="M0 -42 C6 -54 18 -54 22 -46 C12 -44 6 -44 0 -42Z" fill="#5fae3a" />
          </svg>
        );
      })}
      <div style={{position: 'absolute', left: 440, top: 640}}>
        <Bottle size={620} />
      </div>
      <Title top={1300} size={70} color={ORANGE} opacity={out(f, dur * 0.4, dur * 0.6)}>
        Italy · 1955
      </Title>
    </AbsoluteFill>
  );
};

const Today: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [0, dur * 0.8], [1, 30], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(242,138,26,0.2)" />
      <div style={{position: 'absolute', top: 260, left: 60, right: 60, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center'}}>
        {Array.from({length: 30}, (_, i) => (
          <div key={i} style={{opacity: i < n ? 1 : 0}}>
            <Bottle size={150} color={[ORANGE, '#e8b43a', '#d8456a'][i % 3]} />
          </div>
        ))}
      </div>
      <Title top={1260} size={76} color={ORANGE} opacity={out(f, dur * 0.4, dur * 0.6)}>
        দুনিয়াজুড়ে
      </Title>
    </AbsoluteFill>
  );
};

const Stuck: React.FC<SP> = () => (
  <AbsoluteFill>
    <Office light={0.6} />
    <At x={420} y={1580}>
      <Toon height={860} {...CAST.founder} expression="sad" gesture="shrug" seed="stk" />
    </At>
    <Vignette strength={0.6} />
  </AbsoluteFill>
);

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
      <Plain glow="rgba(242,138,26,0.18)" />
      <div style={{position: 'absolute', left: 470, top: 780, opacity: 0.6}}>
        <Bottle size={380} />
      </div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  fanta: FantaScene,
  germany: Germany,
  keith: KeithScene,
  war: War,
  enemies: Enemies,
  syrup: Syrup,
  missing: Missing,
  danger: Danger,
  decide: Decide,
  leftovers: Leftovers,
  whey: Whey,
  apple: Apple,
  mix: Mix,
  name: NameScene,
  shout: Shout,
  cook: Cook,
  end: End,
  return: Return,
  orange: Orange,
  today: Today,
  stuck: Stuck,
  none: None,
  cta: Cta,
};

export const FantaStoryScene: React.FC<{seg: FSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};
