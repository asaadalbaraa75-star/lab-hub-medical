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
  imageUrl: string;
  imageSource: string;
  imageCredit: string;
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
  imageUrl: string;
  imageSource: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
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
    imageUrl: '/images/anatomy/deltoid_shoulder_trapezius.png',    imageSource: "Gray's Anatomy Plate 409 / Wikimedia Commons",    imageLicense: 'Public Domain',
    imageCredit: "Superficial muscles of neck and back (Henry Gray, 1918)",    location: 'Large diamond-shaped superficial back muscle connecting the skull, spine, and shoulder girdle.',
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
    imageUrl: '/images/anatomy/anatomical_planes_diagram.svg',    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    imageCredit: 'OpenStax College, Rice University',
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
    imageUrl: '/images/anatomy/directional_terms_diagram.svg',    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax College',
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
    imageUrl: '/images/anatomy/body_movements_diagram.svg',    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax / Rice University',
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
    imageUrl: '/images/anatomy/skull_anterior_osteology.png',    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax College',
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
    imageUrl: '/images/anatomy/femur_anterior_osteology.png',    imageSource: 'NIH Visible Human / OpenStax',
    imageCredit: 'National Library of Medicine & OpenStax',
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

  // 6. JOINTS: Types of Joints
  {
    id: 'lesson_joints',
    titleEn: 'Joints & Articulations',
    titleAr: 'المفاصل وتصنيفاتها',
    category: 'joints',
    categoryLabelEn: 'Joints',
    categoryLabelAr: 'المفاصل',
    descriptionEn: 'Structural classification of joints: Fibrous, Cartilaginous, and Synovial joints.',
    descriptionAr: 'التصنيف البنيوي للمفاصل: ليفية (غير متحركة)، غضروفية، وزليلية (حرة الحركة).',
    keyPoints: [
      'Fibrous Joints (Synarthroses): Immovable joints joined by dense collagen (e.g. cranial sutures).',
      'Cartilaginous Joints (Amphiarthroses): Slightly movable joints united by cartilage (e.g. pubic symphysis, intervertebral discs).',
      'Synovial Joints (Diarthroses): Freely movable joints characterized by a fluid-filled joint cavity, articular cartilage, and capsule.'
    ],
    keyPointsAr: [
      'المفاصل الليفية: عديمة الحركة، ملتحمة بألياف كولاجينية كثيفة مثل دروز الجمجمة.',
      'المفاصل الغضروفية: محدودة الحركة، ترتبط بغضروف مثل الارتفاق العاني والأقراص بين الفقرات.',
      'المفاصل الزليلية: حرة الحركة، تتميز بجوف مفصلي يحتوي على السائل الزليلي، غضروف مفصلي، ومحفظة مفصلية.'
    ],
    imageUrl: '/images/anatomy/knee_joint_interior_ligaments.png',
    imageSource: "Gray's Anatomy Plate 348 / Synovial Knee Joint & Ligaments",
    imageCredit: 'Right knee joint interior, cruciate ligaments, and menisci (Henry Gray, 1918)',
    video: {
      titleEn: 'Types of Joints in the Human Body',
      titleAr: 'أنواع المفاصل في جسم الإنسان وتصنيفها',
      youtubeId: 'k1W_b10N2A8',
      duration: '05:25'
    },
    practiceQuestion: {
      question: 'Which of the following is an example of a Synovial joint?',
      options: ['Cranial suture', 'Knee joint', 'Pubic symphysis', 'Tooth in socket (Gomphosis)'],
      correctIndex: 1,
      explanation: 'The knee joint is a complex synovial joint with a synovial cavity and free movement.'
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
    descriptionEn: 'Central Nervous System (Brain and Spinal cord) and Peripheral Nervous System (12 pairs of cranial nerves and 31 pairs of spinal nerves).',
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
    imageUrl: '/images/anatomy/brain_midsagittal_section.png',    imageSource: 'NIH Visible Human Project / OpenStax',
    imageCredit: 'National Library of Medicine & OpenStax',
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
      'Left Ventricular wall is 3 times thicker than right ventricular wall to pump blood against systemic systemic vascular resistance.'
    ],
    keyPointsAr: [
      'الحجرات الأربع: الأذين الأيمن (يستقبل الدم الوريدي من الوريدين الأجوفين)، البطين الأيمن، الأذين الأيسر (يستقبل الأوردة الرئوية الأربعة)، والبطين الأيسر.',
      'الصمامات: مثلث الشرف (بين الأذين والبطين الأيمن)، الإكليلي/ثنائي الشرف (بين الأذين والبطين الأيسر)، والصمامان الهلاليان الرئوي والأبهري.',
      'جدار البطين الأيسر أثخن بثلاث مرات من البطين الأيمن ليضخ الدم للجسم كاملاً تحت ضغط عالٍ.'
    ],
    imageUrl: '/images/anatomy/heart_anterior_anatomy.png',    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax / Rice University',
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

  // 9. ORGAN SYSTEMS: Respiratory System
  {
    id: 'lesson_respiratory',
    titleEn: 'The Respiratory System & Lungs',
    titleAr: 'الجهاز التنفسي وتشريح الرئتين',
    category: 'organ_systems',
    categoryLabelEn: 'Organ Systems',
    categoryLabelAr: 'أجهزة الأعضاء',
    descriptionEn: 'Trachea, bronchial tree, right and left lung lobes, and pulmonary hilum anatomy.',
    descriptionAr: 'الرغامي، الشجرة القصبية، فصوص الرئتين اليمنى واليسرى، وسرة الرئة.',
    keyPoints: [
      'Right Lung: 3 lobes (Superior, Middle, Inferior) separated by horizontal and oblique fissures.',
      'Left Lung: 2 lobes (Superior, Inferior) separated by oblique fissure; features cardiac notch and lingula.',
      'Right Primary Bronchus is wider, shorter, and more vertical than left, making inhaled foreign bodies lodge there more frequently.'
    ],
    keyPointsAr: [
      'الرئة اليمنى: تتكون من 3 فصوص (علوي، متوسط، سفلي) يفصل بينها شقان أفقي ومائل.',
      'الرئة اليسرى: تتكون من فصين (علوي وسفلي) يفصل بينهما شق مائل؛ وتحتوي على الثلمة القلبية واللسينة.',
      'القصبة الهوائية اليمنى أوسع وأقصر وأكثر استقامة عمودياً؛ لذا تستقر الأجسام الأجنبية المستنشقة فيها غالباً.'
    ],
    imageUrl: '/images/anatomy/lungs_bronchial_tree.png',    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax College',
    video: {
      titleEn: 'Lungs & Tracheobronchial Tree Anatomy',
      titleAr: 'تشريح الرئتين والشجرة القصبية والفروق بين الرئتين',
      youtubeId: 'b_7i0E4wH0I',
      duration: '05:40'
    },
    practiceQuestion: {
      question: 'How many lobes are present in the anatomical right lung?',
      options: ['Two lobes', 'Three lobes', 'Four lobes', 'One lobe'],
      correctIndex: 1,
      explanation: 'The right lung has three lobes: superior, middle, and inferior.'
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
    imageUrl: '/images/anatomy/stomach_duodenum_anatomy.png',    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax College',
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
      'Renal Hilum Arrangement (from anterior to posterior): Renal Vein -> Renal Artery -> Renal Pelvis (V-A-U).',
      'Ureter has 3 anatomical constrictions where kidney stones easily lodge: PUJ, pelvic brim crossing, and VUJ.'
    ],
    keyPointsAr: [
      'الكليتان عضوان خلف البريتوان بين الفقرتين T12 وL3؛ الكلية اليمنى أخفض قليلاً لوجود الكبد فوقها.',
      'ترتيب سرة الكلية من الأمام للخلف (قاعدة V-A-U): الوريد الكلوي أولاً، ثم الشريان الكلوي، ثم حويضة الكلية خلفاً.',
      'للحالب 3 تضيقات تشريحية تنحشر عندها حصيات الكلية: الموصل الحويضي الحالبي، عبور حافة الحوض، والموصل الحالبي المثاني.'
    ],
    imageUrl: '/images/anatomy/kidney_coronal_section.png',    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax College',
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
    imageUrl: '/images/anatomy/female_pelvis_anatomy.png',    imageSource: 'OpenStax Anatomy & Physiology',
    imageCredit: 'OpenStax / Rice University',
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
    titleEn: 'Lungs & Tracheobronchial Arborization',
    titleAr: 'الرئتان والشجرة الرغامية القصبية',
    category: 'Respiratory',
    imageUrl: '/images/anatomy/lungs_bronchial_tree.png',    source: 'OpenStax Anatomy & Physiology',
    license: 'CC BY 4.0',
    credit: 'OpenStax College',
    description: 'Trachea bifurcating at the carina into right and left primary bronchi, and lobar anatomy of right and left lungs.',
    keyStructures: ['Trachea', 'Carina', 'Right bronchus (shorter & wider)', 'Left bronchus', 'Pulmonary fissures']
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
  {
    id: 'test_q1_biceps',
    question: 'Identify the muscle indicated by the cursor in the anterior arm compartment.',
    questionAr: 'حدد العضلة المشار إليها في الحجرة الأمامية للذراع.',
    structureTarget: 'Biceps Brachii',
    imageUrl: '/images/anatomy/biceps_brachii_anterior_arm.png',    imageSource: 'OpenStax Anatomy & Physiology (CC BY 4.0)',
    options: [
      'Triceps brachii',
      'Biceps brachii',
      'Brachioradialis',
      'Coracobrachialis'
    ],
    correctAnswer: 'Biceps brachii',
    explanation: 'The Biceps Brachii is the prominent two-headed muscle occupying the anterior arm compartment, innervated by the musculocutaneous nerve.',
    topic: 'Muscles — Upper Limb'
  },
  {
    id: 'test_q2_femur',
    question: 'Identify the bone and the marked proximal prominence shown in this specimen.',
    questionAr: 'حدد العظم والبارزة القريبة المشار إليها في هذه الصورة.',
    structureTarget: 'Greater trochanter of Femur',
    imageUrl: '/images/anatomy/femur_anterior_osteology.png',    imageSource: 'OpenStax Anatomy & Physiology / NIH Archive',
    options: [
      'Greater tubercle of humerus',
      'Greater trochanter of femur',
      'Tibial tuberosity',
      'Olecranon of ulna'
    ],
    correctAnswer: 'Greater trochanter of femur',
    explanation: 'The specimen displays the proximal femur; the large, quadrangular prominence on the lateral aspect is the Greater Trochanter, insertion site for gluteus medius and minimus.',
    topic: 'Skeletal System — Major Bones'
  },
  {
    id: 'test_q3_deltoid',
    question: 'Identify the triangular shoulder muscle shown here, innervated by the Axillary nerve.',
    questionAr: 'حدد العضلة المثلثية للكتف المعصبة بالعصب الإبطي.',
    structureTarget: 'Deltoid Muscle',
    imageUrl: '/images/anatomy/deltoid_shoulder_trapezius.png',    imageSource: 'Gray Anatomy Classic Atlas (Public Domain)',
    options: [
      'Trapezius',
      'Deltoid',
      'Pectoralis major',
      'Latissimus dorsi'
    ],
    correctAnswer: 'Deltoid',
    explanation: 'The Deltoid muscle forms the rounded muscular contour of the shoulder and is innervated by the Axillary nerve (C5, C6).',
    topic: 'Muscles — Upper Limb'
  },
  {
    id: 'test_q4_knee_acl',
    question: 'In this anterior knee dissection, identify the cruciate ligament preventing anterior translation of the tibia.',
    questionAr: 'في تشريح الركبة هذا، حدد الرباط المتصالب الذي يمنع انزلاق الظنبوب للأمام.',
    structureTarget: 'Anterior Cruciate Ligament (ACL)',
    imageUrl: '/images/anatomy/knee_joint_interior_ligaments.png',    imageSource: 'Visible Human Project & OpenStax',
    options: [
      'Posterior cruciate ligament (PCL)',
      'Anterior cruciate ligament (ACL)',
      'Fibular collateral ligament (LCL)',
      'Patellar ligament'
    ],
    correctAnswer: 'Anterior cruciate ligament (ACL)',
    explanation: 'The Anterior Cruciate Ligament (ACL) originates from the anterior intercondylar area of the tibia and attaches to the lateral femoral condyle, preventing anterior tibial translation.',
    topic: 'Joints — Knee Joint'
  },
  {
    id: 'test_q5_heart_valve',
    question: 'Identify the cardiac chamber highlighted on the left side of this coronal heart section.',
    questionAr: 'حدد حجرة القلب ذات الجدار العضلي السميك المشار إليها في هذا المقطع.',
    structureTarget: 'Left Ventricle',
    imageUrl: '/images/anatomy/heart_anterior_anatomy.png',    imageSource: 'OpenStax Anatomy & Physiology',
    options: [
      'Right atrium',
      'Right ventricle',
      'Left ventricle',
      'Left atrium'
    ],
    correctAnswer: 'Left ventricle',
    explanation: 'The Left Ventricle is easily distinguished by its thick muscular myocardium (3 times thicker than the right) and apex formation.',
    topic: 'Organ Systems — Cardiovascular'
  },
  {
    id: 'test_q6_kidney_hilum',
    question: 'In the Renal Hilum, which structure is located most anteriorly?',
    questionAr: 'في سرة الكلية، أي تركيب يتوضع في أقصى الأمام؟',
    structureTarget: 'Renal Vein',
    imageUrl: '/images/anatomy/kidney_coronal_section.png',    imageSource: 'OpenStax Anatomy & Physiology',
    options: [
      'Renal pelvis',
      'Renal artery',
      'Renal vein',
      'Ureter'
    ],
    correctAnswer: 'Renal vein',
    explanation: 'From anterior to posterior at the renal hilum, the order is: Renal Vein, Renal Artery, and Renal Pelvis (V-A-P). Thus, the vein is most anterior.',
    topic: 'Organ Systems — Urinary'
  }
];
