// পরীমনির খামচি আর সাংবাদিক সিয়ামের টিটেনাস টিকা (Law 39)। স্ক্রিপ্ট: scripts/Trending/03-pori-moni-vaccine.md
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {Mobile, PsyThumb} from '../common/psy';
import {Sign} from '../common/places';
import {Bounce, Card, Cta, Hit, Pair, R, Two, WOMAN, Y1, lawBook, story} from '../common/reel';
import {Notice} from '../common/laws48';
import {Ward} from '../common/best30';
import {ToonLook} from '../common/Toon';
import {Court, Lift, Pori, cams, clip} from '../pori/Video';
import raw from './segments.json';

const LINE = '#1b1b1f';
const SIAM: ToonLook = {...Y1, top: '#e8e4dc', bottom: '#2a2c34'};
const DOC: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#7aa6c2', jacket: '#f6f7f9', skirt: '#2a3a4a', bottom: '#2a3a4a', glasses: true};

// ---------- জিনিস ----------

// ইনজেকশনের সিরিঞ্জ (আড়াআড়ি, সুঁই ডানে)
const Syringe: React.FC<{w?: number; rot?: number; fill?: number}> = ({w = 620, rot = -20, fill = 0.7}) => (
  <svg width={w} height={w * 0.3} viewBox="0 0 600 180" style={{transform: `rotate(${rot}deg)`, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'}}>
    <rect x={10} y={70} width={30} height={40} rx={6} fill="#d8dce4" stroke={LINE} strokeWidth={6} />
    <rect x={40} y={84} width={90} height={12} fill="#b8bec8" stroke={LINE} strokeWidth={5} />
    <rect x={130} y={50} width={300} height={80} rx={10} fill="#eef6fb" stroke={LINE} strokeWidth={7} />
    <rect x={130 + 300 * (1 - fill)} y={58} width={300 * fill - 8} height={64} rx={6} fill="#9ad0e6" />
    {[180, 230, 280, 330, 380].map((x) => (
      <line key={x} x1={x} x2={x} y1={50} y2={76} stroke={LINE} strokeWidth={4} />
    ))}
    <rect x={430} y={74} width={40} height={32} fill="#c8ccd4" stroke={LINE} strokeWidth={5} />
    <path d="M470 86 L592 90 L470 94Z" fill="#8a8e96" stroke={LINE} strokeWidth={3} />
  </svg>
);

// হাতের ওপর তিনটা নখের দাগ
const ScratchArm: React.FC = () => {
  const f = useCurrentFrame();
  const d = interpolate(f, [6, 22], [0, 1], clampOpts);
  return (
    <div style={{width: 760, height: 420, background: '#f6f2e8', borderRadius: 34, border: `6px solid ${LINE}`, boxShadow: '0 30px 70px rgba(0,0,0,0.55)', overflow: 'hidden'}}>
      <svg width={760} height={420} viewBox="0 0 760 420">
        <path d="M-20 300 C160 220 420 180 790 160 L790 330 C420 340 160 390 -20 430Z" fill="#c98d62" stroke={LINE} strokeWidth={7} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${250 + i * 60} ${330 - i * 6} L${400 + i * 60} ${230 - i * 6}`} stroke="#c0203a" strokeWidth={12} strokeLinecap="round" strokeDasharray={200} strokeDashoffset={200 * (1 - d)} />
        ))}
      </svg>
    </div>
  );
};

// ফেসবুক পোস্ট
export const FbPost: React.FC<{name: string; text?: string; blur?: boolean; w?: number}> = ({name, text, blur, w = 860}) => (
  <div style={{width: w, padding: '30px 36px', background: '#f6f7f9', borderRadius: 30, border: `6px solid ${LINE}`, boxShadow: '0 30px 70px rgba(0,0,0,0.55)', color: '#15151b'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
      <div style={{width: 90, height: 90, borderRadius: '50%', background: '#3b5bdb', border: `5px solid ${LINE}`}} />
      <div>
        <div style={{fontSize: 48, fontWeight: 800}}>{name}</div>
        <div style={{fontSize: 32, fontWeight: 700, color: '#6a6e78'}}>ফেসবুক পোস্ট</div>
      </div>
    </div>
    {text ? <div style={{marginTop: 26, fontSize: 64, fontWeight: 800, lineHeight: 1.3, filter: blur ? 'blur(14px)' : undefined}}>{text}</div> : <div style={{height: 120}} />}
    <div style={{marginTop: 26, paddingTop: 18, borderTop: '4px solid #d8dce4', display: 'flex', justifyContent: 'space-around', fontSize: 38, fontWeight: 800, color: '#6a6e78'}}>
      <span>লাইক</span>
      <span>হা হা</span>
      <span>কমেন্ট</span>
    </div>
  </div>
);

// গলার মেডেল, মাঝে বিপের তারা
const Medal: React.FC<{size?: number}> = ({size = 420}) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 300 390" style={{filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))'}}>
    <path d="M70 0 L130 170 L170 170 L110 0Z" fill="#c0203a" stroke={LINE} strokeWidth={6} />
    <path d="M230 0 L170 170 L130 170 L190 0Z" fill="#2b4fa0" stroke={LINE} strokeWidth={6} />
    <circle cx={150} cy={265} r={115} fill="#e8b830" stroke={LINE} strokeWidth={8} />
    <circle cx={150} cy={265} r={88} fill="none" stroke="#b88a10" strokeWidth={6} />
    <text x={150} y={300} textAnchor="middle" fontSize={96} fontWeight={900} fill="#c0203a">✱✱✱</text>
  </svg>
);

// ভ্যাকসিনের প্যাকেট
const VaxBox: React.FC<{w?: number}> = ({w = 360}) => (
  <svg width={w} height={w * 0.8} viewBox="0 0 300 240" style={{filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))'}}>
    <path d="M20 60 L150 20 L280 60 L150 100Z" fill="#f6f7f9" stroke={LINE} strokeWidth={6} />
    <path d="M20 60 L150 100 L150 230 L20 190Z" fill="#dfe8ea" stroke={LINE} strokeWidth={6} />
    <path d="M280 60 L150 100 L150 230 L280 190Z" fill="#c8d4d6" stroke={LINE} strokeWidth={6} />
    <path d="M60 120 L110 136 M85 104 L85 156" stroke={RED} strokeWidth={14} />
    <text x={215} y={160} textAnchor="middle" fontSize={34} fontWeight={900} fill="#14305f" transform="skewY(-17) translate(0 64)">TT</text>
  </svg>
);

// গালির বুদবুদ
const Gali: React.FC<{size?: number}> = ({size = 110}) => (
  <div style={{padding: '18px 40px', background: '#c0203a', color: '#fff', fontSize: size, fontWeight: 900, borderRadius: 40, border: `6px solid ${LINE}`, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', letterSpacing: 10}}>✱✱✱</div>
);

// ---------- দৃশ্যের ছাঁচ ----------

const WardSign: React.FC = () => (
  <>
    <Ward />
    <Sign text="ঢাকা মেডিকেল" bg="#14305f" color="#ffe9a8" y={220} />
  </>
);

const poriScene = (title?: string, color = GOLD, o: {zoom?: [number, number]; dim?: number; over?: (f: number, dur: number) => React.ReactNode} = {}): React.FC<SP> => ({dur, id}) => {
  const P = R({place: <Pori dur={dur} zoom={o.zoom} dim={o.dim} />, title, color, vig: 0.3, over: o.over});
  return <P dur={dur} id={id} />;
};

// সাংবাদিকেরা ফোন তুলে, মাঝে সিয়াম
const watchSiam = R({
  place: <Court />,
  actors: [...cams([110, 300, 780, 970]), {look: SIAM, x: 540, h: 1180, y: 1880, expression: 'neutral', gesture: 'idle'}],
  title: 'সবার চোখ সিয়ামের দিকে',
  color: GOLD,
  titleTop: 180,
});

// "হা হা" ভেসে ওঠে
export const Haha: React.FC = () => {
  const f = useCurrentFrame();
  const spots = [
    [90, 1240, 0],
    [620, 1120, 8],
    [260, 980, 16],
    [700, 1420, 24],
    [120, 1520, 32],
    [520, 1600, 40],
  ];
  return (
    <>
      {spots.map(([x, y, at], i) => {
        const s = spring({frame: f - at, fps: 30, config: {damping: 10}});
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y - (f - at) * 1.2, transform: `scale(${s})`, padding: '14px 34px', borderRadius: 40, background: '#ffd84a', border: `5px solid ${LINE}`, fontSize: 64, fontWeight: 900, color: '#15151b'}}>হা হা</div>
        );
      })}
    </>
  );
};

// গালিটা প্যাকেটে ঢুকে পরীমনির দিকে ফিরে যায়
const ReturnTrip: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const go = interpolate(f, [0, dur * 0.35], [0, 1], clampOpts);
  const inBox = interpolate(f, [dur * 0.3, dur * 0.42], [1, 0], clampOpts);
  const back = interpolate(f, [dur * 0.55, dur * 0.9], [0, 1], clampOpts);
  const boxX = 560 - back * 260;
  const boxY = 820 - back * 360;
  return (
    <>
      <div style={{position: 'absolute', left: 260 + go * 340, top: 560 + go * 300, transform: `scale(${inBox})`}}>
        <Gali size={80} />
      </div>
      <div style={{position: 'absolute', left: boxX, top: boxY, transform: `scale(${1 - back * 0.25}) rotate(${back * -25}deg)`}}>
        <VaxBox />
      </div>
    </>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  h1: poriScene('খামচি খেয়ে ভ্যাকসিন!', RED, {
    zoom: [1.12, 1.2],
    dim: 0.1,
    over: () => (
      <Bounce x={300} y={1080} at={10} seed="sy">
        <Syringe w={640} />
      </Bounce>
    ),
  }),
  h2: Two(Card('রোগ থেকে বাঁচতে?', {size: 104, color: GOLD, bg: 'dark'}), Hit('নাকি সুঁই দিয়ে গালি ফেরত?', {size: 104, color: RED, bg: 'dark'}), 0.4),
  dmch: R({place: <WardSign />, actors: [{look: SIAM, x: 330, h: 1200, y: 1860, expression: 'neutral', gesture: 'idle', lookX: 1}]}),
  doc: Pair(<Ward />, {look: DOC, e: 'serious', g: 'explain', talk: true}, {look: SIAM, e: 'neutral'}),
  siam1: Pair(<Ward />, {look: DOC, e: 'serious'}, {look: SIAM, e: 'neutral', g: 'open', talk: true}),
  pen: Pair(<Ward />, {look: DOC, e: 'shocked'}, {look: SIAM, e: 'blank'}, {title: 'নায়িকা?!', color: RED}),
  court: R({place: <Court />, title: 'তিন দিন আগে', color: GOLD, titleTop: 180}),
  lift: R({place: <Lift />, actors: cams([120, 330, 540, 750, 960]), title: 'লিফটের সামনে ধাক্কাধাক্কি', color: RED}),
  clipA: clip({zoom: [1.0, 1.12], tint: 'rgba(160,20,30,0.12)'}),
  marks: R({
    bg: 'dark',
    title: 'সিয়ামের হাতে নখের দাগ',
    color: RED,
    over: () => (
      <Bounce x={160} y={760} at={2} seed="arm">
        <ScratchArm />
      </Bounce>
    ),
  }),
  claim: poriScene('তাঁর দাবি: সাংবাদিকেরাই গায়ে হাত দেন', GOLD, {zoom: [1.0, 1.06]}),
  more: R({
    bg: 'dark',
    title: 'পরের রাতে আরও কড়া পোস্ট',
    color: RED,
    over: (f, dur) => (
      <>
        <Bounce x={110} y={560} at={2} seed="p1">
          <FbPost name="পরীমনি" text="✱✱✱✱ ✱✱✱ ✱✱✱✱✱ ✱✱✱" blur />
        </Bounce>
        <Bounce x={110} y={1260} at={Math.round(dur * 0.62)} seed="p2">
          <Notice text="দুঃখ প্রকাশ: একটা শব্দও নেই" w={860} />
        </Bounce>
      </>
    ),
  }),
  boycott: R({
    bg: 'dark',
    over: (f, dur) => (
      <>
        <Bounce x={110} y={420} at={2} seed="b1">
          <Notice text="সাংবাদিকদের বয়কট ঘোষণা" w={860} />
        </Bounce>
        <Bounce x={110} y={820} at={Math.round(dur * 0.4)} seed="b2">
          <FbPost name="পরীমনি" text="…আমারে ফ্রেন্ডলিস্টে রাইখা দিছে" />
        </Bounce>
      </>
    ),
  }),
  medal: poriScene('লজ্জা না, গর্বের মেডেল', GOLD, {
    zoom: [1.05, 1.12],
    dim: 0.15,
    over: () => (
      <Bounce x={560} y={640} at={8} seed="md">
        <Medal size={360} />
      </Bounce>
    ),
  }),
  expect: watchSiam,
  silent: Hit('তিন দিন চুপ', {size: 150, color: GOLD, bg: 'dark', sub: 'সিয়াম একটা শব্দও বলেন না'}),
  vax: R({
    place: <Ward />,
    actors: [{look: SIAM, x: 330, h: 1200, y: 1860, expression: 'neutral', gesture: 'idle', lookX: 1}],
    title: 'টিটেনাসের টিকা',
    color: GOLD,
    over: () => (
      <Bounce x={420} y={1060} at={6} seed="v1">
        <Syringe w={480} rot={-160} />
      </Bounce>
    ),
  }),
  nail: R({
    bg: 'dark',
    title: 'এই টিকা মানুষ নেয়…',
    color: GOLD,
    over: (f, dur) => (
      <>
        <Bounce x={140} y={620} at={2} seed="n1">
          <div style={{padding: '24px 44px', background: '#f6f2e8', border: `6px solid ${LINE}`, borderRadius: 24, fontSize: 80, fontWeight: 900, color: '#15151b'}}>কুকুরের কামড়ে</div>
        </Bounce>
        <Bounce x={140} y={900} at={Math.round(dur * 0.4)} seed="n2">
          <div style={{padding: '24px 44px', background: '#f6f2e8', border: `6px solid ${LINE}`, borderRadius: 24, fontSize: 80, fontWeight: 900, color: '#15151b'}}>মরিচা পড়া পেরেকে</div>
        </Bounce>
        <Bounce x={140} y={1180} at={Math.round(dur * 0.78)} seed="n3">
          <div style={{padding: '24px 44px', background: '#c0203a', border: `6px solid ${LINE}`, borderRadius: 24, fontSize: 80, fontWeight: 900, color: '#fff'}}>আর… নায়িকার নখে?</div>
        </Bounce>
      </>
    ),
  }),
  fbintro: R({
    bg: 'dark',
    title: 'সেদিন সন্ধ্যায়',
    color: GOLD,
    over: () => (
      <Bounce x={330} y={560} at={2} seed="ph">
        <Mobile w={420} />
      </Bounce>
    ),
  }),
  fbpost: R({
    bg: 'dark',
    over: () => (
      <Bounce x={110} y={700} at={0} seed="fp">
        <FbPost name="সিয়াম হোসেন" text="আম্মুর জন্য আমার ভ্যাকসিন নিতেই হলো।" />
      </Bounce>
    ),
  }),
  noname: Two(Card('পরীমনির নাম নেই', {size: 110, color: GOLD, bg: 'dark'}), Hit('একটা গালিও নেই', {size: 120, color: GREEN, bg: 'dark'}), 0.5),
  laugh: R({bg: 'dark', title: 'ফেসবুক ভরে যায় হাসিতে', color: GOLD, over: () => <Haha />}),
  mouth: poriScene('গালি: মুখে, চিৎকার করে', RED, {zoom: [1.1, 1.18], dim: 0.1}),
  needle: R({
    bg: 'dark',
    title: 'জবাব: সুঁইয়ের মাথায়',
    color: GREEN,
    over: () => (
      <Bounce x={230} y={900} at={4} seed="nd">
        <Syringe w={680} rot={-25} />
      </Bounce>
    ),
  }),
  back: R({
    place: <Pori dur={200} zoom={[1.0, 1.04]} dim={0.35} />,
    title: 'গালিই ফিরে এল',
    color: RED,
    vig: 0.3,
    over: (f, dur) => <ReturnTrip dur={dur} />,
  }),
  clipC: clip({zoom: [1.25, 1.35], tint: 'rgba(160,20,30,0.18)'}),
  remind: Two(Card('"সাংবাদিকেরা খারাপ"', {size: 104, color: GOLD, bg: 'dark'}), Hit('মনে পড়বে একটা টিকা', {size: 110, color: RED, bg: 'dark'}), 0.5),
  book: lawBook(39),
  lesson: R({bg: 'plain'}),
  act: Card('গালির জবাব গালি না, ঠান্ডা মাথা', {size: 96, color: GREEN, bg: 'dark'}),
  cta: () => <Cta />,
};

const Thumb: React.FC = () => (
  <PsyThumb
    l1="পরীমনির খামচি খেয়ে"
    l2="ভ্যাকসিন নিলেন সাংবাদিক!"
    bottom="গালির জবাব সুঁইয়ে"
    term="48 Laws · Law 39"
    art={
      <div style={{position: 'absolute', left: 0, top: 820, width: 640, height: 820, overflow: 'hidden', borderRadius: 30}}>
        <Img src={staticFile('pori/pori.webp')} style={{width: 640, height: 820, objectFit: 'cover', objectPosition: '50% 10%'}} />
      </div>
    }
    size={80}
  />
);

export const porivax = story('porivax/', raw, SCENES, Thumb, {logo: 'bba2'});
