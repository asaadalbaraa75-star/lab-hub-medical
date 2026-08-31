import {
  User,
  LabSubjectInfo,
  Practical,
  SpotterItem,
  Quiz,
  ScheduleItem,
  Announcement,
  NotificationItem,
  FileAsset,
  StudentProgress,
  BiochemistryTestItem
} from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'usr_student_1',
    name: 'Sarah Al-Mansoor',
    email: 'student@med.edu',
    studentId: 'MED-2026-4891',
    role: 'student',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Faculty of Medicine — 2nd Year MBBS',
    year: 'Year 2 (Pre-Clinical)',
    enrolledLabs: ['anatomy', 'histology', 'bacteriology', 'biochemistry']
  },
  {
    id: 'usr_instructor_1',
    name: 'Dr. Tariq Vance, MD, MSc',
    email: 'instructor@med.edu',
    studentId: 'FAC-MED-104',
    role: 'instructor',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    department: 'Department of Anatomy & Histology',
    year: 'Senior Teaching Faculty',
    enrolledLabs: ['anatomy', 'histology', 'bacteriology', 'biochemistry']
  },
  {
    id: 'usr_admin_1',
    name: 'Prof. Eleanor Hayes, MD, FRCPath',
    email: 'admin@med.edu',
    studentId: 'ADM-MED-001',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813680-79883506ecf5?w=150&auto=format&fit=crop&q=80',
    department: 'Academic Directorate & Laboratory Board',
    year: 'Dean of Medical Laboratory Curricula',
    enrolledLabs: ['anatomy', 'histology', 'bacteriology', 'biochemistry']
  }
];

export const LAB_SUBJECTS: LabSubjectInfo[] = [
  {
    id: 'anatomy',
    name: 'Anatomy Lab',
    code: 'ANAT-201',
    tagline: 'Gross Anatomy, Osteology & Dissection',
    description: 'Explore bones, muscles, joints, anatomical structures, models and practical identification.',
    heroImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1200&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
    icon: 'Bone',
    colorAccent: '#5B9BD5',
    totalPracticals: 14,
    completedPracticals: 11,
    categories: [
      {
        id: 'anat_bones',
        labId: 'anatomy',
        title: 'BONES',
        shortDesc: 'Explore bones and anatomical landmarks.',
        iconName: 'Bone',
        imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&auto=format&fit=crop&q=80',
        practicalCount: 4,
        spotterCount: 24,
        quizCount: 5
      },
      {
        id: 'anat_muscles',
        labId: 'anatomy',
        title: 'MUSCLES',
        shortDesc: 'Explore major muscles, origins and attachments.',
        iconName: 'Activity',
        imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80',
        practicalCount: 3,
        spotterCount: 18,
        quizCount: 4
      },
      {
        id: 'anat_joints',
        labId: 'anatomy',
        title: 'JOINTS',
        shortDesc: 'Explore synovial joints, ligaments and movements.',
        iconName: 'Move3d',
        imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 12,
        quizCount: 3
      },
      {
        id: 'anat_structures',
        labId: 'anatomy',
        title: 'ANATOMICAL STRUCTURES',
        shortDesc: 'Identify neurovascular bundles and organ relations.',
        iconName: 'GitMerge',
        imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
        practicalCount: 3,
        spotterCount: 20,
        quizCount: 3
      },
      {
        id: 'anat_models',
        labId: 'anatomy',
        title: 'MODELS',
        shortDesc: 'Explore high-fidelity practical anatomical models.',
        iconName: 'Box',
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 15,
        quizCount: 2
      },
      {
        id: 'anat_practicals',
        labId: 'anatomy',
        title: 'PRACTICALS',
        shortDesc: 'View all scheduled Anatomy practical curriculum sessions.',
        iconName: 'BookOpen',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
        practicalCount: 14,
        spotterCount: 45,
        quizCount: 8
      },
      {
        id: 'anat_images',
        labId: 'anatomy',
        title: 'IMAGES',
        shortDesc: 'Review high-resolution labeled anatomical dissections.',
        iconName: 'Image',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
        practicalCount: 6,
        spotterCount: 30,
        quizCount: 4
      },
      {
        id: 'anat_spotter',
        labId: 'anatomy',
        title: 'SPOTTER',
        shortDesc: 'Practice timed anatomy pin identification questions.',
        iconName: 'Target',
        imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80',
        practicalCount: 0,
        spotterCount: 40,
        quizCount: 6
      },
      {
        id: 'anat_quiz',
        labId: 'anatomy',
        title: 'QUIZ',
        shortDesc: 'Test your clinical anatomy and gross relations mastery.',
        iconName: 'CheckSquare',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
        practicalCount: 0,
        spotterCount: 0,
        quizCount: 10
      }
    ]
  },
  {
    id: 'histology',
    name: 'Histology Lab',
    code: 'HIST-202',
    tagline: 'Microscopic Anatomy, Tissues & Cell Biology',
    description: 'Explore microscopic slides, tissues, cells, identification points and spotter questions.',
    heroImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    icon: 'Microscope',
    colorAccent: '#5FAFA8',
    totalPracticals: 12,
    completedPracticals: 8,
    categories: [
      {
        id: 'hist_microscope',
        labId: 'histology',
        title: 'MICROSCOPE',
        shortDesc: 'Learn light microscope calibration and slide observation.',
        iconName: 'Microscope',
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80',
        practicalCount: 1,
        spotterCount: 8,
        quizCount: 2
      },
      {
        id: 'hist_cells',
        labId: 'histology',
        title: 'CELLS',
        shortDesc: 'Study cytoplasmic organelles and cellular ultrastructure.',
        iconName: 'CircleDot',
        imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 14,
        quizCount: 3
      },
      {
        id: 'hist_epithelial',
        labId: 'histology',
        title: 'EPITHELIAL TISSUE',
        shortDesc: 'Identify simple, stratified and transitional epithelia.',
        iconName: 'Layers',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 20,
        quizCount: 4
      },
      {
        id: 'hist_connective',
        labId: 'histology',
        title: 'CONNECTIVE TISSUE',
        shortDesc: 'Study loose, dense, cartilage, bone and adipose matrix.',
        iconName: 'Share2',
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 18,
        quizCount: 3
      },
      {
        id: 'hist_muscle',
        labId: 'histology',
        title: 'MUSCLE TISSUE',
        shortDesc: 'Identify skeletal, cardiac and smooth muscle histology.',
        iconName: 'Activity',
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 22,
        quizCount: 4
      },
      {
        id: 'hist_nervous',
        labId: 'histology',
        title: 'NERVOUS TISSUE',
        shortDesc: 'Study neurons, glial cells, peripheral nerves and ganglia.',
        iconName: 'Zap',
        imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 16,
        quizCount: 3
      },
      {
        id: 'hist_slides',
        labId: 'histology',
        title: 'HISTOLOGICAL SLIDES',
        shortDesc: 'Explore high-magnification whole slide digitized scans.',
        iconName: 'SlidersHorizontal',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
        practicalCount: 12,
        spotterCount: 35,
        quizCount: 6
      },
      {
        id: 'hist_spotter',
        labId: 'histology',
        title: 'SPOTTER',
        shortDesc: 'Practice slide identification under standard H&E staining.',
        iconName: 'Target',
        imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80',
        practicalCount: 0,
        spotterCount: 38,
        quizCount: 5
      },
      {
        id: 'hist_quiz',
        labId: 'histology',
        title: 'QUIZ',
        shortDesc: 'Test histological feature differentiation and staining.',
        iconName: 'CheckSquare',
        imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
        practicalCount: 0,
        spotterCount: 0,
        quizCount: 8
      }
    ]
  },
  {
    id: 'bacteriology',
    name: 'Bacteriology Lab',
    code: 'BACT-203',
    tagline: 'Medical Microbiology, Cultures & Diagnostic Staining',
    description: 'Explore bacteria, samples, culture media, laboratory tests and observations.',
    heroImage: 'https://images.unsplash.com/photo-1583912267670-6575ad4736f6?w=1200&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1583912267670-6575ad4736f6?w=800&auto=format&fit=crop&q=80',
    icon: 'Bug',
    colorAccent: '#6FAF8F',
    totalPracticals: 10,
    completedPracticals: 9,
    categories: [
      {
        id: 'bact_bacteria',
        labId: 'bacteriology',
        title: 'BACTERIA',
        shortDesc: 'Explore pathogenic Gram-positive and Gram-negative species.',
        iconName: 'Bug',
        imageUrl: 'https://images.unsplash.com/photo-1583912267670-6575ad4736f6?w=600&auto=format&fit=crop&q=80',
        practicalCount: 3,
        spotterCount: 25,
        quizCount: 4
      },
      {
        id: 'bact_samples',
        labId: 'bacteriology',
        title: 'SAMPLES',
        shortDesc: 'Explore specimen collection, transport and safety protocols.',
        iconName: 'TestTube',
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 12,
        quizCount: 2
      },
      {
        id: 'bact_media',
        labId: 'bacteriology',
        title: 'CULTURE MEDIA',
        shortDesc: 'Explore selective, differential and enriched agar plates.',
        iconName: 'Disc',
        imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 16,
        quizCount: 3
      },
      {
        id: 'bact_tests',
        labId: 'bacteriology',
        title: 'TESTS',
        shortDesc: 'Explore Catalase, Coagulase, Oxidase and biochemical assays.',
        iconName: 'FlaskConical',
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 18,
        quizCount: 3
      },
      {
        id: 'bact_observations',
        labId: 'bacteriology',
        title: 'OBSERVATIONS',
        shortDesc: 'Explore colony morphology, hemolysis patterns and pigments.',
        iconName: 'Eye',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop&q=80',
        practicalCount: 2,
        spotterCount: 15,
        quizCount: 2
      },
      {
        id: 'bact_practicals',
        labId: 'bacteriology',
        title: 'PRACTICALS',
        shortDesc: 'View all diagnostic Bacteriology curriculum practicals.',
        iconName: 'BookOpen',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
        practicalCount: 10,
        spotterCount: 40,
        quizCount: 6
      },
      {
        id: 'bact_images',
        labId: 'bacteriology',
        title: 'IMAGES',
        shortDesc: 'Review microscopic stains, oil immersion fields and colonies.',
        iconName: 'Image',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
        practicalCount: 4,
        spotterCount: 26,
        quizCount: 3
      },
      {
        id: 'bact_spotter',
        labId: 'bacteriology',
        title: 'SPOTTER',
        shortDesc: 'Practice rapid diagnostic microbiology spotter stations.',
        iconName: 'Target',
        imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80',
        practicalCount: 0,
        spotterCount: 30,
        quizCount: 4
      },
      {
        id: 'bact_quiz',
        labId: 'bacteriology',
        title: 'QUIZ',
        shortDesc: 'Test antimicrobial sensitivity and bacterial taxonomy.',
        iconName: 'CheckSquare',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
        practicalCount: 0,
        spotterCount: 0,
        quizCount: 7
      }
    ]
  },
  {
    id: 'biochemistry',
    name: 'Biochemistry Lab',
    code: 'BIO-204',
    tagline: 'Carbohydrate Identification Tests',
    description: 'Carbohydrate Identification Tests',
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&auto=format&fit=crop&q=80',
    cardImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    icon: 'FlaskConical',
    colorAccent: '#D97706',
    totalPracticals: 6,
    completedPracticals: 0,
    categories: [
      {
        id: 'bio_molisch',
        labId: 'biochemistry',
        title: "MOLISCH'S TEST",
        shortDesc: 'Carbohydrates dehydrated by H₂SO₄ form furfural/hydroxymethylfurfural condensing with α-naphthol.',
        iconName: 'FlaskConical',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
        practicalCount: 1,
        spotterCount: 0,
        quizCount: 0
      },
      {
        id: 'bio_iodine',
        labId: 'biochemistry',
        title: 'IODINE TEST',
        shortDesc: 'Iodine forms a blue complex with amylose (starch).',
        iconName: 'TestTube',
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        practicalCount: 1,
        spotterCount: 0,
        quizCount: 0
      },
      {
        id: 'bio_barfoed',
        labId: 'biochemistry',
        title: "BARFOED'S TEST",
        shortDesc: 'Monosaccharides reduce cupric ions in acidic medium to cuprous oxide rapidly.',
        iconName: 'FlaskConical',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop&q=80',
        practicalCount: 1,
        spotterCount: 0,
        quizCount: 0
      },
      {
        id: 'bio_seliwanoff',
        labId: 'biochemistry',
        title: "SELIWANOFF'S TEST",
        shortDesc: 'Ketoses dehydrate rapidly in acidic medium to form hydroxymethylfurfural.',
        iconName: 'TestTube',
        imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop&q=80',
        practicalCount: 1,
        spotterCount: 0,
        quizCount: 0
      },
      {
        id: 'bio_benedict',
        labId: 'biochemistry',
        title: "BENEDICT'S TEST",
        shortDesc: 'Reducing sugars reduce cupric ions in alkaline medium forming colored precipitate.',
        iconName: 'FlaskConical',
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80',
        practicalCount: 1,
        spotterCount: 0,
        quizCount: 0
      },
      {
        id: 'bio_fehling',
        labId: 'biochemistry',
        title: "FEHLING'S TEST",
        shortDesc: 'Reducing sugars reduce cupric hydroxide to red cuprous oxide precipitate upon heating.',
        iconName: 'TestTube',
        imageUrl: 'https://images.unsplash.com/photo-1583912267670-6575ad4736f6?w=600&auto=format&fit=crop&q=80',
        practicalCount: 1,
        spotterCount: 0,
        quizCount: 0
      }
    ]
  }
];

