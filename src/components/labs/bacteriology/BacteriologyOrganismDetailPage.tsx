import React, { useState, useEffect } from 'react';
import {
  ConceptMapOrganism,
  BACTERIOLOGY_CONCEPT_ORGANISMS
} from '../../../data/bacteriologyConceptMapData';
import {
  ArrowLeft,
  Bug,
  FlaskConical,
  Layers,
  ShieldCheck,
  Activity,
  Pill,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Share2,
  BookOpen,
  Microscope,
  Award,
  Zap,
  RotateCcw
} from 'lucide-react';

interface BacteriologyOrganismDetailPageProps {
  organismId: string;
  onBack: () => void;
  onSelectOrganism?: (organismId: string) => void;
  onOpenQuiz?: () => void;
  onOpenSpotter?: () => void;
}

// Map any variation of ID or scientific name to the canonical organism
export const findOrganismByIdOrName = (idOrName: string): ConceptMapOrganism => {
  const query = idOrName.toLowerCase().trim().replace(/_/g, '-').replace(/\s+/g, '-');
  
  const found = BACTERIOLOGY_CONCEPT_ORGANISMS.find(org => {
    const orgId = org.id.toLowerCase();
    const scName = org.scientificName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const common = org.commonName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    return (
      orgId === query ||
      orgId.includes(query) ||
      query.includes(orgId) ||
      scName.includes(query) ||
      common.includes(query)
    );
  });

  return found || BACTERIOLOGY_CONCEPT_ORGANISMS[0];
};

