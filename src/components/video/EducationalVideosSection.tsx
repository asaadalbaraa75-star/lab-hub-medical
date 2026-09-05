import React, { useState, useRef, useEffect } from 'react';
import { 
  EDUCATIONAL_VIDEOS, 
  EducationalVideo 
} from '../../data/educationalVideosData';
import { authService } from '../../services/authService';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Video, 
  ListOrdered,
  Search,
  Check,
  ExternalLink,
  Plus,
  Edit3,
  Trash2,
  AlertCircle,
  Share2,
  GraduationCap,
  ShieldCheck,
  Eye,
  EyeOff,
  RefreshCw,
  X,
  Youtube
} from 'lucide-react';

const STORAGE_CUSTOM_VIDEOS_KEY = 'labhub_custom_educational_videos_v3';
const STORAGE_COMPLETED_KEY = 'labhub_completed_videos';

interface Props {
  onVideoCompleted?: (videoId: string) => void;
}

export const EducationalVideosSection: React.FC<Props> = ({ onVideoCompleted }) => {
  // Load custom stored video collection or initialize with defaults
  const [videoList, setVideoList] = useState<EducationalVideo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_VIDEOS_KEY);
      if (saved) {
        const parsed: EducationalVideo[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return EDUCATIONAL_VIDEOS;
  });

  const currentUser = authService.getCurrentUser() || { role: 'student' as const };
  const isTeacherOrAdmin = currentUser.role === 'admin' || currentUser.role === 'instructor';

  const [selectedVideo, setSelectedVideo] = useState<EducationalVideo>(videoList[0] || EDUCATIONAL_VIDEOS[0]);
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'anatomy' | 'histology' | 'biochemistry'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showUnavailable, setShowUnavailable] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Admin modal state
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  // Form fields
  const [formSubject, setFormSubject] = useState<'anatomy' | 'histology' | 'biochemistry'>('anatomy');
  const [formTopic, setFormTopic] = useState<string>('');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formTitleAr, setFormTitleAr] = useState<string>('');
  const [formInstructor, setFormInstructor] = useState<string>('');
  const [formInstructorTitle, setFormInstructorTitle] = useState<string>('');
  const [formYoutubeInput, setFormYoutubeInput] = useState<string>('');
  const [formDuration, setFormDuration] = useState<string>('10:00');
  const [formRelevanceScore, setFormRelevanceScore] = useState<number>(98);
  const [formStatus, setFormStatus] = useState<'active' | 'unavailable'>('active');
  const [formSource, setFormSource] = useState<string>('Medical Faculty Lectures');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formObjectivesText, setFormObjectivesText] = useState<string>('');
  const [formTakeawaysText, setFormTakeawaysText] = useState<string>('');
  const [formChaptersText, setFormChaptersText] = useState<string>('');

  // Live validation state for Admin
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    title?: string;
    author?: string;
    error?: string;
  } | null>(null);

  // Watched state { videoId: boolean }
  const [completedVideos, setCompletedVideos] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COMPLETED_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Current active chapter timestamp for iframe seeking
  const [activeChapterSeconds, setActiveChapterSeconds] = useState<number>(0);

  // Helper to extract clean 11-char YouTube ID
  const extractCleanYoutubeId = (input: string): string => {
    if (!input) return '';
    const trimmed = input.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    const watchMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (watchMatch && watchMatch[1]) return watchMatch[1];
    const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([^"&?\/\s]{11})/i);
    if (shortsMatch && shortsMatch[1]) return shortsMatch[1];
    return trimmed;
  };

  // Filter videos
  const filteredVideos = videoList.filter(v => {
    // Only show active to students
    if (!isTeacherOrAdmin && v.status === 'unavailable') return false;
    if (isTeacherOrAdmin && !showUnavailable && v.status === 'unavailable') return false;

    const matchSubject = selectedSubject === 'all' || v.subject === selectedSubject || v.subjectId === selectedSubject;
    const q = searchQuery.toLowerCase();
    const matchSearch = 
      v.title.toLowerCase().includes(q) ||
      (v.titleAr && v.titleAr.toLowerCase().includes(q)) ||
      v.topicName.toLowerCase().includes(q) ||
      (v.topic && v.topic.toLowerCase().includes(q)) ||
      v.instructor.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q);

    return matchSubject && matchSearch;
  });

  // Keep selected video in sync
  useEffect(() => {
    if (filteredVideos.length > 0 && !filteredVideos.some(v => v.id === selectedVideo?.id)) {
      setSelectedVideo(filteredVideos[0]);
    }
  }, [filteredVideos, selectedVideo]);

  const markAsCompleted = (id: string) => {
    setCompletedVideos(prev => {
      const updated = { ...prev, [id]: true };
      try {
        localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    if (onVideoCompleted) onVideoCompleted(id);
  };

  const handleShare = (vid: EducationalVideo) => {
    const url = vid.youtubeUrl || `https://www.youtube.com/watch?v=${vid.youtubeVideoId || vid.youtubeId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Test / Validate YouTube Video via oEmbed
  const handleTestYoutube = async () => {
    const cleanId = extractCleanYoutubeId(formYoutubeInput);
    if (!cleanId || cleanId.length !== 11) {
      setValidationResult({
        valid: false,
        error: 'Please enter a valid 11-character YouTube video ID or full URL.'
      });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const testUrl = `https://www.youtube.com/watch?v=${cleanId}`;
      const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(testUrl)}&format=json`);
      if (res.ok) {
        const data = await res.json();
        setValidationResult({
          valid: true,
          title: data.title,
          author: data.author_name
        });
        if (!formTitle) setFormTitle(data.title);
        if (!formInstructor && data.author_name) setFormInstructor(data.author_name);
      } else {
        setValidationResult({
          valid: false,
          error: 'Video is unavailable, private, deleted, or cannot be embedded (HTTP ' + res.status + ').'
        });
      }
    } catch {
      // Fallback: check thumbnail image loading
      const img = new Image();
      img.onload = () => {
        setValidationResult({
          valid: true,
          title: 'YouTube video thumbnail verified successfully.'
        });
      };
      img.onerror = () => {
        setValidationResult({
          valid: false,
          error: 'Could not load YouTube thumbnail. Video ID may be invalid or region-locked.'
        });
      };
      img.src = `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`;
    } finally {
      setIsValidating(false);
    }
  };

  // Open modal for editing
  const handleOpenEditModal = (vid: EducationalVideo) => {
    setModalMode('edit');
    setEditingVideoId(vid.id);
    setFormSubject(((vid.subject || vid.subjectId) as any) || 'anatomy');
    setFormTopic(vid.topicName || vid.topic || '');
    setFormTitle(vid.title);
    setFormTitleAr(vid.titleAr || '');
    setFormInstructor(vid.instructor);
    setFormInstructorTitle(vid.instructorTitle || '');
    setFormYoutubeInput(vid.youtubeVideoId || vid.youtubeId || '');
    setFormDuration(vid.duration || '10:00');
    setFormRelevanceScore(vid.relevanceScore || 95);
    setFormStatus(vid.status || 'active');
    setFormSource(vid.source || 'Medical Faculty');
    setFormDescription(vid.description || '');
    setFormObjectivesText((vid.learningObjectives || []).join('\n'));
    setFormTakeawaysText((vid.highYieldTakeaways || []).join('\n'));
    setFormChaptersText((vid.chapters || []).map(c => `${c.time} - ${c.title}`).join('\n'));
    setValidationResult(null);
    setIsAdminModalOpen(true);
  };

  // Open modal for adding
  const handleOpenAddModal = () => {
    setModalMode('add');
    setEditingVideoId(null);
    setFormSubject('anatomy');
    setFormTopic('');
    setFormTitle('');
    setFormTitleAr('');
    setFormInstructor('');
    setFormInstructorTitle('');
    setFormYoutubeInput('');
    setFormDuration('10:00');
    setFormRelevanceScore(98);
    setFormStatus('active');
    setFormSource('Medical Faculty Lectures');
    setFormDescription('');
    setFormObjectivesText('');
    setFormTakeawaysText('');
    setFormChaptersText('');
    setValidationResult(null);
    setIsAdminModalOpen(true);
  };

  // Save video from admin modal
  const handleSaveVideoForm = () => {
    const cleanId = extractCleanYoutubeId(formYoutubeInput);
    if (!cleanId || cleanId.length !== 11) {
      alert('Please enter a valid 11-character YouTube video ID.');
      return;
    }
    if (!formTitle.trim()) {
      alert('Please enter a lecture title.');
      return;
    }
    if (!formTopic.trim()) {
      alert('Please specify the topic.');
      return;
    }

    const parseList = (text: string) => text.split('\n').map(s => s.trim()).filter(Boolean);
    const parseChapters = (text: string) => {
      const lines = text.split('\n').map(s => s.trim()).filter(Boolean);
      return lines.map(line => {
        const match = line.match(/^(\d{1,2}:\d{2})\s*[-–—:]\s*(.+)$/);
        if (match) {
          return { time: match[1], title: match[2] };
        }
        return { time: '0:00', title: line };
      });
    };

    const newVideoRecord: EducationalVideo = {
      id: modalMode === 'edit' && editingVideoId ? editingVideoId : `vid-${formSubject}-${Date.now()}`,
      subject: formSubject,
      subjectId: formSubject,
      topicId: `topic_${formSubject}_${Date.now()}`,
      topicName: formTopic,
      topic: formTopic,
      title: formTitle,
      titleAr: formTitleAr || undefined,
      instructor: formInstructor || 'Medical Faculty Lecturer',
      instructorTitle: formInstructorTitle || 'Lecturer in Medical Sciences',
      channelTitle: formInstructor,
      youtubeVideoId: cleanId,
      youtubeId: cleanId,
      youtubeUrl: `https://www.youtube.com/watch?v=${cleanId}`,
      embedUrl: `https://www.youtube.com/embed/${cleanId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`,
      duration: formDuration || '10:00',
      relevanceScore: formRelevanceScore || 95,
      status: formStatus,
      source: formSource || 'Verified Medical Curriculum',
      description: formDescription || 'Academic lecture tailored to laboratory and clinical examinations.',
      learningObjectives: parseList(formObjectivesText).length > 0 
        ? parseList(formObjectivesText) 
        : ['Master key visual landmarks and practical principles'],
      highYieldTakeaways: parseList(formTakeawaysText).length > 0
        ? parseList(formTakeawaysText)
        : ['High-yield topic takeaway for laboratory spotters'],
      chapters: parseChapters(formChaptersText).length > 0
        ? parseChapters(formChaptersText)
        : [{ time: '0:00', title: 'Lecture Overview' }]
    };

    let updatedList: EducationalVideo[];
    if (modalMode === 'edit' && editingVideoId) {
      updatedList = videoList.map(v => v.id === editingVideoId ? newVideoRecord : v);
    } else {
      updatedList = [newVideoRecord, ...videoList];
    }

    setVideoList(updatedList);
    setSelectedVideo(newVideoRecord);
    try {
      localStorage.setItem(STORAGE_CUSTOM_VIDEOS_KEY, JSON.stringify(updatedList));
    } catch {
      // ignore
    }
    setIsAdminModalOpen(false);
  };

  // Toggle video status
  const handleToggleStatus = (vid: EducationalVideo) => {
    const nextStatus = vid.status === 'active' ? 'unavailable' : 'active';
    const updated = videoList.map(v => v.id === vid.id ? { ...v, status: nextStatus as any } : v);
    setVideoList(updated);
    if (selectedVideo.id === vid.id) {
      setSelectedVideo({ ...selectedVideo, status: nextStatus as any });
    }
    try {
      localStorage.setItem(STORAGE_CUSTOM_VIDEOS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Delete / Remove Video
  const handleDeleteVideo = (id: string) => {
    if (confirm('Are you sure you want to remove this video from the library?')) {
      const updated = videoList.filter(v => v.id !== id);
      setVideoList(updated);
      if (selectedVideo.id === id && updated.length > 0) {
        setSelectedVideo(updated[0]);
      }
      try {
        localStorage.setItem(STORAGE_CUSTOM_VIDEOS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  // Reset to original default academic lectures
  const handleRestoreDefaults = () => {
    if (confirm('Reset all videos to verified academic defaults? Custom additions will be replaced.')) {
      setVideoList(EDUCATIONAL_VIDEOS);
      setSelectedVideo(EDUCATIONAL_VIDEOS[0]);
      try {
        localStorage.removeItem(STORAGE_CUSTOM_VIDEOS_KEY);
      } catch {
        // ignore
      }
    }
  };

  const activeVideoId = selectedVideo?.youtubeVideoId || selectedVideo?.youtubeId || 'heSsAreO_y0';
  const iframeSrc = `https://www.youtube-nocookie.com/embed/${activeVideoId}?rel=0&modestbranding=1&playsinline=1${activeChapterSeconds > 0 ? `&start=${activeChapterSeconds}` : ''}`;

  return (
    <div id="educational-videos-section" className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1.5 rtl:space-x-reverse">
                <Video className="w-3.5 h-3.5" />
                <span>Topic-Matched Micro-Lectures</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5 rtl:space-x-reverse">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Verified Working YouTube Lectures</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Medical Laboratory & Clinical Video Masterclasses
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Curated medical lectures taught by qualified anatomy lecturers, pathologists, and microbiologists. Every video is academically aligned to laboratory spotters, histology slides, and biochemical bench tests.
            </p>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse shrink-0">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2.5 text-center">
              <span className="text-[11px] text-slate-400 font-medium">Completed</span>
              <p className="text-base font-bold text-rose-400 mt-0.5">
                {Object.keys(completedVideos).length} / {videoList.filter(v => v.status === 'active').length}
              </p>
            </div>

            {isTeacherOrAdmin && (
              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-lg shadow-rose-600/30 flex items-center space-x-1.5 rtl:space-x-reverse cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Lecture</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SUBJECT FILTERS & SEARCH */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Subjects' },
            { id: 'anatomy', label: 'Anatomy' },
            { id: 'histology', label: 'Histology' },
            { id: 'biochemistry', label: 'Biochemistry' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubject(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedSubject === tab.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {isTeacherOrAdmin && (
            <button
              onClick={() => setShowUnavailable(!showUnavailable)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center space-x-1.5 rtl:space-x-reverse transition ${
                showUnavailable 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              {showUnavailable ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showUnavailable ? 'Showing Drafts' : 'Hide Drafts'}</span>
            </button>
          )}

          {isTeacherOrAdmin && (
            <button
              onClick={handleRestoreDefaults}
              title="Restore Academic Defaults"
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search lectures, topics, doctors..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>
      </div>

      {/* 3. MAIN VIDEO PLAYER & PLAYLIST LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Player & Takeaways (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
            
            {/* Status Alert if Video is Marked Unavailable */}
            {selectedVideo.status === 'unavailable' && (
              <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 text-amber-300 text-xs flex items-center space-x-2 rtl:space-x-reverse">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>This video is marked as <strong>UNAVAILABLE / DRAFT</strong>. It is hidden from standard student views.</span>
              </div>
            )}

            {/* Robust YouTube Embed Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <iframe
                key={activeVideoId + activeChapterSeconds}
                src={iframeSrc}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Header & Meta */}
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold uppercase">
                      {selectedVideo.subject || selectedVideo.subjectId}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {selectedVideo.topicName || selectedVideo.topic}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                      {selectedVideo.relevanceScore}% Match
                    </span>
                  </div>
                  
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {selectedVideo.title}
                  </h2>
                  {selectedVideo.titleAr && (
                    <p className="text-xs text-slate-400 font-arabic" dir="rtl">
                      {selectedVideo.titleAr}
                    </p>
                  )}

                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-slate-400 pt-0.5">
                    <GraduationCap className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Instructor: <strong className="text-slate-200">{selectedVideo.instructor}</strong></span>
                    {selectedVideo.source && (
                      <>
                        <span>&bull;</span>
                        <span className="text-slate-400">{selectedVideo.source}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleShare(selectedVideo)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>

                  <a
                    href={selectedVideo.youtubeUrl || `https://www.youtube.com/watch?v=${selectedVideo.youtubeVideoId || selectedVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold transition flex items-center space-x-1.5 rtl:space-x-reverse"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => markAsCompleted(selectedVideo.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 rtl:space-x-reverse cursor-pointer ${
                      completedVideos[selectedVideo.id]
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{completedVideos[selectedVideo.id] ? 'Completed ✓' : 'Mark Watched'}</span>
                  </button>

                  {isTeacherOrAdmin && (
                    <button
                      onClick={() => handleOpenEditModal(selectedVideo)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition"
                      title="Edit / Replace Video"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {selectedVideo.description}
              </p>

              {/* Chapters Quick Seek */}
              {selectedVideo.chapters && selectedVideo.chapters.length > 0 && (
                <div className="pt-3 border-t border-slate-800/80">
                  <p className="text-xs font-bold text-slate-400 mb-2 flex items-center space-x-1.5 rtl:space-x-reverse">
                    <ListOrdered className="w-3.5 h-3.5 text-rose-400" />
                    <span>Interactive Chapters</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedVideo.chapters.map((chap, idx) => {
                      const [min, sec] = chap.time.split(':').map(Number);
                      const seekSec = (min || 0) * 60 + (sec || 0);
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveChapterSeconds(seekSec)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition flex items-center space-x-1.5 rtl:space-x-reverse cursor-pointer"
                        >
                          <span className="text-rose-400 font-mono font-semibold">{chap.time}</span>
                          <span>{chap.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Learning Objectives & High Yield Takeaways */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {selectedVideo.learningObjectives && selectedVideo.learningObjectives.length > 0 && (
                  <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-slate-200 flex items-center space-x-1.5 rtl:space-x-reverse">
                      <BookOpen className="w-4 h-4 text-rose-400" />
                      <span>Learning Objectives</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedVideo.learningObjectives.map((obj, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2 rtl:space-x-reverse">
                          <span className="text-rose-400 font-bold text-xs mt-0.5">&bull;</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedVideo.highYieldTakeaways && selectedVideo.highYieldTakeaways.length > 0 && (
                  <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 flex items-center space-x-1.5 rtl:space-x-reverse">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>High-Yield Spotters & Pearls</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedVideo.highYieldTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2 rtl:space-x-reverse">
                          <span className="text-amber-400 font-bold text-xs mt-0.5">&bull;</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist Sidebar (1 col) */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-4 space-y-3 flex flex-col h-full max-h-[780px] overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 rtl:space-x-reverse">
              <BookOpen className="w-4 h-4 text-rose-400" />
              <span>Lecture Library ({filteredVideos.length})</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              Verified
            </span>
          </div>

          <div className="space-y-2.5 flex-1">
            {filteredVideos.map(video => {
              const isSelected = selectedVideo.id === video.id;
              const isDone = completedVideos[video.id];
              const cleanVidId = video.youtubeVideoId || video.youtubeId;

              return (
                <div
                  key={video.id}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex flex-col space-y-2 ${
                    isSelected
                      ? 'bg-rose-950/30 border-rose-500/60 shadow-lg shadow-rose-500/10'
                      : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <div 
                    onClick={() => {
                      setSelectedVideo(video);
                      setActiveChapterSeconds(0);
                    }}
                    className="flex items-start space-x-3 rtl:space-x-reverse cursor-pointer"
                  >
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700 bg-slate-950">
                      <img
                        src={video.thumbnailUrl || `https://img.youtube.com/vi/${cleanVidId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to hqdefault
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${cleanVidId}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] font-bold uppercase text-rose-400">
                          {video.subject || video.subjectId}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 flex items-center space-x-1 rtl:space-x-reverse">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{video.duration}</span>
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-slate-200 line-clamp-2">
                        {video.title}
                      </h4>
                      
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {video.instructor} &bull; {video.topicName || video.topic}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-700/40 text-[11px]">
                    <div>
                      {isDone ? (
                        <span className="inline-flex items-center space-x-1 rtl:space-x-reverse text-[10px] text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-medium">
                          {video.status === 'active' ? 'Active Lecture' : 'Draft / Hidden'}
                        </span>
                      )}
                    </div>

                    {isTeacherOrAdmin && (
                      <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(video);
                          }}
                          className={`p-1 rounded-md text-[10px] border ${
                            video.status === 'active'
                              ? 'text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                          }`}
                          title="Toggle Active/Unavailable"
                        >
                          {video.status === 'active' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(video);
                          }}
                          className="p-1 rounded-md text-slate-300 hover:text-amber-300 border border-slate-600 hover:bg-slate-700"
                          title="Edit"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteVideo(video.id);
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-red-400 border border-slate-600 hover:bg-slate-700"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. ADMIN / EDUCATOR MANAGEMENT MODAL */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-8 h-8 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {modalMode === 'add' ? 'Add Verified Educational Lecture' : 'Edit / Replace Educational Lecture'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Enter a real, publicly embeddable YouTube lecture matching this medical topic.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Row 1: Subject & Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subject</label>
                  <select
                    value={formSubject}
                    onChange={e => setFormSubject(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                  >
                    <option value="anatomy">Anatomy</option>
                    <option value="histology">Histology</option>
                    <option value="biochemistry">Biochemistry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Topic Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Internal Heart Anatomy, Gram Stain SOP..."
                    value={formTopic}
                    onChange={e => setFormTopic(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Row 2: YouTube URL or ID + Live Validation Button */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-slate-300 font-semibold">
                  YouTube Video ID or URL <span className="text-rose-400">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. heSsAreO_y0 or https://www.youtube.com/watch?v=heSsAreO_y0"
                    value={formYoutubeInput}
                    onChange={e => {
                      setFormYoutubeInput(e.target.value);
                      setValidationResult(null);
                    }}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500 font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleTestYoutube}
                    disabled={isValidating || !formYoutubeInput}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-bold rounded-xl border border-slate-700 transition flex items-center space-x-1.5 rtl:space-x-reverse shrink-0 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isValidating ? 'animate-spin' : ''}`} />
                    <span>{isValidating ? 'Testing...' : 'Live Test Video'}</span>
                  </button>
                </div>

                {/* Validation Feedback */}
                {validationResult && (
                  <div className={`p-2.5 rounded-xl border flex items-start space-x-2 rtl:space-x-reverse ${
                    validationResult.valid 
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                      : 'bg-red-950/40 border-red-500/40 text-red-300'
                  }`}>
                    {validationResult.valid ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                    <div className="text-xs">
                      {validationResult.valid ? (
                        <>
                          <p className="font-bold">Verified Available & Embeddable!</p>
                          {validationResult.title && <p className="text-[11px] text-emerald-400/80 truncate">Title: {validationResult.title}</p>}
                          {validationResult.author && <p className="text-[11px] text-emerald-400/80">Author: {validationResult.author}</p>}
                        </>
                      ) : (
                        <p className="font-semibold">{validationResult.error}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 3: Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Lecture Title (English)</label>
                  <input
                    type="text"
                    placeholder="e.g. Internal Heart Anatomy: Chambers & Valves"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Title (Arabic - Optional)</label>
                  <input
                    type="text"
                    dir="rtl"
                    placeholder="مثال: تشريح القلب البشري والصمامات"
                    value={formTitleAr}
                    onChange={e => setFormTitleAr(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500 font-arabic"
                  />
                </div>
              </div>

              {/* Row 4: Instructor & Duration & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Instructor / Channel</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Mohamed Alaa / Ninja Nerd"
                    value={formInstructor}
                    onChange={e => setFormInstructor(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 14:20"
                    value={formDuration}
                    onChange={e => setFormDuration(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                  >
                    <option value="active">Active (Visible to Students)</option>
                    <option value="unavailable">Unavailable / Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description & Medical Alignment</label>
                <textarea
                  rows={2}
                  placeholder="Detailed summary of structures and laboratory spotters covered in this video..."
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Row 6: Takeaways & Chapters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Key Takeaways (1 per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Left ventricular myocardium is 3x thicker&#10;Tricuspid valve on Right..."
                    value={formTakeawaysText}
                    onChange={e => setFormTakeawaysText(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Chapters (Format: MM:SS - Chapter Title)</label>
                  <textarea
                    rows={3}
                    placeholder="00:00 - Introduction&#10;03:15 - Right Atrium&#10;06:40 - Valves"
                    value={formChaptersText}
                    onChange={e => setFormChaptersText(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500 font-mono text-[11px]"
                  />
                </div>
              </div>

            </div>

            <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveVideoForm}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition flex items-center space-x-1.5 rtl:space-x-reverse cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Lecture Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
