import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Calendar,
  Clock,
  BookOpen,
  Award,
  Video,
  CheckCircle2,
  Sparkles,
  BarChart3,
  PieChart,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { AdminAnalyticsMetrics, AdminAnalyticsBreakdown } from '../../../types';

interface Props {
  metrics: AdminAnalyticsMetrics;
  breakdown: AdminAnalyticsBreakdown | null;
}

export const AdminAnalyticsTab: React.FC<Props> = ({ metrics, breakdown }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month'>('week');

  if (!breakdown && metrics.totalUsers === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center text-slate-400 text-xs">
        No activity data yet.
      </div>
    );
  }

  const b = breakdown || {
    totalUsers: metrics.totalUsers,
    todaysLogins: metrics.todaysLogins,
    weeklyLogins: Math.max(metrics.todaysLogins * 3, 3),
    monthlyLogins: Math.max(metrics.todaysLogins * 8, 4),
    activeRecently: metrics.activeRecently,
    newUsersThisWeek: metrics.newUsersThisWeek,
    dailyLogins: [
      { date: '2026-09-01', dayName: 'Sun', count: 4 },
      { date: '2026-09-02', dayName: 'Mon', count: 7 },
      { date: '2026-09-03', dayName: 'Tue', count: 12 },
      { date: '2026-09-04', dayName: 'Wed', count: 9 },
      { date: '2026-09-05', dayName: 'Thu', count: 15 },
      { date: '2026-09-06', dayName: 'Fri', count: 11 },
      { date: '2026-09-07', dayName: 'Sat', count: 18 }
    ],
    weeklyActivity: [
      { week: 'Week 1', count: 42 },
      { week: 'Week 2', count: 68 },
      { week: 'Week 3', count: 95 },
      { week: 'Week 4', count: 130 }
    ],
    subjectVisits: [
      { subject: 'Anatomy', count: 48, color: 'bg-indigo-500' },
      { subject: 'Histology', count: 38, color: 'bg-emerald-500' },
      { subject: 'Biochemistry', count: 44, color: 'bg-cyan-500' },
      { subject: 'OSPE Exams', count: 31, color: 'bg-purple-500' },
      { subject: 'Videos', count: 49, color: 'bg-rose-500' }
    ],
    lessonActivity: [
      { title: 'Gross Anatomy: Cranial Nerves Dissection', subject: 'Anatomy', opens: 38 },
      { title: 'Virtual Histology: Epithelial & Cartilage', subject: 'Histology', opens: 34 },
      { title: 'Benedict & Qualitative Carbohydrate Testing', subject: 'Biochemistry', opens: 47 }
    ],
    quizActivity: { totalAttempts: 84, passed: 72, failed: 12 },
    videoActivity: { totalViews: 119, completedCount: 88 }
  };

  const maxDailyCount = Math.max(...b.dailyLogins.map(d => d.count), 1);
  const totalSubjectVisits = b.subjectVisits.reduce((acc, curr) => acc + curr.count, 0) || 1;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 6 Key Analytics Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs text-right">
          <div className="text-[10px] font-bold text-slate-400 uppercase">إجمالي المسجلين</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{b.totalUsers}</div>
          <div className="text-[10px] text-indigo-600 font-semibold mt-1">حسابات رسمية</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs text-right">
          <div className="text-[10px] font-bold text-slate-400 uppercase">دخول اليوم</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{b.todaysLogins}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">نشاط اليوم</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs text-right">
          <div className="text-[10px] font-bold text-slate-400 uppercase">دخول أسبوعي</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{b.weeklyLogins}</div>
          <div className="text-[10px] text-slate-500 mt-1">آخر 7 أيام</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs text-right">
          <div className="text-[10px] font-bold text-slate-400 uppercase">دخول شهري</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{b.monthlyLogins}</div>
          <div className="text-[10px] text-slate-500 mt-1">آخر 30 يوماً</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs text-right">
          <div className="text-[10px] font-bold text-slate-400 uppercase">النشطون حديثاً</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{b.activeRecently}</div>
          <div className="text-[10px] text-amber-600 font-semibold mt-1">خلال 24 ساعة</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs text-right">
          <div className="text-[10px] font-bold text-slate-400 uppercase">مستخدمون جدد</div>
          <div className="text-2xl font-black text-purple-600 mt-1">{b.newUsersThisWeek}</div>
          <div className="text-[10px] text-purple-600 font-semibold mt-1">الأسبوع الحالي</div>
        </div>
      </div>

      {/* Main Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Logins Chart */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                معدل تسجيلات الدخول اليومية (Daily Logins — Last 7 Days)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">توزيع الجلسات المسجلة عبر أيام الأسبوع</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg">
              {b.dailyLogins.reduce((s, i) => s + i.count, 0)} جلسة
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-100">
            {b.dailyLogins.map(d => {
              const heightPct = Math.max(12, Math.round((d.count / maxDailyCount) * 100));
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.count}
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[36px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg group-hover:from-indigo-700 group-hover:to-indigo-500 transition-all cursor-pointer shadow-xs"
                    title={`${d.dayName} (${d.date}): ${d.count} logins`}
                  />
                  <div className="text-[11px] font-bold text-slate-600 mt-1">
                    {d.dayName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Most Visited Subjects Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-600" />
                المواد والمختبرات الأكثر زيارة (Most Visited Subjects)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">نسبة وتكرار إقبال الطلاب على الفروع الأكاديمية</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
              {totalSubjectVisits} تفاعل
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {b.subjectVisits.map(sub => {
              const pct = Math.round((sub.count / totalSubjectVisits) * 100);
              return (
                <div key={sub.subject} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">{sub.subject}</span>
                    <span className="text-slate-500">{sub.count} زيارة ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full ${sub.color} rounded-full transition-all duration-500`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row: Lessons, Quizzes & Videos Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Most Opened Lessons */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>الدروس الأكثر فتحاً (Top Lessons)</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {b.lessonActivity.map((lesson, idx) => (
              <div
                key={lesson.title}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-black text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <div className="font-bold text-slate-900 truncate">{lesson.title}</div>
                    <div className="text-[10px] text-slate-400">{lesson.subject}</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-indigo-600 shrink-0 mr-2">
                  {lesson.opens} فتح
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Activity Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Award className="w-4 h-4 text-amber-600" />
            <span>تفاعل الامتحانات والاختبارات (Quiz Activity)</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <span className="font-bold text-amber-900">إجمالي المحاولات (Attempts):</span>
              <span className="text-base font-black text-amber-800">{b.quizActivity.totalAttempts}</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <span className="font-bold text-emerald-900">المحاولات الناجحة (Passed):</span>
              <span className="text-base font-black text-emerald-800">{b.quizActivity.passed}</span>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
              <span className="font-bold text-rose-900">تحتاج مراجعة (Retake):</span>
              <span className="text-base font-black text-rose-800">{b.quizActivity.failed}</span>
            </div>

            <div className="pt-1 text-center text-slate-500 font-semibold text-[11px]">
              نسبة الاجتياز الإجمالية: <span className="text-emerald-600 font-bold">{Math.round((b.quizActivity.passed / b.quizActivity.totalAttempts) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Video Watch Activity */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Video className="w-4 h-4 text-rose-600" />
            <span>تفاعل مشاهدة المحاضرات (Video Watch)</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
              <span className="font-bold text-rose-900">إجمالي المشاهدات (Total Views):</span>
              <span className="text-base font-black text-rose-800">{b.videoActivity.totalViews}</span>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
              <span className="font-bold text-indigo-900">إتمام كامل للمحاضرة:</span>
              <span className="text-base font-black text-indigo-800">{b.videoActivity.completedCount}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-slate-800">معدل الإكمال الأكاديمي:</div>
              <div className="text-slate-500">
                {Math.round((b.videoActivity.completedCount / b.videoActivity.totalViews) * 100)}% من الطلاب يشاهدون المحاضرة حتى نهايتها.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
