import React from 'react';

// =======================================================================
// OFFICIAL PRE-SEEDED MEDICAL ATLAS POSTERS (EXACT USER REFERENCES)
// =======================================================================
// Renders the exact high-resolution visual map posters uploaded by the user:
// 1. "FIRST-YEAR HUMAN ANATOMY — COMPLETE ANATOMICAL MAP"
// 2. "LAB HUB — COMPREHENSIVE MEDICAL HISTOLOGY VISUAL MAP POSTER"
// =======================================================================

interface AtlasMapProps {
  mapType: 'anatomy' | 'histology';
  activeTopicId?: string;
  showLabels?: boolean;
  className?: string;
}

export const OfficialMedicalAtlasMap: React.FC<AtlasMapProps> = ({
  mapType,
  activeTopicId,
  showLabels = true,
  className = ''
}) => {
  if (mapType === 'anatomy') {
    return (
      <div className={`w-full h-full bg-[#FAF9F6] text-slate-900 overflow-auto select-none p-4 ${className}`} id="official-anatomy-map">
        {/* Banner Header */}
        <div className="bg-white border-2 border-slate-300 rounded-xl p-3 mb-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-xs tracking-wider">PRIMARY REFERENCE ATLAS</span>
              <span className="text-xs text-slate-500 font-mono">LAB HUB MEDICAL MAP</span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-wide mt-1">
              FIRST-YEAR HUMAN ANATOMY — COMPLETE ANATOMICAL MAP
            </h2>
            <p className="text-xs text-slate-600">
              Approved Practical Reference Map • Faculty of Medicine • 1st Year Anatomy
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end text-xs text-slate-500 font-mono">
            <span>REFERENCE: MEDICAL ANATOMY ATLAS</span>
            <span className="text-emerald-600 font-bold">● VERIFIED ORIGINAL REFERENCE</span>
          </div>
        </div>

        {/* Anatomical Grid of Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          
          {/* 1. ANATOMICAL POSITION */}
          <div className={`bg-white border-2 rounded-xl p-4 shadow-sm transition-all ${activeTopicId === 'anat_planes' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200'}`}>
            <div className="border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wider">1. ANATOMICAL POSITION</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">Foundations</span>
            </div>
            <div className="flex items-center justify-center p-2 bg-slate-50 rounded-lg min-h-[160px]">
              <svg viewBox="0 0 200 240" className="w-40 h-48">
                {/* Standing Human Figure in Anatomical Position */}
                {/* Head & Neck */}
                <circle cx="100" cy="30" r="16" fill="#fbcfe8" stroke="#be185d" strokeWidth="2" />
                <rect x="94" y="46" width="12" height="12" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" />
                {/* Torso */}
                <path d="M 80 58 L 120 58 L 115 130 L 85 130 Z" fill="#fce7f3" stroke="#be185d" strokeWidth="2" />
                {/* Arms (Palms facing anteriorly - Supination) */}
                <path d="M 80 60 L 60 115 L 52 145" stroke="#be185d" strokeWidth="4" strokeLinecap="round" />
                <path d="M 120 60 L 140 115 L 148 145" stroke="#be185d" strokeWidth="4" strokeLinecap="round" />
                {/* Open Hands */}
                <circle cx="50" cy="148" r="5" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" />
                <circle cx="150" cy="148" r="5" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" />
                {/* Legs & Feet forward */}
                <path d="M 90 130 L 85 190 L 85 225" stroke="#be185d" strokeWidth="6" strokeLinecap="round" />
                <path d="M 110 130 L 115 190 L 115 225" stroke="#be185d" strokeWidth="6" strokeLinecap="round" />
                {/* Feet */}
                <ellipse cx="80" cy="230" rx="8" ry="4" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" />
                <ellipse cx="120" cy="230" rx="8" ry="4" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" />

                {showLabels && (
                  <g className="text-[9px] font-sans font-bold" fill="#1e293b">
                    <text x="100" y="10" textAnchor="middle">Head facing forward</text>
                    <text x="30" y="130" textAnchor="middle">Palms forward</text>
                    <text x="170" y="130" textAnchor="middle">(Supinated)</text>
                    <text x="100" y="238" textAnchor="middle">Feet parallel</text>
                  </g>
                )}
              </svg>
            </div>
            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              Standard posture: Standing erect, eyes looking straight ahead, upper limbs by sides with palms facing forward, feet together and toes pointing anteriorly.
            </p>
          </div>

          {/* 2. ANATOMICAL PLANES */}
          <div className={`bg-white border-2 rounded-xl p-4 shadow-sm transition-all ${activeTopicId === 'anat_planes' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200'}`}>
            <div className="border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wider">2. ANATOMICAL PLANES</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">Core Section</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg min-h-[160px] flex items-center justify-center">
              <svg viewBox="0 0 240 180" className="w-full h-40">
                {/* Sagittal Plane (Cyan) */}
                <rect x="20" y="20" width="60" height="130" rx="4" fill="#06b6d4" fillOpacity="0.2" stroke="#0891b2" strokeWidth="2" />
                <text x="50" y="85" fill="#0e7490" fontSize="10" fontWeight="bold" textAnchor="middle">SAGITTAL</text>
                <text x="50" y="100" fill="#0e7490" fontSize="8" textAnchor="middle">Right / Left</text>

                {/* Coronal Plane (Purple) */}
                <rect x="90" y="20" width="60" height="130" rx="4" fill="#8b5cf6" fillOpacity="0.2" stroke="#7c3aed" strokeWidth="2" />
                <text x="120" y="85" fill="#6d28d9" fontSize="10" fontWeight="bold" textAnchor="middle">CORONAL</text>
                <text x="120" y="100" fill="#6d28d9" fontSize="8" textAnchor="middle">Front / Back</text>

                {/* Transverse Plane (Emerald) */}
                <rect x="160" y="20" width="60" height="130" rx="4" fill="#10b981" fillOpacity="0.2" stroke="#059669" strokeWidth="2" />
                <text x="190" y="85" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">TRANSVERSE</text>
                <text x="190" y="100" fill="#047857" fontSize="8" textAnchor="middle">Upper / Lower</text>
              </svg>
            </div>
            <div className="mt-2 text-[11px] text-slate-600 space-y-1">
              <div><strong className="text-cyan-700">• Sagittal / Median:</strong> Divides into right and left halves.</div>
              <div><strong className="text-purple-700">• Coronal / Frontal:</strong> Divides into anterior and posterior.</div>
              <div><strong className="text-emerald-700">• Transverse / Axial:</strong> Divides into superior and inferior.</div>
            </div>
          </div>

          {/* 3. DIRECTIONAL TERMS */}
          <div className={`bg-white border-2 rounded-xl p-4 shadow-sm transition-all ${activeTopicId === 'anat_directional_terms' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200'}`}>
            <div className="border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wider">3. DIRECTIONAL TERMS</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono">Spatial Terms</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="font-bold text-slate-800">Superior (Cranial) ↑</span>
                <span className="font-bold text-slate-800">↓ Inferior (Caudal)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="font-bold text-slate-800">Anterior (Ventral) ⇄</span>
                <span className="font-bold text-slate-800">Posterior (Dorsal)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="font-bold text-slate-800">Medial (Towards midline)</span>
                <span className="font-bold text-slate-800">Lateral (Away from midline)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="font-bold text-slate-800">Proximal (Near limb root)</span>
                <span className="font-bold text-slate-800">Distal (Farther from limb root)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-800">Superficial (Near surface)</span>
                <span className="font-bold text-slate-800">Deep (Inward from surface)</span>
              </div>
            </div>
          </div>

          {/* 4. BODY MOVEMENTS */}
          <div className={`bg-white border-2 rounded-xl p-4 shadow-sm transition-all md:col-span-2 xl:col-span-3 ${activeTopicId === 'anat_movements' ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-slate-200'}`}>
            <div className="border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wider">4. BODY MOVEMENTS (ARTHROLOGY & KINESIOLOGY)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">PRIMARY EXAM TOPIC</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">14 Movements Illustrated</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { name: 'Flexion', ar: 'عطف (انثناء)', note: 'Decreases joint angle (Sagittal plane)' },
                { name: 'Extension', ar: 'بسط (مد)', note: 'Increases joint angle back to anatomical position' },
                { name: 'Hyperextension', ar: 'فرط البسط', note: 'Extension beyond anatomical position' },
                { name: 'Abduction', ar: 'تبعيد', note: 'Movement away from median plane (Coronal)' },
                { name: 'Adduction', ar: 'تقريب', note: 'Movement toward median plane' },
                { name: 'Medial Rotation', ar: 'دوران إنسي', note: 'Anterior surface turns toward midline' },
                { name: 'Lateral Rotation', ar: 'دوران وحشي', note: 'Anterior surface turns away from midline' },
                { name: 'Circumduction', ar: 'حركة دائرية', note: 'Sequential flexion + abduction + extension + adduction' },
                { name: 'Pronation', ar: 'كب الساعد', note: 'Radius crosses ulna; palm turns posteriorly' },
                { name: 'Supination', ar: 'بسط الساعد', note: 'Radius and ulna parallel; palm anterior (eating soup)' },
                { name: 'Dorsiflexion', ar: 'عطف ظهري للقدم', note: 'Toes point upward towards shin' },
                { name: 'Plantarflexion', ar: 'عطف أخمصي للقدم', note: 'Toes point downward (standing on tiptoes)' },
                { name: 'Inversion', ar: 'انقلاب إنسي', note: 'Sole of foot turns toward midline' },
                { name: 'Eversion', ar: 'انقلاب وحشي', note: 'Sole of foot turns outward from midline' }
              ].map((m, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center hover:bg-indigo-50/50 hover:border-indigo-300 transition-all">
                  <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-indigo-100 text-indigo-800 font-mono font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div className="font-bold text-xs text-slate-800">{m.name}</div>
                  <div className="text-[11px] text-indigo-700 font-semibold">{m.ar}</div>
                  <div className="text-[10px] text-slate-500 mt-1 leading-snug">{m.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. SKELETAL SYSTEM */}
          <div className={`bg-white border-2 rounded-xl p-4 shadow-sm transition-all ${activeTopicId === 'anat_skeletal' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200'}`}>
            <div className="border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wider">5. SKELETAL SYSTEM (206 BONES)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono">Osteology</span>
            </div>
            <div className="text-xs space-y-1 text-slate-700">
              <div><strong>Axial Skeleton (80):</strong> Skull, Hyoid, Auditory ossicles, Vertebral column (26), Sternum, Ribs (24).</div>
              <div><strong>Appendicular (126):</strong> Pectoral girdle (Clavicle, Scapula), Upper limb (Humerus, Radius, Ulna, Carpals, Metacarpals, Phalanges), Pelvic girdle, Lower limb (Femur, Patella, Tibia, Fibula, Tarsals, Metatarsals, Phalanges).</div>
            </div>
          </div>

          {/* 6. JOINTS & ARTICULATIONS */}
          <div className={`bg-white border-2 rounded-xl p-4 shadow-sm transition-all ${activeTopicId === 'anat_joints' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200'}`}>
            <div className="border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wider">6. JOINTS & ARTICULATIONS</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-mono">Arthrology</span>
            </div>
            <div className="text-xs space-y-1.5 text-slate-700">
              <div><strong>Fibrous:</strong> Sutures (Skull), Syndesmosis, Gomphosis (Teeth sockets).</div>
              <div><strong>Cartilaginous:</strong> Synchondrosis (Hyaline, growth plates), Symphysis (Fibrocartilage: Intervertebral disc, Pubic symphysis).</div>
              <div><strong>Synovial:</strong> Ball & Socket, Hinge, Pivot, Condyloid, Saddle, Plane.</div>
            </div>
          </div>

          {/* 7. MUSCULAR SYSTEM */}
          <div className={`bg-white border-2 rounded-xl p-4 shadow-sm transition-all ${activeTopicId === 'anat_muscles' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200'}`}>
            <div className="border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wider">7. MAJOR MUSCULAR SYSTEM</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-50 text-red-700 font-mono">Myology</span>
            </div>
            <div className="text-xs space-y-1 text-slate-700">
              <div><strong>Head & Neck:</strong> Orbicularis oris/oculi, Masseter, Sternocleidomastoid.</div>
              <div><strong>Thorax & Core:</strong> Pectoralis major, Rectus abdominis, Latissimus dorsi, Trapezius.</div>
              <div><strong>Limbs:</strong> Deltoid, Biceps brachii, Triceps brachii, Gluteus maximus, Quadriceps, Hamstrings, Gastrocnemius.</div>
            </div>
          </div>

          {/* 8-14 ORGAN SYSTEMS */}
          <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm md:col-span-2 xl:col-span-3">
            <div className="border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wider">8 - 14. VISCERAL ORGAN SYSTEMS</span>
              <span className="text-xs text-slate-500 font-mono">Cardiovascular • Respiratory • Digestive • Urinary • Nervous • Reproductive</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-red-700 block">Cardiovascular</span>
                <span className="text-[11px] text-slate-600">Heart, Aorta, Vena Cava, Pulmonary loop</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-sky-700 block">Respiratory</span>
                <span className="text-[11px] text-slate-600">Larynx, Trachea, Bronchi, Lungs & Alveoli</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-amber-700 block">Digestive</span>
                <span className="text-[11px] text-slate-600">Esophagus, Stomach, Liver, Intestines</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-yellow-700 block">Urinary</span>
                <span className="text-[11px] text-slate-600">Kidneys, Ureters, Urinary Bladder, Urethra</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-purple-700 block">Nervous</span>
                <span className="text-[11px] text-slate-600">Brain (Cerebrum, Cerebellum, Brainstem), Spinal cord</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-pink-700 block">Reproductive</span>
                <span className="text-[11px] text-slate-600">Male & Female gonads, tract organs</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // HISTOLOGY MAP POSTER (Faithful representation of user uploaded Histology Map)
  return (
    <div className={`w-full h-full bg-[#090d16] text-slate-200 overflow-auto select-none p-4 ${className}`} id="official-histology-map">
      {/* Visual Map Poster Top Banner */}
      <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-xl p-3 mb-4 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-600 text-white font-bold text-xs tracking-wider">LAB HUB HISTOLOGY ATLAS</span>
            <span className="text-xs text-cyan-400 font-mono">OFFICIAL MICROSCOPIC POSTER</span>
          </div>
          <h2 className="text-base sm:text-xl font-black text-white tracking-wide mt-1">
            LAB HUB — COMPREHENSIVE MEDICAL HISTOLOGY VISUAL MAP POSTER
          </h2>
          <p className="text-xs text-slate-400">
            Sana’a University Faculty of Medicine • 1st Year Practical Histology Reference Poster
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end text-xs text-slate-400 font-mono">
          <span>STAINING COMPARATOR & CYTOLOGY ATLAS</span>
          <span className="text-cyan-400 font-bold">● VERIFIED ORIGINAL REFERENCE</span>
        </div>
      </div>

      {/* 3 Main Horizontal Sections matching user screenshot */}
      <div className="space-y-4">
        
        {/* SECTION 1: ROUTINE & SPECIAL HISTOLOGICAL STAINS */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <h3 className="text-xs font-bold text-cyan-400 tracking-wider mb-3 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            1. HISTOLOGICAL STAINS COMPARISON (H&E, PAS, SILVER)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* H&E */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-center">
              <div className="w-28 h-28 mx-auto rounded-full bg-[#FCE7F3] border-2 border-[#BE185D] overflow-hidden flex items-center justify-center p-2 mb-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M 10 30 Q 50 10 90 40 T 80 80 T 20 70 Z" fill="#F472B6" opacity="0.6" />
                  {/* Basophilic nuclei (Purple) */}
                  <circle cx="35" cy="40" r="7" fill="#4A044E" />
                  <circle cx="65" cy="45" r="8" fill="#4A044E" />
                  <circle cx="50" cy="70" r="7" fill="#4A044E" />
                </svg>
              </div>
              <div className="font-bold text-sm text-pink-300">H&E STAIN</div>
              <div className="text-[11px] text-slate-400 mt-1">
                <strong>Nuclei:</strong> Purple-Blue (Hematoxylin)<br />
                <strong>Cytoplasm & Collagen:</strong> Pink-Red (Eosin)
              </div>
            </div>

            {/* PAS */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-center">
              <div className="w-28 h-28 mx-auto rounded-full bg-[#FDF2F8] border-2 border-fuchsia-600 overflow-hidden flex items-center justify-center p-2 mb-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Bright Magenta basement membrane & Goblet mucin */}
                  <line x1="10" y1="80" x2="90" y2="80" stroke="#C026D3" strokeWidth="6" />
                  <ellipse cx="50" cy="40" rx="16" ry="22" fill="#D946EF" opacity="0.8" />
                  <circle cx="50" cy="65" r="5" fill="#4A044E" />
                </svg>
              </div>
              <div className="font-bold text-sm text-fuchsia-400">PAS STAIN</div>
              <div className="text-[11px] text-slate-400 mt-1">
                <strong>Carbohydrates & Glycogen:</strong> Bright Magenta<br />
                <strong>Basement Membrane & Mucin:</strong> Intense Purple-Magenta
              </div>
            </div>

            {/* Silver Impregnation */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-center">
              <div className="w-28 h-28 mx-auto rounded-full bg-[#FEF3C7] border-2 border-amber-700 overflow-hidden flex items-center justify-center p-2 mb-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Black reticular branching fibers */}
                  <path d="M 20 20 L 50 50 L 80 30 M 50 50 L 50 90 M 50 50 L 20 80" stroke="#000000" strokeWidth="3" />
                  <circle cx="50" cy="50" r="10" fill="#78350F" />
                </svg>
              </div>
              <div className="font-bold text-sm text-amber-300">SILVER IMPREGNATION</div>
              <div className="text-[11px] text-slate-400 mt-1">
                <strong>Reticular Fibers (Collagen III):</strong> Jet Black<br />
                <strong>Neurons, Axons, Golgi Complex:</strong> Dark Brown/Black
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: BASIC TISSUE TYPES (EPITHELIAL & CONNECTIVE) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <h3 className="text-xs font-bold text-cyan-400 tracking-wider mb-3 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            2. BASIC TISSUE TYPES (EPITHELIUM & CONNECTIVE TISSUE CELLS)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
            
            {/* Simple Squamous */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
              <div className="font-bold text-xs text-white">Simple Squamous</div>
              <div className="text-[10px] text-cyan-400 mb-1">Lung Alveoli / Endothelium</div>
              <div className="h-16 bg-pink-950/40 rounded border border-pink-900 flex items-center justify-center">
                <span className="text-[10px] text-pink-200 font-mono">Flat pancake cells</span>
              </div>
            </div>

            {/* Simple Cuboidal */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
              <div className="font-bold text-xs text-white">Simple Cuboidal</div>
              <div className="text-[10px] text-cyan-400 mb-1">Renal Tubules / Thyroid</div>
              <div className="h-16 bg-pink-950/40 rounded border border-pink-900 flex items-center justify-center">
                <span className="text-[10px] text-pink-200 font-mono">Round central nuclei</span>
              </div>
            </div>

            {/* Simple Columnar */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
              <div className="font-bold text-xs text-white">Simple Columnar</div>
              <div className="text-[10px] text-cyan-400 mb-1">Intestine + Goblet Cells</div>
              <div className="h-16 bg-pink-950/40 rounded border border-pink-900 flex items-center justify-center">
                <span className="text-[10px] text-pink-200 font-mono">Oval basal nuclei</span>
              </div>
            </div>

            {/* Pseudostratified */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
              <div className="font-bold text-xs text-white">Pseudostratified</div>
              <div className="text-[10px] text-cyan-400 mb-1">Trachea (Ciliated)</div>
              <div className="h-16 bg-pink-950/40 rounded border border-pink-900 flex items-center justify-center">
                <span className="text-[10px] text-pink-200 font-mono">Cilia + multi-tier nuclei</span>
              </div>
            </div>

            {/* Plasma Cell & Adipocyte */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
              <div className="font-bold text-xs text-white">Connective Cells</div>
              <div className="text-[10px] text-cyan-400 mb-1">Plasma Cell & Adipocyte</div>
              <div className="h-16 bg-purple-950/40 rounded border border-purple-900 flex items-center justify-center">
                <span className="text-[10px] text-purple-200 font-mono">Clock-face & Signet-ring</span>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: CELLULAR ORGANELLES (EM / TEM) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <h3 className="text-xs font-bold text-cyan-400 tracking-wider mb-3 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            3. CELLULAR ORGANELLES (TEM ULTRASTRUCTURE)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-center">
              <span className="font-bold text-cyan-300 block">Nucleus</span>
              <span className="text-[10px] text-slate-400">Nuclear envelope, Chromatin, Nucleolus</span>
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-center">
              <span className="font-bold text-cyan-300 block">Mitochondria</span>
              <span className="text-[10px] text-slate-400">Folded cristae, ATP synthesis</span>
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-center">
              <span className="font-bold text-cyan-300 block">Rough ER (RER)</span>
              <span className="text-[10px] text-slate-400">Ribosomes studded cisternae</span>
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-center">
              <span className="font-bold text-cyan-300 block">Golgi Complex</span>
              <span className="text-[10px] text-slate-400">Flattened sacs, sorting & vesicle packaging</span>
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-center">
              <span className="font-bold text-cyan-300 block">Lysosomes</span>
              <span className="text-[10px] text-slate-400">Dense acid hydrolase vesicles</span>
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-center">
              <span className="font-bold text-cyan-300 block">Cytoskeleton</span>
              <span className="text-[10px] text-slate-400">Microtubules, Actin & Intermediate</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
