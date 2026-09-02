import React from 'react';
import {
  Users,
  Activity,
  Calendar,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Video,
  ChevronRight
} from 'lucide-react';
import { User, UserActivityRecord, AdminAnalyticsMetrics, AdminSubPage } from '../../../types';

interface Props {
  metrics: AdminAnalyticsMetrics;
  users: User[];
  activities: UserActivityRecord[];
  onSelectSubPage: (page: AdminSubPage) => void;
  onSelectUserForLogs: (user: User) => void;
}

export const AdminOverviewTab: React.FC<Props> = ({
  metrics,
  users,
  activities,
  onSelectSubPage,
  onSelectUserForLogs,
}) => {
  const recentUsers = users.slice(0, 6);
  const recentActivities = activities.slice(0, 5);

  const studentCount = users.filter(u => u.role === 'student').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 4 Primary Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div 
          onClick={() => onSelectSubPage('users')}
          className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">إجمالي المستخدمين</span>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{metrics.totalUsers}</div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>{studentCount} طالب | {adminCount} إدارة</span>
            <span className="text-indigo-600 font-semibold flex items-center gap-0.5">
              عرض <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Active Users */}
        <div 
          onClick={() => onSelectSubPage('activity')}
          className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">النشطون حالياً</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{metrics.activeRecently}</div>
          <div className="mt-2 flex items-center justify-between text-xs text-emerald-600">
            <span className="flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              تفاعل خلال 24 ساعة
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Today's Logins */}
        <div 
          onClick={() => onSelectSubPage('analytics')}
          className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">تسجيلات الدخول اليوم</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{metrics.todaysLogins}</div>
          <div className="mt-2 flex items-center justify-between text-xs text-amber-700">
            <span>جلسات اليوم</span>
            <span className="font-semibold flex items-center gap-0.5">
              تحليل <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* New Users This Week */}
        <div 
          onClick={() => onSelectSubPage('users')}
          className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">مستخدمون جدد هذا الأسبوع</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{metrics.newUsersThisWeek}</div>
          <div className="mt-2 flex items-center justify-between text-xs text-purple-700">
            <span>تسجيلات الأسبوع الحالي</span>
            <span className="font-semibold flex items-center gap-0.5">
              إدارة <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => onSelectSubPage('users')}
          className="p-3.5 bg-white border border-[#E2E8F0] hover:border-indigo-500 rounded-xl flex items-center gap-3 transition-all text-right shadow-2xs group"
        >
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Users className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800">إدارة المستخدمين</div>
            <div className="text-[10px] text-slate-500 truncate">تعديل الأدوار والحسابات</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubPage('activity')}
          className="p-3.5 bg-white border border-[#E2E8F0] hover:border-teal-500 rounded-xl flex items-center gap-3 transition-all text-right shadow-2xs group"
        >
          <div className="p-2 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <Activity className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800">سجل الأنشطة</div>
            <div className="text-[10px] text-slate-500 truncate">تتبع نشاط الطلاب العملي</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubPage('content')}
          className="p-3.5 bg-white border border-[#E2E8F0] hover:border-amber-500 rounded-xl flex items-center gap-3 transition-all text-right shadow-2xs group"
        >
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800">إدارة المحتوى</div>
            <div className="text-[10px] text-slate-500 truncate">المعامل والمواد الأربعة</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubPage('videos')}
          className="p-3.5 bg-white border border-[#E2E8F0] hover:border-rose-500 rounded-xl flex items-center gap-3 transition-all text-right shadow-2xs group"
        >
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
            <Video className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800">إدارة الفيديوهات</div>
            <div className="text-[10px] text-slate-500 truncate">المحاضرات الطبية المركزة</div>
          </div>
        </button>
      </div>

      {/* Main Table: Recent User Activity */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              قائمة المستخدمين المسجلين ونشاطهم الأخير (Registered Users Roster)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              متابعة حسابات الطلاب والأعضاء ومواعيد تسجيل الدخول وإجمالي الجلسات
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectSubPage('users')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-center"
          >
            عرض جميع المستخدمين ({users.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-[#E2E8F0]">
              <tr>
                <th className="px-4 py-3">المستخدم (User)</th>
                <th className="px-4 py-3">البريد الإلكتروني</th>
                <th className="px-4 py-3">الدور (Role)</th>
                <th className="px-4 py-3">آخر تسجيل دخول</th>
                <th className="px-4 py-3">آخر نشاط</th>
                <th className="px-4 py-3 text-center">الجلسات</th>
                <th className="px-4 py-3 text-center">الحالة</th>
                <th className="px-4 py-3 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {recentUsers.map(user => {
                const isOnline = user.lastActivityAt && (Date.now() - new Date(user.lastActivityAt).getTime() < 24 * 3600000);
                return (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={user.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{user.name}</div>
                          <div className="text-[10px] text-slate-400">{user.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap font-mono text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        user.role === 'admin'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : user.role === 'instructor'
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        {user.role === 'admin' ? '🛡️ مسؤول (Admin)' : user.role === 'instructor' ? '👨‍🏫 تدريسي' : '🎓 طالب (Student)'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                      {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }) : 'لم يسجل'}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                      {user.lastActivityAt ? new Date(user.lastActivityAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : '—'}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-center font-bold text-slate-700">
                      {user.sessionCount || 1}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {isOnline ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-center">
                      <button
                        type="button"
                        onClick={() => onSelectUserForLogs(user)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px] transition-colors"
                      >
                        سجل النشاط
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Platform Feed Stream */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>آخر أحداث المنصة التفاعلية المباشرة (Live Stream)</span>
          </div>
          <button
            type="button"
            onClick={() => onSelectSubPage('activity')}
            className="text-xs text-indigo-600 hover:underline font-bold"
          >
            عرض سجل الأنشطة الكامل →
          </button>
        </div>

        <div className="space-y-2">
          {recentActivities.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">لا توجد أنشطة مسجلة حتى الآن.</p>
          ) : (
            recentActivities.map(act => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <div>
                    <span className="font-bold text-slate-900">{act.userName}</span>
                    <span className="text-slate-500 mx-2">—</span>
                    <span className="text-slate-700">{act.activity}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold">{act.section}</span>
                  <span>{new Date(act.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
