/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Practical Examination / Spotter Tests Section
 * 
 * STRICT ACADEMIC STANDARD:
 * - 100% Written Spotter Exam Mode (Text Input Box — No MCQs)
 * - Authentic Real Anatomical Specimen Images with Needle-Precision Arrow Pointer
 * - Instant Verification against Academic Model Answers & Acceptable Synonyms
 * - Specimen Asset Mapper for uploading or assigning custom slides from the official handout
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  AnatomyPracticalTestQuestion,
  ANATOMY_PRACTICAL_TEST_QUESTIONS
} from './AnatomyCurriculumData';
import { AnatomyPracticalSpecimenViewer } from './components/AnatomyPracticalSpecimenViewer';
import { AnatomySpecimenUploadMapper } from './components/AnatomySpecimenUploadMapper';
import { getCustomAnatomyImage } from '../../../utils/anatomyImageStorage';
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
  BookOpen,
  Filter,
  Stethoscope,
  Send,
  Check,
  ImageIcon
} from 'lucide-react';

interface AnatomyTestsSectionProps {
  onBackToMain?: () => void;
}

type QuestionCategory = 'bones' | 'all' | 'muscles' | 'organs' | 'planes_joints';

// Normalize Arabic and Latin strings for fair automated evaluation
function normalizeAnatomyText(s: string): string {
  if (!s) return '';
  return s
    .toLowerCase()
    .trim()
    .replace(/[أإآء]/g, 'ا')
    .replace(/[ة]/g, 'ه')
    .replace(/[ى]/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '') // remove Arabic harakat
    .replace(/[^a-z0-9\u0600-\u06FF]/g, '');
}

function checkAnatomyAnswer(userText: string, q: AnatomyPracticalTestQuestion): boolean {
  if (!userText || !userText.trim()) return false;
  const normUser = normalizeAnatomyText(userText);
  if (!normUser) return false;

  const targets = [
    q.correctAnswer,
    q.structureTarget,
    q.structureTargetAr || '',
    ...(q.acceptableAnswers || [])
  ];

  return targets.some(target => {
    if (!target) return false;
    const normTarget = normalizeAnatomyText(target);
    if (!normTarget) return false;
    return (
      normUser === normTarget ||
      (normTarget.length >= 4 && normUser.includes(normTarget)) ||
      (normUser.length >= 4 && normTarget.includes(normUser))
    );
  });
}

