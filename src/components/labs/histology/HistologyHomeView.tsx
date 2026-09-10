import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Microscope,
  Search,
  ArrowRight,
  Layers,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  FileText,
  BookmarkCheck
} from 'lucide-react';
import { HISTOLOGY_LESSONS, HistologyLesson } from './HistologyLessonsData';

interface HistologyHomeViewProps {
  onSelectLesson: (lessonId: string) => void;
  onOpenExam?: () => void;
  onOpenSpotter?: () => void;
  externalSearch?: string;
}

export const HistologyHomeView: React.FC<HistologyHomeViewProps> = ({
  onSelectLesson,
  onOpenExam,
  onOpenSpotter,
  externalSearch = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(externalSearch);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'foundation' | 'techniques' | 'cells' | 'tissues' | 'exam'>('all');

  // Filter lessons based on search query and category
  const filteredLessons = useMemo(() => {
    return HISTOLOGY_LESSONS.filter(lesson => {
      const matchesSearch =
        lesson.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.titleAr.includes(searchQuery) ||
        lesson.numberString.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.keyConcepts.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        lesson.summaryEn.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === 'foundation') {
        return lesson.lessonNumber === 1 || lesson.lessonNumber === 2;
      }
      if (selectedFilter === 'techniques') {
        return lesson.lessonNumber === 3 || lesson.lessonNumber === 4 || lesson.lessonNumber === 5;
      }
      if (selectedFilter === 'cells') {
        return lesson.lessonNumber === 6 || lesson.lessonNumber === 7;
      }
      if (selectedFilter === 'tissues') {
        return lesson.lessonNumber === 8 || lesson.lessonNumber === 9;
      }
      if (selectedFilter === 'exam') {
        return lesson.lessonNumber === 10;
      }
      return true;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-500/20 bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/30">
              <GraduationCapIcon className="w-3.5 h-3.5" />
              1st Year Practical Curriculum
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              Faculty of Medicine • Sana'a University
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <BookmarkCheck className="w-3.5 h-3.5 text-teal-400" />
              Verified Faculty Handout: Dr. Ruqia Y. Sharaf Addin
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Histology Laboratory
            <span className="block text-xl sm:text-2xl font-normal text-teal-400/90 mt-1">
              المختبر العملي للأنسجة والبيولوجيا الخلوية
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            A practical, slide-by-slide medical training environment. Every lesson contains high-definition real microscopic slides, concise diagnostic clues, practical identification self-tests, and high-yield OSPE exam tables.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span className="font-semibold text-white">10</span> Dedicated Lessons
            </div>
            <div className="flex items-center gap-2">
              <Microscope className="w-4 h-4 text-teal-400" />
              <span className="font-semibold text-white">50+</span> Real Histological Micrographs
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-400" />
              <span className="font-semibold text-white">OSPE</span> Spotter Identification
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white">100%</span> Exam-Focused
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search lessons (e.g. Golgi, Mitochondria, Epithelium, Mitosis)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All 10 Lessons' },
            { id: 'foundation', label: 'Foundations' },
            { id: 'techniques', label: 'Microscopes & Stains' },
            { id: 'cells', label: 'Cell & Mitosis' },
            { id: 'tissues', label: 'Epithelial & Connective' },
            { id: 'exam', label: 'OSPE Simulator' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedFilter === tab.id
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                  : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. LESSON CARDS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-400" />
            Independent Practical Lessons ({filteredLessons.length} Modules)
          </h2>
          <span className="text-xs text-slate-500">
            Click any lesson card to launch its dedicated slide deck
          </span>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-6">
            <Microscope className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">No lessons matching "{searchQuery}"</p>
            <p className="text-slate-500 text-xs mt-1">Try searching for "Golgi", "Stains", "Mitosis", or "Tendon"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-teal-400 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onOpen={() => onSelectLesson(lesson.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 4. PRACTICAL OSPE BANNER CALLOUT */}
      <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            Practical Exam Preparation
          </div>
          <h3 className="text-xl font-bold text-white">
            Ready to test your slide recognition under exam conditions?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
            Launch Station 10 to practice timed virtual microscopy spotter stations with real histological images, clinical questions, and instant diagnostic pearls.
          </p>
        </div>

        <button
          onClick={() => onSelectLesson('lesson_10')}
          className="px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-teal-500/20 flex items-center gap-2 whitespace-nowrap transition-all transform hover:-translate-y-0.5"
        >
          <Target className="w-4 h-4" />
          Launch OSPE Exam Simulator
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

/* Individual Lesson Card Component */
interface LessonCardProps {
  lesson: HistologyLesson;
  onOpen: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onOpen }) => {
  return (
    <div
      onClick={onOpen}
      className="group relative flex flex-col justify-between bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Top Image Preview */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={lesson.coverImage}
          alt={lesson.titleEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md text-xs font-black tracking-wider uppercase bg-slate-950/80 backdrop-blur-md text-teal-400 border border-teal-500/30">
            {lesson.numberString}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700/60">
            {lesson.badge}
          </span>
        </div>

        {/* Bottom Image Overlay: Slides count and Duration */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <FileText className="w-3.5 h-3.5 text-teal-400" />
            {lesson.slides.length} Practical Slides
          </span>
          <span className="flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            ~{lesson.durationMinutes} min
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
            {lesson.titleEn}
          </h3>
          <p className="text-xs font-medium text-slate-400">
            {lesson.titleAr}
          </p>
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
            {lesson.summaryEn}
          </p>
        </div>

        {/* Key Concepts Chips */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Key Practical Focus:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {lesson.keyConcepts.slice(0, 3).map((concept, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700/60"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="w-full py-2.5 px-4 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-950 text-xs font-bold rounded-xl border border-teal-500/30 hover:border-teal-500 transition-all flex items-center justify-center gap-2 group-hover:bg-teal-500 group-hover:text-slate-950"
          >
            <span>Open Lesson</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
