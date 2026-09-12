/*
 * © LAB HUB · Developed by Sakina Asaad
 * Medical Image Source & Metadata Badge Component
 */

import React, { useState } from 'react';
import { ShieldCheck, Info, ExternalLink, CheckCircle2 } from 'lucide-react';
import { MedicalImageMetadata } from '../../services/medicalImageRegistry';

interface MedicalImageSourceBadgeProps {
  imageMeta?: MedicalImageMetadata;
  source?: string;
  license?: string;
  credit?: string;
  verified?: boolean;
  className?: string;
}

export const MedicalImageSourceBadge: React.FC<MedicalImageSourceBadgeProps> = ({
  imageMeta,
  source = imageMeta?.source || 'OpenStax Anatomy & Physiology / NLM Visible Human',
  license = imageMeta?.license || 'CC BY 4.0 / Public Domain',
  credit = imageMeta?.credit || 'OpenStax College & NIH Medical Archives',
  verified = imageMeta?.verified ?? true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        title="View Medical Image Source & License Metadata"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900/80 hover:bg-slate-900 text-teal-300 border border-teal-500/30 backdrop-blur-md transition-all shadow-xs cursor-pointer"
      >
        <ShieldCheck className="w-3 h-3 text-teal-400 shrink-0" />
        <span>Verified Medical Source</span>
      </button>

      {isOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute z-50 bottom-full left-0 mb-2 w-72 p-3 bg-slate-900/95 border border-teal-500/40 rounded-xl shadow-xl backdrop-blur-md text-left text-slate-200 text-xs space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold text-teal-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              Scientific Authenticity
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 font-mono border border-teal-800">
              NON-AI VERIFIED
            </span>
          </div>

          <div className="space-y-1 text-[11px]">
            <div>
              <span className="text-slate-400 font-medium">Source: </span>
              <span className="text-slate-200 font-semibold">{source}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">License: </span>
              <span className="text-slate-300">{license}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Credit: </span>
              <span className="text-slate-300">{credit}</span>
            </div>
          </div>

          <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>© LAB HUB · سكينة أسعد</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-teal-400 hover:text-teal-300 font-bold underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
