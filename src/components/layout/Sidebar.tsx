import React from 'react';
import {
  LayoutDashboard,
  FlaskConical,
  BarChart3,
  User,
  ShieldAlert,
  Bone,
  Microscope,
  GraduationCap,
  Award,
  Sparkles,
  Compass,
  LogOut
} from 'lucide-react';
import { User as UserType, LabSubjectId } from '../../types';
import { OwnershipWatermark } from '../common/OwnershipWatermark';

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
    'biochemistry',
    'practical_detail',
    'practicals',
    'spotters',
    'histology_microscope',
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
    { id: 'biochemistry', label: 'Biochemistry', icon: FlaskConical, color: 'text-amber-400' },
  ];

  return (
    <aside
      id="main-sidebar"
      className="w-64 glass-card rounded-2xl flex flex-col justify-between select-none overflow-y-auto text-slate-200 border border-white/10 shadow-2xl p-2.5 max-h-[calc(100vh-7.5rem)]"
    >
      {/* Top Branding Section */}
      <div>
        <div className="p-3 pb-3.5 border-b border-white/10">
          <button
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className="text-left w-full focus:outline-none flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.35)] group-hover:scale-105 transition-transform">
              LH
            </div>
            <div>
              <div className="font-extrabold text-base tracking-wider text-white flex items-center gap-1.5">
                LAB HUB
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-500/40">
                  MED
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Smart Medical Platform</div>
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-2 space-y-1" aria-label="Main Navigation">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Study Portal
          </div>

          {/* 1. Home */}
          <button
            type="button"
            id="sidebar-link-dashboard"
            onClick={() => onSelectTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-purple-950/80 to-indigo-950/60 text-purple-300 font-semibold border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-purple-400' : 'text-slate-400'}`} />
            <span>الرئيسية • Home</span>
          </button>

          {/* 1.5. Visual Map (Atlas) */}
          <button
            type="button"
            id="sidebar-link-visual-map"
            onClick={() => onSelectTab('visual_map')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'visual_map'
                ? 'bg-gradient-to-r from-sky-950/80 to-indigo-950/60 text-sky-300 font-semibold border border-sky-500/40 shadow-[0_0_15px_rgba(14,165,233,0.2)]'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className={`w-4 h-4 ${activeTab === 'visual_map' ? 'text-sky-400' : 'text-slate-400'}`} />
              <span>الخريطة البصرية • Visual Map</span>
            </div>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
              ATLAS
            </span>
          </button>

          {/* 2. Subjects */}
          <div className="space-y-1">
            <button
              type="button"
              id="sidebar-link-subjects"
              onClick={() => onSelectTab('laboratories')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                isSubjectsActive
                  ? 'bg-gradient-to-r from-purple-950/80 to-indigo-950/60 text-purple-300 font-semibold border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FlaskConical className={`w-4 h-4 ${isSubjectsActive ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>المعامل • Subjects</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-purple-300 border border-white/10">
                3 Labs
              </span>
            </button>

            {/* Core 3 Subjects Quick Links */}
            <div className="pl-4 pr-1 space-y-0.5 pt-0.5">
              {coreSubjects.map(sub => {
                const SubIcon = sub.icon;
                const isSubActive = activeTab === sub.id || (activeTab === 'practical_detail' && activeLabId === sub.id);
                return (
                  <button
                    key={sub.id}
                    type="button"
                    id={`sidebar-link-${sub.id}`}
                    onClick={() => onSelectTab(sub.id as LabSubjectId)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSubActive
                        ? 'bg-purple-950/50 text-purple-300 font-bold border-l-2 border-purple-400 pl-2'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
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
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isExamsActive
                ? 'bg-gradient-to-r from-amber-950/70 to-orange-950/50 text-amber-300 font-semibold border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className={`w-4 h-4 ${isExamsActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>الامتحانات • Exams</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
              OSPE
            </span>
          </button>

          {/* 4. Progress */}
          <button
            type="button"
            id="sidebar-link-progress"
            onClick={() => onSelectTab('progress')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'progress'
                ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/60 text-cyan-300 font-semibold border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${activeTab === 'progress' ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>التقدم • Progress</span>
          </button>

          {/* 5. Profile */}
          <button
            type="button"
            id="sidebar-link-profile"
            onClick={() => onSelectTab('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-purple-950/80 to-indigo-950/60 text-purple-300 font-semibold border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-purple-400' : 'text-slate-400'}`} />
            <span>الملف الشخصي • Profile</span>
          </button>

          {/* Medical Tutor Quick Action */}
          {onOpenAiTutor && (
            <div className="pt-1.5">
              <button
                type="button"
                id="sidebar-open-ai-tutor"
                onClick={onOpenAiTutor}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-950/80 via-indigo-950/70 to-blue-950/60 text-purple-200 border border-purple-500/40 hover:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all group"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
                <span>AI Medical Tutor</span>
                <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded bg-purple-600 text-white font-bold">
                  ASK
                </span>
              </button>
            </div>
          )}

          {/* Instructor Workspace (if role) */}
          {(safeUser.role === 'instructor' || safeUser.role === 'admin') && (
            <div className="pt-1.5">
              <button
                type="button"
                id="sidebar-link-teacher-dashboard"
                onClick={() => onSelectTab('teacher_dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'teacher_dashboard'
                    ? 'bg-teal-950 text-teal-300 border border-teal-500/40'
                    : 'text-slate-400 hover:bg-white/5 hover:text-teal-300'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-teal-400" />
                <span>Instructor Hub</span>
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
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
            <div className="pt-1.5 border-t border-white/10">
              <button
                type="button"
                id="sidebar-link-about-platform"
                onClick={onOpenAboutModal}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-amber-300 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-500/30 transition-all text-right group"
              >
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col text-right w-full min-w-0">
                  <span className="truncate">عن المنصة • About</span>
                  <span className="text-[10px] font-normal text-amber-300/80 truncate">إشراف: سكينة أسعد</span>
                </div>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Bottom Section: OSPE Status + Profile */}
      <div className="p-2 space-y-2 border-t border-white/10">
        {/* Sleek Dark Medical Status Card */}
        <div className="bg-[#070B14]/80 border border-white/10 rounded-xl p-2.5 shadow-inner space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">OSPE Readiness</span>
            <span className="text-[10px] font-bold bg-cyan-950/80 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-500/30">
              Year 1 MBBS
            </span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: '85%' }} />
          </div>
        </div>

        {/* Profile Summary Card & Logout */}
        <div className="flex items-center gap-1.5">
          <div
            onClick={() => onSelectTab('profile')}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all group flex-1 min-w-0"
          >
            <img
              src={safeUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={safeUser.name}
              className="w-7 h-7 rounded-lg object-cover border border-purple-500/30 shrink-0"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-200 truncate group-hover:text-purple-300 transition-colors">
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
              className="p-2 rounded-xl border border-rose-900/60 bg-rose-950/40 text-rose-400 hover:bg-rose-900/50 hover:text-rose-300 transition-colors shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Permanent Software Ownership Attribution */}
        <div className="pt-2 border-t border-white/5 flex flex-col items-center justify-center text-center">
          <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
        </div>
      </div>
    </aside>
  );
};
