import React, { useState } from 'react';
import { AnatomyTopic, AnatomySpotterItem } from './AnatomyData';

interface AnatomyVisualProps {
  topicId: string;
  selectedPinNumber?: number | null;
  activePinNumber?: number | null;
  onPinClick?: (pin: AnatomySpotterItem) => void;
  spotters?: AnatomySpotterItem[];
  interactive?: boolean;
  showLabels?: boolean;
  className?: string;
  isThumbnail?: boolean;
  variant?: 'full' | 'thumbnail' | 'exam';
}

export const AnatomyTopicVisual: React.FC<AnatomyVisualProps> = ({
  topicId,
  selectedPinNumber,
  activePinNumber,
  onPinClick,
  spotters = [],
  interactive = true,
  showLabels = true,
  className = '',
  isThumbnail = false,
  variant = 'full'
}) => {
  const [hoveredStructure, setHoveredStructure] = useState<string | null>(null);

  const getEffectivePin = (num: number): AnatomySpotterItem | undefined => {
    return spotters.find(s => s.pinNumber === num);
  };

  const handleStructureClick = (pinNum: number) => {
    if (!interactive) return;
    const pin = getEffectivePin(pinNum);
    if (pin && onPinClick) {
      onPinClick(pin);
    }
  };

  // Helper for pin styling
  const getPinClass = (pinNum: number) => {
    const isSelected = selectedPinNumber === pinNum;
    const isActive = activePinNumber === pinNum;

    if (isSelected || isActive) {
      return 'fill-amber-400 stroke-white stroke-2 shadow-lg filter drop-shadow(0 0 8px rgba(251,191,36,0.8)) cursor-pointer transition-all duration-200 transform scale-125';
    }
    return 'fill-indigo-600 stroke-white stroke-1 hover:fill-indigo-400 hover:scale-115 cursor-pointer transition-all duration-200';
  };

  // 1. ANATOMICAL PLANES VISUAL
  const renderPlanesVisual = () => (
    <svg viewBox="0 0 600 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradients for Planes */}
        <linearGradient id="sagittalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="coronalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="transverseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.75" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Dark Grid Background */}
      <rect width="600" height="500" fill="#090d16" />
      <g stroke="#1e293b" strokeWidth="0.5" opacity="0.6">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 45} x2="600" y2={i * 45} />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 45} y1="0" x2={i * 45} y2="500" />
        ))}
      </g>

      {/* Title Header on SVG */}
      {!isThumbnail && (
        <g>
          <text x="300" y="32" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
            STANDARD ANATOMICAL PLANES OF THE HUMAN BODY
          </text>
          <text x="300" y="50" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Sagittal (Median) • Coronal (Frontal) • Transverse (Axial)
          </text>
        </g>
      )}

      {/* 3D Coordinate Reference Axes */}
      <g transform="translate(480, 430)">
        <line x1="0" y1="0" x2="50" y2="0" stroke="#06b6d4" strokeWidth="2.5" markerEnd="url(#arrowCyan)" />
        <line x1="0" y1="0" x2="0" y2="-50" stroke="#8b5cf6" strokeWidth="2.5" />
        <line x1="0" y1="0" x2="-35" y2="25" stroke="#10b981" strokeWidth="2.5" />
        <text x="55" y="4" fill="#06b6d4" fontSize="10" fontWeight="bold">X (Sagittal)</text>
        <text x="5" y="-55" fill="#8b5cf6" fontSize="10" fontWeight="bold">Y (Vertical)</text>
        <text x="-45" y="38" fill="#10b981" fontSize="10" fontWeight="bold">Z (Axial)</text>
      </g>

      {/* Central Anatomical Silhouette */}
      <g transform="translate(300, 260)">
        {/* Head */}
        <circle cx="0" cy="-140" r="28" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
        {/* Neck */}
        <path d="M-8 -112 L-8 -95 L8 -95 L8 -112 Z" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
        {/* Torso */}
        <path d="M-45 -95 L45 -95 L35 45 L-35 45 Z" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        {/* Arms (Anatomical Position - Palms Forward) */}
        <path d="M-45 -90 L-85 -10 L-95 55 L-85 60 L-75 -5 L-40 -80 Z" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
        <path d="M45 -90 L85 -10 L95 55 L85 60 L75 -5 L40 -80 Z" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
        {/* Legs */}
        <path d="M-32 45 L-40 140 L-35 180 L-10 180 L-12 140 L-8 45 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
        <path d="M32 45 L40 140 L35 180 L10 180 L12 140 L8 45 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
      </g>

      {/* PLANE 1: CORONAL (Frontal Plane) - Dividing Front & Back */}
      <g 
        onClick={() => handleStructureClick(2)} 
        onMouseEnter={() => setHoveredStructure('Coronal Plane')}
        onMouseLeave={() => setHoveredStructure(null)}
        className="cursor-pointer transition-opacity"
      >
        <polygon 
          points="80,110 520,110 520,440 80,440" 
          fill="url(#coronalGrad)" 
          stroke="#a78bfa" 
          strokeWidth={selectedPinNumber === 2 ? "3" : "1.5"}
          strokeDasharray="4 2"
          opacity={hoveredStructure === 'Coronal Plane' || selectedPinNumber === 2 ? 0.9 : 0.65}
        />
        <text x="95" y="130" fill="#c4b5fd" fontSize="12" fontWeight="bold" filter="url(#glow)">
          CORONAL (FRONTAL) PLANE
        </text>
        <text x="95" y="145" fill="#e2e8f0" fontSize="10">
          Divides into Anterior (Front) & Posterior (Back)
        </text>
      </g>

      {/* PLANE 2: SAGITTAL (Median Plane) - Dividing Right & Left */}
      <g 
        onClick={() => handleStructureClick(1)}
        onMouseEnter={() => setHoveredStructure('Sagittal Plane')}
        onMouseLeave={() => setHoveredStructure(null)}
        className="cursor-pointer transition-opacity"
      >
        <polygon 
          points="300,70 300,470 230,410 230,120" 
          fill="url(#sagittalGrad)" 
          stroke="#22d3ee" 
          strokeWidth={selectedPinNumber === 1 ? "3" : "2"}
          opacity={hoveredStructure === 'Sagittal Plane' || selectedPinNumber === 1 ? 0.95 : 0.75}
        />
        <text x="215" y="90" fill="#67e8f9" fontSize="12" fontWeight="bold" textAnchor="end">
          MIDSAGITTAL (MEDIAN) PLANE
        </text>
        <text x="215" y="105" fill="#e2e8f0" fontSize="10" textAnchor="end">
          Divides into Equal Right & Left Halves
        </text>
      </g>

      {/* PLANE 3: TRANSVERSE (Axial / Horizontal Plane) - Dividing Upper & Lower */}
      <g 
        onClick={() => handleStructureClick(3)}
        onMouseEnter={() => setHoveredStructure('Transverse Plane')}
        onMouseLeave={() => setHoveredStructure(null)}
        className="cursor-pointer transition-opacity"
      >
        <polygon 
          points="70,290 530,220 530,310 70,380" 
          fill="url(#transverseGrad)" 
          stroke="#34d399" 
          strokeWidth={selectedPinNumber === 3 ? "3" : "2"}
          strokeDasharray="6 3"
          opacity={hoveredStructure === 'Transverse Plane' || selectedPinNumber === 3 ? 0.95 : 0.75}
        />
        <text x="490" y="340" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="end">
          TRANSVERSE (AXIAL) PLANE
        </text>
        <text x="490" y="355" fill="#e2e8f0" fontSize="10" textAnchor="end">
          Divides into Superior (Upper) & Inferior (Lower)
        </text>
      </g>

      {/* Interactive Pin Markers (Hotspots) */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 265 : pin.pinNumber === 2 ? 380 : 300;
        const cy = pin.pinNumber === 1 ? 210 : pin.pinNumber === 2 ? 160 : 310;
        const isSelected = selectedPinNumber === pin.pinNumber;

        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={isSelected ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 2. DIRECTIONAL TERMS VISUAL
  const renderDirectionalTermsVisual = () => (
    <svg viewBox="0 0 600 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,8 L4,0 L8,8 L4,5 Z" fill="#38bdf8" />
        </marker>
        <marker id="arrowDown" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L4,8 L8,0 L4,3 Z" fill="#f43f5e" />
        </marker>
        <marker id="arrowMedial" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 L3,4 Z" fill="#fbbf24" />
        </marker>
        <marker id="arrowLateral" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M8,0 L0,4 L8,8 L5,4 Z" fill="#a855f7" />
        </marker>
      </defs>

      <rect width="600" height="500" fill="#090d16" />

      {/* Header */}
      {!isThumbnail && (
        <g>
          <text x="300" y="32" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            ANATOMICAL DIRECTIONAL TERMS & AXES
          </text>
          <text x="300" y="50" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Superior / Inferior • Anterior / Posterior • Medial / Lateral • Proximal / Distal
          </text>
        </g>
      )}

      {/* Central Human Silhouette in Anatomical Position */}
      <g transform="translate(300, 260)">
        {/* Head */}
        <circle cx="0" cy="-140" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        {/* Torso & Center Line */}
        <path d="M-40 -95 L40 -95 L30 45 L-30 45 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
        <line x1="0" y1="-170" x2="0" y2="190" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2" />
        {/* Limbs */}
        <path d="M-40 -90 L-85 -10 L-95 55 L-85 60 L-75 -5 L-35 -80 Z" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
        <path d="M40 -90 L85 -10 L95 55 L85 60 L75 -5 L35 -80 Z" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
        <path d="M-28 45 L-35 140 L-32 180 L-10 180 L-10 140 L-6 45 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
        <path d="M28 45 L35 140 L32 180 L10 180 L10 140 L6 45 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
      </g>

      {/* SUPERIOR (Cranial) Vector */}
      <g onClick={() => handleStructureClick(1)} className="cursor-pointer">
        <line x1="300" y1="110" x2="300" y2="60" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowUp)" />
        <rect x="235" y="60" width="130" height="24" rx="6" fill="#0369a1" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1" />
        <text x="300" y="76" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
          SUPERIOR (CRANIAL) ↑
        </text>
      </g>

      {/* INFERIOR (Caudal) Vector */}
      <g onClick={() => handleStructureClick(1)} className="cursor-pointer">
        <line x1="300" y1="410" x2="300" y2="460" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrowDown)" />
        <rect x="235" y="455" width="130" height="24" rx="6" fill="#9f1239" fillOpacity="0.8" stroke="#f43f5e" strokeWidth="1" />
        <text x="300" y="471" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
          INFERIOR (CAUDAL) ↓
        </text>
      </g>

      {/* MEDIAL Vector (Towards Midline) */}
      <g onClick={() => handleStructureClick(2)} className="cursor-pointer">
        <line x1="380" y1="230" x2="320" y2="230" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowMedial)" />
        <rect x="385" y="218" width="105" height="24" rx="6" fill="#854d0e" fillOpacity="0.8" stroke="#fbbf24" strokeWidth="1" />
        <text x="437" y="234" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
          MEDIAL (→ Center)
        </text>
      </g>

      {/* LATERAL Vector (Away from Midline) */}
      <g onClick={() => handleStructureClick(3)} className="cursor-pointer">
        <line x1="220" y1="230" x2="160" y2="230" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrowLateral)" />
        <rect x="55" y="218" width="100" height="24" rx="6" fill="#6b21a8" fillOpacity="0.8" stroke="#a855f7" strokeWidth="1" />
        <text x="105" y="234" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
          LATERAL (← Outer)
        </text>
      </g>

      {/* PROXIMAL & DISTAL Vectors on Upper Limb */}
      <g className="cursor-pointer">
        {/* Proximal */}
        <line x1="395" y1="180" x2="365" y2="160" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowUp)" />
        <text x="440" y="165" fill="#34d399" fontSize="10" fontWeight="bold">PROXIMAL (Near Trunk)</text>

        {/* Distal */}
        <line x1="385" y1="290" x2="395" y2="325" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrowDown)" />
        <text x="440" y="325" fill="#fbbf24" fontSize="10" fontWeight="bold">DISTAL (Toward Hand)</text>
      </g>

      {/* Hotspots */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 300 : pin.pinNumber === 2 ? 310 : 170;
        const cy = pin.pinNumber === 1 ? 120 : pin.pinNumber === 2 ? 260 : 250;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 3. BODY MOVEMENTS VISUAL
  const renderMovementsVisual = () => (
    <svg viewBox="0 0 600 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arcArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
        </marker>
        <marker id="arcArrowAmber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#fbbf24" />
        </marker>
      </defs>

      <rect width="600" height="500" fill="#090d16" />

      {!isThumbnail && (
        <g>
          <text x="300" y="32" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            ANATOMICAL BODY MOVEMENTS & JOINT MECHANICS
          </text>
          <text x="300" y="50" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Flexion/Extension • Abduction/Adduction • Supination/Pronation • Circumduction
          </text>
        </g>
      )}

      {/* 4 Quadrants of Essential Movements */}
      
      {/* 1. FLEXION & EXTENSION (Top Left) */}
      <g transform="translate(150, 150)" onClick={() => handleStructureClick(1)} className="cursor-pointer">
        <rect x="-130" y="-80" width="260" height="170" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="0" y="-55" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">FLEXION vs EXTENSION</text>
        {/* Elbow Joint Arm */}
        <line x1="-30" y1="10" x2="0" y2="-20" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
        <line x1="0" y1="-20" x2="40" y2="-10" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
        <circle cx="0" cy="-20" r="7" fill="#38bdf8" />
        {/* Flexion Arc */}
        <path d="M 30 -5 A 35 35 0 0 1 -10 -10" fill="none" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arcArrow)" />
        <text x="0" y="35" fill="#cbd5e1" fontSize="10" textAnchor="middle">Flexion: Angle Decreases</text>
        <text x="0" y="50" fill="#64748b" fontSize="9" textAnchor="middle">Extension: Angle Increases</text>
      </g>

      {/* 2. ABDUCTION & ADDUCTION (Top Right) */}
      <g transform="translate(450, 150)" onClick={() => handleStructureClick(2)} className="cursor-pointer">
        <rect x="-130" y="-80" width="260" height="170" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="0" y="-55" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">ABDUCTION vs ADDUCTION</text>
        {/* Body & Arm Outward */}
        <line x1="0" y1="-30" x2="0" y2="40" stroke="#64748b" strokeWidth="6" />
        <line x1="0" y1="-20" x2="50" y2="-10" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
        {/* Abduction Arrow (Moving Away) */}
        <path d="M 20 20 A 40 40 0 0 0 50 0" fill="none" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arcArrow)" />
        <text x="0" y="45" fill="#cbd5e1" fontSize="10" textAnchor="middle">Abduction: Away from Midline</text>
        <text x="0" y="60" fill="#64748b" fontSize="9" textAnchor="middle">Adduction: Toward Midline</text>
      </g>

      {/* 3. SUPINATION & PRONATION (Bottom Left) */}
      <g transform="translate(150, 360)" onClick={() => handleStructureClick(2)} className="cursor-pointer">
        <rect x="-130" y="-80" width="260" height="170" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="0" y="-55" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">SUPINATION vs PRONATION</text>
        {/* Forearm & Palms */}
        <rect x="-40" y="-15" width="80" height="25" rx="6" fill="#334155" stroke="#10b981" strokeWidth="1.5" />
        {/* Rotating Circular Arrow */}
        <path d="M -20 20 A 25 25 0 1 1 20 20" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arcArrow)" />
        <text x="0" y="45" fill="#cbd5e1" fontSize="10" textAnchor="middle">Supination: Palm Up (Holding Soup)</text>
        <text x="0" y="60" fill="#64748b" fontSize="9" textAnchor="middle">Pronation: Palm Down</text>
      </g>

      {/* 4. CIRCUMDUCTION (Bottom Right) */}
      <g transform="translate(450, 360)" onClick={() => handleStructureClick(3)} className="cursor-pointer">
        <rect x="-130" y="-80" width="260" height="170" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="0" y="-55" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">CIRCUMDUCTION</text>
        {/* Shoulder Cone of Movement */}
        <circle cx="-30" cy="-10" r="6" fill="#fbbf24" />
        <polygon points="-30,-10 40,-35 40,15" fill="#fbbf24" fillOpacity="0.2" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
        {/* Circular Loop at Cone Base */}
        <ellipse cx="40" cy="-10" rx="10" ry="25" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
        <text x="0" y="45" fill="#cbd5e1" fontSize="10" textAnchor="middle">360° Conical Movement</text>
        <text x="0" y="60" fill="#64748b" fontSize="9" textAnchor="middle">Flexion + Abduct + Extend + Adduct</text>
      </g>

      {/* Spotters */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 150 : pin.pinNumber === 2 ? 450 : 150;
        const cy = pin.pinNumber === 1 ? 130 : pin.pinNumber === 2 ? 130 : 340;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 4. SKELETAL SYSTEM VISUAL (Complete Skeleton + Clickable Bones)
  const renderSkeletalVisual = () => (
    <svg viewBox="0 0 600 520" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="520" fill="#090d16" />

      {!isThumbnail && (
        <g>
          <text x="300" y="28" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            HUMAN SKELETAL SYSTEM (206 BONES)
          </text>
          <text x="300" y="45" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Axial (80 Bones) • Appendicular (126 Bones)
          </text>
        </g>
      )}

      {/* Complete Accurate Skeleton Bones */}
      <g transform="translate(300, 270)">
        
        {/* SKULL (Cranium & Facial) */}
        <g onClick={() => handleStructureClick(1)} className="cursor-pointer group">
          <ellipse cx="0" cy="-185" rx="22" ry="26" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M-12 -165 L12 -165 L8 -150 L-8 -150 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          {/* Eye sockets */}
          <circle cx="-7" cy="-185" r="4" fill="#0f172a" />
          <circle cx="7" cy="-185" r="4" fill="#0f172a" />
          <text x="-40" y="-185" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">Skull (Cranium)</text>
        </g>

        {/* CERVICAL VERTEBRAE */}
        <path d="M-4 -148 L4 -148 L4 -130 L-4 -130 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />

        {/* CLAVICLES & SCAPULAE (Pectoral Girdle) */}
        <g onClick={() => handleStructureClick(2)} className="cursor-pointer">
          <path d="M-45 -125 Q-20 -132 0 -130 Q20 -132 45 -125" fill="none" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
          <text x="65" y="-125" fill="#94a3b8" fontSize="9" fontWeight="bold">Clavicle</text>
        </g>

        {/* STERNUM & RIB CAGE (Thorax) */}
        <g onClick={() => handleStructureClick(2)} className="cursor-pointer">
          {/* Sternum */}
          <path d="M-4 -128 L4 -128 L3 -75 L0 -65 L-3 -75 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Ribs (Bilateral arches) */}
          {[-120, -110, -100, -90, -80, -70].map((y, idx) => (
            <g key={idx}>
              <path d={`M-4 ${y} C-35 ${y - 5} -45 ${y + 15} -8 ${y + 10}`} fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
              <path d={`M4 ${y} C35 ${y - 5} 45 ${y + 15} 8 ${y + 10}`} fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
            </g>
          ))}
          <text x="-65" y="-90" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">Rib Cage (12 Pairs)</text>
        </g>

        {/* VERTEBRAL COLUMN (Spine) */}
        <g className="cursor-pointer">
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x="-5" y={-60 + i * 11} width="10" height="7" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
          ))}
          <text x="35" y="-20" fill="#94a3b8" fontSize="9" fontWeight="bold">Vertebral Column</text>
        </g>

        {/* PELVIS (Ilium, Ischium, Pubis, Sacrum) */}
        <g onClick={() => handleStructureClick(1)} className="cursor-pointer">
          <path d="M-45 35 C-55 10 -15 15 0 25 C15 15 55 10 45 35 C35 65 15 65 0 55 C-15 65 -35 65 -45 35 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="-20" cy="42" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="20" cy="42" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
          <text x="-65" y="40" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">Pelvic Girdle</text>
        </g>

        {/* UPPER LIMBS (Humerus, Radius, Ulna) */}
        <g className="cursor-pointer">
          {/* Left Arm */}
          <line x1="-50" y1="-120" x2="-75" y2="-45" stroke="#f1f5f9" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="-75" cy="-45" r="5" fill="#38bdf8" />
          <line x1="-75" y1="-45" x2="-90" y2="25" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-78" y1="-45" x2="-95" y2="25" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          <text x="-95" y="-55" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="end">Humerus</text>

          {/* Right Arm */}
          <line x1="50" y1="-120" x2="75" y2="-45" stroke="#f1f5f9" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="75" cy="-45" r="5" fill="#38bdf8" />
          <line x1="75" y1="-45" x2="90" y2="25" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="78" y1="-45" x2="95" y2="25" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          <text x="95" y="-55" fill="#38bdf8" fontSize="9" fontWeight="bold">Radius & Ulna</text>
        </g>

        {/* LOWER LIMBS (Femur, Patella, Tibia, Fibula) */}
        <g className="cursor-pointer">
          {/* Left Leg */}
          <g onClick={() => handleStructureClick(1)}>
            <line x1="-25" y1="55" x2="-35" y2="135" stroke="#f8fafc" strokeWidth="7" strokeLinecap="round" />
            <circle cx="-35" cy="135" r="5" fill="#fbbf24" />
            <text x="-55" y="95" fill="#fbbf24" fontSize="10" fontWeight="black" textAnchor="end">Femur (Longest)</text>
          </g>
          {/* Left Tibia & Fibula */}
          <line x1="-35" y1="140" x2="-35" y2="205" stroke="#cbd5e1" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="-42" y1="145" x2="-42" y2="200" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <text x="-55" y="175" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">Tibia & Fibula</text>

          {/* Right Leg */}
          <line x1="25" y1="55" x2="35" y2="135" stroke="#f8fafc" strokeWidth="7" strokeLinecap="round" />
          <circle cx="35" cy="135" r="5" fill="#fbbf24" />
          {/* Right Tibia & Fibula */}
          <line x1="35" y1="140" x2="35" y2="205" stroke="#cbd5e1" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="42" y1="145" x2="42" y2="200" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      {/* Hotspots */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 260 : pin.pinNumber === 2 ? 300 : 255;
        const cy = pin.pinNumber === 1 ? 360 : pin.pinNumber === 2 ? 180 : 440;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 5. JOINTS & ARTICULATIONS VISUAL
  const renderJointsVisual = () => (
    <svg viewBox="0 0 600 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="500" fill="#090d16" />

      {!isThumbnail && (
        <g>
          <text x="300" y="32" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            SYNOVIAL JOINT ANATOMY & JOINT CLASSIFICATION
          </text>
          <text x="300" y="50" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Articular Cartilage • Synovial Cavity • Capsule • Ball & Socket / Hinge Joints
          </text>
        </g>
      )}

      {/* Main Cross-Section of a Synovial Joint (Left Side) */}
      <g transform="translate(180, 260)" onClick={() => handleStructureClick(1)} className="cursor-pointer">
        <rect x="-140" y="-190" width="280" height="380" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <text x="0" y="-165" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
          TYPICAL SYNOVIAL JOINT
        </text>

        {/* Proximal Bone (Top) */}
        <path d="M-40 -150 L40 -150 L35 -30 C30 -10 -30 -10 -35 -30 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
        <text x="0" y="-85" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">Epiphysis (Bone 1)</text>

        {/* Articular Cartilage (Hyaline - Blue Caps) */}
        <path d="M-33 -26 C-25 -5 25 -5 33 -26 Z" fill="#38bdf8" />
        <path d="M-33 26 C-25 5 25 5 33 26 Z" fill="#38bdf8" />
        <text x="45" y="0" fill="#38bdf8" fontSize="9" fontWeight="bold">Articular Cartilage</text>

        {/* Joint Cavity with Synovial Fluid (Yellow/Amber Glow) */}
        <ellipse cx="0" cy="0" rx="36" ry="8" fill="#fbbf24" fillOpacity="0.4" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
        <text x="-45" y="3" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="end">Synovial Cavity</text>

        {/* Fibrous Joint Capsule (Enclosing Cavity) */}
        <path d="M-36 -40 C-65 0 -65 0 -36 40" fill="none" stroke="#a855f7" strokeWidth="3.5" />
        <path d="M36 -40 C65 0 65 0 36 40" fill="none" stroke="#a855f7" strokeWidth="3.5" />
        <text x="65" y="40" fill="#c084fc" fontSize="9" fontWeight="bold">Fibrous Capsule</text>

        {/* Distal Bone (Bottom) */}
        <path d="M-35 30 C-30 10 30 10 35 30 L40 150 L-40 150 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
        <text x="0" y="95" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">Epiphysis (Bone 2)</text>
      </g>

      {/* Right Column: Major Joint Types */}
      
      {/* 1. Ball and Socket Joint (Glenohumeral / Hip) */}
      <g transform="translate(450, 160)" onClick={() => handleStructureClick(1)} className="cursor-pointer">
        <rect x="-120" y="-70" width="240" height="140" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="0" y="-45" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">BALL & SOCKET JOINT</text>
        {/* Glenoid Cup & Humeral Ball */}
        <path d="M-30 -20 C-10 -20 -10 20 -30 20" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        <circle cx="10" cy="0" r="18" fill="#e2e8f0" stroke="#38bdf8" strokeWidth="2" />
        <line x1="10" y1="0" x2="45" y2="0" stroke="#e2e8f0" strokeWidth="6" />
        <text x="0" y="45" fill="#cbd5e1" fontSize="9" textAnchor="middle">Triaxial: Shoulder & Hip (Max Mobility)</text>
      </g>

      {/* 2. Hinge Joint (Elbow / Knee) */}
      <g transform="translate(450, 350)" onClick={() => handleStructureClick(2)} className="cursor-pointer">
        <rect x="-120" y="-70" width="240" height="140" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
        <text x="0" y="-45" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">HINGE JOINT</text>
        {/* Cylinder & Trochlea */}
        <rect x="-25" y="-15" width="50" height="30" rx="8" fill="#e2e8f0" stroke="#10b981" strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill="#10b981" />
        <path d="M -15 25 A 25 25 0 0 0 25 15" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arcArrow)" />
        <text x="0" y="45" fill="#cbd5e1" fontSize="9" textAnchor="middle">Uniaxial: Elbow & Knee (Flex / Extend)</text>
      </g>

      {/* Spotters */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 180 : pin.pinNumber === 2 ? 450 : 180;
        const cy = pin.pinNumber === 1 ? 260 : pin.pinNumber === 2 ? 350 : 200;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 6. MAJOR MUSCLES VISUAL
  const renderMusclesVisual = () => (
    <svg viewBox="0 0 600 520" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#be123c" />
          <stop offset="50%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
      </defs>

      <rect width="600" height="520" fill="#090d16" />

      {!isThumbnail && (
        <g>
          <text x="300" y="28" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            MAJOR MUSCLES OF THE HUMAN BODY (ANTERIOR VIEW)
          </text>
          <text x="300" y="45" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Deltoid • Pectoralis Major • Biceps Brachii • Rectus Abdominis • Quadriceps
          </text>
        </g>
      )}

      <g transform="translate(300, 270)">
        
        {/* Head & Neck Sternocleidomastoid */}
        <circle cx="0" cy="-185" r="24" fill="#334155" />
        <path d="M-15 -160 L-5 -130 L5 -130 L15 -160 Z" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1" />

        {/* DELTOID MUSCLES (Shoulder Caps) */}
        <g onClick={() => handleStructureClick(1)} className="cursor-pointer">
          <path d="M-30 -130 C-60 -130 -65 -90 -45 -75 Z" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1.5" />
          <path d="M30 -130 C60 -130 65 -90 45 -75 Z" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="-75" y="-105" fill="#fb7185" fontSize="10" fontWeight="bold" textAnchor="end">Deltoid</text>
          <text x="75" y="-105" fill="#fb7185" fontSize="10" fontWeight="bold">Deltoid (Abduction)</text>
        </g>

        {/* PECTORALIS MAJOR (Chest) */}
        <g onClick={() => handleStructureClick(1)} className="cursor-pointer">
          <path d="M-4 -128 L-35 -125 C-45 -100 -30 -85 -4 -85 Z" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1.5" />
          <path d="M4 -128 L35 -125 C45 -100 30 -85 4 -85 Z" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="0" y="-102" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Pectoralis Major</text>
        </g>

        {/* BICEPS BRACHII (Anterior Arm) */}
        <g onClick={() => handleStructureClick(2)} className="cursor-pointer">
          <ellipse cx="-55" cy="-45" rx="9" ry="25" transform="rotate(15 -55 -45)" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1.5" />
          <ellipse cx="55" cy="-45" rx="9" ry="25" transform="rotate(-15 55 -45)" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="-75" y="-45" fill="#fb7185" fontSize="10" fontWeight="bold" textAnchor="end">Biceps Brachii</text>
          <text x="75" y="-45" fill="#fb7185" fontSize="10" fontWeight="bold">Flexes & Supinates</text>
        </g>

        {/* RECTUS ABDOMINIS (6-Pack) */}
        <g className="cursor-pointer">
          <rect x="-18" y="-75" width="16" height="85" rx="4" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1" />
          <rect x="2" y="-75" width="16" height="85" rx="4" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1" />
          {/* Tendinous intersections */}
          <line x1="-18" y1="-50" x2="18" y2="-50" stroke="#090d16" strokeWidth="2" />
          <line x1="-18" y1="-25" x2="18" y2="-25" stroke="#090d16" strokeWidth="2" />
          <line x1="-18" y1="0" x2="18" y2="0" stroke="#090d16" strokeWidth="2" />
          <text x="35" y="-30" fill="#cbd5e1" fontSize="9" fontWeight="bold">Rectus Abdominis</text>
        </g>

        {/* QUADRICEPS FEMORIS (Anterior Thigh) */}
        <g onClick={() => handleStructureClick(3)} className="cursor-pointer">
          {/* Left Quad */}
          <path d="M-38 35 C-48 70 -42 120 -32 135 C-22 120 -18 70 -25 35 Z" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1.5" />
          {/* Right Quad */}
          <path d="M38 35 C48 70 42 120 32 135 C22 120 18 70 25 35 Z" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="-55" y="85" fill="#fb7185" fontSize="10" fontWeight="bold" textAnchor="end">Quadriceps Femoris</text>
          <text x="55" y="85" fill="#fb7185" fontSize="10" fontWeight="bold">Extends Knee (Femoral N.)</text>
        </g>

        {/* TIBIALIS ANTERIOR & GASTROCNEMIUS */}
        <g className="cursor-pointer">
          <ellipse cx="-32" cy="175" rx="6" ry="30" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1" />
          <ellipse cx="32" cy="175" rx="6" ry="30" fill="url(#muscleGrad)" stroke="#f43f5e" strokeWidth="1" />
          <text x="-48" y="175" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="end">Tibialis Anterior</text>
          <text x="48" y="175" fill="#94a3b8" fontSize="9" fontWeight="bold">Gastrocnemius</text>
        </g>
      </g>

      {/* Spotters */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 250 : pin.pinNumber === 2 ? 355 : 265;
        const cy = pin.pinNumber === 1 ? 170 : pin.pinNumber === 2 ? 225 : 355;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 7. NERVOUS SYSTEM VISUAL
  const renderNervousVisual = () => (
    <svg viewBox="0 0 600 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="brainGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#9d174d" />
        </radialGradient>
      </defs>

      <rect width="600" height="500" fill="#090d16" />

      {!isThumbnail && (
        <g>
          <text x="300" y="32" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            HUMAN NERVOUS SYSTEM (CNS & PNS)
          </text>
          <text x="300" y="50" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Brain (Cerebrum, Cerebellum, Brainstem) • Spinal Cord • Peripheral Nerves
          </text>
        </g>
      )}

      {/* Left Box: Brain Anatomical Detail */}
      <g transform="translate(160, 250)" onClick={() => handleStructureClick(1)} className="cursor-pointer">
        <rect x="-130" y="-170" width="260" height="340" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <text x="0" y="-145" fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">
          BRAIN (MIDSAGITTAL)
        </text>

        {/* CEREBRAL HEMISPHERE (Frontal/Parietal/Occipital) */}
        <path d="M-60 -40 C-80 -120 40 -140 70 -60 C75 -20 60 10 30 10 C-10 10 -40 -10 -60 -40 Z" fill="url(#brainGrad)" stroke="#f472b6" strokeWidth="2" />
        <text x="5" y="-60" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Cerebrum</text>

        {/* CEREBELLUM (Little Brain) */}
        <g onClick={() => handleStructureClick(2)}>
          <ellipse cx="45" cy="40" rx="28" ry="20" fill="#fbbf24" fillOpacity="0.85" stroke="#f59e0b" strokeWidth="2" />
          <text x="45" y="44" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">Cerebellum</text>
        </g>

        {/* BRAINSTEM (Pons & Medulla) */}
        <g onClick={() => handleStructureClick(3)}>
          <path d="M-10 10 L15 10 L10 90 L-15 90 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <text x="-2" y="55" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">Brainstem</text>
        </g>
      </g>

      {/* Right Box: Full Body Central & Peripheral Nerves */}
      <g transform="translate(440, 260)">
        <rect x="-120" y="-180" width="240" height="360" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <text x="0" y="-155" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
          CENTRAL & PERIPHERAL NERVES
        </text>

        {/* Silhouette Outline */}
        <ellipse cx="0" cy="-120" rx="16" ry="18" fill="#334155" />
        <rect x="-2" y="-100" width="4" height="150" fill="#fbbf24" />
        <text x="12" y="-40" fill="#fbbf24" fontSize="9" fontWeight="bold">Spinal Cord</text>

        {/* Brachial Plexus to Arms */}
        <path d="M0 -80 L-45 -40 L-65 10" fill="none" stroke="#38bdf8" strokeWidth="2" />
        <path d="M0 -80 L45 -40 L65 10" fill="none" stroke="#38bdf8" strokeWidth="2" />
        <text x="-40" y="-45" fill="#38bdf8" fontSize="8" fontWeight="bold">Brachial Plexus</text>

        {/* Sciatic Nerves to Legs */}
        <path d="M0 50 L-30 90 L-35 140" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
        <path d="M0 50 L30 90 L35 140" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
        <text x="35" y="100" fill="#f43f5e" fontSize="8" fontWeight="bold">Sciatic Nerve</text>
      </g>

      {/* Spotters */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 160 : pin.pinNumber === 2 ? 205 : 160;
        const cy = pin.pinNumber === 1 ? 190 : pin.pinNumber === 2 ? 290 : 310;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 8. CARDIOVASCULAR SYSTEM (4-Chamber Heart & Great Vessels)
  const renderCardiovascularVisual = () => (
    <svg viewBox="0 0 600 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="deoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="oxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
      </defs>

      <rect width="600" height="500" fill="#090d16" />

      {!isThumbnail && (
        <g>
          <text x="300" y="32" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            ANATOMY OF THE HUMAN HEART & GREAT VESSELS
          </text>
          <text x="300" y="50" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Right Atrium & Ventricle (Blue) • Left Atrium & Ventricle (Red) • Aorta & Pulmonary Trunk
          </text>
        </g>
      )}

      {/* Main Detailed Heart Anatomy */}
      <g transform="translate(300, 270)">
        
        {/* SUPERIOR VENA CAVA (SVC - Blue Great Vein) */}
        <path d="M-85 -180 L-50 -180 L-50 -90 L-85 -90 Z" fill="url(#deoxGrad)" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="-95" y="-140" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="end">Superior Vena Cava</text>

        {/* ASCENDING AORTA & AORTIC ARCH (Red Arterial Trunk) */}
        <g onClick={() => handleStructureClick(3)} className="cursor-pointer">
          <path d="M-25 -90 C-25 -170 65 -170 65 -90 L35 -90 C35 -140 5 -140 5 -90 Z" fill="url(#oxGrad)" stroke="#fda4af" strokeWidth="2" />
          {/* 3 Arch Branches */}
          <line x1="-5" y1="-155" x2="-10" y2="-180" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
          <line x1="15" y1="-160" x2="15" y2="-185" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
          <line x1="35" y1="-155" x2="40" y2="-180" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
          <text x="75" y="-150" fill="#f43f5e" fontSize="11" fontWeight="bold">Aortic Arch</text>
        </g>

        {/* PULMONARY TRUNK & ARTERIES (Blue) */}
        <path d="M-15 -90 L15 -90 L-10 -130 L-35 -120 Z" fill="url(#deoxGrad)" stroke="#38bdf8" strokeWidth="1" />

        {/* RIGHT ATRIUM (Receiving Deoxygenated Blood) */}
        <g onClick={() => handleStructureClick(2)} className="cursor-pointer">
          <path d="M-110 -80 C-125 -10 -95 40 -55 35 L-45 -80 Z" fill="url(#deoxGrad)" stroke="#38bdf8" strokeWidth="2" />
          <text x="-85" y="-20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Right Atrium</text>
          <text x="-85" y="-5" fill="#bae6fd" fontSize="8" textAnchor="middle">(Tricuspid Inflow)</text>
        </g>

        {/* RIGHT VENTRICLE */}
        <g className="cursor-pointer">
          <path d="M-55 35 C-55 120 -20 150 0 160 L0 10 L-45 -80 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <text x="-28" y="90" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Right Ventricle</text>
        </g>

        {/* LEFT ATRIUM (Posterior base) */}
        <path d="M45 -80 L100 -80 C115 -20 95 30 55 35 Z" fill="url(#oxGrad)" stroke="#fda4af" strokeWidth="1.5" />
        <text x="80" y="-30" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Left Atrium</text>

        {/* LEFT VENTRICLE (Thick Muscular Myocardium) */}
        <g onClick={() => handleStructureClick(1)} className="cursor-pointer">
          <path d="M0 10 L0 160 C40 150 90 110 55 35 Z" fill="url(#oxGrad)" stroke="#fda4af" strokeWidth="3" />
          <text x="35" y="90" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Left Ventricle</text>
          <text x="35" y="105" fill="#fecdd3" fontSize="8" textAnchor="middle">(Thickest Wall / Apex)</text>
        </g>

        {/* INTERVENTRICULAR SEPTUM */}
        <line x1="0" y1="10" x2="0" y2="160" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 2" />
      </g>

      {/* Spotters */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 335 : pin.pinNumber === 2 ? 215 : 300;
        const cy = pin.pinNumber === 1 ? 360 : pin.pinNumber === 2 ? 250 : 150;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 9. RESPIRATORY SYSTEM VISUAL
  const renderRespiratoryVisual = () => (
    <svg viewBox="0 0 600 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#be123c" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width="600" height="500" fill="#090d16" />

      {!isThumbnail && (
        <g>
          <text x="300" y="32" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            HUMAN RESPIRATORY SYSTEM & TRACHEOBRONCHIAL TREE
          </text>
          <text x="300" y="50" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Larynx • Trachea • Right Lung (3 Lobes) • Left Lung (2 Lobes + Cardiac Notch) • Diaphragm
          </text>
        </g>
      )}

      <g transform="translate(300, 240)">
        
        {/* LARYNX & THYROID CARTILAGE */}
        <path d="M-15 -170 L15 -170 L12 -140 L-12 -140 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
        <text x="25" y="-155" fill="#38bdf8" fontSize="10" fontWeight="bold">Larynx (Voice Box)</text>

        {/* TRACHEA with C-Shaped Rings */}
        <g onClick={() => handleStructureClick(3)} className="cursor-pointer">
          <path d="M-12 -140 L12 -140 L12 -30 L-12 -30 Z" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
          {[-130, -115, -100, -85, -70, -55, -40].map((y, idx) => (
            <line key={idx} x1="-12" y1={y} x2="12" y2={y} stroke="#38bdf8" strokeWidth="2.5" />
          ))}
          <text x="-25" y="-85" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="end">Trachea (C-Rings)</text>
        </g>

        {/* CARINA & BRONCHIAL BIFURCATION */}
        <path d="M-12 -30 L-50 20 L-35 25 L0 -15 L35 25 L50 20 L12 -30 Z" fill="#38bdf8" />
        <text x="0" y="5" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">Carina</text>

        {/* RIGHT LUNG (3 Lobes: Superior, Middle, Inferior) */}
        <g onClick={() => handleStructureClick(1)} className="cursor-pointer">
          <path d="M-50 0 C-60 -80 -160 -40 -160 80 C-160 140 -80 150 -50 140 Z" fill="url(#lungGrad)" stroke="#f43f5e" strokeWidth="2" />
          {/* Horizontal & Oblique Fissures */}
          <line x1="-155" y1="20" x2="-65" y2="40" stroke="#090d16" strokeWidth="2" />
          <line x1="-140" y1="90" x2="-55" y2="90" stroke="#090d16" strokeWidth="2" />
          <text x="-105" y="-10" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Right Lung</text>
          <text x="-105" y="8" fill="#fecdd3" fontSize="9" textAnchor="middle">(3 Lobes)</text>
        </g>

        {/* LEFT LUNG (2 Lobes: Superior & Inferior with CARDIAC NOTCH) */}
        <g onClick={() => handleStructureClick(2)} className="cursor-pointer">
          <path d="M50 0 C60 -80 160 -40 160 80 C160 140 80 150 50 140 C75 90 75 40 50 20 Z" fill="url(#lungGrad)" stroke="#f43f5e" strokeWidth="2" />
          {/* Oblique Fissure */}
          <line x1="60" y1="30" x2="150" y2="100" stroke="#090d16" strokeWidth="2" />
          <text x="105" y="-10" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Left Lung</text>
          <text x="105" y="8" fill="#fecdd3" fontSize="9" textAnchor="middle">(2 Lobes)</text>
          <text x="35" y="70" fill="#fbbf24" fontSize="8" fontWeight="bold">Cardiac Notch</text>
        </g>

        {/* DIAPHRAGM MUSCLE (Dome-Shaped Floor) */}
        <path d="M-180 155 Q0 100 180 155" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
        <text x="0" y="175" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
          Diaphragm (Phrenic Nerve C3-C5)
        </text>
      </g>

      {/* Spotters */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 190 : pin.pinNumber === 2 ? 410 : 300;
        const cy = pin.pinNumber === 1 ? 280 : pin.pinNumber === 2 ? 300 : 160;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 10. DIGESTIVE SYSTEM VISUAL
  const renderDigestiveVisual = () => (
    <svg viewBox="0 0 600 520" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="liverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9a3412" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
        <linearGradient id="stomachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>

      <rect width="600" height="520" fill="#090d16" />

      {!isThumbnail && (
        <g>
          <text x="300" y="28" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            HUMAN DIGESTIVE TRACT & ACCESSORY ORGANS
          </text>
          <text x="300" y="45" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Esophagus • Stomach • Liver & Gallbladder • Pancreas • Small & Large Intestines • Appendix
          </text>
        </g>
      )}

      <g transform="translate(300, 260)">
        
        {/* ESOPHAGUS */}
        <path d="M-8 -190 L8 -190 L8 -90 L-8 -90 Z" fill="#fdba74" stroke="#ea580c" strokeWidth="1.5" />
        <text x="18" y="-140" fill="#fdba74" fontSize="10" fontWeight="bold">Esophagus</text>

        {/* LIVER (Right Hypochondrium) */}
        <g onClick={() => handleStructureClick(2)} className="cursor-pointer">
          <path d="M-130 -85 C-40 -105 -10 -90 -10 -50 C-10 0 -90 0 -130 -85 Z" fill="url(#liverGrad)" stroke="#ea580c" strokeWidth="2" />
          {/* Gallbladder */}
          <ellipse cx="-45" cy="-25" rx="10" ry="16" fill="#16a34a" stroke="#22c55e" strokeWidth="1.5" />
          <text x="-75" y="-55" fill="#ffffff" fontSize="11" fontWeight="bold">Liver</text>
          <text x="-45" y="-5" fill="#86efac" fontSize="8" fontWeight="bold" textAnchor="middle">Gallbladder</text>
        </g>

        {/* STOMACH (J-Shaped Organ in LUQ) */}
        <g onClick={() => handleStructureClick(1)} className="cursor-pointer">
          <path d="M-8 -90 C30 -90 85 -70 85 -20 C85 45 10 50 -15 20 C-25 0 -8 -40 -8 -90 Z" fill="url(#stomachGrad)" stroke="#f97316" strokeWidth="2" />
          <text x="45" y="-15" fill="#ffffff" fontSize="11" fontWeight="bold">Stomach</text>
          <text x="45" y="0" fill="#fed7aa" fontSize="8">(J-Shape / Acid)</text>
        </g>

        {/* PANCREAS & DUODENUM */}
        <path d="M-15 20 C20 15 60 25 70 35" fill="none" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
        <text x="75" y="38" fill="#fbbf24" fontSize="9" fontWeight="bold">Pancreas</text>

        {/* LARGE INTESTINE (Colon Framing Small Intestine) */}
        <g className="cursor-pointer">
          {/* Cecum & Appendix (RLQ) */}
          <g onClick={() => handleStructureClick(3)}>
            <path d="M-95 140 C-95 170 -65 170 -65 140 Z" fill="#9a3412" stroke="#ea580c" strokeWidth="1.5" />
            {/* Worm-like Appendix */}
            <path d="M-85 165 C-95 185 -105 175 -110 190" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <text x="-120" y="195" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="end">Appendix (RLQ)</text>
          </g>

          {/* Colon Frame */}
          <path d="M-80 140 L-80 50 L80 50 L80 150 L60 180" fill="none" stroke="#c2410c" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          <text x="0" y="65" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Transverse Colon</text>
        </g>

        {/* SMALL INTESTINE (Central Coils) */}
        <g className="cursor-pointer">
          <ellipse cx="0" cy="115" rx="55" ry="35" fill="#ea580c" fillOpacity="0.4" stroke="#fb923c" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="0" y="118" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Small Intestine</text>
          <text x="0" y="132" fill="#fed7aa" fontSize="8" textAnchor="middle">(Jejunum & Ileum)</text>
        </g>
      </g>

      {/* Spotters */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 345 : pin.pinNumber === 2 ? 220 : 210;
        const cy = pin.pinNumber === 1 ? 245 : pin.pinNumber === 2 ? 205 : 435;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 11. URINARY SYSTEM VISUAL (Kidneys, Ureters, Bladder)
  const renderUrinaryVisual = () => (
    <svg viewBox="0 0 600 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="kidneyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
      </defs>

      <rect width="600" height="500" fill="#090d16" />

      {!isThumbnail && (
        <g>
          <text x="300" y="32" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            HUMAN URINARY TRACT & RENAL MORPHOLOGY
          </text>
          <text x="300" y="50" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Kidneys (Cortex & Medullary Pyramids) • Renal Hilum • Ureters • Urinary Bladder
          </text>
        </g>
      )}

      {/* Left Box: Internal Renal Anatomy (Kidney Coronal Cut) */}
      <g transform="translate(160, 260)" onClick={() => handleStructureClick(1)} className="cursor-pointer">
        <rect x="-130" y="-180" width="260" height="360" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <text x="0" y="-155" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">
          INTERNAL KIDNEY CORONAL CUT
        </text>

        {/* Bean-Shaped Kidney Outer Rim */}
        <path d="M-60 -120 C10 -140 70 -80 70 0 C70 80 10 140 -60 120 C-40 60 -40 -60 -60 -120 Z" fill="url(#kidneyGrad)" stroke="#ef4444" strokeWidth="2" />

        {/* Outer Renal Cortex */}
        <text x="-40" y="-85" fill="#fca5a5" fontSize="9" fontWeight="bold">Renal Cortex</text>

        {/* Renal Medullary Pyramids (Triangles) */}
        <g onClick={() => handleStructureClick(2)}>
          {[
            { cx: 10, cy: -60, rot: -20 },
            { cx: 30, cy: -20, rot: 0 },
            { cx: 30, cy: 20, rot: 10 },
            { cx: 10, cy: 60, rot: 30 }
          ].map((pyr, idx) => (
            <polygon key={idx} points="-10,-12 15,0 -10,12" fill="#f59e0b" transform={`translate(${pyr.cx}, ${pyr.cy}) rotate(${pyr.rot})`} />
          ))}
          <text x="35" y="-5" fill="#fbbf24" fontSize="9" fontWeight="bold">Renal Pyramids</text>
        </g>

        {/* Renal Pelvis & Ureter exit */}
        <path d="M-20 -20 L-70 0 L-20 20 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
        <text x="-75" y="5" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="end">Renal Pelvis</text>
      </g>

      {/* Right Box: Full Urinary Tract in situ */}
      <g transform="translate(440, 260)">
        <rect x="-120" y="-180" width="240" height="360" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <text x="0" y="-155" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
          URINARY TRACT IN SITU
        </text>

        {/* Aorta (Red) & IVC (Blue) between Kidneys */}
        <line x1="-8" y1="-130" x2="-8" y2="40" stroke="#ef4444" strokeWidth="6" />
        <line x1="8" y1="-130" x2="8" y2="40" stroke="#0284c7" strokeWidth="7" />

        {/* Right Kidney (Lower due to liver) */}
        <ellipse cx="-55" cy="-70" rx="22" ry="34" fill="url(#kidneyGrad)" stroke="#ef4444" strokeWidth="1.5" />
        {/* Left Kidney */}
        <ellipse cx="55" cy="-85" rx="22" ry="34" fill="url(#kidneyGrad)" stroke="#ef4444" strokeWidth="1.5" />
        <text x="0" y="-95" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Bilateral Kidneys</text>

        {/* Ureters (Bilateral yellow conduits) */}
        <g onClick={() => handleStructureClick(3)} className="cursor-pointer">
          <path d="M-50 -55 C-40 0 -30 40 -15 80" fill="none" stroke="#fbbf24" strokeWidth="3" />
          <path d="M50 -70 C40 0 30 40 15 80" fill="none" stroke="#fbbf24" strokeWidth="3" />
          <text x="45" y="20" fill="#fbbf24" fontSize="9" fontWeight="bold">Ureters (25 cm)</text>
        </g>

        {/* Urinary Bladder */}
        <g className="cursor-pointer">
          <ellipse cx="0" cy="100" rx="35" ry="25" fill="#fbbf24" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="2" />
          <text x="0" y="104" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">Urinary Bladder</text>
        </g>
      </g>

      {/* Spotters */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 130 : pin.pinNumber === 2 ? 180 : 475;
        const cy = pin.pinNumber === 1 ? 180 : pin.pinNumber === 2 ? 260 : 280;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // 12. REPRODUCTIVE SYSTEM VISUAL
  const renderReproductiveVisual = () => (
    <svg viewBox="0 0 600 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="500" fill="#090d16" />

      {!isThumbnail && (
        <g>
          <text x="300" y="32" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            HUMAN REPRODUCTIVE SYSTEM (MALE & FEMALE ANATOMY)
          </text>
          <text x="300" y="50" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Male: Testis, Epididymis, Vas Deferens, Prostate • Female: Ovaries, Fallopian Tubes, Uterus
          </text>
        </g>
      )}

      {/* Left Box: Female Reproductive System (Coronal Section) */}
      <g transform="translate(160, 260)" onClick={() => handleStructureClick(1)} className="cursor-pointer">
        <rect x="-130" y="-180" width="260" height="360" rx="16" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
        <text x="0" y="-155" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">
          FEMALE REPRODUCTIVE TRACT
        </text>

        {/* Uterus (Fundus, Body, Endometrium) */}
        <path d="M-35 -70 C-35 -110 35 -110 35 -70 L20 20 L-20 20 Z" fill="#be185d" stroke="#f472b6" strokeWidth="2" />
        <text x="0" y="-70" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Uterus (Fundus)</text>

        {/* Fallopian Tubes (Oviducts) */}
        <path d="M-35 -80 C-75 -90 -85 -50 -90 -50" fill="none" stroke="#f472b6" strokeWidth="4" />
        <path d="M35 -80 C75 -90 85 -50 90 -50" fill="none" stroke="#f472b6" strokeWidth="4" />
        <text x="0" y="-115" fill="#fbcfe8" fontSize="9" fontWeight="bold" textAnchor="middle">Uterine (Fallopian) Tubes</text>

        {/* Ovaries (Bilateral Almond-shaped Gonads) */}
        <ellipse cx="-90" cy="-40" rx="14" ry="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
        <ellipse cx="90" cy="-40" rx="14" ry="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="-90" y="-20" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">Ovary</text>
        <text x="90" y="-20" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">Ovary</text>

        {/* Cervix & Vagina */}
        <rect x="-15" y="20" width="30" height="25" fill="#9d174d" stroke="#f472b6" strokeWidth="1" />
        <text x="0" y="37" fill="#ffffff" fontSize="9" textAnchor="middle">Cervix</text>
        <rect x="-12" y="45" width="24" height="45" fill="#831843" stroke="#f472b6" strokeWidth="1" />
        <text x="0" y="70" fill="#ffffff" fontSize="9" textAnchor="middle">Vagina</text>
      </g>

      {/* Right Box: Male Reproductive System (Sagittal Overview) */}
      <g transform="translate(440, 260)" onClick={() => handleStructureClick(2)} className="cursor-pointer">
        <rect x="-120" y="-180" width="240" height="360" rx="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="0" y="-155" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
          MALE REPRODUCTIVE TRACT
        </text>

        {/* Urinary Bladder & Prostate */}
        <ellipse cx="-20" cy="-60" rx="25" ry="20" fill="#fbbf24" fillOpacity="0.5" stroke="#fbbf24" strokeWidth="1" />
        <circle cx="-20" cy="-30" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="15" y="-28" fill="#38bdf8" fontSize="9" fontWeight="bold">Prostate Gland</text>

        {/* Testis & Epididymis in Scrotum */}
        <ellipse cx="-30" cy="70" rx="18" ry="24" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
        <path d="M-48 55 C-48 95 -30 95 -30 90" fill="none" stroke="#fbbf24" strokeWidth="3" />
        <text x="-30" y="75" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Testis</text>
        <text x="-60" y="105" fill="#fbbf24" fontSize="8" fontWeight="bold">Epididymis</text>

        {/* Vas (Ductus) Deferens Loop */}
        <path d="M-30 50 C-30 -20 20 -40 -10 -30" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 2" />
        <text x="25" y="15" fill="#93c5fd" fontSize="9" fontWeight="bold">Vas Deferens</text>
      </g>

      {/* Spotters */}
      {spotters.map(pin => {
        const cx = pin.pinNumber === 1 ? 160 : pin.pinNumber === 2 ? 410 : 160;
        const cy = pin.pinNumber === 1 ? 210 : pin.pinNumber === 2 ? 330 : 300;
        return (
          <g key={pin.pinNumber} onClick={() => handleStructureClick(pin.pinNumber)}>
            <circle cx={cx} cy={cy} r={selectedPinNumber === pin.pinNumber ? 16 : 13} className={getPinClass(pin.pinNumber)} />
            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle" pointerEvents="none" fontFamily="monospace">
              {pin.pinNumber}
            </text>
          </g>
        );
      })}
    </svg>
  );

  // Router to proper visual
  const renderVisual = () => {
    switch (topicId) {
      case 'anat_planes':
        return renderPlanesVisual();
      case 'anat_directional_terms':
        return renderDirectionalTermsVisual();
      case 'anat_movements':
        return renderMovementsVisual();
      case 'anat_skeletal':
        return renderSkeletalVisual();
      case 'anat_joints':
        return renderJointsVisual();
      case 'anat_muscles':
        return renderMusclesVisual();
      case 'anat_nervous':
        return renderNervousVisual();
      case 'anat_cardio':
        return renderCardiovascularVisual();
      case 'anat_respiratory':
        return renderRespiratoryVisual();
      case 'anat_digestive':
        return renderDigestiveVisual();
      case 'anat_urinary':
        return renderUrinaryVisual();
      case 'anat_reproductive':
        return renderReproductiveVisual();
      default:
        return renderPlanesVisual();
    }
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      {renderVisual()}
    </div>
  );
};
