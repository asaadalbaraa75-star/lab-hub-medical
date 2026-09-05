import React, { useState, useEffect } from 'react';
import {
  ANATOMY_TOPICS,
  ANATOMY_PRACTICAL_EXAMS,
  AnatomyTopic,
  AnatomyExamConfig
} from './AnatomyData';
import { AnatomyTopicLessonPage } from './AnatomyTopicLessonPage';
import { AnatomyTopicVisual } from './AnatomyTopicVisuals';
import { AnatomyTopicDetailModal } from './AnatomyTopicDetailModal';
import { AnatomyInteractiveQuizModal } from './AnatomyInteractiveQuizModal';
import { AnatomyPracticalExamModal } from './AnatomyPracticalExamModal';
import { AnatomicalPlanesInteractiveView } from './AnatomicalPlanesInteractiveView';
import { AnatomyInteractive3DViewer } from './AnatomyInteractive3DViewer';
import { AnatomyMovementsAndJointsViewer } from './AnatomyMovementsAndJointsViewer';
import { MEDICAL_ASSETS } from '../../../assets/medicalImages';
import { anatomyProgressService, AnatomyStudentProgress } from './AnatomyStudentProgressService';
import {
  Compass,
  Move3d,
  Activity,
  Bone,
  GitMerge,
  Brain,
  Heart,
  Wind,
  Utensils,
  Droplets,
  User,
  Layers,
  Sparkles,
  Search,
  BookOpen,
  Target,
  Award,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Eye,
  CheckCircle2,
  GraduationCap,
  Stethoscope,
  Clock,
  Bookmark,
  Play,
  RotateCcw,
  Flame,
  Check,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  BarChart3,
  BookMarked
} from 'lucide-react';

interface AnatomyLabViewProps {
  searchQuery?: string;
  onOpenExam?: () => void;
  onOpenSpotter?: () => void;
  onOpenQuiz?: () => void;
}

