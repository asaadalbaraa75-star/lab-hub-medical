import React from 'react';
import { StudentProgress, User, LabSubjectId } from '../../types';
import {
  TrendingUp,
  Award,
  BookOpen,
  CheckSquare,
  Clock,
  Bone,
  Microscope,
  FlaskConical,
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface ProgressPageProps {
  progress: StudentProgress;
  currentUser: User;
  onOpenPractical: (labId: string, practicalId: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  progress,
  currentUser,
  onOpenPractical
}) => {
  const bioPercent = progress.biochemistryPercent ?? 70;
  const overallAvg = Math.round(
    (progress.anatomyPercent + progress.histologyPercent + bioPercent) / 3
  );

  const subjectCards = [
    {
      id: 'anatomy' as LabSubjectId,
      name: 'Anatomy Lab',
      code: 'ANAT-201',
      percent: progress.anatomyPercent,
      color: '#4F46E5',
      icon: Bone,
      completed: 11,
      total: 14
    },
    {
      id: 'histology' as LabSubjectId,
      name: 'Histology Lab',
      code: 'HIST-202',
      percent: progress.histologyPercent,
      color: '#0D9488',
      icon: Microscope,
      completed: 8,
      total: 12
    },
    {
      id: 'biochemistry' as LabSubjectId,
      name: 'Biochemistry Lab',
      code: 'BIO-204',
      percent: bioPercent,
      color: '#D97706',
      icon: FlaskConical,
      completed: 4,
      total: 6
    }
  ];

  const badges = [
    {
      title: 'Microscopy Master',
      desc: 'Mastered 40x and 100x oil-immersion slide alignment',
      icon: Microscope,
      earned: progress.histologyPercent >= 70,
      color: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      title: 'Osteology Specialist',
      desc: 'Passed upper limb and scapular bony landmarks spotter',
      icon: Bone,
      earned: progress.anatomyPercent >= 75,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200'
    },
    {
      title: 'Carbohydrate Profiler',
      desc: '100% score on qualitative carbohydrate reactions and Benedict test',
      icon: FlaskConical,
      earned: bioPercent >= 75,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      title: 'Honor Practical Scholar',
      desc: 'Maintained >85% average across all laboratory OSPE quizzes',
      icon: Award,
      earned: progress.averageScore >= 85,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300" id="progress-tracking-page">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase border border-indigo-100">
            Curriculum Portfolio
          </span>
          <span className="text-xs text-slate-500 font-medium">Year 2 MBBS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          STUDENT LABORATORY MASTERY
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Real-time tracking of practicals, spotter simulations, and OSPE assessment scores for {currentUser.name}.
        </p>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Overall Mastery</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{overallAvg}%</div>
          <span className="text-[11px] text-teal-700 font-semibold">On track for Semester Finals</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Completed Practicals</span>
            <BookOpen className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {progress.completedPracticals.length} / 36
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Across 3 Laboratory subjects</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Average Quiz Score</span>
            <CheckSquare className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {progress.averageScore}%
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">Pass benchmark: 75%</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Lab Study Time</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {Math.floor(progress.studyTimeMinutes / 60)}h {progress.studyTimeMinutes % 60}m
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Logged interactive hours</span>
        </div>
      </div>

      {/* Progress Bars by Laboratory (Anatomy, Histology, Biochemistry) */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-slate-900">Laboratory Subject Mastery</h2>

        <div className="space-y-4">
          {subjectCards.map(sub => {
            const Icon = sub.icon;
            return (
              <div key={sub.id} className="bg-slate-50 p-4 sm:p-5 rounded-lg border border-[#E2E8F0] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] shadow-2xs" style={{ color: sub.color }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{sub.name}</h3>
                      <span className="text-[11px] text-slate-500 font-mono font-medium">{sub.code}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-medium">
                      {sub.completed} of {sub.total} Practicals Finished
                    </span>
                    <span className="text-base font-black font-mono" style={{ color: sub.color }}>
                      {sub.percent}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden border border-slate-300/40">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${sub.percent}%`, backgroundColor: sub.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Earned Laboratory Badges & Competencies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                  b.earned
                    ? 'bg-white border-[#E2E8F0] shadow-sm'
                    : 'bg-slate-50/70 border-[#E2E8F0]/60 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg border shadow-2xs ${b.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {b.earned ? (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Earned
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-500">
                      Locked
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{b.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Attempt History */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Recent Quiz History</h2>

        <div className="divide-y divide-[#E2E8F0]">
          {progress.completedQuizzes.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 font-medium">No completed quizzes yet.</p>
          ) : (
            progress.completedQuizzes.map(att => (
              <div key={att.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{att.quizTitle}</h4>
                  <span className="text-[11px] text-slate-500 capitalize font-medium">
                    {att.labId} Lab • Completed on {att.completedAt}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-600 font-semibold">
                    Score: {att.score}/{att.maxScore}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      att.passed
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {att.percentage}% {att.passed ? 'Pass' : 'Retake'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
