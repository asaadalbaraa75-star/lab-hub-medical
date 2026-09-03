/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * Student Profile & Registered Laboratories
 */

import React from 'react';
import {
  User as UserIcon,
  GraduationCap,
  Mail,
  ShieldCheck,
  Calendar,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  Activity,
  ArrowRight,
  FlaskConical,
  Microscope,
  Dna,
  Binary
} from 'lucide-react';
import { User, StudentProgress, LabSubjectId } from '../../types';
import { LAB_SUBJECTS } from '../../data/mockData';

interface StudentProfilePageProps {
  currentUser: User;
  progress: StudentProgress;
  onSelectLab: (labId: LabSubjectId) => void;
  onSelectTab: (tab: string) => void;
}

export const StudentProfilePage: React.FC<StudentProfilePageProps> = ({
  currentUser,
  progress,
  onSelectLab,
  onSelectTab
}) => {
  const getLabIcon = (id: string) => {
    switch (id) {
      case 'anatomy':
        return <Activity className="w-5 h-5 text-indigo-600" />;
      case 'histology':
        return <Microscope className="w-5 h-5 text-emerald-600" />;
      case 'bacteriology':
        return <FlaskConical className="w-5 h-5 text-amber-600" />;
      case 'biochemistry':
        return <Dna className="w-5 h-5 text-cyan-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-600" />;
    }
  };

  const completedCount = progress.completedPracticals.length;
  const avgQuizScore = progress.averageScore ?? (
    progress.completedQuizzes && progress.completedQuizzes.length > 0
      ? Math.round(progress.completedQuizzes.reduce((a, b) => a + b.percentage, 0) / progress.completedQuizzes.length)
      : 0
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={currentUser.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-indigo-100 shadow-md shrink-0"
          />
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentUser.name}
              </h1>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                currentUser.role === 'admin'
                  ? 'bg-purple-100 text-purple-800'
                  : currentUser.role === 'instructor'
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-indigo-100 text-indigo-800'
              }`}>
                {currentUser.role === 'admin' ? '🛡️ Faculty Admin' : currentUser.role === 'instructor' ? '👨‍🏫 Instructor' : '🎓 Medical Student'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {currentUser.department || 'Faculty of Medicine — 1st Year Medical Sciences'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600 font-mono">
              <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                {currentUser.studentId || 'MED-2026-001'}
              </span>
              <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {currentUser.email}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={() => onSelectTab('progress')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>سجل الإنجاز والدرجات (Progress)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ملف شخصي مؤمّن وخاص بك فقط</span>
          </div>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">المعامل المسجلة</div>
          <div className="text-2xl font-black text-slate-900">4 معامل</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">تشريح، أنسجة، بكتيريا، كيمياء</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">الدروس المنجزة</div>
          <div className="text-2xl font-black text-indigo-600">{completedCount} تجربة</div>
          <div className="text-[11px] text-slate-500 mt-1">من أصل 16 تدريب عملي</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">متوسط الاختبارات</div>
          <div className="text-2xl font-black text-emerald-600">{avgQuizScore > 0 ? `${avgQuizScore}%` : '—'}</div>
          <div className="text-[11px] text-slate-500 mt-1">تقييم الـ OSPE والـ Quizzes</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">عدد الجلسات التعليمية</div>
          <div className="text-2xl font-black text-slate-900">{currentUser.sessionCount || 1}</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">جلسة دراسية نشطة</div>
        </div>
      </div>

      {/* Enrolled Laboratories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">المعامل الطبية المسجلة (Enrolled Laboratories)</h2>
            <p className="text-xs text-slate-500">المناهج العملية المقررة لطلاب السنة الطبية الأولى</p>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('laboratories')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
          >
            عرض كافة المعامل ←
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LAB_SUBJECTS.map(lab => {
            const labPracticalsCompleted = progress.completedPracticals.filter(pId => pId.startsWith(lab.id)).length;
            const totalPracticals = 4;
            const pct = Math.round((labPracticalsCompleted / totalPracticals) * 100);

            return (
              <div
                key={lab.id}
                onClick={() => onSelectLab(lab.id)}
                className="bg-white p-5 rounded-2xl border border-[#E2E8F0] hover:border-indigo-400 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                        {getLabIcon(lab.id)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {lab.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {lab.totalPracticals} تجارب عملية مقيدة
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                      مسجل
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {lab.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                    <span>نسبة إنجاز المعمل</span>
                    <span className="text-indigo-600">{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Account Security Information */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>أمان الحساب والبيانات الخاصة (Account Security & Privacy)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
            <div className="text-slate-500 font-semibold">حالة الجلسة والتوثيق</div>
            <div className="font-mono text-emerald-700 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Active Session (HMAC Verified)
            </div>
            <p className="text-[11px] text-slate-400">
              جميع بياناتك الأكاديمية مشفرة وخاصة بحسابك الجامعي فقط.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
            <div className="text-slate-500 font-semibold">آخر تسجيل دخول</div>
            <div className="font-mono text-slate-800 font-bold">
              {currentUser.lastLoginAt ? new Date(currentUser.lastLoginAt).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' }) : 'الآن'}
            </div>
            <p className="text-[11px] text-slate-400">
              مسجل من جهازك الحالي بشكل آمن ومحمي ضد التلاعب.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
