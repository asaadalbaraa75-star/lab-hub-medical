/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Dedicated Staff & Question Contributor Access Portal
 * (Students access LAB HUB directly without login or registration)
 */

import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  FileQuestion,
  UserCheck,
  Compass
} from 'lucide-react';
import { LabHubLogo } from '../common/LabHubLogo';
import { authService } from '../../services/authService';
import { apiService } from '../../services/apiService';
import { User } from '../../types';

interface AuthPageProps {
  onLoginSuccess: (user: User) => void;
  onCancel?: () => void;
  initialReturnTab?: string;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onLoginSuccess,
  onCancel,
  initialReturnTab
}) => {
  const [activeTab, setActiveTab] = useState<'contributor' | 'owner'>('contributor');

  // Contributor Code State
  const [contributorCode, setContributorCode] = useState('');

  // Owner/Admin Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Contributor Access Code Submit
  const handleContributorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributorCode.trim()) {
      setErrorMessage('يرجى إدخال رمز الوصول الخاص بالمساعد.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const res = await apiService.contributorAccess(contributorCode.trim());
      if (res.success && res.user && res.token) {
        authService.saveSession({
          token: res.token,
          user: res.user,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
        });
        setSuccessMessage(`تم التحقق من الرمز بنجاح! مرحباً بك: ${res.user.name}`);
        setTimeout(() => {
          onLoginSuccess(res.user);
        }, 500);
      } else {
        setErrorMessage(res.error || 'رمز الوصول غير صالح أو منتهي الصلاحية.');
      }
    } catch {
      setErrorMessage('حدث خطأ في الاتصال بالخادم. يرجى المحاولة ثانية.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Contributor Code Select
  const handleQuickContributor = async (code: string) => {
    setContributorCode(code);
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const res = await apiService.contributorAccess(code);
      if (res.success && res.user && res.token) {
        authService.saveSession({
          token: res.token,
          user: res.user,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
        });
        setSuccessMessage(`تم تفعيل وصول ${res.user.name} بنجاح! جاري الفتح...`);
        setTimeout(() => {
          onLoginSuccess(res.user);
        }, 500);
      } else {
        setErrorMessage(res.error || 'رمز الوصول غير صالح.');
      }
    } catch {
      setErrorMessage('تعذر الاتصال بالخادم.');
    } finally {
      setIsLoading(false);
    }
  };

  // Owner / Admin Login Submit
  const handleOwnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const result = await authService.login(loginEmail, loginPassword);
      if (result.success && result.user) {
        setSuccessMessage(`أهلاً بك: ${result.user.name} | تم تسجيل الدخول بنجاح`);
        setTimeout(() => {
          onLoginSuccess(result.user!);
        }, 500);
      } else {
        setErrorMessage(result.error || 'فشل تسجيل الدخول. يرجى التحقق من البريد وكلمة المرور.');
      }
    } catch {
      setErrorMessage('حدث خطأ في الاتصال بالخادم. يرجى المحاولة ثانية.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0A0F1D] to-indigo-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Banner Notice: Public Student Access */}
      <div className="bg-emerald-950/40 border-b border-emerald-500/20 backdrop-blur-md px-4 py-2.5 text-center text-xs text-emerald-200 flex items-center justify-center gap-2">
        <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>منصة الطلاب مفتوحة للجميع بدون تسجيل أو حسابات • هذه الصفحة مخصصة فقط للمالك والمساعدين</span>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="mr-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 transition"
          >
            تصفح المنصة كطالب ←
          </button>
        )}
      </div>

      {/* Main Authentication Card Area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-6 space-y-2">
            <div className="inline-block p-3 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md mb-1">
              <LabHubLogo size="lg" showTagline={false} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LAB HUB
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/80 max-w-sm mx-auto font-medium leading-relaxed">
              بوابة وصول إدارة المنصة ومساعدي إعداد الأسئلة
            </p>
            <p className="text-xs text-purple-300 font-medium">
              المالكة والمطورة: <span className="text-white font-bold">سكينة أسعد</span> (Sokinah Asaad)
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-white/95 text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20 backdrop-blur-xl">
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-5 text-xs sm:text-sm font-semibold">
              <button
                type="button"
                id="auth-tab-contributor"
                onClick={() => {
                  setActiveTab('contributor');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'contributor'
                    ? 'bg-white text-indigo-700 shadow-md font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileQuestion className="w-4 h-4" />
                <span>رمز المساعدين (Code)</span>
              </button>
              <button
                type="button"
                id="auth-tab-owner"
                onClick={() => {
                  setActiveTab('owner');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'owner'
                    ? 'bg-white text-indigo-700 shadow-md font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>دخول الإدارة (Owner)</span>
              </button>
            </div>

            {/* Error / Success Feedback */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span className="leading-relaxed">{successMessage}</span>
              </div>
            )}

            {/* TAB 1: CONTRIBUTOR PRIVATE ACCESS CODE */}
            {activeTab === 'contributor' && (
              <form onSubmit={handleContributorSubmit} className="space-y-4">
                <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 leading-relaxed">
                  <p className="font-semibold text-indigo-950 mb-0.5 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                    دخول المساعدين برمز الوصول الخاص:
                  </p>
                  <p className="text-[11px] text-indigo-800/90">
                    لا يتطلب بريدًا إلكترونيًا أو كلمة مرور أو تسجيل حساب. فقط أدخل رمزك الخاص للدخول مباشرة إلى مساحة إضافة الأسئلة.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    رمز الوصول السري (Access Code)
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="contributor-code-input"
                      type="text"
                      required
                      placeholder="CONTRIB-1 أو CONTRIB-2 أو CONTRIB-3"
                      value={contributorCode}
                      onChange={e => setContributorCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-sm font-mono transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                    />
                  </div>
                </div>

                {/* 1-Click Access for the 3 Designated Assistants */}
                <div className="pt-1">
                  <span className="block text-[11px] font-bold text-slate-500 mb-1.5">
                    وصول سريع للمساعدين الـ 3 المعتمدين:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      id="quick-contrib-1-btn"
                      onClick={() => handleQuickContributor('CONTRIB-1')}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 text-xs font-semibold text-center transition flex flex-col items-center gap-1"
                    >
                      <span className="font-bold text-[11px]">مساعد 1</span>
                      <span className="text-[9px] font-mono text-indigo-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">CONTRIB-1</span>
                    </button>
                    <button
                      type="button"
                      id="quick-contrib-2-btn"
                      onClick={() => handleQuickContributor('CONTRIB-2')}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 text-xs font-semibold text-center transition flex flex-col items-center gap-1"
                    >
                      <span className="font-bold text-[11px]">مساعد 2</span>
                      <span className="text-[9px] font-mono text-indigo-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">CONTRIB-2</span>
                    </button>
                    <button
                      type="button"
                      id="quick-contrib-3-btn"
                      onClick={() => handleQuickContributor('CONTRIB-3')}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 text-xs font-semibold text-center transition flex flex-col items-center gap-1"
                    >
                      <span className="font-bold text-[11px]">مساعد 3</span>
                      <span className="text-[9px] font-mono text-indigo-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">CONTRIB-3</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  id="contributor-submit-btn"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? (
                    <span>جاري التحقق من الرمز...</span>
                  ) : (
                    <>
                      <span>دخول مساحة الأسئلة (Enter Questions Hub)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: OWNER & ADMIN LOGIN */}
            {activeTab === 'owner' && (
              <form onSubmit={handleOwnerSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    البريد الإلكتروني للإدارة (Admin Email)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="login-email-input"
                      type="email"
                      required
                      placeholder="owner@labhub.med"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    كلمة المرور (Password)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="login-password-input"
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 1-Click Fill for Owner */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('owner@labhub.med');
                      setLoginPassword('owner123');
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold transition"
                  >
                    مالكة المنصة (سكينة أسعد)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('admin@med.edu');
                      setLoginPassword('admin123');
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-[11px] font-medium transition"
                  >
                    مدير النظام (Admin)
                  </button>
                </div>

                <button
                  type="submit"
                  id="auth-login-submit-btn"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? (
                    <span>جاري التحقق...</span>
                  ) : (
                    <>
                      <span>دخول لوحة التحكم (Owner Login)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Direct Return to Student Platform */}
            <div className="pt-4 mt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                id="back-to-student-btn"
                onClick={() => {
                  if (onCancel) {
                    onCancel();
                  } else {
                    window.location.hash = '';
                    window.location.reload();
                  }
                }}
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>الطلاب لا يحتاجون لتسجيل • تصفح المنصة مباشرة كطالب</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Notice */}
      <div className="py-4 text-center text-xs text-slate-400 border-t border-white/10 backdrop-blur-md space-y-1">
        <div dir="ltr">
          <span className="font-bold text-slate-200">© LAB HUB</span>
          <span className="mx-1.5 text-slate-600">•</span>
          <span>Developed by Sakina Asaad</span>
        </div>
        <div className="text-[11px] text-purple-300" dir="rtl">
          منصة المعامل الطبية والامتحانات العملية • تطوير: سكينة أسعد
        </div>
      </div>
    </div>
  );
};
