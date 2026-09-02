import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  HISTOLOGY_SLIDES_CATALOG, 
  HistologySlide, 
  HistologyPin 
} from '../../data/histologySlidesData';
import { 
  Search, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sliders, 
  HelpCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Microscope,
  Info,
  ChevronRight,
  Filter
} from 'lucide-react';

interface Props {
  onSlideSelected?: (slideId: string) => void;
  initialSlideId?: string;
}

export const VirtualHistologyViewer: React.FC<Props> = ({ onSlideSelected, initialSlideId }) => {
  const [selectedSlide, setSelectedSlide] = useState<HistologySlide>(() => {
    if (initialSlideId) {
      const found = HISTOLOGY_SLIDES_CATALOG.find(s => s.id === initialSlideId);
      if (found) return found;
    }
    return HISTOLOGY_SLIDES_CATALOG[0];
  });

  const [activeObjective, setActiveObjective] = useState<'4x' | '10x' | '40x' | '100x'>('10x');
  const [fineFocus, setFineFocus] = useState<number>(0); // -10 to +10 (0 is sharpest)
  const [illumination, setIllumination] = useState<number>(100); // 50% to 150%
  const [showPins, setShowPins] = useState<boolean>(true);
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [selectedPin, setSelectedPin] = useState<HistologyPin | null>(null);
  const [revealedQuizPins, setRevealedQuizPins] = useState<Record<string, boolean>>({});
  
  // Canvas Pan & Zoom
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Filter category
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSlideDrawer, setShowSlideDrawer] = useState<boolean>(false);

  // Magnification multipliers
  const magMultiplier = {
    '4x': 0.8,
    '10x': 1.2,
    '40x': 2.0,
    '100x': 3.2
  }[activeObjective];

  const currentTotalZoom = (scale * magMultiplier).toFixed(1);

  // Blur based on fine focus
  const blurAmount = Math.abs(fineFocus) * 0.45;

  // Reset viewport when slide or objective changes
  const handleResetViewport = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setFineFocus(0);
    setIllumination(100);
    setSelectedPin(null);
  };

  const handleSelectSlide = (slide: HistologySlide) => {
    setSelectedSlide(slide);
    handleResetViewport();
    setRevealedQuizPins({});
    if (onSlideSelected) onSlideSelected(slide.id);
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStartRef.current.x,
      y: e.touches[0].clientY - dragStartRef.current.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    setScale(prev => Math.min(Math.max(prev * zoomFactor, 0.5), 5.0));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.error(err));
      setIsFullscreen(false);
    }
  };

  // Filter slides
  const filteredSlides = HISTOLOGY_SLIDES_CATALOG.filter(slide => {
    const matchesCat = filterCategory === 'all' || slide.category === filterCategory;
    const matchesSearch = slide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          slide.organSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          slide.tissueType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div 
      ref={containerRef} 
      id="virtual-histology-microscope"
      className={`flex flex-col bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full'
      }`}
    >
      {/* 1. TOP MICROSCOPE BAR */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900/90 backdrop-blur border-b border-slate-800 gap-3">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-bold">
            <Microscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <h2 className="font-semibold text-slate-100 text-base">{selectedSlide.title}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-sky-400 font-medium">
                {selectedSlide.stain}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Source: <span className="text-slate-300 font-medium">{selectedSlide.organSource}</span> &bull; {selectedSlide.tissueType}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => setShowSlideDrawer(!showSlideDrawer)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
          >
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Slide Library ({HISTOLOGY_SLIDES_CATALOG.length})</span>
          </button>

          <button
            onClick={() => {
              setIsQuizMode(!isQuizMode);
              setSelectedPin(null);
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              isQuizMode 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/10' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Toggle self-test spotter quiz mode"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{isQuizMode ? 'OSPE Quiz Active' : 'Self-Test Mode'}</span>
          </button>

          <button
            onClick={() => setShowPins(!showPins)}
            className={`p-2 rounded-lg text-xs border transition ${
              showPins 
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title={showPins ? "Hide Structure Pins" : "Show Structure Pins"}
          >
            {showPins ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. MAIN MICROSCOPE STAGE & SIDEBAR */}
      <div className="relative flex flex-col lg:flex-row flex-1 min-h-[560px] max-h-[700px] overflow-hidden">
        
        {/* SLIDE SELECTION DRAWER (Overlay or Sidebar) */}
        {showSlideDrawer && (
          <div className="absolute inset-y-0 left-0 z-30 w-full sm:w-80 bg-slate-900/95 backdrop-blur-md border-r border-slate-800 p-4 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Histology Slides Library</span>
              </h3>
              <button 
                onClick={() => setShowSlideDrawer(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>

            {/* Search and Category Filter */}
            <div className="mt-3 space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tissue, organ, stain..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'muscle', label: 'Muscle' },
                  { id: 'connective', label: 'Connective' },
                  { id: 'organ_systems', label: 'Organs' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                      filterCategory === cat.id
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slide List */}
            <div className="mt-3 flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredSlides.map(slide => (
                <button
                  key={slide.id}
                  onClick={() => {
                    handleSelectSlide(slide);
                    setShowSlideDrawer(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition flex items-start space-x-2.5 ${
                    selectedSlide.id === slide.id
                      ? 'bg-sky-500/15 border-sky-500/60 text-sky-200'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <img
                    src={slide.baseImage}
                    alt={slide.title}
                    className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{slide.title}</p>
                    <p className="text-[11px] text-slate-400 truncate">{slide.organSource}</p>
                    <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300">
                      {slide.stain}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. VIRTUAL MICROSCOPE CANVAS VIEWPORT */}
        <div 
          className="relative flex-1 bg-black flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {/* Microscope Field of View Optical Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] border-4 border-slate-900/60" />

          {/* Optical Reticle / Crosshair Indicator in Center */}
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-20">
            <div className="w-16 h-16 rounded-full border border-sky-400 flex items-center justify-center">
              <div className="w-full h-px bg-sky-400" />
              <div className="h-full w-px bg-sky-400 absolute" />
            </div>
          </div>

          {/* Micrograph Canvas with Matrix Transforms */}
          <div 
            className="relative transition-transform duration-75 will-change-transform"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale * magMultiplier})`,
              filter: `blur(${blurAmount}px) brightness(${illumination}%) contrast(105%)`,
            }}
          >
            <img 
              src={selectedSlide.baseImage} 
              alt={selectedSlide.title}
              className="max-w-[700px] sm:max-w-[850px] w-full rounded shadow-2xl pointer-events-none"
              draggable={false}
            />

            {/* Interactive Pins */}
            {showPins && selectedSlide.pins.map((pin) => {
              const isSelected = selectedPin?.id === pin.id;
              const isRevealed = revealedQuizPins[pin.id];

              return (
                <div
                  key={pin.id}
                  style={{
                    position: 'absolute',
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="z-20 cursor-pointer pointer-events-auto group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPin(pin);
                    if (isQuizMode) {
                      setRevealedQuizPins(prev => ({ ...prev, [pin.id]: true }));
                    }
                  }}
                >
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all shadow-lg ${
                    isSelected 
                      ? 'bg-amber-400 text-slate-950 scale-125 ring-4 ring-amber-400/40 animate-pulse'
                      : isQuizMode && !isRevealed
                        ? 'bg-purple-600 text-white border-2 border-white hover:scale-110'
                        : 'bg-sky-500 text-white border-2 border-white hover:scale-110 shadow-sky-500/50'
                  }`}>
                    {pin.pinNumber}
                  </div>

                  {/* Tooltip Label on Hover (if not quiz mode) */}
                  {!isQuizMode && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -top-8 -translate-x-1/2 bg-slate-900/95 text-slate-100 text-[11px] font-medium px-2.5 py-1 rounded shadow-xl whitespace-nowrap pointer-events-none border border-slate-700">
                      {pin.structureName}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* On-Stage HUD Information Overlay */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col space-y-1 text-xs text-slate-300 bg-slate-950/70 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800/80">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sky-400">Total Mag:</span>
              <span className="font-mono font-bold text-white">{currentTotalZoom}x</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Objective:</span>
              <span className="font-mono text-emerald-400">{activeObjective}</span>
            </div>
            {fineFocus !== 0 && (
              <div className="flex items-center space-x-1 text-amber-400 text-[11px]">
                <span>Focus Offset: {fineFocus > 0 ? `+${fineFocus}` : fineFocus}</span>
              </div>
            )}
          </div>

          {/* Bottom Floating Canvas Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-full px-3 py-1.5 shadow-2xl space-x-2">
            <button
              onClick={() => setScale(s => Math.max(s - 0.25, 0.5))}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 w-12 text-center">
              {(scale * 100).toFixed(0)}%
            </span>
            <button
              onClick={() => setScale(s => Math.min(s + 0.25, 4.0))}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-slate-700" />
            <button
              onClick={handleResetViewport}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Center & Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4. PIN DETAILS & HIGH-YIELD INFO DRAWER */}
        <div className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col overflow-y-auto custom-scrollbar p-4 space-y-4">
          
          {/* Selected Pin Details Box */}
          {selectedPin ? (
            <div className="bg-slate-800/80 rounded-xl p-4 border border-sky-500/40 shadow-lg relative animate-in fade-in duration-150">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center">
                    {selectedPin.pinNumber}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isQuizMode && !revealedQuizPins[selectedPin.id] 
                        ? '??? (Spotter Pin)' 
                        : selectedPin.structureName}
                    </h4>
                    {selectedPin.structureNameAr && (!isQuizMode || revealedQuizPins[selectedPin.id]) && (
                      <p className="text-xs text-sky-400 font-medium" dir="rtl">
                        {selectedPin.structureNameAr}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPin(null)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-700/60"
                >
                  Clear
                </button>
              </div>

              {isQuizMode && !revealedQuizPins[selectedPin.id] ? (
                <div className="mt-3 text-center py-4 bg-slate-900/60 rounded-lg border border-purple-500/30">
                  <p className="text-xs text-purple-300 font-medium mb-2">
                    Can you identify this structure and its staining properties?
                  </p>
                  <button
                    onClick={() => setRevealedQuizPins(prev => ({ ...prev, [selectedPin.id]: true }))}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition shadow-md shadow-purple-600/30"
                  >
                    Reveal Identification & Key Features
                  </button>
                </div>
              ) : (
                <div className="mt-3 space-y-2.5 text-xs">
                  <div>
                    <p className="text-slate-400 font-medium">Histological Features:</p>
                    <p className="text-slate-200 mt-0.5 leading-relaxed">{selectedPin.histologicalFeatures}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Staining Notes:</p>
                    <p className="text-slate-200 mt-0.5 leading-relaxed">{selectedPin.stainingNotes}</p>
                  </div>
                  <div className="bg-sky-950/40 border border-sky-800/40 rounded-lg p-2.5">
                    <p className="text-sky-300 font-semibold flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>Clinical / OSPE Relevance:</span>
                    </p>
                    <p className="text-slate-200 mt-1 leading-relaxed">{selectedPin.clinicalSignificance}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/60 text-center">
              <Info className="w-6 h-6 text-sky-400 mx-auto mb-2 opacity-80" />
              <p className="text-xs font-medium text-slate-300">Click any numbered pin on the slide</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Explore key histological landmarks, staining characteristics, and clinical high-yield pearls.
              </p>
            </div>
          )}

          {/* High Yield Pearls for Current Slide */}
          <div className="bg-slate-800/50 rounded-xl p-3.5 border border-slate-700/50 space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>High-Yield First-Year Pearls</span>
            </h4>
            <ul className="space-y-1.5">
              {selectedSlide.highYieldPearls.map((pearl, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-amber-400 text-sm font-bold leading-none mt-0.5">&bull;</span>
                  <span>{pearl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagnostic Spotter Checklist */}
          <div className="bg-slate-800/50 rounded-xl p-3.5 border border-slate-700/50 space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Spotter Identification Checklist</span>
            </h4>
            <div className="space-y-1.5">
              {selectedSlide.diagnosticChecklist.map((check, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <div className="w-3.5 h-3.5 rounded border border-emerald-500/60 bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 font-bold text-[9px]">
                    ✓
                  </div>
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM MICROSCOPE HARDWARE CONTROLS (Turret, Fine Focus, Light) */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Objective Lens Turret */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Objective Lens:</span>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1">
            {(['4x', '10x', '40x', '100x'] as const).map(obj => {
              const colors = {
                '4x': 'hover:text-red-400 border-red-500',
                '10x': 'hover:text-amber-400 border-yellow-500',
                '40x': 'hover:text-sky-400 border-blue-500',
                '100x': 'hover:text-emerald-400 border-white'
              };
              const isCurrent = activeObjective === obj;
              return (
                <button
                  key={obj}
                  onClick={() => {
                    setActiveObjective(obj);
                    setFineFocus(0);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                    isCurrent
                      ? 'bg-slate-800 text-white shadow-md border ' + colors[obj]
                      : 'text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <span>{obj}</span>
                  {obj === '100x' && <span className="text-[9px] text-slate-500">(Oil)</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fine Focus Adjustment Wheel Simulation */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-400 font-medium">Fine Focus:</span>
          <input
            type="range"
            min="-10"
            max="10"
            step="1"
            value={fineFocus}
            onChange={(e) => setFineFocus(parseInt(e.target.value))}
            className="w-28 sm:w-36 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <button
            onClick={() => setFineFocus(0)}
            className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            title="Snap to optimal sharp focus"
          >
            Auto-Sharp
          </button>
        </div>

        {/* Condenser / Illumination Diaphragm */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-400 font-medium">Diaphragm Light:</span>
          <input
            type="range"
            min="60"
            max="140"
            step="5"
            value={illumination}
            onChange={(e) => setIllumination(parseInt(e.target.value))}
            className="w-24 sm:w-28 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <span className="text-xs font-mono text-slate-400 w-8">{illumination}%</span>
        </div>
      </div>
    </div>
  );
};
