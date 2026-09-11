import React, { useState } from 'react';
import { ALL_HISTOLOGY_LESSONS, HistologyLessonItem } from './HistologyCurriculumData';
import { HistologyHomeView } from './HistologyHomeView';
import { HistologyLessonView } from './HistologyLessonView';
import { HistologyPracticalExamView } from './HistologyPracticalExamView';

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

  // Otherwise, render the clean 8-section dashboard
  return (
    <HistologyHomeView
      onSelectLesson={handleSelectLesson}
      onOpenExam={() => setIsExamMode(true)}
    />
  );
};

