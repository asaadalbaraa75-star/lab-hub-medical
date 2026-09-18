/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * Comprehensive Activity Log System (Exclusive to OWNER)
 */

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Search,
  Filter,
  RefreshCw,
  Clock,
  User,
  Shield,
  FileQuestion,
  Image as ImageIcon,
  Award,
  BookOpen,
  UserPlus,
  KeyRound,
  Trash2,
  CheckCircle2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { ActivityLogRecord, User as UserType } from '../../../types';
import { authService } from '../../../services/authService';

interface Props {
  currentUser: UserType;
}

export const AdminActivityLogTab: React.FC<Props> = ({ currentUser }) => {
  const [logs, setLogs] = useState<ActivityLogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterAdmin, setFilterAdmin] = useState<string>('all');

  const isOwner = currentUser.role === 'owner' || currentUser.role === 'admin';

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const data = await authService.getActivityLogs(currentUser);
      setLogs(data);
    } catch (err: any) {
      console.error('Error loading activity logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOwner) {
      loadLogs();
    }
  }, [currentUser]);

  if (!isOwner) {
    return (
      <div className="p-8 bg-white rounded-3xl border border-rose-200 text-center space-y-3" dir="rtl">
        <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="text-base font-black text-slate-800">صلاحية محصورة بمالكة المنصة (OWNER ONLY)</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          سجل النشاط الإداري متاح حصرياً لمالكة المنصة لمتابعة كافة العمليات والتعديلات التي تتم على الأسئلة والمحتوى والاختبارات.
        </p>
      </div>
    );
  }

  // Filter logs
  const filteredLogs = logs.filter(log => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      log.adminName.toLowerCase().includes(q) ||
      log.adminEmail.toLowerCase().includes(q) ||
      log.actionTitleArabic.toLowerCase().includes(q) ||
      (log.targetTitle && log.targetTitle.toLowerCase().includes(q)) ||
      log.section.toLowerCase().includes(q);

    const matchesAction = filterAction === 'all' || log.action.includes(filterAction);
    const matchesAdmin = filterAdmin === 'all' || log.adminId === filterAdmin;

    return matchesSearch && matchesAction && matchesAdmin;
  });

  const getActionBadge = (action: string) => {
    if (action.includes('question')) {
      return { icon: <FileQuestion className="w-3.5 h-3.5" />, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    }
    if (action.includes('image')) {
      return { icon: <ImageIcon className="w-3.5 h-3.5" />, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
    }
    if (action.includes('exam')) {
      return { icon: <Award className="w-3.5 h-3.5" />, color: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
    if (action.includes('lesson')) {
      return { icon: <BookOpen className="w-3.5 h-3.5" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
    if (action.includes('invite') || action.includes('admin')) {
      return { icon: <UserPlus className="w-3.5 h-3.5" />, color: 'bg-purple-50 text-purple-700 border-purple-200' };
    }
    return { icon: <Activity className="w-3.5 h-3.5" />, color: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  // Distinct admins for filter
  const distinctAdmins = Array.from(new Set(logs.map(l => JSON.stringify({ id: l.adminId, name: l.adminName })))).map(s => JSON.parse(s));

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-bold">
            <Activity className="w-3.5 h-3.5 text-indigo-300" />
            <span>سجل الرقابة الإدارية المتكامل • خاص بـ OWNER</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            سجل نشاط المسؤولين (ACTIVITY LOG)
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            متابعة فورية ودقيقة لكل عملية إضافة وتعديل وحذف للأسئلة، رفع الصور، بناء الاختبارات، والدعوات، مع توثيق اسم المسؤول ووقته والبيانات المرتبطة.
          </p>
        </div>

        <button
          type="button"
          onClick={loadLogs}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>تحديث السجل</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث في الإجراء، اسم المسؤول، أو الهدف..."
              className="w-full pr-9 pl-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Action Filter */}
          <div>
            <select
              value={filterAction}
              onChange={e => setFilterAction(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
            >
              <option value="all">جميع أنواع الإجراءات</option>
              <option value="question">إجراءات الأسئلة (بنك الأسئلة)</option>
              <option value="image">رفع واستبدال الصور</option>
              <option value="exam">إجراءات الاختبارات</option>
              <option value="lesson">تعديل محتوى المعامل</option>
              <option value="invite">الدعوات والمسؤولين</option>
            </select>
          </div>

          {/* Admin Filter */}
          <div>
            <select
              value={filterAdmin}
              onChange={e => setFilterAdmin(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
            >
              <option value="all">جميع المسؤولين</option>
              {distinctAdmins.map(adm => (
                <option key={adm.id} value={adm.id}>{adm.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 font-medium">
          يتم عرض <strong>{filteredLogs.length}</strong> عملية مسجلة
        </div>
      </div>

      {/* Log Stream */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Activity className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">لا توجد سجلات تطابق الفلتر</h4>
            <p className="text-xs text-slate-400">ستظهر العمليات الجديدة هنا تلقائيًا فور تنفيذها.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLogs.map(log => {
              const badge = getActionBadge(log.action);
              return (
                <div key={log.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2.5 rounded-2xl border shrink-0 ${badge.color}`}>
                      {badge.icon}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs text-slate-900">
                          {log.actionTitleArabic}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          {log.section}
                        </span>
                      </div>

                      {log.targetTitle && (
                        <p className="text-xs text-slate-600 font-medium">
                          الهدف: <span className="font-bold text-slate-800">{log.targetTitle}</span>
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5 flex-wrap">
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <User className="w-3 h-3 text-slate-400" />
                          {log.adminName}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                          {log.adminRole}
                        </span>
                        <span>({log.adminEmail})</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left shrink-0 font-mono text-[11px] text-slate-400 flex items-center gap-1.5 self-end md:self-center">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(log.timestamp).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
