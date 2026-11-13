import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Cam, LOOKS, Person, Place, Vignette} from '../art';
import {Bubble, PersonIcon} from '../milgram/art';
import {BG, FG, FollowButton, GOLD, GREEN, Plain, PriceTag, RED, Title, clampOpts, inOut, out} from '../biz/art';
import {Bill, Burger, BurgerStand, CREAM, Contract, DICK, Gear, KROC, LandPlot, MAC, MRED, MYEL, Mixer, SONNEBORN} from './art';

export {BG};
export type McSegment = {id: string; text: string; visual: string};
type SP = {dur: number; id: string};

// সন্ধ্যার রাস্তা (দোকানের পেছনে)
const Street: React.FC<{dusk?: number}> = ({dusk = 0}) => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${dusk ? '#1a1424' : '#2a3a5a'} 0%, ${dusk ? '#3a2030' : '#c98a5a'} 55%, #1a1410 56%, #0e0b09 100%)`}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 1060, height: 30, background: '#3a3530'}} />
  </AbsoluteFill>
);

const Brothers: React.FC<{y?: number; h?: number; x1?: number; x2?: number; mood?: 'neutral' | 'worried'; mouth?: 'neutral' | 'tense' | 'smile' | 'open'; silhouette?: string}> = ({y = 1520, h = 800, x1 = 300, x2 = 780, mood = 'neutral', mouth = 'smile', silhouette}) => (
  <>
    <Place x={x1} y={y}>
      <Person height={h} {...DICK} brow={mood} mouth={mouth} silhouette={silhouette} />
    </Place>
    <Place x={x2} y={y}>
      <Person height={h * 0.96} {...MAC} brow={mood} mouth={mouth} silhouette={silhouette} />
    </Place>
  </>
);

const NameCard: React.FC<{name: string; sub: string; o: number; color?: string; top?: number}> = ({name, sub, o, color = GOLD, top = 1180}) => (
  <div style={{position: 'absolute', left: 90, top, padding: '16px 30px', background: 'rgba(0,0,0,0.65)', borderLeft: `8px solid ${color}`, opacity: o}}>
    <div style={{fontSize: 56, fontWeight: 800}}>{name}</div>
    <div style={{fontSize: 34, color}}>{sub}</div>
  </div>
);

// ---------- দৃশ্য ----------

// নামের অক্ষর একটা একটা করে খসে পড়ে
const Erase: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const letters = "McDONALD'S".split('');
  return (
    <AbsoluteFill>
      <Street dusk={1} />
      <div style={{position: 'absolute', top: 360, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6}}>
        {letters.map((ch, i) => {
          const t = Math.max(0, f - dur * 0.3 - i * 3);
          return (
            <span key={i} style={{display: 'inline-block', fontFamily: 'Arial Black, Arial', fontSize: 130, fontWeight: 900, color: MYEL, textShadow: `0 0 40px ${MYEL}`, transform: `translateY(${t * t * 0.9}px) rotate(${t * (i % 2 ? 4 : -4)}deg)`, opacity: Math.max(0, 1 - t / 30)}}>
              {ch}
            </span>
          );
        })}
      </div>
      <Brothers y={1560} h={820} mood="worried" mouth="tense" />
      <Vignette strength={0.65} />
    </AbsoluteFill>
  );
};

