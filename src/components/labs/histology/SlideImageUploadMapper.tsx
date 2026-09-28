import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Link,
  Image as ImageIcon,
  Check,
  X,
  RotateCcw,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import {
  getCustomSlideImage,
  setCustomSlideImage,
  removeCustomSlideImage
} from '../../../utils/slideImageStorage';

interface SlideImageUploadMapperProps {
  slideKey: string;
  slideTitle: string;
  onImageChange?: (newUrl: string | null) => void;
  compact?: boolean;
}

export const SlideImageUploadMapper: React.FC<SlideImageUploadMapperProps> = ({
  slideKey,
  slideTitle,
  onImageChange,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const current = getCustomSlideImage(slideKey);
    setCustomImage(current);
    if (current) {
      setPreviewUrl(current);
    }
  }, [slideKey]);

  // Handle local file upload (converts to Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('حجم الصورة كبير جداً. الحد الأقصى الموصى به هو 8 ميغابايت.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreviewUrl(base64);
      setUrlInput('');
      setSuccessMsg('تم تحميل الصورة بنجاح! انقر على "حفظ وتطبيق" لتثبيتها.');
    };
    reader.onerror = () => {
      setErrorMsg('تعذر قراءة ملف الصورة. حاول مرة أخرى.');
    };
    reader.readAsDataURL(file);
  };

  // Save selected image
  const handleSave = () => {
    const targetImage = previewUrl || (urlInput.trim() ? urlInput.trim() : null);
    if (!targetImage) {
      setErrorMsg('يرجى اختيار صورة من جهازك أو لصق رابط مباشر أولاً.');
      return;
    }

    setCustomSlideImage(slideKey, targetImage);
    setCustomImage(targetImage);
    onImageChange?.(targetImage);
    setSuccessMsg('تم تعيين الصورة للشريحة وحفظها بنجاح!');
    setTimeout(() => {
      setIsOpen(false);
      setSuccessMsg(null);
    }, 1200);
  };

  // Reset to default
  const handleReset = () => {
    removeCustomSlideImage(slideKey);
    setCustomImage(null);
    setPreviewUrl(null);
    setUrlInput('');
    setErrorMsg(null);
    setSuccessMsg('تمت استعادة الرسم المجهري الافتراضي فائق الدقة.');
    onImageChange?.(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setTimeout(() => {
      setIsOpen(false);
      setSuccessMsg(null);
    }, 1000);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            customImage
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/80 shadow-sm'
              : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
          }`}
          title="تعيين أو رفع صورة الشريحة الحقيقية من الملزمة"
        >
          <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
          <span>{customImage ? '✓ صورة مخصصة من الملزمة' : '📷 رفع صورة الملزمة الحقيقية'}</span>
        </button>

        {customImage && !compact && (
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-400 transition"
            title="حذف الصورة المخصصة والعودة للرسم المجهري الافتراضي"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Upload & Asset Mapper Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200"
            dir="rtl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
                    <ImageIcon className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-white">
                    تعيين صورة الشريحة المجهرية الحقيقية
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  {slideTitle}
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction banner */}
            <div className="p-3 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-xs text-teal-200 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                قم برفع صورة الشريحة الحقيقية من ملزمة الدكتورة رقية شرف الدين أو ملزمتك الجامعية لتظهر مكان الرسم، ويتم حفظها محلياً على جهازك تلقائياً.
              </div>
            </div>

            {/* Options tabs/inputs */}
            <div className="space-y-4">
              {/* Option A: File Upload */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-teal-400" />
                  <span>الخيار الأول: رفع ملف صورة من جهازك (JPG / PNG)</span>
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-slate-400 file:mr-0 file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-600 file:text-white hover:file:bg-teal-500 cursor-pointer"
                />
              </div>

              {/* Option B: Direct URL */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Link className="w-4 h-4 text-cyan-400" />
                  <span>الخيار الثاني: إدخال رابط الصورة المباشر أو Base64</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      if (e.target.value.trim().startsWith('http') || e.target.value.trim().startsWith('data:image')) {
                        setPreviewUrl(e.target.value.trim());
                      }
                    }}
                    placeholder="https://... أو data:image/png;base64,..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                  {urlInput && (
                    <button
                      type="button"
                      onClick={() => setPreviewUrl(urlInput.trim())}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                    >
                      معاينة
                    </button>
                  )}
                </div>
              </div>

              {/* Live Preview */}
              {previewUrl && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400">معاينة الصورة المختارة:</span>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-slate-700 shadow-inner">
                    <img
                      src={previewUrl}
                      alt="معاينة الشريحة"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Error & Success Messages */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-300 text-xs font-bold transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة الرسم الأصلي</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold transition"
                >
                  إلغاء
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-teal-600/30"
                >
                  <Check className="w-4 h-4" />
                  <span>حفظ وتطبيق الصورة</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
