import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Printer,
  Compass,
  Layers,
  Activity,
  Heart,
  Eye,
  Microscope,
  Info,
  X,
  ChevronRight,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Download
} from 'lucide-react';

import {
  ANATOMICAL_POSITION_DATA,
  ANATOMICAL_PLANES_DATA,
  DIRECTIONAL_TERMS_DATA,
  BODY_MOVEMENTS_DATA,
  SKELETAL_BONES_DATA,
  JOINTS_DATA,
  MUSCLES_DATA,
  ORGAN_SYSTEMS_DATA,
  HISTOLOGY_FIRST_YEAR_TOPICS,
  HistologyTissueDetail
} from './VisualMapData';

import {
  AnatomicalPositionRenderer,
  AnatomicalPlanesRenderer,
  DirectionalTermsRenderer,
  BodyMovementsRenderer,
  SkeletalSystemRenderer,
  JointsRenderer,
  MuscularSystemRenderer
} from './AnatomyVisualRenderers';

import {
  NervousSystemRenderer,
  CardiovascularSystemRenderer,
  RespiratorySystemRenderer,
  DigestiveSystemRenderer,
  UrinarySystemRenderer,
  ReproductiveSystemRenderer
} from './OrganSystemsRenderers';

import {
  HistologyMicrographCard
} from './HistologyAtlasRenderers';

interface FirstYearMedicalVisualMapProps {
  onBack?: () => void;
}

