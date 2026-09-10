import React from 'react';

interface VisualProps {
  theme?: 'light' | 'dark';
  onSelectStructure?: (title: string, desc: string, pearl?: string) => void;
}

// =========================================================================
// 8. NERVOUS SYSTEM
// =========================================================================
export const NervousSystemRenderer: React.FC<VisualProps> = ({ theme = 'light', onSelectStructure }) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';
  const linePointer = isDark ? '#38bdf8' : '#0284c7';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="740" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="380" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          THE NERVOUS SYSTEM — CENTRAL & PERIPHERAL NEUROANATOMY
        </text>
        <text x="380" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Brain (Cerebrum, Cerebellum, Brainstem) • Spinal Cord • Peripheral Nerves & Plexuses
        </text>

        {/* Brain Detailed Lateral Sagittal Profile (Left) */}
        <g transform="translate(60, 80)">
          <rect x="0" y="0" width="280" height="230" rx="12" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#334155' : '#cbd5e1'} />
          <text x="140" y="24" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">THE BRAIN (Encephalon)</text>

          {/* Cerebrum (Cerebral Hemisphere with sulci/gyri) */}
          <path
            d="M60,110 Q40,90 60,65 Q80,45 140,45 Q210,45 225,85 Q235,115 210,135 Q180,145 150,140 Q135,130 110,140 Q80,140 60,110 Z"
            fill="#a78bfa"
            stroke="#6d28d9"
            strokeWidth="2"
          />
          {/* Sulci lines */}
          <path d="M90,65 Q110,95 145,90 Q175,90 200,75" fill="none" stroke="#5b21b6" strokeWidth="1.5" />
          <path d="M125,50 Q130,85 155,115" fill="none" stroke="#5b21b6" strokeWidth="1.5" />
          <path d="M75,90 Q110,115 140,110" fill="none" stroke="#5b21b6" strokeWidth="1.5" />

          {/* Cerebellum (posterior & inferior to occipital lobe) */}
          <ellipse cx="195" cy="165" rx="30" ry="22" fill="#fb7185" stroke="#be123c" strokeWidth="1.5" />
          {/* Folia lines */}
          <line x1="175" y1="160" x2="215" y2="160" stroke="#be123c" strokeWidth="1" />
          <line x1="172" y1="168" x2="218" y2="168" stroke="#be123c" strokeWidth="1" />

          {/* Brainstem (Midbrain, Pons, Medulla) */}
          {/* Midbrain */}
          <rect x="135" y="130" width="18" height="15" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
          {/* Pons (anterior bulge) */}
          <ellipse cx="140" cy="155" rx="14" ry="12" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          {/* Medulla Oblongata */}
          <path d="M132,165 L148,165 L144,195 L136,195 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />

          {/* Labels inside Brain box */}
          <text x="140" y="78" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">CEREBRUM</text>
          <text x="195" y="168" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">CEREBELLUM</text>
          <text x="140" y="210" fill={labelFill} fontSize="9" fontWeight="bold" textAnchor="middle">BRAINSTEM</text>
          <text x="140" y="222" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="7.5" textAnchor="middle">(Midbrain, Pons, Medulla)</text>
        </g>

        {/* Central Full Body Neuro-Axis (Spinal cord + Peripheral Nerves) */}
        <g transform="translate(480, 75)">
          {/* Brainhead silhouette */}
          <circle cx="80" cy="25" r="22" fill={isDark ? '#334155' : '#cbd5e1'} stroke="#64748b" strokeWidth="1" />
          <path d="M70,20 Q80,10 90,20" fill="none" stroke="#8b5cf6" strokeWidth="4" />

          {/* Spinal Cord (Continuous descending yellow cord) */}
          <line x1="80" y1="47" x2="80" y2="245" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
          {/* Conus Medullaris & Cauda Equina */}
          <line x1="80" y1="245" x2="74" y2="295" stroke="#f59e0b" strokeWidth="2" />
          <line x1="80" y1="245" x2="80" y2="298" stroke="#f59e0b" strokeWidth="2" />
          <line x1="80" y1="245" x2="86" y2="295" stroke="#f59e0b" strokeWidth="2" />

          {/* Cervical Plexus & Brachial Plexus radiating to arms */}
          <line x1="80" y1="70" x2="30" y2="130" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="80" y1="70" x2="130" y2="130" stroke="#0284c7" strokeWidth="2.5" />
          {/* Radial / Median / Ulnar nerves in arm */}
          <line x1="30" y1="130" x2="15" y2="210" stroke="#0284c7" strokeWidth="2" />
          <line x1="130" y1="130" x2="145" y2="210" stroke="#0284c7" strokeWidth="2" />

          {/* Intercostal nerves */}
          {[100, 120, 140, 160, 180, 200].map((y, i) => (
            <g key={i}>
              <line x1="80" y1={y} x2="55" y2={y + 8} stroke="#0284c7" strokeWidth="1.5" />
              <line x1="80" y1={y} x2="105" y2={y + 8} stroke="#0284c7" strokeWidth="1.5" />
            </g>
          ))}

          {/* Lumbar & Sacral Plexuses (Sciatic & Femoral nerves to lower limbs) */}
          <line x1="80" y1="235" x2="55" y2="340" stroke="#0284c7" strokeWidth="3" />
          <line x1="80" y1="235" x2="105" y2="340" stroke="#0284c7" strokeWidth="3" />
          {/* Tibial & Common Fibular nerves to legs */}
          <line x1="55" y1="340" x2="50" y2="420" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="105" y1="340" x2="110" y2="420" stroke="#0284c7" strokeWidth="2.5" />

          <text x="80" y="445" textAnchor="middle" fill={labelFill} fontSize="11" fontWeight="bold">Peripheral Nervous System (PNS)</text>
        </g>

        {/* Educational Callouts Bottom Left */}
        <g transform="translate(60, 325)">
          <rect x="0" y="0" width="370" height="155" rx="10" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#334155' : '#cbd5e1'} />
          <text x="15" y="24" fill="#0284c7" fontSize="11" fontWeight="bold">CLINICAL NEUROANATOMY HIGHLIGHTS</text>

          <text x="15" y="46" fill={labelFill} fontSize="9.5" fontWeight="bold">• Spinal Cord Termination (Conus Medullaris):</text>
          <text x="25" y="60" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Ends at L1/L2 in adults (L3 in newborns). Lumbar puncture performed at L3/L4 or L4/L5.</text>

          <text x="15" y="80" fill={labelFill} fontSize="9.5" fontWeight="bold">• 31 Spinal Nerve Pairs:</text>
          <text x="25" y="94" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">8 Cervical, 12 Thoracic, 5 Lumbar, 5 Sacral, 1 Coccygeal.</text>

          <text x="15" y="114" fill={labelFill} fontSize="9.5" fontWeight="bold">• Brainstem Vital Autonomic Centers:</text>
          <text x="25" y="128" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Medulla oblongata houses cardiac, vasomotor, and respiratory reflex centers.</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 9. CARDIOVASCULAR SYSTEM
