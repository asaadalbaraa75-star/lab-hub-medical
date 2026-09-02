import React, { useState, useRef } from 'react';
import { 
  EDUCATIONAL_VIDEOS, 
  EducationalVideo 
} from '../../data/educationalVideosData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Video, 
  ListOrdered,
  Search,
  Check
} from 'lucide-react';

interface Props {
  onVideoCompleted?: (videoId: string) => void;
}

export const EducationalVideosSection: React.FC<Props> = ({ onVideoCompleted }) => {
  const [selectedVideo, setSelectedVideo] = useState<EducationalVideo>(EDUCATIONAL_VIDEOS[0]);
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'anatomy' | 'histology' | 'bacteriology' | 'biochemistry'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Video playback state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  // Watched state { videoId: boolean }
  const [completedVideos, setCompletedVideos] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('labhub_completed_videos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const filteredVideos = EDUCATIONAL_VIDEOS.filter(v => {
    const matchSubject = selectedSubject === 'all' || v.subjectId === selectedSubject;
    const matchSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        v.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(e => console.error(e));
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (!duration && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
    // Auto-complete if watched > 90%
    if (videoRef.current.currentTime / videoRef.current.duration > 0.9) {
      markAsCompleted(selectedVideo.id);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextSpeed = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const markAsCompleted = (id: string) => {
    setCompletedVideos(prev => {
      const updated = { ...prev, [id]: true };
      localStorage.setItem('labhub_completed_videos', JSON.stringify(updated));
      return updated;
    });
    if (onVideoCompleted) onVideoCompleted(id);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div id="educational-videos-section" className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* 1. HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/50 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1.5">
                <Video className="w-3.5 h-3.5" />
                <span>Micro-Lectures (~3 Mins)</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                High-Yield Practical Demonstrations
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              3-Minute Medical Laboratory Video Masterclasses
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Concise, step-by-step video walkthroughs of laboratory protocols, histological spotters, osteological bony landmarks, and biochemical assays.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-5 py-3 text-center">
            <span className="text-xs text-slate-400 font-medium">Completed Modules</span>
            <p className="text-lg font-bold text-rose-400 mt-0.5">
              {Object.keys(completedVideos).length} / {EDUCATIONAL_VIDEOS.length}
            </p>
          </div>
        </div>
      </div>

      {/* 2. SUBJECT FILTERS */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Videos' },
            { id: 'anatomy', label: 'Anatomy' },
            { id: 'histology', label: 'Histology' },
            { id: 'bacteriology', label: 'Bacteriology' },
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

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* 3. MAIN VIDEO PLAYER & PLAYLIST LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Player & Takeaways (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
            
            {/* Video Player: YouTube or HTML5 */}
            {selectedVideo.youtubeId ? (
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-black flex items-center justify-center group">
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.thumbnailUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                  onEnded={() => {
                    setIsPlaying(false);
                    markAsCompleted(selectedVideo.id);
                  }}
                  className="w-full h-full object-contain"
                  playsInline
                />

                {/* Big Play Overlay Button if Paused */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute w-16 h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-10 cursor-pointer"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                )}

                {/* Bottom Video Controls Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex flex-col space-y-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  
                  {/* Scrub Timeline */}
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />

                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center space-x-3">
                      <button onClick={togglePlay} className="hover:text-white transition cursor-pointer">
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                      </button>

                      <button 
                        onClick={() => {
                          setIsMuted(!isMuted);
                          if (videoRef.current) videoRef.current.muted = !isMuted;
                        }} 
                        className="hover:text-white transition cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span className="font-mono text-[11px]">
                        {formatTime(currentTime)} / {formatTime(duration || 195)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSpeedChange}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-rose-300 cursor-pointer"
                      >
                        {playbackRate}x
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video Meta Info */}
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold uppercase">
                      {selectedVideo.subjectId}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {selectedVideo.topic}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {selectedVideo.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Instructor: {selectedVideo.instructor}
                  </p>
                </div>

                <button
                  onClick={() => markAsCompleted(selectedVideo.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    completedVideos[selectedVideo.id]
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{completedVideos[selectedVideo.id] ? 'Completed ✓' : 'Mark Watched'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedVideo.description}
              </p>

              {/* Chapters Jump Bar */}
              {selectedVideo.chapters && selectedVideo.chapters.length > 0 && (
                <div className="pt-3 border-t border-slate-800/80">
                  <p className="text-xs font-bold text-slate-400 mb-2 flex items-center space-x-1.5">
                    <ListOrdered className="w-3.5 h-3.5 text-rose-400" />
                    <span>Video Chapters</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedVideo.chapters.map((chap, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const [min, sec] = chap.time.split(':').map(Number);
                          const seekSec = min * 60 + sec;
                          if (videoRef.current) {
                            videoRef.current.currentTime = seekSec;
                            setCurrentTime(seekSec);
                            videoRef.current.play().catch(e => console.error(e));
                            setIsPlaying(true);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition flex items-center space-x-1.5"
                      >
                        <span className="text-rose-400 font-mono font-semibold">{chap.time}</span>
                        <span>{chap.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* High Yield Takeaways */}
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-rose-300 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Key Practical Takeaways</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedVideo.highYieldTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                      <span className="text-rose-400 font-bold text-xs mt-0.5">&bull;</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist Sidebar (1 col) */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-4 space-y-3 flex flex-col h-full max-h-[750px] overflow-y-auto custom-scrollbar">
          <h3 className="text-sm font-bold text-white px-1 flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span>Micro-Lecture Library ({filteredVideos.length})</span>
          </h3>

          <div className="space-y-2 flex-1">
            {filteredVideos.map(video => {
              const isSelected = selectedVideo.id === video.id;
              const isDone = completedVideos[video.id];

              return (
                <button
                  key={video.id}
                  onClick={() => {
                    setSelectedVideo(video);
                    setIsPlaying(false);
                    setCurrentTime(0);
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                    }
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-rose-950/30 border-rose-500/60 shadow-lg shadow-rose-500/10'
                      : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="relative w-16 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold uppercase text-rose-400">
                        {video.subjectId}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{video.duration}</span>
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-200 truncate">
                      {video.title}
                    </h4>
                    
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {video.topic}
                    </p>

                    {isDone && (
                      <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-400 font-bold mt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
