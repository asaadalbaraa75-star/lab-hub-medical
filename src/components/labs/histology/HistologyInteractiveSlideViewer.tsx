import React, { useState, useEffect, useRef } from 'react';
import {
  HistologySanaaAtlasVisual
} from './HistologySanaaAtlasVisuals';
import {
  medicalMediaService,
  MedicalImageRecord
} from '../common/MedicalMediaService';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  EyeOff,
  Info,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Maximize2,
  Minimize2,
  Check,
  X,
  Layers,
  ArrowRight,
  Upload,
  Camera,
  ImageIcon,
  ShieldCheck
} from 'lucide-react';

export interface InteractiveSlidePointer {
  id: string;
  label: string;
  labelAr?: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  description: string;
  stainAffinity?: string;
  diagnosticPearl?: string;
}

export interface InteractiveSlideProps {
  lessonTitle: string;
  slideTitle: string;
  slideTitleAr?: string;
  explanation: string;
  visualId: string;
  specimen: string; // e.g. "Lung Alveoli"
  stain: string; // e.g. "H&E"
  magnification: string; // e.g. "400x High Power"
  identificationPoints: string[];
  ospePearl: string;
  pointers?: InteractiveSlidePointer[];
  practicalQuestion?: {
    question?: string;
    questionText?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const HistologyInteractiveSlideViewer: React.FC<InteractiveSlideProps> = ({
  lessonTitle,
  slideTitle,
  slideTitleAr,
  explanation,
  visualId,
  specimen,
  stain,
  magnification,
  identificationPoints,
  ospePearl,
  pointers = [],
  practicalQuestion
}) => {
  // Modes: 'original' (pure untouched) vs 'learning' (with labels) vs 'practical' (spotter/identification)
  const [activeMode, setActiveMode] = useState<'original' | 'learning' | 'practical'>('original');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedPointerId, setSelectedPointerId] = useState<string | null>(null);
  const [showSlideInfoModal, setShowSlideInfoModal] = useState<boolean>(false);
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Pan & Drag State
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // User uploaded custom image record
  const [imageRecord, setImageRecord] = useState<MedicalImageRecord | null>(() => {
    return medicalMediaService.getImage('histology', visualId);
  });

  // Refresh image record if visualId changes
  useEffect(() => {
    setImageRecord(medicalMediaService.getImage('histology', visualId));
  }, [visualId]);

  // Practical Quiz State
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  const selectedPointer = pointers.find(p => p.id === selectedPointerId);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setSelectedPointerId(null);
  };

  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null) return;
    setIsAnswerSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
  };

  // Upload handler for user's own genuine micrograph
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        const saved = medicalMediaService.saveUserUploadedImage({
          subject: 'histology',
          topicOrLessonId: visualId,
          title: `${slideTitle} (User Micrograph)`,
          titleAr: slideTitleAr,
          dataUrl,
          referenceSource: 'User-Uploaded Laboratory Micrograph (100% Original Preserved)',
          hasLabels: false
        });
        setImageRecord(saved);
        setShowUploadModal(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'relative'
      }`}
    >
      {/* 1. TOP HEADER: LESSON & SLIDE TITLE & SHORT EXPLANATION */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/30">
              {lessonTitle}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800 text-slate-300">
              {specimen} • {stain}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800 text-slate-300">
              {magnification}
            </span>
            {imageRecord?.sourceType === 'user_upload' && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>شريحة المستخدم الأصلية (User Preserved)</span>
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            {slideTitle}
            {slideTitleAr && (
              <span className="text-sm sm:text-base font-normal text-teal-400/90 font-sans">
                ({slideTitleAr})
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* 3-Mode Switcher: Original vs Learning vs Practical */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700/80 self-start md:self-center shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveMode('original');
              setSelectedPointerId(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'original'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Original (الأصلية)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('learning');
              setSelectedPointerId(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'learning'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Learning (التعليمية)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('practical');
              setSelectedPointerId(null);
              setShowQuestionModal(true);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'practical'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Practical (العملي)</span>
          </button>
        </div>
      </div>

      {/* 2. CENTRAL HISTOLOGY IMAGE VIEWPORT */}
      <div
        className={`relative w-full ${isFullscreen ? 'flex-1' : 'aspect-[16/10] sm:aspect-[16/9] max-h-[580px]'} bg-slate-950 overflow-hidden flex items-center justify-center border-b border-slate-800/80 select-none ${
          zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Microscope field reticle / bezel */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-teal-400 border border-teal-500/30 font-bold">
            {magnification} • {stain}
          </span>
          <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-slate-700">
            Zoom: {zoomLevel.toFixed(1)}x
          </span>
          {activeMode === 'original' && (
            <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-bold">
              Original Reference
            </span>
          )}
        </div>

        {/* Floating Zoom & Control Bar */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Microscopic Slide Content (Scalable & Pannable Container) */}
        <div
          className="w-full h-full transition-transform duration-100 ease-out flex items-center justify-center relative"
          style={{
            transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`
          }}
        >
          {imageRecord?.dataUrl ? (
            <img
              src={imageRecord.dataUrl}
              alt={slideTitle}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain pointer-events-none"
            />
          ) : (
            <HistologySanaaAtlasVisual
              visualId={visualId}
              mode={activeMode === 'original' ? 'unlabeled' : activeMode === 'learning' ? 'labeled' : 'unlabeled'}
              highlightedStructure={selectedPointerId}
              onSelectStructure={setSelectedPointerId}
              zoomLevel={zoomLevel}
            />
          )}

          {/* Interactive Clickable Hotspots / Pointers in Learning Mode */}
          {activeMode === 'learning' &&
            pointers.map(ptr => {
              const isSelected = ptr.id === selectedPointerId;
              return (
                <div
                  key={ptr.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPointerId(isSelected ? null : ptr.id);
                  }}
                  style={{ top: `${ptr.yPercent}%`, left: `${ptr.xPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-teal-400 text-slate-950 scale-125 ring-4 ring-teal-400/40'
                        : 'bg-slate-900/90 text-teal-300 border-2 border-teal-400 hover:scale-110 shadow-lg'
                    }`}
                  >
                    <span className="text-[10px] font-bold">●</span>
                  </div>

                  {/* Hover Tag */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-semibold whitespace-nowrap border border-slate-700 pointer-events-none shadow-xl">
                    {ptr.label}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Selected Pointer Detail Overlay Card */}
        {activeMode === 'learning' && selectedPointer && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-20 bg-slate-900/95 backdrop-blur-lg border border-teal-500/40 rounded-xl p-4 shadow-2xl space-y-2 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider font-bold">
                Selected Structure Details
              </span>
              <button
                type="button"
                onClick={() => setSelectedPointerId(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              {selectedPointer.label}
              {selectedPointer.labelAr && (
                <span className="text-xs text-teal-300 font-normal">({selectedPointer.labelAr})</span>
              )}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedPointer.description}</p>
            {selectedPointer.diagnosticPearl && (
              <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-300 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                <span><strong>OSPE Hallmark:</strong> {selectedPointer.diagnosticPearl}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. FOUR PROMINENT ACTION BUTTONS */}
      <div className="p-3 sm:p-4 bg-slate-950 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Button 1: View Original Image */}
          <button
            type="button"
            onClick={() => {
              setActiveMode('original');
              setSelectedPointerId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeMode === 'original'
                ? 'bg-indigo-600 text-white font-extrabold shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>[View Original Slide]</span>
          </button>

          {/* Button 2: View Labeled Image */}
          <button
            type="button"
            onClick={() => {
              setActiveMode('learning');
              setSelectedPointerId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeMode === 'learning'
                ? 'bg-teal-500 text-slate-950 font-extrabold shadow-md shadow-teal-500/30'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>[View Labeled Image]</span>
          </button>

          {/* Button 3: Practice Identification */}
          <button
            type="button"
            onClick={() => {
              setActiveMode('practical');
              setSelectedPointerId(null);
              setShowQuestionModal(true);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeMode === 'practical'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/30'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <EyeOff className="w-4 h-4" />
            <span>[Practice Identification]</span>
          </button>

          {/* Button 4: View Slide Information */}
          <button
            type="button"
            onClick={() => setShowSlideInfoModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/40 border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Info className="w-4 h-4 text-cyan-400" />
            <span>[View Slide Information]</span>
          </button>

          {/* Button 5: Upload User Slide */}
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-850 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>[Upload Micrograph]</span>
          </button>
        </div>

        {/* Button 6: Start Practical Question */}
        {practicalQuestion && (
          <button
            type="button"
            onClick={() => setShowQuestionModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-500 to-cyan-600 text-slate-950 hover:brightness-110 shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer font-black"
          >
            <HelpCircle className="w-4 h-4 text-slate-950" />
            <span>[Start Practical Question]</span>
          </button>
        )}
      </div>

      {/* 4. MODAL: UPLOAD ORIGINAL SLIDE */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">رفع شريحة مجهرية أصلية (Original Micrograph)</h3>
                  <p className="text-xs text-slate-400">User-Uploaded Image = Primary Source</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
              📌 سيتم حفظ الصورة الأصلية كما هي تمامًا بدون أي تعديل أو توليد اصطناعي، وستصبح المرجع المعتمد لهذه الشريحة.
            </div>

            <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer bg-slate-950/60 transition-all">
              <Upload className="w-8 h-8 text-slate-400" />
              <div className="text-center">
                <span className="text-xs font-bold text-white block">اضغط لاختيار ملف الصورة (Micrograph)</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">يدعم JPG, PNG, WEBP</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => setShowUploadModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* 5. MODAL / DRAWER: SLIDE INFORMATION */}
      {showSlideInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-xs">
                  🔬
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Slide Identification Guide</h3>
                  <span className="text-xs text-slate-400">Sana'a University Practical OSPE Criteria</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSlideInfoModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Specimen / Organ</span>
                <span className="text-teal-300 font-bold text-sm mt-0.5 block">{specimen}</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Routine / Special Stain</span>
                <span className="text-pink-300 font-bold text-sm mt-0.5 block">{stain}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase font-mono">Diagnostic Identification Points:</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {identificationPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 font-bold">OSPE High-Yield Exam Pearl:</strong>
                <p className="mt-0.5 text-slate-300">{ospePearl}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSlideInfoModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
            >
              Close Information
            </button>
          </div>
        </div>
      )}

      {/* 6. MODAL: PRACTICAL IDENTIFICATION QUESTION (OSPE SPOTTER) */}
      {showQuestionModal && practicalQuestion && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
                  ?
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">OSPE Practical Spotter Question</h3>
                  <span className="text-xs text-slate-400">Identify the microscopic structure under examination</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowQuestionModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium text-slate-200">
              {practicalQuestion.questionText || practicalQuestion.question}
            </div>

            {/* Answer Options */}
            <div className="space-y-2">
              {practicalQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswerIndex === idx;
                const isCorrect = idx === practicalQuestion.correctIndex;

                let btnStyles = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-teal-500/50 hover:bg-slate-950';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyles = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyles = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                  }
                } else if (isSelected) {
                  btnStyles = 'bg-teal-500/20 border-teal-500 text-teal-200 font-bold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyles}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                    {isAnswerSubmitted && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-400" />}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation once submitted */}
            {isAnswerSubmitted && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-teal-500/30 text-xs space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-1.5 text-teal-400 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Diagnostic Rationale:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{practicalQuestion.explanation}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  disabled={selectedAnswerIndex === null}
                  onClick={handleSubmitAnswer}
                  className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Submit Identification (تأكيد الإجابة)
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Try Again
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuestionModal(false);
                      setActiveMode('learning');
                    }}
                    className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Reveal Labeled Image
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

