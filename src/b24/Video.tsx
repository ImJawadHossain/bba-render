import React from 'react';
import {GOLD, GREEN, RED} from '../biz/art';
import {SP} from '../common/kit';
import {PsyThumb} from '../common/psy';
import {Home} from '../common/places';
import {Count, MIDDLE, Pair, R, Solo, WOMAN, story} from '../common/reel';
import {HandPaper} from '../common/laws48';
import {Apartment, Glass, popIn, soft, sticker} from '../common/elegant';
import {outro} from '../common/best30';
import {ToonLook} from '../common/Toon';
import raw from './segments.json';

const RAFIQ: ToonLook = {...MIDDLE, kurta: false, top: '#d6e2ea', bottom: '#2a2c30', glasses: true};
const BHABI: ToonLook = {...WOMAN, hairStyle: 'bun', top: '#7a2a5a', skirt: '#7a2a5a', bottom: '#7a2a5a', age: 0.4};
const Flats = <Apartment />;

// নোটিশ বোর্ডের তালিকা; smile দিলে কম খরচের পাশে হাসিমুখ
const UseList: React.FC<{smile?: boolean}> = ({smile}) => {
  const rows: [string, number][] = [['২-এ', 420], ['৩-বি', 980], ['৪-এ', 610], ['৫-সি', 1240], ['৬-বি', 380]];
  return (
    <div style={{width: 820, padding: '30px 36px', background: '#f6f2e8', border: '8px solid #1b1b1f', borderRadius: 16, fontWeight: 800, color: '#15151b', boxShadow: '0 26px 60px rgba(0,0,0,0.5)'}}>
      <div style={{fontSize: 52, textAlign: 'center'}}>পানির খরচ (লিটার/দিন)</div>
      {rows.map(([f, v]) => (
        <div key={f} style={{display: 'flex', justifyContent: 'space-between', fontSize: 46, marginTop: 10, color: v > 700 ? RED : '#15151b'}}>
          <span>ফ্ল্যাট {f}</span>
          <span>
            {v.toLocaleString('bn-BD')} {smile && v < 700 ? '🙂' : ''}
          </span>
        </div>
      ))}
      <div style={{fontSize: 46, marginTop: 14, borderTop: '4px solid #1b1b1f', paddingTop: 10, display: 'flex', justifyContent: 'space-between'}}>
        <span>বিল্ডিংয়ের গড়</span>
        <span>৭০০</span>
      </div>
    </div>
  );
};
const list = (smile = false) => popIn(<UseList smile={smile} />, 130, 420);

const SCENES: Record<string, React.FC<SP>> = {
  h1: R({place: soft(Flats, 8), over: list(), title: 'একটা কাগজ', color: GOLD}),
  h2: R({place: soft(Flats, 6), over: sticker('কোনো অনুরোধ নেই', {x: 190, y: 600, w: 700, bg: '#14305f', size: 76})}),
  s01: Count(30, {post: 'টা ফ্ল্যাট', label: 'পাম্পের বিল বাড়ছে', size: 220, color: RED, place: soft(Flats, 10)}),
  s02: R({place: soft(Flats, 4, 'cool'), over: sticker('পানি বাঁচান', {x: 240, y: 560, w: 600, bg: '#2a6a8a', size: 84}), title: 'কিছুই বদলায় না', color: RED}),
  s03: R({place: soft(Flats, 8), over: list()}),
  s04: Solo(soft(<Home />, 3), {look: RAFIQ, e: 'smile', g: 'hold', hold: HandPaper}, {title: 'বেশি খরচের ফ্ল্যাট কমায়', color: GREEN}),
  s05: Pair(soft(<Home />, 4), {look: RAFIQ, e: 'neutral'}, {look: BHABI, e: 'shocked', g: 'open', talk: true}),
  s06: R({place: soft(Flats, 6, 'dusk'), over: sticker('কম খরচের ফ্ল্যাট বাড়ায়!', {x: 150, y: 600, w: 780, bg: '#7a1f3a', size: 70})}),
  s07: R({place: soft(Flats, 8, 'gold'), over: list(true), title: 'পাশে একটা হাসিমুখ', color: GREEN}),
  s08: Glass('কেউ উপদেশে বাঁচায়নি', {place: Flats, tone: 'gold', sub: 'বাঁচিয়েছে প্রতিবেশীর চেয়ে খারাপ না দেখাতে'}),
  act: Glass('অনুরোধ না, তুলনা দেখাও', {place: Flats, color: '#bff2c8', sub: 'আর ভালোদের প্রশংসা করো'}),
  ...outro('Wesley Schultz ও Robert Cialdini', 'California', '২০০৭'),
};

const Thumb: React.FC = () => (
  <PsyThumb l1="নোটিশ বোর্ডে একটা কাগজ" l2="পানির বিল কমে গেল!" bottom="কোনো অনুরোধ ছাড়াই" term="প্রতিবেশীর প্রভাব" art={<div style={{position: 'absolute', left: 40, top: 1160, transform: 'scale(0.75)', transformOrigin: 'left top'}}><UseList /></div>} size={84} />
);
export const b24 = story('b24/', raw, SCENES, Thumb, {logo: 'bba2'});
