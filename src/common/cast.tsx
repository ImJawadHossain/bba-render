// বারবার ব্যবহারের চরিত্র (Toon রিগ দিয়ে)। গল্পের বাস্তব মানুষের জন্য এগুলোর রং/চুল বদলে নাও।
import React from 'react';
import {ToonLook} from './Toon';

export const BBA_GOLD = '#f2b705';
export const BBA_NAVY = '#0f1b33';

// বুকে ছোট BBA তীর
const BbaBadge: React.FC = () => (
  <g transform="translate(222 420)">
    <circle r={26} fill={BBA_NAVY} stroke={BBA_GOLD} strokeWidth={5} />
    <path d="M-12 10 L4 -6 L-2 -10 L14 -14 L10 2 L6 -4 L-10 12Z" fill={BBA_GOLD} />
  </g>
);

// ন্যারেটর: আমাদের পেজের মুখ। ৫৫–৬০ বছরের মুরব্বি (ভয়েসের সঙ্গে মিলিয়ে):
// কাঁচা-পাকা সিঁথি করা চুল, মোটা পাকা গোঁফ, চৌকো চশমা, ঘিয়ে শার্টের ওপর BBA-সোনালি ব্লেজার।
// (সাদা দাড়ি + পাঞ্জাবি-কোটি একজন পরিচিত রাজনীতিবিদের মতো লাগে, তাই সেটা নয়)
export const NARRATOR: ToonLook = {
  skin: '#c48a5e',
  hair: '#7d7870',
  hairStyle: 'side',
  beardColor: '#9a958c',
  mustache: true,
  top: '#f2ece0',
  jacket: '#d9a21b',
  bottom: '#2a2c34',
  shoes: '#3a2618',
  glasses: true,
  glassesShape: 'rect',
  age: 1,
  headScale: 1.22,
  chest: <BbaBadge />,
};

// বারবার আসা চরিত্র
export const CAST = {
  // ব্যবসার মালিক / বড় বস (বয়স্ক)
  boss: {skin: '#e2b391', hair: '#e6e2da', hairStyle: 'balding', top: '#f4f2ec', jacket: '#262a33', tie: '#9a1c2a', bottom: '#1c1e24', glasses: true, mustache: true} as ToonLook,
  // কর্পোরেট CEO
  ceo: {skin: '#edc29e', hair: '#5a4434', hairStyle: 'side', top: '#f4f2ec', jacket: '#1f2633', tie: '#2b4fa0', bottom: '#1a1c22'} as ToonLook,
  // নারী নির্বাহী
  exec: {skin: '#e8b994', hair: '#2a1a12', hairStyle: 'bun', top: '#f4f2ec', jacket: '#7a1f3a', bottom: '#1a1c22', skirt: '#1a1c22'} as ToonLook,
  // তরুণ উদ্যোক্তা
  founder: {skin: '#d9a07a', hair: '#1c1410', hairStyle: 'curly', top: '#2b5fd9', bottom: '#2a2c30', shoes: '#e8e4dc'} as ToonLook,
  // হিজাব পরা পেশাজীবী
  pro: {skin: '#d6a07c', hair: '#2f4a6a', hairStyle: 'hijab', top: '#e8e4dc', jacket: '#3a4a5a', bottom: '#22252c'} as ToonLook,
  // ইঞ্জিনিয়ার / বিজ্ঞানী
  engineer: {skin: '#efc6a6', hair: '#3a2a1e', hairStyle: 'short', top: '#4a6a8a', labCoat: true, bottom: '#2a2c30', glasses: true} as ToonLook,
  // সাধারণ ক্রেতা (পুরুষ)
  customer: {skin: '#c98d62', hair: '#1a1410', hairStyle: 'short', top: '#3f7a5a', bottom: '#2a2c30', shoes: '#e8e4dc'} as ToonLook,
  // সাধারণ ক্রেতা (নারী)
  customer2: {skin: '#e0ac86', hair: '#3a2418', hairStyle: 'long', top: '#c0504a', bottom: '#2a2c30'} as ToonLook,
  // কর্মী
  worker: {skin: '#b87a52', hair: '#1a1410', hairStyle: 'short', top: '#d9822b', bottom: '#2f3440', beard: true} as ToonLook,
};

export type CastName = keyof typeof CAST;
