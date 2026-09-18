/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * Unified Manual Device Image Upload Component
 * Supported Formats: JPG, JPEG, PNG, WEBP
 */

import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Trash2, RefreshCw, ZoomIn, Check, AlertCircle, Eye, X } from 'lucide-react';

interface ManualImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (imageUrl: string, metadata?: { name: string; size: number }) => void;
  onImageRemoved?: () => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'video' | 'square' | 'auto';
  className?: string;
  disabled?: boolean;
}

export const ManualImageUpload: React.FC<ManualImageUploadProps> = ({
  currentImageUrl,
  onImageUploaded,
  onImageRemoved,
  label = 'رفع صورة من جهازك (Manual Device Upload)',
  helperText = 'يدعم JPG, PNG, WEBP. اختيار مباشر من هاتفك أو حاسوبك',
  aspectRatio = 'auto',
  className = '',
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Compress & convert file to Web-Ready high quality Data URL
  const processFile = (file: File) => {
    if (!file) return;

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMessage('صيغة غير مدعومة. يرجى اختيار ملف JPG أو PNG أو WEBP.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onerror = () => {
      setErrorMessage('حدث خطأ أثناء قراءة الملف من جهازك.');
      setIsProcessing(false);
    };

    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        setIsProcessing(false);
        return;
      }

      // Resize if oversized (> 1600px) to keep local storage & performance ultra-fast
      const img = new Image();
      img.onerror = () => {
        // Fallback to original data url
        onImageUploaded(result, { name: file.name, size: file.size });
        setIsProcessing(false);
      };

      img.onload = () => {
        try {
          const maxDim = 1600;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedUrl = canvas.toDataURL('image/jpeg', 0.88);
              onImageUploaded(compressedUrl, { name: file.name, size: Math.round(compressedUrl.length * 0.75) });
              setIsProcessing(false);
              return;
            }
          }

          // If size is appropriate, use directly
          onImageUploaded(result, { name: file.name, size: file.size });
          setIsProcessing(false);
        } catch {
          onImageUploaded(result, { name: file.name, size: file.size });
          setIsProcessing(false);
        }
      };

      img.src = result;
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleTriggerInput = () => {
    if (disabled || isProcessing) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-700">
          {label}
        </label>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isProcessing}
      />

      {currentImageUrl ? (
        /* Image Preview Box with Replace & Delete Controls */
        <div className="relative rounded-2xl border-2 border-indigo-200 bg-slate-900/90 overflow-hidden group shadow-sm">
          <div className={`w-full flex items-center justify-center ${
            aspectRatio === 'video' ? 'aspect-video' : aspectRatio === 'square' ? 'aspect-square' : 'max-h-64'
          } p-2`}>
            <img
              src={currentImageUrl}
              alt="Uploaded Preview"
              className="max-h-60 max-w-full object-contain rounded-xl"
            />
          </div>

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm transition"
              title="معاينة بالحجم الكامل"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>معاينة</span>
            </button>

            <button
              type="button"
              onClick={handleTriggerInput}
              disabled={disabled || isProcessing}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
              title="استبدال بصورة أخرى من جهازك"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>استبدال</span>
            </button>

            {onImageRemoved && (
              <button
                type="button"
                onClick={onImageRemoved}
                disabled={disabled || isProcessing}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                title="حذف الصورة"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف</span>
              </button>
            )}
          </div>

          {/* Verified Badge */}
          <div className="absolute bottom-2 right-2 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-xs">
            <Check className="w-3 h-3" />
            <span>صورة حقيقية مرفوعة</span>
          </div>
        </div>
      ) : (
        /* Empty State Dropzone */
        <div
          onClick={handleTriggerInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]'
              : 'border-slate-300 hover:border-indigo-400 bg-slate-50/60 hover:bg-indigo-50/20'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100/80 border border-indigo-200 text-indigo-600 flex items-center justify-center">
            {isProcessing ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-800">
              {isProcessing ? 'جاري معالجة الصورة...' : 'اضغط لاختيار صورة من جهازك، أو اسحب الملف هنا'}
            </p>
            <p className="text-[11px] text-slate-500">
              {helperText}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-semibold text-slate-600 shadow-2xs">
            <span>JPG</span> • <span>PNG</span> • <span>WEBP</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 pt-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Full Preview Modal */}
      {isPreviewModalOpen && currentImageUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-950 rounded-3xl border border-white/20 overflow-hidden shadow-2xl p-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white">
              <span className="text-xs font-bold">معاينة الصورة بالحجم الطبيعي</span>
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-4 flex items-center justify-center max-h-[75vh] overflow-auto">
              <img
                src={currentImageUrl}
                alt="Full View"
                className="max-h-[70vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
