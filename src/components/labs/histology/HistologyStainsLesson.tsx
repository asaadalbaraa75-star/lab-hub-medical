import React, { useState } from 'react';
import {
  HISTOLOGICAL_STAINS_DATA,
  HistologicalStain
} from './HistologyData';
import {
  Palette,
  CheckCircle2,
  Sparkles,
  Layers,
  FlaskConical,
  Zap,
  Info
} from 'lucide-react';

export const HistologyStainsLesson: React.FC = () => {
  const [selectedStainId, setSelectedStainId] = useState<string>('stain_hematoxylin');
  const [filterCategory, setFilterCategory] = useState<'all' | 'acidic' | 'basic' | 'neutral'>('all');

  const selectedStain = HISTOLOGICAL_STAINS_DATA.find(s => s.id === selectedStainId) || HISTOLOGICAL_STAINS_DATA[0];

  const filteredStains = HISTOLOGICAL_STAINS_DATA.filter(s => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl text-slate-100" id="histology-stains-container">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                LESSON 5 — SANA'A UNIVERSITY CURRICULUM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              الصبغات النسيجية (Histological Stains: Acidic, Basic & Neutral)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Understanding ionic dye affinities: Acidophilic vs Basophilic components, electrical charges, and diagnostic colors.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-rose-500 text-slate-950'
                : 'bg-[#1E293B] text-slate-300 border border-[#334155]'
            }`}
          >
            الكل (All)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('acidic')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterCategory === 'acidic'
                ? 'bg-pink-500 text-white'
                : 'bg-[#1E293B] text-pink-300 border border-pink-500/30'
            }`}
          >
            حامضية (Acidic)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('basic')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterCategory === 'basic'
                ? 'bg-indigo-500 text-white'
                : 'bg-[#1E293B] text-indigo-300 border border-indigo-500/30'
            }`}
          >
            قاعدية (Basic)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('neutral')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterCategory === 'neutral'
                ? 'bg-purple-500 text-white'
                : 'bg-[#1E293B] text-purple-300 border border-purple-500/30'
            }`}
          >
            متعادلة (Neutral)
          </button>
        </div>
      </div>

      {/* Grid: Stain Selector Cards & Deep Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Stain Selection Cards */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            اختر صبغة لاستعراض تفاصيلها:
          </span>
          <div className="space-y-2.5">
            {filteredStains.map(stain => {
              const isSelected = stain.id === selectedStainId;

              return (
                <button
                  key={stain.id}
                  type="button"
                  id={`stain-btn-${stain.id}`}
                  onClick={() => setSelectedStainId(stain.id)}
                  className={`w-full text-right p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#1E293B] border-rose-400 ring-2 ring-rose-500/30 shadow-lg'
                      : 'bg-[#1E293B]/60 border-[#334155] hover:bg-[#1E293B] hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md shrink-0"
                      style={{ backgroundColor: stain.colorHex + '25', border: `1.5px solid ${stain.colorHex}` }}
                    >
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: stain.colorHex }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {stain.name}
                      </h4>
                      <p className="text-xs font-semibold text-rose-300/90 font-arabic">
                        {stain.nameAr}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0F172A] border border-slate-700 text-slate-300 shrink-0">
                    {stain.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Stain Medical Profile */}
        <div className="lg:col-span-7 bg-[#1E293B] border border-[#334155] rounded-2xl p-6 space-y-5 shadow-lg">
          {/* Stain Title & Swatch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#334155] pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#0F172A] border border-slate-700 text-slate-300">
                {selectedStain.categoryLabel}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1.5">
                {selectedStain.name}
              </h3>
              <p className="text-sm font-semibold text-rose-300 font-arabic">
                {selectedStain.nameAr}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#0F172A] px-4 py-2.5 rounded-xl border border-slate-700 self-start sm:self-auto">
              <span className="w-5 h-5 rounded-lg shadow-sm shrink-0" style={{ backgroundColor: selectedStain.colorHex }} />
              <div>
                <div className="text-[10px] font-mono text-slate-400">اللون المجهري المتوقع:</div>
                <div className="text-xs font-bold font-mono" style={{ color: selectedStain.colorHex }}>
                  {selectedStain.expectedColor}
                </div>
              </div>
            </div>
          </div>

          {/* Dye Charge & Electrochemistry */}
          <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>الشحنة الكهروكيميائية للصبغة (Ionic Charge):</span>
            </div>
            <p className="text-sm font-semibold text-white font-mono">
              {selectedStain.charge}
            </p>
          </div>

          {/* What It Stains (Cellular Targets) */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>التراكيب الخلوية والنسيجية المستهدفة (Stained Cellular Structures):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedStain.whatItStains.map((target, idx) => (
                <div
                  key={idx}
                  className="bg-[#0F172A]/70 border border-slate-700/50 p-3 rounded-xl text-xs text-slate-200 flex items-start gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-mono text-[9px] shrink-0 mt-0.5">
                    •
                  </span>
                  <span>{target}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Identification Clue */}
          <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>كيف تتعرف عليها تحت المجهر (Microscopic Identification):</span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              {selectedStain.practicalIdentification}
            </p>
          </div>

          {/* Exam Pearl */}
          <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>نكتة وفخ الامتحان (High-Yield Exam Pearl):</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/95 font-medium leading-relaxed">
              {selectedStain.examPearl}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
