import React, { useState } from 'react';
import {
  Microscope,
  Layers,
  Sparkles,
  Circle,
  Activity,
  RotateCcw,
  BookmarkCheck,
  ArrowRight,
  ArrowLeft,
  Target,
  BookOpen,
  Award,
  GraduationCap
} from 'lucide-react';
import { HISTOLOGY_SECTIONS, HistologySection, HistologyLessonItem } from './HistologyCurriculumData';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';

interface HistologyHomeViewProps {
  onSelectLesson: (lessonId: string) => void;
  onOpenExam: () => void;
}

export const HistologyHomeView: React.FC<HistologyHomeViewProps> = ({
  onSelectLesson,
  onOpenExam
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const activeSection: HistologySection | undefined = HISTOLOGY_SECTIONS.find(
    s => s.id === selectedSectionId
  );

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Microscope': return <Microscope className="w-6 h-6 text-teal-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Circle': return <Circle className="w-6 h-6 text-rose-400" />;
      case 'Activity': return <Activity className="w-6 h-6 text-emerald-400" />;
      case 'RotateCcw': return <RotateCcw className="w-6 h-6 text-indigo-400" />;
      case 'BookmarkCheck': return <BookmarkCheck className="w-6 h-6 text-teal-400" />;
      default: return <BookOpen className="w-6 h-6 text-teal-400" />;
    }
  };

  const handleCardClick = (section: HistologySection) => {
    if (section.lessons.length === 1) {
      onSelectLesson(section.lessons[0].id);
    } else {
      setSelectedSectionId(section.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // -------------------------------------------------------------
  // VIEW B: DEDICATED SECTION LESSON LIST (When a section is selected)
  // -------------------------------------------------------------
  if (selectedSectionId && activeSection) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
        {/* Breadcrumb & Section Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <button
            onClick={() => setSelectedSectionId(null)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-teal-400" />
            <span>Back to All Sections</span>
          </button>

          <div className="space-y-0.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/30">
              SECTION {activeSection.number}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {activeSection.titleEn}
            </h1>
            <p className="text-xs text-slate-400">{activeSection.titleAr}</p>
          </div>
        </div>

        {/* Section Lessons Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Select a lesson to begin study:</span>
            <span>{activeSection.lessons.length} Lessons Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {activeSection.lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className="group text-left p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-3 shadow-md hover:shadow-teal-950/30"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-teal-300 border border-slate-700">
                      {lesson.numberString}
                    </span>
                    {lesson.badge && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 group-hover:text-teal-400 transition-colors">
                        {lesson.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                    {lesson.titleEn}
                  </h3>

                  {lesson.titleAr && (
                    <p className="text-xs text-slate-400 font-normal">
                      {lesson.titleAr}
                    </p>
                  )}

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed pt-1">
                    {lesson.quickExplanation}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-teal-400 transition-colors">
                  <span>Open Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW A: MAIN HISTOLOGY LAB DASHBOARD
  // Title: 🔬 HISTOLOGY LAB
  // Subtitle: "Learn it. See it. Identify it."
  // 8 Main Learning Sections as separate large clickable cards
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 p-6 sm:p-8 shadow-2xl text-center sm:text-left">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/30">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>1st-Year Medical Practical Curriculum</span>
            </div>
            <OwnershipWatermark variant="badge" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            🔬 HISTOLOGY LAB
          </h1>

          <p className="text-base sm:text-lg text-teal-300/90 font-medium">
            "Learn it. See it. Identify it."
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Strictly adhering to the verified practical handout by Dr. Ruqia Y. Sharaf Addin. Study the original microscopic slides, master cellular features, and test your recognition.
          </p>
        </div>

        {/* Quick Jump to Practical Exam Mode */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Test your visual recognition on random slides:
          </span>
          <button
            onClick={onOpenExam}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-teal-500/20"
          >
            <Target className="w-4 h-4" />
            <span>🔬 IDENTIFY THE SLIDE (Exam Mode)</span>
          </button>
        </div>
      </div>

      {/* 2. THE 8 MAIN LEARNING SECTIONS AS LARGE CLICKABLE CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-300 font-mono">
            Curriculum Sections (الأقسام التعليمية الثمانية)
          </h2>
          <span className="text-xs text-slate-400">8 Core Sections</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HISTOLOGY_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleCardClick(section)}
              className="group text-left p-6 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg hover:shadow-teal-950/30"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 group-hover:border-teal-500/40 transition-colors">
                    {getSectionIcon(section.iconName)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    SECTION 0{section.number}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                    {section.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    {section.titleAr}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {section.descriptionEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-teal-400 transition-colors">
                <span>
                  {section.lessons.length === 1 ? '1 Dedicated Lesson' : `${section.lessons.length} Individual Lessons`}
                </span>
                <div className="flex items-center gap-1">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Platform Attribution */}
      <div className="pt-4 flex justify-center">
        <OwnershipWatermark variant="minimal" />
      </div>
    </div>
  );
};
