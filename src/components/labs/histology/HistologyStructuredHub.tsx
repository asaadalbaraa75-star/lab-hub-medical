import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Video,
  Layers,
  ArrowLeft,
  Sparkles,
  Microscope,
  CheckCircle2,
  Filter
} from 'lucide-react';
import {
  HISTOLOGY_CURRICULUM_CHAPTERS,
  HistologyChapterData,
  ContentBlock,
  TheoryBlock,
  PracticalQuizBlock,
  MediaVideoBlock
} from '../../../data/histologyJsonData';
import { HistologyStructuredTheorySection } from './HistologyStructuredTheorySection';
import { HistologyPracticalQuizSection } from './HistologyPracticalQuizSection';
import { HistologyVideoPlayer } from './HistologyVideoPlayer';

interface HistologyStructuredHubProps {
  onBack?: () => void;
}

export const HistologyStructuredHub: React.FC<HistologyStructuredHubProps> = ({
  onBack
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [filterSection, setFilterSection] = useState<'all' | 'theory' | 'practical_quiz' | 'media_video'>('all');

  const currentChapter: HistologyChapterData = HISTOLOGY_CURRICULUM_CHAPTERS[activeChapterIndex];

  const filteredBlocks = currentChapter.content_blocks.filter(block => {
    if (filterSection === 'all') return true;
    return block.section === filterSection;
  });

  const theoryCount = currentChapter.content_blocks.filter(b => b.section === 'theory').length;
  const quizCount = currentChapter.content_blocks.filter(b => b.section === 'practical_quiz').length;
  const videoCount = currentChapter.content_blocks.filter(b => b.section === 'media_video').length;

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Top Banner with Navigation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950/60 to-slate-900 border border-teal-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-mono font-bold tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                HISTOLOGY PLATFORM — INTEGRATED ACADEMIC SUITE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              قسم الشرح النظري وبنك الاختبارات العملية والفيديوهات
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              منصة علم الأنسجة المتكاملة: تغطية شاملة لمحتوى الفصول، اختبارات عملية بنظام كتابي فوري (Written Quiz)، ومشغل فيديوهات مدعوم بحماية التحديث التلقائي.
            </p>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition border border-slate-700 self-start md:self-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>العودة للفهرس الرئيسي</span>
            </button>
          )}
        </div>
      </div>

      {/* CHAPTER SELECTOR TABS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {HISTOLOGY_CURRICULUM_CHAPTERS.map((chap, idx) => {
          const isSelected = activeChapterIndex === idx;
          return (
            <button
              key={chap.chapter}
              onClick={() => setActiveChapterIndex(idx)}
              className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-teal-500 ring-1 ring-teal-500 shadow-lg shadow-teal-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-teal-400 font-mono mb-1">
                <span>CHAPTER 0{idx + 1}</span>
                <span>{chap.content_blocks.length} Blocks</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-0.5 truncate">
                {chap.chapter}
              </h3>
              <p className="text-xs text-slate-400 font-arabic truncate">
                {chap.chapter_ar}
              </p>
            </button>
          );
        })}
      </div>

      {/* SECTION FILTER BUTTONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
        <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-teal-400" />
          تصفية المحتوى (Filter Section):
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterSection('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filterSection === 'all'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>عرض الكل ({currentChapter.content_blocks.length})</span>
          </button>

          <button
            onClick={() => setFilterSection('theory')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filterSection === 'theory'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>الشرح النظري ({theoryCount})</span>
          </button>

          <button
            onClick={() => setFilterSection('practical_quiz')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filterSection === 'practical_quiz'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>الاختبارات العملية الكتابية ({quizCount})</span>
          </button>

          <button
            onClick={() => setFilterSection('media_video')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filterSection === 'media_video'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>الفيديوهات المجهرية ({videoCount})</span>
          </button>
        </div>
      </div>

      {/* RENDER CONTENT BLOCKS */}
      <div className="space-y-8">
        {filteredBlocks.map((block, idx) => {
          if (block.section === 'theory') {
            return (
              <HistologyStructuredTheorySection
                key={`theory_${idx}`}
                theory={block as TheoryBlock}
              />
            );
          }
          if (block.section === 'practical_quiz') {
            return (
              <HistologyPracticalQuizSection
                key={`quiz_${idx}`}
                quiz={block as PracticalQuizBlock}
              />
            );
          }
          if (block.section === 'media_video') {
            return (
              <HistologyVideoPlayer
                key={`video_${idx}`}
                video={block as MediaVideoBlock}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
