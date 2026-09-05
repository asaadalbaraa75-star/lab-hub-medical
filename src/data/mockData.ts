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
    enrolledLabs: ['anatomy', 'histology', 'biochemistry']
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
    enrolledLabs: ['anatomy', 'histology', 'biochemistry']
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
    enrolledLabs: ['anatomy', 'histology', 'biochemistry']
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
    id: 'prac_bio_01',
    courseId: 'biochemistry',
    categoryId: 'bio_carbohydrates',
    practicalNumber: 1,
    title: 'Qualitative Identification of Carbohydrates',
    subTitle: 'Systematic Chemical Reactions for Monosaccharides, Disaccharides & Polysaccharides',
    estimatedTime: '45 mins',
    version: '3.1',
    lastUpdated: 'Aug 26, 2026',
    status: 'published',
    authorName: 'Dr. Tariq Vance, MD, MSc',
    authorRole: 'Clinical Biochemistry Faculty',
    approvedBy: 'Prof. Eleanor Hayes, MD',
    approvalDate: 'Aug 27, 2026',
    learningObjectives: [
      'Master the principle and reaction mechanism of the Molisch General Carbohydrate Test (alpha-naphthol dehydration violet ring).',
      'Differentiate reducing from non-reducing sugars using alkaline copper reduction tests (Benedict & Fehling tests).',
      'Distinguish reducing monosaccharides from reducing disaccharides using Barfoed’s acid copper acetate test.',
      'Differentiate ketohexoses (fructose) from aldohexoses (glucose) using Seliwanoff’s resorcinol-HCl rapid colorimetric test.',
      'Identify starch and glycogen polysaccharides using Iodine-potassium iodide helical inclusion complex formation.'
    ],
    beforeTheLab: {
      previousKnowledge: [
        'Fundamental chemistry of carbohydrates: aldoses vs. ketoses, hemiacetal ring structures, and glycosidic bond formation.',
        'Principles of oxidation-reduction reactions involving cupric (Cu²⁺) and cuprous (Cu⁺) ions.',
        'Laboratory safety handling strong mineral acids (concentrated H₂SO₄ and concentrated HCl).'
      ],
      recommendedReading: [
        "Harper's Illustrated Biochemistry (32nd Ed.), Chapter 14: Carbohydrates of Physiological Significance, pp. 132-148.",
        'Lehninger Principles of Biochemistry (8th Ed.), Chapter 7: Carbohydrates and Glycobiology, pp. 245-280.'
      ],
      preparationChecklist: [
        { id: 'chk_b1_1', text: 'Review difference between reducing sugars (free anomeric carbon) and non-reducing sugars (sucrose)' },
        { id: 'chk_b1_2', text: 'Review acid pipetting precautions when layering concentrated H2SO4 down the tube wall' },
        { id: 'chk_b1_3', text: 'Understand the reaction time cutoffs for Barfoed (2-3 min) and Seliwanoff (<1 min)' }
      ],
      preLabSummary: 'Carbohydrate identification follows a hierarchical algorithm: Molisch test screens for carbohydrate presence; Iodine distinguishes polysaccharides; Benedict identifies reducing capability; Barfoed differentiates monosaccharides from disaccharides; Seliwanoff identifies rapid ketose condensation.'
    },
    equipment: [
      {
        id: 'eq_bio_1',
        name: 'Biochemistry Chemical Reagent Rack',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&auto=format&fit=crop&q=80',
        description: 'Reagent bottles: Molisch reagent (5% alpha-naphthol in ethanol), Concentrated H2SO4, Benedict reagent (CuSO4, Na2CO3, sodium citrate), Barfoed reagent, Seliwanoff reagent, Iodine solution.',
        safetyNotes: 'Wear chemical safety goggles and nitrile gloves when handling concentrated sulfuric acid; acid causes severe chemical burns.'
      },
      {
        id: 'eq_bio_2',
        name: 'Thermostatic Boiling Water Bath & Tube Racks',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&auto=format&fit=crop&q=80',
        description: 'Water bath maintained at 100°C for timed boiling of Benedict, Barfoed, and Seliwanoff reaction tubes.',
        safetyNotes: 'Use wooden test tube holders; never lean face over boiling water bath.'
      },
      {
        id: 'eq_bio_3',
        name: 'Borosilicate Glass Test Tubes & Pipettes',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=300&auto=format&fit=crop&q=80',
        description: 'Heat-resistant borosilicate tubes with calibration marks, graduated pipettes, and safety pipette bulbs.',
        safetyNotes: 'Check glass rims for chips or micro-cracks before heating.'
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        title: 'Molisch General Test for Carbohydrates',
        description: 'Add 2 mL of unknown test solution into a clean test tube. Add 2 drops of Molisch reagent (alpha-naphthol) and mix gently. Carefully incline the test tube and slowly pour 2 mL of concentrated H2SO4 down the inside wall of the tube without shaking, so it forms a dense layer beneath the aqueous solution.',
        cautionNote: 'Do not shake! A purple/violet ring forms at the liquid junction if carbohydrate is present.'
      },
      {
        stepNumber: 2,
        title: 'Iodine Test for Polysaccharides',
        description: 'Add 1 mL of test solution to a porcelain spot plate or tube. Add 1–2 drops of Lugol’s iodine solution. Observe immediate color changes: Deep blue-black indicates amylose/starch; reddish-brown indicates glycogen or erythrodextrin; yellow/brown indicates monosaccharide/disaccharide.',
        cautionNote: 'Do not boil before reading; iodine-starch complexes dissociate on heating.'
      },
      {
        stepNumber: 3,
        title: 'Benedict Qualitative Test for Reducing Sugars',
        description: 'Combine 5 mL of Benedict reagent with 8 drops (approx. 0.5 mL) of carbohydrate solution in a tube. Mix thoroughly and place into a vigorously boiling water bath for exactly 3 to 5 minutes. Remove and observe precipitate color: Green (0.5%), Yellow (1%), Orange (1.5%), Brick-Red (>2% reducing sugar).',
        cautionNote: 'Always use test tube holder. Sucrose is negative (remains blue).'
      },
      {
        stepNumber: 4,
        title: 'Barfoed Test — Monosaccharide vs Disaccharide Distinction',
        description: 'Add 2 mL of Barfoed reagent (cupric acetate in dilute acetic acid) to 2 mL of test solution. Place in boiling water bath and record time with stopwatch. Monosaccharides form a red cuprous oxide precipitate along the bottom and sides within 2 to 3 minutes. Reducing disaccharides require >10 minutes.',
        cautionNote: 'Strictly monitor time: prolonged boiling beyond 3 minutes will hydrolyze disaccharides yielding false positives.'
      },
      {
        stepNumber: 5,
        title: 'Seliwanoff Test for Rapid Ketose Differentiation',
        description: 'Add 3 mL of Seliwanoff reagent (resorcinol in dilute HCl) to 1 mL of carbohydrate solution. Place in boiling water bath. Rapid cherry-red coloration within 30 to 60 seconds indicates a ketohexose (fructose). Aldohexoses (glucose) remain colorless or pale pink after several minutes.',
        cautionNote: 'Do not boil beyond 1 minute; excessive boiling hydrolyzes aldoses producing false cherry-red.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
        caption: 'Benedict test series showing color gradient: Blue (negative/sucrose) to Green, Orange, and Brick-Red (Cuprous oxide Cu2O precipitate).',
        magnification: 'Macroscopic Colorimetric Reaction',
        stainOrView: 'Benedict Reagent Reduction'
      },
      {
        url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
        caption: 'Molisch test positive purple/violet ring formed at the liquid junction of concentrated H2SO4 and carbohydrate solution.',
        magnification: 'Macroscopic Ring Junction',
        stainOrView: 'Molisch Alpha-Naphthol Reaction'
      }
    ],
    interactiveImages: [
      {
        id: 'inter_bio_1',
        title: 'Interactive Carbohydrate Diagnostic Algorithm & Test Tubes',
        baseImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&auto=format&fit=crop&q=80',
        magnification: 'Laboratory Analytical Panel',
        stainOrView: 'Qualitative Chemical Reactions',
        description: 'Click the pins to explore each chemical reaction test tube, molecular mechanism, and diagnostic value.',
        pins: [
          {
            id: 'pin_bio1',
            x: 25,
            y: 50,
            label: '1',
            structureName: 'Benedict Positive Reaction (Brick-Red Cu2O)',
            histologicalFeatures: 'Reducing sugars possess free anomeric aldehyde or ketone groups capable of reducing Cu2+ (cupric) to Cu+ (cuprous) oxide in hot alkaline carbonate buffer.',
            clinicalSignificance: 'Classic qualitative test for glucosuria in uncontrolled diabetes mellitus and inborn errors of carbohydrate metabolism.',
            stain: 'Brick-Red Cuprous Oxide Precipitate'
          },
          {
            id: 'pin_bio2',
            x: 55,
            y: 45,
            label: '2',
            structureName: 'Seliwanoff Cherry-Red Ketose Complex',
            histologicalFeatures: 'Ketohexoses (Fructose) undergo rapid acid dehydration forming 5-hydroxymethylfurfural, condensing with resorcinol into a vibrant cherry-red pigment in under 60 seconds.',
            clinicalSignificance: 'Used to diagnose hereditary fructose intolerance and essential fructosuria.',
            stain: 'Resorcinol Cherry-Red Chromogen'
          },
          {
            id: 'pin_bio3',
            x: 75,
            y: 55,
            label: '3',
            structureName: 'Barfoed Acid Copper Acetate Reduction',
            histologicalFeatures: 'The slightly acidic medium (pH 4.6) retards reduction by disaccharides. Monosaccharides are strong enough reducing agents to precipitate red Cu2O in 2–3 minutes.',
            clinicalSignificance: 'Differentiates monosaccharides (glucose, fructose) from reducing disaccharides (lactose, maltose).',
            stain: 'Acidic Cuprous Oxide Precipitate'
          }
        ]
      }
    ],
    identificationPoints: [
      'MOLISCH TEST: Purple ring at interface = POSITIVE for all carbohydrates.',
      'IODINE TEST: Deep blue = Starch/Amylose; Red-brown = Glycogen; Yellow/clear = Mono/Disaccharides.',
      'BENEDICT TEST: Brick-red precipitate = Reducing sugar (Glucose, Fructose, Lactose, Maltose). Negative blue = Sucrose, Starch.',
      'BARFOED TEST: Red precipitate within 2–3 mins = Monosaccharide. No precipitate at 3 mins = Disaccharide.',
      'SELIWANOFF TEST: Cherry-red within 60 secs = Ketohexose (Fructose). Negative/slow = Aldohexose (Glucose).'
    ],
    commonMistakes: [
      {
        mistake: 'Shaking the test tube during Molisch acid layering.',
        correction: 'Incline tube at 45 degrees and pipette conc. H2SO4 slowly down the glass wall. Do not mix.',
        whyItMatters: 'Shaking generates sudden heat, charring the carbohydrates and masking the interface ring.'
      },
      {
        mistake: 'Boiling Barfoed test beyond 3 minutes.',
        correction: 'Strictly remove the tube from boiling water bath when 3 minutes elapse.',
        whyItMatters: 'Boiling acid hydrolyzes disaccharides into monosaccharides, producing false positives.'
      }
    ],
    clinicalCorrelation: {
      condition: 'Glucosuria & Inborn Errors of Carbohydrate Metabolism',
      pathophysiology: 'When blood glucose exceeds renal threshold (~180 mg/dL), proximal tubule SGLT2 transporters saturate and glucose spills into urine. In hereditary galactosaemia and fructosuria, abnormal reducing sugars are excreted.',
      clinicalPresentation: 'Polyuria, polydipsia, and weight loss in diabetic ketoacidosis. Rapid Benedict screening detects reducing substances in pediatric urine.',
      diagnosticPearls: 'Glucose oxidase test strips (Clinistix) are specific for glucose; Benedict test detects all reducing sugars including galactose, fructose, and lactose.'
    },
    safety: {
      biosafetyLevel: 'BSL-1 (Chemical Safety Level 2)',
      hazards: [
        'Concentrated sulfuric acid and hydrochloric acid caustic burns',
        'Boiling water bath splashing and steam burns',
        'Hot glassware shatter hazard'
      ],
      ppeRequired: [
        'Chemical-resistant laboratory coat',
        'Nitrile safety gloves',
        'Certified chemical splash goggles',
        'Closed-toe chemical-resistant footwear'
      ],
      emergencyProtocol: 'In case of acid contact on skin, immediately flood the area with copious flowing water from the safety eyewash/shower for at least 15 minutes. Notify the laboratory instructor immediately.'
    },
    references: [
      {
        title: "Harper's Illustrated Biochemistry",
        authors: 'Victor W. Rodwell, David Bender, Kathleen M. Botham, Peter J. Kennelly, P. Anthony Weil',
        editionOrYear: '32nd Edition (2023)',
        pages: 'pp. 132–156'
      },
      {
        title: 'Practical Clinical Biochemistry: Methods and Interpretations',
        authors: 'Ranjan Chawla',
        editionOrYear: '5th Edition (2021)',
        pages: 'pp. 45–68'
      }
    ],
    quizId: 'quiz_bio_01',
    spotterIds: ['spot_bio_1']
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
    id: 'spot_bio_1',
    labId: 'biochemistry',
    categoryId: 'bio_carbohydrates',
    practicalId: 'prac_bio_01',
    title: 'Spotter 04: Benedict Test Reaction Tube',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    question: 'Identify the biochemical reaction result and interpretation shown in this test tube with brick-red precipitate after boiling:',
    pointerX: 45,
    pointerY: 55,
    options: [
      'Positive Benedict Test indicating high concentration of reducing sugar (Cuprous oxide Cu₂O precipitate)',
      'Negative Molisch Test indicating absent carbohydrates',
      'Positive Iodine Test for amylose helix',
      'Negative Barfoed Test for non-reducing disaccharides'
    ],
    correctIndex: 0,
    explanation: 'Correct! Reducing sugars (e.g., glucose, fructose, maltose) reduce alkaline cupric ions (Cu²⁺) in Benedict reagent to insoluble brick-red cuprous oxide (Cu₂O) precipitate upon boiling.',
    identificationKeyPoints: [
      '1. Brick-red / orange precipitate confirms reduction of Cu²⁺ to Cu⁺.',
      '2. Characteristic of free aldose or ketose reducing carbonyl groups.',
      '3. Qualitative/semi-quantitative indicator of reducing sugar concentration.'
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
    id: 'quiz_bio_01',
    labId: 'biochemistry',
    practicalId: 'prac_bio_01',
    title: 'Biochemistry Quiz: Qualitative Carbohydrate Identification',
    description: 'Test your mastery of carbohydrate identification tests: Molisch, Iodine, Barfoed, Seliwanoff, Benedict, and Fehling reactions.',
    timeLimitMinutes: 10,
    passingScorePercent: 75,
    questions: [
      {
        id: 'q_bio_1',
        question: 'Which reagent is used in Seliwanoff’s test to rapidly differentiate ketohexoses (fructose) from aldohexoses (glucose)?',
        type: 'mcq',
        options: [
          'Resorcinol in dilute HCl (forms cherry-red complex)',
          'Alpha-naphthol in concentrated H₂SO₄',
          'Copper acetate in acetic acid',
          'Iodine solution in potassium iodide'
        ],
        correctIndex: 0,
        explanation: 'Seliwanoff’s test uses resorcinol in dilute HCl. Ketoses dehydrate rapidly to 5-hydroxymethylfurfural which condenses with resorcinol to give a cherry-red color within 1–2 minutes.'
      },
      {
        id: 'q_bio_2',
        question: 'What is the key difference in reaction time between monosaccharides and disaccharides in Barfoed’s test?',
        type: 'mcq',
        options: [
          'Monosaccharides reduce cupric ions rapidly within 2–3 minutes in an acidic medium, while reducing disaccharides react much more slowly or not at all',
          'Disaccharides react immediately while monosaccharides require prolonged boiling',
          'Barfoed test only detects polysaccharides like glycogen',
          'Both react with identical speed'
        ],
        correctIndex: 0,
        explanation: 'Barfoed’s reagent consists of cupric acetate in dilute acetic acid (acidic medium). Monosaccharides, being stronger reducing agents, produce a red precipitate (Cu₂O) within 2–3 minutes, whereas disaccharides require prolonged boiling (>10 minutes).'
      },
      {
        id: 'q_bio_3',
        question: 'True or False: The Molisch test is a general screening test positive for all carbohydrates due to acid dehydration forming furfural derivatives.',
        type: 'true_false',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Concentrated sulfuric acid dehydrates all carbohydrates to furfural (from pentoses) or hydroxymethylfurfural (from hexoses), which condenses with alpha-naphthol to form a characteristic violet or purple ring at the interface.'
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
    courseId: 'biochemistry',
    courseName: 'Biochemistry Lab',
    practicalNumber: 1,
    practicalId: 'prac_bio_01',
    practicalTitle: 'Practical 01 — Qualitative Identification of Carbohydrates',
    instructorName: 'Prof. Eleanor Hayes, MD',
    room: 'Biochemistry Lab 2',
    isToday: false,
    isTomorrow: false,
    preparationTasks: [
      { id: 'prep_9', label: 'Review Molisch & Benedict reaction mechanisms', completed: false },
      { id: 'prep_10', label: 'Review Barfoed and Seliwanoff timing precautions', completed: false }
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
    title: 'Biochemistry Practical 01: Carbohydrates Protocol Live',
    content: 'The laboratory manual and interactive testing algorithms for Practical 01 (Carbohydrate Qualitative Tests) are now live. Students must review Molisch, Benedict, and Barfoed procedures before entering Lab 2.',
    date: 'Aug 27, 2026',
    labId: 'biochemistry',
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
    title: 'Biochemistry Practical 01 Published',
    message: 'Carbohydrate Qualitative Identification protocol is ready in Lab 2.',
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
    fileName: 'Biochemistry_Carbohydrate_Qualitative_Tests_Manual.pdf',
    fileType: 'pdf',
    fileSize: '2.3 MB',
    uploadDate: 'Aug 23, 2026',
    uploadedBy: 'Prof. Eleanor Hayes',
    courseId: 'biochemistry',
    practicalId: 'prac_bio_01',
    version: '3.1',
    approvalStatus: 'published',
    downloadUrl: '#'
  }
];

export const INITIAL_STUDENT_PROGRESS: StudentProgress = {
  userId: 'usr_student_1',
  anatomyPercent: 82,
  histologyPercent: 74,
  biochemistryPercent: 70,
  completedPracticals: ['prac_anat_01', 'prac_anat_02', 'prac_hist_01'],
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
  completedSpotters: ['spot_anat_1', 'spot_hist_1'],
  averageScore: 92,
  studyTimeMinutes: 340,
  completedChecklistTasks: ['prep_1', 'prep_2', 'prep_5']
};
