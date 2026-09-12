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
  ANATOMY_MUSCLES_SUITE
} from './AnatomyCurriculumData';
import { INTERACTIVE_ATLAS_TOPICS } from './atlas/AnatomyInteractiveAtlasData';
import { InteractiveAtlasCanvas } from './atlas/InteractiveAtlasCanvas';
import { MedicalImageSourceBadge } from '../../common/MedicalImageSourceBadge';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';
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
  Compass
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

export const AnatomyMusclesSection: React.FC<AnatomyMusclesSectionProps> = ({
  onBackToMain,
  onOpenSpotter,
  initialMuscleId
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeMuscleId, setActiveMuscleId] = useState<string>(
    initialMuscleId || ANATOMY_MUSCLES_SUITE[0].id
  );
  const [viewMode, setViewMode] = useState<'atlas' | 'card'>('atlas');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

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

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted[questionId]) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuestion = (questionId: string) => {
    if (quizAnswers[questionId] === undefined) return;
    setQuizSubmitted(prev => ({ ...prev, [questionId]: true }));
  };

  const handleResetQuestion = (questionId: string) => {
    setQuizAnswers(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setQuizSubmitted(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
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
        </div>

        {onBackToMain && (
          <button
            type="button"
            onClick={onBackToMain}
            className="self-start md:self-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
          >
            <span>Back to Anatomy Hub</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
          </button>
        )}
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
                  <span>🎥 Video Explanation ({activeMuscle.nameEn})</span>
                </h4>
                <span className="text-xs text-slate-400 font-mono">
                  Duration: {activeMuscle.video.duration}
                </span>
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
                    Click to Play Pre-Selected Medical Lecture
                  </span>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-video w-full">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeMuscle.video.youtubeId}?autoplay=1&rel=0`}
                    title={activeMuscle.video.titleEn}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {/* 4. 📝 SPOTTER QUESTION TEST */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span>📝 Practice Spotter Questions ({activeMuscle.questions.length})</span>
                </h4>
                <span className="text-xs text-emerald-400 font-semibold">
                  Instant Feedback
                </span>
              </div>

              <div className="space-y-4">
                {activeMuscle.questions.map((q, qIndex) => {
                  const selectedIdx = quizAnswers[q.id];
                  const isSubmitted = quizSubmitted[q.id];
                  const isCorrect = selectedIdx === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                          Q{qIndex + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-white">
                          {q.question}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedIdx === optIdx;
                          let btnStyle =
                            'bg-slate-900/90 hover:bg-slate-850 text-slate-200 border-slate-800';

                          if (isSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle =
                                'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold';
                            } else if (isOptionSelected) {
                              btnStyle =
                                'bg-rose-950/60 border-rose-500 text-rose-300 line-through';
                            } else {
                              btnStyle = 'bg-slate-900/40 text-slate-500 border-slate-900';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-teal-950 border-teal-500 text-teal-300 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              disabled={isSubmitted}
                              className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isSubmitted && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                              {isSubmitted && isOptionSelected && optIdx !== q.correctIndex && (
                                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Question Actions */}
                      <div className="pt-2 flex items-center justify-between">
                        {!isSubmitted ? (
                          <button
                            type="button"
                            onClick={() => handleSubmitQuestion(q.id)}
                            disabled={selectedIdx === undefined}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              selectedIdx !== undefined
                                ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-md'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            Check Answer
                          </button>
                        ) : (
                          <div className="flex items-center gap-3 w-full justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-bold">
                              {isCorrect ? (
                                <span className="text-emerald-400 flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Correct Answer!</span>
                                </span>
                              ) : (
                                <span className="text-rose-400 flex items-center gap-1">
                                  <XCircle className="w-4 h-4" />
                                  <span>Incorrect, review explanation below</span>
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleResetQuestion(q.id)}
                              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Retry</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Explanation box */}
                      {isSubmitted && (
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 animate-in fade-in duration-200">
                          <span className="font-bold text-teal-400 block">Explanation:</span>
                          <p>{q.explanation}</p>
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
