/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Mandatory Authentication Portal: Login, Registration & Password Recovery
 */

import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  KeyRound,
  FlaskConical,
  BookOpen
} from 'lucide-react';
import { LabHubLogo } from '../common/LabHubLogo';
import { authService } from '../../services/authService';
import { User } from '../../types';

interface AuthPageProps {
  onLoginSuccess: (user: User) => void;
  initialReturnTab?: string;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onLoginSuccess,
  initialReturnTab
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form State
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Forgot Password Modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotStatus, setForgotStatus] = useState<{ text: string; isError: boolean } | null>(null);
  const [forgotStep, setForgotStep] = useState<'email' | 'new_password'>('email');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const result = await authService.login(loginEmail, loginPassword);
      if (result.success && result.user) {
        setSuccessMessage(`مرحباً بعودتك د. ${result.user.name} | Welcome back!`);
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

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (registerPassword !== registerConfirmPassword) {
      setErrorMessage('كلمتا المرور غير متطابقتين | Passwords do not match.');
      return;
    }

    if (registerPassword.length < 6) {
      setErrorMessage('يجب أن تكون كلمة المرور 6 أحرف على الأقل | Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.register({
        fullName: registerName,
        email: registerEmail,
        password: registerPassword
      });

      if (result.success && result.user) {
        setSuccessMessage(`تم إنشاء حسابك الجامعي بنجاح! جاري تحويلك... | Account registered successfully!`);
        setTimeout(() => {
          onLoginSuccess(result.user!);
        }, 700);
      } else {
        setErrorMessage(result.error || 'فشل إنشاء الحساب. يرجى المحاولة ثانية.');
      }
    } catch {
      setErrorMessage('حدث خطأ أثناء التسجيل. يرجى المحاولة مجدداً.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotStatus(null);

    if (forgotStep === 'email') {
      if (!forgotEmail || !forgotEmail.includes('@')) {
        setForgotStatus({ text: 'يرجى إدخال بريد إلكتروني صالح | Valid email required.', isError: true });
        return;
      }
      setForgotStep('new_password');
      setForgotStatus({ text: 'تم التحقق من الحساب. أدخل كلمة المرور الجديدة الآن | Enter new password.', isError: false });
      return;
    }

    if (forgotNewPassword.length < 6) {
      setForgotStatus({ text: 'كلمة المرور يجب أن لا تقل عن 6 أحرف | Minimum 6 characters.', isError: true });
      return;
    }

    const res = await authService.resetPassword(forgotEmail, forgotNewPassword);
    setForgotStatus({ text: res.message, isError: !res.success });
    if (res.success) {
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setForgotStep('email');
        setForgotNewPassword('');
        setLoginEmail(forgotEmail);
        setActiveTab('login');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0F172A] to-indigo-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-indigo-600/20 border-b border-indigo-500/20 backdrop-blur-md px-4 py-2 text-center text-xs text-indigo-200 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-indigo-400" />
        <span>منصة تعليمية طبية محمية — تسجيل الدخول إلزامي للوصول للمعامل والامتحانات والدروس</span>
      </div>

      {/* Main Authentication Card Area */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="inline-block p-3 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md mb-2">
              <LabHubLogo size="lg" showTagline={false} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LAB HUB
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/80 max-w-sm mx-auto font-medium leading-relaxed">
              Medical Laboratory & First-Year Medical Education Platform
            </p>
            <p className="text-xs text-purple-300 font-medium">
              Developed by Sakina Asaad • تطوير: <span className="text-white font-bold">سكينة أسعد</span>
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-white/95 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 backdrop-blur-xl">
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6 text-sm font-semibold">
              <button
                type="button"
                id="auth-tab-login"
                onClick={() => {
                  setActiveTab('login');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2.5 rounded-xl transition-all ${
                  activeTab === 'login'
                    ? 'bg-white text-indigo-700 shadow-md font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                تسجيل الدخول (Login)
              </button>
              <button
                type="button"
                id="auth-tab-register"
                onClick={() => {
                  setActiveTab('register');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2.5 rounded-xl transition-all ${
                  activeTab === 'register'
                    ? 'bg-white text-indigo-700 shadow-md font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                إنشاء حساب (Create Account)
              </button>
            </div>

            {/* Error / Success Feedback */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span className="leading-relaxed">{successMessage}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    البريد الإلكتروني الجامعي (Email)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="login-email-input"
                      type="email"
                      required
                      placeholder="name@university.edu"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      كلمة المرور (Password)
                    </label>
                    <button
                      type="button"
                      id="auth-forgot-password-link"
                      onClick={() => {
                        setForgotEmail(loginEmail);
                        setIsForgotModalOpen(true);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline font-semibold"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  </div>
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
                      <span>تسجيل الدخول (Login)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500">
                    ليس لديك حساب بعد؟{' '}
                    <button
                      type="button"
                      id="auth-switch-to-register"
                      onClick={() => setActiveTab('register')}
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      إنشاء حساب طالب جديد
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* REGISTRATION FORM */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    الاسم الكامل للطالب (Full Name)
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="register-fullname-input"
                      type="text"
                      required
                      placeholder="الاسم الكامل (مثال: طارق منصور)"
                      value={registerName}
                      onChange={e => setRegisterName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    البريد الإلكتروني (Email)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="register-email-input"
                      type="email"
                      required
                      placeholder="student@university.edu"
                      value={registerEmail}
                      onChange={e => setRegisterEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    كلمة المرور (Password — 6+ characters)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="register-password-input"
                      type={showRegisterPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={e => setRegisterPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    تأكيد كلمة المرور (Confirm Password)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="register-confirm-password-input"
                      type={showRegisterPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="••••••••"
                      value={registerConfirmPassword}
                      onChange={e => setRegisterConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    الرتبة الممنوحة تلقائياً: <strong>طالب طب (Student)</strong> | الوصول الفوري لجميع المعامل والامتحانات.
                  </span>
                </div>

                <button
                  type="submit"
                  id="auth-register-submit-btn"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? (
                    <span>جاري إنشاء الحساب والملف...</span>
                  ) : (
                    <>
                      <span>إنشاء حساب الطالب (Create Account)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500">
                    لديك حساب بالفعل؟{' '}
                    <button
                      type="button"
                      id="auth-switch-to-login"
                      onClick={() => setActiveTab('login')}
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      تسجيل الدخول
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">استعادة كلمة المرور</h3>
                  <p className="text-xs text-slate-500">LAB HUB Password Recovery</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsForgotModalOpen(false);
                  setForgotStatus(null);
                  setForgotStep('email');
                }}
                className="text-slate-400 hover:text-slate-600 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleForgotPasswordSubmit} className="mt-5 space-y-4">
              {forgotStatus && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    forgotStatus.isError
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {forgotStatus.isError ? (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  )}
                  <span>{forgotStatus.text}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  البريد الإلكتروني المسجل (Registered Email)
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@med.edu"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  disabled={forgotStep === 'new_password'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                />
              </div>

              {forgotStep === 'new_password' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    كلمة المرور الجديدة (New Password — min 6 chars)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={forgotNewPassword}
                    onChange={e => setForgotNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
                  />
                </div>
              )}

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setForgotStatus(null);
                    setForgotStep('email');
                  }}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  {forgotStep === 'email' ? 'متابعة' : 'حفظ كلمة المرور'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
