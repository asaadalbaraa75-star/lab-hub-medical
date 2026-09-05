import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  UserCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  LogOut,
  Sliders,
  Shield,
  GraduationCap,
  Share2,
  Menu,
  X,
  Home,
  BookOpen,
  Microscope,
  FlaskConical,
  HelpCircle,
  Award,
  Calendar,
  Settings,
  User as UserIcon,
  ChevronLeft
} from 'lucide-react';
import { User, NotificationItem } from '../../types';

interface NavbarProps {
  currentUser?: User;
  onOpenSearch?: () => void;
  onOpenAskAI?: () => void;
  onOpenAiTutor?: () => void;
  onOpenAuthModal?: () => void;
  onOpenAnnouncements?: () => void;
  onOpenShareModal?: () => void;
  onSelectTab?: (tab: string, labId?: any, practicalId?: any) => void;
  notifications?: NotificationItem[];
  onMarkNotificationRead?: (id: string) => void;
  onMarkAllNotificationsRead?: () => void;
  onSwitchRole?: (role: 'student' | 'instructor' | 'admin') => void;
  onRoleChange?: (role: 'student' | 'instructor' | 'admin') => void;
  unreadAnnouncementsCount?: number;
  onSelectSearchResult?: (result: { type: string; id: string; labId?: string }) => void;
  onLogout?: () => void;
  activeTab?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenSearch,
  onOpenAskAI,
  onOpenAiTutor,
  onOpenAuthModal,
  onOpenAnnouncements,
  onOpenShareModal,
  onSelectTab,
  notifications = [],
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onSwitchRole,
  onRoleChange,
  unreadAnnouncementsCount,
  onSelectSearchResult,
  onLogout,
  activeTab = 'dashboard'
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const safeUser = currentUser || {
    id: 'usr_student',
    name: 'Sarah Al-Mansoor',
    role: 'student',
    email: 'sarah.mansoor@med.edu',
    studentId: 'MBBS-2024-8842'
  };

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const unreadCount = safeNotifications.filter(n => !n.isRead).length;

  const handleOpenAi = () => {
    if (onOpenAskAI) onOpenAskAI();
    else if (onOpenAiTutor) onOpenAiTutor();
  };

  const handleNavClick = (tab: string, labId?: any) => {
    if (onSelectTab) {
      onSelectTab(tab, labId);
    }
    setIsSideDrawerOpen(false);
  };

