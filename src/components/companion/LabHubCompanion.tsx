/*
 * © LAB HUB · Developed by Sakina Asaad
 * تطوير: سكينة أسعد
 * 
 * LAB HUB Interactive Cartoon Study Companion Component: "لبيب" (Labeeb)
 * Core Platform Component — Brand Identity & Motivation System
 */

import React, { useState, useEffect } from 'react';
import { CompanionAvatarSvg } from './CompanionAvatarSvg';
import { companionService, COMPANION_ACHIEVEMENTS } from './companionStore';
import { CompanionState } from './companionTypes';
import {
  X,
  Sparkles,
  Award,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Flame,
  Heart
} from 'lucide-react';

export const LabHubCompanion: React.FC = () => {
  const [state, setState] = useState<CompanionState>(() => companionService.getState());
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = companionService.subscribe(() => {
      setState(companionService.getState());
    });
    return unsubscribe;
  }, []);

  const handleAvatarClick = () => {
    if (state.isMinimized) {
      companionService.toggleMinimized();
    } else {
      companionService.randomEncouragement();
    }
  };

  const handleDismissBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    companionService.dismissBubble();
  };

  // Minimized Compact Floating Badge View
  if (state.isMinimized) {
    return (
      <div
        className="fixed bottom-20 sm:bottom-6 left-4 z-40 animate-in fade-in slide-in-from-bottom-3 duration-300"
        id="labhub-companion-minimized-widget"
      >
        <button
          type="button"
          onClick={handleAvatarClick}
          title="افتح الرفيق الدراسي لبيب"
          className="group relative flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-900/90 hover:bg-slate-800/95 border border-purple-500/40 shadow-[0_4px_25px_rgba(168,85,247,0.35)] backdrop-blur-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-950/60 flex items-center justify-center p-0.5 border border-purple-400/50">
            <CompanionAvatarSvg expression="happy" size={38} isAnimated={false} />
          </div>
          <div className="flex flex-col text-right" dir="rtl">
            <span className="text-[11px] font-bold text-white flex items-center gap-1">
              <span>لبيب</span>
              <Sparkles className="w-2.5 h-2.5 text-purple-400" />
            </span>
            <span className="text-[9px] text-purple-300">رفيق LAB HUB</span>
          </div>
          {state.streakCount > 0 && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-300">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{state.streakCount}</span>
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed bottom-20 sm:bottom-6 left-4 z-40 flex flex-col items-start select-none pointer-events-none"
        id="labhub-companion-interactive-root"
      >
        {/* --- 1. CLEAN ARABIC SPEECH BUBBLE --- */}
        {state.isBubbleVisible && (
          <div
            className="pointer-events-auto mb-2.5 max-w-[260px] sm:max-w-[300px] animate-in fade-in zoom-in-95 duration-200"
            dir="rtl"
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/95 via-[#0D091B]/95 to-slate-900/95 border border-purple-500/40 p-3.5 text-right shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
              {/* Header inside Bubble */}
              <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1 text-[11px] font-bold text-purple-300">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>لبيب • LAB HUB Companion</span>
                </div>
                <button
                  type="button"
                  onClick={handleDismissBubble}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="إغلاق الرسالة"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Speech Message */}
              <p className="text-xs sm:text-[13px] font-semibold text-white leading-relaxed tracking-normal">
                {state.message}
              </p>

              {/* Bubble Arrow Tail pointing toward Labeeb */}
              <div
                className="absolute -bottom-2 left-8 w-4 h-4 bg-[#0D091B] border-r border-b border-purple-500/40 rotate-45"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
              />
            </div>
          </div>
        )}

        {/* --- 2. CARTOON CHARACTER POD --- */}
        <div className="pointer-events-auto flex items-end gap-2">
          {/* Main Interactive Avatar Button */}
          <div
            onClick={handleAvatarClick}
            className="group relative cursor-pointer flex flex-col items-center"
            title="انقر لتشجيع جديد من لبيب"
          >
            {/* Subtle glow circle under avatar */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600/30 to-indigo-600/30 blur-md group-hover:blur-lg transition-all" />

            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-purple-950/80 border border-purple-500/30 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md group-hover:scale-105 group-active:scale-95 transition-transform duration-200">
              <CompanionAvatarSvg
                expression={state.expression}
                size={84}
                isAnimated={true}
              />

              {/* Little Floating "Click Me" spark or streak count */}
              {state.streakCount > 0 && (
                <div className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold shadow-md flex items-center gap-0.5">
                  <Flame className="w-3 h-3 fill-white" />
                  <span>{state.streakCount}</span>
                </div>
              )}
            </div>

            {/* Name Label & Developer Subtitle Tag */}
            <div className="mt-1 px-2 py-0.5 rounded-md bg-slate-900/90 border border-white/10 text-[10px] font-bold text-slate-300 shadow-xs flex items-center gap-1 text-center">
              <span>لبيب</span>
              <span className="text-[8px] text-purple-400 font-mono">LH</span>
            </div>
          </div>

          {/* Quick Control Tools (Achievements & Minimize) */}
          <div className="flex flex-col gap-1 pb-1">
            <button
              type="button"
              onClick={() => setIsAchievementsOpen(true)}
              title="لوحة الإنجازات والتحفيز"
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 text-purple-300 hover:text-white transition-all shadow-md cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => companionService.toggleMinimized()}
              title="تصغير الرفيق"
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-white transition-all shadow-md cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* --- 3. MOTIVATION & ACHIEVEMENTS MODAL --- */}
      {isAchievementsOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          dir="rtl"
        >
          <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#0F0B1E] via-[#090614] to-[#0F0B1E] border border-purple-500/30 p-6 shadow-2xl space-y-5 text-right relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center p-1">
                  <CompanionAvatarSvg expression="proud" size={44} isAnimated={false} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>إنجازاتك مع لبيب</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </h3>
                  <p className="text-xs text-purple-300/80">نظام التحفيز الأكاديمي لطلاب الطب</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAchievementsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Achievements List */}
            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pl-1">
              {COMPANION_ACHIEVEMENTS.map(ach => {
                const isUnlocked = state.unlockedAchievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isUnlocked
                        ? 'bg-purple-950/40 border-purple-500/40 text-white'
                        : 'bg-white/5 border-white/5 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl shrink-0">{ach.icon}</div>
                      <div>
                        <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <span>{ach.titleAr}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({ach.titleEn})</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{ach.descriptionAr}</p>
                      </div>
                    </div>
                    {isUnlocked ? (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 shrink-0">
                        مكتمل ✓
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-bold shrink-0">
                        قيد الإنجاز
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Developer Credit & Close Button */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400" dir="ltr">
                <span className="font-semibold text-slate-300">© LAB HUB</span>
                <span className="mx-1">•</span>
                <span>Developed by Sakina Asaad</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAchievementsOpen(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                متابعة الدراسة
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
