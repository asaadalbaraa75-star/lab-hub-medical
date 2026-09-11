/*
 * © LAB HUB · Developed by Sakina Asaad
 * تطوير: سكينة أسعد
 * 
 * Global Platform Footer & Software Ownership Attribution
 * Core Platform Component — Brand Identity & Copyright Protection
 */

import React from 'react';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Microscope,
  Bone,
  FlaskConical,
  Lock,
  Sparkles
} from 'lucide-react';
import { OwnershipWatermark } from './OwnershipWatermark';

interface PlatformFooterProps {
  onOpenAbout?: () => void;
  onOpenSecurityAudit?: () => void;
  onSelectTab?: (tab: string, labId?: any) => void;
}

export const PlatformFooter: React.FC<PlatformFooterProps> = ({
  onOpenAbout,
  onOpenSecurityAudit,
  onSelectTab
}) => {
  return (
    <footer
      id="platform-global-footer"
      className="mt-16 bg-[#080C18]/95 border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8 text-slate-400 relative z-20 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Tier: Brand, Mission, & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Purpose Description */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-mono font-black text-xs shadow-md">
                LH
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">
                  LAB <span className="text-purple-400">HUB</span>
                </span>
                <span className="text-[10px] font-mono text-purple-300 block -mt-1">
                  Medical Laboratory Practical Examination Platform
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              منصة المعامل الطبية الذكية والامتحانات العملية (OSPE) الموحدة لطلاب الطب البشري، تجمع بين معامل التشريح العياني، علم الأنسجة المجهري، واختبارات الكيمياء الحيوية بنماذج تفاعلية ونظام الرفيق الدراسي الذكي "لبيب".
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-950/60 text-purple-300 border border-purple-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Original Platform • Secured</span>
              </span>
              {onOpenSecurityAudit && (
                <button
                  type="button"
                  onClick={onOpenSecurityAudit}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer border border-white/10"
                >
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Security Audit</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Laboratory Nav Links */}
          <div className="md:col-span-3 space-y-3 text-right" dir="rtl">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              المعامل المعتمدة
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('anatomy')}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Bone className="w-3.5 h-3.5 text-purple-400" />
                  <span>معمل التشريح (Anatomy Lab)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('histology')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Microscope className="w-3.5 h-3.5 text-cyan-400" />
                  <span>معمل علم الأنسجة (Histology Lab)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('biochemistry')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                  <span>معمل الكيمياء الحيوية (Biochemistry Lab)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Developer & Ownership Spotlight Card */}
          <div className="md:col-span-3 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-purple-950/20 border border-purple-500/30 rounded-2xl p-4 space-y-2 text-right shadow-lg" dir="rtl">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-purple-300 font-bold">
                <Award className="w-4 h-4 text-purple-400" />
                <span>تطوير وإشراف المبادرة</span>
              </div>
              <span className="text-[10px] font-mono text-purple-300 px-1.5 py-0.5 rounded bg-purple-500/20">
                Owner
              </span>
            </div>

            <p className="text-sm font-black text-white">
              سكينة أسعد
            </p>
            <p className="text-[11px] text-slate-400 leading-snug">
              صاحبة ومطورة منصة LAB HUB التعليمية الطبية
            </p>

            {onOpenAbout && (
              <button
                type="button"
                onClick={onOpenAbout}
                className="w-full text-center text-xs font-bold py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 transition-colors shadow-xs mt-1 cursor-pointer"
              >
                عن المنصة وحقوق الملكية
              </button>
            )}
          </div>
        </div>

        {/* Bottom Tier: Exact Software Ownership & Copyright as Mandated */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left" dir="ltr">
            <span className="font-bold text-slate-200">© LAB HUB</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-300 font-medium">Developed by Sakina Asaad</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-purple-300 font-medium" dir="rtl">تطوير: سكينة أسعد</span>
          </div>

          <div className="text-slate-400 text-center sm:text-right text-[11px]">
            جميع الحقوق محفوظة للمنصة • منصة المعامل الطبية والامتحانات العملية
          </div>
        </div>
      </div>
    </footer>
  );
};
