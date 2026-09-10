import React, { useState } from 'react';
import {
  CELL_ORGANELLES_DATA,
  OrganelleStudy
} from './HistologyData';
import {
  Cpu,
  CheckCircle2,
  Sparkles,
  Layers,
  FlaskConical,
  Activity,
  AlertCircle,
  Eye
} from 'lucide-react';

export const CellOrganellesLesson: React.FC = () => {
  const [selectedOrganelleId, setSelectedOrganelleId] = useState<string>('organelle_golgi');

  const selectedOrganelle = CELL_ORGANELLES_DATA.find(o => o.id === selectedOrganelleId) || CELL_ORGANELLES_DATA[0];

  return (
    <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl text-slate-100" id="cell-organelles-container">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-950/70 border border-teal-500/30 text-teal-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                LESSON 6 — SANA'A UNIVERSITY CURRICULUM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              الخلية وعضياتها (Cell Organelles: Golgi, Mitochondria & Nissl Bodies)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Specialized histological stains, Negative Golgi image, Altmann’s fuchsin, and Nissl chromatolysis.
            </p>
          </div>
        </div>

        {/* 3 Organelles Quick Toggle */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {CELL_ORGANELLES_DATA.map(org => {
            const isSelected = org.id === selectedOrganelleId;
            return (
              <button
                key={org.id}
                type="button"
                id={`btn-${org.id}`}
                onClick={() => setSelectedOrganelleId(org.id)}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'bg-[#1E293B] text-slate-300 hover:text-white border border-[#334155]'
                }`}
              >
                {org.nameEn.split('(')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Study Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Fast Navigation Cards */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            اختر العضية الخلوية للدراسة:
          </span>
          <div className="space-y-2.5">
            {CELL_ORGANELLES_DATA.map(org => {
              const isSelected = org.id === selectedOrganelleId;
              return (
                <button
                  key={org.id}
                  type="button"
                  onClick={() => setSelectedOrganelleId(org.id)}
                  className={`w-full text-right p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E293B] border-teal-400 ring-2 ring-teal-500/30 shadow-lg'
                      : 'bg-[#1E293B]/60 border-[#334155] hover:bg-[#1E293B]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-900 border border-slate-700 text-slate-300">
                      {org.type}
                    </span>
                    <span className="text-xs text-teal-400 font-mono font-bold">
                      {org.specialStain.split('(')[0]}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {org.nameEn}
                  </h4>
                  <p className="text-xs font-semibold text-teal-300/90 font-arabic mt-0.5">
                    {org.nameAr}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Special Stain Summary Callout */}
          <div className="bg-[#1E293B] border border-[#334155] p-4 rounded-2xl space-y-2 text-xs">
            <div className="font-bold text-slate-300 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              <span>مراجعة سريعة للصبغات الخاصة:</span>
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span>جهاز جولجي:</span>
                <span className="font-mono text-cyan-300">Silver Stain (Black)</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span>الميتوكوندريا:</span>
                <span className="font-mono text-rose-300">Altmann's Fuchsin (Red)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>أجسام نيسل:</span>
                <span className="font-mono text-indigo-300">Toluidine Blue (Blue)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: In-Depth Medical Dossier */}
        <div className="lg:col-span-8 bg-[#1E293B] border border-[#334155] rounded-2xl p-6 space-y-5 shadow-lg">
          {/* Header */}
          <div className="border-b border-[#334155] pb-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#0F172A] border border-slate-700 text-teal-300">
                Type: {selectedOrganelle.type.toUpperCase()} ORGANELLE
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Source: {selectedOrganelle.slideSpecimenSource}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
              {selectedOrganelle.nameEn}
            </h3>
            <p className="text-sm font-semibold text-teal-300 font-arabic">
              {selectedOrganelle.nameAr}
            </p>
          </div>

          {/* Structure, Polarity & Function */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1.5">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>التركيب والقطبية (Structure & Polarity):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedOrganelle.structureAndPolarity}
              </p>
            </div>

            <div className="bg-[#0F172A] border border-slate-700/70 rounded-xl p-4 space-y-1.5">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>الوظيفة الفسيولوجية (Main Function):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedOrganelle.mainFunction}
              </p>
            </div>
          </div>

          {/* Microscopic Appearance: H&E vs Special Stain */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 space-y-1.5">
              <div className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>المظهر بصبغة H&E الروتينية:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedOrganelle.appearanceUnderHE}
              </p>
            </div>

            <div className="bg-teal-950/30 border border-teal-500/30 rounded-xl p-4 space-y-1.5">
              <div className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>المظهر بالصبغة الخاصة ({selectedOrganelle.specialStain}):</span>
              </div>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                {selectedOrganelle.appearanceUnderSpecialStain}
              </p>
            </div>
          </div>

          {/* Practical Identification Points */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>علامات التشخيص المخبري العملي (Practical ID Points):</span>
            </h4>
            <div className="space-y-2">
              {selectedOrganelle.practicalIdentificationPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="bg-[#0F172A]/70 border border-slate-700/50 p-3 rounded-xl text-xs sm:text-sm text-slate-200 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Significance */}
          <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>الأهمية السريرية والارتباط بالمرض (Clinical Significance):</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/95 font-medium leading-relaxed">
              {selectedOrganelle.clinicalSignificance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
