import React, { useState } from 'react';
import { ProteinExperimentVideoSection } from './ProteinExperimentVideoSection';
import {
  TestTube,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Shield,
  Beaker,
  Thermometer,
  Layers,
  ChevronRight,
  Droplet
} from 'lucide-react';

export interface ProteinExperiment {
  id: string;
  orderNumber: string;
  code: string;
  titleEn: string;
  titleAr: string;
  targetMolecule: string;
  colorTheme: string;
  goal: string;
  principle: string;
  importantValue?: string;
  procedureSteps: {
    stepNumber: number;
    title: string;
    instruction: string;
    detail: string;
    actionText: string;
    visualPhase: 'initial' | 'adding_reagent' | 'heating' | 'acid_added' | 'settling' | 'result';
  }[];
  observation: string;
  positiveResult: {
    visualDescription: string;
    clinicalMeaning: string;
  };
  negativeResult: {
    visualDescription: string;
    clinicalMeaning: string;
  };
  controls?: {
    positiveControl: string;
    negativeControl: string;
  };
  highYield: string;
  memoryTrick: string;
  safety: string;
  quizQuestion: {
    prompt: string;
    promptAr?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const PROTEIN_EXPERIMENTS: ProteinExperiment[] = [
  // 1. TEST 01: Biuret test
  {
    id: 'test_biuret',
    orderNumber: 'TEST 01',
    code: 'BIURET',
    titleEn: 'Biuret Test',
    titleAr: 'اختبار البيوريت للكشف عن الروابط الببتيدية',
    targetMolecule: 'Peptide Bonds (≥ 2 peptide bonds in tripeptides and proteins)',
    colorTheme: 'purple',
    goal: 'Detection of peptide bonds (tripeptides and proteins) in biological specimens.',
    principle:
      'In an alkaline solution (10% NaOH), cupric ions (Cu²⁺) from dilute cupric sulfate coordinate with the unshared electron pairs of nitrogen atoms in adjacent peptide bonds, forming a deep violet/purple colored coordination complex. A minimum of two peptide bonds (tripeptide or larger) is required for a positive reaction.',
    importantValue: 'Minimum requirement: ≥ 2 peptide bonds (Free amino acids & dipeptides give negative).',
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Add Protein Sample',
        instruction: 'Add 2 mL of protein solution (Egg Albumin or Peptone) into a clean, dry test tube.',
        detail: 'Sample contains intact polypeptide chains with abundant peptide bonds.',
        actionText: 'Dispense 2 mL Protein Solution',
        visualPhase: 'initial'
      },
      {
        stepNumber: 2,
        title: 'Alkalinize with NaOH',
        instruction: 'Add 2 mL of 10% Sodium Hydroxide (NaOH) and mix thoroughly.',
        detail: 'The alkaline pH deprotonates the amide nitrogens of the peptide bonds.',
        actionText: 'Add 2 mL 10% NaOH',
        visualPhase: 'adding_reagent'
      },
      {
        stepNumber: 3,
        title: 'Add Dilute Copper Sulfate',
        instruction: 'Add 4 to 5 drops of 0.5% CuSO₄ reagent and gently invert the tube.',
        detail: 'Cu²⁺ ions coordinate with four peptide nitrogens to assemble the coordination complex.',
        actionText: 'Add 4 Drops 0.5% CuSO₄',
        visualPhase: 'settling'
      },
      {
        stepNumber: 4,
        title: 'Observe Color Transition',
        instruction: 'Observe the instantaneous chromatic transition from pale blue to royal violet.',
        detail: 'Intensity of the violet hue is directly proportional to the number of peptide bonds.',
        actionText: 'Record Final Color',
        visualPhase: 'result'
      }
    ],
    observation: 'The solution turns from pale blue to a vivid, homogeneous violet/purple color.',
    positiveResult: {
      visualDescription: 'Vivid violet/purple colored solution.',
      clinicalMeaning: 'Positive: Detection of peptide bonds (Protein/Polypeptide present).'
    },
    negativeResult: {
      visualDescription: 'Solution remains light blue (color of Cu²⁺ without complexation).',
      clinicalMeaning: 'Negative: Absence of intact peptide bonds (Free amino acids or dipeptides).'
    },
    controls: {
      positiveControl: 'Egg Albumin or Casein (Violet)',
      negativeControl: 'Distilled Water or Glycine (Light Blue)'
    },
    highYield: '≥ 2 peptide bonds = Violet color. Free amino acids and dipeptides DO NOT form the complex.',
    memoryTrick: 'Biuret = Bi (Two) peptide bonds minimum → Royal Violet complex!',
    safety: 'NaOH is strongly alkaline and caustic. Wash immediately with water if skin contact occurs.',
    quizQuestion: {
      prompt: 'Why does a solution of free amino acids (like glycine) give a negative Biuret test result?',
      promptAr: 'لماذا يعطي محلول الأحماض الأمينية الحرة (مثل الجلايسين) نتيجة سلبية لاختبار البيوريت؟',
      options: [
        'Because Biuret test requires at least two peptide bonds (tripeptide or larger) to coordinate Cu²⁺ ions',
        'Because free amino acids are insolubilized by sodium hydroxide',
        'Because glycine contains an indole ring that hydrolyzes copper sulfate',
        'Because free amino acids have a neutral isoelectric point'
      ],
      correctIndex: 0,
      explanation:
        'Correct! The Biuret reaction requires Cu²⁺ ions to coordinate with at least 4 nitrogen atoms from adjacent peptide linkages. Hence, a molecule must possess a minimum of two peptide bonds. Free amino acids and dipeptides lack this requirement.'
    }
  },

