import {
  BiochemistryTestDetail,
  ExamQuestion,
  MedicalExam,
  LabSubjectId
} from '../types';

/**
 * 9 Standard Scientific Biochemistry Tests with Full Scientific Accuracy
 */
export const BIOCHEMISTRY_DETAILED_TESTS: BiochemistryTestDetail[] = [
  {
    id: 'test_benedict',
    testNumber: 1,
    testNameEnglish: "Benedict's Test",
    titleArabic: "اختبار بندكت (Benedict's Test)",
    category: 'carbohydrates',
    objective: "الكشف عن السكريات المختزلة (Reducing Sugars) التي تحتوي على مجموعة ألدهيد أو كيتون حرة.",
    principle: "In an alkaline medium at boiling temperature, reducing sugars reduce cupric ions (Cu²⁺, blue copper sulfate) to cuprous ions (Cu⁺), which precipitate as insoluble cuprous oxide (Cu₂O) giving a green, yellow, orange, or brick-red precipitate depending on sugar concentration.",
    reagents: [
      "Benedict's Qualitative Reagent (Copper sulfate CuSO₄ · 5H₂O, Sodium citrate, Sodium carbonate Na₂CO₃)"
    ],
    procedure: [
      "ضع 2 مل من كاشف بندكت (Benedict's reagent) في أنبوبة اختبار نظيفة وجافة.",
      "أضف 8 قطرات (حوالي 0.5 مل) من محلول العينة المراد فحصها.",
      "امزج المحتويات جيداً وضع الأنبوبة في حمام مائي يغلي (Boiling water bath) لمدة 3 - 5 دقائق.",
      "اترك الأنبوبة تبرد تدريجياً ولاحظ تغير اللون وظهور الراسب."
    ],
    positiveResult: {
      appearance: "راسب أحمر طوبي (Brick-red precipitate) أو برتقالي/أصفر/أخضر",
      colorHex: "#dc2626",
      explanation: "تكون راسب أكسيد النحاسوز (Cu₂O) نتيجة اختزال النحاس بواسطة مجموعة الألدهيد أو الكيتون الحرة.",
      samplePositiveList: ["Glucose", "Fructose", "Galactose", "Maltose", "Lactose"]
    },
    negativeResult: {
      appearance: "يبقى المحلول أزرق صافياً بدون أي راسب (Clear Blue)",
      colorHex: "#2563eb",
      explanation: "السكريات غير المختزلة لا تحتوي على مجموعة كربونيل حرة لاختزال أيونات النحاس.",
      sampleNegativeList: ["Sucrose (قصب السكر)", "Starch (النشا)", "Water Control"]
    },
    interpretation: "الاختبار نوعي وشبه كمي (Semi-quantitative): اللون الأخضر يشير إلى تركيز ضئيل (0.5%)، والأصفر (1%)، والبرتقالي (1.5%)، بينما الأحمر الطوبي يشير إلى تركيز مرتفع (≥ 2%).",
    clinicalSignificance: "يُستخدم كلاسيكياً في الكشف عن السكر في البول (Glycosuria) لتشخيص ومتابعة داء السكري (Diabetes Mellitus) وحالات متلازمة نقص الجالاكتوز (Galactosemia) لدى الرضع.",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
    testTubeState: {
      positiveColor: "#dc2626",
      negativeColor: "#2563eb",
      hasPrecipitate: true
    }
  },
  {
    id: 'test_iodine',
    testNumber: 2,
    testNameEnglish: "Iodine Test",
    titleArabic: "اختبار اليود (Iodine Test)",
    category: 'carbohydrates',
    objective: "التمييز بين السكريات المتعددة (Polysaccharides كالنشا والجليكوجين) والسكريات الأحادية والثنائية.",
    principle: "Iodine forms a colored charge-transfer adsorption complex inside the helical helical coils of polysaccharides. Amylose in starch produces an intense deep blue-black color, while glycogen (branched) gives a reddish-brown color.",
    reagents: [
      "Lugol's Iodine Solution (Iodine I₂ dissolved in Potassium Iodide KI aqueous solution)"
    ],
    procedure: [
      "ضع 2 مل من محلول العينة في أنبوبة اختبار.",
      "أضف قطرتين إلى 3 قطرات من محلول اليود (Lugol's iodine).",
      "امزج برفق في درجة حرارة الغرفة ولاحظ التغير اللوني الفوري دون تسخين."
    ],
    positiveResult: {
      appearance: "لون أزرق داكن إلى أسود للنشا (Deep Blue-Black) أو بني محمر للجليكوجين",
      colorHex: "#1e1b4b",
      explanation: "احتباس جزيئات اليود (I₃⁻ / I₅⁻) داخل الحلزون اللولبي لسلاسل الأميلوز في النشا.",
      samplePositiveList: ["Starch Solution (النشا)", "Glycogen (بني محمر)", "Dextrin (أرجواني)"]
    },
    negativeResult: {
      appearance: "يبقى لون اليود أصفر/بني خفيف (Yellow-Brown)",
      colorHex: "#d97706",
      explanation: "السكريات الأحادية والثنائية تفتقر للبنية اللولبية اللازمة لاحتجاز جزيئات اليود.",
      sampleNegativeList: ["Glucose", "Fructose", "Sucrose", "Cellulose"]
    },
    interpretation: "يختفي اللون الأزرق بالحرارة نظراً لتفكك الحلزون اللولبي، ويعود بالتبريد التدريجي.",
    clinicalSignificance: "يُستخدم في دراسة هضم الكربوهيدرات بواسطة إنزيم الأميليز اللعابي والبنكرياسي (Salivary & Pancreatic Amylase) ورصد التحلل الإنزيمي للنشا.",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80",
    testTubeState: {
      positiveColor: "#0f172a",
      negativeColor: "#d97706",
      hasPrecipitate: false
    }
  },
  {
    id: 'test_biuret',
    testNumber: 3,
    testNameEnglish: "Biuret Test",
    titleArabic: "اختبار البيوريت (Biuret Test)",
    category: 'proteins_aminoacids',
    objective: "الكشف عن وجود الروابط الببتيدية (Peptide Bonds) والبروتينات في المحاليل الحيوية.",
    principle: "In an alkaline solution, cupric ions (Cu²⁺) coordinate with the unshared electron pairs of nitrogen atoms in four or more peptide bonds (-CO-NH-), forming a characteristic violet or purple coordination complex.",
    reagents: [
      "Biuret Reagent (1% Copper sulfate CuSO₄, 10% Sodium hydroxide NaOH / Potassium hydroxide, Sodium potassium tartrate to stabilize cupric ions)"
    ],
    procedure: [
      "ضع 2 مل من محلول العينة (كالزلال أو البول) في أنبوبة اختبار.",
      "أضف 2 مل من هيدروكسيد الصوديوم (10% NaOH) لتهيئة الوسط القلوي.",
      "أضف 4-5 قطرات من كبريتات النحاس (1% CuSO₄) واخلط بلطف.",
      "لاحظ ظهور اللون البنفسجي في غضون 1 - 2 دقيقة."
    ],
    positiveResult: {
      appearance: "لون بنفسجي أو أرجواني واضح (Violet / Purple Color)",
      colorHex: "#7c3aed",
      explanation: "تكون معقد تناسقي بين أيونات النحاس الثنائي ونيتروجين الروابط الببتيدية.",
      samplePositiveList: ["Egg Albumin (زلال البيض)", "Serum Albumin", "Casein (بروتين الحليب)", "Gelatin"]
    },
    negativeResult: {
      appearance: "يبقى المحلول أزرق فاتح (Light Blue)",
      colorHex: "#38bdf8",
      explanation: "عدم وجود روابط ببتيدية كافية (يتطلب الاختبار رابطتين ببتيديتين على الأقل).",
      sampleNegativeList: ["Free Amino Acids (Glycine, Alanine)", "Dipeptides", "Water Control"]
    },
    interpretation: "شدة اللون البنفسجي تتناسب طردياً مع عدد الروابط الببتيدية وتركيز البروتين الكلي.",
    clinicalSignificance: "الطريقة القياسية المعتمدة لقياس البروتين الكلي في مصل الدم (Total Serum Protein) والكشف عن زلال البول (Proteinuria) في أمراض الكلى والمتلازمة الكلائية (Nephrotic Syndrome).",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80",
    testTubeState: {
      positiveColor: "#7c3aed",
      negativeColor: "#38bdf8",
      hasPrecipitate: false
    }
  },
  {
    id: 'test_ninhydrin',
    testNumber: 4,
    testNameEnglish: "Ninhydrin Test",
    titleArabic: "اختبار النينهيدرين (Ninhydrin Test)",
    category: 'proteins_aminoacids',
    objective: "الكشف العام عن الأحماض الأمينية الحرة (Free α-Amino Acids) ومجموعات الأمين الأولية.",
    principle: "Ninhydrin (triketohydrindene hydrate) acts as a powerful oxidizing agent that undergoes oxidative deamination and decarboxylation with α-amino acids, yielding Ruhemann's purple complex (diketohydrindylidene-diketohydrindamine) at 100°C.",
    reagents: [
      "0.1% - 0.2% Ninhydrin solution in ethanol/acetone"
    ],
    procedure: [
      "ضع 1 مل من محلول الحمض الأميني في أنبوبة اختبار.",
      "أضف 5 قطرات من محلول النينهيدرين.",
      "سخن في حمام مائي يغلي لمدة دقيقتين إلى 5 دقائق ولاحظ اللون الناتج."
    ],
    positiveResult: {
      appearance: "لون أرجواني أو أزرق بنفسجي عميق (Ruhemann's Purple)، ولون أصفر للبرولين",
      colorHex: "#4338ca",
      explanation: "تكون مركب Ruhemann's purple نتيجة التفاعل مع مجموعات الأمين الحرة (-NH₂).",
      samplePositiveList: ["Glycine", "Alanine", "Glutamic acid", "Proline (يعطي لوناً أصفر فريداً)"]
    },
    negativeResult: {
      appearance: "عديم اللون أو أصفر باهت (Colorless / Pale)",
      colorHex: "#f1f5f9",
      explanation: "عدم وجود أحماض أمينية أولية أو حرة.",
      sampleNegativeList: ["Carbohydrates (Glucose)", "Lipids", "Pure Hydrocarbons"]
    },
    interpretation: "الأحماض الأمينية الأولية تعطي لوناً بنفسجياً، بينما الأحماض الأمينية الثانوية (Imino acids مثل Proline و Hydroxyproline) تعطي لوناً أصفر مميزاً.",
    clinicalSignificance: "يُستخدم في الكروماتوغرافيا لتحديد الأحماض الأمينية في البول لتشخيص بيلة الفينيل كيتون (PKU) وأمراض التمثيل الغذائي الوراثية للأحماض الأمينية.",
    imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80",
    testTubeState: {
      positiveColor: "#4338ca",
      negativeColor: "#f8fafc",
      hasPrecipitate: false
    }
  },
  {
    id: 'test_sudan',
    testNumber: 5,
    testNameEnglish: "Sudan IV Test (Lipid Test)",
    titleArabic: "اختبار السودان للدهون (Sudan IV Test)",
    category: 'lipids',
    objective: "الكشف عن وجود الدهون، الزيوت، والجلسريدات الثلاثية (Triglycerides).",
    principle: "Sudan IV is a non-polar, fat-soluble lysochrome diazo dye. Because it is hydrophobic, it selectively dissolves into non-polar lipid droplets rather than the surrounding polar aqueous solvent, staining lipids bright red.",
    reagents: [
      "Sudan IV or Sudan III alcoholic solution (0.5% in 95% ethanol)"
    ],
    procedure: [
      "ضع 2 مل من الماء و1 مل من عينة الزيت/الدهن في أنبوبة اختبار.",
      "أضف 3-4 قطرات من كاشف السودان IV ورج الأنبوبة بقوة.",
      "اترك الأنبوبة تستقر في الحامل لمدة دقيقة واحدة لمشاهدة انفصال الطبقات."
    ],
    positiveResult: {
      appearance: "طبقة زيتية حمراء زاهية طافية على السطح (Bright Red Floating Layer)",
      colorHex: "#e11d48",
      explanation: "ذوبان صبغة السودان غير القطبية بشكل انتقائي داخل قطيرات الزيت والدهون.",
      samplePositiveList: ["Vegetable Oil (زيت نباتي)", "Butter / Margarine", "Serum Triglycerides"]
    },
    negativeResult: {
      appearance: "المحلول المائي يبقى شاحباً مع ترسب جزيئات الصبغة غير الذائبة",
      colorHex: "#cbd5e1",
      explanation: "عدم وجود مذيب دهني غير قطبي لتذويب الصبغة.",
      sampleNegativeList: ["Distilled Water", "Glucose Solution", "Albumin Solution"]
    },
    interpretation: "ظهور حلقة أو طبقة حمراء واضحة على السطح يؤكد وجود الدهون والزيوت المحايدة.",
    clinicalSignificance: "يُستخدم سريرياً في فحص براز المرضى (Fecal Fat Stain) لتشخيص متلازمة سوء الامتصاص (Malabsorption Syndrome) والإسهال الدهني (Steatorrhea) ونقص إفرازات البنكرياس.",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80",
    testTubeState: {
      positiveColor: "#e11d48",
      negativeColor: "#f1f5f9",
      hasRing: true,
      ringColor: "#e11d48"
    }
  },
  {
    id: 'test_molisch',
    testNumber: 6,
    testNameEnglish: "Molisch's Test",
    titleArabic: "اختبار موليش العام للكربوهيدرات (Molisch's Test)",
    category: 'carbohydrates',
    objective: "الاختبار الكشفي العام الشامل لجميع أنواع الكربوهيدرات (أحادية، ثنائية، متعددة).",
    principle: "Concentrated sulfuric acid (H₂SO₄) dehydrates carbohydrates to form furfural (from pentoses) or 5-hydroxymethylfurfural (from hexoses). These cyclic aldehydes condense with α-naphthol to form a characteristic purple/violet ring at the interface.",
    reagents: [
      "Molisch Reagent (5% α-naphthol in 95% ethanol)",
      "Concentrated Sulfuric Acid (Conc. H₂SO₄, 98%)"
    ],
    procedure: [
      "ضع 2 مل من محلول العينة في أنبوبة اختبار.",
      "أضف قطرتين من كاشف موليش (α-naphthol) واخلط جيداً.",
      "أمِل الأنبوبة بزاوية 45 درجة وأضف بحذر شديد 1 مل من حمض الكبريتيك المركز على جدار الأنبوبة دون خلط.",
      "لاحظ الحلقة البنفسجية المتكونة عند الحد الفاصل بين الطبقتين."
    ],
    positiveResult: {
      appearance: "حلقة أرجوانية/بنفسجية واضحة عند السطح الفاصل بين السائلين (Purple Ring at Junction)",
      colorHex: "#6b21a8",
      explanation: "تكاثف مركب الفورفورال مع ألفا-نافثول بفعل نزع الماء بواسطة حمض الكبريتيك المركز.",
      samplePositiveList: ["Glucose", "Fructose", "Sucrose", "Lactose", "Starch", "Glycogen"]
    },
    negativeResult: {
      appearance: "عدم ظهور أي حلقة بنفسجية عند الحد الفاصل (No Ring)",
      colorHex: "#f8fafc",
      explanation: "المركبات غير الكربوهيدراتية لا تنتج مشتقات الفورفورال.",
      sampleNegativeList: ["Pure Proteins (Albumin)", "Lipids", "Amino Acids", "Water"]
    },
    interpretation: "اختبار إيجابي سريع وحساس يثبت أن المركب كربوهيدراتي.",
    clinicalSignificance: "الخطوة الأولى في التحليل النوعي للمركبات العضوية في المعامل الطبية لتصنيف العينات البيوكيميائية المجهولة.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80",
    testTubeState: {
      positiveColor: "#6b21a8",
      negativeColor: "#e2e8f0",
      hasRing: true,
      ringColor: "#6b21a8"
    }
  },
  {
    id: 'test_barfoed',
    testNumber: 7,
    testNameEnglish: "Barfoed's Test",
    titleArabic: "اختبار بارفود للسكريات الأحادية (Barfoed's Test)",
    category: 'carbohydrates',
    objective: "التمييز السريع بين السكريات الأحادية المختزلة والسكريات الثنائية المختزلة.",
    principle: "Cupric acetate in a weakly acidic medium (dilute acetic acid) is reduced rapidly (within 2-3 minutes) by monosaccharides to red cuprous oxide, while disaccharides react much more slowly or require prolonged boiling.",
    reagents: [
      "Barfoed's Reagent (Copper acetate in 1% dilute acetic acid)"
    ],
    procedure: [
      "ضع 2 مل من كاشف بارفود في أنبوبة اختبار.",
      "أضف 1 مل من محلول السكر.",
      "ضع الأنبوبة في حمام مائي يغلي تماماً لمدة 3 دقائق بدقة، ثم ارفعها ولاحظ قاع الأنبوبة."
    ],
    positiveResult: {
      appearance: "راسب أحمر خفيف في قاع وجدار الأنبوبة خلال 2 - 3 دقائق (Scanty Red Precipitate)",
      colorHex: "#b91c1c",
      explanation: "السكريات الأحادية تختزل النحاس في الوسط الحمضي الضعيف بسرعة فائقة.",
      samplePositiveList: ["Glucose", "Fructose", "Galactose", "Xylose"]
    },
    negativeResult: {
      appearance: "لا يتكون راسب أحمر خلال أول 3 دقائق من التسخين",
      colorHex: "#3b82f6",
      explanation: "السكريات الثنائية تحتاج لوقت أطول للتفاعل بعد حدوث تحلل حمضي جزئي.",
      sampleNegativeList: ["Maltose (سلبي في 3 دقائق)", "Lactose (سلبي في 3 دقائق)", "Sucrose"]
    },
    interpretation: "ظهور الراسب الأحمر في أقل من 3 دقائق = سكر أحادي (Monosaccharide). عدم ظهوره إلا بعد 8-10 دقائق = سكر ثنائي (Disaccharide).",
    clinicalSignificance: "التفريق الدقيق بين السكريات الأحادية والثنائية في حالات اضطرابات هضم وامتصاص الكربوهيدرات والتعرف على سكريات البول المعقدة.",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
    testTubeState: {
      positiveColor: "#b91c1c",
      negativeColor: "#3b82f6",
      hasPrecipitate: true
    }
  },
  {
    id: 'test_seliwanoff',
    testNumber: 8,
    testNameEnglish: "Seliwanoff's Test",
    titleArabic: "اختبار سيلفانوف للسكريات الكيتونية (Seliwanoff's Test)",
    category: 'carbohydrates',
    objective: "التمييز بين السكريات السداسية الكيتونية (Ketohexoses) والألدهيدية (Aldohexoses).",
    principle: "Ketohexoses (like fructose) undergo rapid dehydration when treated with resorcinol in dilute hydrochloric acid to form 5-hydroxymethylfurfural, which condenses with resorcinol to give a deep cherry-red complex within 60 seconds.",
    reagents: [
      "Seliwanoff's Reagent (0.05% Resorcinol in 3M Hydrochloric Acid HCl)"
    ],
    procedure: [
      "ضع 2 مل من كاشف سيلفانوف في أنبوبة اختبار.",
      "أضف بضع قطرات (0.5 مل) من محلول العينة.",
      "اغمر الأنبوبة في حمام مائي مغلي لمدة دقيقة واحدة ولاحظ التغير اللوني السريع."
    ],
    positiveResult: {
      appearance: "لون أحمر كرزي زاهٍ وسريع خلال دقيقة واحدة (Cherry-Red Color)",
      colorHex: "#be123c",
      explanation: "السكريات الكيتونية تتجفف بسرعة فائقة مقارنة بالسكريات الألدهيدية.",
      samplePositiveList: ["Fructose (سكر الفاكهة)", "Sucrose (لاحتوائه على فركتوز)", "Inulin"]
    },
    negativeResult: {
      appearance: "عديم اللون أو وردي شاحب جداً بعد وقت طويل",
      colorHex: "#fed7aa",
      explanation: "السكريات الألدهيدية تتفاعل ببطء شديد وتحتاج لوقت طويل من الغليان.",
      sampleNegativeList: ["Glucose (جلوكوز)", "Galactose", "Mannose"]
    },
    interpretation: "ظهور اللون الأحمر الكرزي في غضون 60 ثانية دليل قاطع على وجود الفركتوز أو سكر كيتوني.",
    clinicalSignificance: "تشخيص متلازمة عدم تحمل الفركتوز الوراثية (Hereditary Fructose Intolerance) وداء بيلة الفركتوز الأساسية (Essential Fructosuria).",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80",
    testTubeState: {
      positiveColor: "#be123c",
      negativeColor: "#ffedd5",
      hasPrecipitate: false
    }
  },
  {
    id: 'test_bial',
    testNumber: 9,
    testNameEnglish: "Bial's Test (Orcinol Test)",
    titleArabic: "اختبار بيال للسكريات الخماسية (Bial's Test)",
    category: 'carbohydrates',
    objective: "الكشف الانتقائي عن السكريات الخماسية (Pentoses كالريبوز) وتمييزها عن السكريات السداسية.",
    principle: "Pentoses react with orcinol in the presence of concentrated hydrochloric acid and ferric chloride (FeCl₃) catalyst to form a distinctive blue-green condensation product.",
    reagents: [
      "Bial's Orcinol Reagent (Orcinol dissolved in conc. HCl containing 10% Ferric chloride FeCl₃)"
    ],
    procedure: [
      "ضع 2 مل من كاشف بيال في أنبوبة اختبار.",
      "أضف 1 مل من محلول العينة.",
      "سخن برفق فوق اللهب أو في حمام مائي يغلي حتى يبدأ الغليان ثم اتركها تبرد."
    ],
    positiveResult: {
      appearance: "لون أزرق مخضر مميز (Blue-Green Complex)",
      colorHex: "#0d9488",
      explanation: "تكون مركب ملون ناتج عن تكاثف الفورفورال المنزوع من السكر الخماسي مع الأورسينول في وجود الحديديك.",
      samplePositiveList: ["Ribose (سكر RNA)", "Xylose", "Arabinose", "Ribulose"]
    },
    negativeResult: {
      appearance: "لون بني أو طيني موحل (Muddy Brown / Yellow)",
      colorHex: "#78350f",
      explanation: "السكريات السداسية تعطي نواتج بنية باهتة لا تكتسب اللون الأزرق المخضر.",
      sampleNegativeList: ["Glucose", "Galactose", "Fructose", "Maltose"]
    },
    interpretation: "اللون الأزرق المخضر يؤكد وجود سكر خماسي الكربون (Pentose).",
    clinicalSignificance: "تشخيص بيلة البنتوز (Pentosuria) والتحقق من نقاوة وتكوين الأحماض النووية (RNA & DNA) في المعامل الطبية والبيولوجيا الجزيئية.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80",
    testTubeState: {
      positiveColor: "#0d9488",
      negativeColor: "#78350f",
      hasPrecipitate: false
    }
  }
];

