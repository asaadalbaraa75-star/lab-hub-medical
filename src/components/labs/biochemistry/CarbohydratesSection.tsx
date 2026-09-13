/*
 * © LAB HUB · Developed by Sakina Asaad
 * Carbohydrate Section: Practical Identification Curriculum
 *
 * STRICT REQUIREMENT: The final and ONLY order must be:
 * 1. Molisch's Test
 * 2. Iodine Test
 * 3. Benedict's Test
 * 4. Barfoed's Test
 * 5. Seliwanoff's Test
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
  const [selectedExperimentId, setSelectedExperimentId] = useState<CarbohydrateExperimentId | null>(
    initialExperimentId || null
  );

  // Active experiment for full lesson view
  const selectedExperiment = selectedExperimentId
    ? CARBOHYDRATE_EXPERIMENTS.find(e => e.id === selectedExperimentId) || CARBOHYDRATE_EXPERIMENTS[0]
    : null;

  // Strict order of tests for the curriculum
  const orderedTests = [...BIOCHEMISTRY_VISUAL_TESTS].sort((a, b) => a.testNumber - b.testNumber);

  // Filter based on search query if user searches
  const filteredTests = orderedTests.filter(test => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      test.titleEn.toLowerCase().includes(q) ||
      test.titleAr.includes(q) ||
      test.principle.toLowerCase().includes(q) ||
      test.positiveTarget.toLowerCase().includes(q)
    );
  });

  // If student opened a full dedicated lesson, render it
  if (selectedExperiment) {
    return (
      <CarbohydrateExperimentLessonView
        experiment={selectedExperiment}
        onSelectExperiment={(expId) => setSelectedExperimentId(expId)}
        onBackToOverview={() => setSelectedExperimentId(null)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300" id="carbohydrates-section-container">
      {/* 1. Strict Carbohydrate Sequence Header & Quick Navigator */}
      <div className="bg-[#0F172A] border border-[#334155] rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#334155] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
                STRICT 5-EXPERIMENT CURRICULUM SEQUENCE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              تجارب الكشف النوعي عن الكربوهيدرات (المسار العلمي المعتمد)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              ترتيب التجارب المعتمد لطلاب الطب: 1. موليش → 2. اليود → 3. بندكت → 4. بارفود → 5. سيليفانوف
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#1E293B] px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-amber-400 font-bold">5 Experiments</span>
            <span>•</span>
            <span>All Lessons Available</span>
          </div>
        </div>

        {/* Quick Stepper Pills (Strict 1 to 5 Order) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {orderedTests.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedExperimentId(t.id as CarbohydrateExperimentId)}
              className="p-2.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] border border-slate-700 hover:border-amber-500/50 text-left transition-all cursor-pointer group"
              id={`nav-pill-${t.id}`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold mb-1">
                <span>TEST 0{t.testNumber}</span>
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-xs font-bold text-white truncate">
                {t.titleEn}
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5" dir="rtl">
                {t.titleAr}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Experiment Cards List (Rendered in Strict 1..5 Sequence) */}
      <div className="space-y-6">
        {filteredTests.map((test) => (
          <BiochemistryTestCard
            key={test.id}
            test={test}
            onOpenDedicatedLesson={(testId) => setSelectedExperimentId(testId as CarbohydrateExperimentId)}
          />
        ))}
      </div>
    </div>
  );
};
