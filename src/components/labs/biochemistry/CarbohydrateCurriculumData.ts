/*
 * © LAB HUB · Developed by Sakina Asaad
 * Carbohydrate Identification Experiments Curriculum
 *
 * STRICT REQUIREMENT: The final and ONLY order must be:
 * 1. Molisch's Test
 * 2. Iodine Test
 * 3. Benedict's Test
 * 4. Barfoed's Test
 * 5. Seliwanoff's Test
 *
 * Scientific spellings:
 * - Molisch's Test
 * - Iodine Test
 * - Benedict's Test
 * - Barfoed's Test
 * - Seliwanoff's Test
 */

import { TestTubeType } from './BiochemistryTestTube';

export type CarbohydrateExperimentId = 'molisch' | 'iodine' | 'benedict' | 'barfoed' | 'seliwanoff';

export interface ExperimentMCQ {
  id: number;
  question: string;
  questionAr: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

export interface CarbohydrateExperiment {
  id: 'molisch' | 'iodine' | 'benedict' | 'barfoed' | 'seliwanoff';
  order: number; // 1 to 5 strictly
  name: string; // Scientific spelling: "Molisch's Test", "Iodine Test", "Benedict's Test", "Barfoed's Test", "Seliwanoff's Test"
  nameAr: string;
  tagline: string;
  taglineAr: string;
  categoryBadge: string;
  
  // 1. LESSON (Overview, Principles, Equations, Clinical Relevance)
  lesson: {
    summaryEn: string;
    summaryAr: string;
    principleEn: string;
    principleAr: string;
    chemicalEquation: string;
    chemicalMechanism: string[];
    reagents: {
      name: string;
      role: string;
      roleAr: string;
    }[];
    clinicalRelevanceEn: string;
    clinicalRelevanceAr: string;
    targetAnalytesEn: string;
    targetAnalytesAr: string;
  };

  // 2. REAL LABORATORY IMAGE
  realImage: {
    url: string;
    captionEn: string;
    captionAr: string;
    plateType: string;
    magnification: string;
    positiveVisualDescription: string;
    negativeVisualDescription: string;
  };

  // Tube renderers for interactive comparison
  tubes: {
    posTubeType: TestTubeType;
    negTubeType: TestTubeType;
    posLabelEn: string;
    posLabelAr: string;
    posTarget: string;
    negLabelEn: string;
    negLabelAr: string;
    negTarget: string;
    hasSpecialScale?: boolean;
  };

  // 3. PROCEDURE (Step-by-step Laboratory Protocol)
  procedure: {
    steps: {
      stepNumber: number;
      titleEn: string;
      titleAr: string;
      instructionEn: string;
      instructionAr: string;
    }[];
    incubationTime: string;
    temperature: string;
    safetyPrecautionsEn: string[];
    safetyPrecautionsAr: string[];
    criticalPitfallsEn: string[];
    criticalPitfallsAr: string[];
  };

  // 4. OBSERVATION
  observation: {
    whatToLookForEn: string;
    whatToLookForAr: string;
    positiveVisualEn: string;
    positiveVisualAr: string;
    negativeVisualEn: string;
    negativeVisualAr: string;
    colorTransitionsEn?: string[];
    keyFeatures: string[];
  };

  // 5. RESULT & INTERPRETATION
  interpretation: {
    positiveDeductionEn: string;
    positiveDeductionAr: string;
    negativeDeductionEn: string;
    negativeDeductionAr: string;
    diagnosticAlgorithmStep: string;
    clinicalScenarios: {
      scenario: string;
      outcome: string;
    }[];
  };

  // 6. DOCTOR EXPLANATION VIDEO
  doctorVideo: {
    videoId: string;
    youtubeUrl: string;
    titleEn: string;
    titleAr: string;
    doctorName: string;
    doctorTitle: string;
    channelTitle: string;
    duration: string;
    objectives: string[];
    highYieldPoints: string[];
  };

