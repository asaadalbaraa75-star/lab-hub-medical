/**
 * Histology Standardized Curriculum JSON Dataset
 * Strictly structured according to the 1st-Year Medical Practical Curriculum
 * Faculty of Medicine, Sana'a University (Dr. Ruqia Y. Sharaf Addin).
 * 
 * Strict Sequence of Chapters:
 * 1. Introduction & Microscopes (المقدمة والمجاهر)
 * 2. Tissue Slide Preparation Workflow (تحضير الشرائح النسيجية 10 خطوات)
 * 3. Histological Stains (الصبغات النسيجية H&E والخاصة)
 * 4. Cytology & Cell Organelles (الخلية وعضيات السيتوبلازم)
 * 5. Mitosis & Cell Division (انقسام الخلية الميتوزي)
 * 6. Epithelial Tissue (النسيج الطلائي البسيط والمطبق)
 * 7. Connective Tissue Proper (النسيج الضام الأصيل)
 * 8. Cartilage & Bone (الغضاريف والعظام)
 * 9. Blood Smear & Muscle Tissues (الدم والأنسجة العضلية)
 */

export interface TheoryBlock {
  section: 'theory';
  title: string;
  content: string;
  histology_notes: string;
  key_terms: string[];
}

export interface PracticalQuizBlock {
  section: 'practical_quiz';
  image_tag: string;
  visual_id: string;
  stain_and_mag: string;
  question: string;
  options: string[];
  correct_answer: string;
  tissue_name: string;
  microscopic_details: string;
}

export interface MediaVideoBlock {
  section: 'media_video';
  title?: string;
  original_url: string;
  fixed_embed_url: string;
}

export type ContentBlock = TheoryBlock | PracticalQuizBlock | MediaVideoBlock;

export interface HistologyChapterData {
  course: 'Histology';
  chapter: string;
  chapter_ar: string;
  content_blocks: ContentBlock[];
}

// Convert standard YouTube URLs to valid iframe embed URLs
export function convertToEmbedUrl(url: string): string {
  if (!url) return '';
  if (url.includes('/embed/')) return url;
  
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  return url;
}

