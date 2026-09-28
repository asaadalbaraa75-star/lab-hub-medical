import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Award,
  ArrowRight,
  Send,
  Layers
} from 'lucide-react';
import { QuizSlideData } from './HistologyLessonsData';

interface HistologyQuizSlideProps {
  data: QuizSlideData;
  onNextSlide?: () => void;
}

export const HistologyQuizSlide: React.FC<HistologyQuizSlideProps> = ({ data, onNextSlide }) => {
  const [writtenAnswer, setWrittenAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hasRevealed, setHasRevealed] = useState<boolean>(false);

  const normalize = (txt: string) => {
    return txt
      .toLowerCase()
      .trim()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ');
  };

  const checkAnswerAccuracy = () => {
    const user = normalize(writtenAnswer);
    if (!user) return false;

    const answerNorm = normalize(data.answerTitle);
    const keywords = answerNorm
      .split(' ')
      .filter(w => w.length > 3 && !['with', 'from', 'this', 'that', 'type'].includes(w));

    if (user.includes(answerNorm) || answerNorm.includes(user)) return true;

    const matched = keywords.filter(kw => user.includes(kw));
    return matched.length >= Math.min(2, Math.max(1, keywords.length));
  };

  const isAnswered = isSubmitted || hasRevealed;
  const isCorrect = isSubmitted && checkAnswerAccuracy();

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!writtenAnswer.trim()) return;
    setIsSubmitted(true);
  };

  const handleReveal = () => {
    setHasRevealed(true);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setWrittenAnswer('');
    setIsSubmitted(false);
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
              Practical Spotter Written Exam
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
          <span>اختبار كتابي: اكتب تشخيص الشريحة بنفسك دون خيارات متعددة</span>
          {!isAnswered ? (
            <button
              onClick={handleReveal}
              className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              كشف الإجابة النموذجية مباشرة
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              إعادة كتابة إجابة
            </button>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: WRITTEN QUESTION & DIAGNOSTIC CARD (NO MCQs) (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        {/* Question Header */}
        <div className="space-y-1.5 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider font-mono">
            <HelpCircle className="w-4 h-4" />
            OSPE Written Identification
          </div>
          <h3 className="text-base font-bold text-white leading-snug">
            {data.question}
          </h3>
        </div>

        {/* WRITTEN INPUT BOX (Replaces MCQs completely) */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>اكتب اسم الشريحة أو التركيب (Diagnostic Label):</span>
              <span className="text-[11px] text-teal-400 font-mono">Written Mode</span>
            </label>
            <input
              type="text"
              value={writtenAnswer}
              disabled={isAnswered}
              onChange={(e) => setWrittenAnswer(e.target.value)}
              placeholder="اكتب اسم النسيج هنا (مثال: Simple Cuboidal Epithelium)..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500 placeholder-slate-500 transition shadow-inner"
            />
          </div>

          {!isAnswered ? (
            <button
              type="submit"
              disabled={!writtenAnswer.trim()}
              className="w-full py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 text-xs font-bold transition flex items-center justify-center gap-2 shadow cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>تحقق من الإجابة</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة المحاولة</span>
            </button>
          )}
        </form>

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
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                {isCorrect ? '✓ إجابة صحيحة' : 'الإجابة النموذجية المعتمدة'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Correct Model Answer (الإجابة النموذجية):</span>
                <span className="text-sm font-bold text-white block">
                  {data.answerTitle}
                </span>
              </div>

              {data.stainUsed && (
                <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-teal-400 font-bold block text-[11px]">
                    Stain Identified (الصبغة):
                  </span>
                  <span className="text-slate-200">{data.stainUsed}</span>
                </div>
              )}

              {data.identificationClue && (
                <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold block text-[11px]">
                    Diagnostic Microscopic Clue (المفتاح التشخيصي):
                  </span>
                  <span className="text-slate-200">{data.identificationClue}</span>
                </div>
              )}

              <div className="text-slate-300 leading-relaxed text-[11px]">
                <strong className="text-slate-100">Why (التفسير العلمي): </strong>
                {data.diagnosticReason}
              </div>

              {data.examPearl && (
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-200 font-bold flex items-start gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{data.examPearl}</span>
                </div>
              )}
            </div>

            {onNextSlide && (
              <button
                onClick={onNextSlide}
                className="w-full mt-2 py-2.5 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
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
