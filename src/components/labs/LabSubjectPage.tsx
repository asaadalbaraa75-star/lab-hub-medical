import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Target,
  CheckSquare,
  ArrowRight,
  Bone,
  Microscope,
  Bug,
  Activity,
  Layers,
  Sparkles,
  SlidersHorizontal,
  FileText,
  HelpCircle,
  Move3d,
  Box,
  Image as ImageIcon,
  Disc,
  TestTube,
  FlaskConical,
  Eye,
  Zap,
  CircleDot,
  Share2,
  GitMerge,
  CheckCircle2,
  XCircle,
  Beaker,
  Flame,
  Info
} from 'lucide-react';
import { LabSubjectInfo, LabCategory, Practical, LabSubjectId } from '../../types';
import { BIOCHEMISTRY_CARBOHYDRATE_TESTS } from '../../data/mockData';
import { BiochemistryLabView } from './biochemistry/BiochemistryLabView';
import { AnatomyLabView } from './anatomy/AnatomyLabView';

interface LabSubjectPageProps {
  labInfo: LabSubjectInfo;
  practicals: Practical[];
  onOpenPractical: (labId: string, practicalId: string) => void;
  onOpenSpotter: (labId: LabSubjectId, categoryId?: string) => void;
  onOpenQuiz: (labId: LabSubjectId, practicalId?: string) => void;
  onBackToDashboard: () => void;
}

