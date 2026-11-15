// বাঙালির সন্দেহ কখনো মিথ্যা হয় না: পারশা ও আসাদ নূর (Law 10)
import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, GREEN, RED, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Bounce, Cta, R, lawBook, story} from '../common/reel';
import {Notice} from '../common/laws48';
import raw from './segments.json';

const LINE = '#1b1b1f';

// ছবি পুরো পর্দায়, ধীরে কাছে আসে (Ken Burns)
const Photo: React.FC<{
  src: string;
  dur: number;
  zoom?: [number, number];
  origin?: string;
  fit?: 'cover' | 'contain';
  dim?: number;
  pos?: string;
}> = ({
  src,
  dur,
  zoom = [1, 1.08],
  origin = '50% 40%',
  fit = 'cover',
  dim = 0,
  pos = '50% 50%'
}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, clampOpts);
  return (
    <AbsoluteFill style={{background: '#0b0d12', overflow: 'hidden'}}>
      {fit === 'contain' ? (
        <Img
          src={staticFile(src)}
          style={{
            position: 'absolute',
            inset: 0,
            width: 1080,
            height: 1920,
            objectFit: 'cover',
            filter: 'blur(40px) brightness(0.45)',
            transform: 'scale(1.2)'
          }}
        />
      ) : null}
      <Img
        src={staticFile(src)}
        style={{
          position: 'absolute',
          inset: 0,
          width: 1080,
          height: 1920,
          objectFit: fit,
          objectPosition: pos,
          transform: `scale(${z})`,
          transformOrigin: origin
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(11,13,18,0.6) 0%, rgba(11,13,18,0.1) 25%, rgba(11,13,18,0.1) 60%, rgba(11,13,18,0.9) 100%)'
        }}
      />
      {dim ? <AbsoluteFill style={{background: `rgba(5,6,10,${dim})`}} /> : null}
    </AbsoluteFill>
  );
};

// আসাদ নূরের লাইভ ভিডিও ক্লিপ
const Clip: React.FC<{from: number; blur?: boolean; badge?: string}> = ({from, blur, badge = '● আসাদ নূরের লাইভ'}) => {
  const f = useCurrentFrame();
  const t = from + f / 30;
  const W = 1500;
  const H = (W * 720) / 1600;
  const video = (style: React.CSSProperties) => (
    <OffthreadVideo
      src={staticFile('parsha3/asad.mp4')}
      trimBefore={Math.round(from * 30)}
      muted
      style={{position: 'absolute', inset: 0, width: '100%', height: '100%', ...style}}
    />
  );
  return (
    <AbsoluteFill style={{background: '#0b0d12', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: (1080 - W) / 2, top: 1080 - H / 2, width: W, height: H}}>
        {video({})}
        {blur ? (
          <>
            {t < 2.95 ? video({filter: 'blur(30px)', clipPath: 'ellipse(9% 24% at 48% 21%)'}) : null}
            {t > 2.2 ? video({filter: 'blur(30px)', clipPath: 'ellipse(8% 22% at 63% 20%)'}) : null}
          </>
        ) : null}
      </div>
      <div style={{position: 'absolute', right: 40, top: 170, display: 'flex', gap: 12, fontSize: 40, fontWeight: 800, color: '#fff'}}>
        <span style={{padding: '8px 24px', borderRadius: 14, background: '#e0243c', boxShadow: '0 4px 20px rgba(224,36,60,0.6)'}}>
          {badge}
        </span>
      </div>
    </AbsoluteFill>
  );
};

const photo = (
  src: string,
  title?: string,
  color = GOLD,
  o: {zoom?: [number, number]; origin?: string; fit?: 'cover' | 'contain'; dim?: number; pos?: string} = {}
): React.FC<SP> => ({dur, id}) => {
  const P = R({place: <Photo src={src} dur={dur} {...o} />, title, color, vig: 0.25});
  return <P dur={dur} id={id} />;
};

