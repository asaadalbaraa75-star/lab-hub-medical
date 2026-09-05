import React, { useState, useEffect } from 'react';
import {
  Bone,
  Microscope,
  FlaskConical,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Activity,
  Target,
  CheckCircle2,
  BookOpen,
  Eye,
  Zap,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  Maximize2
} from 'lucide-react';
import { LabSubjectId, Practical, StudentProgress } from '../../types';
import { MEDICAL_ASSETS } from '../../assets/medicalImages';

interface LaboratoriesHubPageProps {
  onSelectLab: (labId: LabSubjectId) => void;
  practicals?: Practical[];
  progress?: Record<string, StudentProgress> | StudentProgress;
}

interface LabShowcaseData {
  id: LabSubjectId;
  name: string;
  nameAr: string;
  code: string;
  tagline: string;
  heroHeadline: string;
  description: string;
  quote: string;
  primaryImage: string;
  secondaryImage: string;
  accentColor: string;
  glowColor: string;
  badgeBorder: string;
  icon: any;
  stats: {
    practicals: number;
    spotters: number;
    quizzes: number;
    creditHours: string;
  };
  topics: {
    title: string;
    titleAr: string;
    desc: string;
    icon: any;
  }[];
  highlights: string[];
}

const LAB_SHOWCASE_DATA: LabShowcaseData[] = [
  {
    id: 'anatomy',
    name: 'Anatomy',
    nameAr: 'علم التشريح البشري',
    code: 'ANAT-201',
    tagline: 'Gross Anatomy, Osteology & Dissection',
    heroHeadline: 'Explore the structure of the human body.',
    description:
      'Immerse yourself in 3D human anatomy, skeletal osteology, muscular origins and insertions, synovial articulations, neurovascular bundles, and timed OSPE spotter identification stations.',
    quote: 'De Humani Corporis Fabrica — Visualizing the architectural precision of life.',
    primaryImage: MEDICAL_ASSETS.heroTorso,
    secondaryImage: MEDICAL_ASSETS.bicepsBrachiiMuscle,
    accentColor: 'from-blue-500 via-indigo-500 to-purple-600',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    badgeBorder: 'border-indigo-500/40 bg-indigo-950/60 text-indigo-300',
    icon: Bone,
    stats: {
      practicals: 14,
      spotters: 45,
      quizzes: 10,
      creditHours: '4.0 Cr'
    },
    topics: [
      {
        title: 'Osteology & Skeletal Landmarks',
        titleAr: 'الهيكل العظمي والمعالم التشريحية',
        desc: 'Cranial bones, vertebral column, thoracic cage, appendicular skeleton & bony foramen.',
        icon: Bone
      },
      {
        title: 'Myology & Muscular Attachments',
        titleAr: 'الجهاز العضلي ومنابت العضلات',
        desc: 'Upper & lower limb musculature, origins, insertions, neurovascular innervation & action.',
        icon: Activity
      },
      {
        title: 'Arthrology & Synovial Articulations',
        titleAr: 'المفاصل الحيوية والأربطة',
        desc: 'Capsular anatomy, collateral ligaments, cruciate stabilizers & range of motion.',
        icon: Zap
      },
      {
        title: 'Visceral & Neurovascular Structures',
        titleAr: 'الأحشاء الداخلية والأوعية الدموية',
        desc: 'Cardiovascular contours, thoracic viscera, brachial plexus, and major arterial branches.',
        icon: Layers
      }
    ],
    highlights: [
      'Interactive 3D anatomical models with high-definition texture dissection',
      'Timed OSPE pin identification stations for practical exams',
      'Clinical gross relations and anatomical plane cross-sections'
    ]
  },
  {
    id: 'histology',
    name: 'Histology',
    nameAr: 'علم الأنسجة والخلايا',
    code: 'HIST-202',
    tagline: 'Microscopic Anatomy, Tissues & Cell Biology',
    heroHeadline: 'Explore tissues and cells through microscopy.',
    description:
      'Explore high-magnification cellular architecture, Hematoxylin & Eosin (H&E) staining protocols, epithelia classifications, connective tissue matrix, and virtual slide spotters.',
    quote: 'The invisible architecture of human physiology revealed under microscopic optics.',
    primaryImage: MEDICAL_ASSETS.histologyKidneyTubules,
    secondaryImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'from-purple-500 via-pink-500 to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    badgeBorder: 'border-pink-500/40 bg-pink-950/60 text-pink-300',
    icon: Microscope,
    stats: {
      practicals: 12,
      spotters: 40,
      quizzes: 8,
      creditHours: '3.0 Cr'
    },
    topics: [
      {
        title: 'Light Microscopy & Lens Calibration',
        titleAr: 'المجهر الضوئي ومعايرة العدسات',
        desc: 'Condenser alignment, numerical aperture, Kohler illumination & 100x oil immersion optics.',
        icon: Microscope
      },
      {
        title: 'Epithelial Tissue Classification',
        titleAr: 'تصنيف الأنسجة الطلائية',
        desc: 'Simple squamous, cuboidal, columnar, pseudostratified ciliated & transitional urothelium.',
        icon: Layers
      },
      {
        title: 'Connective & Supportive Matrix',
        titleAr: 'الأنسجة الضامة والعظم والغضاريف',
        desc: 'Collagen fibers, fibroblasts, hyaline/elastic cartilage, osteons & Haversian systems.',
        icon: Target
      },
      {
        title: 'Muscular & Nervous Ultrastructure',
        titleAr: 'الأنسجة العضلية والعصبية',
        desc: 'Intercalated discs, sarcomeres, peripheral nerve fascicles, perineurium & Schwann cells.',
        icon: Activity
      }
    ],
    highlights: [
      'Ultra-high-resolution stained histological specimen slides',
      'Diagnostic identification points for rapid OSPE spotting',
      'Specialized staining guides: H&E, PAS, Masson’s Trichrome & Silver Stain'
    ]
  },
  {
    id: 'biochemistry',
    name: 'Biochemistry',
    nameAr: 'الكيمياء الحيوية السريرية',
    code: 'BIO-204',
    tagline: 'Carbohydrate Identification & Clinical Chemistry',
    heroHeadline: 'Understand the molecular processes of life.',
    description:
      'Master fundamental clinical laboratory wet tests: Molisch, Iodine, Barfoed, Seliwanoff, Benedict, and Fehling assays for mono-, di-, and polysaccharides with virtual reagent titration.',
    quote: 'From molecular chemical bonds to systemic metabolic energy pathways.',
    primaryImage: MEDICAL_ASSETS.biochemistryPathways,
    secondaryImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'from-amber-500 via-orange-500 to-cyan-500',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    badgeBorder: 'border-amber-500/40 bg-amber-950/60 text-amber-300',
    icon: FlaskConical,
    stats: {
      practicals: 6,
      spotters: 25,
      quizzes: 6,
      creditHours: '3.0 Cr'
    },
    topics: [
      {
        title: "Molisch's General Carbohydrate Test",
        titleAr: 'فحص موليش العام للسكريات',
        desc: 'Dehydration by concentrated H2SO4 to form furfural derivatives forming a violet ring.',
        icon: FlaskConical
      },
      {
        title: "Iodine Polysaccharide Assay",
        titleAr: 'فحص اليود للسكريات المعقدة',
        desc: 'Amylose polyiodide helical entrapment producing deep diagnostic navy blue complex.',
        icon: Eye
      },
      {
        title: "Barfoed's Monosaccharide Distinction",
        titleAr: 'فحص بارفويد للسكريات الأحادية',
        desc: 'Rapid reduction of cupric acetate in acidic medium distinguishing monosaccharides within 3 min.',
        icon: Zap
      },
      {
        title: "Benedict & Fehling Reducing Sugars",
        titleAr: 'فحوصات بنيدكت وفهلنج للسكريات المختزلة',
        desc: 'Alkaline cupric reduction forming graded precipitates from green to brick-red cuprous oxide.',
        icon: Award
      }
    ],
    highlights: [
      'Interactive test tube rack with real-time chemical color shifts',
      'Dynamic Benedict color scale from negative blue to 4+ brick red',
      'Step-by-step chemical principles, reagent composition, and clinical notes'
    ]
  }
];