  // 2. TEST 02: Isoelectric Point test (pI)
  {
    id: 'test_isoelectric',
    orderNumber: 'TEST 02',
    code: 'pI CASEIN',
    titleEn: 'Isoelectric Point Test (pI) — Casein',
    titleAr: 'اختبار نقطة التعادل الكهربائي — ترسيب الكازين',
    targetMolecule: 'Casein (Milk Phosphoprotein)',
    colorTheme: 'emerald',
    goal: 'Detection and isolation of Casein via precipitation at its isoelectric point.',
    principle:
      'At its isoelectric point (pI), the net electrical charge of casein is zero (Zwitterion state). The absence of electrostatic repulsion between protein molecules allows hydrophobic interactions to predominate, dramatically lowering solubility and causing maximum precipitation.',
    importantValue: 'Casein isoelectric point ≈ pH 4.6–4.9.',
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Measure Casein Sample',
        instruction: 'Add 3 mL of dilute Casein in sodium hydroxide solution into the test tube.',
        detail: 'In alkaline pH, casein carries net negative charge and remains completely soluble.',
        actionText: 'Dispense 3 mL Casein Solution',
        visualPhase: 'initial'
      },
      {
        stepNumber: 2,
        title: 'Add Dilute Acetic Acid Dropwise',
        instruction: 'Add dilute acetic acid dropwise (approx. 3–5 drops) to lower pH towards 4.7.',
        detail: 'Protons titrate negatively charged carboxylate groups until net charge reaches zero.',
        actionText: 'Add 4 Drops Dilute Acetic Acid',
        visualPhase: 'adding_reagent'
      },
      {
        stepNumber: 3,
        title: 'Gently Agitate and Observe Turbidity',
        instruction: 'Gently swirl the tube. Observe micro-aggregates forming as solubility reaches minimum.',
        detail: 'Neutralized casein monomers aggregate into flocculent curds.',
        actionText: 'Swirl Tube for 30 Seconds',
        visualPhase: 'settling'
      },
      {
        stepNumber: 4,
        title: 'Sedimentation of Precipitate',
        instruction: 'Allow the tube to stand upright for 2 minutes to let the precipitate settle.',
        detail: 'A distinct green-tinted/curdy precipitate settles densely at the bottom.',
        actionText: 'Observe Settled Precipitate',
        visualPhase: 'result'
      }
    ],
    observation: 'A distinct green-tinted precipitate forms and settles at the bottom of the test tube.',
    positiveResult: {
      visualDescription: 'Dense green-tinted curdy precipitate aggregated at the bottom of the tube.',
      clinicalMeaning: 'Casein detected (Precipitated at its isoelectric point pH 4.6–4.9).'
    },
    negativeResult: {
      visualDescription: 'No precipitate forms; tube remains completely homogeneous and transparent.',
      clinicalMeaning: 'Casein not detected or pH has drifted away from the isoelectric point.'
    },
    highYield: 'Green precipitate at the bottom = Casein positive. Maximum precipitation occurs strictly at pI (pH 4.6–4.9).',
    memoryTrick: 'Casein → Isoelectric point (pI 4.7) → Zero Net Charge → Low solubility → Green Precipitation!',
    safety: 'Wear protective gloves. Dilute acetic acid causes mild eye and respiratory irritation if splashed.',
    quizQuestion: {
      prompt: 'At what pH range does Casein exhibit its lowest solubility and maximum precipitation?',
      promptAr: 'عند أي قيمة تقريبية للرقم الهيدروجيني (pH) يترسب الكازين بسبب انعدام الشحنة الكهربائية؟',
      options: [
        'pH 4.6 – 4.9 (Casein Isoelectric Point)',
        'pH 1.0 – 2.0 (Gastric Acidity)',
        'pH 7.4 (Physiological Blood pH)',
        'pH 9.5 – 10.5 (Alkaline Medium)'
      ],
      correctIndex: 0,
      explanation:
        'Correct! Casein has an isoelectric point (pI) of approximately 4.6 to 4.9. At this specific pH, positive and negative charges balance out, eliminating electrostatic repulsion and precipitating the protein.'
    }
  },

  // 3. TEST 03: Heat and acetic acid test
  {
    id: 'test_heat_acetic',
    orderNumber: 'TEST 03',
    code: 'HEAT & ACID',
    titleEn: 'Heat & Acetic Acid Test — Albumin',
    titleAr: 'اختبار الحرارة وحمض الخليك — الكشف عن الألبومين',
    targetMolecule: 'Albumin (Urine Protein / Serum Albumin)',
    colorTheme: 'amber',
    goal: 'Detection of Albumin (Proteinuria diagnostic screening).',
    principle:
      'Heating causes thermal denaturation and irreversible coagulation of protein molecules. Subsequent addition of dilute acetic acid dissolves non-protein turbidity (such as calcium phosphates and carbonates) while persistent protein coagulate remains intact.',
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Dispense Urine Sample',
        instruction: 'Add 4 mL of urine or test sample into a Pyrex test tube.',
        detail: 'Standard initial volume ensures adequate column height for temperature stratification.',
        actionText: 'Dispense 4 mL Urine Sample',
        visualPhase: 'initial'
      },
      {
        stepNumber: 2,
        title: 'Thermal Coagulation in Water Bath',
        instruction: 'Place test tube in a boiling water bath (or heat upper third) for 3 minutes.',
        detail: 'Heat disrupts hydrogen bonds and hydrophobic interactions, denaturing albumin.',
        actionText: 'Apply Heat (3 Minutes)',
        visualPhase: 'heating'
      },
      {
        stepNumber: 3,
        title: 'Observe Cloudy Coagulate & Cool',
        instruction: 'Remove tube and inspect the upper column for dense cloudy coagulum, then allow to cool.',
        detail: 'Cloudiness may be caused by either albumin coagulate or precipitated phosphates.',
        actionText: 'Cool to Room Temperature',
        visualPhase: 'settling'
      },
      {
        stepNumber: 4,
        title: 'Add Dilute Acetic Acid & Confirm',
        instruction: 'Add exactly 3 drops of dilute acetic acid and observe persistence of turbidity.',
        detail: 'Phosphates and carbonates clear immediately in acid. Albumin coagulate persists.',
        actionText: 'Add 3 Drops Acetic Acid',
        visualPhase: 'result'
      }
    ],
    observation: 'A cloudy white coagulate persists firmly after cooling and addition of 3 drops of acetic acid.',
    positiveResult: {
      visualDescription: 'Cloudy coagulate persists without clearing after cooling and acetic acid.',
      clinicalMeaning: 'Albumin detected (Indicates clinical Proteinuria).'
    },
    negativeResult: {
      visualDescription: 'No coagulate forms, or cloudiness completely dissolves upon acid addition.',
      clinicalMeaning: 'Albumin not detected (Initial cloudiness was likely amorphous phosphates/carbonates).'
    },
    highYield: 'Persistent coagulation after cooling + acetic acid = Albumin positive.',
    memoryTrick: 'Heat denatures, Acetic acid proves: Phosphates dissolve, Albumin stays!',
    safety: 'Hot liquids can boil over abruptly. Always point the mouth of the test tube away from anyone.',
    quizQuestion: {
      prompt: 'What is the primary diagnostic purpose of adding 3 drops of dilute acetic acid after heating?',
      promptAr: 'ما هو الهدف التشخيصي الأساسي من إضافة 3 قطرات من حمض الخليك بعد التسخين؟',
      options: [
        'To dissolve non-protein precipitates (phosphates/carbonates) and confirm true Albumin coagulation',
        'To hydrolyze albumin into free amino acids',
        'To oxidize sulfur atoms in cysteine residues',
        'To neutralize copper ions from the Biuret reagent'
      ],
      correctIndex: 0,
      explanation:
        'Correct! Phosphates and carbonates also precipitate upon heating in alkaline urine, creating false turbidity. Adding acetic acid acidifies the medium, instantly dissolving phosphates while true denatured albumin coagulate remains insoluble.'
    }
  },

  // 4. TEST 04: Hopkins-Cole test
  {
    id: 'test_hopkins_cole',
    orderNumber: 'TEST 04',
    code: 'HOPKINS-COLE',
    titleEn: 'Hopkins–Cole Test — Tryptophan',
    titleAr: 'اختبار هوبكنز-كول — الكشف عن التربتوفان (حلقة الإندول)',
    targetMolecule: 'Tryptophan (Indole ring containing amino acid)',
    colorTheme: 'indigo',
    goal: 'Detection of Tryptophan in intact proteins and peptones.',
    principle:
      'The indole ring of tryptophan condenses with glyoxylic acid in the presence of concentrated sulfuric acid (H₂SO₄), generating a distinct violet/purple colored ring at the interface between the two liquid phases.',
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Add Protein Solution',
        instruction: 'Pipette 1 mL of unknown sample (or Peptone solution) into a clean, dry tube.',
        detail: 'Sample must contain proteins with tryptophan residues.',
        actionText: 'Dispense 1 mL Sample',
        visualPhase: 'initial'
      },
      {
        stepNumber: 2,
        title: 'Add Glyoxylic Acid Reagent',
        instruction: 'Add 1 mL of Hopkins–Cole reagent (containing glyoxylic acid) and mix gently.',
        detail: 'Provides the aldehyde group required to condense with the indole nucleus.',
        actionText: 'Add 1 mL Glyoxylic Acid',
        visualPhase: 'adding_reagent'
      },
      {
        stepNumber: 3,
        title: 'Carefully Underlay Concentrated H₂SO₄',
        instruction: 'Incline the test tube at 45° and slowly trickle 1 mL concentrated H₂SO₄ down the side.',
        detail: 'Heavy concentrated sulfuric acid sinks to form a distinct dense bottom layer without mixing.',
        actionText: 'Slowly Add 1 mL Conc. H₂SO₄ Down the Side',
        visualPhase: 'settling'
      },
      {
        stepNumber: 4,
        title: 'Examine Interface for Violet Ring',
        instruction: 'Hold the tube vertical without agitation and observe the junction between the two layers.',
        detail: 'The condensation pigment accumulates exclusively at the contact interface.',
        actionText: 'Inspect Phase Interface',
        visualPhase: 'result'
      }
    ],
    observation: 'A sharp, vibrant violet/purple ring appears at the interface of the two liquid layers.',
    positiveResult: {
      visualDescription: 'Distinct violet/purple colored ring formed at the liquid-liquid boundary.',
      clinicalMeaning: 'Tryptophan present (Indole-containing protein confirmed).'
    },
    negativeResult: {
      visualDescription: 'No violet ring forms at the interface; junction remains clear or yellowish.',
      clinicalMeaning: 'Tryptophan not detected (Protein lacks tryptophan, e.g., Gelatin).'
    },
    controls: {
      positiveControl: 'Peptone or Albumin (Forms violet ring)',
      negativeControl: 'Gelatin (Lacks tryptophan → Negative)'
    },
    highYield: 'Violet ring at interface = Tryptophan positive. Gelatin lacks tryptophan and serves as negative control.',
    memoryTrick: 'Hopkins–Cole → Violet ring on the border → Tryptophan Indole order!',
    safety: 'CRITICAL: Concentrated H₂SO₄ is severely corrosive and exothermic. Always incline tube and run slowly down wall. Wear safety goggles.',
    quizQuestion: {
      prompt: 'Which protein serves as a classic negative control for the Hopkins–Cole test because it lacks Tryptophan?',
      promptAr: 'أي من البروتينات التالية يُعتبر ضابطاً سلبياً شهيراً في اختبار هوبكنز-كول لافتقاره لحمض التربتوفان؟',
      options: [
        'Gelatin (Deficient in Tryptophan)',
        'Peptone (Rich in Tryptophan)',
        'Egg Albumin (Abundant Tryptophan)',
        'Casein (Contains all essential amino acids)'
      ],
      correctIndex: 0,
      explanation:
        'Correct! Gelatin is an incomplete protein derived from collagen that lacks tryptophan. Consequently, it gives a completely negative Hopkins–Cole test (no violet ring), making it the standard negative control.'
    }
  }
];