export const BIOCHEMISTRY_CARBOHYDRATE_TESTS: BiochemistryTestItem[] = [
  {
    id: 'molisch',
    testNumber: 1,
    title: "MOLISCH'S TEST",
    reagents: [
      '2 drops α-naphthol',
      '1 ml concentrated H₂SO₄ (added carefully along the side of the test tube)'
    ],
    principle:
      'Carbohydrates are dehydrated by H₂SO₄ to form furfural or hydroxymethylfurfural which condenses with α-naphthol to give a violet ring.',
    positive: 'Violet ring at the interface',
    negative: 'No violet ring'
  },
  {
    id: 'iodine',
    testNumber: 2,
    title: 'IODINE TEST',
    reagents: ['2 drops iodine solution (I₂/KI)'],
    principle: 'Iodine forms a blue complex with amylose (starch).',
    positive: 'Blue / blue-black color (Starch)',
    negative: 'No blue color'
  },
  {
    id: 'barfoed',
    testNumber: 3,
    title: "BARFOED'S TEST",
    reagents: [
      "Barfoed's reagent",
      'Heat in boiling water bath for 2–3 min'
    ],
    principle:
      'Monosaccharides reduce cupric ions in acidic medium to cuprous oxide (brick-red precipitate) rapidly, while disaccharides react slowly or not at all.',
    positive: 'Brick-red precipitate (Monosaccharide)',
    negative: 'No brick-red precipitate (Disaccharide)'
  },
  {
    id: 'seliwanoff',
    testNumber: 4,
    title: "SELIWANOFF'S TEST",
    reagents: ["1 ml Seliwanoff's reagent"],
    principle:
      'Ketoses dehydrate rapidly in acidic medium to form hydroxymethylfurfural which condenses with resorcinol to give a cherry-red color, while aldoses react slowly or not at all.',
    positive: 'Cherry-red color (Ketose)',
    negative: 'No cherry-red color (Aldose)'
  },
  {
    id: 'benedict',
    testNumber: 5,
    title: "BENEDICT'S TEST",
    reagents: [
      "Benedict's reagent",
      'Heat in boiling water bath for 3–5 min'
    ],
    principle:
      'Reducing sugars reduce cupric ions in alkaline medium to cuprous oxide forming a colored precipitate (green, yellow, orange, or brick-red).',
    positive: 'Green / Yellow / Orange / Brick-red precipitate (Reducing sugar)',
    negative: 'Blue solution (No precipitate, Non-reducing sugar)'
  },
  {
    id: 'fehling',
    testNumber: 6,
    title: "FEHLING'S TEST",
    reagents: [
      "Equal parts Fehling's A and Fehling's B",
      'Heat in boiling water bath'
    ],
    principle:
      'Reducing sugars reduce cupric ions to red cuprous oxide precipitate in alkaline medium upon heating.',
    positive: 'Red / reddish-brown precipitate (Reducing sugar)',
    negative: 'No red precipitate (Solution remains blue, Non-reducing sugar)'
  }
];

