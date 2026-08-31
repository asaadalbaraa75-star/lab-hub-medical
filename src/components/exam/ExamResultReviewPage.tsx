import React from 'react';
import { ExamAttempt, ExamQuestion, MedicalExam } from '../../types';
import { storageService } from '../../services/storageService';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  LayoutDashboard,
  Sparkles,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Share2
} from 'lucide-react';

interface ExamResultReviewPageProps {
  attempt: ExamAttempt;
  questions?: ExamQuestion[];
  onRetakeExam?: (exam?: MedicalExam) => void;
  onBrowseExams?: () => void;
  onBackToExams?: () => void;
  onReturnDashboard?: () => void;
}

export const ExamResultReviewPage: React.FC<ExamResultReviewPageProps> = ({
  attempt,
  questions: passedQuestions,
  onRetakeExam,
  onBrowseExams,
  onBackToExams,
  onReturnDashboard
}) => {
  const allBankQuestions = storageService.getExamQuestions();
  const questions: ExamQuestion[] = passedQuestions && passedQuestions.length > 0
    ? passedQuestions
    : attempt.answers.map(a => {
        const found = allBankQuestions.find(q => q.id === a.questionId);
        if (found) return found;
        const fallbackQ: ExamQuestion = {
          id: a.questionId,
          labId: 'anatomy',
          type: 'identification',
          questionText: 'Medical Station Question (محطة فحص طبي)',
          questionTextArabic: 'محطة الفحص الطبي العملي',
          specimenCategory: 'Specimen',
          imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800',
          options: [a.studentAnswer].filter(Boolean),
          correctAnswer: a.studentAnswer || 'Correct Medical Identification',
          explanation: 'Standard Medical Laboratory OSPE reference.',
          clinicalNote: 'Medical laboratory practical reference.',
          timeSeconds: 30,
          marks: 1
        };
        return fallbackQ;
      });

  const totalQuestions = questions.length || attempt.answers.length;
  const correctCount = attempt.answers.filter(a => a.isCorrect).length;
  const wrongCount = totalQuestions - correctCount;

  // Format time spent
  const minutes = Math.floor(attempt.timeUsedSeconds / 60);
  const seconds = attempt.timeUsedSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  // Performance badges configuration
  const performanceConfig = {
    'ممتاز': { color: 'text-emerald-700 bg-emerald-50 border-emerald-300', icon: Sparkles, text: 'ممتاز (Excellent Performance)' },
    'جيد جداً': { color: 'text-indigo-700 bg-indigo-50 border-indigo-300', icon: Award, text: 'جيد جداً (Very Good)' },
    'جيد': { color: 'text-teal-700 bg-teal-50 border-teal-300', icon: TrendingUp, text: 'جيد (Good Pass)' },
    'يحتاج مراجعة': { color: 'text-rose-700 bg-rose-50 border-rose-300', icon: AlertCircle, text: 'يحتاج مراجعة (Needs Review)' }
  };

  const currentBadge = performanceConfig[attempt.performanceLevel] || performanceConfig['جيد'];
  const BadgeIcon = currentBadge.icon;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300" id="exam-result-review">
      {/* Top Banner / Completion Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>OSPE Examination Report</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-50 tracking-tight">
              تم الانتهاء من الاختبار العملي بنجاح
            </h1>
            <p className="text-sm text-slate-300 font-medium">
              {attempt.examTitle} • {new Date(attempt.completedAt).toLocaleDateString('ar-EG', { dateStyle: 'full' })}
            </p>
          </div>

          {/* Large Score Ring / Percentage Badge */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 flex items-center gap-5 shrink-0 shadow-inner">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tracking-tight">
                {attempt.score} <span className="text-xl text-slate-300">/ {attempt.maxScore}</span>
              </div>
              <div className="text-xs font-bold text-slate-300 mt-0.5">الدرجة النهائية</div>
            </div>

            <div className="h-10 border-r border-white/20" />

            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black font-mono text-indigo-300 tracking-tight">
                {attempt.percentage}%
              </div>
              <div className="text-xs font-bold text-slate-300 mt-0.5">النسبة المئوية</div>
            </div>
          </div>
        </div>

        {/* Detailed Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-center">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium">التقييم العام</div>
            <div className="text-sm font-black text-emerald-300 mt-1 flex items-center justify-center gap-1">
              <BadgeIcon className="w-4 h-4" />
              <span>{attempt.performanceLevel}</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium">الإجابات الصحيحة</div>
            <div className="text-sm font-black text-emerald-400 font-mono mt-1">
              {correctCount} سؤال
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium">الإجابات الخاطئة</div>
            <div className="text-sm font-black text-rose-400 font-mono mt-1">
              {wrongCount} سؤال
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium">الوقت المستغرق</div>
            <div className="text-sm font-black text-indigo-300 font-mono mt-1 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{timeFormatted}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          {onRetakeExam && (
            <button
              type="button"
              onClick={() => onRetakeExam()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار</span>
            </button>
          )}
          {(onBrowseExams || onBackToExams) && (
            <button
              type="button"
              onClick={() => {
                if (onBrowseExams) onBrowseExams();
                else if (onBackToExams) onBackToExams();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>جميع الاختبارات</span>
            </button>
          )}
        </div>

        {onReturnDashboard && (
          <button
            type="button"
            onClick={onReturnDashboard}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </button>
        )}
      </div>

      {/* Comprehensive Answer Review Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-black text-slate-900">مراجعة الإجابات والتفسير العلمي (Answer Review)</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              استعراض مفصل لكل سؤال مع التشخيص الدقيق، الصور الطبية، والتعليق الإكلينيكي.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {correctCount} / {totalQuestions} Correct
          </span>
        </div>

        {/* Question Review Cards List */}
        <div className="space-y-6">
          {questions.map((question, index) => {
            const answerRecord = attempt.answers.find(a => a.questionId === question.id);
            const studentAns = answerRecord ? answerRecord.studentAnswer : 'لم يتم الإجابة';
            const isCorrect = answerRecord ? answerRecord.isCorrect : false;

            return (
              <div
                key={question.id}
                className={`bg-white border rounded-2xl overflow-hidden shadow-xs transition-all ${
                  isCorrect ? 'border-emerald-200' : 'border-rose-200'
                }`}
              >
                {/* Question Header Bar */}
                <div
                  className={`p-4 flex flex-wrap items-center justify-between gap-3 border-b ${
                    isCorrect ? 'bg-emerald-50/70 border-emerald-100' : 'bg-rose-50/70 border-rose-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-black font-mono flex items-center justify-center ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      Q{index + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800 font-mono">
                      {question.specimenCategory || 'OSPE Practical Station'}
                    </span>
                    {question.magnificationOrView && (
                      <span className="text-[11px] font-mono text-slate-600 bg-white/80 border border-slate-200 px-2 py-0.5 rounded-md">
                        {question.magnificationOrView}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>إجابة صحيحة (+{question.marks || 1} Mark)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>إجابة خاطئة (0 Mark)</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Question Content Body */}
                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Specimen Thumbnail (5 cols) */}
                  <div className="md:col-span-5 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center min-h-[200px] max-h-[260px] border border-slate-800 shadow-inner">
                    <img
                      src={question.imageUrl}
                      alt={question.questionText}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Right Answers & Explanations (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{question.questionText}</h3>
                      {question.questionTextArabic && (
                        <p className="text-sm font-semibold text-slate-600 mt-0.5">
                          {question.questionTextArabic}
                        </p>
                      )}
                    </div>

                    {/* Answers Comparison Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div
                        className={`p-3 rounded-xl border ${
                          isCorrect
                            ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                            : 'bg-rose-50/50 border-rose-200 text-rose-950'
                        }`}
                      >
                        <span className="font-bold block text-slate-500 mb-1">إجابتك (Your Answer):</span>
                        <div className="font-extrabold text-sm flex items-center gap-1.5">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                          <span>{studentAns}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl border bg-slate-50 border-slate-200 text-slate-950">
                        <span className="font-bold block text-slate-500 mb-1">الإجابة النموذجية (Correct Answer):</span>
                        <div className="font-extrabold text-sm text-indigo-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span>{question.correctAnswer}</span>
                        </div>
                      </div>
                    </div>

                    {/* Scientific Explanation Box */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-700">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                        <span>التفسير العلمي الدقيق (Scientific Explanation):</span>
                      </div>
                      <p className="leading-relaxed text-slate-700 font-medium">
                        {question.explanation}
                      </p>

                      {question.clinicalNote && (
                        <div className="pt-2 mt-2 border-t border-slate-200 text-indigo-900 font-semibold flex items-start gap-1.5">
                          <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-mono text-[10px]">
                            CLINICAL CORRELATION
                          </span>
                          <span className="leading-relaxed">{question.clinicalNote}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
