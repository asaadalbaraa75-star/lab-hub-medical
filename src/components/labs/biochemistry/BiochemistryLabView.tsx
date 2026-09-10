import React, { useState } from 'react';
import { CarbohydratesSection } from './CarbohydratesSection';
import { ProteinsTheorySection } from './ProteinsTheorySection';
import { ProteinPracticalLab } from './ProteinPracticalLab';
import { BiochemistryCertificateModal } from './BiochemistryCertificateModal';
import { BiochemistryPathwaysViewer } from './BiochemistryPathwaysViewer';
import {
  FlaskConical,
  Dna,
  Layers,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';

interface BiochemistryLabViewProps {
  searchQuery?: string;
  onSelectTest?: (testId: string) => void;
}

export const BiochemistryLabView: React.FC<BiochemistryLabViewProps> = ({
  searchQuery = '',
  onSelectTest
}) => {
  // STRICT REQUIREMENT: Only TWO main sections on the main page:
  // 01 — CARBOHYDRATES
  // 02 — PROTEINS
  const [activeMainSection, setActiveMainSection] = useState<'carbohydrates' | 'proteins'>('carbohydrates');
  const [proteinSubTab, setProteinSubTab] = useState<'theory' | 'practical'>('practical');
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [showPathways, setShowPathways] = useState<boolean>(false);

  if (showPathways) {
    return (
      <BiochemistryPathwaysViewer
        onBack={() => setShowPathways(false)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300" id="biochemistry-lab-container">
      {/* Top Banner with Strict 2 Main Sections Navigation */}
      <div className="bg-[#0B1120] border border-[#1E293B] rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                BIOCHEMISTRY LABORATORY — 1ST YEAR CURRICULUM
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1.5 font-display">
              مختبر الكيمياء الحيوية (Biochemistry Practical Suite)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed mt-1">
              Strictly organized into two core curriculum sections: 01 — CARBOHYDRATES and 02 — PROTEINS, including dedicated practical experiments and qualitative identification.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => setShowPathways(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-purple-300 border border-purple-500/30 font-bold text-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>المسارات الأيضية (Pathways)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCertificateOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-amber-300 border border-amber-500/30 font-bold text-xs transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>الشهادة (Certificate)</span>
            </button>
          </div>
        </div>

        {/* The TWO Main Sections Primary Selector (Mandated by Prompt) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
          <button
            type="button"
            id="section-btn-carbohydrates"
            onClick={() => setActiveMainSection('carbohydrates')}
            className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
              activeMainSection === 'carbohydrates'
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                : 'bg-[#1E293B]/70 border-[#334155] hover:bg-[#1E293B] opacity-80'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                activeMainSection === 'carbohydrates' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-[#0F172A] text-amber-400'
              }`}>
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                  SECTION 01
                </div>
                <div className="text-base font-bold text-white">
                  01 — CARBOHYDRATES
                </div>
                <div className="text-xs font-arabic text-slate-400">
                  السكريات والاختبارات النوعية الـ 6
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-300/80">6 Tests</span>
          </button>

          <button
            type="button"
            id="section-btn-proteins"
            onClick={() => setActiveMainSection('proteins')}
            className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
              activeMainSection === 'proteins'
                ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/10 border-purple-500 ring-2 ring-purple-500/30 shadow-lg'
                : 'bg-[#1E293B]/70 border-[#334155] hover:bg-[#1E293B] opacity-80'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                activeMainSection === 'proteins' ? 'bg-purple-500 text-white font-bold' : 'bg-[#0F172A] text-purple-400'
              }`}>
                <Dna className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold text-purple-400 uppercase">
                  SECTION 02
                </div>
                <div className="text-base font-bold text-white">
                  02 — PROTEINS
                </div>
                <div className="text-xs font-arabic text-slate-400">
                  الأحماض الأمينية وتجارب المعمل (Biuret & Casein)
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-purple-300/80">Practical + Theory</span>
          </button>
        </div>
      </div>

      {/* RENDER SECTION 01: CARBOHYDRATES */}
      {activeMainSection === 'carbohydrates' && (
        <CarbohydratesSection searchQuery={searchQuery} />
      )}

      {/* RENDER SECTION 02: PROTEINS */}
      {activeMainSection === 'proteins' && (
        <div className="space-y-6">
          {/* Sub-navigation for Proteins: Dedicated Protein Practical vs Theory */}
          <div className="flex items-center justify-between gap-3 bg-[#1E293B] p-3.5 rounded-2xl border border-[#334155]">
            <span className="text-xs font-bold text-slate-300 font-mono">
              PROTEINS MODULE SELECTION:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="protein-tab-practical"
                onClick={() => setProteinSubTab('practical')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  proteinSubTab === 'practical'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-[#0F172A] text-slate-300 border border-slate-700'
                }`}
              >
                🔬 PROTEIN PRACTICAL (معمل كشف البروتين والكازين)
              </button>

              <button
                type="button"
                id="protein-tab-theory"
                onClick={() => setProteinSubTab('theory')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  proteinSubTab === 'theory'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-[#0F172A] text-slate-300 border border-slate-700'
                }`}
              >
                📖 THEORY & STRUCTURE (النظرية والتراكيب)
              </button>
            </div>
          </div>

          {proteinSubTab === 'practical' ? (
            <ProteinPracticalLab />
          ) : (
            <ProteinsTheorySection />
          )}
        </div>
      )}

      {/* Certificate Modal */}
      {isCertificateOpen && (
        <BiochemistryCertificateModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}
    </div>
  );
};
