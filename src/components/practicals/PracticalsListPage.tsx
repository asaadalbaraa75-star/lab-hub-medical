import React, { useState } from 'react';
import { Practical, LabSubjectId, StudentProgress } from '../../types';
import { Search, BookOpen, Clock, CheckCircle2, ArrowRight, Filter, Target } from 'lucide-react';

interface PracticalsListPageProps {
  practicals: Practical[];
  progress: StudentProgress;
  onOpenPractical: (labId: string, practicalId: string) => void;
}

export const PracticalsListPage: React.FC<PracticalsListPageProps> = ({
  practicals = [],
  progress,
  onOpenPractical
}) => {
  const [search, setSearch] = useState('');
  const [selectedLab, setSelectedLab] = useState<string>('all');

  const safePracticals = Array.isArray(practicals) ? practicals : [];

  const filtered = safePracticals.filter(p => {
    if (selectedLab !== 'all' && p.courseId !== selectedLab) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const matchesTitle = p.title?.toLowerCase().includes(q) || false;
    const matchesSub = p.subTitle?.toLowerCase().includes(q) || false;
    const matchesPoints = Array.isArray(p.identificationPoints) && p.identificationPoints.some(pt => pt.toLowerCase().includes(q));
    return matchesTitle || matchesSub || matchesPoints;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300" id="practicals-directory-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#5B9BD5]/20 text-[#5B9BD5] uppercase">
              Curriculum Directory
            </span>
            <span className="text-xs text-[#94A3B8]">{practicals.length} Laboratory Practicals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#E5E7EB] tracking-tight mt-1">
            ALL PRACTICAL CURRICULA
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'anatomy', 'histology', 'bacteriology'].map(labId => (
            <button
              key={labId}
              type="button"
              onClick={() => setSelectedLab(labId)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors uppercase ${
                selectedLab === labId
                  ? 'bg-[#5B9BD5] text-[#0F172A]'
                  : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155]'
              }`}
            >
              {labId === 'all' ? 'All Labs' : labId}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by practical title, tissue type, bacterial stain, or anatomical structure..."
          className="w-full bg-[#1E293B] border border-[#334155] focus:border-[#5B9BD5] rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#E5E7EB] placeholder-[#94A3B8] focus:outline-none"
        />
      </div>

      {/* Grid of Practicals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(p => {
          const isDone = progress.completedPracticals.includes(p.id);

          return (
            <div
              key={p.id}
              onClick={() => onOpenPractical(p.courseId, p.id)}
              className="bg-[#1E293B] hover:bg-[#243244] border border-[#334155] hover:border-[#5B9BD5]/60 p-5 rounded-3xl cursor-pointer transition-all flex flex-col justify-between space-y-4 shadow-sm group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#5B9BD5]/15 text-[#5B9BD5] border border-[#5B9BD5]/30 uppercase">
                    {p.courseId} • Practical {String(p.practicalNumber).padStart(2, '0')}
                  </span>
                  {isDone ? (
                    <span className="text-[11px] text-[#6FAF8F] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#94A3B8] flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> {p.estimatedTime}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#E5E7EB] group-hover:text-[#5B9BD5] transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                  {p.subTitle}
                </p>
              </div>

              <div className="pt-3 border-t border-[#334155] flex items-center justify-between text-xs">
                <span className="text-[#5FAFA8] font-mono">v{p.version} • {p.authorName}</span>
                <span className="text-[#5B9BD5] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
