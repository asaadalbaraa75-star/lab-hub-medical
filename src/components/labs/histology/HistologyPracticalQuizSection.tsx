import React, { useState, useEffect } from 'react';
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
  FileCheck,
  ImageIcon
} from 'lucide-react';
import { PracticalQuizBlock } from '../../../data/histologyJsonData';
import { HistologySanaaAtlasVisual } from './HistologySanaaAtlasVisuals';
import { SlideImageUploadMapper } from './SlideImageUploadMapper';
import { getCustomSlideImage } from '../../../utils/slideImageStorage';

interface HistologyPracticalQuizSectionProps {
  quiz: PracticalQuizBlock;
}

export const HistologyPracticalQuizSection: React.FC<HistologyPracticalQuizSectionProps> = ({
  quiz
}) => {
  const [studentInput, setStudentInput] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hasRevealed, setHasRevealed] = useState<boolean>(false);
  const [customImage, setCustomImage] = useState<string | null>(null);

  // Sync with persistent custom image in localStorage
  useEffect(() => {
    const saved = getCustomSlideImage(quiz.image_tag) || getCustomSlideImage(quiz.tissue_name);
    setCustomImage(saved);
  }, [quiz.image_tag, quiz.tissue_name]);

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
      ...answerNorm.split(' ').slice(0, 6)
    ].filter(w => w.length > 3 && !['with', 'from', 'this', 'that', 'type', 'layer'].includes(w));

    // Match if user string contains core keywords or tissue name
    if (user.includes(tissueNorm) || tissueNorm.includes(user)) return true;
    
    // Check keyword intersection
    const matchedCount = keywords.filter(kw => user.includes(kw)).length;
    return matchedCount >= Math.min(2, Math.max(1, keywords.length));
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

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Upload & Asset Mapper Button */}
          <SlideImageUploadMapper
            slideKey={quiz.image_tag}
            slideTitle={quiz.tissue_name}
            onImageChange={(newImg) => setCustomImage(newImg)}
          />

          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة المحاولة</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Microscopy Slide & Explicit Slide Metadata (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
            {customImage ? (
              <img
                src={customImage}
                alt={quiz.image_tag}
                className="w-full h-full object-contain bg-black select-none"
              />
            ) : (
              /* High-Accuracy Vector Micrograph Atlas without Random Internet Images */
              <div className="w-full h-full">
                <HistologySanaaAtlasVisual
                  visualId={quiz.visual_id || 'microscope_parts'}
                  mode={isAnswered ? 'labeled' : 'unlabeled'}
                />
              </div>
            )}

            {/* Tag Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-teal-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <Microscope className="w-3.5 h-3.5 text-teal-400" />
              <span>{quiz.image_tag}</span>
            </div>

            {/* Indicator of custom vs atlas */}
            {customImage && (
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold">
                ✓ صورة حقيقية من الملزمة
              </div>
            )}

            {/* Bottom Stain Banner on Image */}
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs text-slate-200">
              <span className="text-amber-400 font-bold block mb-0.5">Stain & Magnification:</span>
              <span>{quiz.stain_and_mag}</span>
            </div>
          </div>

          {/* EXPLICIT SLIDE DATA CARD UNDERNEATH (Required by User Prompt) */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-400 font-bold font-mono text-[11px] uppercase">
                <Layers className="w-3.5 h-3.5" />
                بيانات وتفاصيل الشريحة المجهرية (Microscopic Slide Profile)
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                من ملزمة د. رقية شرف الدين
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1">
              <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800/60">
                <span className="text-slate-400 block text-[11px]">اسم النسيج (Tissue Name):</span>
                <span className="font-semibold text-white">{quiz.tissue_name}</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800/60">
                <span className="text-slate-400 block text-[11px]">نوع الصبغة (Stain & Mag):</span>
                <span className="font-semibold text-teal-300">{quiz.stain_and_mag}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/60">
              <span className="text-slate-400 block text-[11px] mb-0.5">التفاصيل والخصائص المجهرية:</span>
              <p className="text-slate-200 leading-relaxed text-xs font-arabic">
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
                  placeholder="اكتب اسم الشريحة أو النسيج بالإنجليزية أو العربية..."
                  className={`w-full py-3 px-4 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner ${
                    isAnswered
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-950/20'
                        : 'border-rose-500 bg-rose-950/20'
                      : 'border-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                  }`}
                />

                {isAnswered && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {!isAnswered ? (
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={!studentInput.trim()}
                  className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>تحقق من الإجابة</span>
                </button>

                <button
                  type="button"
                  onClick={handleReveal}
                  className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  title="إظهار الإجابة النموذجية مباشرة"
                >
                  <Eye className="w-4 h-4 text-teal-400" />
                  <span>كشف</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة كتابة إجابة جديدة</span>
              </button>
            )}
          </form>

          {/* Model Answer & Scientific Rationale */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl border space-y-3 animate-fadeIn text-xs sm:text-sm ${
                isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/50'
                  : 'bg-rose-950/30 border-rose-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">إجابة صحيحة ومطابقة للتشخيص!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span className="text-rose-300">
                        {hasRevealed ? 'الإجابة النموذجية المعتمدة:' : 'إجابة غير مكتملة — قارن مع الإجابة النموذجية:'}
                      </span>
                    </>
                  )}
                </div>

                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Faculty Key
                </span>
              </div>

              {/* Verified Handout Answer */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-bold text-teal-300 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>الإجابة النموذجية والتفسير العلمي المستخرج من الملزمة:</span>
                </div>
                <p className="text-xs text-white leading-relaxed font-semibold">
                  {quiz.correct_answer}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  نصيحة الامتحان العملي: احرص دائماً على كتابة اسم النسيج، موقعه التشريحي، ونوع الصبغة بدقة للحصول على الدرجة الكاملة.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
