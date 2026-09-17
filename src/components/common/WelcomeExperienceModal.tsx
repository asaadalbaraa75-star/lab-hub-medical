import React from 'react';
import { User, StudentProgress } from '../../types';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  FlaskConical,
  Microscope,
  Bone,
  CheckCircle2,
  ArrowRight,
  X,
  Stethoscope,
  ShieldCheck
} from 'lucide-react';

interface WelcomeExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  progress?: StudentProgress;
  onNavigate: (tab: string) => void;
}

export const WelcomeExperienceModal: React.FC<WelcomeExperienceModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  progress,
  onNavigate
}) => {
  if (!isOpen) return null;

  const isFaculty = currentUser.role === 'admin' || currentUser.role === 'instructor';
  const hasAnatomyPermission = Boolean(currentUser.canPublishAnatomyExams);

  const handleAction = (tab: string) => {
    onClose();
    onNavigate(tab);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      dir="rtl"
      id="welcome-experience-modal"
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative text-slate-100 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          aria-label="إغلاق النافذة الترحيبية"
          id="btn-close-welcome-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero */}
        <div className="bg-gradient-to-b from-indigo-950/60 to-slate-900 p-6 sm:p-8 border-b border-slate-800 text-right">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                منصة LAB HUB للتعليم الطبي السريري
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                مرحباً بك يا د. {currentUser.name || currentUser.fullName || 'طالب الطب'}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
            أهلاً بعودتك إلى بيئة التدريب المعملي التفاعلي. استعد لجلسة دراسية متقدمة تجمع بين الفحص المجهري، المحاكاة ثلاثية الأبعاد، ومحطات اختبارات الـ OSPE المعتمدة.
          </p>

          {/* Special Permission Banner */}
          {hasAnatomyPermission && !isFaculty && (
            <div className="mt-4 p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-3 text-right">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-emerald-300">صلاحية خاصة معتمدة: </span>
                <span className="text-emerald-200">
                  لديك إذن لإنشاء ونشر امتحانات التشريح (Authorized Anatomy Exam Publisher) للزملاء.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Launch Cards */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            مسارات التدريب السريعة المقترحة لجلسة اليوم:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Action 1: OSPE Practical Exams */}
            <button
              type="button"
              onClick={() => handleAction('medical_exams')}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/40 transition text-right group cursor-pointer"
              id="welcome-action-ospe"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition">
                  محطات اختبارات OSPE
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  محاكاة عملية مطابقة لنظام المحطات الجامعي بوقت محدد
                </div>
              </div>
            </button>

            {/* Action 2: Anatomy & 3D Lab */}
            <button
              type="button"
              onClick={() => handleAction('anatomy')}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/40 transition text-right group cursor-pointer"
              id="welcome-action-anatomy"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Bone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition">
                  معمل التشريح ثلاثي الأبعاد
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  فحص العظام والعضلات والمستويات التشريحية
                </div>
              </div>
            </button>

            {/* Action 3: Virtual Histology */}
            <button
              type="button"
              onClick={() => handleAction('histology')}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 transition text-right group cursor-pointer"
              id="welcome-action-histology"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Microscope className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition">
                  المجهر الافتراضي للأنسجة
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  شرائح عالية الدقة 400x مع صبغة H&E
                </div>
              </div>
            </button>

            {/* Action 4: Biochemistry Pathways */}
            <button
              type="button"
              onClick={() => handleAction('biochemistry')}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 transition text-right group cursor-pointer"
              id="welcome-action-biochem"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition">
                  الكيمياء الحيوية السريرية
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  كواشف الكربوهيدرات والبروتينات والدهون
                </div>
              </div>
            </button>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              قسم: <span className="font-semibold text-slate-200">العلوم الطبية الأساسية (السنة الأولى)</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-md active:scale-95 cursor-pointer"
              id="btn-start-learning-welcome"
            >
              <span>الدخول إلى لوحة التحكم</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
