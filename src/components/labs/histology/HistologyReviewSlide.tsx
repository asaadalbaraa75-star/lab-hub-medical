import React from 'react';
import {
  Table,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
  BookmarkCheck,
  BookOpen
} from 'lucide-react';
import { ReviewTableSlideData } from './HistologyLessonsData';

interface HistologyReviewSlideProps {
  data: ReviewTableSlideData;
  lessonTitle: string;
  onRestartLesson: () => void;
  onNextLesson?: () => void;
  onBackToHome: () => void;
  hasNextLesson: boolean;
}

export const HistologyReviewSlide: React.FC<HistologyReviewSlideProps> = ({
  data,
  lessonTitle,
  onRestartLesson,
  onNextLesson,
  onBackToHome,
  hasNextLesson
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-400">
            <BookmarkCheck className="w-4 h-4" />
            Quick High-Yield Review
          </span>
          <h2 className="text-2xl font-black text-white">
            {data.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {data.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRestartLesson}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Lesson
          </button>
          {hasNextLesson && onNextLesson ? (
            <button
              onClick={onNextLesson}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition flex items-center gap-1.5 shadow-md shadow-teal-500/20"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition flex items-center gap-1.5 shadow-md shadow-teal-500/20"
            >
              <span>Back to Lessons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. HIGH-CONTRAST REVIEW TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-teal-300 font-bold uppercase tracking-wider">
              <th className="py-3.5 px-4 font-extrabold">Structure / Item</th>
              <th className="py-3.5 px-4 font-extrabold">Stain / Specimen</th>
              <th className="py-3.5 px-4 font-extrabold">Microscopic Clue</th>
              <th className="py-3.5 px-4 font-extrabold">High-Yield Exam Pearl</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {data.rows.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-850/60 transition-colors group"
              >
                <td className="py-3.5 px-4 font-bold text-white group-hover:text-teal-300">
                  {row.structure}
                </td>
                <td className="py-3.5 px-4 text-teal-400 font-semibold">
                  {row.stain}
                </td>
                <td className="py-3.5 px-4 text-slate-200">
                  {row.clue}
                </td>
                <td className="py-3.5 px-4 text-amber-300 font-medium">
                  {row.pearl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. CORE TAKEAWAY CHECKLIST */}
      {data.takeaways && data.takeaways.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Key Exam Takeaways
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-200">
            {data.takeaways.map((point, idx) => (
              <li
                key={idx}
                className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-2.5"
              >
                <span className="text-teal-400 font-bold mt-0.5">✔</span>
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
        <button
          onClick={onBackToHome}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
        >
          ← Return to All Lessons
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onRestartLesson}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart {lessonTitle}
          </button>

          {hasNextLesson && onNextLesson && (
            <button
              onClick={onNextLesson}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition flex items-center gap-2 shadow-lg shadow-teal-500/20"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
