import React, { useState } from 'react';
import { sanitizeToEmbedUrl } from '../../../data/histologyJsonData';
import {
  Video,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Play
} from 'lucide-react';

interface HistologyVideoPlayerProps {
  originalUrl?: string;
  fixedEmbedUrl?: string;
  title?: string;
  description?: string;
}

export const HistologyVideoPlayer: React.FC<HistologyVideoPlayerProps> = ({
  originalUrl = '',
  fixedEmbedUrl = '',
  title = 'شرح مجهري مرئي',
  description = ''
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  // Compute robust embed url
  const effectiveEmbedUrl = sanitizeToEmbedUrl(fixedEmbedUrl || originalUrl);

  const handleRetry = () => {
    setIsRetrying(true);
    setHasError(false);
    setTimeout(() => {
      setIsRetrying(false);
    }, 600);
  };

  const handleOpenExternal = () => {
    const targetUrl = originalUrl || fixedEmbedUrl;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const isInvalidUrl = !effectiveEmbedUrl || hasError;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Video Header */}
      <div className="px-4 py-3 bg-slate-850/80 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-tight">
              {title}
            </h4>
            {description && (
              <p className="text-xs text-slate-400 line-clamp-1">{description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20">
            <ShieldCheck className="w-3 h-3 text-teal-400" />
            <span>EMBED SECURE</span>
          </span>
          {originalUrl && (
            <button
              onClick={handleOpenExternal}
              title="فتح الرابط في نافذة جديدة"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Video Viewport or Fallback Card */}
      <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center">
        {isInvalidUrl ? (
          /* Sleek Fallback Card (كود الحماية المعتمد) */
          <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center space-y-4 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5 max-w-md">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase">
                تنبيه تشغيل الفيديو
              </span>
              <h5 className="text-base sm:text-lg font-bold text-white">
                الفيديو قيد التحديث ومتاح قريباً عبر المنصة
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                يتم حالياً مزامنة السيرفر وتجهيز الرابط الآمن. يمكنك إعادة التحميل أو فتح الرابط الخارجي المعتمد مباشرة.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                <span>إعادة المحاولة</span>
              </button>

              {originalUrl && (
                <button
                  type="button"
                  onClick={handleOpenExternal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>فتح الرابط الأصلي</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <iframe
            src={effectiveEmbedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onError={() => setHasError(true)}
          />
        )}
      </div>

      {/* Video Footer */}
      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>Histology Clinical Demonstration</span>
        </span>
        <span className="text-[11px] text-slate-400">
          دقة عالية • وضع ملء الشاشة مدعوم
        </span>
      </div>
    </div>
  );
};
