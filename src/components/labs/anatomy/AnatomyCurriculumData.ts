/*
 * © LAB HUB · Developed by Sakina Asaad
 * Rebuilt Anatomy Lab Curriculum Data
 * Designed specifically for first-year medical students.
 * Simple, clear, real, medical, practical, and first-year friendly.
 */

export interface MuscleLearningUnit {
  id: string;
  nameEn: string;
  nameAr: string;
  region: 'face_neck' | 'chest' | 'back' | 'abdomen' | 'upper_limb' | 'lower_limb' | 'eye';
  regionLabelEn: string;
  regionLabelAr: string;
  
  // Real authentic scientific image
  imageUrl: string;
  imageSource: string;
  imageLicense: string;
  imageCredit: string;
  
  // Core Anatomical Information Chain
  location: string;
  locationAr: string;
  origin: string;
  originAr: string;
  insertion: string;
  insertionAr: string;
  innervation: string;
  innervationAr: string;
  action: string;
  actionAr: string;
  clinicalNote?: string;
  clinicalNoteAr?: string;

  // 🎥 Watch explanation
  video: {
    id: string;
    titleEn: string;
    titleAr: string;
    youtubeId: string;
    duration: string;
    language: 'Arabic' | 'English';
  };

  // 📝 Test yourself (OSPE Spotter Station - Written Answer)
  questions: {
    id: string;
    question: string;
    questionAr?: string;
    pointerLabel: string;
    pointerTarget: string;
    correctAnswer: string;
    acceptableAnswers: string[];
    explanation: string;
    explanationAr?: string;
    options?: string[];
    correctIndex?: number;
  }[];
}

export interface MuscleSpotterQuestion {
  id: string;
  question: string;
  questionAr?: string;
  pointerLabel: string;
  pointerTarget: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  explanation: string;
  explanationAr?: string;
  options?: string[];
  correctIndex?: number;
}

export interface LessonStructureLabel {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  xPercent?: number; // 0-100 for interactive pin placement on image
  yPercent?: number; // 0-100
}

export interface LessonTopicItem {
  id: string;
  titleEn: string;
  titleAr: string;
  shortExplanationEn: string;
  shortExplanationAr: string;
  imageUrl: string;
  imageSource: string;
  imageCredit?: string;
  labels: LessonStructureLabel[];
  keyPoints: string[];
  keyPointsAr?: string[];
}

export interface AnatomyLesson {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'basics' | 'skeletal' | 'joints' | 'muscles' | 'organ_systems';
  categoryLabelEn: string;
  categoryLabelAr: string;
  descriptionEn: string;
  descriptionAr: string;
  keyPoints: string[];
  keyPointsAr: string[];

  // 1. MAIN COMPREHENSIVE IMAGE (covers overall lesson scope)
  mainImageUrl: string;
  mainImageSource: string;
  mainImageCredit: string;
  mainImageCaptionEn?: string;
  mainImageCaptionAr?: string;
  mainImageLabels?: LessonStructureLabel[];

  // Backward compatibility alias for existing consumers
  imageUrl: string;
  imageSource: string;
  imageCredit: string;

  // 2. TOPICS BREAKDOWN (ONE TOPIC -> ONE EXPLANATORY IMAGE)
  topics: LessonTopicItem[];

  // 3. DETAILED LABELED IMPORTANT STRUCTURES
  importantStructuresImage?: {
    titleEn: string;
    titleAr: string;
    imageUrl: string;
    imageSource: string;
    imageCredit: string;
    labels: LessonStructureLabel[];
  };

  video: {
    titleEn: string;
    titleAr: string;
    youtubeId: string;
    duration: string;
  };
  practiceQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface AnatomyImageAtlasItem {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 
    | 'Bones'
    | 'Joints'
    | 'Muscles'
    | 'Organs'
    | 'Nervous System'
    | 'Cardiovascular'
    | 'Respiratory'
    | 'Digestive'
    | 'Urinary'
    | 'Reproductive';
  imageUrl: string;
  source: string;
  license: string;
  credit: string;
  description: string;
  keyStructures: string[];
}

export interface AnatomyPracticalTestQuestion {
  id: string;
  question: string;
  questionAr?: string;
  structureTarget: string;
  structureTargetAr?: string;
  imageUrl: string;
  imageSource: string;
  pointerX?: number; // 0-100%
  pointerY?: number; // 0-100%
  pointerLabel?: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation: string;
  explanationAr?: string;
  clinicalPearl?: string;
  topic: string;
  category?: 'all' | 'bones' | 'muscles' | 'organs' | 'planes_joints';
}

// =========================================================================
// 1. INDEPENDENT MUSCLE LEARNING UNITS (MUSCLE -> IMAGE -> ANATOMY -> VIDEO -> TEST)
// =========================================================================
export const ANATOMY_MUSCLES_SUITE: MuscleLearningUnit[] = [
  // 1. Deltoid (Upper Limb / Shoulder)
  {
    id: 'deltoid',
    nameEn: 'Deltoid',
    nameAr: 'العضلة الدالية',
    region: 'upper_limb',
    regionLabelEn: 'Upper Limb (Shoulder)',
    regionLabelAr: 'الطرف العلوي (مفصل الكتف)',
    imageUrl: '/images/anatomy/muscles/deltoid_muscle_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Gross Anatomy Shoulder Dissection & Anatomical Model Specimen',
    location: 'Forms the rounded muscular contour of the shoulder.',
    locationAr: 'تشكل التحدب العضلي الدائري الخارجي لمفصل الكتف.',
    origin: 'Lateral third of clavicle, acromion, and spine of scapula.',
    originAr: 'الثلث الوحشي للترقوة، الأخرم، وشوكة لوح الكتف.',
    insertion: 'Deltoid tuberosity of the humerus.',
    insertionAr: 'الأحدوبة الدالية على عظم العضد.',
    innervation: 'Axillary nerve (C5, C6).',
    innervationAr: 'العصب الإبطي (الجذور C5, C6).',
    action: 'Multipennate middle fibers: Prime abductor of arm from 15° to 90°; Anterior fibers: Flexion and medial rotation; Posterior fibers: Extension and lateral rotation.',
    actionAr: 'الألياف الوسطى: المبعد الرئيسي للذراع من 15° حتى 90°؛ الأمامية: العطف والتدوير الإنسي؛ الخلفية: البسط والتدوير الوحشي.',
    clinicalNote: 'Axillary nerve injury (from anterior shoulder dislocation or surgical neck fracture of humerus) causes deltoid paralysis, loss of shoulder abduction (15°-90°), and flat shoulder deformity.',
    clinicalNoteAr: 'أذية العصب الإبطي (بخلع الكتف الأمامي أو كسر عنق العضد الجراحي) تسبب شلل الدالية وفقدان تبعيد الذراع وتسطح مظهر الكتف.',
    video: {
      id: 'vid_deltoid',
      titleEn: 'Deltoid Muscle: Structure, Abduction Arc & Axillary Nerve',
      titleAr: 'تشريح العضلة الدالية: المنشأ والارتكاز وقوس التبعيد والعصب الإبطي',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_deltoid_1',
        question: 'Identify the muscle indicated by the pointer / arrow on this shoulder specimen (Spotter Station).',
        questionAr: 'تعرّف على العضلة المحددة بالسهم في عينة الكتف التشريحية (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Rounded shoulder cap muscle',
        pointerTarget: 'Deltoid Muscle (Multipennate acromial fibers)',
        correctAnswer: 'Deltoid',
        acceptableAnswers: [
          'Deltoid',
          'Deltoid muscle',
          'Deltoideus',
          'Musculus deltoideus',
          'Left deltoid',
          'Right deltoid',
          'العضلة الدالية',
          'الدالية'
        ],
        explanation: 'The arrow points to the Deltoid muscle. Arises from the lateral clavicle, acromion, and scapular spine, inserting into the deltoid tuberosity of the humerus. Innervated by the Axillary nerve (C5, C6). Prime abductor of the arm from 15° to 90°.'
      }
    ]
  },

