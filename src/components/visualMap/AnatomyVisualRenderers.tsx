import React from 'react';

interface VisualProps {
  theme?: 'light' | 'dark';
  onSelectStructure?: (title: string, desc: string, pearl?: string) => void;
  interactive?: boolean;
}

// =========================================================================
// 1. ANATOMICAL POSITION & ORIENTATION
// =========================================================================
export const AnatomicalPositionRenderer: React.FC<VisualProps> = ({
  theme = 'light',
  onSelectStructure,
  interactive = true
}) => {
  const isDark = theme === 'dark';
  const strokeColor = isDark ? '#38bdf8' : '#0284c7';
  const bodyFill = isDark ? '#1e293b' : '#f1f5f9';
  const outlineColor = isDark ? '#94a3b8' : '#334155';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';
  const accentColor = '#e11d48';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 700 520" className="w-full max-w-2xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bodyGradPos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? '#334155' : '#e2e8f0'} />
            <stop offset="100%" stopColor={isDark ? '#1e293b' : '#cbd5e1'} />
          </linearGradient>
          <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={accentColor} />
          </marker>
          <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={strokeColor} />
          </marker>
        </defs>

        {/* Backdrop Card */}
        <rect x="10" y="10" width="680" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        {/* Section Header */}
        <text x="350" y="42" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold" letterSpacing="0.5">
          STANDARD ANATOMICAL POSITION & BODY ORIENTATION
        </text>
        <text x="350" y="60" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Universal Clinical Reference: Standing Erect • Facing Forward • Palms Forward (Supinated) • Feet Flat
        </text>

        {/* ----------------- ANTERIOR FIGURE (LEFT) ----------------- */}
        <g transform="translate(140, 75)">
          {/* Head & Neck */}
          <ellipse cx="70" cy="40" rx="22" ry="28" fill="url(#bodyGradPos)" stroke={outlineColor} strokeWidth="2" />
          {/* Facial feature lines */}
          <line x1="70" y1="30" x2="70" y2="46" stroke={outlineColor} strokeWidth="1.5" />
          <circle cx="63" cy="36" r="2" fill={outlineColor} />
          <circle cx="77" cy="36" r="2" fill={outlineColor} />
          <path d="M64,52 Q70,56 76,52" fill="none" stroke={outlineColor} strokeWidth="1.5" />

          {/* Neck */}
          <rect x="62" y="68" width="16" height="14" fill="url(#bodyGradPos)" stroke={outlineColor} strokeWidth="1.5" />

          {/* Clavicles & Shoulders */}
          <path d="M70,82 L35,92 L20,115" stroke={outlineColor} strokeWidth="2" fill="none" />
          <path d="M70,82 L105,92 L120,115" stroke={outlineColor} strokeWidth="2" fill="none" />

          {/* Torso & Pelvis */}
          <path
            d="M32,92 L108,92 L96,200 L88,235 L52,235 L44,200 Z"
            fill="url(#bodyGradPos)"
            stroke={outlineColor}
            strokeWidth="2"
          />
          {/* Pectoral & Abdominal line landmarks */}
          <line x1="70" y1="92" x2="70" y2="235" stroke={outlineColor} strokeWidth="1" strokeDasharray="3,3" />
          <path d="M42,125 Q70,135 98,125" fill="none" stroke={outlineColor} strokeWidth="1" opacity="0.6" />
          <circle cx="70" cy="180" r="2" fill={outlineColor} />

          {/* Right Arm (Anatomical Right = Viewer's Left) */}
          <path d="M30,96 L15,175 L8,245" stroke={outlineColor} strokeWidth="14" strokeLinecap="round" />
          {/* Hand: Supinated Palm facing front, thumb pointing laterally */}
          <g
            className="cursor-pointer hover:opacity-80"
            onClick={() => onSelectStructure?.('Palms Supinated', 'In standard anatomical position, the forearm is fully supinated so that the palmar surface faces anteriorly and the thumb (digit I) directs laterally away from the trunk.', 'Crucial baseline for defining anterior/posterior surfaces of upper limb.')}
          >
            <ellipse cx="6" cy="265" rx="8" ry="12" fill={isDark ? '#38bdf8' : '#0284c7'} opacity="0.8" />
            <path d="M-2,258 L-8,265" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrowRed)" />
            <text x="-12" y="278" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="end">Thumb Lateral</text>
          </g>

          {/* Left Arm (Viewer's Right) */}
          <path d="M110,96 L125,175 L132,245" stroke={outlineColor} strokeWidth="14" strokeLinecap="round" />
          <ellipse cx="134" cy="265" rx="8" ry="12" fill={isDark ? '#38bdf8' : '#0284c7'} opacity="0.8" />
          <path d="M142,258 L148,265" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrowRed)" />

          {/* Lower Limbs */}
          {/* Right Leg */}
          <path d="M52,235 L48,325 L45,400" stroke={outlineColor} strokeWidth="18" strokeLinecap="round" />
          {/* Right Foot forward */}
          <path d="M45,400 L45,418 L32,424" stroke={outlineColor} strokeWidth="8" strokeLinecap="round" />

          {/* Left Leg */}
          <path d="M88,235 L92,325 L95,400" stroke={outlineColor} strokeWidth="18" strokeLinecap="round" />
          {/* Left Foot forward */}
          <path d="M95,400 L95,418 L108,424" stroke={outlineColor} strokeWidth="8" strokeLinecap="round" />

          {/* Label under anterior */}
          <text x="70" y="445" textAnchor="middle" fill={labelFill} fontSize="12" fontWeight="bold">
            Anterior View (Coronal Face)
          </text>
        </g>

        {/* ----------------- LATERAL FIGURE & AXES (RIGHT) ----------------- */}
        <g transform="translate(430, 75)">
          {/* Lateral Head */}
          <path
            d="M50,15 Q75,15 78,40 Q78,55 70,68 L70,82 L55,82 L50,68 Q30,55 30,35 Q30,15 50,15 Z"
            fill="url(#bodyGradPos)"
            stroke={outlineColor}
            strokeWidth="2"
          />
          {/* Nose & Chin profile */}
          <path d="M78,40 L85,46 L76,50 L80,58 L72,62" fill="none" stroke={outlineColor} strokeWidth="2" />

          {/* Lateral Torso with natural spinal curves */}
          <path
            d="M55,82 Q42,125 58,165 Q62,195 48,235 L28,235 Q36,190 32,150 Q30,105 45,82 Z"
            fill="url(#bodyGradPos)"
            stroke={outlineColor}
            strokeWidth="2"
          />

          {/* Lateral Arm */}
          <path d="M50,96 L45,175 L42,255" stroke={outlineColor} strokeWidth="12" strokeLinecap="round" />
          <ellipse cx="42" cy="265" rx="6" ry="10" fill="url(#bodyGradPos)" stroke={outlineColor} strokeWidth="1.5" />

          {/* Lateral Leg */}
          <path d="M48,235 L52,325 L50,400" stroke={outlineColor} strokeWidth="18" strokeLinecap="round" />
          <path d="M50,400 L50,418 L75,422" stroke={outlineColor} strokeWidth="10" strokeLinecap="round" />

          {/* Vertical (Longitudinal) Axis line */}
          <line x1="120" y1="20" x2="120" y2="420" stroke={strokeColor} strokeWidth="2" strokeDasharray="5,4" markerEnd="url(#arrowBlue)" />
          <text x="130" y="210" fill={strokeColor} fontSize="11" fontWeight="bold" transform="rotate(90, 130, 210)">
            Vertical (Craniocaudal) Axis
          </text>

          {/* Sagittal (Anteroposterior) Axis */}
          <line x1="10" y1="160" x2="105" y2="160" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrowRed)" />
          <text x="55" y="152" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">
            Anteroposterior Axis
          </text>

          <text x="50" y="445" textAnchor="middle" fill={labelFill} fontSize="12" fontWeight="bold">
            Lateral View (Sagittal Profile)
          </text>
        </g>

        {/* Callout Pins / Checkpoints */}
        <g transform="translate(30, 120)">
          <rect x="0" y="0" width="130" height="42" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={strokeColor} strokeWidth="1" />
          <text x="8" y="18" fill={strokeColor} fontSize="10" fontWeight="bold">1. ERECT HEAD</text>
          <text x="8" y="32" fill={labelFill} fontSize="9">Eyes gaze to horizon</text>
        </g>

        <g transform="translate(30, 210)">
          <rect x="0" y="0" width="130" height="42" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={strokeColor} strokeWidth="1" />
          <text x="8" y="18" fill={strokeColor} fontSize="10" fontWeight="bold">2. ARMS AT SIDES</text>
          <text x="8" y="32" fill={labelFill} fontSize="9">Palms facing anteriorly</text>
        </g>

        <g transform="translate(30, 390)">
          <rect x="0" y="0" width="130" height="42" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={strokeColor} strokeWidth="1" />
          <text x="8" y="18" fill={strokeColor} fontSize="10" fontWeight="bold">3. FEET FORWARD</text>
          <text x="8" y="32" fill={labelFill} fontSize="9">Toes parallel & flat</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 2. ANATOMICAL PLANES
