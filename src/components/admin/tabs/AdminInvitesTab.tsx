/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * Admin Invites Management System (Exclusive to OWNER)
 */

import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Copy,
  Check,
  Clock,
  Shield,
  AlertTriangle,
  RefreshCw,
  Trash2,
  Lock,
  ExternalLink,
  Calendar,
  Sparkles,
  Award,
  Ban,
  CheckCircle2,
  Info
} from 'lucide-react';
import { AdminInvite, User } from '../../../types';
import { authService } from '../../../services/authService';

interface Props {
  currentUser: User;
}

export const AdminInvitesTab: React.FC<Props> = ({ currentUser }) => {
  const [invites, setInvites] = useState<AdminInvite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Form State
  const [selectedRole, setSelectedRole] = useState<'content_exams' | 'exams_only'>('content_exams');
  const [inviteNote, setInviteNote] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedInvite, setGeneratedInvite] = useState<AdminInvite | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isOwner = currentUser.role === 'owner' || currentUser.role === 'admin';

  const loadInvites = async () => {
    setIsLoading(true);
    try {
      const data = await authService.getAdminInvites(currentUser);
      setInvites(data);
    } catch (err: any) {
      console.error('Error loading invites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOwner) {
      loadInvites();
    }
  }, [currentUser]);

  const handleCreateInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setActionFeedback(null);
    try {
      const invite = await authService.createAdminInvite({
        role: selectedRole,
        note: inviteNote.trim(),
        expiresInDays
      }, currentUser);

      setGeneratedInvite(invite);
      setInvites(prev => [invite, ...prev]);
      setActionFeedback({
        type: 'success',
        text: 'تم إنشاء رابط الدعوة بنجاح. يمكنك الآن نسخه وإرساله للمسؤول.'
      });
      setInviteNote('');
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        text: err.message || 'فشل إنشاء رابط الدعوة.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevokeInvite = async (inviteId: string) => {
    try {
      await authService.revokeAdminInvite(inviteId, currentUser);
      setActionFeedback({
        type: 'success',
        text: 'تم إلغاء صلاحية رابط الدعوة بنجاح.'
      });
      loadInvites();
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        text: err.message || 'فشل إلغاء الدعوة.'
      });
    }
  };

  const getInviteUrl = (token: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/#invite/${token}`;
  };

  const handleCopyLink = (token: string) => {
    const url = getInviteUrl(token);
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 3000);
  };

  if (!isOwner) {
    return (
      <div className="p-8 bg-white rounded-3xl border border-rose-200 text-center space-y-3">
        <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="text-base font-black text-slate-800">صلاحية محصورة بمالكة المنصة (OWNER ONLY)</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          نظام دعوة المسؤولين متاح حصرياً لمالكة المنصة "سكينة أسعد". المساعدون لا يملكون صلاحية إنشاء دعوات أو تفويض أدوار.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-900/90 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-bold">
            <Shield className="w-3.5 h-3.5 text-purple-300" />
            <span>نظام الدعوات الآمن • الصلاحية الحصرية لـ OWNER</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            دعوات المسؤولين (ADMIN INVITES)
          </h2>
          <p className="text-xs text-purple-200 max-w-xl leading-relaxed">
            أنشئي روابط دعوة مشفرة وآمنة لضم المساعدين الجدد إلى فريق الإدارة. الروابط صالحة لمرة واحدة فقط ومحددة بالدور الذي تختارينه، ولا يمكن للمدعو تغيير دوره بنفسه.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setGeneratedInvite(null);
            setIsCreateModalOpen(true);
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-slate-950" />
          <span>إنشاء دعوة مسؤول جديد (CREATE INVITE)</span>
        </button>
      </div>

      {/* Action Notification Feedback */}
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

      {/* Role Definitions Explainer Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              CONTENT + EXAMS ADMIN (المساعد الأول)
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-mono">
              Role: content_exams
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            صلاحيات كاملة على المحتوى والامتحانات: إضافة وتعديل وحذف محتوى التشريح والأنسجة والكيمياء الحيوية، رفع وحذف الصور يدويًا، وبناء وإدارة الأسئلة والاختبارات ونشرها.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-purple-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" />
              EXAMS ADMIN (المساعد الثاني / الثالث)
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-mono">
              Role: exams_only
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            صلاحيات محصورة بالامتحانات فقط: إضافة وتعديل وحذف أسئلة بنك الأسئلة، رفع صور الأسئلة يدويًا، بناء الاختبارات العملية ونشرها. ممنوع من تعديل دروس المعامل وممنوع من إعدادات النظام.
          </p>
        </div>
      </div>

      {/* Invites List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-slate-900">سجل الدعوات الصادرة ({invites.length})</h3>
            <span className="text-xs text-slate-400">تتبع حالة كل رابط تم توليده</span>
          </div>
          <button
            type="button"
            onClick={loadInvites}
            disabled={isLoading}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
            title="تحديث القائمة"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {invites.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <UserPlus className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">لم يتم إنشاء أي دعوات حتى الآن</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              اضغطي على "إنشاء دعوة مسؤول جديد" لتوليد رابط دعوة لمساعد جديد مع تحديد دوره المحدد.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-bold">
                <tr>
                  <th className="py-3 px-4">الدور المحدد (Role)</th>
                  <th className="py-3 px-4">ملاحظة / اسم المدعو</th>
                  <th className="py-3 px-4">تاريخ الإنشاء</th>
                  <th className="py-3 px-4">صلاحية الرابط</th>
                  <th className="py-3 px-4">الحالة</th>
                  <th className="py-3 px-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invites.map(inv => {
                  const isExpired = new Date(inv.expiresAt).getTime() < Date.now();
                  const status = inv.isUsed
                    ? { label: 'تم الاستخدام بنجاح', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
                    : inv.isRevoked
                    ? { label: 'ملغاة بواسطة OWNER', color: 'bg-rose-50 text-rose-700 border-rose-200' }
                    : isExpired
                    ? { label: 'منتهية الصلاحية', color: 'bg-slate-100 text-slate-600 border-slate-200' }
                    : { label: 'سارية • بانتظار التسجيل', color: 'bg-amber-50 text-amber-800 border-amber-200' };

                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black border ${
                            inv.role === 'content_exams'
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}>
                            {inv.roleTitle || (inv.role === 'content_exams' ? 'CONTENT + EXAMS' : 'EXAMS ONLY')}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800">
                          {inv.note || '—'}
                        </span>
                        {inv.usedByAdminName && (
                          <div className="text-[10px] text-slate-500 mt-0.5 font-sans">
                            سجل به: <strong className="text-slate-700">{inv.usedByAdminName}</strong> ({inv.usedByAdminEmail})
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                        {new Date(inv.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                        {new Date(inv.expiresAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${status.color}`}>
                          {status.label}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {!inv.isUsed && !inv.isRevoked && !isExpired && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleCopyLink(inv.token)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
                                  copiedToken === inv.token
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                                }`}
                                title="نسخ رابط الدعوة"
                              >
                                {copiedToken === inv.token ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>تم النسخ!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>نسخ الرابط</span>
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRevokeInvite(inv.id)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition"
                                title="إلغاء الدعوة فوراً"
                              >
                                <Ban className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}

                          {(inv.isUsed || inv.isRevoked || isExpired) && (
                            <span className="text-slate-400 text-[11px]">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE INVITE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">
                  إنشاء رابط دعوة مسؤول جديد (CREATE ADMIN INVITE)
                </h3>
                <p className="text-xs text-slate-500">
                  حددي دور المساعد وفترة الصلاحية لتوليد رابط مشفر وآمن
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {generatedInvite ? (
              /* Success State with Copy Box */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>تم توليد رابط الدعوة بنجاح!</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    أرسلي هذا الرابط للشخص المدعو عبر الواتساب أو البريد. عند فتحه للرابط سيقوم بإنشاء حسابه الخاص وسيتفعل دوره مباشرة.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">رابط الدعوة الخاص (Unique Invite Link):</label>
                  <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-xl border border-slate-300 font-mono text-xs select-all text-slate-800 break-all">
                    <span className="flex-1 truncate dir-ltr">{getInviteUrl(generatedInvite.token)}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(generatedInvite.token)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition"
                    >
                      {copiedToken === generatedInvite.token ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الرابط</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div><strong>الدور المفوض:</strong> {generatedInvite.roleTitle}</div>
                  <div><strong>صلاحية الرابط:</strong> صالحة حتى {new Date(generatedInvite.expiresAt).toLocaleDateString('ar-EG')} (استخدام لمرة واحدة)</div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
                >
                  إغلاق النافذة
                </button>
              </div>
            ) : (
              /* Create Form */
              <form onSubmit={handleCreateInvite} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    تحديد دور المسؤول (Select Role) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between gap-2 ${
                      selectedRole === 'content_exams'
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-indigo-900">CONTENT + EXAMS</span>
                        <input
                          type="radio"
                          name="inviteRole"
                          checked={selectedRole === 'content_exams'}
                          onChange={() => setSelectedRole('content_exams')}
                          className="text-indigo-600"
                        />
                      </div>
                      <p className="text-[10px] text-slate-600 leading-snug">
                        المساعد الأول: إدارة المحتوى الطبي والصور والأسئلة والاختبارات
                      </p>
                    </label>

                    <label className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between gap-2 ${
                      selectedRole === 'exams_only'
                        ? 'border-purple-600 bg-purple-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-purple-900">EXAMS ONLY</span>
                        <input
                          type="radio"
                          name="inviteRole"
                          checked={selectedRole === 'exams_only'}
                          onChange={() => setSelectedRole('exams_only')}
                          className="text-purple-600"
                        />
                      </div>
                      <p className="text-[10px] text-slate-600 leading-snug">
                        المساعد الثاني والثالث: إدارة بنك الأسئلة والاختبارات العملية وصورها
                      </p>
                    </label>
                  </div>
                </div>

                {/* Recipient Note */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    ملاحظة خاصة بالدعوة (اسم المساعد أو الغرض)
                  </label>
                  <input
                    type="text"
                    value={inviteNote}
                    onChange={e => setInviteNote(e.target.value)}
                    placeholder="مثال: د. أحمد - مسؤول أسئلة الأنسجة"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Validity */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    مدة صلاحية الرابط قبل الانتهاء
                  </label>
                  <select
                    value={expiresInDays}
                    onChange={e => setExpiresInDays(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                  >
                    <option value={1}>يوم واحد (24 ساعة)</option>
                    <option value={3}>3 أيام</option>
                    <option value={7}>7 أيام (مستحسن أمنياً)</option>
                    <option value={14}>14 يوماً</option>
                    <option value={30}>30 يوماً</option>
                  </select>
                </div>

                {/* Security Guarantee Note */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <p>
                    هذا الرابط مشفر وغير قابل للتخمين، ويستخدم لمرة واحدة فقط. لا يستطيع المدعو تغيير دوره. يمكنك إلغاء الرابط في أي وقت.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-2 shadow-sm transition active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )}
                    <span>توليد رابط الدعوة الآن</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
