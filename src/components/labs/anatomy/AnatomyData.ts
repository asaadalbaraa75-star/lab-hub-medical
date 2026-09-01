export interface AnatomySpotterItem {
  pinNumber: number;
  structureNameEn: string;
  structureNameAr: string;
  positionX: number; // percentage (0-100)
  positionY: number; // percentage (0-100)
  whatIsIt: string;
  whereIsIt: string;
  functionDesc: string;
  howToRecognize: string;
  highYieldNote: string;
  clinicalNote?: string;
  level?: 'CORE' | 'HIGH_YIELD' | 'EXTRA';
}

export interface AnatomyCommonMistake {
  titleAr: string;
  titleEn: string;
  wrongConcept: string;
  correctConcept: string;
  explanation: string;
}

export interface AnatomyMnemonic {
  phraseEn: string;
  meaningAr: string;
  explanation: string;
}

export interface AnatomyPracticeQuestion {
  id: string;
  questionEn: string;
  questionAr: string;
  options: string[];
  correctAnswer: string;
  explanationAr: string;
  explanationEn: string;
  examFocus: string;
}

export interface AnatomyTopic {
  id: string;
  topicNumber: number;
  category: 'foundations' | 'musculoskeletal' | 'organ_systems';
  subCategory: string;
  titleEn: string;
  titleAr: string;
  quickIdeaAr: string;
  quickIdeaEn: string;
  
  // First-Year Core Pedagogy (Simple -> Deep)
  whatIsIt: {
    ar: string;
    en: string;
  };
  whereIsIt: {
    ar: string;
    en: string;
  };
  whatDoesItDo: {
    ar: string;
    en: string;
  };
  whyImportant: {
    ar: string;
    en: string;
  };
  howToRecognize: {
    ar: string;
    en: string;
  };
  howAppearsInExam: {
    ar: string;
    en: string;
  };

  highYieldSummary: string; // e.g. "Femur = thigh bone | Longest bone in body"
  
  imageUrl: string;
  iconName: string;

  // Level Division
  corePoints: string[];
  highYieldExamPoints: string[];
  extraInfo: string[];

  // Features & Landmarks
  keyStructures: {
    nameEn: string;
    nameAr: string;
    location: string;
    function: string;
    howToRecognize: string;
    clinicalNote?: string;
    level: 'CORE' | 'HIGH_YIELD' | 'EXTRA';
  }[];

  // Common Mistakes
  commonMistakes: AnatomyCommonMistake[];

  // Memory Aids
  memoryAids: AnatomyMnemonic[];

  // Clinical Note
  clinicalNote: string;

  // Key Terms
  keyTerms: {
    term: string;
    meaningAr: string;
    definitionEn: string;
    example: string;
  }[];

  // Interactive Spotters
  spotterItems: AnatomySpotterItem[];

  // End of lesson Quick Review (5-7 points)
  quickReviewPoints: string[];

  // Topic Practice Questions
  practiceQuestions: AnatomyPracticeQuestion[];
}

