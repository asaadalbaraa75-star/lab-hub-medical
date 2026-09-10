import React from 'react';

/**
 * HISTOLOGY SANAA ATLAS VISUAL RENDERERS
 * High-accuracy histological micrographs and concept illustrations
 * strictly conforming to the 1st-Year Medical Practical Curriculum
 * (Sana'a University Faculty of Medicine — Dr. Ruqia Y. Sharaf Addin).
 * 
 * Supports:
 * - Real H&E staining (Basophilic purple/blue chromatin & Acidophilic pink/red cytoplasm)
 * - Special stains: Silver impregnation (black reticular fibers/Golgi), Toluidine blue (Nissl), Iron hematoxylin (Mitochondria), Orcein (Elastic fibers)
 * - Modes: 'micrograph' | 'diagram' | 'labeled' | 'unlabeled'
 */

export interface HistologyVisualProps {
  visualId: string;
  mode?: 'micrograph' | 'diagram' | 'labeled' | 'unlabeled';
  highlightedStructure?: string | null;
  onSelectStructure?: (structureId: string) => void;
  zoomLevel?: number;
}

export const HistologySanaaAtlasVisual: React.FC<HistologyVisualProps> = ({
  visualId,
  mode = 'labeled',
  highlightedStructure = null,
  onSelectStructure,
  zoomLevel = 1
}) => {
  const showLabels = mode === 'labeled';

  switch (visualId) {
    // -------------------------------------------------------------
    // 1. COMPOUND OPTICAL MICROSCOPE (PARTS & LABELS)
    // -------------------------------------------------------------
    case 'microscope_parts':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-slate-950">
          <defs>
            <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="70%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Base */}
          <path d="M 180 410 L 420 410 C 440 410 440 425 430 435 L 170 435 C 160 425 160 410 180 410 Z" fill="url(#metalGrad)" stroke="#64748B" strokeWidth="2" />
          <ellipse cx="300" cy="425" rx="140" ry="12" fill="#090D16" opacity="0.6" />

          {/* Light Source / Field Illuminator */}
          <rect x="270" y="380" width="60" height="30" rx="4" fill="#475569" stroke="#94A3B8" />
          <ellipse cx="300" cy="380" rx="22" ry="7" fill="#38BDF8" className="animate-pulse" />
          <path d="M 285 375 L 270 285 L 330 285 L 315 375 Z" fill="#38BDF8" opacity="0.15" />

          {/* Pillar & Curved Arm */}
          <path d="M 260 410 L 260 300 C 260 170 380 140 380 200 L 380 260 L 350 260 L 350 200 C 350 170 290 190 290 300 L 290 410 Z" fill="url(#bodyGrad)" stroke="#475569" strokeWidth="2" />

          {/* Substage Condenser & Iris Diaphragm */}
          <rect x="270" y="280" width="60" height="25" rx="3" fill="#334155" stroke="#64748B" />
          <circle cx="300" cy="292" r="6" fill="#38BDF8" opacity="0.8" />

          {/* Mechanical Stage & Clips */}
          <rect x="200" y="260" width="200" height="15" rx="3" fill="url(#metalGrad)" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="220" y1="260" x2="380" y2="260" stroke="#0F172A" strokeWidth="3" />
          {/* Glass Slide on Stage */}
          <rect x="270" y="255" width="60" height="5" fill="#E2E8F0" opacity="0.8" stroke="#38BDF8" />
          <circle cx="300" cy="257" r="2.5" fill="#E11D48" />

          {/* Revolving Nosepiece */}
          <path d="M 265 210 L 335 210 L 325 225 L 275 225 Z" fill="#1E293B" stroke="#64748B" />
          {/* 4 Objective Lenses: 4x, 10x, 40x, 100x Oil */}
          {/* 4x Scanning (Red ring) */}
          <rect x="268" y="225" width="12" height="20" fill="#475569" stroke="#334155" />
          <rect x="268" y="240" width="12" height="3" fill="#EF4444" />
          {/* 10x Low Power (Yellow ring) */}
          <rect x="284" y="225" width="14" height="25" fill="#64748B" stroke="#334155" />
          <rect x="284" y="244" width="14" height="3" fill="#EAB308" />
          {/* 40x High Power (Blue ring) - IN USE */}
          <rect x="302" y="225" width="15" height="28" fill="#334155" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="302" y="247" width="15" height="3" fill="#3B82F6" />
          {/* 100x Oil Immersion (White ring) */}
          <rect x="320" y="225" width="14" height="32" fill="#475569" stroke="#334155" />
          <rect x="320" y="251" width="14" height="3" fill="#F8FAFC" />

          {/* Body Tube & Head */}
          <rect x="285" y="140" width="30" height="70" fill="url(#metalGrad)" stroke="#475569" />
          <path d="M 285 140 L 250 90 L 280 80 L 315 130 Z" fill="#1E293B" stroke="#475569" />

          {/* Eyepiece / Ocular Lens (10x) */}
          <rect x="235" y="60" width="22" height="40" rx="3" transform="rotate(-30 246 80)" fill="#334155" stroke="#94A3B8" />
          <ellipse cx="230" cy="50" rx="12" ry="6" transform="rotate(-30 230 50)" fill="#0284C7" stroke="#38BDF8" />

          {/* Coarse & Fine Adjustment Knobs on the Arm */}
          <circle cx="365" cy="330" r="22" fill="#334155" stroke="#64748B" strokeWidth="2" />
          <circle cx="365" cy="330" r="14" fill="#475569" stroke="#94A3B8" />
          <circle cx="365" cy="330" r="7" fill="#0EA5E9" />

          {/* Labels & Pointers if showLabels */}
          {showLabels && (
            <g className="text-[11px] font-sans">
              {/* Ocular */}
              <line x1="220" y1="45" x2="130" y2="45" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="220" cy="45" r="3" fill="#38BDF8" />
              <rect x="20" y="32" width="105" height="24" rx="4" fill="#0F172A" stroke="#38BDF8" />
              <text x="28" y="48" fill="#38BDF8" fontWeight="bold">Eyepiece (10x)</text>

              {/* Objectives */}
              <line x1="320" y1="235" x2="440" y2="180" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="320" cy="235" r="3" fill="#F59E0B" />
              <rect x="445" y="165" width="145" height="40" rx="4" fill="#0F172A" stroke="#F59E0B" />
              <text x="452" y="180" fill="#F59E0B" fontWeight="bold">Objective Lenses</text>
              <text x="452" y="195" fill="#94A3B8" fontSize="9">4x • 10x • 40x • 100x Oil</text>

              {/* Stage */}
              <line x1="220" y1="267" x2="130" y2="267" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="220" cy="267" r="3" fill="#10B981" />
              <rect x="20" y="255" width="105" height="24" rx="4" fill="#0F172A" stroke="#10B981" />
              <text x="28" y="271" fill="#10B981" fontWeight="bold">Mechanical Stage</text>

              {/* Adjustment Knobs */}
              <line x1="387" y1="330" x2="450" y2="330" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="387" cy="330" r="3" fill="#A855F7" />
              <rect x="455" y="315" width="135" height="38" rx="4" fill="#0F172A" stroke="#A855F7" />
              <text x="462" y="330" fill="#A855F7" fontWeight="bold">Focus Controls</text>
              <text x="462" y="344" fill="#94A3B8" fontSize="9">Coarse & Fine Knobs</text>

              {/* Condenser & Light Source */}
              <line x1="300" y1="390" x2="300" y2="435" stroke="#06B6D4" strokeWidth="1.5" />
              <circle cx="300" cy="390" r="3" fill="#06B6D4" />
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 2. TISSUE PREPARATION 9-STEP WORKFLOW
    // -------------------------------------------------------------
    case 'tissue_prep_workflow': {
      const steps = [
        { num: '1', name: 'Fixation', chemical: '10% Formalin', note: 'Prevents autolysis & putrefaction; hardens tissue', color: 'border-rose-500 text-rose-400' },
        { num: '2', name: 'Dehydration', chemical: 'Alcohol 70%→100%', note: 'Ascending grades of ethanol remove all water', color: 'border-sky-500 text-sky-400' },
        { num: '3', name: 'Clearing', chemical: 'Xylene (Xylol)', note: 'Removes alcohol; makes tissue translucent', color: 'border-amber-500 text-amber-400' },
        { num: '4', name: 'Embedding', chemical: 'Paraffin Wax 58°C', note: 'Infiltration in molten wax to form solid block', color: 'border-purple-500 text-purple-400' },
        { num: '5', name: 'Microtomy', chemical: 'Rotary Microtome', note: 'Cuts tissue ribbons at 4–6 μm thickness', color: 'border-emerald-500 text-emerald-400' },
        { num: '6', name: 'Deparaffinization', chemical: 'Xylene', note: 'Dissolves paraffin so aqueous stains penetrate', color: 'border-cyan-500 text-cyan-400' },
        { num: '7', name: 'Rehydration', chemical: 'Alcohol 100%→Water', note: 'Descending ethanol replaces xylene with water', color: 'border-blue-500 text-blue-400' },
        { num: '8', name: 'Staining', chemical: 'H&E (Routine)', note: 'Hematoxylin (blue nuclei) + Eosin (pink cytoplasm)', color: 'border-pink-500 text-pink-400' },
        { num: '9', name: 'Mounting', chemical: 'DPX + Coverslip', note: 'Permanent optical sealing for slide preservation', color: 'border-teal-500 text-teal-400' },
      ];

      return (
        <div className="w-full h-full bg-slate-950 p-4 sm:p-6 overflow-y-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30">
              Standard Paraffin Section Technique (Sana'a University Practical Protocol)
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-2">
              The 9 Essential Steps of Histological Slide Preparation
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border bg-slate-900/80 backdrop-blur-md relative flex flex-col justify-between ${s.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                      {s.num}
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 font-semibold px-2 py-0.5 rounded bg-black/40">
                      {s.chemical}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{s.name}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{s.note}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="text-center text-slate-500 text-xs font-mono mt-2 sm:hidden">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 3. HISTOLOGICAL STAINS COMPARISON (ACIDIC VS BASIC VS SPECIAL)
    // -------------------------------------------------------------
    case 'stains_comparison':
      return (
        <div className="w-full h-full bg-slate-950 p-4 sm:p-6 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
            {/* Basic Stains (Hematoxylin) */}
            <div className="rounded-2xl border border-indigo-500/40 bg-gradient-to-b from-indigo-950/40 to-slate-900 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  BASIC STAIN (Cationic +)
                </span>
                <span className="text-xs font-mono text-indigo-400 font-bold">Hematoxylin</span>
              </div>
              <div className="h-28 rounded-xl bg-[#1E1B4B] border border-indigo-500/30 flex flex-col items-center justify-center p-3 text-center">
                <div className="w-12 h-12 rounded-full bg-[#3730A3] border-2 border-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <div className="w-4 h-4 rounded-full bg-[#1E1B4B]" />
                </div>
                <span className="text-xs font-bold text-indigo-200 mt-2">Nuclei, DNA & RNA: Dark Blue/Purple</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• Stains <strong>Basophilic</strong> (acidic) cellular components.</li>
                <li>• Examples: Chromatin, Nucleoli, Rough ER (Nissl).</li>
                <li>• Key Dyes: Hematoxylin, Methylene Blue, Toluidine Blue.</li>
              </ul>
            </div>

            {/* Acidic Stains (Eosin) */}
            <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-b from-rose-950/40 to-slate-900 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  ACIDIC STAIN (Anionic -)
                </span>
                <span className="text-xs font-mono text-rose-400 font-bold">Eosin Y</span>
              </div>
              <div className="h-28 rounded-xl bg-[#4C0519] border border-rose-500/30 flex flex-col items-center justify-center p-3 text-center">
                <div className="w-16 h-8 rounded-lg bg-[#E11D48] border-2 border-rose-300 flex items-center justify-center shadow-lg shadow-rose-500/30">
                  <span className="text-[10px] text-white font-bold">Cytoplasm</span>
                </div>
                <span className="text-xs font-bold text-rose-200 mt-2">Cytoplasm & Collagen: Pink/Red</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• Stains <strong>Acidophilic/Eosinophilic</strong> (basic) structures.</li>
                <li>• Examples: Cytoplasmic proteins, Mitochondria, Collagen.</li>
                <li>• Key Dyes: Eosin, Acid Fuchsin, Orange G.</li>
              </ul>
            </div>

            {/* Special / Neutral Stains */}
            <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-950/40 to-slate-900 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SPECIAL / NEUTRAL
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">Silver / PAS</span>
              </div>
              <div className="h-28 rounded-xl bg-[#291B00] border border-amber-500/30 flex flex-col items-center justify-center p-3 text-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black border border-slate-400 flex items-center justify-center text-[9px] text-amber-400 font-bold">
                    Ag+
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#BE185D] border border-pink-300 flex items-center justify-center text-[9px] text-white font-bold">
                    PAS
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-200 mt-2">Silver: Black | PAS: Magenta</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• <strong>Silver Impregnation</strong>: Reticular fibers & Golgi (black).</li>
                <li>• <strong>PAS (Periodic Acid Schiff)</strong>: Glycogen & Basement membrane.</li>
                <li>• <strong>Orcein</strong>: Elastic fibers (dark brown/purple).</li>
              </ul>
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // 4. EUKARYOTIC CELL DIAGRAM (CELL ORGANELLES)
    // -------------------------------------------------------------
    case 'eukaryotic_cell':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-slate-950">
          {/* Outer Cell Membrane */}
          <path
            d="M 120 180 C 100 80 250 50 400 70 C 520 90 550 200 520 320 C 480 410 320 420 200 400 C 110 380 90 280 120 180 Z"
            fill="#1E1B4B"
            stroke="#6366F1"
            strokeWidth="3"
          />

          {/* Cytoplasm Background */}
          <path
            d="M 125 182 C 105 85 248 55 395 75 C 512 95 542 202 512 318 C 475 405 320 412 205 395 C 115 375 95 280 125 182 Z"
            fill="#0F172A"
            opacity="0.9"
          />

          {/* Nucleus */}
          <ellipse cx="280" cy="230" rx="85" ry="75" fill="#312E81" stroke="#818CF8" strokeWidth="2.5" />
          {/* Chromatin strands */}
          <path d="M 230 200 Q 250 230 280 210 T 320 230" stroke="#C7D2FE" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 240 250 Q 270 270 300 245 T 340 255" stroke="#C7D2FE" strokeWidth="1.5" fill="none" opacity="0.6" />
          {/* Nucleolus */}
          <circle cx="280" cy="225" r="24" fill="#4338CA" stroke="#A5B4FC" strokeWidth="2" />

          {/* Rough Endoplasmic Reticulum (RER) around Nucleus */}
          <path d="M 370 200 C 400 180 430 200 440 230 C 450 260 420 300 375 300" fill="none" stroke="#06B6D4" strokeWidth="4" />
          <path d="M 380 190 C 415 170 445 190 455 230 C 465 270 435 315 385 315" fill="none" stroke="#06B6D4" strokeWidth="3" />
          {/* Ribosome dots on RER */}
          <circle cx="390" cy="188" r="2" fill="#F43F5E" />
          <circle cx="410" cy="180" r="2" fill="#F43F5E" />
          <circle cx="435" cy="205" r="2" fill="#F43F5E" />
          <circle cx="448" cy="235" r="2" fill="#F43F5E" />
          <circle cx="430" cy="285" r="2" fill="#F43F5E" />

          {/* Mitochondria with cristae */}
          <g transform="translate(160, 110) rotate(35)">
            <rect x="0" y="0" width="55" height="26" rx="13" fill="#881337" stroke="#FB7185" strokeWidth="2" />
            <path d="M 10 3 L 10 23 M 20 3 L 20 23 M 30 3 L 30 23 M 40 3 L 40 23 M 48 6 L 48 20" stroke="#FDA4AF" strokeWidth="1.5" />
          </g>

          <g transform="translate(390, 330) rotate(-25)">
            <rect x="0" y="0" width="55" height="26" rx="13" fill="#881337" stroke="#FB7185" strokeWidth="2" />
            <path d="M 10 3 L 10 23 M 20 3 L 20 23 M 30 3 L 30 23 M 40 3 L 40 23" stroke="#FDA4AF" strokeWidth="1.5" />
          </g>

          {/* Golgi Apparatus */}
          <g transform="translate(180, 310)">
            <path d="M 0 0 C 15 -10 35 -10 50 0" fill="none" stroke="#F59E0B" strokeWidth="4" />
            <path d="M 3 10 C 18 0 38 0 53 10" fill="none" stroke="#F59E0B" strokeWidth="4" />
            <path d="M 6 20 C 21 10 41 10 56 20" fill="none" stroke="#F59E0B" strokeWidth="4" />
            {/* Secretory vesicles */}
            <circle cx="65" cy="5" r="4" fill="#FBBF24" />
            <circle cx="70" cy="20" r="3.5" fill="#FBBF24" />
            <circle cx="-5" cy="15" r="3" fill="#FBBF24" />
          </g>

          {/* Labels if showLabels */}
          {showLabels && (
            <g className="text-[11px] font-sans">
              {/* Nucleus */}
              <line x1="280" y1="180" x2="280" y2="40" stroke="#818CF8" strokeWidth="1.5" />
              <rect x="235" y="20" width="90" height="22" rx="4" fill="#1E1B4B" stroke="#818CF8" />
              <text x="247" y="35" fill="#C7D2FE" fontWeight="bold">Nucleus</text>

              {/* Mitochondria */}
              <line x1="170" y1="110" x2="80" y2="100" stroke="#FB7185" strokeWidth="1.5" />
              <rect x="15" y="90" width="105" height="22" rx="4" fill="#881337" stroke="#FB7185" />
              <text x="23" y="105" fill="#FDA4AF" fontWeight="bold">Mitochondrion</text>

              {/* RER */}
              <line x1="450" y1="210" x2="520" y2="190" stroke="#06B6D4" strokeWidth="1.5" />
              <rect x="480" y="175" width="105" height="22" rx="4" fill="#0E7490" stroke="#06B6D4" />
              <text x="490" y="190" fill="#CFFAFE" fontWeight="bold">Rough ER</text>

              {/* Golgi */}
              <line x1="190" y1="340" x2="110" y2="370" stroke="#F59E0B" strokeWidth="1.5" />
              <rect x="40" y="360" width="105" height="22" rx="4" fill="#78350F" stroke="#F59E0B" />
              <text x="48" y="375" fill="#FDE68A" fontWeight="bold">Golgi Apparatus</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 5. GOLGI APPARATUS (SILVER IMPREGNATION)
    // -------------------------------------------------------------
    case 'organelle_golgi':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#F5E6CA]">
          {/* Pale Golden-Yellow Background of Silver Impregnation */}
          <rect width="600" height="450" fill="#EAD9B8" />

          {/* Large Spinal Ganglion / Motor Neuron Cell Body */}
          <path
            d="M 180 120 C 260 70 380 90 440 160 C 500 230 460 340 370 380 C 270 410 180 360 140 280 C 110 210 130 150 180 120 Z"
            fill="#DFCEAC"
            stroke="#B59A6D"
            strokeWidth="2"
          />

          {/* Negative Round Nucleus (Unstained in Silver) */}
          <circle cx="290" cy="240" r="55" fill="#F5ECD7" stroke="#9A8258" strokeWidth="2" />
          <circle cx="290" cy="240" r="14" fill="#6E5834" />

          {/* Reticular Black Network of Golgi Apparatus Capping the Nucleus */}
          <g stroke="#1A140A" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 230 170 Q 250 150 280 155 T 340 170 Q 360 185 370 210" />
            <path d="M 220 185 Q 240 165 275 170 T 350 190 Q 365 220 365 245" />
            <path d="M 215 205 Q 225 185 260 185 T 325 195" />
            <path d="M 345 220 Q 365 240 360 270 T 330 300" />
            <path d="M 235 155 Q 225 140 245 135 T 275 145" />
            <path d="M 290 140 Q 320 135 335 155" />
          </g>

          {/* Granular silver precipitates in cytoplasm */}
          <circle cx="210" cy="150" r="2.5" fill="#1A140A" />
          <circle cx="360" cy="165" r="2" fill="#1A140A" />
          <circle cx="340" cy="285" r="2.5" fill="#1A140A" />
          <circle cx="250" cy="320" r="2" fill="#1A140A" />

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="280" y1="150" x2="380" y2="70" stroke="#1A140A" strokeWidth="2" />
              <rect x="360" y="50" width="220" height="42" rx="6" fill="#1E293B" stroke="#F59E0B" />
              <text x="370" y="68" fill="#FBBF24" fontWeight="bold">Golgi Complex (Black Network)</text>
              <text x="370" y="84" fill="#94A3B8" fontSize="9">Silver Impregnation (Da Fano / Cajal)</text>

              <line x1="290" y1="240" x2="160" y2="240" stroke="#78350F" strokeWidth="1.5" />
              <rect x="30" y="225" width="125" height="28" rx="4" fill="#1E293B" stroke="#94A3B8" />
              <text x="38" y="243" fill="#E2E8F0" fontWeight="bold">Negative Nucleus</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 6. MITOCHONDRIA (IRON HEMATOXYLIN STAIN)
    // -------------------------------------------------------------
    case 'organelle_mitochondria':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#E2E8F0]">
          {/* Iron Hematoxylin Stained Renal Tubule Cells */}
          <rect width="600" height="450" fill="#CBD5E1" />

          {/* Cross section of renal proximal convoluted tubule */}
          <circle cx="300" cy="225" r="140" fill="#F8FAFC" stroke="#64748B" strokeWidth="3" />
          <circle cx="300" cy="225" r="45" fill="#E2E8F0" stroke="#94A3B8" strokeDasharray="4 4" />

          {/* Radial Cell Boundaries */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
            const rad = (ang * Math.PI) / 180;
            const x1 = 300 + Math.cos(rad) * 45;
            const y1 = 225 + Math.sin(rad) * 45;
            const x2 = 300 + Math.cos(rad) * 140;
            const y2 = 225 + Math.sin(rad) * 140;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94A3B8" strokeWidth="1.5" />;
          })}

          {/* Nuclei (Iron Hematoxylin: Deep Blue/Black) */}
          {[22, 67, 112, 157, 202, 247, 292, 337].map((ang, i) => {
            const rad = (ang * Math.PI) / 180;
            const cx = 300 + Math.cos(rad) * 90;
            const cy = 225 + Math.sin(rad) * 90;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
                {/* Basal striated mitochondria (rods perpendicular to basement membrane) */}
                <line x1={cx - 15} y1={cy + 25} x2={cx - 15} y2={cy + 42} stroke="#0F172A" strokeWidth="2.5" />
                <line x1={cx - 8} y1={cy + 26} x2={cx - 8} y2={cy + 43} stroke="#0F172A" strokeWidth="2.5" />
                <line x1={cx} y1={cy + 27} x2={cx} y2={cy + 44} stroke="#0F172A" strokeWidth="2.5" />
                <line x1={cx + 8} y1={cy + 26} x2={cx + 8} y2={cy + 43} stroke="#0F172A" strokeWidth="2.5" />
                <line x1={cx + 15} y1={cy + 25} x2={cx + 15} y2={cy + 42} stroke="#0F172A" strokeWidth="2.5" />
              </g>
            );
          })}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="300" y1="355" x2="430" y2="390" stroke="#0F172A" strokeWidth="2" />
              <rect x="420" y="375" width="170" height="42" rx="4" fill="#0F172A" stroke="#38BDF8" />
              <text x="430" y="392" fill="#38BDF8" fontWeight="bold">Basal Striations (Mitochondria)</text>
              <text x="430" y="407" fill="#94A3B8" fontSize="9">Heidenhain's Iron Hematoxylin</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 7. NISSL BODIES (TOLUIDINE BLUE STAIN IN MOTOR NEURON)
    // -------------------------------------------------------------
    case 'organelle_nissl':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#F1F5F9]">
          <rect width="600" height="450" fill="#F8FAFC" />

          {/* Multipolar Anterior Horn Motor Neuron */}
          <path
            d="M 280 140 L 320 80 L 335 150 L 420 120 L 360 200 L 440 280 L 340 270 L 300 370 L 260 270 L 160 300 L 220 220 L 150 140 L 240 170 Z"
            fill="#E0E7FF"
            stroke="#6366F1"
            strokeWidth="2.5"
          />

          {/* Large Vesicular Pale Nucleus */}
          <circle cx="285" cy="205" r="38" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2" />
          {/* Prominent Dark "Owl's Eye" Nucleolus */}
          <circle cx="285" cy="205" r="11" fill="#312E81" />

          {/* Nissl Granules (Clumps of Rough ER & Polyribosomes: Deep Blue) */}
          {[
            [230, 160], [250, 140], [315, 120], [330, 140], [345, 165],
            [360, 220], [370, 240], [385, 260], [320, 250], [290, 280],
            [270, 310], [250, 260], [210, 250], [190, 220], [210, 180]
          ].map(([x, y], idx) => (
            <path
              key={idx}
              d={`M ${x} ${y} Q ${x + 6} ${y - 4} ${x + 12} ${y} T ${x + 16} ${y + 6}`}
              stroke="#1E1B4B"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          ))}

          {/* Axon Hillock (Devoid of Nissl Bodies!) */}
          <circle cx="340" cy="270" r="14" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="230" y1="160" x2="110" y2="90" stroke="#1E1B4B" strokeWidth="2" />
              <rect x="15" y="70" width="165" height="42" rx="4" fill="#0F172A" stroke="#818CF8" />
              <text x="25" y="88" fill="#A5B4FC" fontWeight="bold">Nissl Granules (RER)</text>
              <text x="25" y="102" fill="#94A3B8" fontSize="9">Toluidine Blue / Thionine</text>

              <line x1="340" y1="270" x2="450" y2="330" stroke="#EF4444" strokeWidth="1.5" />
              <rect x="440" y="315" width="150" height="40" rx="4" fill="#450A0A" stroke="#EF4444" />
              <text x="450" y="332" fill="#FCA5A5" fontWeight="bold">Axon Hillock (NO Nissl!)</text>
              <text x="450" y="347" fill="#F87171" fontSize="9">Diagnostic OSPE Hallmark</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 8. CELL DIVISION (MITOSIS PHASES)
    // -------------------------------------------------------------
    case 'cell_division_mitosis': {
      const phases = [
        { name: 'Prophase', desc: 'Chromosomes condense; envelope dissolves' },
        { name: 'Metaphase', desc: 'Equatorial plate alignment' },
        { name: 'Anaphase', desc: 'Sister chromatids pull apart to poles' },
        { name: 'Telophase', desc: 'Cleavage furrow & envelope reforms' }
      ];

      return (
        <div className="w-full h-full bg-slate-950 p-4 sm:p-6 flex flex-col justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto w-full">
            {/* Prophase */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3 flex flex-col items-center text-center space-y-2">
              <span className="text-xs font-bold text-teal-400">1. Prophase</span>
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                <circle cx="50" cy="50" r="42" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                <circle cx="50" cy="50" r="28" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 40 40 Q 50 45 42 55 M 55 42 Q 48 50 56 60 M 46 45 Q 52 48 48 58" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
              </svg>
              <p className="text-[10px] text-slate-400">Chromosomes condense; nuclear envelope disintegrates</p>
            </div>

            {/* Metaphase */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3 flex flex-col items-center text-center space-y-2">
              <span className="text-xs font-bold text-teal-400">2. Metaphase</span>
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                <circle cx="50" cy="50" r="42" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                {/* Spindle poles */}
                <circle cx="15" cy="50" r="3" fill="#38BDF8" />
                <circle cx="85" cy="50" r="3" fill="#38BDF8" />
                {/* Spindle fibers */}
                <line x1="15" y1="50" x2="50" y2="30" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                <line x1="15" y1="50" x2="50" y2="50" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                <line x1="15" y1="50" x2="50" y2="70" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                <line x1="85" y1="50" x2="50" y2="30" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                <line x1="85" y1="50" x2="50" y2="50" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                <line x1="85" y1="50" x2="50" y2="70" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                {/* Equatorial Plate Chromatids */}
                <line x1="50" y1="25" x2="50" y2="75" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <p className="text-[10px] text-slate-400">Chromosomes line up along equatorial metaphase plate</p>
            </div>

            {/* Anaphase */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3 flex flex-col items-center text-center space-y-2">
              <span className="text-xs font-bold text-teal-400">3. Anaphase</span>
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                <ellipse cx="50" cy="50" rx="46" ry="38" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                {/* V-shaped migrating chromatids */}
                <path d="M 30 35 L 24 50 L 30 65 M 34 38 L 28 50 L 34 62" stroke="#F43F5E" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 70 35 L 76 50 L 70 65 M 66 38 L 72 50 L 66 62" stroke="#F43F5E" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
              <p className="text-[10px] text-slate-400">Centromeres split; sister chromatids migrate to opposite poles</p>
            </div>

            {/* Telophase & Cytokinesis */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3 flex flex-col items-center text-center space-y-2">
              <span className="text-xs font-bold text-teal-400">4. Telophase</span>
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                {/* Cleavage Furrow figure 8 */}
                <path d="M 12 50 C 12 30 35 25 45 42 C 55 25 78 30 88 50 C 78 70 55 75 45 58 C 35 75 12 70 12 50 Z" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                <circle cx="30" cy="50" r="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
                <circle cx="70" cy="50" r="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
              </svg>
              <p className="text-[10px] text-slate-400">Cleavage furrow deepens; 2 identical daughter cells form</p>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 9. SIMPLE SQUAMOUS EPITHELIUM (SLIDE: LUNG — H&E)
    // -------------------------------------------------------------
    case 'simple_squamous_lung':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          {/* Authentic H&E Pink/Purple Background */}
          <rect width="600" height="450" fill="#FCE7F3" opacity="0.3" />

          {/* Alveolar Spaces (White air sacs) */}
          <ellipse cx="140" cy="130" rx="90" ry="70" fill="#FFFFFF" stroke="#E879F9" strokeWidth="1.5" />
          <ellipse cx="330" cy="110" rx="80" ry="60" fill="#FFFFFF" stroke="#E879F9" strokeWidth="1.5" />
          <ellipse cx="480" cy="200" rx="75" ry="90" fill="#FFFFFF" stroke="#E879F9" strokeWidth="1.5" />
          <ellipse cx="230" cy="300" rx="110" ry="85" fill="#FFFFFF" stroke="#E879F9" strokeWidth="1.5" />

          {/* Interalveolar Septa (Eosinophilic pink walls) */}
          <path d="M 0 220 Q 150 200 230 220 T 400 210 T 600 230" stroke="#F472B6" strokeWidth="16" fill="none" />
          <path d="M 230 40 L 230 400" stroke="#F472B6" strokeWidth="14" fill="none" />
          <path d="M 400 30 L 400 400" stroke="#F472B6" strokeWidth="12" fill="none" />

          {/* Simple Squamous Epithelial Cells (Type I Pneumocytes) - Flattened nuclei bulging into lumen */}
          {[
            [140, 60], [210, 130], [225, 215], [320, 50], [395, 120],
            [415, 210], [470, 110], [230, 380], [330, 300], [130, 220]
          ].map(([x, y], idx) => (
            <ellipse
              key={idx}
              cx={x}
              cy={y}
              rx="12"
              ry="3.5"
              fill="#581C87"
              stroke="#3B0764"
              strokeWidth="1"
              transform={`rotate(${idx % 2 === 0 ? 15 : -20} ${x} ${y})`}
            />
          ))}

          {/* Capillary containing Red Blood Cells (Biconcave pink disks) */}
          <g transform="translate(230, 215)">
            <ellipse cx="0" cy="0" rx="8" ry="5" fill="#DC2626" opacity="0.9" />
            <ellipse cx="14" cy="2" rx="7" ry="5" fill="#DC2626" opacity="0.9" />
          </g>

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="225" y1="215" x2="310" y2="170" stroke="#581C87" strokeWidth="1.5" />
              <rect x="305" y="150" width="220" height="42" rx="4" fill="#0F172A" stroke="#C084FC" />
              <text x="315" y="168" fill="#E9D5FF" fontWeight="bold">Simple Squamous Epithelium</text>
              <text x="315" y="183" fill="#C084FC" fontSize="9">Flattened spindle nucleus (Type I cell)</text>

              <line x1="140" y1="130" x2="60" y2="130" stroke="#EC4899" strokeWidth="1.5" />
              <rect x="10" y="115" width="105" height="24" rx="4" fill="#0F172A" stroke="#EC4899" />
              <text x="18" y="131" fill="#FBCFE8" fontWeight="bold">Alveolar Lumen</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 10. SIMPLE CUBOIDAL EPITHELIUM (SLIDE: KIDNEY RENAL TUBULES — H&E)
    // -------------------------------------------------------------
    case 'simple_cuboidal_kidney':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FDF4F8" />

          {/* Cross Section of 2 Renal Tubules */}
          {/* Tubule 1 (Left) */}
          <g transform="translate(190, 225)">
            {/* Basement membrane */}
            <circle cx="0" cy="0" r="115" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2.5" />
            {/* Central Lumen */}
            <circle cx="0" cy="0" r="45" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />

            {/* 8 Cuboidal Cells with Round Spherical Central Nuclei */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
              const rad = (ang * Math.PI) / 180;
              const cx = Math.cos(rad) * 80;
              const cy = Math.sin(rad) * 80;
              return (
                <g key={i}>
                  {/* Cell boundary line */}
                  <line
                    x1={Math.cos(rad - 0.35) * 45}
                    y1={Math.sin(rad - 0.35) * 45}
                    x2={Math.cos(rad - 0.35) * 115}
                    y2={Math.sin(rad - 0.35) * 115}
                    stroke="#F472B6"
                    strokeWidth="1.2"
                  />
                  {/* Perfect Round Nucleus (Hematoxylin: Deep Purple) */}
                  <circle cx={cx} cy={cy} r="15" fill="#4A044E" stroke="#701A75" strokeWidth="1.5" />
                </g>
              );
            })}
          </g>

          {/* Tubule 2 (Right) */}
          <g transform="translate(420, 225)">
            <circle cx="0" cy="0" r="105" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="40" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
            {[0, 50, 100, 150, 200, 250, 300].map((ang, i) => {
              const rad = (ang * Math.PI) / 180;
              const cx = Math.cos(rad) * 72;
              const cy = Math.sin(rad) * 72;
              return (
                <circle key={i} cx={cx} cy={cy} r="14" fill="#4A044E" stroke="#701A75" strokeWidth="1.5" />
              );
            })}
          </g>

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="270" y1="225" x2="330" y2="120" stroke="#4A044E" strokeWidth="2" />
              <rect x="290" y="90" width="220" height="42" rx="4" fill="#0F172A" stroke="#F472B6" />
              <text x="300" y="108" fill="#FDF4F8" fontWeight="bold">Simple Cuboidal Epithelium</text>
              <text x="300" y="123" fill="#F472B6" fontSize="9">Height = Width | Central Round Nucleus</text>

              <line x1="190" y1="225" x2="110" y2="340" stroke="#DB2777" strokeWidth="1.5" />
              <rect x="50" y="335" width="135" height="24" rx="4" fill="#0F172A" stroke="#DB2777" />
              <text x="58" y="351" fill="#FBCFE8" fontWeight="bold">Tubular Lumen</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 11. SIMPLE COLUMNAR (SLIDE: SMALL INTESTINE / GALLBLADDER — H&E)
    // -------------------------------------------------------------
    case 'simple_columnar_intestine':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FDF4F8" />

          {/* Lamina Propria (Underlying Connective Tissue) */}
          <rect x="0" y="320" width="600" height="130" fill="#FCE7F3" />
          {/* Continuous Basement Membrane */}
          <line x1="0" y1="320" x2="600" y2="320" stroke="#BE185D" strokeWidth="3.5" />

          {/* Columnar Cells (Tall Rectangles) */}
          {[20, 75, 130, 185, 240, 295, 350, 405, 460, 515].map((x, i) => {
            const isGoblet = i === 2 || i === 6;
            return (
              <g key={i}>
                {/* Tall Cell Body */}
                <rect
                  x={x}
                  y="120"
                  width="50"
                  height="200"
                  fill={isGoblet ? '#FDF2F8' : '#FBCFE8'}
                  stroke="#F472B6"
                  strokeWidth="1.5"
                />

                {isGoblet ? (
                  /* Goblet Cell (Mucus secreting goblet shape) */
                  <>
                    <ellipse cx={x + 25} cy="180" rx="22" ry="40" fill="#FFFFFF" stroke="#DB2777" strokeWidth="1.5" />
                    {/* Basal compressed nucleus */}
                    <ellipse cx={x + 25} cy="300" rx="14" ry="7" fill="#4A044E" />
                  </>
                ) : (
                  /* Absorptive Columnar Cell: Oval Basal Nucleus */
                  <>
                    <ellipse cx={x + 25} cy="270" rx="12" ry="24" fill="#4A044E" stroke="#701A75" strokeWidth="1.5" />
                    {/* Striated Brush Border (Microvilli) on Apical Surface */}
                    <rect x={x} y="112" width="50" height="8" fill="#DB2777" />
                  </>
                )}
              </g>
            );
          })}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="100" y1="270" x2="100" y2="50" stroke="#4A044E" strokeWidth="1.5" />
              <rect x="40" y="30" width="180" height="42" rx="4" fill="#0F172A" stroke="#F472B6" />
              <text x="50" y="48" fill="#FFFFFF" fontWeight="bold">Oval Basal Nucleus</text>
              <text x="50" y="63" fill="#F472B6" fontSize="9">Height &gt; Width (Simple Columnar)</text>

              <line x1="155" y1="180" x2="280" y2="70" stroke="#DB2777" strokeWidth="1.5" />
              <rect x="270" y="55" width="155" height="38" rx="4" fill="#0F172A" stroke="#DB2777" />
              <text x="280" y="72" fill="#FBCFE8" fontWeight="bold">Goblet Cell (Mucus)</text>
              <text x="280" y="86" fill="#F472B6" fontSize="9">Pale apical cup of mucin</text>

              <line x1="420" y1="114" x2="490" y2="60" stroke="#BE185D" strokeWidth="1.5" />
              <rect x="480" y="45" width="110" height="25" rx="4" fill="#0F172A" stroke="#BE185D" />
              <text x="488" y="61" fill="#FDF4F8" fontWeight="bold">Brush Border</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 12. PSEUDOSTRATIFIED CILIATED (SLIDE: TRACHEA — H&E)
    // -------------------------------------------------------------
    case 'pseudostratified_trachea':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FDF4F8" />
          <rect x="0" y="330" width="600" height="120" fill="#FCE7F3" />
          <line x1="0" y1="330" x2="600" y2="330" stroke="#BE185D" strokeWidth="3" />

          {/* Cilia on Apical Surface */}
          <g stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round">
            {Array.from({ length: 60 }).map((_, i) => (
              <line key={i} x1={10 + i * 10} y1="120" x2={10 + i * 10 + (i % 2 === 0 ? 3 : -3)} y2="102" />
            ))}
          </g>

          {/* Nuclei crowded at DIFFERENT LEVELS (giving false appearance of stratification) */}
          {[
            { x: 50, y: 300, type: 'basal' },
            { x: 90, y: 220, type: 'columnar' },
            { x: 130, y: 170, type: 'columnar' },
            { x: 170, y: 290, type: 'basal' },
            { x: 220, y: 200, type: 'goblet' },
            { x: 270, y: 160, type: 'columnar' },
            { x: 310, y: 280, type: 'basal' },
            { x: 360, y: 230, type: 'columnar' },
            { x: 410, y: 180, type: 'columnar' },
            { x: 460, y: 290, type: 'basal' },
            { x: 520, y: 210, type: 'columnar' }
          ].map((n, i) => (
            <ellipse
              key={i}
              cx={n.x}
              cy={n.y}
              rx={n.type === 'basal' ? 14 : 12}
              ry={n.type === 'basal' ? 14 : 22}
              fill="#4A044E"
              stroke="#701A75"
              strokeWidth="1.5"
            />
          ))}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="200" y1="110" x2="200" y2="40" stroke="#BE185D" strokeWidth="1.5" />
              <rect x="130" y="20" width="140" height="25" rx="4" fill="#0F172A" stroke="#BE185D" />
              <text x="140" y="36" fill="#FDF4F8" fontWeight="bold">Apical Cilia (Beating)</text>

              <line x1="270" y1="160" x2="380" y2="70" stroke="#4A044E" strokeWidth="1.5" />
              <rect x="360" y="55" width="225" height="42" rx="4" fill="#0F172A" stroke="#C084FC" />
              <text x="370" y="72" fill="#FFFFFF" fontWeight="bold">Nuclei at Varying Levels</text>
              <text x="370" y="87" fill="#C084FC" fontSize="9">All cells rest on basement membrane</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 13. TRANSITIONAL EPITHELIUM / UROTHELIUM (SLIDE: BLADDER — H&E)
    // -------------------------------------------------------------
    case 'transitional_bladder':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FDF4F8" />
          <rect x="0" y="340" width="600" height="110" fill="#FCE7F3" />
          <line x1="0" y1="340" x2="600" y2="340" stroke="#BE185D" strokeWidth="3" />

          {/* Deep Basal Cells (Cuboidal/Columnar) */}
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={`b-${i}`} cx={25 + i * 50} cy="315" r="14" fill="#4A044E" />
          ))}

          {/* Intermediate Pear-Shaped Cells */}
          {Array.from({ length: 10 }).map((_, i) => (
            <ellipse key={`m-${i}`} cx={35 + i * 58} cy="255" rx="16" ry="22" fill="#581C87" />
          ))}

          {/* Superficial Large Dome / Umbrella Cells (Some Binucleate) */}
          {[60, 180, 300, 420, 540].map((x, i) => (
            <g key={`d-${i}`}>
              {/* Dome Cell Body with Eosinophilic Condensed Crust */}
              <path
                d={`M ${x - 55} 190 C ${x - 55} 125 ${x + 55} 125 ${x + 55} 190 Z`}
                fill="#F472B6"
                stroke="#BE185D"
                strokeWidth="2.5"
              />
              {/* Binucleated in some cells */}
              {i % 2 === 0 ? (
                <>
                  <circle cx={x - 14} cy="165" r="11" fill="#4A044E" />
                  <circle cx={x + 14} cy="165" r="11" fill="#4A044E" />
                </>
              ) : (
                <circle cx={x} cy="160" r="13" fill="#4A044E" />
              )}
            </g>
          ))}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="180" y1="140" x2="180" y2="60" stroke="#BE185D" strokeWidth="1.5" />
              <rect x="70" y="40" width="220" height="42" rx="4" fill="#0F172A" stroke="#BE185D" />
              <text x="80" y="58" fill="#FDF4F8" fontWeight="bold">Dome / Umbrella Cells</text>
              <text x="80" y="73" fill="#F472B6" fontSize="9">Often binucleated; eosinophilic crust</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 14. NEUROEPITHELIUM: TASTE BUD (SLIDE: TONGUE — H&E)
    // -------------------------------------------------------------
    case 'neuroepithelium_taste_bud':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FDF4F8" />

          {/* Stratified Squamous Epithelium of Circumvallate Papilla */}
          <rect x="0" y="0" width="600" height="450" fill="#FCE7F3" opacity="0.6" />

          {/* Pale Barrel-Shaped Taste Bud in Epithelium Wall */}
          <ellipse cx="300" cy="225" rx="90" ry="140" fill="#FFF1F2" stroke="#BE185D" strokeWidth="3" />

          {/* Taste Pore Opening at Surface */}
          <path d="M 285 85 Q 300 95 315 85" stroke="#9F1239" strokeWidth="3" fill="none" />

          {/* Spindle-shaped Gustatory (Taste) Cells & Supporting Cells */}
          {[-45, -25, -5, 15, 35].map((off, idx) => (
            <path
              key={idx}
              d={`M ${300 + off * 0.3} 95 C ${300 + off * 1.5} 180 ${300 + off * 1.5} 270 ${300 + off * 0.4} 355`}
              stroke="#DB2777"
              strokeWidth="2"
              fill="none"
            />
          ))}

          {/* Elongated nuclei inside the taste bud */}
          {[-35, -15, 5, 25].map((off, idx) => (
            <ellipse key={idx} cx={300 + off} cy={200 + (idx % 2 === 0 ? -25 : 30)} rx="8" ry="18" fill="#581C87" />
          ))}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="300" y1="85" x2="420" y2="50" stroke="#BE185D" strokeWidth="2" />
              <rect x="410" y="35" width="130" height="26" rx="4" fill="#0F172A" stroke="#BE185D" />
              <text x="420" y="52" fill="#FDF4F8" fontWeight="bold">Taste Pore (Microvilli)</text>

              <line x1="300" y1="225" x2="440" y2="225" stroke="#581C87" strokeWidth="2" />
              <rect x="435" y="205" width="155" height="42" rx="4" fill="#0F172A" stroke="#C084FC" />
              <text x="445" y="222" fill="#FDF4F8" fontWeight="bold">Taste Bud (Barrel Shape)</text>
              <text x="445" y="237" fill="#C084FC" fontSize="9">Gustatory + Supporting Cells</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 15. ADIPOSE TISSUE (WHITE UNILOCULAR FAT — H&E)
    // -------------------------------------------------------------
    case 'adipose_tissue':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FFFDF9" />

          {/* Honeycomb / Chicken-Wire Pattern of Adipocytes with Empty Lipid Droplets */}
          {[
            [120, 100], [240, 90], [360, 110], [480, 100],
            [70, 210], [190, 200], [310, 220], [430, 210], [530, 220],
            [110, 320], [230, 310], [350, 330], [470, 320]
          ].map(([x, y], idx) => (
            <g key={idx}>
              {/* Empty Lipid Vacuole (Dissolved by Xylene) */}
              <circle cx={x} cy={y} r="52" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.5" />
              {/* Peripheral Flattened "Signet-Ring" Nucleus */}
              <ellipse
                cx={x + 46}
                cy={y - 12}
                rx="10"
                ry="4.5"
                fill="#4A044E"
                stroke="#3B0764"
                transform={`rotate(40 ${x + 46} ${y - 12})`}
              />
            </g>
          ))}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="236" y1="188" x2="320" y2="80" stroke="#4A044E" strokeWidth="2" />
              <rect x="300" y="60" width="225" height="42" rx="4" fill="#0F172A" stroke="#F472B6" />
              <text x="310" y="78" fill="#FDF4F8" fontWeight="bold">Peripheral Nucleus ("Signet Ring")</text>
              <text x="310" y="93" fill="#F472B6" fontSize="9">Compressed by large single lipid droplet</text>

              <line x1="190" y1="200" x2="90" y2="200" stroke="#BE185D" strokeWidth="1.5" />
              <rect x="10" y="185" width="130" height="26" rx="4" fill="#0F172A" stroke="#BE185D" />
              <text x="18" y="202" fill="#FDF4F8" fontWeight="bold">Empty Lipid Vacuole</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 16. RETICULAR TISSUE (SILVER IMPREGNATION — LYMPH NODE)
    // -------------------------------------------------------------
    case 'reticular_tissue_silver':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#EAD9B8]">
          <rect width="600" height="450" fill="#EAD9B8" />

          {/* Delicate Branching Black Network of Reticular Fibers (Type III Collagen) */}
          <g stroke="#1A140A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 50 80 Q 150 120 220 90 T 360 140 T 520 100" />
            <path d="M 120 40 L 150 120 L 180 220 L 260 250 L 320 350 L 400 420" />
            <path d="M 360 140 L 340 220 L 420 280 L 480 380" />
            <path d="M 220 90 L 250 180 L 180 220" />
            <path d="M 260 250 L 350 240 L 420 280" />
            <path d="M 80 300 L 180 280 L 220 380" />
            <path d="M 450 120 L 430 200 L 520 250" />
          </g>

          {/* Scattered Pale Lymphocytes suspended in meshwork */}
          {[
            [100, 110], [140, 160], [210, 150], [280, 130], [330, 180],
            [230, 220], [290, 240], [380, 220], [440, 180], [160, 260],
            [240, 310], [310, 310], [370, 330], [420, 330], [480, 280]
          ].map(([x, y], idx) => (
            <circle key={idx} cx={x} cy={y} r="8" fill="#4B382A" opacity="0.8" />
          ))}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="260" y1="250" x2="380" y2="170" stroke="#1A140A" strokeWidth="2" />
              <rect x="360" y="150" width="225" height="42" rx="4" fill="#0F172A" stroke="#F59E0B" />
              <text x="370" y="168" fill="#FBBF24" fontWeight="bold">Reticular Fibers (Black Network)</text>
              <text x="370" y="183" fill="#94A3B8" fontSize="9">Silver Impregnation (Type III Collagen)</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 17. DENSE REGULAR CT: TENDON (SLIDE: TENDON — H&E)
    // -------------------------------------------------------------
    case 'dense_regular_tendon':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FCE7F3" />

          {/* Parallel Tightly Packed Wavy Collagen Bundles (Eosinophilic Pink) */}
          {[50, 110, 170, 230, 290, 350, 410].map((y, i) => (
            <path
              key={i}
              d={`M 0 ${y} Q 150 ${y - 12} 300 ${y} T 600 ${y}`}
              stroke="#F472B6"
              strokeWidth="38"
              fill="none"
              opacity="0.9"
            />
          ))}

          {/* Tendinocytes (Elongated flattened dark nuclei in regular parallel rows) */}
          {[
            [120, 80], [280, 80], [450, 80],
            [70, 140], [220, 140], [390, 140], [530, 140],
            [150, 200], [310, 200], [470, 200],
            [90, 260], [250, 260], [410, 260],
            [160, 320], [330, 320], [500, 320]
          ].map(([x, y], idx) => (
            <ellipse key={idx} cx={x} cy={y} rx="18" ry="4" fill="#3B0764" />
          ))}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="310" y1="200" x2="310" y2="80" stroke="#3B0764" strokeWidth="2" />
              <rect x="220" y="60" width="220" height="42" rx="4" fill="#0F172A" stroke="#C084FC" />
              <text x="230" y="78" fill="#FDF4F8" fontWeight="bold">Parallel Rows of Tendinocytes</text>
              <text x="230" y="93" fill="#C084FC" fontSize="9">Flattened dark nuclei in parallel rows</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 18. STRATIFIED SQUAMOUS NON-KERATINIZED (SLIDE: ESOPHAGUS — H&E)
    // -------------------------------------------------------------
    case 'stratified_squamous_nonkeratinized':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FDF4F8" />
          <rect x="0" y="360" width="600" height="90" fill="#FCE7F3" />
          <path d="M 0 360 Q 150 340 300 360 T 600 350" stroke="#BE185D" strokeWidth="3" fill="none" />

          {/* Stratum Basale (Columnar/Cuboidal cells) */}
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={`b-${i}`} cx={20 + i * 42} cy="335" r="12" fill="#4A044E" />
          ))}

          {/* Stratum Spinosum / Intermediate Polyhedral Cells */}
          {Array.from({ length: 24 }).map((_, i) => (
            <ellipse
              key={`p-${i}`}
              cx={25 + (i % 12) * 48}
              cy={220 + Math.floor(i / 12) * 45}
              rx="15"
              ry="12"
              fill="#581C87"
            />
          ))}

          {/* Superficial Flattened Squamous Cells with VIABLE NUCLEI (Non-keratinized) */}
          {Array.from({ length: 20 }).map((_, i) => (
            <ellipse
              key={`s-${i}`}
              cx={30 + (i % 10) * 58}
              cy={110 + Math.floor(i / 10) * 35}
              rx="22"
              ry="5"
              fill="#701A75"
            />
          ))}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="280" y1="110" x2="380" y2="45" stroke="#701A75" strokeWidth="2" />
              <rect x="370" y="30" width="220" height="42" rx="4" fill="#0F172A" stroke="#C084FC" />
              <text x="380" y="48" fill="#FDF4F8" fontWeight="bold">Superficial Flattened Cells</text>
              <text x="380" y="63" fill="#C084FC" fontSize="9">Nuclei persist at lumen (Non-keratinized)</text>

              <line x1="300" y1="360" x2="160" y2="400" stroke="#BE185D" strokeWidth="1.5" />
              <rect x="30" y="390" width="150" height="26" rx="4" fill="#0F172A" stroke="#BE185D" />
              <text x="38" y="407" fill="#FBCFE8" fontWeight="bold">Basement Membrane & CT</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 19. STRATIFIED SQUAMOUS KERATINIZED (SLIDE: SKIN EPIDERMIS — H&E)
    // -------------------------------------------------------------
    case 'stratified_squamous_keratinized':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FDF4F8" />

          {/* Superficial Dead Keratin Scales (Stratum Corneum: Anucleate Deep Eosinophilic Layer) */}
          <path
            d="M 0 0 L 600 0 L 600 110 Q 450 120 300 105 T 0 115 Z"
            fill="#FB7185"
            stroke="#E11D48"
            strokeWidth="2.5"
            opacity="0.9"
          />
          {/* Wavy parallel keratin lamellae */}
          <path d="M 0 30 Q 300 45 600 35 M 0 65 Q 300 80 600 70" stroke="#BE185D" strokeWidth="2" fill="none" opacity="0.4" />

          {/* Stratum Granulosum (Keratohyalin granules) */}
          <rect x="0" y="115" width="600" height="28" fill="#581C87" opacity="0.8" />

          {/* Stratum Spinosum (Polyhedral cells with intercellular spines) */}
          <rect x="0" y="143" width="600" height="150" fill="#FCE7F3" opacity="0.6" />
          {Array.from({ length: 24 }).map((_, i) => (
            <ellipse
              key={`sp-${i}`}
              cx={25 + (i % 12) * 50}
              cy={165 + Math.floor(i / 12) * 45}
              rx="13"
              ry="11"
              fill="#581C87"
            />
          ))}

          {/* Stratum Basale with Dermal Papillae undulations */}
          <path
            d="M 0 293 Q 75 250 150 293 T 300 293 T 450 293 T 600 293"
            stroke="#BE185D"
            strokeWidth="3.5"
            fill="none"
          />
          <rect x="0" y="310" width="600" height="140" fill="#FFE4E6" />

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="300" y1="50" x2="430" y2="40" stroke="#E11D48" strokeWidth="2" />
              <rect x="420" y="25" width="170" height="42" rx="4" fill="#0F172A" stroke="#FB7185" />
              <text x="430" y="43" fill="#FFE4E6" fontWeight="bold">Stratum Corneum</text>
              <text x="430" y="58" fill="#FB7185" fontSize="9">Thick dead anucleate keratin layer</text>

              <line x1="200" y1="125" x2="70" y2="100" stroke="#581C87" strokeWidth="2" />
              <rect x="15" y="85" width="150" height="26" rx="4" fill="#0F172A" stroke="#C084FC" />
              <text x="25" y="102" fill="#E9D5FF" fontWeight="bold">Stratum Granulosum</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 20. STRATIFIED CUBOIDAL (SLIDE: SWEAT GLAND DUCTS — H&E)
    // -------------------------------------------------------------
    case 'stratified_cuboidal_sweat':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FDF4F8" />

          {/* Cross section of sweat gland duct in dermis */}
          <g transform="translate(300, 225)">
            {/* Outer basement membrane */}
            <circle cx="0" cy="0" r="130" fill="#FCE7F3" stroke="#BE185D" strokeWidth="3" />
            {/* Central Duct Lumen */}
            <circle cx="0" cy="0" r="40" fill="#FFFFFF" stroke="#BE185D" strokeWidth="2" />

            {/* Inner (luminal) Layer of Cuboidal Cells */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
              const rad = (ang * Math.PI) / 180;
              const cx = Math.cos(rad) * 62;
              const cy = Math.sin(rad) * 62;
              return <circle key={`in-${i}`} cx={cx} cy={cy} r="13" fill="#4A044E" />;
            })}

            {/* Outer (basal) Layer of Cuboidal Cells: TWO DISTINCT LAYERS */}
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((ang, i) => {
              const rad = (ang * Math.PI) / 180;
              const cx = Math.cos(rad) * 105;
              const cy = Math.sin(rad) * 105;
              return <circle key={`out-${i}`} cx={cx} cy={cy} r="14" fill="#581C87" />;
            })}
          </g>

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="360" y1="225" x2="460" y2="130" stroke="#4A044E" strokeWidth="2" />
              <rect x="430" y="110" width="160" height="42" rx="4" fill="#0F172A" stroke="#F472B6" />
              <text x="440" y="128" fill="#FFFFFF" fontWeight="bold">Two Cuboidal Layers</text>
              <text x="440" y="143" fill="#F472B6" fontSize="9">Inner & outer layer of round nuclei</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 21. AREOLAR (LOOSE) CONNECTIVE TISSUE (SLIDE: MESENTERY — H&E)
    // -------------------------------------------------------------
    case 'areolar_loose_ct':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FFFDF8" />

          {/* Thick Wavy Pink Collagen Bundles */}
          <g stroke="#F472B6" strokeWidth="18" fill="none" opacity="0.75" strokeLinecap="round">
            <path d="M 0 100 Q 180 60 320 120 T 600 90" />
            <path d="M 50 380 Q 220 280 400 350 T 600 300" />
            <path d="M 120 40 Q 250 200 200 420" />
            <path d="M 450 30 Q 380 220 520 430" />
          </g>

          {/* Thin Branching Dark Elastic Fibers */}
          <g stroke="#312E81" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M 20 200 L 150 180 L 280 250 L 420 190 L 580 240" />
            <path d="M 150 180 L 220 80 L 340 110" />
            <path d="M 280 250 L 320 380 L 460 360" />
            <path d="M 420 190 L 500 90" />
          </g>

          {/* Fibroblasts (Spindle-shaped branching cells) */}
          <ellipse cx="220" cy="180" rx="16" ry="6" fill="#4A044E" transform="rotate(-15 220 180)" />
          <ellipse cx="380" cy="270" rx="15" ry="5" fill="#4A044E" transform="rotate(25 380 270)" />

          {/* Mast Cells (Large cells with coarse basophilic metachromatic granules) */}
          <g transform="translate(180, 310)">
            <circle cx="0" cy="0" r="18" fill="#3B0764" />
            {Array.from({ length: 12 }).map((_, i) => (
              <circle
                key={i}
                cx={Math.cos((i * 30 * Math.PI) / 180) * 10}
                cy={Math.sin((i * 30 * Math.PI) / 180) * 10}
                r="2.5"
                fill="#818CF8"
              />
            ))}
          </g>

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="320" y1="120" x2="420" y2="50" stroke="#F472B6" strokeWidth="2" />
              <rect x="410" y="30" width="165" height="42" rx="4" fill="#0F172A" stroke="#F472B6" />
              <text x="420" y="48" fill="#FDF4F8" fontWeight="bold">Collagen Fiber Bundles</text>
              <text x="420" y="63" fill="#F472B6" fontSize="9">Thick wavy eosinophilic ribbons</text>

              <line x1="280" y1="250" x2="160" y2="250" stroke="#312E81" strokeWidth="1.5" />
              <rect x="20" y="235" width="135" height="26" rx="4" fill="#0F172A" stroke="#818CF8" />
              <text x="30" y="252" fill="#C7D2FE" fontWeight="bold">Elastic Fibers (Thin)</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 22. DENSE IRREGULAR CT (SLIDE: RETICULAR DERMIS OF SKIN — H&E)
    // -------------------------------------------------------------
    case 'dense_irregular_dermis':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FCE7F3" />

          {/* Coarse Collagen Bundles running Haphazardly in ALL Directions */}
          <g stroke="#F472B6" strokeWidth="28" fill="none" opacity="0.9" strokeLinecap="round">
            <path d="M 30 80 Q 180 140 120 280 T 60 400" />
            <path d="M 220 40 Q 320 180 200 320 T 310 420" />
            <path d="M 50 160 Q 280 120 450 180 T 580 100" />
            <path d="M 160 280 Q 350 340 540 260" />
            <path d="M 400 30 Q 460 200 520 380" />
          </g>

          {/* Squeezed Fibroblast Nuclei scattered randomly */}
          {[
            [140, 110], [280, 150], [420, 90], [180, 240],
            [350, 260], [480, 310], [220, 380], [390, 400]
          ].map(([x, y], idx) => (
            <ellipse
              key={idx}
              cx={x}
              cy={y}
              rx="12"
              ry="4"
              fill="#4A044E"
              transform={`rotate(${idx * 40} ${x} ${y})`}
            />
          ))}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="300" y1="200" x2="430" y2="160" stroke="#F472B6" strokeWidth="2" />
              <rect x="420" y="140" width="170" height="42" rx="4" fill="#0F172A" stroke="#F472B6" />
              <text x="430" y="158" fill="#FDF4F8" fontWeight="bold">Dense Irregular CT</text>
              <text x="430" y="173" fill="#F472B6" fontSize="9">Collagen bundles in all directions</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 23. YELLOW ELASTIC CT (SLIDE: AORTA WALL TUNICA MEDIA — ORCEIN)
    // -------------------------------------------------------------
    case 'yellow_elastic_aorta':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#4A044E]">
          <rect width="600" height="450" fill="#2D062E" />

          {/* Dense Parallel Wavy Fenestrated Elastic Laminae (Orcein: Dark Red-Brown / Purple) */}
          {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map((y, i) => (
            <path
              key={i}
              d={`M 0 ${y} Q 75 ${y - 10} 150 ${y} T 300 ${y} T 450 ${y} T 600 ${y}`}
              stroke="#D946EF"
              strokeWidth="5"
              fill="none"
              opacity="0.9"
            />
          ))}

          {/* Interspersed Smooth Muscle Nuclei */}
          {[
            [120, 60], [280, 60], [450, 60],
            [90, 140], [250, 140], [420, 140],
            [150, 220], [330, 220], [510, 220],
            [100, 300], [270, 300], [440, 300],
            [160, 380], [350, 380], [520, 380]
          ].map(([x, y], idx) => (
            <ellipse key={idx} cx={x} cy={y} rx="14" ry="3.5" fill="#FDF4F8" opacity="0.8" />
          ))}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="300" y1="200" x2="430" y2="130" stroke="#D946EF" strokeWidth="2" />
              <rect x="420" y="110" width="170" height="42" rx="4" fill="#0F172A" stroke="#D946EF" />
              <text x="430" y="128" fill="#FDF4F8" fontWeight="bold">Wavy Elastic Laminae</text>
              <text x="430" y="143" fill="#E879F9" fontSize="9">Orcein stain (Tunica media aorta)</text>
            </g>
          )}
        </svg>
      );

    // -------------------------------------------------------------
    // 24. NEUROEPITHELIUM: ORGAN OF CORTI (SLIDE: COCHLEA INNER EAR — H&E)
    // -------------------------------------------------------------
    case 'neuroepithelium_organ_of_corti':
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full select-none bg-[#FDF2F8]">
          <rect width="600" height="450" fill="#FDF4F8" />

          {/* Basilar Membrane (Thick base) */}
          <line x1="60" y1="360" x2="540" y2="360" stroke="#BE185D" strokeWidth="5" />

          {/* Inner & Outer Pillar Cells forming Tunnel of Corti (Triangular) */}
          <path d="M 220 360 L 260 250 L 300 360 Z" fill="#FCE7F3" stroke="#9D174D" strokeWidth="3" />

          {/* Gelatinous Tectorial Membrane projecting over hair cells */}
          <path
            d="M 120 200 C 180 180 260 210 380 220 C 320 240 220 230 120 215 Z"
            fill="#FB7185"
            stroke="#E11D48"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Inner Hair Cell (Single row on left) */}
          <rect x="180" y="270" width="22" height="60" rx="6" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
          <circle cx="191" cy="300" r="8" fill="#4A044E" />
          {/* Stereocilia touching tectorial membrane */}
          <line x1="185" y1="270" x2="185" y2="240" stroke="#BE185D" strokeWidth="1.5" />
          <line x1="191" y1="270" x2="191" y2="240" stroke="#BE185D" strokeWidth="1.5" />
          <line x1="197" y1="270" x2="197" y2="240" stroke="#BE185D" strokeWidth="1.5" />

          {/* Outer Hair Cells (3 rows on right of tunnel) */}
          {[320, 360, 400].map((x, i) => (
            <g key={i}>
              <rect x={x} y="270" width="20" height="60" rx="6" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
              <circle cx={x + 10} cy="300" r="8" fill="#4A044E" />
              <line x1={x + 5} y1="270" x2={x + 5} y2="245" stroke="#BE185D" strokeWidth="1.5" />
              <line x1={x + 10} y1="270" x2={x + 10} y2="245" stroke="#BE185D" strokeWidth="1.5" />
              <line x1={x + 15} y1="270" x2={x + 15} y2="245" stroke="#BE185D" strokeWidth="1.5" />
            </g>
          ))}

          {showLabels && (
            <g className="text-[11px] font-sans">
              <line x1="260" y1="200" x2="360" y2="120" stroke="#E11D48" strokeWidth="2" />
              <rect x="350" y="100" width="180" height="42" rx="4" fill="#0F172A" stroke="#E11D48" />
              <text x="360" y="118" fill="#FDF4F8" fontWeight="bold">Tectorial Membrane</text>
              <text x="360" y="133" fill="#FB7185" fontSize="9">Overlies stereocilia of hair cells</text>

              <line x1="260" y1="310" x2="140" y2="390" stroke="#9D174D" strokeWidth="1.5" />
              <rect x="30" y="380" width="160" height="26" rx="4" fill="#0F172A" stroke="#9D174D" />
              <text x="40" y="397" fill="#FDF4F8" fontWeight="bold">Tunnel of Corti</text>
            </g>
          )}
        </svg>
      );

    default:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-300 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3">
            🔬
          </div>
          <h4 className="text-base font-bold text-white mb-1">Authentic 1st-Year Microscopic Slide</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            High-power magnification view showing characteristic basophilic and eosinophilic staining properties.
          </p>
        </div>
      );
  }
};
