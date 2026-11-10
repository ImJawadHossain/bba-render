import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, GOLD, PriceTag, RED, Title, inOut, out} from '../biz/art';
import {NarratorArt} from '../common/NarratorArt';
import {ToonLook} from '../common/Toon';
import {CAST} from '../common/cast';
import {CtaScene, NameCard, People, QuoteScene, SP, YearScene, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const lamboSegments = raw as Seg[];
export const lamboFallback = makeFallback(lamboSegments);

const FERRUCCIO: ToonLook = {skin: '#dcaa88', hair: '#2a1e14', hairStyle: 'side', top: '#f4f2ec', jacket: '#3a3a40', bottom: '#22252c', mustache: true};
const FERRUCCIO_WORK: ToonLook = {...FERRUCCIO, jacket: undefined, top: '#4a5a6a', bottom: '#2a2c30'};
const ENZO: ToonLook = {skin: '#e2b391', hair: '#c9c2b4', hairStyle: 'side', top: '#f4f2ec', jacket: '#1a1c22', tie: '#1a1a1a', bottom: '#1a1c22', glasses: true, glassesShape: 'rect'};
const F_RED = '#c8102e';
const L_YEL = '#f2b705';

// ---------- উপাদান (নিজস্ব নকশা) ----------
const Tractor: React.FC<{size?: number; color?: string}> = ({size = 500, color = '#d9822b'}) => (
  <svg viewBox="0 0 300 200" width={size} height={size * 0.67}>
    <rect x={60} y={60} width={130} height={70} rx={8} fill={color} stroke="#1b1b1f" strokeWidth={5} />
    <rect x={150} y={20} width={60} height={60} fill="none" stroke="#1b1b1f" strokeWidth={6} />
    <rect x={180} y={80} width={90} height={50} rx={6} fill={color} stroke="#1b1b1f" strokeWidth={5} />
    <rect x={90} y={30} width={10} height={32} fill="#3a3a40" />
    <circle cx={90} cy={150} r={46} fill="#2a2a30" stroke="#1b1b1f" strokeWidth={5} />
    <circle cx={90} cy={150} r={18} fill="#8a8a90" />
    <circle cx={240} cy={160} r={30} fill="#2a2a30" stroke="#1b1b1f" strokeWidth={5} />
    <circle cx={240} cy={160} r={11} fill="#8a8a90" />
  </svg>
);

const Car: React.FC<{size?: number; color?: string; low?: boolean; hood?: number}> = ({size = 600, color = F_RED, low, hood = 0}) => (
  <svg viewBox="0 0 400 160" width={size} height={size * 0.4} style={{overflow: 'visible'}}>
    <path d={low ? 'M20 110 C30 80 100 70 150 66 C190 40 260 40 300 70 C350 74 385 86 390 110 L390 125 L20 125Z' : 'M20 110 C30 84 90 76 130 72 C160 44 250 44 280 72 C340 76 382 88 388 110 L388 125 L20 125Z'} fill={color} stroke="#1b1b1f" strokeWidth={5} />
    <path d={low ? 'M165 68 C195 50 255 50 285 70Z' : 'M145 72 C170 54 245 54 268 72Z'} fill="#9ec4e0" stroke="#1b1b1f" strokeWidth={4} />
    {hood > 0 ? <path d={`M300 72 L${390} 108 L${300 + 40 * hood} ${72 - 70 * hood}Z`} fill={color} stroke="#1b1b1f" strokeWidth={4} /> : null}
    {[95, 320].map((x) => (
      <g key={x}>
        <circle cx={x} cy={125} r={28} fill="#1a1a1e" stroke="#1b1b1f" strokeWidth={4} />
        <circle cx={x} cy={125} r={12} fill="#b8bcc2" />
      </g>
    ))}
  </svg>
);

const Clutch: React.FC<{size?: number; label?: string}> = ({size = 260, label}) => {
  const f = useCurrentFrame();
  return (
    <div style={{textAlign: 'center'}}>
      <svg viewBox="-60 -60 120 120" width={size} height={size} style={{transform: `rotate(${f * 2}deg)`}}>
        <circle r={56} fill="#6a6e76" stroke="#1b1b1f" strokeWidth={4} />
        <circle r={40} fill="#8a6a4a" stroke="#1b1b1f" strokeWidth={3} />
        <circle r={14} fill="#2a2a30" />
        {Array.from({length: 6}, (_, i) => <rect key={i} x={-4} y={-38} width={8} height={18} fill="#2a2a30" transform={`rotate(${i * 60})`} />)}
      </svg>
      {label ? <div style={{fontSize: 46, fontWeight: 800, marginTop: 10}}>{label}</div> : null}
    </div>
  );
};

const Shield: React.FC<{size?: number; color: string; animal: 'bull' | 'horse'}> = ({size = 300, color, animal}) => (
  <svg viewBox="0 0 100 120" width={size} height={size * 1.2}>
    <path d="M10 10 L90 10 L90 70 C90 95 70 110 50 116 C30 110 10 95 10 70Z" fill={color} stroke="#1b1b1f" strokeWidth={4} />
    {animal === 'bull' ? (
      <path d="M26 56 C26 44 36 40 46 44 L54 44 C64 40 74 44 74 56 C78 52 82 46 80 38 C86 46 84 56 76 62 L74 76 L66 76 L64 68 L36 68 L34 76 L26 76 L24 62 C16 56 14 46 20 38 C18 46 22 52 26 56Z" fill="#1b1b1f" />
    ) : (
      <path d="M40 90 L44 66 L34 54 L40 34 L54 24 L58 34 L66 36 L62 44 L66 60 L60 90 L54 90 L56 64 L48 64 L46 90Z" fill="#1b1b1f" />
    )}
  </svg>
);

// ---------- দৃশ্য ----------
const SCENES: Record<string, React.FC<SP>> = {
  insult: ({dur}) => (
    <People dur={dur} actors={[{look: ENZO, x: 300, expression: 'skeptical', gesture: 'pointR'}, {look: FERRUCCIO, x: 790, expression: 'shocked'}]} bubble='"ট্র্যাক্টর নিয়েই থাকো!"' bubbleX={60} bubbleY={300} />
  ),
  farmer: ({dur}) => (
    <People bg="sky" dur={dur} actors={[{look: FERRUCCIO_WORK, x: 540, h: 940, expression: 'smile'}]}>
      <NameCard name="Ferruccio Lamborghini" sub="কৃষকের ছেলে · ইতালি" />
    </People>
  ),
  scrap: ({dur}) => {
    const f = useCurrentFrame();
    const p = spring({frame: f - dur * 0.4, fps: 30, config: {damping: 12}});
    return (
      <People bg="sepia" dur={dur} actors={[{look: FERRUCCIO_WORK, x: 250, h: 760, expression: 'thinking', gesture: 'think'}]} title="ভাঙারি থেকে ট্র্যাক্টর" titleAt={0.5}>
        <div style={{position: 'absolute', left: 430, top: 700, opacity: 1 - p}}>
          <svg width={500} height={300} viewBox="0 0 500 300">
            {[[60, 200, 120, 60], [200, 160, 90, 90], [320, 210, 140, 50], [120, 120, 70, 70]].map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} fill={['#5a5a40', '#6a6050', '#4a4a3a', '#7a6a50'][i]} stroke="#1b1b1f" strokeWidth={5} transform={`rotate(${i * 12 - 10} ${x} ${y})`} />)}
          </svg>
        </div>
        <div style={{position: 'absolute', left: 430, top: 760, transform: `scale(${p})`}}>
          <Tractor size={520} />
        </div>
      </People>
    );
  },
  garage: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People bg="office" dur={dur} actors={[{look: FERRUCCIO, x: 540, h: 820, expression: 'smile', gesture: 'open'}]}>
        {[F_RED, '#2b4fa0', F_RED, '#e8e4dc'].map((c, i) => (
          <div key={i} style={{position: 'absolute', left: 60 + (i % 2) * 500, top: 330 + Math.floor(i / 2) * 230, opacity: out(f, i * 6, i * 6 + 10)}}>
            <Car size={460} color={c} />
          </div>
        ))}
      </People>
    );
  },
  clutch: ({dur}) => {
    const f = useCurrentFrame();
    const smoke = out(f, dur * 0.3, dur * 0.6);
    return (
      <People bg="dark" dur={dur} actors={[{look: FERRUCCIO, x: 830, h: 760, expression: 'worried', gesture: 'shrug'}]} title="আবার নষ্ট!" titleColor={RED} titleAt={0.4}>
        <div style={{position: 'absolute', left: 60, top: 760}}>
          <Car size={620} color={F_RED} />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{position: 'absolute', left: 200 + i * 90, top: 700 - smoke * 160 - i * 30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(180,180,190,0.5)', opacity: smoke}} />
        ))}
      </People>
    );
  },
  open: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People bg="sepia" dur={dur} actors={[{look: FERRUCCIO_WORK, x: 860, h: 780, expression: 'serious', gesture: 'pointL'}]}>
        <div style={{position: 'absolute', left: 40, top: 820}}>
          <Car size={640} color={F_RED} hood={inOut(f, 0, dur * 0.5)} />
        </div>
      </People>
    );
  },
  same: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <People bg="dark" dur={dur} actors={[]} title="একই জিনিস!" titleColor={L_YEL} titleAt={0.5} />
        <div style={{position: 'absolute', left: 100, top: 520}}>
          <Car size={360} color={F_RED} />
          <div style={{marginTop: 30}}>
            <Clutch size={260} label="Ferrari" />
          </div>
        </div>
        <div style={{position: 'absolute', right: 100, top: 470}}>
          <Tractor size={360} />
          <div style={{marginTop: 30}}>
            <Clutch size={260} label="ট্র্যাক্টর" />
          </div>
        </div>
        <Title top={760} size={120} color={L_YEL} opacity={out(f, dur * 0.3, dur * 0.45)}>
          =
        </Title>
      </AbsoluteFill>
    );
  },
  went: ({dur}) => {
    const f = useCurrentFrame();
    const w = inOut(f, 0, dur * 0.8);
    return (
      <People bg="office" dur={dur} actors={[{look: FERRUCCIO, x: interpolate(w, [0, 1], [-200, 300]), h: 860, expression: 'serious'}]}>
        <NameCard name="Enzo Ferrari" sub="Maranello" color={F_RED} right top={300} />
        <div style={{position: 'absolute', right: 80, top: 480}}>
          <Shield size={220} color={L_YEL} animal="horse" />
        </div>
      </People>
    );
  },
  wait: ({dur}) => {
    const f = useCurrentFrame();
    const clock = f * 6;
    return (
      <People bg="office" dur={dur} actors={[{look: FERRUCCIO, x: 300, h: 820, expression: 'worried'}, {look: ENZO, x: 800, h: 860, expression: 'skeptical'}]}>
        <svg width={200} height={200} viewBox="-50 -50 100 100" style={{position: 'absolute', left: 440, top: 330}}>
          <circle r={46} fill="#f2efe9" stroke="#1b1b1f" strokeWidth={4} />
          <line x1={0} y1={0} x2={0} y2={-34} stroke="#1b1b1f" strokeWidth={4} transform={`rotate(${clock})`} />
          <line x1={0} y1={0} x2={0} y2={-22} stroke="#1b1b1f" strokeWidth={6} transform={`rotate(${clock / 12})`} />
        </svg>
      </People>
    );
  },
  quote: ({dur}) => <QuoteScene dur={dur} quote='"তুমি ট্র্যাক্টর চালাও। ট্র্যাক্টর নিয়েই থাকো। Ferrari চালানোর যোগ্যতা তোমার নেই।"' who="Enzo Ferrari" look={ENZO} expression="skeptical" gesture="pointR" color={F_RED} />,
  silent: ({dur}) => <People bg="night" dur={dur} actors={[{look: FERRUCCIO, x: 540, h: 960, expression: 'serious', gesture: 'think'}]} title="প্রতিজ্ঞা" titleAt={0.6} />,
  found: ({dur}) => (
    <YearScene year="1963" sub="Automobili Lamborghini" dur={dur} color={L_YEL}>
      <div style={{position: 'absolute', left: 390, top: 1080}}>
        <Shield size={300} color={L_YEL} animal="bull" />
      </div>
    </YearScene>
  ),
  miura: ({dur}) => {
    const f = useCurrentFrame();
    const x = inOut(f, 0, dur * 0.6);
    return (
      <People bg="dark" dur={dur} actors={[]} title="Miura · 1966" titleColor={L_YEL} titleAt={0.2}>
        <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 55%, rgba(242,183,5,${0.25 * x}), rgba(0,0,0,0) 60%)`}} />
        <div style={{position: 'absolute', left: interpolate(x, [0, 1], [-900, 40]), top: 760}}>
          <Car size={1000} color="#e8a01a" low />
        </div>
        <Title top={1200} size={70} opacity={out(f, dur * 0.5, dur * 0.7)}>
          প্রথম আসল সুপারকার
        </Title>
      </People>
    );
  },
  quiet: ({dur}) => <People bg="office" dur={dur} actors={[{look: ENZO, x: 300, expression: 'shocked'}, {look: CAST.ceo, x: 560, h: 780, expression: 'surprised'}, {look: CAST.boss, x: 820, h: 800, expression: 'worried'}]} title="চুপ!" titleAt={0.4} />,
  bull: ({dur}) => {
    const f = useCurrentFrame();
    const p = spring({frame: f, fps: 30, config: {damping: 12}});
    return (
      <AbsoluteFill>
        <People bg="dark" dur={dur} actors={[]} />
        <div style={{position: 'absolute', left: 90, top: 520, transform: `scale(${p})`}}>
          <Shield size={360} color={L_YEL} animal="bull" />
        </div>
        <div style={{position: 'absolute', right: 110, top: 600, transform: `scale(${0.8 * p})`, opacity: 0.8}}>
          <Shield size={320} color={L_YEL} animal="horse" />
        </div>
        <Title top={1100} size={110} color={RED} opacity={out(f, dur * 0.4, dur * 0.6)}>
          ষাঁড় vs ঘোড়া
        </Title>
      </AbsoluteFill>
    );
  },
  cta: () => (
    <CtaScene glow="rgba(242,183,5,0.16)">
      <Car size={600} color="#e8a01a" low />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const LamboThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 40% 55%, rgba(242,183,5,0.3), #0b0d12 70%)'}} />
    <div style={{position: 'absolute', left: -60, top: 760}}>
      <Car size={900} color="#e8a01a" low />
    </div>
    <div style={{position: 'absolute', left: 60, top: 1080}}>
      <Tractor size={360} />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={940} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={96}>একটা অপমান থেকে</ThumbText>
      <div>
        <ThumbText size={104} bg={RED}>
          Lamborghini!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>"ট্র্যাক্টর নিয়েই থাকো"</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          সত্য ঘটনা · 1963
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const LamboVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={lamboSegments} folder="lambo/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<LamboThumbnail />} />
);

export {PriceTag};
