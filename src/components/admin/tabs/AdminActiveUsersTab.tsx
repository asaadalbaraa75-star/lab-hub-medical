import React, { useState, useEffect } from 'react';
import {
  Users,
  Activity,
  Search,
  RefreshCw,
  Clock,
  Eye,
  CheckCircle2,
  AlertCircle,
  Radio,
  BookOpen,
  Filter,
  ChevronRight
} from 'lucide-react';
import { User, UserActivityRecord } from '../../../types';
import { authService } from '../../../services/authService';

interface Props {
  currentUser: User;
  onSelectUserForLogs: (user: User) => void;
}

interface ActiveUserItem extends User {
  isActiveNow: boolean;
  isActiveToday: boolean;
  statusArabic: string;
  lastAction: string;
  lastActionSection: string;
  lastActionTimestamp: string;
}

export const AdminActiveUsersTab: React.FC<Props> = ({
  currentUser,
  onSelectUserForLogs
}) => {
  const [activeUsers, setActiveUsers] = useState<ActiveUserItem[]>([]);
  const [totalActiveNow, setTotalActiveNow] = useState(0);
  const [totalActiveToday, setTotalActiveToday] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active_now' | 'active_today'>('all');
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());

  const fetchActiveUsers = async () => {
    setIsLoading(true);
    try {
      const res = await authService.getActiveUsers(currentUser);
      setActiveUsers(res.activeUsers || []);
      setTotalActiveNow(res.totalActiveNow || 0);
      setTotalActiveToday(res.totalActiveToday || 0);
      setLastRefreshedAt(new Date());
    } catch (err) {
      console.error('Failed to fetch active users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveUsers();
    // Auto-poll every 30 seconds for live active user presence
    const interval = setInterval(fetchActiveUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = activeUsers.filter(u => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.studentId && u.studentId.toLowerCase().includes(q)) ||
      (u.lastAction && u.lastAction.toLowerCase().includes(q));

    let matchStatus = true;
    if (statusFilter === 'active_now') {
      matchStatus = u.isActiveNow;
    } else if (statusFilter === 'active_today') {
      matchStatus = u.isActiveToday;
    }

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              تتبع الاتصال اللحظي المباشر (Real-Time Live Presence)
            </span>
            <span className="text-xs text-slate-400">
              تحديث تلقائي كل 30 ثانية
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-600" />
            المستخدمون النشطون حالياً في المنصة (Currently Active Users)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            متابعة فورية للطلاب والأعضاء المتصلين بالمنصة الآن مع توضيح المعمل المفتوح وآخر نشاط تعليمي منجز
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="text-left text-xs font-mono text-slate-400">
            {lastRefreshedAt.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <button
            type="button"
            onClick={fetchActiveUsers}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-white text-slate-700 transition-all shadow-2xs group"
            title="تحديث قائمة المتصلين"
          >
            <RefreshCw className={`w-4 h-4 group-hover:rotate-180 transition-transform ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3 Status KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900">{totalActiveNow}</div>
            <div className="text-xs font-bold text-emerald-700">نشطون الآن (خلال 15 دقيقة)</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <Activity className="w-5 h-5" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900">{totalActiveToday}</div>
            <div className="text-xs font-bold text-blue-700">نشطون اليوم (خلال 24 ساعة)</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-slate-100 text-slate-600">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900">{activeUsers.length}</div>
            <div className="text-xs font-bold text-slate-500">إجمالي الحسابات المسجلة</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="البحث بالاسم، البريد الإلكتروني، أو النشاط المعملي..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-xs text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'all' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            الكل ({activeUsers.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('active_now')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === 'active_now' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            نشط الآن ({totalActiveNow})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('active_today')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'active_today' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            نشط اليوم ({totalActiveToday})
          </button>
        </div>
      </div>

      {/* Active Users Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-slate-700">
          <span>جدول المستخدمين وحالة الجلسة الحالية ({filteredUsers.length})</span>
          <span className="text-[11px] text-slate-400 font-normal">يتم تحديث آخر نشاط وموقع المعمل بصورة دائمة</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-[#E2E8F0]">
              <tr>
                <th className="px-4 py-3">المستخدم (User)</th>
                <th className="px-4 py-3">البريد الإلكتروني</th>
                <th className="px-4 py-3">الدور (Role)</th>
                <th className="px-4 py-3">آخر نشاط قام به (Last Action)</th>
                <th className="px-4 py-3">القسم (Section)</th>
                <th className="px-4 py-3">توقيت التفاعل</th>
                <th className="px-4 py-3 text-center">حالة الاتصال</th>
                <th className="px-4 py-3 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-400">
                    لا يوجد مستخدمون يطابقون خيارات التصفية الحالية.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                            alt={user.name}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                          />
                          <span className={`absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 border-white ${
                            user.isActiveNow ? 'bg-emerald-500 animate-pulse' : user.isActiveToday ? 'bg-blue-400' : 'bg-slate-300'
                          }`} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{user.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{user.studentId}</div>
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
                        {user.role === 'admin' ? '🛡️ مسؤول' : user.role === 'instructor' ? '👨‍🏫 تدريسي' : '🎓 طالب'}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 max-w-xs truncate text-slate-700 font-medium">
                      {user.lastAction || 'استعراض المنصة'}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[10px]">
                        {user.lastActionSection || 'العام'}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 font-mono">
                      {user.lastActionTimestamp ? new Date(user.lastActionTimestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : '—'}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        user.isActiveNow
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : user.isActiveToday
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.isActiveNow ? 'bg-emerald-500 animate-pulse' : user.isActiveToday ? 'bg-blue-500' : 'bg-slate-400'
                        }`} />
                        {user.statusArabic}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-center">
                      <button
                        type="button"
                        onClick={() => onSelectUserForLogs(user)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px] transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>سجل الطالب</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
