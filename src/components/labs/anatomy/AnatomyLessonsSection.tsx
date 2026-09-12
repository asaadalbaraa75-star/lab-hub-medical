/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Lessons Section
 * Clean, single-level access for first-year medical students.
 */

import React, { useState } from 'react';
import {
  AnatomyLesson,
  ANATOMY_CORE_LESSONS
} from './AnatomyCurriculumData';
import { MedicalImageSourceBadge } from '../../common/MedicalImageSourceBadge';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';
import {
  BookOpen,
  Compass,
  Bone,
  Layers,
  Activity,
  Heart,
  Brain,
  Wind,
  Utensils,
  Droplets,
  ChevronRight,
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Target,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AnatomyLessonsSectionProps {
  onSelectMuscles?: () => void;
  onBackToMain?: () => void;
}

export const AnatomyLessonsSection: React.FC<AnatomyLessonsSectionProps> = ({
  onSelectMuscles,
  onBackToMain
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLesson, setActiveLesson] = useState<AnatomyLesson | null>(null);
  const [quizSelectedIdx, setQuizSelectedIdx] = useState<number | undefined>(undefined);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  const categories = [
    { id: 'all', labelEn: 'All Lessons', labelAr: 'جميع الدروس' },
    { id: 'basics', labelEn: 'Anatomy Basics', labelAr: 'أساسيات التشريح' },
    { id: 'skeletal', labelEn: 'Skeletal System', labelAr: 'الجهاز الهيكلي' },
    { id: 'joints', labelEn: 'Joints', labelAr: 'المفاصل' },
    { id: 'muscles_special', labelEn: 'Muscles (Dedicated Suite)', labelAr: 'العضلات (القسم المستقل)' },
    { id: 'organ_systems', labelEn: 'Organ Systems', labelAr: 'أجهزة الأعضاء' }
  ];

  const filteredLessons = ANATOMY_CORE_LESSONS.filter(l => {
    if (selectedCategory === 'all') return true;
    return l.category === selectedCategory;
  });

  const handleOpenLesson = (lesson: AnatomyLesson) => {
    setActiveLesson(lesson);
    setQuizSelectedIdx(undefined);
    setQuizSubmitted(false);
    setIsPlayingVideo(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseLesson = () => {
    setActiveLesson(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase tracking-wider">
              Anatomy Lab · Core Lessons
            </span>
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400 shrink-0" />
            <span>ANATOMY LESSONS CURRICULUM</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            دروس تشريحية مباشرة ومنظمة بدون تشتيت: أساسيات التشريح، الجهاز الهيكلي، المفاصل، العضلات، وأجهزة الأعضاء الرئيسية.
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

      {/* DETAIL MODAL / IN-PAGE LESSON VIEW */}
      {activeLesson ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6 animate-in fade-in duration-200 shadow-xl">
          {/* Back button */}
          <button
            type="button"
            onClick={handleCloseLesson}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors border border-slate-700"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Back to All Lessons</span>
          </button>

          {/* Lesson Header */}
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              {activeLesson.categoryLabelEn} · {activeLesson.categoryLabelAr}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {activeLesson.titleEn}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              {activeLesson.titleAr}
            </p>
          </div>

          {/* Image & Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={activeLesson.imageUrl}
                alt={activeLesson.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 z-10">
                <MedicalImageSourceBadge
                  source={activeLesson.imageSource}
                  credit={activeLesson.imageCredit}
                  verified={true}
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                  Core Concept (الفكرة الجوهرية)
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {activeLesson.descriptionEn}
                </p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {activeLesson.descriptionAr}
                </p>
              </div>

              {/* Key Bullet Points */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Key Examination Points (نقاط الفحص الأساسية)
                </h4>
                <div className="space-y-2">
                  {activeLesson.keyPoints.map((pt, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <div>
                        <p>{pt}</p>
                        {activeLesson.keyPointsAr[i] && (
                          <p className="text-xs text-slate-400 mt-0.5">{activeLesson.keyPointsAr[i]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Video Explanation */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Play className="w-4 h-4 text-indigo-400" />
              <span>Watch Video Explanation ({activeLesson.video.titleEn})</span>
            </h4>

            {!isPlayingVideo ? (
              <div
                onClick={() => setIsPlayingVideo(true)}
                className="h-44 sm:h-52 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-4 cursor-pointer hover:border-indigo-500/40 transition-colors group text-center"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-600 group-hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 mb-2">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {activeLesson.video.titleEn}
                </span>
                <span className="text-xs text-slate-400 mt-0.5">
                  {activeLesson.video.titleAr}
                </span>
              </div>
            ) : (
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeLesson.video.youtubeId}?autoplay=1&rel=0`}
                  title={activeLesson.video.titleEn}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Practice Question */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-400" />
              <span>Quick Knowledge Check</span>
            </h4>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <p className="text-xs sm:text-sm font-bold text-slate-200">
                {activeLesson.practiceQuestion.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeLesson.practiceQuestion.options.map((opt, optIdx) => {
                  const isChosen = quizSelectedIdx === optIdx;
                  let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white';

                  if (quizSubmitted) {
                    if (optIdx === activeLesson.practiceQuestion.correctIndex) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isChosen) {
                      style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  } else if (isChosen) {
                    style = 'bg-indigo-950 border-indigo-500 text-indigo-200 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={quizSubmitted}
                      onClick={() => setQuizSelectedIdx(optIdx)}
                      className={`p-3 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && optIdx === activeLesson.practiceQuestion.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between">
                {!quizSubmitted ? (
                  <button
                    type="button"
                    disabled={quizSelectedIdx === undefined}
                    onClick={() => setQuizSubmitted(true)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      quizSelectedIdx !== undefined
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizSelectedIdx(undefined);
                    }}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 font-bold cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Try Again</span>
                  </button>
                )}
              </div>

              {quizSubmitted && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                  quizSelectedIdx === activeLesson.practiceQuestion.correctIndex
                    ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-800/40'
                    : 'bg-rose-950/40 text-rose-200 border border-rose-800/40'
                }`}>
                  <span className="font-bold block mb-1">
                    {quizSelectedIdx === activeLesson.practiceQuestion.correctIndex ? '✓ Correct Answer!' : '✗ Incorrect Answer'}
                  </span>
                  {activeLesson.practiceQuestion.explanation}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* CATEGORY FILTER PILLS & LESSON CARDS GRID */
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (cat.id === 'muscles_special') {
                    if (onSelectMuscles) onSelectMuscles();
                    return;
                  }
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                    : cat.id === 'muscles_special'
                    ? 'bg-teal-950/60 hover:bg-teal-900/80 text-teal-300 border border-teal-700/60'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{cat.labelEn}</span>
                <span className="text-[10px] opacity-75">({cat.labelAr})</span>
              </button>
            ))}
          </div>

          {/* Special Muscles Highlight Banner */}
          {onSelectMuscles && (
            <div 
              onClick={onSelectMuscles}
              className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-900 border border-teal-500/40 cursor-pointer hover:border-teal-400 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group shadow-md"
            >
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-teal-900 text-teal-200 border border-teal-700">
                  NEW DEDICATED SUITE
                </span>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-teal-300 transition-colors">
                  💪 Comprehensive Myology & Muscle Units
                </h3>
                <p className="text-xs text-slate-300 max-w-2xl">
                  استكشف قسم العضلات المعاد بناؤه بالكامل: وحدات مستقلة لكل عضلة (الصورة الحقيقية، المنشأ، الارتكاز، التعصيب، الوظيفة، الفيديوهات، والاختبارات).
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 group-hover:bg-teal-500 text-white text-xs font-bold shrink-0 transition-colors shadow-sm">
                <span>Explore Muscles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLessons.map(lesson => (
              <div
                key={lesson.id}
                onClick={() => handleOpenLesson(lesson)}
                className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Image Header */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-950">
                  <img
                    src={lesson.imageUrl}
                    alt={lesson.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                      {lesson.categoryLabelEn}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3">
                    <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {lesson.titleEn}
                    </h4>
                    <p className="text-xs text-slate-300 truncate">
                      {lesson.titleAr}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {lesson.descriptionEn}
                  </p>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                    <span>Study Lesson</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