// =========================================================================
export const CardiovascularSystemRenderer: React.FC<VisualProps> = ({ theme = 'light', onSelectStructure }) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';
  const deoxColor = '#0284c7';
  const oxColor = '#e11d48';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="740" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="380" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          THE CARDIOVASCULAR SYSTEM — CARDIAC CHAMBERS & GREAT VESSELS
        </text>
        <text x="380" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          4 Chambers • Ascending Aorta & Arch • Pulmonary Trunk/Arteries/Veins • SVC & IVC
        </text>

        {/* Central Heart Illustration */}
        <g transform="translate(380, 240)">
          {/* Superior Vena Cava (SVC) */}
          <path d="M-60,-150 L-40,-150 L-40,-40 L-60,-40 Z" fill={deoxColor} />
          {/* Inferior Vena Cava (IVC) */}
          <path d="M-55,90 L-35,90 L-35,160 L-55,160 Z" fill={deoxColor} />

          {/* Aorta Arch & 3 Branches */}
          <path
            d="M-15,-60 C-15,-140 65,-140 65,-40"
            fill="none"
            stroke={oxColor}
            strokeWidth="28"
            strokeLinecap="round"
          />
          {/* 3 Branches: Brachiocephalic, L. Carotid, L. Subclavian */}
          <line x1="0" y1="-125" x2="-8" y2="-165" stroke={oxColor} strokeWidth="8" strokeLinecap="round" />
          <line x1="20" y1="-132" x2="20" y2="-165" stroke={oxColor} strokeWidth="7" strokeLinecap="round" />
          <line x1="40" y1="-128" x2="48" y2="-165" stroke={oxColor} strokeWidth="7" strokeLinecap="round" />

          {/* Pulmonary Trunk & Right/Left Pulmonary Arteries */}
          <path d="M-10,-40 Q0,-80 30,-90" fill="none" stroke={deoxColor} strokeWidth="22" />
          <path d="M30,-90 L85,-110" stroke={deoxColor} strokeWidth="12" strokeLinecap="round" />
          <path d="M15,-85 L-70,-105" stroke={deoxColor} strokeWidth="12" strokeLinecap="round" />

          {/* Pulmonary Veins (Oxygenated from lungs into LA) */}
          <line x1="-90" y1="-30" x2="-60" y2="-30" stroke={oxColor} strokeWidth="10" strokeLinecap="round" />
          <line x1="-90" y1="-15" x2="-60" y2="-15" stroke={oxColor} strokeWidth="10" strokeLinecap="round" />
          <line x1="60" y1="-30" x2="90" y2="-30" stroke={oxColor} strokeWidth="10" strokeLinecap="round" />
          <line x1="60" y1="-15" x2="90" y2="-15" stroke={oxColor} strokeWidth="10" strokeLinecap="round" />

          {/* CARDIAC WALLS & 4 CHAMBERS */}
          {/* Right Atrium (RA) */}
          <path d="M-75,-40 Q-85,20 -45,50 L-30,0 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          {/* Right Ventricle (RV) */}
          <path d="M-45,50 Q-10,130 0,140 L-10,20 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />

          {/* Left Atrium (LA - posterior) */}
          <path d="M15,-40 Q65,-40 65,20 L15,0 Z" fill="#f43f5e" stroke="#e11d48" strokeWidth="2" />
          {/* Left Ventricle (LV - thick myocardium apex) */}
          <path d="M-10,20 Q0,140 25,150 Q95,70 65,20 Z" fill="#be123c" stroke="#9f1239" strokeWidth="2" />

          {/* Chamber Text Overlays */}
          <text x="-58" y="10" fill="#ffffff" fontSize="11" fontWeight="bold">RA</text>
          <text x="-25" y="70" fill="#ffffff" fontSize="12" fontWeight="bold">RV</text>
          <text x="35" y="0" fill="#ffffff" fontSize="11" fontWeight="bold">LA</text>
          <text x="25" y="70" fill="#ffffff" fontSize="13" fontWeight="bold">LV</text>
        </g>

        {/* Labels & Callouts */}
        {/* Left Column Labels */}
        <g transform="translate(60, 110)">
          <text x="140" y="20" fill={deoxColor} fontSize="11" fontWeight="bold" textAnchor="end">Superior Vena Cava (SVC)</text>
          <text x="140" y="60" fill={deoxColor} fontSize="11" fontWeight="bold" textAnchor="end">Right Pulmonary Artery</text>
          <text x="140" y="110" fill={oxColor} fontSize="11" fontWeight="bold" textAnchor="end">Right Pulmonary Veins (2)</text>
          <text x="140" y="150" fill={deoxColor} fontSize="11" fontWeight="bold" textAnchor="end">Right Atrium (RA)</text>
          <text x="140" y="200" fill={deoxColor} fontSize="11" fontWeight="bold" textAnchor="end">Right Ventricle (RV)</text>
          <text x="140" y="260" fill={deoxColor} fontSize="11" fontWeight="bold" textAnchor="end">Inferior Vena Cava (IVC)</text>
        </g>

        {/* Right Column Labels */}
        <g transform="translate(560, 100)">
          <text x="0" y="10" fill={oxColor} fontSize="11" fontWeight="bold">Aortic Arch & 3 Branches</text>
          <text x="0" y="25" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">(Brachiocephalic, L. Carotid, L. Subclavian)</text>
          <text x="0" y="65" fill={deoxColor} fontSize="11" fontWeight="bold">Pulmonary Trunk & L. Artery</text>
          <text x="0" y="110" fill={oxColor} fontSize="11" fontWeight="bold">Left Pulmonary Veins (2)</text>
          <text x="0" y="150" fill={oxColor} fontSize="11" fontWeight="bold">Left Atrium (LA)</text>
          <text x="0" y="200" fill={oxColor} fontSize="11" fontWeight="bold">Left Ventricle (LV)</text>
          <text x="0" y="215" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Thickest wall (apex of heart)</text>
        </g>

        {/* Key indicator at bottom */}
        <g transform="translate(200, 440)">
          <rect x="0" y="0" width="360" height="40" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#334155' : '#cbd5e1'} />
          <circle cx="20" cy="20" r="8" fill={deoxColor} />
          <text x="35" y="24" fill={labelFill} fontSize="10">Deoxygenated Blood (Venous Return to Lungs)</text>
          <circle cx="210" cy="20" r="8" fill={oxColor} />
          <text x="225" y="24" fill={labelFill} fontSize="10">Oxygenated Blood (Systemic Flow)</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 10. RESPIRATORY SYSTEM
