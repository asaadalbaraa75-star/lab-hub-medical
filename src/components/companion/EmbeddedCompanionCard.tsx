/*
 * © LAB HUB · Developed by Sakina Asaad
 * تطوير: سكينة أسعد
 * 
 * Embedded Companion Motivational Card: "لبيب"
 * For seamless placement inside pages, lessons, and exam results
 */

import React from 'react';
import { CompanionAvatarSvg } from './CompanionAvatarSvg';
import { CompanionExpression } from './companionTypes';
import { Sparkles } from 'lucide-react';

interface EmbeddedCompanionCardProps {
  expression?: CompanionExpression;
  message: string;
  subMessage?: string;
  badge?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmbeddedCompanionCard: React.FC<EmbeddedCompanionCardProps> = ({
  expression = 'happy',
  message,
  subMessage,
  badge = 'لبيب • رفيقك الدراسي',
  size = 'md',
  className = '',
  actionText,
  onAction
}) => {
  const avatarSize = size === 'sm' ? 68 : size === 'lg' ? 110 : 88;

  return (
    <div
      className={`rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-purple-950/30 border border-purple-500/30 p-4 sm:p-5 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-4 ${className}`}
      dir="rtl"
      id="embedded-companion-motivation-card"
    >
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

      {/* Avatar Container */}
      <div className="shrink-0 p-1 rounded-2xl bg-gradient-to-b from-purple-900/40 to-slate-900/60 border border-purple-500/40 shadow-inner flex items-center justify-center">
        <CompanionAvatarSvg expression={expression} size={avatarSize} isAnimated={true} />
      </div>

      {/* Content */}
      <div className="flex-1 text-center sm:text-right space-y-1.5 min-w-0">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold border border-purple-500/30 mb-1">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>{badge}</span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
          {message}
        </h4>

        {subMessage && (
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            {subMessage}
          </p>
        )}

        {actionText && onAction && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onAction}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              {actionText}
            </button>
          </div>
        )}
      </div>

      {/* Subtle developer copyright watermark */}
      <div className="absolute bottom-2 left-3 text-[9px] text-slate-400/80 font-mono hidden sm:block" dir="ltr">
        © LAB HUB • Developed by Sakina Asaad
      </div>
    </div>
  );
};
