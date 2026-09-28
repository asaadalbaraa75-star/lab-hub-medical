export interface HistologyTheoryBlock {
  section: 'theory';
  title: string;
  content: string;
  histology_notes: string;
  key_terms: string[];
}

export interface HistologyQuizBlock {
  section: 'practical_quiz';
  image_tag: string;
  stain_and_mag: string;
  question: string;
  options: string[];
  correct_answer: string;
}

export interface HistologyVideoBlock {
  section: 'media_video';
  original_url: string;
  fixed_embed_url: string;
  title?: string;
  description?: string;
}

export type HistologyContentBlock = HistologyTheoryBlock | HistologyQuizBlock | HistologyVideoBlock;

export interface HistologyChapterData {
  course: 'Histology';
  chapter: string;
  chapterNumber: number;
  descriptionAr: string;
  content_blocks: HistologyContentBlock[];
}

export const HISTOLOGY_DATABASE: HistologyChapterData[] = [
  {
    course: 'Histology',
    chapter: 'الفصل الأول: مقدمة في علم الأنسجة والتقنيات المجهرية (Introduction & Histological Techniques)',
    chapterNumber: 1,
    descriptionAr: 'أسس المجهر الضوئي والإلكتروني، مراحل تحضير الشرائح النسيجية، وصبغات علم الأنسجة الأساسية (H&E, PAS, Silver).',
    content_blocks: [
      {
        section: 'theory',
        title: 'مراحل تحضير الشريحة النسيجية وتقنيات الصباغة (Tissue Processing & Staining)',
        content: 'علم الأنسجة (Histology) هو الدراسة المجهرية لتراكيب خلايا وأنسجة الجسم السليمة. للحصول على شريحة مجهرية قابلة للفحص، تمر العينة النسيجية بعدة خطوات متسلسلة: أخذ الخزعة (Biopsy)، ثم التثبيت (Fixation) باستخدام الفورمالين (10% Formalin) لمنع التحلل الذاتي وحفظ التركيب الخلوي، ثم نزع الماء (Dehydration) بسلسلة كحول متصاعدة، فالترويق (Clearing) بواسطة الزايلين (Xylene)، ثم التضمين (Infiltration & Embedding) في شمع البارافين (Paraffin Wax). بعد التصلب تُقطع القوالب بميكروتوم (Microtome) بسماكة 4–6 ميكرومتر، وتوضع على شرائح زجاجية لتخضع للصبغ وفحصها.',
        histology_notes: 'الصبغة الروتينية الأكثر استخداماً هي الهيماتوكسيلين والإيوسين (H&E Stain). الهيماتوكسيلين (Hematoxylin) صبغة قاعدية (Basic dye) ترتبط بالتراكيب الحامضية مثل الأحماض النووية (DNA/RNA) في النواة وتصبغها باللون الأزرق أو البنفسجي (Basophilic). بينما الإيوسين (Eosin) صبغة حامضية (Acidic dye) ترتبط بالبروتينات السيتوبلازمية وتصبغ السيتوبلازم وألياف الكولاجين باللون الوردي/الأحمر (Acidophilic/Eosinophilic).',
        key_terms: ['Fixation (التثبيت)', 'Formalin (فورمالين)', 'Paraffin Embedding (تضمين البارافين)', 'Microtome (الميكروتوم)', 'Hematoxylin (هيماتوكسيلين)', 'Eosin (إيوسين)', 'Basophilic (شغوف بالقواعد)', 'Acidophilic (شغوف بالأحماض)']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-1: فحص صبغة H&E تحت المجهر الضوئي]',
        stain_and_mag: 'H&E Stain | 400x High Power Field',
        question: 'عند فحص شريحة مصبوغة بـ H&E، لوحظ تلوّن النواة باللون الأزرق الداكن / البنفسجي وتلوّن السيتوبلازم باللون الوردي. ما سبب تلوّن النواة بهذا اللون تحديداً؟',
        options: [
          'A. ارتباط صبغة الإيوسين الحامضية بالبروتينات الغشائية',
          'B. ارتباط الهيماتوكسيلين القاعدي بمجموعات الفوسفات الحامضية في الأحماض النووية (DNA/RNA)',
          'C. ترسب شمع البارافين حول الحبيبات النووية',
          'D. تكسر الغشاء النووي أثناء التثبيت بالفورمالين'
        ],
        correct_answer: 'الإجابة الصحيحة هي (B): الهيماتوكسيلين صبغة قاعدية (Basic dye) تحمل شحنة موجبة، وتنجذب بشدة للأحماض النووية الغنية بمجموعات الفوسفات سالبة الشحنة في النواة (DNA & RNA)، مما يعطي التلوّن القاعدي الأزرق (Basophilia).'
      },
      {
        section: 'media_video',
        original_url: 'https://www.youtube.com/watch?v=Jm21Z3H_i3k',
        fixed_embed_url: 'https://www.youtube-nocookie.com/embed/Jm21Z3H_i3k',
        title: 'خطوات إعداد وفحص الشرائح المجهرية (Histology Lab Preparation)',
        description: 'شرح عملي تطبيقي لمراحل التثبيت، التقطيع بالميكروتوم، وخطوات صبغ H&E داخل المعمل الطبي.'
      }
    ]
  },
  {
    course: 'Histology',
    chapter: 'الفصل الثاني: النسيج الطلائي البسيط والمركب (Epithelial Tissue: Simple & Stratified)',
    chapterNumber: 2,
    descriptionAr: 'تصنيف الأنسجة الطلائية حسب عدد الطبقات وشكل الخلايا السطحية، والخصائص المجهرية للغشاء القاعدي والتخصصات السطحية (Microvilli & Cilia).',
    content_blocks: [
      {
        section: 'theory',
        title: 'النسيج الطلائي البسيط والمتطبق (Classification of Epithelium)',
        content: 'النسيج الطلائي (Epithelial Tissue) يتكون من خلايا متراصة بكثافة مع كمية ضئيلة جداً من المادة بين الخلوية (Intercellular matrix)، وتستند دائماً على غشاء قاعدي (Basement Membrane). النسيج الطلائي خالي من الأوعية الدموية (Avascular) ويتغذى بالانتشار من النسيج الضام الكامن تحته. يصنف الطلائي حسب عدد الطبقات إلى بسيط (Simple: طبقة واحدة من الخلايا تستند على الغشاء القاعدي) ومطبق (Stratified: طبقتان أو أكثر، ويسمى بناءً على شكل خلايا الطبقة السطحية فقط).',
        histology_notes: '1. الطلائي الحرشفي البسيط (Simple Squamous): خلايا مسطحة نواتها مسطحة وممتدة أفقياً (كما في بطانة الأوعية الدموية Endothelium وأكياس الحويصلات الهوائية في الرئة).\n2. الطلائي المكعبي البسيط (Simple Cuboidal): خلايا مربعة بنواة مركزية كروية (أنابيب الكلى وحويصلات الغدة الدرقية).\n3. الطلائي العمودي البسيط (Simple Columnar): خلايا مستطيلة بنواة بيضاوية تقع قرب القاعدة (بطانة المعدة والأمعاء الدقيقة مع Microvilli وخلايا كاسية Goblet cells).\n4. المطبق الكاذب (Pseudostratified Columnar): جميع الخلايا تلامس الغشاء القاعدي ولكن ليست كلها تصل للسطح وتتوزع الأنوية بمستويات مختلفة (الجهاز التنفسي مع Cilia).',
        key_terms: ['Basement Membrane (الغشاء القاعدي)', 'Simple Squamous (حرشفي بسيط)', 'Simple Cuboidal (مكعبي بسيط)', 'Simple Columnar (عمودي بسيط)', 'Pseudostratified (مطبق كاذب)', 'Goblet Cells (الخلايا الكاسية)', 'Microvilli (الخملات الدقيقة)', 'Cilia (الأهداب)']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-2: قطاع عرضي في القصبة الهوائية Trachea]',
        stain_and_mag: 'H&E Stain | 400x Magnification',
        question: 'في فحص مجهري لبطانة المجاري التنفسية، ظهرت الأنوية على مستويات وارتفاعات مختلفة، مع وجود أهداب سطحية (Cilia) وخلايا كاسية (Goblet cells) تفرز المخاط. ما نوع هذا النسيج الطلائي؟',
        options: [
          'A. Stratified Squamous Keratinized Epithelium',
          'B. Pseudostratified Ciliated Columnar Epithelium with Goblet Cells',
          'C. Simple Cuboidal Epithelium with Brush Border',
          'D. Transitional Epithelium (Urothelium)'
        ],
        correct_answer: 'الإجابة الصحيحة هي (B): نسيج طلائي عمودي مطبق كاذب مهدب مع خلايا كاسية (Pseudostratified Ciliated Columnar Epithelium). المظهر يوحي بتعدد الطبقات بسبب اختلاف مواقع الأنوية، إلا أن جميع الخلايا ترتكز على الغشاء القاعدي، وتتميز بوجود الأهداب لدفع المخاط.'
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-3: قطاع في المثانة البولية Urinary Bladder]',
        stain_and_mag: 'H&E Stain | 200x Magnification',
        question: 'ما هي الخاصية المجهرية المميزة لخلايا الطبقة السطحية في النسيج الطلائي البولي الانتقالي (Transitional Epithelium / Urothelium)؟',
        options: [
          'A. خلايا مسطحة خالية من الأنوية ومملوءة بطبقة كيراتين سميكة',
          'B. خلايا عمودية طويلة مهدبة',
          'C. خلايا قُبية كبيرة تشبه المظلة (Dome-shaped / Umbrella cells) ذات أنوية مدورة أو ثنائية النواة',
          'D. خلايا حرشفية مفلطحة ذات زوائد شجيرية'
        ],
        correct_answer: 'الإجابة الصحيحة هي (C): النسيج الانتقالي (Transitional) يتميز بخلايا سطحية مقببة أو مظلية (Umbrella cells) تتمدد وتتسطح عند امتلاء المثانة وتستدير عند تفريغها، وكثيراً ما تحوي نواتين.'
      },
      {
        section: 'media_video',
        original_url: 'https://www.youtube.com/watch?v=kYJvO3PjWb0',
        fixed_embed_url: 'https://www.youtube-nocookie.com/embed/kYJvO3PjWb0',
        title: 'شرح النسيج الطلائي العملي للطب البشري (Epithelial Tissue Lab Practical)',
        description: 'استعراض مجهري كامل للشرائح المعتمدة: Simple vs Stratified وتطبيقاتها السريرية.'
      }
    ]
  },
  {
    course: 'Histology',
    chapter: 'الفصل الثالث: النسيج الضام الأصيل والغضاريف والعظام (Connective Tissue, Cartilage & Bone)',
    chapterNumber: 3,
    descriptionAr: 'الألياف النسيجية (كولاجين، إيلاستين، شبكية)، الخلايا الثابتة والمتحركة، ونماذج الغضاريف (زجاجي، مرن، ليفي) والعظم المكتنز والإسفنجي.',
    content_blocks: [
      {
        section: 'theory',
        title: 'مكونات النسيج الضام والأنواع المتخصصة (Connective Tissue Proper & Skeletal Tissues)',
        content: 'يتكون النسيج الضام (Connective Tissue) من ثلاثة عناصر رئيسية: الخلايا (مثل Fibroblasts, Macrophages, Mast cells, Adipocytes)، والألياف النسيجية (Collagen Fibers, Elastic Fibers, Reticular Fibers)، والمادة الأساسية غير المشكلة (Ground Substance). يتميز النسيج الضام عن الطلائي بغزارة المادة بين الخلوية (Extracellular Matrix - ECM). في الغضروف (Cartilage) تكون المادة متماسكة ومطاطية وتعيش الخلايا الغضروفية (Chondrocytes) في تجاويف تدعى الفجوات (Lacunae). أما في العظم (Bone) فتكون المادة الخلوية متكلسة بأملاح هيدروكسي أباتيت (Hydroxyapatite crystals) وتشكل أجهزة هافرس (Haversian Systems / Osteons).',
        histology_notes: '1. الغضروف الزجاجي (Hyaline Cartilage): مادة أرضية زجاجية متجانسة كولاجين Type II غير ظاهر، تحاط بالغشاء الغضروفي (Perichondrium).\n2. الغضروف المرن (Elastic Cartilage): شبكة كثيفة من ألياف الإيلاستين (تصبغ بـ Orcein/Verhoeff) كما في صوان الأذن ولسان المزمار (Epiglottis).\n3. الغضروف الليفي (Fibrocartilage): حزم سميكة من كولاجين Type I موازية لصفوف الخلايا الغضروفية، خالي تماماً من الـ Perichondrium (الأقراص بين الفقرات Intervertebral discs).\n4. العظم المكتنز (Compact Bone): قنوات هافرس المركزية (Haversian canal) محاطة بصفائح متحدة المركز (Concentric lamellae) وخلايا عظمية (Osteocytes) تتصل بواسطة القنيات (Canaliculi).',
        key_terms: ['Extracellular Matrix (المادة بين الخلوية)', 'Fibroblast (الأرومة الليفية)', 'Chondrocytes (خلايا غضروفية)', 'Lacunae (الفجوات)', 'Hyaline Cartilage (الغضروف الزجاجي)', 'Elastic Cartilage (الغضروف المرن)', 'Fibrocartilage (الغضروف الليفي)', 'Haversian System / Osteon (جهاز هافرس)']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-4: شريحة العظم المكتنز المجلخ Ground Compact Bone]',
        stain_and_mag: 'Unstained Ground Section | 100x Magnification',
        question: 'في فحص مقطع عرضي لعظم جاف مجلخ، ظهرت وحدة أسطوانية تسمى جهاز هافرس (Osteon). ما هو التركيب الموجود في مركز هذا الجهاز تماماً والذي يحتوي على الأوعية الدموية والأعصاب؟',
        options: [
          'A. Volkmann Canal (قناة فولكمان)',
          'B. Haversian Canal (قناة هافرس المركزية)',
          'C. Canaliculi (القنيات الدقيقة)',
          'D. Medullary Cavity (التجويف النقيي)'
        ],
        correct_answer: 'الإجابة الصحيحة هي (B): قناة هافرس المركزية (Central / Haversian Canal) تمر طولياً في مركز كل جهاز هافرس وتحتوي على الأوعية الدموية المغذية، والأوعية اللمفاوية والألياف العصبية.'
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-5: شريحة غضروف زجاجي Hyaline Cartilage في القصبة الهوائية]',
        stain_and_mag: 'H&E Stain | 200x Magnification',
        question: 'تتوضع الخلايا الغضروفية (Chondrocytes) البالغة داخل تجاويف صغيرة معزولة داخل المادة الأساسية الزجاجية. ماذا تسمى هذه التجاويف؟',
        options: [
          'A. Lacunae (الفجوات)',
          'B. Canaliculi (القنيات)',
          'C. Sinusoids (أشباه الجيوب)',
          'D. Crypts (المخابئ النسيجية)'
        ],
        correct_answer: 'الإجابة الصحيحة هي (A): الفجوات (Lacunae) هي التجويف المجهري الصغير في المادة بين الخلوية التي تقبع بداخلها الخلية الغضروفية المفردة أو المجموعة المتآخية (Isogenous group).'
      },
      {
        section: 'media_video',
        original_url: 'https://www.youtube.com/watch?v=Fqj8PzE6U9M',
        fixed_embed_url: 'https://www.youtube-nocookie.com/embed/Fqj8PzE6U9M',
        title: 'مراجعة عملية: شرائح الغضاريف والعظام (Cartilage & Bone Slides Review)',
        description: 'التفريق المباشر بين الغضروف الزجاجي، الغضروف المرن، الغضروف الليفي، وعظم هافرس.'
      }
    ]
  },
  {
    course: 'Histology',
    chapter: 'الفصل الرابع: الأنسجة العضلية والعصبية (Muscle & Nervous Tissue)',
    chapterNumber: 4,
    descriptionAr: 'المقارنة المجهرية بين العضلات الهيكلية، القلبية، والملساء؛ وتراكيب العصبونات وخلايا الغراء العصبي ومظهر العصب المحيطي.',
    content_blocks: [
      {
        section: 'theory',
        title: 'التمايز المجهري للأنسجة العضلية والعصبية (Muscle & Nerve Differentiation)',
        content: 'الأنسجة العضلية مسؤولة عن الحركة والانقباض، وتنقسم إلى: 1) العضلات الهيكلية (Skeletal Muscle): ألياف أسطوانية طويلة عديدة الأنوية المحيطية (Peripheral multinucleated) مع تخطيط عرضي واضح (Striations). 2) العضلات القلبية (Cardiac Muscle): ألياف متفرعة ذات نواة مركزية واحدة أو اثنتين، وتخطيط عرضي مع وجود أقراص بينية فريدة (Intercalated Discs) غنية بالـ Gap Junctions. 3) العضلات الملساء (Smooth Muscle): خلايا مغزلية (Fusiform) ذات نواة مركزية مستطيلة أو عصوية غير مخططة وتتحكم بها الأعصاب اللاإرادية.\n\nالنسيج العصبي يتألف من عصبونات (Neurons: جسم الخلية Soma، التغصنات Dendrites، والمحور Axon) مع خلايا داعمة تدعى خلايا الغراء العصبي (Neuroglia: Astrocytes, Oligodendrocytes, Microglia, Schwann cells). في المقاطع العرضية للعصب المحيطي تحاط الحزم العصبية بغلاف perineurium غني بألياف كولاجينية.',
        histology_notes: 'في فحص العضلات القلبية بصبغة H&E، تظهر الأقراص البينية (Intercalated discs) كخطوط عرضية داكنة قاتمة تمثل مناطق الالتقاء بين الخلايا المتجاورة وتضمن التوصيل الكهربائي المتزامن لانقباض القلب (Functional syncytium). حبيبات نسل (Nissl bodies) في أجسام العصبونات تمثل تجمعات غنية بالشبكة الإندوبلازمية الخشنة والريبوسومات وتصبغ بزرقة واضحة (Basophilic).',
        key_terms: ['Skeletal Muscle (عضلات هيكلية)', 'Cardiac Muscle (عضلات قلبية)', 'Intercalated Discs (الأقراص البينية)', 'Smooth Muscle (عضلات ملساء)', 'Neuron (العصبون)', 'Nissl Bodies (حبيبات نسل)', 'Schwann Cells (خلايا شوان)', 'Myelin Sheath (غمد الميالين)']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-6: قطاع طولي في عضلة القلب Cardiac Muscle]',
        stain_and_mag: 'Iron Hematoxylin / H&E | 400x Magnification',
        question: 'لوحظ في قطاع نسيجي عضلات ذات خلايا متفرعة ذات أنوية مركزية، وخطوط داكنة مستعرضة مميزة تفصل بين الخلايا العضلية المتجاورة. ما هو هذا التركيب التشريحي الدقيق؟',
        options: [
          'A. Z-discs في اللييف العضلي الهيكلي',
          'B. Intercalated Discs (الأقراص البينية) في العضلة القلبية',
          'C. Neuromuscular junctions',
          'D. Dense bodies في العضلات الملساء'
        ],
        correct_answer: 'الإجابة الصحيحة هي (B): الأقراص البينية (Intercalated Discs) علامة مميزة وفريدة للنسيج العضلي القلبي، وتحتوي على desmosomes للتثبيت الميكانيكي وgap junctions لنقل الشحنات الكهربائية السريعة.'
      },
      {
        section: 'media_video',
        original_url: 'https://www.youtube.com/watch?v=kYJvO3PjWb0',
        fixed_embed_url: 'https://www.youtube-nocookie.com/embed/kYJvO3PjWb0',
        title: 'التعرف على الأنسجة العضلية والعصبية بالمجهر (Histology Practical: Muscle & Nerve)',
        description: 'مقارنة الشرائح الثلاثة للعضلات مع قطاع العصب المحيطي Peripheral Nerve.'
      }
    ]
  },
  {
    course: 'Histology',
    chapter: 'الفصل الخامس: خلايا الدم المحيطي ونخاع العظم (Peripheral Blood Film & Hematopoiesis)',
    chapterNumber: 5,
    descriptionAr: 'مسحة الدم المحيطي بصبغة ليشمان (Leishman Stain)، التعرف على كريات الدم الحمر، الصفائح، وأنواع خلايا الدم البيضاء المحببة وغير المحببة.',
    content_blocks: [
      {
        section: 'theory',
        title: 'فحص مسحة الدم المحيطي (Peripheral Blood Smear Examination)',
        content: 'تُصبغ مسحات الدم بصبغات رومانووسكي مثل ليشمان (Leishman Stain) أو جيمسا (Giemsa). يتكون الدم من بلازما وعناصر مشكلة تشمل: 1) كريات الدم الحمر (Erythrocytes / RBCs): أقراص مقعرة الوجهين بقطر 7.5 ميكرومتر عديمة النواة ومملوءة بالهيموغلوبين. 2) الصفائح الدموية (Platelets): شظايا خلوية صغيرة عديمة النواة تنشأ من Megakaryocytes في نخاع العظم. 3) كريات الدم البيضاء (Leukocytes / WBCs): تنقسم إلى محببة (Granulocytes) تشمل العدلات (Neutrophils: نواة عديدة الفصوص 3–5)، الحَمِضات (Eosinophils: نواة ثنائية الفصوص وحبيبات برتقالية/حمراء كروية)، والقَعِدات (Basophils: حبيبات زرقاء داكنة خشنة تغطي النواة). وغير محببة (Agranulocytes) تشمل اللمفاويات (Lymphocytes: نواة كروية تشغل معظم الخلية) والوحيدات (Monocytes: نواة كلوية الشكل / فاصولياء وسيتوبلازم رمادي مزرق).',
        histology_notes: 'العدلات (Neutrophils) تمثل خط الدفاع الأول ضد البكتيريا وتكون النسبة الأكبر (50–70% من WBCs). الحَمِضات (Eosinophils 1–4%) تتكاثر في حالات الحساسية والعدوى الطفيلية، وتفرز Major Basic Protein من حبيباتها الإيوسينية الفاقعة.',
        key_terms: ['Leishman Stain (صبغة ليشمان)', 'Neutrophil (العدلة)', 'Eosinophil (الحَمِضة)', 'Basophil (القَعِدة)', 'Lymphocyte (الخلية اللمفاوية)', 'Monocyte (الخلية الوحيدة)', 'Platelets (الصفائح الدموية)']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-7: خلية دم بيضاء في مسحة دم ليشمان]',
        stain_and_mag: 'Leishman Stain | 1000x Oil Immersion',
        question: 'خلية دم بيضاء قطرها 12–15 ميكرومتر، تحتوي على نواة مميزة تتكون من فصين متصلين (Bilobed nucleus) وسيتوبلازم مكتظ بحبيبات خشنة متوهجة باللون البرتقالي المحمر. ما هو تشخيص هذه الخلية؟',
        options: [
          'A. Basophil (خلية قعدة)',
          'B. Eosinophil (خلية حمضة)',
          'C. Neutrophil (خلية عدلة)',
          'D. Small Lymphocyte (لمفاوية صغيرة)'
        ],
        correct_answer: 'الإجابة الصحيحة هي (B): الخلية الحَمِضة (Eosinophil) تتميز كلاسيكياً بالنواة ثنائية الفصوص الشبيهة بسماعة النظارات (Spectacle-shaped bilobed nucleus) والحبيبات السيتوبلازمية الحامضية الكبيرة المتلونة باللون الوردي البرتقالي المتوهج مع صبغة الإيوسين في ليشمان.'
      },
      {
        section: 'media_video',
        original_url: 'https://www.youtube.com/watch?v=p43qgA_yMlc',
        fixed_embed_url: 'https://www.youtube-nocookie.com/embed/p43qgA_yMlc',
        title: 'كيفية قراءة مسحة الدم والتعرف على خلايا WBC تحت المجهر (Blood Film Mastery)',
        description: 'شرح مجهري مباشر بزيت التكبير 1000x لكيفية تمييز كل خلية بيضاء بدقة امتحانية.'
      }
    ]
  }
];

/**
 * Robust URL sanitizer to guarantee valid embeddable YouTube links
 */
export function sanitizeToEmbedUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // If already an embed url
  if (trimmed.includes('/embed/')) {
    return trimmed.replace('http://', 'https://');
  }

  // Handle youtu.be/ID
  const youtuBeMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch && youtuBeMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${youtuBeMatch[1]}`;
  }

  // Handle youtube.com/watch?v=ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}`;
  }

  // Handle youtube.com/shorts/ID
  const shortsMatch = trimmed.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`;
  }

  // If standard valid URL
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    return trimmed;
  }

  return '';
}
