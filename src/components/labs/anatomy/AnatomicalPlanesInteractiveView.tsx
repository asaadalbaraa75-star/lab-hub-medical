import React, { useState } from 'react';
import {
  ChevronRight,
  RotateCcw,
  Maximize2,
  Layers,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Info,
  Activity,
  Compass,
  ArrowRight,
  Award,
  Stethoscope,
  ChevronLeft
} from 'lucide-react';
import { MEDICAL_ASSETS } from '../../../assets/medicalImages';

interface AnatomicalPlanesInteractiveViewProps {
  onBack?: () => void;
  onOpenTopic?: (topicId: string) => void;
  onOpenQuiz?: () => void;
}

export const AnatomicalPlanesInteractiveView: React.FC<AnatomicalPlanesInteractiveViewProps> = ({
  onBack,
  onOpenTopic,
  onOpenQuiz
}) => {
  // Active Plane: 'sagittal' | 'coronal' | 'transverse' | 'all'
  const [activePlane, setActivePlane] = useState<'sagittal' | 'coronal' | 'transverse' | 'all'>('sagittal');
  
  // Navigation Sidebar tab
  const [activeSection, setActiveSection] = useState<'overview' | 'objectives' | 'planes' | 'clinical' | 'high_yield' | 'quiz'>('planes');

  // 3D Model view controls
  const [rotationAngle, setRotationAngle] = useState(15);
  const [isRotating, setIsRotating] = useState(false);
  const [viewSystem, setViewSystem] = useState<'all' | 'skeletal' | 'vascular'>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mini Quiz state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const planeData = {
    sagittal: {
      nameEn: 'Sagittal Plane',
      nameAr: 'المستوى السهمي',
      latinName: 'Planum sagittale',
      direction: 'Vertical / Anteroposterior',
      divides: 'Divides body into right and left parts.',
      dividesAr: 'يقسم الجسم إلى نصفين أيمن وأيسر.',
      color: '#06b6d4', // Cyan
      badge: 'text-cyan-300 bg-cyan-950/80 border-cyan-500/40',
      glow: 'shadow-[0_0_25px_rgba(6,182,212,0.35)]',
      border: 'border-cyan-500/60',
      keyConcept: 'Midsagittal (Median) plane passes exactly through the midline. Parasagittal planes run parallel to it.',
      clinicalUse: 'Sagittal MRI is the gold standard for evaluating the brain, pituitary gland, and spinal cord / herniated discs.'
    },
    coronal: {
      nameEn: 'Coronal Plane',
      nameAr: 'المستوى الإكليلي (الجبهي)',
      latinName: 'Planum coronale (Frontale)',
      direction: 'Vertical / Side-to-Side',
      divides: 'Divides body into anterior (front) and posterior (back) parts.',
      dividesAr: 'يقسم الجسم إلى جزء أمامي (بطني) وجزء خلفي (ظهري).',
      color: '#a855f7', // Purple/Violet
      badge: 'text-purple-300 bg-purple-950/80 border-purple-500/40',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.35)]',
      border: 'border-purple-500/60',
      keyConcept: 'Perpendicular to both sagittal and transverse planes. Coronal sutures of the skull run in this direction.',
      clinicalUse: 'Coronal CT/MRI is essential for imaging paired bilateral structures simultaneously, like the kidneys, lungs, orbits, and knee joints.'
    },
    transverse: {
      nameEn: 'Transverse Plane',
      nameAr: 'المستوى المستعرض (المحوري)',
      latinName: 'Planum transversum (Axiale)',
      direction: 'Horizontal / Cross-Sectional',
      divides: 'Divides body into superior (upper) and inferior (lower) parts.',
      dividesAr: 'يقسم الجسم إلى جزء علوي وجزء سفلي.',
      color: '#10b981', // Emerald Green
      badge: 'text-emerald-300 bg-emerald-950/80 border-emerald-500/40',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.35)]',
      border: 'border-emerald-500/60',
      keyConcept: 'Also termed Axial or Horizontal plane. Standard cross-sectional perspective in diagnostic imaging.',
      clinicalUse: 'Standard Axial CT slices of the thorax, abdomen, and pelvis are viewed as if looking up from the patient\'s feet.'
    }
  };

  const handleRotate = (dir: 'left' | 'right') => {
    setRotationAngle(prev => (dir === 'left' ? prev - 25 : prev + 25));
  };

  const handleReset = () => {
    setRotationAngle(15);
    setActivePlane('sagittal');
    setViewSystem('all');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 select-none pb-12" id="anatomical-planes-interactive-view">
      {/* Top Breadcrumb & Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#090D1A]/90 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors mr-1"
              title="Back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <span className="text-purple-400 font-semibold cursor-pointer hover:underline" onClick={onBack}>
            Anatomy
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span>Introduction</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-white font-bold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
            Anatomical Planes
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
            Gray's Anatomy • Chapter 1
          </span>
          <span className="text-[11px] font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            Year 1 MBBS Core
          </span>
        </div>
      </div>

      {/* Main Grid: Left Nav | Center Plane Visuals & Pedagogy | Right 3D Model */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 1. Left Sidebar: Lesson Content Outline (lg:col-span-2) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Compass className="w-4 h-4 text-purple-400" />
                <span>Lesson Content</span>
              </div>
              <span className="text-[10px] text-purple-300 bg-purple-950/70 px-1.5 py-0.5 rounded border border-purple-500/30 font-mono">
                6 Units
              </span>
            </div>

            <div className="space-y-1">
              {[
                { id: 'overview', label: 'Overview', labelAr: 'مقدمة عامة' },
                { id: 'objectives', label: 'Objectives', labelAr: 'أهداف الدرس' },
                { id: 'planes', label: 'Planes (3D)', labelAr: 'المستويات التشريحية' },
                { id: 'clinical', label: 'Clinical Relevance', labelAr: 'الأهمية السريرية' },
                { id: 'high_yield', label: 'High-Yield Points', labelAr: 'نقاط الامتحان' },
                { id: 'quiz', label: 'Mini Quiz', labelAr: 'اختبار سريع' }
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                    activeSection === sec.id
                      ? 'bg-gradient-to-r from-purple-900/60 to-indigo-900/50 text-white font-bold border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        activeSection === sec.id ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-slate-600'
                      }`}
                    />
                    <span>{sec.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans">{sec.labelAr}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Concept Box */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#162242] border border-white/10 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Anatomical Position Rule</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              All anatomical descriptions, planes, and relations assume the body is standing erect, facing forward, arms at sides, and <span className="text-white font-semibold">palms facing anteriorly</span>.
            </p>
          </div>
        </div>

        {/* 2. Center Column: 3 Interactive Plane Cards & Lesson Text (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 3 Interactive Plane Selector Cards (Matching Reference Screenshot) */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Sagittal Plane Card */}
            <button
              onClick={() => setActivePlane('sagittal')}
              className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between group ${
                activePlane === 'sagittal'
                  ? 'bg-cyan-950/50 border-cyan-500/70 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/40'
                  : 'bg-[#0A1020]/80 hover:bg-[#0E172F] border-white/10 text-slate-400'
              }`}
            >
              {/* Visual Plane Graphic Mini */}
              <div className="w-full h-24 rounded-xl bg-[#070B14] border border-cyan-500/30 flex items-center justify-center relative overflow-hidden mb-2">
                <svg viewBox="0 0 100 120" className="w-16 h-20">
                  {/* Body Silhouette */}
                  <ellipse cx="50" cy="20" rx="9" ry="11" fill="#1e293b" />
                  <path d="M40 33 L60 33 L64 75 L36 75 Z" fill="#1e293b" />
                  <line x1="42" y1="75" x2="39" y2="110" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                  <line x1="58" y1="75" x2="61" y2="110" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                  {/* Sagittal Cut Sheet (Cyan Vertical) */}
                  <polygon
                    points="50,5 50,115 52,115 52,5"
                    fill="#06b6d4"
                    opacity={activePlane === 'sagittal' ? '0.9' : '0.4'}
                    className={activePlane === 'sagittal' ? 'filter drop-shadow(0 0 6px #06b6d4)' : ''}
                  />
                  <rect x="48" y="0" width="4" height="120" fill="url(#sagittalGlow)" opacity="0.7" />
                </svg>
                {activePlane === 'sagittal' && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Sagittal Plane
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                  Divides body into right and left parts.
                </p>
              </div>
            </button>

            {/* Coronal Plane Card */}
            <button
              onClick={() => setActivePlane('coronal')}
              className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between group ${
                activePlane === 'coronal'
                  ? 'bg-purple-950/50 border-purple-500/70 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-500/40'
                  : 'bg-[#0A1020]/80 hover:bg-[#0E172F] border-white/10 text-slate-400'
              }`}
            >
              <div className="w-full h-24 rounded-xl bg-[#070B14] border border-purple-500/30 flex items-center justify-center relative overflow-hidden mb-2">
                <svg viewBox="0 0 100 120" className="w-16 h-20">
                  <ellipse cx="50" cy="20" rx="9" ry="11" fill="#1e293b" />
                  <path d="M40 33 L60 33 L64 75 L36 75 Z" fill="#1e293b" />
                  <line x1="42" y1="75" x2="39" y2="110" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                  <line x1="58" y1="75" x2="61" y2="110" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                  {/* Coronal Sheet (Purple Frontal) */}
                  <polygon
                    points="20,15 80,15 80,110 20,110"
                    fill="#a855f7"
                    opacity={activePlane === 'coronal' ? '0.5' : '0.2'}
                    className={activePlane === 'coronal' ? 'filter drop-shadow(0 0 8px #a855f7)' : ''}
                  />
                  <line x1="20" y1="15" x2="80" y2="15" stroke="#c084fc" strokeWidth="2" opacity="0.8" />
                </svg>
                {activePlane === 'coronal' && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                  Coronal Plane
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                  Divides body into anterior and posterior parts.
                </p>
              </div>
            </button>

            {/* Transverse Plane Card */}
            <button
              onClick={() => setActivePlane('transverse')}
              className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between group ${
                activePlane === 'transverse'
                  ? 'bg-emerald-950/50 border-emerald-500/70 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/40'
                  : 'bg-[#0A1020]/80 hover:bg-[#0E172F] border-white/10 text-slate-400'
              }`}
            >
              <div className="w-full h-24 rounded-xl bg-[#070B14] border border-emerald-500/30 flex items-center justify-center relative overflow-hidden mb-2">
                <svg viewBox="0 0 100 120" className="w-16 h-20">
                  <ellipse cx="50" cy="20" rx="9" ry="11" fill="#1e293b" />
                  <path d="M40 33 L60 33 L64 75 L36 75 Z" fill="#1e293b" />
                  <line x1="42" y1="75" x2="39" y2="110" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                  <line x1="58" y1="75" x2="61" y2="110" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                  {/* Transverse Sheet (Green Horizontal) */}
                  <polygon
                    points="15,60 85,55 85,65 15,70"
                    fill="#10b981"
                    opacity={activePlane === 'transverse' ? '0.6' : '0.2'}
                    className={activePlane === 'transverse' ? 'filter drop-shadow(0 0 8px #10b981)' : ''}
                  />
                  <line x1="15" y1="65" x2="85" y2="60" stroke="#34d399" strokeWidth="2" opacity="0.9" />
                </svg>
                {activePlane === 'transverse' && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Transverse Plane
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                  Divides body into superior and inferior parts.
                </p>
              </div>
            </button>
          </div>

          {/* Active Plane Detail Card */}
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${planeData[activePlane === 'all' ? 'sagittal' : activePlane].badge}`}>
                  {planeData[activePlane === 'all' ? 'sagittal' : activePlane].nameEn}
                </span>
                <span className="text-xs text-slate-400 font-sans">
                  {planeData[activePlane === 'all' ? 'sagittal' : activePlane].nameAr}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {planeData[activePlane === 'all' ? 'sagittal' : activePlane].latinName}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 leading-relaxed">
              <p className="font-semibold text-white">
                {planeData[activePlane === 'all' ? 'sagittal' : activePlane].divides}
              </p>
              <p className="text-slate-400 mt-1 font-sans">
                {planeData[activePlane === 'all' ? 'sagittal' : activePlane].dividesAr}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Core Principle: </span>
                  <span className="text-slate-300">{planeData[activePlane === 'all' ? 'sagittal' : activePlane].keyConcept}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <Stethoscope className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-cyan-300">Clinical Radiography Correlation: </span>
                  <span className="text-slate-300">{planeData[activePlane === 'all' ? 'sagittal' : activePlane].clinicalUse}</span>
                </div>
              </div>
            </div>

            {/* Quick Interactive Mini-Quiz directly below plane details */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Your Understanding:</span>
                </span>
                <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  Exam MCQ
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Which anatomical plane would best demonstrate a vertical midline section passing through the corpus callosum and brainstem?
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { id: 0, label: 'Midsagittal', isCorrect: true },
                  { id: 1, label: 'Coronal', isCorrect: false },
                  { id: 2, label: 'Transverse', isCorrect: false }
                ].map(opt => {
                  const isSelected = quizAnswer === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setQuizAnswer(opt.id);
                        setShowExplanation(true);
                      }}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                            : 'bg-rose-950/80 border-rose-500 text-rose-300'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className={`p-2.5 rounded-xl text-xs border animate-in fade-in duration-200 ${
                  quizAnswer === 0 ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}>
                  {quizAnswer === 0 ? (
                    <p>
                      <strong>Correct!</strong> The median (midsagittal) plane passes vertically right through the midline, cleanly slicing brain structures like the corpus callosum and pituitary gland.
                    </p>
                  ) : (
                    <p>
                      <strong>Review:</strong> Coronal slices divide anterior from posterior, while Transverse cuts horizontally. Midline sagittal cuts best display the neural axis.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Right Column: "Interactive 3D Model" Canvas (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="relative rounded-2xl bg-gradient-to-b from-[#0B1124] to-[#060913] border border-white/10 p-4 shadow-2xl overflow-hidden h-[460px] flex flex-col justify-between">
            {/* Top Bar of 3D Panel */}
            <div className="flex items-center justify-between z-10">
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide">Interactive 3D Model</h3>
                <p className="text-[10px] text-slate-400">Drag or use side tools to manipulate planes</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleRotate('left')}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
                  title="Rotate Left"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
                  title="Reset View"
                >
                  <span className="text-[10px] font-mono px-1">RESET</span>
                </button>
              </div>
            </div>

            {/* Central 3D Interactive Model Canvas */}
            <div
              className="relative w-full flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing"
              onMouseDown={() => setIsRotating(true)}
              onMouseUp={() => setIsRotating(false)}
            >
              {/* Background ambient lighting */}
              <div
                className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-500"
                style={{
                  backgroundColor:
                    activePlane === 'sagittal'
                      ? '#06b6d4'
                      : activePlane === 'coronal'
                      ? '#a855f7'
                      : '#10b981'
                }}
              />

              {/* 3D Anatomical Human Wireframe/Translucent Silhouette with Plane Cut */}
              <div
                className="relative w-48 h-80 transition-transform duration-300 ease-out"
                style={{
                  transform: `perspective(600px) rotateY(${rotationAngle}deg)`
                }}
              >
                {/* SVG Silhouette */}
                <svg viewBox="0 0 200 340" className="w-full h-full filter drop-shadow(0 0 15px rgba(168,85,247,0.3))">
                  <defs>
                    <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
                    </radialGradient>
                    <linearGradient id="planeCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="planePurple" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="planeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Human Anatomical Silhouette Head, Torso, Limbs */}
                  <g stroke="#64748b" strokeWidth="1" fill="url(#bodyGrad)">
                    {/* Head */}
                    <ellipse cx="100" cy="35" rx="18" ry="24" />
                    {/* Neck */}
                    <path d="M92 57 L108 57 L110 70 L90 70 Z" />
                    {/* Torso & Shoulders */}
                    <path d="M70 75 L130 75 L125 170 L75 170 Z" />
                    {/* Arms */}
                    <path d="M70 75 L52 145 L48 190" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7" />
                    <path d="M130 75 L148 145 L152 190" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7" />
                    {/* Pelvis & Legs */}
                    <path d="M75 170 L125 170 L120 200 L80 200 Z" />
                    <path d="M85 200 L82 270 L80 325" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.7" />
                    <path d="M115 200 L118 270 L120 325" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.7" />
                  </g>

                  {/* ACTIVE CUTTING PLANE SHEETS */}
                  {/* 1. Sagittal Sheet */}
                  {(activePlane === 'sagittal' || activePlane === 'all') && (
                    <g className="animate-in fade-in duration-300">
                      <polygon
                        points="100,5 100,335 102,335 102,5"
                        fill="url(#planeCyan)"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        className="filter drop-shadow(0 0 10px #06b6d4)"
                      />
                      <line x1="100" y1="5" x2="100" y2="335" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
                    </g>
                  )}

                  {/* 2. Coronal Sheet */}
                  {(activePlane === 'coronal' || activePlane === 'all') && (
                    <g className="animate-in fade-in duration-300">
                      <polygon
                        points="25,20 175,20 175,320 25,320"
                        fill="url(#planePurple)"
                        stroke="#c084fc"
                        strokeWidth="1.5"
                        className="filter drop-shadow(0 0 10px #a855f7)"
                      />
                      <line x1="25" y1="20" x2="175" y2="20" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="25" y1="320" x2="175" y2="320" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
                    </g>
                  )}

                  {/* 3. Transverse Sheet */}
                  {(activePlane === 'transverse' || activePlane === 'all') && (
                    <g className="animate-in fade-in duration-300">
                      <polygon
                        points="15,145 185,130 185,155 15,170"
                        fill="url(#planeGreen)"
                        stroke="#34d399"
                        strokeWidth="1.5"
                        className="filter drop-shadow(0 0 10px #10b981)"
                      />
                      <line x1="15" y1="157" x2="185" y2="142" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Floating Tool Controls on the Right Side of the 3D Canvas (Matching Reference Image) */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
                <button
                  onClick={() => handleRotate('right')}
                  className="w-8 h-8 rounded-xl bg-[#0F172A]/90 hover:bg-purple-950 border border-white/10 hover:border-purple-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg"
                  title="Rotate 360°"
                >
                  <RotateCcw className="w-3.5 h-3.5 rotate-180" />
                </button>

                <button
                  onClick={() => {
                    if (activePlane === 'sagittal') setActivePlane('coronal');
                    else if (activePlane === 'coronal') setActivePlane('transverse');
                    else if (activePlane === 'transverse') setActivePlane('all');
                    else setActivePlane('sagittal');
                  }}
                  className="w-8 h-8 rounded-xl bg-[#0F172A]/90 hover:bg-purple-950 border border-white/10 hover:border-purple-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg"
                  title="Cycle Planes"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                </button>

                <button
                  onClick={() => {
                    setViewSystem(prev => (prev === 'all' ? 'skeletal' : prev === 'skeletal' ? 'vascular' : 'all'));
                  }}
                  className="w-8 h-8 rounded-xl bg-[#0F172A]/90 hover:bg-purple-950 border border-white/10 hover:border-purple-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg"
                  title="Toggle Anatomy Layer"
                >
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                </button>

                <button
                  onClick={() => setIsFullscreen(prev => !prev)}
                  className="w-8 h-8 rounded-xl bg-[#0F172A]/90 hover:bg-purple-950 border border-white/10 hover:border-purple-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg"
                  title="Toggle Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom Controls Indicator */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4]" />
                <span>Angle: {rotationAngle}°</span>
              </span>
              <span className="text-[10px] text-slate-400">
                Layer: <strong className="text-white capitalize">{viewSystem}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
