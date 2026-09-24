import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Award,
  ArrowRight,
  Eye,
  Clock,
  ShieldCheck,
  Send
} from 'lucide-react';
import { HistologySlideViewer } from './HistologySlideViewer';
import { ALL_HISTOLOGY_LESSONS, HistologyLessonItem, getSlideMetadata } from './HistologyCurriculumData';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';

interface ExamQuestionItem {
  id: string;
  lesson: HistologyLessonItem;
  prompt: string;
  promptAr: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  explanation: string;
}

interface HistologyPracticalExamViewProps {
  onBackToHome: () => void;
}

export const HistologyPracticalExamView: React.FC<HistologyPracticalExamViewProps> = ({
  onBackToHome
}) => {
  // Generate OPSE written spotter identification questions from all histology lessons with visual slides
  const examQuestions: ExamQuestionItem[] = useMemo(() => {
    const slideLessons = ALL_HISTOLOGY_LESSONS.filter(
      l => l.sectionId !== 'sec_intro_microscopes' || l.id === 'lesson_compound_microscope'
    );

    return slideLessons.map((lesson, idx) => {
      // Build comprehensive acceptableAnswers list (lesson title, specimen, clean synonyms, Arabic title)
      const acceptable = Array.from(new Set([
        lesson.titleEn.trim().toLowerCase(),
        lesson.titleAr.trim().toLowerCase(),
        (lesson.specimen || '').trim().toLowerCase(),
        ...lesson.labels.map(l => l.label.trim().toLowerCase()),
        lesson.titleEn.toLowerCase().replace(/epithelium|tissue|stain|slide/gi, '').trim()
      ])).filter(Boolean);

      return {
        id: `opse_histology_${idx}`,
        lesson,
        prompt: 'Identify the tissue, organ, or cellular layer indicated under the microscope:',
        promptAr: 'حدد نوع النسيج أو العضو أو الطبقة الخلوية المشار إليها تحت المجهر:',
        correctAnswer: lesson.titleEn,
        acceptableAnswers: acceptable,
        explanation: `${lesson.titleEn} (${lesson.titleAr}): ${lesson.quickExplanation}. Diagnostic key features: ${lesson.labels.map(l => l.label).join(', ')}.`
      };
    }).sort(() => 0.5 - Math.random());
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQ = examQuestions[currentIndex];
  const totalQ = examQuestions.length;

  // 30-Second timer countdown per slide
  useEffect(() => {
    if (isSubmitted || isFinished || !currentQ) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimeLeft(30);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time expired for this station: auto-submit with current or empty answer
          clearInterval(timerRef.current!);
          handleAutoSubmitOnTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isSubmitted, isFinished]);

  const checkIsCorrect = (userAns: string, q: ExamQuestionItem): boolean => {
    const clean = userAns.trim().toLowerCase();
    if (!clean) return false;
    const cleanCorrect = q.correctAnswer.trim().toLowerCase();
    if (clean === cleanCorrect) return true;
    return q.acceptableAnswers.some(acc => {
      const cleanAcc = acc.trim().toLowerCase();
      return clean === cleanAcc || (cleanAcc.length > 3 && (clean.includes(cleanAcc) || cleanAcc.includes(clean)));
    });
  };

  const isCorrect = currentQ ? checkIsCorrect(studentAnswer, currentQ) : false;

  const handleAutoSubmitOnTimeExpired = () => {
    setIsSubmitted(true);
    if (currentQ && checkIsCorrect(studentAnswer, currentQ)) {
      setScore(prev => prev + 1);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitted) return;
    setIsSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (currentQ && checkIsCorrect(studentAnswer, currentQ)) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQ - 1) {
      setCurrentIndex(prev => prev + 1);
      setStudentAnswer('');
      setIsSubmitted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setStudentAnswer('');
    setIsSubmitted(false);
    setIsFinished(false);
    setScore(0);
    setTimeLeft(30);
  };

  if (isFinished) {
    const percentage = Math.round((score / totalQ) * 100);
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center max-w-3xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 w-full shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
              OPSE Written Spotter Examination Completed
            </span>
            <h2 className="text-2xl font-black text-white">
              نتيجة امتحان علم الأنسجة العملي الكتابي
            </h2>
            <p className="text-xs text-slate-400">
              المراجع الأكاديمي المعتمد: <strong className="text-teal-300">الدكتور ثابت الذيفاني</strong>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-around">
            <div>
              <span className="text-xs text-slate-400 block">الدرجة النهائية</span>
              <span className="text-3xl font-black text-white font-mono">{score} / {totalQ}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">النسبة المئوية</span>
              <span className="text-3xl font-black text-teal-400 font-mono">{percentage}%</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار</span>
            </button>
            <button
              onClick={onBackToHome}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700"
            >
              العودة إلى المعمل
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* 1. TOP HEADER & SCORE & TIMER */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <button
          onClick={onBackToHome}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-teal-400" />
          <span>Exit Exam Mode</span>
        </button>

        <div className="flex items-center gap-3 flex-wrap">
          {/* 30-Second Countdown Timer Badge */}
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold font-mono transition-colors ${
            timeLeft <= 5 
              ? 'bg-rose-950/80 text-rose-300 border-rose-500/80 animate-pulse' 
              : 'bg-indigo-950/60 text-indigo-300 border-indigo-500/50'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
            <span className="text-[10px] text-slate-400">(30s/Slide)</span>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Slide {currentIndex + 1} of {totalQ}
          </span>

          <div className="px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold font-mono">
            Score: {score} / {currentIndex + (isSubmitted ? 1 : 0)}
          </div>
        </div>
      </div>

      {/* 2. TITLE BADGE & REVIEWER RECOGNITION */}
      <div className="text-center space-y-1.5">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center justify-center gap-2">
            <span>🔬 OPSE WRITTEN SPOTTER IDENTIFICATION</span>
          </h1>
          <OwnershipWatermark variant="badge" className="text-[10px]" />
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>المراجع الأكاديمي المعتمد للامتحانات: <strong className="text-teal-300">الدكتور ثابت الذيفاني</strong></span>
        </div>
      </div>

      {/* 3. LARGE MICROSCOPIC IMAGE (BLIND PRACTICE MODE) */}
      <div className="space-y-3">
        <HistologySlideViewer
          realImagePath={currentQ.lesson.realImagePath}
          isRealMicroscopy={currentQ.lesson.isRealMicroscopy}
          visualId={currentQ.lesson.visualId}
          titleEn={currentQ.lesson.titleEn}
          stain={currentQ.lesson.stain}
          magnification={currentQ.lesson.magnification}
          specimen={isSubmitted ? currentQ.lesson.specimen : 'Specimen Hidden'}
          mode="practice"
          labels={currentQ.lesson.labels}
          showLabelsDefault={false}
          examMarker={currentQ.lesson.examMarker}
          whatToLookFor={currentQ.lesson.whatToLookFor}
          slideMetadata={getSlideMetadata(currentQ.lesson)}
        />
      </div>

      {/* 4. OPSE WRITTEN SPOTTER INPUT CARD (No A,B,C,D Options) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-bold text-white">
            {currentQ.prompt}
          </h3>
          <p className="text-xs text-slate-400 font-arabic" dir="rtl">
            {currentQ.promptAr}
          </p>
        </div>

        {/* Written Text Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              disabled={isSubmitted}
              value={studentAnswer}
              onChange={e => setStudentAnswer(e.target.value)}
              placeholder="اكتب الإجابة النسيجية هنا (مثال: Simple Columnar Epithelium, Kidney Cortex...)"
              className="w-full bg-slate-950 border-2 border-slate-700 focus:border-teal-400 focus:ring-4 focus:ring-teal-500/20 disabled:opacity-80 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 outline-none transition-all font-semibold"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
            {!isSubmitted && (
              <button
                type="submit"
                disabled={!studentAnswer.trim()}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>تأكيد الإجابة</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>* مطابقة وتصحيح آلي فوري مع مصفوفة المصطلحات المعتمدة (acceptableAnswers).</span>
            <span className="font-mono text-teal-400 font-bold">مؤقت: 30 ثانية لكل شريحة</span>
          </div>
        </form>

        {/* Navigation & Status Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          {!isSubmitted ? (
            <button
              onClick={() => handleSubmit()}
              disabled={!studentAnswer.trim()}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              Submit Identification
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              <span>{currentIndex < totalQ - 1 ? 'Next Slide' : 'إنهاء الامتحان وعرض النتيجة'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {isSubmitted && (
            <span className={`text-xs font-bold flex items-center gap-1.5 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>إجابة صحيحة ومقبولة ✓</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>الإجابة الصحيحة: {currentQ.correctAnswer}</span>
                </>
              )}
            </span>
          )}
        </div>

        {/* Explanation Banner */}
        {isSubmitted && (
          <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
            isCorrect ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-rose-950/30 border-rose-500/40'
          }`}>
            <div className="flex items-center gap-2 font-bold">
              {isCorrect ? (
                <span className="text-emerald-400 flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  ✓ Correct Identification!
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1.5 text-sm">
                  <XCircle className="w-4 h-4" />
                  ✕ Incorrect Identification
                </span>
              )}
            </div>
            <p className="text-slate-200 leading-relaxed font-normal">
              {currentQ.explanation}
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              المراجع الأكاديمي المعتمد: <strong>الدكتور ثابت الذيفاني</strong>
            </div>
          </div>
        )}
      </div>

      {/* Platform Ownership Notice */}
      <div className="pt-2 flex justify-center">
        <OwnershipWatermark variant="minimal" />
      </div>
    </div>
  );
};
