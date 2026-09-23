import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Tag,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { HistologySanaaAtlasVisual } from './HistologySanaaAtlasVisuals';
import { HistologyLabel, HistologyExamMarker, HistologySlideMetadata } from './HistologyCurriculumData';
import { HistologyExamPointer } from './HistologyExamPointer';

interface HistologySlideViewerProps {
  realImagePath?: string;
  imageUrl?: string;
  imageURL?: string;
  imageSrc?: string;
  isRealMicroscopy?: boolean;
  visualId: string;
  titleEn: string;
  titleAr?: string;
  stain: string;
  magnification: string;
  specimen: string;
  mode?: 'slide' | 'practice';
  labels?: HistologyLabel[];
  showLabelsDefault?: boolean;
  examMarker?: HistologyExamMarker;
  whatToLookFor?: string[];
  slideMetadata?: HistologySlideMetadata;
  onToggleMode?: (newMode?: 'slide' | 'practice') => void;
}

export const HistologySlideViewer: React.FC<HistologySlideViewerProps> = ({
  realImagePath,
  imageUrl,
  imageURL,
  imageSrc,
  isRealMicroscopy = true,
  visualId,
  titleEn,
  titleAr,
  stain,
  magnification,
  specimen,
  mode = 'slide',
  labels = [],
  showLabelsDefault = true,
  examMarker,
  whatToLookFor,
  slideMetadata,
  onToggleMode
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showLabels, setShowLabels] = useState<boolean>(mode === 'slide' ? showLabelsDefault : false);
  const [activeLabelId, setActiveLabelId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showMetadata, setShowMetadata] = useState<boolean>(false);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(Number((prev + 0.3).toFixed(1)), 3.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(Number((prev - 0.3).toFixed(1)), 1));
  const handleReset = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey || isFullscreen) {
      e.preventDefault();
      if (e.deltaY < 0) {
        setZoomLevel(prev => Math.min(Number((prev + 0.2).toFixed(1)), 3.5));
      } else {
        setZoomLevel(prev => Math.max(Number((prev - 0.2).toFixed(1)), 1));
      }
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch pan & pinch-to-zoom handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // 2-Finger Pinch Zoom Start
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      pinchStartDistRef.current = dist;
      pinchStartZoomRef.current = zoomLevel;
      setIsDragging(false);
    } else if (e.touches.length === 1 && zoomLevel > 1) {
      // 1-Finger Pan
      setIsDragging(true);
      const touch = e.touches[0];
      dragStartRef.current = { x: touch.clientX - pan.x, y: touch.clientY - pan.y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistRef.current) {
      // Pinch to Zoom in progress
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      const scale = dist / pinchStartDistRef.current;
      const targetZoom = Number(Math.min(Math.max(pinchStartZoomRef.current * scale, 1), 3.5).toFixed(2));
      setZoomLevel(targetZoom);
    } else if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      // 1-Finger Pan in progress
      const touch = e.touches[0];
      setPan({
        x: touch.clientX - dragStartRef.current.x,
        y: touch.clientY - dragStartRef.current.y
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      pinchStartDistRef.current = null;
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
    }
  };

  // Marker coordinates for Exam / Practice Mode
  const markerX = examMarker?.x ?? 50;
  const markerY = examMarker?.y ?? 50;
  const markerNum = examMarker?.pointerNumber ?? 1;

  // Resolve effective image URL across all potential property names
  const rawImage = realImagePath || imageUrl || imageURL || imageSrc || '';
  const effectiveImageUrl = (rawImage && rawImage !== '/images/histology/real_histology_slide_required.svg')
    ? rawImage
    : 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200';

  const isRealSlideAvailable = Boolean(effectiveImageUrl);

  return (
    <div
      ref={containerRef}
      id="histology-slide-viewer-container"
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'aspect-[4/3] sm:aspect-[16/10]'
      }`}
    >
      {/* TOP SLIDE INFO HEADER */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none gap-2">
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-900/90 text-teal-300 border border-teal-500/30 backdrop-blur-md shadow-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>{specimen}</span>
          </span>

          <span className="hidden xs:inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-900/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
            {stain}
          </span>

          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-mono text-slate-400 bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
            {magnification}
          </span>

          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
            <span>Real Slide ✓</span>
          </span>
        </div>

        {/* Mode indicator and labels toggle */}
        <div className="pointer-events-auto flex items-center gap-2">
          {mode === 'practice' ? (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1.5 shadow">
              <EyeOff className="w-3.5 h-3.5" />
              <span>EXAM MODE (Labels Hidden)</span>
            </span>
          ) : (
            <button
              id="toggle-labels-button"
              onClick={() => setShowLabels(!showLabels)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                showLabels
                  ? 'bg-teal-500 text-slate-950 border-teal-400 font-extrabold shadow-teal-500/20'
                  : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800'
              }`}
            >
              {showLabels ? <Eye className="w-3.5 h-3.5 text-slate-950" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
              <span>{showLabels ? 'Hide Labels' : 'Show Labels'}</span>
            </button>
          )}
        </div>
      </div>

      {/* MICROSCOPIC VIEWPORT CANVAS */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className={`w-full flex-1 relative overflow-hidden flex items-center justify-center select-none bg-slate-950 ${
          zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
      >
        <div
          style={{
            transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
          className="w-full h-full flex items-center justify-center relative"
        >
          {visualId === 'microscope_parts' && !rawImage ? (
            <HistologySanaaAtlasVisual
              visualId={visualId}
              mode={showLabels && mode !== 'practice' ? 'labeled' : 'unlabeled'}
              zoomLevel={zoomLevel}
            />
          ) : (
            <div className="relative inline-flex items-center justify-center max-w-full max-h-full">
              <img
                src={effectiveImageUrl}
                alt={titleEn}
                className="max-w-full max-h-[calc(100vh-280px)] sm:max-h-[540px] object-contain rounded-lg shadow-inner pointer-events-none select-none transition-opacity duration-300 block"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* OVERLAY: STUDY LABELS (When enabled in study mode - ONLY for labels with verified coordinates) */}
              {showLabels && mode !== 'practice' && labels.length > 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  {labels
                    .filter((lbl) => lbl.x !== undefined && lbl.y !== undefined)
                    .map((lbl, idx) => {
                      const posX = lbl.x!;
                      const posY = lbl.y!;
                      const isSelected = activeLabelId === lbl.id;

                      return (
                        <div
                          key={lbl.id || idx}
                          style={{ left: `${posX}%`, top: `${posY}%` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform hover:scale-110 z-20"
                        >
                          <button
                            onClick={() => setActiveLabelId(isSelected ? null : lbl.id)}
                            className="group relative flex items-center gap-1.5 focus:outline-none"
                          >
                            <span className="relative flex h-5 w-5 items-center justify-center">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
                              <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-500 border-2 border-white shadow-lg text-[9px] font-black text-slate-950 items-center justify-center">
                                {idx + 1}
                              </span>
                            </span>

                            <div className="px-2.5 py-1 rounded-lg bg-slate-950/90 text-white border border-teal-500/50 backdrop-blur-md text-[11px] font-bold shadow-xl whitespace-nowrap">
                              <span>{lbl.label}</span>
                              {lbl.labelAr && (
                                <span className="block text-[9px] text-teal-300 font-arabic">
                                  {lbl.labelAr}
                                </span>
                              )}
                            </div>
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* OVERLAY: HIGH-PRECISION HISTOLOGY EXAM POINTER ① (For Practice / Exam Mode) */}
              {mode === 'practice' && (
                <HistologyExamPointer
                  x={markerX}
                  y={markerY}
                  pointerNumber={markerNum}
                  label={`Structure ${markerNum === 1 ? '①' : markerNum}`}
                  theme="cyan"
                />
              )}
            </div>
          )}
        </div>

        {/* Zoom Level Indicator */}
        {zoomLevel > 1 && (
          <div className="absolute top-14 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900/90 text-teal-400 border border-teal-500/30">
            {Math.round(zoomLevel * 100)}%
          </div>
        )}

        {/* Exam Mode Prompt Banner */}
        {mode === 'practice' && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-xl bg-slate-950/90 border border-white/30 text-white text-xs font-bold backdrop-blur-md shadow-2xl z-20 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-white text-black text-[10px] font-black flex items-center justify-center">
              ①
            </span>
            <span>Identify the structure or tissue indicated by ①</span>
          </div>
        )}
      </div>

      {/* BOTTOM FLOATING CONTROLS (Clean, minimal, 4 essential buttons) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-2xl">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-teal-300 transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <ZoomIn className="w-4 h-4" />
          <span className="hidden xs:inline">Zoom In</span>
        </button>

        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          disabled={zoomLevel <= 1}
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 hover:text-teal-300 transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <ZoomOut className="w-4 h-4" />
          <span className="hidden xs:inline">Zoom Out</span>
        </button>

        <button
          onClick={handleReset}
          title="Reset View"
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden xs:inline">Reset</span>
        </button>

        <div className="w-px h-5 bg-slate-700 mx-0.5" />

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-teal-300 transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          <span className="hidden xs:inline">{isFullscreen ? 'Exit' : 'Full Screen'}</span>
        </button>
      </div>
    </div>
  );
};
