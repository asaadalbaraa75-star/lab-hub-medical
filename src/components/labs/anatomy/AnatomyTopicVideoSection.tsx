/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Anatomy Topic-Matched Micro-Lecture Component
 * Features direct topic-matched YouTube lectures (Dr. Mohamed Alaa, Ninja Nerd, Sam Webster, AnatomyZone),
 * interactive chapter seeking, high-yield takeaways, and full Admin / Educator controls.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  AnatomyTopicVideo,
  AnatomyTopicVideoChapter,
  CandidateLecture,
  anatomyVideoService,
  DEFAULT_ANATOMY_VIDEOS
} from './AnatomyVideoService';
import { AnatomyTopic } from './AnatomyData';
import { authService } from '../../../services/authService';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Award,
  BookOpen,
  Clock,
  Search,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Check,
  AlertCircle,
  HelpCircle,
  ListOrdered,
  Layers,
  GraduationCap,
  Stethoscope,
  Info,
  Youtube,
  ShieldCheck,
  Bookmark,
  Share2,
  Lock,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface AnatomyTopicVideoSectionProps {
  topic: AnatomyTopic;
  onVideoComplete?: (topicId: string) => void;
}

export const AnatomyTopicVideoSection: React.FC<AnatomyTopicVideoSectionProps> = ({
  topic,
  onVideoComplete
}) => {
  const [video, setVideo] = useState<AnatomyTopicVideo | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [activeLectureYoutubeId, setActiveLectureYoutubeId] = useState<string>('');
  const [activeLectureTitle, setActiveLectureTitle] = useState<string>('');
  const [activeLectureInstructor, setActiveLectureInstructor] = useState<string>('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isPlayingEmbed, setIsPlayingEmbed] = useState<boolean>(false);

  // User role state
  const currentUser = authService.getSession().user;
  const isTeacherOrAdmin = currentUser.role === 'admin' || currentUser.role === 'instructor';

  // Admin edit form state
  const [editYoutubeId, setEditYoutubeId] = useState<string>('');
  const [editTitleEn, setEditTitleEn] = useState<string>('');
  const [editTitleAr, setEditTitleAr] = useState<string>('');
  const [editInstructor, setEditInstructor] = useState<string>('');
  const [editInstructorTitle, setEditInstructorTitle] = useState<string>('');
  const [editChannel, setEditChannel] = useState<string>('');
  const [editDuration, setEditDuration] = useState<string>('');
  const [editMatchQuality, setEditMatchQuality] = useState<'DIRECT_EXACT' | 'CURATED_HIGH' | 'SUPPLEMENTAL'>('DIRECT_EXACT');
  const [editMatchReasonEn, setEditMatchReasonEn] = useState<string>('');
  const [editMatchReasonAr, setEditMatchReasonAr] = useState<string>('');
  const [editObjectivesText, setEditObjectivesText] = useState<string>('');
  const [editTakeawaysText, setEditTakeawaysText] = useState<string>('');
  const [editChaptersText, setEditChaptersText] = useState<string>('');
  const [editIsApproved, setEditIsApproved] = useState<boolean>(true);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [hasAdminAccess, setHasAdminAccess] = useState<boolean>(isTeacherOrAdmin);
  const [adminStatusMessage, setAdminStatusMessage] = useState<string>('');

  // Iframe player ref
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load video on mount or topic change
  useEffect(() => {
    const loaded = anatomyVideoService.getVideoForTopic(topic.id);
    setVideo(loaded);
    if (loaded) {
      setActiveLectureYoutubeId(loaded.youtubeId);
      setActiveLectureTitle(loaded.titleEn);
      setActiveLectureInstructor(loaded.instructor);
    }
    setActiveChapterIndex(0);
    setIsPlayingEmbed(false);
  }, [topic.id]);

  const handleSelectCandidate = (candidate: CandidateLecture) => {
    setActiveLectureYoutubeId(candidate.youtubeId);
    setActiveLectureTitle(candidate.titleEn);
    setActiveLectureInstructor(candidate.instructor);
    setIsPlayingEmbed(true);
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube-nocookie.com/embed/${candidate.youtubeId}?autoplay=1&rel=0&modestbranding=1`;
    }
  };

  // Open admin modal and populate form
  const handleOpenAdminModal = () => {
    if (video) {
      setEditYoutubeId(video.youtubeId);
      setEditTitleEn(video.titleEn);
      setEditTitleAr(video.titleAr);
      setEditInstructor(video.instructor);
      setEditInstructorTitle(video.instructorTitle || '');
      setEditChannel(video.channelTitle);
      setEditDuration(video.duration);
      setEditMatchQuality(video.matchQuality);
      setEditMatchReasonEn(video.matchReasonEn);
      setEditMatchReasonAr(video.matchReasonAr);
      setEditObjectivesText(video.learningObjectives.join('\n'));
      setEditTakeawaysText(video.highYieldTakeaways.join('\n'));
      setEditChaptersText(
        video.chapters.map(c => `${c.time} | ${c.titleEn} | ${c.titleAr}`).join('\n')
      );
      setEditIsApproved(video.isApproved);
    } else {
      // Prefill defaults for this topic
      const def = DEFAULT_ANATOMY_VIDEOS[topic.id];
      setEditYoutubeId(def ? def.youtubeId : '');
      setEditTitleEn(topic.titleEn + ' - Medical Anatomy Lecture');
      setEditTitleAr(topic.titleAr + ' - محاضرة طبية');
      setEditInstructor('Dr. Mohamed Alaa & Ninja Nerd');
      setEditInstructorTitle('Lecturer of Anatomy & Embryology');
      setEditChannel('Verified Medical Channel');
      setEditDuration('12:00');
      setEditMatchQuality('DIRECT_EXACT');
      setEditMatchReasonEn(`Directly covers 1st-year medical curriculum on ${topic.titleEn}.`);
      setEditMatchReasonAr(`محاضرة مطابقة تماماً للمنهج الجامعي في ${topic.titleAr}.`);
      setEditObjectivesText('Master core anatomical landmarks\nUnderstand clinical relationships');
      setEditTakeawaysText('Key clinical diagnostic points');
      setEditChaptersText('00:00 | Introduction & Orientation | مقدمة ونظرة عامة\n03:00 | Core Anatomy | التشريح الأساسي');
      setEditIsApproved(true);
    }
    setAdminStatusMessage('');
    setIsAdminModalOpen(true);
  };

  const handleVerifyAdminPin = () => {
    if (adminPinInput === '2026' || adminPinInput === '1234' || adminPinInput === 'admin' || isTeacherOrAdmin) {
      setHasAdminAccess(true);
      setAdminStatusMessage('Admin privileges granted.');
    } else {
      setAdminStatusMessage('Invalid Admin PIN. (Default: 2026)');
    }
  };

  const handleSaveAdminVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = anatomyVideoService.extractYouTubeId(editYoutubeId) || editYoutubeId.trim();

    if (!cleanId) {
      setAdminStatusMessage('Please enter a valid YouTube Video ID or URL.');
      return;
    }

    // Parse chapters
    const parsedChapters: AnatomyTopicVideoChapter[] = editChaptersText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map((line, idx) => {
        const parts = line.split('|').map(p => p.trim());
        const time = parts[0] || `0${idx}:00`;
        const titleEn = parts[1] || `Chapter ${idx + 1}`;
        const titleAr = parts[2] || parts[1] || `القسم ${idx + 1}`;
        
        // Calculate seconds
        const timeParts = time.split(':').map(Number);
        const seconds = timeParts.length === 2 ? timeParts[0] * 60 + timeParts[1] : (timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]);

        return {
          time,
          seconds: isNaN(seconds) ? idx * 120 : seconds,
          titleEn,
          titleAr
        };
      });

    const parsedObjectives = editObjectivesText
      .split('\n')
      .map(o => o.trim())
      .filter(o => o.length > 0);

    const parsedTakeaways = editTakeawaysText
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const updated = anatomyVideoService.saveVideoForTopic(topic.id, {
      youtubeId: cleanId,
      videoUrl: `https://www.youtube.com/watch?v=${cleanId}`,
      titleEn: editTitleEn.trim(),
      titleAr: editTitleAr.trim(),
      instructor: editInstructor.trim(),
      instructorTitle: editInstructorTitle.trim(),
      channelTitle: editChannel.trim(),
      duration: editDuration.trim(),
      matchQuality: editMatchQuality,
      matchReasonEn: editMatchReasonEn.trim(),
      matchReasonAr: editMatchReasonAr.trim(),
      learningObjectives: parsedObjectives,
      highYieldTakeaways: parsedTakeaways,
      chapters: parsedChapters,
      isApproved: editIsApproved,
      verifiedBy: `Academic Board & Educator (${currentUser.name})`
    });

    setVideo(updated);
    setIsAdminModalOpen(false);
  };

  const handleResetToDefault = () => {
    if (confirm('Reset this topic video to the recommended academic medical lecture?')) {
      const def = anatomyVideoService.resetTopicToDefault(topic.id);
      setVideo(def);
      setIsAdminModalOpen(false);
    }
  };

  const handleRemoveVideo = () => {
    if (confirm('Remove video for this topic? (Will display "No highly matched lecture found" state)')) {
      anatomyVideoService.removeVideoForTopic(topic.id);
      setVideo(null);
      setIsAdminModalOpen(false);
    }
  };

  const handleSeekToChapter = (chapter: AnatomyTopicVideoChapter, index: number) => {
    setActiveChapterIndex(index);
    setIsPlayingEmbed(true);
    if (iframeRef.current && video) {
      // Reload iframe with start timestamp and autoplay
      iframeRef.current.src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&start=${chapter.seconds}&rel=0&modestbranding=1`;
    }
  };

  const handleCopyShareLink = () => {
    if (video) {
      navigator.clipboard.writeText(video.videoUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const searchAlaaUrl = anatomyVideoService.generateYouTubeSearchUrl(topic.titleEn, 'Dr Mohamed Alaa');
  const searchGeneralMedicalUrl = anatomyVideoService.generateYouTubeSearchUrl(topic.titleEn);

  return (
    <div className="space-y-6" id="anatomy-topic-video-section">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Topic-Matched Micro-Lecture & Clinical Demonstration
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Real academic medical lectures matched directly to <span className="text-indigo-400 font-bold">{topic.titleEn}</span>
          </p>
        </div>

        {/* Quick Actions & Admin Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleOpenAdminModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            title="Educator & Admin Video Controls"
          >
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span>Manage Video</span>
          </button>
        </div>
      </div>

      {/* MAIN VIDEO CARD OR EMPTY FALLBACK */}
      {video ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all">
          
          {/* RESPONSIVE VIDEO PLAYER */}
          <div className="relative aspect-video bg-black w-full overflow-hidden border-b border-slate-800">
            {isPlayingEmbed ? (
              <iframe
                ref={iframeRef}
                src={`https://www.youtube-nocookie.com/embed/${activeLectureYoutubeId || video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeLectureTitle || video.titleEn}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              /* Custom Branded Playback Overlay with Verified Medical Seal */
              <div 
                onClick={() => setIsPlayingEmbed(true)}
                className="relative w-full h-full cursor-pointer group flex items-center justify-center overflow-hidden"
              >
                {/* Thumbnail Background */}
                <img
                  src={`https://img.youtube.com/vi/${activeLectureYoutubeId || video.youtubeId}/hqdefault.jpg`}
                  alt={activeLectureTitle || video.titleEn}
                  className="w-full h-full object-cover opacity-65 group-hover:opacity-80 group-hover:scale-103 transition-all duration-500"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Quality Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white font-bold text-[11px] flex items-center gap-1.5 shadow-lg">
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Academic Medical Lecture</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-emerald-400 font-mono text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{video.relevanceScore || 95}% Match Score</span>
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-white font-mono text-xs font-bold border border-slate-800">
                  {video.duration}
                </div>

                {/* Center Big Play Button */}
                <div className="relative z-10 flex flex-col items-center gap-2 text-center p-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-600/50 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                  </div>
                  <span className="text-white text-xs sm:text-sm font-bold drop-shadow-md">
                    Click to Play Lecture with Timestamps
                  </span>
                </div>

                {/* Bottom Topic Banner */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2 z-10">
                  <div className="truncate text-left">
                    <h3 className="text-sm sm:text-base font-bold text-white truncate drop-shadow-md">
                      {activeLectureTitle || video.titleEn}
                    </h3>
                    <p className="text-xs text-slate-300 truncate">
                      Instructor: <span className="text-indigo-300 font-bold">{activeLectureInstructor || video.instructor}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* VIDEO METADATA & ACADEMIC CREDENTIALS */}
          <div className="p-5 sm:p-7 space-y-6">
            
            {/* Title & Instructor Card */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                    TOPIC #{topic.topicNumber} LECTURE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{video.relevanceScore || 95}% Relevance</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
                    {video.level || '1st Year Medical Students'}
                  </span>
                  {video.isCustomOverride && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                      Custom Faculty Curated
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {activeLectureTitle || video.titleEn}
                </h3>
                {video.titleAr && (
                  <p className="text-sm text-indigo-300 font-arabic" dir="rtl">
                    {video.titleAr}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://www.youtube.com/watch?v=${activeLectureYoutubeId || video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open on YouTube</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-all border border-slate-700"
                  title="Copy video link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* CANDIDATE LECTURES SWITCHER IF AVAILABLE */}
            {video.candidateLectures && video.candidateLectures.length > 0 && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Verified Lecture Choices (Select Instructor)
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400">Dr. Mohamed Alaa vs Board Lectures</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {video.candidateLectures.map((cand) => {
                    const isSelected = (activeLectureYoutubeId || video.youtubeId) === cand.youtubeId;
                    return (
                      <button
                        key={cand.id}
                        type="button"
                        onClick={() => handleSelectCandidate(cand)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500 shadow-lg'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="w-14 h-10 rounded-lg overflow-hidden shrink-0 relative bg-black">
                          <img
                            src={cand.thumbnailUrl}
                            alt={cand.titleEn}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 right-0 bg-black/80 text-[8px] text-white px-1 font-mono">
                            {cand.duration}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-bold text-indigo-300 truncate">
                              {cand.instructor}
                            </span>
                            <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.2 rounded border border-emerald-800/50 shrink-0">
                              {cand.relevanceScore}%
                            </span>
                          </div>
                          <p className="text-[11px] font-bold text-white line-clamp-1">
                            {cand.titleEn}
                          </p>
                          <p className="text-[9px] text-slate-400 line-clamp-1">
                            {cand.matchReason}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* INSTRUCTOR & ACADEMIC CREDENTIALS BANNER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">LECTURER / INSTRUCTOR</span>
                  <h4 className="text-sm font-bold text-white">{activeLectureInstructor || video.instructor}</h4>
                  <p className="text-xs text-slate-400">{video.instructorTitle || video.channelTitle}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">CURRICULUM ALIGNMENT</span>
                  <h4 className="text-sm font-bold text-emerald-400">{video.relevanceScore || 95}% Topic Relevance</h4>
                  <p className="text-xs text-slate-400">{video.verifiedBy}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">RUNTIME & CHAPTERS</span>
                  <h4 className="text-sm font-bold text-white">{video.duration} Minutes</h4>
                  <p className="text-xs text-slate-400">{video.chapters.length} Key Segments</p>
                </div>
              </div>

            </div>

            {/* MATCH JUSTIFICATION */}
            <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-4 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Why this lecture is recommended for {topic.titleEn}:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{video.matchReasonEn}</p>
              {video.matchReasonAr && (
                <p className="text-slate-400 font-arabic pt-1 border-t border-indigo-500/20" dir="rtl">
                  {video.matchReasonAr}
                </p>
              )}
            </div>

            {/* CHAPTER TIMELINE SEEKER */}
            {video.chapters && video.chapters.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-indigo-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Interactive Lecture Chapters & Timestamps
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400">Click to jump directly in video</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {video.chapters.map((chapter, idx) => {
                    const isActive = activeChapterIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSeekToChapter(chapter, idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                          isActive
                            ? 'bg-rose-950/40 border-rose-500 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold ${
                            isActive ? 'bg-rose-500 text-white' : 'bg-slate-800 text-indigo-300'
                          }`}>
                            {chapter.time}
                          </span>
                          <Play className={`w-3 h-3 ${isActive ? 'text-rose-400 fill-current' : 'text-slate-500'}`} />
                        </div>
                        <p className="text-xs font-bold line-clamp-1">{chapter.titleEn}</p>
                        {chapter.titleAr && (
                          <p className="text-[10px] text-slate-400 font-arabic line-clamp-1" dir="rtl">
                            {chapter.titleAr}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LEARNING OBJECTIVES & HIGH-YIELD TAKEAWAYS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              
              {/* Learning Objectives */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <BookOpen className="w-4 h-4" />
                  <span>Key Learning Objectives</span>
                </div>
                <ul className="space-y-2">
                  {video.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* High-Yield Takeaways */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Award className="w-4 h-4" />
                  <span>High-Yield Clinical Takeaways</span>
                </div>
                <ul className="space-y-2">
                  {video.highYieldTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* CURATED DISCOVERY & SEARCH MORE LECTURES */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Search className="w-3.5 h-3.5 text-indigo-400" />
                <span>Looking for more explanations for this topic?</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={searchAlaaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-indigo-300 hover:text-indigo-200 transition-all flex items-center gap-1.5"
                >
                  <Search className="w-3 h-3" />
                  <span>Search Dr. Mohamed Alaa ({topic.titleEn})</span>
                </a>

                <a
                  href={searchGeneralMedicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Search Medical Channels</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* FALLBACK: NO MATCHED VIDEO YET */
        <div className="bg-slate-900 border border-dashed border-slate-700 rounded-3xl p-8 sm:p-12 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Youtube className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg font-bold text-white">
              No highly matched lecture attached yet
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We only display verified, topic-accurate medical lectures taught by qualified medical professors. You can search YouTube directly or attach a lecture link.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
            <a
              href={searchAlaaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Search Dr. Mohamed Alaa for {topic.titleEn}</span>
            </a>

            <button
              type="button"
              onClick={handleOpenAdminModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Attach / Add YouTube Lecture</span>
            </button>
          </div>
        </div>
      )}

      {/* EDUCATOR & ADMIN VIDEO MANAGEMENT MODAL */}
      {isAdminModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in"
          onClick={() => setIsAdminModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white"
            onClick={e => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 border-b border-indigo-800/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    Manage Video for Topic #{topic.topicNumber}: {topic.titleEn}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Replace, verify, or curate topic-matched educational lectures
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
              
              {/* Security PIN check if needed */}
              {!hasAdminAccess && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Lock className="w-4 h-4" />
                    <span>Educator Security PIN Required</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Enter security PIN (Default: 2026 or 1234) to unlock educator video curation controls.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      placeholder="Enter PIN (e.g. 2026)"
                      value={adminPinInput}
                      onChange={e => setAdminPinInput(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs w-48"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyAdminPin}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                    >
                      Unlock Controls
                    </button>
                  </div>
                  {adminStatusMessage && (
                    <p className="text-[11px] text-amber-300 font-bold">{adminStatusMessage}</p>
                  )}
                </div>
              )}

              {/* Form */}
              {hasAdminAccess && (
                <form onSubmit={handleSaveAdminVideo} className="space-y-4">
                  
                  {/* Quick-Pick Verified Candidates */}
                  {((video?.candidateLectures && video.candidateLectures.length > 0) || (DEFAULT_ANATOMY_VIDEOS[topic.id]?.candidateLectures && (DEFAULT_ANATOMY_VIDEOS[topic.id]?.candidateLectures?.length ?? 0) > 0)) && (
                    <div className="bg-slate-950 p-3 rounded-2xl border border-indigo-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Quick-Select Verified Candidate Lecture:</span>
                        </span>
                        <span className="text-[10px] text-slate-400">Click to fill form</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(video?.candidateLectures || DEFAULT_ANATOMY_VIDEOS[topic.id]?.candidateLectures || []).map((cand) => (
                          <button
                            key={cand.id}
                            type="button"
                            onClick={() => {
                              setEditYoutubeId(cand.youtubeId);
                              setEditTitleEn(cand.titleEn);
                              setEditInstructor(cand.instructor);
                              setEditInstructorTitle(cand.instructorTitle);
                              setEditChannel(cand.channelTitle);
                              setEditDuration(cand.duration);
                              setEditMatchReasonEn(cand.matchReason);
                            }}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-indigo-950/50 border border-slate-800 hover:border-indigo-500 text-left transition-all cursor-pointer flex items-center gap-2"
                          >
                            <img
                              src={cand.thumbnailUrl}
                              alt={cand.titleEn}
                              className="w-10 h-7 rounded object-cover shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-bold text-white truncate">{cand.instructor}</p>
                              <p className="text-[9px] text-slate-400 truncate">{cand.titleEn}</p>
                            </div>
                            <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950 px-1 py-0.5 rounded shrink-0">
                              {cand.relevanceScore}%
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* YouTube Link / ID */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 flex items-center justify-between">
                      <span>YouTube Video URL or 11-char Video ID *</span>
                      <span className="text-[10px] text-indigo-400 font-mono">e.g. 5Ycn8GOS-oE or https://youtu.be/...</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={editYoutubeId}
                      onChange={e => setEditYoutubeId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 text-white text-xs font-mono"
                    />
                  </div>

                  {/* Title En & Ar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={editTitleEn}
                        onChange={e => setEditTitleEn(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={editTitleAr}
                        onChange={e => setEditTitleAr(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-arabic"
                      />
                    </div>
                  </div>

                  {/* Instructor & Channel */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Instructor Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Mohamed Alaa"
                        value={editInstructor}
                        onChange={e => setEditInstructor(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Instructor Title / Role</label>
                      <input
                        type="text"
                        placeholder="Lecturer of Anatomy"
                        value={editInstructorTitle}
                        onChange={e => setEditInstructorTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Duration (e.g. 11:42)</label>
                      <input
                        type="text"
                        placeholder="11:42"
                        value={editDuration}
                        onChange={e => setEditDuration(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Match Quality & Reason */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Match Quality</label>
                      <select
                        value={editMatchQuality}
                        onChange={e => setEditMatchQuality(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      >
                        <option value="DIRECT_EXACT">DIRECT_EXACT (100% Core Topic Match)</option>
                        <option value="CURATED_HIGH">CURATED_HIGH (High Yield Medical Lecture)</option>
                        <option value="SUPPLEMENTAL">SUPPLEMENTAL (General Visual Reference)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Channel / Institution</label>
                      <input
                        type="text"
                        value={editChannel}
                        onChange={e => setEditChannel(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Why this video matches the topic (English)</label>
                    <textarea
                      rows={2}
                      value={editMatchReasonEn}
                      onChange={e => setEditMatchReasonEn(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed"
                    />
                  </div>

                  {/* Chapters (One per line) */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 flex items-center justify-between">
                      <span>Video Chapters (One per line: Time | TitleEn | TitleAr)</span>
                      <span className="text-[10px] text-slate-400 font-mono">00:00 | Intro | مقدمة</span>
                    </label>
                    <textarea
                      rows={3}
                      value={editChaptersText}
                      onChange={e => setEditChaptersText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono leading-relaxed"
                    />
                  </div>

                  {/* Learning Objectives & Takeaways */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Learning Objectives (1 per line)</label>
                      <textarea
                        rows={3}
                        value={editObjectivesText}
                        onChange={e => setEditObjectivesText(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">High-Yield Takeaways (1 per line)</label>
                      <textarea
                        rows={3}
                        value={editTakeawaysText}
                        onChange={e => setEditTakeawaysText(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Approval Check */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="check-approved"
                      checked={editIsApproved}
                      onChange={e => setEditIsApproved(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="check-approved" className="text-xs text-slate-300 font-bold cursor-pointer">
                      Mark as Verified & Approved by Academic Faculty
                    </label>
                  </div>

                  {/* Form Footer Actions */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleResetToDefault}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset to Default</span>
                      </button>

                      {video && (
                        <button
                          type="button"
                          onClick={handleRemoveVideo}
                          className="px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove Video</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAdminModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save Video Changes</span>
                      </button>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