export const FirstYearMedicalVisualMap: React.FC<FirstYearMedicalVisualMapProps> = ({ onBack }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeSection, setActiveSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTissueModal, setSelectedTissueModal] = useState<HistologyTissueDetail | null>(null);
  const [selectedStructureModal, setSelectedStructureModal] = useState<{
    title: string;
    description: string;
    pearl?: string;
  } | null>(null);

  const [histologyCategoryFilter, setHistologyCategoryFilter] = useState<string>('All');

  // Histology filter tabs
  const histologyCategories = [
    'All',
    'Epithelium',
    'Connective Tissue',
    'Cartilage',
    'Bone',
    'Blood',
    'Muscle',
    'Nervous Tissue',
    'Glandular Tissue'
  ];

  const filteredHistology = useMemo(() => {
    return HISTOLOGY_FIRST_YEAR_TOPICS.filter((tissue) => {
      const matchesCategory =
        histologyCategoryFilter === 'All' || tissue.category === histologyCategoryFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        tissue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tissue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tissue.diagnosticClue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tissue.typicalLocations.some((loc) => loc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [histologyCategoryFilter, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & CONTROLS TOOLBAR (EXCLUDED FROM PRINT) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Title & Badge */}
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                ← Back to Labs
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-sky-500/20">
                  1st-Year Medical Practical Core
                </span>
                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Atlas Edition
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight">
                FIRST-YEAR MEDICAL ANATOMY & HISTOLOGY — COMPLETE VISUAL MAP
              </h1>
            </div>
          </div>

          {/* Quick Toolbar Tools */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search bone, muscle, tissue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 w-44 sm:w-56"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-0.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
                className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-[11px] font-mono font-medium text-slate-600 dark:text-slate-300">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Theme Toggle (Poster White vs Lab Dark) */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              {isDark ? '☀️ Poster White' : '🌙 Lab Dark'}
            </button>

            {/* Print / Save PDF */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Poster</span>
            </button>
          </div>
        </div>

        {/* Quick Navigation Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 overflow-x-auto flex items-center gap-2 scrollbar-none border-t border-slate-100 dark:border-slate-800/60">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
            Jump to:
          </span>
          {[
            { id: 'sec-position', label: '1. Position' },
            { id: 'sec-planes', label: '2. Planes' },
            { id: 'sec-direction', label: '3. Directional Terms' },
            { id: 'sec-movements', label: '4. Movements' },
            { id: 'sec-skeletal', label: '5. Skeletal System' },
            { id: 'sec-joints', label: '6. Joints' },
            { id: 'sec-muscles', label: '7. Muscular System' },
            { id: 'sec-nervous', label: '8. Nervous' },
            { id: 'sec-cardio', label: '9. Cardiovascular' },
            { id: 'sec-respiratory', label: '10. Respiratory' },
            { id: 'sec-digestive', label: '11. Digestive' },
            { id: 'sec-urinary', label: '12. Urinary' },
            { id: 'sec-reproductive', label: '13. Reproductive' },
            { id: 'sec-histology', label: '★ Histology Atlas' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 hover:bg-sky-50 dark:bg-slate-800 dark:hover:bg-slate-700 hover:text-sky-600 dark:hover:text-sky-400 whitespace-nowrap transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. POSTER BODY CANVAS (SCALED CONTAINER) */}
      {/* ========================================================================= */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 transition-transform origin-top"
        style={{ zoom: `${zoomLevel}%` }}
      >
        {/* POSTER HERO BANNER */}
        <div className={`rounded-2xl border p-6 sm:p-8 text-center relative overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-rose-500"></div>
          <span className="inline-block text-xs font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800 mb-2">
            FACULTY OF MEDICINE — FIRST YEAR COMPREHENSIVE MEDICAL ATLAS
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase max-w-4xl mx-auto mb-3">
            FIRST-YEAR MEDICAL ANATOMY & HISTOLOGY — COMPLETE VISUAL MAP
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Standard Terminology (<span className="italic font-medium">Terminologia Anatomica & Histologica</span>).
            Accurate anatomical orientation, functional joints, major skeletal muscles, organ systems, and authentic microscopic histology micrographs.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Full Axial & Appendicular Skeleton
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              11 Core Organ Systems
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Verified Authentic Histology Micrographs
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              High-Yield Clinical Correlates
            </span>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 1: ANATOMICAL POSITION & ORIENTATION */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="sec-position" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Anatomy • Module 01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                1. Anatomical Position & Body Orientation
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">Universal Standard Reference</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <AnatomicalPositionRenderer
                theme={theme}
                onSelectStructure={(title, desc, pearl) =>
                  setSelectedStructureModal({ title, description: desc, pearl })
                }
              />
            </div>
            <div className="lg:col-span-4 space-y-4">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="text-sm font-bold text-sky-600 dark:text-sky-400 mb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Mandatory Posture Criteria
                </h3>
                <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
                  {ANATOMICAL_POSITION_DATA.criteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Three Spatial Anatomical Axes
                </h3>
                <div className="space-y-2.5 text-xs">
                  {ANATOMICAL_POSITION_DATA.axes.map((ax, i) => (
                    <div key={i} className="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-bold block text-slate-900 dark:text-slate-100">{ax.name}</span>
                      <span className="text-slate-500 dark:text-slate-400">{ax.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 2: ANATOMICAL PLANES */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="sec-planes" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Anatomy • Module 02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                2. Anatomical Planes of Section
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">Median • Coronal • Transverse</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <AnatomicalPlanesRenderer
                theme={theme}
                onSelectStructure={(title, desc, pearl) =>
                  setSelectedStructureModal({ title, description: desc, pearl })
                }
              />
            </div>
            <div className="lg:col-span-4 space-y-3">
              {ANATOMICAL_PLANES_DATA.map((plane) => (
                <div
                  key={plane.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plane.color }} />
                    <h3 className="text-xs font-bold" style={{ color: plane.color }}>
                      {plane.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1.5 leading-snug">
                    {plane.definition}
                  </p>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded">
                    <strong>Clinical Imaging:</strong> {plane.clinicalNote}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 3: DIRECTIONAL TERMS */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="sec-direction" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Anatomy • Module 03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                3. Anatomical Directional Terms & Spatial Vectors
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">Paired Opposites</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <DirectionalTermsRenderer
                theme={theme}
                onSelectStructure={(title, desc, pearl) =>
                  setSelectedStructureModal({ title, description: desc, pearl })
                }
              />
            </div>
            <div className="lg:col-span-4 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Comparative Paired Terms
              </h3>
              {DIRECTIONAL_TERMS_DATA.map((item, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border text-xs ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sky-600 dark:text-sky-400 mb-1">
                    <span>{item.term}</span>
                    <span className="text-rose-500">↔ {item.paired}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] mb-1">
                    {item.definition}
                  </p>
                  <p className="text-[10px] text-slate-500 italic">
                    <strong>Ex:</strong> {item.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 4: BODY MOVEMENTS */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="sec-movements" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Anatomy • Module 04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                4. Body Movements on the Human Figure
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">Joint Kinematics & Planes</span>
          </div>

          <div className="w-full">
            <BodyMovementsRenderer
              theme={theme}
              onSelectStructure={(title, desc, pearl) =>
                setSelectedStructureModal({ title, description: desc, pearl })
              }
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 5: SKELETAL SYSTEM */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="sec-skeletal" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Anatomy • Module 05
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                5. Complete Human Skeletal System (Osteology)
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">206 Adult Bones Labeled</span>
          </div>

          <div className="w-full mb-6">
            <SkeletalSystemRenderer
              theme={theme}
              onSelectStructure={(title, desc, pearl) =>
                setSelectedStructureModal({ title, description: desc, pearl })
              }
            />
          </div>

          {/* Quick-Scan Bones Inventory Table */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-500" />
              High-Yield Osteology Key Bones Reference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
              {SKELETAL_BONES_DATA.slice(0, 16).map((b) => (
                <div
                  key={b.id}
                  className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-sky-400 cursor-pointer transition-colors"
                  onClick={() =>
                    setSelectedStructureModal({
                      title: b.name,
                      description: b.note,
                      pearl: `Region: ${b.region}`
                    })
                  }
                >
                  <span className="font-bold text-sky-600 dark:text-sky-400 block">{b.name}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{b.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 6: JOINTS & ARTICULATIONS */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="sec-joints" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Anatomy • Module 06
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                6. Joints & Articulations (Arthrology)
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">Fibrous • Cartilaginous • Synovial</span>
          </div>

          <div className="w-full">
            <JointsRenderer
              theme={theme}
              onSelectStructure={(title, desc, pearl) =>
                setSelectedStructureModal({ title, description: desc, pearl })
              }
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 7: MUSCULAR SYSTEM */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="sec-muscles" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Anatomy • Module 07
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                7. The Muscular System (Myology Map)
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">Anterior & Posterior Musculature</span>
          </div>

          <div className="w-full mb-6">
            <MuscularSystemRenderer
              theme={theme}
              onSelectStructure={(title, desc, pearl) =>
                setSelectedStructureModal({ title, description: desc, pearl })
              }
            />
          </div>

          {/* Major Muscles High-Yield Actions Table */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-500" />
              Major Muscle Actions & Innervations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {MUSCLES_DATA.map((m, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-rose-400 transition-colors"
                  onClick={() =>
                    setSelectedStructureModal({
                      title: m.name,
                      description: `Action: ${m.action}\nOrigin: ${m.origin}\nInsertion: ${m.insertion}`,
                      pearl: `Innervation: ${m.innervation}`
                    })
                  }
                >
                  <div className="flex items-center justify-between font-bold text-rose-600 dark:text-rose-400 mb-1">
                    <span>{m.name}</span>
                    <span className="text-[10px] text-slate-400">{m.region}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] mb-1 leading-tight">
                    {m.action}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    ⚡ {m.innervation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* ORGAN SYSTEMS (MODULES 08 - 13) */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="border-t-2 border-dashed border-slate-300 dark:border-slate-700 pt-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
              ORGAN SYSTEMS OF THE HUMAN BODY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
              Splanchnology & Neurocardiorespiratory Architecture
            </h2>
          </div>

          <div className="space-y-12">
            {/* 8. Nervous System */}
            <section id="sec-nervous" className="scroll-mt-28">
              <div className="mb-3">
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Module 08</span>
                <h3 className="text-xl font-bold">8. Nervous System</h3>
              </div>
              <NervousSystemRenderer theme={theme} />
            </section>

            {/* 9. Cardiovascular System */}
            <section id="sec-cardio" className="scroll-mt-28">
              <div className="mb-3">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Module 09</span>
                <h3 className="text-xl font-bold">9. Cardiovascular System</h3>
              </div>
              <CardiovascularSystemRenderer theme={theme} />
            </section>

            {/* 10. Respiratory System */}
            <section id="sec-respiratory" className="scroll-mt-28">
              <div className="mb-3">
                <span className="text-xs font-bold text-sky-500 uppercase tracking-wider">Module 10</span>
                <h3 className="text-xl font-bold">10. Respiratory System</h3>
              </div>
              <RespiratorySystemRenderer theme={theme} />
            </section>

            {/* 11. Digestive System */}
            <section id="sec-digestive" className="scroll-mt-28">
              <div className="mb-3">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Module 11</span>
                <h3 className="text-xl font-bold">11. Digestive System</h3>
              </div>
              <DigestiveSystemRenderer theme={theme} />
            </section>

            {/* 12. Urinary System */}
            <section id="sec-urinary" className="scroll-mt-28">
              <div className="mb-3">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Module 12</span>
                <h3 className="text-xl font-bold">12. Urinary System</h3>
              </div>
              <UrinarySystemRenderer theme={theme} />
            </section>

            {/* 13. Reproductive System */}
            <section id="sec-reproductive" className="scroll-mt-28">
              <div className="mb-3">
                <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">Module 13</span>
                <h3 className="text-xl font-bold">13. Male & Female Reproductive Systems</h3>
              </div>
              <ReproductiveSystemRenderer theme={theme} />
            </section>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 14. HISTOLOGY — FIRST YEAR COMPREHENSIVE ATLAS SECTION */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="sec-histology" className="scroll-mt-28 pt-8 border-t-4 border-sky-500">
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-sky-900/20 via-purple-900/20 to-pink-900/20 border border-sky-500/30 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-sky-500 uppercase tracking-widest bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                  HISTOLOGY — FIRST YEAR PRACTICAL
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-slate-50">
                  Representative Microscopic Atlas
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                  Authentic high-resolution microscopic field simulations showing genuine cellular morphology,
                  characteristic H&E basophilic/eosinophilic affinities, basement membranes, and diagnostic criteria.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shrink-0">
                <Microscope className="w-4 h-4" />
                <span>20 Core 1st-Year Tissues</span>
              </div>
            </div>

            {/* Category Filter Buttons */}
            <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {histologyCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setHistologyCategoryFilter(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    histologyCategoryFilter === cat
                      ? 'bg-sky-600 text-white shadow'
                      : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Histology Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredHistology.map((tissue) => (
              <HistologyMicrographCard
                key={tissue.id}
                tissue={tissue}
                theme={theme}
                onClick={() => setSelectedTissueModal(tissue)}
              />
            ))}
          </div>

          {filteredHistology.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No histology tissues found matching "{searchQuery}".
            </div>
          )}
        </section>

        {/* POSTER FOOTER */}
        <footer className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            FIRST-YEAR MEDICAL ANATOMY & HISTOLOGY — COMPLETE VISUAL MAP
          </p>
          <p>
            Designed exclusively for First-Year Medical Students • Faculty of Medicine • LAB HUB Educational Suite
          </p>
          <p className="font-mono text-[11px] text-slate-400">
            Accuracy is more important than decoration. Based on Dr. Ruqia Y. Sharaf Addin curriculum & Standard Terminologia Anatomica.
          </p>
        </footer>
      </main>

      {/* ========================================================================= */}
      {/* HISTOLOGY DETAIL MODAL INSPECTOR */}
      {/* ========================================================================= */}
      {selectedTissueModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-2xl rounded-2xl border p-6 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <button
              onClick={() => setSelectedTissueModal(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-500 uppercase">
                {selectedTissueModal.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Stain: {selectedTissueModal.stain}
              </span>
            </div>

            <h2 className="text-xl font-bold mb-3">{selectedTissueModal.name}</h2>

            {/* Micrograph preview large */}
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 flex items-center justify-center relative">
              <HistologyMicrographCard tissue={selectedTissueModal} theme={theme} />
            </div>

            {/* Microscopic Features */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <h3 className="font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider text-xs mb-1.5">
                  Microscopic Diagnostic Features
                </h3>
                <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
                  {selectedTissueModal.microscopicFeatures.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-xs mb-1">
                  Characteristic Typical Locations in the Body
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedTissueModal.typicalLocations.map((loc, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <span className="font-bold text-amber-700 dark:text-amber-400 block text-xs mb-0.5">
                  ★ High-Yield Practical Exam Pearl:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {selectedTissueModal.highYieldExamPearl}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ANATOMICAL STRUCTURE DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedStructureModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative animate-in fade-in zoom-in-95 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <button
              onClick={() => setSelectedStructureModal(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-sky-500 uppercase tracking-wider block mb-1">
              Anatomical Structure Detail
            </span>
            <h2 className="text-lg font-bold mb-3">{selectedStructureModal.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line mb-4 leading-relaxed">
              {selectedStructureModal.description}
            </p>

            {selectedStructureModal.pearl && (
              <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs">
                <strong className="text-sky-700 dark:text-sky-400 block mb-0.5">High-Yield Pearl:</strong>
                <span className="text-slate-600 dark:text-slate-300">{selectedStructureModal.pearl}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
