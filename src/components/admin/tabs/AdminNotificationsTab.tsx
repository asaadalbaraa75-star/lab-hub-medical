import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  Send,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  BookOpen,
  Award,
  AlertCircle,
  Clock
} from 'lucide-react';
import { NotificationItem, User } from '../../../types';
import { storageService } from '../../../services/storageService';
import { apiService } from '../../../services/apiService';

interface Props {
  currentUser: User;
}

export const AdminNotificationsTab: React.FC<Props> = ({ currentUser }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'system' | 'exam' | 'achievement' | 'update'>('exam');
  const [link, setLink] = useState('/exams');
  const [isSending, setIsSending] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const loadNotifications = async () => {
    try {
      const serverNotifs = await apiService.fetchNotifications();
      if (serverNotifs && serverNotifs.length > 0) {
        setNotifications(serverNotifs);
      } else {
        setNotifications(storageService.getNotificationItems());
      }
    } catch {
      setNotifications(storageService.getNotificationItems());
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSending(true);
    try {
      // Create via apiService and local storage
      const newNotif = storageService.addNotificationItem({
        title: title.trim(),
        message: message.trim(),
        type,
        isRead: false,
        link: link.trim() || undefined
      });

      await apiService.createNotification({
        title: title.trim(),
        message: message.trim(),
        type,
        isRead: false,
        link: link.trim() || undefined
      });

      setTitle('');
      setMessage('');
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);
      await loadNotifications();
    } catch (err) {
      console.error('Failed to send notification:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleQuickTemplate = (presetTitle: string, presetMsg: string, presetType: any, presetLink: string) => {
    setTitle(presetTitle);
    setMessage(presetMsg);
    setType(presetType);
    setLink(presetLink);
  };

  return (
    <div className="space-y-6" id="admin-notifications-tab">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold font-mono">
              Communication Center
            </span>
            <span className="text-xs text-slate-500 font-bold">
              إجمالي الإشعارات: <span className="font-mono text-indigo-600 font-black">{notifications.length}</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            إدارة الإشعارات والتوجيهات الطلابية (Notifications Manager)
          </h2>
          <p className="text-xs text-slate-500">
            إرسال إشعارات تحفيزية، إعلانات امتحانات جديدة، وملاحظات دراسية تظهر للطلاب في مركز الإشعارات والصفحة الرئيسية.
          </p>
        </div>

        <button
          type="button"
          onClick={loadNotifications}
          className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors self-start md:self-auto"
          title="تحديث الإشعارات"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Compose Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-600" />
              <span>إرسال إشعار جديد للطلاب</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              سيصل الإشعار فورًا لجميع الطلاب المسجلين بالمنصة.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 block">نماذج سريعة جاهزة:</label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickTemplate(
                  'امتحان العظام العملي متاح الآن 🦴',
                  'تم فتح اختبار Anatomy Bones Exam العملي بنظام OSPE. جرب نفسك خلال 15 دقيقة.',
                  'exam',
                  '/exams'
                )}
                className="px-2 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-[11px] font-bold transition-colors"
              >
                🦴 اختبار عظام جديد
              </button>
              <button
                type="button"
                onClick={() => handleQuickTemplate(
                  'رسالة تحفيزية لطلاب الطب 🌟',
                  'أنت تقوم بعمل رائع. الاستمرار اليومي في مراجعة المعالم التشريحية يصنع الطبيب المتميز.',
                  'achievement',
                  '/dashboard'
                )}
                className="px-2 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 rounded-lg text-[11px] font-bold transition-colors"
              >
                🌟 رسالة تحفيز
              </button>
              <button
                type="button"
                onClick={() => handleQuickTemplate(
                  'تحديث محتوى معمل الأنسجة 🔬',
                  'تم إضافة شرائح مجهرية موثقة جديدة لتمييز الأنسجة العضلية والظهارية.',
                  'update',
                  '/histology'
                )}
                className="px-2 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-[11px] font-bold transition-colors"
              >
                🔬 تحديث الشرائح
              </button>
            </div>
          </div>

          <form onSubmit={handleSendNotification} className="space-y-3 text-xs font-semibold">
            <div>
              <label className="block text-slate-700 mb-1">نوع الإشعار (Type) *</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-bold"
              >
                <option value="exam">اختبار جديد (Exam)</option>
                <option value="achievement">تحفيز وإنجاز (Achievement)</option>
                <option value="system">إشعار نظام عام (System)</option>
                <option value="update">تحديث محتوى دراسي (Update)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1">عنوان الإشعار (Title) *</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="مثال: جاهز لاختبار OSPE العضلات اليوم؟"
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1">نص الرسالة (Message) *</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="اكتب التوجيه أو النصيحة للطلاب بالتفصيل..."
                rows={3}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1">الرابط الموجه (Action Link)</label>
              <input
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="/exams أو /dashboard أو /tutor"
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-mono"
              />
            </div>

            {successToast && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تم إرسال الإشعار ونشره بنجاح!</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? 'جاري الإرسال...' : 'إرسال الإشعار للطلاب'}</span>
            </button>
          </form>
        </div>

        {/* Right: Existing Notifications List (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>سجل الإشعارات المرسلة</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">{notifications.length} سجل</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                لا توجد إشعارات مسجلة حاليًا.
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.id} className="py-3 px-2 hover:bg-slate-50 rounded-xl transition-colors space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        n.type === 'exam' ? 'bg-indigo-600' :
                        n.type === 'achievement' ? 'bg-amber-500' :
                        n.type === 'update' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`} />
                      <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 uppercase">
                        {n.type}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(n.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pr-4">
                    {n.message}
                  </p>

                  {n.link && (
                    <div className="pr-4 text-[11px] text-indigo-600 font-mono">
                      رابط التوجيه: {n.link}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
