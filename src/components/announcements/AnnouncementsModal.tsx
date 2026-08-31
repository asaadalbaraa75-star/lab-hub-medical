import React, { useState } from 'react';
import { Announcement } from '../../types';
import { Bell, X, AlertTriangle, Info, Calendar, User, Search } from 'lucide-react';

interface AnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
}

export const AnnouncementsModal: React.FC<AnnouncementsModalProps> = ({
  isOpen,
  onClose,
  announcements = []
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const safeAnnouncements = Array.isArray(announcements) ? announcements : [];

  const filtered = safeAnnouncements.filter(a => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const matchesTitle = a.title?.toLowerCase().includes(q) || false;
    const matchesContent = a.content?.toLowerCase().includes(q) || false;
    const matchesAuthor = a.author?.toLowerCase().includes(q) || false;
    return matchesTitle || matchesContent || matchesAuthor;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2E8F0] rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 shadow-2xs">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Laboratory Announcements</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Official faculty notices, room changes & exam schedules
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-700 border border-[#E2E8F0] shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-white border-b border-[#E2E8F0]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search notices, rooms, professors..."
              className="w-full bg-slate-50 border border-[#E2E8F0] focus:border-indigo-500 focus:bg-white rounded-lg pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Announcement list */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 bg-slate-50/50">
          {filtered.map(ann => {
            const isUrgent = ann.priority === 'urgent';
            const isImportant = ann.priority === 'important';

            return (
              <div
                key={ann.id}
                className="bg-white border border-[#E2E8F0] p-4 sm:p-5 rounded-xl space-y-2.5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isUrgent && (
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase">
                        Urgent Notice
                      </span>
                    )}
                    {isImportant && (
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase">
                        Faculty Notice
                      </span>
                    )}
                    <h4 className="text-sm font-bold text-slate-900">{ann.title}</h4>
                  </div>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono font-medium">
                    <Calendar className="w-3 h-3" /> {ann.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {ann.content}
                </p>

                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-teal-700 font-semibold">
                  <span>Posted by {ann.author}</span>
                  <span className="text-slate-500 capitalize font-medium">{ann.labId || 'All Laboratories'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