// =========================================================================
export const AnatomicalPlanesRenderer: React.FC<VisualProps> = ({
  theme = 'light',
  onSelectStructure
}) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Glassy 3D Planes */}
          <linearGradient id="planeSagittal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="planeCoronal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="planeTransverse" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <rect x="10" y="10" width="740" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="380" y="40" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          ANATOMICAL PLANES OF SECTION
        </text>
        <text x="380" y="58" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Midsagittal (Median) • Parasagittal • Frontal (Coronal) • Transverse (Horizontal / Axial)
        </text>

        {/* Central 3D Human Figure Skeleton wireframe */}
        <g transform="translate(380, 240)">
          {/* Head */}
          <circle cx="0" cy="-140" r="24" fill={isDark ? '#334155' : '#cbd5e1'} stroke="#64748b" strokeWidth="2" />
          {/* Spine / Longitudinal Core */}
          <line x1="0" y1="-116" x2="0" y2="20" stroke="#64748b" strokeWidth="4" />
          {/* Shoulders */}
          <line x1="-50" y1="-95" x2="50" y2="-95" stroke="#64748b" strokeWidth="4" />
          {/* Pelvis */}
          <line x1="-35" y1="20" x2="35" y2="20" stroke="#64748b" strokeWidth="4" />
          {/* Arms */}
          <line x1="-50" y1="-95" x2="-65" y2="0" stroke="#64748b" strokeWidth="3" />
          <line x1="-65" y1="0" x2="-75" y2="70" stroke="#64748b" strokeWidth="3" />
          <line x1="50" y1="-95" x2="65" y2="0" stroke="#64748b" strokeWidth="3" />
          <line x1="65" y1="0" x2="75" y2="70" stroke="#64748b" strokeWidth="3" />
          {/* Legs */}
          <line x1="-25" y1="20" x2="-30" y2="105" stroke="#64748b" strokeWidth="4" />
          <line x1="-30" y1="105" x2="-35" y2="200" stroke="#64748b" strokeWidth="4" />
          <line x1="25" y1="20" x2="30" y2="105" stroke="#64748b" strokeWidth="4" />
          <line x1="30" y1="105" x2="35" y2="200" stroke="#64748b" strokeWidth="4" />
        </g>

        {/* 1. CORONAL (FRONTAL) PLANE (Purple Glass Sheet) */}
        <g
          className="cursor-pointer transition-transform hover:opacity-95"
          onClick={() => onSelectStructure?.('Frontal (Coronal) Plane', 'Vertical plane dividing body into anterior and posterior portions.', 'Used for chest X-rays, coronal MRI, and facial sinus CT.')}
        >
          <polygon
            points="230,90 530,90 530,420 230,420"
            fill="url(#planeCoronal)"
            stroke="#8b5cf6"
            strokeWidth="2"
            opacity="0.45"
          />
          <line x1="230" y1="90" x2="530" y2="90" stroke="#a78bfa" strokeWidth="3" />
          <line x1="530" y1="90" x2="530" y2="420" stroke="#a78bfa" strokeWidth="3" />
          <line x1="230" y1="420" x2="530" y2="420" stroke="#a78bfa" strokeWidth="3" />
          <line x1="230" y1="90" x2="230" y2="420" stroke="#a78bfa" strokeWidth="3" />
        </g>

        {/* 2. MIDSAGITTAL (MEDIAN) PLANE (Cyan Glass Sheet cutting front-to-back) */}
        <g
          className="cursor-pointer transition-transform hover:opacity-95"
          onClick={() => onSelectStructure?.('Midsagittal (Median) Plane', 'Vertical plane dividing the body into exactly equal right and left halves.', 'Essential for visualizing the corpus callosum and spinal cord on sagittal MRI.')}
        >
          <polygon
            points="380,70 380,440 460,400 460,30"
            fill="url(#planeSagittal)"
            stroke="#06b6d4"
            strokeWidth="2"
            opacity="0.55"
          />
        </g>

        {/* 2B. PARASAGITTAL PLANE (Parallel dashed plane) */}
        <polygon
          points="320,80 320,430 400,390 400,40"
          fill="none"
          stroke="#0284c7"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          opacity="0.7"
        />

        {/* 3. TRANSVERSE (HORIZONTAL) PLANE (Green Horizontal Glass) */}
        <g
          className="cursor-pointer transition-transform hover:opacity-95"
          onClick={() => onSelectStructure?.('Transverse (Axial) Plane', 'Horizontal plane dividing body into superior (upper) and inferior (lower) portions.', 'The core cross-sectional orientation for CT scans of abdomen, pelvis, and brain.')}
        >
          <polygon
            points="180,240 500,190 580,270 260,320"
            fill="url(#planeTransverse)"
            stroke="#10b981"
            strokeWidth="2.5"
            opacity="0.65"
          />
        </g>

        {/* Labels & Keys */}
        {/* Sagittal Plane Label */}
        <g transform="translate(560, 110)">
          <rect x="0" y="0" width="165" height="56" rx="8" fill={isDark ? '#1e293b' : '#f0fdf4'} stroke="#06b6d4" strokeWidth="1.5" />
          <circle cx="15" cy="18" r="6" fill="#06b6d4" />
          <text x="28" y="21" fill="#06b6d4" fontSize="11" fontWeight="bold">MIDSAGITTAL (MEDIAN)</text>
          <text x="10" y="38" fill={labelFill} fontSize="9">Divides into equal Right & Left</text>
          <text x="10" y="49" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8">• Parasagittal = unequal R/L</text>
        </g>

        {/* Coronal Plane Label */}
        <g transform="translate(40, 110)">
          <rect x="0" y="0" width="160" height="50" rx="8" fill={isDark ? '#1e293b' : '#faf5ff'} stroke="#8b5cf6" strokeWidth="1.5" />
          <circle cx="15" cy="18" r="6" fill="#8b5cf6" />
          <text x="28" y="21" fill="#8b5cf6" fontSize="11" fontWeight="bold">FRONTAL (CORONAL)</text>
          <text x="10" y="38" fill={labelFill} fontSize="9">Divides into Anterior & Posterior</text>
        </g>

        {/* Transverse Plane Label */}
        <g transform="translate(40, 310)">
          <rect x="0" y="0" width="165" height="50" rx="8" fill={isDark ? '#1e293b' : '#ecfdf5'} stroke="#10b981" strokeWidth="1.5" />
          <circle cx="15" cy="18" r="6" fill="#10b981" />
          <text x="28" y="21" fill="#10b981" fontSize="11" fontWeight="bold">TRANSVERSE (AXIAL)</text>
          <text x="10" y="38" fill={labelFill} fontSize="9">Divides into Superior & Inferior</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 3. ANATOMICAL DIRECTIONAL TERMS
