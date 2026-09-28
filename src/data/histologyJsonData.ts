/**
 * Histology Standardized Curriculum JSON Dataset
 * Structured precisely according to faculty curriculum requirements.
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
  image_url?: string;
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
  // 1. Epithelial Tissue (النسيج الطلائي)
  {
    course: 'Histology',
    chapter: 'Epithelial Tissue (النسيج الطلائي)',
    chapter_ar: 'النسيج الطلائي البسيط والمطبق',
    content_blocks: [
      {
        section: 'theory',
        title: 'Simple Squamous Epithelium (النسيج الطلائي الحرشفي البسيط)',
        content:
          'يتكون النسيج الطلائي الحرشفي البسيط من طبقة واحدة من الخلايا المسطحة الرقيقة تشبه حراشف السمك، تستقر مباشرة على الغشاء القاعدي (Basement Membrane). تحتوي كل خلية على نواة بيضاوية أو مفلطحة وبارزة مركزياً (Centrally placed bulging flattened nucleus). يتيح هذا النسيج النفاذية السريعة والانتشار الفعال للغازات والسوائل (Diffusion & Filtration). يتواجد في بطانة الأوعية الدموية والقلب حيث يُسمى Endothelium، وفي بطانة التجاويف المصلية حيث يُسمى Mesothelium، وفي محفظة بومان الكلوية (Bowman\'s capsule parietal layer) والحويصلات الهوائية الرئوية (Alveoli).',
        histology_notes:
          'تحت مجهر الضوء بصبغة H&E: تظهر الخلايا رقيقة جداً مع بروز النوى البيضاوية الداكنة (Basophilic nuclei) مع سيتوبلازم خفيف محب للحمض (Eosinophilic cytoplasm). حدود الخلايا غالباً غير واضحة إلا بصبغة نترات الفضة (Silver Stain) التي تظهر الحدود المتعرجة.',
        key_terms: [
          'Simple Squamous',
          'Endothelium',
          'Mesothelium',
          'Basement Membrane',
          'Diffusion Barrier'
        ]
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-1: شريحة كلية توضح محفظة بومان - Bowman Capsule]',
        image_url: 'https://images.unsplash.com/photo-1579165466791-78822d31e050?auto=format&fit=crop&w=800&q=80',
        stain_and_mag: 'صبغة H&E — تكبير عالي (40x High Power)',
        tissue_name: 'Simple Squamous Epithelium (Parietal layer of Bowman\'s capsule)',
        microscopic_details: 'طبقة أحادية رقيقة جداً من الخلايا ذات النوى المسطحة المتباعدة تشكل الجدار الخارجي لمحفظة بومان في قشرة الكلية.',
        question: 'تعرف على نوع النسيج الطلائي المبطن للجدار الخارجي (Parietal Layer) لمحفظة بومان المشار إليها في الشريحة:',
        options: [
          'Simple Squamous Epithelium',
          'Simple Cuboidal Epithelium',
          'Transitional Epithelium',
          'Stratified Squamous Non-keratinized'
        ],
        correct_answer: 'Simple Squamous Epithelium (نسيج طلائي حرشفي بسيط): يتكون من طبقة أحادية من الخلايا المسطحة ذات نوى بيضاوية ممتدة على طول الغشاء القاعدي لمحفظة بومان المحيطة بالكبيبة الكلوية.'
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
        image_tag: '[صورة-2: شريحة قشرة الكلية - Renal Tubules]',
        image_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
        stain_and_mag: 'صبغة H&E — قوة تكبير متوسطة (20x)',
        tissue_name: 'Simple Cuboidal Epithelium (Kidney Collecting & Convoluted Tubules)',
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
        title: 'Simple Columnar Epithelium (النسيج الطلائي العمادي البسيط)',
        content:
          'يتألف من طبقة واحدة من الخلايا الطويلة العمودية حيث يفوق ارتفاعها عرضها بوضوح. تقع النوى البيضاوية (Oval nuclei) في الثلث القاعدي من الخلية وتكون مصطفة في مستوى واحد أفقي بالقرب من الغشاء القاعدي. ينقسم إلى نوعين رئيسيين: 1. غير مهدب (Non-ciliated): يوجد في بطانة المعدة والأمعاء الدقيقة والمرارة ويمتلك حافة مخططة (Brush/Striated border) من الخملات الدقيقة (Microvilli) وخلايا كأسية (Goblet cells) لإفراز المخاط. 2. مهدب (Ciliated): يوجد في قناة فالوب (Uterine tube) لتحريك البويضة المخصبة.',
        histology_notes:
          'بصبغة H&E يظهر سيتوبلازم الخلايا العمودية محباً للحمض (Pink/Eosinophilic) مع حافة زغابية واضحة، بينما تظهر الخلايا الكأسية (Goblet cells) فارغة أو شاحبة لأن المخاط يذوب أثناء تحضير النسيج الروتيني، لكنه يُصبغ بقوة باللون البنفسجي الفوشيا بصبغة PAS.',
        key_terms: ['Simple Columnar', 'Goblet Cells', 'Striated Border', 'Microvilli', 'Basal Oval Nuclei']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-3: بطانة الأمعاء الدقيقة - Jejunum/Ileum]',
        image_url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
        stain_and_mag: 'صبغة H&E + PAS — تكبير 40x',
        tissue_name: 'Simple Columnar Epithelium with Goblet Cells & Brush Border',
        microscopic_details: 'خلايا عمادية طويلة ذات نوى بيضاوية قاعدية، تتخللها خلايا كأسية مخاطية وحافة مفرشية للامتصاص.',
        question: 'حدد نوع النسيج الطلائي المبطن للخملات المعوية في عينة الأمعاء الدقيقة الموضحة:',
        options: [
          'Simple Columnar Epithelium with Goblet cells',
          'Pseudostratified Ciliated Columnar Epithelium',
          'Simple Cuboidal Epithelium',
          'Stratified Squamous Non-keratinized'
        ],
        correct_answer: 'Simple Columnar Epithelium with Goblet cells (نسيج طلائي عمادي بسيط مع خلايا كأسية): يتميز بارتفاع الخلايا، اصطفاف النوى البيضاوية قرب القاعدة، ووجود الخلايا الكأسية المفرزة للمخاط والحافة الزغابية.'
      },
      {
        section: 'theory',
        title: 'Pseudostratified Columnar Epithelium (النسيج الطلائي العمادي المطبق الكاذب)',
        content:
          'يبدو هذا النسيج كأنه مكون من عدة طبقات بسبب وجود النوى في مستويات وارتفاعات مختلفة (Nuclei at varying levels). ولكن في الحقيقة، جميع الخلايا تستند على نفس الغشاء القاعدي (All cells rest on the basement membrane)، إلا أن بعض الخلايا قصيرة لا تصل إلى السطح التجويفي الحر. النوع الأكثر شهرة هو النسيج الطلائي المهدب المبطن للجهاز التنفسي (Respiratory Epithelium) في القصبة الهوائية والشعب الهوائية، حيث تعلوه أهداب متحركة (Cilia) وخلايا كأسية لطرد الأجسام الغريبة بواسطة المصعد المخاطي الهدبي (Mucociliary escalator).',
        histology_notes:
          'بصبغة H&E: يظهر الغشاء القاعدي في القصبة الهوائية سميكاً بشكل واضح جداً. وتظهر الأهداب كخطوط ناعمة كثيفة ممتدة على السطح الحر للخلايا العمادية، مع نوى في مستويات متعددة.',
        key_terms: ['Pseudostratified', 'Respiratory Epithelium', 'Cilia', 'Mucociliary Escalator', 'Trachea']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-4: مقطع عرضي في القصبة الهوائية - Trachea]',
        image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
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
        section: 'media_video',
        title: 'شرح النسيج الطلائي البسيط والمطبق وتطبيقات الشرائح المجهرية',
        original_url: 'https://www.youtube.com/watch?v=l_A2U_VlRz0',
        fixed_embed_url: 'https://www.youtube.com/embed/l_A2U_VlRz0'
      }
    ]
  },

  // 2. Connective Tissue (النسيج الضام)
  {
    course: 'Histology',
    chapter: 'Connective Tissue (النسيج الضام)',
    chapter_ar: 'النسيج الضام الأصيل والخاص',
    content_blocks: [
      {
        section: 'theory',
        title: 'Loose (Areolar) Connective Tissue (النسيج الضام الفجوي الرخو)',
        content:
          'النسيج الضام الفجوي الرخو هو أكثر أنواع الأنسجة الضامة انتشاراً في جسم الإنسان. يحتوي على جميع المكونات الأساسية للنسيج الضام بتوازن: 1. الخلايا: الخلايا الليفية اليافعة (Fibroblasts) وهي الأكثر عدداً ذات نوى بيضاوية كبيرة وشاحبة، البلعميات (Macrophages)، الخلايا البدينة (Mast cells) المليئة بحبيبات الهيستامين والهيبارين، وخلايا البلازما (Plasma cells) التي تنتج الأجسام المضادة مع نواة تشبه عجلة العربة (Clock-face/Cartwheel nucleus). 2. الألياف: ألياف كولاجين سميكة وردية، وألياف مرنة داكنة دقيقة متفرعة. 3. المادة الخلالية (Ground substance): لزجة غنية بالحمض الهيالوروني.',
        histology_notes:
          'بصبغة H&E: ألياف الكولاجين تأخذ لوناً وردياً متموجاً عريضاً، وألياف الإيلاستين رفيعة داكنة متفرعة. يمكن استخدام صبغة تولودين الزرقاء (Toluidine Blue) لصبغ الخلايا البدينة بظاهرة تلون الميتاكروماتية (Metachromasia).',
        key_terms: ['Areolar Tissue', 'Fibroblasts', 'Mast Cells', 'Plasma Cells', 'Metachromasia', 'Collagen']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-5: مسحة النسيج الضام الرخو - Areolar Spread]',
        image_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
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
        title: 'Adipose Tissue (النسيج الدهني الأبيض والبني)',
        content:
          'ينقسم النسيج الدهني إلى نوعين رئيسيين: 1. النسيج الدهني الأبيض (White/Unilocular Adipose Tissue): كل خلية دهنية تحتوي على قطرة دهنية ضخمة واحدة غير محاطة بغشاء تشغل معظم السيتوبلازم وتدفع النواة والسيتوبلازم إلى المحيط، معطيةً الخلية مظهر الخاتم ذي الفص (Signet-ring appearance). وظيفته تخزين الطاقة، العزل الحراري، وحماية الأعضاء. 2. النسيج الدهني البني (Brown/Multilocular Adipose Tissue): تحتوي الخلايا على قطيرات دهنية متعددة ونواة كروية مركزية مع وفرة هائلة من الميتوكوندريا الحاوية على بروتين UCP-1 (Thermogenin) لإنتاج الحرارة بدون رجفة في حديثي الولادة.',
        histology_notes:
          'في التحضير الروتيني بصبغة H&E: تذوب الدهون بواسطة المذيبات العضوية مثل الزايلين (Xylene)، لذلك تظهر الخلايا الدهنية كفراغات فارغة بيضاء محاطة بحدود رفيعة جداً ونواة مضغوطة محيطية. لإظهار الدهون محفوظة، يجب استخدام التجميد وصبغات الدهون الخاصة مثل Oil Red O أو Sudan III/IV أو أكسيد الأوزميوم (Osmium Tetroxide) الذي يصبغها باللون الأسود.',
        key_terms: ['White Adipose', 'Signet-ring Cell', 'Sudan III', 'Oil Red O', 'Brown Adipose', 'Thermogenin']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-6: شريحة النسيج الدهني الأبيض - White Adipose]',
        image_url: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=800&q=80',
        stain_and_mag: 'صبغة H&E الروتينية — تكبير 20x',
        tissue_name: 'White (Unilocular) Adipose Tissue',
        microscopic_details: 'فراغات سداسية أو مدورة تشبه قرص العسل خالية من الصبغة بسبب ذوبان الدهون، مع نوى مفلطحة مضغوطة في الأطراف (مظهر خاتم الفص).',
        question: 'ما هو المظهر التشخيصي الكلاسيكي للخلايا في النسيج الدهني الأبيض تحت المجهر؟',
        options: [
          'Signet-ring appearance (مظهر خاتم الخطوبة)',
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

  // 3. Cartilage and Bone (الغضاريف والعظام)
  {
    course: 'Histology',
    chapter: 'Cartilage & Bone (الغضاريف والعظام)',
    chapter_ar: 'الغضروف الزجاجي والمرن والليفي والعظم المصمت',
    content_blocks: [
      {
        section: 'theory',
        title: 'Hyaline Cartilage (الغضروف الزجاجي)',
        content:
          'الغضروف الزجاجي هو أكثر أنواع الغضاريف شيوعاً. يتميز بمادته الخلالية المتجانسة ذات اللون الأزرق المزرق الشفاف (Glassy, basophilic matrix). يحتوي على ألياف كولاجين من النوع الثاني (Type II collagen fibrils) ولكنها غير مرئية بالمجهر الضوئي العادي لتساوي معامل انكسارها مع المادة الخلالية. الخلايا الغضروفية (Chondrocytes) تقبع داخل فجوات تدعى الجوبات (Lacunae)، وتتواجد غالباً في مجموعات متكاثرة تُسمى المجموعات الإسوية (Isogenous groups). يحاط الغضروف بغشاء ضام ليفي وعائي يُسمى سمحاق الغضروف (Perichondrium) باستثناء الأسطح المفصلية. يتواجد في الحلقات الرغامية، الحنجرة، أطراف الأضلاع، والأسطح المفصلية للعظام الطويلة.',
        histology_notes:
          'بصبغة H&E: تظهر المادة الخلالية المحيطة مباشرة بالفجوات (Territorial/Capsular matrix) أغمق لوناً قاعدياً بسبب التركيز المرتفع لسلفات الكوندرويتين، بينما تظهر المادة بين المجموعات (Interterritorial matrix) أفتح لوناً.',
        key_terms: ['Hyaline Cartilage', 'Chondrocytes', 'Lacunae', 'Isogenous Groups', 'Perichondrium', 'Type II Collagen']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-7: مقطع الغضروف الزجاجي في القصبة الهوائية]',
        image_url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
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
          'يُحضر العظم بطريقتين: 1. شرائح العظم المطحون (Ground bone): بدون صبغ، تظهر الفجوات والنبيبات وقنوات هافرس سوداء لامتلائها بجزيئات طحن دقيقة وهواء. 2. العظم منزوع الكلس (Decalcified bone) بصبغة H&E: يظهر الكولاجين أحمر/وردي مع بقاء الخلايا العظمية حية.',
        key_terms: ['Compact Bone', 'Osteon', 'Haversian Canal', 'Volkmann Canal', 'Concentric Lamellae', 'Osteocytes', 'Canaliculi']
      },
      {
        section: 'practical_quiz',
        image_tag: '[صورة-8: شريحة العظم المصمت المطحون - Ground Bone]',
        image_url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
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
  }
];