export const HISTOLOGY_CURRICULUM_CHAPTERS: HistologyChapterData[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. INTRODUCTION & MICROSCOPES (المقدمة والمجاهر)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    course: 'Histology',
    chapter: '01. Introduction & Microscopes (المقدمة والمجاهر)',
    chapter_ar: 'تعريف علم الأنسجة والمجهر الضوئي والإلكتروني',
    content_blocks: [
      {
        section: 'theory',
        title: 'Definition of Histology & Microscope Systems',
        content:
          'علم الأنسجة (Histology) مشتق من الكلمتين الإغريقيتين: Histos وتعني شبكة أو نسيج، و Logos وتعني دراسة أو علم. وهو علم دراسة التركيب المجهري الدقيق للخلايا والأنسجة والأعضاء السليمة في جسم الإنسان. ينقسم جسم الإنسان إلى 4 أنسجة أساسية: 1. النسيج الطلائي (Epithelial Tissue)، 2. النسيج الضام (Connective Tissue)، 3. النسيج العضلي (Muscular Tissue)، 4. النسيج العصبي (Nervous Tissue). المجهر الضوئي المركب (Compound Light Microscope) هو الأداة الأساسية لدراسة الأنسجة ويعتمد على نظامين من العدسات: العدسات العينية (Ocular lens 10x) والعدسات الشيئية (Objective lenses: 4x, 10x, 40x, 100x Oil).',
        histology_notes:
          'قاعدة مخبرية صارمة: الضابط التقريبي (Coarse adjustment knob) يُستخدم حصراً مع قوة التكبير الصغرى (10x)، ويُمنع استخدامه منعاً باتاً مع القوة الكبرى (40x) أو عدسة الزيت (100x) لتجنب كسر الشريحة الزجاجية أو خدش العدسة الشيئية.',
        key_terms: [
          'Histology',
          'Four Basic Tissues',
          'Compound Light Microscope',
          'Objective Lenses',
          'Coarse & Fine Adjustments',
          'Condenser & Iris Diaphragm'
        ]
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-1: أجزاء المجهر الضوئي المركب - Compound Microscope Parts]',
        visual_id: 'microscope_parts',
        stain_and_mag: 'جهاز بصري مركب — عدسة عينية 10x وعدسات شيئية متعددة',
        tissue_name: 'Compound Light Optical Microscope',
        microscopic_details: 'يتكون من قاعدة وثقل، مصدر إضاءة، مكثف ضوئي وحجاب قزحي، منضدة ميكانيكية بحوامل للشريحة، قرص أنفي دوار يحمل 4 عدسات شيئية، وضابطين تقريبي ودقيق.',
        question: 'ما هي العدسة الشيئية الوحيدة التي يُسمح معها باستخدام الضابط التقريبي (Coarse Adjustment Knob) عند فحص الشريحة؟',
        options: [
          'Low power objective (10x)',
          'High power objective (40x)',
          'Oil immersion objective (100x)',
          'Any objective lens'
        ],
        correct_answer: 'Low power objective (10x) — العدسة الشيئية الصغرى: يُستخدم الضابط التقريبي معها فقط لتجنب اصطدام العدسة بالشريحة الزجاجية وكسرها.'
      },
      {
        section: 'media_video',
        title: 'شرح أجزاء واستخدام المجهر الضوئي المركب في مختبر الهيستولوجي',
        original_url: 'https://www.youtube.com/watch?v=RaxvcJgQJ_A',
        fixed_embed_url: 'https://www.youtube.com/embed/RaxvcJgQJ_A'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. TISSUE SLIDE PREPARATION WORKFLOW (تحضير الشرائح)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    course: 'Histology',
    chapter: '02. Tissue Slide Preparation (تحضير الشرائح النسيجية)',
    chapter_ar: 'الخطوات المتسلسلة لإعداد المقاطع النسيجية بالبرافين',
    content_blocks: [
      {
        section: 'theory',
        title: 'Paraffin Section Preparation: The 10-Step Protocol',
        content:
          'يتطلب إعداد الشريحة النسيجية الدائمة من العينة الجراحية الحية تسلسلاً كيميائياً وفيزيائياً صارماً: 1. التثبيت (Fixation): باستخدام محلول الفورمالين الملحي المنظم 10% (10% Neutral Buffered Formalin) لمنع التحلل الذاتي والتفسخ، 2. نزع الماء (Dehydration): بسلسلة كحول متصاعدة (70% → 80% → 90% → 95% → 100%)، 3. الترويق (Clearing): باستخدام الزايلين (Xylene) لإزالة الكحول وجعل النسيج شفافاً وقابلاً للامتزاج بالبرافين، 4. الطمر (Embedding): بشمع البرافين المصهور (56°C–58°C) ليتصلب في قالب متماسك، 5. التقطيع المجهري (Sectioning): بواسطة الميكروتوم الدوار (Rotary Microtome) بسماكة 5–7 ميكروميتر، 6. إزالة الشمع (Deparaffinization): بالزايلين، 7. إعادة الإماهة (Rehydration): بكحول متنازل وصولاً للماء، 8. الصبغ (Staining): بالهيماتوكسيلين والإيوسين، 9. نزع الماء النهائي، 10. الترويق والتركيب (Mounting): بمادة DPX والساترة الزجاجية.',
        histology_notes:
          'السماكة المثالية للمقطع النسيجي في الفحص الروتيني هي 5–7 ميكروميتر (μm)، وهي تعادل تقريباً قطر كرية دم حمراء واحدة، مما يتيح للضوء النفاذ بوضوح لرؤية طبقة واحدة من الخلايا دون تراكب.',
        key_terms: [
          'Fixation (10% Formalin)',
          'Dehydration',
          'Clearing (Xylene)',
          'Paraffin Embedding',
          'Microtome (5-7 μm)',
          'DPX Mounting'
        ]
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-2: مخطط خطوات تحضير الشريحة النسيجية - 9-Step Workflow]',
        visual_id: 'tissue_prep_workflow',
        stain_and_mag: 'بروتوكول مخبري معتمد — تقنية شمع البرافين',
        tissue_name: 'Histological Slide Preparation Workflow',
        microscopic_details: 'مخطط متسلسل يوضح مراحل التثبيت بالفورمالين، نزع الماء بالإيثانول، الترويق بالزايلين، الطمر في قوالب البرافين، والتقطيع بالميكروتوم.',
        question: 'ما هي المادة الكيميائية الأساسية المستخدمة في خطوة التثبيت (Fixation) لمنع التحلل الذاتي للنسيج؟',
        options: [
          '10% Neutral Buffered Formalin',
          'Pure Xylene',
          'Absolute Alcohol 100%',
          'Molten Paraffin Wax'
        ],
        correct_answer: '10% Neutral Buffered Formalin (محلول الفورمالين 10%): يعمل على إحداث روابط تصالبية للبروتينات وتثبيط الإنزيمات الهاضمة لحفظ التركيب الخلوي الدقيق.'
      },
      {
        section: 'media_video',
        title: 'خطوات إعداد الشريحة النسيجية والتقطيع بالميكروتوم عملياً',
        original_url: 'https://www.youtube.com/watch?v=f-FF7Qigd3U',
        fixed_embed_url: 'https://www.youtube.com/embed/f-FF7Qigd3U'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. HISTOLOGICAL STAINS (الصبغات النسيجية H&E والخاصة)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    course: 'Histology',
    chapter: '03. Histological Stains (الصبغات النسيجية)',
    chapter_ar: 'صبغة H&E الروتينية والصبغات النسيجية النوعية الخاصة',
    content_blocks: [
      {
        section: 'theory',
        title: 'Routine Hematoxylin & Eosin (H&E) and Special Stains',
        content:
          '1. صبغة الهيماتوكسيلين والإيوسين (H&E): الصبغة الروتينية القياسية عالمياً. الهيماتوكسيلين صبغة قاعدية ترتبط بالمكونات الحمضية للخلية (مثل الحمض النووي DNA و RNA في النواة والريبوسومات) فتعطيها لوناً أزرق/بنفسجي داكن ويُسمى ذلك محباً للقواعد (Basophilic). الإيوسين صبغة حمضية ترتبط بالمكونات القاعدية للخلية (معظم بروتينات السيتوبلازم وألياف الكولاجين) فتعطيها لوناً وردياً/أحمر ويُسمى ذلك محباً للحمض (Acidophilic / Eosinophilic).\n2. الصبغات الخاصة: أ) صبغة الفضة (Silver impregnation): لصبغ ألياف الشباك (Reticular fibers) وجهاز غولجي باللون الأسود البني. ب) صبغة الأورسين (Orcein): للألياف المرنة (Elastic fibers) بلون بني محمر. ج) صبغة تولودين الزرقاء (Toluidine blue): لحبيبات نيسل وخلايا الماست مع ظاهرة التلون الميتاكروماتي (Metachromasia). د) صبغة هيماتوكسيلين الحديد (Iron Hematoxylin): لإظهار الميتوكوندريا باللون الأزرق الداكن.',
        histology_notes:
          'المصطلحات الامتحانية: Basophilic = أزرق بنفسجي (النواة والكروماتين والنوية)، Acidophilic = وردي أحمر (سيتوبلازم، ألياف كولاجين، كريات دم حمراء).',
        key_terms: [
          'Hematoxylin (Basic, Blue Nuclei)',
          'Eosin (Acidic, Pink Cytoplasm)',
          'Basophilia & Acidophilia',
          'Silver Stain (Black Reticular/Golgi)',
          'Orcein (Elastic Fibers)',
          'Metachromasia'
        ]
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-3: مفهوم وتطبيقات الصبغات النسيجية - Staining Principles]',
        visual_id: 'stains_concept',
        stain_and_mag: 'صبغة H&E مقارنة مع الصبغات الخاصة — تكبير 40x',
        tissue_name: 'Histological Differential Staining (H&E & Special Stains)',
        microscopic_details: 'تباين واضح بين النوى البنفسجية الزرقاء المحبة للقواعد (Basophilic) والسيتوبلازم الوردي المحب للحمض (Acidophilic).',
        question: 'ما هو المكون الخلوي الذي يتلون باللون الأزرق البنفسجي بصبغة الهيماتوكسيلين (Basophilic)؟',
        options: [
          'Cell Nucleus & Chromatin (الأحماض النووية في النواة)',
          'Cytoplasm Proteins',
          'Collagen Fibers',
          'Lipid Droplets'
        ],
        correct_answer: 'Cell Nucleus & Chromatin (نواة الخلية والكروماتين): بسبب الطبيعة الحامضية للأحماض النووية DNA و RNA التي تجذب صبغة الهيماتوكسيلين القاعدية.'
      },
      {
        section: 'media_video',
        title: 'مبادئ صبغ الأنسجة بالهيماتوكسيلين والإيوسين والصبغات الخاصة',
        original_url: 'https://www.youtube.com/watch?v=f-FF7Qigd3U',
        fixed_embed_url: 'https://www.youtube.com/embed/f-FF7Qigd3U'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. CYTOLOGY & CELL ORGANELLES (الخلية وعضيات السيتوبلازم)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    course: 'Histology',
    chapter: '04. Cytology & Organelles (الخلية وعضياتها)',
    chapter_ar: 'التركيب المجهري للخلية وإظهار العضيات بالصبغات النوعية',
    content_blocks: [
      {
        section: 'theory',
        title: 'Cell Organelles & Microscopic Demonstration',
        content:
          '1. جهاز غولجي (Golgi Apparatus): يتكون من أكياس صهريجية غشائية مسطحة (Cisternae). وظيفته تعديل وتغليف وإفراز البروتينات وتشكيل الجسيمات الحالة (Lysosomes). لا يظهر بصبغة H&E الروتينية (يترك منطقة شاحبة تُسمى السلبية الغولجية Negative Golgi image)، ولكنه يُصبغ خصيصاً بنترات الفضة (Silver impregnation) فيظهر كشبكة متعرجة بنية/سوداء فوق النواة (Supranuclear reticular network) في خلايا العقد العصبية.\n2. الميتوكوندريا (Mitochondria): محطات توليد الطاقة الخلوية (ATP) عبر الأكسدة الفوسفورية، تظهر كحبيبات أو قضبان زرقاء داكنة بصبغة هيماتوكسيلين الحديد (Heidenhain\'s Iron Hematoxylin) في خلايا الكبد والأنابيب الكلوية.\n3. حبيبات نيسل (Nissl Granules): كتل بازوفيلية كثيفة من الشبكة الإندوبلازمية الخشنة والريبوسومات الحرة في سيتوبلازم الخلايا العصبية الحركية (Motor neurons)، وتُصبغ بصبغة أزرق التولودين (Toluidine blue).',
        histology_notes:
          'سؤال امتحاني متكرر: لماذا لا يظهر جهاز غولجي بصبغة H&E؟ لأنه يتكون من أغشية دهنية ملساء تفتقر إلى الحمض النووي الريبوزي (RNA)، لذا يظهر كفراغ شاحب بالقرب من النواة.',
        key_terms: [
          'Golgi Apparatus (Silver Stain)',
          'Mitochondria (Iron Hematoxylin)',
          'Nissl Granules (Toluidine Blue)',
          'Negative Golgi Image',
          'Motor Neuron'
        ]
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-4: جهاز غولجي في الخلية العصبية بصبغة الفضة - Golgi Silver]',
        visual_id: 'golgi_silver',
        stain_and_mag: 'صبغة نترات الفضة (Silver Impregnation) — تكبير 40x',
        tissue_name: 'Golgi Apparatus in Spinal Ganglion Neuron',
        microscopic_details: 'شبكة حبيبية وخيطية داكنة بلون بني مائل للسواد تحيط بنواة الخلية العصبية الكبيرة الشاحبة.',
        question: 'ما هو التركيب الخلوي الداكن المتشعب المصبوغ بنترات الفضة (Silver Stain) حول نواة الخلية العصبية؟',
        options: [
          'Golgi Apparatus (جهاز غولجي)',
          'Mitochondria',
          'Nucleolus',
          'Centrosome'
        ],
        correct_answer: 'Golgi Apparatus (جهاز غولجي): يترسب عليه معدن الفضة كشبكة شبكية داكنة مميزة حول أو فوق النواة.'
      },
      {
        section: 'media_video',
        title: 'فحص عضيات الخلية وجهاز غولجي وحبيبات نيسل مجهرياً',
        original_url: 'https://www.youtube.com/watch?v=DLxYDoN634c',
        fixed_embed_url: 'https://www.youtube.com/embed/DLxYDoN634c'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. CELL DIVISION - MITOSIS (الانقسام الميتوزي)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    course: 'Histology',
    chapter: '05. Cell Division - Mitosis (الانقسام الميتوزي)',
    chapter_ar: 'أطوار الانقسام الخيطي غير المباشر في قمة جذر البصل وخلايا الثدييات',
    content_blocks: [
      {
        section: 'theory',
        title: 'Mitotic Stages & Chromosomal Dynamics',
        content:
          'الانقسام الميتوزي (Mitosis) هو عملية انقسام نواة الخلية الجسدية لإنتاج خليتين بنتين متطابقتين جينياً مع الخلية الأم (تحتوي كل منهما على عدد كامل 2n من الكروموسومات). ينقسم إلى 4 أطوار متتالية:\n1. الطور التمهيدي (Prophase): يتكثف الكروماتين إلى كروموسومات مرئية خيطية سميكة، تختفي النوية، ويتحلل الغلاف النووي، وتتشكل خيوط المغزل بين الجسيمين المركزيين.\n2. الطور الاستوائي (Metaphase): تصطف جميع الكروموسومات بدقة في خط استواء الخلية (Equatorial plate) وترتبط بالخيوط المغزلية عبر الحيز الحركي (Kinetochores).\n3. الطور الانفصالي (Anaphase): ينشطر السنترومير وتنفصل الكروماتيدات الشقيقة متجهة إلى قطبي الخلية المتقابلين متخذة شكل حرف V.\n4. الطور النهائي (Telophase): تصل الكروموسومات إلى القطبين، يُعاد تشكيل الغلاف النووي والنوية، ويبدأ التخصر السيتوبلازمي (Cytokinesis) بفعل حلقة الأكتين والميوسين.',
        histology_notes:
          'أفضل عينة عملية لدراسة جميع أطوار الانقسام الميتوزي هي القمة النامية لجذر البصل (Allium cepa root tip) أو خلايا نخاع العظم وخلايا الكبد المتجددة، مصبوغة بصبغة Feulgen أو Iron Hematoxylin.',
        key_terms: [
          'Mitosis',
          'Prophase (Chromatin Condensation)',
          'Metaphase (Equatorial Plate)',
          'Anaphase (Chromatid Separation, V-shape)',
          'Telophase & Cytokinesis'
        ]
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-5: الطور الاستوائي للانقسام الميتوزي - Metaphase]',
        visual_id: 'mitosis_stages',
        stain_and_mag: 'صبغة Iron Hematoxylin / Basic Stain — تكبير 100x زيت',
        tissue_name: 'Mitosis — Metaphase (Equatorial Plate)',
        microscopic_details: 'اصطفاف الكروموسومات المكثفة الداكنة في خط مستقيم منتظم على طول المستوى الاستوائي للخلية مع خيوط المغزل.',
        question: 'تعرف على طور الانقسام الميتوزي الذي تصطف فيه الكروموسومات على خط استواء الخلية (Equatorial Plate):',
        options: [
          'Metaphase (الطور الاستوائي)',
          'Anaphase (الطور الانفصالي)',
          'Prophase (الطور التمهيدي)',
          'Telophase (الطور النهائي)'
        ],
        correct_answer: 'Metaphase (الطور الاستوائي): يتميز بتجمع الكروموسومات المتكاثفة في منتصف الخلية على الصفيحة الاستوائية بوضوح.'
      },
      {
        section: 'media_video',
        title: 'شرح مجهري مباشر لأطوار الانقسام الميتوزي الأربعة',
        original_url: 'https://www.youtube.com/watch?v=l_A2U_VlRz0',
        fixed_embed_url: 'https://www.youtube.com/embed/l_A2U_VlRz0'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. EPITHELIAL TISSUE (النسيج الطلائي البسيط والمطبق)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    course: 'Histology',
    chapter: '06. Epithelial Tissue (النسيج الطلائي)',
    chapter_ar: 'النسيج الطلائي البسيط، المطبق الكاذب، المطبق، والمتحول',
    content_blocks: [
      {
        section: 'theory',
        title: 'Simple Squamous Epithelium (النسيج الطلائي الحرشفي البسيط)',
        content:
          'يتكون النسيج الطلائي الحرشفي البسيط من طبقة واحدة من الخلايا المسطحة الرقيقة تشبه حراشف السمك، تستقر مباشرة على الغشاء القاعدي (Basement Membrane). تحتوي كل خلية على نواة بيضاوية أو مفلطحة وبارزة مركزياً (Centrally placed bulging flattened nucleus). يتيح هذا النسيج النفاذية السريعة والانتشار الفعال للغازات والسوائل (Diffusion & Filtration). يتواجد في بطانة الأوعية الدموية والقلب حيث يُسمى Endothelium، وفي بطانة التجاويف المصلية حيث يُسمى Mesothelium، وفي محفظة بومان الكلوية (Bowman\'s capsule parietal layer) والحويصلات الهوائية الرئوية (Alveoli).',
        histology_notes:
          'تحت مجهر الضوء بصبغة H&E: تظهر الخلايا رقيقة جداً مع بروز النوى البيضاوية الداكنة (Basophilic nuclei) مع سيتوبلازم خفيف محب للحمض (Eosinophilic cytoplasm).',
        key_terms: ['Simple Squamous', 'Endothelium', 'Mesothelium', 'Bowman Capsule', 'Diffusion Barrier']
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-6: محفظة بومان في قشرة الكلية - Bowman Capsule]',
        visual_id: 'simple_squamous_bowman',
        stain_and_mag: 'صبغة H&E — تكبير عالي (40x High Power)',
        tissue_name: "Simple Squamous Epithelium (Bowman's Capsule Parietal Layer)",
        microscopic_details: 'طبقة أحادية رقيقة جداً من الخلايا ذات النوى المسطحة المتباعدة تشكل الجدار الخارجي لمحفظة بومان في قشرة الكلية.',
        question: 'تعرف على نوع النسيج الطلائي المبطن للجدار الخارجي (Parietal Layer) لمحفظة بومان المشار إليها في الشريحة:',
        options: [
          'Simple Squamous Epithelium',
          'Simple Cuboidal Epithelium',
          'Transitional Epithelium',
          'Stratified Squamous Non-keratinized'
        ],
        correct_answer: 'Simple Squamous Epithelium (نسيج طلائي حرشفي بسيط): يتكون من طبقة أحادية من الخلايا المسطحة ذات نوى بيضاوية ممتدة على طول الغشاء القاعدي لمحفظة بومان.'
      },
      {
        section: 'theory',
        title: 'Simple Cuboidal Epithelium (النسيج الطلائي المكعبي البسيط)',
        content:
          'يتكون النسيج الطلائي المكعبي البسيط من طبقة واحدة متراصة من الخلايا المكعبة التي يتساوى طولها مع عرضها. تتميز كل خلية بوجود نواة كروية مركزية الموقع تماماً (Centrally located, perfectly spherical nucleus). يلعب هذا النسيج دوراً حيوياً في الإفراز والامتصاص (Secretion & Absorption). أهم مواقعه الشائعة: الأنابيب الكلوية (Renal Tubules)، الغدة الدرقية (Thyroid follicles)، وقنوات الغدد اللعابية.',
        histology_notes:
          'بصبغة H&E: تظهر الأنابيب الكلوية بمقطع عرضي كحلقة دائرية منتظمة من الخلايا المكعبة ذات النوى الكروية ذات التلوين القاعدي الداكن، والسيتوبلازم متجانس.',
        key_terms: ['Simple Cuboidal', 'Renal Tubules', 'Thyroid Follicle', 'Central Spherical Nucleus']
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-7: الأنابيب الكلوية الملتفة - Renal Tubules]',
        visual_id: 'simple_cuboidal_kidney',
        stain_and_mag: 'صبغة H&E — قوة تكبير متوسطة (40x)',
        tissue_name: 'Simple Cuboidal Epithelium (Kidney Convoluted Tubules)',
        microscopic_details: 'خلايا مكعبة متساوية الأبعاد ذات نوى دائرية بارزة في منتصف كل خلية تشكل جدار القنوات والأنابيب البولية.',
        question: 'ما هو النسيج المكون لجدار الأنابيب الكلوية الملتفة (Renal Tubules) الظاهرة في الشريحة؟',
        options: [
          'Simple Cuboidal Epithelium',
          'Simple Columnar Epithelium',
          'Transitional Epithelium',
          'Stratified Cuboidal Epithelium'
        ],
        correct_answer: 'Simple Cuboidal Epithelium (نسيج طلائي مكعبي بسيط): يتضح من خلال الخلايا المكعبة المنتظمة التي تحيط بتجويف الأنبوب الكببي مع نوى كروية مركزية.'
      },
      {
        section: 'theory',
        title: 'Pseudostratified Ciliated Columnar (المطبق الكاذب المهدب)',
        content:
          'يبدو هذا النسيج كأنه مكون من عدة طبقات بسبب وجود النوى في مستويات وارتفاعات مختلفة (Nuclei at varying levels). ولكن في الحقيقة، جميع الخلايا تستند على نفس الغشاء القاعدي (All cells rest on the basement membrane)، إلا أن بعض الخلايا قصيرة لا تصل إلى السطح التجويفي الحر. النوع الأكثر شهرة هو النسيج الطلائي المهدب المبطن للجهاز التنفسي (Respiratory Epithelium) في القصبة الهوائية والشعب الهوائية، حيث تعلوه أهداب متحركة (Cilia) وخلايا كأسية لطرد الأجسام الغريبة بواسطة المصعد المخاطي الهدبي (Mucociliary escalator).',
        histology_notes:
          'بصبغة H&E: يظهر الغشاء القاعدي في القصبة الهوائية سميكاً بشكل واضح جداً. وتظهر الأهداب كخطوط ناعمة كثيفة ممتدة على السطح الحر للخلايا العمادية، مع نوى في مستويات متعددة.',
        key_terms: ['Pseudostratified', 'Respiratory Epithelium', 'Cilia', 'Mucociliary Escalator', 'Trachea']
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-8: بطانة القصبة الهوائية - Trachea Epithelium]',
        visual_id: 'pseudostratified_columnar_ciliated',
        stain_and_mag: 'صبغة H&E — تكبير 40x',
        tissue_name: 'Pseudostratified Ciliated Columnar Epithelium (Respiratory Epithelium)',
        microscopic_details: 'نوى مصفوفة على ارتفاعات مختلفة توحي بالتعدد، مع طبقة أهداب حركية واضحة على السطح القمي وخلايا كأسية مفرزة.',
        question: 'ما هو التوصيف النسيجي الدقيق لبطانة القصبة الهوائية (Trachea) الظاهرة في الشريحة؟',
        options: [
          'Pseudostratified Ciliated Columnar Epithelium with Goblet cells',
          'Stratified Squamous Epithelium',
          'Transitional Epithelium',
          'Simple Columnar Ciliated Epithelium'
        ],
        correct_answer: 'Pseudostratified Ciliated Columnar Epithelium (نسيج طلائي عمادي مطبق كاذب مهدب): النوى في مستويات متعددة، وجميع الخلايا ترتكز على الغشاء القاعدي، مع وفرة الأهداب القمية والخلايا الكأسية.'
      },
      {
        section: 'theory',
        title: 'Transitional Epithelium / Urothelium (النسيج الطلائي المتحول)',
        content:
          'النسيج الطلائي المتحول هو نسيج مطبق متخصص يبطن المسالك البولية المفرغة (المثانة البولية، الحالب، وحويضة الكلية). يتميز بقدرته الفريدة على التمدد والتقلص مع تغير حجم البول. في حالة الارتخاء (Relaxed state): يتكون من 5–7 طبقات، وتكون الخلايا السطحية ضخمة محدبة ومقببة تُسمى خلايا المظلة (Umbrella / Dome-shaped cells)، وقد تحتوي الخلية على نواتين (Binucleated)، مع صفيحة غشائية سميكة (Uroplakin plaques). في حالة الامتلاء والتمدد (Distended state): ينضغط النسيج ليصبح طبقتين أو ثلاث طبقات مسطحة.',
        histology_notes:
          'بصبغة H&E: العلامة الفارقة للنسيج المتحول هي الخلايا المظلية الكبيرة المقببة السطحية (Dome cells) التي تغطي خلايا متعددة تحتها، وتكون حدودها القمية ملساء ومكثفة كدرع واقٍ لمنع تسرب البول السام.',
        key_terms: ['Transitional Epithelium', 'Urothelium', 'Dome-shaped Umbrella Cells', 'Binucleated Cells', 'Urinary Bladder']
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-9: بطانة المثانة البولية - Urinary Bladder]',
        visual_id: 'transitional_epithelium',
        stain_and_mag: 'صبغة H&E — تكبير 40x',
        tissue_name: 'Transitional Epithelium (Urothelium of Urinary Bladder)',
        microscopic_details: 'طبقات خلوية متعددة تعلوها خلايا مظلية قبية ضخمة (Dome-shaped cells) ذات نواتين تحمي بطانة المسالك البولية.',
        question: 'ما هو النسيج المطبق الذي يتميز بوجود خلايا سطحية مقببة ومظلية (Dome-shaped Umbrella cells) تبطن المثانة البولية؟',
        options: [
          'Transitional Epithelium (Urothelium)',
          'Stratified Squamous Non-keratinized',
          'Pseudostratified Columnar',
          'Stratified Cuboidal Epithelium'
        ],
        correct_answer: 'Transitional Epithelium (النسيج الطلائي المتحول / الظهارة البولية): يتكيف مع التمدد ويتميز بالخلايا المظلية القبية السطحية الكبيرة.'
      },
      {
        section: 'media_video',
        title: 'شرح النسيج الطلائي البسيط والمطبق والمتحول مجهرياً',
        original_url: 'https://www.youtube.com/watch?v=l_A2U_VlRz0',
        fixed_embed_url: 'https://www.youtube.com/embed/l_A2U_VlRz0'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 7. CONNECTIVE TISSUE PROPER (النسيج الضام الأصيل)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    course: 'Histology',
    chapter: '07. Connective Tissue Proper (النسيج الضام الأصيل)',
    chapter_ar: 'النسيج الضام الرخو والكثيف والشحمي والشبكي',
    content_blocks: [
      {
        section: 'theory',
        title: 'Loose (Areolar) Connective Tissue (النسيج الضام الرخو)',
        content:
          'النسيج الضام الفجوي الرخو هو أكثر أنواع الأنسجة الضامة انتشاراً في جسم الإنسان. يحتوي على جميع المكونات الأساسية للنسيج الضام بتوازن: 1. الخلايا: الخلايا الليفية اليافعة (Fibroblasts) وهي الأكثر عدداً ذات نوى بيضاوية كبيرة وشاحبة، البلعميات (Macrophages)، الخلايا البدينة (Mast cells) المليئة بحبيبات الهيستامين والهيبارين، وخلايا البلازما (Plasma cells) التي تنتج الأجسام المضادة مع نواة تشبه عجلة العربة (Clock-face/Cartwheel nucleus). 2. الألياف: ألياف كولاجين سميكة وردية، وألياف مرنة داكنة دقيقة متفرعة. 3. المادة الخلالية (Ground substance): لزجة غنية بالحمض الهيالوروني.',
        histology_notes:
          'بصبغة H&E: ألياف الكولاجين تأخذ لوناً وردياً متموجاً عريضاً، وألياف الإيلاستين رفيعة داكنة متفرعة.',
        key_terms: ['Areolar Tissue', 'Fibroblasts', 'Mast Cells', 'Plasma Cells', 'Metachromasia', 'Collagen']
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-10: مسحة النسيج الضام الرخو - Areolar Spread]',
        visual_id: 'loose_areolar_spread',
        stain_and_mag: 'صبغة H&E خاصة — تكبير 40x',
        tissue_name: 'Loose Areolar Connective Tissue',
        microscopic_details: 'شبكة مفتوحة من حزم ألياف الكولاجين السميكة المتموجة وألياف الإيلاستين الرفيعة الداكنة، مع خلايا ليفية وخلايا مناعية متناثرة.',
        question: 'تعرف على نوع النسيج المعروض الذي يظهر وفرة الألياف الكولاجينية المتموجة والألياف المرنة الرفيعة المتفرعة:',
        options: [
          'Loose (Areolar) Connective Tissue',
          'Dense Regular Connective Tissue',
          'Adipose Tissue',
          'Hyaline Cartilage'
        ],
        correct_answer: 'Loose (Areolar) Connective Tissue (النسيج الضام الرخو): يظهر الألياف الكولاجينية الوردية السميكة والألياف المرنة الرفيعة الداكنة ومختلف أنواع الخلايا الضامة في أرضية خلالية وفيرة.'
      },
      {
        section: 'theory',
        title: 'Adipose Tissue (النسيج الدهني الأبيض)',
        content:
          'النسيج الدهني الأبيض (White/Unilocular Adipose Tissue): كل خلية دهنية تحتوي على قطرة دهنية ضخمة واحدة غير محاطة بغشاء تشغل معظم السيتوبلازم وتدفع النواة والسيتوبلازم إلى المحيط، معطيةً الخلية مظهر الخاتم ذي الفص (Signet-ring appearance). وظيفته تخزين الطاقة، العزل الحراري، وحماية الأعضاء. في التحضير الروتيني بصبغة H&E تذوب الدهون بواسطة الزايلين، فتظهر الخلايا كفراغات فارغة بيضاء محاطة بحدود رفيعة تشبه قرص العسل.',
        histology_notes:
          'لإظهار الدهون محفوظة دون ذوبان، يجب استخدام التجميد وصبغات الدهون الخاصة مثل Oil Red O أو Sudan III أو أكسيد الأوزميوم (Osmium Tetroxide) الذي يصبغ الدهون باللون الأسود.',
        key_terms: ['White Adipose', 'Signet-ring Cell', 'Sudan III', 'Oil Red O', 'Osmium Tetroxide']
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-11: النسيج الدهني الأبيض - White Adipose Tissue]',
        visual_id: 'adipose_white_unilocular',
        stain_and_mag: 'صبغة H&E الروتينية — تكبير 20x',
        tissue_name: 'White (Unilocular) Adipose Tissue',
        microscopic_details: 'فراغات سداسية أو مدورة تشبه قرص العسل خالية من الصبغة بسبب ذوبان الدهون، مع نوى مفلطحة مضغوطة في الأطراف (مظهر خاتم الفص).',
        question: 'ما هو المظهر التشخيصي الكلاسيكي للخلايا في النسيج الدهني الأبيض تحت المجهر؟',
        options: [
          'Signet-ring appearance (مظهر خاتم الفص)',
          'Clock-face nucleus',
          'Striated border',
          'Concentric lamellae'
        ],
        correct_answer: 'Signet-ring appearance (مظهر خاتم الفص): حيث تدفع القطيرة الدهنية الكبيرة المفردة النواة والسيتوبلازم إلى الحافة المحيطية للخلية.'
      },
      {
        section: 'media_video',
        title: 'شرح مفصل للنسيج الضام والخلايا والألياف مع فحص الشرائح',
        original_url: 'https://www.youtube.com/watch?v=680QpXzX6J4',
        fixed_embed_url: 'https://www.youtube.com/embed/680QpXzX6J4'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 8. CARTILAGE & BONE (الغضاريف والعظام)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    course: 'Histology',
    chapter: '08. Cartilage & Bone (الغضاريف والعظام)',
    chapter_ar: 'الغضروف الزجاجي والمرن والليفي والعظم المصمت',
    content_blocks: [
      {
        section: 'theory',
        title: 'Hyaline Cartilage (الغضروف الزجاجي)',
        content:
          'الغضروف الزجاجي هو أكثر أنواع الغضاريف شيوعاً. يتميز بمادته الخلالية المتجانسة ذات اللون الأزرق الشفاف (Glassy, basophilic matrix). يحتوي على ألياف كولاجين من النوع الثاني (Type II collagen fibrils) غير مرئية بالمجهر الضوئي العادي لتساوي معامل انكسارها مع المادة الخلالية. الخلايا الغضروفية (Chondrocytes) تقبع داخل فجوات تدعى الجوبات (Lacunae)، وتتواجد في مجموعات متكاثرة تُسمى المجموعات الإسوية (Isogenous groups). يحاط الغضروف بغشاء ضام ليفي وعائي يُسمى سمحاق الغضروف (Perichondrium). يتواجد في الحلقات الرغامية، الحنجرة، أطراف الأضلاع، والأسطح المفصلية.',
        histology_notes:
          'بصبغة H&E: تظهر المادة الخلالية المحيطة مباشرة بالفجوات (Territorial matrix) أغمق لوناً قاعدياً بسبب التركيز المرتفع لسلفات الكوندرويتين.',
        key_terms: ['Hyaline Cartilage', 'Chondrocytes', 'Lacunae', 'Isogenous Groups', 'Perichondrium', 'Type II Collagen']
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-12: الغضروف الزجاجي في القصبة الهوائية - Hyaline Cartilage]',
        visual_id: 'hyaline_cartilage_trachea',
        stain_and_mag: 'صبغة H&E — تكبير 40x',
        tissue_name: 'Hyaline Cartilage (Tracheal ring)',
        microscopic_details: 'مادة خلالية زجاجية بنفسجية ملساء تحوي خلايا غضروفية في جوبات (Lacunae) تتجمع في مجموعات إسوية (Isogenous groups)، محاطة بالسمحاق الغضروفي (Perichondrium).',
        question: 'تعرف على التجمع الخلوي الخاص داخل الفجوات الغضروفية والمشار إليه بالسهم في نسيج الغضروف الزجاجي:',
        options: [
          'Isogenous Groups (المجموعات الإسوية لخلايا Chondrocytes)',
          'Osteons (أنظمة هافرس)',
          'Sarcomeres',
          'Intercalated discs'
        ],
        correct_answer: 'Isogenous Groups (المجموعات الإسوية): تجمعات من 2 إلى 8 خلايا غضروفية (Chondrocytes) نشأت من انقسام خلية أم واحدة داخل نفس الفجوة في الغضروف الزجاجي.'
      },
      {
        section: 'theory',
        title: 'Compact Bone (العظم المصمت أو القشري)',
        content:
          'يشكل العظم المصمت الطبقة الخارجية الصلبة للهيكل العظمي. الوحدة البنائية الوظيفية المميزة له هي جهاز هافرس أو العظمون (Haversian System / Osteon). يتكون كل عظمون من: 1. قناة هافرس المركزية (Haversian Canal) تحوي أوعية دموية وأعصاب. 2. صفائح عظمية متحدة المركز (Concentric Lamellae) من مصفوفة كولاجين متكلسة بأملاح هيدروكسي أباتيت. 3. فجوات (Lacunae) تحتوي على الخلايا العظمية الناضجة (Osteocytes). 4. نبيبات عظمية دقيقة (Canaliculi) تمتد فيها زوائد الخلايا لتأمين التغذية بالانتشار. تتصل قنوات هافرس ببعضها وبالسطح عبر قنوات فولكمان المستعرضة (Volkmann\'s canals).',
        histology_notes:
          'في شرائح العظم المطحون (Ground bone Unstained): تظهر الفجوات والنبيبات وقنوات هافرس سوداء لامتلائها بجزيئات طحن دقيقة وهواء.',
        key_terms: ['Compact Bone', 'Osteon', 'Haversian Canal', 'Volkmann Canal', 'Concentric Lamellae', 'Osteocytes', 'Canaliculi']
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-13: العظم المصمت المطحون - Ground Compact Bone]',
        visual_id: 'compact_bone_osteon',
        stain_and_mag: 'عظم مطحون جاف (Ground Bone Unstained) — تكبير 20x',
        tissue_name: 'Compact Bone (Haversian System / Osteon)',
        microscopic_details: 'قناة هافرس مركزية مظلمة محاطة بصفائح دائرية متحدة المركز من المادة العظمية، تتخللها جوبات سوداء ونبيبات دقيقة متفرعة تشبه أرجل العنكبوت.',
        question: 'ما هو الاسم العلمي للوحدة البنائية الأسطوانية الدائرية المميزة للعظم المصمت الظاهرة في الشريحة؟',
        options: [
          'Haversian System / Osteon (العظمون)',
          'Trabecular network',
          'Isogenous chondrocyte nest',
          'Neuromuscular junction'
        ],
        correct_answer: 'Haversian System / Osteon (نظام هافرس أو العظمون): الوحدة الأسطوانية المكونة من قناة مركزية محاطة بصفائح عظمية دائرية متحدة المركز تحوي الخلايا العظمية.'
      },
      {
        section: 'media_video',
        title: 'دراسة أنسجة الغضاريف والعظام تحت المجهر مع التعرف على الشرائح',
        original_url: 'https://www.youtube.com/watch?v=3M_EfZ8O9iU',
        fixed_embed_url: 'https://www.youtube.com/embed/3M_EfZ8O9iU'
      }
    ]
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 9. BLOOD SMEAR & MUSCLE TISSUES (الدم والأنسجة العضلية)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    course: 'Histology',
    chapter: '09. Blood Smear & Muscle Tissues (الدم والعضلات)',
    chapter_ar: 'مسحة الدم والخلايا المناعية والأنسجة العضلية المخططة والملساء',
    content_blocks: [
      {
        section: 'theory',
        title: 'Blood Smear & Muscular Tissue Classification',
        content:
          '1. مسحة الدم (Blood Smear): تُصبغ بصبغة ليشمان (Leishman) أو غيمزا (Giemsa). تتألف من: خلايا الدم الحمراء (Erythrocytes 7.5 μm مقعرة الوجهين عديمة النواة)، والصفائح الدموية (Platelets)، وخلايا الدم البيضاء: أ) المحببة (Granulocytes): العدلات (Neutrophils 3–5 فصوص)، الحمضات (Eosinophils فصان وحبيبات برتقالية حمراء)، والقعدات (Basophils حبيبات بنفسجية تخفي النواة). ب) غير المحببة (Agranulocytes): اللمفاويات (Lymphocytes نواة دائرية تشغل معظم الخلية)، والوحيدات (Monocytes نواة كلوية فاصولية).\n2. الأنسجة العضلية: أ) العضلات الهيكلية (Skeletal Muscle): ألياف أسطوانية مخططة طويلة، متعددة النوى والموقع المحيطي (Peripheral multinucleated). ب) العضلات القلبية (Cardiac Muscle): ألياف مخططة متفرعة، نواة مركزية واحدة، وأقراص بينية معترضة (Intercalated discs). ج) العضلات الملساء (Smooth Muscle): خلايا مغزلية غير مخططة، ذات نواة بيضاوية مركزية واحدة.',
        histology_notes:
          'التمييز السريري المجهري: العضلات الهيكلية = نوى محيطية متعددة؛ العضلات القلبية = نوى مركزية + أقراص بينية متفرعة؛ العضلات الملساء = لا توجد خطوط، خلايا مغزلية بنواة واحدة.',
        key_terms: [
          'Blood Smear (Leishman Stain)',
          'Neutrophil (3-5 Lobes)',
          'Skeletal Muscle (Peripheral Nuclei)',
          'Cardiac Muscle (Intercalated Discs)',
          'Smooth Muscle (Spindle-shaped)'
        ]
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-14: مسحة الدم وخلايا الدم البيضاء - Blood Smear]',
        visual_id: 'blood_smear_cells',
        stain_and_mag: 'صبغة ليشمان (Leishman Stain) — تكبير 100x زيت',
        tissue_name: 'Human Blood Smear (Neutrophil & Erythrocytes)',
        microscopic_details: 'خلية دم بيضاء متعادلة ذات نواة متعددة الفصوص (3–5 فصوص متصلة بخيوط كروماتينية دقيقة) محاطة بكريات دم حمراء عديمة النواة.',
        question: 'ما هي خلية الدم البيضاء الحبيبية الأكثر عدداً والتي تتميز بنواة متعددة الفصوص (3 إلى 5 فصوص)؟',
        options: [
          'Neutrophil (الخلية المتعادلة)',
          'Eosinophil',
          'Basophil',
          'Lymphocyte'
        ],
        correct_answer: 'Neutrophil (الخلية البيضاء المتعادلة): تشكل 60–70% من كريات الدم البيضاء وتتميز بنواة مجزأة من 3 إلى 5 فصوص.'
      },
      {
        section: 'practical_quiz',
        image_tag: '[شريحة-15: نسيج العضلة القلبية والأقراص البينية - Cardiac Muscle]',
        visual_id: 'cardiac_muscle_intercalated_discs',
        stain_and_mag: 'صبغة H&E + Iron Hematoxylin — تكبير 40x',
        tissue_name: 'Cardiac Muscle with Intercalated Discs',
        microscopic_details: 'ألياف عضلية مخططة ومتفرعة ذات نوى كروية مركزية، تفصل بينها أقراص بينية داكنة معترضة (Intercalated Discs) تؤمن التوصيل الكهربائي.',
        question: 'ما هو التركيب النسيجي المعترض الداكن الذي يربط بين خلايا العضلة القلبية المتجاورة؟',
        options: [
          'Intercalated Discs (الأقراص البينية)',
          'Sarcomere Z-line',
          'Neuromuscular junction',
          'Volkmann canal'
        ],
        correct_answer: 'Intercalated Discs (الأقراص البينية): وصلات متخصصة تشمل Desmosomes و Gap Junctions لضمان التزامن والانقباض كوحدة وظيفية واحدة (Syncytium).'
      },
      {
        section: 'media_video',
        title: 'فحص مسحة الدم وأنواع العضلات الهيكلية والقلبية والملساء',
        original_url: 'https://www.youtube.com/watch?v=DLxYDoN634c',
        fixed_embed_url: 'https://www.youtube.com/embed/DLxYDoN634c'
      }
    ]
  }
];