// =========================================================================
export const DirectionalTermsRenderer: React.FC<VisualProps> = ({
  theme = 'light',
  onSelectStructure
}) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';
  const bodyColor = isDark ? '#334155' : '#cbd5e1';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrowDir" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
            <path d="M0,1 L0,7 L6,4 z" fill="#0284c7" />
          </marker>
          <marker id="arrowDirRed" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
            <path d="M0,1 L0,7 L6,4 z" fill="#e11d48" />
          </marker>
        </defs>

        <rect x="10" y="10" width="740" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="380" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          ANATOMICAL DIRECTIONAL TERMS & OPPOSITES
        </text>
        <text x="380" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Superior/Inferior • Anterior/Posterior • Medial/Lateral • Proximal/Distal • Superficial/Deep
        </text>

        {/* Central Human Silhouettes */}
        {/* Anterior Silhouette (Left) */}
        <g transform="translate(240, 90)">
          <ellipse cx="60" cy="30" rx="18" ry="24" fill={bodyColor} stroke="#64748b" strokeWidth="1.5" />
          <path d="M25,65 L95,65 L86,160 L78,190 L42,190 L34,160 Z" fill={bodyColor} stroke="#64748b" strokeWidth="1.5" />
          <line x1="60" y1="65" x2="60" y2="190" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
          <path d="M25,70 L10,140 L5,200" stroke={bodyColor} strokeWidth="11" strokeLinecap="round" />
          <path d="M95,70 L110,140 L115,200" stroke={bodyColor} strokeWidth="11" strokeLinecap="round" />
          <path d="M42,190 L38,270 L35,340" stroke={bodyColor} strokeWidth="15" strokeLinecap="round" />
          <path d="M78,190 L82,270 L85,340" stroke={bodyColor} strokeWidth="15" strokeLinecap="round" />
          <text x="60" y="370" textAnchor="middle" fill={labelFill} fontSize="11" fontWeight="bold">Anterior View</text>
        </g>

        {/* Lateral Silhouette (Right) */}
        <g transform="translate(440, 90)">
          <circle cx="45" cy="30" r="20" fill={bodyColor} stroke="#64748b" strokeWidth="1.5" />
          <path d="M52,55 Q38,100 48,150 Q42,180 35,200" stroke={bodyColor} strokeWidth="24" strokeLinecap="round" fill="none" />
          <path d="M48,80 L35,150 L30,210" stroke={bodyColor} strokeWidth="10" strokeLinecap="round" />
          <path d="M40,200 L44,280 L42,340" stroke={bodyColor} strokeWidth="16" strokeLinecap="round" />
          <text x="45" y="370" textAnchor="middle" fill={labelFill} fontSize="11" fontWeight="bold">Lateral View</text>
        </g>

        {/* DIRECTIONAL VECTORS */}
        {/* 1. Superior vs Inferior */}
        <g transform="translate(200, 110)">
          <line x1="0" y1="80" x2="0" y2="0" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrowDir)" />
          <text x="-8" y="15" fill="#0284c7" fontSize="11" fontWeight="bold" textAnchor="end">SUPERIOR (Cranial)</text>

          <line x1="0" y1="200" x2="0" y2="280" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrowDir)" />
          <text x="-8" y="270" fill="#0284c7" fontSize="11" fontWeight="bold" textAnchor="end">INFERIOR (Caudal)</text>
        </g>

        {/* 2. Medial vs Lateral (Chest) */}
        <g transform="translate(250, 160)">
          <line x1="0" y1="0" x2="40" y2="0" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowDirRed)" />
          <text x="20" y="-8" fill="#e11d48" fontSize="10" fontWeight="bold" textAnchor="middle">MEDIAL</text>

          <line x1="50" y1="20" x2="100" y2="20" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowDirRed)" />
          <text x="75" y="38" fill="#e11d48" fontSize="10" fontWeight="bold" textAnchor="middle">LATERAL</text>
        </g>

        {/* 3. Proximal vs Distal (Upper Limb) */}
        <g transform="translate(365, 170)">
          <line x1="0" y1="30" x2="-10" y2="0" stroke="#10b981" strokeWidth="2.5" />
          <text x="5" y="5" fill="#10b981" fontSize="10" fontWeight="bold">PROXIMAL (near trunk)</text>

          <line x1="0" y1="70" x2="10" y2="100" stroke="#10b981" strokeWidth="2.5" />
          <text x="15" y="110" fill="#10b981" fontSize="10" fontWeight="bold">DISTAL (far from trunk)</text>
        </g>

        {/* 4. Anterior (Ventral) vs Posterior (Dorsal) on Lateral */}
        <g transform="translate(485, 200)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowDir)" />
          <text x="65" y="4" fill="#f59e0b" fontSize="10" fontWeight="bold">ANTERIOR (Ventral)</text>

          <line x1="-30" y1="0" x2="-80" y2="0" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowDir)" />
          <text x="-85" y="4" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="end">POSTERIOR (Dorsal)</text>
        </g>

        {/* 5. Superficial vs Deep Diagram on bottom */}
        <g transform="translate(180, 425)">
          <rect x="0" y="0" width="400" height="60" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" />
          {/* Skin layers */}
          <rect x="20" y="12" width="120" height="8" fill="#fda4af" />
          <text x="80" y="19" fill="#9f1239" fontSize="8" fontWeight="bold" textAnchor="middle">Epidermis (Superficial)</text>
          <rect x="20" y="22" width="120" height="14" fill="#fed7aa" />
          <text x="80" y="32" fill="#9a3412" fontSize="8" fontWeight="bold" textAnchor="middle">Dermis</text>
          <rect x="20" y="38" width="120" height="14" fill="#fef08a" />
          <text x="80" y="48" fill="#854d0e" fontSize="8" fontWeight="bold" textAnchor="middle">Subcutis (Deep)</text>

          <text x="160" y="25" fill={labelFill} fontSize="10" fontWeight="bold">Superficial / External:</text>
          <text x="160" y="38" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="9">Nearer to body/organ outer surface (e.g. skin, fascia)</text>
          <text x="160" y="50" fill={labelFill} fontSize="10" fontWeight="bold">Deep / Internal:</text>
          <text x="245" y="50" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="9">Away from surface toward core</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 4. BODY MOVEMENTS
