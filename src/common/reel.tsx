// নতুন ভিডিওর দৃশ্যের কিট (কাঁপুনি নেই; fx.tsx দেখো)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {BG, GOLD, RED, clampOpts} from '../biz/art';
import {Actor, At, Backdrop, Bg, CtaScene, None, SP} from './kit';
import {Jitter, Tremble} from './fx';
import {SignCtx} from './places';
import {LogoKind, Story, StoryProps} from './Story';
import {BaseSegment, makeFallback} from './meta';
import {Expression, Gesture, Toon, ToonLook} from './Toon';

type Draw = (f: number, dur: number) => React.ReactNode;

export type RO = {
  bg?: Bg;
  place?: React.ReactNode; // আঁকা জায়গা (bg-এর বদলে)
  back?: Draw; // পটভূমির সাথে কাঁপে
  actors?: Actor[];
  front?: Draw; // চরিত্রের সামনে (কাউন্টার ইত্যাদি), কম কাঁপে
  over?: Draw; // একদম সামনে, ক্যামেরা ছাড়া কিছুতে নড়ে না
  title?: string;
  color?: string;
  size?: number;
  titleTop?: number;
  at?: number; // ০..১, লেখা কখন আসবে
  vig?: number;
};

// লেখা: লাফিয়ে আসে
export const Label: React.FC<{text: string; color?: string; size?: number; top?: number; at?: number; pill?: boolean}> = ({text, color = GOLD, size = 84, top = 210, at = 2, pill = true}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - at, fps: 30, config: {damping: 11, stiffness: 170}});
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top, textAlign: 'center', transform: `scale(${s})`, opacity: f >= at ? 1 : 0}}>
      <Jitter seed={text}>
        <span style={{display: 'inline', fontSize: size, fontWeight: 800, lineHeight: 1.36, color, background: pill ? 'rgba(0,0,0,0.68)' : undefined, padding: '6px 26px', borderRadius: 18, WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone', textShadow: '0 6px 26px rgba(0,0,0,0.85)'}}>{text}</span>
      </Jitter>
    </div>
  );
};

// সাধারণ দৃশ্য
export const R =
  (o: RO): React.FC<SP> =>
  ({dur, id}) => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill>
        <Tremble amp={8} rot={0.22} over={1.05} seed={`${id}b`}>
          <SignCtx.Provider value={!o.title}>{o.place ?? <Backdrop bg={o.bg ?? 'plain'} />}</SignCtx.Provider>
          {o.back ? o.back(f, dur) : null}
        </Tremble>
        <Tremble amp={3} rot={0.12} seed={`${id}a`}>
          {(o.actors ?? []).map((x, i) => (
            <At key={i} x={x.x} y={x.y ?? 1690}>
              <Toon height={x.h ?? 1040} {...x.look} expression={x.expression} gesture={x.gesture ?? (x.holding ? 'hold' : 'idle')} holding={x.holding} talking={x.talking} lookX={x.lookX} seed={`r${i}${x.x}`} />
            </At>
          ))}
          {o.front ? o.front(f, dur) : null}
        </Tremble>
        <Vignette strength={o.vig ?? 0.45} />
        {o.over ? o.over(f, dur) : null}
        {o.title ? <Label text={o.title} color={o.color} size={o.size} top={o.titleTop} at={Math.round(dur * (o.at ?? 0.06))} /> : null}
      </AbsoluteFill>
    );
  };

