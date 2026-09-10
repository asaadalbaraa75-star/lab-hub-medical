import React, { useState } from 'react';
import {
  AMINO_ACID_GENERAL_STRUCTURE,
  AMINO_ACID_CLASSIFICATIONS,
  PEPTIDE_BOND_FORMATION,
  PROTEIN_STRUCTURE_LEVELS,
  PROTEIN_CLASSIFICATIONS_AND_FUNCTIONS,
  ProteinStructureLevel
} from './ProteinsData';
import {
  Dna,
  Layers,
  Sparkles,
  GitBranch,
  Shield,
  Activity,
  CheckCircle2,
  HelpCircle,
  Zap,
  Info
} from 'lucide-react';

export const ProteinsTheorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'structure' | 'classification' | 'levels' | 'classes_functions'>('structure');
  const [selectedLevel, setSelectedLevel] = useState<string>('primary');
  const [classificationType, setClassificationType] = useState<'polarity' | 'nutrition'>('polarity');

  const activeLevelData = PROTEIN_STRUCTURE_LEVELS.find(l => l.level === selectedLevel) || PROTEIN_STRUCTURE_LEVELS[0];

  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl text-slate-100" id="proteins-theory-container">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
            <Dna className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                02 — PROTEINS SYLLABUS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              البروتينات والأحماض الأمينية (Proteins & Amino Acids Curriculum)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Amino Acid Architecture, Polarity & Nutritional Classifications, Peptide Bonds, 1°–4° Structures, and Biological Roles.
            </p>
          </div>
        </div>

        {/* Sub-topic Navigation Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('structure')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'structure'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-[#1E293B] text-slate-300 hover:text-white border border-[#334155]'
            }`}
          >
            1. تركيب الحمض الأميني والرابطة
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('classification')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'classification'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-[#1E293B] text-slate-300 hover:text-white border border-[#334155]'
            }`}
          >
            2. تصنيف الأحماض الأمينية
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('levels')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'levels'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-[#1E293B] text-slate-300 hover:text-white border border-[#334155]'
            }`}
          >
            3. مستويات التركيب (1° - 4°)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('classes_functions')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'classes_functions'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-[#1E293B] text-slate-300 hover:text-white border border-[#334155]'
            }`}
          >
            4. أنواع ووظائف البروتينات
          </button>
        </div>
      </div>

      {/* 1. AMINO ACID STRUCTURE & PEPTIDE BOND */}
      {activeTab === 'structure' && (
        <div className="space-y-6">
          {/* General Amino Acid Structure */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 space-y-5 shadow-lg">
            <div className="border-b border-[#334155] pb-3">
              <h3 className="text-lg font-bold text-white">
                {AMINO_ACID_GENERAL_STRUCTURE.titleEn}
              </h3>
              <p className="text-xs text-purple-400 font-arabic">
                {AMINO_ACID_GENERAL_STRUCTURE.titleAr}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {AMINO_ACID_GENERAL_STRUCTURE.components.map((comp, idx) => (
                <div key={idx} className="bg-[#0F172A] border border-slate-700/70 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300">{comp.name}</span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-purple-950 text-purple-200 border border-purple-800">
                      {comp.formula}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{comp.role}</p>
                </div>
              ))}
            </div>

            {/* Zwitterion Concept */}
            <div className="bg-purple-950/30 border border-purple-500/30 p-4 rounded-xl space-y-1">
              <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>{AMINO_ACID_GENERAL_STRUCTURE.zwitterionConcept.titleEn} ({AMINO_ACID_GENERAL_STRUCTURE.zwitterionConcept.titleAr}):</span>
              </div>
              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                {AMINO_ACID_GENERAL_STRUCTURE.zwitterionConcept.description}
              </p>
            </div>
          </div>

          {/* Peptide Bond Formation */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 space-y-4 shadow-lg">
            <div className="border-b border-[#334155] pb-3">
              <h3 className="text-lg font-bold text-white">
                {PEPTIDE_BOND_FORMATION.titleEn}
              </h3>
              <p className="text-xs text-cyan-400 font-arabic">
                {PEPTIDE_BOND_FORMATION.titleAr}
              </p>
            </div>

            <div className="bg-[#0F172A] border border-cyan-500/30 p-4 rounded-xl text-center space-y-2">
              <div className="text-xs text-slate-400">Chemical Condensation Reaction Formula:</div>
              <div className="text-base sm:text-lg font-mono font-bold text-cyan-300 tracking-wider">
                {PEPTIDE_BOND_FORMATION.formula}
              </div>
              <p className="text-xs text-slate-300 max-w-2xl mx-auto">
                {PEPTIDE_BOND_FORMATION.mechanism}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                خصائص الرابطة الببتيدية الفريدة (Key Chemical Characteristics):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {PEPTIDE_BOND_FORMATION.characteristics.map((char, idx) => (
                  <div key={idx} className="bg-[#0F172A]/70 border border-slate-700/50 p-3 rounded-xl text-xs text-slate-200 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono text-[9px] shrink-0 mt-0.5">•</span>
                    <span>{char}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. AMINO ACID CLASSIFICATIONS */}
      {activeTab === 'classification' && (
        <div className="space-y-4">
          {/* Classification Switcher */}
          <div className="flex items-center gap-2 border-b border-[#334155] pb-3">
            <button
              type="button"
              onClick={() => setClassificationType('polarity')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                classificationType === 'polarity'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#1E293B] text-slate-300 border border-[#334155]'
              }`}
            >
              تصنيف حسب القطبية والشحنة (Polarity & Charge)
            </button>

            <button
              type="button"
              onClick={() => setClassificationType('nutrition')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                classificationType === 'nutrition'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#1E293B] text-slate-300 border border-[#334155]'
              }`}
            >
              تصنيف حسب الأهمية الغذائية (Nutritional: Essential / Non-Essential)
            </button>
          </div>

          {/* Polarity Classification View */}
          {classificationType === 'polarity' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AMINO_ACID_CLASSIFICATIONS.byPolarity.map(group => (
                <div key={group.id} className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 space-y-3 shadow-lg">
                  <div className="border-b border-[#334155] pb-2">
                    <h4 className="text-sm font-bold text-white">{group.nameEn}</h4>
                    <p className="text-xs text-purple-300 font-arabic">{group.nameAr}</p>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{group.description}</p>
                  <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-700/60 text-xs">
                    <div className="font-bold text-slate-400 mb-1">الأمثلة (Examples):</div>
                    <div className="text-purple-200 font-mono text-[11px] leading-relaxed">
                      {group.examples.join(' • ')}
                    </div>
                  </div>
                  <div className="bg-amber-950/30 border border-amber-500/30 p-2.5 rounded-xl text-xs text-amber-100">
                    <span className="font-bold text-amber-300">Clinical Pearl: </span>
                    {group.clinicalPearl}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Nutritional Classification View */}
          {classificationType === 'nutrition' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {AMINO_ACID_CLASSIFICATIONS.byNutrition.map(group => (
                <div key={group.id} className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 space-y-3 shadow-lg">
                  <div className="border-b border-[#334155] pb-2">
                    <h4 className="text-sm font-bold text-white">{group.nameEn}</h4>
                    <p className="text-xs text-cyan-300 font-arabic">{group.nameAr}</p>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{group.description}</p>
                  <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-700/60 text-xs">
                    <div className="font-bold text-slate-400 mb-1">الأمثلة (Examples):</div>
                    <div className="text-cyan-200 font-mono text-[11px] leading-relaxed">
                      {group.examples.join(', ')}
                    </div>
                  </div>
                  <div className="bg-amber-950/30 border border-amber-500/30 p-2.5 rounded-xl text-xs text-amber-100">
                    <span className="font-bold text-amber-300">Clinical Pearl: </span>
                    {group.clinicalPearl}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. LEVELS OF PROTEIN STRUCTURE (1° - 4°) */}
      {activeTab === 'levels' && (
        <div className="space-y-5">
          {/* Level Switcher Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PROTEIN_STRUCTURE_LEVELS.map(lvl => (
              <button
                key={lvl.level}
                type="button"
                onClick={() => setSelectedLevel(lvl.level)}
                className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                  selectedLevel === lvl.level
                    ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-lg shadow-purple-600/30'
                    : 'bg-[#1E293B] text-slate-300 border-[#334155] hover:border-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">
                  {lvl.level.toUpperCase()}
                </div>
                <div className="text-sm font-bold truncate">{lvl.titleEn.split('(')[0]}</div>
                <div className="text-xs font-arabic opacity-90 truncate mt-0.5">{lvl.titleAr}</div>
              </button>
            ))}
          </div>

          {/* Level Detail Card */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 space-y-5 shadow-lg">
            <div className="border-b border-[#334155] pb-3 space-y-1">
              <h3 className="text-xl font-bold text-white">{activeLevelData.titleEn}</h3>
              <p className="text-xs text-purple-300 font-arabic">{activeLevelData.titleAr}</p>
            </div>

            <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <span className="font-bold text-purple-400">Definition: </span>
              {activeLevelData.definition}
            </div>

            {/* Stabilizing Bonds */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>الروابط الكيميائية المثبتة لهذا التركيب (Stabilizing Bonds):</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeLevelData.stabilizingBonds.map((bond, idx) => (
                  <div key={idx} className="bg-[#0F172A] border border-slate-700/60 p-2.5 rounded-xl text-xs text-emerald-200 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{bond}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Features */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>الخصائص الفراغية والهندسية (Architectural Features):</span>
              </h4>
              <div className="space-y-1.5">
                {activeLevelData.architecturalFeatures.map((feat, idx) => (
                  <div key={idx} className="bg-[#0F172A]/70 border border-slate-700/50 p-2.5 rounded-xl text-xs text-slate-200">
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Significance */}
            <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-100">
              <span className="font-bold text-amber-300">الأهمية السريرية والارتباط بالمرض: </span>
              {activeLevelData.clinicalSignificance}
            </div>
          </div>
        </div>
      )}

      {/* 4. PROTEIN CLASSIFICATIONS & FUNCTIONS */}
      {activeTab === 'classes_functions' && (
        <div className="space-y-6">
          {/* Classifications */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-purple-400">
              تصنيف البروتينات حسب الشكل والتركيب (Fibrous, Globular & Conjugated):
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PROTEIN_CLASSIFICATIONS_AND_FUNCTIONS.classifications.map((cls, idx) => (
                <div key={idx} className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 space-y-2.5 shadow-lg">
                  <h4 className="text-sm font-bold text-white">{cls.titleEn}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{cls.definition}</p>
                  <div className="bg-[#0F172A] p-2.5 rounded-xl border border-slate-700/60 text-xs">
                    <div className="font-bold text-slate-400 mb-1">الأمثلة:</div>
                    <ul className="space-y-1 text-purple-200 text-[11px]">
                      {cls.examples.map((ex, i) => (
                        <li key={i}>• {ex}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Biological Functions */}
          <div className="space-y-3 pt-4 border-t border-[#334155]">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-cyan-400">
              الوظائف الحيوية الرئيسية للبروتينات في جسم الإنسان (Biological Functions):
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {PROTEIN_CLASSIFICATIONS_AND_FUNCTIONS.biologicalFunctions.map((func, idx) => (
                <div key={idx} className="bg-[#1E293B] border border-[#334155] p-3.5 rounded-xl text-xs text-slate-200 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{func}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