  // 2. Biceps Brachii (Upper Limb / Arm)
  {
    id: 'biceps_brachii',
    nameEn: 'Biceps Brachii',
    nameAr: 'العضلة ذات الرأسين العضدية',
    region: 'upper_limb',
    regionLabelEn: 'Upper Limb (Arm)',
    regionLabelAr: 'الطرف العلوي (الذراع)',
    imageUrl: '/images/anatomy/biceps_brachii_anterior_arm.png',
    imageSource: "Gray's Anatomy Plate 411 / Wikimedia Commons",
    imageLicense: 'Creative Commons Attribution 4.0',
    imageCredit: 'Dissection of deep anterior arm muscles (Henry Gray, 1918)',
    location: 'Anterior (flexor) compartment of the arm (brachium).',
    locationAr: 'الحجرة الأمامية (القابضة) للذراع.',
    origin: 'Long head: Supraglenoid tubercle of scapula; Short head: Coracoid process of scapula.',
    originAr: 'الرأس الطويل: الحديبة فوق الحقية للكتف؛ الرأس القصير: الناتئ الغرابي للكتف.',
    insertion: 'Radial tuberosity of radius and bicipital aponeurosis into deep fascia of forearm.',
    insertionAr: 'الأحدوبة الكعبرية لعظم الكعبرة والغشاء الوتري لعضلة البايسبس في لفافة الساعد.',
    innervation: 'Musculocutaneous nerve (C5, C6).',
    innervationAr: 'العصب العضلي الجلدي (الجذور الرقبية C5, C6).',
    action: 'Powerful flexor of forearm at elbow joint; powerful supinator of flexed forearm; weak shoulder flexor.',
    actionAr: 'قابض قوي للساعد عند مفصل المرفق، وأقوى عاطف وباطح (Supinator) للساعد المثني.',
    clinicalNote: 'Tested clinically via Biceps tendon reflex (C5-C6). Rupture of the long head tendon causes "Popeye deformity".',
    clinicalNoteAr: 'يُختبر سريرياً عبر منعكس وتر البايسبس (C5-C6). تمزق وتر الرأس الطويل يسبب تشوه باباي (Popeye deformity).',
    video: {
      id: 'vid_biceps',
      titleEn: 'Biceps Brachii Anatomy, Origin, Insertion & Supination Mechanics',
      titleAr: 'شرح تشريح عضلة البايسبس ووظائفها وميكانيكية البسط الدوار',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_biceps_1',
        question: 'Identify the prominent anterior arm muscle indicated by the pointer / arrow (Spotter Station).',
        questionAr: 'تعرّف على العضلة الأمامية البارزة في الذراع المشار إليها بالسهم (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Anterior flexor compartment muscle (two heads)',
        pointerTarget: 'Biceps brachii',
        correctAnswer: 'Biceps brachii',
        acceptableAnswers: [
          'Biceps brachii',
          'Biceps',
          'Biceps brachii muscle',
          'Musculus biceps brachii',
          'Biceps muscle',
          'العضلة ذات الرأسين العضدية',
          'ذات الرأسين العضدية',
          'ذات الرأسين'
        ],
        explanation: 'The arrow points to the Biceps Brachii muscle. Arises from supraglenoid tubercle (long head) and coracoid process (short head), inserting into the radial tuberosity. Innervated by the Musculocutaneous nerve (C5, C6).'
      }
    ]
  },

  // 3. Triceps Brachii (Upper Limb / Posterior Arm)
  {
    id: 'triceps_brachii',
    nameEn: 'Triceps Brachii',
    nameAr: 'العضلة ثلاثية الرؤوس العضدية',
    region: 'upper_limb',
    regionLabelEn: 'Upper Limb (Posterior Arm)',
    regionLabelAr: 'الطرف العلوي (الوجه الخلفي للذراع)',
    imageUrl: '/images/anatomy/triceps_brachii_posterior_arm.png',
    imageSource: "Gray's Anatomy Plate 412 / Wikimedia Commons",
    imageLicense: 'CC BY 4.0',
    imageCredit: 'Posterior arm muscles and triceps brachii (Henry Gray, 1918)',
    location: 'Posterior compartment of the arm.',
    locationAr: 'الحجرة الخلفية الكاملة للذراع.',
    origin: 'Long head: Infraglenoid tubercle of scapula; Lateral head: Posterior humerus above radial groove; Medial head: Posterior humerus below radial groove.',
    originAr: 'الرأس الطويل: الحديبة تحت الحقية للكتف؛ الرأس الوحشي: أعلى الميزاب الكعبري؛ الرأس الإنسي: أسفل الميزاب الكعبري.',
    insertion: 'Olecranon process of ulna.',
    insertionAr: 'الناتئ الزجي لعظم الزند.',
    innervation: 'Radial nerve (C6, C7, C8).',
    innervationAr: 'العصب الكعبري (الجذور C6, C7, C8).',
    action: 'Chief extensor of the forearm at the elbow joint; long head assists in shoulder extension and adduction.',
    actionAr: 'الباسط الرئيسي للساعد عند مفصل المرفق؛ الرأس الطويل يساعد في بسط وتقريب مفصل الكتف.',
    clinicalNote: 'Tested clinically via Triceps reflex (C7). Fractures of the mid-humeral shaft jeopardize the radial nerve in the radial groove.',
    clinicalNoteAr: 'يُفحص بمنعكس الترايسبس (C7). كسور منتصف عظم العضد تهدد العصب الكعبري المار تحته مباشرة.',
    video: {
      id: 'vid_triceps',
      titleEn: 'Triceps Brachii Anatomy & Radial Nerve Relations',
      titleAr: 'تشريح العضلة ثلاثية الرؤوس وعلاقتها بالعصب الكعبري',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_triceps_1',
        question: 'Identify the muscle indicated by the pointer / arrow on the posterior arm inserting into the olecranon (Spotter Station).',
        questionAr: 'تعرّف على العضلة الخلفية للذراع المشار إليها بالسهم والتي تنغرز في الناتئ الزجي (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Posterior extensor compartment of arm',
        pointerTarget: 'Triceps brachii',
        correctAnswer: 'Triceps brachii',
        acceptableAnswers: [
          'Triceps brachii',
          'Triceps',
          'Triceps brachii muscle',
          'Musculus triceps brachii',
          'Triceps muscle',
          'العضلة ثلاثية الرؤوس العضدية',
          'ثلاثية الرؤوس العضدية',
          'ثلاثية الرؤوس'
        ],
        explanation: 'The arrow points to the Triceps Brachii muscle, the sole muscle occupying the posterior compartment of the arm. Inserts onto the olecranon process of the ulna. Innervated by the Radial nerve (C6, C7, C8).'
      }
    ]
  },

  // 4. Pectoralis Major (Chest)
  {
    id: 'pectoralis_major',
    nameEn: 'Pectoralis Major',
    nameAr: 'العضلة الصدرية الكبيرة',
    region: 'chest',
    regionLabelEn: 'Chest (Anterior Thorax)',
    regionLabelAr: 'الصدر (جدار الصدر الأمامي)',
    imageUrl: '/images/anatomy/muscles/pectoralis_major_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Anterior chest wall and pectoralis major dissection model',
    location: 'Large, fan-shaped muscle covering upper anterior chest wall.',
    locationAr: 'عضلة مروحية كبيرة تغطي الجزء العلوي من جدار الصدر الأمامي.',
    origin: 'Clavicular head: Medial half of clavicle; Sternocostal head: Sternum and costal cartilages 1-6.',
    originAr: 'الرأس الترقوي: النصف الإنسي للترقوة؛ الرأس القصي الضلعي: عظم القص والغضاريف الضلعية 1-6.',
    insertion: 'Lateral lip of the bicipital (intertubercular) groove of humerus.',
    insertionAr: 'الشفة الوحشية للميزاب بين الحديبتين على عظم العضد.',
    innervation: 'Medial and Lateral Pectoral nerves (C5-T1).',
    innervationAr: 'العصبان الصدريان الإنسي والوحشي (C5-T1).',
    action: 'Adduction and medial rotation of the arm; clavicular head flexes the arm; forms anterior axillary fold.',
    actionAr: 'تقريب وتدوير الذراع إنسياً؛ الرأس الترقوي يساهم في عطف الذراع؛ تشكل الطية الإبطية الأمامية.',
    clinicalNote: 'Forms the anterior axillary fold. Congenital absence occurs in Poland syndrome.',
    clinicalNoteAr: 'تشكل الطية الإبطية الأمامية. غيابها الخلقي يسمى متلازمة بولاند (Poland syndrome).',
    video: {
      id: 'vid_pectoralis',
      titleEn: 'Pectoralis Major Origin, Insertion & Clinical Notes',
      titleAr: 'العضلة الصدرية الكبيرة: المنشأ والارتكاز والأهمية السريرية',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_pec_1',
        question: 'Identify the large fan-shaped anterior chest muscle indicated by the pointer / arrow (Spotter Station).',
        questionAr: 'تعرّف على العضلة الصدرية المروحية الكبيرة المشار إليها بالسهم (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Anterior chest wall muscle',
        pointerTarget: 'Pectoralis major',
        correctAnswer: 'Pectoralis major',
        acceptableAnswers: [
          'Pectoralis major',
          'Pec major',
          'Pectoralis major muscle',
          'Musculus pectoralis major',
          'Pectoralis',
          'العضلة الصدرية الكبيرة',
          'الصدرية الكبيرة',
          'العضلة الصدرية الكبرى'
        ],
        explanation: 'The arrow points to Pectoralis Major. It originates from the medial clavicle, sternum, and costal cartilages 1-6, and inserts into the lateral lip of the bicipital groove of the humerus. Innervated by medial and lateral pectoral nerves (C5-T1).'
      }
    ]
  },

  // 5. Rectus Abdominis (Abdomen)
  {
    id: 'rectus_abdominis',
    nameEn: 'Rectus Abdominis',
    nameAr: 'العضلة المستقيمة البطنية',
    region: 'abdomen',
    regionLabelEn: 'Abdomen (Anterior Wall)',
    regionLabelAr: 'البطن (الجدار الأمامي)',
    imageUrl: '/images/anatomy/muscles/rectus_abdominis_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Anterior abdominal wall muscular model',
    location: 'Vertical paired strap muscle on either side of the linea alba within the rectus sheath.',
    locationAr: 'عضلة شريطية عمودية مزدوجة على جانبي الخط الأبيض ضمن غمد المستقيمة.',
    origin: 'Pubic crest and pubic symphysis.',
    originAr: 'عرف العانة والارتفاق العاني.',
    insertion: 'Xiphoid process of sternum and costal cartilages 5-7.',
    insertionAr: 'الناتئ الرهابي لعظم القص والغضاريف الضلعية 5-7.',
    innervation: 'Anterior rami of lower 6 thoracic spinal nerves (T7-T11 thoracoabdominal nerves and T12 subcostal nerve).',
    innervationAr: 'الفروع الأمامية للأعصاب الشوكية الصدرية السفلية (T7-T12).',
    action: 'Flexes the vertebral column / trunk; compresses abdominal contents; stabilizes pelvis during walking.',
    actionAr: 'عطف العمود الفقري والجذع للأمام، ضغط محتويات البطن، وتثبيت الحوض أثناء المشي.',
    clinicalNote: 'Separation of the two rectus bellies is called Diastasis recti, common in postpartum women and elderly individuals.',
    clinicalNoteAr: 'انفصال بطني العضلة المستقيمة يسمى انفراق المستقيمة (Diastasis recti)، شائع بعد الولادة.',
    video: {
      id: 'vid_rectus_abdominis',
      titleEn: 'Rectus Abdominis & Rectus Sheath Anatomy Breakdown',
      titleAr: 'تشريح العضلة المستقيمة البطنية وغمد المستقيمة والخط الأبيض',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_rectus_1',
        question: 'Identify the vertical anterior abdominal wall muscle indicated by the pointer / arrow (Spotter Station).',
        questionAr: 'تعرّف على العضلة البطنية العمودية المشار إليها بالسهم في جدار البطن الأمامي (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Vertical strap muscle within rectus sheath',
        pointerTarget: 'Rectus abdominis',
        correctAnswer: 'Rectus abdominis',
        acceptableAnswers: [
          'Rectus abdominis',
          'Rectus abdominis muscle',
          'Musculus rectus abdominis',
          'Rectus muscle',
          'العضلة المستقيمة البطنية',
          'المستقيمة البطنية',
          'مستقيمة البطن'
        ],
        explanation: 'The arrow points to the Rectus Abdominis muscle. It extends from the pubic crest/symphysis to the xiphoid process and costal cartilages 5-7. Segmented by tendinous intersections. Innervated by thoracoabdominal nerves (T7-T11) and subcostal nerve (T12).'
      }
    ]
  },

  // 6. Trapezius (Back & Posterior Neck)
  {
    id: 'trapezius',
    nameEn: 'Trapezius',
    nameAr: 'العضلة شبه المنحرفة',
    region: 'back',
    regionLabelEn: 'Back (Superficial Extrinsic)',
    regionLabelAr: 'الظهر (الطبقة السطحية)',
    imageUrl: '/images/anatomy/muscles/trapezius_muscle_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Posterior torso and superficial back musculature model',
    location: 'Broad, flat, triangular superficial muscle forming a diamond shape with its contralateral pair on the upper back and neck.',
    locationAr: 'عضلة سطحية مثلثة عريضة تشكل مع قرينتها شكلاً معينيّاً (شبه منحرف) في أعلى الظهر والعنق.',
    origin: 'External occipital protuberance, nuchal ligament, and spinous processes of C7-T12 vertebrae.',
    originAr: 'الناشزة القذالية الخارجية، الرباط القفوي، والنواتئ الشوكية من C7 حتى T12.',
    insertion: 'Lateral third of clavicle, acromion, and spine of the scapula.',
    insertionAr: 'الثلث الوحشي للترقوة، الأخرم، وشوكة لوح الكتف.',
    innervation: 'Motor: Spinal accessory nerve (Cranial Nerve XI); Sensory (proprioception): C3, C4 spinal nerves.',
    innervationAr: 'حركي: العصب اللاحق الشوكي (العصب القحفي الحادي عشر CN XI)؛ حسي حس عميق: C3, C4.',
    action: 'Superior fibers elevate scapula (shoulder shrugging); Middle fibers retract scapula; Inferior fibers depress scapula; Superior + inferior fibers rotate glenoid cavity superiorly.',
    actionAr: 'الألياف العلوية ترفع لوح الكتف (هز الكتفين)؛ الوسطى تقرب اللوح؛ السفلية تخفض اللوح؛ وتتعاون لتدوير الحق نحو الأعلى.',
    clinicalNote: 'Tested by having the patient shrug shoulders against resistance. CN XI injury leads to shoulder droop and winged scapula (lateral winging).',
    clinicalNoteAr: 'يُختبر بطلب هز الكتفين للأعلى ضد المقاومة. أذية العصب القحفي الـ 11 تسبب هبوط الكتف والكتف المجنحة.',
    video: {
      id: 'vid_trapezius',
      titleEn: 'Trapezius Muscle Anatomy & Cranial Nerve XI Examination',
      titleAr: 'العضلة شبه المنحرفة والعصب القحفي الحادي عشر وفحص هز الكتفين',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_trapezius_1',
        question: 'Identify the large superficial upper back muscle indicated by the pointer / arrow (Spotter Station).',
        questionAr: 'تعرّف على العضلة السطحية الكبيرة في أعلى الظهر المشار إليها بالسهم (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Superficial upper back and nuchal muscle',
        pointerTarget: 'Trapezius muscle',
        correctAnswer: 'Trapezius',
        acceptableAnswers: [
          'Trapezius',
          'Trapezius muscle',
          'Musculus trapezius',
          'Trap',
          'Traps',
          'العضلة شبه المنحرفة',
          'شبه المنحرفة'
        ],
        explanation: 'The arrow points to the Trapezius muscle. Innervated by the Spinal Accessory Nerve (Cranial Nerve XI). It elevates, retracts, and rotates the scapula, facilitating overhead arm elevation.'
      }
    ]
  },

  // 7. Sternocleidomastoid (Face & Neck)
  {
    id: 'sternocleidomastoid',
    nameEn: 'Sternocleidomastoid',
    nameAr: 'العضلة القصية الترقوية الخشائية',
    region: 'face_neck',
    regionLabelEn: 'Neck (Anterolateral)',
    regionLabelAr: 'العنق (الوجه الأمامي الوحشي)',
    imageUrl: '/images/anatomy/muscles/sternocleidomastoid_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Head and neck anatomical model showcasing muscular triangles',
    location: 'Major landmark traversing the anterolateral neck, dividing it into anterior and posterior cervical triangles.',
    locationAr: 'المعلم التشريحي الأبرز في العنق، يقسم العنق إلى مثلثين: أمامي وخلفي.',
    origin: 'Sternal head: Anterior surface of manubrium sterni; Clavicular head: Superior surface of medial third of clavicle.',
    originAr: 'الرأس القصي: الوجه الأمامي لقبضة القص؛ الرأس الترقوي: الوجه العلوي للثلث الإنسي للترقوة.',
    insertion: 'Mastoid process of temporal bone and lateral half of superior nuchal line of occipital bone.',
    insertionAr: 'الناتئ الخشائي للعظم الصدغي والنصف الوحشي للخط القفوي العلوي.',
    innervation: 'Motor: Spinal accessory nerve (Cranial Nerve XI); Sensory: C2, C3 anterior rami.',
    innervationAr: 'حركي: العصب اللاحق الشوكي (العصب القحفي XI)؛ حسي: C2, C3.',
    action: 'Unilateral: Tilts head toward same side (ipsilateral lateral flexion) and rotates face toward opposite side (contralateral rotation). Bilateral: Flexes cervical spine.',
    actionAr: 'أحادي الجانب: عطف الرأس للجانب نفسه وتدوير الوجه للجانب المقابل؛ ثنائي الجانب: عطف الرقبة للأمام.',
    clinicalNote: 'Contracture or tumor of SCM causes Torticollis (wry neck), where the head tilts to the affected side with face rotated away.',
    clinicalNoteAr: 'تشنج أو قصر العضلة يسبب الصعر (Torticollis / wry neck)، حيث يميل الرأس لجهة العضلة المصابة مع دوران الذقن للجهة المقابلة.',
    video: {
      id: 'vid_scm',
      titleEn: 'Sternocleidomastoid Muscle: Actions, Triangles & Torticollis',
      titleAr: 'العضلة القصية الترقوية الخشائية: وظائفها ومثلثات العنق والصعر',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_scm_1',
        question: 'Identify the prominent diagonal neck muscle indicated by the pointer / arrow (Spotter Station).',
        questionAr: 'تعرّف على العضلة الرقبية المائلة البارزة المشار إليها بالسهم (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Diagonal cervical muscle dividing neck triangles',
        pointerTarget: 'Sternocleidomastoid (SCM)',
        correctAnswer: 'Sternocleidomastoid',
        acceptableAnswers: [
          'Sternocleidomastoid',
          'SCM',
          'Sternocleidomastoid muscle',
          'Sternocleidomastoideus',
          'Musculus sternocleidomastoideus',
          'Sternomastoid',
          'العضلة القصية الترقوية الخشائية',
          'القصية الترقوية الخشائية',
          'القصية الترقوية'
        ],
        explanation: 'The arrow indicates the Sternocleidomastoid (SCM) muscle. Arises from manubrium and medial clavicle, inserting onto the mastoid process. Innervated by Cranial Nerve XI (Spinal Accessory Nerve).'
      }
    ]
  },

  // 8. Quadriceps Femoris (Lower Limb / Anterior Thigh)
  {
    id: 'quadriceps_femoris',
    nameEn: 'Quadriceps Femoris',
    nameAr: 'العضلة مربعة الرؤوس الفخذية',
    region: 'lower_limb',
    regionLabelEn: 'Lower Limb (Anterior Thigh)',
    regionLabelAr: 'الطرف السفلي (الفخذ الأمامي)',
    imageUrl: '/images/anatomy/muscles/quadriceps_femoris_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Anterior thigh musculoskeletal teaching model',
    location: 'Massive four-headed muscle group composing the anterior compartment of the thigh.',
    locationAr: 'كتلة عضلية ضخمة بأربعة رؤوس تشكل الحجرة الأمامية الكاملة للفخذ.',
    origin: 'Rectus femoris: Anterior inferior iliac spine (AIIS); Vastus lateralis: Greater trochanter & linea aspera; Vastus medialis: Intertrochanteric line & medial lip of linea aspera; Vastus intermedius: Anterior/lateral surface of femoral shaft.',
    originAr: 'المستقيمة الفخذية: الشوكة الحرقفية الأمامية السفلية؛ المتسعة الوحشية: المدور الكبير؛ المتسعة الإنسية: الخط بين المدورين؛ المتسعة المتوسطة: جسم عظم الفخذ.',
    insertion: 'Base of patella and, via the patellar ligament, into the tibial tuberosity.',
    insertionAr: 'قاعدة الرضفة، وعبر الرباط الرضفي إلى الأحدوبة الظنبوبية.',
    innervation: 'Femoral nerve (L2, L3, L4).',
    innervationAr: 'العصب الفخذي (الجذور القطنية L2, L3, L4).',
    action: 'Powerful extensor of the leg at the knee joint; rectus femoris also flexes the thigh at the hip joint.',
    actionAr: 'الباسط الأقوى للساق عند مفصل الركبة؛ والمستقيمة الفخذية تساهم أيضاً في عطف مفصل الورك.',
    clinicalNote: 'Tested via Patellar tendon reflex (knee jerk, L3-L4). Quadriceps weakness causes inability to extend the knee or bear weight without buckling.',
    clinicalNoteAr: 'يُختبر بمنعكس وتر الرضفة (منعكس نفضة الركبة L3-L4). ضعف العضلة يسبب عدم استقرار الركبة وصعوبة النزول عن الدرج.',
    video: {
      id: 'vid_quads',
      titleEn: 'Quadriceps Femoris: 4 Heads, Patellar Ligament & Knee Jerk Reflex',
      titleAr: 'العضلة مربعة الرؤوس الفخذية: الرؤوس الأربعة والرباط الرضفي ومنعكس الركبة',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_quads_1',
        question: 'Identify the large anterior thigh muscle group indicated by the pointer / arrow (Spotter Station).',
        questionAr: 'تعرّف على المجموعة العضلية الكبيرة في الفخذ الأمامي المشار إليها بالسهم (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Anterior thigh knee extensor group',
        pointerTarget: 'Quadriceps femoris',
        correctAnswer: 'Quadriceps femoris',
        acceptableAnswers: [
          'Quadriceps femoris',
          'Quadriceps',
          'Quads',
          'Quadriceps femoris muscle',
          'Musculus quadriceps femoris',
          'Rectus femoris',
          'العضلة مربعة الرؤوس الفخذية',
          'مربعة الرؤوس الفخذية',
          'مربعة الرؤوس'
        ],
        explanation: 'The arrow points to Quadriceps Femoris. Composed of Rectus femoris, Vastus lateralis, Vastus medialis, and Vastus intermedius. Inserts via the patellar ligament into the tibial tuberosity. Chief extensor of the knee, innervated by the Femoral nerve (L2-L4).'
      }
    ]
  },

  // 9. Gastrocnemius (Lower Limb / Posterior Calf)
  {
    id: 'gastrocnemius',
    nameEn: 'Gastrocnemius',
    nameAr: 'العضلة التوأمية الساقية',
    region: 'lower_limb',
    regionLabelEn: 'Lower Limb (Calf / Posterior Leg)',
    regionLabelAr: 'الطرف السفلي (بطة الساق)',
    imageUrl: '/images/anatomy/muscles/gastrocnemius_calf_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Posterior leg dissection model displaying triceps surae and Achilles tendon',
    location: 'Most superficial muscle of the posterior compartment of the leg, giving the calf its bulge.',
    locationAr: 'العضلة الأكثر سطحية في الحجرة الخلفية للساق، تشكل بروز بطة الساق.',
    origin: 'Lateral head: Lateral aspect of lateral condyle of femur; Medial head: Popliteal surface of femur above medial condyle.',
    originAr: 'الرأس الوحشي: الوجه الوحشي للقمتين الفخذيتين؛ الرأس الإنسي: الوجه المأبضي للفخذ أعلى اللقمة الإنسية.',
    insertion: 'Posterior surface of calcaneus via the calcaneal (Achilles) tendon.',
    insertionAr: 'الوجه الخلفي لعظم العقب عبر وتر العقب (وتر أخيل).',
    innervation: 'Tibial nerve (S1, S2).',
    innervationAr: 'العصب الظنبوبي (الجذور العجزية S1, S2).',
    action: 'Powerful plantarflexor of the foot at the ankle joint (propels body forward in walking and running); flexes the leg at the knee joint.',
    actionAr: 'قابض أخمصي قوي للقدم عند مفصل الكاحل (يدفع الجسم للأمام أثناء الركض والقفز)؛ ويساعد في عطف مفصل الركبة.',
    clinicalNote: 'Tested via Calcaneal / Achilles tendon reflex (ankle jerk, S1-S2). Rupture of the Achilles tendon results in inability to stand on tiptoes.',
    clinicalNoteAr: 'يُختبر بمنعكس وتر أخيل (S1-S2). تمزق وتر أخيل يفقد المريض القدرة على الوقوف على رؤوس الأصابع.',
    video: {
      id: 'vid_gastrocnemius',
      titleEn: 'Gastrocnemius & Achilles Tendon: Anatomy, Plantarflexion & Ankle Jerk',
      titleAr: 'العضلة التوأمية الساقية ووتر أخيل: القبض الأخمصي ومنعكس الكاحل',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_gastro_1',
        question: 'Identify the two-bellied posterior calf muscle indicated by the pointer / arrow (Spotter Station).',
        questionAr: 'تعرّف على العضلة الخلفية ذات البطنين في بطة الساق المشار إليها بالسهم (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Superficial two-bellied calf muscle',
        pointerTarget: 'Gastrocnemius (Lateral & Medial heads)',
        correctAnswer: 'Gastrocnemius',
        acceptableAnswers: [
          'Gastrocnemius',
          'Gastrocnemius muscle',
          'Musculus gastrocnemius',
          'Gastrocs',
          'Gastroc',
          'العضلة التوأمية الساقية',
          'التوأمية الساقية',
          'العضلة التوأمية'
        ],
        explanation: 'The arrow points to Gastrocnemius, arising from the lateral and medial femoral condyles and inserting into the calcaneus via the Achilles tendon. Plantarflexes the ankle, innervated by the Tibial nerve (S1, S2).'
      }
    ]
  },

  // 10. Latissimus Dorsi (Back / Posterior Axillary Wall)
  {
    id: 'latissimus_dorsi',
    nameEn: 'Latissimus Dorsi',
    nameAr: 'العضلة العريضة الظهرية',
    region: 'back',
    regionLabelEn: 'Back & Posterior Axilla',
    regionLabelAr: 'الظهر والجدار الخلفي للإبط',
    imageUrl: '/images/anatomy/muscles/latissimus_dorsi_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Gross anatomy posterior torso and posterior axillary fold model',
    location: 'Broad, fan-shaped muscle spanning the lower half of the back, forming the posterior axillary fold.',
    locationAr: 'عضلة مروحية عريضة تغطي النصف السفلي من الظهر وتشكل الطية الإبطية الخلفية.',
    origin: 'Spinous processes of T7-L5, thoracolumbar fascia, iliac crest, and inferior 3-4 ribs.',
    originAr: 'النواتئ الشوكية من T7 حتى L5، اللفافة الصدرية القطنية، العرف الحرقفي، والأضلاع 3-4 السفلية.',
    insertion: 'Floor of the intertubercular (bicipital) groove of the humerus ("a lady between two majors").',
    insertionAr: 'أرضية الميزاب بين الحديبتين لعظم العضد (بين العضلتين الصدرية الكبيرة والمدورة الكبيرة).',
    innervation: 'Thoracodorsal nerve (C6, C7, C8).',
    innervationAr: 'العصب الصدري الظهري (الجذور C6, C7, C8).',
    action: 'Extends, adducts, and medially rotates the arm ("the climbing and swimming muscle"); depresses the scapula.',
    actionAr: 'بسط وتقريب وتدوير الذراع للداخل (عضلة التسلق والسباحة)؛ وخفض لوح الكتف.',
    clinicalNote: 'Tested by having the patient cough while palpating the posterior axillary fold. Frequently harvested as a pedicled myocutaneous flap in reconstructive surgery.',
    clinicalNoteAr: 'تُفحص بجس الطية الإبطية الخلفية أثناء سعال المريض. تُستخدم شرائحها العضلية بكثرة في الجراحة الترميمية.',
    video: {
      id: 'vid_latissimus',
      titleEn: 'Latissimus Dorsi: Attachments, Thoracodorsal Nerve & Function',
      titleAr: 'العضلة العريضة الظهرية: المنشأ والارتكاز والعصب الصدري الظهري',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_lat_1',
        question: 'Identify the wide superficial muscle indicated by the pointer / arrow on the lower back and posterior axillary fold (Spotter Station).',
        questionAr: 'تعرّف على العضلة العريضة السطحية في أسفل الظهر وطية الإبط الخلفية المشار إليها بالسهم (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Broad lower back and posterior axillary fold muscle',
        pointerTarget: 'Latissimus dorsi',
        correctAnswer: 'Latissimus dorsi',
        acceptableAnswers: [
          'Latissimus dorsi',
          'Latissimus dorsi muscle',
          'Lats',
          'Lat',
          'Musculus latissimus dorsi',
          'العضلة العريضة الظهرية',
          'العريضة الظهرية'
        ],
        explanation: 'The arrow points to Latissimus Dorsi, the widest muscle of the back. It forms the posterior axillary fold and inserts into the floor of the bicipital groove of the humerus. Innervated by the Thoracodorsal nerve (C6-C8).'
      }
    ]
  },

  // 11. Gluteus Maximus (Lower Limb / Gluteal Region)
  {
    id: 'gluteus_maximus',
    nameEn: 'Gluteus Maximus',
    nameAr: 'العضلة الألوية الكبرى',
    region: 'lower_limb',
    regionLabelEn: 'Lower Limb (Gluteal Region)',
    regionLabelAr: 'الطرف السفلي (الناحية الإليوية)',
    imageUrl: '/images/anatomy/muscles/gluteus_maximus_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Posterior pelvis and gluteal musculature dissection model',
    location: 'Largest and most superficial muscle of the gluteal region, giving the buttock its rounded prominence.',
    locationAr: 'العضلة الأكبر والأكثر سطحية في الناحية الإليوية، تمنح الإلية تحدبها البارز.',
    origin: 'Ilium behind posterior gluteal line, posterior sacrum and coccyx, and sacrotuberous ligament.',
    originAr: 'عظم الحرقفة خلف الخط الإليوي الخلفي، الوجه الخلفي للعجز والعصعص، والرباط العجزي الحدبي.',
    insertion: 'Iliotibial tract (three-quarters) and gluteal tuberosity of femur (one-quarter).',
    insertionAr: 'السبيل الحرقفي الظنبوبي (ثلاثة أرباع) والأحدوبة الإليوية لعظم الفخذ (الربع).',
    innervation: 'Inferior gluteal nerve (L5, S1, S2).',
    innervationAr: 'العصب الإليوي السفلي (الجذور L5, S1, S2).',
    action: 'Chief extensor and lateral rotator of the thigh at the hip joint; essential for rising from a chair and climbing stairs.',
    actionAr: 'الباسط الرئيسي والمدور الوحشي للفخذ عند مفصل الورك؛ أساسية للنهوض من الكرسي وصعود الدرج.',
    clinicalNote: 'Tested by extending the hip against resistance while prone. Injury to inferior gluteal nerve causes gluteus maximus lurch (trunk lurches backward at heel strike).',
    clinicalNoteAr: 'أذية العصب الإليوي السفلي تسبب مشية ترنح الألوية الكبرى (ترنح الجذع للخلف عند المشي وصعوبة صعود الدرج).',
    video: {
      id: 'vid_gluteus',
      titleEn: 'Gluteus Maximus: Anatomy, Inferior Gluteal Nerve & Gait Biomechanics',
      titleAr: 'العضلة الألوية الكبرى: التشريح والعصب الإليوي السفلي ودورها في المشي',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_gluteus_1',
        question: 'Identify the massive superficial muscle indicated by the pointer / arrow on the buttock (Spotter Station).',
        questionAr: 'تعرّف على العضلة السطحية الضخمة في الإلية المشار إليها بالسهم (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Superficial gluteal prominence muscle',
        pointerTarget: 'Gluteus maximus',
        correctAnswer: 'Gluteus maximus',
        acceptableAnswers: [
          'Gluteus maximus',
          'Gluteus maximus muscle',
          'Glute max',
          'Musculus gluteus maximus',
          'العضلة الألوية الكبرى',
          'الألوية الكبرى'
        ],
        explanation: 'The arrow points to Gluteus Maximus, the heaviest and most powerful extensor of the hip joint. Inserts into the iliotibial tract and gluteal tuberosity. Innervated by the Inferior Gluteal Nerve (L5, S1, S2).'
      }
    ]
  },

  // 12. Frontalis (Face & Scalp)
  {
    id: 'frontalis',
    nameEn: 'Frontalis',
    nameAr: 'العضلة الجبهية',
    region: 'face_neck',
    regionLabelEn: 'Face & Scalp (Forehead)',
    regionLabelAr: 'الوجه وفروة الرأس (الجبهة)',
    imageUrl: '/images/anatomy/muscles/frontalis_muscle_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Cranial and facial musculature medical teaching model',
    location: 'Anterior muscular belly of Occipitofrontalis covering the frontal bone of the forehead.',
    locationAr: 'البطن العضلي الأمامي لعضلة القفوي الجبهي يغطي العظم الجبهي في الجبهة.',
    origin: 'Epicranial aponeurosis (Galea aponeurotica).',
    originAr: 'السفاق الفوق قحفي (الغلالة السفاقية).',
    insertion: 'Skin and subcutaneous tissue of eyebrows and root of nose (no bony insertion).',
    insertionAr: 'جلد ونسيج تحت جلد الحواجب وجذر الأنف (لا ترتكز على عظم).',
    innervation: 'Facial nerve (Cranial Nerve VII - Temporal branch).',
    innervationAr: 'العصب الوجهي (العصب القحفي السابع CN VII - الفرع الصدغي).',
    action: 'Elevates eyebrows and skin of forehead; produces horizontal forehead wrinkles (expression of surprise/attention).',
    actionAr: 'رفع الحواجب وتجعيد جلد الجبهة أفقياً (تعبير المفاجأة والدهشة).',
    clinicalNote: 'Tested by asking the patient to look up and wrinkle forehead. In Upper Motor Neuron (stroke) lesion, forehead wrinkling is PRESERVED due to bilateral cortical innervation; in Bell\'s palsy (LMN lesion), forehead wrinkling is LOST.',
    clinicalNoteAr: 'في السكتة الدماغية (UMN) تسلم تجاعيد الجبهة للتعصيب الثنائي؛ أما في شلل بل (LMN) فتفقد تجاعيد الجبهة في الجهة المصابة تماماً.',
    video: {
      id: 'vid_frontalis',
      titleEn: "Muscles of Facial Expression: Frontalis & Bell's Palsy Signs",
      titleAr: 'عضلات التعبير الوجهي: العضلة الجبهية وفحص شلل العصب السابع',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_frontalis_1',
        question: 'Identify the muscle indicated by the pointer / arrow on the forehead responsible for eyebrow elevation (Spotter Station).',
        questionAr: 'تعرّف على العضلة المشار إليها بالسهم على الجبهة المسؤولة عن رفع الحواجب (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Forehead facial expression muscle',
        pointerTarget: 'Frontalis / Frontal belly of Occipitofrontalis',
        correctAnswer: 'Frontalis',
        acceptableAnswers: [
          'Frontalis',
          'Frontalis muscle',
          'Occipitofrontalis',
          'Frontal belly of occipitofrontalis',
          'Venter frontalis',
          'العضلة الجبهية',
          'الجبهية'
        ],
        explanation: 'The arrow points to the Frontalis muscle (frontal belly of occipitofrontalis). Arises from epicranial aponeurosis, inserting into the skin of the eyebrows. Elevates eyebrows and produces horizontal wrinkles. Innervated by the Temporal branch of Facial Nerve (CN VII).'
      }
    ]
  },

  // 13. Orbicularis Oculi (Face & Eye)
  {
    id: 'orbicularis_oculi',
    nameEn: 'Orbicularis Oculi',
    nameAr: 'العضلة الدويرية العينية',
    region: 'face_neck',
    regionLabelEn: 'Face & Periorbital',
    regionLabelAr: 'الوجه ومحيط العين',
    imageUrl: '/images/anatomy/muscles/orbicularis_oculi_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Orbital and periorbital facial musculature teaching model',
    location: 'Circular sphincter muscle surrounding each orbital margin and extending into eyelids.',
    locationAr: 'عضلة عاصرة دائرية تحيط بحافة حجاج العين وتمتد داخل الأجفان.',
    origin: 'Medial orbital margin, medial palpebral ligament, and lacrimal bone.',
    originAr: 'الحافة الحجاجية الإنسية، الرباط الجفني الإنسي، وعظم الدمع.',
    insertion: 'Skin around orbital margin; fibers interlace to form lateral palpebral raphe.',
    insertionAr: 'الجلد حول حافة الحجاج وتتشابك لتشكل الرفاء الجفني الوحشي.',
    innervation: 'Facial nerve (Cranial Nerve VII - Temporal and Zygomatic branches).',
    innervationAr: 'العصب الوجهي (العصب القحفي السابع CN VII - الفرعان الصدغي والوجني).',
    action: 'Palpebral part gently closes eyelids (blinking and sleep); Orbital part tightly closes eyelids (protects eye from glare/dust); Lacrimal part compresses lacrimal sac.',
    actionAr: 'الجزء الجفني يغلق الأجفان بلطف (الرمش والنوم)؛ الحجاجي يغلق العين بإحكام وقوة؛ والدمعي يساعد في تفريغ الدمع.',
    clinicalNote: 'Paralysis of orbicularis oculi (Bell\'s palsy) causes inability to close the eye (lagophthalmos), leading to exposure keratitis and corneal ulceration.',
    clinicalNoteAr: 'شلل هذه العضلة في شلل العصب السابع يؤدي إلى عدم القدرة على إغماض العين وخطر جفاف وقرحة القرنية.',
    video: {
      id: 'vid_orbicularis_oculi',
      titleEn: 'Orbicularis Oculi Anatomy, Blinking Reflex & Corneal Protection',
      titleAr: 'العضلة الدويرية العينية: أجزاؤها الثلاثة ودورها في حماية القرنية',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_oculi_1',
        question: 'Identify the circular sphincter muscle indicated by the pointer / arrow surrounding the orbit (Spotter Station).',
        questionAr: 'تعرّف على العضلة العاصرة الدائرية المشار إليها بالسهم والمحيطة بمحجر العين (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Circular eyelid sphincter muscle',
        pointerTarget: 'Orbicularis oculi',
        correctAnswer: 'Orbicularis oculi',
        acceptableAnswers: [
          'Orbicularis oculi',
          'Orbicularis oculi muscle',
          'Musculus orbicularis oculi',
          'Orbicularis oculi palpebral',
          'العضلة الدويرية العينية',
          'الدويرية العينية'
        ],
        explanation: 'The arrow points to Orbicularis Oculi, the sphincter muscle of the eyelids. Closes the eyes (gentle blinking via palpebral part, tight squinting via orbital part). Innervated by the Facial Nerve (CN VII).'
      }
    ]
  },

  // 14. Orbicularis Oris (Face & Oral Aperture)
  {
    id: 'orbicularis_oris',
    nameEn: 'Orbicularis Oris',
    nameAr: 'العضلة الدويرية الفموية',
    region: 'face_neck',
    regionLabelEn: 'Face & Perioral',
    regionLabelAr: 'الوجه ومحيط الفم',
    imageUrl: '/images/anatomy/muscles/orbicularis_oris_model.jpg',
    imageSource: 'Academic Medical Anatomy Lab Model Collection',
    imageLicense: 'Educational Medical Commons',
    imageCredit: 'Perioral and masticatory musculature medical model',
    location: 'Complex circular sphincter muscle surrounding the oral fissure in the lips.',
    locationAr: 'عضلة عاصرة دائرية معقدة تحيط بالشق الفموي داخل الشفتين.',
    origin: 'Maxilla and mandible near midline; deep surface of perioral skin; modiolus at mouth angle.',
    originAr: 'الفك العلوي والفك السفلي قرب الخط المتوسط؛ النسيج العميق لجلد الشفاه؛ والعقدة العضلية في زاوية الفم.',
    insertion: 'Mucous membrane and skin of lips; fibers encircle mouth and blend with other facial muscles.',
    insertionAr: 'الغشاء المخاطي والجلد للشفاه؛ وتتداخل مع باقي عضلات الوجه.',
    innervation: 'Facial nerve (Cranial Nerve VII - Buccal and Marginal Mandibular branches).',
    innervationAr: 'العصب الوجهي (العصب القحفي السابع CN VII - الفرعان الشدقي والهامشي الفكي).',
    action: 'Closes and compresses lips; protrudes lips (whistling, kissing); important for speech articulation and retaining food during chewing.',
    actionAr: 'إغلاق وضغط الشفتين؛ زم وبروز الشفاه (عضلة التقبيل والصفير)؛ وضبط مخارج الحروف ومنع خروج الطعام أثناء المضغ.',
    clinicalNote: 'Tested by asking the patient to whistle or blow out cheeks. Weakness leads to drooling of saliva from angle of mouth and slurred speech.',
    clinicalNoteAr: 'تُفحص بالطلب من المريض التصفير أو نفخ الخدين. ضعفها يسبب سيلان اللعاب من زاوية الفم وصعوبة نطق الحروف الشفوية.',
    video: {
      id: 'vid_orbicularis_oris',
      titleEn: 'Orbicularis Oris Anatomy, Modiolus & Lip Competence',
      titleAr: 'العضلة الدويرية الفموية: التشريح ووظائف الشفاه والعقدة العضلية',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_oris_1',
        question: 'Identify the circular muscle indicated by the pointer / arrow encircling the lips (Spotter Station).',
        questionAr: 'تعرّف على العضلة الدائرية المشار إليها بالسهم المحيطة بالشفتين (محطة امتحان OSPE العملي).',
        pointerLabel: 'Arrow ➔ Circular perioral sphincter muscle',
        pointerTarget: 'Orbicularis oris',
        correctAnswer: 'Orbicularis oris',
        acceptableAnswers: [
          'Orbicularis oris',
          'Orbicularis oris muscle',
          'Musculus orbicularis oris',
          'العضلة الدويرية الفموية',
          'الدويرية الفموية'
        ],
        explanation: 'The arrow points to Orbicularis Oris, the sphincter muscle encircling the mouth aperture. Closes and protrudes the lips, aiding speech and mastication. Innervated by Buccal and Marginal Mandibular branches of Facial Nerve (CN VII).'
      }
    ]
  },

  // 15. Extraocular Eye Muscles (Eye / Orbit)
  {
    id: 'eye_muscles',
    nameEn: 'Extraocular Eye Muscles',
    nameAr: 'عضلات العين الخارجية',
    region: 'eye',
    regionLabelEn: 'Head & Orbit',
    regionLabelAr: 'الرأس وحجاج العين',
    imageUrl: '/images/anatomy/extraocular_eye_muscles_orbit.png',
    imageSource: "Gray's Anatomy Plate 886 / Wikimedia Commons",
    imageLicense: 'CC BY 4.0',
    imageCredit: 'Dissection of right orbital cavity and extraocular muscles (Henry Gray, 1918)',
    location: 'Inside the bony orbit, attaching to the sclera of the eyeball.',
    locationAr: 'داخل حجاج العين العظمي، ترتكز على صلبة مقلة العين.',
    origin: 'Common tendinous ring (annulus of Zinn) at the apex of the orbit.',
    originAr: 'الحلقة الوترية المشتركة (حلقة زن) في قمة حجاج العين.',
    insertion: 'Sclera of the eyeball (anterior and posterior to equator).',
    insertionAr: 'صلبة مقلة العين (أمام وخلف خط الاستواء العيني).',
    innervation: 'LR6 (SO4) 3: Lateral Rectus by CN VI (Abducens); Superior Oblique by CN IV (Trochlear); All others by CN III (Oculomotor).',
    innervationAr: 'القاعدة الذهبية LR6 SO4 3: الوحشية بالـ 6، المائلة العلوية بالـ 4، والباقي بالعصب القحفي الـ 3.',
    action: 'Coordinated movement of the eyeball in all directions of gaze (elevation, depression, adduction, abduction, intorsion, extorsion).',
    actionAr: 'تنسيق حركات مقلة العين في جميع الاتجاهات (رفع، خفض، تقريب، تبعيد، تدوير داخلي وخارجي).',
    clinicalNote: 'CN VI palsy causes medial strabismus (inability to abduct eye); CN III palsy causes "down and out" eye with ptosis and dilated pupil.',
    clinicalNoteAr: 'شلل العصب السادس يسبب حولاً إنسياً (عدم القدرة على التبعيد)؛ وشلل الثالث يسبب انحراف العين للأسفل والوحشي مع هبوط الجفن.',
    video: {
      id: 'vid_eye_muscles',
      titleEn: 'Extraocular Muscles & Cranial Nerves Mnemonic (LR6 SO4 3)',
      titleAr: 'عضلات العين الخارجية والأعصاب القحفية وقاعدة LR6 SO4 3',
      youtubeId: '-_LBtX9kw4E',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'spotter_eye_1',
        question: 'Identify the muscle group indicated by the pointer / arrow in the orbit controlling eyeball movement (Spotter Station).',
        questionAr: 'تعرّف على مجموعة العضلات المشار إليها بالسهم داخل الحجاج والمسؤولة عن تحريك مقلة العين (محطة امتحان OSPE العملي).',
        pointerLabel: 'Pointer ➔ Orbital extraocular recti and obliques',
        pointerTarget: 'Extraocular eye muscles',
        correctAnswer: 'Extraocular muscles',
        acceptableAnswers: [
          'Extraocular muscles',
          'Extraocular eye muscles',
          'Eye muscles',
          'Extrinsic eye muscles',
          'Extraocular',
          'عضلات العين الخارجية',
          'عضلات العين'
        ],
        explanation: 'The pointer indicates the Extraocular eye muscles (4 recti + 2 obliques + LPS). Governed by the clinical formula LR6(SO4)3: Lateral rectus by CN VI (Abducens), Superior oblique by CN IV (Trochlear), all others by CN III (Oculomotor).'
      }
    ]
  }
];