  // 7. QUESTIONS (MCQ Knowledge Check)
  questions: ExperimentMCQ[];
}

export const CARBOHYDRATE_EXPERIMENTS: CarbohydrateExperiment[] = [
  // ==========================================
  // EXPERIMENT 1: Molisch's Test
  // ==========================================
  {
    id: 'molisch',
    order: 1,
    name: "Molisch's Test",
    nameAr: "اختبار موليش",
    tagline: "General Qualitative Screening Test for All Carbohydrates",
    taglineAr: "الاختبار الكشفي العام الشامل لجميع أنواع الكربوهيدرات",
    categoryBadge: "Universal Screening Assay",
    lesson: {
      summaryEn: "Molisch's test is the universal first-line screening test for carbohydrates. A positive result (purple ring at the liquid-liquid interface) proves the presence of carbohydrate molecules, while a negative result completely excludes all carbohydrates from the unknown sample.",
      summaryAr: "اختبار موليش هو الفحص الكشفي الأولي الشامل لكافة أنواع الكربوهيدرات. النتيجة الإيجابية (حلقة بنفسجية عند السطح الفاصل) تؤكد وجود جزيئات سكرية، بينما النتيجة السلبية تستبعد وجود أي نوع من الكربوهيدرات نهائياً.",
      principleEn: "Concentrated sulfuric acid (H₂SO₄) acts as a powerful dehydrating agent that dehydrates carbohydrates into cyclic furfural derivatives. Pentoses yield furfural, while hexoses yield 5-hydroxymethylfurfural (5-HMF). These furfural aldehydes then condense with two molecules of α-naphthol at the liquid junction to form a vivid purple-violet condensation ring (di- or tri-arylmethane dye).",
      principleAr: "يعمل حمض الكبريتيك المركز (H₂SO₄) كعامل نازع قوي للماء، حيث ينزع جزيئات الماء من السكريات الخماسية لتكوين الفورفورال، ومن السكريات السداسية لتكوين 5-هيدروكسي ميثيل فورفورال (5-HMF). تتكاثف هذه الألدهيدات الحلقية مع مركب ألفا-نافثول عند السطح الفاصل بين الطبقتين لتعطي معقداً أرجوانياً/بنفسجياً على شكل حلقة مميزة.",
      chemicalEquation: "Hexose / Pentose + Conc. H₂SO₄ → Furfural / 5-HMF + α-Naphthol → Purple/Violet Condensation Ring",
      chemicalMechanism: [
        "1. Dehydration: Concentrated H₂SO₄ removes 3 water molecules from monosaccharide units, generating reactive cyclic furfurals.",
        "2. Interfacial Contact: Because concentrated H₂SO₄ has higher density (~1.84 g/cm³), it forms a bottom layer beneath the aqueous solution.",
        "3. Condensation: At the interface where both liquids meet, α-naphthol reacts with furfural molecules to produce a stable purple chromogen ring."
      ],
      reagents: [
        {
          name: "Molisch's Reagent (5% α-naphthol in 95% ethanol)",
          role: "Phenolic chromogen coupling partner that condenses with furfurals",
          roleAr: "كاشف فينولي يتكاثف مع مركبات الفورفورال لإنتاج اللون البنفسجي"
        },
        {
          name: "Concentrated Sulfuric Acid (Conc. H₂SO₄, 98%)",
          role: "Heavy dehydrating acid that hydrolyzes glycosidic bonds and removes water",
          roleAr: "حمض ثقيل نازع للماء يحلل الروابط الجليكوسيدية وينزع جزيئات الماء"
        }
      ],
      clinicalRelevanceEn: "First-line screening assay in clinical pathology and toxicology to classify unknown biological fluids and verify carbohydrate presence before proceeding to subtyping.",
      clinicalRelevanceAr: "الخطوة الأولى الإلزامية في التحليل البيوكيميائي والسمومي لتصنيف العينات المجهولة وتأكيد وجود السكريات قبل الانتقال لفحوصات التمييز الفرعية.",
      targetAnalytesEn: "All carbohydrates: Monosaccharides (Glucose, Fructose, Galactose), Disaccharides (Maltose, Lactose, Sucrose), and Polysaccharides (Starch, Glycogen, Dextrin).",
      targetAnalytesAr: "جميع أنواع الكربوهيدرات: الأحادية (جلوكوز، فركتوز)، الثنائية (مالتوز، لاكتوز، سكروز)، والعديدة (نشاء، جليكوجين)."
    },
    realImage: {
      url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80",
      captionEn: "Real laboratory test tube displaying Molisch's test: a sharp, intense violet/purple ring formed precisely at the liquid interface between dense concentrated H₂SO₄ (bottom) and aqueous carbohydrate layer (top).",
      captionAr: "صورة مخبرية حقيقية لأنبوبة اختبار موليش: تظهر حلقة بنفسجية أرجوانية حادة وواضحة عند السطح الفاصل بين طبقة حمض الكبريتيك المركز الكثيفة في الأسفل والمحلول المائي في الأعلى.",
      plateType: "Liquid-Liquid Interfacial Chromogen Ring",
      magnification: "Macroscopic Bench Reaction",
      positiveVisualDescription: "Vivid, sharp purple/violet ring at the interface between the two stratified liquid layers.",
      negativeVisualDescription: "No purple ring at the interface; junction remains clear or faintly pale yellow/greenish."
    },
    tubes: {
      posTubeType: 'molisch-pos',
      negTubeType: 'molisch-neg',
      posLabelEn: "Violet Ring at Interface",
      posLabelAr: "حلقة بنفسجية واضحة عند الحد الفاصل",
      posTarget: "Carbohydrate Present (كربوهيدرات موجودة)",
      negLabelEn: "No Violet Ring at Interface",
      negLabelAr: "غياب الحلقة البنفسجية تماماً",
      negTarget: "Non-Carbohydrate (مادة غير كربوهيدراتية)"
    },
    procedure: {
      steps: [
        {
          stepNumber: 1,
          titleEn: "Deliver Test Sample",
          titleAr: "إضافة عينة الفحص",
          instructionEn: "Pipette 2.0 mL of unknown test solution into a clean, dry borosilicate glass test tube.",
          instructionAr: "ضع 2.0 مل من محلول العينة المجهولة في أنبوبة اختبار زجاجية نظيفة وجافة."
        },
        {
          stepNumber: 2,
          titleEn: "Add Molisch's Reagent",
          titleAr: "إضافة كاشف موليش",
          instructionEn: "Add 2 to 3 drops of Molisch's reagent (5% α-naphthol in ethanol). Mix thoroughly by swirling.",
          instructionAr: "أضف قطرتين إلى 3 قطرات من كاشف موليش (ألفا-نافثول). اخلط جيداً برج الأنبوبة برفق."
        },
        {
          stepNumber: 3,
          titleEn: "Incline Test Tube (45°)",
          titleAr: "إمالة الأنبوبة بزاوية 45 درجة",
          instructionEn: "Hold the test tube firmly with a wooden test tube holder and incline it at an angle of approximately 45 degrees.",
          instructionAr: "أمسك أنبوبة الاختبار بحامل خشبي وأملها بزاوية 45 درجة تقريباً لتسهيل انزلاق الحمض."
        },
        {
          stepNumber: 4,
          titleEn: "Layer Concentrated H₂SO₄",
          titleAr: "إضافة حمض الكبريتيك المركز بحذر",
          instructionEn: "Using a Pasteur pipette, very slowly and carefully deliver 1.5 to 2.0 mL of concentrated H₂SO₄ down the inside wall of the tube so it flows gently to the bottom without mixing.",
          instructionAr: "باستخدام ماصة باستور، أضف ببطء شديد وبحذر 1.5 إلى 2.0 مل من حمض الكبريتيك المركز على جدار الأنبوبة الداخلي لينساب بهدوء إلى القاع دون أن يمتزج بالطبقة العليا."
        },
        {
          stepNumber: 5,
          titleEn: "Inspect the Junction",
          titleAr: "فحص الحد الفاصل بين الطبقتين",
          instructionEn: "Gently return the tube to an upright rack. Do NOT shake. Observe the liquid junction interface for 1–2 minutes against a white background.",
          instructionAr: "أعد الأنبوبة ببطء لوضعها العمودي في الحامل دون أي اهتزاز. راقب الحد الفاصل بين الطبقتين لمدة دقيقة إلى دقيقتين أمام خلفية بيضاء."
        }
      ],
      incubationTime: "1 to 2 minutes at room temperature",
      temperature: "Room Temperature (Exothermic interface reaction)",
      safetyPrecautionsEn: [
        "Wear certified chemical splash goggles and nitrile gloves; concentrated sulfuric acid causes severe corrosive chemical burns.",
        "Always add acid slowly down the glass wall; never drop acid directly into the center of the solution to avoid violent spattering."
      ],
      safetyPrecautionsAr: [
        "ارتدِ النظارات الواقية وقفازات النتريل؛ حمض الكبريتيك المركز يسبب حروقاً كيميائية كاوية وخطيرة.",
        "أضف الحمض دائماً ببطء على الجدار الزجاجي؛ لا تسكب الحمض مباشرة في منتصف المحلول لتجنب التطاير العنيف."
      ],
      criticalPitfallsEn: [
        "Shaking the test tube: Shaking mixes the layers prematurely, generating excessive heat and dispersing the purple ring throughout the tube.",
        "Excessive α-naphthol: Adding too much reagent (>4 drops) can produce a false greenish-black discoloration due to charring."
      ],
      criticalPitfallsAr: [
        "رج أنبوبة الاختبار: يؤدي الرج إلى اختلاط الطبقتين وتوليد حرارة شديدة وتلاشي الحلقة البنفسجية.",
        "زيادة كاشف موليش: إضافة أكثر من 4 قطرات قد تسبب اسوداداً أو لوناً مخضراً كاذباً نتيجة تفحم الكاشف."
      ]
    },
    observation: {
      whatToLookForEn: "Examine the sharp demarcation interface between the lower dense colorless acid layer and the upper aqueous layer.",
      whatToLookForAr: "افحص خط التماس الدقيق بين طبقة الحمض الكثيفة في الأسفل والطبقة المائية في الأعلى.",
      positiveVisualEn: "A definite, intense purple or violet ring appears at the interface.",
      positiveVisualAr: "ظهور حلقة واضحة ومحددة بلون بنفسجي أو أرجواني عند الحد الفاصل.",
      negativeVisualEn: "No purple ring formed. Interface shows only a faint greenish or colorless junction line.",
      negativeVisualAr: "عدم تشكل أي حلقة بنفسجية، ويبقى الحد الفاصل شفافاً أو مائلاً للصفرة الباهتة.",
      keyFeatures: [
        "Requires two distinct liquid phases (acid below, aqueous sample above)",
        "Reaction occurs strictly at the interfacial boundary",
        "Color is stable for 10-15 minutes if unperturbed"
      ]
    },
    interpretation: {
      positiveDeductionEn: "The sample contains carbohydrates. Proceed to Experiment 2 (Iodine Test) to determine whether the carbohydrate is a polysaccharide or a smaller sugar.",
      positiveDeductionAr: "العينة تحتوي حتماً على كربوهيدرات. يجب الانتقال الآن إلى التجربة رقم 2 (اختبار اليود) لتحديد ما إذا كان السكر معقداً (عديد) أم سكريات بسيطة.",
      negativeDeductionEn: "The sample does NOT contain any carbohydrates. Completely rules out monosaccharides, disaccharides, and polysaccharides.",
      negativeDeductionAr: "العينة خالية تماماً من الكربوهيدرات. يستبعد وجود السكريات الأحادية والثنائية والمعقدة قطعياً.",
      diagnosticAlgorithmStep: "Step 1 of Carbohydrate Diagnostic Flowchart: Universal In/Out Gate.",
      clinicalScenarios: [
        {
          scenario: "Unknown clear biological fluid tested with Molisch's reagent yields no purple ring.",
          outcome: "Definitively exclude carbohydrate presence (e.g. pure saline or pure protein solution)."
        },
        {
          scenario: "Suspected honey or syrup sample produces an intense violet ring within 30 seconds.",
          outcome: "Carbohydrate presence confirmed; requires Iodine and Benedict tests for exact identification."
        }
      ]
    },
    doctorVideo: {
      videoId: "RaxvcJgQJ_A",
      youtubeUrl: "https://www.youtube.com/watch?v=RaxvcJgQJ_A",
      titleEn: "Molisch Test For Carbohydrates — Demonstration & Principle",
      titleAr: "اختبار موليش العام للكربوهيدرات — العرض العملي والمبدأ",
      doctorName: "Dr. Amit (Biochemistry Basics)",
      doctorTitle: "Associate Professor of Medical Biochemistry",
      channelTitle: "Biochemistry Basics by Dr Amit",
      duration: "04:30",
      objectives: [
        "Learn the safe clinical technique of adding concentrated H₂SO₄ along the inclined tube wall",
        "Understand acid-catalyzed pentose/hexose dehydration into furfurals",
        "Identify the positive violet interface ring and understand why a negative result rules out all carbohydrates"
      ],
      highYieldPoints: [
        "Molisch test is a general screening test positive for ALL carbohydrates without exception",
        "Never shake the test tube after acid addition to preserve the delicate interface boundary",
        "Pure proteins (albumin) and pure lipids give a negative Molisch test"
      ]
    },
    questions: [
      {
        id: 1,
        question: "What is the primary chemical principle behind the positive violet ring in Molisch's test?",
        questionAr: "ما هو المبدأ الكيميائي الأساسي وراء تشكل الحلقة البنفسجية في اختبار موليش الإيجابي؟",
        options: [
          { key: "A", text: "Oxidation of copper ions to red cuprous oxide" },
          { key: "B", text: "Acid dehydration of carbohydrates to furfurals which condense with α-naphthol" },
          { key: "C", text: "Formation of an iodine inclusion complex in a helical core" },
          { key: "D", text: "Alkaline reduction of bismuth salts to metallic bismuth" }
        ],
        correctKey: "B",
        explanation: "Concentrated H₂SO₄ dehydrates carbohydrates into furfural (from pentoses) or 5-HMF (from hexoses), which then condense with α-naphthol at the interface to produce a purple/violet dye."
      },
      {
        id: 2,
        question: "Why must concentrated sulfuric acid be added slowly along the inclined wall of the test tube without shaking?",
        questionAr: "لماذا يجب إضافة حمض الكبريتيك المركز ببطء شديد على جدار الأنبوبة المائلة دون رج؟",
        options: [
          { key: "A", text: "To prevent evaporation of the alcohol in the reagent" },
          { key: "B", text: "Because concentrated H₂SO₄ is denser and must form a separate lower layer to create a visible interface" },
          { key: "C", text: "To keep the solution alkaline during heating" },
          { key: "D", text: "Because shaking destroys the alpha-naphthol molecules" }
        ],
        correctKey: "B",
        explanation: "Concentrated H₂SO₄ has a high specific gravity (~1.84). Adding it along the inclined wall allows it to settle quietly at the bottom, creating a sharp liquid-liquid interface where the violet condensation product concentrates."
      },
      {
        id: 3,
        question: "A laboratory technician performs Molisch's test on an unknown sample and observes NO purple ring. What can be concluded?",
        questionAr: "أجرى فني معمل اختبار موليش على عينة مجهولة ولم يلاحظ أي حلقة بنفسجية. ما هو الاستنتاج المؤكد؟",
        options: [
          { key: "A", text: "The sample contains only non-reducing disaccharides" },
          { key: "B", text: "The sample is an aldohexose such as glucose" },
          { key: "C", text: "All carbohydrates are completely absent from the sample" },
          { key: "D", text: "The sample contains starch but lacks monosaccharides" }
        ],
        correctKey: "C",
        explanation: "Because Molisch's test is a universal test for ALL carbohydrates (mono-, di-, and polysaccharides), a negative test unequivocally rules out the presence of any carbohydrate."
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 2: Iodine Test
  // ==========================================
  {
    id: 'iodine',
    order: 2,
    name: "Iodine Test",
    nameAr: "اختبار اليود",
    tagline: "Diagnostic Assay for Polysaccharides (Starch & Glycogen)",
    taglineAr: "اختبار التمييز النوعي للسكريات المعقدة (النشاء والجليكوجين)",
    categoryBadge: "Polysaccharide Distinction",
    lesson: {
      summaryEn: "The Iodine test is a specific qualitative test that immediately differentiates polysaccharides (starch, glycogen, and dextrins) from smaller monosaccharides and disaccharides based on physical polyiodide trapping within helical carbohydrate polymers.",
      summaryAr: "اختبار اليود هو فحص نوعي مميز يُفرق فورياً بين السكريات المعقدة (النشاء، الجليكوجين، والدكسترين) والسكريات البسيطة (الأحادية والثنائية) عبر احتجاز جزيئات اليود داخل البنية الحلزونية لسلاسل الجلوكوز.",
      principleEn: "Polyiodide ions (I₃⁻ and I₅⁻) from Lugol's iodine reagent (I₂/KI) physically slip into the central hydrophobic helical cavity of coiled polysaccharide chains, primarily the amylose fraction of starch. This host-guest charge-transfer complex alters the electronic absorption of light, producing an intense deep blue-black color. Branched glycogen has shorter linear helical turns, producing a reddish-brown color. Monosaccharides and disaccharides lack helical architecture and give a negative yellow-brown result.",
      principleAr: "تنزلق أيونات اليود المتعددة (I₃⁻ و I₅⁻) الناتجة عن كاشف لوغول (اليود في يوديد البوتاسيوم) داخل التجويف اللولبي الحلزوني لسلاسل النشاء (الأميلوز). يُحدث هذا التداخل تغيراً في امتصاص الضوء ليظهر لون أزرق داكن إلى أسود فوري. بينما يمتلك الجليكوجين المتفرع لفات لولبية أقصر تعطي لوناً بنياً محمراً. وتفشل السكريات الأحادية والثنائية في إعطاء أي تفاعل ويبقى لون اليود الأصفر-البني.",
      chemicalEquation: "Amylose Helix + Polyiodide (I₅⁻) ⇌ Intense Deep Blue-Black Complex [Thermoreversible]",
      chemicalMechanism: [
        "1. Helical Conformation: Linear amylose chains coil into a continuous cylindrical hollow helix with 6 glucose units per turn.",
        "2. Iodine Entrapment: Linear polyiodide chains align along the center of the helix, stabilized by charge-transfer dipole interactions.",
        "3. Temperature Sensitivity: Heating breaks the non-covalent hydrogen bonds maintaining the helix, releasing iodine and causing the blue color to vanish. Cooling re-establishes the helix and restores the blue color."
      ],
      reagents: [
        {
          name: "Lugol's Iodine Reagent (I₂ / KI in aqueous solution)",
          role: "Source of dissolved triiodide (I₃⁻) and pentaiodide (I₅⁻) ions",
          roleAr: "مصدر أيونات اليود الثلاثية والخماسية القابلة للاندماج داخل الحلزون"
        }
      ],
      clinicalRelevanceEn: "Essential in digestive physiology practicals to monitor the timed enzymatic breakdown of dietary starch into maltose and glucose by salivary and pancreatic amylase.",
      clinicalRelevanceAr: "أساسي في الفحوصات الفسيولوجية لمراقبة التحلل الإنزيمي للنشاء بواسطة إنزيم الأميليز اللعابي والبنكرياسي إلى سكريات أبسط.",
      targetAnalytesEn: "Polysaccharides: Starch/Amylose (Deep Blue-Black), Glycogen (Reddish-Brown), Dextrin (Purple-Red).",
      targetAnalytesAr: "السكريات المتعددة: النشاء/الأميلوز (أزرق داكن-أسود)، الجليكوجين (بني محمر)، الدكسترين (أرجواني محمر)."
    },
    realImage: {
      url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80",
      captionEn: "Real laboratory test tubes showing Iodine test: Test tube on left displays the instant deep blue-black polyiodide-amylose complex (positive for starch), whereas test tube on right retains the natural yellow-brown iodine color (negative for glucose/disaccharides).",
      captionAr: "صورة مخبرية حقيقية لاختبار اليود: الأنبوبة اليسرى تظهر معقد اليود-الأميلوز الأزرق الداكن الفوري (إيجابي للنشاء)، بينما الأنبوبة اليمنى تحتفظ بلون اليود الأصلي الأصفر-البني (سلبي للجلوكوز والسكريات الثنائية).",
      plateType: "Helical Inclusion Charge-Transfer Complex",
      magnification: "Macroscopic Bench Reaction",
      positiveVisualDescription: "Immediate transformation into an intense, dark navy blue or blue-black solution (or reddish-brown for glycogen).",
      negativeVisualDescription: "Solution remains pale yellow or amber-brown (the original color of Lugol's iodine reagent)."
    },
    tubes: {
      posTubeType: 'iodine-pos',
      negTubeType: 'iodine-neg',
      posLabelEn: "Deep Navy Blue / Blue-Black",
      posLabelAr: "أزرق داكن إلى أسود فوري",
      posTarget: "Polysaccharide Present (Starch / Amylose)",
      negLabelEn: "Yellow-Brown (No Color Change)",
      negLabelAr: "أصفر-بني (بقاء لون الكاشف)",
      negTarget: "Mono / Disaccharides (سكريات أحادية/ثنائية)"
    },
    procedure: {
      steps: [
        {
          stepNumber: 1,
          titleEn: "Prepare Sample Tube",
          titleAr: "تحضير أنبوبة الفحص",
          instructionEn: "Add 2.0 mL of unknown carbohydrate solution (or 1% starch suspension) to a clean test tube or spot plate depression.",
          instructionAr: "ضع 2.0 مل من محلول الكربوهيدرات المجهول (أو معلق النشاء 1%) في أنبوبة اختبار نظيفة أو حفرة طبق الخزف."
        },
        {
          stepNumber: 2,
          titleEn: "Add Lugol's Iodine",
          titleAr: "إضافة كاشف اليود",
          instructionEn: "Add 2 to 3 drops of Lugol's iodine solution (I₂/KI).",
          instructionAr: "أضف قطرتين إلى 3 قطرات من محلول اليود (كاشف لوغول I₂/KI)."
        },
        {
          stepNumber: 3,
          titleEn: "Mix and Observe Instantly",
          titleAr: "المزج والملاحظة الفورية",
          instructionEn: "Swirl the tube gently at room temperature. Observe the immediate color transition without heating.",
          instructionAr: "حرك الأنبوبة برفق في درجة حرارة الغرفة. لاحظ التحول اللوني الفوري دون أي تسخين."
        },
        {
          stepNumber: 4,
          titleEn: "Thermoreversibility Test (Optional)",
          titleAr: "فحص التأثير الحراري العكوس (اختياري)",
          instructionEn: "Heat the blue tube gently in a boiling water bath for 1 minute (observe blue color disappear); then cool under cold running tap water (observe blue color reappear).",
          instructionAr: "سخن الأنبوبة الزرقاء في حمام مائي يغلي لدقيقة (يختفي اللون الأزرق)، ثم بردها تحت ماء الصنبور البارد (يعود اللون الأزرق مجدداً)."
        }
      ],
      incubationTime: "Instantaneous (No incubation required)",
      temperature: "Cold / Room Temperature (<30°C)",
      safetyPrecautionsEn: [
        "Lugol's iodine stains skin and clothing dark brown; handle with care and wash immediately with water if spilled.",
        "Do not boil the sample prior to reading the test, as elevated temperatures prevent complex formation."
      ],
      safetyPrecautionsAr: [
        "يصبغ محلول اليود الجلد والملابس بلون بني داكن؛ تعامل معه بحذر واغسل بالماء فوراً إذا انسكب.",
        "لا تسخن العينة قبل قراءة النتيجة؛ لأن درجات الحرارة المرتفعة تمنع تشكل المعقد الأزرق."
      ],
      criticalPitfallsEn: [
        "Reading the test while hot: Heat breaks the helical coils, leading to a false-negative clear solution.",
        "Alkaline pH: Alkaline solutions convert iodine into iodate and iodide, preventing complex formation (ensure pH is neutral or slightly acidic)."
      ],
      criticalPitfallsAr: [
        "قراءة الفحص أثناء سخونة الأنبوب: الحرارة تفكك اللولب الحلزوني مما يعطي نتيجة سلبية كاذبة.",
        "الوسط القلوي: المحاليل القلوية تحول اليود إلى يودات ويوديد مما يعطل التفاعل (تأكد أن الوسط متعادل أو حمضي خفيف)."
      ]
    },
    observation: {
      whatToLookForEn: "Observe immediate hue change in solution upon addition of iodine drops.",
      whatToLookForAr: "لاحظ التغير اللوني اللحظي للمحلول بمجرد ملامسة قطرات اليود.",
      positiveVisualEn: "Immediate appearance of an intense deep navy blue / blue-black color for starch, or reddish-brown for glycogen.",
      positiveVisualAr: "ظهور فوري للون أزرق بحري داكن/أسود في حالة النشاء، أو بني محمر في حالة الجليكوجين.",
      negativeVisualEn: "Solution retains the transparent amber-yellow color of Lugol's iodine.",
      negativeVisualAr: "بقاء المحلول بلون اليود الأصلي الشفاف الأصفر-الكهرماني دون ظهور أي زرقة.",
      colorTransitionsEn: [
        "Starch (Amylose) → Deep Navy Blue / Blue-Black",
        "Glycogen → Reddish-Brown / Mahogany",
        "Dextrin → Violet-Red",
        "Mono/Disaccharides → Unchanged Yellow-Brown"
      ],
      keyFeatures: [
        "Requires no heat (occurs instantly at room temp)",
        "Thermoreversible (color fades on heating, returns on cooling)",
        "Specific for coiled polysaccharide helices"
      ]
    },
    interpretation: {
      positiveDeductionEn: "The sample is a Polysaccharide (Starch if blue-black, Glycogen if reddish-brown). Smaller sugars (mono- and disaccharides) are ruled out.",
      positiveDeductionAr: "العينة عبارة عن سكر معقد عديد (نشاء إذا كان أزرق-أسود، أو جليكوجين إذا كان بنياً محمراً). تُستبعد السكريات الأحادية والثنائية.",
      negativeDeductionEn: "The sample is NOT a coiled polysaccharide. Combined with a positive Molisch test, this proves the carbohydrate is a Monosaccharide or Disaccharide. Proceed to Experiment 3 (Benedict's Test).",
      negativeDeductionAr: "العينة ليست سكرًا معقداً. وبما أن اختبار موليش كان إيجابياً، فهذا يثبت أن السكر إما أحادي أو ثنائي. يجب الانتقال الآن إلى التجربة 3 (اختبار بندكت).",
      diagnosticAlgorithmStep: "Step 2 of Carbohydrate Diagnostic Flowchart: Polysaccharide Branch Gate.",
      clinicalScenarios: [
        {
          scenario: "Saliva is incubated with 1% starch solution at 37°C. Timed iodine aliquots transition from deep blue to purple, then reddish, and finally yellow.",
          outcome: "Demonstrates complete progressive salivary amylase digestion of starch into achroodextrin and maltose."
        },
        {
          scenario: "Biopsy extract from human liver treated with iodine yields a mahogany reddish-brown color.",
          outcome: "Confirms normal tissue storage of branched glycogen."
        }
      ]
    },
    doctorVideo: {
      videoId: "d6tHWPW5WLM",
      youtubeUrl: "https://www.youtube.com/watch?v=d6tHWPW5WLM",
      titleEn: "Carbohydrates Tests: Benedict's & Iodine Test Demonstration",
      titleAr: "اختبار اليود للكشف النوعي عن النشاء والمعقدات السكرية",
      doctorName: "Launchpad Learning",
      doctorTitle: "Medical Biology & Biochemistry Educator",
      channelTitle: "Launchpad Learning",
      duration: "06:40",
      objectives: [
        "Observe the immediate formation of the deep blue-black polyiodide-amylose complex at room temperature",
        "Demonstrate the thermoreversibility phenomenon (color disappearance upon boiling and reappearance upon cooling)",
        "Differentiate between starch (blue-black), glycogen (reddish-brown), and monosaccharides (negative yellow)"
      ],
      highYieldPoints: [
        "Iodine test requires cold or room temperature; heating dissociates the inclusion complex",
        "Amylose creates blue-black color; highly branched glycogen produces reddish-brown color",
        "Monosaccharides (glucose) and disaccharides (sucrose, lactose) give a negative test"
      ]
    },
    questions: [
      {
        id: 1,
        question: "Why does the deep blue color of the starch-iodine complex disappear when the solution is heated in a boiling water bath?",
        questionAr: "لماذا يختفي اللون الأزرق الداكن لمعقد النشا واليود عند تسخين المحلول في حمام مائي يغلي؟",
        options: [
          { key: "A", text: "Heat oxidizes the starch into carbon dioxide and water" },
          { key: "B", text: "Thermal energy unwinds and disrupts the helical coils of amylose, liberating the trapped polyiodide ions" },
          { key: "C", text: "Iodine is converted into insoluble cuprous oxide" },
          { key: "D", text: "Heat permanently hydrolyzes the glycosidic bonds in 30 seconds" }
        ],
        correctKey: "B",
        explanation: "The blue color depends on physical non-covalent entrapment of iodine inside the amylose helix. Heating increases molecular kinetic motion, causing the helical coil to unwind and release the polyiodide molecules. Upon cooling, the coils reform and the blue color reappears."
      },
      {
        id: 2,
        question: "What characteristic color is produced when Lugol's iodine is mixed with a solution of liver Glycogen?",
        questionAr: "ما هو اللون المميز المتكون عند إضافة كاشف لوغول إلى محلول يحتوي على جليكوجين الكبد؟",
        options: [
          { key: "A", text: "Deep blue-black" },
          { key: "B", text: "Reddish-brown / mahogany" },
          { key: "C", text: "Bright canary yellow" },
          { key: "D", text: "Emerald green precipitate" }
        ],
        correctKey: "B",
        explanation: "Glycogen is a highly branched polysaccharide with shorter linear segments between branch points (α-1,6 linkages). Its helical coils are shorter than amylose, producing a characteristic reddish-brown (mahogany) color with iodine."
      },
      {
        id: 3,
        question: "A student performs Molisch's test (Positive violet ring) and Iodine test (Negative yellow). What is the deduction?",
        questionAr: "أجرى طالب اختبار موليش (إيجابي بحلقة بنفسجية) واختبار اليود (سلبي بلون أصفر). ما هو الاستنتاج الطبي الصحيح؟",
        options: [
          { key: "A", text: "The sample is starch or glycogen" },
          { key: "B", text: "The sample is a non-carbohydrate protein" },
          { key: "C", text: "The sample is a carbohydrate, and is specifically a Monosaccharide or Disaccharide (not a polysaccharide)" },
          { key: "D", text: "The sample is pure cellulose" }
        ],
        correctKey: "C",
        explanation: "Positive Molisch proves the presence of carbohydrate. Negative Iodine rules out coiled polysaccharides (starch/glycogen). Therefore, the unknown must be a smaller sugar: a monosaccharide or a disaccharide."
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 3: Benedict's Test
  // ==========================================
  {
    id: 'benedict',
    order: 3,
    name: "Benedict's Test",
    nameAr: "اختبار بندكت",
    tagline: "Semi-Quantitative Assay for Reducing Sugars (Free Carbonyl Groups)",
    taglineAr: "الفحص النوعي وشبه الكمي للكشف عن السكريات المختزلة",
    categoryBadge: "Reducing Sugar Assay",
    lesson: {
      summaryEn: "Benedict's test is the cornerstone medical biochemistry assay used to identify reducing sugars containing a free or potentially free anomeric aldehyde or ketone carbonyl group. It produces a graded precipitate from green to brick-red based on sugar concentration.",
      summaryAr: "اختبار بندكت هو الفحص الكلاسيكي الأساسي في الكيمياء الحيوية الطبية للكشف عن السكريات المختزلة التي تمتلك مجموعة ألدهيد أو كيتون كربونيلية حرة. يعطي راسباً ملوناً متدرجاً من الأخضر إلى الأحمر القرميدي بحسب تركيز السكر.",
      principleEn: "In an alkaline medium provided by sodium carbonate (Na₂CO₃) at boiling temperature (100°C), reducing sugars enolize into highly reactive enediols. These enediols donate electrons to blue cupric ions (Cu²⁺), reducing them into cuprous ions (Cu⁺). The cuprous ions immediately precipitate as insoluble cuprous oxide (Cu₂O). Sodium citrate acts as a vital chelating agent, complexing with Cu²⁺ to prevent premature precipitation of insoluble cupric hydroxide [Cu(OH)₂] in the alkaline reagent.",
      principleAr: "في الوسط القلوي الذي توفره كربونات الصوديوم (Na₂CO₃) عند درجة الغليان (100°م)، تتحول السكريات المختزلة إلى إينيديولات (enediols) نشطة تختزل أيونات النحاسيك الزرقاء (Cu²⁺) إلى نحاسوز (Cu⁺) يترسب كأكسيد نحاسوز (Cu₂O) أحمر غير ذائب. وتعمل سترات الصوديوم كمركب مخلبي لمنع ترسب هيدروكسيد النحاس في الوسط القلوي.",
      chemicalEquation: "Reducing Sugar (Enediol) + 2Cu²⁺ + 4OH⁻ xrightarrow{Δ, 100°C} Oxidized Sugar + Cu₂O ↓ (Brick-Red Precipitate) + 2H₂O",
      chemicalMechanism: [
        "1. Alkaline Tautomerization: Weak base (Na₂CO₃) converts reducing aldoses and ketoses into reactiveenediol isomers.",
        "2. Electron Transfer: Enediol double bond donates electrons, reducing Cu²⁺ (blue) to Cu⁺.",
        "3. Citrate Chelation: Citrate ions bind Cu²⁺ reversibly, keeping copper in solution until reduced.",
        "4. Insoluble Precipitation: Cu⁺ combines with oxygen forming cuprous oxide (Cu₂O) microcrystals whose color varies with particle size and concentration."
      ],
      reagents: [
        {
          name: "Copper Sulfate (CuSO₄ · 5H₂O)",
          role: "Provides blue cupric (Cu²⁺) ions as the oxidizing agent",
          roleAr: "يوفر أيونات النحاسيك الزرقاء الثنائية كعامل مؤكسد"
        },
        {
          name: "Sodium Carbonate (Na₂CO₃)",
          role: "Provides the alkaline pH necessary for enolization",
          roleAr: "يوفر الوسط القلوي الضعيف اللازم لإنشاء الإينيديولات النشطة"
        },
        {
          name: "Sodium Citrate",
          role: "Chelating agent that stabilizes Cu²⁺ and prevents Cu(OH)₂ precipitation",
          roleAr: "مركب مخلبي يمسك أيونات النحاسيك ويمنع ترسبها كهيدروكسيد النحاس"
        }
      ],
      clinicalRelevanceEn: "Historic diagnostic benchmark for detecting glycosuria in uncontrolled diabetes mellitus, and detecting abnormal reducing substances (galactose in classic galactosemia) in pediatric urine.",
      clinicalRelevanceAr: "المعيار الذهبي التاريخي لتشخيص وجود السكر في البول (Glycosuria) في داء السكري، وكشف السكريات غير الجلوكوزية كالجالاكتوز في متلازمة الجالاكتوسيميا عند الرضع.",
      targetAnalytesEn: "All Reducing Sugars: Monosaccharides (Glucose, Fructose, Galactose), Reducing Disaccharides (Maltose, Lactose). Non-reducing sugars (Sucrose, Starch) are NEGATIVE.",
      targetAnalytesAr: "كافة السكريات المختزلة: الأحادية (جلوكوز، فركتوز، جلاكتوز)، والثنائية المختزلة (مالتوز، لاكتوز). بينما السكروز والنشاء سلبيان."
    },
    realImage: {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80",
      captionEn: "Real laboratory test tube rack displaying Benedict's test graded scale: From negative clear blue (0%), to green precipitate (+), yellow (++), orange (+++), and heavy brick-red cuprous oxide precipitate (++++).",
      captionAr: "صورة مخبرية حقيقية لحامل أنابيب يوضح التدرج اللوني شبه الكمي لاختبار بندكت: من الأزرق الرائق السلبي (0%)، إلى الأخضر (+)، الأصفر (++)، البرتقالي (+++)، والراسب الأحمر القرميدي الكثيف (++++).",
      plateType: "Colorimetric Cuprous Oxide (Cu₂O) Precipitate Scale",
      magnification: "Macroscopic Bench Reaction",
      positiveVisualDescription: "Formation of colored precipitate: Green (+, ~0.5%), Yellow (++, ~1.0%), Orange (+++, ~1.5%), or Brick-Red (++++, ≥2.0%).",
      negativeVisualDescription: "Solution remains clear blue with no precipitate formed (retains original reagent appearance)."
    },
    tubes: {
      posTubeType: 'benedict-high',
      negTubeType: 'benedict-neg',
      posLabelEn: "Brick-Red Precipitate (++++)",
      posLabelAr: "راسب أحمر قرميدي كثيف (++++)",
      posTarget: "Reducing Sugar Present (Glucose, Maltose, etc.)",
      negLabelEn: "Clear Blue (No Precipitate)",
      negLabelAr: "أزرق رائق تماماً دون أي راسب",
      negTarget: "Non-Reducing Sugar (Sucrose) or Non-Sugar",
      hasSpecialScale: true
    },
    procedure: {
      steps: [
        {
          stepNumber: 1,
          titleEn: "Measure Benedict's Reagent",
          titleAr: "قياس كاشف بندكت",
          instructionEn: "Pipette 2.0 mL of Benedict's qualitative reagent into a clean, dry borosilicate test tube.",
          instructionAr: "ضع 2.0 مل من كاشف بندكت النوعي في أنبوبة اختبار زجاجية نظيفة وجافة."
        },
        {
          stepNumber: 2,
          titleEn: "Add Carbohydrate Solution",
          titleAr: "إضافة محلول السكر",
          instructionEn: "Add exactly 8 drops (approximately 0.4 to 0.5 mL) of the unknown carbohydrate solution. Mix well by tapping the bottom of the tube.",
          instructionAr: "أضف 8 قطرات بدقة (حوالي 0.4 إلى 0.5 مل) من محلول السكر المجهول. اخلط جيداً بالقرع على قاع الأنبوبة."
        },
        {
          stepNumber: 3,
          titleEn: "Boil in Water Bath",
          titleAr: "التسخين في حمام مائي يغلي",
          instructionEn: "Place the tube into a vigorously boiling thermostatic water bath (100°C) for exactly 3 to 5 minutes.",
          instructionAr: "ضع الأنبوبة في حمام مائي يغلي تماماً (100°م) لمدة 3 إلى 5 دقائق بدقة."
        },
        {
          stepNumber: 4,
          titleEn: "Cool and Evaluate Precipitate",
          titleAr: "التبريد وملاحظة الراسب المتكون",
          instructionEn: "Using a wooden test tube holder, remove the tube and let it cool in a rack for 1 minute. Observe both the supernatant and the precipitate color.",
          instructionAr: "باستخدام حامل خشبي، ارفع الأنبوبة واتركها تبرد في الحامل لدقيقة واحدة. راقب لون السائل والراسب المترسب."
        }
      ],
      incubationTime: "3 to 5 minutes in vigorously boiling water bath",
      temperature: "100°C (Boiling water bath required)",
      safetyPrecautionsEn: [
        "Never heat the test tube directly over an open flame without safety goggles; hot alkaline copper solutions can boil violently (bump). Always use a water bath.",
        "Always point the mouth of the tube away from yourself and others."
      ],
      safetyPrecautionsAr: [
        "لا تسخن الأنبوبة فوق اللهب المباشر بدون نظارات؛ قد يقفز المحلول القلوي الساخن فجأة. استخدم الحمام المائي دائماً.",
        "وجه فوهة الأنبوبة بعيداً عن وجهك وزملائك دائماً."
      ],
      criticalPitfallsEn: [
        "Adding excessive carbohydrate solution (>1 mL): May deplete reagent and produce atypical brown mixtures.",
        "Insufficient boiling (<2 min): Reduction requires sufficient activation energy at 100°C; inadequate heating produces false-negative blue tubes."
      ],
      criticalPitfallsAr: [
        "إضافة كمية زائدة من محلول السكر (>1 مل): قد تستهلك الكاشف بالكامل وتنتج معلقات بنية غير واضحة.",
        "عدم كفاية وقت الغلي (<دقيقتين): التفاعل يحتاج طاقة تنشيط كافية عند 100°م؛ التسخين غير الكافي يعطي نتيجة سلبية كاذبة."
      ]
    },
    observation: {
      whatToLookForEn: "Observe the color transition from initial blue to green, yellow, orange, or brick-red precipitate.",
      whatToLookForAr: "لاحظ التدرج اللوني من الأزرق الأولي إلى راسب أخضر، أصفر، برتقالي، أو أحمر قرميدي.",
      positiveVisualEn: "Colored precipitate settles at the bottom of the tube: Green (+, ~0.5%), Yellow (++, ~1%), Orange (+++, ~1.5%), Brick-Red (++++, ≥2%).",
      positiveVisualAr: "تشكل راسب ملون في قاع الأنبوبة: أخضر (+، 0.5%)، أصفر (++، 1%)، برتقالي (+++، 1.5%)، أحمر طوبي (++++) عند ≥2%.",
      negativeVisualEn: "Solution remains clear blue with no precipitate formed whatsoever.",
      negativeVisualAr: "يبقى المحلول أزرق رائقاً وشفافاً تماماً دون أي راسب.",
      colorTransitionsEn: [
        "0% (Negative) → Clear Blue (No reducing sugar)",
        "0.5% (+) → Green precipitate (Trace)",
        "1.0% (++) → Yellow / Green-Yellow precipitate",
        "1.5% (+++) → Orange / Brownish-Orange precipitate",
        "≥ 2.0% (++++) → Heavy Brick-Red precipitate (Cu₂O)"
      ],
      keyFeatures: [
        "Semi-quantitative (color correlates with sugar concentration)",
        "Requires 100°C boiling temperature",
        "Precipitate settles on standing"
      ]
    },
    interpretation: {
      positiveDeductionEn: "The sample contains a Reducing Sugar (Glucose, Fructose, Galactose, Maltose, Lactose). Proceed to Experiment 4 (Barfoed's Test) to differentiate whether it is a Monosaccharide or Disaccharide.",
      positiveDeductionAr: "العينة تحتوي على سكر مختزل (جلوكوز، فركتوز، جلاكتوز، مالتوز، لاكتوز). يجب الانتقال الآن إلى التجربة 4 (اختبار بارفود) لتحديد ما إذا كان السكر أحادياً أم ثنائياً.",
      negativeDeductionEn: "The sample is a NON-REDUCING sugar (such as pure Sucrose) or a polysaccharide. In sucrose, both anomeric carbons are locked in the α-1,β-2 glycosidic bond.",
      negativeDeductionAr: "العينة عبارة عن سكر غير مختزل (مثل السكروز) أو سكر معقد. في السكروز، ذرات الكربون الأنوميرية مقيدة في الرابطة الجليكوسيدية.",
      diagnosticAlgorithmStep: "Step 3 of Carbohydrate Diagnostic Flowchart: Reducing vs Non-Reducing Sugar Gate.",
      clinicalScenarios: [
        {
          scenario: "Urine of an uncontrolled diabetic patient boiled with Benedict's reagent produces an immediate heavy brick-red precipitate (++++).",
          outcome: "Indicates severe glucosuria (>2 g/dL), correlating with blood glucose exceeding renal threshold (~180 mg/dL)."
        },
        {
          scenario: "Neonatal urine tested with Benedict's is positive (+++), but glucose dipstick (glucose oxidase) is strictly negative.",
          outcome: "Classic Galactosemia until proven otherwise (galactose is a reducing sugar detected by Benedict but not by glucose oxidase)."
        }
      ]
    },
    doctorVideo: {
      videoId: "nlPHeqHOYpU",
      youtubeUrl: "https://youtu.be/nlPHeqHOYpU?si=Kw5FCw5YCKA-UlB4",
      titleEn: "Benedict's Test — Practical Demonstration & Chemical Principle",
      titleAr: "اختبار بندكت للكشف عن السكريات المختزلة — العرض المخبري",
      doctorName: "Faculty of Medical Biochemistry",
      doctorTitle: "Department of Medical Biochemistry & Clinical Pathology",
      channelTitle: "Practical Biochemistry Education",
      duration: "06:15",
      objectives: [
        "Master the roles of copper sulfate, sodium carbonate, and sodium citrate in the reagent formulation",
        "Observe proper boiling water bath duration (3–5 min) and cuprous oxide precipitate formation",
        "Interpret the semi-quantitative color scale from negative blue to 4+ brick red"
      ],
      highYieldPoints: [
        "Detects free carbonyl aldehyde and ketone reducing groups",
        "Sodium citrate is a chelating agent preventing Cu(OH)₂ precipitation",
        "Sucrose is negative because both anomeric carbons are locked in the glycosidic bond"
      ]
    },
    questions: [
      {
        id: 1,
        question: "What is the primary chemical compound responsible for the brick-red precipitate in a positive Benedict's test?",
        questionAr: "ما هو المركب الكيميائي المسؤول عن تشكل الراسب الأحمر القرميدي في اختبار بندكت الإيجابي؟",
        options: [
          { key: "A", text: "Cupric hydroxide [Cu(OH)₂]" },
          { key: "B", text: "Cuprous oxide [Cu₂O]" },
          { key: "C", text: "Cupric carbonate [CuCO₃]" },
          { key: "D", text: "Metallic Copper [Cu]" }
        ],
        correctKey: "B",
        explanation: "Reducing sugars donate electrons to blue cupric ions (Cu²⁺), reducing them to cuprous oxide (Cu₂O), which precipitates as an insoluble red/brick-red solid upon boiling."
      },
      {
        id: 2,
        question: "What is the specific role of sodium citrate in Benedict's qualitative reagent?",
        questionAr: "ما هو الدور الدقيق لسترات الصوديوم في تركيبة كاشف بندكت النوعي؟",
        options: [
          { key: "A", text: "It serves as the reducing sugar" },
          { key: "B", text: "It acts as a chelating agent that complexes Cu²⁺ to prevent insoluble Cu(OH)₂ precipitation in alkaline medium" },
          { key: "C", text: "It provides an acidic pH for the reaction" },
          { key: "D", text: "It oxidizes glucose into gluconic acid" }
        ],
        correctKey: "B",
        explanation: "In an alkaline medium (from Na₂CO₃), cupric ions would normally precipitate out prematurely as insoluble Cu(OH)₂. Sodium citrate complexes with Cu²⁺ to keep it in soluble solution until a reducing sugar reduces it to Cu₂O."
      },
      {
        id: 3,
        question: "Why does pure Sucrose produce a NEGATIVE (clear blue) result in Benedict's test?",
        questionAr: "لماذا يعطي سكر السكروز النقي نتيجة سلبية (زرقاء) في اختبار بندكت؟",
        options: [
          { key: "A", text: "Sucrose is insoluble in water" },
          { key: "B", text: "Both anomeric carbons (C1 of glucose and C2 of fructose) are locked in the α-1,β-2 glycosidic bond" },
          { key: "C", text: "Sucrose contains only pentose sugars" },
          { key: "D", text: "Sucrose is destroyed by sodium citrate" }
        ],
        correctKey: "B",
        explanation: "Sucrose is a disaccharide of glucose and fructose joined by an α-1,β-2 glycosidic linkage. Because both carbonyl carbons are locked in the bond, neither ring can open to expose a free reducing group."
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 4: Barfoed's Test
  // ==========================================
  {
    id: 'barfoed',
    order: 4,
    name: "Barfoed's Test",
    nameAr: "اختبار بارفود",
    tagline: "Diagnostic Distinction Between Reducing Monosaccharides & Disaccharides",
    taglineAr: "اختبار التمييز الحاسم بين السكريات الأحادية والسكريات الثنائية المختزلة",
    categoryBadge: "Mono vs Disaccharide Assay",
    lesson: {
      summaryEn: "Barfoed's test is a timed reduction assay specifically designed to distinguish reducing monosaccharides (glucose, fructose, galactose) from reducing disaccharides (maltose, lactose). Monosaccharides react rapidly within 2–3 minutes, whereas disaccharides react much more slowly.",
      summaryAr: "اختبار بارفود هو فحص اختزال موقوت مصمم خصيصاً للتمييز بين السكريات الأحادية المختزلة (جلوكوز، فركتوز) والسكريات الثنائية المختزلة (مالتوز، لاكتوز). تتفاعل السكريات الأحادية سريعاً في غضون 2–3 دقائق، بينما تتفاعل الثنائية ببطء شديد.",
      principleEn: "Barfoed's reagent consists of cupric acetate [Cu(CH₃COO)₂] dissolved in 1% dilute acetic acid. In this weakly acidic medium (pH ~4.6), cupric ions are far less readily reduced than in alkaline reagents like Benedict's. Only strong reducing agents—specifically monosaccharides—have sufficient reducing power to reduce cupric ions rapidly within 2 to 3 minutes of boiling to red cuprous oxide (Cu₂O). Disaccharides are weaker reducing agents and cannot reduce cupric ions in acid within 3 minutes; they only react after prolonged boiling (>10 minutes) when acid hydrolysis occurs.",
      principleAr: "يتكون كاشف بارفود من خلات النحاس [Cu(CH₃COO)₂] في حمض الخليك المخفف 1%. في هذا الوسط الحمضي الضعيف (الرقم الهيدروجيني ~4.6)، تكون قوة اختزال النحاس أضعف بكثير مقارنة بالوسط القلوي. وحدها العوامل المختزلة القوية—وهي السكريات الأحادية—تملك قدرة كافية لاختزال النحاس سريعاً خلال 2 إلى 3 دقائق من الغليان لترسيب أكسيد النحاسوز الأحمر. أما السكريات الثنائية فلا تتفاعل في هذا الوقت القصير.",
      chemicalEquation: "Monosaccharide + 2Cu²⁺ (Weak Acetic Acid) xrightarrow{Δ, strictly 2-3 min} Sugar Acid + Cu₂O ↓ (Red Precipitate at Bottom)",
      chemicalMechanism: [
        "1. Acidic Suppression: Dilute acetic acid (pH 4.6) retards the enolization process, substantially decreasing the rate of cupric reduction.",
        "2. Kinetic Difference: Monosaccharides possess a higher electron-donating density per molecular weight and reduce Cu²⁺ to Cu₂O within 120-180 seconds.",
        "3. Delayed Disaccharide Hydrolysis: Reducing disaccharides (maltose, lactose) require prolonged boiling (>10 min) for acid to hydrolyze their glycosidic bond before reduction occurs."
      ],
      reagents: [
        {
          name: "Barfoed's Reagent",
          role: "Copper(II) acetate [Cu(CH₃COO)₂] 6-7% dissolved in 1% dilute acetic acid aqueous solution",
          roleAr: "خلات النحاسيك المذابة في حمض الخليك المخفف 1% لتهيئة وسط حمضي ضعيف"
        }
      ],
      clinicalRelevanceEn: "Clinically used to distinguish physiological lactosuria (lactose in urine, common in pregnant or lactating females) from pathologic glucosuria (diabetes mellitus), since lactose is a disaccharide and gives a negative Barfoed test at 3 minutes.",
      clinicalRelevanceAr: "يُستخدم سريرياً للتمييز بين بيلة اللاكتوز الفسيولوجية (لدى الحوامل والمرضعات) وبيلة الجلوكوز المرضية (داء السكري)؛ حيث أن اللاكتوز سكر ثنائي يعطي فحص بارفود سلبياً عند 3 دقائق.",
      targetAnalytesEn: "Positive (<3 min): Reducing Monosaccharides (Glucose, Fructose, Galactose, Xylose). Negative (at 3 min): Reducing Disaccharides (Maltose, Lactose).",
      targetAnalytesAr: "إيجابي (<3 دقائق): السكريات الأحادية المختزلة (جلوكوز، فركتوز، جلاكتوز). سلبي (عند 3 دقائق): السكريات الثنائية (مالتوز، لاكتوز)."
    },
    realImage: {
      url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80",
      captionEn: "Real laboratory Barfoed's test tubes: Left tube shows positive monosaccharide reaction with a fine, characteristic red cuprous oxide (Cu₂O) precipitate settling in the curved tip at the bottom within 2.5 minutes. Right tube shows negative disaccharide reaction remaining clear blue.",
      captionAr: "صورة مخبرية حقيقية لاختبار بارفود: الأنبوبة اليسرى تظهر التفاعل الإيجابي للسكر الأحادي مع راسب أحمر دقيق في قاع الأنبوبة خلال دقيقتين ونصف. الأنبوبة اليمنى تظهر سلبية السكر الثنائي مع بقاء المحلول أزرق رائقاً.",
      plateType: "Acidic Cuprous Oxide Precipitate at Tube Apex",
      magnification: "Macroscopic Bench Reaction",
      positiveVisualDescription: "Scanty, thin red precipitate (Cu₂O) settled specifically at the curved bottom tip and along lower glass walls within 2 to 3 minutes.",
      negativeVisualDescription: "No red precipitate formed at the bottom; solution remains uniformly clear blue after 3 minutes of boiling."
    },
    tubes: {
      posTubeType: 'barfoed-pos',
      negTubeType: 'barfoed-neg',
      posLabelEn: "Red Precipitate at Bottom (<3 min)",
      posLabelAr: "راسب أحمر في قاع الأنبوبة (<3 دقائق)",
      posTarget: "Reducing Monosaccharide (Glucose, Fructose)",
      negLabelEn: "Clear Blue Solution (at 3 min)",
      negLabelAr: "محلول أزرق رائق دون راسب (عند 3 دقائق)",
      negTarget: "Disaccharide (Maltose, Lactose)"
    },
    procedure: {
      steps: [
        {
          stepNumber: 1,
          titleEn: "Deliver Barfoed's Reagent",
          titleAr: "إضافة كاشف بارفود",
          instructionEn: "Pipette 2.0 mL of Barfoed's reagent into a clean, dry borosilicate test tube.",
          instructionAr: "ضع 2.0 مل من كاشف بارفود في أنبوبة اختبار زجاجية نظيفة وجافة."
        },
        {
          stepNumber: 2,
          titleEn: "Add Sugar Solution",
          titleAr: "إضافة محلول السكر",
          instructionEn: "Add 1.0 mL of the unknown reducing sugar solution. Mix gently by swirling.",
          instructionAr: "أضف 1.0 مل من محلول السكر المختزل المجهول. امزج المحتويات برفق."
        },
        {
          stepNumber: 3,
          titleEn: "Boil in Water Bath with Stopwatch",
          titleAr: "التسخين في حمام مائي مع تشغيل المؤقت",
          instructionEn: "Place the tube into a vigorously boiling water bath (100°C) and immediately start a stopwatch. Boil for strictly 2 to 3 minutes.",
          instructionAr: "ضع الأنبوبة في حمام مائي يغلي تماماً وشغل ساعة الإيقاف فوراً. احسب الوقت بدقة من دقيقتين إلى 3 دقائق."
        },
        {
          stepNumber: 4,
          titleEn: "Inspect Curved Tube Tip",
          titleAr: "فحص قاع وجدار الأنبوبة",
          instructionEn: "Carefully remove the tube at exactly 3 minutes. Let it stand upright for 1 minute and inspect the bottom apex against good light for red precipitate.",
          instructionAr: "ارفع الأنبوبة عند الدقيقة الثالثة تماماً. اتركها تستقر لدقيقة واحدة وافحص قاع الأنبوبة في مواجهة الضوء لرؤية الراسب الأحمر."
        }
      ],
      incubationTime: "Strictly 2 to 3 minutes (Timed with stopwatch)",
      temperature: "100°C Boiling Water Bath",
      safetyPrecautionsEn: [
        "Acetic acid fumes can be irritating; heat within a well-ventilated laboratory.",
        "Always use a wooden test tube clamp when transferring tubes in and out of the boiling water bath."
      ],
      safetyPrecautionsAr: [
        "أبخرة حمض الخليك قد تسبب تهيجاً للعينين والأنف؛ سخن في مكان جيد التهوية.",
        "استخدم ماسك الأنابيب الخشبي دائماً عند نقل الأنابيب من وإلى الحمام المائي الساخن."
      ],
      criticalPitfallsEn: [
        "Boiling beyond 3 minutes: Extended heating hydrolyzes the glycosidic bonds of disaccharides (maltose/lactose) into monosaccharides, producing a FALSE-POSITIVE red precipitate.",
        "Mistaking general solution haze for bottom precipitate: Look specifically at the very bottom tip where dense Cu₂O settles."
      ],
      criticalPitfallsAr: [
        "الغليان لأكثر من 3 دقائق: التسخين المطول يحلل الرابطة الجليكوسيدية في السكريات الثنائية (مالتوز/لاكتوز) لتعطي سكريات أحادية مما يسبب نتيجة إيجابية كاذبة.",
        "الخلط بين عكارة السائل والراسب الحقيقي: ابحث عن الراسب الأحمر المترسب بدقة في قاع الأنبوبة المنحني."
      ]
    },
    observation: {
      whatToLookForEn: "Carefully inspect the curved apex at the very bottom of the test tube.",
      whatToLookForAr: "افحص بدقة قاع الأنبوبة المنحني وجدرانها السفلية لرصد الراسب الأحمر.",
      positiveVisualEn: "A fine red/brick-red precipitate of cuprous oxide (Cu₂O) forms along the sides and settles in the bottom tip within 2 to 3 minutes.",
      positiveVisualAr: "تشكل راسب أحمر طوبي خفيف من أكسيد النحاسوز يستقر في قاع الأنبوبة وجدرانها السفلية في غضون دقيقتين إلى 3 دقائق.",
      negativeVisualEn: "Solution remains clear blue with no precipitate at the bottom after 3 minutes.",
      negativeVisualAr: "بقاء المحلول أزرق صافياً دون أي راسب في قاع الأنبوبة بعد انقضاء 3 دقائق من الغليان.",
      keyFeatures: [
        "Strict 2 to 3-minute stopwatch cutoff",
        "Precipitate is scanty and settles at bottom tip",
        "Weakly acidic medium suppresses disaccharide reaction"
      ]
    },
    interpretation: {
      positiveDeductionEn: "The sample is a Reducing Monosaccharide (Glucose, Fructose, or Galactose). Disaccharides are ruled out. Proceed to Experiment 5 (Seliwanoff's Test) to differentiate whether it is an Aldose or Ketose.",
      positiveDeductionAr: "العينة عبارة عن سكر أحادي مختزل (جلوكوز، فركتوز، أو جلاكتوز). تُستبعد السكريات الثنائية. يجب الانتقال الآن إلى التجربة 5 (اختبار سيليفانوف) لتحديد ما إذا كان السكر ألدوزاً أم كيتوزاً.",
      negativeDeductionEn: "The sample is a Reducing Disaccharide (Maltose or Lactose). It gave a positive Benedict test but a negative Barfoed test at 3 minutes.",
      negativeDeductionAr: "العينة عبارة عن سكر ثنائي مختزل (مالتوز أو لاكتوز)، لأنها أعطت نتيجة إيجابية مع بندكت وسلبية مع بارفود خلال 3 دقائق.",
      diagnosticAlgorithmStep: "Step 4 of Carbohydrate Diagnostic Flowchart: Monosaccharide vs Disaccharide Gate.",
      clinicalScenarios: [
        {
          scenario: "Urine from a third-trimester pregnant female tests positive with Benedict's test, but completely negative with Barfoed's test at 3 minutes.",
          outcome: "Confirms benign physiologic lactosuria (lactose is a disaccharide), effectively ruling out gestational diabetes mellitus."
        },
        {
          scenario: "Pediatric patient urine produces red precipitate in Barfoed's test within 2 minutes.",
          outcome: "Confirms presence of a reducing monosaccharide (Glucose, Galactose, or Fructose), warranting immediate metabolic workup."
        }
      ]
    },
    doctorVideo: {
      videoId: "vJWg9eXjYQc",
      youtubeUrl: "https://www.youtube.com/watch?v=vJWg9eXjYQc",
      titleEn: "Barfoed's Test With Demonstration — Differentiating Monosaccharides",
      titleAr: "اختبار بارفود للتمييز السريع بين السكريات الأحادية والثنائية",
      doctorName: "Dr. Amit (Biochemistry Basics)",
      doctorTitle: "Associate Professor of Medical Biochemistry",
      channelTitle: "Biochemistry Basics by Dr Amit",
      duration: "04:15",
      objectives: [
        "Explain how the weakly acidic copper acetate medium decreases reduction rate to differentiate monosaccharides",
        "Observe the formation of red cuprous oxide precipitate within 2 to 3 minutes for glucose",
        "Understand why boiling beyond 3 minutes causes false-positive disaccharide acid hydrolysis"
      ],
      highYieldPoints: [
        "Barfoed reagent is copper acetate in dilute acetic acid (acidic pH)",
        "Monosaccharides react within 2–3 minutes; disaccharides require >10 minutes",
        "Precipitate characteristically settles as a small red pellet in the bottom tip"
      ]
    },
    questions: [
      {
        id: 1,
        question: "Why does Barfoed's test selectively differentiate monosaccharides from reducing disaccharides within 3 minutes?",
        questionAr: "لماذا يُميز اختبار بارفود السكريات الأحادية عن السكريات الثنائية المختزلة بشكل انتقائي خلال 3 دقائق؟",
        options: [
          { key: "A", text: "Disaccharides are completely insoluble in water" },
          { key: "B", text: "The weakly acidic medium retards reduction, so only stronger reducing monosaccharides reduce Cu²⁺ rapidly" },
          { key: "C", text: "Barfoed's reagent oxidizes only keto sugars" },
          { key: "D", text: "Disaccharides react with acetic acid to form insoluble acetate salts" }
        ],
        correctKey: "B",
        explanation: "Barfoed's reagent utilizes cupric acetate in dilute acetic acid. The weakly acidic pH diminishes reducing power, meaning only the stronger reducing monosaccharides can reduce Cu²⁺ to red Cu₂O within 2–3 minutes, whereas disaccharides require >10 minutes."
      },
      {
        id: 2,
        question: "What error occurs if a medical student accidentally boils a lactose solution in Barfoed's reagent for 8 minutes instead of 3 minutes?",
        questionAr: "ما هو الخطأ الذي يحدث إذا قام طالب بغلي محلول اللاكتوز في كاشف بارفود لمدة 8 دقائق بدلاً من 3 دقائق؟",
        options: [
          { key: "A", text: "Lactose evaporates completely" },
          { key: "B", text: "Prolonged boiling in acid hydrolyzes lactose into glucose and galactose, creating a FALSE-POSITIVE red precipitate" },
          { key: "C", text: "The copper ions precipitate as black copper oxide" },
          { key: "D", text: "Lactose is converted into a non-reducing polysaccharide" }
        ],
        correctKey: "B",
        explanation: "Boiling disaccharides (like lactose or maltose) in the acidic Barfoed reagent beyond 3 minutes leads to acid hydrolysis of the glycosidic bond, releasing free glucose and galactose which then reduce Cu²⁺, yielding a false-positive."
      },
      {
        id: 3,
        question: "A urine sample tests Positive for Molisch, Negative for Iodine, Positive for Benedict, and Positive for Barfoed (<3 min). What is the sugar class?",
        questionAr: "عينة بول أعطت: إيجابي موليش، سلبي يود، إيجابي بندكت، وإيجابي بارفود (<3 دقائق). ما هو تصنيف السكر؟",
        options: [
          { key: "A", text: "Polysaccharide (Starch)" },
          { key: "B", text: "Non-reducing Disaccharide (Sucrose)" },
          { key: "C", text: "Reducing Disaccharide (Lactose/Maltose)" },
          { key: "D", text: "Reducing Monosaccharide (e.g. Glucose, Fructose, or Galactose)" }
        ],
        correctKey: "D",
        explanation: "Positive Molisch = Carbohydrate; Negative Iodine = Not a polysaccharide; Positive Benedict = Reducing sugar; Positive Barfoed in <3 min = Reducing Monosaccharide."
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 5: Seliwanoff's Test
  // ==========================================
  {
    id: 'seliwanoff',
    order: 5,
    name: "Seliwanoff's Test",
    nameAr: "اختبار سيليفانوف",
    tagline: "Rapid Colorimetric Differentiation of Ketohexoses (Fructose) from Aldohexoses",
    taglineAr: "الفحص اللوني السريع للتمييز بين السكريات الكيتونية (الفركتوز) والألدوزية",
    categoryBadge: "Ketose vs Aldose Assay",
    lesson: {
      summaryEn: "Seliwanoff's test is the definitive colorimetric assay used to rapidly differentiate ketohexoses (such as fructose) from aldohexoses (such as glucose and galactose). Ketohexoses dehydrate much more rapidly in hot acid to form an intense cherry-red condensation complex within 30 to 60 seconds.",
      summaryAr: "اختبار سيليفانوف هو الفحص اللوني الحاسم للتمييز السريع بين السكريات السداسية الكيتونية (كالفركتوز) والسكريات السداسية الألدوزية (كالجلوكوز والجلاكتوز). تُنزع جزيئات الماء من الكيتوزات في الحمض الساخن بسرعة فائقة لتعطي لوناً أحمر كرزياً ساطعاً في أقل من دقيقة.",
      principleEn: "Seliwanoff's reagent contains resorcinol (1,3-dihydroxybenzene) in dilute hydrochloric acid (approx. 3M HCl). Hot concentrated acid dehydrates sugars to form furfural derivatives. Ketohexoses (fructose) have a ketone carbonyl group at C2 and dehydrate at a vastly accelerated rate compared to aldohexoses. Within 30 to 60 seconds of boiling, fructose forms 5-hydroxymethylfurfural (5-HMF), which rapidly condenses with resorcinol to yield an intense, vibrant cherry-red condensation chromogen. Aldohexoses dehydrate sluggishly and remain colorless or pale pink after 1 minute; they only yield color after prolonged boiling (>5 minutes).",
      principleAr: "يحتوي كاشف سيليفانوف على الريزورسينول (1,3-ثنائي هيدروكسي بنزين) في حمض الهيدروكلوريك المخفف (~3 مولار). ينزع الحمض الساخن الماء من السكريات الكيتونية (الفركتوز) بسرعة فائقة تفوق الألدوزات لتكوين 5-هيدروكسي ميثيل فورفورال (5-HMF) خلال 30 إلى 60 ثانية، والذي يتكاثف فوراً مع الريزورسينول منتجاً معقداً أحمر كرزياً ساطعاً وواضحاً.",
      chemicalEquation: "Ketohexose (Fructose) + 3M HCl xrightarrow{Δ, strictly 30-60 sec} 5-HMF + Resorcinol → Cherry-Red Chromogen Complex",
      chemicalMechanism: [
        "1. Rapid Keto Dehydration: The open-chain keto form of fructose dehydrates much faster than cyclic aldoses due to the lower activation energy of C2-ketone dehydration.",
        "2. Intermediary 5-HMF: Generates 5-hydroxymethylfurfural in under 60 seconds of boiling at 100°C.",
        "3. Resorcinol Electrophilic Coupling: Resorcinol couples with the aldehyde group of 5-HMF, forming a diphenylmethane-type cherry-red condensation product."
      ],
      reagents: [
        {
          name: "Seliwanoff's Reagent (0.05% Resorcinol in 3M Hydrochloric Acid)",
          role: "Acid dehydrating medium combined with phenolic chromogenic coupler",
          roleAr: "وسط حمضي نازع للماء مقترن بمركب فينولي ملوّن لإنتاج اللون الأحمر الكرزي"
        }
      ],
      clinicalRelevanceEn: "Crucial in andrology and reproductive medicine: Fructose is synthesized by the seminal vesicles and serves as the exclusive nutrient fuel for sperm motility; a negative Seliwanoff test in semen indicates seminal vesicle agenesis or ejaculatory duct obstruction. Also used to diagnose Essential Fructosuria and Hereditary Fructose Intolerance.",
      clinicalRelevanceAr: "حيوي في طب الذكورة وتحليل السائل المنوي: يُفرز الفركتوز من الحويصلات المنوية وهو الغذاء الحصري لحركة الحيوانات المنوية؛ فغيابه يدل على انسداد القنوات الدافقة أو غياب الحويصلات المنوية. كما يُستخدم لتشخيص بيلة الفركتوز الوراثية.",
      targetAnalytesEn: "Positive (<60 sec): Ketohexoses (Fructose; and Fructose-containing disaccharides like Sucrose after rapid hydrolysis). Negative (at 60 sec): Aldohexoses (Glucose, Galactose).",
      targetAnalytesAr: "إيجابي (<60 ثانية): السكريات الكيتونية (الفركتوز، والسكروز الذي يتحلل لفركتوز). سلبي (عند 60 ثانية): السكريات الألدوزية (جلوكوز، جلاكتوز)."
    },
    realImage: {
      url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80",
      captionEn: "Real laboratory Seliwanoff's test tubes: Left tube displays positive reaction with an intense, brilliant cherry-red solution formed within 45 seconds of boiling (fructose/ketose). Right tube displays negative aldohexose reaction remaining clear/colorless after 1 minute (glucose).",
      captionAr: "صورة مخبرية حقيقية لاختبار سيليفانوف: الأنبوبة اليسرى تظهر التفاعل الإيجابي مع محلول أحمر كرزي ساطع تشكل خلال 45 ثانية من الغليان (فركتوز/كيتوز). الأنبوبة اليمنى تظهر سلبية السكر الألدوزي مع بقاء المحلول رائقاً دون لون بعد دقيقة (جلوكوز).",
      plateType: "Resorcinol Cherry-Red Chromogen Solution",
      magnification: "Macroscopic Bench Reaction",
      positiveVisualDescription: "Rapid appearance of a deep, brilliant cherry-red (ruby-red) transparent colored solution within 30 to 60 seconds.",
      negativeVisualDescription: "Solution remains clear, colorless, or faintly pale pink/yellow after 1 minute of boiling."
    },
    tubes: {
      posTubeType: 'seliwanoff-pos',
      negTubeType: 'seliwanoff-neg',
      posLabelEn: "Cherry-Red Solution (<60 sec)",
      posLabelAr: "محلول أحمر كرزي ساطع (<60 ثانية)",
      posTarget: "Ketohexose Present (Fructose)",
      negLabelEn: "Clear / Faint Pink (at 60 sec)",
      negLabelAr: "شفاف أو وردي باهت جداً (عند 60 ثانية)",
      negTarget: "Aldohexose (Glucose, Galactose)"
    },
    procedure: {
      steps: [
        {
          stepNumber: 1,
          titleEn: "Measure Seliwanoff's Reagent",
          titleAr: "إضافة كاشف سيليفانوف",
          instructionEn: "Pipette 3.0 mL of Seliwanoff's reagent into a clean borosilicate glass test tube.",
          instructionAr: "ضع 3.0 مل من كاشف سيليفانوف في أنبوبة اختبار زجاجية نظيفة وجافة."
        },
        {
          stepNumber: 2,
          titleEn: "Add Sugar Solution",
          titleAr: "إضافة محلول السكر",
          instructionEn: "Add 1.0 mL of unknown monosaccharide solution. Mix thoroughly.",
          instructionAr: "أضف 1.0 مل من محلول السكر الأحادي المجهول. اخلط جيداً."
        },
        {
          stepNumber: 3,
          titleEn: "Boil with Strict 60-Second Timer",
          titleAr: "الغليان مع توقيت صارم لمدة دقيقة واحدة",
          instructionEn: "Immerse the tube into a vigorously boiling water bath (100°C) with a timer running. Boil for strictly 30 to 60 seconds (maximum 1 minute).",
          instructionAr: "اغمر الأنبوبة في حمام مائي يغلي تماماً وشغل المؤقت. اغلي لمدة تتراوح بين 30 إلى 60 ثانية فقط (دقيقة واحدة كحد أقصى)."
        },
        {
          stepNumber: 4,
          titleEn: "Observe Cherry-Red Development",
          titleAr: "ملاحظة ظهور اللون الأحمر الكرزي",
          instructionEn: "Remove the tube promptly at 60 seconds and inspect the color against a white background.",
          instructionAr: "ارفع الأنبوبة فوراً عند انقضاء 60 ثانية وافحص اللون أمام خلفية بيضاء."
        }
      ],
      incubationTime: "Strictly 30 to 60 seconds (Maximum 1 minute)",
      temperature: "100°C Boiling Water Bath",
      safetyPrecautionsEn: [
        "Hydrochloric acid produces irritating acidic vapors when boiled; perform heating under a fume hood or well-ventilated station.",
        "Handle hot tubes with wooden clamps."
      ],
      safetyPrecautionsAr: [
        "حمض الهيدروكلوريك يطلق أبخرة حمضية مخرشة عند الغلي؛ سخن في مكان جيد التهوية.",
        "أمسك الأنابيب الساخنة بالملاقط الخشبية دائماً."
      ],
      criticalPitfallsEn: [
        "Boiling longer than 1 minute: Prolonged heating slowly converts aldohexoses (glucose) into furfurals, causing a FALSE-POSITIVE cherry-red color with glucose!",
        "Excessive sugar concentration: High glucose concentrations can accelerate background color formation; always respect the 60-second cutoff."
      ],
      criticalPitfallsAr: [
        "الغليان لأكثر من دقيقة: التسخين المطول يحول السكريات الألدوزية (الجلوكوز) ببطء إلى فورفورال مما يعطي لوناً أحمر كاذباً!",
        "التركيز العالي للسكر: التركيز العالي للجلوكوز قد يسرع التفاعل الشاحب؛ التزم بفاصل الـ 60 ثانية دائماً."
      ]
    },
    observation: {
      whatToLookForEn: "Observe the rapid color transformation during the first 30 to 60 seconds in the boiling water bath.",
      whatToLookForAr: "راقب التغير اللوني السريع خلال أول 30 إلى 60 ثانية في الحمام المائي المغلي.",
      positiveVisualEn: "Rapid emergence of a brilliant, intense cherry-red / ruby-red colored solution in 30 to 60 seconds.",
      positiveVisualAr: "ظهور سريع للون أحمر كرزي ساطع ونقي في غضون 30 إلى 60 ثانية من الغليان.",
      negativeVisualEn: "Solution remains clear, colorless, or faintly pale pink after 1 minute.",
      negativeVisualAr: "بقاء المحلول رائقاً دون لون أو بلون وردي باهت جداً بعد انقضاء دقيقة كاملة.",
      keyFeatures: [
        "Strict 60-second reaction window",
        "Clear transparent cherry-red solution (not a precipitate)",
        "Differentiates ketoses from aldoses"
      ]
    },
    interpretation: {
      positiveDeductionEn: "The sample is a KETOHEXOSE (specifically Fructose). Aldohexoses (Glucose, Galactose) are definitively excluded.",
      positiveDeductionAr: "العينة عبارة عن سكر كيتوني سداسي (فركتوز بالتحديد). تُستبعد السكريات الألدوزية (جلوكوز، جلاكتوز) نهائياً.",
      negativeDeductionEn: "The sample is an ALDOHEXOSE (such as Glucose or Galactose). Combined with a positive Barfoed test, this confirms the unknown sugar is an Aldose monosaccharide.",
      negativeDeductionAr: "العينة عبارة عن سكر ألدوزي سداسي (مثل الجلوكوز أو الجلاكتوز)، لتكتمل بذلك خوارزمية التشخيص بالكامل.",
      diagnosticAlgorithmStep: "Step 5 of Carbohydrate Diagnostic Flowchart: Final Ketose vs Aldose Terminal Gate.",
      clinicalScenarios: [
        {
          scenario: "Seminal fluid specimen from an infertile male with azoospermia is tested with Seliwanoff's reagent and remains colorless at 60 seconds.",
          outcome: "Confirms absence of seminal fructose, pointing to bilateral ejaculatory duct obstruction or congenital absence of the seminal vesicles."
        },
        {
          scenario: "Asymptomatic child exhibits reducing sugar in urine (Benedict positive, Barfoed positive <3 min, Seliwanoff cherry-red <60 sec).",
          outcome: "Diagnostic for benign Essential Fructosuria (fructokinase enzyme deficiency)."
        }
      ]
    },
    doctorVideo: {
      videoId: "vJWg9eXjYQc",
      youtubeUrl: "https://www.youtube.com/watch?v=vJWg9eXjYQc",
      titleEn: "Seliwanoff's Test (Resorcinol / Cherry-Red Ketose Test)",
      titleAr: "اختبار سيليفانوف للكشف عن الكيتوزات (الفركتوز) وشرح الطبيب",
      doctorName: "Dr. Amit (Biochemistry Basics)",
      doctorTitle: "Associate Professor of Medical Biochemistry",
      channelTitle: "Biochemistry Basics by Dr Amit",
      duration: "04:30",
      objectives: [
        "Understand rapid acid-catalyzed dehydration kinetics of ketohexoses versus aldohexoses",
        "Demonstrate the 60-second boiling cutoff and observe cherry-red resorcinol condensation",
        "Explain the diagnostic role of seminal fructose testing in male infertility evaluation"
      ],
      highYieldPoints: [
        "Fructose (ketose) yields a vibrant cherry-red color in under 60 seconds",
        "Do not boil beyond 1 minute to avoid false-positive aldose (glucose) dehydration",
        "Absence of fructose in seminal fluid indicates seminal vesicle pathology"
      ]
    },
    questions: [
      {
        id: 1,
        question: "Why do ketohexoses (fructose) produce a cherry-red color much faster than aldohexoses (glucose) in Seliwanoff's test?",
        questionAr: "لماذا تُنتج السكريات الكيتونية (الفركتوز) لوناً أحمر كرزياً أسرع بكثير من الألدوزية (الجلوكوز) في اختبار سيليفانوف؟",
        options: [
          { key: "A", text: "Ketohexoses contain more carbon atoms than aldohexoses" },
          { key: "B", text: "The ketone group at C2 undergoes acid dehydration to 5-HMF with significantly lower activation energy and higher velocity" },
          { key: "C", text: "Glucose reacts with resorcinol to produce a green color that masks the red" },
          { key: "D", text: "Fructose is a disaccharide that hydrolyzes instantly" }
        ],
        correctKey: "B",
        explanation: "Ketohexoses undergo acid dehydration to 5-hydroxymethylfurfural (5-HMF) at a much faster rate than aldohexoses due to the ketone group at position 2. 5-HMF immediately condenses with resorcinol to form the cherry-red chromogen within 30 to 60 seconds."
      },
      {
        id: 2,
        question: "What dangerous technical error occurs if the test tube in Seliwanoff's test is boiled for 4 minutes instead of 60 seconds?",
        questionAr: "ما هو الخطأ الفني الذي يحدث إذا تُركت أنبوبة اختبار سيليفانوف في الحمام المغلي لمدة 4 دقائق بدلاً من 60 ثانية؟",
        options: [
          { key: "A", text: "The reagent boils away completely" },
          { key: "B", text: "Aldohexoses (such as glucose) slowly dehydrate, yielding a FALSE-POSITIVE cherry-red color" },
          { key: "C", text: "Fructose is converted into starch" },
          { key: "D", text: "Resorcinol precipitates out as white crystals" }
        ],
        correctKey: "B",
        explanation: "The selectivity of Seliwanoff's test is purely kinetic: ketoses react in <60 seconds, while aldoses react only after prolonged heating (>5 minutes). Boiling beyond 1 minute allows glucose to dehydrate into 5-HMF, producing a false-positive cherry-red result."
      },
      {
        id: 3,
        question: "In an andrology clinic, seminal fluid from an infertile male with azoospermia is tested with Seliwanoff's test and yields a negative result (no cherry-red color). What does this indicate?",
        questionAr: "في عيادة الذكورة، تم فحص السائل المنوي لمريض يعاني من العقم باختبار سيليفانوف وأعطى نتيجة سلبية (غياب اللون الأحمر). على ماذا يدل ذلك؟",
        options: [
          { key: "A", text: "Normal seminal vesicle function" },
          { key: "B", text: "Absence of fructose, suggesting bilateral ejaculatory duct obstruction or seminal vesicle agenesis" },
          { key: "C", text: "Severe uncontrolled diabetes mellitus" },
          { key: "D", text: "Excessive sperm motility" }
        ],
        correctKey: "B",
        explanation: "Fructose in seminal fluid is produced by the seminal vesicles to supply energy for sperm motility. A negative Seliwanoff test confirms the absence of fructose, which points to seminal vesicle agenesis or mechanical obstruction of the ejaculatory ducts."
      }
    ]
  }
];
