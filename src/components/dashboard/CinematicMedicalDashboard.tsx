import React, { useState } from 'react';
import {
  User,
  StudentProgress,
  ScheduleItem,
  Announcement,
  LabSubjectId
} from '../../types';
import { MEDICAL_ASSETS } from '../../assets/medicalImages';
import {
  Play,
  Download,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Move3d,
  Compass,
  Activity,
  Microscope,
  FlaskConical,
  Award,
  Clock,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Layers,
  Zap,
  HelpCircle,
  FileText,
  Flame,
  Bookmark,
  ExternalLink
} from 'lucide-react';

interface CinematicMedicalDashboardProps {
  currentUser: User;
  progress: StudentProgress;
  schedule: ScheduleItem[];
  announcements: Announcement[];
  onSelectLab: (labId: LabSubjectId) => void;
  onStartLabExam?: (labId: LabSubjectId) => void;
  onOpenPractical: (labId: string, practicalId: string) => void;
  onSelectTab: (tab: string) => void;
  onToggleTask: (scheduleId: string, taskId: string) => void;
  onOpenAnnouncements: () => void;
  onOpenAiTutor: () => void;
  onOpenShareModal?: () => void;
  onOpenAboutModal?: () => void;
}

interface LabCardConfig {
  id: LabSubjectId;
  nameEn: string;
  nameAr: string;
  referenceText: string;
  badge: string;
  accentColor: string;
  glowColor: string;
  image: string;
  descriptionEn: string;
  descriptionAr: string;
  highYieldStats: { label: string; value: string }[];
  interactiveModeTab: string;
  interactiveModeLabel: string;
}

