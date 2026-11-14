// 5G, 4G, 3G, 2G, 1G & Pandemics Timeline Mystery — FiveG
// ভয়েস: Cartesia sonic-3.6 | সিনেমাটিক ডার্ক থ্রিলার ফটোগ্রাফি ও এলিগ্যান্ট মোশন গ্রাফিক্স
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {GOLD, RED, GREEN, clampOpts} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Bounce, Cta, R, story} from '../common/reel';
import raw from './segments.json';

const CYAN = '#38bdf8';
const DARK_OVERLAY = 'linear-gradient(180deg, rgba(7,10,18,0.78) 0%, rgba(7,10,18,0.12) 22%, rgba(7,10,18,0.12) 60%, rgba(7,10,18,0.94) 100%)';

const BN = '০১২৩৪৫৬৭৮৯';
const bn = (n: number | string) => String(n).replace(/\d/g, (d) => BN[Number(d)]);

// ১. ফুল-স্ক্রিন সিনেমাটিক ফটো + কেন বার্নস জুম + সেফ ভিনিয়েট
const Photo: React.FC<{
  src: string;
  dur: number;
  zoom?: [number, number];
  origin?: string;
  dim?: number;
  pos?: string;
}> = ({src, dur, zoom = [1, 1.08], origin = '50% 45%', dim = 0, pos = '50% 50%'}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, Math.max(1, dur)], zoom, clampOpts);
  return (
    <AbsoluteFill style={{background: '#07090e', overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{
          position: 'absolute',
          inset: 0,
          width: 1080,
          height: 1920,
          objectFit: 'cover',
          objectPosition: pos,
          transform: `scale(${z})`,
          transformOrigin: origin,
        }}
      />
      {/* সিনেমাটিক ওভারলে যাতে সাবটাইটেল এবং টপ ব্যাজ একদম ক্রিস্টাল ক্লিয়ার থাকে */}
      <AbsoluteFill style={{background: DARK_OVERLAY}} />
      {dim ? <AbsoluteFill style={{background: `rgba(5,7,12,${dim})`}} /> : null}
    </AbsoluteFill>
  );
};

// ২. প্রিমিয়াম স্লিম টপ ব্যাজ (সাবটাইটেল বা অন্য কোনো লেখার সাথে কখনো ধাক্কা খাবে না)
const SleekBadge: React.FC<{title: string; sub?: string; color?: string; top?: number}> = ({
  title,
  sub,
  color = GOLD,
  top = 175,
}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 12, stiffness: 160}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        right: 40,
        top,
        textAlign: 'center',
        transform: `scale(${s})`,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {sub ? (
        <div>
          <span
            style={{
              display: 'inline-block',
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#94a3b8',
              background: 'rgba(10,15,26,0.85)',
              padding: '4px 18px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.12)',
              marginBottom: 8,
              backdropFilter: 'blur(8px)',
            }}
          >
            {sub}
          </span>
        </div>
      ) : null}
      <div>
        <span
          style={{
            display: 'inline-block',
            fontSize: 44,
            fontWeight: 900,
            lineHeight: 1.28,
            color,
            textShadow: '0 6px 24px rgba(0,0,0,0.9)',
            background: 'rgba(8,12,22,0.88)',
            padding: '8px 28px',
            borderRadius: 20,
            border: `2px solid ${color}44`,
            boxShadow: '0 12px 35px rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

// ৩. এলিগ্যান্ট গ্লাস কম্প্যারিজন পিল (নেটওয়ার্ক ══► মহামারী)
const ComparisonPill: React.FC<{
  gen: string;
  year: string;
  pan: string;
  panYear: string;
  color?: string;
  panColor?: string;
  top?: number;
}> = ({gen, year, pan, panYear, color = CYAN, panColor = RED, top = 420}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 11, stiffness: 150}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 50,
        right: 50,
        top,
        transform: `scale(${pop})`,
        zIndex: 5,
      }}
    >
      <div
        style={{
          background: 'rgba(9, 14, 26, 0.88)',
          borderRadius: 24,
          border: `2px solid ${color}55`,
          boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${color}22`,
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* নেটওয়ার্ক */}
        <div style={{flex: 1, textAlign: 'center'}}>
          <div style={{fontSize: 24, fontWeight: 800, color: '#94a3b8', letterSpacing: 1.5}}>মোবাইল প্রযুক্তি</div>
          <div style={{fontSize: 42, fontWeight: 900, color, marginTop: 4}}>{gen}</div>
          <div
            style={{
              display: 'inline-block',
              marginTop: 6,
              fontSize: 26,
              fontWeight: 800,
              color: '#fff',
              background: 'rgba(255,255,255,0.08)',
              padding: '4px 14px',
              borderRadius: 10,
            }}
          >
            {bn(year)} সাল
          </div>
        </div>

        {/* মাঝের সমান সাইন */}
        <div style={{padding: '0 16px', textAlign: 'center'}}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: `2px solid ${GOLD}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 900,
              color: GOLD,
            }}
          >
            =
          </div>
        </div>

        {/* মহামারী */}
        <div style={{flex: 1, textAlign: 'center'}}>
          <div style={{fontSize: 24, fontWeight: 800, color: '#94a3b8', letterSpacing: 1.5}}>বিশ্ব মহামারী</div>
          <div style={{fontSize: 40, fontWeight: 900, color: panColor, marginTop: 4}}>{pan}</div>
          <div
            style={{
              display: 'inline-block',
              marginTop: 6,
              fontSize: 26,
              fontWeight: 800,
              color: '#fff',
              background: `${panColor}22`,
              border: `1px solid ${panColor}44`,
              padding: '4px 14px',
              borderRadius: 10,
            }}
          >
            {bn(panYear)} সাল
          </div>
        </div>
      </div>
    </div>
  );
};

