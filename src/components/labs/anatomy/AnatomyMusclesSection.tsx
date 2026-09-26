/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Muscles Section — Independent Learning Units
 *
 * THE CORE ACADEMIC CHAIN:
 * MUSCLE -> REAL VERIFIED IMAGE / INTERACTIVE ATLAS -> LOCATION -> ORIGIN -> INSERTION -> INNERVATION -> ACTION -> VIDEO -> TEST
 */

import React, { useState } from 'react';
import {
  MuscleLearningUnit,
  MuscleSpotterQuestion,
  ANATOMY_MUSCLES_SUITE
} from './AnatomyCurriculumData';
import { INTERACTIVE_ATLAS_TOPICS } from './atlas/AnatomyInteractiveAtlasData';
import { InteractiveAtlasCanvas } from './atlas/InteractiveAtlasCanvas';
import { MedicalImageSourceBadge } from '../../common/MedicalImageSourceBadge';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';
import { db, storage } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storageService } from '../../../services/storageService';
import { ExamQuestion } from '../../../types';
import { getYouTubeEmbedUrl, getYouTubeWatchUrl } from '../../../utils/youtubeUtils';
import {
  Activity,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  Target,
  FileText,
  ShieldCheck,
  Video,
  Layers,
  Compass,
  UploadCloud,
  Check,
  RefreshCw
} from 'lucide-react';

interface AnatomyMusclesSectionProps {
  onBackToMain?: () => void;
  onOpenSpotter?: () => void;
  initialMuscleId?: string;
}

// Map muscle id to atlas topic id
const MUSCLE_TO_ATLAS_TOPIC: Record<string, string> = {
  biceps_brachii: 'muscle_biceps_brachii',
  triceps_brachii: 'muscle_triceps_brachii',
  deltoid: 'muscle_deltoid',
  pectoralis_major: 'muscle_pectoralis_major',
  rectus_abdominis: 'muscle_rectus_abdominis',
  trapezius: 'muscle_trapezius_back',
  sternocleidomastoid: 'muscle_sternocleidomastoid',
  quadriceps_femoris: 'muscle_quadriceps_femoris',
  gastrocnemius: 'muscle_gastrocnemius_calf',
  eye_muscles: 'muscle_extraocular_eye'
};

// Auto-grading normalizer for OSPE spotters
function normalizeSpotterAnswer(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^(the|a|an|musculus|m\.)\s+/i, '')
    .replace(/\s+(muscle|muscles|belly|head|part)$/i, '')
    .trim();
}

function checkSpotterAnswer(userInput: string, correctAnswer: string, acceptableAnswers: string[]): boolean {
  const normUser = normalizeSpotterAnswer(userInput);
  if (!normUser) return false;

  const allAcceptable = [correctAnswer, ...acceptableAnswers];
  for (const acc of allAcceptable) {
    const normAcc = normalizeSpotterAnswer(acc);
    if (normUser === normAcc) return true;
    if (userInput.trim().toLowerCase() === acc.trim().toLowerCase()) return true;
  }
  return false;
}

