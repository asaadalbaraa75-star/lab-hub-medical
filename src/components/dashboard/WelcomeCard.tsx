import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Activity, Share2, Copy, CheckCircle2, Award, Info } from 'lucide-react';
import { User, StudentProgress } from '../../types';

interface WelcomeCardProps {
  currentUser: User;
  progress: StudentProgress;
  onExploreLabs: () => void;
  onOpenShareModal?: () => void;
  onOpenAboutModal?: () => void;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  currentUser,
  progress,
  onExploreLabs,
  onOpenShareModal,
  onOpenAboutModal
}) => {
  const [copiedQuick, setCopiedQuick] = useState(false);

  // Calculate aggregate overall progress
  const overallProgress = Math.round(
    (progress.anatomyPercent + progress.histologyPercent + progress.bacteriologyPercent) / 3
  );

  // SVG Progress circle calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  const firstName = currentUser.name.split(' ')[0];

  const handleQuickCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedQuick(true);
      setTimeout(() => setCopiedQuick(false), 2000);
    }
  };

  return (
    <div
      id="dashboard-welcome-card"
      className="relative overflow-hidden bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
    >
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Welcome Copy */}
        <div className="space-y-3.5 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
              <Activity className="w-3.5 h-3.5 text-indigo-600" />
              <span>العام الأكاديمي 2026 • المنصة الموحدة للمعامل الطبية</span>
            </div>

            {/* Prominent Creator Badge for Sukaina Asaad */}
            <button
              type="button"
              onClick={onOpenAboutModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs font-bold text-amber-800 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer"
              title="عرض معلومات المطورة والمنصة"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>إشراف وتطوير: سكينة أسعد</span>
            </button>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                أهلاً وسهلاً بك، {firstName} 👋
              </h1>
              <span className="text-xs font-semibold text-slate-400 font-sans">
                (Hi, {firstName})
              </span>
            </div>

            {/* Arabic Welcome Message with English Subtitle */}
            <p className="text-sm sm:text-base text-slate-700 font-medium mt-2 leading-relaxed">
              مرحباً بك في المنصة المركزية للمعامل الطبية الذكية — استعد لتدريباتك المعملية، راجع الشرائح التشريحية، وتتبع تقدمك الأكاديمي.
            </p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Prepare for your practicals, explore digital histology slides, anatomical spotters, and bacteriology culture banks in standardized medical English.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              id="welcome-explore-labs-btn"
              onClick={onExploreLabs}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all shadow-sm active:scale-95"
            >
              <span>Explore My Laboratories (المعامل)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {onOpenShareModal && (
              <button
                type="button"
                id="welcome-share-portal-btn"
                onClick={onOpenShareModal}
                className="inline-flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-indigo-700 font-semibold px-4 py-2.5 rounded-lg text-xs sm:text-sm border border-indigo-200 transition-all shadow-2xs"
              >
                <Share2 className="w-4 h-4 text-indigo-600" />
                <span>رابط المنصة للطلاب (Share Link)</span>
              </button>
            )}

            {onOpenAboutModal && (
              <button
                type="button"
                id="welcome-about-modal-btn"
                onClick={onOpenAboutModal}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] transition-colors"
              >
                <Info className="w-3.5 h-3.5 text-indigo-600" />
                <span>عن المنصة والمطورة</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Circular Progress Ring */}
        <div className="flex items-center gap-4 bg-slate-50 border border-[#E2E8F0] p-4 sm:p-5 rounded-2xl shrink-0 shadow-xs">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-slate-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Arc */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-indigo-600 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-slate-900 leading-none">
                {overallProgress}%
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                معدل الإنجاز
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-1 text-left">
            <span className="text-xs font-bold text-slate-900">
              مستوى التقدم العام
            </span>
            <p className="text-[11px] text-slate-500 leading-tight max-w-[130px]">
              Based on completed practicals, spotters & quizzes.
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px] text-indigo-600 font-semibold">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>جاهز لاختبارات الـ OSPE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Student Invite Banner */}
      <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 px-6 sm:px-8 py-3.5">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <span className="font-bold text-indigo-700">🔗 رابط دخول الطلاب المباشر:</span>
          <span className="font-mono text-slate-500 text-[11px] hidden sm:inline">
            {typeof window !== 'undefined' ? window.location.host : 'medlab.edu'}
          </span>
          <span className="text-[11px] text-amber-700 font-semibold mr-2">
            (تطوير: سكينة أسعد)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleQuickCopy}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-indigo-300 transition-colors shadow-2xs"
          >
            {copiedQuick ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">تم نسخ الرابط</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>نسخ الرابط السريع</span>
              </>
            )}
          </button>

          {onOpenShareModal && (
            <button
              type="button"
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>مشاركة وإظهار QR</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
