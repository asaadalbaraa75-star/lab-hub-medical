import React from 'react';
import { User, StudentProgress, ScheduleItem, Announcement, LabSubjectId } from '../../types';
import { CinematicMedicalDashboard } from './CinematicMedicalDashboard';
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
    <div className="space-y-12 animate-in fade-in duration-300" id="main-dashboard-view">
      {/* 1. MASTER CINEMATIC MEDICAL DASHBOARD (Exact reference visual translation) */}
      <CinematicMedicalDashboard
        currentUser={currentUser}
        progress={progress}
        schedule={schedule}
        announcements={announcements}
        onSelectLab={onSelectLab}
        onStartLabExam={onStartLabExam}
        onOpenPractical={onOpenPractical}
        onSelectTab={onSelectTab}
        onToggleTask={onToggleTask}
        onOpenAnnouncements={onOpenAnnouncements}
        onOpenAiTutor={onOpenAiTutor}
        onOpenShareModal={onOpenShareModal}
        onOpenAboutModal={onOpenAboutModal}
      />

      {/* 2. ACADEMIC SYNDICATION & PREPARATION SUITE (Preserving student schedule & announcements) */}
      <div className="pt-6 border-t border-white/10 space-y-6">
        <div className="flex items-center justify-between text-right" dir="rtl">
          <div>
            <h3 className="text-xl font-bold text-white">المهام السريرية والجدول الدراسي</h3>
            <p className="text-xs text-slate-400">قائمة التحضير المعملي والإعلانات الأكاديمية الصادرة من العمادة</p>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('schedule')}
            className="text-xs font-bold text-purple-400 hover:text-white transition cursor-pointer"
          >
            عرض كامل الجدول ←
          </button>
        </div>

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
    </div>
  );
};
