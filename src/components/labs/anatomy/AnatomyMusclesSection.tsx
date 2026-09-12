/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Muscles Section — Independent Learning Units
 * 
 * THE CORE ACADEMIC CHAIN:
 * MUSCLE -> CORRECT IMAGE -> LOCATION -> ORIGIN -> INSERTION -> INNERVATION -> ACTION -> VIDEO -> TEST
 */

import React, { useState } from 'react';
import {
  MuscleLearningUnit,
  ANATOMY_MUSCLES_SUITE
} from './AnatomyCurriculumData';
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
  Layers
} from 'lucide-react';

interface AnatomyMusclesSectionProps {
  onBackToMain?: () => void;
  initialMuscleId?: string;
}

export const AnatomyMusclesSection: React.FC<AnatomyMusclesSectionProps> = ({
  onBackToMain,
  initialMuscleId
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeMuscleId, setActiveMuscleId] = useState<string>(initialMuscleId || ANATOMY_MUSCLES_SUITE[0].id);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

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

  const activeMuscle = ANATOMY_MUSCLES_SUITE.find(m => m.id === activeMuscleId) || ANATOMY_MUSCLES_SUITE[0];

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
    <div className="space-y-6 pb-12">
      {/* Top Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800 uppercase tracking-wider">
              Anatomy Lab · Myology Units
            </span>
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-teal-400 shrink-0" />
            <span>MUSCLES OF THE HUMAN BODY (MYOLOGY)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            كل عضلة هي وحدة تعليمية مستقلة تجمع: الصورة الطبية الحقيقية، المنشأ، الارتكاز، التعصيب، الفعل الوظيفي، الشرح المرئي، والاختبار العملي.
          </p>
        </div>

        {onBackToMain && (
          <button
            type="button"
            onClick={onBackToMain}
            className="self-start md:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Back to Anatomy Hub</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
          </button>
        )}
      </div>

      {/* Region Selector Pills (Mobile Friendly) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {regions.map(reg => (
          <button
            key={reg.id}
            type="button"
            onClick={() => {
              setSelectedRegion(reg.id);
              const firstInReg = ANATOMY_MUSCLES_SUITE.find(m => reg.id === 'all' || m.region === reg.id);
              if (firstInReg) setActiveMuscleId(firstInReg.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              selectedRegion === reg.id
                ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <span>{reg.labelEn}</span>
            <span className="text-[10px] opacity-75">({reg.labelAr})</span>
          </button>
        ))}
      </div>

      {/* Main Two-Column Layout: Left List / Right Independent Learning Unit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Muscle Directory (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Available Muscles ({filteredMuscles.length})
          </div>

          <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
            {filteredMuscles.map(m => {
              const isSelected = m.id === activeMuscleId;
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setActiveMuscleId(m.id);
                    setIsPlayingVideo(false);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-teal-950/40 border-teal-500/60 shadow-md ring-1 ring-teal-500/30'
                      : 'bg-slate-900/90 hover:bg-slate-800/80 border-slate-800'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-teal-300' : 'text-slate-100'}`}>
                        {m.nameEn}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {m.nameAr}
                    </p>
                    <span className="inline-block text-[10px] text-teal-400/80 font-medium mt-1">
                      {m.regionLabelEn}
                    </span>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-teal-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Complete Independent Muscle Learning Unit (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            {/* Real Scientific Image Container */}
            <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-950 overflow-hidden">
              <img
                src={activeMuscle.imageUrl}
                alt={activeMuscle.nameEn}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Verified Source Badge in top corner */}
              <div className="absolute top-4 left-4 z-20">
                <MedicalImageSourceBadge
                  source={activeMuscle.imageSource}
                  license={activeMuscle.imageLicense}
                  credit={activeMuscle.imageCredit}
                  verified={true}
                />
              </div>

              {/* Region Tag in top right */}
              <div className="absolute top-4 right-4 z-20">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/90 text-teal-300 border border-teal-500/30 backdrop-blur-md">
                  {activeMuscle.regionLabelEn}
                </span>
              </div>

              {/* Floating Muscle Title over image bottom */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
                  Primary Scientific Anatomy Unit
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {activeMuscle.nameEn}
                </h3>
                <p className="text-sm text-slate-300 font-medium">
                  {activeMuscle.nameAr}
                </p>
              </div>
            </div>

            {/* Core Anatomical Data Chain (Origin, Insertion, Innervation, Action) */}
            <div className="p-5 sm:p-7 space-y-6 bg-slate-900/95">
              {/* Grid of Key Properties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
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
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
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
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
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
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
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
              <div className="p-4 sm:p-5 rounded-xl bg-teal-950/30 border border-teal-500/40 space-y-1.5">
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
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-1">
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

              {/* 🎥 WATCH EXPLANATION SECTION */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-400" />
                    <span>🎥 Watch Video Explanation ({activeMuscle.nameEn})</span>
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">
                    Duration: {activeMuscle.video.duration}
                  </span>
                </div>

                {!isPlayingVideo ? (
                  <div 
                    onClick={() => setIsPlayingVideo(true)}
                    className="relative h-44 sm:h-56 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden cursor-pointer group flex flex-col items-center justify-center text-center p-4 hover:border-rose-500/50 transition-colors"
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
                    <span className="mt-2 text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      Click to Play Pre-Selected Medical Lecture
                    </span>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-black aspect-video w-full">
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

              {/* 📝 TEST YOURSELF SECTION */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-teal-400" />
                    <span>📝 Test Yourself on {activeMuscle.nameEn}</span>
                  </h4>
                  <span className="text-[11px] text-teal-400 font-semibold">
                    {activeMuscle.questions.length} Targeted Questions
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
                        className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                      >
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-teal-950 text-teal-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-teal-800">
                            {qIndex + 1}
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-slate-200">
                            {q.question}
                          </p>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-2 pt-1">
                          {q.options.map((option, optIdx) => {
                            const isChosen = selectedIdx === optIdx;
                            let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white';

                            if (isSubmitted) {
                              if (optIdx === q.correctIndex) {
                                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                              } else if (isChosen && !isCorrect) {
                                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                              }
                            } else if (isChosen) {
                              btnStyle = 'bg-teal-950 border-teal-500 text-teal-200 font-semibold';
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => handleSelectOption(q.id, optIdx)}
                                className={`p-3 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                              >
                                <span>{option}</span>
                                {isSubmitted && optIdx === q.correctIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                )}
                                {isSubmitted && isChosen && !isCorrect && (
                                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Submit / Retake button */}
                        <div className="flex items-center justify-between pt-2">
                          {!isSubmitted ? (
                            <button
                              type="button"
                              disabled={selectedIdx === undefined}
                              onClick={() => handleSubmitQuestion(q.id)}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                selectedIdx !== undefined
                                  ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-sm'
                                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              Check Answer
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleResetQuestion(q.id)}
                              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 font-bold transition-colors cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Try Again</span>
                            </button>
                          )}
                        </div>

                        {/* Explanation after submission */}
                        {isSubmitted && (
                          <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                            isCorrect ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-800/40' : 'bg-rose-950/40 text-rose-200 border border-rose-800/40'
                          }`}>
                            <span className="font-bold block mb-1">
                              {isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Answer'}
                            </span>
                            {q.explanation}
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
    </div>
  );
};