// ললিপপ পোস্টের স্ক্রিনশট
const LollyShot: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, dur], [1, 1.18], clampOpts);
  const W = 900;
  return (
    <div
      style={{
        position: 'absolute',
        left: 90,
        top: 220,
        width: W,
        height: (W * 999) / 706,
        overflow: 'hidden',
        borderRadius: 28,
        border: `6px solid ${LINE}`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.85)'
      }}
    >
      <Img src={staticFile('parsha/lolly-post.jpg')} style={{width: W, transform: `scale(${z})`, transformOrigin: '50% 0%'}} />
    </div>
  );
};

// ইনস্টাগ্রাম স্কেচ পোস্ট
const InstaShot: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 8, fps: 30, config: {damping: 12}});
  const W = 880;
  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        top: 360,
        width: W,
        height: (W * 1080) / 984,
        transform: `scale(${0.85 + 0.15 * s})`,
        opacity: s,
        borderRadius: 28,
        overflow: 'hidden',
        border: `6px solid ${LINE}`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.85)'
      }}
    >
      <Img src={staticFile('parsha3/insta.jpg')} style={{width: W}} />
    </div>
  );
};

// বড় প্রশ্নচিহ্ন
const BigQ: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 20, fps: 30, config: {damping: 9}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 520,
        textAlign: 'center',
        fontSize: 480,
        fontWeight: 900,
        color: RED,
        transform: `scale(${s})`,
        textShadow: '0 20px 60px rgba(0,0,0,0.8)'
      }}
    >
      ?
    </div>
  );
};

