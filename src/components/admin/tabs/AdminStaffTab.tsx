/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * Admin Staff Management (Exclusive to OWNER)
 */

import React, { useState, useEffect } from 'react';
import {
  Users,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Award,
  Trash2,
  Edit2,
  RefreshCw,
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  UserCheck,
  UserX,
  Lock
} from 'lucide-react';
import { User, UserRole } from '../../../types';
import { authService } from '../../../services/authService';

interface Props {
  currentUser: User;
}

export const AdminStaffTab: React.FC<Props> = ({ currentUser }) => {
  const [staffList, setStaffList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStaffForRole, setSelectedStaffForRole] = useState<User | null>(null);
  const [newRoleToAssign, setNewRoleToAssign] = useState<'content_exams' | 'exams_only'>('content_exams');
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<User | null>(null);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isOwner = currentUser.role === 'owner' || currentUser.role === 'admin';

  const loadStaff = async () => {
    setIsLoading(true);
    try {
      const data = await authService.getStaffMembers(currentUser);
      setStaffList(data);
    } catch (err: any) {
      console.error('Error loading staff:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOwner) {
      loadStaff();
    }
  }, [currentUser]);

  if (!isOwner) {
    return (
      <div className="p-8 bg-white rounded-3xl border border-rose-200 text-center space-y-3" dir="rtl">
        <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="text-base font-black text-slate-800">صلاحية محصورة بمالكة المنصة (OWNER ONLY)</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          إدارة أعضاء الفريق الإداري متاحة حصرياً لمالكة المنصة.
        </p>
      </div>
    );
  }

  const handleUpdateRole = async () => {
    if (!selectedStaffForRole) return;
    try {
      await authService.updateStaffRole(selectedStaffForRole.id, newRoleToAssign, currentUser);
      setActionFeedback({
        type: 'success',
        text: `تم تحديث دور المسؤول ${selectedStaffForRole.name} بنجاح إلى (${newRoleToAssign === 'content_exams' ? 'CONTENT + EXAMS' : 'EXAMS ONLY'}).`
      });
      setSelectedStaffForRole(null);
      loadStaff();
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        text: err.message || 'فشل تحديث الدور.'
      });
    }
  };

  const handleDeleteStaff = async () => {
    if (!deleteConfirmUser) return;
    try {
      await authService.removeStaffMember(deleteConfirmUser.id, currentUser);
      setActionFeedback({
        type: 'success',
        text: `تم حذف حساب المسؤول ${deleteConfirmUser.name} بنجاح.`
      });
      setDeleteConfirmUser(null);
      loadStaff();
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        text: err.message || 'فشل حذف المسؤول.'
      });
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-bold">
            <Users className="w-3.5 h-3.5 text-indigo-300" />
            <span>إدارة فريق المسؤولين المعتمدين • ADMIN MANAGEMENT</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            المسؤولون والمساعدون ({staffList.length})
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            التحكم في أدوار وصلاحيات مساعدي المحتوى والامتحانات. حساب مالكة المنصة محمي كلياً ولا يمكن تعديله أو حذفه.
          </p>
        </div>

        <button
          type="button"
          onClick={loadStaff}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>تحديث القائمة</span>
        </button>
      </div>

      {actionFeedback && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between border ${
          actionFeedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {actionFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
            <span>{actionFeedback.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionFeedback(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100 overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold">
              <tr>
                <th className="py-3.5 px-4">المسؤول (Staff Member)</th>
                <th className="py-3.5 px-4">الدور المعين (Role)</th>
                <th className="py-3.5 px-4">تاريخ التسجيل</th>
                <th className="py-3.5 px-4">آخر نشاط</th>
                <th className="py-3.5 px-4">الحالة</th>
                <th className="py-3.5 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffList.map(member => {
                const isMemberOwner = member.role === 'owner' || member.role === 'admin';
                return (
                  <tr key={member.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center border border-indigo-200 shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-xs">{member.name}</span>
                            {isMemberOwner && (
                              <span className="px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black border border-amber-300">
                                OWNER • مالكة المنصة
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-sans">{member.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-black border ${
                        isMemberOwner
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : member.role === 'content_exams'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {isMemberOwner
                          ? 'PLATFORM OWNER (تحكم كامل)'
                          : member.role === 'content_exams'
                          ? 'CONTENT + EXAMS (المحتوى والامتحانات)'
                          : 'EXAMS ONLY (الامتحانات فقط)'}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-slate-500">
                      {member.createdAt ? new Date(member.createdAt).toLocaleDateString('ar-EG') : '2026-01-01'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-slate-500">
                      {member.lastActivityAt ? new Date(member.lastActivityAt).toLocaleDateString('ar-EG') : 'اليوم'}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        نشط وموثق
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      {isMemberOwner ? (
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                          <Lock className="w-3.5 h-3.5 text-amber-500" />
                          <span>حساب أصلي محمي</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStaffForRole(member);
                              setNewRoleToAssign(member.role === 'content_exams' ? 'exams_only' : 'content_exams');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center gap-1 border border-indigo-200"
                            title="تغيير الدور"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>تعديل الدور</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmUser(member)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition border border-rose-200"
                            title="حذف المسؤول"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Role Modal */}
      {selectedStaffForRole && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">
              تعديل دور المسؤول: {selectedStaffForRole.name}
            </h3>

            <div className="space-y-3">
              <label className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                newRoleToAssign === 'content_exams' ? 'border-indigo-600 bg-indigo-50/60' : 'border-slate-200'
              }`}>
                <div>
                  <div className="font-bold text-xs text-indigo-950">CONTENT + EXAMS</div>
                  <div className="text-[10px] text-slate-500">إدارة محتوى المعامل، رفع الصور، بناء الأسئلة والاختبارات</div>
                </div>
                <input
                  type="radio"
                  name="roleAssign"
                  checked={newRoleToAssign === 'content_exams'}
                  onChange={() => setNewRoleToAssign('content_exams')}
                  className="text-indigo-600"
                />
              </label>

              <label className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                newRoleToAssign === 'exams_only' ? 'border-purple-600 bg-purple-50/60' : 'border-slate-200'
              }`}>
                <div>
                  <div className="font-bold text-xs text-purple-950">EXAMS ONLY</div>
                  <div className="text-[10px] text-slate-500">إدارة بنك الأسئلة، رفع صور الأسئلة، وإدارة الاختبارات</div>
                </div>
                <input
                  type="radio"
                  name="roleAssign"
                  checked={newRoleToAssign === 'exams_only'}
                  onChange={() => setNewRoleToAssign('exams_only')}
                  className="text-purple-600"
                />
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedStaffForRole(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleUpdateRole}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition"
              >
                حفظ التعديل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Staff Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full border border-rose-200 shadow-2xl p-6 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900">تأكيد حذف المسؤول</h3>
              <p className="text-xs text-slate-500">
                هل أنتِ متأكدة من حذف حساب المسؤول <strong>{deleteConfirmUser.name}</strong>؟ سيفقد إمكانية الوصول إلى لوحة الإدارة فوراً.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmUser(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleDeleteStaff}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
