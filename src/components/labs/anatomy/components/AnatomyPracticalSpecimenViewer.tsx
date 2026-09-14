/*
 * © LAB HUB · Developed by Sakina Asaad
 * Anatomy Practical Specimen Viewer
 *
 * DESIGNED SPECIFICALLY FOR FIRST-YEAR MEDICAL OSPE PRACTICALS:
 * - High-resolution display with strictly ZERO stretching or cropping
 * - Full Touch & Mouse Zoom In, Zoom Out, Pan, Reset & Fullscreen
 * - Non-obstructive High-Precision AnatomyExamPointer
 * - Pointer Visibility Toggle & Contrast Modes
 * - Mobile smartphone responsive with pinch-to-zoom
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Palette,
  Sparkles
} from 'lucide-react';
import { AnatomyExamPointer } from './AnatomyExamPointer';
import { MedicalImageSourceBadge } from '../../../common/MedicalImageSourceBadge';

interface AnatomyPracticalSpecimenViewerProps {
  imageUrl: string;
  altText: string;
  pointerX?: number; // 0-100%
  pointerY?: number; // 0-100%
  pointerLabel?: string | number;
  sourceText?: string;
  verified?: boolean;
  stationNumber?: number;
  className?: string;
  aspectClass?: string; // e.g. "min-h-[320px] sm:min-h-[440px]"
}

export const AnatomyPracticalSpecimenViewer: React.FC<AnatomyPracticalSpecimenViewerProps> = ({
  imageUrl,
  altText,
  pointerX,
  pointerY,
  pointerLabel = 'TARGET',
  sourceText = 'OpenStax Anatomy & Physiology (CC BY 4.0)',
  verified = true,
  stationNumber,
  className = '',
  aspectClass = 'min-h-[320px] sm:min-h-[440px]'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPointer, setShowPointer] = useState(true);
  const [pointerTheme, setPointerTheme] = useState<'amber' | 'cyan' | 'rose'>('amber');
  const [imgLoaded, setImgLoaded] = useState(false);

  // Reset view when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setShowPointer(true);
    setImgLoaded(false);
  }, [imageUrl]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.35, 3.5));
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  const cycleTheme = () => {
    setPointerTheme(prev => (prev === 'amber' ? 'cyan' : prev === 'cyan' ? 'rose' : 'amber'));
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch pan & pinch-to-zoom handlers for mobile phones
  const touchDistanceRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistanceRef.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    } else if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const diff = dist - touchDistanceRef.current;
      if (Math.abs(diff) > 4) {
        const factor = diff > 0 ? 0.04 : -0.04;
        setScale(prev => Math.min(Math.max(prev + factor, 1), 3.5));
        touchDistanceRef.current = dist;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchDistanceRef.current = null;
  };

  // Double tap to toggle 1x / 2x zoom on smartphones
  const lastTapRef = useRef<number>(0);
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (scale > 1) {
        handleReset();
      } else {
        setScale(2.0);
      }
    }
    lastTapRef.current = now;
  };

  const hasPointer = pointerX !== undefined && pointerY !== undefined;

  return (
    <div
      className={`relative w-full rounded-2xl bg-slate-950 border border-slate-800/90 overflow-hidden flex flex-col select-none transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : aspectClass
      } ${className}`}
      id="anatomy-specimen-viewport"
    >
      {/* Top Floating Info Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none gap-2">
        {/* Source Badge & Verified Pill */}
        <div className="flex items-center gap-1.5 pointer-events-auto flex-wrap">
          <MedicalImageSourceBadge source={sourceText} verified={verified} />
          {stationNumber !== undefined && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900/90 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold tracking-wider">
              STATION #{stationNumber}
            </span>
          )}
        </div>

        {/* Viewport Action Controls (Zoom, Reset, Fullscreen, Pointer Toggle) */}
        <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow-xl pointer-events-auto">
          {/* Toggle Pointer on/off */}
          {hasPointer && (
            <button
              type="button"
              onClick={() => setShowPointer(prev => !prev)}
              title={showPointer ? 'Hide Pointer Pin' : 'Show Pointer Pin'}
              className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                showPointer
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {showPointer ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Color theme for pointer */}
          {hasPointer && showPointer && (
            <button
              type="button"
              onClick={cycleTheme}
              title={`Pointer contrast: ${pointerTheme} (click to cycle)`}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="w-px h-4 bg-slate-700 mx-0.5" />

          {/* Zoom In */}
          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In (+)"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Out */}
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={scale <= 1}
            title="Zoom Out (-)"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Reset Zoom */}
          {scale > 1 && (
            <button
              type="button"
              onClick={handleReset}
              title="Reset Zoom (1x)"
              className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{Math.round(scale * 10) / 10}x</span>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Specimen Image Stage */}
      <div
        ref={containerRef}
        onClick={handleDoubleTap}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative flex-1 w-full h-full flex items-center justify-center overflow-hidden cursor-${
          scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
        }`}
      >
        {/* Subtle grid background to enhance anatomical specimen contrast */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.25) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Transformed Stage with Image + Attached Pointer */}
        <div
          className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Image Container with Exact Native Aspect Bounds */}
          <div className="relative inline-block max-w-full max-h-full">
            <img
              src={imageUrl}
              alt={altText}
              onLoad={() => setImgLoaded(true)}
              className="max-h-[55vh] sm:max-h-[62vh] max-w-full object-contain pointer-events-none rounded-lg shadow-2xl block mx-auto"
              loading="eager"
            />

            {/* Precision Anatomical Needle Pointer Overlay */}
            {hasPointer && showPointer && (
              <AnatomyExamPointer
                x={pointerX!}
                y={pointerY!}
                label={pointerLabel}
                theme={pointerTheme}
                highlighted={true}
              />
            )}
          </div>
        </div>

        {/* Bottom Hint on Mobile / Desktop */}
        <div className="absolute bottom-2.5 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <div className="px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-[10px] text-slate-300 font-medium">
            <span className="text-amber-400 font-bold">Tip: </span>
            {scale > 1
              ? 'Drag to inspect fine landmarks. Click 1x or double-tap to reset.'
              : 'Double-tap or pinch to magnify fine osteological / muscular details.'}
          </div>

          {scale > 1 && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60 text-[10px] font-mono font-bold">
              MAGNIFIED {Math.round(scale * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
