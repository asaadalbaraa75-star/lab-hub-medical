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
  Check,
  Send,
  Stethoscope
} from 'lucide-react';
import { ANATOMY_SELF_ASSESSMENT_QUIZ, AnatomyQuizQuestion } from './AnatomyData';

interface AnatomyInteractiveQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicFilter?: string;
  onQuizComplete?: () => void;
}

function normalizeQuizText(s: string): string {
  if (!s) return '';
  return s
    .toLowerCase()
    .trim()
    .replace(/[أإآء]/g, 'ا')
    .replace(/[ة]/g, 'ه')
    .replace(/[ى]/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '')
    .replace(/[^a-z0-9\u0600-\u06FF]/g, '');
}

function checkWrittenMatch(input: string, q: AnatomyQuizQuestion): boolean {
  if (!input || !input.trim()) return false;
  const normUser = normalizeQuizText(input);
  if (!normUser) return false;

  const normTarget = normalizeQuizText(q.correctAnswer);
  if (normUser === normTarget) return true;
  if (normTarget.length >= 4 && (normUser.includes(normTarget) || normTarget.includes(normUser))) return true;

  // Also check if matches any acceptable keywords from options
  return false;
}

export const AnatomyInteractiveQuizModal: React.FC<AnatomyInteractiveQuizModalProps> = ({
  isOpen,
  onClose,
  topicFilter,
  onQuizComplete
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<Record<string, boolean>>({});
  const [isCorrectRecord, setIsCorrectRecord] = useState<Record<string, boolean>>({});
  const [inputVal, setInputVal] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  if (!isOpen) return null;

  const questions: AnatomyQuizQuestion[] = topicFilter
    ? ANATOMY_SELF_ASSESSMENT_QUIZ.filter(q => q.topicId === topicFilter)
    : ANATOMY_SELF_ASSESSMENT_QUIZ;

  const safeQuestions = questions.length > 0 ? questions : ANATOMY_SELF_ASSESSMENT_QUIZ;
  const currentQ = safeQuestions[currentIdx] || safeQuestions[0];
  const qId = currentQ.id;

  const isSubmitted = !!isAnswerSubmitted[qId];
  const isCorrect = !!isCorrectRecord[qId];

  const handleSubmitAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isSubmitted) return;

    const trimmed = inputVal.trim();
    const correct = checkWrittenMatch(trimmed, currentQ);

    setWrittenAnswers(prev => ({ ...prev, [qId]: trimmed }));
    setIsAnswerSubmitted(prev => ({ ...prev, [qId]: true }));
    setIsCorrectRecord(prev => ({ ...prev, [qId]: correct }));
  };

  const handleNext = () => {
    if (currentIdx < safeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      const nextQ = safeQuestions[currentIdx + 1];
      setInputVal(writtenAnswers[nextQ?.id] || '');
    } else {
      setShowSummary(true);
      if (onQuizComplete) onQuizComplete();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      const prevQ = safeQuestions[currentIdx - 1];
      setInputVal(writtenAnswers[prevQ?.id] || '');
    }
  };

  const handleReset = () => {
    setWrittenAnswers({});
    setIsAnswerSubmitted({});
    setIsCorrectRecord({});
    setInputVal('');
    setCurrentIdx(0);
    setShowSummary(false);
  };

  // Score calculation
  const totalCorrect = safeQuestions.filter(q => isCorrectRecord[q.id]).length;
  const percentage = Math.round((totalCorrect / safeQuestions.length) * 100);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      id="anatomy-quiz-modal"
      onClick={onClose}
      dir="rtl"
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
            <div className="text-right">
              <h3 className="text-base font-bold">
                اختبار التشريح الكتابي (Anatomy Written Knowledge Check)
              </h3>
              <p className="text-xs text-indigo-200">
                {safeQuestions.length} أسئلة بنظام الإجابة المكتوبة والتحقق الفوري
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-right">
          {!showSummary ? (
            <div className="space-y-5">
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>
                  السؤال {currentIdx + 1} من {safeQuestions.length}
                </span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-mono">
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
              <div className="space-y-2 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {currentQ.questionTextAr}
                </p>
                <p className="text-xs font-mono text-slate-600 text-left dir-ltr">
                  {currentQ.questionTextEn}
                </p>
              </div>

              {/* Written Text Input Form (Strictly No MCQs) */}
              <form onSubmit={handleSubmitAnswer} className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  اكتب إجابتك هنا (باللغة الإنجليزية أو العربية):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    disabled={isSubmitted}
                    placeholder="اكتب الإجابة النموذجية هنا..."
                    className="w-full bg-white border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors font-semibold disabled:bg-slate-50 disabled:text-slate-600"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>

                {!isSubmitted ? (
                  <button
                    type="submit"
                    disabled={!inputVal.trim()}
                    className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>تحقق من الإجابة (Check Answer)</span>
                  </button>
                ) : null}
              </form>

              {/* Explanation Box when submitted */}
              {isSubmitted && (
                <div
                  className={`p-4 rounded-xl border space-y-3 animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/80 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs pb-2 border-b border-black/10">
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-800 text-sm">إجابة صحيحة! أحسنت</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span className="text-rose-800 text-sm">إجابة غير دقيقة</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 text-[10px] block">إجابتك:</span>
                      <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                        {writtenAnswers[qId] || '(فارغ)'}
                      </span>
                    </div>

                    <div className="bg-white/80 p-2.5 rounded-lg border border-indigo-200">
                      <span className="text-indigo-600 text-[10px] font-bold block">الإجابة النموذجية المعتمدة:</span>
                      <span className="text-indigo-950 font-bold font-mono">
                        {currentQ.correctAnswer}
                      </span>
                    </div>
                  </div>

                  {currentQ.explanation && (
                    <p className="text-xs leading-relaxed text-slate-700 pt-1">
                      💡 <span className="font-bold">التفسير الطبي:</span> {currentQ.explanation}
                    </p>
                  )}

                  {currentQ.clinicalSignificance && (
                    <div className="pt-2 border-t border-black/10 text-indigo-900 text-xs flex items-start gap-1.5 font-medium">
                      <Stethoscope className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>الأهمية السريرية:</strong> {currentQ.clinicalSignificance}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Results Summary */
            <div className="space-y-6 py-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900">
                  {percentage >= 80 ? 'أداء استثنائي! ممتاز' : percentage >= 60 ? 'أداء جيد جداً!' : 'تحتاج لمراجعة بعض المفاهيم'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  أجبت كتابياً بشكل صحيح على {totalCorrect} من أصل {safeQuestions.length} سؤال بنسبة {percentage}%.
                </p>
              </div>

              {/* Progress bar */}
              <div className="max-w-xs mx-auto space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>نسبة الإتقان</span>
                  <span className="text-indigo-600">{percentage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${percentage >= 70 ? 'bg-emerald-600' : 'bg-amber-500'}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة الاختبار الكتابي</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer"
                >
                  إغلاق الاختبار
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!showSummary && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>السابق</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <span>{currentIdx === safeQuestions.length - 1 ? 'عرض النتيجة' : 'السؤال التالي'}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
