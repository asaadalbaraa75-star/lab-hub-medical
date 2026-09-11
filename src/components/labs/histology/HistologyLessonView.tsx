import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Layers,
  MapPin,
  Activity,
  Check,
  RotateCcw,
  Target,
  Award
} from 'lucide-react';
import { HistologyLessonItem, HistologyLabel } from './HistologyCurriculumData';
import { HistologySlideViewer } from './HistologySlideViewer';

interface HistologyLessonViewProps {
  lesson: HistologyLessonItem;
  onBackToSection: () => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

export const HistologyLessonView: React.FC<HistologyLessonViewProps> = ({
  lesson,
  onBackToSection,
  onNextLesson,
  onPrevLesson
}) => {
  // 3 Clean Tabs requested by user: 'learn' | 'slide' | 'practice'
  const [activeTab, setActiveTab] = useState<'learn' | 'slide' | 'practice'>('learn');

  // Progress Tracking: LEARN ✓ | SLIDE ✓ | PRACTICE ○ | COMPLETE ○
  const [hasVisitedLearn, setHasVisitedLearn] = useState<boolean>(true);
  const [hasVisitedSlide, setHasVisitedSlide] = useState<boolean>(false);
  const [practiceCompleted, setPracticeCompleted] = useState<boolean>(false);

  // Practice Quiz Answers
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<{ [qId: string]: boolean }>({});

  const handleTabChange = (tab: 'learn' | 'slide' | 'practice') => {
    setActiveTab(tab);
    if (tab === 'slide') setHasVisitedSlide(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerSelect = (qId: string, optIdx: number) => {
    if (submittedQuestions[qId]) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitAnswer = (qId: string) => {
    if (selectedAnswers[qId] === undefined) return;
    setSubmittedQuestions(prev => ({ ...prev, [qId]: true }));

    // Check if all practice questions for this lesson are submitted
    const allSubmitted = lesson.practiceQuestions.every(
      q => q.id === qId || submittedQuestions[q.id]
    );
    if (allSubmitted) {
      setPracticeCompleted(true);
    }
  };

  const isLessonComplete = hasVisitedLearn && hasVisitedSlide && practiceCompleted;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* 1. TOP HEADER & BREADCRUMB */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSection}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-teal-400" />
            <span>Back</span>
          </button>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/30">
                {lesson.numberString}
              </span>
              <h1 className="text-base sm:text-lg font-bold text-white">
                {lesson.titleEn}
              </h1>
            </div>
            {lesson.titleAr && (
              <p className="text-xs text-slate-400">
                {lesson.titleAr}
              </p>
            )}
          </div>
        </div>

        {/* PROGRESS STATUS: LEARN ✓ | SLIDE ✓ | PRACTICE ○ | COMPLETE ○ */}
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
          <span className="flex items-center gap-1 text-teal-400">
            <span>LEARN</span>
            <Check className="w-3.5 h-3.5 text-teal-400 stroke-[3]" />
          </span>
          <span className="text-slate-600">|</span>
          <span className={`flex items-center gap-1 ${hasVisitedSlide ? 'text-teal-400' : 'text-slate-500'}`}>
            <span>SLIDE</span>
            {hasVisitedSlide ? <Check className="w-3.5 h-3.5 text-teal-400 stroke-[3]" /> : <span>○</span>}
          </span>
          <span className="text-slate-600">|</span>
          <span className={`flex items-center gap-1 ${practiceCompleted ? 'text-teal-400' : 'text-slate-500'}`}>
            <span>PRACTICE</span>
            {practiceCompleted ? <Check className="w-3.5 h-3.5 text-teal-400 stroke-[3]" /> : <span>○</span>}
          </span>
          <span className="text-slate-600">|</span>
          <span className={`flex items-center gap-1 ${isLessonComplete ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
            <span>COMPLETE</span>
            {isLessonComplete ? <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> : <span>○</span>}
          </span>
        </div>
      </div>

      {/* 2. THE THREE CLEAN TABS: LEARN | SLIDE | PRACTICE */}
      <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
        <button
          onClick={() => handleTabChange('learn')}
          className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'learn'
              ? 'bg-teal-500 text-slate-950 shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>LEARN</span>
        </button>

        <button
          onClick={() => handleTabChange('slide')}
          className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'slide'
              ? 'bg-teal-500 text-slate-950 shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>SLIDE</span>
        </button>

        <button
          onClick={() => handleTabChange('practice')}
          className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'practice'
              ? 'bg-teal-500 text-slate-950 shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>PRACTICE</span>
        </button>
      </div>

      {/* 3. TAB CONTENT VIEWS */}

      {/* ==================================================== */}
      {/* TAB 1: LEARN */}
      {/* ==================================================== */}
      {activeTab === 'learn' && (
        <div className="space-y-6">
          {/* 01 — QUICK EXPLANATION */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-teal-500/20 space-y-2 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              01 — Quick Explanation
            </span>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              {lesson.quickExplanation}
            </p>
            {lesson.quickExplanationAr && (
              <p className="text-xs sm:text-sm text-teal-300/90 leading-relaxed font-normal pt-1">
                {lesson.quickExplanationAr}
              </p>
            )}
          </div>

          {/* 02 — KEY POINTS */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              02 — Key Points
            </span>
            <ul className="space-y-2.5">
              {lesson.keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SHAPE / LOCATION / FUNCTION BREAKDOWN (if applicable) */}
          {(lesson.shape || lesson.location || lesson.function) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lesson.shape && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                    Cellular Shape
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lesson.shape}
                  </p>
                </div>
              )}

              {lesson.location && lesson.location.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Locations
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {lesson.location.map((loc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-400">•</span>
                        <span>{loc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {lesson.function && lesson.function.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" />
                    Function
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {lesson.function.map((fn, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-400">•</span>
                        <span>{fn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 03 — IMPORTANT TERMS */}
          {lesson.importantTerms.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                03 — Important Terms
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.importantTerms.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-300">{t.term}</span>
                      {t.termAr && <span className="text-[11px] text-slate-400 font-arabic">{t.termAr}</span>}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 08 — MOTIVATION */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔬</span>
              <p className="text-xs sm:text-sm font-semibold text-teal-200 italic">
                "{lesson.motivation}"
              </p>
            </div>
            <button
              onClick={() => handleTabChange('slide')}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
            >
              <span>View Slide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: SLIDE */}
      {/* ==================================================== */}
      {activeTab === 'slide' && (
        <div className="space-y-6">
          {/* 04 — HISTOLOGY IMAGE WITH VIEWER */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                04 — Histology Image (Real Microscopic View)
              </span>
              <span className="text-xs text-slate-400">
                Use controls below image to zoom and inspect
              </span>
            </div>

            <HistologySlideViewer
              visualId={lesson.visualId}
              titleEn={lesson.titleEn}
              titleAr={lesson.titleAr}
              stain={lesson.stain}
              magnification={lesson.magnification}
              specimen={lesson.specimen}
              mode="slide"
              labels={lesson.labels}
              showLabelsDefault={true}
            />
          </div>

          {/* 05 — IDENTIFICATION POINTS */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              05 — Identification Guide
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {lesson.labels.map((lbl, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-100">{lbl.label}</span>
                    {lbl.clue && (
                      <p className="text-[11px] text-slate-400 leading-snug">{lbl.clue}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action: Test eye in Practice tab */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-300">
              Ready to identify the slide without labels?
            </span>
            <button
              onClick={() => handleTabChange('practice')}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
            >
              <span>Go to Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: PRACTICE */}
      {/* ==================================================== */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* 06 — PRACTICE UNLABELED SLIDE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                06 — Practice (Labels Hidden)
              </span>
              <span className="text-xs text-slate-400">
                Identify the structure shown on the microscope
              </span>
            </div>

            {/* Same slide image with labels turned off for blind identification */}
            <HistologySlideViewer
              visualId={lesson.visualId}
              titleEn={lesson.titleEn}
              titleAr={lesson.titleAr}
              stain={lesson.stain}
              magnification={lesson.magnification}
              specimen={lesson.specimen}
              mode="practice"
              labels={lesson.labels}
              showLabelsDefault={false}
            />
          </div>

          {/* 07 — QUICK CHECK QUESTIONS */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
              07 — Quick Check (Handout-Based Practical Questions)
            </span>

            {lesson.practiceQuestions.map((q, qIndex) => {
              const selectedOpt = selectedAnswers[q.id];
              const isSubmitted = submittedQuestions[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30 shrink-0">
                      Q{qIndex + 1}
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-100 leading-relaxed">
                      {q.question}
                    </h3>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let optionStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionStyle = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-300';
                        } else {
                          optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-teal-950/50 border-teal-500 text-teal-200 font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleAnswerSelect(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-md border border-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isSubmitted && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                          {isSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit Button or Explanation */}
                  {!isSubmitted ? (
                    <button
                      disabled={selectedOpt === undefined}
                      onClick={() => handleSubmitAnswer(q.id)}
                      className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 text-xs font-bold transition-all shadow"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      isCorrect ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-rose-950/30 border-rose-500/40'
                    }`}>
                      <div className="flex items-center gap-2 font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            ✓ Correct!
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" />
                            ✕ Try Again
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 leading-relaxed font-normal">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Completion Celebration if practice is complete */}
          {practiceCompleted && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-950/50 via-slate-900 to-slate-900 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="space-y-1">
                <span className="text-xs font-bold text-teal-400 flex items-center justify-center sm:justify-start gap-1.5 font-mono">
                  <Award className="w-4 h-4" />
                  PRACTICE COMPLETED
                </span>
                <p className="text-sm font-bold text-white">
                  "🧠 Your microscopic eye is getting stronger."
                </p>
                <p className="text-xs text-slate-400">
                  You have successfully completed this lesson.
                </p>
              </div>

              {onNextLesson && (
                <button
                  onClick={onNextLesson}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-lg shrink-0"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. BOTTOM LESSON NAVIGATION (Previous / Next) */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        {onPrevLesson ? (
          <button
            onClick={onPrevLesson}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-teal-400" />
            <span>Previous Lesson</span>
          </button>
        ) : <div />}

        {onNextLesson ? (
          <button
            onClick={onNextLesson}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors shadow"
          >
            <span>Next Lesson</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={onBackToSection}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-800 transition-colors"
          >
            <span>Back to Sections</span>
          </button>
        )}
      </div>
    </div>
  );
};
