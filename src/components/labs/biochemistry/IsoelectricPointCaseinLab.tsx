import React, { useState } from 'react';
import {
  FlaskConical,
  CheckCircle2,
  XCircle,
  Beaker,
  Info,
  Droplets,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const IsoelectricPointCaseinLab: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(5);
  const [interactiveMode, setInteractiveMode] = useState<boolean>(false);

  const procedureSteps = [
    {
      stepNumber: 1,
      title: 'Add 1 mL of the protein sample.',
      detail: 'Measure 1.0 mL of the casein protein solution into a clean glass test tube.'
    },
    {
      stepNumber: 2,
      title: 'Add 1 drop of Bromocresol Green (BCG).',
      detail: 'Add one drop of Bromocresol Green (BCG) indicator directly into the solution.'
    },
    {
      stepNumber: 3,
      title: 'Mix well.',
      detail: 'Gently agitate or swirl the test tube to achieve a uniform mixture.'
    },
    {
      stepNumber: 4,
      title: 'Add 1 mL of acetic acid.',
      detail: 'Carefully introduce 1.0 mL of acetic acid to lower the solution pH toward the pI.'
    },
    {
      stepNumber: 5,
      title: 'Observe the bottom of the test tube for a green precipitate.',
      detail: 'Inspect the curved bottom of the test tube against adequate light for insoluble green precipitate.'
    }
  ];

  return (
    <div
      className="bg-[#0B132B] border border-slate-700/80 rounded-3xl p-5 sm:p-8 space-y-8 shadow-2xl text-slate-100 max-w-5xl mx-auto"
      id="casein-pi-experiment-page"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          EXPERIMENT TITLE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-b border-slate-700/80 pb-6 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold tracking-wider uppercase">
              First-Year Medical Biochemistry Lab
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-mono">
              Practical Experiment
            </span>
          </div>

          {/* Interactive Protocol Walkthrough Toggle */}
          <button
            type="button"
            onClick={() => {
              setInteractiveMode(!interactiveMode);
              setActiveStep(5);
            }}
            className="text-xs font-mono px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
            <span>{interactiveMode ? 'Show Static Comparison' : 'Simulate Protocol Steps'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <span className="text-emerald-400">Isoelectric Point (pI) Test — Casein</span>
        </h1>
        <p className="text-sm font-semibold text-emerald-300/80 font-arabic">
          اختبار نقطة التعادل الكهربائي (pI) — بروتين الكازين
        </p>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          IMPORTANT INFORMATION TABLE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-3" id="important-information-section">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Info className="w-4 h-4 text-emerald-400" />
          <span>Important Information</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-700/90 bg-slate-900/90 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 border-b border-slate-700 text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6 w-1/3 sm:w-2/5">Parameter / Item</th>
                <th className="py-3 px-4 sm:px-6">Laboratory Specification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Protein tested:</span>
                </td>
                <td className="py-3.5 px-4 sm:px-6 font-bold text-white">
                  Casein
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors bg-slate-950/30">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Approximate pI of casein:</span>
                </td>
                <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-cyan-300">
                  pH 4.6–4.9 <span className="text-slate-400 font-normal text-xs">(approximately 4.9)</span>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Indicator:</span>
                </td>
                <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-300">
                  Bromocresol Green (BCG)
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors bg-slate-950/30">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Acid used:</span>
                </td>
                <td className="py-3.5 px-4 sm:px-6 font-bold text-amber-300">
                  Acetic acid
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Positive result:</span>
                </td>
                <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-400 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500/50" />
                  <span>Green precipitate at the bottom of the test tube</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PREPARATION / PROCEDURE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-3" id="preparation-procedure-section">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Beaker className="w-4 h-4 text-emerald-400" />
            <span>Preparation / Procedure</span>
          </div>
          {interactiveMode && (
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Steps</span>
            </button>
          )}
        </div>

        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-lg">
          {procedureSteps.map(step => {
            const isCurrent = interactiveMode && activeStep === step.stepNumber;
            const isCompleted = !interactiveMode || activeStep >= step.stepNumber;

            return (
              <div
                key={step.stepNumber}
                onClick={() => {
                  if (interactiveMode) setActiveStep(step.stepNumber);
                }}
                className={`flex items-start gap-3.5 p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md shadow-emerald-950/40'
                    : isCompleted
                    ? 'bg-slate-950/60 border-slate-800/80 text-slate-200'
                    : 'bg-slate-950/20 border-slate-800/30 text-slate-500 opacity-60'
                } ${interactiveMode ? 'cursor-pointer hover:border-slate-600' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 border ${
                    isCurrent
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : isCompleted
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  {step.stepNumber}
                </div>

                <div className="space-y-0.5">
                  <div className={`text-sm sm:text-base font-semibold ${isCompleted ? 'text-white' : 'text-slate-500'}`}>
                    {step.title}
                  </div>
                  {interactiveMode && (
                    <div className="text-xs text-slate-400">
                      {step.detail}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {interactiveMode && (
            <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs font-mono">
              <span className="text-slate-400">
                Step {activeStep} of 5
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeStep <= 1}
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={activeStep >= 5}
                  onClick={() => setActiveStep(prev => Math.min(5, prev + 1))}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg font-bold cursor-pointer"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRINCIPLE OF THE TEST
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-3" id="principle-of-test-section">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Principle of the Test</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Acetic acid lowers the pH of the protein solution.
            As the pH approaches the protein’s isoelectric point (pI), the protein has very little net electrical charge and its solubility decreases, resulting in precipitation.
          </p>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 font-medium">
            For casein, the approximate pI is <strong className="text-white font-bold">4.6–4.9</strong>.
          </div>

          {/* Isoelectric Point Mechanism Diagram (pI state) */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Isoelectric Solubility Curve Summary:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs">
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
                <div className="font-mono text-[10px] text-slate-400 font-bold uppercase">pH &gt; pI (Neutral/Alkaline)</div>
                <div className="text-cyan-300 font-bold mt-1">Net Negative Charge</div>
                <div className="text-[11px] text-slate-400 mt-0.5">High solubility (repulsion)</div>
              </div>

              <div className="bg-emerald-950/60 border-2 border-emerald-500/60 p-3 rounded-xl shadow-md shadow-emerald-950/40">
                <div className="font-mono text-[10px] text-emerald-300 font-bold uppercase">pH ≈ pI (4.6 – 4.9)</div>
                <div className="text-emerald-400 font-extrabold mt-1">Net Charge ≈ Zero (0)</div>
                <div className="text-[11px] text-emerald-200 mt-0.5">Minimum Solubility → Precipitation</div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
                <div className="font-mono text-[10px] text-slate-400 font-bold uppercase">pH &lt; pI (Strong Acid)</div>
                <div className="text-amber-300 font-bold mt-1">Net Positive Charge</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Re-solubilization occurs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VISUAL EXPERIMENT (TEST 1 vs TEST 2)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-3" id="visual-experiment-section">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <span>Visual Experiment — Test 1 vs Test 2</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Laboratory Observation Comparison
          </span>
        </div>

        {/* Laboratory Stand & Side-by-Side Tubes */}
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* Glassware Rack Presentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-end justify-center max-w-3xl mx-auto">
            
            {/* ──────────────────────────────────
                TEST 1 — POSITIVE / SUCCESS
            ────────────────────────────────── */}
            <div className="flex flex-col items-center space-y-4 p-4 rounded-2xl bg-slate-950/50 border border-emerald-500/30">
              {/* Header Badge */}
              <div className="text-center space-y-1">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider inline-block">
                  TEST 1 — POSITIVE / SUCCESS
                </span>
                <div className="text-xs text-slate-300 font-medium">
                  Casein solution
                </div>
              </div>

              {/* Realistic Test Tube Graphic with Green Precipitate */}
              <div className="relative flex items-center justify-center py-2">
                {/* Test tube glassware container */}
                <div className="relative w-20 h-64 rounded-b-[40px] border-2 border-slate-400/60 bg-gradient-to-r from-slate-900/40 via-slate-800/20 to-slate-900/40 p-1 flex flex-col justify-end shadow-2xl backdrop-blur-xs overflow-hidden">
                  {/* Glass Lip at Top */}
                  <div className="absolute top-0 inset-x-2 h-2.5 rounded-t-sm border-t-2 border-x-2 border-slate-400/80 bg-slate-300/10" />

                  {/* Volume Graduation Lines on Glass */}
                  <div className="absolute right-2 top-16 flex flex-col gap-3 opacity-30 text-[8px] font-mono select-none">
                    <div className="w-2.5 h-[1px] bg-slate-300" />
                    <div className="w-1.5 h-[1px] bg-slate-300" />
                    <div className="w-2.5 h-[1px] bg-slate-300" />
                    <div className="w-1.5 h-[1px] bg-slate-300" />
                    <div className="w-3.5 h-[1px] bg-slate-300" />
                  </div>

                  {/* Liquid Column (Greenish-teal BCG + Acetic Acid fluid) */}
                  <div
                    className="w-full rounded-b-[36px] relative flex flex-col justify-end transition-all duration-700 overflow-hidden"
                    style={{
                      height: activeStep >= 4 ? '70%' : activeStep >= 2 ? '45%' : '35%',
                      background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.45) 70%, rgba(4, 120, 87, 0.7) 100%)'
                    }}
                  >
                    {/* Meniscus curvature */}
                    <div className="absolute top-0 inset-x-0 h-3 bg-emerald-300/30 rounded-[100%] border-t border-emerald-200/50" />

                    {/* GREEN PRECIPITATE (Accumulated at bottom) */}
                    {(activeStep >= 5 || !interactiveMode) && (
                      <div className="relative w-full h-16 rounded-b-[36px] bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-400/80 flex flex-col items-center justify-end p-2 shadow-inner border-t-2 border-emerald-300/60 animate-in fade-in duration-500">
                        {/* Clumped dense particles texture */}
                        <div className="absolute inset-0 opacity-85 flex flex-wrap gap-1 p-1 items-end justify-center overflow-hidden">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
                          <div className="w-3 h-3 rounded-full bg-emerald-700" />
                          <div className="w-2 h-2 rounded-full bg-emerald-300" />
                          <div className="w-3.5 h-2.5 rounded-full bg-emerald-800" />
                          <div className="w-2 h-3 rounded-full bg-emerald-100" />
                          <div className="w-3 h-3 rounded-full bg-emerald-900" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
                          <div className="w-4 h-2 rounded-full bg-emerald-800" />
                          <div className="w-2 h-2 rounded-full bg-emerald-300" />
                        </div>
                        <div className="relative z-10 text-[9px] font-mono font-extrabold text-slate-950 uppercase tracking-tighter bg-emerald-300/90 px-1.5 py-0.5 rounded shadow-sm">
                          Precipitate
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vertical Glass Specular Highlight */}
                  <div className="absolute top-3 left-2 w-1.5 h-56 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full pointer-events-none" />
                </div>

                {/* Callout Pointer to Green Precipitate */}
                <div className="absolute -right-28 sm:-right-32 bottom-4 flex items-center gap-1.5 z-20">
                  <div className="w-8 h-[2px] bg-emerald-400" />
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg whitespace-nowrap">
                    Green precipitate
                  </div>
                </div>
              </div>

              {/* Prominent Bottom Result Badge */}
              <div className="w-full pt-2 text-center">
                <div className="py-2 px-4 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-lg shadow-emerald-500/20">
                  POSITIVE RESULT
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────
                TEST 2 — NEGATIVE / FAILURE
            ────────────────────────────────── */}
            <div className="flex flex-col items-center space-y-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-700/60">
              {/* Header Badge */}
              <div className="text-center space-y-1">
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider inline-block">
                  TEST 2 — NEGATIVE / FAILURE
                </span>
                <div className="text-xs text-slate-400 font-medium">
                  Solution without visible green precipitate
                </div>
              </div>

              {/* Realistic Test Tube Graphic with No Precipitate */}
              <div className="relative flex items-center justify-center py-2">
                {/* Test tube glassware container */}
                <div className="relative w-20 h-64 rounded-b-[40px] border-2 border-slate-400/60 bg-gradient-to-r from-slate-900/40 via-slate-800/20 to-slate-900/40 p-1 flex flex-col justify-end shadow-2xl backdrop-blur-xs overflow-hidden">
                  {/* Glass Lip at Top */}
                  <div className="absolute top-0 inset-x-2 h-2.5 rounded-t-sm border-t-2 border-x-2 border-slate-400/80 bg-slate-300/10" />

                  {/* Volume Graduation Lines on Glass */}
                  <div className="absolute right-2 top-16 flex flex-col gap-3 opacity-30 text-[8px] font-mono select-none">
                    <div className="w-2.5 h-[1px] bg-slate-300" />
                    <div className="w-1.5 h-[1px] bg-slate-300" />
                    <div className="w-2.5 h-[1px] bg-slate-300" />
                    <div className="w-1.5 h-[1px] bg-slate-300" />
                    <div className="w-3.5 h-[1px] bg-slate-300" />
                  </div>

                  {/* Liquid Column (Uniform clear solution, NO precipitate at bottom) */}
                  <div
                    className="w-full rounded-b-[36px] relative flex flex-col justify-end overflow-hidden"
                    style={{
                      height: '70%',
                      background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.25) 100%)'
                    }}
                  >
                    {/* Meniscus curvature */}
                    <div className="absolute top-0 inset-x-0 h-3 bg-sky-300/30 rounded-[100%] border-t border-sky-200/50" />

                    {/* Clean curved base with ZERO precipitate */}
                    <div className="w-full h-8 rounded-b-[36px] bg-transparent" />
                  </div>

                  {/* Vertical Glass Specular Highlight */}
                  <div className="absolute top-3 left-2 w-1.5 h-56 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full pointer-events-none" />
                </div>

                {/* Callout Pointer to Clean Empty Bottom */}
                <div className="absolute -right-28 sm:-right-32 bottom-4 flex items-center gap-1.5 z-20">
                  <div className="w-8 h-[2px] bg-slate-500" />
                  <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs shadow-lg whitespace-nowrap">
                    No green precipitate
                  </div>
                </div>
              </div>

              {/* Prominent Bottom Result Badge */}
              <div className="w-full pt-2 text-center">
                <div className="py-2 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-md">
                  NEGATIVE RESULT
                </div>
              </div>
            </div>

          </div>

          {/* Laboratory Stand Platform Base */}
          <div className="mt-8 max-w-md mx-auto h-3 bg-slate-700/80 rounded-full shadow-inner border border-slate-600/60 flex items-center justify-center">
            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">
              Biochemistry Practical Rack
            </span>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RESULT AND INTERPRETATION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-3" id="results-interpretation-section">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Result and Interpretation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Positive Result interpretation */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5 shadow-lg">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Positive result:</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pl-6">
              A green precipitate at the bottom indicates that casein has precipitated near its isoelectric point.
            </p>
          </div>

          {/* Negative Result interpretation */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-1.5 shadow-lg">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
              <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Negative result:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
              No visible green precipitate means the expected precipitation was not observed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
