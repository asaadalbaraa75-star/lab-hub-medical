import React, { useState } from 'react';
import { ALL_HISTOLOGY_LESSONS, HistologyLessonItem } from './HistologyCurriculumData';
import { HistologyHomeView } from './HistologyHomeView';
import { HistologyLessonView } from './HistologyLessonView';
import { HistologyPracticalExamView } from './HistologyPracticalExamView';
import { HistologyStructuredHub } from './HistologyStructuredHub';
import { Database, Microscope, BookOpen, HelpCircle } from 'lucide-react';

interface Props {
  searchQuery?: string;
  onOpenExam?: () => void;
  onOpenSpotter?: () => void;
}

export const HistologyLabView: React.FC<Props> = ({
  searchQuery = '',
  onOpenExam,
  onOpenSpotter
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isExamMode, setIsExamMode] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'lessons' | 'structured_hub'>('lessons');

  // Find currently active lesson if one is selected
  const activeLessonIndex = ALL_HISTOLOGY_LESSONS.findIndex(
    (l) => l.id === selectedLessonId
  );
  const activeLesson: HistologyLessonItem | undefined =
    activeLessonIndex >= 0 ? ALL_HISTOLOGY_LESSONS[activeLessonIndex] : undefined;

  const handleSelectLesson = (lessonId: string) => {
    setIsExamMode(false);
    setSelectedLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedLessonId(null);
    setIsExamMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextLesson = () => {
    if (activeLessonIndex >= 0 && activeLessonIndex < ALL_HISTOLOGY_LESSONS.length - 1) {
      handleSelectLesson(ALL_HISTOLOGY_LESSONS[activeLessonIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      handleSelectLesson(ALL_HISTOLOGY_LESSONS[activeLessonIndex - 1].id);
    }
  };

  // If Practical Exam Mode is active
  if (isExamMode) {
    return (
      <HistologyPracticalExamView
        onBackToHome={handleBackToHome}
      />
    );
  }

  // If a lesson is selected, render the dedicated 3-tab lesson view
  if (selectedLessonId && activeLesson) {
    return (
      <HistologyLessonView
        lesson={activeLesson}
        onBackToSection={handleBackToHome}
        onNextLesson={
          activeLessonIndex < ALL_HISTOLOGY_LESSONS.length - 1
            ? handleNextLesson
            : undefined
        }
        onPrevLesson={
          activeLessonIndex > 0
            ? handlePrevLesson
            : undefined
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Main Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode('lessons')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'lessons'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Microscope className="w-4 h-4" />
            <span>الأقسام والشرائح المجهرية (Curriculum Atlas)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('structured_hub')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'structured_hub'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>قسم الشرح وبنك الأسئلة والفيديوهات (Theory & Quiz Hub)</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-teal-400/80 px-2 hidden lg:inline">
          Histology Practical Platform
        </span>
      </div>

      {viewMode === 'structured_hub' ? (
        <HistologyStructuredHub onBack={() => setViewMode('lessons')} />
      ) : (
        <HistologyHomeView
          onSelectLesson={handleSelectLesson}
          onOpenExam={() => setIsExamMode(true)}
          onOpenStructuredHub={() => setViewMode('structured_hub')}
        />
      )}
    </div>
  );
};


