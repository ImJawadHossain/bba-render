// Asch ভিডিওর ঘর, লাইনের কার্ড আর ছাত্রদের সারি
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Person, PersonProps} from '../art';

export const BG = '#0d0b09';
export const FG = '#f2efe9';
export const RED = '#e0243c';
export const GOLD = '#e3bf7a';
export const GREEN = '#5fd08a';

type Look = Omit<PersonProps, 'height'>;

// ১৯৫০-এর কলেজ ছাত্র; শেষজন (index 7) আসল অংশগ্রহণকারী
export const STUDENTS: Look[] = [
  {hairStyle: 'short', hair: '#2a1d17', skin: '#e0b090', top: '#5a4a3a', tie: '#2a2a40'},
  {hairStyle: 'short', hair: '#6b4a2a', skin: '#efc6a6', top: '#3a4450'},
  {hairStyle: 'short', hair: '#1a120e', skin: '#d9a785', top: '#6a5a3a', glasses: true},
  {hairStyle: 'short', hair: '#a07a4a', skin: '#f0cdb0', top: '#4a3a3a', tie: '#7a2a2a'},
  {hairStyle: 'curly', hair: '#2a1a12', skin: '#c99271', top: '#3f4a3a'},
  {hairStyle: 'short', hair: '#3a2c24', skin: '#e6bb98', top: '#55504a', tie: '#2a3a5a'},
  {hairStyle: 'short', hair: '#5a4636', skin: '#dcaa88', top: '#384048'},
  {hairStyle: 'short', hair: '#3a2a1e', skin: '#e2b391', top: '#3b5a8a'},
];
export const ME = 7;
export const ASCH: Look = {hairStyle: 'short', hair: '#3a3430', skin: '#dcaa88', top: '#3a3a42', bottom: '#22252c', tie: '#5a2a2a', glasses: true};

export const ROW_Y = 1350; // ছাত্রদের নিচের রেখা (টেবিলের পেছনে)
export const TABLE_Y = 1150;
export const seatX = (i: number) => 92 + i * 128;
export const PERSON_H = 440;
export const headY = ROW_Y - PERSON_H + 60 * (PERSON_H / 540);

export const ClassRoom: React.FC<{dim?: number; warm?: number}> = ({dim = 0, warm = 1}) => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a3128 0%, #2a231d 60%, #1a1511 100%)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 1240, height: 12, background: '#1f1914'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 1252, bottom: 0, background: 'repeating-linear-gradient(90deg, #3a2a1c 0 90px, #33251a 90px 92px)'}} />
    {/* জানালার আলো */}
    <AbsoluteFill style={{background: `radial-gradient(ellipse 800px 1000px at 50% 20%, rgba(255,230,190,${0.18 * warm}), rgba(0,0,0,0) 70%)`}} />
    <AbsoluteFill style={{background: `rgba(0,0,0,${dim})`}} />
  </AbsoluteFill>
);

// আসল কার্ডের মতো: বাঁয়ে মূল লাইন, ডানে A B C (C সমান)
export const LINES = {std: 300, A: 220, B: 390, C: 300};
export const LineCard: React.FC<{
  width?: number;
  show?: number; // 0..1 লাইনগুলো ধাপে ধাপে আসে
  mark?: 'A' | 'B' | 'C';
  markColor?: string;
  ghost?: number; // মূল লাইন C-এর ওপর সরে মিলবে
  style?: React.CSSProperties;
}> = ({width = 900, show = 1, mark, markColor = GOLD, ghost = 0, style}) => {
  const base = 440;
  const ln = (x: number, len: number, o: number, label?: string, hl?: boolean) => (
    <g opacity={o}>
      <rect x={x - 7} y={base - len} width={14} height={len} rx={3} fill={hl ? markColor : '#1a1a1e'} style={{filter: hl ? `drop-shadow(0 0 14px ${markColor})` : undefined}} />
      {label ? (
        <text x={x} y={base + 56} textAnchor="middle" fontSize={50} fontWeight={700} fontFamily="Georgia, serif" fill={hl ? markColor : '#1a1a1e'}>
          {label}
        </text>
      ) : null}
    </g>
  );
  const step = (i: number) => Math.max(0, Math.min(1, show * 4 - i));
  return (
    <svg viewBox="0 0 900 540" width={width} height={(width * 540) / 900} style={{overflow: 'visible', ...style}}>
      <rect x={0} y={0} width={420} height={540} rx={14} fill="#f4efe2" />
      <rect x={470} y={0} width={430} height={540} rx={14} fill="#f4efe2" />
      {ln(210, LINES.std, step(0))}
      {ln(560, LINES.A, step(1), 'A', mark === 'A')}
      {ln(685, LINES.B, step(2), 'B', mark === 'B')}
      {ln(810, LINES.C, step(3), 'C', mark === 'C')}
      {ghost > 0 ? <rect x={210 + (810 - 210) * ghost - 7} y={base - LINES.std} width={14} height={LINES.std} rx={3} fill={GOLD} opacity={0.6} /> : null}
    </svg>
  );
};

export const Table: React.FC = () => (
  <div style={{position: 'absolute', left: -20, right: -20, top: TABLE_Y, height: 260, background: 'linear-gradient(180deg, #6b4a2c 0 22px, #4a3220 22px)', boxShadow: '0 -6px 20px rgba(0,0,0,0.4)'}} />
);

// আটজন বসা ছাত্র; spot = কাকে আলোয় রাখা, dimOthers = বাকিদের আবছা
export const Row: React.FC<{spot?: number; dimOthers?: number; looks?: (i: number) => Partial<Look>; tint?: (i: number) => string | undefined}> = ({
  spot,
  dimOthers = 0,
  looks,
  tint,
}) => (
  <>
    {STUDENTS.map((s, i) => (
      <div key={i} style={{position: 'absolute', left: seatX(i), top: ROW_Y, transform: 'translate(-50%, -100%)', opacity: spot !== undefined && i !== spot ? 1 - dimOthers : 1}}>
        <Person height={PERSON_H} {...s} {...(looks ? looks(i) : {})} silhouette={tint ? tint(i) : undefined} />
      </div>
    ))}
    <Table />
    {spot !== undefined ? (
      <div style={{position: 'absolute', left: seatX(spot) - 120, width: 240, top: ROW_Y - PERSON_H - 120, height: PERSON_H + 120, background: 'radial-gradient(ellipse, rgba(255,230,160,0.22), rgba(0,0,0,0) 70%)'}} />
    ) : null}
  </>
);

export const CollegeBuilding: React.FC<{width?: number}> = ({width = 1000}) => (
  <svg viewBox="0 0 1000 500" width={width} height={width / 2}>
    <g fill="#1d2430">
      <rect x={40} y={240} width={920} height={260} />
      <path d="M40 240 L500 170 L960 240Z" />
      <rect x={455} y={90} width={90} height={90} />
      <path d="M450 92 L500 30 L550 92Z" />
      <rect x={494} y={0} width={12} height={34} />
    </g>
    {Array.from({length: 13}, (_, i) => 80 + i * 70).map((x) =>
      [290, 390].map((y) => <rect key={`${x}${y}`} x={x} y={y} width={30} height={56} rx={3} fill={GOLD} opacity={0.7} />),
    )}
    <path d="M470 500 L470 420 Q500 390 530 420 L530 500Z" fill={GOLD} opacity={0.55} />
  </svg>
);