// =========================================================================
// 2. CORE ANATOMY LESSONS (ORGANIZED BY SYSTEM)
// =========================================================================
export const ANATOMY_CORE_LESSONS: AnatomyLesson[] = [
  // 1. BASICS: Anatomical Planes
  {
    id: 'lesson_planes',
    titleEn: 'Anatomical Planes & Sections',
    titleAr: 'المستويات والمقاطع التشريحية',
    category: 'basics',
    categoryLabelEn: 'Anatomy Basics',
    categoryLabelAr: 'أساسيات التشريح',
    descriptionEn: 'The three fundamental 2D planes used to section the human body in standard anatomical position.',
    descriptionAr: 'المستويات الثلاثة الأساسية لتقسيم الجسم البشري في الوضعية التشريحية القياسية وقراءة صور الأشعة.',
    keyPoints: [
      'Standard Anatomical Position: Standing upright, face looking forward, arms at sides, palms facing forward (supinated).',
      'Median (Midsagittal) Plane: Vertical plane slicing body into equal right and left halves.',
      'Coronal (Frontal) Plane: Vertical plane slicing body into anterior (front) and posterior (back).',
      'Transverse (Horizontal / Axial) Plane: Horizontal cross-section slicing body into superior (upper) and inferior (lower).'
    ],
    keyPointsAr: [
      'الوضعية التشريحية القياسية: الوقوف منتصباً، الوجه للأمام، الذراعان على الجانبين، وراحتا اليد تتجهان للأمام.',
      'المستوى السهمي المنصف: يقسم الجسم طولياً إلى نصفين متساويين تماماً يمين ويسار.',
      'المستوى الإكليلي الجبهي: يقسم الجسم عمودياً إلى جزء أمامي وجزء خلفي.',
      'المستوى المستعرض الأفقي: يقسم الجسم أفقياً إلى جزء علوي وجزء سفلي (هو أساس صور الأشعة المقطعية CT).'
    ],
    imageUrl: '/images/anatomy/anatomical_planes_diagram.svg',
    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    imageCredit: 'OpenStax College, Rice University',
    mainImageUrl: '/images/anatomy/anatomical_planes_diagram.svg',
    mainImageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    mainImageCredit: 'OpenStax College, Rice University',
    mainImageCaptionEn: 'The three fundamental orthogonal anatomical planes: Sagittal, Coronal, and Transverse.',
    mainImageCaptionAr: 'المستويات التشريحية الثلاثة المتعامدة: السهمي، الإكليلي، والمستعرض.',
    mainImageLabels: [
      {
        id: 'pl_sagittal',
        nameEn: 'Sagittal (Median) Plane',
        nameAr: 'المستوى السهمي (المنصف)',
        descriptionEn: 'Divides the body vertically into right and left portions.',
        descriptionAr: 'يقسم الجسم عمودياً إلى نصفين أيمن وأيسر.',
        xPercent: 32,
        yPercent: 40
      },
      {
        id: 'pl_coronal',
        nameEn: 'Coronal (Frontal) Plane',
        nameAr: 'المستوى الإكليلي (الجبهي)',
        descriptionEn: 'Divides the body vertically into anterior (front) and posterior (back).',
        descriptionAr: 'يقسم الجسم عمودياً إلى جزء أمامي وجزء خلفي.',
        xPercent: 70,
        yPercent: 35
      },
      {
        id: 'pl_transverse',
        nameEn: 'Transverse (Axial) Plane',
        nameAr: 'المستوى المستعرض (المحوري)',
        descriptionEn: 'Horizontal plane slicing into superior (upper) and inferior (lower). Basis of CT scans.',
        descriptionAr: 'يقسم الجسم أفقياً إلى علوي وسفلي، وهو المستوى المعتمد في التصوير الطبقي المحوري CT.',
        xPercent: 50,
        yPercent: 70
      }
    ],
    topics: [
      {
        id: 'top_sagittal',
        titleEn: '1. Sagittal & Median Plane',
        titleAr: 'المستوى السهمي والمنصف',
        shortExplanationEn: 'A vertical plane parallel to the sagittal suture. The Median plane cuts exactly down the midline.',
        shortExplanationAr: 'مستوى شاقولي يمر بموازاة الدرز السهمي. المستوى المنصف يقسم الجسم لنصفين متناظرين تماماً.',
        imageUrl: '/images/anatomy/anatomical_planes_diagram.svg',
        imageSource: 'OpenStax Anatomy',
        labels: [
          {
            id: 'lbl_midsagittal',
            nameEn: 'Midsagittal Midline',
            nameAr: 'الخط المنصف السهمي',
            descriptionEn: 'Produces symmetrical right and left halves.',
            descriptionAr: 'ينتج نصفين متطابقين تشريحياً يميناً ويساراً.',
            xPercent: 35,
            yPercent: 42
          }
        ],
        keyPoints: [
          'Parasagittal planes run parallel to median plane but off-center.',
          'Divisions produce medial (closer to midline) and lateral (further away).'
        ]
      },
      {
        id: 'top_coronal',
        titleEn: '2. Coronal (Frontal) Plane',
        titleAr: 'المستوى الإكليلي الجبهي',
        shortExplanationEn: 'Perpendicular to sagittal plane; divides body into front (anterior/ventral) and back (posterior/dorsal).',
        shortExplanationAr: 'عمودي على المستوى السهمي، يفصل الوجه والصدر (أمام) عن الظهر والقفا (خلف).',
        imageUrl: '/images/anatomy/anatomical_planes_diagram.svg',
        imageSource: 'OpenStax Anatomy',
        labels: [
          {
            id: 'lbl_coronal',
            nameEn: 'Coronal Slice',
            nameAr: 'المقطع الإكليلي',
            descriptionEn: 'Parallel to coronal suture of skull.',
            descriptionAr: 'موازٍ للدرز الإكليلي في الجمجمة.',
            xPercent: 68,
            yPercent: 36
          }
        ],
        keyPoints: [
          'Standard plane for assessing facial and thoracic symmetry.',
          'Crucial for interpreting frontal chest X-rays and MRI brain cuts.'
        ]
      },
      {
        id: 'top_transverse',
        titleEn: '3. Transverse (Axial / Cross-Section) Plane',
        titleAr: 'المستوى المستعرض الأفقي',
        shortExplanationEn: 'Horizontal cut dividing into superior and inferior. Standard orientation viewed from patient feet looking up.',
        shortExplanationAr: 'مستوى أفقي يقسم الجسم لقسم علوي وسفلي. يُقرأ في الأشعة بالنظر من قدمي المريض نحو الأعلى.',
        imageUrl: '/images/anatomy/anatomical_planes_diagram.svg',
        imageSource: 'OpenStax Anatomy',
        labels: [
          {
            id: 'lbl_axial',
            nameEn: 'Axial CT Cut',
            nameAr: 'المقطع المحوري',
            descriptionEn: 'The universal plane of Computed Tomography (CT).',
            descriptionAr: 'المستوى القياسي العالمي في صور الأشعة المقطعية.',
            xPercent: 50,
            yPercent: 68
          }
        ],
        keyPoints: [
          'Used universally in abdominal, chest, and pelvic CT scans.',
          'Right side of the image corresponds to the patient left side.'
        ]
      }
    ],
    video: {
      titleEn: 'Anatomical Planes Explained Simply',
      titleAr: 'شرح المستويات التشريحية بطريقة مبسطة',
      youtubeId: '2k8B87G_n4Y',
      duration: '04:50'
    },
    practiceQuestion: {
      question: 'Which plane divides the body into equal symmetrical right and left halves?',
      options: ['Coronal plane', 'Median (Midsagittal) plane', 'Transverse plane', 'Oblique plane'],
      correctIndex: 1,
      explanation: 'Only the Median (Midsagittal) plane divides the body into equal symmetrical halves.'
    }
  },

  // 2. BASICS: Directional Terms
  {
    id: 'lesson_directions',
    titleEn: 'Anatomical Directional Terms',
    titleAr: 'المصطلحات الاتجاهية التشريحية',
    category: 'basics',
    categoryLabelEn: 'Anatomy Basics',
    categoryLabelAr: 'أساسيات التشريح',
    descriptionEn: 'Universal medical vocabulary used to describe the exact relationship between bodily structures.',
    descriptionAr: 'المصطلحات الطبية العالمية لوصف مواقع التراكيب وعلاقتها ببعضها البعض دون التباس.',
    keyPoints: [
      'Superior (Cranial) vs Inferior (Caudal): Nearer to the head vs nearer to the feet.',
      'Anterior (Ventral) vs Posterior (Dorsal): Nearer to the front vs nearer to the back.',
      'Medial vs Lateral: Nearer to the median plane vs further from the median plane.',
      'Proximal vs Distal: Used for limbs; nearer to limb attachment vs further from attachment.'
    ],
    keyPointsAr: [
      'علوي (Superior) مقابل سفلي (Inferior): أقرب للرأس مقابل أقرب للقدمين.',
      'أمامي (Anterior) مقابل خلفي (Posterior): أقرب لمقدمة الجسم مقابل أقرب للظهر.',
      'إنسي (Medial) مقابل وحشي (Lateral): أقرب للخط الناصف مقابل أبعد عن الخط الناصف.',
      'داني (Proximal) مقابل قاصي (Distal): يُستخدم للأطراف؛ أقرب لمنبت الطرف مقابل أبعد عن المنبت.'
    ],
    imageUrl: '/images/anatomy/directional_terms_diagram.svg',
    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax College',
    mainImageUrl: '/images/anatomy/directional_terms_diagram.svg',
    mainImageSource: 'OpenStax Anatomy & Physiology',
    mainImageCredit: 'OpenStax College',
    mainImageCaptionEn: 'Primary directional terminology: Superior/Inferior, Anterior/Posterior, Medial/Lateral, Proximal/Distal.',
    mainImageCaptionAr: 'المصطلحات الاتجاهية الأساسية وعلاقتها بالوضعية القياسية للجسم البشري.',
    mainImageLabels: [
      {
        id: 'dir_sup',
        nameEn: 'Superior (Cranial)',
        nameAr: 'علوي (قحفي)',
        descriptionEn: 'Toward the head end or upper part of a structure.',
        descriptionAr: 'باتجاه الرأس أو الجزء العلوي من الجسم.',
        xPercent: 50,
        yPercent: 12
      },
      {
        id: 'dir_inf',
        nameEn: 'Inferior (Caudal)',
        nameAr: 'سفلي (ذيلي)',
        descriptionEn: 'Away from the head end or toward the lower part of a structure.',
        descriptionAr: 'بعيداً عن الرأس وباتجاه القدمين.',
        xPercent: 50,
        yPercent: 90
      },
      {
        id: 'dir_med',
        nameEn: 'Medial',
        nameAr: 'إنسي',
        descriptionEn: 'Toward or at the midline of the body.',
        descriptionAr: 'باتجاه الخط الناصف للجسم.',
        xPercent: 45,
        yPercent: 48
      },
      {
        id: 'dir_lat',
        nameEn: 'Lateral',
        nameAr: 'وحشي',
        descriptionEn: 'Away from the midline of the body.',
        descriptionAr: 'بعيداً عن الخط الناصف باتجاه الأطراف الخارجية.',
        xPercent: 82,
        yPercent: 48
      },
      {
        id: 'dir_prox',
        nameEn: 'Proximal',
        nameAr: 'داني / قريب',
        descriptionEn: 'Closer to the origin of the body part or limb attachment point.',
        descriptionAr: 'أقرب لمنبت الطرف أو جذع الجسم (مثل الكتف بالنسبة للمرفق).',
        xPercent: 25,
        yPercent: 35
      },
      {
        id: 'dir_dist',
        nameEn: 'Distal',
        nameAr: 'قاصي / بعيد',
        descriptionEn: 'Farther from the origin of a body part or point of attachment.',
        descriptionAr: 'أبعد عن منبت الطرف (مثل أصابع اليد بالنسبة للرسغ).',
        xPercent: 15,
        yPercent: 65
      }
    ],
    topics: [
      {
        id: 'top_sup_inf',
        titleEn: '1. Superior vs Inferior',
        titleAr: 'العلوي والسفلي',
        shortExplanationEn: 'Superior refers to structures positioned above or closer to the skull; Inferior means below or toward the feet.',
        shortExplanationAr: 'العلوي يعني أقرب للرأس أو الجمجمة؛ والسفلي يعني نحو الأسفل أو باتجاه القدمين.',
        imageUrl: '/images/anatomy/directional_terms_diagram.svg',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_sup',
            nameEn: 'Superior',
            nameAr: 'علوي',
            xPercent: 50,
            yPercent: 15
          },
          {
            id: 'lbl_inf',
            nameEn: 'Inferior',
            nameAr: 'سفلي',
            xPercent: 50,
            yPercent: 88
          }
        ],
        keyPoints: [
          'Example: The heart is superior to the diaphragm.',
          'Example: The stomach is inferior to the lungs.'
        ]
      },
      {
        id: 'top_ant_post',
        titleEn: '2. Anterior (Ventral) vs Posterior (Dorsal)',
        titleAr: 'الأمامي والخلفي',
        shortExplanationEn: 'Anterior indicates front of body (belly side); Posterior indicates back side.',
        shortExplanationAr: 'أمامي (بطني) يعني نحو الواجهة الأمامية للجسم؛ وخلفي (ظهري) يعني نحو الظهر.',
        imageUrl: '/images/anatomy/directional_terms_diagram.svg',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_ant',
            nameEn: 'Anterior (Front)',
            nameAr: 'أمامي',
            xPercent: 62,
            yPercent: 40
          },
          {
            id: 'lbl_post',
            nameEn: 'Posterior (Back)',
            nameAr: 'خلفي',
            xPercent: 38,
            yPercent: 40
          }
        ],
        keyPoints: [
          'Example: The sternum is anterior to the heart.',
          'Example: The esophagus is posterior to the trachea.'
        ]
      },
      {
        id: 'top_prox_dist',
        titleEn: '3. Proximal vs Distal (Limbs Rule)',
        titleAr: 'الداني والقاصي (قاعدة الأطراف)',
        shortExplanationEn: 'Strictly applied to appendicular limbs: Proximal = closer to trunk attachment; Distal = further away.',
        shortExplanationAr: 'تُستخدم خاصة للأطراف: الداني أقرب لمنشأ الطرف عند الجذع، والقاصي أبعد باتجاه الأصابع.',
        imageUrl: '/images/anatomy/directional_terms_diagram.svg',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_prox_arm',
            nameEn: 'Proximal (Elbow)',
            nameAr: 'داني (المرفق)',
            xPercent: 24,
            yPercent: 38
          },
          {
            id: 'lbl_dist_hand',
            nameEn: 'Distal (Wrist)',
            nameAr: 'قاصي (الرسغ)',
            xPercent: 16,
            yPercent: 62
          }
        ],
        keyPoints: [
          'The elbow is proximal to the wrist.',
          'The ankle is distal to the knee.'
        ]
      }
    ],
    video: {
      titleEn: 'Directional Terms in Human Anatomy',
      titleAr: 'المصطلحات الاتجاهية في التشريح البشري',
      youtubeId: 'b_7i0E4wH0I',
      duration: '05:10'
    },
    practiceQuestion: {
      question: 'Which term describes a structure closer to the attachment point of a limb?',
      options: ['Distal', 'Proximal', 'Lateral', 'Inferior'],
      correctIndex: 1,
      explanation: 'Proximal means closer to the root or origin of a limb (e.g. elbow is proximal to wrist).'
    }
  },

  // 3. BASICS: Body Movements
  {
    id: 'lesson_movements',
    titleEn: 'Body Movements & Joint Actions',
    titleAr: 'حركات الجسم والمفاصل',
    category: 'basics',
    categoryLabelEn: 'Anatomy Basics',
    categoryLabelAr: 'أساسيات التشريح',
    descriptionEn: 'Clear definitions of bodily actions: Flexion, Extension, Abduction, Adduction, Supination, and Pronation.',
    descriptionAr: 'تعريف الحركات التشريحية الأساسية: العطف، البسط، التبعيد، التقريب، والكب والبطح.',
    keyPoints: [
      'Flexion: Decreasing the angle between bones (bending).',
      'Extension: Increasing the angle between bones (straightening).',
      'Abduction: Moving away from the median sagittal plane.',
      'Adduction: Moving towards the median sagittal plane (adding to the body).',
      'Supination: Rotating forearm so palm faces anteriorly/upward; Pronation: rotating forearm so palm faces posteriorly/downward.'
    ],
    keyPointsAr: [
      'العطف (Flexion): إنقاص الزاوية بين العظام (الثني).',
      'البسط (Extension): زيادة الزاوية بين العظام (فرد المفصل).',
      'التبعيد (Abduction): تحريك الطرف بعيداً عن الخط الناصف للجسم.',
      'التقريب (Adduction): تحريك الطرف باتجاه الخط الناصف للجسم.',
      'البطح (Supination): دوران الساعد لتتجه راحة اليد للأمام؛ الكب (Pronation): دوران الساعد لتتجه الراحة للخلف.'
    ],
    imageUrl: '/images/anatomy/body_movements_diagram.svg',
    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax / Rice University',
    mainImageUrl: '/images/anatomy/body_movements_diagram.svg',
    mainImageSource: 'OpenStax Anatomy & Physiology',
    mainImageCredit: 'OpenStax / Rice University',
    mainImageCaptionEn: 'Primary anatomical joint movements demonstrated in standard planes.',
    mainImageCaptionAr: 'الحركات المفصلية التشريحية الأساسية وتأثيرها على الزوايا بين العظام.',
    mainImageLabels: [
      {
        id: 'mov_flex',
        nameEn: 'Flexion (Bending)',
        nameAr: 'العطف (الثني)',
        descriptionEn: 'Bends joint, reducing angle between articulating bones.',
        descriptionAr: 'ثني المفصل وإنقاص الزاوية بين العظام.',
        xPercent: 22,
        yPercent: 30
      },
      {
        id: 'mov_ext',
        nameEn: 'Extension (Straightening)',
        nameAr: 'البسط (الفرد)',
        descriptionEn: 'Straightens joint, increasing angle between bones back to anatomical position.',
        descriptionAr: 'زيادة الزاوية وفرد المفصل باتجاه الوضعية التشريحية القياسية.',
        xPercent: 42,
        yPercent: 30
      },
      {
        id: 'mov_abd',
        nameEn: 'Abduction',
        nameAr: 'التبعيد',
        descriptionEn: 'Movement of limb laterally away from the midline sagittal plane.',
        descriptionAr: 'إبعاد الطرف عن الخط الناصف للجسم.',
        xPercent: 68,
        yPercent: 30
      },
      {
        id: 'mov_add',
        nameEn: 'Adduction',
        nameAr: 'التقريب',
        descriptionEn: 'Movement of limb toward the midline ("adding" to body).',
        descriptionAr: 'تقريب الطرف باتجاه الخط الناصف للجسم.',
        xPercent: 88,
        yPercent: 30
      },
      {
        id: 'mov_sup',
        nameEn: 'Supination',
        nameAr: 'البطح (الاستلقاء)',
        descriptionEn: 'Rotating forearm so palm faces anteriorly/superiorly (holding soup).',
        descriptionAr: 'تدوير الساعد لتتجه راحة اليد للأمام أو للأعلى (مثل حمل صحن حساء).',
        xPercent: 35,
        yPercent: 78
      },
      {
        id: 'mov_pron',
        nameEn: 'Pronation',
        nameAr: 'الكب (الانكباب)',
        descriptionEn: 'Rotating forearm so palm faces posteriorly/inferiorly.',
        descriptionAr: 'تدوير الساعد لتتجه راحة اليد للخلف أو للأسفل.',
        xPercent: 65,
        yPercent: 78
      }
    ],
    topics: [
      {
        id: 'top_flex_ext',
        titleEn: '1. Flexion vs Extension',
        titleAr: 'العطف والبسط',
        shortExplanationEn: 'Sagittal-plane movements: Flexion reduces joint angle; Extension straightens it.',
        shortExplanationAr: 'حركات في المستوى السهمي: العطف ينقص الزاوية بين العظمين، والبسط يزيدها.',
        imageUrl: '/images/anatomy/body_movements_diagram.svg',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_flx',
            nameEn: 'Flexion',
            nameAr: 'العطف',
            xPercent: 24,
            yPercent: 32
          },
          {
            id: 'lbl_ext',
            nameEn: 'Extension',
            nameAr: 'البسط',
            xPercent: 44,
            yPercent: 32
          }
        ],
        keyPoints: [
          'Knee flexion brings calf toward posterior thigh.',
          'Elbow flexion brings forearm toward anterior arm.'
        ]
      },
      {
        id: 'top_abd_add',
        titleEn: '2. Abduction vs Adduction',
        titleAr: 'التبعيد والتقريب',
        shortExplanationEn: 'Coronal-plane movements: Abduction moves limb away from midline; Adduction draws it back.',
        shortExplanationAr: 'حركات في المستوى الإكليلي: التبعيد يبعد الطرف عن محور الجسم، والتقريب يعيده نحو المحور.',
        imageUrl: '/images/anatomy/body_movements_diagram.svg',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_abd',
            nameEn: 'Abduction',
            nameAr: 'التبعيد',
            xPercent: 68,
            yPercent: 32
          },
          {
            id: 'lbl_add',
            nameEn: 'Adduction',
            nameAr: 'التقريب',
            xPercent: 88,
            yPercent: 32
          }
        ],
        keyPoints: [
          'Deltoid muscle abducts arm past 15 degrees.',
          'Adductor longus adducts the thigh toward midline.'
        ]
      },
      {
        id: 'top_sup_pro',
        titleEn: '3. Supination vs Pronation',
        titleAr: 'البطح والكب',
        shortExplanationEn: 'Forearm rotational movements at proximal and distal radioulnar joints.',
        shortExplanationAr: 'حركات دورانية خاصة بالساعد تحدث في المفصلين الكعبري الزندي القريب والبعيد.',
        imageUrl: '/images/anatomy/body_movements_diagram.svg',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_sup2',
            nameEn: 'Supination (Soup)',
            nameAr: 'البطح (راحة اليد للأمام)',
            xPercent: 35,
            yPercent: 78
          },
          {
            id: 'lbl_pro2',
            nameEn: 'Pronation',
            nameAr: 'الكب (راحة اليد للخلف)',
            xPercent: 65,
            yPercent: 78
          }
        ],
        keyPoints: [
          'Biceps brachii is the most powerful supinator of the flexed forearm.',
          'Pronator teres and pronator quadratus pronate the forearm.'
        ]
      }
    ],
    video: {
      titleEn: 'Joint Movements & Anatomical Actions',
      titleAr: 'حركات المفاصل والأفعال التشريحية بالتفصيل',
      youtubeId: 'q8M7j7qN0W0',
      duration: '06:00'
    },
    practiceQuestion: {
      question: 'Rotating the forearm so that the palm faces anteriorly is called:',
      options: ['Pronation', 'Supination', 'Abduction', 'Circumduction'],
      correctIndex: 1,
      explanation: 'Supination turns the palm anteriorly (as in standard anatomical position or holding a bowl of soup).'
    }
  },

  // 4. SKELETAL SYSTEM: Bones Overview
  {
    id: 'lesson_bones',
    titleEn: 'Skeletal System & Bone Classification',
    titleAr: 'الجهاز الهيكلي وتصنيف العظام',
    category: 'skeletal',
    categoryLabelEn: 'Skeletal System',
    categoryLabelAr: 'الجهاز الهيكلي',
    descriptionEn: 'The 206 bones of the adult skeleton divided into Axial (80 bones) and Appendicular (126 bones).',
    descriptionAr: 'عظام الهيكل العظمي البالغة 206 عظمة مقسمة إلى هيكل محوري (80 عظمة) وهيكل طرفي (126 عظمة).',
    keyPoints: [
      'Axial Skeleton (80 bones): Skull, vertebral column, ribs, and sternum.',
      'Appendicular Skeleton (126 bones): Upper and lower limbs, pectoral and pelvic girdles.',
      'Bone shapes: Long (Femur, Humerus), Short (Carpals), Flat (Cranial, Sternum), Irregular (Vertebrae), Sesamoid (Patella).'
    ],
    keyPointsAr: [
      'الهيكل المحوري (80 عظمة): الجمجمة، العمود الفقري، الأضلاع، وعظم القص.',
      'الهيكل الطرفي (126 عظمة): عظام الأطراف العلوية والسفلية وزناري الكتف والحوض.',
      'أشكال العظام: طويلة (الفخذ، العضد)، قصيرة (الرسغ)، مسطحة (القص، عظام القحف)، غير منتظمة (الفقرات)، وسمسمية (الرضفة).'
    ],
    imageUrl: '/images/anatomy/axial_skeleton_openstax.jpg',
    imageSource: 'OpenStax Anatomy Plate 701',
    imageCredit: 'OpenStax College, Rice University',
    mainImageUrl: '/images/anatomy/axial_skeleton_openstax.jpg',
    mainImageSource: 'OpenStax Anatomy Plate 701 (Axial Skeleton)',
    mainImageCredit: 'OpenStax College, Rice University (CC BY 4.0)',
    mainImageCaptionEn: 'The Axial Skeleton (80 bones forming central axis) in relation to the complete body.',
    mainImageCaptionAr: 'الهيكل العظمي المحوري (80 عظمة تشكل المحور المركزي للجسم لحماية الأعضاء الحيوية).',
    mainImageLabels: [
      {
        id: 'sk_cranium',
        nameEn: 'Skull / Cranium',
        nameAr: 'الجمجمة والقحف',
        descriptionEn: 'Protects brain; consists of 8 cranial bones and 14 facial bones.',
        descriptionAr: 'تحمي الدماغ وتتكون من 8 عظام قحفية و14 عظماً وجهياً.',
        xPercent: 50,
        yPercent: 12
      },
      {
        id: 'sk_sternum',
        nameEn: 'Sternum (Breastbone)',
        nameAr: 'عظم القص',
        descriptionEn: 'Manubrium, body, and xiphoid process.',
        descriptionAr: 'يتكون من قبضة القص، الجسم، والناتئ الرهابي.',
        xPercent: 50,
        yPercent: 32
      },
      {
        id: 'sk_ribs',
        nameEn: 'Thoracic Cage (12 pairs of ribs)',
        nameAr: 'القفص الصدري (12 زوجاً من الأضلاع)',
        descriptionEn: '7 true ribs, 3 false ribs, 2 floating ribs.',
        descriptionAr: '7 أضلاع حقيقية، 3 كاذبة، واثنان طافيان.',
        xPercent: 36,
        yPercent: 35
      },
      {
        id: 'sk_vertebrae',
        nameEn: 'Vertebral Column',
        nameAr: 'العمود الفقري',
        descriptionEn: '33 vertebrae: 7 Cervical, 12 Thoracic, 5 Lumbar, Sacrum, Coccyx.',
        descriptionAr: '33 فقرة: 7 رقبي، 12 صدري، 5 قطني، العجز والعصعص.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    topics: [
      {
        id: 'top_axial_bones',
        titleEn: '1. Axial Skeleton (80 Bones)',
        titleAr: 'الهيكل العظمي المحوري',
        shortExplanationEn: 'Forms the vertical central axis of the human body. Protects the brain, spinal cord, heart, and lungs.',
        shortExplanationAr: 'يشكل المحور العمودي للجسم ويوفر حماية فائقة للدماغ والنخاع والقلب والرئتين.',
        imageUrl: '/images/anatomy/axial_skeleton_openstax.jpg',
        imageSource: 'OpenStax Plate 701',
        labels: [
          {
            id: 'lbl_axial_skull',
            nameEn: 'Skull',
            nameAr: 'الجمجمة',
            xPercent: 50,
            yPercent: 14
          },
          {
            id: 'lbl_axial_vert',
            nameEn: 'Vertebral Column',
            nameAr: 'العمود الفقري',
            xPercent: 50,
            yPercent: 48
          },
          {
            id: 'lbl_axial_cage',
            nameEn: 'Thoracic Rib Cage',
            nameAr: 'القفص الصدري',
            xPercent: 38,
            yPercent: 34
          }
        ],
        keyPoints: [
          'Skull: 22 bones (8 cranial, 14 facial) + 6 auditory ossicles + 1 hyoid bone = 29 bones.',
          'Vertebral column: 26 bones in adult (C7, T12, L5, Sacrum, Coccyx).',
          'Thoracic cage: 25 bones (24 ribs + 1 sternum).'
        ]
      },
      {
        id: 'top_appendicular_bones',
        titleEn: '2. Appendicular Skeleton (126 Bones)',
        titleAr: 'الهيكل العظمي الطرفي',
        shortExplanationEn: 'All bones of the upper and lower limbs, plus the pectoral (shoulder) and pelvic (hip) girdles.',
        shortExplanationAr: 'عظام الأطراف العلوية والسفلية وزناري الكتف والحوض، مسؤولة عن الحركة والتنقل.',
        imageUrl: '/images/anatomy/appendicular_skeleton_openstax.jpg',
        imageSource: 'OpenStax Plate 801 (Appendicular Skeleton)',
        labels: [
          {
            id: 'lbl_pec_girdle',
            nameEn: 'Pectoral Girdle (Clavicle & Scapula)',
            nameAr: 'زنار الكتف (الترقوة والكتف)',
            xPercent: 32,
            yPercent: 22
          },
          {
            id: 'lbl_upper_limb',
            nameEn: 'Upper Limb (Humerus, Radius, Ulna)',
            nameAr: 'الطرف العلوي (العضد، الكعبرة، الزند)',
            xPercent: 20,
            yPercent: 42
          },
          {
            id: 'lbl_pelvic_girdle',
            nameEn: 'Pelvic Girdle (Os Coxae)',
            nameAr: 'زنار الحوض (عظم الورك)',
            xPercent: 50,
            yPercent: 52
          },
          {
            id: 'lbl_lower_limb',
            nameEn: 'Lower Limb (Femur, Tibia, Fibula)',
            nameAr: 'الطرف السفلي (الفخذ، الظنبوب، الشظية)',
            xPercent: 42,
            yPercent: 78
          }
        ],
        keyPoints: [
          'Pectoral girdle: 4 bones (2 clavicles, 2 scapulae).',
          'Upper limbs: 60 bones (30 per arm: humerus, radius, ulna, 8 carpals, 5 metacarpals, 14 phalanges).',
          'Pelvic girdle: 2 hip bones (ilium, ischium, pubis fused).',
          'Lower limbs: 60 bones (30 per leg: femur, patella, tibia, fibula, 7 tarsals, 5 metatarsals, 14 phalanges).'
        ]
      },
      {
        id: 'top_bone_shapes',
        titleEn: '3. Classification of Bone Shapes',
        titleAr: 'تصنيف أشكال العظام',
        shortExplanationEn: 'Bones are categorized into 5 morphological shapes based on architectural design and mechanical load.',
        shortExplanationAr: 'تُصنف العظام لخمسة أشكال بناءً على تصميمها المعماري والحمل الميكانيكي الواقع عليها.',
        imageUrl: '/images/anatomy/femur_anterior_osteology.png',
        imageSource: 'OpenStax / Gray Anatomy',
        labels: [
          {
            id: 'lbl_femur_long',
            nameEn: 'Long Bone (Femur)',
            nameAr: 'عظم طويل (الفخذ)',
            descriptionEn: 'Shaft (diaphysis) with two ends (epiphyses).',
            descriptionAr: 'جسم أسطواني مع نهايتين مفصليتين.',
            xPercent: 50,
            yPercent: 50
          }
        ],
        keyPoints: [
          'Long bones: Length > width (Femur, Humerus, Phalanges).',
          'Short bones: Cube-shaped (Carpals in wrist, Tarsals in ankle).',
          'Flat bones: Thin, curved, protective (Cranial roof, Sternum, Ribs, Scapula).',
          'Irregular bones: Complex shapes (Vertebrae, Os coxae).',
          'Sesamoid bones: Embedded in tendons (Patella, largest sesamoid).'
        ]
      }
    ],
    video: {
      titleEn: 'The Skeletal System: Axial vs Appendicular',
      titleAr: 'الجهاز الهيكلي: الهيكل المحوري والطرفي',
      youtubeId: '9G_H1fGg2pE',
      duration: '06:40'
    },
    practiceQuestion: {
      question: 'Which of the following bones is classified as a sesamoid bone?',
      options: ['Femur', 'Scapula', 'Patella', 'Sternum'],
      correctIndex: 2,
      explanation: 'The Patella (kneecap) is the largest sesamoid bone in the body, embedded in the quadriceps tendon.'
    }
  },

  // 5. SKELETAL SYSTEM: Major Bones Identification
  {
    id: 'lesson_major_bones',
    titleEn: 'Major Bones Identification (Femur, Humerus, Skull)',
    titleAr: 'التعرف على العظام الرئيسية (الفخذ، العضد، الجمجمة)',
    category: 'skeletal',
    categoryLabelEn: 'Skeletal System',
    categoryLabelAr: 'الجهاز الهيكلي',
    descriptionEn: 'High-yield identification landmarks of the largest long bones and skull.',
    descriptionAr: 'المعالم التشريحية الأكثر أهمية لتمييز عظم الفخذ، العضد، والجمجمة في الامتحان العملي.',
    keyPoints: [
      'Femur: Longest and strongest bone in the body; features head, neck, greater and lesser trochanters, and distal condyles.',
      'Humerus: Arm bone; features head, surgical neck (common fracture site), deltoid tuberosity, and distal trochlea/capitulum.',
      'Skull: Composed of 8 cranial bones and 14 facial bones joined by immovable sutures.'
    ],
    keyPointsAr: [
      'عظم الفخذ: أطول وأقوى عظم في الجسم؛ يتميز بالرأس، العنق، المدورين الكبير والصغير، واللقمتين المفصليتين.',
      'عظم العضد: عظم الذراع؛ يتميز بالرأس، العنق الجراحي (مكان الكسور الأكثر شيوعاً)، الأحدوبة الدالية، والبكرة واللقيمة.',
      'الجمجمة: تتكون من 8 عظام قحفية و14 عظماً وجهياً ملتحمة بدروز غير متحركة.'
    ],
    imageUrl: '/images/anatomy/femur_anterior_osteology.png',
    imageSource: 'NIH Visible Human / OpenStax',
    imageCredit: 'National Library of Medicine & OpenStax',
    mainImageUrl: '/images/anatomy/femur_anterior_osteology.png',
    mainImageSource: 'NIH Visible Human / OpenStax (Anterior Femur)',
    mainImageCredit: 'National Library of Medicine & OpenStax',
    mainImageCaptionEn: 'Femur Osteology: Head, Neck, Greater & Lesser Trochanters, Shaft, and Distal Condyles.',
    mainImageCaptionAr: 'معالم عظم الفخذ: الرأس، العنق، المدور الكبير والصغير، والجسم، واللقمتان المفصليتان.',
    mainImageLabels: [
      {
        id: 'fm_head',
        nameEn: 'Head of Femur',
        nameAr: 'رأس عظم الفخذ',
        descriptionEn: 'Articulates with acetabulum of hip bone to form hip joint.',
        descriptionAr: 'يتمفصل مع الحق في عظم الورك لتشكيل مفصل الورك.',
        xPercent: 32,
        yPercent: 12
      },
      {
        id: 'fm_neck',
        nameEn: 'Neck of Femur',
        nameAr: 'عنق عظم الفخذ',
        descriptionEn: 'Common fracture site in elderly osteoporotic patients.',
        descriptionAr: 'مكان شائع جداً للكسور عند كبار السن المصابين بهشاشة العظام.',
        xPercent: 44,
        yPercent: 16
      },
      {
        id: 'fm_trochanter',
        nameEn: 'Greater Trochanter',
        nameAr: 'المدور الكبير',
        descriptionEn: 'Insertion site for gluteus medius and minimus.',
        descriptionAr: 'مغرز العضلتين الإليوية المتوسطة والصغيرة.',
        xPercent: 74,
        yPercent: 15
      },
      {
        id: 'fm_shaft',
        nameEn: 'Femoral Shaft (Diaphysis)',
        nameAr: 'جسم عظم الفخذ',
        descriptionEn: 'Smooth anterior surface; posterior line aspera.',
        descriptionAr: 'سطح أمامي أملس، ويتميز خلفياً بالخط الخشن.',
        xPercent: 52,
        yPercent: 52
      },
      {
        id: 'fm_condyles',
        nameEn: 'Medial & Lateral Condyles',
        nameAr: 'اللقمتان الإنسية والوحشية',
        descriptionEn: 'Articulate with tibia and menisci in knee joint.',
        descriptionAr: 'تتمفصلان مع عظم الظنبوب والغضاريف الهلالية في الركبة.',
        xPercent: 50,
        yPercent: 92
      }
    ],
    topics: [
      {
        id: 'top_femur_bone',
        titleEn: '1. Femur Bone Osteology',
        titleAr: 'عظم الفخذ (Femur)',
        shortExplanationEn: 'The longest, heaviest, and strongest bone in the body, transmitting entire body weight to the tibia.',
        shortExplanationAr: 'أطول وأثقل وأقوى عظم في جسم الإنسان، ينقل وزن الجسم كاملاً إلى عظم الظنبوب.',
        imageUrl: '/images/anatomy/femur_anterior_osteology.png',
        imageSource: 'Visible Human / OpenStax',
        labels: [
          {
            id: 'lbl_fm_head',
            nameEn: 'Femoral Head',
            nameAr: 'رأس الفخذ',
            xPercent: 32,
            yPercent: 12
          },
          {
            id: 'lbl_fm_troch',
            nameEn: 'Greater Trochanter',
            nameAr: 'المدور الكبير',
            xPercent: 74,
            yPercent: 16
          },
          {
            id: 'lbl_fm_cond',
            nameEn: 'Distal Condyles',
            nameAr: 'اللقمتان السفليتان',
            xPercent: 50,
            yPercent: 90
          }
        ],
        keyPoints: [
          'Head features the fovea capitis for the ligamentum teres.',
          'Neck-shaft angle is normally 125-130 degrees (Coxa vara vs Coxa valga).'
        ]
      },
      {
        id: 'top_humerus_bone',
        titleEn: '2. Humerus Bone Osteology',
        titleAr: 'عظم العضد (Humerus)',
        shortExplanationEn: 'Arm bone featuring the anatomical neck, surgical neck, deltoid tuberosity, and distal elbow articulations.',
        shortExplanationAr: 'عظم الذراع، يتميز بالعنق الجراحي (مكان خطير لكسور العصب الإبطي) والبكرة واللقيمة.',
        imageUrl: '/images/anatomy/humerus_anterior_osteology.png',
        imageSource: 'OpenStax / Gray Anatomy',
        labels: [
          {
            id: 'lbl_hum_head',
            nameEn: 'Head of Humerus',
            nameAr: 'رأس العضد',
            xPercent: 40,
            yPercent: 12
          },
          {
            id: 'lbl_hum_surg',
            nameEn: 'Surgical Neck (Axillary Nerve Risk)',
            nameAr: 'العنق الجراحي (خطر العصب الإبطي)',
            xPercent: 48,
            yPercent: 24
          },
          {
            id: 'lbl_hum_deltoid',
            nameEn: 'Deltoid Tuberosity',
            nameAr: 'الأحدوبة الدالية',
            xPercent: 52,
            yPercent: 45
          },
          {
            id: 'lbl_hum_trochlea',
            nameEn: 'Trochlea & Capitulum',
            nameAr: 'البكرة والرؤيس',
            xPercent: 50,
            yPercent: 88
          }
        ],
        keyPoints: [
          'Surgical neck fracture damages the Axillary nerve and posterior circumflex humeral artery.',
          'Midshaft spiral fracture damages the Radial nerve in the radial groove.',
          'Supracondylar fracture damages the Brachial artery and Median nerve.'
        ]
      },
      {
        id: 'top_skull_bones',
        titleEn: '3. Skull Osteology & Sutures',
        titleAr: 'عظام الجمجمة والدروز الليفية',
        shortExplanationEn: 'Cranial vault enclosing brain (8 bones) and facial skeleton (14 bones) anchored by immovable fibrous sutures.',
        shortExplanationAr: 'قبة القحف التي تحمي الدماغ (8 عظام) وهيكل الوجه (14 عظماً) ملتحمة بالدروز غير المتحركة.',
        imageUrl: '/images/anatomy/skull_anterior_osteology.png',
        imageSource: 'Visible Human / OpenStax',
        labels: [
          {
            id: 'lbl_frontal',
            nameEn: 'Frontal Bone',
            nameAr: 'العظم الجبهي',
            xPercent: 50,
            yPercent: 22
          },
          {
            id: 'lbl_maxilla',
            nameEn: 'Maxilla',
            nameAr: 'الفك العلوي',
            xPercent: 50,
            yPercent: 62
          },
          {
            id: 'lbl_mandible',
            nameEn: 'Mandible (Only Mobile Skull Bone)',
            nameAr: 'الفك السفلي (العظم المتحرك الوحيد)',
            xPercent: 50,
            yPercent: 84
          }
        ],
        keyPoints: [
          'Coronal suture connects frontal and parietal bones.',
          'Sagittal suture connects the two parietal bones.',
          'Lambdoid suture connects parietal and occipital bones.',
          'Mandible is the only movable bone of the adult skull, articulating at the TMJ.'
        ]
      }
    ],
    video: {
      titleEn: 'Femur & Humerus Osteology Spotters',
      titleAr: 'تحديد المعالم العظمية للفخذ والعضد للامتحان العملي',
      youtubeId: 'F2o_jH1bF9c',
      duration: '07:00'
    },
    practiceQuestion: {
      question: 'Which landmark on the Humerus is most frequently fractured, risking the axillary nerve?',
      options: ['Anatomical neck', 'Surgical neck', 'Radial groove', 'Deltoid tuberosity'],
      correctIndex: 1,
      explanation: 'The Surgical neck of the humerus is the narrow region below the tubercles where fractures most commonly occur.'
    }
  },

  // 6. JOINTS: Types of Joints (COMPREHENSIVE MULTI-IMAGE LESSON)
  {
    id: 'lesson_joints',
    titleEn: 'Joints & Articulations',
    titleAr: 'المفاصل وتصنيفاتها',
    category: 'joints',
    categoryLabelEn: 'Joints',
    categoryLabelAr: 'المفاصل',
    descriptionEn: 'Structural classification of joints: Fibrous (immovable), Cartilaginous (semi-movable), and Synovial (freely movable), highlighted by the knee joint ligaments and menisci.',
    descriptionAr: 'التصنيف البنيوي والوظيفي للمفاصل: ليفية (عديمة الحركة)، غضروفية (محدودة الحركة)، وزليلية (حرة الحركة)، مع دراسة تشريحية عميقة لمفصل الركبة والأربطة والغضاريف الهلالية.',
    keyPoints: [
      'Fibrous Joints (Synarthroses): United by dense fibrous connective tissue; no joint cavity (e.g. sutures, syndesmoses, gomphoses).',
      'Cartilaginous Joints (Amphiarthroses): United by hyaline cartilage or fibrocartilage; no joint cavity (e.g. synchondroses, symphyses).',
      'Synovial Joints (Diarthroses): Characterized by a fluid-filled synovial cavity, articular hyaline cartilage, and fibrous capsule.',
      'Types of Synovial Joints: Pivot, Hinge, Saddle, Plane, Condyloid, and Ball-and-socket.',
      'Knee Joint Cruciate Ligaments: ACL prevents anterior translation of tibia; PCL prevents posterior translation of tibia.'
    ],
    keyPointsAr: [
      'المفاصل الليفية (Synarthroses): ترتبط بنسيج ضام ليفي كثيف، عديمة التجويف والحركة (الدروز، الرباط الليفي، والمفصل الوتدي للأسنان).',
      'المفاصل الغضروفية (Amphiarthroses): ترتبط بغضروف زجاجي أو ليفي، محدودة الحركة (الالتحام الغضروفي، والارتفاق العاني وبين الفقرات).',
      'المفاصل الزليلية (Diarthroses): تتميز بوجود جوف مفصلي يحتوي على سائل زليلي، غضروف مفصلي، ومحفظة مفصلية.',
      'أنواع المفاصل الزليلية الستة: مداري/محوري، رزي/مفصلي، سرجي، مسطح، لقمي، وكروي حقي.',
      'أربطة الركبة الصليبية: الرباط الصليبي الأمامي (ACL) يمنع انزلاق الظنبوب للأمام، والخلفي (PCL) يمنع انزلاقه للخلف.'
    ],
    // COMPREHENSIVE MAIN IMAGE: All 6 types of synovial joints
    imageUrl: '/images/anatomy/synovial_joints_types_openstax.jpg',
    imageSource: 'OpenStax Anatomy Plate 909 (Types of Synovial Joints)',
    imageCredit: 'OpenStax College, Rice University (CC BY 4.0)',
    mainImageUrl: '/images/anatomy/synovial_joints_types_openstax.jpg',
    mainImageSource: 'OpenStax Anatomy Plate 909 (Types of Synovial Joints)',
    mainImageCredit: 'OpenStax College, Rice University (CC BY 4.0)',
    mainImageCaptionEn: 'Comprehensive classification of Synovial Joints: Pivot, Hinge, Saddle, Plane, Condyloid, Ball-and-Socket.',
    mainImageCaptionAr: 'الصورة الرئيسية الشاملة: الأنواع الستة للمفاصل الزليلية وأمثلتها التشريحية في الجسم البشري.',
    mainImageLabels: [
      {
        id: 'sj_pivot',
        nameEn: 'Pivot Joint (مفصل مداري/محوري)',
        nameAr: 'المفصل المداري (الأطلسي المحوري / الكعبري الزندي)',
        descriptionEn: 'Allows uniaxial rotation around a central axis (e.g. Atlantoaxial joint, Proximal Radioulnar joint).',
        descriptionAr: 'يسمح بالدوران أحادي المحور (مثل المفصل الأطلسي المحوري لتدوير الرأس والمفصل الكعبري الزندي).',
        xPercent: 18,
        yPercent: 24
      },
      {
        id: 'sj_hinge',
        nameEn: 'Hinge Joint (مفصل رزي)',
        nameAr: 'المفصل الرزي (المرفق / السلاميات)',
        descriptionEn: 'Allows uniaxial flexion and extension in one plane, like a door hinge (e.g. Elbow, Knee, Interphalangeal).',
        descriptionAr: 'يسمح بالحركة في مستوى واحد كعطف وبسط مثل رزة الباب (مفصل المرفق، الركبة، ومفاصل الأصابع).',
        xPercent: 50,
        yPercent: 24
      },
      {
        id: 'sj_saddle',
        nameEn: 'Saddle Joint (مفصل سرجي)',
        nameAr: 'المفصل السرجي (قاعدة الإبهام)',
        descriptionEn: 'Biaxial movement; both surfaces have concave and convex areas (e.g. 1st Carpometacarpal joint of thumb).',
        descriptionAr: 'حركة ثنائية المحور تشبه السرج، يمنح الإبهام القدرة على المقابلة مع بقية الأصابع.',
        xPercent: 82,
        yPercent: 24
      },
      {
        id: 'sj_plane',
        nameEn: 'Plane / Gliding Joint (مفصل مسطح)',
        nameAr: 'المفصل المسطح (بين عظام الرسغ)',
        descriptionEn: 'Flat articular surfaces allowing nonaxial gliding movements (e.g. Intercarpal and Intertarsal joints).',
        descriptionAr: 'سطوح مفصلية مسطحة تسمح بحركات انزلاقية محدودة دون محور (بين عظام الرسغ والكاحل).',
        xPercent: 18,
        yPercent: 74
      },
      {
        id: 'sj_condyloid',
        nameEn: 'Condyloid / Ellipsoid Joint (مفصل لقمي)',
        nameAr: 'المفصل اللقمي (الرسغي الكعبري)',
        descriptionEn: 'Biaxial movement allowing flexion, extension, abduction, and adduction (e.g. Radiocarpal wrist joint).',
        descriptionAr: 'حركة ثنائية المحور تسمح بالعطف، البسط، التبعيد، والتقريب (مفصل الرسغ الكعبري).',
        xPercent: 50,
        yPercent: 74
      },
      {
        id: 'sj_ball_socket',
        nameEn: 'Ball-and-Socket Joint (مفصل كروي حقي)',
        nameAr: 'المفصل الكروي الحقي (الكتف والورك)',
        descriptionEn: 'Multiaxial movement with greatest range of motion in all planes (e.g. Shoulder and Hip joints).',
        descriptionAr: 'أوسع المفاصل مجالاً في الحركة متعدد المحاور في جميع الاتجاهات (مفصل الكتف والورك).',
        xPercent: 82,
        yPercent: 74
      }
    ],

    // STEP-BY-STEP TOPICS WITH INDIVIDUAL EXPLANATORY IMAGES (IMAGE MUST TEACH)
    topics: [
      {
        id: 'top_joint_class',
        titleEn: '1. Classification of Joints (Structural & Functional)',
        titleAr: 'تصنيف المفاصل (البنيوي والوظيفي)',
        shortExplanationEn: 'Joints are classified structurally by binding material (Fibrous, Cartilaginous, Synovial) and functionally by degree of movement.',
        shortExplanationAr: 'تُصنف المفاصل تشريحياً حسب نوع النسيج الرابط إلى ليفية وغضروفية وزليلية، ووظيفياً حسب مدى الحركة.',
        imageUrl: '/images/anatomy/synovial_joint_structure_openstax.jpg',
        imageSource: 'OpenStax Plate 907',
        labels: [
          {
            id: 'lbl_synovial_cavity',
            nameEn: 'Synovial Joint Cavity',
            nameAr: 'التجويف الزليلي (Diarthrosis)',
            descriptionEn: 'Freely movable joint characterized by fluid-filled space.',
            descriptionAr: 'مفصل حر الحركة يتميز بوجود جوف يحوي السائل الزليلي.',
            xPercent: 50,
            yPercent: 50
          }
        ],
        keyPoints: [
          'Synarthrosis: Immovable joint (e.g. skull sutures).',
          'Amphiarthrosis: Slightly movable joint (e.g. pubic symphysis).',
          'Diarthrosis: Freely movable joint (all synovial joints).'
        ]
      },
      {
        id: 'top_fibrous_joints',
        titleEn: '2. Fibrous Joints (Synarthroses)',
        titleAr: 'المفاصل الليفية (دروز الجمجمة والرباطية)',
        shortExplanationEn: 'Bones joined directly by dense fibrous collagen with no joint cavity. Immovable or minimally movable.',
        shortExplanationAr: 'ترتبط العظام مباشرة بألياف كولاجينية كثيفة دون وجود أي تجويف مفصلي، وتعتبر عديمة الحركة.',
        imageUrl: '/images/anatomy/fibrous_joints_openstax.jpg',
        imageSource: 'OpenStax Plate 904 (Fibrous Joints)',
        labels: [
          {
            id: 'lbl_suture',
            nameEn: 'Suture (Cranial)',
            nameAr: 'الدرز القحفي',
            descriptionEn: 'Interlocking seams between adjacent skull bones filled with short connective tissue fibers.',
            descriptionAr: 'حواف مسننة متداخلة بين عظام الجمجمة ترتبط بألياف نسيج ضام قصيرة ومتينة جداً.',
            xPercent: 28,
            yPercent: 32
          },
          {
            id: 'lbl_syndesmosis',
            nameEn: 'Syndesmosis (Interosseous Membrane)',
            nameAr: 'المفصل الرباطي (الغشاء بين العظمين)',
            descriptionEn: 'Bones connected by a ligament or fibrous cord (e.g. between Radius & Ulna, Tibia & Fibula).',
            descriptionAr: 'ترتبط العظام برباط أو غشاء ليفي متين كالغشاء بين عظمتي الساق (الظنبوب والشظية).',
            xPercent: 74,
            yPercent: 32
          },
          {
            id: 'lbl_gomphosis',
            nameEn: 'Gomphosis (Peg-in-Socket)',
            nameAr: 'المفصل الوتدي (تثبيت السن في السنخ)',
            descriptionEn: 'Peg-in-socket fibrous joint: Periodontal ligament anchoring tooth in alveolar bone.',
            descriptionAr: 'مفصل ليفي وتدي فريد يثبت جذر السن في العظم السنخي عبر الرباط حول السني.',
            xPercent: 50,
            yPercent: 82
          }
        ],
        keyPoints: [
          'Sutures ossify in adulthood to become synostoses.',
          'Syndesmosis length determines degree of movement (longer fibers in radius/ulna allow slight rotation).',
          'Gomphosis periodontal fibers provide proprioception during mastication.'
        ]
      },
      {
        id: 'top_cartilaginous_joints',
        titleEn: '3. Cartilaginous Joints (Amphiarthroses)',
        titleAr: 'المفاصل الغضروفية (الالتحام الغضروفي والارتفاق)',
        shortExplanationEn: 'Articulating bones united entirely by cartilage. No joint cavity; allows limited, shock-absorbing movement.',
        shortExplanationAr: 'ترتبط العظام بغضروف نقي أو ليفي دون وجود تجويف مفصلي، وتسمح بحركات خفيفة تمتص الصدمات.',
        imageUrl: '/images/anatomy/cartilaginous_joints_openstax.jpg',
        imageSource: 'OpenStax Plate 906 (Cartilaginous Joints)',
        labels: [
          {
            id: 'lbl_synchondrosis',
            nameEn: 'Synchondrosis (Hyaline Cartilage)',
            nameAr: 'الالتحام الغضروفي الزجاجي',
            descriptionEn: 'Bar or plate of hyaline cartilage uniting bones (e.g. epiphyseal growth plate, 1st costochondral joint).',
            descriptionAr: 'صفيحة من الغضروف الزجاجي تصل بين العظام مثل صفيحة النمو في العظام الطويلة.',
            xPercent: 30,
            yPercent: 44
          },
          {
            id: 'lbl_symphysis',
            nameEn: 'Symphysis (Fibrocartilage Pad)',
            nameAr: 'الارتفاق (وسادة غضروفية ليفية)',
            descriptionEn: 'Fibrocartilaginous pad acting as a shock absorber (e.g. Pubic symphysis, Intervertebral discs).',
            descriptionAr: 'وسادة من الغضروف الليفي تعمل كممتص للصدمات مثل الارتفاق العاني والأقراص بين الفقرات.',
            xPercent: 72,
            yPercent: 44
          }
        ],
        keyPoints: [
          'Synchondroses are often temporary: epiphyseal plates fuse after adolescence.',
          'Symphyses are designed for strength and flexibility under compressive loads.'
        ]
      },
      {
        id: 'top_synovial_structure',
        titleEn: '4. Synovial Joint General Architecture',
        titleAr: 'البنية المعمارية للمفصل الزليلي',
        shortExplanationEn: 'Every synovial joint contains 5 hallmark features: Articular cartilage, Joint cavity, Articular capsule, Synovial fluid, and Reinforcing ligaments.',
        shortExplanationAr: 'يتكون كل مفصل زليلي من 5 عناصر مميزة: غضروف مفصلي، جوف مفصلي، محفظة مفصلية، سائل زليلي، وأربطة داعمة.',
        imageUrl: '/images/anatomy/synovial_joint_structure_openstax.jpg',
        imageSource: 'OpenStax Plate 907 (Synovial Joint Structure)',
        labels: [
          {
            id: 'lbl_art_cart',
            nameEn: 'Articular Cartilage (Hyaline)',
            nameAr: 'الغضروف المفصلي الزجاجي',
            descriptionEn: 'Glassy smooth hyaline cartilage covering opposing bone ends to prevent wear and friction.',
            descriptionAr: 'غضروف زجاجي أملس يغطي نهايتي العظمين لامتصاص الصدمات ومنع الاحتكاك.',
            xPercent: 48,
            yPercent: 36
          },
          {
            id: 'lbl_cavity',
            nameEn: 'Joint Cavity & Synovial Fluid',
            nameAr: 'الجوف المفصلي والسائل الزليلي',
            descriptionEn: 'Potential space holding egg-white like viscous fluid secreted by synovial membrane.',
            descriptionAr: 'فراغ يحوي سائلاً لزجاً يشبه بياض البيض تفرزه المحفظة الزليلية لتغذية الغضروف وتزييت المفصل.',
            xPercent: 48,
            yPercent: 52
          },
          {
            id: 'lbl_fibrous_capsule',
            nameEn: 'Fibrous Capsule',
            nameAr: 'المحفظة الليفية الخارجية',
            descriptionEn: 'Dense irregular connective tissue continuous with bone periosteum, resisting pull.',
            descriptionAr: 'طبقة خارجية كثيفة من نسيج ضام غير منتظم متصلة بسمحاق العظم تمنع تفكك المفصل.',
            xPercent: 24,
            yPercent: 50
          },
          {
            id: 'lbl_synovial_membrane',
            nameEn: 'Synovial Membrane',
            nameAr: 'الغشاء الزليلي الداخلي',
            descriptionEn: 'Vascular loose connective tissue lining inside of fibrous layer, producing synovial fluid.',
            descriptionAr: 'طبقة وعائية داخلية رقيقة تبطن المحفظة الليفية وتقوم بإفراز السائل الزليلي باستمرار.',
            xPercent: 30,
            yPercent: 62
          }
        ],
        keyPoints: [
          'Synovial fluid provides lubrication, nutrient delivery, and shock absorption for avascular cartilage.',
          'Nerve fibers detect pain and monitor joint position and stretch (proprioception).'
        ]
      },
      {
        id: 'top_knee_gross',
        titleEn: '5. The Knee Joint (Articulatio Genus) Gross Anatomy',
        titleAr: 'تشريح مفصل الركبة السطحي والأربطة الجانبية',
        shortExplanationEn: 'The largest and most complex synovial joint in the body. Formed by femorotibial and femoropatellar articulations.',
        shortExplanationAr: 'أكبر وأعقد مفصل زليلي في جسم الإنسان، يجمع بين لقمتي الفخذ والظنبوب والرضفة.',
        imageUrl: '/images/anatomy/knee_joint_anatomy_openstax.jpg',
        imageSource: 'OpenStax Plate 917 (Knee Joint Anatomy)',
        labels: [
          {
            id: 'lbl_patella',
            nameEn: 'Patella & Patellar Ligament',
            nameAr: 'الرضفة والرباط الرضفي',
            descriptionEn: 'Sesamoid bone protecting anterior joint and increasing lever arm of quadriceps.',
            descriptionAr: 'عظم سمسمي يحمي مقدمة الركبة ويزيد من الذراع الميكانيكي لعضلة مربعة الرؤوس.',
            xPercent: 50,
            yPercent: 32
          },
          {
            id: 'lbl_mcl',
            nameEn: 'Tibial (Medial) Collateral Ligament (MCL)',
            nameAr: 'الرباط الجانبي الإنسي (الظنبوبي)',
            descriptionEn: 'Broad flat band extending from medial epicondyle of femur to medial condyle of tibia. Attached to medial meniscus.',
            descriptionAr: 'شريط عريض يمتد من لقيمة الفخذ الإنسية إلى الظنبوب، ويلتحم بشدة مع الغضروف الهلالي الإنسي.',
            xPercent: 22,
            yPercent: 58
          },
          {
            id: 'lbl_lcl',
            nameEn: 'Fibular (Lateral) Collateral Ligament (LCL)',
            nameAr: 'الرباط الجانبي الوحشي (الشظوي)',
            descriptionEn: 'Cord-like band from lateral epicondyle of femur to fibular head. Separate from lateral meniscus.',
            descriptionAr: 'رباط أسطواني كالحبل يمتد من الفخذ إلى رأس الشظية، ويفصله وتر المأبضية عن الغضروف الوحشي.',
            xPercent: 78,
            yPercent: 58
          }
        ],
        keyPoints: [
          'MCL protects against valgus stress (forces from lateral side pushing inward).',
          'LCL protects against varus stress (forces from medial side pushing outward).'
        ]
      }
    ],

    // DETAILED LABELED IMAGE: Cruciate Ligaments and Menisci (Henry Gray Dissection Plate)
    importantStructuresImage: {
      titleEn: 'Knee Interior: Cruciate Ligaments (ACL & PCL) & Menisci',
      titleAr: 'التشريح الداخلي للركبة: الأربطة الصليبية والغضاريف الهلالية',
      imageUrl: '/images/anatomy/knee_joint_interior_ligaments.png',
      imageSource: "Gray's Anatomy Plate 348 / Right Knee Joint Interior",
      imageCredit: 'Henry Gray (1918), Dissection of Cruciate Ligaments and Menisci',
      labels: [
        {
          id: 'str_acl',
          nameEn: 'Anterior Cruciate Ligament (ACL)',
          nameAr: 'الرباط الصليبي الأمامي (ACL)',
          descriptionEn: 'Passes superiorly, posteriorly, and laterally from anterior intercondylar area of tibia to lateral femoral condyle. Prevents anterior displacement of tibia on femur.',
          descriptionAr: 'ينطلق من الباحة بين اللقمتين الأمامية للظنبوب ويتجه للأعلى والخلف والوحشي إلى لقمة الفخذ الوحشية. يمنع انزلاق الظنبوب للأمام تحت الفخذ.',
          xPercent: 47,
          yPercent: 48
        },
        {
          id: 'str_pcl',
          nameEn: 'Posterior Cruciate Ligament (PCL)',
          nameAr: 'الرباط الصليبي الخلفي (PCL)',
          descriptionEn: 'Passes superiorly, anteriorly, and medially from posterior intercondylar area of tibia to medial femoral condyle. Stronger than ACL; prevents posterior displacement of tibia.',
          descriptionAr: 'ينطلق من الباحة الخلفية للظنبوب ويتجه للأعلى والأمام والإنسي نحو لقمة الفخذ الإنسية. أثخن وأقوى من الأمامي، يمنع انزلاق الظنبوب للخلف.',
          xPercent: 55,
          yPercent: 44
        },
        {
          id: 'str_med_meniscus',
          nameEn: 'Medial Meniscus (C-Shaped)',
          nameAr: 'الغضروف الهلالي الإنسي (شكل C)',
          descriptionEn: 'Broad C-shaped fibrocartilage firmly attached to tibial collateral ligament (MCL). Less mobile and 20x more frequently injured than lateral meniscus.',
          descriptionAr: 'قرص غضروفي ليفي واسع على شكل حرف C، ملتحم بقوة بالرباط الجانبي الإنسي، حركته محدودة لذا يتعرض للتمزق أكثر بكثير من الوحشي.',
          xPercent: 28,
          yPercent: 64
        },
        {
          id: 'str_lat_meniscus',
          nameEn: 'Lateral Meniscus (Circular)',
          nameAr: 'الغضروف الهلالي الوحشي (شكل دائري)',
          descriptionEn: 'Nearly circular fibrocartilage, not attached to LCL, separated by popliteus tendon. More mobile and resilient to injury.',
          descriptionAr: 'قرص غضروفي ليفي شبه دائري غير ملتحم بالرباط الشظوي، ويفصله عنه وتر العضلة المأبضية؛ لذا يتمتع بحرية حركة أكبر تحميه من التمزق.',
          xPercent: 72,
          yPercent: 62
        },
        {
          id: 'str_patellar_lig',
          nameEn: 'Patellar Ligament Attachment',
          nameAr: 'مغرز الرباط الرضفي',
          descriptionEn: 'Attaches to tibial tuberosity, carrying the pull of the entire quadriceps tendon.',
          descriptionAr: 'يرتكز على أحدوبة الظنبوب ناقلاً قوة شد عضلة مربعة الرؤوس الفخذية كاملة.',
          xPercent: 50,
          yPercent: 88
        }
      ]
    },

    video: {
      titleEn: 'Types of Joints in the Human Body',
      titleAr: 'أنواع المفاصل في جسم الإنسان وتصنيفها',
      youtubeId: 'k1W_b10N2A8',
      duration: '05:25'
    },
    practiceQuestion: {
      question: 'Which of the following ligaments prevents the tibia from sliding anteriorly relative to the femur?',
      options: ['Posterior Cruciate Ligament (PCL)', 'Anterior Cruciate Ligament (ACL)', 'Fibular Collateral Ligament (LCL)', 'Patellar Ligament'],
      correctIndex: 1,
      explanation: 'The Anterior Cruciate Ligament (ACL) prevents anterior displacement of the tibia on the femur, tested clinically with the anterior drawer test.'
    }
  },

  // 7. ORGAN SYSTEMS: Nervous System
  {
    id: 'lesson_nervous',
    titleEn: 'The Nervous System & Neuroanatomy',
    titleAr: 'الجهاز العصبي والتشريح العصبي',
    category: 'organ_systems',
    categoryLabelEn: 'Organ Systems',
    categoryLabelAr: 'أجهزة الأعضاء',
    descriptionEn: 'Central Nervous System (Brain and Spinal cord) and Peripheral Nervous System (12 cranial nerves and 31 pairs of spinal nerves).',
    descriptionAr: 'الجهاز العصبي المركزي (الدماغ والنخاع الشوكي) والمحيطي (12 زوجاً من الأعصاب القحفية و31 زوجاً من الأعصاب الشوكية).',
    keyPoints: [
      'Brain: Consists of Cerebrum (telecephalon), Diencephalon, Brainstem (Midbrain, Pons, Medulla), and Cerebellum.',
      'Cerebral Lobes: Frontal (motor/personality), Parietal (somatosensory), Temporal (auditory/memory), Occipital (vision).',
      'Meninges: Three protective membranes (Dura mater, Arachnoid mater, Pia mater) enclosing CSF.'
    ],
    keyPointsAr: [
      'الدماغ: يتكون من المخ، الدماغ البيني، جذع الدماغ (المتوسط، الجسر، النخاع المستطيل)، والمخيخ.',
      'فصوص المخ: الجبهي (الحركي والشخصية)، الجداري (الحسي)، الصدغي (السمع والذاكرة)، القذالي (الرؤية).',
      'السحايا: ثلاثة أغشية تحمي الجهاز العصبي المركزي (الأم الجافية، الأم العنكبوتية، والأم الحنون).'
    ],
    imageUrl: '/images/anatomy/brain_midsagittal_section.png',
    imageSource: 'NIH Visible Human Project / OpenStax',
    imageCredit: 'National Library of Medicine & OpenStax',
    mainImageUrl: '/images/anatomy/brain_midsagittal_section.png',
    mainImageSource: 'NIH Visible Human / OpenStax (Midsagittal Brain)',
    mainImageCredit: 'National Library of Medicine & OpenStax',
    mainImageCaptionEn: 'Midsagittal section of the human brain: Corpus Callosum, Brainstem, and Cerebellum.',
    mainImageCaptionAr: 'المقطع السهمي المنصف للدماغ البشري: الجسم الثفني، الدماغ البيني، جذع الدماغ، والمخيخ.',
    mainImageLabels: [
      {
        id: 'br_corpus',
        nameEn: 'Corpus Callosum',
        nameAr: 'الجسم الثفني',
        descriptionEn: 'Largest white matter commissural tract connecting right and left cerebral hemispheres.',
        descriptionAr: 'أكبر حزمة من المادة البيضاء تربط بين نصفي الكرة المخية الأيمن والأيسر.',
        xPercent: 52,
        yPercent: 32
      },
      {
        id: 'br_thalamus',
        nameEn: 'Thalamus & Hypothalamus',
        nameAr: 'المهاد والوطاء',
        descriptionEn: 'Sensory relay hub of the brain and master autonomic/endocrine regulator.',
        descriptionAr: 'محطة الترحيل الحسي الرئيسية في الدماغ ومركز التحكم الذاتي والهرموني.',
        xPercent: 52,
        yPercent: 44
      },
      {
        id: 'br_stem',
        nameEn: 'Brainstem (Pons & Medulla)',
        nameAr: 'جذع الدماغ (الجسر والنخاع المستطيل)',
        descriptionEn: 'Controls vital cardiac and respiratory autonomic centers.',
        descriptionAr: 'يحتوي المراكز الحيوية التلقائية للتنفس وضربات القلب وضغط الدم.',
        xPercent: 48,
        yPercent: 68
      },
      {
        id: 'br_cerebellum',
        nameEn: 'Cerebellum',
        nameAr: 'المخيخ',
        descriptionEn: 'Coordinates voluntary motor movements, posture, and fine balance.',
        descriptionAr: 'ينسق الحركات الإرادية والتوازن والتوافق الحركي الدقيق.',
        xPercent: 78,
        yPercent: 68
      }
    ],
    topics: [
      {
        id: 'top_cerebrum',
        titleEn: '1. Cerebral Hemispheres & Lobes',
        titleAr: 'نصفا الكرة المخية والفصوص الوظيفية',
        shortExplanationEn: 'The cerebrum consists of two hemispheres divided into Frontal, Parietal, Temporal, and Occipital lobes.',
        shortExplanationAr: 'يتكون المخ من نصفي كرة مقسمين لأربعة فصوص رئيسية: جبهي، جداري، صدغي، وقذالي.',
        imageUrl: '/images/anatomy/brain_midsagittal_section.png',
        imageSource: 'NIH Visible Human',
        labels: [
          {
            id: 'lbl_frontal_lobe',
            nameEn: 'Frontal Cortex',
            nameAr: 'القشرة الجبهية',
            xPercent: 30,
            yPercent: 28
          },
          {
            id: 'lbl_occipital_lobe',
            nameEn: 'Occipital Cortex (Vision)',
            nameAr: 'القشرة القذالية (البصر)',
            xPercent: 82,
            yPercent: 42
          }
        ],
        keyPoints: [
          'Frontal lobe: Primary motor cortex and Broca speech area.',
          'Occipital lobe: Primary visual cortex (Brodmann 17).'
        ]
      },
      {
        id: 'top_brainstem',
        titleEn: '2. Brainstem & Cerebellum',
        titleAr: 'جذع الدماغ والمخيخ',
        shortExplanationEn: 'Brainstem contains Midbrain, Pons, and Medulla oblongata; transmits all ascending and descending pathways.',
        shortExplanationAr: 'يتألف جذع الدماغ من الدماغ المتوسط والجسر والنخاع المستطيل، ويعبره كل السبُل الصاعدة والنازلة.',
        imageUrl: '/images/anatomy/brain_midsagittal_section.png',
        imageSource: 'NIH Visible Human',
        labels: [
          {
            id: 'lbl_stem2',
            nameEn: 'Brainstem',
            nameAr: 'جذع الدماغ',
            xPercent: 48,
            yPercent: 68
          },
          {
            id: 'lbl_cereb2',
            nameEn: 'Cerebellum',
            nameAr: 'المخيخ',
            xPercent: 78,
            yPercent: 68
          }
        ],
        keyPoints: [
          'Cranial nerves III-XII emerge from the brainstem.',
          'Medulla oblongata houses cardiac, vasomotor, and respiratory reflex centers.'
        ]
      }
    ],
    video: {
      titleEn: 'Brain Anatomy & Functional Lobes',
      titleAr: 'تشريح الدماغ والفصوص الوظيفية للأطباء',
      youtubeId: '3Qp0XqD3nZ0',
      duration: '06:50'
    },
    practiceQuestion: {
      question: 'Which cerebral lobe contains the primary visual cortex?',
      options: ['Frontal lobe', 'Parietal lobe', 'Temporal lobe', 'Occipital lobe'],
      correctIndex: 3,
      explanation: 'The Occipital lobe houses the primary visual cortex (Brodmann area 17).'
    }
  },

  // 8. ORGAN SYSTEMS: Cardiovascular System
  {
    id: 'lesson_cardiovascular',
    titleEn: 'The Cardiovascular System & The Heart',
    titleAr: 'الجهاز القلبي الوعائي وتشريح القلب',
    category: 'organ_systems',
    categoryLabelEn: 'Organ Systems',
    categoryLabelAr: 'أجهزة الأعضاء',
    descriptionEn: 'The four chambers of the heart, internal valves, coronary circulation, and great blood vessels.',
    descriptionAr: 'حجرات القلب الأربع، الصمامات القلبية، التروية الإكليلية، والأوعية الدموية الكبرى.',
    keyPoints: [
      'Four Chambers: Right Atrium (receives deoxygenated blood from SVC/IVC), Right Ventricle, Left Atrium (receives 4 pulmonary veins), Left Ventricle.',
      'Valves: Tricuspid valve (between RA & RV), Mitral/Bicuspid valve (between LA & LV), Pulmonary and Aortic semilunar valves.',
      'Left Ventricular wall is 3 times thicker than right ventricular wall to pump blood against systemic vascular resistance.'
    ],
    keyPointsAr: [
      'الحجرات الأربع: الأذين الأيمن (يستقبل الدم الوريدي من الوريدين الأجوفين)، البطين الأيمن، الأذين الأيسر (يستقبل الأوردة الرئوية الأربعة)، والبطين الأيسر.',
      'الصمامات: مثلث الشرف (بين الأذين والبطين الأيمن)، الإكليلي/ثنائي الشرف (بين الأذين والبطين الأيسر)، والصمامان الهلاليان الرئوي والأبهري.',
      'جدار البطين الأيسر أثخن بثلاث مرات من البطين الأيمن ليضخ الدم للجسم كاملاً تحت ضغط عالٍ.'
    ],
    imageUrl: '/images/anatomy/heart_anterior_anatomy.png',
    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax / Rice University',
    mainImageUrl: '/images/anatomy/heart_anterior_anatomy.png',
    mainImageSource: 'OpenStax Anatomy & Physiology (Anterior Heart)',
    mainImageCredit: 'OpenStax / Rice University',
    mainImageCaptionEn: 'Anterior external and internal anatomy of the heart and great vessels.',
    mainImageCaptionAr: 'التشريح الأمامي الخارجي والداخلي للقلب والأوعية الدموية الكبرى.',
    mainImageLabels: [
      {
        id: 'ht_aorta',
        nameEn: 'Ascending Aorta & Aortic Arch',
        nameAr: 'الأبهر الصاعد وقوس الأبهر',
        descriptionEn: 'Delivers oxygenated blood under high systolic pressure to systemic circulation.',
        descriptionAr: 'يضخ الدم المؤكسج تحت ضغط مرتفع إلى جميع أنحاء الجسم.',
        xPercent: 48,
        yPercent: 14
      },
      {
        id: 'ht_pa',
        nameEn: 'Pulmonary Trunk',
        nameAr: 'الجذع الرئوي',
        descriptionEn: 'Carries deoxygenated blood from right ventricle to lungs.',
        descriptionAr: 'يحمل الدم غير المؤكسج من البطين الأيمن إلى الرئتين.',
        xPercent: 62,
        yPercent: 24
      },
      {
        id: 'ht_ra',
        nameEn: 'Right Atrium',
        nameAr: 'الأذين الأيمن',
        descriptionEn: 'Receives deoxygenated blood from SVC, IVC, and coronary sinus.',
        descriptionAr: 'يستقبل الدم غير المؤكسج من الوريدين الأجوفين العلوي والسفلي والجيب الإكليلي.',
        xPercent: 28,
        yPercent: 40
      },
      {
        id: 'ht_lv',
        nameEn: 'Left Ventricle (Thick Myocardium)',
        nameAr: 'البطين الأيسر (عضلة سميكة)',
        descriptionEn: 'Thick muscular wall pumping blood throughout systemic arterial system.',
        descriptionAr: 'جدار عضلي سميك يضخ الدم عبر الدوران الجهازي تحت ضغط 120 ملم زئبقي.',
        xPercent: 68,
        yPercent: 65
      }
    ],
    topics: [
      {
        id: 'top_heart_chambers',
        titleEn: '1. Four Chambers & Blood Flow Cycle',
        titleAr: 'حجرات القلب الأربع ودورة تدفق الدم',
        shortExplanationEn: 'Right heart pumps to low-pressure pulmonary circuit; left heart pumps to high-pressure systemic circuit.',
        shortExplanationAr: 'القلب الأيمن يضخ للدوران الرئوي منخفض الضغط، والقلب الأيسر يضخ للدوران الجهازي مرتفع الضغط.',
        imageUrl: '/images/anatomy/heart_anterior_anatomy.png',
        imageSource: 'OpenStax Heart Anatomy',
        labels: [
          {
            id: 'lbl_ra',
            nameEn: 'Right Atrium',
            nameAr: 'الأذين الأيمن',
            xPercent: 28,
            yPercent: 40
          },
          {
            id: 'lbl_lv',
            nameEn: 'Left Ventricle',
            nameAr: 'البطين الأيسر',
            xPercent: 68,
            yPercent: 65
          }
        ],
        keyPoints: [
          'Deoxygenated blood: SVC/IVC -> RA -> RV -> Pulmonary arteries -> Lungs.',
          'Oxygenated blood: Pulmonary veins -> LA -> LV -> Aorta -> Systemic tissues.'
        ]
      },
      {
        id: 'top_valves',
        titleEn: '2. Cardiac Valves (Atrioventricular & Semilunar)',
        titleAr: 'الصمامات القلبية (الأذينية البطينية والهلالية)',
        shortExplanationEn: 'Valves enforce unidirectional forward blood flow. AV valves have chordae tendineae attached to papillary muscles.',
        shortExplanationAr: 'تضمن الصمامات جريان الدم باتجاه واحد فقط دون ارتداد، ومثبتة بالحبال الوترية والعضلات الحليمية.',
        imageUrl: '/images/anatomy/heart_anterior_anatomy.png',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_mitral',
            nameEn: 'Mitral / Bicuspid Valve',
            nameAr: 'الصمام التاجي (ثنائي الشرف)',
            descriptionEn: 'Between Left Atrium and Left Ventricle.',
            descriptionAr: 'يفصل الأذين الأيسر عن البطين الأيسر.',
            xPercent: 60,
            yPercent: 48
          },
          {
            id: 'lbl_tricuspid',
            nameEn: 'Tricuspid Valve',
            nameAr: 'الصمام مثلث الشرف',
            descriptionEn: 'Between Right Atrium and Right Ventricle.',
            descriptionAr: 'يفصل الأذين الأيمن عن البطين الأيمن.',
            xPercent: 36,
            yPercent: 48
          }
        ],
        keyPoints: [
          'Tricuspid valve: 3 cusps (Right side).',
          'Mitral (bicuspid) valve: 2 cusps (Left side).',
          'Aortic & Pulmonary valves: Semilunar pockets with no chordae tendineae.'
        ]
      }
    ],
    video: {
      titleEn: 'Heart Anatomy, Chambers & Valves Dissection',
      titleAr: 'تشريح حجرات القلب والصمامات وتدفق الدم',
      youtubeId: 'q5sE7_Z9YqA',
      duration: '06:15'
    },
    practiceQuestion: {
      question: 'Which valve separates the Left Atrium from the Left Ventricle?',
      options: ['Tricuspid valve', 'Mitral (Bicuspid) valve', 'Aortic valve', 'Pulmonary valve'],
      correctIndex: 1,
      explanation: 'The Mitral (Bicuspid) valve guards the left atrioventricular orifice.'
    }
  },

  // 9. ORGAN SYSTEMS: Respiratory System (COMPREHENSIVE MULTI-IMAGE LESSON)
  {
    id: 'lesson_respiratory',
    titleEn: 'The Respiratory System & Lungs',
    titleAr: 'الجهاز التنفسي وتشريح الرئتين والشجرة القصبية',
    category: 'organ_systems',
    categoryLabelEn: 'Organ Systems',
    categoryLabelAr: 'أجهزة الأعضاء',
    descriptionEn: 'Complete anatomy of the respiratory tract from nose to alveoli, featuring the trachea, carina, bronchial tree differences, and anatomical comparison of right vs left lungs.',
    descriptionAr: 'التشريح الكامل للجهاز التنفسي من الأنف إلى الأسناخ: الرغامي، الجؤجؤ، تفرعات الشجرة القصبية، والفروق التشريحية الدقيقة بين فصوص وشقوق الرئة اليمنى واليسرى.',
    keyPoints: [
      'Upper Respiratory Tract: Nose, paranasal sinuses, and pharynx.',
      'Lower Respiratory Tract: Larynx, trachea, bronchial tree, and lungs.',
      'Trachea has 16-20 C-shaped hyaline cartilage rings; posterior wall closed by trachealis smooth muscle.',
      'Carina: Internal ridge at trachea bifurcation (T4/T5 vertebral level, sternal angle).',
      'Right Primary Bronchus is wider, shorter, and more vertical than left, making inhaled foreign objects lodge there.',
      'Right Lung has 3 lobes (Superior, Middle, Inferior) and 2 fissures (Horizontal, Oblique).',
      'Left Lung has 2 lobes (Superior, Inferior), 1 fissure (Oblique), Cardiac Notch, and Lingula.'
    ],
    keyPointsAr: [
      'السبيل التنفسي العلوي: الأنف، الجيوب جانب الأنفية، والبلعوم.',
      'السبيل التنفسي السفلي: الحنجرة، الرغامي، الشجرة القصبية، والرئتان.',
      'الرغامي تحوي 16-20 حلقة غضروفية زجاجية على شكل حرف C، يغلق جدارها الخلفي العضلة الرغامية الملساء.',
      'الجؤجؤ (Carina): نتوء غضروفي داخلي عند تفرع الرغامي بمستوى T4/T5 (زاوية القص).',
      'القصبة الهوائية اليمنى أوسع وأقصر وأكثر استقامة شاقولية؛ لذا تنحشر الأجسام الأجنبية المستنشقة فيها.',
      'الرئة اليمنى تتكون من 3 فصوص (علوي، متوسط، سفلي) وشقين (أفقي ومائل).',
      'الرئة اليسرى تتكون من فصين (علوي وسفلي) وشق مائل، وتحوي الثلمة القلبية واللسينة.'
    ],
    // COMPREHENSIVE MAIN IMAGE: All major respiratory organs
    imageUrl: '/images/anatomy/respiratory_system_major_organs_openstax.jpg',
    imageSource: 'OpenStax Anatomy Plate 2301 (Major Respiratory Organs)',
    imageCredit: 'OpenStax College, Rice University (CC BY 4.0)',
    mainImageUrl: '/images/anatomy/respiratory_system_major_organs_openstax.jpg',
    mainImageSource: 'OpenStax Anatomy Plate 2301 (Major Respiratory Organs)',
    mainImageCredit: 'OpenStax College, Rice University (CC BY 4.0)',
    mainImageCaptionEn: 'Complete Respiratory Tract: Nasal Cavity, Pharynx, Larynx, Trachea, Bronchi, Right and Left Lungs.',
    mainImageCaptionAr: 'الصورة الرئيسية الشاملة: السبيل التنفسي الكامل من التجويف الأنفي إلى الرغامي والرئتين والحجاب الحاجز.',
    mainImageLabels: [
      {
        id: 'resp_nasal',
        nameEn: 'Nasal Cavity & Pharynx',
        nameAr: 'التجويف الأنفي والبلعوم',
        descriptionEn: 'Filters, warms, and humidifies incoming air; shared conduit.',
        descriptionAr: 'تنقية وتدفئة وترطيب الهواء المستنشق.',
        xPercent: 50,
        yPercent: 12
      },
      {
        id: 'resp_larynx',
        nameEn: 'Larynx (Voice Box)',
        nameAr: 'الحنجرة (صندوق الصوت)',
        descriptionEn: 'Contains thyroid and cricoid cartilages, vocal cords, and epiglottis.',
        descriptionAr: 'تحوي الغضروفين الدرقي والحلقي والحبلين الصوتيين ولسان المزمار.',
        xPercent: 50,
        yPercent: 26
      },
      {
        id: 'resp_trachea',
        nameEn: 'Trachea (Windpipe)',
        nameAr: 'الرغامي (القصبة الهوائية)',
        descriptionEn: 'Rigid tube reinforced with C-shaped cartilages descending into mediastinum.',
        descriptionAr: 'أنبوب صلب مدعم بحلقات غضروفية C ينزل في المنصف الصدري.',
        xPercent: 50,
        yPercent: 38
      },
      {
        id: 'resp_right_lung',
        nameEn: 'Right Lung (3 Lobes)',
        nameAr: 'الرئة اليمنى (3 فصوص)',
        descriptionEn: 'Larger lung with Superior, Middle, and Inferior lobes.',
        descriptionAr: 'الرئة الأكبر تتكون من ثلاثة فصوص: علوي، متوسط، وسفلي.',
        xPercent: 30,
        yPercent: 58
      },
      {
        id: 'resp_left_lung',
        nameEn: 'Left Lung (2 Lobes + Cardiac Notch)',
        nameAr: 'الرئة اليسرى (فصان + ثلمة قلبية)',
        descriptionEn: 'Divided into Superior and Inferior lobes; accommodates the heart apex.',
        descriptionAr: 'فصان علوي وسفلي، وتتميز بالثلمة القلبية لاحتواء قمة القلب.',
        xPercent: 70,
        yPercent: 58
      },
      {
        id: 'resp_diaphragm',
        nameEn: 'Diaphragm Muscle',
        nameAr: 'عضلة الحجاب الحاجز',
        descriptionEn: 'Primary muscle of respiration innervated by Phrenic nerve (C3, C4, C5).',
        descriptionAr: 'العضلة الرئيسية للشهيق يغذيها العصب الحجابي (C3, C4, C5).',
        xPercent: 50,
        yPercent: 82
      }
    ],

    // STEP-BY-STEP TOPICS WITH INDIVIDUAL EXPLANATORY IMAGES (IMAGE MUST TEACH)
    topics: [
      {
        id: 'top_trachea_carina',
        titleEn: '1. The Trachea & Carina (الرغامي وجؤجؤ التفرع)',
        titleAr: 'تشريح الرغامي والجؤجؤ',
        shortExplanationEn: 'The trachea is a 10-12 cm fibrocartilaginous tube extending from the cricoid cartilage (C6) to the carina bifurcation (T4/T5).',
        shortExplanationAr: 'أنبوب غضروفي بطول 10-12 سم يمتد من الغضروف الحلقي (C6) حتى جؤجؤ التفرع عند T4/T5.',
        imageUrl: '/images/anatomy/trachea_cartilages_carina_openstax.jpg',
        imageSource: 'OpenStax Plate 2308 (The Trachea)',
        labels: [
          {
            id: 'lbl_trach_rings',
            nameEn: 'C-shaped Cartilage Rings',
            nameAr: 'حلقات غضروفية على شكل C',
            descriptionEn: '16-20 hyaline cartilage rings keeping lumen patent during pressure changes.',
            descriptionAr: 'تحافظ على لمعة الرغامي مفتوحة دائماً وتمنع انخماصها أثناء الشهيق.',
            xPercent: 50,
            yPercent: 35
          },
          {
            id: 'lbl_carina',
            nameEn: 'Carina (Bifurcation Ridge)',
            nameAr: 'الجؤجؤ (Carina)',
            descriptionEn: 'Internal cartilage keel at tracheal bifurcation. Most sensitive area for triggering cough reflex.',
            descriptionAr: 'نتوء غضروفي حاد عند نقطة التفرع، أشد مناطق الجهاز التنفسي حساسية لتحفيز منعكس السعال.',
            xPercent: 50,
            yPercent: 68
          },
          {
            id: 'lbl_r_bronchus',
            nameEn: 'Right Main Bronchus',
            nameAr: 'القصبة الرئيسية اليمنى',
            descriptionEn: 'Wider, shorter (2.5 cm), and more vertical.',
            descriptionAr: 'أوسع وأقصر وأكثر استقامة شاقولية.',
            xPercent: 34,
            yPercent: 82
          },
          {
            id: 'lbl_l_bronchus',
            nameEn: 'Left Main Bronchus',
            nameAr: 'القصبة الرئيسية اليسرى',
            descriptionEn: 'Narrower, longer (5 cm), and more horizontal due to aortic arch.',
            descriptionAr: 'أضيق وأطول وأكثر ميلاناً أفقياً بسبب مسير قوس الأبهر.',
            xPercent: 66,
            yPercent: 82
          }
        ],
        keyPoints: [
          'The carina sits at the sternal angle of Louis (T4-T5 intervertebral disc).',
          'Trachealis smooth muscle allows slight expansion of the esophagus during swallowing.'
        ]
      },
      {
        id: 'top_bronchial_tree',
        titleEn: '2. The Bronchial Tree & Foreign Body Inhalation',
        titleAr: 'الشجرة القصبية واستقرار الأجسام الأجنبية',
        shortExplanationEn: 'Branching airway network: Primary bronchi divide into Lobar (Secondary) bronchi, then Segmental (Tertiary) bronchi, and bronchioles.',
        shortExplanationAr: 'تتفرع القصبات الرئيسية لقصبات فصية (3 في اليمين و2 في اليسار) ثم قصبات قطعية وقصيبات تنفسية.',
        imageUrl: '/images/anatomy/lungs_bronchial_tree.png',
        imageSource: 'OpenStax Bronchial Tree Anatomy',
        labels: [
          {
            id: 'lbl_bt_right_main',
            nameEn: 'Right Main Bronchus (Vertical Course)',
            nameAr: 'القصبة اليمنى (مسار شاقولي مباشر)',
            descriptionEn: 'Most aspirated foreign objects (peanuts, coins) lodge in the right bronchus.',
            descriptionAr: 'المكان الأكثر شيوعاً لدخول الأجسام الغريبة المستنشقة بسبب اتساعها وشاقوليتها.',
            xPercent: 36,
            yPercent: 36
          },
          {
            id: 'lbl_bt_left_main',
            nameEn: 'Left Main Bronchus',
            nameAr: 'القصبة اليسرى (مسار مائل)',
            descriptionEn: 'Passes inferolaterally beneath the arch of the aorta.',
            descriptionAr: 'تعبر بميلان نحو الأسفل والوحشي تحت قوس الأبهر.',
            xPercent: 64,
            yPercent: 36
          },
          {
            id: 'lbl_bt_lobar',
            nameEn: 'Lobar (Secondary) Bronchi',
            nameAr: 'القصبات الفصية (3 يمين / 2 يسار)',
            descriptionEn: 'Supply individual lung lobes.',
            descriptionAr: 'تغذي فصوص الرئة المستقلة.',
            xPercent: 50,
            yPercent: 64
          }
        ],
        keyPoints: [
          'High-yield clinical fact: Inhaled peanuts/foreign bodies lodge in the Right Middle or Inferior lobar bronchus.',
          'There are 10 bronchopulmonary segments in the right lung and 8-10 in the left lung.'
        ]
      },
      {
        id: 'top_lungs_gross',
        titleEn: '3. Gross Anatomy of the Lungs (Lobes & Fissures)',
        titleAr: 'التشريح العياني للرئتين والفصوص والشقوق',
        shortExplanationEn: 'Detailed anatomical comparison of Right vs Left lungs. Right lung has 3 lobes and 2 fissures; Left lung has 2 lobes, 1 fissure, cardiac notch, and lingula.',
        shortExplanationAr: 'مقارنة تشريحية دقيقة: الرئة اليمنى تحوي 3 فصوص وشقين؛ بينما اليسرى تحوي فصين وشقاً واحداً وثلمة قلبية ولسينة.',
        imageUrl: '/images/anatomy/gross_anatomy_lungs_anterior.jpg',
        imageSource: 'OpenStax Plate 2312 (Gross Anatomy of the Lungs)',
        labels: [
          {
            id: 'lbl_r_sup_lobe',
            nameEn: 'Right Superior Lobe',
            nameAr: 'الفص العلوي الأيمن',
            xPercent: 28,
            yPercent: 28
          },
          {
            id: 'lbl_r_horiz_fiss',
            nameEn: 'Horizontal Fissure (Right Lung Only)',
            nameAr: 'الشق الأفقي (خاص بالرئة اليمنى فقط)',
            descriptionEn: 'Separates superior lobe from middle lobe; follows right 4th rib.',
            descriptionAr: 'يفصل الفص العلوي عن الفص المتوسط ويسير بمستوى الضلع الرابع الأيمن.',
            xPercent: 28,
            yPercent: 44
          },
          {
            id: 'lbl_r_mid_lobe',
            nameEn: 'Right Middle Lobe',
            nameAr: 'الفص المتوسط الأيمن',
            xPercent: 28,
            yPercent: 54
          },
          {
            id: 'lbl_r_oblique_fiss',
            nameEn: 'Oblique Fissure (Right Lung)',
            nameAr: 'الشق المائل للرئة اليمنى',
            descriptionEn: 'Separates middle and superior lobes from inferior lobe.',
            descriptionAr: 'يفصل الفصين العلوي والمتوسط عن الفص السفلي.',
            xPercent: 28,
            yPercent: 68
          },
          {
            id: 'lbl_r_inf_lobe',
            nameEn: 'Right Inferior Lobe',
            nameAr: 'الفص السفلي الأيمن',
            xPercent: 28,
            yPercent: 82
          },
          {
            id: 'lbl_l_sup_lobe',
            nameEn: 'Left Superior Lobe',
            nameAr: 'الفص العلوي الأيسر',
            xPercent: 72,
            yPercent: 32
          },
          {
            id: 'lbl_l_cardiac_notch',
            nameEn: 'Cardiac Notch (Left Lung)',
            nameAr: 'الثلمة القلبية (الرئة اليسرى)',
            descriptionEn: 'Deep concavity on anterior margin accommodating the apex of the heart.',
            descriptionAr: 'تقعر مميز على الحافة الأمامية للرئة اليسرى يفسح المجال لقمة القلب.',
            xPercent: 62,
            yPercent: 56
          },
          {
            id: 'lbl_l_lingula',
            nameEn: 'Lingula of Left Lung',
            nameAr: 'لسينة الرئة اليسرى',
            descriptionEn: 'Tongue-like projection of the left superior lobe below cardiac notch (homologue of right middle lobe).',
            descriptionAr: 'بروز لساني الشكل في أسفل الفص العلوي الأيسر، وهو النظير التشريحي للفص المتوسط الأيمن.',
            xPercent: 64,
            yPercent: 68
          },
          {
            id: 'lbl_l_inf_lobe',
            nameEn: 'Left Inferior Lobe',
            nameAr: 'الفص السفلي الأيسر',
            xPercent: 72,
            yPercent: 82
          }
        ],
        keyPoints: [
          'Right lung is shorter and wider because the liver pushes up from beneath the right hemidiaphragm.',
          'Left lung is narrower and longer because of the heart apex tilt to the left.'
        ]
      }
    ],

    // DETAILED LABELED IMAGE: Gross Anatomy of Both Lungs
    importantStructuresImage: {
      titleEn: 'Gross Anatomical Structures of Lungs & Lobes',
      titleAr: 'المعالم التشريحية الدقيقة لفصوص وشقوق الرئتين',
      imageUrl: '/images/anatomy/gross_anatomy_lungs_anterior.jpg',
      imageSource: 'OpenStax Plate 2312 / Gross Anatomy of Lungs',
      imageCredit: 'OpenStax / Rice University (CC BY 4.0)',
      labels: [
        {
          id: 'str_r_horiz',
          nameEn: 'Horizontal Fissure',
          nameAr: 'الشق الأفقي الأيمن',
          descriptionEn: 'Present ONLY on the right lung. Runs along the 4th costal cartilage to meet the oblique fissure.',
          descriptionAr: 'موجود في الرئة اليمنى فقط! يفصل الفص العلوي عن المتوسط بمحاذاة الضلع الرابع.',
          xPercent: 26,
          yPercent: 44
        },
        {
          id: 'str_r_mid',
          nameEn: 'Middle Lobe of Right Lung',
          nameAr: 'الفص المتوسط للرئة اليمنى',
          descriptionEn: 'Wedge-shaped lobe between horizontal and oblique fissures.',
          descriptionAr: 'فص إسفيني مميز يقع بين الشقين الأفقي والمائل.',
          xPercent: 26,
          yPercent: 54
        },
        {
          id: 'str_l_cardiac_notch',
          nameEn: 'Cardiac Notch',
          nameAr: 'الثلمة القلبية',
          descriptionEn: 'Indentation in the anterior border of the left superior lobe formed by the heart.',
          descriptionAr: 'ثلمة غائرة في الحافة الأمامية للرئة اليسرى شكلتها ضخامة البطين الأيسر للقلب.',
          xPercent: 60,
          yPercent: 56
        },
        {
          id: 'str_l_lingula',
          nameEn: 'Lingula of Left Lung',
          nameAr: 'لسينة الرئة اليسرى',
          descriptionEn: 'Tongue-like process homologous to the middle lobe of the right lung.',
          descriptionAr: 'امتداد يشبه اللسان الصغير يقع تحت الثلمة القلبية مباشرة.',
          xPercent: 62,
          yPercent: 68
        },
        {
          id: 'str_trachea_bif',
          nameEn: 'Tracheal Bifurcation',
          nameAr: 'تفرع الرغامي عند الجؤجؤ',
          descriptionEn: 'Occurs at sternal angle dividing into right and left main bronchi.',
          descriptionAr: 'يحدث عند زاوية القص حيث تتفرع الرغامي إلى القصبتين الرئيسيتين.',
          xPercent: 50,
          yPercent: 24
        }
      ]
    },

    video: {
      titleEn: 'Lungs & Tracheobronchial Tree Anatomy',
      titleAr: 'تشريح الرئتين والشجرة القصبية والفروق بين الرئتين',
      youtubeId: 'b_7i0E4wH0I',
      duration: '05:40'
    },
    practiceQuestion: {
      question: 'Which anatomical feature is found exclusively on the right lung and not on the left lung?',
      options: ['Oblique fissure', 'Horizontal fissure', 'Cardiac notch', 'Inferior lobe'],
      correctIndex: 1,
      explanation: 'The Horizontal fissure is unique to the right lung, separating its superior and middle lobes.'
    }
  },

  // 10. ORGAN SYSTEMS: Digestive System
  {
    id: 'lesson_digestive',
    titleEn: 'The Digestive System & Gastrointestinal Tract',
    titleAr: 'الجهاز الهضمي والسبيل المعدي المعوي',
    category: 'organ_systems',
    categoryLabelEn: 'Organ Systems',
    categoryLabelAr: 'أجهزة الأعضاء',
    descriptionEn: 'Anatomy of the stomach, small intestine (duodenum, jejunum, ileum), large intestine, liver, and pancreas.',
    descriptionAr: 'تشريح المعدة، الأمعاء الدقيقة (العفج، الصائم، الدقاق)، الأمعاء الغليظة، الكبد والبنكرياس.',
    keyPoints: [
      'Stomach: Cardia, Fundus, Body, Pyloric antrum and canal; guarded by lower esophageal and pyloric sphincters.',
      'Small Intestine: Duodenum (C-shaped, retroperitoneal), Jejunum (thick vascular wall), Ileum (contains Peyer patches).',
      'Appendix: Arises from posteromedial aspect of cecum; base located at McBurney point.'
    ],
    keyPointsAr: [
      'المعدة: الفؤاد، القاع، الجسم، الغار، والقناة البوابية المحروسة بالمصرة البوابية.',
      'الأمعاء الدقيقة: الاثني عشر (العفج على شكل حرف C)، الصائم (جدار سميك وتروية غزيرة)، والدقاق (يحتوي لويحات باير).',
      'الزائدة الدودية: تنشأ من الوجه الإنسي الخلفي للأعور؛ قاعدتها تقع سريرياً عند نقطة ماكبيرني (McBurney point).'
    ],
    imageUrl: '/images/anatomy/stomach_duodenum_anatomy.png',
    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax College',
    mainImageUrl: '/images/anatomy/stomach_duodenum_anatomy.png',
    mainImageSource: 'OpenStax Anatomy (Stomach & Duodenum)',
    mainImageCredit: 'OpenStax College',
    mainImageCaptionEn: 'Gross anatomy of the stomach, pyloric sphincter, and C-shaped duodenum.',
    mainImageCaptionAr: 'التشريح العياني للمعدة، المصرة البوابية، والاثني عشر (العفج).',
    mainImageLabels: [
      {
        id: 'st_fundus',
        nameEn: 'Fundus of Stomach',
        nameAr: 'قاع المعدة',
        descriptionEn: 'Dome-shaped upper portion filled with swallowed gas.',
        descriptionAr: 'الجزء المقبب العلوي الذي يتجمع فيه غاز المعدة.',
        xPercent: 62,
        yPercent: 18
      },
      {
        id: 'st_body',
        nameEn: 'Body of Stomach',
        nameAr: 'جسم المعدة',
        descriptionEn: 'Largest central region with gastric rugae folds.',
        descriptionAr: 'الجزء الأكبر في المنتصف المبطن بطيات الغشاء المخاطي.',
        xPercent: 52,
        yPercent: 44
      },
      {
        id: 'st_pylorus',
        nameEn: 'Pyloric Sphincter',
        nameAr: 'المصرة البوابية',
        descriptionEn: 'Thick muscular ring controlling stomach emptying into duodenum.',
        descriptionAr: 'حلقة عضلية سميكة تنظم إفراغ محتويات المعدة إلى الاثني عشر.',
        xPercent: 32,
        yPercent: 65
      },
      {
        id: 'st_duodenum',
        nameEn: 'Duodenum (C-Loop)',
        nameAr: 'الاثني عشر (العفج)',
        descriptionEn: 'First part of small intestine receiving bile and pancreatic juices.',
        descriptionAr: 'الجزء الأول من الأمعاء الدقيقة الذي يستقبل الصفراء وعصارة البنكرياس.',
        xPercent: 22,
        yPercent: 82
      }
    ],
    topics: [
      {
        id: 'top_stomach',
        titleEn: '1. Stomach Anatomy & Sphincters',
        titleAr: 'تشريح المعدة والمصرات',
        shortExplanationEn: 'J-shaped muscular pouch with 3 muscle layers (longitudinal, circular, oblique) providing mechanical digestion.',
        shortExplanationAr: 'كيس عضلي بشكل حرف J بثلاث طبقات عضلية توفر طحناً وهضماً ميكانيكياً وكيميائياً.',
        imageUrl: '/images/anatomy/stomach_duodenum_anatomy.png',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_st_fund',
            nameEn: 'Fundus',
            nameAr: 'قاع المعدة',
            xPercent: 62,
            yPercent: 18
          },
          {
            id: 'lbl_st_pyl',
            nameEn: 'Pyloric Canal',
            nameAr: 'القناة البوابية',
            xPercent: 32,
            yPercent: 65
          }
        ],
        keyPoints: [
          'Guarded by Lower Esophageal Sphincter (LES) proximally and Pyloric Sphincter distally.',
          'Parietal cells secrete HCl and intrinsic factor (essential for Vitamin B12 absorption).'
        ]
      },
      {
        id: 'top_small_intestine',
        titleEn: '2. Small Intestine & McBurney Point',
        titleAr: 'الأمعاء الدقيقة ونقطة ماكبيرني للزائدة',
        shortExplanationEn: 'Duodenum (25 cm), Jejunum (2.5 m), and Ileum (3.5 m). Appendix arises from cecum at McBurney point.',
        shortExplanationAr: 'العفج (25 سم)، الصائم (2.5 م)، والدقاق (3.5 م). تنشأ الزائدة من الأعور عند نقطة ماكبيرني.',
        imageUrl: '/images/anatomy/stomach_duodenum_anatomy.png',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_duod2',
            nameEn: 'Duodenum',
            nameAr: 'الاثني عشر',
            xPercent: 22,
            yPercent: 82
          }
        ],
        keyPoints: [
          'Major duodenal papilla receives common bile duct and main pancreatic duct (Ampulla of Vater).',
          'McBurney point: 1/3 distance from right ASIS to umbilicus (maximal tenderness in acute appendicitis).'
        ]
      }
    ],
    video: {
      titleEn: 'Gastrointestinal Anatomy: Stomach, Intestines & Liver',
      titleAr: 'تشريح الجهاز الهضمي: المعدة والأمعاء والكبد',
      youtubeId: '2k8B87G_n4Y',
      duration: '06:20'
    },
    practiceQuestion: {
      question: 'Where is the base of the appendix localized on the anterior abdominal wall?',
      options: ['Murphy point', 'McBurney point', 'Costovertebral angle', 'Umbilicus'],
      correctIndex: 1,
      explanation: 'McBurney point (one-third distance from right ASIS to umbilicus) marks the base of the appendix.'
    }
  },

  // 11. ORGAN SYSTEMS: Urinary System
  {
    id: 'lesson_urinary',
    titleEn: 'The Urinary System & Renal Anatomy',
    titleAr: 'الجهاز البولي وتشريح الكليتين',
    category: 'organ_systems',
    categoryLabelEn: 'Organ Systems',
    categoryLabelAr: 'أجهزة الأعضاء',
    descriptionEn: 'Kidneys, renal hilum arrangements, nephrons, ureters, and urinary bladder.',
    descriptionAr: 'الكليتان، ترتيب تراكيب سرة الكلية، الحالبان، والمثانة البولية.',
    keyPoints: [
      'Kidneys are retroperitoneal organs lying between T12 and L3; right kidney sits slightly lower due to the liver.',
      'Renal Hilum Arrangement (from anterior to posterior): Renal Vein -> Renal Artery -> Renal Pelvis (V-A-P).',
      'Ureter has 3 anatomical constrictions where kidney stones easily lodge: PUJ, pelvic brim crossing, and VUJ.'
    ],
    keyPointsAr: [
      'الكليتان عضوان خلف البريتوان بين الفقرتين T12 وL3؛ الكلية اليمنى أخفض قليلاً لوجود الكبد فوقها.',
      'ترتيب سرة الكلية من الأمام للخلف (قاعدة V-A-P): الوريد الكلوي أولاً، ثم الشريان الكلوي، ثم حويضة الكلية خلفاً.',
      'للحالب 3 تضيقات تشريحية تنحشر عندها حصيات الكلية: الموصل الحويضي الحالبي، عبور حافة الحوض، والموصل الحالبي المثاني.'
    ],
    imageUrl: '/images/anatomy/kidney_coronal_section.png',
    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax College',
    mainImageUrl: '/images/anatomy/kidney_coronal_section.png',
    mainImageSource: 'OpenStax Anatomy (Coronal Section of Kidney)',
    mainImageCredit: 'OpenStax College',
    mainImageCaptionEn: 'Coronal section of the kidney: Cortex, Medullary Pyramids, Renal Columns, and Hilum.',
    mainImageCaptionAr: 'مقطع إكليلي في الكلية: القشرة الكلوية، الأهرام اللبية، الأعمدة، وسرة الكلية.',
    mainImageLabels: [
      {
        id: 'kd_cortex',
        nameEn: 'Renal Cortex',
        nameAr: 'القشرة الكلوية',
        descriptionEn: 'Outer granular layer containing glomeruli and convoluted tubules.',
        descriptionAr: 'الطبقة الحبيبية الخارجية التي تحوي الكبيبات الكلوية والأنابيب الملتوية.',
        xPercent: 22,
        yPercent: 32
      },
      {
        id: 'kd_pyramids',
        nameEn: 'Renal Medullary Pyramids',
        nameAr: 'الأهرام اللبية الكلوية',
        descriptionEn: 'Triangular tissue masses containing loops of Henle and collecting ducts.',
        descriptionAr: 'كتل نسيجية مثلثة تحوي عُرى هانلي والأنابيب الجامعة لتكثيف البول.',
        xPercent: 38,
        yPercent: 52
      },
      {
        id: 'kd_pelvis',
        nameEn: 'Renal Pelvis & Ureter',
        nameAr: 'حويضة الكلية والحالب',
        descriptionEn: 'Funnel-shaped basin collecting urine from major calyces.',
        descriptionAr: 'الحوض القمعي الذي يجمع البول من الكؤوس الكلوية الكبرى ليصبه في الحالب.',
        xPercent: 68,
        yPercent: 55
      }
    ],
    topics: [
      {
        id: 'top_kidney_hilum',
        titleEn: '1. Renal Hilum & Anterior-to-Posterior Rule',
        titleAr: 'سرة الكلية وقاعدة V-A-P',
        shortExplanationEn: 'At the medial margin hilum, structures enter/exit in a constant order: Vein anteriorly, Artery in middle, Pelvis posteriorly.',
        shortExplanationAr: 'تدخل وتخرج التراكيب عبر سرة الكلية بترتيب ثابت لا يتغير: الوريد أولاً، ثم الشريان، ثم الحويضة خلفاً.',
        imageUrl: '/images/anatomy/kidney_coronal_section.png',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_hilum_pelvis',
            nameEn: 'Renal Pelvis (Posterior)',
            nameAr: 'حويضة الكلية (خلفاً)',
            xPercent: 68,
            yPercent: 55
          }
        ],
        keyPoints: [
          'V-A-P mnemonic: Vein (anterior), Artery (intermediate), Pelvis (posterior).',
          'Right renal vein is short; Left renal vein is longer and crossed by SMA (Nutcracker syndrome).'
        ]
      },
      {
        id: 'top_ureter',
        titleEn: '2. The Ureter & 3 Narrowing Sites',
        titleAr: 'الحالب ومواقع التضيق الثلاثة لحصيات الكلى',
        shortExplanationEn: 'Muscular tubes (25 cm) that convey urine from kidneys to bladder. Exhibit 3 natural anatomical constrictions.',
        shortExplanationAr: 'أنبوبان عضليان بطول 25 سم ينقلان البول بالتمعج نحو المثانة، ويمتلكان 3 تضيقات تشريحية هامة سريرياً.',
        imageUrl: '/images/anatomy/kidney_coronal_section.png',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_puj',
            nameEn: 'Pelviureteric Junction (PUJ)',
            nameAr: 'الموصل الحويضي الحالبي (PUJ)',
            xPercent: 72,
            yPercent: 68
          }
        ],
        keyPoints: [
          '1st constriction: Pelviureteric Junction (PUJ) where renal pelvis joins ureter.',
          '2nd constriction: Where ureter crosses pelvic brim over iliac vessels.',
          '3rd constriction: Vesicoureteric Junction (VUJ) piercing bladder wall obliquely.'
        ]
      }
    ],
    video: {
      titleEn: 'Kidney Anatomy, Renal Hilum & Ureter Constrictions',
      titleAr: 'تشريح الكلية وسرة الكلية وتضيقات الحالب الثلاثة',
      youtubeId: 'q8M7j7qN0W0',
      duration: '05:40'
    },
    practiceQuestion: {
      question: 'From anterior to posterior, what is the anatomical arrangement of structures in the Renal Hilum?',
      options: ['Artery -> Vein -> Pelvis', 'Pelvis -> Artery -> Vein', 'Vein -> Artery -> Pelvis (V-A-P)', 'Artery -> Pelvis -> Vein'],
      correctIndex: 2,
      explanation: 'From anterior to posterior, the renal hilum contains: Renal Vein, Renal Artery, and Renal Pelvis/Ureter (V-A-P rule).'
    }
  },

  // 12. ORGAN SYSTEMS: Reproductive System
  {
    id: 'lesson_reproductive',
    titleEn: 'The Reproductive System (Genital Anatomy)',
    titleAr: 'الجهاز التناسلي وتشريح الحوض',
    category: 'organ_systems',
    categoryLabelEn: 'Organ Systems',
    categoryLabelAr: 'أجهزة الأعضاء',
    descriptionEn: 'Essential first-year male and female reproductive pelvic structures.',
    descriptionAr: 'التراكيب الأساسية لأعضاء التناسل والحوض للذكور والإناث لطلاب السنة الأولى.',
    keyPoints: [
      'Female Reproductive System: Ovaries, Fallopian (uterine) tubes, Uterus, and Vagina. Normal uterine position is Anteverted & Anteflexed.',
      'Fertilization typically occurs in the Ampulla of the fallopian tube.',
      'Male Reproductive System: Testes (in scrotum), Epididymis, Vas deferens, Seminal vesicles, and Prostate gland.'
    ],
    keyPointsAr: [
      'الجهاز التناسلي الأنثوي: المبيضان، قناتا فالوب، الرحم، والمهبل. الوضعية التشريحية الطبيعية للرحم هي مائل ومنعطف للأمام (Anteverted & Anteflexed).',
      'يحدث الإخصاب الطبيعي للبويضة في مجل قناة فالوب (Ampulla).',
      'الجهاز التناسلي الذكري: الخصيتان، البربخ، الأسهر، الحويصلتان المنويتان، وغدة البروستات.'
    ],
    imageUrl: '/images/anatomy/female_pelvis_anatomy.png',
    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax / Rice University',
    mainImageUrl: '/images/anatomy/female_pelvis_anatomy.png',
    mainImageSource: 'OpenStax Anatomy (Female Pelvic Anatomy)',
    mainImageCredit: 'OpenStax / Rice University',
    mainImageCaptionEn: 'Female reproductive organs: Uterus, Ovaries, Fallopian Tubes, and Cervix.',
    mainImageCaptionAr: 'الأعضاء التناسلية الأنثوية: الرحم، المبيضان، قناتا فالوب، وعنق الرحم.',
    mainImageLabels: [
      {
        id: 'rep_uterus',
        nameEn: 'Uterus',
        nameAr: 'الرحم',
        descriptionEn: 'Thick muscular organ normally anteverted and anteflexed over the urinary bladder.',
        descriptionAr: 'عضو عضلي سميك مائل ومنعطف للأمام فوق المثانة البولية.',
        xPercent: 50,
        yPercent: 44
      },
      {
        id: 'rep_fallopian',
        nameEn: 'Fallopian Tube (Ampulla)',
        nameAr: 'قناة فالوب (المجل)',
        descriptionEn: 'Site of ovum fertilization by sperm.',
        descriptionAr: 'موقع حدوث الإخصاب الطبيعي للبويضة.',
        xPercent: 68,
        yPercent: 32
      },
      {
        id: 'rep_ovary',
        nameEn: 'Ovary',
        nameAr: 'المبيض',
        descriptionEn: 'Female gonad producing oocytes and estrogen/progesterone.',
        descriptionAr: 'الغدة التناسلية الأنثوية المسؤولة عن إنتاج البويضات والهرمونات.',
        xPercent: 78,
        yPercent: 46
      }
    ],
    topics: [
      {
        id: 'top_female_organs',
        titleEn: '1. Female Pelvis & Uterine Position',
        titleAr: 'الحوض الأنثوي ووضعية الرحم',
        shortExplanationEn: 'Uterus lies in true pelvis between bladder and rectum. Standard position is Anteverted (90 deg to vagina) and Anteflexed (170 deg to cervix).',
        shortExplanationAr: 'يقع الرحم في الحوض الحقيقي، ووضعيته الطبيعية مائل للأمام بزاوية 90 مع المهبل ومنعطف للأمام بزاوية 170 مع عنقه.',
        imageUrl: '/images/anatomy/female_pelvis_anatomy.png',
        imageSource: 'OpenStax',
        labels: [
          {
            id: 'lbl_ut_pos',
            nameEn: 'Uterus (Anteverted)',
            nameAr: 'الرحم (المائل للأمام)',
            xPercent: 50,
            yPercent: 44
          }
        ],
        keyPoints: [
          'Uterine tubes: Fimbriae -> Infundibulum -> Ampulla (fertilization site) -> Isthmus.',
          'Pouch of Douglas (Rectouterine pouch) is the lowest peritoneal space in female pelvis.'
        ]
      }
    ],
    video: {
      titleEn: 'Pelvic Anatomy: Male & Female Reproductive Systems',
      titleAr: 'تشريح الحوض والأجهزة التناسلية الذكرية والأنثوية',
      youtubeId: 'F2o_jH1bF9c',
      duration: '06:30'
    },
    practiceQuestion: {
      question: 'In which anatomical part of the uterine tube does normal human fertilization take place?',
      options: ['Isthmus', 'Infundibulum', 'Ampulla', 'Fimbriae'],
      correctIndex: 2,
      explanation: 'Fertilization of the ovum by sperm normally occurs in the ampulla of the fallopian tube.'
    }
  }
];

