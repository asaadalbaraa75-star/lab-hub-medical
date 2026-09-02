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
  Sparkles
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
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  activeLabId,
  onSelectTab,
  currentUser,
  userRole,
  onOpenAiTutor,
  onOpenAboutModal
}) => {
  const safeUser = currentUser || {
    id: 'usr_sarah',
    name: 'Sarah Al-Mansoor',
    role: userRole || 'student',
    email: 'sarah.mansoor@med.edu',
    studentId: 'MBBS-2024-8842',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  };
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'labs',
      label: 'My Labs',
      icon: FlaskConical,
      subItems: [
        { id: 'anatomy', label: 'Anatomy Lab', icon: Bone, color: 'text-indigo-600' },
        { id: 'histology', label: 'Histology Lab', icon: Microscope, color: 'text-teal-600' },
        { id: 'bacteriology', label: 'Bacteriology Lab', icon: Bug, color: 'text-emerald-600' },
        { id: 'biochemistry', label: 'Biochemistry Lab', icon: FlaskConical, color: 'text-amber-600' }
      ]
    },
    { id: 'histology_microscope', label: 'Virtual Microscope Viewer', icon: Microscope },
    { id: 'mcq_bank', label: 'MCQ Bank (200+ Questions)', icon: HelpCircle },
    { id: 'bacteriology_concept_map', label: 'Bacteriology Mental Map', icon: Network },
    { id: 'educational_videos', label: '3-Min Micro-Lectures', icon: Video },
    { id: 'medical_exams', label: 'الامتحانات العملية (OSPE)', icon: Award },
    { id: 'biochemistry_guide', label: 'دليل الكيمياء الحيوية (9 Tests)', icon: FlaskConical },
    { id: 'teacher_dashboard', label: 'بنك الأسئلة ولوحة الأستاذ', icon: GraduationCap },
    { id: 'practicals', label: 'Practicals & Slides', icon: BookOpen },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'quizzes', label: 'Quizzes', icon: CheckSquare },
    { id: 'progress', label: 'Progress & Grades', icon: BarChart3 },
    { id: 'announcements', label: 'Announcements', icon: Bell }
  ];

  return (
    <aside
      id="main-sidebar"
      className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none overflow-y-auto"
    >
      {/* Top Branding Section */}
      <div>
        <div className="p-5 pb-4 border-b border-[#E2E8F0]">
          <button
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className="text-left w-full focus:outline-none"
          >
            <LabHubLogo size="md" showTagline={true} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1" aria-label="Main Navigation">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>

          {mainNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.subItems) {
              const isAnySubActive = activeTab === 'labs' || (activeTab === 'lab_detail' && activeLabId);
              return (
                <div key={item.id} className="space-y-0.5 pt-0.5">
                  <button
                    type="button"
                    onClick={() => onSelectTab('labs')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive && !activeLabId
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-indigo-600" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isAnySubActive ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Sub-menu for the 3 Labs */}
                  <div className="pl-6 pr-1 space-y-0.5">
                    {item.subItems.map(sub => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeTab === 'lab_detail' && activeLabId === sub.id;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => onSelectTab('lab_detail', sub.id as LabSubjectId)}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isSubActive
                              ? 'bg-indigo-50 text-indigo-700 font-bold border-l-2 border-indigo-600'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <SubIcon className={`w-3.5 h-3.5 ${sub.color}`} />
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                id={`sidebar-link-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Instructor Specific Menu */}
          {safeUser.role === 'instructor' && (
            <div className="pt-3">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-600">
                Instructor Workspace
              </div>
              <button
                type="button"
                id="sidebar-link-instructor-portal"
                onClick={() => onSelectTab('instructor_portal')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'instructor_portal'
                    ? 'bg-teal-50 text-teal-700 font-semibold border border-teal-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-4 h-4 text-teal-600" />
                <span>Course & Lab Editor</span>
              </button>
            </div>
          )}

          {/* Admin Specific Menu */}
          {safeUser.role === 'admin' && (
            <div className="pt-3">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                Faculty Directorate
              </div>
              <button
                type="button"
                id="sidebar-link-admin-portal"
                onClick={() => onSelectTab('admin_portal')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'admin_portal'
                    ? 'bg-amber-50 text-amber-700 font-semibold border border-amber-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Approval Workflow & Metrics</span>
              </button>
            </div>
          )}

          {/* About Platform & Creator Section */}
          {onOpenAboutModal && (
            <div className="pt-3 border-t border-[#E2E8F0]/70">
              <button
                type="button"
                id="sidebar-link-about-platform"
                onClick={onOpenAboutModal}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-amber-900 bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/80 transition-all text-right group"
              >
                <Award className="w-4 h-4 text-amber-600 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col text-right w-full min-w-0">
                  <span className="truncate">عن المنصة والمطورة</span>
                  <span className="text-[10px] font-normal text-amber-700 truncate">إشراف: سكينة أسعد</span>
                </div>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Bottom Section: Pro Status Card + Profile */}
      <div className="p-3 space-y-3 border-t border-[#E2E8F0]">
        {/* Sleek Dark Accent Card (FinFlow styled) */}
        <div className="bg-slate-900 text-white rounded-xl p-3.5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200">OSPE Readiness</span>
            <span className="text-[10px] font-bold bg-indigo-500/30 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-400/30">
              Active
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Practicals & spotters on track for semester exam.
          </p>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: '83%' }} />
          </div>
        </div>

        {/* Profile Summary Card */}
        <div
          onClick={() => onSelectTab('profile')}
          className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] cursor-pointer transition-all group"
        >
          <img
            src={safeUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={safeUser.name}
            className="w-8 h-8 rounded-lg object-cover border border-[#E2E8F0]"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
              {safeUser.name}
            </span>
            <span className="text-[10px] text-slate-400 truncate flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-teal-600" />
              {safeUser.studentId}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
