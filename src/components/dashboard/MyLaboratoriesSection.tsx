import React from 'react';
import { Bone, Microscope, FlaskConical, ArrowRight, BookOpen, Target, CheckSquare } from 'lucide-react';
import { LAB_SUBJECTS } from '../../data/mockData';
import { LabSubjectId, StudentProgress } from '../../types';

interface MyLaboratoriesSectionProps {
  onSelectLab: (labId: LabSubjectId) => void;
  onStartLabExam?: (labId: LabSubjectId) => void;
  progress: StudentProgress;
}

export const MyLaboratoriesSection: React.FC<MyLaboratoriesSectionProps> = ({
  onSelectLab,
  onStartLabExam,
  progress
}) => {
  const iconMap: Record<string, any> = {
    anatomy: Bone,
    histology: Microscope,
    biochemistry: FlaskConical
  };

  const progressMap: Record<string, number> = {
    anatomy: progress.anatomyPercent || 0,
    histology: progress.histologyPercent || 0,
    biochemistry: progress.biochemistryPercent || 0
  };

  return (
    <section className="space-y-4" id="dashboard-my-laboratories-section">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              المعامل التخصصية الرئيسية
            </h2>
            <span className="text-xs font-semibold text-slate-400 font-mono">
              (Core Laboratories)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            اختر المعمل لاستكشاف المواد العلمية، الشرائح النسيجية، واختبارات التعرف السريع (Spotters).
          </p>
        </div>
        <span className="text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg font-semibold self-start sm:self-auto">
          3 معامل طبية معتمدة
        </span>
      </div>

      {/* 3 Large Professional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {LAB_SUBJECTS.map(lab => {
          const Icon = iconMap[lab.id] || FlaskConical;
          const labProgress = progressMap[lab.id] || 0;

          return (
            <div
              key={lab.id}
              id={`lab-card-${lab.id}`}
              className="bg-white border border-[#E2E8F0] hover:border-indigo-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
            >
              {/* Top Image Banner with Overlay & Circular Icon */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={lab.cardImage}
                  alt={lab.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Gradient darkening overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* Circular Icon in top-left */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-center text-indigo-600 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Subject Code Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-white/40 text-[11px] font-mono font-bold text-slate-900 shadow-xs">
                  {lab.code}
                </div>

                {/* Progress Bar overlay on bottom of image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center justify-between text-[11px] font-bold mb-1 drop-shadow-xs">
                    <span>Curriculum Progress</span>
                    <span className="text-indigo-200">{labProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/30 overflow-hidden backdrop-blur-xs">
                    <div
                      className="h-full rounded-full bg-indigo-400 transition-all duration-700"
                      style={{ width: `${labProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {lab.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {lab.description}
                  </p>
                </div>

                {/* Mini Stats Row */}
                <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-[#E2E8F0] text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-900">{lab.totalPracticals}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                      <BookOpen className="w-2.5 h-2.5 text-indigo-600" /> {lab.id === 'biochemistry' ? 'Tests' : 'Practicals'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-900">
                      {lab.id === 'biochemistry' ? '6' : lab.categories.length}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                      <Target className="w-2.5 h-2.5 text-teal-600" /> {lab.id === 'biochemistry' ? 'Methods' : 'Categories'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-900">
                      {lab.categories.reduce((acc, c) => acc + c.quizCount, 0)}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                      <CheckSquare className="w-2.5 h-2.5 text-amber-600" /> Quizzes
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {onStartLabExam && (
                    <button
                      type="button"
                      onClick={() => onStartLabExam(lab.id)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-sm active:scale-98"
                    >
                      <CheckSquare className="w-4 h-4" />
                      <span>بدء الاختبار العملي (Start Exam)</span>
                    </button>
                  )}

                  <button
                    type="button"
                    id={`explore-btn-${lab.id}`}
                    onClick={() => onSelectLab(lab.id)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-2xs"
                  >
                    <span>استكشاف المحتوى والشرائح</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
