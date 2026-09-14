/*
 * © LAB HUB · Developed by Sakina Asaad
 * High-Precision Anatomical Exam Pointer / Pin Component
 *
 * MEDICAL OSPE DESIGN PRINCIPLES:
 * 1. ZERO OBSTRUCTION: The pin tip points directly at (x%, y%) without covering the anatomical structure.
 * 2. NEEDLE-SHARP ACCURACY: A clean needle/arrow with high-contrast outline visible on bone, muscle, or viscera.
 * 3. OFFSET BADGE: The label badge ('PIN', number, or letter) sits on the tail/base of the arrow, far from the tip.
 * 4. FOCAL RING: A subtle, non-blocking pulsing ring highlights the pinpoint target.
 * 5. AUTO-ORIENTATION: Automatically angles inward from edges so it never bleeds outside the container.
 */

import React from 'react';

export interface AnatomyExamPointerProps {
  x: number; // 0 to 100 (%)
  y: number; // 0 to 100 (%)
  label?: string | number;
  highlighted?: boolean;
  className?: string;
  theme?: 'amber' | 'cyan' | 'emerald' | 'rose';
  showLabel?: boolean;
}

export const AnatomyExamPointer: React.FC<AnatomyExamPointerProps> = ({
  x,
  y,
  label = 'Target',
  highlighted = true,
  className = '',
  theme = 'amber',
  showLabel = true
}) => {
  // Determine optimal quadrant for arrow offset so pointer stays well inside container bounds
  // If x is on right (> 50%), point from top-right or bottom-right
  // If y is on bottom (> 55%), point from bottom
  const isRight = x > 52;
  const isBottom = y > 58;

  // Theme color palette
  const colors = {
    amber: {
      arrowFill: '#f59e0b',
      arrowStroke: '#000000',
      badgeBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
      badgeText: 'text-slate-950 font-black',
      badgeBorder: 'border-white ring-2 ring-amber-950/80',
      ringColor: 'border-amber-400',
      pingColor: 'bg-amber-400/50',
      glow: 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.6))'
    },
    cyan: {
      arrowFill: '#06b6d4',
      arrowStroke: '#000000',
      badgeBg: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
      badgeText: 'text-slate-950 font-black',
      badgeBorder: 'border-white ring-2 ring-cyan-950/80',
      ringColor: 'border-cyan-400',
      pingColor: 'bg-cyan-400/50',
      glow: 'drop-shadow(0 2px 8px rgba(6, 182, 212, 0.6))'
    },
    emerald: {
      arrowFill: '#10b981',
      arrowStroke: '#000000',
      badgeBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      badgeText: 'text-white font-black',
      badgeBorder: 'border-white ring-2 ring-emerald-950/80',
      ringColor: 'border-emerald-400',
      pingColor: 'bg-emerald-400/50',
      glow: 'drop-shadow(0 2px 8px rgba(16, 185, 129, 0.6))'
    },
    rose: {
      arrowFill: '#f43f5e',
      arrowStroke: '#000000',
      badgeBg: 'bg-gradient-to-br from-rose-500 to-rose-600',
      badgeText: 'text-white font-black',
      badgeBorder: 'border-white ring-2 ring-rose-950/80',
      ringColor: 'border-rose-400',
      pingColor: 'bg-rose-400/50',
      glow: 'drop-shadow(0 2px 8px rgba(244, 63, 94, 0.6))'
    }
  }[theme];

  // SVG arrow geometry
  // Arrow tip is at (0, 0) in the coordinate system of the anchor point
  // Tail extends to (dx, dy)
  const dx = isRight ? 36 : -36;
  const dy = isBottom ? 32 : -32;

  return (
    <div
      className={`absolute z-30 pointer-events-none select-none ${className}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(0, 0)'
      }}
    >
      {/* 1. Precision Focal Reticle at Target Point (0, 0) */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Subtle pulsing outer ring to draw the eye without obscuring */}
        {highlighted && (
          <span
            className={`absolute inline-flex h-6 w-6 rounded-full animate-ping opacity-60 ${colors.pingColor}`}
          />
        )}
        {/* Fine crosshair target center dot */}
        <div
          className={`w-2.5 h-2.5 rounded-full bg-white border border-black shadow-md ${colors.glow}`}
        />
      </div>

      {/* 2. Precision Dissection Pointer Arrow pointing to (0, 0) */}
      <svg
        className="absolute overflow-visible pointer-events-none"
        style={{
          left: 0,
          top: 0,
          width: '1px',
          height: '1px'
        }}
      >
        <defs>
          <filter id={`arrow-shadow-${theme}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.85" />
          </filter>
        </defs>

        <g filter={`url(#arrow-shadow-${theme})`}>
          {/* Arrow Line with thick contrast border */}
          <line
            x1={dx}
            y1={dy}
            x2={0}
            y2={0}
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1={dx}
            y1={dy}
            x2={0}
            y2={0}
            stroke={colors.arrowFill}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Sharp Arrowhead pointing directly at (0, 0) */}
          <polygon
            points={
              // Calculate arrowhead points relative to (0,0) and vector (dx, dy)
              // Vector from tail (dx, dy) to tip (0, 0) is (-dx, -dy)
              (() => {
                const len = Math.sqrt(dx * dx + dy * dy);
                const ux = -dx / len;
                const uy = -dy / len;
                const headLen = 14;
                const headWidth = 7;
                // Base of head:
                const bx = -ux * headLen;
                const by = -uy * headLen;
                // Perpendicular:
                const px = -uy * headWidth;
                const py = ux * headWidth;

                return `0,0 ${bx + px},${by + py} ${bx * 0.7},${by * 0.7} ${bx - px},${by - py}`;
              })()
            }
            fill={colors.arrowFill}
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {/* 3. Non-Obstructing Station / Pointer Flag at the Arrow Tail */}
      {showLabel && (
        <div
          className="absolute pointer-events-auto"
          style={{
            left: `${dx}px`,
            top: `${dy}px`,
            transform: `translate(${isRight ? '0%' : '-100%'}, ${isBottom ? '0%' : '-100%'})`
          }}
        >
          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border shadow-2xl transition-transform duration-150 ${colors.badgeBg} ${colors.badgeBorder}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
            <span className={`text-[11px] font-mono uppercase tracking-wider ${colors.badgeText}`}>
              {label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
