/*
 * © LAB HUB · Developed by Sakina Asaad
 * Separate Interactive Lesson View for Carbohydrate Experiments
 *
 * Each experiment is rendered as a standalone, complete lesson with:
 * - Lesson (Principle, Mechanism, Equations, Clinical Relevance)
 * - Real Laboratory Image (Bench Photography & Side-by-Side Test Tube Reaction)
 * - Procedure (Step-by-step Protocol, Precautions, Timing)
 * - Observation (Positive vs Negative Visuals, Gradients)
 * - Result & Interpretation (Diagnostic Flowchart, Clinical Scenarios)
 * - Doctor Explanation Video (Embedded YouTube Player & Objectives)
 * - Questions (Interactive MCQs with Instant Feedback & Rationales)
 */

import React, { useState } from 'react';
import {
  FlaskConical,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
  Droplets,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Video,
  Info,
  Beaker,
  FileText,
  Clock,
  ExternalLink,
  ZoomIn,
  Sparkles
} from 'lucide-react';
import {
  CarbohydrateExperiment,
  CARBOHYDRATE_EXPERIMENTS
} from './CarbohydrateCurriculumData';
import { BiochemistryTestTube } from './BiochemistryTestTube';

interface CarbohydrateExperimentLessonViewProps {
  experiment: CarbohydrateExperiment;
  onSelectExperiment: (expId: 'molisch' | 'iodine' | 'benedict' | 'barfoed' | 'seliwanoff') => void;
  onBackToOverview: () => void;
}

