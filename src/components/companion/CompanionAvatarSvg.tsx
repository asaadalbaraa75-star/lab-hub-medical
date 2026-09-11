/*
 * © LAB HUB · Developed by Sakina Asaad
 * تطوير: سكينة أسعد
 * 
 * Original Interactive Cartoon Companion Avatar: "لبيب" (Labeeb)
 * High-definition 2D Educational Cartoon Character with 12 Expressive States
 * 100% Original Vector Artwork for LAB HUB — Protected Brand Identity
 */

import React from 'react';
import { CompanionExpression } from './companionTypes';

interface CompanionAvatarSvgProps {
  expression?: CompanionExpression;
  size?: number | string;
  className?: string;
  isAnimated?: boolean;
}

export const CompanionAvatarSvg: React.FC<CompanionAvatarSvgProps> = ({
  expression = 'happy',
  size = 140,
  className = '',
  isAnimated = true
}) => {
  // Dimension and viewbox
  const width = typeof size === 'number' ? size : size;
  const height = typeof size === 'number' ? size : size;

  // Render eye configurations based on expression
  const renderEyes = () => {
    switch (expression) {
      case 'happy':
      case 'welcome':
        return (
          <g className={isAnimated ? 'animate-companion-blink' : ''}>
            {/* Left Eye */}
            <circle cx="58" cy="62" r="7.5" fill="#1E1B4B" />
            <circle cx="55.5" cy="59.5" r="2.8" fill="#FFFFFF" />
            <circle cx="60" cy="64.5" r="1.2" fill="#FFFFFF" />
            {/* Right Eye */}
            <circle cx="82" cy="62" r="7.5" fill="#1E1B4B" />
            <circle cx="79.5" cy="59.5" r="2.8" fill="#FFFFFF" />
            <circle cx="84" cy="64.5" r="1.2" fill="#FFFFFF" />
          </g>
        );

      case 'celebrating':
      case 'correct_answer':
        return (
          <g>
            {/* Joyful curved laughing eyes (arc shape ^ ^) */}
            <path
              d="M 52 64 Q 58 56 64 64"
              stroke="#1E1B4B"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 76 64 Q 82 56 88 64"
              stroke="#1E1B4B"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Celebration eye sparkles */}
            <circle cx="68" cy="55" r="1.5" fill="#F59E0B" />
            <circle cx="72" cy="55" r="1.5" fill="#F59E0B" />
          </g>
        );

      case 'thinking':
        return (
          <g>
            {/* Looking slightly up and to the right */}
            <circle cx="59" cy="59" r="7" fill="#1E1B4B" />
            <circle cx="61" cy="57" r="2.5" fill="#FFFFFF" />
            <circle cx="83" cy="59" r="7" fill="#1E1B4B" />
            <circle cx="85" cy="57" r="2.5" fill="#FFFFFF" />
          </g>
        );

      case 'surprised':
        return (
          <g>
            {/* Big wide curious eyes with high specular dots */}
            <circle cx="58" cy="61" r="9" fill="#1E1B4B" />
            <circle cx="55" cy="58" r="3.6" fill="#FFFFFF" />
            <circle cx="61" cy="64" r="1.6" fill="#FFFFFF" />
            <circle cx="82" cy="61" r="9" fill="#1E1B4B" />
            <circle cx="79" cy="58" r="3.6" fill="#FFFFFF" />
            <circle cx="85" cy="64" r="1.6" fill="#FFFFFF" />
          </g>
        );

      case 'proud':
      case 'you_can_do_it':
        return (
          <g className={isAnimated ? 'animate-companion-blink' : ''}>
            {/* Determined confident eyes with sparkle */}
            <circle cx="58" cy="62" r="7.5" fill="#1E1B4B" />
            <circle cx="55.5" cy="59.5" r="3" fill="#FFFFFF" />
            <polygon points="61,57 62,59 64,59 62.5,60.5 63,62.5 61,61 59,62.5 59.5,60.5 58,59 60,59" fill="#FBBF24" />
            <circle cx="82" cy="62" r="7.5" fill="#1E1B4B" />
            <circle cx="79.5" cy="59.5" r="3" fill="#FFFFFF" />
            <polygon points="85,57 86,59 88,59 86.5,60.5 87,62.5 85,61 83,62.5 83.5,60.5 82,59 84,59" fill="#FBBF24" />
          </g>
        );

      case 'exam_encouragement':
      case 'encouraging':
      case 'goodbye':
      default:
        return (
          <g className={isAnimated ? 'animate-companion-blink' : ''}>
            {/* Soft, warm, reassuring eyes */}
            <circle cx="58" cy="62" r="7.2" fill="#1E1B4B" />
            <circle cx="56" cy="60" r="2.8" fill="#FFFFFF" />
            <circle cx="82" cy="62" r="7.2" fill="#1E1B4B" />
            <circle cx="80" cy="60" r="2.8" fill="#FFFFFF" />
          </g>
        );
    }
  };

  // Render mouth based on expression
  const renderMouth = () => {
    switch (expression) {
      case 'happy':
      case 'encouraging':
      case 'exam_encouragement':
      case 'goodbye':
        return (
          // Sweet gentle smile
          <path
            d="M 64 74 Q 70 80 76 74"
            stroke="#991B1B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        );

      case 'celebrating':
      case 'correct_answer':
      case 'welcome':
      case 'proud':
        return (
          // Big cheerful open smile with pink tongue
          <g>
            <path
              d="M 62 73 Q 70 85 78 73 Z"
              fill="#E11D48"
              stroke="#881337"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Tongue */}
            <path
              d="M 66 79 Q 70 76 74 79 Q 70 84 66 79 Z"
              fill="#FDA4AF"
            />
          </g>
        );

      case 'explaining':
        return (
          // Cute speaking mouth
          <ellipse cx="70" cy="74" rx="4" ry="4.5" fill="#E11D48" stroke="#881337" strokeWidth="1.8" />
        );

      case 'thinking':
        return (
          // Cute small thoughtful side smile
          <path
            d="M 66 75 Q 71 74 76 76"
            stroke="#991B1B"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        );

      case 'surprised':
        return (
          // Round 'o' mouth
          <circle cx="70" cy="75" r="4.2" fill="#E11D48" stroke="#881337" strokeWidth="2" />
        );

      case 'you_can_do_it':
        return (
          // Confident smile showing resolve
          <path
            d="M 63 73 Q 70 81 77 74"
            stroke="#991B1B"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
        );

      default:
        return (
          <path
            d="M 64 74 Q 70 79 76 74"
            stroke="#991B1B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        );
    }
  };

  // Render eyebrows based on expression
  const renderEyebrows = () => {
    switch (expression) {
      case 'thinking':
        return (
          <g>
            {/* Left eyebrow furrowed/level, right eyebrow raised high */}
            <path d="M 52 52 Q 58 53 64 52" stroke="#451A03" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M 76 48 Q 82 45 88 49" stroke="#451A03" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'surprised':
        return (
          <g>
            {/* Both eyebrows raised high */}
            <path d="M 52 48 Q 58 45 64 48" stroke="#451A03" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M 76 48 Q 82 45 88 48" stroke="#451A03" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'you_can_do_it':
      case 'proud':
        return (
          <g>
            {/* Confident angled eyebrows */}
            <path d="M 53 54 Q 59 50 65 52" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 75 52 Q 81 50 87 54" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'encouraging':
      case 'exam_encouragement':
        return (
          <g>
            {/* Reassuring gentle soft eyebrows */}
            <path d="M 53 51 Q 59 50 64 53" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 76 53 Q 81 50 87 51" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </g>
        );

      default:
        return (
          <g>
            <path d="M 53 51 Q 59 48 64 51" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 76 51 Q 81 48 87 51" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </g>
        );
    }
  };

  // Render arms and hands based on expression
  const renderArmsAndHands = () => {
    switch (expression) {
      case 'welcome':
      case 'goodbye':
        return (
          <g>
            {/* Left Arm relaxed on hip */}
            <path d="M 44 95 Q 36 104 38 115" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="38" cy="116" r="4.5" fill="#FED7AA" />
            {/* Right Arm waving up high with animation */}
            <g className={isAnimated ? 'animate-companion-wave origin-[95px_95px]' : ''}>
              <path d="M 96 95 Q 106 82 110 70" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
              {/* Hand waving */}
              <circle cx="111" cy="68" r="5" fill="#FED7AA" />
              <path d="M 112 65 Q 115 63 115 67" stroke="#FED7AA" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>
        );

      case 'celebrating':
      case 'correct_answer':
        return (
          <g className={isAnimated ? 'animate-companion-bounce origin-[70px_100px]' : ''}>
            {/* Both arms raised joyfully in victory */}
            <path d="M 44 94 Q 30 80 26 66" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="25" cy="64" r="5" fill="#FED7AA" />
            <path d="M 96 94 Q 110 80 114 66" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="115" cy="64" r="5" fill="#FED7AA" />

            {/* Sparkles / Confetti stars floating around */}
            <path d="M 18 55 L 20 50 L 22 55 L 27 57 L 22 59 L 20 64 L 18 59 L 13 57 Z" fill="#F59E0B" />
            <path d="M 120 52 L 122 47 L 124 52 L 129 54 L 124 56 L 122 61 L 120 56 L 115 54 Z" fill="#38BDF8" />
            <circle cx="28" cy="46" r="2" fill="#EC4899" />
            <circle cx="112" cy="45" r="2.5" fill="#10B981" />
          </g>
        );

      case 'you_can_do_it':
        return (
          <g>
            {/* Left Arm relaxed */}
            <path d="M 44 95 Q 36 105 38 116" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="38" cy="116" r="4.5" fill="#FED7AA" />
            {/* Right Arm doing energetic fist pump */}
            <path d="M 96 95 Q 106 90 102 78" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Fist */}
            <circle cx="102" cy="76" r="5.5" fill="#FED7AA" />
            {/* Muscle resolve spark */}
            <path d="M 112 70 L 115 67 M 115 75 L 118 76" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'thinking':
        return (
          <g>
            {/* Left hand relaxed */}
            <path d="M 44 95 Q 36 105 38 116" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="38" cy="116" r="4.5" fill="#FED7AA" />
            {/* Right hand touching chin */}
            <path d="M 96 95 Q 98 84 82 79" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="80" cy="78" r="4.8" fill="#FED7AA" />
            {/* Thought spark above head */}
            <circle cx="94" cy="38" r="2.5" fill="#FBBF24" opacity="0.8" />
            <circle cx="100" cy="31" r="4" fill="#F59E0B" />
          </g>
        );

      case 'explaining':
        return (
          <g>
            {/* Left Arm relaxed on hip */}
            <path d="M 44 95 Q 36 104 38 115" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="38" cy="116" r="4.5" fill="#FED7AA" />
            {/* Right Arm pointing forward/right */}
            <path d="M 96 95 Q 108 96 116 94" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="117" cy="94" r="4.5" fill="#FED7AA" />
            {/* Extended pointing index finger */}
            <path d="M 119 93 L 125 92" stroke="#FED7AA" strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'exam_encouragement':
        return (
          <g>
            {/* Right hand over heart reassuringly */}
            <path d="M 96 95 Q 86 92 74 93" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="73" cy="93" r="4.8" fill="#FED7AA" />
            {/* Left hand relaxed */}
            <path d="M 44 95 Q 36 105 38 116" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="38" cy="116" r="4.5" fill="#FED7AA" />
          </g>
        );

      case 'proud':
        return (
          <g>
            {/* Both hands on hips confidently */}
            <path d="M 44 95 Q 34 102 42 112" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="42" cy="113" r="4.5" fill="#FED7AA" />
            <path d="M 96 95 Q 106 102 98 112" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="98" cy="113" r="4.5" fill="#FED7AA" />
          </g>
        );

      case 'encouraging':
      case 'happy':
      default:
        return (
          <g>
            {/* Gentle relaxed posture with small thumbs up / open palm */}
            <path d="M 44 95 Q 36 105 38 116" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="38" cy="116" r="4.5" fill="#FED7AA" />
            <path d="M 96 95 Q 105 102 104 112" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="104" cy="113" r="4.8" fill="#FED7AA" />
            {/* Tiny encouraging thumb */}
            <path d="M 104 110 L 104 107" stroke="#FED7AA" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width, height }}
      id="labhub-companion-labeeb-avatar"
    >
      <svg
        viewBox="0 0 140 145"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isAnimated ? 'animate-companion-float' : ''}
      >
        <defs>
          {/* Subtle Hair Gradient */}
          <linearGradient id="hairGrad" x1="40" y1="20" x2="100" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#312E81" />
            <stop offset="50%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Skin Tone Gradient */}
          <linearGradient id="skinGrad" x1="50" y1="35" x2="90" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF1E6" />
            <stop offset="100%" stopColor="#FED7AA" />
          </linearGradient>

          {/* Lab Coat Shading */}
          <linearGradient id="coatGrad" x1="40" y1="85" x2="100" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Stethoscope Gradient */}
          <linearGradient id="stethoGrad" x1="50" y1="80" x2="90" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          {/* Cheerful Shadow */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* --- 1. BACK HAIR LAYER --- */}
        <ellipse cx="70" cy="58" rx="34" ry="32" fill="url(#hairGrad)" />

        {/* --- 2. EARS --- */}
        {/* Left Ear */}
        <circle cx="39" cy="64" r="7" fill="url(#skinGrad)" stroke="#FDBA74" strokeWidth="1" />
        <circle cx="39" cy="64" r="3.5" fill="#FDBA74" opacity="0.6" />
        {/* Right Ear */}
        <circle cx="101" cy="64" r="7" fill="url(#skinGrad)" stroke="#FDBA74" strokeWidth="1" />
        <circle cx="101" cy="64" r="3.5" fill="#FDBA74" opacity="0.6" />

        {/* --- 3. FACE & HEAD SHAPE --- */}
        {/* Soft rounded jaw and cheeks */}
        <path
          d="M 42 56 C 42 38, 98 38, 98 56 C 98 78, 86 88, 70 88 C 54 88, 42 78, 42 56 Z"
          fill="url(#skinGrad)"
          filter="url(#softShadow)"
        />

        {/* --- 4. ROSY CHEEKS --- */}
        <ellipse cx="50" cy="70" rx="5" ry="3" fill="#FDA4AF" opacity="0.6" />
        <ellipse cx="90" cy="70" rx="5" ry="3" fill="#FDA4AF" opacity="0.6" />

        {/* --- 5. EYES & BROWS --- */}
        {renderEyebrows()}
        {renderEyes()}

        {/* --- 6. NOSE & MOUTH --- */}
        {/* Cute button nose */}
        <path d="M 69 68 Q 70 70 71 68" stroke="#FB923C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {renderMouth()}

        {/* --- 7. FRONT HAIR & TUFT --- */}
        {/* Front friendly swept bangs */}
        <path
          d="M 38 52 C 45 35, 65 34, 74 42 C 82 36, 96 38, 102 52 C 94 45, 84 45, 76 50 C 66 43, 50 44, 38 52 Z"
          fill="url(#hairGrad)"
        />
        {/* Signature cute educational hair cowlick on top */}
        <path
          d="M 68 36 C 65 24, 76 22, 78 28 C 82 23, 86 26, 82 34 Z"
          fill="url(#hairGrad)"
        />

        {/* --- 8. BODY & CRISP MEDICAL LAB COAT --- */}
        {/* Inner Scrub Neckline */}
        <path d="M 63 87 L 70 95 L 77 87 Z" fill="#6366F1" />
        {/* Lab Coat Torso */}
        <path
          d="M 52 87 L 44 135 L 96 135 L 88 87 Q 70 89 52 87 Z"
          fill="url(#coatGrad)"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          filter="url(#softShadow)"
        />
        {/* Coat Lapels */}
        <path d="M 53 87 L 62 110 L 70 95 L 63 87 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 87 87 L 78 110 L 70 95 L 77 87 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
        {/* Center Coat Seam & Buttons */}
        <line x1="70" y1="95" x2="70" y2="135" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="1 3" />
        <circle cx="70" cy="116" r="1.5" fill="#94A3B8" />
        <circle cx="70" cy="126" r="1.5" fill="#94A3B8" />

        {/* --- 9. LAB HUB OFFICIAL BREAST POCKET BADGE --- */}
        {/* Miniature pocket on left breast */}
        <rect x="52" y="103" width="11" height="12" rx="1.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        {/* Pocket Top Line */}
        <line x1="52" y1="103" x2="63" y2="103" stroke="#818CF8" strokeWidth="1.5" />
        {/* Micro Monogram LH */}
        <text x="53.5" y="112" fontSize="5.5" fontWeight="900" fill="#4F46E5" fontFamily="monospace">
          LH
        </text>

        {/* --- 10. DOCTOR STETHOSCOPE --- */}
        {/* Stethoscope Tubing around neck */}
        <path
          d="M 55 88 Q 50 102 58 115 Q 70 123 78 116 Q 88 106 85 88"
          stroke="url(#stethoGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Metallic Chestpiece Bell */}
        <circle cx="78" cy="116" r="4.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
        <circle cx="78" cy="116" r="2.5" fill="#4F46E5" />

        {/* --- 11. ARMS AND GESTURES --- */}
        {renderArmsAndHands()}
      </svg>
    </div>
  );
};
