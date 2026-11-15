// মনোবিজ্ঞানের ভিডিওগুলোর ছোট কিট: এক লাইনে দৃশ্য (S, Word, Num, Bars…) আর বারবার লাগা জিনিস (বোর্ড, ফোন, বই…)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Bar, GOLD, RED, Title, clampOpts, out} from '../biz/art';
import {Bubble} from '../milgram/art';
import {fontFamily} from './Story';
import {CAST} from './cast';
import {Toon, ToonLook} from './Toon';
import {Actor, At, Backdrop, Bg, NameCard, People, SP, YearScene} from './kit';
import {NarratorArt} from './NarratorArt';
import {ThumbText} from '../Thumbnail';
import {BG} from '../biz/art';

type Draw = (f: number, dur: number) => React.ReactNode;

export const YOU: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#3a6ea5', bottom: '#2a2c30', shoes: '#e8e4dc'};
export const PROF: ToonLook = {skin: '#efc6a6', hair: '#8a8580', hairStyle: 'receding', top: '#f4f2ec', jacket: '#3a3230', bottom: '#1c1e24', glasses: true, age: 0.5};
export const CROWD_LOOKS = [CAST.customer, CAST.customer2, CAST.founder, CAST.pro, CAST.worker, CAST.exec];

// চরিত্র: a(চেহারা, x, ভাব, ভঙ্গি, {h, y, lookX, talking, holding})
export const a = (look: ToonLook, x: number, expression?: Actor['expression'], gesture?: Actor['gesture'], more: Partial<Actor> = {}): Actor => ({look, x, h: 1040, y: 1690, expression, gesture, ...more});

export type SOpts = {
  bg?: Bg;
  actors?: Actor[];
  title?: string;
  color?: string;
  at?: number;
  size?: number;
  titleTop?: number;
  bubble?: string;
  bx?: number;
  by?: number;
  tail?: 'left' | 'right' | 'down';
  bsize?: number;
  bat?: number;
  back?: Draw;
  front?: Draw;
  name?: [string, string?];
  vig?: number;
};

// সাধারণ দৃশ্য: পটভূমি, পেছনের জিনিস, চরিত্র, সামনের জিনিস, লেখা। ধীরে সামান্য জুম হয়।
export const S =
  (o: SOpts): React.FC<SP> =>
  ({dur}) => {
    const f = useCurrentFrame();
    const zoom = interpolate(f, [0, dur], [1, 1.035], clampOpts);
    return (
      <AbsoluteFill>
        <div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '50% 60%'}}>
          <Backdrop bg={o.bg ?? 'plain'} />
          {o.back ? o.back(f, dur) : null}
          {(o.actors ?? []).map((x, i) => (
            <At key={i} x={x.x} y={x.y ?? 1690}>
              <Toon height={x.h ?? 1040} {...x.look} expression={x.expression} gesture={x.gesture ?? (x.holding ? 'hold' : 'idle')} holding={x.holding} talking={x.talking} silhouette={x.silhouette} lookX={x.lookX} seed={`p${i}${x.x}`} />
            </At>
          ))}
          {o.front ? o.front(f, dur) : null}
        </div>
        {o.bubble ? (
          <div style={{position: 'absolute', left: o.bx ?? 60, right: 60, top: o.by ?? 300, opacity: out(f, dur * (o.bat ?? 0.1), dur * (o.bat ?? 0.1) + 8)}}>
            <Bubble size={o.bsize ?? 62} tail={o.tail ?? 'down'}>
              {o.bubble}
            </Bubble>
          </div>
        ) : null}
        {o.name ? <NameCard name={o.name[0]} sub={o.name[1]} top={270} /> : null}
        {o.title ? (
          <Title top={o.titleTop ?? 200} size={o.size ?? 88} color={o.color ?? GOLD} opacity={out(f, dur * (o.at ?? 0.1), dur * (o.at ?? 0.1) + 9)}>
            <span style={{background: 'rgba(0,0,0,0.62)', padding: '4px 26px', borderRadius: 18, WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone'}}>{o.title}</span>
          </Title>
        ) : null}
        <Vignette strength={o.vig ?? 0.5} />
      </AbsoluteFill>
    );
  };

