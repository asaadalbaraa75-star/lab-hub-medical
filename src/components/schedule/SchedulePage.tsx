import React, { useState } from 'react';
import { ScheduleItem } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  BookOpen
} from 'lucide-react';

interface SchedulePageProps {
  schedule: ScheduleItem[];
  onOpenPractical: (labId: string, practicalId: string) => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  schedule = [],
  onOpenPractical
}) => {
  const [filterCourse, setFilterCourse] = useState<string>('all');

  const safeSchedule = Array.isArray(schedule) ? schedule : [];

  const filteredSchedule = safeSchedule.filter(item => {
    if (filterCourse === 'all') return true;
    return item.courseId === filterCourse;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300" id="lab-schedule-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase border border-indigo-100">
              Practical Rotations
            </span>
            <span className="text-xs text-slate-500 font-medium">Semester 1 • Academic Year 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            LABORATORY TIMETABLE & SCHEDULE
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterCourse('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs ${
              filterCourse === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
            }`}
          >
            All Courses
          </button>
          <button
            type="button"
            onClick={() => setFilterCourse('anatomy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs ${
              filterCourse === 'anatomy'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
            }`}
          >
            Anatomy
          </button>
          <button
            type="button"
            onClick={() => setFilterCourse('histology')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs ${
              filterCourse === 'histology'
                ? 'bg-teal-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
            }`}
          >
            Histology
          </button>
          <button
            type="button"
            onClick={() => setFilterCourse('biochemistry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs ${
              filterCourse === 'biochemistry'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
            }`}
          >
            Biochemistry
          </button>
        </div>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-4">
        {filteredSchedule.map(item => {
          return (
            <div
              key={item.id}
              className={`bg-white border rounded-xl p-5 sm:p-6 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                item.isToday
                  ? 'border-indigo-300 ring-2 ring-indigo-100 bg-gradient-to-r from-white to-indigo-50/20'
                  : item.isTomorrow
                  ? 'border-amber-300 bg-amber-50/10'
                  : 'border-[#E2E8F0]'
              }`}
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                      item.isToday
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : item.isTomorrow
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 border border-[#E2E8F0]'
                    }`}
                  >
                    {item.isToday ? "TODAY'S LAB" : item.isTomorrow ? "TOMORROW'S LAB" : item.day}
                  </span>

                  <span className="text-xs font-bold text-teal-700">{item.courseName}</span>
                  <span className="text-xs text-slate-500 font-medium">• {item.date}</span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {item.practicalTitle}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-[#E2E8F0] shadow-2xs">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <strong className="text-slate-900 font-bold">{item.time}</strong>
                  </span>

                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-[#E2E8F0] shadow-2xs">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <strong className="text-slate-900 font-bold">{item.room}</strong>
                  </span>

                  <span className="flex items-center gap-1.5 text-slate-500">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Faculty: <strong className="text-slate-700 font-semibold">{item.instructorName}</strong></span>
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => onOpenPractical(item.courseId, item.practicalId)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-lg text-xs sm:text-sm transition-all shadow-xs active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open Practical Material</span>
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
