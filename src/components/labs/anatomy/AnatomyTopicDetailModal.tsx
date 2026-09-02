import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Target,
  Sparkles,
  ShieldAlert,
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
  Eye,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  Stethoscope,
  Lightbulb,
  AlertTriangle,
  FileQuestion,
  GraduationCap,
  ListOrdered,
  ChevronRight,
  Youtube
} from 'lucide-react';
import { AnatomyTopic } from './AnatomyData';
import { AnatomyDiagramViewer } from './AnatomyDiagramViewer';
import { AnatomyTopicVideoSection } from './AnatomyTopicVideoSection';

interface AnatomyTopicDetailModalProps {
  topic: AnatomyTopic | null;
  isOpen: boolean;
  onClose: () => void;
  onStartExam?: () => void;
  onOpenPracticeQuiz?: () => void;
  onOpenPracticalExam?: () => void;
}

export const AnatomyTopicDetailModal: React.FC<AnatomyTopicDetailModalProps> = ({
  topic,
  isOpen,
  onClose,
  onStartExam,
  onOpenPracticeQuiz,
  onOpenPracticalExam
}) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'spotter' | 'lecture' | 'mistakes' | 'exam' | 'terms'>('learn');
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'CORE' | 'HIGH_YIELD' | 'EXTRA'>('ALL');
  const [selectedQuestionAnswers, setSelectedQuestionAnswers] = useState<Record<string, string>>({});
  const [revealedQuestionExplanations, setRevealedQuestionExplanations] = useState<Record<string, boolean>>({});

  if (!isOpen || !topic) return null;

  const iconComponents: Record<string, any> = {
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
    BookOpen
  };

  const IconComponent = iconComponents[topic.iconName] || Bone;

  const handleSelectAnswer = (questionId: string, option: string) => {
    setSelectedQuestionAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
    setRevealedQuestionExplanations(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      id="anatomy-topic-modal"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white"
        onClick={e => e.stopPropagation()}
      >

        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 border-b border-indigo-800/40 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-md">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-[11px] font-bold">
                    المحاضرة #{topic.topicNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                    مستوى طلاب السنة الأولى
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {topic.titleAr}
                </h2>
                <p className="text-sm font-semibold text-indigo-300 font-mono">
                  {topic.titleEn}
                </p>
              </div>
            </div>

            {onStartExam && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartExam();
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer self-stretch sm:self-center"
              >
                <Sparkles className="w-4 h-4" />
                <span>بدء الاختبار العملي (OSPE)</span>
              </button>
            )}
          </div>

          {/* Quick Idea & High-Yield Summary Banner */}
          <div className="mt-4 p-3 rounded-xl bg-indigo-900/40 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-indigo-200">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>الفكرة السريعة: </strong>{topic.quickIdeaAr}</span>
            </div>
            <div className="font-mono text-[11px] text-amber-300 font-bold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30 shrink-0">
              {topic.highYieldSummary}
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-1 overflow-x-auto bg-slate-100 p-1.5 border-b border-slate-200 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => setActiveTab('learn')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'learn'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. الشرح المتدرج (Simple → Deep)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('spotter')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'spotter'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>2. التحديد التفاعلي (Spotter)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lecture')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'lecture'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            <Youtube className="w-4 h-4" />
            <span>3. المحاضرة المطابقة (Micro-Lecture)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mistakes')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'mistakes'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>4. أخطاء شائعة ومفارقات</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('exam')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'exam'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileQuestion className="w-4 h-4 text-emerald-600" />
            <span>5. أسئلة تدريبية ومراجعة</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'terms'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>6. المصطلحات الطبية</span>
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          
          {/* TAB 1: SIMPLE -> DEEP PEDAGOGICAL CARDS */}
          {activeTab === 'learn' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Micro-Learning Flow Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. What is it? (ما هو؟) */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-2 hover:border-indigo-300 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">1</span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">ما هو؟ (What is it?)</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {topic.whatIsIt.ar}
                  </p>
                  <p className="text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {topic.whatIsIt.en}
                  </p>
                </div>

                {/* 2. Where is it? (أين يقع؟) */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-2 hover:border-teal-300 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center">2</span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">أين يقع؟ (Where is it?)</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {topic.whereIsIt.ar}
                  </p>
                  <p className="text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {topic.whereIsIt.en}
                  </p>
                </div>

                {/* 3. What does it do? (ما هي وظيفته؟) */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-2 hover:border-emerald-300 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">3</span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">ما هي وظيفته؟ (What does it do?)</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {topic.whatDoesItDo.ar}
                  </p>
                  <p className="text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {topic.whatDoesItDo.en}
                  </p>
                </div>

                {/* 4. Why is it important? (لماذا هو مهم؟) */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-2 hover:border-amber-300 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">4</span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">لماذا هو مهم؟ (Why is it important?)</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {topic.whyImportant.ar}
                  </p>
                  <p className="text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {topic.whyImportant.en}
                  </p>
                </div>

                {/* 5. How can I recognize it? (كيف أتعرف عليه؟) */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-2 hover:border-sky-300 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center">5</span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">كيف أتعرف عليه؟ (How to recognize?)</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {topic.howToRecognize.ar}
                  </p>
                  <p className="text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {topic.howToRecognize.en}
                  </p>
                </div>

                {/* 6. How can it appear in an exam? (كيف يأتي في الامتحان؟) */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-2 hover:border-purple-300 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">6</span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">كيف يأتي في الامتحان؟ (Exam Pattern)</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {topic.howAppearsInExam.ar}
                  </p>
                  <p className="text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {topic.howAppearsInExam.en}
                  </p>
                </div>
              </div>

              {/* THREE DIFFICULTY TIERS */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      تقسيم المعلومات حسب الأهمية (Difficulty Levels)
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setLevelFilter('ALL')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        levelFilter === 'ALL' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      الكل
                    </button>
                    <button
                      type="button"
                      onClick={() => setLevelFilter('CORE')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        levelFilter === 'CORE' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      🟢 الأساسيات (Core)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLevelFilter('HIGH_YIELD')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        levelFilter === 'HIGH_YIELD' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      🟡 مهم للامتحان
                    </button>
                    <button
                      type="button"
                      onClick={() => setLevelFilter('EXTRA')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        levelFilter === 'EXTRA' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      🔵 إضافي
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* CORE POINTS */}
                  {(levelFilter === 'ALL' || levelFilter === 'CORE') && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        الأساسيات المطلوبة من كل طالب سنة أولى (CORE POINTS - MUST KNOW)
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {topic.corePoints.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs sm:text-sm text-slate-800 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* HIGH YIELD EXAM POINTS */}
                  {(levelFilter === 'ALL' || levelFilter === 'HIGH_YIELD') && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        نقاط عالية الأهمية للامتحان (HIGH-YIELD EXAM PEARLS)
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {topic.highYieldExamPoints.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-slate-900 font-semibold">
                            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EXTRA INFO */}
                  {(levelFilter === 'ALL' || levelFilter === 'EXTRA') && topic.extraInfo.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-black text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        معلومات إضافية للتوسع والتميز (EXTRA HIGH-SCORING INFO)
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {topic.extraInfo.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs sm:text-sm text-slate-700 font-medium">
                            <div className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">i</div>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CLINICAL NOTE CARD */}
              <div className="bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-5 flex items-start gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-rose-900 text-sm sm:text-base">
                    الملاحظة السريرية (Clinical Connection)
                  </h4>
                  <p className="text-xs sm:text-sm text-rose-800 leading-relaxed font-medium">
                    {topic.clinicalNote}
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE SPOTTER & DIAGRAM */}
          {activeTab === 'spotter' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <AnatomyDiagramViewer topic={topic} />
            </div>
          )}

          {/* TAB 3: COMMON MISTAKES & MNEMONICS */}
          {activeTab === 'mistakes' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Common Mistakes Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    أخطاء شائعة يقع فيها طلاب السنة الأولى (Common Pitfalls)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topic.commonMistakes.map((m, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-2">
                        {m.titleAr} <span className="text-xs text-slate-500 font-mono block sm:inline">({m.titleEn})</span>
                      </h4>

                      {/* Wrong Concept */}
                      <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-0.5">
                        <span className="font-black text-rose-700 block">✗ الفهم الخاطئ الشائع:</span>
                        <p>{m.wrongConcept}</p>
                      </div>

                      {/* Correct Concept */}
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-0.5">
                        <span className="font-black text-emerald-700 block">✓ الصواب الطبي الدقيق:</span>
                        <p>{m.correctConcept}</p>
                      </div>

                      <p className="text-[11px] text-slate-500 leading-snug pt-1">
                        <strong>التفسير: </strong>{m.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Aids & Mnemonics */}
              {topic.memoryAids.length > 0 && (
                <div className="bg-indigo-950 text-white rounded-2xl p-5 border border-indigo-800 space-y-4 shadow-md">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">
                      وسائل التذكر السريعة (Mnemonics & Memory Aids)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {topic.memoryAids.map((aid, idx) => (
                      <div key={idx} className="bg-slate-900/90 p-3.5 rounded-xl border border-indigo-800/60 space-y-1.5">
                        <div className="text-xs font-mono font-black text-amber-300">
                          {aid.phraseEn}
                        </div>
                        <div className="text-xs font-bold text-indigo-200">
                          {aid.meaningAr}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {aid.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TOPIC-MATCHED MICRO-LECTURE (YOUTUBE & MEDICAL LECTURERS) */}
          {activeTab === 'lecture' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <AnatomyTopicVideoSection topic={topic} />
            </div>
          )}

          {/* TAB 4: PRACTICE QUESTIONS & QUICK REVIEW */}
          {activeTab === 'exam' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Quick Review List (5-7 Points) */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    ما يجب أن تتذكره من هذا الموضوع (Essential Takeaways)
                  </h3>
                </div>

                <div className="space-y-2">
                  {topic.quickReviewPoints.map((pt, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Practice Questions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileQuestion className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-base font-bold text-slate-900">
                      أسئلة تدريبية فورية مع الشرح (Practice Questions)
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {topic.practiceQuestions.length} أسئلة
                  </span>
                </div>

                <div className="space-y-4">
                  {topic.practiceQuestions.map((q, idx) => {
                    const chosen = selectedQuestionAnswers[q.id];
                    const isRevealed = revealedQuestionExplanations[q.id];
                    const isCorrect = chosen === q.correctAnswer;

                    return (
                      <div key={q.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-bold text-indigo-600 uppercase">سؤال #{idx + 1}</span>
                            <h4 className="font-bold text-sm sm:text-base text-slate-900">
                              {q.questionAr}
                            </h4>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">
                              {q.questionEn}
                            </p>
                          </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt, optIdx) => {
                            let btnStyle = 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-800';

                            if (isRevealed) {
                              if (opt === q.correctAnswer) {
                                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-400/40';
                              } else if (chosen === opt) {
                                btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                              } else {
                                btnStyle = 'bg-slate-50 opacity-60 border-slate-200 text-slate-600';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => handleSelectAnswer(q.id, opt)}
                                className={`p-3 rounded-xl border text-xs sm:text-sm text-right transition-all font-medium flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isRevealed && opt === q.correctAnswer && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation Box */}
                        {isRevealed && (
                          <div className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1.5 animate-in fade-in duration-200 ${
                            isCorrect ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-slate-100 border-slate-300 text-slate-900'
                          }`}>
                            <div className="font-bold flex items-center gap-1.5">
                              <span>{isCorrect ? '✓ أحسنت! إجابة صحيحة' : '✗ إجابة غير صحيحة - الإجابة الصحيحة هي: ' + q.correctAnswer}</span>
                            </div>
                            <p>{q.explanationAr}</p>
                            <p className="text-[11px] text-slate-500 font-mono">{q.explanationEn}</p>
                            <div className="text-[11px] text-amber-800 font-bold pt-1 border-t border-slate-200">
                              هدف السؤال للامتحان: {q.examFocus}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KEY TERMINOLOGY */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    قاموس المصطلحات التشريحية المعتمدة (Anatomical Vocabulary)
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  المصطلحات القياسية المعتمدة عالمياً باللغتين الإنجليزية واللاتينية مع الشرح العربي وأمثلة الاستخدام:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {topic.keyTerms.map((term, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-1 hover:bg-white hover:border-indigo-200 transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono font-black text-indigo-900 text-sm">
                          {term.term}
                        </span>
                        <span className="text-xs font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                          {term.meaningAr}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">
                        {term.definitionEn}
                      </p>
                      <div className="text-[11px] text-slate-500 pt-1 font-medium">
                        <strong>مثال: </strong>{term.example}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM FOOTER */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-600 font-medium">
            محتوى مخصص ومصمم وفق المنهج التعليمي لطلاب السنة الأولى في كليات الطب البشري.
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
