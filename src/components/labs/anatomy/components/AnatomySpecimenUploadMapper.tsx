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
  getCustomAnatomyImage,
  setCustomAnatomyImage,
  removeCustomAnatomyImage
} from '../../../../utils/anatomyImageStorage';

interface AnatomySpecimenUploadMapperProps {
  specimenKey: string;
  specimenTitle: string;
  onImageChanged?: (dataUrl: string | null) => void;
  className?: string;
}

export const AnatomySpecimenUploadMapper: React.FC<AnatomySpecimenUploadMapperProps> = ({
  specimenKey,
  specimenTitle,
  onImageChanged,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const existing = getCustomAnatomyImage(specimenKey);
    setCustomImage(existing);
  }, [specimenKey]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('حجم الصورة كبير جداً (الحد الأقصى 5 ميجابايت).');
      return;
    }

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) {
        setCustomAnatomyImage(specimenKey, dataUrl);
        setCustomImage(dataUrl);
        setSuccessMsg('تم تعيين وحفظ صورة العينة الحقيقية بنجاح!');
        if (onImageChanged) onImageChanged(dataUrl);
        setTimeout(() => {
          setSuccessMsg(null);
          setIsOpen(false);
        }, 1500);
      }
    };
    reader.onerror = () => {
      setErrorMsg('حدث خطأ أثناء قراءة ملف الصورة.');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    try {
      const url = new URL(inputUrl.trim());
      if (!url.protocol.startsWith('http')) {
        setErrorMsg('يرجى إدخال رابط صورة صالح يبدأ بـ http:// أو https://');
        return;
      }
    } catch {
      setErrorMsg('الرابط المدخل غير صالح.');
      return;
    }

    setErrorMsg(null);
    setCustomAnatomyImage(specimenKey, inputUrl.trim());
    setCustomImage(inputUrl.trim());
    setSuccessMsg('تم تعيين رابط الصورة بنجاح!');
    if (onImageChanged) onImageChanged(inputUrl.trim());
    setInputUrl('');
    setTimeout(() => {
      setSuccessMsg(null);
      setIsOpen(false);
    }, 1500);
  };

  const handleResetToDefault = () => {
    removeCustomAnatomyImage(specimenKey);
    setCustomImage(null);
    setSuccessMsg('تمت استعادة صورة العينة الرسمية المعتمدة.');
    if (onImageChanged) onImageChanged(null);
    setTimeout(() => {
      setSuccessMsg(null);
      setIsOpen(false);
    }, 1200);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
          customImage
            ? 'bg-amber-950/80 border-amber-600/70 text-amber-300 hover:bg-amber-900 shadow-sm'
            : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white'
        }`}
        title="تعيين أو استبدال صورة العينة من ملزمة الكلية"
      >
        <ImageIcon className="w-3 h-3 shrink-0" />
        <span>
          {customImage ? 'صورة العينة مخصصة 📷' : 'تعيين صورة من الملزمة 📷'}
        </span>
      </button>

      {/* Dropdown / Modal Popover */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 text-right animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white">
                تعيين صورة العينة الحقيقية
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
            العينة الحالية: <strong className="text-emerald-300">{specimenTitle}</strong>.
            يمكنك رفع صورتها المباشرة من ملزمة الكلية أو إدخال رابطها.
          </p>

          {/* Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl mb-3 border border-slate-800">
            <button
              type="button"
              onClick={() => { setMode('upload'); setErrorMsg(null); }}
              className={`flex-1 py-1 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                mode === 'upload'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3 h-3" />
              <span>رفع ملف صورة</span>
            </button>
            <button
              type="button"
              onClick={() => { setMode('url'); setErrorMsg(null); }}
              className={`flex-1 py-1 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                mode === 'url'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Link className="w-3 h-3" />
              <span>إدخال رابط صورة</span>
            </button>
          </div>

          {/* Upload Mode */}
          {mode === 'upload' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-4 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl bg-slate-950 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group"
              >
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                <span className="text-xs font-bold text-slate-300 group-hover:text-white">
                  اختر صورة من جهازك
                </span>
                <span className="text-[10px] text-slate-500">
                  يدعم صور JPG, PNG, WebP حتى 5MB
                </span>
              </button>
            </div>
          )}

          {/* URL Mode */}
          {mode === 'url' && (
            <form onSubmit={handleUrlSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://example.com/specimen.jpg"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-left dir-ltr"
                />
              </div>
              <button
                type="submit"
                disabled={!inputUrl.trim()}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>حفظ الرابط</span>
              </button>
            </form>
          )}

          {/* Messages */}
          {errorMsg && (
            <div className="mt-2.5 p-2 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-300 text-[10px] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="mt-2.5 p-2 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-[10px] flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Reset button if custom image exists */}
          {customImage && (
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-amber-300 font-medium">
                الصورة المخصصة نشطة ومحفوظة
              </span>
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-[10px] text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>استعادة الأصلية</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
