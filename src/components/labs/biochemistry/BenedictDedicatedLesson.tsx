import React, { useState } from 'react';
import {
  FlaskConical,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Flame,
  Droplets,
  AlertTriangle,
  Layers,
  ChevronRight,
  ArrowLeft,
  Video,
  Info
} from 'lucide-react';
import { DoctorVideoSection } from './DoctorVideoSection';

interface BenedictDedicatedLessonProps {
  onBack?: () => void;
}

interface MCQQuestion {
  id: number;
  question: string;
  questionAr: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

const BENEDICT_MCQS: MCQQuestion[] = [
  {
    id: 1,
    question: "What is the primary chemical species responsible for the brick-red precipitate in a positive Benedict's test?",
    questionAr: "ما هو المركب الكيميائي المسؤول عن تشكل الراسب الأحمر القرميدي في اختبار بندكت الإيجابي؟",
    options: [
      { key: "A", text: "Cupric hydroxide [Cu(OH)2]" },
      { key: "B", text: "Cuprous oxide [Cu2O]" },
      { key: "C", text: "Copper sulfate [CuSO4]" },
      { key: "D", text: "Cupric carbonate [CuCO3]" }
    ],
    correctKey: "B",
    explanation: "Reducing sugars donate electrons to blue cupric ions (Cu2+), reducing them into insoluble cuprous oxide (Cu2O), which precipitates as a red/brick-red solid upon heating."
  },
  {
    id: 2,
    question: "What is the specific role of sodium citrate in Benedict's qualitative reagent?",
    questionAr: "ما هو الدور المحدد لسترات الصوديوم في كاشف بندكت النوعي؟",
    options: [
      { key: "A", text: "It acts as the primary reducing agent." },
      { key: "B", text: "It provides an acidic pH necessary for the reaction." },
      { key: "C", text: "It chelates Cu2+ ions to prevent precipitation of insoluble Cu(OH)2 in alkaline medium." },
      { key: "D", text: "It oxidizes ketoses into aldoses." }
    ],
    correctKey: "C",
    explanation: "Sodium citrate is a chelating agent that complexes with Cu2+ ions. This prevents them from precipitating prematurely as insoluble cupric hydroxide [Cu(OH)2] in the alkaline sodium carbonate environment."
  },
  {
    id: 3,
    question: "Why does pure Sucrose give a NEGATIVE result with Benedict's reagent?",
    questionAr: "لماذا يعطي سكر السكروز النقي نتيجة سلبية (زرقاء) مع كاشف بندكت؟",
    options: [
      { key: "A", text: "Sucrose is an insoluble polysaccharide." },
      { key: "B", text: "Both anomeric carbons (C1 of glucose and C2 of fructose) are tied in the alpha-1,beta-2 glycosidic bond." },
      { key: "C", text: "Sucrose is destroyed by the boiling temperature." },
      { key: "D", text: "Sucrose lacks hydroxyl (-OH) groups." }
    ],
    correctKey: "B",
    explanation: "In sucrose, both potential reducing carbonyl carbons (C1 of alpha-D-glucose and C2 of beta-D-fructose) are linked together in the glycosidic bond. Since neither ring can open to expose a free aldehyde or ketone group, sucrose is non-reducing."
  },
  {
    id: 4,
    question: "A medical student observes a green precipitate with yellow tint (+). Approximately what reducing sugar concentration does this represent?",
    questionAr: "لاحظ طالب طب ظهور راسب أخضر مائل للصفرة (+). ما هو التركيز التقريبي للسكريات المختزلة؟",
    options: [
      { key: "A", text: "0% (Completely absent)" },
      { key: "B", text: "Approx. 0.5% (Trace amounts)" },
      { key: "C", text: "Approx. 2.0% or higher" },
      { key: "D", text: "10% to 15%" }
    ],
    correctKey: "B",
    explanation: "Benedict's test is semi-quantitative: Blue = 0%, Green (+) = ~0.5% (trace), Yellow (++) = ~1.0%, Orange (+++) = ~1.5%, and Brick-Red (++++) = >=2.0%."
  }
];

export const BenedictDedicatedLesson: React.FC<BenedictDedicatedLessonProps> = ({ onBack }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(4);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const colorScale = [
    {
      label: 'Blue (أزرق)',
      rating: '0% (Negative)',
      desc: 'No reducing sugar present. Solution remains clear blue.',
      colorHex: '#2563EB',
      bgClass: 'bg-blue-600',
      textClass: 'text-blue-400',
      borderClass: 'border-blue-500'
    },
    {
      label: 'Green (أخضر)',
      rating: '+ (~0.5% Trace)',
      desc: 'Trace amount of reducing sugar. Greenish turbidity or precipitate.',
      colorHex: '#16A34A',
      bgClass: 'bg-emerald-600',
      textClass: 'text-emerald-400',
      borderClass: 'border-emerald-500'
    },
    {
      label: 'Yellow (أصفر)',
      rating: '++ (~1.0% Low)',
      desc: 'Moderate trace. Yellowish precipitate suspended in liquid.',
      colorHex: '#CA8A04',
      bgClass: 'bg-amber-500',
      textClass: 'text-amber-400',
      borderClass: 'border-amber-500'
    },
    {
      label: 'Orange (برتقالي)',
      rating: '+++ (~1.5% Moderate)',
      desc: 'Appreciable reducing sugar concentration. Orange precipitate.',
      colorHex: '#EA580C',
      bgClass: 'bg-orange-600',
      textClass: 'text-orange-400',
      borderClass: 'border-orange-500'
    },
    {
      label: 'Brick-Red (أحمر قرميدي)',
      rating: '++++ (≥ 2.0% High)',
      desc: 'Heavy cuprous oxide (Cu2O) precipitate. Strong reducing action.',
      colorHex: '#DC2626',
      bgClass: 'bg-rose-600',
      textClass: 'text-rose-400',
      borderClass: 'border-rose-500'
    }
  ];

  const handleSelectOption = (qId: number, key: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: key }));
  };

  const handleReveal = (qId: number) => {
    setRevealedAnswers(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto pb-12" id="benedict-dedicated-lesson">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between gap-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-bold shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>العودة لقائمة التجارب (Back to Experiments)</span>
          </button>
        )}
        <div className="text-[11px] font-mono text-amber-400 font-bold bg-amber-950/60 border border-amber-500/40 px-3 py-1 rounded-full">
          BIOCHEMISTRY LAB • 1ST YEAR MEDICAL CURRICULUM
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0B1528] via-[#0E1A33] to-[#0A1124] border border-amber-500/40 shadow-2xl overflow-hidden space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/40">
                EXPERIMENT #03 • CARBOHYDRATES
              </span>
              <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/40">
                QUALITATIVE & SEMI-QUANTITATIVE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Benedict's Test
            </h1>
            <p className="text-base sm:text-lg text-amber-300 font-arabic font-bold">
              اختبار بندكت للكشف عن السكريات المختزلة (Reducing Sugars)
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl pt-1">
              A foundational medical biochemistry laboratory assay used to detect reducing sugars based on the reduction of blue cupric ions (Cu²⁺) to an insoluble brick-red cuprous oxide (Cu₂O) precipitate in an alkaline boiling medium.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex flex-col items-center justify-center text-center">
              <FlaskConical className="w-8 h-8 mb-1" />
              <span className="text-[10px] font-mono font-bold uppercase text-amber-300">BENEDICT QUALITATIVE</span>
            </div>
          </div>
        </div>

        {/* Lesson Breadcrumb Hierarchy: Official Medical Standard */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-[11px] text-slate-400 flex items-center gap-2 overflow-x-auto">
          <span className="text-amber-400 font-bold whitespace-nowrap">المسار المنهجي:</span>
          <span>Official Course Material</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span>Simple Explanation</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span>🧪 Practical Reagents & Procedure</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="text-amber-300 font-bold">🎥 Doctor Video Explanation</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span>📌 High-Yield Pearls</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span>❓ Exam MCQs</span>
        </div>
      </div>

      {/* SECTION 1: WHAT IS BENEDICT'S TEST & SIMPLE EXPLANATION */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/40 text-blue-400 flex items-center justify-center">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">1. What is Benedict's Test? (ما هو اختبار بندكت؟)</h2>
            <p className="text-xs text-slate-400">Basic Concept for First-Year Medical Students</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-3 bg-[#0F172A] p-4 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>التعريف الطبي المبسط</span>
            </h3>
            <p>
              هو اختبار كيميائي معملي يعتمد على قدرة السكريات التي تمتلك مجموعة كربونيل حرة (ألدهيد أو كيتون) على التبرع بالإلكترونات واختزال أيونات النحاس الزرقاء ثنائية التكافؤ (Cu²⁺) إلى أكسيد النحاسوز الأحمر غير القابل للذوبان (Cu₂O) عند التسخين.
            </p>
            <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-200">
              <span className="font-bold text-blue-300">الاستخدام السريري: </span>
              كان يُستخدم سريرياً للكشف عن وجود السكر في البول (Glycosuria) لدى مرضى داء السكري (Diabetes Mellitus).
            </div>
          </div>

          <div className="space-y-3 bg-[#0F172A] p-4 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-emerald-300 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>What Does the Test Detect? (ماذا يكشف الاختبار؟)</span>
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong className="text-white">All Monosaccharides:</strong> Glucose, Fructose, Galactose (All are strong reducing sugars).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong className="text-white">Reducing Disaccharides:</strong> Maltose and Lactose (because one anomeric hemiacetal carbon is free).</span>
              </li>
              <li className="flex items-start gap-2 text-rose-300">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong className="text-rose-200">Negative for Non-Reducing:</strong> Sucrose (table sugar) and Starch (polysaccharide).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: CHEMICAL PRINCIPLE (المبدأ الكيميائي) */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">2. Principle of the Reaction (المبدأ الكيميائي)</h2>
            <p className="text-xs text-slate-400">Alkaline Enediol Formation & Redox Reduction</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#0F172A] to-blue-950/40 border border-amber-500/30 text-center space-y-2">
          <div className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider">
            THE GENERAL BIOCHEMICAL EQUATION
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-white bg-slate-950/90 py-3 px-4 rounded-xl border border-slate-800 inline-block overflow-x-auto max-w-full">
            Reducing Sugar + 2 Cu²⁺ (Blue) + 2 OH⁻  ⎯⎯[Heat 100°C]⎯⎯→  Oxidized Sugar + Cu₂O ↓ (Brick-Red Precipitate) + H₂O
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-[#0F172A] border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400 block">1. التشكيل الإينيديولي (Enediol):</span>
            <p className="text-slate-400 leading-relaxed">
              تحت تأثير الوسط القلوي الضعيف لكربونات الصوديوم، تتحول السكريات المختزلة إلى مركبات إينيديولية فعالة وقوية الاختزال.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0F172A] border border-slate-800 space-y-1.5">
            <span className="font-bold text-blue-400 block">2. اختزال أيونات النحاس:</span>
            <p className="text-slate-400 leading-relaxed">
              تختزل مركبات الإينيديول أيونات النحاس الثنائي (Cu²⁺) ذات اللون الأزرق الشفاف إلى أيونات نحاس أحادي (Cu⁺).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0F172A] border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-400 block">3. تشكل الراسب القرميدي:</span>
            <p className="text-slate-400 leading-relaxed">
              تتحد أيونات النحاس الأحادي مع الأكسجين لتشكل أكسيد النحاسوز (Cu₂O) وهو راسب غير ذواب لونه أحمر قرميدي.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: REAGENT COMPOSITION & ROLE */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">3. Benedict's Qualitative Reagent Composition (مكونات الكاشف)</h2>
            <p className="text-xs text-slate-400">High-Yield Medical Exam Core: The Role of Each Reagent</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0F172A] border border-blue-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-400">REAGENT 01</span>
              <span className="w-3 h-3 rounded-full bg-blue-500" />
            </div>
            <h4 className="text-sm font-bold text-white">Copper Sulfate (CuSO₄·5H₂O)</h4>
            <div className="text-[11px] font-bold text-blue-300 font-arabic">كبريتات النحاس المائية</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides the cupric ions (Cu²⁺) that give the reagent its distinctive deep blue color and act as the oxidizing agent that accepts electrons from the reducing sugar.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-amber-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">REAGENT 02</span>
              <span className="w-3 h-3 rounded-full bg-amber-500" />
            </div>
            <h4 className="text-sm font-bold text-white">Sodium Carbonate (Na₂CO₃)</h4>
            <div className="text-[11px] font-bold text-amber-300 font-arabic">كربونات الصوديوم اللامائية</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides the mild alkaline medium required for the enolization of sugars. Mild alkalinity makes Benedict reagent safer and far more stable than Fehling's reagent (which uses NaOH).
            </p>
          </div>

          <div className="bg-[#0F172A] border border-emerald-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">REAGENT 03</span>
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <h4 className="text-sm font-bold text-white">Sodium Citrate (Na₃C₆H₅O₇)</h4>
            <div className="text-[11px] font-bold text-emerald-300 font-arabic">سترات الصوديوم</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Functions as a chelating / complexing agent. It holds Cu²⁺ in solution and prevents it from prematurely precipitating as insoluble black cupric hydroxide [Cu(OH)₂].
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: STEP-BY-STEP LABORATORY PROCEDURE */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-400 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">4. Laboratory Procedure (خطوات إجراء التجربة العملية)</h2>
            <p className="text-xs text-slate-400">Standard First-Year Medical Practical Protocol</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-3.5 space-y-1.5 relative">
            <span className="text-amber-400 font-mono font-bold text-[11px]">STEP 01</span>
            <div className="font-bold text-white">إضافة الكاشف</div>
            <p className="text-slate-400 leading-relaxed">
              ضع 2 مل من كاشف بندكت (Benedict's Reagent) في أنبوبة اختبار زجاجية نظيفة وجافة.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-3.5 space-y-1.5 relative">
            <span className="text-amber-400 font-mono font-bold text-[11px]">STEP 02</span>
            <div className="font-bold text-white">إضافة العينة</div>
            <p className="text-slate-400 leading-relaxed">
              أضف 8 قطرات (حوالي 0.4 إلى 0.5 مل) من محلول السكر المراد اختباره إلى الأنبوبة.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-3.5 space-y-1.5 relative">
            <span className="text-amber-400 font-mono font-bold text-[11px]">STEP 03</span>
            <div className="font-bold text-white">المزج الجيد</div>
            <p className="text-slate-400 leading-relaxed">
              رج محتويات الأنبوبة برفق لمزج العينة تماماً مع الكاشف الأزرق.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-rose-500/40 rounded-2xl p-3.5 space-y-1.5 relative bg-rose-950/20">
            <span className="text-rose-400 font-mono font-bold text-[11px]">STEP 04 • CRITICAL</span>
            <div className="font-bold text-rose-200">التسخين في حمام مائي</div>
            <p className="text-slate-300 leading-relaxed">
              ضع الأنبوبة في حمام مائي يغلي (100°C) لمدة 3 إلى 5 دقائق بالضبط.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-3.5 space-y-1.5 relative">
            <span className="text-emerald-400 font-mono font-bold text-[11px]">STEP 05</span>
            <div className="font-bold text-emerald-200">التبريد والملاحظة</div>
            <p className="text-slate-400 leading-relaxed">
              أخرج الأنبوبة ودعها تبرد تدريجياً، ولاحظ تشكل الراسب الملون وتغير اللون.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: POSITIVE / NEGATIVE RESULT & COLOR SCALE VISUALIZER */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">5. Result Interpretation & Semi-Quantitative Color Scale</h2>
            <p className="text-xs text-slate-400">تدرج الألوان شبه الكمي وتقدير تركيز السكر</p>
          </div>
        </div>

        {/* Interactive Color Tubes Selector */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span>انقر على أحد أنابيب الاختبار لتفقد دلالة اللون والتركيز:</span>
            <span className="font-mono text-amber-400 font-bold">Interactive Color Spectrum</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {colorScale.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedColorIndex(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-center space-y-2 flex flex-col items-center justify-center ${
                  selectedColorIndex === idx
                    ? `${item.borderClass} ring-2 ring-amber-400/50 bg-[#0F172A]`
                    : 'border-slate-800 bg-[#0F172A]/60 hover:border-slate-700'
                }`}
              >
                {/* Visual Test Tube Shape */}
                <div className="w-8 h-20 rounded-b-full border-2 border-slate-400/30 overflow-hidden relative shadow-inner flex flex-col justify-end p-1">
                  <div
                    className="w-full rounded-b-full transition-all duration-300"
                    style={{
                      height: idx === 0 ? '60%' : '75%',
                      backgroundColor: item.colorHex
                    }}
                  />
                </div>
                <div className={`text-xs font-bold ${item.textClass}`}>{item.label}</div>
                <div className="text-[10px] font-mono text-slate-400">{item.rating}</div>
              </button>
            ))}
          </div>

          {/* Detailed Selected Result Box */}
          <div className="bg-[#0F172A] border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-lg"
              style={{ backgroundColor: colorScale[selectedColorIndex].colorHex }}
            >
              {selectedColorIndex === 0 ? '0' : '+'.repeat(selectedColorIndex)}
            </div>
            <div className="space-y-1 text-center sm:text-right flex-1">
              <div className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                <span>{colorScale[selectedColorIndex].label}</span>
                <span className="font-mono text-amber-400 text-xs">({colorScale[selectedColorIndex].rating})</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {colorScale[selectedColorIndex].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Color Observed</th>
                <th className="p-3">Precipitate Amount</th>
                <th className="p-3">Approx. Reducing Sugar %</th>
                <th className="p-3">Clinical / Laboratory Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 font-bold text-blue-400">Blue (أزرق)</td>
                <td className="p-3">None (Clear Solution)</td>
                <td className="p-3 font-mono">0% (Nil)</td>
                <td className="p-3 text-slate-400">Negative. Non-reducing sugar or no carbohydrate.</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 font-bold text-emerald-400">Green (أخضر)</td>
                <td className="p-3">Slight Turbidity (+)</td>
                <td className="p-3 font-mono">~ 0.5%</td>
                <td className="p-3 text-slate-400">Trace reducing sugar.</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 font-bold text-amber-400">Yellow (أصفر)</td>
                <td className="p-3">Moderate Precipitate (++)</td>
                <td className="p-3 font-mono">~ 1.0%</td>
                <td className="p-3 text-slate-400">Low concentration.</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 font-bold text-orange-400">Orange (برتقالي)</td>
                <td className="p-3">Heavy Precipitate (+++)</td>
                <td className="p-3 font-mono">~ 1.5%</td>
                <td className="p-3 text-slate-400">Moderate concentration.</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 font-bold text-rose-400">Brick-Red (أحمر قرميدي)</td>
                <td className="p-3">Very Heavy Precipitate (++++)</td>
                <td className="p-3 font-mono">≥ 2.0%</td>
                <td className="p-3 text-slate-400">High concentration (e.g. standard glucose solution).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 6: PRACTICAL IDENTIFICATION OF UNKNOWN SUGARS */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/40 text-purple-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">6. Practical Identification in the Exam Lab</h2>
            <p className="text-xs text-slate-400">Comparative Behavior of Tested Carbohydrates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-[#0F172A] rounded-xl border border-emerald-500/30 space-y-1">
            <div className="font-bold text-emerald-300">Glucose (سكر العنب)</div>
            <div className="text-[11px] text-slate-400">Monosaccharide (Aldohexose)</div>
            <div className="text-rose-400 font-bold font-mono">Result: Brick-Red (++++)</div>
          </div>

          <div className="p-3.5 bg-[#0F172A] rounded-xl border border-emerald-500/30 space-y-1">
            <div className="font-bold text-emerald-300">Fructose (سكر الفواكه)</div>
            <div className="text-[11px] text-slate-400">Monosaccharide (Ketohexose)</div>
            <div className="text-rose-400 font-bold font-mono">Result: Brick-Red (++++)</div>
          </div>

          <div className="p-3.5 bg-[#0F172A] rounded-xl border border-emerald-500/30 space-y-1">
            <div className="font-bold text-emerald-300">Maltose (سكر الشعير)</div>
            <div className="text-[11px] text-slate-400">Disaccharide (Glucose-alpha-1,4-Glucose)</div>
            <div className="text-orange-400 font-bold font-mono">Result: Orange / Red (+++)</div>
          </div>

          <div className="p-3.5 bg-[#0F172A] rounded-xl border border-emerald-500/30 space-y-1">
            <div className="font-bold text-emerald-300">Lactose (سكر الحليب)</div>
            <div className="text-[11px] text-slate-400">Disaccharide (Galactose-beta-1,4-Glucose)</div>
            <div className="text-orange-400 font-bold font-mono">Result: Orange / Red (+++)</div>
          </div>

          <div className="p-3.5 bg-[#0F172A] rounded-xl border border-rose-500/30 space-y-1">
            <div className="font-bold text-rose-300">Sucrose (سكر القصب / المائدة)</div>
            <div className="text-[11px] text-slate-400">Disaccharide (Glucose-alpha-1,2-Fructose)</div>
            <div className="text-blue-400 font-bold font-mono">Result: Blue (Negative 0%)</div>
          </div>

          <div className="p-3.5 bg-[#0F172A] rounded-xl border border-rose-500/30 space-y-1">
            <div className="font-bold text-rose-300">Starch (النشاء)</div>
            <div className="text-[11px] text-slate-400">Polysaccharide (Amylose + Amylopectin)</div>
            <div className="text-blue-400 font-bold font-mono">Result: Blue (Negative 0%)</div>
          </div>
        </div>
      </div>

      {/* SECTION 7: PROMINENT DOCTOR EXPLANATION VIDEO (The user's exact YouTube video) */}
      <div className="space-y-3" id="doctor-video-explanation-section">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            OFFICIAL ACCREDITED VIDEO LECTURE
          </span>
        </div>

        <DoctorVideoSection
          videoId="nlPHeqHOYpU"
          youtubeUrl="https://youtu.be/nlPHeqHOYpU?si=Kw5FCw5YCKA-UlB4"
          title="Benedict's Test — Practical Demonstration & Chemical Principle"
          titleAr="اختبار بندكت: العرض المخبري العملي ومناقشة المبدأ الكيميائي"
          doctorName="Faculty of Medical Biochemistry"
          doctorTitle="Professor of Medical Biochemistry & Clinical Pathology"
          channelTitle="Practical Biochemistry Education"
          duration="06:15"
          objectives={[
            "فهم تركيب كاشف بندكت: كبريتات النحاس، كربونات الصوديوم، وسترات الصوديوم.",
            "ملاحظة التسخين في الحمام المائي المغلي لمدة 3 إلى 5 دقائق وتكون الراسب.",
            "التمييز البصري بين السكريات المختزلة (الجلوكوز) وغير المختزلة (السكروز النقي)."
          ]}
          highYieldPoints={[
            "سترات الصوديوم تمنع ترسب هيدروكسيد النحاس الثنائي الأسود غير المرغوب فيه.",
            "السكروز سلبي لأن ذرتا الكربون الأنوميرية لكل من الجلوكوز والفركتوز مشتركتان في الرابطة الجليكوسيدية.",
            "يمكن تحويل السكروز إلى إيجابي عبر الغلي مع حمض الهيدروكلوريك المخفف (Hydrolysis) ثم التعديل."
          ]}
        />
      </div>

      {/* SECTION 8: HIGH YIELD IMPORTANT EXAM POINTS & CLINICAL PEARLS */}
      <div className="bg-[#0B1120] border border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">7. Important Medical Exam Points (High-Yield Pearls)</h2>
            <p className="text-xs text-amber-300 font-arabic">أسئلة الامتحانات الشفوية والعملية المتكررة لكليات الطب</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 bg-[#0F172A] rounded-2xl border border-slate-800 space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>Q1: Why is Benedict preferred over Fehling's reagent?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Fehling's reagent contains strong NaOH and must be stored in two separate bottles (Fehling A and B) and mixed just before use; it deteriorates quickly. Benedict's reagent uses mild Na₂CO₃ and sodium citrate, is stable for years in a single bottle, and produces clearer precipitates.
            </p>
          </div>

          <div className="p-4 bg-[#0F172A] rounded-2xl border border-slate-800 space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>Q2: Why does Fructose (a ketose) reduce Benedict's reagent?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Although ketones are normally resistant to oxidation, the alkaline medium of Benedict's reagent causes Lobry de Bruyn-van Ekenstein transformation: keto-enol tautomerization converts fructose into an aldose (glucose/mannose) via an enediol intermediate.
            </p>
          </div>

          <div className="p-4 bg-[#0F172A] rounded-2xl border border-slate-800 space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>Q3: How can Sucrose give a positive Benedict's test?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              By boiling sucrose with dilute HCl (Acid Hydrolysis), the glycosidic bond is broken into free glucose and free fructose (invert sugar). After neutralizing the acid with sodium bicarbonate, adding Benedict's reagent gives a strong brick-red precipitate.
            </p>
          </div>

          <div className="p-4 bg-[#0F172A] rounded-2xl border border-slate-800 space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>Q4: False positives in clinical urine tests:</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              High concentrations of vitamin C (ascorbic acid), homogentisic acid (alkaptonuria), or certain antibiotics in urine can also reduce Cu²⁺ and cause a false positive Benedict's test.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 9: INTERACTIVE EXAM MCQS */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">8. Exam Practice MCQs (أسئلة تدريبية للاختبار)</h2>
            <p className="text-xs text-slate-400">Interactive First-Year Medical Review</p>
          </div>
        </div>

        <div className="space-y-6">
          {BENEDICT_MCQS.map((q, idx) => {
            const userChoice = selectedAnswers[q.id];
            const isRevealed = revealedAnswers[q.id];
            const isCorrect = userChoice === q.correctKey;

            return (
              <div
                key={q.id}
                className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 space-y-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 text-[10px] font-mono font-bold">
                      MCQ #{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{q.question}</h4>
                  <p className="text-xs text-slate-400 font-arabic">{q.questionAr}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map(opt => {
                    const isSelected = userChoice === opt.key;
                    let optionStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (isSelected) {
                      optionStyle = 'bg-amber-950/40 border-amber-500/60 text-amber-200 ring-1 ring-amber-500/40';
                    }

                    if (isRevealed) {
                      if (opt.key === q.correctKey) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        disabled={isRevealed}
                        className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
                      >
                        <span className="font-mono font-bold text-amber-400 shrink-0">
                          {opt.key}.
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => handleReveal(q.id)}
                    disabled={!userChoice || isRevealed}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                  >
                    {isRevealed ? 'تم التحقق من الإجابة' : 'تحقق من الإجابة (Verify Answer)'}
                  </button>

                  {isRevealed && (
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>إجابة صحيحة! Excellent</span>
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" />
                          <span>إجابة خاطئة. Correct is {q.correctKey}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {isRevealed && (
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-amber-300 block">التفسير الطبي (Explanation):</span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
