import React from 'react';
import { HistologyTheoryBlock } from '../../../data/histologyJsonData';
import {
  BookOpen,
  Microscope,
  Tag,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface HistologyStructuredTheorySectionProps {
  theoryBlocks: HistologyTheoryBlock[];
  chapterTitle?: string;
}

export const HistologyStructuredTheorySection: React.FC<HistologyStructuredTheorySectionProps> = ({
  theoryBlocks,
  chapterTitle
}) => {
  if (!theoryBlocks || theoryBlocks.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
        لا توجد مواضيع نظرية مضافة في هذا الفصل حالياً.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {theoryBlocks.map((block, idx) => (
        <div
          key={idx}
          className="bg-slate-900 border border-slate-800 hover:border-teal-500/30 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6 transition-all"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-teal-300 border border-slate-700">
                  THEORY TOPIC 0{idx + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {block.title}
                </h3>
              </div>
            </div>
            {chapterTitle && (
              <span className="text-xs font-mono text-slate-400 bg-slate-850 px-3 py-1 rounded-lg border border-slate-800 self-start sm:self-auto">
                {chapterTitle.split(':')[0]}
              </span>
            )}
          </div>

          {/* Core Content */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>الشرح النظري العلمي (Theory & Concepts)</span>
            </h4>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-sm text-slate-200 leading-relaxed whitespace-pre-line font-arabic">
              {block.content}
            </div>
          </div>

          {/* Histology Notes (Microscopic features, Organelles & Stains) */}
          {block.histology_notes && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <Microscope className="w-3.5 h-3.5" />
                <span>الخصائص المجهرية والعضيات وتقنيات الصبغة (Microscopic Notes & Stains)</span>
              </h4>
              <div className="p-4 sm:p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs sm:text-sm text-amber-100/90 leading-relaxed whitespace-pre-line font-arabic">
                {block.histology_notes}
              </div>
            </div>
          )}

          {/* Key Terms */}
          {block.key_terms && block.key_terms.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800/70">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 font-bold">
                <Tag className="w-3.5 h-3.5 text-teal-400" />
                <span>المصطلحات المفتاحية (Key Terminology):</span>
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {block.key_terms.map((term, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-colors shadow-xs"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
