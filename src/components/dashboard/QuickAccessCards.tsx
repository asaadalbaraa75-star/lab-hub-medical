import React from 'react';
import { Calendar, BookOpen, CheckSquare, TrendingUp, ChevronRight } from 'lucide-react';
import { StudentProgress } from '../../types';

interface QuickAccessCardsProps {
  upcomingCount: number;
  practicalsCount: number;
  quizzesCount: number;
  progress: StudentProgress;
  onSelectTab: (tab: string) => void;
}

export const QuickAccessCards: React.FC<QuickAccessCardsProps> = ({
  upcomingCount,
  practicalsCount,
  quizzesCount,
  progress,
  onSelectTab
}) => {
  const overallAvg = Math.round(
    (progress.anatomyPercent + progress.histologyPercent + progress.bacteriologyPercent) / 3
  );

  const cards = [
    {
      id: 'upcoming',
      tab: 'schedule',
      label: 'المعامل القادمة',
      sublabel: 'Upcoming Labs',
      value: upcomingCount,
      subtext: 'خلال الـ 7 أيام القادمة',
      icon: Calendar,
      accentColor: 'text-indigo-600',
      badgeBg: 'bg-indigo-50 border-indigo-100'
    },
    {
      id: 'practicals',
      tab: 'practicals',
      label: 'التدريبات العملية',
      sublabel: 'Practicals',
      value: practicalsCount,
      subtext: `تم إنجاز ${progress.completedPracticals.length} تدريب`,
      icon: BookOpen,
      accentColor: 'text-teal-600',
      badgeBg: 'bg-teal-50 border-teal-100'
    },
    {
      id: 'quizzes',
      tab: 'quizzes',
      label: 'الاختبارات الذاتية',
      sublabel: 'Self Quizzes',
      value: quizzesCount,
      subtext: `تم اجتياز ${progress.completedQuizzes.length} اختبار`,
      icon: CheckSquare,
      accentColor: 'text-amber-600',
      badgeBg: 'bg-amber-50 border-amber-100'
    },
    {
      id: 'progress',
      tab: 'progress',
      label: 'مستوى الإنجاز العام',
      sublabel: 'Overall Progress',
      value: `${overallAvg}%`,
      subtext: `متوسط الدرجات: ${progress.averageScore}%`,
      icon: TrendingUp,
      accentColor: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 border-emerald-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" id="dashboard-quick-access-cards">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <button
            key={card.id}
            type="button"
            id={`quick-card-${card.id}`}
            onClick={() => onSelectTab(card.tab)}
            className="group text-right bg-white hover:bg-slate-50/80 border border-[#E2E8F0] hover:border-indigo-300 p-4 sm:p-5 rounded-xl transition-all shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className={`p-2.5 rounded-lg border ${card.badgeBg}`}>
                <Icon className={`w-5 h-5 ${card.accentColor}`} />
              </div>
              <span className="text-[10px] font-semibold text-slate-400 font-mono">
                {card.sublabel}
              </span>
            </div>

            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {card.value}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">{card.label}</div>
              <div className="text-[11px] text-slate-500">{card.subtext}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
