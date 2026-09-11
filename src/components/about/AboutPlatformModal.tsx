/*
 * © LAB HUB · Developed by Sakina Asaad
 * تطوير: سكينة أسعد
 * 
 * About Platform, Software Ownership & Intellectual Property Modal
 * Core Platform Component — Brand Identity & Copyright Protection
 */

import React from 'react';
import {
  X,
  Sparkles,
  Award,
  BookOpen,
  Microscope,
  Bone,
  FlaskConical,
  ShieldCheck,
  Heart,
  Share2
} from 'lucide-react';
import { CompanionAvatarSvg } from '../companion/CompanionAvatarSvg';

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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0D091B] border border-purple-500/30 rounded-3xl w-full max-w-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-purple-950 via-[#0E081A] to-indigo-950 text-white relative overflow-hidden flex items-center justify-between border-b border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1 text-right flex-1 pl-4" dir="rtl">
            <div className="flex items-center justify-start gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                منصة المعامل والامتحانات العملية
              </span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              نبذة عن منصة LAB HUB
            </h2>
            <p className="text-xs text-purple-300/80">
              الملكية الفكرية ورؤية المنصة الطبية التعليمية
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="relative z-10 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-right text-slate-200" dir="rtl">
          {/* Official Mandated Platform Ownership Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/40 shadow-inner space-y-3 text-left" dir="ltr">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">LAB HUB</h3>
                <p className="text-xs font-semibold text-purple-300">
                  Medical Laboratory Practical Examination Platform
                </p>
                <p className="text-xs font-bold text-slate-300 mt-1">
                  Developed by Sakina Asaad
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center p-1">
                <CompanionAvatarSvg expression="proud" size={42} isAnimated={false} />
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-2 border-t border-white/10 pt-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>© LAB HUB • All Rights Reserved</span>
                <span className="text-purple-300 font-medium" dir="rtl">تطوير: سكينة أسعد</span>
              </div>
            </div>
          </div>

          {/* Lead Creator Attribution Card */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div className="flex items-center gap-3.5 order-2 sm:order-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div className="text-center sm:text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 bg-purple-500/20 px-2.5 py-0.5 rounded-md inline-block mb-1 border border-purple-500/30">
                    تطوير وإشراف المبادرة • Developer & Owner
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    سكينة أسعد
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    صاحبة ومطورة منصة LAB HUB التعليمية
                  </p>
                </div>
              </div>

              <div className="order-1 sm:order-2 px-3 py-1 bg-purple-950/60 border border-purple-500/30 rounded-xl text-purple-300 text-xs font-bold flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>إهداء إلى دفعة طلاب الطب البشري</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-3 border-t border-white/10">
              تم تأسيس وتطوير منصة <strong>LAB HUB</strong> بواسطة <strong>سكينة أسعد</strong> كمبادرة تعليمية موحدة لتيسير الوصول إلى المعامل الطبية لطلاب الطب البشري، وتوفير مرجع علمي عملي دقيق يجمع بين محطات التشريح، شرائح الأنسجة المجهرية، واختبارات الكيمياء الحيوية، واختبارات الـ OSPE التفاعلية في منصة مركزية واحدة.
            </p>
          </div>

          {/* Study Companion "Labeeb" Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/30 flex items-center gap-4">
            <div className="shrink-0 p-1 rounded-2xl bg-purple-900/40 border border-purple-500/40">
              <CompanionAvatarSvg expression="welcome" size={60} isAnimated={true} />
            </div>
            <div className="space-y-1 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>الرفيق الدراسي الكرتوني: "لبيب" (Labeeb)</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <p className="text-slate-300 leading-relaxed">
                شخصية كرتونية تعليمية أصلية حصرية لمنصة LAB HUB، تهدف إلى تشجيع وتحفيز طالب الطب أثناء المذاكرة وحل الأسئلة والامتحانات، بعبارات عربية دافئة ونظام تحفيز مستمر.
              </p>
            </div>
          </div>

          {/* Educational Scope */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>المعامل الأساسية المشمولة في المنصة</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                  <Bone className="w-4 h-4" />
                  <span>معمل التشريح (Anatomy)</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  نماذج للجثث التعليمية، المستويات التشريحية ثلاثية الأبعاد، وحركات المفاصل.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Microscope className="w-4 h-4" />
                  <span>معمل الأنسجة (Histology)</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  مجهر رقمي تفاعلي عالي الدقة مع تكبيرات متعددة وتطبيق لاختبارات التعرف (Spotters).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <FlaskConical className="w-4 h-4" />
                  <span>الكيمياء الحيوية (Biochemistry)</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  الكواشف النوعية للسكريات، المسارات الاستقلابية، وتفسير النتائج السريرية.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onOpenShareModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenShareModal();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-bold transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                <span>مشاركة رابط المنصة</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
