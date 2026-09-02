/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Dedicated Admin & Platform Governance Dashboard
 * Comprehensive User Management, Live Activity Logs & Platform Analytics
 */

import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  Activity,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  UserCheck,
  UserX,
  RefreshCw,
  Eye,
  ChevronRight,
  FileText,
  Lock
} from 'lucide-react';
import { User, UserActivityRecord, AdminAnalyticsMetrics } from '../../types';
import { authService } from '../../services/authService';

interface AdminDashboardProps {
  currentUser: User;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'activity' | 'analytics'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<UserActivityRecord[]>([]);
  const [metrics, setMetrics] = useState<AdminAnalyticsMetrics>({
    totalUsers: 0,
    todaysLogins: 0,
    activeRecently: 0,
    newUsersThisWeek: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'instructor' | 'admin'>('all');
  const [selectedUserForLogs, setSelectedUserForLogs] = useState<User | null>(null);
  const [userSpecificLogs, setUserSpecificLogs] = useState<UserActivityRecord[]>([]);

  // Access Control Check
  const isAdmin = currentUser.role === 'admin';

  const loadData = async () => {
    if (!isAdmin) return;
    setIsLoading(true);
    try {
      const [fetchedUsers, fetchedMetrics] = await Promise.all([
        authService.getAllUsers(currentUser),
        authService.getAdminMetrics(currentUser)
      ]);
      setUsers(fetchedUsers);
      setMetrics(fetchedMetrics);

      // Load recent activities for all users
      try {
        const stored = localStorage.getItem('labhub_user_activities');
        if (stored) {
          const acts: UserActivityRecord[] = JSON.parse(stored);
          setActivities(acts);
        }
      } catch {}
    } catch (e) {
      console.error('Error loading admin data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [currentUser]);

  // Load specific user logs when clicked
  const handleSelectUser = async (user: User) => {
    setSelectedUserForLogs(user);
    const logs = await authService.getUserActivities(user.id, currentUser);
    setUserSpecificLogs(logs);
  };

  // If unauthorized, block strictly
  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          تم حظر الوصول: صلاحيات العمادة والإدارة مطلوبة
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
          عذراً، هذا القسم مخصص لعميد الكلية ومديري النظام الأكاديمي لمتابعة سجلات الطلاب والإحصائيات العامة. الطلاب والأساتذة يمكنهم فقط الوصول للأقسام المصرح لهم بها.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-xs text-slate-700 font-mono">
          <span>Current Role:</span>
          <strong className="uppercase">{currentUser.role}</strong>
        </div>
      </div>
    );
  }

  // Filter users
  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.studentId && u.studentId.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'لم يسجل بعد';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const isUserActive = (lastActivity?: string) => {
    if (!lastActivity) return false;
    const diff = Date.now() - new Date(lastActivity).getTime();
    return diff <= 24 * 60 * 60 * 1000; // active in last 24h
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Role Badge */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة الإدارة والحوكمة الأكاديمية (Dean & Admin Portal)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              إدارة المستخدمين وسجلات الطلاب
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              متابعة جميع حسابات طلاب الطب المسجلين، التدقيق في النشاط اللحظي، فحص نسب الحضور في المعامل والامتحانات.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>تحديث البيانات</span>
            </button>
          </div>
        </div>
      </div>

      {/* METRIC CARDS (Platform Analytics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Registered Users */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              إجمالي المسجلين
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {metrics.totalUsers}
            </span>
            <span className="text-xs text-slate-400 font-medium">مستخدم معتمد</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            طلاب وأعضاء هيئة التدريس في المنصة
          </p>
        </div>

        {/* Total Logins Today */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              تسجيلات اليوم
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 font-mono">
              {metrics.todaysLogins}
            </span>
            <span className="text-xs text-slate-400 font-medium">جلسة اليوم</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            نشاط الدخول خلال الـ 24 ساعة الماضية
          </p>
        </div>

        {/* Active Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              الطلاب النشطون
            </span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-sky-600 font-mono">
              {metrics.activeRecently}
            </span>
            <span className="text-xs text-slate-400 font-medium">نشط حالياً / مؤخراً</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            تفاعلوا مع الدروس أو الاختبارات
          </p>
        </div>

        {/* New This Week */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              حسابات جديدة
            </span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-purple-600 font-mono">
              {metrics.newUsersThisWeek}
            </span>
            <span className="text-xs text-slate-400 font-medium">هذا الأسبوع</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            انضموا حديثاً لمنصة LAB HUB
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('users')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'users'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>إدارة المستخدمين ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('activity')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'activity'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>سجل الأنشطة اللحظي (Activity Feed)</span>
        </button>
      </div>

      {/* TAB A: USER MANAGEMENT TABLE */}
      {activeSubTab === 'users' && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="بحث بالاسم، البريد أو الرقم الجامعي..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">الرتبة:</span>
              <div className="flex rounded-xl bg-slate-100 p-1 text-xs">
                {(['all', 'student', 'instructor', 'admin'] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all capitalize ${
                      roleFilter === role
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {role === 'all' ? 'الكل' : role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">المستخدم (Name & ID)</th>
                    <th className="py-3.5 px-4">البريد الإلكتروني</th>
                    <th className="py-3.5 px-4">الرتبة (Role)</th>
                    <th className="py-3.5 px-4">تاريخ التسجيل</th>
                    <th className="py-3.5 px-4">آخر دخول</th>
                    <th className="py-3.5 px-4">آخر نشاط</th>
                    <th className="py-3.5 px-4">الحالة</th>
                    <th className="py-3.5 px-4 text-center">السجلات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        لا يوجد مستخدمون مطابقون لمعايير البحث
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(user => {
                      const active = isUserActive(user.lastActivityAt);
                      return (
                        <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                                alt={user.name}
                                className="w-8 h-8 rounded-full object-cover border border-slate-200"
                              />
                              <div>
                                <div className="font-bold text-slate-900">{user.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  {user.studentId || user.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">{user.email}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                user.role === 'admin'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : user.role === 'instructor'
                                  ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                  : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 font-mono">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 font-mono">
                            {formatDate(user.lastLoginAt)}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 font-mono">
                            {formatDate(user.lastActivityAt)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                active
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                                }`}
                              />
                              <span>{active ? 'نشط (Active)' : 'خامل (Inactive)'}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleSelectUser(user)}
                              className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                            >
                              سجل النشاط
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: LIVE ACTIVITY LOGS STREAM */}
      {activeSubTab === 'activity' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">سجل الأنشطة الحية اللحظية (Live Feed)</h3>
              <p className="text-xs text-slate-500">
                تسجيل كافة تفاعلات الطلاب مع المنصة: تسجيل الدخول، فتح المعامل، حل الاختبارات، ومحادثة المساعد الذكي
              </p>
            </div>
            <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold">
              {activities.length} عملية مسجلة
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {activities.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                لا توجد أنشطة مسجلة حتى الآن. ستظهر هنا فور تفاعل الطلاب.
              </div>
            ) : (
              activities.map(act => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-indigo-50/40 rounded-xl border border-slate-100 transition-colors text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{act.userName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({act.userEmail})</span>
                      </div>
                      <div className="text-slate-600 mt-0.5">{act.activity}</div>
                    </div>
                  </div>

                  <div className="text-left shrink-0">
                    <span className="px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 text-[10px] font-bold block mb-1">
                      {act.section}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formatDate(act.timestamp)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* USER-SPECIFIC ACTIVITY MODAL */}
      {selectedUserForLogs && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUserForLogs.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={selectedUserForLogs.name}
                  className="w-10 h-10 rounded-full border border-indigo-100 object-cover"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedUserForLogs.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{selectedUserForLogs.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUserForLogs(null)}
                className="text-slate-400 hover:text-slate-600 text-sm p-2"
              >
                ✕
              </button>
            </div>

            <div className="py-4 border-b border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50">
                <div className="text-slate-400 text-[10px]">الرتبة الأكاديمية</div>
                <div className="font-bold text-indigo-700 uppercase mt-0.5">{selectedUserForLogs.role}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <div className="text-slate-400 text-[10px]">الرقم الجامعي</div>
                <div className="font-bold text-slate-800 font-mono mt-0.5">{selectedUserForLogs.studentId || '—'}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <div className="text-slate-400 text-[10px]">عدد الجلسات</div>
                <div className="font-bold text-emerald-700 font-mono mt-0.5">{selectedUserForLogs.sessionCount || 1}</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-2 pr-1">
              <h4 className="text-xs font-bold text-slate-700 mb-2">سجل نشاط هذا الطالب:</h4>
              {userSpecificLogs.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">
                  لا توجد أنشطة مسجلة لهذا الحساب حالياً
                </p>
              ) : (
                userSpecificLogs.map(log => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800">{log.activity}</div>
                      <div className="text-[11px] text-slate-500">{log.section}</div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formatDate(log.timestamp)}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                type="button"
                onClick={() => setSelectedUserForLogs(null)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
