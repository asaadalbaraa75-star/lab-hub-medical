import React from 'react';
import { Clock, MapPin, Microscope, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { ScheduleItem } from '../../types';

interface TodayLabCardProps {
  todaySchedule?: ScheduleItem;
  onOpenPractical: (labId: string, practicalId: string) => void;
}

export const TodayLabCard: React.FC<TodayLabCardProps> = ({
  todaySchedule,
  onOpenPractical
}) => {
  if (!todaySchedule) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 text-slate-500">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span>No mandatory laboratory sessions scheduled for today.</span>
        </div>
      </div>
    );
  }

  return (
    <div
      id="dashboard-today-lab-card"
      className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-sm relative overflow-hidden group"
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Badge & Lab Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-200">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              معمل اليوم • TODAY'S LAB
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {todaySchedule.day}, {todaySchedule.date}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-600">
              <Microscope className="w-3.5 h-3.5" />
              <span>{todaySchedule.courseName}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 tracking-tight group-hover:text-indigo-600 transition-colors">
              {todaySchedule.practicalTitle}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-slate-800 font-semibold">{todaySchedule.time}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-slate-800 font-semibold">{todaySchedule.room}</span>
            </div>

            <div className="text-[11px] text-slate-500">
              المشرف الأكاديمي: <span className="text-slate-800 font-medium">{todaySchedule.instructorName}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
          <button
            type="button"
            id="today-lab-open-practical-btn"
            onClick={() => onOpenPractical(todaySchedule.courseId, todaySchedule.practicalId)}
            className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all shadow-sm active:scale-95"
          >
            <span>فتح التدريب العملي (Open Practical)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
