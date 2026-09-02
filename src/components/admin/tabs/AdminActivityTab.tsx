import React, { useState } from 'react';
import {
  Activity,
  Search,
  Calendar,
  Clock,
  BookOpen,
  Filter,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ChevronLeft,
  X,
  User as UserIcon,
  Video,
  Award
} from 'lucide-react';
import { User, UserActivityRecord } from '../../../types';

interface Props {
  users: User[];
  activities: UserActivityRecord[];
  selectedUserForLogs: User | null;
  userSpecificLogs: UserActivityRecord[];
  onSelectUserForLogs: (user: User) => void;
  onCloseUserLogsModal: () => void;
}

export const AdminActivityTab: React.FC<Props> = ({
  users,
  activities,
  selectedUserForLogs,
  userSpecificLogs,
  onSelectUserForLogs,
  onCloseUserLogsModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState<string>('all');

  const students = users.filter(u => u.role === 'student' || u.role === 'instructor');

  const filteredStudents = students.filter(student => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      student.name.toLowerCase().includes(q) ||
      student.email.toLowerCase().includes(q) ||
      (student.studentId && student.studentId.toLowerCase().includes(q))
    );
  });

  const filteredActivities = activities.filter(act => {
    if (sectionFilter === 'all') return true;
    return act.section.toLowerCase().includes(sectionFilter.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Explainer */}
      <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            سجل أنشطة الطلاب والتفاعلات التعليمية (Student Activity Drilldown)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            اختر أي طالب من القائمة لاستعراض تاريخ تسجيل الدخول والجلسات وسجل المهام المعملية والامتحانات
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="البحث عن طالب (Student Search)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pr-9 pl-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Grid: Student Roster Cards */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E2E8F0] text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>قائمة الطلاب وإحصائيات التفاعل ({filteredStudents.length})</span>
          <span className="text-[11px] text-slate-400 font-normal">انقر على أي طالب لعرض السجل المعملي التفصيلي</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-[#E2E8F0]">
              <tr>
                <th className="px-4 py-3">اسم الطالب (Student Name)</th>
                <th className="px-4 py-3">البريد الإلكتروني</th>
                <th className="px-4 py-3">آخر تسجيل دخول</th>
                <th className="px-4 py-3">آخر نشاط</th>
                <th className="px-4 py-3 text-center">عدد الجلسات</th>
                <th className="px-4 py-3 text-center">التفاصيل الكاملة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    لا يوجد طلاب يطابقون خيارات البحث.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={student.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{student.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{student.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap font-mono text-slate-600">
                      {student.email}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                      {student.lastLoginAt ? new Date(student.lastLoginAt).toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }) : 'لم يسجل بعد'}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                      {student.lastActivityAt ? new Date(student.lastActivityAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : '—'}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-center font-bold text-indigo-700">
                      {student.sessionCount || 1}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-center">
                      <button
                        type="button"
                        onClick={() => onSelectUserForLogs(student)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-2xs inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>عرض السجل</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Activity Stream Filtered by Discipline */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              سجل تفاعلات المنصة المباشر واللحظي (Live Platform Activity Stream)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              تحديث فوري عند فتح المختبرات، تشغيل الامتحانات، ومشاهدة المحاضرات
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {['all', 'Anatomy', 'Histology', 'Bacteriology', 'Biochemistry', 'OSPE', 'Video'].map(sec => (
              <button
                key={sec}
                type="button"
                onClick={() => setSectionFilter(sec)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  sectionFilter === sec ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {sec === 'all' ? 'الكل' : sec}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          {filteredActivities.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">لا توجد أنشطة مسجلة في هذا القسم حالياً.</p>
          ) : (
            filteredActivities.slice(0, 20).map(act => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100 border border-slate-100 transition-colors text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">{act.userName}</span>
                    <span className="text-slate-400 mx-2 font-mono">({act.userEmail})</span>
                    <span className="text-slate-700 font-medium">{act.activity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-[11px] shrink-0">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                    {act.section}
                  </span>
                  <span className="text-slate-400">
                    {new Date(act.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Student Drilldown Modal */}
      {selectedUserForLogs && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 text-right my-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUserForLogs.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={selectedUserForLogs.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{selectedUserForLogs.name}</h3>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="font-mono">{selectedUserForLogs.email}</span>
                    <span>•</span>
                    <span className="text-indigo-600 font-bold">{selectedUserForLogs.studentId}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onCloseUserLogsModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold mb-1">تاريخ التسجيل</div>
                <div className="text-xs font-bold text-slate-800">
                  {selectedUserForLogs.createdAt ? new Date(selectedUserForLogs.createdAt).toLocaleDateString('ar-EG', { dateStyle: 'short' }) : '—'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold mb-1">آخر تسجيل دخول</div>
                <div className="text-xs font-bold text-slate-800">
                  {selectedUserForLogs.lastLoginAt ? new Date(selectedUserForLogs.lastLoginAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : '—'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold mb-1">آخر نشاط مسجل</div>
                <div className="text-xs font-bold text-slate-800">
                  {selectedUserForLogs.lastActivityAt ? new Date(selectedUserForLogs.lastActivityAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : '—'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                <div className="text-[10px] text-indigo-600 font-bold mb-1">إجمالي الجلسات</div>
                <div className="text-base font-black text-indigo-700">
                  {selectedUserForLogs.sessionCount || 1}
                </div>
              </div>
            </div>

            {/* Educational Activity Timeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>سجل الأنشطة التعليمية المفصل (Educational Activity Log):</span>
                <span className="text-slate-400">Date/Time | Section | Activity</span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 border border-slate-200 rounded-2xl p-3 bg-slate-50/50">
                {userSpecificLogs.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    لم يقم الطالب بأي أنشطة مسجلة بعد في هذه الجلسة.
                  </div>
                ) : (
                  userSpecificLogs.map(log => (
                    <div
                      key={log.id}
                      className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between text-xs shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <div>
                          <div className="font-bold text-slate-900">{log.activity}</div>
                          {log.metadata && (
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {JSON.stringify(log.metadata)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">
                          {log.section}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {new Date(log.timestamp).toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onCloseUserLogsModal}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
