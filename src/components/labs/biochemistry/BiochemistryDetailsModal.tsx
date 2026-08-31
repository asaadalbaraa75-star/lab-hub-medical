import React, { useState } from 'react';
import { BiochemistryTestDetail } from '../../../types';
import { BIOCHEMISTRY_DETAILED_TESTS } from '../../../data/medicalExamData';
import {
  X,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  XCircle,
  Stethoscope,
  BookOpen,
  Info,
  Layers,
  ChevronRight,
  TestTube,
  Flame,
  Clock
} from 'lucide-react';

interface BiochemistryDetailsModalProps {
  initialTestId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BiochemistryDetailsModal: React.FC<BiochemistryDetailsModalProps> = ({
  initialTestId,
  isOpen,
  onClose
}) => {
  const [selectedTestId, setSelectedTestId] = useState<string>(initialTestId || BIOCHEMISTRY_DETAILED_TESTS[0].id);

  if (!isOpen) return null;

  const currentTest = BIOCHEMISTRY_DETAILED_TESTS.find(t => t.id === selectedTestId) || BIOCHEMISTRY_DETAILED_TESTS[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                Medical Biochemistry Laboratory Guide
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-100">
                الدليل الطبي للتجارب والتفاعلات البيوكيميائية
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Test Navigation Tabs & Content */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-200">
          {/* Left Test Tabs Sidebar (md:w-72) */}
          <div className="md:w-72 bg-slate-50/80 p-3 space-y-1.5 overflow-y-auto shrink-0 border-r border-slate-200">
            <div className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              التجارب الكيميائية ({BIOCHEMISTRY_DETAILED_TESTS.length})
            </div>

            {BIOCHEMISTRY_DETAILED_TESTS.map(test => {
              const isSelected = test.id === currentTest.id;
              return (
                <button
                  key={test.id}
                  type="button"
                  onClick={() => setSelectedTestId(test.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-amber-500 text-white font-bold shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {test.testNumber}
                    </span>
                    <div>
                      <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {test.testNameEnglish}
                      </div>
                      <div className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                        {test.titleArabic.split('(')[0]}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Main Detailed Test Specifications (flex-1) */}
          <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto bg-white">
            {/* Header of Active Test */}
            <div className="border-b border-slate-200 pb-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  TEST #{currentTest.testNumber} • {currentTest.category.toUpperCase().replace('_', ' ')}
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900">
                {currentTest.titleArabic}
              </h1>
              <p className="text-sm font-bold text-amber-700 font-mono">
                {currentTest.testNameEnglish}
              </p>
            </div>

            {/* Visual Reaction Simulation Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Visual Reaction Simulation (محاكاة أنبوبة الاختبار)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Positive Tube Card */}
                <div className="bg-slate-800/80 rounded-xl p-4 border border-emerald-500/30 flex items-center gap-4">
                  <div
                    className="w-8 h-20 rounded-b-xl border-2 border-white/20 flex flex-col justify-end p-1 shadow-inner relative overflow-hidden shrink-0"
                    style={{ backgroundColor: currentTest.testTubeState.positiveColor }}
                  >
                    {currentTest.testTubeState.hasRing && (
                      <div
                        className="absolute inset-x-0 top-1/2 h-2.5 shadow-sm"
                        style={{ backgroundColor: currentTest.testTubeState.ringColor || '#a855f7' }}
                      />
                    )}
                    {currentTest.testTubeState.hasPrecipitate && (
                      <div className="w-full h-3 bg-red-800 rounded-b-md opacity-80" />
                    )}
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>النتيجة الإيجابية (Positive)</span>
                    </div>
                    <p className="text-slate-200 font-semibold">{currentTest.positiveResult.appearance}</p>
                    <p className="text-slate-400 text-[11px]">{currentTest.positiveResult.explanation}</p>
                  </div>
                </div>

                {/* Negative Tube Card */}
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 flex items-center gap-4">
                  <div
                    className="w-8 h-20 rounded-b-xl border-2 border-white/20 flex flex-col justify-end p-1 shadow-inner shrink-0"
                    style={{ backgroundColor: currentTest.testTubeState.negativeColor }}
                  />

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                      <XCircle className="w-4 h-4 text-slate-400" />
                      <span>النتيجة السلبية (Negative)</span>
                    </div>
                    <p className="text-slate-300 font-semibold">{currentTest.negativeResult.appearance}</p>
                    <p className="text-slate-400 text-[11px]">{currentTest.negativeResult.explanation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 1. الهدف من التجربة (Objective) */}
            <section className="space-y-1.5">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>1. الهدف من التجربة (Objective)</span>
              </h3>
              <p className="text-sm text-slate-700 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60 leading-relaxed font-medium">
                {currentTest.objective}
              </p>
            </section>

            {/* 2. المبدأ العلمي (Principle) */}
            <section className="space-y-1.5">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>2. المبدأ العلمي للتفاعل (Scientific Principle)</span>
              </h3>
              <div className="text-sm text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed font-medium">
                <p className="font-mono text-xs text-indigo-900 bg-indigo-50/80 p-2.5 rounded-lg border border-indigo-100 mb-2">
                  {currentTest.principle}
                </p>
              </div>
            </section>

            {/* 3. الكواشف والمحاليل (Reagents) */}
            <section className="space-y-1.5">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                <span>3. الكواشف والمحاليل (Reagents Required)</span>
              </h3>
              <ul className="space-y-1.5">
                {currentTest.reagents.map((reagent, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 bg-teal-50/50 p-2.5 rounded-xl border border-teal-200/60 flex items-start gap-2">
                    <FlaskConical className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{reagent}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. خطوات العمل (Procedure) */}
            <section className="space-y-2">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>4. خطوات التجربة المعملية (Laboratory Procedure)</span>
              </h3>
              <div className="space-y-2">
                {currentTest.procedure.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. التفسير الإكلينيكي والأهمية الطبية (Clinical Significance) */}
            <section className="space-y-1.5">
              <h3 className="text-sm font-black text-indigo-950 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-indigo-600" />
                <span>5. الأهمية الطبية والتشخيص السريري (Clinical Significance)</span>
              </h3>
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
                {currentTest.clinicalSignificance}
              </div>
            </section>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-mono">
            Medical Faculty • Biochemistry Department Practical Curriculum
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
          >
            إغلاق الدليل
          </button>
        </div>
      </div>
    </div>
  );
};
