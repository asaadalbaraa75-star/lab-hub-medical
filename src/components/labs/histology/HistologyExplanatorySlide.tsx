import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Activity,
  CheckCircle2,
  Lightbulb,
  Info,
  BookOpen,
  Layers
} from 'lucide-react';
import { ExplanatorySlideData } from './HistologyLessonsData';
import { HistologyInteractiveSlideViewer } from './HistologyInteractiveSlideViewer';

interface HistologyExplanatorySlideProps {
  data: ExplanatorySlideData;
  lessonTitle?: string;
}

export const HistologyExplanatorySlide: React.FC<HistologyExplanatorySlideProps> = ({
  data,
  lessonTitle = 'Histology Practical Lab'
}) => {
  // Infer visualId if not explicitly specified on data
  const getVisualId = (): string => {
    if (data.visualId) return data.visualId;

    const lowerName = (data.structureName + ' ' + (data.imageAlt || '')).toLowerCase();
    if (lowerName.includes('microscope') || lowerName.includes('compound')) return 'microscope_parts';
    if (lowerName.includes('preparation') || lowerName.includes('fixation') || lowerName.includes('workflow')) return 'tissue_prep_workflow';
    if (lowerName.includes('stain') || lowerName.includes('hematoxylin') || lowerName.includes('eosin')) return 'stains_comparison';
    if (lowerName.includes('eukaryotic') || lowerName.includes('organelle') && !lowerName.includes('golgi') && !lowerName.includes('mitochondri')) return 'eukaryotic_cell';
    if (lowerName.includes('golgi')) return 'organelle_golgi';
    if (lowerName.includes('mitochondri')) return 'organelle_mitochondria';
    if (lowerName.includes('nissl')) return 'organelle_nissl';
    if (lowerName.includes('mitosis') || lowerName.includes('division') || lowerName.includes('anaphase') || lowerName.includes('metaphase')) return 'cell_division_mitosis';
    if (lowerName.includes('squamous') || lowerName.includes('lung') || lowerName.includes('alveoli')) return 'simple_squamous_lung';
    if (lowerName.includes('cuboidal') || lowerName.includes('renal tubule') || lowerName.includes('kidney')) return 'simple_cuboidal_kidney';
    if (lowerName.includes('columnar') && (lowerName.includes('intestine') || lowerName.includes('goblet') || lowerName.includes('gallbladder'))) return 'simple_columnar_intestine';
    if (lowerName.includes('pseudostratified') || lowerName.includes('trachea') || lowerName.includes('ciliated')) return 'pseudostratified_trachea';
    if (lowerName.includes('transitional') || lowerName.includes('urothelium') || lowerName.includes('bladder')) return 'transitional_bladder';
    if (lowerName.includes('taste bud') || lowerName.includes('papilla') || lowerName.includes('tongue')) return 'neuroepithelium_taste_bud';
    if (lowerName.includes('adipose') || lowerName.includes('fat')) return 'adipose_tissue';
    if (lowerName.includes('reticular') || lowerName.includes('silver')) return 'reticular_tissue_silver';
    if (lowerName.includes('tendon') || lowerName.includes('dense regular')) return 'dense_regular_tendon';

    return 'simple_squamous_lung';
  };

  const pointers = (data.pointers || []).map(p => ({
    id: p.id,
    label: p.label,
    xPercent: p.x,
    yPercent: p.y,
    description: p.description || '',
    diagnosticPearl: data.examClue
  }));

  const practicalQuestion = data.practicalQuestion || {
    question: `Based on the microscopic visual features (staining affinity, cellular borders, nuclear shapes), identify this specimen:`,
    options: [
      data.structureName,
      'Stratified Squamous Non-keratinized Epithelium',
      'Dense Irregular Connective Tissue',
      'Hyaline Cartilage Matrix'
    ].sort(() => 0.5 - Math.random()),
    correctIndex: 0,
    explanation: `${data.structureName} is recognized by: ${data.appearance}. Characteristic clue: ${data.examClue}`
  };

  // Adjust correct index for shuffled options
  practicalQuestion.correctIndex = practicalQuestion.options.indexOf(data.structureName);

  return (
    <div className="space-y-6">
      {/* 1. THE MAIN INTERACTIVE HISTOLOGY VIEWER (With the 4 requested actions) */}
      <HistologyInteractiveSlideViewer
        lessonTitle={lessonTitle}
        slideTitle={data.structureName}
        slideTitleAr={data.structureNameAr}
        explanation={data.definition}
        visualId={getVisualId()}
        specimen={data.location && data.location[0] ? data.location[0] : data.structureName}
        stain={data.stain}
        magnification={data.magnification || '400x High-Dry Power'}
        identificationPoints={data.identificationClues}
        ospePearl={data.examClue}
        pointers={pointers}
        practicalQuestion={practicalQuestion}
      />

      {/* 2. COMPREHENSIVE PEDAGOGICAL SLIDE CRITERIA CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Definition & Microscopic Appearance */}
        <div className="md:col-span-2 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 font-mono">
              <Info className="w-4 h-4" />
              Microscopic Appearance (المظهر المجهري)
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {data.appearance}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Anatomical Locations */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                Anatomical Location (الموقع)
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {data.location.map((loc, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-teal-400 font-bold">•</span>
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Physiological Functions */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Functions (الوظائف الحيوية)
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {data.function.map((fn, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Diagnostic Clues & Exam Pearl Card */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              Identification Clues
            </span>
            <ul className="text-xs text-slate-300 space-y-2">
              {data.identificationClues.map((clue, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <span className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-400 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* OSPE Practical Pearl */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-900 border border-amber-500/30 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 font-mono">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              OSPE Exam Pearl (ملاحظة الامتحان العملي)
            </span>
            <p className="text-xs text-amber-200/90 leading-relaxed font-semibold">
              {data.examClue}
            </p>
          </div>

          {/* Arabic Educational Note */}
          {data.arabicNote && (
            <div className="p-3.5 rounded-xl bg-teal-500/5 border border-teal-500/20 text-xs text-teal-300/90 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 font-mono block">
                ملحوظة تعليمية هامة
              </span>
              <p className="leading-relaxed">{data.arabicNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