/**
 * 30+ High-Yield Medical Practical OSPE Questions with Large Images & Precise Answers
 */
export const PRACTICAL_EXAM_QUESTIONS: ExamQuestion[] = [
  // ==================== ANATOMY LAB QUESTIONS ====================
  {
    id: 'anat_q1',
    labId: 'anatomy',
    type: 'identification',
    questionText: 'Identify the bone shown in the anatomical specimen.',
    questionTextArabic: 'تعرّف على العظمة الموضحة في الصورة التشريحية.',
    specimenCategory: 'Osteology (Lower Limb)',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Anterior View / Dry Human Specimen',
    options: ['Femur', 'Tibia', 'Fibula', 'Humerus'],
    correctAnswer: 'Femur',
    correctIndex: 0,
    explanation: 'The Femur (thigh bone) is the longest, heaviest, and strongest bone in the human body. Characterized by a spherical head, anatomical neck, greater and lesser trochanters, and distal condyles.',
    clinicalNote: 'Femoral neck fractures are common in elderly osteoporotic patients and carry a high risk of avascular necrosis of the femoral head due to disruption of retinacular vessels.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'anat_q2',
    labId: 'anatomy',
    type: 'identification',
    questionText: 'Identify the bone shown in the image.',
    questionTextArabic: 'تعرّف على العظمة الموضحة في الصورة.',
    specimenCategory: 'Osteology (Lower Limb)',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Medial Specimen View',
    options: ['Tibia', 'Fibula', 'Femur', 'Radius'],
    correctAnswer: 'Tibia',
    correctIndex: 0,
    explanation: 'The Tibia (shin bone) is the large, weight-bearing medial bone of the leg. Key features include the tibial tuberosity, anterior border (shin), and medial malleolus.',
    clinicalNote: 'The subcutaneous anteromedial surface of the tibia is vulnerable to direct trauma and open (compound) fractures.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'anat_q3',
    labId: 'anatomy',
    type: 'identification',
    questionText: 'Identify the upper limb bone shown.',
    questionTextArabic: 'تعرّف على عظمة الطرف العلوي الموضحة.',
    specimenCategory: 'Osteology (Upper Limb)',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Anterior View',
    options: ['Humerus', 'Radius', 'Ulna', 'Clavicle'],
    correctAnswer: 'Humerus',
    correctIndex: 0,
    explanation: 'The Humerus is the single bone of the arm (brachium). Features include head, anatomical neck, surgical neck, greater & lesser tubercles, intertubercular sulcus, and distal capitulum & trochlea.',
    clinicalNote: 'Fracture of the surgical neck can injure the axillary nerve; mid-shaft fractures risk injuring the radial nerve in the spiral groove.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'anat_q4',
    labId: 'anatomy',
    type: 'identification',
    questionText: 'Identify the triangular flat bone of the shoulder girdle shown.',
    questionTextArabic: 'تعرّف على العظمة المسطحة الموضحة في حزام الكتف.',
    specimenCategory: 'Osteology (Pectoral Girdle)',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Posterior View',
    options: ['Scapula', 'Clavicle', 'Sternum', 'Rib'],
    correctAnswer: 'Scapula',
    correctIndex: 0,
    explanation: 'The Scapula (shoulder blade) is a triangular flat bone located posterolaterally on the thoracic cage over ribs 2 to 7. Prominent landmarks include the spine, acromion, coracoid process, and glenoid cavity.',
    clinicalNote: 'The shallow glenoid cavity provides high shoulder joint mobility at the expense of intrinsic bony stability, predisposing to anterior shoulder dislocation.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'anat_q5',
    labId: 'anatomy',
    type: 'mcq',
    questionText: 'Identify the prominent anterior arm muscle shown in the dissection specimen.',
    questionTextArabic: 'ما هي العضلة البارزة في الجزء الأمامي للذراع الموضحة في العينة؟',
    specimenCategory: 'Myology (Arm Dissection)',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Gross Dissection Model',
    options: ['Biceps brachii', 'Triceps brachii', 'Brachioradialis', 'Coracobrachialis'],
    correctAnswer: 'Biceps brachii',
    correctIndex: 0,
    explanation: 'Biceps brachii has two heads (long head from supraglenoid tubercle, short head from coracoid process) inserting into the radial tuberosity. Primary actions: powerful forearm supinator and elbow flexor.',
    clinicalNote: 'Innervated by the musculocutaneous nerve (C5, C6). Testing the biceps tendon reflex evaluates the C5-C6 spinal cord segments.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'anat_q6',
    labId: 'anatomy',
    type: 'mcq',
    questionText: 'Identify the shoulder muscle responsible for arm abduction from 15° to 90°.',
    questionTextArabic: 'تعرّف على عضلة الكتف المسؤولة عن تبعيد الذراع من 15 إلى 90 درجة.',
    specimenCategory: 'Myology (Shoulder)',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Lateral Shoulder Specimen',
    options: ['Deltoid', 'Supraspinatus', 'Infraspinatus', 'Teres major'],
    correctAnswer: 'Deltoid',
    correctIndex: 0,
    explanation: 'The Deltoid muscle (multipennate middle fibers) abducts the arm from 15° up to 90°. Supraspinatus initiates abduction (0°-15°), and serratus anterior + trapezius assist beyond 90°.',
    clinicalNote: 'Deltoid is supplied by the Axillary nerve (C5, C6), which circles the surgical neck of the humerus.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'anat_q7',
    labId: 'anatomy',
    type: 'practical_interpretation',
    questionText: 'Identify the joint movement demonstrated in the anatomical illustration.',
    questionTextArabic: 'حدّد الحركة المفصلية الموضحة في الرسم التوضيحي.',
    specimenCategory: 'Arthrology & Kinesiology',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Sagittal Plane Movement',
    options: ['Flexion', 'Extension', 'Abduction', 'Adduction'],
    correctAnswer: 'Flexion',
    correctIndex: 0,
    explanation: 'Flexion decreases the angle between articulating bones, typically moving a body part anteriorly in the sagittal plane (except at the knee joint, which moves posteriorly).',
    clinicalNote: 'Assessing range of motion (ROM) in flexion/extension is a cornerstone of neurological and orthopedic physical examination.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'anat_q8',
    labId: 'anatomy',
    type: 'identification',
    questionText: 'Identify the facial bone that forms the lower jaw and houses the lower teeth.',
    questionTextArabic: 'تعرّف على عظمة الوجه التي تشكل الفك السفلي وتحتوي الأسنان السفلية.',
    specimenCategory: 'Osteology (Skull)',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Anterior-Inferior Skull View',
    options: ['Mandible', 'Maxilla', 'Zygomatic', 'Sphenoid'],
    correctAnswer: 'Mandible',
    correctIndex: 0,
    explanation: 'The Mandible is the largest and strongest bone of the face, consisting of a horizontal body and two vertical rami. It articulates with the temporal bone at the TMJ.',
    clinicalNote: 'The mental foramen transmits the mental nerve and vessels, a key landmark for local dental anesthesia.',
    timeSeconds: 30,
    marks: 1
  },

  // ==================== HISTOLOGY LAB QUESTIONS ====================
  {
    id: 'hist_q1',
    labId: 'histology',
    type: 'identification',
    questionText: 'Identify the epithelial tissue lining shown in this high-power photomicrograph.',
    questionTextArabic: 'تعرّف على نوع النسيج الطلائي الموضح في هذه الشريحة المجهرية.',
    specimenCategory: 'Epithelial Tissue',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: '400x H&E Stain / Bowman\'s Capsule & Vascular Endothelium',
    options: [
      'Simple squamous epithelium',
      'Simple cuboidal epithelium',
      'Simple columnar epithelium',
      'Stratified squamous epithelium'
    ],
    correctAnswer: 'Simple squamous epithelium',
    correctIndex: 0,
    explanation: 'Simple squamous epithelium consists of a single layer of flattened, scale-like cells with flat disc-shaped central nuclei. Adapted for passive diffusion, filtration, and minimal friction.',
    clinicalNote: 'Found in the parietal layer of Bowman\'s capsule in the kidney, lung alveoli (type I pneumocytes), and lining of blood vessels (endothelium).',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'hist_q2',
    labId: 'histology',
    type: 'identification',
    questionText: 'Identify the epithelial tissue lining the renal collecting tubules and thyroid follicles.',
    questionTextArabic: 'تعرّف على النسيج الطلائي الذي يبطن الأنابيب الكلوية وجريبات الغدة الدرقية.',
    specimenCategory: 'Epithelial Tissue',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: '400x H&E Stain / Renal Cortex',
    options: [
      'Simple cuboidal epithelium',
      'Simple squamous epithelium',
      'Stratified columnar epithelium',
      'Pseudostratified ciliated epithelium'
    ],
    correctAnswer: 'Simple cuboidal epithelium',
    correctIndex: 0,
    explanation: 'Simple cuboidal epithelium consists of a single layer of cube-shaped cells with round, centrally positioned spherical nuclei. Functionally specialized for secretion and absorption.',
    clinicalNote: 'Forms the lining of kidney proximal/distal convoluted tubules, thyroid follicular epithelium, and germinal epithelium of the ovary.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'hist_q3',
    labId: 'histology',
    type: 'identification',
    questionText: 'Identify the single-layered tall epithelium lining the gastric and intestinal mucosa.',
    questionTextArabic: 'تعرّف على النسيج الطلائي أحادي الطبقة المبطن للغشاء المخاطي للمعدة والأمعاء.',
    specimenCategory: 'Epithelial Tissue',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: '400x H&E / Intestinal Villi with Goblet Cells',
    options: [
      'Simple columnar epithelium',
      'Simple cuboidal epithelium',
      'Transitional epithelium',
      'Stratified squamous epithelium'
    ],
    correctAnswer: 'Simple columnar epithelium',
    correctIndex: 0,
    explanation: 'Simple columnar epithelium comprises tall rectangular cells with oval nuclei located near the basal membrane. Often features apical microvilli (brush border) and interspersed mucus-secreting goblet cells.',
    clinicalNote: 'Lines the stomach, small intestine, and large intestine, playing a critical role in nutrient absorption and enzyme secretion.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'hist_q4',
    labId: 'histology',
    type: 'mcq',
    questionText: 'Identify the multi-layered protective epithelium lining the esophagus and oral cavity.',
    questionTextArabic: 'ما هو النسيج الطلائي متعدد الطبقات الحامي المبطن للمريء والتجويف الفموي؟',
    specimenCategory: 'Epithelial Tissue',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: '200x H&E / Esophageal Mucosa',
    options: [
      'Stratified squamous non-keratinized epithelium',
      'Stratified squamous keratinized epithelium',
      'Simple columnar epithelium',
      'Transitional epithelium (Urothelium)'
    ],
    correctAnswer: 'Stratified squamous non-keratinized epithelium',
    correctIndex: 0,
    explanation: 'Stratified squamous non-keratinized epithelium has multiple cellular layers where surface cells remain nucleated and viable. Provides robust protection against mechanical abrasion in moist cavities.',
    clinicalNote: 'In Gastroesophageal Reflux Disease (GERD), chronic acid exposure can trigger metaplasia to simple columnar epithelium (Barrett\'s Esophagus), a pre-malignant condition.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'hist_q5',
    labId: 'histology',
    type: 'identification',
    questionText: 'Identify the specialized connective tissue shown featuring chondrocytes in isogenous nests.',
    questionTextArabic: 'تعرّف على النسيج الضام الموضح والذي يحتوي على خلايا غضروفية في أعشاش متجانسة.',
    specimenCategory: 'Connective Tissue',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: '400x H&E / Tracheal Cartilage Ring',
    options: [
      'Hyaline cartilage',
      'Elastic cartilage',
      'Fibrocartilage',
      'Compact bone'
    ],
    correctAnswer: 'Hyaline cartilage',
    correctIndex: 0,
    explanation: 'Hyaline cartilage is characterized by a glassy, homogenous basophilic extracellular matrix rich in type II collagen and aggrecan, containing chondrocytes housed in lacunae (often in isogenous groups).',
    clinicalNote: 'Covers articular surfaces of synovial joints; lacks intrinsic blood supply, leading to poor regenerative capacity following trauma or osteoarthritis.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'hist_q6',
    labId: 'histology',
    type: 'identification',
    questionText: 'Identify the structural and functional unit of compact bone shown.',
    questionTextArabic: 'تعرّف على الوحدة التركيبية والوظيفية للعظم المصمت الموضحة في الشريحة.',
    specimenCategory: 'Specialized Connective Tissue',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: '100x Ground Bone / Haversian System',
    options: [
      'Osteon (Haversian system)',
      'Trabecula',
      'Chondron',
      'Sarcomere'
    ],
    correctAnswer: 'Osteon (Haversian system)',
    correctIndex: 0,
    explanation: 'An Osteon consists of a central Haversian canal containing neurovascular bundles surrounded by concentric lamellae of mineralized bone matrix and osteocytes within lacunae connected by canaliculi.',
    clinicalNote: 'Volkmann\'s canals run perpendicular to Haversian canals, interconnecting neurovascular supplies throughout the cortex.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'hist_q7',
    labId: 'histology',
    type: 'identification',
    questionText: 'Identify the muscle tissue type exhibiting transverse striations, peripheral multinucleation, and voluntary control.',
    questionTextArabic: 'تعرّف على نوع النسيج العضلي ذو التخطيط العرضي والأنوية الطرفية المتعددة.',
    specimenCategory: 'Muscular Tissue',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: '400x H&E Longitudinal Section',
    options: [
      'Skeletal muscle',
      'Cardiac muscle',
      'Smooth muscle',
      'Dense regular collagenous'
    ],
    correctAnswer: 'Skeletal muscle',
    correctIndex: 0,
    explanation: 'Skeletal muscle fibers are long, cylindrical, non-branching multinucleated cells with nuclei located peripherally beneath the sarcolemma. Regular A-bands and I-bands create prominent cross-striations.',
    clinicalNote: 'Duchenne Muscular Dystrophy (DMD) results from an X-linked mutation in the dystrophin gene, causing sarcolemmal fragility and progressive muscle necrosis.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'hist_q8',
    labId: 'histology',
    type: 'mcq',
    questionText: 'Identify the histological feature unique to cardiac muscle indicated by stepped junctional complexes.',
    questionTextArabic: 'ما هي الخاصية النسيجية الفريدة لعضلة القلب الموضحة بأقراص الاتصال البينية؟',
    specimenCategory: 'Muscular Tissue',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: '400x H&E / Myocardium',
    options: [
      'Intercalated discs',
      'Neuromuscular junctions',
      'Dense bodies',
      'Perineurium'
    ],
    correctAnswer: 'Intercalated discs',
    correctIndex: 0,
    explanation: 'Intercalated discs are specialized junctional complexes between adjacent cardiac myocytes containing desmosomes and fascia adherens for mechanical adhesion, and gap junctions for ionic/electrical coupling.',
    clinicalNote: 'Gap junctions in intercalated discs allow rapid syncytial propagation of cardiac action potentials, ensuring synchronized ventricular contraction.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'hist_q9',
    labId: 'histology',
    type: 'identification',
    questionText: 'Identify the prominent multi-lobed leukocyte shown in this peripheral blood smear.',
    questionTextArabic: 'تعرّف على خلية الدم البيضاء مفصصة النواة البارزة في مسحة الدم المجهرية.',
    specimenCategory: 'Blood Smear Cytology',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: '1000x Oil Immersion / Leishman-Giemsa Stain',
    options: [
      'Neutrophil',
      'Eosinophil',
      'Basophil',
      'Monocyte'
    ],
    correctAnswer: 'Neutrophil',
    correctIndex: 0,
    explanation: 'Neutrophils are the most abundant granulocytes (50-70% of circulating WBCs), characterized by a 3 to 5 lobed segmented nucleus connected by thin chromatin threads and fine pale pink/lilac cytoplasmic granules.',
    clinicalNote: 'Neutrophilia with a "left shift" (increase in immature band forms) is a classic hematological hallmark of acute bacterial infection.',
    timeSeconds: 30,
    marks: 1
  },

  // ==================== BIOCHEMISTRY LAB QUESTIONS ====================
  {
    id: 'biochem_q1',
    labId: 'biochemistry',
    type: 'practical_interpretation',
    questionText: 'A medical student added Benedict\'s reagent to a urine sample and boiled it for 3 minutes, obtaining a brick-red precipitate. Interpret the result.',
    questionTextArabic: 'قام طالب طب بإضافة كاشف بندكت إلى عينة بول وغلاها لمدة 3 دقائق فتكون راسب أحمر طوبي. فسّر النتيجة.',
    specimenCategory: 'Carbohydrate Identification',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Boiling Test Tube Reaction',
    options: [
      'Positive for reducing sugars (e.g. Glucose > 2%)',
      'Negative test indicating normal sucrose',
      'Positive for peptide bonds and proteins',
      'Positive for starch and polysaccharides'
    ],
    correctAnswer: 'Positive for reducing sugars (e.g. Glucose > 2%)',
    correctIndex: 0,
    explanation: 'A brick-red precipitate confirms a strongly positive Benedict\'s test, indicating the presence of reducing sugars (such as Glucose, Fructose, or Lactose) at a concentration ≥ 2 g/dL due to the formation of cuprous oxide (Cu₂O).',
    clinicalNote: 'In urine, this indicates Glycosuria, commonly seen when blood glucose exceeds the renal threshold (~180 mg/dL) in Diabetes Mellitus.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'biochem_q2',
    labId: 'biochemistry',
    type: 'identification',
    questionText: 'Identify the biochemical test that yields a deep blue-black color with starch but a yellow-brown color with monosaccharides.',
    questionTextArabic: 'تعرّف على الاختبار البيوكيميائي الذي يعطي لوناً أزرق داكناً مع النشا ولوناً أصفر بنياً مع السكريات الأحادية.',
    specimenCategory: 'Polysaccharide Analysis',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Colorimetric Tube Assay',
    options: [
      'Iodine Test',
      "Benedict's Test",
      "Biuret Test",
      "Barfoed's Test"
    ],
    correctAnswer: 'Iodine Test',
    correctIndex: 0,
    explanation: 'The Iodine test (using Lugol\'s iodine) specifically interacts with helical polyamylose chains in starch to form an intense blue-black inclusion complex. Disaccharides and monosaccharides cannot form this helix and remain yellow-brown.',
    clinicalNote: 'Used in physiology and biochemistry to monitor the kinetics of starch hydrolysis by salivary and pancreatic alpha-amylase.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'biochem_q3',
    labId: 'biochemistry',
    type: 'identification',
    questionText: 'Identify the biochemical test that detects peptide bonds by forming a coordination complex with Cu²⁺ ions resulting in a violet/purple color.',
    questionTextArabic: 'تعرّف على الاختبار البيوكيميائي الذي يكشف عن الروابط الببتيدية بتكوين معقد أرجواني/بنفسجي مع أيونات النحاس.',
    specimenCategory: 'Protein & Peptide Assays',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Alkaline Color Reaction',
    options: [
      'Biuret Test',
      'Ninhydrin Test',
      'Molisch Test',
      'Sudan IV Test'
    ],
    correctAnswer: 'Biuret Test',
    correctIndex: 0,
    explanation: 'The Biuret reaction requires at least two peptide bonds (-CO-NH-). In alkaline medium, cupric ions (Cu²⁺) coordinate with peptide nitrogens to produce a characteristic violet-purple coordination complex.',
    clinicalNote: 'Total serum protein measurement via the Biuret method is standard in liver function panels and nephrology assessments.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'biochem_q4',
    labId: 'biochemistry',
    type: 'mcq',
    questionText: 'Which amino acid produces a distinctive yellow color rather than Ruhemann\'s purple in the Ninhydrin test?',
    questionTextArabic: 'أي حمض أميني ينتج لوناً أصفر مميزاً بدلاً من لون رومان الأرجواني في اختبار النينهيدرين؟',
    specimenCategory: 'Amino Acid Chemistry',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Spectrophotometric Tube Evaluation',
    options: [
      'Proline',
      'Glycine',
      'Alanine',
      'Glutamic acid'
    ],
    correctAnswer: 'Proline',
    correctIndex: 0,
    explanation: 'Proline (and Hydroxyproline) possesses a secondary amino (imino) group within a pyrrolidine ring, reacting with ninhydrin to form a yellow adduct instead of the purple Ruhemann complex produced by primary α-amino acids.',
    clinicalNote: 'Hydroxyproline urinary excretion is an indicator of collagen turnover and bone resorption in metabolic bone disorders (e.g. Paget\'s disease).',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'biochem_q5',
    labId: 'biochemistry',
    type: 'identification',
    questionText: 'Identify the general carbohydrate screening test that produces a characteristic purple/violet ring at the liquid interface upon adding conc. H₂SO₄.',
    questionTextArabic: 'تعرّف على الاختبار العام للكشف عن الكربوهيدرات الذي يعطي حلقة بنفسجية عند الحد الفاصل بإضافة حمض الكبريتيك المركز.',
    specimenCategory: 'Carbohydrate Chemistry',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Two-Phase Acid Interface Ring',
    options: [
      "Molisch's Test",
      "Benedict's Test",
      "Seliwanoff's Test",
      "Biuret Test"
    ],
    correctAnswer: "Molisch's Test",
    correctIndex: 0,
    explanation: 'Molisch\'s test utilizes 5% α-naphthol and concentrated sulfuric acid. Dehydration of carbohydrates produces furfural derivatives that condense with α-naphthol at the interface, generating a vibrant purple ring.',
    clinicalNote: 'A negative Molisch test unequivocally rules out the presence of all carbohydrates (monosaccharides, disaccharides, and polysaccharides).',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'biochem_q6',
    labId: 'biochemistry',
    type: 'practical_interpretation',
    questionText: 'During Barfoed\'s test, Tube A forms a red precipitate at the bottom in 2.5 minutes, while Tube B remains blue. What is the interpretation?',
    questionTextArabic: 'أثناء اختبار بارفود، كوّنت الأنبوبة A راسباً أحمر في القاع خلال دقيقتين ونصف، بينما بقيت الأنبوبة B زرقاء. ما هو التفسير؟',
    specimenCategory: 'Monosaccharide vs Disaccharide Differentiation',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Weak Acid Reduction Assay',
    options: [
      'Tube A contains a reducing Monosaccharide (e.g. Glucose); Tube B contains a Disaccharide or non-sugar',
      'Tube A contains Starch; Tube B contains Protein',
      'Tube A contains Lipids; Tube B contains Amino acids',
      'Both tubes are contaminated and invalid'
    ],
    correctAnswer: 'Tube A contains a reducing Monosaccharide (e.g. Glucose); Tube B contains a Disaccharide or non-sugar',
    correctIndex: 0,
    explanation: 'Barfoed\'s test differentiates reducing monosaccharides from disaccharides. In a weakly acidic cupric acetate medium, monosaccharides reduce Cu²⁺ rapidly (< 3 minutes), while disaccharides reduce very slowly only after prolonged acid hydrolysis.',
    clinicalNote: 'Crucial for differential diagnosis in pediatric carbohydrate malabsorption and metabolic fructosuria/galactosuria screenings.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'biochem_q7',
    labId: 'biochemistry',
    type: 'identification',
    questionText: 'Identify the biochemical test used to rapidly detect ketohexoses (like Fructose) by developing a cherry-red color within 1 minute with resorcinol and HCl.',
    questionTextArabic: 'تعرّف على الاختبار البيوكيميائي المستخدم للكشف السريع عن السكريات الكيتونية (كالفركتوز) بلون أحمر كرزي خلال دقيقة.',
    specimenCategory: 'Ketose vs Aldose Differentiation',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Acidic Resorcinol Colorimetry',
    options: [
      "Seliwanoff's Test",
      "Bial's Test",
      "Iodine Test",
      "Sudan IV Test"
    ],
    correctAnswer: "Seliwanoff's Test",
    correctIndex: 0,
    explanation: 'Seliwanoff\'s test uses resorcinol in dilute HCl. Ketoses dehydrate much more rapidly than aldoses to form 5-hydroxymethylfurfural, condensing into an intense cherry-red pigment in under 60 seconds.',
    clinicalNote: 'Used to confirm presence of fructose in semen (fructose is secreted by seminal vesicles to nourish spermatozoa) in evaluation of male infertility and obstructive azoospermia.',
    timeSeconds: 30,
    marks: 1
  },
  {
    id: 'biochem_q8',
    labId: 'biochemistry',
    type: 'identification',
    questionText: 'Identify the test that produces a bright red floating oily layer when mixed with lipids and triglycerides.',
    questionTextArabic: 'تعرّف على الاختبار الذي ينتج طبقة زيتية حمراء طافية عند خلطه مع الدهون والدهون الثلاثية.',
    specimenCategory: 'Lipid Identification',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
    magnificationOrView: 'Phase Separation Lipid Assay',
    options: [
      'Sudan IV Test',
      'Biuret Test',
      'Benedict Test',
      'Ninhydrin Test'
    ],
    correctAnswer: 'Sudan IV Test',
    correctIndex: 0,
    explanation: 'Sudan IV is a lysochrome diazo dye soluble in non-polar hydrophobic lipids. When added to an emulsion, it selectively partitions into the upper lipid layer, staining it bright scarlet red.',
    clinicalNote: 'Fecal fat staining with Sudan IV is a rapid primary screen for Steatorrhea caused by Celiac disease, Cystic Fibrosis, or Chronic Pancreatitis.',
    timeSeconds: 30,
    marks: 1
  }
];