export const CinematicMedicalDashboard: React.FC<CinematicMedicalDashboardProps> = ({
  currentUser,
  progress,
  schedule,
  announcements,
  onSelectLab,
  onStartLabExam,
  onOpenPractical,
  onSelectTab,
  onToggleTask,
  onOpenAnnouncements,
  onOpenAiTutor,
  onOpenShareModal,
  onOpenAboutModal
}) => {
  // Selected central laboratory in the 3D card carousel (default: anatomy)
  const [activeLabId, setActiveLabId] = useState<LabSubjectId>('anatomy');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCurvedModule, setSelectedCurvedModule] = useState<'3d_human' | 'planes' | 'movements' | 'microscope' | 'pathways'>('3d_human');

  const LABS_CONFIG: LabCardConfig[] = [
    {
      id: 'anatomy',
      nameEn: 'Anatomy',
      nameAr: 'علم التشريح البشري',
      referenceText: "Gray's Anatomy 43rd Ed.",
      badge: 'Gross & 3D Dissection',
      accentColor: 'from-purple-500 via-indigo-600 to-purple-800',
      glowColor: 'rgba(168, 85, 247, 0.45)',
      image: MEDICAL_ASSETS.heroAnatomicalTorso,
      descriptionEn: 'Comprehensive gross anatomy, musculoskeletal biomechanics, 3D anatomical planes, and surgical relations.',
      descriptionAr: 'التشريح العياني، الميكانيكا الحيوية العضلية الهيكلية، مستويات الجسم ثلاثية الأبعاد والعلاقات الجراحية.',
      highYieldStats: [
        { label: 'الأجهزة الحيوية', value: '7 الأنظمة' },
        { label: 'النماذج ثلاثية الأبعاد', value: '3D WebGL' },
        { label: 'محطات Spotter', value: '18 محطة' }
      ],
      interactiveModeTab: 'realistic_3d_human',
      interactiveModeLabel: 'المجسم البشري 3D الواقعي (WebGL Real-Time)'
    },
    {
      id: 'histology',
      nameEn: 'Histology',
      nameAr: 'علم الأنسجة المجهري',
      referenceText: "Junqueira's Basic Histology 18th Ed.",
      badge: 'Digital Microscopy',
      accentColor: 'from-cyan-500 via-teal-600 to-blue-800',
      glowColor: 'rgba(56, 189, 248, 0.45)',
      image: MEDICAL_ASSETS.histologyKidneyTubules,
      descriptionEn: 'High-definition virtual microscopy, cellular ultrastructure, tissue classification, and diagnostic spotters.',
      descriptionAr: 'المجهر الرقمي الافتراضي عالي الدقة، التركيب الدقيق للخلايا، تصنيف الأنسجة ومحطات الفحص العملي.',
      highYieldStats: [
        { label: 'الشرائح المجهرية', value: '45 شريحة' },
        { label: 'عدسات التكبير', value: '4x - 100x' },
        { label: 'دبابيس التشخيص', value: 'Spotter Pins' }
      ],
      interactiveModeTab: 'histology_microscope',
      interactiveModeLabel: 'المجهر الافتراضي (Virtual Microscope)'
    },
    {
      id: 'biochemistry',
      nameEn: 'Biochemistry',
      nameAr: 'الكيمياء الحيوية السريرية',
      referenceText: 'Molecular & Metabolic Sciences',
      badge: 'Enzymes & Metabolism',
      accentColor: 'from-amber-500 via-orange-600 to-rose-700',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      image: MEDICAL_ASSETS.biochemistryPathways,
      descriptionEn: 'Metabolic cascades, enzymatic kinetics, qualitative carbohydrate assays, and clinical inborn errors.',
      descriptionAr: 'المسارات الأيضية، حركية الإنزيمات، الفحوصات المعملية للسكريات وأمراض الخلل الأيضي الوراثي.',
      highYieldStats: [
        { label: 'المسارات الأيضية', value: '12 مساراً' },
        { label: 'الفحوصات المعملية', value: '5 كواشف' },
        { label: 'الحالات السريرية', value: 'Clinical Pearls' }
      ],
      interactiveModeTab: 'biochemistry_pathways',
      interactiveModeLabel: 'المختبر الجزيئي والمسارات (Pathways)'
    }
  ];

  const currentLab = LABS_CONFIG.find(l => l.id === activeLabId) || LABS_CONFIG[0];
  const sideLabs = LABS_CONFIG.filter(l => l.id !== activeLabId);

  const handleSwitchLab = (labId: LabSubjectId) => {
    if (labId === activeLabId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveLabId(labId);
      setIsTransitioning(false);
    }, 200);
  };

  const handleDirectEnterLab = (labId: LabSubjectId) => {
    onSelectLab(labId);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 select-none animate-in fade-in duration-500 text-slate-100" id="cinematic-medical-dashboard">
      {/* =========================================================================
          SECTION 1: HERO SECTION (reproducing reference image top composition)
          - Large hero title with magenta glow and open arrow circle icon
          - English + Arabic subtitle
          - Pill Action buttons: "Review Overview >" + "Explore 3D Labs"
          - Large featured preview visual card on the right
      ========================================================================= */}
      <section className="relative pt-2 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Typography & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right" dir="rtl">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-purple-950/40">
              <span className="w-2 h-2 rounded-full bg-[#FF007A] animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-purple-300 uppercase">
                First-Year MBBS Medical Core Platform
              </span>
            </div>

            {/* Giant Hero Title - reproducing exact reference hierarchy */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans leading-none">
                LAB HUB
              </h1>
              <div className="flex items-center justify-start gap-3">
                <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#FF007A] via-[#D946EF] to-[#818CF8] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,0,122,0.4)]">
                  منصة التعلم الطبي الذكية
                </span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#FF007A]/60 flex items-center justify-center bg-[#FF007A]/10 text-white shadow-[0_0_15px_rgba(255,0,122,0.5)]">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Subtitle & Value Proposition */}
            <div className="space-y-2 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              <p className="font-bold text-purple-300 font-mono text-xs sm:text-sm tracking-wide">
                Learn. Understand. Master.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                بيئة تعليمية طبية متطورة لطلاب السنة الأولى في كليات الطب البشري، تجمع بين التشريح العياني
                (Gray's Anatomy)، الأنسجة المجهرية (Junqueira)، والكيمياء الحيوية الجزيئية بنماذج ثلاثية الأبعاد واختبارات OSPE تفاعلية.
              </p>
            </div>

            {/* Action Buttons (Pills matching reference component buttons) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onSelectLab(activeLabId)}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF007A] to-[#A855F7] hover:from-[#E0067A] hover:to-[#9333EA] shadow-[0_0_25px_rgba(255,0,122,0.45)] hover:shadow-[0_0_35px_rgba(255,0,122,0.6)] transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span>دخول المعمل المختار</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('mcq_bank')}
                className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-purple-500/50 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>بنك أسئلة MCQs (200+)</span>
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </button>

              <button
                type="button"
                onClick={onOpenAiTutor}
                className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/60 border border-cyan-500/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>المعلم الذكي AI Tutor</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Preview Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm rounded-[32px] overflow-hidden border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.25)] bg-[#0D091B]/80 backdrop-blur-xl group transition-transform duration-500 hover:scale-[1.02]">
              {/* Top Card Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E081A] via-transparent to-purple-600/10 pointer-events-none z-10" />

              {/* Realistic Medical Imagery */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <img
                  src={MEDICAL_ASSETS.heroTorso}
                  alt="Realistic Medical Human Torso"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase bg-black/60 text-purple-300 border border-purple-500/40 backdrop-blur-md">
                    Gray's Anatomy 43rd
                  </span>
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="p-5 space-y-2 relative z-20 text-right" dir="rtl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold">MBBS Year 1 Focus</span>
                  <h3 className="text-base font-black text-white">تشريح الجذع والأطراف ثلاثي الأبعاد</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  نماذج تشريحية طبية دقيقة تفصل الجهاز العضلي، العظمي، الأوعية الدموية ومسارات الأعصاب.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => onSelectTab('laboratories')}
                    className="text-purple-300 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>استعراض كافة المعامل</span>
                    <span>←</span>
                  </button>
                  <span className="text-[11px] font-mono text-slate-400">100% Anatomically Accurate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CENTRAL 3D CARD SHOWCASE (reproducing reference middle stage)
          - Large dominant central card with floating control overlays
          - Left & right peek background cards (Histology & Biochemistry)
          - Smooth transition animation when selecting any card
          - View All / Explore Lab glowing capsule button at bottom
          - Centered chevron down indicator
      ========================================================================= */}
      <section className="relative space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-purple-300 font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive 3-Laboratory Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            المعامل الطبية الأساسية (Core Medical Laboratories)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            اضغط على أي معمل لعرضه في المنصة المركزية ثلاثية الأبعاد والتفاعل مع أدواته
          </p>
        </div>

        {/* 3D Layered Carousel Canvas */}
        <div className="relative min-h-[520px] sm:min-h-[560px] flex items-center justify-center pt-4 pb-8 overflow-visible">
          {/* Ambient Glow behind center card */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 -z-10 opacity-60"
            style={{ backgroundColor: currentLab.glowColor }}
          />

          {/* Left Peeking Card */}
          {sideLabs[0] && (
            <div
              onClick={() => handleSwitchLab(sideLabs[0].id)}
              className="hidden md:block absolute left-2 lg:left-12 top-1/2 -translate-y-1/2 w-64 lg:w-72 h-[420px] rounded-[32px] overflow-hidden border border-white/10 bg-[#0E0A1E]/70 backdrop-blur-xl shadow-2xl opacity-60 hover:opacity-100 hover:scale-105 cursor-pointer transition-all duration-500 z-10 -rotate-3"
            >
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src={sideLabs[0].image}
                  alt={sideLabs[0].nameEn}
                  className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A1E] to-transparent" />
              </div>
              <div className="p-5 text-right space-y-1" dir="rtl">
                <span className="text-[10px] font-mono text-purple-400 font-bold">{sideLabs[0].referenceText}</span>
                <h3 className="text-lg font-black text-white">{sideLabs[0].nameAr}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{sideLabs[0].descriptionAr}</p>
                <div className="pt-4 text-xs font-bold text-purple-400 flex items-center justify-between">
                  <span>انقر للتبديل للمركز</span>
                  <span>←</span>
                </div>
              </div>
            </div>
          )}

          {/* Right Peeking Card */}
          {sideLabs[1] && (
            <div
              onClick={() => handleSwitchLab(sideLabs[1].id)}
              className="hidden md:block absolute right-2 lg:right-12 top-1/2 -translate-y-1/2 w-64 lg:w-72 h-[420px] rounded-[32px] overflow-hidden border border-white/10 bg-[#0E0A1E]/70 backdrop-blur-xl shadow-2xl opacity-60 hover:opacity-100 hover:scale-105 cursor-pointer transition-all duration-500 z-10 rotate-3"
            >
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src={sideLabs[1].image}
                  alt={sideLabs[1].nameEn}
                  className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A1E] to-transparent" />
              </div>
              <div className="p-5 text-right space-y-1" dir="rtl">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">{sideLabs[1].referenceText}</span>
                <h3 className="text-lg font-black text-white">{sideLabs[1].nameAr}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{sideLabs[1].descriptionAr}</p>
                <div className="pt-4 text-xs font-bold text-cyan-400 flex items-center justify-between">
                  <span>انقر للتبديل للمركز</span>
                  <span>←</span>
                </div>
              </div>
            </div>
          )}

          {/* Central Dominant Card (Towering 3D Glass Stadium) */}
          <div
            className={`relative w-full max-w-md sm:max-w-lg rounded-[36px] overflow-hidden border border-purple-500/50 bg-[#0A0718]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.35)] z-20 transition-all duration-500 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {/* Top Card Image Stage */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={currentLab.image}
                alt={currentLab.nameEn}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0718] via-[#0A0718]/30 to-transparent" />

              {/* Floating Reference Badge on Top Right */}
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-black uppercase bg-black/70 text-white border border-white/20 backdrop-blur-md shadow-lg">
                  {currentLab.referenceText}
                </span>
              </div>

              {/* Floating Action Icons Overlay (reproducing circle icons from reference) */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                <button
                  type="button"
                  title="Play / Interactive 3D"
                  onClick={() => onSelectTab(currentLab.interactiveModeTab)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all cursor-pointer hover:scale-110"
                >
                  <Play className="w-4 h-4 fill-white" />
                </button>

                <button
                  type="button"
                  title="Lab Practical Notes"
                  onClick={() => onSelectTab('practicals')}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all cursor-pointer hover:scale-110"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  title="Expand Laboratory"
                  onClick={() => handleDirectEnterLab(currentLab.id)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all cursor-pointer hover:scale-110"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Central Card Body Details */}
            <div className="p-6 sm:p-7 space-y-5 text-right" dir="rtl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-300 font-bold">{currentLab.badge}</span>
                  <span className="text-[11px] font-mono text-slate-400">MBBS Syllabus</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {currentLab.nameAr}
                </h3>
                <p className="text-xs font-mono text-purple-400">{currentLab.nameEn}</p>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {currentLab.descriptionAr}
                </p>
              </div>

              {/* High-Yield Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10">
                {currentLab.highYieldStats.map((stat, idx) => (
                  <div key={idx} className="text-center p-2 rounded-xl bg-white/5">
                    <span className="text-xs sm:text-sm font-black text-white block">{stat.value}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Quick Launcher */}
              <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectTab(currentLab.interactiveModeTab)}
                  className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>فتح: {currentLab.interactiveModeLabel}</span>
                </button>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-md">
                  Interactive 3D
                </span>
              </div>

              {/* Main Glowing Magenta Action Pill Button (matches "View All" in reference) */}
              <div className="flex flex-col items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleDirectEnterLab(currentLab.id)}
                  className="w-full py-3.5 rounded-full text-sm font-black text-white bg-gradient-to-r from-[#FF007A] via-[#E0067A] to-[#A855F7] hover:from-[#E0067A] hover:to-[#9333EA] shadow-[0_0_30px_rgba(255,0,122,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>دخول معمل {currentLab.nameAr} الكامل</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Mobile Quick Switcher Tabs */}
                <div className="flex md:hidden items-center justify-center gap-2 pt-1">
                  {LABS_CONFIG.map(lab => (
                    <button
                      key={lab.id}
                      type="button"
                      onClick={() => handleSwitchLab(lab.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                        lab.id === activeLabId
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {lab.nameAr.split(' ')[1] || lab.nameAr}
                    </button>
                  ))}
                </div>

                {/* Down Chevron Indicator */}
                <a
                  href="#curved-medical-showcase"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all mt-1"
                >
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE CURVED SHOWCASE SECTION (القسم السفلي بنصف دائرة وطبقات متداخلة)
          - Concentric layered circular arc with deep purple/magenta lighting
          - Star/Sparkle explanation icon at top right
          - Central featured card with ↗ expand button
          - Central glowing circular LAB HUB medical emblem medallion at bottom
          - Interactive quick launcher for:
            1. 3D Anatomical Planes
            2. Body Movements (Kinesiology)
            3. Virtual Microscope (Histology)
            4. Molecular Pathways (Biochemistry)
      ========================================================================= */}
      <section id="curved-medical-showcase" className="relative pt-6 overflow-hidden">
        {/* The Giant Curved Layered Canvas */}
        <div className="relative rounded-[40px] sm:rounded-[56px] border border-purple-500/30 bg-gradient-to-b from-[#140C29] via-[#0D071B] to-[#080410] p-6 sm:p-12 shadow-2xl overflow-hidden">
          {/* Subtle concentric curved rings */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-[100%] border border-purple-500/20 pointer-events-none" />
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[950px] h-[600px] rounded-[100%] border border-indigo-500/15 pointer-events-none" />
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-[100%] border border-pink-500/10 pointer-events-none" />

          {/* Glowing radial aurora at top center */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-[#FF007A]/25 to-purple-600/15 blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 text-right" dir="rtl">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
                  Curved Medical Visualization Stage
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                المختبر التفاعلي والمحاكاة الحية (Interactive Visual Suite)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                اختر الوحدة التفاعلية لتشغيل المحاكاة الفورية وفحص التراكيب الطبية
              </p>
            </div>

            {/* Quick Filter Tabs for Curved Section */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedCurvedModule('3d_human')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCurvedModule === '3d_human'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-600/40 animate-pulse'
                    : 'text-cyan-400 hover:text-white'
                }`}
              >
                <Move3d className="w-3.5 h-3.5" />
                <span>المجسم البشري 3D</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCurvedModule('planes')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCurvedModule === 'planes'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>المستويات (Planes)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCurvedModule('movements')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCurvedModule === 'movements'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>الحركات (Movements)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCurvedModule('microscope')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCurvedModule === 'microscope'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Microscope className="w-3.5 h-3.5" />
                <span>المجهر (Microscope)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCurvedModule('pathways')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCurvedModule === 'pathways'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>المسارات (Pathways)</span>
              </button>
            </div>
          </div>

          {/* Central Curved Showcase Area */}
          <div className="relative z-10 py-8 flex flex-col items-center">
            {/* Center Visual Card with Expand Button (reproducing reference image's card in circle) */}
            <div className="relative w-full max-w-xl rounded-[32px] overflow-hidden border border-purple-500/40 bg-[#0A0616]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)] group">
              {/* Expand Icon ↗ on Top Right */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedCurvedModule === '3d_human') onSelectTab('realistic_3d_human');
                    else if (selectedCurvedModule === 'planes') onSelectTab('interactive_planes');
                    else if (selectedCurvedModule === 'movements') onSelectTab('anatomy_movements');
                    else if (selectedCurvedModule === 'microscope') onSelectTab('histology_microscope');
                    else onSelectTab('biochemistry_pathways');
                  }}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all cursor-pointer hover:scale-110"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Image / Graphic according to selected curved module */}
              <div className="h-60 sm:h-72 w-full overflow-hidden relative">
                <img
                  src={
                    selectedCurvedModule === '3d_human'
                      ? MEDICAL_ASSETS.heroAnatomicalTorso
                      : selectedCurvedModule === 'planes'
                      ? MEDICAL_ASSETS.heroAnatomicalTorso
                      : selectedCurvedModule === 'movements'
                      ? MEDICAL_ASSETS.bicepsBrachiiMuscle
                      : selectedCurvedModule === 'microscope'
                      ? MEDICAL_ASSETS.histologyKidneyTubules
                      : MEDICAL_ASSETS.biochemistryPathways
                  }
                  alt="Medical Module Visual"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0616] via-transparent to-transparent" />
              </div>

              {/* Card Meta Content */}
              <div className="p-6 text-right space-y-3" dir="rtl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {selectedCurvedModule === '3d_human' && "WebGL 3D Engine • 360° Dissection • Layers"}
                    {selectedCurvedModule === 'planes' && "Sagittal • Coronal • Transverse"}
                    {selectedCurvedModule === 'movements' && "Kinesiology & Joint Degrees"}
                    {selectedCurvedModule === 'microscope' && "4x • 10x • 40x • 100x Oil"}
                    {selectedCurvedModule === 'pathways' && "Substrate → Enzyme → Product"}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {selectedCurvedModule === '3d_human' && "المجسم البشري ثلاثي الأبعاد الواقعي (3D Human Body)"}
                    {selectedCurvedModule === 'planes' && "مستويات الجسم التشريحية (3D Planes)"}
                    {selectedCurvedModule === 'movements' && "الحركات والمفاصل الحيوية (Movements & Joints)"}
                    {selectedCurvedModule === 'microscope' && "المجهر الافتراضي عالي الدقة (Virtual Microscope)"}
                    {selectedCurvedModule === 'pathways' && "المسارات الأيضية والكواشف (Biochem Pathways)"}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedCurvedModule === '3d_human' && "محاكاة تشريحية واقعية WebGL ثلاثية الأبعاد تدعم الدوران 360°، التحكم في طبقات العضلات والأعضاء والعظام والشرايين، مع حركة نبض القلب والتنفس الحي وبنك أسئلة OSPE."}
                  {selectedCurvedModule === 'planes' && "استكشف المستويات السهمية والإكليلية والمستعرضة مع محاذاة الأشعة المقطعية وأسئلة OSPE السريعة."}
                  {selectedCurvedModule === 'movements' && "محاكاة بصرية لحركات الثني، البسط، التبعيد، الكب والاستلقاء مع العضلات المحركة والأهمية السريرية."}
                  {selectedCurvedModule === 'microscope' && "تصفح الشرائح النسيجية بدقة الميكروسكوب الضوئي الحقيقي مع مغير العدسات ودبابيس تحديد الخلايا."}
                  {selectedCurvedModule === 'pathways' && "تتبع تفاعلات التحلل السكري وحلقة كريبس والفحوصات المعملية النوعية للكربوهيدرات خطوة بخطوة."}
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedCurvedModule === '3d_human') onSelectTab('realistic_3d_human');
                      else if (selectedCurvedModule === 'planes') onSelectTab('interactive_planes');
                      else if (selectedCurvedModule === 'movements') onSelectTab('anatomy_movements');
                      else if (selectedCurvedModule === 'microscope') onSelectTab('histology_microscope');
                      else onSelectTab('biochemistry_pathways');
                    }}
                    className="w-full py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-purple-600 to-rose-600 hover:from-cyan-400 hover:to-rose-500 shadow-lg shadow-purple-900/40 transition-all cursor-pointer flex items-center justify-center gap-2 font-bold"
                  >
                    <span>دخول مجسم التشريح 3D الواقعي الآن</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Centered Glowing Circular Emblem / Medallion (reproducing reference circular logo) */}
            <div className="relative mt-8 flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-br from-[#00F0FF] via-[#A855F7] to-[#FF007A] shadow-[0_0_35px_rgba(56,189,248,0.5)] flex items-center justify-center group cursor-pointer hover:scale-105 transition-all">
                <div className="w-full h-full rounded-full bg-[#090515] flex flex-col items-center justify-center border border-white/20">
                  <span className="text-xl sm:text-2xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                    LH
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-purple-300 font-bold uppercase">
                    LAB HUB
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-purple-300 mt-2 tracking-wider">
                منصة سكينة أسعد الطبية • 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: QUICK MEDICAL STUDY MATRIX & HIGH-YIELD CARDS
          - Question bank access (200+ questions)
          - Practical exams (OSPE)
          - Micro-lectures
          - Student progress overview
      ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 text-right" dir="rtl">
        <div
          onClick={() => onSelectTab('mcq_bank')}
          className="p-5 rounded-3xl bg-[#0D0A1C]/80 border border-white/10 hover:border-purple-500/50 backdrop-blur-xl transition-all cursor-pointer group shadow-xl hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">بنك أسئلة MCQs</h4>
          <p className="text-xs text-slate-400 mt-1">200+ سؤال مع التعليلات الطبية والنقاط عالية الأهمية</p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-400 font-bold">
            <span>بدء التدريب</span>
            <span>←</span>
          </div>
        </div>

        <div
          onClick={() => onSelectTab('medical_exams')}
          className="p-5 rounded-3xl bg-[#0D0A1C]/80 border border-white/10 hover:border-cyan-500/50 backdrop-blur-xl transition-all cursor-pointer group shadow-xl hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">امتحانات OSPE العملية</h4>
          <p className="text-xs text-slate-400 mt-1">محطات التعرف السريع والمؤقت الزمني القياسي</p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-bold">
            <span>دخول الامتحانات</span>
            <span>←</span>
          </div>
        </div>

        <div
          onClick={() => onSelectTab('educational_videos')}
          className="p-5 rounded-3xl bg-[#0D0A1C]/80 border border-white/10 hover:border-rose-500/50 backdrop-blur-xl transition-all cursor-pointer group shadow-xl hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">محاضرات الفيديو المصغرة</h4>
          <p className="text-xs text-slate-400 mt-1">شروحات عملية سريعة لا تتجاوز 3 دقائق لكل موضوع</p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-rose-400 font-bold">
            <span>مشاهدة الفيديوهات</span>
            <span>←</span>
          </div>
        </div>

        <div
          onClick={() => onSelectTab('progress')}
          className="p-5 rounded-3xl bg-[#0D0A1C]/80 border border-white/10 hover:border-amber-500/50 backdrop-blur-xl transition-all cursor-pointer group shadow-xl hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">معدل الإنجاز والدرجات</h4>
          <p className="text-xs text-slate-400 mt-1">
            نسبة إكمال الدروس: {Math.round(((progress?.anatomyPercent || 0) + (progress?.histologyPercent || 0) + (progress?.biochemistryPercent || 0)) / 3)}%
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-bold">
            <span>عرض التقرير الأكاديمي</span>
            <span>←</span>
          </div>
        </div>
      </section>
    </div>
  );
};
