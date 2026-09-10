import React, { useState } from 'react';
import {
  EPITHELIAL_TISSUE_DATA,
  EpithelialTissueStudy
} from './HistologyData';
import {
  Grid,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  Eye,
  Building,
  Target,
  FileQuestion
} from 'lucide-react';

interface Props {
  onOpenSlideViewer?: (slideId: string) => void;
}

export const EpithelialTissueLab: React.FC<Props> = ({ onOpenSlideViewer }) => {
  const [selectedTypeNumber, setSelectedTypeNumber] = useState<number>(1);
  const [filterCategory, setFilterCategory] = useState<'all' | 'simple' | 'stratified' | 'specialized'>('all');
  const [showExamAnswer, setShowExamAnswer] = useState<boolean>(false);

  const selectedTissue = EPITHELIAL_TISSUE_DATA.find(t => t.typeNumber === selectedTypeNumber) || EPITHELIAL_TISSUE_DATA[0];

  const filteredTissues = EPITHELIAL_TISSUE_DATA.filter(t => {
    if (filterCategory === 'all') return true;
    return t.category === filterCategory;
  });

  const handleSelectTissue = (typeNumber: number) => {
    setSelectedTypeNumber(typeNumber);
    setShowExamAnswer(false);
  };

  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl text-slate-100" id="epithelial-tissue-container">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
            <Grid className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-950/70 border border-sky-500/30 text-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                LESSON 8 — SANA'A UNIVERSITY CURRICULUM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              النسيج الطلائي / الظهاري (Epithelial Tissue: All 9 Verified Types)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Simple, Stratified, and Specialized epithelia: Diagnostic criteria under the microscope, exact organ sources, and exam traps.
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
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-[#1E293B] text-slate-300 border border-[#334155]'
            }`}
          >
            جميع الأنواع الـ 9
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('simple')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterCategory === 'simple'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-[#1E293B] text-cyan-300 border border-cyan-500/30'
            }`}
          >
            بسيطة (Simple)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('stratified')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterCategory === 'stratified'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-[#1E293B] text-amber-300 border border-amber-500/30'
            }`}
          >
            مطبقة (Stratified)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('specialized')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterCategory === 'specialized'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-[#1E293B] text-emerald-300 border border-emerald-500/30'
            }`}
          >
            خاصة (Specialized)
          </button>
        </div>
      </div>

      {/* Main Study Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 9 Epithelial Types List */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            اختر نوع الظهارة ({filteredTissues.length}):
          </span>
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1 no-scrollbar">
            {filteredTissues.map(tissue => {
              const isSelected = tissue.typeNumber === selectedTypeNumber;
              return (
                <button
                  key={tissue.id}
                  type="button"
                  id={`epi-btn-${tissue.typeNumber}`}
                  onClick={() => handleSelectTissue(tissue.typeNumber)}
                  className={`w-full text-right p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E293B] border-sky-400 ring-2 ring-sky-500/30 shadow-lg'
                      : 'bg-[#1E293B]/60 border-[#334155] hover:bg-[#1E293B]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-900 border border-slate-700 text-slate-300">
                      Type #{tissue.typeNumber}
                    </span>
                    <span className="text-[11px] font-mono text-sky-400">
                      {tissue.numberOfLayers.split('(')[0]}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {tissue.nameEn}
                  </h4>
                  <p className="text-xs font-semibold text-sky-300/90 font-arabic mt-0.5">
                    {tissue.nameAr}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Epithelium Clinical Dossier */}
        <div className="lg:col-span-8 bg-[#1E293B] border border-[#334155] rounded-2xl p-6 space-y-5 shadow-lg">
          {/* Header */}
          <div className="border-b border-[#334155] pb-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#0F172A] border border-slate-700 text-sky-300">
                CATEGORY: {selectedTissue.category.toUpperCase()} EPITHELIUM
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Slide: {selectedTissue.practicalSlideTitle}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
              {selectedTissue.nameEn}
            </h3>
            <p className="text-sm font-semibold text-sky-300 font-arabic">
              {selectedTissue.nameAr}
            </p>
          </div>

          {/* Morphological Matrix: Cell Shape & Nucleus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>شكل الخلية وعدد الطبقات (Cell Shape & Layers):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedTissue.cellShape}
              </p>
            </div>

            <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1">
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>شكل وموضع النواة (Nucleus Appearance):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedTissue.nucleusAppearance}
              </p>
            </div>
          </div>

          {/* Locations & Specimen Sources from Sana'a Univ Handout */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-emerald-400" />
              <span>مواقع تواجدها في الجسم وعينات الشرائح المقررة (Sites & Slides):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedTissue.sites.map((site, idx) => (
                <div
                  key={idx}
                  className="bg-[#0F172A]/70 border border-slate-700/50 p-2.5 rounded-xl text-xs text-slate-200 flex items-start gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center font-mono text-[9px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{site}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to Identify Under Microscope */}
          <div className="bg-sky-950/30 border border-sky-500/30 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider">
              <Eye className="w-4 h-4 text-sky-400" />
              <span>كيف تتعرف عليها تحت المجهر خطوة بخطوة (Microscopic Identification):</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-sky-100/95 leading-relaxed">
              {selectedTissue.howToIdentifyUnderMicroscope.map((clue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Confusion / Exam Trap */}
          <div className="bg-rose-950/30 border border-rose-500/40 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>فخ الامتحان العملي الشائع (Exam Trap & Common Confusion):</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-100/95 font-medium leading-relaxed">
              {selectedTissue.commonConfusionExamTrap}
            </p>
          </div>

          {/* High-Yield OSPE Spotter Exam Question */}
          <div className="bg-[#0F172A] border border-amber-500/40 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <FileQuestion className="w-4 h-4 text-amber-400" />
                <span>سؤال عملي محاكي للامتحان (OSPE Spotter Question):</span>
              </div>
              <button
                type="button"
                onClick={() => setShowExamAnswer(!showExamAnswer)}
                className="px-3 py-1 rounded-lg text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors cursor-pointer"
              >
                {showExamAnswer ? 'إخفاء الإجابة' : 'إظهار الإجابة النموذجية'}
              </button>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-200">
              {selectedTissue.highYieldExamQuestion.question}
            </p>

            {showExamAnswer && (
              <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-lg space-y-1 text-xs sm:text-sm animate-in fade-in">
                <div className="font-bold text-amber-200">
                  الإجابة الصحيحة: {selectedTissue.highYieldExamQuestion.correctAnswer}
                </div>
                <p className="text-slate-300 text-xs">
                  {selectedTissue.highYieldExamQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
