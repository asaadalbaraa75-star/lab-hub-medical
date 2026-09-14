/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Practical Examination / Spotter Tests Section
 * 
 * STRICT ACADEMIC STANDARD:
 * Question ↔ Authentic Specimen ↔ Needle Precision Pointer ↔ Interactive Options ↔ Instant Feedback ↔ Clinical Pearl ↔ Full OSPE Review
 */

import React, { useState, useMemo } from 'react';
import {
  AnatomyPracticalTestQuestion,
  ANATOMY_PRACTICAL_TEST_QUESTIONS
} from './AnatomyCurriculumData';
import { AnatomyPracticalSpecimenViewer } from './components/AnatomyPracticalSpecimenViewer';
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
  Stethoscope
} from 'lucide-react';

interface AnatomyTestsSectionProps {
  onBackToMain?: () => void;
}

type QuestionCategory = 'all' | 'bones' | 'muscles' | 'organs' | 'planes_joints';

export const AnatomyTestsSection: React.FC<AnatomyTestsSectionProps> = ({
  onBackToMain
}) => {
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('all');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [showReviewList, setShowReviewList] = useState<boolean>(false);

  // Filter questions based on selected category
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return ANATOMY_PRACTICAL_TEST_QUESTIONS;
    return ANATOMY_PRACTICAL_TEST_QUESTIONS.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0];
  const questionId = currentQ?.id;

  const handleCategoryChange = (cat: QuestionCategory) => {
    setSelectedCategory(cat);
    setCurrentIdx(0);
    setShowSummary(false);
    setShowReviewList(false);
  };

  const handleSelectOption = (opt: string) => {
    if (submittedAnswers[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: opt }));
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswers[questionId]) return;
    setSubmittedAnswers(prev => ({ ...prev, [questionId]: true }));
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
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setCurrentIdx(0);
    setShowSummary(false);
    setShowReviewList(false);
  };

  // Calculate score for the filtered set
  const correctCount = filteredQuestions.reduce((acc, q) => {
    if (submittedAnswers[q.id] && selectedAnswers[q.id] === q.correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const answeredCount = filteredQuestions.reduce((acc, q) => {
    return submittedAnswers[q.id] ? acc + 1 : acc;
  }, 0);

  const percentage = filteredQuestions.length > 0
    ? Math.round((correctCount / filteredQuestions.length) * 100)
    : 0;

  const categoryLabels: { id: QuestionCategory; labelEn: string; labelAr: string; count: number }[] = [
    { id: 'all', labelEn: 'All Stations', labelAr: 'جميع المحطات', count: ANATOMY_PRACTICAL_TEST_QUESTIONS.length },
    { id: 'bones', labelEn: 'Osteology & Joints', labelAr: 'العظام والمفاصل', count: ANATOMY_PRACTICAL_TEST_QUESTIONS.filter(q => q.category === 'bones').length },
    { id: 'muscles', labelEn: 'Myology & Muscles', labelAr: 'العضلات والتشريح العضلي', count: ANATOMY_PRACTICAL_TEST_QUESTIONS.filter(q => q.category === 'muscles').length },
    { id: 'organs', labelEn: 'Visceral Organs', labelAr: 'الأحشاء والأعضاء الحيوية', count: ANATOMY_PRACTICAL_TEST_QUESTIONS.filter(q => q.category === 'organs').length },
    { id: 'planes_joints', labelEn: 'Planes & Directions', labelAr: 'المستويات والاتجاهات', count: ANATOMY_PRACTICAL_TEST_QUESTIONS.filter(q => q.category === 'planes_joints').length }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase tracking-wider">
              Anatomy Lab · Spotter Practical Exam (OSPE)
            </span>
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-400 shrink-0" />
            <span>PRACTICAL ANATOMY SPOTTER EXAM</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            اختبار عملي يحاكي امتحان التشريح العملي في الكلية: كل محطة مزودة بعينة تشريحية حقيقية عالية الدقة مع مؤشر دقيق، تكبير وتصغير تفاعلي، وتصحيح فوري ولآلئ سريرية.
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
              <span>{cat.labelEn}</span>
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
                Station {currentIdx + 1} of {filteredQuestions.length}
              </span>
              <span className="text-xs text-slate-400">
                {currentQ.topic}
              </span>
            </div>

            {/* Station jump pills */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 scrollbar-none">
              {filteredQuestions.map((q, i) => {
                const isAnswered = submittedAnswers[q.id];
                const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
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
                    className={`min-w-[26px] h-6 px-1.5 rounded-md text-[10px] font-bold flex items-center justify-center cursor-pointer transition-colors ${pillColor}`}
                    title={`محطة #${i + 1}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Question Layout: Left Specimen Viewer / Right Options & Prompt */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Specimen Viewer with needle-sharp pointer and zoom */}
            <div className="lg:col-span-7 flex flex-col">
              <AnatomyPracticalSpecimenViewer
                imageUrl={currentQ.imageUrl}
                altText={currentQ.structureTarget}
                pointerX={currentQ.pointerX}
                pointerY={currentQ.pointerY}
                pointerLabel={currentQ.pointerLabel || `STATION ${currentIdx + 1}`}
                stationNumber={currentIdx + 1}
                sourceText={currentQ.imageSource}
                aspectClass="h-[300px] sm:h-[380px] md:h-[450px]"
              />
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* Question Prompt */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                      محطة الفحص العملي (OSPE Prompt)
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      #{currentIdx + 1}
                    </span>
                  </div>

                  {currentQ.questionAr && (
                    <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                      {currentQ.questionAr}
                    </h3>
                  )}

                  <p className="text-xs text-slate-300 font-mono text-left dir-ltr">
                    {currentQ.question}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 block text-right">
                    اختر التركيب التشريحي المشار إليه:
                  </span>

                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[questionId] === opt;
                    const isSubmitted = submittedAnswers[questionId];
                    const isCorrect = opt === currentQ.correctAnswer;

                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white hover:border-slate-700';

                    if (isSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/50';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0 font-mono">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="font-medium">{opt}</span>
                        </div>

                        {isSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {isSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation & Clinical Pearl (Revealed upon submission) */}
                {submittedAnswers[questionId] && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 animate-in fade-in duration-200 text-right ${
                    selectedAnswers[questionId] === currentQ.correctAnswer
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                  }`}>
                    <div className="flex items-center justify-between font-bold pb-1 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        {selectedAnswers[questionId] === currentQ.correctAnswer ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-emerald-300">إجابة صحيحة! أحسنت</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            <span className="text-rose-300">إجابة غير دقيقة</span>
                          </>
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-white/80">
                        {currentQ.structureTarget}
                      </span>
                    </div>

                    {currentQ.explanationAr && (
                      <p className="text-slate-200 font-medium">
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

              {/* Action Buttons: Submit / Prev / Next */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={handlePrev}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  السابق (Previous)
                </button>

                <div className="flex items-center gap-2">
                  {!submittedAnswers[questionId] ? (
                    <button
                      type="button"
                      disabled={!selectedAnswers[questionId]}
                      onClick={handleSubmitAnswer}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
                    >
                      تأكيد الإجابة (Submit)
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
                    >
                      <span>{currentIdx === filteredQuestions.length - 1 ? 'عرض النتيجة النهائية' : 'المحطة التالية'}</span>
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-700 mx-auto flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block font-mono">
              Practical Examination Complete · نتيجة الامتحان العملي
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {percentage >= 80 ? 'ممتاز! كفاءة عملية متقدمة' : percentage >= 60 ? 'جيد جداً! راجع النقاط غير المؤكدة' : 'تحتاج لمزيد من الممارسة والتدريب'}
            </h3>

            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              أجبت بشكل صحيح على <span className="text-emerald-400 font-bold">{correctCount}</span> من أصل <span className="text-white font-bold">{filteredQuestions.length}</span> محطة spotter بنسبة دقة <span className="text-emerald-400 font-bold">{percentage}%</span>.
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
              <span>{showReviewList ? 'إخفاء المراجعة المفصلة' : 'مراجعة جميع المحطات واللآلئ السريرية'}</span>
            </button>

            <button
              type="button"
              onClick={handleRetakeTest}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار</span>
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

          {/* Detailed Question-by-Question Review List */}
          {showReviewList && (
            <div className="space-y-4 pt-6 border-t border-slate-800 text-right animate-in fade-in duration-200">
              <h4 className="text-base font-bold text-white">
                المراجعة الشاملة لجميع المحطات:
              </h4>

              <div className="space-y-3">
                {filteredQuestions.map((q, idx) => {
                  const userAns = selectedAnswers[q.id] || '(لم تتم الإجابة)';
                  const isCorrect = userAns === q.correctAnswer;

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
                        <div className="w-full sm:w-36 h-24 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                          <img
                            src={q.imageUrl}
                            alt={q.structureTarget}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>

                        <div className="flex-1 space-y-1.5">
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
                              {isCorrect ? '✓ إجابة صحيحة' : '✕ إجابة خاطئة'}
                            </span>
                          </div>

                          <div className="text-xs sm:text-sm font-bold text-white">
                            {q.questionAr || q.question}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                            <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                              <span className="text-slate-400 text-[10px] block">إجابتك:</span>
                              <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                {userAns}
                              </span>
                            </div>

                            <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                              <span className="text-slate-400 text-[10px] block">الإجابة الصحيحة:</span>
                              <span className="text-emerald-400 font-bold">
                                {q.correctAnswer}
                              </span>
                            </div>
                          </div>

                          {q.clinicalPearl && (
                            <p className="text-[11px] text-amber-300 pt-1">
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
