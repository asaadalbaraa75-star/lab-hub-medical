import React from 'react';
import { BiochemistryTestTube, TestTubeType } from './BiochemistryTestTube';
import { BenedictColorScale } from './BenedictColorScale';
import {
  FlaskConical,
  Beaker,
  Info,
  CheckCircle2,
  XCircle,
  Eye,
  Flame,
  ArrowRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export interface VisualBioTest {
  id: string;
  testNumber: number;
  titleEn: string;
  titleAr: string;
  reagents: string[];
  principle: string;
  positiveDescAr: string;
  positiveDescEn: string;
  positiveTarget: string;
  negativeDescAr: string;
  negativeDescEn: string;
  negativeTarget: string;
  posTubeType: TestTubeType;
  negTubeType: TestTubeType;
  observationAr: string;
  observationEn: string;
  hasSpecialScale?: boolean;
}

export const BIOCHEMISTRY_VISUAL_TESTS: VisualBioTest[] = [
  {
    id: 'molisch',
    testNumber: 1,
    titleEn: "MOLISCH'S TEST",
    titleAr: 'اختبار موليش للكربوهيدرات',
    reagents: [
      '2 drops α-naphthol',
      '1 ml concentrated H₂SO₄ (added carefully along the side of the test tube)'
    ],
    principle:
      'Carbohydrates are dehydrated by H₂SO₄ to form furfural or hydroxymethylfurfural which condenses with α-naphthol to give a violet ring.',
    positiveDescAr: 'ظهور حلقة بنفسجية واضحة عند السطح الفاصل بين الطبقتين',
    positiveDescEn: 'Violet ring at the interface between two layers',
    positiveTarget: 'Carbohydrate Present (كربوهيدرات موجودة)',
    negativeDescAr: 'عدم تشكل حلقة بنفسجية عند السطح الفاصل',
    negativeDescEn: 'No violet ring formed at the interface',
    negativeTarget: 'Non-carbohydrate (مادة غير كربوهيدراتية)',
    posTubeType: 'molisch-pos',
    negTubeType: 'molisch-neg',
    observationAr:
      'اختبار نوعي عام وشامل لجميع أنواع الكربوهيدرات (السكريات الأحادية، الثنائية، والعديدة). تشكل الحلقة البنفسجية يؤكد وجود كربوهيدرات في العينة.',
    observationEn:
      'General qualitative screening test for all carbohydrates. Violet ring confirmation indicates carbohydrate presence.'
  },
  {
    id: 'iodine',
    testNumber: 2,
    titleEn: 'IODINE TEST',
    titleAr: 'اختبار اليود للنشاء',
    reagents: ['2 drops iodine solution (I₂/KI)'],
    principle: 'Iodine forms a blue complex with amylose (starch).',
    positiveDescAr: 'تحول لون المحلول فوراً إلى أزرق داكن / أزرق-أسود',
    positiveDescEn: 'Deep blue / blue-black complex solution',
    positiveTarget: 'Starch / Amylose (نشاء)',
    negativeDescAr: 'بقاء لون اليود الأصلي (أصفر-بني) دون ظهور لون أزرق',
    negativeDescEn: 'Yellow-brown iodine color / No blue color',
    negativeTarget: 'Mono / Disaccharides (سكريات أحادية/ثنائية)',
    posTubeType: 'iodine-pos',
    negTubeType: 'iodine-neg',
    observationAr:
      'اختبار نوعي خاص بالنشاء؛ جزيئات اليود تحبس داخل اللولب الحلزوني للأميلوز مكونة المعقد الأزرق. يختفي اللون الأزرق بالتسخين ويعود بالتبريد.',
    observationEn:
      'Specific test for starch (amylose). Iodine traps inside the amylose helix forming blue complex. Color fades with heat and reappears on cooling.'
  },
  {
    id: 'barfoed',
    testNumber: 3,
    titleEn: "BARFOED'S TEST",
    titleAr: 'اختبار بارفود للتمييز بين السكريات',
    reagents: [
      "Barfoed's reagent",
      'Heat in boiling water bath for 2–3 min'
    ],
    principle:
      'Monosaccharides reduce cupric ions in acidic medium to cuprous oxide (brick-red precipitate) rapidly, while disaccharides react slowly or not at all.',
    positiveDescAr: 'تشكل راسب أحمر آجري سريعاً في قاع الأنبوب خلال 2–3 دقائق',
    positiveDescEn: 'Rapid brick-red cuprous oxide precipitate (2–3 min)',
    positiveTarget: 'Monosaccharide (سكر أحادي مثل جلوكوز، فركتوز)',
    negativeDescAr: 'عدم تشكل راسب أحمر آجري في قاع الأنبوب (محلول أزرق رائق)',
    negativeDescEn: 'No brick-red precipitate formed (Solution remains blue)',
    negativeTarget: 'Disaccharide (سكر ثنائي مثل لاكتوز، مالتوز)',
    posTubeType: 'barfoed-pos',
    negTubeType: 'barfoed-neg',
    observationAr:
      'الوسط الحمضي الضعيف يجعل قوة الإرجاع أضعف، لذلك تختزل السكريات الأحادية أيونات النحاس بسرعة (2-3 دقائق)، بينما تحتاج السكريات الثنائية وقتاً أطول بكثير.',
    observationEn:
      'Weakly acidic medium permits rapid reduction only by monosaccharides (2-3 min) to brick-red cuprous oxide, distinguishing them from disaccharides.'
  },
  {
    id: 'seliwanoff',
    testNumber: 4,
    titleEn: "SELIWANOFF'S TEST",
    titleAr: 'اختبار سيليفانوف للكيتوزات',
    reagents: ["1 ml Seliwanoff's reagent"],
    principle:
      'Ketoses dehydrate rapidly in acidic medium to form hydroxymethylfurfural which condenses with resorcinol to give a cherry-red color, while aldoses react slowly or not at all.',
    positiveDescAr: 'ظهور لون أحمر كرزي ساطع وواضح',
    positiveDescEn: 'Bright cherry-red colored solution',
    positiveTarget: 'Ketose (سكر كيتوني مثل الفركتوز)',
    negativeDescAr: 'عدم ظهور اللون الأحمر الكرزي (محلول أصفر باهت أو عديم اللون)',
    negativeDescEn: 'No cherry-red color (Pale yellow or faint color)',
    negativeTarget: 'Aldose (سكر ألدوزي مثل الجلوكوز، الجلاكتوز)',
    posTubeType: 'seliwanoff-pos',
    negTubeType: 'seliwanoff-neg',
    observationAr:
      'تتميز الكيتوزات بسرعة نزع الماء منها في الوسط الحمضي وتفاعلها مع الريزورسينول لتعطي اللون الأحمر الكرزي بسرعة فائقة مقارنة بالألدوزات.',
    observationEn:
      'Ketoses undergo rapid dehydration in acidic medium condensing with resorcinol to produce a cherry-red color, differentiating them from aldoses.'
  },
  {
    id: 'benedict',
    testNumber: 5,
    titleEn: "BENEDICT'S TEST",
    titleAr: 'اختبار بندكت للسكريات المختزلة',
    reagents: [
      "Benedict's reagent",
      'Heat in boiling water bath for 3–5 min'
    ],
    principle:
      'Reducing sugars reduce cupric ions in alkaline medium to cuprous oxide forming a colored precipitate (green, yellow, orange, or brick-red).',
    positiveDescAr: 'تشكل راسب ملون (أخضر / أصفر / برتقالي / أحمر آجري)',
    positiveDescEn: 'Colored precipitate formed (Green / Yellow / Orange / Brick-red)',
    positiveTarget: 'Reducing Sugar (سكر مختزل مثل جلوكوز، مالتوز)',
    negativeDescAr: 'بقاء المحلول أزرق رائقاً دون أي راسب (لا تغيير)',
    negativeDescEn: 'Clear blue solution without any precipitate',
    negativeTarget: 'Non-reducing Sugar (سكر غير مختزل مثل السكروز)',
    posTubeType: 'benedict-high',
    negTubeType: 'benedict-neg',
    observationAr:
      'اختبار نصف كمي يعتمد لون وكمية الراسب على تركيز السكر المختزل: الأخضر (أثر)، الأصفر (+)، البرتقالي (++)، والأحمر الآجري (+++).',
    observationEn:
      'Semi-quantitative test where precipitate color indicates sugar concentration: Green (trace), Yellow (+), Orange (++), Brick-red (+++).',
    hasSpecialScale: true
  },
  {
    id: 'fehling',
    testNumber: 6,
    titleEn: "FEHLING'S TEST",
    titleAr: 'اختبار فيهلنغ للسكريات المختزلة',
    reagents: [
      '1 ml Fehling A (CuSO₄ solution)',
      '1 ml Fehling B (Alkaline tartrate solution)',
      'Heat in boiling water bath'
    ],
    principle:
      'Reducing sugars reduce cupric ions to red cuprous oxide precipitate in alkaline medium upon heating.',
    positiveDescAr: 'تشكل راسب أحمر آجري واضح في قاع الأنبوب بعد التسخين',
    positiveDescEn: 'Prominent brick-red cuprous oxide precipitate at bottom',
    positiveTarget: 'Reducing Sugar (سكر مختزل)',
    negativeDescAr: 'بقاء المحلول أزرق رائقاً بدون أي راسب أحمر',
    negativeDescEn: 'Clear blue solution with no precipitate formed',
    negativeTarget: 'Non-reducing Sugar (سكر غير مختزل)',
    posTubeType: 'fehling-pos',
    negTubeType: 'fehling-neg',
    observationAr:
      'يخلط المحلولان A و B قبل الاستخدام مباشرة، ويعمل ترترات البوتاسيوم والصوديوم في B على منع ترسب هيدروكسيد النحاس حتى يتم اختزاله بالسكر.',
    observationEn:
      'Fehling A and B are freshly mixed. Alkaline tartrate maintains cupric ions in solution until reduced by sugar to red cuprous oxide precipitate.'
  }
];

interface BiochemistryTestCardProps {
  test: VisualBioTest;
  isActive?: boolean;
  onSelect?: () => void;
}

export const BiochemistryTestCard: React.FC<BiochemistryTestCardProps> = ({
  test,
  isActive = false,
  onSelect
}) => {
  return (
    <div
      id={`biochem-card-${test.id}`}
      className="bg-[#1E293B] border border-[#334155] hover:border-amber-500/60 rounded-2xl p-5 sm:p-7 shadow-lg transition-all duration-300 space-y-6 text-[#E5E7EB]"
    >
      {/* 1. Header: Test ID, English Scientific Name & Arabic Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#334155] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold tracking-wider">
              [ TEST 0{test.testNumber} ]
            </span>
            <span className="text-[11px] text-[#94A3B8] font-mono uppercase tracking-wider">
              Biochemical Protocol
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#E5E7EB] tracking-tight">
            {test.titleEn}
          </h2>
          <p className="text-sm font-semibold text-amber-400/90">
            {test.titleAr}
          </p>
        </div>

        {/* Lab Icon */}
        <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-[#334155] flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
          <FlaskConical className="w-6 h-6" />
        </div>
      </div>

      {/* 2. HERO SECTION: "النتيجة" - Visual Test Tubes Side-by-Side */}
      <div className="bg-[#0F172A] border border-[#334155] rounded-2xl p-4 sm:p-6 space-y-5 shadow-inner" id={`hero-results-${test.id}`}>
        <div className="flex items-center justify-between border-b border-[#334155]/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="text-base sm:text-lg font-bold text-[#E5E7EB] tracking-tight">
              النتيجة (RESULT VISUALIZATION)
            </h3>
          </div>
          <span className="text-xs text-[#94A3B8] font-mono">
            Positive vs Negative Comparison
          </span>
        </div>

        {/* Side-by-Side Visual Comparison Tubes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* POSITIVE TUBE CARD */}
          <div className="bg-[#1E293B]/80 border border-emerald-500/40 hover:border-emerald-400 rounded-xl p-4 flex flex-col items-center justify-between space-y-4 relative overflow-hidden group shadow-md">
            {/* Positive Badge */}
            <div className="w-full flex items-center justify-between border-b border-[#334155] pb-2">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>إيجابي (POSITIVE)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-700/50 font-semibold">
                تفاعل إيجابي
              </span>
            </div>

            {/* Test Tube Illustration */}
            <div className="py-3 flex justify-center w-full">
              <BiochemistryTestTube
                type={test.posTubeType}
                height={190}
                width={65}
                showArrowLabel={true}
              />
            </div>

            {/* Positive Labels & Outcome */}
            <div className="w-full bg-[#0F172A]/90 p-3 rounded-lg border border-[#334155] text-center space-y-1">
              <div className="text-xs font-bold text-emerald-300">
                {test.positiveDescAr}
              </div>
              <div className="text-[10px] text-[#94A3B8] font-mono">
                {test.positiveDescEn}
              </div>
              <div className="pt-1 text-[11px] font-semibold text-emerald-400">
                {test.positiveTarget}
              </div>
            </div>
          </div>

          {/* NEGATIVE TUBE CARD */}
          <div className="bg-[#1E293B]/80 border border-slate-600/50 hover:border-slate-500 rounded-xl p-4 flex flex-col items-center justify-between space-y-4 relative overflow-hidden group shadow-md">
            {/* Negative Badge */}
            <div className="w-full flex items-center justify-between border-b border-[#334155] pb-2">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                <XCircle className="w-4 h-4 shrink-0 text-slate-400" />
                <span>سلبي (NEGATIVE)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-700 font-semibold">
                تفاعل سلبي
              </span>
            </div>

            {/* Test Tube Illustration */}
            <div className="py-3 flex justify-center w-full">
              <BiochemistryTestTube
                type={test.negTubeType}
                height={190}
                width={65}
                showArrowLabel={true}
              />
            </div>

            {/* Negative Labels & Outcome */}
            <div className="w-full bg-[#0F172A]/90 p-3 rounded-lg border border-[#334155] text-center space-y-1">
              <div className="text-xs font-bold text-slate-300">
                {test.negativeDescAr}
              </div>
              <div className="text-[10px] text-[#94A3B8] font-mono">
                {test.negativeDescEn}
              </div>
              <div className="pt-1 text-[11px] font-semibold text-slate-400">
                {test.negativeTarget}
              </div>
            </div>
          </div>
        </div>

        {/* Special Benedict Color Scale if Benedict's Test */}
        {test.hasSpecialScale && (
          <div className="pt-2">
            <BenedictColorScale />
          </div>
        )}
      </div>

      {/* 3. Grid for Reagents, Principle & Observation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reagents Card: "الكواشف" */}
        <div className="bg-[#0F172A]/60 border border-[#334155] rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 border-b border-[#334155] pb-2">
            <Beaker className="w-4 h-4" />
            <h4 className="text-sm font-bold text-[#E5E7EB]">
              الكواشف (REAGENTS)
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-[#E5E7EB]">
            {test.reagents.map((reagent, rIdx) => (
              <li key={rIdx} className="flex items-start gap-2 bg-[#1E293B]/70 p-2.5 rounded-lg border border-[#334155]/60 font-mono">
                <span className="text-amber-400 font-bold">•</span>
                <span className="leading-relaxed">{reagent}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Principle Card: "المبدأ" */}
        <div className="bg-[#0F172A]/60 border border-[#334155] rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#5B9BD5] border-b border-[#334155] pb-2">
            <Info className="w-4 h-4" />
            <h4 className="text-sm font-bold text-[#E5E7EB]">
              المبدأ (PRINCIPLE)
            </h4>
          </div>
          <p className="text-xs text-[#CBD5E1] leading-relaxed bg-[#1E293B]/70 p-3 rounded-lg border border-[#334155]/60">
            {test.principle}
          </p>
        </div>
      </div>

      {/* 4. Observation Card: "الملاحظة" */}
      <div className="bg-[#0F172A]/90 border border-indigo-500/30 rounded-xl p-4 sm:p-5 space-y-2">
        <div className="flex items-center gap-2 text-indigo-400">
          <Sparkles className="w-4 h-4" />
          <h4 className="text-sm font-bold text-[#E5E7EB]">
            الملاحظة والاستنتاج السريري (OBSERVATION)
          </h4>
        </div>
        <p className="text-xs text-[#E5E7EB] font-medium leading-relaxed">
          {test.observationAr}
        </p>
        <p className="text-[11px] text-[#94A3B8] font-mono leading-relaxed">
          {test.observationEn}
        </p>
      </div>
    </div>
  );
};
