import React, { useState } from 'react';
import {
  MITOSIS_STAGES_DATA,
  MitosisStage
} from './HistologyData';
import {
  GitCommit,
  CheckCircle2,
  Sparkles,
  Layers,
  Clock,
  Split,
  Info
} from 'lucide-react';

export const MitosisDivisionLesson: React.FC = () => {
  const [selectedStageNumber, setSelectedStageNumber] = useState<number>(2); // Metaphase default

  const selectedStage = MITOSIS_STAGES_DATA.find(s => s.stageNumber === selectedStageNumber) || MITOSIS_STAGES_DATA[1];

  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl text-slate-100" id="mitosis-division-container">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
            <Split className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                LESSON 7 — SANA'A UNIVERSITY CURRICULUM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              الانقسام الخلوي المتساوي (Cell Division: Mitosis)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Karyokinesis (Nuclear Division) and Cytokinesis: Prophase, Metaphase, Anaphase, and Telophase in medical specimens.
            </p>
          </div>
        </div>

        {/* Plant vs Animal Division Summary Badge */}
        <div className="bg-[#1E293B] border border-cyan-500/30 px-3.5 py-2 rounded-xl text-xs space-y-0.5">
          <div className="font-bold text-cyan-300">Cytokinesis Comparison:</div>
          <div className="text-[11px] text-slate-300">Animal: Cleavage Furrow • Plant: Cell Plate</div>
        </div>
      </div>

      {/* 4 Stages Carousel Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {MITOSIS_STAGES_DATA.map(stage => {
          const isSelected = stage.stageNumber === selectedStageNumber;
          return (
            <button
              key={stage.stageNumber}
              type="button"
              id={`stage-btn-${stage.stageNumber}`}
              onClick={() => setSelectedStageNumber(stage.stageNumber)}
              className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-[#1E293B] text-slate-300 border-[#334155] hover:border-slate-500 hover:text-white'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">
                Phase #{stage.stageNumber}
              </div>
              <div className="text-sm font-bold truncate">
                {stage.nameEn}
              </div>
              <div className="text-xs font-arabic opacity-90 truncate mt-0.5">
                {stage.nameAr}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail Panel */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 space-y-5 shadow-lg">
        {/* Stage Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#334155] pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#0F172A] border border-slate-700 text-cyan-300">
              {selectedStage.phase.toUpperCase()}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              {selectedStage.nameEn}
            </h3>
            <p className="text-sm font-semibold text-cyan-300 font-arabic">
              {selectedStage.nameAr}
            </p>
          </div>

          <div className="bg-[#0F172A] px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono self-start sm:self-auto">
            Stage {selectedStage.stageNumber} of 4
          </div>
        </div>

        {/* Morphology & Chromosome Dynamics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1.5">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>المظهر المورفولوجي للطور (Morphology):</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedStage.morphology}
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1.5">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5" />
              <span>سلوك وهيئة الصبغيات (Chromosome Appearance):</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedStage.chromosomeAppearance}
            </p>
          </div>
        </div>

        {/* Practical Identification Clue in Lab Slides */}
        <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>كيف تتعرف على هذا الطور في شريحة المعمل (Practical Lab Clue):</span>
          </div>
          <p className="text-xs sm:text-sm text-cyan-100/95 leading-relaxed font-medium">
            {selectedStage.practicalIdentificationClue}
          </p>
        </div>

        {/* Plant Root Tip vs Animal Tissue */}
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>مقارنة قمة جذر البصل مع الأنسجة الحيوانية (Plant vs Animal Distinction):</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-100/95 leading-relaxed">
            {selectedStage.plantVsAnimalClue}
          </p>
        </div>
      </div>
    </div>
  );
};