// বড় লেখা ঝাঁকি দিয়ে আসে
export const Word = (text: string, o: {color?: string; size?: number; sub?: string; subColor?: string; bg?: Bg; top?: number; back?: Draw; subAt?: number} = {}): React.FC<SP> => ({dur}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 2, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Backdrop bg={o.bg ?? 'plain'} />
      {o.back ? o.back(f, dur) : null}
      <div style={{position: 'absolute', left: 50, right: 50, top: o.top ?? 620, textAlign: 'center', fontSize: o.size ?? 150, fontWeight: 900, lineHeight: 1.2, color: o.color ?? GOLD, transform: `scale(${pop})`, textShadow: '0 10px 40px rgba(0,0,0,0.7)'}}>{text}</div>
      {o.sub ? (
        <Title top={(o.top ?? 620) + 520} size={70} color={o.subColor ?? '#f2efe9'} opacity={out(f, dur * (o.subAt ?? 0.35), dur * (o.subAt ?? 0.35) + 9)}>
          {o.sub}
        </Title>
      ) : null}
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

const BN = '০১২৩৪৫৬৭৮৯';
export const bn = (n: number | string) => String(n).replace(/\d/g, (d) => BN[Number(d)]);

// সংখ্যা গুনে গুনে বাড়ে
export const Num = (to: number, o: {from?: number; suffix?: string; prefix?: string; label?: string; sub?: string; color?: string; bg?: Bg; size?: number; back?: Draw} = {}): React.FC<SP> => ({dur}) => {
  const f = useCurrentFrame();
  const v = Math.round(interpolate(f, [2, Math.max(4, dur * 0.55)], [o.from ?? 0, to], {...clampOpts, easing: (t) => 1 - (1 - t) * (1 - t)}));
  const pop = spring({frame: f - 2, fps: 30, config: {damping: 11}});
  return (
    <AbsoluteFill>
      <Backdrop bg={o.bg ?? 'plain'} />
      {o.back ? o.back(f, dur) : null}
      {o.label ? (
        <Title top={330} size={78} color="#f2efe9">
          {o.label}
        </Title>
      ) : null}
      <div style={{position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center', fontSize: o.size ?? 340, fontWeight: 900, color: o.color ?? RED, transform: `scale(${pop})`, textShadow: '0 12px 50px rgba(0,0,0,0.7)'}}>
        {o.prefix ?? ''}
        {bn(v)}
        {o.suffix ?? ''}
      </div>
      {o.sub ? (
        <Title top={1140} size={72} opacity={out(f, dur * 0.5, dur * 0.5 + 9)}>
          {o.sub}
        </Title>
      ) : null}
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

type Row = {label: string; value: string; pct: number; color: string};
export const Bars = (rows: Row[], o: {title?: string; color?: string; bg?: Bg; top?: number; gap?: number} = {}): React.FC<SP> => ({dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Backdrop bg={o.bg ?? 'plain'} />
      {rows.map((r, i) => {
        const t = 2 + (i * dur * 0.5) / rows.length;
        return <Bar key={r.label} label={r.label} value={r.value} pct={r.pct * out(f, t, t + dur * 0.35)} color={r.color} top={(o.top ?? 480) + i * (o.gap ?? 340)} o={out(f, t - 2, t + 4)} />;
      })}
      {o.title ? (
        <Title top={220} size={84} color={o.color ?? GOLD} opacity={out(f, 0, 9)}>
          {o.title}
        </Title>
      ) : null}
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

export const Yr = (year: string, sub?: string, o: {bg?: Bg; color?: string; back?: Draw} = {}): React.FC<SP> => ({dur}) => {
  const f = useCurrentFrame();
  return (
    <YearScene year={year} sub={sub} bg={o.bg ?? 'sepia'} color={o.color} dur={dur}>
      {o.back ? o.back(f, dur) : null}
    </YearScene>
  );
};

export const Pop: React.FC<{at?: number; children: React.ReactNode; x: number; y: number; rot?: number; damping?: number}> = ({at = 0, children, x, y, rot = 0, damping = 11}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - at, fps: 30, config: {damping}});
  return <div style={{position: 'absolute', left: x, top: y, transform: `scale(${s}) rotate(${rot}deg)`}}>{children}</div>;
};

export const Stamp: React.FC<{text: string; o: number; top?: number; size?: number; color?: string}> = ({text, o, top = 400, size = 150, color = RED}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top, textAlign: 'center', zIndex: 3}}>
    <span style={{display: 'inline-block', padding: '10px 44px', border: `12px solid ${color}`, color, fontSize: size, fontWeight: 900, background: 'rgba(0,0,0,0.72)', transform: `rotate(-8deg) scale(${2.2 - 1.2 * o})`, opacity: o}}>{text}</span>
  </div>
);

// হলুদ/লাল ছোট কার্ড
export const Chip: React.FC<{children: React.ReactNode; bg?: string; color?: string; size?: number; style?: React.CSSProperties}> = ({children, bg = '#f6f2e8', color = '#15151b', size = 60, style}) => (
  <div style={{display: 'inline-block', padding: '16px 32px', background: bg, color, fontSize: size, fontWeight: 800, borderRadius: 18, border: '6px solid #1b1b1f', boxShadow: '0 14px 30px rgba(0,0,0,0.45)', ...style}}>{children}</div>
);

// তালিকা: একটা একটা করে আসে
export const Stack: React.FC<{items: string[]; top?: number; dur: number; size?: number; color?: string; bg?: string}> = ({items, top = 500, dur, size = 76, color = '#15151b', bg = '#f6f2e8'}) => {
  const f = useCurrentFrame();
  return (
    <>
      {items.map((t, i) => {
        const at = 2 + (i * dur * 0.7) / items.length;
        const s = spring({frame: f - at, fps: 30, config: {damping: 12}});
        return (
          <div key={t} style={{position: 'absolute', left: 0, right: 0, top: top + i * (size + 90), textAlign: 'center', transform: `scale(${s})`}}>
            <Chip size={size} color={color} bg={bg}>
              {t}
            </Chip>
          </div>
        );
      })}
    </>
  );
};

// মোবাইল ফোন, পর্দায় ইচ্ছামতো জিনিস
export const Mobile: React.FC<{w?: number; children?: React.ReactNode; screen?: string}> = ({w = 420, children, screen = '#10131a'}) => (
  <div style={{width: w, height: w * 1.95, borderRadius: w * 0.11, background: '#15171d', border: '10px solid #3a3e48', padding: w * 0.04, boxSizing: 'border-box', boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
    <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: w * 0.07, background: screen, overflow: 'hidden'}}>{children}</div>
  </div>
);
export const HandPhone: React.ReactNode = <rect x={-26} y={-60} width={52} height={96} rx={8} fill="#15171d" stroke="#4a4a50" strokeWidth={5} />;

// ব্ল্যাকবোর্ড
export const Board: React.FC<{text?: string; lines?: string[]; top?: number; left?: number; w?: number; h?: number; size?: number}> = ({text, lines, top = 340, left = 90, w = 900, h = 460, size = 84}) => (
  <div style={{position: 'absolute', left, top, width: w, height: h, background: '#23402f', border: '16px solid #6a4a34', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, color: '#f2efe9', fontSize: size, fontWeight: 800, textAlign: 'center', padding: 30, boxSizing: 'border-box', lineHeight: 1.25}}>
    {text ? <div>{text}</div> : null}
    {(lines ?? []).map((l) => (
      <div key={l}>{l}</div>
    ))}
  </div>
);

// কাগজ: শিরোনাম আর লেখার দাগ
export const Paper: React.FC<{w?: number; title?: string; lines?: string[]; rot?: number; dots?: number; size?: number}> = ({w = 620, title, lines, rot = -3, dots = 5, size = 54}) => (
  <div style={{width: w, background: '#f6f2e8', border: '8px solid #1b1b1f', borderRadius: 14, padding: 40, boxSizing: 'border-box', transform: `rotate(${rot}deg)`, color: '#15151b', boxShadow: '0 24px 60px rgba(0,0,0,0.5)'}}>
    {title ? <div style={{fontSize: size + 8, fontWeight: 900, marginBottom: 22}}>{title}</div> : null}
    {(lines ?? []).map((l) => (
      <div key={l} style={{fontSize: size, fontWeight: 700, lineHeight: 1.45}}>
        {l}
      </div>
    ))}
    {!lines
      ? Array.from({length: dots}, (_, i) => <div key={i} style={{height: 16, marginTop: 22, background: '#c9c1ae', borderRadius: 8, width: `${92 - (i * 37) % 40}%`}} />)
      : null}
  </div>
);

export const Book: React.FC<{size?: number; color?: string; label?: string}> = ({size = 320, color = '#7a1f2a', label}) => (
  <svg viewBox="0 0 200 260" width={size} height={size * 1.3} style={{overflow: 'visible', filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.5))'}}>
    <rect x={30} y={8} width={160} height={240} rx={8} fill="#e8e0cc" stroke="#1b1b1f" strokeWidth={5} />
    <rect x={14} y={4} width={160} height={246} rx={10} fill={color} stroke="#1b1b1f" strokeWidth={6} />
    <rect x={34} y={40} width={120} height={70} fill="none" stroke={GOLD} strokeWidth={5} />
    {label ? (
      <text x={94} y={86} textAnchor="middle" fontSize={30} fontWeight={800} fill={GOLD}>
        {label}
      </text>
    ) : null}
  </svg>
);

export const Bolt: React.FC<{size?: number; style?: React.CSSProperties; color?: string}> = ({size = 160, style, color = '#ffd84a'}) => (
  <svg viewBox="0 0 80 120" width={size} height={size * 1.5} style={{filter: `drop-shadow(0 0 22px ${color})`, ...style}}>
    <path d="M46 0 L8 66 L36 66 L24 120 L74 44 L44 44 Z" fill={color} stroke="#1b1b1f" strokeWidth={4} />
  </svg>
);

export const Coin: React.FC<{size?: number; style?: React.CSSProperties}> = ({size = 90, style}) => (
  <svg viewBox="0 0 60 60" width={size} height={size} style={style}>
    <circle cx={30} cy={30} r={27} fill="#e8c14a" stroke="#1b1b1f" strokeWidth={4} />
    <circle cx={30} cy={30} r={18} fill="none" stroke="#a8862a" strokeWidth={3} />
  </svg>
);

export const Cup: React.FC<{size?: number; color?: string; style?: React.CSSProperties}> = ({size = 120, color = '#f2efe9', style}) => (
  <svg viewBox="0 0 90 80" width={size} height={(size * 80) / 90} style={{overflow: 'visible', ...style}}>
    <path d="M10 14 L68 14 L60 74 L18 74Z" fill={color} stroke="#1b1b1f" strokeWidth={5} />
    <path d="M67 26 C90 24 88 56 62 54" fill="none" stroke="#1b1b1f" strokeWidth={6} />
    <ellipse cx={39} cy={14} rx={29} ry={6} fill="#6a3a1e" stroke="#1b1b1f" strokeWidth={4} />
  </svg>
);

export const Brain: React.FC<{size?: number; color?: string; style?: React.CSSProperties}> = ({size = 420, color = '#e8a0b4', style}) => (
  <svg viewBox="0 0 200 170" width={size} height={size * 0.85} style={{overflow: 'visible', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))', ...style}}>
    <path d="M100 18 C70 -4 34 8 30 38 C4 44 0 84 22 98 C18 128 54 142 76 128 C84 150 92 152 100 150 C108 152 116 150 124 128 C146 142 182 128 178 98 C200 84 196 44 170 38 C166 8 130 -4 100 18Z" fill={color} stroke="#1b1b1f" strokeWidth={6} />
    <path d="M100 18 L100 150 M60 40 C78 46 74 66 56 68 M42 86 C58 82 72 92 68 108 M140 40 C122 46 126 66 144 68 M158 86 C142 82 128 92 132 108" fill="none" stroke="#1b1b1f" strokeWidth={5} />
  </svg>
);

// ওপর থেকে আলো
export const Beam: React.FC<{x: number; w?: number; bottom?: number; o?: number; color?: string}> = ({x, w = 300, bottom = 1640, o = 1, color = '#fff3c4'}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: o}}>
    <defs>
      <linearGradient id={`psybeam${x}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={color} stopOpacity={0.7} />
        <stop offset="1" stopColor={color} stopOpacity={0.12} />
      </linearGradient>
    </defs>
    <polygon points={`${x - 50},0 ${x + 50},0 ${x + w},${bottom} ${x - w},${bottom}`} fill={`url(#psybeam${x})`} />
  </svg>
);

const SEATS = [
  {y: 860, h: 470, xs: [190, 450, 710, 930]},
  {y: 1140, h: 590, xs: [120, 410, 680, 960]},
  {y: 1500, h: 760, xs: [230, 540, 850]},
];

// ক্লাসঘর: সারি সারি ছাত্র, সামনে বেঞ্চ। ওপরে বোর্ডের জায়গা থাকে।
export const ClassRoom: React.FC<{lookX?: number; up?: number[]; looks?: ToonLook[]; expr?: Actor['expression']; gesture?: Actor['gesture']}> = ({lookX = 0, up = [], looks = CROWD_LOOKS, expr = 'neutral', gesture = 'idle'}) => {
  const f = useCurrentFrame();
  let n = -1;
  return (
    <>
      {SEATS.map((row, r) => (
        <React.Fragment key={r}>
          {row.xs.map((x) => {
            n += 1;
            const u = up.includes(n);
            return (
              <At key={x} x={x} y={row.y + row.h * 0.5}>
                <Toon height={row.h} {...looks[n % looks.length]} lookX={lookX} expression={u ? 'smile' : expr} gesture={u ? 'wave' : gesture} seed={`cr${n}`} style={{transform: `translateY(${Math.sin((f + n * 11) / 22) * 2}px)`}} />
              </At>
            );
          })}
          <div style={{position: 'absolute', left: 0, right: 0, top: row.y - 8, height: 46, background: '#6a4a34', borderTop: '6px solid #1b1b1f', borderBottom: '6px solid #1b1b1f'}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: row.y + 38, height: r === 2 ? 500 : row.h * 0.62, background: '#3a2a20'}} />
        </React.Fragment>
      ))}
    </>
  );
};
export const CLASS_BG = 'linear-gradient(180deg, #4a5a4e, #2a332c)';

// মানুষের আইকনের গ্রিড: কতজন
export const Icons: React.FC<{total: number; n: number; color: string; top?: number; cols?: number; w?: number; off?: string}> = ({total, n, color, top = 400, cols = 5, w = 118, off = '#3a3e48'}) => (
  <div style={{position: 'absolute', left: 90, right: 90, top, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 26, justifyItems: 'center'}}>
    {Array.from({length: total}, (_, i) => {
      const c = i < n ? color : off;
      return (
        <svg key={i} viewBox="0 0 40 60" width={w} height={w * 1.5}>
          <circle cx={20} cy={12} r={10} fill={c} />
          <path d="M4 58 C4 34 8 26 20 26 C32 26 36 34 36 58Z" fill={c} />
        </svg>
      );
    })}
  </div>
);

// থাম্বনেইল: ওপরে দুই লাইন, মাঝে ছবি + ন্যারেটর, নিচে নাম
export const PsyThumb: React.FC<{l1: string; l2: string; bottom: string; term: string; glow?: string; art?: React.ReactNode; size?: number; expr?: 'shocked' | 'surprised' | 'serious'}> = ({l1, l2, bottom, term, glow = 'rgba(224,36,60,0.3)', art, size = 96, expr = 'shocked'}) => (
  <AbsoluteFill style={{fontFamily, backgroundColor: BG}}>
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 30% 55%, ${glow}, #0b0d12 70%)`}} />
    {art}
    <div style={{position: 'absolute', right: -130, bottom: 230}}>
      <NarratorArt height={960} expression={expr} pose="explain" talking={false} />
    </div>
    <Vignette strength={0.6} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 8%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9) 88%)'}} />
    <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={size}>{l1}</ThumbText>
      <div>
        <ThumbText size={size} bg={RED}>
          {l2}
        </ThumbText>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1520, left: 0, right: 0, textAlign: 'center'}}>
      <ThumbText size={74}>{bottom}</ThumbText>
      <div style={{marginTop: 14}}>
        <ThumbText size={50} color={GOLD} style={{letterSpacing: 6}}>
          {term}
        </ThumbText>
      </div>
    </div>
  </AbsoluteFill>
);

export {People};