// =========================================================================
export const BodyMovementsRenderer: React.FC<VisualProps> = ({
  theme = 'light',
  onSelectStructure
}) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';
  const cardBg = isDark ? '#1e293b' : '#f8fafc';
  const cardStroke = isDark ? '#334155' : '#e2e8f0';

  const movements = [
    { title: 'Flexion & Extension', plane: 'Sagittal', desc: 'Decreasing / increasing joint angle (Elbow, Knee, Neck).' },
    { title: 'Abduction & Adduction', plane: 'Coronal', desc: 'Moving limb away from / toward the median body plane.' },
    { title: 'Medial & Lateral Rotation', plane: 'Transverse', desc: 'Rotating anterior limb surface toward / away from midline.' },
    { title: 'Circumduction', plane: 'Multiplanar', desc: 'Conical circular sweep combining flexion, abduction, extension, adduction.' },
    { title: 'Pronation & Supination', plane: 'Forearm', desc: 'Turning palm posteriorly (pronation) or anteriorly (supination).' },
    { title: 'Dorsiflexion & Plantarflexion', plane: 'Ankle', desc: 'Lifting foot toward shin (dorsi) vs depressing toes to floor (plantar).' },
    { title: 'Inversion & Eversion', plane: 'Subtalar Foot', desc: 'Turning sole of foot medially inward vs laterally outward.' },
    { title: 'Hyperextension', plane: 'Sagittal', desc: 'Extending a limb or joint beyond its normal anatomical posture.' }
  ];

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="740" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="380" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          MAJOR BODY MOVEMENTS ON THE HUMAN FIGURE
        </text>
        <text x="380" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Visualized with Joint Kinematic Planes & Directional Motion Vectors
        </text>

        {/* 8 Grid Cells for Movements */}
        {movements.map((m, idx) => {
          const col = idx % 4;
          const row = Math.floor(idx / 4);
          const x = 30 + col * 175;
          const y = 75 + row * 205;

          return (
            <g
              key={idx}
              transform={`translate(${x}, ${y})`}
              className="cursor-pointer transition-all hover:opacity-90"
              onClick={() => onSelectStructure?.(m.title, m.desc, `Plane of action: ${m.plane}`)}
            >
              <rect x="0" y="0" width="165" height="195" rx="10" fill={cardBg} stroke={cardStroke} strokeWidth="1.5" />

              {/* Movement Mini-Canvas */}
              {idx === 0 && (
                /* Flexion & Extension */
                <g transform="translate(25, 20)">
                  {/* Upper body / arm */}
                  <circle cx="20" cy="15" r="10" fill="#94a3b8" />
                  <line x1="20" y1="25" x2="20" y2="70" stroke="#64748b" strokeWidth="4" />
                  {/* Fixed humerus */}
                  <line x1="20" y1="35" x2="45" y2="65" stroke="#334155" strokeWidth="4" />
                  {/* Extension position */}
                  <line x1="45" y1="65" x2="75" y2="90" stroke="#94a3b8" strokeWidth="3" strokeDasharray="3,3" />
                  {/* Flexion position */}
                  <line x1="45" y1="65" x2="45" y2="25" stroke="#0284c7" strokeWidth="4" />
                  {/* Motion arrow */}
                  <path d="M70,80 Q65,45 48,32" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowDirRed)" />
                  <text x="80" y="45" fill="#0284c7" fontSize="9" fontWeight="bold">Flexion</text>
                  <text x="80" y="85" fill="#64748b" fontSize="8">Extension</text>
                </g>
              )}

              {idx === 1 && (
                /* Abduction & Adduction */
                <g transform="translate(30, 20)">
                  <circle cx="50" cy="15" r="10" fill="#94a3b8" />
                  <line x1="50" y1="25" x2="50" y2="80" stroke="#64748b" strokeWidth="4" />
                  {/* Normal arm (adduction) */}
                  <line x1="50" y1="35" x2="65" y2="80" stroke="#94a3b8" strokeWidth="3" />
                  {/* Abducted arm */}
                  <line x1="50" y1="35" x2="95" y2="35" stroke="#8b5cf6" strokeWidth="4" />
                  {/* Motion arc */}
                  <path d="M68,75 Q85,70 95,45" fill="none" stroke="#e11d48" strokeWidth="2" />
                  <text x="60" y="25" fill="#8b5cf6" fontSize="9" fontWeight="bold">Abduction ↑</text>
                  <text x="70" y="92" fill="#64748b" fontSize="8">Adduction ↓</text>
                </g>
              )}

              {idx === 2 && (
                /* Medial & Lateral Rotation */
                <g transform="translate(25, 20)">
                  <circle cx="45" cy="15" r="10" fill="#94a3b8" />
                  <line x1="45" y1="25" x2="45" y2="70" stroke="#64748b" strokeWidth="4" />
                  {/* Arm bent at 90 deg */}
                  <line x1="45" y1="35" x2="65" y2="60" stroke="#64748b" strokeWidth="4" />
                  {/* Forearm rotating */}
                  <line x1="65" y1="60" x2="25" y2="75" stroke="#10b981" strokeWidth="3" />
                  <line x1="65" y1="60" x2="95" y2="75" stroke="#0284c7" strokeWidth="3" />
                  <path d="M30,85 Q65,100 90,85" fill="none" stroke="#e11d48" strokeWidth="2" />
                  <text x="15" y="100" fill="#10b981" fontSize="8" fontWeight="bold">Medial (in)</text>
                  <text x="75" y="100" fill="#0284c7" fontSize="8" fontWeight="bold">Lateral (out)</text>
                </g>
              )}

              {idx === 3 && (
                /* Circumduction */
                <g transform="translate(25, 20)">
                  <circle cx="30" cy="15" r="10" fill="#94a3b8" />
                  <line x1="30" y1="25" x2="30" y2="70" stroke="#64748b" strokeWidth="4" />
                  <line x1="30" y1="35" x2="80" y2="50" stroke="#64748b" strokeWidth="3" />
                  {/* Conical cone sweep */}
                  <ellipse cx="85" cy="50" rx="14" ry="24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3,2" />
                  <path d="M85,26 A14,24 0 1,1 84,26" fill="none" stroke="#e11d48" strokeWidth="2" />
                  <text x="45" y="95" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">360° Conical Cone</text>
                </g>
              )}

              {idx === 4 && (
                /* Pronation & Supination */
                <g transform="translate(25, 20)">
                  <rect x="15" y="20" width="30" height="50" rx="4" fill="#cbd5e1" />
                  <text x="30" y="50" fill="#0f172a" fontSize="7" fontWeight="bold" textAnchor="middle">PALM</text>
                  <path d="M50,45 Q70,45 80,30" fill="none" stroke="#0284c7" strokeWidth="2" />
                  <text x="70" y="25" fill="#0284c7" fontSize="8" fontWeight="bold">Supination</text>
                  <text x="70" y="35" fill="#64748b" fontSize="7">(Palm Forward)</text>
                  <text x="70" y="65" fill="#e11d48" fontSize="8" fontWeight="bold">Pronation</text>
                  <text x="70" y="75" fill="#64748b" fontSize="7">(Palm Back)</text>
                </g>
              )}

              {idx === 5 && (
                /* Dorsiflexion & Plantarflexion */
                <g transform="translate(25, 20)">
                  {/* Leg */}
                  <line x1="30" y1="10" x2="30" y2="60" stroke="#64748b" strokeWidth="6" />
                  {/* Neutral foot */}
                  <line x1="30" y1="60" x2="70" y2="60" stroke="#94a3b8" strokeWidth="5" strokeDasharray="2,2" />
                  {/* Dorsiflexion */}
                  <line x1="30" y1="60" x2="65" y2="40" stroke="#10b981" strokeWidth="4" />
                  {/* Plantarflexion */}
                  <line x1="30" y1="60" x2="65" y2="80" stroke="#0284c7" strokeWidth="4" />
                  <text x="75" y="42" fill="#10b981" fontSize="8" fontWeight="bold">Dorsi ↑</text>
                  <text x="75" y="82" fill="#0284c7" fontSize="8" fontWeight="bold">Plantar ↓</text>
                </g>
              )}

              {idx === 6 && (
                /* Inversion & Eversion */
                <g transform="translate(25, 20)">
                  {/* Ankle joint frontal */}
                  <line x1="45" y1="10" x2="45" y2="50" stroke="#64748b" strokeWidth="6" />
                  {/* Inversion: Sole faces medially */}
                  <path d="M45,50 L20,70" stroke="#8b5cf6" strokeWidth="5" strokeLinecap="round" />
                  {/* Eversion: Sole faces laterally */}
                  <path d="M45,50 L70,70" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />
                  <text x="15" y="85" fill="#8b5cf6" fontSize="8" fontWeight="bold">Inversion (In)</text>
                  <text x="55" y="85" fill="#06b6d4" fontSize="8" fontWeight="bold">Eversion (Out)</text>
                </g>
              )}

              {idx === 7 && (
                /* Hyperextension */
                <g transform="translate(25, 20)">
                  <circle cx="50" cy="20" r="10" fill="#94a3b8" />
                  {/* Neck tilting backwards past vertical */}
                  <path d="M50,30 Q40,50 48,75" fill="none" stroke="#64748b" strokeWidth="4" />
                  <line x1="48" y1="75" x2="48" y2="95" stroke="#64748b" strokeWidth="4" />
                  {/* Head tilted back */}
                  <line x1="50" y1="20" x2="70" y2="10" stroke="#e11d48" strokeWidth="3" />
                  <text x="50" y="80" fill="#e11d48" fontSize="8" fontWeight="bold">Hyperextension</text>
                  <text x="50" y="90" fill="#64748b" fontSize="7">&gt; Anatomical limit</text>
                </g>
              )}

              {/* Text Card Labels */}
              <text x="10" y="145" fill={labelFill} fontSize="10" fontWeight="bold">
                {m.title}
              </text>
              <text x="10" y="160" fill={isDark ? '#38bdf8' : '#0284c7'} fontSize="8" fontWeight="bold">
                Plane: {m.plane}
              </text>
              <text x="10" y="174" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="7.5">
                {m.desc.length > 38 ? m.desc.substring(0, 38) + '...' : m.desc}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// =========================================================================
// 5. SKELETAL SYSTEM (COMPLETE HUMAN SKELETON LABELED)
// =========================================================================
export const SkeletalSystemRenderer: React.FC<VisualProps> = ({
  theme = 'light',
  onSelectStructure
}) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';
  const boneColor = isDark ? '#e2e8f0' : '#475569';
  const linePointer = isDark ? '#38bdf8' : '#0284c7';

  // Accurate labels requested by user:
  // Skull, Mandible, Vertebral column (Cervical, Thoracic, Lumbar, Sacrum, Coccyx),
  // Ribs, Sternum, Clavicle, Scapula, Humerus, Radius, Ulna, Carpals, Metacarpals, Phalanges,
  // Pelvis, Femur, Patella, Tibia, Fibula, Tarsals, Metatarsals, Phalanges
  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 820 620" className="w-full max-w-4xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="800" height="600" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="410" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          THE HUMAN SKELETAL SYSTEM — OSTEOLOGY MAP
        </text>
        <text x="410" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          206 Adult Bones: Axial Skeleton (Cranial, Vertebral, Thoracic) & Appendicular Skeleton (Pectoral, Pelvic, Limbs)
        </text>

        {/* Central Skeleton Figure */}
        <g transform="translate(410, 80)">
          {/* Cranium / Skull */}
          <ellipse cx="0" cy="25" rx="20" ry="24" fill={boneColor} opacity="0.9" />
          <path d="M-10,32 L-10,42 L10,42 L10,32 Z" fill={boneColor} />
          {/* Mandible */}
          <path d="M-12,42 Q0,54 12,42" stroke={boneColor} strokeWidth="4" fill="none" />

          {/* Cervical Vertebrae (C1-C7) */}
          <line x1="0" y1="52" x2="0" y2="75" stroke={boneColor} strokeWidth="6" strokeDasharray="3,2" />

          {/* Clavicles */}
          <path d="M0,78 Q-25,72 -48,82" stroke={boneColor} strokeWidth="4" fill="none" />
          <path d="M0,78 Q25,72 48,82" stroke={boneColor} strokeWidth="4" fill="none" />

          {/* Sternum (Manubrium, Body, Xiphoid) */}
          <rect x="-6" y="80" width="12" height="42" rx="3" fill="#cbd5e1" stroke={boneColor} strokeWidth="2" />

          {/* Thoracic Ribcage (12 Pairs) */}
          {[-12, 0, 12, 24].map((dy, i) => (
            <g key={i}>
              <path d={`M-6,${92 + dy} Q-36,${90 + dy} -38,${105 + dy} Q-25,${120 + dy} -6,${115 + dy}`} fill="none" stroke={boneColor} strokeWidth="2" />
              <path d={`M6,${92 + dy} Q36,${90 + dy} 38,${105 + dy} Q25,${120 + dy} 6,${115 + dy}`} fill="none" stroke={boneColor} strokeWidth="2" />
            </g>
          ))}

          {/* Scapula behind ribcage */}
          <polygon points="-46,86 -62,110 -38,125" fill={boneColor} opacity="0.7" />
          <polygon points="46,86 62,110 38,125" fill={boneColor} opacity="0.7" />

          {/* Thoracic & Lumbar Vertebrae (T1-T12, L1-L5) */}
          <line x1="0" y1="75" x2="0" y2="190" stroke={boneColor} strokeWidth="7" strokeDasharray="4,2" />

          {/* Pelvis (Coxal bones + Sacrum + Coccyx) */}
          {/* Iliac crests */}
          <path d="M-36,180 Q-50,175 -44,210 Q-30,225 -10,215" fill={boneColor} stroke="#64748b" strokeWidth="1.5" />
          <path d="M36,180 Q50,175 44,210 Q30,225 10,215" fill={boneColor} stroke="#64748b" strokeWidth="1.5" />
          {/* Sacrum & Coccyx */}
          <polygon points="-10,185 10,185 0,220" fill="#94a3b8" />
          <circle cx="0" cy="226" r="3" fill="#64748b" />
          {/* Pubic symphysis */}
          <line x1="-10" y1="215" x2="10" y2="215" stroke="#cbd5e1" strokeWidth="3" />

          {/* UPPER LIMBS */}
          {/* Right Upper Limb (Viewer's Left) */}
          {/* Humerus */}
          <line x1="-50" y1="88" x2="-65" y2="170" stroke={boneColor} strokeWidth="6" strokeLinecap="round" />
          {/* Elbow / Joint */}
          <circle cx="-65" cy="170" r="4" fill="#38bdf8" />
          {/* Radius (lateral) & Ulna (medial) */}
          <line x1="-66" y1="174" x2="-80" y2="240" stroke={boneColor} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-62" y1="174" x2="-72" y2="240" stroke={boneColor} strokeWidth="3.5" strokeLinecap="round" />
          {/* Wrist / Carpals */}
          <rect x="-82" y="242" width="14" height="6" rx="2" fill="#38bdf8" />
          {/* Metacarpals & Phalanges */}
          <line x1="-80" y1="248" x2="-86" y2="270" stroke={boneColor} strokeWidth="3" />
          <line x1="-75" y1="248" x2="-78" y2="275" stroke={boneColor} strokeWidth="3" />
          <line x1="-70" y1="248" x2="-71" y2="272" stroke={boneColor} strokeWidth="3" />

          {/* Left Upper Limb (Viewer's Right) */}
          {/* Humerus */}
          <line x1="50" y1="88" x2="65" y2="170" stroke={boneColor} strokeWidth="6" strokeLinecap="round" />
          <circle cx="65" cy="170" r="4" fill="#38bdf8" />
          {/* Radius & Ulna */}
          <line x1="62" y1="174" x2="72" y2="240" stroke={boneColor} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="66" y1="174" x2="80" y2="240" stroke={boneColor} strokeWidth="3.5" strokeLinecap="round" />
          {/* Carpals */}
          <rect x="68" y="242" width="14" height="6" rx="2" fill="#38bdf8" />
          {/* Metacarpals & Phalanges */}
          <line x1="72" y1="248" x2="75" y2="275" stroke={boneColor} strokeWidth="3" />
          <line x1="77" y1="248" x2="82" y2="272" stroke={boneColor} strokeWidth="3" />

          {/* LOWER LIMBS */}
          {/* Right Femur */}
          <line x1="-25" y1="215" x2="-35" y2="330" stroke={boneColor} strokeWidth="8" strokeLinecap="round" />
          {/* Patella */}
          <circle cx="-35" cy="335" r="5" fill="#f43f5e" />
          {/* Tibia (thick medial) & Fibula (slender lateral) */}
          <line x1="-33" y1="342" x2="-35" y2="445" stroke={boneColor} strokeWidth="6" strokeLinecap="round" />
          <line x1="-42" y1="342" x2="-44" y2="440" stroke={boneColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Ankle / Tarsals */}
          <rect x="-42" y="446" width="14" height="6" rx="2" fill="#38bdf8" />
          {/* Metatarsals & Phalanges */}
          <line x1="-40" y1="452" x2="-45" y2="475" stroke={boneColor} strokeWidth="4" />
          <line x1="-33" y1="452" x2="-35" y2="475" stroke={boneColor} strokeWidth="3" />

          {/* Left Femur */}
          <line x1="25" y1="215" x2="35" y2="330" stroke={boneColor} strokeWidth="8" strokeLinecap="round" />
          {/* Patella */}
          <circle cx="35" cy="335" r="5" fill="#f43f5e" />
          {/* Tibia & Fibula */}
          <line x1="33" y1="342" x2="35" y2="445" stroke={boneColor} strokeWidth="6" strokeLinecap="round" />
          <line x1="42" y1="342" x2="44" y2="440" stroke={boneColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Tarsals */}
          <rect x="28" y="446" width="14" height="6" rx="2" fill="#38bdf8" />
          {/* Metatarsals & Phalanges */}
          <line x1="33" y1="452" x2="35" y2="475" stroke={boneColor} strokeWidth="3" />
          <line x1="40" y1="452" x2="45" y2="475" stroke={boneColor} strokeWidth="4" />
        </g>

        {/* ================= LABELS & POINTERS ================= */}
        {/* LEFT COLUMN LABELS (AXIAL & UPPER) */}
        <g transform="translate(40, 85)">
          {/* Skull */}
          <line x1="160" y1="25" x2="385" y2="25" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="28" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Skull (Cranium)</text>

          {/* Mandible */}
          <line x1="160" y1="45" x2="395" y2="45" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="48" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Mandible</text>

          {/* Cervical Vertebrae */}
          <line x1="160" y1="65" x2="405" y2="65" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="68" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Cervical Vertebrae (C1-C7)</text>

          {/* Clavicle */}
          <line x1="160" y1="85" x2="375" y2="82" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="88" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Clavicle</text>

          {/* Scapula */}
          <line x1="160" y1="110" x2="355" y2="105" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="113" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Scapula (Shoulder Blade)</text>

          {/* Sternum */}
          <line x1="160" y1="130" x2="405" y2="100" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="133" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Sternum (Breastbone)</text>

          {/* Ribs */}
          <line x1="160" y1="150" x2="380" y2="120" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="153" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Ribs (12 Pairs)</text>

          {/* Humerus */}
          <line x1="160" y1="180" x2="350" y2="135" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="183" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Humerus</text>

          {/* Radius & Ulna */}
          <line x1="160" y1="215" x2="335" y2="200" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="213" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Radius (Lateral)</text>
          <text x="150" y="225" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Ulna (Medial)</text>

          {/* Carpals */}
          <line x1="160" y1="245" x2="330" y2="242" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="248" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Carpals (8 Wrist bones)</text>

          {/* Metacarpals & Phalanges */}
          <line x1="160" y1="270" x2="330" y2="265" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="150" y="268" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Metacarpals (I-V)</text>
          <text x="150" y="280" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Phalanges (14 Digits)</text>
        </g>

        {/* RIGHT COLUMN LABELS (SPINE, PELVIS & LOWER LIMB) */}
        <g transform="translate(630, 85)">
          {/* Thoracic Vertebrae */}
          <line x1="-10" y1="65" x2="-220" y2="105" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="68" fill={labelFill} fontSize="11" fontWeight="bold">Thoracic Vertebrae (T1-T12)</text>

          {/* Lumbar Vertebrae */}
          <line x1="-10" y1="110" x2="-220" y2="155" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="113" fill={labelFill} fontSize="11" fontWeight="bold">Lumbar Vertebrae (L1-L5)</text>

          {/* Sacrum & Coccyx */}
          <line x1="-10" y1="140" x2="-220" y2="195" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="138" fill={labelFill} fontSize="11" fontWeight="bold">Sacrum (S1-S5 fused)</text>
          <text x="0" y="150" fill={labelFill} fontSize="11" fontWeight="bold">Coccyx (Tailbone)</text>

          {/* Pelvis */}
          <line x1="-10" y1="180" x2="-180" y2="200" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="183" fill={labelFill} fontSize="11" fontWeight="bold">Pelvis (Ilium, Ischium, Pubis)</text>

          {/* Femur */}
          <line x1="-10" y1="240" x2="-185" y2="280" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="243" fill={labelFill} fontSize="11" fontWeight="bold">Femur (Thigh bone)</text>

          {/* Patella */}
          <line x1="-10" y1="290" x2="-185" y2="335" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="0" y="293" fill="#f43f5e" fontSize="11" fontWeight="bold">Patella (Kneecap)</text>

          {/* Tibia & Fibula */}
          <line x1="-10" y1="340" x2="-185" y2="390" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="338" fill={labelFill} fontSize="11" fontWeight="bold">Tibia (Medial Shin)</text>
          <text x="0" y="350" fill={labelFill} fontSize="11" fontWeight="bold">Fibula (Lateral Strut)</text>

          {/* Tarsals */}
          <line x1="-10" y1="385" x2="-185" y2="446" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="388" fill={labelFill} fontSize="11" fontWeight="bold">Tarsals (7 Ankle bones)</text>

          {/* Metatarsals & Phalanges */}
          <line x1="-10" y1="415" x2="-180" y2="465" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="413" fill={labelFill} fontSize="11" fontWeight="bold">Metatarsals (I-V)</text>
          <text x="0" y="425" fill={labelFill} fontSize="11" fontWeight="bold">Phalanges (14 Toes)</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 6. JOINTS & ARTICULATIONS
// =========================================================================
export const JointsRenderer: React.FC<VisualProps> = ({
  theme = 'light',
  onSelectStructure
}) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';
  const cardBg = isDark ? '#1e293b' : '#f8fafc';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="740" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="380" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          JOINTS & ARTICULATIONS CLASSIFICATION & MAJOR SYNOVIAL JOINTS
        </text>
        <text x="380" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Fibrous (Synarthroses) • Cartilaginous (Amphiarthroses) • Synovial (Diarthroses)
        </text>

        {/* TOP ROW: 3 STRUCTURAL CLASSES */}
        {/* 1. Fibrous Joint (Suture) */}
        <g transform="translate(30, 75)" className="cursor-pointer">
          <rect x="0" y="0" width="220" height="135" rx="10" fill={cardBg} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
          <text x="110" y="24" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="bold">FIBROUS JOINTS</text>
          {/* Cranial suture illustration */}
          <path d="M40,65 Q60,55 80,65 T120,65 T160,65 T180,65" fill="none" stroke="#64748b" strokeWidth="6" />
          <path d="M40,65 Q50,45 60,65 T80,45 T100,65 T120,45 T140,65 T160,45 T180,65" fill="none" stroke="#0f172a" strokeWidth="2" strokeDasharray="3,1" />
          <text x="110" y="95" textAnchor="middle" fill={labelFill} fontSize="9" fontWeight="bold">Sutures & Syndesmoses</text>
          <text x="110" y="110" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8">Dense collagen fibers • Immovable</text>
          <text x="110" y="122" textAnchor="middle" fill="#f59e0b" fontSize="7.5">Ex: Skull sutures, Teeth gomphoses</text>
        </g>

        {/* 2. Cartilaginous Joint (Symphysis) */}
        <g transform="translate(270, 75)" className="cursor-pointer">
          <rect x="0" y="0" width="220" height="135" rx="10" fill={cardBg} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
          <text x="110" y="24" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">CARTILAGINOUS JOINTS</text>
          {/* Intervertebral disc between bone blocks */}
          <rect x="65" y="45" width="90" height="16" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <rect x="70" y="63" width="80" height="12" rx="3" fill="#8b5cf6" opacity="0.8" />
          <rect x="65" y="77" width="90" height="16" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <text x="110" y="105" textAnchor="middle" fill={labelFill} fontSize="9" fontWeight="bold">Synchondroses & Symphyses</text>
          <text x="110" y="118" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8">Hyaline / Fibrocartilage • Slight movement</text>
          <text x="110" y="128" textAnchor="middle" fill="#8b5cf6" fontSize="7.5">Ex: Intervertebral disc, Pubic symphysis</text>
        </g>

        {/* 3. Synovial Joint (Typical Architecture) */}
        <g transform="translate(510, 75)" className="cursor-pointer">
          <rect x="0" y="0" width="220" height="135" rx="10" fill={cardBg} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
          <text x="110" y="24" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">SYNOVIAL JOINTS</text>
          {/* Two bones + capsule + joint cavity */}
          <path d="M80,42 L140,42 L130,62 L90,62 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
          {/* Cartilage cap */}
          <ellipse cx="110" cy="62" rx="20" ry="3" fill="#06b6d4" />
          {/* Synovial cavity */}
          <rect x="88" y="64" width="44" height="6" fill="#10b981" opacity="0.6" />
          {/* Inferior cartilage cap */}
          <ellipse cx="110" cy="72" rx="20" ry="3" fill="#06b6d4" />
          <path d="M90,72 L130,72 L140,92 L80,92 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
          {/* Capsule */}
          <path d="M80,50 Q72,67 80,85" stroke="#f43f5e" strokeWidth="2" fill="none" />
          <path d="M140,50 Q148,67 140,85" stroke="#f43f5e" strokeWidth="2" fill="none" />
          <text x="110" y="108" textAnchor="middle" fill={labelFill} fontSize="9" fontWeight="bold">Diarthroses (Freely Movable)</text>
          <text x="110" y="120" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8">Articular Cartilage • Synovial Fluid • Capsule</text>
        </g>

        {/* BOTTOM SECTION: 5 MAJOR CLINICAL JOINTS */}
        <g transform="translate(30, 230)">
          <text x="0" y="15" fill={labelFill} fontSize="13" fontWeight="bold">MAJOR REGIONAL SYNOVIAL JOINTS</text>
        </g>

        {/* 1. Shoulder (Ball-and-Socket) */}
        <g transform="translate(30, 260)" className="cursor-pointer">
          <rect x="0" y="0" width="135" height="180" rx="8" fill={cardBg} stroke={isDark ? '#334155' : '#cbd5e1'} />
          <text x="67" y="20" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">SHOULDER JOINT</text>
          <circle cx="67" cy="65" r="22" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <path d="M42,45 Q40,65 42,85" stroke="#e11d48" strokeWidth="3" fill="none" />
          <text x="67" y="115" textAnchor="middle" fill={labelFill} fontSize="8.5" fontWeight="bold">Glenohumeral</text>
          <text x="67" y="130" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="7.5">Ball & Socket</text>
          <text x="67" y="145" textAnchor="middle" fill="#0284c7" fontSize="7.5">Most mobile joint</text>
          <text x="67" y="160" textAnchor="middle" fill="#e11d48" fontSize="7">Prone to anterior dislocation</text>
        </g>

        {/* 2. Elbow (Hinge) */}
        <g transform="translate(175, 260)" className="cursor-pointer">
          <rect x="0" y="0" width="135" height="180" rx="8" fill={cardBg} stroke={isDark ? '#334155' : '#cbd5e1'} />
          <text x="67" y="20" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">ELBOW JOINT</text>
          <line x1="67" y1="40" x2="67" y2="70" stroke="#64748b" strokeWidth="6" />
          <circle cx="67" cy="72" r="8" fill="#38bdf8" />
          <line x1="67" y1="74" x2="45" y2="95" stroke="#64748b" strokeWidth="5" />
          <text x="67" y="115" textAnchor="middle" fill={labelFill} fontSize="8.5" fontWeight="bold">Humeroulnar</text>
          <text x="67" y="130" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="7.5">Uniaxial Hinge</text>
          <text x="67" y="145" textAnchor="middle" fill="#0284c7" fontSize="7.5">Flexion & Extension</text>
          <text x="67" y="160" textAnchor="middle" fill="#64748b" fontSize="7">Collateral ligaments</text>
        </g>

        {/* 3. Hip (Ball-and-Socket) */}
        <g transform="translate(320, 260)" className="cursor-pointer">
          <rect x="0" y="0" width="135" height="180" rx="8" fill={cardBg} stroke={isDark ? '#334155' : '#cbd5e1'} />
          <text x="67" y="20" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">HIP JOINT</text>
          <circle cx="67" cy="65" r="20" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          {/* Deep Acetabular Cup */}
          <path d="M44,45 Q38,65 44,85 L44,45 Z" fill="#64748b" opacity="0.6" />
          <text x="67" y="115" textAnchor="middle" fill={labelFill} fontSize="8.5" fontWeight="bold">Coxofemoral</text>
          <text x="67" y="130" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="7.5">Ball & Socket (Deep)</text>
          <text x="67" y="145" textAnchor="middle" fill="#0284c7" fontSize="7.5">Weight-bearing & Stability</text>
          <text x="67" y="160" textAnchor="middle" fill="#10b981" fontSize="7">Iliofemoral lig. prevents hyperext.</text>
        </g>

        {/* 4. Knee (Modified Hinge / Bicondylar) */}
        <g transform="translate(465, 260)" className="cursor-pointer">
          <rect x="0" y="0" width="135" height="180" rx="8" fill={cardBg} stroke={isDark ? '#334155' : '#cbd5e1'} />
          <text x="67" y="20" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">KNEE JOINT</text>
          {/* Femoral condyles + tibial plateau */}
          <path d="M50,45 L84,45 L84,65 L50,65 Z" fill="#cbd5e1" />
          <circle cx="58" cy="65" r="7" fill="#64748b" />
          <circle cx="76" cy="65" r="7" fill="#64748b" />
          <line x1="50" y1="78" x2="84" y2="78" stroke="#64748b" strokeWidth="4" />
          {/* Cruciates */}
          <line x1="60" y1="65" x2="74" y2="78" stroke="#e11d48" strokeWidth="1.5" />
          <line x1="74" y1="65" x2="60" y2="78" stroke="#e11d48" strokeWidth="1.5" />
          <text x="67" y="115" textAnchor="middle" fill={labelFill} fontSize="8.5" fontWeight="bold">Tibiofemoral</text>
          <text x="67" y="130" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="7.5">Modified Hinge</text>
          <text x="67" y="145" textAnchor="middle" fill="#e11d48" fontSize="7.5">ACL, PCL, Menisci</text>
          <text x="67" y="160" textAnchor="middle" fill="#64748b" fontSize="7">Screw-home locking</text>
        </g>

        {/* 5. Ankle (Hinge) */}
        <g transform="translate(610, 260)" className="cursor-pointer">
          <rect x="0" y="0" width="120" height="180" rx="8" fill={cardBg} stroke={isDark ? '#334155' : '#cbd5e1'} />
          <text x="60" y="20" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">ANKLE JOINT</text>
          {/* Malleolar mortise */}
          <line x1="45" y1="40" x2="45" y2="75" stroke="#64748b" strokeWidth="4" />
          <line x1="75" y1="40" x2="75" y2="80" stroke="#64748b" strokeWidth="3" />
          <path d="M48,65 Q60,60 72,65" fill="#38bdf8" />
          <text x="60" y="115" textAnchor="middle" fill={labelFill} fontSize="8.5" fontWeight="bold">Talocrural</text>
          <text x="60" y="130" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="7.5">Hinge (Mortise)</text>
          <text x="60" y="145" textAnchor="middle" fill="#0284c7" fontSize="7.5">Dorsi / Plantar</text>
          <text x="60" y="160" textAnchor="middle" fill="#e11d48" fontSize="7">Deltoid lig. medial</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 7. MUSCULAR SYSTEM
// =========================================================================
export const MuscularSystemRenderer: React.FC<VisualProps> = ({
  theme = 'light',
  onSelectStructure
}) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';
  const muscleColor = '#e11d48';
  const muscleFill = isDark ? '#be123c' : '#fb7185';
  const linePointer = isDark ? '#38bdf8' : '#0284c7';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 820 620" className="w-full max-w-4xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="800" height="600" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="410" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          THE HUMAN MUSCULAR SYSTEM — MYOLOGY MAP
        </text>
        <text x="410" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Major Skeletal Muscles of the Anterior and Posterior Body Walls & Limbs
        </text>

        {/* Left Side: Anterior Muscular Figure */}
        <g transform="translate(240, 80)">
          {/* Head & Neck */}
          <circle cx="60" cy="25" r="18" fill="#cbd5e1" />
          <path d="M50,42 L50,55 L70,55 L70,42 Z" fill="#e2e8f0" />

          {/* Deltoids (Shoulders) */}
          <path d="M22,55 Q10,75 22,95 L34,70 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          <path d="M98,55 Q110,75 98,95 L86,70 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />

          {/* Pectoralis Major (Chest) */}
          <path d="M34,58 L86,58 L82,90 Q60,98 38,90 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          <line x1="60" y1="58" x2="60" y2="92" stroke="#fff" strokeWidth="1" />

          {/* Biceps Brachii (Anterior Arm) */}
          <ellipse cx="20" cy="115" rx="8" ry="18" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          <ellipse cx="100" cy="115" rx="8" ry="18" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />

          {/* Forearm flexors */}
          <path d="M14,140 L26,140 L24,195 L16,195 Z" fill={muscleFill} opacity="0.8" />
          <path d="M94,140 L106,140 L104,195 L96,195 Z" fill={muscleFill} opacity="0.8" />

          {/* Rectus Abdominis ("6-pack") */}
          <rect x="44" y="98" width="32" height="65" rx="4" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          <line x1="60" y1="98" x2="60" y2="163" stroke="#fff" strokeWidth="1.5" />
          <line x1="44" y1="120" x2="76" y2="120" stroke="#fff" strokeWidth="1.5" />
          <line x1="44" y1="142" x2="76" y2="142" stroke="#fff" strokeWidth="1.5" />

          {/* External Oblique (Flanks) */}
          <path d="M36,98 L44,98 L44,155 L32,145 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1" />
          <path d="M84,98 L76,98 L76,155 L88,145 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1" />

          {/* Pelvis/Groin */}
          <polygon points="34,163 86,163 60,185" fill="#cbd5e1" />

          {/* Quadriceps Femoris (Thigh) */}
          {/* Right Quads */}
          <path d="M30,185 L54,185 L52,280 L32,280 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          <line x1="42" y1="185" x2="42" y2="280" stroke="#fff" strokeWidth="1" strokeDasharray="3,2" />
          {/* Left Quads */}
          <path d="M66,185 L90,185 L88,280 L68,280 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          <line x1="78" y1="185" x2="78" y2="280" stroke="#fff" strokeWidth="1" strokeDasharray="3,2" />

          {/* Knees */}
          <circle cx="42" cy="290" r="6" fill="#cbd5e1" />
          <circle cx="78" cy="290" r="6" fill="#cbd5e1" />

          {/* Tibialis Anterior / Leg */}
          <path d="M36,300 L48,300 L46,390 L38,390 Z" fill={muscleFill} opacity="0.85" />
          <path d="M72,300 L84,300 L82,390 L74,390 Z" fill={muscleFill} opacity="0.85" />

          <text x="60" y="440" textAnchor="middle" fill={labelFill} fontSize="12" fontWeight="bold">Anterior View</text>
        </g>

        {/* Right Side: Posterior Muscular Figure */}
        <g transform="translate(500, 80)">
          {/* Head & Neck Posterior */}
          <circle cx="60" cy="25" r="18" fill="#cbd5e1" />
          <path d="M48,42 L72,42 L66,55 L54,55 Z" fill="#cbd5e1" />

          {/* Trapezius (Upper Back) */}
          <polygon points="60,45 22,65 60,110 98,65" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />

          {/* Posterior Deltoid */}
          <path d="M22,60 Q10,75 22,95 L32,70 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1" />
          <path d="M98,60 Q110,75 98,95 L88,70 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1" />

          {/* Triceps Brachii (Posterior Arm) */}
          <ellipse cx="18" cy="115" rx="8" ry="20" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          <ellipse cx="102" cy="115" rx="8" ry="20" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />

          {/* Latissimus Dorsi ("Wings") */}
          <path d="M32,100 L60,110 L88,100 L76,160 L44,160 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />

          {/* Gluteus Maximus (Buttocks) */}
          <ellipse cx="44" cy="180" rx="16" ry="18" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          <ellipse cx="76" cy="180" rx="16" ry="18" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />

          {/* Hamstrings (Posterior Thigh) */}
          <path d="M30,200 L54,200 L50,285 L34,285 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          <path d="M66,200 L90,200 L86,285 L70,285 Z" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />

          {/* Popliteal Fossa */}
          <ellipse cx="42" cy="292" rx="4" ry="3" fill="#cbd5e1" />
          <ellipse cx="78" cy="292" rx="4" ry="3" fill="#cbd5e1" />

          {/* Gastrocnemius (Calf Muscle) */}
          <ellipse cx="40" cy="335" rx="11" ry="28" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          <ellipse cx="80" cy="335" rx="11" ry="28" fill={muscleFill} stroke={muscleColor} strokeWidth="1.5" />
          {/* Achilles Tendon */}
          <rect x="37" y="365" width="6" height="35" fill="#cbd5e1" />
          <rect x="77" y="365" width="6" height="35" fill="#cbd5e1" />

          <text x="60" y="440" textAnchor="middle" fill={labelFill} fontSize="12" fontWeight="bold">Posterior View</text>
        </g>

        {/* LABELS & POINTERS TO MUSCLES */}
        {/* Left Column (Anterior Muscles) */}
        <g transform="translate(40, 110)">
          {/* Deltoid */}
          <line x1="130" y1="20" x2="255" y2="45" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="120" y="23" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Deltoid (Abduction)</text>

          {/* Pectoralis Major */}
          <line x1="130" y1="50" x2="285" y2="55" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="120" y="53" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Pectoralis Major</text>

          {/* Biceps Brachii */}
          <line x1="130" y1="90" x2="255" y2="95" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="120" y="93" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Biceps Brachii (Flex/Supinate)</text>

          {/* Rectus Abdominis */}
          <line x1="130" y1="125" x2="290" y2="120" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="120" y="128" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Rectus Abdominis</text>

          {/* External Oblique */}
          <line x1="130" y1="160" x2="275" y2="140" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="120" y="163" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">External Oblique</text>

          {/* Quadriceps */}
          <line x1="130" y1="230" x2="280" y2="215" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="120" y="228" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Quadriceps Femoris</text>
          <text x="120" y="240" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5" textAnchor="end">(Rectus femoris & Vasti)</text>
        </g>

        {/* Right Column (Posterior Muscles) */}
        <g transform="translate(640, 110)">
          {/* Triceps Brachii */}
          <line x1="-10" y1="35" x2="-115" y2="95" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="38" fill={labelFill} fontSize="11" fontWeight="bold">Triceps Brachii (Extensor)</text>

          {/* Latissimus Dorsi */}
          <line x1="-10" y1="75" x2="-80" y2="120" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="78" fill={labelFill} fontSize="11" fontWeight="bold">Latissimus Dorsi</text>

          {/* Gluteus Maximus */}
          <line x1="-10" y1="130" x2="-95" y2="165" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="133" fill={labelFill} fontSize="11" fontWeight="bold">Gluteus Maximus (Chief Extensor)</text>

          {/* Hamstrings */}
          <line x1="-10" y1="190" x2="-100" y2="225" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="188" fill={labelFill} fontSize="11" fontWeight="bold">Hamstrings</text>
          <text x="0" y="200" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">(Biceps femoris, Semi-T, Semi-M)</text>

          {/* Gastrocnemius */}
          <line x1="-10" y1="280" x2="-95" y2="335" stroke={linePointer} strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="278" fill={labelFill} fontSize="11" fontWeight="bold">Gastrocnemius (Calf)</text>
          <text x="0" y="290" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Inserts into Achilles tendon</text>
        </g>
      </svg>
    </div>
  );
};
