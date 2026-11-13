// কম কোডে দৃশ্য বানানোর কিট: সাল, উক্তি, চরিত্রের দৃশ্য, নাম কার্ড, ফলো দৃশ্য
import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame} from 'remotion';
import {Vignette} from '../art';
import {Bubble} from '../milgram/art';
import {FollowButton, GOLD, Office, Plain, Title, out} from '../biz/art';
import {Expression, Gesture, Toon, ToonLook} from './Toon';

export type SP = {dur: number; id: string};

// নিচের মাঝখান ধরে বসানো
export const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -100%)', ...style}}>{children}</div>
);

export const NameCard: React.FC<{name: string; sub?: string; color?: string; top?: number; right?: boolean}> = ({name, sub, color = GOLD, top = 260, right}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', [right ? 'right' : 'left']: 80, top, padding: '16px 30px', background: 'rgba(0,0,0,0.65)', [right ? 'borderRight' : 'borderLeft']: `8px solid ${color}`, textAlign: right ? 'right' : 'left', opacity: out(f, 4, 14)}}>
      <div style={{fontSize: 56, fontWeight: 800}}>{name}</div>
      {sub ? <div style={{fontSize: 34, color}}>{sub}</div> : null}
    </div>
  );
};

export type Bg = 'office' | 'plain' | 'dark' | 'sepia' | 'sky' | 'night' | 'war' | string;
export const Backdrop: React.FC<{bg?: Bg; glow?: string}> = ({bg = 'plain', glow}) => {
  if (bg === 'office') return <Office />;
  if (bg === 'plain') return <Plain glow={glow} />;
  const g: Record<string, string> = {
    dark: 'linear-gradient(180deg, #1a1a20, #050507)',
    sepia: 'radial-gradient(ellipse at 50% 40%, #6a4a2e, #2a1a10 70%)',
    sky: 'linear-gradient(180deg, #3a6aa8 0%, #8ab8e0 60%, #5a8a4a 61%, #3a6030 100%)',
    night: 'linear-gradient(180deg, #0a1020, #1a2440 60%, #0a0c14 100%)',
    war: 'linear-gradient(180deg, #2a1414 0%, #6a2a1a 55%, #120808 100%)',
  };
  return <AbsoluteFill style={{background: g[bg] ?? bg}} />;
};

export type Actor = {look: ToonLook; x: number; h?: number; y?: number; expression?: Expression; gesture?: Gesture; talking?: boolean; silhouette?: string; holding?: React.ReactNode; lookX?: number};

// চরিত্রের দৃশ্য: পটভূমি + কয়েকজন চরিত্র + ঐচ্ছিক লেখা/বুদবুদ
export const People: React.FC<{
  bg?: Bg;
  actors: Actor[];
  title?: string;
  titleColor?: string;
  titleAt?: number; // ০..১, কখন আসবে
  dur: number;
  bubble?: string;
  bubbleX?: number;
  bubbleY?: number;
  bubbleTail?: 'left' | 'right' | 'down';
  children?: React.ReactNode;
}> = ({bg = 'office', actors, title, titleColor = GOLD, titleAt = 0.3, dur, bubble, bubbleX = 60, bubbleY = 280, bubbleTail = 'left', children}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Backdrop bg={bg} />
      {children}
      {actors.map((a, i) => (
        <At key={i} x={a.x} y={a.y ?? 1590}>
          <Toon height={a.h ?? 860} {...a.look} expression={a.expression} gesture={a.gesture ?? (a.holding ? 'hold' : 'idle')} holding={a.holding} talking={a.talking} silhouette={a.silhouette} lookX={a.lookX} seed={`a${i}${a.x}`} />
        </At>
      ))}
      {bubble ? (
        <div style={{position: 'absolute', left: bubbleX, top: bubbleY, right: 60, opacity: out(f, dur * 0.15, dur * 0.3)}}>
          <Bubble size={60} tail={bubbleTail}>
            {bubble}
          </Bubble>
        </div>
      ) : null}
      {title ? (
        <Title top={200} size={84} color={titleColor} opacity={out(f, dur * titleAt, dur * titleAt + 10)}>
          {title}
        </Title>
      ) : null}
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

// বড় সাল + নিচে ছোট লেখা
export const YearScene: React.FC<{year: string; sub?: string; bg?: Bg; color?: string; dur: number; children?: React.ReactNode}> = ({year, sub, bg = 'dark', color = GOLD, dur, children}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: 30, config: {damping: 12}});
  return (
    <AbsoluteFill>
      <Backdrop bg={bg} />
      {children}
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', transform: `scale(${pop})`}}>
        <span style={{fontSize: 260, fontWeight: 900, color, textShadow: '0 10px 40px rgba(0,0,0,0.6)'}}>{year}</span>
      </div>
      {sub ? (
        <Title top={900} size={80} opacity={out(f, dur * 0.3, dur * 0.5)}>
          {sub}
        </Title>
      ) : null}
    </AbsoluteFill>
  );
};

// উক্তি: চরিত্র + বড় উদ্ধৃতি কার্ড
export const QuoteScene: React.FC<{quote: string; who: string; look: ToonLook; expression?: Expression; gesture?: Gesture; bg?: Bg; color?: string; dur: number}> = ({quote, who, look, expression = 'serious', gesture = 'explain', bg = 'office', color = GOLD, dur}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Backdrop bg={bg} />
      <At x={540} y={1620}>
        <Toon height={900} {...look} expression={expression} gesture={gesture} talking seed={`q${who}`} />
      </At>
      <div style={{position: 'absolute', left: 60, right: 60, top: 220, padding: '34px 40px', background: 'rgba(0,0,0,0.75)', borderLeft: `10px solid ${color}`, opacity: out(f, 2, 14)}}>
        <div style={{fontSize: 58, fontWeight: 800, lineHeight: 1.35}}>{quote}</div>
        <div style={{marginTop: 16, fontSize: 38, color}}>— {who}</div>
      </div>
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

export const None: React.FC<SP> = () => (
  <AbsoluteFill>
    <Plain />
  </AbsoluteFill>
);

export const CtaScene: React.FC<{glow?: string; children?: React.ReactNode}> = ({glow = 'rgba(227,191,122,0.14)', children}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f - 6, fps: 30, config: {damping: 10}});
  return (
    <AbsoluteFill>
      <Plain glow={glow} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', opacity: 0.55}}>{children}</div>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <FollowButton scale={pop * (1 + 0.04 * Math.sin(f / 6))} />
      </div>
    </AbsoluteFill>
  );
};

// SCENES তালিকা থেকে দৃশ্য বাছাই
export const pick =
  (scenes: Record<string, React.FC<SP>>) =>
  ({seg, dur}: {seg: {id: string; visual: string}; dur: number}) => {
    const C = scenes[seg.visual] ?? None;
    return <C dur={dur} id={seg.id} />;
  };
