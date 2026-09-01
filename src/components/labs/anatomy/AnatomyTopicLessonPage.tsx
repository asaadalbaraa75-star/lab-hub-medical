import React, { useState, useEffect, useRef } from 'react';
import {
  AnatomyTopic,
  AnatomySpotterItem,
  AnatomyPracticeQuestion,
  ANATOMY_TOPICS
} from './AnatomyData';
import { AnatomyTopicVisual } from './AnatomyTopicVisuals';
import { anatomyProgressService } from './AnatomyStudentProgressService';
import {
  ArrowLeft,
  BookOpen,
  Target,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Layers,
  Activity,
  Check,
  RotateCcw,
  Play,
  Bookmark,
  Compass,
  Move3d,
  Bone,
  GitMerge,
  Brain,
  Heart,
  Wind,
  Utensils,
  Droplets,
  User,
  Info,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Stethoscope,
  Clock,
  Eye,
  Share2
} from 'lucide-react';

interface AnatomyTopicLessonPageProps {
  topic: AnatomyTopic;
  onBack: () => void;
  onSelectTopic: (topic: AnatomyTopic) => void;
  onLaunchOSPEExam?: (examId?: string) => void;
}

export const AnatomyTopicLessonPage: React.FC<AnatomyTopicLessonPageProps> = ({
  topic,
  onBack,
  onSelectTopic,
  onLaunchOSPEExam
}) => {
  // Navigation Section State
  const [activeSection, setActiveSection] = useState<'overview' | 'interactive' | 'structures' | 'clinical' | 'interactive_mode' | 'quiz'>('overview');

  // Interactive Pin / Hotspot State
  const [selectedPin, setSelectedPin] = useState<AnatomySpotterItem | null>(
    topic.spotterItems && topic.spotterItems.length > 0 ? topic.spotterItems[0] : null
  );

  // Interactive Learning Step-by-Step Mode State
  const [isInteractiveModeActive, setIsInteractiveModeActive] = useState(false);
  const [interactiveStep, setInteractiveStep] = useState(0);
  const [interactiveFeedback, setInteractiveFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [selectedPinAttempt, setSelectedPinAttempt] = useState<number | null>(null);
  const [interactiveScore, setInteractiveScore] = useState(0);
  const [interactiveFinished, setInteractiveFinished] = useState(false);

  // Embedded Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizAnswerSubmitted, setIsQuizAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Bookmarking state
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Section refs for smooth scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const structuresRef = useRef<HTMLDivElement>(null);
  const clinicalRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  // Load progress on mount or topic change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    anatomyProgressService.markTopicComplete(topic.id);
    const prog = anatomyProgressService.getProgress();
    setIsBookmarked(prog.bookmarkedTopicIds.includes(topic.id));
    
    // Reset states for new topic
    setSelectedPin(topic.spotterItems && topic.spotterItems.length > 0 ? topic.spotterItems[0] : null);
    setIsInteractiveModeActive(false);
    setInteractiveStep(0);
    setInteractiveFeedback('idle');
    setSelectedPinAttempt(null);
    setInteractiveScore(0);
    setInteractiveFinished(false);

    setCurrentQuizIndex(0);
    setSelectedQuizOption(null);
    setIsQuizAnswerSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  }, [topic.id]);

  const handleToggleBookmark = () => {
    const newState = anatomyProgressService.toggleBookmark(topic.id);
    setIsBookmarked(newState);
  };

  const handleScrollToSection = (section: 'overview' | 'interactive' | 'structures' | 'clinical' | 'interactive_mode' | 'quiz') => {
    setActiveSection(section);
    if (section === 'interactive_mode') {
      setIsInteractiveModeActive(true);
      setInteractiveStep(0);
      setInteractiveFeedback('idle');
      setSelectedPinAttempt(null);
      setInteractiveScore(0);
      setInteractiveFinished(false);
    }
    
    const targetRef = 
      section === 'overview' ? overviewRef :
      section === 'interactive' || section === 'interactive_mode' ? interactiveRef :
      section === 'structures' ? structuresRef :
      section === 'clinical' ? clinicalRef : quizRef;

    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Step-by-step Interactive Learning Logic
  const spotters = topic.spotterItems || [];
  const currentTargetPin = spotters[interactiveStep] || spotters[0];

  const handlePinClickInInteractive = (pin: AnatomySpotterItem) => {
    if (!isInteractiveModeActive) {
      setSelectedPin(pin);
      return;
    }

    if (interactiveFeedback === 'correct') return; // already solved this step

    setSelectedPinAttempt(pin.pinNumber);
    if (pin.pinNumber === currentTargetPin.pinNumber) {
      setInteractiveFeedback('correct');
      setInteractiveScore(prev => prev + 1);
    } else {
      setInteractiveFeedback('wrong');
    }
  };

  const handleNextInteractiveStep = () => {
    setInteractiveFeedback('idle');
    setSelectedPinAttempt(null);
    if (interactiveStep < spotters.length - 1) {
      setInteractiveStep(prev => prev + 1);
    } else {
      setInteractiveFinished(true);
    }
  };

  const handleRestartInteractiveMode = () => {
    setInteractiveStep(0);
    setInteractiveFeedback('idle');
    setSelectedPinAttempt(null);
    setInteractiveScore(0);
    setInteractiveFinished(false);
    setIsInteractiveModeActive(true);
  };

  // Practice Quiz Logic
  const questions = topic.practiceQuestions || [];
  const currentQuestion: AnatomyPracticeQuestion | undefined = questions[currentQuizIndex];

  const handleSelectQuizOption = (opt: string) => {
    if (isQuizAnswerSubmitted) return;
    setSelectedQuizOption(opt);
  };

  const handleSubmitQuizAnswer = () => {
    if (!selectedQuizOption || !currentQuestion || isQuizAnswerSubmitted) return;
    setIsQuizAnswerSubmitted(true);
    if (selectedQuizOption === currentQuestion.correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedQuizOption(null);
    setIsQuizAnswerSubmitted(false);
    if (currentQuizIndex < questions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      // Save exam score
      anatomyProgressService.recordExamScore(
        `topic_quiz_${topic.id}`,
        quizScore + (selectedQuizOption === currentQuestion?.correctAnswer ? 1 : 0),
        questions.length,
        topic.titleAr,
        topic.titleEn
      );
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedQuizOption(null);
    setIsQuizAnswerSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // Topic specific overview stats
  const getTopicOverviewStats = () => {
    switch (topic.id) {
      case 'anat_skeletal':
        return [
          { number: '206', label: 'Total Bones', detail: 'Adult Human Skeleton' },
          { number: '80', label: 'Axial Skeleton', detail: 'Skull, Vertebrae & Ribs' },
          { number: '126', label: 'Appendicular', detail: 'Limbs & Girdles' },
          { number: 'Femur', label: 'Longest Bone', detail: 'Strongest in Human Body' }
        ];
      case 'anat_planes':
        return [
          { number: '3', label: 'Primary Planes', detail: 'Sagittal, Coronal, Axial' },
          { number: 'Median', label: 'Equal Halves', detail: 'Exact Midline Cut' },
          { number: 'Coronal', label: 'Front & Back', detail: 'Crown / Tiara Axis' },
          { number: 'Axial', label: 'CT Standard', detail: 'Transverse Slice' }
        ];
      case 'anat_directional_terms':
        return [
          { number: '8', label: 'Opposing Pairs', detail: 'Standard Coordinates' },
          { number: 'Proximal', label: 'Near Trunk', detail: 'Limb Attachment' },
          { number: 'Distal', label: 'Far from Trunk', detail: 'Toward Digits' },
          { number: 'Medial', label: 'Toward Midline', detail: 'Center Axis' }
        ];
      case 'anat_movements':
        return [
          { number: 'Flexion', label: 'Bending', detail: 'Decreases Joint Angle' },
          { number: 'Extension', label: 'Straightening', detail: 'Increases Joint Angle' },
          { number: 'Abduction', label: 'Away from Body', detail: 'Adding Distance' },
          { number: 'Supination', label: 'Palms Forward', detail: 'Holding Soup' }
        ];
      case 'anat_joints':
        return [
          { number: '3', label: 'Structural Types', detail: 'Fibrous, Cartilage, Synovial' },
          { number: '6', label: 'Synovial Types', detail: 'Ball & Socket, Hinge, etc.' },
          { number: 'Ball/Socket', label: 'Max Mobility', detail: 'Shoulder & Hip' },
          { number: 'Hinge', label: 'Uniaxial Flexion', detail: 'Elbow & Knee' }
        ];
      case 'anat_muscles':
        return [
          { number: '600+', label: 'Skeletal Muscles', detail: 'Voluntary Movement' },
          { number: 'Biceps', label: 'Flex & Supinate', detail: 'Musculocutaneous Nerve' },
          { number: 'Deltoid', label: 'Arm Abduction', detail: 'Axillary Nerve' },
          { number: 'Quadriceps', label: 'Knee Extension', detail: 'Femoral Nerve' }
        ];
      case 'anat_cardio':
        return [
          { number: '4', label: 'Heart Chambers', detail: '2 Atria & 2 Ventricles' },
          { number: 'Aorta', label: 'Main Artery', detail: 'Systemic Output' },
          { number: 'Mitral', label: 'Bicuspid Valve', detail: 'Left Atrioventricular' },
          { number: 'Dual', label: 'Circuits', detail: 'Pulmonary & Systemic' }
        ];
      case 'anat_nervous':
        return [
          { number: 'CNS', label: 'Central System', detail: 'Brain & Spinal Cord' },
          { number: '12', label: 'Cranial Pairs', detail: 'Direct Brain Output' },
          { number: '31', label: 'Spinal Pairs', detail: 'Peripheral Innervation' },
          { number: 'Cerebrum', label: 'Higher Function', detail: 'Cerebral Hemispheres' }
        ];
      case 'anat_respiratory':
        return [
          { number: '2', label: 'Lungs', detail: 'Right (3) & Left (2 Lobes)' },
          { number: 'Trachea', label: 'Windpipe', detail: 'C-shaped Cartilages' },
          { number: 'Alveoli', label: 'Gas Exchange', detail: 'O2 & CO2 Diffusion' },
          { number: 'Diaphragm', label: 'Primary Muscle', detail: 'Phrenic Nerve (C3-C5)' }
        ];
      case 'anat_digestive':
        return [
          { number: 'GI Tract', label: 'Alimentary Canal', detail: 'Mouth to Anus' },
          { number: 'Stomach', label: 'Acid & Chyme', detail: 'J-shaped Reservoir' },
          { number: 'Liver', label: 'Bile & Metabolism', detail: 'Largest Internal Organ' },
          { number: 'Small Intestine', label: 'Absorption', detail: 'Duodenum, Jejunum, Ileum' }
        ];
      case 'anat_urinary':
        return [
          { number: '2', label: 'Kidneys', detail: 'Retroperitoneal Organs' },
          { number: 'V-A-U', label: 'Hilum Order', detail: 'Vein, Artery, Ureter' },
          { number: 'Cortex', label: 'Outer Glomeruli', detail: 'Filtration Zone' },
          { number: 'Bladder', label: 'Urine Storage', detail: 'Detrusor Muscle' }
        ];
      case 'anat_reproductive':
        return [
          { number: 'Gonads', label: 'Primary Organs', detail: 'Testes & Ovaries' },
          { number: 'Gametes', label: 'Reproductive Cells', detail: 'Sperm & Oocytes' },
          { number: 'Uterus', label: 'Gestation Site', detail: 'Endometrium & Myometrium' },
          { number: 'Endocrine', label: 'Sex Hormones', detail: 'Testosterone & Estrogen' }
        ];
      default:
        return [
          { number: `${topic.keyStructures.length}`, label: 'Key Landmarks', detail: 'Core High-Yield' },
          { number: `${spotters.length}`, label: 'Spotter Pins', detail: 'Interactive Stations' },
          { number: 'OSPE', label: 'Exam Focus', detail: 'Practical Tested' },
          { number: '1st Year', label: 'Medical Level', detail: 'Academic Syllabus' }
        ];
    }
  };

  // Find next and previous topics for smooth navigation
  const currentTopicIndex = ANATOMY_TOPICS.findIndex(t => t.id === topic.id);
  const prevTopic = currentTopicIndex > 0 ? ANATOMY_TOPICS[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < ANATOMY_TOPICS.length - 1 ? ANATOMY_TOPICS[currentTopicIndex + 1] : null;

  const stats = getTopicOverviewStats();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 animate-in fade-in duration-300" id="anatomy-topic-lesson-page">
      
      {/* 1. STICKY TOP APP BAR */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              id="btn-anatomy-back-to-dashboard"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Labs</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 truncate font-mono">
              <span>Gross Anatomy</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-indigo-400 font-bold truncate">{topic.titleEn}</span>
            </div>
          </div>

          {/* Quick Actions & Progress Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-400">Progress:</span>
              <span className="text-emerald-400 font-bold font-mono">Completed ✓</span>
            </div>

            <button
              type="button"
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isBookmarked 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark Topic'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => handleScrollToSection('interactive_mode')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Start Interactive Learning</span>
              <span className="sm:hidden">Practice</span>
            </button>
          </div>
        </div>

        {/* Sticky Section Sub-Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/60">
          <button
            type="button"
            onClick={() => handleScrollToSection('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'overview'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => handleScrollToSection('interactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'interactive' && !isInteractiveModeActive
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Interactive Anatomy</span>
          </button>

          <button
            type="button"
            onClick={() => handleScrollToSection('interactive_mode')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              isInteractiveModeActive
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-amber-400 hover:bg-amber-500/10'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Step-by-Step Mode</span>
          </button>

          <button
            type="button"
            onClick={() => handleScrollToSection('structures')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'structures'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Key Structures</span>
          </button>

          <button
            type="button"
            onClick={() => handleScrollToSection('clinical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'clinical'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical Pearls</span>
          </button>

          <button
            type="button"
            onClick={() => handleScrollToSection('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'quiz'
                ? 'bg-rose-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>OSPE Quiz ({questions.length}Q)</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        
        {/* TOPIC HERO HEADER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
                TOPIC #{topic.topicNumber} • {topic.subCategory.toUpperCase()}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>1st Year Core Curriculum</span>
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {topic.titleEn}
                </h1>
                <p className="text-sm text-indigo-300/90 font-arabic mt-1" dir="rtl">
                  {topic.titleAr}
                </p>
              </div>

              {/* Action Trigger */}
              <button
                type="button"
                onClick={() => handleScrollToSection('interactive_mode')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/25 transition-all hover:scale-102 cursor-pointer shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Interactive Learning</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 1: QUICK OVERVIEW & NUMERIC STAT CARDS */}
        <section ref={overviewRef} className="space-y-4" id="section-overview">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Quick Overview & Core Concept
            </h2>
          </div>

          {/* Concise definition banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
            <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
              {topic.whatIsIt.en}
            </p>
            {topic.whatIsIt.ar && (
              <p className="text-xs text-slate-400 font-arabic border-t border-slate-800/80 pt-2" dir="rtl">
                <span className="font-bold text-indigo-400 ml-1">ببساطة:</span>
                {topic.whatIsIt.ar}
              </p>
            )}
          </div>

          {/* Bite-Sized Fact Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-1 hover:border-indigo-500/50 transition-colors shadow-xs"
              >
                <span className="text-xl sm:text-2xl font-black text-indigo-400 font-mono">
                  {stat.number}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">{stat.label}</h4>
                  <p className="text-[11px] text-slate-400">{stat.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: CENTRAL INTERACTIVE ANATOMICAL IMAGE & SPOTTER */}
        <section ref={interactiveRef} className="space-y-4" id="section-interactive-anatomy">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-400" />
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Interactive Anatomical Diagram
                </h2>
                <p className="text-xs text-slate-400">
                  {isInteractiveModeActive
                    ? 'Active Recall Mode: Identify the requested structure on the diagram'
                    : 'Tap any pinpoint marker to inspect location, function, and high-yield notes'}
                </p>
              </div>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsInteractiveModeActive(false);
                  setInteractiveFeedback('idle');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  !isInteractiveModeActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Explore Mode</span>
              </button>

              <button
                type="button"
                onClick={handleRestartInteractiveMode}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isInteractiveModeActive
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Active Recall Challenge</span>
              </button>
            </div>
          </div>

          {/* ACTIVE RECALL CHALLENGE BANNER (When interactive mode is active) */}
          {isInteractiveModeActive && (
            <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-in fade-in">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[11px] font-black font-mono">
                    STEP {interactiveStep + 1} / {spotters.length}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Score: {interactiveScore} / {spotters.length}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Identify the <span className="text-amber-400 underline">{currentTargetPin.structureNameEn}</span>
                </h3>
                <p className="text-xs text-slate-300 font-arabic" dir="rtl">
                  المطلوب: انقر على الدبوس الصحيح الذي يمثل ({currentTargetPin.structureNameAr})
                </p>
              </div>

              {/* Feedback & Next Button */}
              <div className="flex items-center gap-2 shrink-0">
                {interactiveFeedback === 'correct' && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Correct!
                    </span>
                    <button
                      type="button"
                      onClick={handleNextInteractiveStep}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      {interactiveStep < spotters.length - 1 ? 'Next Structure →' : 'Finish Challenge'}
                    </button>
                  </div>
                )}

                {interactiveFeedback === 'wrong' && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Try Again
                    </span>
                  </div>
                )}

                {interactiveFinished && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                      Completed: {interactiveScore}/{spotters.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleRestartInteractiveMode}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                    >
                      Restart
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MAIN INTERACTIVE DISPLAY GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* LEFT / CENTER: Large Anatomical Visual with Hotspot Pins */}
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative group">
              <div className="relative aspect-4/3 sm:aspect-16/11 w-full bg-slate-950 flex items-center justify-center">
                <AnatomyTopicVisual
                  topicId={topic.id}
                  selectedPinNumber={selectedPin?.pinNumber}
                  activePinNumber={isInteractiveModeActive ? currentTargetPin?.pinNumber : undefined}
                  onPinClick={handlePinClickInInteractive}
                  spotters={spotters}
                  interactive={true}
                  variant="full"
                  className="w-full h-full"
                />
                
                {/* Subtle vignette for contrast */}
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-slate-950/40 pointer-events-none" />

                {/* Hotspot Pins Overlay */}
                {spotters.map(pin => {
                  const isSelected = selectedPin?.pinNumber === pin.pinNumber;
                  const isTargetInChallenge = currentTargetPin.pinNumber === pin.pinNumber;
                  const isAttempted = selectedPinAttempt === pin.pinNumber;

                  let pinStyle = 'bg-indigo-600 text-white border-white hover:scale-110';

                  if (!isInteractiveModeActive) {
                    if (isSelected) {
                      pinStyle = 'bg-amber-500 text-slate-950 border-white scale-125 shadow-lg shadow-amber-500/50 ring-4 ring-amber-400/30';
                    }
                  } else {
                    // In Interactive Active Recall Mode
                    if (isAttempted) {
                      if (interactiveFeedback === 'correct') {
                        pinStyle = 'bg-emerald-500 text-white border-white scale-125 ring-4 ring-emerald-400/30';
                      } else {
                        pinStyle = 'bg-rose-500 text-white border-white scale-110 animate-shake';
                      }
                    } else if (interactiveFeedback === 'correct' && isTargetInChallenge) {
                      pinStyle = 'bg-emerald-500 text-white border-white scale-125 ring-4 ring-emerald-400/30';
                    }
                  }

                  return (
                    <button
                      key={pin.pinNumber}
                      type="button"
                      onClick={() => handlePinClickInInteractive(pin)}
                      style={{ left: `${pin.positionX}%`, top: `${pin.positionY}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 font-mono font-bold text-xs flex items-center justify-center transition-all duration-200 cursor-pointer z-20 ${pinStyle}`}
                    >
                      {pin.pinNumber}
                    </button>
                  );
                })}
              </div>

              {/* Bottom bar of image */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">
                  {spotters.length} Interactive Markers Identified
                </span>
                <span className="text-indigo-400">
                  Tap marker numbers to view details
                </span>
              </div>
            </div>

            {/* RIGHT: Structure Information Panel (Concise, Clean & Readable) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              {selectedPin ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black font-mono text-xs flex items-center justify-center">
                        #{selectedPin.pinNumber}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {selectedPin.structureNameEn}
                        </h3>
                        <p className="text-xs text-indigo-300 font-arabic" dir="rtl">
                          {selectedPin.structureNameAr}
                        </p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300 font-bold">
                      {selectedPin.level || 'CORE'}
                    </span>
                  </div>

                  {/* Concise Structure Fields */}
                  <div className="space-y-3 text-xs">
                    
                    {/* Location */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
                        📍 Anatomical Location
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        {selectedPin.whereIsIt}
                      </p>
                    </div>

                    {/* Function / Action */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
                        ⚙️ Function & Motion
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        {selectedPin.functionDesc}
                      </p>
                    </div>

                    {/* High-Yield Key Point */}
                    <div className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/40 space-y-1">
                      <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Key High-Yield Point
                      </span>
                      <p className="text-indigo-200 leading-relaxed">
                        {selectedPin.highYieldNote}
                      </p>
                    </div>

                    {/* Clinical Note (if present) */}
                    {selectedPin.clinicalNote && (
                      <div className="bg-rose-950/30 p-3 rounded-xl border border-rose-900/40 space-y-1">
                        <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                          <Stethoscope className="w-3 h-3" /> Clinical Relevance
                        </span>
                        <p className="text-rose-200 leading-relaxed">
                          {selectedPin.clinicalNote}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Marker Quick Switcher Pill Strip */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <span className="text-[11px] text-slate-400 font-bold shrink-0 mr-1">
                      Pins:
                    </span>
                    {spotters.map(pin => (
                      <button
                        key={pin.pinNumber}
                        type="button"
                        onClick={() => setSelectedPin(pin)}
                        className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                          selectedPin.pinNumber === pin.pinNumber
                            ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {pin.pinNumber}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Tap any numbered pin on the diagram to inspect structure details.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: KEY STRUCTURES (Bite-Sized Cards Grid) */}
        <section ref={structuresRef} className="space-y-4" id="section-structures">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Key Anatomical Structures & Landmarks
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {topic.keyStructures.length} Core Landmarks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.keyStructures.map((struct, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 transition-colors shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">
                      {struct.level}
                    </span>
                    <span className="text-xs text-slate-400 font-arabic" dir="rtl">
                      {struct.nameAr}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {struct.nameEn}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <p>
                      <strong className="text-slate-400">Location:</strong> {struct.location}
                    </p>
                    <p>
                      <strong className="text-slate-400">Function:</strong> {struct.function}
                    </p>
                    <p>
                      <strong className="text-slate-400">Recognition:</strong> {struct.howToRecognize}
                    </p>
                  </div>
                </div>

                {struct.clinicalNote && (
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-amber-300/90 leading-relaxed">
                    💡 <strong className="text-amber-400">Clinical Pearl:</strong> {struct.clinicalNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CLINICAL POINTS & COMMON EXAM PITFALLS */}
        <section ref={clinicalRef} className="space-y-4" id="section-clinical">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <Stethoscope className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Clinical Pearls & Common Pitfalls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Clinical Highlights Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-bold text-sm text-white">
                  High-Yield Exam Points
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                {topic.highYieldExamPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-amber-400 font-bold">★</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              {topic.clinicalNote && (
                <div className="mt-3 p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200 leading-relaxed">
                  🩺 <strong>Clinical Relevance:</strong> {topic.clinicalNote}
                </div>
              )}
            </div>

            {/* Common Mistakes Avoidance Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400">
                <ShieldAlert className="w-4 h-4" />
                <h3 className="font-bold text-sm text-white">
                  Common Exam Mistakes to Avoid
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                {topic.commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                    <h4 className="font-bold text-white flex items-center justify-between">
                      <span>{mistake.titleEn}</span>
                      <span className="text-[10px] text-slate-400 font-arabic">{mistake.titleAr}</span>
                    </h4>
                    <p className="text-rose-300 line-through text-[11px]">
                      ✕ {mistake.wrongConcept}
                    </p>
                    <p className="text-emerald-300 font-medium text-[11px]">
                      ✓ {mistake.correctConcept}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: EMBEDDED OSPE PRACTICE QUIZ */}
        <section ref={quizRef} className="space-y-4" id="section-quiz">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-rose-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                OSPE Practice Quiz & Self Assessment
              </h2>
            </div>
            {questions.length > 0 && (
              <span className="text-xs text-slate-400 font-mono">
                {questions.length} Practical Questions
              </span>
            )}
          </div>

          {questions.length > 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
              {!quizFinished && currentQuestion ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold font-mono">
                      Question {currentQuizIndex + 1} of {questions.length}
                    </span>
                    <span className="text-slate-400 font-mono">
                      Score: {quizScore}
                    </span>
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {currentQuestion.questionEn}
                    </h3>
                    <p className="text-xs text-slate-400 font-arabic" dir="rtl">
                      {currentQuestion.questionAr}
                    </p>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedQuizOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;

                      let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500 hover:text-white';

                      if (isQuizAnswerSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                        } else {
                          btnStyle = 'bg-slate-950 border-slate-800/50 text-slate-500 opacity-60';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-600 text-white border-indigo-400 shadow-md';
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isQuizAnswerSubmitted}
                          onClick={() => handleSelectQuizOption(option)}
                          className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {isQuizAnswerSubmitted && isCorrect && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {isQuizAnswerSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Answer Explanation Box */}
                  {isQuizAnswerSubmitted && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-in fade-in">
                      <div className="flex items-center gap-2">
                        {selectedQuizOption === currentQuestion.correctAnswer ? (
                          <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                            <Check className="w-4 h-4" /> Correct Answer!
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold text-xs flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Incorrect
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {currentQuestion.explanationEn}
                      </p>
                      {currentQuestion.explanationAr && (
                        <p className="text-[11px] text-slate-400 font-arabic border-t border-slate-800/80 pt-1.5" dir="rtl">
                          {currentQuestion.explanationAr}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Submit / Next Question Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                    {!isQuizAnswerSubmitted ? (
                      <button
                        type="button"
                        disabled={!selectedQuizOption}
                        onClick={handleSubmitQuizAnswer}
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextQuizQuestion}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        {currentQuizIndex < questions.length - 1 ? 'Next Question →' : 'View Results'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Quiz Finished Screen */
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Practice Quiz Completed!
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      You scored {quizScore} out of {questions.length} (
                      {Math.round((quizScore / questions.length) * 100)}%)
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleRestartQuiz}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                    >
                      Retake Quiz
                    </button>

                    {onLaunchOSPEExam && (
                      <button
                        type="button"
                        onClick={() => onLaunchOSPEExam('exam_comprehensive')}
                        className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md"
                      >
                        Launch Timed OSPE Exam
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-6 text-center text-slate-400 text-xs">
              No quiz questions currently available for this module.
            </div>
          )}
        </section>

        {/* 3. PREVIOUS / NEXT TOPIC FOOTER NAVIGATION */}
        <footer className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevTopic ? (
            <button
              type="button"
              onClick={() => onSelectTopic(prevTopic)}
              className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left">
                <span className="text-[10px] text-slate-500 block font-mono">PREVIOUS TOPIC</span>
                <span>{prevTopic.titleEn}</span>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextTopic && (
            <button
              type="button"
              onClick={() => onSelectTopic(nextTopic)}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block font-mono">NEXT TOPIC</span>
                <span>{nextTopic.titleEn}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </footer>

      </main>
    </div>
  );
};
