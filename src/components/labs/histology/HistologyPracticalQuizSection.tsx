import React, { useState } from 'react';
import { HistologyQuizBlock } from '../../../data/histologyJsonData';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Award,
  RotateCcw,
  Sparkles,
  Microscope,
  Info
} from 'lucide-react';

interface HistologyPracticalQuizSectionProps {
  quizBlocks: HistologyQuizBlock[];
  chapterTitle?: string;
}

export const HistologyPracticalQuizSection: React.FC<HistologyPracticalQuizSectionProps> = ({
  quizBlocks,
  chapterTitle
}) => {
  const [userAnswers, setUserAnswers] = useState<{ [qIndex: number]: number }>({});
  const [revealed, setRevealed] = useState<{ [qIndex: number]: boolean }>({});

  if (!quizBlocks || quizBlocks.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
        لا توجد أسئلة عملية متاحة لهذا الفصل حالياً.
      </div>
    );
  }

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setRevealed(prev => ({ ...prev, [qIdx]: true }));
  };

  const handleReset = (qIdx: number) => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[qIdx];
      return copy;
    });
    setRevealed(prev => {
      const copy = { ...prev };
      delete copy[qIdx];
      return copy;
    });
  };

  const handleResetAll = () => {
    setUserAnswers({});
    setRevealed({});
  };

  // Determine correct option letter/index from `correct_answer`
  const getIsCorrect = (q: HistologyQuizBlock, selectedOptIdx: number): boolean => {
    const selectedLetter = String.fromCharCode(65 + selectedOptIdx); // 0->'A', 1->'B', etc.
    const cleanCorrect = q.correct_answer.trim();
    // Check if correct_answer starts with (A), A, or mentions "(A)"
    return (
      cleanCorrect.includes(`(${selectedLetter})`) ||
      cleanCorrect.startsWith(`${selectedLetter}.`) ||
      cleanCorrect.startsWith(`${selectedLetter}:`) ||
      cleanCorrect.includes(`الإجابة الصحيحة هي (${selectedLetter})`) ||
      cleanCorrect.includes(`الخيار (${selectedLetter})`)
    );
  };

  const answeredCount = Object.keys(revealed).length;
  const correctCount = Object.keys(revealed).filter(idxStr => {
    const idx = parseInt(idxStr, 10);
    return getIsCorrect(quizBlocks[idx], userAnswers[idx]);
  }).length;

  return (
    <div className="space-y-6">
      {/* Quiz Dashboard Stats Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              الاختبارات العملية والتعرف على الشرائح (MCQs Practical Spotter)
            </h3>
            <p className="text-xs text-slate-400">
              إجمالي الأسئلة: {quizBlocks.length} • تم الإجابة: {answeredCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {answeredCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 font-mono">الدرجة:</span>
              <span className="text-sm font-bold font-mono text-teal-400">
                {correctCount} / {quizBlocks.length}
              </span>
            </div>
          )}

          {answeredCount > 0 && (
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة الاختبار</span>
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {quizBlocks.map((quiz, qIdx) => {
          const isAnswered = revealed[qIdx] !== undefined;
          const selectedIdx = userAnswers[qIdx];
          const isCorrect = isAnswered ? getIsCorrect(quiz, selectedIdx) : false;

          return (
            <div
              key={qIdx}
              id={`quiz-card-${qIdx}`}
              className={`bg-slate-900 border rounded-2xl p-5 sm:p-7 shadow-xl space-y-5 transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-500/50 ring-1 ring-emerald-500/30'
                    : 'border-rose-500/50 ring-1 ring-rose-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header & Slide Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                    سؤال 0{qIdx + 1}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                    <Microscope className="w-3.5 h-3.5 text-teal-400" />
                    <span>{quiz.image_tag}</span>
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-950 text-amber-300 border border-amber-500/30 self-start sm:self-auto">
                  {quiz.stain_and_mag}
                </span>
              </div>

              {/* Slide Mockup / Visual Card */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-teal-400 shrink-0">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      MICROSCOPIC SPECIMEN
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {quiz.image_tag.replace('[', '').replace(']', '')}
                    </h4>
                    <p className="text-xs text-teal-400/90 font-mono">
                      {quiz.stain_and_mag}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
                  Verified Slide Exam
                </span>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed font-arabic">
                  {quiz.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {quiz.options.map((opt, optIdx) => {
                  const isSelected = selectedIdx === optIdx;
                  let optStyle = 'bg-slate-950 hover:bg-slate-850 text-slate-200 border-slate-800 hover:border-teal-500/40';

                  if (isAnswered) {
                    if (isSelected) {
                      optStyle = isCorrect
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                        : 'bg-rose-950/70 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`w-full text-right p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm font-arabic font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${optStyle}`}
                    >
                      <span>{opt}</span>
                      <div className="shrink-0">
                        {isAnswered && isSelected && (
                          isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          )
                        )}
                        {!isAnswered && (
                          <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Scientific Explanation & Correct Answer Disclosure */}
              {isAnswered && (
                <div
                  className={`p-4 sm:p-5 rounded-xl border space-y-2.5 animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                      : 'bg-rose-950/30 border-rose-500/40 text-rose-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-300 font-bold">إجابة صحيحة (Correct!)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span className="text-rose-300 font-bold">إجابة غير صحيحة (Incorrect)</span>
                        </>
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleReset(qIdx)}
                      className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      إعادة المحاولة
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm leading-relaxed font-arabic pt-1 border-t border-slate-800/60">
                    <span className="font-bold text-white block mb-1">
                      التفسير العلمي المعتمد:
                    </span>
                    {quiz.correct_answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
