/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Images Atlas
 * Verified real medical images with complete scientific metadata.
 */

import React, { useState } from 'react';
import {
  AnatomyImageAtlasItem,
  ANATOMY_IMAGE_ATLAS
} from './AnatomyCurriculumData';
import { MedicalImageSourceBadge } from '../../common/MedicalImageSourceBadge';
import { OwnershipWatermark } from '../../common/OwnershipWatermark';
import {
  Image as ImageIcon,
  ChevronRight,
  Maximize2,
  X,
  ShieldCheck,
  Tag,
  Search
} from 'lucide-react';

interface AnatomyImagesSectionProps {
  onBackToMain?: () => void;
}

export const AnatomyImagesSection: React.FC<AnatomyImagesSectionProps> = ({
  onBackToMain
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<AnatomyImageAtlasItem | null>(null);

  const categories = [
    'All',
    'Bones',
    'Joints',
    'Muscles',
    'Nervous System',
    'Cardiovascular',
    'Respiratory',
    'Urinary'
  ];

  const filteredImages = ANATOMY_IMAGE_ATLAS.filter(img => {
    const matchesCat = selectedCategory === 'All' || img.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      img.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.titleAr.includes(searchQuery) ||
      img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.keyStructures.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 uppercase tracking-wider">
              Anatomy Lab · Real Scientific Atlas
            </span>
            <OwnershipWatermark variant="minimal" showIcon={false} className="text-[10px] text-slate-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-amber-400 shrink-0" />
            <span>ANATOMY MEDICAL IMAGES ATLAS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            أطلس الصور الطبية التشريحية الحقيقية والموثوقة (OpenStax & NLM Visible Human Project). لا صور مولدة بالذكاء الاصطناعي كصور علمية.
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search anatomical structures..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Atlas Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredImages.map(item => (
          <div
            key={item.id}
            onClick={() => setPreviewImage(item)}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-2.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-1.5 rounded-lg bg-slate-900/90 text-white flex items-center gap-1 text-[10px] font-bold">
                  <Maximize2 className="w-3 h-3" />
                  <span>Enlarge</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 space-y-2.5">
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.titleEn}
                </h4>
                <p className="text-xs text-slate-400">
                  {item.titleAr}
                </p>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {item.keyStructures.slice(0, 3).map((st, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                    {st}
                  </span>
                ))}
              </div>

              {/* Source attribution line */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate">Source: {item.source}</span>
                <span className="text-amber-400 font-bold shrink-0">Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN / ENLARGED PREVIEW MODAL */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {previewImage.category} · Real Medical Specimen
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {previewImage.titleEn}
                </h3>
                <p className="text-xs text-slate-400">{previewImage.titleAr}</p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Enlarged Image */}
            <div className="relative rounded-xl overflow-hidden bg-black max-h-[500px] flex items-center justify-center border border-slate-800">
              <img
                src={previewImage.imageUrl}
                alt={previewImage.titleEn}
                className="max-h-[500px] w-auto object-contain"
              />
              <div className="absolute top-3 left-3">
                <MedicalImageSourceBadge
                  source={previewImage.source}
                  license={previewImage.license}
                  credit={previewImage.credit}
                  verified={true}
                />
              </div>
            </div>

            {/* Scientific Details */}
            <div className="space-y-3 pt-2">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Scientific Description & Landmarks
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {previewImage.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Key Identified Structures:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {previewImage.keyStructures.map((st, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-950 text-amber-300 border border-slate-800 font-semibold">
                      ✓ {st}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>License: {previewImage.license} · Credit: {previewImage.credit}</span>
                <span className="text-teal-400 font-bold">© LAB HUB · سكينة أسعد</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
