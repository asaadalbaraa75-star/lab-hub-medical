import React from 'react';
import { BiochemistryTestTube, TestTubeType } from './BiochemistryTestTube';
import { Flame, Info, CheckCircle2, AlertCircle } from 'lucide-react';

export const BenedictColorScale: React.FC = () => {
  const scaleSteps = [
    {
      tubeType: 'benedict-neg' as TestTubeType,
      colorNameAr: 'أزرق',
      colorNameEn: 'Blue',
      changeAr: 'لا تغيير / سلبي',
      changeEn: 'No change / Negative',
      indicatorAr: 'سلبي (0%)',
      indicatorEn: 'Negative (0%)',
      symbol: '(-)',
      sugarAmountAr: 'لا يوجد سكر مختزل',
      sugarAmountEn: 'No reducing sugar',
      badgeBg: 'bg-sky-950/70 border-sky-600/60 text-sky-300'
    },
    {
      tubeType: 'benedict-trace' as TestTubeType,
      colorNameAr: 'أخضر',
      colorNameEn: 'Green',
      changeAr: 'راسب خفيف أخضر',
      changeEn: 'Green ppt',
      indicatorAr: 'أثر (Trace)',
      indicatorEn: 'Trace (0.5%)',
      symbol: 'Trace',
      sugarAmountAr: 'أثر قليل جداً',
      sugarAmountEn: 'Trace amount',
      badgeBg: 'bg-emerald-950/70 border-emerald-600/60 text-emerald-300'
    },
    {
      tubeType: 'benedict-low' as TestTubeType,
      colorNameAr: 'أصفر',
      colorNameEn: 'Yellow',
      changeAr: 'راسب أصفر',
      changeEn: 'Yellow ppt',
      indicatorAr: 'قليل (+)',
      indicatorEn: 'Low (+)',
      symbol: '(+)',
      sugarAmountAr: 'كمية قليلة (1%)',
      sugarAmountEn: 'Approx 1% sugar',
      badgeBg: 'bg-yellow-950/70 border-yellow-600/60 text-yellow-300'
    },
    {
      tubeType: 'benedict-mod' as TestTubeType,
      colorNameAr: 'برتقالي',
      colorNameEn: 'Orange',
      changeAr: 'راسب برتقالي',
      changeEn: 'Orange ppt',
      indicatorAr: 'متوسط (++)',
      indicatorEn: 'Moderate (++)',
      symbol: '(++)',
      sugarAmountAr: 'كمية متوسطة (1.5%)',
      sugarAmountEn: 'Approx 1.5% sugar',
      badgeBg: 'bg-orange-950/70 border-orange-600/60 text-orange-300'
    },
    {
      tubeType: 'benedict-high' as TestTubeType,
      colorNameAr: 'أحمر آجري',
      colorNameEn: 'Brick-red',
      changeAr: 'راسب أحمر آجري كثيف',
      changeEn: 'Dense Brick-red ppt',
      indicatorAr: 'عالي (+++)',
      indicatorEn: 'High (+++)',
      symbol: '(+++)',
      sugarAmountAr: 'كمية عالية (>2%)',
      sugarAmountEn: 'High reducing sugar >2%',
      badgeBg: 'bg-red-950/70 border-red-600/60 text-red-300'
    }
  ];

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 sm:p-6 space-y-6 shadow-md" id="benedict-color-scale-panel">
      {/* Header & Core Callout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#334155] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
              تدرج لوني نصف كمي
            </span>
            <h3 className="text-lg font-bold text-[#E5E7EB] tracking-tight">
              مقياس ألوان اختبار بندكت (BENEDICT'S COLOR SCALE)
            </h3>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            يتغير لون الراسب الناتج بحسب تركيز السكر المختزل في العينة بعد الغليان لمدة 3–5 دقائق.
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="bg-amber-950/40 border border-amber-600/50 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shrink-0 self-start md:self-auto">
          <Flame className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="text-right">
            <p className="text-xs font-bold text-amber-300">
              شدة اللون تعتمد على كمية السكر المختزل
            </p>
            <p className="text-[10px] text-amber-400/80 font-mono">
              Intensity of color depends on the amount of reducing sugar.
            </p>
          </div>
        </div>
      </div>

      {/* 5-Tubes Horizontal Progression */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 pt-2">
        {scaleSteps.map((step, idx) => (
          <div
            key={idx}
            className="bg-[#0F172A]/70 border border-[#334155] hover:border-slate-500 rounded-xl p-3.5 flex flex-col items-center justify-between space-y-3 transition-all group"
          >
            {/* Step Indicator & Symbol */}
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400">
                0{idx + 1}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${step.badgeBg}`}>
                {step.symbol}
              </span>
            </div>

            {/* Test Tube Illustration */}
            <div className="py-2 scale-90 sm:scale-100 flex justify-center">
              <BiochemistryTestTube
                type={step.tubeType}
                height={160}
                width={50}
                showArrowLabel={false}
              />
            </div>

            {/* Labels Card */}
            <div className="w-full text-center space-y-1 pt-1 border-t border-[#334155]/80">
              <div className="font-bold text-sm text-[#E5E7EB]">
                {step.colorNameAr}
              </div>
              <div className="text-[10px] text-[#94A3B8] font-mono">
                {step.colorNameEn}
              </div>
              <div className="text-[11px] font-semibold text-amber-300/90 pt-0.5">
                {step.indicatorAr}
              </div>
              <div className="text-[9px] text-slate-400">
                {step.sugarAmountAr}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer explanation */}
      <div className="bg-[#0F172A]/90 border border-[#334155] rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2 text-sky-400">
          <Info className="w-4 h-4 shrink-0" />
          <span className="font-semibold text-[#E5E7EB]">
            النتيجة السلبية (أزرق): سكر غير مختزل مثل السكروز أو عدم وجود كربوهيدرات
          </span>
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          Blue (Negative) → Green (Trace) → Yellow (+) → Orange (++) → Brick-red (+++)
        </div>
      </div>
    </div>
  );
};
