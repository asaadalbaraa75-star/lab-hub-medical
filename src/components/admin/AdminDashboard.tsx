/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Dedicated Admin & Platform Governance Dashboard
 * Full Multi-Page Interface: Users, Activity, Analytics, Content, Videos, and Security
 */

import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  Activity,
  TrendingUp,
  BookOpen,
  Video,
  Lock,
  RefreshCw,
  Home,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  User,
  UserActivityRecord,
  AdminAnalyticsMetrics,
  AdminAnalyticsBreakdown,
  AdminSubPage,
  LabSubjectId
} from '../../types';
import { authService } from '../../services/authService';
import { AdminOverviewTab } from './tabs/AdminOverviewTab';
import { AdminUsersTab } from './tabs/AdminUsersTab';
import { AdminActiveUsersTab } from './tabs/AdminActiveUsersTab';
import { AdminActivityTab } from './tabs/AdminActivityTab';
import { AdminAnalyticsTab } from './tabs/AdminAnalyticsTab';
import { AdminContentTab } from './tabs/AdminContentTab';
import { AdminVideosTab } from './tabs/AdminVideosTab';
import { AdminSecurityTab } from './tabs/AdminSecurityTab';
import { Radio } from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  initialSubPage?: AdminSubPage;
  onNavigateSubPage?: (page: AdminSubPage) => void;
  onSelectLab?: (labId: LabSubjectId) => void;
  onOpenPractical?: (labId: string, practicalId: string) => void;
  onReturnToStudent?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  initialSubPage = 'overview',
  onNavigateSubPage,
  onSelectLab,
  onOpenPractical,
  onReturnToStudent
}) => {
  const [activeSubPage, setActiveSubPage] = useState<AdminSubPage>(initialSubPage);
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<UserActivityRecord[]>([]);
  const [metrics, setMetrics] = useState<AdminAnalyticsMetrics>({
    totalUsers: 0,
    todaysLogins: 0,
    activeRecently: 0,
    newUsersThisWeek: 0
  });
  const [breakdown, setBreakdown] = useState<AdminAnalyticsBreakdown | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());
  const [selectedUserForLogs, setSelectedUserForLogs] = useState<User | null>(null);
  const [userSpecificLogs, setUserSpecificLogs] = useState<UserActivityRecord[]>([]);

  // Strict Authorization Check
  const isAdmin = currentUser.role === 'admin';

  // Read subpage from hash if present (e.g. #admin/users, #admin/activity)
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('admin/users')) setActiveSubPage('users');
      else if (hash.includes('admin/active_users') || hash.includes('admin/active-users')) setActiveSubPage('active_users');
      else if (hash.includes('admin/activity')) setActiveSubPage('activity');
      else if (hash.includes('admin/analytics')) setActiveSubPage('analytics');
      else if (hash.includes('admin/content')) setActiveSubPage('content');
      else if (hash.includes('admin/videos')) setActiveSubPage('videos');
      else if (hash.includes('admin/security')) setActiveSubPage('security');
      else if (hash === '#admin') setActiveSubPage('overview');
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const changeSubPage = (page: AdminSubPage) => {
    setActiveSubPage(page);
    window.location.hash = page === 'overview' ? '#admin' : `#admin/${page}`;
    if (onNavigateSubPage) {
      onNavigateSubPage(page);
    }
  };

  const loadData = async () => {
    if (!isAdmin) return;
    setIsLoading(true);
    try {
      const [fetchedUsers, fetchedActivities, fetchedMetrics, fetchedBreakdown] = await Promise.all([
        authService.getAllUsers(currentUser),
        authService.getAllActivities(currentUser),
        authService.getAdminMetrics(currentUser),
        authService.getAnalyticsBreakdown(currentUser)
      ]);

      setUsers(fetchedUsers);
      setActivities(fetchedActivities);
      setMetrics(fetchedMetrics);
      setBreakdown(fetchedBreakdown);
      setLastRefreshedAt(new Date());
    } catch (e) {
      console.error('Error loading admin dashboard data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [currentUser]);

  const handleSelectUserForLogs = async (user: User) => {
    setSelectedUserForLogs(user);
    const logs = await authService.getUserActivities(user.id, currentUser);
    setUserSpecificLogs(logs);
  };

  const handleCloseUserLogsModal = () => {
    setSelectedUserForLogs(null);
    setUserSpecificLogs([]);
  };

  const handleUpdateRole = async (userId: string, newRole: 'student' | 'admin') => {
    const res = await authService.updateUserRole(userId, newRole, currentUser);
    if (!res.success) {
      throw new Error(res.error || 'Failed to update user role.');
    }
    // Reload data to reflect change
    await loadData();
  };

  // If unauthorized student tries to access, block with 403 Forbidden screen
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl border border-rose-200 shadow-xl text-center space-y-5 animate-in fade-in">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900">403 — غير مصرح بالدخول (Access Denied)</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            لوحة الإدارة والحوكمة محصورة بعمادة كلية الطب والمسؤولين المعتمدين فقط. حسابك الحالي مسجل بدور طالب (<span className="font-mono text-indigo-600 font-bold">student</span>) ولا يملك الصلاحيات الإدارية المطلوبة.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 text-right space-y-1">
          <div className="font-bold text-slate-800">حماية الصلاحيات الصارمة (Role-Based Access Control):</div>
          <p className="text-[11px] text-slate-500">
            يتم التحقق من الصلاحيات وتوثيق التوكن على الخادم (Server-Side). لا يمكن للطلاب تصعيد صلاحياتهم من المتصفح.
          </p>
        </div>

        {onReturnToStudent && (
          <button
            type="button"
            onClick={onReturnToStudent}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى المعامل والمحتوى الطلابي</span>
          </button>
        )}
      </div>
    );
  }

  // Navigation Tabs Configuration (Fully in Professional Administrative Arabic)
  const navTabs: { id: AdminSubPage; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'الرئيسية والإحصائيات', icon: <Home className="w-4 h-4" /> },
    { id: 'users', label: 'إدارة الطلاب والمستخدمين', icon: <Users className="w-4 h-4" />, badge: users.length },
    { id: 'active_users', label: 'النشطون حالياً', icon: <Radio className="w-4 h-4 text-emerald-500" /> },
    { id: 'activity', label: 'سجل الدخول والأنشطة', icon: <Activity className="w-4 h-4" />, badge: activities.length },
    { id: 'analytics', label: 'التحليلات المتقدمة', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'content', label: 'إدارة المحتوى المعملي', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'videos', label: 'إدارة الفيديوهات', icon: <Video className="w-4 h-4" /> },
    { id: 'security', label: 'الأمان والامتيازات', icon: <Lock className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header Banner */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xs p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-black uppercase tracking-wider">
              Faculty Administration Workspace
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Server Sync
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            LAB HUB <span className="text-indigo-600 font-extrabold text-xl sm:text-2xl block sm:inline sm:mr-2">Admin Dashboard</span>
          </h1>

          <p className="text-xs text-slate-500">
            لوحة الإدارة والتحكم الشاملة بكلية الطب — إدارة الحسابات، متابعة سجل النشاط الطلابي، وإدارة المحتوى والتحليلات
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <div className="text-left">
            <div className="text-[10px] text-slate-400 font-bold">آخر تحديث</div>
            <div className="text-xs font-mono font-bold text-slate-700">
              {lastRefreshedAt.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
          </div>

          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-white text-slate-700 transition-all shadow-2xs group"
            title="تحديث البيانات من الخادم"
          >
            <RefreshCw className={`w-4 h-4 group-hover:rotate-180 transition-transform ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Sub-Page Navigation Tabs Strip */}
      <div className="bg-white p-2 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center gap-1 overflow-x-auto">
        {navTabs.map(tab => {
          const isActive = activeSubPage === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => changeSubPage(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Sub-Page Render */}
      <div>
        {activeSubPage === 'overview' && (
          <AdminOverviewTab
            metrics={metrics}
            users={users}
            activities={activities}
            onSelectSubPage={changeSubPage}
            onSelectUserForLogs={handleSelectUserForLogs}
          />
        )}

        {activeSubPage === 'users' && (
          <AdminUsersTab
            users={users}
            currentUser={currentUser}
            onSelectUserForLogs={handleSelectUserForLogs}
            onUpdateRole={handleUpdateRole}
          />
        )}

        {activeSubPage === 'active_users' && (
          <AdminActiveUsersTab
            currentUser={currentUser}
            onSelectUserForLogs={handleSelectUserForLogs}
          />
        )}

        {activeSubPage === 'activity' && (
          <AdminActivityTab
            users={users}
            activities={activities}
            selectedUserForLogs={selectedUserForLogs}
            userSpecificLogs={userSpecificLogs}
            onSelectUserForLogs={handleSelectUserForLogs}
            onCloseUserLogsModal={handleCloseUserLogsModal}
          />
        )}

        {activeSubPage === 'analytics' && (
          <AdminAnalyticsTab
            metrics={metrics}
            breakdown={breakdown}
          />
        )}

        {activeSubPage === 'content' && (
          <AdminContentTab
            currentUser={currentUser}
            onSelectLab={onSelectLab}
            onOpenPractical={onOpenPractical}
          />
        )}

        {activeSubPage === 'videos' && (
          <AdminVideosTab
            currentUser={currentUser}
          />
        )}

        {activeSubPage === 'security' && (
          <AdminSecurityTab
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
};
