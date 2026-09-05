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
    (progress.anatomyPercent + progress.histologyPercent + progress.biochemistryPercent) / 3
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
      className="relative overflow-hidden glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 space-y-6 group"
    >
      {/* Ambient background glow accents inside card */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl group-hover:bg-purple-600/25 transition-all duration-700" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cyan-600/10 blur-3xl group-hover:bg-cyan-600/20 transition-all duration-700" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Welcome Copy */}
        <div className="space-y-3.5 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-xs font-semibold text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              <span>العام الأكاديمي 2026 • المنصة الموحدة للمعامل الطبية</span>
            </div>

            {/* Prominent Creator Badge for Sukaina Asaad */}
            <button
              type="button"
              onClick={onOpenAboutModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/40 text-xs font-bold text-amber-300 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all cursor-pointer"
              title="عرض معلومات المطورة والمنصة"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>إشراف وتطوير: سكينة أسعد</span>
            </button>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                أهلاً وسهلاً بك، {firstName} 👋
              </h1>
              <span className="text-xs font-semibold text-purple-300/70 font-sans">
                (Hi, {firstName})
              </span>
            </div>

            {/* Arabic Welcome Message with English Subtitle */}
            <p className="text-sm sm:text-base text-slate-200 font-medium mt-2 leading-relaxed">
              مرحباً بك في المنصة المركزية للمعامل الطبية الذكية — استعد لتدريباتك المعملية، راجع الشرائح التشريحية، وتتبع تقدمك الأكاديمي.
            </p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Prepare for your practicals, explore digital histology slides, anatomical spotters, and clinical biochemistry protocols in standardized medical English.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              id="welcome-explore-labs-btn"
              onClick={onExploreLabs}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] active:scale-95"
            >
              <span>Explore My Laboratories (المعامل)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {onOpenShareModal && (
              <button
                type="button"
                id="welcome-share-portal-btn"
                onClick={onOpenShareModal}
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-purple-200 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-purple-500/30 hover:border-purple-400 transition-all shadow-xs"
              >
                <Share2 className="w-4 h-4 text-purple-400" />
                <span>رابط المنصة للطلاب (Share Link)</span>
              </button>
            )}

            {onOpenAboutModal && (
              <button
                type="button"
                id="welcome-about-modal-btn"
                onClick={onOpenAboutModal}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Info className="w-3.5 h-3.5 text-purple-400" />
                <span>عن المنصة والمطورة</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Circular Progress Ring */}
        <div className="flex items-center gap-4 bg-[#070B14]/80 border border-white/10 p-4 sm:p-5 rounded-2xl shrink-0 shadow-inner">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="welcomeProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="50%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress Arc */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="url(#welcomeProgressGradient)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold text-white leading-none">
                {overallProgress}%
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                معدل الإنجاز
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-1 text-left">
            <span className="text-xs font-bold text-slate-200">
              مستوى التقدم العام
            </span>
            <p className="text-[11px] text-slate-400 leading-tight max-w-[130px]">
              Based on completed practicals, spotters & quizzes.
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px] text-purple-400 font-semibold">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>جاهز لاختبارات الـ OSPE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Student Invite Banner */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#070B14]/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 px-6 sm:px-8 py-3.5 rounded-b-3xl">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="font-bold text-purple-400">🔗 رابط دخول الطلاب المباشر:</span>
          <span className="font-mono text-slate-400 text-[11px] hidden sm:inline">
            {typeof window !== 'undefined' ? window.location.host : 'medlab.edu'}
          </span>
          <span className="text-[11px] text-amber-300 font-semibold mr-2">
            (إشراف وتطوير: سكينة أسعد)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleQuickCopy}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 transition-colors shadow-2xs"
          >
            {copiedQuick ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">تم نسخ الرابط</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>نسخ الرابط السريع</span>
              </>
            )}
          </button>

          {onOpenShareModal && (
            <button
              type="button"
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-purple-400" />
              <span>مشاركة وإظهار QR</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
