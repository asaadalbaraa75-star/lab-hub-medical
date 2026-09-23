/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Videos Section
 * Highly curated medical explanations (Arabic and English), directly topic-aligned.
 */

import React, { useState } from 'react';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';
import {
  Video,
  Play,
  ChevronRight,
  Globe,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface AnatomyVideosSectionProps {
  onBackToMain?: () => void;
}

interface AnatomyCuratedVideo {
  id: string;
  topic: string;
  topicAr: string;
  title: string;
  titleAr: string;
  instructor: string;
  language: 'Arabic' | 'English';
  duration: string;
  youtubeId: string;
  category: 'basics' | 'muscles' | 'bones' | 'organs';
}

const CURATED_ANATOMY_VIDEOS: AnatomyCuratedVideo[] = [
  // 1. BASICS
  {
    id: 'vid_planes_ar',
    topic: 'Anatomical Planes & Directions',
    topicAr: 'المستويات والمصطلحات التشريحية',
    title: 'Anatomical Planes and Axes Simplified',
    titleAr: 'شرح المستويات والمحاور التشريحية بالعربي لطالب طب سنة أولى',
    instructor: 'Dr. Anatomy Medical Lectures',
    language: 'Arabic',
    duration: '06:15',
    youtubeId: '2k8B87G_n4Y',
    category: 'basics'
  },
  {
    id: 'vid_planes_en',
    topic: 'Anatomical Planes & Directions',
    topicAr: 'المستويات والمصطلحات التشريحية',
    title: 'Anatomical Directional Terms & Body Planes',
    titleAr: 'المصطلحات التشريحية باللغة الإنجليزية',
    instructor: 'Kenhub Medical Academy',
    language: 'English',
    duration: '07:30',
    youtubeId: 'b_7i0E4wH0I',
    category: 'basics'
  },

  // 2. MUSCLES
  {
    id: 'vid_muscles_arm_ar',
    topic: 'Arm Muscles (Biceps & Triceps)',
    topicAr: 'عضلات الذراع (البايسبس والترايسبس)',
    title: 'Anterior & Posterior Arm Muscles Explained',
    titleAr: 'تشريح عضلات الذراع والتعصيب ووظيفة البايسبس والترايسبس',
    instructor: 'Clinical Anatomy Simplified',
    language: 'Arabic',
    duration: '08:45',
    youtubeId: 'F2o_jH1bF9c',
    category: 'muscles'
  },
  {
    id: 'vid_muscles_arm_en',
    topic: 'Arm Muscles (Biceps & Triceps)',
    topicAr: 'عضلات الذراع (البايسبس والترايسبس)',
    title: 'Biceps Brachii & Triceps Brachii Actions',
    titleAr: 'شرح أفعال عضلة البايسبس والترايسبس عملياً',
    instructor: 'The Noted Anatomist',
    language: 'English',
    duration: '06:50',
    youtubeId: 'q8M7j7qN0W0',
    category: 'muscles'
  },

  // 3. SKELETAL & BONES
  {
    id: 'vid_femur_ar',
    topic: 'Femur & Humerus Osteology',
    topicAr: 'عظم الفخذ وعظم العضد',
    title: 'Femur & Humerus Identification & Landmarks',
    titleAr: 'تحديد المعالم العظمية للفخذ والعضد للامتحان العملي',
    instructor: 'Dr. Medical Practical Guide',
    language: 'Arabic',
    duration: '07:20',
    youtubeId: '9G_H1fGg2pE',
    category: 'bones'
  },
  {
    id: 'vid_femur_en',
    topic: 'Femur & Humerus Osteology',
    topicAr: 'عظم الفخذ وعظم العضد',
    title: 'Bones of the Limbs: High-Yield Practical Walkthrough',
    titleAr: 'مراجعة عظام الأطراف العملية بالإنجليزية',
    instructor: 'Institute of Human Anatomy',
    language: 'English',
    duration: '08:10',
    youtubeId: 'k1W_b10N2A8',
    category: 'bones'
  },

  // 4. ORGAN SYSTEMS
  {
    id: 'vid_heart_ar',
    topic: 'Heart & Internal Valves',
    topicAr: 'القلب والصمامات والأوعية الكبرى',
    title: 'Cardiac Chambers & Circulation Explained',
    titleAr: 'تشريح القلب الداخلي والصمامات الأربعة بالعربي',
    instructor: 'Arab Medical Board Faculty',
    language: 'Arabic',
    duration: '09:00',
    youtubeId: 'q5sE7_Z9YqA',
    category: 'organs'
  },
  {
    id: 'vid_heart_en',
    topic: 'Heart & Internal Valves',
    topicAr: 'القلب والصمامات والأوعية الكبرى',
    title: 'Human Heart Dissection & Chamber Identification',
    titleAr: 'تشريح حقيقي للقلب وتحديد الحجرات والصمامات',
    instructor: 'Anatomy Zone',
    language: 'English',
    duration: '07:45',
    youtubeId: '3Qp0XqD3nZ0',
    category: 'organs'
  }
];

export const AnatomyVideosSection: React.FC<AnatomyVideosSectionProps> = ({
  onBackToMain
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'All' | 'Arabic' | 'English'>('All');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'basics' | 'muscles' | 'bones' | 'organs'>('All');
  const [activeVideo, setActiveVideo] = useState<AnatomyCuratedVideo | null>(null);

  const filteredVideos = CURATED_ANATOMY_VIDEOS.filter(v => {
    const langMatch = selectedLanguage === 'All' || v.language === selectedLanguage;
    const catMatch = selectedCategory === 'All' || v.category === selectedCategory;
    return langMatch && catMatch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800 uppercase tracking-wider">
              Anatomy Lab · Curated Video Lectures
            </span>
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Video className="w-6 h-6 text-rose-400 shrink-0" />
            <span>PRE-SELECTED ANATOMY VIDEO EXPLANATIONS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            مكتبة مرئية مختارة بدقة: شرح بالعربية وشرح بالإنجليزية لكل موضوع تشريحي أساسي بدون تشتيت أو فيديوهات عشوائية.
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

      {/* Filter Tabs: Language & Topic */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Topic filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'All', label: 'All Topics' },
            { id: 'basics', label: 'Basics' },
            { id: 'muscles', label: 'Muscles' },
            { id: 'bones', label: 'Bones' },
            { id: 'organs', label: 'Organ Systems' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                selectedCategory === tab.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl shrink-0 self-start sm:self-auto">
          {(['All', 'Arabic', 'English'] as const).map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedLanguage === lang
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'Arabic' ? 'العربية' : lang}
            </button>
          ))}
        </div>
      </div>

      {/* Active Embedded Video Player (if open) */}
      {activeVideo && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Now Playing · {activeVideo.topic} ({activeVideo.language})
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {activeVideo.title}
              </h3>
              <p className="text-xs text-slate-400">{activeVideo.titleAr}</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
            >
              Close Video
            </button>
          </div>

          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
              title={activeVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Quick YouTube Fallback Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">إذا واجهت رسالة &quot;Video unavailable&quot; داخل المنصة:</span>
            <a
              href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all shadow-md shadow-red-600/20"
            >
              <span>مشاهدة على يوتيوب (Watch on YouTube)</span>
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {filteredVideos.map(v => (
          <div
            key={v.id}
            onClick={() => setActiveVideo(v)}
            className="bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-5 cursor-pointer group transition-all duration-200 shadow-sm hover:shadow-lg flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-rose-300 border border-slate-800">
                  {v.topic}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  v.language === 'Arabic'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                }`}>
                  {v.language}
                </span>
              </div>

              <h4 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                {v.title}
              </h4>
              <p className="text-xs text-slate-400">
                {v.titleAr}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{v.duration}</span>
              </div>

              <div className="inline-flex items-center gap-1 text-rose-400 font-bold group-hover:text-rose-300">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Explanation</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
