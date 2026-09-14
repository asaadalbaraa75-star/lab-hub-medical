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

  // 📝 Test yourself
  questions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
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
  options: string[];
  correctAnswer: string;
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
  // 1. Biceps Brachii (Upper Limb)
  {
    id: 'biceps_brachii',
    nameEn: 'Biceps Brachii',
    nameAr: 'العضلة ذات الرأسين العضدية',
    region: 'upper_limb',
    regionLabelEn: 'Upper Limb (Arm)',
    regionLabelAr: 'الطرف العلوي (الذراع)',
    imageUrl: '/images/anatomy/biceps_brachii_anterior_arm.png',    imageSource: "Gray's Anatomy Plate 411 / Wikimedia Commons",    imageLicense: 'Creative Commons Attribution 4.0',
    imageCredit: "Dissection of deep anterior arm muscles (Henry Gray, 1918)",    location: 'Anterior (flexor) compartment of the arm (brachium).',
    locationAr: 'الحجرة الأمامية (القابضة) للذراع.',
    origin: 'Long head: Supraglenoid tubercle of scapula; Short head: Coracoid process of scapula.',
    originAr: 'الرأس الطويل: الحديبة فوق الحقية للكتف؛ الرأس القصير: الناتئ الغرابي للكتف.',
    insertion: 'Radial tuberosity of radius and bicipital aponeurosis into deep fascia of forearm.',
    insertionAr: 'الأحدوبة الكعبرية لعظم الكعبرة والغشاء الوتري لعضلة البايسبس في لفافة الساعد.',
    innervation: 'Musculocutaneous nerve (C5, C6).',
    innervationAr: 'العصب العضلي الجلدي (الجذور الرقبية C5, C6).',
    action: 'Powerful flexor of forearm at elbow joint; powerful supinator of flexed forearm.',
    actionAr: 'قابض قوي للساعد عند مفصل المرفق، وأقوى عاطف وباطح (Supinator) للساعد المثني.',
    clinicalNote: 'Tested clinically via Biceps tendon reflex (C5-C6). Rupture of the long head tendon causes "Popeye deformity".',
    clinicalNoteAr: 'يُختبر سريرياً عبر منعكس وتر البايسبس (C5-C6). تمزق وتر الرأس الطويل يسبب تشوه باباي (Popeye deformity).',
    video: {
      id: 'vid_biceps',
      titleEn: 'Biceps Brachii Anatomy & Action Breakdown',
      titleAr: 'شرح تشريح عضلة البايسبس ووظائفها بالتفصيل',
      youtubeId: '2k8B87G_n4Y',
      duration: '06:40',
      language: 'English'
    },
    questions: [
      {
        id: 'q_biceps_1',
        question: 'What is the primary nerve that innervates Biceps Brachii?',
        options: ['Radial nerve', 'Musculocutaneous nerve', 'Median nerve', 'Axillary nerve'],
        correctIndex: 1,
        explanation: 'Biceps brachii is supplied by the Musculocutaneous nerve (C5, C6).'
      },
      {
        id: 'q_biceps_2',
        question: 'Besides elbow flexion, what key mechanical action does Biceps Brachii perform?',
        options: ['Pronation of forearm', 'Powerful supination of flexed forearm', 'Adduction of fingers', 'Shoulder extension'],
        correctIndex: 1,
        explanation: 'Because it inserts into the radial tuberosity, Biceps Brachii acts as the strongest supinator of the flexed forearm.'
      }
    ]
  },

  // 2. Triceps Brachii (Upper Limb)
  {
    id: 'triceps_brachii',
    nameEn: 'Triceps Brachii',
    nameAr: 'العضلة ثلاثية الرؤوس العضدية',
    region: 'upper_limb',
    regionLabelEn: 'Upper Limb (Posterior Arm)',
    regionLabelAr: 'الطرف العلوي (الوجه الخلفي للذراع)',
    imageUrl: '/images/anatomy/triceps_brachii_posterior_arm.png',    imageSource: "Gray's Anatomy Plate 412 / Wikimedia Commons",    imageLicense: 'CC BY 4.0',
    imageCredit: "Posterior arm muscles and triceps brachii (Henry Gray, 1918)",    location: 'Posterior compartment of the arm.',
    locationAr: 'الحجرة الخلفية الكاملة للذراع.',
    origin: 'Long head: Infraglenoid tubercle of scapula; Lateral head: Posterior humerus above radial groove; Medial head: Posterior humerus below radial groove.',
    originAr: 'الرأس الطويل: الحديبة تحت الحقية للكتف؛ الرأس الوحشي: أعلى الميزاب الكعبري؛ الرأس الإنسي: أسفل الميزاب الكعبري.',
    insertion: 'Olecranon process of ulna.',
    insertionAr: 'الناتئ الزجي لعظم الزند.',
    innervation: 'Radial nerve (C6, C7, C8).',
    innervationAr: 'العصب الكعبري (الجذور C6, C7, C8).',
    action: 'Chief extensor of the forearm at the elbow joint; long head assists in shoulder extension and adduction.',
    actionAr: 'الباسط الرئيسي للساعد عند مفصل المرفق؛ الرأس الطويل يساعد في بسط وتقريب مفصل الكتف.',
    clinicalNote: 'Tested clinically via Triceps reflex (C7). Fractures of the mid-humeral shaft jeopardize the radial nerve.',
    clinicalNoteAr: 'يُفحص بمنعكس الترايسبس (C7). كسور منتصف عظم العضد تهدد العصب الكعبري المار تحته مباشرة.',
    video: {
      id: 'vid_triceps',
      titleEn: 'Triceps Brachii Anatomy & Radial Nerve Relations',
      titleAr: 'تشريح العضلة ثلاثية الرؤوس وعلاقتها بالعصب الكعبري',
      youtubeId: 'b_7i0E4wH0I',
      duration: '05:30',
      language: 'English'
    },
    questions: [
      {
        id: 'q_triceps_1',
        question: 'Where does the tendon of Triceps Brachii insert?',
        options: ['Radial tuberosity', 'Olecranon process of ulna', 'Coracoid process', 'Medial epicondyle'],
        correctIndex: 1,
        explanation: 'The common tendon of Triceps Brachii inserts on the olecranon process of the ulna.'
      }
    ]
  },

  // 3. Deltoid (Upper Limb / Shoulder)
  {
    id: 'deltoid',
    nameEn: 'Deltoid',
    nameAr: 'العضلة الدالية',
    region: 'upper_limb',
    regionLabelEn: 'Upper Limb (Shoulder)',
    regionLabelAr: 'الطرف العلوي (مفصل الكتف)',
    imageUrl: '/images/anatomy/deltoid_shoulder_trapezius.png',    imageSource: "Gray's Anatomy Plate 409 / Wikimedia Commons",    imageLicense: 'Public Domain',
    imageCredit: "Superficial muscles of shoulder and upper back (Henry Gray, 1918)",    location: 'Forms the rounded muscular contour of the shoulder.',
    locationAr: 'تشكل التحدب العضلي الدائري الخارجي لمفصل الكتف.',
    origin: 'Lateral third of clavicle, acromion, and spine of scapula.',
    originAr: 'الثلث الوحشي للترقوة، الأخرم، وشوكة لوح الكتف.',
    insertion: 'Deltoid tuberosity of the humerus.',
    insertionAr: 'الأحدوبة الدالية على عظم العضد.',
    innervation: 'Axillary nerve (C5, C6).',
    innervationAr: 'العصب الإبطي (C5, C6).',
    action: 'Middle fibers: Prime abductor of arm from 15° to 90°; Anterior fibers: Flexion and medial rotation; Posterior fibers: Extension and lateral rotation.',
    actionAr: 'الألياف الوسطى: المبعد الرئيسي للذراع من 15° حتى 90°؛ الأمامية: العطف والتدوير الإنسي؛ الخلفية: البسط والتدوير الوحشي.',
    clinicalNote: 'Axillary nerve injury (from anterior shoulder dislocation or surgical neck fracture of humerus) causes deltoid paralysis and flat shoulder.',
    clinicalNoteAr: 'أذية العصب الإبطي (بخلع الكتف الأمامي أو كسر عنق العضد الجراحي) تسبب شلل الدالية وتسطح الكتف.',
    video: {
      id: 'vid_deltoid',
      titleEn: 'Deltoid Muscle Anatomy & Axillary Nerve',
      titleAr: 'تشريح العضلة الدالية ووظائف الألياف الثلاثة',
      youtubeId: 'q8M7j7qN0W0',
      duration: '06:10',
      language: 'English'
    },
    questions: [
      {
        id: 'q_deltoid_1',
        question: 'Which nerve innervates the Deltoid muscle?',
        options: ['Musculocutaneous nerve', 'Axillary nerve', 'Suprascapular nerve', 'Radial nerve'],
        correctIndex: 1,
        explanation: 'The Deltoid muscle is innervated by the Axillary nerve (C5, C6).'
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
    imageUrl: '/images/anatomy/pectoralis_major_anterior_chest.png',    imageSource: "Gray's Anatomy Plate 410 / Wikimedia Commons",    imageLicense: 'CC BY 4.0',
    imageCredit: "Anterior chest wall and pectoralis major dissection (Henry Gray, 1918)",    location: 'Large, fan-shaped muscle covering upper anterior chest wall.',
    locationAr: 'عضلة مروحية كبيرة تغطي الجزء العلوي من جدار الصدر الأمامي.',
    origin: 'Clavicular head: Medial half of clavicle; Sternocostal head: Sternum and costal cartilages 1-6.',
    originAr: 'الرأس الترقوي: النصف الإنسي للترقوة؛ الرأس القصي الضلعي: عظم القص والغضاريف الضلعية 1-6.',
    insertion: 'Lateral lip of the bicipital (intertubercular) groove of humerus.',
    insertionAr: 'الشفة الوحشية للميزاب بين الحديبتين على عظم العضد.',
    innervation: 'Medial and Lateral Pectoral nerves (C5-T1).',
    innervationAr: 'العصبان الصدريان الإنسي والوحشي (C5-T1).',
    action: 'Adduction and medial rotation of the arm; clavicular head flexes the arm.',
    actionAr: 'تقريب وتدوير الذراع إنسياً؛ الرأس الترقوي يساهم في عطف الذراع.',
    clinicalNote: 'Forms the anterior axillary fold. Absence of pectoralis major occurs in Poland syndrome.',
    clinicalNoteAr: 'تشكل الطية الإبطية الأمامية. غيابها الخلقي يسمى متلازمة بولاند (Poland syndrome).',
    video: {
      id: 'vid_pectoralis',
      titleEn: 'Pectoralis Major Origin, Insertion & Clinical Notes',
      titleAr: 'العضلة الصدرية الكبيرة: المنشأ والارتكاز والأهمية السريرية',
      youtubeId: '9G_H1fGg2pE',
      duration: '05:45',
      language: 'English'
    },
    questions: [
      {
        id: 'q_pec_1',
        question: 'Which anatomical landmark is formed by the lower border of Pectoralis Major?',
        options: ['Posterior axillary fold', 'Anterior axillary fold', 'Cubital fossa', 'Femoral triangle'],
        correctIndex: 1,
        explanation: 'The lower free border of Pectoralis Major forms the anterior axillary fold.'
      }
    ]
  },

  // 5. Rectus Abdominis (Abdomen)
  {
    id: 'rectus_abdominis',
    nameEn: 'Rectus Abdominis',
    nameAr: 'العضلة المستقيمة البطنية',
    region: 'abdomen',
    regionLabelEn: 'Abdomen (Anterior Abdominal Wall)',
    regionLabelAr: 'البطن (جدار البطن الأمامي)',
    imageUrl: '/images/anatomy/rectus_abdominis_sheath.png',    imageSource: "Gray's Anatomy Plate 392 / Wikimedia Commons",    imageLicense: 'CC BY 4.0',
    imageCredit: "Anterior abdominal wall, rectus abdominis and sheath (Henry Gray, 1918)",    location: 'Paired vertical muscle running down anterior abdominal wall, enclosed in rectus sheath.',
    locationAr: 'عضلة عمودية مزدوجة تمتد على جانبي الخط الناصف للبطن داخل غمد المستقيمة.',
    origin: 'Pubic crest and pubic symphysis.',
    originAr: 'عرف العانة والارتفاق العاني.',
    insertion: 'Xiphoid process and costal cartilages of ribs 5-7.',
    insertionAr: 'الناتئ الرهابي والغضاريف الضلعية للأضلاع 5 إلى 7.',
    innervation: 'Thoraco-abdominal nerves (anterior rami of T7-T11) and subcostal nerve (T12).',
    innervationAr: 'الأعصاب الصدرية البطنية (الفروع الأمامية من T7-T11) والعصب تحت الضلعي (T12).',
    action: 'Flexes the trunk (lumbar spine); compresses abdominal viscera to aid expiration, defecation, and childbirth.',
    actionAr: 'عطف الجذع (العمود الفقري القطني) وزيادة الضغط داخل البطن للمساعدة في الزفير والتغوط والولادة.',
    clinicalNote: 'Separation of the two rectus bellies is known as diastasis recti.',
    clinicalNoteAr: 'تباعد بطني العضلتين المستقيمة يسمى انفراق المستقيمة (Diastasis recti).',
    video: {
      id: 'vid_rectus_abdominis',
      titleEn: 'Rectus Abdominis & Rectus Sheath Anatomy',
      titleAr: 'تشريح العضلة المستقيمة البطنية وغمد المستقيمة والخط الأبيض',
      youtubeId: 'F2o_jH1bF9c',
      duration: '06:20',
      language: 'English'
    },
    questions: [
      {
        id: 'q_rectus_1',
        question: 'Where does the Rectus Abdominis muscle originate proximally?',
        options: ['Xiphoid process', 'Pubic crest & symphysis', 'Iliac crest', 'Femoral head'],
        correctIndex: 1,
        explanation: 'The Rectus Abdominis originates inferiorly from the pubic crest and pubic symphysis and travels upward to the costal cartilages and xiphoid.'
      }
    ]
  },

  // 6. Trapezius (Back)
  {
    id: 'trapezius',
    nameEn: 'Trapezius',
    nameAr: 'العضلة شبه المنحرفة',
    region: 'back',
    regionLabelEn: 'Back (Superficial Back & Neck)',
    regionLabelAr: 'الظهر (الناحية السطحية للظهر والعنق)',
    imageUrl: '/images/anatomy/trapezius_latissimus_back.png',    imageSource: "Gray's Anatomy Plate 409 / Wikimedia Commons",    imageLicense: 'Public Domain',
    imageCredit: "Superficial muscles of neck and back: Trapezius and Latissimus dorsi (Henry Gray, 1918)",    location: 'Large diamond-shaped superficial back muscle connecting the skull, spine, and shoulder girdle.',
    locationAr: 'عضلة معينية سطحية كبيرة تصل الجمجمة والعمود الفقري مع لوح الكتف.',
    origin: 'External occipital protuberance, ligamentum nuchae, and spinous processes of C7-T12.',
    originAr: 'الناشزة القذالية الخارجية، الرباط القفوي، والنواتئ الشوكية من C7 حتى T12.',
    insertion: 'Lateral third of clavicle, acromion, and spine of scapula.',
    insertionAr: 'الثلث الوحشي للترقوة، الأخرم، وشوكة لوح الكتف.',
    innervation: 'Motor: Spinal accessory nerve (Cranial Nerve XI); Sensory/proprioception: C3 and C4 nerves.',
    innervationAr: 'حركياً: العصب الإضافي الشوكي (العصب القحفي الحادي عشر CN XI)؛ وحسياً عبر C3 وC4.',
    action: 'Elevates (upper fibers), retracts (middle fibers), and depresses (lower fibers) the scapula.',
    actionAr: 'رفع لوح الكتف (الألياف العلوية)، سحب الكتف للخلف (الألياف الوسطى)، وخفضه (الألياف السفلية).',
    clinicalNote: 'Tested clinically by shrugging the shoulders against resistance (assessing CN XI).',
    clinicalNoteAr: 'تُفحص سريرياً بهز الكتفين للأعلى ضد المقاومة (لاختبار سلامة العصب القحفي الحادي عشر).',
    video: {
      id: 'vid_trapezius',
      titleEn: 'Trapezius Muscle & Spinal Accessory Nerve Exam',
      titleAr: 'تشريح العضلة شبه المنحرفة وفحص العصب القحفي الحادي عشر',
      youtubeId: 'k1W_b10N2A8',
      duration: '05:50',
      language: 'English'
    },
    questions: [
      {
        id: 'q_trapezius_1',
        question: 'Which cranial nerve provides motor supply to the Trapezius muscle?',
        options: ['Trigeminal nerve (CN V)', 'Facial nerve (CN VII)', 'Spinal accessory nerve (CN XI)', 'Vagus nerve (CN X)'],
        correctIndex: 2,
        explanation: 'Trapezius is innervated by the Spinal Accessory nerve (Cranial Nerve XI).'
      }
    ]
  },

  // 7. Sternocleidomastoid (Face & Neck)
  {
    id: 'sternocleidomastoid',
    nameEn: 'Sternocleidomastoid (SCM)',
    nameAr: 'العضلة القصية الترقوية الخشائية',
    region: 'face_neck',
    regionLabelEn: 'Face & Neck',
    regionLabelAr: 'الوجه والعنق',
    imageUrl: '/images/anatomy/sternocleidomastoid_neck.png',    imageSource: "Gray's Anatomy Plate 385 / Wikimedia Commons",    imageLicense: 'CC BY 4.0',
    imageCredit: "Muscles of the neck, anterior and lateral view (Henry Gray, 1918)",    location: 'Key landmark running obliquely across each side of the neck.',
    locationAr: 'المعلم التشريحي الأهم الممتد مائلاً عبر جانبي العنق.',
    origin: 'Sternal head: Manubrium of sternum; Clavicular head: Medial third of clavicle.',
    originAr: 'الرأس القصي: قبضة القص؛ الرأس الترقوي: الثلث الإنسي للترقوة.',
    insertion: 'Mastoid process of temporal bone and lateral superior nuchal line.',
    insertionAr: 'الناتئ الخشائي للعظم الصدغي والخط القفوي العلوي.',
    innervation: 'Motor: Spinal accessory nerve (CN XI); Proprioception: C2, C3.',
    innervationAr: 'حركياً: العصب الإضافي (CN XI)؛ حسي: C2, C3.',
    action: 'Unilateral: Rotates head to opposite side and tilts head to same side; Bilateral: Flexes the cervical neck.',
    actionAr: 'من جانب واحد: تدير الوجه للجهة المعاكسة؛ من الجانبين معاً: تعطف العنق للأمام.',
    clinicalNote: 'Key divider of the neck into Anterior and Posterior cervical triangles. Spasm causes torticollis (wry neck).',
    clinicalNoteAr: 'تقسم العنق إلى مثلث أمامي ومثلث خلفي. تشنجها يسبب الصعر (Torticollis).',
    video: {
      id: 'vid_scm',
      titleEn: 'Sternocleidomastoid & Neck Triangles Anatomy',
      titleAr: 'العضلة القصية الترقوية الخشائية ومثلثات العنق التشريحية',
      youtubeId: '3Qp0XqD3nZ0',
      duration: '06:00',
      language: 'English'
    },
    questions: [
      {
        id: 'q_scm_1',
        question: 'Unilateral contraction of the right Sternocleidomastoid produces which movement?',
        options: [
          'Rotation of the head to the left',
          'Rotation of the head to the right',
          'Neck hyperextension',
          'Elevation of the mandible'
        ],
        correctIndex: 0,
        explanation: 'Contraction of the right SCM turns the head to the opposite (left) side while tilting it to the right.'
      }
    ]
  },

  // 8. Quadriceps Femoris (Lower Limb)
  {
    id: 'quadriceps_femoris',
    nameEn: 'Quadriceps Femoris Group',
    nameAr: 'العضلة مربعة الرؤوس الفخذية',
    region: 'lower_limb',
    regionLabelEn: 'Lower Limb (Anterior Thigh)',
    regionLabelAr: 'الطرف السفلي (الفخذ الأمامي)',
    imageUrl: '/images/anatomy/quadriceps_femoris_anterior_thigh.png',    imageSource: "Gray's Anatomy Plate 430 / Wikimedia Commons",    imageLicense: 'CC BY 4.0',
    imageCredit: "Deep muscles of anterior femoral region (Henry Gray, 1918)",    location: 'Anterior compartment of the thigh; largest muscular mass of the human body.',
    locationAr: 'الحجرة الأمامية للفخذ؛ أضخم كتلة عضلية في جسم الإنسان.',
    origin: 'Rectus femoris: Anterior inferior iliac spine (AIIS); Vastus lateralis, medialis, and intermedius: Shaft and linea aspera of femur.',
    originAr: 'المستقيمة الفخذية: الشوكة الحرقفية الأمامية السفلية؛ المتسعات الثلاث: جسم وعظم الفخذ والخط الخشن.',
    insertion: 'Tibial tuberosity via the common quadriceps tendon and patellar ligament.',
    insertionAr: 'الأحدوبة الظنبوبية عبر وتر مربعة الرؤوس المشترك ورباط الرضفة.',
    innervation: 'Femoral nerve (L2, L3, L4).',
    innervationAr: 'العصب الفخذي (L2, L3, L4).',
    action: 'Chief and prime extensor of the leg at the knee joint; rectus femoris also assists in hip flexion.',
    actionAr: 'الباسط الرئيسي والأساسي للساق عند مفصل الركبة؛ والمستقيمة الفخذية تعطف مفصل الورك أيضاً.',
    clinicalNote: 'Tested via Patellar tendon reflex (Knee jerk reflex, L3-L4). Essential for standing, walking, and kicking.',
    clinicalNoteAr: 'تُفحص عبر منعكس نفضة الركبة (Patellar reflex, L3-L4). ضرورية للوقوف والمشي وصعود السلالم.',
    video: {
      id: 'vid_quads',
      titleEn: 'Quadriceps Femoris Anatomy, Patellar Reflex & Function',
      titleAr: 'تشريح مربعة الرؤوس الفخذية ومنعكس الرضفة العصبي',
      youtubeId: 'q5sE7_Z9YqA',
      duration: '07:15',
      language: 'English'
    },
    questions: [
      {
        id: 'q_quads_1',
        question: 'Which component of the Quadriceps crosses both the hip and knee joints?',
        options: ['Vastus lateralis', 'Vastus medialis', 'Rectus femoris', 'Vastus intermedius'],
        correctIndex: 2,
        explanation: 'Rectus femoris originates from the AIIS of the pelvis, making it the only head crossing both hip and knee.'
      }
    ]
  },

  // 9. Gastrocnemius (Lower Limb)
  {
    id: 'gastrocnemius',
    nameEn: 'Gastrocnemius',
    nameAr: 'العضلة التوأمية الساقية (عضلة بطة الساق)',
    region: 'lower_limb',
    regionLabelEn: 'Lower Limb (Calf)',
    regionLabelAr: 'الطرف السفلي (بطة الساق)',
    imageUrl: '/images/anatomy/gastrocnemius_calf_achilles.png',    imageSource: "Gray's Anatomy Plate 438 / Wikimedia Commons",    imageLicense: 'Public Domain',
    imageCredit: "Superficial muscles of posterior leg and calcaneal tendon (Henry Gray, 1918)",    location: 'Superficial muscle of posterior compartment of the leg (calf).',
    locationAr: 'العضلة السطحية الأكثر بروزاً في الحجرة الخلفية للساق.',
    origin: 'Lateral head: Lateral condyle of femur; Medial head: Medial condyle of femur.',
    originAr: 'الرأس الوحشي: اللقمة الوحشية للفخذ؛ الرأس الإنسي: اللقمة الإنسية للفخذ.',
    insertion: 'Posterior surface of Calcaneus via the thick Calcaneal (Achilles) tendon.',
    insertionAr: 'السطح الخلفي لعظم العقب عبر وتر أخيل (العرقوب).',
    innervation: 'Tibial nerve (S1, S2).',
    innervationAr: 'العصب الظنبوبي (S1, S2).',
    action: 'Plantarflexion of the foot at the ankle joint; assists in flexion of the knee joint.',
    actionAr: 'عطف أخمصي للقدم (Plantarflexion) عند الكاحل؛ ويساعد في عطف مفصل الركبة.',
    clinicalNote: 'Tested via Achilles tendon reflex (Ankle jerk, S1). Achilles tendon rupture causes complete inability to stand on tiptoes.',
    clinicalNoteAr: 'تُفحص بمنعكس وتر أخيل (S1). تمزق وتر أخيل يفقد القدرة على الوقوف على رؤوس الأصابع.',
    video: {
      id: 'vid_gastrocnemius',
      titleEn: 'Gastrocnemius, Soleus & Achilles Tendon Anatomy',
      titleAr: 'تشريح العضلة التوأمية ووتر أخيل ومنعكس الكاحل',
      youtubeId: '9G_H1fGg2pE',
      duration: '05:10',
      language: 'English'
    },
    questions: [
      {
        id: 'q_gastro_1',
        question: 'Which nerve innervates the Gastrocnemius muscle?',
        options: ['Deep fibular nerve', 'Tibial nerve', 'Femoral nerve', 'Obturator nerve'],
        correctIndex: 1,
        explanation: 'All superficial and deep muscles of the posterior leg, including Gastrocnemius, are innervated by the Tibial nerve.'
      }
    ]
  },

  // 10. Eye Muscles (Extraocular)
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
      youtubeId: '3Qp0XqD3nZ0',
      duration: '06:30',
      language: 'English'
    },
    questions: [
      {
        id: 'q_eye_1',
        question: 'Which cranial nerve innervates the Lateral Rectus muscle of the eye?',
        options: ['Oculomotor nerve (CN III)', 'Trochlear nerve (CN IV)', 'Abducens nerve (CN VI)', 'Optic nerve (CN II)'],
        correctIndex: 2,
        explanation: 'According to LR6 SO4 3, Lateral Rectus is innervated by the Abducens nerve (CN VI).'
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
  // ==================== 1. OSTEOLOGY (BONES & SKELETON) ====================
  {
    id: 'test_q1_femur_trochanter',
    question: 'Identify the prominent lateral quadrangular projection indicated on the proximal femur (insertion of gluteus medius & minimus):',
    questionAr: 'تعرّف على البارزة العظمية الوحشية البارزة في أعلى عظم الفخذ المشار إليها بالمؤشر (مرتكز العضلتين الإليتين الوسطى والصغرى):',
    structureTarget: 'Greater Trochanter of Femur',
    structureTargetAr: 'المدور الكبير لعظم الفخذ',
    imageUrl: '/images/anatomy/femur_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 24,
    pointerY: 14,
    pointerLabel: 'PIN 1',
    category: 'bones',
    options: [
      'Greater Trochanter of Femur',
      'Lesser Trochanter of Femur',
      'Head of Femur',
      'Intertrochanteric Line'
    ],
    correctAnswer: 'Greater Trochanter of Femur',
    explanation: 'The Greater Trochanter is the large, blunt, quadrangular projection on the lateral aspect of the proximal femur. It gives insertion to gluteus medius, gluteus minimus, and piriformis muscles.',
    explanationAr: 'المدور الكبير (Greater Trochanter) بارزة عظمية مربعة كبيرة على الوجه الوحشي لأعلى الفخذ، يرتكز عليه العضلتان الإلية الوسطى والصغرى والكمثرية.',
    clinicalPearl: 'Trochanteric bursitis causes lateral hip pain aggravated when lying on the affected side.',
    topic: 'Osteology — Lower Limb'
  },
  {
    id: 'test_q2_femur_head',
    question: 'Identify the smooth, spherical articular surface indicated on the proximal-medial femur which articulates with the acetabulum:',
    questionAr: 'تعرّف على السطح المفصلي الكروي الأملس المشار إليه في أعلى الوجه الإنسي لعظم الفخذ والذي يتمفصل مع حق الحوض:',
    structureTarget: 'Head of Femur',
    structureTargetAr: 'رأس عظم الفخذ',
    imageUrl: '/images/anatomy/femur_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 66,
    pointerY: 11,
    pointerLabel: 'PIN 2',
    category: 'bones',
    options: [
      'Head of Femur',
      'Neck of Femur',
      'Greater Trochanter',
      'Lesser Trochanter'
    ],
    correctAnswer: 'Head of Femur',
    explanation: 'The Head of the Femur forms roughly two-thirds of a sphere. It articulates with the acetabulum to form the hip joint (a ball-and-socket synovial joint). It features the fovea capitis for the ligamentum teres.',
    explanationAr: 'رأس الفخذ (Head of Femur) يشكل ثلثي كرة ملساء ويتمفصل مع الحق ليشكل مفصل الورك، وتوجد به نقرة لرأس الفخذ يمر منها رباط الرأس المدور.',
    clinicalPearl: 'Fractures of the femoral neck can disrupt retinacular vessels from the medial circumflex femoral artery, leading to avascular necrosis (AVN) of the femoral head.',
    topic: 'Osteology — Lower Limb'
  },
  {
    id: 'test_q3_humerus_greater_tubercle',
    question: 'Identify the prominent lateral landmark of the proximal humerus indicated by the pointer (insertion of three rotator cuff muscles):',
    questionAr: 'تعرّف على البارزة الوحشية في أعلى عظم العضد المشار إليها بالمؤشر (مرتكز ثلاث من عضلات الكفة المدورة):',
    structureTarget: 'Greater Tubercle of Humerus',
    structureTargetAr: 'الحديبة الكبيرة لعظم العضد',
    imageUrl: '/images/anatomy/humerus_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 34,
    pointerY: 13,
    pointerLabel: 'PIN 3',
    category: 'bones',
    options: [
      'Greater Tubercle of Humerus',
      'Lesser Tubercle of Humerus',
      'Deltoid Tuberosity',
      'Intertubercular Groove'
    ],
    correctAnswer: 'Greater Tubercle of Humerus',
    explanation: 'The Greater Tubercle is positioned laterally on the proximal humerus and bears three impressions for insertion of supraspinatus, infraspinatus, and teres minor.',
    explanationAr: 'الحديبة الكبيرة (Greater Tubercle) تقع على الجانب الوحشي لأعلى العضد، وتستقبل مرتكزات عضلات الكفة المدورة: فوق الشوك، تحت الشوك، والمدورة الصغيرة.',
    clinicalPearl: 'Avulsion of the greater tubercle occurs in severe shoulder dislocations or forceful muscle contractions.',
    topic: 'Osteology — Upper Limb'
  },
  {
    id: 'test_q4_humerus_surgical_neck',
    question: 'Identify the clinically vulnerable constriction of the proximal humerus indicated by the pointer, closely related to the Axillary Nerve:',
    questionAr: 'تعرّف على التضيق السريري الحرج في عظم العضد المشار إليه بالمؤشر، والمجاور مباشرة للعصب الإبطي:',
    structureTarget: 'Surgical Neck of Humerus',
    structureTargetAr: 'العنق الجراحي لعظم العضد',
    imageUrl: '/images/anatomy/humerus_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 52,
    pointerY: 22,
    pointerLabel: 'PIN 4',
    category: 'bones',
    options: [
      'Surgical Neck of Humerus',
      'Anatomical Neck of Humerus',
      'Deltoid Tuberosity',
      'Shaft (Diaphysis)'
    ],
    correctAnswer: 'Surgical Neck of Humerus',
    explanation: 'The Surgical Neck is the narrow region immediately inferior to the greater and lesser tubercles. Fractures here risk damaging the closely wrapped Axillary Nerve and posterior circumflex humeral vessels.',
    explanationAr: 'العنق الجراحي (Surgical Neck) منطقة متضيقة أسفل الحديبتين الكبيرة والصغيرة، وهو المكان الأكثر عرضة للكسور مع خطورة أذية العصب الإبطي.',
    clinicalPearl: 'Surgical neck fractures often present with loss of sensation over the regimental badge area of the shoulder due to axillary nerve injury.',
    topic: 'Osteology — Upper Limb'
  },
  {
    id: 'test_q5_humerus_medial_epicondyle',
    question: 'Identify the prominent medial distal projection indicated on the humerus (common flexor tendon origin; posterior groove for Ulnar Nerve):',
    questionAr: 'تعرّف على البارزة الإنسية السفلية في عظم العضد المشار إليها بالمؤشر (منشأ وتر العضلات القابضة المشترك ويمر خلفها العصب الزندي):',
    structureTarget: 'Medial Epicondyle of Humerus',
    structureTargetAr: 'اللقيمة الإنسية لعظم العضد',
    imageUrl: '/images/anatomy/humerus_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 74,
    pointerY: 88,
    pointerLabel: 'PIN 5',
    category: 'bones',
    options: [
      'Medial Epicondyle of Humerus',
      'Lateral Epicondyle of Humerus',
      'Capitulum',
      'Trochlea'
    ],
    correctAnswer: 'Medial Epicondyle of Humerus',
    explanation: 'The Medial Epicondyle is much larger and more prominent than the lateral. It gives origin to the superficial forearm flexors. The ulnar nerve passes directly behind it in the ulnar groove ("funny bone").',
    explanationAr: 'اللقيمة الإنسية (Medial Epicondyle) بارزة عظمية واضحة تعطي منشأ قابضات الساعد، ويمر خلفها مباشرة العصب الزندي في الثلم الزندي.',
    clinicalPearl: 'Golfer elbow (medial epicondylitis) causes repetitive strain pain at this common flexor origin.',
    topic: 'Osteology — Upper Limb'
  },
  {
    id: 'test_q6_skull_frontal',
    question: 'Identify the unpaired cranial bone indicated by the pointer forming the forehead, supraorbital margin, and roof of the orbits:',
    questionAr: 'تعرّف على العظم القحفي المفرد المشار إليه بالمؤشر والذي يشكل الجبهة والحافة فوق الحجاج وسقف جوف الحجاج:',
    structureTarget: 'Frontal Bone',
    structureTargetAr: 'العظم الجبهي',
    imageUrl: '/images/anatomy/skull_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 50,
    pointerY: 20,
    pointerLabel: 'PIN 6',
    category: 'bones',
    options: [
      'Frontal Bone',
      'Parietal Bone',
      'Sphenoid Bone',
      'Nasal Bone'
    ],
    correctAnswer: 'Frontal Bone',
    explanation: 'The Frontal Bone forms the forehead, the superior margins and roof of the orbits, and the anterior cranial fossa. It contains the frontal paranasal air sinuses and articulates with parietal bones at the coronal suture.',
    explanationAr: 'العظم الجبهي (Frontal Bone) يشكل الجبهة وسقف الحجاجين والحفرة القحفية الأمامية، ويحتوي على الجيوب الأنفية الجبهية.',
    clinicalPearl: 'The supraorbital foramen/notch transmits the supraorbital nerve (branch of V1) and vessels.',
    topic: 'Osteology — Skull'
  },
  {
    id: 'test_q7_skull_mandible',
    question: 'Identify the largest, strongest, and only movable bone of the adult skull indicated by the pointer:',
    questionAr: 'تعرّف على العظم الأكبر والأقوى والوحيد المتحرك في قحف البالغين المشار إليه بالمؤشر:',
    structureTarget: 'Mandible (Lower Jaw)',
    structureTargetAr: 'عظم الفك السفلي',
    imageUrl: '/images/anatomy/skull_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 50,
    pointerY: 84,
    pointerLabel: 'PIN 7',
    category: 'bones',
    options: [
      'Mandible (Lower Jaw)',
      'Maxilla',
      'Zygomatic Bone',
      'Vomer'
    ],
    correctAnswer: 'Mandible (Lower Jaw)',
    explanation: 'The Mandible consists of a horizontal body and two vertical rami. Its condylar processes articulate with temporal bones at the bilateral temporomandibular joints (TMJs).',
    explanationAr: 'الفك السفلي (Mandible) يتألف من جسم أفقي ورأدين عموديين، ويتمفصل ناتئاه اللقميان مع العظمين الصدغيين في المفصل الفكي الصدغي.',
    clinicalPearl: 'The mental foramen on the body of the mandible transmits the mental nerve (terminal V3 branch) for chin sensation.',
    topic: 'Osteology — Skull'
  },
  {
    id: 'test_q8_skull_zygomatic',
    question: 'Identify the cheekbone indicated by the pointer forming the prominence of the cheek and the inferolateral orbital wall:',
    questionAr: 'تعرّف على عظم الوجنة المشار إليه بالمؤشر والذي يشكل بروز الخد والجدار السفلي الوحشي للحجاج:',
    structureTarget: 'Zygomatic Bone',
    structureTargetAr: 'العظم الوجني',
    imageUrl: '/images/anatomy/skull_anterior_osteology.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 27,
    pointerY: 55,
    pointerLabel: 'PIN 8',
    category: 'bones',
    options: [
      'Zygomatic Bone',
      'Maxilla',
      'Temporal Bone',
      'Sphenoid Bone'
    ],
    correctAnswer: 'Zygomatic Bone',
    explanation: 'The Zygomatic Bone (malar bone) forms the prominence of the cheek and articulates with the maxilla, frontal, temporal, and sphenoid bones to complete the zygomatic arch.',
    explanationAr: 'العظم الوجني (Zygomatic Bone) يشكل بروز الخد والجزء السفلي الوحشي من محجر العين ويساهم في القوس الوجنية.',
    clinicalPearl: 'Tripod fractures (ZMC fractures) involve separation of the zygomatic bone from its frontal, maxillary, and temporal attachments.',
    topic: 'Osteology — Skull'
  },
  {
    id: 'test_q9_knee_medial_meniscus',
    question: 'Identify the C-shaped fibrocartilaginous shock absorber indicated on the superior articular surface (plateau) of the tibia:',
    questionAr: 'تعرّف على القرص الغضروفي الليفي الهلالي الشكل المشار إليه بالمؤشر على السطح المفصلي العلوي لقصبة الساق:',
    structureTarget: 'Medial Meniscus',
    structureTargetAr: 'الهلالة الإنسية للركبة',
    imageUrl: '/images/anatomy/knee_tibia_menisci_cruciate.png',
    imageSource: 'Gray Anatomy Atlas (Public Domain)',
    pointerX: 32,
    pointerY: 48,
    pointerLabel: 'PIN 9',
    category: 'bones',
    options: [
      'Medial Meniscus',
      'Lateral Meniscus',
      'Tibial Tuberosity',
      'Anterior Cruciate Ligament'
    ],
    correctAnswer: 'Medial Meniscus',
    explanation: 'The Medial Meniscus is a semicircular C-shaped fibrocartilage pad attached to the tibial collateral ligament (MCL). This firm attachment makes it less mobile and much more prone to tearing than the lateral meniscus.',
    explanationAr: 'الهلالة الإنسية (Medial Meniscus) قرص غضروفي هلالي الشكل مثبت بالرباط الجانبي الإنسي مما يقلل حركته ويزيد تعرضه للتمزق.',
    clinicalPearl: 'The Unhappy Triad involves simultaneous tearing of the ACL, MCL, and Medial Meniscus.',
    topic: 'Joints — Knee Joint'
  },
  {
    id: 'test_q10_knee_acl',
    question: 'Identify the intracapsular ligament of the knee indicated by the pointer that prevents anterior displacement of the tibia on the femur:',
    questionAr: 'تعرّف على الرباط داخل المحفظة في مفصل الركبة المشار إليه بالمؤشر والذي يمنع انزلاق قصبة الساق للأمام بالنسبة للفخذ:',
    structureTarget: 'Anterior Cruciate Ligament (ACL)',
    structureTargetAr: 'الرباط المتصالب الأمامي (ACL)',
    imageUrl: '/images/anatomy/knee_joint_interior_ligaments.png',
    imageSource: 'Visible Human Project & OpenStax',
    pointerX: 50,
    pointerY: 52,
    pointerLabel: 'PIN 10',
    category: 'bones',
    options: [
      'Anterior Cruciate Ligament (ACL)',
      'Posterior Cruciate Ligament (PCL)',
      'Fibular Collateral Ligament (LCL)',
      'Patellar Ligament'
    ],
    correctAnswer: 'Anterior Cruciate Ligament (ACL)',
    explanation: 'The ACL attaches to the anterior intercondylar area of the tibia and extends posterolaterally to the medial aspect of the lateral femoral condyle. It resists anterior tibial translation and knee hyperextension.',
    explanationAr: 'الرباط المتصالب الأمامي (ACL) ينشأ من باحة بين اللقمتين الأمامية للقصبة ويرتكز على السطح الإنسي للقمة الفخذ الوحشية، مانعاً انزلاق القصبة للأمام.',
    clinicalPearl: 'The Lachman test and Anterior Drawer test are clinical physical exams specifically assessing ACL integrity.',
    topic: 'Joints — Knee Joint'
  },

  // ==================== 2. MYOLOGY (MUSCLES & ACTIONS) ====================
  {
    id: 'test_q11_biceps',
    question: 'Identify the two-headed muscle in the anterior compartment of the arm indicated by the pointer (innervated by Musculocutaneous Nerve):',
    questionAr: 'تعرّف على العضلة ثنائية الرؤوس في الحجرة الأمامية للذراع المشار إليها بالمؤشر (المعصبة بالعصب العضلي الجلدي):',
    structureTarget: 'Biceps Brachii',
    structureTargetAr: 'العضلة ذات الرأسين العضدية',
    imageUrl: '/images/anatomy/biceps_brachii_anterior_arm.png',
    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    pointerX: 48,
    pointerY: 45,
    pointerLabel: 'PIN 11',
    category: 'muscles',
    options: [
      'Biceps Brachii',
      'Triceps Brachii',
      'Brachialis',
      'Coracobrachialis'
    ],
    correctAnswer: 'Biceps Brachii',
    explanation: 'Biceps Brachii has a long head (from supraglenoid tubercle) and a short head (from coracoid process). It inserts into the radial tuberosity and bicipital aponeurosis, functioning as a powerful supinator and flexor.',
    explanationAr: 'العضلة ذات الرأسين العضدية (Biceps Brachii) لها رأسان طويل وقصير، وترتكز على الأحدوبة الكعبرية وتعد أقوى عضلة لثني المرفق واستلقاء الساعد.',
    clinicalPearl: 'The biceps reflex tests the integrity of spinal cord segments C5 and C6 via the musculocutaneous nerve.',
    topic: 'Myology — Upper Limb'
  },
  {
    id: 'test_q12_triceps',
    question: 'Identify the three-headed muscle indicated in the posterior compartment of the arm, which serves as the chief extensor of the elbow:',
    questionAr: 'تعرّف على العضلة ثلاثية الرؤوس المشار إليها في الحجرة الخلفية للذراع، والتي تعتبر الباسطة الرئيسية لمفصل المرفق:',
    structureTarget: 'Triceps Brachii',
    structureTargetAr: 'العضلة ثلاثية الرؤوس العضدية',
    imageUrl: '/images/anatomy/triceps_brachii_posterior_arm.png',
    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    pointerX: 52,
    pointerY: 44,
    pointerLabel: 'PIN 12',
    category: 'muscles',
    options: [
      'Triceps Brachii',
      'Biceps Brachii',
      'Anconeus',
      'Brachioradialis'
    ],
    correctAnswer: 'Triceps Brachii',
    explanation: 'Triceps Brachii possesses Long, Lateral, and Medial heads that converge onto a common tendon inserting into the olecranon of the ulna. It is innervated by the Radial Nerve (C6-C8).',
    explanationAr: 'العضلة ثلاثية الرؤوس العضدية (Triceps Brachii) تتألف من ثلاثة رؤوس وترتكز على الناتئ الزجي لعظم الزند، ويعصبها العصب الكعبري.',
    clinicalPearl: 'The triceps tendon reflex tests spinal nerve roots C7 and C8.',
    topic: 'Myology — Upper Limb'
  },
  {
    id: 'test_q13_deltoid',
    question: 'Identify the multipennate shoulder muscle indicated by the pointer, primarily responsible for arm abduction from 15° to 90°:',
    questionAr: 'تعرّف على عضلة الكتف المشار إليها بالمؤشر، المسؤولة بشكل رئيسي عن تبعيد الذراع من 15° إلى 90°:',
    structureTarget: 'Deltoid Muscle',
    structureTargetAr: 'العضلة الدالية',
    imageUrl: '/images/anatomy/deltoid_shoulder_trapezius.png',
    imageSource: 'Gray Anatomy Atlas (Public Domain)',
    pointerX: 32,
    pointerY: 26,
    pointerLabel: 'PIN 13',
    category: 'muscles',
    options: [
      'Deltoid Muscle',
      'Supraspinatus',
      'Trapezius',
      'Pectoralis Major'
    ],
    correctAnswer: 'Deltoid Muscle',
    explanation: 'The Deltoid muscle forms the rounded contour of the shoulder. Its multipennate middle fibers are the prime mover for arm abduction between 15° and 90° (0-15° initiated by supraspinatus). Innervated by the Axillary Nerve.',
    explanationAr: 'العضلة الدالية (Deltoid) تغطي قمة الكتف وتبعد الذراع من 15° إلى 90° ويغذيها العصب الإبطي.',
    clinicalPearl: 'Anterior shoulder dislocation puts the axillary nerve at risk, causing paralysis of the deltoid and sensory loss over the lateral arm.',
    topic: 'Myology — Shoulder'
  },
  {
    id: 'test_q14_pectoralis',
    question: 'Identify the large fan-shaped anterior thoracic wall muscle indicated by the pointer (clavicular and sternocostal heads):',
    questionAr: 'تعرّف على العضلة المروحية الكبيرة في جدار الصدر الأمامي المشار إليها بالمؤشر (برأسيها الترقوي والقصي الضلعي):',
    structureTarget: 'Pectoralis Major',
    structureTargetAr: 'العضلة الصدرية الكبيرة',
    imageUrl: '/images/anatomy/pectoralis_major_anterior_chest.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 48,
    pointerY: 42,
    pointerLabel: 'PIN 14',
    category: 'muscles',
    options: [
      'Pectoralis Major',
      'Pectoralis Minor',
      'Serratus Anterior',
      'Subclavius'
    ],
    correctAnswer: 'Pectoralis Major',
    explanation: 'Pectoralis Major arises from the clavicle, sternum, and upper 6 costal cartilages, inserting into the lateral lip of the bicipital groove of the humerus. It adducts and medially rotates the humerus.',
    explanationAr: 'العضلة الصدرية الكبيرة (Pectoralis Major) تنشأ من الترقوة والقص والغضاريف الضلعية وترتكز على الشفة الوحشية لميزاب العضد، وتقوم بتقريب وتدوير الذراع للداخل.',
    clinicalPearl: 'Innervated by both Medial and Lateral Pectoral Nerves.',
    topic: 'Myology — Thorax'
  },
  {
    id: 'test_q15_quadriceps',
    question: 'Identify the superficial bipennate anterior thigh muscle indicated by the pointer, which crosses both the hip and knee joints:',
    questionAr: 'تعرّف على عضلة الفخذ الأمامية السطحية المشار إليها بالمؤشر، والتي تعبر مفصلي الورك والركبة معاً:',
    structureTarget: 'Rectus Femoris (Quadriceps)',
    structureTargetAr: 'العضلة المستقيمة الفخذية',
    imageUrl: '/images/anatomy/quadriceps_femoris_anterior_thigh.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 48,
    pointerY: 38,
    pointerLabel: 'PIN 15',
    category: 'muscles',
    options: [
      'Rectus Femoris (Quadriceps)',
      'Vastus Lateralis',
      'Vastus Medialis',
      'Sartorius'
    ],
    correctAnswer: 'Rectus Femoris (Quadriceps)',
    explanation: 'Rectus Femoris originates from the Anterior Inferior Iliac Spine (AIIS) and ilium above the acetabulum, making it the only quadriceps component that flexes the hip while extending the knee. Innervated by the Femoral Nerve.',
    explanationAr: 'المستقيمة الفخذية (Rectus Femoris) تنشأ من الشوكة الحرقفية الأمامية السفلية، وهي الرأس الوحيد من رباعية الرؤوس الذي يثني مفصل الورك ويبسط الركبة.',
    clinicalPearl: 'The patellar reflex (L3-L4) tests the integrity of the femoral nerve and the quadriceps muscle group.',
    topic: 'Myology — Lower Limb'
  },
  {
    id: 'test_q16_gastrocnemius',
    question: 'Identify the two-headed superficial calf muscle indicated by the pointer that inserts onto the calcaneus via the Achilles tendon:',
    questionAr: 'تعرّف على عضلة ربلة الساق السطحية ثنائية الرؤوس المشار إليها بالمؤشر والتي ترتكز على عظم العقب عبر وتر أخيل:',
    structureTarget: 'Gastrocnemius Muscle',
    structureTargetAr: 'عضلة الساق التوأمية (Gastrocnemius)',
    imageUrl: '/images/anatomy/gastrocnemius_calf_achilles.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 52,
    pointerY: 40,
    pointerLabel: 'PIN 16',
    category: 'muscles',
    options: [
      'Gastrocnemius Muscle',
      'Soleus Muscle',
      'Tibialis Anterior',
      'Peroneus Longus'
    ],
    correctAnswer: 'Gastrocnemius Muscle',
    explanation: 'Gastrocnemius arises by medial and lateral heads from the respective femoral condyles, combining with the soleus to form the triceps surae, which inserts via the thick Calcaneal (Achilles) tendon into the calcaneus.',
    explanationAr: 'العضلة التوأمية الساقية (Gastrocnemius) تنشأ برأسين من لقمتي الفخذ وتلتقي مع النعلية لتشكل وتر أخيل المسؤول عن ثني القدم الأخمصي.',
    clinicalPearl: 'The Achilles tendon reflex tests the S1 and S2 nerve roots via the Tibial Nerve.',
    topic: 'Myology — Lower Limb'
  },
  {
    id: 'test_q17_rectus_abdominis',
    question: 'Identify the paired vertical anterior abdominal muscle segmented by tendinous intersections indicated by the pointer:',
    questionAr: 'تعرّف على العضلة البطنية الأمامية العمودية المتقاطعة بانغرازات وترية المشار إليها بالمؤشر داخل غمد المستقيمة:',
    structureTarget: 'Rectus Abdominis',
    structureTargetAr: 'العضلة المستقيمة البطنية',
    imageUrl: '/images/anatomy/rectus_abdominis_sheath.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 42,
    pointerY: 46,
    pointerLabel: 'PIN 17',
    category: 'muscles',
    options: [
      'Rectus Abdominis',
      'External Oblique',
      'Internal Oblique',
      'Transversus Abdominis'
    ],
    correctAnswer: 'Rectus Abdominis',
    explanation: 'Rectus Abdominis runs vertically between the pubic crest/symphysis and the 5th-7th costal cartilages and xiphoid process, enclosed within the rectus sheath. It flexes the trunk and compresses abdominal viscera.',
    explanationAr: 'العضلة المستقيمة البطنية (Rectus Abdominis) تمتد عمودياً بين عظم العانة والغضاريف الضلعية 5-7، وتقوم بثني الجذع وزيادة الضغط داخل البطن.',
    clinicalPearl: 'Innervated by the anterior rami of lower thoracic spinal nerves (T7-T12 thoracoabdominal nerves).',
    topic: 'Myology — Abdomen'
  },
  {
    id: 'test_q18_scm',
    question: 'Identify the key muscular landmark of the neck indicated by the pointer, dividing the neck into anterior and posterior triangles:',
    questionAr: 'تعرّف على المعلم العضلي الرئيسي للعنق المشار إليه بالمؤشر، والذي يقسم العنق إلى مثلث أمامي ومثلث خلفي:',
    structureTarget: 'Sternocleidomastoid (SCM)',
    structureTargetAr: 'العضلة القصية الترقوية الخشائية (SCM)',
    imageUrl: '/images/anatomy/sternocleidomastoid_neck.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 52,
    pointerY: 44,
    pointerLabel: 'PIN 18',
    category: 'muscles',
    options: [
      'Sternocleidomastoid (SCM)',
      'Trapezius',
      'Scalenus Anterior',
      'Omohyoid'
    ],
    correctAnswer: 'Sternocleidomastoid (SCM)',
    explanation: 'The SCM originates by sternal and clavicular heads and inserts onto the mastoid process and superior nuchal line. Innervated by the Spinal Accessory Nerve (CN XI), unilateral contraction rotates the head to the opposite side.',
    explanationAr: 'القصية الترقوية الخشائية (SCM) تنشأ من القص والترقوة وترتكز على الناتئ الخشائي، يعصبها العصب اللاحق القحفي الحادي عشر (CN XI).',
    clinicalPearl: 'Congenital or spasmodic shortening of the SCM causes Torticollis (wry neck).',
    topic: 'Myology — Head & Neck'
  },
  {
    id: 'test_q19_trapezius',
    question: 'Identify the broad diamond-shaped superficial back muscle indicated by the pointer, innervated by Cranial Nerve XI:',
    questionAr: 'تعرّف على العضلة الظهرية السطحية المعينية العريضة المشار إليها بالمؤشر، والمعصبة بالعصب القحفي الحادي عشر:',
    structureTarget: 'Trapezius Muscle',
    structureTargetAr: 'العضلة شبه المنحرفة (Trapezius)',
    imageUrl: '/images/anatomy/trapezius_latissimus_back.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 35,
    pointerY: 22,
    pointerLabel: 'PIN 19',
    category: 'muscles',
    options: [
      'Trapezius Muscle',
      'Latissimus Dorsi',
      'Rhomboid Major',
      'Levator Scapulae'
    ],
    correctAnswer: 'Trapezius Muscle',
    explanation: 'The Trapezius stabilizes, elevates, retracts, and rotates the scapula. Its superior fibers elevate the pectoral girdle. Motor supply is exclusively via the Spinal Accessory Nerve (CN XI).',
    explanationAr: 'العضلة شبه المنحرفة (Trapezius) عريضة ترفع وتثبت لوح الكتف ويعصبها حركياً العصب القحفي الحادي عشر (العصب اللاحق CN XI).',
    clinicalPearl: 'Accessory nerve damage in the posterior triangle of the neck causes shoulder droop and inability to shrug the shoulder against resistance.',
    topic: 'Myology — Back'
  },

  // ==================== 3. VISCERAL ANATOMY & ORGANS ====================
  {
    id: 'test_q20_heart_left_ventricle',
    question: 'Identify the thick-walled cardiac chamber indicated by the pointer, responsible for forming the apex and pumping oxygenated blood to the body:',
    questionAr: 'تعرّف على حجرة القلب ذات الجدار العضلي السميك المشار إليها بالمؤشر، المسؤولة عن تشكيل قمة القلب وضخ الدم المؤكسج للجسم:',
    structureTarget: 'Left Ventricle',
    structureTargetAr: 'البطين الأيسر للقلب',
    imageUrl: '/images/anatomy/heart_anterior_anatomy.png',
    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    pointerX: 64,
    pointerY: 72,
    pointerLabel: 'PIN 20',
    category: 'organs',
    options: [
      'Left Ventricle',
      'Right Ventricle',
      'Right Atrium',
      'Left Atrium'
    ],
    correctAnswer: 'Left Ventricle',
    explanation: 'The Left Ventricle forms the apex of the heart, most of the left border and diaphragmatic surface. Its muscular wall is three times thicker than the right ventricle to overcome systemic vascular resistance (~120 mmHg vs ~25 mmHg).',
    explanationAr: 'البطين الأيسر (Left Ventricle) يشكل قمة القلب وجداره العضلي أسمك بثلاث مرات من البطين الأيمن ليضخ الدم لجميع أنحاء الجسم عبر الأبهر بضغط عالٍ.',
    clinicalPearl: 'The Left Anterior Descending (LAD) coronary artery is the main vessel supplying the anterior left ventricular wall and interventricular septum ("the widow maker").',
    topic: 'Visceral — Cardiovascular'
  },
  {
    id: 'test_q21_heart_ascending_aorta',
    question: 'Identify the great arterial trunk indicated by the pointer arising from the base of the left ventricle and carrying oxygenated blood:',
    questionAr: 'تعرّف على الجذع الشرياني الرئيسي المشار إليه بالمؤشر المنبثق من قاعدة البطين الأيسر والحامل للدم المؤكسج:',
    structureTarget: 'Ascending Aorta',
    structureTargetAr: 'الشريان الأبهر الصاعد (Aorta)',
    imageUrl: '/images/anatomy/heart_anterior_anatomy.png',
    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    pointerX: 52,
    pointerY: 22,
    pointerLabel: 'PIN 21',
    category: 'organs',
    options: [
      'Ascending Aorta',
      'Pulmonary Trunk',
      'Superior Vena Cava',
      'Inferior Vena Cava'
    ],
    correctAnswer: 'Ascending Aorta',
    explanation: 'The Ascending Aorta originates from the aortic orifice of the left ventricle at the level of the 3rd left costal cartilage, giving rise to right and left coronary arteries from aortic sinuses before forming the aortic arch.',
    explanationAr: 'الشريان الأبهر الصاعد (Ascending Aorta) ينبثق من البطين الأيسر ويعطي الشريانين التاجيين الأيمن والأيسر ثم يتقوس ليشكل قوس الأبهر.',
    clinicalPearl: 'Aortic dissection classically originates in the ascending aorta (Stanford Type A), presenting with sudden severe "tearing" chest pain radiating to the back.',
    topic: 'Visceral — Cardiovascular'
  },
  {
    id: 'test_q22_lungs_cardiac_notch',
    question: 'Identify the structural indentation indicated on the anterior border of the left superior pulmonary lobe accommodating the heart apex:',
    questionAr: 'تعرّف على التقعر الهيكلي المشار إليه على الحافة الأمامية للفص العلوي للرئة اليسرى والذي يستوعب قمة القلب:',
    structureTarget: 'Cardiac Notch of Left Lung',
    structureTargetAr: 'الثلمة القلبية للرئة اليسرى',
    imageUrl: '/images/anatomy/gray962_lungs_anterior.png',
    imageSource: 'Gray Anatomy Classic Atlas (Public Domain)',
    pointerX: 58,
    pointerY: 55,
    pointerLabel: 'PIN 22',
    category: 'organs',
    options: [
      'Cardiac Notch of Left Lung',
      'Horizontal Fissure',
      'Oblique Fissure',
      'Lingula of Left Lung'
    ],
    correctAnswer: 'Cardiac Notch of Left Lung',
    explanation: 'The Cardiac Notch is a pronounced indentation on the anterior border of the superior lobe of the left lung produced by the apex and left ventricle of the heart. The lingula projects immediately below it.',
    explanationAr: 'الثلمة القلبية (Cardiac Notch) تقعر مميز في الحافة الأمامية للفص العلوي للرئة اليسرى لتفسح مجالاً لبروز قمة القلب، وتليها اللسينة من الأسفل.',
    clinicalPearl: 'Pericardiocentesis is traditionally performed in the 5th intercostal space just lateral to the sternum through this bare cardiac area where lungs diverge.',
    topic: 'Visceral — Respiratory'
  },
  {
    id: 'test_q23_lungs_right_middle_lobe',
    question: 'Identify the specific pulmonary lobe indicated by the pointer, bounded by the horizontal and oblique fissures (unique to the right lung):',
    questionAr: 'تعرّف على الفص الرئوي المحدد المشار إليه بالمؤشر المحصور بين الشقين الأفقي والمائل (والذي تنفرد به الرئة اليمنى):',
    structureTarget: 'Middle Lobe of Right Lung',
    structureTargetAr: 'الفص الأوسط للرئة اليمنى',
    imageUrl: '/images/anatomy/gray962_lungs_anterior.png',
    imageSource: 'Gray Anatomy Classic Atlas (Public Domain)',
    pointerX: 30,
    pointerY: 46,
    pointerLabel: 'PIN 23',
    category: 'organs',
    options: [
      'Middle Lobe of Right Lung',
      'Superior Lobe of Left Lung',
      'Inferior Lobe of Right Lung',
      'Lingula'
    ],
    correctAnswer: 'Middle Lobe of Right Lung',
    explanation: 'The Right Lung has three lobes (Superior, Middle, Inferior) separated by horizontal and oblique fissures. The Left Lung has only two lobes (Superior, Inferior) separated by an oblique fissure.',
    explanationAr: 'الرئة اليمنى تنقسم إلى ثلاثة فصوص (علوي، أوسط، سفلي) بواسطة الشق الأفقي والمائل، بينما الرئة اليسرى تحتوي على فصين فقط.',
    clinicalPearl: 'Auscultation of the right middle lobe is performed anteriorly between the 4th and 6th intercostal spaces near the sternum.',
    topic: 'Visceral — Respiratory'
  },
  {
    id: 'test_q24_kidney_pyramid',
    question: 'Identify the triangular conical medullary structure indicated by the pointer containing collecting ducts and loops of Henle:',
    questionAr: 'تعرّف على البنية الهرمية المخروطية المشار إليها بالمؤشر في لب الكلية والمحتوية على القنوات الجامعة وعرى هنلي:',
    structureTarget: 'Renal Pyramid (Medulla)',
    structureTargetAr: 'الهرم الكلوي في اللب (Renal Pyramid)',
    imageUrl: '/images/anatomy/kidney_coronal_section.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 42,
    pointerY: 44,
    pointerLabel: 'PIN 24',
    category: 'organs',
    options: [
      'Renal Pyramid (Medulla)',
      'Renal Cortex',
      'Renal Pelvis',
      'Major Calyx'
    ],
    correctAnswer: 'Renal Pyramid (Medulla)',
    explanation: 'The Renal Medulla consists of 8 to 18 conical Renal Pyramids. The base of each pyramid faces outward toward the cortex; the apex (renal papilla) projects inward into a minor calyx.',
    explanationAr: 'أهرام الكلية (Renal Pyramids) تراكيب مخروطية في لب الكلية قاعدتها نحو القشرة وقممها (الحليمات الكلوية) تصب في الكؤوس الصغرى.',
    clinicalPearl: 'Renal papillary necrosis can occur in severe diabetes mellitus, sickle cell disease, or chronic analgesic nephropathy.',
    topic: 'Visceral — Urinary'
  },
  {
    id: 'test_q25_kidney_pelvis',
    question: 'Identify the funnel-shaped expansion indicated by the pointer formed by the confluence of major calyces, narrowing to form the ureter:',
    questionAr: 'تعرّف على التوسع القمعي المشار إليه بالمؤشر والمتشكل من التقاء الكؤوس الكلوية الكبيرة، والذي يتضيق ليصبح الحالِب:',
    structureTarget: 'Renal Pelvis',
    structureTargetAr: 'حويضة الكلية (Renal Pelvis)',
    imageUrl: '/images/anatomy/kidney_coronal_section.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 66,
    pointerY: 58,
    pointerLabel: 'PIN 25',
    category: 'organs',
    options: [
      'Renal Pelvis',
      'Minor Calyx',
      'Renal Cortex',
      'Renal Vein'
    ],
    correctAnswer: 'Renal Pelvis',
    explanation: 'The Renal Pelvis is the dilated proximal end of the ureter residing in the renal sinus. It collects urine from the 2-3 major calyces and tapers at the ureteropelvic junction (UPJ) to become the ureter.',
    explanationAr: 'حويضة الكلية (Renal Pelvis) تجويف قمعي يجمع البول من الكؤوس الكلوية الكبيرة ويتضيق عند الوصل الحويضي الحالبي ليتحول إلى الحالب.',
    clinicalPearl: 'The ureteropelvic junction (UPJ) is the most common site of congenital ureteral obstruction in pediatric urology.',
    topic: 'Visceral — Urinary'
  },
  {
    id: 'test_q26_stomach_fundus',
    question: 'Identify the dome-shaped superior portion of the stomach indicated by the pointer, which lies in contact with the left dome of the diaphragm:',
    questionAr: 'تعرّف على الجزء العلوي المقبب للمعدة المشار إليه بالمؤشر، والذي يلامس قبة الحجاب الحاجز اليسرى ويظهر كفقاعة غازية في الأشعة:',
    structureTarget: 'Fundus of Stomach',
    structureTargetAr: 'قاع المعدة (Gastric Fundus)',
    imageUrl: '/images/anatomy/stomach_duodenum_anatomy.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 64,
    pointerY: 22,
    pointerLabel: 'PIN 26',
    category: 'organs',
    options: [
      'Fundus of Stomach',
      'Pylorus',
      'Cardia',
      'Duodenal Bulb'
    ],
    correctAnswer: 'Fundus of Stomach',
    explanation: 'The Fundus is the dome-shaped superior region of the stomach that rises above the level of the cardiac orifice. It is typically filled with swallowed gas, visible as the gastric bubble on upright chest radiographs.',
    explanationAr: 'قاع المعدة (Fundus) الجزء العلوي المقبب الذي يعلو مستوى مدخل الفؤاد، ويكون ممتلئاً بالغازات الطبيعية التي تظهر في صورة الصدر الشعاعية.',
    clinicalPearl: 'Hiatal hernia occurs when the fundus or gastroesophageal junction herniates superiorly through the esophageal hiatus into the posterior mediastinum.',
    topic: 'Visceral — Gastrointestinal'
  },
  {
    id: 'test_q27_brain_corpus_callosum',
    question: 'Identify the prominent C-shaped commissural white matter tract indicated in this midsagittal section connecting both cerebral hemispheres:',
    questionAr: 'تعرّف على الحزمة الصوارية البيضاء المقوسة المشار إليها في هذا المقطع السهمي المنصف للدماغ والتي تربط نصفي الكرة المخية:',
    structureTarget: 'Corpus Callosum',
    structureTargetAr: 'الجسم الثفني (Corpus Callosum)',
    imageUrl: '/images/anatomy/brain_midsagittal_section.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 52,
    pointerY: 38,
    pointerLabel: 'PIN 27',
    category: 'organs',
    options: [
      'Corpus Callosum',
      'Fornix',
      'Pons',
      'Cerebellum'
    ],
    correctAnswer: 'Corpus Callosum',
    explanation: 'The Corpus Callosum is the largest brain commissure, containing over 200 million myelinated axonal fibers connecting homologous neocortical areas between the left and right cerebral hemispheres.',
    explanationAr: 'الجسم الثفني (Corpus Callosum) أكبر صوار عصبي في الدماغ يتألف من مئات الملايين من الألياف الميالينية لربط نصفي المخ وتنسيق وظائفهما.',
    clinicalPearl: 'Surgical corpus callosotomy (split-brain surgery) has historically been performed to prevent the interhemispheric spread of intractable epileptic seizures.',
    topic: 'Visceral — Nervous System'
  },
  {
    id: 'test_q28_brain_cerebellum',
    question: 'Identify the structure in the posterior cranial fossa indicated by the pointer with arbor vitae, responsible for motor coordination and balance:',
    questionAr: 'تعرّف على البنية الموجودة في الحفرة القحفية الخلفية المشار إليها بالمؤشر (المخيخ) والمسؤولة عن التنسيق الحركي والاتزان الدقيق:',
    structureTarget: 'Cerebellum',
    structureTargetAr: 'المخيخ (Cerebellum)',
    imageUrl: '/images/anatomy/brain_midsagittal_section.png',
    imageSource: 'OpenStax Anatomy (CC BY 4.0)',
    pointerX: 68,
    pointerY: 68,
    pointerLabel: 'PIN 28',
    category: 'organs',
    options: [
      'Cerebellum',
      'Pons',
      'Medulla Oblongata',
      'Thalamus'
    ],
    correctAnswer: 'Cerebellum',
    explanation: 'The Cerebellum coordinates voluntary muscular activity, fine motor control, posture, and equilibrium. It sits in the posterior cranial fossa inferior to the tentorium cerebelli and dorsal to the pons and medulla.',
    explanationAr: 'المخيخ (Cerebellum) يقع في الحفرة القحفية الخلفية خلف الجسر والبصلة، ومسؤول عن ضبط دقة الحركات وتوازن القامة والمشي.',
    clinicalPearl: 'Cerebellar lesions produce ipsilateral signs: ataxia, dysmetria (past-pointing), dysdiadochokinesia, and intention tremor.',
    topic: 'Visceral — Nervous System'
  },

  // ==================== 4. PLANES & JOINTS ====================
  {
    id: 'test_q29_synovial_pivot',
    question: 'Identify the type of synovial joint indicated by the pointer (e.g. Atlantoaxial joint C1-C2) which permits rotation around a single central longitudinal axis:',
    questionAr: 'تعرّف على نوع المفصل الزليلي المشار إليه بالمؤشر (مثل المفصل الفهقي المحوري C1-C2) والذي يسمح بالدوران حول محور طولي مفرد:',
    structureTarget: 'Pivot Joint (Trochoid)',
    structureTargetAr: 'مفصل مداري / محوري (Pivot Joint)',
    imageUrl: '/images/anatomy/synovial_joints_types_openstax.jpg',
    imageSource: 'OpenStax Plate 914 (Types of Synovial Joints)',
    pointerX: 25,
    pointerY: 16,
    pointerLabel: 'PIN 29',
    category: 'planes_joints',
    options: [
      'Pivot Joint (Trochoid)',
      'Hinge Joint',
      'Ball and Socket Joint',
      'Saddle Joint'
    ],
    correctAnswer: 'Pivot Joint (Trochoid)',
    explanation: 'A Pivot (trochoid) joint consists of a central rounded bony process turning within a ring formed partly by bone and partly by a ligament, permitting uniaxial rotation (e.g. Atlantoaxial joint, Proximal radioulnar joint).',
    explanationAr: 'المفصل المداري (Pivot Joint) يتألف من محور عظمي يدور داخل حلقة ليفية عظمية ويسمح بحركة دورانية أحادية المحور (كالمفصل الفهقي المحوري لتدوير الرأس).',
    clinicalPearl: 'Pronation and supination of the forearm occur through pivot joints at the proximal and distal radioulnar joints.',
    topic: 'Joints — Synovial Types'
  },
  {
    id: 'test_q30_synovial_ball_socket',
    question: 'Identify the multiaxial synovial joint classification indicated by the pointer permitting the greatest range of movement in all planes (e.g. Hip & Shoulder):',
    questionAr: 'تعرّف على تصنيف المفصل الزليلي متعدد المحاور المشار إليه بالمؤشر والذي يوفر أوسع مدى حركة في جميع المستويات (مثل مفصلي الورك والكتف):',
    structureTarget: 'Ball and Socket Joint',
    structureTargetAr: 'مفصل كروي حقي (Ball and Socket)',
    imageUrl: '/images/anatomy/synovial_joints_types_openstax.jpg',
    imageSource: 'OpenStax Plate 914 (Types of Synovial Joints)',
    pointerX: 75,
    pointerY: 84,
    pointerLabel: 'PIN 30',
    category: 'planes_joints',
    options: [
      'Ball and Socket Joint',
      'Condyloid Joint',
      'Plane Joint',
      'Hinge Joint'
    ],
    correctAnswer: 'Ball and Socket Joint',
    explanation: 'A Ball-and-Socket (spheroidal) joint consists of a globular head fitting into a cup-like cavity. It is multiaxial and allows flexion, extension, abduction, adduction, medial/lateral rotation, and circumduction.',
    explanationAr: 'المفصل الكروي الحقي (Ball and Socket) يتألف من رأس كروي داخل تجويف حقي، وهو متعدد المحاور يسمح بالثني والبسط والتبعيد والتقريب والدوران الشامل.',
    clinicalPearl: 'The glenohumeral joint trades bony stability for range of motion, whereas the acetabulofemoral (hip) joint prioritizes stability and weight transmission.',
    topic: 'Joints — Synovial Types'
  },
  {
    id: 'test_q31_coronal_plane',
    question: 'Identify the vertical anatomical section plane indicated by the pointer that divides the body into Anterior (front) and Posterior (back) portions:',
    questionAr: 'تعرّف على المستوى التشريحي الرأسي المشار إليه بالمؤشر والذي يقسم الجسم إلى قسمين أمامي (Anterior) وخلفي (Posterior):',
    structureTarget: 'Coronal (Frontal) Plane',
    structureTargetAr: 'المستوى الإكليلي / الجبهي (Coronal Plane)',
    imageUrl: '/images/anatomy/anatomical_planes_diagram.svg',
    imageSource: 'LAB HUB Anatomical Standard Vectors',
    pointerX: 50,
    pointerY: 28,
    pointerLabel: 'PIN 31',
    category: 'planes_joints',
    options: [
      'Coronal (Frontal) Plane',
      'Midsagittal (Median) Plane',
      'Transverse (Axial) Plane',
      'Oblique Plane'
    ],
    correctAnswer: 'Coronal (Frontal) Plane',
    explanation: 'The Coronal (Frontal) Plane is a longitudinal vertical plane perpendicular to the sagittal plane that divides the body or organ into anterior (ventral) and posterior (dorsal) sections.',
    explanationAr: 'المستوى الإكليلي أو الجبهي (Coronal Plane) مستوى رأسي عمودي على المستوى السهمي يقسم الجسم إلى جزأين أمامي وخلفي.',
    clinicalPearl: 'CT and MRI coronal reconstructions are standard imaging planes used to assess bilateral symmetry in the brain, thorax, and pelvis.',
    topic: 'Anatomical Planes'
  },
  {
    id: 'test_q32_directional_superior',
    question: 'Identify the standard directional term indicated by the upward pointer referring to a structure located closer to the head or vertex:',
    questionAr: 'تعرّف على المصطلح التوجيهي القياسي المشار إليه بالسهم الصاعد للأعلى والذي يعني التوضع الأقرب إلى الرأس أو القمة:',
    structureTarget: 'Superior (Cranial)',
    structureTargetAr: 'الاتجاه العلوي / القحفي (Superior / Cranial)',
    imageUrl: '/images/anatomy/directional_terms_diagram.svg',
    imageSource: 'LAB HUB Directional Standard Vectors',
    pointerX: 50,
    pointerY: 22,
    pointerLabel: 'PIN 32',
    category: 'planes_joints',
    options: [
      'Superior (Cranial)',
      'Inferior (Caudal)',
      'Posterior (Dorsal)',
      'Distal'
    ],
    correctAnswer: 'Superior (Cranial)',
    explanation: 'Superior (Cranial or Cephalic) describes a position toward the head end of the body or higher than another structure (e.g. the heart is superior to the diaphragm).',
    explanationAr: 'المصطلح التوجيهي العلوي (Superior / Cranial) يعني باتجاه قمة الرأس أو أعلى بالنسبة لبنية تشريحية أخرى (كالقلب علوي بالنسبة للحجاب الحاجز).',
    clinicalPearl: 'In neuroanatomy, "rostral" (toward the beak/nose) is often used synonymously with superior or anterior depending on the neural axis bend.',
    topic: 'Directional Terminology'
  }
];
