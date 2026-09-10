import React, { useState } from 'react';
import { HISTOLOGY_LESSONS, HistologyLesson } from './HistologyLessonsData';
import { HistologyHomeView } from './HistologyHomeView';
import { HistologyLessonContainer } from './HistologyLessonContainer';

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

  // Find currently active lesson if one is selected
  const activeLesson: HistologyLesson | undefined = HISTOLOGY_LESSONS.find(
    (l) => l.id === selectedLessonId
  );

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedLessonId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a lesson is selected, render the dedicated lesson container
  if (selectedLessonId && activeLesson) {
    return (
      <HistologyLessonContainer
        lesson={activeLesson}
        onBackToHome={handleBackToHome}
        onSelectLesson={handleSelectLesson}
      />
    );
  }

  // Otherwise, render the clean Histology Laboratory Home Page with 10 large clickable lesson cards
  return (
    <HistologyHomeView
      onSelectLesson={handleSelectLesson}
      onOpenExam={onOpenExam}
      onOpenSpotter={onOpenSpotter || (() => handleSelectLesson('lesson_10'))}
      externalSearch={searchQuery}
    />
  );
};
