import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  Sparkles,
  Send,
  Microscope,
  Award,
  Layers,
  FileCheck
} from 'lucide-react';
import { PracticalQuizBlock } from '../../../data/histologyJsonData';

interface HistologyPracticalQuizSectionProps {
  quiz: PracticalQuizBlock;
}

export const HistologyPracticalQuizSection: React.FC<HistologyPracticalQuizSectionProps> = ({
  quiz
}) => {
  const [studentInput, setStudentInput] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hasRevealed, setHasRevealed] = useState<boolean>(false);

  // Normalization helper for smart checking of medical terms
  const normalize = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ');
  };

  const checkAnswerAccuracy = () => {
    const user = normalize(studentInput);
    if (!user) return false;

    const answerNorm = normalize(quiz.correct_answer);
    const tissueNorm = normalize(quiz.tissue_name);

    // Extract core keywords from tissue name and correct answer
    const keywords = [
      ...tissueNorm.split(' '),
      ...answerNorm.split(' ').slice(0, 5)
    ].filter(w => w.length > 3 && !['with', 'from', 'this', 'that', 'type'].includes(w));

    // Match if user string contains core keywords or tissue name
    if (user.includes(tissueNorm) || tissueNorm.includes(user)) return true;
    
    // Check keyword intersection
    const matchedCount = keywords.filter(kw => user.includes(kw)).length;
    return matchedCount >= 2;
  };

  const isCorrect = isSubmitted && checkAnswerAccuracy();
  const isAnswered = isSubmitted || hasRevealed;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!studentInput.trim()) return;
    setIsSubmitted(true);
  };

  const handleReveal = () => {
    setHasRevealed(true);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStudentInput('');
    setIsSubmitted(false);
    setHasRevealed(false);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
      {/* Station Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-mono font-bold uppercase">
            PRACTICAL WRITTEN EXAM (اختبار عملي كتابي)
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            تعرف على الشريحة والتركيب المجهري
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إعادة المحاولة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Microscopy Slide & Explicit Slide Metadata (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
            {quiz.image_url ? (
              <img
                src={quiz.image_url}
                alt={quiz.image_tag}
                className="w-full h-full object-cover select-none"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
                <Microscope className="w-12 h-12 text-teal-400 mb-2" />
                <span className="text-sm font-bold text-slate-300">{quiz.image_tag}</span>
              </div>
            )}

            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-teal-300 text-xs font-mono font-bold">
              {quiz.image_tag}
            </div>

            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs text-slate-200">
              <span className="text-amber-400 font-bold block mb-0.5">Stain & Magnification:</span>
              <span>{quiz.stain_and_mag}</span>
            </div>
          </div>

          {/* EXPLICIT SLIDE DATA CARD UNDERNEATH (Required by User Prompt) */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-teal-400 font-bold font-mono text-[11px] uppercase">
              <Layers className="w-3.5 h-3.5" />
              بيانات وتفاصيل الشريحة المجهرية (Microscopic Slide Profile)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div>
                <span className="text-slate-400 block text-[11px]">اسم النسيج (Tissue Name):</span>
                <span className="font-semibold text-white">{quiz.tissue_name}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">نوع الصبغة (Stain):</span>
                <span className="font-semibold text-white">{quiz.stain_and_mag}</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-850">
              <span className="text-slate-400 block text-[11px]">التفاصيل والخصائص المجهرية:</span>
              <p className="text-slate-300 leading-relaxed text-xs font-arabic">
                {quiz.microscopic_details}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: WRITTEN QUIZ INPUT FORM (NO MCQS) (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold font-mono uppercase text-teal-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              سؤال الفحص العملي (OSPE Written Question)
            </span>
            <p className="text-sm font-bold text-white leading-relaxed">
              {quiz.question}
            </p>
          </div>

          {/* PURE WRITTEN INPUT FORM — Strictly NO MCQs */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>اكتب إجابتك هنا (الاسم النسيجي / التشخيص):</span>
                <span className="text-[11px] text-teal-400 font-mono font-normal">نظام كتابي حصراً</span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={studentInput}
                  disabled={isAnswered}
                  onChange={(e) => setStudentInput(e.target.value)}
                  placeholder="مثال: Simple Squamous Epithelium أو نسيج طلائي حرشفي بسيط..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-500 placeholder-slate-500 transition shadow-inner"
                />
              </div>
            </div>

            {/* Verification Button & Direct Reveal Button */}
            {!isAnswered ? (
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={!studentInput.trim()}
                  className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-bold text-xs transition shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>تحقق من الإجابة</span>
                </button>

                <button
                  type="button"
                  onClick={handleReveal}
                  className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-700 flex items-center gap-1.5 cursor-pointer shrink-0"
                  title="عرض الإجابة النموذجية مباشرة"
                >
                  <Eye className="w-4 h-4 text-teal-400" />
                  <span>كشف</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition border border-slate-700 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة إدخال إجابة جديدة</span>
              </button>
            )}
          </form>

          {/* DIAGNOSTIC FEEDBACK & SCIENTIFIC EXPLANATION (Shown upon check/reveal) */}
          {isAnswered && (
            <div
              className={`p-5 rounded-2xl border space-y-3.5 shadow-xl animate-fadeIn ${
                isCorrect
                  ? 'bg-emerald-950/20 border-emerald-500/50'
                  : 'bg-slate-950 border-amber-500/50'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  النتيجة والتشخيص المعتمد
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-black ${
                    isCorrect
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}
                >
                  {isCorrect ? '✓ إجابة ممتازة وصحيحة' : 'الإجابة النموذجية المعتمدة'}
                </span>
              </div>

              {studentInput && (
                <div className="text-xs">
                  <span className="text-slate-400 block text-[11px]">إجابتك المكتوبة:</span>
                  <span className="font-semibold text-slate-200 italic">{studentInput}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-teal-300 block">
                  الإجابة النموذجية والتفسير العلمي المستخرج:
                </span>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 leading-relaxed font-arabic">
                  {quiz.correct_answer}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/30 text-teal-200 text-xs flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-teal-300 mb-0.5">مفتاح التعرف التشخيصي:</strong>
                  {quiz.microscopic_details}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
