/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * About Platform & Intellectual Property Modal
 */

import React from 'react';
import {
  X,
  Sparkles,
  Award,
  BookOpen,
  Microscope,
  Bone,
  Bug,
  CheckCircle2,
  Heart,
  Share2,
  ExternalLink,
  ShieldCheck,
  FlaskConical
} from 'lucide-react';
import { LabHubLogo } from '../common/LabHubLogo';

interface AboutPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenShareModal?: () => void;
}

export const AboutPlatformModal: React.FC<AboutPlatformModalProps> = ({
  isOpen,
  onClose,
  onOpenShareModal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden flex items-center justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1 text-right flex-1 pl-4">
            <div className="flex items-center justify-end gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                منصة المعامل الطبية الذكية
              </span>
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              نبذة عن منصة LAB HUB التعليمية
            </h2>
            <p className="text-xs text-slate-300">
              بيئة رقمية موحدة لتدريب طلاب الطب على المعامل التشريحية والمجهرية
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="relative z-10 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-right">
          {/* Official Mandated Platform Branding Card */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-sm space-y-3 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-white tracking-tight">LAB HUB</h3>
                <p className="text-xs font-semibold text-indigo-400">Medical Laboratory Learning Platform</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                v2.4.0 Production
              </span>
            </div>

            <div className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-3">
              <div>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider block text-slate-400">Purpose:</span>
                <p className="text-slate-200 mt-0.5">
                  Educational platform designed to help first-year medical students study laboratory and medical sciences interactively.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-white uppercase text-[11px] tracking-wider block text-slate-400">Ownership:</span>
                  <p className="text-slate-200">
                    © 2026 <strong>سكينة أسعد</strong>. All Rights Reserved.
                  </p>
                </div>
                <div className="text-[11px] text-indigo-300 font-medium">
                  Original Educational Project
                </div>
              </div>
            </div>
          </div>

          {/* Creator Attribution Spotlight Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-teal-50/40 border-2 border-indigo-200 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div className="flex items-center gap-3.5 order-2 sm:order-1">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div className="text-center sm:text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md inline-block mb-1">
                    إشراف وتطوير المنصة • Lead Creator
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    سكينة أسعد
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    صاحبة ومطورة المبادرة الأكاديمية لمعامل كلية الطب
                  </p>
                </div>
              </div>

              <div className="order-1 sm:order-2 px-3 py-1 bg-white border border-indigo-100 rounded-xl text-indigo-700 text-xs font-bold shadow-2xs flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>إهداء إلى دفعة طلاب الطب</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mt-3.5 pt-3 border-t border-indigo-100/80 font-medium">
              تم تصميم وتطوير هذه المنصة الطبية بواسطة <strong>سكينة أسعد</strong> بهدف تيسير الوصول إلى المعامل العملية لجميع الطلاب، وتوفير مرجع علمي معتمد يجمع شرائح الهستولوجي، المحطات التشريحية، بنك عينات البكتيريا، واختبارات الكيمياء الحيوية مع اختبارات الـ OSPE التفاعلية في منصة واحدة.
            </p>
          </div>

          {/* Platform Vision & Features in Arabic */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center justify-end gap-2">
              <span>ماذا تقدم المنصة للطلاب؟</span>
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1.5">
                <div className="flex items-center justify-end gap-1.5 text-indigo-700 font-bold">
                  <span>معمل التشريح (Anatomy)</span>
                  <Bone className="w-4 h-4" />
                </div>
                <p className="text-slate-600 leading-relaxed">
                  نماذج للجثث التعليمية، العظام، العضلات، الأعصاب، والأوعية الدموية مع محطات Spotters للتعرف السريع.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1.5">
                <div className="flex items-center justify-end gap-1.5 text-teal-700 font-bold">
                  <span>معمل الأنسجة (Histology)</span>
                  <Microscope className="w-4 h-4" />
                </div>
                <p className="text-slate-600 leading-relaxed">
                  مجهر رقمي تفاعلي عالي الدقة مع تكبيرات مختلفة ونقاط استدلالية واضحة للقطاعات النسيجية.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1.5">
                <div className="flex items-center justify-end gap-1.5 text-amber-700 font-bold">
                  <span>معمل الكيمياء الحيوية (Biochemistry)</span>
                  <FlaskConical className="w-4 h-4" />
                </div>
                <p className="text-slate-600 leading-relaxed">
                  فحوصات السكريات، الكواشف الكيميائية، معادلات التفاعل، وتفسير النتائج السريرية مع دليل الـ 6 اختبارات.
                </p>
              </div>
            </div>
          </div>

          {/* Scientific Language Note */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <div className="font-bold flex items-center justify-end gap-1.5">
              <span>اللغة العلمية المعتمدة</span>
              <BookOpen className="w-4 h-4 text-amber-700" />
            </div>
            <p className="text-amber-800 leading-relaxed">
              وفقاً للمعايير الطبية الدولية والمقررات الجامعية، يتم تقديم جميع المصطلحات التشريحية، الشرائح النسيجية، وبنوك الأسئلة باللغة الإنجليزية المعيارية (Medical English Standard)، بينما تتوفر واجهات التوجيه والترحيب باللغة العربية.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onOpenShareModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenShareModal();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>مشاركة رابط المنصة</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            حسناً، فهمت
          </button>
        </div>
      </div>
    </div>
  );
};
