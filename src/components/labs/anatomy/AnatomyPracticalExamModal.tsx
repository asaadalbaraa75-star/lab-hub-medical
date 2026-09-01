import React, { useState, useEffect, useRef } from 'react';
import {
  AnatomyExamConfig,
  AnatomyExamQuestionItem,
  ANATOMY_PRACTICAL_EXAMS
} from './AnatomyData';
import { AnatomyTopicVisual } from './AnatomyTopicVisuals';
import { anatomyProgressService } from './AnatomyStudentProgressService';
import { storageService } from '../../../services/storageService';
import {
  X,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Award,
  BookOpen,
  Sparkles,
  Maximize2,
  Minimize2,
  Check,
  Send,
  HelpCircle,
  Stethoscope,
  Target
} from 'lucide-react';

interface AnatomyPracticalExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  examId?: string;
  onExamComplete?: () => void;
}

export const AnatomyPracticalExamModal: React.FC<AnatomyPracticalExamModalProps> = ({
  isOpen,
  onClose,
  examId = 'exam_comprehensive',
  onExamComplete
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(examId);
  const [examState, setExamState] = useState<'intro' | 'running' | 'review' | 'completed'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [textInputVal, setTextInputVal] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isZoomed, setIsZoomed] = useState(false);
  const [instantFeedback, setInstantFeedback] = useState(false);
  const [showInstantResult, setShowInstantResult] = useState(false);

  const activeExam = ANATOMY_PRACTICAL_EXAMS.find(e => e.id === selectedExamId) || ANATOMY_PRACTICAL_EXAMS[0];
  const questions = activeExam.questions;
  const currentQuestion: AnatomyExamQuestionItem | undefined = questions[currentQuestionIndex];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync selected exam if prop changes
  useEffect(() => {
    if (examId) {
      setSelectedExamId(examId);
    }
  }, [examId]);

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      setExamState('intro');
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setTextInputVal('');
      setShowInstantResult(false);
    }
  }, [isOpen, selectedExamId]);

  // Timer effect during running exam
  useEffect(() => {
    if (examState !== 'running' || !currentQuestion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimeLeft(activeExam.timePerQuestionSec || 30);
    setShowInstantResult(false);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time expired for this question: advance to next question
          handleNextQuestion();
          return activeExam.timePerQuestionSec || 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState, currentQuestionIndex, selectedExamId]);

  // Update text input when changing questions
  useEffect(() => {
    if (currentQuestion) {
      setTextInputVal(userAnswers[currentQuestion.id] || '');
    }
  }, [currentQuestionIndex]);

  if (!isOpen) return null;

  const handleStartExam = () => {
    setExamState('running');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTextInputVal('');
    setShowInstantResult(false);
  };

  const checkIsAnswerCorrect = (question: AnatomyExamQuestionItem, answer: string): boolean => {
    if (!answer || !answer.trim()) return false;
    const cleanAnswer = answer.trim().toLowerCase();
    const cleanCorrect = question.correctAnswer.trim().toLowerCase();

    if (cleanAnswer === cleanCorrect) return true;

    if (question.acceptableAnswers && question.acceptableAnswers.length > 0) {
      return question.acceptableAnswers.some(acc => {
        const cleanAcc = acc.trim().toLowerCase();
        return cleanAnswer === cleanAcc || cleanAnswer.includes(cleanAcc) || cleanAcc.includes(cleanAnswer);
      });
    }

    return false;
  };

  const handleSelectOption = (option: string) => {
    if (!currentQuestion) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));

    if (instantFeedback) {
      setShowInstantResult(true);
    } else {
      // Small pause then next
      setTimeout(() => {
        handleNextQuestion();
      }, 350);
    }
  };

  const handleTextSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuestion || !textInputVal.trim()) return;

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: textInputVal.trim()
    }));

    if (instantFeedback) {
      setShowInstantResult(true);
    } else {
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowInstantResult(false);
    } else {
      finishExam();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowInstantResult(false);
    }
  };

  const finishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Calculate score
    let score = 0;
    questions.forEach(q => {
      const ans = userAnswers[q.id];
      if (ans && checkIsAnswerCorrect(q, ans)) {
        score++;
      }
    });

    // Save to anatomy progress service
    anatomyProgressService.recordExamScore(activeExam.id, score, questions.length);

    // Save to central storageService
    try {
      const currentUser = storageService.getCurrentUser();
      storageService.recordQuizAttempt({
        id: `attempt_${Date.now()}`,
        quizId: activeExam.id,
        quizTitle: activeExam.titleAr,
        labId: 'anatomy',
        userId: currentUser.id,
        score: score,
        maxScore: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        passed: score / questions.length >= 0.6,
        answers: questions.map((q, idx) => ({
          questionId: q.id,
          selectedIndex: idx,
          isCorrect: checkIsAnswerCorrect(q, userAnswers[q.id] || '')
        })),
        completedAt: new Date().toISOString()
      });
    } catch {
      // ignore
    }

    setExamState('completed');
    if (onExamComplete) onExamComplete();
  };

  // Calculate results statistics
  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach(q => {
      const ans = userAnswers[q.id];
      if (ans && checkIsAnswerCorrect(q, ans)) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    return {
      correctCount,
      incorrectCount: questions.length - correctCount,
      percentage,
      passed: percentage >= 60
    };
  };

  const results = calculateResults();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      dir="rtl"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                  OSPE PRACTICAL EXAM
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {activeExam.titleAr}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {activeExam.titleEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {examState === 'running' && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                  timeLeft <= 10
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Intro Screen */}
        {examState === 'intro' && (
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-right">
            {/* Exam Selector Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 block">
                اختر الاختبار العملي (Select Practical Exam Station):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {ANATOMY_PRACTICAL_EXAMS.map(exam => {
                  const isSelected = exam.id === selectedExamId;
                  return (
                    <button
                      key={exam.id}
                      type="button"
                      onClick={() => setSelectedExamId(exam.id)}
                      className={`p-3.5 rounded-2xl text-right transition-all border flex flex-col justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-white line-clamp-1">
                          {exam.titleAr}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                        <span>{exam.questionCount} محطة فحص</span>
                        <span>•</span>
                        <span>{exam.timePerQuestionSec}ث / سؤال</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exam Briefing */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <Sparkles className="w-5 h-5" />
                <h4 className="font-bold text-sm text-white">
                  تعليمات الاختبار العملي (OSPE Exam Guidelines)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">⏱️ التوقيت الزمني</div>
                  <div className="text-white font-mono font-bold">30 ثانية لكل سؤال</div>
                  <p className="text-[11px] text-slate-400">ينتقل الاختبار تلقائياً عند انتهاء الوقت.</p>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">🎯 طبيعة المحطات</div>
                  <div className="text-white font-bold">صور حقيقية وعينات</div>
                  <p className="text-[11px] text-slate-400">تحديد العظام، العضلات، الأعصاب، والأجهزة.</p>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">🏆 معايير النجاح</div>
                  <div className="text-emerald-400 font-mono font-bold">60% للنجاح (12/20)</div>
                  <p className="text-[11px] text-slate-400">يتم حفظ النتيجة تلقائياً في ملفك الأكاديمي.</p>
                </div>
              </div>

              {/* Instant feedback toggle */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white">نمط التصحيح الفوري مع الشرح الطبي</span>
                  <p className="text-[11px] text-slate-400">عرض الإجابة الصحيحة وشرح اللؤلؤة السريرية فور الإجابة على كل سؤال.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setInstantFeedback(!instantFeedback)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    instantFeedback ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                      instantFeedback ? 'right-1' : 'right-7'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={handleStartExam}
                className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-102 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>بدء الاختبار العملي الآن ({questions.length} أسئلة)</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Body: Running Exam Station */}
        {examState === 'running' && currentQuestion && (
          <div className="flex-1 overflow-y-auto flex flex-col justify-between p-4 sm:p-6 space-y-4">
            {/* Top Station Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                    محطة {currentQuestionIndex + 1} من {questions.length}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">
                    {currentQuestion.structureNameAr}
                  </span>
                </div>

                <span className="text-slate-400 text-xs font-mono">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% مكتمل
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Main Central Specimen Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
              {/* Left Column: Specimen Image with Pin */}
              <div className="lg:col-span-7 relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[340px] flex items-center justify-center group">
                {currentQuestion.topicId ? (
                  <div className={`w-full h-full flex items-center justify-center transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'}`}>
                    <AnatomyTopicVisual
                      topicId={currentQuestion.topicId}
                      interactive={false}
                      variant="full"
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <img
                    src={currentQuestion.image}
                    alt={currentQuestion.structureNameEn}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isZoomed ? 'scale-125' : 'scale-100'
                    }`}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40 pointer-events-none" />

                {/* Target Marker Pin */}
                {currentQuestion.markerPosition && (
                  <div
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
                    style={{
                      left: `${currentQuestion.markerPosition.x}%`,
                      top: `${currentQuestion.markerPosition.y}%`
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute animate-ping inline-flex h-8 w-8 rounded-full bg-rose-400 opacity-75" />
                      <div className="relative w-8 h-8 rounded-full bg-rose-600 text-white font-mono font-black text-xs flex items-center justify-center border-2 border-white shadow-xl">
                        {currentQuestion.markerLabel || (currentQuestionIndex + 1)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Zoom toggle button */}
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute top-3 left-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-white border border-slate-700 transition-colors"
                >
                  {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Specimen Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-slate-300">
                  📍 محطة التحديد العملي
                </div>
              </div>

              {/* Right Column: Question & Interaction Controls */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block font-mono">
                      Question Prompt:
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {currentQuestion.questionAr}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {currentQuestion.questionEn}
                    </p>
                  </div>

                  {/* Input Mode: Multiple Choice */}
                  {currentQuestion.options && currentQuestion.options.length > 0 ? (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold text-slate-400 block">
                        اختر الإجابة الصحيحة:
                      </span>
                      <div className="space-y-2">
                        {currentQuestion.options.map((opt, idx) => {
                          const isSelected = userAnswers[currentQuestion.id] === opt;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSelectOption(opt)}
                              className={`w-full p-3 rounded-xl text-right text-xs font-semibold transition-all border flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                                  : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-300 font-mono text-[10px] flex items-center justify-center font-bold">
                                  {idx + 1}
                                </span>
                                <span>{opt}</span>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Input Mode: Type In */
                    <form onSubmit={handleTextSubmit} className="space-y-3 pt-2">
                      <label className="text-[11px] font-bold text-slate-400 block">
                        {currentQuestion.promptAr || 'اكتب اسم التركيب باللغة الإنجليزية أو العربية:'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={textInputVal}
                          onChange={e => setTextInputVal(e.target.value)}
                          placeholder="مثال: Femur, Tibia, Biceps..."
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        * يتم قبول المسميات اللاتينية، الإنجليزية، أو العربية المعربة.
                      </p>
                    </form>
                  )}

                  {/* Instant Feedback Panel if activated */}
                  {showInstantResult && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-2 animate-in fade-in">
                      <div className="flex items-center gap-2">
                        {checkIsAnswerCorrect(currentQuestion, userAnswers[currentQuestion.id] || '') ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>إجابة صحيحة! أحسنت.</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs">
                            <XCircle className="w-4 h-4" />
                            <span>إجابة غير دقيقة. الإجابة الصحيحة: {currentQuestion.correctAnswer}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        💡 {currentQuestion.explanationAr}
                      </p>
                      <div className="text-[10px] text-amber-300 font-medium">
                        ⭐ {currentQuestion.examPearl}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={finishExam}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      إنهاء الاختبار
                    </button>

                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="inline-flex items-center gap-1 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                    >
                      <span>
                        {currentQuestionIndex === questions.length - 1 ? 'إنهاء وحساب النتيجة' : 'السؤال التالي'}
                      </span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body: Results Screen */}
        {examState === 'completed' && (
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-right">
            <div className="text-center space-y-3 py-4">
              <div
                className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center border-2 shadow-2xl ${
                  results.passed
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                }`}
              >
                {results.passed ? <Award className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {results.passed ? '🎉 مبروك! اجتزت الاختبار العملي بنجاح' : 'تحتاج للمزيد من المراجعة والتدريب'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {results.passed
                    ? 'أظهرت استيعاباً ممتازاً للتراكيب التشريحية والمعالم السريرية.'
                    : 'راجع المحطات التي أخطأت بها وكرر المحاولة لتحقيق الامتياز.'}
                </p>
              </div>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-[11px] text-slate-400 font-bold block">النسبة المئوية</span>
                <div className={`text-2xl font-black font-mono ${results.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {results.percentage}%
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-[11px] text-slate-400 font-bold block">الدرجة النهائية</span>
                <div className="text-2xl font-black font-mono text-white">
                  {results.correctCount} / {questions.length}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-[11px] text-slate-400 font-bold block">الإجابات الصحيحة</span>
                <div className="text-2xl font-black font-mono text-emerald-400">
                  {results.correctCount} ✓
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-[11px] text-slate-400 font-bold block">الأخطاء والمتروكات</span>
                <div className="text-2xl font-black font-mono text-rose-400">
                  {results.incorrectCount} ✕
                </div>
              </div>
            </div>

            {/* Action Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setExamState('review')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>مراجعة جميع الإجابات واللآلئ السريرية</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleStartExam}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة الاختبار</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-colors cursor-pointer"
                >
                  العودة إلى المختبر
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body: Detailed Review Screen */}
        {examState === 'review' && (
          <div className="p-6 flex-1 overflow-y-auto space-y-5 text-right">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-bold text-base text-white">
                  مراجعة تفصيلية لمحطات الاختبار العملي
                </h4>
                <p className="text-xs text-slate-400">
                  استعراض جميع الأسئلة مع الإجابات النموذجية واللآلئ السريرية ذات الصلة.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setExamState('completed')}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                العودة للنتيجة
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userAns = userAnswers[q.id] || '(لم تتم الإجابة)';
                const isCorrect = checkIsAnswerCorrect(q, userAns);

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Thumbnail */}
                      <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                        <img
                          src={q.image}
                          alt={q.structureNameEn}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px] font-bold">
                            محطة #{idx + 1}
                          </span>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              isCorrect
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {isCorrect ? '✓ إجابة صحيحة' : '✕ إجابة خاطئة'}
                          </span>
                        </div>

                        <div className="text-xs sm:text-sm font-bold text-white">
                          {q.questionAr}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                            <span className="text-slate-400 text-[10px] block">إجابتك:</span>
                            <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {userAns}
                            </span>
                          </div>

                          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                            <span className="text-slate-400 text-[10px] block">الإجابة الصحيحة:</span>
                            <span className="text-emerald-400 font-bold">
                              {q.correctAnswer}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed pt-1">
                          💡 <span className="font-semibold">التفسير الطبي:</span> {q.explanationAr}
                        </p>

                        <div className="text-[11px] text-amber-300 font-medium">
                          ⭐ <span className="font-bold">اللؤلؤة الامتحانية (Exam Pearl):</span> {q.examPearl}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
