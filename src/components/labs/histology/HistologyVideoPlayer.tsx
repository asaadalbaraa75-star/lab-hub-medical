import React, { useState } from 'react';
import { Play, AlertCircle, RefreshCw, Video, ExternalLink } from 'lucide-react';
import { MediaVideoBlock, convertToEmbedUrl } from '../../../data/histologyJsonData';

interface HistologyVideoPlayerProps {
  video: MediaVideoBlock;
  className?: string;
}

export const HistologyVideoPlayer: React.FC<HistologyVideoPlayerProps> = ({
  video,
  className = ''
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const embedUrl = convertToEmbedUrl(video.fixed_embed_url || video.original_url);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl ${className}`}>
      {/* Video Title Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-snug">
              {video.title || 'فيديو الشرح المجهري والتطبيقي'}
            </h4>
            <span className="text-[11px] text-teal-400 font-mono">
              Medical Histology Practical Demonstration
            </span>
          </div>
        </div>

        {video.original_url && (
          <a
            href={video.original_url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-xs text-slate-400 hover:text-teal-400 flex items-center gap-1 transition px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 shrink-0"
          >
            <span>المصدر</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Main Video Viewport or Fallback */}
      <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
        {hasError || !embedUrl ? (
          /* Fallback UI requested by user: "الفيديو قيد التحديث" */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 space-y-3 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h5 className="text-base font-bold text-white">
                الفيديو قيد التحديث ومتاح قريباً
              </h5>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                يتم حالياً مزامنة وسائط هذا الشرح المجهري مع السيرفر لضمان التشغيل الدقيق وبأعلى جودة. يمكنك مراجعة شريحة الشرح النظري وبنك الأسئلة أدناه.
              </p>
            </div>

            <button
              onClick={handleRetry}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>إعادة المحاولة</span>
            </button>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-slate-400">جاري تحميل مشغل الفيديو الطبي...</span>
                </div>
              </div>
            )}

            <iframe
              src={embedUrl}
              title={video.title || 'Histology Video'}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