// সুন্দর স্টাইলিশ গ্লাস কার্ড
const GlassBox: React.FC<{
  title: string;
  sub?: string;
  color?: string;
  borderColor?: string;
  bg?: string;
}> = ({title, sub, color = '#fff', borderColor = 'rgba(255,255,255,0.25)', bg = 'rgba(15,20,30,0.85)'}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 12}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top: 560,
        padding: '44px 48px',
        background: bg,
        backdropFilter: 'blur(25px)',
        borderRadius: 32,
        border: `3px solid ${borderColor}`,
        boxShadow: '0 30px 90px rgba(0,0,0,0.85)',
        textAlign: 'center',
        transform: `scale(${0.85 + 0.15 * pop})`,
        opacity: pop
      }}
    >
      <div style={{fontSize: 76, fontWeight: 900, color, lineHeight: 1.28}}>{title}</div>
      {sub ? <div style={{fontSize: 46, fontWeight: 700, color: '#cbd5e1', marginTop: 18}}>{sub}</div> : null}
    </div>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  // ১. হুক
  h1: photo('parsha3/veil.jpg', 'বাঙালির সন্দেহ সত্য হলো', RED, {zoom: [1.0, 1.14], origin: '60% 35%', pos: '72% 50%'}),
  h2: photo('parsha3/veil.jpg', 'পদ্মফুলে ঢাকা বরের মুখ', GOLD, {zoom: [1.14, 1.32], origin: '68% 30%', pos: '72% 50%'}),
  h3: photo('parsha3/wed.jpg', 'আসাদ নূরের সরাসরি স্বীকারোক্তি', RED, {zoom: [1.05, 1.2], origin: '70% 25%', pos: '72% 50%'}),

  // ২. পেছনের ঘটনা
  wed: photo('parsha3/romantic.jpg', 'অক্টোবরের শেষে বিয়ে', GOLD, {zoom: [1, 1.08], origin: '50% 30%'}),
  photo: photo('parsha3/veil.jpg', 'বরের মুখের সামনে পদ্মফুল', RED, {zoom: [1.0, 1.15], origin: '68% 35%', pos: '72% 50%'}),
  caption: ({dur, id}) => {
    const P = R({
      place: <Photo src="parsha3/veil.jpg" dur={dur} dim={0.7} />,
      over: (f, d) => <LollyShot dur={d} />,
      title: 'ললিপপ ও পর্দার ক্যাপশন',
      color: GOLD
    });
    return <P dur={dur} id={id} />;
  },

  // ৩. বিশ্বাসে আঘাত (কখনো খালি ব্যাকগ্রাউন্ড না)
  attack: ({dur, id}) => {
    const P = R({
      place: <Photo src="parsha3/veil.jpg" dur={dur} dim={0.65} />,
      over: () => (
        <GlassBox
          title="৯০% মুসলমানের বিশ্বাসে আঘাত"
          sub="পর্দা নিয়ে প্রকাশ্য ঠাট্টা"
          color="#fee2e2"
          borderColor="#ef4444"
          bg="rgba(40,10,15,0.9)"
        />
      ),
      title: 'তীব্র বিতর্ক',
      color: RED
    });
    return <P dur={dur} id={id} />;
  },

  // ৪. দর্শকের নজর বরে
  body: ({dur, id}) => {
    const P = R({
      place: <Photo src="parsha/lolly-post.jpg" dur={dur} fit="contain" dim={0.5} />,
      over: () => (
        <GlassBox
          title="ক্যাপশন নয়, আসল নজর বরে"
          sub="সোশ্যাল মিডিয়ায় তুমুল খোঁজ"
          color="#fef08a"
          borderColor="#eab308"
        />
      ),
      title: 'সবার নজর বর কে?',
      color: GOLD
    });
    return <P dur={dur} id={id} />;
  },

  // ৫. বরের শরীর ও সূত্র
  storm: photo('parsha3/veil.jpg', 'চোখ আটকে গেল বরের ওপর', RED, {zoom: [1.15, 1.35], origin: '70% 28%', pos: '72% 50%', dim: 0.25}),
  clue: ({dur, id}) => {
    const P = R({
      place: <Photo src="parsha3/veil.jpg" dur={dur} dim={0.75} />,
      title: 'হাতের ঘড়ি, পাঞ্জাবি ও স্কেচ',
      color: GOLD,
      over: () => <InstaShot />
    });
    return <P dur={dur} id={id} />;
  },
  doubt: photo('parsha3/wed.jpg', 'এই মানুষটা আসাদ নূর', RED, {zoom: [1.05, 1.2], origin: '70% 25%', pos: '72% 50%'}),

  // ৬. অভিনেত্রীর রুচির পতন?
  laugh1: ({dur, id}) => {
    const P = R({
      place: <Photo src="parsha3/romantic.jpg" dur={dur} dim={0.65} />,
      over: () => (
        <GlassBox
          title="অভিনেত্রীর রুচির কি এতটা পতন?"
          sub="বিশ্বাস করতে পারছিল না কেউ"
          color="#fee2e2"
          borderColor="#f87171"
          bg="rgba(35,12,18,0.9)"
        />
      ),
      title: 'অবিশ্বাস',
      color: RED
    });
    return <P dur={dur} id={id} />;
  },
  laugh2: ({dur, id}) => {
    const P = R({
      place: <Photo src="parsha3/wed.jpg" dur={dur} dim={0.65} />,
      over: () => (
        <GlassBox
          title="যাঁর জীবন গেল ধর্মবিদ্বেষে?"
          sub="তাঁকেই বিয়ে করলেন তিনি?"
          color="#fef08a"
          borderColor="#eab308"
        />
      ),
      title: 'প্রশ্ন সবার মুখে',
      color: GOLD
    });
    return <P dur={dur} id={id} />;
  },

  // ৭. লাইভে আসাদ নূর
  live: () => <Clip from={0.3} badge="● লাইভে আসাদ নূর" />,
  proof: ({dur, id}) => {
    return (
      <AbsoluteFill>
        <Clip from={2.2} badge="● আসল পাঞ্জাবি ও শাড়ি" />
        <Bounce x={110} y={420} at={5} seed="p1">
          <Notice text="পরনে বিয়ের সেই পাঞ্জাবি" w={860} />
        </Bounce>
        <Bounce x={110} y={640} at={Math.round(dur * 0.45)} seed="p2">
          <Notice text="হাতে লাল পাড়ের শাড়ি" w={860} />
        </Bounce>
      </AbsoluteFill>
    );
  },
  confess: photo('parsha3/wed.jpg', 'স্বীকার করলেন: বিয়ে করেছি', GREEN, {zoom: [1.05, 1.2], origin: '65% 25%', pos: '65% 50%'}),

  // ৮. জট খুলল
  solve: photo('parsha3/romantic.jpg', 'রহস্যের জট খুলে গেল', GOLD, {zoom: [1.0, 1.1], origin: '50% 30%'}),
  reveal_why: photo('parsha3/veil.jpg', 'কেন উস্কানিমূলক পোস্ট?', RED, {zoom: [1.0, 1.15], origin: '60% 40%', pos: '65% 50%', dim: 0.3}),
  taste: ({dur, id}) => {
    const P = R({
      place: <Photo src="parsha3/wed.jpg" dur={dur} dim={0.6} />,
      over: () => (
        <GlassBox
          title="মানুষের চিন্তা ও রুচি গড়ে ওঠে তার সঙ্গ দিয়ে"
          sub="সঙ্গই আসল পরিচয়"
          color="#fef08a"
          borderColor="#eab308"
          bg="rgba(25,20,10,0.92)"
        />
      ),
      title: 'আসল রহস্য',
      color: GOLD
    });
    return <P dur={dur} id={id} />;
  },

  // ৯. মুখ ঢাকা যায়, উদ্দেশ্য না
  face1: photo('parsha3/veil.jpg', 'মুখ পদ্মফুলে ঢাকা যায়', GOLD, {zoom: [1.0, 1.14], origin: '68% 30%', pos: '72% 50%'}),
  face2: photo('parsha3/wed.jpg', 'উদ্দেশ্য কখনো ঢাকা যায় না', RED, {zoom: [1.1, 1.25], origin: '60% 35%', pos: '70% 50%'}),

  // ১০. বই ও শিক্ষা
  book: lawBook(10),
  lesson: photo('parsha3/wed.jpg', 'শিক্ষাটা সোজা', GOLD, {zoom: [1.0, 1.06], origin: '50% 50%', dim: 0.65}),
  act: ({dur, id}) => {
    const P = R({
      place: <Photo src="parsha3/romantic.jpg" dur={dur} dim={0.65} />,
      over: () => (
        <GlassBox
          title="কাকে পাশে বসাচ্ছো, আজই ভাবো"
          sub="ভুল সঙ্গ তোমাকেও ডুবিয়ে দেবে"
          color="#bbf7d0"
          borderColor="#22c55e"
          bg="rgba(10,25,18,0.92)"
        />
      ),
      title: 'নিজের জন্য শিক্ষা',
      color: GREEN
    });
    return <P dur={dur} id={id} />;
  },
  cta: () => <Cta />
};

const Thumb: React.FC = () => (
  <PsyThumb
    l1="বাঙালির সন্দেহ সত্য হলো"
    l2="মুখোশ খুলল লাইভে!"
    bottom="সঙ্গ কখনো গোপন থাকে না"
    term="48 Laws · Law 10"
    art={
      <div style={{position: 'absolute', left: 0, top: 820, width: 640, height: 820, overflow: 'hidden', borderRadius: 30}}>
        <Img src={staticFile('parsha3/veil.jpg')} style={{width: 640, height: 820, objectFit: 'cover', objectPosition: '62% 30%'}} />
        <BigQ />
      </div>
    }
    size={80}
  />
);

export const parsha3 = story('parsha3/', raw, SCENES, Thumb, {logo: 'bba2'});
