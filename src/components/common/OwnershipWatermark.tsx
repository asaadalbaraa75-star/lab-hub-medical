/*
 * © LAB HUB · Developed by Sakina Asaad
 * تطوير: سكينة أسعد
 * 
 * Standardized Software Ownership & Copyright Attribution Component
 * Core Platform Component — Permanent Brand Protection
 */

import React from 'react';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

interface OwnershipWatermarkProps {
  variant?: 'inline' | 'card' | 'badge' | 'overlay' | 'footer' | 'minimal';
  className?: string;
  showIcon?: boolean;
}

export const OwnershipWatermark: React.FC<OwnershipWatermarkProps> = ({
  variant = 'inline',
  className = '',
  showIcon = true
}) => {
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 backdrop-blur-md shadow-sm text-xs ${className}`}
        dir="ltr"
      >
        {showIcon && <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
        <span className="font-bold text-slate-200 tracking-wide">© LAB HUB</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300 font-medium">Developed by Sakina Asaad</span>
        <span className="text-slate-500 hidden sm:inline">•</span>
        <span className="text-purple-300 font-medium hidden sm:inline" dir="rtl">تطوير: سكينة أسعد</span>
      </div>
    );
  }

  if (variant === 'overlay') {
    return (
      <div
        className={`absolute bottom-3 left-3 z-20 pointer-events-none select-none px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 shadow-md ${className}`}
        dir="ltr"
      >
        <span className="font-bold text-white">© LAB HUB</span>
        <span className="mx-1 text-slate-500">|</span>
        <span>Developed by Sakina Asaad</span>
        <span className="mx-1 text-slate-500">|</span>
        <span className="text-purple-300" dir="rtl">تطوير: سكينة أسعد</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`p-3 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 ${className}`}
      >
        <div className="flex items-center gap-2" dir="ltr">
          {showIcon && <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />}
          <span className="font-bold text-slate-200">© LAB HUB</span>
          <span>•</span>
          <span className="text-slate-300">Developed by Sakina Asaad</span>
        </div>
        <div className="text-purple-300 font-medium" dir="rtl">
          منصة المختبرات الطبية والامتحانات العملية • تطوير: سكينة أسعد
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div
        className={`py-3 px-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 ${className}`}
      >
        <div className="flex items-center gap-2" dir="ltr">
          <span className="font-bold text-slate-300">© LAB HUB</span>
          <span className="text-slate-600">•</span>
          <span>Developed by Sakina Asaad</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400" dir="rtl">
          <span>جميع الحقوق محفوظة للمنصة</span>
          <span className="text-slate-600">•</span>
          <strong className="text-slate-200">تطوير: سكينة أسعد</strong>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`text-[11px] text-slate-400 flex items-center gap-1.5 ${className}`} dir="ltr">
        <span className="font-semibold text-slate-300">© LAB HUB</span>
        <span className="text-slate-600">•</span>
        <span>Developed by Sakina Asaad</span>
        <span className="text-slate-600">/</span>
        <span className="text-purple-300" dir="rtl">تطوير: سكينة أسعد</span>
      </div>
    );
  }

  // Default 'inline'
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 text-xs text-slate-400 ${className}`}
      dir="ltr"
    >
      {showIcon && <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
      <span className="font-bold text-slate-200">© LAB HUB</span>
      <span className="text-slate-600">•</span>
      <span className="text-slate-300">Developed by Sakina Asaad</span>
      <span className="text-slate-600 hidden sm:inline">•</span>
      <span className="text-purple-300 hidden sm:inline" dir="rtl">تطوير: سكينة أسعد</span>
    </div>
  );
};
