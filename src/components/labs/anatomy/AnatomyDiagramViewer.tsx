import React from 'react';
import { AnatomyTopic } from './AnatomyData';
import { UnifiedMedicalImageViewer } from '../common/UnifiedMedicalImageViewer';

interface AnatomyDiagramViewerProps {
  topic: AnatomyTopic;
}

export const AnatomyDiagramViewer: React.FC<AnatomyDiagramViewerProps> = ({ topic }) => {
  return (
    <div className="w-full space-y-4" id="interactive-diagram-viewer">
      <UnifiedMedicalImageViewer
        subject="anatomy"
        topicOrLessonId={topic.id}
        topicTitle={topic.titleEn}
        topicTitleAr={topic.titleAr}
      />
    </div>
  );
};
