/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Practical Examination / Tests Section
 * 
 * STRICT ACADEMIC STANDARD:
 * Question ↔ Verified Image ↔ Structure to Identify ↔ Interactive Options ↔ Instant Feedback ↔ Simple Explanation ↔ Final Score
 */

import React, { useState } from 'react';
import {
  AnatomyPracticalTestQuestion,
  ANATOMY_PRACTICAL_TEST_QUESTIONS
} from './AnatomyCurriculumData';
import { MedicalImageSourceBadge } from '../../common/MedicalImageSourceBadge';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  ShieldCheck,
  Target,
  Sparkles,
  ArrowRight,
  Eye
} from 'lucide-react';

interface AnatomyTestsSectionProps {
  onBackToMain?: () => void;
}

export const AnatomyTestsSection: React.FC<AnatomyTestsSectionProps> = ({
  onBackToMain
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const questions = ANATOMY_PRACTICAL_TEST_QUESTIONS;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (opt: string) => {
    if (submittedAnswers[currentIdx]) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: opt }));
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswers[currentIdx]) return;
    setSubmittedAnswers(prev => ({ ...prev, [currentIdx]: true }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleRetakeTest = () => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setCurrentIdx(0);
    setShowSummary(false);
  };

  // Calculate score
  const correctCount = questions.reduce((acc, q, idx) => {
    if (submittedAnswers[idx] && selectedAnswers[idx] === q.correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const percentage = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase tracking-wider">
              Anatomy Lab · Spotter Practical Exam
            </span>
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-400 shrink-0" />
            <span>PRACTICAL ANATOMY SPOTTER EXAM</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            اختبار عملي يحاكي امتحان التشريح في الكلية: كل سؤال مرتبط بصورة طبية حقيقية تحدد التركيب المطلوب مع تصحيح فوري وشرح مبسط.
          </p>
        </div>

        {onBackToMain && (
          <button
            type="button"
            onClick={onBackToMain}
            className="self-start md:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Back to Anatomy Hub</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
          </button>
        )}
      </div>

      {!showSummary ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-6 p-5 sm:p-7">
          {/* Progress and Counter */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Topic: {currentQ.topic}
              </span>
            </div>

            {/* Jump Pills */}
            <div className="flex items-center gap-1">
              {questions.map((_, i) => {
                const isAnswered = submittedAnswers[i];
                const isCorrect = selectedAnswers[i] === questions[i].correctAnswer;
                let pillColor = 'bg-slate-800 text-slate-400';
                if (isAnswered) {
                  pillColor = isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white';
                } else if (i === currentIdx) {
                  pillColor = 'bg-slate-700 text-white ring-1 ring-emerald-400';
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIdx(i)}
                    className={`w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center cursor-pointer transition-colors ${pillColor}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Question Layout: Left Image / Right Question and Options */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Image (Strictly Real and Verified) */}
            <div className="lg:col-span-6 relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={currentQ.imageUrl}
                alt={currentQ.structureTarget}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 z-10">
                <MedicalImageSourceBadge
                  source={currentQ.imageSource}
                  verified={true}
                />
              </div>

              <div className="absolute bottom-3 left-3 right-3 z-10 bg-slate-900/90 backdrop-blur-sm p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                  Target Specimen to Identify:
                </span>
                <span className="text-xs text-white font-medium">
                  Observe the anatomical structure indicated in this authentic specimen.
                </span>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* Question Prompt */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Spotter Question
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {currentQ.question}
                  </h3>
                  {currentQ.questionAr && (
                    <p className="text-xs text-slate-400 font-medium">
                      {currentQ.questionAr}
                    </p>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentIdx] === opt;
                    const isSubmitted = submittedAnswers[currentIdx];
                    const isCorrect = opt === currentQ.correctAnswer;

                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white';

                    if (isSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {isSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card (After Submission) */}
                {submittedAnswers[currentIdx] && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 animate-in fade-in duration-150 ${
                    selectedAnswers[currentIdx] === currentQ.correctAnswer
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold">
                      {selectedAnswers[currentIdx] === currentQ.correctAnswer ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Correct! Identified: {currentQ.structureTarget}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span>Incorrect! Correct structure: {currentQ.correctAnswer}</span>
                        </>
                      )}
                    </div>
                    <p className="pt-1 text-slate-300">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons: Submit / Prev / Next */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {!submittedAnswers[currentIdx] ? (
                    <button
                      type="button"
                      disabled={!selectedAnswers[currentIdx]}
                      onClick={handleSubmitAnswer}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
                    >
                      <span>{currentIdx === questions.length - 1 ? 'View Final Result' : 'Next Question'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* FINAL RESULTS SUMMARY VIEW */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700 mx-auto flex items-center justify-center shadow-lg">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Examination Complete
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Your Practical Exam Score
            </h3>
            <p className="text-sm text-slate-300">
              You answered {correctCount} out of {questions.length} spotter questions correctly ({percentage}%).
            </p>
          </div>

          {/* Performance Meter */}
          <div className="max-w-md mx-auto bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Overall Accuracy</span>
              <span className={percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}>{percentage}%</span>
            </div>
            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${percentage >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRetakeTest}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>

            {onBackToMain && (
              <button
                type="button"
                onClick={onBackToMain}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-colors border border-slate-700"
              >
                Back to Anatomy Hub
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