export const LaboratoriesHubPage: React.FC<LaboratoriesHubPageProps> = ({
  onSelectLab,
  practicals = [],
  progress = {}
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  const activeLab = LAB_SHOWCASE_DATA[activeIndex];

  // Calculate left and right lab indices for circular 3D carousel
  const totalLabs = LAB_SHOWCASE_DATA.length; // 3
  const leftIndex = (activeIndex - 1 + totalLabs) % totalLabs;
  const rightIndex = (activeIndex + 1) % totalLabs;

  const leftLab = LAB_SHOWCASE_DATA[leftIndex];
  const rightLab = LAB_SHOWCASE_DATA[rightIndex];

  // Auto-play toggle (optional, default paused so student has full control)
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % totalLabs);
    }, 8000);
    return () => clearInterval(timer);
  }, [isAutoPlay, totalLabs]);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % totalLabs);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + totalLabs) % totalLabs);
  };

  return (
    <div
      id="laboratories-hub-root"
      className="relative space-y-16 pb-20 select-none overflow-x-hidden"
    >
      {/* ============================================================
          ATMOSPHERIC AURORA LIGHTING & MEDICAL BACKGROUND
      ============================================================ */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/20 via-indigo-600/15 to-cyan-500/15 blur-[120px] -z-10" />
      <div className="pointer-events-none absolute top-[600px] right-0 w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-[1200px] left-0 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[140px] -z-10" />

      {/* ============================================================
          TOP HEADER SECTION: LAB HUB • المعامل الطبية
      ============================================================ */}
      <div className="space-y-4 text-center max-w-3xl mx-auto pt-2">
        {/* Academic Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
            LAB HUB • 2026 ACADEMIC YEAR
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        {/* Main Title: Arabic Header + English Subhead */}
        <div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            المعامل الطبية المركزية
          </h1>
          <p className="text-sm sm:text-lg text-purple-200/80 font-semibold mt-1 tracking-wide">
            CENTRAL MEDICAL LABORATORIES
          </p>
        </div>

        {/* Supporting Text Requested by User */}
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
          Explore, understand, and master your medical sciences.
        </p>

        {/* Quick Discipline Pills Switcher */}
        <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
          {LAB_SHOWCASE_DATA.map((lab, idx) => {
            const Icon = lab.icon;
            const isActive = idx === activeIndex;
            return (
              <button
                key={lab.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/50 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                <span>{lab.name}</span>
                <span className="text-[11px] opacity-75 font-normal">({lab.nameAr})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          HERO COMPOSITION: THE CINEMATIC 3D LAB GALLERY
          Large central featured card + overlapping floating side cards
      ============================================================ */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Navigation Arrow Controls */}
        <div className="absolute top-1/2 -left-2 sm:left-2 -translate-y-1/2 z-30">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Laboratory"
            className="w-12 h-12 rounded-full glass-card border border-white/20 hover:border-purple-400 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute top-1/2 -right-2 sm:right-2 -translate-y-1/2 z-30">
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Laboratory"
            className="w-12 h-12 rounded-full glass-card border border-white/20 hover:border-purple-400 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel Spatial Stage */}
        <div className="relative min-h-[480px] sm:min-h-[540px] flex items-center justify-center">
          {/* 1. LEFT FLOATING CARD (Partially visible & overlapping) */}
          <div
            onClick={() => setActiveIndex(leftIndex)}
            className="hidden lg:block absolute left-2 xl:left-6 w-[280px] h-[400px] rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-purple-400/50 cursor-pointer transition-all duration-700 ease-out z-10 transform -rotate-3 scale-90 opacity-60 hover:opacity-95 hover:scale-95 shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] group"
          >
            <img
              src={leftLab.primaryImage}
              alt={leftLab.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/70 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-black/60 text-purple-300 border border-purple-500/30">
                {leftLab.code}
              </span>
            </div>
            <div className="absolute bottom-6 left-5 right-5 space-y-1 text-left">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                {leftLab.nameAr}
              </span>
              <h3 className="text-xl font-black text-white">{leftLab.name}</h3>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {leftLab.tagline}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>اضغط للتركيز</span>
                <span>←</span>
              </div>
            </div>
          </div>

          {/* 2. CENTRAL LARGE FEATURED CARD (Primary Cinematic Hero) */}
          <div
            key={activeLab.id}
            id={`featured-lab-${activeLab.id}`}
            className="relative w-full max-w-2xl sm:min-h-[500px] rounded-3xl overflow-hidden glass-card border border-white/20 hover:border-purple-400/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(168,85,247,0.35)] transition-all duration-700 z-20 flex flex-col justify-between group"
          >
            {/* Background Medical Visual with Zoom Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={activeLab.primaryImage}
                alt={activeLab.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-75"
              />
              {/* Deep Cinematic Vignette & Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070B14]/80 via-transparent to-[#070B14]/40" />
            </div>

            {/* Top Bar inside Card: Code, Academic Discipline, Status */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold border ${activeLab.badgeBorder} shadow-sm backdrop-blur-md`}
                >
                  {activeLab.code}
                </span>
                <span className="text-xs font-bold text-purple-300/80 uppercase tracking-widest hidden sm:inline">
                  {activeLab.tagline}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Laboratory</span>
              </div>
            </div>

            {/* Card Content Overlay */}
            <div className="relative z-10 p-6 sm:p-8 space-y-5 text-left">
              {/* Title & Arabic Label */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
                    {activeLab.name}
                  </h2>
                  <span className="text-lg sm:text-xl font-bold text-purple-300 font-sans">
                    • {activeLab.nameAr}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-medium text-cyan-300 drop-shadow-sm">
                  "{activeLab.heroHeadline}"
                </p>
              </div>

              {/* Detailed English Description */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-4">
                {activeLab.description}
              </p>

              {/* Stats Chips Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="bg-[#070B14]/70 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                  <span className="block text-base sm:text-lg font-extrabold text-white">
                    {activeLab.stats.practicals}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Practicals
                  </span>
                </div>
                <div className="bg-[#070B14]/70 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                  <span className="block text-base sm:text-lg font-extrabold text-purple-300">
                    {activeLab.stats.spotters}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Spotters
                  </span>
                </div>
                <div className="bg-[#070B14]/70 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                  <span className="block text-base sm:text-lg font-extrabold text-cyan-300">
                    {activeLab.stats.quizzes}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    OSPE Quizzes
                  </span>
                </div>
                <div className="bg-[#070B14]/70 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                  <span className="block text-base sm:text-lg font-extrabold text-amber-300">
                    {activeLab.stats.creditHours}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Credits
                  </span>
                </div>
              </div>

              {/* Action Button: Explore Lab (دخول المعمل) */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  id={`explore-active-lab-${activeLab.id}`}
                  onClick={() => onSelectLab(activeLab.id)}
                  className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base transition-all duration-300 shadow-[0_0_35px_rgba(168,85,247,0.45)] hover:shadow-[0_0_50px_rgba(168,85,247,0.65)] hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <span>Explore {activeLab.name} Lab (دخول المعمل)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`section-${activeLab.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <span>نظرة تفصيلية على المنهج</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. RIGHT FLOATING CARD (Partially visible & overlapping) */}
          <div
            onClick={() => setActiveIndex(rightIndex)}
            className="hidden lg:block absolute right-2 xl:right-6 w-[280px] h-[400px] rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-purple-400/50 cursor-pointer transition-all duration-700 ease-out z-10 transform rotate-3 scale-90 opacity-60 hover:opacity-95 hover:scale-95 shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] group"
          >
            <img
              src={rightLab.primaryImage}
              alt={rightLab.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/70 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-black/60 text-purple-300 border border-purple-500/30">
                {rightLab.code}
              </span>
            </div>
            <div className="absolute bottom-6 left-5 right-5 space-y-1 text-left">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                {rightLab.nameAr}
              </span>
              <h3 className="text-xl font-black text-white">{rightLab.name}</h3>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {rightLab.tagline}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>اضغط للتركيز</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-3 pt-6">
          {LAB_SHOWCASE_DATA.map((lab, idx) => (
            <button
              key={lab.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to ${lab.name}`}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === activeIndex
                  ? 'w-10 bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ============================================================
          THREE IMMERSIVE LABORATORY SECTIONS (SCROLL EXPERIENCE)
          1. Anatomy
          2. Histology
          3. Biochemistry
      ============================================================ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20 pt-6">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-300">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Curriculum Exploration & Practical Modules</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            استكشف المحتوى التعليمي لكل معمل
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click into any discipline to access high-yield digital atlas structures, virtual microscopy slides, and biochemical test protocols.
          </p>
        </div>

        {/* ------------------------------------------------------------
            SECTION 1: ANATOMY
        ------------------------------------------------------------ */}
        <section
          id="section-anatomy"
          className="relative rounded-3xl p-6 sm:p-10 glass-card border border-white/10 hover:border-indigo-500/40 shadow-2xl transition-all space-y-8 overflow-hidden group"
        >
          {/* Subtle Ambient Backlight */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl group-hover:bg-indigo-600/25 transition-all duration-700" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Visual Column */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-xl border border-white/10 group">
              <img
                src={LAB_SHOWCASE_DATA[0].primaryImage}
                alt="Human Anatomy Dissection & Osteology"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/40">
                  ANAT-201
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                  Gross Anatomy & Osteology
                </span>
                <span className="text-lg font-black text-white">Digital Anatomy Atlas</span>
              </div>
            </div>

            {/* Right Information & Topic Chips */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-bold text-indigo-300">
                  <Bone className="w-3.5 h-3.5" />
                  <span>المعمل الأول • علم التشريح</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Anatomy
                </h3>
                <p className="text-sm sm:text-base font-semibold text-cyan-300">
                  "{LAB_SHOWCASE_DATA[0].heroHeadline}"
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {LAB_SHOWCASE_DATA[0].description}
                </p>
              </div>

              {/* Action Chips: Continue Learning, Topics, Progress, Practical, OSPE */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs font-bold text-purple-200">
                  ✓ Continue Learning
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                  📚 Core Topics (4 Modules)
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                  🎯 14 Practicals
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs font-bold text-cyan-300">
                  ⚡ OSPE Spotter Exam
                </span>
              </div>

              {/* Topic Preview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {LAB_SHOWCASE_DATA[0].topics.map(t => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.title}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 space-y-1 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-white">{t.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight line-clamp-2">
                        {t.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Enter Anatomy Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectLab('anatomy')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] transition-all cursor-pointer"
                >
                  <span>Open Anatomy Lab (دخول معمل التشريح)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------
            SECTION 2: HISTOLOGY
        ------------------------------------------------------------ */}
        <section
          id="section-histology"
          className="relative rounded-3xl p-6 sm:p-10 glass-card border border-white/10 hover:border-pink-500/40 shadow-2xl transition-all space-y-8 overflow-hidden group"
        >
          {/* Subtle Ambient Backlight */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-pink-600/15 blur-3xl group-hover:bg-pink-600/25 transition-all duration-700" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Visual Column */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-xl border border-white/10 group order-1 lg:order-2">
              <img
                src={LAB_SHOWCASE_DATA[1].primaryImage}
                alt="Histology Microscopy Stained Tissue Slide"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-950/80 text-pink-300 border border-pink-500/40">
                  HIST-202
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-xs font-bold text-pink-300 uppercase tracking-wider block">
                  Microscopic Anatomy & Tissues
                </span>
                <span className="text-lg font-black text-white">Virtual Microscopy Lab</span>
              </div>
            </div>

            {/* Right Information & Topic Chips */}
            <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-xs font-bold text-pink-300">
                  <Microscope className="w-3.5 h-3.5" />
                  <span>المعمل الثاني • علم الأنسجة</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Histology
                </h3>
                <p className="text-sm sm:text-base font-semibold text-pink-300">
                  "{LAB_SHOWCASE_DATA[1].heroHeadline}"
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {LAB_SHOWCASE_DATA[1].description}
                </p>
              </div>

              {/* Action Chips */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-pink-950/60 border border-pink-500/40 text-xs font-bold text-pink-200">
                  ✓ Continue Learning
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                  🔬 Virtual Microscopy (10x-100x)
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                  📑 12 Practical Sessions
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs font-bold text-purple-300">
                  🎯 H&E Tissue Spotters
                </span>
              </div>

              {/* Topic Preview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {LAB_SHOWCASE_DATA[1].topics.map(t => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.title}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 space-y-1 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-pink-400" />
                        <span className="text-xs font-bold text-white">{t.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight line-clamp-2">
                        {t.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Enter Histology Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectLab('histology')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] transition-all cursor-pointer"
                >
                  <span>Open Histology Lab (دخول معمل الأنسجة)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------
            SECTION 3: BIOCHEMISTRY
        ------------------------------------------------------------ */}
        <section
          id="section-biochemistry"
          className="relative rounded-3xl p-6 sm:p-10 glass-card border border-white/10 hover:border-amber-500/40 shadow-2xl transition-all space-y-8 overflow-hidden group"
        >
          {/* Subtle Ambient Backlight */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-600/15 blur-3xl group-hover:bg-amber-600/25 transition-all duration-700" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Visual Column */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-xl border border-white/10 group">
              <img
                src={LAB_SHOWCASE_DATA[2].primaryImage}
                alt="Biochemical Molecules & Reagent Titration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
                  BIO-204
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Carbohydrates & Clinical Assays
                </span>
                <span className="text-lg font-black text-white">Interactive Molecular Lab</span>
              </div>
            </div>

            {/* Right Information & Topic Chips */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-xs font-bold text-amber-300">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>المعمل الثالث • الكيمياء الحيوية</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Biochemistry
                </h3>
                <p className="text-sm sm:text-base font-semibold text-amber-300">
                  "{LAB_SHOWCASE_DATA[2].heroHeadline}"
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {LAB_SHOWCASE_DATA[2].description}
                </p>
              </div>

              {/* Action Chips */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs font-bold text-amber-200">
                  ✓ Continue Learning
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                  🧪 6 Carbohydrate Tests
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                  🌈 Benedict Color Precipitates
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs font-bold text-cyan-300">
                  ⚡ Clinical Principles
                </span>
              </div>

              {/* Topic Preview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {LAB_SHOWCASE_DATA[2].topics.map(t => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.title}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 space-y-1 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-white">{t.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight line-clamp-2">
                        {t.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Enter Biochemistry Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectLab('biochemistry')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-cyan-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all cursor-pointer"
                >
                  <span>Open Biochemistry Lab (دخول معمل الكيمياء الحيوية)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
