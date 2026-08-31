import React, { useState } from 'react';
import { Quiz, LabSubjectId, StudentProgress } from '../../types';
import { CheckSquare, Clock, Award, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface QuizzesOverviewPageProps {
  quizzes: Quiz[];
  progress: StudentProgress;
  onStartQuiz: (quiz: Quiz) => void;
}

export const QuizzesOverviewPage: React.FC<QuizzesOverviewPageProps> = ({
  quizzes = [],
  progress,
  onStartQuiz
}) => {
  const [selectedLab, setSelectedLab] = useState<string>('all');

  const safeQuizzes = Array.isArray(quizzes) ? quizzes : [];

  const filteredQuizzes = safeQuizzes.filter(q => {
    if (selectedLab !== 'all' && q.labId !== selectedLab) return false;
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300" id="quizzes-overview-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#D6A85F]/20 text-[#D6A85F] uppercase">
              OSPE Examination Prep
            </span>
            <span className="text-xs text-[#94A3B8]">{quizzes.length} Standardized Quizzes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#E5E7EB] tracking-tight mt-1">
            LABORATORY QUIZZES & ASSESSMENTS
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'anatomy', 'histology', 'bacteriology'].map(labId => (
            <button
              key={labId}
              type="button"
              onClick={() => setSelectedLab(labId)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors uppercase ${
                selectedLab === labId
                  ? 'bg-[#5B9BD5] text-[#0F172A]'
                  : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155]'
              }`}
            >
              {labId === 'all' ? 'All Labs' : labId}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredQuizzes.map(quiz => {
          const attempt = progress.completedQuizzes.find(a => a.quizId === quiz.id);

          return (
            <div
              key={quiz.id}
              className="bg-[#1E293B] border border-[#334155] hover:border-[#5B9BD5]/60 rounded-3xl p-6 shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#172235] text-[#5FAFA8] border border-[#334155] uppercase">
                    {quiz.labId} Lab
                  </span>
                  <span className="text-xs text-[#94A3B8] flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-[#D6A85F]" /> {quiz.timeLimitMinutes} mins
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#E5E7EB] group-hover:text-[#5B9BD5] transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                    {quiz.questions.length} Questions • Multiple choice & structure identification
                  </p>
                </div>

                {attempt && (
                  <div className="bg-[#172235] p-3 rounded-2xl border border-[#334155] flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">Last Attempt:</span>
                    <span className={`font-bold ${attempt.passed ? 'text-[#6FAF8F]' : 'text-[#C96B6B]'}`}>
                      {attempt.percentage}% ({attempt.passed ? 'Passed' : 'Needs Review'})
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#334155]">
                <button
                  type="button"
                  onClick={() => onStartQuiz(quiz)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#5B9BD5] hover:bg-[#4A8AC4] text-[#0F172A] font-extrabold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>{attempt ? 'Retake Quiz' : 'Start Timed Quiz'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
