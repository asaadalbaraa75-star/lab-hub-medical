import React, { useState } from 'react';
import {
  HISTOLOGY_PRACTICAL_SLIDES,
  HistologyPracticalSlide
} from './HistologyData';
import {
  Microscope,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  FileQuestion,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Bookmark
} from 'lucide-react';

export const HistologyPracticalMode: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<'4x' | '10x' | '40x' | '100x'>('40x');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [showQuizAnswer, setShowQuizAnswer] = useState<boolean>(false);

  const activeSlide = HISTOLOGY_PRACTICAL_SLIDES[currentSlideIndex];

  const handleNextSlide = () => {
    setCurrentSlideIndex(prev => (prev + 1) % HISTOLOGY_PRACTICAL_SLIDES.length);
    setSelectedPinId(null);
    setShowQuizAnswer(false);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex(prev => (prev - 1 + HISTOLOGY_PRACTICAL_SLIDES.length) % HISTOLOGY_PRACTICAL_SLIDES.length);
    setSelectedPinId(null);
    setShowQuizAnswer(false);
  };

  const handleReset = () => {
    setZoomLevel('40x');
    setShowLabels(true);
    setSelectedPinId(null);
    setShowQuizAnswer(false);
  };

  const selectedPin = activeSlide.labels.find(l => l.id === selectedPinId);

  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xl text-slate-100" id="histology-practical-mode-container">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                PRACTICAL IDENTIFICATION MODE — OSPE STATIONS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              وضع التعرف العملي على الشرائح (Histology Practical Identification)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Station #{activeSlide.slideNumber}: Authentic high-resolution histological specimens with interactive pinning, magnification zoom, and OSPE spotter testing.
            </p>
          </div>
        </div>

        {/* Global Controls: Quiz Mode Toggle & Station Counter */}
        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            id="toggle-quiz-mode-btn"
            onClick={() => {
              setQuizMode(!quizMode);
              setShowLabels(quizMode); // hide labels when entering quiz mode
              setShowQuizAnswer(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              quizMode
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-[#1E293B] text-amber-300 border border-amber-500/40 hover:bg-amber-500/20'
            }`}
          >
            <FileQuestion className="w-4 h-4" />
            <span>{quizMode ? 'إلغاء وضع الاختبار' : 'اختبر معرفتي (Quiz Mode)'}</span>
          </button>

          <div className="bg-[#1E293B] border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300">
            Slide {currentSlideIndex + 1} of {HISTOLOGY_PRACTICAL_SLIDES.length}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: Microscope Field & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Virtual Microscope Viewport */}
        <div className="lg:col-span-8 space-y-3">
          {/* Top Control Bar: Zoom Objectives & Pin Visibility */}
          <div className="flex items-center justify-between gap-2 flex-wrap bg-[#1E293B] p-2.5 rounded-2xl border border-[#334155] text-xs">
            {/* Magnification Objective Lenses */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-slate-400 pl-1">Objective:</span>
              {(['4x', '10x', '40x', '100x'] as const).map(mag => (
                <button
                  key={mag}
                  type="button"
                  onClick={() => setZoomLevel(mag)}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                    zoomLevel === mag
                      ? mag === '10x'
                        ? 'bg-yellow-500 text-slate-950 shadow-sm'
                        : mag === '40x'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : mag === '100x'
                        ? 'bg-slate-200 text-slate-950 shadow-sm'
                        : 'bg-red-500 text-white shadow-sm'
                      : 'bg-[#0F172A] text-slate-300 border border-slate-700 hover:text-white'
                  }`}
                >
                  {mag}
                </button>
              ))}
            </div>

            {/* Label Reveal/Hide & Reset Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="toggle-labels-visibility-btn"
                onClick={() => setShowLabels(!showLabels)}
                className="px-3 py-1 rounded-lg bg-[#0F172A] border border-slate-700 hover:border-slate-500 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {showLabels ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{showLabels ? 'إخفاء الأسماء' : 'إظهار الأسماء'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="إعادة ضبط المجهر"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Virtual Slide Field Circular/Rectangular Viewport */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-slate-700 bg-black shadow-inner select-none group">
            {/* Background Micrograph Image */}
            <img
              src={activeSlide.zoomLevels[zoomLevel]}
              alt={activeSlide.tissueNameEn}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                zoomLevel === '100x' ? 'scale-150' : zoomLevel === '40x' ? 'scale-110' : zoomLevel === '10x' ? 'scale-100' : 'scale-90'
              }`}
              style={{ filter: 'contrast(1.08) brightness(1.02)' }}
            />

            {/* Lens Vignette & Circular Aperture Overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />

            {/* Microscope Calibration Reticle (Crosshairs) Watermark */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-mono text-cyan-300">
              Mag: {zoomLevel} • {activeSlide.stainUsed}
            </div>

            {/* Interactive Anatomical Pins */}
            {showLabels &&
              activeSlide.labels.map((label, index) => {
                const isSelected = selectedPinId === label.id;

                return (
                  <button
                    key={label.id}
                    type="button"
                    id={`slide-pin-${label.id}`}
                    onClick={() => setSelectedPinId(label.id)}
                    style={{ left: `${label.x}%`, top: `${label.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group/pin transition-transform"
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className="absolute w-8 h-8 rounded-full bg-cyan-400/40 animate-ping" />
                      )}

                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shadow-xl border ${
                          isSelected
                            ? 'bg-cyan-400 text-slate-950 border-white ring-2 ring-cyan-400/60 scale-125'
                            : 'bg-slate-900/90 text-cyan-300 border-cyan-400/70 group-hover/pin:scale-110'
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* Hover Tooltip */}
                      <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none bg-slate-950/95 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap z-30 shadow-lg">
                        {label.nameEn}
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Navigation Between Slides */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handlePrevSlide}
              className="px-4 py-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>الشريحة السابقة</span>
            </button>

            {/* Quick Slide Number Dots */}
            <div className="flex items-center gap-1.5">
              {HISTOLOGY_PRACTICAL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setSelectedPinId(null);
                    setShowQuizAnswer(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'bg-cyan-400 w-6'
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNextSlide}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-600/30 cursor-pointer"
            >
              <span>الشريحة التالية</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 4 Cols: Diagnostic Dossier & OSPE Spotter Station */}
        <div className="lg:col-span-4 space-y-4">
          {/* Slide Identification Info */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 space-y-3.5 shadow-lg">
            <div className="border-b border-[#334155] pb-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0F172A] border border-slate-700 text-cyan-300">
                  SLIDE STATION #{activeSlide.slideNumber}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {activeSlide.stainUsed}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight pt-1">
                {activeSlide.tissueNameEn}
              </h3>
              <p className="text-xs font-semibold text-cyan-400 font-arabic">
                {activeSlide.tissueNameAr}
              </p>
            </div>

            {/* Specimen Source & Key Diagnostic Feature */}
            <div className="space-y-2 text-xs">
              <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-700/60">
                <div className="font-bold text-slate-400 mb-0.5">العضو ومصدر العينة (Specimen Source):</div>
                <div className="font-semibold text-slate-200">{activeSlide.specimenSource}</div>
              </div>

              <div className="bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-500/20">
                <div className="font-bold text-cyan-300 mb-0.5">العلامة التشخيصية الفارقة (Diagnostic Clue):</div>
                <div className="text-cyan-100/90 leading-relaxed">{activeSlide.characteristicDiagnosticFeature}</div>
              </div>
            </div>

            {/* Selected Pin Deep Detail */}
            {selectedPin ? (
              <div className="bg-[#0F172A] border border-cyan-500/40 p-3 rounded-xl space-y-1 animate-in fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-300">التركيب المشار إليه بالرقم:</span>
                  <span className="font-mono text-cyan-400 text-[11px]">Pin Info</span>
                </div>
                <div className="text-sm font-bold text-white">{selectedPin.nameEn}</div>
                <div className="text-xs font-arabic text-cyan-300">{selectedPin.nameAr}</div>
                <p className="text-xs text-slate-300 pt-1 leading-relaxed border-t border-slate-800">
                  {selectedPin.description}
                </p>
              </div>
            ) : (
              <div className="bg-[#0F172A]/50 border border-slate-800 p-2.5 rounded-xl text-center text-xs text-slate-400">
                انقر على أي رقم فوق الشريحة لعرض الشرح التفصيلي للتركيب
              </div>
            )}
          </div>

          {/* OSPE Spotter Exam Station Card */}
          <div className="bg-[#1E293B] border border-amber-500/40 rounded-2xl p-5 space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#334155] pb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <FileQuestion className="w-4 h-4 text-amber-400" />
                <span>محطة الامتحان العملي (OSPE Station):</span>
              </div>
              <button
                type="button"
                id="toggle-ospe-answer-btn"
                onClick={() => setShowQuizAnswer(!showQuizAnswer)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors cursor-pointer"
              >
                {showQuizAnswer ? 'إخفاء الحل' : 'كشف الحل النموذجي'}
              </button>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed font-medium">
              {activeSlide.ospeQuestion.prompt}
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-700/70">
                <div className="font-bold text-slate-200">{activeSlide.ospeQuestion.questionA}</div>
                {showQuizAnswer && (
                  <div className="text-emerald-300 font-bold mt-1 pl-2 border-l-2 border-emerald-400">
                    {activeSlide.ospeQuestion.answerA}
                  </div>
                )}
              </div>

              <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-700/70">
                <div className="font-bold text-slate-200">{activeSlide.ospeQuestion.questionB}</div>
                {showQuizAnswer && (
                  <div className="text-emerald-300 font-bold mt-1 pl-2 border-l-2 border-emerald-400">
                    {activeSlide.ospeQuestion.answerB}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
