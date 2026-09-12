/*
 * © LAB HUB · Developed by Sakina Asaad
 * Interactive Anatomy Atlas
 *
 * Mobile-First, Touch & Mouse Powered Medical Anatomy Atlas for 1st Year Medical Students:
 * - Zoom in / Zoom out / Pinch-to-zoom / Pan
 * - Clickable structure pins with verified descriptions
 * - Multi-view switching (e.g., Lungs Anterior Gross Anatomy vs Bronchial Tree)
 * - Academic anatomical breakdown (Origin, Insertion, Innervation, Action, Clinical Pearls)
 * - 1-Click navigation between organ systems & regions
 */

import React, { useState } from 'react';
import {
  INTERACTIVE_ATLAS_TOPICS,
  AtlasTopic
} from './atlas/AnatomyInteractiveAtlasData';
import { InteractiveAtlasCanvas } from './atlas/InteractiveAtlasCanvas';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';
import {
  Layers,
  Search,
  ChevronRight,
  Activity,
  ShieldCheck,
  Compass,
  Play,
  X,
  Target,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface AnatomyImagesSectionProps {
  onBackToMain?: () => void;
  onOpenSpotter?: () => void;
  initialTopicId?: string;
}

export const AnatomyImagesSection: React.FC<AnatomyImagesSectionProps> = ({
  onBackToMain,
  onOpenSpotter,
  initialTopicId
}) => {
  const [selectedSystem, setSelectedSystem] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTopicId, setActiveTopicId] = useState<string>(
    initialTopicId || 'respiratory_lungs'
  );
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const systemFilters = [
    { id: 'all', labelEn: 'All Systems', labelAr: 'كافة الأجهزة' },
    { id: 'respiratory', labelEn: 'Respiratory / Lungs', labelAr: 'الرئتان والتنفس' },
    { id: 'muscles', labelEn: 'Muscular System', labelAr: 'العضلات' },
    { id: 'cardiovascular', labelEn: 'Cardiovascular / Heart', labelAr: 'القلب والأوعية' },
    { id: 'skeletal', labelEn: 'Skeletal / Bones', labelAr: 'الهيكل العظمي' },
    { id: 'joints', labelEn: 'Joints & Articulations', labelAr: 'المفاصل والأربطة' },
    { id: 'nervous', labelEn: 'Nervous / Brain', labelAr: 'الدماغ والأعصاب' },
    { id: 'urinary', labelEn: 'Urinary / Kidneys', labelAr: 'الكلية والجهاز البولي' }
  ];

  const filteredTopics = INTERACTIVE_ATLAS_TOPICS.filter(topic => {
    const matchesSystem = selectedSystem === 'all' || topic.system === selectedSystem;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      topic.titleEn.toLowerCase().includes(query) ||
      topic.titleAr.includes(query) ||
      topic.shortOverviewEn.toLowerCase().includes(query) ||
      topic.views.some(v =>
        v.hotspots.some(h =>
          h.nameEn.toLowerCase().includes(query) ||
          h.nameAr.includes(query)
        )
      );
    return matchesSystem && matchesSearch;
  });

  const activeTopic =
    INTERACTIVE_ATLAS_TOPICS.find(t => t.id === activeTopicId) ||
    filteredTopics[0] ||
    INTERACTIVE_ATLAS_TOPICS[0];

  return (
    <div className="space-y-6 pb-16">
      {/* 1. TOP BAR HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-amber-400" />
              <span>Interactive Anatomy Atlas · أطلس التشريح التفاعلي</span>
            </span>
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>HUMAN ANATOMY INTERACTIVE ATLAS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            أطلس تشريحي تفاعلي متكامل لطلاب الطب: تكبير وتصغير باللمس والماوس، ونقاط تفاعلية على التراكيب للتعرف على أسمائها ووظائفها بدقة دون أي تعقيد تقني.
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

      {/* 2. SYSTEM FILTER PILLS & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-none">
          {systemFilters.map(sf => (
            <button
              key={sf.id}
              type="button"
              onClick={() => {
                setSelectedSystem(sf.id);
                const first = INTERACTIVE_ATLAS_TOPICS.find(
                  t => sf.id === 'all' || t.system === sf.id
                );
                if (first) setActiveTopicId(first.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedSystem === sf.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-950/40'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <span>{sf.labelEn}</span>
              <span className="text-[10px] opacity-75 mr-1"> ({sf.labelAr})</span>
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search lungs, biceps, heart, bones..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 3. PRIMARY INTERACTIVE CANVAS (THE CORE INTERACTION AREA) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Active Interactive Canvas
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Use pinch or zoom controls to inspect structures in high definition
          </span>
        </div>

        {activeTopic && (
          <InteractiveAtlasCanvas
            key={activeTopic.id}
            topic={activeTopic}
            onOpenVideo={youtubeId => setActiveVideoModal(youtubeId)}
            onOpenSpotter={onOpenSpotter}
          />
        )}
      </div>

      {/* 4. TOPIC DIRECTORY & SWITCHER CARDS */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Atlas Topics Directory ({filteredTopics.length} plates available)</span>
          </h3>
          <span className="text-xs text-slate-400">
            اضغط على أي لوحة لتحميلها في المشاهد التفاعلي
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTopics.map(topic => {
            const isSelected = topic.id === activeTopic.id;
            const primaryView = topic.views[0];

            return (
              <div
                key={topic.id}
                onClick={() => {
                  setActiveTopicId(topic.id);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-amber-950/30 border-amber-500/80 ring-1 ring-amber-500/30 shadow-lg'
                    : 'bg-slate-900/90 hover:bg-slate-850 border-slate-800 hover:border-slate-700 shadow-sm'
                }`}
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-32 rounded-xl bg-slate-950 overflow-hidden mb-2.5">
                    <img
                      src={primaryView.imageUrl}
                      alt={topic.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-slate-900/90 text-amber-300 border border-amber-500/30">
                      {topic.systemLabelEn}
                    </span>

                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold bg-slate-900/90 text-slate-300 border border-slate-700">
                      {primaryView.hotspots.length} Pins
                    </span>
                  </div>

                  <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                    {topic.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5 font-medium">
                    {topic.titleAr}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-bold">
                  <span className={isSelected ? 'text-amber-400' : 'text-slate-400'}>
                    {isSelected ? '● Currently Loaded' : 'Click to Open'}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-500'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. VIDEO POPUP MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl space-y-3 p-4 sm:p-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-rose-500" />
                <h4 className="text-sm sm:text-base font-black text-white">
                  Medical Video Demonstration
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal}?autoplay=1&rel=0`}
                title="Medical Anatomy Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
