/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * Accept Admin Invitation Flow
 */

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Award,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight,
  Sparkles,
  RefreshCw,
  KeyRound
} from 'lucide-react';
import { AdminInvite, User } from '../../types';
import { authService } from '../../services/authService';

interface Props {
  token: string;
  onSuccess: (user: User) => void;
  onCancel: () => void;
}

export const AcceptAdminInvitePage: React.FC<Props> = ({
  token,
  onSuccess,
  onCancel
}) => {
  const [invite, setInvite] = useState<AdminInvite | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      setIsLoading(true);
      setErrorStatus(null);
      try {
        const inv = await authService.validateInviteToken(token);
        if (!inv) {
          setErrorStatus('رابط الدعوة غير صالح أو غير موجود.');
        } else if (inv.isRevoked) {
          setErrorStatus('تم إلغاء صلاحية هذا الرابط من قِبل مالكة المنصة (OWNER).');
        } else if (inv.isUsed) {
          setErrorStatus('تم استخدام رابط الدعوة هذا مسبقاً لإنشاء حساب.');
        } else if (new Date(inv.expiresAt).getTime() < Date.now()) {
          setErrorStatus('انتهت صلاحية رابط الدعوة هذا.');
        } else {
          setInvite(inv);
        }
      } catch (err: any) {
        setErrorStatus(err.message || 'فشل التحقق من صلاحية رابط الدعوة.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError('يرجى إدخال اسمك الكامل.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }
    if (password.length < 6) {
      setFormError('كلمة المرور يجب ألا تقل عن 6 أحرف أو أرقام.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('كلمتا المرور غير متطابقتين.');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await authService.acceptAdminInvite({
        token,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password
      });

      onSuccess(user);
    } catch (err: any) {
      setFormError(err.message || 'فشل إنشاء الحساب وتفعيل الدعوة.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white" dir="rtl">
        <div className="p-8 rounded-3xl bg-slate-800 border border-slate-700 text-center space-y-4 max-w-md w-full shadow-2xl">
          <RefreshCw className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
          <h2 className="text-base font-bold">جاري التحقق من صلاحية رابط الدعوة...</h2>
          <p className="text-xs text-slate-400">يرجى الانتظار لحظات للتحقق من تشفير الدعوة</p>
        </div>
      </div>
    );
  }

  if (errorStatus || !invite) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white" dir="rtl">
        <div className="p-8 rounded-3xl bg-slate-800 border border-rose-500/30 text-center space-y-5 max-w-md w-full shadow-2xl animate-in fade-in">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-black text-white">رابط الدعوة غير متاح</h2>
            <p className="text-xs text-rose-300 font-medium leading-relaxed">
              {errorStatus || 'الرابط غير صالح.'}
            </p>
          </div>
          <p className="text-[11px] text-slate-400">
            إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع مالكة المنصة "سكينة أسعد" لإصدار رابط دعوة جديد.
          </p>
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition"
          >
            العودة إلى الصفحة الرئيسية لمنصة LAB HUB
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4 text-slate-100" dir="rtl">
      <div className="max-w-lg w-full bg-slate-900/90 backdrop-blur-md rounded-3xl border border-indigo-500/30 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 flex items-center justify-center mx-auto shadow-inner">
            <Shield className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 font-mono">
              LAB HUB ADMIN ONBOARDING
            </span>
            <h1 className="text-xl font-black text-white">
              قبول دعوة مسؤول المنصة
            </h1>
            <p className="text-xs text-slate-400">
              تمت دعوتك رسميًا من قِبل مالكة المنصة للانضمام لفريق إدارة LAB HUB
            </p>
          </div>
        </div>

        {/* Assigned Role Card */}
        <div className={`p-4 rounded-2xl border ${
          invite.role === 'content_exams'
            ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-200'
            : 'bg-purple-950/60 border-purple-500/40 text-purple-200'
        } space-y-2`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-black">
                {invite.role === 'content_exams' ? 'CONTENT + EXAMS ADMIN' : 'EXAMS ADMIN'}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white font-mono">
              ROLE: {invite.role}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {invite.role === 'content_exams'
              ? 'صلاحيات كاملة لإدارة محتوى المعامل (تشريح، أنسجة، كيمياء حيوية)، رفع الصور، وبناء الأسئلة والاختبارات.'
              : 'صلاحيات مخصصة لبناء الأسئلة، رفع صور الأسئلة، وإدارة وتصحيح الاختبارات الطبية العملية.'}
          </p>
          <div className="text-[10px] text-indigo-400/80 pt-1 border-t border-white/5">
            ⚠️ الدور محدد مسبقاً من قِبل مالكة المنصة ولا يمكن تغييره أثناء التسجيل.
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{formError}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">
              الاسم الثلاثي أو اللقب الأكاديمي (Full Name) *
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="مثال: د. أحمد محمد السعيد"
                className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-indigo-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">
              البريد الإلكتروني الرسمي (Email) *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="doctor@example.com"
                className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-indigo-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">
              كلمة المرور الآمنة (Password) *
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="•••••••• (6 أحرف/أرقام على الأقل)"
                className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-indigo-400"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">
              تأكيد كلمة المرور (Confirm Password) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-indigo-400"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              <span>إنشاء الحساب وقبول الدعوة (ACCEPT & REGISTER)</span>
            </button>
          </div>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-white transition"
          >
            إلغاء والعودة للمنصة
          </button>
        </div>
      </div>
    </div>
  );
};