// বড় লেখা আছড়ে পড়ে: শুরুতে বিশাল, তারপর ঠিক মাপে, লাল-নীল আভা সরে যায়
export const Slam = (text: string, o: {color?: string; size?: number; top?: number; bg?: Bg; place?: React.ReactNode; back?: Draw; sub?: string; subColor?: string; subAt?: number; vig?: number; pill?: boolean} = {}): React.FC<SP> => ({dur, id}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 5], [2.4, 1], {...clampOpts, easing: (k) => 1 - (1 - k) * (1 - k)});
  const split = interpolate(f, [0, 12], [16, 2.5], clampOpts);
  const color = o.color ?? GOLD;
  return (
    <AbsoluteFill>
      <Tremble amp={10} rot={0.25} over={1.06} seed={`${id}b`}>
        {o.place ?? <Backdrop bg={o.bg ?? 'dark'} />}
        {o.back ? o.back(f, dur) : null}
      </Tremble>
      <Vignette strength={o.vig ?? 0.6} />
      <div style={{position: 'absolute', left: 44, right: 44, top: o.top ?? 620, textAlign: 'center', transform: `scale(${s})`, opacity: interpolate(f, [0, 2], [0, 1], clampOpts)}}>
        <Jitter seed={text} amp={3.5} rot={0.6}>
          <span style={{fontSize: o.size ?? 150, fontWeight: 800, lineHeight: 1.3, color, textShadow: `${split}px 0 0 rgba(255,40,70,0.75), ${-split}px 0 0 rgba(60,190,255,0.75), 0 12px 50px rgba(0,0,0,0.85)`, ...(o.pill ? {background: 'rgba(5,6,10,0.78)', padding: '8px 30px', borderRadius: 22, WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone'} : {})}}>{text}</span>
        </Jitter>
      </div>
      {o.sub ? <Label text={o.sub} color={o.subColor ?? '#f2efe9'} size={70} top={(o.top ?? 620) + 470} at={Math.round(dur * (o.subAt ?? 0.3))} /> : null}
    </AbsoluteFill>
  );
};

const BN = '০১২৩৪৫৬৭৮৯';
const bn = (n: number) => n.toLocaleString('en-IN').replace(/\d/g, (d) => BN[Number(d)]);

// সংখ্যা গুনে গুনে বাড়ে
export const Count = (to: number, o: {from?: number; pre?: string; post?: string; label?: string; sub?: string; color?: string; size?: number; bg?: Bg; place?: React.ReactNode; back?: Draw} = {}): React.FC<SP> => ({dur, id}) => {
  const f = useCurrentFrame();
  const v = Math.round(interpolate(f, [2, Math.max(4, dur * 0.6)], [o.from ?? 0, to], {...clampOpts, easing: (t) => 1 - (1 - t) * (1 - t)}));
  const pop = spring({frame: f - 1, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Tremble amp={9} rot={0.22} over={1.05} seed={`${id}b`}>
        <SignCtx.Provider value={!o.label}>{o.place ?? <Backdrop bg={o.bg ?? 'dark'} />}</SignCtx.Provider>
        {o.back ? o.back(f, dur) : null}
      </Tremble>
      <Vignette strength={0.6} />
      {o.label ? <Label text={o.label} color="#f2efe9" size={74} top={210} /> : null}
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', transform: `scale(${pop})`}}>
        <Jitter seed={`n${to}`} amp={3} rot={0.5}>
          <span style={{fontSize: o.size ?? 230, fontWeight: 800, color: o.color ?? RED, textShadow: '0 14px 56px rgba(0,0,0,0.8)', background: 'rgba(5,6,10,0.74)', padding: '6px 34px', borderRadius: 26}}>
            {o.pre ?? ''}
            {bn(v)}
            {o.post ?? ''}
          </span>
        </Jitter>
      </div>
      {o.sub ? <Label text={o.sub} color="#f2efe9" size={72} top={1040} at={Math.round(dur * 0.5)} /> : null}
    </AbsoluteFill>
  );
};

// দর্শক-ধাপ: বোর্ডে একটা বড় কথা
export const Card = (text: string, o: {color?: string; size?: number; bg?: Bg; place?: React.ReactNode} = {}): React.FC<SP> => ({dur, id}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 1, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <Tremble amp={7} rot={0.18} over={1.05} seed={`${id}b`}>
        {o.place ?? <Backdrop bg={o.bg ?? 'plain'} />}
      </Tremble>
      <div style={{position: 'absolute', left: 70, right: 70, top: 520, padding: '60px 50px', textAlign: 'center', background: 'rgba(8,14,28,0.84)', border: `8px solid ${o.color ?? GOLD}`, borderRadius: 36, transform: `scale(${s})`, boxShadow: '0 30px 90px rgba(0,0,0,0.6)'}}>
        <Jitter seed={text} amp={2} rot={0.3}>
          <div style={{fontSize: o.size ?? 88, fontWeight: 800, lineHeight: 1.32, color: o.color ?? GOLD}}>{text}</div>
        </Jitter>
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

export const Cta: React.FC<{children?: React.ReactNode}> = ({children}) => <CtaScene>{children}</CtaScene>;

// দৃশ্যের মাঝখানে এক দৃশ্য থেকে আরেকটায়
export const Two = (A: React.FC<SP>, B: React.FC<SP>, at = 0.45): React.FC<SP> => (p) => {
  const f = useCurrentFrame();
  return f < p.dur * at ? <A {...p} /> : <B {...p} />;
};

// বইয়ের কার্ড: ন্যারেটর কোণে থাকলেও ঢাকা পড়ে না
export const BookScene = (title: string, author: string, law?: string, color = '#14305f'): React.FC<SP> =>
  R({
    bg: 'plain',
    over: () => (
      <Bounce x={90} y={340} at={2}>
        <div style={{width: 640, padding: '50px 36px', background: color, border: `10px solid ${GOLD}`, borderRadius: 18, textAlign: 'center', fontWeight: 800, boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
          <div style={{fontSize: title.length > 12 ? 64 : 88, lineHeight: 1.18, color: GOLD}}>{title}</div>
          <div style={{marginTop: 22, fontSize: 42, color: '#f2efe9'}}>{author}</div>
          {law ? <div style={{marginTop: 26, display: 'inline-block', padding: '8px 30px', background: RED, borderRadius: 14, fontSize: 56, color: '#fff'}}>{law}</div> : null}
        </div>
      </Bounce>
    ),
  });

// জিনিস লাফিয়ে আসে
export const Bounce: React.FC<{x: number; y: number; at?: number; seed?: string; children: React.ReactNode}> = ({x, y, at = 0, seed = 'b', children}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - at, fps: 30, config: {damping: 9, stiffness: 150}});
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `scale(${s})`}}>
      <Jitter seed={seed} amp={2.4} rot={0.7}>
        {children}
      </Jitter>
    </div>
  );
};

// ব্যস্ত পটভূমিতেও পড়া যায়: বড় লেখার পেছনে গাঢ় পটি
export const Hit = (text: string, o: Parameters<typeof Slam>[1] = {}) => Slam(text, {pill: true, ...o});

export const lawBook = (n: number) => BookScene('The 48 Laws of Power', 'Robert Greene', `Law ${n}`, '#3a1420');

// বারবার আসা মানুষ
export const Y1: ToonLook = {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#3a6ea5', bottom: '#2a2c30', shoes: '#e8e4dc'};
export const Y2: ToonLook = {skin: '#d9a07a', hair: '#26180f', hairStyle: 'quiff', top: '#7a3a4a', bottom: '#2a2c30', shoes: '#e8e4dc'};
export const Y3: ToonLook = {skin: '#b87a52', hair: '#1a1410', hairStyle: 'curly', top: '#3f7a5a', bottom: '#2f3440', shoes: '#16161a'};
export const ELDER: ToonLook = {skin: '#d9a784', hair: '#e6e2da', hairStyle: 'balding', top: '#f2efe6', kurta: true, bottom: '#e6e2d6', glasses: true, mustache: true, age: 0.9, shoes: '#3a2618'};
export const MIDDLE: ToonLook = {skin: '#c98d62', hair: '#26180f', hairStyle: 'receding', top: '#f2efe6', kurta: true, bottom: '#e6e2d6', mustache: true, age: 0.35, shoes: '#3a2618'};
export const SIR: ToonLook = {skin: '#e2b391', hair: '#4a3a2a', hairStyle: 'receding', top: '#f4f2ec', jacket: '#262a33', tie: '#2b4fa0', bottom: '#1c1e24', glasses: true, age: 0.4};
export const WOMAN: ToonLook = {skin: '#e0ac86', hair: '#2a1a12', hairStyle: 'long', top: '#a0305a', skirt: '#a0305a', bottom: '#a0305a'};
export const MOM: ToonLook = {skin: '#d6a07c', hair: '#6a5a4a', hairStyle: 'hijab', top: '#7a4a6a', skirt: '#5a3a4a', age: 0.6};

export type P = {look: ToonLook; e?: Expression; g?: Gesture; talk?: boolean; hold?: React.ReactNode};
const act = (p: P, x: number, h: number, y: number, lookX: number): Actor => ({look: p.look, x, h, y, expression: p.e, gesture: p.g ?? (p.hold ? 'hold' : 'idle'), talking: p.talk, holding: p.hold, lookX});
type More = Pick<RO, 'front' | 'over' | 'title' | 'color' | 'size' | 'titleTop' | 'back'>;

// দুইজন মুখোমুখি: bar = সামনে কাউন্টার/টেবিলের ওপর থেকে দেখা
export const Pair = (place: React.ReactNode, l: P, r: P, o: More & {bar?: boolean} = {}): React.FC<SP> =>
  R({place, actors: o.bar ? [act(l, 280, 1040, 1690, 1), act(r, 790, 1060, 1690, -1)] : [act(l, 280, 1080, 1830, 1), act(r, 790, 1080, 1830, -1)], ...o});

// একজন মাঝখানে; near = কাছ থেকে
export const Solo = (place: React.ReactNode, p: P, o: More & {near?: boolean; x?: number} = {}): React.FC<SP> =>
  R({place, actors: o.near ? [act(p, o.x ?? 540, 1440, 2010, 0)] : [act(p, o.x ?? 540, 1240, 1870, 0)], ...o});

// সব দৃশ্যের ওপর ভিডিও বানানো: story('folder/', segments, দৃশ্য, থাম্বনেইল, {logo: 'bba2'} দিলে নতুন পেজের লোগো)
export const story = (folder: string, raw: unknown, scenes: Record<string, React.FC<SP>>, Thumb: React.FC, opts: {logo?: LogoKind} = {}) => {
  const segs = raw as (BaseSegment & {visual?: string})[];
  const fb = makeFallback(segs);
  const logo = opts.logo;
  const Video: React.FC<StoryProps> = (p) => (
    <Story
      {...p}
      fx
      logo={logo}
      segments={segs}
      folder={folder}
      bg={BG}
      render={(seg, dur) => {
        const C = scenes[seg.visual ?? seg.id] ?? None;
        return <C dur={dur} id={seg.id} />;
      }}
      thumbnail={<Thumb />}
    />
  );
  return {Video, Thumb, fb, folder, logo};
};

export type {Actor};
