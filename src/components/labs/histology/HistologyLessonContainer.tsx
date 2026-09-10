import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Layers,
  ChevronRight,
  Sparkles,
  Award,
  HelpCircle,
  Table
} from 'lucide-react';
import { HistologyLesson, LessonSlide, HISTOLOGY_LESSONS } from './HistologyLessonsData';
import { HistologyExplanatorySlide } from './HistologyExplanatorySlide';
import { HistologyQuizSlide } from './HistologyQuizSlide';
import { HistologyReviewSlide } from './HistologyReviewSlide';

interface HistologyLessonContainerProps {
  lesson: HistologyLesson;
  onBackToHome: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const HistologyLessonContainer: React.FC<HistologyLessonContainerProps> = ({
  lesson,
  onBackToHome,
  onSelectLesson
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Reset slide index if lesson changes
  useEffect(() => {
    setCurrentSlideIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  const currentSlide: LessonSlide = lesson.slides[currentSlideIndex];
  const totalSlides = lesson.slides.length;
  const progressPercent = Math.round(((currentSlideIndex + 1) / totalSlides) * 100);

  const hasNextSlide = currentSlideIndex < totalSlides - 1;
  const hasPrevSlide = currentSlideIndex > 0;

  // Check next lesson
  const currentLessonIndex = HISTOLOGY_LESSONS.findIndex(l => l.id === lesson.id);
  const nextLesson = currentLessonIndex >= 0 && currentLessonIndex < HISTOLOGY_LESSONS.length - 1
    ? HISTOLOGY_LESSONS[currentLessonIndex + 1]
    : null;

  const handleNextSlide = () => {
    if (hasNextSlide) {
      setCurrentSlideIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nextLesson) {
      onSelectLesson(nextLesson.id);
    } else {
      onBackToHome();
    }
  };

  const handlePrevSlide = () => {
    if (hasPrevSlide) {
      setCurrentSlideIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoToSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (hasNextSlide) setCurrentSlideIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft') {
        if (hasPrevSlide) setCurrentSlideIndex(prev => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasNextSlide, hasPrevSlide]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col justify-between space-y-6">
      <div className="space-y-6">
        {/* 1. TOP HEADER & BREADCRUMBS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-teal-400" />
              <span>Back to Histology Lessons</span>
            </button>

            <div className="hidden sm:block h-5 w-px bg-slate-800" />

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  {lesson.numberString}
                </span>
                <h1 className="text-base font-bold text-white">
                  {lesson.titleEn}
                </h1>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                {lesson.titleAr}
              </p>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-200">
                Slide {currentSlideIndex + 1} of {totalSlides}
              </div>
              <div className="text-[10px] text-slate-400">
                {progressPercent}% completed
              </div>
            </div>

            <div className="w-24 sm:w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2. HORIZONTAL SLIDE CHIP NAVIGATOR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {lesson.slides.map((slide, idx) => {
            const isActive = idx === currentSlideIndex;
            const isCompleted = idx < currentSlideIndex;

            // Determine slide icon
            let SlideIcon = BookOpen;
            if (slide.type === 'quiz') SlideIcon = HelpCircle;
            if (slide.type === 'review') SlideIcon = Table;

            return (
              <button
                key={slide.id}
                onClick={() => handleGoToSlide(idx)}
                className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-lg shadow-teal-500/20'
                    : isCompleted
                    ? 'bg-slate-900/80 text-teal-300 border-teal-500/20 hover:bg-slate-850'
                    : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-slate-200'
                }`}
              >
                <SlideIcon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : isCompleted ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>
                  {String(idx + 1).padStart(2, '0')}. {slide.title}
                </span>
                {isCompleted && (
                  <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* 3. DEDICATED SLIDE VIEWPORT (ONE SLIDE AT A TIME) */}
        <div className="relative rounded-2xl bg-slate-900/50 border border-slate-800/80 p-4 sm:p-6 shadow-xl">
          {/* Render according to slide type */}
          {currentSlide.type === 'explanatory' && currentSlide.explanatory && (
            <HistologyExplanatorySlide data={currentSlide.explanatory} lessonTitle={lesson.titleEn} />
          )}

          {currentSlide.type === 'quiz' && currentSlide.quiz && (
            <HistologyQuizSlide
              data={currentSlide.quiz}
              onNextSlide={hasNextSlide ? handleNextSlide : undefined}
            />
          )}

          {currentSlide.type === 'review' && currentSlide.review && (
            <HistologyReviewSlide
              data={currentSlide.review}
              lessonTitle={lesson.titleEn}
              onRestartLesson={() => setCurrentSlideIndex(0)}
              onNextLesson={nextLesson ? () => onSelectLesson(nextLesson.id) : undefined}
              onBackToHome={onBackToHome}
              hasNextLesson={!!nextLesson}
            />
          )}
        </div>
      </div>

      {/* 4. BOTTOM FOOTER NAVIGATION CONTROLS */}
      <div className="sticky bottom-4 z-30 pt-4 flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl">
        <button
          onClick={handlePrevSlide}
          disabled={!hasPrevSlide}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        {/* Center Indicators */}
        <div className="text-center hidden sm:block">
          <span className="text-xs font-bold text-white">
            {currentSlide.title}
          </span>
          <span className="text-[11px] text-slate-400 block">
            Slide {currentSlideIndex + 1} of {totalSlides}
          </span>
        </div>

        <button
          onClick={handleNextSlide}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition flex items-center gap-2 shadow-md shadow-teal-500/20"
        >
          <span>
            {hasNextSlide
              ? 'Next Slide'
              : nextLesson
              ? 'Finish & Start Next Lesson'
              : 'Complete Lesson'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
