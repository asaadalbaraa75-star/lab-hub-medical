import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { ScheduleItem } from '../../types';

interface UpcomingLabsSectionProps {
  schedule: ScheduleItem[];
  onOpenPractical: (labId: string, practicalId: string) => void;
  onViewAllSchedule: () => void;
}

export const UpcomingLabsSection: React.FC<UpcomingLabsSectionProps> = ({
  schedule,
  onOpenPractical,
  onViewAllSchedule
}) => {
  return (
    <div
      id="dashboard-upcoming-labs-card"
      className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">المعامل القادمة (Upcoming)</h3>
              <p className="text-[11px] text-slate-500">جدول التناوب المعملي الأسبوعي</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onViewAllSchedule}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            عرض التقويم الكامل
          </button>
        </div>

        {/* Schedule List */}
        <div className="space-y-3 mt-3.5">
          {schedule.slice(0, 3).map((item, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={item.id}
                onClick={() => onOpenPractical(item.courseId, item.practicalId)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isFirst
                    ? 'bg-indigo-50/40 border-indigo-200 hover:border-indigo-400'
                    : 'bg-slate-50 border-[#E2E8F0] hover:bg-slate-100/80'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        item.isToday
                          ? 'bg-indigo-100 text-indigo-800'
                          : item.isTomorrow
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.isToday ? 'اليوم (Today)' : item.isTomorrow ? 'غداً (Tomorrow)' : item.day}
                    </span>
                    <span className="text-xs font-semibold text-teal-700">{item.courseName}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                    {item.practicalTitle}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-indigo-600" />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      {item.room}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                    <span>مواد التحضير</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-[#E2E8F0] mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>الحضور إلزامي لجميع الجلسات</span>
        <span className="text-teal-700 font-semibold">Pre-clinical Batch A</span>
      </div>
    </div>
  );
};
