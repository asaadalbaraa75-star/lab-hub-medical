import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Award,
  ArrowRight,
  Eye,
  Shuffle
} from 'lucide-react';
import { HistologySlideViewer } from './HistologySlideViewer';
import { ALL_HISTOLOGY_LESSONS, HistologyLessonItem } from './HistologyCurriculumData';

interface ExamQuestionItem {
  id: string;
  lesson: HistologyLessonItem;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface HistologyPracticalExamViewProps {
  onBackToHome: () => void;
}

export const HistologyPracticalExamView: React.FC<HistologyPracticalExamViewProps> = ({
  onBackToHome
}) => {
  // Generate practical identification questions from all histology lessons with visual slides
  const examQuestions: ExamQuestionItem[] = useMemo(() => {
    // Collect lessons that have slides
    const slideLessons = ALL_HISTOLOGY_LESSONS.filter(l => l.sectionId !== 'sec_intro_microscopes' || l.id === 'lesson_compound_microscope');

    return slideLessons.map((lesson, idx) => {
      // Create distractors from other lesson titles
      const otherLessons = slideLessons.filter(l => l.id !== lesson.id);
      const shuffledOthers = [...otherLessons].sort(() => 0.5 - Math.random()).slice(0, 3);
      const rawOptions = [lesson.titleEn, ...shuffledOthers.map(o => o.titleEn)];
      
      // Shuffle options and remember correct index
      const shuffledOptions = [...rawOptions].sort(() => 0.5 - Math.random());
      const correctIdx = shuffledOptions.indexOf(lesson.titleEn);

      return {
        id: `exam_${idx}`,
        lesson,
        prompt: 'What tissue or structure is shown under the microscope?',
        options: shuffledOptions,
        correctIndex: correctIdx,
        explanation: `${lesson.titleEn}: ${lesson.quickExplanation} Diagnostic features: ${lesson.labels.map(l => l.label).join(', ')}.`
      };
    }).sort(() => 0.5 - Math.random());
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentQ = examQuestions[currentIndex];
  const totalQ = examQuestions.length;
  const isCorrect = selectedOption === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQ - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* 1. TOP HEADER & SCORE */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <button
          onClick={onBackToHome}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-teal-400" />
          <span>Exit Exam Mode</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">
            Slide {currentIndex + 1} of {totalQ}
          </span>
          <div className="px-3 py-1 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold font-mono">
            Score: {score} / {currentIndex + (isSubmitted ? 1 : 0)}
          </div>
        </div>
      </div>

      {/* 2. TITLE BADGE */}
      <div className="text-center space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center justify-center gap-2">
          <span>🔬 IDENTIFY THE SLIDE</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          First-Year Medical Practical Examination — Faculty Handout
        </p>
      </div>

      {/* 3. LARGE MICROSCOPIC IMAGE (BLIND PRACTICE MODE) */}
      <div className="space-y-3">
        <HistologySlideViewer
          visualId={currentQ.lesson.visualId}
          titleEn={currentQ.lesson.titleEn}
          stain={currentQ.lesson.stain}
          magnification={currentQ.lesson.magnification}
          specimen={isSubmitted ? currentQ.lesson.specimen : 'Specimen Hidden'}
          mode="practice"
          labels={currentQ.lesson.labels}
          showLabelsDefault={false}
        />
      </div>

      {/* 4. MULTIPLE CHOICE QUESTION CARD */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-sm sm:text-base font-bold text-white">
          {currentQ.prompt}
        </h3>

        {/* 4 Options (A, B, C, D) */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedOption === optIdx;
            let optStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';

            if (isSubmitted) {
              if (optIdx === currentQ.correctIndex) {
                optStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected && !isCorrect) {
                optStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
              } else {
                optStyle = 'bg-slate-950/40 border-slate-900 text-slate-500';
              }
            } else if (isSelected) {
              optStyle = 'bg-teal-950/50 border-teal-500 text-teal-200 font-semibold';
            }

            return (
              <button
                key={optIdx}
                disabled={isSubmitted}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg border border-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isSubmitted && optIdx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                )}
                {isSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Submit & Next Actions */}
        <div className="pt-2 flex items-center justify-between">
          {!isSubmitted ? (
            <button
              disabled={selectedOption === null}
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              Submit Identification
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-lg"
            >
              <span>Next Slide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {isSubmitted && (
            <span className="text-xs font-bold italic text-teal-400">
              {isCorrect ? '✓ Excellent identification!' : 'Keep going. You are improving.'}
            </span>
          )}
        </div>

        {/* Explanation Banner */}
        {isSubmitted && (
          <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
            isCorrect ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-rose-950/30 border-rose-500/40'
          }`}>
            <div className="flex items-center gap-2 font-bold">
              {isCorrect ? (
                <span className="text-emerald-400 flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  ✓ Correct Identification!
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1.5 text-sm">
                  <XCircle className="w-4 h-4" />
                  ✕ Incorrect Slide
                </span>
              )}
            </div>
            <p className="text-slate-200 leading-relaxed font-normal">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