// =========================================================================
export const RespiratorySystemRenderer: React.FC<VisualProps> = ({ theme = 'light', onSelectStructure }) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';
  const lungPink = isDark ? '#f43f5e' : '#fb7185';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="740" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="380" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          THE RESPIRATORY SYSTEM — AIRWAY & PULMONARY APPARATUS
        </text>
        <text x="380" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Nasal Cavity • Pharynx • Larynx • Trachea • Bronchial Tree • Right & Left Lungs • Diaphragm
        </text>

        {/* Central Anatomy Drawing */}
        <g transform="translate(380, 75)">
          {/* Head & Nasal profile */}
          <path d="M-40,25 Q-65,25 -70,55 L-85,75 L-65,85 L-68,105 L-50,115" fill="none" stroke="#64748b" strokeWidth="2" />
          {/* Nasal Cavity & Pharynx air route */}
          <path d="M-70,75 Q-40,65 -20,80 L-10,120" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />

          {/* Larynx (Voice Box / Thyroid cartilage) */}
          <polygon points="-16,120 16,120 10,145 -10,145" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <text x="0" y="136" fill="#0f172a" fontSize="7.5" fontWeight="bold" textAnchor="middle">LARYNX</text>

          {/* Trachea with C-shaped cartilage rings */}
          <rect x="-8" y="146" width="16" height="65" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
          {[152, 162, 172, 182, 192, 202].map((y, i) => (
            <line key={i} x1="-8" y1={y} x2="8" y2={y} stroke="#0284c7" strokeWidth="2" />
          ))}

          {/* Carina & Bifurcation into Right and Left Main Bronchi */}
          <path d="M-4,210 L-45,245" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
          <path d="M4,210 L45,245" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />

          {/* RIGHT LUNG (3 Lobes: Superior, Middle, Inferior; 2 Fissures: Horizontal & Oblique) */}
          <path
            d="M-40,230 Q-120,240 -115,340 Q-95,365 -40,360 Z"
            fill={lungPink}
            stroke="#be123c"
            strokeWidth="2"
            opacity="0.9"
          />
          {/* Horizontal Fissure */}
          <line x1="-115" y1="285" x2="-45" y2="285" stroke="#9f1239" strokeWidth="1.5" strokeDasharray="3,2" />
          {/* Oblique Fissure */}
          <line x1="-110" y1="315" x2="-45" y2="340" stroke="#9f1239" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="-75" y="265" fill="#ffffff" fontSize="8" fontWeight="bold">Superior</text>
          <text x="-75" y="305" fill="#ffffff" fontSize="8" fontWeight="bold">Middle</text>
          <text x="-75" y="345" fill="#ffffff" fontSize="8" fontWeight="bold">Inferior</text>

          {/* LEFT LUNG (2 Lobes: Superior & Inferior with Cardiac Notch) */}
          <path
            d="M40,230 Q120,240 115,340 Q95,365 40,360 Q25,320 40,290 Z"
            fill={lungPink}
            stroke="#be123c"
            strokeWidth="2"
            opacity="0.9"
          />
          {/* Oblique Fissure */}
          <line x1="45" y1="285" x2="115" y2="315" stroke="#9f1239" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="75" y="270" fill="#ffffff" fontSize="8" fontWeight="bold">Superior</text>
          <text x="75" y="340" fill="#ffffff" fontSize="8" fontWeight="bold">Inferior</text>
          <text x="28" y="315" fill="#be123c" fontSize="7" fontWeight="bold">Cardiac Notch</text>

          {/* DIAPHRAGM (Dome-shaped muscular partition beneath lungs) */}
          <path
            d="M-135,370 Q0,335 135,370 L135,385 Q0,350 -135,385 Z"
            fill="#e11d48"
            stroke="#9f1239"
            strokeWidth="1.5"
          />
          <text x="0" y="375" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">DIAPHRAGM (C3, C4, C5)</text>
        </g>

        {/* Labels Left */}
        <g transform="translate(60, 110)">
          <text x="140" y="40" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Nasal Cavity & Pharynx</text>
          <text x="140" y="55" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5" textAnchor="end">Filter, warm, humidify air</text>
          <text x="140" y="105" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Larynx (Voice Box)</text>
          <text x="140" y="155" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Trachea (16-20 C-rings)</text>
          <text x="140" y="240" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Right Lung (3 Lobes)</text>
          <text x="140" y="255" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5" textAnchor="end">Horizontal & Oblique fissures</text>
        </g>

        {/* Labels Right */}
        <g transform="translate(560, 240)">
          <text x="0" y="40" fill={labelFill} fontSize="11" fontWeight="bold">Left Lung (2 Lobes)</text>
          <text x="0" y="55" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Oblique fissure & cardiac notch</text>
          <text x="0" y="105" fill={labelFill} fontSize="11" fontWeight="bold">Carina & Bronchi</text>
          <text x="0" y="120" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Right is wider, shorter & steeper</text>
          <text x="0" y="150" fill="#e11d48" fontSize="11" fontWeight="bold">Diaphragm Muscle</text>
          <text x="0" y="165" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Chief muscle of inspiration</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 11. DIGESTIVE SYSTEM
