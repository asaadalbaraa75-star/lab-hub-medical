import React, { useState } from 'react';
import {
  PROTEIN_PRACTICAL_EXPERIMENTS,
  ProteinPracticalExperiment
} from './ProteinsData';
import { IsoelectricPointCaseinLab } from './IsoelectricPointCaseinLab';
import {
  FlaskConical,
  TestTube,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  FileQuestion,
  Layers,
  ArrowRight,
  Info,
  Droplet,
  Beaker
} from 'lucide-react';

export const ProteinPracticalLab: React.FC = () => {
  const [activeExpId, setActiveExpId] = useState<'biuret' | 'casein'>('casein');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [simulationState, setSimulationState] = useState<'unreacted' | 'reacting' | 'positive'>('positive');

  const activeExp = PROTEIN_PRACTICAL_EXPERIMENTS.find(e => e.id === activeExpId) || PROTEIN_PRACTICAL_EXPERIMENTS[0];

  const handleSelectExp = (id: 'biuret' | 'casein') => {
    setActiveExpId(id);
    setShowAnswer(false);
    setSimulationState('positive');
  };

  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl text-slate-100" id="protein-practical-container">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                DEDICATED LABORATORY SUITE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              PROTEIN PRACTICAL (التجارب العملية للبروتينات)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Isoelectric Point (pI) Test — Casein & Biuret Test for Peptide Bonds.
            </p>
          </div>
        </div>

        {/* Experiment A vs B Switcher Buttons */}
        <div className="flex items-center gap-2 bg-[#1E293B] p-1.5 rounded-2xl border border-[#334155] self-start sm:self-auto">
          <button
            type="button"
            id="exp-btn-casein"
            onClick={() => handleSelectExp('casein')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeExpId === 'casein'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>B) Isoelectric Point (pI) Test — Casein</span>
          </button>

          <button
            type="button"
            id="exp-btn-biuret"
            onClick={() => handleSelectExp('biuret')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeExpId === 'biuret'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>A) Biuret Test (كشف البروتين)</span>
          </button>
        </div>
      </div>

      {/* RENDER CASEIN DEDICATED EXPERIMENT PAGE */}
      {activeExpId === 'casein' ? (
        <IsoelectricPointCaseinLab />
      ) : (
        /* Main Experiment Dossier (Biuret) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 8 Cols: Complete Laboratory Experiment Methodology */}
          <div className="lg:col-span-8 bg-[#1E293B] border border-[#334155] rounded-2xl p-6 space-y-5 shadow-lg">
            {/* Title & Section Tag */}
            <div className="border-b border-[#334155] pb-4 space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#0F172A] border border-slate-700 text-purple-300">
                EXPERIMENT SECTION {activeExp.experimentSubSection}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
                {activeExp.titleEn}
              </h3>
              <p className="text-sm font-semibold text-purple-300 font-arabic">
                {activeExp.titleAr}
              </p>
            </div>

            {/* Aim & Principle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1.5">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>الهدف من التجربة (Aim):</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {activeExp.aim}
                </p>
              </div>

              <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1.5">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>الأساس العلمي الكيميائي (Principle):</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeExp.principle}
                </p>
              </div>
            </div>

            {/* Materials and Reagents */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Beaker className="w-4 h-4 text-purple-400" />
                <span>المواد والكواشف الكيميائية المطلوبة (Materials & Reagents):</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeExp.materialsAndReagents.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0F172A]/70 border border-slate-700/50 p-2.5 rounded-xl text-xs text-slate-200 flex items-start gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono text-[9px] shrink-0 mt-0.5">
                      •
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Procedure */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>خطوات العمل المخبري خطوة بخطوة (Step-by-Step Procedure):</span>
              </h4>
              <div className="space-y-2">
                {activeExp.procedureSteps.map(step => (
                  <div
                    key={step.stepNumber}
                    className="bg-[#0F172A]/80 border border-slate-700/60 p-3.5 rounded-xl space-y-1"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                        {step.stepNumber}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
                        {step.action}
                      </span>
                    </div>
                    {step.note && (
                      <div className="text-[11px] text-amber-300/90 pl-9 font-mono">
                        ⚠️ Note: {step.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Interpretation */}
            <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-4 space-y-1.5">
              <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>التفسير المخبري للنتيجة (Interpretation):</span>
              </div>
              <p className="text-xs sm:text-sm text-purple-100/95 leading-relaxed">
                {activeExp.interpretation}
              </p>
            </div>

            {/* Critical Laboratory Precautions */}
            <div className="bg-rose-950/30 border border-rose-500/40 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>احتياطات مخبرية حرجة في الامتحان (Precautions):</span>
              </div>
              <ul className="space-y-1.5 text-xs text-rose-100/90 leading-relaxed">
                {activeExp.precautions.map((prec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{prec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 4 Cols: Virtual Test Tube & Spotter Exam Question */}
          <div className="lg:col-span-4 space-y-4">
            {/* Virtual Test Tube Visual Simulation */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 space-y-4 shadow-lg text-center">
              <div className="flex items-center justify-between border-b border-[#334155] pb-2.5 text-xs">
                <span className="font-bold text-slate-300">الملاحظة والمظهر (Observation):</span>
                <span className="font-mono text-cyan-400 font-bold text-[11px]">POSITIVE RESULT</span>
              </div>

              {/* Test Tube Visualization Graphic */}
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-16 h-48 rounded-b-3xl border-2 border-slate-600 bg-slate-900/60 p-1 flex flex-col justify-end shadow-inner overflow-hidden">
                  {/* Liquid fill */}
                  <div
                    className="w-full rounded-b-2xl transition-all duration-700 shadow-lg relative flex flex-col justify-end"
                    style={{
                      height: '65%',
                      backgroundColor: activeExp.observation.colorHex,
                      boxShadow: `0 0 20px ${activeExp.observation.colorHex}60`
                    }}
                  >
                    {/* Surface Meniscus line */}
                    <div className="w-full h-1.5 bg-white/40 rounded-full mb-auto" />
                  </div>

                  {/* Glass reflection highlight */}
                  <div className="absolute top-2 left-2 w-1 h-36 bg-white/15 rounded-full" />
                </div>

                <div className="mt-3 text-xs font-mono font-bold text-slate-200">
                  Violet / Purple Coordination Complex
                </div>
              </div>

              {/* Positive & Negative Summary */}
              <div className="space-y-2 text-xs text-left">
                <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl">
                  <div className="font-bold text-emerald-300 mb-0.5">النتيجة الإيجابية (Positive):</div>
                  <div className="text-emerald-100">{activeExp.observation.positiveResult}</div>
                </div>

                <div className="bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-xl">
                  <div className="font-bold text-rose-300 mb-0.5">النتيجة السلبية (Negative):</div>
                  <div className="text-rose-100">{activeExp.observation.negativeResult}</div>
                </div>
              </div>
            </div>

            {/* Practical Exam Spotter Question Card */}
            <div className="bg-[#1E293B] border border-amber-500/40 rounded-2xl p-5 space-y-3.5 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#334155] pb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <FileQuestion className="w-4 h-4 text-amber-400" />
                  <span>سؤال عملي في الامتحان (Exam Question):</span>
                </div>
                <button
                  type="button"
                  id="toggle-protein-exam-answer"
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors cursor-pointer"
                >
                  {showAnswer ? 'إخفاء الإجابة' : 'إظهار الإجابة'}
                </button>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
                {activeExp.practicalExamQuestion.question}
              </div>

              {showAnswer && (
                <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-xl space-y-1 text-xs animate-in fade-in">
                  <div className="font-bold text-amber-200">
                    الإجابة النموذجية: {activeExp.practicalExamQuestion.correctAnswer}
                  </div>
                  <p className="text-slate-300 text-[11px] pt-1 leading-relaxed border-t border-amber-900/60">
                    {activeExp.practicalExamQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
