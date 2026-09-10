import React, { useState } from 'react';
import {
  COMPOUND_MICROSCOPE_PARTS,
  MicroscopePart
} from './HistologyData';
import {
  Microscope,
  Eye,
  Sliders,
  Move,
  Anchor,
  CheckCircle2,
  Info,
  Sparkles,
  HelpCircle,
  Maximize2
} from 'lucide-react';

interface Props {
  onSelectPart?: (part: MicroscopePart) => void;
}

export const InteractiveMicroscopeDiagram: React.FC<Props> = ({ onSelectPart }) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('objective_lenses');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'lenses' | 'adjustments' | 'movable' | 'constant'>('all');

  const selectedPart = COMPOUND_MICROSCOPE_PARTS.find(p => p.id === selectedPartId) || COMPOUND_MICROSCOPE_PARTS[1];

  const filteredParts = COMPOUND_MICROSCOPE_PARTS.filter(p => {
    if (activeCategoryFilter === 'all') return true;
    return p.category === activeCategoryFilter;
  });

  const handlePartClick = (part: MicroscopePart) => {
    setSelectedPartId(part.id);
    if (onSelectPart) {
      onSelectPart(part);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lenses':
        return 'border-cyan-400 bg-cyan-500/20 text-cyan-300';
      case 'adjustments':
        return 'border-amber-400 bg-amber-500/20 text-amber-300';
      case 'movable':
        return 'border-emerald-400 bg-emerald-500/20 text-emerald-300';
      case 'constant':
        return 'border-purple-400 bg-purple-500/20 text-purple-300';
      default:
        return 'border-indigo-400 bg-indigo-500/20 text-indigo-300';
    }
  };

  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl text-slate-100" id="interactive-microscope-container">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                LESSON 3 — SANA'A UNIVERSITY CURRICULUM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              مخطط المجهر الضوئي المركب التفاعلي (Compound Light Microscope)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive Component Diagram: Click any labeled part to examine its function, first-year medical explanation, and exam identification pearls.
            </p>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="px-3 py-1 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-semibold">
            3 عدسات (Lenses)
          </span>
          <span className="px-3 py-1 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-300 font-semibold">
            3 ضوابط (Adjustments)
          </span>
          <span className="px-3 py-1 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 font-semibold">
            3 أجزاء متحركة (Movable)
          </span>
          <span className="px-3 py-1 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300 font-semibold">
            3 أجزاء ثابتة (Constant)
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          type="button"
          onClick={() => setActiveCategoryFilter('all')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCategoryFilter === 'all'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-[#1E293B] text-slate-300 hover:text-white border border-[#334155]'
          }`}
        >
          كل الأجزاء الـ 12 (All 12 Parts)
        </button>

        <button
          type="button"
          onClick={() => setActiveCategoryFilter('lenses')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeCategoryFilter === 'lenses'
              ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
              : 'bg-[#1E293B] text-cyan-300 hover:text-white border border-cyan-500/30'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>العدسات الثلاث (3 Lenses)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategoryFilter('adjustments')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeCategoryFilter === 'adjustments'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'bg-[#1E293B] text-amber-300 hover:text-white border border-amber-500/30'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>الضوابط الثلاثة (3 Adjustments)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategoryFilter('movable')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeCategoryFilter === 'movable'
              ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/20'
              : 'bg-[#1E293B] text-emerald-300 hover:text-white border border-emerald-500/30'
          }`}
        >
          <Move className="w-3.5 h-3.5" />
          <span>الأجزاء المتحركة الثلاثة (3 Movable Parts)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategoryFilter('constant')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeCategoryFilter === 'constant'
              ? 'bg-purple-400 text-slate-950 shadow-md shadow-purple-400/20'
              : 'bg-[#1E293B] text-purple-300 hover:text-white border border-purple-500/30'
          }`}
        >
          <Anchor className="w-3.5 h-3.5" />
          <span>الأجزاء الثابتة الثلاثة (3 Constant Parts)</span>
        </button>
      </div>

      {/* Main Interactive Stage: Diagram on Left + High-Yield Detail Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Microscope Schematic with Clickable Hotspots */}
        <div className="lg:col-span-7 bg-[#1E293B] border border-[#334155] rounded-2xl p-4 sm:p-6 relative overflow-hidden flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400 border-b border-[#334155]/60 pb-2">
            <span className="font-mono flex items-center gap-1.5 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" /> انقر على أي جزء لإظهار الشرح الفوري
            </span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-md text-[11px] font-mono">
              Target: {selectedPart.nameEn}
            </span>
          </div>

          {/* SVG Microscope Architectural Illustration */}
          <div className="relative w-full max-w-md aspect-[4/5] bg-gradient-to-b from-[#0B1120] to-[#0F172A] rounded-xl border border-slate-700/50 p-4 flex items-center justify-center select-none shadow-inner">
            <svg
              viewBox="0 0 400 500"
              className="w-full h-full drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))' }}
            >
              {/* Microscope Base */}
              <path
                d="M 90 440 L 310 440 C 330 440 340 460 320 470 L 80 470 C 60 460 70 440 90 440 Z"
                fill="#334155"
                stroke="#64748B"
                strokeWidth="2.5"
              />
              <rect x="170" y="420" width="60" height="20" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />
              {/* Illuminator Light Beam Source */}
              <ellipse cx="200" cy="425" rx="20" ry="6" fill="#38BDF8" opacity="0.8" />
              <polygon points="185,425 215,425 225,320 175,320" fill="url(#lightBeamGrad)" opacity="0.25" />

              {/* Condenser Assembly */}
              <rect x="180" y="305" width="40" height="20" rx="3" fill="#475569" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="220" y1="315" x2="250" y2="315" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="250" cy="315" r="4" fill="#38BDF8" />

              {/* Stage Platform */}
              <rect x="120" y="275" width="160" height="14" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="2" />
              {/* Slide on Stage */}
              <rect x="170" y="271" width="60" height="4" rx="1" fill="#E2E8F0" opacity="0.9" />
              {/* Slide Clip */}
              <path d="M 230 271 C 240 265 250 270 245 277" fill="none" stroke="#E2E8F0" strokeWidth="2" />

              {/* Microscope Arm (Curved Metallic Spine) */}
              <path
                d="M 250 440 C 310 420 330 330 300 240 C 280 180 250 160 210 160"
                fill="none"
                stroke="#334155"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <path
                d="M 250 440 C 310 420 330 330 300 240 C 280 180 250 160 210 160"
                fill="none"
                stroke="#475569"
                strokeWidth="20"
                strokeLinecap="round"
              />

              {/* Coarse Adjustment Knob */}
              <circle cx="285" cy="355" r="22" fill="#1E293B" stroke="#94A3B8" strokeWidth="3" />
              {/* Fine Adjustment Knob (inner) */}
              <circle cx="285" cy="355" r="11" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />

              {/* Revolving Nosepiece */}
              <path d="M 175 190 L 225 190 L 215 210 L 185 210 Z" fill="#475569" stroke="#94A3B8" strokeWidth="2" />

              {/* Objective Lenses (Low, High, Oil) */}
              {/* Low Power (Yellow) */}
              <rect x="180" y="210" width="10" height="24" rx="2" fill="#CA8A04" stroke="#EAB308" strokeWidth="1.5" />
              {/* High Power (Blue - Active central) */}
              <rect x="195" y="210" width="12" height="38" rx="2" fill="#2563EB" stroke="#60A5FA" strokeWidth="1.5" />
              {/* Oil Immersion (White/Silver) */}
              <rect x="212" y="210" width="10" height="46" rx="2" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="1.5" />

              {/* Body Tube (Eyepiece Tube) */}
              <rect x="188" y="90" width="24" height="80" rx="3" fill="#334155" stroke="#64748B" strokeWidth="2" />
              {/* Diopter Adjustment Ring */}
              <rect x="185" y="85" width="30" height="8" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />

              {/* Ocular Lens / Eyepiece Head */}
              <path d="M 180 50 L 220 50 L 215 85 L 185 85 Z" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <rect x="175" y="40" width="50" height="12" rx="3" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />

              {/* Gradients */}
              <defs>
                <linearGradient id="lightBeamGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Clickable Hotspot Pins Positioned Across the Diagram */}
            {COMPOUND_MICROSCOPE_PARTS.map((part, index) => {
              const isSelected = selectedPartId === part.id;
              const isFilteredIn = activeCategoryFilter === 'all' || activeCategoryFilter === part.category;

              if (!isFilteredIn) return null;

              return (
                <button
                  key={part.id}
                  type="button"
                  id={`pin-${part.id}`}
                  onClick={() => handlePartClick(part)}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer transition-all duration-200`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing halo if selected */}
                    {isSelected && (
                      <span className="absolute w-8 h-8 rounded-full bg-cyan-400/40 animate-ping" />
                    )}

                    {/* Pin Circle */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold font-mono transition-transform duration-200 group-hover:scale-110 shadow-lg border ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 border-white scale-110 ring-2 ring-cyan-400/50 ring-offset-2 ring-offset-slate-900'
                          : part.category === 'lenses'
                          ? 'bg-cyan-900/90 text-cyan-200 border-cyan-400/70 hover:border-cyan-300'
                          : part.category === 'adjustments'
                          ? 'bg-amber-900/90 text-amber-200 border-amber-400/70 hover:border-amber-300'
                          : part.category === 'movable'
                          ? 'bg-emerald-900/90 text-emerald-200 border-emerald-400/70 hover:border-emerald-300'
                          : 'bg-purple-900/90 text-purple-200 border-purple-400/70 hover:border-purple-300'
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Hover Tooltip Label */}
                    <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-slate-900/95 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap shadow-md z-30">
                      {part.nameEn.split('(')[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Indicator Legend */}
          <div className="w-full mt-4 pt-3 border-t border-[#334155] flex items-center justify-center gap-4 flex-wrap text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>العدسات (Lenses)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>الضوابط (Adjustments)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>المتحركة (Movable)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span>الثابتة (Constant)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Component High-Yield Medical Dossier */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 space-y-4 shadow-lg">
            {/* Component Category & Name */}
            <div className="space-y-1.5 border-b border-[#334155] pb-4">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${getCategoryColor(selectedPart.category)}`}>
                  {selectedPart.categoryLabelEn} • {selectedPart.categoryLabelAr}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Part #{COMPOUND_MICROSCOPE_PARTS.findIndex(p => p.id === selectedPart.id) + 1} of 12
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight pt-1">
                {selectedPart.nameEn}
              </h3>
              <p className="text-sm font-semibold text-cyan-400 font-arabic">
                {selectedPart.nameAr}
              </p>
            </div>

            {/* Simple First-Year Explanation */}
            <div className="space-y-1.5 bg-[#0F172A] p-3.5 rounded-xl border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>الشرح المبسط لطلاب السنة الأولى (Simple Explanation):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedPart.explanation}
              </p>
            </div>

            {/* Function in Laboratory Work */}
            <div className="space-y-1.5 bg-cyan-950/30 p-3.5 rounded-xl border border-cyan-500/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>الوظيفة المخبرية (Function in Microscopy):</span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-mono">
                {selectedPart.function}
              </p>
            </div>

            {/* Practical Identification Point (OSPE Exam Pearl) */}
            <div className="space-y-1.5 bg-amber-950/30 p-3.5 rounded-xl border border-amber-500/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>علامة التعرف العملي في الامتحان (Practical Identification Point):</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                {selectedPart.practicalIdentificationPoint}
              </p>
            </div>

            {/* Quick Component Selection Carousel */}
            <div className="pt-2 border-t border-[#334155]/80 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                تصفح أجزاء المجهر الأخرى:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {COMPOUND_MICROSCOPE_PARTS.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePartClick(p)}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors text-right truncate cursor-pointer ${
                      selectedPartId === p.id
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-[#0F172A] text-slate-300 hover:text-white border border-[#334155]'
                    }`}
                  >
                    {idx + 1}. {p.nameEn.split('(')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
