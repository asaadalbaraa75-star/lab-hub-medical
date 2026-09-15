/*
 * © LAB HUB · Developed by Sakina Asaad
 * High-Precision Histology Exam Pointer / Pin Component
 *
 * MEDICAL HISTOLOGY OSPE DESIGN PRINCIPLES:
 * 1. ZERO OBSTRUCTION: The needle tip touches (x%, y%) directly without covering cellular/tissue details.
 * 2. OPTICAL CONTRAST: Dual-contrast needle (vibrant cyan/gold with dark stroke) stands out against H&E pink/purple.
 * 3. OFFSET BADGE: The label badge ('①', '②', or target name) sits on the arrow's tail, away from the tip.
 * 4. FOCAL RING: A fine, non-blocking target reticle pinpoints the exact structure (cilia, nucleus, basement membrane, etc.).
 * 5. BOUNDARY-SAFE: Automatically angles inward from edges so it never clips container boundaries.
 */

import React from 'react';

export interface HistologyExamPointerProps {
  x: number; // 0 to 100 (%)
  y: number; // 0 to 100 (%)
  pointerNumber?: number | string;
  label?: string;
  theme?: 'cyan' | 'amber' | 'emerald' | 'rose';
  showLabel?: boolean;
  className?: string;
}

export const HistologyExamPointer: React.FC<HistologyExamPointerProps> = ({
  x,
  y,
  pointerNumber = 1,
  label,
  theme = 'cyan',
  showLabel = true,
  className = ''
}) => {
  // Determine direction to offset arrow tail so it never bleeds out of frame
  const isRight = x > 52;
  const isBottom = y > 58;

  // Theme palettes optimized for microscopy slides (H&E, Silver, Orcein)
  const themeStyles = {
    cyan: {
      arrowFill: '#06b6d4',
      badgeBg: 'bg-cyan-500',
      badgeText: 'text-slate-950',
      ringColor: 'border-cyan-400',
      pingColor: 'bg-cyan-400/50',
      glow: 'drop-shadow(0 2px 6px rgba(6, 182, 212, 0.7))'
    },
    amber: {
      arrowFill: '#f59e0b',
      badgeBg: 'bg-amber-500',
      badgeText: 'text-slate-950',
      ringColor: 'border-amber-400',
      pingColor: 'bg-amber-400/50',
      glow: 'drop-shadow(0 2px 6px rgba(245, 158, 11, 0.7))'
    },
    emerald: {
      arrowFill: '#10b981',
      badgeBg: 'bg-emerald-500',
      badgeText: 'text-white',
      ringColor: 'border-emerald-400',
      pingColor: 'bg-emerald-400/50',
      glow: 'drop-shadow(0 2px 6px rgba(16, 185, 129, 0.7))'
    },
    rose: {
      arrowFill: '#f43f5e',
      badgeBg: 'bg-rose-500',
      badgeText: 'text-white',
      ringColor: 'border-rose-400',
      pingColor: 'bg-rose-400/50',
      glow: 'drop-shadow(0 2px 6px rgba(244, 63, 94, 0.7))'
    }
  }[theme];

  // Tail coordinates relative to tip at (0, 0)
  const dx = isRight ? 38 : -38;
  const dy = isBottom ? 34 : -34;

  const displayNum = typeof pointerNumber === 'number'
    ? (pointerNumber === 1 ? '①' : pointerNumber === 2 ? '②' : pointerNumber === 3 ? '③' : `${pointerNumber}`)
    : pointerNumber;

  return (
    <div
      className={`absolute z-30 pointer-events-none select-none ${className}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(0, 0)'
      }}
    >
      {/* 1. Precise Focal Reticle at Target Point (0, 0) */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <span className={`animate-ping absolute inline-flex h-5 w-5 rounded-full ${themeStyles.pingColor} opacity-75`} />
        <div className={`w-3 h-3 rounded-full border-2 ${themeStyles.ringColor} bg-white/20 shadow-sm`} />
        <div className="w-1 h-1 rounded-full bg-white shadow-md" />
      </div>

      {/* 2. Razor-Sharp Needle Arrow pointing directly at (0, 0) */}
      <svg
        className="absolute pointer-events-none overflow-visible"
        style={{
          left: 0,
          top: 0,
          filter: themeStyles.glow
        }}
        width="1"
        height="1"
      >
        <defs>
          <filter id={`histology-pointer-shadow-${theme}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Needle shaft with black contrast outline */}
        <line
          x1={dx}
          y1={dy}
          x2={0}
          y2={0}
          stroke="#000000"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <line
          x1={dx}
          y1={dy}
          x2={0}
          y2={0}
          stroke={themeStyles.arrowFill}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Sharp Arrow Tip at (0, 0) */}
        <polygon
          points={`0,0 ${dx > 0 ? 10 : -10},${dy > 0 ? 4 : -4} ${dx > 0 ? 4 : -4},${dy > 0 ? 10 : -10}`}
          fill={themeStyles.arrowFill}
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* 3. Offset Badge & Label at the Needle Base (dx, dy) */}
      <div
        className="absolute pointer-events-none flex flex-col items-center"
        style={{
          left: `${dx}px`,
          top: `${dy}px`,
          transform: `translate(${isRight ? '-10%' : '-90%'}, ${isBottom ? '-10%' : '-90%'})`
        }}
      >
        <div className="flex items-center gap-1.5 drop-shadow-xl">
          <div
            className={`w-7 h-7 rounded-full ${themeStyles.badgeBg} ${themeStyles.badgeText} border-2 border-white font-black text-xs flex items-center justify-center shadow-2xl ring-2 ring-black/70 font-mono`}
          >
            {displayNum}
          </div>

          {showLabel && label && (
            <div className="px-2 py-0.5 rounded-md bg-slate-950/95 border border-white/30 text-white text-[10px] font-bold shadow-2xl whitespace-nowrap backdrop-blur-md">
              {label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