  return (
    <>
      {/* Floating Pill Navigation Container */}
      <header className="sticky top-3 z-40 px-3 sm:px-6 max-w-6xl mx-auto w-full transition-all">
        <div className="rounded-full bg-[#0E081A]/85 hover:bg-[#0E081A]/95 backdrop-blur-2xl border border-white/15 px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.7)] flex items-center justify-between gap-2 sm:gap-4 transition-all">
          
          {/* Left: Circular Logo & Brand */}
          <div
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            {/* Glowing circular crest */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 bg-gradient-to-br from-[#00F0FF] via-[#A855F7] to-[#FF007A] shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[#0E081A] flex items-center justify-center">
                <span className="text-xs sm:text-sm font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-mono">
                  LH
                </span>
              </div>
            </div>

            <div className="hidden sm:block text-right" dir="rtl">
              <span className="text-sm font-black tracking-tight text-white block leading-none">
                LAB HUB
              </span>
              <span className="text-[9px] font-mono text-purple-300 block tracking-wider">
                منصة التعلم الطبي
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-300">
            <button
              type="button"
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              الرئيسية
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('anatomy')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'anatomy'
                  ? 'bg-purple-600/50 text-white shadow-inner'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              التشريح
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('histology')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'histology'
                  ? 'bg-cyan-600/50 text-white shadow-inner'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              الأنسجة
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('biochemistry')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'biochemistry'
                  ? 'bg-amber-600/50 text-white shadow-inner'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              الكيمياء
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('mcq_bank')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'mcq_bank'
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              الأسئلة
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('medical_exams')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'medical_exams'
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              الامتحانات
            </button>

            {/* Glowing Active Pill Button matching "Edbar" in reference */}
            <button
              type="button"
              onClick={() => handleNavClick('laboratories')}
              className="ml-1 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF007A] to-[#A855F7] hover:from-[#E0067A] hover:to-[#9333EA] shadow-[0_0_20px_rgba(255,0,122,0.4)] transition-all cursor-pointer active:scale-95"
            >
              المعامل 3D
            </button>
          </nav>

          {/* Right Action Icons & Side Drawer Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              title="Search Catalog"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Ask AI Trigger */}
            <button
              type="button"
              onClick={handleOpenAi}
              title="Ask AI Medical Tutor"
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span className="hidden sm:inline">AI Tutor</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer relative"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF007A] text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute left-0 mt-3 w-72 rounded-2xl bg-[#0E081A] border border-white/15 shadow-2xl p-4 z-50 text-right" dir="rtl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-xs font-bold text-white">التنبيهات الأكاديمية</span>
                    {unreadCount > 0 && onMarkAllNotificationsRead && (
                      <button
                        type="button"
                        onClick={onMarkAllNotificationsRead}
                        className="text-[10px] text-purple-400 hover:underline cursor-pointer"
                      >
                        تحديد الكل كمقروء
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {safeNotifications.length === 0 ? (
                      <p className="text-xs text-slate-400 py-3 text-center">لا توجد إشعارات جديدة</p>
                    ) : (
                      safeNotifications.slice(0, 5).map(n => (
                        <div key={n.id} className="p-2 rounded-xl bg-white/5 text-xs text-slate-300">
                          <p className="font-bold text-white">{n.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Side Drawer Toggle Button (Hamburger Menu Icon in Circle) */}
            <button
              type="button"
              onClick={() => setIsSideDrawerOpen(true)}
              title="Open Navigation Drawer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SIDE NAVIGATION DRAWER (reproducing "الشاشة الجانبية" in reference)
          - Home, Anatomy, Histology, Biochemistry, Questions, Exams, Settings, Profile
      ========================================================================= */}
      {isSideDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" dir="rtl">
          {/* Backdrop Blur */}
          <div
            onClick={() => setIsSideDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs bg-[#0E081A] border-l border-white/15 h-full p-6 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 text-right">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5 flex items-center justify-center">
                    <div className="w-full h-full bg-[#0E081A] rounded-full flex items-center justify-center text-xs font-bold text-white">
                      LH
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">LAB HUB</h3>
                    <p className="text-[10px] text-purple-300">منصة التعلم الطبي الذكية</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSideDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Snapshot Card */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold">
                  {safeUser.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{safeUser.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{safeUser.email}</p>
                  <span className="inline-block text-[9px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.2 rounded mt-1 border border-cyan-500/30">
                    {safeUser.role === 'admin' ? 'Faculty Admin' : 'MBBS Student'}
                  </span>
                </div>
              </div>

              {/* Main Navigation Links List (matching reference side screen) */}
              <div className="space-y-1 text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-purple-400" />
                    <span>الرئيسية (Home)</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('laboratories')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span>المعامل الطبية (Laboratories 3D)</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('anatomy')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>معمل التشريح (Gray's Anatomy)</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('histology')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Microscope className="w-4 h-4 text-cyan-400" />
                    <span>معمل الأنسجة (Junqueira Histology)</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('biochemistry')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FlaskConical className="w-4 h-4 text-amber-400" />
                    <span>الكيمياء الحيوية (Biochemistry)</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('mcq_bank')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-purple-400" />
                    <span>بنك الأسئلة (Question Bank)</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('medical_exams')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>الامتحانات العملية (OSPE Exams)</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('schedule')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>الجدول الدراسي (Schedule)</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>

                {safeUser.role === 'admin' && (
                  <button
                    type="button"
                    onClick={() => handleNavClick('admin')}
                    className="w-full p-2.5 rounded-xl bg-amber-950/40 text-amber-300 border border-amber-500/30 flex items-center justify-between transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>لوحة تحكم العمادة (Admin)</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-amber-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    setIsSideDrawerOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>تسجيل الخروج</span>
                </button>
              )}

              <p className="text-[10px] text-center text-slate-500 font-mono">
                LAB HUB v3.0 • MBBS Medical Edition
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
