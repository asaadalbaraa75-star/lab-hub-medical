/*
 * © LAB HUB · Developed by Sakina Asaad
 * Interactive Anatomy Atlas Canvas
 *
 * Touch & Mouse Powered Medical Image Inspector:
 * - Zoom in / Zoom out / Double-tap zoom
 * - Pan & move image smoothly
 * - Interactive Structure Pins (Click / Tap to inspect)
 * - Views switcher (Anterior / Posterior / Secondary views)
 * - Docked Structure Inspector Card with O-I-I-A (Origin, Insertion, Innervation, Action)
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AtlasTopic, AtlasView, AtlasHotspot } from './AnatomyInteractiveAtlasData';
import { MedicalImageSourceBadge } from '../../../common/MedicalImageSourceBadge';
import { OwnershipWatermark } from '../../../common/OwnershipWatermark';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Activity,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Play,
  Target,
  X
} from 'lucide-react';

interface InteractiveAtlasCanvasProps {
  topic: AtlasTopic;
  onOpenVideo?: (youtubeId: string) => void;
  onOpenSpotter?: () => void;
  className?: string;
}

export const InteractiveAtlasCanvas: React.FC<InteractiveAtlasCanvasProps> = ({
  topic,
  onOpenVideo,
  onOpenSpotter,
  className = ''
}) => {
  // Active View in this Topic
  const [activeViewId, setActiveViewId] = useState<string>(topic.defaultViewId || topic.views[0].id);
  const activeView: AtlasView = topic.views.find(v => v.id === activeViewId) || topic.views[0];

  // Hotspots
  const [selectedHotspot, setSelectedHotspot] = useState<AtlasHotspot | null>(
    activeView.hotspots.length > 0 ? activeView.hotspots[0] : null
  );
  const [showPins, setShowPins] = useState<boolean>(true);

  // Zoom & Pan state
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Touch tracking for pinch-to-zoom
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartScaleRef = useRef<number>(1);

  // Container refs
  const viewportRef = useRef<HTMLDivElement>(null);

  // When view or topic changes, reset
  useEffect(() => {
    setActiveViewId(topic.defaultViewId || topic.views[0].id);
    const view = topic.views.find(v => v.id === (topic.defaultViewId || topic.views[0].id)) || topic.views[0];
    setSelectedHotspot(view.hotspots.length > 0 ? view.hotspots[0] : null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [topic.id]);

  const handleSelectView = (viewId: string) => {
    setActiveViewId(viewId);
    const v = topic.views.find(item => item.id === viewId) || topic.views[0];
    setSelectedHotspot(v.hotspots.length > 0 ? v.hotspots[0] : null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Zoom Actions
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setScale(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };
  const handleResetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch Handlers for Mobile Pan & Pinch
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch to zoom start
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
      touchStartScaleRef.current = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      // Touch pan start
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      // Pinch to zoom
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = currentDist / touchStartDistRef.current;
      const newScale = Math.min(Math.max(touchStartScaleRef.current * ratio, 1), 4);
      setScale(newScale);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Touch drag pan
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    touchStartDistRef.current = null;
    setIsDragging(false);
  };

  // Hotspot selection navigation
  const handleSelectNextHotspot = () => {
    if (!selectedHotspot || activeView.hotspots.length === 0) return;
    const currentIndex = activeView.hotspots.findIndex(h => h.id === selectedHotspot.id);
    const nextIndex = (currentIndex + 1) % activeView.hotspots.length;
    setSelectedHotspot(activeView.hotspots[nextIndex]);
  };

  const handleSelectPrevHotspot = () => {
    if (!selectedHotspot || activeView.hotspots.length === 0) return;
    const currentIndex = activeView.hotspots.findIndex(h => h.id === selectedHotspot.id);
    const prevIndex = (currentIndex - 1 + activeView.hotspots.length) % activeView.hotspots.length;
    setSelectedHotspot(activeView.hotspots[prevIndex]);
  };

  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : ''
      } ${className}`}
    >
      {/* 1. TOP BAR: TITLE, VIEWS SELECTOR & ACTIONS */}
      <div className="bg-slate-900/95 border-b border-slate-800/80 px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800/80 uppercase tracking-wider">
              {topic.systemLabelEn}
            </span>
            {topic.regionLabelEn && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase tracking-wider">
                {topic.regionLabelEn}
              </span>
            )}
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>{topic.titleEn}</span>
            <span className="text-sm font-semibold text-slate-400 hidden sm:inline">({topic.titleAr})</span>
          </h3>
        </div>

        {/* VIEW SWITCHER PILLS (When multiple verified views exist) */}
        {topic.views.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {topic.views.map(view => (
              <button
                key={view.id}
                type="button"
                onClick={() => handleSelectView(view.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeViewId === view.id
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-950/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{view.labelEn}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. MAIN ATLAS INTERACTIVE WORKSPACE (IMAGE + FLOATING CONTROLS + INSPECTOR) */}
      <div className="relative flex flex-col lg:flex-row h-[550px] sm:h-[620px] bg-slate-950 overflow-hidden">
        {/* VIEWPORT CANVAS */}
        <div
          ref={viewportRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative flex-1 h-full w-full overflow-hidden flex items-center justify-center select-none ${
            scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
          }`}
        >
          {/* Transforming Image Container */}
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
            className="relative max-w-full max-h-full flex items-center justify-center"
          >
            <img
              src={activeView.imageUrl}
              alt={activeView.labelEn}
              draggable={false}
              className="max-h-[500px] sm:max-h-[570px] w-auto max-w-full object-contain rounded-lg pointer-events-none drop-shadow-2xl"
            />

            {/* CLICKABLE HOTSPOT PINS */}
            {showPins &&
              activeView.hotspots.map(hotspot => {
                const isSelected = selectedHotspot?.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedHotspot(hotspot);
                    }}
                    style={{
                      left: `${hotspot.posX}%`,
                      top: `${hotspot.posY}%`
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-200 cursor-pointer ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                    }`}
                    title={hotspot.nameEn}
                  >
                    {/* Pulsing ring for active pin */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping" />
                    )}

                    {/* Badge */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shadow-lg border-2 transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-white shadow-amber-500/50 scale-110'
                          : 'bg-slate-900/90 text-amber-300 border-amber-400/80 hover:bg-amber-600 hover:text-white backdrop-blur-sm'
                      }`}
                    >
                      {hotspot.pinNumber}
                    </div>

                    {/* Pin mini-label tooltip on hover */}
                    <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/95 text-[10px] font-bold text-white border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                      {hotspot.nameEn}
                    </div>
                  </button>
                );
              })}
          </div>

          {/* FLOATING ZOOM / PAN CONTROLS BAR (Mobile & Desktop) */}
          <div className="absolute bottom-4 left-4 z-30 flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl">
            <button
              type="button"
              onClick={handleZoomIn}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetView}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Reset View (100%)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-slate-700/80 mx-0.5" />
            <button
              type="button"
              onClick={() => setShowPins(prev => !prev)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                showPins
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
              title={showPins ? 'Hide Structure Pins' : 'Show Structure Pins'}
            >
              {showPins ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(prev => !prev)}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* ZOOM INDICATOR PILL */}
          {scale > 1 && (
            <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-bold text-amber-300 backdrop-blur-md shadow-md">
              {Math.round(scale * 100)}% · Drag to Pan
            </div>
          )}

          {/* SOURCE & VERIFICATION BADGE */}
          <div className="absolute top-4 right-4 z-30">
            <span className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[10px] font-bold text-slate-300 backdrop-blur-md shadow-md flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>{activeView.imageSource}</span>
            </span>
          </div>
        </div>

        {/* 3. STRUCTURE INSPECTOR PANEL (Docked Right on Desktop, Bottom Drawer on Mobile) */}
        <div className="w-full lg:w-96 bg-slate-900/95 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between p-4 sm:p-5 overflow-y-auto max-h-[340px] lg:max-h-full">
          {selectedHotspot ? (
            <div className="space-y-4">
              {/* Structure Header & Sequential Navigation */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                    {selectedHotspot.pinNumber}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                      {selectedHotspot.nameEn}
                    </h4>
                    <p className="text-xs font-bold text-amber-400 mt-0.5">
                      {selectedHotspot.nameAr}
                    </p>
                  </div>
                </div>

                {/* Prev / Next buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleSelectPrevHotspot}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                    title="Previous structure"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-bold text-slate-500 px-1">
                    {selectedHotspot.pinNumber}/{activeView.hotspots.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleSelectNextHotspot}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                    title="Next structure"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Short High-Yield Explanation */}
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <p>{selectedHotspot.shortDescriptionEn}</p>
                <p className="text-slate-400 mt-1.5 font-medium">{selectedHotspot.shortDescriptionAr}</p>
              </div>

              {/* FUNCTIONAL O-I-I-A CRITERIA (For muscles / joints when applicable) */}
              {(selectedHotspot.originEn || selectedHotspot.insertionEn || selectedHotspot.innervationEn || selectedHotspot.actionEn) && (
                <div className="space-y-2 pt-1 text-xs">
                  {selectedHotspot.originEn && (
                    <div className="p-2.5 rounded-xl bg-slate-850 border border-slate-800">
                      <span className="font-bold text-teal-400 block mb-0.5">Origin (المنشأ):</span>
                      <p className="text-slate-300">{selectedHotspot.originEn}</p>
                      {selectedHotspot.originAr && (
                        <p className="text-slate-400 text-[11px] mt-0.5">{selectedHotspot.originAr}</p>
                      )}
                    </div>
                  )}

                  {selectedHotspot.insertionEn && (
                    <div className="p-2.5 rounded-xl bg-slate-850 border border-slate-800">
                      <span className="font-bold text-blue-400 block mb-0.5">Insertion (الارتكاز):</span>
                      <p className="text-slate-300">{selectedHotspot.insertionEn}</p>
                      {selectedHotspot.insertionAr && (
                        <p className="text-slate-400 text-[11px] mt-0.5">{selectedHotspot.insertionAr}</p>
                      )}
                    </div>
                  )}

                  {selectedHotspot.innervationEn && (
                    <div className="p-2.5 rounded-xl bg-slate-850 border border-slate-800">
                      <span className="font-bold text-amber-400 block mb-0.5">Innervation (التعصيب):</span>
                      <p className="text-slate-300">{selectedHotspot.innervationEn}</p>
                      {selectedHotspot.innervationAr && (
                        <p className="text-slate-400 text-[11px] mt-0.5">{selectedHotspot.innervationAr}</p>
                      )}
                    </div>
                  )}

                  {selectedHotspot.actionEn && (
                    <div className="p-2.5 rounded-xl bg-slate-850 border border-slate-800">
                      <span className="font-bold text-emerald-400 block mb-0.5">Action (الفعل الوظيفي):</span>
                      <p className="text-slate-300">{selectedHotspot.actionEn}</p>
                      {selectedHotspot.actionAr && (
                        <p className="text-slate-400 text-[11px] mt-0.5">{selectedHotspot.actionAr}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* CLINICAL PEARL (If present) */}
              {selectedHotspot.clinicalPearlEn && (
                <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs">
                  <span className="font-bold text-indigo-300 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Clinical High-Yield Note:</span>
                  </span>
                  <p className="text-slate-200">{selectedHotspot.clinicalPearlEn}</p>
                  {selectedHotspot.clinicalPearlAr && (
                    <p className="text-slate-400 text-[11px] mt-0.5">{selectedHotspot.clinicalPearlAr}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 text-xs">
              <p>اضغط على أي رقم أو تركيب داخل الصورة لعرض بياناته التشريحية المعتمدة.</p>
            </div>
          )}

          {/* QUICK BOTTOM ACTIONS (WATCH VIDEO / SPOTTER TEST) */}
          <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
            {topic.youtubeVideoId && onOpenVideo && (
              <button
                type="button"
                onClick={() => onOpenVideo(topic.youtubeVideoId!)}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Video</span>
              </button>
            )}

            {onOpenSpotter && (
              <button
                type="button"
                onClick={onOpenSpotter}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Target className="w-3.5 h-3.5" />
                <span>Spotter Test</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
