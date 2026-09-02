export interface EducationalVideo {
  id: string;
  subject: 'anatomy' | 'histology' | 'bacteriology' | 'biochemistry';
  subjectId: 'anatomy' | 'histology' | 'bacteriology' | 'biochemistry'; // Alias for compatibility
  topicId: string;
  topicName: string;
  topic: string; // Alias for compatibility
  title: string;
  titleAr?: string;
  instructor: string;
  instructorTitle?: string;
  channelTitle?: string;
  youtubeVideoId: string;
  youtubeId: string; // Alias for compatibility
  youtubeUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  duration: string; // e.g. "14:20"
  relevanceScore: number; // e.g. 98
  status: 'active' | 'unavailable';
  source: string;
  description: string;
  learningObjectives: string[];
  highYieldTakeaways: string[];
  chapters: { time: string; title: string }[];
}

export const EDUCATIONAL_VIDEOS: EducationalVideo[] = [
  // ==========================================
  // 1. ANATOMY MODULES
  // ==========================================
  {
    id: 'vid-anat-heart-001',
    subject: 'anatomy',
    subjectId: 'anatomy',
    topicId: 'anat_cardio',
    topicName: 'Cardiovascular Anatomy & Internal Heart',
    topic: 'Cardiovascular Anatomy',
    title: 'Internal Heart Anatomy: Chambers, Valves & Blood Flow Dissection',
    titleAr: 'تشريح القلب البشري: الحجرات والصمامات ومسار جريان الدم',
    instructor: 'The Noted Anatomist',
    instructorTitle: 'Professor of Anatomy & Dissection',
    channelTitle: 'The Noted Anatomist',
    youtubeVideoId: 'heSsAreO_y0',
    youtubeId: 'heSsAreO_y0',
    youtubeUrl: 'https://www.youtube.com/watch?v=heSsAreO_y0',
    embedUrl: 'https://www.youtube.com/embed/heSsAreO_y0',
    thumbnailUrl: 'https://img.youtube.com/vi/heSsAreO_y0/hqdefault.jpg',
    duration: '14:20',
    relevanceScore: 99,
    status: 'active',
    source: 'The Noted Anatomist Medical Lectures',
    description: 'Comprehensive gross anatomy walkthrough of internal cardiac structures: Right Atrium (fossa ovalis, crista terminalis, pectinate muscles), Tricuspid vs Mitral AV valves, chordae tendineae, papillary muscles, and ventricular outflow tracts.',
    learningObjectives: [
      'Trace deoxygenated vs oxygenated blood flow through cardiac chambers and great vessels',
      'Identify anatomical features of the Right Atrium (SA node position, fossa ovalis, pectinate muscles)',
      'Explain the role of papillary muscles and chordae tendineae in preventing AV valve eversion'
    ],
    highYieldTakeaways: [
      'Left ventricular myocardium is 3x thicker than right ventricle to overcome systemic vascular resistance',
      'Tricuspid Valve is on the Right; Mitral (Bicuspid) Valve is on the Left',
      'Coronary ostia arise from the left and right aortic sinuses just above the aortic valve cusps'
    ],
    chapters: [
      { time: '0:00', title: 'Orientation & External Landmarks' },
      { time: '03:15', title: 'Right Atrium: Pectinate Muscles & Fossa Ovalis' },
      { time: '06:40', title: 'Atrioventricular Valves & Papillary Muscles' },
      { time: '10:20', title: 'Left Ventricle, Aorta & Coronary Ostia' }
    ]
  },
  {
    id: 'vid-anat-planes-001',
    subject: 'anatomy',
    subjectId: 'anatomy',
    topicId: 'anat_planes',
    topicName: 'Anatomical Planes & Terminology',
    topic: 'Anatomical Planes & Terminology',
    title: 'Body Planes & Sections: Sagittal, Coronal & Transverse',
    titleAr: 'المستويات والمصطلحات التشريحية لجسم الإنسان',
    instructor: 'Ninja Nerd Anatomy',
    instructorTitle: 'Clinical Anatomy & Physiology',
    channelTitle: 'Ninja Nerd',
    youtubeVideoId: 'd4qHVe6xmWM',
    youtubeId: 'd4qHVe6xmWM',
    youtubeUrl: 'https://www.youtube.com/watch?v=d4qHVe6xmWM',
    embedUrl: 'https://www.youtube.com/embed/d4qHVe6xmWM',
    thumbnailUrl: 'https://img.youtube.com/vi/d4qHVe6xmWM/hqdefault.jpg',
    duration: '11:42',
    relevanceScore: 98,
    status: 'active',
    source: 'Ninja Nerd Medical Education',
    description: 'A comprehensive, high-yield lecture on Sagittal, Coronal (Frontal), and Transverse (Axial) planes, standard anatomical position, directional coordinates, and axis rotations.',
    learningObjectives: [
      'Master the standard anatomical position criteria (standing erect, palms facing forward)',
      'Distinguish midsagittal (median), parasagittal, coronal, and axial planes',
      'Correlate transverse plane sections with axial CT and MRI cross-sectional radiology'
    ],
    highYieldTakeaways: [
      'Midsagittal plane is the only plane that divides the body into equal left and right halves',
      'Coronal plane separates anterior (ventral) from posterior (dorsal)',
      'Axial / Transverse CT images are interpreted as looking from the patient\'s feet upward'
    ],
    chapters: [
      { time: '0:00', title: 'Standard Anatomical Position' },
      { time: '02:30', title: 'Sagittal & Parasagittal Planes' },
      { time: '05:45', title: 'Coronal (Frontal) Plane' },
      { time: '08:50', title: 'Transverse (Axial) Sectional Plane' }
    ]
  },
  {
    id: 'vid-anat-dir-001',
    subject: 'anatomy',
    subjectId: 'anatomy',
    topicId: 'anat_directional_terms',
    topicName: 'Anatomical Directional Terms',
    topic: 'Anatomical Directional Terms',
    title: 'Regional Terms, Directional Terms, and Planes & Sections',
    titleAr: 'المصطلحات الاتجاهية والمواقع التشريحية',
    instructor: 'Dr Matt & Dr Mike',
    instructorTitle: 'University Senior Lecturers of Medical Anatomy',
    channelTitle: 'Dr Matt & Dr Mike',
    youtubeVideoId: '1ugYf9ezKv4',
    youtubeId: '1ugYf9ezKv4',
    youtubeUrl: 'https://www.youtube.com/watch?v=1ugYf9ezKv4',
    embedUrl: 'https://www.youtube.com/embed/1ugYf9ezKv4',
    thumbnailUrl: 'https://img.youtube.com/vi/1ugYf9ezKv4/hqdefault.jpg',
    duration: '13:05',
    relevanceScore: 97,
    status: 'active',
    source: 'Dr Matt & Dr Mike Anatomy Series',
    description: 'Clear walkthrough of medical directional terminology: Superior vs Inferior, Anterior vs Posterior, Medial vs Lateral, and Proximal vs Distal referencing limb attachments.',
    learningObjectives: [
      'Apply directional terminology accurately across all anatomical regions',
      'Distinguish proximal/distal (used strictly for extremities) from superior/inferior',
      'Understand contralateral vs ipsilateral orientations in clinical exams'
    ],
    highYieldTakeaways: [
      'Proximal means closer to point of attachment; Distal is further away',
      'In anatomical position, radius and thumb are Lateral; ulna and little finger are Medial',
      'Deep structures lie toward body interior; superficial lie near skin'
    ],
    chapters: [
      { time: '0:00', title: 'Introduction to Directional Coordinates' },
      { time: '03:20', title: 'Superior / Inferior & Anterior / Posterior' },
      { time: '07:10', title: 'Medial vs Lateral' },
      { time: '10:15', title: 'Proximal vs Distal on Extremities' }
    ]
  },
  {
    id: 'vid-anat-skel-001',
    subject: 'anatomy',
    subjectId: 'anatomy',
    topicId: 'anat_skeletal',
    topicName: 'Skeletal System & Osteology',
    topic: 'Skeletal System',
    title: 'The Skeletal System: Bone Structure & Axial/Appendicular Divisions',
    titleAr: 'الجهاز الهيكلي وعلم العظام: الهيكل المحوري والطرفي',
    instructor: 'Professor Dave Explains',
    instructorTitle: 'Professor of Anatomy & Physiology',
    channelTitle: 'Professor Dave Explains',
    youtubeVideoId: 'f-FF7Qigd3U',
    youtubeId: 'f-FF7Qigd3U',
    youtubeUrl: 'https://www.youtube.com/watch?v=f-FF7Qigd3U',
    embedUrl: 'https://www.youtube.com/embed/f-FF7Qigd3U',
    thumbnailUrl: 'https://img.youtube.com/vi/f-FF7Qigd3U/hqdefault.jpg',
    duration: '08:45',
    relevanceScore: 98,
    status: 'active',
    source: 'Professor Dave Anatomy & Physiology',
    description: 'High-yield overview of the 206 human bones, axial skeleton (skull, vertebral column, thoracic cage) vs appendicular skeleton (pectoral girdle, pelvic girdle, upper/lower extremities), and bone histology.',
    learningObjectives: [
      'Classify bones by shape: Long, Short, Flat, Irregular, and Sesamoid',
      'Differentiate axial skeleton (80 bones) from appendicular skeleton (126 bones)',
      'Identify epiphyseal growth plate, compact cortical bone, and spongy trabeculae'
    ],
    highYieldTakeaways: [
      'Adult human body contains exactly 206 bones',
      'Osteocytes reside within lacunae interconnected by canaliculi',
      'Red bone marrow in spongy bone conducts active hematopoiesis'
    ],
    chapters: [
      { time: '0:00', title: 'Axial vs Appendicular Skeleton' },
      { time: '02:40', title: 'Long Bone Gross Anatomy & Epiphysis' },
      { time: '05:15', title: 'Cortical Bone & Osteon Systems' },
      { time: '07:20', title: 'Bone Remodeling & Mineral Storage' }
    ]
  },
  {
    id: 'vid-anat-joints-001',
    subject: 'anatomy',
    subjectId: 'anatomy',
    topicId: 'anat_joints',
    topicName: 'Joints and Articulations',
    topic: 'Joints and Articulations',
    title: 'Joints: Structural Classification & Synovial Joint Anatomy',
    titleAr: 'المفاصل وتصنيفاتها: المفاصل الليفية والغضروفية والزلالية',
    instructor: 'Crash Course Anatomy',
    instructorTitle: 'Medical Anatomy Faculty',
    channelTitle: 'CrashCourse',
    youtubeVideoId: 'DLxYDoN634c',
    youtubeId: 'DLxYDoN634c',
    youtubeUrl: 'https://www.youtube.com/watch?v=DLxYDoN634c',
    embedUrl: 'https://www.youtube.com/embed/DLxYDoN634c',
    thumbnailUrl: 'https://img.youtube.com/vi/DLxYDoN634c/hqdefault.jpg',
    duration: '09:20',
    relevanceScore: 96,
    status: 'active',
    source: 'CrashCourse Anatomy & Physiology',
    description: 'Detailed breakdown of structural (Fibrous, Cartilaginous, Synovial) and functional (Synarthrosis, Amphiarthrosis, Diarthrosis) joints, articular capsule, synovial fluid, and bursae.',
    learningObjectives: [
      'Classify the 6 types of synovial joints: Ball & Socket, Hinge, Pivot, Condyloid, Saddle, Plane',
      'Explain role of articular hyaline cartilage and synovial fluid in reducing friction',
      'Distinguish fibrous cranial sutures from cartilaginous pubic symphysis'
    ],
    highYieldTakeaways: [
      'Ball & Socket joints (Glenohumeral, Hip) permit greatest range of motion in all axes',
      'Synovial fluid is secreted by the inner synovial membrane to nourish avascular cartilage',
      'Ligaments connect bone to bone; Tendons connect muscle to bone'
    ],
    chapters: [
      { time: '0:00', title: 'Joint Classifications: Fibrous & Cartilaginous' },
      { time: '03:10', title: 'Synovial Joint Architecture' },
      { time: '05:50', title: '6 Types of Synovial Articulations' },
      { time: '07:45', title: 'Clinical Conditions: Arthritis & Bursitis' }
    ]
  },
  {
    id: 'vid-anat-muscles-001',
    subject: 'anatomy',
    subjectId: 'anatomy',
    topicId: 'anat_muscles',
    topicName: 'Major Muscles & Muscular System',
    topic: 'Major Muscles & Muscular System',
    title: 'Muscles and Movement: Antagonist Pairs, Attachments & Actions',
    titleAr: 'الجهاز العضلي وعمل العضلات والأوتار',
    instructor: 'Siebert Science',
    instructorTitle: 'Anatomy & Physiology Educator',
    channelTitle: 'Siebert Science',
    youtubeVideoId: '-_LBtX9kw4E',
    youtubeId: '-_LBtX9kw4E',
    youtubeUrl: 'https://www.youtube.com/watch?v=-_LBtX9kw4E',
    embedUrl: 'https://www.youtube.com/embed/-_LBtX9kw4E',
    thumbnailUrl: 'https://img.youtube.com/vi/-_LBtX9kw4E/hqdefault.jpg',
    duration: '07:15',
    relevanceScore: 95,
    status: 'active',
    source: 'Siebert Science Medical Anatomy',
    description: 'Visual demonstration of skeletal muscle mechanics: prime movers (agonists), antagonists, synergists, origin vs insertion anchor points, and sliding filament contraction overview.',
    learningObjectives: [
      'Define origin (stationary anchor) vs insertion (movable attachment) of skeletal muscles',
      'Examine antagonist pairings: Biceps / Triceps, Quadriceps / Hamstrings',
      'Differentiate isometric vs isotonic (concentric/eccentric) contractions'
    ],
    highYieldTakeaways: [
      'Muscles pull on bones across joints; muscles NEVER push',
      'Insertion moves TOWARD origin during concentric contraction',
      'Agonist and antagonist muscles coordinate reciprocally via neural inhibition'
    ],
    chapters: [
      { time: '0:00', title: 'Muscles Pull, Never Push' },
      { time: '02:00', title: 'Origin vs Insertion Mechanics' },
      { time: '04:15', title: 'Antagonist Muscle Pairs Explained' },
      { time: '06:00', title: 'Synergists & Stabilizers' }
    ]
  },
  {
    id: 'vid-anat-nervous-001',
    subject: 'anatomy',
    subjectId: 'anatomy',
    topicId: 'anat_nervous',
    topicName: 'Nervous System (CNS & PNS)',
    topic: 'Nervous System',
    title: 'The Nervous System: CNS, PNS & Neural Pathways',
    titleAr: 'الجهاز العصبي المركزي والطرفي والمسارات العصبية',
    instructor: 'Crash Course Anatomy',
    instructorTitle: 'Department of Neuroanatomy & Physiology',
    channelTitle: 'CrashCourse',
    youtubeVideoId: 'qPix_X-9t7E',
    youtubeId: 'qPix_X-9t7E',
    youtubeUrl: 'https://www.youtube.com/watch?v=qPix_X-9t7E',
    embedUrl: 'https://www.youtube.com/embed/qPix_X-9t7E',
    thumbnailUrl: 'https://img.youtube.com/vi/qPix_X-9t7E/hqdefault.jpg',
    duration: '10:35',
    relevanceScore: 98,
    status: 'active',
    source: 'CrashCourse Anatomy & Physiology',
    description: 'Gross anatomy and functional division of the nervous system: Central (Brain & Spinal Cord) vs Peripheral (Cranial & Spinal Nerves), Somatic vs Autonomic (Sympathetic / Parasympathetic).',
    learningObjectives: [
      'Map the anatomical divisions of CNS vs PNS',
      'Distinguish afferent (sensory) from efferent (motor) neural tracks',
      'Understand the sympathetic (fight-or-flight) vs parasympathetic (rest-and-digest) divisions'
    ],
    highYieldTakeaways: [
      'Myelin sheath in CNS is formed by Oligodendrocytes; in PNS by Schwann cells',
      'Cerebral cortex gray matter contains neuronal cell bodies; white matter contains myelinated axons',
      'Primary motor cortex resides in precentral gyrus; primary somatosensory cortex in postcentral gyrus'
    ],
    chapters: [
      { time: '0:00', title: 'CNS vs PNS Organization' },
      { time: '03:15', title: 'Neuron Anatomy & Synaptic Transmission' },
      { time: '06:30', title: 'Sensory vs Motor Pathways' },
      { time: '08:45', title: 'Autonomic Division: Sympathetic vs Parasympathetic' }
    ]
  },

  // ==========================================
  // 2. HISTOLOGY MODULES
  // ==========================================
  {
    id: 'vid-hist-muscle-001',
    subject: 'histology',
    subjectId: 'histology',
    topicId: 'hist_muscle',
    topicName: 'Muscle Tissue Microscopic Anatomy',
    topic: 'Muscle Tissue Microscopic Anatomy',
    title: 'Muscle Tissue Histology: Skeletal, Cardiac, and Smooth Muscle',
    titleAr: 'المقارنة المجهرية بين الأنسجة العضلية الثلاثة',
    instructor: 'Dr. Aleks Digital Pathology & AI',
    instructorTitle: 'Clinical Pathologist & Histologist',
    channelTitle: 'Dr. Aleks Digital Pathology',
    youtubeVideoId: 'wcfxGw-GIuk',
    youtubeId: 'wcfxGw-GIuk',
    youtubeUrl: 'https://www.youtube.com/watch?v=wcfxGw-GIuk',
    embedUrl: 'https://www.youtube.com/embed/wcfxGw-GIuk',
    thumbnailUrl: 'https://img.youtube.com/vi/wcfxGw-GIuk/hqdefault.jpg',
    duration: '12:15',
    relevanceScore: 99,
    status: 'active',
    source: 'Digital Pathology Microscopic Atlas',
    description: 'Definitive microscopic criteria to rapidly distinguish Skeletal (peripheral nuclei, cross-striations), Cardiac (intercalated discs, branching, central nuclei), and Smooth muscle (fusiform, single central nucleus) on H&E slides.',
    learningObjectives: [
      'Identify nuclear positions: peripheral syncytium (skeletal) vs central single/double (cardiac)',
      'Recognize intercalated discs and branching fibers on high-power cardiac histology',
      'Differentiate longitudinal section vs transverse cross-section appearances'
    ],
    highYieldTakeaways: [
      'Skeletal muscle fibers are multinucleated syncytia with flattened peripheral nuclei under sarcolemma',
      'Intercalated discs contain desmosomes (mechanical adhesion) and gap junctions (electrical coupling)',
      'Smooth muscle lacks sarcomeric striations; nuclei are elongated with corkscrew appearance when contracted'
    ],
    chapters: [
      { time: '0:00', title: 'Overview of the 3 Muscle Tissue Types' },
      { time: '03:10', title: 'Skeletal Muscle: Peripheral Nuclei & A/I Bands' },
      { time: '07:25', title: 'Cardiac Muscle: Intercalated Discs & Branching' },
      { time: '10:05', title: 'Smooth Muscle: Fusiform Non-Striated Cells' }
    ]
  },
  {
    id: 'vid-hist-epith-001',
    subject: 'histology',
    subjectId: 'histology',
    topicId: 'hist_epithelium',
    topicName: 'Epithelial Tissue Slides',
    topic: 'Epithelial Tissue',
    title: 'Epithelial Tissue Histology Explained for Beginners',
    titleAr: 'تصنيف الأنسجة الطلائية والتعرف عليها مجهرياً',
    instructor: 'Corporis',
    instructorTitle: 'Medical Histology Laboratory Educator',
    channelTitle: 'Corporis',
    youtubeVideoId: 'kHBjEQGrSw4',
    youtubeId: 'kHBjEQGrSw4',
    youtubeUrl: 'https://www.youtube.com/watch?v=kHBjEQGrSw4',
    embedUrl: 'https://www.youtube.com/embed/kHBjEQGrSw4',
    thumbnailUrl: 'https://img.youtube.com/vi/kHBjEQGrSw4/hqdefault.jpg',
    duration: '10:40',
    relevanceScore: 98,
    status: 'active',
    source: 'Medical Histology Masterclass',
    description: 'Structured walk-through of simple squamous (vascular endothelium, alveoli), simple cuboidal (renal tubules, thyroid), simple columnar (GI tract with goblet cells), and stratified squamous keratinized epithelium.',
    learningObjectives: [
      'Classify epithelium by layer count (Simple, Stratified, Pseudostratified)',
      'Recognize cell shapes: Squamous (flat), Cuboidal (square), Columnar (tall), Transitional (urothelium)',
      'Identify apical specializations: Cilia, Microvilli brush border, Keratin layer'
    ],
    highYieldTakeaways: [
      'Simple Squamous = Vascular endothelium & parietal layer of Bowman\'s capsule',
      'Simple Cuboidal = Thyroid follicles & renal collecting tubules',
      'Pseudostratified Ciliated Columnar with Goblet cells = Respiratory tract (Trachea)'
    ],
    chapters: [
      { time: '0:00', title: 'Classification Rules: Layers & Cell Shapes' },
      { time: '02:45', title: 'Simple Squamous, Cuboidal & Columnar Slides' },
      { time: '06:15', title: 'Stratified Squamous (Keratinized vs Non-Keratinized)' },
      { time: '08:50', title: 'Pseudostratified & Transitional Urothelium' }
    ]
  },
  {
    id: 'vid-hist-conn-001',
    subject: 'histology',
    subjectId: 'histology',
    topicId: 'hist_connective',
    topicName: 'Connective Tissue Histology',
    topic: 'Connective Tissue Histology',
    title: 'Connective Tissue: Ground Substance, Fibers & Cell Types',
    titleAr: 'الأنسجة الضامة: المادة الخلالية والألياف والخلايا المجهرية',
    instructor: 'Dr Matt & Dr Mike',
    instructorTitle: 'Medical Histology Faculty',
    channelTitle: 'Dr Matt & Dr Mike',
    youtubeVideoId: '0z9rF2kJaXs',
    youtubeId: '0z9rF2kJaXs',
    youtubeUrl: 'https://www.youtube.com/watch?v=0z9rF2kJaXs',
    embedUrl: 'https://www.youtube.com/embed/0z9rF2kJaXs',
    thumbnailUrl: 'https://img.youtube.com/vi/0z9rF2kJaXs/hqdefault.jpg',
    duration: '11:20',
    relevanceScore: 97,
    status: 'active',
    source: 'Medical Histology Laboratory Series',
    description: 'Microscopic identification of loose areolar connective tissue, dense regular (tendons) vs irregular (dermis), adipose tissue (adipocytes with peripheral lipid droplets), and hyaline cartilage.',
    learningObjectives: [
      'Identify the 3 fiber types: Collagen (tensile strength), Elastic (recoil), Reticular (framework)',
      'Recognize fibroblasts, mast cells, and unilocular adipocytes on H&E slides',
      'Differentiate dense regular connective tissue from skeletal muscle fibers'
    ],
    highYieldTakeaways: [
      'Type I Collagen is the most abundant protein in human body (bone, tendons, skin)',
      'Adipocytes show signet-ring appearance with cytoplasm squeezed to periphery',
      'Hyaline cartilage chondrocytes reside in isogenous groups within lacunae'
    ],
    chapters: [
      { time: '0:00', title: 'Extracellular Matrix & Ground Substance' },
      { time: '03:10', title: 'Collagen, Elastic & Reticular Fibers' },
      { time: '06:45', title: 'Loose Areolar vs Dense Regular Connective Tissue' },
      { time: '09:30', title: 'Adipose Tissue & Cartilage Lacunae' }
    ]
  },

  // ==========================================
  // 3. BACTERIOLOGY MODULES
  // ==========================================
  {
    id: 'vid-bact-gram-001',
    subject: 'bacteriology',
    subjectId: 'bacteriology',
    topicId: 'bact_gram',
    topicName: 'Gram Staining SOP',
    topic: 'Gram Staining SOP',
    title: 'How to Perform a Gram Stain: Clinical SOP & Decolorization',
    titleAr: 'طريقة صبغة جرام المعملية المعيارية خطوة بخطوة',
    instructor: 'Centers for Disease Control and Prevention (CDC)',
    instructorTitle: 'Division of Laboratory Systems',
    channelTitle: 'CDC',
    youtubeVideoId: 'DlnSzHQhk_k',
    youtubeId: 'DlnSzHQhk_k',
    youtubeUrl: 'https://www.youtube.com/watch?v=DlnSzHQhk_k',
    embedUrl: 'https://www.youtube.com/embed/DlnSzHQhk_k',
    thumbnailUrl: 'https://img.youtube.com/vi/DlnSzHQhk_k/hqdefault.jpg',
    duration: '07:30',
    relevanceScore: 100,
    status: 'active',
    source: 'CDC Laboratory Training Protocols',
    description: 'Standard operating procedure for the 4-step Gram stain: Crystal Violet (primary stain) -> Gram\'s Iodine (mordant) -> 95% Ethanol (critical decolorizer) -> Safranin (counterstain). How to avoid over-decolorization.',
    learningObjectives: [
      'Execute each staining step with proper timing and rinsing technique',
      'Explain chemical mechanism of alcohol decolorization across thick vs thin peptidoglycan walls',
      'Identify Gram-positive purple cocci (Staphylococcus) vs Gram-negative pink rods (E. coli)'
    ],
    highYieldTakeaways: [
      'Decolorization is the most time-sensitive critical step (10-15 seconds max)',
      'Gram-positive cells retain Crystal Violet-Iodine complex due to thick peptidoglycan',
      'Gram-negative outer lipid membrane is dissolved by alcohol, allowing Safranin counterstain'
    ],
    chapters: [
      { time: '0:00', title: 'Smear Preparation & Heat Fixation' },
      { time: '01:45', title: 'Crystal Violet & Iodine Mordant Steps' },
      { time: '03:40', title: 'Decolorization Protocol (Avoid Over-washing)' },
      { time: '05:20', title: 'Safranin Counterstain & Microscopic Reading' }
    ]
  },
  {
    id: 'vid-bact-streak-001',
    subject: 'bacteriology',
    subjectId: 'bacteriology',
    topicId: 'bact_culture',
    topicName: 'Bacterial Culture & Inoculation',
    topic: 'Bacterial Culture & Inoculation',
    title: 'Streaking an Agar Plate: Four Quadrant Streak for Isolation',
    titleAr: 'تقنية تخطيط أطباق الآجار لعزل المستعمرات البكتيرية النقية',
    instructor: 'Hardy Diagnostics',
    instructorTitle: 'Clinical Microbiology Specialists',
    channelTitle: 'Hardy Diagnostics',
    youtubeVideoId: 'pUDPG17TOSE',
    youtubeId: 'pUDPG17TOSE',
    youtubeUrl: 'https://www.youtube.com/watch?v=pUDPG17TOSE',
    embedUrl: 'https://www.youtube.com/embed/pUDPG17TOSE',
    thumbnailUrl: 'https://img.youtube.com/vi/pUDPG17TOSE/hqdefault.jpg',
    duration: '05:15',
    relevanceScore: 99,
    status: 'active',
    source: 'Clinical Microbiology Laboratory Protocols',
    description: 'Demonstration of aseptic technique and the four-quadrant streak method on blood agar/MacConkey agar to dilute bacterial inoculum and obtain isolated single colony-forming units (CFUs).',
    learningObjectives: [
      'Perform aseptic flame sterilization of inoculating loop between consecutive quadrants',
      'Execute proper quadrant crossover technique to achieve isolated colonies in quadrant 4',
      'Prevent agar gouging and aerosol contamination'
    ],
    highYieldTakeaways: [
      'Always allow flamed loop to cool completely before touching bacterial colonies',
      'Only dip into stock culture ONCE for Quadrant 1; subsequent quadrants drag from previous',
      'Isolated colonies represent clones derived from a single viable bacterial cell'
    ],
    chapters: [
      { time: '0:00', title: 'Aseptic Technique & Loop Sterilization' },
      { time: '01:20', title: 'Inoculating Quadrant 1' },
      { time: '02:45', title: 'Flaming & Streaking Quadrants 2, 3 and 4' },
      { time: '04:15', title: 'Incubation & Colony Morphologies' }
    ]
  },
  {
    id: 'vid-bact-kirby-001',
    subject: 'bacteriology',
    subjectId: 'bacteriology',
    topicId: 'bact_antibiotic',
    topicName: 'Antimicrobial Sensitivity Testing',
    topic: 'Antimicrobial Sensitivity Testing',
    title: 'Kirby-Bauer Disk Diffusion Antimicrobial Susceptibility Test',
    titleAr: 'فحص حساسية البكتيريا للمضادات الحيوية بطريقة كيربي باور',
    instructor: 'Hardy Diagnostics',
    instructorTitle: 'Microbiology Laboratory Education',
    channelTitle: 'Hardy Diagnostics',
    youtubeVideoId: '4eLcjk3Iv9Y',
    youtubeId: '4eLcjk3Iv9Y',
    youtubeUrl: 'https://www.youtube.com/watch?v=4eLcjk3Iv9Y',
    embedUrl: 'https://www.youtube.com/embed/4eLcjk3Iv9Y',
    thumbnailUrl: 'https://img.youtube.com/vi/4eLcjk3Iv9Y/hqdefault.jpg',
    duration: '06:40',
    relevanceScore: 98,
    status: 'active',
    source: 'CLSI Standard Antimicrobial Testing Manual',
    description: 'Step-by-step CLSI protocol: preparing 0.5 McFarland standard turbidity inoculum, lawning Mueller-Hinton agar plate in 3 directions, applying antibiotic discs, and measuring Zone of Inhibition in millimeters.',
    learningObjectives: [
      'Standardize bacterial suspension to 0.5 McFarland turbidity (1.5 x 10^8 CFU/mL)',
      'Apply antibiotic discs with uniform spacing to prevent overlapping inhibition zones',
      'Measure diameter of clear zone in mm and interpret Susceptible, Intermediate, or Resistant'
    ],
    highYieldTakeaways: [
      'Mueller-Hinton agar at 4mm depth is the global standard for disk diffusion tests',
      'Zone of inhibition diameter is inversely related to Minimum Inhibitory Concentration (MIC)',
      'Never measure zone from top of plate; measure from underside against a dark background'
    ],
    chapters: [
      { time: '0:00', title: '0.5 McFarland Inoculum Standardization' },
      { time: '01:50', title: 'Confluent Lawning on Mueller-Hinton Agar' },
      { time: '03:30', title: 'Antibiotic Disc Placement' },
      { time: '05:10', title: 'Zone of Inhibition Measurement (mm) & CLSI Interpretation' }
    ]
  },

  // ==========================================
  // 4. BIOCHEMISTRY MODULES
  // ==========================================
  {
    id: 'vid-bioc-carbs-001',
    subject: 'biochemistry',
    subjectId: 'biochemistry',
    topicId: 'bioc_carbs',
    topicName: 'Carbohydrate Bench Tests',
    topic: 'Carbohydrate Bench Tests',
    title: 'Molisch & Benedict Qualitative Bench Tests for Carbohydrates',
    titleAr: 'تجارب الكشف النوعي عن الكربوهيدرات معملياً',
    instructor: 'Biochemistry by Dr Rajesh Jambhulkar',
    instructorTitle: 'Professor of Medical Biochemistry',
    channelTitle: 'Biochemistry by Dr Rajesh Jambhulkar',
    youtubeVideoId: '9kD9sRAf2TM',
    youtubeId: '9kD9sRAf2TM',
    youtubeUrl: 'https://www.youtube.com/watch?v=9kD9sRAf2TM',
    embedUrl: 'https://www.youtube.com/embed/9kD9sRAf2TM',
    thumbnailUrl: 'https://img.youtube.com/vi/9kD9sRAf2TM/hqdefault.jpg',
    duration: '08:50',
    relevanceScore: 99,
    status: 'active',
    source: 'Medical Biochemistry Practical Demonstrations',
    description: 'Observation of qualitative carbohydrate identification bench tests: Molisch\'s violet/purple ring at acid interface (general carb test), Benedict\'s reducing sugar color gradient (green, yellow, orange, brick-red precipitate), and Iodine starch complex.',
    learningObjectives: [
      'Observe careful incline pipetting of concentrated H2SO4 to form Molisch purple ring',
      'Explain reduction of cupric ions (Cu2+) to cuprous oxide (Cu2O) precipitate in Benedict test',
      'Distinguish reducing sugars (glucose, maltose) from non-reducing sugars (sucrose)'
    ],
    highYieldTakeaways: [
      'Molisch test is positive for ALL carbohydrates based on furfural condensation with alpha-naphthol',
      'Benedict test detects free carbonyl aldehyde/ketone reducing groups',
      'Sucrose is non-reducing because both anomeric carbons are locked in the glycosidic bond'
    ],
    chapters: [
      { time: '0:00', title: 'Molisch Test: Principle & Acid Ring Demonstration' },
      { time: '02:40', title: 'Iodine Starch Color Reaction' },
      { time: '04:50', title: 'Benedict Reducing Sugar Assay & Water Bath' },
      { time: '07:15', title: 'Interpreting Semi-Quantitative Color Scale' }
    ]
  },
  {
    id: 'vid-bioc-protein-001',
    subject: 'biochemistry',
    subjectId: 'biochemistry',
    topicId: 'bioc_protein',
    topicName: 'Protein Estimation & Qualitative Tests',
    topic: 'Protein Estimation & Qualitative Tests',
    title: 'Biuret Test for Protein Identification & Peptide Bonds',
    titleAr: 'اختبار البيوريت للكشف عن الروابط الببتيدية والبروتينات',
    instructor: 'Matt Green Biology',
    instructorTitle: 'Medical Science Educator',
    channelTitle: 'Matt Green',
    youtubeVideoId: 'xzbAlwXDgJs',
    youtubeId: 'xzbAlwXDgJs',
    youtubeUrl: 'https://www.youtube.com/watch?v=xzbAlwXDgJs',
    embedUrl: 'https://www.youtube.com/embed/xzbAlwXDgJs',
    thumbnailUrl: 'https://img.youtube.com/vi/xzbAlwXDgJs/hqdefault.jpg',
    duration: '05:10',
    relevanceScore: 97,
    status: 'active',
    source: 'Medical Biochemistry Laboratory Protocols',
    description: 'Protocol and colorimetric principle of the Biuret test: alkaline copper sulfate (CuSO4 + NaOH) chelates with peptide bonds (minimum 2 peptide bonds) to produce a characteristic deep purple/violet coordination complex.',
    learningObjectives: [
      'Demonstrate alkaline Biuret reagent addition to protein samples (albumin/gelatin)',
      'Explain why free single amino acids give negative Biuret tests (requires >= 2 peptide bonds)',
      'Compare color intensity at 540 nm for quantitative spectrophotometric protein assays'
    ],
    highYieldTakeaways: [
      'Biuret reaction requires at least TWO peptide linkages (-CONH-)',
      'Free amino acids (except histidine) do not form the purple chelate complex',
      'Purple color intensity is directly proportional to peptide bond concentration'
    ],
    chapters: [
      { time: '0:00', title: 'Principle: Cu2+ Chelation with Peptide Bonds' },
      { time: '01:30', title: 'Adding NaOH Alkaline Buffer and CuSO4' },
      { time: '03:10', title: 'Color Shift: Blue to Deep Purple' },
      { time: '04:20', title: 'Negative vs Positive Sample Comparison' }
    ]
  },
  {
    id: 'vid-bioc-urine-001',
    subject: 'biochemistry',
    subjectId: 'biochemistry',
    topicId: 'bioc_urinalysis',
    topicName: 'Routine Biochemical Urinalysis',
    topic: 'Routine Biochemical Urinalysis',
    title: 'Urine Microscopic Examination: Casts, Crystals, RBCs & WBCs',
    titleAr: 'الفحص المجهري والكيميائي للبول: الاسطوانات والبلورات وكريات الدم',
    instructor: 'Medicosis Perfectionalis',
    instructorTitle: 'Clinical Pathology & Laboratory Medicine',
    channelTitle: 'Medicosis Perfectionalis',
    youtubeVideoId: 'ZCabBAGfOgU',
    youtubeId: 'ZCabBAGfOgU',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZCabBAGfOgU',
    embedUrl: 'https://www.youtube.com/embed/ZCabBAGfOgU',
    thumbnailUrl: 'https://img.youtube.com/vi/ZCabBAGfOgU/hqdefault.jpg',
    duration: '13:45',
    relevanceScore: 100,
    status: 'active',
    source: 'Clinical Laboratory Urinalysis Atlas',
    description: 'Comprehensive microscopic urine sediment analysis: centrifugation of fresh sample, slide mounting, low/high power examination of hyaline vs granular vs cellular casts, dysmorphic RBCs (glomerulonephritis), WBCs (pyuria), and uric acid / calcium oxalate crystals.',
    learningObjectives: [
      'Centrifuge and prepare unspun vs sediment urine wet mount slide under low illumination',
      'Differentiate RBC casts (pathognomonic for glomerulonephritis) from WBC casts (pyelonephritis)',
      'Identify calcium oxalate envelope crystals, triple phosphate coffin-lid crystals, and uric acid'
    ],
    highYieldTakeaways: [
      'RBC casts always indicate renal parenchyma bleeding (Glomerulonephritis)',
      'WBC casts differentiate upper UTI (Pyelonephritis) from lower UTI (Cystitis)',
      'Hyaline casts (Tamm-Horsfall mucoprotein) can occur normally after strenuous exercise or dehydration'
    ],
    chapters: [
      { time: '0:00', title: 'Centrifugation & Sediment Slide Preparation' },
      { time: '03:15', title: 'RBCs vs WBCs vs Squamous Epithelial Cells' },
      { time: '07:20', title: 'Urinary Casts (Hyaline, Granular, RBC & WBC Casts)' },
      { time: '11:00', title: 'Crystals in Acidic vs Alkaline Urine' }
    ]
  }
];