export const ANATOMY_TOPICS: AnatomyTopic[] = [
  // 1. ANATOMICAL PLANES
  {
    id: 'anat_planes',
    topicNumber: 1,
    category: 'foundations',
    subCategory: 'planes',
    titleEn: 'Anatomical Planes & Sections',
    titleAr: 'المستويات والمقاطع التشريحية',
    quickIdeaAr: 'خطوط ومستويات وهمية ثنائية الأبعاد نقسم بها جسم الإنسان لنصفين أو مقاطع لدراسة التراكيب وقراءة صور الأشعة.',
    quickIdeaEn: 'Imaginary 2D flat surfaces passing through the body in anatomical position to describe sections and radiology.',
    
    whatIsIt: {
      ar: 'المستويات التشريحية هي أسطح وهمية تقطع الجسم في الوضعية التشريحية القياسية لوصف مواقع الأعضاء وتفسير صور الأشعة (CT / MRI).',
      en: 'Imaginary reference planes slicing through the body in standard anatomical position to describe slices and radiological views.'
    },
    whereIsIt: {
      ar: 'تمر عبر الجسم بأكمله في ثلاثة أبعاد متعامدة (سهمي، إكليلي، ومستعرض).',
      en: 'Passes throughout the entire body along three perpendicular 3D axes (Sagittal, Coronal, and Transverse).'
    },
    whatDoesItDo: {
      ar: 'توفر لغة عالمية موحدة للأطباء لتحديد موقع أي تركيب تشريحي بدقة وقراءة مقاطع الأشعة المقطعية والرنين.',
      en: 'Provides a universal medical coordinate system to localize organs and interpret CT/MRI slices without ambiguity.'
    },
    whyImportant: {
      ar: 'لأن جميع صور الأشعة الطبية والعمليات الجراحية تعتمد على اتجاه هذه المستويات الثلاثة.',
      en: 'All clinical imaging (CT scans, MRI, Ultrasound) and surgical approaches are oriented along these 3 standard planes.'
    },
    howToRecognize: {
      ar: 'تذكر حركة القطع: السهمي يقسم يمين/يسار، الإكليلي يقسم أمام/خلف (مثل التاج)، والمستعرض يقسم أعلى/أسفل (أفقي).',
      en: 'Look at the division: Sagittal divides Right/Left; Coronal divides Front/Back (like a crown/tiara); Transverse cuts across Top/Bottom.'
    },
    howAppearsInExam: {
      ar: 'يأتي في أسئلة التعريف: "ما المستوى الذي يقسم الجسم إلى نصفين متساويين يمين ويسار؟" (الجواب: Median/Midsagittal)، أو تحديد نوع المقطع في صورة أشعة.',
      en: 'Definitions (e.g., "Which plane divides into equal right and left halves? -> Median Plane") or identifying the slice plane on CT/MRI.'
    },
    highYieldSummary: 'Median Plane = Equal Right & Left | Coronal = Front & Back | Transverse = Top & Bottom',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
    iconName: 'Compass',
    
    corePoints: [
      'الوضعية التشريحية القياسية (Anatomical Position): الوقوف مستقيماً، الوجه للأمام، الذراعان على الجانبين، وراحتا اليد تتجهان للأمام (Palms forward).',
      'المستوى السهمي المنصف (Median / Midsagittal): يمر بالمنتصف تماماً ويقسم الجسم لنصفين متساويين يمين ويسار.',
      'المستوى الإكليلي / الجبهي (Coronal / Frontal): يقسم الجسم إلى جزء أمامي (Anterior) وجزء خلفي (Posterior).',
      'المستوى المستعرض / الأفقي (Transverse / Horizontal / Axial): يقسم الجسم إلى جزء علوي (Superior) وجزء سفلي (Inferior).'
    ],
    highYieldExamPoints: [
      'الـ Midsagittal هو الوحيد الذي يعطي نصفين متساويين تماماً (Equal halves).',
      'المستوى الموازي له يسمى Parasagittal (يقسم لنصفين غير متساويين).',
      'أجهزة الأشعة المقطعية (CT Scans) تصور افتراضياً في المستوى المستعرض المحوري (Axial/Transverse Plane).'
    ],
    extraInfo: [
      'المستوى المائل (Oblique Plane): أي مستوى يقطع الجسم بزاوية مائلة ليست قائمة (مشهور في تصوير القلب بإيكو القلب).',
      'في الأشعة المقطعية المحورية: ننظر للمقطع من أسفل قدم المريض؛ وبالتالي يمين المريض يكون على يسار شاشتك.'
    ],

    keyStructures: [
      {
        nameEn: 'Median / Midsagittal Plane',
        nameAr: 'المستوى السهمي المنصف',
        location: 'In the exact vertical anatomical midline.',
        function: 'Divides body into equal symmetrical right and left halves.',
        howToRecognize: 'Cuts directly through nose, navel, and pubic symphysis.',
        clinicalNote: 'Best view on brain MRI to see Corpus Callosum and Brainstem.',
        level: 'CORE'
      },
      {
        nameEn: 'Coronal / Frontal Plane',
        nameAr: 'المستوى الإكليلي الجبهي',
        location: 'Vertical plane from ear to ear across the crown.',
        function: 'Divides body into anterior (front) and posterior (back).',
        howToRecognize: 'Like wearing a crown/headband cutting straight down.',
        clinicalNote: 'Standard view for paranasal sinuses and chest X-rays.',
        level: 'CORE'
      },
      {
        nameEn: 'Transverse / Axial Plane',
        nameAr: 'المستوى المستعرض الأفقي',
        location: 'Horizontal plane parallel to the ground.',
        function: 'Divides body into superior (upper) and inferior (lower).',
        howToRecognize: 'Cross-section like cutting a loaf of bread horizontally.',
        clinicalNote: 'The fundamental standard plane of CT Scans.',
        level: 'CORE'
      },
      {
        nameEn: 'Parasagittal Plane',
        nameAr: 'المستوى السهمي المجاور',
        location: 'Vertical plane parallel to the median line but off-center.',
        function: 'Divides body into unequal right and left parts.',
        howToRecognize: 'Vertical slice passing through one eye or one kidney.',
        clinicalNote: 'Used for longitudinal ultrasound of kidneys.',
        level: 'HIGH_YIELD'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'الخلط بين Median و Parasagittal',
        titleEn: 'Median vs Parasagittal',
        wrongConcept: 'الاعتقاد بأن أي مقطع سهمي يعطي نصفين متساويين.',
        correctConcept: 'فقط المستوى المنصف (Median/Midsagittal) يعطي نصفين متساويين. الموازي (Parasagittal) يعطي أجزاء غير متساوية.',
        explanation: 'كلمة Para تعني بجانب أو موازي.'
      },
      {
        titleAr: 'نسيان وضعية اليد في الوضع التشريحي',
        titleEn: 'Palms Facing Forward in Anatomical Position',
        wrongConcept: 'تخيل راحة اليد متجهة نحو الفخذين كما في الوقوف الطبيعي.',
        correctConcept: 'في الوضعية التشريحية: راحتا اليد تتجهان للأمام دائماً (Palms face anteriorly / Supinated).',
        explanation: 'هذا يجعل الإبهام وحشياً (Lateral) والخنصر إنسياً (Medial).'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'CORONAL = CROWN (Tiara)',
        meaningAr: 'الإكليلي = مثل التاج الذي يوضع على الرأس من الأذن للأذن',
        explanation: 'يقطع الرأس والجسم من جهة التاج ليقسمه إلى وجه (أمام) ومؤخرة الرأس (خلف).'
      },
      {
        phraseEn: 'SAGITTAL = ARROW (Sagitta in Latin)',
        meaningAr: 'السهمي = مثل السهم الذي يخترق الجسم من الأمام إلى الخلف في المنتصف',
        explanation: 'يقسمك لنصف أيمن ونصف أيسر.'
      }
    ],

    clinicalNote: 'Clinical Note: عند قراءة صورة الأشعة المقطعية المقطوعة مستعرضاً (Axial CT)، تخيل أنك تقف عند قدمي المريض وتنظر إلى رأسه من الأسفل.',

    keyTerms: [
      { term: 'Midsagittal Plane', meaningAr: 'المستوى السهمي المنصف', definitionEn: 'Splits body into equal right and left halves along midline.', example: 'Brain midline MRI' },
      { term: 'Coronal Plane', meaningAr: 'المستوى الإكليلي الجبهي', definitionEn: 'Splits body into anterior and posterior parts.', example: 'Chest coronal view' },
      { term: 'Transverse Plane', meaningAr: 'المستوى المستعرض الأفقي', definitionEn: 'Splits body into superior and inferior segments.', example: 'Abdominal axial CT' },
      { term: 'Anatomical Position', meaningAr: 'الوضعية التشريحية القياسية', definitionEn: 'Standing erect, facing forward, palms facing forward.', example: 'Universal medical reference' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Midsagittal Plane',
        structureNameAr: 'المستوى السهمي المنصف',
        positionX: 50,
        positionY: 25,
        whatIsIt: 'المستوى العمودي الذي يمر بمنتصف الجسم تماماً.',
        whereIsIt: 'من قمة الرأس للأسفل عبر الخط المنصف.',
        functionDesc: 'يقسم الجسم إلى نصفين متماثلين تماماً (Right & Left).',
        howToRecognize: 'يمر بالأنف والصرة وعظم القص.',
        highYieldNote: 'المستوى الوحيد الذي يعطي Equal Halves.',
        clinicalNote: 'المرجع الأساسي لتقييم انحراف الخط الناصف للدماغ (Midline Shift).',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Coronal Plane',
        structureNameAr: 'المستوى الإكليلي الجبهي',
        positionX: 75,
        positionY: 45,
        whatIsIt: 'مستوى عمودي يمر من جانب لآخر (من الأذن للأذن).',
        whereIsIt: 'متعامد مع المستوى السهمي.',
        functionDesc: 'يقسم الجسم إلى جزء أمامي (Anterior) وجزء خلفي (Posterior).',
        howToRecognize: 'يوازي الجبهة وعظام الوجه.',
        highYieldNote: 'يسمى Frontal plane أيضاً.',
        clinicalNote: 'المستوى المثالي لتقييم الجيوب الأنفية والعمود الفقري.',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Transverse (Axial) Plane',
        structureNameAr: 'المستوى المستعرض المحوري',
        positionX: 50,
        positionY: 65,
        whatIsIt: 'المستوى الأفقي الموازي للأرض.',
        whereIsIt: 'يقطع الجسم أفقياً عند أي مستوى (مثل مستوى السرة L3/L4).',
        functionDesc: 'يقسم الجسم إلى علوي (Superior) وسفلي (Inferior).',
        howToRecognize: 'مقطع عرضي دائري/بيضاوي (Cross-section).',
        highYieldNote: 'المستوى الأساسي لكل صور الأشعة المقطعية (CT).',
        clinicalNote: 'يظهر علاقة الأعضاء ببعضها حول العمود الفقري والشريان الأورطي.',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. الوضعية التشريحية تفترض دائماً أن راحتي اليدين متجهتان للأمام (Palms forward).',
      '2. المستوى السهمي المنصف (Midsagittal) = يقسم الجسم لنصفين متساويين يمين ويسار.',
      '3. المستوى الإكليلي (Coronal) = يقسم الجسم لأمامي وخلفي (Anterior & Posterior).',
      '4. المستوى المستعرض (Transverse/Axial) = يقسم الجسم لعلوي وسفلي (Superior & Inferior).',
      '5. المقطع المستعرض هو المقطع القياسي لصور الأشعة المقطعية (CT Scans).'
    ],

    practiceQuestions: [
      {
        id: 'q_planes_1',
        questionEn: 'Which anatomical plane divides the human body into equal right and left halves?',
        questionAr: 'أي مستوى تشريحي يقسم جسم الإنسان إلى نصفين متساويين يمين ويسار؟',
        options: ['Coronal plane', 'Median / Midsagittal plane', 'Transverse plane', 'Oblique plane'],
        correctAnswer: 'Median / Midsagittal plane',
        explanationAr: 'المستوى السهمي المنصف (Midsagittal) هو المستوى الوحيد الذي يمر بالمنتصف تماماً ويعطي نصفين متطابقين.',
        explanationEn: 'The Median (midsagittal) plane passes vertically directly through the midline.',
        examFocus: 'سؤال تعريفي مباشر يتكرر في امتحانات الفصل الأول.'
      },
      {
        id: 'q_planes_2',
        questionEn: 'In standard anatomical position, where do the palms of the hands face?',
        questionAr: 'في الوضعية التشريحية القياسية، إلى أي اتجاه تنظر راحتا اليدين؟',
        options: ['Posteriorly (Backward)', 'Medially (Toward thighs)', 'Anteriorly (Forward)', 'Laterally (Outward)'],
        correctAnswer: 'Anteriorly (Forward)',
        explanationAr: 'في الوضع التشريحي تكون راحتا اليدين متجهتين للأمام (Supinated / Palms forward) مما يجعل الإبهام وحشياً.',
        explanationEn: 'Palms face anteriorly (forward) with thumbs pointing laterally away from the trunk.',
        examFocus: 'أساس فهم باقي المصطلحات الاتجاهية في الطرف العلوي.'
      }
    ]
  },

  // 2. DIRECTIONAL TERMS
  {
    id: 'anat_directional_terms',
    topicNumber: 2,
    category: 'foundations',
    subCategory: 'directional_terms',
    titleEn: 'Anatomical Directional Terms',
    titleAr: 'المصطلحات الاتجاهية التشريحية',
    quickIdeaAr: 'أزواج من الكلمات المتقابلة نستخدمها لتحديد موقع أي عضو مقارنة بعضو آخر بدقة بالغة.',
    quickIdeaEn: 'Paired opposite terms used to describe relative position and relationships between body parts.',

    whatIsIt: {
      ar: 'مصطلحات طبية قياسية متقابلة (مثل: علوي/سفلي، أمامي/خلفي، إنسي/وحشي) تحدد موقع التراكيب في الجسم.',
      en: 'Standard paired opposing medical terms (Superior/Inferior, Anterior/Posterior, Medial/Lateral, Proximal/Distal).'
    },
    whereIsIt: {
      ar: 'تستخدم في جميع مناطق الجسم وتنسب دائماً إلى الوضعية التشريحية القياسية.',
      en: 'Applied throughout the whole body always referencing standard anatomical position.'
    },
    whatDoesItDo: {
      ar: 'تمنع أي لبس أو سوء فهم عند وصف موقع ورم أو جرح أو علاقة شريان بعصب.',
      en: 'Eliminates ambiguity when describing anatomical locations, surgical landmarks, and pathologies.'
    },
    whyImportant: {
      ar: 'لأنك كطبيب لا تستطيع قول "العضو الفلاني فوق أو تحت" بدون تحديد المرجع الطبي القياسي.',
      en: 'Medical documentation, imaging reports, and surgery rely entirely on precise relative terminology.'
    },
    howToRecognize: {
      ar: 'احفظها في أزواج متقابلة: Medial ضد Lateral، و Proximal ضد Distal، و Anterior ضد Posterior.',
      en: 'Learn them as opposing pairs: Superior/Inferior, Anterior/Posterior, Medial/Lateral, Proximal/Distal, Superficial/Deep.'
    },
    howAppearsInExam: {
      ar: 'أسئلة مقارنة: "عظم الكعبرة (Radius) يقع وحشياً (Lateral) بالنسبة لعظم الزند (Ulna)"، أو أسئلة الأطراف (Proximal/Distal).',
      en: 'Comparison questions: "The elbow is Proximal to the wrist" or "The thumb is Lateral to the pinky".'
    },
    highYieldSummary: 'Medial = closer to midline | Lateral = away | Proximal = closer to trunk | Distal = farther',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    iconName: 'Move3d',

    corePoints: [
      'علوي / قحفي (Superior / Cranial): أقرب إلى الرأس أو للأعلى (القلب علوي بالنسبة للمعدة).',
      'سفلي / ذيلي (Inferior / Caudal): أقرب إلى القدمين أو للأسفل (المعدة سفلية بالنسبة للقلب).',
      'أمامي / بطني (Anterior / Ventral): باتجاه مقدمة الجسم (عظم القص أمامي للقلب).',
      'خلفي / ظهري (Posterior / Dorsal): باتجاه ظهر الجسم (المريء خلفي للقصبة الهوائية).',
      'إنسي (Medial): أقرب إلى خط منتصف الجسم (عظم القص إنسي للكتفين).',
      'وحشي (Lateral): أبعد عن خط منتصف الجسم (الكتف وحشي بالنسبة لعظم القص).',
      'داني / قريب (Proximal): خاص بالأطراف، أقرب إلى منشأ الطرف أو الجذع (المرفق داني بالنسبة للرسغ).',
      'قاصي / بعيد (Distal): خاص بالأطراف، أبعد عن منشأ الطرف أو الجذع (الأصابع قاصية بالنسبة للمرفق).'
    ],
    highYieldExamPoints: [
      'Proximal و Distal تستخدم للأطراف حصراً (Limbs / Extremities) بناءً على نقطة الاتصال بالجذع.',
      'في الذراع بالوضع التشريحي: عظم الكعبرة (Radius / جهة الإبهام) هو Lateral، وعظم الزند (Ulna / جهة الخنصر) هو Medial.',
      'في الساق: عظم القصبة (Tibia) هو Medial، وعظم الشظية (Fibula) هو Lateral.'
    ],
    extraInfo: [
      'سطحي (Superficial): أقرب لسطح الجلد | عميق (Deep): أبعد عن الجلد وغائر في الداخل.',
      'في نفس الجانب (Ipsilateral) | في الجانب المقابل (Contralateral) - شائع في طب الأعصاب والسكتات.'
    ],

    keyStructures: [
      {
        nameEn: 'Medial (Toward Midline)',
        nameAr: 'إنسي (باتجاه الخط المنصف)',
        location: 'Closer to the median plane of the body.',
        function: 'Describes structures situated toward the central axis.',
        howToRecognize: 'Points toward your spine or sternum.',
        clinicalNote: 'Ulna and Tibia are medial bones in their respective limbs.',
        level: 'CORE'
      },
      {
        nameEn: 'Lateral (Away from Midline)',
        nameAr: 'وحشي (بعيداً عن الخط المنصف)',
        location: 'Farther away from the median plane of the body.',
        function: 'Describes structures situated toward the side.',
        howToRecognize: 'Points outward toward your sides/flanks.',
        clinicalNote: 'The thumb and Radius are lateral in anatomical position.',
        level: 'CORE'
      },
      {
        nameEn: 'Proximal (Nearer Limb Root)',
        nameAr: 'داني (أقرب لجذر الطرف)',
        location: 'Nearer to the attachment of a limb to the trunk.',
        function: 'Limb localization relative to shoulder or hip joint.',
        howToRecognize: 'Closer to shoulder/hip along the arm or leg.',
        clinicalNote: 'Femoral neck fracture is a proximal femur injury.',
        level: 'CORE'
      },
      {
        nameEn: 'Distal (Farther from Limb Root)',
        nameAr: 'قاصي (أبعد عن جذر الطرف)',
        location: 'Farther away from limb attachment to the trunk.',
        function: 'Limb localization toward fingers or toes.',
        howToRecognize: 'Closer to fingertips or toes.',
        clinicalNote: 'Colles fracture is a fracture of the distal radius.',
        level: 'CORE'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'الخلط بين Medial و Lateral',
        titleEn: 'Medial vs Lateral Confusion',
        wrongConcept: 'الاعتقاد بأن الإبهام إنسي (Medial).',
        correctConcept: 'الإبهام وحشي دائماً (Lateral) في الوضعية التشريحية لأن راحة اليد للأمام.',
        explanation: 'الخنصر هو الأقرب لمنتصف الجسم (Medial).'
      },
      {
        titleAr: 'استخدام Superior/Inferior للأطراف بدلاً من Proximal/Distal',
        titleEn: 'Superior vs Proximal in Limbs',
        wrongConcept: 'قول "The hand is inferior to the elbow".',
        correctConcept: 'في الأطراف نقول: "The hand is distal to the elbow".',
        explanation: 'المصطلحات القياسية للأطراف هي Proximal و Distal.'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'PROXIMAL = In PROXIMITY to the body trunk',
        meaningAr: 'Proximal = في قُرب (Proximity) من الجذع',
        explanation: 'وكلمة Distal من Distance (مسافة بعيدة عن الجذع).'
      },
      {
        phraseEn: 'MEDIAL = MIDLINE',
        meaningAr: 'Medial يبدأ بحرف M مثل Midline (خط المنتصف)',
        explanation: 'أي أنه يتجه نحو خط الوسط.'
      }
    ],

    clinicalNote: 'Clinical Note: في فحص النبض المحيطي، نتحسس الشريان الكعبري في الجزء القاصي والوحشي من الساعد (Distal Lateral Forearm).',

    keyTerms: [
      { term: 'Superior / Cranial', meaningAr: 'علوي / قحفي', definitionEn: 'Toward the head or upper part of structure.', example: 'Heart is superior to liver' },
      { term: 'Inferior / Caudal', meaningAr: 'سفلي / ذيلي', definitionEn: 'Away from the head / toward lower part.', example: 'Stomach is inferior to lungs' },
      { term: 'Anterior / Ventral', meaningAr: 'أمامي / بطني', definitionEn: 'Toward or at the front of the body.', example: 'Sternum is anterior to aorta' },
      { term: 'Posterior / Dorsal', meaningAr: 'خلفي / ظهري', definitionEn: 'Toward or at the back of the body.', example: 'Vertebra is posterior to aorta' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Superior Pole (Cranial)',
        structureNameAr: 'القطب العلوي',
        positionX: 50,
        positionY: 15,
        whatIsIt: 'الاتجاه نحو قمة الرأس والأعلى.',
        whereIsIt: 'أعلى جزء من التركيب التشريحي.',
        functionDesc: 'يحدد العلاقة العلوية للأعضاء.',
        howToRecognize: 'يتجه للأعلى بعيداً عن القدمين.',
        highYieldNote: 'يسمى Cranial أو Cephalic أيضاً.',
        clinicalNote: 'القطب العلوي للكلية تقع عليه الغدة الكظرية.',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Medial Border (Midline)',
        structureNameAr: 'الحافة الإنسية',
        positionX: 42,
        positionY: 50,
        whatIsIt: 'الحافة الأقرب لخط منتصف الجسم.',
        whereIsIt: 'باتجاه المحور المركزي.',
        functionDesc: 'تحديد موقع التراكيب الداخلية.',
        howToRecognize: 'تتجه نحو العمود الفقري أو القص.',
        highYieldNote: 'عظم الزند (Ulna) هو العظم الإنسي في الساعد.',
        clinicalNote: 'الوريد الصافن الكبير يمر على الحافة الإنسية للكاحل.',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Lateral Border (Outward)',
        structureNameAr: 'الحافة الوحشية',
        positionX: 68,
        positionY: 50,
        whatIsIt: 'الحافة الأبعد عن خط منتصف الجسم.',
        whereIsIt: 'باتجاه جوانب الجسم الخارجية.',
        functionDesc: 'تحديد موقع التراكيب الخارجية.',
        howToRecognize: 'تتجه نحو الجوانب بعيداً عن المنتصف.',
        highYieldNote: 'عظم الكعبرة (Radius) هو العظم الوحشي في الساعد.',
        clinicalNote: 'جس النبض الكعبري يتم على الحافة الوحشية.',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. Superior = للأعلى / نحو الرأس | Inferior = للأسفل / نحو القدمين.',
      '2. Anterior = للأمام / جهة البطن | Posterior = للخلف / جهة الظهر.',
      '3. Medial = أقرب لخط المنتصف (Midline) | Lateral = أبعد عن خط المنتصف.',
      '4. Proximal = أقرب للجذع (في الأطراف) | Distal = أبعد عن الجذع.',
      '5. عظم الكعبرة (Radius) والإبهام يقعان في الجانب الوحشي (Lateral side).'
    ],

    practiceQuestions: [
      {
        id: 'q_dir_1',
        questionEn: 'Which bone is located MEDIAL in the anatomical position of the forearm?',
        questionAr: 'أي عظم يقع في الجانب الإنسي (Medial) في الساعد بالوضعية التشريحية؟',
        options: ['Radius', 'Ulna', 'Humerus', 'Clavicle'],
        correctAnswer: 'Ulna',
        explanationAr: 'عظم الزند (Ulna) يقع في الجانب الإنسي (Medial) باتجاه الخنصر، بينما الكعبرة (Radius) وحشي (Lateral).',
        explanationEn: 'In anatomical position, the Ulna is medial (pinky side) and the Radius is lateral (thumb side).',
        examFocus: 'سؤال كلاسيكي في كل امتحانات التشريح العملي والنظري.'
      },
      {
        id: 'q_dir_2',
        questionEn: 'The elbow is __________ to the wrist.',
        questionAr: 'مفصل المرفق يعتبر __________ بالنسبة لمفصل الرسغ.',
        options: ['Distal', 'Proximal', 'Inferior', 'Lateral'],
        correctAnswer: 'Proximal',
        explanationAr: 'المرفق أقرب إلى الجذع ونقطة اتصال الذراع بالكتف، لذلك هو Proximal بالنسبة للرسغ.',
        explanationEn: 'The elbow is nearer to the trunk attachment than the wrist, making it Proximal.',
        examFocus: 'استخدام مصطلحات الأطراف الصحيحة (Proximal vs Distal).'
      }
    ]
  },

  // 3. BODY MOVEMENTS
  {
    id: 'anat_movements',
    topicNumber: 3,
    category: 'foundations',
    subCategory: 'movements',
    titleEn: 'Body Movements & Joint Actions',
    titleAr: 'حركات الجسم والمفاصل',
    quickIdeaAr: 'الحركات الميكانيكية التي تنتجها العضلات عند المفاصل (انثناء، بسط، تبعيد، تقريب، دوران، وكب/استلقاء).',
    quickIdeaEn: 'Mechanical actions performed by skeletal muscles at joints across anatomical planes.',

    whatIsIt: {
      ar: 'مصطلحات تصف الحركة التي تقوم بها المفاصل والعضلات عند انقباضها (مثل ثني الذراع أو رفع الساق).',
      en: 'Standard terminology describing changes in joint angles and limb positions caused by muscle contractions.'
    },
    whereIsIt: {
      ar: 'تحدث عند المفاصل الزلالية (Synovial joints) في الرقبة والكتف والمرفق والورك والركبة والكاحل.',
      en: 'Occurs at synovial joints throughout the axial and appendicular skeleton.'
    },
    whatDoesItDo: {
      ar: 'تسمح للإنسان بالمشي، الإمساك بالأشياء، والقيام بجميع الأنشطة اليومية الحركية.',
      en: 'Enables locomotion, grasping, manipulation of objects, and maintaining posture.'
    },
    whyImportant: {
      ar: 'ضرورية جداً لفهم وظائف العضلات (Muscle Action) والتشخيص في جراحة العظام والعلاج الطبيعي.',
      en: 'Essential to understand muscle actions, neurological reflexes, orthopedic tests, and physical rehabilitation.'
    },
    howToRecognize: {
      ar: 'تذكر: Flexion يقلل زاوية المفصل (ثني)، Extension يزيد الزاوية (فرد)، Abduction يبعد عن الجسم، Adduction يقرب للجسم.',
      en: 'Flexion = decreases joint angle (bending); Extension = increases joint angle (straightening); Abduction = moving away; Adduction = adding to midline.'
    },
    howAppearsInExam: {
      ar: 'سؤال عن حركة عضلة معينة: "ما هي الحركة الأساسية لعضلة Biceps؟" (الجواب: ثني المرفق Flexion واستلقاء الساعد Supination).',
      en: 'Matching a muscle to its joint action or identifying the movement shown in an illustration.'
    },
    highYieldSummary: 'Flexion = decrease angle | Extension = increase angle | Abduction = away | Adduction = toward midline',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
    iconName: 'Activity',

    corePoints: [
      'الانثناء (Flexion): حركة تقلل زاوية المفصل في المستوى السهمي (مثل ثني المرفق أو الركبة).',
      'البسط (Extension): حركة تزيد زاوية المفصل وتعيد الطرف لوضعه المستقيم.',
      'التبعيد (Abduction): تحريك الطرف بعيداً عن خط منتصف الجسم في المستوى الإكليلي.',
      'التقريب (Adduction): تحريك الطرف باتجاه خط منتصف الجسم وإعادته للداخل.',
      'الدوران الإنسي والوحشي (Medial & Lateral Rotation): تدوير العظم حول محوره الطولي للداخل أو للخارج.'
    ],
    highYieldExamPoints: [
      'الاستلقاء (Supination): دوران الساعد لتصبح راحة اليد للأمام (كما تحمل وعاء حساء Soup).',
      'الكَبّ (Pronation): دوران الساعد لتصبح راحة اليد للخلف (الـ Radius يتقاطع فوق الـ Ulna).',
      'حركات القدم: Inversion (قلب باطن القدم للداخل) و Eversion (قلب باطن القدم للخارج).'
    ],
    extraInfo: [
      'الدوران المحيطي (Circumduction): حركة مخروطية تجمع بين (Flexion + Abduction + Extension + Adduction) كما في الكتف والورك.',
      'المقابلة (Opposition): حركة الإبهام للمس أطراف الأصابع الأخرى في اليد.'
    ],

    keyStructures: [
      {
        nameEn: 'Flexion vs. Extension',
        nameAr: 'الانثناء مقابل البسط',
        location: 'Elbow, Knee, Shoulder, Hip, Fingers.',
        function: 'Bending (decreasing angle) vs Straightening (increasing angle).',
        howToRecognize: 'Occurs primarily in the Sagittal plane.',
        clinicalNote: 'Biceps flexes the elbow; Triceps extends the elbow.',
        level: 'CORE'
      },
      {
        nameEn: 'Abduction vs. Adduction',
        nameAr: 'التبعيد مقابل التقريب',
        location: 'Shoulder joint, Hip joint, Fingers.',
        function: 'Moving away from midline vs Moving toward midline.',
        howToRecognize: 'Occurs in the Coronal plane.',
        clinicalNote: 'Deltoid abducts the arm (15°-90°); Pectoralis major adducts.',
        level: 'CORE'
      },
      {
        nameEn: 'Supination vs. Pronation',
        nameAr: 'الاستلقاء مقابل الكَبّ',
        location: 'Radioulnar joints of the forearm.',
        function: 'Palm facing anteriorly (Supine) vs Palm facing posteriorly (Prone).',
        howToRecognize: 'Turning a doorknob or using a screwdriver.',
        clinicalNote: 'Biceps brachii is the most powerful supinator of flexed forearm.',
        level: 'HIGH_YIELD'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'الخلط بين Abduction و Adduction',
        titleEn: 'Abduction vs Adduction',
        wrongConcept: 'الخلط بين الحرفين b و d.',
        correctConcept: 'ADduction تعني إضافة الطرف للجسم (Adding to the midline / يقرب). ABduction تعني إبعاد الطرف (Away / يبعد).',
        explanation: 'تذكر كلمة ADD = يضيف إلى الجذع.'
      },
      {
        titleAr: 'الخلط بين Supination و Pronation',
        titleEn: 'Supination vs Pronation',
        wrongConcept: 'نسيان أي منهما يجعل راحة اليد للأعلى.',
        correctConcept: 'Supination = راحة اليد للأعلى/للأمام (كأنك تمسك وعاء Soup). Pronation = راحة اليد للأسفل/للخلف.',
        explanation: 'Supination = Hold Soup.'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'SUPINATION = Holding a bowl of SOUP',
        meaningAr: 'Supination تشبه كلمة Soup (تمسك راحة يدك للأعلى لتحمل صحن حساء)',
        explanation: 'أما Pronation فهي كبّ الحساء وقلب اليد للأسفل.'
      },
      {
        phraseEn: 'ADDUCTION = ADDS the limb to the body',
        meaningAr: 'Adduction = يضيف الطرف لخط الوسط',
        explanation: 'يقرب الذراع أو الساق نحو الجذع.'
      }
    ],

    clinicalNote: 'Clinical Note: أكثر إصابات الكاحل شيوعاً تحدث بسبب التواء باطن القدم للداخل بقوة (Excessive Inversion)، مما يمزق الرباط الشظوي الكاحلي الأمامي (ATFL).',

    keyTerms: [
      { term: 'Flexion', meaningAr: 'الانثناء', definitionEn: 'Bending movement that decreases the angle between bones.', example: 'Biceps curl' },
      { term: 'Extension', meaningAr: 'البسط', definitionEn: 'Straightening movement that increases the angle between bones.', example: 'Straightening knee' },
      { term: 'Supination', meaningAr: 'الاستلقاء', definitionEn: 'Forearm rotation placing the palm anteriorly / upward.', example: 'Carrying a tray' },
      { term: 'Pronation', meaningAr: 'الكَبّ', definitionEn: 'Forearm rotation placing the palm posteriorly / downward.', example: 'Typing on keyboard' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Elbow Flexion & Extension Axis',
        structureNameAr: 'مفصل المرفق (الانثناء والبسط)',
        positionX: 35,
        positionY: 40,
        whatIsIt: 'مفصل رزي (Hinge joint) أحادي المحور.',
        whereIsIt: 'بين عظم العضد وعظمي الساعد.',
        functionDesc: 'يسمح بحركتي الانثناء (Flexion) والبسط (Extension).',
        howToRecognize: 'يتحرك كالمفصلة في المستوى السهمي فقط.',
        highYieldNote: 'عضلة Biceps تثني وعضلة Triceps تبسط.',
        clinicalNote: 'خلع المرفق الخلفي شائع عند السقوط على يد ممدودة.',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Radioulnar Joint (Pronation / Supination)',
        structureNameAr: 'المفصل الكعبري الزندي (الكب والاستلقاء)',
        positionX: 40,
        positionY: 55,
        whatIsIt: 'مفصل مداري (Pivot joint).',
        whereIsIt: 'بين رأس الكعبرة وعظم الزند.',
        functionDesc: 'يدور رأس الكعبرة ليقلب راحة اليد للأمام أو للخلف.',
        howToRecognize: 'دوران الكعبرة فوق الزند.',
        highYieldNote: 'Supination = راحة اليد للأمام | Pronation = راحة اليد للخلف.',
        clinicalNote: 'الرباط الحلقي (Annular ligament) يثبت رأس الكعبرة أثناء الدوران.',
        level: 'HIGH_YIELD'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Subtalar Joint (Inversion / Eversion)',
        structureNameAr: 'المفصل تحت الكاحل (القلب للداخل والخارج)',
        positionX: 52,
        positionY: 85,
        whatIsIt: 'مفصل بين عظم الكاحل (Talus) وعظم العقب (Calcaneus).',
        whereIsIt: 'في القدم تحت مفصل الكاحل الحقيقي.',
        functionDesc: 'مسؤول عن حركتي Inversion (للمنتصف) و Eversion (للخارج).',
        howToRecognize: 'حركة باطن القدم أثناء المشي على أرض غير مستوية.',
        highYieldNote: 'Inversion = قلب القدم للداخل | Eversion = للخارج.',
        clinicalNote: 'الالتواء الشديد بالـ Inversion هو سبب 90% من التواءات الكاحل.',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. Flexion = يقلل زاوية المفصل (ثني) | Extension = يزيد زاوية المفصل (فرد).',
      '2. Abduction = إبعاد عن خط المنتصف | Adduction = تقريب نحو خط المنتصف.',
      '3. Supination = راحة اليد للأعلى/للأمام | Pronation = راحة اليد للأسفل/للخلف.',
      '4. Inversion = باطن القدم يتجه للداخل (إنسياً) | Eversion = باطن القدم يتجه للخارج (وحشياً).',
      '5. الـ Biceps هي العضلة الأقوى في استلقاء الساعد (Supination) مع ثني المرفق.'
    ],

    practiceQuestions: [
      {
        id: 'q_mov_1',
        questionEn: 'Which movement turns the palm of the hand to face anteriorly (or upward)?',
        questionAr: 'أي حركة تدير راحة اليد لتتجه للأمام (أو للأعلى)؟',
        options: ['Pronation', 'Supination', 'Inversion', 'Adduction'],
        correctAnswer: 'Supination',
        explanationAr: 'حركة الاستلقاء (Supination) تجعل راحة اليد متجهة للأمام أو للأعلى، وتذكر (Holding Soup).',
        explanationEn: 'Supination rotates the radius laterally so the palm faces anteriorly in anatomical position.',
        examFocus: 'سؤال متكرر حول حركات الساعد.'
      },
      {
        id: 'q_mov_2',
        questionEn: 'Moving the upper limb laterally away from the midline of the body in the coronal plane is called:',
        questionAr: 'تحريك الطرف العلوي جانبياً بعيداً عن خط منتصف الجسم في المستوى الإكليلي يسمى:',
        options: ['Adduction', 'Abduction', 'Flexion', 'Medial Rotation'],
        correctAnswer: 'Abduction',
        explanationAr: 'التبعيد (Abduction) هو تحريك الطرف بعيداً عن الجسم (Away from midline).',
        explanationEn: 'Abduction moves a bone away from the midline of the body.',
        examFocus: 'التمييز الدقيق بين Abduction و Adduction.'
      }
    ]
  },

  // 4. SKELETAL SYSTEM (FEMUR & GENERAL OSTEOLOGY)
  {
    id: 'anat_skeletal',
    topicNumber: 4,
    category: 'musculoskeletal',
    subCategory: 'skeletal',
    titleEn: 'The Skeletal System & Osteology',
    titleAr: 'الجهاز الهيكلي وعلم العظام',
    quickIdeaAr: 'الهيكل العظمي البشري المكون من 206 عظمة مقسمة إلى هيكل محوري (80 عظمة) وهيكل طرفي (126 عظمة).',
    quickIdeaEn: 'The adult human framework composed of 206 bones divided into Axial and Appendicular skeletons.',

    whatIsIt: {
      ar: 'الجهاز العظمي هو الدعامة الصلبة لجسم الإنسان، ويتكون من 206 عظمة تحمي الأعضاء وتنتج خلايا الدم وتخزن الكالسيوم.',
      en: 'The rigid framework of 206 bones providing structural support, organ protection, mineral storage, and hematopoiesis.'
    },
    whereIsIt: {
      ar: 'ينتشر في كامل الجسم وينقسم إلى قسمين: محوري (الجمجمة والعمود الفقري والقفص الصدري) وطرفي (الأطراف العلوية والسفلية).',
      en: 'Distributed throughout the entire body divided into Axial (head & trunk) and Appendicular (limbs & girdles).'
    },
    whatDoesItDo: {
      ar: 'يدعم الجسم، يحمي الأعضاء الحيوية (المخ والقلب والرئتين)، يوفر روافع لحركة العضلات، ويصنع الدم في نقي العظام.',
      en: 'Supports body mass, protects vital organs (brain, heart, lungs), acts as levers for locomotion, and produces blood cells.'
    },
    whyImportant: {
      ar: 'بدون الهيكل العظمي لا يمكن للإنسان الوقوف أو الحركة، وأي كسر فيه يعيق النشاط اليومي فوراً.',
      en: 'Fundamental for human biomechanics, calcium homeostasis, and understanding fractures in clinical practice.'
    },
    howToRecognize: {
      ar: 'تعرف على شكل العظام: طويلة (مثل الفخذ والعضد)، قصيرة (الرسغ)، مسطحة (الجمجمة والقص)، وغير منتظمة (الفقرات).',
      en: 'Classify by shape: Long bones (Femur, Humerus), Short (Carpals), Flat (Skull, Sternum), Irregular (Vertebrae), Sesamoid (Patella).'
    },
    howAppearsInExam: {
      ar: 'أسئلة تحديد العظام ومعالمها: رأس الفخذ (Femur Head)، الكعبرة، عظم القص، أو تصنيف العظام وعددها (206 عظمة).',
      en: 'Identifying bone specimens/pins in OSPE spotters (e.g. Femur head, Greater trochanter) and classifying bone types.'
    },
    highYieldSummary: 'Femur = Longest & strongest bone in body | Total bones = 206 | Axial (80) + Appendicular (126)',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
    iconName: 'Bone',

    corePoints: [
      'عدد عظام الإنسان البالغ = 206 عظمة.',
      'الهيكل المحوري (Axial Skeleton = 80 عظمة): الجمجمة (Skull)، العمود الفقري (Vertebral column)، وعظم القص والأضلاع (Ribs & Sternum).',
      'الهيكل الطرفي (Appendicular Skeleton = 126 عظمة): حزام الكتف والطرفان العلويان، وحزام الحوض والطرفان السفليان.',
      'عظم الفخذ (Femur): أطول وأقوى عظمة في جسم الإنسان وتوجد في الفخذ (Thigh).',
      'أجزاء العظم الطويل: جسم العظم (Diaphysis)، النهايات المتوسعة (Epiphyses)، وغضروف النمو (Metaphysis/Epiphyseal plate).'
    ],
    highYieldExamPoints: [
      'عظم الفخذ يتميز برأس كروي يتمفصل مع الحُقّ (Acetabulum) في الحوض، ومدورين كبير وصغير (Greater & Lesser Trochanters).',
      'العظام السمسمانية (Sesamoid bones): عظام صغيرة تتشكل داخل الأوتار لتقليل الاحتكاك، وأكبر مثال لها الرضفة (Patella).',
      'نقي العظام الأحمر (Red Bone Marrow): مسؤول عن تصنيع كريات الدم الحمراء والبيضاء والصفائح الدموية.'
    ],
    extraInfo: [
      'السمحاق (Periosteum): غشاء ليفي غني بالأعصاب والأوعية يغطي العظم من الخارج ومسؤول عن تغذيته وإحساس الألم عند الكسور.',
      'جهاز هافرس (Osteon): الوحدة البنائية المجهرية للعظم الكثيف.'
    ],

    keyStructures: [
      {
        nameEn: 'Femur (Thigh Bone)',
        nameAr: 'عظم الفخذ',
        location: 'In the thigh (lower limb between hip and knee).',
        function: 'Supports body weight and provides leverage for walking and running.',
        howToRecognize: 'Longest bone with rounded head and large distal condyles.',
        clinicalNote: 'Fracture of the femoral neck in elderly can disrupt blood supply to head.',
        level: 'CORE'
      },
      {
        nameEn: 'Femur Head & Neck',
        nameAr: 'رأس وعنق عظم الفخذ',
        location: 'Proximal end of the femur.',
        function: 'Articulates with acetabulum forming the hip joint ball-and-socket.',
        howToRecognize: 'Smooth hemispherical ball connected by an angled neck.',
        clinicalNote: 'Avascular necrosis occurs if retinacular arteries are torn.',
        level: 'CORE'
      },
      {
        nameEn: 'Greater & Lesser Trochanters',
        nameAr: 'المدور الكبير والمدور الصغير',
        location: 'At the junction of femoral neck and shaft.',
        function: 'Major attachment sites for hip rotator and gluteal muscles.',
        howToRecognize: 'Large bony prominences palpable at the lateral upper thigh.',
        clinicalNote: 'Gluteus medius inserts on greater trochanter (prevents pelvic drop).',
        level: 'HIGH_YIELD'
      },
      {
        nameEn: 'Patella (Kneecap)',
        nameAr: 'الرضفة (صابونة الركبة)',
        location: 'Anterior to the knee joint embedded in quadriceps tendon.',
        function: 'Largest sesamoid bone; increases mechanical leverage of quadriceps.',
        howToRecognize: 'Triangular flat bone on front of knee.',
        clinicalNote: 'Protects the knee joint from direct trauma.',
        level: 'CORE'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'الخلط بين عظم الفخذ (Femur) وعظم العضد (Humerus)',
        titleEn: 'Femur vs Humerus Identification',
        wrongConcept: 'الخلط بينهما في الامتحان العملي (OSPE) عند فحص العظام المعزولة.',
        correctConcept: 'عظم الفخذ أطول بكثير، ورأسه كروي جداً وله عنق واضح ومدوران بارزان (Trochanters). العضد رأسه نصف كروي وعنقه قصير وله حديبتان (Tubercles).',
        explanation: 'الفخذ = Trochanters | العضد = Tubercles.'
      },
      {
        titleAr: 'الخلط بين عدد عظام الهيكل المحوري والطرفي',
        titleEn: 'Axial vs Appendicular Bone Counts',
        wrongConcept: 'نسيان أن المحوري 80 والطرفي 126.',
        correctConcept: 'المجموع 206 عظمة (80 محوري + 126 طرفي).',
        explanation: 'تذكر أن الأطراف والأصابع كثيرة (126 عظمة).'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'FEMUR = FIRST in length (Longest bone)',
        meaningAr: 'Femur يبدأ بحرف F مثل First = الأطول والأقوى في الجسم',
        explanation: 'عظم الفخذ هو أطول عظم ويشكل حوالي ربع طول الإنسان.'
      },
      {
        phraseEn: 'TROCHANTERS on Femur, TUBERCLES on Humerus',
        meaningAr: 'المدورين (Trochanters) في الفخذ فقط، والحديبتين (Tubercles) في العضد',
        explanation: 'وسيلة سريعة للتمييز في المحطات العملية.'
      }
    ],

    clinicalNote: 'Clinical Note: كسر عنق الفخذ (Neck of Femur) عند كبار السن قد يقطع الشرايين المغذية لرأس الفخذ ويؤدي إلى تموّت العظم (Avascular Necrosis).',

    keyTerms: [
      { term: 'Axial Skeleton', meaningAr: 'الهيكل العظمي المحوري', definitionEn: '80 bones along central axis: skull, vertebrae, ribs, sternum.', example: 'Vertebral column' },
      { term: 'Appendicular Skeleton', meaningAr: 'الهيكل العظمي الطرفي', definitionEn: '126 bones of upper/lower limbs and pectoral/pelvic girdles.', example: 'Femur, Humerus' },
      { term: 'Diaphysis', meaningAr: 'جسم العظم (العمود العظمي)', definitionEn: 'The shaft or central main body of a long bone.', example: 'Femoral shaft' },
      { term: 'Epiphysis', meaningAr: 'مشاشة العظم (النهاية المتوسعة)', definitionEn: 'The expanded end of a long bone articulating with another.', example: 'Head of femur' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Head of Femur (Caput Femoris)',
        structureNameAr: 'رأس عظم الفخذ',
        positionX: 45,
        positionY: 20,
        whatIsIt: 'نهاية كروية ملساء مغطاة بغضروف زلالي.',
        whereIsIt: 'في الجزء الداني والإنسي من عظم الفخذ.',
        functionDesc: 'يتمفصل مع حُق الحوض ليشكل مفصل الورك الكروي.',
        howToRecognize: 'كرة ملساء بارزة ترتبط بعنق عظمي مائل.',
        highYieldNote: 'يحتوي على حفرة صغيرة (Fovea capitis) لرباط الرأس.',
        clinicalNote: 'التموت اللاوعائي يحدث عند تلف الشرايين المنعطفة.',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Greater Trochanter',
        structureNameAr: 'المدور الكبير',
        positionX: 62,
        positionY: 28,
        whatIsIt: 'بروز عظمي ضخم وغير منتظم.',
        whereIsIt: 'في الجانب الوحشي العلوي لعظم الفخذ.',
        functionDesc: 'مرتكز لعضلات الإلية (Gluteus medius & minimus).',
        howToRecognize: 'يمكن جسه بسهولة على الجانب الخارجي لأعلى الفخذ.',
        highYieldNote: 'علامة تشريحية مهمة لحقن العضل وحساب محاذاة الورك.',
        clinicalNote: 'التهاب الجراب المدوري (Trochanteric bursitis) يسبب ألماً جانبياً.',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Shaft of Femur (Diaphysis)',
        structureNameAr: 'جسم عظم الفخذ',
        positionX: 52,
        positionY: 55,
        whatIsIt: 'عمود عظمي طويل وأسطواني مقوس قليلاً للأمام.',
        whereIsIt: 'بين رأس الفخذ والنهاية السفلية عند الركبة.',
        functionDesc: 'تحمل ثقل الجسم بالكامل وتوفير منشأ لعضلات الفخذ.',
        howToRecognize: 'عظم صلب سميك يحتوي على الخط الخشن (Linea Aspera) بالخلف.',
        highYieldNote: 'الخط الخشن (Linea Aspera) بالخلف مرتكز عضلات التقريب.',
        clinicalNote: 'كسر جسم الفخذ يمكن أن يفقد المريض حتى 1.5 لتر دم.',
        level: 'CORE'
      },
      {
        pinNumber: 4,
        structureNameEn: 'Medial & Lateral Condyles of Femur',
        structureNameAr: 'لقمتي الفخذ الإنسية والوحشية',
        positionX: 50,
        positionY: 88,
        whatIsIt: 'كتلتان عظميتان مفصليتان ضخمتان في أسفل الفخذ.',
        whereIsIt: 'في النهاية القاصية لعظم الفخذ عند مفصل الركبة.',
        functionDesc: 'تتمفصلان مع عظم القصبة (Tibia) لتشكيل مفصل الركبة.',
        howToRecognize: 'بكرتان ملساء منحنbackward ومفصولتان بحفرة (Intercondylar fossa).',
        highYieldNote: 'اللقمة الإنسية أكبر قليلاً وتلعب دوراً في قفل الركبة (Screw-home).',
        clinicalNote: 'تتصل بهما الأربطة الصليبية (ACL و PCL).',
        level: 'HIGH_YIELD'
      }
    ],

    quickReviewPoints: [
      '1. عظم الفخذ (Femur) = أطول وأثقل وأقوى عظمة في جسم الإنسان.',
      '2. يقع في الفخذ (Thigh) ويتمفصل بالأعلى مع الحوض وبالأسفل مع القصبة والرضفة.',
      '3. أجزاؤه الرئيسية: الرأس (Head)، العنق (Neck)، المدوران (Trochanters)، الجسم (Shaft)، واللقمتان (Condyles).',
      '4. الهيكل العظمي يتكون من 206 عظمة (80 محوري + 126 طرفي).',
      '5. الرضفة (Patella) = أكبر عظم سمسماني (Sesamoid) داخل وتر العضلة مربعة الرؤوس.'
    ],

    practiceQuestions: [
      {
        id: 'q_skel_1',
        questionEn: 'What is the longest and strongest bone in the human body?',
        questionAr: 'ما هي أطول وأقوى عظمة في جسم الإنسان؟',
        options: ['Humerus', 'Femur', 'Tibia', 'Fibula'],
        correctAnswer: 'Femur',
        explanationAr: 'عظم الفخذ (Femur) هو أطول وأقوى عظم في الجسم ويتحمل ثقل وزن الجسم أثناء الحركة.',
        explanationEn: 'The Femur (thigh bone) is the longest, heaviest, and strongest bone in the human body.',
        examFocus: 'سؤال تعريفي أولي أساسي لكل طالب طب سنة أولى.'
      },
      {
        id: 'q_skel_2',
        questionEn: 'Which of the following bones belongs to the AXIAL skeleton?',
        questionAr: 'أي من العظام التالية تنتمي إلى الهيكل العظمي المحوري (Axial Skeleton)؟',
        options: ['Femur', 'Scapula', 'Sternum (Breastbone)', 'Radius'],
        correctAnswer: 'Sternum (Breastbone)',
        explanationAr: 'عظم القص (Sternum) هو جزء من القفص الصدري التابع للهيكل المحوري (80 عظمة).',
        explanationEn: 'The sternum, along with skull, ribs, and vertebrae, forms the axial skeleton.',
        examFocus: 'التمييز السريع بين العظام المحورية والطرفية.'
      }
    ]
  },

  // 5. JOINTS & ARTICULATIONS
  {
    id: 'anat_joints',
    topicNumber: 5,
    category: 'musculoskeletal',
    subCategory: 'joints',
    titleEn: 'Joints & Articulations',
    titleAr: 'المفاصل وتصنيفاتها (Articulations)',
    quickIdeaAr: 'نقاط التقاء عظمتين أو أكثر، وتصنف وظيفياً وتركيبياً إلى ليفية (عديمة الحركة)، غضروفية (محدودة)، وزلالية (حرة الحركة).',
    quickIdeaEn: 'Connections between bones classified structurally into Fibrous, Cartilaginous, and Synovial.',

    whatIsIt: {
      ar: 'المفصل هو نقطة اتصال بين عظمتين أو عظم وغضروف، تسمح بالحركة وتوفر الثبات للهيكل العظمي.',
      en: 'The junction between two or more bones or cartilage providing mechanical support and mobility.'
    },
    whereIsIt: {
      ar: 'موجودة بين جميع عظام الجسم (مثل دروز الجمجمة، أقراص العمود الفقري، ومفاصل الكتف والركبة).',
      en: 'Present throughout the skeleton between adjacent articulating bones.'
    },
    whatDoesItDo: {
      ar: 'تتيح الحركة بمختلف درجاتها وتمتص الصدمات وتمنع تآكل العظام بفضل الغضاريف والسائل الزلالي.',
      en: 'Allows motion, transmits mechanical forces, absorbs shock, and prevents bone erosion.'
    },
    whyImportant: {
      ar: 'أمراض المفاصل (كالخشونة والتهاب المفاصل والخلع) من أكثر الحالات التي يراها الطبيب يومياً.',
      en: 'Joint disorders (osteoarthritis, rheumatoid arthritis, dislocations, sprains) are central to medicine.'
    },
    howToRecognize: {
      ar: 'صنفها بـ 3 أنواع: ليفية (Fibrous: ثابتة كالجمجمة)، غضروفية (Cartilaginous: مثل الفقرات)، زلالية (Synovial: حرة الحركة كالركبة).',
      en: 'Identify the 3 types: Fibrous (immovable sutures), Cartilaginous (intervertebral discs), Synovial (freely movable with cavity).'
    },
    howAppearsInExam: {
      ar: 'سؤال تصنيف: "مفصل الكتف يصنف كـ..." (الجواب: Ball-and-socket Synovial Joint)، أو أنواع المفاصل الزلالية الستة.',
      en: 'Classifying a named joint (e.g. Knee = modified hinge; Shoulder = ball & socket) and identifying synovial features.'
    },
    highYieldSummary: 'Fibrous = Immovable | Cartilaginous = Limited | Synovial = Freely movable (6 subtypes)',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    iconName: 'GitMerge',

    corePoints: [
      'المفاصل الليفية (Fibrous Joints): عظام متصلة بأنسجة ليفية محكمة ولا تحتوي على تجويف مفصلي وغير متحركة (مثل دروز الجمجمة Sutures).',
      'المفاصل الغضروفية (Cartilaginous Joints): متصلة بغضاريف وحركتها محدودة (مثل الأقراص بين الفقرات والارتفاق العاني).',
      'المفاصل الزلالية (Synovial Joints): حرة الحركة وتتميز بوجود تجويف مفصلي وسائل زلالي وغضروف زجاجي ومحفظة مفصلية.',
      'أنواع المفاصل الزلالية الستة: كروي حقي (Ball & Socket)، رزي (Hinge)، مداري (Pivot)، لقماني (Condyloid)، سرجي (Saddle)، ومسطح منزلق (Plane).'
    ],
    highYieldExamPoints: [
      'المفصل الكروي الحقي (Ball and Socket): مثل الكتف (Shoulder) والورك (Hip) - يمنح أوسع مدى حركة في جميع الاتجاهات.',
      'المفصل الرزي (Hinge Joint): مثل المرفق (Elbow) والركبة (Knee) - يسمح بالانثناء والبسط فقط في مستوى واحد.',
      'المفصل السرجي (Saddle Joint): مثاله الكلاسيكي مفصل قاعدة الإبهام (1st CMC Joint).'
    ],
    extraInfo: [
      'السائل الزلالي (Synovial Fluid): سائل زلق يفرزه الغشاء الزلالي لتغذية الغضروف وتقليل الاحتكاك.',
      'الرباط (Ligament) يربط عظم بعظم، بينما الوتر (Tendon) يربط عضلة بعظم.'
    ],

    keyStructures: [
      {
        nameEn: 'Synovial Joint Cavity & Capsule',
        nameAr: 'التجويف والمحفظة الزلالية',
        location: 'In all freely movable joints (Shoulder, Knee, Hip, Elbow).',
        function: 'Encloses joint, secretes lubricating fluid, stabilizes articulation.',
        howToRecognize: 'Fluid-filled space between articular cartilages.',
        clinicalNote: 'Joint effusion / swelling occurs inside this synovial cavity.',
        level: 'CORE'
      },
      {
        nameEn: 'Ball & Socket Joint (Spherical)',
        nameAr: 'المفصل الكروي الحقي',
        location: 'Shoulder (Glenohumeral) and Hip (Iliofemoral) joints.',
        function: 'Multiaxial motion (Flexion, Extension, Abduction, Adduction, Rotation, Circumduction).',
        howToRecognize: 'Round ball-like head fitting inside a cup-like socket.',
        clinicalNote: 'Shoulder has high mobility but low stability (frequent anterior dislocation).',
        level: 'CORE'
      },
      {
        nameEn: 'Hinge Joint (Ginglymus)',
        nameAr: 'المفصل الرزي المفصلي',
        location: 'Elbow joint (Humeroulnar), Interphalangeal joints.',
        function: 'Uniaxial motion (Flexion & Extension only).',
        howToRecognize: 'Convex cylinder fitting into a concave trough (like a door hinge).',
        clinicalNote: 'Strong collateral ligaments prevent sideways displacement.',
        level: 'CORE'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'الخلط بين الرباط (Ligament) والوتر (Tendon)',
        titleEn: 'Ligament vs Tendon',
        wrongConcept: 'اعتبار الوتر والرباط نفس الشيء.',
        correctConcept: 'الرباط (Ligament) يربط عظم بعظم (Bone to Bone). الوتر (Tendon) يربط عضلة بعظم (Muscle to Bone).',
        explanation: 'Ligament = Link bones | Tendon = Tension from muscle.'
      },
      {
        titleAr: 'اعتبار مفصل الركبة مفصلاً كروياً',
        titleEn: 'Knee Joint Classification',
        wrongConcept: 'الاعتقاد بأن الركبة تتحرك كروياً مثل الورك.',
        correctConcept: 'الركبة مفصل رزي معدل (Modified Hinge / Bicondylar) يسمح بالانثناء والبسط مع دوران طفيف.',
        explanation: 'الورك والكتف فقط هما المفاصل الكروية الكبرى.'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'LIGAMENT = LInks Bone to Bone',
        meaningAr: 'Ligament يبدأ بـ LI مثل LInks (يربط عظم بعظم)',
        explanation: 'بينما Tendon ينقل قوة انقباض العضلة للعظم.'
      },
      {
        phraseEn: 'BALL & SOCKET = BIGGEST RANGE OF MOTION',
        meaningAr: 'المفصل الكروي الحقي يمنح أكبر مدى حركة (الكتف والورك)',
        explanation: 'يتحرك في كل المستويات بما فيها الدوران.'
      }
    ],

    clinicalNote: 'Clinical Note: مفصل الكتف هو أكثر المفاصل خلعاً في الجسم لأن حق المفصل ضحل وصغير مقارنة بضخامة رأس العضد (High Mobility = Low Stability).',

    keyTerms: [
      { term: 'Synovial Joint', meaningAr: 'مفصل زلالي', definitionEn: 'Freely movable joint with a fluid-filled cavity and hyaline cartilage.', example: 'Knee joint' },
      { term: 'Fibrous Joint', meaningAr: 'مفصل ليفي', definitionEn: 'Immovable joint joined by dense fibrous collagen tissue.', example: 'Cranial sutures' },
      { term: 'Cartilaginous Joint', meaningAr: 'مفصل غضروفي', definitionEn: 'Joint allowing slight movement joined by cartilage.', example: 'Pubic symphysis' },
      { term: 'Ball and Socket Joint', meaningAr: 'مفصل كروي حقي', definitionEn: 'Multiaxial joint with a ball head in a cup cavity.', example: 'Hip and shoulder' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Glenohumeral Joint (Shoulder Ball & Socket)',
        structureNameAr: 'مفصل الكتف (كروي حقي)',
        positionX: 30,
        positionY: 30,
        whatIsIt: 'المفصل بين رأس العضد والجوف الحقاني للوح الكتف.',
        whereIsIt: 'في الكتف.',
        functionDesc: 'يسمح بأوسع مدى حركة لجميع مفاصل الجسم.',
        howToRecognize: 'رأس العضد الكروي مع التجويف الحقاني الصغير.',
        highYieldNote: 'مفصل كروي حقي متعدد المحاور (Multiaxial).',
        clinicalNote: 'الخلع الأمامي لمفصل الكتف قد يؤذي العصب الإبطي (Axillary nerve).',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Elbow Hinge Joint (Humeroulnar)',
        structureNameAr: 'مفصل المرفق (رزي)',
        positionX: 25,
        positionY: 50,
        whatIsIt: 'مفصل بين بكرة العضد والثلمة البكرية للزند.',
        whereIsIt: 'في منتصف الذراع.',
        functionDesc: 'يسمح بالانثناء والبسط فقط (Uniaxial).',
        howToRecognize: 'حركة كالمفصلة في اتجاه واحد.',
        highYieldNote: 'مفصل رزي (Hinge) نقي.',
        clinicalNote: 'تثبته الأربطة الجانبية الزندية والكعبرية.',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Knee Joint (Modified Bicondylar Hinge)',
        structureNameAr: 'مفصل الركبة (رزي معدل)',
        positionX: 48,
        positionY: 75,
        whatIsIt: 'أكبر وأعقد مفصل زلالي في جسم الإنسان.',
        whereIsIt: 'بين لقمتي الفخذ والسطح العلوي للقصبة والرضفة.',
        functionDesc: 'حمل ثقل الجسم، الانثناء والبسط، وآلية القفل (Locking).',
        howToRecognize: 'يحتوي على هلالين غضروفيين (Menisci) وأربطة صليبية.',
        highYieldNote: 'أكبر مفصل زلالي في جسم الإنسان.',
        clinicalNote: 'قطع الرباط الصليبي الأمامي (ACL tear) شائع جداً عند الرياضيين.',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. تصنف المفاصل إلى: ليفية (عديمة الحركة)، غضروفية (محدودة)، وزلالية (حرة الحركة).',
      '2. المفاصل الزلالية تحتوي على تجويف وغشاء وسائل زلالي وغضروف مفصلي.',
      '3. المفصل الكروي الحقي (Ball & Socket) مثل الكتف والورك = أوسع مدى حركة.',
      '4. المفصل الرزي (Hinge) مثل المرفق = انثناء وبسط فقط في مستوى واحد.',
      '5. الأربطة (Ligaments) تربط عظم بعظم | الأوتار (Tendons) تربط عضلة بعظم.'
    ],

    practiceQuestions: [
      {
        id: 'q_jnt_1',
        questionEn: 'Which type of joint provides the greatest range of movement in all axes?',
        questionAr: 'أي نوع من المفاصل يوفر أكبر مدى للحركة في جميع المحاور؟',
        options: ['Hinge joint', 'Ball-and-socket joint', 'Suture joint', 'Cartilaginous joint'],
        correctAnswer: 'Ball-and-socket joint',
        explanationAr: 'المفصل الكروي الحقي (Ball and socket) كالكتف والورك هو المفصل الوحيد متعدد المحاور الذي يمنح أكبر حرية حركة.',
        explanationEn: 'Ball-and-socket joints permit movements in all axes including circumduction and rotation.',
        examFocus: 'تصنيف المفاصل ووظائفها الحركية.'
      },
      {
        id: 'q_jnt_2',
        questionEn: 'What structure connects a bone to another bone across a joint?',
        questionAr: 'ما هو التركيب التشريحي الذي يربط عظمة بعظمة أخرى عبر المفصل؟',
        options: ['Tendon', 'Ligament', 'Nerve', 'Fascia'],
        correctAnswer: 'Ligament',
        explanationAr: 'الرباط (Ligament) هو نسيج ليفي يربط العظم بالعظم، بينما الوتر (Tendon) يربط العضلة بالعظم.',
        explanationEn: 'Ligaments connect bone to bone; tendons connect muscle to bone.',
        examFocus: 'المفاهيم الأساسية التي يجب أن يعرفها طالب سنة أولى طب.'
      }
    ]
  },

  // 6. MAJOR MUSCLES OF THE BODY
  {
    id: 'anat_muscles',
    topicNumber: 6,
    category: 'musculoskeletal',
    subCategory: 'muscles',
    titleEn: 'Major Muscles of the Body (Myology)',
    titleAr: 'عضلات الجسم الرئيسية وعلم العضلات',
    quickIdeaAr: 'الأنسجة القابلة للانقباض التي تحرك الهيكل العظمي وتنتج القوة والحرارة، مصنفة حسب المنشأ والارتكاز والوظيفة.',
    quickIdeaEn: 'Contractile skeletal muscles that generate force and produce movement across joints.',

    whatIsIt: {
      ar: 'العضلات الهيكلية هي أنسجة إرادية مخططة ترتبط بالعظام عن طريق الأوتار وتحدث الحركة عند انقباضها.',
      en: 'Voluntary striated contractile organs attached to bones via tendons that contract to create motion.'
    },
    whereIsIt: {
      ar: 'تغطي الهيكل العظمي بأكمله وتشكل حوالي 40% من وزن جسم الإنسان البالغ.',
      en: 'Covering the entire skeleton forming ~40% of adult body mass.'
    },
    whatDoesItDo: {
      ar: 'تحرك المفاصل، تحافظ على استقامة القامة والاتزان، وتولد حرارة الجسم.',
      en: 'Moves articulating bones, stabilizes posture, and produces body heat (thermogenesis).'
    },
    whyImportant: {
      ar: 'معرفة العضلات الرئيسية ومسار أعصابها ضروري لفحص القوة العضلية والمنعكسات العصبية في الفحص السريري.',
      en: 'Muscle testing and motor nerve innervation are fundamental clinical examination skills.'
    },
    howToRecognize: {
      ar: 'احفظ العضلة بـ 4 نقاط بسيطة: اسمها، مكانها، حركتها الأساسية (Action)، والعصب المغذي لها (Nerve).',
      en: 'Memorize each muscle by 4 simple facts: Name, Location, Main Action, and Nerve supply.'
    },
    howAppearsInExam: {
      ar: 'سؤال عملي (OSPE): وضع دبوس على عضلة Biceps أو Deltoid والسؤال عن اسمها أو وظيفتها أو العصب المغذي لها.',
      en: 'OSPE pinned muscle specimen asking: "Identify structure, state its primary action and motor nerve".'
    },
    highYieldSummary: 'Biceps = Elbow flexor & supinator | Triceps = Elbow extensor | Deltoid = Shoulder abductor (15-90°)',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
    iconName: 'Activity',

    corePoints: [
      'العضلة ذات الرأسين العضدية (Biceps Brachii): في مقدمة الذراع، تثني المرفق وتستلقي الساعد (عصب Musculocutaneous).',
      'العضلة ثلاثية الرؤوس العضدية (Triceps Brachii): في خلف الذراع، تبسط المرفق بقوة (عصب Radial).',
      'العضلة الدالية (Deltoid): تغطي مفصل الكتف كالقبعة، تبعد الذراع من 15° إلى 90° (عصب Axillary).',
      'العضلة الصدرية الكبرى (Pectoralis Major): في الصدر، تقرب وتثني الذراع للداخل.',
      'العضلة رباعية الرؤوس الفخذية (Quadriceps Femoris): في مقدمة الفخذ، تبسط مفصل الركبة (عصب Femoral).'
    ],
    highYieldExamPoints: [
      'العضلة الدالية تبعد الذراع من 15° إلى 90°، بينما أول 15° تبعدها عضلة Supraspinatus.',
      'عضلة الحجاب الحاجز (Diaphragm): العضلة التنفسية الرئيسية ويغذيها العصب الحجابي (Phrenic nerve: C3, C4, C5).',
      'العضلة الإلية الكبرى (Gluteus Maximus): أقوى باسط لمفصل الورك (تسلق الدرج والوقوف من وضع الجلوس).'
    ],
    extraInfo: [
      'الأوتار (Tendons) حبال ليفية بيضاء تنقل قوة العضلة إلى العظم بدقة.',
      'العضلة المحركة الأساسية (Prime Mover / Agonist) يقابلها عضلة مضادة (Antagonist) ترتخي بالتزامن معها.'
    ],

    keyStructures: [
      {
        nameEn: 'Biceps Brachii',
        nameAr: 'العضلة ذات الرأسين العضدية',
        location: 'Anterior compartment of the arm.',
        function: 'Flexion of elbow joint & powerful supination of flexed forearm.',
        howToRecognize: 'Prominent bulge on front of arm with two proximal heads.',
        clinicalNote: 'Tested by eliciting the Biceps tendon jerk reflex (C5, C6).',
        level: 'CORE'
      },
      {
        nameEn: 'Deltoid Muscle',
        nameAr: 'العضلة الدالية (عضلة الكتف)',
        location: 'Over the shoulder joint forming rounded shoulder contour.',
        function: 'Primary abductor of the shoulder from 15° to 90°.',
        howToRecognize: 'Inverted triangle covering the upper humerus.',
        clinicalNote: 'Common site for intramuscular injections; innervated by Axillary nerve.',
        level: 'CORE'
      },
      {
        nameEn: 'Quadriceps Femoris',
        nameAr: 'العضلة رباعية الرؤوس الفخذية',
        location: 'Anterior compartment of the thigh.',
        function: 'Powerful extensor of the knee joint (walking, kicking).',
        howToRecognize: 'Large 4-part muscle mass on front of thigh inserting on patella.',
        clinicalNote: 'Patellar tendon reflex (Knee jerk) tests L3, L4 spinal roots.',
        level: 'CORE'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'الاعتقاد بأن Deltoid يبدأ تبعيد الكتف من زاوية صفر',
        titleEn: 'Deltoid vs Supraspinatus Abduction',
        wrongConcept: 'الاعتقاد بأن الدالية (Deltoid) تبعد الذراع من 0 إلى 90 درجة.',
        correctConcept: 'عضلة Supraspinatus تبدأ أول 15 درجة (0°-15°)، ثم تتولى Deltoid التبعيد من 15° إلى 90°.',
        explanation: 'سؤال كلاسيكي في امتحانات التشريح.'
      },
      {
        titleAr: 'نسيان أن Biceps تستلقي الساعد',
        titleEn: 'Biceps is a powerful supinator',
        wrongConcept: 'حصر وظيفة Biceps في ثني المرفق فقط.',
        correctConcept: 'الـ Biceps هي أقوى عضلة لاستلقاء الساعد (Supinator) عندما يكون المرفق منثنياً.',
        explanation: 'تستخدم بقوة عند استخدام المفك أو فتح قارورة.'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'C3, 4, 5 keeps the DIAPHRAGM ALIVE',
        meaningAr: 'الجذور الرقبية 3 و 4 و 5 تشكل العصب الحجابي للحجاب الحاجز',
        explanation: 'أشهر بيت تذكيري في تشريح السنة الأولى لحفظ تغذية Diaphragm.'
      },
      {
        phraseEn: 'BICEPS = Bends & Bowls (Flexes & Supinates)',
        meaningAr: 'Biceps تثني المرفق وتقلب راحة اليد للأعلى',
        explanation: 'وظيفتان أساسيتان لعضلة البايسبس.'
      }
    ],

    clinicalNote: 'Clinical Note: شلل العصب الكعبري (Radial nerve injury) في منتصف العضد يؤدي إلى فقدان بسط الرسغ وتدلي اليد للأسفل (Wrist Drop).',

    keyTerms: [
      { term: 'Origin', meaningAr: 'المنشأ', definitionEn: 'The fixed, stationary attachment of a muscle during contraction.', example: 'Scapula for biceps' },
      { term: 'Insertion', meaningAr: 'المرتكز', definitionEn: 'The movable attachment point pulled toward origin during contraction.', example: 'Radial tuberosity' },
      { term: 'Agonist (Prime Mover)', meaningAr: 'العضلة المحركة الأساسية', definitionEn: 'Muscle directly responsible for producing a specific movement.', example: 'Brachialis in elbow flexion' },
      { term: 'Antagonist', meaningAr: 'العضلة المضادة', definitionEn: 'Muscle that opposes the action of the prime mover.', example: 'Triceps opposes Biceps' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Deltoid Muscle',
        structureNameAr: 'العضلة الدالية للكتف',
        positionX: 25,
        positionY: 28,
        whatIsIt: 'عضلة سميكة ثلاثية الأوجه تغطي مفصل الكتف.',
        whereIsIt: 'في قمة الكتف وأعلى الذراع.',
        functionDesc: 'تبعيد الذراع من 15 إلى 90 درجة.',
        howToRecognize: 'شكل المثلث المقلوب الذي يعطي الكتف استدارته.',
        highYieldNote: 'يغذيها العصب الإبطي (Axillary nerve - C5, C6).',
        clinicalNote: 'موقع الحقن العضلي المعتاد للقاحات.',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Biceps Brachii Muscle Belly',
        structureNameAr: 'بطن العضلة ذات الرأسين العضدية',
        positionX: 28,
        positionY: 42,
        whatIsIt: 'عضلة ثنائية الرأس في المسكن الأمامي للذراع.',
        whereIsIt: 'في مقدمة الذراع بين الكتف والمرفق.',
        functionDesc: 'ثني المرفق واستلقاء الساعد (Flexion & Supination).',
        howToRecognize: 'البروز العضلي الواضح عند ثني الذراع.',
        highYieldNote: 'يغذيها العصب العضلي الجلدي (Musculocutaneous nerve).',
        clinicalNote: 'منعكس وتر البايسبس يختبر جذور C5 و C6.',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Quadriceps Femoris (Rectus Femoris)',
        structureNameAr: 'العضلة مربعة الرؤوس الفخذية',
        positionX: 52,
        positionY: 60,
        whatIsIt: 'كتلة عضلية ضخمة مكونة من 4 رؤوس في مقدمة الفخذ.',
        whereIsIt: 'في المسكن الأمامي للفخذ.',
        functionDesc: 'بسط مفصل الركبة وثني مفصل الورك.',
        howToRecognize: 'العضلة الكبيرة على طول الفخذ التي ترتكز على الرضفة.',
        highYieldNote: 'يغذيها العصب الفخذي (Femoral nerve - L2, L3, L4).',
        clinicalNote: 'منعكس نفضة الركبة (Patellar reflex) يختبر L3 و L4.',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. العضلة الدالية (Deltoid) = مسؤولة عن تبعيد الذراع (15°-90°) ويغذيها العصب الإبطي.',
      '2. عضلة Biceps Brachii = تثني المرفق وتستلقي الساعد (Supination).',
      '3. عضلة Triceps Brachii = تبسط مفصل المرفق بقوة ويغذيها العصب الكعبري (Radial nerve).',
      '4. عضلة Quadriceps Femoris = تبسط مفصل الركبة ويغذيها العصب الفخذي.',
      '5. الحجاب الحاجز (Diaphragm) يغذيه العصب الحجابي (Phrenic nerve: C3, C4, C5).'
    ],

    practiceQuestions: [
      {
        id: 'q_mus_1',
        questionEn: 'Which nerve innervates the Deltoid muscle of the shoulder?',
        questionAr: 'أي عصب يغذي العضلة الدالية (Deltoid) في الكتف؟',
        options: ['Axillary nerve', 'Radial nerve', 'Median nerve', 'Ulnar nerve'],
        correctAnswer: 'Axillary nerve',
        explanationAr: 'العصب الإبطي (Axillary nerve) يلتف حول العنق الجراحي للعضد ويغذي العضلة الدالية.',
        explanationEn: 'The Axillary nerve (C5, C6) winds around surgical neck of humerus to supply deltoid.',
        examFocus: 'سؤال امتحان مشهور جداً يربط بين الكسور والعصب المغذي.'
      },
      {
        id: 'q_mus_2',
        questionEn: 'Which muscle is the primary extensor of the knee joint?',
        questionAr: 'أي عضلة تعتبر الباسطة الأساسية لمفصل الركبة؟',
        options: ['Hamstrings', 'Quadriceps femoris', 'Gastrocnemius', 'Biceps femoris'],
        correctAnswer: 'Quadriceps femoris',
        explanationAr: 'العضلة رباعية الرؤوس (Quadriceps femoris) ترتكز على الرضفة والقصبة وتبسط الركبة بقوة.',
        explanationEn: 'The Quadriceps femoris extends the leg at the knee joint.',
        examFocus: 'الوظيفة الحركية الأساسية لعضلات الطرف السفلي.'
      }
    ]
  },

  // 7. NERVOUS SYSTEM
  {
    id: 'anat_nervous',
    topicNumber: 7,
    category: 'organ_systems',
    subCategory: 'nervous_system',
    titleEn: 'The Nervous System & Neuroanatomy',
    titleAr: 'الجهاز العصبي والتشريح العصبي',
    quickIdeaAr: 'شبكة التحكم والاتصالات في الجسم، مقسمة إلى جهاز عصبي مركزي (المخ والحبل الشوكي) وجهاز عصبي محيطي (الأعصاب).',
    quickIdeaEn: 'The master control and communication system divided into Central (CNS) and Peripheral (PNS).',

    whatIsIt: {
      ar: 'الجهاز العصبي هو شبكة الخلايا العصبية التي تستقبل الإشارات الحسية وتعالجها وتصدر الأوامر الحركية لجميع الأعضاء.',
      en: 'The complex network of neurons and glia regulating sensory perception, cognitive thought, and motor actions.'
    },
    whereIsIt: {
      ar: 'المركزي داخل الجمجمة والعمود الفقري (محمي بالعظام والسحايا)، والمحيطي يمتد في جميع أطراف وأحشاء الجسم.',
      en: 'CNS inside the cranium and vertebral canal; PNS branching throughout all tissues and limbs.'
    },
    whatDoesItDo: {
      ar: 'يتحكم في التفكير، الذاكرة، الحركة الإرادية، والتنظيم اللاإرادي للقلب والتنفس والهضم.',
      en: 'Processes information, coordinates movement, maintains homeostasis, and enables cognition.'
    },
    whyImportant: {
      ar: 'تلف أي جزء من الجهاز العصبي قد يسبب شللاً أو فقدان حس دائم لأن الخلايا العصبية المركزية لا تتجدد بسهولة.',
      en: 'Essential to diagnose strokes, spinal cord injuries, peripheral neuropathies, and cranial nerve palsies.'
    },
    howToRecognize: {
      ar: 'المخ (Cerebrum: نصفي كرة مع تلافيف)، المخيخ (Cerebellum: في الخلف للاتزان)، وجذع الدماغ (Brainstem: متصل بالحبل الشوكي).',
      en: 'Cerebrum (large convoluted hemispheres), Cerebellum (cauliflower-like back), Brainstem (stalk leading to spinal cord).'
    },
    howAppearsInExam: {
      ar: 'تحديد فصوص الدماغ (Frontal, Parietal, Temporal, Occipital) أو الأعصاب القحفية الـ 12 (Cranial Nerves) ووظائفها.',
      en: 'Identifying brain lobes/ventricles on models and matching 12 Cranial Nerves to their sensory/motor roles.'
    },
    highYieldSummary: 'CNS = Brain + Spinal Cord | PNS = 12 Cranial + 31 Spinal Nerves | Cerebellum = Coordination & balance',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
    iconName: 'Brain',

    corePoints: [
      'الجهاز العصبي المركزي (CNS): المخ (Brain) داخل الجمجمة، والحبل الشوكي (Spinal cord) داخل القناة الفقرية.',
      'الجهاز العصبي المحيطي (PNS): 12 زوجاً من الأعصاب القحفية (Cranial nerves) و 31 زوجاً من الأعصاب الشوكية (Spinal nerves).',
      'فصوص المخ الأربعة: الجبهي (Frontal: الحركة والتفكير)، الجداري (Parietal: الإحساس)، الصدغي (Temporal: السمع والذاكرة)، والقذالي (Occipital: الإبصار والرؤية).',
      'المخيخ (Cerebellum): يقع خلف جذع الدماغ ومسؤول عن الاتزان وتنسيق الحركات الدقيقة.',
      'جذع الدماغ (Brainstem): يتكون من الدماغ المتوسط (Midbrain)، الجسر (Pons)، والنخاع المستطيل (Medulla oblongata).'
    ],
    highYieldExamPoints: [
      'الفص القذالي (Occipital Lobe) يحتوي على القشرة البصرية الأولية المسؤولة عن الرؤية (Primary Visual Cortex).',
      'النخاع المستطيل (Medulla Oblongata) يحتوي على المراكز الحيوية اللاإرادية للتنفس وضربات القلب وضغط الدم.',
      'السحايا الثلاث (Meninges): الأم الجافية (Dura mater)، الأم العنكبوتية (Arachnoid mater)، والأم الحنون (Pia mater).'
    ],
    extraInfo: [
      'السائل الدماغي الشوكي (CSF): سائل شفاف يفرزه الضفيرة المشيمية (Choroid plexus) ويمتص الصدمات.',
      'الجهاز العصبي الذاتي: ودي (Sympathetic: قتال أو هروب) ونظير ودي (Parasympathetic: راحة وهضم).'
    ],

    keyStructures: [
      {
        nameEn: 'Cerebrum (Cerebral Cortex)',
        nameAr: 'المخ (نصفا الكرة المخية)',
        location: 'Upper anterior/middle cranial fossa.',
        function: 'Higher intellectual functions, voluntary motor control, conscious sensations.',
        howToRecognize: 'Convoluted surface with gyri (ridges) and sulci (grooves).',
        clinicalNote: 'Stroke in middle cerebral artery causes contralateral paralysis and aphasia.',
        level: 'CORE'
      },
      {
        nameEn: 'Cerebellum',
        nameAr: 'المخيخ',
        location: 'In the posterior cranial fossa below occipital lobes.',
        function: 'Motor coordination, balance, equilibrium, and muscle tone calibration.',
        howToRecognize: 'Cauliflower appearance at the back of the head.',
        clinicalNote: 'Cerebellar lesions cause ataxia, intention tremor, and dysdiadochokinesia.',
        level: 'CORE'
      },
      {
        nameEn: 'Brainstem (Midbrain, Pons, Medulla)',
        nameAr: 'جذع الدماغ',
        location: 'Between cerebrum and spinal cord.',
        function: 'Houses vital respiratory/cardiac centers; conduit for ascending/descending tracts.',
        howToRecognize: 'Stalk connecting the base of brain to foramen magnum.',
        clinicalNote: 'Medulla damage is rapidly fatal due to respiratory arrest.',
        level: 'CORE'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'الخلط بين وظيفة المخ (Cerebrum) والمخيخ (Cerebellum)',
        titleEn: 'Cerebrum vs Cerebellum',
        wrongConcept: 'الاعتقاد بأن المخيخ يبدأ الحركة الإرادية.',
        correctConcept: 'المخ (Cerebrum) هو من يبدأ الحركة الإرادية، بينما المخيخ (Cerebellum) ينسق الحركة ويضبط الاتزان دون أن يبدأها.',
        explanation: 'المخيخ = منسق الحركة والاتزان.'
      },
      {
        titleAr: 'الخلط بين موقع فصوص الرؤية والسمع',
        titleEn: 'Visual vs Auditory Lobes',
        wrongConcept: 'الاعتقاد بأن مركز الرؤية في الفص الجبهي القريب من العين.',
        correctConcept: 'مركز الرؤية في أقصى الخلف بالفص القذالي (Occipital Lobe)، ومركز السمع في الفص الصدغي (Temporal Lobe).',
        explanation: 'الضربة على مؤخرة الرأس تسبب رؤية نجوم أو عمى مؤقت.'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'OCCIPITAL = OPTICAL (Vision)',
        meaningAr: 'Occipital يبدأ بحرف O مثل Optical (الرؤية والبصر)',
        explanation: 'الفص القذالي في مؤخرة الرأس هو المسؤول عن الإبصار.'
      },
      {
        phraseEn: 'CEREBELLUM = COORDINATION & BALANCE',
        meaningAr: 'المخيخ يبدأ بحرف C مثل Coordination (التنسيق)',
        explanation: 'مسؤول عن توازن المشي وتنسيق حركات الأصابع.'
      }
    ],

    clinicalNote: 'Clinical Note: النزف فوق الجافية (Epidural Hematoma) يحدث عادة بسبب كسر في عظم الصدغ وتمزق الشريان السحائي الأوسط (Middle Meningeal Artery).',

    keyTerms: [
      { term: 'Central Nervous System (CNS)', meaningAr: 'الجهاز العصبي المركزي', definitionEn: 'Brain and spinal cord protected by bony skull and vertebrae.', example: 'Cerebral cortex' },
      { term: 'Peripheral Nervous System (PNS)', meaningAr: 'الجهاز العصبي المحيطي', definitionEn: 'Cranial and spinal nerves extending to the periphery.', example: 'Sciatic nerve' },
      { term: 'Meninges', meaningAr: 'السحايا الدماغية', definitionEn: 'Three protective membranes enveloping brain and cord (Dura, Arachnoid, Pia).', example: 'Meningitis infection' },
      { term: 'Cerebrospinal Fluid (CSF)', meaningAr: 'السائل الدماغي الشوكي', definitionEn: 'Clear fluid cushioning CNS in subarachnoid space and ventricles.', example: 'Lumbar puncture' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Frontal Lobe of Cerebrum',
        structureNameAr: 'الفص الجبهي للمخ',
        positionX: 35,
        positionY: 25,
        whatIsIt: 'أكبر فصوص الدماغ ويقع في مقدمة الجمجمة.',
        whereIsIt: 'في الحفرة القحفية الأمامية خلف الجبهة.',
        functionDesc: 'الحركة الإرادية، التخطيط، الشخصية، ومركز بروكا للكلام.',
        howToRecognize: 'الفص الأمامي أمام التلم المركزي (Central Sulcus).',
        highYieldNote: 'يحتوي على التلفيف أمام المركزي (Primary Motor Cortex).',
        clinicalNote: 'تلف منطقة بروكا (Broca area) يسبب حبسة كلامية حركية.',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Cerebellum (Little Brain)',
        structureNameAr: 'المخيخ',
        positionX: 68,
        positionY: 55,
        whatIsIt: 'كتلة كروية مخططة تقع أسفل وخلف نصفي الكرة المخية.',
        whereIsIt: 'في الحفرة القحفية الخلفية.',
        functionDesc: 'تنسيق الحركات الإرادية وضبط التوازن والتناسق الحركي.',
        howToRecognize: 'سطح مخطط بأثلام دقيقة تشبه الشجرة (Arbor Vitae).',
        highYieldNote: 'لا يبدأ الحركة بل ينسقها بدقة (Coordination & Balance).',
        clinicalNote: 'اختبار فحص الترنح (Ataxia) واختبار الإصبع للأنف يفحصان المخيخ.',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Brainstem & Medulla Oblongata',
        structureNameAr: 'جذع الدماغ والنخاع المستطيل',
        positionX: 52,
        positionY: 65,
        whatIsIt: 'الجذع السفلي المتصل بالحبل الشوكي.',
        whereIsIt: 'يمر عبر الثقبة العظمى (Foramen Magnum) في قاعدة الجمجمة.',
        functionDesc: 'مراكز التحكم التلقائي في التنفس وضربات القلب والبلع.',
        howToRecognize: 'ساق عصبية أسطوانية تخرج من قاعدة الدماغ.',
        highYieldNote: 'يحتوي على تصالب الحزم الهرمية (Pyramidal Decussation).',
        clinicalNote: 'انفتاق الدماغ وضغط النخاع المستطيل يؤدي لتوقف التنفس فوراً.',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. الجهاز العصبي المركزي (CNS) = المخ + الحبل الشوكي.',
      '2. المخ (Cerebrum) مقسم إلى 4 فصوص: جبهي، جداري، صدغي، وقذالي.',
      '3. الفص القذالي (Occipital) = مركز الرؤية الأولية في الدماغ.',
      '4. المخيخ (Cerebellum) = مسؤول عن تنسيق الحركات وتوازن الجسم.',
      '5. النخاع المستطيل (Medulla) = يحتوي على مراكز التنفس وضغط الدم الحيوية.'
    ],

    practiceQuestions: [
      {
        id: 'q_ner_1',
        questionEn: 'Which lobe of the cerebral cortex houses the primary visual area?',
        questionAr: 'أي فص من فصوص قشرة المخ يحتوي على منطقة الرؤية الأولية؟',
        options: ['Frontal lobe', 'Parietal lobe', 'Temporal lobe', 'Occipital lobe'],
        correctAnswer: 'Occipital lobe',
        explanationAr: 'الفص القذالي (Occipital Lobe) في مؤخرة الدماغ هو المسؤول عن معالجة حاسة الإبصار.',
        explanationEn: 'The primary visual cortex is located in the occipital lobe at the back of the brain.',
        examFocus: 'سؤال أساسي في تشريح الجهاز العصبي.'
      },
      {
        id: 'q_ner_2',
        questionEn: 'What is the primary function of the CEREBELLUM?',
        questionAr: 'ما هي الوظيفة الأساسية للمخيخ (Cerebellum)؟',
        options: ['Initiation of voluntary movements', 'Coordination of movement and balance', 'Visual interpretation', 'Hormone secretion'],
        correctAnswer: 'Coordination of movement and balance',
        explanationAr: 'المخيخ ينسق الحركات الدقيقة ويحافظ على التوازن ووضعية الجسم.',
        explanationEn: 'The cerebellum coordinates voluntary muscular activity, posture, and equilibrium.',
        examFocus: 'التفريق بين وظائف الدماغ والمخيخ.'
      }
    ]
  },

  // 8. CARDIOVASCULAR SYSTEM
  {
    id: 'anat_cardio',
    topicNumber: 8,
    category: 'organ_systems',
    subCategory: 'cardiovascular_system',
    titleEn: 'The Cardiovascular System & The Heart',
    titleAr: 'جهاز الدوران وتشريح القلب',
    quickIdeaAr: 'المضخة العضلية المجوفة المكونة من 4 حجرات تدفع الدم المؤكسج للجسم وغير المؤكسج للرئتين عبر شبكة أوعية دموية.',
    quickIdeaEn: 'The 4-chambered muscular pump circulating oxygenated blood to tissues and deoxygenated blood to lungs.',

    whatIsIt: {
      ar: 'القلب هو مضخة عضلية مخروطية بحجم قبضة اليد تضخ الدم بدون توقف عبر دورتين دموية: رئوية وجهازية.',
      en: 'A cone-shaped hollow muscular pump in the middle mediastinum circulating blood throughout the vascular network.'
    },
    whereIsIt: {
      ar: 'في المنصف الأوسط (Middle Mediastinum) في القفص الصدري، ثلثاه على يسار خط المنتصف محاطاً بغشاء التامور.',
      en: 'Located in the middle mediastinum behind the sternum between the lungs, resting on the diaphragm.'
    },
    whatDoesItDo: {
      ar: 'يستقبل الدم غير المؤكسج من الجسم ويضخه للرئتين، ويستقبل الدم المؤكسج من الرئتين ويضخه لكافة أعضاء الجسم.',
      en: 'Pumps deoxygenated blood to the lungs (pulmonary circuit) and oxygenated blood to the body (systemic circuit).'
    },
    whyImportant: {
      ar: 'توقف القلب لعدة دقائق يؤدي للوفاة، وأمراض الشرايين التاجية واحتشاء عضلة القلب هي السبب الأول للوفيات عالمياً.',
      en: 'Cardiovascular diseases (coronary artery disease, myocardial infarction, valve stenoses) are the leading global causes of death.'
    },
    howToRecognize: {
      ar: 'يتكون من 4 حجرات: أذينان بالأعلى (Right & Left Atria) وبطينان بالأسفل (Right & Left Ventricles)، والبطين الأيسر جداره أسمك بثلاث مرات.',
      en: '4 chambers: 2 superior receiving Atria and 2 inferior pumping Ventricles; Left ventricle has 3x thicker muscular wall.'
    },
    howAppearsInExam: {
      ar: 'تحديد حجرات القلب، الصمامات الأربعة (Tricuspid, Mitral, Aortic, Pulmonary)، والشرايين التاجية (Coronary Arteries).',
      en: 'Spotting chambers, heart valves (Tricuspid vs Bicuspid/Mitral), Great vessels (Aorta, SVC, IVC), and coronary vessels.'
    },
    highYieldSummary: 'Left Ventricle = Thickest wall (pumps to whole body) | Mitral valve = Left side | Tricuspid = Right side',
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80',
    iconName: 'Heart',

    corePoints: [
      'حجرات القلب الأربع: الأذين الأيمن (Right Atrium)، البطين الأيمن (Right Ventricle)، الأذين الأيسر (Left Atrium)، والبطين الأيسر (Left Ventricle).',
      'البطين الأيسر (Left Ventricle): يمتلك أسمك جدار عضلي لأنه يضخ الدم عبر الشريان الأورطي لكامل أنحاء الجسم ضد ضغط مرتفع.',
      'الصمامات الأذينية البطينية: الصمام ثلاثي الشرف (Tricuspid) في الجانب الأيمن، والصمام ثنائي الشرف / الميترالي (Bicuspid / Mitral) في الجانب الأيسر.',
      'الصمامات الهلالية (Semilunar Valves): الصمام الرئوي (Pulmonary) والصمام الأورطي (Aortic).',
      'الأوعية الدموية الكبرى: الوريدان الأجوفان (SVC & IVC)، الجذع الرئوي (Pulmonary Trunk)، والشريان الأبهر/الأورطي (Aorta).'
    ],
    highYieldExamPoints: [
      'الدم في الجانب الأيمن من القلب غير مؤكسج (Deoxygenated)، بينما الدم في الجانب الأيسر مؤكسج تماماً (Oxygenated).',
      'الأوردة الرئوية الأربعة (4 Pulmonary Veins) هي الأوردة الوحيدة في البالغين التي تحمل دماً غنياً بالأكسجين للأذين الأيسر.',
      'الشرايين التاجية (Coronary Arteries) تنشأ من جيوب الأبهر الصاعد وتغذي عضلة القلب نفسها.'
    ],
    extraInfo: [
      'العقدة الجيبية الأذينية (SA Node): منظمة ضربات القلب الطبيعية (Pacemaker) في جدار الأذين الأيمن.',
      'غشاء التامور (Pericardium): كيس ليفي مصلي يحيط بالقلب ويحميه من الاحتكاك.'
    ],

    keyStructures: [
      {
        nameEn: 'Left Ventricle',
        nameAr: 'البطين الأيسر',
        location: 'Forms the apex and left border of the heart.',
        function: 'Pumps oxygenated blood into the aorta for systemic circulation.',
        howToRecognize: 'Thickest myocardium wall (3x thicker than right ventricle).',
        clinicalNote: 'Hypertension causes Left Ventricular Hypertrophy (LVH).',
        level: 'CORE'
      },
      {
        nameEn: 'Right Atrium',
        nameAr: 'الأذين الأيمن',
        location: 'Right superior chamber of the heart.',
        function: 'Receives deoxygenated venous blood from SVC, IVC, and coronary sinus.',
        howToRecognize: 'Receives the two largest venae cavae; contains the SA node.',
        clinicalNote: 'Atrial septal defect (ASD) occurs in the interatrial septum (fossa ovalis).',
        level: 'CORE'
      },
      {
        nameEn: 'Mitral / Bicuspid Valve',
        nameAr: 'الصمام التاجي / ثنائي الشرف',
        location: 'Between left atrium and left ventricle.',
        function: 'Prevents backflow of blood into left atrium during ventricular systole.',
        howToRecognize: 'Only valve with two cusps (anterior and posterior).',
        clinicalNote: 'Mitral valve prolapse and stenosis are common heart valve conditions.',
        level: 'CORE'
      },
      {
        nameEn: 'Ascending Aorta & Arch',
        nameAr: 'الشريان الأبهر (الأورطي)',
        location: 'Arises from left ventricle curving over pulmonary trunk.',
        function: 'Primary conduit distributing high-pressure oxygenated blood to the body.',
        howToRecognize: 'Largest artery in the body with massive thick elastic wall.',
        clinicalNote: 'Aortic dissection is a life-threatening tear in the inner aortic wall.',
        level: 'HIGH_YIELD'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'الخلط بين موقع الصمام الميترالي وثلاثي الشرف',
        titleEn: 'Tricuspid vs Mitral Valve Location',
        wrongConcept: 'نسيان أي صمام في اليمين وأي صمام في اليسار.',
        correctConcept: 'الصمام ثلاثي الشرف (Tricuspid) في اليمين (Right)، والصمام الميترالي ثنائي الشرف (Mitral/Bicuspid) في اليسار (Left).',
        explanation: 'تذكر: TRI on the RIGHT | BI on the LEFT.'
      },
      {
        titleAr: 'الاعتقاد بأن كل الشرايين تحمل دماً مؤكسجاً',
        titleEn: 'Pulmonary Artery Exception',
        wrongConcept: 'افتراض أن الشريان الرئوي يحمل دماً مؤكسجاً لأنه شريان.',
        correctConcept: 'الشريان الرئوي (Pulmonary Artery) هو الشريان الوحيد الذي يحمل دماً فقيراً بالأكسجين (Deoxygenated) من القلب للرئة.',
        explanation: 'تعريف الشريان هو وعاء ينقل الدم بعيداً عن القلب (Away from heart).'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'TRI before you BI',
        meaningAr: 'ثلاثي الشرف في اليمين قبل ثنائي الشرف في اليسار',
        explanation: 'الدم يمر أولاً بالصمام ثلاثي الشرف (Right) ثم يذهب للرئة ويعود للميترالي ثنائي الشرف (Left).'
      },
      {
        phraseEn: 'ARTERY = AWAY from the heart',
        meaningAr: 'الشريان (Artery) ينقل الدم دائماً بعيداً عن القلب (Away)',
        explanation: 'بينما الوريد (Vein) يعيد الدم إلى القلب.'
      }
    ],

    clinicalNote: 'Clinical Note: انسداد الشريان التاجي الأمامي النازل (LAD) يسبب احتشاء عضلة القلب في الجدار الأمامي للبطين الأيسر ويسمى شعبياً "Widow Maker".',

    keyTerms: [
      { term: 'Myocardium', meaningAr: 'عضلة القلب', definitionEn: 'The thick contractile muscular middle layer of the heart wall.', example: 'Myocardial infarction' },
      { term: 'Pericardium', meaningAr: 'غشاء التامور', definitionEn: 'Fibroserous sac enclosing heart and roots of great vessels.', example: 'Pericarditis' },
      { term: 'Systole', meaningAr: 'الانقباض البطيني', definitionEn: 'Period of ventricular contraction pumping blood into aorta and pulmonary trunk.', example: 'Systolic blood pressure' },
      { term: 'Diastole', meaningAr: 'الانبساط البطيني', definitionEn: 'Period of ventricular relaxation when chambers fill with blood.', example: 'Diastolic pressure' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Left Ventricle Myocardium',
        structureNameAr: 'جدار البطين الأيسر',
        positionX: 58,
        positionY: 62,
        whatIsIt: 'الجدار العضلي السميك لحجرة الضخ الرئيسية للقلب.',
        whereIsIt: 'يشكل قمة القلب والحافة اليسرى والسفلية.',
        functionDesc: 'ضخ الدم المؤكسج بضغط عالٍ عبر الأبهر لكافة أنحاء الجسم.',
        howToRecognize: 'جداره العضلي أسمك بثلاث مرات من البطين الأيمن.',
        highYieldNote: 'يضخ في الدورة الجهازية (Systemic Circulation).',
        clinicalNote: 'الموقع الأكثر تضرراً عند الجلطات القلبية (Heart Attack).',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Right Atrium (Receiving Chamber)',
        structureNameAr: 'الأذين الأيمن',
        positionX: 35,
        positionY: 38,
        whatIsIt: 'الحجرة العلوية اليمنى ذات الجدار الرقيق.',
        whereIsIt: 'في الجزء العلوي الأيمن من قاعدة القلب.',
        functionDesc: 'استقبال الدم الوريدي غير المؤكسج من الجسم عبر SVC و IVC.',
        howToRecognize: 'تصب فيه الأوردة الجوفاء الكبيرة ويحتوي على العقدة الجيبية (SA Node).',
        highYieldNote: 'العقدة الجيبية الأذينية (SA Node) تقع في جداره.',
        clinicalNote: 'يحتوي على الحفرة البيضوية (Fossa ovalis) من بقايا الجنين.',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Ascending Aorta & Aortic Arch',
        structureNameAr: 'الشريان الأبهر الصاعد وقوس الأبهر',
        positionX: 48,
        positionY: 18,
        whatIsIt: 'أضخم شريان في جسم الإنسان.',
        whereIsIt: 'ينشأ من قاعدة البطين الأيسر ويقوس للأعلى ثم ينزل.',
        functionDesc: 'توزيع الدم المؤكسج إلى الرأس والذراعين وكامل الجسم.',
        howToRecognize: 'أنبوب شرياني ضخم سميك الجدار يخرج من منتصف قاعدة القلب.',
        highYieldNote: 'تخرج من قوسه 3 أفرع كبرى: Brachiocephalic, Carotid, Subclavian.',
        clinicalNote: 'أم الدم الأبهرية (Aortic Aneurysm) وتسلخ الأبهر حالات طارئة حرجة.',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. القلب يتكون من 4 حجرات: أذينان لاستقبال الدم، وبطينان لضخ الدم.',
      '2. البطين الأيسر (Left Ventricle) = أسمك جدار عضلي لضخ الدم لكل الجسم.',
      '3. الصمام ثلاثي الشرف (Tricuspid) في اليمين | الصمام الميترالي (Mitral) في اليسار.',
      '4. الشريان الأورطي (Aorta) ينقل الدم المؤكسج من البطين الأيسر للجسم.',
      '5. الشرايين التاجية (Coronary Arteries) تغذي عضلة القلب نفسها بالدم والأكسجين.'
    ],

    practiceQuestions: [
      {
        id: 'q_car_1',
        questionEn: 'Why does the left ventricle have a much thicker muscular wall than the right ventricle?',
        questionAr: 'لماذا يمتلك البطين الأيسر جداراً عضلياً أسمك بكثير من البطين الأيمن؟',
        options: [
          'It pumps blood against higher resistance to the entire body',
          'It receives more blood volume than the right ventricle',
          'It pumps blood only to the adjacent lungs',
          'It contains deoxygenated blood'
        ],
        correctAnswer: 'It pumps blood against higher resistance to the entire body',
        explanationAr: 'البطين الأيسر يضخ الدم ضد المقاومة العالية للدورة الدموية الجهازية لكامل الجسم، بينما الأيمن يضخ للرئتين فقط.',
        explanationEn: 'The left ventricle pumps blood into the systemic high-resistance circulation to all tissues.',
        examFocus: 'سؤال علمي وفيسيولوجي أساسي يتكرر دائماً.'
      },
      {
        id: 'q_car_2',
        questionEn: 'Which heart valve is located between the Left Atrium and the Left Ventricle?',
        questionAr: 'أي صمام قلبي يقع بين الأذين الأيسر والبطين الأيسر؟',
        options: ['Tricuspid valve', 'Mitral (Bicuspid) valve', 'Pulmonary valve', 'Aortic valve'],
        correctAnswer: 'Mitral (Bicuspid) valve',
        explanationAr: 'الصمام الميترالي (Mitral / Bicuspid) ثنائي الشرف يقع في الجانب الأيسر بين الأذين الأيسر والبطين الأيسر.',
        explanationEn: 'The Mitral (bicuspid) valve regulates blood flow between the left atrium and left ventricle.',
        examFocus: 'مواقع صمامات القلب الأربعة.'
      }
    ]
  },

  // 9. RESPIRATORY SYSTEM
  {
    id: 'anat_respiratory',
    topicNumber: 9,
    category: 'organ_systems',
    subCategory: 'respiratory_system',
    titleEn: 'The Respiratory System & Lungs',
    titleAr: 'الجهاز التنفسي وتشريح الرئتين',
    quickIdeaAr: 'شبكة المجاري الهوائية والرئتين المسؤولة عن تبادل الأكسجين وثاني أكسيد الكربون بين الدم والبيئة المحيطة.',
    quickIdeaEn: 'Airways and paired lungs facilitating vital gas exchange (O2 & CO2) between blood and atmosphere.',

    whatIsIt: {
      ar: 'الجهاز التنفسي يتكون من المجرى الهوائي (الأنف، الحنجرة، الرغامي، والشعب الهوائية) والرئتين لتبادل الغازات.',
      en: 'The respiratory tract (nose, larynx, trachea, bronchial tree) and paired lungs enclosed by pleural sacs.'
    },
    whereIsIt: {
      ar: 'يملأ التجويف الصدري على جانبي المنصف الأوسط محاطاً بالقفص الصدري والغشاء الجنبي.',
      en: 'Occupying the thoracic cavity on either side of the mediastinum, resting on the muscular diaphragm.'
    },
    whatDoesItDo: {
      ar: 'يدخل الأكسجين إلى الدم المؤكسج ويتخلص من ثاني أكسيد الكربون عبر الحويصلات الهوائية (Alveoli).',
      en: 'Conducts air, warms and filters inspired gases, and enables alveolar gas diffusion into pulmonary capillaries.'
    },
    whyImportant: {
      ar: 'أمراض الجهاز التنفسي مثل الربو، الالتهاب الرئوي، والاسترواح الصدري شائعة وتتطلب معرفة دقيقة بالتشريح الجنبي والرئوي.',
      en: 'Crucial for understanding pneumothorax, pleural effusion, pneumonia, endotracheal intubation, and chest tube insertion.'
    },
    howToRecognize: {
      ar: 'الرئة اليمنى 3 فصوص (علوي، أوسط، سفلي)، بينما الرئة اليسرى فصان فقط مع ثلمة قلبية (Cardiac notch).',
      en: 'Right lung has 3 lobes (Superior, Middle, Inferior) and 2 fissures; Left lung has 2 lobes and a Cardiac Notch.'
    },
    howAppearsInExam: {
      ar: 'تحديد فصوص الرئة، الرغامي (Trachea) وتفرع الجؤجؤ (Carina عند T4/T5)، أو العصب الحجابي (Phrenic nerve).',
      en: 'Distinguishing right vs left lung lobes, bronchopulmonary segments, tracheal bifurcation (Carina), and diaphragm innervation.'
    },
    highYieldSummary: 'Right Lung = 3 Lobes (2 fissures) | Left Lung = 2 Lobes (Cardiac notch) | Trachea splits at T4/T5 (Carina)',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    iconName: 'Wind',

    corePoints: [
      'الرغامي (Trachea): أنبوب غضروفي مرن يبدأ أسفل الغضروف الحلقي (C6) وينقسم عند مستوى زاوية القص (T4/T5) إلى شعبتين رئيسيتين.',
      'الرئة اليمنى (Right Lung): أكبر حجماً وتتكون من 3 فصوص (Superior, Middle, Inferior) مفصولة بشقين (Oblique & Horizontal fissures).',
      'الرئة اليسرى (Left Lung): أصغر حجماً وتتكون من فصين فقط وتحتوي على الثلمة القلبية (Cardiac Notch) واللسينة (Lingula).',
      'الحجاب الحاجز (Diaphragm): عضلة التنفس الأساسية ويفصل الصدر عن البطن ويغذيه العصب الحجابي (Phrenic nerve: C3, C4, C5).',
      'الغشاء الجنبي (Pleura): غشاء مصلي مزدوج (Visceral pleura على سطح الرئة و Parietal pleura تبطن جدار الصدر).'
    ],
    highYieldExamPoints: [
      'الشعبة الهوائية الرئيسية اليمنى (Right Main Bronchus) أوسع وأقصر وأكثر عمودية من اليسرى، لذا فإن الأجسام الغريبة المستنشقة تدخل الرئة اليمنى غالباً.',
      'تفرع الرغامي يسمى الجؤجؤ (Carina) ويقع عند مستوى زاوية القص (Sternal Angle of Louis - T4/T5).',
      'العصب الحجابي (Phrenic Nerve) يمر أمام سُرّة الرئة (Hilum of lung)، بينما العصب المبهم (Vagus Nerve) يمر خلفها.'
    ],
    extraInfo: [
      'الحويصلات الهوائية (Alveoli): الموقع الفعلي لتبادل الغازات ويصل عددها إلى 300-500 مليون حويصلة في الرئتين.',
      'الاسترواح الصدري (Pneumothorax): تجمع الهواء في التجويف الجنبي يؤدي إلى انخماص الرئة.'
    ],

    keyStructures: [
      {
        nameEn: 'Right Lung (3 Lobes)',
        nameAr: 'الرئة اليمنى (3 فصوص)',
        location: 'Right hemithorax.',
        function: 'Pulmonary gas exchange (larger capacity than left).',
        howToRecognize: '3 lobes separated by horizontal and oblique fissures.',
        clinicalNote: 'Aspiration pneumonia is most frequent in right lower lobe due to vertical right main bronchus.',
        level: 'CORE'
      },
      {
        nameEn: 'Left Lung (Cardiac Notch & 2 Lobes)',
        nameAr: 'الرئة اليسرى (فصان مع الثلمة القلبية)',
        location: 'Left hemithorax accommodating apex of the heart.',
        function: 'Pulmonary gas exchange.',
        howToRecognize: '2 lobes (superior and inferior) with prominent anterior cardiac notch and lingula.',
        clinicalNote: 'Cardiac notch accommodates apex of left ventricle.',
        level: 'CORE'
      },
      {
        nameEn: 'Trachea & Carina',
        nameAr: 'الرغامي والجؤجؤ',
        location: 'Midline neck and superior mediastinum from C6 to T4/T5.',
        function: 'Air conduction conduit with C-shaped hyaline cartilage rings.',
        howToRecognize: 'Cartilaginous tube with a ridge at bifurcation (Carina).',
        clinicalNote: 'Carina mucosa is the most sensitive area for triggering the cough reflex.',
        level: 'CORE'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'الخلط بين عدد فصوص الرئة اليمنى واليسرى',
        titleEn: 'Right vs Left Lung Lobes',
        wrongConcept: 'الاعتقاد بأن الرئتين متماثلتان في عدد الفصوص.',
        correctConcept: 'الرئة اليمنى بها 3 فصوص (Superior, Middle, Inferior)، بينما الرئة اليسرى بها فصان فقط بسبب مساحة القلب.',
        explanation: 'القلب يأخذ مساحة في الجهة اليسرى فيترك فصين فقط.'
      },
      {
        titleAr: 'نسيان مسار الأجسام الغريبة المستنشقة',
        titleEn: 'Inhaled Foreign Body Predilection',
        wrongConcept: 'الاعتقاد بأن الأجسام المستنشقة تدخل الرئتين بالتساوي.',
        correctConcept: 'تدخل الشعبة الهوائية الرئيسية اليمنى (Right bronchus) لأنها أوسع، أقصر، وأكثر استقامة وعمودية.',
        explanation: 'سؤال امتحان شهير جداً في طب الطوارئ والأطفال.'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'RIGHT = 3 Lobes (3 syllables in "Right Lung Boy")',
        meaningAr: 'الرئة اليمنى 3 فصوص واليسرى فصان',
        explanation: 'الرئة اليمنى أضخم ولها 3 فصوص واليسرى فصان فقط.'
      },
      {
        phraseEn: 'RIGHT BRONCHUS = WIDER, SHORTER, MORE VERTICAL',
        meaningAr: 'الشعبة الهوائية اليمنى أوسع وأقصر وأكثر عمودية',
        explanation: 'تستقبل الأجسام الغريبة المستنشقة بسهولة.'
      }
    ],

    clinicalNote: 'Clinical Note: إدخال أنبوب الصدر (Chest Tube) لتفريغ الهواء أو السوائل يتم في الحيز الوربي الخامس (5th Intercostal Space) على الخط الإبطي المتوسط فوق الحافة العلوية للضلع لتجنب الحزمة الوعائية العصبية.',

    keyTerms: [
      { term: 'Carina', meaningAr: 'جؤجؤ الرغامي', definitionEn: 'The cartilaginous internal ridge at the bifurcation of the trachea into main bronchi (T4/T5).', example: 'Cough reflex trigger' },
      { term: 'Pleura', meaningAr: 'الغشاء الجنبي', definitionEn: 'Serous membrane folded back on itself to form a two-layered membranous pleural cavity.', example: 'Pleural effusion' },
      { term: 'Alveoli', meaningAr: 'الحويصلات الهوائية', definitionEn: 'Tiny air sacs in the lungs where rapid gas exchange occurs with pulmonary capillaries.', example: 'Surfactant production' },
      { term: 'Phrenic Nerve', meaningAr: 'العصب الحجابي', definitionEn: 'Nerve arising from C3, C4, C5 providing sole motor supply to the diaphragm.', example: 'Diaphragmatic paralysis' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Right Lung (3 Lobes: Superior, Middle, Inferior)',
        structureNameAr: 'الرئة اليمنى (ثلاثة فصوص)',
        positionX: 30,
        positionY: 45,
        whatIsIt: 'الرئة الأكبر المكونة من ثلاثة فصوص.',
        whereIsIt: 'في النصف الأيمن من الصدر.',
        functionDesc: 'تبادل الغازات بين الدم وهواء الشهيق.',
        howToRecognize: 'ثلاثة فصوص مفصولة بشق مائل وأفقي.',
        highYieldNote: 'شعبتها الهوائية أكثر عمودية وتستقبل الأجسام المستنشقة.',
        clinicalNote: 'استرواح الصدر يضغط الرئة مسبباً ضيق تنفس حاد.',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Left Lung Cardiac Notch',
        structureNameAr: 'الثلمة القلبية في الرئة اليسرى',
        positionX: 62,
        positionY: 52,
        whatIsIt: 'انخفاض مقعر في الحافة الأمامية للرئة اليسرى.',
        whereIsIt: 'في الفص العلوي للرئة اليسرى أمام قمة القلب.',
        functionDesc: 'يفسح مجالاً لبروز قمة البطين الأيسر للقلب.',
        howToRecognize: 'انحناء واضح في حافة الرئة يترك القلب ملامساً لجدار الصدر.',
        highYieldNote: 'يميز الرئة اليسرى عن الرئة اليمنى.',
        clinicalNote: 'اللسينة (Lingula) تقع أسفل الثلمة القلبية مباشرة.',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Trachea (Windpipe)',
        structureNameAr: 'الرغامي (القصبة الهوائية)',
        positionX: 48,
        positionY: 20,
        whatIsIt: 'أنبوب هوائي غضروفي صلب مفتوح دائماً.',
        whereIsIt: 'يمتد من الرقبة (C6) إلى داخل الصدر (T4/T5).',
        functionDesc: 'توصيل الهواء وترشيحه وتدفئته.',
        howToRecognize: 'حلقات غضروفية زجاجية على شكل حرف C.',
        highYieldNote: 'ينقسم عند زاوية لويس (Angle of Louis) إلى شعبتين.',
        clinicalNote: 'إجراء شق الرغامي (Tracheostomy) يتم بين الحلقات الغضروفية 2 و 3 في الرقبة.',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. الرئة اليمنى بها 3 فصوص (Superior, Middle, Inferior) واليسرى فصان مع ثلمة قلبية.',
      '2. الشعبة الهوائية اليمنى أوسع وأقصر وأكثر عمودية من الشعبة اليسرى.',
      '3. الرغامي تبدأ عند C6 وتنقسم عند T4/T5 (زاوية القص).',
      '4. الحجاب الحاجز يغذيه العصب الحجابي (Phrenic nerve: C3, C4, C5).',
      '5. الغشاء الجنبي (Pleura) يتكون من طبقة حشوية (Visceral) وطبقة جدارية (Parietal).'
    ],

    practiceQuestions: [
      {
        id: 'q_resp_1',
        questionEn: 'Which anatomical feature distinguishes the LEFT lung from the RIGHT lung?',
        questionAr: 'ما هي الخاصية التشريحية التي تميز الرئة اليسرى عن الرئة اليمنى؟',
        options: ['Presence of 3 lobes', 'Presence of the Cardiac notch and 2 lobes', 'Horizontal fissure', 'Wider main bronchus'],
        correctAnswer: 'Presence of the Cardiac notch and 2 lobes',
        explanationAr: 'الرئة اليسرى تحتوي على فصين فقط وثلمة قلبية (Cardiac notch) لتوفير حيز لقمة القلب.',
        explanationEn: 'The left lung has two lobes and a distinct cardiac notch on its anterior border.',
        examFocus: 'الفروق الأساسية بين الرئة اليمنى واليسرى.'
      },
      {
        id: 'q_resp_2',
        questionEn: 'Why are inhaled foreign bodies more likely to lodge in the RIGHT main bronchus?',
        questionAr: 'لماذا تدخل الأجسام الغريبة المستنشقة الشعبة الهوائية الرئيسية اليمنى غالباً؟',
        options: [
          'It is wider, shorter, and runs more vertically',
          'It is narrower and horizontal',
          'It has no cartilage rings',
          'It is longer than the left bronchus'
        ],
        correctAnswer: 'It is wider, shorter, and runs more vertically',
        explanationAr: 'الشعبة الهوائية الرئيسية اليمنى أوسع، أقصر، وأكثر استقامة مع اتجاه الرغامي.',
        explanationEn: 'The right main bronchus is wider, shorter, and more vertically aligned with the trachea.',
        examFocus: 'سؤال كلاسيكي في تشريح الجهاز التنفسي وطب الطوارئ.'
      }
    ]
  },

  // 10. DIGESTIVE SYSTEM
  {
    id: 'anat_digestive',
    topicNumber: 10,
    category: 'organ_systems',
    subCategory: 'digestive_system',
    titleEn: 'The Digestive System & Gastrointestinal Tract',
    titleAr: 'الجهاز الهضمي والقناة الهضمية',
    quickIdeaAr: 'القناة الهضمية والغدد الملحقة بها التي تهضم الطعام، تمتص العناصر الغذائية، وتتخلص من الفضلات.',
    quickIdeaEn: 'The alimentary canal and accessory organs that ingest, digest, absorb nutrients, and eliminate waste.',

    whatIsIt: {
      ar: 'أنبوب عضلي يمتد من الفم حتى فتحة الشرج مع أعضاء ملحقة (الكبد، المرارة، والبنكرياس).',
      en: 'Continuous muscular tube spanning oral cavity to anus with accessory glands (liver, gallbladder, pancreas).'
    },
    whereIsIt: {
      ar: 'يمتد عبر الرأس والرقبة والصدر ويملأ أغلب التجويف البطني والحوضي.',
      en: 'Extending through the thorax, abdomen, and pelvis within the peritoneal cavity.'
    },
    whatDoesItDo: {
      ar: 'تفتيت الطعام، الإفرازات الإنزيمية، امتصاص الماء والمغذيات عبر الأمعاء، وإخراج الفضلات.',
      en: 'Mechanical and enzymatic breakdown, nutrient/fluid absorption, and elimination of solid waste.'
    },
    whyImportant: {
      ar: 'معرفة تشريح البطن (الربع السفلي الأيمن للزائدة الدودية، المريء، والمعدة) ضروري لتشخيص آلام البطن الجراحية الحادة.',
      en: 'Essential for evaluating appendicitis, peptic ulcers, bowel obstruction, cholecystitis, and liver cirrhosis.'
    },
    howToRecognize: {
      ar: 'المعدة (Stomach: شكل حرف J)، الاثنا عشر (Duodenum: حلقة C حول رأس البنكرياس)، والزائدة الدودية في نقطة ماكبيرني.',
      en: 'J-shaped stomach, C-shaped duodenum cradling pancreatic head, and vermiform appendix in Right Lower Quadrant (RLQ).'
    },
    howAppearsInExam: {
      ar: 'تحديد أجزاء المعدة (Fundus, Body, Pylorus)، الاثنا عشر، الكبد (Liver وفصوصه)، ونقطة ماكبيرني (McBurney\'s point).',
      en: 'Identifying GI segments (Esophagus, Stomach, Duodenum, Jejunum, Ileum, Colon, Appendix), Liver lobes, and biliary ducts.'
    },
    highYieldSummary: 'Duodenum = C-loop around Pancreas | Liver = Largest internal gland | Appendix = McBurney point in RLQ',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    iconName: 'Utensils',

    corePoints: [
      'المريء (Esophagus): أنبوب عضلي بطول 25 سم ينقل الطعام من البلعوم للمعدة عبر فتحة الحجاب الحاجز عند مستوى T10.',
      'المعدة (Stomach): عضو عضلي مجوف يتكون من القاع (Fundus)، الجسم (Body)، والغار والبواب (Pylorus) الذي ينظم مرور الكيموس.',
      'الأمعاء الدقيقة (Small Intestine): بطول 6 أمتار مقسمة إلى: الاثنا عشر (Duodenum)، الصائم (Jejunum)، واللفائفي (Ileum).',
      'الكبد (Liver): أضخم غدة داخلية في الجسم، يقع في الربع العلوي الأيمن وله 4 فصوص تشريحية (Right, Left, Caudate, Quadrate).',
      'الزائدة الدودية (Appendix): أنبوب رتقي يخرج من الأعور (Cecum) في الربع السفلي الأيمن عند نقطة ماكبيرني (McBurney\'s point).'
    ],
    highYieldExamPoints: [
      'نقطة ماكبيرني (McBurney\'s point): تقع على بعد ثلثي المسافة من السرة إلى الشوكة الحرقفية الأمامية العلوية (ASIS) - موقع ألم الزائدة الدودية.',
      'القناة الصفراوية المشتركة (Common Bile Duct) تتحد مع القناة البنكرياسية الرئيسية لتصب في الجزء الثاني من الاثنا عشر عبر حليمة فاتر (Ampulla of Vater).',
      'الدورة البابية الكبدية (Hepatic Portal System): تنقل كل الدم الوريدي الممتص من الأمعاء والمعدة إلى الكبد أولاً عبر وريد الباب (Portal vein).'
    ],
    extraInfo: [
      'الثرب الكبير (Greater Omentum): طية صفاقية تشبه المريلة تتدلى من المعدة وتسمى "شرطي البطن" لأنها تحاصر الالتهابات.',
      'الحركات الدودية (Peristalsis): انقباضات عضلية تمعجية لاإرادية تدفع الطعام للأمام على طول القناة الهضمية.'
    ],

    keyStructures: [
      {
        nameEn: 'Stomach (Cardia, Fundus, Body, Pylorus)',
        nameAr: 'المعدة وأجزاؤها',
        location: 'Left upper quadrant (epigastric/left hypochondriac regions).',
        function: 'Acid digestion, churning of food into chyme, and intrinsic factor secretion.',
        howToRecognize: 'J-shaped muscular organ with lesser and greater curvatures.',
        clinicalNote: 'Pyloric stenosis in infants causes projectile non-bilious vomiting.',
        level: 'CORE'
      },
      {
        nameEn: 'Liver (Right & Left Lobes)',
        nameAr: 'الكبد وفصوصه',
        location: 'Right upper quadrant protected by lower ribs.',
        function: 'Bile production, metabolic processing, glycogen storage, and detoxification.',
        howToRecognize: 'Large wedge-shaped reddish-brown organ beneath right hemidiaphragm.',
        clinicalNote: 'Portal hypertension causes esophageal varices and caput medusae.',
        level: 'CORE'
      },
      {
        nameEn: 'Vermiform Appendix & Cecum',
        nameAr: 'الزائدة الدودية والأعور',
        location: 'Right lower quadrant at junction of ileum and cecum.',
        function: 'Lymphoid tissue gut immunity.',
        howToRecognize: 'Small blind-ended tube attached to posteromedial cecum with taeniae coli convergence.',
        clinicalNote: 'Acute appendicitis is the most common pediatric and young adult surgical emergency.',
        level: 'CORE'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'تحديد موقع الزائدة الدودية بدقة',
        titleEn: 'McBurney Point Location',
        wrongConcept: 'الاعتقاد بأن الزائدة تقع في منتصف البطن.',
        correctConcept: 'تقع الزائدة في الربع السفلي الأيمن (RLQ) عند نقطة ماكبيرني (ثلثي المسافة من السرة إلى ASIS).',
        explanation: 'أهم علامة سريرية للالتهاب الحاد للزائدة الدودية.'
      },
      {
        titleAr: 'الخلط بين أجزاء الأمعاء الدقيقة الثلاثة',
        titleEn: 'Small Intestine Segments',
        wrongConcept: 'نسيان الترتيب التشريحي للأمعاء الدقيقة.',
        correctConcept: 'الترتيب: الاثنا عشر (Duodenum) ← الصائم (Jejunum) ← اللفائفي (Ileum).',
        explanation: 'Duodenum (C-loop) ثم Jejunum ثم Ileum المتصل بالأعور.'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'DOW JONES INDUSTRIAL = DUODENUM, JEJUNUM, ILEUM',
        meaningAr: 'ترتيب أجزاء الأمعاء الدقيقة: اثنا عشر ثم صائم ثم لفائفي',
        explanation: 'D, J, I كاسم المؤشر المالي الشهير.'
      },
      {
        phraseEn: 'APPENDIX = McBURNEY POINT in RLQ',
        meaningAr: 'الزائدة الدودية في نقطة ماكبيرني بالربع السفلي الأيمن',
        explanation: 'موقع الألم والجس الكلاسيكي في التهاب الزائدة.'
      }
    ],

    clinicalNote: 'Clinical Note: علامة مورفي (Murphy\'s Sign): توقف الشهيق المفاجئ بسبب الألم عند جس أسفل الحافة الضلعية اليمنى أثناء الشهيق العميق، وهي علامة نوعية لالتهاب المرارة الحاد (Acute Cholecystitis).',

    keyTerms: [
      { term: 'McBurney\'s Point', meaningAr: 'نقطة ماكبيرني', definitionEn: 'Point 1/3 distance from anterior superior iliac spine to umbilicus; site of base of appendix.', example: 'Appendicitis tenderness' },
      { term: 'Duodenum', meaningAr: 'الاثنا عشر', definitionEn: 'First and shortest C-shaped segment of small intestine receiving bile and pancreatic juices.', example: 'Peptic duodenal ulcers' },
      { term: 'Portal Vein', meaningAr: 'وريد الباب الكبدي', definitionEn: 'Large vessel carrying nutrient-rich venous blood from GI tract to liver capillary sinusoids.', example: 'Portal hypertension' },
      { term: 'Peristalsis', meaningAr: 'الحركة التمعجية / الدودية', definitionEn: 'Involuntary waves of smooth muscle contraction propagating luminal contents through GI tract.', example: 'Bowel sounds' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Stomach (Body & Greater Curvature)',
        structureNameAr: 'جسم المعدة والانحناء الكبير',
        positionX: 55,
        positionY: 38,
        whatIsIt: 'العضو العضلي الرئيسي لهضم الطعام وتخزينه.',
        whereIsIt: 'في الربع العلوي الأيسر أسفل الحجاب الحاجز.',
        functionDesc: 'خلط الطعام مع العصارة المعدية وحمض الهيدروكلوريك (HCl).',
        howToRecognize: 'شكل حرف J مميز مع انحناء صغير وانحناء كبير.',
        highYieldNote: 'يفرز العامل الداخلي (Intrinsic Factor) لامتصاص فيتامين B12.',
        clinicalNote: 'القرحة المعدية شائعة بسبب جرثومة المعدة H. pylori.',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Liver (Right Major Lobe)',
        structureNameAr: 'الفص الأيمن للكبد',
        positionX: 32,
        positionY: 30,
        whatIsIt: 'أضخم فصوص الكبد وأكبر غدة في جسم الإنسان.',
        whereIsIt: 'في الربع العلوي الأيمن من البطن تحت الحجاب الحاجز.',
        functionDesc: 'إفراز العصارة الصفراوية واستقلاب الأدوية وتصنيع بروتينات البلازما.',
        howToRecognize: 'كتلة ضخمة ناعمة تشغل الجانب الأيمن العلوي من البطن.',
        highYieldNote: 'يستقبل 75% من ترويته عبر وريد الباب (Portal vein).',
        clinicalNote: 'تليف الكبد (Liver Cirrhosis) يسبب استسقاء البطن ودوالي المريء.',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Vermiform Appendix at Cecum (RLQ)',
        structureNameAr: 'الزائدة الدودية عند الأعور',
        positionX: 38,
        positionY: 78,
        whatIsIt: 'أنبوب لمفاوي صغير مسدود الطرف متصل بالأعور.',
        whereIsIt: 'في الحفرة الحرقفية اليمنى عند نقطة ماكبيرني.',
        functionDesc: 'عضو لمفاوي يحتوي على خلايا مناعية.',
        howToRecognize: 'أنبوب دودي معلق بقاع الأعور عند التقاء الأشرطة القولونية الثلاثة.',
        highYieldNote: 'موقع نقطة ماكبيرني (McBurney\'s point) في الربع السفلي الأيمن.',
        clinicalNote: 'التهاب الزائدة الدودية الحاد يتطلب استئصالاً جراحياً طارئاً لتفادي الانفجار.',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. المريء يعبر الحجاب الحاجز عند T10 ويصل إلى فؤاد المعدة.',
      '2. المعدة تقسم إلى: Cardia, Fundus, Body, Pylorus وتفرز حمض الهيدروكلوريك.',
      '3. الأمعاء الدقيقة: الاثنا عشر (Duodenum) ← الصائم (Jejunum) ← اللفائفي (Ileum).',
      '4. الكبد هو أضخم غدة ويفرز الصفراء ويقع في الربع العلوي الأيمن.',
      '5. الزائدة الدودية تقع في الربع السفلي الأيمن (RLQ) عند نقطة ماكبيرني.'
    ],

    practiceQuestions: [
      {
        id: 'q_dig_1',
        questionEn: 'Where is McBurney\'s point anatomically located on the anterior abdominal wall?',
        questionAr: 'أين تقع نقطة ماكبيرني تشريحياً على الجدار الأمامي للبطن؟',
        options: [
          'Two-thirds from the umbilicus to the Right Anterior Superior Iliac Spine (ASIS)',
          'Left upper quadrant near spleen',
          'Directly in the midline over the pubic bone',
          'One-third distance from the xiphoid process'
        ],
        correctAnswer: 'Two-thirds from the umbilicus to the Right Anterior Superior Iliac Spine (ASIS)',
        explanationAr: 'نقطة ماكبيرني تقع على مسافة ثلثين من السرة باتجاه الشوكة الحرقفية الأمامية العلوية اليمنى، وهي الموقع الكلاسيكي لقاعدة الزائدة الدودية.',
        explanationEn: 'McBurney\'s point lies 1/3 to 2/3 along the line from the ASIS to the umbilicus, marking the base of the appendix.',
        examFocus: 'أشهر نقطة تشريحية سريرية في اختبارات الجراحة والتشريح.'
      },
      {
        id: 'q_dig_2',
        questionEn: 'Which is the correct anatomical sequence of the three parts of the small intestine?',
        questionAr: 'ما هو الترتيب التشريحي الصحيح لأجزاء الأمعاء الدقيقة الثلاثة؟',
        options: [
          'Duodenum → Jejunum → Ileum',
          'Ileum → Duodenum → Jejunum',
          'Jejunum → Duodenum → Ileum',
          'Duodenum → Cecum → Colon'
        ],
        correctAnswer: 'Duodenum → Jejunum → Ileum',
        explanationAr: 'تبدأ الأمعاء الدقيقة بالاثنا عشر (Duodenum) ثم الصائم (Jejunum) وتنتهي باللفائفي (Ileum).',
        explanationEn: 'The small intestine progresses sequentially from Duodenum to Jejunum to Ileum.',
        examFocus: 'تسلسل أجزاء القناة الهضمية.'
      }
    ]
  },

  // 11. URINARY SYSTEM
  {
    id: 'anat_urinary',
    topicNumber: 11,
    category: 'organ_systems',
    subCategory: 'urinary_system',
    titleEn: 'The Urinary System & Renal Anatomy',
    titleAr: 'الجهاز البولي وتشريح الكليتين',
    quickIdeaAr: 'الكليتان والمسالك البولية التي تنقي الدم، تحافظ على توازن السوائل والأملاح، وتفرز الفضلات البولية.',
    quickIdeaEn: 'Paired kidneys and urinary tract that filter blood, regulate electrolyte/fluid balance, and excrete urine.',

    whatIsIt: {
      ar: 'جهاز الإخراج الكلوي المكون من كليتين، حالبين، مثانة بولية، ومجرى البول (الإحليل).',
      en: 'The renal excretory apparatus consisting of two kidneys, two ureters, a urinary bladder, and urethra.'
    },
    whereIsIt: {
      ar: 'تقع الكليتان خلف الصفاق (Retroperitoneal) على الجدار الخلفي للبطن بين مستويي T12 و L3.',
      en: 'Kidneys are retroperitoneal on posterior abdominal wall spanning vertebrae T12 to L3.'
    },
    whatDoesItDo: {
      ar: 'تنقية بلازما الدم من الفضلات النيتروجينية (اليوريا والكرياتينين)، ضبط ضغط الدم، وتوازن الكهارل والـ pH.',
      en: 'Filters metabolic waste, regulates systemic arterial blood pressure, osmolarity, acid-base, and urine formation.'
    },
    whyImportant: {
      ar: 'أمراض الفشل الكلوي، حصوات الحالب، والتهابات المسالك البولية تتطلب فهماً دقيقاً لمواقع التضيقات التشريحية للحالب وتشريح الكبيبة.',
      en: 'Key to understanding renal failure, nephrolithiasis (kidney stones at ureteric constrictions), and UTI.'
    },
    howToRecognize: {
      ar: 'الكلية شكل حبة فاصولياء (Bean-shaped)، الكلية اليمنى أوطأ قليلاً من اليسرى بسبب الكبد، والحالبان ينزلان للمثانة.',
      en: 'Bean-shaped organs with outer cortex, inner medulla pyramids, and renal pelvis; Right kidney sits slightly lower due to liver.'
    },
    howAppearsInExam: {
      ar: 'تحديد قشرة الكلية (Cortex) وأهرامات النخاع (Medullary Pyramids)، سُرّة الكلية (Hilum: V-A-U)، ومواقع تضيقات الحالب الثلاثة.',
      en: 'Identifying Renal cortex vs pyramids, renal hilum arrangement (Vein anterior, Artery middle, Pelvis/Ureter posterior: V-A-U), and bladder trigone.'
    },
    highYieldSummary: 'Right Kidney = Lower than left | Hilum arrangement = V-A-U (Vein, Artery, Ureter) | Nephron = Functional unit',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
    iconName: 'Droplets',

    corePoints: [
      'الموقع خلف الصفاق (Retroperitoneal): الكليتان تقعان خلف الغشاء البريتوني مجاورتين للعمود الفقري بين T12 و L3.',
      'الكلية اليمنى (Right Kidney): تقع في مستوى أدنى قليلاً (حوالي 1.5 سم) من الكلية اليسرى بسبب ضخامة الفص الأيمن للكبد فوقها.',
      'سُرّة الكلية (Renal Hilum): ترتيب التراكيب من الأمام إلى الخلف هو: الوريد الكلوي (Vein)، الشريان الكلوي (Artery)، ثم حويضة الكلية/الحالب (Ureter) - اختصار V-A-U.',
      'النفرون (Nephron): الوحدة التركيبية والوظيفية للكلية، ويحتوي كل كلية على حوالي مليون نفرون لتنقية الدم.',
      'المثانة البولية (Urinary Bladder): خزان عضلي مجوف في الحوض يحتوي على مثلث المثانة الأملس (Trigone) بين فتحتي الحالبين والإحليل.'
    ],
    highYieldExamPoints: [
      'التضيقات التشريحية الثلاثة للحالب (3 Ureteric Constrictions): عند الاتصال الحويضي الحالبي (PUJ)، عند عبور الحافة الحوضية (Pelvic brim)، وعند دخول جدار المثانة - وهي مواقع انحشار حصوات الكلى.',
      'الشريان الكلوي الأيمن (Right Renal Artery) أطول من الأيسر ويمر خلف الوريد الأجوف السفلي (IVC).',
      'الوريد الكلوي الأيسر (Left Renal Vein) أطول من الأيمن ويمر بين الشريان الأورطي والشريان المساريقي العلوي (Nutcracker phenomenon).'
    ],
    extraInfo: [
      'الغدة الكظرية (Adrenal / Suprarenal Gland): تستقر كالقبعة على القطب العلوي لكل كلية وتفرز الكورتيزول والأدرينالين والألدوستيرون.',
      'الترشيح الكبيبي: يتم ترشيح حوالي 180 لتراً من السوائل يومياً يُعاد امتصاص 99% منها ليخرج 1.5 لتر بول فقط.'
    ],

    keyStructures: [
      {
        nameEn: 'Kidney (Renal Cortex & Medulla)',
        nameAr: 'الكلية (القشرة والنخاع)',
        location: 'Retroperitoneal on posterior abdominal wall (T12-L3).',
        function: 'Blood filtration, waste excretion, renin secretion, and erythropoietin production.',
        howToRecognize: 'Bean-shaped organ with outer pale cortex and dark triangular medullary pyramids.',
        clinicalNote: 'Kidney transplant is placed in the iliac fossa anastomosed to iliac vessels.',
        level: 'CORE'
      },
      {
        nameEn: 'Renal Pelvis & Ureter',
        nameAr: 'حويضة الكلية والحالب',
        location: 'Exits renal hilum descending along psoas major muscle to pelvis.',
        function: 'Conveys urine from kidney calyces to bladder by peristaltic contractions.',
        howToRecognize: 'Funnel-shaped pelvis narrowing into a 25 cm slender muscular tube.',
        clinicalNote: 'Renal colic is excruciating colicky flank pain radiating to groin during stone passage.',
        level: 'CORE'
      },
      {
        nameEn: 'Urinary Bladder & Trigone',
        nameAr: 'المثانة البولية ومثلث المثانة',
        location: 'Lesser pelvis behind pubic symphysis.',
        function: 'Temporary urine reservoir with detrusor muscle contraction during micturition.',
        howToRecognize: 'Pyramidal collapsible muscular sac with smooth triangular base (Trigone).',
        clinicalNote: 'Urinary catheterization (Foley catheter) enters through urethra into bladder lumen.',
        level: 'CORE'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'نسيان لماذا الكلية اليمنى أوطأ من اليسرى',
        titleEn: 'Right Kidney Lower Position',
        wrongConcept: 'الاعتقاد بأن الكلية اليسرى هي الأكثر انخفاضاً.',
        correctConcept: 'الكلية اليمنى (Right Kidney) هي الأوطأ لأن الفص الأيمن الضخم للكبد يضغطها للأسفل.',
        explanation: 'الكلية اليمنى أخفض بنحو نصف فقرة (1.5-2 سم).'
      },
      {
        titleAr: 'ترتيب أوعية سُرّة الكلية من الأمام للخلف',
        titleEn: 'Renal Hilum V-A-U Rule',
        wrongConcept: 'الخلط بين موقع الشريان والوريد والحالب في السرة.',
        correctConcept: 'الترتيب من الأمام للخلف: وريد (V) ثم شريان (A) ثم حالب/حويضة (U) = V-A-U.',
        explanation: 'احفظ الاختصار V-A-U (Vein, Artery, Ureter).'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'V-A-U = VEIN, ARTERY, URETER (Front to Back)',
        meaningAr: 'ترتيب سرة الكلية من الأمام للخلف: وريد ثم شريان ثم حالب',
        explanation: 'أسهل طريقة لتذكر ترتيب مدخل الكلية في الامتحان العملي.'
      },
      {
        phraseEn: 'RIGHT KIDNEY IS LOWER because LIVER LIES OVER IT',
        meaningAr: 'الكلية اليمنى أوطأ بسبب وجود الكبد فوقها',
        explanation: 'الكبد يدفع الكلية اليمنى للأسفل.'
      }
    ],

    clinicalNote: 'Clinical Note: المغص الكلوي (Renal Colic) هو ألم حاد يبدأ في الخاصرة وينتشر نحو المنطقة الإربية والأعضاء التناسلية بسبب انسداد الحالب بحصوة كلوية عند أحد التضيقات الثلاثة.',

    keyTerms: [
      { term: 'Retroperitoneal', meaningAr: 'خلف الصفاق', definitionEn: 'Located behind the peritoneum lining the abdominal cavity, against posterior wall.', example: 'Kidneys, pancreas, aorta' },
      { term: 'Nephron', meaningAr: 'النفرون (الوحدة الأنبوبية الكلوية)', definitionEn: 'Microscopic functional filtration unit of kidney comprising glomerulus and tubules.', example: '1 million per kidney' },
      { term: 'Renal Hilum', meaningAr: 'سُرّة الكلية', definitionEn: 'Medial vertical fissure where renal vessels, nerves, and renal pelvis enter/exit (V-A-U).', example: 'Vascular clamping' },
      { term: 'Trigone', meaningAr: 'مثلث المثانة', definitionEn: 'Smooth triangular area on inner floor of bladder demarcated by two ureteric orifices and internal urethral orifice.', example: 'Cystoscopy landmark' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Renal Cortex & Glomeruli',
        structureNameAr: 'قشرة الكلية والكبيبات',
        positionX: 30,
        positionY: 40,
        whatIsIt: 'الطبقة الخارجية الفاتحة المحيطة بالنخاع الكلوي.',
        whereIsIt: 'أسفل المحفظة الليفية الخارجية للكلية.',
        functionDesc: 'ترشيح الدم واحتواء الكبيبات الكلوية والأنابيب الملتفة.',
        howToRecognize: 'شريط محيطي ذو مظهر حبيبي يمتد بين الأهرامات كأعمدة كلوية.',
        highYieldNote: 'تحتوي على كبيبات ملبيجي (Glomeruli) المسؤولة عن الترشيح.',
        clinicalNote: 'التهاب كبيبات الكلى (Glomerulonephritis) يصيب هذه المنطقة.',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Renal Medulla (Renal Pyramids)',
        structureNameAr: 'أهرامات النخاع الكلوي',
        positionX: 42,
        positionY: 55,
        whatIsIt: 'المخاريط النخاعية المخططة التي تصب في الكؤوس الكلوية.',
        whereIsIt: 'في الجزء الداخلي الأعمق من الكلية.',
        functionDesc: 'تركيز البول وإعادة امتصاص الماء عبر عروة هنلي وأنابيب الجمع.',
        howToRecognize: 'تراكيب مثلثة/هرمية مخططة تتجه قممها (Papillae) نحو السرة.',
        highYieldNote: 'حليمات الأهرامات تصب في الكؤوس الصغيرة (Minor calyces).',
        clinicalNote: 'النخر الحليمي الكلوي (Papillary necrosis) يحدث مع مسكنات الألم والسكري.',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Ureter exiting Renal Pelvis',
        structureNameAr: 'الحالب الخارج من حويضة الكلية',
        positionX: 55,
        positionY: 70,
        whatIsIt: 'الأنبوب العضلي الناقل للبول من الكلية للمثانة.',
        whereIsIt: 'يخرج من سُرّة الكلية وينزل على العضلة القطنية الكبيرة (Psoas major).',
        functionDesc: 'نقل البول بانقباضات تمعجية للمثانة البولية.',
        howToRecognize: 'أنبوب مرن رقيق يقع خلف الأوعية الكلوية في السرة.',
        highYieldNote: 'يحتوي على 3 مواقع تضيق طبيعية تنحشر فيها الحصوات.',
        clinicalNote: 'حصوات الحالب تسبب المغص الكلوي الحاد وبيلة دموية (Hematuria).',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. الكليتان خلف الصفاق (Retroperitoneal) بين T12 و L3.',
      '2. الكلية اليمنى أوطأ من الكلية اليسرى بـ 1.5 سم لوجود الكبد فوقها.',
      '3. ترتيب السرة من الأمام للخلف: وريد (V) ثم شريان (A) ثم حالب (U).',
      '4. النفرون (Nephron) هو الوحدة الوظيفية الأساسية للكلية.',
      '5. الحالب يمتلك 3 مواقع تضيق تشريحية تشكل مواضع انحشار حصوات الكلى.'
    ],

    practiceQuestions: [
      {
        id: 'q_uri_1',
        questionEn: 'From ANTERIOR to POSTERIOR, what is the correct arrangement of structures at the RENAL HILUM?',
        questionAr: 'من الأمام إلى الخلف، ما هو الترتيب الصحيح للتراكيب في سُرّة الكلية (Renal Hilum)؟',
        options: [
          'Renal Vein → Renal Artery → Renal Pelvis/Ureter (V-A-U)',
          'Renal Artery → Renal Vein → Ureter',
          'Ureter → Renal Artery → Renal Vein',
          'Renal Pelvis → Renal Vein → Renal Artery'
        ],
        correctAnswer: 'Renal Vein → Renal Artery → Renal Pelvis/Ureter (V-A-U)',
        explanationAr: 'ترتيب التراكيب في سُرّة الكلية من الأمام للخلف هو: الوريد الكلوي أولاً، ثم الشريان الكلوي في المنتصف، ثم حويضة الكلية والحالب في الخلف (V-A-U).',
        explanationEn: 'At the renal hilum, the anterior-to-posterior order is Renal Vein, Renal Artery, and Renal Pelvis (V-A-U).',
        examFocus: 'أشهر سؤال عملي وتشريحي عن سُرّة الكلية.'
      },
      {
        id: 'q_uri_2',
        questionEn: 'Why is the right kidney positioned slightly lower than the left kidney?',
        questionAr: 'لماذا تقع الكلية اليمنى في مستوى أوطأ قليلاً من الكلية اليسرى؟',
        options: [
          'Due to the bulk of the large right lobe of the liver above it',
          'Due to the position of the stomach',
          'Due to the spleen',
          'Due to the pelvic bones'
        ],
        correctAnswer: 'Due to the bulk of the large right lobe of the liver above it',
        explanationAr: 'الفص الأيمن الضخم للكبد يضغط الكلية اليمنى للأسفل بنحو 1.5 إلى 2 سم مقارنة باليسرى.',
        explanationEn: 'The massive right lobe of the liver pushes the right kidney slightly lower than the left.',
        examFocus: 'الموقع التشريحي للكليتين وعلاقتهما بالأعضاء المجاورة.'
      }
    ]
  },

  // 12. REPRODUCTIVE SYSTEM
  {
    id: 'anat_reproductive',
    topicNumber: 12,
    category: 'organ_systems',
    subCategory: 'reproductive_system',
    titleEn: 'The Reproductive System (Genital Anatomy)',
    titleAr: 'الجهاز التناسلي والتشريح الحوضي',
    quickIdeaAr: 'الأعضاء التناسلية الذكرية والأنثوية في الحوض المسؤولة عن إنتاج الأمشاج والهرمونات الجنسية والتكاثر.',
    quickIdeaEn: 'Male and female pelvic organs producing gametes, synthesizing sex hormones, and supporting reproduction.',

    whatIsIt: {
      ar: 'الأجهزة التناسلية الذكرية (الخصيتان، البربخ، الأسهر، البروستاتا) والأنثوية (المبيضان، قنوات فالوب، الرحم، المهبل).',
      en: 'Male gonads and ducts (testes, epididymis, vas deferens, prostate) and female organs (ovaries, uterine tubes, uterus, vagina).'
    },
    whereIsIt: {
      ar: 'داخل تجويف الحوض الحقيقي (True Pelvis) والعجان (Perineum).',
      en: 'Located predominantly within the true pelvic cavity and perineal spaces.'
    },
    whatDoesItDo: {
      ar: 'إنتاج النطاف والبويضات، إفراز هرمونات التستوستيرون والإستروجين، واحتضان الجنين ونموه في الرحم.',
      en: 'Gametogenesis (sperm & ova production), sex hormone synthesis, fertilization, and fetal gestation.'
    },
    whyImportant: {
      ar: 'فهم العقم، الحمل خارج الرحم (Ectopic pregnancy)، تضخم البروستاتا، والولادة يتطلب تشريحاً حوضياً متقناً.',
      en: 'Essential for clinical obstetrics, gynecology, urology, ectopic pregnancy management, and prostate health.'
    },
    howToRecognize: {
      ar: 'الرحم (Uterus: شكل كمثري مقلوب في وضع انثناء للأمام)، المبيضين وقناة فالوب، والبروستاتا أسفل عنق المثانة.',
      en: 'Pear-shaped uterus (anteverted/anteflexed), almond-shaped ovaries, Fallopian ampulla (site of fertilization), and walnut-sized prostate.'
    },
    howAppearsInExam: {
      ar: 'تحديد موقع الإخصاب في قناة فالوب (Ampulla)، وضع الرحم الطبيعي (Anteverted & Anteflexed)، ومسار الحبل المنوي.',
      en: 'Locating site of fertilization (Ampulla of fallopian tube), normal uterine orientation (Anteverted/Anteflexed), and prostate lobes.'
    },
    highYieldSummary: 'Fertilization site = Ampulla of Fallopian Tube | Normal Uterus = Anteverted & Anteflexed | Prostate = Below Bladder',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    iconName: 'User',

    corePoints: [
      'الرحم (Uterus): عضو عضلي سميك الجدار يشبه الكمثرى، يتكون من القاع (Fundus)، الجسم (Body)، والعنق (Cervix).',
      'الوضعية الطبيعية للرحم: منقلب للأمام (Anteverted - بزاوية 90° مع المهبل) ومنحنٍ للأمام (Anteflexed - بزاوية 120-170° مع العنق).',
      'قناة فالوب (Uterine / Fallopian Tube): تتكون من القمع (Infundibulum مع الخمل Fimbriae)، المجورة (Ampulla - موقع الإخصاب)، والبرزخ (Isthmus).',
      'الخصية (Testis): الغدة التناسلية الذكرية وتقع داخل كيس الصفن خارج البطن لأن إنتاج الحيوانات المنوية يتطلب درجة حرارة أقل بـ 2-3 درجات مئوية.',
      'غدة البروستاتا (Prostate Gland): غدة ليفية عضلية بحجم حبة الجوز تحيط بالإحليل الذكري أسفل عنق المثانة مباشرة.'
    ],
    highYieldExamPoints: [
      'الموقع الطبيعي للإخصاب (Site of Fertilization): يحدث دائماً في مجورة قناة فالوب (Ampulla of the Uterine Tube).',
      'رتق دوغلاس (Pouch of Douglas / Rectouterine Pouch): أعمق نقطة في التجويف البريتوني للمرأة وتتجمع فيها السوائل والدم.',
      'تضخم البروستاتا الحميد (BPH): ينشأ في المنطقة الانتقالية (Transition zone) ويضغط الإحليل مسبباً صعوبة التبول.'
    ],
    extraInfo: [
      'الوعاء الناقل (Vas Deferens): ينقل النطاف من البربخ ويمر عبر القناة الإربية (Inguinal canal) إلى الإحليل.',
      'الحمل خارج الرحم (Ectopic Pregnancy): ينغرس الجنين غالباً في قناة فالوب ويشكل حالة طارئة تهدد الحياة بالنزف الداخلي.'
    ],

    keyStructures: [
      {
        nameEn: 'Uterus & Endometrium',
        nameAr: 'الرحم وبطانة الرحم',
        location: 'Lesser pelvis between urinary bladder anteriorly and rectum posteriorly.',
        function: 'Gestation and development of the fetus with muscular myometrium for labor.',
        howToRecognize: 'Inverted pear-shaped organ with fundus, body, and cervix.',
        clinicalNote: 'Cervical cancer screening is performed via Pap smear from the cervical transformation zone.',
        level: 'CORE'
      },
      {
        nameEn: 'Uterine Tube & Ampulla',
        nameAr: 'قناة فالوب ومجورة الأنبوب',
        location: 'Upper free border of broad ligament extending from uterine cornu to ovary.',
        function: 'Captures ovum via fimbriae; site of fertilization in ampulla; transports zygote.',
        howToRecognize: 'Trumpet-shaped muscular tube with finger-like fimbriae near ovary.',
        clinicalNote: '95% of ectopic pregnancies occur within the ampulla of the fallopian tube.',
        level: 'CORE'
      },
      {
        nameEn: 'Prostate Gland',
        nameAr: 'غدة البروستاتا',
        location: 'Pelvis immediately below bladder neck encircling prostatic urethra.',
        function: 'Secretes alkaline proteolytic fluid nourishing and activating spermatozoa.',
        howToRecognize: 'Walnut-sized glandular mass traversed by urethra and ejaculatory ducts.',
        clinicalNote: 'Digital rectal exam (DRE) palpates the posterior prostate lobe for nodules in prostate cancer.',
        level: 'CORE'
      }
    ],

    commonMistakes: [
      {
        titleAr: 'تحديد موقع الإخصاب الحقيقي للبويضة',
        titleEn: 'Fertilization Site in Fallopian Tube',
        wrongConcept: 'الاعتقاد بأن الإخصاب يحدث داخل تجويف الرحم.',
        correctConcept: 'الإخصاب الطبيعي يحدث في مجورة قناة فالوب (Ampulla of the uterine tube)، ثم تنتقل البويضة الملقحة للرحم لتنغرس فيه.',
        explanation: 'سؤال امتحان مشهور جداً في علم الأجنة والتشريح.'
      },
      {
        titleAr: 'الوضعية التشريحية الطبيعية للرحم',
        titleEn: 'Anteverted vs Retroverted Uterus',
        wrongConcept: 'الاعتقاد بأن الرحم مستقيم رأسياً.',
        correctConcept: 'الوضع الطبيعي هو Anteverted (مائل للأمام فوق المثانة) و Anteflexed (منحنٍ للأمام فوق عنق الرحم).',
        explanation: 'الرحم المائل للخلف يسمى Retroverted.'
      }
    ],

    memoryAids: [
      {
        phraseEn: 'FERTILIZATION = AMPULLA (A for Always First in Ampulla)',
        meaningAr: 'الإخصاب يحدث دائماً في مجورة قناة فالوب (Ampulla)',
        explanation: 'الموقع الأكثر اتساعاً في الأنبوب الرحمي.'
      },
      {
        phraseEn: 'UTERUS = ANTEVERTED & ANTEFLEXED',
        meaningAr: 'الرحم منقلب ومنحنٍ للأمام فوق المثانة',
        explanation: 'الوضعية الطبيعية لمعظم النساء.'
      }
    ],

    clinicalNote: 'Clinical Note: الحمل الأنبوبي المنتبذ (Tubal Ectopic Pregnancy) في مجورة قناة فالوب قد يؤدي لتمزق الأنبوب ونزف بطني صاعق يتطلب تدخلاً جراحياً فورياً.',

    keyTerms: [
      { term: 'Ampulla', meaningAr: 'مجورة قناة فالوب', definitionEn: 'Widest and longest segment of uterine tube where fertilization classically occurs.', example: 'Ectopic pregnancy site' },
      { term: 'Anteversion', meaningAr: 'الانقلاب للأمام', definitionEn: 'Normal forward angling of long axis of cervix relative to long axis of vagina (~90°).', example: 'Normal uterine position' },
      { term: 'Pouch of Douglas', meaningAr: 'رتق دوغلاس (الردبة المستقيمية الرحمية)', definitionEn: 'Deepest peritoneal recess in female pelvis between rectum and posterior uterine wall.', example: 'Culdocentesis' },
      { term: 'Vas Deferens', meaningAr: 'الأسهر (الوعاء الناقل)', definitionEn: 'Excretory duct of testis conveying sperm from epididymis through inguinal canal to ejaculatory duct.', example: 'Vasectomy' }
    ],

    spotterItems: [
      {
        pinNumber: 1,
        structureNameEn: 'Uterus (Fundus & Body in Pelvis)',
        structureNameAr: 'الرحم (القاع والجسم)',
        positionX: 50,
        positionY: 45,
        whatIsIt: 'العضو العضلي الحوضي المسؤول عن احتضان الجنين.',
        whereIsIt: 'في الحوض الحقيقي بين المثانة من الأمام والمستقيم من الخلف.',
        functionDesc: 'احتضان ونمو الجنين والانقباض أثناء الولادة.',
        howToRecognize: 'عضو كمثري الشكل ذو جدار عضلي سميك (Myometrium).',
        highYieldNote: 'وضعيته الطبيعية Anteverted & Anteflexed.',
        clinicalNote: 'الأورام الليفية الرحمية (Uterine Fibroids) شائعة جداً في جداره.',
        level: 'CORE'
      },
      {
        pinNumber: 2,
        structureNameEn: 'Ampulla of Fallopian (Uterine) Tube',
        structureNameAr: 'مجورة قناة فالوب (موقع الإخصاب)',
        positionX: 68,
        positionY: 38,
        whatIsIt: 'الجزء الأوسع والأطول من قناة فالوب.',
        whereIsIt: 'يمتد أفقياً في الحافة العلوية للرباط العريض نحو المبيض.',
        functionDesc: 'الموقع الطبيعي لحدوث الإخصاب بين النطفة والبويضة.',
        howToRecognize: 'أنبوب متموج متسع ينتهي بالقمع والخمل بالقرب من المبيض.',
        highYieldNote: 'الموقع الكلاسيكي للأخصاب (Site of Fertilization).',
        clinicalNote: 'الموقع الأكثر شيوعاً لحدوث الحمل خارج الرحم (Ectopic Pregnancy).',
        level: 'CORE'
      },
      {
        pinNumber: 3,
        structureNameEn: 'Prostate Gland (Male Pelvic Specimen)',
        structureNameAr: 'غدة البروستاتا',
        positionX: 48,
        positionY: 65,
        whatIsIt: 'غدة ذكرية ليفية عضلية تحيط بالإحليل.',
        whereIsIt: 'أسفل عنق المثانة البولية وأمام المستقيم.',
        functionDesc: 'إفراز السائل المنوي القلوي المغذي للحيوانات المنوية.',
        howToRecognize: 'غدة بحجم الجوزة يخترقها الإحليل البولي.',
        highYieldNote: 'تفرز مستضد البروستاتا النوعي (PSA).',
        clinicalNote: 'تضخم البروستاتا يسبب عسر التبول واحتباس البول عند كبار السن.',
        level: 'CORE'
      }
    ],

    quickReviewPoints: [
      '1. الإخصاب الطبيعي يحدث في مجورة قناة فالوب (Ampulla of Fallopian tube).',
      '2. الوضع الطبيعي للرحم: Anteverted (منقلب للأمام) و Anteflexed (منحنٍ للأمام).',
      '3. رتق دوغلاس (Pouch of Douglas) هو أعمق نقطة في حوض المرأة.',
      '4. البروستاتا تقع أسفل عنق المثانة وتحيط بالإحليل البروستاتي.',
      '5. الخصيتان تقعان في كيس الصفن خارج البطن لخفض الحرارة لإنتاج النطاف.'
    ],

    practiceQuestions: [
      {
        id: 'q_rep_1',
        questionEn: 'In human anatomy, where does normal FERTILIZATION of the ovum typically take place?',
        questionAr: 'في التشريح البشري، أين يحدث الإخصاب الطبيعي للبويضة عادةً؟',
        options: [
          'Ampulla of the Uterine (Fallopian) tube',
          'Uterine cavity fundus',
          'Cervical canal',
          'Vaginal fornix'
        ],
        correctAnswer: 'Ampulla of the Uterine (Fallopian) tube',
        explanationAr: 'الإخصاب الطبيعي يحدث في مجورة قناة فالوب (Ampulla)، وهي الجزء الأكثر اتساعاً من الأنبوب الرحمي.',
        explanationEn: 'Fertilization classically occurs in the ampulla of the fallopian tube.',
        examFocus: 'سؤال أساسي في علم الأجنة وتشريح الجهاز التناسلي.'
      },
      {
        id: 'q_rep_2',
        questionEn: 'What is the normal anatomical orientation of the non-pregnant human UTERUS?',
        questionAr: 'ما هي الوضعية التشريحية الطبيعية للرحم غير الحامل في المرأة؟',
        options: [
          'Anteverted and Anteflexed',
          'Retroverted and Retroflexed',
          'Vertical midline',
          'Lateral inverted'
        ],
        correctAnswer: 'Anteverted and Anteflexed',
        explanationAr: 'الوضع الطبيعي لمعظم النساء هو أن يكون الرحم مائلاً ومنحنياً للأمام فوق المثانة البولية (Anteverted & Anteflexed).',
        explanationEn: 'The uterus normally lies in an anteverted and anteflexed position over the bladder.',
        examFocus: 'وضعية الرحم في الحوض.'
      }
    ]
  }
];

export interface AnatomyExamQuestionItem {
  id: string;
  image: string;
  markerPosition?: { x: number; y: number };
  markerLabel?: string;
  questionType: 'multiple_choice' | 'type_in' | 'pin_select' | 'direction_movement';
  questionEn: string;
  questionAr: string;
  promptAr: string;
  promptEn: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanationAr: string;
  explanationEn: string;
  topicId: string;
  structureNameEn: string;
  structureNameAr: string;
  examPearl: string;
}

export interface AnatomyExamConfig {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: 'all' | 'bones' | 'muscles' | 'organ_systems' | 'planes_terms';
  questionCount: number;
  timePerQuestionSec: number;
  iconName: string;
  questions: AnatomyExamQuestionItem[];
}

export const ANATOMY_PRACTICAL_EXAMS: AnatomyExamConfig[] = [
  {
    id: 'exam_comprehensive',
    titleAr: 'الاختبار العملي الشامل (تشريح + عظام + عضلات + أجهزة)',
    titleEn: 'Comprehensive Anatomy Practical Exam (All Modules)',
    descriptionAr: 'اختبار عملي متكامل يغطي جميع محطات التشريح الطبي (OSPE): عظام، عضلات، مفاصل، اتجاهات، وأجهزة الجسم مع مؤقت 30 ثانية لكل سؤال.',
    descriptionEn: 'Full OSPE practical exam covering bones, muscles, joints, directional planes, and organ systems with a 30s timer.',
    category: 'all',
    questionCount: 20,
    timePerQuestionSec: 30,
    iconName: 'GraduationCap',
    questions: [
      {
        id: 'q_ex_1',
        image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 50, y: 35 },
        markerLabel: 'A',
        questionType: 'type_in',
        questionEn: 'Identify the highlighted longest and strongest bone in the human body.',
        questionAr: 'اكتب اسم العظمة المحددة والتي تعتبر أطول وأقوى عظمة في جسم الإنسان.',
        promptAr: 'اكتب اسم العظمة (باللغة الإنجليزية أو العربية):',
        promptEn: 'Type the exact anatomical name of the highlighted bone:',
        correctAnswer: 'Femur',
        acceptableAnswers: ['femur', 'thigh bone', 'عظم الفخذ', 'الفخذ', 'os femoris'],
        explanationAr: 'عظم الفخذ (Femur) هو أطول وأثقل وأقوى عظم في الهيكل البشري ويتحمل ثقل الجسم بالكامل.',
        explanationEn: 'The Femur is the single bone of the thigh and the longest/heaviest bone in the body.',
        topicId: 'anat_skeletal',
        structureNameEn: 'Femur (Thigh Bone)',
        structureNameAr: 'عظم الفخذ',
        examPearl: 'كسور عنق الفخذ (Femoral neck fractures) قد تؤدي للنخر اللاوعائي (AVN) لرأس الفخذ.'
      },
      {
        id: 'q_ex_2',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 45, y: 50 },
        markerLabel: 'B',
        questionType: 'multiple_choice',
        questionEn: 'Identify the weight-bearing medial bone of the leg indicated by the arrow.',
        questionAr: 'تعرّف على العظمة الأنسية الحاملة لثقل الجسم في الساق الموضحة بالسهم.',
        promptAr: 'اختر الإجابة الصحيحة:',
        promptEn: 'Select the correct anatomical structure:',
        options: ['Tibia (قصبة الساق)', 'Fibula (الشظية)', 'Femur (الفخذ)', 'Radius (الكعبرة)'],
        correctAnswer: 'Tibia (قصبة الساق)',
        acceptableAnswers: ['tibia', 'tibia (قصبة الساق)', 'قصبة الساق', 'القصبة'],
        explanationAr: 'القصبة (Tibia) هي العظمة الإنسية الكبيرة الحاملة للوزن في الساق، وتتميز بوجود الأحدوبة القصبية والحافة الأمامية البارزة.',
        explanationEn: 'The Tibia is the large medial weight-bearing bone of the leg.',
        topicId: 'anat_skeletal',
        structureNameEn: 'Tibia (Shin Bone)',
        structureNameAr: 'عظم القصبة (الساق)',
        examPearl: 'السطح الأنسي للقصبة يقع تحت الجلد مباشرة دون عضلات، لذا فإن كسوره غالباً ما تكون مفتوحة (Compound fractures).'
      },
      {
        id: 'q_ex_3',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 30, y: 25 },
        markerLabel: 'C',
        questionType: 'multiple_choice',
        questionEn: 'Identify the muscle covering the shoulder joint responsible for arm abduction from 15° to 90°.',
        questionAr: 'تعرّف على العضلة التي تغطي مفصل الكتف والمسؤولة عن تبعيد الذراع من 15° إلى 90°.',
        promptAr: 'اختر العضلة والعصب المغذي لها:',
        promptEn: 'Select the correct muscle and nerve:',
        options: [
          'Deltoid muscle (Axillary nerve)',
          'Biceps brachii (Musculocutaneous nerve)',
          'Triceps brachii (Radial nerve)',
          'Supraspinatus (Suprascapular nerve)'
        ],
        correctAnswer: 'Deltoid muscle (Axillary nerve)',
        acceptableAnswers: ['deltoid', 'deltoid muscle', 'العضلة الدالية'],
        explanationAr: 'العضلة الدالية (Deltoid) تغطي قمة الكتف وتبعد الذراع من 15° إلى 90° ويغذيها العصب الإبطي (Axillary nerve).',
        explanationEn: 'The Deltoid muscle abducts the arm from 15° to 90° and is supplied by the Axillary nerve.',
        topicId: 'anat_muscles',
        structureNameEn: 'Deltoid Muscle',
        structureNameAr: 'العضلة الدالية',
        examPearl: 'خلع الكتف الأمامي (Anterior shoulder dislocation) قد يضغط العصب الإبطي مما يؤدي لشلل العضلة الدالية وخدر جلد الكتف.'
      },
      {
        id: 'q_ex_4',
        image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 55, y: 60 },
        markerLabel: 'D',
        questionType: 'multiple_choice',
        questionEn: 'Identify the heart chamber with the thickest muscular wall pumping oxygenated blood to the body.',
        questionAr: 'تعرّف على حجرة القلب ذات الجدار العضلي الأكثر سمكاً والتي تضخ الدم المؤكسج لكامل الجسم.',
        promptAr: 'اختر حجرة القلب الصحيحة:',
        promptEn: 'Select the correct heart chamber:',
        options: [
          'Left Ventricle (البطين الأيسر)',
          'Right Ventricle (البطين الأيمن)',
          'Left Atrium (الأذين الأيسر)',
          'Right Atrium (الأذين الأيمن)'
        ],
        correctAnswer: 'Left Ventricle (البطين الأيسر)',
        acceptableAnswers: ['left ventricle', 'البطين الأيسر', 'lv'],
        explanationAr: 'البطين الأيسر (Left Ventricle) يمتلك جداراً عضلياً أسمك بثلاث مرات من الأيمن ليضخ الدم عبر الشريان الأورطي بضغط عالٍ.',
        explanationEn: 'The Left Ventricle has the thickest myocardium to overcome high systemic vascular resistance.',
        topicId: 'anat_cardio',
        structureNameEn: 'Left Ventricle (Myocardium)',
        structureNameAr: 'البطين الأيسر',
        examPearl: 'الاحتشاء في الجدار الأمامي للبطين الأيسر ينتج عادة عن انسداد الشريان التاجي الأمامي النازل (LAD).'
      },
      {
        id: 'q_ex_5',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 65, y: 55 },
        markerLabel: 'E',
        questionType: 'multiple_choice',
        questionEn: 'Identify the brain region located in the posterior cranial fossa responsible for balance and motor coordination.',
        questionAr: 'تعرّف على منطقة الدماغ الموجودة في الحفرة القحفية الخلفية والمسؤولة عن الاتزان وتنسيق الحركات.',
        promptAr: 'اختر التركيب العصبي:',
        promptEn: 'Select the neural structure:',
        options: [
          'Cerebellum (المخيخ)',
          'Cerebrum Frontal Lobe (الفص الجبهي للمخ)',
          'Brainstem (جذع الدماغ)',
          'Occipital Lobe (الفص القذالي)'
        ],
        correctAnswer: 'Cerebellum (المخيخ)',
        acceptableAnswers: ['cerebellum', 'المخيخ'],
        explanationAr: 'المخيخ (Cerebellum) يقع في الحفرة القحفية الخلفية وهو مسؤول عن تناسق الحركات الإرادية وتوازن المشي والقامة.',
        explanationEn: 'The Cerebellum coordinates voluntary movements, posture, and equilibrium.',
        topicId: 'anat_nervous',
        structureNameEn: 'Cerebellum',
        structureNameAr: 'المخيخ',
        examPearl: 'تلف المخيخ يسبب ترنح المشي (Ataxia)، ورعاش الحركة القصدي (Intention Tremor).'
      },
      {
        id: 'q_ex_6',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 60, y: 50 },
        markerLabel: 'F',
        questionType: 'multiple_choice',
        questionEn: 'Which landmark on the anterior border of the LEFT lung accommodates the apex of the heart?',
        questionAr: 'أي معلم تشريحي على الحافة الأمامية للرئة اليسرى يستوعب قمة القلب؟',
        promptAr: 'اختر التركيب التشريحي للرئة:',
        promptEn: 'Select the anatomical feature:',
        options: [
          'Cardiac Notch (الثلمة القلبية)',
          'Horizontal Fissure (الشق الأفقي)',
          'Middle Lobe (الفص الأوسط)',
          'Carina (جؤجؤ الرغامي)'
        ],
        correctAnswer: 'Cardiac Notch (الثلمة القلبية)',
        acceptableAnswers: ['cardiac notch', 'الثلمة القلبية'],
        explanationAr: 'الثلمة القلبية (Cardiac Notch) هي تقعر مميز في الفص العلوي للرئة اليسرى ليفسح مجالاً لبروز قمة البطين الأيسر للقلب.',
        explanationEn: 'The Cardiac Notch on the anterior border of the left lung provides room for the heart.',
        topicId: 'anat_respiratory',
        structureNameEn: 'Cardiac Notch of Left Lung',
        structureNameAr: 'الثلمة القلبية في الرئة اليسرى',
        examPearl: 'اللسينة (Lingula) هي لسان نسيجي يقع مباشرة أسفل الثلمة القلبية ويناظر الفص الأوسط للرئة اليمنى.'
      },
      {
        id: 'q_ex_7',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 38, y: 78 },
        markerLabel: 'G',
        questionType: 'type_in',
        questionEn: 'Name the clinical landmark on the abdominal wall located 2/3 distance from umbilicus to ASIS representing the appendix.',
        questionAr: 'اكتب اسم النقطة السريرية الشهيرة على جدار البطن التي تمثل قاعدة الزائدة الدودية.',
        promptAr: 'اكتب اسم النقطة السريرية (مثال: McBurney):',
        promptEn: 'Type the clinical landmark name:',
        correctAnswer: "McBurney's Point",
        acceptableAnswers: ["mcburney", "mcburney's point", "mcburney point", "نقطة ماكبيرني", "ماكبيرني"],
        explanationAr: 'نقطة ماكبيرني (McBurney\'s point) تقع على بعد ثلثين من السرة إلى الشوكة الحرقفية الأمامية العلوية وتكون مؤلمة جداً بالجس في التهاب الزائدة.',
        explanationEn: 'McBurney\'s point corresponds to the anatomical base of the vermiform appendix.',
        topicId: 'anat_digestive',
        structureNameEn: "McBurney's Point / Appendix",
        structureNameAr: 'نقطة ماكبيرني / الزائدة الدودية',
        examPearl: 'علامة روفسينغ (Rovsing sign): الضغط على الربع السفلي الأيسر يسبب ألماً في الربع السفلي الأيمن بسبب انتقال الغازات نحو الأعور الملتهب.'
      },
      {
        id: 'q_ex_8',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 68, y: 38 },
        markerLabel: 'H',
        questionType: 'multiple_choice',
        questionEn: 'Where does normal fertilization of the human ovum by a spermatozoon occur?',
        questionAr: 'أين يحدث الإخصاب الطبيعي للبويضة بواسطة الحيوان المنوي تشريحياً؟',
        promptAr: 'اختر موقع الإخصاب الصحيح:',
        promptEn: 'Select the fertilization site:',
        options: [
          'Ampulla of the Uterine (Fallopian) Tube',
          'Uterine Cavity (تجويف الرحم)',
          'Cervix of Uterus (عنق الرحم)',
          'Ovary surface (سطح المبيض)'
        ],
        correctAnswer: 'Ampulla of the Uterine (Fallopian) Tube',
        acceptableAnswers: ['ampulla', 'ampulla of fallopian tube', 'مجورة قناة فالوب', 'قناة فالوب'],
        explanationAr: 'الإخصاب الطبيعي يحدث دائماً في مجورة قناة فالوب (Ampulla of Fallopian tube) قبل أن تنتقل البويضة المخصبة للرحم.',
        explanationEn: 'Fertilization classically takes place in the ampulla of the fallopian tube.',
        topicId: 'anat_reproductive',
        structureNameEn: 'Ampulla of Fallopian Tube',
        structureNameAr: 'مجورة قناة فالوب',
        examPearl: 'الحمل خارج الرحم (Ectopic pregnancy) يحدث في 95% من الحالات داخل قناة فالوب وقد يؤدي للتمزق والنزف.'
      },
      {
        id: 'q_ex_9',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 50, y: 50 },
        markerLabel: 'I',
        questionType: 'multiple_choice',
        questionEn: 'From anterior to posterior, what is the arrangement of structures at the renal hilum?',
        questionAr: 'من الأمام إلى الخلف، ما هو الترتيب الصحيح للتراكيب في سُرّة الكلية (Renal Hilum)؟',
        promptAr: 'اختر ترتيب سُرّة الكلية:',
        promptEn: 'Select the renal hilum order (Front to Back):',
        options: [
          'Renal Vein → Renal Artery → Renal Pelvis (V-A-U)',
          'Renal Artery → Renal Vein → Renal Pelvis',
          'Renal Pelvis → Renal Artery → Renal Vein',
          'Ureter → Renal Vein → Renal Artery'
        ],
        correctAnswer: 'Renal Vein → Renal Artery → Renal Pelvis (V-A-U)',
        acceptableAnswers: ['v-a-u', 'vein artery ureter', 'vau'],
        explanationAr: 'ترتيب التراكيب في سُرّة الكلية من الأمام للخلف: وريد كلوي (Vein) ← شريان كلوي (Artery) ← حويضة الكلية والحالب (Ureter) = V-A-U.',
        explanationEn: 'The anterior-to-posterior order at the renal hilum is Vein, Artery, Ureter (V-A-U).',
        topicId: 'anat_urinary',
        structureNameEn: 'Renal Hilum (V-A-U Arrangement)',
        structureNameAr: 'سُرّة الكلية (ترتيب V-A-U)',
        examPearl: 'الشريان الكلوي الأيمن أطول من الأيسر ويمر خلف الوريد الأجوف السفلي (IVC).'
      },
      {
        id: 'q_ex_10',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 30, y: 30 },
        markerLabel: 'J',
        questionType: 'multiple_choice',
        questionEn: 'Which type of joint classification permits the greatest range of multiaxial motion (e.g. Shoulder & Hip)?',
        questionAr: 'أي نوع من المفاصل يمنح أكبر مدى حركة متعددة المحاور (مثل مفصلي الكتف والورك)؟',
        promptAr: 'اختر نوع المفصل الزلالي:',
        promptEn: 'Select the synovial joint subtype:',
        options: [
          'Ball and Socket Synovial Joint (كروي حقي)',
          'Hinge Joint (رزي)',
          'Pivot Joint (مداري)',
          'Suture Joint (درزي ليفي)'
        ],
        correctAnswer: 'Ball and Socket Synovial Joint (كروي حقي)',
        acceptableAnswers: ['ball and socket', 'كروي حقي', 'ball and socket joint'],
        explanationAr: 'المفصل الكروي الحقي (Ball and Socket) كالكتف والورك هو المفصل الوحيد متعدد المحاور الذي يسمح بالحركة في كافة المستويات بما فيها الدوران الشامل (Circumduction).',
        explanationEn: 'Ball-and-socket joints permit movements in all planes including circumduction and rotation.',
        topicId: 'anat_joints',
        structureNameEn: 'Ball and Socket Joint (Shoulder / Hip)',
        structureNameAr: 'المفصل الكروي الحقي',
        examPearl: 'مفصل الكتف يضحي بالثبات العظمي في سبيل سعة الحركة مما يجعله أكثر مفاصل الجسم عرضة للخلع.'
      }
    ]
  },

  {
    id: 'exam_bones',
    titleAr: 'اختبار العظام والهيكل العظمي (Osteology Practical Exam)',
    titleEn: 'Osteology & Skeletal System Practical Exam',
    descriptionAr: 'اختبار مخصص لتحديد عظام الهيكل المحوري والطرفي، المعالم البارزة، والكسور السريرية لطلاب السنة الأولى.',
    descriptionEn: 'Focused osteology OSPE exam identifying cranial, axial, appendicular bones and key clinical landmarks.',
    category: 'bones',
    questionCount: 10,
    timePerQuestionSec: 30,
    iconName: 'Bone',
    questions: [
      {
        id: 'q_bon_1',
        image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 50, y: 20 },
        markerLabel: 'A',
        questionType: 'type_in',
        questionEn: 'Identify the longest bone in the human body shown in the specimen.',
        questionAr: 'اكتب اسم أطول عظمة في جسم الإنسان الموضحة في الصورة.',
        promptAr: 'اكتب اسم العظمة:',
        promptEn: 'Type bone name:',
        correctAnswer: 'Femur',
        acceptableAnswers: ['femur', 'عظم الفخذ', 'الفخذ'],
        explanationAr: 'عظم الفخذ (Femur) هو أطول وأقوى عظم في الهيكل البشري.',
        explanationEn: 'The Femur is the thigh bone and longest bone in the body.',
        topicId: 'anat_skeletal',
        structureNameEn: 'Femur',
        structureNameAr: 'عظم الفخذ',
        examPearl: 'كسور عنق الفخذ شائعة عند كبار السن المصابين بهشاشة العظام.'
      },
      {
        id: 'q_bon_2',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 45, y: 50 },
        markerLabel: 'B',
        questionType: 'multiple_choice',
        questionEn: 'Identify the medial weight-bearing bone of the leg.',
        questionAr: 'تعرّف على العظمة الأنسية الحاملة لثقل الجسم في الساق.',
        promptAr: 'اختر العظمة:',
        promptEn: 'Select bone:',
        options: ['Tibia', 'Fibula', 'Femur', 'Humerus'],
        correctAnswer: 'Tibia',
        acceptableAnswers: ['tibia', 'قصبة الساق'],
        explanationAr: 'عظم القصبة (Tibia) هو العظم الأنسي الحامل للوزن في الساق.',
        explanationEn: 'Tibia is the medial weight-bearing shin bone.',
        topicId: 'anat_skeletal',
        structureNameEn: 'Tibia',
        structureNameAr: 'عظم القصبة',
        examPearl: 'الكعب الإنسي (Medial malleolus) هو البروز السفلي للقصبة عند الكاحل.'
      },
      {
        id: 'q_bon_3',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 50, y: 40 },
        markerLabel: 'C',
        questionType: 'type_in',
        questionEn: 'Identify the single long bone of the arm (Brachium).',
        questionAr: 'اكتب اسم العظمة الطويلة الوحيدة المكونة لمنطقة العضد (الذراع).',
        promptAr: 'اكتب اسم العظمة بالإنجليزية أو العربية:',
        promptEn: 'Type the arm bone name:',
        correctAnswer: 'Humerus',
        acceptableAnswers: ['humerus', 'عظم العضد', 'العضد'],
        explanationAr: 'عظم العضد (Humerus) هو عظم الذراع الذي يتمفصل مع لوح الكتف بالأعلى والزند والكعبرة بالأسفل.',
        explanationEn: 'The Humerus is the single bone of the arm articulating at shoulder and elbow.',
        topicId: 'anat_skeletal',
        structureNameEn: 'Humerus',
        structureNameAr: 'عظم العضد',
        examPearl: 'كسور العنق الجراحي للعضد قد تؤذي العصب الإبطي، وكسور منتصف الجسم قد تؤذي العصب الكعبري.'
      },
      {
        id: 'q_bon_4',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 45, y: 35 },
        markerLabel: 'D',
        questionType: 'multiple_choice',
        questionEn: 'Identify the triangular flat bone on the posterolateral thorax.',
        questionAr: 'تعرّف على العظمة المسطحة المثلثة في الجزء الخلفي للقفص الصدري.',
        promptAr: 'اختر العظمة:',
        promptEn: 'Select bone:',
        options: ['Scapula (لوح الكتف)', 'Clavicle (الترقوة)', 'Sternum (القص)', 'Rib (الضلع)'],
        correctAnswer: 'Scapula (لوح الكتف)',
        acceptableAnswers: ['scapula', 'لوح الكتف'],
        explanationAr: 'لوح الكتف (Scapula) عظمة مثلثة مسطحة تحتوي على الشوكة والأخرم والتجويف الحقاني.',
        explanationEn: 'The Scapula (shoulder blade) is a triangular flat bone of the pectoral girdle.',
        topicId: 'anat_skeletal',
        structureNameEn: 'Scapula',
        structureNameAr: 'لوح الكتف',
        examPearl: 'التجويف الحقاني (Glenoid cavity) للوح الكتف ضحل ويتمفصل مع رأس العضد.'
      }
    ]
  },

  {
    id: 'exam_muscles',
    titleAr: 'اختبار العضلات والأعصاب (Myology Practical Exam)',
    titleEn: 'Myology & Muscle Actions Practical Exam',
    descriptionAr: 'اختبار عملي تفاعلي لتحديد العضلات الرئيسية في الأطراف والجذع، وظائفها الحركية، والأعصاب المغذية لها.',
    descriptionEn: 'Practical OSPE exam assessing major skeletal muscles, actions, origins, insertions, and motor innervation.',
    category: 'muscles',
    questionCount: 10,
    timePerQuestionSec: 30,
    iconName: 'Activity',
    questions: [
      {
        id: 'q_mus_e1',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 30, y: 25 },
        markerLabel: 'A',
        questionType: 'multiple_choice',
        questionEn: 'Which nerve innervates the Deltoid muscle of the shoulder?',
        questionAr: 'أي عصب يغذي العضلة الدالية (Deltoid) في مفصل الكتف؟',
        promptAr: 'اختر العصب المغذي:',
        promptEn: 'Select motor nerve:',
        options: ['Axillary nerve (العصب الإبطي)', 'Radial nerve (العصب الكعبري)', 'Median nerve', 'Ulnar nerve'],
        correctAnswer: 'Axillary nerve (العصب الإبطي)',
        acceptableAnswers: ['axillary', 'axillary nerve', 'العصب الإبطي'],
        explanationAr: 'العصب الإبطي (Axillary nerve) يلتف حول العنق الجراحي للعضد ويغذي العضلة الدالية.',
        explanationEn: 'The Axillary nerve (C5, C6) supplies the deltoid muscle.',
        topicId: 'anat_muscles',
        structureNameEn: 'Axillary Nerve / Deltoid',
        structureNameAr: 'العصب الإبطي / العضلة الدالية',
        examPearl: 'فحص الإحساس على قمة العضلة الدالية يؤكد سلامة العصب الإبطي (Regimental badge area).'
      },
      {
        id: 'q_mus_e2',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 35, y: 40 },
        markerLabel: 'B',
        questionType: 'type_in',
        questionEn: 'Name the anterior arm muscle that acts as a powerful flexor of the elbow and supinator of the forearm.',
        questionAr: 'اكتب اسم عضلة مقدمة الذراع التي تقوم بثني المرفق واستلقاء الساعد (Supination).',
        promptAr: 'اكتب اسم العضلة (مثال: Biceps):',
        promptEn: 'Type muscle name:',
        correctAnswer: 'Biceps brachii',
        acceptableAnswers: ['biceps', 'biceps brachii', 'ذات الرأسين', 'البايسبس'],
        explanationAr: 'العضلة ذات الرأسين العضدية (Biceps brachii) هي أقوى عضلة لاستلقاء الساعد وثني المرفق ويغذيها العصب العضلي الجلدي.',
        explanationEn: 'Biceps brachii flexes the elbow and supinates the forearm (Musculocutaneous nerve).',
        topicId: 'anat_muscles',
        structureNameEn: 'Biceps Brachii',
        structureNameAr: 'العضلة ذات الرأسين العضدية',
        examPearl: 'منعكس وتر البايسبس يختبر سلامة الجذور العصبية C5 و C6.'
      },
      {
        id: 'q_mus_e3',
        image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 50, y: 55 },
        markerLabel: 'C',
        questionType: 'multiple_choice',
        questionEn: 'Which powerful muscle group in the anterior compartment of the thigh extends the knee joint?',
        questionAr: 'أي مجموعة عضلية قوية في المسكن الأمامي للفخذ تبسط مفصل الركبة؟',
        promptAr: 'اختر العضلة:',
        promptEn: 'Select muscle group:',
        options: [
          'Quadriceps femoris (العضلة رباعية الرؤوس)',
          'Hamstrings (عضلات الفخذ الخلفية)',
          'Gluteus maximus (العضلة الإلية الكبرى)',
          'Gastrocnemius (عضلة الساق التوأمية)'
        ],
        correctAnswer: 'Quadriceps femoris (العضلة رباعية الرؤوس)',
        acceptableAnswers: ['quadriceps', 'quadriceps femoris', 'رباعية الرؤوس'],
        explanationAr: 'العضلة رباعية الرؤوس الفخذية (Quadriceps femoris) هي الباسطة الرئيسية لمفصل الركبة ويغذيها العصب الفخذي (Femoral nerve).',
        explanationEn: 'The Quadriceps femoris extends the leg at the knee joint (Femoral nerve).',
        topicId: 'anat_muscles',
        structureNameEn: 'Quadriceps Femoris',
        structureNameAr: 'العضلة رباعية الرؤوس الفخذية',
        examPearl: 'منعكس نفضة الركبة (Patellar tendon reflex) يختبر الجذور L3 و L4.'
      }
    ]
  },

  {
    id: 'exam_organ_systems',
    titleAr: 'اختبار الأجهزة الحيوية (Organ Systems Practical Exam)',
    titleEn: 'Visceral & Organ Systems Practical Exam',
    descriptionAr: 'اختبار عملي مخصص لأجهزة الجسم: القلب، الدماغ، الرئتان، الجهاز الهضمي، الكلى، والأجهزة التناسلية.',
    descriptionEn: 'Practical OSPE exam assessing visceral organs (heart, brain, lungs, stomach, liver, kidneys, reproductive tract).',
    category: 'organ_systems',
    questionCount: 10,
    timePerQuestionSec: 30,
    iconName: 'Heart',
    questions: [
      {
        id: 'q_org_1',
        image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 55, y: 60 },
        markerLabel: 'A',
        questionType: 'multiple_choice',
        questionEn: 'Which heart valve is situated between the Left Atrium and the Left Ventricle?',
        questionAr: 'أي صمام قلبي يقع بين الأذين الأيسر والبطين الأيسر؟',
        promptAr: 'اختر الصمام القلبي:',
        promptEn: 'Select valve:',
        options: [
          'Mitral / Bicuspid Valve (الصمام الميترالي ثنائي الشرف)',
          'Tricuspid Valve (الصمام ثلاثي الشرف)',
          'Aortic Valve (الصمام الأورطي)',
          'Pulmonary Valve (الصمام الرئوي)'
        ],
        correctAnswer: 'Mitral / Bicuspid Valve (الصمام الميترالي ثنائي الشرف)',
        acceptableAnswers: ['mitral', 'bicuspid', 'الصمام الميترالي', 'الميترالي'],
        explanationAr: 'الصمام الميترالي (Mitral / Bicuspid) ثنائي الشرف يقع في الجانب الأيسر بين الأذين الأيسر والبطين الأيسر.',
        explanationEn: 'The Mitral (bicuspid) valve separates left atrium and left ventricle.',
        topicId: 'anat_cardio',
        structureNameEn: 'Mitral (Bicuspid) Valve',
        structureNameAr: 'الصمام الميترالي ثنائي الشرف',
        examPearl: 'تضيق الصمام الميترالي (Mitral stenosis) ناتج غالباً عن الحمى الروماتيزمية في الطفولة.'
      },
      {
        id: 'q_org_2',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 75, y: 40 },
        markerLabel: 'B',
        questionType: 'multiple_choice',
        questionEn: 'Which cerebral lobe contains the primary visual cortex responsible for sight?',
        questionAr: 'أي فص من فصوص قشرة المخ يحتوي على القشرة البصرية الأولية المسؤولة عن الرؤية؟',
        promptAr: 'اختر فص الدماغ:',
        promptEn: 'Select cerebral lobe:',
        options: [
          'Occipital Lobe (الفص القذالي)',
          'Frontal Lobe (الفص الجبهي)',
          'Parietal Lobe (الفص الجداري)',
          'Temporal Lobe (الفص الصدغي)'
        ],
        correctAnswer: 'Occipital Lobe (الفص القذالي)',
        acceptableAnswers: ['occipital', 'occipital lobe', 'الفص القذالي'],
        explanationAr: 'الفص القذالي (Occipital Lobe) في مؤخرة الرأس هو المسؤول عن معالجة حاسة الإبصار.',
        explanationEn: 'The primary visual cortex is located in the occipital lobe at the posterior pole of the cerebrum.',
        topicId: 'anat_nervous',
        structureNameEn: 'Occipital Lobe (Visual Cortex)',
        structureNameAr: 'الفص القذالي (مركز الرؤية)',
        examPearl: 'النزف في الشريان المخي الخلفي (PCA) يسبب فقدان نصف المجال البصري المتماثل (Homonymous hemianopia).'
      }
    ]
  },

  {
    id: 'exam_planes_terms',
    titleAr: 'اختبار المستويات والاتجاهات والحركات (Planes & Directions Exam)',
    titleEn: 'Anatomical Planes, Directions & Movements Exam',
    descriptionAr: 'اختبار تأسيسي في لغة التشريح: المستويات الثلاثة، المصطلحات الاتجاهية (Proximal, Distal, Medial, Lateral)، وحركات المفاصل.',
    descriptionEn: 'Foundational OSPE assessing anatomical planes, directional axes, and joint motion terminology.',
    category: 'planes_terms',
    questionCount: 10,
    timePerQuestionSec: 30,
    iconName: 'Compass',
    questions: [
      {
        id: 'q_pln_1',
        image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 50, y: 30 },
        markerLabel: 'A',
        questionType: 'multiple_choice',
        questionEn: 'Which anatomical plane divides the human body into Anterior (front) and Posterior (back) halves?',
        questionAr: 'أي مستوى تشريحي يقسم جسم الإنسان إلى نصفين: أمامي (Anterior) وخلفي (Posterior)؟',
        promptAr: 'اختر المستوى التشريحي:',
        promptEn: 'Select plane:',
        options: [
          'Coronal (Frontal) Plane (المستوى الإكليلي / الجبهي)',
          'Sagittal Plane (المستوى السهمي)',
          'Transverse (Axial) Plane (المستوى المستعرض)',
          'Midsagittal Plane'
        ],
        correctAnswer: 'Coronal (Frontal) Plane (المستوى الإكليلي / الجبهي)',
        acceptableAnswers: ['coronal', 'coronal plane', 'المستوى الإكليلي', 'frontal plane'],
        explanationAr: 'المستوى الإكليلي أو الجبهي (Coronal plane) يمر عمودياً من جانب إلى آخر ويقسم الجسم إلى جزء أمامي وجزء خلفي.',
        explanationEn: 'The Coronal (frontal) plane divides the body into anterior and posterior sections.',
        topicId: 'anat_planes',
        structureNameEn: 'Coronal (Frontal) Plane',
        structureNameAr: 'المستوى الإكليلي (الجبهي)',
        examPearl: 'صور الأشعة السينية للصدر (CXR) تُقرأ في المستوى الإكليلي (Coronal view).'
      },
      {
        id: 'q_pln_2',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
        markerPosition: { x: 30, y: 50 },
        markerLabel: 'B',
        questionType: 'multiple_choice',
        questionEn: 'In anatomical position with palms forward, the THUMB is __________ to the little finger.',
        questionAr: 'في الوضعية التشريحية مع راحة اليد للأمام، يعتبر الإبهام __________ بالنسبة للخنصر.',
        promptAr: 'اختر المصطلح الاتجاهي الصحيح:',
        promptEn: 'Select directional term:',
        options: ['Lateral (وحشي / للخارج)', 'Medial (إنسي / للداخل)', 'Proximal (داني)', 'Posterior (خلفي)'],
        correctAnswer: 'Lateral (وحشي / للخارج)',
        acceptableAnswers: ['lateral', 'وحشي', 'lateral (وحشي / للخارج)'],
        explanationAr: 'في الوضعية التشريحية تكون راحتا اليدين للأمام، لذا فالإبهام يقع بعيداً عن خط المنتصف أي في الجهة الوحشية (Lateral).',
        explanationEn: 'In the anatomical position, the thumb is lateral (further from midline) to the little finger.',
        topicId: 'anat_directional_terms',
        structureNameEn: 'Lateral (Directional Term)',
        structureNameAr: 'وحشي (Lateral)',
        examPearl: 'الكعبرة (Radius) عظمة وحشية (Lateral) في الساعد بينما الزند (Ulna) إنسية (Medial).'
      }
    ]
  }
];