export const AnatomyLabView: React.FC<AnatomyLabViewProps> = ({
  searchQuery = '',
  onOpenExam,
  onOpenSpotter,
  onOpenQuiz
}) => {
  const [internalSearch, setInternalSearch] = useState<string>(searchQuery);
  const [activeViewMode, setActiveViewMode] = useState<'dashboard' | 'organ_systems' | 'exams' | 'all_topics' | 'interactive_planes' | 'interactive_3d_muscles' | 'interactive_movements'>('dashboard');
  const [selectedOrganSystem, setSelectedOrganSystem] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<AnatomyTopic | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isPracticalExamModalOpen, setIsPracticalExamModalOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string>('exam_comprehensive');
  const [activeQuizFilter, setActiveQuizFilter] = useState<string | undefined>(undefined);
  const [studentProgress, setStudentProgress] = useState<AnatomyStudentProgress>(anatomyProgressService.getProgress());

  // Sync internal search when parent prop changes
  useEffect(() => {
    if (searchQuery !== undefined) {
      setInternalSearch(searchQuery);
    }
  }, [searchQuery]);

  // Refresh student progress on modal close
  useEffect(() => {
    setStudentProgress(anatomyProgressService.getProgress());
  }, [isDetailModalOpen, isPracticalExamModalOpen, isQuizModalOpen]);

  const handleOpenTopic = (topic: AnatomyTopic) => {
    setSelectedTopic(topic);
    setIsDetailModalOpen(true);
    const updated = anatomyProgressService.markTopicComplete(topic.id);
    setStudentProgress(updated);
  };

  const handleOpenTopicById = (topicId: string) => {
    const topic = ANATOMY_TOPICS.find(t => t.id === topicId) || ANATOMY_TOPICS[0];
    handleOpenTopic(topic);
  };

  const handleOpenQuickQuiz = (topicId?: string) => {
    setActiveQuizFilter(topicId);
    setIsQuizModalOpen(true);
  };

  const handleLaunchPracticalExam = (examId: string = 'exam_comprehensive') => {
    setSelectedExamId(examId);
    setIsPracticalExamModalOpen(true);
  };

  const handleToggleBookmark = (e: React.MouseEvent, topicId: string) => {
    e.stopPropagation();
    anatomyProgressService.toggleBookmark(topicId);
    setStudentProgress(anatomyProgressService.getProgress());
  };

  // Find last studied topic
  const lastStudiedTopic = ANATOMY_TOPICS.find(t => t.id === studentProgress.lastStudiedTopicId) || ANATOMY_TOPICS[3]; // default to skeletal

  // Search query filter
  const query = internalSearch.trim().toLowerCase();

  const filteredTopics = ANATOMY_TOPICS.filter(topic => {
    if (!query) return true;
    return (
      topic.titleEn.toLowerCase().includes(query) ||
      topic.titleAr.toLowerCase().includes(query) ||
      topic.quickIdeaEn.toLowerCase().includes(query) ||
      topic.quickIdeaAr.toLowerCase().includes(query) ||
      topic.keyStructures.some(
        s => s.nameEn.toLowerCase().includes(query) || s.nameAr.toLowerCase().includes(query)
      ) ||
      topic.keyTerms.some(
        t => t.term.toLowerCase().includes(query) || t.meaningAr.toLowerCase().includes(query)
      ) ||
      topic.clinicalNote.toLowerCase().includes(query) ||
      topic.commonMistakes.some(
        m => m.titleAr.toLowerCase().includes(query) || m.titleEn.toLowerCase().includes(query)
      )
    );
  });

  // Calculate Overall Progress
  const overallProgressPercent = anatomyProgressService.getOverallProgressPercent(ANATOMY_TOPICS.length);
  const bestScore = anatomyProgressService.getBestScore();
  const recentExamsList = Object.entries(studentProgress.examScores);

  // 7 Main Anatomy Categories Definition
  const mainCategories = [
    {
      id: 'anat_planes',
      topicId: 'anat_planes',
      titleAr: 'المستويات التشريحية',
      titleEn: 'Anatomical Planes',
      descriptionAr: 'تعرف على المستويات الأساسية للجسم (Sagittal, Coronal, Transverse) وقراءة صور الأشعة.',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
      badge: 'الأساسيات التشريحية',
      icon: Compass,
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'anat_directional_terms',
      topicId: 'anat_directional_terms',
      titleAr: 'المصطلحات الاتجاهية',
      titleEn: 'Anatomical Directional Terms',
      descriptionAr: 'تعلم لغة تحديد المواقع والاتجاهات في الجسم (Superior, Inferior, Medial, Lateral, Proximal, Distal...).',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
      badge: 'لغة الطب القياسية',
      icon: Move3d,
      color: 'from-sky-600 to-blue-700'
    },
    {
      id: 'anat_movements',
      topicId: 'anat_movements',
      titleAr: 'حركات الجسم',
      titleEn: 'Body Movements & Joint Actions',
      descriptionAr: 'اكتشف حركات المفاصل الأساسية والطرفية (Flexion, Extension, Abduction, Adduction, Supination...).',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
      badge: 'الميكانيكا الحركية',
      icon: Activity,
      color: 'from-emerald-600 to-teal-700'
    },
    {
      id: 'anat_skeletal',
      topicId: 'anat_skeletal',
      titleAr: 'الهيكل العظمي',
      titleEn: 'Skeletal System & Osteology',
      descriptionAr: 'دراسة عظام الهيكل المحوري والطرفي ومعالمها البارزة والكسور السريرية الشائعة.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
      badge: '206 عظمة • الهيكل المحوري والطرفي',
      icon: Bone,
      color: 'from-amber-600 to-orange-700'
    },
    {
      id: 'anat_joints',
      topicId: 'anat_joints',
      titleAr: 'المفاصل والتمفصلات',
      titleEn: 'Joints & Articulations',
      descriptionAr: 'أنواع المفاصل التشريحية وتصنيفها وحركتها (Fibrous, Cartilaginous, Synovial) وأربطتها.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
      badge: 'تصنيف المفاصل والأربطة',
      icon: GitMerge,
      color: 'from-purple-600 to-indigo-800'
    },
    {
      id: 'anat_muscles',
      topicId: 'anat_muscles',
      titleAr: 'عضلات الجسم الرئيسية',
      titleEn: 'Major Muscles of the Body',
      descriptionAr: 'عضلات الأطراف والجذع والمنشأ والارتكاز ووظائف الحركة والأعصاب المغذية.',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
      badge: 'علم العضلات والأعصاب',
      icon: Activity,
      color: 'from-rose-600 to-pink-700'
    },
    {
      id: 'organ_systems_main',
      topicId: 'anat_cardio',
      isOrganCategory: true,
      titleAr: 'الأجهزة الحيوية',
      titleEn: 'Organ Systems (Visceral Anatomy)',
      descriptionAr: 'الأجهزة الحيوية الداخلية السبعة وتراكيبها: القلب، الدماغ، الرئتان، الجهاز الهضمي، والكلى.',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80',
      badge: '7 أجهزة حيوية داخلية',
      icon: Layers,
      color: 'from-red-600 to-rose-800'
    }
  ];

  // 7 Dedicated Organ Systems Definition
  const organSystemsList = [
    {
      id: 'anat_skeletal',
      topicId: 'anat_skeletal',
      examId: 'exam_bones',
      titleAr: 'الهيكل العظمي',
      titleEn: 'Skeletal System',
      descriptionAr: 'الهيكل العظمي المحوري والطرفي، قحف الرأس، الأضلاع، العمود الفقري، وعظام الأطراف الطويلة.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
      keyOrgans: 'Femur, Tibia, Humerus, Skull, Spine',
      icon: Bone,
      color: 'border-amber-500/40 text-amber-400'
    },
    {
      id: 'anat_nervous',
      topicId: 'anat_nervous',
      examId: 'exam_organ_systems',
      titleAr: 'الجهاز العصبي',
      titleEn: 'Nervous System',
      descriptionAr: 'الدماغ (المخ، المخيخ، جذع الدماغ)، النخاع الشوكي، والأعصاب القحفية والطرفية المعالجة للإشارات.',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
      keyOrgans: 'Cerebrum, Cerebellum, Brainstem, Spinal Cord',
      icon: Brain,
      color: 'border-purple-500/40 text-purple-400'
    },
    {
      id: 'anat_cardio',
      topicId: 'anat_cardio',
      examId: 'exam_organ_systems',
      titleAr: 'جهاز الدوران والقلب',
      titleEn: 'Cardiovascular System',
      descriptionAr: 'حجرات القلب الأربع، الصمامات الميترالية والأورطية، الشريان الأورطي، والدورة الدموية الرئوية والجهازية.',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80',
      keyOrgans: 'Left/Right Ventricles, Mitral Valve, Aorta',
      icon: Heart,
      color: 'border-rose-500/40 text-rose-400'
    },
    {
      id: 'anat_respiratory',
      topicId: 'anat_respiratory',
      examId: 'exam_organ_systems',
      titleAr: 'الجهاز التنفسي',
      titleEn: 'Respiratory System',
      descriptionAr: 'الحنجرة، الرغامي، الشجرة القصبية، والرئتان (3 فصوص يمنى وفصان يسرى مع الثلمة القلبية).',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
      keyOrgans: 'Trachea, Right/Left Lungs, Diaphragm',
      icon: Wind,
      color: 'border-sky-500/40 text-sky-400'
    },
    {
      id: 'anat_digestive',
      topicId: 'anat_digestive',
      examId: 'exam_organ_systems',
      titleAr: 'الجهاز الهضمي',
      titleEn: 'Digestive System',
      descriptionAr: 'المريء، المعدة، الكبد، المرارة، البنكرياس، الأمعاء الدقيقة والغليظة، والزائدة الدودية.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      keyOrgans: 'Stomach, Liver, Gallbladder, Pancreas, Colon',
      icon: Utensils,
      color: 'border-emerald-500/40 text-emerald-400'
    },
    {
      id: 'anat_urinary',
      topicId: 'anat_urinary',
      examId: 'exam_organ_systems',
      titleAr: 'الجهاز البولي',
      titleEn: 'Urinary System',
      descriptionAr: 'الكليتان، سُرّة الكلية بترتيب V-A-U، الحالبان، والمثانة البولية وإحليل البول.',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
      keyOrgans: 'Kidneys, Renal Cortex, Ureters, Bladder',
      icon: Droplets,
      color: 'border-teal-500/40 text-teal-400'
    },
    {
      id: 'anat_reproductive',
      topicId: 'anat_reproductive',
      examId: 'exam_organ_systems',
      titleAr: 'الجهاز التناسلي',
      titleEn: 'Reproductive System',
      descriptionAr: 'الأعضاء التناسلية الذكرية والأنثوية: الرحم، المبيضان، قناة فالوب، الخصيتان، والبروستاتا.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
      keyOrgans: 'Uterus, Fallopian Tubes, Ovaries, Testes',
      icon: User,
      color: 'border-pink-500/40 text-pink-400'
    }
  ];

  // Quick Search Keywords for First-Year Anatomy
  const quickSearchTags = [
    { label: 'Femur (عظم الفخذ)', query: 'Femur' },
    { label: 'Tibia (قصبة الساق)', query: 'Tibia' },
    { label: 'Humerus (عظم العضد)', query: 'Humerus' },
    { label: 'Biceps (ذات الرأسين)', query: 'Biceps' },
    { label: 'Triceps (ثلاثية الرؤوس)', query: 'Triceps' },
    { label: 'Heart & Mitral (القلب)', query: 'Heart' },
    { label: 'Lungs (الرئتان)', query: 'Lung' },
    { label: 'Sagittal & Coronal', query: 'Sagittal' },
    { label: 'Knee & Joint (المفاصل)', query: 'Joint' },
    { label: 'Flexion & Extension', query: 'Flexion' }
  ];

  // If interactive 3D planes view is requested or topic is planes
  if (activeViewMode === 'interactive_planes' || selectedTopic?.id === 'topic_anatomical_planes') {
    return (
      <AnatomicalPlanesInteractiveView
        onBack={() => {
          setSelectedTopic(null);
          setActiveViewMode('dashboard');
        }}
        onOpenQuiz={() => handleOpenQuickQuiz('topic_anatomical_planes')}
      />
    );
  }

  // If interactive 3D muscles viewer is requested
  if (activeViewMode === 'interactive_3d_muscles') {
    return (
      <AnatomyInteractive3DViewer
        onBack={() => setActiveViewMode('dashboard')}
        onOpenQuiz={() => handleOpenQuickQuiz('topic_muscular')}
      />
    );
  }

  // If interactive body movements & joints viewer is requested
  if (activeViewMode === 'interactive_movements') {
    return (
      <AnatomyMovementsAndJointsViewer
        onBack={() => setActiveViewMode('dashboard')}
      />
    );
  }

  // If a topic is selected, render the dedicated full-page lesson experience
  if (selectedTopic) {
    return (
      <AnatomyTopicLessonPage
        topic={selectedTopic}
        onBack={() => {
          setSelectedTopic(null);
          setIsDetailModalOpen(false);
        }}
        onSelectTopic={(newTopic) => {
          setSelectedTopic(newTopic);
          anatomyProgressService.markTopicComplete(newTopic.id);
          setStudentProgress(anatomyProgressService.getProgress());
        }}
        onLaunchOSPEExam={(examId) => {
          setSelectedExamId(examId || 'exam_comprehensive');
          setIsPracticalExamModalOpen(true);
        }}
      />
    );
  }

  return (
    <div className="space-y-6 text-right animate-in fade-in duration-300" id="anatomy-lab-main-dashboard" dir="rtl">
      
      {/* 1. PROFESSIONAL ANATOMY LAB HEADER (Hero Banner) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 p-5 sm:p-7 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
                GROSS ANATOMY LAB • السنة الأولى
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>منهج أكاديمي تفاعلي معتمد</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              مختبر علم التشريح الطبي (Gross Anatomy Lab)
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              منهج تفاعلي متكامل مبسط لطلاب السنة الأولى في كليات الطب البشري، يشرح التراكيب من البسيط إلى العميق (Simple → Deep) مع دبابيس التحديد التفاعلية (Spotters) ومحطات الفحص العملي (OSPE).
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              type="button"
              id="btn-start-anatomy"
              onClick={() => handleOpenTopicById(studentProgress.lastStudiedTopicId || 'anat_planes')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-102 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>ابدأ دراسة التشريح (Start Anatomy)</span>
            </button>

            <button
              type="button"
              id="btn-quick-practical-exam"
              onClick={() => handleLaunchPracticalExam('exam_comprehensive')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/25 transition-all hover:scale-102 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4" />
              <span>امتحان OSPE العملي</span>
            </button>
          </div>
        </div>

        {/* View Mode Switcher Strip */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => {
              setActiveViewMode('dashboard');
              setInternalSearch('');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeViewMode === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>لوحة الأقسام الرئيسية (7 Categories)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveViewMode('interactive_planes');
              setInternalSearch('');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              (activeViewMode as string) === 'interactive_planes'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'bg-slate-950/80 text-purple-400 hover:text-white border border-purple-500/30'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>مستويات الجسم التفاعلية (3D Planes)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveViewMode('interactive_3d_muscles');
              setInternalSearch('');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              (activeViewMode as string) === 'interactive_3d_muscles'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-slate-950/80 text-cyan-400 hover:text-white border border-cyan-500/30'
            }`}
          >
            <Move3d className="w-3.5 h-3.5 text-cyan-400" />
            <span>أطلس العضلات 3D (Biceps & Limbs)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveViewMode('interactive_movements');
              setInternalSearch('');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              (activeViewMode as string) === 'interactive_movements'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'bg-slate-950/80 text-emerald-400 hover:text-white border border-emerald-500/30'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>حركات الجسم والمفاصل (Kinesiology & Joints)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveViewMode('organ_systems');
              setInternalSearch('');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeViewMode === 'organ_systems'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>الأجهزة الحيوية السبعة (7 Organ Systems)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveViewMode('exams');
              setInternalSearch('');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeViewMode === 'exams'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>محطات الفحص العملي ({ANATOMY_PRACTICAL_EXAMS.length} OSPE Stations)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveViewMode('all_topics');
              setInternalSearch('');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeViewMode === 'all_topics'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>الفهرس التشريحي الشامل ({ANATOMY_TOPICS.length} Topics)</span>
          </button>
        </div>
      </div>

      {/* 2. SEARCH BAR & QUICK FILTERS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="relative">
          <input
            type="text"
            id="anatomy-search-input"
            value={internalSearch}
            onChange={e => setInternalSearch(e.target.value)}
            placeholder="Search anatomy, bones, muscles, joints, organs... (ابحث في العظام، العضلات، المفاصل، الأجهزة...)"
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-11 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
          {internalSearch && (
            <button
              type="button"
              onClick={() => setInternalSearch('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
            >
              مسح
            </button>
          )}
        </div>

        {/* Quick Keyword Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] text-slate-400 font-bold shrink-0 ml-1">
            بحث سريع:
          </span>
          {quickSearchTags.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInternalSearch(tag.query)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] whitespace-nowrap transition-colors cursor-pointer"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. STUDENT DASHBOARD & CONTINUE LEARNING SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Student Progress Overview */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 text-white space-y-4 shadow-md flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">👋</span>
                <h3 className="font-bold text-sm sm:text-base text-white">
                  مرحبًا بك في مختبر التشريح
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[11px] font-mono font-bold">
                تقدمك العام: {overallProgressPercent}%
              </span>
            </div>

            <p className="text-xs text-slate-400">
              يتم حفظ درجاتك والمواضيع المكتملة تلقائياً في ملفك الأكاديمي.
            </p>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800 mt-2">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Academic Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">مواضيع منجزة</span>
              <div className="text-base font-black text-white font-mono">
                {studentProgress.completedTopicIds.length} / {ANATOMY_TOPICS.length}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">معالم وتراكيب</span>
              <div className="text-base font-black text-indigo-400 font-mono">
                {studentProgress.studiedStructuresCount}+
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">وقت الدراسة</span>
              <div className="text-base font-black text-emerald-400 font-mono">
                {studentProgress.totalStudyMinutes} د
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">أعلى نتيجة OSPE</span>
              <div className="text-base font-black text-amber-400 font-mono">
                {bestScore}%
              </div>
            </div>
          </div>

          {/* Recent Exam Attempt */}
          {recentExamsList.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>آخر اختبار: {recentExamsList[0][1].examTitleAr || 'الاختبار العملي'}</span>
              </div>
              <span className="text-emerald-400 font-mono font-bold">
                {recentExamsList[0][1].lastScore}%
              </span>
            </div>
          )}
        </div>

        {/* Continue Learning Action Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-900/60 rounded-3xl p-5 sm:p-6 text-white space-y-4 shadow-md flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">
                متابعة التعلم • CONTINUE LEARNING
              </span>
              <Bookmark className="w-4 h-4 text-indigo-400" />
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
              {lastStudiedTopic.titleAr}
            </h4>

            <p className="text-xs text-indigo-200 line-clamp-2 font-mono">
              {lastStudiedTopic.titleEn}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
              {lastStudiedTopic.whatIsIt.ar}
            </p>
          </div>

          <div className="pt-3 border-t border-indigo-900/50 flex items-center justify-between">
            <div className="text-[11px] text-slate-400 font-mono">
              {lastStudiedTopic.keyStructures.length} تراكيب • {lastStudiedTopic.spotterItems.length} دبابيس
            </div>

            <button
              type="button"
              onClick={() => handleOpenTopic(lastStudiedTopic)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>متابعة [متابعة]</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. SEARCH RESULTS VIEW (When searching) */}
      {query && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-sm text-white">
                نتائج البحث عن: &ldquo;{query}&rdquo; ({filteredTopics.length} مواضيع)
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setInternalSearch('')}
              className="text-xs text-indigo-400 hover:underline"
            >
              عرض الكل
            </button>
          </div>

          {filteredTopics.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              لم يتم العثور على نتائج مطابقة. جرب البحث باسم العظمة أو العضلة بالإنجليزية أو العربية (مثل: Femur, Tibia, Biceps).
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredTopics.map(topic => (
                <div
                  key={topic.id}
                  onClick={() => handleOpenTopic(topic)}
                  className="bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-2xl p-4 space-y-3 cursor-pointer transition-all hover:scale-101"
                >
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 relative">
                    <AnatomyTopicVisual topicId={topic.id} isThumbnail={true} interactive={false} className="w-full h-full" />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/90 text-slate-200 text-[10px] font-mono">
                      {topic.keyStructures.length} تراكيب
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{topic.titleAr}</h4>
                    <p className="text-xs text-slate-400 font-mono">{topic.titleEn}</p>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{topic.whatIsIt.ar}</p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-indigo-400 font-bold">ابدأ التعلم ←</span>
                    <button
                      type="button"
                      onClick={(e) => handleToggleBookmark(e, topic.id)}
                      className="text-slate-400 hover:text-amber-400"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${studentProgress.bookmarkedTopicIds.includes(topic.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. INTERACTIVE 3D CLINICAL LABS (Featured from Reference Design) */}
      {activeViewMode === 'dashboard' && !query && (
        <div className="space-y-3" id="featured-interactive-labs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                المعامل التفاعلية ثلاثية الأبعاد (Featured 3D Interactive Labs)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-500/30">
              Interactive 3D Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: 3D Anatomical Planes */}
            <div
              onClick={() => setActiveViewMode('interactive_planes')}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1124] via-[#070B16] to-[#120B24] border border-purple-500/30 hover:border-purple-500/80 p-5 cursor-pointer group transition-all duration-300 shadow-xl hover:shadow-purple-500/10 flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-900/60 px-2.5 py-1 rounded-lg border border-purple-500/40">
                    Gray's Anatomy • Chapter 1
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7] animate-ping" />
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-black text-white group-hover:text-purple-300 transition-colors">
                    مستويات ومحاور الجسم ثلاثية الأبعاد
                  </h4>
                  <p className="text-xs font-mono text-slate-400">3D Anatomical Planes of the Human Body</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  تحكم تفاعلي مباشر في المستويات السهمية والإكليلية والمستعرضة (Sagittal, Coronal, Transverse) مع تدوير 3D ومطابقة الأشعة المقطعية السريرية CT Scan.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Sagittal (سهمي)', 'Coronal (إكليلي)', 'Transverse (مستعرض)', 'CT Correlation'].map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs font-bold text-purple-400 group-hover:text-purple-300 flex items-center gap-1.5">
                  افتح النموذج التفاعلي (Launch 3D Planes)
                  <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] text-slate-500 font-mono">10 MCQs + Spotter</span>
              </div>
            </div>

            {/* Card 2: 3D Muscle Biomechanics */}
            <div
              onClick={() => setActiveViewMode('interactive_3d_muscles')}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071322] via-[#050C17] to-[#0A1A2F] border border-cyan-500/30 hover:border-cyan-500/80 p-5 cursor-pointer group transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-900/60 px-2.5 py-1 rounded-lg border border-cyan-500/40">
                    Locomotor System • Upper & Lower Limbs
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping" />
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                    أطلس العضلات والميكانيكا الحيوية 3D
                  </h4>
                  <p className="text-xs font-mono text-slate-400">Interactive 3D Muscle Architecture & Biomechanics</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  استكشاف عضلة Biceps Brachii وعضلات الكتف والفخذ مع إبراز الأصل (Origin)، الارتكاز (Insertion)، التعصيب الحركي، وعلامات Popeye السريرية.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Biceps Brachii', 'Coracoid Origin', 'Radial Tuberosity', 'C5-C6 Reflex'].map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1.5">
                  استكشف العضلات ثلاثية الأبعاد (Explore 3D Muscle)
                  <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Interactive Pins + Rotator</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. MAIN ANATOMY CATEGORIES (7 Primary Category Cards) */}
      {activeViewMode === 'dashboard' && !query && (
        <div className="space-y-4" id="main-anatomy-categories-section">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  الأقسام والمفاهيم التشريحية الرئيسية (Main Anatomy Categories)
                </h3>
                <p className="text-xs text-slate-400">
                  7 وحدات دراسية تأسيسية وسريرية تغطي متطلبات السنة الأولى كاملة
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              7 Core Units
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {mainCategories.map((cat, idx) => {
              const CatIcon = cat.icon;
              const isCompleted = studentProgress.completedTopicIds.includes(cat.topicId);

              return (
                <div
                  key={cat.id}
                  className="bg-slate-900 border border-slate-800 hover:border-indigo-500/80 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between transition-all duration-300 group hover:shadow-indigo-500/10"
                >
                  {/* Category Image Header */}
                  <div className="relative aspect-16/9 w-full bg-slate-950 overflow-hidden">
                    <AnatomyTopicVisual
                      topicId={cat.topicId}
                      isThumbnail={true}
                      interactive={false}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700 text-slate-200 text-[10px] font-bold">
                      {cat.badge}
                    </div>

                    {/* Unit Number */}
                    <div className="absolute top-3 left-3 w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md">
                      #{idx + 1}
                    </div>

                    {isCompleted && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3" />
                        <span>تمت دراسته</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 text-right">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                          <CatIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-white group-hover:text-indigo-400 transition-colors">
                            {cat.titleAr}
                          </h4>
                          <p className="text-xs text-slate-400 font-mono line-clamp-1">
                            {cat.titleEn}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 pt-1">
                        {cat.descriptionAr}
                      </p>
                    </div>

                    {/* Action Button: [ابدأ] */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      {cat.isOrganCategory ? (
                        <button
                          type="button"
                          onClick={() => setActiveViewMode('organ_systems')}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>استعراض الأجهزة السبعة [ابدأ]</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenTopicById(cat.topicId)}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>ابدأ دراسة الوحدة [ابدأ]</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. ORGAN SYSTEMS DEDICATED VIEW (The 7 Organ Systems) */}
      {(activeViewMode === 'organ_systems' || activeViewMode === 'dashboard') && !query && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5" id="organ-systems-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold font-mono">
                  7 ORGAN SYSTEMS
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  الأجهزة الحيوية السبعة (Visceral Organ Systems)
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                بطاقات تفاعلية متخصصة لكل جهاز مع زر استكشاف [Explore] وزر تدريب واختبار [Practice].
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleLaunchPracticalExam('exam_organ_systems')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer shrink-0"
            >
              <Stethoscope className="w-4 h-4" />
              <span>اختبار الأجهزة الحيوية OSPE</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {organSystemsList.map((sys, idx) => {
              const SysIcon = sys.icon;
              return (
                <div
                  key={sys.id}
                  className="bg-slate-950 border border-slate-800 hover:border-indigo-500/70 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all group shadow-sm"
                >
                  <div className="space-y-2.5">
                    {/* Thumbnail */}
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 relative">
                      <AnatomyTopicVisual
                        topicId={sys.topicId}
                        isThumbnail={true}
                        interactive={false}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/90 text-slate-200 text-[10px] font-mono pointer-events-none">
                        #{idx + 1}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <SysIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                        <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                          {sys.titleAr}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
                        {sys.titleEn}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {sys.descriptionAr}
                    </p>

                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono line-clamp-1">
                      📍 {sys.keyOrgans}
                    </div>
                  </div>

                  {/* Dual Action Buttons: [استكشاف / Explore] and [تدريب / Practice] */}
                  <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenTopicById(sys.topicId)}
                      className="py-2 px-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>استكشاف</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLaunchPracticalExam(sys.examId)}
                      className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1 border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Target className="w-3.5 h-3.5 text-amber-400" />
                      <span>تدريب</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. PRACTICAL EXAMS SHOWCASE (OSPE Practical Stations) */}
      {(activeViewMode === 'exams' || activeViewMode === 'dashboard') && !query && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5" id="available-exams-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
                  OSPE PRACTICAL EXAM STATIONS
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  محطات الفحص العملي المتاحة لطلاب السنة الأولى
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                كل اختبار يحتوي على عينات حقيقية، صور إشعاعية، دبابيس تأشير، ومؤقت زمني 30 ثانية لكل سؤال.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleLaunchPracticalExam('exam_comprehensive')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all hover:scale-102 cursor-pointer shrink-0"
            >
              <Award className="w-4 h-4" />
              <span>بدء الاختبار العملي الشامل</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ANATOMY_PRACTICAL_EXAMS.map(exam => {
              const attempt = studentProgress.examScores[exam.id];
              return (
                <div
                  key={exam.id}
                  className="bg-slate-950 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono font-bold">
                        {exam.questionCount} محطات فحص
                      </span>
                      {attempt && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                          أعلى نتيجة: {attempt.highScore}%
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {exam.titleAr}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {exam.titleEn}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {exam.descriptionAr}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{exam.timePerQuestionSec}ث / سؤال</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLaunchPracticalExam(exam.id)}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>دخول المحطة [ابدأ]</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 8. COMPLETE TOPICS TABLE (Comprehensive Index) */}
      {activeViewMode === 'all_topics' && !query && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="text-base font-bold text-white">
                الفهرس الشامل لمواضيع التشريح ({ANATOMY_TOPICS.length} Topics)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              First-Year Complete Syllabus
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ANATOMY_TOPICS.map(topic => (
              <div
                key={topic.id}
                onClick={() => handleOpenTopic(topic)}
                className="bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-2xl p-4 flex flex-col justify-between space-y-3 cursor-pointer transition-all hover:scale-101"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                      وحدة #{topic.topicNumber}
                    </span>
                    <span className="text-[10px] text-indigo-400 font-mono font-bold">
                      {topic.keyStructures.length} تراكيب
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white">{topic.titleAr}</h4>
                  <p className="text-xs text-slate-400 font-mono">{topic.titleEn}</p>
                  <p className="text-xs text-slate-300 line-clamp-2">{topic.whatIsIt.ar}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-indigo-400 font-bold">عرض الشرح والتحديد التفاعلي ←</span>
                  <Play className="w-3.5 h-3.5 text-indigo-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODALS */}
      {selectedTopic && (
        <AnatomyTopicDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          topic={selectedTopic}
          onOpenPracticeQuiz={() => {
            setIsDetailModalOpen(false);
            handleOpenQuickQuiz(selectedTopic.id);
          }}
          onOpenPracticalExam={() => {
            setIsDetailModalOpen(false);
            handleLaunchPracticalExam('exam_comprehensive');
          }}
        />
      )}

      <AnatomyInteractiveQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        topicFilter={activeQuizFilter}
        onQuizComplete={() => setStudentProgress(anatomyProgressService.getProgress())}
      />

      <AnatomyPracticalExamModal
        isOpen={isPracticalExamModalOpen}
        onClose={() => setIsPracticalExamModalOpen(false)}
        examId={selectedExamId}
        onExamComplete={() => setStudentProgress(anatomyProgressService.getProgress())}
      />
    </div>
  );
};