export const AnatomyMusclesSection: React.FC<AnatomyMusclesSectionProps> = ({
  onBackToMain,
  onOpenSpotter,
  initialMuscleId
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeMuscleId, setActiveMuscleId] = useState<string>(
    initialMuscleId || ANATOMY_MUSCLES_SUITE[0].id
  );
  const [viewMode, setViewMode] = useState<'atlas' | 'card'>('card');
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  // OSPE Spotter Text Input states
  const [spotterInputs, setSpotterInputs] = useState<Record<string, string>>({});
  const [spotterChecked, setSpotterChecked] = useState<Record<string, boolean>>({});
  const [spotterCorrect, setSpotterCorrect] = useState<Record<string, boolean>>({});

  // Central Question Bank Sync State
  const [isSyncing, setIsSyncing] = useState<Record<string, boolean>>({});
  const [syncStatus, setSyncStatus] = useState<Record<string, 'idle' | 'success' | 'error'>>({});
  const [isSyncingAll, setIsSyncingAll] = useState<boolean>(false);
  const [syncAllMsg, setSyncAllMsg] = useState<string | null>(null);

  const regions = [
    { id: 'all', labelEn: 'All Muscles', labelAr: 'جميع العضلات' },
    { id: 'upper_limb', labelEn: 'Upper Limb', labelAr: 'الطرف العلوي' },
    { id: 'lower_limb', labelEn: 'Lower Limb', labelAr: 'الطرف السفلي' },
    { id: 'chest', labelEn: 'Chest', labelAr: 'الصدر' },
    { id: 'back', labelEn: 'Back', labelAr: 'الظهر' },
    { id: 'abdomen', labelEn: 'Abdomen', labelAr: 'البطن' },
    { id: 'face_neck', labelEn: 'Face & Neck', labelAr: 'الوجه والعنق' },
    { id: 'eye', labelEn: 'Eye Muscles', labelAr: 'عضلات العين' }
  ];

  const filteredMuscles = ANATOMY_MUSCLES_SUITE.filter(muscle => {
    if (selectedRegion === 'all') return true;
    return muscle.region === selectedRegion;
  });

  const activeMuscle =
    ANATOMY_MUSCLES_SUITE.find(m => m.id === activeMuscleId) || ANATOMY_MUSCLES_SUITE[0];

  const atlasTopicId = MUSCLE_TO_ATLAS_TOPIC[activeMuscle.id];
  const atlasTopic = INTERACTIVE_ATLAS_TOPICS.find(t => t.id === atlasTopicId);

  // OSPE Spotter Handlers
  const handleSpotterInputChange = (questionId: string, val: string) => {
    setSpotterInputs(prev => ({ ...prev, [questionId]: val }));
  };

  const handleCheckSpotter = (question: MuscleSpotterQuestion) => {
    const input = spotterInputs[question.id] || '';
    if (!input.trim()) return;

    const isMatch = checkSpotterAnswer(input, question.correctAnswer, question.acceptableAnswers);
    setSpotterChecked(prev => ({ ...prev, [question.id]: true }));
    setSpotterCorrect(prev => ({ ...prev, [question.id]: isMatch }));
  };

  const handleResetSpotter = (questionId: string) => {
    setSpotterInputs(prev => ({ ...prev, [questionId]: '' }));
    setSpotterChecked(prev => ({ ...prev, [questionId]: false }));
    setSpotterCorrect(prev => ({ ...prev, [questionId]: false }));
  };

  // Sync to Firebase Storage & Central Firestore (/questions)
  const handleSyncQuestionToCentralBank = async (
    q: MuscleSpotterQuestion,
    muscle: MuscleLearningUnit
  ) => {
    setIsSyncing(prev => ({ ...prev, [q.id]: true }));
    setSyncStatus(prev => ({ ...prev, [q.id]: 'idle' }));

    try {
      let finalImageUrl = muscle.imageUrl;

      // 1. Try uploading to Firebase Storage if not already external/cloud
      try {
        if (muscle.imageUrl && (muscle.imageUrl.startsWith('/') || muscle.imageUrl.startsWith('data:'))) {
          const response = await fetch(muscle.imageUrl);
          const blob = await response.blob();
          const fileId = `muscle_${muscle.id}_${Date.now()}.jpg`;
          const sRef = storageRef(storage, `questions/${fileId}`);
          const uploadRes = await uploadBytes(sRef, blob);
          finalImageUrl = await getDownloadURL(uploadRes.ref);
        }
      } catch (storageErr) {
        console.warn('Storage upload fallback, keeping image path:', storageErr);
      }

      // 2. Prepare Question Document for central /questions
      const qDocId = `q_anat_muscle_${muscle.id}`;
      const examQ: ExamQuestion = {
        id: qDocId,
        labId: 'anatomy',
        type: 'write_answer',
        questionType: 'write_answer',
        topic: 'Muscles',
        unit: muscle.regionLabelEn,
        lessonTitle: muscle.nameEn,
        difficulty: 'medium',
        language: 'bilingual',
        questionText: q.question,
        questionTextArabic: q.questionAr || `تعرّف على العضلة المحددة بالسهم في العينة (${muscle.nameAr})`,
        imageUrl: finalImageUrl,
        specimenCategory: 'Myology Specimen (OSPE Spotter)',
        magnificationOrView: muscle.regionLabelEn,
        markerLabel: q.pointerLabel || 'Arrow ➔',
        correctAnswer: q.correctAnswer,
        acceptableAnswers: q.acceptableAnswers,
        explanation: q.explanation,
        timeSeconds: 45,
        marks: 1,
        status: 'published',
        submittedAt: new Date().toISOString()
      };

      // 3. Write to Firestore central collection /questions
      await setDoc(doc(db, 'questions', qDocId), examQ, { merge: true });

      // 4. Update local cache for instant zero-latency availability
      const existing = storageService.getExamQuestions();
      const filtered = existing.filter(item => item.id !== qDocId);
      filtered.unshift(examQ);
      try {
        localStorage.setItem('labhub_exam_questions', JSON.stringify(filtered));
      } catch {}

      setSyncStatus(prev => ({ ...prev, [q.id]: 'success' }));
    } catch (err: any) {
      console.error('Error saving muscle question to Firestore /questions:', err);
      setSyncStatus(prev => ({ ...prev, [q.id]: 'error' }));
    } finally {
      // Guaranteed to prevent button freezing
      setIsSyncing(prev => ({ ...prev, [q.id]: false }));
    }
  };

  const handleSyncAllMusclesToBank = async () => {
    setIsSyncingAll(true);
    setSyncAllMsg('جاري رفع الصور ومزامنة جميع أسئلة العضلات إلى البنك المركزي (/questions)...');
    try {
      for (const m of ANATOMY_MUSCLES_SUITE) {
        for (const q of m.questions) {
          await handleSyncQuestionToCentralBank(q, m);
        }
      }
      setSyncAllMsg('تم حفظ ونشر جميع أسئلة العضلات في مجموعة /questions بنجاح!');
      setTimeout(() => setSyncAllMsg(null), 5000);
    } catch (e: any) {
      setSyncAllMsg('حدث خطأ أثناء المزامنة: ' + (e.message || 'فشل الاتصال'));
    } finally {
      setIsSyncingAll(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. TOP BAR HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-teal-400" />
              <span>Anatomy Lab · Myology Learning Units</span>
            </span>
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>MUSCLES OF THE HUMAN BODY (MYOLOGY)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            كل عضلة هي وحدة دراسية مستقلة تتبع السلسلة الأكاديمية: الصورة الطبية الحقيقية / الأطلس التفاعلي ← الموقع ← المنشأ ← الارتكاز ← التعصيب ← الفعل الحركي ← الفيديو ← الاختبار العملي.
          </p>
          {syncAllMsg && (
            <div className="mt-2 text-xs font-bold text-teal-300 bg-teal-950/80 border border-teal-600/50 px-3 py-1.5 rounded-xl inline-flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              <span>{syncAllMsg}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
          <button
            type="button"
            disabled={isSyncingAll}
            onClick={handleSyncAllMusclesToBank}
            className="px-3.5 py-2.5 rounded-xl bg-teal-700/80 hover:bg-teal-600 text-white text-xs font-bold border border-teal-500/50 transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            title="رفع الصور لـ Firebase Storage وحفظ جميع أسئلة العضلات في مجموعة Firestore المركزية (/questions)"
          >
            {isSyncingAll ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>جاري الحفظ في /questions...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5 text-teal-300" />
                <span>حفظ الكل في /questions المركزي</span>
              </>
            )}
          </button>

          {onBackToMain && (
            <button
              type="button"
              onClick={onBackToMain}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
            >
              <span>Back to Anatomy Hub</span>
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          )}
        </div>
      </div>

      {/* 2. REGION SELECTOR PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {regions.map(reg => (
          <button
            key={reg.id}
            type="button"
            onClick={() => {
              setSelectedRegion(reg.id);
              const firstInReg = ANATOMY_MUSCLES_SUITE.find(
                m => reg.id === 'all' || m.region === reg.id
              );
              if (firstInReg) {
                setActiveMuscleId(firstInReg.id);
                setIsPlayingVideo(false);
              }
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              selectedRegion === reg.id
                ? 'bg-teal-600 text-white shadow-md shadow-teal-950/40'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <span>{reg.labelEn}</span>
            <span className="text-[10px] opacity-75">({reg.labelAr})</span>
          </button>
        ))}
      </div>

      {/* 3. MAIN TWO-COLUMN WORKSPACE: DIRECTORY (LEFT) & LEARNING UNIT (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Muscle Directory (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            <span>Muscles in {selectedRegion.replace('_', ' ')}</span>
            <span className="text-teal-400">{filteredMuscles.length} Units</span>
          </div>

          <div className="space-y-2 max-h-[760px] overflow-y-auto pr-1 scrollbar-none">
            {filteredMuscles.map(m => {
              const isSelected = m.id === activeMuscleId;
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setActiveMuscleId(m.id);
                    setIsPlayingVideo(false);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-teal-950/40 border-teal-500/80 shadow-lg ring-1 ring-teal-500/40'
                      : 'bg-slate-900/90 hover:bg-slate-850 border-slate-800'
                  }`}
                >
                  <div className="min-w-0">
                    <h4
                      className={`text-sm font-bold truncate ${
                        isSelected ? 'text-teal-300' : 'text-slate-100'
                      }`}
                    >
                      {m.nameEn}
                    </h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {m.nameAr}
                    </p>
                    <span className="inline-block text-[10px] text-teal-400/90 font-semibold mt-1">
                      {m.regionLabelEn}
                    </span>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-teal-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Independent Muscle Unit (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          {/* VIEW MODE TOGGLE (INTERACTIVE ATLAS CANVAS vs FLASHCARD) */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-2 px-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">Display Mode:</span>
              <span className="text-[11px] text-teal-400 font-semibold">{activeMuscle.nameEn}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode('atlas')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'atlas'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Interactive Atlas (Zoom/Pins)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('card')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'card'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Classic Plate</span>
              </button>
            </div>
          </div>

          {/* 1. VISUAL INSPECTION (Interactive Atlas Canvas OR Classic Image Plate) */}
          {viewMode === 'atlas' && atlasTopic ? (
            <InteractiveAtlasCanvas
              key={atlasTopic.id}
              topic={atlasTopic}
              onOpenVideo={() => setIsPlayingVideo(true)}
              onOpenSpotter={onOpenSpotter}
            />
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-950 overflow-hidden">
                <img
                  src={activeMuscle.imageUrl}
                  alt={activeMuscle.nameEn}
                  className="w-full h-full object-contain object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

                {/* Source badge */}
                <div className="absolute top-4 left-4 z-20">
                  <MedicalImageSourceBadge
                    source={activeMuscle.imageSource}
                    license={activeMuscle.imageLicense}
                    credit={activeMuscle.imageCredit}
                    verified={true}
                  />
                </div>

                <div className="absolute top-4 right-4 z-20">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/90 text-teal-300 border border-teal-500/30 backdrop-blur-md">
                    {activeMuscle.regionLabelEn}
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider mb-0.5">
                    Verified Medical Plate (Gray's Collection)
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {activeMuscle.nameEn}
                  </h3>
                  <p className="text-sm text-slate-300 font-semibold">
                    {activeMuscle.nameAr}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. ACADEMIC DATA CHAIN (LOCATION, ORIGIN, INSERTION, INNERVATION, ACTION) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-400" />
                <span>Anatomical Specifications (المواصفات التشريحية المعتمدة)</span>
              </h3>
              <span className="text-xs text-slate-400 font-semibold">
                Sana'a & OpenStax Standard
              </span>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                  📍 Location (الموقع التشريحي)
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  {activeMuscle.location}
                </p>
                <p className="text-xs text-slate-400 font-normal mt-0.5">
                  {activeMuscle.locationAr}
                </p>
              </div>

              {/* Innervation */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  ⚡ Innervation / Nerve Supply (التعصيب)
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-bold leading-relaxed">
                  {activeMuscle.innervation}
                </p>
                <p className="text-xs text-slate-400 font-normal mt-0.5">
                  {activeMuscle.innervationAr}
                </p>
              </div>

              {/* Origin */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
                  🎯 Origin (المنشأ القريب)
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  {activeMuscle.origin}
                </p>
                <p className="text-xs text-slate-400 font-normal mt-0.5">
                  {activeMuscle.originAr}
                </p>
              </div>

              {/* Insertion */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                  ⚓ Insertion (الارتكاز القاصي)
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  {activeMuscle.insertion}
                </p>
                <p className="text-xs text-slate-400 font-normal mt-0.5">
                  {activeMuscle.insertionAr}
                </p>
              </div>
            </div>

            {/* Action (Highlighted Full Width) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-teal-950/30 border border-teal-500/40 space-y-1.5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-black text-teal-300 uppercase tracking-wider">
                  Anatomical Action & Movement (الوظيفة والحركة الأساسية)
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                {activeMuscle.action}
              </p>
              <p className="text-xs text-slate-300">
                {activeMuscle.actionAr}
              </p>
            </div>

            {/* Clinical Note */}
            {activeMuscle.clinicalNote && (
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-1">
                <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block">
                  🩺 High-Yield Clinical Note (أهمية سريرية للطبيب)
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activeMuscle.clinicalNote}
                </p>
                {activeMuscle.clinicalNoteAr && (
                  <p className="text-xs text-slate-400">
                    {activeMuscle.clinicalNoteAr}
                  </p>
                )}
              </div>
            )}

            {/* 3. 🎥 VIDEO EXPLANATION */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Video className="w-4 h-4 text-rose-400" />
                  <span>🎥 Medical Video Walkthrough ({activeMuscle.nameEn})</span>
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href={getYouTubeWatchUrl(activeMuscle.video.youtubeId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>فتح على YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-xs text-slate-400 font-mono">
                    ⏱ {activeMuscle.video.duration}
                  </span>
                </div>
              </div>

              {!isPlayingVideo ? (
                <div
                  onClick={() => setIsPlayingVideo(true)}
                  className="relative h-44 sm:h-52 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden cursor-pointer group flex flex-col items-center justify-center text-center p-4 hover:border-rose-500/50 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-rose-600/90 group-hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 mb-2">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                    {activeMuscle.video.titleEn}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    {activeMuscle.video.titleAr}
                  </span>
                  <span className="mt-2 text-[10px] px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-700">
                    Click to Play Medical Video Lecture
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-video w-full shadow-2xl">
                    <iframe
                      src={getYouTubeEmbedUrl(activeMuscle.video.youtubeId, { autoplay: true })}
                      title={activeMuscle.video.titleEn}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex items-center justify-between px-1 text-xs">
                    <a
                      href={getYouTubeWatchUrl(activeMuscle.video.youtubeId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>مشاهدة مباشرة على YouTube (إذا واجهت أي تقييد في العرض)</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsPlayingVideo(false)}
                      className="text-slate-400 hover:text-white cursor-pointer px-2 py-1 rounded bg-slate-800"
                    >
                      إغلاق المشغل
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. 📝 OSPE SPOTTER QUESTION TEST (WRITTEN TEXT INPUT ONLY - NO MCQ A/B/C/D) */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span>📝 OSPE Spotter Station (سؤال عملي كتابي - إجابة نصية)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    التعرف على العضلة المحددة بالسهم بالاسم العلمي الإنجليزي وكتابتها في حقل الإدخال للتصحيح التلقائي.
                  </p>
                </div>
                <span className="self-start sm:self-center px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                  Text Input · Auto-Grading
                </span>
              </div>

              <div className="space-y-4">
                {activeMuscle.questions.map((q, qIndex) => {
                  const userVal = spotterInputs[q.id] || '';
                  const isChecked = spotterChecked[q.id];
                  const isCorrect = spotterCorrect[q.id];
                  const syncing = isSyncing[q.id];
                  const synced = syncStatus[q.id] === 'success';

                  return (
                    <div
                      key={q.id}
                      className="p-4 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-inner"
                    >
                      {/* Station Badge & Pointer Callout */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-teal-900/60 text-teal-300 text-xs font-mono font-bold border border-teal-700/50">
                            Station {qIndex + 1}
                          </span>
                          <span className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                            <span>🎯 {q.pointerLabel}</span>
                          </span>
                        </div>

                        {/* Save to Firestore /questions button */}
                        <button
                          type="button"
                          disabled={syncing || synced}
                          onClick={() => handleSyncQuestionToCentralBank(q, activeMuscle)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                            synced
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 cursor-default'
                              : syncing
                              ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/40'
                          }`}
                          title="رفع الصورة لـ Firebase Storage وحفظ السؤال في Firestore المركزي (/questions)"
                        >
                          {syncing ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>جاري الحفظ بالسحابة...</span>
                            </>
                          ) : synced ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>محفوظ في /questions</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-3.5 h-3.5" />
                              <span>حفظ السؤال المركزي (/questions)</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Question Text */}
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                          {q.question}
                        </p>
                        {q.questionAr && (
                          <p className="text-xs text-slate-400">
                            {q.questionAr}
                          </p>
                        )}
                      </div>

                      {/* Interactive Written Text Input */}
                      <div className="space-y-2 pt-1">
                        <label className="block text-[11px] font-bold text-slate-300">
                          اكتب الاسم العلمي الإنجليزي للعضلة (Scientific English Name):
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={userVal}
                            disabled={isChecked}
                            onChange={(e) => handleSpotterInputChange(q.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !isChecked && userVal.trim()) {
                                handleCheckSpotter(q);
                              }
                            }}
                            placeholder="Type scientific English name (e.g. Deltoid, Biceps brachii...)"
                            className={`flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl border font-bold transition-all focus:outline-none focus:ring-2 ${
                              isChecked
                                ? isCorrect
                                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                                  : 'bg-rose-950/40 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-teal-500/30'
                            }`}
                          />

                          {!isChecked ? (
                            <button
                              type="button"
                              onClick={() => handleCheckSpotter(q)}
                              disabled={!userVal.trim()}
                              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                                userVal.trim()
                                  ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg'
                                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              Check Answer
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleResetSpotter(q.id)}
                              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Retry (إعادة)</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Immediate Feedback Card */}
                      {isChecked && (
                        <div
                          className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in duration-200 ${
                            isCorrect
                              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                              : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                <span className="font-black text-sm text-emerald-300">
                                  ✓ إجابة صحيحة ونموذجية!
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                                <span className="font-black text-sm text-rose-300">
                                  ✕ إجابة غير دقيقة!
                                </span>
                              </>
                            )}
                          </div>

                          <div className="space-y-1 pt-1 text-slate-300">
                            <div>
                              <span className="font-bold text-white">الاسم العلمي المعتمد: </span>
                              <span className="font-mono font-bold text-teal-300 text-xs sm:text-sm">
                                {q.correctAnswer}
                              </span>
                            </div>
                            <div>
                              <span className="font-bold text-slate-400">البدائل المقبولة للتصحيح: </span>
                              <span className="text-slate-300 text-[11px]">
                                {q.acceptableAnswers.join(' • ')}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-800 text-slate-300">
                            <span className="font-bold text-teal-400 block mb-0.5">
                              التوضيح التشريحي الأكاديمي:
                            </span>
                            <p className="leading-relaxed">{q.explanation}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