// =========================================================================
export const DigestiveSystemRenderer: React.FC<VisualProps> = ({ theme = 'light', onSelectStructure }) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="740" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="380" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          THE DIGESTIVE SYSTEM — GASTROINTESTINAL TRACT & ACCESSORY ORGANS
        </text>
        <text x="380" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Oral Cavity • Esophagus • Stomach • Liver • Gallbladder • Pancreas • Small & Large Intestine • Rectum
        </text>

        {/* Central Anatomy Drawing */}
        <g transform="translate(380, 80)">
          {/* Head & Oral Cavity */}
          <path d="M-35,15 Q-55,15 -60,40 L-75,55 L-55,65 L-58,80 L-40,90" fill="none" stroke="#64748b" strokeWidth="2" />
          <ellipse cx="-45" cy="55" rx="8" ry="4" fill="#fda4af" />

          {/* Esophagus (25 cm muscular tube) */}
          <line x1="-15" y1="75" x2="-15" y2="160" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />

          {/* Stomach (J-shaped pouch) */}
          <path
            d="M-15,160 Q-35,165 -30,205 Q-25,230 15,220 Q25,200 10,180 Q-5,165 -15,160 Z"
            fill="#fb923c"
            stroke="#ea580c"
            strokeWidth="2"
          />
          <text x="-5" y="195" fill="#ffffff" fontSize="8" fontWeight="bold">STOMACH</text>

          {/* Liver (Right Hypochondrium / Epigastrium) */}
          <path
            d="M-110,155 Q-60,140 -20,155 L-20,195 Q-70,205 -110,185 Z"
            fill="#991b1b"
            stroke="#7f1d1d"
            strokeWidth="2"
          />
          <text x="-65" y="175" fill="#ffffff" fontSize="9" fontWeight="bold">LIVER</text>

          {/* Gallbladder (under liver) */}
          <ellipse cx="-45" cy="195" rx="8" ry="12" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />

          {/* Pancreas (Retroperitoneal behind stomach, nestled in duodenal C-loop) */}
          <path d="M0,215 Q35,210 65,205 Q60,218 0,225 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="35" y="218" fill="#713f12" fontSize="7" fontWeight="bold">PANCREAS</text>

          {/* Large Intestine (Colon: Cecum, Ascending, Transverse, Descending, Sigmoid) */}
          {/* Colon Frame */}
          <path
            d="M-75,320 L-75,235 Q-75,225 -65,225 L65,225 Q75,225 75,235 L75,320 L60,345 L0,370"
            fill="none"
            stroke="#b45309"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <text x="0" y="238" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">TRANSVERSE COLON</text>

          {/* Small Intestine (Jejunum & Ileum coils inside colon frame) */}
          <rect x="-55" y="245" width="110" height="75" rx="10" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
          {/* Small intestine coils */}
          <path d="M-45,260 Q-15,250 15,260 Q45,270 -45,280 Q45,290 -40,305" fill="none" stroke="#ea580c" strokeWidth="3" />
          <text x="0" y="285" fill="#9a3412" fontSize="8" fontWeight="bold" textAnchor="middle">SMALL INTESTINE</text>

          {/* Appendix */}
          <line x1="-80" y1="325" x2="-95" y2="340" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" />
          <text x="-95" y="352" fill="#b45309" fontSize="7" fontWeight="bold">Appendix</text>

          {/* Rectum & Anal Canal */}
          <line x1="0" y1="370" x2="0" y2="415" stroke="#78350f" strokeWidth="10" strokeLinecap="round" />
          <text x="0" y="430" fill={labelFill} fontSize="8" fontWeight="bold" textAnchor="middle">Rectum & Anal Canal</text>
        </g>

        {/* Labels Left */}
        <g transform="translate(60, 110)">
          <text x="140" y="30" fill={labelFill} fontSize="11" fontWeight="bold" textAnchor="end">Oral Cavity</text>
          <text x="140" y="45" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5" textAnchor="end">Mastication & salivary enzymes</text>
          <text x="140" y="75" fill="#991b1b" fontSize="11" fontWeight="bold" textAnchor="end">Liver (Largest Gland)</text>
          <text x="140" y="90" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5" textAnchor="end">Synthesizes bile & proteins</text>
          <text x="140" y="125" fill="#16a34a" fontSize="11" fontWeight="bold" textAnchor="end">Gallbladder</text>
          <text x="140" y="140" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5" textAnchor="end">Stores and concentrates bile</text>
          <text x="140" y="220" fill="#ea580c" fontSize="11" fontWeight="bold" textAnchor="end">Small Intestine</text>
          <text x="140" y="235" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5" textAnchor="end">Duodenum, Jejunum, Ileum</text>
        </g>

        {/* Labels Right */}
        <g transform="translate(560, 140)">
          <text x="0" y="20" fill={labelFill} fontSize="11" fontWeight="bold">Esophagus (25 cm)</text>
          <text x="0" y="60" fill="#ea580c" fontSize="11" fontWeight="bold">Stomach</text>
          <text x="0" y="75" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Cardia, Fundus, Body, Pylorus</text>
          <text x="0" y="105" fill="#ca8a04" fontSize="11" fontWeight="bold">Pancreas</text>
          <text x="0" y="120" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Exocrine acini & Endocrine islets</text>
          <text x="0" y="165" fill="#b45309" fontSize="11" fontWeight="bold">Large Intestine (Colon)</text>
          <text x="0" y="180" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Cecum, Colon, Rectum, Anal Canal</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 12. URINARY SYSTEM