export const AnatomyTestsSection: React.FC<AnatomyTestsSectionProps> = ({
  onBackToMain
}) => {
  // Category selection (Default to bones & joints as requested)
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('bones');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [isCorrectRecord, setIsCorrectRecord] = useState<Record<string, boolean>>({});
  const [inputVal, setInputVal] = useState<string>('');
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [showReviewList, setShowReviewList] = useState<boolean>(false);
  const [customImageOverride, setCustomImageOverride] = useState<string | null>(null);

  // Filter questions based on selected category
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return ANATOMY_PRACTICAL_TEST_QUESTIONS;
    return ANATOMY_PRACTICAL_TEST_QUESTIONS.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0];
  const questionId = currentQ?.id;

  // Sync inputVal when switching questions
  useEffect(() => {
    if (questionId) {
      setInputVal(writtenAnswers[questionId] || '');
      const savedCustom = getCustomAnatomyImage(questionId) || getCustomAnatomyImage(currentQ.structureTarget);
      setCustomImageOverride(savedCustom);
    }
  }, [questionId, currentIdx, writtenAnswers, currentQ]);

  // Listen for storage changes from mapper
  useEffect(() => {
    const handleStorageUpdate = (e: any) => {
      if (questionId && currentQ) {
        const savedCustom = getCustomAnatomyImage(questionId) || getCustomAnatomyImage(currentQ.structureTarget);
        setCustomImageOverride(savedCustom);
      }
    };
    window.addEventListener('anatomy_specimen_image_updated', handleStorageUpdate);
    return () => window.removeEventListener('anatomy_specimen_image_updated', handleStorageUpdate);
  }, [questionId, currentQ]);

  const handleCategoryChange = (cat: QuestionCategory) => {
    setSelectedCategory(cat);
    setCurrentIdx(0);
    setShowSummary(false);
    setShowReviewList(false);
  };

  const handleCheckAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || submittedAnswers[questionId]) return;

    const trimmed = inputVal.trim();
    const isCorrect = checkAnatomyAnswer(trimmed, currentQ);

    setWrittenAnswers(prev => ({ ...prev, [questionId]: trimmed }));
    setSubmittedAnswers(prev => ({ ...prev, [questionId]: true }));
    setIsCorrectRecord(prev => ({ ...prev, [questionId]: isCorrect }));
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
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
    setWrittenAnswers({});
    setSubmittedAnswers({});
    setIsCorrectRecord({});
    setInputVal('');
    setCurrentIdx(0);
    setShowSummary(false);
    setShowReviewList(false);
  };

  // Calculate score
  const correctCount = filteredQuestions.reduce((acc, q) => {
    return isCorrectRecord[q.id] ? acc + 1 : acc;
  }, 0);

  const answeredCount = filteredQuestions.reduce((acc, q) => {
    return submittedAnswers[q.id] ? acc + 1 : acc;
  }, 0);

  const percentage = filteredQuestions.length > 0
    ? Math.round((correctCount / filteredQuestions.length) * 100)
    : 0;

  const categoryLabels: { id: QuestionCategory; labelEn: string; labelAr: string; count: number }[] = [
    { id: 'bones', labelEn: 'Osteology & Joints', labelAr: 'العظام والمفاصل', count: ANATOMY_PRACTICAL_TEST_QUESTIONS.filter(q => q.category === 'bones').length },
    { id: 'planes_joints', labelEn: 'Planes & Synovial Types', labelAr: 'المستويات وتصنيف المفاصل', count: ANATOMY_PRACTICAL_TEST_QUESTIONS.filter(q => q.category === 'planes_joints').length },
    { id: 'muscles', labelEn: 'Myology & Muscles', labelAr: 'العضلات والتشريح العضلي', count: ANATOMY_PRACTICAL_TEST_QUESTIONS.filter(q => q.category === 'muscles').length },
    { id: 'organs', labelEn: 'Visceral Organs', labelAr: 'الأحشاء والأعضاء الحيوية', count: ANATOMY_PRACTICAL_TEST_QUESTIONS.filter(q => q.category === 'organs').length },
    { id: 'all', labelEn: 'All Stations', labelAr: 'جميع المحطات', count: ANATOMY_PRACTICAL_TEST_QUESTIONS.length }
  ];

  const activeImageUrl = customImageOverride || currentQ.imageUrl;
  const isCurrentSubmitted = !!submittedAnswers[questionId];
  const isCurrentCorrect = !!isCorrectRecord[questionId];

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1 justify-end md:justify-start">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase tracking-wider">
              Anatomy Lab · Spotter Practical Exam (Written Mode)
            </span>
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 justify-end md:justify-start">
            <Target className="w-6 h-6 text-emerald-400 shrink-0" />
            <span>اختبار التشريح العملي الكتابي (OSPE Written Spotter)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            نظام اختبار كتابي معتمد (Written Quiz): كل محطة مزودة بعينة تشريحية حقيقية عالية الدقة مع سهم تأشير محدد. اكتب اسم التركيب أو العظم بنفسك واضغط "تحقق من الإجابة" للتقييم الفوري ومقارنة إجابتك بالإجابة النموذجية المعتمدة.
          </p>
        </div>

        {onBackToMain && (
          <button
            type="button"
            onClick={onBackToMain}
            className="self-start md:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            <span>العودة للقسم الرئيسي</span>
          </button>
        )}
      </div>

      {/* Category Selection Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
          {categoryLabels.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{cat.labelAr} ({cat.labelEn})</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {!showSummary ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-6 p-4 sm:p-6 md:p-7">
          {/* Progress Bar & Jump Station Navigator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                المحطة {currentIdx + 1} من {filteredQuestions.length}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentQ.topic}
              </span>
            </div>

            {/* Station jump pills */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 scrollbar-none">
              {filteredQuestions.map((q, i) => {
                const isAnswered = submittedAnswers[q.id];
                const isCorrect = isCorrectRecord[q.id];
                let pillColor = 'bg-slate-800 text-slate-400 hover:bg-slate-700';
                if (isAnswered) {
                  pillColor = isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white';
                } else if (i === currentIdx) {
                  pillColor = 'bg-slate-700 text-white ring-2 ring-emerald-400 font-black';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(i)}
                    className={`min-w-[28px] h-7 px-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center cursor-pointer transition-colors ${pillColor}`}
                    title={`محطة #${i + 1}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Question Layout: Specimen Viewer / Written Input Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Specimen Viewer Column (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>عينة تشريحية حقيقية مع سهم التأشير (Specimen Arrow Spotter)</span>
                </span>
                <AnatomySpecimenUploadMapper
                  specimenKey={questionId}
                  specimenTitle={currentQ.structureTarget}
                  onImageChanged={(url) => setCustomImageOverride(url)}
                />
              </div>

              <AnatomyPracticalSpecimenViewer
                imageUrl={activeImageUrl}
                altText={currentQ.structureTarget}
                pointerX={currentQ.pointerX}
                pointerY={currentQ.pointerY}
                pointerLabel={currentQ.pointerLabel || 'ARROW ➔'}
                stationNumber={currentIdx + 1}
                sourceText={customImageOverride ? 'صورة عينة مخصصة من ملزمة الكلية' : currentQ.imageSource}
                aspectClass="h-[320px] sm:h-[400px] md:h-[460px]"
              />
            </div>

            {/* Written Question & Text Input Form (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* Question Prompt */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                      سؤال المحطة العملية (OSPE Spotter Prompt)
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      محطة #{currentIdx + 1}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {currentQ.questionAr || 'ما اسم التركيب أو العظم المشار إليه بالسهم؟'}
                  </h3>

                  <p className="text-xs text-slate-300 font-mono text-left dir-ltr">
                    {currentQ.question || 'Identify the structure/bone indicated by the arrow:'}
                  </p>
                </div>

                {/* Pure Written Input Box (Strictly No MCQs) */}
                <form onSubmit={handleCheckAnswer} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300 block">
                      اكتب إجابتك هنا (باللغة الإنجليزية أو العربية):
                    </label>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Written Answer Required
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={inputVal}
                      onChange={e => setInputVal(e.target.value)}
                      disabled={isCurrentSubmitted}
                      placeholder="اكتب اسم التركيب أو العظم (مثال: Greater Trochanter, Femur, Patella...)"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-semibold disabled:opacity-80"
                      autoFocus
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </div>

                  {!isCurrentSubmitted ? (
                    <button
                      type="submit"
                      disabled={!inputVal.trim()}
                      className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>تحقق من الإجابة (Check Answer)</span>
                    </button>
                  ) : null}
                </form>

                {/* Instant Scientific Feedback upon verification */}
                {isCurrentSubmitted && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-3 animate-in fade-in duration-200 text-right ${
                    isCurrentCorrect
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                  }`}>
                    {/* Status header */}
                    <div className="flex items-center justify-between font-bold pb-2 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        {isCurrentCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-emerald-300 text-sm">إجابة صحيحة! أحسنت</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            <span className="text-rose-300 text-sm">إجابة غير دقيقة</span>
                          </>
                        )}
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono text-[10px]">
                        Spotter #{currentIdx + 1}
                      </span>
                    </div>

                    {/* Comparison Box */}
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] block">إجابتك المكتوبة:</span>
                        <span className={`font-bold text-xs ${isCurrentCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {writtenAnswers[questionId] || '(فارغ)'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/90 border border-emerald-600/30 space-y-1">
                        <span className="text-emerald-400 text-[10px] font-bold block">الإجابة النموذجية المعتمدة:</span>
                        <div className="flex items-center justify-between flex-wrap gap-1 font-bold text-xs text-white">
                          <span className="font-mono text-emerald-300">{currentQ.structureTarget}</span>
                          {currentQ.structureTargetAr && (
                            <span className="text-slate-300">({currentQ.structureTargetAr})</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Scientific explanation */}
                    {currentQ.explanationAr && (
                      <p className="text-slate-200 font-medium pt-1">
                        💡 <span className="font-bold">التفسير الطبي:</span> {currentQ.explanationAr}
                      </p>
                    )}

                    <p className="text-slate-300 text-[11px] font-mono text-left dir-ltr">
                      {currentQ.explanation}
                    </p>

                    {currentQ.clinicalPearl && (
                      <div className="pt-2 border-t border-white/10 text-amber-300 font-medium flex items-start gap-1.5">
                        <Stethoscope className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span><strong className="text-amber-200">اللؤلؤة السريرية:</strong> {currentQ.clinicalPearl}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons: Prev / Next Station */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={handlePrev}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  السابق (Previous)
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
                >
                  <span>{currentIdx === filteredQuestions.length - 1 ? 'عرض النتيجة النهائية' : 'المحطة التالية'}</span>
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* FINAL RESULTS SUMMARY VIEW */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-in zoom-in-95 duration-200 text-right">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-700 mx-auto flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block font-mono">
              Practical Examination Complete · نتيجة الامتحان العملي الكتابي
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {percentage >= 80 ? 'ممتاز! كفاءة عملية ممتازة في التعرف على العينات' : percentage >= 60 ? 'جيد جداً! راجع التراكيب التي أخطأت بها' : 'تحتاج لمزيد من الممارسة على العينات والأسهم'}
            </h3>

            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              أجبت كتابياً بشكل صحيح على <span className="text-emerald-400 font-bold">{correctCount}</span> من أصل <span className="text-white font-bold">{filteredQuestions.length}</span> محطة بنسبة دقة <span className="text-emerald-400 font-bold">{percentage}%</span>.
            </p>
          </div>

          {/* Performance Meter */}
          <div className="max-w-md mx-auto bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-300 font-mono">
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

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowReviewList(!showReviewList)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors border border-slate-700"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>{showReviewList ? 'إخفاء المراجعة المفصلة' : 'مراجعة جميع المحطات والإجابات النموذجية'}</span>
            </button>

            <button
              type="button"
              onClick={handleRetakeTest}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار الكتابي</span>
            </button>

            {onBackToMain && (
              <button
                type="button"
                onClick={onBackToMain}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-colors border border-slate-700"
              >
                العودة للقسم الرئيسي
              </button>
            )}
          </div>

          {/* Detailed Question-by-Question Review List */}
          {showReviewList && (
            <div className="space-y-4 pt-6 border-t border-slate-800 text-right animate-in fade-in duration-200">
              <h4 className="text-base font-bold text-white">
                المراجعة الشاملة لجميع محطات الاختبار العملي:
              </h4>

              <div className="space-y-3">
                {filteredQuestions.map((q, idx) => {
                  const userAns = writtenAnswers[q.id] || '(لم تتم الإجابة)';
                  const isCorrect = isCorrectRecord[q.id];

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-rose-950/20 border-rose-500/30'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-full sm:w-36 h-28 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800 flex items-center justify-center p-1">
                          <img
                            src={getCustomAnatomyImage(q.id) || q.imageUrl}
                            alt={q.structureTarget}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] font-bold">
                              محطة #{idx + 1} · {q.topic}
                            </span>
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                isCorrect
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {isCorrect ? '✓ إجابة صحيحة' : '✕ إجابة غير صحيحة'}
                            </span>
                          </div>

                          <div className="text-xs sm:text-sm font-bold text-white">
                            {q.questionAr || 'ما اسم التركيب أو العظم المشار إليه بالسهم؟'}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                              <span className="text-slate-400 text-[10px] block">إجابتك المكتوبة:</span>
                              <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                {userAns}
                              </span>
                            </div>

                            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                              <span className="text-slate-400 text-[10px] block">الإجابة النموذجية المعتمدة:</span>
                              <span className="text-emerald-400 font-bold">
                                {q.structureTarget} {q.structureTargetAr ? `(${q.structureTargetAr})` : ''}
                              </span>
                            </div>
                          </div>

                          {q.explanationAr && (
                            <p className="text-[11px] text-slate-300 pt-1">
                              💡 <span className="font-bold">التفسير:</span> {q.explanationAr}
                            </p>
                          )}

                          {q.clinicalPearl && (
                            <p className="text-[11px] text-amber-300">
                              ⭐ <span className="font-bold">اللؤلؤة السريرية:</span> {q.clinicalPearl}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