// =========================================================================
// 3. ANATOMY IMAGES ATLAS (CATEGORIES: Bones, Joints, Muscles, Organs, etc.)
// =========================================================================
export const ANATOMY_IMAGE_ATLAS: AnatomyImageAtlasItem[] = [
  {
    id: 'atlas_bones_femur',
    titleEn: 'Femur Bone Complete Osteology',
    titleAr: 'عظم الفخذ — المعالم العظمية واللقمتان',
    category: 'Bones',
    imageUrl: '/images/anatomy/femur_anterior_osteology.png',    source: 'OpenStax Anatomy & Physiology',
    license: 'CC BY 4.0',
    credit: 'OpenStax College & NIH Medical Archive',
    description: 'Detailed anatomical specimen of the human femur showing the femoral head, anatomical neck, greater and lesser trochanters, and distal condyles.',
    keyStructures: ['Femoral head', 'Greater trochanter', 'Lesser trochanter', 'Medial & Lateral condyles']
  },
  {
    id: 'atlas_bones_humerus',
    titleEn: 'Humerus Bone & Surgical Neck',
    titleAr: 'عظم العضد والعنق الجراحي',
    category: 'Bones',
    imageUrl: '/images/anatomy/humerus_anterior_osteology.png',    source: 'OpenStax Anatomy & Physiology',
    license: 'CC BY 4.0',
    credit: 'OpenStax / Rice University',
    description: 'The long bone of the upper arm showing the head, anatomical neck, surgical neck, and the distal trochlea and capitulum.',
    keyStructures: ['Head of humerus', 'Surgical neck', 'Deltoid tuberosity', 'Trochlea & Capitulum']
  },
  {
    id: 'atlas_bones_skull',
    titleEn: 'Human Skull Anterior & Lateral Views',
    titleAr: 'الجمجمة البشرية — القحف وعظام الوجه',
    category: 'Bones',
    imageUrl: '/images/anatomy/skull_anterior_osteology.png',    source: 'OpenStax Anatomy & Physiology',
    license: 'CC BY 4.0',
    credit: 'OpenStax College',
    description: 'Anterior and lateral cranial osteology demonstrating coronal and sagittal sutures, orbits, zygomatic arches, and mandible.',
    keyStructures: ['Frontal bone', 'Parietal bone', 'Coronal suture', 'Zygomatic arch', 'Mandible']
  },
  {
    id: 'atlas_joints_knee',
    titleEn: 'Knee Joint Synovial Capsule & Cruciate Ligaments',
    titleAr: 'مفصل الركبة والأربطة المتصالبة والهلالات',
    category: 'Joints',
    imageUrl: '/images/anatomy/knee_joint_interior_ligaments.png',    source: 'Visible Human Project & OpenStax',
    license: 'CC BY 4.0',
    credit: 'NLM Visible Human Project & OpenStax',
    description: 'Anterior dissection of the flexed knee joint displaying Anterior Cruciate Ligament (ACL), PCL, and medial and lateral menisci.',
    keyStructures: ['Anterior cruciate ligament (ACL)', 'Posterior cruciate ligament (PCL)', 'Medial meniscus', 'Patellar ligament']
  },
  {
    id: 'atlas_muscles_biceps',
    titleEn: 'Biceps Brachii Anterior Arm Dissection',
    titleAr: 'تشريح عضلة البايسبس والذراع الأمامي',
    category: 'Muscles',
    imageUrl: '/images/anatomy/biceps_brachii_anterior_arm.png',    source: 'OpenStax Anatomy & Physiology',
    license: 'CC BY 4.0',
    credit: 'OpenStax College & NIH Medical Archives',
    description: 'Clean dissection of the anterior arm showing both long and short heads of Biceps Brachii and their common insertion into the radial tuberosity.',
    keyStructures: ['Long head of Biceps', 'Short head of Biceps', 'Radial tuberosity insertion', 'Bicipital aponeurosis']
  },
  {
    id: 'atlas_muscles_deltoid',
    titleEn: 'Deltoid Muscle & Shoulder Girdle',
    titleAr: 'العضلة الدالية وتضاريس الكتف',
    category: 'Muscles',
    imageUrl: '/images/anatomy/deltoid_shoulder_trapezius.png',    source: 'Gray Anatomy Classic Collection',
    license: 'Public Domain',
    credit: 'Henry Gray Anatomy of Human Body',
    description: 'Muscular contour of the shoulder demonstrating the three functional components of the deltoid and insertion into the humerus.',
    keyStructures: ['Clavicular fibers', 'Acromial middle fibers', 'Spinal posterior fibers', 'Deltoid tuberosity']
  },
  {
    id: 'atlas_organs_heart',
    titleEn: 'Heart Internal Anatomy & Valves Section',
    titleAr: 'تشريح القلب الداخلي والصمامات الأربعة',
    category: 'Cardiovascular',
    imageUrl: '/images/anatomy/heart_anterior_anatomy.png',    source: 'OpenStax Anatomy & Physiology',
    license: 'CC BY 4.0',
    credit: 'OpenStax / Rice University',
    description: 'Coronal section of the human heart revealing right and left atria and ventricles, tricuspid, mitral, and aortic valves, and papillary muscles.',
    keyStructures: ['Right atrium', 'Left ventricle myocardium', 'Tricuspid valve', 'Mitral valve', 'Aorta']
  },
  {
    id: 'atlas_organs_brain',
    titleEn: 'Brain Midsagittal Section & Brainstem',
    titleAr: 'المقطع السهمي للدماغ وجذع المخ',
    category: 'Nervous System',
    imageUrl: '/images/anatomy/brain_midsagittal_section.png',    source: 'Visible Human Project & OpenStax',
    license: 'Public Domain / CC BY',
    credit: 'NLM Visible Human Project',
    description: 'Midline section through the human brain demonstrating the cerebrum, corpus callosum, thalamus, midbrain, pons, medulla, and cerebellum.',
    keyStructures: ['Corpus callosum', 'Thalamus', 'Pons', 'Medulla oblongata', 'Cerebellum']
  },
  {
    id: 'atlas_organs_lungs',
    titleEn: 'Gross Anatomy of Lungs & Lobes (Primary View)',
    titleAr: 'التشريح العياني للرئتين والفصوص والشقوق (منظر أساسي)',
    category: 'Respiratory',
    imageUrl: '/images/anatomy/gross_anatomy_lungs_anterior.jpg',
    source: 'OpenStax Anatomy & Physiology (Plate 2312)',
    license: 'CC BY 4.0',
    credit: 'OpenStax / Rice University',
    description: 'Complete anterior anatomical plate demonstrating the trachea, right lung with 3 lobes and 2 fissures, and left lung with 2 lobes, cardiac notch, and lingula.',
    keyStructures: ['Right superior lobe', 'Horizontal fissure', 'Right middle lobe', 'Oblique fissures', 'Right inferior lobe', 'Left superior lobe', 'Cardiac notch', 'Lingula', 'Left inferior lobe', 'Trachea', 'Carina']
  },
  {
    id: 'atlas_organs_bronchial_tree',
    titleEn: 'Tracheobronchial Tree & Arborization (Secondary Educational View)',
    titleAr: 'الشجرة الرغامية القصبية وتفرعاتها (منظر تعليمي ثانوي)',
    category: 'Respiratory',
    imageUrl: '/images/anatomy/lungs_bronchial_tree.png',
    source: "Gray's Anatomy Plate 961 / Wikimedia Commons",
    license: 'Public Domain',
    credit: 'Henry Gray (1918) / OpenStax',
    description: 'Trachea bifurcating at the carina into right and left primary bronchi, and lobar and segmental bronchial arborization.',
    keyStructures: ['Trachea', 'Carina', 'Right bronchus (shorter & wider)', 'Left bronchus', 'Segmental bronchi']
  },
  {
    id: 'atlas_organs_kidney',
    titleEn: 'Kidney Coronal Section & Renal Hilum',
    titleAr: 'مقطع الكلية وسرة الكلية والأهرامات الكلوية',
    category: 'Urinary',
    imageUrl: '/images/anatomy/kidney_coronal_section.png',    source: 'OpenStax Anatomy & Physiology',
    license: 'CC BY 4.0',
    credit: 'OpenStax College',
    description: 'Coronal cross-section of the human kidney highlighting the renal cortex, renal medullary pyramids, minor/major calyces, and renal pelvis.',
    keyStructures: ['Renal cortex', 'Renal medullary pyramids', 'Renal pelvis', 'Ureter', 'Renal artery and vein']
  }
];