const Salesman: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(214,40,40,0.15)" />
      <Place x={380} y={1540}>
        <Person height={980} {...KROC} mouth="smile" />
      </Place>
      <div style={{position: 'absolute', left: 600, top: 760, opacity: out(f, 2, 12)}}>
        <Mixer size={340} spin={f / 2} />
      </div>
      <NameCard name="সেলসম্যান" sub="মিল্কশেক মেশিন" o={out(f, dur * 0.3, dur * 0.5)} color={MRED} top={300} />
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Stand: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Street />
      <div style={{position: 'absolute', left: 90, top: 330, transform: `scale(${interpolate(f, [0, dur], [1, 1.06])})`, transformOrigin: '50% 100%'}}>
        <BurgerStand width={900} />
      </div>
      <Title top={140} size={150} color={GOLD} opacity={out(f, 0, 10)}>
        1948
      </Title>
      <Title top={1180} size={70} opacity={out(f, dur * 0.4, dur * 0.6)}>
        San Bernardino, California
      </Title>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const BrothersScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Street />
      <div style={{position: 'absolute', left: 90, top: 200, opacity: 0.55}}>
        <BurgerStand width={900} />
      </div>
      <Brothers y={1560} h={860} />
      <div style={{position: 'absolute', top: 1180, left: 60, opacity: out(f, 4, 14)}}>
        <span style={{fontSize: 56, fontWeight: 800, background: 'rgba(0,0,0,0.6)', padding: '10px 24px', borderRadius: 10}}>Dick</span>
      </div>
      <div style={{position: 'absolute', top: 1180, right: 60, opacity: out(f, 8, 18)}}>
        <span style={{fontSize: 56, fontWeight: 800, background: 'rgba(0,0,0,0.6)', padding: '10px 24px', borderRadius: 10}}>Mac</span>
      </div>
      <Title top={110} size={64} color={MYEL} opacity={out(f, dur * 0.5, dur * 0.7)}>
        প্রথম ফাস্ট ফুড সিস্টেম
      </Title>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

// ৩০ সেকেন্ডের টাইমার আর বার্গার
const Speed: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, dur * 0.45], [0, 1], clampOpts);
  const burger = spring({frame: f - dur * 0.45, fps: 30, config: {damping: 10}});
  const price = out(f, dur * 0.55, dur * 0.7);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(246,192,38,0.14)" />
      <svg width={420} height={420} viewBox="-110 -110 220 220" style={{position: 'absolute', left: 330, top: 260}}>
        <circle r={100} fill="#1a1d24" stroke="#c9ced3" strokeWidth={8} />
        <path d={`M0 0 L0 -90 A90 90 0 ${t > 0.5 ? 1 : 0} 1 ${Math.sin(t * Math.PI * 2) * 90} ${-Math.cos(t * Math.PI * 2) * 90}Z`} fill={MRED} opacity={0.85} />
        <text y={16} textAnchor="middle" fontSize={50} fontWeight={900} fill="#fff" fontFamily="Arial Black, Arial">
          {Math.round(t * 30)}s
        </text>
      </svg>
      <div style={{position: 'absolute', left: 240, top: 760, transform: `scale(${burger})`, transformOrigin: '50% 50%'}}>
        <Burger size={600} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1270, display: 'flex', justifyContent: 'center', opacity: price}}>
        <PriceTag text="15¢" size={0.8} color={MYEL} />
      </div>
    </AbsoluteFill>
  );
};

