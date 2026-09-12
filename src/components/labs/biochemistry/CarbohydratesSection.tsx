/*
 * © LAB HUB · Developed by Sakina Asaad
 * Carbohydrate Section: Strict 5-Experiment Curriculum
 *
 * Strict, Immutable Sequence:
 * 1. Molisch's Test
 * 2. Iodine Test
 * 3. Benedict's Test
 * 4. Barfoed's Test
 * 5. Seliwanoff's Test
 *
 * Each experiment is rendered with a dedicated separate lesson containing:
 * - Lesson
 * - Real laboratory image
 * - Procedure
 * - Observation
 * - Result/interpretation
 * - Doctor explanation video
 * - Questions
 */

import React, { useState } from 'react';
import {
  CARBOHYDRATE_EXPERIMENTS,
  CarbohydrateExperiment,
  CarbohydrateExperimentId
} from './CarbohydrateCurriculumData';
import { CarbohydrateExperimentLessonView } from './CarbohydrateExperimentLessonView';
import {
  BIOCHEMISTRY_VISUAL_TESTS,
  BiochemistryTestCard
} from './BiochemistryTestCard';
import {
  FlaskConical,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  ListOrdered,
  Layers,
  ChevronRight,
  ZoomIn,
  Video,
  HelpCircle,
  Clock,
  Eye
} from 'lucide-react';

interface CarbohydratesSectionProps {
  searchQuery?: string;
  initialExperimentId?: CarbohydrateExperimentId;
}