// =========================================================================
export const UrinarySystemRenderer: React.FC<VisualProps> = ({ theme = 'light', onSelectStructure }) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="740" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="380" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          THE URINARY SYSTEM — RENAL & EXCRETORY TRACT
        </text>
        <text x="380" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Kidneys (Renal Cortex & Medulla) • Ureters • Urinary Bladder (Detrusor & Trigone) • Urethra
        </text>

        {/* Central Anatomy Drawing */}
        <g transform="translate(380, 100)">
          {/* Abdominal Aorta & Inferior Vena Cava vessels */}
          <rect x="-8" y="0" width="16" height="230" fill="#e11d48" />
          <rect x="-30" y="0" width="18" height="230" fill="#0284c7" />

          {/* Renal Arteries & Veins */}
          <line x1="-8" y1="50" x2="60" y2="50" stroke="#e11d48" strokeWidth="6" />
          <line x1="-30" y1="50" x2="-80" y2="50" stroke="#0284c7" strokeWidth="7" />
          <line x1="-8" y1="65" x2="-80" y2="65" stroke="#e11d48" strokeWidth="6" />
          <line x1="-12" y1="60" x2="60" y2="60" stroke="#0284c7" strokeWidth="7" />

          {/* LEFT KIDNEY (slightly higher, T12-L3) */}
          <path
            d="M60,25 Q115,20 115,70 Q115,120 60,115 Q75,70 60,25 Z"
            fill="#991b1b"
            stroke="#7f1d1d"
            strokeWidth="2"
          />
          <text x="85" y="75" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">LEFT KIDNEY</text>

          {/* RIGHT KIDNEY (slightly lower due to liver) */}
          <path
            d="M-80,40 Q-135,35 -135,85 Q-135,135 -80,130 Q-95,85 -80,40 Z"
            fill="#991b1b"
            stroke="#7f1d1d"
            strokeWidth="2"
          />
          <text x="-105" y="90" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">RIGHT KIDNEY</text>

          {/* Adrenal (Suprarenal) Glands on top */}
          <polygon points="75,22 95,12 110,24" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <polygon points="-115,38 -95,28 -80,40" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />

          {/* Renal Pelvis & URETERS (25 cm retroperitoneal tubes) */}
          <path d="M-80,95 Q-70,180 -25,270" fill="none" stroke="#eab308" strokeWidth="4" />
          <path d="M60,80 Q50,180 25,270" fill="none" stroke="#eab308" strokeWidth="4" />

          {/* URINARY BLADDER (Muscular reservoir with thick detrusor) */}
          <ellipse cx="0" cy="290" rx="55" ry="40" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          {/* Trigone marker */}
          <polygon points="-20,285 20,285 0,315" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
          <text x="0" y="295" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">BLADDER</text>

          {/* Urethra */}
          <line x1="0" y1="330" x2="0" y2="385" stroke="#d97706" strokeWidth="7" strokeLinecap="round" />
          <text x="0" y="405" fill={labelFill} fontSize="9" fontWeight="bold" textAnchor="middle">Urethra</text>
        </g>

        {/* Labels Left */}
        <g transform="translate(60, 130)">
          <text x="140" y="40" fill="#991b1b" fontSize="11" fontWeight="bold" textAnchor="end">Right Kidney (T12-L3)</text>
          <text x="140" y="55" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5" textAnchor="end">Lower than left due to liver</text>
          <text x="140" y="140" fill="#ca8a04" fontSize="11" fontWeight="bold" textAnchor="end">Right Ureter (25 cm)</text>
          <text x="140" y="155" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5" textAnchor="end">3 constriction sites (stones)</text>
        </g>

        {/* Labels Right */}
        <g transform="translate(560, 130)">
          <text x="0" y="30" fill="#facc15" fontSize="11" fontWeight="bold">Adrenal (Suprarenal) Gland</text>
          <text x="0" y="70" fill="#991b1b" fontSize="11" fontWeight="bold">Left Kidney</text>
          <text x="0" y="85" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Cortex (glomeruli) & Medulla</text>
          <text x="0" y="210" fill="#d97706" fontSize="11" fontWeight="bold">Urinary Bladder & Trigone</text>
          <text x="0" y="225" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Detrusor muscle (parasympathetic)</text>
          <text x="0" y="265" fill={labelFill} fontSize="11" fontWeight="bold">Urethra</text>
          <text x="0" y="280" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">Female ~4 cm | Male ~20 cm</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 13. REPRODUCTIVE SYSTEM (MALE & FEMALE SEPARATE ACCURATE DIAGRAMS)
