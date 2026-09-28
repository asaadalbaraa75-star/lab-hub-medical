import React, { useState } from 'react';
import {
  HISTOLOGY_DATABASE,
  HistologyChapterData,
  HistologyTheoryBlock,
  HistologyQuizBlock,
  HistologyVideoBlock
} from '../../../data/histologyJsonData';
import { HistologyStructuredTheorySection } from './HistologyStructuredTheorySection';
import { HistologyPracticalQuizSection } from './HistologyPracticalQuizSection';
import { HistologyVideoPlayer } from './HistologyVideoPlayer';
import {
  BookOpen,
  HelpCircle,
  Video,
  Layers,
  Sparkles,
  ChevronRight,
  Database,
  Search,
  CheckCircle2
} from 'lucide-react';

interface HistologyStructuredHubProps {
  onBack?: () => void;
}

export const HistologyStructuredHub: React.FC<HistologyStructuredHubProps> = ({
  onBack
}) => {
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'theory' | 'quiz' | 'video'>('all');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const activeChapter: HistologyChapterData = HISTOLOGY_DATABASE[selectedChapterIdx] || HISTOLOGY_DATABASE[0];

  // Extract blocks by type
  const theoryBlocks = activeChapter.content_blocks.filter(
    (b): b is HistologyTheoryBlock => b.section === 'theory'
  );
  const quizBlocks = activeChapter.content_blocks.filter(
    (b): b is HistologyQuizBlock => b.section === 'practical_quiz'
  );
  const videoBlocks = activeChapter.content_blocks.filter(
    (b): b is HistologyVideoBlock => b.section === 'media_video'
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300" id="histology-structured-hub">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                <span>HISTOLOGY STRUCTURED DATA HUB (قاعدة بيانات علم الأنسجة)</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              الشرح النظري المعتمد، بنك أسئلة الشرائح، ومشغل الفيديو الآمن
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              تمت معالجة بيانات الفصول بدقة مع الحفاظ على المصطلحات بالإنجليزية، وتصحيح روابط الفيديو التضمينية مع كود حماية تلقائي.
            </p>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors self-start md:self-auto cursor-pointer"
            >
              العودة للفهرس العام
            </button>
          )}
        </div>

        {/* Chapters Horizontal Picker */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <span className="text-xs font-mono text-slate-400 font-bold block">
            اختر الفصل الدراسي (Select Chapter):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {HISTOLOGY_DATABASE.map((ch, idx) => {
              const isSelected = selectedChapterIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedChapterIdx(idx)}
                  className={`text-right p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-teal-500/15 border-teal-500 text-white ring-1 ring-teal-500 shadow-md'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="truncate">
                    <span className="block text-[10px] font-mono text-teal-400 font-bold">
                      CHAPTER 0{ch.chapterNumber}
                    </span>
                    <span className="truncate block font-semibold text-white">
                      {ch.chapter.split(':')[1]?.trim() || ch.chapter}
                    </span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation (All / Theory / Quizzes / Videos) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveSubTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'all'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            الكل (All Content)
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('theory')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'theory'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>قسم الشرح النظري ({theoryBlocks.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('quiz')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'quiz'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>الاختبارات العملية والـ MCQs ({quizBlocks.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('video')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'video'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>مشغل الفيديوهات الآمن ({videoBlocks.length})</span>
          </button>
        </div>

        <span className="text-xs font-mono text-slate-400 hidden md:inline">
          {activeChapter.content_blocks.length} Content Blocks
        </span>
      </div>

      {/* RENDER CONTENT BLOCKS */}
      <div className="space-y-8">
        {/* 1. THEORY SECTION */}
        {(activeSubTab === 'all' || activeSubTab === 'theory') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <span>1. قسم الشرح النظري (Theory Section)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {theoryBlocks.length} موضوع نظري
              </span>
            </div>
            <HistologyStructuredTheorySection
              theoryBlocks={theoryBlocks}
              chapterTitle={activeChapter.chapter}
            />
          </div>
        )}

        {/* 2. PRACTICAL QUIZZES */}
        {(activeSubTab === 'all' || activeSubTab === 'quiz') && (
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-400" />
                <span>2. قسم الاختبارات العملية (Practical Quizzes - MCQs)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {quizBlocks.length} أسئلة شرائح
              </span>
            </div>
            <HistologyPracticalQuizSection
              quizBlocks={quizBlocks}
              chapterTitle={activeChapter.chapter}
            />
          </div>
        )}

        {/* 3. MEDIA VIDEOS */}
        {(activeSubTab === 'all' || activeSubTab === 'video') && videoBlocks.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-teal-400" />
                <span>3. مشغل الفيديوهات المجهرية (Video Embed with Fallback)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {videoBlocks.length} شروحات مرئية
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {videoBlocks.map((vid, vIdx) => (
                <HistologyVideoPlayer
                  key={vIdx}
                  originalUrl={vid.original_url}
                  fixedEmbedUrl={vid.fixed_embed_url}
                  title={vid.title}
                  description={vid.description}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
