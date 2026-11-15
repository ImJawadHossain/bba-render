import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Story, StoryProps, fontFamily} from '../common/Story';
import {makeFallback} from '../common/meta';
import {ThumbText} from '../Thumbnail';
import {BG, Bar, GOLD, GREEN, Phone, RED, Title, clampOpts, out} from '../biz/art';
import {Bubble} from '../milgram/art';
import {NarratorArt} from '../common/NarratorArt';
import {CAST} from '../common/cast';
import {Toon, ToonLook} from '../common/Toon';
import {At, Backdrop, CtaScene, NameCard, People, SP, pick} from '../common/kit';
import raw from './segments.json';

type Seg = {id: string; text: string; visual: string};
export const spotlightSegments = raw as Seg[];
export const spotlightFallback = makeFallback(spotlightSegments);

// টি-শার্টের গায়ক: নিজস্ব কার্টুন, কোনো বাস্তব মানুষের মুখ না
const SingerFace: React.FC = () => (
  <g>
    <path d="M-52 6 C-66 -50 -30 -66 0 -66 C30 -66 66 -50 52 6 C60 30 46 44 34 40 L-34 40 C-46 44 -60 30 -52 6Z" fill="#b5541c" stroke="#1b1b1f" strokeWidth={4} />
    <ellipse cx={0} cy={2} rx={36} ry={42} fill="#f0c4a0" stroke="#1b1b1f" strokeWidth={4} />
    <circle cx={-14} cy={-8} r={11} fill="#fff" stroke="#1b1b1f" strokeWidth={3} />
    <circle cx={14} cy={-8} r={11} fill="#fff" stroke="#1b1b1f" strokeWidth={3} />
    <circle cx={-12} cy={-7} r={4} fill="#1b1b1f" />
    <circle cx={16} cy={-7} r={4} fill="#1b1b1f" />
    <path d="M0 -2 C-8 12 -6 16 2 16" fill="none" stroke="#1b1b1f" strokeWidth={3} />
    <path d="M-20 22 C-10 38 10 38 20 22Z" fill="#fff" stroke="#1b1b1f" strokeWidth={3} />
  </g>
);

const BigShirt: React.FC<{size?: number; wiggle?: number}> = ({size = 600, wiggle = 0}) => (
  <svg viewBox="0 0 600 640" width={size} height={(size * 640) / 600} style={{overflow: 'visible', filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.5))'}}>
    <path d="M180 40 C230 80 370 80 420 40 L590 140 L520 270 L460 235 L460 620 L140 620 L140 235 L80 270 L10 140Z" fill="#f2d23c" stroke="#1b1b1f" strokeWidth={8} strokeLinejoin="round" />
    <path d="M180 40 C230 95 370 95 420 40" fill="none" stroke="#1b1b1f" strokeWidth={8} />
    <g transform={`translate(300 340) scale(2.5) rotate(${wiggle})`}>
      <SingerFace />
    </g>
  </svg>
);

const YOU: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#3a6ea5', bottom: '#2a2c30', shoes: '#e8e4dc'};
const GILO: ToonLook = {skin: '#efc6a6', hair: '#6a5a4a', hairStyle: 'receding', top: '#f4f2ec', jacket: '#3a3230', bottom: '#1c1e24', glasses: true, age: 0.5};
const STUDENT: ToonLook = {
  skin: '#e8b994',
  hair: '#5a3a22',
  hairStyle: 'curly',
  top: '#f2d23c',
  bottom: '#2a2c30',
  shoes: '#e8e4dc',
  chest: (
    <g transform="translate(200 450) scale(1.1)">
      <SingerFace />
    </g>
  ),
};
const STAINED: ToonLook = {
  ...YOU,
  top: '#eef0f2',
  chest: <path d="M200 440 C232 432 248 462 236 482 C252 506 222 524 204 510 C186 526 158 508 170 484 C154 460 176 432 200 440Z" fill="#7a4a1e" />,
};

