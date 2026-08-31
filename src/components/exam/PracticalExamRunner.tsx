import React, { useState, useEffect, useRef } from 'react';
import {
  MedicalExam,
  ExamQuestion,
  ExamAttempt,
  ExamAnswerRecord,
  User
} from '../../types';
import {
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Award,
  Maximize2,
  HelpCircle,
  Flag,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Bookmark
} from 'lucide-react';

interface PracticalExamRunnerProps {
  exam: MedicalExam;
  currentUser: User;
  onFinishExam?: (attempt: ExamAttempt) => void;
  onComplete?: (attempt: ExamAttempt) => void;
  onExit: () => void;
}

export const PracticalExamRunner: React.FC<PracticalExamRunnerProps> = ({
  exam,
  currentUser,
  onFinishExam,
  onComplete,
  onExit
}) => {
  const handleFinalCompletion = (attempt: ExamAttempt) => {
    if (onComplete) onComplete(attempt);
    else if (onFinishExam) onFinishExam(attempt);
  };
  const questions: ExamQuestion[] = exam.questions && exam.questions.length > 0 ? exam.questions : [];
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Time remaining in seconds for the current question station (default 30s per question or total time)
  const defaultQuestionTime = questions[currentIndex]?.timeSeconds || 30;
  const [timeRemaining, setTimeRemaining] = useState(defaultQuestionTime);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentIndex];

  // Reset station timer when question changes
  useEffect(() => {
    if (!currentQuestion) return;
    const qTime = currentQuestion.timeSeconds || 30;
    setTimeRemaining(qTime);
  }, [currentIndex, currentQuestion]);

  // Overall stopwatch
  useEffect(() => {
    totalTimerRef.current = setInterval(() => {
      setTotalTimeSpent(prev => prev + 1);
    }, 1000);
    return () => {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  }, []);

  // Station circular countdown timer
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleAutoAdvance();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoAdvance();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeRemaining, currentIndex]);

  const handleAutoAdvance = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Auto-submit when last question expires
      handleSubmitExam();
    }
  };

  const handleSelectOption = (option: string) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsSubmitModalOpen(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (totalTimerRef.current) clearInterval(totalTimerRef.current);

    let calculatedScore = 0;
    const answerRecords: ExamAnswerRecord[] = questions.map(q => {
      const studentAns = answers[q.id] || '';
      const isCorrect = studentAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      if (isCorrect) {
        calculatedScore += q.marks || 1;
      }
      return {
        questionId: q.id,
        studentAnswer: studentAns || 'Unanswered (لم يتم الإجابة)',
        isCorrect,
        timeSpentSeconds: q.timeSeconds || 30
      };
    });

    const totalMarks = questions.reduce((acc, q) => acc + (q.marks || 1), 0) || 1;
    const percentage = Math.round((calculatedScore / totalMarks) * 100);
    const passed = percentage >= exam.passingScorePercent;

    let performanceLevel: 'ممتاز' | 'جيد جداً' | 'جيد' | 'يحتاج مراجعة' = 'يحتاج مراجعة';
    if (percentage >= 90) performanceLevel = 'ممتاز';
    else if (percentage >= 80) performanceLevel = 'جيد جداً';
    else if (percentage >= 70) performanceLevel = 'جيد';

    const attempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      examId: exam.id,
      examTitle: exam.title,
      labId: exam.labId,
      userId: currentUser.id,
      userName: currentUser.name,
      score: calculatedScore,
      maxScore: totalMarks,
      percentage,
      passed,
      performanceLevel,
      timeUsedSeconds: totalTimeSpent,
      totalTimeSeconds: exam.timeLimitMinutes * 60,
      answers: answerRecords,
      completedAt: new Date().toISOString()
    };

    handleFinalCompletion(attempt);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8 bg-white rounded-2xl border border-slate-200">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">لا توجد أسئلة متوفرة في هذا الاختبار</h2>
          <button
            onClick={onExit}
            className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm"
          >
            العودة للقائمة
          </button>
        </div>
      </div>
    );
  }

  // Circular progress calculations for timer
  const maxTime = currentQuestion.timeSeconds || 30;
  const strokeDashoffset = ((maxTime - timeRemaining) / maxTime) * 100;
  const isUrgent = timeRemaining <= 5;

  const currentAnswer = answers[currentQuestion.id] || '';
  const isAnswered = currentAnswer.length > 0;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-6xl mx-auto space-y-5 animate-in fade-in duration-300" id="practical-exam-runner">
      {/* Top OSPE Examination Header */}
      <header className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {exam.labId.toUpperCase()} PRACTICAL OSPE
            </span>
            <span className="text-xs text-slate-400">
              Exam ID: <span className="font-mono text-slate-300">{exam.id}</span>
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-100 tracking-tight">
            {exam.titleArabic || exam.title}
          </h1>
        </div>

        {/* Circular Countdown Timer Station */}
        <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700/80 backdrop-blur-sm">
          {/* Animated SVG Circular Gauge */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-700"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`transition-all duration-1000 ${
                  isUrgent ? 'text-rose-500' : timeRemaining <= 10 ? 'text-amber-400' : 'text-indigo-400'
                }`}
                strokeDasharray="100, 100"
                strokeDashoffset={strokeDashoffset}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className={`text-xs font-mono font-black ${isUrgent ? 'text-rose-400 animate-pulse' : 'text-slate-100'}`}>
                {timeRemaining}s
              </span>
            </div>
          </div>

          <div className="text-left">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Station Timer</div>
            <div className={`text-sm font-mono font-extrabold ${isUrgent ? 'text-rose-400' : 'text-slate-200'}`}>
              00:{timeRemaining.toString().padStart(2, '0')}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="ml-2 px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold transition-colors shadow-sm"
          >
            إنهاء الاختبار
          </button>
        </div>
      </header>

      {/* Question Stepper / Palette Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 whitespace-nowrap">
          <span>السؤال:</span>
          <span className="font-mono text-indigo-600 text-sm font-black">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-slate-400">({answeredCount} تم إجابته)</span>
        </div>

        {/* Question Bubbles */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {questions.map((q, idx) => {
            const hasAns = !!answers[q.id];
            const isCurr = idx === currentIndex;
            const isFlag = !!flaggedQuestions[q.id];

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all ${
                  isCurr
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-xs'
                    : isFlag
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : hasAns
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={`سؤال ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => toggleFlag(currentQuestion.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
            flaggedQuestions[currentQuestion.id]
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Flag className="w-3.5 h-3.5" />
          <span>{flaggedQuestions[currentQuestion.id] ? 'مُميز للمراجعة' : 'تمييز'}</span>
        </button>
      </div>

      {/* Main Examination Question Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Specimen / Test Image Viewer (6 Cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 font-mono">
                {currentQuestion.specimenCategory || 'Specimen Identification'}
              </span>
            </div>
            {currentQuestion.magnificationOrView && (
              <span className="text-[11px] font-mono font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                {currentQuestion.magnificationOrView}
              </span>
            )}
          </div>

          {/* High-Resolution Specimen Image Box */}
          <div className="relative bg-slate-950 flex items-center justify-center overflow-hidden group min-h-[320px] max-h-[460px]">
            <img
              src={currentQuestion.imageUrl}
              alt="Medical Practical Specimen"
              className={`w-full h-full object-contain transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              loading="eager"
            />
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg backdrop-blur-xs text-xs flex items-center gap-1 shadow-md"
              title="تكبير / تصغير العينة"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">{isZoomed ? 'تصغير' : 'تكبير'}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 text-center">
            💡 اضغط على الصورة للتكبير وفحص المعالم التشريحية / النسيجية بدقة.
          </div>
        </div>

        {/* Right: Question Text & Options (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Question Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                السؤال {currentIndex + 1} من {totalQuestions}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                الدرجات: {currentQuestion.marks || 1} Mark
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.questionText}
              </h2>
              {currentQuestion.questionTextArabic && (
                <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                  {currentQuestion.questionTextArabic}
                </p>
              )}
            </div>

            {/* Answer Options Grid */}
            <div className="space-y-2.5 pt-2" role="radiogroup" aria-label="خيارات الإجابة">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = currentAnswer === option;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group active:scale-[0.99] ${
                      isSelected
                        ? 'bg-indigo-50/90 border-indigo-600 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors font-mono ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-sm font-semibold">{option}</span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>السابق</span>
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md active:scale-95"
              >
                <span>السؤال التالي</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>تسليم الامتحان وإنهاء المراجعة</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">تأكيد تسليم الامتحان العملي</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                هل أنت متأكد من رغبتك في إنهاء الامتحان؟
              </p>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 flex justify-around mt-3">
                <div>
                  <span className="text-slate-400 block">الأسئلة المُجابة</span>
                  <span className="text-emerald-600 font-bold text-sm">{answeredCount}</span>
                </div>
                <div className="border-r border-slate-200" />
                <div>
                  <span className="text-slate-400 block">المتبقية بدون إجابة</span>
                  <span className="text-rose-500 font-bold text-sm">{totalQuestions - answeredCount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                متابعة الحل
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                تأكيد التسليم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
