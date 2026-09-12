/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Lab View
 * 
 * CORE DESIGN PRINCIPLE:
 * "Student should never need to figure out how the platform works."
 * 
 * MAIN ANATOMY PAGE:
 * ANATOMY LAB
 * 4 Primary Big Cards:
 * 1. 📚 LESSONS
 * 2. 🖼️ IMAGES
 * 3. 🎥 VIDEOS
 * 4. 📝 TESTS
 */

import React, { useState } from 'react';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';
import { AnatomyLessonsSection } from './AnatomyLessonsSection';
import { AnatomyMusclesSection } from './AnatomyMusclesSection';
import { AnatomyImagesSection } from './AnatomyImagesSection';
import { AnatomyVideosSection } from './AnatomyVideosSection';
import { AnatomyTestsSection } from './AnatomyTestsSection';
import {
  BookOpen,
  Image as ImageIcon,
  Compass,
  Video,
  Target,
  ArrowRight,
  Sparkles,
  Activity,
  ShieldCheck
} from 'lucide-react';

interface AnatomyLabViewProps {
  searchQuery?: string;
  onOpenExam?: () => void;
  onOpenSpotter?: () => void;
  onOpenQuiz?: () => void;
}

type AnatomyTab = 'main' | 'lessons' | 'muscles' | 'images' | 'videos' | 'tests';

export const AnatomyLabView: React.FC<AnatomyLabViewProps> = () => {
  const [activeTab, setActiveTab] = useState<AnatomyTab>('main');

  // If in a sub-view, render that section with simple back navigation
  if (activeTab === 'lessons') {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        <AnatomyLessonsSection
          onSelectMuscles={() => setActiveTab('muscles')}
          onBackToMain={() => setActiveTab('main')}
        />
      </div>
    );
  }

  if (activeTab === 'muscles') {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        <AnatomyMusclesSection
          onBackToMain={() => setActiveTab('main')}
          onOpenSpotter={() => setActiveTab('tests')}
        />
      </div>
    );
  }

  if (activeTab === 'images') {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        <AnatomyImagesSection
          onBackToMain={() => setActiveTab('main')}
          onOpenSpotter={() => setActiveTab('tests')}
        />
      </div>
    );
  }

  if (activeTab === 'videos') {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        <AnatomyVideosSection
          onBackToMain={() => setActiveTab('main')}
        />
      </div>
    );
  }

  if (activeTab === 'tests') {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        <AnatomyTestsSection
          onBackToMain={() => setActiveTab('main')}
        />
      </div>
    );
  }

  // =========================================================================
  // MAIN ANATOMY PAGE — 4 BIG CLEAN BUTTONS / CARDS
  // =========================================================================
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-in fade-in duration-200">
      {/* Main Title & Brand Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-teal-300">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>Verified Medical Human Anatomy</span>
          <span className="text-slate-600">·</span>
          <OwnershipWatermark variant="minimal" showIcon={false} className="text-[11px] text-slate-400" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          ANATOMY LAB
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-medium">
          مختبر التشريح البشري لطلاب الطب — دراسة مباشرة قائمة على الصور الطبية الحقيقية والشروحات الموثوقة.
        </p>
      </div>

      {/* 4 PRIMARY BIG CARDS (LESSONS, IMAGES, VIDEOS, TESTS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-2">
        {/* CARD 1: 📚 LESSONS */}
        <div
          onClick={() => setActiveTab('lessons')}
          className="bg-slate-900/90 hover:bg-slate-850 border-2 border-slate-800 hover:border-indigo-500 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-indigo-950/40 hover:-translate-y-1 flex flex-col justify-between group min-h-[220px]"
        >
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md">
              <BookOpen className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-indigo-300 transition-colors">
                📚 LESSONS
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                أساسيات التشريح، المستويات والمصطلحات، عظام الهيكل العظمي، المفاصل، وأجهزة الأعضاء مع مفاهيم الفحص السريري.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
            <span>ابدأ الدروس التشريحية</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* CARD 2: 🗺️ INTERACTIVE ATLAS */}
        <div
          onClick={() => setActiveTab('images')}
          className="bg-slate-900/90 hover:bg-slate-850 border-2 border-slate-800 hover:border-amber-500 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-amber-950/40 hover:-translate-y-1 flex flex-col justify-between group min-h-[220px]"
        >
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-md">
              <Compass className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                  Interactive Zoom & Pins
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                🗺️ INTERACTIVE ATLAS
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                أطلس تشريحي تفاعلي: تكبير وتصغير وتحريك للصور، ونقاط تفاعلية على التراكيب للتعرف على أسمائها ووظائفها بدقة دون أي تعقيد.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
            <span>تصفح أطلس التشريح التفاعلي</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* CARD 3: 🎥 VIDEOS */}
        <div
          onClick={() => setActiveTab('videos')}
          className="bg-slate-900/90 hover:bg-slate-850 border-2 border-slate-800 hover:border-rose-500 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-rose-950/40 hover:-translate-y-1 flex flex-col justify-between group min-h-[220px]"
        >
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-md">
              <Video className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-rose-300 transition-colors">
                🎥 VIDEOS
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                شروحات مرئية طبية منتقاة بعناية (Arabic & English) لكل درس تشريحي دون حشو أو فيديوهات غير ملائمة.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-rose-400 group-hover:text-rose-300">
            <span>شاهد الشروحات المرئية</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* CARD 4: 📝 TESTS */}
        <div
          onClick={() => setActiveTab('tests')}
          className="bg-slate-900/90 hover:bg-slate-850 border-2 border-slate-800 hover:border-emerald-500 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-emerald-950/40 hover:-translate-y-1 flex flex-col justify-between group min-h-[220px]"
        >
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-md">
              <Target className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                📝 TESTS
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                الامتحان العملي (Spotter Exam): أسئلة مرتبطة بصور حقيقية محددة، خيارات تفاعلية، تصحيح فوري وشرح مبسّط.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
            <span>ابدأ الامتحان العملي</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* DEDICATED MYOLOGY / MUSCLES SUITE BANNER */}
      <div
        onClick={() => setActiveTab('muscles')}
        className="bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-900 border-2 border-teal-500/40 hover:border-teal-400 rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-200 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-900/80 text-teal-300 border border-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-900 text-teal-300 border border-teal-700">
                REBUILT SECTION
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-teal-300 transition-colors">
                💪 MUSCLES OF THE HUMAN BODY
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              وحدات تعليمية مستقلة لكل عضلة: الصورة الحقيقية، الموقع، المنشأ، الارتكاز، التعصيب، الوظيفة، الفيديوهات، والاختبار العملي.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="self-end sm:self-center px-5 py-2.5 rounded-xl bg-teal-600 group-hover:bg-teal-500 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-2 shadow-md"
        >
          <span>Open Muscles Lab</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bottom Subtle Footer Attribution */}
      <div className="text-center pt-4">
        <OwnershipWatermark variant="badge" className="mx-auto text-xs" />
      </div>
    </div>
  );
};