// ৪. মাস্টার টাইমলাইন স্ট্যাক (৫টি মাইলফলক)
const MasterTimelineStack: React.FC = () => {
  const f = useCurrentFrame();
  const rows = [
    {gen: '1G সেলুলার', year: '১৯৭৯', pan: 'রাশিয়ান ফ্লু', color: '#94a3b8'},
    {gen: '2G ডিজিটাল', year: '১৯৯১', pan: 'ইনফ্লুয়েঞ্জা এ', color: '#38bdf8'},
    {gen: '3G ব্রডব্যান্ড', year: '১৯৯৮', pan: 'ইনফ্লুয়েঞ্জা মহামারী', color: '#818cf8'},
    {gen: '4G আল্ট্রা-স্পিড', year: '২০০৯', pan: 'সোয়াইন ফ্লু (H1N1)', color: '#f59e0b'},
    {gen: '5G হাই-ফ্রিকোয়েন্সি', year: '২০১৯', pan: 'কোভিড-১৯', color: '#ef4444'},
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: 50,
        right: 50,
        top: 340,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        zIndex: 5,
      }}
    >
      {rows.map((r, i) => {
        const itemSpring = spring({
          frame: f - i * 5,
          fps: 30,
          config: {damping: 12, stiffness: 160},
        });
        return (
          <div
            key={i}
            style={{
              background: 'rgba(9, 14, 26, 0.92)',
              borderRadius: 18,
              padding: '16px 22px',
              border: `1.5px solid ${r.color}55`,
              boxShadow: `0 8px 24px rgba(0,0,0,0.6)`,
              transform: `scale(${itemSpring})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <div style={{fontSize: 28, fontWeight: 900, color: r.color, minWidth: 150}}>
                {r.gen}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#fff',
                  background: 'rgba(255,255,255,0.08)',
                  padding: '3px 12px',
                  borderRadius: 8,
                }}
              >
                {r.year}
              </div>
            </div>

            <div style={{fontSize: 22, color: GOLD, fontWeight: 900}}>──►</div>

            <div style={{fontSize: 28, fontWeight: 900, color: RED, textAlign: 'right'}}>
              {r.pan}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ৫. সিক্স জি ২০৩০ মিস্ট্রি কার্ড
const SixGAlertCard: React.FC = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 11, stiffness: 140}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        top: 420,
        background: 'rgba(9, 13, 24, 0.94)',
        borderRadius: 32,
        border: `3px solid ${RED}`,
        boxShadow: '0 25px 70px rgba(0,0,0,0.9), 0 0 50px rgba(239,68,68,0.35)',
        padding: '48px 36px',
        textAlign: 'center',
        transform: `scale(${pop})`,
        backdropFilter: 'blur(12px)',
        zIndex: 5,
      }}
    >
      <div style={{fontSize: 28, fontWeight: 900, color: '#94a3b8', letterSpacing: 4}}>পরবর্তী বৈশ্বিক আপগ্রেড</div>
      <div
        style={{
          fontSize: 110,
          fontWeight: 900,
          color: '#fff',
          marginTop: 6,
          textShadow: '0 0 35px rgba(255,255,255,0.8), 0 0 60px rgba(239,68,68,0.7)',
        }}
      >
        6G
      </div>
      <div
        style={{
          display: 'inline-block',
          fontSize: 48,
          fontWeight: 900,
          color: GOLD,
          background: 'rgba(245,158,11,0.12)',
          border: `2px solid ${GOLD}`,
          padding: '10px 32px',
          borderRadius: 18,
          marginTop: 10,
        }}
      >
        ২০৩০ সাল
      </div>
      <div
        style={{
          marginTop: 26,
          fontSize: 36,
          fontWeight: 800,
          color: RED,
          letterSpacing: 1,
        }}
      >
        তখন কী ঘটবে?
      </div>
    </div>
  );
};

// ৬. আর্থার ফার্স্টেনবার্গ বই কার্ড
const BookGlassPill: React.FC = () => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 11, stiffness: 150}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 50,
        top: 360,
        width: 580,
        background: 'rgba(10, 16, 28, 0.94)',
        borderRadius: 24,
        border: `3px solid ${GOLD}`,
        boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 30px rgba(245,158,11,0.25)',
        padding: '36px 30px',
        transform: `scale(${pop})`,
        textAlign: 'center',
        backdropFilter: 'blur(12px)',
        zIndex: 5,
      }}
    >
      <div style={{fontSize: 22, fontWeight: 800, color: '#94a3b8', letterSpacing: 2}}>ঐতিহাসিক গবেষণামূলক বই</div>
      <div
        style={{
          fontSize: 42,
          fontWeight: 900,
          color: GOLD,
          lineHeight: 1.25,
          marginTop: 10,
        }}
      >
        The Invisible Rainbow
      </div>
      <div
        style={{
          fontSize: 24,
          color: '#cbd5e1',
          marginTop: 6,
          fontStyle: 'italic',
        }}
      >
        A History of Electricity and Life
      </div>
      <div
        style={{
          display: 'inline-block',
          marginTop: 16,
          fontSize: 28,
          fontWeight: 800,
          color: '#fff',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.18)',
          padding: '6px 20px',
          borderRadius: 12,
        }}
      >
        Arthur Firstenberg
      </div>
    </div>
  );
};

// ৭. দৃশ্য ক্যাটালগ
const SCENES: Record<string, React.FC<SP>> = {
  // ১. হুক: ল্যাপটপ স্ক্রিনের সামনে কাঁপা হাত
  h1: R({
    place: <Photo src="fiveg/h1.jpg" dur={120} zoom={[1.0, 1.08]} />,
    over: () => (
      <SleekBadge title="ল্যাপটপ স্ক্রিনে গোপন রহস্য" sub="Shocking Discovery" color={GOLD} top={175} />
    ),
  }),

  // ২. 5G বনাম কোভিড (২০১৯)
  fiveg_cov: R({
    place: <Photo src="fiveg/fiveg.jpg" dur={240} zoom={[1.0, 1.09]} />,
    over: () => (
      <>
        <SleekBadge title="২০১৯: 5G এবং কোভিড-১৯" sub="Generation 5" color={CYAN} top={175} />
        <ComparisonPill gen="5G নেটওয়ার্ক" year="2019" pan="কোভিড-১৯" panYear="2019" color={CYAN} panColor={RED} top={400} />
      </>
    ),
  }),

  // ৩. কোনো কাকতালীয় ঘটনা নয়
  tanvir_reply: R({
    place: <Photo src="fiveg/investigation.jpg" dur={150} zoom={[1.02, 1.08]} />,
    over: () => (
      <SleekBadge title="কোনো কাকতালীয় ঘটনা নয়!" sub="Investigation" color={GOLD} top={175} />
    ),
  }),

  // ৪. 4G এসেছিল ২০০৯ সালে
  fourg_year: R({
    place: <Photo src="fiveg/fourg.jpg" dur={90} zoom={[1.0, 1.07]} />,
    over: () => (
      <SleekBadge title="২০০৯: 4G নেটওয়ার্ক চালু" sub="Generation 4" color={CYAN} top={175} />
    ),
  }),

  // ৫. সোয়াইন ফ্লু কবে এলো?
  swine_q: R({
    place: <Photo src="fiveg/investigation.jpg" dur={90} zoom={[1.06, 1.12]} origin="60% 40%" />,
    over: () => (
      <SleekBadge title="সোয়াইন ফ্লু কবে পৃথিবীতে এলো?" sub="History Check" color={GOLD} top={175} />
    ),
  }),

  // ৬. ২০০৯ সালে সোয়াইন ফ্লু!
  swine_shock: R({
    place: <Photo src="fiveg/swine.jpg" dur={110} zoom={[1.0, 1.08]} />,
    over: () => (
      <>
        <SleekBadge title="২০০৯: সোয়াইন ফ্লু ও 4G!" sub="Shocking Coincidence" color={RED} top={175} />
        <ComparisonPill gen="4G নেটওয়ার্ক" year="2009" pan="সোয়াইন ফ্লু (H1N1)" panYear="2009" color={CYAN} panColor={RED} top={400} />
      </>
    ),
  }),

  // ৭. এবার ৩জি-র সাল দেখ
  threeg_search: R({
    place: <Photo src="fiveg/investigation.jpg" dur={60} zoom={[1.08, 1.14]} origin="40% 60%" />,
    over: () => (
      <SleekBadge title="এবার ৩জি-র সালটা দেখ!" sub="Generation 3" color={GOLD} top={175} />
    ),
  }),

  // ৮. ১৯৯৮: 3G ও ইনফ্লুয়েঞ্জা
  threeg_flu: R({
    place: <Photo src="fiveg/threeg.jpg" dur={220} zoom={[1.0, 1.09]} />,
    over: () => (
      <>
        <SleekBadge title="১৯৯৮: 3G ও ইনফ্লুয়েঞ্জা" sub="Double Match" color={CYAN} top={175} />
        <ComparisonPill gen="3G (প্রি-কমার্শিয়াল)" year="1998" pan="ইনফ্লুয়েঞ্জা ফ্লু" panYear="1998" color={CYAN} panColor={RED} top={400} />
      </>
    ),
  }),

  // ৯. এবার ২জি ও ১জি দেখ
  twog_oneg_cmd: R({
    place: <Photo src="fiveg/investigation.jpg" dur={70} zoom={[1.04, 1.1]} />,
    over: () => (
      <SleekBadge title="আরও অতীতে: ২জি ও ১জি" sub="Going Deeper" color={GOLD} top={175} />
    ),
  }),

  // ১০. ১৯৯১: 2G ও ইনফ্লুয়েঞ্জা এ
  twog_flu: R({
    place: <Photo src="fiveg/twog.jpg" dur={160} zoom={[1.0, 1.08]} />,
    over: () => (
      <>
        <SleekBadge title="১৯৯১: 2G ও ইনফ্লুয়েঞ্জা এ" sub="Generation 2" color={CYAN} top={175} />
        <ComparisonPill gen="2G ডিজিটাল" year="1991" pan="ইনফ্লুয়েঞ্জা এ" panYear="1991" color={CYAN} panColor={RED} top={400} />
      </>
    ),
  }),

  // ১১. ১৯৭৯: 1G ও রাশিয়ান ফ্লু
  oneg_flu: R({
    place: <Photo src="fiveg/oneg.jpg" dur={170} zoom={[1.0, 1.08]} />,
    over: () => (
      <>
        <SleekBadge title="১৯৭৯: 1G ও রাশিয়ান ফ্লু" sub="Generation 1" color={RED} top={175} />
        <ComparisonPill gen="1G সেলুলার" year="1979" pan="রাশিয়ান ফ্লু" panYear="1979" color="#94a3b8" panColor={RED} top={400} />
      </>
    ),
  }),

  // ১২. মাস্টার টাইমলাইন রিভিল (৫টি সমাপতন)
  pattern_reveal: R({
    place: <Photo src="fiveg/master_timeline.jpg" dur={180} zoom={[1.0, 1.07]} dim={0.25} />,
    over: () => (
      <>
        <SleekBadge title="৫টি প্রযুক্তি আপগ্রেড · ৫টি মহামারী" sub="The Hidden Pattern" color={GOLD} top={175} />
        <MasterTimelineStack />
      </>
    ),
  }),

  // ১৩. ফুসফুস ও রেডিয়েশন
  em_field_q: R({
    place: <Photo src="fiveg/lungs.jpg" dur={190} zoom={[1.0, 1.08]} />,
    over: () => (
      <SleekBadge title="ইলেক্ট্রোম্যাগনেটিক ফিল্ডের প্রভাব?" sub="Biological Impact" color={CYAN} top={175} />
    ),
  }),

  // ১৪. সিক্স জি (6G) ২০৩০
  sixg_climax: R({
    place: <Photo src="fiveg/sixg.jpg" dur={120} zoom={[1.0, 1.09]} />,
    over: () => (
      <>
        <SleekBadge title="২০৩০ সালে আসছে 6G!" sub="The Big Question" color={RED} top={175} />
        <SixGAlertCard />
      </>
    ),
  }),

  // ১৫. বইয়ের উৎস: The Invisible Rainbow (ন্যারেটর pop ও বই)
  book_source: R({
    place: <Photo src="fiveg/book.jpg" dur={280} zoom={[1.0, 1.07]} />,
    over: () => (
      <>
        <SleekBadge title="ঐতিহাসিক বইয়ের টাইমলাইন" sub="Book Source" color={GOLD} top={175} />
        <BookGlassPill />
      </>
    ),
  }),

  // ১৬. শিক্ষাটা সোজা (ন্যারেটর full)
  lesson: R({
    place: <Photo src="fiveg/master_timeline.jpg" dur={210} zoom={[1.05, 1.0]} dim={0.4} />,
    over: () => (
      <SleekBadge title="শিক্ষাটা সোজা" sub="Key Takeaway" color={GOLD} top={175} />
    ),
  }),

  // ১৭. অ্যাকশন: চোখ বন্ধ করে সব মেনে নিও না
  action: R({
    place: <Photo src="fiveg/investigation.jpg" dur={240} zoom={[1.0, 1.08]} dim={0.2} />,
    over: () => (
      <>
        <SleekBadge title="চোখ বন্ধ করে মেনে নিও না" sub="Action Step" color={CYAN} top={175} />
        <Bounce x={70} y={440} at={1}>
          <div
            style={{
              width: 940,
              padding: '36px 32px',
              background: 'rgba(9, 14, 26, 0.92)',
              borderRadius: 24,
              border: `2px solid ${CYAN}55`,
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{fontSize: 44, fontWeight: 900, color: '#fff'}}>
              ডেটা ও পেছনের প্যাটার্ন বোঝো
            </div>
            <div style={{fontSize: 30, fontWeight: 800, color: '#94a3b8', marginTop: 12, lineHeight: 1.4}}>
              যেকোনো বড় নীতি বা প্রযুক্তির পরিবর্তনের পেছনের তথ্য নিজে যাচাই করতে শেখো।
            </div>
          </div>
        </Bounce>
      </>
    ),
  }),

  // ১৮. দুনিয়ায় দুই রকম মানুষ
  duality: R({
    place: <Photo src="fiveg/sixg.jpg" dur={150} zoom={[1.08, 1.0]} dim={0.35} />,
    over: () => (
      <>
        <SleekBadge title="দুনিয়ায় দুই রকম মানুষ আছে" sub="Two Types Of People" color={GOLD} top={175} />
        <div
          style={{
            position: 'absolute',
            left: 50,
            right: 50,
            top: 420,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            zIndex: 5,
          }}
        >
          <Bounce x={0} y={0} at={1}>
            <div
              style={{
                width: 980,
                padding: '28px 24px',
                background: 'rgba(239,68,68,0.2)',
                borderRadius: 20,
                border: '2px solid #ef4444',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{fontSize: 40, fontWeight: 900, color: RED}}>১. যাদের নিয়ে খেলা হয়</div>
            </div>
          </Bounce>
          <Bounce x={0} y={0} at={3}>
            <div
              style={{
                width: 980,
                padding: '28px 24px',
                background: 'rgba(16,185,129,0.2)',
                borderRadius: 20,
                border: '2px solid #10b981',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{fontSize: 42, fontWeight: 900, color: GREEN}}>২. যারা খেলাটা বোঝে</div>
            </div>
          </Bounce>
        </div>
      </>
    ),
  }),

  // ১৯. BBA CTA
  cta: () => <Cta />,
};

// থাম্বনেইল
const Thumb: React.FC = () => (
  <PsyThumb
    l1="প্রতিটা নেটওয়ার্কের সাথে"
    l2="একটা করে মহামারী!"
    bottom="২০৩০ সালে কী আসছে?"
    term="1G · 2G · 3G · 4G · 5G · 6G"
    glow="rgba(239,68,68,0.5)"
    size={76}
    art={
      <div
        style={{
          position: 'absolute',
          left: 40,
          top: 660,
          width: 580,
          height: 600,
          borderRadius: 32,
          overflow: 'hidden',
          border: `5px solid ${RED}`,
          boxShadow: '0 25px 80px rgba(0,0,0,0.9)',
        }}
      >
        <Img
          src={staticFile('fiveg/fiveg.jpg')}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(7,9,14,0.95) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 24,
            textAlign: 'center',
            padding: '10px 20px',
            borderRadius: 16,
            background: RED,
            fontSize: 38,
            fontWeight: 900,
            color: '#fff',
          }}
        >
          পরের ধাক্কা ২০৩০?
        </div>
      </div>
    }
  />
);

export const fiveg = story('fiveg/', raw, SCENES, Thumb, {logo: 'bba2'});
