import React from 'react';
import {
  LayoutDashboard,
  FlaskConical,
  BookOpen,
  Calendar,
  CheckSquare,
  BarChart3,
  Bell,
  User,
  Settings,
  ShieldAlert,
  Edit3,
  ChevronRight,
  Bone,
  Microscope,
  Bug,
  GraduationCap,
  Award,
  Info,
  Network,
  Video,
  HelpCircle,
  Sparkles,
  LogOut
} from 'lucide-react';
import { LabHubLogo } from '../common/LabHubLogo';
import { User as UserType, LabSubjectId } from '../../types';

interface SidebarProps {
  activeTab: string;
  activeLabId?: LabSubjectId;
  onSelectTab: (tab: string, labId?: LabSubjectId, practicalId?: string) => void;
  currentUser?: UserType;
  userRole?: 'student' | 'instructor' | 'admin';
  onOpenAiTutor?: () => void;
  onOpenAboutModal?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  activeLabId,
  onSelectTab,
  currentUser,
  userRole,
  onOpenAiTutor,
  onOpenAboutModal,
  onLogout
}) => {
  const safeUser = currentUser || {
    id: 'usr_sarah',
    name: 'Sarah Al-Mansoor',
    role: userRole || 'student',
    email: 'sarah.mansoor@med.edu',
    studentId: 'MBBS-2024-8842',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  };

  const isSubjectsActive = [
    'laboratories',
    'anatomy',
    'histology',
    'bacteriology',
    'biochemistry',
    'practical_detail',
    'organism_detail',
    'practicals',
    'spotters',
    'histology_microscope',
    'bacteriology_concept_map',
    'educational_videos'
  ].includes(activeTab);

  const isExamsActive = [
    'medical_exams',
    'exam_runner',
    'exam_result',
    'quizzes',
    'quiz_runner',
    'mcq_bank'
  ].includes(activeTab);

  const coreSubjects = [
    { id: 'anatomy', label: 'Anatomy', icon: Bone, color: 'text-sky-400' },
    { id: 'histology', label: 'Histology', icon: Microscope, color: 'text-teal-400' },
    { id: 'bacteriology', label: 'Bacteriology', icon: Bug, color: 'text-emerald-400' },
    { id: 'biochemistry', label: 'Biochemistry', icon: FlaskConical, color: 'text-amber-400' },
  ];

  return (
    <aside
      id="main-sidebar"
      className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none overflow-y-auto text-slate-200"
    >
      {/* Top Branding Section */}
      <div>
        <div className="p-5 pb-4 border-b border-slate-800/80">
          <button
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className="text-left w-full focus:outline-none flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              LH
            </div>
            <div>
              <div className="font-extrabold text-base tracking-wider text-white flex items-center gap-1.5">
                LAB HUB
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  MED
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Smart Medical Platform</div>
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1.5" aria-label="Main Navigation">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Study Portal
          </div>

          {/* 1. Home */}
          <button
            type="button"
            id="sidebar-link-dashboard"
            onClick={() => onSelectTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-300 font-semibold border border-cyan-500/30 shadow-xs'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>Home</span>
          </button>

          {/* 2. Subjects (with 4 sub-labs) */}
          <div className="space-y-1">
            <button
              type="button"
              id="sidebar-link-subjects"
              onClick={() => onSelectTab('laboratories')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isSubjectsActive
                  ? 'bg-slate-800/90 text-white font-semibold border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FlaskConical className={`w-4 h-4 ${isSubjectsActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Subjects</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                4 Labs
              </span>
            </button>

            {/* Core 4 Subjects Quick Links */}
            <div className="pl-5 pr-1 space-y-1 pt-0.5">
              {coreSubjects.map(sub => {
                const SubIcon = sub.icon;
                const isSubActive = activeTab === sub.id || (activeTab === 'practical_detail' && activeLabId === sub.id);
                return (
                  <button
                    key={sub.id}
                    type="button"
                    id={`sidebar-link-${sub.id}`}
                    onClick={() => onSelectTab(sub.id as LabSubjectId)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSubActive
                        ? 'bg-cyan-950/60 text-cyan-300 font-bold border-l-2 border-cyan-400 pl-2.5'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <SubIcon className={`w-3.5 h-3.5 ${sub.color}`} />
                      <span>{sub.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Exams & Quizzes */}
          <button
            type="button"
            id="sidebar-link-medical_exams"
            onClick={() => onSelectTab('medical_exams')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isExamsActive
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-300 font-semibold border border-amber-500/30 shadow-xs'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className={`w-4 h-4 ${isExamsActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>Exams & Quizzes</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-500/20">
              OSPE
            </span>
          </button>

          {/* 4. Progress */}
          <button
            type="button"
            id="sidebar-link-progress"
            onClick={() => onSelectTab('progress')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'progress'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-xs'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${activeTab === 'progress' ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>My Progress</span>
          </button>

          {/* 5. Profile */}
          <button
            type="button"
            id="sidebar-link-profile"
            onClick={() => onSelectTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-xs'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>My Profile</span>
          </button>

          {/* Medical Tutor Quick Action */}
          {onOpenAiTutor && (
            <div className="pt-2">
              <button
                type="button"
                id="sidebar-open-ai-tutor"
                onClick={onOpenAiTutor}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-950/80 to-purple-950/60 text-indigo-300 border border-indigo-500/30 hover:border-indigo-400 transition-all group"
              >
                <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
                <span>AI Medical Tutor</span>
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-indigo-500 text-white font-bold">
                  ASK
                </span>
              </button>
            </div>
          )}

          {/* Instructor Workspace (if role) */}
          {(safeUser.role === 'instructor' || safeUser.role === 'admin') && (
            <div className="pt-2">
              <button
                type="button"
                id="sidebar-link-teacher-dashboard"
                onClick={() => onSelectTab('teacher_dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'teacher_dashboard'
                    ? 'bg-teal-950 text-teal-300 border border-teal-500/40'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-teal-300'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-teal-400" />
                <span>Instructor Question Hub</span>
              </button>
            </div>
          )}

          {/* Admin Faculty Directorate (Strictly for role === 'admin') */}
          {safeUser.role === 'admin' && (
            <div className="pt-1">
              <button
                type="button"
                id="sidebar-link-admin-dashboard"
                onClick={() => onSelectTab('admin_dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'admin' || activeTab === 'admin_dashboard'
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                    : 'text-amber-400 hover:bg-amber-950/50'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Faculty Directorate (Admin)</span>
              </button>
            </div>
          )}

          {/* About Platform & Creator Section */}
          {onOpenAboutModal && (
            <div className="pt-2 border-t border-slate-800/80">
              <button
                type="button"
                id="sidebar-link-about-platform"
                onClick={onOpenAboutModal}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-500/30 transition-all text-right group"
              >
                <Award className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col text-right w-full min-w-0">
                  <span className="truncate">About Platform</span>
                  <span className="text-[10px] font-normal text-amber-400/80 truncate">Supervision: Sakina Asaad</span>
                </div>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Bottom Section: OSPE Status + Profile */}
      <div className="p-3 space-y-2.5 border-t border-slate-800/80">
        {/* Sleek Dark Medical Status Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">OSPE Readiness</span>
            <span className="text-[10px] font-bold bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">
              Year 1 MBBS
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full" style={{ width: '85%' }} />
          </div>
        </div>

        {/* Profile Summary Card & Logout */}
        <div className="flex items-center gap-2">
          <div
            onClick={() => onSelectTab('profile')}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all group flex-1 min-w-0"
          >
            <img
              src={safeUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={safeUser.name}
              className="w-8 h-8 rounded-lg object-cover border border-slate-600 shrink-0"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
                {safeUser.name}
              </span>
              <span className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{safeUser.studentId}</span>
              </span>
            </div>
          </div>

          {onLogout && (
            <button
              type="button"
              id="sidebar-logout-btn"
              onClick={onLogout}
              title="Sign Out"
              className="p-2.5 rounded-xl border border-rose-900/60 bg-rose-950/40 text-rose-400 hover:bg-rose-900/50 hover:text-rose-300 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