export const LabSubjectPage: React.FC<LabSubjectPageProps> = ({
  labInfo,
  practicals,
  onOpenPractical,
  onOpenSpotter,
  onOpenQuiz,
  onBackToDashboard,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'categories' | 'practicals'>('all');

  const iconComponents: Record<string, any> = {
    Bone,
    Activity,
    Move3d,
    GitMerge,
    Box,
    BookOpen,
    Image: ImageIcon,
    Target,
    CheckSquare,
    Microscope,
    CircleDot,
    Layers,
    Share2,
    Zap,
    SlidersHorizontal,
    Bug,
    TestTube,
    Disc,
    FlaskConical,
    Eye
  };

  const categories = labInfo?.categories || [];
  const safePracticals = Array.isArray(practicals) ? practicals : [];

  const isBiochemistry = labInfo?.id === 'biochemistry';
  const isAnatomy = labInfo?.id === 'anatomy';

  const filteredBiochemTests = BIOCHEMISTRY_CARBOHYDRATE_TESTS.filter(test => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      test.title.toLowerCase().includes(q) ||
      test.principle.toLowerCase().includes(q) ||
      test.positive.toLowerCase().includes(q) ||
      test.negative.toLowerCase().includes(q) ||
      test.reagents.some(r => r.toLowerCase().includes(q))
    );
  });

  const filteredCategories = categories.filter(cat => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.shortDesc.toLowerCase().includes(q)
    );
  });

  const labPracticals = safePracticals.filter(p => p.courseId === labInfo?.id && p.status === 'published');

  const handleCategoryClick = (category: LabCategory) => {
    if (category.title === 'SPOTTER') {
      onOpenSpotter(labInfo.id, category.id);
      return;
    }
    if (category.title === 'QUIZ') {
      onOpenQuiz(labInfo.id);
      return;
    }
    if (category.title === 'PRACTICALS') {
      const firstPractical = labPracticals[0];
      if (firstPractical) {
        onOpenPractical(labInfo.id, firstPractical.id);
      }
      return;
    }

    // If practical exists for this category
    const matched = labPracticals.find(p => p.categoryId === category.id);
    if (matched) {
      onOpenPractical(labInfo.id, matched.id);
    } else if (labPracticals[0]) {
      onOpenPractical(labInfo.id, labPracticals[0].id);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300" id={`lab-page-${labInfo.id}`}>
      {/* Top Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-sm">
        <div className="relative h-64 sm:h-72 w-full bg-slate-100">
          <img
            src={labInfo.heroImage}
            alt={labInfo.name}
            className="w-full h-full object-cover"
          />
          {/* Multi-stop gradient overlay for crisp white text */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/50 to-slate-900/20" />

          {/* Hero Content */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <button
                type="button"
                id="back-to-dashboard-btn"
                onClick={onBackToDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-white/30 text-xs font-semibold text-slate-800 hover:bg-white transition-colors shadow-xs"
              >
                ← Back to Dashboard
              </button>

              <div className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-white/30 text-xs font-mono font-bold text-slate-900 shadow-xs">
                {labInfo.code}
              </div>
            </div>

            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-amber-500/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                {labInfo.tagline}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-xs">
                {labInfo.name.toUpperCase()}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
                {labInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* In-Lab Search Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={
                isBiochemistry
                  ? 'Search Carbohydrate tests, reagents, principles, results...'
                  : `Search ${labInfo.name} topics, structures, stains...`
              }
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-indigo-500 focus:bg-white rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors shadow-xs"
            />
          </div>

          {/* Status badge / Filter Pills */}
          {isBiochemistry ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs">
                {filteredBiochemTests.length} of 6 Identification Tests Shown
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-[#E2E8F0]'
                }`}
              >
                All Modules ({labInfo.categories.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('categories')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === 'categories'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-[#E2E8F0]'
                }`}
              >
                Core Topics
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('practicals')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === 'practicals'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-[#E2E8F0]'
                }`}
              >
                Practicals ({labPracticals.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BIOCHEMISTRY LAB: The 6 Carbohydrate Identification Tests Visual Learning Suite */}
      {isBiochemistry && (
        <div id="biochemistry-tests-section">
          <BiochemistryLabView searchQuery={searchQuery} />
        </div>
      )}

      {/* ANATOMY LAB: Comprehensive Visual Anatomy Atlas & Organ Systems Modules */}
      {isAnatomy && (
        <div id="anatomy-section">
          <AnatomyLabView
            searchQuery={searchQuery}
            onOpenExam={() => onOpenQuiz(labInfo.id)}
            onOpenSpotter={() => onOpenSpotter(labInfo.id)}
            onOpenQuiz={() => onOpenQuiz(labInfo.id)}
          />
        </div>
      )}

      {/* HISTOLOGY LAB: Visual Category Cards */}
      {!isBiochemistry && !isAnatomy && activeFilter !== 'practicals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              LABORATORY MODULES & TOPICS
            </h2>
            <span className="text-xs text-slate-500">
              {filteredCategories.length} Categories Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredCategories.map(category => {
              const Icon = iconComponents[category.iconName] || BookOpen;

              return (
                <div
                  key={category.id}
                  id={`category-card-${category.id}`}
                  onClick={() => handleCategoryClick(category)}
                  className="bg-white hover:bg-slate-50/70 border border-[#E2E8F0] hover:border-indigo-300 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                >
                  {/* Visual Image Header with circular icon */}
                  <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                    <img
                      src={category.imageUrl}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                    {/* Circular Icon badge */}
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-center text-indigo-600 shadow-sm group-hover:border-indigo-300 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Badge */}
                    <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-md border border-white/40 text-[10px] font-bold text-slate-900 shadow-xs">
                      {category.title === 'SPOTTER'
                        ? `${category.spotterCount} Stations`
                        : category.title === 'QUIZ'
                        ? `${category.quizCount} Quizzes`
                        : `${category.practicalCount} Practicals`}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                        {category.shortDesc}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-semibold text-indigo-600">
                      <span>
                        {category.title === 'SPOTTER'
                          ? 'Start Spotter Test'
                          : category.title === 'QUIZ'
                          ? 'Take Lab Quiz'
                          : 'Explore Topics'}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Practical Sessions in this Laboratory */}
      {!isBiochemistry && (activeFilter === 'all' || activeFilter === 'practicals') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              SCHEDULED PRACTICAL CURRICULUM
            </h2>
            <span className="text-xs text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
              {labPracticals.length} Approved Practicals
            </span>
          </div>

          <div className="space-y-3">
            {labPracticals.map(practical => {
              return (
                <div
                  key={practical.id}
                  id={`practical-item-${practical.id}`}
                  onClick={() => onOpenPractical(labInfo.id, practical.id)}
                  className="bg-white hover:bg-slate-50/80 border border-[#E2E8F0] hover:border-indigo-300 p-4 sm:p-5 rounded-xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-sm"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                        PRACTICAL {String(practical.practicalNumber).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">Est. {practical.estimatedTime}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-600 border border-[#E2E8F0]">
                        v{practical.version}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {practical.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {practical.subTitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 justify-end">
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        onOpenPractical(labInfo.id, practical.id);
                      }}
                      className="inline-flex items-center gap-2 bg-indigo-50 group-hover:bg-indigo-600 text-indigo-700 group-hover:text-white font-semibold px-4 py-2 rounded-lg text-xs transition-all border border-indigo-200 group-hover:border-transparent shadow-xs"
                    >
                      <span>Study Practical</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
