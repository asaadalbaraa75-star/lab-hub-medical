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
  Share2
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
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const safeUser = currentUser || {
    id: 'usr_sarah',
    name: 'Sarah Al-Mansoor',
    role: 'student',
    email: 'sarah.mansoor@med.edu',
    studentId: 'MBBS-2024-8842',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  };

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const unreadCount = safeNotifications.filter(n => !n.isRead).length;

  const handleOpenAi = () => {
    if (onOpenAskAI) onOpenAskAI();
    else if (onOpenAiTutor) onOpenAiTutor();
  };

  const roleBadges = {
    student: { label: 'Student Portal', color: 'text-indigo-700 bg-indigo-50 border-indigo-200', icon: GraduationCap },
    instructor: { label: 'Instructor Portal', color: 'text-teal-700 bg-teal-50 border-teal-200', icon: Sliders },
    admin: { label: 'Faculty Directorate', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: Shield }
  };

  const currentRoleBadge = roleBadges[safeUser.role] || roleBadges.student;
  const RoleIcon = currentRoleBadge.icon;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
      {/* Global Search Bar (Trigger) */}
      <div className="flex-1 max-w-2xl">
        <button
          id="global-search-trigger"
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between bg-[#F1F5F9] hover:bg-[#E2E8F0]/70 border border-[#E2E8F0] text-slate-500 rounded-xl px-4 py-2 text-sm transition-all shadow-xs group"
        >
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            <span className="text-left font-normal truncate text-slate-500">
              Search bacteria, slides, structures, practicals, equipment...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white border border-[#E2E8F0] px-2 py-0.5 rounded shadow-xs">
            <span>⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Ask LAB HUB AI Tutor Button */}
        <button
          id="nav-ask-ai-btn"
          type="button"
          onClick={handleOpenAi}
          className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all shadow-xs group"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 group-hover:rotate-12 transition-transform" />
          <span className="hidden md:inline">Ask LAB HUB</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-indigo-600 text-white font-mono font-bold">
            AI
          </span>
        </button>

        {/* Share Platform Link Button */}
        {onOpenShareModal && (
          <button
            id="nav-share-portal-btn"
            type="button"
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-indigo-600 border border-[#E2E8F0] rounded-xl px-3 py-1.5 text-xs font-semibold transition-all shadow-xs"
            title="رابط المنصة للطلاب | Share Student Link"
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">رابط المنصة</span>
          </button>
        )}

        {/* Role Quick Switcher / Indicator */}
        <div className="hidden lg:flex items-center gap-1.5">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${currentRoleBadge.color}`}>
            <RoleIcon className="w-3.5 h-3.5" />
            <span>{currentRoleBadge.label}</span>
          </div>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            id="nav-notifications-btn"
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] px-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (onMarkAllNotificationsRead) onMarkAllNotificationsRead();
                    }}
                    className="text-xs text-indigo-600 font-semibold hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-[#F1F5F9] max-h-72 overflow-y-auto mt-2">
                {safeNotifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No notifications at this time.
                  </div>
                ) : (
                  safeNotifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        if (onMarkNotificationRead) onMarkNotificationRead(notif.id);
                        if (notif.linkTarget && onSelectTab) {
                          onSelectTab(
                            notif.linkTarget.tab,
                            notif.linkTarget.labId,
                            notif.linkTarget.practicalId
                          );
                          setShowNotifications(false);
                        }
                      }}
                      className={`p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors ${
                        !notif.isRead ? 'bg-indigo-50/50 border-l-2 border-indigo-600' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900 leading-snug">
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            id="nav-user-profile-btn"
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-[#E2E8F0] text-slate-800 transition-colors shadow-xs"
          >
            <img
              src={safeUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={safeUser.name}
              className="w-7 h-7 rounded-lg object-cover border border-[#E2E8F0]"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[110px]">
                {safeUser.name}
              </span>
              <span className="text-[10px] text-slate-400 capitalize">
                {safeUser.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-800">
              <div className="px-2.5 py-2 border-b border-[#E2E8F0]">
                <p className="text-xs font-bold text-slate-900">{safeUser.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{safeUser.email}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-[#E2E8F0] font-mono">
                  {safeUser.studentId}
                </span>
              </div>

              <div className="pt-1.5 space-y-0.5">
                {safeUser.role === 'admin' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectTab) onSelectTab('admin_dashboard');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    <span>لوحة الإدارة والحوكمة (Admin)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectTab) onSelectTab('profile');
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>ملفي الشخصي والمعامل المسجلة</span>
                </button>

                {onLogout && (
                  <button
                    type="button"
                    id="navbar-logout-btn"
                    onClick={() => {
                      onLogout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600" />
                    <span>تسجيل الخروج (Sign Out)</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
