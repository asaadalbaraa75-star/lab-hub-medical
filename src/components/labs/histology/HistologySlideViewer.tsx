import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Tag,
  Eye,
  EyeOff
} from 'lucide-react';
import { HistologySanaaAtlasVisual } from './HistologySanaaAtlasVisuals';
import { HistologyLabel } from './HistologyCurriculumData';

interface HistologySlideViewerProps {
  visualId: string;
  titleEn: string;
  titleAr?: string;
  stain: string;
  magnification: string;
  specimen: string;
  mode?: 'slide' | 'practice';
  labels?: HistologyLabel[];
  showLabelsDefault?: boolean;
}

export const HistologySlideViewer: React.FC<HistologySlideViewerProps> = ({
  visualId,
  titleEn,
  titleAr,
  stain,
  magnification,
  specimen,
  mode = 'slide',
  labels = [],
  showLabelsDefault = true
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showLabels, setShowLabels] = useState<boolean>(mode === 'slide' ? showLabelsDefault : false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.4, 3.2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.4, 1));
  const handleReset = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
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

  // Touch pan handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX - pan.x, y: touch.clientY - pan.y };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoomLevel <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStartRef.current.x,
      y: touch.clientY - dragStartRef.current.y
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'aspect-[4/3] sm:aspect-[16/10]'
      }`}
    >
      {/* TOP SLIDE INFO HEADER (Minimal and clean) */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/90 text-teal-300 border border-teal-500/30 backdrop-blur-md shadow">
            {specimen}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-900/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
            {stain}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-400 bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
            {magnification}
          </span>
        </div>

        {/* Mode indicator badge */}
        <div className="pointer-events-auto">
          {mode === 'practice' ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1.5">
              <EyeOff className="w-3.5 h-3.5" />
              <span>PRACTICE SLIDE</span>
            </span>
          ) : (
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md flex items-center gap-1.5 transition-all shadow ${
                showLabels
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700'
              }`}
            >
              {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showLabels ? 'LABELS: ON' : 'LABELS: OFF'}</span>
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
          className="w-full h-full flex items-center justify-center"
        >
          <HistologySanaaAtlasVisual
            visualId={visualId}
            mode={showLabels && mode !== 'practice' ? 'labeled' : 'unlabeled'}
            zoomLevel={zoomLevel}
          />
        </div>

        {/* Zoom Level Indicator */}
        {zoomLevel > 1 && (
          <div className="absolute top-14 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900/90 text-teal-400 border border-teal-500/30">
            {Math.round(zoomLevel * 100)}%
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
