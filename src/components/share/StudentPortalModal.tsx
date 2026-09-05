import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  Send,
  MessageCircle,
  Mail,
  Smartphone,
  BookOpen,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'guide'>('link');

  if (!isOpen) return null;

  // Retrieve actual URL or fallback to window.location.href
  const portalUrl = typeof window !== 'undefined' ? window.location.href : 'https://medlab-portal.edu';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🥼 منصة المعامل الطبية الذكية للطلاب | LAB HUB Medical Platform\nإشراف وتطوير: سكينة أسعد\n\nرابط الدخول المباشر لمعامل التشريح، الأنسجة، البكتيريا، واختبارات الكيمياء الحيوية:\n${portalUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent(
      `منصة المعامل الطبية الذكية (Anatomy, Histology, Biochemistry) — تطوير: سكينة أسعد:\n${portalUrl}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(portalUrl)}&text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('LAB HUB Medical Platform Access Link | رابط منصة المعامل الطبية — تطوير: سكينة أسعد');
    const body = encodeURIComponent(
      `Dear Medical Student,\n\nHere is the access link to our Medical Laboratory Learning Platform covering Anatomy, Histology, and Biochemistry (Created by Sukaina Asaad):\n\n${portalUrl}\n\nGood luck with your practicals!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-50/70 via-white to-slate-50 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-sm">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  رابط المنصة للطلاب
                </h3>
                <span className="text-xs font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md font-semibold">
                  Student Portal Link
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                شارك رابط المنصة مع زملائك والطلاب للوصول الفوري للمختبرات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 border border-[#E2E8F0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E2E8F0] bg-slate-50 px-5 pt-2 gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'link'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Copy className="w-3.5 h-3.5" />
            <span>رابط المشاركة السريع</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'qr'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>رمز الاستجابة (QR Code)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>إرشادات الطلاب</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {activeTab === 'link' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Arabic Welcome & Instructions Card */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-right">
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded-md">
                    إشراف وتطوير: سكينة أسعد
                  </span>
                  <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-xs">
                    <span>منصة تعليمية متكاملة لطلاب الطب</span>
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  يمكن للطلاب فتح هذا الرابط مباشرة من أجهزة الكمبيوتر أو الهواتف والأجهزة اللوحية داخل قاعة المعمل لمتابعة التدريبات العملية والاختبارات الفورية.
                </p>
              </div>

              {/* Copy URL Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                  Direct Student Access URL / الرابط المباشر للمنصة
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      value={portalUrl}
                      className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-mono focus:outline-none select-all"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0 ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>نسخ الرابط</span>
                      </>
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    تم نسخ الرابط بنجاح! يمكنك الآن لصقه وإرساله للطلاب في مجموعات الدفعة.
                  </p>
                )}
              </div>

              {/* Direct Social / Messenger Share Buttons */}
              <div className="pt-2">
                <span className="block text-xs font-bold text-slate-700 mb-2">
                  مشاركة سريعة عبر التطبيقات:
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTelegramShare}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition-colors"
                  >
                    <Send className="w-4 h-4 text-sky-600" />
                    <span>Telegram</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailShare}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-colors"
                  >
                    <Mail className="w-4 h-4 text-slate-600" />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="text-center space-y-4 animate-in fade-in duration-150 py-2">
              <div className="inline-block p-4 bg-white border-2 border-indigo-100 rounded-2xl shadow-md">
                {/* SVG Visual Representation of QR Code */}
                <div className="w-48 h-48 bg-slate-900 p-3 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="w-full h-full bg-white p-2 rounded-lg flex flex-col justify-between">
                    {/* Top Row Corners */}
                    <div className="flex justify-between">
                      <div className="w-10 h-10 border-4 border-slate-900 p-1 flex items-center justify-center">
                        <div className="w-4 h-4 bg-slate-900" />
                      </div>
                      <div className="flex-1 px-2 flex flex-col justify-center gap-1">
                        <div className="h-1.5 bg-slate-900 w-full" />
                        <div className="h-1.5 bg-slate-900 w-2/3" />
                      </div>
                      <div className="w-10 h-10 border-4 border-slate-900 p-1 flex items-center justify-center">
                        <div className="w-4 h-4 bg-slate-900" />
                      </div>
                    </div>

                    {/* Middle grid */}
                    <div className="my-2 flex flex-col gap-1">
                      <div className="flex justify-between gap-1">
                        <div className="h-2 bg-slate-900 w-1/4" />
                        <div className="h-2 bg-indigo-600 w-1/3" />
                        <div className="h-2 bg-slate-900 w-1/4" />
                      </div>
                      <div className="flex justify-between gap-1">
                        <div className="h-2 bg-indigo-600 w-1/3" />
                        <div className="h-2 bg-slate-900 w-1/4" />
                        <div className="h-2 bg-indigo-600 w-1/3" />
                      </div>
                      <div className="flex justify-between gap-1">
                        <div className="h-2 bg-slate-900 w-1/2" />
                        <div className="h-2 bg-slate-900 w-1/3" />
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex justify-between items-end">
                      <div className="w-10 h-10 border-4 border-slate-900 p-1 flex items-center justify-center">
                        <div className="w-4 h-4 bg-slate-900" />
                      </div>
                      <div className="flex-1 px-2 flex flex-col justify-end gap-1">
                        <div className="h-1.5 bg-indigo-600 w-3/4" />
                        <div className="h-1.5 bg-slate-900 w-full" />
                      </div>
                      <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white text-[10px] font-bold">
                        LAB
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  امسح الرمز بكاميرا الهاتف للوصول السريع
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  يمكن عرض هذا الرمز على شاشات العرض داخل قاعات ومعامل الكلية ليدخل الطلاب مباشرة.
                </p>
              </div>

              <div className="flex justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الرابط النصي</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 animate-in fade-in duration-150 text-right">
              <div className="bg-slate-50 border border-[#E2E8F0] rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 flex items-center justify-end gap-2">
                  <span>خطوات استخدام المنصة للطلاب</span>
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                </h4>
                <ol className="space-y-2.5 text-xs text-slate-600 pr-4 list-decimal leading-relaxed">
                  <li>
                    <strong className="text-slate-800">الدخول المباشر:</strong> افتح الرابط في أي متصفح ويب على هاتفك أو حاسوبك المحمول.
                  </li>
                  <li>
                    <strong className="text-slate-800">اختيار المعمل:</strong> تصفح أقسام (Anatomy, Histology, Biochemistry) للاطلاع على الدروس والشرائح.
                  </li>
                  <li>
                    <strong className="text-slate-800">المجهر التفاعلي والـ Spotters:</strong> افتح الشرائح المكبرة واختبر مهارات التعرف السريع على العينات.
                  </li>
                  <li>
                    <strong className="text-slate-800">الاختبارات الذاتية:</strong> أجب على بنوك الأسئلة للتحضير لامتحانات الـ OSPE والعملي النهائي.
                  </li>
                </ol>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-800">
                <span className="font-medium">المحتوى العلمي الطبي متاح باللغة الإنجليزية المعيارية</span>
                <span className="font-bold text-[11px] bg-amber-200/60 px-2 py-0.5 rounded text-amber-900">
                  Medical Standard
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-[#E2E8F0] flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono truncate max-w-[280px]">
            {portalUrl}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-[#E2E8F0] transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
