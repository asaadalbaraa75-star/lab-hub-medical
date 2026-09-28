import React, { useState } from 'react';
import {
  FlaskConical,
  Flame,
  Droplet,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Award,
  Layers,
  Thermometer,
  TestTube as TestTubeIcon
} from 'lucide-react';

export type ProteinExpId = 'albumin' | 'casein' | 'tryptophan';

interface ExperimentConfig {
  id: ProteinExpId;
  badge: string;
  nameEn: string;
  nameAr: string;
  goal: string;
  goalAr: string;
  principle: string;
  principleAr: string;
  steps: {
    number: number;
    title: string;
    instruction: string;
    details: string;
  }[];
  positiveResult: {
    title: string;
    description: string;
    conclusion: string;
  };
  negativeResult: {
    title: string;
    description: string;
    conclusion: string;
  };
  highYield: string;
  memoryTrick: string;
  safety: string;
  interpretationQuiz: {
    question: string;
    questionAr: string;
    options: {
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
}

const EXPERIMENTS: Record<ProteinExpId, ExperimentConfig> = {
  albumin: {
    id: 'albumin',
    badge: 'EXPERIMENT 01 — ALBUMIN',
    nameEn: 'HEAT & ACETIC ACID TEST — ALBUMIN',
    nameAr: 'اختبار الحرارة وحمض الأسيتيك — الكشف عن الألبومين',
    goal: 'Detection of Albumin in clinical biological samples (e.g., urine).',
    goalAr: 'الكشف عن بروتين الألبومين في عينات البول لتشخيص البيلة الألبومينية (Albuminuria).',
    principle: 'Heating causes protein denaturation and coagulation. Acetic acid is then used to help distinguish persistent protein coagulation from non-protein turbidity (such as phosphates and carbonates which dissolve upon acidification).',
    principleAr: 'يؤدي التسخين إلى تمسخ بروتينات الألبومين وتخثرها. يُضاف حمض الأسيتيك للتمييز بين تخثر البروتين الثابت وبين عكارة الفوسفات أو الكربونات (التي تذوب فور التحميض).',
    steps: [
      {
        number: 1,
        title: 'إضافة عينة البول (Sample Addition)',
        instruction: 'ضع 4 mL من عينة البول في أنبوبة الاختبار الزجاجية.',
        details: 'يتم استخدام 4 mL من البول الصافي أو المرشح لضمان رؤية دقيقة للعكارة.'
      },
      {
        number: 2,
        title: 'التسخين في حمام مائي (Water Bath Heating)',
        instruction: 'ضع الأنبوبة في حمام مائي مغلي لمدة 3 دقائق.',
        details: 'درجة حرارة 100°C تؤدي إلى تكسر الروابط الهيدروجينية وتخثر سلاسل الألبومين، مما يولد عكارة واضحة.'
      },
      {
        number: 3,
        title: 'ملاحظة التخثر والتبريد (Observation & Cooling)',
        instruction: 'لاحظ ظهور الخثرة الضبابية (Cloudy coagulate) ثم اترك الأنبوبة لتبرد.',
        details: 'التخثر الأولي قد ينتج عن الألبومين أو عن أملاح الفوسفات غير العضوية.'
      },
      {
        number: 4,
        title: 'إضافة حمض الأسيتيك (Add Acetic Acid)',
        instruction: 'أضف 3 قطرات من حمض الأسيتيك (1–3% Acetic Acid).',
        details: 'يقوم الحمض بإعادة إذابة الفوسفات والكربونات، بينما يبقى تخثر الألبومين ثابتاً غير ذائب.'
      },
      {
        number: 5,
        title: 'ملاحظة النتيجة النهائية (Final Result Observation)',
        instruction: 'افحص استمرار الخثرة البيضاء السحابية في الأنبوبة.',
        details: 'بقاء الخثرة الضبابية بعد التبريد وإضافة الحمض يؤكد وجود الألبومين بشكل قاطع.'
      }
    ],
    positiveResult: {
      title: 'Persistent cloudy coagulate persists after cooling and adding 3 drops acetic acid.',
      description: 'ظهور خثرة سحابية بيضاء متماسكة لا تزول بعد التبريد ولا تذوب بإضافة 3 قطرات من حمض الأسيتيك.',
      conclusion: 'Albumin detected (Albuminuria Positive).'
    },
    negativeResult: {
      title: 'No coagulate forms, or cloudiness completely disappears after adding acetic acid.',
      description: 'عدم تشكل أي خثرة، أو اختفاء العكارة بالكامل عند إضافة حمض الأسيتيك (ناتجة عن فوسفات ذائبة).',
      conclusion: 'Albumin not detected (Negative).'
    },
    highYield: 'Persistent coagulation after cooling + acetic acid = Albumin positive.',
    memoryTrick: 'Heat clots it, Acid keeps it → Albumin fits it! (التسخين يخثرها والحمض يثبتها = ألبومين مؤكد).',
    safety: 'توخ الحذر عند استخدام الحمام المائي الساخن؛ استخدم ماسك الأنابيب الخشبي لمنع الحروق ولا توجه فوهة الأنبوبة نحو الوجه.',
    interpretationQuiz: {
      question: 'After cooling and adding 3 drops of dilute acetic acid, the white cloudy coagulate remained persistent and did not dissolve. How do you interpret this clinical laboratory finding?',
      questionAr: 'بعد تبريد الأنبوبة وإضافة 3 قطرات من حمض الأسيتيك المخفف، بقيت الخثرة البيضاء السحابية مستمرة ولم تذب. كيف تفسر هذه النتيجة المعملية؟',
      options: [
        {
          text: 'Albumin detected: Heat denatured albumin into persistent coagulum unaffected by dilute acid.',
          isCorrect: true,
          explanation: 'صحيح! استمرار الخثرة بعد التبريد وحمض الأسيتيك هو الدليل القاطع على وجود الألبومين، حيث أن عكارة الفوسفات كانت ستذوب فوراً بفعل الحمض.'
        },
        {
          text: 'Negative for Albumin: Persistent coagulate indicates only inorganic phosphate precipitation.',
          isCorrect: false,
          explanation: 'غير صحيح؛ أملاح الفوسفات غير العضوية تذوب تماماً في الوسط الحامضي (حمض الأسيتيك)، واستمرار الخثرة ينفي كونها فوسفات ويؤكد وجود الألبومين.'
        },
        {
          text: 'Test Invalid: The sample must be boiled for at least 30 minutes to detect albumin.',
          isCorrect: false,
          explanation: 'غير صحيح؛ مدة 3 دقائق في الحمام المائي كافية تماماً لتخثر بروتين الألبومين الحساس للحرارة.'
        }
      ]
    }
  },

  casein: {
    id: 'casein',
    badge: 'EXPERIMENT 02 — CASEIN',
    nameEn: 'ISOELECTRIC POINT TEST — CASEIN',
    nameAr: 'اختبار نقطة التعادل الكهربائي — ترسيب الكازين (Casein pI)',
    goal: 'Detection and qualitative precipitation of Casein from milk protein.',
    goalAr: 'الكشف عن بروتين الكازين وعزله بالترسيب النوعي عند نقطة التعادل الكهربائي (pI).',
    principle: 'At its isoelectric point (pI), the net electrical charge of casein becomes zero. Electrostatic repulsion between molecules vanishes, causing minimum solubility and leading to spontaneous precipitation at the bottom of the test tube.',
    principleAr: 'عند نقطة التعادل الكهربائي (Isoelectric Point)، تصبح الشحنة الكهربائية الكلية للكازين صفراً (Net Charge = 0). تختفي قوى التنافر الكهروستاتيكية، فتصل ذائبيته إلى أدنى مستوياتها مما يؤدي إلى ترسبه التلقائي.',
    steps: [
      {
        number: 1,
        title: 'إضافة محلول الكازين (Casein Solution Addition)',
        instruction: 'ضع 3 mL من محلول الكازين الحليبي في أنبوبة الاختبار.',
        details: 'الكازين ذائب ومستقر كغروي في الحليب عند رقمه الهيدروجيني الطبيعي (pH ≈ 6.6).'
      },
      {
        number: 2,
        title: 'إضافة منظم الأسيتات للوصول للـ pI (Add Buffer to pI)',
        instruction: 'أضف محلول منظم حمض الأسيتيك قطرة قطرة لضبط الـ pH بين 4.6 و 4.9.',
        details: 'الرقم الهيدروجيني الحرج لنقطة التعادل الكهربائي للكازين: Casein pI ≈ pH 4.6–4.9.'
      },
      {
        number: 3,
        title: 'الرج اللطيف وتعديل الشحنة (Gentle Inversion & Zero Charge)',
        instruction: 'رج الأنبوبة برفق لمزج الأيونات والسماح بتعادل الشحنات السطحية.',
        details: 'تتحول الجزيئات إلى Zwitterions متعادلة، فتتجاذب السلاسل الكارهة للماء.'
      },
      {
        number: 4,
        title: 'الترسيب والركود (Settling & Precipitation)',
        instruction: 'اترك الأنبوبة عمودياً في الحامل لمدة دقيقتين لملاحظة الانفصال.',
        details: 'ينفصل السائل الرائق في الأعلى بينما يتجمع الراسب الأخضر/الكتلي في القاع.'
      },
      {
        number: 5,
        title: 'ملاحظة الراسب في القاع (Observe Bottom Precipitate)',
        instruction: 'افحص قاع الأنبوبة للتأكد من تكون الراسب الأخضر المميز.',
        details: 'تشكل راسب أخضر واضح في قاع الأنبوبة يؤكد الكشف الإيجابي للكازين.'
      }
    ],
    positiveResult: {
      title: 'Green precipitate forms at the bottom of the test tube.',
      description: 'تشكل وانفصال راسب أخضر/كتلي واضح ومترسب تماماً في قاع أنبوبة الاختبار مع صفاء السائل العلوي.',
      conclusion: 'Casein detected (Positive for Milk Phosphoprotein).'
    },
    negativeResult: {
      title: 'No green precipitate forms at the bottom; solution remains uniformly dispersed.',
      description: 'عدم تشكل أي راسب في القاع، وبقاء المحلول معلقاً أو رائقاً دون أي ترسيب.',
      conclusion: 'Casein not detected (Negative).'
    },
    highYield: 'Green precipitate at the bottom = Casein positive (at pI 4.6–4.9).',
    memoryTrick: 'Casein → Isoelectric point → Low solubility → Precipitation (كازين = نقطة تعادل = أقل ذائبية = ترسب بالقاع).',
    safety: 'تجنب ملامسة المحاليل الحمضية للجلد أو العينين، وارتد القفازات والنظارات الواقية.',
    interpretationQuiz: {
      question: 'During the experiment, when the pH of the milk protein solution was adjusted to ~4.7, a distinct green precipitate formed and accumulated at the bottom of the tube. What is the fundamental biophysical explanation for this?',
      questionAr: 'خلال التجربة، عند ضبط الرقم الهيدروجيني لمحلول البروتين عند ~4.7، تشكل راسب أخضر مميز واستقر في قاع الأنبوبة. ما هو التفسير الفيزيائي الحيوي الأساسي لهذه الظاهرة؟',
      options: [
        {
          text: 'Casein reached its isoelectric point (pI 4.6–4.9), where net charge is zero, electrostatic repulsion ceases, and solubility reaches its minimum.',
          isCorrect: true,
          explanation: 'إجابة صحيحة! عند نقطة التعادل الكهربائي (pI)، تتساوى الشحنات الموجبة والسالبة فيصبح الشحن الكلي صفراً، وتنعدم قوى التنافر الكهربائي فتتجمع جزيئات الكازين وتترسب بالجاذبية.'
        },
        {
          text: 'The protein peptide bonds were completely hydrolyzed into free amino acids.',
          isCorrect: false,
          explanation: 'غير صحيح؛ لم يحدث تحلل مائي للروابط الببتيدية (Hydrolysis)، فالترسيب عند الـ pI هو عملية فيزيائية لانخفاض الذائبية دون تكسير الروابط التساهمية.'
        },
        {
          text: 'Casein acquired an extremely strong positive charge that actively repelled water molecules.',
          isCorrect: false,
          explanation: 'غير صحيح؛ لو اكتسب شحنة قوية لظل ذائباً بفعل التنافر والشحنات المتشابهة، بل إن انعدام الشحنة (Net charge = 0) هو سبب الترسيب.'
        }
      ]
    }
  },

  tryptophan: {
    id: 'tryptophan',
    badge: 'EXPERIMENT 03 — TRYPTOPHAN',
    nameEn: 'HOPKINS–COLE TEST — TRYPTOPHAN',
    nameAr: 'اختبار هوبكنز–كول — الكشف عن التربتوفان (Hopkins–Cole Test)',
    goal: 'Detection of Tryptophan (Indole ring containing amino acid) in proteins.',
    goalAr: 'الكشف النوعي عن الحمض الأميني التربتوفان (حلقة الإندول Indole ring) في البروتينات.',
    principle: 'The indole ring of Tryptophan condenses with glyoxylic acid in the presence of concentrated sulfuric acid (H₂SO₄), producing a characteristic violet/purple ring at the junction of the two liquids.',
    principleAr: 'تتفاعل حلقة الإندول (Indole ring) الخاصة بالتربتوفان مع حمض الجليوكسيليك (Glyoxylic acid) بوجود حمض الكبريتيك المركز (H₂SO₄)، مما يؤدي إلى تكاثف وتكون حلقة بنفسجية/أرجوانية (Violet ring) عند السطح الفاصل بين الطبقتين.',
    steps: [
      {
        number: 1,
        title: 'إضافة العينة المجهولة (Add Unknown Sample)',
        instruction: 'ضع 1 mL من عينة البروتين المجهولة في أنبوبة الاختبار.',
        details: 'يمكن استخدام الببتون (Peptone) كعينة قياسية إيجابية، والجيلاتين (Gelatin) كعينة قياسية سلبية.'
      },
      {
        number: 2,
        title: 'إضافة كاشف حمض الجليوكسيليك (Add Glyoxylic Acid)',
        instruction: 'أضف 1 mL من كاشف حمض الجليوكسيليك (Hopkins-Cole Reagent).',
        details: 'يوفر حمض الجليوكسيليك مجموعة الألدهيد اللازمة للتكاثف مع حلقة الإندول.'
      },
      {
        number: 3,
        title: 'إمالة الأنبوبة بعناية (Incline the Tube at 45°)',
        instruction: 'أمل الأنبوبة بزاوية 45 درجة لتجهيز جدارها لإضافة الحمض بحذر.',
        details: 'الإمالة ضرورية جداً لمنع الاختلاط المباشر وللسماح بتشكل طبقتين منفصلتين حسب الكثافة.'
      },
      {
        number: 4,
        title: 'إضافة حمض الكبريتيك المركز (Carefully Add Conc. H₂SO₄)',
        instruction: 'أضف بحرص شديد 1 mL من H₂SO₄ المركز ببطء على طول جدار الأنبوبة الداخلي.',
        details: 'حمض الكبريتيك المركز عالي الكثافة (1.84 g/cm³) ويهبط إلى القاع مشكلاً طبقة سفلية دون فوران.'
      },
      {
        number: 5,
        title: 'ملاحظة الحلقة البنفسجية عند السطح الفاصل (Observe Violet Ring)',
        instruction: 'افحص السطح الفاصل بين الطبقتين لملاحظة تكون الحلقة البنفسجية الأرجوانية.',
        details: 'ظهور حلقة بنفسجية (Violet/purple ring) عند الواجهة الفاصلة يدل على تفاعل إيجابي صريح للتربتوفان.'
      }
    ],
    positiveResult: {
      title: 'Violet / purple ring appears at the liquid-liquid interface.',
      description: 'ظهور حلقة بنفسجية أو أرجوانية زاهية ومحددة بدقة عند السطح الفاصل بين طبقة الحمض والطبقة المائية.',
      conclusion: 'Tryptophan present (Indole ring containing protein confirmed).'
    },
    negativeResult: {
      title: 'No violet/purple ring forms at the interface.',
      description: 'عدم ظهور أي حلقة بنفسجية عند السطح الفاصل (كما في الجيلاتين لافتقاره للتربتوفان).',
      conclusion: 'Tryptophan not detected.'
    },
    highYield: 'Violet ring at interface = Tryptophan positive. Controls: Peptone (+), Gelatin (-).',
    memoryTrick: 'Hopkins–Cole → Halo of Violet for Indole! (هوبكنز-كول = هالة بنفسجية لحلقة إندول التربتوفان).',
    safety: 'تحذير شديد: حمض الكبريتيك المركز (Concentrated H₂SO₄) مادة كاوية حارقة وتفاعلها طارد للحرارة بشدة! يجب سكبها ببطء على الجدار المائل، ولا ترج الأنبوبة بعد إضافة الحمض منعاً لتناثر السائل.',
    interpretationQuiz: {
      question: 'After carefully adding concentrated H₂SO₄ down the side of the tube containing the unknown protein and glyoxylic acid, a distinct violet/purple ring formed at the interface. What is the biochemical identity of this reaction?',
      questionAr: 'بعد إضافة حمض الكبريتيك المركز بحذر على جدار الأنبوبة المحتوية على بروتين مجهول وحمض الجليوكسيليك، تشكلت حلقة بنفسجية واضحة عند السطح الفاصل. ما هي الهوية الكيميائية الحيوية لهذا التفاعل؟',
      options: [
        {
          text: 'Tryptophan is present: Its indole heterocyclic ring condensed with glyoxylic acid in the presence of conc. H₂SO₄.',
          isCorrect: true,
          explanation: 'إجابة صحيحة! اختبار هوبكنز-كول نوعي لحلقة الإندول الخاصة بالتربتوفان، وظهور الحلقة البنفسجية هو النتيجة الإيجابية النموذجية.'
        },
        {
          text: 'Gelatin is present: Gelatin contains high concentrations of tryptophan producing the purple ring.',
          isCorrect: false,
          explanation: 'غير صحيح! الجيلاتين (Gelatin) بروتين ناقص يفتقر تماماً للتربتوفان ويعد هو الشاهد السلبي الكلاسيكي (Negative Control) في هذا الاختبار.'
        },
        {
          text: 'Tyrosine is present: The phenolic ring reacts with glyoxylic acid to generate the violet ring.',
          isCorrect: false,
          explanation: 'غير صحيح؛ كشف التيروزين يتم باختبار ميلون (Millon\'s Test) وليس هوبكنز-كول الذي يختص تحديداً بالتربتوفان.'
        }
      ]
    }
  }
};

export const ProteinTestsInteractiveLab: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<ProteinExpId>('albumin');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [sampleOutcome, setSampleOutcome] = useState<'positive' | 'negative'>('positive');
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'experiment' | 'comparison'>('experiment');

  const exp = EXPERIMENTS[selectedExpId];
  const maxSteps = exp.steps.length;
  const isFinalStep = currentStepIndex >= maxSteps - 1;

  const handleSelectExp = (id: ProteinExpId) => {
    setSelectedExpId(id);
    setCurrentStepIndex(0);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < maxSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleRunFullSequence = () => {
    setCurrentStepIndex(maxSteps - 1);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300" id="protein-tests-interactive-suite">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] border border-purple-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/40 text-purple-300 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-purple-400" />
                <span>BIOCHEMISTRY LAB — PROTEIN TESTS (التجارب المعملية التفاعلية)</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              تجارب الكشف المعملي عن البروتينات والأحماض الأمينية
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              معمل تفاعلي مخصص لطلاب الطب البشري (سنة أولى): أنابيب اختبار افتراضية تحاكي الخطوات التسلسلية، الملاحظة الدقيقة، واختبار التفسير الطبي المباشر.
            </p>
          </div>

          {/* Quick tab toggle: Experiment vs Final Comparison Card */}
          <div className="flex items-center gap-2 bg-[#0B1120] p-1.5 rounded-2xl border border-purple-500/30 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('experiment')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'experiment'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🧪 التجارب التفاعلية (3 Tests)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('comparison')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              📊 بطاقة المقارنة الشاملة (Summary Card)
            </button>
          </div>
        </div>

        {/* 3 Experiments Selector */}
        {activeTab === 'experiment' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
            {/* 1. Albumin */}
            <button
              type="button"
              onClick={() => handleSelectExp('albumin')}
              className={`text-right p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                selectedExpId === 'albumin'
                  ? 'bg-purple-500/20 border-purple-400 ring-2 ring-purple-500/40 shadow-lg text-white'
                  : 'bg-[#1E293B]/70 border-slate-800 hover:bg-[#1E293B] text-slate-300'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">
                  TEST 01
                </span>
                <span className="text-sm font-bold block text-white">
                  Heat & Acetic Acid Test
                </span>
                <span className="text-xs text-slate-400 block font-arabic">
                  كشف الألبومين (Albumin)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-purple-300">
                Persistent Coagulate
              </span>
            </button>

            {/* 2. Casein */}
            <button
              type="button"
              onClick={() => handleSelectExp('casein')}
              className={`text-right p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                selectedExpId === 'casein'
                  ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg text-white'
                  : 'bg-[#1E293B]/70 border-slate-800 hover:bg-[#1E293B] text-slate-300'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                  TEST 02
                </span>
                <span className="text-sm font-bold block text-white">
                  Isoelectric Point (pI)
                </span>
                <span className="text-xs text-slate-400 block font-arabic">
                  كشف وترسيب الكازين (Casein)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-300">
                Green Precipitate
              </span>
            </button>

            {/* 3. Tryptophan */}
            <button
              type="button"
              onClick={() => handleSelectExp('tryptophan')}
              className={`text-right p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                selectedExpId === 'tryptophan'
                  ? 'bg-indigo-500/20 border-indigo-400 ring-2 ring-indigo-500/40 shadow-lg text-white'
                  : 'bg-[#1E293B]/70 border-slate-800 hover:bg-[#1E293B] text-slate-300'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase block">
                  TEST 03
                </span>
                <span className="text-sm font-bold block text-white">
                  Hopkins–Cole Test
                </span>
                <span className="text-xs text-slate-400 block font-arabic">
                  كشف التربتوفان (Tryptophan)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-300">
                Violet Ring
              </span>
            </button>
          </div>
        )}
      </div>

      {/* RENDER VIEW A: ACTIVE INTERACTIVE EXPERIMENT */}
      {activeTab === 'experiment' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 7 COLS: LAB PROTOCOL, STEPS & OBSERVATION */}
          <div className="lg:col-span-7 space-y-6">
            {/* Experiment Dossier Card */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
              {/* Header Title */}
              <div className="border-b border-[#334155] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0F172A] border border-slate-700 text-purple-300">
                    {exp.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1.5">
                    {exp.nameEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-arabic">
                    {exp.nameAr}
                  </p>
                </div>

                {/* Sample Mode Toggle (Positive Control vs Negative Control) */}
                <div className="flex items-center gap-1.5 bg-[#0F172A] p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setSampleOutcome('positive');
                      setCurrentStepIndex(0);
                      setQuizSubmitted(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      sampleOutcome === 'positive'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    عينة إيجابية (Positive)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSampleOutcome('negative');
                      setCurrentStepIndex(0);
                      setQuizSubmitted(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      sampleOutcome === 'negative'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    عينة سلبية (Negative)
                  </button>
                </div>
              </div>

              {/* Goal & Principle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0F172A]/80 border border-slate-800 p-4 rounded-2xl space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Goal (الهدف المعملي)</span>
                  </span>
                  <p className="text-xs text-white font-medium">{exp.goal}</p>
                  <p className="text-xs text-slate-400 font-arabic">{exp.goalAr}</p>
                </div>

                <div className="bg-[#0F172A]/80 border border-slate-800 p-4 rounded-2xl space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Principle (المبدأ العلمي)</span>
                  </span>
                  <p className="text-xs text-white font-medium">{exp.principle}</p>
                  <p className="text-xs text-slate-400 font-arabic">{exp.principleAr}</p>
                </div>
              </div>

              {/* Procedure Step-by-Step Interactive Workflow */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>خطوات التجربة المتسلسلة (Sequential Procedure)</span>
                  </h4>
                  <span className="text-xs font-mono text-slate-400">
                    الخطوة {currentStepIndex + 1} من {maxSteps}
                  </span>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-5 gap-1.5">
                  {exp.steps.map((st, sIdx) => {
                    const isPassed = sIdx <= currentStepIndex;
                    const isCurrent = sIdx === currentStepIndex;
                    return (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => setCurrentStepIndex(sIdx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-purple-500 ring-2 ring-purple-400/50'
                            : isPassed
                            ? 'bg-purple-700'
                            : 'bg-slate-800'
                        }`}
                        title={`الخطوة ${st.number}: ${st.title}`}
                      />
                    );
                  })}
                </div>

                {/* Current Active Step Details Card */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-500/30">
                      STEP 0{exp.steps[currentStepIndex].number}: {exp.steps[currentStepIndex].title}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {isFinalStep ? 'الخطوة الأخيرة (الملاحظة)' : 'تابع الخطوة التالية'}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-white font-arabic">
                    {exp.steps[currentStepIndex].instruction}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed font-arabic">
                    {exp.steps[currentStepIndex].details}
                  </p>

                  {/* Step Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={currentStepIndex === 0}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-xs text-slate-300 font-semibold transition-colors cursor-pointer"
                    >
                      السابق
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>إعادة</span>
                      </button>

                      {!isFinalStep ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md flex items-center gap-1 cursor-pointer"
                        >
                          <span>الخطوة التالية</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                          تم اكتمال التفاعل ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Observation Section: Only revealed when reaching the final step! */}
              <div className="space-y-3 pt-2 border-t border-[#334155]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Observation & Result (الملاحظة والنتيجة المخبرية)</span>
                </h4>

                {!isFinalStep ? (
                  <div className="bg-[#0F172A] border border-dashed border-slate-700 p-5 rounded-2xl text-center space-y-2">
                    <p className="text-xs text-slate-400">
                      🔒 النتيجة والملاحظة محجوبة حتى يكمل الطالب جميع خطوات التفاعل المعملي في الأنبوبة الافتراضية.
                    </p>
                    <button
                      type="button"
                      onClick={handleRunFullSequence}
                      className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 underline font-semibold cursor-pointer"
                    >
                      تنفيذ جميع الخطوات فوراً والملاحظة
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        sampleOutcome === 'positive'
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                          : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                          {sampleOutcome === 'positive' ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-300">Positive Result: {exp.positiveResult.conclusion}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-400" />
                              <span className="text-rose-300">Negative Result: {exp.negativeResult.conclusion}</span>
                            </>
                          )}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10">
                          {sampleOutcome.toUpperCase()} CONTROL
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-arabic font-medium">
                        {sampleOutcome === 'positive'
                          ? exp.positiveResult.description
                          : exp.negativeResult.description}
                      </p>
                    </div>

                    {/* High Yield & Memory Trick & Safety */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="bg-amber-950/20 border border-amber-500/30 p-3.5 rounded-xl space-y-1">
                        <span className="text-[11px] font-mono text-amber-300 font-bold flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>HIGH YIELD CLINICAL PEARL:</span>
                        </span>
                        <p className="text-xs text-amber-100 font-semibold">{exp.highYield}</p>
                      </div>

                      <div className="bg-purple-950/20 border border-purple-500/30 p-3.5 rounded-xl space-y-1">
                        <span className="text-[11px] font-mono text-purple-300 font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>MEMORY TRICK:</span>
                        </span>
                        <p className="text-xs text-purple-100 font-semibold">{exp.memoryTrick}</p>
                      </div>
                    </div>

                    {/* Safety Alert */}
                    <div className="bg-rose-950/20 border border-rose-500/30 p-3.5 rounded-xl flex items-start gap-2 text-rose-200">
                      <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-0.5 font-arabic">
                        <span className="font-bold block text-rose-300">إرشادات الأمان المعملي (Safety):</span>
                        <p className="text-rose-200/90">{exp.safety}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* "INTERPRET THE RESULT" CLINICAL QUIZ */}
            {isFinalStep && (
              <div className="bg-[#1E293B] border border-purple-500/40 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2.5 border-b border-[#334155] pb-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                      CLINICAL INTERPRETATION TEST
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white font-arabic">
                      فسّر النتيجة المعملية (Interpret the Result)
                    </h4>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">
                    {exp.interpretationQuiz.question}
                  </p>
                  <p className="text-xs text-slate-400 font-arabic">
                    {exp.interpretationQuiz.questionAr}
                  </p>
                </div>

                {/* Answer Choices */}
                <div className="space-y-2.5 pt-2">
                  {exp.interpretationQuiz.options.map((option, optIdx) => {
                    const isSelected = selectedQuizOption === optIdx;
                    let btnStyle = 'bg-[#0F172A] hover:bg-slate-900 border-slate-800 text-slate-300';

                    if (quizSubmitted) {
                      if (isSelected) {
                        btnStyle = option.isCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500'
                          : 'bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500';
                      } else if (option.isCorrect) {
                        btnStyle = 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => {
                          setSelectedQuizOption(optIdx);
                          setQuizSubmitted(true);
                        }}
                        className={`w-full text-right p-3.5 rounded-xl border text-xs sm:text-sm font-arabic font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span>{option.text}</span>
                        {quizSubmitted && isSelected && (
                          option.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          )
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Banner */}
                {quizSubmitted && selectedQuizOption !== null && (
                  <div
                    className={`p-4 rounded-2xl border space-y-1.5 animate-in fade-in duration-200 ${
                      exp.interpretationQuiz.options[selectedQuizOption].isCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100'
                        : 'bg-rose-950/30 border-rose-500/50 text-rose-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold font-mono text-xs">
                      {exp.interpretationQuiz.options[selectedQuizOption].isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-300">Correct Answer! (إجابة صحيحة)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span className="text-rose-300">Incorrect! (إجابة غير صحيحة)</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-arabic leading-relaxed pt-1">
                      {exp.interpretationQuiz.options[selectedQuizOption].explanation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT 5 COLS: REALISTIC VIRTUAL TEST TUBE & OBSERVATION APPARATUS */}
          <div className="lg:col-span-5 bg-[#1E293B] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-5 sticky top-6">
            <div className="flex items-center justify-between border-b border-[#334155] pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center gap-1.5">
                <TestTubeIcon className="w-4 h-4" />
                <span>Virtual Realistic Test Tube (الأنبوبة الافتراضية)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                16x150 mm Borosilicate Glass
              </span>
            </div>

            {/* Test Tube Stand & Physics Viewport */}
            <div className="relative w-full h-96 bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#0B1120] rounded-2xl border border-slate-800 flex flex-col items-center justify-end p-6 overflow-hidden shadow-inner">
              {/* Bench Clamp / Stand Graphic */}
              <div className="absolute top-8 w-24 h-3 bg-slate-700/80 rounded-full border border-slate-600 shadow-md" />
              <div className="absolute top-11 w-4 h-72 bg-gradient-to-r from-slate-600 to-slate-800 rounded-sm -z-0" />

              {/* Status Pill in Stand View */}
              <div className="absolute top-3 left-3 bg-[#0F172A]/90 border border-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300">
                STEP {currentStepIndex + 1}/{maxSteps}
              </div>

              {selectedExpId === 'albumin' && currentStepIndex === 1 && (
                <div className="absolute top-3 right-3 bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 rounded-lg text-[10px] font-mono text-amber-300 flex items-center gap-1 animate-pulse">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>HEATING 100°C</span>
                </div>
              )}

              {/* REALISTIC SVG TEST TUBE */}
              <div className="relative z-10 w-20 h-80 flex flex-col items-center justify-end">
                <svg
                  viewBox="0 0 80 320"
                  className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
                >
                  <defs>
                    {/* Glass Reflection Gradient */}
                    <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                      <stop offset="15%" stopColor="#ffffff" stopOpacity="0.05" />
                      <stop offset="70%" stopColor="#ffffff" stopOpacity="0.0" />
                      <stop offset="90%" stopColor="#ffffff" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                    </linearGradient>

                    {/* Albumin Urine Liquid Gradient */}
                    <linearGradient id="urineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#FACC15" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#EAB308" stopOpacity="0.8" />
                    </linearGradient>

                    {/* Casein Milky Liquid Gradient */}
                    <linearGradient id="caseinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.75" />
                      <stop offset="50%" stopColor="#CBD5E1" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.75" />
                    </linearGradient>

                    {/* Casein Green Precipitate Gradient */}
                    <linearGradient id="caseinGreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.98" />
                    </linearGradient>

                    {/* Sulfuric Acid Dense Layer Gradient */}
                    <linearGradient id="h2so4Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.7" />
                    </linearGradient>

                    {/* Violet Ring Glow Filter */}
                    <filter id="violetGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="glow" />
                      <feComposite in="SourceGraphic" in2="glow" operator="over" />
                    </filter>
                  </defs>

                  {/* Glass Outer Rim */}
                  <ellipse cx="40" cy="12" rx="30" ry="6" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
                  <ellipse cx="40" cy="14" rx="26" ry="4" fill="#0F172A" stroke="#475569" strokeWidth="1" />

                  {/* Glass Tube Body Path */}
                  <path
                    d="M 12 14 L 12 280 A 28 28 0 0 0 68 280 L 68 14 Z"
                    fill="rgba(255, 255, 255, 0.04)"
                    stroke="#64748B"
                    strokeWidth="2"
                  />

                  {/* LIQUID SIMULATION ACCORDING TO EXPERIMENT & STEP */}
                  {/* ================================================= */}

                  {/* EXPERIMENT 1: ALBUMIN */}
                  {selectedExpId === 'albumin' && (
                    <g>
                      {/* Fluid Level (fills up to height 160) */}
                      <path
                        d="M 14 160 L 14 280 A 26 26 0 0 0 66 280 L 66 160 Z"
                        fill="url(#urineGrad)"
                      />

                      {/* Meniscus */}
                      <ellipse cx="40" cy="160" rx="26" ry="4" fill="#FEF08A" opacity="0.6" />

                      {/* Heating steam / bubbles (Step 2) */}
                      {currentStepIndex === 1 && (
                        <g opacity="0.8">
                          <circle cx="30" cy="240" r="2.5" fill="#ffffff" className="animate-ping" />
                          <circle cx="50" cy="200" r="3" fill="#ffffff" className="animate-ping" />
                          <circle cx="38" cy="175" r="2" fill="#ffffff" />
                        </g>
                      )}

                      {/* Cloudy Coagulate Flakes (Step 3, 4, 5) */}
                      {currentStepIndex >= 2 && sampleOutcome === 'positive' && (
                        <g>
                          {/* Dense White Cloudy Flocculent Coagulate */}
                          <ellipse cx="40" cy="200" rx="20" ry="12" fill="#FFFFFF" opacity="0.75" />
                          <ellipse cx="36" cy="230" rx="22" ry="15" fill="#FFFFFF" opacity="0.85" />
                          <ellipse cx="45" cy="260" rx="18" ry="14" fill="#F8FAFC" opacity="0.9" />
                          <ellipse cx="38" cy="275" rx="20" ry="10" fill="#F1F5F9" opacity="0.95" />
                          {/* Tiny flocculent particles */}
                          <circle cx="26" cy="180" r="3" fill="#ffffff" opacity="0.9" />
                          <circle cx="52" cy="190" r="3.5" fill="#ffffff" opacity="0.9" />
                          <circle cx="32" cy="215" r="2.5" fill="#ffffff" opacity="0.9" />
                          <circle cx="48" cy="240" r="3" fill="#ffffff" opacity="0.9" />
                        </g>
                      )}

                      {/* If Negative Sample: Remains clear or cloudiness vanished */}
                      {currentStepIndex >= 2 && sampleOutcome === 'negative' && (
                        <g opacity="0.2">
                          <circle cx="40" cy="240" r="2" fill="#ffffff" />
                        </g>
                      )}
                    </g>
                  )}

                  {/* EXPERIMENT 2: CASEIN */}
                  {selectedExpId === 'casein' && (
                    <g>
                      {/* Fluid Base (Milky supernatant or clear supernatant) */}
                      <path
                        d="M 14 150 L 14 280 A 26 26 0 0 0 66 280 L 66 150 Z"
                        fill={
                          currentStepIndex >= 3 && sampleOutcome === 'positive'
                            ? 'rgba(241, 245, 249, 0.4)' // cleared supernatant on top
                            : 'url(#caseinGrad)'
                        }
                      />
                      <ellipse cx="40" cy="150" rx="26" ry="4" fill="#E2E8F0" opacity="0.6" />

                      {/* Green Precipitate at Bottom (Visible at final steps for positive) */}
                      {currentStepIndex >= 3 && sampleOutcome === 'positive' && (
                        <g>
                          {/* Dense Green Precipitate Cake at the bottom */}
                          <path
                            d="M 14 260 C 14 275, 25 295, 40 295 C 55 295, 66 275, 66 260 C 55 264, 25 264, 14 260 Z"
                            fill="url(#caseinGreenGrad)"
                          />
                          {/* Green flocculent sediment clumps */}
                          <ellipse cx="38" cy="260" rx="24" ry="7" fill="#10B981" opacity="0.95" />
                          <ellipse cx="42" cy="268" rx="20" ry="6" fill="#059669" />
                          <ellipse cx="35" cy="278" rx="16" ry="6" fill="#047857" />
                          <circle cx="28" cy="254" r="2.5" fill="#34D399" />
                          <circle cx="50" cy="256" r="3" fill="#34D399" />
                        </g>
                      )}
                    </g>
                  )}

                  {/* EXPERIMENT 3: TRYPTOPHAN (HOPKINS-COLE) */}
                  {selectedExpId === 'tryptophan' && (
                    <g>
                      {/* Dense Lower Layer: Concentrated H2SO4 (added in steps 3, 4, 5) */}
                      {currentStepIndex >= 3 ? (
                        <>
                          {/* Bottom H2SO4 layer */}
                          <path
                            d="M 14 230 L 14 280 A 26 26 0 0 0 66 280 L 66 230 Z"
                            fill="url(#h2so4Grad)"
                          />
                          {/* Top Aqueous Sample + Glyoxylic Layer */}
                          <rect x="14" y="150" width="52" height="80" fill="rgba(244, 244, 245, 0.45)" />
                          <ellipse cx="40" cy="150" rx="26" ry="4" fill="#F4F4F5" opacity="0.5" />

                          {/* THE VIOLET / PURPLE RING AT THE INTERFACE (y = 230) */}
                          {sampleOutcome === 'positive' && (
                            <g filter="url(#violetGlow)">
                              {/* Vivid Violet Ring */}
                              <ellipse cx="40" cy="230" rx="25" ry="6" fill="#A855F7" opacity="0.95" />
                              <ellipse cx="40" cy="230" rx="25" ry="3.5" fill="#C084FC" opacity="0.9" />
                              <line x1="15" y1="230" x2="65" y2="230" stroke="#7E22CE" strokeWidth="3" />
                            </g>
                          )}
                        </>
                      ) : (
                        /* Initial Sample only */
                        <>
                          <path
                            d="M 14 210 L 14 280 A 26 26 0 0 0 66 280 L 66 210 Z"
                            fill="rgba(244, 244, 245, 0.45)"
                          />
                          <ellipse cx="40" cy="210" rx="26" ry="4" fill="#F4F4F5" opacity="0.5" />
                        </>
                      )}
                    </g>
                  )}

                  {/* Graduation Markings */}
                  <line x1="58" y1="140" x2="66" y2="140" stroke="#94A3B8" strokeWidth="1" />
                  <text x="50" y="142" fill="#94A3B8" fontSize="6" fontFamily="monospace">5ml</text>
                  <line x1="60" y1="170" x2="66" y2="170" stroke="#94A3B8" strokeWidth="1" />
                  <text x="50" y="172" fill="#94A3B8" fontSize="6" fontFamily="monospace">4ml</text>
                  <line x1="60" y1="200" x2="66" y2="200" stroke="#94A3B8" strokeWidth="1" />
                  <text x="50" y="202" fill="#94A3B8" fontSize="6" fontFamily="monospace">3ml</text>
                  <line x1="60" y1="230" x2="66" y2="230" stroke="#94A3B8" strokeWidth="1" />
                  <text x="50" y="232" fill="#94A3B8" fontSize="6" fontFamily="monospace">2ml</text>
                  <line x1="60" y1="260" x2="66" y2="260" stroke="#94A3B8" strokeWidth="1" />
                  <text x="50" y="262" fill="#94A3B8" fontSize="6" fontFamily="monospace">1ml</text>

                  {/* Glass Surface Sheen & Highlights */}
                  <path
                    d="M 14 16 L 14 278 A 26 26 0 0 0 25 298 L 25 16 Z"
                    fill="url(#glassReflection)"
                  />
                  <line x1="64" y1="20" x2="64" y2="270" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
                </svg>
              </div>

              {/* Real-time Visual Appearance Label */}
              <div className="mt-3 text-center space-y-0.5">
                <span className="text-[11px] font-mono font-bold text-slate-300 block">
                  {selectedExpId === 'albumin' && (
                    sampleOutcome === 'positive' && currentStepIndex >= 2
                      ? '☁️ Persistent Cloudy Coagulate (خثرة سحابية ثابتة)'
                      : 'Clear urine / Uncoagulated sample'
                  )}
                  {selectedExpId === 'casein' && (
                    sampleOutcome === 'positive' && currentStepIndex >= 3
                      ? '🟢 Green Precipitate at Bottom (راسب أخضر بالقاع)'
                      : 'Milky colloidal dispersion'
                  )}
                  {selectedExpId === 'tryptophan' && (
                    sampleOutcome === 'positive' && currentStepIndex >= 3
                      ? '🟣 Violet Ring at Interface (حلقة بنفسجية بالفاصل)'
                      : 'Colorless two-phase interface'
                  )}
                </span>
                <span className="text-[10px] text-slate-400">
                  Observe through clear borosilicate wall
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER VIEW B: FINAL COMPARISON CARD */}
      {activeTab === 'comparison' && (
        <div className="bg-[#1E293B] border border-purple-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#334155] pb-4">
            <div>
              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                FINAL COMPARISON MASTER CARD
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 font-display">
                بطاقة المقارنة الشاملة لاختبارات البروتين (Protein Tests Master Table)
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                الملخص الامتحاني عالي العائد المعتمد لطلاب الطب البشري (سنة أولى).
              </p>
            </div>
            <span className="text-xs font-mono text-purple-400 bg-[#0F172A] px-3 py-1.5 rounded-xl border border-slate-700 self-start sm:self-auto">
              3 Core Tests • Definitive Visuals
            </span>
          </div>

          {/* Master 3-Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Heat & Acetic Acid */}
            <div className="bg-[#0F172A] border-2 border-purple-500/40 rounded-2xl p-5 space-y-4 shadow-lg hover:border-purple-400 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                  TEST 01
                </span>
                <span className="text-xl">☁️</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  Heat & Acetic Acid Test
                </h4>
                <p className="text-xs text-purple-400 font-mono font-bold">
                  Target: Albumin (الألبومين)
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-arabic pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold">Positive Visual:</span>
                  <span className="font-bold text-emerald-300">Persistent cloudy coagulate</span>
                  <span className="block text-slate-400 text-[11px]">(خثرة سحابية بيضاء لا تزول بالحمض)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold">High Yield Pearl:</span>
                  <span className="text-amber-300">Persistent coagulation after cooling + acetic acid = Albumin positive.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-200">
                Heat & Acetic Acid → Albumin → Persistent coagulate
              </div>
            </div>

            {/* Card 2: Isoelectric Point Casein */}
            <div className="bg-[#0F172A] border-2 border-emerald-500/40 rounded-2xl p-5 space-y-4 shadow-lg hover:border-emerald-400 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  TEST 02
                </span>
                <span className="text-xl">🟢</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  Isoelectric Point Test
                </h4>
                <p className="text-xs text-emerald-400 font-mono font-bold">
                  Target: Casein (كازين الحليب)
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-arabic pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold">Positive Visual:</span>
                  <span className="font-bold text-emerald-300">Green precipitate at bottom</span>
                  <span className="block text-slate-400 text-[11px]">(راسب أخضر مترسب في قاع الأنبوبة)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold">Critical Value:</span>
                  <span className="text-emerald-300 font-mono font-bold">Casein pI ≈ pH 4.6–4.9</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-200">
                Isoelectric Point → Casein → Green precipitate
              </div>
            </div>

            {/* Card 3: Hopkins-Cole Tryptophan */}
            <div className="bg-[#0F172A] border-2 border-indigo-500/40 rounded-2xl p-5 space-y-4 shadow-lg hover:border-indigo-400 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                  TEST 03
                </span>
                <span className="text-xl">🟣</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  Hopkins–Cole Test
                </h4>
                <p className="text-xs text-indigo-400 font-mono font-bold">
                  Target: Tryptophan Indole Ring
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-arabic pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold">Positive Visual:</span>
                  <span className="font-bold text-indigo-300">Violet / purple ring at interface</span>
                  <span className="block text-slate-400 text-[11px]">(حلقة بنفسجية عند السطح الفاصل)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold">Key Controls:</span>
                  <span className="text-indigo-200">Peptone: Positive (+) | Gelatin: Negative (-)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-200">
                Hopkins–Cole → Tryptophan → Violet ring
              </div>
            </div>
          </div>

          {/* Quick Summary Strip */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-mono font-bold">
              SUMMARY FORMULA:
            </span>
            <div className="flex flex-wrap items-center gap-3 text-white font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-500/30">
                Heat + Acetic Acid → Albumin → Persistent coagulate
              </span>
              <span className="text-slate-500">•</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                Isoelectric Point → Casein → Green precipitate
              </span>
              <span className="text-slate-500">•</span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                Hopkins–Cole → Tryptophan → Violet ring
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
