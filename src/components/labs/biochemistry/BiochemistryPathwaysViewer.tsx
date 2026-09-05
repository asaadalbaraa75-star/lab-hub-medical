import React, { useState } from 'react';
import {
  ArrowLeft,
  FlaskConical,
  Zap,
  Activity,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface PathwayStep {
  stepNumber: number;
  substrate: string;
  enzyme: string;
  coFactors: string;
  reactionType: string;
  product: string;
  energyChange: string;
  clinicalRelevance: string;
  chemicalFormula: string;
}

interface MetabolicPathway {
  id: string;
  nameEn: string;
  nameAr: string;
  cellularLocation: string;
  physiologicalRole: string;
  rateLimitingEnzyme: string;
  steps: PathwayStep[];
  clinicalDisorders: {
    disease: string;
    enzymeDeficiency: string;
    hallmark: string;
  }[];
}

const METABOLIC_PATHWAYS: MetabolicPathway[] = [
  {
    id: 'glycolysis',
    nameEn: 'Glycolysis (Embden-Meyerhof-Parnas Pathway)',
    nameAr: 'مسار التحلل السكري (Glycolysis)',
    cellularLocation: 'Cytosol (السيتوبلازم)',
    physiologicalRole: 'Oxidation of 1 Glucose into 2 Pyruvate, yielding net 2 ATP and 2 NADH without oxygen requirement.',
    rateLimitingEnzyme: 'Phosphofructokinase-1 (PFK-1) — Allosterically stimulated by AMP & F-2,6-BP; inhibited by ATP & Citrate.',
    steps: [
      {
        stepNumber: 1,
        substrate: 'D-Glucose',
        enzyme: 'Hexokinase (all cells) / Glucokinase (Liver & Beta cells)',
        coFactors: 'Mg²⁺, ATP → ADP',
        reactionType: 'Irreversible Phosphorylation (Energy Investment)',
        product: 'Glucose-6-Phosphate (G6P)',
        energyChange: '-1 ATP consumed',
        clinicalRelevance: 'Traps glucose inside cell by negative charge. Glucokinase mutation causes MODY2 diabetes.',
        chemicalFormula: 'C₆H₁₂O₆ + ATP → C₆H₁₁O₉P + ADP'
      },
      {
        stepNumber: 2,
        substrate: 'Glucose-6-Phosphate (G6P)',
        enzyme: 'Phosphohexose Isomerase',
        coFactors: 'Mg²⁺',
        reactionType: 'Reversible Isomerization (Aldose to Ketose)',
        product: 'Fructose-6-Phosphate (F6P)',
        energyChange: 'Equilibrium (ΔG ≈ 0)',
        clinicalRelevance: 'Prepares the sugar ring for symmetric cleavage in later steps.',
        chemicalFormula: 'G6P ⇌ F6P'
      },
      {
        stepNumber: 3,
        substrate: 'Fructose-6-Phosphate (F6P)',
        enzyme: 'Phosphofructokinase-1 (PFK-1)',
        coFactors: 'Mg²⁺, ATP → ADP',
        reactionType: 'Key Committed Irreversible Rate-Limiting Step',
        product: 'Fructose-1,6-Bisphosphate (F1,6BP)',
        energyChange: '-1 ATP consumed',
        clinicalRelevance: 'Target of insulin/glucagon regulation via PFK-2/FBPase-2 bi-functional enzyme.',
        chemicalFormula: 'F6P + ATP → F1,6BP + ADP'
      },
      {
        stepNumber: 4,
        substrate: 'Fructose-1,6-Bisphosphate (F1,6BP)',
        enzyme: 'Aldolase A (Muscle) / Aldolase B (Liver)',
        coFactors: 'None required',
        reactionType: 'Aldol Cleavage into two triose phosphates',
        product: 'Glyceraldehyde-3-Phosphate (G3P) + DHAP',
        energyChange: 'Reversible cleavage',
        clinicalRelevance: 'Aldolase B deficiency causes Hereditary Fructose Intolerance (hypoglycemia, jaundice upon sucrose ingestion).',
        chemicalFormula: 'F1,6BP ⇌ G3P + DHAP'
      },
      {
        stepNumber: 5,
        substrate: 'Glyceraldehyde-3-Phosphate (G3P) x2',
        enzyme: 'Glyceraldehyde-3-Phosphate Dehydrogenase (GAPDH)',
        coFactors: 'NAD⁺ + Pi → NADH + H⁺',
        reactionType: 'Oxidation & Phosphorylation',
        product: '1,3-Bisphosphoglycerate (1,3-BPG) x2',
        energyChange: '+2 NADH generated',
        clinicalRelevance: 'Inhibited by Arsenite/Arsenate poisoning, halting anaerobic energy production.',
        chemicalFormula: 'G3P + NAD⁺ + Pi → 1,3-BPG + NADH'
      },
      {
        stepNumber: 6,
        substrate: '1,3-Bisphosphoglycerate (1,3-BPG) x2',
        enzyme: 'Phosphoglycerate Kinase',
        coFactors: 'Mg²⁺, 2 ADP → 2 ATP',
        reactionType: '1st Substrate-Level Phosphorylation',
        product: '3-Phosphoglycerate (3-PG) x2',
        energyChange: '+2 ATP produced (breaks even)',
        clinicalRelevance: 'Generates high-energy ATP directly without electron transport chain.',
        chemicalFormula: '1,3-BPG + ADP → 3-PG + ATP'
      },
      {
        stepNumber: 7,
        substrate: 'Phosphoenolpyruvate (PEP) x2',
        enzyme: 'Pyruvate Kinase (PK)',
        coFactors: 'Mg²⁺, K⁺, 2 ADP → 2 ATP',
        reactionType: '2nd Substrate-Level Phosphorylation (Irreversible)',
        product: 'Pyruvate (CH₃-CO-COO⁻) x2',
        energyChange: '+2 ATP produced (Net +2 ATP)',
        clinicalRelevance: 'Pyruvate Kinase deficiency is the 2nd most common cause of hereditary hemolytic anemia (after G6PD).',
        chemicalFormula: 'PEP + ADP → Pyruvate + ATP'
      }
    ],
    clinicalDisorders: [
      {
        disease: 'Pyruvate Kinase Deficiency',
        enzymeDeficiency: 'Erythrocyte Pyruvate Kinase (PK)',
        hallmark: 'Autosomal recessive chronic hemolytic anemia, jaundice, splenomegaly, elevated 2,3-BPG.'
      },
      {
        disease: 'Lactic Acidosis (Metabolic)',
        enzymeDeficiency: 'Impaired Pyruvate Dehydrogenase or severe tissue hypoxia',
        hallmark: 'Serum lactate > 5 mmol/L, anion gap metabolic acidosis, hyperventilation (Kussmaul breathing).'
      }
    ]
  },
  {
    id: 'carbohydrate_tests',
    nameEn: 'Qualitative Clinical Laboratory Carbohydrate Assays',
    nameAr: 'الفحوصات المعملية النوعية للسكريات',
    cellularLocation: 'Clinical Laboratory Tube Titration (أنبوب الاختبار)',
    physiologicalRole: 'Differential diagnostic protocol distinguishing monosaccharides, reducing disaccharides, ketoses, and polysaccharides.',
    rateLimitingEnzyme: 'Cupric Reduction (Cu²⁺ → Cu₂O) & Acid Dehydration',
    steps: [
      {
        stepNumber: 1,
        substrate: 'Any Carbohydrate Solution',
        enzyme: 'Molisch Test: Concentrated H₂SO₄ + α-naphthol',
        coFactors: 'Room temp underlayering',
        reactionType: 'Acid dehydration forming Furfural + condensation',
        product: 'Intense Purple / Violet Ring at interface',
        energyChange: 'Exothermic acid dehydration',
        clinicalRelevance: 'Universal screening test. Negative Molisch rules out carbohydrate presence completely.',
        chemicalFormula: 'Pentose/Hexose + H₂SO₄ → Furfural + α-naphthol → Violet dye'
      },
      {
        stepNumber: 2,
        substrate: 'Polysaccharides (Starch, Dextrin, Glycogen)',
        enzyme: "Lugol's Iodine Reagent (I₂/KI)",
        coFactors: 'Cold neutral or acidic pH',
        reactionType: 'Physical Helical Coordination Complex',
        product: 'Deep Navy Blue (Starch) / Reddish-Brown (Glycogen)',
        energyChange: 'Color disappears upon boiling, returns on cooling',
        clinicalRelevance: 'Detects salivary amylase digestion stages in digestion practical exams.',
        chemicalFormula: 'Amylose helix + I₅⁻ polyiodide → Intense Blue complex'
      },
      {
        stepNumber: 3,
        substrate: 'Reducing Sugars in Weak Acid (Mono vs Di)',
        enzyme: "Barfoed's Reagent: Cupric acetate in 1% acetic acid",
        coFactors: 'Boiling water bath strictly 3 minutes',
        reactionType: 'Acidic Cupric Reduction (Monosaccharides react faster)',
        product: 'Red Cuprous Oxide (Cu₂O) precipitate at bottom within 3 min',
        energyChange: 'Boiling 100°C for 3 min',
        clinicalRelevance: 'Differentiates Glucose/Fructose/Galactose (positive <3 min) from Maltose/Lactose (>10 min).',
        chemicalFormula: 'R-CHO + 2 Cu²⁺ (acidic) → R-COOH + Cu₂O ↓ (red)'
      },
      {
        stepNumber: 4,
        substrate: 'Ketohexoses (Fructose in Honey/Semen)',
        enzyme: "Seliwanoff's Reagent: Resorcinol in 3M HCl",
        coFactors: 'Boiling water bath strictly 1 minute',
        reactionType: 'Rapid furfural formation from ketose',
        product: 'Cherry-Red Precipitate within 60 seconds',
        energyChange: 'Boiling 100°C for 1 min',
        clinicalRelevance: 'Differentiates Fructose (Cherry Red <1 min) from Glucose (Faint pink only after >5 min). Essential in seminal analysis.',
        chemicalFormula: 'Fructose + HCl → 5-HMF + Resorcinol → Cherry-red complex'
      },
      {
        stepNumber: 5,
        substrate: 'Reducing Sugars in Alkaline Medium',
        enzyme: "Benedict's Reagent: CuSO₄ + Na₂CO₃ + Sodium Citrate",
        coFactors: 'Boiling 3-5 minutes',
        reactionType: 'Enediol formation & Alkaline Cupric Reduction',
        product: 'Graded Precipitate: Blue (Neg) → Green (1+) → Yellow (2+) → Orange (3+) → Brick-Red (4+)',
        energyChange: 'Boiling 100°C for 3 min',
        clinicalRelevance: 'Historically used for urine glucose screening in diabetes mellitus; detects inborn errors of galactosemia.',
        chemicalFormula: 'Reducing sugar + Cu²⁺ (alkaline) → Cu₂O ↓ (brick red precipitate)'
      }
    ],
    clinicalDisorders: [
      {
        disease: 'Classic Galactosemia',
        enzymeDeficiency: 'Galactose-1-Phosphate Uridyltransferase (GALT)',
        hallmark: 'Positive urine Benedict with negative glucose dipstick; infantile cataracts, hepatomegaly, failure to thrive.'
      },
      {
        disease: 'Essential Fructosuria',
        enzymeDeficiency: 'Fructokinase (Benign condition)',
        hallmark: 'Asymptomatic fructose excreted in urine; positive Benedict and positive Seliwanoff test in urine.'
      }
    ]
  }
];

export const BiochemistryPathwaysViewer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedPathway, setSelectedPathway] = useState<MetabolicPathway>(METABOLIC_PATHWAYS[0]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  const activeStep = selectedPathway.steps[activeStepIndex] || selectedPathway.steps[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right select-none" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Lippincott & Harper's Illustrated Biochemistry
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              المختبر الجزيئي والمسارات الأيضية (Molecular & Metabolic Pathways)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              المسارات التفاعلية خطوة بخطوة: الركيزة (Substrate) → الإنزيم (Enzyme) → الناتج (Product) والأهمية السريرية
            </p>
          </div>
        </div>

        {/* Pathway Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 self-start sm:self-auto">
          {METABOLIC_PATHWAYS.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setSelectedPathway(p);
                setActiveStepIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedPathway.id === p.id
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>{p.nameAr.split('(')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pathway Overview Bar */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0E0C1E] via-[#120D1A] to-[#0A121E] border border-amber-500/30 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">الموقع الخلوي (Location)</span>
          <span className="text-sm font-bold text-white">{selectedPathway.cellularLocation}</span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">الإنزيم المحدد للسرعة (Rate-Limiting)</span>
          <span className="text-xs font-semibold text-slate-300 leading-snug">{selectedPathway.rateLimitingEnzyme}</span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">الحصيلة الفسيولوجية (Yield)</span>
          <span className="text-xs text-slate-300 leading-snug">{selectedPathway.physiologicalRole}</span>
        </div>
      </div>

      {/* MAIN STEP-BY-STEP CASCADE STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              خطوات التفاعل ({selectedPathway.steps.length} Steps)
            </h3>
            <span className="text-[11px] font-mono text-amber-400">Step {activeStepIndex + 1} of {selectedPathway.steps.length}</span>
          </div>

          <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
            {selectedPathway.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer text-right group ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border-amber-500/80 shadow-lg shadow-amber-900/30'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-amber-500/30 text-amber-300' : 'bg-black/30 text-slate-400'
                    }`}>
                      {step.energyChange}
                    </span>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-white/10 text-slate-300 text-[11px] flex items-center justify-center font-mono">
                        {step.stepNumber}
                      </span>
                      <span>{step.substrate}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-300/80 font-mono mt-1 truncate">→ {step.product}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Reaction Simulator Card (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Reaction Visual Flow Container */}
          <div className="relative p-6 sm:p-8 rounded-3xl glass-card border border-amber-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300">
                  Step {activeStep.stepNumber}: {activeStep.reactionType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs font-bold text-white transition cursor-pointer"
                >
                  السابق
                </button>
                <button
                  type="button"
                  disabled={activeStepIndex === selectedPathway.steps.length - 1}
                  onClick={() => setActiveStepIndex(prev => Math.min(selectedPathway.steps.length - 1, prev + 1))}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-30 text-xs font-bold text-white transition cursor-pointer"
                >
                  التالي
                </button>
              </div>
            </div>

            {/* Visual Molecular Conversion Schema */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-center">
                {/* 1. Substrate Box */}
                <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-500/30 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-blue-300">الركيزة المبدئية (Substrate)</span>
                  <h4 className="text-base font-black text-white">{activeStep.substrate}</h4>
                </div>

                {/* 2. Enzyme Catalyst Center */}
                <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 space-y-1 relative">
                  <span className="text-[10px] font-mono uppercase text-amber-300">الإنزيم الحفاز (Enzyme)</span>
                  <h4 className="text-sm font-black text-amber-200">{activeStep.enzyme}</h4>
                  <span className="text-[10px] text-slate-400 block font-mono">Co-factors: {activeStep.coFactors}</span>
                </div>

                {/* 3. Product Box */}
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-emerald-300">الناتج التفاعلي (Product)</span>
                  <h4 className="text-base font-black text-white">{activeStep.product}</h4>
                </div>
              </div>

              {/* Chemical Formula & Energy */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <span className="text-slate-300">المعادلة: <span className="text-cyan-300">{activeStep.chemicalFormula}</span></span>
                <span className="text-amber-400 bg-amber-950/80 px-3 py-1 rounded-lg border border-amber-500/30 self-start sm:self-auto">
                  {activeStep.energyChange}
                </span>
              </div>
            </div>

            {/* High-Yield Clinical Relevance for this step */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30 space-y-1.5">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                الأهمية السريرية وأسئلة الامتحانات (Clinical Correlation & Pearls):
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {activeStep.clinicalRelevance}
              </p>
            </div>
          </div>

          {/* Clinical Inborn Errors of Metabolism Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              الأمراض الوراثية ونقص الإنزيمات المرتبطة بالمسار (Inborn Errors of Metabolism):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedPathway.clinicalDisorders.map((disorder, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400">{disorder.disease}</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <p className="text-[11px] text-amber-300 font-mono">Deficiency: {disorder.enzymeDeficiency}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">{disorder.hallmark}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
