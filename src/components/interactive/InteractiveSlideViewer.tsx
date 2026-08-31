import React, { useState } from 'react';
import {
  InteractiveImage,
  InteractivePin
} from '../../types';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Info,
  Sparkles,
  Target,
  CheckCircle2
} from 'lucide-react';

interface InteractiveSlideViewerProps {
  interactiveImage: InteractiveImage;
}

export const InteractiveSlideViewer: React.FC<InteractiveSlideViewerProps> = ({
  interactiveImage
}) => {
  const [selectedPin, setSelectedPin] = useState<InteractivePin>(interactiveImage.pins[0] || null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showAllLabels, setShowAllLabels] = useState<boolean>(true);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.25));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      id="interactive-slide-viewer"
      className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm flex flex-col"
    >
      {/* Top Controls & Metadata Bar */}
      <div className="p-4 bg-slate-50 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{interactiveImage.title}</h3>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <span className="font-mono text-teal-700 font-bold">{interactiveImage.magnification}</span>
              <span>•</span>
              <span>{interactiveImage.stainOrView}</span>
            </div>
          </div>
        </div>

        {/* Viewer Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAllLabels(!showAllLabels)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors shadow-xs ${
              showAllLabels
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-white text-slate-600 border-[#E2E8F0]'
            }`}
          >
            {showAllLabels ? 'Pins Visible' : 'Pins Hidden'}
          </button>

          <div className="flex items-center bg-white rounded-lg border border-[#E2E8F0] p-0.5 shadow-xs">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono font-bold text-slate-900">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.25}
              className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-50 border border-[#E2E8F0] text-slate-600 hover:text-slate-900 text-xs shadow-xs"
            title="Reset Zoom"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Interactive Canvas Container */}
        <div className="lg:col-span-8 relative bg-slate-900 overflow-hidden min-h-[360px] sm:min-h-[460px] flex items-center justify-center p-2 select-none">
          <div
            className="relative transition-transform duration-200 ease-out origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={interactiveImage.baseImage}
              alt={interactiveImage.title}
              className="max-h-[460px] w-auto rounded-xl object-contain shadow-2xl pointer-events-none"
            />

            {/* Hotspot Pins */}
            {showAllLabels &&
              interactiveImage.pins.map(pin => {
                const isSelected = selectedPin?.id === pin.id;

                return (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => setSelectedPin(pin)}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all cursor-pointer z-20 ${
                      isSelected
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-300 scale-110 shadow-lg'
                        : 'bg-white/90 hover:bg-indigo-600 text-slate-900 hover:text-white border-2 border-indigo-600 shadow-md animate-pin-pulse'
                    }`}
                    title={pin.structureName}
                  >
                    <span>{pin.label}</span>
                  </button>
                );
              })}
          </div>

          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/20 text-[11px] text-slate-300">
            Click any numbered pin to inspect microscopic features
          </div>
        </div>

        {/* Right Landmark Detail Panel */}
        <div className="lg:col-span-4 bg-white border-t lg:border-t-0 lg:border-l border-[#E2E8F0] p-5 sm:p-6 flex flex-col justify-between space-y-4">
          {selectedPin ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {selectedPin.label}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                    Selected Structure
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 leading-snug">
                  {selectedPin.structureName}
                </h4>
                {selectedPin.stain && (
                  <span className="inline-block mt-1 text-[11px] text-slate-500 font-mono font-medium">
                    Stain: <span className="text-slate-800 font-semibold">{selectedPin.stain}</span>
                  </span>
                )}
              </div>

              {/* Histological / Morphological Features */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                  <Info className="w-3.5 h-3.5" />
                  <span>Histological / Identification Features:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-[#E2E8F0]">
                  {selectedPin.histologicalFeatures}
                </p>
              </div>

              {/* Clinical Significance */}
              {selectedPin.clinicalSignificance && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Clinical & Exam Pearl:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-[#E2E8F0]">
                    {selectedPin.clinicalSignificance}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              Select any numbered pin on the image to view detailed histology.
            </div>
          )}

          {/* Quick Pin List Selector */}
          <div className="pt-3 border-t border-[#E2E8F0]">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
              All Markers on this Slide:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {interactiveImage.pins.map(pin => (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => setSelectedPin(pin)}
                  className={`text-left px-2.5 py-1.5 rounded-lg text-xs truncate transition-colors flex items-center gap-2 shadow-xs ${
                    selectedPin?.id === pin.id
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-[#E2E8F0]'
                  }`}
                >
                  <span className="font-mono font-bold">{pin.label}.</span>
                  <span className="truncate">{pin.structureName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
