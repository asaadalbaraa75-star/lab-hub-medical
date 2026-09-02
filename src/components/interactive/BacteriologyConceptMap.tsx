import React, { useState, useMemo } from 'react';
import { 
  BACTERIOLOGY_CONCEPT_ORGANISMS, 
  ConceptMapOrganism 
} from '../../data/bacteriologyConceptMapData';
import { 
  Network, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  FlaskConical, 
  Pill, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  GitCommit,
  GitBranch,
  Info,
  Scale
} from 'lucide-react';

interface BacteriologyConceptMapProps {
  onOpenOrganism?: (organismId: string) => void;
  initialOrganismId?: string;
}

export const BacteriologyConceptMap: React.FC<BacteriologyConceptMapProps> = ({
  onOpenOrganism,
  initialOrganismId
}) => {
  const [selectedOrganism, setSelectedOrganism] = useState<ConceptMapOrganism>(() => {
    if (initialOrganismId) {
      const found = BACTERIOLOGY_CONCEPT_ORGANISMS.find(o => o.id === initialOrganismId);
      if (found) return found;
    }
    return BACTERIOLOGY_CONCEPT_ORGANISMS[0];
  });
  const [gramFilter, setGramFilter] = useState<'all' | 'gram_positive' | 'gram_negative' | 'acid_fast'>('all');
  const [shapeFilter, setShapeFilter] = useState<'all' | 'cocci' | 'bacilli'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Comparison mode
  const [compareId, setCompareId] = useState<string | null>(null);

  const handleSelectAndExplore = (org: ConceptMapOrganism) => {
    setSelectedOrganism(org);
    if (onOpenOrganism) {
      onOpenOrganism(org.id);
    } else {
      const detailElem = document.getElementById('bacteriology-detail-section');
      if (detailElem) {
        detailElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const filteredOrganisms = useMemo(() => {
    return BACTERIOLOGY_CONCEPT_ORGANISMS.filter(org => {
      const matchGram = gramFilter === 'all' || org.gramCategory === gramFilter;
      const matchShape = shapeFilter === 'all' || org.shape === shapeFilter;
      const matchSearch = org.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          org.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          org.majorDiseases.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchGram && matchShape && matchSearch;
    });
  }, [gramFilter, shapeFilter, searchQuery]);

  const compareOrganism = useMemo(() => {
    if (!compareId) return null;
    return BACTERIOLOGY_CONCEPT_ORGANISMS.find(o => o.id === compareId) || null;
  }, [compareId]);

  return (
    <div id="bacteriology-concept-map-container" className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950/60 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center space-x-1.5">
                <Network className="w-3.5 h-3.5" />
                <span>Interactive Mental Map</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Medical Bacteriology System
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bacteriology Concept Network & Algorithmic Map
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Visual diagnostic trees connecting Gram morphology, cellular arrangement, virulence mechanisms, clinical syndromes, diagnostic lab tests, and first-line antimicrobial therapy.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCompareId(compareId ? null : (selectedOrganism.id === BACTERIOLOGY_CONCEPT_ORGANISMS[0].id ? BACTERIOLOGY_CONCEPT_ORGANISMS[3].id : BACTERIOLOGY_CONCEPT_ORGANISMS[0].id))}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center space-x-1.5 ${
                compareId 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{compareId ? 'Exit Comparison' : 'Side-by-Side Compare'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROL TRAY */}
      <div className="bg-slate-900/80 backdrop-blur rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        
        {/* Gram Stain Category Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Organisms' },
            { id: 'gram_positive', label: 'Gram-Positive (Purple)' },
            { id: 'gram_negative', label: 'Gram-Negative (Pink)' },
            { id: 'acid_fast', label: 'Acid-Fast (Red AFB)' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setGramFilter(btn.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                gramFilter === btn.id
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search bacteria, diseases..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* 3. VISUAL CONCEPT NODE GRAPH & SELECTION TRAY */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredOrganisms.map(org => {
          const isSelected = selectedOrganism.id === org.id;
          const isCompared = compareId === org.id;

          const gramBadgeColor = 
            org.gramCategory === 'gram_positive' ? 'border-purple-500/50 bg-purple-950/40 text-purple-300' :
            org.gramCategory === 'gram_negative' ? 'border-pink-500/50 bg-pink-950/40 text-pink-300' :
            'border-red-500/50 bg-red-950/40 text-red-300';

          return (
            <div
              key={org.id}
              id={`organism-card-${org.id}`}
              role="button"
              tabIndex={0}
              onClick={() => handleSelectAndExplore(org)}
              className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between space-y-2.5 cursor-pointer touch-manipulation select-none active:scale-[0.98] ${
                isSelected
                  ? 'bg-teal-950/40 border-teal-500 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/30'
                  : isCompared
                    ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/30'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5 pointer-events-none">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${gramBadgeColor}`}>
                    {org.gramCategory === 'gram_positive' ? 'Gram +' : org.gramCategory === 'gram_negative' ? 'Gram -' : 'AFB'}
                  </span>
                  <span className="text-[11px] text-slate-400 capitalize font-medium">
                    {org.shape}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white italic tracking-tight pointer-events-none">
                  {org.scientificName}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 pointer-events-none">
                  {org.commonName}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <button
                  type="button"
                  id={`explore-btn-${org.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAndExplore(org);
                  }}
                  className="text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1 cursor-pointer py-0.5 px-1 rounded hover:bg-teal-950/50 transition-colors"
                >
                  <span>Explore</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. DETAILED EXPLORATION PANEL (Or Dual Comparison) */}
      <div id="bacteriology-detail-section" className={`grid gap-6 ${compareOrganism ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* Primary Selected Organism Card */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {selectedOrganism.gramCategory.replace('_', ' ')}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedOrganism.oxygenRequirement.replace('_', ' ')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white italic">
                {selectedOrganism.scientificName}
              </h2>
              <p className="text-xs text-teal-400 font-medium">{selectedOrganism.commonName}</p>
            </div>

            {onOpenOrganism && (
              <button
                type="button"
                id="open-full-organism-detail-btn"
                onClick={() => onOpenOrganism(selectedOrganism.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-md shadow-teal-600/30 cursor-pointer active:scale-95"
              >
                <span>Open Full Organism Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Morphological & Diagnostic Hallmarks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-bold text-teal-300 flex items-center space-x-1.5">
                <FlaskConical className="w-4 h-4 text-teal-400" />
                <span>Microscopy & Staining</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedOrganism.diagnosticHallmarks.gramStainDescription}
              </p>
            </div>

            <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-bold text-teal-300 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Culture & Media</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedOrganism.diagnosticHallmarks.cultureMedia}
              </p>
            </div>
          </div>

          {/* Biochemical Identification Tests */}
          <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-teal-300 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Biochemical Reaction Profile</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {selectedOrganism.diagnosticHallmarks.biochemicalTests.map((test, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-200 bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{test}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Virulence Factors */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Key Virulence Factors & Toxins</span>
            </h4>
            <ul className="space-y-1.5">
              {selectedOrganism.keyVirulenceFactors.map((vf, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2 bg-slate-950/40 p-2 rounded-xl border border-slate-800/60">
                  <span className="text-amber-400 font-bold text-xs mt-0.5">&bull;</span>
                  <span>{vf}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Diseases & Therapeutics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-indigo-300 flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-indigo-400" />
                <span>Clinical Manifestations</span>
              </h4>
              <ul className="space-y-1">
                {selectedOrganism.majorDiseases.map((d, idx) => (
                  <li key={idx} className="text-xs text-slate-300">
                    &bull; {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-emerald-300 flex items-center space-x-1.5">
                <Pill className="w-4 h-4 text-emerald-400" />
                <span>First-Line Antibiotics</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedOrganism.firstLineTreatment}
              </p>
            </div>
          </div>

          {/* High-Yield Medical Pearl */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-4 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-amber-300">First-Year Board Pearl</h5>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">{selectedOrganism.highYieldPearl}</p>
            </div>
          </div>
        </div>

        {/* Comparison Organism Card (if active) */}
        {compareOrganism && (
          <div className="bg-slate-900 rounded-3xl border border-amber-500/40 p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                  <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {compareOrganism.gramCategory.replace('_', ' ')}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {compareOrganism.oxygenRequirement.replace('_', ' ')}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-amber-200 italic">
                  {compareOrganism.scientificName}
                </h2>
                <p className="text-xs text-amber-400 font-medium">{compareOrganism.commonName}</p>
              </div>

              <select
                value={compareOrganism.id}
                onChange={e => setCompareId(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500"
              >
                {BACTERIOLOGY_CONCEPT_ORGANISMS.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.scientificName}
                  </option>
                ))}
              </select>
            </div>

            {/* Comparison Highlights */}
            <div className="space-y-4 text-xs">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <p className="font-bold text-amber-300 mb-1">Microscopy:</p>
                <p className="text-slate-300 leading-relaxed">{compareOrganism.diagnosticHallmarks.gramStainDescription}</p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <p className="font-bold text-amber-300 mb-1">Culture:</p>
                <p className="text-slate-300 leading-relaxed">{compareOrganism.diagnosticHallmarks.cultureMedia}</p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <p className="font-bold text-amber-300 mb-1">Biochemical Hallmarks:</p>
                <ul className="space-y-1 mt-1">
                  {compareOrganism.diagnosticHallmarks.biochemicalTests.map((t, i) => (
                    <li key={i} className="text-slate-300">&bull; {t}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <p className="font-bold text-amber-300 mb-1">First-Line Treatment:</p>
                <p className="text-slate-300 leading-relaxed">{compareOrganism.firstLineTreatment}</p>
              </div>

              <div className="bg-amber-950/30 p-4 rounded-2xl border border-amber-500/30">
                <p className="font-bold text-amber-300 mb-1">High-Yield Pearl:</p>
                <p className="text-slate-200 leading-relaxed">{compareOrganism.highYieldPearl}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
