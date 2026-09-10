import React from 'react';
import { HISTOLOGY_FIRST_YEAR_TOPICS, HistologyTissueDetail } from './VisualMapData';

interface HistologyProps {
  theme?: 'light' | 'dark';
  onSelectTissue?: (tissue: HistologyTissueDetail) => void;
  filterCategory?: string;
}

export const HistologyMicrographCard: React.FC<{
  tissue: HistologyTissueDetail;
  theme?: 'light' | 'dark';
  onClick?: () => void;
}> = ({ tissue, theme = 'light', onClick }) => {
  const isDark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-xl border p-4 transition-all duration-200 cursor-pointer flex flex-col ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 hover:border-sky-500 hover:bg-slate-800/80'
          : 'bg-white border-slate-200 hover:border-sky-500 hover:shadow-md'
      }`}
    >
      {/* Category Pill & Stain Badge */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            tissue.category === 'Epithelium'
              ? 'bg-cyan-500/10 text-cyan-500'
              : tissue.category === 'Connective Tissue'
              ? 'bg-amber-500/10 text-amber-500'
              : tissue.category === 'Cartilage'
              ? 'bg-purple-500/10 text-purple-500'
              : tissue.category === 'Bone'
              ? 'bg-emerald-500/10 text-emerald-500'
              : tissue.category === 'Blood'
              ? 'bg-rose-500/10 text-rose-500'
              : tissue.category === 'Muscle'
              ? 'bg-red-500/10 text-red-500'
              : tissue.category === 'Nervous Tissue'
              ? 'bg-indigo-500/10 text-indigo-500'
              : 'bg-teal-500/10 text-teal-500'
          }`}
        >
          {tissue.category}
        </span>
        <span className="text-[10px] font-medium text-slate-400">
          {tissue.stain}
        </span>
      </div>

      {/* Micrograph Viewport (Realistic Microscopic Field) */}
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-950 flex items-center justify-center mb-3">
        {/* Microscopic Lens Bezel & Scale */}
        <div className="absolute top-1.5 left-2 z-10 text-[9px] font-mono text-slate-400 bg-black/60 px-1.5 py-0.5 rounded">
          400x H&E
        </div>
        <div className="absolute bottom-1.5 right-2 z-10 text-[9px] font-mono text-slate-300 bg-black/60 px-1.5 py-0.5 rounded flex items-center gap-1">
          <div className="w-5 h-[2px] bg-white"></div>
          <span>20 μm</span>
        </div>

        {/* Custom High-Definition SVG Histological Micrograph */}
        <HistologySvgRenderer tissueId={tissue.id} />
      </div>

      {/* Tissue Title & Key Clue */}
      <h3 className={`text-sm font-bold leading-tight mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {tissue.name}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
        {tissue.diagnosticClue}
      </p>

      {/* Characteristic Feature Highlight */}
      <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
        <span className="text-sky-600 dark:text-sky-400 font-semibold group-hover:underline">
          View Histological Criteria →
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// HISTOLOGY HIGH-FIDELITY SVG MICROGRAPHS
// =========================================================================
export const HistologySvgRenderer: React.FC<{ tissueId: string }> = ({ tissueId }) => {
  switch (tissueId) {
    // -------------------------------------------------------------
    // 1. SIMPLE SQUAMOUS EPITHELIUM
    // Monolayer of attenuated cells, bulging central spindle nuclei, clear vascular lumen
    // -------------------------------------------------------------
    case 'simple_squamous':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Background Serous / Vascular Lumen */}
          <rect width="240" height="180" fill="#fdf2f8" />
          {/* Capillary / Serosa cross-section */}
          <ellipse cx="120" cy="90" rx="95" ry="60" fill="#ffffff" stroke="#fda4af" strokeWidth="1" />
          {/* Basement Membrane line */}
          <ellipse cx="120" cy="90" rx="95" ry="60" fill="none" stroke="#be123c" strokeWidth="2" strokeDasharray="3,1" />

          {/* Attenuated squamous cells with bulging oval spindle nuclei */}
          {[
            { cx: 55, cy: 65, rx: 14, ry: 4, rot: -30 },
            { cx: 120, cy: 30, rx: 16, ry: 4.5, rot: 0 },
            { cx: 185, cy: 65, rx: 14, ry: 4, rot: 30 },
            { cx: 205, cy: 105, rx: 12, ry: 4.5, rot: 75 },
            { cx: 175, cy: 138, rx: 15, ry: 4, rot: -25 },
            { cx: 120, cy: 150, rx: 16, ry: 4.5, rot: 0 },
            { cx: 65, cy: 138, rx: 15, ry: 4, rot: 25 },
            { cx: 35, cy: 105, rx: 12, ry: 4.5, rot: -75 }
          ].map((n, i) => (
            <g key={i}>
              {/* Cytoplasmic attenuation */}
              <ellipse cx={n.cx} cy={n.cy} rx={n.rx + 6} ry={n.ry + 3} fill="#f43f5e" opacity="0.4" transform={`rotate(${n.rot}, ${n.cx}, ${n.cy})`} />
              {/* Bulging dark basophilic nucleus */}
              <ellipse cx={n.cx} cy={n.cy} rx={n.rx} ry={n.ry} fill="#4c0519" transform={`rotate(${n.rot}, ${n.cx}, ${n.cy})`} />
            </g>
          ))}
          {/* Inside lumen: a few red blood cells */}
          <ellipse cx="105" cy="85" rx="7" ry="5" fill="#f43f5e" opacity="0.8" />
          <ellipse cx="135" cy="95" rx="7" ry="5" fill="#f43f5e" opacity="0.8" />
          <text x="120" y="92" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">Vascular Lumen</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 2. SIMPLE CUBOIDAL EPITHELIUM
    // Renal tubules / thyroid follicles with central spherical nuclei
    // -------------------------------------------------------------
    case 'simple_cuboidal':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Interstitial stroma */}
          <rect width="240" height="180" fill="#fce7f3" />

          {/* Central Tubule / Follicle with Colloid */}
          <circle cx="120" cy="90" r="70" fill="#fdf2f8" stroke="#be123c" strokeWidth="2" />
          <circle cx="120" cy="90" r="42" fill="#f472b6" opacity="0.45" />
          <text x="120" y="93" textAnchor="middle" fill="#831843" fontSize="8" fontWeight="bold">Lumen (Colloid)</text>

          {/* Cube-shaped cells arranged in ring with round central nuclei */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 120 + Math.cos(rad) * 56;
            const cy = 90 + Math.sin(rad) * 56;
            return (
              <g key={i}>
                {/* Radial cell boundary */}
                <line
                  x1={120 + Math.cos(rad - 0.25) * 42}
                  y1={90 + Math.sin(rad - 0.25) * 42}
                  x2={120 + Math.cos(rad - 0.25) * 70}
                  y2={90 + Math.sin(rad - 0.25) * 70}
                  stroke="#be123c"
                  strokeWidth="1"
                  opacity="0.5"
                />
                {/* Perfectly round central basophilic nucleus */}
                <circle cx={cx} cy={cy} r="6.5" fill="#4a044e" />
                <circle cx={cx - 1.5} cy={cy - 1.5} r="1.5" fill="#e879f9" opacity="0.6" />
              </g>
            );
          })}
        </svg>
      );

    // -------------------------------------------------------------
    // 3. SIMPLE COLUMNAR EPITHELIUM
    // Tall cells with basal oval nuclei, apical brush border, goblet cells
    // -------------------------------------------------------------
    case 'simple_columnar':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Lamina propria background */}
          <rect width="240" height="180" fill="#fdf2f8" />
          <rect x="0" y="130" width="240" height="50" fill="#fbcfe8" />
          {/* Basement Membrane */}
          <line x1="0" y1="130" x2="240" y2="130" stroke="#be123c" strokeWidth="2.5" />
          <text x="120" y="155" textAnchor="middle" fill="#9d174d" fontSize="8" fontWeight="bold">Lamina Propria</text>

          {/* Apical Brush Border (Microvilli striated border) */}
          <rect x="0" y="46" width="240" height="6" fill="#f43f5e" opacity="0.8" />
          <text x="120" y="38" textAnchor="middle" fill="#9d174d" fontSize="8" fontWeight="bold">Intestinal Lumen (Apical Brush Border)</text>

          {/* Tall Columnar Cells with aligned basal oval nuclei */}
          {[12, 34, 56, 78, 100, 122, 144, 166, 188, 210].map((x, i) => {
            const isGoblet = i === 3 || i === 7;
            return (
              <g key={i}>
                {/* Columnar Cell Cytoplasm */}
                <rect x={x} y="52" width="20" height="78" fill={isGoblet ? '#fae8ff' : '#f472b6'} opacity={isGoblet ? 0.9 : 0.6} stroke="#be123c" strokeWidth="1" />
                {isGoblet ? (
                  /* Goblet Cell: mucus cup + flat basal nucleus */
                  <g>
                    <ellipse cx={x + 10} cy="78" rx="8" ry="16" fill="#ffffff" stroke="#c084fc" strokeWidth="1" />
                    <ellipse cx={x + 10} cy="120" rx="7" ry="4" fill="#3b0764" />
                  </g>
                ) : (
                  /* Normal Columnar: Basal oval nucleus */
                  <ellipse cx={x + 10} cy="108" rx="6" ry="12" fill="#4a044e" />
                )}
              </g>
            );
          })}
        </svg>
      );

    // -------------------------------------------------------------
    // 4. STRATIFIED SQUAMOUS EPITHELIUM
    // Basal cuboidal, prickle cells, superficial flattened non-keratinized / keratinized
    // -------------------------------------------------------------
    case 'stratified_squamous':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Submucosa / Dermis */}
          <rect width="240" height="180" fill="#fbcfe8" />
          {/* Basement Membrane with dermal papillae waves */}
          <path d="M0,140 Q40,115 80,140 Q120,165 160,140 Q200,115 240,140 L240,180 L0,180 Z" fill="#f472b6" opacity="0.4" stroke="#9f1239" strokeWidth="2" />

          {/* Stratum Basale (Dark proliferating basal cells) */}
          {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230].map((x, i) => (
            <circle key={i} cx={x} cy={135 - (i % 2 === 0 ? 5 : -5)} r="5" fill="#4c0519" />
          ))}

          {/* Stratum Spinosum (Polyhedral prickle cells) */}
          {[20, 45, 75, 105, 135, 165, 195, 220].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="105" r="5.5" fill="#701a75" />
              <circle cx={x + 12} cy="85" r="5" fill="#701a75" />
            </g>
          ))}

          {/* Stratum Corneum / Surface Flattened Squamous Layer */}
          <rect x="0" y="30" width="240" height="28" fill="#fda4af" opacity="0.8" />
          {[15, 45, 75, 105, 135, 165, 195, 225].map((x, i) => (
            <ellipse key={i} cx={x} cy="44" rx="14" ry="2.5" fill="#581c87" />
          ))}
          <text x="120" y="22" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">Surface Squamous Cells (Flattened)</text>
          <text x="120" y="165" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">Connective Tissue Papillae</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 5. PSEUDOSTRATIFIED CILIATED COLUMNAR EPITHELIUM
    // Staggered multilevel nuclei, all touch BM, apical cilia, goblet cells
    // -------------------------------------------------------------
    case 'pseudostratified_columnar':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#fdf2f8" />
          {/* Basement Membrane */}
          <line x1="0" y1="140" x2="240" y2="140" stroke="#be123c" strokeWidth="2.5" />
          <text x="120" y="160" textAnchor="middle" fill="#9d174d" fontSize="8" fontWeight="bold">Thick Basement Membrane</text>

          {/* Hair-like Cilia along Apical Border */}
          <line x1="0" y1="45" x2="240" y2="45" stroke="#be123c" strokeWidth="1.5" />
          {[...Array(48)].map((_, i) => (
            <line key={i} x1={i * 5} y1="45" x2={i * 5 + 2} y2="32" stroke="#e11d48" strokeWidth="1.2" strokeLinecap="round" />
          ))}
          <text x="120" y="24" textAnchor="middle" fill="#e11d48" fontSize="8" fontWeight="bold">Motile Cilia Carpet (Trachea)</text>

          {/* Staggered Multilevel Nuclei (appearing stratified, but all contact BM) */}
          {[
            { x: 20, y: 125, r: 6 },
            { x: 38, y: 70, r: 7 },
            { x: 55, y: 105, r: 6.5 },
            { x: 75, y: 128, r: 6 },
            { x: 95, y: 68, r: 7 },
            { x: 115, y: 110, r: 6.5 },
            { x: 135, y: 125, r: 6 },
            { x: 155, y: 72, r: 7 },
            { x: 175, y: 105, r: 6.5 },
            { x: 195, y: 128, r: 6 },
            { x: 215, y: 70, r: 7 }
          ].map((n, i) => (
            <g key={i}>
              <line x1={n.x} y1="45" x2={n.x} y2="140" stroke="#fda4af" strokeWidth="1" strokeDasharray="3,2" />
              <ellipse cx={n.x} cy={n.y} rx={n.r} ry={n.r + 2} fill="#3b0764" />
            </g>
          ))}
        </svg>
      );

    // -------------------------------------------------------------
    // 6. TRANSITIONAL EPITHELIUM (UROTHELIUM)
    // Dome / Umbrella cells on surface, scalloped border, binucleated
    // -------------------------------------------------------------
    case 'transitional_epithelium':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#fdf2f8" />
          {/* Lamina propria */}
          <rect x="0" y="140" width="240" height="40" fill="#fbcfe8" />
          <line x1="0" y1="140" x2="240" y2="140" stroke="#be123c" strokeWidth="2" />
          <text x="120" y="160" textAnchor="middle" fill="#9d174d" fontSize="8" fontWeight="bold">Lamina Propria</text>

          {/* Intermediate Pear-shaped cells */}
          {[20, 50, 80, 110, 140, 170, 200].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="115" r="7" fill="#6b21a8" />
              <circle cx={x + 15} cy="90" r="7" fill="#6b21a8" />
            </g>
          ))}

          {/* Large Dome / Umbrella Cells with Scalloped Free Border */}
          {[
            { cx: 35, binuc: false },
            { cx: 85, binuc: true },
            { cx: 140, binuc: false },
            { cx: 195, binuc: true }
          ].map((d, i) => (
            <g key={i}>
              <path
                d={`M${d.cx - 25},65 Q${d.cx},35 ${d.cx + 25},65 L${d.cx + 25},75 L${d.cx - 25},75 Z`}
                fill="#f472b6"
                stroke="#be123c"
                strokeWidth="1.5"
              />
              {d.binuc ? (
                /* Binucleated dome cell */
                <g>
                  <circle cx={d.cx - 6} cy="55" r="5" fill="#3b0764" />
                  <circle cx={d.cx + 6} cy="55" r="5" fill="#3b0764" />
                </g>
              ) : (
                <circle cx={d.cx} cy="55" r="6" fill="#3b0764" />
              )}
            </g>
          ))}
          <text x="120" y="24" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">Urinary Lumen (Umbrella Cells)</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 7. LOOSE (AREOLAR) CONNECTIVE TISSUE
    // Pink wavy collagen, thin dark branching elastic fibers, fibroblasts, mast cells
    // -------------------------------------------------------------
    case 'loose_connective':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Ground substance */}
          <rect width="240" height="180" fill="#fdf2f8" />

          {/* Broad Wavy Pink Collagen Bundles */}
          <path d="M-10,30 Q60,60 120,30 T250,50" fill="none" stroke="#f472b6" strokeWidth="8" opacity="0.65" />
          <path d="M-10,120 Q50,90 130,130 T250,110" fill="none" stroke="#f472b6" strokeWidth="9" opacity="0.65" />
          <path d="M40,-10 Q80,90 40,190" fill="none" stroke="#f472b6" strokeWidth="7" opacity="0.65" />
          <path d="M180,-10 Q140,80 190,190" fill="none" stroke="#f472b6" strokeWidth="8" opacity="0.65" />

          {/* Thin, Dark Branching Elastic Fibers */}
          <path d="M10,20 L110,80 L220,60" fill="none" stroke="#1e1b4b" strokeWidth="1.5" />
          <path d="M110,80 L80,150 L180,165" fill="none" stroke="#1e1b4b" strokeWidth="1.5" />
          <path d="M170,30 L230,120" fill="none" stroke="#1e1b4b" strokeWidth="1.5" />

          {/* Fibroblast Spindle Nuclei */}
          <ellipse cx="65" cy="45" rx="9" ry="3" fill="#4a044e" transform="rotate(15, 65, 45)" />
          <ellipse cx="145" cy="115" rx="10" ry="3" fill="#4a044e" transform="rotate(-20, 145, 115)" />
          <ellipse cx="190" cy="55" rx="8" ry="3" fill="#4a044e" />

          {/* Mast Cell with coarse dark violet metachromatic granules */}
          <ellipse cx="110" cy="95" rx="14" ry="11" fill="#701a75" opacity="0.9" />
          <text x="110" y="98" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">Mast</text>

          <text x="120" y="16" textAnchor="middle" fill="#831843" fontSize="8" fontWeight="bold">Areolar Network: Collagen + Elastic Fibers</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 8. DENSE CONNECTIVE TISSUE
    // Dense regular tendon: tightly packed parallel wavy collagen ribbons with compressed nuclei
    // -------------------------------------------------------------
    case 'dense_connective':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#fdf2f8" />

          {/* Dense parallel wavy collagen fiber bundles */}
          {[15, 35, 55, 75, 95, 115, 135, 155].map((y, i) => (
            <path
              key={i}
              d={`M-10,${y} Q40,${y + 8} 90,${y} Q140,${y - 8} 190,${y} T250,${y}`}
              fill="none"
              stroke="#fb7185"
              strokeWidth="16"
              opacity="0.8"
            />
          ))}

          {/* Linear Rows of Compressed Flat Fibroblast (Tendinocyte) Nuclei */}
          {[45, 85, 125].map((y, row) => (
            <g key={row}>
              {[30, 80, 130, 180].map((x, col) => (
                <ellipse key={col} cx={x} cy={y} rx="12" ry="2" fill="#3b0764" />
              ))}
            </g>
          ))}
          <text x="120" y="18" textAnchor="middle" fill="#881337" fontSize="8" fontWeight="bold">Dense Regular Tendon: Parallel Collagen & Tendinocytes</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 9. ADIPOSE TISSUE
    // Honeycomb meshwork of empty lipid droplets, compressed peripheral "signet-ring" nuclei
    // -------------------------------------------------------------
    case 'adipose_tissue':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Honeycomb lattice background */}
          <rect width="240" height="180" fill="#fdf2f8" />

          {/* Adipocytes: Large clear round cells with thin pink cytoplasmic rims */}
          {[
            { cx: 40, cy: 40, r: 26, nx: 62, ny: 40 },
            { cx: 95, cy: 35, r: 28, nx: 120, ny: 32 },
            { cx: 155, cy: 38, r: 27, nx: 178, ny: 42 },
            { cx: 205, cy: 45, r: 24, nx: 224, ny: 40 },

            { cx: 40, cy: 95, r: 27, nx: 20, ny: 90 },
            { cx: 98, cy: 95, r: 29, nx: 122, ny: 90 },
            { cx: 160, cy: 95, r: 28, nx: 182, ny: 100 },
            { cx: 210, cy: 100, r: 24, nx: 228, ny: 95 },

            { cx: 45, cy: 150, r: 26, nx: 65, ny: 155 },
            { cx: 105, cy: 152, r: 28, nx: 128, ny: 152 },
            { cx: 165, cy: 150, r: 27, nx: 145, ny: 165 }
          ].map((c, i) => (
            <g key={i}>
              <circle cx={c.cx} cy={c.cy} r={c.r} fill="#ffffff" stroke="#fda4af" strokeWidth="1.5" />
              {/* Peripheral Flattened Signet-Ring Nucleus */}
              <ellipse cx={c.nx} cy={c.ny} rx="6" ry="2.5" fill="#4a044e" transform={`rotate(40, ${c.nx}, ${c.ny})`} />
            </g>
          ))}
          <text x="120" y="16" textAnchor="middle" fill="#881337" fontSize="8" fontWeight="bold">Honeycomb Lattice: Lipid Vacuoles & Peripheral Nuclei</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 10. HYALINE CARTILAGE
    // Glassy basophilic matrix, isogenous nests of 2-4 chondrocytes in lacunae
    // -------------------------------------------------------------
    case 'hyaline_cartilage':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Glassy basophilic matrix */}
          <rect width="240" height="180" fill="#ede9fe" />

          {/* Outer Perichondrium on top */}
          <rect x="0" y="0" width="240" height="24" fill="#f472b6" opacity="0.6" />
          <line x1="0" y1="24" x2="240" y2="24" stroke="#be123c" strokeWidth="1.5" />
          <text x="120" y="16" textAnchor="middle" fill="#831843" fontSize="8" fontWeight="bold">Perichondrium (Vascular Fibrous Layer)</text>

          {/* Isogenous groups of chondrocytes in lacunae */}
          {[
            { cx: 50, cy: 65, count: 2 },
            { cx: 130, cy: 60, count: 4 },
            { cx: 200, cy: 75, count: 2 },
            { cx: 80, cy: 120, count: 3 },
            { cx: 165, cy: 125, count: 2 },
            { cx: 120, cy: 155, count: 2 }
          ].map((grp, i) => (
            <g key={i}>
              {/* Darker basophilic territorial matrix ring */}
              <ellipse cx={grp.cx} cy={grp.cy} rx="24" ry="18" fill="#c4b5fd" opacity="0.7" />
              {/* Lacunae containing chondrocytes */}
              {grp.count === 2 && (
                <g>
                  <circle cx={grp.cx - 7} cy={grp.cy} r="6" fill="#ffffff" stroke="#7c3aed" strokeWidth="1" />
                  <circle cx={grp.cx - 7} cy={grp.cy} r="3.5" fill="#4c1d95" />
                  <circle cx={grp.cx + 7} cy={grp.cy} r="6" fill="#ffffff" stroke="#7c3aed" strokeWidth="1" />
                  <circle cx={grp.cx + 7} cy={grp.cy} r="3.5" fill="#4c1d95" />
                </g>
              )}
              {grp.count === 3 && (
                <g>
                  <circle cx={grp.cx - 6} cy={grp.cy - 4} r="5.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="1" />
                  <circle cx={grp.cx - 6} cy={grp.cy - 4} r="3" fill="#4c1d95" />
                  <circle cx={grp.cx + 6} cy={grp.cy - 4} r="5.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="1" />
                  <circle cx={grp.cx + 6} cy={grp.cy - 4} r="3" fill="#4c1d95" />
                  <circle cx={grp.cx} cy={grp.cy + 6} r="5.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="1" />
                  <circle cx={grp.cx} cy={grp.cy + 6} r="3" fill="#4c1d95" />
                </g>
              )}
              {grp.count === 4 && (
                <g>
                  <circle cx={grp.cx - 6} cy={grp.cy - 5} r="5" fill="#ffffff" stroke="#7c3aed" strokeWidth="1" />
                  <circle cx={grp.cx - 6} cy={grp.cy - 5} r="3" fill="#4c1d95" />
                  <circle cx={grp.cx + 6} cy={grp.cy - 5} r="5" fill="#ffffff" stroke="#7c3aed" strokeWidth="1" />
                  <circle cx={grp.cx + 6} cy={grp.cy - 5} r="3" fill="#4c1d95" />
                  <circle cx={grp.cx - 6} cy={grp.cy + 5} r="5" fill="#ffffff" stroke="#7c3aed" strokeWidth="1" />
                  <circle cx={grp.cx - 6} cy={grp.cy + 5} r="3" fill="#4c1d95" />
                  <circle cx={grp.cx + 6} cy={grp.cy + 5} r="5" fill="#ffffff" stroke="#7c3aed" strokeWidth="1" />
                  <circle cx={grp.cx + 6} cy={grp.cy + 5} r="3" fill="#4c1d95" />
                </g>
              )}
            </g>
          ))}
          <text x="120" y="174" textAnchor="middle" fill="#4c1d95" fontSize="8" fontWeight="bold">Glassy Matrix & Isogenous Groups in Lacunae</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 11. ELASTIC CARTILAGE
    // Dense dark network of branching elastic fibers enclosing chondrocytes
    // -------------------------------------------------------------
    case 'elastic_cartilage':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#fdf4ff" />

          {/* Dense meshwork of dark orcein/elastic fibers */}
          {[20, 40, 60, 80, 100, 120, 140, 160].map((y, i) => (
            <path
              key={i}
              d={`M-10,${y} C50,${y + 15} 90,${y - 15} 140,${y + 10} S210,${y - 10} 250,${y}`}
              fill="none"
              stroke="#581c87"
              strokeWidth="2.5"
              opacity="0.8"
            />
          ))}

          {/* Closely packed Chondrocytes in Lacunae */}
          {[
            { cx: 45, cy: 50 },
            { cx: 90, cy: 60 },
            { cx: 145, cy: 50 },
            { cx: 195, cy: 65 },
            { cx: 65, cy: 110 },
            { cx: 120, cy: 105 },
            { cx: 175, cy: 115 },
            { cx: 105, cy: 150 }
          ].map((c, i) => (
            <g key={i}>
              <circle cx={c.cx} cy={c.cy} r="10" fill="#ffffff" stroke="#701a75" strokeWidth="1.5" />
              <circle cx={c.cx} cy={c.cy} r="5" fill="#3b0764" />
            </g>
          ))}
          <text x="120" y="16" textAnchor="middle" fill="#3b0764" fontSize="8" fontWeight="bold">Dense Dark Elastic Network (Auricle & Epiglottis)</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 12. FIBROCARTILAGE
    // Alternating single-file rows of chondrocytes between thick collagen bundles, NO perichondrium
    // -------------------------------------------------------------
    case 'fibrocartilage':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#fdf2f8" />

          {/* Thick parallel pink collagen bundles */}
          {[25, 65, 105, 145].map((y, i) => (
            <rect key={i} x="0" y={y - 12} width="240" height="22" fill="#fb7185" opacity="0.65" />
          ))}

          {/* Linear Single-File Rows of Chondrocytes in Lacunae */}
          {[45, 85, 125].map((y, row) => (
            <g key={row}>
              {[35, 75, 115, 155, 195].map((x, col) => (
                <g key={col}>
                  <ellipse cx={x} cy={y} rx="8" ry="6" fill="#ffffff" stroke="#9f1239" strokeWidth="1" />
                  <circle cx={x} cy={y} r="3.5" fill="#4c0519" />
                </g>
              ))}
            </g>
          ))}
          <text x="120" y="16" textAnchor="middle" fill="#881337" fontSize="8" fontWeight="bold">Linear Rows of Chondrocytes • Type I Collagen • No Perichondrium</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 13. COMPACT BONE (GROUND BONE / OSTEONS)
    // Haversian canal, concentric lamellae, osteocyte lacunae, radiating canaliculi
    // -------------------------------------------------------------
    case 'compact_bone':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#e2e8f0" />

          {/* Complete Central Osteon (Haversian System) */}
          <g transform="translate(120, 90)">
            {/* Concentric Lamellae rings */}
            {[25, 42, 58, 72].map((r, i) => (
              <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4,2" />
            ))}

            {/* Central Haversian Canal */}
            <circle cx="0" cy="0" r="14" fill="#0f172a" />
            <circle cx="-3" cy="-3" r="3" fill="#e11d48" />
            <circle cx="3" cy="3" r="3" fill="#0284c7" />

            {/* Osteocyte Lacunae on rings with radiating spider-leg canaliculi */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = Math.cos(rad) * 42;
              const y1 = Math.sin(rad) * 42;
              const x2 = Math.cos(rad + 0.3) * 58;
              const y2 = Math.sin(rad + 0.3) * 58;
              return (
                <g key={i}>
                  {/* Radiating canaliculi micro-lines */}
                  <line x1={x1 - 4} y1={y1} x2={x1 + 4} y2={y1} stroke="#334155" strokeWidth="0.8" />
                  <line x1={x1} y1={y1 - 4} x2={x1} y2={y1 + 4} stroke="#334155" strokeWidth="0.8" />
                  <ellipse cx={x1} cy={y1} rx="4.5" ry="2" fill="#1e293b" transform={`rotate(${deg}, ${x1}, ${y1})`} />

                  <ellipse cx={x2} cy={y2} rx="4.5" ry="2" fill="#1e293b" transform={`rotate(${deg + 20}, ${x2}, ${y2})`} />
                </g>
              );
            })}
          </g>
          <text x="120" y="18" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">Haversian Canal • Concentric Lamellae • Osteocytes</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 14. SPONGY BONE
    // Branching pink bony trabeculae with osteocytes, red bone marrow cavity
    // -------------------------------------------------------------
    case 'spongy_bone':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Red Bone Marrow Space filled with hematopoietic cells */}
          <rect width="240" height="180" fill="#fecdd3" />
          {[...Array(60)].map((_, i) => (
            <circle key={i} cx={(i * 19) % 240} cy={(i * 13) % 180} r="2.5" fill="#9f1239" opacity="0.7" />
          ))}

          {/* Branching Anastomosing Pink Bony Trabeculae */}
          <path
            d="M-10,40 Q60,30 90,80 Q120,130 70,190 L110,190 Q150,110 130,70 Q110,30 250,20 L250,50 Q160,60 180,120 Q200,160 250,170 L250,190 Q170,180 150,130 Q130,80 80,50 Z"
            fill="#fb7185"
            stroke="#e11d48"
            strokeWidth="2"
          />

          {/* Osteocytes embedded inside trabeculae */}
          {[
            { x: 30, y: 38 },
            { x: 85, y: 55 },
            { x: 105, y: 100 },
            { x: 80, y: 145 },
            { x: 165, y: 50 },
            { x: 190, y: 110 }
          ].map((pt, i) => (
            <ellipse key={i} cx={pt.x} cy={pt.y} rx="4" ry="2" fill="#4c0519" />
          ))}

          {/* Osteoblasts lining the trabecular surface */}
          {[20, 45, 70, 95, 120, 150].map((x, i) => (
            <circle key={i} cx={x} cy={32} r="2" fill="#0284c7" />
          ))}

          <text x="120" y="16" textAnchor="middle" fill="#881337" fontSize="8" fontWeight="bold">Trabeculae Network & Hematopoietic Red Marrow</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 15. PERIPHERAL BLOOD SMEAR
    // Millions of biconcave circular RBCs, multi-lobed neutrophil, small lymphocyte, platelets
    // -------------------------------------------------------------
    case 'blood_smear':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#fff1f2" />

          {/* Sea of Biconcave Erythrocytes (RBCs with central pallor) */}
          {[
            { x: 30, y: 30 }, { x: 60, y: 25 }, { x: 90, y: 35 }, { x: 130, y: 25 }, { x: 165, y: 35 }, { x: 200, y: 28 },
            { x: 25, y: 65 }, { x: 170, y: 70 }, { x: 210, y: 65 },
            { x: 35, y: 105 }, { x: 205, y: 110 },
            { x: 25, y: 145 }, { x: 60, y: 155 }, { x: 100, y: 145 }, { x: 140, y: 155 }, { x: 180, y: 145 }, { x: 215, y: 150 }
          ].map((r, i) => (
            <g key={i}>
              <circle cx={r.x} cy={r.y} r="10" fill="#fb7185" />
              {/* Central Pallor */}
              <circle cx={r.x} cy={r.y} r="4.5" fill="#fff1f2" />
            </g>
          ))}

          {/* 1. NEUTROPHIL (Center Left): 3-5 lobed connected nucleus */}
          <g transform="translate(85, 85)">
            <circle cx="0" cy="0" r="22" fill="#e0e7ff" stroke="#818cf8" strokeWidth="1" />
            {/* Multi-lobed purple nucleus */}
            <circle cx="-8" cy="-8" r="6" fill="#312e81" />
            <circle cx="8" cy="-6" r="5.5" fill="#312e81" />
            <circle cx="2" cy="8" r="6.5" fill="#312e81" />
            <line x1="-8" y1="-8" x2="8" y2="-6" stroke="#312e81" strokeWidth="2" />
            <line x1="8" y1="-6" x2="2" y2="8" stroke="#312e81" strokeWidth="2" />
            <text x="0" y="32" textAnchor="middle" fill="#312e81" fontSize="7" fontWeight="bold">Neutrophil (3-5 Lobes)</text>
          </g>

          {/* 2. LYMPHOCYTE (Center Right): large round dark nucleus + thin blue rim */}
          <g transform="translate(145, 85)">
            <circle cx="0" cy="0" r="16" fill="#bfdbfe" />
            <circle cx="0" cy="0" r="13" fill="#1e3a8a" />
            <text x="0" y="28" textAnchor="middle" fill="#1e3a8a" fontSize="7" fontWeight="bold">Lymphocyte</text>
          </g>

          {/* Platelets (Thrombocytes): tiny anucleate purple specs */}
          <circle cx="45" cy="85" r="2" fill="#7c3aed" />
          <circle cx="48" cy="88" r="1.5" fill="#7c3aed" />
          <circle cx="185" cy="100" r="2" fill="#7c3aed" />

          <text x="120" y="16" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">Wright-Giemsa: RBCs (Central Pallor) • Neutrophil • Lymphocyte</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 16. SKELETAL MUSCLE
    // Parallel unbranched cylinders, crisp cross-striations, multiple peripheral flattened nuclei
    // -------------------------------------------------------------
    case 'skeletal_muscle':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#fdf2f8" />

          {/* 3 Parallel Unbranched Cylindrical Muscle Fibers */}
          {[20, 75, 130].map((y, idx) => (
            <g key={idx}>
              <rect x="0" y={y} width="240" height="42" fill="#fb7185" opacity="0.8" stroke="#be123c" strokeWidth="1.5" />
              {/* Cross-striations: alternating dark A-bands and light I-bands */}
              {[...Array(24)].map((_, i) => (
                <line
                  key={i}
                  x1={i * 10}
                  y1={y}
                  x2={i * 10}
                  y2={y + 42}
                  stroke="#9f1239"
                  strokeWidth="3.5"
                  opacity="0.6"
                />
              ))}

              {/* Multiple PERIPHERAL Flattened Nuclei just beneath sarcolemma */}
              <ellipse cx="40" cy={y + 3} rx="12" ry="2.5" fill="#3b0764" />
              <ellipse cx="140" cy={y + 3} rx="14" ry="2.5" fill="#3b0764" />
              <ellipse cx="90" cy={y + 39} rx="13" ry="2.5" fill="#3b0764" />
              <ellipse cx="190" cy={y + 39} rx="12" ry="2.5" fill="#3b0764" />
            </g>
          ))}
          <text x="120" y="14" textAnchor="middle" fill="#881337" fontSize="8" fontWeight="bold">Cross-Striations & Multiple Peripheral Nuclei</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 17. CARDIAC MUSCLE
    // Branching striated fibers, single central oval nuclei, dark stepped intercalated discs
    // -------------------------------------------------------------
    case 'cardiac_muscle':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#fdf2f8" />

          {/* Branching cardiomyocytes */}
          <path d="M0,35 L90,35 L140,55 L240,55 L240,85 L140,85 L90,65 L0,65 Z" fill="#fb7185" stroke="#be123c" strokeWidth="1" />
          <path d="M0,95 L110,95 L160,115 L240,115 L240,145 L160,145 L110,125 L0,125 Z" fill="#fb7185" stroke="#be123c" strokeWidth="1" />

          {/* Faint cross-striations */}
          {[...Array(24)].map((_, i) => (
            <line key={i} x1={i * 10} y1="35" x2={i * 10} y2="145" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
          ))}

          {/* Central Oval Euchromatic Nuclei with perinuclear pale halos */}
          <ellipse cx="45" cy="50" rx="9" ry="5" fill="#3b0764" />
          <ellipse cx="190" cy="70" rx="9" ry="5" fill="#3b0764" />
          <ellipse cx="55" cy="110" rx="9" ry="5" fill="#3b0764" />
          <ellipse cx="200" cy="130" rx="9" ry="5" fill="#3b0764" />

          {/* HALLMARK: Dark Stepped INTERCALATED DISCS */}
          <line x1="110" y1="35" x2="110" y2="65" stroke="#4c0519" strokeWidth="4" />
          <line x1="130" y1="95" x2="130" y2="125" stroke="#4c0519" strokeWidth="4" />

          <text x="120" y="20" textAnchor="middle" fill="#881337" fontSize="8" fontWeight="bold">Branching • Central Nuclei • Dark Intercalated Discs</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 18. SMOOTH MUSCLE
    // Spindle / fusiform unstriated cells, single central cigar-shaped nuclei
    // -------------------------------------------------------------
    case 'smooth_muscle':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#fdf2f8" />

          {/* Interlocking sheets of tapered fusiform cells (NO striations) */}
          {[
            { cx: 60, cy: 35, len: 100 },
            { cx: 160, cy: 35, len: 110 },
            { cx: 30, cy: 70, len: 90 },
            { cx: 120, cy: 70, len: 110 },
            { cx: 210, cy: 70, len: 90 },
            { cx: 70, cy: 105, len: 110 },
            { cx: 170, cy: 105, len: 100 },
            { cx: 40, cy: 140, len: 90 },
            { cx: 130, cy: 140, len: 110 }
          ].map((c, i) => (
            <g key={i}>
              <path
                d={`M${c.cx - c.len / 2},${c.cy} Q${c.cx},${c.cy - 12} ${c.cx + c.len / 2},${c.cy} Q${c.cx},${c.cy + 12} ${c.cx - c.len / 2},${c.cy} Z`}
                fill="#fda4af"
                stroke="#f43f5e"
                strokeWidth="1"
                opacity="0.85"
              />
              {/* Central Elongated Cigar-Shaped Nucleus */}
              <ellipse cx={c.cx} cy={c.cy} rx="12" ry="3" fill="#4a044e" />
            </g>
          ))}
          <text x="120" y="16" textAnchor="middle" fill="#881337" fontSize="8" fontWeight="bold">Fusiform Spindle Cells • Central Cigar Nuclei • No Striations</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 19. MULTIPOLAR MOTOR NEURON
    // Stellate soma, owl-eye nucleolus, coarse blue Nissl bodies, axon hillock devoid of Nissl
    // -------------------------------------------------------------
    case 'neuron_smear':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#f8fafc" />

          {/* Surrounding small dark glial cell nuclei */}
          {[
            { x: 30, y: 30 }, { x: 210, y: 40 }, { x: 200, y: 150 }, { x: 35, y: 155 }, { x: 120, y: 25 }
          ].map((g, i) => (
            <circle key={i} cx={g.x} cy={g.y} r="3" fill="#64748b" />
          ))}

          {/* Large Stellate Soma (Cell Body) with Branching Dendrites */}
          <path
            d="M120,50 L140,25 M120,50 L100,20 M145,75 L195,50 M145,95 L205,100 M135,115 L170,150 M100,115 L65,150 M85,90 L25,95 M90,65 L35,45"
            stroke="#6366f1"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon
            points="120,55 145,75 140,110 115,120 90,110 85,70"
            fill="#a5b4fc"
            stroke="#4f46e5"
            strokeWidth="2"
          />

          {/* Axon Hillock (pale conical zone devoid of Nissl bodies) & Axon */}
          <polygon points="115,120 125,120 120,135" fill="#e0e7ff" />
          <line x1="120" y1="135" x2="120" y2="175" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
          <text x="135" y="155" fill="#4f46e5" fontSize="7" fontWeight="bold">Axon</text>

          {/* Coarse Intensely Basophilic Blue Nissl Bodies in cytoplasm */}
          {[
            { x: 100, y: 75 }, { x: 135, y: 75 }, { x: 95, y: 95 }, { x: 135, y: 95 }, { x: 105, y: 110 }, { x: 125, y: 110 }
          ].map((n, i) => (
            <ellipse key={i} cx={n.x} cy={n.y} rx="4" ry="2.5" fill="#1e1b4b" />
          ))}

          {/* Central Vesicular Nucleus with Prominent Dark "Owl-Eye" Nucleolus */}
          <circle cx="118" cy="88" r="14" fill="#ffffff" stroke="#4338ca" strokeWidth="1.5" />
          <circle cx="118" cy="88" r="4.5" fill="#0f172a" />
          <text x="118" y="70" textAnchor="middle" fill="#1e1b4b" fontSize="6.5" fontWeight="bold">Owl-Eye Nucleus</text>

          <text x="120" y="16" textAnchor="middle" fill="#312e81" fontSize="8" fontWeight="bold">Multipolar Neuron: Nissl Flakes • Owl-Eye Nucleolus • Axon Hillock</text>
        </svg>
      );

    // -------------------------------------------------------------
    // 20. BASIC GLANDULAR TISSUE (SEROUS VS MUCOUS ACINI)
    // Dark basophilic serous acini vs pale foamy mucous acini with flat basal nuclei
    // -------------------------------------------------------------
    case 'glandular_acini':
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="#fdf2f8" />

          {/* LEFT SIDE: SEROUS ACINUS (Parotid / Pancreas) */}
          <g transform="translate(65, 90)">
            <circle cx="0" cy="0" r="45" fill="#f472b6" stroke="#9f1239" strokeWidth="1.5" />
            {/* Small Central Lumen */}
            <circle cx="0" cy="0" r="4" fill="#ffffff" stroke="#9f1239" strokeWidth="1" />
            {/* Pyramidal cells with round basal spherical nuclei & apical granules */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = Math.cos(rad) * 28;
              const y = Math.sin(rad) * 28;
              return (
                <circle key={i} cx={x} cy={y} r="6.5" fill="#3b0764" />
              );
            })}
            <text x="0" y="60" textAnchor="middle" fill="#881337" fontSize="8" fontWeight="bold">SEROUS ACINUS</text>
            <text x="0" y="70" textAnchor="middle" fill="#64748b" fontSize="6.5">Dark • Round Basal Nuclei</text>
          </g>

          {/* RIGHT SIDE: MUCOUS ACINUS (Sublingual Gland) */}
          <g transform="translate(175, 90)">
            <circle cx="0" cy="0" r="45" fill="#fbcfe8" stroke="#be123c" strokeWidth="1.5" />
            {/* Larger Central Lumen */}
            <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#be123c" strokeWidth="1" />
            {/* Pale foamy cytoplasm with compressed, flat basal nuclei */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = Math.cos(rad) * 35;
              const y = Math.sin(rad) * 35;
              return (
                <ellipse key={i} cx={x} cy={y} rx="6" ry="2.5" fill="#4a044e" transform={`rotate(${deg + 90}, ${x}, ${y})`} />
              );
            })}
            <text x="0" y="60" textAnchor="middle" fill="#881337" fontSize="8" fontWeight="bold">MUCOUS ACINUS</text>
            <text x="0" y="70" textAnchor="middle" fill="#64748b" fontSize="6.5">Pale Foamy • Flat Basal Nuclei</text>
          </g>

          <text x="120" y="18" textAnchor="middle" fill="#881337" fontSize="8" fontWeight="bold">Exocrine Secretory Units: Serous (Protein) vs Mucous (Mucin)</text>
        </svg>
      );

    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400 text-xs">
          Authentic H&E Micrograph
        </div>
      );
  }
};