export const CarbohydratesSection: React.FC<CarbohydratesSectionProps> = ({
  searchQuery = '',
  initialExperimentId
}) => {
  // Navigation State
  // 'curriculum' = Overview grid of the 5 experiments
  // 'lesson' = Full separate interactive lesson of the selected experiment
  // 'classification' = Biochemical classification tab
  const [activeView, setActiveView] = useState<'curriculum' | 'lesson' | 'classification'>('curriculum');
  const [activeExperimentId, setActiveExperimentId] = useState<CarbohydrateExperimentId>(
    initialExperimentId || 'molisch'
  );

  const carbClassifications = [
    {
      titleEn: 'Monosaccharides (السكريات الأحادية)',
      definition: 'Simple sugars that cannot be hydrolyzed into simpler carbohydrate units. Basic building blocks with general formula (CH₂O)n.',
      subgroups: [
        'Aldoses (contain aldehyde —CHO group): Glucose, Galactose, Ribose',
        'Ketoses (contain ketone C=O group): Fructose, Ribulose'
      ],
      reducingAbility: 'All monosaccharides are strong reducing sugars (contain free carbonyl group).'
    },
    {
      titleEn: 'Disaccharides (السكريات الثنائية)',
      definition: 'Consist of two monosaccharide units joined covalently by a glycosidic bond with elimination of water.',
      subgroups: [
        'Maltose: Glucose + Glucose (α-1,4 bond) — Reducing sugar',
        'Lactose: Galactose + Glucose (β-1,4 bond) — Reducing sugar of milk',
        'Sucrose: Glucose + Fructose (α-1, β-2 bond) — NON-REDUCING sugar (both anomeric carbons are locked)'
      ],
      reducingAbility: 'Reducing (Maltose, Lactose); Non-reducing (Sucrose).'
    },
    {
      titleEn: 'Polysaccharides (السكريات المعقدة)',
      definition: 'High-molecular-weight polymers composed of hundreds to thousands of monosaccharide units.',
      subgroups: [
        'Starch: Storage carbohydrate in plants (Amylose + Amylopectin)',
        'Glycogen: Major storage carbohydrate in human liver and skeletal muscle (highly branched)',
        'Cellulose: Structural polymer of plant cell walls (β-1,4 glycosidic bonds, indigestible in humans)'
      ],
      reducingAbility: 'Non-reducing sugars due to very low ratio of free anomeric ends to total mass.'
    }
  ];

  // Strictly maintain the 1..5 sequence regardless of filtering
  const filteredExperiments = CARBOHYDRATE_EXPERIMENTS.filter(exp => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      exp.name.toLowerCase().includes(q) ||
      exp.nameAr.toLowerCase().includes(q) ||
      exp.tagline.toLowerCase().includes(q) ||
      exp.lesson.principleEn.toLowerCase().includes(q) ||
      exp.lesson.targetAnalytesEn.toLowerCase().includes(q)
    );
  });

  const handleOpenExperimentLesson = (id: CarbohydrateExperimentId) => {
    setActiveExperimentId(id);
    setActiveView('lesson');
  };

  const selectedExperiment = CARBOHYDRATE_EXPERIMENTS.find(e => e.id === activeExperimentId) || CARBOHYDRATE_EXPERIMENTS[0];

  return (
    <div className="space-y-6" id="carbohydrates-section-container">
      {/* Top Banner & Tab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1E293B] p-5 rounded-2xl border border-[#334155] shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                01 — CARBOHYDRATES CURRICULUM
              </h3>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 border border-amber-700/50 px-2 py-0.5 rounded-full">
                5 Lab Experiments
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Strict Sequential Order: 1. Molisch's Test &rarr; 2. Iodine Test &rarr; 3. Benedict's Test &rarr; 4. Barfoed's Test &rarr; 5. Seliwanoff's Test
            </p>
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveView('curriculum')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'curriculum'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
                : 'bg-[#0F172A] text-slate-300 border border-slate-700 hover:border-slate-600'
            }`}
            id="tab-curriculum-overview"
          >
            <ListOrdered className="w-4 h-4" />
            <span>The 5 Experiments (قائمة التجارب الـ 5)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('classification')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'classification'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
                : 'bg-[#0F172A] text-slate-300 border border-slate-700 hover:border-slate-600'
            }`}
            id="tab-classification"
          >
            <Layers className="w-4 h-4" />
            <span>Classification (تصنيف الكربوهيدرات)</span>
          </button>
        </div>
      </div>

      {/* STUDENT'S LEARNING PATH: STRICT SEQUENTIAL ROADMAP (Always displayed at top for fast jumping) */}
      <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>STUDENT'S SEQUENTIAL LEARNING PATH (مسار التعلم العملي الإلزامي)</span>
          </div>
          <span className="text-[11px] text-amber-400/90 font-mono font-bold">
            Step-by-Step Diagnostic Hierarchy
          </span>
        </div>

        {/* 5 Sequential Steps strictly 1..5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {CARBOHYDRATE_EXPERIMENTS.map((exp) => {
            const isCurrentlyActive = activeView === 'lesson' && activeExperimentId === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => handleOpenExperimentLesson(exp.id)}
                className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden group cursor-pointer ${
                  isCurrentlyActive
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20 font-bold scale-[1.02]'
                    : 'bg-[#1E293B] hover:bg-[#283548] text-slate-200 border-slate-700/80 hover:border-amber-400/60'
                }`}
                id={`sequence-step-${exp.order}`}
                title={`Open Experiment ${exp.order}: ${exp.name}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                      isCurrentlyActive
                        ? 'bg-slate-950 text-amber-400'
                        : 'bg-slate-800 text-amber-400 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors'
                    }`}
                  >
                    0{exp.order}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isCurrentlyActive ? 'bg-slate-950/20 text-slate-900' : 'text-slate-400 bg-slate-800/80'
                  }`}>
                    Exp {exp.order}
                  </span>
                </div>

                <div className="font-extrabold text-xs truncate">
                  {exp.name}
                </div>
                <div className={`text-[11px] font-medium truncate mt-0.5 ${
                  isCurrentlyActive ? 'text-slate-900 font-bold' : 'text-slate-400'
                }`} dir="rtl">
                  {exp.nameAr}
                </div>
                <div className={`text-[10px] mt-1 line-clamp-1 ${
                  isCurrentlyActive ? 'text-slate-800' : 'text-slate-500'
                }`}>
                  {exp.targetSugar}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: DEDICATED SEPARATE LESSON FOR THE CHOSEN EXPERIMENT */}
      {activeView === 'lesson' && (
        <CarbohydrateExperimentLessonView
          experiment={selectedExperiment}
          onSelectExperiment={(expId) => setActiveExperimentId(expId)}
          onBackToOverview={() => setActiveView('curriculum')}
        />
      )}

      {/* VIEW 2: OVERVIEW OF ALL 5 EXPERIMENTS */}
      {activeView === 'curriculum' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold text-slate-300">
              The 5 Mandatory Carbohydrate Practical Tests (مرتبة تسلسلياً حسب المنهج العلمي):
            </span>
            <span className="font-mono text-amber-400 font-bold bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded">
              {filteredExperiments.length} of 5 Available
            </span>
          </div>

          {/* Cards of the 5 Experiments strictly ordered 1..5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExperiments.map((exp) => (
              <div
                key={exp.id}
                className="bg-[#1E293B] border border-slate-700/80 hover:border-amber-500/60 rounded-2xl p-5 space-y-4 shadow-md transition-all flex flex-col justify-between group"
                id={`curriculum-card-${exp.id}`}
              >
                <div className="space-y-3">
                  {/* Card Header with Order Number */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
                        0{exp.order}
                      </span>
                      <div>
                        <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                          {exp.name}
                        </h4>
                        <span className="text-xs font-bold text-amber-400/90 block" dir="rtl">
                          {exp.nameAr}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                      {exp.categoryBadge}
                    </span>
                  </div>

                  {/* Real Laboratory Image Preview */}
                  <div
                    onClick={() => handleOpenExperimentLesson(exp.id)}
                    className="relative rounded-xl overflow-hidden h-36 bg-slate-950 border border-slate-700/60 cursor-pointer group/img"
                  >
                    <img
                      src={exp.realImage.url}
                      alt={exp.name}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[11px] text-amber-300 font-bold flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Real Lab Result: {exp.observation.positiveVisualEn.substring(0, 35)}...</span>
                      </span>
                    </div>
                  </div>

                  {/* Chemical Principle Summary */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {exp.lesson.principleEn}
                  </p>

                  {/* High Yield Key Specs */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="bg-[#0F172A] p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Positive Result:</span>
                      <span className="text-emerald-400 font-bold truncate block">{exp.tubes.posLabelEn}</span>
                    </div>
                    <div className="bg-[#0F172A] p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Target Analytes:</span>
                      <span className="text-amber-300 font-bold truncate block">{exp.targetSugar}</span>
                    </div>
                  </div>

                  {/* Doctor Video Banner */}
                  <div className="flex items-center justify-between text-[11px] bg-slate-900/60 p-2 rounded-xl border border-slate-800 text-slate-300">
                    <span className="flex items-center gap-1.5 text-rose-400 font-medium">
                      <Video className="w-3.5 h-3.5" />
                      <span>{exp.doctorVideo.doctorName}</span>
                    </span>
                    <span className="font-mono text-slate-400">{exp.doctorVideo.duration}</span>
                  </div>
                </div>

                {/* Primary Action Button to enter Separate Lesson */}
                <button
                  type="button"
                  onClick={() => handleOpenExperimentLesson(exp.id)}
                  className="w-full mt-3 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id={`open-lesson-btn-${exp.id}`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>فتح الدرس العملي المنفصل (Open Full Lesson)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: BIOCHEMICAL CLASSIFICATION */}
      {activeView === 'classification' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {carbClassifications.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 space-y-3 shadow-lg"
            >
              <div className="border-b border-[#334155] pb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800">
                  CLASS #{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{cat.titleEn}</h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{cat.definition}</p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  الأقسام والأمثلة:
                </span>
                {cat.subgroups.map((sub, i) => (
                  <div
                    key={i}
                    className="bg-[#0F172A] border border-slate-700/60 p-2 rounded-xl text-xs text-slate-200"
                  >
                    {sub}
                  </div>
                ))}
              </div>

              <div className="bg-amber-950/30 border border-amber-500/30 p-2.5 rounded-xl text-xs text-amber-100 mt-2">
                <span className="font-bold text-amber-300">Reducing Ability: </span>
                {cat.reducingAbility}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