export const BacteriologyOrganismDetailPage: React.FC<BacteriologyOrganismDetailPageProps> = ({
  organismId,
  onBack,
  onSelectOrganism,
  onOpenQuiz,
  onOpenSpotter
}) => {
  const [organism, setOrganism] = useState<ConceptMapOrganism>(() => findOrganismByIdOrName(organismId));
  const [activeTab, setActiveTab] = useState<'overview' | 'diagnostics' | 'virulence' | 'clinical' | 'treatment'>('overview');
  const [isCopied, setIsCopied] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setOrganism(findOrganismByIdOrName(organismId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [organismId]);

  const currentIndex = BACTERIOLOGY_CONCEPT_ORGANISMS.findIndex(o => o.id === organism.id);
  const prevOrganism = currentIndex > 0 ? BACTERIOLOGY_CONCEPT_ORGANISMS[currentIndex - 1] : BACTERIOLOGY_CONCEPT_ORGANISMS[BACTERIOLOGY_CONCEPT_ORGANISMS.length - 1];
  const nextOrganism = currentIndex < BACTERIOLOGY_CONCEPT_ORGANISMS.length - 1 ? BACTERIOLOGY_CONCEPT_ORGANISMS[currentIndex + 1] : BACTERIOLOGY_CONCEPT_ORGANISMS[0];

  const handleNavigate = (targetId: string) => {
    if (onSelectOrganism) {
      onSelectOrganism(targetId);
    } else {
      setOrganism(findOrganismByIdOrName(targetId));
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const gramColorClass =
    organism.gramCategory === 'gram_positive'
      ? {
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          gradient: 'from-purple-950/80 via-slate-900 to-slate-950',
          glow: 'bg-purple-500/10',
          pill: 'bg-purple-900/40 text-purple-200 border-purple-700/50'
        }
      : organism.gramCategory === 'gram_negative'
      ? {
          badge: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
          gradient: 'from-pink-950/80 via-slate-900 to-slate-950',
          glow: 'bg-pink-500/10',
          pill: 'bg-pink-900/40 text-pink-200 border-pink-700/50'
        }
      : {
          badge: 'bg-red-500/20 text-red-300 border-red-500/40',
          gradient: 'from-red-950/80 via-slate-900 to-slate-950',
          glow: 'bg-red-500/10',
          pill: 'bg-red-900/40 text-red-200 border-red-700/50'
        };

  return (
    <div id="bacteriology-organism-detail-page" className="max-w-6xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP NAVIGATION BAR */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-800">
        <button
          type="button"
          id="back-to-concept-map-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all border border-slate-700 cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bacteriology Hub</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick Prev / Next Buttons */}
          <button
            type="button"
            id="prev-organism-btn"
            onClick={() => handleNavigate(prevOrganism.id)}
            title={`Previous: ${prevOrganism.scientificName}`}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline-block px-2">
            {currentIndex + 1} / {BACTERIOLOGY_CONCEPT_ORGANISMS.length}
          </span>

          <button
            type="button"
            id="next-organism-btn"
            onClick={() => handleNavigate(nextOrganism.id)}
            title={`Next: ${nextOrganism.scientificName}`}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
            title="Copy link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. HERO CARD & MORPHOLOGICAL IDENTITY */}
      <div className={`relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r ${gramColorClass.gradient} p-6 sm:p-8 shadow-2xl`}>
        <div className={`absolute right-0 top-0 w-96 h-96 ${gramColorClass.glow} rounded-full blur-3xl pointer-events-none`} />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${gramColorClass.badge}`}>
              {organism.gramCategory === 'gram_positive' ? 'Gram-Positive (Purple)' : organism.gramCategory === 'gram_negative' ? 'Gram-Negative (Pink)' : 'Acid-Fast Bacillus (AFB)'}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 capitalize">
              Shape: {organism.shape}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 capitalize">
              Arrangement: {organism.arrangement.replace('_', ' ')}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 capitalize">
              Oxygen: {organism.oxygenRequirement.replace('_', ' ')}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 capitalize">
              {organism.sporeFormation.replace('_', ' ')}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white italic tracking-tight drop-shadow-sm">
              {organism.scientificName}
            </h1>
            <p className="text-sm sm:text-base text-teal-300 font-semibold mt-1 flex items-center gap-2">
              <span>Common Name / Descriptor:</span>
              <span className="text-white font-normal bg-teal-950/60 px-2.5 py-0.5 rounded-lg border border-teal-800/40">
                {organism.commonName}
              </span>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {organism.diagnosticHallmarks.gramStainDescription}
          </p>
        </div>
      </div>

      {/* 3. INTERACTIVE SECTION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 bg-slate-900 rounded-2xl border border-slate-800">
        {[
          { id: 'overview', label: '1. Overview & Microscopy', icon: Microscope },
          { id: 'diagnostics', label: '2. Lab Diagnostics & Media', icon: FlaskConical },
          { id: 'virulence', label: '3. Virulence & Toxins', icon: ShieldCheck },
          { id: 'clinical', label: '4. Clinical Manifestations', icon: Activity },
          { id: 'treatment', label: '5. Treatment & High-Yield', icon: Pill }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. TAB CONTENTS */}
      <div className="space-y-6">

        {/* TAB 1: OVERVIEW & MICROSCOPY */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
            {/* Morphological Profile */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Microscope className="w-5 h-5 text-teal-400" />
                <span>Microscopic Characteristics</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="font-bold text-teal-300 block mb-1">Gram Reaction & Staining:</span>
                  <p className="text-slate-200 leading-relaxed">{organism.diagnosticHallmarks.gramStainDescription}</p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="font-bold text-teal-300 block mb-1">Shape & Cell Arrangement:</span>
                  <p className="text-slate-200 capitalize leading-relaxed">
                    {organism.shape} in {organism.arrangement.replace('_', ' ')}
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="font-bold text-teal-300 block mb-1">Motility & Spores:</span>
                  <p className="text-slate-200 capitalize leading-relaxed">
                    {organism.motility.replace('_', ' ')} | {organism.sporeFormation.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Identification Keys */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Rapid Identification Key</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="font-bold text-amber-300 block mb-1">Special Differentiation Rule:</span>
                  <p className="text-slate-200 leading-relaxed">{organism.diagnosticHallmarks.specialIdentification}</p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="font-bold text-amber-300 block mb-1">Transmission Modes:</span>
                  <ul className="space-y-1 mt-1">
                    {organism.transmission.map((t, idx) => (
                      <li key={idx} className="text-slate-200 flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIAGNOSTICS & MEDIA */}
        {activeTab === 'diagnostics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
            {/* Culture & Media */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Layers className="w-5 h-5 text-teal-400" />
                <span>Culture Media & Colony Morphology</span>
              </h3>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {organism.diagnosticHallmarks.cultureMedia}
                </p>
              </div>
            </div>

            {/* Biochemical Profile */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <FlaskConical className="w-5 h-5 text-teal-400" />
                <span>Biochemical Reaction Profile</span>
              </h3>

              <div className="space-y-2.5">
                {organism.diagnosticHallmarks.biochemicalTests.map((test, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 font-medium">{test}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VIRULENCE FACTORS */}
        {activeTab === 'virulence' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-sm animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Key Virulence Factors & Toxins</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {organism.keyVirulenceFactors.map((vf, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">{vf}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLINICAL MANIFESTATIONS */}
        {activeTab === 'clinical' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-sm animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Activity className="w-5 h-5 text-rose-400" />
              <span>Major Clinical Syndromes & Diseases</span>
            </h3>

            <div className="space-y-3">
              {organism.majorDiseases.map((dis, idx) => (
                <div key={idx} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {dis}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TREATMENT & HIGH-YIELD PEARL */}
        {activeTab === 'treatment' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Treatment & Prevention */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-3 shadow-sm">
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <Pill className="w-5 h-5" />
                  <span>First-Line Antimicrobial Therapy</span>
                </h3>
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
                  <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed font-medium">
                    {organism.firstLineTreatment}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-3 shadow-sm">
                <h3 className="text-base font-bold text-teal-400 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Prevention & Infection Control</span>
                </h3>
                <div className="p-4 bg-teal-950/20 border border-teal-500/30 rounded-xl">
                  <p className="text-xs sm:text-sm text-teal-200 leading-relaxed font-medium">
                    {organism.prevention}
                  </p>
                </div>
              </div>
            </div>

            {/* High-Yield Medical Board Pearl */}
            <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-slate-900 border border-amber-500/40 rounded-2xl p-6 flex items-start gap-4 shadow-lg">
              <Sparkles className="w-7 h-7 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-bold text-amber-300">
                  First-Year Medical Board High-Yield Pearl
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {organism.highYieldPearl}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 5. QUICK NAVIGATION TO ALL 8 ORGANISMS TRAY */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Explore Other Bacteriology Organisms:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {BACTERIOLOGY_CONCEPT_ORGANISMS.map(org => {
            const isCurrent = org.id === organism.id;
            return (
              <button
                key={org.id}
                type="button"
                id={`quick-nav-${org.id}`}
                onClick={() => handleNavigate(org.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-teal-600 text-white border-teal-400 shadow-md font-bold'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="text-[10px] opacity-80 uppercase">{org.gramCategory.replace('_', ' ')}</div>
                <div className="text-xs italic truncate font-semibold">{org.scientificName}</div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
