import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Bookmark,
  Award,
  ArrowRight
} from 'lucide-react';
import { QuizSlideData } from './HistologyLessonsData';

interface HistologyQuizSlideProps {
  data: QuizSlideData;
  onNextSlide?: () => void;
}

export const HistologyQuizSlide: React.FC<HistologyQuizSlideProps> = ({ data, onNextSlide }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasRevealed, setHasRevealed] = useState<boolean>(false);

  const isAnswered = selectedOption !== null || hasRevealed;
  const isCorrect = selectedOption === data.correctIndex;

  const handleSelect = (idx: number) => {
    if (hasRevealed) return;
    setSelectedOption(idx);
  };

  const handleReveal = () => {
    setHasRevealed(true);
    setSelectedOption(data.correctIndex);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasRevealed(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: THE MYSTERY HISTOLOGICAL SLIDE (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col space-y-3">
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
          <img
            src={data.image}
            alt={data.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" />

          {/* Top Banner: OSPE Station Badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500 text-slate-950 shadow-md">
              Practical Spotter Exam
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/80 text-slate-300 border border-slate-700 backdrop-blur-md">
              Magnification: 40x High Power
            </span>
          </div>

          {/* Bottom Banner on Image */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs text-slate-200">
              {data.prompt}
            </div>
          </div>
        </div>

        {/* Quick Helper Text */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Test your spotter recognition before revealing the answer</span>
          {!isAnswered ? (
            <button
              onClick={handleReveal}
              className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 transition"
            >
              <Eye className="w-3.5 h-3.5" />
              Reveal Identification Directly
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Question
            </button>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: QUESTION & REAL DIAGNOSTIC BREAKDOWN (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        {/* Question Header */}
        <div className="space-y-1.5 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            Identification Question
          </div>
          <h3 className="text-base font-bold text-white leading-snug">
            {data.question}
          </h3>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-2">
          {data.options.map((option, idx) => {
            const isThisSelected = selectedOption === idx;
            const isThisCorrect = idx === data.correctIndex;

            let buttonStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-700';

            if (isAnswered) {
              if (isThisCorrect) {
                buttonStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
              } else if (isThisSelected && !isThisCorrect) {
                buttonStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
              } else {
                buttonStyle = 'bg-slate-900/40 border-slate-850 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start justify-between gap-3 ${buttonStyle}`}
              >
                <span>{option}</span>
                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* FEEDBACK & DIAGNOSTIC CARD (Shown when answered or revealed) */}
        {isAnswered && (
          <div className="p-4 bg-slate-900 border border-teal-500/40 rounded-2xl space-y-3 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Official Identification
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-black ${
                  isCorrect
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {isCorrect ? 'Correct Diagnosis' : 'Answer Revealed'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Correct Answer:</span>
                <span className="text-sm font-bold text-white block">
                  {data.answerTitle}
                </span>
              </div>

              <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800 space-y-1">
                <span className="text-teal-400 font-bold block text-[11px]">
                  Stain Identified:
                </span>
                <span className="text-slate-200">{data.stainUsed}</span>
              </div>

              <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block text-[11px]">
                  Diagnostic Microscopic Clue:
                </span>
                <span className="text-slate-200">{data.identificationClue}</span>
              </div>

              <div className="text-slate-300 leading-relaxed text-[11px]">
                <strong className="text-slate-100">Why: </strong>
                {data.diagnosticReason}
              </div>

              <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-200 font-bold flex items-start gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{data.examPearl}</span>
              </div>
            </div>

            {onNextSlide && (
              <button
                onClick={onNextSlide}
                className="w-full mt-2 py-2.5 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Continue to Summary Table</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