export interface AnatomyQuizQuestion {
  id: string;
  topicId: string;
  topicTitleEn: string;
  questionTextEn: string;
  questionTextAr: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  clinicalSignificance: string;
  level: 'CORE' | 'HIGH_YIELD';
}

export const ANATOMY_SELF_ASSESSMENT_QUIZ: AnatomyQuizQuestion[] = [
  {
    id: 'quiz_1',
    topicId: 'anat_planes',
    topicTitleEn: 'Anatomical Planes',
    questionTextEn: 'Which plane divides the body into anterior (front) and posterior (back) portions?',
    questionTextAr: 'أي مستوى تشريحي يقسم الجسم إلى جزء أمامي (Front) وجزء خلفي (Back)؟',
    options: ['Coronal (Frontal) plane', 'Sagittal plane', 'Transverse (Axial) plane', 'Midsagittal plane'],
    correctAnswer: 'Coronal (Frontal) plane',
    explanation: 'المستوى الإكليلي / الجبهي (Coronal plane) يمر عمودياً ويقسم الجسم إلى جزء أمامي وجزء خلفي، مثل تاج الرأس.',
    clinicalSignificance: 'مهم جداً لقراءة الأشعة السينية والتصوير المقطعي للجيوب الأنفية والقفص الصدري.',
    level: 'CORE'
  },
  {
    id: 'quiz_2',
    topicId: 'anat_directional_terms',
    topicTitleEn: 'Directional Terms',
    questionTextEn: 'In standard anatomical position, the thumb is __________ to the little finger.',
    questionTextAr: 'في الوضعية التشريحية القياسية، يعتبر الإبهام __________ بالنسبة للخنصر.',
    options: ['Medial', 'Lateral', 'Proximal', 'Posterior'],
    correctAnswer: 'Lateral',
    explanation: 'لأن راحة اليد تكون متجهة للأمام في الوضعية التشريحية، فإن الإبهام يتجه للخارج بعيداً عن منتصف الجسم (Lateral).',
    clinicalSignificance: 'أساس وصف جميع كسور وإصابات اليد والأعصاب بالطرف العلوي.',
    level: 'CORE'
  },
  {
    id: 'quiz_3',
    topicId: 'anat_directional_terms',
    topicTitleEn: 'Directional Terms',
    questionTextEn: 'The knee joint is __________ to the ankle joint along the lower limb.',
    questionTextAr: 'مفصل الركبة يعتبر __________ بالنسبة لمفصل الكاحل على طول الطرف السفلي.',
    options: ['Distal', 'Proximal', 'Lateral', 'Inferior'],
    correctAnswer: 'Proximal',
    explanation: 'في الأطراف نستخدم مصطلح Proximal للتركيب الأقرب إلى منشأ الطرف وجذع الجسم.',
    clinicalSignificance: 'تحديد مستويات الكسور والجبائر في العظام.',
    level: 'CORE'
  },
  {
    id: 'quiz_4',
    topicId: 'anat_movements',
    topicTitleEn: 'Body Movements',
    questionTextEn: 'Turning the forearm so that the palm of the hand faces upward (anteriorly) is known as:',
    questionTextAr: 'تدوير الساعد بحيث تصبح راحة اليد متجهة للأعلى (للأمام) يسمى:',
    options: ['Pronation', 'Supination', 'Eversion', 'Inversion'],
    correctAnswer: 'Supination',
    explanation: 'الاستلقاء (Supination) يجعل راحة اليد للأمام أو الأعلى، وتذكر تشبيه حمل وعاء الحساء (Hold Soup).',
    clinicalSignificance: 'حركة أساسية يتم فحصها عند إصابة العصب الكعبري أو العضلي الجلدي.',
    level: 'CORE'
  },
  {
    id: 'quiz_5',
    topicId: 'anat_skeletal',
    topicTitleEn: 'Skeletal System',
    questionTextEn: 'What is the longest, heaviest, and strongest bone in the human body?',
    questionTextAr: 'ما هي أطول وأثقل وأقوى عظمة في جسم الإنسان؟',
    options: ['Tibia', 'Humerus', 'Femur', 'Fibula'],
    correctAnswer: 'Femur',
    explanation: 'عظم الفخذ (Femur) في الفخذ هو أطول وأقوى عظم في الهيكل العظمي البشري.',
    clinicalSignificance: 'كسوره تتطلب طاقة عالية وتسبب فقداناً كبيراً في الدم.',
    level: 'CORE'
  },
  {
    id: 'quiz_6',
    topicId: 'anat_skeletal',
    topicTitleEn: 'Skeletal System',
    questionTextEn: 'How many total bones make up the adult human skeleton?',
    questionTextAr: 'كم هو العدد الإجمالي لعظام الهيكل العظمي في الإنسان البالغ؟',
    options: ['180 bones', '206 bones', '250 bones', '300 bones'],
    correctAnswer: '206 bones',
    explanation: 'يتكون الهيكل البشري البالغ من 206 عظمة مقسمة إلى 80 عظمة محورية و 126 عظمة طرفية.',
    clinicalSignificance: 'معلومة أساسية لكل طالب طب في قسم التشريح.',
    level: 'CORE'
  },
  {
    id: 'quiz_7',
    topicId: 'anat_joints',
    topicTitleEn: 'Joints & Articulations',
    questionTextEn: 'What anatomical structure directly connects a BONE to another BONE?',
    questionTextAr: 'ما هو التركيب التشريحي الذي يربط عظمة بعظمة أخرى مباشرة؟',
    options: ['Tendon', 'Ligament', 'Aponeurosis', 'Fascia'],
    correctAnswer: 'Ligament',
    explanation: 'الرباط (Ligament) يربط عظم بعظم، بينما الوتر (Tendon) يربط العضلة بالعظم.',
    clinicalSignificance: 'إصابات الأربطة تسمى التواء (Sprain)، بينما إصابات العضلات والأوتار تسمى تمزق عضلي (Strain).',
    level: 'CORE'
  },
  {
    id: 'quiz_8',
    topicId: 'anat_muscles',
    topicTitleEn: 'Muscular System',
    questionTextEn: 'Which muscle is primarily responsible for abducting the arm at the shoulder joint from 15° to 90°?',
    questionTextAr: 'أي عضلة مسؤولة بشكل أساسي عن تبعيد الذراع عند مفصل الكتف من 15° إلى 90°؟',
    options: ['Biceps brachii', 'Deltoid', 'Pectoralis major', 'Latissimus dorsi'],
    correctAnswer: 'Deltoid',
    explanation: 'العضلة الدالية (Deltoid) هي المحرك الأساسي لتبعيد الذراع من 15 إلى 90 درجة ويغذيها العصب الإبطي.',
    clinicalSignificance: 'فحص قوة العضلة الدالية يختبر سلامة العصب الإبطي بعد خلع الكتف.',
    level: 'HIGH_YIELD'
  },
  {
    id: 'quiz_9',
    topicId: 'anat_nervous',
    topicTitleEn: 'Nervous System',
    questionTextEn: 'Which region of the brain is primarily responsible for motor coordination and balance?',
    questionTextAr: 'أي منطقة في الدماغ مسؤولة بشكل رئيسي عن تنسيق الحركات والاتزان؟',
    options: ['Cerebrum (Frontal Lobe)', 'Cerebellum', 'Thalamus', 'Hypothalamus'],
    correctAnswer: 'Cerebellum',
    explanation: 'المخيخ (Cerebellum) يقع خلف جذع الدماغ وينسق الحركات الإرادية ويضبط توازن الجسم.',
    clinicalSignificance: 'إصابات المخيخ تسبب ترنحاً في المشي وعدم اتزان (Ataxia).',
    level: 'CORE'
  },
  {
    id: 'quiz_10',
    topicId: 'anat_cardio',
    topicTitleEn: 'Cardiovascular System',
    questionTextEn: 'Which chamber of the heart has the thickest muscular wall because it pumps blood to the entire body?',
    questionTextAr: 'أي حجرة في القلب تمتلك أسمك جدار عضلي لأنها تضخ الدم لكامل أنحاء الجسم؟',
    options: ['Right Atrium', 'Right Ventricle', 'Left Atrium', 'Left Ventricle'],
    correctAnswer: 'Left Ventricle',
    explanation: 'البطين الأيسر (Left Ventricle) يمتلك أسمك جدار (أسمك بـ 3 أضعاف من الأيمن) ليضخ الدم عبر الشريان الأورطي لكامل الجسم.',
    clinicalSignificance: 'ارتفاع ضغط الدم المزمن يسبب تضخم جدار البطين الأيسر (LVH).',
    level: 'CORE'
  },
  {
    id: 'quiz_11',
    topicId: 'anat_cardio',
    topicTitleEn: 'Cardiovascular System',
    questionTextEn: 'The valve located between the Left Atrium and Left Ventricle is the:',
    questionTextAr: 'الصمام الواقع بين الأذين الأيسر والبطين الأيسر هو:',
    options: ['Tricuspid valve', 'Mitral (Bicuspid) valve', 'Aortic valve', 'Pulmonary valve'],
    correctAnswer: 'Mitral (Bicuspid) valve',
    explanation: 'الصمام التاجي الميترالي (Mitral / Bicuspid) ثنائي الشرف يقع في الجانب الأيسر بين الأذين والبطين الأيسر.',
    clinicalSignificance: 'أمراض الصمام التاجي من أكثر أمراض صمامات القلب شيوعاً.',
    level: 'CORE'
  },
  {
    id: 'quiz_12',
    topicId: 'anat_nervous',
    topicTitleEn: 'Nervous System',
    questionTextEn: 'Which lobe of the brain contains the primary visual cortex responsible for sight?',
    questionTextAr: 'أي فص من فصوص الدماغ يحتوي على القشرة البصرية الأولية المسؤولة عن الرؤية؟',
    options: ['Frontal lobe', 'Parietal lobe', 'Temporal lobe', 'Occipital lobe'],
    correctAnswer: 'Occipital lobe',
    explanation: 'الفص القذالي (Occipital lobe) في مؤخرة الرأس هو المسؤول عن استقبال ومعالجة الإشارات البصرية.',
    clinicalSignificance: 'إصابات مؤخرة الرأس يمكن أن تسبب عمى قشرياً أو اضطرابات في الرؤية.',
    level: 'CORE'
  }
];