// =========================================================================
// 4. ANATOMY PRACTICAL TEST QUESTIONS (WITH STRICT 1:1 REAL IMAGE MATCHING)
// =========================================================================
export const ANATOMY_PRACTICAL_TEST_QUESTIONS: AnatomyPracticalTestQuestion[] = [
  // ==================== 1. OSTEOLOGY & JOINTS (BONES & JOINTS) ====================
  {
    id: 'test_q1_femur_trochanter',
    question: 'Identify the structure / bone landmark indicated by the arrow on the proximal femur:',
    questionAr: 'ما اسم التركيب أو المعلم العظمي المشار إليه بالسهم في أعلى عظم الفخذ؟',
    structureTarget: 'Greater Trochanter of Femur',
    structureTargetAr: 'المدور الكبير لعظم الفخذ',
    imageUrl: '/images/anatomy/femur_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 24,
    pointerY: 14,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Greater Trochanter of Femur',
    acceptableAnswers: [
      'Greater Trochanter',
      'Greater Trochanter of Femur',
      'Trochanter Major',
      'المدور الكبير',
      'المدور الكبير لعظم الفخذ',
      'مدور كبير',
      'مدور كبير للفخذ'
    ],
    explanation: 'The arrow indicates the Greater Trochanter of the Femur. It is the large, blunt, quadrangular projection on the lateral aspect of the proximal femur that provides insertion for gluteus medius, gluteus minimus, and piriformis.',
    explanationAr: 'يشير السهم إلى المدور الكبير لعظم الفخذ (Greater Trochanter)، وهو بارزة عظمية مربعة على الوجه الوحشي لأعلى الفخذ يرتكز عليها العضلتان الإليتان الوسطى والصغرى والعضلة الكمثرية.',
    clinicalPearl: 'Trochanteric bursitis causes lateral hip pain aggravated when lying on the affected side.',
    topic: 'Osteology — Lower Limb'
  },
  {
    id: 'test_q2_femur_head',
    question: 'Identify the articular surface / bone structure indicated by the arrow on the proximal femur:',
    questionAr: 'ما اسم التركيب أو السطح المفصلي المشار إليه بالسهم في أعلى عظم الفخذ؟',
    structureTarget: 'Head of Femur',
    structureTargetAr: 'رأس عظم الفخذ',
    imageUrl: '/images/anatomy/femur_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 66,
    pointerY: 11,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Head of Femur',
    acceptableAnswers: [
      'Head of Femur',
      'Femoral Head',
      'Caput Femoris',
      'Head of the femur',
      'رأس الفخذ',
      'رأس عظم الفخذ',
      'الرأس الفخذي'
    ],
    explanation: 'The arrow points to the Head of the Femur, forming two-thirds of a sphere that articulates with the acetabulum to form the ball-and-socket hip joint.',
    explanationAr: 'يشير السهم إلى رأس عظم الفخذ (Head of Femur) الذي يتمفصل مع حق الحوض ليشكل مفصل الورك الكروي الحقي.',
    clinicalPearl: 'Disruption of the medial circumflex femoral artery during femoral neck fracture leads to avascular necrosis (AVN) of the femoral head.',
    topic: 'Osteology — Lower Limb'
  },
  {
    id: 'test_q3_humerus_greater_tubercle',
    question: 'Identify the lateral bony projection indicated by the arrow on the proximal humerus:',
    questionAr: 'ما اسم البارزة العظمية المشار إليها بالسهم في أعلى عظم العضد؟',
    structureTarget: 'Greater Tubercle of Humerus',
    structureTargetAr: 'الحديبة الكبيرة لعظم العضد',
    imageUrl: '/images/anatomy/humerus_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 34,
    pointerY: 13,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Greater Tubercle of Humerus',
    acceptableAnswers: [
      'Greater Tubercle',
      'Greater Tubercle of Humerus',
      'Tuberculum Majus',
      'الحديبة الكبيرة',
      'الحديبة الكبيرة لعظم العضد',
      'حديبة كبيرة'
    ],
    explanation: 'The arrow indicates the Greater Tubercle of the Humerus, which receives the insertions of three rotator cuff muscles: supraspinatus, infraspinatus, and teres minor.',
    explanationAr: 'يشير السهم إلى الحديبة الكبيرة لعظم العضد (Greater Tubercle)، وتستقبل مرتكزات ثلاث عضلات من الكفة المدورة: فوق الشوك، تحت الشوك، والمدورة الصغيرة.',
    clinicalPearl: 'Avulsion fracture of the greater tubercle can occur with anterior shoulder dislocation.',
    topic: 'Osteology — Upper Limb'
  },
  {
    id: 'test_q4_humerus_surgical_neck',
    question: 'Identify the clinically vulnerable constriction indicated by the arrow on the humerus:',
    questionAr: 'ما اسم التضيق العظمي المشار إليه بالسهم في عظم العضد المعرض للكسور الجراحية؟',
    structureTarget: 'Surgical Neck of Humerus',
    structureTargetAr: 'العنق الجراحي لعظم العضد',
    imageUrl: '/images/anatomy/humerus_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 52,
    pointerY: 22,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Surgical Neck of Humerus',
    acceptableAnswers: [
      'Surgical Neck',
      'Surgical Neck of Humerus',
      'Collum Chirurgicum',
      'العنق الجراحي',
      'العنق الجراحي لعظم العضد',
      'عنق جراحي'
    ],
    explanation: 'The arrow points to the Surgical Neck of the Humerus. It is closely encircled by the Axillary Nerve and posterior circumflex humeral artery.',
    explanationAr: 'يشير السهم إلى العنق الجراحي لعظم العضد (Surgical Neck)، وهو منطقة شائعة للكسور ويلتف حولها العصب الإبطي.',
    clinicalPearl: 'Fractures of the surgical neck risk damaging the Axillary Nerve, leading to deltoid paralysis and sensory loss over the lateral shoulder.',
    topic: 'Osteology — Upper Limb'
  },
  {
    id: 'test_q5_humerus_medial_epicondyle',
    question: 'Identify the prominent medial projection indicated by the arrow on the distal humerus:',
    questionAr: 'ما اسم البارزة الإنسية المشار إليها بالسهم في أسفل عظم العضد؟',
    structureTarget: 'Medial Epicondyle of Humerus',
    structureTargetAr: 'اللقيمة الإنسية لعظم العضد',
    imageUrl: '/images/anatomy/humerus_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 74,
    pointerY: 88,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Medial Epicondyle of Humerus',
    acceptableAnswers: [
      'Medial Epicondyle',
      'Medial Epicondyle of Humerus',
      'Epicondylus Medialis',
      'اللقيمة الإنسية',
      'اللقيمة الإنسية لعظم العضد',
      'لقيمة إنسية'
    ],
    explanation: 'The arrow indicates the Medial Epicondyle of the Humerus. It serves as the common origin for the superficial flexor muscles of the forearm. The ulnar nerve passes directly behind it.',
    explanationAr: 'يشير السهم إلى اللقيمة الإنسية لعظم العضد (Medial Epicondyle)، وهي منشأ العضلات القابضة للساعد ويمر العصب الزندي في ثلمها الخلفي.',
    clinicalPearl: 'Golfer elbow (medial epicondylitis) causes localized tenderness at this common flexor origin.',
    topic: 'Osteology — Upper Limb'
  },
  {
    id: 'test_q6_skull_frontal',
    question: 'Identify the cranial bone indicated by the arrow forming the forehead and superior orbital roof:',
    questionAr: 'ما اسم العظم القحفي المشار إليه بالسهم والذي يشكل الجبهة وسقف محجر العين؟',
    structureTarget: 'Frontal Bone',
    structureTargetAr: 'العظم الجبهي',
    imageUrl: '/images/anatomy/skull_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 50,
    pointerY: 20,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Frontal Bone',
    acceptableAnswers: [
      'Frontal Bone',
      'Os Frontale',
      'Frontal',
      'العظم الجبهي',
      'الجبهي',
      'عظم جبهي'
    ],
    explanation: 'The arrow indicates the Frontal Bone, which forms the forehead, supraorbital margins, and the roof of the anterior cranial fossa.',
    explanationAr: 'يشير السهم إلى العظم الجبهي (Frontal Bone)، ويشكل الجبهة والحافة العلوية للحجاجين والحفرة القحفية الأمامية.',
    clinicalPearl: 'The supraorbital foramen transmits the supraorbital nerve (branch of V1) and vessels.',
    topic: 'Osteology — Skull'
  },
  {
    id: 'test_q7_skull_mandible',
    question: 'Identify the bone indicated by the arrow forming the lower jaw:',
    questionAr: 'ما اسم العظم المشار إليه بالسهم والذي يشكل الفك السفلي؟',
    structureTarget: 'Mandible',
    structureTargetAr: 'عظم الفك السفلي',
    imageUrl: '/images/anatomy/skull_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 50,
    pointerY: 84,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Mandible',
    acceptableAnswers: [
      'Mandible',
      'Mandibula',
      'Lower Jaw',
      'Mandible bone',
      'الفك السفلي',
      'عظم الفك السفلي',
      'فك سفلي'
    ],
    explanation: 'The arrow points to the Mandible, the only movable bone of the skull, articulating with the temporal bones at the bilateral temporomandibular joints (TMJs).',
    explanationAr: 'يشير السهم إلى عظم الفك السفلي (Mandible)، وهو العظم الوحيد المتحرك في الجمجمة ويتمفصل مع العظمين الصدغيين.',
    clinicalPearl: 'The mental foramen transmits the mental nerve, providing sensory supply to the chin and lower lip.',
    topic: 'Osteology — Skull'
  },
  {
    id: 'test_q8_skull_zygomatic',
    question: 'Identify the cheekbone indicated by the arrow:',
    questionAr: 'ما اسم العظم المشار إليه بالسهم والذي يشكل بروز الوجنة؟',
    structureTarget: 'Zygomatic Bone',
    structureTargetAr: 'العظم الوجني',
    imageUrl: '/images/anatomy/skull_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 27,
    pointerY: 55,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Zygomatic Bone',
    acceptableAnswers: [
      'Zygomatic Bone',
      'Os Zygomaticum',
      'Zygoma',
      'Cheekbone',
      'العظم الوجني',
      'الوجني',
      'عظم وجني'
    ],
    explanation: 'The arrow points to the Zygomatic Bone (cheekbone), which articulates with the maxilla, temporal, frontal, and sphenoid bones.',
    explanationAr: 'يشير السهم إلى العظم الوجني (Zygomatic Bone) الذي يشكل بروز الخد ويسهم في جدار الحجاج والقوس الوجنية.',
    clinicalPearl: 'Tripod (zygomaticomaxillary complex) fractures typically occur following direct lateral facial trauma.',
    topic: 'Osteology — Skull'
  },
  {
    id: 'test_q9_scapula_spine',
    question: 'Identify the prominent bony ridge indicated by the arrow on the posterior surface of the scapula:',
    questionAr: 'ما اسم الحافة العظمية البارزة المشار إليها بالسهم على الوجه الخلفي للوح الكتف؟',
    structureTarget: 'Spine of Scapula',
    structureTargetAr: 'شوكة لوح الكتف',
    imageUrl: '/images/anatomy/scapula_posterior_osteology.svg',
    imageSource: 'Academic Anatomy Vector Plates',
    pointerX: 48,
    pointerY: 38,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Spine of Scapula',
    acceptableAnswers: [
      'Spine of Scapula',
      'Scapular Spine',
      'Spina Scapulae',
      'Spine of the scapula',
      'شوكة لوح الكتف',
      'شوكة الكتف',
      'الشوكة الكتفية'
    ],
    explanation: 'The arrow indicates the Spine of the Scapula, dividing the posterior surface into supraspinous and infraspinous fossae, and continuing laterally as the acromion.',
    explanationAr: 'يشير السهم إلى شوكة لوح الكتف (Spine of Scapula) التي تقسم ظهر لوح الكتف إلى حفرتين فوق وتحت الشوك وتستمر وحشياً بالأخرم.',
    clinicalPearl: 'The scapular spine serves as an important palpation landmark at the level of T3 spinous process.',
    topic: 'Osteology — Upper Limb'
  },
  {
    id: 'test_q10_scapula_acromion',
    question: 'Identify the expanded lateral process indicated by the arrow forming the summit of the shoulder:',
    questionAr: 'ما اسم الناتئ العظمي الوحشي المشار إليه بالسهم والذي يشكل قمة الكتف ويتمفصل مع الترقوة؟',
    structureTarget: 'Acromion of Scapula',
    structureTargetAr: 'الأخرم / الناتئ الأخرمي',
    imageUrl: '/images/anatomy/scapula_posterior_osteology.svg',
    imageSource: 'Academic Anatomy Vector Plates',
    pointerX: 20,
    pointerY: 28,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Acromion of Scapula',
    acceptableAnswers: [
      'Acromion',
      'Acromion Process',
      'Acromion of Scapula',
      'Acromion process of scapula',
      'الأخرم',
      'الناتئ الأخرمي',
      'أخرم'
    ],
    explanation: 'The arrow indicates the Acromion, the lateral continuation of the scapular spine that articulates with the clavicle at the acromioclavicular (AC) joint.',
    explanationAr: 'يشير السهم إلى الأخرم (Acromion) الذي يتمفصل مع النهاية الوحشية للترقوة ليشكل المفصل الأخرمي الترقوي (AC joint).',
    clinicalPearl: 'Subacromial impingement syndrome involves compression of the supraspinatus tendon beneath the acromion during arm elevation.',
    topic: 'Osteology — Upper Limb'
  },
  {
    id: 'test_q11_knee_medial_meniscus',
    question: 'Identify the C-shaped fibrocartilaginous structure indicated by the arrow on the tibial plateau:',
    questionAr: 'ما اسم القرص الغضروفي الهلالي المشار إليه بالسهم على السطح المفصلي لقصبة الساق؟',
    structureTarget: 'Medial Meniscus',
    structureTargetAr: 'الهلالة الإنسية للركبة',
    imageUrl: '/images/anatomy/knee_tibia_menisci_cruciate.png',
    imageSource: 'Gray Anatomy Atlas (Public Domain)',
    pointerX: 32,
    pointerY: 48,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Medial Meniscus',
    acceptableAnswers: [
      'Medial Meniscus',
      'Meniscus Medialis',
      'Medial meniscus of knee',
      'الهلالة الإنسية',
      'الهلالة الإنسية للركبة',
      'الغضروف الهلالي الإنسي',
      'غضروف هلالي إنسي'
    ],
    explanation: 'The arrow points to the Medial Meniscus, a semicircular fibrocartilage disc attached to the medial collateral ligament (MCL).',
    explanationAr: 'يشير السهم إلى الهلالة الإنسية (Medial Meniscus)، وهي قرص غضروفي هلالي متصل بالرباط الجانبي الإنسي وأكثر عرضة للتمزق.',
    clinicalPearl: 'The Unhappy Triad (O\'Donoghue triad) involves concomitant tears of the ACL, MCL, and medial meniscus.',
    topic: 'Joints — Knee Joint'
  },
  {
    id: 'test_q12_knee_acl',
    question: 'Identify the intracapsular ligament of the knee indicated by the arrow:',
    questionAr: 'ما اسم الرباط داخل المحفظة المشار إليه بالسهم في مفصل الركبة الذي يمنع انزلاق القصبة للأمام؟',
    structureTarget: 'Anterior Cruciate Ligament (ACL)',
    structureTargetAr: 'الرباط المتصالب الأمامي (ACL)',
    imageUrl: '/images/anatomy/knee_joint_interior_ligaments.png',
    imageSource: 'Visible Human Project & OpenStax',
    pointerX: 50,
    pointerY: 52,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Anterior Cruciate Ligament (ACL)',
    acceptableAnswers: [
      'Anterior Cruciate Ligament',
      'ACL',
      'Ligamentum Cruciatum Anterius',
      'Anterior cruciate',
      'الرباط المتصالب الأمامي',
      'المتصالب الأمامي',
      'رباط متصالب أمامي'
    ],
    explanation: 'The arrow indicates the Anterior Cruciate Ligament (ACL), preventing anterior translation of the tibia relative to the femur.',
    explanationAr: 'يشير السهم إلى الرباط المتصالب الأمامي (ACL)، ومهمته منع انزلاق القصبة للأمام بالنسبة لعظم الفخذ ومقاومة فرط بسط الركبة.',
    clinicalPearl: 'The Lachman test is the most sensitive physical examination test for evaluating ACL integrity.',
    topic: 'Joints — Knee Joint'
  },
  {
    id: 'test_q13_knee_patella',
    question: 'Identify the sesamoid bone / anterior joint structure indicated by the arrow on the knee:',
    questionAr: 'ما اسم العظم السمسماني المشار إليه بالسهم في مقدمة مفصل الركبة؟',
    structureTarget: 'Patella',
    structureTargetAr: 'الرضفة (عظم صابونة الركبة)',
    imageUrl: '/images/anatomy/knee_joint_anatomy_openstax.jpg',
    imageSource: 'OpenStax Anatomy Plate 918 (Knee Joint)',
    pointerX: 48,
    pointerY: 34,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Patella',
    acceptableAnswers: [
      'Patella',
      'Kneecap',
      'Patella bone',
      'الرضفة',
      'عظم الرضفة',
      'صابونة الركبة'
    ],
    explanation: 'The arrow indicates the Patella, the largest sesamoid bone in the human body, embedded within the quadriceps tendon.',
    explanationAr: 'يشير السهم إلى عظم الرضفة (Patella)، وهو أكبر عظم سمسماني في الجسم مطمور داخل وتر العضلة رباعية الرؤوس الفخذية.',
    clinicalPearl: 'Patellar dislocation most frequently occurs in the lateral direction due to the lateral vector of the quadriceps muscle pull (Q-angle).',
    topic: 'Joints — Knee Joint'
  },
  {
    id: 'test_q14_synovial_cartilage',
    question: 'Identify the smooth protective articular tissue indicated by the arrow covering the bone ends in a synovial joint:',
    questionAr: 'ما اسم النسيج الغضروفي الأملس المشار إليه بالسهم والذي يغطي نهايات العظام المفصلية؟',
    structureTarget: 'Articular Cartilage',
    structureTargetAr: 'الغضروف المفصلي (Articular Cartilage)',
    imageUrl: '/images/anatomy/synovial_joint_structure_openstax.jpg',
    imageSource: 'OpenStax Anatomy Plate 908 (Synovial Joint Structure)',
    pointerX: 50,
    pointerY: 30,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Articular Cartilage',
    acceptableAnswers: [
      'Articular Cartilage',
      'Hyaline Cartilage',
      'Articular hyaline cartilage',
      'الغضروف المفصلي',
      'غضروف مفصلي',
      'الغضروف الزجاجي المفصلي'
    ],
    explanation: 'The arrow points to the Articular (hyaline) Cartilage covering the epiphyses of articulating bones, providing a frictionless, shock-absorbing gliding surface.',
    explanationAr: 'يشير السهم إلى الغضروف المفصلي الزجاجي (Articular Cartilage) الذي يغطي نهايات العظام لتوفير سطح أملس عديم الاحتكاك وامتصاص الصدمات.',
    clinicalPearl: 'Degradation and fibrillation of articular cartilage is the hallmark pathology of Osteoarthritis.',
    topic: 'Joints — Structure'
  },
  {
    id: 'test_q15_synovial_cavity',
    question: 'Identify the fluid-filled space indicated by the arrow enclosed by the articular capsule:',
    questionAr: 'ما اسم الحيز أو التجويف المفصلي المشار إليه بالسهم والمحتوي على السائل المزلق؟',
    structureTarget: 'Synovial Joint Cavity',
    structureTargetAr: 'التجويف المفصلي الزليلي',
    imageUrl: '/images/anatomy/synovial_joint_structure_openstax.jpg',
    imageSource: 'OpenStax Anatomy Plate 908 (Synovial Joint Structure)',
    pointerX: 52,
    pointerY: 52,
    pointerLabel: 'ARROW ➔',
    category: 'bones',
    correctAnswer: 'Synovial Joint Cavity',
    acceptableAnswers: [
      'Synovial Joint Cavity',
      'Synovial Cavity',
      'Joint Cavity',
      'Synovial space',
      'التجويف الزليلي',
      'التجويف المفصلي',
      'تجويف زليلي',
      'حيز مفصلي'
    ],
    explanation: 'The arrow indicates the Synovial Joint Cavity, containing viscous synovial fluid rich in hyaluronic acid and lubricin produced by the synovial membrane.',
    explanationAr: 'يشير السهم إلى التجويف الزليلي (Synovial Cavity) الذي يحتوي على السائل الزليلي المسؤول عن تزييت المفصل وتغذية الغضروف عديم الأوعية.',
    clinicalPearl: 'Joint effusion (arthrocentesis) allows diagnostic aspiration of synovial fluid to evaluate for septic arthritis or gout crystals.',
    topic: 'Joints — Structure'
  },
  {
    id: 'test_q16_synovial_pivot',
    question: 'Identify the type of uniaxial synovial joint indicated by the arrow that permits rotation around a single central axis:',
    questionAr: 'ما نوع المفصل الزليلي المشار إليه بالسهم والذي يسمح بالحركة الدورانية حول محور مركزي واحد؟',
    structureTarget: 'Pivot Joint (Trochoid)',
    structureTargetAr: 'مفصل مداري / محوري (Pivot Joint)',
    imageUrl: '/images/anatomy/synovial_joints_types_openstax.jpg',
    imageSource: 'OpenStax Plate 914 (Types of Synovial Joints)',
    pointerX: 25,
    pointerY: 16,
    pointerLabel: 'ARROW ➔',
    category: 'planes_joints',
    correctAnswer: 'Pivot Joint (Trochoid)',
    acceptableAnswers: [
      'Pivot Joint',
      'Pivot',
      'Trochoid Joint',
      'Trochoid',
      'مفصل مداري',
      'مفصل محوري',
      'المفصل المداري',
      'مداري'
    ],
    explanation: 'The arrow indicates a Pivot (trochoid) Joint, such as the atlantoaxial joint (C1-C2) and proximal radioulnar joint.',
    explanationAr: 'يشير السهم إلى المفصل المداري أو المحوري (Pivot Joint) كالمفصل الفهقي المحوري C1-C2 المسؤول عن تدوير الرأس.',
    clinicalPearl: 'Pronation and supination of the forearm occur via the proximal and distal radioulnar pivot joints.',
    topic: 'Joints — Synovial Types'
  },
  {
    id: 'test_q17_synovial_ball_socket',
    question: 'Identify the multiaxial synovial joint classification indicated by the arrow permitting universal motion in all planes:',
    questionAr: 'ما نوع المفصل الزليلي المشار إليه بالسهم والذي يتيح أوسع مدى حركة في جميع المستويات؟',
    structureTarget: 'Ball and Socket Joint',
    structureTargetAr: 'مفصل كروي حقي (Ball and Socket)',
    imageUrl: '/images/anatomy/synovial_joints_types_openstax.jpg',
    imageSource: 'OpenStax Plate 914 (Types of Synovial Joints)',
    pointerX: 75,
    pointerY: 84,
    pointerLabel: 'ARROW ➔',
    category: 'planes_joints',
    correctAnswer: 'Ball and Socket Joint',
    acceptableAnswers: [
      'Ball and Socket Joint',
      'Ball and Socket',
      'Spheroidal Joint',
      'مفصل كروي حقي',
      'كروي حقي',
      'المفصل الكروي الحقي',
      'كروي'
    ],
    explanation: 'The arrow indicates a Ball-and-Socket (spheroidal) Joint (e.g., glenohumeral shoulder and hip joints), allowing multiaxial movements.',
    explanationAr: 'يشير السهم إلى المفصل الكروي الحقي (Ball and Socket) كمفصلي الكتف والورك، ويسمح بالثني والبسط والتبعيد والتقريب والدوران والالتفاف.',
    clinicalPearl: 'The shoulder joint trades bony congruity for range of motion, relying primarily on the dynamic stability of the rotator cuff.',
    topic: 'Joints — Synovial Types'
  },

  // ==================== 2. MYOLOGY (MUSCLES & ACTIONS) ====================
  {
    id: 'test_q18_biceps',
    question: 'Identify the anterior arm muscle indicated by the arrow:',
    questionAr: 'ما اسم العضلة المشار إليها بالسهم في الحجرة الأمامية للذراع؟',
    structureTarget: 'Biceps Brachii',
    structureTargetAr: 'العضلة ذات الرأسين العضدية',
    imageUrl: '/images/anatomy/biceps_brachii_anterior_arm.png',
    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    pointerX: 48,
    pointerY: 45,
    pointerLabel: 'ARROW ➔',
    category: 'muscles',
    correctAnswer: 'Biceps Brachii',
    acceptableAnswers: [
      'Biceps Brachii',
      'Biceps',
      'Musculus Biceps Brachii',
      'Biceps muscle',
      'ذات الرأسين العضدية',
      'العضلة ذات الرأسين العضدية',
      'بايسبس'
    ],
    explanation: 'The arrow points to Biceps Brachii, a powerful supinator of the forearm and flexor of the elbow, innervated by the Musculocutaneous Nerve.',
    explanationAr: 'يشير السهم إلى العضلة ذات الرأسين العضدية (Biceps Brachii) التي تعطف المرفق وتستلقي الساعد ويعصبها العصب العضلي الجلدي.',
    clinicalPearl: 'The biceps reflex tests spinal cord levels C5 and C6.',
    topic: 'Myology — Upper Limb'
  },
  {
    id: 'test_q19_triceps',
    question: 'Identify the posterior arm muscle indicated by the arrow:',
    questionAr: 'ما اسم العضلة المشار إليها بالسهم في الحجرة الخلفية للذراع؟',
    structureTarget: 'Triceps Brachii',
    structureTargetAr: 'العضلة ثلاثية الرؤوس العضدية',
    imageUrl: '/images/anatomy/triceps_brachii_posterior_arm.png',
    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    pointerX: 52,
    pointerY: 44,
    pointerLabel: 'ARROW ➔',
    category: 'muscles',
    correctAnswer: 'Triceps Brachii',
    acceptableAnswers: [
      'Triceps Brachii',
      'Triceps',
      'Musculus Triceps Brachii',
      'ثلاثية الرؤوس العضدية',
      'العضلة ثلاثية الرؤوس العضدية',
      'ترايسبس'
    ],
    explanation: 'The arrow indicates Triceps Brachii, the chief extensor of the elbow joint, innervated by the Radial Nerve.',
    explanationAr: 'يشير السهم إلى العضلة ثلاثية الرؤوس العضدية (Triceps Brachii)، وهي الباسطة الرئيسية للمرفق ويعصبها العصب الكعبري.',
    clinicalPearl: 'Triceps deep tendon reflex evaluates C7 and C8 nerve roots.',
    topic: 'Myology — Upper Limb'
  },
  {
    id: 'test_q20_deltoid',
    question: 'Identify the shoulder muscle indicated by the arrow:',
    questionAr: 'ما اسم عضلة الكتف المشار إليها بالسهم؟',
    structureTarget: 'Deltoid Muscle',
    structureTargetAr: 'العضلة الدالية',
    imageUrl: '/images/anatomy/deltoid_shoulder_trapezius.png',
    imageSource: 'Gray Anatomy Atlas (Public Domain)',
    pointerX: 32,
    pointerY: 26,
    pointerLabel: 'ARROW ➔',
    category: 'muscles',
    correctAnswer: 'Deltoid Muscle',
    acceptableAnswers: [
      'Deltoid',
      'Deltoid Muscle',
      'Musculus Deltoideus',
      'العضلة الدالية',
      'الدالية'
    ],
    explanation: 'The arrow indicates the Deltoid Muscle, the prime abductor of the arm between 15° and 90°, supplied by the Axillary Nerve.',
    explanationAr: 'يشير السهم إلى العضلة الدالية (Deltoid) المسؤولة عن تبعيد الذراع من 15 إلى 90 درجة ويعصبها العصب الإبطي.',
    clinicalPearl: 'Axillary nerve injury leads to atrophy of the deltoid and loss of sensation over the upper lateral arm.',
    topic: 'Myology — Shoulder'
  },
  {
    id: 'test_q21_pectoralis',
    question: 'Identify the anterior chest muscle indicated by the arrow:',
    questionAr: 'ما اسم العضلة المشار إليها بالسهم في جدار الصدر الأمامي؟',
    structureTarget: 'Pectoralis Major',
    structureTargetAr: 'العضلة الصدرية الكبيرة',
    imageUrl: '/images/anatomy/pectoralis_major_anterior_chest.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 48,
    pointerY: 42,
    pointerLabel: 'ARROW ➔',
    category: 'muscles',
    correctAnswer: 'Pectoralis Major',
    acceptableAnswers: [
      'Pectoralis Major',
      'Pectoralis Major Muscle',
      'Pec Major',
      'العضلة الصدرية الكبيرة',
      'الصدرية الكبيرة'
    ],
    explanation: 'The arrow points to Pectoralis Major, which adducts and medially rotates the humerus.',
    explanationAr: 'يشير السهم إلى العضلة الصدرية الكبيرة (Pectoralis Major) التي تقرب الذراع وتدوره للإنسي.',
    clinicalPearl: 'Innervated by both medial and lateral pectoral nerves.',
    topic: 'Myology — Thorax'
  },
  {
    id: 'test_q22_quadriceps',
    question: 'Identify the anterior thigh muscle indicated by the arrow:',
    questionAr: 'ما اسم عضلة الفخذ الأمامية المشار إليها بالسهم؟',
    structureTarget: 'Rectus Femoris (Quadriceps)',
    structureTargetAr: 'العضلة المستقيمة الفخذية',
    imageUrl: '/images/anatomy/quadriceps_femoris_anterior_thigh.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 48,
    pointerY: 38,
    pointerLabel: 'ARROW ➔',
    category: 'muscles',
    correctAnswer: 'Rectus Femoris (Quadriceps)',
    acceptableAnswers: [
      'Rectus Femoris',
      'Rectus Femoris Muscle',
      'Quadriceps',
      'Quadriceps Femoris',
      'المستقيمة الفخذية',
      'العضلة المستقيمة الفخذية',
      'رباعية الرؤوس الفخذية'
    ],
    explanation: 'The arrow points to Rectus Femoris, which flexes the hip and extends the knee, supplied by the Femoral Nerve.',
    explanationAr: 'يشير السهم إلى المستقيمة الفخذية (Rectus Femoris)، وتعطف مفصل الورك وتبسط الركبة ويعصبها العصب الفخذي.',
    clinicalPearl: 'The patellar reflex tests nerve roots L3 and L4.',
    topic: 'Myology — Lower Limb'
  },
  {
    id: 'test_q23_gastrocnemius',
    question: 'Identify the superficial calf muscle indicated by the arrow:',
    questionAr: 'ما اسم عضلة ربلة الساق المشار إليها بالسهم؟',
    structureTarget: 'Gastrocnemius Muscle',
    structureTargetAr: 'عضلة الساق التوأمية',
    imageUrl: '/images/anatomy/gastrocnemius_calf_achilles.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 52,
    pointerY: 40,
    pointerLabel: 'ARROW ➔',
    category: 'muscles',
    correctAnswer: 'Gastrocnemius Muscle',
    acceptableAnswers: [
      'Gastrocnemius',
      'Gastrocnemius Muscle',
      'Calf muscle',
      'التوأمية الساقية',
      'عضلة الساق التوأمية',
      'العضلة التوأمية'
    ],
    explanation: 'The arrow indicates Gastrocnemius, joining the Achilles tendon to plantarflex the foot, innervated by the Tibial Nerve.',
    explanationAr: 'يشير السهم إلى العضلة التوأمية الساقية (Gastrocnemius) التي ترتكز عبر وتر أخيل على عظم العقب ويعصبها العصب الظنبوبي.',
    clinicalPearl: 'The ankle jerk (Achilles reflex) tests S1 and S2 nerve roots.',
    topic: 'Myology — Lower Limb'
  },
  {
    id: 'test_q24_rectus_abdominis',
    question: 'Identify the anterior abdominal wall muscle indicated by the arrow:',
    questionAr: 'ما اسم العضلة المشار إليها بالسهم في جدار البطن الأمامي؟',
    structureTarget: 'Rectus Abdominis',
    structureTargetAr: 'العضلة المستقيمة البطنية',
    imageUrl: '/images/anatomy/rectus_abdominis_sheath.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 42,
    pointerY: 46,
    pointerLabel: 'ARROW ➔',
    category: 'muscles',
    correctAnswer: 'Rectus Abdominis',
    acceptableAnswers: [
      'Rectus Abdominis',
      'Rectus Abdominis Muscle',
      'Rectus',
      'المستقيمة البطنية',
      'العضلة المستقيمة البطنية',
      'مستقيمة البطن'
    ],
    explanation: 'The arrow points to Rectus Abdominis, enclosed within the rectus sheath and segmented by tendinous intersections.',
    explanationAr: 'يشير السهم إلى العضلة المستقيمة البطنية (Rectus Abdominis) المتقاطعة بالانغرازات الوترية ومسؤولة عن ثني الجذع.',
    clinicalPearl: 'Innervated by lower thoracoabdominal spinal nerves (T7-T12).',
    topic: 'Myology — Abdomen'
  },
  {
    id: 'test_q25_scm',
    question: 'Identify the diagonal cervical muscle indicated by the arrow:',
    questionAr: 'ما اسم العضلة الرقبية المائلة المشار إليها بالسهم؟',
    structureTarget: 'Sternocleidomastoid (SCM)',
    structureTargetAr: 'العضلة القصية الترقوية الخشائية',
    imageUrl: '/images/anatomy/sternocleidomastoid_neck.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 52,
    pointerY: 44,
    pointerLabel: 'ARROW ➔',
    category: 'muscles',
    correctAnswer: 'Sternocleidomastoid (SCM)',
    acceptableAnswers: [
      'Sternocleidomastoid',
      'SCM',
      'Sternocleidomastoid muscle',
      'Sternomastoid',
      'القصية الترقوية الخشائية',
      'العضلة القصية الترقوية الخشائية'
    ],
    explanation: 'The arrow indicates the Sternocleidomastoid (SCM), dividing the neck into anterior and posterior triangles, innervated by CN XI.',
    explanationAr: 'يشير السهم إلى العضلة القصية الترقوية الخشائية (SCM) التي تقسم العنق إلى مثلثين أمامي وخلفي ويعصبها العصب القحفي الـ 11.',
    clinicalPearl: 'Spasm or contracture causes Torticollis (wry neck).',
    topic: 'Myology — Head & Neck'
  },
  {
    id: 'test_q26_trapezius',
    question: 'Identify the broad superficial back muscle indicated by the arrow:',
    questionAr: 'ما اسم العضلة المشار إليها بالسهم في أعلى الظهر؟',
    structureTarget: 'Trapezius Muscle',
    structureTargetAr: 'العضلة شبه المنحرفة',
    imageUrl: '/images/anatomy/trapezius_latissimus_back.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 35,
    pointerY: 22,
    pointerLabel: 'ARROW ➔',
    category: 'muscles',
    correctAnswer: 'Trapezius Muscle',
    acceptableAnswers: [
      'Trapezius',
      'Trapezius Muscle',
      'Traps',
      'شبه المنحرفة',
      'العضلة شبه المنحرفة'
    ],
    explanation: 'The arrow points to the Trapezius muscle, responsible for shrugging and stabilizing the scapula, innervated by the Spinal Accessory Nerve (CN XI).',
    explanationAr: 'يشير السهم إلى العضلة شبه المنحرفة (Trapezius) التي ترفع وتثبت لوح الكتف ويعصبها العصب القحفي الحادي عشر.',
    clinicalPearl: 'Accessory nerve palsy produces shoulder droop and winged scapula.',
    topic: 'Myology — Back'
  },

  // ==================== 3. VISCERAL ANATOMY & ORGANS ====================
  {
    id: 'test_q27_heart_left_ventricle',
    question: 'Identify the thick-walled cardiac chamber indicated by the arrow:',
    questionAr: 'ما اسم حجرة القلب المشار إليها بالسهم ذات الجدار العضلي السميك؟',
    structureTarget: 'Left Ventricle',
    structureTargetAr: 'البطين الأيسر للقلب',
    imageUrl: '/images/anatomy/heart_anterior_anatomy.png',
    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    pointerX: 64,
    pointerY: 72,
    pointerLabel: 'ARROW ➔',
    category: 'organs',
    correctAnswer: 'Left Ventricle',
    acceptableAnswers: [
      'Left Ventricle',
      'Left ventricle of heart',
      'Ventriculus Sinister',
      'البطين الأيسر',
      'البطين الأيسر للقلب'
    ],
    explanation: 'The arrow points to the Left Ventricle, pumping oxygenated blood into the aorta against systemic resistance.',
    explanationAr: 'يشير السهم إلى البطين الأيسر (Left Ventricle) الذي يضخ الدم المؤكسج إلى الشريان الأبهر بضغط مرتفع.',
    clinicalPearl: 'The Left Anterior Descending (LAD) coronary artery is the main vessel supplying the anterior left ventricular wall.',
    topic: 'Visceral — Cardiovascular'
  },
  {
    id: 'test_q28_heart_ascending_aorta',
    question: 'Identify the great arterial trunk indicated by the arrow arising from the heart:',
    questionAr: 'ما اسم الشريان الرئيسي المشار إليه بالسهم المنبثق من قاعدة البطين الأيسر؟',
    structureTarget: 'Ascending Aorta',
    structureTargetAr: 'الشريان الأبهر الصاعد',
    imageUrl: '/images/anatomy/heart_anterior_anatomy.png',
    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    pointerX: 52,
    pointerY: 22,
    pointerLabel: 'ARROW ➔',
    category: 'organs',
    correctAnswer: 'Ascending Aorta',
    acceptableAnswers: [
      'Ascending Aorta',
      'Aorta',
      'Aortic arch',
      'الشريان الأبهر الصاعد',
      'الأبهر الصاعد',
      'الأبهر',
      'شريان أبهر'
    ],
    explanation: 'The arrow points to the Ascending Aorta, delivering oxygenated blood to the body and coronary circulation.',
    explanationAr: 'يشير السهم إلى الشريان الأبهر الصاعد (Ascending Aorta) المنبثق من البطين الأيسر.',
    clinicalPearl: 'Stanford Type A dissection originates in the ascending aorta and represents a surgical emergency.',
    topic: 'Visceral — Cardiovascular'
  },
  {
    id: 'test_q29_kidney_pyramid',
    question: 'Identify the conical medullary structure indicated by the arrow inside the kidney:',
    questionAr: 'ما اسم التركيب الهرمي المشار إليه بالسهم في لب الكلية؟',
    structureTarget: 'Renal Pyramid (Medulla)',
    structureTargetAr: 'الهرم الكلوي في اللب',
    imageUrl: '/images/anatomy/kidney_coronal_section.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 42,
    pointerY: 44,
    pointerLabel: 'ARROW ➔',
    category: 'organs',
    correctAnswer: 'Renal Pyramid (Medulla)',
    acceptableAnswers: [
      'Renal Pyramid',
      'Renal Pyramid (Medulla)',
      'Medullary pyramid',
      'الهرم الكلوي',
      'أهرام الكلية',
      'هرم كلوي',
      'لب الكلية'
    ],
    explanation: 'The arrow indicates a Renal Pyramid containing collecting ducts that empty urine into minor calyces.',
    explanationAr: 'يشير السهم إلى الهرم الكلوي (Renal Pyramid) في اللب، وقاعدته نحو القشرة وقمته (الحليمة الكلوية) تصب في الكأس الصغير.',
    clinicalPearl: 'Renal papillary necrosis occurs in sickle cell nephropathy and analgesic abuse.',
    topic: 'Visceral — Urinary'
  },
  {
    id: 'test_q30_stomach_fundus',
    question: 'Identify the dome-shaped superior region of the stomach indicated by the arrow:',
    questionAr: 'ما اسم الجزء العلوي المقبب للمعدة المشار إليه بالسهم؟',
    structureTarget: 'Fundus of Stomach',
    structureTargetAr: 'قاع المعدة (Fundus)',
    imageUrl: '/images/anatomy/stomach_duodenum_anatomy.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 64,
    pointerY: 22,
    pointerLabel: 'ARROW ➔',
    category: 'organs',
    correctAnswer: 'Fundus of Stomach',
    acceptableAnswers: [
      'Fundus',
      'Fundus of Stomach',
      'Gastric Fundus',
      'قاع المعدة',
      'قاع المعده'
    ],
    explanation: 'The arrow points to the Gastric Fundus, lying in contact with the left dome of the diaphragm and containing the gastric air bubble.',
    explanationAr: 'يشير السهم إلى قاع المعدة (Fundus)، ويحتوي على الفقاعة الغازية الظاهرة في الأشعة البسيطة.',
    clinicalPearl: 'Hiatal hernia involves herniation of the gastric fundus through the diaphragmatic hiatus.',
    topic: 'Visceral — Gastrointestinal'
  },
  {
    id: 'test_q31_brain_corpus_callosum',
    question: 'Identify the prominent commissural nerve tract indicated by the arrow in this brain section:',
    questionAr: 'ما اسم الحزمة العصبية الصوارية المشار إليها بالسهم والتي تربط نصفي الكرة المخية؟',
    structureTarget: 'Corpus Callosum',
    structureTargetAr: 'الجسم الثفني',
    imageUrl: '/images/anatomy/brain_midsagittal_section.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 52,
    pointerY: 38,
    pointerLabel: 'ARROW ➔',
    category: 'organs',
    correctAnswer: 'Corpus Callosum',
    acceptableAnswers: [
      'Corpus Callosum',
      'الجسم الثفني',
      'جسم ثفني'
    ],
    explanation: 'The arrow indicates the Corpus Callosum, the major interhemispheric commissure connecting cerebral cortices.',
    explanationAr: 'يشير السهم إلى الجسم الثفني (Corpus Callosum) الذي يربط نصفي الكرة المخية بملايين الألياف الميالينية.',
    clinicalPearl: 'Corpus callosotomy historically prevented the propagation of severe generalized epileptic seizures.',
    topic: 'Visceral — Nervous System'
  }
];
