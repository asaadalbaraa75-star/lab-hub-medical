import React, { useState } from 'react';
import {
  CONNECTIVE_TISSUE_DATA,
  ConnectiveTissueStudy
} from './HistologyData';
import {
  Network,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  Eye,
  Building,
  Target,
  FlaskConical
} from 'lucide-react';

export const ConnectiveTissueLab: React.FC = () => {
  const [selectedTypeNumber, setSelectedTypeNumber] = useState<number>(1);
  const [filterCategory, setFilterCategory] = useState<'all' | 'loose' | 'dense'>('all');

  const selectedTissue = CONNECTIVE_TISSUE_DATA.find(t => t.typeNumber === selectedTypeNumber) || CONNECTIVE_TISSUE_DATA[0];

  const filteredTissues = CONNECTIVE_TISSUE_DATA.filter(t => {
    if (filterCategory === 'all') return true;
    return t.category === filterCategory;
  });

  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl text-slate-100" id="connective-tissue-container">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                LESSON 9 — SANA'A UNIVERSITY CURRICULUM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              النسيج الضام (Connective Tissue: Loose & Dense Types)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Areolar, Adipose, Reticular, Mucoid (Wharton’s Jelly), Dense Irregular, Dense Regular (Tendon), and Yellow Elastic.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-[#1E293B] text-slate-300 border border-[#334155]'
            }`}
          >
            جميع الأنواع الـ 7
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('loose')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterCategory === 'loose'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-[#1E293B] text-emerald-300 border border-emerald-500/30'
            }`}
          >
            رخو (Loose - 4 Types)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('dense')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterCategory === 'dense'
                ? 'bg-rose-500 text-white'
                : 'bg-[#1E293B] text-rose-300 border border-rose-500/30'
            }`}
          >
            كثيف (Dense - 3 Types)
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: CT Types List */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            اختر نوع النسيج الضام ({filteredTissues.length}):
          </span>
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1 no-scrollbar">
            {filteredTissues.map(tissue => {
              const isSelected = tissue.typeNumber === selectedTypeNumber;
              return (
                <button
                  key={tissue.id}
                  type="button"
                  id={`ct-btn-${tissue.typeNumber}`}
                  onClick={() => setSelectedTypeNumber(tissue.typeNumber)}
                  className={`w-full text-right p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E293B] border-amber-400 ring-2 ring-amber-500/30 shadow-lg'
                      : 'bg-[#1E293B]/60 border-[#334155] hover:bg-[#1E293B]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-900 border border-slate-700 text-slate-300">
                      Type #{tissue.typeNumber}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400">
                      {tissue.category.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {tissue.nameEn}
                  </h4>
                  <p className="text-xs font-semibold text-amber-300/90 font-arabic mt-0.5">
                    {tissue.nameAr}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Connective Tissue Detailed Dossier */}
        <div className="lg:col-span-8 bg-[#1E293B] border border-[#334155] rounded-2xl p-6 space-y-5 shadow-lg">
          {/* Header */}
          <div className="border-b border-[#334155] pb-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#0F172A] border border-slate-700 text-amber-300">
                CLASS: {selectedTissue.category.toUpperCase()} CONNECTIVE TISSUE
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Slide: {selectedTissue.specimenSource}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
              {selectedTissue.nameEn}
            </h3>
            <p className="text-sm font-semibold text-amber-300 font-arabic">
              {selectedTissue.nameAr}
            </p>
          </div>

          {/* Extracellular Matrix, Fibers, and Cells */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1.5">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>الخلايا السائدة (Predominant Cells):</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedTissue.predominantCells.map((cell, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{cell}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>الألياف والمادة الخلالية (Fibers & Matrix):</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedTissue.fibersPresent.map((fiber, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{fiber}</span>
                  </li>
                ))}
              </ul>
              <div className="text-xs text-slate-400 pt-1 border-t border-slate-800">
                <span className="font-bold text-slate-300">Ground Matrix: </span>
                {selectedTissue.extracellularMatrix}
              </div>
            </div>
          </div>

          {/* Locations & Specimen Sources */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-emerald-400" />
              <span>أماكن التواجد في جسم الإنسان (Anatomical Locations):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedTissue.locations.map((loc, idx) => (
                <div
                  key={idx}
                  className="bg-[#0F172A]/70 border border-slate-700/50 p-2.5 rounded-xl text-xs text-slate-200 flex items-start gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono text-[9px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Microscopic Identification Clues */}
          <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>علامات التعرف والتمييز تحت المجهر (Microscopic Identification Clues):</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-amber-100/95 leading-relaxed">
              {selectedTissue.microscopicIdentificationClues.map((clue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exam Trap */}
          <div className="bg-rose-950/30 border border-rose-500/40 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>فخ الامتحان العملي (High-Yield Exam Trap):</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-100/95 font-medium leading-relaxed">
              {selectedTissue.examTrap}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
