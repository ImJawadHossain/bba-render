import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, GOLD, GREEN, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {NarratorArt} from '../common/NarratorArt';
import {CAST} from '../common/cast';
import {ToonLook} from '../common/Toon';
import {CtaScene, People, SP, YearScene, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const pintoSegments = raw as Seg[];
export const pintoFallback = makeFallback(pintoSegments);

const EXEC: ToonLook = {...CAST.boss, jacket: '#22303f', tie: '#2b4fa0'};
const ACCT: ToonLook = {...CAST.ceo, jacket: '#2a2a30', glasses: true, tie: '#1a1a1a'};
const JUDGE: ToonLook = {...CAST.exec, jacket: '#15151b', top: '#15151b', glasses: true};
const P_ORANGE = '#d9822b';

// ১৯৭০-এর ছোট গাড়ি (নিজস্ব নকশা)
const Car: React.FC<{size?: number; color?: string; tank?: number; fire?: number}> = ({size = 720, color = P_ORANGE, tank = 0, fire = 0}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 420 180" width={size} height={(size * 180) / 420} style={{overflow: 'visible'}}>
      {fire > 0 ? (
        <g opacity={fire}>
          <circle cx={40} cy={90} r={70 + Math.sin(f) * 5} fill="#ff7a1a" opacity={0.5} />
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${i * 26 - 10} 120 C${i * 26 - 34} ${70 - (i % 2) * 20} ${i * 26 + 4 + Math.sin(f / 2 + i) * 8} ${44 - (i % 3) * 10} ${i * 26 + 10} ${10 - (i % 3) * 14} C${i * 26 + 26} 60 ${i * 26 + 40} 80 ${i * 26 + 30} 120Z`} fill={i % 2 ? '#ffb32a' : '#ff7a1a'} />
          ))}
        </g>
      ) : null}
      <path d="M20 120 C20 96 44 88 70 84 C100 44 210 44 250 84 C310 88 385 100 400 120 L400 145 L20 145Z" fill={color} stroke="#1b1b1f" strokeWidth={5} />
      <path d="M86 84 C108 58 196 58 230 84Z" fill="#9ec4e0" stroke="#1b1b1f" strokeWidth={4} />
      {tank > 0 ? (
        <g opacity={tank}>
          <rect x={22} y={108} width={62} height={34} rx={8} fill={RED} stroke="#fff" strokeWidth={4} />
          <rect x={6} y={112} width={14} height={30} fill="#c9ced3" stroke="#1b1b1f" strokeWidth={3} />
        </g>
      ) : null}
      {[95, 325].map((x) => (
        <g key={x}>
          <circle cx={x} cy={145} r={27} fill="#1a1a1e" stroke="#1b1b1f" strokeWidth={4} />
          <circle cx={x} cy={145} r={11} fill="#b8bcc2" />
        </g>
      ))}
    </svg>
  );
};

// ফাঁস হওয়া হিসাবের কাগজ
const Memo: React.FC<{rows?: number; width?: number}> = ({rows = 4, width = 760}) => (
  <div style={{width, padding: 40, background: '#f2ecd8', color: '#1a1814', fontFamily: '"Courier New", monospace', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', transform: 'rotate(-2deg)'}}>
    <div style={{fontSize: 44, fontWeight: 900, textAlign: 'center'}}>INTERNAL MEMO</div>
    <div style={{borderTop: '3px solid #555', margin: '16px 0'}} />
    {[['Cost to fix', '$137M'], ['Deaths', '180'], ['Value per death', '$200K'], ['Total benefit', '$49.5M']].slice(0, rows).map(([a, b]) => (
      <div key={a} style={{display: 'flex', justifyContent: 'space-between', fontSize: 40, margin: '12px 0', fontWeight: 700}}>
        <span>{a}</span>
        <span>{b}</span>
      </div>
    ))}
  </div>
);

const Road: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #d98a4a 0%, #f2c48a 52%, #3a3a40 53%, #2a2a30 100%)'}} />
      {Array.from({length: 7}, (_, i) => <div key={i} style={{position: 'absolute', left: ((i * 240 - f * 14) % 1400 + 1400) % 1400 - 200, top: 1260, width: 130, height: 16, background: '#f2efe9'}} />)}
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  calc: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: ACCT, x: 820, h: 760, expression: 'serious', gesture: 'pointL'}]}>
        <div style={{position: 'absolute', left: 50, top: 400, opacity: out(f, 3, 12)}}>
          <Memo width={640} />
        </div>
      </People>
    );
  },
  japan: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <YearScene year="1970" dur={dur} bg="sky">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{position: 'absolute', left: interpolate(f, [0, dur], [-500 + i * 340, 40 + i * 340]), top: 1040}}>
            <Car size={340} color={['#c0303a', '#f2efe9', '#4a7a9a'][i]} />
          </div>
        ))}
        <Title top={880} size={70} color="#14202e" opacity={out(f, dur * 0.3, dur * 0.5)}>
          জাপানি ছোট গাড়ি
        </Title>
      </YearScene>
    );
  },
  fast: ({dur}) => {
    const f = useCurrentFrame();
    const d = interpolate(f, [0, dur], [0, 360 * 3]);
    return (
      <People dur={dur} bg="office" actors={[{look: EXEC, x: 300, h: 880, expression: 'serious', gesture: 'pointUp', talking: true}]} title="দ্রুত! সস্তায়!" titleColor={RED} titleAt={0.2}>
        <svg width={320} height={320} viewBox="-60 -60 120 120" style={{position: 'absolute', left: 620, top: 560}}>
          <circle r={54} fill="#f2efe9" stroke="#1b1b1f" strokeWidth={5} />
          <line y2={-44} stroke="#1b1b1f" strokeWidth={4} transform={`rotate(${d})`} />
          <line y2={-28} stroke={RED} strokeWidth={6} transform={`rotate(${d / 4})`} />
        </svg>
      </People>
    );
  },
  pinto: ({dur}) => {
    const f = useCurrentFrame();
    const p = spring({frame: f, fps: 30, config: {damping: 13}});
    return (
      <People dur={dur} bg="plain" actors={[]} title="Pinto" titleColor={P_ORANGE} titleAt={0}>
        <div style={{position: 'absolute', left: 90, top: 620, transform: `scale(${p})`}}>
          <Car size={900} />
        </div>
        <Title top={1120} size={100} color={GREEN} opacity={out(f, dur * 0.4, dur * 0.6)}>
          দাম &lt; $2000
        </Title>
      </People>
    );
  },
  flaw: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#14181e" actors={[{look: CAST.engineer, x: 830, h: 720, expression: 'worried', gesture: 'pointL'}]}>
        <svg width={720} height={460} viewBox="0 0 360 230" style={{position: 'absolute', left: 50, top: 460, opacity: out(f, 2, 12)}}>
          <rect width={360} height={230} fill="#123a6a" />
          <path d="M20 150 L60 110 L290 110 L340 150 L340 190 L20 190Z" fill="none" stroke="#dbeaff" strokeWidth={3} />
          <circle cx={90} cy={192} r={22} fill="none" stroke="#dbeaff" strokeWidth={3} />
          <circle cx={270} cy={192} r={22} fill="none" stroke="#dbeaff" strokeWidth={3} />
          <circle cx={36} cy={165} r={32} fill="none" stroke={RED} strokeWidth={6} opacity={out(f, dur * 0.4, dur * 0.6)} />
        </svg>
      </People>
    );
  },
  tank: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[]} title="ট্যাংক বাম্পারের গায়ে" titleColor={RED} titleAt={0.2}>
        <div style={{position: 'absolute', left: 40, top: 620}}>
          <Car size={1000} tank={out(f, dur * 0.2, dur * 0.4)} />
        </div>
      </People>
    );
  },
  hit: ({dur}) => {
    const f = useCurrentFrame();
    const c = inOut(f, 0, dur * 0.35);
    const fire = out(f, dur * 0.4, dur * 0.7);
    return (
      <AbsoluteFill>
        <Road />
        <div style={{position: 'absolute', left: interpolate(c, [0, 1], [-500, 40]), top: 1010, transform: 'scaleX(-1)'}}>
          <Car size={460} color="#5a6066" />
        </div>
        <div style={{position: 'absolute', left: 500, top: 940, transform: `translateX(${c >= 1 ? Math.sin(f * 2) * 5 : 0}px)`}}>
          <Car size={560} fire={fire} />
        </div>
        <AbsoluteFill style={{background: `rgba(255,120,30,${0.2 * fire})`}} />
        <Vignette strength={0.5} />
      </AbsoluteFill>
    );
  },
  own: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#1c2026" actors={[{look: CAST.engineer, x: 830, h: 720, expression: 'shocked'}]}>
        <div style={{position: 'absolute', left: 30, top: 760}}>
          <Car size={620} tank={1} />
        </div>
        <div style={{position: 'absolute', left: 90, top: 500, padding: '12px 30px', border: `10px solid ${RED}`, color: RED, fontFamily: 'Arial Black, Arial', fontSize: 90, transform: 'rotate(-6deg)', opacity: out(f, dur * 0.3, dur * 0.5)}}>TEST: FAIL</div>
      </People>
    );
  },
  memo: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: EXEC, x: 240, h: 700, expression: 'serious'}, {look: ACCT, x: 840, h: 700, expression: 'thinking', gesture: 'think'}]}>
        <div style={{position: 'absolute', left: 200, top: 300, opacity: out(f, 2, 12)}}>
          <Memo width={680} rows={2} />
        </div>
      </People>
    );
  },
  scale: ({dur}) => {
    const f = useCurrentFrame();
    const t = inOut(f, dur * 0.2, dur * 0.7) * 16;
    return (
      <AbsoluteFill>
        <People dur={dur} bg="plain" actors={[]} />
        <svg width={1080} height={900} viewBox="0 0 1080 900" style={{position: 'absolute', top: 320}}>
          <rect x={530} y={200} width={20} height={560} fill="#888" />
          <path d="M430 760 L650 760 L600 720 L480 720Z" fill="#666" />
          <g transform={`rotate(${-t} 540 200)`}>
            <rect x={140} y={190} width={800} height={20} rx={8} fill="#aaa" />
            <g transform={`translate(210 340) rotate(${t})`}>
              <path d="M-130 0 L130 0 L100 50 L-100 50Z" fill={RED} />
              <text y={-30} textAnchor="middle" fontSize={64} fontWeight={900} fill="#fff" fontFamily="Arial Black, Arial">$137M</text>
              <text y={110} textAnchor="middle" fontSize={46} fontWeight={800} fill={RED}>ঠিক করার খরচ</text>
            </g>
            <g transform={`translate(870 340) rotate(${t})`}>
              <path d="M-130 0 L130 0 L100 50 L-100 50Z" fill={GREEN} />
              <text y={-30} textAnchor="middle" fontSize={64} fontWeight={900} fill="#fff" fontFamily="Arial Black, Arial">$49.5M</text>
              <text y={110} textAnchor="middle" fontSize={46} fontWeight={800} fill={GREEN}>মানুষের জীবন</text>
            </g>
          </g>
        </svg>
      </AbsoluteFill>
    );
  },
  road: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <Road />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{position: 'absolute', left: interpolate(f, [0, dur], [1200 - i * 420, 500 - i * 420]), top: 980}}>
            <Car size={400} color={[P_ORANGE, '#c9b24a', '#4a7a5a'][i]} />
          </div>
        ))}
      </AbsoluteFill>
    );
  },
  y1972: ({dur}) => (
    <YearScene year="1972" sub="Lily Gray · Richard Grimshaw (১৩)" dur={dur} bg="linear-gradient(180deg, #d98a4a 0%, #f2c48a 52%, #3a3a40 53%, #2a2a30 100%)" color="#fff">
      <div style={{position: 'absolute', left: 190, top: 1130}}>
        <Car size={700} />
      </div>
    </YearScene>
  ),
  crash: ({dur}) => {
    const f = useCurrentFrame();
    const glow = out(f, dur * 0.2, dur * 0.5);
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: '#0a0604'}} />
        <div style={{position: 'absolute', left: 240, top: 800, filter: 'brightness(0.55)'}}>
          <Car size={760} fire={glow} />
        </div>
        <AbsoluteFill style={{background: `radial-gradient(ellipse 500px 400px at 400px 900px, rgba(255,120,30,${0.4 * glow}), rgba(0,0,0,0) 70%)`}} />
      </AbsoluteFill>
    );
  },
  died: ({dur}) => {
    const f = useCurrentFrame();
    const candle = (x: number, label: string, delay: number) => (
      <div style={{position: 'absolute', left: x, top: 660, width: 300, textAlign: 'center', opacity: out(f, dur * delay, dur * delay + 10)}}>
        <svg width={120} height={320} viewBox="0 0 120 320">
          <ellipse cx={60} cy={40 + Math.sin(f / 4) * 3} rx={18} ry={34} fill="#ffc861" />
          <rect x={38} y={80} width={44} height={230} rx={6} fill="#f2efe9" />
        </svg>
        <div style={{marginTop: 20, fontSize: 56, fontWeight: 800, color: '#e8e2d4'}}>{label}</div>
      </div>
    );
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #17130f, #050404)'}} />
        <AbsoluteFill style={{background: 'radial-gradient(ellipse 600px 500px at 540px 800px, rgba(255,200,97,0.14), rgba(0,0,0,0) 70%)'}} />
        {candle(170, 'Lily', 0)}
        {candle(610, 'Richard', 0.4)}
      </AbsoluteFill>
    );
  },
  court: ({dur, id}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="#2a1e14" actors={[{look: JUDGE, x: 540, y: 1280, h: 680, expression: 'serious'}]} title={id === 'record' ? 'তখনকার রেকর্ড' : 'আদালত'} titleAt={0}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 1040, height: 420, zIndex: 2, background: 'linear-gradient(180deg, #6a4026, #3a2414)'}} />
        <div style={{position: 'absolute', left: 280, top: 400, opacity: out(f, dur * 0.3, dur * 0.5), transform: 'scale(0.75)', transformOrigin: '0 0'}}>
          {id === 'record' ? null : <Memo width={700} rows={2} />}
        </div>
      </People>
    );
  },
  recall: ({dur}) => {
    const f = useCurrentFrame();
    const n = Math.floor(interpolate(f, [0, dur * 0.8], [1, 30], clampOpts));
    return (
      <People dur={dur} bg="plain" actors={[]} title="১৫ লাখ গাড়ি ফেরত" titleColor={RED} titleAt={0}>
        <div style={{position: 'absolute', left: 40, right: 40, top: 360, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center'}}>
          {Array.from({length: 30}, (_, i) => (
            <div key={i} style={{opacity: i < n ? 1 : 0.06}}>
              <Car size={180} />
            </div>
          ))}
        </div>
      </People>
    );
  },
  nameword: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill style={{background: '#000'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center', fontFamily: 'Arial Black, Arial', fontSize: 210, color: P_ORANGE}}>PINTO</div>
        <Title top={900} size={120} color={RED} opacity={out(f, dur * 0.4, dur * 0.6)}>
          = লোভ
        </Title>
      </AbsoluteFill>
    );
  },
  cta: () => (
    <CtaScene>
      <Car size={600} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const PintoThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 35% 55%, rgba(255,120,30,0.3), #0b0d12 70%)'}} />
    <div style={{position: 'absolute', left: 60, top: 980}}>
      <Car size={700} fire={1} />
    </div>
    <div style={{position: 'absolute', left: 90, top: 660, transform: 'rotate(-8deg)', padding: '10px 36px', background: GOLD, color: '#1a1408', fontFamily: 'Arial Black, Arial', fontSize: 120}}>$11</div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={960} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={94}>একটা জীবনের দাম</ThumbText>
      <div>
        <ThumbText size={106} bg={RED}>
          মাত্র ২ লাখ ডলার!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>Ford-এর ফাঁস হওয়া হিসাব</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1972
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const PintoVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={pintoSegments} folder="pinto/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<PintoThumbnail />} />
);

