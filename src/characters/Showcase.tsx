// Studio-তে চরিত্র দেখার জন্য: ন্যারেটরের মুখের ভাব, ভঙ্গি, চরিত্রের সারি, আর একটা ডেমো
import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {fontFamily} from '../common/Story';
import {Expression, Toon} from '../common/Toon';
import {BBA_GOLD, CAST, CastName} from '../common/cast';
import {NarratorPop, NarratorScene, NarratorStudio} from '../common/Narrator';
import {NARRATOR_BG, NPose, NarratorArt} from '../common/NarratorArt';

const Label: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{marginTop: 6, textAlign: 'center', fontSize: 34, fontWeight: 700, color: '#f2efe9'}}>{children}</div>
);

const Heading: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center', fontSize: 64, fontWeight: 800, color: BBA_GOLD}}>{children}</div>
);

const EXPRS: [Expression, string][] = [
  ['neutral', 'স্বাভাবিক'],
  ['smile', 'হাসি'],
  ['laugh', 'জোরে হাসি'],
  ['surprised', 'অবাক'],
  ['shocked', 'শক'],
  ['serious', 'গম্ভীর'],
  ['worried', 'চিন্তিত'],
  ['sad', 'দুঃখ'],
  ['thinking', 'ভাবনা'],
  ['skeptical', 'সন্দেহ'],
  ['wink', 'চোখ টিপ'],
];

export const NarratorFaces: React.FC = () => (
  <AbsoluteFill style={{fontFamily}}>
    <NarratorStudio circle={false} />
    <Heading>ন্যারেটরের মুখের ভাব</Heading>
    <div style={{position: 'absolute', top: 180, left: 30, right: 30, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10}}>
      {EXPRS.map(([e, name]) => (
        <div key={e} style={{width: 320}}>
          <div style={{width: 320, height: 330, overflow: 'hidden', borderRadius: 24, background: NARRATOR_BG, display: 'flex', justifyContent: 'center'}}>
            <div style={{marginTop: 0}}>
              <NarratorArt height={640} expression={e} pose="idle" talking={false} />
            </div>
          </div>
          <Label>{name}</Label>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

const POSES: [NPose, Expression, string][] = [
  ['explain', 'smile', 'বোঝানো'],
  ['pointUp', 'smile', 'শোনো!'],
  ['palms', 'surprised', 'দুই হাত খোলা'],
  ['think', 'thinking', 'ভাবনা'],
  ['crossArms', 'smile', 'হাত ভাঁজ'],
  ['idea', 'laugh', 'আইডিয়া!'],
  ['book', 'smile', 'বই'],
  ['laptop', 'smile', 'ল্যাপটপ'],
  ['mug', 'smile', 'চা'],
  ['present', 'smile', 'চার্ট দেখানো'],
  ['pointL', 'serious', 'বাঁয়ে দেখানো'],
  ['thumbsUp', 'laugh', 'দারুণ'],
];

export const NarratorGestures: React.FC = () => (
  <AbsoluteFill style={{fontFamily}}>
    <NarratorStudio circle={false} />
    <Heading>ন্যারেটরের ভঙ্গি</Heading>
    <div style={{position: 'absolute', top: 170, left: 20, right: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12}}>
      {POSES.map(([p, e, name]) => (
        <div key={p} style={{width: 330}}>
          <div style={{width: 330, height: 330, overflow: 'hidden', borderRadius: 24, background: NARRATOR_BG, display: 'flex', justifyContent: 'center'}}>
            <div style={{marginTop: 6}}>
              <NarratorArt height={330} expression={e} pose={p} talking={false} />
            </div>
          </div>
          <Label>{name}</Label>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

const CAST_NAMES: [CastName, string][] = [
  ['boss', 'বস'],
  ['ceo', 'CEO'],
  ['exec', 'নির্বাহী'],
  ['founder', 'উদ্যোক্তা'],
  ['pro', 'পেশাজীবী'],
  ['engineer', 'ইঞ্জিনিয়ার'],
  ['customer', 'ক্রেতা'],
  ['customer2', 'ক্রেতা ২'],
  ['worker', 'কর্মী'],
];

export const CastLineup: React.FC = () => (
  <AbsoluteFill style={{fontFamily, background: 'linear-gradient(180deg, #1c2230, #0b0d12)'}}>
    <Heading>আমাদের চরিত্র</Heading>
    <div style={{position: 'absolute', top: 180, left: 20, right: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: 40}}>
      {CAST_NAMES.map(([k, name], i) => (
        <div key={k} style={{width: 346, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Toon height={480} {...CAST[k]} expression={(['smile', 'serious', 'neutral', 'laugh', 'smile', 'thinking', 'neutral', 'smile', 'neutral'] as Expression[])[i]} seed={`c${k}`} />
          <Label>{name}</Label>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

// ডেমো: ন্যারেটর পুরো পর্দায়, তারপর গল্পের দৃশ্যের কোণে
const DEMO: {expression: Expression; pose: NPose; text?: string}[] = [
  {expression: 'smile', pose: 'wave', text: 'আসসালামু আলাইকুম!'},
  {expression: 'shocked', pose: 'palms', text: 'ভাবতে পারো?'},
  {expression: 'serious', pose: 'pointUp', text: 'মনে রেখো…'},
  {expression: 'thinking', pose: 'think'},
  {expression: 'laugh', pose: 'idea', text: 'আইডিয়া!'},
  {expression: 'smile', pose: 'present', text: 'দেখো'},
];

export const NarratorDemo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{fontFamily}}>
      {DEMO.map((c, i) => (
        <Sequence key={i} from={i * 60} durationInFrames={60}>
          <NarratorScene cue={c} dur={60} />
        </Sequence>
      ))}
      <Sequence from={360} durationInFrames={120}>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a3a5a, #0b0d12)'}}>
          <div style={{position: 'absolute', left: 140, top: 600}}>
            <Toon height={900} {...CAST.ceo} expression="worried" gesture="idle" seed="d1" />
          </div>
          <div style={{position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center', fontSize: 70, fontWeight: 800, color: '#fff'}}>গল্পের দৃশ্য</div>
          <NarratorPop cue={{expression: f % 120 < 60 ? 'surprised' : 'smile', pose: 'pointL'}} dur={120} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
