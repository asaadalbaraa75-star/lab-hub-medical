/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Global Platform Footer & Ownership Attribution Component
 */

import React from 'react';
import {
  ShieldCheck,
  Award,
  Heart,
  BookOpen,
  Microscope,
  Bone,
  Bug,
  FlaskConical,
  ExternalLink,
  Lock
} from 'lucide-react';
import { LabHubLogo } from './LabHubLogo';

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
      className="mt-12 bg-white border-t border-[#E2E8F0] py-8 px-4 sm:px-6 lg:px-8 text-slate-600 transition-colors"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Tier: Brand, Mission, & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Brand & Purpose Description */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <LabHubLogo size="sm" showTagline={false} />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
              منصة المعامل الطبية الذكية الموحدة لطلاب الطب في السنوات قبل السريرية، تجمع بين المعامل التشريحية، المجهرية، الجرثومية، واختبارات الكيمياء الحيوية مع أنظمة الامتحانات العملية التفاعلية (OSPE).
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Production Security Enforced</span>
              </span>
              {onOpenSecurityAudit && (
                <button
                  type="button"
                  onClick={onOpenSecurityAudit}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Security Audit</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Laboratory Nav Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              المعامل المعتمدة
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('anatomy')}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <Bone className="w-3.5 h-3.5 text-indigo-500" />
                  <span>معمل التشريح (Anatomy Lab)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('histology')}
                  className="hover:text-teal-600 transition-colors flex items-center gap-1.5"
                >
                  <Microscope className="w-3.5 h-3.5 text-teal-500" />
                  <span>معمل علم الأنسجة (Histology Lab)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('biochemistry')}
                  className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-amber-500" />
                  <span>معمل الكيمياء الحيوية (Biochemistry Lab)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Creator Attribution Card */}
          <div className="md:col-span-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-right">
            <div className="flex items-center justify-end gap-2 text-indigo-700 font-bold text-xs">
              <span>إشراف وتطوير المبادرة</span>
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-xs font-bold text-slate-800">
              سكينة أسعد
            </p>
            <p className="text-[11px] text-slate-500 leading-snug">
              صاحبة ومطورة المبادرة الأكاديمية لمعامل كلية الطب
            </p>
            {onOpenAbout && (
              <button
                type="button"
                onClick={onOpenAbout}
                className="w-full text-center text-xs font-semibold py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-indigo-600 transition-colors shadow-2xs mt-1"
              >
                عن المنصة والمشروع
              </button>
            )}
          </div>
        </div>

        {/* Bottom Tier: Exact Copyright Notice as Mandated */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
            <span className="font-bold text-slate-700">LAB HUB</span>
            <span className="hidden sm:inline">•</span>
            <span>© 2026 All Rights Reserved. Educational Platform — Original Project</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <span>Created and developed by:</span>
            <strong className="text-slate-800 font-bold">سكينة أسعد</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};
