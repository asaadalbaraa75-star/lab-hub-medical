import React from 'react';
import { User, StudentProgress, ScheduleItem, Announcement, LabSubjectId } from '../../types';
import { WelcomeCard } from './WelcomeCard';
import { TodayLabCard } from './TodayLabCard';
import { QuickAccessCards } from './QuickAccessCards';
import { MyLaboratoriesSection } from './MyLaboratoriesSection';
import { PreparationTodoList } from './PreparationTodoList';
import { UpcomingLabsSection } from './UpcomingLabsSection';
import { RecentAnnouncements } from './RecentAnnouncements';
import { Microscope, HelpCircle, Network, Video, Sparkles, ChevronRight } from 'lucide-react';

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

      {/* Interactive Learning Suite (New Upgrades) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Interactive Learning Suite & Question Banks
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
            MBBS Year 1
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onSelectTab('histology_microscope')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-teal-500/50 text-left transition group"
          >
            <Microscope className="w-5 h-5 text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white">Virtual Microscope</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Pan, zoom & spotter pins</p>
          </button>

          <button
            onClick={() => onSelectTab('mcq_bank')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 text-left transition group"
          >
            <HelpCircle className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white">MCQ Question Bank</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">200+ Questions & Rationales</p>
          </button>

          <button
            onClick={() => onSelectTab('bacteriology_concept_map')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 text-left transition group"
          >
            <Network className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white">Microbiology Map</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Gram & diagnostic trees</p>
          </button>

          <button
            onClick={() => onSelectTab('educational_videos')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/50 text-left transition group"
          >
            <Video className="w-5 h-5 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white">3-Min Micro-Lectures</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">High-yield practical videos</p>
          </button>
        </div>
      </div>

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
