/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Lessons Section
 *
 * Core rule: "IMAGE MUST TEACH"
 * Every important anatomical concept has a corresponding visual image.
 * 1. Title & Category
 * 2. Main Comprehensive Image (Interactive with Zoom/Pan & Hotspot Labels)
 * 3. Core Concept & Key Examination Points
 * 4. Step-by-Step Topics (One Topic -> One Explanatory Image with Hotspots)
 * 5. Important Anatomical Structures (Detailed Dissection Plate)
 * 6. Doctor Explanation Video
 * 7. Quick Knowledge Check
 */

import React, { useState } from 'react';
import {
  AnatomyLesson,
  ANATOMY_CORE_LESSONS
} from './AnatomyCurriculumData';
import { AnatomyInteractiveImageViewer } from './components/AnatomyInteractiveImageViewer';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';
import { getYouTubeEmbedUrl, getYouTubeWatchUrl } from '../../../utils/youtubeUtils';
import {
  BookOpen,
  ChevronRight,
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Target,
  ArrowRight,
  Layers,
  Sparkles,
  HelpCircle,
  Eye,
  Check,
  ExternalLink
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
  const [quizWrittenInput, setQuizWrittenInput] = useState<string>('');
  const [quizIsCorrect, setQuizIsCorrect] = useState<boolean>(false);
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
    setQuizWrittenInput('');
    setQuizIsCorrect(false);
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
              Anatomy Lab · Interactive Curriculum
            </span>
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400 shrink-0" />
            <span>INTERACTIVE ANATOMY LESSONS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            أطلس تشريحي تفاعلي تطبيقي لطلاب الطب: كل مفهوم تشريحي يرافقه صورة طبية موضحة مع تأشيرات تفاعلية وتكبير عالي الدقة.
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-7 space-y-8 animate-in fade-in duration-200 shadow-xl">
          {/* Back button & Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <button
              type="button"
              onClick={handleCloseLesson}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors border border-slate-700"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Back to All Lessons</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-indigo-950/80 text-indigo-300 font-bold border border-indigo-800/60">
                {activeLesson.categoryLabelEn}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 font-medium">{activeLesson.categoryLabelAr}</span>
            </div>
          </div>

          {/* 1. LESSON TITLE HEADER */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {activeLesson.titleEn}
            </h1>
            <p className="text-base sm:text-lg text-indigo-300 font-bold">
              {activeLesson.titleAr}
            </p>
          </div>

          {/* 2. MAIN COMPREHENSIVE IMAGE (WITH INTERACTIVE VIEWER & HOTSPOTS) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  Main Comprehensive Anatomical Plate (الصورة الرئيسية الشاملة للدرس)
                </h3>
              </div>
              <span className="text-[11px] text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-800/50 hidden sm:inline-block">
                Interactive Zoom & Pin Explorer
              </span>
            </div>

            <AnatomyInteractiveImageViewer
              imageUrl={activeLesson.mainImageUrl || activeLesson.imageUrl}
              titleEn={activeLesson.titleEn}
              titleAr={activeLesson.titleAr}
              source={activeLesson.mainImageSource || activeLesson.imageSource}
              credit={activeLesson.mainImageCredit || activeLesson.imageCredit}
              labels={activeLesson.mainImageLabels || []}
              captionEn={activeLesson.mainImageCaptionEn}
              captionAr={activeLesson.mainImageCaptionAr}
              heightClass="h-80 sm:h-[420px]"
            />
          </div>

          {/* 3. CORE CONCEPT & KEY EXAMINATION POINTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Core Concept (الفكرة الجوهرية للدرس)</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {activeLesson.descriptionEn}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2 border-t border-slate-900">
                {activeLesson.descriptionAr}
              </p>
            </div>

            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Key Examination Points (نقاط الفحص والامتحان الأساسية)</span>
              </div>
              <div className="space-y-2.5">
                {activeLesson.keyPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-100">{pt}</p>
                      {activeLesson.keyPointsAr[i] && (
                        <p className="text-xs text-slate-400">{activeLesson.keyPointsAr[i]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. STEP-BY-STEP TOPICS: ONE TOPIC -> ONE EXPLANATORY IMAGE */}
          {activeLesson.topics && activeLesson.topics.length > 0 && (
            <div className="space-y-6 pt-4 border-t border-slate-800">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                  Core Rule: Image Must Teach
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <span>Topic-by-Topic Visual Explanations (شروحات المواضيع المصورة)</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  تصفح كل مفهوم تشريحي مع صورته المخصصة وملاحظاته السريرية.
                </p>
              </div>

              <div className="space-y-8">
                {activeLesson.topics.map((topic, idx) => (
                  <div
                    key={topic.id}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 shadow-sm"
                  >
                    {/* Topic Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-900/80 text-indigo-200 border border-indigo-700/60 text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {topic.titleEn}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-indigo-300 font-medium mt-0.5 mr-8">
                          {topic.titleAr}
                        </p>
                      </div>

                      <span className="text-[10px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 self-start sm:self-center">
                        Verified Plate
                      </span>
                    </div>

                    {/* Short Explanation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-slate-200">
                        <span className="font-bold text-slate-300 block mb-1">Concept Summary:</span>
                        {topic.shortExplanationEn}
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-slate-300">
                        <span className="font-bold text-indigo-300 block mb-1">ملخص المفهوم:</span>
                        {topic.shortExplanationAr}
                      </div>
                    </div>

                    {/* Explanatory Image with Interactive Hotspots & Zoom */}
                    <AnatomyInteractiveImageViewer
                      imageUrl={topic.imageUrl}
                      titleEn={topic.titleEn}
                      titleAr={topic.titleAr}
                      source={topic.imageSource}
                      labels={topic.labels || []}
                      heightClass="h-72 sm:h-96"
                    />

                    {/* Subtopic Key Takeaways */}
                    {topic.keyPoints && topic.keyPoints.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Key Clinical & Anatomical Takeaways:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {topic.keyPoints.map((kp, kIdx) => (
                            <li key={kIdx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                              <span>{kp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. IMPORTANT ANATOMICAL STRUCTURES (DETAILED LABELED PLATE) */}
          {activeLesson.importantStructuresImage && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Important Anatomical Structures (التراكيب التشريحية الدقيقة للفحص)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                لوحة تفصيلية تُظهر التراكيب والأربطة والأوعية التي يتم السؤال عنها في الاختبارات العملية (Spotters).
              </p>

              <AnatomyInteractiveImageViewer
                imageUrl={activeLesson.importantStructuresImage.imageUrl}
                titleEn={activeLesson.importantStructuresImage.titleEn}
                titleAr={activeLesson.importantStructuresImage.titleAr}
                source={activeLesson.importantStructuresImage.imageSource}
                credit={activeLesson.importantStructuresImage.imageCredit}
                labels={activeLesson.importantStructuresImage.labels || []}
                heightClass="h-80 sm:h-[420px]"
              />
            </div>
          )}

          {/* 6. DOCTOR EXPLANATION VIDEO */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Play className="w-4 h-4 text-indigo-400" />
              <span>Doctor Video Explanation ({activeLesson.video.titleEn})</span>
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
                {activeLesson.video.duration && (
                  <span className="text-[10px] text-slate-500 mt-2 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Duration: {activeLesson.video.duration}
                  </span>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-black shadow-xl">
                  <iframe
                    src={getYouTubeEmbedUrl(activeLesson.video.youtubeId, { autoplay: true })}
                    title={activeLesson.video.titleEn}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-center justify-between px-1 text-xs">
                  <a
                    href={getYouTubeWatchUrl(activeLesson.video.youtubeId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>مشاهدة مباشرة على YouTube</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(false)}
                    className="text-slate-400 hover:text-white cursor-pointer px-2 py-0.5 rounded bg-slate-800"
                  >
                    إغلاق المشغل
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 7. QUICK KNOWLEDGE CHECK */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-400" />
              <span>Quick Knowledge Check (سؤال فحص الفهم السريع)</span>
            </h4>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-200">
                  {activeLesson.practiceQuestion.question}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 font-arabic">
                  اكتب إجابتك الطبية الدقيقة (اسم التركيب أو الوظيفة) في الصندوق أدناه:
                </p>
              </div>

              {/* Written Input Box Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!quizWrittenInput.trim() || quizSubmitted) return;
                  const correctTarget = activeLesson.practiceQuestion.options[activeLesson.practiceQuestion.correctIndex] || '';
                  const normUser = quizWrittenInput.trim().toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]/g, '');
                  const normTarget = correctTarget.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]/g, '');
                  const isMatch = normUser === normTarget || (normTarget.length >= 4 && (normUser.includes(normTarget) || normTarget.includes(normUser)));
                  setQuizIsCorrect(isMatch);
                  setQuizSubmitted(true);
                }}
                className="space-y-3"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={quizWrittenInput}
                    onChange={(e) => setQuizWrittenInput(e.target.value)}
                    disabled={quizSubmitted}
                    placeholder="اكتب إجابتك هنا (Type your answer)..."
                    className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition disabled:opacity-75"
                  />
                </div>

                <div className="flex items-center justify-between">
                  {!quizSubmitted ? (
                    <button
                      type="submit"
                      disabled={!quizWrittenInput.trim()}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all cursor-pointer shadow flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>تحقق من الإجابة (Check Answer)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizWrittenInput('');
                        setQuizIsCorrect(false);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 font-bold cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>إعادة المحاولة (Try Again)</span>
                    </button>
                  )}
                </div>
              </form>

              {quizSubmitted && (
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">إجابتك:</span>
                      <span className={quizIsCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {quizWrittenInput || '(فارغ)'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-indigo-500/40">
                      <span className="text-indigo-400 text-[10px] font-bold block">الإجابة النموذجية المعتمدة:</span>
                      <span className="text-white font-bold">
                        {activeLesson.practiceQuestion.options[activeLesson.practiceQuestion.correctIndex]}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg text-xs leading-relaxed ${
                      quizIsCorrect
                        ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-800/40'
                        : 'bg-rose-950/40 text-rose-200 border border-rose-800/40'
                    }`}
                  >
                    <span className="font-bold flex items-center gap-1.5 mb-1">
                      {quizIsCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>إجابة صحيحة (Correct)!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>إجابة غير دقيقة (Review Model Answer)</span>
                        </>
                      )}
                    </span>
                    {activeLesson.practiceQuestion.explanation}
                  </div>
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
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={lesson.mainImageUrl || lesson.imageUrl}
                    alt={lesson.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                      {lesson.categoryLabelEn}
                    </span>
                    {lesson.topics && lesson.topics.length > 0 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-950/90 text-teal-300 border border-teal-600/40 backdrop-blur-md">
                        {lesson.topics.length} Visual Topics
                      </span>
                    )}
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
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Explore Atlas Lesson</span>
                    </span>
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
