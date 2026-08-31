import React from 'react';
import { Bell, AlertCircle, ArrowRight } from 'lucide-react';
import { Announcement } from '../../types';

interface RecentAnnouncementsProps {
  announcements: Announcement[];
  onOpenAnnouncements: () => void;
}

export const RecentAnnouncements: React.FC<RecentAnnouncementsProps> = ({
  announcements,
  onOpenAnnouncements
}) => {
  return (
    <div
      id="dashboard-recent-announcements-card"
      className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">أحدث الإعلانات والتنبيهات</h3>
              <p className="text-[11px] text-slate-500">تحديثات الكلية وتنبيهات القاعات المعملية</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenAnnouncements}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            عرض الكل
          </button>
        </div>

        <div className="space-y-2.5 mt-3.5">
          {announcements.slice(0, 3).map(ann => {
            const isUrgent = ann.priority === 'urgent';
            const isImportant = ann.priority === 'important';

            return (
              <div
                key={ann.id}
                onClick={onOpenAnnouncements}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-[#E2E8F0] cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {isUrgent && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase">
                        عاجل
                      </span>
                    )}
                    {isImportant && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase">
                        تنبيه
                      </span>
                    )}
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {ann.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">
                    {ann.date}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-[#E2E8F0] mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>لوحة المعامل الرسمية المعتمدة</span>
        <button
          type="button"
          onClick={onOpenAnnouncements}
          className="text-xs text-indigo-600 font-semibold flex items-center gap-1 hover:underline"
        >
          <span>جميع الإعلانات</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