export const INITIAL_PRACTICALS: Practical[] = [
  {
    id: 'prac_hist_05',
    courseId: 'histology',
    categoryId: 'hist_muscle',
    practicalNumber: 5,
    title: 'Muscle Tissue',
    subTitle: 'Histological Identification of Skeletal, Cardiac & Smooth Muscle Fibers',
    estimatedTime: '45 mins',
    version: '2.1',
    lastUpdated: 'Aug 24, 2026',
    status: 'published',
    authorName: 'Dr. Tariq Vance, MD',
    authorRole: 'Senior Histology Faculty',
    approvedBy: 'Prof. Eleanor Hayes, MD',
    approvalDate: 'Aug 25, 2026',
    learningObjectives: [
      'Differentiate the microscopic morphology of Skeletal, Cardiac, and Smooth muscle tissues under H&E stain.',
      'Identify cross-striations, sarcomeric banding (A-bands and I-bands), and multinucleated peripheral nuclei in skeletal muscle fibers.',
      'Recognize intercalated discs, branching fibers, and central nuclei in cardiac myocytes under 400x magnification.',
      'Distinguish spindle-shaped smooth muscle cells with corkscrew-like nuclei in non-striated involuntary tissue.',
      'Correlate muscle histology with clinical entities including Duchenne Muscular Dystrophy, Myocardial Infarction, and Leiomyoma.'
    ],
    beforeTheLab: {
      previousKnowledge: [
        'General cell biology and cytoskeleton filament architecture (Actin and Myosin).',
        'Basic tissue classification (Epithelium vs Connective vs Muscle vs Nerve).',
        'Light microscope operation and Koehler illumination adjustment.'
      ],
      recommendedReading: [
        "Junqueira's Basic Histology: Text & Atlas (16th Ed.), Chapter 10: Muscle Tissue, pp. 195-218.",
        'Wheater’s Functional Histology (7th Ed.), Section 6: Muscle, pp. 112-129.'
      ],
      preparationChecklist: [
        { id: 'chk_h5_1', text: 'Read Junqueira Chapter 10 summary on contractile apparatus' },
        { id: 'chk_h5_2', text: 'Watch the 6-minute pre-lab video on identifying intercalated discs' },
        { id: 'chk_h5_3', text: 'Review standard H&E staining characteristics of sarcoplasm' },
        { id: 'chk_h5_4', text: 'Complete the pre-lab diagnostic quiz' }
      ],
      preLabSummary: 'Muscular tissue consists of elongated cells specialized for contraction. Sarcoplasm contains abundant acidophilic contractile proteins giving it an intense pink/red stain with eosin. Focus on: (1) Nuclear position (peripheral vs central), (2) Striations (present vs absent), and (3) Fiber architecture (branching vs parallel vs spindle).'
    },
    equipment: [
      {
        id: 'eq_hist_1',
        name: 'Binocular Compound Microscope',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&auto=format&fit=crop&q=80',
        description: 'Olympus CX23 with 4x, 10x, 40x and 100x oil-immersion objectives and LED Koehler illuminator.',
        safetyNotes: 'Always carry with two hands; never use coarse focus adjustment at 40x or 100x.'
      },
      {
        id: 'eq_hist_2',
        name: 'Histological Slide Set (Set H-05)',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=300&auto=format&fit=crop&q=80',
        description: 'Standard glass slides containing tongue (skeletal), heart wall (cardiac), and urinary bladder/jejunum (smooth muscle) stained with Hematoxylin & Eosin (H&E).',
        safetyNotes: 'Handle glass slides by edges; notify instructor immediately if cracked.'
      },
      {
        id: 'eq_hist_3',
        name: 'Immersion Oil & Lens Tissue',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&auto=format&fit=crop&q=80',
        description: 'High-viscosity Type A immersion oil with specialized lint-free optical lens cleaning paper.',
        safetyNotes: 'Use optical solvent only with approved lens paper to protect objective coatings.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Initial Scanner Overview (4x Objective)',
        description: 'Mount Slide H-05A (Skeletal Muscle / Tongue). Focus on the muscular layer under 4x magnification. Identify the fascicular architecture bounded by connective tissue perimysium.',
        cautionNote: 'Ensure slide cover slip faces upward.'
      },
      {
        stepNumber: 2,
        title: 'Detailed Cellular Examination (40x High Power)',
        description: 'Rotate nosepiece to 40x objective. In longitudinal section (LS), observe cylindrical unbranched fibers with alternating dark A-bands (anisotropic) and light I-bands (isotropic). Locate multiple elongated nuclei situated strictly at the periphery just beneath the sarcolemma.',
        cautionNote: 'Use only fine focus knob to avoid smashing the glass slide.'
      },
      {
        stepNumber: 3,
        title: 'Examine Cardiac Muscle (Slide H-05B)',
        description: 'Switch to the cardiac muscle slide. Note the branching anastomosing fibers, single centrally placed oval nucleus per myocyte, and transverse eosinophilic step-like lines representing intercalated discs.',
        cautionNote: 'Intercalated discs appear as darker transverse zig-zag bands; increase condenser contrast slightly.'
      },
      {
        stepNumber: 4,
        title: 'Examine Smooth Muscle (Slide H-05C - Intestinal Wall)',
        description: 'Locate the muscularis externa of the small intestine. Note tightly packed, spindle-shaped (fusiform) cells with no striations. The single centrally located nucleus appears elongated with blunted ends (cigar-shaped) in relaxed state.',
        cautionNote: 'Do not confuse smooth muscle with dense regular collagenous connective tissue.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
        caption: 'Skeletal muscle longitudinal section (LS) showing prominent cross-striations and peripheral nuclei (H&E, 400x).',
        magnification: '400x',
        stainOrView: 'H&E Stain'
      },
      {
        url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80',
        caption: 'Cardiac muscle showing branching fibers, central nuclei and dark intercalated discs.',
        magnification: '400x',
        stainOrView: 'Iron Hematoxylin / H&E'
      },
      {
        url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80',
        caption: 'Smooth muscle in circular and longitudinal layers of muscularis externa.',
        magnification: '200x',
        stainOrView: 'H&E Stain'
      }
    ],
    interactiveImages: [
      {
        id: 'inter_hist_m1',
        title: 'Interactive Skeletal Muscle Slide (LS & XS)',
        baseImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
        magnification: '400x High Power Field',
        stainOrView: 'Hematoxylin & Eosin (H&E)',
        description: 'Click the numbered circular pins to inspect the sarcolemma, striations, peripheral nuclei, and endomysial capillary networks.',
        pins: [
          {
            id: 'pin_h1',
            x: 28,
            y: 35,
            label: '1',
            structureName: 'Peripheral Multinucleated Nuclei',
            histologicalFeatures: 'Flattened, heterochromatic nuclei situated immediately beneath the sarcolemma. True syncytial feature distinguishing skeletal muscle from all other muscle types.',
            clinicalSignificance: 'Centralization of nuclei in skeletal muscle fibers is a classic hallmark of muscular dystrophies and regenerative myopathies.',
            stain: 'Basophilic (Dark Purple Hematoxylin)'
          },
          {
            id: 'pin_h2',
            x: 52,
            y: 48,
            label: '2',
            structureName: 'A-Band & I-Band Cross Striations',
            histologicalFeatures: 'Alternating anisotropic (A-bands, dark, myosin filaments) and isotropic (I-bands, light, actin filaments bisected by Z-discs). Reflects paracrystalline sarcomere alignment.',
            clinicalSignificance: 'Titin and nebulin protein mutations disrupt sarcomeric registration leading to familial skeletal and dilated cardiomyopathies.',
            stain: 'Acidophilic Eosin (Pink/Red)'
          },
          {
            id: 'pin_h3',
            x: 75,
            y: 65,
            label: '3',
            structureName: 'Endomysium & Capillary Bed',
            histologicalFeatures: 'Delicate loose connective tissue layer containing reticular fibers, fibroblasts, and continuous capillaries wrapping individual muscle fibers.',
            clinicalSignificance: 'Endomysial autoantibodies (EMA) and anti-tTG are key diagnostic markers in Celiac Disease; inflammatory infiltrates occur in Polymyositis.',
            stain: 'Light Pink / Reticulin'
          },
          {
            id: 'pin_h4',
            x: 18,
            y: 72,
            label: '4',
            structureName: 'Perimysium Septum',
            histologicalFeatures: 'Denser collagenous sheath binding groups of 10 to 100 muscle fibers into distinct functional fascicles.',
            clinicalSignificance: 'Site of primary perifascicular atrophy characteristically seen in Dermatomyositis.',
            stain: 'Collagen Pink'
          }
        ]
      }
    ],
    videoLecture: {
      title: 'Muscle Histology Identification Masterclass',
      duration: '14:20',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      instructorName: 'Dr. Tariq Vance, MD',
      chapters: [
        { time: '00:00', title: 'Introduction & Muscle Classification' },
        { time: '02:45', title: 'Skeletal Muscle Striation & Peripheral Nuclei' },
        { time: '06:15', title: 'Cardiac Muscle & Intercalated Discs' },
        { time: '09:50', title: 'Smooth Muscle vs Dense Connective Tissue' },
        { time: '12:30', title: 'High-Yield Spotter Exam Tips' }
      ]
    },
    identificationPoints: [
      'SKELETAL MUSCLE: Long cylindrical fibers, NO branching, transverse striations, MULTIPLE PERIPHERAL nuclei.',
      'CARDIAC MUSCLE: Branching anastomosing fibers, transverse striations, SINGLE CENTRAL nucleus, dark INTERCALATED DISCS.',
      'SMOOTH MUSCLE: Spindle-shaped (fusiform) cells, NO striations, SINGLE CENTRAL elongated (cigar-shaped) nucleus, tightly bundled.'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing smooth muscle with dense regular collagenous connective tissue (e.g. tendon).',
        correction: 'Smooth muscle nuclei are inside the cell body (cigar-shaped with rounded ends), whereas tendon fibroblast nuclei are outside compressed fibers and appear intensely condensed.',
        whyItMatters: 'Extremely common trap in histology practical exams and pathology biopsies.'
      },
      {
        mistake: 'Looking for striations at 4x or 10x magnification.',
        correction: 'Striations require at least 40x high power with proper condenser aperture and Koehler illumination adjustment.',
        whyItMatters: 'Wastes critical exam time if searching at low power.'
      },
      {
        mistake: 'Mistaking a cross-section of cardiac muscle passing through the peripheral sarcoplasm as non-nucleated.',
        correction: 'Because the single nucleus is central, cross-sections cutting near the cell poles will not catch the nucleus.',
        whyItMatters: 'Analyze multiple adjacent cells in cross-section rather than a single isolated circle.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Duchenne Muscular Dystrophy (DMD) & Myocardial Infarction',
      pathophysiology: 'In DMD, mutations in the dystrophin gene lead to sarcolemmal fragility during contraction, calcium influx, myonecrosis, and replacement of muscle fibers with fibrofatty tissue. In myocardial infarction, coagulative necrosis of cardiac myocytes occurs with loss of cross-striations, hypereosinophilia, and neutrophilic infiltration.',
      clinicalPresentation: 'Progressive muscle weakness in young boys (Gowers sign, pseudohypertrophy of calves) in DMD. Crushing substernal chest pain and elevated cardiac troponin in acute MI.',
      diagnosticPearls: 'Biopsy reveals hypercontracted rounded fibers, wide fiber diameter variation, and endomysial fibrosis.'
    },
    safety: {
      biosafetyLevel: 'BSL-1 (Fixed Histological Specimen)',
      hazards: [
        'Glass slide breakage hazard',
        'Chemical exposure from xylene/clearing agent residue if improperly cured',
        'Ergonomic strain during prolonged microscopy'
      ],
      ppeRequired: [
        'Standard medical laboratory coat',
        'Nitrile gloves when handling oil and solvents',
        'Safety glasses or optical splash shield'
      ],
      emergencyProtocol: 'In case of broken slide glass, notify the laboratory demonstrator immediately. Use forceps and dustpan — NEVER pick up shards by bare hands. Deposit glass in the designated biohazard sharps container.'
    },
    references: [
      {
        title: "Junqueira's Basic Histology: Text and Atlas",
        authors: 'Anthony L. Mescher',
        editionOrYear: '16th Edition (2021)',
        pages: 'pp. 195–218'
      },
      {
        title: 'Histology: A Text and Atlas with Correlated Cell and Molecular Biology',
        authors: 'Wojciech Pawlina & Michael H. Ross',
        editionOrYear: '8th Edition (2020)',
        pages: 'pp. 340–378'
      },
      {
        title: 'Wheater’s Functional Histology: A Text and Colour Atlas',
        authors: 'Geraldine O’Dowd et al.',
        editionOrYear: '7th Edition (2023)',
        pages: 'pp. 112–135'
      }
    ],
    quizId: 'quiz_hist_05',
    spotterIds: ['spot_hist_1', 'spot_hist_2']
  },
  {
    id: 'prac_anat_02',
    courseId: 'anatomy',
    categoryId: 'anat_bones',
    practicalNumber: 2,
    title: 'Upper Limb Osteology — Scapula & Humerus',
    subTitle: 'Anatomical Landmarks, Muscular Attachments & Clinical Fracture Sites',
    estimatedTime: '50 mins',
    version: '1.4',
    lastUpdated: 'Aug 20, 2026',
    status: 'published',
    authorName: 'Dr. Tariq Vance, MD',
    authorRole: 'Senior Anatomy Faculty',
    approvedBy: 'Prof. Eleanor Hayes, MD',
    approvalDate: 'Aug 21, 2026',
    learningObjectives: [
      'Identify all major osteological landmarks of the Scapula (Acromion, Coracoid process, Glenoid cavity, Spine, Supraspinous & Infraspinous fossae).',
      'Identify the surgical vs anatomical neck, greater & lesser tubercles, bicipital groove, and deltoid tuberosity of the Humerus.',
      'Determine the anatomical side (left vs right) of dry scapula and humerus bones in under 30 seconds.',
      'Map the rotator cuff muscle insertions (Supraspinatus, Infraspinatus, Teres Minor, Subscapularis).',
      'Correlate humeral fracture locations with associated nerve injuries (Surgical neck -> Axillary nerve; Midshaft -> Radial nerve; Supracondylar -> Median nerve).'
    ],
    beforeTheLab: {
      previousKnowledge: [
        'Anatomical planes and positional terminology (anterior, posterior, medial, lateral, proximal, distal).',
        'Principles of synovial ball-and-socket glenohumeral joint mechanics.'
      ],
      recommendedReading: [
        "Moore's Clinically Oriented Anatomy (9th Ed.), Chapter 6: Upper Limb, pp. 680-715.",
        'Netter Atlas of Human Anatomy (8th Ed.), Plates 405-412.'
      ],
      preparationChecklist: [
        { id: 'chk_a2_1', text: 'Review rotator cuff mnemonic (SITS)' },
        { id: 'chk_a2_2', text: 'Study the three borders and three angles of the scapula' },
        { id: 'chk_a2_3', text: 'Practice bone side-determination rule for the humerus' }
      ],
      preLabSummary: 'The scapula is a flat triangular bone on the posterolateral aspect of the thorax. The humerus is the largest bone of the upper limb. Master the bony landmarks as they serve as attachment points for 17 muscles on the scapula alone!'
    },
    equipment: [
      {
        id: 'eq_anat_1',
        name: 'Dry Human Osteology Specimen (Scapula & Humerus)',
        image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&auto=format&fit=crop&q=80',
        description: 'Authentic anatomical bone specimens with preserved foramina and muscular impression markings.',
        safetyNotes: 'Handle with clean dry hands over padded examination trays; avoid dropping fragile bone processes.'
      },
      {
        id: 'eq_anat_2',
        name: 'Pointer & Calibrated Osteometric Board',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&auto=format&fit=crop&q=80',
        description: 'Blunt stainless steel anatomical pointer for non-damaging landmark identification.',
        safetyNotes: 'Never use sharp metal probes on genuine dry bone specimens.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Side Determination of the Scapula',
        description: 'Hold the scapula such that the Glenoid cavity faces laterally, the prominent Spine is posterior and superior, and the smooth concave Subscapular fossa faces anteriorly toward the ribs.'
      },
      {
        stepNumber: 2,
        title: 'Landmarks of the Scapula',
        description: 'Palpate the Acromion process continuing from the spine. Identify the beak-like Coracoid process pointing anterolaterally. Note the suprascapular notch medially on the superior border (bridged by superior transverse scapular ligament).'
      },
      {
        stepNumber: 3,
        title: 'Side Determination of the Humerus',
        description: 'Place the hemispherical Head superiorly and directed medially. Place the deep Olecranon fossa posteriorly at the distal end. The lesser tubercle faces anteriorly.'
      },
      {
        stepNumber: 4,
        title: 'Trace Nerve Pathways Along Humeral Shaft',
        description: 'Trace the radial (spiral) groove winding obliquely around the posterior midshaft. Observe the groove for the ulnar nerve behind the medial epicondyle (the funny bone).'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
        caption: 'Anterior and posterior osteological views of the human right scapula.',
        magnification: 'Gross Specimen',
        stainOrView: 'Dry Bone Anatomy'
      },
      {
        url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
        caption: 'Humerus proximal landmarks: Greater tubercle, lesser tubercle, intertubercular sulcus.',
        magnification: 'Gross Specimen',
        stainOrView: 'Dry Bone Anatomy'
      }
    ],
    interactiveImages: [
      {
        id: 'inter_anat_1',
        title: 'Interactive Right Scapula (Posterior View)',
        baseImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1000&auto=format&fit=crop&q=80',
        magnification: 'Gross Osteology',
        stainOrView: 'Posterior Aspect',
        description: 'Click the pins to review scapular landmarks, rotator cuff insertions, and neurovascular relations.',
        pins: [
          {
            id: 'pin_a1',
            x: 25,
            y: 20,
            label: '1',
            structureName: 'Acromion Process',
            histologicalFeatures: 'Large, flat quadrilateral bony projection continuing laterally from the scapular spine. Articulates with the clavicle at the acromioclavicular (AC) joint.',
            clinicalSignificance: 'Type III hooked acromion is strongly associated with subacromial impingement syndrome and rotator cuff tears.'
          },
          {
            id: 'pin_a2',
            x: 45,
            y: 18,
            label: '2',
            structureName: 'Supraspinatus Fossa',
            histologicalFeatures: 'Depression superior to the spine of the scapula. Gives origin to the Supraspinatus muscle.',
            clinicalSignificance: 'Supraspinatus initiates abduction of the arm (first 0-15 degrees); most commonly torn rotator cuff tendon.'
          },
          {
            id: 'pin_a3',
            x: 75,
            y: 35,
            label: '3',
            structureName: 'Glenoid Cavity & Supraglenoid Tubercle',
            histologicalFeatures: 'Shallow pear-shaped articular surface deepened by fibrocartilaginous glenoid labrum. Origin of the long head of biceps brachii.',
            clinicalSignificance: 'SLAP tear (Superior Labrum Anterior to Posterior) involves the biceps anchor at this landmark.'
          },
          {
            id: 'pin_a4',
            x: 50,
            y: 60,
            label: '4',
            structureName: 'Infraspinatus Fossa',
            histologicalFeatures: 'Large triangular depression occupying lower two-thirds of dorsal surface. Origin of Infraspinatus (powerful lateral rotator of the shoulder).',
            clinicalSignificance: 'Innervated by the Suprascapular nerve (C5, C6) passing through the spinoglenoid notch.'
          }
        ]
      }
    ],
    identificationPoints: [
      'SCAPULA: Glenoid cavity is lateral, Spine is posterior/superior, Subscapular fossa is anterior.',
      'HUMERUS: Head is proximal/medial, Olecranon fossa is distal/posterior, Bicipital groove is anterior.',
      'ROTATOR CUFF INSERTIONS: Subscapularis -> Lesser tubercle; Supraspinatus, Infraspinatus, Teres minor (S-I-T) -> Greater tubercle facets (superior, middle, inferior).'
    ],
    commonMistakes: [
      {
        mistake: 'Confusing Anatomical Neck with Surgical Neck of the Humerus.',
        correction: 'Anatomical neck is the slight constriction immediately around the articular head; Surgical neck is distal to the tubercles and is the most common site of fracture.',
        whyItMatters: 'Surgical neck fractures endanger the Axillary nerve and Posterior Circumflex Humeral artery.'
      },
      {
        mistake: 'Flipping left and right scapula by confusing the anterior and posterior surfaces.',
        correction: 'The prominent ridge (Spine) is ALWAYS on the posterior back side; the smooth concave surface faces the ribs.',
        whyItMatters: 'Failing side-determination results in complete loss of marks on practical spotter stations.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Humeral Fractures & Associated Peripheral Nerve Palsies (ARM Mnemonic)',
      pathophysiology: 'Proximity of major nerves to the humerus makes specific fracture sites vulnerable: Surgical neck -> Axillary nerve (Deltoid paralysis, loss of shoulder abduction, sensation loss over regimental badge area); Midshaft shaft -> Radial nerve (Wrist drop, loss of forearm/wrist/finger extension); Medial epicondyle / Supracondylar -> Ulnar / Median nerve.',
      clinicalPresentation: 'Patient presenting with wrist drop following humerus shaft trauma (Holstein-Lewis fracture).',
      diagnosticPearls: 'Always test radial nerve motor (wrist extension) and sensory (first dorsal web space) function after humeral trauma.'
    },
    safety: {
      biosafetyLevel: 'BSL-1 (Clean Osteological Specimen)',
      hazards: ['Fragile dry bone edge fractures', 'Pinch hazard if mounting on skeleton stands'],
      ppeRequired: ['Laboratory coat', 'Examination gloves'],
      emergencyProtocol: 'Clean any debris with provided brush. Return bone to padded box immediately after completion.'
    },
    references: [
      {
        title: "Moore's Clinically Oriented Anatomy",
        authors: 'Arthur F. Dalley & Anne M. R. Agur',
        editionOrYear: '9th Edition (2022)',
        pages: 'pp. 680–725'
      },
      {
        title: "Gray's Anatomy for Students",
        authors: 'Richard Drake, A. Wayne Vogl, Adam W. M. Mitchell',
        editionOrYear: '5th Edition (2023)',
        pages: 'pp. 650–695'
      }
    ],
    quizId: 'quiz_anat_02',
    spotterIds: ['spot_anat_1', 'spot_anat_2']
  },
  {
    id: 'prac_bact_03',
    courseId: 'bacteriology',
    categoryId: 'bact_tests',
    practicalNumber: 3,
    title: 'Gram Staining & Bacterial Morphology',
    subTitle: 'Differential Staining Protocol for Peptidoglycan Cell Wall Differentiation',
    estimatedTime: '40 mins',
    version: '3.0',
    lastUpdated: 'Aug 22, 2026',
    status: 'published',
    authorName: 'Dr. Tariq Vance, MD',
    authorRole: 'Senior Microbiology Faculty',
    approvedBy: 'Prof. Eleanor Hayes, MD',
    approvalDate: 'Aug 23, 2026',
    learningObjectives: [
      'Master the 4-step Gram Staining differential protocol (Crystal Violet, Iodine, 95% Ethyl Alcohol Decolorizer, Safranin Counterstain).',
      'Explain the biochemical mechanism of differential staining based on peptidoglycan thickness and outer membrane lipopolysaccharides.',
      'Differentiate Gram-Positive Cocci in clusters (Staphylococci) vs chains (Streptococci) vs Gram-Negative Bacilli (Enterobacteriaceae).',
      'Operate the 100x oil-immersion objective with proper focal plane navigation and immersion oil application.',
      'Troubleshoot common staining artifacts: Over-decolorization, thick smear precipitation, and old culture Gram-variable false results.'
    ],
    beforeTheLab: {
      previousKnowledge: [
        'Bacterial cell envelope ultrastructure (Gram-positive thick peptidoglycan + teichoic acid vs Gram-negative thin peptidoglycan + LPS lipid bilayer).',
        'Aseptic technique, Bunsen burner safety, and inoculation loop heat sterilization.'
      ],
      recommendedReading: [
        "Murray's Medical Microbiology (9th Ed.), Chapter 3: Bacterial Cell Wall Architecture, pp. 12-25.",
        'Jawetz, Melnick & Adelberg’s Medical Microbiology (28th Ed.), Chapter 2: Cell Structure, pp. 10-38.'
      ],
      preparationChecklist: [
        { id: 'chk_b3_1', text: 'Memorize the exact timing for each of the 4 Gram stain reagents' },
        { id: 'chk_b3_2', text: 'Review Bunsen burner cone zones for proper loop heat fixing' },
        { id: 'chk_b3_3', text: 'Understand the mechanism of acetone-alcohol lipid dissolution' }
      ],
      preLabSummary: 'Gram staining divides the entire bacterial kingdom into two diagnostic classes. Crystal violet stains all cells purple; Iodine acts as a mordant forming CV-I complexes; 95% Ethanol dissolves lipid-rich Gram-negative outer membranes allowing dye wash out; Safranin counterstains Gram-negative cells pink/red.'
    },
    equipment: [
      {
        id: 'eq_bact_1',
        name: 'Gram Stain Reagent Kit',
        image: 'https://images.unsplash.com/photo-1583912267670-6575ad4736f6?w=300&auto=format&fit=crop&q=80',
        description: 'Kit bottles: Crystal Violet (1 min), Gram’s Iodine (1 min), 95% Ethyl Alcohol / Acetone Decolorizer (10-15 sec), Safranin (1 min), Wash bottle with distilled H2O.',
        safetyNotes: 'Crystal violet and safranin cause persistent skin and clothing stains; wear nitrile gloves.'
      },
      {
        id: 'eq_bact_2',
        name: 'Bunsen Burner & Nichrome Inoculating Loop',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&auto=format&fit=crop&q=80',
        description: 'Gas burner with roaring blue flame for sterilizing wire loops and heat-fixing bacterial smears onto glass slides.',
        safetyNotes: 'Never leave open flames unattended; tie back long hair; check gas hose connections.'
      },
      {
        id: 'eq_bact_3',
        name: 'Compound Light Microscope with 100x Oil Objective',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&auto=format&fit=crop&q=80',
        description: 'Equipped with 100x oil-immersion spring-loaded objective (N.A. 1.25) and Abbe condenser with iris diaphragm.',
        safetyNotes: 'Always wipe oil off objective lens with optical paper immediately after observation.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Smear Preparation & Heat Fixing',
        description: 'Place a small loopful of sterile saline on a clean glass slide. Aseptically touch a single bacterial colony, emulsify to form a faint milky turbidity. Allow to air-dry completely. Pass slide through the blue flame 3 times to heat-fix bacteria to the glass.',
        cautionNote: 'Do not overheat: excess heat distorts bacterial cell morphology and lyses cell walls.'
      },
      {
        stepNumber: 2,
        title: 'Primary Stain — Crystal Violet (60 Seconds)',
        description: 'Cover the smear with Crystal Violet solution for 60 seconds. Gently rinse with a steady stream of distilled water from the wash bottle.',
        cautionNote: 'Rinse gently at the edge of the slide, not directly onto the fragile smear.'
      },
      {
        stepNumber: 3,
        title: 'Mordant Application — Gram Iodine (60 Seconds)',
        description: 'Flood with Gram’s Iodine solution for 60 seconds. Iodine penetrates and forms large insoluble Crystal Violet-Iodine (CV-I) complexes within the cell wall. Rinse with distilled water.',
        cautionNote: 'Mordant is essential; skipping causes all cells to decolorize.'
      },
      {
        stepNumber: 4,
        title: 'Critical Decolorization — 95% Ethanol (10–15 Seconds)',
        description: 'Hold slide at a 45-degree angle. Add 95% ethanol dropwise until runoff is almost clear (strictly 10–15 seconds). Immediately rinse thoroughly with water to halt decolorization.',
        cautionNote: 'CRITICAL STEP: Over-decolorization turns Gram-positive pink; under-decolorization leaves Gram-negative purple.'
      },
      {
        stepNumber: 5,
        title: 'Counterstain — Safranin (60 Seconds) & Oil Immersion',
        description: 'Flood smear with Safranin counterstain for 60 seconds. Rinse, blot dry with bibulous paper (do not rub). Add 1 drop of immersion oil onto smear and examine under 100x oil-immersion objective.',
        cautionNote: 'Never drag 40x dry objective through immersion oil.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583912267670-6575ad4736f6?w=800&auto=format&fit=crop&q=80',
        caption: 'Gram-Positive Staphylococci (purple clusters) vs Gram-Negative E. coli (pink bacilli) under 1000x oil immersion.',
        magnification: '1000x Oil Immersion',
        stainOrView: 'Gram Staining Protocol'
      },
      {
        url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80',
        caption: 'Streptococcus pneumoniae Gram-positive lancet-shaped diplococci surrounded by clear capsule halos.',
        magnification: '1000x',
        stainOrView: 'Gram Stain'
      }
    ],
    interactiveImages: [
      {
        id: 'inter_bact_1',
        title: 'Interactive Gram-Stained Mixed Smear (1000x Oil Immersion)',
        baseImage: 'https://images.unsplash.com/photo-1583912267670-6575ad4736f6?w=1000&auto=format&fit=crop&q=80',
        magnification: '1000x Oil Immersion',
        stainOrView: 'Gram Differential Stain',
        description: 'Click the pins to explore Gram-positive vs Gram-negative differential characteristics and clinical pathogens.',
        pins: [
          {
            id: 'pin_b1',
            x: 30,
            y: 40,
            label: '1',
            structureName: 'Gram-Positive Cocci in Clusters (Staphylococcus aureus)',
            histologicalFeatures: 'Deep violet/purple spherical cells (0.5–1.0 µm) arranged in irregular grape-like clusters. Thick multilayered peptidoglycan wall (20–80 nm) traps CV-I complex during alcohol wash.',
            clinicalSignificance: 'Common cause of skin abscesses, toxic shock syndrome, endocarditis, and hospital-acquired MRSA pneumonia.',
            stain: 'Crystal Violet Positive (Purple)'
          },
          {
            id: 'pin_b2',
            x: 65,
            y: 55,
            label: '2',
            structureName: 'Gram-Negative Bacilli (Escherichia coli / Klebsiella)',
            histologicalFeatures: 'Pink/red rod-shaped bacteria (1–3 µm). Thin peptidoglycan layer (2–7 nm) surrounded by outer membrane with LPS. Alcohol dissolves lipids, allowing CV-I to escape; counterstained by safranin.',
            clinicalSignificance: 'Leading cause of urinary tract infections (UTIs), gram-negative sepsis, and intra-abdominal peritonitis.',
            stain: 'Safranin Positive (Pink/Red)'
          },
          {
            id: 'pin_b3',
            x: 48,
            y: 25,
            label: '3',
            structureName: 'Gram-Positive Cocci in Pairs & Chains (Streptococcus)',
            histologicalFeatures: 'Spherical or ovoid purple cells in linear chains. Catalase-negative (distinguishing from Staphylococci).',
            clinicalSignificance: 'Streptococcus pyogenes (Group A Strep) causes pharyngitis, rheumatic fever, and necrotizing fasciitis.',
            stain: 'Purple / Crystal Violet'
          }
        ]
      }
    ],
    identificationPoints: [
      'GRAM-POSITIVE: Retains primary Crystal Violet, appears DEEP PURPLE/VIOLET. Thick peptidoglycan wall.',
      'GRAM-NEGATIVE: Decolorized by alcohol, counterstained by Safranin, appears PINK/RED. Thin peptidoglycan + LPS outer membrane.',
      'MORPHOLOGY: Cocci (spherical: clusters, chains, pairs) vs Bacilli (rods: straight, curved, branching).'
    ],
    commonMistakes: [
      {
        mistake: 'Over-decolorizing with alcohol (>20 seconds).',
        correction: 'Alcohol must only be applied dropwise for strictly 10 to 15 seconds. Immediately quench with water.',
        whyItMatters: 'Over-decolorization washes CV-I out of Gram-positive cells, creating dangerous false Gram-negative interpretations.'
      },
      {
        mistake: 'Using old (>24–48 hr) bacterial cultures.',
        correction: 'Always use fresh 18-24 hour exponential growth cultures. Aging bacteria suffer peptidoglycan wall autolysis.',
        whyItMatters: 'Old Gram-positive cultures stain Gram-variable with patchy pink and purple cells.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Empiric Antibiotic Selection Guided by Rapid Gram Stain in Sepsis & Meningitis',
      pathophysiology: 'Bacterial cell wall composition dictates antibiotic susceptibility: Gram-positive thick peptidoglycan is highly sensitive to beta-lactams and Vancomycin; Gram-negative outer membrane acts as a permeability barrier and requires Cephalosporins (e.g. Ceftriaxone), Carbapenems, or Aminoglycosides.',
      clinicalPresentation: 'Fever, neck stiffness, and altered mental status in acute bacterial meningitis. CSF Gram stain showing Gram-negative diplococci (Neisseria meningitidis) triggers immediate isolation and high-dose Ceftriaxone.',
      diagnosticPearls: 'A 10-minute STAT Gram stain in the ICU saves lives by guiding targeted antimicrobial therapy hours before final culture results.'
    },
    safety: {
      biosafetyLevel: 'BSL-2 (Potentially Pathogenic Clinical Isolates)',
      hazards: [
        'Aerosol generation during vortexing or loop flaming',
        'Open Bunsen burner fire hazard',
        'Infectious pathogen contact with mucous membranes or cut skin'
      ],
      ppeRequired: [
        'Buttoned laboratory coat',
        'Nitrile gloves at all times',
        'Safety goggles',
        'Work within Class II Biosafety Cabinet for unknown specimen smears'
      ],
      emergencyProtocol: 'In case of bacterial culture spill, cover with paper towels, saturate with 10% household bleach (0.5% sodium hypochlorite) or 70% ethanol, let stand for 20 minutes, then wipe clean and dispose in biohazard autoclave bag. Report to laboratory supervisor.'
    },
    references: [
      {
        title: "Murray's Medical Microbiology",
        authors: 'Patrick R. Murray, Ken S. Rosenthal, Michael A. Pfaller',
        editionOrYear: '9th Edition (2020)',
        pages: 'pp. 12–35'
      },
      {
        title: 'Bailey & Scott’s Diagnostic Microbiology',
        authors: 'Patricia M. Tille',
        editionOrYear: '15th Edition (2022)',
        pages: 'pp. 88–104'
      }
    ],
    quizId: 'quiz_bact_03',
    spotterIds: ['spot_bact_1', 'spot_bact_2']
  }
];

export const SPOTTER_ITEMS: SpotterItem[] = [
  {
    id: 'spot_hist_1',
    labId: 'histology',
    categoryId: 'hist_muscle',
    practicalId: 'prac_hist_05',
    title: 'Spotter 01: Tissue Identification',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    question: 'Identify the specific muscle tissue shown in the high-power histological field:',
    pointerX: 45,
    pointerY: 48,
    options: [
      'Skeletal Muscle (Longitudinal Section)',
      'Cardiac Muscle with Intercalated Discs',
      'Smooth Muscle (Muscularis Externa)',
      'Dense Regular Collagenous Connective Tissue'
    ],
    correctIndex: 0,
    explanation: 'Correct! The image clearly shows unbranched cylindrical fibers with distinct transverse cross-striations (alternating A and I bands) and multiple peripheral multinucleated nuclei located directly beneath the sarcolemma.',
    identificationKeyPoints: [
      '1. Prominent transverse A-band (dark) and I-band (light) sarcomeric striations.',
      '2. Multiple flattened nuclei strictly at the cell periphery.',
      '3. Cylindrical, non-branching individual fiber architecture.'
    ],
    difficulty: 'basic'
  },
  {
    id: 'spot_hist_2',
    labId: 'histology',
    categoryId: 'hist_muscle',
    practicalId: 'prac_hist_05',
    title: 'Spotter 02: Specialized Junctional Structure',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80',
    question: 'Identify the dark transverse step-like structure indicated by the pointer in this cardiac specimen:',
    pointerX: 52,
    pointerY: 50,
    options: [
      'Intercalated Disc (Fascia Adherens & Gap Junctions)',
      'Neuromuscular Motor Endplate',
      'Dense Regular Collagen Fiber',
      'Perimysial Capillary Wall'
    ],
    correctIndex: 0,
    explanation: 'Correct! The step-like transverse dark lines represent intercalated discs. They contain fascia adherens and desmosomes for mechanical anchoring during systole, plus extensive gap junctions for rapid electrical syncytial ion transmission.',
    identificationKeyPoints: [
      '1. Transverse step-like eosinophilic lines across branching cardiac myocytes.',
      '2. Coincides with single centrally placed oval nucleus.',
      '3. Functional cardiac syncytium coordinating synchronized ventricular contraction.'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'spot_anat_1',
    labId: 'anatomy',
    categoryId: 'anat_bones',
    practicalId: 'prac_anat_02',
    title: 'Spotter 03: Scapular Landmark Identification',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
    question: 'Identify the bony process pointed at the lateral projection of the scapular spine:',
    pointerX: 30,
    pointerY: 25,
    options: [
      'Acromion Process',
      'Coracoid Process',
      'Glenoid Tubercle',
      'Spine Crest'
    ],
    correctIndex: 0,
    explanation: 'Correct! The Acromion is the flattened subcutaneous lateral continuation of the scapular spine. It forms the summit of the shoulder and articulates with the lateral clavicular end.',
    identificationKeyPoints: [
      '1. Direct continuation of the spine of the scapula.',
      '2. Subcutaneous bony landmark palpable on physical exam.',
      '3. Articular facet for lateral end of clavicle.'
    ],
    difficulty: 'basic'
  },
  {
    id: 'spot_bact_1',
    labId: 'bacteriology',
    categoryId: 'bact_tests',
    practicalId: 'prac_bact_03',
    title: 'Spotter 04: Gram Staining Morphology',
    image: 'https://images.unsplash.com/photo-1583912267670-6575ad4736f6?w=800&auto=format&fit=crop&q=80',
    question: 'Identify the bacterial Gram reaction and morphological grouping seen in the violet field:',
    pointerX: 35,
    pointerY: 42,
    options: [
      'Gram-Positive Cocci in Grape-like Clusters (Staphylococcus morphology)',
      'Gram-Negative Diplococci in Intracellular Pairs (Neisseria morphology)',
      'Gram-Positive Bacilli with Subterminal Spores (Bacillus morphology)',
      'Gram-Negative Enteric Bacilli (E. coli morphology)'
    ],
    correctIndex: 0,
    explanation: 'Correct! The deep violet/purple spheres arranged in irregular clusters represent Gram-Positive Cocci typical of Staphylococcus aureus. The thick peptidoglycan retains the Crystal Violet-Iodine complex.',
    identificationKeyPoints: [
      '1. Deep purple color indicates Gram-positive cell wall structure.',
      '2. Spherical cocci arranged in characteristic grape-like clusters.',
      '3. Catalase-positive differentiation from Streptococci.'
    ],
    difficulty: 'basic'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz_hist_05',
    labId: 'histology',
    practicalId: 'prac_hist_05',
    title: 'Histology Lab Quiz: Muscle Tissue Mastery',
    description: 'Test your understanding of skeletal, cardiac, and smooth muscle histological morphology, striations, and clinical correlations.',
    timeLimitMinutes: 10,
    passingScorePercent: 75,
    questions: [
      {
        id: 'q_h5_1',
        question: 'Which of the following characteristics uniquely distinguishes skeletal muscle from cardiac and smooth muscle?',
        type: 'mcq',
        options: [
          'Multiple peripheral nuclei located immediately beneath the sarcolemma',
          'Presence of cross-striations with A and I bands',
          'Acidophilic eosinophilic cytoplasm',
          'Presence of gap junctions between adjacent cells'
        ],
        correctIndex: 0,
        explanation: 'Skeletal muscle fibers are true syncytia containing dozens of elongated nuclei strictly positioned at the fiber periphery under the sarcolemma. Cardiac muscle has 1-2 central nuclei; smooth muscle has 1 central nucleus.'
      },
      {
        id: 'q_h5_2',
        question: 'Intercalated discs in cardiac muscle contain gap junctions that function primarily to:',
        type: 'mcq',
        options: [
          'Enable rapid electrochemical ionic coupling for synchronized contraction',
          'Anchor thick myosin filaments to the sarcolemma',
          'Store intracellular glycogen for anaerobic glycolysis',
          'Synthesize atrial natriuretic peptide granules'
        ],
        correctIndex: 0,
        explanation: 'Gap junctions (communicating junctions) in the longitudinal portions of intercalated discs provide low-resistance electrical pathways allowing action potentials to spread rapidly between myocytes.'
      },
      {
        id: 'q_h5_3',
        question: 'True or False: Smooth muscle cells possess sarcomeres with alternating A and I bands visible under light microscopy.',
        type: 'true_false',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. Smooth muscle contains actin and myosin filaments, but they are arranged in an criss-cross oblique lattice anchored to dense bodies, lacking the regular repeating sarcomeric registration that produces cross-striations.'
      },
      {
        id: 'q_h5_4',
        question: 'In a histology practical exam, a student observes elongated spindle-shaped cells with central cigar-shaped nuclei in the intestinal wall. The tissue is:',
        type: 'mcq',
        options: [
          'Smooth muscle',
          'Skeletal muscle in cross section',
          'Hyaline cartilage',
          'Stratified squamous epithelium'
        ],
        correctIndex: 0,
        explanation: 'Fusiform spindle-shaped cells with central elongated nuclei in the muscularis externa of visceral hollow organs are the classic appearance of smooth muscle.'
      }
    ]
  },
  {
    id: 'quiz_anat_02',
    labId: 'anatomy',
    practicalId: 'prac_anat_02',
    title: 'Anatomy Quiz: Scapula & Upper Limb Osteology',
    description: 'High-yield practical questions on bony landmarks, muscle attachments, and fracture complications.',
    timeLimitMinutes: 10,
    passingScorePercent: 75,
    questions: [
      {
        id: 'q_a2_1',
        question: 'A fracture of the surgical neck of the humerus most commonly endangers which nerve and vascular structure?',
        type: 'mcq',
        options: [
          'Axillary nerve and Posterior Circumflex Humeral artery',
          'Radial nerve and Profunda Brachii artery',
          'Median nerve and Brachial artery',
          'Ulnar nerve and Superior Ulnar Collateral artery'
        ],
        correctIndex: 0,
        explanation: 'The axillary nerve and posterior circumflex humeral artery travel through the quadrangular space directly adjacent to the surgical neck of the humerus.'
      },
      {
        id: 'q_a2_2',
        question: 'Which rotator cuff muscle inserts onto the LESSER tubercle of the humerus?',
        type: 'mcq',
        options: [
          'Subscapularis',
          'Supraspinatus',
          'Infraspinatus',
          'Teres Minor'
        ],
        correctIndex: 0,
        explanation: 'Subscapularis is the ONLY rotator cuff muscle that inserts on the lesser tubercle (and acts as a medial rotator). The other three (Supraspinatus, Infraspinatus, Teres Minor) insert on the greater tubercle.'
      },
      {
        id: 'q_a2_3',
        question: 'True or False: The spine of the scapula is located on the anterior (costal) surface of the bone.',
        type: 'true_false',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. The spine of the scapula is a prominent ridge on the POSTERIOR (dorsal) surface, dividing it into supraspinous and infraspinous fossae.'
      }
    ]
  },
  {
    id: 'quiz_bact_03',
    labId: 'bacteriology',
    practicalId: 'prac_bact_03',
    title: 'Bacteriology Quiz: Gram Staining & Cell Wall',
    description: 'Test your understanding of Gram staining steps, reagents, timings, and diagnostic troubleshooting.',
    timeLimitMinutes: 10,
    passingScorePercent: 75,
    questions: [
      {
        id: 'q_b3_1',
        question: 'What is the role of Gram’s Iodine in the Gram stain protocol?',
        type: 'mcq',
        options: [
          'It serves as a mordant that forms large insoluble complexes with Crystal Violet',
          'It decolorizes Gram-negative outer membranes',
          'It acts as the red counterstain for acid-fast bacteria',
          'It heat-fixes the bacterial smear to the glass slide'
        ],
        correctIndex: 0,
        explanation: 'Gram’s Iodine is a mordant. It forms a chemical CV-I complex inside the cell that is too large to easily wash out through the dehydrated thick peptidoglycan of Gram-positive cells.'
      },
      {
        id: 'q_b3_2',
        question: 'If a student accidentally leaves the 95% alcohol decolorizer on the slide for 2 minutes, what will happen to Gram-positive Staphylococcus aureus?',
        type: 'mcq',
        options: [
          'It will be over-decolorized and appear false pink/red after safranin counterstain',
          'It will remain dark purple because Gram-positive bacteria are immune to alcohol',
          'It will dissolve completely and vanish from the glass slide',
          'It will turn bright fluorescent green'
        ],
        correctIndex: 0,
        explanation: 'Prolonged alcohol exposure over-decolorizes even thick Gram-positive cell walls, causing the CV-I complex to leach out and resulting in a false-negative pink result.'
      },
      {
        id: 'q_b3_3',
        question: 'True or False: Gram-negative bacteria appear pink/red because their thin peptidoglycan layer allows the CV-I complex to escape during alcohol decolorization.',
        type: 'true_false',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. The thin peptidoglycan layer (2–7 nm) and high lipid outer membrane dissolve in alcohol, releasing the purple dye so cells take up the pink safranin counterstain.'
      }
    ]
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch_1',
    date: '2026-08-30',
    day: 'Sunday',
    time: '09:30 AM – 11:30 AM',
    courseId: 'histology',
    courseName: 'Histology Lab',
    practicalNumber: 5,
    practicalId: 'prac_hist_05',
    practicalTitle: 'Practical 05 — Muscle Tissue',
    instructorName: 'Dr. Tariq Vance, MD',
    room: 'Lab Room 2',
    isToday: true,
    isTomorrow: false,
    preparationTasks: [
      { id: 'prep_1', label: 'Review required material & Junqueira Chapter 10', completed: true },
      { id: 'prep_2', label: 'Watch 6-min preparation video on intercalated discs', completed: true },
      { id: 'prep_3', label: 'Review labeled muscle histology images', completed: false },
      { id: 'prep_4', label: 'Complete pre-lab quiz & spotter review', completed: false },
      { id: 'prep_5', label: 'Bring clean lab coat and lens paper to Room 2', completed: true }
    ]
  },
  {
    id: 'sch_2',
    date: '2026-08-31',
    day: 'Monday',
    time: '10:00 AM – 12:30 PM',
    courseId: 'anatomy',
    courseName: 'Anatomy Lab',
    practicalNumber: 2,
    practicalId: 'prac_anat_02',
    practicalTitle: 'Practical 02 — Upper Limb Osteology (Scapula & Humerus)',
    instructorName: 'Dr. Tariq Vance, MD',
    room: 'Anatomy Dissection Hall 1',
    isToday: false,
    isTomorrow: true,
    preparationTasks: [
      { id: 'prep_6', label: 'Review Moore Chapter 6 scapular landmarks', completed: false },
      { id: 'prep_7', label: 'Memorize SITS rotator cuff attachments', completed: false },
      { id: 'prep_8', label: 'Review surgical neck fracture nerve injuries', completed: false }
    ]
  },
  {
    id: 'sch_3',
    date: '2026-09-02',
    day: 'Wednesday',
    time: '01:00 PM – 03:00 PM',
    courseId: 'bacteriology',
    courseName: 'Bacteriology Lab',
    practicalNumber: 3,
    practicalId: 'prac_bact_03',
    practicalTitle: 'Practical 03 — Gram Staining & Bacterial Morphology',
    instructorName: 'Prof. Eleanor Hayes, MD',
    room: 'Microbiology Lab 3',
    isToday: false,
    isTomorrow: false,
    preparationTasks: [
      { id: 'prep_9', label: 'Read Gram staining protocol reagents and timings', completed: false },
      { id: 'prep_10', label: 'Review BSL-2 biosafety regulations', completed: false }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_1',
    title: 'New Histology Practical 05 (Muscle Tissue) Published',
    content: 'The official approved Histology Practical 05 on Skeletal, Cardiac, and Smooth muscle tissues is now live with interactive slide pins, high-resolution scans, and self-assessment spotters. Please complete the pre-lab preparation before Sunday morning session in Lab Room 2.',
    date: 'Aug 28, 2026',
    labId: 'histology',
    author: 'Dr. Tariq Vance',
    authorRole: 'Histology Lead Instructor',
    priority: 'important'
  },
  {
    id: 'ann_2',
    title: 'Bacteriology Lab Session Relocated to Room 3',
    content: 'Please note that upcoming Bacteriology diagnostic sessions (Practical 03: Gram Staining) will take place in Microbiology Lab Room 3 due to biosafety ventilation upgrades in Room 1.',
    date: 'Aug 27, 2026',
    labId: 'bacteriology',
    author: 'Prof. Eleanor Hayes, Dean',
    authorRole: 'Academic Directorate',
    priority: 'urgent'
  },
  {
    id: 'ann_3',
    title: 'Anatomy Mock Spotter Examination Released',
    content: 'A timed 20-station Anatomy Osteology Spotter set has been published under the Anatomy Lab portal for students preparing for the Mid-Semester Practical OSPE.',
    date: 'Aug 25, 2026',
    labId: 'anatomy',
    author: 'Dr. Tariq Vance',
    authorRole: 'Senior Anatomy Faculty',
    priority: 'normal'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: "Today's Lab: Histology at 09:30 AM",
    message: 'Practical 05 — Muscle Tissue starts at 09:30 AM in Lab Room 2.',
    time: '20 mins ago',
    type: 'schedule',
    linkTarget: { tab: 'practicals', labId: 'histology', practicalId: 'prac_hist_05' },
    isRead: false
  },
  {
    id: 'notif_2',
    title: 'New Quiz Available: Muscle Tissue Mastery',
    message: 'Test your knowledge on histological cross-striations and intercalated discs.',
    time: '2 hours ago',
    type: 'quiz',
    linkTarget: { tab: 'quizzes', labId: 'histology' },
    isRead: false
  },
  {
    id: 'notif_3',
    title: 'Bacteriology Lab moved to Room 3',
    message: 'Practical 03 relocated to Microbiology Lab 3.',
    time: 'Yesterday',
    type: 'announcement',
    linkTarget: { tab: 'announcements' },
    isRead: true
  }
];

export const INITIAL_FILES: FileAsset[] = [
  {
    id: 'file_1',
    fileName: 'Histology_Practical_05_Muscle_Tissue_Manual_v2.1.pdf',
    fileType: 'pdf',
    fileSize: '3.4 MB',
    uploadDate: 'Aug 25, 2026',
    uploadedBy: 'Dr. Tariq Vance',
    courseId: 'histology',
    practicalId: 'prac_hist_05',
    version: '2.1',
    approvalStatus: 'published',
    downloadUrl: '#'
  },
  {
    id: 'file_2',
    fileName: 'Anatomy_Upper_Limb_Osteology_Reference_Guide.pdf',
    fileType: 'pdf',
    fileSize: '4.8 MB',
    uploadDate: 'Aug 21, 2026',
    uploadedBy: 'Dr. Tariq Vance',
    courseId: 'anatomy',
    practicalId: 'prac_anat_02',
    version: '1.4',
    approvalStatus: 'published',
    downloadUrl: '#'
  },
  {
    id: 'file_3',
    fileName: 'Microbiology_Gram_Staining_Safety_SOP.pdf',
    fileType: 'pdf',
    fileSize: '1.9 MB',
    uploadDate: 'Aug 23, 2026',
    uploadedBy: 'Prof. Eleanor Hayes',
    courseId: 'bacteriology',
    practicalId: 'prac_bact_03',
    version: '3.0',
    approvalStatus: 'published',
    downloadUrl: '#'
  }
];

export const INITIAL_STUDENT_PROGRESS: StudentProgress = {
  userId: 'usr_student_1',
  anatomyPercent: 80,
  histologyPercent: 70,
  bacteriologyPercent: 90,
  biochemistryPercent: 0,
  completedPracticals: ['prac_anat_02', 'prac_bact_03'],
  completedQuizzes: [
    {
      id: 'att_1',
      quizId: 'quiz_anat_02',
      quizTitle: 'Anatomy Quiz: Scapula & Upper Limb Osteology',
      labId: 'anatomy',
      userId: 'usr_student_1',
      score: 3,
      maxScore: 3,
      percentage: 100,
      passed: true,
      answers: [
        { questionId: 'q_a2_1', selectedIndex: 0, isCorrect: true },
        { questionId: 'q_a2_2', selectedIndex: 0, isCorrect: true },
        { questionId: 'q_a2_3', selectedIndex: 1, isCorrect: true }
      ],
      completedAt: 'Aug 26, 2026'
    }
  ],
  completedSpotters: ['spot_anat_1', 'spot_bact_1'],
  averageScore: 92,
  studyTimeMinutes: 340,
  completedChecklistTasks: ['prep_1', 'prep_2', 'prep_5']
};
