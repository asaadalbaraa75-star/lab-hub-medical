export interface EducationalVideo {
  id: string;
  subjectId: 'anatomy' | 'histology' | 'bacteriology' | 'biochemistry';
  title: string;
  titleAr?: string;
  topic: string;
  duration: string; // e.g. "3:15"
  instructor: string;
  channelTitle?: string;
  thumbnailUrl: string;
  youtubeId?: string; // YouTube 11-char ID
  videoUrl?: string; // HTML5 video fallback
  description: string;
  learningObjectives: string[];
  highYieldTakeaways: string[];
  chapters: { time: string; title: string }[];
}

export const EDUCATIONAL_VIDEOS: EducationalVideo[] = [
  // 1. ANATOMY
  {
    id: 'vid-anat-001',
    subjectId: 'anatomy',
    topic: 'Anatomical Planes & Terminology',
    title: 'Anatomical Terms & Planes of the Body',
    titleAr: 'المستويات والمصطلحات التشريحية لجسم الإنسان',
    duration: '11:42',
    instructor: 'Ninja Nerd Anatomy Team',
    channelTitle: 'Ninja Nerd',
    youtubeId: '9Zybmnrqdkg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800',
    description: 'A comprehensive, high-yield lecture on Sagittal, Coronal/Frontal, and Transverse planes, anatomical position, directional terms, and axis rotations.',
    learningObjectives: [
      'Master the standard anatomical position criteria',
      'Distinguish median, sagittal, coronal, and axial planes',
      'Understand proximal/distal, cranial/caudal, and superficial/deep'
    ],
    highYieldTakeaways: [
      'Mid-sagittal divides body into equal left/right halves',
      'Coronal plane separates anterior from posterior',
      'In anatomical position, palms face forward and thumbs point laterally'
    ],
    chapters: [
      { time: '0:00', title: 'Standard Anatomical Position' },
      { time: '02:15', title: 'Sagittal & Parasagittal Planes' },
      { time: '05:30', title: 'Coronal (Frontal) Plane' },
      { time: '08:45', title: 'Transverse (Axial) Plane & Sections' }
    ]
  },
  {
    id: 'vid-anat-002',
    subjectId: 'anatomy',
    topic: 'Osteology & Upper Limb (Scapula)',
    title: 'Scapula Anatomy & Muscle Attachments in 10 Mins',
    titleAr: 'عظام لوح الكتف والعلامات التشريحية وعضلات الكفة المدورة',
    duration: '10:15',
    instructor: 'Dr. Mohamed Alaa & AnatomyZone',
    channelTitle: 'AnatomyZone',
    youtubeId: 'qR_d5bKkY1o',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800',
    description: 'Step-by-step 3D bony landmark identification: spine of scapula, acromion, coracoid process, glenoid cavity, and SITS rotator cuff attachments.',
    learningObjectives: [
      'Identify the anterior (subscapular fossa) vs posterior (spine) surfaces',
      'Distinguish the supraspinous and infraspinous fossae',
      'Map the origin of SITS muscles and insertion of biceps long head'
    ],
    highYieldTakeaways: [
      'Supraspinatus initiates arm abduction (0-15°)',
      'Glenoid labrum deepens the shallow socket',
      'Acromion articulates with lateral clavicle'
    ],
    chapters: [
      { time: '0:00', title: 'Orientation: Anterior vs Posterior Scapula' },
      { time: '02:45', title: 'Spine, Acromion & Coracoid Process' },
      { time: '05:40', title: 'Glenoid Cavity & Supraglenoid Tubercle' },
      { time: '08:15', title: 'Rotator Cuff Muscle Attachments (SITS)' }
    ]
  },
  {
    id: 'vid-anat-003',
    subjectId: 'anatomy',
    topic: 'Cardiovascular Anatomy',
    title: 'Internal Heart Anatomy: Chambers, Valves & Blood Flow Dissection',
    titleAr: 'حجرات وصمامات القلب والتروية الدموية',
    duration: '14:20',
    instructor: 'Ninja Nerd Medical Dissections',
    channelTitle: 'Ninja Nerd',
    youtubeId: 'qMPX4zM4Y7Y',
    thumbnailUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800',
    description: 'Internal heart anatomy: right atrium (pectinate muscles & crista terminalis), tricuspid vs mitral valves, chordae tendineae, papillary muscles, and ventricular myocardium.',
    learningObjectives: [
      'Trace deoxygenated vs oxygenated blood through the four cardiac chambers',
      'Understand how papillary muscles and chordae tendineae prevent valve prolapse',
      'Compare right and left ventricular wall thickness'
    ],
    highYieldTakeaways: [
      'Left ventricular myocardium is 3x thicker than the right',
      'Tricuspid = 3 cusps (Right AV); Mitral/Bicuspid = 2 cusps (Left AV)',
      'SA node sits in the right atrium near SVC orifice'
    ],
    chapters: [
      { time: '0:00', title: 'Right Atrium: Crista Terminalis & Fossa Ovalis' },
      { time: '03:50', title: 'Atrioventricular Valves & Chordae Tendineae' },
      { time: '08:20', title: 'Left Ventricle Architecture & Aortic Valve' },
      { time: '11:40', title: 'Coronary Artery Ostia in Aortic Sinuses' }
    ]
  },

  // 2. HISTOLOGY
  {
    id: 'vid-hist-001',
    subjectId: 'histology',
    topic: 'Muscle Tissue Microscopic Anatomy',
    title: 'Skeletal vs. Cardiac vs. Smooth Muscle Histology',
    titleAr: 'المقارنة المجهرية بين الأنسجة العضلية الثلاثة',
    duration: '12:15',
    instructor: 'Shotgun Histology Series',
    channelTitle: 'Histology Masterclass',
    youtubeId: 'i_7N_B5X_zY',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800',
    description: 'Learn the definitive microscopic criteria to rapidly distinguish Skeletal (peripheral nuclei, cross-striated), Cardiac (intercalated discs, branching, central nuclei), and Smooth muscle (fusiform, non-striated) in OSPE spotters.',
    learningObjectives: [
      'Identify nuclear location (peripheral syncytium vs central single/double)',
      'Recognize intercalated discs on high power H&E histology',
      'Differentiate longitudinal vs transverse section appearances'
    ],
    highYieldTakeaways: [
      'Skeletal: Multinucleated, flattened peripheral nuclei beneath sarcolemma',
      'Cardiac: 1-2 central nuclei, branching fibers, intercalated discs (gap junctions)',
      'Smooth: Non-striated, single central cigar-shaped nucleus'
    ],
    chapters: [
      { time: '0:00', title: 'Overview of the 3 Muscle Tissue Types' },
      { time: '03:10', title: 'Skeletal Muscle: Peripheral Syncytia & Striations' },
      { time: '07:25', title: 'Cardiac Muscle: Intercalated Discs & Branching' },
      { time: '10:05', title: 'Smooth Muscle: Fusiform Non-Striated Cells' }
    ]
  },
  {
    id: 'vid-hist-002',
    subjectId: 'histology',
    topic: 'Epithelial Tissue',
    title: 'Epithelium Classification & Slide Recognition Guide',
    titleAr: 'تصنيف الأنسجة الطلائية والتعرف عليها مجهرياً',
    duration: '11:30',
    instructor: 'Medical Histology Laboratory',
    channelTitle: 'Histology Lab',
    youtubeId: 'L8E_9iZf5w8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
    description: 'A structured walk-through of simple squamous (endothelium/mesothelium), simple cuboidal (renal tubules), simple columnar (GI tract with brush border), and pseudostratified respiratory epithelium.',
    learningObjectives: [
      'Classify epithelium by layer count (Simple vs Stratified vs Pseudostratified)',
      'Recognize cell shapes: Squamous, Cuboidal, Columnar, Transitional',
      'Identify apical specializations: Cilia, Microvilli, Keratinization'
    ],
    highYieldTakeaways: [
      'Simple Squamous = Bowman\'s capsule parietal layer & vascular endothelium',
      'Simple Cuboidal = Thyroid follicles & Renal tubules',
      'Pseudostratified Ciliated Columnar = Trachea & Respiratory tract'
    ],
    chapters: [
      { time: '0:00', title: 'Two Golden Rules of Epithelial Classification' },
      { time: '02:45', title: 'Simple Epithelia (Squamous, Cuboidal, Columnar)' },
      { time: '06:15', title: 'Stratified Epithelia (Keratinized vs Non-Keratinized)' },
      { time: '09:20', title: 'Pseudostratified & Transitional Urothelium' }
    ]
  },

  // 3. BACTERIOLOGY
  {
    id: 'vid-bact-001',
    subjectId: 'bacteriology',
    topic: 'Gram Staining SOP',
    title: 'Gram Stain Standard Operating Procedure (SOP) Step-by-Step',
    titleAr: 'طريقة صبغة جرام المعملية خطوة بخطوة',
    duration: '08:45',
    instructor: 'Clinical Microbiology Lab Demonstration',
    channelTitle: 'Microbiology SOPs',
    youtubeId: 'sxbYmPr_q7o',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    description: 'Master the 4-step Gram stain: Crystal Violet (1 min) -> Gram\'s Iodine (1 min) -> 95% Ethanol decolorization (10-15 sec critical step) -> Safranin counterstain (45 sec). Avoid common pitfalls like over-decolorization.',
    learningObjectives: [
      'Execute each step with proper timing and rinsing',
      'Explain the mechanism of alcohol decolorization on thick vs thin peptidoglycan',
      'Avoid over-decolorization and false Gram-negative readings'
    ],
    highYieldTakeaways: [
      'Decolorization is the most time-sensitive step (10-15 seconds)',
      'Gram-positive retain Crystal Violet (purple)',
      'Gram-negative lose CV and take up Safranin (pink/red)'
    ],
    chapters: [
      { time: '0:00', title: 'Smear Preparation & Heat Fixation' },
      { time: '02:10', title: 'Primary Stain & Mordant (CV + Iodine)' },
      { time: '04:40', title: 'Critical Decolorization Step (95% Ethanol)' },
      { time: '06:30', title: 'Counterstain (Safranin) & Oil Immersion Check' }
    ]
  },

  // 4. BIOCHEMISTRY
  {
    id: 'vid-bioc-001',
    subjectId: 'biochemistry',
    topic: 'Carbohydrate Bench Tests',
    title: 'Benedict\'s, Molisch\'s & Barfoed\'s Bench Tests Demonstrated',
    titleAr: 'تجارب الكشف عن الكربوهيدرات معملياً',
    duration: '09:50',
    instructor: 'Medical Biochemistry Practical Team',
    channelTitle: 'Biochem Lab',
    youtubeId: 'rKng5-Ij6BQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
    description: 'Watch real qualitative carbohydrate identification tests: Molisch\'s purple ring at the interface, Iodine blue-black with starch, Barfoed\'s rapid red precipitate with monosaccharides, and Benedict\'s semi-quantitative color scale.',
    learningObjectives: [
      'Observe the delicate layering of H2SO4 for Molisch\'s test ring',
      'Interpret Benedict\'s color scale from green (+), yellow (++), orange (+++), to brick-red (++++)',
      'Time Barfoed\'s test (< 3 min for monosaccharides vs > 10 min for disaccharides)'
    ],
    highYieldTakeaways: [
      'Molisch\'s test is universal for all carbohydrates',
      'Barfoed\'s tests reducing power in an ACIDIC medium',
      'Seliwanoff\'s gives cherry-red with fructose within 1 minute'
    ],
    chapters: [
      { time: '0:00', title: 'Molisch\'s Universal Carbohydrate Test' },
      { time: '02:30', title: 'Iodine Starch-Complex Reaction' },
      { time: '04:50', title: 'Barfoed\'s Monosaccharide vs Disaccharide Test' },
      { time: '07:20', title: 'Benedict\'s Semi-Quantitative Reducing Sugar Test' }
    ]
  }
];
