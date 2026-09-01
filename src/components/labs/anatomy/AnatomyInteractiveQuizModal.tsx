import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Check
} from 'lucide-react';
import { ANATOMY_SELF_ASSESSMENT_QUIZ, AnatomyQuizQuestion } from './AnatomyData';

interface AnatomyInteractiveQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicFilter?: string;
  onQuizComplete?: () => void;
}

export const AnatomyInteractiveQuizModal: React.FC<AnatomyInteractiveQuizModalProps> = ({
  isOpen,
  onClose,
  topicFilter,
  onQuizComplete
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);

  if (!isOpen) return null;

  const questions: AnatomyQuizQuestion[] = topicFilter
    ? ANATOMY_SELF_ASSESSMENT_QUIZ.filter(q => q.topicId === topicFilter)
    : ANATOMY_SELF_ASSESSMENT_QUIZ;

  const safeQuestions = questions.length > 0 ? questions : ANATOMY_SELF_ASSESSMENT_QUIZ;
  const currentQ = safeQuestions[currentIdx] || safeQuestions[0];
  const qId = currentQ.id;

  const currentSelection = selectedAnswers[qId];
  const isSubmitted = !!isAnswerSubmitted[qId];
  const isCorrect = currentSelection === currentQ.correctAnswer;

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: option
    }));
  };

  const handleSubmitAnswer = () => {
    if (!currentSelection) return;
    setIsAnswerSubmitted(prev => ({
      ...prev,
      [qId]: true
    }));
  };

  const handleNext = () => {
    if (currentIdx < safeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsAnswerSubmitted({});
    setCurrentIdx(0);
    setShowSummary(false);
  };

  // Score calculation
  const totalCorrect = safeQuestions.filter(
    q => selectedAnswers[q.id] === q.correctAnswer
  ).length;
  const percentage = Math.round((totalCorrect / safeQuestions.length) * 100);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      id="anatomy-quiz-modal"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#E2E8F0] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-indigo-700 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                اختبار التقييم الذاتي للتشريح (Anatomy Knowledge Check)
              </h3>
              <p className="text-xs text-indigo-200">
                {safeQuestions.length} أسئلة اختيار من متعدد مع الشرح السريري
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!showSummary ? (
            <div className="space-y-5">
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>
                  السؤال {currentIdx + 1} من {safeQuestions.length}
                </span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {currentQ.topicTitleEn}
                </span>
              </div>

              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{
                    width: `${((currentIdx + 1) / safeQuestions.length) * 100}%`
                  }}
                />
              </div>

              {/* Question Text */}
              <div className="space-y-1 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentQ.questionTextEn}
                </h4>
                <p className="text-sm font-bold text-indigo-800 font-mono">
                  {currentQ.questionTextAr}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isThisSelected = currentSelection === option;
                  const isThisCorrect = option === currentQ.correctAnswer;

                  let style = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

                  if (isSubmitted) {
                    if (isThisCorrect) {
                      style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isThisSelected && !isThisCorrect) {
                      style = 'bg-rose-50 border-rose-400 text-rose-950';
                    } else {
                      style = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    style = 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(option)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isSubmitted && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box when submitted */}
              {isSubmitted && (
                <div
                  className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50/80 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>إجابة صحيحة! (Correct Answer)</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        <span>توضيح الإجابة الصحيحة (Explanation)</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed">
                    {currentQ.explanation}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 text-xs font-medium">
                    <span className="font-bold text-indigo-900">الأهمية السريرية: </span>
                    {currentQ.clinicalSignificance}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Summary View */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center mx-auto text-indigo-600">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  اكتمل الاختبار الذاتي بنجاح!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  نتيجتك النهائية في أسئلة الفحص التشريحي
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-sm mx-auto space-y-2">
                <p className="text-4xl font-black text-indigo-600">
                  {percentage}%
                </p>
                <p className="text-xs font-bold text-slate-700">
                  أجبت بشكل صحيح على {totalCorrect} من أصل {safeQuestions.length} أسئلة
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة الاختبار</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>إنهاء والعودة</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!showSummary && (
          <div className="bg-slate-50 border-t border-[#E2E8F0] p-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={handlePrev}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>السابق</span>
            </button>

            {!isSubmitted ? (
              <button
                type="button"
                disabled={!currentSelection}
                onClick={handleSubmitAnswer}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold disabled:opacity-40 shadow-xs transition-colors"
              >
                تأكيد الإجابة
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>{currentIdx < safeQuestions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