// =========================================================================
export const ReproductiveSystemRenderer: React.FC<VisualProps> = ({ theme = 'light', onSelectStructure }) => {
  const isDark = theme === 'dark';
  const labelFill = isDark ? '#f8fafc' : '#0f172a';
  const cardBg = isDark ? '#1e293b' : '#f8fafc';

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="740" height="500" rx="16" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="1.5" />

        <text x="380" y="38" textAnchor="middle" fill={labelFill} fontSize="16" fontWeight="bold">
          THE REPRODUCTIVE SYSTEMS — MALE & FEMALE MEDICAL ANATOMY
        </text>
        <text x="380" y="56" textAnchor="middle" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11">
          Accurate, Simplified Clinical Overviews of the Internal & External Reproductive Organs
        </text>

        {/* LEFT PANEL: MALE REPRODUCTIVE SYSTEM */}
        <g transform="translate(35, 75)">
          <rect x="0" y="0" width="335" height="400" rx="12" fill={cardBg} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
          <text x="167" y="26" textAnchor="middle" fill="#0284c7" fontSize="13" fontWeight="bold">MALE REPRODUCTIVE SYSTEM</text>

          {/* Male Sagittal Diagram */}
          <g transform="translate(167, 210)">
            {/* Bladder */}
            <ellipse cx="-20" cy="-70" rx="35" ry="25" fill="#f59e0b" opacity="0.8" />
            <text x="-20" y="-68" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Bladder</text>

            {/* Prostate Gland (encircling urethra below bladder neck) */}
            <ellipse cx="-20" cy="-35" rx="20" ry="15" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
            <text x="-20" y="-33" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">Prostate</text>

            {/* Seminal Vesicle (posterior to bladder) */}
            <ellipse cx="10" cy="-55" rx="12" ry="7" fill="#ec4899" />
            <text x="12" y="-45" fill="#ec4899" fontSize="7" fontWeight="bold">Seminal Vesicle</text>

            {/* Scrotum & Testis */}
            <rect x="-85" y="45" width="50" height="55" rx="14" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
            <ellipse cx="-60" cy="72" rx="16" ry="22" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <text x="-60" y="75" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Testis</text>

            {/* Epididymis (posterior cap on testis) */}
            <path d="-44,52 Q-40,72 -44,92" fill="none" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
            <text x="-35" y="85" fill="#f43f5e" fontSize="7.5" fontWeight="bold">Epididymis</text>

            {/* Vas (Ductus) Deferens */}
            <path d="M-44,55 C-40,10 -30,10 -20,-20" fill="none" stroke="#0284c7" strokeWidth="3" strokeDasharray="3,2" />
            <text x="-70" y="10" fill="#0284c7" fontSize="7.5" fontWeight="bold">Vas Deferens</text>

            {/* Penis (Corpora cavernosa & spongiosum) */}
            <path d="M-20,-20 L-65,45" stroke="#38bdf8" strokeWidth="16" strokeLinecap="round" />
            <line x1="-20" y1="-20" x2="-65" y2="45" stroke="#0284c7" strokeWidth="4" />
            <text x="-55" y="42" fill="#ffffff" fontSize="7" fontWeight="bold">Urethra</text>
          </g>

          {/* Key Structures List */}
          <g transform="translate(15, 335)">
            <text x="0" y="15" fill={labelFill} fontSize="8.5" fontWeight="bold">• Testes: Spermatogenesis & Testosterone</text>
            <text x="0" y="30" fill={labelFill} fontSize="8.5" fontWeight="bold">• Epididymis: Sperm maturation & motility</text>
            <text x="0" y="45" fill={labelFill} fontSize="8.5" fontWeight="bold">• Prostate & Seminal Vesicles: Seminal fluid</text>
          </g>
        </g>

        {/* RIGHT PANEL: FEMALE REPRODUCTIVE SYSTEM */}
        <g transform="translate(390, 75)">
          <rect x="0" y="0" width="335" height="400" rx="12" fill={cardBg} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
          <text x="167" y="26" textAnchor="middle" fill="#e11d48" fontSize="13" fontWeight="bold">FEMALE REPRODUCTIVE SYSTEM</text>

          {/* Female Coronal / Frontal Uterus Diagram */}
          <g transform="translate(167, 185)">
            {/* Uterus (Fundus, Body, Cervix) */}
            <path
              d="M-30,-25 Q0,-40 30,-25 L25,45 L-25,45 Z"
              fill="#fb7185"
              stroke="#e11d48"
              strokeWidth="2"
            />
            {/* Endometrial cavity */}
            <polygon points="-15,-20 15,-20 0,25" fill="#f43f5e" />
            <text x="0" y="-5" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">UTERUS</text>

            {/* Cervix */}
            <rect x="-14" y="45" width="28" height="20" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5" />
            <text x="0" y="58" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Cervix</text>

            {/* Vagina */}
            <rect x="-18" y="65" width="36" height="45" fill="#fda4af" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="0" y="90" fill="#9f1239" fontSize="8" fontWeight="bold" textAnchor="middle">Vagina</text>

            {/* Fallopian (Uterine) Tubes */}
            <path d="M-30,-25 Q-65,-45 -95,-20" fill="none" stroke="#e11d48" strokeWidth="4" />
            <path d="M30,-25 Q65,-45 95,-20" fill="none" stroke="#e11d48" strokeWidth="4" />
            {/* Fimbriae */}
            <path d="M-95,-20 L-102,-12 M-95,-20 L-104,-20 M-95,-20 L-102,-28" stroke="#e11d48" strokeWidth="2" />
            <path d="M95,-20 L102,-12 M95,-20 L104,-20 M95,-20 L102,-28" stroke="#e11d48" strokeWidth="2" />
            <text x="-65" y="-42" fill="#be123c" fontSize="7" fontWeight="bold">Fallopian Tube</text>
            <text x="65" y="-42" fill="#be123c" fontSize="7" fontWeight="bold">Uterine Tube</text>

            {/* Ovaries */}
            <ellipse cx="-90" cy="5" rx="14" ry="10" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
            <text x="-90" y="8" fill="#78350f" fontSize="7" fontWeight="bold" textAnchor="middle">Ovary</text>

            <ellipse cx="90" cy="5" rx="14" ry="10" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
            <text x="90" y="8" fill="#78350f" fontSize="7" fontWeight="bold" textAnchor="middle">Ovary</text>

            {/* Ovarian Ligaments */}
            <line x1="-30" y1="-10" x2="-76" y2="5" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="30" y1="-10" x2="76" y2="5" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>

          {/* Key Structures List */}
          <g transform="translate(15, 335)">
            <text x="0" y="15" fill={labelFill} fontSize="8.5" fontWeight="bold">• Ovaries: Oogenesis, Estrogen & Progesterone</text>
            <text x="0" y="30" fill={labelFill} fontSize="8.5" fontWeight="bold">• Uterine Tubes: Fertilization site (Ampulla)</text>
            <text x="0" y="45" fill={labelFill} fontSize="8.5" fontWeight="bold">• Uterus: Implantation & fetal gestation</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
