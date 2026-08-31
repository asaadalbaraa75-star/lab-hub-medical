import React from 'react';
import { User, StudentProgress, ScheduleItem, Announcement, LabSubjectId } from '../../types';
import { WelcomeCard } from './WelcomeCard';
import { TodayLabCard } from './TodayLabCard';
import { QuickAccessCards } from './QuickAccessCards';
import { MyLaboratoriesSection } from './MyLaboratoriesSection';
import { PreparationTodoList } from './PreparationTodoList';
import { UpcomingLabsSection } from './UpcomingLabsSection';
import { RecentAnnouncements } from './RecentAnnouncements';

interface DashboardViewProps {
  currentUser: User;
  progress: StudentProgress;
  schedule: ScheduleItem[];
  announcements: Announcement[];
  onSelectLab: (labId: LabSubjectId) => void;
  onStartLabExam?: (labId: LabSubjectId) => void;
  onOpenPractical: (labId: string, practicalId: string) => void;
  onSelectTab: (tab: string) => void;
  onToggleTask: (scheduleId: string, taskId: string) => void;
  onOpenAnnouncements: () => void;
  onOpenAiTutor: () => void;
  onOpenShareModal?: () => void;
  onOpenAboutModal?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  progress,
  schedule,
  announcements,
  onSelectLab,
  onStartLabExam,
  onOpenPractical,
  onSelectTab,
  onToggleTask,
  onOpenAnnouncements,
  onOpenAiTutor,
  onOpenShareModal,
  onOpenAboutModal
}) => {
  const todaySchedule = schedule.find(s => s.isToday) || schedule[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300" id="main-dashboard-view">
      {/* 1. Welcome Card with overall progress ring & Arabic greeting */}
      <WelcomeCard
        currentUser={currentUser}
        progress={progress}
        onExploreLabs={() => onSelectTab('laboratories')}
        onOpenShareModal={onOpenShareModal}
        onOpenAboutModal={onOpenAboutModal}
      />

      {/* 2. Today's Lab Hero Card */}
      <TodayLabCard
        todaySchedule={todaySchedule}
        onOpenPractical={onOpenPractical}
      />

      {/* 3. Quick Access 4-Card Grid */}
      <QuickAccessCards
        upcomingCount={schedule.length}
        practicalsCount={36}
        quizzesCount={25}
        progress={progress}
        onSelectTab={onSelectTab}
      />

      {/* 4. My Laboratories Section (4 Large Core Cards: Anatomy, Histology, Bacteriology, Biochemistry) */}
      <MyLaboratoriesSection
        onSelectLab={onSelectLab}
        onStartLabExam={onStartLabExam}
        progress={progress}
      />

      {/* 5. Two Column Split: Preparation To-Do + Upcoming Labs & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Lab Preparation Checklist */}
        <div className="lg:col-span-6 space-y-6">
          <PreparationTodoList
            scheduleItem={todaySchedule}
            onToggleTask={onToggleTask}
          />
        </div>

        {/* Right: Upcoming Labs + Recent Announcements */}
        <div className="lg:col-span-6 space-y-6">
          <UpcomingLabsSection
            schedule={schedule}
            onOpenPractical={onOpenPractical}
            onViewAllSchedule={() => onSelectTab('schedule')}
          />

          <RecentAnnouncements
            announcements={announcements}
            onOpenAnnouncements={onOpenAnnouncements}
          />
        </div>
      </div>
    </div>
  );
};
