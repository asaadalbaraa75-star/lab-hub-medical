import React, { useState } from 'react';
import {
  Video,
  Play,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
  Clock,
  ShieldCheck,
  Maximize2,
  Minimize2,
  AlertCircle
} from 'lucide-react';

export interface DoctorVideoProps {
  videoId?: string;
  youtubeUrl?: string;
  title: string;
  titleAr?: string;
  doctorName?: string;
  doctorTitle?: string;
  channelTitle?: string;
  duration?: string;
  objectives?: string[];
  highYieldPoints?: string[];
  status?: 'active' | 'coming_soon';
  compact?: boolean;
}

export const DoctorVideoSection: React.FC<DoctorVideoProps> = ({
  videoId,
  youtubeUrl,
  title,
  titleAr,
  doctorName = 'Faculty of Medical Biochemistry',
  doctorTitle = 'Medical Biochemistry & Clinical Pathology',
  channelTitle,
  duration = '06:15',
  objectives = [],
  highYieldPoints = [],
  status = 'active',
  compact = false
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const effectiveVideoId = videoId?.trim();
  const isAvailable = status === 'active' && effectiveVideoId;
  const directUrl = youtubeUrl || (effectiveVideoId ? `https://www.youtube.com/watch?v=${effectiveVideoId}` : '#');
  const embedUrl = effectiveVideoId
    ? `https://www.youtube-nocookie.com/embed/${effectiveVideoId}?autoplay=1&rel=0&modestbranding=1`
    : '';
  const thumbnail = effectiveVideoId
    ? `https://img.youtube.com/vi/${effectiveVideoId}/hqdefault.jpg`
    : '';

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isExpanded
          ? 'bg-[#060D1A] border-amber-500/80 shadow-2xl ring-2 ring-amber-500/20'
          : 'bg-gradient-to-b from-[#0B132B]/90 via-[#0A1128]/80 to-[#070D1E]/95 border-slate-700/70 hover:border-amber-500/50 shadow-lg'
      }`}
      id={`doctor-video-${effectiveVideoId || 'pending'}`}
    >
      {/* Top Banner Header: Doctor Explanation Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-mono font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>🎥 DOCTOR EXPLANATION • شرح الطبيب المعتمد</span>
              </span>
              {duration && (
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{duration}</span>
                </span>
              )}
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1">
              {title}
            </h4>
            {titleAr && (
              <p className="text-xs text-amber-400 font-arabic font-medium">
                {titleAr}
              </p>
            )}
          </div>
        </div>

        {/* Doctor Identity & Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold text-slate-200">{doctorName}</div>
            <div className="text-[10px] text-slate-400 font-mono">{doctorTitle}</div>
          </div>

          {isAvailable && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
              title={isExpanded ? 'Collapse' : 'Expand Theater Mode'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

          {isAvailable && (
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold transition-colors"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Main Video Stage Area */}
      <div className="p-4 sm:p-5 space-y-4">
        {isAvailable ? (
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl aspect-video w-full group">
            {isPlaying ? (
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div
                onClick={() => setIsPlaying(true)}
                className="relative w-full h-full cursor-pointer overflow-hidden flex items-center justify-center group/stage"
              >
                {/* Video High-Res Thumbnail */}
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover filter brightness-90 group-hover/stage:brightness-100 group-hover/stage:scale-105 transition-all duration-500"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Pulsing Play Button */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.5)] group-hover/stage:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current translate-x-0.5" />
                  </div>
                  <div className="bg-[#0F172A]/90 px-3.5 py-1.5 rounded-full border border-amber-500/40 backdrop-blur-md text-xs font-bold text-amber-300 shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>انقر للمشاهدة والشرح العملي (Click to Play)</span>
                  </div>
                </div>

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 pointer-events-none">
                  <span className="font-mono bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
                    {doctorName}
                  </span>
                  <span className="font-mono bg-amber-950/80 text-amber-300 px-2.5 py-1 rounded-md border border-amber-800">
                    High Definition 1080p
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Verified Placeholder if Video Pending Faculty Approval */
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-700/80 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono">
                <span>Faculty Review Status: Under Peer Verification</span>
              </div>
              <h5 className="text-sm font-bold text-white">
                فيديو الشرح العملي قيد المراجعة والاعتماد الأكاديمي
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                يتم اختيار الفيديوهات الطبية في منصة LAB HUB وفق معايير صارمة للمطابقة العلمية والمنهجية الطبية، وسيتم إرفاق التسجيل المعتمد مباشرة بعد استكمال التوثيق.
              </p>
            </div>
          </div>
        )}

        {/* High-Yield Learning Points & Objectives */}
        {((objectives && objectives.length > 0) || (highYieldPoints && highYieldPoints.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {objectives && objectives.length > 0 && (
              <div className="bg-[#0F172A]/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>أهداف الشرح المخبري (Learning Objectives)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span className="leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {highYieldPoints && highYieldPoints.length > 0 && (
              <div className="bg-[#0F172A]/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Award className="w-3.5 h-3.5" />
                  <span>نقاط امتحانية هامة (High-Yield Takeaways)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {highYieldPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