/**
 * Pre-Configured Medical Practical Examinations
 */
export const MEDICAL_PRACTICAL_EXAMS: MedicalExam[] = [
  {
    id: 'exam_ospe_comprehensive',
    title: 'University Integrated Medical OSPE — Practical Examination',
    titleArabic: 'الامتحان العملي الطبي الشامل المتكامل (OSPE)',
    labId: 'mixed',
    examType: 'mixed',
    description: 'Comprehensive timed medical OSCE/OSPE practical examination covering Anatomy osteology & myology, Histology epithelia & tissues, and Biochemistry diagnostic laboratory tests.',
    timeLimitMinutes: 15,
    passingScorePercent: 70,
    totalMarks: 25,
    difficulty: 'university_ospe',
    isPublished: true,
    questionIds: [
      'anat_q1', 'anat_q2', 'anat_q3', 'anat_q4', 'anat_q5', 'anat_q6', 'anat_q7',
      'hist_q1', 'hist_q2', 'hist_q3', 'hist_q4', 'hist_q5', 'hist_q6', 'hist_q7', 'hist_q9',
      'biochem_q1', 'biochem_q2', 'biochem_q3', 'biochem_q4', 'biochem_q5', 'biochem_q6', 'biochem_q7', 'biochem_q8'
    ],
    createdAt: '2026-08-30',
    authorName: 'Medical Academic Examination Board'
  },
  {
    id: 'exam_anat_ospe',
    title: 'Anatomy Lab Practical Identification Exam',
    titleArabic: 'اختبار التعرف العملي — معمل التشريح (Anatomy Lab)',
    labId: 'anatomy',
    examType: 'identification',
    description: 'Timed practical station exam on major bones (Femur, Tibia, Humerus, Scapula), muscle dissections, and joint kinesiology.',
    timeLimitMinutes: 8,
    passingScorePercent: 75,
    totalMarks: 8,
    difficulty: 'intermediate',
    isPublished: true,
    questionIds: ['anat_q1', 'anat_q2', 'anat_q3', 'anat_q4', 'anat_q5', 'anat_q6', 'anat_q7', 'anat_q8'],
    createdAt: '2026-08-28',
    authorName: 'Department of Anatomy'
  },
  {
    id: 'exam_hist_ospe',
    title: 'Histology Microscopic Slide Identification Exam',
    titleArabic: 'اختبار الشرائح المجهرية — معمل الأنسجة (Histology Lab)',
    labId: 'histology',
    examType: 'image_recognition',
    description: 'High-power photomicrograph identification of basic epithelia, cartilage, compact bone, muscle types, and blood cytology.',
    timeLimitMinutes: 8,
    passingScorePercent: 70,
    totalMarks: 9,
    difficulty: 'intermediate',
    isPublished: true,
    questionIds: ['hist_q1', 'hist_q2', 'hist_q3', 'hist_q4', 'hist_q5', 'hist_q6', 'hist_q7', 'hist_q8', 'hist_q9'],
    createdAt: '2026-08-28',
    authorName: 'Department of Histology'
  },
  {
    id: 'exam_biochem_ospe',
    title: 'Biochemistry Practical Laboratory Tests & Interpretation',
    titleArabic: 'اختبار التفاعلات والتفسير البيوكيميائي — معمل الكيمياء الحيوية',
    labId: 'biochemistry',
    examType: 'practical_interpretation',
    description: 'Identification of biochemical test tubes, reaction mechanisms (Benedict, Iodine, Biuret, Ninhydrin, Molisch, Barfoed, Seliwanoff, Sudan), and clinical interpretations.',
    timeLimitMinutes: 8,
    passingScorePercent: 75,
    totalMarks: 8,
    difficulty: 'intermediate',
    isPublished: true,
    questionIds: ['biochem_q1', 'biochem_q2', 'biochem_q3', 'biochem_q4', 'biochem_q5', 'biochem_q6', 'biochem_q7', 'biochem_q8'],
    createdAt: '2026-08-29',
    authorName: 'Department of Medical Biochemistry'
  }
];
