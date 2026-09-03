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
  ChevronRight,
  LogOut,
  Radio,
  BarChart3
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
      {/* 6 Primary Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* Total Users */}
        <div 
          onClick={() => onSelectSubPage('users')}
          className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500">إجمالي الطلاب</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{studentCount}</div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>من أصل {metrics.totalUsers} حساب</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-indigo-600" />
          </div>
        </div>

        {/* Active Users Now */}
        <div 
          onClick={() => onSelectSubPage('active_users')}
          className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500">النشطون الآن</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            {metrics.activeNow || 1}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-emerald-600">
            <span>متصلون بالمنصة</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Today's Logins */}
        <div 
          onClick={() => onSelectSubPage('activity')}
          className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500">دخول اليوم</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.todaysLogins}</div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-amber-700">
            <span>جلسات الدخول</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Today's Logouts */}
        <div 
          onClick={() => onSelectSubPage('activity')}
          className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-rose-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500">خروج اليوم</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-110 transition-transform">
              <LogOut className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.todaysLogouts || 0}</div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-rose-700">
            <span>جلسات منتهية</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* New Users This Week */}
        <div 
          onClick={() => onSelectSubPage('users')}
          className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500">جدد هذا الأسبوع</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.newUsersThisWeek}</div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-purple-700">
            <span>تسجيلات حديثة</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Total Activities */}
        <div 
          onClick={() => onSelectSubPage('activity')}
          className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500">إجمالي الأنشطة</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600 group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.totalActivities || activities.length}</div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-teal-700">
            <span>سجلات موثقة</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          type="button"
          onClick={() => onSelectSubPage('users')}
          className="p-3 bg-white border border-[#E2E8F0] hover:border-indigo-500 rounded-xl flex items-center gap-2.5 transition-all text-right shadow-2xs group"
        >
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Users className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800">إدارة المستخدمين</div>
            <div className="text-[10px] text-slate-500 truncate">تعديل الأدوار</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubPage('active_users')}
          className="p-3 bg-white border border-[#E2E8F0] hover:border-emerald-500 rounded-xl flex items-center gap-2.5 transition-all text-right shadow-2xs group"
        >
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Radio className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800">النشطون حالياً</div>
            <div className="text-[10px] text-slate-500 truncate">تتبع فوري مباشر</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubPage('activity')}
          className="p-3 bg-white border border-[#E2E8F0] hover:border-teal-500 rounded-xl flex items-center gap-2.5 transition-all text-right shadow-2xs group"
        >
          <div className="p-2 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <Activity className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800">سجل الأنشطة</div>
            <div className="text-[10px] text-slate-500 truncate">سجل الدخول والخروج</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubPage('analytics')}
          className="p-3 bg-white border border-[#E2E8F0] hover:border-blue-500 rounded-xl flex items-center gap-2.5 transition-all text-right shadow-2xs group"
        >
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800">التحليلات</div>
            <div className="text-[10px] text-slate-500 truncate">تقارير التفاعل</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubPage('content')}
          className="p-3 bg-white border border-[#E2E8F0] hover:border-amber-500 rounded-xl flex items-center gap-2.5 transition-all text-right shadow-2xs group"
        >
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800">إدارة المحتوى</div>
            <div className="text-[10px] text-slate-500 truncate">المعامل الأربعة</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubPage('videos')}
          className="p-3 bg-white border border-[#E2E8F0] hover:border-rose-500 rounded-xl flex items-center gap-2.5 transition-all text-right shadow-2xs group"
        >
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
            <Video className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800">فيديوهات المعامل</div>
            <div className="text-[10px] text-slate-500 truncate">الشروحات المرئية</div>
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
