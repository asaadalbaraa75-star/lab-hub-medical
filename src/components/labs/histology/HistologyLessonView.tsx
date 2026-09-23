import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  MapPin,
  Activity,
  Check,
  Award,
  FileText,
  HelpCircle,
  Target,
  Info
} from 'lucide-react';
import {
  HistologyLessonItem,
  getSlideMetadata,
  HistologySlideMetadata
} from './HistologyCurriculumData';
import { HistologySlideViewer } from './HistologySlideViewer';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';

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
  // "SEE MORE, READ LESS": Default directly to the visual slide & practical identification view
  const [activeTab, setActiveTab] = useState<'slide' | 'handout'>('slide');
  const [viewerMode, setViewerMode] = useState<'slide' | 'practice'>('slide');

  // Metadata drawer / popover state
  const [showMetadataModal, setShowMetadataModal] = useState<boolean>(false);

  // Practice Quiz Answers
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<{ [qId: string]: boolean }>({});
  const [practiceCompleted, setPracticeCompleted] = useState<boolean>(false);

  const slideMetadata: HistologySlideMetadata = getSlideMetadata(lesson);

  const handleAnswerSelect = (qId: string, optIdx: number) => {
    if (submittedQuestions[qId]) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitAnswer = (qId: string) => {
    if (selectedAnswers[qId] === undefined) return;
    setSubmittedQuestions(prev => ({ ...prev, [qId]: true }));

    const allSubmitted = lesson.practiceQuestions.every(
      q => q.id === qId || submittedQuestions[q.id]
    );
    if (allSubmitted) {
      setPracticeCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* 1. TOP HEADER & BREADCRUMB */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSection}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-teal-400" />
            <span>All Lessons</span>
          </button>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/30">
                {lesson.numberString}
              </span>
              <h1 className="text-base sm:text-lg font-bold text-white">
                {lesson.titleEn}
              </h1>
              <OwnershipWatermark variant="badge" className="text-[10px]" />
            </div>
            {lesson.titleAr && (
              <p className="text-xs text-slate-400 font-arabic">
                {lesson.titleAr}
              </p>
            )}
          </div>
        </div>

        {/* View Toggle: Visual Slide (Default) vs Faculty Handout Notes */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('slide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'slide'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Real Slide</span>
            </button>
            <button
              onClick={() => setActiveTab('handout')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'handout'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Booklet Notes</span>
            </button>
          </div>

          <button
            onClick={() => setShowMetadataModal(true)}
            title="Junqueira Reference & Verification Details"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-teal-300 border border-slate-700/80 transition-colors"
          >
            <Info className="w-4 h-4 text-teal-400" />
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. PRIMARY VIEW: REAL SLIDE & VISUAL IDENTIFICATION  */}
      {/* Follows rule 6: Title → Real Image → Clues → Practice */}
      {/* ==================================================== */}
      {activeTab === 'slide' && (
        <div className="space-y-6">
          {/* A. SHORT 1-SENTENCE DEFINITION (Simple, clean, no walls of text) */}
          <div className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-2">
            <span className="text-teal-400 font-bold shrink-0">Lesson Summary:</span>
            <span>{lesson.quickExplanation}</span>
          </div>

          {/* B. LARGE REAL MICROSCOPIC IMAGE WITH INTERACTIVE CONTROLS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-teal-400" />
                  Authentic Histological Micrograph
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Junqueira Atlas Correlated
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline font-mono">
                Pinch / Scroll to Zoom • Drag to Pan
              </span>
            </div>

            <HistologySlideViewer
              realImagePath={(lesson as any).imageUrl || (lesson as any).imageURL || lesson.realImagePath}
              imageUrl={(lesson as any).imageUrl || (lesson as any).imageURL}
              isRealMicroscopy={lesson.isRealMicroscopy ?? true}
              visualId={lesson.visualId}
              titleEn={lesson.titleEn}
              titleAr={lesson.titleAr}
              stain={lesson.stain}
              magnification={lesson.magnification}
              specimen={lesson.specimen}
              mode={viewerMode}
              labels={lesson.labels}
              showLabelsDefault={true}
              examMarker={lesson.examMarker}
              whatToLookFor={lesson.whatToLookFor}
              slideMetadata={slideMetadata}
              onToggleMode={(newMode) => setViewerMode(newMode)}
            />
          </div>

          {/* C. "WHAT SHOULD I SEE?" (2–4 Short Clues for First-Year Medical Students) */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" />
                What Should I See? (Diagnostic Recognition Clues)
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">
                First-Year Medical Lab
              </span>
            </div>

            {lesson.whatToLookFor && lesson.whatToLookFor.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {lesson.whatToLookFor.map((clue, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <span className="w-5 h-5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{clue}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Observe the cellular layout, stained nuclei, and extracellular matrix boundaries.
              </p>
            )}

            {/* Labeled Structures Summary Bar */}
            {lesson.labels.length > 0 && (
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Key Visible Structures on this Slide:
                </span>
                <div className="flex flex-wrap gap-2">
                  {lesson.labels.map((lbl, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs bg-slate-950 border border-slate-800 text-slate-200 flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-teal-400" />
                      <span className="font-semibold">{lbl.label}</span>
                      {lbl.clue && (
                        <span className="text-slate-400 text-[10px] hidden md:inline">
                          ({lbl.clue})
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* D. ONE PRACTICAL IDENTIFICATION QUESTION (Test your eye right away) */}
          {lesson.practiceQuestions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  Microscopic Practical Question (Exam Check)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  From Faculty Lab Handout
                </span>
              </div>

              {lesson.practiceQuestions.slice(0, 1).map((q) => {
                const selectedOpt = selectedAnswers[q.id];
                const isSubmitted = submittedQuestions[q.id];
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
                        Exam Q
                      </span>
                      <h3 className="text-xs sm:text-sm font-semibold text-slate-100 leading-relaxed">
                        {q.question}
                      </h3>
                    </div>

                    {/* Options */}
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        let optionStyle =
                          'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';

                        if (isSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle =
                              'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-bold';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-300';
                          } else {
                            optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500';
                          }
                        } else if (isSelected) {
                          optionStyle =
                            'bg-teal-950/50 border-teal-500 text-teal-200 font-semibold';
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

                    {/* Submit or Explanation */}
                    {!isSubmitted ? (
                      <button
                        disabled={selectedOpt === undefined}
                        onClick={() => handleSubmitAnswer(q.id)}
                        className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 text-xs font-bold transition-all shadow"
                      >
                        Confirm Answer
                      </button>
                    ) : (
                      <div
                        className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                          isCorrect
                            ? 'bg-emerald-950/30 border-emerald-500/40'
                            : 'bg-rose-950/30 border-rose-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold">
                          {isCorrect ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              ✓ Correct Identification!
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" />
                              ✕ Incorrect
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
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* 3. FACULTY BOOKLET NOTES (Reference Details)        */}
      {/* ==================================================== */}
      {activeTab === 'handout' && (
        <div className="space-y-6">
          {/* Quick Explanation */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-teal-500/20 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Faculty Handout Summary (Dr. Ruqia Y. Sharaf Addin)
            </span>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              {lesson.quickExplanation}
            </p>
            {lesson.quickExplanationAr && (
              <p className="text-xs sm:text-sm text-teal-300/90 leading-relaxed font-arabic pt-1">
                {lesson.quickExplanationAr}
              </p>
            )}
          </div>

          {/* Key Points */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Key Points from the Practical Booklet
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

          {/* Shape / Locations / Functions */}
          {(lesson.shape || (lesson.location && lesson.location.length > 0) || (lesson.function && lesson.function.length > 0)) && (
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

          {/* Important Terms */}
          {lesson.importantTerms && lesson.importantTerms.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Important Histological Terms
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

          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab('slide')}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
            >
              <span>Back to Real Slide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 4. METADATA & JUNQUEIRA VERIFICATION MODAL          */}
      {/* ==================================================== */}
      {showMetadataModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white">
                  Slide Verification & Junqueira Reference
                </h3>
              </div>
              <button
                onClick={() => setShowMetadataModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Histology Reference (Junqueira)
                </span>
                <p className="text-teal-300 font-semibold">{slideMetadata.reference}</p>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Source Institution / Provenance
                </span>
                <p className="text-white">{slideMetadata.sourceInstitution}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Tissue Specimen
                  </span>
                  <p className="text-slate-200">{slideMetadata.tissueName}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Histological Stain
                  </span>
                  <p className="text-slate-200">{slideMetadata.stain}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Magnification
                  </span>
                  <p className="text-slate-200 font-mono">{slideMetadata.magnification}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    License & Usage Status
                  </span>
                  <p className="text-emerald-400 font-medium">{slideMetadata.license}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                Verified authentic microscopy image for first-year medical histology training. Artificial cell schematics and AI-generated hallucinations are strictly prohibited.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. BOTTOM NAVIGATION: PREVIOUS / NEXT LESSON */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        {onPrevLesson ? (
          <button
            onClick={onPrevLesson}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-teal-400" />
            <span>Previous Lesson</span>
          </button>
        ) : (
          <div />
        )}

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
            <span>Back to All Sections</span>
          </button>
        )}
      </div>

      {/* Platform Ownership Notice */}
      <div className="pt-2 flex justify-center">
        <OwnershipWatermark variant="minimal" />
      </div>
    </div>
  );
};