const Eye: React.FC<{x: number; y: number; size: number; delay?: number; fade?: number; tx?: number; ty?: number}> = ({x, y, size, delay = 0, fade = 1, tx = 540, ty = 950}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - delay, fps: 30, config: {damping: 11}});
  const a = Math.atan2(ty - y, tx - x);
  const blink = (f + delay * 7) % 70 < 4 ? 0.1 : 1;
  return (
    <svg viewBox="-60 -36 120 72" width={size} height={size * 0.6} style={{position: 'absolute', left: x - size / 2, top: y - size * 0.3, transform: `scale(${pop})`, opacity: fade, overflow: 'visible'}}>
      <g transform={`scale(1 ${blink})`}>
        <path d="M-56 0 C-30 -40 30 -40 56 0 C30 40 -30 40 -56 0Z" fill="#f2efe9" stroke="#1b1b1f" strokeWidth={5} />
        <circle cx={Math.cos(a) * 16} cy={Math.sin(a) * 12} r={17} fill="#1b1b1f" />
        <circle cx={Math.cos(a) * 16 + 5} cy={Math.sin(a) * 12 - 6} r={5} fill="#fff" />
      </g>
    </svg>
  );
};
const EYES: [number, number][] = [
  [130, 480], [340, 400], [760, 400], [950, 500], [110, 760], [970, 790],
  [150, 1050], [940, 1080], [120, 1350], [960, 1370], [290, 620], [800, 640],
];

const Stamp: React.FC<{text: string; o: number; top?: number; size?: number}> = ({text, o, top = 400, size = 170}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top, textAlign: 'center', zIndex: 3}}>
    <span style={{display: 'inline-block', padding: '10px 50px', border: `12px solid ${RED}`, color: RED, fontSize: size, fontWeight: 900, background: 'rgba(0,0,0,0.72)', transform: `rotate(-8deg) scale(${2.2 - 1.2 * o})`, opacity: o}}>{text}</span>
  </div>
);

