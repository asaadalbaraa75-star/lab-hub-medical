import React, { useState } from 'react';
import {
  BIOCHEMISTRY_VISUAL_TESTS,
  BiochemistryTestCard,
  VisualBioTest
} from './BiochemistryTestCard';
import { BenedictDedicatedLesson } from './BenedictDedicatedLesson';
import {
  FlaskConical,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Beaker,
  Search,
  Video,
  BookOpen
} from 'lucide-react';

export const CarbohydratesSection: React.FC<{ searchQuery?: string }> = ({ searchQuery = '' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'tests' | 'classification' | 'benedict_dedicated'>('tests');
  const [selectedTestId, setSelectedTestId] = useState<string>('benedict');

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

  const filteredTests = BIOCHEMISTRY_VISUAL_TESTS.filter(t => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.titleEn.toLowerCase().includes(q) ||
      t.titleAr.toLowerCase().includes(q) ||
      t.principle.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6" id="carbohydrates-section-container">
      {/* Section Sub-Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1E293B] p-4 rounded-2xl border border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              01 — CARBOHYDRATES (الكربوهيدرات)
            </h3>
            <p className="text-xs text-slate-400">
              Classification (Mono-, Di-, Polysaccharides) and the 6 Qualitative Practical Identification Tests.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveSubTab('benedict_dedicated')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'benedict_dedicated'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/30 ring-2 ring-amber-300/60'
                : 'bg-[#0F172A] text-amber-300 border border-amber-500/40 hover:border-amber-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>🎥 درس بندكت المعتمد (Benedict's Dedicated)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('tests')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'tests'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                : 'bg-[#0F172A] text-slate-300 border border-slate-700'
            }`}
          >
            الاختبارات النوعية الـ 6 (Qualitative Tests)
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('classification')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'classification'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                : 'bg-[#0F172A] text-slate-300 border border-slate-700'
            }`}
          >
            تصنيف الكربوهيدرات (Classification)
          </button>
        </div>
      </div>

      {/* SUB-VIEW: BENEDICT DEDICATED LESSON */}
      {activeSubTab === 'benedict_dedicated' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#1E293B] border border-amber-500/40 px-4 py-2.5 rounded-xl">
            <span className="text-xs text-amber-300 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>الدرس العملي النموذجي الكامل — اختبار بندكت مع فيديو شرح الطبيب المعتمد</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveSubTab('tests')}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              العودة إلى باقي الاختبارات الـ 6
            </button>
          </div>
          <BenedictDedicatedLesson />
        </div>
      )}

      {/* SUB-VIEW 1: THE 6 QUALITATIVE IDENTIFICATION TESTS */}
      {activeSubTab === 'tests' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400 flex items-center justify-between px-1">
            <span>
              Qualitative Tests for Carbohydrates: 1. Molisch • 2. Iodine • 3. Benedict • 4. Barfoed • 5. Seliwanoff • 6. Bial
            </span>
            <span className="font-mono text-amber-400 font-bold">
              {filteredTests.length} Tests Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTests.map(test => (
              <BiochemistryTestCard
                key={test.id}
                test={test}
                isActive={selectedTestId === test.id}
                onSelect={() => setSelectedTestId(test.id)}
                onOpenDedicatedLesson={() => setActiveSubTab('benedict_dedicated')}
              />
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: CARBOHYDRATE CLASSIFICATIONS */}
      {activeSubTab === 'classification' && (
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
