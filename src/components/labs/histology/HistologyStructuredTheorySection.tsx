import React from 'react';
import { BookOpen, Sparkles, Tag, Microscope, Layers } from 'lucide-react';
import { TheoryBlock } from '../../../data/histologyJsonData';

interface HistologyStructuredTheorySectionProps {
  theory: TheoryBlock;
}

export const HistologyStructuredTheorySection: React.FC<HistologyStructuredTheorySectionProps> = ({
  theory
}) => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
      {/* Title Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-mono font-bold uppercase">
              THEORY MODULE (الشرح النظري المعتمد)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {theory.title}
          </h3>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
      </div>

      {/* Main Content (Arabic with preserved English terms) */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-teal-400" />
          الشرح الطبي الدقيق:
        </span>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-arabic text-justify bg-slate-950/60 p-5 rounded-2xl border border-slate-850">
          {theory.content}
        </p>
      </div>

      {/* Histology Notes & Organelles / Staining */}
      {theory.histology_notes && (
        <div className="p-5 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-2">
          <span className="text-xs font-bold uppercase font-mono text-teal-300 flex items-center gap-1.5">
            <Microscope className="w-4 h-4 text-teal-400" />
            الخصائص المجهرية والعضيات وتقنيات الصبغة (Microscopic Notes & Stains):
          </span>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {theory.histology_notes}
          </p>
        </div>
      )}

      {/* Key Terms Tags */}
      {theory.key_terms && theory.key_terms.length > 0 && (
        <div className="space-y-2 pt-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            الكلمات المفتاحية والمصطلحات (Key Diagnostic Terms):
          </span>
          <div className="flex flex-wrap gap-2">
            {theory.key_terms.map((term, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-xs font-medium hover:border-teal-500/50 transition-colors"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
