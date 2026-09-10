import React, { useState } from 'react';
import {
  HISTOLOGY_SLIDE_PREPARATION_STEPS,
  SlidePrepStep
} from './HistologyData';
import {
  Layers,
  CheckCircle2,
  Clock,
  FlaskConical,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Info,
  Droplet,
  Scissors,
  Flame,
  FileCheck
} from 'lucide-react';

export const SlidePreparationWorkflow: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const activeStep = HISTOLOGY_SLIDE_PREPARATION_STEPS[currentStepIndex];

  const getStepIcon = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return Droplet;
      case 2:
      case 9:
        return FlaskConical;
      case 3:
      case 6:
      case 10:
        return Sparkles;
      case 4:
        return Flame;
      case 5:
        return Scissors;
      case 7:
        return Droplet;
      case 8:
        return Layers;
      default:
        return FlaskConical;
    }
  };

  const CurrentIcon = getStepIcon(activeStep.stepNumber);

  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl text-slate-100" id="histology-slide-prep-container">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                LESSON 4 — SANA'A UNIVERSITY PRACTICAL PROTOCOL
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              مراحل تحضير شريحة الأنسجة (Histological Slide Preparation Protocol)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive 10-Step Laboratory Workflow: From fresh biopsy fixation to permanent DPX coverslip mounting.
            </p>
          </div>
        </div>

        {/* Progress Counter */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right">
            <div className="text-xs text-slate-400">المرحلة الحالية:</div>
            <div className="text-sm font-bold text-indigo-400 font-mono">
              Step {activeStep.stepNumber} of 10
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center font-bold font-mono text-indigo-300">
            {Math.round((activeStep.stepNumber / 10) * 100)}%
          </div>
        </div>
      </div>

      {/* Interactive 10-Step Timeline Ribbon */}
      <div className="overflow-x-auto pb-2 no-scrollbar">
        <div className="flex items-center gap-2 min-w-[760px]">
          {HISTOLOGY_SLIDE_PREPARATION_STEPS.map((step, idx) => {
            const isCurrent = currentStepIndex === idx;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={step.stepNumber}
                type="button"
                id={`step-tab-${step.stepNumber}`}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30 scale-[1.02]'
                    : isCompleted
                    ? 'bg-[#1E293B] text-emerald-300 border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-[#1E293B] text-slate-400 border-[#334155] hover:text-slate-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                    isCurrent
                      ? 'bg-white text-indigo-900'
                      : isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isCompleted ? '✓' : step.stepNumber}
                </div>
                <div className="text-left truncate">
                  <div className="truncate font-bold">{step.titleEn}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Detail Stage for the Active Step */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 space-y-6 shadow-lg">
        {/* Step Title & Key Reagent */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-indigo-400">
                STEP {activeStep.stepNumber} OF 10
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeStep.titleEn}
              </h3>
              <p className="text-sm font-semibold text-slate-300 font-arabic">
                {activeStep.titleAr}
              </p>
            </div>
          </div>

          {activeStep.temperatureOrDuration && (
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F172A] border border-slate-700 text-xs text-amber-300 font-mono self-start sm:self-auto">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{activeStep.temperatureOrDuration}</span>
            </div>
          )}
        </div>

        {/* Reagent and Main Chemical Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <FlaskConical className="w-4 h-4" />
              <span>المادة الكيميائية / الكاشف المستخدم (Reagent):</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white font-mono leading-relaxed">
              {activeStep.reagent}
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>الهدف البيولوجي والمخبري (Laboratory Purpose):</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeStep.purpose}
            </p>
          </div>
        </div>

        {/* Technical Procedural Details */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>خطوات الإجراء العملي في المعمل (Practical Lab Details):</span>
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {activeStep.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-[#0F172A]/70 border border-slate-700/40 p-3 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* High-Yield Practical Exam Warning / Note */}
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>نقطة الامتحان العملي الفاصلة (High-Yield Practical Examination Point):</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-100/95 font-medium leading-relaxed">
            {activeStep.keyPracticalNote}
          </p>
        </div>

        {/* Navigation Controls: Previous / Next Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#334155]">
          <button
            type="button"
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>المرحلة السابقة ({Math.max(1, currentStepIndex)})</span>
          </button>

          <button
            type="button"
            disabled={currentStepIndex === HISTOLOGY_SLIDE_PREPARATION_STEPS.length - 1}
            onClick={() => setCurrentStepIndex(prev => Math.min(HISTOLOGY_SLIDE_PREPARATION_STEPS.length - 1, prev + 1))}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentStepIndex === HISTOLOGY_SLIDE_PREPARATION_STEPS.length - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
            }`}
          >
            <span>المرحلة التالية ({Math.min(10, currentStepIndex + 2)})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