const Queue: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const shift = interpolate(f, [0, dur], [0, -120]);
  return (
    <AbsoluteFill>
      <Street />
      <div style={{position: 'absolute', left: 40, top: 300}}>
        <BurgerStand width={760} />
      </div>
      <div style={{position: 'absolute', left: shift, top: 0, width: 2000, height: 1920}}>
        {Array.from({length: 9}, (_, i) => (
          <Place key={i} x={380 + i * 150} y={1560 + (i % 2) * 30}>
            <Person height={560} facing="back" {...LOOKS[i % LOOKS.length]} />
          </Place>
        ))}
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Kroc: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const walk = inOut(f, 0, dur * 0.5);
  const step = Math.sin(f * 0.5) * 18 * (walk < 1 ? 1 : 0);
  return (
    <AbsoluteFill>
      <Street />
      <div style={{position: 'absolute', left: 130, top: 300, opacity: 0.7}}>
        <BurgerStand width={820} />
      </div>
      <Place x={interpolate(walk, [0, 1], [1300, 640])} y={1580}>
        <Person height={900} {...KROC} stride={step} armL={8 + step} armR={8 - step} holding={<Mixer size={150} />} />
      </Place>
      <Title top={140} size={130} color={GOLD} opacity={out(f, 0, 10)}>
        1954
      </Title>
      <NameCard name="Ray Kroc" sub="বয়স ৫২" o={out(f, dur * 0.35, dur * 0.5)} />
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Eyes: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const spark = out(f, dur * 0.25, dur * 0.45);
  return (
    <AbsoluteFill>
      <Plain glow={`rgba(246,192,38,${0.1 + 0.15 * spark})`} />
      <Cam zoom={interpolate(f, [0, dur], [2.6, 3.1])} x={540} y={620}>
        <Place x={540} y={1500}>
          <Person height={1100} {...KROC} mouth="smile" />
        </Place>
      </Cam>
      {[440, 637].map((x, i) => (
        <div key={i} style={{position: 'absolute', left: x - 50, top: 595, fontSize: 100, opacity: spark, transform: `scale(${0.6 + 0.4 * spark}) rotate(${f * 3}deg)`, color: MYEL, textShadow: `0 0 50px ${MYEL}`}}>
          ✦
        </div>
      ))}
      <Title top={180} size={84} color={MYEL} opacity={spark}>
        $ $ $
      </Title>
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

const Deal: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [dur * 0.35, dur * 0.95], [0, 24], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(214,40,40,0.12)" />
      <div style={{position: 'absolute', top: 200, left: 60, right: 60, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center'}}>
        {Array.from({length: 24}, (_, i) => (
          <div key={i} style={{opacity: i < n ? 1 : 0.06, transform: `scale(${i < n ? 1 : 0.7})`}}>
            <BurgerStand width={150} />
          </div>
        ))}
      </div>
      <Place x={230} y={1560}>
        <Person height={680} {...DICK} />
      </Place>
      <Place x={450} y={1560}>
        <Person height={650} {...MAC} />
      </Place>
      <Place x={820} y={1560}>
        <Person height={760} {...KROC} armR={60} mouth="open" />
      </Place>
      <div style={{position: 'absolute', left: 520, top: 870, opacity: out(f, 2, 10)}}>
        <Bubble size={56} tail="right">
          "সারা দেশে!"
        </Bubble>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Game: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 55%, rgba(214,40,40,${0.25 * out(f, 0, dur * 0.5)}), rgba(0,0,0,0) 60%)`}} />
      <Place x={540} y={1650}>
        <Person height={1150} {...KROC} silhouette="#3a1012" />
      </Place>
      <Title top={430} size={170} color={MRED} opacity={out(f, dur * 0.3, dur * 0.55)}>
        খেলা শুরু
      </Title>
    </AbsoluteFill>
  );
};

// বার্গার সরে যায়, নিচে জমি
const Land: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const swap = inOut(f, dur * 0.3, dur * 0.6);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(106,143,58,0.18)" />
      <div style={{position: 'absolute', left: 240, top: 300, opacity: 1 - swap, transform: `translateY(${-swap * 200}px) scale(${1 - swap * 0.4})`}}>
        <Burger size={600} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontSize: 240, color: RED, fontWeight: 900, opacity: out(f, dur * 0.1, dur * 0.25)}}>✕</div>
      </div>
      <div style={{position: 'absolute', left: 140, top: 700, opacity: swap, transform: `scale(${0.7 + 0.3 * swap})`}}>
        <LandPlot size={800} sold={out(f, dur * 0.6, dur * 0.8)} owner="$$$" />
      </div>
      <Title top={1300} size={86} color={GREEN} opacity={swap}>
        টাকা মাটিতে
      </Title>
    </AbsoluteFill>
  );
};

// দোকানদার থেকে কোম্পানিতে ভাড়ার টাকা
const Rent: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(106,143,58,0.12)" />
      <div style={{position: 'absolute', left: 310, top: 520}}>
        <LandPlot size={460} sold={1} owner="McD" />
        <div style={{position: 'absolute', left: 90, top: -170}}>
          <BurgerStand width={280} />
        </div>
      </div>
      <Place x={320} y={1400}>
        <Person height={560} {...LOOKS[2]} />
      </Place>
      <Title top={1420} size={46} color="#ccc" opacity={out(f, 4, 14)}>
        দোকানদার
      </Title>
      <Place x={800} y={1400}>
        <Person height={620} {...KROC} mouth="smile" />
      </Place>
      <div style={{position: 'absolute', left: 700, top: 1420, fontSize: 46, color: GOLD, fontWeight: 800, opacity: out(f, 4, 14)}}>কোম্পানি</div>
      {Array.from({length: 6}, (_, i) => {
        const t = ((f - dur * 0.3 - i * 8) / 40) % 1;
        const ok = f > dur * 0.3 + i * 8;
        return ok ? <Bill key={i} size={130} style={{position: 'absolute', left: interpolate(t, [0, 1], [380, 660]), top: 980 - Math.sin(t * Math.PI) * 140, opacity: Math.sin(t * Math.PI)}} /> : null;
      })}
      <Title top={180} size={80} color={MYEL} opacity={out(f, dur * 0.4, dur * 0.6)}>
        প্রতি মাসে ভাড়া
      </Title>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const Quote: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(43,79,160,0.15)" />
      <Place x={760} y={1560}>
        <Person height={900} {...SONNEBORN} armR={40} />
      </Place>
      <NameCard name="Harry Sonneborn" sub="Kroc-এর ফাইন্যান্স ম্যান" o={out(f, 2, 12)} top={1200} />
      <div style={{position: 'absolute', left: 50, top: 260, opacity: out(f, dur * 0.1, dur * 0.2)}}>
        <Bubble size={58} tail="right">
          "আমরা খাবারের
          <br />
          ব্যবসায় নেই।"
        </Bubble>
      </div>
      <div style={{position: 'absolute', left: 50, top: 600, opacity: out(f, dur * 0.5, dur * 0.6)}}>
        <Bubble size={62} tail="right" color={MYEL}>
          "আমরা রিয়েল এস্টেটের
          <br />
          ব্যবসায়।"
        </Bubble>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

const Buyout: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - dur * 0.35, fps: 30, config: {damping: 11}});
  return (
    <AbsoluteFill>
      <Plain />
      <Title top={140} size={130} color={GOLD} opacity={out(f, 0, 10)}>
        1961
      </Title>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: pop}}>
        <PriceTag text="$2.7M" size={0.6 + 0.35 * pop} />
      </div>
      <Brothers x1={230} x2={460} h={680} y={1560} mouth="neutral" />
      <Place x={820} y={1560}>
        <Person height={760} {...KROC} mouth="smile" />
      </Place>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

// হাত মেলানো, ১%
const PromiseScene: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const shake = Math.sin(f * 0.7) * 10 * (f < dur * 0.7 ? 1 : 0);
  return (
    <AbsoluteFill>
      <Plain glow="rgba(246,192,38,0.12)" />
      <svg width={1080} height={700} viewBox="0 0 1080 700" style={{position: 'absolute', top: 520}}>
        <g transform={`translate(0 ${shake})`}>
          <rect x={0} y={260} width={420} height={140} rx={30} fill="#2a2f3a" />
          <rect x={660} y={260} width={420} height={140} rx={30} fill="#f2efe9" />
          <path d="M400 250 C470 230 520 240 560 270 L640 300 C680 320 680 360 640 370 L520 400 C470 410 430 400 400 390Z" fill="#e8b998" />
          <path d="M680 260 C610 240 570 250 540 280 L470 320 C440 340 450 380 490 380 L600 400 C640 410 670 400 680 390Z" fill="#eec4a2" />
        </g>
      </svg>
      <Title top={240} size={220} color={MYEL} opacity={out(f, dur * 0.3, dur * 0.5)}>
        1%
      </Title>
      <Title top={1260} size={60} color="#ccc" opacity={out(f, dur * 0.5, dur * 0.7)}>
        শুধু মুখের কথা
      </Title>
    </AbsoluteFill>
  );
};

const Never: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const cross = out(f, dur * 0.2, dur * 0.4);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <div style={{position: 'absolute', top: 440, left: 0, right: 0, textAlign: 'center', fontFamily: 'Arial Black, Arial', fontSize: 380, color: '#555'}}>
        <span style={{position: 'relative'}}>
          1%
          <span style={{position: 'absolute', left: -30, right: -30, top: '48%', height: 34, background: RED, transform: `scaleX(${cross}) rotate(-10deg)`, transformOrigin: 'left'}} />
        </span>
      </div>
      <Title top={1050} size={150} color={RED} opacity={out(f, dur * 0.45, dur * 0.6)}>
        $0
      </Title>
    </AbsoluteFill>
  );
};

const Worth: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(95,158,90,0.18)" />
      {Array.from({length: 26}, (_, i) => {
        const t = Math.max(0, f - i * 2);
        return <Bill key={i} size={150} style={{position: 'absolute', left: 40 + ((i * 131) % 900), top: -120 + t * (9 + (i % 4)), transform: `rotate(${t * (i % 2 ? 4 : -4)}deg)`}} />;
      })}
      <Title top={760} size={110} color={GREEN} opacity={out(f, dur * 0.2, dur * 0.4)}>
        বছরে কোটি কোটি $
      </Title>
    </AbsoluteFill>
  );
};

// সাইন থেকে নাম খুলে নেওয়া
const More: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const off = inOut(f, dur * 0.45, dur * 0.85);
  return (
    <AbsoluteFill>
      <Street dusk={1} />
      <div style={{position: 'absolute', left: 90, top: 330}}>
        <BurgerStand width={900} sign={off > 0.5 ? '' : "McDONALD'S"} />
      </div>
      <Place x={200} y={1600}>
        <Person height={620} {...MAC} brow="worried" mouth="tense" armR={130} />
      </Place>
      <Title top={150} size={76} color={MYEL} opacity={out(f, 2, 12)}>
        আরও আছে…
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const BigM: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 4, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <Street dusk={1} />
      <div style={{position: 'absolute', left: 90, top: 330}}>
        <BurgerStand width={900} sign="THE BIG M" bright={0.6} />
      </div>
      <div style={{position: 'absolute', top: 1260, left: 0, right: 0, textAlign: 'center', transform: `scale(${pop})`}}>
        <span style={{fontFamily: 'Arial Black, Arial', fontSize: 110, color: MYEL, background: 'rgba(0,0,0,0.6)', padding: '10px 40px', borderRadius: 14}}>"THE BIG M"</span>
      </div>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

// সামনে নতুন উজ্জ্বল McDonald's
const Across: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const rise = spring({frame: f - dur * 0.25, fps: 30, config: {damping: 14}});
  return (
    <AbsoluteFill>
      <Street dusk={1} />
      <div style={{position: 'absolute', left: 20, top: 640, opacity: 0.8}}>
        <BurgerStand width={480} sign="THE BIG M" bright={0.4} />
      </div>
      <div style={{position: 'absolute', left: 520, top: 520 + (1 - rise) * 600, opacity: rise}}>
        <BurgerStand width={560} bright={1.3} />
      </div>
      <AbsoluteFill style={{background: `radial-gradient(ellipse 400px 500px at 800px 800px, rgba(246,192,38,${0.25 * rise}), rgba(0,0,0,0) 70%)`}} />
      <Title top={200} size={80} color={MYEL} opacity={out(f, dur * 0.5, dur * 0.7)}>
        ঠিক সামনেই!
      </Title>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Dead: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Street dusk={1} />
      <div style={{position: 'absolute', left: 90, top: 330, filter: `grayscale(${out(f, 0, dur * 0.5)})`}}>
        <BurgerStand width={900} sign="THE BIG M" closed={out(f, dur * 0.3, dur * 0.5)} />
      </div>
      <Brothers y={1620} h={600} mood="worried" mouth="tense" />
      <Vignette color="20,0,4" strength={0.75} />
    </AbsoluteFill>
  );
};

const Hose: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain glow="rgba(214,40,40,0.14)" />
      <Cam zoom={interpolate(f, [0, dur], [1.7, 1.9])} x={540} y={800}>
        <Place x={540} y={1560}>
          <Person height={1000} {...KROC} mouth="smile" />
        </Place>
      </Cam>
      <div style={{position: 'absolute', left: 60, right: 60, top: 220, padding: '34px 40px', background: 'rgba(0,0,0,0.72)', borderLeft: `10px solid ${MRED}`, opacity: out(f, 2, 14)}}>
        <div style={{fontSize: 58, fontWeight: 800, lineHeight: 1.35}}>"প্রতিদ্বন্দ্বী ডুবতে থাকলে, আমি তার মুখে পানির পাইপ ঢুকিয়ে দেব।"</div>
        <div style={{marginTop: 16, fontSize: 38, color: GOLD}}>— Ray Kroc</div>
      </div>
      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};

// জমির পর জমি, সব McD
const Empire: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [0, dur * 0.8], [1, 20], clampOpts));
  return (
    <AbsoluteFill>
      <Plain glow="rgba(106,143,58,0.15)" />
      <div style={{position: 'absolute', top: 260, left: 40, right: 40, display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center'}}>
        {Array.from({length: 20}, (_, i) => (
          <div key={i} style={{opacity: i < n ? 1 : 0.08}}>
            <LandPlot size={220} sold={i < n ? 1 : 0} owner="McD" />
          </div>
        ))}
      </div>
      <Title top={1280} size={72} color={GREEN} opacity={out(f, dur * 0.4, dur * 0.6)}>
        দুনিয়ার সবচেয়ে বড় জমির মালিকদের একটা
      </Title>
    </AbsoluteFill>
  );
};

const Moral: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const right = out(f, dur * 0.45, dur * 0.6);
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 0, top: 0, width: 540, height: 1920, background: 'rgba(246,192,38,0.06)'}} />
      <div style={{position: 'absolute', left: 70, top: 380}}>
        <Burger size={400} />
      </div>
      <Brothers x1={150} x2={390} h={560} y={1340} />
      <div style={{position: 'absolute', left: 600, top: 330, opacity: right}}>
        <LandPlot size={420} sold={1} owner="McD" />
      </div>
      <div style={{position: 'absolute', left: 600, top: 680, width: 420, textAlign: 'center', fontFamily: 'Arial Black, Arial', fontSize: 52, color: MYEL, opacity: right}}>McDONALD'S</div>
      <Place x={810} y={1340}>
        <div style={{opacity: right}}>
          <Person height={640} {...KROC} mouth="smile" />
        </div>
      </Place>
      <Title top={1400} size={60} color={GOLD} opacity={out(f, 4, 14)}>
        <span style={{display: 'inline-block', width: 480}}>সেরা বার্গার</span>
        <span style={{display: 'inline-block', width: 480, opacity: right}}>মাটি আর নাম</span>
      </Title>
    </AbsoluteFill>
  );
};

const Engine: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  const key = spring({frame: f - dur * 0.5, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(246,192,38,0.12)" />
      <div style={{position: 'absolute', left: 250, top: 320}}>
        <Gear size={420} rot={f * 2} />
      </div>
      <div style={{position: 'absolute', left: 600, top: 600}}>
        <Gear size={240} rot={-f * 3.5} color={MRED} />
      </div>
      <Title top={880} size={80} color={MYEL} opacity={out(f, dur * 0.15, dur * 0.3)}>
        তোমার টাকার ইঞ্জিন?
      </Title>
      <div style={{position: 'absolute', top: 1060, left: 0, right: 0, textAlign: 'center', fontSize: 170, transform: `scale(${key})`}}>🔑</div>
      <Place x={540} y={1650}>
        <Person height={420} {...LOOKS[0]} />
      </Place>
    </AbsoluteFill>
  );
};

const Paper: React.FC<SP> = ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plain />
      <div style={{position: 'absolute', left: 280, top: 260, transform: 'rotate(-3deg)'}}>
        <Contract size={520} lines={7} sign={inOut(f, dur * 0.3, dur * 0.7)} title="AGREEMENT" stamp="SIGNED" stampO={out(f, dur * 0.75, dur * 0.88)} />
      </div>
      <Place x={260} y={1620}>
        <Person height={480} {...LOOKS[3]} />
      </Place>
      <Place x={820} y={1620}>
        <Person height={480} {...LOOKS[1]} />
      </Place>
      <Title top={950} size={66} color={CREAM} opacity={out(f, dur * 0.1, dur * 0.25)}>
        মুখের কথা না, কাগজে
      </Title>
    </AbsoluteFill>
  );
};

const Cta: React.FC<SP> = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow="rgba(246,192,38,0.12)" />
      <div style={{position: 'absolute', left: 300, top: 800, opacity: 0.4}}>
        <BurgerStand width={480} sign="THE BIG M" closed={1} />
      </div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  erase: Erase,
  salesman: Salesman,
  stand: Stand,
  brothers: BrothersScene,
  speed: Speed,
  queue: Queue,
  kroc: Kroc,
  eyes: Eyes,
  deal: Deal,
  game: Game,
  land: Land,
  rent: Rent,
  quote: Quote,
  buyout: Buyout,
  promise: PromiseScene,
  never: Never,
  worth: Worth,
  more: More,
  bigm: BigM,
  across: Across,
  dead: Dead,
  hose: Hose,
  empire: Empire,
  moral: Moral,
  engine: Engine,
  paper: Paper,
  cta: Cta,
};

export const McDonaldsScene: React.FC<{seg: McSegment; dur: number}> = ({seg, dur}) => {
  const C = SCENES[seg.visual];
  return C ? <C dur={dur} id={seg.id} /> : null;
};

export {FG, PersonIcon};