export const CarbohydrateExperimentLessonView: React.FC<CarbohydrateExperimentLessonViewProps> = ({
  experiment,
  onSelectExperiment,
  onBackToOverview
}) => {
  // MCQ state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  
  // Real image modal state
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  // Benedict specific color scale state
  const [benedictScaleIndex, setBenedictScaleIndex] = useState<number>(4);

  const benedictColors = [
    { label: 'Blue (أزرق)', rating: '0% (Negative)', desc: 'No reducing sugar present. Clear blue solution.', colorHex: '#2563EB', textColor: 'text-blue-700', bgBadge: 'bg-blue-50 text-blue-800' },
    { label: 'Green (أخضر)', rating: '0.5% (Trace +)', desc: 'Trace reducing sugar (~0.5 g/dL). Light green precipitate.', colorHex: '#16A34A', textColor: 'text-green-700', bgBadge: 'bg-green-50 text-green-800' },
    { label: 'Yellow (أصفر)', rating: '1.0% (Low ++)', desc: 'Low concentration (~1.0 g/dL). Yellow precipitate.', colorHex: '#CA8A04', textColor: 'text-yellow-700', bgBadge: 'bg-yellow-50 text-yellow-800' },
    { label: 'Orange (برتقالي)', rating: '1.5% (Moderate +++)', desc: 'Moderate concentration (~1.5 g/dL). Dense orange precipitate.', colorHex: '#EA580C', textColor: 'text-orange-700', bgBadge: 'bg-orange-50 text-orange-800' },
    { label: 'Brick-Red (أحمر طوبي)', rating: '≥ 2.0% (High ++++)', desc: 'High concentration (≥2.0 g/dL). Heavy brick-red Cu₂O precipitate.', colorHex: '#DC2626', textColor: 'text-red-700', bgBadge: 'bg-red-50 text-red-800' }
  ];

  // Navigation helpers strictly preserving the 1 to 5 sequence:
  const currentIndex = CARBOHYDRATE_EXPERIMENTS.findIndex(e => e.id === experiment.id);
  const prevExp = currentIndex > 0 ? CARBOHYDRATE_EXPERIMENTS[currentIndex - 1] : null;
  const nextExp = currentIndex < CARBOHYDRATE_EXPERIMENTS.length - 1 ? CARBOHYDRATE_EXPERIMENTS[currentIndex + 1] : null;

  const handleSelectOption = (questionId: number, optionKey: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionKey }));
    setRevealedAnswers(prev => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id={`experiment-lesson-${experiment.id}`}>
      {/* Top Header & Breadcrumbs & Sequential Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToOverview}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-3 py-2 rounded-xl transition-all"
              id="back-to-all-experiments-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All 5 Experiments (العودة للقائمة)</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              Experiment {experiment.order} of 5
            </span>
          </div>

          {/* Previous / Next Experiment strictly in 1..5 sequence */}
          <div className="flex items-center gap-2">
            {prevExp ? (
              <button
                onClick={() => onSelectExperiment(prevExp.id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition-colors"
                id={`prev-experiment-btn-${prevExp.id}`}
                title={`Go to Experiment ${prevExp.order}: ${prevExp.name}`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev: {prevExp.name}</span>
              </button>
            ) : (
              <span className="text-xs text-slate-400 px-2 py-1">First Experiment</span>
            )}

            {nextExp ? (
              <button
                onClick={() => onSelectExperiment(nextExp.id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm px-3.5 py-2 rounded-xl transition-all"
                id={`next-experiment-btn-${nextExp.id}`}
                title={`Go to Experiment ${nextExp.order}: ${nextExp.name}`}
              >
                <span>Next: {nextExp.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                Curriculum Complete
              </span>
            )}
          </div>
        </div>

        {/* Lesson Title Banner */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                0{experiment.order}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight" id={`lesson-title-${experiment.id}`}>
                {experiment.name}
              </h1>
              <span className="text-lg font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-0.5 rounded-full" dir="rtl">
                {experiment.nameAr}
              </span>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium">
              {experiment.tagline}
            </p>
            <p className="text-xs text-slate-600 font-medium mt-0.5" dir="rtl">
              {experiment.taglineAr}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50/80 border border-indigo-100 px-3 py-1.5 rounded-xl">
              <FlaskConical className="w-4 h-4 text-indigo-600" />
              <span>{experiment.categoryBadge}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Main Content & Media */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT / TOP: 1. LESSON & PRINCIPLE & PROCEDURES (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SECTION 1: THE LESSON (Principle, Mechanism, Equations) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5" id="section-lesson-principle">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  1. Lesson Overview & Chemical Principle
                </h2>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                Medical Theory
              </span>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
              <p className="text-sm text-slate-700 leading-relaxed">
                {experiment.lesson.summaryEn}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1 border-t border-slate-200/50" dir="rtl">
                {experiment.lesson.summaryAr}
              </p>
            </div>

            {/* Scientific Principle */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Chemical Principle & Reaction Mechanism
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {experiment.lesson.principleEn}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium" dir="rtl">
                {experiment.lesson.principleAr}
              </p>
            </div>

            {/* Chemical Equation Box */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-4 rounded-xl shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
                <span>REACTION EQUATION (المعادلة الكيميائية)</span>
                <span className="text-[10px] bg-indigo-500/30 px-2 py-0.5 rounded text-indigo-200">Standard Equation</span>
              </div>
              <p className="font-mono text-xs md:text-sm font-bold text-amber-300 tracking-wide pt-1">
                {experiment.lesson.chemicalEquation}
              </p>
            </div>

            {/* Mechanism Steps */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Molecular Steps
              </h4>
              <div className="space-y-1.5">
                {experiment.lesson.chemicalMechanism.map((mech, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/70 p-2 rounded-lg border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                    <span>{mech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reagents & Clinical Utility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <Beaker className="w-4 h-4 text-indigo-600" />
                  <span>Reagent Composition</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {experiment.lesson.reagents.map((r, i) => (
                    <div key={i} className="text-slate-700">
                      <strong className="text-indigo-900 block">{r.name}</strong>
                      <span className="text-slate-600 block text-[11px]">{r.role}</span>
                      <span className="text-slate-500 block text-[11px]" dir="rtl">{r.roleAr}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-200/70 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Clinical Relevance</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {experiment.lesson.clinicalRelevanceEn}
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed" dir="rtl">
                  {experiment.lesson.clinicalRelevanceAr}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: PROCEDURE (Step-by-step Protocol) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5" id="section-procedure">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  2. Step-by-Step Bench Protocol
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">⏱ {experiment.procedure.incubationTime}</span>
                <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg">🌡 {experiment.procedure.temperature}</span>
              </div>
            </div>

            {/* Steps list */}
            <div className="space-y-3">
              {experiment.procedure.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {step.stepNumber}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">{step.titleEn}</h4>
                      <span className="text-[11px] font-bold text-indigo-700" dir="rtl">{step.titleAr}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{step.instructionEn}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed" dir="rtl">{step.instructionAr}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety & Pitfalls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Safety Precautions (إرشادات السلامة)</span>
                </div>
                <ul className="space-y-1 text-xs text-rose-950">
                  {experiment.procedure.safetyPrecautionsEn.map((safe, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{safe}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Critical Pitfalls (أخطاء مخبرية شائعة)</span>
                </div>
                <ul className="space-y-1 text-xs text-amber-950">
                  {experiment.procedure.criticalPitfallsEn.map((pit, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{pit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION 4 & 5: OBSERVATION & RESULT / INTERPRETATION */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5" id="section-observation-result">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  3. Observation & Scientific Interpretation
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Deduction & Diagnosis
              </span>
            </div>

            {/* Observation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    POSITIVE REACTION
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">نتيجة إيجابية</span>
                </div>
                <p className="text-xs font-bold text-emerald-950">
                  {experiment.observation.positiveVisualEn}
                </p>
                <p className="text-[11px] text-emerald-900" dir="rtl">
                  {experiment.observation.positiveVisualAr}
                </p>
                <div className="pt-2 border-t border-emerald-200/60 text-xs text-emerald-900">
                  <strong>Interpretation:</strong> {experiment.interpretation.positiveDeductionEn}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-slate-400" />
                    NEGATIVE REACTION
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">نتيجة سلبية</span>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  {experiment.observation.negativeVisualEn}
                </p>
                <p className="text-[11px] text-slate-600" dir="rtl">
                  {experiment.observation.negativeVisualAr}
                </p>
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-700">
                  <strong>Interpretation:</strong> {experiment.interpretation.negativeDeductionEn}
                </div>
              </div>
            </div>

            {/* Diagnostic Flowchart Algorithm Position */}
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Diagnostic Algorithm Position (موقع الفحص في شجرة التشخيص)</span>
              </div>
              <p className="text-xs text-indigo-950 font-medium">
                {experiment.interpretation.diagnosticAlgorithmStep}
              </p>
              <div className="space-y-1.5 pt-1">
                {experiment.interpretation.clinicalScenarios.map((sc, i) => (
                  <div key={i} className="text-xs bg-white/80 border border-indigo-100 p-2.5 rounded-lg space-y-0.5">
                    <span className="text-indigo-900 font-semibold block">Case {i + 1}: {sc.scenario}</span>
                    <span className="text-emerald-700 font-bold block text-[11px]">Outcome: {sc.outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT / TOP: REAL LABORATORY IMAGE & TEST TUBES & DOCTOR VIDEO (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* SECTION 2: REAL LABORATORY IMAGE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4" id="section-real-image">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Real Laboratory Image (صورة مخبرية حقيقية)</h3>
              </div>
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Verified Lab Plate
              </span>
            </div>

            {/* Real Lab Image Card */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 group bg-slate-950">
              <img
                src={experiment.realImage.url}
                alt={experiment.name}
                className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => setIsImageZoomed(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3.5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  {experiment.realImage.plateType}
                </span>
                <p className="text-xs font-bold leading-snug line-clamp-2">
                  {experiment.realImage.captionEn}
                </p>
              </div>
              <button
                onClick={() => setIsImageZoomed(true)}
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-sm transition-colors"
                title="Zoom Laboratory Image"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium" dir="rtl">
              {experiment.realImage.captionAr}
            </p>

            {/* Side-by-Side Test Tube Reaction Rendering */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Interactive Test Tube Reaction (مقارنة الأنابيب)
                </h4>
                <span className="text-[10px] text-slate-600 font-medium">Positive vs Negative</span>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
                {/* Positive Tube */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Positive (إيجابي)
                  </span>
                  <div className="h-44 flex items-center justify-center">
                    <BiochemistryTestTube
                      type={experiment.tubes.posTubeType}
                      height={170}
                      width={52}
                      showArrowLabel={false}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 block">
                    {experiment.tubes.posLabelEn}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {experiment.tubes.posTarget}
                  </span>
                </div>

                {/* Negative Tube */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    Negative (سلبي)
                  </span>
                  <div className="h-44 flex items-center justify-center">
                    <BiochemistryTestTube
                      type={experiment.tubes.negTubeType}
                      height={170}
                      width={52}
                      showArrowLabel={false}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 block">
                    {experiment.tubes.negLabelEn}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {experiment.tubes.negTarget}
                  </span>
                </div>
              </div>

              {/* Special Benedict Scale if Benedict */}
              {experiment.id === 'benedict' && (
                <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
                    <span>Benedict Graded Color Scale (التدرج اللوني)</span>
                    <span className="text-[10px] bg-indigo-200 text-indigo-800 px-1.5 py-0.5 rounded">Semi-Quantitative</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 pt-1">
                    {benedictColors.map((col, idx) => (
                      <button
                        key={idx}
                        onClick={() => setBenedictScaleIndex(idx)}
                        className={`h-7 rounded-md transition-all flex items-center justify-center font-bold text-[10px] text-white ${
                          benedictScaleIndex === idx ? 'ring-2 ring-indigo-600 ring-offset-1 scale-105' : 'opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: col.colorHex }}
                        title={col.label}
                      >
                        {idx === 0 ? '0%' : idx === 1 ? '+' : idx === 2 ? '++' : idx === 3 ? '+++' : '++++'}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs bg-white p-2.5 rounded-lg border border-indigo-100 space-y-0.5">
                    <div className="flex items-center justify-between font-bold">
                      <span className={benedictColors[benedictScaleIndex].textColor}>
                        {benedictColors[benedictScaleIndex].label}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        {benedictColors[benedictScaleIndex].rating}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      {benedictColors[benedictScaleIndex].desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 6: DOCTOR EXPLANATION VIDEO */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4" id="section-doctor-video">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Doctor Explanation Video (فيديو شرح الطبيب)
                </h3>
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                ⏱ {experiment.doctorVideo.duration}
              </span>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-sm border border-slate-200">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${experiment.doctorVideo.videoId}?rel=0&modestbranding=1`}
                title={experiment.doctorVideo.titleEn}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Doctor Info */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{experiment.doctorVideo.titleEn}</h4>
                <a
                  href={experiment.doctorVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-red-600 text-xs flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Instructor: <strong className="text-slate-700">{experiment.doctorVideo.doctorName}</strong> ({experiment.doctorVideo.doctorTitle})
              </p>
            </div>

            {/* Objectives & High-Yield points */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Key Video Objectives:
              </div>
              <ul className="space-y-1 text-xs text-slate-600">
                {experiment.doctorVideo.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-slate-200 text-[11px] font-bold text-amber-800">
                ⭐ High-Yield Takeaway:
              </div>
              <p className="text-xs text-slate-700">
                {experiment.doctorVideo.highYieldPoints[0]}
              </p>
            </div>
          </div>

          {/* SECTION 7: QUESTIONS (MCQ Knowledge Check) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5" id="section-questions">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Questions & Practice MCQs (أسئلة واختبار الفهم)
                </h3>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {experiment.questions.length} MCQs
              </span>
            </div>

            <div className="space-y-4">
              {experiment.questions.map((q, qIndex) => {
                const isAnswered = revealedAnswers[q.id];
                const selectedKey = selectedAnswers[q.id];
                const isCorrect = selectedKey === q.correctKey;

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 space-y-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          Q{qIndex + 1}
                        </span>
                        {isAnswered && (
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5" /> Incorrect
                              </>
                            )}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-snug">
                        {q.question}
                      </p>
                      <p className="text-[11px] text-slate-600 font-medium" dir="rtl">
                        {q.questionAr}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-1.5">
                      {q.options.map((opt) => {
                        const isThisSelected = selectedKey === opt.key;
                        const isThisCorrect = opt.key === q.correctKey;

                        let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';
                        if (isAnswered) {
                          if (isThisCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                          } else if (isThisSelected && !isThisCorrect) {
                            btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                          } else {
                            btnStyle = 'border-slate-200 bg-slate-50/50 text-slate-400';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            onClick={() => handleSelectOption(q.id, opt.key)}
                            disabled={isAnswered}
                            className={`w-full text-left text-xs p-2.5 rounded-lg border transition-all flex items-center gap-2.5 ${btnStyle}`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                                isAnswered && isThisCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isAnswered && isThisSelected && !isThisCorrect
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {opt.key}
                            </span>
                            <span className="flex-1">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isAnswered && (
                      <div className="text-xs bg-white p-3 rounded-lg border border-slate-200 space-y-1 animate-in fade-in">
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <Info className="w-3.5 h-3.5 text-indigo-600" /> Explanation:
                        </span>
                        <p className="text-slate-600 leading-relaxed text-[11px]">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Navigation footer between experiments */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            Carbohydrate Experiment Sequence
          </span>
          <span className="text-xs text-slate-600 font-medium">
            Strict Curriculum Order: 1. Molisch &rarr; 2. Iodine &rarr; 3. Benedict &rarr; 4. Barfoed &rarr; 5. Seliwanoff
          </span>
        </div>

        <div className="flex items-center gap-3">
          {prevExp && (
            <button
              onClick={() => onSelectExperiment(prevExp.id)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: {prevExp.name}</span>
            </button>
          )}

          {nextExp ? (
            <button
              onClick={() => onSelectExperiment(nextExp.id)}
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 px-4 py-2.5 rounded-xl transition-all"
            >
              <span>Next: {nextExp.name}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onBackToOverview}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-4 py-2.5 rounded-xl transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Back to Complete Curriculum</span>
            </button>
          )}
        </div>
      </div>

      {/* Zoom Modal for Real Laboratory Image */}
      {isImageZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsImageZoomed(false)}
        >
          <div
            className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl p-4 space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white pb-2 border-b border-slate-800">
              <span className="font-bold text-sm">
                Real Laboratory Plate: {experiment.name}
              </span>
              <button
                onClick={() => setIsImageZoomed(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <img
              src={experiment.realImage.url}
              alt={experiment.name}
              className="w-full max-h-[70vh] object-contain rounded-xl"
            />
            <div className="text-slate-300 text-xs space-y-1">
              <p className="font-bold text-amber-300">{experiment.realImage.captionEn}</p>
              <p className="text-slate-400" dir="rtl">{experiment.realImage.captionAr}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