// ওপর থেকে আলো
const Beam: React.FC<{x: number; w?: number; top?: number; bottom?: number; o?: number}> = ({x, w = 300, top = 0, bottom = 1640, o = 1}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: o}}>
    <defs>
      <linearGradient id={`beam${x}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff3c4" stopOpacity={0.7} />
        <stop offset="1" stopColor="#fff3c4" stopOpacity={0.12} />
      </linearGradient>
    </defs>
    <polygon points={`${x - 50},${top} ${x + 50},${top} ${x + w},${bottom} ${x - w},${bottom}`} fill={`url(#beam${x})`} />
    <ellipse cx={x} cy={bottom} rx={w} ry={46} fill="#fff3c4" opacity={0.3} />
  </svg>
);

const FilmCam: React.FC<{size?: number}> = ({size = 300}) => (
  <svg viewBox="0 0 200 150" width={size} height={size * 0.75}>
    <circle cx={60} cy={34} r={30} fill="#3a3e48" stroke="#1b1b1f" strokeWidth={5} />
    <circle cx={122} cy={34} r={30} fill="#3a3e48" stroke="#1b1b1f" strokeWidth={5} />
    <rect x={24} y={62} width={126} height={78} rx={10} fill="#22252c" stroke="#1b1b1f" strokeWidth={5} />
    <path d="M150 84 L194 64 L194 138 L150 118Z" fill="#4a4e58" stroke="#1b1b1f" strokeWidth={5} />
    <circle cx={46} cy={82} r={7} fill={RED} />
  </svg>
);

const Mirror: React.FC = () => (
  <g transform="scale(1.1)">
    <rect x={-8} y={0} width={16} height={70} fill="#6a4a34" stroke="#1b1b1f" strokeWidth={4} />
    <circle cx={0} cy={-40} r={46} fill="#bfe0ee" stroke="#6a4a34" strokeWidth={10} />
  </g>
);

const SmallPhone: React.FC = () => <rect x={-26} y={-60} width={52} height={96} rx={8} fill="#15171d" stroke="#4a4a50" strokeWidth={5} />;

const LOOKS = [CAST.customer, CAST.customer2, CAST.founder, CAST.pro, CAST.worker, CAST.exec];
const SEATS = [
  {y: 760, h: 470, xs: [190, 450, 710, 930]},
  {y: 1080, h: 590, xs: [120, 410, 680, 960]},
  {y: 1470, h: 760, xs: [230, 540, 850]},
];

// ক্লাসঘর: সারি সারি ছাত্র, সামনে বেঞ্চ
const ClassRoom: React.FC<{lookX?: number; hands?: number[]; left?: number; widthK?: number}> = ({lookX = 0, hands = [], left = 0, widthK = 1}) => {
  const f = useCurrentFrame();
  let n = -1;
  return (
    <>
      {SEATS.map((row, r) => (
        <React.Fragment key={r}>
          {row.xs.map((x) => {
            n += 1;
            const up = hands.includes(n);
            return (
              <At key={x} x={left + x * widthK} y={row.y + row.h * 0.5}>
                <Toon height={row.h} {...LOOKS[n % LOOKS.length]} lookX={lookX} expression={up ? 'smile' : 'neutral'} gesture={up ? 'wave' : 'idle'} seed={`c${n}`} style={{transform: `translateY(${Math.sin((f + n * 11) / 22) * 2}px)`}} />
              </At>
            );
          })}
          <div style={{position: 'absolute', left: left, right: 0, top: row.y - 8, height: 46, background: '#6a4a34', borderTop: '6px solid #1b1b1f', borderBottom: '6px solid #1b1b1f'}} />
          <div style={{position: 'absolute', left: left, right: 0, top: row.y + 38, height: r === 2 ? 500 : row.h * 0.62, background: '#3a2a20'}} />
        </React.Fragment>
      ))}
    </>
  );
};

const Hall: React.FC = () => (
  <>
    <Backdrop bg="linear-gradient(180deg, #39424e, #1a1f27)" />
    <div style={{position: 'absolute', left: 0, right: 0, top: 1460, bottom: 0, background: '#23262c'}} />
    <div style={{position: 'absolute', left: 620, top: 640, width: 360, height: 820, background: '#6a4a34', border: '10px solid #1b1b1f'}}>
      <div style={{position: 'absolute', left: 70, right: 70, top: 70, height: 200, background: '#bfd6e2', border: '6px solid #1b1b1f'}} />
      <div style={{position: 'absolute', left: 24, top: 420, width: 40, height: 40, borderRadius: '50%', background: GOLD, border: '5px solid #1b1b1f'}} />
    </div>
  </>
);

// ২০ জনের ভিড়: কতজন খেয়াল করল
const Crowd: React.FC<{n: number; color: string; title: string; big: string; dur: number}> = ({n, color, title, big, dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.25, fps: 30, config: {damping: 11}});
  return (
    <People dur={dur} bg="plain" actors={[]} title={title} titleColor={color} titleAt={0}>
      <div style={{position: 'absolute', left: 110, right: 110, top: 380, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 30, justifyItems: 'center'}}>
        {Array.from({length: 20}, (_, i) => {
          const c = i < n ? color : '#3a3e48';
          return (
            <svg key={i} viewBox="0 0 40 60" width={118} height={177}>
              <circle cx={20} cy={12} r={10} fill={c} />
              <path d="M4 58 C4 34 8 26 20 26 C32 26 36 34 36 58Z" fill={c} />
            </svg>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1240, textAlign: 'center', fontSize: 260, fontWeight: 900, color, transform: `scale(${pop})`, textShadow: '0 10px 40px rgba(0,0,0,0.6)'}}>{big}</div>
    </People>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  eyes: ({dur}) => {
    const f = useCurrentFrame();
    const stamp = out(f, dur * 0.62, dur * 0.72);
    return (
      <AbsoluteFill>
        <Backdrop bg="radial-gradient(ellipse at 50% 55%, #2a2d38, #07080c 75%)" />
        <At x={540} y={1650}>
          <Toon height={1000} {...YOU} expression="worried" gesture="idle" seed="y1" />
        </At>
        {EYES.map(([x, y], i) => <Eye key={i} x={x} y={y} size={190} delay={i * 2} fade={1 - stamp * 0.75} />)}
        <Title top={190} size={92} opacity={out(f, 0, 8)}>"লোকে কী বলবে?"</Title>
        <Stamp text="মিথ্যা" o={stamp} />
        <Vignette strength={0.5} />
      </AbsoluteFill>
    );
  },
  tshirt: ({dur}) => {
    const f = useCurrentFrame();
    const pop = spring({frame: f, fps: 30, config: {damping: 9}});
    return (
      <People dur={dur} bg="plain" actors={[]} title="একটা হাস্যকর টি-শার্ট" titleColor={GOLD} titleAt={0.15}>
        <div style={{position: 'absolute', left: 90, top: interpolate(pop, [0, 1], [-800, 480]), transform: `rotate(${Math.sin(f / 7) * 4}deg)`}}>
          <BigShirt size={900} wiggle={Math.sin(f / 4) * 7} />
        </div>
      </People>
    );
  },
  meet: ({dur}) => (
    <People
      dur={dur}
      bg="office"
      actors={[
        {look: CAST.boss, x: 170, h: 760, y: 1500, expression: 'skeptical', lookX: 1},
        {look: CAST.exec, x: 910, h: 760, y: 1500, expression: 'neutral', lookX: -1},
        {look: YOU, x: 540, h: 1050, y: 1720, expression: 'worried', gesture: 'open', talking: true},
      ]}
      bubble='"আ... মানে... আ..."'
      bubbleX={200}
      bubbleY={330}
      bubbleTail="down"
    />
  ),
  wname: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: YOU, x: 260, h: 960, expression: 'smile', gesture: 'wave', talking: true, lookX: 1}, {look: CAST.worker, x: 800, h: 960, expression: 'skeptical', lookX: -1}]} bubble='"রহিম ভাই!"' bubbleX={80} bubbleY={330} bubbleTail="down">
        <div style={{position: 'absolute', left: 560, right: 40, top: 480, opacity: out(f, dur * 0.5, dur * 0.65), zIndex: 2}}>
          <Bubble size={54} tail="down" color="#f6d8d8">
            "আমি করিম।"
          </Bubble>
        </div>
      </People>
    );
  },
  stain: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: STAINED, x: 540, h: 1250, y: 1700, expression: 'neutral'}]} title="সারাদিন!" titleColor={RED} titleAt={0.45}>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 3}}>
          <circle cx={540} cy={1118} r={120 + Math.sin(f / 3) * 14} fill="none" stroke={RED} strokeWidth={12} opacity={out(f, 4, 12)} />
        </svg>
      </People>
    );
  },
  night: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <Backdrop bg="night" />
        <div style={{position: 'absolute', left: 660, top: 200, width: 300, height: 340, background: '#0c1a34', border: '12px solid #2a3244'}}>
          <div style={{position: 'absolute', left: 120, top: 60, width: 90, height: 90, borderRadius: '50%', background: '#f2e8c4'}} />
        </div>
        <div style={{position: 'absolute', left: 170, top: 1170, width: 360, height: 200, borderRadius: 50, background: '#d8dce4', border: '6px solid #1b1b1f'}} />
        <div style={{position: 'absolute', left: 540 - 165, top: 1270 - 460, transform: 'rotate(-90deg)'}}>
          <Toon height={920} {...YOU} expression="worried" lookX={-0.2} seed="sleep" />
        </div>
        <div style={{position: 'absolute', left: 480, top: 1190, width: 600, height: 250, borderRadius: '50px 0 0 30px', background: '#3a5a8a', border: '6px solid #1b1b1f'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 1420, bottom: 0, background: '#3a2a20', borderTop: '10px solid #1b1b1f'}} />
        <div style={{position: 'absolute', left: 170, top: 620 + Math.sin(f / 9) * 10, opacity: out(f, dur * 0.25, dur * 0.4)}}>
          <Bubble size={84} tail="left">সবাই কী ভাবল?</Bubble>
        </div>
        <Vignette strength={0.6} />
      </AbsoluteFill>
    );
  },
  gilo: ({dur}) => (
    <People dur={dur} bg="office" actors={[{look: GILO, x: 540, h: 1120, y: 1720, expression: 'wink', gesture: 'hold', talking: true, holding: <g transform="translate(-110 -90) scale(0.42)"><path d="M72 0 L180 40 L210 0 L250 40 L358 0 L430 60 L380 130 L340 110 L340 300 L90 300 L90 110 L50 130Z" fill="#f2d23c" stroke="#1b1b1f" strokeWidth={8} /></g>}]}>
      <NameCard name="Thomas Gilovich" sub="Cornell University · সাইকোলজিস্ট" top={270} />
    </People>
  ),
  wear: ({dur}) => <People dur={dur} bg="office" actors={[{look: GILO, x: 180, h: 800, y: 1500, expression: 'laugh', lookX: 1}, {look: STUDENT, x: 640, h: 1200, y: 1720, expression: 'worried'}]} title="এটা পরতে হবে?!" titleColor={GOLD} titleAt={0.35} />,
  singer: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[{look: CAST.customer2, x: 160, h: 720, y: 1840, expression: 'skeptical', lookX: 1}, {look: CAST.founder, x: 920, h: 720, y: 1840, expression: 'skeptical', lookX: -1}]} title="সবার অপছন্দের গায়ক" titleColor={RED} titleAt={0.4}>
        <div style={{position: 'absolute', left: 190, top: 380}}>
          <BigShirt size={700} wiggle={Math.sin(f / 5) * 6} />
        </div>
      </People>
    );
  },
  go: ({dur}) => (
    <AbsoluteFill>
      <Hall />
      <At x={260} y={1600}>
        <Toon height={1000} {...GILO} expression="smile" gesture="pointR" talking seed="g2" />
      </At>
      <At x={790} y={1640}>
        <Toon height={960} {...STUDENT} expression="worried" lookX={-1} seed="s2" />
      </At>
      <div style={{position: 'absolute', left: 60, right: 60, top: 280, opacity: out(useCurrentFrame(), dur * 0.1, dur * 0.25)}}>
        <Bubble size={60} tail="down">"যাও। ক্লাস ভর্তি মানুষ। দেরি করে ঢোকো।"</Bubble>
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  ),
  enter: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <Backdrop bg="linear-gradient(180deg, #4a5a4e, #2a332c)" />
        <ClassRoom lookX={-1} left={330} widthK={0.68} />
        <Beam x={180} w={210} bottom={1640} />
        <At x={180} y={1660}>
          <Toon height={1080} {...STUDENT} expression="worried" seed="s3" />
        </At>
        <div style={{position: 'absolute', left: 0, top: 650, width: 360, height: 360, background: 'radial-gradient(circle, rgba(255,58,42,0.55), rgba(255,58,42,0) 68%)', opacity: 0.7 + 0.3 * Math.sin(f / 4)}} />
        <Title top={200} size={84} color={RED} opacity={out(f, dur * 0.15, dur * 0.3)}>কান গরম!</Title>
        <Vignette strength={0.5} />
      </AbsoluteFill>
    );
  },
  ask: ({dur}) => (
    <AbsoluteFill>
      <Hall />
      <At x={260} y={1600}>
        <Toon height={1000} {...GILO} expression="thinking" gesture="explain" talking seed="g3" />
      </At>
      <At x={790} y={1640}>
        <Toon height={960} {...STUDENT} expression="worried" lookX={-1} seed="s4" />
      </At>
      <div style={{position: 'absolute', left: 60, right: 60, top: 280, opacity: out(useCurrentFrame(), dur * 0.2, dur * 0.35)}}>
        <Bubble size={60} tail="down">"কতজন তোমার শার্ট খেয়াল করেছে?"</Bubble>
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  ),
  guess: ({dur}) => {
    const f = useCurrentFrame();
    return <Crowd n={Math.floor(interpolate(f, [0, dur * 0.7], [0, 10], clampOpts))} color={GOLD} title="ছাত্রের অনুমান" big="অর্ধেক" dur={dur} />;
  },
  askall: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <Backdrop bg="linear-gradient(180deg, #4a5a4e, #2a332c)" />
        <ClassRoom hands={f > dur * 0.45 ? [1, 6, 9] : []} />
        <div style={{position: 'absolute', left: 80, right: 80, top: 230, opacity: out(f, 2, 10)}}>
          <Bubble size={62} tail="down">"শার্টটা কে কে খেয়াল করেছ?"</Bubble>
        </div>
        <Vignette strength={0.5} />
      </AbsoluteFill>
    );
  },
  real: ({dur}) => {
    const f = useCurrentFrame();
    return <Crowd n={Math.ceil(interpolate(f, [0, dur * 0.5], [10, 5], clampOpts))} color={RED} title="আসল হিসাব" big="১/৪" dur={dur} />;
  },
  bars: ({dur}) => {
    const f = useCurrentFrame();
    const g = out(f, 2, dur * 0.7);
    return (
      <People dur={dur} bg="plain" actors={[]} title="তার অর্ধেক!" titleColor={RED} titleAt={0.3}>
        <Bar label="ছাত্র যা ভেবেছিল" value="প্রায় ৫০%" pct={80 * g} color={GOLD} top={560} />
        <Bar label="আসলে" value="প্রায় ২৫%" pct={40 * g} color={RED} top={920} />
      </People>
    );
  },
  funny: ({dur}) => <People dur={dur} bg="office" actors={[{look: STUDENT, x: 540, h: 1250, y: 1720, expression: 'surprised', gesture: 'shrug'}]} title="এই শার্ট পরেও!" titleColor={GOLD} titleAt={0.2} />,
  hero: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <Backdrop bg="dark" />
        <Beam x={540} w={330} bottom={1660} />
        <At x={540} y={1680}>
          <Toon height={1060} {...YOU} expression="smile" gesture="open" talking seed="h1" />
        </At>
        <div style={{position: 'absolute', left: 30, top: 1240, transform: `scale(${spring({frame: f - dur * 0.45, fps: 30, config: {damping: 12}})}) rotate(-6deg)`}}>
          <FilmCam size={290} />
        </div>
        <Title top={200} size={84} color={GOLD} opacity={out(f, 2, 12)}>তোমার সিনেমা, তুমি নায়ক</Title>
        <Vignette strength={0.5} />
      </AbsoluteFill>
    );
  },
  allhero: ({dur}) => {
    const f = useCurrentFrame();
    const xs = [150, 410, 670, 930];
    const look = [CAST.customer2, CAST.founder, CAST.pro, CAST.worker];
    return (
      <AbsoluteFill>
        <Backdrop bg="dark" />
        {xs.map((x, i) => <Beam key={x} x={x} w={140} bottom={1500} o={out(f, i * 8, i * 8 + 8)} />)}
        {xs.map((x, i) => (
          <At key={x} x={x} y={1520}>
            <Toon height={800} {...look[i]} expression="smile" gesture={i === 1 ? 'wave' : 'open'} seed={`ah${i}`} />
          </At>
        ))}
        <Title top={200} size={92} color={GOLD} opacity={out(f, dur * 0.2, dur * 0.35)}>সবাই নায়ক</Title>
        <Vignette strength={0.5} />
      </AbsoluteFill>
    );
  },
  busy: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People
        dur={dur}
        bg="dark"
        actors={[
          {look: CAST.customer2, x: 190, h: 880, expression: 'worried', holding: <Mirror />},
          {look: CAST.founder, x: 540, h: 880, expression: 'thinking', gesture: 'think'},
          {look: CAST.worker, x: 880, h: 880, expression: 'worried', holding: <SmallPhone />},
        ]}
      >
        <div style={{position: 'absolute', left: 80, right: 80, top: 260, textAlign: 'center', opacity: out(f, 2, 12)}}>
          <Bubble size={78} tail="down">"আমাকে কেমন লাগছে?"</Bubble>
        </div>
      </People>
    );
  },
  notime: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <Backdrop bg="dark" />
        <Beam x={540} w={260} bottom={1660} o={1 - out(f, dur * 0.3, dur * 0.85)} />
        {[{x: 130, l: -1, look: CAST.customer}, {x: 320, l: -1, look: CAST.exec}, {x: 770, l: 1, look: CAST.pro}, {x: 960, l: 1, look: CAST.founder}].map((a) => (
          <At key={a.x} x={a.x} y={1500}>
            <Toon height={720} {...a.look} lookX={a.l} expression="neutral" gesture="hold" holding={<SmallPhone />} seed={`n${a.x}`} />
          </At>
        ))}
        <At x={540} y={1680}>
          <Toon height={960} {...YOU} expression="surprised" gesture="shrug" seed="n0" />
        </At>
        <Title top={200} size={88} color={GOLD} opacity={out(f, dur * 0.25, dur * 0.4)}>কার সময় আছে?</Title>
        <Vignette strength={0.5} />
      </AbsoluteFill>
    );
  },
  month: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="office" actors={[{look: YOU, x: 760, h: 980, y: 1680, expression: 'thinking', gesture: 'think'}]} title="গত মাসে অন্যের ভুল" titleColor={GOLD} titleAt={0.1}>
        <div style={{position: 'absolute', left: 70, top: 480, width: 430, background: '#f6f2e8', border: '8px solid #1b1b1f', borderRadius: 16, transform: `rotate(-4deg) scale(${spring({frame: f, fps: 30, config: {damping: 12}})})`}}>
          <div style={{height: 76, background: RED, borderRadius: '6px 6px 0 0'}} />
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, padding: 24}}>
            {Array.from({length: 20}, (_, i) => <div key={i} style={{aspectRatio: '1', borderRadius: 6, background: i === 12 ? RED : '#c9c1ae'}} />)}
          </div>
        </div>
        <div style={{position: 'absolute', left: 620, top: 420, fontSize: 200, fontWeight: 900, color: GOLD, transform: `scale(${out(f, dur * 0.5, dur * 0.65)})`, zIndex: 3}}>?</div>
      </People>
    );
  },
  gone: ({dur}) => {
    const f = useCurrentFrame();
    return (
      <People dur={dur} bg="plain" actors={[{look: YOU, x: 540, h: 1100, y: 1720, expression: 'smile', gesture: 'thumbsUp'}]} title="কারও মনে নেই" titleColor={GREEN} titleAt={0.45}>
        <div style={{position: 'absolute', left: 340, top: 340, opacity: 1 - out(f, dur * 0.35, dur * 0.5)}}>
          <Bubble size={120} tail="down">...</Bubble>
        </div>
      </People>
    );
  },
  start: ({dur}) => {
    const f = useCurrentFrame();
    const g = interpolate(f, [0, dur], [0, 1], clampOpts);
    return (
      <AbsoluteFill>
        <Backdrop bg="radial-gradient(ellipse at 75% 60%, #4a4028, #0a0b10 70%)" />
        <div style={{position: 'absolute', left: 680, top: 640, width: 320, height: 860, background: 'linear-gradient(180deg, #fff7d8, #f2d68a)', border: '10px solid #1b1b1f', boxShadow: '0 0 160px rgba(255,230,160,0.7)'}} />
        {EYES.slice(0, 8).map(([x, y], i) => <Eye key={i} x={x} y={y} size={160} fade={1 - out(f, dur * 0.1 + i * 3, dur * 0.3 + i * 3)} tx={interpolate(g, [0, 1], [240, 680])} ty={1000} />)}
        <At x={interpolate(g, [0, 1], [220, 620])} y={1640}>
          <Toon height={1020} {...YOU} expression="smile" stride={Math.sin(f / 4) * 20} lookX={1} seed="st" />
        </At>
        <Title top={200} size={96} color={GOLD} opacity={out(f, dur * 0.45, dur * 0.6)}>আজই শুরু করো</Title>
        <Vignette strength={0.45} />
      </AbsoluteFill>
    );
  },
  cta: () => (
    <CtaScene>
      <BigShirt size={520} />
    </CtaScene>
  ),
};
const Scene = pick(SCENES);

export const SpotlightThumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 30% 55%, rgba(242,210,60,0.3), #0b0d12 70%)'}} />
    <div style={{position: 'absolute', left: -40, top: 660, transform: 'rotate(-8deg)'}}>
      <BigShirt size={700} />
    </div>
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={960} expression="shocked" pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={100}>"লোকে কী বলবে"</ThumbText>
      <div>
        <ThumbText size={100} bg={RED}>
          এই ভয়টা মিথ্যা!
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={78}>একটা টি-শার্টে প্রমাণ</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 8}}>
          Spotlight Effect
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export const SpotlightVideo: React.FC<StoryProps> = (props) => (
  <Story {...props} segments={spotlightSegments} folder="spotlight/" bg={BG} render={(seg, dur) => <Scene seg={seg} dur={dur} />} thumbnail={<SpotlightThumbnail />} />
);
