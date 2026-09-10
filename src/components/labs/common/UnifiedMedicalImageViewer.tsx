import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Upload,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  Compass,
  Activity,
  Trash2,
  Check,
  X,
  Target,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import {
  MedicalImageRecord,
  MedicalImageHotspot,
  medicalMediaService
} from './MedicalMediaService';
import { OfficialMedicalAtlasMap } from './OfficialMedicalAtlasMaps';
import { AnatomyTopicVisual } from '../anatomy/AnatomyTopicVisuals';
import { HistologySanaaAtlasVisual } from '../histology/HistologySanaaAtlasVisuals';

interface UnifiedMedicalImageViewerProps {
  subject: 'anatomy' | 'histology';
  topicOrLessonId: string;
  topicTitle: string;
  topicTitleAr?: string;
  className?: string;
  customVisualId?: string; // Optional fallback visual ID for histology
  onLaunchPracticalExam?: () => void;
}

export const UnifiedMedicalImageViewer: React.FC<UnifiedMedicalImageViewerProps> = ({
  subject,
  topicOrLessonId,
  topicTitle,
  topicTitleAr,
  className = '',
  customVisualId,
  onLaunchPracticalExam
}) => {
  // Active Medical Image Record (from service)
  const [activeRecord, setActiveRecord] = useState<MedicalImageRecord>(() =>
    medicalMediaService.getPrimaryImage(subject, topicOrLessonId)
  );

  // Operating Mode: 'original' | 'learning' | 'practical'
  const [activeMode, setActiveMode] = useState<'original' | 'learning' | 'practical'>('learning');

  // Zoom & Pan
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Selected Pin / Hotspot
  const [selectedHotspot, setSelectedHotspot] = useState<MedicalImageHotspot | null>(
    activeRecord.hotspots && activeRecord.hotspots.length > 0 ? activeRecord.hotspots[0] : null
  );

  // Practical Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedQuizAttempt, setSelectedQuizAttempt] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [quizScore, setQuizScore] = useState<number>(0);

  // Upload Modal State
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);
  const [uploadReferenceText, setUploadReferenceText] = useState<string>('User Uploaded Medical Reference');
  const [uploadNotes, setUploadNotes] = useState<string>('');

  // Container refs
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reload image when topic changes
  useEffect(() => {
    const rec = medicalMediaService.getPrimaryImage(subject, topicOrLessonId);
    setActiveRecord(rec);
    setSelectedHotspot(rec.hotspots && rec.hotspots.length > 0 ? rec.hotspots[0] : null);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setCurrentQuizIndex(0);
    setQuizFeedback('idle');
  }, [subject, topicOrLessonId]);

  // Handle Zoom
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };
  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  // Handle Pin Click in Learning / Practical Mode
  const handlePinClick = (hotspot: MedicalImageHotspot) => {
    if (activeMode === 'learning') {
      setSelectedHotspot(hotspot);
    } else if (activeMode === 'practical') {
      const targetHotspot = activeRecord.hotspots[currentQuizIndex] || activeRecord.hotspots[0];
      setSelectedQuizAttempt(hotspot.pinNumber);
      if (hotspot.pinNumber === targetHotspot.pinNumber) {
        setQuizFeedback('correct');
        setQuizScore(prev => prev + 1);
      } else {
        setQuizFeedback('wrong');
      }
    }
  };

  // Practical Quiz Next Question
  const handleNextQuizQuestion = () => {
    setQuizFeedback('idle');
    setSelectedQuizAttempt(null);
    if (currentQuizIndex < activeRecord.hotspots.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setCurrentQuizIndex(0);
    }
  };

  // Handle File Selection for User Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Save Uploaded Image
  const handleSaveUpload = () => {
    if (!uploadedFilePreview) return;

    const newRecord = medicalMediaService.saveUserUploadedImage({
      subject,
      topicOrLessonId,
      title: `${topicTitle} — User Reference Image`,
      titleAr: topicTitleAr ? `${topicTitleAr} — صورة مرجعية للمستخدم` : undefined,
      dataUrl: uploadedFilePreview,
      referenceSource: uploadReferenceText,
      hasLabels: true,
      notes: uploadNotes
    });

    setActiveRecord(newRecord);
    setSelectedHotspot(newRecord.hotspots[0] || null);
    setShowUploadModal(false);
    setUploadedFilePreview(null);
  };

  // Delete / Revert User Uploaded Image
  const handleDeleteUserImage = () => {
    if (activeRecord.sourceType === 'user_upload') {
      medicalMediaService.deleteUserImage(activeRecord.id);
      const fallback = medicalMediaService.getPrimaryImage(subject, topicOrLessonId);
      setActiveRecord(fallback);
      setSelectedHotspot(fallback.hotspots[0] || null);
    }
  };

  const targetQuizHotspot = activeRecord.hotspots[currentQuizIndex] || activeRecord.hotspots[0];

  return (
    <div
      ref={containerRef}
      className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-white transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : className
      }`}
      id="unified-medical-image-viewer"
    >
      {/* 1. TOP CONTROL BAR & AUTHENTICITY BADGES */}
      <div className="bg-slate-950/90 backdrop-blur-md px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Title & Authentic Source Badge */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                subject === 'anatomy'
                  ? 'bg-blue-600 text-white'
                  : 'bg-cyan-600 text-white'
              }`}
            >
              {subject.toUpperCase()} LAB
            </span>

            {/* Primary Source Guarantee Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ORIGINAL REFERENCE IMAGE (PRIMARY SOURCE)</span>
            </div>

            {activeRecord.sourceType === 'user_upload' && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                USER UPLOADED ● PRESERVED
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              {topicTitle}
              {topicTitleAr && <span className="text-xs text-slate-400 font-normal">({topicTitleAr})</span>}
            </h3>
            <span className="text-xs text-slate-400 font-mono hidden md:inline">
              • Ref: {activeRecord.referenceSource}
            </span>
          </div>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
          {/* Mode Switcher: Original vs Learning vs Practical */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-700/80 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveMode('original')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'original'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="View pure untouched original reference image without overlays"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Original (الأصلية)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('learning')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'learning'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Interactive learning with clickable anatomical structures and notes"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Learning (التعليمية)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMode('practical');
                setQuizFeedback('idle');
                setSelectedQuizAttempt(null);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'practical'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Active spotter practical exam mode"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Practical (الاختبار)</span>
            </button>
          </div>

          {/* Upload Button */}
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold transition-all flex items-center gap-1.5"
            title="Upload/Replace reference image for this lesson"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Upload Image (رفع صورة)</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-all"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. MAIN VIEWPORT & INTERACTIVE HOTSPOT LAYER */}
      <div className="relative flex-1 bg-slate-950 overflow-hidden min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
        {/* Zoom & Pan Viewport Container */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
            cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
          className="relative w-full h-full flex items-center justify-center transition-transform duration-75 origin-center"
        >
          {/* IMAGE RENDERING */}
          {activeRecord.dataUrl ? (
            /* 1. User Uploaded Image as Primary Source */
            <img
              src={activeRecord.dataUrl}
              alt={activeRecord.title}
              className="max-w-full max-h-full object-contain select-none"
              referrerPolicy="no-referrer"
              draggable={false}
            />
          ) : subject === 'anatomy' ? (
            /* 2. Anatomy Visual Rendering */
            <div className="w-full h-full flex items-center justify-center">
              {topicOrLessonId === 'anat_overview' || topicOrLessonId === 'official_atlas_map' ? (
                <OfficialMedicalAtlasMap mapType="anatomy" activeTopicId={topicOrLessonId} showLabels={activeMode !== 'practical'} />
              ) : (
                <AnatomyTopicVisual
                  topicId={topicOrLessonId}
                  selectedPinNumber={selectedHotspot?.pinNumber}
                  activePinNumber={activeMode === 'practical' ? targetQuizHotspot?.pinNumber : undefined}
                  showLabels={activeMode !== 'practical'}
                  interactive={activeMode !== 'original'}
                  className="w-full h-full max-h-[500px]"
                />
              )}
            </div>
          ) : (
            /* 3. Histology Visual Rendering */
            <div className="w-full h-full flex items-center justify-center">
              {topicOrLessonId === 'hist_overview' || topicOrLessonId === 'official_atlas_map' ? (
                <OfficialMedicalAtlasMap mapType="histology" activeTopicId={topicOrLessonId} showLabels={activeMode !== 'practical'} />
              ) : (
                <HistologySanaaAtlasVisual
                  visualId={customVisualId || activeRecord.svgGraphicId?.replace('hist_', '') || 'simple_squamous_lung'}
                  mode={activeMode === 'learning' ? 'labeled' : 'unlabeled'}
                />
              )}
            </div>
          )}

          {/* INTERACTIVE HOTSPOT PINS (Only shown in Learning & Practical modes) */}
          {activeMode !== 'original' &&
            activeRecord.hotspots.map(spot => {
              const isSelected = selectedHotspot?.pinNumber === spot.pinNumber;
              const isTargetInQuiz = targetQuizHotspot?.pinNumber === spot.pinNumber;
              const isAttempted = selectedQuizAttempt === spot.pinNumber;

              let pinStyle = 'bg-indigo-600 text-white border-white hover:scale-125';

              if (activeMode === 'learning') {
                if (isSelected) {
                  pinStyle = 'bg-amber-500 text-slate-950 border-white scale-130 shadow-lg shadow-amber-500/60 ring-4 ring-amber-400/40';
                }
              } else if (activeMode === 'practical') {
                if (isAttempted) {
                  if (quizFeedback === 'correct') {
                    pinStyle = 'bg-emerald-500 text-white border-white scale-135 ring-4 ring-emerald-400/40';
                  } else {
                    pinStyle = 'bg-rose-600 text-white border-white scale-120 animate-shake';
                  }
                } else if (quizFeedback === 'correct' && isTargetInQuiz) {
                  pinStyle = 'bg-emerald-500 text-white border-white scale-135 ring-4 ring-emerald-400/40';
                }
              }

              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handlePinClick(spot);
                  }}
                  style={{
                    left: `${spot.posX}%`,
                    top: `${spot.posY}%`
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 font-mono font-bold text-xs flex items-center justify-center transition-all duration-200 cursor-pointer z-30 shadow-md ${pinStyle}`}
                  title={activeMode === 'learning' ? `${spot.labelEn} (${spot.labelAr})` : `Spotter #${spot.pinNumber}`}
                >
                  {spot.pinNumber}
                </button>
              );
            })}
        </div>

        {/* FLOATING ZOOM / RESET TOOLBAR */}
        <div className="absolute bottom-4 left-4 z-40 flex items-center gap-1.5 p-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-xl">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="px-2 font-mono text-xs text-slate-300 font-bold">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-700 mx-0.5" />
          <button
            type="button"
            onClick={handleResetView}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-all"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* FLOATING NOTICE FOR USER UPLOAD */}
        {activeRecord.sourceType === 'user_upload' && (
          <div className="absolute top-3 left-3 z-40 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 rounded-lg px-2.5 py-1 text-xs text-amber-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Active: User Uploaded Slide Reference</span>
            <button
              type="button"
              onClick={handleDeleteUserImage}
              className="text-rose-400 hover:text-rose-300 ml-1 p-0.5"
              title="Remove user image and restore default atlas"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 3. CONTEXTUAL INFORMATION DRAWER (LEARNING VS PRACTICAL VS ORIGINAL) */}
      <div className="bg-slate-950 border-t border-slate-800 p-4">
        {activeMode === 'original' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="space-y-1">
              <span className="font-bold text-white text-sm block">
                Pure Original Reference View (الصورة الأصلية المعتمدة)
              </span>
              <p>
                Showing the authenticated primary source without superimposed interactive overlays. Use the zoom and pan controls above to inspect minute anatomical and histological boundaries.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
              <Check className="w-4 h-4" />
              <span>Reference Integrity Preserved</span>
            </div>
          </div>
        )}

        {activeMode === 'learning' && selectedHotspot && (
          <div className="space-y-3" id="hotspot-learning-details">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center">
                  {selectedHotspot.pinNumber}
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    {selectedHotspot.labelEn}
                  </h4>
                  <span className="text-xs text-amber-400 font-semibold">
                    {selectedHotspot.labelAr}
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Click any numbered pin to inspect
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* Structure Explanation */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                  Description & Identity (الشرح والوصف)
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {selectedHotspot.explanation}
                </p>
              </div>

              {/* Location */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                  Anatomical Location (الموقع التشريحي)
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {selectedHotspot.location}
                </p>
              </div>

              {/* Function or Movement mechanics */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                  {subject === 'anatomy' ? 'Function & Movement (الوظيفة والحركة)' : 'Staining Affinity (الصفات الصبغية)'}
                </span>
                <p className="text-indigo-300 leading-relaxed">
                  {selectedHotspot.movementMechanics || selectedHotspot.stainAffinity || selectedHotspot.functionDesc}
                </p>
              </div>
            </div>

            {selectedHotspot.examTip && (
              <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>High-Yield Exam Pearl:</strong> {selectedHotspot.examTip}
                </span>
              </div>
            )}
          </div>
        )}

        {activeMode === 'practical' && (
          <div className="space-y-3" id="practical-challenge-box">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-emerald-600 text-white font-bold text-xs">
                  OSPE SPOTTER CHALLENGE
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Pin {currentQuizIndex + 1} of {activeRecord.hotspots.length} • Score: {quizScore}
                </span>
              </div>

              {quizFeedback !== 'idle' && (
                <button
                  type="button"
                  onClick={handleNextQuizQuestion}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 self-end"
                >
                  <span>Next Structure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <p className="text-sm font-bold text-white mb-2">
                Target Pin #{targetQuizHotspot.pinNumber}: Identify the highlighted anatomical/histological structure on the micrograph:
              </p>

              {/* Diagnostic Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {activeRecord.hotspots.map(spot => {
                  const isSelected = selectedQuizAttempt === spot.pinNumber;
                  const isCorrect = spot.pinNumber === targetQuizHotspot.pinNumber;

                  let btnStyle = 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300';
                  if (quizFeedback !== 'idle') {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={spot.id}
                      type="button"
                      disabled={quizFeedback !== 'idle'}
                      onClick={() => handlePinClick(spot)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{spot.labelEn} ({spot.labelAr})</span>
                      {quizFeedback !== 'idle' && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {quizFeedback !== 'idle' && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizFeedback === 'correct' && (
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <strong>Correct Identification!</strong> {targetQuizHotspot.explanation}
                  </div>
                </div>
              )}

              {quizFeedback === 'wrong' && (
                <div className="mt-3 p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <strong>Incorrect.</strong> Target was #{targetQuizHotspot.pinNumber}: {targetQuizHotspot.labelEn}.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. USER UPLOAD MODAL (PRESERVE EXACT USER IMAGE) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    Upload Original Reference Image (رفع صورة أصلية)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Policy: User Upload = Primary Unaltered Source
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Drop / Select zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-6 text-center cursor-pointer bg-slate-950/50 transition-all group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {uploadedFilePreview ? (
                  <div className="space-y-2">
                    <img
                      src={uploadedFilePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg border border-slate-700"
                    />
                    <span className="text-xs text-indigo-400 font-bold block">
                      Click to choose a different file
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    <div className="text-sm font-semibold text-white">
                      Drop medical photo or click to browse
                    </div>
                    <div className="text-xs text-slate-500">
                      Supports JPG, PNG, WEBP (Micrographs, Gross Specimens, Atlas Plates)
                    </div>
                  </div>
                )}
              </div>

              {/* Reference Attribution Input */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Reference Source / Origin Citation (مصدر الصورة)
                </label>
                <input
                  type="text"
                  value={uploadReferenceText}
                  onChange={e => setUploadReferenceText(e.target.value)}
                  placeholder="e.g. Student Lab Photography, Sana'a University Atlas, Netter's (if verified)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  * Note: Maintain academic integrity. Do not claim Netter or Gray unless explicitly confirmed.
                </span>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Study Notes / Microscopic Observations
                </label>
                <textarea
                  value={uploadNotes}
                  onChange={e => setUploadNotes(e.target.value)}
                  placeholder="Staining, magnification, histological landmarks..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 h-16 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!uploadedFilePreview}
                onClick={handleSaveUpload}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save as Primary Source</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
