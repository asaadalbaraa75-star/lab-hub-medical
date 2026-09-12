/*
 * © LAB HUB · Developed by Sakina Asaad
 * Anatomy Interactive Image Viewer
 *
 * Core rule: "IMAGE MUST TEACH"
 * - Touch & Mouse Zoom In, Zoom Out, Pan, Reset
 * - Visual Labels & Hotspots placed on the anatomical structure
 * - Click to highlight structure + view bilingual name and short explanation
 * - Mobile-friendly and responsive
 */

import React, { useState, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Info,
  CheckCircle2,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { MedicalImageSourceBadge } from '../../../common/MedicalImageSourceBadge';

export interface AnatomicalLabelItem {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  xPercent?: number; // 0 to 100
  yPercent?: number; // 0 to 100
}

interface AnatomyInteractiveImageViewerProps {
  imageUrl: string;
  titleEn: string;
  titleAr: string;
  source: string;
  license?: string;
  credit?: string;
  labels?: AnatomicalLabelItem[];
  captionEn?: string;
  captionAr?: string;
  heightClass?: string; // e.g. "h-72 sm:h-96"
  allowZoom?: boolean;
}

export const AnatomyInteractiveImageViewer: React.FC<AnatomyInteractiveImageViewerProps> = ({
  imageUrl,
  titleEn,
  titleAr,
  source,
  license,
  credit,
  labels = [],
  captionEn,
  captionAr,
  heightClass = 'h-72 sm:h-96',
  allowZoom = true
}) => {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(
    labels.length > 0 ? labels[0].id : null
  );
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom controls
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.35, 3.5));
  const handleZoomOut = () =>
    setScale(prev => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse pan handlers
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

  // Touch pan handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale <= 1 || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  const selectedLabel = labels.find(l => l.id === selectedLabelId);

  return (
    <div
      className={`bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-lg transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 flex flex-col max-h-[96vh]' : 'relative'
      }`}
    >
      {/* Top Bar / Header of the Image */}
      <div className="p-3 sm:p-4 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
            <h4 className="text-xs sm:text-sm font-black text-white truncate">
              {titleEn}
            </h4>
            <span className="text-xs text-slate-400 truncate hidden sm:inline">
              ({titleAr})
            </span>
          </div>
          {captionEn && (
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              {captionEn}
            </p>
          )}
        </div>

        {/* Floating Controls (Zoom, Reset, Fullscreen) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {allowZoom && (
            <>
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom in"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={scale <= 1}
                title="Zoom out"
                className={`p-1.5 rounded-lg transition-colors ${
                  scale <= 1
                    ? 'bg-slate-850 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer'
                }`}
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              {scale > 1 && (
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset Zoom"
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>1x</span>
                </button>
              )}
            </>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(prev => !prev)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas & Image Area */}
      <div
        ref={containerRef}
        className={`relative w-full ${isFullscreen ? 'flex-1' : heightClass} bg-slate-950 overflow-hidden select-none cursor-${
          scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* The anatomical image with zoom/pan transform */}
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          <img
            src={imageUrl}
            alt={titleEn}
            className="max-h-full max-w-full object-contain pointer-events-none"
            loading="lazy"
          />

          {/* Interactive Pins Overlay on top of image */}
          {labels.map((lbl, idx) => {
            if (lbl.xPercent === undefined || lbl.yPercent === undefined) return null;
            const isSelected = selectedLabelId === lbl.id;

            return (
              <div
                key={lbl.id}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedLabelId(lbl.id);
                }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${lbl.xPercent}%`,
                  top: `${lbl.yPercent}%`
                }}
              >
                {/* Ping ring when selected */}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full bg-teal-400/40 animate-ping" />
                )}

                {/* Numbered Pin Badge */}
                <div
                  className={`relative px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 shadow-xl transition-all ${
                    isSelected
                      ? 'bg-teal-500 text-white ring-2 ring-white scale-110'
                      : 'bg-slate-900/90 text-teal-300 border border-teal-500/50 hover:bg-teal-600 hover:text-white'
                  }`}
                >
                  <span>{idx + 1}</span>
                  <span className="max-w-[120px] truncate text-[9px] hidden sm:inline">
                    {lbl.nameEn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Source Citation Badge in top left corner */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <MedicalImageSourceBadge
            source={source}
            license={license}
            credit={credit}
            verified={true}
          />
        </div>

        {/* Mobile touch hint when zoomed */}
        {scale > 1 && (
          <div className="absolute bottom-2 left-2 z-10 pointer-events-none px-2 py-0.5 rounded bg-slate-900/80 text-[10px] text-slate-400 backdrop-blur-sm">
            Drag to pan around
          </div>
        )}
      </div>

      {/* Label Buttons / Tag Bar (WHERE IS IT? WHAT DOES IT LOOK LIKE? WHAT IS ITS NAME?) */}
      {labels.length > 0 && (
        <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-teal-400" />
              <span>Anatomical Structures on Image ({labels.length})</span>
            </span>
            <span className="text-[10px] text-teal-400 font-medium">
              Click any structure to locate on image
            </span>
          </div>

          {/* Pill Chips for Structures */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {labels.map((lbl, idx) => {
              const isSelected = selectedLabelId === lbl.id;
              return (
                <button
                  key={lbl.id}
                  type="button"
                  onClick={() => setSelectedLabelId(lbl.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-950/40 ring-1 ring-white/50'
                      : 'bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{lbl.nameEn}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Structure Inspector Drawer */}
          {selectedLabel && (
            <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-1 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <h5 className="text-xs sm:text-sm font-black text-white">
                    {selectedLabel.nameEn}
                  </h5>
                </div>
                <span className="text-xs font-bold text-teal-300">
                  {selectedLabel.nameAr}
                </span>
              </div>

              {selectedLabel.descriptionEn && (
                <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                  {selectedLabel.descriptionEn}
                </p>
              )}
              {selectedLabel.descriptionAr && (
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedLabel.descriptionAr}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