export const ProteinTestsInteractiveLab: React.FC = () => {
  const [activeExpIndex, setActiveExpIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [hasObservedResult, setHasObservedResult] = useState<boolean>(false);
  const [quizWrittenInput, setQuizWrittenInput] = useState<string>('');
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean>(false);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState<boolean>(false);

  const currentExp = PROTEIN_EXPERIMENTS[activeExpIndex];
  const totalSteps = currentExp.procedureSteps.length;
  const currentStep = currentExp.procedureSteps[currentStepIndex];

  const handleSelectExp = (index: number) => {
    setActiveExpIndex(index);
    setCurrentStepIndex(0);
    setHasObservedResult(false);
    setQuizWrittenInput('');
    setIsQuizCorrect(false);
    setHasCheckedAnswer(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setHasObservedResult(true);
    }
  };

  const handleResetExperiment = () => {
    setCurrentStepIndex(0);
    setHasObservedResult(false);
    setQuizWrittenInput('');
    setIsQuizCorrect(false);
    setHasCheckedAnswer(false);
  };

  // Helper for virtual tube visuals
  const renderVirtualTestTube = () => {
    const isFinished = hasObservedResult || currentStepIndex === totalSteps - 1;

    switch (currentExp.id) {
      case 'test_biuret':
        return (
          <div className="relative w-28 h-64 mx-auto flex flex-col items-center">
            {/* Tube Opening */}
            <div className="w-20 h-4 rounded-full border-2 border-slate-400 bg-slate-200/20 backdrop-blur-sm z-20 shadow-inner" />
            {/* Glass Tube Body */}
            <div className="relative w-16 h-56 -mt-2 rounded-b-full border-x-2 border-b-2 border-slate-400/60 bg-gradient-to-r from-white/10 via-transparent to-white/5 backdrop-blur-md overflow-hidden flex flex-col justify-end shadow-2xl">
              {/* Measurement Markings */}
              <div className="absolute right-1 top-6 bottom-10 flex flex-col justify-between text-[8px] font-mono text-slate-500/80 pointer-events-none">
                <span>— 4 mL</span>
                <span>— 3 mL</span>
                <span>— 2 mL</span>
                <span>— 1 mL</span>
              </div>

              {/* Liquid Column */}
              <div
                className={`w-full transition-all duration-700 relative rounded-b-full ${
                  currentStepIndex === 0
                    ? 'h-16 bg-amber-100/40'
                    : currentStepIndex === 1
                    ? 'h-28 bg-sky-100/50'
                    : currentStepIndex === 2
                    ? 'h-36 bg-indigo-400/60 animate-pulse'
                    : 'h-40 bg-gradient-to-t from-purple-800 via-fuchsia-700 to-purple-600 shadow-[0_0_25px_rgba(168,85,247,0.7)]'
                }`}
              >
                {/* Surface Meniscus */}
                <div className="absolute top-0 inset-x-0 h-2 bg-white/30 rounded-full blur-[1px]" />
                {/* Internal Reaction Highlights */}
                {isFinished && (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/20 animate-pulse" />
                )}
              </div>
            </div>
            {/* Base Reflection */}
            <div className="w-20 h-2 mt-1 rounded-full bg-slate-900/60 blur-sm" />
          </div>
        );

      case 'test_isoelectric':
        return (
          <div className="relative w-28 h-64 mx-auto flex flex-col items-center">
            <div className="w-20 h-4 rounded-full border-2 border-slate-400 bg-slate-200/20 backdrop-blur-sm z-20 shadow-inner" />
            <div className="relative w-16 h-56 -mt-2 rounded-b-full border-x-2 border-b-2 border-slate-400/60 bg-gradient-to-r from-white/10 via-transparent to-white/5 backdrop-blur-md overflow-hidden flex flex-col justify-end shadow-2xl">
              <div className="absolute right-1 top-6 bottom-10 flex flex-col justify-between text-[8px] font-mono text-slate-500/80 pointer-events-none">
                <span>— 4 mL</span>
                <span>— 3 mL</span>
                <span>— 2 mL</span>
                <span>— 1 mL</span>
              </div>

              {/* Liquid Column */}
              <div
                className={`w-full transition-all duration-700 relative rounded-b-full ${
                  currentStepIndex === 0
                    ? 'h-24 bg-slate-200/30'
                    : currentStepIndex === 1
                    ? 'h-28 bg-emerald-100/40'
                    : currentStepIndex === 2
                    ? 'h-32 bg-emerald-200/50'
                    : 'h-32 bg-emerald-50/20'
                }`}
              >
                <div className="absolute top-0 inset-x-0 h-2 bg-white/30 rounded-full blur-[1px]" />
                
                {/* Settled Green Precipitate at the Bottom */}
                {(currentStepIndex >= 2 || isFinished) && (
                  <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-emerald-700 via-green-600 to-emerald-500 rounded-b-full border-t border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.8)]">
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    <span className="absolute bottom-1 inset-x-0 text-center text-[7px] font-black text-emerald-950 uppercase tracking-tighter">
                      Precipitate
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-20 h-2 mt-1 rounded-full bg-slate-900/60 blur-sm" />
          </div>
        );

      case 'test_heat_acetic':
        return (
          <div className="relative w-28 h-64 mx-auto flex flex-col items-center">
            <div className="w-20 h-4 rounded-full border-2 border-slate-400 bg-slate-200/20 backdrop-blur-sm z-20 shadow-inner" />
            <div className="relative w-16 h-56 -mt-2 rounded-b-full border-x-2 border-b-2 border-slate-400/60 bg-gradient-to-r from-white/10 via-transparent to-white/5 backdrop-blur-md overflow-hidden flex flex-col justify-end shadow-2xl">
              <div className="absolute right-1 top-6 bottom-10 flex flex-col justify-between text-[8px] font-mono text-slate-500/80 pointer-events-none">
                <span>— 4 mL</span>
                <span>— 3 mL</span>
                <span>— 2 mL</span>
                <span>— 1 mL</span>
              </div>

              {/* Liquid Column */}
              <div
                className={`w-full transition-all duration-700 relative rounded-b-full ${
                  currentStepIndex === 0
                    ? 'h-32 bg-amber-100/30'
                    : currentStepIndex === 1
                    ? 'h-32 bg-gradient-to-t from-amber-200/50 to-orange-400/40 animate-pulse'
                    : 'h-36 bg-amber-50/20'
                }`}
              >
                <div className="absolute top-0 inset-x-0 h-2 bg-white/30 rounded-full blur-[1px]" />

                {/* Persistent Cloudy Coagulate Upper and Lower */}
                {(currentStepIndex >= 1 || isFinished) && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] rounded-b-full flex flex-col items-center justify-center space-y-1">
                    <div className="w-12 h-6 rounded-full bg-white/90 shadow-inner border border-slate-200/60 blur-[0.5px]" />
                    <div className="w-10 h-8 rounded-full bg-white/80 shadow-md blur-[0.5px]" />
                    <span className="text-[7px] font-bold text-slate-700 tracking-tight">
                      Persistent Coagulum
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Heat glow indicator if in heating step */}
            {currentStepIndex === 1 && (
              <div className="absolute -bottom-2 inset-x-0 flex items-center justify-center text-amber-500 animate-bounce">
                <Flame className="w-6 h-6 fill-amber-500" />
              </div>
            )}
            <div className="w-20 h-2 mt-1 rounded-full bg-slate-900/60 blur-sm" />
          </div>
        );

      case 'test_hopkins_cole':
        return (
          <div className="relative w-28 h-64 mx-auto flex flex-col items-center">
            <div className="w-20 h-4 rounded-full border-2 border-slate-400 bg-slate-200/20 backdrop-blur-sm z-20 shadow-inner" />
            <div className="relative w-16 h-56 -mt-2 rounded-b-full border-x-2 border-b-2 border-slate-400/60 bg-gradient-to-r from-white/10 via-transparent to-white/5 backdrop-blur-md overflow-hidden flex flex-col justify-end shadow-2xl">
              <div className="absolute right-1 top-6 bottom-10 flex flex-col justify-between text-[8px] font-mono text-slate-500/80 pointer-events-none">
                <span>— 4 mL</span>
                <span>— 3 mL</span>
                <span>— 2 mL</span>
                <span>— 1 mL</span>
              </div>

              {/* Lower Layer (Conc. H2SO4) */}
              <div
                className={`w-full transition-all duration-700 relative rounded-b-full ${
                  currentStepIndex < 2
                    ? 'h-24 bg-indigo-50/20'
                    : 'h-40 bg-transparent flex flex-col justify-end'
                }`}
              >
                {/* Upper Sample + Glyoxylic Layer */}
                {currentStepIndex >= 2 && (
                  <div className="h-20 w-full bg-indigo-100/40 relative">
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-white/40 rounded-full" />
                  </div>
                )}

                {/* Violet Interface Ring */}
                {(currentStepIndex >= 2 || isFinished) && (
                  <div className="h-3 w-full bg-gradient-to-r from-purple-700 via-fuchsia-500 to-purple-700 shadow-[0_0_18px_rgba(217,70,239,1)] z-10 flex items-center justify-center animate-pulse border-y border-fuchsia-300">
                    <div className="w-full h-1 bg-white/40 blur-[0.5px]" />
                  </div>
                )}

                {/* Bottom Dense H2SO4 Layer */}
                {currentStepIndex >= 2 && (
                  <div className="h-16 w-full bg-slate-200/40 rounded-b-full relative">
                    <span className="absolute bottom-1 inset-x-0 text-center text-[6px] font-mono text-slate-500">
                      Conc. H₂SO₄
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-20 h-2 mt-1 rounded-full bg-slate-900/60 blur-sm" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Top Banner with Strict 4 Tests Badge */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-mono font-bold tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                BIOCHEMISTRY PRACTICAL LAB — PROTEIN TESTS
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold font-mono">
                4 Tests Complete Suite
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              تجارب الكشف والترسيب للبروتينات والأحماض الأمينية
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              محاكاة مخبرية تفاعلية دقيقة لطلاب الطب البشري (السنة الأولى). نفذ الخطوات التسلسلية، راقب التفاعلات اللونية، واستنتج النتائج السريرية مع أسئلة التفسير الفوري.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 font-mono">Strict Order</div>
              <div className="text-base font-extrabold text-amber-400">4 التجارب المعملية</div>
            </div>
          </div>
        </div>
      </div>

      {/* STRICT 4-TEST SEQUENTIAL SELECTION MENU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {PROTEIN_EXPERIMENTS.map((exp, idx) => {
          const isSelected = activeExpIndex === idx;
          return (
            <button
              key={exp.id}
              onClick={() => handleSelectExp(idx)}
              className={`text-right p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isSelected
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {exp.orderNumber}
                </span>
                <span className="text-[10px] text-slate-400 font-mono uppercase">
                  {exp.code}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-0.5 leading-snug">
                  {exp.titleEn}
                </h3>
                <p className="text-[11px] text-slate-400 font-arabic truncate">
                  {exp.titleAr}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 text-[10px]">الهدف:</span>
                <span className="text-indigo-300 font-semibold truncate max-w-[130px]">
                  {exp.targetMolecule}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* MAIN INTERACTIVE EXPERIMENT CONTAINER */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
        {/* Experiment Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold">
                {currentExp.orderNumber}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Target: {currentExp.targetMolecule}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <TestTube className="w-6 h-6 text-indigo-400" />
              {currentExp.titleEn} — {currentExp.titleAr}
            </h2>
          </div>

          <button
            onClick={handleResetExperiment}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-700/60 self-start lg:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            إعادة بدء التجربة
          </button>
        </div>

        {/* SCIENTIFIC METADATA CARDS: Goal, Principle, Important Value */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Goal */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Goal (الهدف)
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentExp.goal}
            </p>
          </div>

          {/* Principle */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-teal-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Beaker className="w-3.5 h-3.5" />
              Principle (المبدأ العلمي)
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentExp.principle}
            </p>
            {currentExp.importantValue && (
              <div className="mt-2 text-[11px] font-bold text-amber-300 bg-amber-950/30 border border-amber-500/30 px-2.5 py-1 rounded-lg inline-block">
                ⚡ {currentExp.importantValue}
              </div>
            )}
          </div>
        </div>

        {/* INTERACTIVE LAB WORKBENCH: Procedure Steps & Virtual Test Tube */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/90 rounded-3xl p-6 sm:p-8 border border-slate-800/80">
          {/* Left: Procedure Steps Runner (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                Sequential Procedure ({currentStepIndex + 1} of {totalSteps})
              </span>
              <span className="text-xs font-bold text-indigo-400">
                {hasObservedResult ? 'Complete' : 'In Progress'}
              </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-4 gap-2">
              {currentExp.procedureSteps.map((step, idx) => (
                <div
                  key={step.stepNumber}
                  className={`h-1.5 rounded-full transition-all ${
                    idx <= currentStepIndex
                      ? 'bg-indigo-500'
                      : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>

            {/* Current Step Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-3 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 text-xs font-bold flex items-center justify-center shrink-0">
                  {currentStep.stepNumber}
                </span>
                <h4 className="text-base font-bold text-white">
                  {currentStep.title}
                </h4>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {currentStep.instruction}
              </p>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                <Droplet className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{currentStep.detail}</span>
              </div>

              {/* Action Button */}
              {!hasObservedResult ? (
                <button
                  onClick={handleNextStep}
                  className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  <span>{currentStep.actionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  تم تنفيذ جميع خطوات التجربة وظهور النتيجة المرجوة!
                </div>
              )}
            </div>

            {/* Safety Reminder */}
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-200 mb-0.5 font-bold">Laboratory Safety:</strong>
                {currentExp.safety}
              </div>
            </div>
          </div>

          {/* Right: Virtual Test Tube Realistic Simulator (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-4">
              Virtual Reaction Chamber
            </span>

            {/* The Visual Tube */}
            {renderVirtualTestTube()}

            {/* Live Observation Banner */}
            <div className="mt-6 w-full text-center p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Observation:</span>
              <span className="text-xs font-bold text-slate-100 mt-1 block">
                {hasObservedResult
                  ? currentExp.observation
                  : currentStep.instruction}
              </span>
            </div>
          </div>
        </div>

        {/* RESULTS & INTERPRETATION SECTION (Shown only when student reaches/observes result) */}
        {hasObservedResult && (
          <div className="space-y-6 pt-4 border-t border-slate-800 animate-fadeIn">
            {/* Positive vs Negative Results Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Positive Result (النتيجة الإيجابية)
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  <strong>المظهر:</strong> {currentExp.positiveResult.visualDescription}
                </p>
                <p className="text-xs text-emerald-300 font-semibold">
                  <strong>المدلول:</strong> {currentExp.positiveResult.clinicalMeaning}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/40 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <XCircle className="w-4 h-4" />
                  Negative Result (النتيجة السلبية)
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  <strong>المظهر:</strong> {currentExp.negativeResult.visualDescription}
                </p>
                <p className="text-xs text-rose-300 font-semibold">
                  <strong>المدلول:</strong> {currentExp.negativeResult.clinicalMeaning}
                </p>
              </div>
            </div>

            {/* High Yield & Memory Trick Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase font-mono flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  High Yield Clinical Pearl
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold">
                  {currentExp.highYield}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5">
                <span className="text-xs font-bold text-indigo-400 uppercase font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Memory Trick (طريقة التذكر السريع)
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold">
                  {currentExp.memoryTrick}
                </p>
              </div>
            </div>

            {/* "INTERPRET THE RESULT" CLINICAL WRITTEN QUIZ */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-indigo-500/40 space-y-4 shadow-xl text-right">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-indigo-400 uppercase font-mono flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  Interpret the result (تفسير النتيجة المخبرية — اختبار كتابي)
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Written Response
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                {currentExp.quizQuestion.prompt}
              </h4>
              {currentExp.quizQuestion.promptAr && (
                <p className="text-xs text-slate-400 font-arabic">
                  {currentExp.quizQuestion.promptAr}
                </p>
              )}

              {/* Written Input Form (Strictly No MCQs) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!quizWrittenInput.trim() || hasCheckedAnswer) return;
                  const correctTarget = currentExp.quizQuestion.options[currentExp.quizQuestion.correctIndex] || '';
                  const normUser = quizWrittenInput.trim().toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]/g, '');
                  const normTarget = correctTarget.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]/g, '');
                  const isMatch = normUser === normTarget || (normTarget.length >= 4 && (normUser.includes(normTarget) || normTarget.includes(normUser)));
                  setIsQuizCorrect(isMatch);
                  setHasCheckedAnswer(true);
                }}
                className="space-y-3 pt-1"
              >
                <label className="text-xs font-bold text-slate-300 block">
                  اكتب تفسيرك السريري أو النتيجة المخبرية هنا:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={quizWrittenInput}
                    onChange={(e) => setQuizWrittenInput(e.target.value)}
                    disabled={hasCheckedAnswer}
                    placeholder="اكتب إجابتك هنا بالإنجليزية أو العربية..."
                    className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition font-semibold disabled:opacity-80"
                  />
                </div>

                {!hasCheckedAnswer ? (
                  <button
                    type="submit"
                    disabled={!quizWrittenInput.trim()}
                    className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition shadow cursor-pointer flex items-center gap-1.5"
                  >
                    <span>تحقق من الإجابة (Check Answer)</span>
                  </button>
                ) : null}
              </form>

              {/* Instant Evaluation Feedback */}
              {hasCheckedAnswer && (
                <div
                  className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                    isQuizCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between pb-1 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      {isQuizCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>إجابة صحيحة (Correct Interpretation)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span>إجابة غير دقيقة</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">إجابتك:</span>
                      <span className={isQuizCorrect ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
                        {quizWrittenInput || '(فارغ)'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-indigo-600/30">
                      <span className="text-indigo-400 text-[10px] font-bold block">الإجابة النموذجية المعتمدة:</span>
                      <span className="text-white font-bold">
                        {currentExp.quizQuestion.options[currentExp.quizQuestion.correctIndex]}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-xs pt-1">
                    💡 <span className="font-bold">التفسير العلمي:</span> {currentExp.quizQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DOCTOR EXPLANATION VIDEO FOR THE ACTIVE EXPERIMENT (Video Player with Embed Link & Edit Option) */}
      <ProteinExperimentVideoSection testId={currentExp.id} />

      {/* FINAL COMPREHENSIVE COMPARISON CARD */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                بطاقة المقارنة الشاملة لجميع اختبارات البروتينات (Final Comparison Card)
              </h3>
              <p className="text-xs text-slate-400">
                مرجع الحفظ السريع للامتحان العملي والنظري (4 Tests Summary)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-400">
              <span>TEST 01</span>
              <span>BIURET</span>
            </div>
            <div className="text-xs font-bold text-white">Biuret Test</div>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div>🎯 <strong>Detects:</strong> Peptide Bonds (≥ 2)</div>
              <div>⚡ <strong>Reaction:</strong> Cu²⁺ + Alkaline NaOH</div>
              <div>✨ <strong>Positive:</strong> Royal Violet/Purple</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400">
              <span>TEST 02</span>
              <span>pI CASEIN</span>
            </div>
            <div className="text-xs font-bold text-white">Isoelectric Point</div>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div>🎯 <strong>Detects:</strong> Casein (Milk Protein)</div>
              <div>⚡ <strong>Mechanism:</strong> pI ≈ 4.6–4.9 → Zero charge</div>
              <div>✨ <strong>Positive:</strong> Green precipitate at bottom</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
              <span>TEST 03</span>
              <span>HEAT & ACID</span>
            </div>
            <div className="text-xs font-bold text-white">Heat & Acetic Acid</div>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div>🎯 <strong>Detects:</strong> Albumin (Proteinuria)</div>
              <div>⚡ <strong>Key Rule:</strong> Phosphates dissolve in acid</div>
              <div>✨ <strong>Positive:</strong> Persistent cloudy coagulate</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-400">
              <span>TEST 04</span>
              <span>HOPKINS-COLE</span>
            </div>
            <div className="text-xs font-bold text-white">Hopkins–Cole Test</div>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div>🎯 <strong>Detects:</strong> Tryptophan (Indole ring)</div>
              <div>⚡ <strong>Reagents:</strong> Glyoxylic acid + Conc. H₂SO₄</div>
              <div>✨ <strong>Positive:</strong> Violet ring at interface</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
