import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  Eye,
  Calendar,
  Clock,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { User } from '../../../types';

interface Props {
  users: User[];
  currentUser: User;
  onSelectUserForLogs: (user: User) => void;
  onUpdateRole: (userId: string, newRole: 'student' | 'admin') => Promise<void>;
}

export const AdminUsersTab: React.FC<Props> = ({
  users,
  currentUser,
  onSelectUserForLogs,
  onUpdateRole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'admin'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'recently_active'>('all');
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);
  const [roleChangeModalUser, setRoleChangeModalUser] = useState<User | null>(null);
  const [selectedRoleToApply, setSelectedRoleToApply] = useState<'student' | 'admin'>('student');
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Search & Filter computation
  const filteredUsers = users.filter(user => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      (user.studentId && user.studentId.toLowerCase().includes(q)) ||
      (user.department && user.department.toLowerCase().includes(q));

    const matchesRole =
      roleFilter === 'all' ? true : user.role === roleFilter;

    let matchesStatus = true;
    const lastActiveTime = user.lastActivityAt ? new Date(user.lastActivityAt).getTime() : 0;
    const now = Date.now();
    if (statusFilter === 'active') {
      // Active in last 24h
      matchesStatus = now - lastActiveTime < 24 * 3600000;
    } else if (statusFilter === 'recently_active') {
      // Active in last 7 days
      matchesStatus = now - lastActiveTime < 7 * 24 * 3600000;
    }

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleOpenRoleModal = (user: User) => {
    setRoleChangeModalUser(user);
    setSelectedRoleToApply(user.role === 'admin' ? 'student' : 'admin');
    setActionMessage(null);
  };

  const handleConfirmRoleChange = async () => {
    if (!roleChangeModalUser) return;
    setIsUpdatingId(roleChangeModalUser.id);
    try {
      await onUpdateRole(roleChangeModalUser.id, selectedRoleToApply);
      setActionMessage({
        type: 'success',
        text: `تم تحديث دور المستخدم ${roleChangeModalUser.name} بنجاح إلى (${selectedRoleToApply === 'admin' ? 'Admin' : 'Student'}).`
      });
      setRoleChangeModalUser(null);
    } catch (err: any) {
      setActionMessage({
        type: 'error',
        text: err.message || 'فشل تحديث الدور.'
      });
    } finally {
      setIsUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Action Notification Toast */}
      {actionMessage && (
        <div className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm ${
          actionMessage.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {actionMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionMessage(null)}
            className="text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* Control Bar: Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="البحث بالاسم، البريد الإلكتروني، أو الرقم الجامعي (Search by Name, Email, Student ID)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-xs text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                roleFilter === 'all' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              الكل ({users.length})
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter('student')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                roleFilter === 'student' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              الطلاب ({users.filter(u => u.role === 'student').length})
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter('admin')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                roleFilter === 'admin' ? 'bg-white text-purple-600 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              المسؤولون ({users.filter(u => u.role === 'admin').length})
            </button>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            <option value="all">كل الحالات (All Status)</option>
            <option value="active">نشط خلال 24 ساعة (Active Today)</option>
            <option value="recently_active">نشط هذا الأسبوع (Active This Week)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-[#E2E8F0]">
              <tr>
                <th className="px-4 py-3.5">الاسم الكامل (Full Name)</th>
                <th className="px-4 py-3.5">البريد الإلكتروني (Email)</th>
                <th className="px-4 py-3.5 text-center">الدور (Role)</th>
                <th className="px-4 py-3.5">تاريخ التسجيل (Registered)</th>
                <th className="px-4 py-3.5">آخر تسجيل دخول</th>
                <th className="px-4 py-3.5">آخر نشاط</th>
                <th className="px-4 py-3.5 text-center">الجلسات</th>
                <th className="px-4 py-3.5 text-center">الحالة</th>
                <th className="px-4 py-3.5 text-center">الإجراءات (Admin Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-slate-400">
                    لا يوجد مستخدمون يطابقون خيارات البحث أو التصفية الحالية.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => {
                  const isOnline = user.lastActivityAt && (Date.now() - new Date(user.lastActivityAt).getTime() < 24 * 3600000);
                  const isPrimaryAdmin = user.id === 'usr_admin_1';

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                            alt={user.name}
                            className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{user.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{user.studentId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          user.role === 'admin'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : user.role === 'instructor'
                            ? 'bg-teal-50 text-teal-700 border border-teal-200'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {user.role === 'admin' ? '🛡️ Admin' : user.role === 'instructor' ? '👨‍🏫 Instructor' : '🎓 Student'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ar-EG', { dateStyle: 'medium' }) : '—'}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }) : 'لم يسجل'}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                        {user.lastActivityAt ? new Date(user.lastActivityAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : '—'}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center font-bold text-slate-800">
                        {user.sessionCount || 1}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          isOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          {isOnline ? 'Active' : 'Offline'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Role Change Action */}
                          {isPrimaryAdmin ? (
                            <span className="text-[10px] text-slate-400 px-2 py-1 bg-slate-100 rounded font-semibold">
                              العميد الرئيسي
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleOpenRoleModal(user)}
                              disabled={isUpdatingId === user.id}
                              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border transition-colors ${
                                user.role === 'admin'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                  : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                              }`}
                            >
                              {user.role === 'admin' ? 'تحويل لطالب' : 'ترقية لمسؤول'}
                            </button>
                          )}

                          {/* Inspect Activity Logs */}
                          <button
                            type="button"
                            onClick={() => onSelectUserForLogs(user)}
                            className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                            title="عرض سجل نشاط الطالب المفصل"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Change Confirmation Modal */}
      {roleChangeModalUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-indigo-600" />
                تعديل الصلاحيات والدور (Role Permissions)
              </h3>
              <button
                type="button"
                onClick={() => setRoleChangeModalUser(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                أنت على وشك تغيير دور المستخدم التالي في نظام كلية الطب:
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 text-sm">{roleChangeModalUser.name}</div>
                <div className="font-mono text-slate-500">{roleChangeModalUser.email}</div>
                <div className="text-[11px] text-slate-500">الدور الحالي: <span className="font-bold text-indigo-600">{roleChangeModalUser.role}</span></div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">اختر الدور الجديد:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRoleToApply('student')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedRoleToApply === 'student'
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🎓 طالب (Student)
                    <div className="text-[10px] font-normal text-slate-500 mt-0.5">صلاحيات تعليمية وتطبيقية</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRoleToApply('admin')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedRoleToApply === 'admin'
                        ? 'bg-purple-50 border-purple-600 text-purple-900 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🛡️ مسؤول (Admin)
                    <div className="text-[10px] font-normal text-slate-500 mt-0.5">لوحة الإدارة الكاملة</div>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
                ⚠️ يتم التحقق من الصلاحيات والتوثيق على الخادم (Server-Side Authorization). الطلاب لا يمكنهم منح أنفسهم صلاحية الإدارة أبداً.
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleConfirmRoleChange}
                disabled={isUpdatingId !== null}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
              >
                {isUpdatingId ? 'جاري التحديث...' : 'تأكيد وحفظ الصلاحيات'}
              </button>
              <button
                type="button"
                onClick={() => setRoleChangeModalUser(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
